// ==========================================================================
// 치이카와 3D 월드 - Firebase Auth & Cloud Firestore 연동 매니저 (보안·저장 개선판)
//  · 닉네임/랭킹은 항상 텍스트로만 출력 (HTML 주입 차단)
//  · 공개 랭킹은 이메일 없는 별도 'leaderboard' 컬렉션 사용, 'users'는 본인만 열람
//  · 클라우드 저장은 30초 단위로 묶어서 1회 (스테이지 클리어·탭 닫기 시 즉시)
//  · 계정 전환 시 다른 계정의 진행도가 섞이지 않도록 '세이브 주인' 추적
// ==========================================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  writeBatch,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAlcCCyDQPx-YdgKJaQnFu8mDuN9OI2pqI",
  authDomain: "chiikawa-world.firebaseapp.com",
  projectId: "chiikawa-world",
  storageBucket: "chiikawa-world.firebasestorage.app",
  messagingSenderId: "68314924141",
  appId: "1:68314924141:web:ea1f3ca70e9f039823eb64",
  measurementId: "G-7WZ9S9700N"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const SAVE_OWNER_KEY = 'chiikawa_3d_save_owner';
const GUEST_BACKUP_KEY = 'chiikawa_3d_guest_backup';
const CLOUD_SAVE_INTERVAL_MS = 30000;
const ACCT_BACKUP_PREFIX = 'chiikawa_3d_acct_best_'; // 계정별 '가장 많이 진행한' 세이브 (기기 보관용 안전망)
// Firestore 규칙: 한 번 저장할 때 스테이지 +1, 레벨 +30까지만 오를 수 있음 → 그보다 많이 오르면 나눠서 저장
const RULE_STAGE_STEP = 1;
const RULE_LEVEL_STEP = 30;
const TRANSIENT_STAT_KEYS = ['ramenBuffTimer'];

// ---------- 유틸 ----------
function toast(msg) {
  if (typeof showToast === 'function') showToast(msg);
  else console.log(msg);
}

// 닉네임 정리: HTML 특수문자 제거, 공백 정리, 12자 제한
export function sanitizeName(name) {
  const cleaned = String(name || '')
    .replace(/[<>&"'`\\]/g, '')
    .replace(/[\u0000-\u001f]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 12);
  return cleaned || '토벌자';
}

function displayNameOf(user) {
  if (!user) return '토벌자';
  if (user.displayName) return sanitizeName(user.displayName);
  return sanitizeName(`토벌자${user.uid.slice(0, 4)}`);
}

function rankScoreOf(stats) {
  const stage = Math.max(1, Math.min(20, stats.maxUnlockedStage | 0 || 1));
  const level = Math.max(1, Math.min(99999, stats.level | 0 || 1));
  return { stage, level, rankScore: stage * 100000 + level };
}

function progressScore(s) {
  if (!s) return 0;
  return (s.maxUnlockedStage || 1) * 1e9 + (s.level || 1) * 1e5 + Math.min(99999, s.monstersDefeated || 0);
}

const AUTH_ERRORS_KO = {
  'auth/invalid-email': '이메일 형식이 올바르지 않아요.',
  'auth/user-not-found': '가입되지 않은 이메일이에요.',
  'auth/wrong-password': '비밀번호가 틀렸어요.',
  'auth/invalid-credential': '이메일 또는 비밀번호가 올바르지 않아요.',
  'auth/invalid-login-credentials': '이메일 또는 비밀번호가 올바르지 않아요.',
  'auth/email-already-in-use': '이미 가입된 이메일이에요. 로그인해 주세요.',
  'auth/weak-password': '비밀번호는 6자리 이상으로 해주세요.',
  'auth/too-many-requests': '시도가 너무 많아요. 잠시 후 다시 시도해 주세요.',
  'auth/network-request-failed': '네트워크 연결을 확인해 주세요.',
  'auth/popup-closed-by-user': '로그인 창이 닫혔어요.',
  'auth/cancelled-popup-request': '로그인 창이 닫혔어요.',
  'auth/popup-blocked': '팝업이 차단됐어요. 브라우저에서 팝업을 허용해 주세요.',
  'auth/operation-not-allowed': '현재 이 로그인 방식은 사용할 수 없어요.'
};
function authErrorKo(err) {
  return (err && AUTH_ERRORS_KO[err.code]) || '로그인 처리 중 문제가 생겼어요. 잠시 후 다시 시도해 주세요.';
}

export class FirebaseManager {
  constructor(gameApp) {
    // 주의: 이 모듈은 main.js의 DOMContentLoaded(게임 생성)보다 먼저 실행되므로
    // 생성 시점의 gameApp은 비어 있을 수 있음 → 항상 window.gameApp을 늦게 참조
    this._gameApp = gameApp || null;
    this.currentUser = null;
    this.isSyncing = false;
    this.pendingSave = false;
    this.dirty = false;
    this.ready = false; // 로그인 직후 세이브 정리(reconcile)가 끝나기 전에는 클라우드에 쓰지 않음

    // 이 기기에 로그인 기록이 있으면 자동 로그인을 기다리는 동안 로그인 창을 띄우지 않음
    try {
      const owner = localStorage.getItem(SAVE_OWNER_KEY);
      if (owner && owner !== 'guest') this.closeAuthModal();
    } catch (e) { /* 무시 */ }
    this.initAuthListener();

    // 30초마다 변경분만 모아서 1회 저장
    setInterval(() => this.flush(false), CLOUD_SAVE_INTERVAL_MS);
    // 탭을 닫거나 백그라운드로 갈 때 즉시 저장
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.flush(true);
    });
    window.addEventListener('pagehide', () => this.flush(true));
  }

  get gameApp() {
    return this._gameApp || window.gameApp || null;
  }

  async waitForGame(timeoutMs = 8000) {
    const t0 = Date.now();
    while (!this.gameApp && Date.now() - t0 < timeoutMs) {
      await new Promise(r => setTimeout(r, 100));
    }
    return this.gameApp;
  }

  initAuthListener() {
    let isInitialCheck = true;
    onAuthStateChanged(auth, async user => {
      this.currentUser = user;
      this.ready = false;
      this.updateAuthUI(user);

      if (user) {
        this.nickname = null;
        // 로그인 상태로 접속하면 첫 화면(로그인/내 계정) 창을 바로 닫음 (매번 닉네임 창이 보이던 문제)
        this.closeAuthModal();
        await this.reconcileOnLogin(user);
        toast(`☁️ [${displayNameOf(user)}]님 계정으로 클라우드에 연결되었습니다!`);
        this.closeAuthModal();
        this.maybePromptNickname(user);
      } else if (isInitialCheck) {
        // 첫 화면에 로그인/회원가입 모달 자동 표시
        setTimeout(() => {
          if (!this.currentUser) this.openAuthModal();
        }, 350);
      }
      isInitialCheck = false;
    });
  }

  // 화면 표시는 항상 textContent로 (HTML 주입 차단)
  updateAuthUI(user) {
    const btnAuth = document.getElementById('hud-btn-auth');
    const authStatusText = document.getElementById('hud-auth-status');
    const modalProfile = document.getElementById('auth-modal-profile');
    const modalForms = document.getElementById('auth-modal-forms');
    if (!btnAuth || !authStatusText) return;

    authStatusText.textContent = '';
    const status = document.createElement('span');
    if (user) {
      const name = displayNameOf(user);
      authStatusText.append('☁️ ');
      status.style.color = '#22c55e';
      status.textContent = '동기화됨';
      const b = document.createElement('b');
      b.textContent = name;
      authStatusText.append(status, ': ', b);
      btnAuth.innerText = '👤 내 계정';
      if (modalProfile) modalProfile.style.display = 'block';
      if (modalForms) modalForms.style.display = 'none';
      const emailEl = document.getElementById('profile-email');
      const nameEl = document.getElementById('profile-name');
      if (emailEl) emailEl.textContent = user.email || 'Google 계정';
      if (nameEl) nameEl.textContent = name;
      const nickInput = document.getElementById('profile-nick-input');
      if (nickInput && document.activeElement !== nickInput) nickInput.value = name;
    } else {
      authStatusText.append('💾 ');
      status.style.color = '#f59e0b';
      status.textContent = '로컬 게스트';
      authStatusText.append(status);
      btnAuth.innerText = '🔑 로그인 / 백업';
      if (modalProfile) modalProfile.style.display = 'none';
      if (modalForms) modalForms.style.display = 'block';
    }
  }

  async loginWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      this.closeAuthModal();
      return result.user;
    } catch (err) {
      console.error('구글 로그인 실패:', err);
      toast(`⚠️ ${authErrorKo(err)}`);
    }
  }

  async loginWithEmail(email, password) {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      this.closeAuthModal();
      return result.user;
    } catch (err) {
      console.error('이메일 로그인 실패:', err);
      toast(`⚠️ ${authErrorKo(err)}`);
    }
  }

  async registerWithEmail(email, password, nickname) {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName: sanitizeName(nickname || '치이카와') });
      this.updateAuthUI(result.user);
      this.closeAuthModal();
      this.flush(true);
      return result.user;
    } catch (err) {
      console.error('회원가입 실패:', err);
      toast(`⚠️ ${authErrorKo(err)}`);
    }
  }

  // 로그아웃: 마지막 진행도를 저장한 뒤, 이 기기는 새 게스트 상태로 전환
  async logout() {
    try {
      await this.flush(true);
      const uid = this.currentUser && this.currentUser.uid;
      if (uid && this.gameApp) this.backupAccount(uid, this.gameApp.stats);
      await signOut(auth);
      if (this.gameApp && typeof this.gameApp.resetStatsToDefault === 'function') {
        const guestBackup = this.readJson(GUEST_BACKUP_KEY);
        if (guestBackup) {
          this.gameApp.applyStats(guestBackup);
          localStorage.removeItem(GUEST_BACKUP_KEY);
        } else {
          this.gameApp.resetStatsToDefault();
        }
      }
      localStorage.setItem(SAVE_OWNER_KEY, 'guest');
      toast('🚪 로그아웃되었습니다. 계정 진행도는 클라우드에 안전하게 보관돼요.');
      if (uid) console.log('로그아웃:', uid);
      this.closeAuthModal();
    } catch (err) {
      console.error('로그아웃 실패:', err);
    }
  }

  readJson(key) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  // 🛟 계정별 최고 진행도 백업 (클라우드 저장이 실패하거나 다른 기기 세이브에 덮여도 이 기기에서 복구 가능)
  backupAccount(uid, stats) {
    try {
      if (!uid || !stats) return;
      const key = ACCT_BACKUP_PREFIX + uid;
      const prev = this.readJson(key);
      if (!prev || progressScore(stats) >= progressScore(prev)) {
        localStorage.setItem(key, JSON.stringify(stats));
      }
    } catch (e) { /* 저장 공간 부족 등은 무시 */ }
  }

  // 로그인 직후: 후보 세이브(클라우드 / 이 기기 로컬 / 이 기기 계정 백업) 중 '가장 많이 진행한' 것 하나를 통째로 선택
  //  (필드별 섞기 금지 → 코인 복사 차단, 진행도가 같으면 더 최근 저장본)
  async reconcileOnLogin(user) {
    const game = await this.waitForGame(20000);
    if (!game) return;
    const uid = user.uid;
    const owner = localStorage.getItem(SAVE_OWNER_KEY) || 'guest';
    const local = game.stats;

    try {
      const snap = await getDoc(doc(db, 'users', uid));
      const cloud = snap.exists() ? snap.data() : null;
      const cloudStats = cloud && cloud.stats ? cloud.stats : null;
      this.cloudBase = cloudStats ? { stage: cloudStats.maxUnlockedStage || 1, level: cloudStats.level || 1 } : null;
      await this.restoreNickname(user, cloud);

      const cands = [];
      if (cloudStats) cands.push({ src: 'cloud', stats: cloudStats });
      if (owner === uid) cands.push({ src: 'local', stats: local });
      const backup = this.readJson(ACCT_BACKUP_PREFIX + uid);
      if (backup) cands.push({ src: 'backup', stats: backup });
      const better = (a, b) => {
        const pa = progressScore(a.stats), pb = progressScore(b.stats);
        if (pa !== pb) return pa > pb ? a : b;
        return (a.stats.savedAt || 0) >= (b.stats.savedAt || 0) ? a : b;
      };
      const pick = cands.length ? cands.reduce(better) : null;

      if (pick) {
        if (owner === 'guest' && pick.src !== 'local' && progressScore(local) > 1e9 + 1e5) {
          // 게스트 기록은 이 계정에 섞지 않고 기기에 따로 보관
          localStorage.setItem(GUEST_BACKUP_KEY, JSON.stringify(local));
          toast('💾 이 계정의 기록을 불러왔어요. (게스트 기록은 이 기기에 따로 보관됩니다)');
        }
        if (pick.src !== 'local') game.applyStats(pick.stats);
        if (cloud && cloud.activeCharKey && game.activeCharKey !== cloud.activeCharKey && owner !== uid) {
          if (typeof game.spawnPlayer === 'function') game.spawnPlayer(cloud.activeCharKey);
        }
        if (pick.src === 'cloud') toast('📥 클라우드 세이브 데이터를 동기화했습니다!');
        else if (cloudStats && progressScore(pick.stats) > progressScore(cloudStats)) {
          toast(`🛟 이 기기에 남아 있던 더 높은 진행도(Lv.${pick.stats.level || 1} · ${pick.stats.maxUnlockedStage || 1}단계)를 복구해 클라우드에 올려요!`);
        }
      } else if (owner !== 'guest' && owner !== uid) {
        // 새 계정인데 로컬은 다른 계정의 기록 → 새로 시작
        game.resetStatsToDefault();
      }
      // owner가 guest이고 클라우드 기록이 없으면: 게스트 진행도를 이 새 계정으로 그대로 이전

      localStorage.setItem(SAVE_OWNER_KEY, uid);
      this.backupAccount(uid, game.stats);
      this.ready = true;
      await this.flush(true);
    } catch (err) {
      console.error('클라우드 세이브 불러오기 실패:', err);
      toast('⚠️ 클라우드 세이브를 불러오지 못했어요. 잠시 후 다시 로그인해 주세요.');
    }
  }

  // 게임에서 저장 요청: 변경 표시만 하고, 실제 전송은 묶어서 처리
  requestSave(force = false) {
    this.dirty = true;
    if (force) this.flush(true);
  }

  // 기존 코드 호환용
  saveUserDataToCloud() {
    return this.flush(true);
  }

  async flush(force = false) {
    if (!this.currentUser || !this.gameApp || !this.ready) return false;
    if (!this.dirty && !force) return false;
    if (this.isSyncing) {
      this.pendingSave = true;
      return false;
    }

    const user = this.currentUser;
    this.backupAccount(user.uid, this.gameApp.stats);
    const stats = { ...this.gameApp.stats };
    TRANSIENT_STAT_KEYS.forEach(k => delete stats[k]);
    const full = rankScoreOf(stats);
    // 협동 클리어·레이드처럼 한 번에 많이 오르면 보안 규칙에 막혀 저장이 영영 실패하던 문제 → 규칙 한도만큼 나눠 저장
    let clamped = false;
    if (this.cloudBase) {
      const maxStage = this.cloudBase.stage + RULE_STAGE_STEP;
      const maxLevel = this.cloudBase.level + RULE_LEVEL_STEP;
      if (full.stage > maxStage) { stats.maxUnlockedStage = maxStage; clamped = true; }
      if (full.level > maxLevel) { stats.level = maxLevel; clamped = true; }
    }
    const { stage, level, rankScore } = rankScoreOf(stats);
    stats.maxUnlockedStage = stage;
    stats.level = level;
    const name = displayNameOf(user);

    this.isSyncing = true;
    this.dirty = false;
    try {
      const batch = writeBatch(db);
      // users: 본인만 읽을 수 있는 전체 세이브 (이메일은 저장하지 않음)
      batch.set(doc(db, 'users', user.uid), {
        uid: user.uid,
        displayName: name,
        ...(this.nickname ? { nickname: this.nickname } : {}),
        activeCharKey: this.gameApp.activeCharKey,
        stats,
        updatedAt: serverTimestamp()
      });
      // leaderboard: 누구나 읽는 공개 랭킹 (최소 정보만)
      batch.set(doc(db, 'leaderboard', user.uid), {
        name,
        charKey: this.gameApp.activeCharKey || 'chiikawa',
        level,
        stage,
        monsters: Math.max(0, stats.monstersDefeated | 0),
        rankScore,
        updatedAt: serverTimestamp()
      });
      await batch.commit();
      this.cloudBase = { stage, level };
      this.saveFailCount = 0;
      if (clamped) {
        // 남은 진행도는 곧바로 이어서 저장
        this.dirty = true;
        setTimeout(() => this.flush(true), 1200);
      }
      return true;
    } catch (err) {
      this.dirty = true;
      this.saveFailCount = (this.saveFailCount || 0) + 1;
      console.error('Firestore 저장 실패:', err);
      // 클라우드 기준값을 다시 읽어서 다음 저장을 맞춤
      try {
        const snap = await getDoc(doc(db, 'users', user.uid));
        const cs = snap.exists() && snap.data().stats;
        this.cloudBase = cs ? { stage: cs.maxUnlockedStage || 1, level: cs.level || 1 } : null;
      } catch (e) { /* 네트워크 문제면 다음에 재시도 */ }
      if (this.saveFailCount === 3) toast('⚠️ 클라우드 저장이 계속 실패하고 있어요. 진행도는 이 기기에 안전하게 보관 중이에요.');
      return false;
    } finally {
      this.isSyncing = false;
      if (this.pendingSave) {
        this.pendingSave = false;
        setTimeout(() => this.flush(true), 0);
      }
    }
  }

  // 실시간 토벌 랭킹 TOP 10 (공개 leaderboard 컬렉션, 단일 필드 정렬 → 별도 색인 불필요)
  async fetchLeaderboard() {
    try {
      const q = query(collection(db, 'leaderboard'), orderBy('rankScore', 'desc'), limit(10));
      const snap = await getDocs(q);
      const list = [];
      snap.forEach(d => {
        const v = d.data();
        list.push({
          name: sanitizeName(v.name),
          charKey: v.charKey || 'chiikawa',
          level: v.level | 0 || 1,
          stage: v.stage | 0 || 1,
          monsters: v.monsters | 0
        });
      });
      return list;
    } catch (err) {
      console.error('랭킹 조회 실패:', err);
      return null;
    }
  }

  // 랭킹 목록을 DOM으로 안전하게 렌더링
  async renderLeaderboard(container) {
    if (!container) return;
    const msg = text => {
      container.textContent = '';
      const d = document.createElement('div');
      d.style.cssText = 'padding:10px; color:#94a3b8; font-size:12px; text-align:center;';
      d.textContent = text;
      container.appendChild(d);
    };
    msg('랭킹 불러오는 중...');
    const ranks = await this.fetchLeaderboard();
    if (ranks === null) return msg('랭킹을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.');
    if (ranks.length === 0) return msg('아직 랭킹 데이터가 없습니다.');
    container.textContent = '';
    ranks.forEach((r, i) => {
      const row = document.createElement('div');
      row.style.cssText = 'display:flex; justify-content:space-between; padding:6px 8px; border-bottom:1px solid #f1f5f9; font-size:12px;';
      const left = document.createElement('span');
      const medal = i === 0 ? '👑' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i + 1}.`;
      const b = document.createElement('b');
      b.textContent = r.name;
      left.append(`${medal} `, b, ` (Lv.${r.level})`);
      const right = document.createElement('span');
      right.style.cssText = 'color:#ef4444; font-weight:800;';
      right.textContent = `Stage ${r.stage}`;
      row.append(left, right);
      container.appendChild(row);
    });
  }

  nickFlagKey(uid) { return `chiikawa_nick_set_${uid}`; }

  // ☁️ 클라우드에 저장된 닉네임을 계정 프로필에 다시 적용
  //  (구글 로그인은 접속할 때마다 프로필 이름이 구글 실명으로 되돌아가기 때문)
  async restoreNickname(user, cloud) {
    try {
      const isGoogle = (user.providerData || []).some(p => p && p.providerId === 'google.com');
      let nick = cloud && typeof cloud.nickname === 'string' ? sanitizeName(cloud.nickname) : null;
      // 예전 버전에서 바꾼 닉네임(저장 문서의 이름이 구글 이름과 다르면 직접 정한 것)
      if (!nick && cloud && typeof cloud.displayName === 'string' && cloud.displayName) {
        const prev = sanitizeName(cloud.displayName);
        if (!isGoogle || prev !== sanitizeName(user.displayName || '')) nick = prev;
      }
      // 이 기기에서 마지막으로 쓴 닉네임 (클라우드 기록이 아직 없을 때)
      if (!nick) {
        const localNick = localStorage.getItem(`chiikawa_nick_${user.uid}`);
        if (localNick) nick = sanitizeName(localNick);
      }
      if (!nick && !isGoogle && user.displayName) nick = sanitizeName(user.displayName);
      if (!nick) return;
      this.nickname = nick;
      try { localStorage.setItem(`chiikawa_nick_${user.uid}`, nick); localStorage.setItem(this.nickFlagKey(user.uid), '1'); } catch (e) {}
      if (user.displayName !== nick) {
        await updateProfile(user, { displayName: nick });
      }
      this.updateAuthUI(user);
      if (window.coop && typeof window.coop.reRegister === 'function') window.coop.reRegister();
    } catch (e) {
      console.warn('닉네임 복원 실패:', e);
    }
  }

  // 구글 계정은 실명이 그대로 보일 수 있으니 처음 한 번 게임 닉네임을 정하도록 안내
  maybePromptNickname(user) {
    try {
      if (!user || this.nickname || localStorage.getItem(this.nickFlagKey(user.uid))) return;
      const isGoogle = (user.providerData || []).some(p => p && p.providerId === 'google.com');
      localStorage.setItem(this.nickFlagKey(user.uid), '1');
      if (!isGoogle) return;
      setTimeout(() => {
        this.openAuthModal();
        const input = document.getElementById('profile-nick-input');
        if (input) { input.focus(); input.select(); }
        toast('🏷️ 다른 사람에게 보일 게임 닉네임을 정해보세요! (내 계정 → 닉네임 변경)');
      }, 600);
    } catch (e) { /* 무시 */ }
  }

  // 🏷️ 닉네임 변경: 계정 프로필(displayName)에 저장 → 랭킹·협동 이름표에 반영
  async changeNickname(raw) {
    const user = auth.currentUser;
    if (!user) {
      toast('⚠️ 닉네임은 로그인한 계정에서만 바꿀 수 있어요.');
      return false;
    }
    const cleaned = sanitizeName(raw);
    const typed = String(raw || '').trim();
    if (typed.length < 2 || cleaned.length < 2 || cleaned === '토벌자' && typed !== '토벌자') {
      toast('⚠️ 닉네임은 2~12자로 입력해 주세요. (< > & " \' ` \\ 는 쓸 수 없어요)');
      return false;
    }
    if (cleaned === displayNameOf(user)) {
      toast('🏷️ 지금 쓰고 있는 닉네임과 같아요.');
      return false;
    }
    const now = Date.now();
    if (this._nickChangedAt && now - this._nickChangedAt < 5000) {
      toast('⏳ 잠시 후 다시 바꿔 주세요.');
      return false;
    }
    this._nickChangedAt = now;
    try {
      await updateProfile(user, { displayName: cleaned });
      this.nickname = cleaned;
      try { localStorage.setItem(this.nickFlagKey(user.uid), '1'); localStorage.setItem(`chiikawa_nick_${user.uid}`, cleaned); } catch (e) {}
      this.updateAuthUI(user);
      this.dirty = true;
      await this.flush(true); // 랭킹 이름 즉시 갱신
      if (window.coop && typeof window.coop.reRegister === 'function') window.coop.reRegister();
      toast(`🏷️ 닉네임이 [${cleaned}](으)로 바뀌었어요!`);
      return true;
    } catch (err) {
      console.error('닉네임 변경 실패:', err);
      toast('⚠️ 닉네임을 바꾸지 못했어요. 네트워크를 확인하고 다시 시도해 주세요.');
      return false;
    }
  }

  openAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.add('visible');
  }

  closeAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.classList.remove('visible');
  }
}

// index.html 버튼에서 호출하는 전역 헬퍼
window.toggleLeaderboard = () => {
  const box = document.getElementById('auth-ranking-box');
  if (!box) return;
  if (box.style.display === 'none') {
    box.style.display = 'block';
    if (window.firebaseManager) window.firebaseManager.renderLeaderboard(box);
  } else {
    box.style.display = 'none';
  }
};

window.submitAuthForm = mode => {
  const email = (document.getElementById('auth-email-input').value || '').trim();
  const pw = document.getElementById('auth-password-input').value || '';
  if (mode === 'login') {
    if (!email || !pw) return toast('⚠️ 이메일과 비밀번호를 입력해주세요.');
    window.firebaseManager && window.firebaseManager.loginWithEmail(email, pw);
  } else {
    const nick = (document.getElementById('auth-nickname-input').value || '').trim() || '치이카와';
    if (!email || pw.length < 6) return toast('⚠️ 유효한 이메일과 6자리 이상 비밀번호를 입력해주세요.');
    window.firebaseManager && window.firebaseManager.registerWithEmail(email, pw, nick);
  }
};

window.saveNickname = async () => {
  const input = document.getElementById('profile-nick-input');
  if (!input || !window.firebaseManager) return;
  const btn = document.getElementById('profile-nick-btn');
  if (btn) btn.disabled = true;
  await window.firebaseManager.changeNickname(input.value);
  if (btn) btn.disabled = false;
};

window.backupNowToCloud = async () => {
  if (!window.firebaseManager) return;
  const ok = await window.firebaseManager.flush(true);
  toast(ok ? '☁️ 클라우드에 최신 데이터가 즉시 저장되었습니다!' : '⚠️ 지금은 저장할 수 없어요. 로그인 상태와 네트워크를 확인해 주세요.');
};
