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
  onChildRemoved, onDisconnect, runTransaction, query, limitToLast, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-database.js";

// ⚠️ Firebase 콘솔에서 Realtime Database를 만들 때 위치를 '싱가포르(asia-southeast1)'로 선택하면 이 주소 그대로 사용됩니다.
//    다른 위치를 골랐다면 콘솔의 데이터베이스 주소로 바꿔주세요.
export const COOP_DB_URL = 'https://chiikawa-world-default-rtdb.asia-southeast1.firebasedatabase.app';

const MAX_PLAYERS = 4;
const SEND_INTERVAL = 0.1;      // 위치 전송 주기(초) = 10Hz
const KEEPALIVE = 1.0;          // 가만히 있어도 1초마다 전송
const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const EMOTES = ['👋', '❤️', '😂', '👍', '🎉', '😭'];

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

    this.buildUI();
    if (this.db) {
      onValue(ref(this.db, '.info/serverTimeOffset'), s => { this.serverOffset = s.val() || 0; });
    }
    onAuthStateChanged(this.auth, user => {
      if (!user && this.room) this.leaveRoom(true);
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

  async createRoom() {
    if (this.busy || !this.checkReady()) return;
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
          toast(`🏠 협동 방을 만들었어요! 친구에게 방 코드 [${code}]를 알려주세요.`);
          return;
        }
      }
      toast('⚠️ 방을 만들지 못했어요. 잠시 후 다시 시도해 주세요.');
    } catch (e) {
      this.reportError(e);
    } finally {
      this.busy = false;
    }
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
      await this.enterRoom(code);
      toast(`👥 [${code}] 방에 입장했어요!`);
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

    this.listen(onChildAdded(playersRef, s => { this.players[s.key] = s.val(); this.syncRemote(s.key); this.renderModal(); }));
    this.listen(onChildChanged(playersRef, s => { this.players[s.key] = s.val(); this.syncRemote(s.key, true); this.renderModal(); }));
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
    this.listen(onValue(hostRef, s => { this.hostUid = s.val(); this.checkHostMigration(); this.renderModal(); }));
    this.listen(onChildAdded(eventsQ, s => this.onEvent(s.val() || {})));

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
      ar: g.battleState && g.battleState.active ? 'arena' : 'town',
      t: this.now()
    };
    const prev = this.lastSent;
    const changed = !prev || Math.abs(prev.x - st.x) > 0.05 || Math.abs(prev.z - st.z) > 0.05 ||
      Math.abs(prev.y - st.y) > 0.05 || prev.mv !== st.mv || prev.gr !== st.gr || prev.ar !== st.ar;
    if (!changed && !force && this.keepTimer < KEEPALIVE) return;
    this.keepTimer = 0;
    this.lastSent = st;
    set(this.path(`state/${this.uid}`), st).catch(() => {});
  }

  sendEvent(type, data = {}) {
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
    if (this.room) this.sendEvent('emo', { e });
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
    if (!r.hasPos) {
      r.mesh.position.copy(r.target);
      r.lastPos.copy(r.target);
      r.hasPos = true;
    }
  }

  onEvent(ev) {
    if (!ev || !ev.type || ev.uid === this.uid) return;
    if ((ev.ts || 0) < this.joinedAt - 500) return; // 입장 전 이벤트는 무시
    const r = this.remotes.get(ev.uid);
    const g = this.game;
    if (!r || !g || !r.hasPos) return;
    const sameArea = r.area === (g.battleState && g.battleState.active ? 'arena' : 'town');

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
    if (!this.room || !g || !g.camera) return;

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

    const myArea = g.battleState && g.battleState.active ? 'arena' : 'town';
    const camFwd = new THREE.Vector3(-Math.sin(g.camYaw), 0, -Math.cos(g.camYaw));
    const camRight = new THREE.Vector3(Math.cos(g.camYaw), 0, -Math.sin(g.camYaw));
    const t = g.clock ? g.clock.elapsedTime : 0;

    this.remotes.forEach(r => {
      const visible = r.hasPos && r.area === myArea;
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
        if (r.mesh.userData.setBackView) r.mesh.userData.setBackView(d.dot(camFwd) > 0.55 && r.atkTimer <= 0);
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
      b.textContent = '👥 협동 플레이';
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
        <h2 style="font-size:21px; font-weight:900; color:#2563eb;">👥 온라인 협동 플레이</h2>
        <p style="font-size:12.5px; color:#64748b; margin:4px 0 14px;">방 코드로 친구와 최대 ${MAX_PLAYERS}명이 함께 모험해요. (협동 레이드는 곧 추가돼요!)</p>
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
    });
    modal.addEventListener('keydown', e => {
      e.stopPropagation();
      if (e.key === 'Enter' && e.target.id === 'coop-code-input') this.joinRoom(e.target.value);
    });
    this.pill.addEventListener('click', e => {
      const act = e.target.closest('[data-act]');
      if (act && act.dataset.act === 'emote') { this.emote(act.dataset.e); return; }
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
      body.append(el('div', 'coop-note', '협동 서버(Realtime Database)가 아직 연결되지 않았어요.'));
      return;
    }
    if (!this.auth.currentUser) {
      body.append(el('div', 'coop-note', '협동 플레이는 친구와 내 캐릭터를 구분하기 위해 로그인이 필요해요.'));
      const b = btn('🔑 로그인하러 가기', 'login', 'choice-btn coop-primary');
      body.append(b);
      return;
    }
    if (!this.room) {
      body.append(btn('🏠 새 방 만들기', 'create', 'choice-btn coop-primary'));
      const row = el('div', 'coop-join-row');
      const input = el('input');
      input.id = 'coop-code-input';
      input.maxLength = 5;
      input.placeholder = '방 코드 5자리';
      input.autocomplete = 'off';
      input.addEventListener('input', () => { input.value = input.value.toUpperCase().replace(/[^A-Z0-9]/g, ''); });
      row.append(input, btn('입장', 'join', 'choice-btn coop-join-btn'));
      body.append(el('div', 'coop-divider', '또는 친구의 방에 들어가기'), row);
      return;
    }
    const head = el('div', 'coop-room-head');
    head.append(el('span', 'coop-room-label', '방 코드'), el('span', 'coop-room-code', this.room), btn('📋 복사', 'copy', 'hud-pill-btn'));
    body.append(head);
    const list = el('div', 'coop-member-list');
    const ids = Object.keys(this.players).sort((a, b) => (this.players[a].joinedAt || 0) - (this.players[b].joinedAt || 0));
    ids.forEach(id => {
      const p = this.players[id];
      const cfg = (typeof CHAR_CONFIGS !== 'undefined' && CHAR_CONFIGS[p.charKey]) || {};
      const row = el('div', 'coop-member' + (id === this.uid ? ' me' : ''));
      const img = el('img');
      img.src = cfg.portrait || 'assets/chiikawa.png';
      img.alt = '';
      row.append(img, el('span', 'coop-member-name', `${id === this.hostUid ? '👑 ' : ''}${cleanName(p.name)}${id === this.uid ? ' (나)' : ''}`), el('span', 'coop-member-char', cfg.name || ''));
      list.append(row);
    });
    body.append(el('div', 'coop-divider', `참가자 ${ids.length} / ${MAX_PLAYERS}`), list);
    const emo = el('div', 'coop-emote-row');
    EMOTES.forEach(e => { const b = btn(e, 'emote', 'coop-emote-btn'); b.dataset.e = e; emo.append(b); });
    body.append(el('div', 'coop-divider', '이모티콘'), emo, btn('🚪 방 나가기', 'leave', 'choice-btn coop-leave'));
    this.renderHudPill();
  }

  renderHudPill() {
    if (!this.pill) return;
    if (!this.room) { this.pill.style.display = 'none'; return; }
    this.pill.style.display = '';
    this.pill.textContent = '';
    const n = Object.keys(this.players).length;
    const info = document.createElement('span');
    info.className = 'coop-pill-info';
    info.textContent = `👥 ${this.room} · ${n}/${MAX_PLAYERS}`;
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
  }
}
