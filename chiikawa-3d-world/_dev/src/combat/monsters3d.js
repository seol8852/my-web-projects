// 👾 3D 몬스터 (Blender로 만든 assets/monsters.glb — 뼈대 + 동작 클립)
//  - createMonster3D 를 감싸서, 모델이 준비되면 그림(스탠디) 대신 입체 모델로 바꿈 (준비 전에 만든 몬스터도 도착하면 교체)
//  - 동작: Idle(숨쉬기) / Walk(걷기) / Windup(공격 전 웅크림) / Strike(내려치기) / Hit(맞음) / Death(쓰러짐) / Spin(거북 등껍질 회전)
//    · 공격 예고 장판이 깔리면 Windup → 장판이 터지는 순간 Strike
//    · 맞으면 Hit, 쓰러지면 Death (feel_hq 처치 연출과 연결)
//  - 외부에서 쓰는 userData(mats, flashHit, updateMonsterMotion, hurtParts …)는 그대로 유지
//  - localStorage chiikawa_mon3d = 'off' 이면 예전 그림 몬스터
import THREE from '../core/three.js';
import { expose } from '../core/expose.js';
import { MeshoptDecoder } from 'meshoptimizer';
import { clone as skelClone } from 'three/examples/jsm/utils/SkeletonUtils.js';
import { Chiikawa3DWorldApp } from '../game/main.js';

const MON3D = (() => {
  const TYPES = new Set(['bug', 'goblin', 'chimera', 'midboss', 'iron_chimera', 'lavaturtle']);
  let LIB = null, libP = null;
  const pending = new Set();
  const live = new Set();   // 동작 재생 중인 몬스터 (매 프레임 한 번에 갱신)
  const isOff = () => { try { return localStorage.getItem('chiikawa_mon3d') === 'off'; } catch (e) { return false; } };

  function load() {
    if (libP) return libP;
    if (typeof THREE.GLTFLoader === 'undefined') return (libP = Promise.resolve(null));
    libP = Promise.all([
      fetch('assets/monsters.json', { cache: 'no-cache' }).then(r => (r.ok ? r.json() : {})).catch(() => ({})),
      fetch('assets/monsters_meta.json', { cache: 'no-cache' }).then(r => (r.ok ? r.json() : null)).catch(() => null)
    ]).then(([ver, meta]) => new Promise(res => {
      if (!meta) return res(null);
      const l = new THREE.GLTFLoader();
      if (typeof MeshoptDecoder !== 'undefined') l.setMeshoptDecoder(MeshoptDecoder);
      l.load('assets/monsters.glb?v=' + (ver.v || '1'), gltf => {
        const lib = {};
        gltf.scene.children.forEach(rig => {
          const [type, what] = rig.name.split('|');
          if (!type || what !== 'rig') return;
          const clips = {};
          gltf.animations.forEach(a => { const [t, n] = a.name.split('|'); if (t === type && n) clips[n] = a; });
          rig.traverse(o => { if (o.isMesh) { o.frustumCulled = false; o.userData.kind = (o.name.split('|')[1] || 'skin'); } });
          lib[type] = { rig, clips, height: (meta.heights || {})[type] || 4, radius: (meta.radii || {})[type] || 0 };
        });
        LIB = lib;
        res(lib);
        pending.forEach(g => { if (g.userData && g.userData._mon3dType) upgrade(g, g.userData._mon3dType); });
        pending.clear();
      }, undefined, () => res(null));
    }));
    return libP;
  }

  // 외곽선 (법선 방향으로 부풀린 뒷면, 뼈대 변형도 그대로 따라감)
  const OL = new THREE.MeshBasicMaterial({ color: 0x2b1d19, side: THREE.BackSide });
  OL.userData.shared = true;
  OL.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = position + normal * 0.035;'); };

  function makeMat(kind) {
    let m;
    if (kind === 'glow') m = new THREE.MeshBasicMaterial({ vertexColors: true });
    else {
      m = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap: typeof window.getToonGradientMap === 'function' ? window.getToonGradientMap() : null });
      if (kind === 'wing') { m.transparent = true; m.opacity = 0.72; m.side = THREE.DoubleSide; m.depthWrite = false; }
    }
    if (typeof window.fxApplyFlashShader === 'function') window.fxApplyFlashShader(m);
    return m;
  }

  function upgrade(group, type) {
    const T = LIB && LIB[type];
    if (!T || group.userData._mon3d) return;
    const ud = group.userData;
    const bodyWrap = ud.bodyWrap, hurtRing = ud.hurtRingGroup, marker = ud.weakPointMarker;
    if (!bodyWrap) return;
    // 그림(스탠디) 부품 치우기 (약점 표시만 남김)
    bodyWrap.children.slice().forEach(c => { if (c !== marker) bodyWrap.remove(c); });
    ud.rimUpdate = null; ud.rimFailed = true;
    const root = new THREE.Group();    // 방향 회전
    bodyWrap.add(root);
    const rig = skelClone(T.rig);
    rig.position.set(0, 0, 0); rig.rotation.set(0, 0, 0); rig.scale.set(1, 1, 1);
    root.add(rig);
    const mats = [];
    const matOf = {};
    const bones = {};
    rig.traverse(o => { if (o.isBone) bones[o.name.replace(/_\d+$/, '')] = o; });   // 내보내기 때 이름 겹침 방지로 붙은 _숫자 제거
    const skinned = [];
    rig.traverse(o => { if (o.isSkinnedMesh) skinned.push(o); });
    skinned.forEach(o => {
      const kind = o.userData.kind === 'skin' ? '' : o.userData.kind;
      const m = matOf[kind] || (matOf[kind] = makeMat(kind), mats.push(matOf[kind]), matOf[kind]);
      o.material = m;
      o.castShadow = kind !== 'wing';
      o.frustumCulled = false;
      if (kind === '') {
        const ol = new THREE.SkinnedMesh(o.geometry, OL);
        ol.userData.isOutline = true;
        ol.frustumCulled = false;
        ol.position.copy(o.position); ol.quaternion.copy(o.quaternion); ol.scale.copy(o.scale);
        o.parent.add(ol);
        ol.bind(o.skeleton, o.bindMatrix);
        ol.visible = !(window.gameApp && window.gameApp.lowPower);
      }
    });
    ud.mats = mats;
    ud._mon3d = true;
    const H = T.height;
    const turtle = type === 'lavaturtle';
    const isBug = type === 'bug';
    const heavy = type === 'iron_chimera' || type === 'midboss' || turtle;
    if (marker) marker.position.set(0, H * 0.82, 0.9);
    if (T.radius) {
      ud.bodyRadius = T.radius;
      ud.sizeH = H;
      ud.hurtParts = {
        head: { yMin: H * 0.45, yMax: H * 1.1, hitY: H * 0.5, mult: 1.5, label: '🎯머리 약점' },
        body: { yMin: H * 0.2, yMax: H * 0.45, hitY: H * 0.35, mult: 1.0, label: '💥몸통' },
        legs: { yMin: 0.0, yMax: H * 0.2, hitY: H * 0.1, mult: 1.05, label: '🦵다리(둔화)' }
      };
      if (hurtRing) hurtRing.scale.setScalar(T.radius / 2.4);
    }
    const _mv = new THREE.Vector3();

    // ---------------- 동작 재생기 ----------------
    const mixer = new THREE.AnimationMixer(rig);
    const act = {};
    Object.entries(T.clips).forEach(([n, c]) => {
      const a = mixer.clipAction(c);
      if (n === 'Idle' || n === 'Walk' || n === 'Spin') a.setLoop(THREE.LoopRepeat, Infinity);
      else { a.setLoop(THREE.LoopOnce, 1); a.clampWhenFinished = true; }
      act[n] = a;
    });
    const A = {
      mixer, act, base: null, one: null, oneEnd: 0, t: 0,
      chasing: false, atk: null, dead: false, deadT: 0, spin: false, wing: 0, lastSeen: 0
    };
    ud.anim = A;
    const fadeTo = (name, dur = 0.2) => {
      const a = act[name];
      if (!a) return null;
      Object.entries(act).forEach(([n, b]) => { if (b !== a && b.isRunning()) b.fadeOut(dur); });
      a.reset(); a.setEffectiveWeight(1); a.fadeIn(dur); a.play();
      return a;
    };
    const setBase = name => {
      if (A.base === name && !A.one) return;
      A.base = name;
      if (A.one) return;   // 단발 동작이 끝나면 돌아감
      const a = fadeTo(name, 0.25);
      if (a && name === 'Idle') a.time = Math.random() * a.getClip().duration;
      if (a && name === 'Walk') a.timeScale = heavy ? 0.8 : 1.05;
    };
    const playOne = (name, fade = 0.08, hold = false) => {
      const a = fadeTo(name, fade);
      if (!a) return;
      A.one = name;
      A.oneEnd = A.t + a.getClip().duration / (a.timeScale || 1) + (hold ? 1e9 : 0);
    };
    A.playOne = playOne;
    ud.playAnim = name => {
      if (name === 'Death') { A.dead = true; A.deadT = A.t; A.atk = null; playOne('Death', 0.06, true); return true; }
      if (!act[name]) return false;
      playOne(name);
      return true;
    };
    setBase('Idle');

    A.tick = dt => {
      A.t += dt;
      const ta = A.t;
      if (A.dead) {
        // 다시 살아났으면(게임이 다시 움직이게 함) 원래 상태로
        if (A.lastSeen > A.deadT + 0.05) { A.dead = false; A.one = null; A.base = null; setBase('Idle'); }
      } else if (A.spin && act.Spin) {
        if (A.base !== 'Spin') { A.one = null; A.base = 'Spin'; fadeTo('Spin', 0.15); }
      } else if (A.atk) {
        if (A.atk.tg && A.atk.tg.duration) A.atk.dur = Math.max(0.25, A.atk.tg.duration - 0.12);
        const e = ta - A.atk.t0;
        if (e < A.atk.dur) {
          if (A.one !== 'Windup') playOne('Windup', 0.12, true);
        } else if (!A.atk.struck) {
          A.atk.struck = true;
          playOne('Strike', 0.04);
          A.atk = null;
        }
      } else {
        if (A.base === 'Spin') A.base = null;
        if (A.one && ta >= A.oneEnd) { A.one = null; const b = A.base || 'Idle'; A.base = null; setBase(b); }
        setBase(A.chasing ? 'Walk' : 'Idle');
      }
      mixer.update(dt);
      // 날갯짓은 동작 클립과 따로 (빠르게)
      if (isBug) {
        A.wing += dt * 34;
        if (bones.wingL) bones.wingL.rotation.z = Math.sin(A.wing) * 0.7;
        if (bones.wingR) bones.wingR.rotation.z = -Math.sin(A.wing) * 0.7;
      }
    };
    live.add(group);

    let spinAng = 0, lastT = 0;
    ud.setSpin = on => { A.spin = !!on; };
    ud.setP3 = on => {
      mats.forEach(m => {
        if (m.isMeshBasicMaterial) m.color.setRGB(on ? 1.6 : 1, on ? 1.25 : 1, on ? 1.0 : 1);
        else m.color.setRGB(1, on ? 0.78 : 1, on ? 0.72 : 1);
      });
    };
    ud.ventWorld = out => { out.set(0, H + 0.05, -0.35); return rig.localToWorld(out); };

    ud.updateMonsterMotion = (time, isChasing, phaseOffset, facingYaw = 0) => {
      const rel = facingYaw - group.rotation.y;
      if (hurtRing) hurtRing.rotation.y = rel;
      const fdt = Math.min(0.1, Math.max(0, time - lastT)); lastT = time;
      if (A.spin) spinAng += fdt * 16; else spinAng = 0;
      root.rotation.y = rel + spinAng;
      A.chasing = !!isChasing;
      A.lastSeen = A.t;
      if (ud.hitWobble > 0.001) ud.hitWobble *= 0.86; else ud.hitWobble = 0;
      mats.forEach(mm => { const u = mm.userData.fxFlash; if (u && u.uFlash.value > 0.001 && !mm.userData.fxFlashing) u.uFlash.value *= 0.8; });
      if (ud._bossAura && ud._bossAura.userData.update) ud._bossAura.userData.update(time);
      if (marker && marker.visible) {
        // 거북: 약점(머리) 표시가 머리를 따라다니게
        if (turtle && bones.head) {
          bones.head.getWorldPosition(_mv); bodyWrap.worldToLocal(_mv);
          marker.position.set(_mv.x + Math.sin(rel) * 1.9, _mv.y + 0.9, _mv.z + Math.cos(rel) * 1.9);
        }
        marker.rotation.z = time * 3.5;
        const k = 1.0 + Math.sin(time * 8) * 0.15;
        marker.scale.set(k, k, 1);
      }
    };
    ud.flashHit = (partName = 'body') => {
      ud.lastHitPart = partName;
      ud.hitWobble = partName === 'head' ? 0.65 : 0.45;
      const flashColor = partName === 'head' ? 0xfef08a : partName === 'back' ? 0x38bdf8 : 0xffffff;
      mats.forEach(m => {
        const u = m.userData.fxFlash;
        if (!u) return;
        u.uFlash.value = 0.8;
        u.uFlashColor.value.setHex(partName === 'body' || partName === 'legs' ? 0xffffff : flashColor);
      });
      // 기 모으기·내려치기 중엔 끊지 않음 (보스는 맞을 때마다 움찔하면 어색하므로 가끔만)
      if (!A.dead && !A.atk && A.one !== 'Strike' && A.one !== 'Windup' && !A.spin) {
        if (!T.radius || Math.random() < 0.25) playOne('Hit', 0.05);
      }
    };
  }

  // ---------------- 게임과 연결 ----------------
  const orig = window.createMonster3D;
  if (typeof orig === 'function') {
    window.createMonster3D = function (type = 'chimera') {
      const g = orig.apply(this, arguments);
      if (!isOff() && TYPES.has(type) && g && g.userData) {
        // 보스 오라를 원래 함수 안에서 만들었으면 업데이트를 이어받음
        g.children.forEach(c => { if (c.userData && typeof c.userData.update === 'function' && c !== g.userData.hurtRingGroup && c !== g.userData.bodyWrap) g.userData._bossAura = c; });
        g.userData._mon3dType = type;
        if (LIB) upgrade(g, type);
        else { pending.add(g); load(); }
      }
      return g;
    };
  }
  if (typeof Chiikawa3DWorldApp !== 'undefined') {
    const P = Chiikawa3DWorldApp.prototype;
    // 매 프레임: 동작 재생 (장면에서 빠진 몬스터는 목록에서 정리)
    const origFx = P.updateEffects;
    P.updateEffects = function (dt) {
      const r = origFx.apply(this, arguments);
      const d = Math.min(0.1, dt || 0.016);
      live.forEach(g => {
        const A = g.userData.anim;
        if (!A) { live.delete(g); return; }
        let p = g.parent, inScene = false;
        while (p) { if (p.isScene) { inScene = true; break; } p = p.parent; }
        if (!inScene) { if ((A.gone = (A.gone || 0) + d) > 3) live.delete(g); return; }
        A.gone = 0;
        if (!g.visible) return;
        try { A.tick(d); } catch (e) { live.delete(g); }
      });
      return r;
    };
    // 공격 예고 장판 → 기 모으기, 장판이 터질 때 내려치기
    const origTele = P.spawnMonsterAttackTelegraph;
    if (typeof origTele === 'function') {
      P.spawnMonsterAttackTelegraph = function (m) {
        const r = origTele.apply(this, arguments);
        try {
          const A = m && m.mesh && m.mesh.userData.anim;
          const tg = this.telegraphs && this.telegraphs[this.telegraphs.length - 1];
          if (A && !A.dead) {
            const dur = (tg && tg.duration) || 0.8;
            // 보스가 장판을 여러 개 동시에 깔면 가장 늦게 터지는 것에 맞춤 (장판 시간은 나중에 바뀔 수 있어 tg를 기억)
            if (!A.atk || A.t + dur > A.atk.t0 + A.atk.dur) A.atk = { t0: A.t, dur: Math.max(0.25, dur - 0.12), tg, struck: false };
          }
        } catch (e) { /* 동작만 생략 */ }
        return r;
      };
    }
  }
  if (!isOff()) load();
  return { load, upgrade, get lib() { return LIB; }, live };
})();

expose({ get MON3D() { return MON3D; } });
export default MON3D;
