// ⚙️ ES 모듈: 전투 손맛 (타격감) 보강
//  1) 무기 궤적: 손에 든 무기 끝을 따라가는 빛 리본 (등급 색)
//  2) 베기 자국: 맞은 자리에 휘두른 방향으로 번쩍이는 선 (머리·치명타는 X자)
//  3) 처치 날리기: 쓰러진 몬스터가 바로 사라지지 않고 튕겨 날아가며 빙글 돌다 펑
//  4) 마무리 일격(3타)·처치 순간 히트스톱(멈칫)을 조금 더 길게
import THREE from '../core/three.js';
import { Chiikawa3DWorldApp } from '../game/main.js';
import { expose } from '../core/expose.js';

const FEEL = (() => {
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const GRADE_COL = { C: 0xe2e8f0, B: 0x60a5fa, A: 0xc084fc, S: 0xfbbf24 };
  let enabled = true;
  try { enabled = localStorage.getItem('chiikawa_feel') !== 'off'; } catch (e) { /* 무시 */ }

  // ------------------------------------------------------------------
  // 1) 무기 궤적 리본
  // ------------------------------------------------------------------
  const MAXS = 40;          // 저장하는 샘플 수
  const LIFE = 0.17;        // 궤적이 남는 시간(초)
  const samples = [];       // { b: 밑, t: 끝, at: 시각 }
  let trail = null, trailMat = null, trailCol = new THREE.Color(0xffffff);
  function makeTrail() {
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(MAXS * 2 * 3), a = new Float32Array(MAXS * 2), u = new Float32Array(MAXS * 2);
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aA', new THREE.BufferAttribute(a, 1).setUsage(THREE.DynamicDrawUsage));
    geo.setAttribute('aU', new THREE.BufferAttribute(u, 1));
    for (let i = 0; i < MAXS; i++) { u[i * 2] = 0; u[i * 2 + 1] = 1; }
    const idx = [];
    for (let i = 0; i < MAXS - 1; i++) { const k = i * 2; idx.push(k, k + 1, k + 2, k + 1, k + 3, k + 2); }
    geo.setIndex(idx);
    trailMat = new THREE.ShaderMaterial({
      uniforms: { uC: { value: trailCol } },
      vertexShader: `attribute float aA; attribute float aU; varying float vA; varying float vU;
        void main(){ vA = aA; vU = aU; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform vec3 uC; varying float vA; varying float vU;
        void main(){ float edge = smoothstep(0.0, 0.55, vU);                  // 손잡이 쪽은 흐리게, 끝은 진하게
          float core = smoothstep(0.75, 1.0, vU) * 0.9;                        // 끝쪽 하얀 심
          vec3 c = mix(uC, vec3(1.0), core * vA);
          gl_FragColor = vec4(c * vA * edge * 1.35, vA * edge); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    });
    trail = new THREE.Mesh(geo, trailMat);
    trail.frustumCulled = false;
    trail.renderOrder = 5;
    trail.userData.noShadow = true;
    return trail;
  }
  function weaponPoints(app, outB, outT) {
    const pm = app.playerMesh;
    if (!pm || !pm.userData) return false;
    const ud = pm.userData;
    const w = ud._gearWObj;
    if (w && w.parent) {
      const head = w.children[0];
      const tip = (head && head.userData.tip) || 2.6;
      w.updateWorldMatrix(true, false);
      outB.set(0, tip * 0.42, 0).applyMatrix4(w.matrixWorld);
      outT.set(0, tip * 1.02, 0).applyMatrix4(w.matrixWorld);
      clampAbove(app, outB, outT);
      return true;
    }
    const wm = ud.parts && ud.parts.weaponMesh;
    if (!wm) return false;
    wm.updateWorldMatrix(true, false);
    outB.set(0, 0.9, 0).applyMatrix4(wm.matrixWorld);
    outT.set(0, 2.3, 0).applyMatrix4(wm.matrixWorld);
    clampAbove(app, outB, outT);
    return true;
  }
  // 내려찍기처럼 무기 끝이 땅속으로 들어가도 궤적은 바닥 위에 보이게
  function clampAbove(app, b, t) {
    const g = (app.playerPos ? app.playerPos.y : 0) + 0.12;
    if (t.y < g) t.y = g + (g - t.y) * 0.15;
    if (b.y < g) b.y = g;
  }
  const _b = V(), _t = V();
  let lastSwinging = false;
  function updateTrail(app, now) {
    if (!trail) { makeTrail(); }
    if (trail.parent !== app.scene) app.scene.add(trail);
    const swinging = (app.attackTimer > 0 || !!app.skillAnim) && !app.isDowned && app.playerMesh && app.playerMesh.visible;
    if (swinging && weaponPoints(app, _b, _t)) {
      if (!lastSwinging) {
        samples.length = 0;
        const wv = (app.playerMesh.userData._gearW || '').split('|');
        const cfg = window.CHAR_CONFIGS && window.CHAR_CONFIGS[app.activeCharKey];
        trailCol.setHex(wv[1] ? GRADE_COL[wv[1]] || 0xffffff : (cfg && cfg.accentColor) || 0xffffff);
      }
      // 프레임이 띄엄띄엄이어도 부드럽게: 직전 샘플과 사이를 나눠 채움
      const last = samples[samples.length - 1];
      if (last) {
        const gap = last.t.distanceTo(_t);
        const n = Math.min(4, Math.floor(gap / 0.45));
        for (let k = 1; k <= n; k++) {
          const f = k / (n + 1);
          samples.push({ b: last.b.clone().lerp(_b, f), t: last.t.clone().lerp(_t, f), at: last.at + (now - last.at) * f });
        }
      }
      samples.push({ b: _b.clone(), t: _t.clone(), at: now });
      while (samples.length > MAXS) samples.shift();
    }
    lastSwinging = swinging;
    while (samples.length && now - samples[0].at > LIFE) samples.shift();
    const pos = trail.geometry.attributes.position.array, al = trail.geometry.attributes.aA.array;
    const n = samples.length;
    for (let i = 0; i < MAXS; i++) {
      const s = samples[Math.max(0, Math.min(n - 1, i - (MAXS - n)))];
      const k = i * 6;
      if (!s || n < 2) { al[i * 2] = al[i * 2 + 1] = 0; continue; }
      pos[k] = s.b.x; pos[k + 1] = s.b.y; pos[k + 2] = s.b.z;
      pos[k + 3] = s.t.x; pos[k + 4] = s.t.y; pos[k + 5] = s.t.z;
      const age = Math.max(0, 1 - (now - s.at) / LIFE);
      const a = i < MAXS - n ? 0 : age * age;
      al[i * 2] = al[i * 2 + 1] = a;
    }
    trail.geometry.attributes.position.needsUpdate = true;
    trail.geometry.attributes.aA.needsUpdate = true;
    trail.visible = n >= 2;
  }

  // ------------------------------------------------------------------
  // 2) 베기 자국 (화면을 향한 길쭉한 빛줄기)
  // ------------------------------------------------------------------
  let streakTex = null;
  function getStreakTex() {
    if (streakTex) return streakTex;
    const c = document.createElement('canvas'); c.width = 256; c.height = 32;
    const x = c.getContext('2d');
    const g = x.createLinearGradient(0, 0, 256, 0);
    g.addColorStop(0, 'rgba(255,255,255,0)'); g.addColorStop(0.45, 'rgba(255,255,255,0.9)'); g.addColorStop(0.55, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = g;
    x.beginPath(); x.moveTo(0, 16); x.quadraticCurveTo(128, 2, 256, 16); x.quadraticCurveTo(128, 30, 0, 16); x.fill();
    streakTex = new THREE.CanvasTexture(c);
    return streakTex;
  }
  const streaks = [];
  function slashStreak(app, pos, dir, color, cross) {
    if (!app.camera || !app.scene) return;
    // 휘두른 방향(dir)을 화면에 투영해 기울기를 정함 → 그 수직으로 그어진 자국
    const a = pos.clone().project(app.camera), b = pos.clone().add(dir).project(app.camera);
    const asp = (app.renderer && app.renderer.domElement) ? app.renderer.domElement.width / Math.max(1, app.renderer.domElement.height) : 1.6;
    const ang = Math.atan2(b.y - a.y, (b.x - a.x) * asp) + Math.PI / 2 + (Math.random() - 0.5) * 0.5;
    const list = cross ? [ang - 0.55, ang + 0.55] : [ang];
    list.forEach((r, i) => {
      const m = new THREE.SpriteMaterial({ map: getStreakTex(), color, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false, depthTest: false, rotation: r });
      const sp = new THREE.Sprite(m);
      sp.position.copy(pos);
      sp.renderOrder = 20;
      sp.userData.noShadow = true;
      app.scene.add(sp);
      streaks.push({ sp, t: -i * 0.03, life: 0.2, len: cross ? 5.2 : 4.4 });
    });
  }
  function updateStreaks(dt) {
    for (let i = streaks.length - 1; i >= 0; i--) {
      const s = streaks[i];
      s.t += dt;
      const k = Math.max(0, s.t) / s.life;
      if (k >= 1) { s.sp.parent && s.sp.parent.remove(s.sp); s.sp.material.dispose(); streaks.splice(i, 1); continue; }
      s.sp.visible = s.t >= 0;
      const grow = 1 - Math.pow(1 - Math.min(1, k * 2.2), 3);
      s.sp.scale.set(s.len * (0.35 + 0.65 * grow), 0.55 * (1 - k * 0.8), 1);
      s.sp.material.opacity = 1 - k * k;
    }
  }

  // ------------------------------------------------------------------
  // 3) 처치 날리기
  // ------------------------------------------------------------------
  const flyers = [];
  function launch(app, m, dir) {
    const mesh = m.mesh;
    if (!mesh) return;
    const d = (dir && dir.lengthSq() > 0.01 ? dir.clone() : V(Math.random() - 0.5, 0, Math.random() - 0.5)).setY(0).normalize();
    const big = (m.bodyRadius || 2) > 3.2;
    flyers.push({
      m, mesh, t: 0, life: big ? 0.6 : 0.5,
      vel: d.multiplyScalar(big ? 7 : 12).setY(big ? 7 : 10.5),
      spin: (Math.random() < 0.5 ? -1 : 1) * (big ? 6 : 11),
      p0: mesh.position.clone(), r0: mesh.rotation.clone(), s0: mesh.scale.clone()
    });
    mesh.visible = true;
    if (mesh.userData.flashHit) mesh.userData.flashHit('body');
  }
  function updateFlyers(app, dt) {
    for (let i = flyers.length - 1; i >= 0; i--) {
      const f = flyers[i];
      f.t += dt;
      const k = f.t / f.life;
      if (k >= 1 || f.m.alive) {
        // 원래 상태로 되돌리고 숨김 (다시 살아날 때 위치·크기는 게임이 맞춤)
        const end = f.mesh.position.clone().add(V(0, 1.2, 0));
        f.mesh.rotation.copy(f.r0); f.mesh.scale.copy(f.s0);
        if (!f.m.alive) { f.mesh.visible = false; f.mesh.position.copy(f.p0); }
        if (k >= 1 && typeof window.FXHQ !== 'undefined' && window.FXHQ.deathPoof) window.FXHQ.deathPoof(end, 0xfacc15);
        flyers.splice(i, 1);
        continue;
      }
      f.vel.y -= 32 * dt;
      f.mesh.position.addScaledVector(f.vel, dt);
      if (f.mesh.position.y < f.p0.y) f.mesh.position.y = f.p0.y;
      f.mesh.rotation.z = f.r0.z + f.spin * f.t * 0.35;
      f.mesh.rotation.y = f.r0.y + f.spin * f.t * 0.2;
      const sc = k < 0.75 ? 1 : 1 - (k - 0.75) / 0.25 * 0.85;
      f.mesh.scale.set(f.s0.x * sc * (1 + Math.sin(k * 20) * 0.04), f.s0.y * sc, f.s0.z * sc);
    }
  }

  // ------------------------------------------------------------------
  // 연결
  // ------------------------------------------------------------------
  function install() {
    if (typeof Chiikawa3DWorldApp === 'undefined') return;
    const P = Chiikawa3DWorldApp.prototype;
    const origDmg = P.damageMonsterPart;
    P.damageMonsterPart = function (m, baseDmg, knockDir, hitPart, isBackAttack) {
      const wasAlive = m && m.alive;
      const r = origDmg.apply(this, arguments);
      if (!enabled) return r;
      try {
        if (m && m.mesh && hitPart !== 'net') {
          const h = m.sizeH || 3;
          const y = hitPart === 'head' ? h * 0.78 : hitPart === 'legs' ? h * 0.2 : h * 0.48;
          const hp = m.pos.clone().add(V(0, y, 0));
          const fwd = knockDir ? knockDir.clone() : V(0, 0, 1);
          const side = V(-fwd.z, 0, fwd.x);
          const swingDir = (this.comboStep === 2 ? side.negate() : side).add(V(0, this.comboStep === 3 ? -0.8 : 0.15, 0));
          const wv = (this.playerMesh && this.playerMesh.userData._gearW || '').split('|');
          const col = hitPart === 'head' ? 0xfff3b0 : wv[1] ? GRADE_COL[wv[1]] : 0xffffff;
          slashStreak(this, hp, swingDir, col, hitPart === 'head' || isBackAttack || this.comboStep === 3);
        }
        if (wasAlive && m && !m.alive && !m.isRaidBoss) {
          launch(this, m, knockDir);
          this.hitStopTimer = Math.max(this.hitStopTimer || 0, 0.085);
          this.camShake = Math.max(this.camShake || 0, 0.45);
        }
      } catch (e) { /* 연출 실패는 무시 */ }
      return r;
    };
    // 마무리 일격(3타)은 더 묵직하게
    const origAtk = P.triggerAttack;
    P.triggerAttack = function () {
      const before = this.hitStopTimer || 0;
      const r = origAtk.apply(this, arguments);
      if (enabled && this.comboStep === 3 && (this.hitStopTimer || 0) > before) this.hitStopTimer = Math.max(this.hitStopTimer, 0.075);
      return r;
    };
    const origFx = P.updateEffects;
    let ft = 0;
    P.updateEffects = function (dt) {
      const r = origFx.call(this, dt);
      const rdt = this.hitStopTimer > 0 ? dt / 0.12 : dt;   // 히트스톱(느려진 시간) 중에도 연출은 원래 속도로
      ft += rdt;
      if (!enabled) return r;
      try {
        updateTrail(this, ft);
        updateStreaks(rdt);
        updateFlyers(this, dt);
      } catch (e) { if (!install._w) { install._w = true; console.warn('FEEL', e); } }
      return r;
    };
  }
  return { install, slashStreak, launch, _dbg: () => ({ n: samples.length, vis: !!(trail && trail.visible), inScene: !!(trail && trail.parent), col: trailCol.getHexString(), s0: samples[0] && samples[0].t.toArray().map(v => +v.toFixed(2)), sN: samples.length && samples[samples.length - 1].t.toArray().map(v => +v.toFixed(2)) }) };
})();
FEEL.install();

export { FEEL };
expose({
  get FEEL() { return FEEL; }
});
