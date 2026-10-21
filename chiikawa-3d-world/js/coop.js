// ==========================================================================
// 치이카와 3D 월드 - 온라인 협동 (1단계: 같이 돌아다니기) · Firebase Realtime Database
//  · 방 코드(5자리)로 최대 4명 입장, 방장 표시 및 자동 승계
//  · 위치/동작 10Hz 동기화 + 부드러운 보간, 공격·필살기·이모티콘 이벤트 공유
//  · 다른 플레이어 캐릭터는 같은 3D 모델/모션/이펙트로 그대로 재현
// ==========================================================================

import { getApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import {
  getDatabase, ref, set, update, get, remove, push, onValue, onChildAdded, onChildChanged,
  onChildRemoved, onDisconnect, runTransaction, query, limitToLast, limitToFirst, orderByKey, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// ⚠️ Firebase 콘솔에서 Realtime Database를 만들 때 위치를 '싱가포르(asia-southeast1)'로 선택하면 이 주소 그대로 사용됩니다.
//    다른 위치를 골랐다면 콘솔의 데이터베이스 주소로 바꿔주세요.
export const COOP_DB_URL = 'https://chiikawa-world-default-rtdb.asia-southeast1.firebasedatabase.app';

const MAX_PLAYERS = 10;          // 파티(전투 인스턴스) 최대 인원
// 🌐 온라인 월드: 로그인하면 모두가 같은 마을에 접속 (기존 방 규칙 그대로 쓰는 고정 방 'WORLD')
const WORLD = 'WORLD';
const WORLD_SEND = 0.15;         // 마을 위치 전송 주기 (≈7Hz)
const VISUAL_EVENTS = ['atk', 'ult', 'skl', 'emo'];
// ⚔️ 입장 존: 존 안의 모두가 [E] 준비하면 3초 뒤 함께 출발
const ZONES = {
  stage: { x: 32, z: -22, r: 8.2, label: '⚔️ 전투 스테이지 출격 존', color: '#f97316' },
  raid: { x: 8, z: -44, r: 7.5, label: '🐉 아노코 레이드 입장 존', color: '#a855f7' }
};
const ZONE_COUNTDOWN = 3;
const SEND_INTERVAL = 0.1;      // 위치 전송 주기(초) = 10Hz
const KEEPALIVE = 1.0;          // 가만히 있어도 1초마다 전송
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const EMOTES = ['👋', '❤️', '😂', '👍', '🎉', '😭'];
// 레이드 장소: 전투 콜로세움 최북단 원형 보스 성소 (arenaCenter z=-340 + 로컬 -202)
const RAID_CENTER = new THREE.Vector3(0, 0, -820); // 레이드 전용 원형 투기장 (raid_hq.js)
const RAID_BOSS_R = 38;

const toast = msg => (typeof showToast === 'function' ? showToast(msg) : console.log(msg));
const cleanName = n => (String(n || '').replace(/[<>&"'`\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, 12) || '토벌자');
const r2 = v => Math.round(v * 100) / 100;

export class CoopManager {
  constructor() {
    this.app = getApp();
    this.auth = getAuth(this.app);
    this.db = null;
    try {
      this.db = getDatabase(this.app, COOP_DB_URL);
    } catch (e) {
      console.error('Realtime Database 초기화 실패:', e);
    }
    this.room = null;
    this.uid = null;
    this.hostUid = null;
    this.players = {};
    this.remotes = new Map();
    this.listeners = [];
    this.sendTimer = 0;
    this.keepTimer = 0;
    this.lastSent = null;
    this.lastProfile = '';
    this.serverOffset = 0;
    this.joinedAt = 0;
    this.busy = false;
    this.raid = { active: false, id: null, boss: null, net: null, phase: 1, revive: {}, finishing: false };
    this.party = null;
    this.pendingJoin = null;
    this.pendingPlayers = null;
    this.w = { on: false, connecting: false, players: {}, remotes: new Map(), listeners: [], hostUid: null, joinedAt: 0, sendT: 0, keepT: 0, last: null, profile: '', pruneT: 0 };
    this.zone = { id: null, ready: false, stage: 1, countdown: null, going: false, members: [], panelT: 0 };
    this.worldOff = localStorage.getItem('chiikawa_world_off') === '1';

    this.buildUI();
    this.buildZonePanel();
    // 🌐 게임이 시작되고 로그인돼 있으면 자동으로 온라인 월드 접속
    setInterval(() => this.worldWatch(), 1500);
    this.buildChat();
    if (this.db) {
      onValue(ref(this.db, '.info/serverTimeOffset'), s => { this.serverOffset = s.val() || 0; });
    }
    onAuthStateChanged(this.auth, user => {
      if (!user && this.room) this.leaveRoom(true);
      if (!user && (this.w.on || this.w.connecting)) this.leaveWorld(true);
      this.renderModal();
      // 새로고침 시 같은 탭에서 있던 방에 자동 재입장
      if (user && !this.room) {
        const last = sessionStorage.getItem('chiikawa_coop_room');
        if (last) {
          // 게임이 시작될 때까지 기다렸다가 재입장
          const t0 = Date.now();
          const timer = setInterval(() => {
            const g = this.game;
            if (this.room || Date.now() - t0 > 120000) { clearInterval(timer); return; }
            if (g && g.gameStarted) { clearInterval(timer); this.joinRoom(last, true); }
          }, 1000);
        }
      }
    });
  }

  get game() { return window.gameApp || null; }
  now() { return Date.now() + this.serverOffset; }
  path(p) { return ref(this.db, `rooms/${this.room}${p ? '/' + p : ''}`); }

  // ------------------------------------------------------------------
  // 방 만들기 / 입장 / 나가기
  // ------------------------------------------------------------------
  checkReady() {
    if (!this.db) { toast('⚠️ 협동 서버가 아직 준비되지 않았어요.'); return false; }
    if (!this.auth.currentUser) { toast('🔑 협동 플레이는 로그인 후 이용할 수 있어요.'); return false; }
    if (!this.game || !this.game.gameStarted) { toast('🎮 캐릭터를 고르고 게임을 시작한 뒤 이용해 주세요.'); return false; }
    return true;
  }

  async createRoom(silent = false) {
    if (this.busy || !this.checkReady()) return null;
    if (this.room) await this.leaveRoom(true);
    this.busy = true;
    try {
      const uid = this.auth.currentUser.uid;
      for (let attempt = 0; attempt < 6; attempt++) {
        let code = '';
        for (let i = 0; i < 5; i++) code += CODE_CHARS[(Math.random() * CODE_CHARS.length) | 0];
        // 사람이 아무도 없는 빈 방(창을 그냥 닫아 남은 방)은 재사용
        const occupied = (await get(ref(this.db, `rooms/${code}/players`))).exists();
        if (occupied) continue;
        const res = await runTransaction(ref(this.db, `rooms/${code}/host`), () => uid);
        if (res.committed) {
          await set(ref(this.db, `rooms/${code}/createdAt`), serverTimestamp());
          await this.enterRoom(code);
          if (!silent) toast(`🏠 협동 방을 만들었어요! 친구에게 방 코드 [${code}]를 알려주세요.`);
          return code;
        }
      }
      toast('⚠️ 방을 만들지 못했어요. 잠시 후 다시 시도해 주세요.');
    } catch (e) {
      this.reportError(e);
    } finally {
      this.busy = false;
    }
    return null;
  }

  async joinRoom(rawCode, silent = false) {
    const code = String(rawCode || '').toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 5);
    if (code.length !== 5) { if (!silent) toast('⚠️ 방 코드 5자리를 입력해 주세요.'); return; }
    if (this.busy) return;
    if (!this.checkReady()) return;
    if (this.room === code) return;
    if (this.room) await this.leaveRoom(true);
    this.busy = true;
    try {
      const [hostSnap, playersSnap] = await Promise.all([
        get(ref(this.db, `rooms/${code}/host`)),
        get(ref(this.db, `rooms/${code}/players`))
      ]);
      const players = playersSnap.val() || {};
      if (!hostSnap.exists() || Object.keys(players).length === 0) {
        if (!silent) toast('⚠️ 그런 방이 없거나 이미 닫혔어요. 방 코드를 확인해 주세요.');
        sessionStorage.removeItem('chiikawa_coop_room');
        return;
      }
      const uid = this.auth.currentUser.uid;
      if (!players[uid] && Object.keys(players).length >= MAX_PLAYERS) {
        toast(`⚠️ 방이 가득 찼어요. (최대 ${MAX_PLAYERS}명)`);
        return;
      }
      // (온라인 월드에서는 같은 캐릭터도 함께 플레이 가능)
      await this.enterRoom(code);
      if (!silent) toast(`👥 [${code}] 방에 입장했어요!`);
    } catch (e) {
      this.reportError(e);
    } finally {
      this.busy = false;
    }
  }

  async enterRoom(code) {
    const user = this.auth.currentUser;
    this.room = code;
    this.uid = user.uid;
    this.joinedAt = this.now();
    this.roomJoinedLocal = Date.now();
    sessionStorage.setItem('chiikawa_coop_room', code);

    const g = this.game;
    const me = this.path(`players/${this.uid}`);
    const myState = this.path(`state/${this.uid}`);
    await onDisconnect(me).remove();
    await onDisconnect(myState).remove();
    await set(me, {
      name: cleanName(user.displayName || `토벌자${user.uid.slice(0, 4)}`),
      charKey: g.activeCharKey || 'chiikawa',
      hat: (g.stats && g.stats.equippedHat) || 'none',
      joinedAt: serverTimestamp()
    });
    this.lastProfile = `${g.activeCharKey}|${g.stats.equippedHat}`;
    this.sendState(true);

    const playersRef = this.path('players');
    const stateRef = this.path('state');
    const hostRef = this.path('host');
    const eventsQ = query(this.path('events'), limitToLast(25));

    this.listen(onChildAdded(playersRef, s => { this.players[s.key] = s.val(); this.syncRemote(s.key); this.checkDuplicateChar(); this.renderModal(); }));
    this.listen(onChildChanged(playersRef, s => { this.players[s.key] = s.val(); this.syncRemote(s.key, true); this.checkDuplicateChar(); this.renderModal(); }));
    this.listen(onChildRemoved(playersRef, s => {
      const p = this.players[s.key];
      delete this.players[s.key];
      this.removeRemote(s.key);
      if (s.key === this.uid && this.room) {
        // 내 입장 정보가 지워짐(연결 끊김 등) → 다시 등록
        this.reRegister();
      } else if (p) {
        toast(`👋 ${p.name}님이 방을 나갔어요.`);
      }
      this.checkHostMigration();
      this.renderModal();
    }));
    this.listen(onChildAdded(stateRef, s => this.onRemoteState(s.key, s.val())));
    this.listen(onChildChanged(stateRef, s => this.onRemoteState(s.key, s.val())));
    this.listen(onValue(hostRef, s => {
      this.hostUid = s.val();
      this.checkHostMigration();
      // 파티 전투 도중 방장이 되면 몬스터 진행을 이어받음
      const g = this.game;
      if (this.isHost() && g && g.partyRole === 'member' && this.party && g.battleState.active) {
        g.partyRole = 'host';
        const bs = g.battleState;
        set(this.path('raid/pinfo'), { active: true, id: this.party.id, kind: bs.mode, num: bs.stageNum || 1, dtype: bs.dungeonType || null, tier: bs.dungeonTier || 1, result: null }).catch(() => {});
        toast('👑 방장이 되어 파티 전투 진행을 이어받았어요.');
      }
      this.renderModal();
    }));
    this.listen(onChildAdded(eventsQ, s => this.onEvent(s.val() || {})));
    this.listen(onValue(this.path('raid/info'), s => this.onRaidInfo(s.val())));
    this.listen(onValue(this.path('raid/boss'), s => this.onRaidBoss(s.val())));
    this.listen(onValue(this.path('raid/pinfo'), s => this.onPartyInfo(s.val())));
    this.listen(onValue(this.path('raid/pstate'), s => this.onPartyState(s.val())));

    this.renderModal();
    this.renderHudPill();
  }

  async reRegister() {
    if (!this.room || !this.auth.currentUser) return;
    try {
      const g = this.game;
      await set(this.path(`players/${this.uid}`), {
        name: cleanName(this.auth.currentUser.displayName || `토벌자${this.uid.slice(0, 4)}`),
        charKey: g.activeCharKey || 'chiikawa',
        hat: (g.stats && g.stats.equippedHat) || 'none',
        joinedAt: serverTimestamp()
      });
    } catch (e) { /* 무시 */ }
  }

  listen(unsub) { this.listeners.push(unsub); }

  async leaveRoom(silent = false) {
    if (!this.room) return;
    if (this.raid.active || (this.game && this.game.raidMode)) this.exitRaid(true);
    if (this.game && this.game.partyRole) {
      // 방을 나가면 진행 중인 스테이지는 혼자 계속
      if (this.game.partyRole === 'host' && this.party) set(this.path('raid/pinfo'), { active: false, id: this.party.id }).catch(() => {});
      this.game.partyRole = null;
      this.party = null;
    }
    const code = this.room;
    const uid = this.uid;
    this.listeners.forEach(u => { try { u(); } catch (e) {} });
    this.listeners = [];
    this.remotes.forEach((r, k) => this.removeRemote(k));
    this.players = {};
    this.room = null;
    this.hostUid = null;
    sessionStorage.removeItem('chiikawa_coop_room');
    try {
      await remove(ref(this.db, `rooms/${code}/state/${uid}`));
      await remove(ref(this.db, `rooms/${code}/players/${uid}`));
      await onDisconnect(ref(this.db, `rooms/${code}/players/${uid}`)).cancel();
      await onDisconnect(ref(this.db, `rooms/${code}/state/${uid}`)).cancel();
      // 마지막 사람이 나가면 방 정리
      const left = await get(ref(this.db, `rooms/${code}/players`));
      if (!left.exists()) await remove(ref(this.db, `rooms/${code}`));
    } catch (e) { /* 이미 정리됨 */ }
    this.closeChat && this.closeChat();
    if (!silent) toast('🚪 협동 방에서 나왔어요.');
    this.renderModal();
    this.renderHudPill();
  }

  // 방장이 나가면 가장 먼저 들어온 사람이 방장을 이어받음 (2단계 레이드에서 보스 계산 담당)
  checkHostMigration() {
    if (!this.room || !this.uid) return;
    const ids = Object.keys(this.players);
    if (!ids.length || (this.hostUid && this.players[this.hostUid])) return;
    const next = ids.sort((a, b) => (this.players[a].joinedAt || 0) - (this.players[b].joinedAt || 0))[0];
    if (next !== this.uid) return;
    const oldHost = this.hostUid;
    runTransaction(this.path('host'), cur => (cur === oldHost || cur === null ? this.uid : undefined))
      .then(res => { if (res.committed) toast('👑 방장이 되었어요.'); })
      .catch(() => {});
  }

  reportError(e) {
    console.error('협동 오류:', e);
    const msg = String((e && (e.code || e.message)) || '');
    if (/permission/i.test(msg)) toast('⚠️ 협동 서버 권한 오류예요. Realtime Database 규칙이 게시됐는지 확인해 주세요.');
    else if (/network|disconnect|offline/i.test(msg)) toast('⚠️ 네트워크 연결을 확인해 주세요.');
    else toast('⚠️ 협동 서버에 연결하지 못했어요. Realtime Database가 만들어져 있는지 확인해 주세요.');
  }

  // ------------------------------------------------------------------
  // 내 상태 전송
  // ------------------------------------------------------------------
  sendState(force = false) {
    const g = this.game;
    if (!this.room || !g || !g.playerPos) return;
    const p = g.playerPos;
    const st = {
      x: r2(p.x), y: r2(p.y), z: r2(p.z),
      mv: Math.hypot(g.playerVel.x, g.playerVel.z) > 0.6 || (g.dashTimer > 0) ? 1 : 0,
      gr: g.isGrounded ? 1 : 0,
      vy: r2(g.playerVelY || 0),
      ar: this.area(),
      dn: g.isDowned ? 1 : 0,
      t: this.now()
    };
    const prev = this.lastSent;
    const changed = !prev || Math.abs(prev.x - st.x) > 0.05 || Math.abs(prev.z - st.z) > 0.05 ||
      Math.abs(prev.y - st.y) > 0.05 || prev.mv !== st.mv || prev.gr !== st.gr || prev.ar !== st.ar || prev.dn !== st.dn;
    if (!changed && !force && this.keepTimer < KEEPALIVE) return;
    this.keepTimer = 0;
    this.lastSent = st;
    set(this.path(`state/${this.uid}`), st).catch(() => {});
  }

  sendEvent(type, data = {}) {
    // 채팅과 마을에서의 동작 연출은 온라인 월드 전체로, 전투·레이드 진행은 파티 방으로
    if (this.w.on && (type === 'chat' || (VISUAL_EVENTS.includes(type) && this.area() === 'town'))) {
      push(this.wpath('events'), { ...data, type, uid: this.w.uid, ts: this.now() }).catch(() => {});
      return;
    }
    if (!this.room) return;
    push(this.path('events'), { ...data, type, uid: this.uid, ts: this.now() }).catch(() => {});
  }

  onLocalAttack(combo, yaw, center) {
    this.sendEvent('atk', { c: combo, yaw: r2(yaw), x: r2(center.x), z: r2(center.z) });
  }
  onLocalUlt(yaw) {
    this.sendEvent('ult', { yaw: r2(yaw) });
  }
  emote(e) {
    if (!EMOTES.includes(e)) return;
    const g = this.game;
    if (g && g.playerPos) this.showBubble(g.playerPos, e, 3.0);
    this.sendEvent('emo', { e });
  }

  // ------------------------------------------------------------------
  // 다른 플레이어
  // ------------------------------------------------------------------
  syncRemote(uid, changed = false) {
    if (uid === this.uid) return;
    const info = this.players[uid];
    if (!info) return;
    let r = this.remotes.get(uid);
    if (r && changed && r.charKey !== info.charKey) {
      this.removeRemote(uid);
      r = null;
    }
    if (!r) {
      const g = this.game;
      if (!g || typeof createChiikawaPlushie !== 'function') return;
      const mesh = createChiikawaPlushie(info.charKey);
      mesh.visible = false;
      g.scene.add(mesh);
      const label = document.createElement('div');
      label.className = 'coop-name-tag';
      label.textContent = cleanName(info.name);
      document.body.appendChild(label);
      r = {
        uid, mesh, label, charKey: info.charKey, hat: null,
        target: null, area: 'town', moving: false, grounded: true, vy: 0,
        walkTime: 0, atkTimer: 0, combo: 0, maxAtk: 0.28, flip: 1, lastPos: new THREE.Vector3(), hasPos: false
      };
      this.remotes.set(uid, r);
      if (!changed && this.joinedAt && Date.now() - this.joinedAt > 2000) toast(`🎉 ${cleanName(info.name)}님이 들어왔어요!`);
    }
    r.label.textContent = (uid === this.hostUid ? '👑 ' : '') + cleanName(info.name);
    if (info.hat !== r.hat && r.mesh.userData.equipHat) {
      r.hat = info.hat;
      r.mesh.userData.equipHat(info.hat || 'none');
    }
  }

  removeRemote(uid) {
    const r = this.remotes.get(uid);
    if (!r) return;
    const g = this.game;
    if (g) {
      g.scene.remove(r.mesh);
      if (typeof g.disposeObject3D === 'function') g.disposeObject3D(r.mesh);
    }
    r.label.remove();
    this.remotes.delete(uid);
  }

  onRemoteState(uid, st) {
    if (!st || uid === this.uid) return;
    if (!this.remotes.has(uid)) this.syncRemote(uid);
    const r = this.remotes.get(uid);
    if (!r) return;
    r.target = new THREE.Vector3(st.x || 0, st.y || 0, st.z || 0);
    r.area = st.ar || 'town';
    r.moving = !!st.mv;
    r.grounded = st.gr !== 0;
    r.vy = st.vy || 0;
    r.downed = !!st.dn;
    if (!r.hasPos) {
      r.mesh.position.copy(r.target);
      r.lastPos.copy(r.target);
      r.hasPos = true;
    }
  }

  onEvent(ev) {
    if (!ev || !ev.type || ev.uid === this.uid) return;
    if ((ev.ts || 0) < this.joinedAt - 500) return; // 입장 전 이벤트는 무시
    if (ev.type === 'chat') { this.onChatEvent(ev); return; }
    if (this.onPartyEvent(ev)) return;
    if (this.onRaidEvent(ev)) return;
    if (this.w.on && this.area() === 'town' && VISUAL_EVENTS.includes(ev.type)) return; // 마을 연출은 월드 채널이 담당
    this.playVisual(this.remotes.get(ev.uid), ev);
  }

  // 원격 플레이어의 공격·궁극기·스킬·이모티콘 연출
  playVisual(r, ev) {
    const g = this.game;
    if (!r || !g || !r.hasPos) return;
    const sameArea = r.area === this.area();

    if (ev.type === 'emo') {
      if (sameArea) this.showBubble(r.mesh.position, ev.e, 3.0);
      return;
    }
    if (!sameArea) return;
    const cfg = (typeof CHAR_CONFIGS !== 'undefined' && CHAR_CONFIGS[r.charKey]) || {};

    if (ev.type === 'atk') {
      r.combo = ev.c || 1;
      r.maxAtk = r.combo === 3 ? 0.36 : 0.25;
      r.atkTimer = r.maxAtk;
      const center = new THREE.Vector3(ev.x, 0, ev.z);
      this.withRemoteContext(r, ev.yaw, () => {
        if (typeof g.spawnCharacterAttackEffect3D === 'function') {
          g.spawnCharacterAttackEffect3D(r.charKey, r.combo, center, ev.yaw || 0, cfg.accentColor || 0xffffff);
        }
      });
    } else if (ev.type === 'ult') {
      r.combo = 99;
      r.maxAtk = 1.25;
      r.atkTimer = 1.25;
      this.withRemoteContext(r, ev.yaw, () => {
        if (typeof g.spawnUltimateEffect3D === 'function') g.spawnUltimateEffect3D(r.charKey);
      });
      if (typeof FXHQ !== 'undefined') {
        FXHQ.ultimate({ getPos: () => r.mesh.position, color: cfg.accentColor || 0xfacc15, duration: 1.25, noScreen: true });
      }
      this.showBubble(r.mesh.position, `🌟 ${cfg.skillName || '궁극기'}!`, 1.6, true);
    } else if (ev.type === 'skl') {
      if (typeof SKILLS !== 'undefined') {
        const yaw = Number(ev.yaw) || 0;
        const side = Math.sin(yaw) * Math.cos(g.camYaw) - Math.cos(yaw) * Math.sin(g.camYaw);
        if (Math.abs(side) > 0.1) r.flip = side > 0 ? 1 : -1;
        SKILLS.playRemote(g, r, ev);
      }
    }
  }

  // 원격 플레이어 위치/방향 기준으로 기존 이펙트 함수를 재사용하기 위한 임시 컨텍스트 전환
  withRemoteContext(r, yaw, fn) {
    const g = this.game;
    const savedPos = g.playerPos;
    const savedYaw = g.playerYaw;
    const savedFwd = g.ultForward;
    try {
      g.playerPos = r.mesh.position.clone();
      g.playerYaw = yaw || 0;
      g.ultForward = new THREE.Vector3(Math.sin(g.playerYaw), 0, Math.cos(g.playerYaw));
      fn();
    } catch (e) {
      console.warn('원격 이펙트 오류:', e);
    } finally {
      g.playerPos = savedPos;
      g.playerYaw = savedYaw;
      g.ultForward = savedFwd;
    }
  }

  showBubble(worldPos, text, dur = 3, big = false) {
    const g = this.game;
    if (!g || !g.camera) return;
    const el = document.createElement('div');
    el.className = 'coop-emote-bubble' + (big ? ' wide' : '');
    el.textContent = text;
    document.body.appendChild(el);
    const pos = worldPos;
    const start = performance.now();
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      if (t > dur || !el.isConnected) { el.remove(); return; }
      const v = new THREE.Vector3(pos.x, pos.y + 5.6 + t * 0.25, pos.z).project(g.camera);
      if (v.z > 1) el.style.display = 'none';
      else {
        el.style.display = '';
        el.style.left = `${(v.x * 0.5 + 0.5) * window.innerWidth}px`;
        el.style.top = `${(-v.y * 0.5 + 0.5) * window.innerHeight}px`;
        el.style.opacity = String(Math.min(1, (dur - t) * 2.5));
      }
      requestAnimationFrame(tick);
    };
    tick();
  }

  // ------------------------------------------------------------------
  // 매 프레임 (main.js의 updateEffects에서 호출)
  // ------------------------------------------------------------------
  update(dt) {
    const g = this.game;
    if (!g || !g.camera) return;
    this.worldUpdate(dt);
    this.zoneUpdate(dt);
    if (!this.room) return;
    // 전투·레이드가 끝나고 마을로 돌아오면 파티 방은 자동 해산 (마을에서는 온라인 월드로 다 같이)
    if (this.area() === 'town' && !this.raid.active && !g.partyRole && !this.zone.going && Date.now() - (this.roomJoinedLocal || 0) > 25000) {
      const res = document.getElementById('stage-result-modal');
      const resultOpen = res && (res.classList.contains('open') || res.classList.contains('visible') || res.classList.contains('active'));
      if (!resultOpen) { this.leaveRoom(true); return; }
    }

    // 내 상태 전송
    this.sendTimer += dt;
    this.keepTimer += dt;
    if (this.sendTimer >= SEND_INTERVAL) {
      this.sendTimer = 0;
      this.sendState(false);
    }
    // 캐릭터/모자 변경 반영
    const profile = `${g.activeCharKey}|${g.stats.equippedHat}`;
    if (profile !== this.lastProfile) {
      this.lastProfile = profile;
      update(this.path(`players/${this.uid}`), { charKey: g.activeCharKey, hat: g.stats.equippedHat || 'none' }).catch(() => {});
    }

    const myArea = this.area();
    this.updateRevive(dt);
    this.hostPartyTick(dt);
    if (this.raid.active) {
      this.raidHudT = (this.raidHudT || 0) + dt;
      if (this.raidHudT > 0.5) { this.raidHudT = 0; g.updateBattleStageHud(); }
    }
    // 내 캐릭터 기절 연출 (옆으로 쓰러짐)
    if (g.isDowned && g.playerMesh && g.playerMesh.userData.parts) {
      const sg = g.playerMesh.userData.parts.standeeGroup;
      sg.rotation.z = 1.35 * Math.sign(sg.scale.x || 1);
      sg.position.y = -0.6;
    }
    const camFwd = new THREE.Vector3(-Math.sin(g.camYaw), 0, -Math.cos(g.camYaw));
    const camRight = new THREE.Vector3(Math.cos(g.camYaw), 0, -Math.sin(g.camYaw));
    const t = g.clock ? g.clock.elapsedTime : 0;

    this.remotes.forEach(r => {
      const visible = r.hasPos && r.area === myArea && !(myArea === 'town' && this.w.on);
      r.mesh.visible = visible;
      if (!visible) { r.label.style.display = 'none'; return; }

      // 보간 이동 (멀리 튀면 순간이동)
      if (r.target) {
        if (r.mesh.position.distanceTo(r.target) > 18) r.mesh.position.copy(r.target);
        else r.mesh.position.lerp(r.target, 1 - Math.exp(-dt * 12));
      }
      const vel = r.mesh.position.clone().sub(r.lastPos).setY(0);
      r.lastPos.copy(r.mesh.position);
      const speed = vel.length() / Math.max(dt, 0.001);
      const moving = r.moving || speed > 1.2;

      // 내 카메라 기준으로 좌우 방향 / 뒷모습 결정
      if (speed > 0.5) {
        const d = vel.normalize();
        const side = d.dot(camRight);
        if (Math.abs(side) > 0.15) r.flip = side > 0 ? 1 : -1;
        if (r.mesh.userData.setBackView) r.mesh.userData.setBackView(d.dot(camFwd) > 0.55 && r.atkTimer <= 0 && !r.skillAnim);
      } else if (r.mesh.userData.setBackView) {
        r.mesh.userData.setBackView(false);
      }

      if (moving && r.grounded) r.walkTime += dt * 16; else r.walkTime = 0;
      if (r.atkTimer > 0) r.atkTimer -= dt;
      r.mesh.rotation.y = g.camYaw;
      const parts = r.mesh.userData.parts;
      if (parts && parts.standeeGroup) {
        parts.standeeGroup.scale.x = THREE.MathUtils.lerp(parts.standeeGroup.scale.x || 1, r.flip, Math.min(1, dt * 16));
      }
      if (r.mesh.userData.updateMotion) {
        r.mesh.userData.updateMotion(t, r.walkTime, moving, r.grounded, r.vy, Math.max(0, r.atkTimer), r.combo, r.maxAtk);
      }
      if (r.skillAnim && typeof SKILLS !== 'undefined' && !SKILLS.applyPose(r.mesh, r.skillAnim)) r.skillAnim = null;
      // 이름표 + 기절/부활 표시
      const info = this.players[r.uid];
      const baseName = (r.uid === this.hostUid ? '👑 ' : '') + cleanName(info && info.name);
      const canRev = r.downed && !g.isDowned && r.mesh.position.distanceTo(g.playerPos) < 4.5;
      if (r.downed && parts && parts.standeeGroup) {
        parts.standeeGroup.rotation.z = 1.35 * Math.sign(parts.standeeGroup.scale.x || 1);
        parts.standeeGroup.position.y = -0.6;
      }
      r.label.textContent = r.downed ? (canRev ? (this.revivesLeft() > 0 ? `💫 [E] 눌러서 부활! (남은 ${this.revivesLeft()}회)` : '💫 부활 기회 없음') : `💫 ${baseName} (기절)`) : baseName;
      r.label.classList.toggle('downed', !!r.downed);

      // 이름표
      const v = r.mesh.position.clone().add(new THREE.Vector3(0, 5.2, 0)).project(g.camera);
      if (v.z > 1 || Math.abs(v.x) > 1.2 || Math.abs(v.y) > 1.2) {
        r.label.style.display = 'none';
      } else {
        r.label.style.display = '';
        r.label.style.left = `${(v.x * 0.5 + 0.5) * window.innerWidth}px`;
        r.label.style.top = `${(-v.y * 0.5 + 0.5) * window.innerHeight}px`;
      }
    });
  }


  // ==================================================================
  // 🐉 2단계: 협동 레이드 (방장이 보스 AI 담당, 파티원은 자기 데미지만 전송)
  // ==================================================================
  isHost() { return !!this.room && this.hostUid === this.uid; }

  area() {
    const g = this.game;
    if (!g) return 'town';
    if (g.raidMode) return 'raid';
    if (g.partyRole && g.battleState && g.battleState.active) return 'party';
    return g.battleState && g.battleState.active ? 'arena' : 'town';
  }

  raidPlayerCount() {
    return Object.keys(this.players).length || 1;
  }

  async startRaid() {
    if (!this.isHost()) { toast('👑 레이드는 방장만 시작할 수 있어요.'); return; }
    if (this.raid.active) return;
    const g = this.game;
    const n = this.raidPlayerCount();
    const lv = (g && g.stats && g.stats.level) || 1;
    // 🔥 하드 난이도: 체력 약 3배 (인원·레벨에 비례)
    const maxHp = Math.round((18000 + 13000 * n) * (1 + (lv - 1) * 0.1));
    const id = Date.now().toString(36);
    try {
      await set(this.path('raid/boss'), { x: RAID_CENTER.x, z: RAID_CENTER.z - 16, yaw: 0, hp: maxHp, ph: 1, t: this.now() });
      await set(this.path('raid/info'), { active: true, id, maxHp, n, result: null, startedAt: serverTimestamp() });
    } catch (e) {
      this.reportError(e);
    }
  }

  async abortRaid() {
    if (!this.isHost() || !this.raid.active) return;
    try { await update(this.path('raid/info'), { result: 'abort' }); } catch (e) { this.reportError(e); }
  }

  onRaidInfo(info) {
    const R = this.raid;
    if (info && info.active && !info.result && (!R.active || R.id !== info.id)) {
      this.enterRaid(info);
    } else if (info && info.result && R.active && R.id === info.id && !R.finishing) {
      this.finishRaid(info.result);
    } else if ((!info || !info.active) && R.active && !R.finishing) {
      this.exitRaid();
    }
    this.renderModal();
  }

  onRaidBoss(b) {
    const R = this.raid;
    if (!b || !R.active) return;
    R.net = b;
    const m = R.boss;
    if (m && !this.isHost()) {
      m.hp = Math.max(0, b.hp);
      if (b.ph && b.ph > R.phase && b.ph < 3) {
        this.showRaidBanner('⚡ 2페이즈 돌입!', '돌진과 대폭발 패턴이 추가돼요. 장판을 잘 피하세요!', '#f97316', 2200);
      }
      if (b.ph === 3 && !R.p3) this.enterPhase3(m);
      if (b.ph) R.phase = b.ph;
    }
  }

  enterRaid(info) {
    const g = this.game;
    if (!g || !g.gameStarted) return;
    const R = this.raid;
    if (R.active) this.cleanupRaidLocal();
    R.active = true;
    R.id = info.id;
    R.maxHp = info.maxHp;
    R.finishing = false;
    R.resultSent = false;
    R.phase = 1;
    R.aiCd = 3.0;
    R.sendT = 0;
    R.allDownT = 0;
    R.revive = {};
    R.lastTarget = null;
    R.p3 = false;
    if (typeof RAIDHQ !== 'undefined') { RAIDHQ.reset(g); RAIDHQ.ensureArena(g); }
    if (typeof loadCleanCharacterTexture === 'function') loadCleanCharacterTexture('assets/anoko_phase3.png'); // 3페이즈 미리 로드

    // 진행 중인 스테이지/모달 정리 후 보스 성소로 이동
    if (typeof closeStageSelectModal === 'function') closeStageSelectModal();
    if (typeof closeStageResultModal === 'function') closeStageResultModal();
    g.clearStageMonsters();
    g.clearAllInputKeys();
    g.raidMode = true;
    g.isDowned = false;
    g.battleState = {
      ...g.battleState,
      active: true, mode: 'raid', sectors: null, stageNum: 0,
      title: '🐉 협동 레이드 · 거대 아노코', totalMonsters: 1, killedMonsters: 0, elapsedTime: 0,
      currentSectorIdx: 0, currentWaveIdx: 0, waitingAdvance: false
    };
    g.stats.hp = g.stats.maxHp;
    const a = Math.random() * Math.PI * 0.8 + Math.PI * 0.1;
    g.playerPos.set(RAID_CENTER.x + Math.cos(a) * 14, 0, RAID_CENTER.z + 20 + Math.sin(a) * 3);
    g.playerVel.set(0, 0, 0);
    g.playerVelY = 0;
    g.camYaw = 0;
    // 성소 입구의 붉은 아치에 카메라가 걸리지 않도록 레이드 동안은 조금 가깝고 높은 시점
    if (!R.savedCam) R.savedCam = { d: g.camDist, p: g.camPitch };
    g.camDist = 27;
    g.camPitch = 0.45;
    document.body.classList.add('raid-mode');

    // 보스 생성 (기존 몬스터 시스템과 호환되는 객체)
    const scale = 2.7;
    const mesh = createMonster3D('anoko');
    mesh.scale.setScalar(scale);
    const pos = new THREE.Vector3(RAID_CENTER.x, 0, RAID_CENTER.z - 16);
    mesh.position.copy(pos);
    g.scene.add(mesh);
    const labelEl = document.createElement('div');
    labelEl.className = 'world-label monster-hud-tag';
    labelEl.style.borderColor = '#facc15';
    labelEl.style.background = 'rgba(15, 23, 42, 0.92)';
    const nameDiv = document.createElement('div');
    nameDiv.textContent = '👹 거대 아노코 ';
    const status = document.createElement('span');
    status.className = 'monster-status-tag';
    status.style.cssText = 'font-size:10px; color:#38bdf8;';
    nameDiv.appendChild(status);
    const track = document.createElement('div');
    track.className = 'monster-hp-track';
    const fill = document.createElement('div');
    fill.className = 'monster-hp-fill';
    fill.style.width = '100%';
    track.appendChild(fill);
    labelEl.append(nameDiv, track);
    document.getElementById('world-labels-layer').appendChild(labelEl);
    const m = {
      type: 'anoko', name: '👹 거대 아노코', isBoss: true, isRaidBoss: true,
      hp: R.net ? R.net.hp : info.maxHp, maxHp: info.maxHp, atk: 26, reach: 9, atkPattern: 'circle',
      coin: 0, exp: 0, mesh, pos, homePos: pos.clone(), baseScale: scale, facingYaw: 0,
      bodyRadius: (mesh.userData.bodyRadius || 2.4) * scale, sizeH: (mesh.userData.sizeH || 8.6) * scale,
      isArmored: false, knockbackVel: new THREE.Vector3(), labelEl, statusEl: status, hpFillEl: fill,
      alive: true, respawnTimer: 999999, atkCooldown: 99, isWindingUp: false, slowTimer: 0, stunTimer: 0,
      heightOffset: 8.8 * scale
    };
    g.monsters.push(m);
    R.boss = m;
    g.updateBattleStageHud();
    this.showRaidBanner('🐉 협동 레이드 시작!', '거대 아노코를 함께 쓰러뜨리세요! 쓰러진 동료에게 가서 [E]를 누르면 부활! (팀 전체 5회)', '#f97316');
    if (typeof soundFx !== 'undefined') soundFx.playFanfare();
    if (typeof FXHQ !== 'undefined') FXHQ.shockwave(new THREE.Vector3(pos.x, 0, pos.z), 0xef4444, 30);
    this.sendState(true);
  }

  cleanupRaidLocal() {
    const g = this.game;
    const R = this.raid;
    if (g && R.boss) {
      const i = g.monsters.indexOf(R.boss);
      if (i >= 0) g.monsters.splice(i, 1);
      g.scene.remove(R.boss.mesh);
      if (typeof g.disposeObject3D === 'function') g.disposeObject3D(R.boss.mesh);
      if (R.boss.labelEl) R.boss.labelEl.remove();
    }
    R.boss = null;
    if (typeof RAIDHQ !== 'undefined') RAIDHQ.reset(g);
  }

  exitRaid(silent = true) {
    const g = this.game;
    const R = this.raid;
    if (!R.active && !(g && g.raidMode)) return;
    // 방장이 도중에 나가면 보스를 계산할 사람이 없으므로 모두의 레이드를 종료
    if (!silent && R.active && !R.finishing && this.isHost()) this.abortRaid();
    this.cleanupRaidLocal();
    R.active = false;
    R.finishing = false;
    R.net = null;
    if (g) {
      g.isDowned = false;
      g.invulnTimer = 0;
      document.body.classList.remove('raid-mode');
      if (R.savedCam) {
        g.camDist = R.savedCam.d;
        g.camPitch = R.savedCam.p;
        R.savedCam = null;
      }
      if (g.raidMode) {
        g.raidMode = false;
        g.returnToTown(false);
      }
    }
    if (!silent) toast('⛲ 레이드를 마치고 광장으로 돌아왔어요.');
    this.sendState(true);
  }

  finishRaid(result) {
    const R = this.raid;
    const g = this.game;
    R.finishing = true;
    if (result === 'clear') {
      const n = this.raidPlayerCount();
      const coins = 600 + 150 * n;
      const exp = 450 + 60 * n;
      if (R.boss) {
        R.boss.alive = false;
        R.boss.mesh.visible = false;
        R.boss.labelEl.style.display = 'none';
        if (typeof FXHQ !== 'undefined') FXHQ.deathPoof(R.boss.pos.clone().add(new THREE.Vector3(0, 5, 0)), 0xfacc15);
      }
      if (g) {
        g.stats.raidsCleared = (g.stats.raidsCleared || 0) + 1;
        g.addReward(coins, exp, 'raid');
        g.saveData(true);
      }
      if (typeof soundFx !== 'undefined') soundFx.playFanfare();
      this.showRaidBanner('🏆 레이드 클리어!!', `파티 ${n}명이 거대 아노코를 쓰러뜨렸어요! +${coins}🪙 +${exp}EXP`, '#22c55e');
    } else if (result === 'fail') {
      this.showRaidBanner('💀 레이드 실패…', '파티 전원이 쓰러졌어요. 장비를 강화하고 다시 도전해 보세요!', '#ef4444');
    } else {
      this.showRaidBanner('🚪 레이드 종료', '방장이 레이드를 종료했어요.', '#64748b');
    }
    setTimeout(() => {
      this.exitRaid(true);
      // 방장이 레이드 기록을 정리 → 다음 레이드 시작 가능
      if (this.isHost()) remove(this.path('raid')).catch(() => {});
      this.renderModal();
    }, 4200);
  }

  // 파티원이 보스에게 준 데미지 → 방장에게 전송 (방장은 바로 반영)
  onRaidDamage(m, amt) {
    const R = this.raid;
    if (!R.active || !m || !m.isRaidBoss) return;
    m.stunTimer = 0;
    if (!this.isHost()) {
      this.sendEvent('rdmg', { a: Math.min(50000, Math.round(amt)), rid: R.id });
    }
  }

  onLocalDowned() {
    const g = this.game;
    if (!g || g.isDowned) return;
    g.isDowned = true;
    g.stats.hp = 0;
    g.playerVel.set(0, 0, 0);
    g.attackTimer = 0;
    g.updateHud();
    this.showBubble(g.playerPos, '💫 기절!', 2.5, true);
    const left = this.revivesLeft();
    toast(left > 0 ? `💫 쓰러졌어요! 동료가 옆에 와서 [E]를 누르면 부활해요. (남은 부활 ${left}회)` : '💫 쓰러졌어요… 부활 기회(5회)를 모두 사용했어요.');
    this.sendState(true);
  }

  reviveLocal() {
    const g = this.game;
    if (!g || !g.isDowned) return;
    g.isDowned = false;
    g.stats.hp = Math.round(g.stats.maxHp * 0.4);
    g.invulnTimer = 2.0;
    g.updateHud();
    if (typeof FXHQ !== 'undefined') FXHQ.burst(g.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0x86efac, 18);
    this.showBubble(g.playerPos, '✨ 부활!', 2, true);
    toast('✨ 동료 덕분에 부활했어요!');
    this.sendState(true);
  }

  // 원격 이벤트 중 레이드 관련 처리 (true를 반환하면 처리 완료)
  onRaidEvent(ev) {
    const R = this.raid;
    // 파티 전투의 부활 이벤트
    if (ev.type === 'rrev' && ev.rid === 'party') {
      this.countRevive(ev.n);
      if (ev.to === this.uid) this.reviveLocal();
      return true;
    }
    if (!R.active || ev.rid !== R.id) return ev.type === 'rtele' || ev.type === 'rdmg' || ev.type === 'rrev';
    if (ev.type === 'rtele') {
      if (ev.uid === this.hostUid) this.spawnRaidTelegraph(ev);
      return true;
    }
    if (ev.type === 'rdmg') {
      if (this.isHost() && R.boss) {
        R.boss.hp = Math.max(0, R.boss.hp - Math.max(0, Math.min(50000, ev.a || 0)));
        if (R.boss.mesh.userData.flashHit) R.boss.mesh.userData.flashHit('body');
      }
      return true;
    }
    if (ev.type === 'rrev') {
      this.countRevive(ev.n);
      if (ev.to === this.uid) this.reviveLocal();
      return true;
    }
    return false;
  }

  spawnRaidTelegraph(t) {
    const g = this.game;
    const R = this.raid;
    if (!g || !R.boss) return;
    const center = new THREE.Vector3(t.x, 0, t.z);
    g.spawnMonsterAttackTelegraph(R.boss, t.p, center, t.yaw || 0, t.r, t.d);
    const tg = g.telegraphs[g.telegraphs.length - 1];
    if (tg) tg.duration = t.dur || tg.duration;
    // 기 모으기 연출 시간을 실제 장판 시간에 맞춤
    if (t.dur) { R.boss.windupT = t.dur; R.boss.windupMax = t.dur; }
    R.boss.isWindingUp = false; // 보스는 여러 장판을 동시에 깔 수 있음
  }

  hostTelegraph(p, x, z, yaw, r, dur, d) {
    const t = { p, x: r2(x), z: r2(z), yaw: r2(yaw), r, dur, d, rid: this.raid.id };
    this.spawnRaidTelegraph(t);
    this.sendEvent('rtele', t);
  }

  // 방장 기준 레이드 참가자 목록 (나 + 같은 레이드에 있는 원격 플레이어)
  raidMembers() {
    const g = this.game;
    const list = [{ uid: this.uid, pos: g.playerPos, downed: !!g.isDowned }];
    this.remotes.forEach(r => {
      if (r.area === 'raid' && r.hasPos) list.push({ uid: r.uid, pos: r.target || r.mesh.position, downed: !!r.downed });
    });
    return list;
  }

  // main.js 몬스터 루프에서 보스 차례가 오면 호출
  updateRaidBoss(m, dt) {
    const g = this.game;
    const R = this.raid;
    const t = g.clock.elapsedTime;
    if (m.mesh.userData.updateMonsterMotion) {
      m.mesh.userData.updateMonsterMotion(t, true, 0, m.facingYaw);
    }
    m.mesh.rotation.y = g.camYaw;
    const bs = m.baseScale || 1;
    m.mesh.scale.lerp(new THREE.Vector3(bs, bs, bs), dt * 9);
    if (m.mesh.userData.weakPointMarker) m.mesh.userData.weakPointMarker.visible = true;
    if (m.statusEl) m.statusEl.textContent = R.phase >= 3 ? '🔥광폭화' : R.phase === 2 ? '⚡2페이즈' : '';
    if (m.hpFillEl) m.hpFillEl.style.width = `${Math.max(0, (m.hp / m.maxHp) * 100)}%`;

    if (!this.isHost()) {
      // 파티원: 방장이 보내준 위치로 보간
      if (R.net) {
        const target = new THREE.Vector3(R.net.x, 0, R.net.z);
        if (m.pos.distanceTo(target) > 40) m.pos.copy(target); else m.pos.lerp(target, 1 - Math.exp(-dt * 8));
        m.facingYaw += g.angleDifference(R.net.yaw || 0, m.facingYaw) * Math.min(1, dt * 8);
      }
      m.mesh.position.set(m.pos.x, 0, m.pos.z);
      return;
    }

    // ---------------- 방장: 보스 AI ----------------
    if (R.finishing || R.resultSent) { m.mesh.position.set(m.pos.x, 0, m.pos.z); return; }
    const ratio = m.hp / m.maxHp;
    let phase = ratio <= 0.3 ? 3 : ratio <= 0.65 ? 2 : 1;
    if (R.p3) phase = 3; // 3페이즈는 체력이 회복돼도 유지
    if ((phase === 3 || m.hp <= 0) && !R.p3) {
      // 🔥 3페이즈 변신: 체력 절반으로 회복 (한 방에 체력을 다 깎아도 반드시 변신)
      phase = 3;
      m.hp = Math.round(m.maxHp * 0.5);
      R.aiCd = 2.6; // 변신 연출 동안 잠깐 멈춤
      this.enterPhase3(m);
    } else if (phase !== R.phase && phase === 2) {
      this.showRaidBanner('⚡ 2페이즈 돌입!', '돌진과 대폭발 패턴이 추가돼요. 장판을 잘 피하세요!', '#f97316', 2200);
    }
    R.phase = phase;
    const members = this.raidMembers();
    const alive = members.filter(p => !p.downed);
    if (alive.length) {
      let best = alive[0];
      let bd = Infinity;
      alive.forEach(p => { const d = p.pos.distanceTo(m.pos); if (d < bd) { bd = d; best = p; } });
      const dir = best.pos.clone().sub(m.pos).setY(0);
      const dist = dir.length();
      if (dist > 0.1) {
        const targetYaw = Math.atan2(dir.x, dir.z);
        m.facingYaw += g.angleDifference(targetYaw, m.facingYaw) * Math.min(1, dt * 3.5);
      }
      if (R.dash) {
        // 돌진: 예고 시간 동안 멈춰 있다가 레인을 따라 고속 이동
        if (R.dash.wait > 0) R.dash.wait -= dt;
        else {
          m.pos.lerp(R.dash.to, 1 - Math.exp(-dt * 14));
          R.dash.go -= dt;
          if (R.dash.go <= 0) R.dash = null;
        }
      } else if (dist > Math.max(13, (m.bodyRadius || 0) + 5) && R.aiCd > 0.6 && !(m.windupT > 0)) {
        m.pos.addScaledVector(dir.normalize(), dt * (phase === 3 ? 12.5 : phase === 2 ? 10.5 : 9.0));
      }
      // 성소 밖으로 나가지 않게
      const off = m.pos.clone().sub(RAID_CENTER).setY(0);
      if (off.length() > RAID_BOSS_R) m.pos.copy(RAID_CENTER).addScaledVector(off.normalize(), RAID_BOSS_R).setY(0);

      R.aiCd -= dt;
      if (R.aiCd <= 0) {
        R.aiCd = phase === 3 ? 1.05 : phase === 2 ? 1.45 : 1.9;
        this.bossAttack(m, best, alive, phase);
      }
    }
    m.mesh.position.set(m.pos.x, Math.abs(Math.sin(t * 2.2)) * 0.15, m.pos.z);

    // 상태 전송 (10Hz)
    R.sendT += dt;
    if (R.sendT >= 0.1) {
      R.sendT = 0;
      set(this.path('raid/boss'), { x: r2(m.pos.x), z: r2(m.pos.z), yaw: r2(m.facingYaw), hp: Math.max(0, Math.round(m.hp)), ph: phase, t: this.now() }).catch(() => {});
    }
    // 종료 판정
    if (m.hp <= 0) {
      R.resultSent = true;
      update(this.path('raid/info'), { result: 'clear' }).catch(() => {});
    } else if (members.length && members.every(p => p.downed)) {
      R.allDownT += dt;
      if (R.allDownT > 1.5) {
        R.resultSent = true;
        update(this.path('raid/info'), { result: 'fail' }).catch(() => {});
      }
    } else {
      R.allDownT = 0;
    }
  }

  // 🔥 3페이즈: 진짜 모습으로 변신 (방장/파티원 공통 연출)
  enterPhase3(m) {
    const R = this.raid;
    if (R.p3 || !m) return;
    R.p3 = true;
    R.phase = 3;
    if (typeof RAIDHQ !== 'undefined') RAIDHQ.phase3(this.game, m);
    if (m.labelEl && m.labelEl.firstChild) m.labelEl.firstChild.firstChild && (m.labelEl.firstChild.firstChild.textContent = '😈 각성한 아노코 ');
    m.name = '😈 각성한 아노코';
    this.showRaidBanner('😈 아노코 각성!!', '진짜 모습을 드러냈다! 체력이 절반까지 회복되고 진홍빛 오라에 휩싸였어요!', '#b0000f', 3200);
    if (typeof soundFx !== 'undefined') soundFx.playFanfare();
  }

  bossAttack(m, target, alive, phase) {
    const R = this.raid;
    const roll = Math.random();
    const mx = m.pos.x, mz = m.pos.z;
    const toT = target.pos.clone().sub(m.pos).setY(0);
    const yawT = Math.atan2(toT.x, toT.z);
    const dm = (phase === 3 ? 1.5 : phase === 2 ? 1.25 : 1) * 1.8;   // 🔥 기본 데미지 대폭 상향
    const D = v => Math.round(v * dm * 1.4); // 🔥 보스 데미지 추가 상향 (x1.4)
    const T = (p, x, z, yaw, r, dur, d) => this.hostTelegraph(p, x, z, yaw, r, dur, d);

    const slam = () => T('circle', mx, mz, 0, 17, 1.15, D(42));
    const sweep = () => T('sector', mx, mz, yawT, 24, 0.95, D(38));
    const targets = (dur = 1.15) => alive.forEach(p => {
      T('circle', p.pos.x, p.pos.z, 0, 7.5, dur, D(32));
      // 도망칠 방향을 예측한 2차 장판
      const v = p.pos.clone().sub(RAID_CENTER).setY(0);
      const ahead = p.pos.clone().add(v.lengthSq() > 1 ? v.normalize().multiplyScalar(9) : new THREE.Vector3(9, 0, 0));
      T('circle', ahead.x, ahead.z, 0, 6.5, dur + 0.45, D(28));
    });
    const meteors = (count, dmg = 30) => {
      const n = Math.round(count * 1.6);
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * 42;
        T('circle', RAID_CENTER.x + Math.cos(a) * r, RAID_CENTER.z + Math.sin(a) * r, 0, 6.2, 0.95 + i * 0.1, D(dmg));
      }
    };
    const cross = (offset = 0) => {
      for (let i = 0; i < 4; i++) T('line', mx, mz, yawT + offset + i * Math.PI / 2, 60, 1.1, D(40));
    };
    const charge = () => {
      [-0.3, 0, 0.3].forEach(o => T('line', mx, mz, yawT + o, 52, 1.05, D(40)));
      const dashTo = new THREE.Vector3(mx + Math.sin(yawT) * 34, 0, mz + Math.cos(yawT) * 34);
      const off = dashTo.clone().sub(RAID_CENTER);
      if (off.length() > RAID_BOSS_R) dashTo.copy(RAID_CENTER).addScaledVector(off.normalize(), RAID_BOSS_R);
      R.dash = { wait: 1.05, go: 0.35, to: dashTo };
    };
    const nova = () => {
      // 💥 대폭발: 보스 주변 거대한 원 → 멀리 도망치거나 대시 무적으로만 회피
      T('circle', mx, mz, 0, 28, 1.9, D(60));
      R.aiCd += 0.6;
    };

    if (phase === 1) {
      if (roll < 0.25) slam();
      else if (roll < 0.5) sweep();
      else if (roll < 0.75) targets();
      else if (roll < 0.9) cross();
      else { sweep(); targets(1.4); }
    } else if (phase === 2) {
      if (roll < 0.18) nova();
      else if (roll < 0.36) charge();
      else if (roll < 0.52) { cross(); meteors(4); }
      else if (roll < 0.68) { targets(); sweep(); }
      else if (roll < 0.84) meteors(8);
      else { slam(); cross(Math.PI / 4); }
    } else {
      // 🔥 광폭화: 모든 공격이 연계 + 메테오 동반
      if (roll < 0.2) { nova(); meteors(5); }
      else if (roll < 0.4) { charge(); targets(1.3); }
      else if (roll < 0.6) { cross(); cross(Math.PI / 4); }
      else if (roll < 0.8) { meteors(12, 34); sweep(); }
      else { slam(); targets(); meteors(4); }
    }
  }

  // 부활 횟수: 레이드/파티 전투 한 판마다 팀 전체 합산 5회
  reviveKey() {
    if (this.raid.active) return 'raid:' + this.raid.id;
    return this.party ? 'party:' + this.party.id : 'none';
  }
  revivesLeft() {
    const k = this.reviveKey();
    if (this._revKey !== k) { this._revKey = k; this._revUsed = 0; }
    return Math.max(0, 5 - this._revUsed);
  }
  // id: 부활 이벤트 고유값 (같은 이벤트가 두 번 들어와도 한 번만 계산)
  countRevive(id) {
    this.revivesLeft();
    if (!this._revSeen || this._revSeenKey !== this._revKey) { this._revSeen = new Set(); this._revSeenKey = this._revKey; }
    if (id) {
      if (this._revSeen.has(id)) return;
      this._revSeen.add(id);
    }
    this._revUsed++;
  }
  nearestDownedRemote(maxD = 4.5) {
    const g = this.game;
    const myArea = this.area();
    let best = null;
    let bd = maxD;
    this.remotes.forEach(r => {
      if (r.area !== myArea || !r.downed || !r.hasPos) return;
      const d = r.mesh.position.distanceTo(g.playerPos);
      if (d < bd) { bd = d; best = r; }
    });
    return best;
  }
  // [E] 쓰러진 동료 즉시 부활 (처리했으면 true)
  tryReviveNearby() {
    const g = this.game;
    const R = this.raid;
    if (!g || g.isDowned || !(R.active || g.partyRole)) return false;
    const r = this.nearestDownedRemote(4.5);
    if (!r) return false;
    if (this.revivesLeft() <= 0) {
      toast('💫 부활 기회(팀 전체 5회)를 모두 사용했어요!');
      return true;
    }
    const n = Math.random().toString(36).slice(2, 10);
    this.countRevive(n);
    this.sendEvent('rrev', { to: r.uid, rid: R.active ? R.id : 'party', n });
    r.downed = false;
    if (typeof FXHQ !== 'undefined') {
      FXHQ.burst(r.mesh.position.clone().add(new THREE.Vector3(0, 2, 0)), 0x86efac, 22);
      FXHQ.shockwave(r.mesh.position.clone().setY(0), 0x86efac, 4);
    }
    if (typeof soundFx !== 'undefined') soundFx.playFanfare();
    this.showBubble(r.mesh.position, '✨ 부활!', 2, true);
    toast(`✨ 동료를 부활시켰어요! (남은 부활 ${this.revivesLeft()}회)`);
    return true;
  }
  updateRevive() {}

  decorateRaidHud() {
    const R = this.raid;
    if (!R.active) return;
    const g = this.game;
    const members = this.raidMembers();
    const down = members.filter(p => p.downed).length;
    const secTxtEl = document.getElementById('battle-sector-txt');
    const distTxtEl = document.getElementById('battle-dist-txt');
    const progFillEl = document.getElementById('battle-progress-fill');
    const remainEl = document.getElementById('battle-stage-remain');
    if (secTxtEl) secTxtEl.innerText = `👥 파티 ${members.length}명${down ? ` · 💫 쓰러진 동료 ${down}명 (가서 [E]로 부활 · 남은 ${this.revivesLeft()}회)` : ' · 장판을 피하고 등 뒤를 노리세요!'}`;
    const pct = R.boss ? Math.max(0, Math.round((1 - R.boss.hp / R.boss.maxHp) * 100)) : 0;
    if (distTxtEl) distTxtEl.innerText = `${R.phase >= 3 ? '🔥 광폭화' : R.phase === 2 ? '⚡ 2페이즈' : '1페이즈'} · ${pct}%`;
    if (progFillEl) progFillEl.style.width = `${Math.max(4, pct)}%`;
    if (remainEl) remainEl.innerText = g.isDowned ? '💫 기절 중' : '레이드 진행 중';
  }

  showRaidBanner(title, sub, color = '#f97316', ms = 3200) {
    const el = document.createElement('div');
    el.className = 'raid-banner';
    el.style.setProperty('--raid-color', color);
    const t = document.createElement('div');
    t.className = 'raid-banner-title';
    t.textContent = title;
    const s = document.createElement('div');
    s.className = 'raid-banner-sub';
    s.textContent = sub;
    el.append(t, s);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), ms);
  }


  // ==================================================================
  // 👥 같은 캐릭터 금지
  // ==================================================================
  charOwner(key) {
    return null; // 온라인 월드: 같은 캐릭터 허용
    // eslint-disable-next-line no-unreachable
    const players = this.room ? this.players : (this.pendingJoin ? this.pendingPlayers || {} : {});
    for (const [uid, p] of Object.entries(players)) {
      if (uid !== (this.uid || (this.auth.currentUser && this.auth.currentUser.uid)) && p && p.charKey === key) return p;
    }
    return null;
  }
  isCharTaken(key) { return !!this.charOwner(key); }

  // 캐릭터를 새로 고른 직후 (main.js startGameWithSelectedChar 끝에서 호출)
  onCharChosen() {
    if (this.pendingJoin) {
      const code = this.pendingJoin;
      this.pendingJoin = null;
      this.pendingPlayers = null;
      setTimeout(() => this.joinRoom(code), 300);
    }
  }

  // 동시에 같은 캐릭터로 들어온 경우: 늦게 들어온 사람이 다시 고름
  checkDuplicateChar() {
    return; // 온라인 월드: 같은 캐릭터 허용
    // eslint-disable-next-line no-unreachable
    if (!this.room || !this.uid) return;
    const me = this.players[this.uid];
    if (!me) return;
    const clash = Object.entries(this.players).find(([uid, p]) => uid !== this.uid && p.charKey === me.charKey && (p.joinedAt || 0) <= (me.joinedAt || 0));
    if (!clash || this.dupNotified === me.charKey) return;
    this.dupNotified = me.charKey;
    const cfg = (typeof CHAR_CONFIGS !== 'undefined' && CHAR_CONFIGS[me.charKey]) || {};
    toast(`🙅 ${cleanName(clash[1].name)}님이 이미 [${cfg.name || me.charKey}]를 쓰고 있어요. 다른 캐릭터를 골라주세요!`);
    const g = this.game;
    if (g && !g.battleState.active && !g.raidMode) g.openCharSelectScreen();
  }

  // ==================================================================
  // ⚔️ 파티 전투 스테이지 (방장이 몬스터/웨이브/구역 진행 담당)
  // ==================================================================
  partyRoleFor(opts = {}) {
    if (!this.room) return null;
    if (opts.party) return 'member';
    return this.isHost() ? 'host' : null;
  }

  // 방 안에서 방장이 아닌 사람이 혼자 스테이지를 시작하려 할 때
  blockSoloStage() {
    if (this.room && !this.isHost()) {
      toast('👑 파티 중에는 방장이 스테이지를 시작하면 다 함께 출격해요!');
      return true;
    }
    return false;
  }

  onStageStarted(opts = {}) {
    const g = this.game;
    if (!g) return;
    if (g.partyRole === 'host') {
      const id = Date.now().toString(36);
      this.party = { id };
      const bs = g.battleState;
      set(this.path('raid/pinfo'), {
        active: true, id, kind: bs.mode, num: bs.stageNum || 1,
        dtype: bs.dungeonType || null, tier: bs.dungeonTier || 1, result: null
      }).catch(e => this.reportError(e));
      this.partySendT = 0;
      this.partyAllDownT = 0;
      if (this.raidPlayerCount() > 1) toast(`👥 파티원 ${this.raidPlayerCount() - 1}명과 함께 출격합니다!`);
    } else if (g.partyRole === 'member') {
      this.party = { id: opts.partyId };
    }
    this.sendState(true);
  }

  onPartyInfo(info) {
    const g = this.game;
    if (!g || !g.gameStarted) return;
    if (g.partyRole === 'host') return;
    const P = this.party;
    if (info && info.active && !info.result) {
      if (g.raidMode) return;
      if (P && P.id === info.id && g.partyRole === 'member') return;
      if (typeof closeStageResultModal === 'function') closeStageResultModal();
      g.isDowned = false;
      if (info.kind === 'dungeon') g.startSpecialDungeon(info.dtype || 'exp', info.tier || 1, { party: true, partyId: info.id });
      else g.startBattleStage(info.num || 1, { party: true, partyId: info.id });
      toast('⚔️ 방장과 함께 출격! 몬스터와 구역 진행이 파티 전체에 공유돼요.');
    } else if (info && info.result && P && P.id === info.id && g.partyRole === 'member') {
      if (info.result === 'clear') this.memberStageClear();
      else if (info.result === 'fail') {
        g.partyRole = null;
        this.party = null;
        g.isDowned = false;
        g.returnToTown(true);
        toast('💀 파티 전원이 쓰러졌어요… 광장으로 돌아왔어요.');
      }
    } else if ((!info || !info.active) && P && g.partyRole === 'member') {
      g.partyRole = null;
      this.party = null;
      g.isDowned = false;
      if (g.battleState.active) {
        g.returnToTown(false);
        toast('🚪 방장이 전투에서 나가서 파티 전투가 끝났어요.');
      }
    }
  }

  // 방장 → 파티원: 구역/웨이브 진행과 살아있는 몬스터 상태 (10Hz)
  hostPartyTick(dt) {
    const g = this.game;
    if (g.partyRole !== 'host' || !g.battleState.active || !this.party) return;
    this.partySendT = (this.partySendT || 0) + dt;
    if (this.partySendT >= 0.1) {
      this.partySendT = 0;
      const mons = {};
      g.monsters.forEach(m => {
        if (m.alive && m.netId) mons[m.netId] = [r2(m.pos.x), r2(m.pos.z), r2(m.facingYaw || 0), Math.max(0, Math.round(m.hp))];
      });
      const bs = g.battleState;
      set(this.path('raid/pstate'), {
        id: this.party.id, sec: bs.currentSectorIdx || 0, wave: bs.currentWaveIdx || 0,
        adv: bs.waitingAdvance ? 1 : 0, killed: bs.killedMonsters || 0, el: Math.round(bs.elapsedTime || 0), mons, t: this.now()
      }).catch(() => {});
    }
    // 전원 기절 → 실패
    const members = this.partyMembers();
    if (members.length && members.every(p => p.downed)) {
      this.partyAllDownT = (this.partyAllDownT || 0) + dt;
      if (this.partyAllDownT > 1.5) {
        update(this.path('raid/pinfo'), { result: 'fail' }).catch(() => {});
        this.partyAllDownT = -999;
        g.partyRole = null;
        this.party = null;
        g.isDowned = false;
        g.returnToTown(true);
      }
    } else {
      this.partyAllDownT = 0;
    }
  }

  onPartyState(st) {
    const g = this.game;
    if (!st || !g || g.partyRole !== 'member' || !this.party || st.id !== this.party.id) return;
    const bs = g.battleState;
    if (!bs.active || !bs.sectors) return;
    const secChanged = bs.currentSectorIdx !== st.sec || !!bs.waitingAdvance !== !!st.adv;
    bs.currentSectorIdx = st.sec;
    bs.currentWaveIdx = st.wave;
    bs.waitingAdvance = !!st.adv;
    bs.killedMonsters = st.killed;
    if (secChanged) {
      g.updateArenaBarrierVisual();
      if (st.adv) toast('🔓 구역 돌파! 앞으로 전진하세요!');
    }
    const mons = st.mons || {};
    // 새로 나타난 몬스터 생성 / 위치·체력 갱신
    Object.keys(mons).forEach(id => {
      const [x, z, yaw, hp] = mons[id];
      let m = g.monsters.find(mm => mm.netId === id);
      if (!m) {
        const [s, w, i] = id.split('_').map(Number);
        const sec = bs.sectors[s];
        const def = sec && sec.waves[w] && sec.waves[w][i];
        if (!def) return;
        g._forceSpawn = true;
        try { g.spawnSectorWaveMonsters([def], sec.localZ, false); } finally { g._forceSpawn = false; }
        m = g.monsters[g.monsters.length - 1];
        if (!m) return;
        m.netId = id;
        m.pos.set(x, 0, z);
        m.mesh.position.copy(m.pos);
      }
      if (!m.alive) return;
      m.netTarget = new THREE.Vector3(x, 0, z);
      m.netYaw = yaw;
      if (hp < m.hp || hp > m.hp + 1) m.hp = hp;
    });
    // 사라진 몬스터 = 처치됨
    g.monsters.forEach(m => {
      if (m.alive && m.netId && !mons[m.netId]) this.memberKill(m);
    });
    g.updateBattleStageHud();
  }

  updatePartyMonster(m, dt) {
    const g = this.game;
    if (m.mesh.userData.updateMonsterMotion) {
      const moving = m.netTarget && m.netTarget.distanceTo(m.pos) > 0.3;
      m.mesh.userData.updateMonsterMotion(g.clock.elapsedTime, moving, 0, m.facingYaw);
    }
    if (m.netTarget) {
      if (m.pos.distanceTo(m.netTarget) > 15) m.pos.copy(m.netTarget);
      else m.pos.lerp(m.netTarget, 1 - Math.exp(-dt * 10));
    }
    if (m.netYaw !== undefined) m.facingYaw += g.angleDifference(m.netYaw, m.facingYaw) * Math.min(1, dt * 8);
    const bs = m.baseScale || 1;
    m.mesh.scale.lerp(new THREE.Vector3(bs, bs, bs), dt * 9);
    m.mesh.rotation.y = g.camYaw;
    m.mesh.position.set(m.pos.x, 0, m.pos.z);
    if (m.mesh.userData.weakPointMarker) m.mesh.userData.weakPointMarker.visible = false;
    if (m.hpFillEl) m.hpFillEl.style.width = `${Math.max(0, (m.hp / m.maxHp) * 100)}%`;
  }

  memberKill(m) {
    const g = this.game;
    m.hp = 0;
    m.alive = false;
    m.isWindingUp = false;
    m.mesh.visible = false;
    if (m.labelEl) m.labelEl.style.display = 'none';
    if (typeof FXHQ !== 'undefined') FXHQ.deathPoof(m.pos.clone().add(new THREE.Vector3(0, 2.4, 0)), 0xfacc15);
    if (typeof soundFx !== 'undefined') soundFx.playCoin();
    g.stats.monstersDefeated++;
    g.addReward(m.coin || 0, m.exp || 0, 'monster');
    g.spawnFloatingText(m.pos.clone().add(new THREE.Vector3(0, 4.2, 0)), `🎉 파티 토벌! +${m.coin || 0}🪙 +${m.exp || 0}EXP`, '#facc15');
  }

  memberStageClear() {
    const g = this.game;
    const bs = g.battleState;
    if (!bs.active || !bs.sectors) return;
    g.monsters.forEach(m => { if (m.alive) this.memberKill(m); });
    bs.currentSectorIdx = bs.sectors.length - 1;
    bs.currentWaveIdx = bs.sectors[bs.currentSectorIdx].waves.length - 1;
    bs.waitingAdvance = false;
    g.isDowned = false;
    g.partyRole = 'clearing';
    try { g.checkStageClearCondition(); } finally { g.partyRole = 'member'; }
  }

  onHostStageClear() {
    if (!this.party) return;
    update(this.path('raid/pinfo'), { result: 'clear' }).catch(() => {});
  }

  // returnToTown 직전에 호출 (방장이 나가면 파티 전투 종료)
  onLeaveStage() {
    const g = this.game;
    if (!g) return;
    if (g.partyRole === 'host' && this.party) {
      set(this.path('raid/pinfo'), { active: false, id: this.party.id }).catch(() => {});
    }
    g.partyRole = null;
    this.party = null;
    g.isDowned = false;
    this.sendState(true);
  }

  // 방장: 몬스터가 쫓아갈 가장 가까운 파티원
  nearestPartyPos(pos) {
    const alive = this.partyMembers().filter(p => !p.downed);
    if (!alive.length) return this.game.playerPos;
    let best = alive[0].pos;
    let bd = Infinity;
    alive.forEach(p => { const d = p.pos.distanceTo(pos); if (d < bd) { bd = d; best = p.pos; } });
    return best;
  }

  // 방장: 구역 전진 판정은 파티원 중 가장 앞선 사람 기준
  partyMinLocalZ() {
    const g = this.game;
    let mz = Infinity;
    this.partyMembers().forEach(p => { mz = Math.min(mz, p.pos.z - g.arenaCenter.z); });
    return mz;
  }

  partyMembers() {
    const g = this.game;
    const list = [{ uid: this.uid, pos: g.playerPos, downed: !!g.isDowned }];
    this.remotes.forEach(r => {
      if (r.area === 'party' && r.hasPos) list.push({ uid: r.uid, pos: r.target || r.mesh.position, downed: !!r.downed });
    });
    return list;
  }

  // 파티원 → 방장: 몬스터에게 준 데미지
  onPartyDamage(m, amt) {
    if (!m || !m.netId) return;
    this.sendEvent('sdmg', { id: m.netId, a: Math.min(50000, Math.round(amt)), pid: this.party && this.party.id });
  }

  // 방장 → 파티원: 몬스터 공격 예고 장판
  onHostTelegraph(m, patternType, center, yaw, reach, dmg) {
    if (!m || !m.netId || !this.party) return;
    this.sendEvent('stele', { id: m.netId, p: patternType, x: r2(center.x), z: r2(center.z), yaw: r2(yaw || 0), r: reach, d: dmg, pid: this.party.id });
  }

  onPartyEvent(ev) {
    const g = this.game;
    if (ev.type !== 'sdmg' && ev.type !== 'stele') return false;
    if (!g || !this.party || ev.pid !== this.party.id) return true;
    if (ev.type === 'sdmg' && g.partyRole === 'host') {
      const m = g.monsters.find(mm => mm.netId === ev.id && mm.alive);
      if (m) g.damageMonsterPart(m, Math.max(0, Math.min(50000, ev.a || 0)), null, 'net', false);
    } else if (ev.type === 'stele' && g.partyRole === 'member') {
      const m = g.monsters.find(mm => mm.netId === ev.id);
      if (m && m.alive) g.spawnMonsterAttackTelegraph(m, ev.p, new THREE.Vector3(ev.x, 0, ev.z), ev.yaw || 0, ev.r, ev.d);
    }
    return true;
  }

  // ==================================================================
  // 🌐 온라인 월드 (로그인하면 모두 같은 마을에 접속)
  // ==================================================================
  wpath(p) { return ref(this.db, `rooms/${WORLD}${p ? '/' + p : ''}`); }

  worldWatch() {
    const g = this.game;
    const user = this.auth.currentUser;
    if (!this.db || !user || !g || !g.gameStarted) return;
    if (this.worldOff) { if (this.w.on) this.leaveWorld(true); return; }
    if (!this.w.on && !this.w.connecting) this.joinWorld();
  }

  myLevel() { const g = this.game; return (g && g.stats && g.stats.level) || 1; }
  myName() { const u = this.auth.currentUser; return cleanName(u && (u.displayName || `토벌자${u.uid.slice(0, 4)}`)); }

  async joinWorld() {
    const user = this.auth.currentUser;
    const g = this.game;
    if (!user || !g) return;
    const W = this.w;
    W.connecting = true;
    try {
      W.uid = user.uid;
      const me = this.wpath(`players/${W.uid}`);
      const st = this.wpath(`state/${W.uid}`);
      await onDisconnect(me).remove();
      await onDisconnect(st).remove();
      await set(me, { name: this.myName(), charKey: g.activeCharKey || 'chiikawa', hat: (g.stats && g.stats.equippedHat) || 'none', lv: this.myLevel(), joinedAt: serverTimestamp() });
      W.profile = `${g.activeCharKey}|${g.stats.equippedHat}|${this.myLevel()}|${this.myName()}`;
      W.joinedAt = this.now();
      this._wJoinLocal = Date.now();
      W.on = true;
      const L = u => W.listeners.push(u);
      L(onChildAdded(this.wpath('players'), s => { W.players[s.key] = s.val(); this.wSyncRemote(s.key, false); this.renderModal(); this.renderHudPill(); }));
      L(onChildChanged(this.wpath('players'), s => { W.players[s.key] = s.val(); this.wSyncRemote(s.key, true); this.renderModal(); }));
      L(onChildRemoved(this.wpath('players'), s => {
        const p = W.players[s.key];
        delete W.players[s.key];
        this.wRemoveRemote(s.key);
        if (s.key === W.uid && W.on) { this.wReRegister(); }
        else if (p) this.addChatLine('', `👋 ${cleanName(p.name)}님이 나갔어요.`, { system: true });
        this.wCheckHost();
        this.renderModal();
        this.renderHudPill();
      }));
      L(onChildAdded(this.wpath('state'), s => this.wOnState(s.key, s.val())));
      L(onChildChanged(this.wpath('state'), s => this.wOnState(s.key, s.val())));
      L(onValue(this.wpath('host'), s => { W.hostUid = s.val(); this.wCheckHost(); }));
      L(onChildAdded(query(this.wpath('events'), limitToLast(30)), s => this.wOnEvent(s.val() || {})));
      this.wSendState(true);
      this.renderModal();
      this.renderHudPill();
      const n = Object.keys(W.players).length;
      toast(n > 1 ? `🌐 온라인 월드 접속! 지금 ${n}명이 함께 있어요.` : '🌐 온라인 월드에 접속했어요! 친구가 들어오면 같이 돌아다닐 수 있어요.');
    } catch (e) {
      W.on = false;
      this.reportError(e);
      this.worldRetryAt = Date.now();
    } finally {
      W.connecting = false;
    }
  }

  async wReRegister() {
    const W = this.w;
    const g = this.game;
    if (!W.on || !g) return;
    try {
      await set(this.wpath(`players/${W.uid}`), { name: this.myName(), charKey: g.activeCharKey || 'chiikawa', hat: (g.stats && g.stats.equippedHat) || 'none', lv: this.myLevel(), joinedAt: serverTimestamp() });
      this.wSendState(true);
    } catch (e) { /* 무시 */ }
  }

  async leaveWorld(silent = false) {
    const W = this.w;
    const uid = W.uid;
    W.listeners.forEach(u => { try { u(); } catch (e) {} });
    W.listeners = [];
    W.remotes.forEach((r, k) => this.wRemoveRemote(k));
    W.players = {};
    W.on = false;
    W.hostUid = null;
    W.last = null;
    if (uid && this.db) {
      try {
        await remove(this.wpath(`state/${uid}`));
        await remove(this.wpath(`players/${uid}`));
        await onDisconnect(this.wpath(`players/${uid}`)).cancel();
        await onDisconnect(this.wpath(`state/${uid}`)).cancel();
      } catch (e) { /* 무시 */ }
    }
    if (!silent) toast('🏠 혼자 플레이로 전환했어요. (설정에서 다시 온라인 접속 가능)');
    this.renderModal();
    this.renderHudPill();
  }

  toggleWorld() {
    this.worldOff = !this.worldOff;
    try { localStorage.setItem('chiikawa_world_off', this.worldOff ? '1' : '0'); } catch (e) {}
    if (this.worldOff) this.leaveWorld();
    else this.worldWatch();
    this.renderModal();
  }

  // 월드 이벤트 정리 담당: 가장 먼저 들어온 사람
  wCheckHost() {
    const W = this.w;
    if (!W.on) return;
    const ids = Object.keys(W.players);
    if (!ids.length || (W.hostUid && W.players[W.hostUid])) return;
    const next = ids.sort((a, b) => (W.players[a].joinedAt || 0) - (W.players[b].joinedAt || 0))[0];
    if (next !== W.uid) return;
    const old = W.hostUid;
    runTransaction(this.wpath('host'), cur => (cur === old || cur === null ? W.uid : undefined)).catch(() => {});
  }

  async wPrune() {
    const W = this.w;
    if (!W.on || W.hostUid !== W.uid) return;
    try {
      const snap = await get(query(this.wpath('events'), orderByKey(), limitToFirst(80)));
      const cut = this.now() - 3 * 60 * 1000;
      const jobs = [];
      snap.forEach(c => { const v = c.val(); if (!v || (v.ts || 0) < cut) jobs.push(remove(this.wpath(`events/${c.key}`))); });
      await Promise.all(jobs);
    } catch (e) { /* 무시 */ }
  }

  wSendState(force = false) {
    const W = this.w;
    const g = this.game;
    if (!W.on || !g || !g.playerPos) return;
    const p = g.playerPos;
    const Z = this.zone;
    const st = {
      x: r2(p.x), y: r2(p.y), z: r2(p.z),
      mv: Math.hypot(g.playerVel.x, g.playerVel.z) > 0.6 || (g.dashTimer > 0) ? 1 : 0,
      gr: g.isGrounded ? 1 : 0,
      vy: r2(g.playerVelY || 0),
      ar: this.area(),
      zn: Z.id || '',
      rd: Z.ready ? 1 : 0,
      sg: Z.stage || 1,
      t: this.now()
    };
    const prev = W.last;
    const changed = !prev || Math.abs(prev.x - st.x) > 0.05 || Math.abs(prev.z - st.z) > 0.05 || Math.abs(prev.y - st.y) > 0.05 ||
      prev.mv !== st.mv || prev.gr !== st.gr || prev.ar !== st.ar || prev.zn !== st.zn || prev.rd !== st.rd || prev.sg !== st.sg;
    if (!changed && !force && W.keepT < 1.0) return;
    if (!force && st.ar !== 'town' && W.keepT < 1.0 && prev && prev.ar === st.ar) return; // 전투 중엔 1초에 한 번만
    W.keepT = 0;
    W.last = st;
    set(this.wpath(`state/${W.uid}`), st).catch(() => {});
  }

  wSyncRemote(uid, changed) {
    const W = this.w;
    if (uid === W.uid) return;
    const info = W.players[uid];
    if (!info) return;
    let r = W.remotes.get(uid);
    if (r && changed && r.charKey !== info.charKey) { this.wRemoveRemote(uid); r = null; }
    if (!r) {
      const g = this.game;
      if (!g || typeof createChiikawaPlushie !== 'function') return;
      const mesh = createChiikawaPlushie(info.charKey);
      mesh.visible = false;
      g.scene.add(mesh);
      const label = document.createElement('div');
      label.className = 'coop-name-tag world';
      document.body.appendChild(label);
      r = { uid, mesh, label, charKey: info.charKey, hat: null, target: null, area: 'town', moving: false, grounded: true, vy: 0,
        walkTime: 0, atkTimer: 0, combo: 0, maxAtk: 0.28, flip: 1, lastPos: new THREE.Vector3(), hasPos: false, zn: '', rd: 0, seenAt: 0 };
      W.remotes.set(uid, r);
      if (!changed && W.joinedAt && Date.now() - (this._wJoinLocal || 0) > 3000 && this.now() - W.joinedAt > 3000) {
        this.addChatLine('', `🎉 ${cleanName(info.name)}님이 들어왔어요!`, { system: true });
      }
    }
    if (info.hat !== r.hat && r.mesh.userData.equipHat) { r.hat = info.hat; r.mesh.userData.equipHat(info.hat || 'none'); }
  }

  wRemoveRemote(uid) {
    const r = this.w.remotes.get(uid);
    if (!r) return;
    const g = this.game;
    if (g) { g.scene.remove(r.mesh); if (typeof g.disposeObject3D === 'function') g.disposeObject3D(r.mesh); }
    r.label.remove();
    this.w.remotes.delete(uid);
  }

  wOnState(uid, st) {
    if (!st || uid === this.w.uid) return;
    if (!this.w.remotes.has(uid)) this.wSyncRemote(uid, false);
    const r = this.w.remotes.get(uid);
    if (!r) return;
    r.target = new THREE.Vector3(st.x || 0, st.y || 0, st.z || 0);
    r.area = st.ar || 'town';
    r.moving = !!st.mv;
    r.grounded = st.gr !== 0;
    r.vy = st.vy || 0;
    r.zn = st.zn || '';
    r.rd = st.rd ? 1 : 0;
    r.sg = st.sg || 1;
    r.seenAt = Date.now();
    if (!r.hasPos) { r.mesh.position.copy(r.target); r.lastPos.copy(r.target); r.hasPos = true; }
  }

  wOnEvent(ev) {
    const W = this.w;
    if (!ev || !ev.type || ev.uid === W.uid) return;
    if ((ev.ts || 0) < W.joinedAt - 500) return;
    if (ev.type === 'chat') { this.onChatEvent(ev); return; }
    if (ev.type === 'zgo') { this.onZoneGo(ev); return; }
    if (VISUAL_EVENTS.includes(ev.type) && this.area() === 'town') this.playVisual(W.remotes.get(ev.uid), ev);
  }

  worldUpdate(dt) {
    const W = this.w;
    const g = this.game;
    if (!W.on) return;
    W.sendT += dt;
    W.keepT += dt;
    if (W.sendT >= WORLD_SEND) { W.sendT = 0; this.wSendState(false); }
    W.pruneT += dt;
    if (W.pruneT > 60) { W.pruneT = 0; this.wPrune(); }
    const profile = `${g.activeCharKey}|${g.stats.equippedHat}|${this.myLevel()}|${this.myName()}`;
    if (profile !== W.profile) {
      W.profile = profile;
      update(this.wpath(`players/${W.uid}`), { charKey: g.activeCharKey, hat: g.stats.equippedHat || 'none', lv: this.myLevel(), name: this.myName() }).catch(() => {});
    }
    const myArea = this.area();
    const ctx = this.avatarCtx();
    // 가까운 사람부터 최대 14명까지만 그림 (저사양 기기 보호)
    const list = [];
    W.remotes.forEach(r => {
      const vis = r.hasPos && myArea === 'town' && r.area === 'town' && Date.now() - r.seenAt < 8000;
      if (!vis) { r.mesh.visible = false; r.label.style.display = 'none'; return; }
      list.push([r.target ? r.target.distanceTo(g.playerPos) : 0, r]);
    });
    list.sort((a, b) => a[0] - b[0]);
    list.forEach(([d, r], i) => {
      if (i >= 14 || d > 160) { r.mesh.visible = false; r.label.style.display = 'none'; return; }
      r.mesh.visible = true;
      this.animateAvatar(r, dt, ctx);
      const info = W.players[r.uid] || {};
      const z = this.zone;
      const ready = r.zn && r.zn === z.id && r.rd ? '✅ ' : (r.zn && r.zn === z.id ? '⏳ ' : '');
      this.placeLabel(r, `${ready}${cleanName(info.name)} · Lv.${info.lv || 1}`);
    });
  }

  // 원격 캐릭터 이동·모션 공통 처리 (파티 방/월드 공용)
  avatarCtx() {
    const g = this.game;
    return {
      camFwd: new THREE.Vector3(-Math.sin(g.camYaw), 0, -Math.cos(g.camYaw)),
      camRight: new THREE.Vector3(Math.cos(g.camYaw), 0, -Math.sin(g.camYaw)),
      t: g.clock ? g.clock.elapsedTime : 0
    };
  }
  animateAvatar(r, dt, ctx) {
    const g = this.game;
    if (r.target) {
      if (r.mesh.position.distanceTo(r.target) > 18) r.mesh.position.copy(r.target);
      else r.mesh.position.lerp(r.target, 1 - Math.exp(-dt * 12));
    }
    const vel = r.mesh.position.clone().sub(r.lastPos).setY(0);
    r.lastPos.copy(r.mesh.position);
    const speed = vel.length() / Math.max(dt, 0.001);
    const moving = r.moving || speed > 1.2;
    if (speed > 0.5) {
      const d = vel.normalize();
      const side = d.dot(ctx.camRight);
      if (Math.abs(side) > 0.15) r.flip = side > 0 ? 1 : -1;
      if (r.mesh.userData.setBackView) r.mesh.userData.setBackView(d.dot(ctx.camFwd) > 0.55 && r.atkTimer <= 0 && !r.skillAnim);
    } else if (r.mesh.userData.setBackView) r.mesh.userData.setBackView(false);
    if (moving && r.grounded) r.walkTime += dt * 16; else r.walkTime = 0;
    if (r.atkTimer > 0) r.atkTimer -= dt;
    r.mesh.rotation.y = g.camYaw;
    const parts = r.mesh.userData.parts;
    if (parts && parts.standeeGroup) parts.standeeGroup.scale.x = THREE.MathUtils.lerp(parts.standeeGroup.scale.x || 1, r.flip, Math.min(1, dt * 16));
    if (r.mesh.userData.updateMotion) r.mesh.userData.updateMotion(ctx.t, r.walkTime, moving, r.grounded, r.vy, Math.max(0, r.atkTimer), r.combo, r.maxAtk);
    if (r.skillAnim && typeof SKILLS !== 'undefined' && !SKILLS.applyPose(r.mesh, r.skillAnim)) r.skillAnim = null;
  }
  placeLabel(r, text) {
    const g = this.game;
    if (r.label.textContent !== text) r.label.textContent = text;
    const v = r.mesh.position.clone().add(new THREE.Vector3(0, 5.2, 0)).project(g.camera);
    if (v.z > 1 || Math.abs(v.x) > 1.2 || Math.abs(v.y) > 1.2) { r.label.style.display = 'none'; return; }
    r.label.style.display = '';
    r.label.style.left = `${(v.x * 0.5 + 0.5) * window.innerWidth}px`;
    r.label.style.top = `${(-v.y * 0.5 + 0.5) * window.innerHeight}px`;
  }

  // ==================================================================
  // ⚔️ 입장 존: 존 안의 모두가 [E] 준비 → 3초 카운트다운 → 함께 출발
  // ==================================================================
  zoneAt(pos) {
    for (const [id, z] of Object.entries(ZONES)) {
      if (Math.hypot(pos.x - z.x, pos.z - z.z) < z.r && pos.y < 3) return id;
    }
    return null;
  }

  zoneMembers() {
    const Z = this.zone;
    const W = this.w;
    const g = this.game;
    const me = { uid: W.uid || 'me', me: true, name: this.myName(), ready: Z.ready, lv: this.myLevel(), sg: Z.stage, joinedAt: (W.players[W.uid] && W.players[W.uid].joinedAt) || 0 };
    const list = [me];
    if (W.on) {
      W.remotes.forEach(r => {
        if (r.zn === Z.id && r.area === 'town' && Date.now() - r.seenAt < 4000) {
          const info = W.players[r.uid] || {};
          list.push({ uid: r.uid, name: cleanName(info.name), ready: !!r.rd, lv: info.lv || 1, sg: r.sg || 1, joinedAt: info.joinedAt || 0 });
        }
      });
    }
    // 가장 먼저 접속한 사람이 리더 (스테이지 선택 & 출발 처리)
    list.sort((a, b) => (a.joinedAt || 0) - (b.joinedAt || 0) || (a.uid < b.uid ? -1 : 1));
    return list;
  }

  zoneUpdate(dt) {
    const g = this.game;
    const Z = this.zone;
    if (!g || !g.gameStarted) return;
    const inTown = this.area() === 'town' && !g.isDowned && !g.partyRole && !this.raid.active;
    const zid = inTown ? this.zoneAt(g.playerPos) : null;
    if (zid !== Z.id) {
      Z.id = zid;
      Z.ready = false;
      Z.countdown = null;
      Z.stage = Math.max(1, Math.min(20, (g.stats && g.stats.maxUnlockedStage) || 1));
      if (zid) toast(`${ZONES[zid].label}에 들어왔어요! [E]로 준비하면 존 안의 모두가 준비됐을 때 함께 출발해요.`);
      this.wSendState(true);
    }
    if (!Z.id) { if (this.zonePanel.style.display !== 'none') this.zonePanel.style.display = 'none'; return; }
    const mem = this.zoneMembers();
    Z.members = mem;
    const leader = mem[0];
    const stage = leader.me ? Z.stage : leader.sg;
    const allReady = mem.every(m => m.ready);
    if (allReady && !Z.going) {
      if (Z.countdown === null) { Z.countdown = ZONE_COUNTDOWN; if (typeof soundFx !== 'undefined') try { soundFx.playSkill(); } catch (e) {} }
      else Z.countdown -= dt;
      if (Z.countdown <= 0 && leader.me) this.zoneGo(mem, stage);
    } else if (!allReady) Z.countdown = null;
    Z.panelT -= dt;
    if (Z.panelT <= 0) { Z.panelT = 0.2; this.renderZonePanel(mem, stage, allReady); }
  }

  // main.js triggerInteract에서 호출: 존 안이면 준비 토글
  zoneInteract() {
    const Z = this.zone;
    const g = this.game;
    if (!Z.id || !g) return false;
    if (!this.auth.currentUser) {
      if (Z.id === 'raid') { toast('🔑 레이드는 로그인 후 이용할 수 있어요.'); return true; }
      return false; // 비로그인: 출격 포털은 기존 스테이지 선택창
    }
    if (Z.going) return true;
    if (Z.id === 'stage' && (g.stats.maxUnlockedStage || 1) < 1) return true;
    Z.ready = !Z.ready;
    if (!Z.ready) Z.countdown = null;
    if (typeof soundFx !== 'undefined') try { Z.ready ? soundFx.playCoin() : soundFx.playJump(); } catch (e) {}
    this.wSendState(true);
    Z.panelT = 0;
    return true;
  }

  zoneStage(delta) {
    const Z = this.zone;
    const g = this.game;
    if (!Z.id || Z.id !== 'stage' || !g) return;
    const mem = Z.members || [];
    if (mem.length && !mem[0].me) { toast('👑 스테이지는 존의 리더(가장 먼저 접속한 사람)가 골라요.'); return; }
    Z.stage = Math.max(1, Math.min((g.stats.maxUnlockedStage || 1), Z.stage + delta));
    this.wSendState(true);
    Z.panelT = 0;
  }

  async zoneGo(mem, stage) {
    const Z = this.zone;
    const g = this.game;
    if (Z.going) return;
    Z.going = true;
    const kind = Z.id;
    const ids = mem.map(m => m.uid);
    try {
      if (ids.length === 1 && kind === 'stage') {
        if (this.room) await this.leaveRoom(true);
        g.startBattleStage(stage);
        return;
      }
      if (this.room) await this.leaveRoom(true);
      const code = await this.createRoom(true);
      if (!code) return;
      if (ids.length > 1) {
        push(this.wpath('events'), { type: 'zgo', uid: this.w.uid, ts: this.now(), z: kind, code, m: ids.join(','), s: stage }).catch(() => {});
        toast(`🚀 ${ids.length}명 모두 준비 완료! 파티를 모으는 중…`);
        const t0 = Date.now();
        while (Date.now() - t0 < 10000 && !ids.every(id => this.players[id])) await new Promise(r => setTimeout(r, 250));
        const missing = ids.filter(id => !this.players[id]).length;
        if (missing) toast(`⚠️ ${missing}명이 연결되지 않아 먼저 출발해요.`);
      }
      if (kind === 'raid') await this.startRaid();
      else g.startBattleStage(stage);
    } catch (e) {
      this.reportError(e);
    } finally {
      Z.ready = false;
      Z.countdown = null;
      setTimeout(() => { Z.going = false; }, 1500);
    }
  }

  async onZoneGo(ev) {
    const Z = this.zone;
    const W = this.w;
    const ids = String(ev.m || '').split(',');
    if (!ids.includes(W.uid) || !ev.code) return;
    Z.going = true;
    Z.ready = false;
    Z.countdown = null;
    try {
      if (this.room && this.room !== ev.code) await this.leaveRoom(true);
      if (this.room !== ev.code) await this.joinRoom(ev.code, true);
      toast(ev.z === 'raid' ? '🐉 모두 준비 완료! 레이드로 출발해요!' : `⚔️ 모두 준비 완료! ${ev.s || 1}단계로 함께 출격해요!`);
    } catch (e) {
      this.reportError(e);
    } finally {
      setTimeout(() => { Z.going = false; }, 12000);
    }
  }

  buildZonePanel() {
    const el = document.createElement('div');
    el.id = 'zone-panel';
    el.style.display = 'none';
    document.body.appendChild(el);
    this.zonePanel = el;
    el.addEventListener('click', e => {
      const a = e.target.closest('[data-z]');
      if (!a) return;
      if (a.dataset.z === 'prev') this.zoneStage(-1);
      else if (a.dataset.z === 'next') this.zoneStage(1);
      else if (a.dataset.z === 'ready') this.zoneInteract();
    });
  }

  renderZonePanel(mem, stage, allReady) {
    const Z = this.zone;
    const el = this.zonePanel;
    const zc = ZONES[Z.id];
    el.style.display = '';
    el.style.setProperty('--zc', zc.color);
    el.textContent = '';
    const mk = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
    el.append(mk('div', 'zp-title', zc.label));
    if (Z.id === 'stage') {
      const row = mk('div', 'zp-stage');
      const lead = mem[0] && mem[0].me;
      const prev = mk('button', 'zp-arrow', '◀'); prev.type = 'button'; prev.dataset.z = 'prev'; prev.disabled = !lead;
      const next = mk('button', 'zp-arrow', '▶'); next.type = 'button'; next.dataset.z = 'next'; next.disabled = !lead;
      row.append(prev, mk('span', 'zp-stage-num', `${stage}단계`), next);
      el.append(row);
    } else {
      el.append(mk('div', 'zp-sub', `거대 아노코 · ${mem.length}명 도전`));
    }
    const list = mk('div', 'zp-list');
    mem.forEach((m, i) => {
      const r = mk('div', 'zp-row' + (m.ready ? ' ready' : '') + (m.me ? ' me' : ''));
      r.append(mk('span', 'zp-st', m.ready ? '✅' : '⏳'), mk('span', 'zp-name', `${i === 0 ? '👑 ' : ''}${m.name}${m.me ? ' (나)' : ''}`), mk('span', 'zp-lv', `Lv.${m.lv}`));
      list.append(r);
    });
    el.append(list);
    if (Z.going) el.append(mk('div', 'zp-count', '🚀 출발!'));
    else if (allReady && Z.countdown !== null) el.append(mk('div', 'zp-count', `${Math.max(1, Math.ceil(Z.countdown))}`));
    const btn = mk('button', 'zp-ready' + (Z.ready ? ' on' : ''), Z.ready ? '준비 취소 [E]' : '준비 [E]');
    btn.type = 'button';
    btn.dataset.z = 'ready';
    el.append(btn);
    const left = mem.filter(m => !m.ready).length;
    el.append(mk('div', 'zp-hint', left ? `존 안의 ${mem.length}명이 모두 준비하면 출발해요 (대기 ${left}명)` : '모두 준비 완료!'));
  }

  // ------------------------------------------------------------------
  // UI
  // ------------------------------------------------------------------
  buildUI() {
    // HUD 버튼
    const controls = document.querySelector('.top-right-controls');
    if (controls && !document.getElementById('btn-coop')) {
      const b = document.createElement('button');
      b.type = 'button';
      b.id = 'btn-coop';
      b.className = 'hud-pill-btn coop-btn';
      b.textContent = '🌐 온라인';
      b.addEventListener('click', () => { b.blur(); this.openModal(); });
      controls.insertBefore(b, controls.firstChild);
    }

    // 방 정보 미니 패널 (방에 있을 때만)
    this.pill = document.createElement('div');
    this.pill.className = 'coop-hud-pill';
    this.pill.style.display = 'none';
    document.body.appendChild(this.pill);

    // 모달
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.id = 'coop-modal';
    modal.innerHTML = `
      <div class="modal-window" style="max-width:460px;">
        <button type="button" class="modal-close-btn" data-act="close">✕</button>
        <h2 style="font-size:21px; font-weight:900; color:#2563eb;">🌐 온라인 월드</h2>
        <p style="font-size:12.5px; color:#64748b; margin:4px 0 14px;">로그인한 친구들이 모두 같은 마을에서 함께 돌아다녀요.</p>
        <div data-sec="body"></div>
      </div>`;
    document.body.appendChild(modal);
    this.modal = modal;
    modal.addEventListener('click', e => {
      if (e.target === modal) this.closeModal();
      const act = e.target.closest('[data-act]');
      if (!act) return;
      const a = act.dataset.act;
      if (a === 'close') this.closeModal();
      else if (a === 'create') this.createRoom();
      else if (a === 'join') this.joinRoom(modal.querySelector('#coop-code-input').value);
      else if (a === 'leave') this.leaveRoom();
      else if (a === 'copy') this.copyCode();
      else if (a === 'login') { this.closeModal(); window.firebaseManager && window.firebaseManager.openAuthModal(); }
      else if (a === 'emote') this.emote(act.dataset.e);
      else if (a === 'raid') { this.closeModal(); this.startRaid(); }
      else if (a === 'raidstop') { this.closeModal(); this.abortRaid(); }
      else if (a === 'worldtoggle') this.toggleWorld();
    });
    modal.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter' && e.target.id === 'coop-code-input') this.joinRoom(e.target.value);
    });
    this.pill.addEventListener('click', e => {
      const act = e.target.closest('[data-act]');
      if (act && act.dataset.act === 'emote') { this.emote(act.dataset.e); return; }
      if (act && act.dataset.act === 'chat') { this.openChat(); return; }
      this.openModal();
    });
    this.renderModal();
  }

  openModal() {
    if (window.gameApp && window.gameApp.clearAllInputKeys) window.gameApp.clearAllInputKeys();
    this.renderModal();
    this.modal.classList.add('open');
  }
  closeModal() { this.modal.classList.remove('open'); }

  copyCode() {
    if (!this.room) return;
    const done = () => toast(`📋 방 코드 [${this.room}]를 복사했어요!`);
    if (navigator.clipboard) navigator.clipboard.writeText(this.room).then(done).catch(() => toast(`방 코드: ${this.room}`));
    else toast(`방 코드: ${this.room}`);
  }

  renderModal() {
    if (!this.modal) return;
    const body = this.modal.querySelector('[data-sec="body"]');
    body.textContent = '';
    const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
    const btn = (text, act, cls = 'choice-btn') => { const b = el('button', cls, text); b.type = 'button'; b.dataset.act = act; return b; };

    if (!this.db) {
      body.append(el('div', 'coop-note', '온라인 서버(Realtime Database)가 아직 연결되지 않았어요.'));
      return;
    }
    if (!this.auth.currentUser) {
      body.append(el('div', 'coop-note', '온라인 월드는 친구와 내 캐릭터를 구분하기 위해 로그인이 필요해요.'));
      body.append(btn('🔑 로그인하러 가기', 'login', 'choice-btn coop-primary'));
      return;
    }
    const W = this.w;
    // 🌐 접속자 목록
    if (W.on) {
      const ids = Object.keys(W.players).sort((a, b) => (W.players[a].joinedAt || 0) - (W.players[b].joinedAt || 0));
      body.append(el('div', 'coop-divider', `🌐 지금 접속 중 ${ids.length}명`));
      const list = el('div', 'coop-member-list');
      ids.forEach(id => {
        const p = W.players[id];
        const cfg = (typeof CHAR_CONFIGS !== 'undefined' && CHAR_CONFIGS[p.charKey]) || {};
        const r = id === W.uid ? null : W.remotes.get(id);
        const ar = id === W.uid ? this.area() : (r && r.area) || 'town';
        const where = { town: '🏡 마을', arena: '⚔️ 전투 중', party: '⚔️ 파티 전투', raid: '🐉 레이드 중' }[ar] || '🏡 마을';
        const row = el('div', 'coop-member' + (id === W.uid ? ' me' : ''));
        const img = el('img');
        img.src = cfg.portrait || 'assets/chiikawa.png';
        img.alt = '';
        row.append(img, el('span', 'coop-member-name', `${cleanName(p.name)}${id === W.uid ? ' (나)' : ''}`), el('span', 'coop-member-char', `Lv.${p.lv || 1} · ${where}`));
        list.append(row);
      });
      body.append(list);
    } else {
      body.append(el('div', 'coop-note', this.worldOff ? '🏠 지금은 혼자 플레이 중이에요.' : (W.connecting ? '🌐 온라인 월드에 접속하는 중…' : '🎮 게임을 시작하면 온라인 월드에 자동으로 접속해요.')));
    }
    body.append(el('div', 'coop-hint', '⚔️ 출격 포털 / 🐉 레이드 제단의 빛나는 원 안에 들어가 [E]로 준비하세요. 원 안의 모두가 준비하면 3초 뒤 함께 출발해요!'));
    // 👥 현재 파티 (전투·레이드 중)
    if (this.room) {
      const ids = Object.keys(this.players);
      body.append(el('div', 'coop-divider', `👥 함께하는 파티 ${ids.length}명`));
      if (this.raid.active) {
        body.append(el('div', 'coop-note', '🐉 거대 아노코 레이드 진행 중! 쓰러진 동료에게 가서 [E]로 부활 (팀 전체 5회)'));
        if (this.isHost()) body.append(btn('🏳️ 레이드 종료 (리더)', 'raidstop', 'choice-btn coop-leave'));
      }
    }
    const emo = el('div', 'coop-emote-row');
    EMOTES.forEach(e => { const b = btn(e, 'emote', 'coop-emote-btn'); b.dataset.e = e; emo.append(b); });
    body.append(el('div', 'coop-divider', '이모티콘'), emo);
    body.append(btn(this.worldOff ? '🌐 온라인 월드 접속하기' : '🏠 혼자 플레이로 전환', 'worldtoggle', 'choice-btn ' + (this.worldOff ? 'coop-primary' : 'coop-leave')));
    this.renderHudPill();
  }

  renderHudPill() {
    if (!this.pill) return;
    if (!this.room && !this.w.on) { this.pill.style.display = 'none'; return; }
    this.pill.style.display = '';
    this.pill.textContent = '';
    const info = document.createElement('span');
    info.className = 'coop-pill-info';
    const n = Object.keys(this.w.players).length;
    info.textContent = this.w.on ? `🌐 ${n}명 접속` + (this.room ? ` · 👥 ${Object.keys(this.players).length}` : '') : `👥 파티 ${Object.keys(this.players).length}명`;
    this.pill.append(info);
    EMOTES.slice(0, 4).forEach(e => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'coop-pill-emote';
      b.dataset.act = 'emote';
      b.dataset.e = e;
      b.textContent = e;
      this.pill.append(b);
    });
    const chatBtn = document.createElement('button');
    chatBtn.type = 'button';
    chatBtn.className = 'coop-pill-emote coop-pill-chat';
    chatBtn.dataset.act = 'chat';
    chatBtn.title = '채팅 (Enter)';
    chatBtn.textContent = '💬';
    this.pill.append(chatBtn);
  }

  // ------------------------------------------------------------------
  // 💬 실시간 채팅 (같은 협동 방 안에서만)
  // ------------------------------------------------------------------
  buildChat() {
    const box = document.createElement('div');
    box.id = 'coop-chat';
    box.innerHTML = `<div class="cc-log"></div>
      <form class="cc-form" autocomplete="off">
        <input class="cc-input" type="text" maxlength="80" placeholder="메시지 입력 · Enter 전송 · Esc 닫기">
        <button type="submit" class="cc-send">전송</button>
      </form>`;
    document.body.appendChild(box);
    this.chatBox = box;
    this.chatLog = box.querySelector('.cc-log');
    this.chatInput = box.querySelector('.cc-input');
    this.chatLastSent = 0;
    box.querySelector('.cc-form').addEventListener('submit', e => {
      e.preventDefault();
      this.sendChat(this.chatInput.value);
    });
    this.chatInput.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Escape') { e.preventDefault(); this.closeChat(); }
    });
    this.chatInput.addEventListener('blur', () => setTimeout(() => {
      if (document.activeElement !== this.chatInput) this.closeChat(true);
    }, 120));
    // Enter: 채팅 열기 (게임 중, 다른 입력칸/모달이 아닐 때)
    window.addEventListener('keydown', e => {
      if (e.key !== 'Enter' || e.isComposing) return;
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      const g = this.game;
      if (!g || !g.gameStarted) return;
      if (typeof g.isAnyModalOpen === 'function' && g.isAnyModalOpen()) return;
      e.preventDefault();
      if (!this.room && !this.w.on) {
        const now = Date.now();
        if (!this._chatHintAt || now - this._chatHintAt > 4000) {
          this._chatHintAt = now;
          toast('💬 채팅은 로그인하면 온라인 월드에서 쓸 수 있어요!');
        }
        return;
      }
      this.openChat();
    }, true);
  }

  openChat() {
    if (!this.chatBox) return;
    if (!this.room && !this.w.on) { toast('💬 채팅은 로그인하면 온라인 월드에서 쓸 수 있어요!'); return; }
    if (this.game && typeof this.game.clearAllInputKeys === 'function') this.game.clearAllInputKeys();
    this.chatBox.classList.add('open');
    this.chatInput.focus();
    this.chatLog.scrollTop = this.chatLog.scrollHeight;
  }

  closeChat(keepText = false) {
    if (!this.chatBox) return;
    this.chatBox.classList.remove('open');
    if (!keepText) this.chatInput.value = '';
    if (document.activeElement === this.chatInput) this.chatInput.blur();
  }

  cleanChat(text) {
    return String(text || '')
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80);
  }

  sendChat(raw) {
    const text = this.cleanChat(raw);
    if (!text) { this.closeChat(); return; }
    if (!this.room && !this.w.on) { toast('💬 온라인 월드에 접속해 있지 않아요.'); this.closeChat(); return; }
    const now = Date.now();
    if (now - this.chatLastSent < 800) { toast('⏳ 너무 빨라요! 잠시 후 보내 주세요.'); return; }
    this.chatLastSent = now;
    this.sendEvent('chat', { m: text });
    const myName = cleanName(this.auth.currentUser && this.auth.currentUser.displayName);
    this.addChatLine(myName, text, { mine: true });
    const g = this.game;
    if (g && g.playerPos) this.showBubble(g.playerPos, text, 4.5, true);
    this.chatInput.value = '';
    this.closeChat();
  }

  onChatEvent(ev) {
    const text = this.cleanChat(ev.m);
    if (!text) return;
    const info = this.players[ev.uid] || this.w.players[ev.uid];
    const name = cleanName(info && info.name);
    this.addChatLine(name, text, { host: false });
    const r = (this.w.on && this.area() === 'town' ? this.w.remotes.get(ev.uid) : null) || this.remotes.get(ev.uid);
    if (r && r.hasPos && r.area === this.area() && r.mesh.visible !== false) this.showBubble(r.mesh.position, text, 4.5, true);
    if (typeof soundFx !== 'undefined' && soundFx.playCoin && !this.chatBox.classList.contains('open')) {
      try { soundFx.playJump(); } catch (e) {}
    }
  }

  addChatLine(name, text, opts = {}) {
    if (!this.chatLog) return;
    const line = document.createElement('div');
    line.className = 'cc-line' + (opts.mine ? ' mine' : '') + (opts.system ? ' system' : '');
    if (name) {
      const n = document.createElement('b');
      n.textContent = (opts.host ? '👑 ' : '') + name;
      line.append(n, document.createTextNode(' '));
    }
    const t = document.createElement('span');
    t.textContent = text; // HTML 주입 방지: 항상 텍스트로만 출력
    line.append(t);
    this.chatLog.append(line);
    while (this.chatLog.children.length > 40) this.chatLog.firstChild.remove();
    this.chatLog.scrollTop = this.chatLog.scrollHeight;
    // 채팅창이 닫혀 있으면 잠시 보였다가 흐려짐
    line.classList.add('fresh');
    setTimeout(() => line.classList.remove('fresh'), 9000);
  }
}
