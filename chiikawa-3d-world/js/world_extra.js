// ==========================================================================
// 치이카와 3D 월드 - 빈 공간 콘텐츠 (world_extra.js)
//  1) ☁️ 구름 푸딩 점프 타워 (동쪽 평원) : 쉬움→보통→어려움 3구간, 체크포인트, 기록, 보상
//  2) 🎪 들판 이벤트 광장 (남쪽 평원)   : 엘리트 습격 / 황금 잡초 대풍년 / 보물상자 러시
// ==========================================================================
const WORLDX = (() => {
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const JC = { x: 150, z: -5 };     // 점프 타워 중심
  const EC = { x: 10, z: 128 };     // 이벤트 광장 중심
  const ER = 26;                    // 이벤트 광장 반경

  // 나무/바위가 겹치지 않도록 배치 금지 영역 등록 (world_hq.js 빌드 전에 실행됨)
  try {
    if (typeof WQ_EXCLUDE !== 'undefined') {
      WQ_EXCLUDE.push([JC.x, JC.z, 30], [EC.x, EC.z, ER + 4]);
    }
  } catch (e) {}

  let app = null;
  const toon = col => new THREE.MeshToonMaterial({ color: col, gradientMap: typeof getToonGradientMap === 'function' ? getToonGradientMap() : null });
  const outline = (m, t = 0.06) => { if (typeof addCartoonOutline === 'function') addCartoonOutline(m, t); };
  const fmt = s => {
    if (!isFinite(s)) return '--:--.-';
    const m = Math.floor(s / 60);
    const r = s - m * 60;
    return `${String(m).padStart(2, '0')}:${r.toFixed(1).padStart(4, '0')}`;
  };
  const toast = msg => { if (typeof showToast === 'function') showToast(msg); };

  // ======================================================================
  // 1) 점프 타워
  // ======================================================================
  const plats = [];
  const J = {
    group: null, active: false, startT: 0, elapsed: 0, cp: -1, section: 0,
    supportIdx: -1, prevY: 0, fallT: 0, hud: null, goalReached: false
  };
  const SECTION_NAMES = ['구름 산책길 (쉬움)', '말랑 트램펄린 계곡 (보통)', '부서지는 쿠키 하늘길 (어려움)'];
  const SECTION_COLORS = [0xffb3cf, 0x8fd3ff, 0xc9a7ff];

  function buildCourse() {
    const R = 19;
    let ang = Math.PI; // 마을 쪽(서쪽)에서 시작
    let y = 0;
    const list = [];
    const step = (chord, dy, r, type, sec, extra = {}) => {
      ang -= 2 * Math.asin(Math.min(0.95, chord / (2 * R)));
      y += dy;
      list.push(Object.assign({ ang, y, r, type, sec }, extra));
    };
    // 시작 발판 (지면)
    list.push({ ang, y: 0, r: 3.4, type: 'start', sec: 0 });
    // 구간 1: 쉬움 (넓은 발판, 낮은 단차)
    for (let i = 0; i < 10; i++) step(7, 1.7, 2.5, 'normal', 0);
    step(8, 1.6, 4, 'checkpoint', 0, { cpIdx: 0 });
    // 구간 2: 보통 (움직이는 발판 + 트램펄린)
    const s2 = ['moving', 'normal', 'tramp', 'high', 'moving', 'moving', 'normal', 'tramp', 'high', 'normal'];
    s2.forEach(t => {
      if (t === 'high') step(8, 7, 2.2, 'normal', 1);
      else step(t === 'tramp' ? 7.5 : 8, t === 'tramp' ? 1.2 : 2.1, t === 'moving' ? 2.2 : 2.3, t, 1, t === 'moving' ? { amp: 3, spd: 1.6 } : {});
    });
    step(8.5, 2, 4, 'checkpoint', 1, { cpIdx: 1 });
    // 구간 3: 어려움 (작은 발판, 무너지는 쿠키, 빠른 이동 발판)
    const s3 = ['crumble', 'small', 'crumble', 'fast', 'crumble', 'crumble', 'small', 'fast', 'crumble', 'crumble', 'fast', 'crumble'];
    s3.forEach(t => step(8.5, 2.4, t === 'fast' ? 1.7 : 1.55, t === 'small' ? 'normal' : t === 'fast' ? 'moving' : t, 2, t === 'fast' ? { amp: 3.6, spd: 2.8 } : {}));
    step(9, 2.4, 4.8, 'goal', 2);
    return list;
  }

  function makePlatformMesh(p) {
    const g = new THREE.Group();
    const secCol = SECTION_COLORS[p.sec] || 0xffffff;
    if (p.type === 'tramp' && typeof createGiantPudding3D === 'function') {
      const pud = createGiantPudding3D();
      const s = p.r / 4.6;
      pud.scale.setScalar(s);
      pud.position.y = -5.3 * s;
      g.add(pud);
      p.topOff = 0;
      g.userData.pud = pud;
      g.userData.pudScale = s;
      return g;
    }
    const thick = p.type === 'start' ? 0.5 : 1.1;
    let baseCol = 0xfff4e0;
    let topCol = secCol;
    if (p.type === 'crumble') { baseCol = 0xc98b4e; topCol = 0xe8b07a; }
    if (p.type === 'checkpoint') { baseCol = 0xffffff; topCol = 0x86efac; }
    if (p.type === 'goal') { baseCol = 0xfff1c1; topCol = 0xfacc15; }
    if (p.type === 'start') { baseCol = 0xffffff; topCol = 0xff85a2; }
    const body = new THREE.Mesh(new THREE.CylinderGeometry(p.r * 0.92, p.r * 0.72, thick, 28), toon(baseCol));
    body.position.y = -thick / 2 - 0.12;
    outline(body, 0.05);
    g.add(body);
    const top = new THREE.Mesh(new THREE.CylinderGeometry(p.r, p.r * 0.97, 0.26, 28), toon(topCol));
    top.position.y = -0.13;
    outline(top, 0.04);
    g.add(top);
    // 구름 장식 (공중 발판)
    if (p.type !== 'start' && p.type !== 'crumble') {
      const cloudMat = toon(0xffffff);
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + p.ang;
        const puff = new THREE.Mesh(new THREE.SphereGeometry(p.r * 0.38, 10, 8), cloudMat);
        puff.position.set(Math.cos(a) * p.r * 0.75, -thick - 0.1, Math.sin(a) * p.r * 0.75);
        puff.scale.y = 0.6;
        g.add(puff);
      }
    }
    if (p.type === 'crumble') {
      // 쿠키 초코칩
      const chip = toon(0x5b3a1e);
      for (let i = 0; i < 5; i++) {
        const c = new THREE.Mesh(new THREE.SphereGeometry(0.16, 6, 5), chip);
        const a = i * 2.3, rr = p.r * (0.25 + (i % 3) * 0.22);
        c.position.set(Math.cos(a) * rr, 0.02, Math.sin(a) * rr);
        c.scale.y = 0.5;
        g.add(c);
      }
    }
    if (p.type === 'moving') {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(p.r * 0.9, 0.08, 6, 32),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.7, blending: THREE.AdditiveBlending, depthWrite: false }));
      ring.rotation.x = Math.PI / 2;
      ring.position.y = -1.5;
      g.add(ring);
      g.userData.ring = ring;
    }
    if (p.type === 'checkpoint' || p.type === 'start') {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 3.2, 8), toon(0xffffff));
      pole.position.set(p.r * 0.6, 1.6, 0);
      g.add(pole);
      const flagGeo = new THREE.BufferGeometry();
      flagGeo.setAttribute('position', new THREE.Float32BufferAttribute([0, 0, 0, 1.3, -0.35, 0, 0, -0.75, 0], 3));
      flagGeo.computeVertexNormals();
      const flagMat = new THREE.MeshBasicMaterial({ color: p.type === 'start' ? 0xff85a2 : 0x94a3b8, side: THREE.DoubleSide });
      const flag = new THREE.Mesh(flagGeo, flagMat);
      flag.position.set(p.r * 0.6 + 0.05, 3.15, 0);
      g.add(flag);
      g.userData.flag = flag;
      g.userData.flagMat = flagMat;
    }
    if (p.type === 'goal') {
      // 황금 종 트로피
      const bell = new THREE.Mesh(new THREE.SphereGeometry(1.1, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.62), toon(0xfacc15));
      bell.position.y = 2.6;
      bell.rotation.x = Math.PI;
      outline(bell, 0.05);
      g.add(bell);
      const arch = new THREE.Mesh(new THREE.TorusGeometry(1.9, 0.18, 8, 24, Math.PI), toon(0xff85a2));
      arch.position.y = 1.4;
      g.add(arch);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: typeof fxTex === 'function' ? fxTex('glow') : null, color: 0xfde047, transparent: true, opacity: 0.8,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      glow.scale.setScalar(7);
      glow.position.y = 2.4;
      g.add(glow);
      g.userData.bell = bell;
      g.userData.glow = glow;
    }
    p.topOff = 0;
    return g;
  }

  function initJump(scene) {
    const g = new THREE.Group();
    g.name = 'jump-tower';
    const list = buildCourse();
    list.forEach((p, idx) => {
      p.idx = idx;
      p.home = V(JC.x + Math.cos(p.ang) * 19, p.y, JC.z + Math.sin(p.ang) * 19);
      if (p.type === 'start') p.home.set(JC.x - 27, 0.1, JC.z);
      p.pos = p.home.clone();
      p.delta = V();
      p.radial = V(Math.cos(p.ang), 0, Math.sin(p.ang));
      p.phase = idx * 1.3;
      p.state = 'ok';
      p.t = 0;
      p.mesh = makePlatformMesh(p);
      p.mesh.position.copy(p.pos);
      g.add(p.mesh);
      plats.push(p);
    });
    // 가운데 콩나무 줄기 (얇게, 시야를 막지 않도록)
    const topY = plats[plats.length - 1].y;
    const vine = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.4, topY + 6, 12), toon(0x7ccf5a));
    vine.position.set(JC.x, (topY + 6) / 2, JC.z);
    g.add(vine);
    const leafMat = toon(0x5fb84a);
    for (let h = 4; h < topY; h += 5) {
      const leaf = new THREE.Mesh(new THREE.SphereGeometry(1.4, 10, 6), leafMat);
      const a = h * 0.9;
      leaf.position.set(JC.x + Math.cos(a) * 1.8, h, JC.z + Math.sin(a) * 1.8);
      leaf.scale.set(1, 0.25, 0.6);
      leaf.rotation.y = -a;
      g.add(leaf);
    }
    scene.add(g);
    J.group = g;
    if (app && app.addZoneSign) {
      app.addZoneSign('☁️ 구름 푸딩 점프 타워 (분홍 발판을 밟으면 시작!)', JC.x - 27, 6.5, JC.z);
      const goal = plats[plats.length - 1];
      app.addZoneSign('🔔 정상! 황금 종', goal.home.x, goal.home.y + 6, goal.home.z);
    }

    const hud = document.createElement('div');
    hud.id = 'jump-hud';
    hud.innerHTML = `<div class="jh-title">☁️ 점프 타워 <span class="jh-sec"></span></div>
      <div class="jh-time">00:00.0</div><div class="jh-best"></div>
      <button type="button" class="jh-quit">🏳️ 포기</button>`;
    document.body.appendChild(hud);
    hud.querySelector('.jh-quit').addEventListener('click', e => { e.currentTarget.blur(); stopRun('🏳️ 점프 타워 도전을 그만뒀어요.'); });
    J.hud = hud;
  }

  function startRun() {
    J.active = true;
    J.startT = performance.now() / 1000;
    J.elapsed = 0;
    J.cp = -1;
    J.section = 0;
    J.goalReached = false;
    J.fallT = 0;
    plats.forEach(p => { if (p.type === 'checkpoint') setFlag(p, false); });
    J.hud.classList.add('show');
    toast('☁️ 점프 타워 도전 시작! 구간마다 초록 깃발(체크포인트)을 밟으세요. 떨어지면 체크포인트로 돌아가요.');
    if (typeof soundFx !== 'undefined') soundFx.playSkill();
  }
  function stopRun(msg) {
    if (!J.active) return;
    J.active = false;
    J.hud.classList.remove('show');
    if (msg) toast(msg);
  }
  function setFlag(p, on) {
    if (p.mesh.userData.flagMat) p.mesh.userData.flagMat.color.setHex(on ? 0x22c55e : 0x94a3b8);
  }

  function reachCheckpoint(p) {
    if (!J.active || p.cpIdx <= J.cp) return;
    J.cp = p.cpIdx;
    J.section = p.cpIdx + 1;
    setFlag(p, true);
    const s = app.stats;
    s.jumpCpFirst = s.jumpCpFirst || 0;
    let bonus = '';
    if (!(s.jumpCpFirst & (1 << p.cpIdx))) {
      s.jumpCpFirst |= (1 << p.cpIdx);
      app.addReward(200, 120, 'jump');
      bonus = ' (첫 도달 보너스 +200🪙)';
      app.saveData();
    }
    if (typeof FXHQ !== 'undefined') {
      FXHQ.burst(p.pos.clone().add(V(0, 2, 0)), 0x86efac, 22);
      FXHQ.shockwave(p.pos.clone(), 0x86efac, 5);
    }
    if (typeof soundFx !== 'undefined') soundFx.playCoin();
    toast(`🚩 체크포인트 ${p.cpIdx + 1} 도착! ${fmt(J.elapsed)} · 다음: ${SECTION_NAMES[J.section]}${bonus}`);
  }

  function reachGoal(p) {
    if (!J.active || J.goalReached) return;
    J.goalReached = true;
    const t = J.elapsed;
    const s = app.stats;
    const first = !(s.jumpClears > 0);
    s.jumpClears = (s.jumpClears || 0) + 1;
    const prevBest = s.jumpBest > 0 ? s.jumpBest : Infinity;
    const isBest = t < prevBest;
    if (isBest) s.jumpBest = Math.round(t * 10) / 10;
    if (first) {
      app.addReward(1500, 800, 'jump');
      s.potions = Math.min(5, (s.potions | 0) + 2);
    } else {
      app.addReward(isBest ? 500 : 250, 150, 'jump');
    }
    app.saveData(true);
    app.updateHud();
    if (typeof FXHQ !== 'undefined') {
      for (let i = 0; i < 3; i++) setTimeout(() => FXHQ.burst(p.pos.clone().add(V((Math.random() - 0.5) * 4, 3 + Math.random() * 2, (Math.random() - 0.5) * 4)), [0xfacc15, 0xff85a2, 0x8fd3ff][i], 30), i * 220);
      FXHQ.screenFlash(0xfde047, 0.25, 300);
    }
    if (typeof soundFx !== 'undefined') soundFx.playFanfare();
    toast(first
      ? `🔔 점프 타워 첫 완주!! 기록 ${fmt(t)} · 보상 +1500🪙 +800EXP + HP 물약 2개`
      : `🔔 완주! 기록 ${fmt(t)}${isBest ? ' · 🏆 최고 기록 갱신! (+500🪙)' : ` · 최고 ${fmt(prevBest)} (+250🪙)`}`);
    J.active = false;
    J.hud.classList.add('done');
    J.hud.querySelector('.jh-time').textContent = fmt(t);
    J.hud.querySelector('.jh-sec').textContent = '완주!';
    setTimeout(() => { J.hud.classList.remove('show', 'done'); }, 4500);
  }

  function respawnAtCheckpoint() {
    const cpPlat = plats.find(p => p.type === 'checkpoint' && p.cpIdx === J.cp);
    if (!cpPlat) return;
    app.playerPos.set(cpPlat.pos.x, cpPlat.pos.y + 0.6, cpPlat.pos.z);
    J.prevY = cpPlat.pos.y + 0.6;
    app.playerVelY = 0;
    app.playerVel && app.playerVel.set(0, 0, 0);
    if (app.playerKnock) app.playerKnock.set(0, 0, 0);
    if (typeof FXHQ !== 'undefined') FXHQ.burst(app.playerPos.clone().add(V(0, 2, 0)), 0xffffff, 16);
    toast('☁️ 앗! 떨어졌어요. 체크포인트로 돌아왔어요.');
  }

  function updatePlats(dt) {
    const t = performance.now() / 1000;
    plats.forEach(p => {
      const old = p.pos.clone();
      if (p.type === 'moving') {
        const off = Math.sin(t * p.spd + p.phase) * p.amp;
        p.pos.copy(p.home).addScaledVector(p.radial, off);
        if (p.mesh.userData.ring) p.mesh.userData.ring.rotation.z += dt * 3;
      } else if (p.type === 'crumble') {
        if (p.state === 'shaking') {
          p.t += dt;
          p.pos.copy(p.home).add(V((Math.random() - 0.5) * 0.18, 0, (Math.random() - 0.5) * 0.18));
          if (p.t > 0.6) { p.state = 'falling'; p.t = 0; }
        } else if (p.state === 'falling') {
          p.t += dt;
          p.pos.copy(p.home).add(V(0, -p.t * p.t * 18, 0));
          p.mesh.visible = p.t < 0.8;
          if (p.t > 2.6) { p.state = 'ok'; p.t = 0; p.pos.copy(p.home); p.mesh.visible = true; p.mesh.scale.setScalar(0.2); }
        }
        if (p.state === 'ok' && p.mesh.scale.x < 1) p.mesh.scale.setScalar(Math.min(1, p.mesh.scale.x + dt * 3));
      } else if (p.type === 'tramp' && p.mesh.userData.pud) {
        const pud = p.mesh.userData.pud;
        const s = p.mesh.userData.pudScale;
        pud.scale.x += (s - pud.scale.x) * Math.min(1, dt * 10);
        pud.scale.y += (s - pud.scale.y) * Math.min(1, dt * 10);
        pud.scale.z = pud.scale.x;
      } else if (p.type === 'goal' && p.mesh.userData.bell) {
        p.mesh.userData.bell.rotation.z = Math.sin(t * 2.2) * 0.15;
        p.mesh.userData.glow.material.opacity = 0.55 + Math.sin(t * 3) * 0.25;
      }
      if (p.mesh.userData.flag) p.mesh.userData.flag.rotation.y = Math.sin(t * 3 + p.idx) * 0.3;
      p.delta.copy(p.pos).sub(old);
      p.mesh.position.copy(p.pos);
    });
  }

  // main.updatePlayer에서 호출: 발판 위면 그 높이를 반환 (아니면 0)
  function support(a, dt) {
    if (!plats.length || a.battleState.active || a.raidMode) { J.supportIdx = -1; return 0; }
    const pp = a.playerPos;
    if (Math.abs(pp.x - JC.x) > 40 || Math.abs(pp.z - JC.z) > 40) { J.supportIdx = -1; J.prevY = pp.y; return 0; }
    // 직전 프레임에 서 있던 발판이 움직였으면 같이 이동
    if (J.supportIdx >= 0) {
      const sp = plats[J.supportIdx];
      if (sp && sp.state !== 'falling') pp.add(sp.delta);
    }
    const prevY = J.prevY;
    let best = 0;
    let bestIdx = -1;
    for (const p of plats) {
      if (p.state === 'falling' || p.type === 'start') continue;
      const top = p.pos.y + (p.type === 'tramp' ? (p.mesh.userData.pudScale || 0.5) * 0.3 : 0);
      const d = Math.hypot(pp.x - p.pos.x, pp.z - p.pos.z);
      if (d > p.r + 0.45) continue;
      if (a.playerVelY > 0.01) continue;
      if (prevY >= top - 0.08 && pp.y <= top + 0.05 && top > best) {
        best = top;
        bestIdx = p.idx;
      }
    }
    J.supportIdx = -1;
    if (bestIdx >= 0) {
      const p = plats[bestIdx];
      if (p.type === 'tramp') {
        // 🍮 트램펄린: 높이 튕겨 오름
        pp.y = best + 0.05;
        a.playerVelY = 32;
        a.isGrounded = false;
        if (p.mesh.userData.pud) {
          const s = p.mesh.userData.pudScale;
          p.mesh.userData.pud.scale.set(s * 1.25, s * 0.65, s * 1.25);
        }
        if (typeof soundFx !== 'undefined') soundFx.playJump();
        if (typeof FXHQ !== 'undefined') FXHQ.shockwave(p.pos.clone(), 0xfde68a, 3);
        J.prevY = pp.y;
        return 0;
      }
      J.supportIdx = bestIdx;
      if (p.type === 'crumble' && p.state === 'ok') { p.state = 'shaking'; p.t = 0; }
      if (p.type === 'checkpoint') reachCheckpoint(p);
      if (p.type === 'goal') reachGoal(p);
      J.prevY = best;
      return best;
    }
    J.prevY = Math.max(pp.y, 0);
    return 0;
  }

  function updateJump(a, dt) {
    updatePlats(dt);
    const sp = plats[0];
    if (!J.active && sp && !a.battleState.active && !a.raidMode && a.playerPos.y < 1.2 &&
        Math.hypot(a.playerPos.x - sp.pos.x, a.playerPos.z - sp.pos.z) < sp.r && !J.hud.classList.contains('done')) {
      startRun();
    }
    if (!J.active) return;
    if (a.battleState.active || a.raidMode) { stopRun(); return; }
    J.elapsed = performance.now() / 1000 - J.startT;
    const pp = a.playerPos;
    // 떨어져서 바닥에 닿으면 → 체크포인트 복귀 (체크포인트가 없으면 도전 종료)
    const onGround = pp.y <= 0.05 && J.supportIdx < 0 && Math.hypot(pp.x - (JC.x - 27), pp.z - JC.z) > 4.2;
    if (onGround) {
      J.fallT += dt;
      if (J.fallT > 0.35) {
        J.fallT = 0;
        if (J.cp >= 0) respawnAtCheckpoint();
        else stopRun('☁️ 떨어졌어요! 시작 발판(분홍)을 다시 밟으면 처음부터 도전해요.');
      }
    } else {
      J.fallT = 0;
    }
    if (Math.hypot(pp.x - JC.x, pp.z - JC.z) > 60) stopRun('☁️ 점프 타워에서 멀어져서 도전이 끝났어요.');
    if (J.active && J.hud) {
      J.hud.querySelector('.jh-time').textContent = fmt(J.elapsed);
      J.hud.querySelector('.jh-sec').textContent = `· ${J.section + 1}/3 ${SECTION_NAMES[J.section] || ''}`;
      const best = a.stats.jumpBest > 0 ? a.stats.jumpBest : 0;
      J.hud.querySelector('.jh-best').textContent = best ? `🏆 최고 ${fmt(best)} · 높이 ${Math.round(pp.y)}m` : `높이 ${Math.round(pp.y)}m`;
    }
  }

  // ======================================================================
  // 2) 들판 이벤트 광장
  // ======================================================================
  const EV = {
    state: 'idle', timer: 45, type: null, mobs: [], weeds: [], chests: [], banner: null, dur: 0, sign: null
  };
  const EVENT_GAP = 100;     // 이벤트 사이 대기(초)
  const EVENT_TYPES = ['elite', 'weeds', 'chests'];

  function initEventZone(scene) {
    const g = new THREE.Group();
    // 광장 바닥 테두리 (깃발 기둥 + 원형 길)
    const ring = new THREE.Mesh(new THREE.RingGeometry(ER - 0.9, ER, 64), new THREE.MeshBasicMaterial({ color: 0xfde68a, transparent: true, opacity: 0.55, side: THREE.DoubleSide }));
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(EC.x, 0.06, EC.z);
    g.add(ring);
    const flagCols = [0xff85a2, 0x8fd3ff, 0xfde047, 0xa7f3d0, 0xc4b5fd];
    for (let i = 0; i < 10; i++) {
      const a = (i / 10) * Math.PI * 2;
      const x = EC.x + Math.cos(a) * ER, z = EC.z + Math.sin(a) * ER;
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.14, 4.2, 8), toon(0xffffff));
      pole.position.set(x, 2.1, z);
      outline(pole, 0.08);
      g.add(pole);
      const flag = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.4, 3), toon(flagCols[i % flagCols.length]));
      flag.position.set(x, 4.2, z);
      flag.rotation.z = Math.PI;
      g.add(flag);
    }
    // 중앙 무대 (이벤트 중에는 빛남)
    const stage = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 5, 0.5, 32), toon(0xfff1c1));
    stage.position.set(EC.x, 0.25, EC.z);
    outline(stage, 0.04);
    g.add(stage);
    const beacon = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, 30, 16, 1, true),
      new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
    beacon.position.set(EC.x, 15, EC.z);
    g.add(beacon);
    EV.beacon = beacon;
    scene.add(g);
    if (app && app.addZoneSign) app.addZoneSign('🎪 들판 이벤트 광장', EC.x, 7.5, EC.z);

    const b = document.createElement('div');
    b.id = 'field-event-hud';
    document.body.appendChild(b);
    EV.banner = b;
  }

  const rndInZone = (rMax = ER - 3) => {
    const a = Math.random() * Math.PI * 2;
    const r = 5 + Math.sqrt(Math.random()) * (rMax - 5);
    return V(EC.x + Math.cos(a) * r, 0, EC.z + Math.sin(a) * r);
  };

  function spawnMob(def, pos) {
    const mesh = createMonster3D(def.type);
    const scale = def.scale || 1;
    mesh.scale.setScalar(scale);
    mesh.position.copy(pos);
    app.scene.add(mesh);
    const labelEl = document.createElement('div');
    labelEl.className = 'world-label monster-hud-tag';
    if (def.isBoss) { labelEl.style.borderColor = '#facc15'; labelEl.style.background = 'rgba(15, 23, 42, 0.92)'; }
    labelEl.innerHTML = `<div>${def.name} <span class="monster-status-tag" style="font-size:10px; color:#38bdf8;"></span></div>
      <div class="monster-hp-track"><div class="monster-hp-fill" style="width:100%"></div></div>`;
    document.getElementById('world-labels-layer').appendChild(labelEl);
    const m = {
      ...def, maxHp: def.hp, mesh, pos: pos.clone(), homePos: pos.clone(), baseScale: scale, facingYaw: 0,
      bodyRadius: (mesh.userData.bodyRadius || 1.5) * scale, sizeH: (mesh.userData.sizeH || 5.4) * scale,
      isArmored: mesh.userData.isArmored || false, knockbackVel: V(), labelEl,
      statusEl: labelEl.querySelector('.monster-status-tag'), hpFillEl: labelEl.querySelector('.monster-hp-fill'),
      alive: true, respawnTimer: 999999, atkCooldown: 1.5, isWindingUp: false, slowTimer: 0, stunTimer: 0,
      heightOffset: 5.4 * scale, isEventMob: true
    };
    app.monsters.push(m);
    EV.mobs.push(m);
    if (typeof FXHQ !== 'undefined') FXHQ.burst(pos.clone().add(V(0, 2, 0)), def.isBoss ? 0xfacc15 : 0xef4444, 18);
    return m;
  }

  function startEvent(type) {
    const a = app;
    EV.state = 'active';
    EV.type = type;
    const lv = a.stats.level || 1;
    if (type === 'elite') {
      EV.dur = 150;
      spawnMob({
        type: 'midboss', name: `👑 들판의 엘리트 대괴수 Lv.${lv + 3}`, isBoss: true, isElite: true,
        hp: Math.round(900 + lv * 140), atk: Math.round(16 + lv * 2.2), coin: 450 + lv * 20, exp: 320 + lv * 15,
        scale: 1.35, atkPattern: 'circle', reach: 6.2
      }, V(EC.x, 0, EC.z));
      for (let i = 0; i < 3; i++) {
        spawnMob({
          type: i % 2 ? 'goblin' : 'chimera', name: `⚔️ 엘리트 호위병 Lv.${lv + 1}`,
          hp: Math.round(220 + lv * 45), atk: Math.round(9 + lv * 1.3), coin: 60, exp: 50,
          scale: 1.05, atkPattern: 'sector', reach: 4.5
        }, rndInZone(14));
      }
      announce('👑 엘리트 대괴수 습격!', '남쪽 들판 이벤트 광장에 엘리트가 나타났어요! 쓰러뜨리면 HP 물약 + 큰 보상', '#ef4444');
    } else if (type === 'weeds') {
      EV.dur = 70;
      for (let i = 0; i < 22; i++) {
        const mesh = createWeedPatch3D(true);
        const pos = rndInZone();
        mesh.position.copy(pos);
        a.scene.add(mesh);
        const w = { mesh, pos, isGolden: true, alive: true, respawnTimer: 0, isEventWeed: true };
        a.weeds.push(w);
        EV.weeds.push(w);
      }
      announce('🌾 황금 잡초 대풍년!', '이벤트 광장에 황금 잡초 22개가 돋아났어요! 70초 안에 뽑으세요', '#eab308');
    } else {
      EV.dur = 70;
      for (let i = 0; i < 9; i++) {
        const isCrystal = i % 3 === 0;
        const mesh = createTreasureChest3D(isCrystal);
        const pos = rndInZone();
        mesh.position.copy(pos);
        a.scene.add(mesh);
        const c = { mesh, pos, isCrystal, alive: true, respawnTimer: 0, isEventChest: true };
        a.chests.push(c);
        EV.chests.push(c);
      }
      announce('🎁 보물상자 러시!', '이벤트 광장에 보물상자 9개가 떨어졌어요! 70초 안에 여세요', '#38bdf8');
    }
    EV.timer = EV.dur;
  }

  function announce(title, sub, color) {
    toast(`${title} ${sub}`);
    if (typeof soundFx !== 'undefined') soundFx.playFanfare();
    const el = document.createElement('div');
    el.className = 'field-event-pop';
    el.style.setProperty('--fe', color);
    const t = document.createElement('div');
    t.className = 'fe-title';
    t.textContent = title;
    const s = document.createElement('div');
    s.className = 'fe-sub';
    s.textContent = sub;
    el.append(t, s);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3600);
  }

  function removeFrom(arr, item) { const i = arr.indexOf(item); if (i >= 0) arr.splice(i, 1); }
  function disposeMesh(mesh) {
    if (!mesh) return;
    if (mesh.parent) mesh.parent.remove(mesh);
    if (app.disposeObject3D) app.disposeObject3D(mesh);
  }

  function endEvent(reason) {
    const a = app;
    EV.mobs.forEach(m => {
      removeFrom(a.monsters, m);
      disposeMesh(m.mesh);
      if (m.labelEl) m.labelEl.remove();
    });
    EV.weeds.forEach(w => { removeFrom(a.weeds, w); disposeMesh(w.mesh); });
    EV.chests.forEach(c => { removeFrom(a.chests, c); disposeMesh(c.mesh); });
    EV.mobs = []; EV.weeds = []; EV.chests = [];
    if (reason) toast(reason);
    EV.state = 'idle';
    EV.type = null;
    EV.timer = EVENT_GAP;
  }

  function updateEvent(a, dt) {
    const inTown = !a.battleState.active && !a.raidMode && a.gameStarted;
    if (!inTown) {
      if (EV.state === 'active') endEvent();
      return;
    }
    EV.timer -= dt;
    const t = performance.now() / 1000;
    if (EV.beacon) EV.beacon.material.opacity = EV.state === 'active' ? 0.22 + Math.sin(t * 4) * 0.08 : 0;

    if (EV.state === 'idle') {
      if (EV.timer <= 0) startEvent(EVENT_TYPES[Math.floor(Math.random() * EVENT_TYPES.length)]);
    } else {
      // 처치된 이벤트 몬스터 정리 (마을 리스폰 방지)
      for (let i = EV.mobs.length - 1; i >= 0; i--) {
        const m = EV.mobs[i];
        if (!a.monsters.includes(m)) { EV.mobs.splice(i, 1); continue; }
        if (!m.alive) {
          if (m.isElite) {
            a.stats.potions = Math.min(5, (a.stats.potions | 0) + 1);
            a.addReward(300, 200, 'event');
            toast('👑 엘리트 대괴수 토벌 성공!! 보너스 +300🪙 + HP 물약 1개');
            a.saveData();
          }
          removeFrom(a.monsters, m);
          disposeMesh(m.mesh);
          if (m.labelEl) m.labelEl.remove();
          EV.mobs.splice(i, 1);
        }
      }
      // 뽑힌 잡초·열린 상자는 다시 생기지 않음
      for (let i = EV.weeds.length - 1; i >= 0; i--) {
        const w = EV.weeds[i];
        if (!w.alive) { removeFrom(a.weeds, w); disposeMesh(w.mesh); EV.weeds.splice(i, 1); }
      }
      for (let i = EV.chests.length - 1; i >= 0; i--) {
        const c = EV.chests[i];
        if (!c.alive) { removeFrom(a.chests, c); disposeMesh(c.mesh); EV.chests.splice(i, 1); }
      }
      const left = EV.mobs.length + EV.weeds.length + EV.chests.length;
      if (left === 0) endEvent('🎉 들판 이벤트 완료! 다음 이벤트를 기다려 주세요.');
      else if (EV.timer <= 0) endEvent('⌛ 들판 이벤트 시간이 끝났어요.');
    }
    // 상단 이벤트 알림
    if (EV.banner) {
      const dist = Math.hypot(a.playerPos.x - EC.x, a.playerPos.z - EC.z);
      let txt = '';
      if (EV.state === 'active') {
        const left = EV.type === 'elite' ? `남은 괴수 ${EV.mobs.length}` : EV.type === 'weeds' ? `남은 황금 잡초 ${EV.weeds.length}` : `남은 상자 ${EV.chests.length}`;
        const name = EV.type === 'elite' ? '👑 엘리트 습격' : EV.type === 'weeds' ? '🌾 황금 잡초 대풍년' : '🎁 보물상자 러시';
        txt = `🎪 ${name} 진행 중 · ${left} · ${Math.ceil(EV.timer)}초${dist > ER + 10 ? ' · 남쪽 이벤트 광장으로!' : ''}`;
      } else if (dist < ER + 15) {
        txt = `🎪 다음 들판 이벤트까지 ${Math.ceil(Math.max(0, EV.timer))}초`;
      }
      if (EV.banner._t !== txt) {
        EV.banner._t = txt;
        EV.banner.textContent = txt;
        EV.banner.classList.toggle('show', !!txt);
        EV.banner.classList.toggle('active', EV.state === 'active');
      }
    }
  }

  // ======================================================================
  // 공용
  // ======================================================================
  function init(a) {
    app = a;
    try { initJump(a.scene); } catch (e) { console.warn('점프 타워 생성 오류:', e); }
    try { initEventZone(a.scene); } catch (e) { console.warn('이벤트 광장 생성 오류:', e); }
  }

  function update(a, dt) {
    if (!app) return;
    try { updateJump(a, dt); } catch (e) { console.warn(e); }
    try { updateEvent(a, dt); } catch (e) { console.warn(e); }
  }

  function drawMinimap(a, ctx, half, scale, drawDot) {
    const clampXY = (x, z) => {
      const s = ctx.canvas.width;
      return [Math.max(6, Math.min(s - 6, half + x * scale)), Math.max(6, Math.min(s - 6, half + z * scale))];
    };
    const [jx, jy] = clampXY(JC.x, JC.z);
    ctx.fillStyle = '#c4b5fd';
    ctx.beginPath(); ctx.arc(jx, jy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('☁️', jx, jy - 7);
    const [ex, ey] = clampXY(EC.x, EC.z);
    ctx.strokeStyle = EV.state === 'active' ? '#ef4444' : '#eab308';
    ctx.lineWidth = EV.state === 'active' ? 2.5 : 1.5;
    ctx.beginPath(); ctx.arc(ex, ey, ER * scale, 0, Math.PI * 2); ctx.stroke();
    if (EV.state === 'active') {
      ctx.fillStyle = '#ef4444';
      ctx.fillText('❗', ex, ey + 4);
      EV.mobs.forEach(m => m.alive && drawDot(m.pos.x, m.pos.z, '#ef4444', 2.6));
    }
  }

  return {
    init, update, support, drawMinimap,
    startEvent, endEvent,
    get jump() { return J; }, get event() { return EV; }, plats,
    JUMP_CENTER: JC, EVENT_CENTER: EC
  };
})();
