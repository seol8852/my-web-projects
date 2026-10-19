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
        toast(`☁️ [${displayNameOf(user)}]님 계정으로 클라우드에 연결되었습니다!`);
        await this.reconcileOnLogin(user);
        this.closeAuthModal();
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

  // 로그인 직후: 이 기기의 로컬 세이브와 클라우드 세이브를 '통째로' 하나만 선택 (필드별 섞기 금지 → 코인 복사 차단)
  async reconcileOnLogin(user) {
    const game = await this.waitForGame();
    if (!game) return;
    const uid = user.uid;
    const owner = localStorage.getItem(SAVE_OWNER_KEY) || 'guest';
    const local = game.stats;

    try {
      const snap = await getDoc(doc(db, 'users', uid));
      const cloud = snap.exists() ? snap.data() : null;
      const cloudStats = cloud && cloud.stats ? cloud.stats : null;

      if (cloudStats) {
        if (owner === uid) {
          // 같은 계정: 더 최근에 저장된 쪽 사용
          const useLocal = (local.savedAt || 0) > (cloudStats.savedAt || 0);
          if (!useLocal) game.applyStats(cloudStats);
        } else {
          // 게스트/다른 계정의 로컬 기록은 이 계정에 섞지 않음 (게스트 기록은 기기에 백업)
          if (owner === 'guest' && progressScore(local) > 1e9 + 1e5) {
            localStorage.setItem(GUEST_BACKUP_KEY, JSON.stringify(local));
            toast('💾 이 계정의 클라우드 기록을 불러왔어요. (게스트 기록은 이 기기에 따로 보관됩니다)');
          }
          game.applyStats(cloudStats);
        }
        if (cloud.activeCharKey && game.activeCharKey !== cloud.activeCharKey && owner !== uid) {
          if (typeof game.spawnPlayer === 'function') game.spawnPlayer(cloud.activeCharKey);
        }
        toast('📥 클라우드 세이브 데이터를 동기화했습니다!');
      } else if (owner !== 'guest' && owner !== uid) {
        // 새 계정인데 로컬은 다른 계정의 기록 → 새로 시작
        game.resetStatsToDefault();
      }
      // owner가 guest이고 클라우드 기록이 없으면: 게스트 진행도를 이 새 계정으로 그대로 이전

      localStorage.setItem(SAVE_OWNER_KEY, uid);
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
    const stats = { ...this.gameApp.stats };
    TRANSIENT_STAT_KEYS.forEach(k => delete stats[k]);
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
      return true;
    } catch (err) {
      this.dirty = true;
      console.error('Firestore 저장 실패:', err);
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

window.backupNowToCloud = async () => {
  if (!window.firebaseManager) return;
  const ok = await window.firebaseManager.flush(true);
  toast(ok ? '☁️ 클라우드에 최신 데이터가 즉시 저장되었습니다!' : '⚠️ 지금은 저장할 수 없어요. 로그인 상태와 네트워크를 확인해 주세요.');
};
