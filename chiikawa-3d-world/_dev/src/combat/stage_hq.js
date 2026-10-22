// ⚙️ ES 모듈 (자동 변환): 앞쪽 모듈은 import, 뒤쪽 모듈·덮어쓰기 되는 이름은 window.이름 으로 참조
import THREE from '../core/three.js';
import { soundFx } from '../core/sound.js';
import { addCartoonOutline, getToonGradientMap } from '../core/models3d.js';
import { FXHQ, fxCreateBossAura, fxTex } from '../world/fx_hq.js';
import { POLISH } from '../world/polish_hq.js';
import { STAGE_CAMPAIGN_DATA, showToast } from '../game/minigames.js';
import { Chiikawa3DWorldApp } from '../game/main.js';
import { expose } from '../core/expose.js';
// ==========================================================================
// 치이카와 3D 월드 - 전투 스테이지 고퀄리티 & 난이도 개편 (stage_hq.js)
//  · 난이도 곡선 재설계: 15단계 보스 ≈ 레이드 아노코, 20단계는 진짜 어렵게
//  · 수문장/보스 전용 패턴 AI (장판 연계 · 돌진 · 메테오 · 대폭발 · 20단계 광폭화)
//  · 전투 맵 리메이크: 테마별(들판/협곡/유적/심연/태고) 바닥 셰이더, 성벽·망루·화로·깃발,
//    관문 아치, 보스 성소, 바깥 지형·하늘 돔·분위기 입자
//  · 몬스터 연출: 소환 마법진, 등급별 오라·후광, 보스 등장 배너
//  ※ main.js 뒤에 로드 (전역 함수/프로토타입을 감싸서 연결)
// ==========================================================================
const STAGEHQ = (() => {
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const hasFx = () => typeof FXHQ !== 'undefined' && !!FXHQ._add;
  const detail = () => (typeof POLISH !== 'undefined' && POLISH.detail) || 1;
  const GM = () => (typeof getToonGradientMap === 'function' ? getToonGradientMap() : null);

  // ------------------------------------------------------------------
  // 1) 난이도 곡선
  // ------------------------------------------------------------------
  const hpMul = n => 1 + 0.045 * (n - 1) + 0.004 * (n - 1) * (n - 1);   // 일반 몬스터 체력 (15단계 ×2.4, 20단계 ×3.3)
  const atkMul = n => 1 + 0.035 * (n - 1) + 0.002 * (n - 1) * (n - 1);  // 일반 몬스터 공격력 (15단계 ×1.9, 20단계 ×2.4)
  const recLv = n => Math.max(1, Math.ceil(n * 1.1));
  const power = lv => 1 + 0.2 * (lv - 1);                               // 해당 단계 권장 레벨의 대략적인 화력
  // 보스 패턴 데미지 배율: 15단계 = 레이드 아노코(1.8 × 1.55)와 같음
  const dmgScale = n => 2.79 * Math.pow(n / 15, 1.15);
  function bossHp(n, kind) {
    const secs = kind === 'main' ? 20 + 4 * n : 10 + 1.6 * n;      // 혼자 기준 대략적인 처치 시간(초)
    const ramp = Math.min(1, 0.45 + n * 0.04);                      // 초반 단계는 부드럽게
    return Math.round(350 * secs * power(recLv(n)) * ramp);
  }
  const tierOf = n => (n >= 20 ? 4 : n >= 15 ? 3 : n >= 10 ? 2 : n >= 5 ? 1 : 0);

  function tune() {
    if (typeof STAGE_CAMPAIGN_DATA === 'undefined' || tune.done) return;
    tune.done = true;
    STAGE_CAMPAIGN_DATA.forEach(st => {
      const n = st.stageNum;
      const isMain = n % 5 === 0;
      st.recLv = Math.max(1, Math.ceil(n * 1.2));
      st.sectors.forEach(sec => sec.waves.forEach(wave => wave.forEach(def => {
        if (def.isBoss) {
          const kind = isMain ? 'main' : 'gate';
          def.hp = bossHp(n, kind);
          def.atk = Math.round(def.atk * atkMul(n));
          def.stageBoss = { n, kind, tier: tierOf(n) };
          def.coin = Math.round(def.coin * (1 + n * 0.05));
          def.exp = Math.round(def.exp * (1 + n * 0.05));
        } else {
          def.hp = Math.round(def.hp * hpMul(n));
          def.atk = Math.round(def.atk * atkMul(n));
          def.spdMul = 1 + Math.min(0.35, n * 0.018);          // 20단계: 이동 +35%
          def.cdMul = Math.max(0.7, 1 - n * 0.015);            // 20단계: 공격 간격 -30%
        }
      })));
      // 보상도 난이도에 맞춰 상향
      st.rewardCoin = Math.round(st.rewardCoin * (1 + n * 0.04));
      st.rewardExp = Math.round(st.rewardExp * (1 + n * 0.04));
    });
  }

  // ------------------------------------------------------------------
  // 2) 테마 (단계 구간별 맵 분위기)
  // ------------------------------------------------------------------
  const THEMES = [
    { name: '들판 가도', stoneA: 0xb9a888, stoneB: 0x9c8b6c, road: 0xd6c39a, trim: 0xf5c542, glow: 0xffd166, crack: 0.0, wall: 0xcbb994, banner: 0x16a34a,
      fire: [1.0, 0.55, 0.12], skyTop: 0x60a5fa, skyBot: 0xfde68a, outer: 0x7a8f4e, spire: 0x8a7a5c, fog: 0xe8dcc0, fogD: 0.0026, part: 0xfef08a, stars: 0 },
    { name: '붉은 협곡', stoneA: 0xa8664a, stoneB: 0x8a4e36, road: 0xc98a62, trim: 0xffb04a, glow: 0xff7a1a, crack: 0.15, wall: 0xb26a48, banner: 0xb91c1c,
      fire: [1.0, 0.45, 0.08], skyTop: 0xf97316, skyBot: 0xfed7aa, outer: 0x7c3f22, spire: 0x9a4a2a, fog: 0xf3b98a, fogD: 0.003, part: 0xffa94d, stars: 0 },
    { name: '고대 유적', stoneA: 0x7f8a7a, stoneB: 0x5f6b5c, road: 0x9aa595, trim: 0x5eead4, glow: 0x22d3ee, crack: 0.2, wall: 0x8c978a, banner: 0x0f766e,
      fire: [0.25, 0.85, 1.0], skyTop: 0x1e3a8a, skyBot: 0x5eead4, outer: 0x3f4f3a, spire: 0x5b6758, fog: 0x7fb6b4, fogD: 0.0034, part: 0x67e8f9, stars: 0.5 },
    { name: '심연', stoneA: 0x3a3048, stoneB: 0x281f35, road: 0x4a3d5c, trim: 0xc084fc, glow: 0xa855f7, crack: 0.6, wall: 0x4b3d5e, banner: 0x6b21a8,
      fire: [0.75, 0.35, 1.0], skyTop: 0x0b0420, skyBot: 0x4c1d95, outer: 0x1c1326, spire: 0x2e2340, fog: 0x3b2160, fogD: 0.0042, part: 0xd8b4fe, stars: 1 },
    { name: '태고의 결전장', stoneA: 0x2b2222, stoneB: 0x1a1414, road: 0x3a2a28, trim: 0xff6b4a, glow: 0xef4444, crack: 0.9, wall: 0x3a2b2b, banner: 0x991b1b,
      fire: [1.0, 0.2, 0.08], skyTop: 0x1a0003, skyBot: 0x7f1d1d, outer: 0x1a0d0b, spire: 0x2a1a18, fog: 0x4a1410, fogD: 0.0045, part: 0xff7a5a, stars: 0.6 }
  ];
  const col3 = hex => new THREE.Color(hex);

  // ------------------------------------------------------------------
  // 3) 전투 맵 (createBattleColosseumArena3D 대체)
  // ------------------------------------------------------------------
  const NOISE = `
    float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
    float fbm(vec2 p){ return vn(p) * 0.55 + vn(p * 2.1 + 3.7) * 0.3 + vn(p * 4.3 + 1.3) * 0.15; }`;
  const FLOOR_VS = `varying vec2 vP; varying vec3 vW;
    void main(){ vP = position.xz; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;
  const FLOOR_FS = `
    uniform float uT; uniform vec3 uStoneA; uniform vec3 uStoneB; uniform vec3 uRoad; uniform vec3 uTrim; uniform vec3 uGlow; uniform float uCrack;
    uniform vec3 uFogColor; uniform float uFogDensity;
    varying vec2 vP; varying vec3 vW;
    ${NOISE}
    float ring(float d, float r, float w){ return smoothstep(w, 0.0, abs(d - r)); }
    void main(){
      vec2 p = vP;
      float corridor = step(-176.0, p.y);
      float halfW = mix(25.0, 17.4, corridor);
      // 돌 타일
      vec2 tile = p / vec2(2.6, 2.6);
      tile.x += step(1.0, mod(floor(tile.y), 2.0)) * 0.5;
      vec2 id = floor(tile); vec2 f = fract(tile);
      float rnd = h21(id);
      float big = fbm(p * 0.08);
      vec3 col = mix(uStoneA, uStoneB, clamp(rnd * 0.7 + big * 0.5, 0.0, 1.0));
      col *= 0.9 + fbm(p * 1.7) * 0.2;
      float mortar = smoothstep(0.07, 0.0, min(min(f.x, 1.0 - f.x), min(f.y, 1.0 - f.y)));
      col = mix(col, col * 0.45, mortar);
      // 중앙 진격로 (큰 석판 + 금장 테두리)
      float road = smoothstep(7.7, 7.3, abs(p.x)) * corridor;
      vec2 rt = p / vec2(3.6, 1.8); rt.x += step(1.0, mod(floor(rt.y), 2.0)) * 0.5;
      vec2 rf = fract(rt);
      vec3 roadCol = uRoad * (0.85 + h21(floor(rt)) * 0.25) * (0.92 + fbm(p * 2.3) * 0.16);
      roadCol = mix(roadCol, roadCol * 0.5, smoothstep(0.05, 0.0, min(min(rf.x, 1.0 - rf.x), min(rf.y, 1.0 - rf.y))));
      col = mix(col, roadCol, road);
      float trim = smoothstep(0.22, 0.0, abs(abs(p.x) - 7.85)) * corridor;
      col = mix(col, uTrim * 0.9, trim * 0.85);
      // 진격 화살표 (새겨진 홈)
      float cz = mod(p.y - 10.0, 11.2) - 5.6;
      float arrow = smoothstep(0.35, 0.0, abs(cz + abs(p.x) * 0.55 - 0.6)) * step(abs(p.x), 2.6) * road;
      col = mix(col, uTrim, arrow * 0.45);
      // 구역 마법진
      float sec = 0.0;
      float d0 = length(p - vec2(0.0, -18.0)); sec += ring(d0, 10.9, 0.18) + ring(d0, 10.2, 0.08) * 0.6;
      float d1 = length(p - vec2(0.0, -62.0)); sec += ring(d1, 10.9, 0.18) + ring(d1, 10.2, 0.08) * 0.6;
      float d2 = length(p - vec2(0.0, -108.0)); sec += ring(d2, 10.9, 0.18) + ring(d2, 10.2, 0.08) * 0.6;
      float d3 = length(p - vec2(0.0, -154.0)); sec += ring(d3, 10.9, 0.18) + ring(d3, 10.2, 0.08) * 0.6;
      // 보스 성소 (큰 룬 원)
      vec2 bp = p - vec2(0.0, -202.0);
      float bd = length(bp);
      float ba = atan(bp.y, bp.x);
      float sanct = ring(bd, 19.0, 0.25) + ring(bd, 17.6, 0.1) + ring(bd, 8.0, 0.15) * 0.8;
      sanct += smoothstep(0.12, 0.0, abs(bd * cos(mod(ba + uT * 0.05, 1.2566) - 0.6283) - 12.0)) * step(bd, 17.6);
      sanct += step(0.5, fract(ba * 3.8197 + uT * 0.2)) * step(17.8, bd) * step(bd, 18.8) * 0.6;
      float pulse = 0.75 + 0.25 * sin(uT * 1.6);
      col += uGlow * (sec * 0.55 + sanct * 0.9) * pulse;
      // 균열 (심연·태고: 용암/마력)
      float cr = fbm(p * 0.22 + vec2(3.1, 7.7));
      float crack = smoothstep(0.022, 0.0, abs(cr - 0.5)) * (1.0 - road * 0.85) * smoothstep(0.42, 0.62, fbm(p * 0.045 + 11.0));
      col += uGlow * crack * uCrack * (0.8 + 0.4 * fbm(p * 0.5 + uT * 0.12));
      // 벽 근처 음영
      col *= 1.0 - smoothstep(halfW - 3.5, halfW + 0.2, abs(p.x)) * 0.45;
      float fogF = 1.0 - exp(-uFogDensity * uFogDensity * dot(vW - cameraPosition, vW - cameraPosition));
      col = mix(col, uFogColor, clamp(fogF, 0.0, 1.0));
      gl_FragColor = vec4(col, 1.0);
    }`;
  const FIRE_FS = `uniform float uT; uniform vec3 uC; varying vec2 vUv;
    float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
    float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f); return mix(mix(h(i),h(i+vec2(1,0)),u.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x), u.y); }
    void main(){ vec2 p = vUv; float f = n(vec2(p.x * 6.0, p.y * 4.0 - uT * 4.5)) * 0.6 + n(vec2(p.x * 12.0, p.y * 8.0 - uT * 7.0)) * 0.4;
      float shape = smoothstep(0.5, 0.0, abs(p.x - 0.5) * (1.6 + p.y * 1.8)) * smoothstep(1.0, 0.15, p.y + f * 0.35);
      vec3 col = mix(uC, vec3(1.0, 0.95, 0.7), smoothstep(0.35, 0.9, shape));
      gl_FragColor = vec4(col * shape, shape); }`;
  const SKY_FS = `uniform vec3 uTop; uniform vec3 uBot; uniform float uStars; uniform float uT; varying vec3 vD;
    float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
    void main(){ vec3 d = normalize(vD); float k = clamp(d.y * 1.6 + 0.15, 0.0, 1.0);
      vec3 col = mix(uBot, uTop, pow(k, 0.8));
      vec3 sp = floor(d * 260.0); float s = step(0.9975, h(sp)) * smoothstep(0.1, 0.5, d.y) * uStars * (0.6 + 0.4 * sin(uT * 2.0 + h(sp) * 30.0));
      gl_FragColor = vec4(col + vec3(s), 1.0); }`;

  function canvasTex(draw, size = 256) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    draw(c.getContext('2d'), size);
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.anisotropy = 4;
    return t;
  }
  let brickTex = null, bannerTex = null, hexTex = null;
  function textures() {
    if (brickTex) return;
    brickTex = canvasTex((ctx, s) => {
      ctx.fillStyle = '#6b6b6b'; ctx.fillRect(0, 0, s, s);
      const rows = 6, cols = 3;
      for (let r = 0; r < rows; r++) for (let c = -1; c <= cols; c++) {
        const x = (c + (r % 2) * 0.5) * (s / cols) + 3, y = r * (s / rows) + 3;
        const g = 0.78 + Math.random() * 0.3;
        ctx.fillStyle = `rgb(${Math.round(235 * g)},${Math.round(232 * g)},${Math.round(226 * g)})`;
        ctx.fillRect(x, y, s / cols - 6, s / rows - 6);
        ctx.fillStyle = 'rgba(0,0,0,0.08)';
        for (let k = 0; k < 14; k++) ctx.fillRect(x + Math.random() * (s / cols - 10), y + Math.random() * (s / rows - 10), 4, 3);
      }
    });
    bannerTex = canvasTex((ctx, s) => {
      ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, s, s);
      ctx.fillStyle = 'rgba(0,0,0,0.18)'; ctx.fillRect(0, 0, s * 0.08, s); ctx.fillRect(s * 0.92, 0, s * 0.08, s);
      ctx.fillStyle = '#fde68a';
      ctx.fillRect(0, s * 0.06, s, s * 0.05);
      // 문양: 검 두 자루 + 별
      ctx.save(); ctx.translate(s / 2, s * 0.45);
      ctx.strokeStyle = '#fde68a'; ctx.lineWidth = s * 0.05; ctx.lineCap = 'round';
      [-1, 1].forEach(d => { ctx.beginPath(); ctx.moveTo(-d * s * 0.2, s * 0.22); ctx.lineTo(d * s * 0.2, -s * 0.22); ctx.stroke(); });
      ctx.fillStyle = '#fde68a'; ctx.beginPath();
      for (let i = 0; i < 10; i++) { const a = (i / 10) * Math.PI * 2 - Math.PI / 2, r = i % 2 ? s * 0.05 : s * 0.11; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r - s * 0.3); }
      ctx.fill(); ctx.restore();
      // 아래 톱니
      ctx.fillStyle = 'rgba(0,0,0,0)';
    }, 128);
    hexTex = canvasTex((ctx, s) => {
      ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fillRect(0, 0, s, s);
      ctx.strokeStyle = 'rgba(255,255,255,0.95)'; ctx.lineWidth = 3;
      const r = s / 8;
      for (let y = -1; y < 6; y++) for (let x = -1; x < 6; x++) {
        const cx = x * r * 1.75 + (y % 2) * r * 0.87, cy = y * r * 1.5;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) { const a = (i / 6) * Math.PI * 2 + Math.PI / 6; ctx.lineTo(cx + Math.cos(a) * r * 0.95, cy + Math.sin(a) * r * 0.95); }
        ctx.closePath(); ctx.stroke();
      }
    }, 256);
  }

  let A = null; // 현재 전투 맵 핸들
  function buildArena() {
    textures();
    const group = new THREE.Group();
    const mats = { fire: [], uT: [] };
    // ---- 바닥
    const floorMat = new THREE.ShaderMaterial({
      uniforms: {
        uT: { value: 0 }, uStoneA: { value: col3(0) }, uStoneB: { value: col3(0) }, uRoad: { value: col3(0) }, uTrim: { value: col3(0) },
        uGlow: { value: col3(0) }, uCrack: { value: 0 }, uFogColor: { value: col3(0xcfe4f7) }, uFogDensity: { value: 0.0021 }
      },
      vertexShader: FLOOR_VS, fragmentShader: FLOOR_FS
    });
    const fg = new THREE.PlaneGeometry(56, 264, 1, 1);
    fg.rotateX(-Math.PI / 2);
    fg.translate(0, 0.06, -109);
    const floor = new THREE.Mesh(fg, floorMat);
    floor.receiveShadow = true;
    group.add(floor);
    // ---- 바깥 지형 (풀밭을 가리는 테마 대지) + 바위 첨탑
    const outerMat = new THREE.MeshToonMaterial({ color: 0x555555, gradientMap: GM() });
    const og = new THREE.CircleGeometry(250, 48);
    og.rotateX(-Math.PI / 2);
    const outer = new THREE.Mesh(og, outerMat);
    outer.position.set(0, 0.03, -110);
    outer.receiveShadow = true;
    group.add(outer);
    const spireMat = new THREE.MeshToonMaterial({ color: 0x777777, gradientMap: GM() });
    const spireGeo = new THREE.ConeGeometry(1, 1, 6);
    spireGeo.translate(0, 0.5, 0);
    const NS = 60;
    const spires = new THREE.InstancedMesh(spireGeo, spireMat, NS);
    const dm = new THREE.Object3D();
    for (let i = 0; i < NS; i++) {
      const side = i % 2 ? 1 : -1;
      const z = 40 - (i / NS) * 320 + (Math.random() - 0.5) * 8;
      const x = side * (58 + Math.random() * 70);
      dm.position.set(x, -0.5, z);
      dm.rotation.set((Math.random() - 0.5) * 0.25, Math.random() * 6, (Math.random() - 0.5) * 0.25);
      dm.scale.set(4 + Math.random() * 7, 26 + Math.random() * 40, 4 + Math.random() * 7);
      dm.updateMatrix();
      spires.setMatrixAt(i, dm.matrix);
    }
    group.add(spires);
    // 바깥 세상을 가리는 절벽 띠 (진격로 양옆 · 앞뒤)
    const cliffSpots = [];
    for (let z = 46; z > -268; z -= 6.5) [-1, 1].forEach(sd => cliffSpots.push([sd * (33 + Math.random() * 10), z]));
    for (let x = -44; x <= 44; x += 7) { cliffSpots.push([x, -262 - Math.random() * 6]); cliffSpots.push([x, 50 + Math.random() * 6]); }
    const cliffGeo = new THREE.DodecahedronGeometry(1, 0);
    const cliffs = new THREE.InstancedMesh(cliffGeo, spireMat, cliffSpots.length);
    cliffSpots.forEach(([x, z], i) => {
      dm.position.set(x, 2 + Math.random() * 4, z);
      dm.rotation.set(Math.random() * 3, Math.random() * 6, Math.random() * 3);
      dm.scale.set(6 + Math.random() * 5, 14 + Math.random() * 16, 6 + Math.random() * 5);
      dm.updateMatrix();
      cliffs.setMatrixAt(i, dm.matrix);
    });
    group.add(cliffs);
    // ---- 하늘 돔
    const skyMat = new THREE.ShaderMaterial({
      uniforms: { uTop: { value: col3(0) }, uBot: { value: col3(0) }, uStars: { value: 0 }, uT: { value: 0 } },
      vertexShader: `varying vec3 vD; void main(){ vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: SKY_FS, side: THREE.BackSide, depthWrite: true, fog: false
    });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(330, 32, 16), skyMat);
    sky.position.set(0, -20, -110);
    sky.renderOrder = -10;
    group.add(sky);

    // ---- 성벽 (진격로 x=±17.4 / 성소 x=±25, 뒤 벽 z=-232)
    const wallMat = new THREE.MeshToonMaterial({ color: 0xaaaaaa, gradientMap: GM(), map: brickTex });
    const capMat = new THREE.MeshToonMaterial({ color: 0x888888, gradientMap: GM() });
    const segs = [
      // [x1, z1, x2, z2]
      [-17.4, 24, -17.4, -176], [17.4, 24, 17.4, -176],
      [-17.4, -176, -25, -176], [17.4, -176, 25, -176],
      [-25, -176, -25, -232], [25, -176, 25, -232],
      [-25, -232, 25, -232]
    ];
    const merlonGeo = new THREE.BoxGeometry(1.1, 0.9, 1.9);
    const merlonList = [];
    segs.forEach(([x1, z1, x2, z2]) => {
      const len = Math.hypot(x2 - x1, z2 - z1);
      const ang = Math.atan2(x2 - x1, z2 - z1);
      const cx = (x1 + x2) / 2, cz = (z1 + z2) / 2;
      const nx = Math.sign(cx) * (Math.abs(x1 - x2) < 0.1 ? 1 : 0), nz = Math.abs(z1 - z2) < 0.1 ? (z1 > -200 ? 1 : -1) : 0; // 바깥쪽 방향
      const ox = nx * 0.8, oz = nz * 0.8;
      const tex = brickTex.clone(); tex.needsUpdate = true; tex.repeat.set(len / 6, 1);
      const wm = wallMat.clone(); wm.map = tex;
      mats.walls = mats.walls || []; mats.walls.push(wm);
      const wall = new THREE.Mesh(new THREE.BoxGeometry(1.6, 4.2, len + 1.6), wm);
      wall.position.set(cx + ox, 2.1, cz + oz);
      wall.rotation.y = ang;
      wall.castShadow = true; wall.receiveShadow = true;
      if (typeof addCartoonOutline === 'function') addCartoonOutline(wall, 0.02);
      group.add(wall);
      const cap = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.35, len + 2.2), capMat);
      cap.position.set(cx + ox, 4.35, cz + oz);
      cap.rotation.y = ang;
      group.add(cap);
      const n = Math.floor(len / 2.4);
      for (let i = 0; i <= n; i++) {
        const k = i / Math.max(1, n);
        merlonList.push([x1 + (x2 - x1) * k + ox + nx * 0.25, z1 + (z2 - z1) * k + oz + nz * 0.25, ang]);
      }
    });
    const merlons = new THREE.InstancedMesh(merlonGeo, capMat, merlonList.length);
    merlonList.forEach(([x, z, a], i) => { dm.position.set(x, 4.95, z); dm.rotation.set(0, a, 0); dm.scale.set(1, 1, 1); dm.updateMatrix(); merlons.setMatrixAt(i, dm.matrix); });
    merlons.castShadow = true;
    group.add(merlons);

    // ---- 망루 + 화로 + 깃발
    const towerPos = [];
    for (let i = 0; i < 14; i++) { const z = 16 - i * 13.5; if (z > -172) { towerPos.push([-18.2, z, 1]); towerPos.push([18.2, z, -1]); } }
    [[-25.8, -184], [25.8, -184], [-25.8, -206], [25.8, -206], [-25.8, -228], [25.8, -228], [-12, -232.8], [12, -232.8]].forEach(([x, z]) => towerPos.push([x, z, x < 0 ? 1 : x > 0 ? -1 : 0]));
    const towerGeo = new THREE.CylinderGeometry(1.25, 1.55, 7.5, 8);
    towerGeo.translate(0, 3.75, 0);
    const towerMat = wallMat.clone();
    const tt = brickTex.clone(); tt.needsUpdate = true; tt.repeat.set(1.5, 1.6); towerMat.map = tt;
    mats.walls.push(towerMat);
    const towers = new THREE.InstancedMesh(towerGeo, towerMat, towerPos.length);
    const bowlGeo = new THREE.LatheGeometry([[0, 0], [0.5, 0], [1.1, 0.5], [1.3, 0.9], [1.15, 0.95], [0.9, 0.6], [0, 0.6]].map(p => new THREE.Vector2(p[0], p[1])), 12);
    const bowlMat = new THREE.MeshToonMaterial({ color: 0x3b3550, gradientMap: GM() });
    const bowls = new THREE.InstancedMesh(bowlGeo, bowlMat, towerPos.length);
    const fireMat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uC: { value: new THREE.Vector3(1, 0.5, 0.1) } },
      vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: FIRE_FS, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    });
    const bannerMat = new THREE.MeshToonMaterial({ color: 0x16a34a, gradientMap: GM(), map: bannerTex, side: THREE.DoubleSide });
    const glowMats = [];
    towerPos.forEach(([x, z, inward], i) => {
      dm.position.set(x, 0, z); dm.rotation.set(0, 0, 0); dm.scale.set(1, 1, 1); dm.updateMatrix();
      towers.setMatrixAt(i, dm.matrix);
      dm.position.set(x, 7.5, z); dm.updateMatrix();
      bowls.setMatrixAt(i, dm.matrix);
      [0, Math.PI / 2].forEach(r => {
        const pl = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 3.0), fireMat);
        pl.position.set(x, 9.4, z);
        pl.rotation.y = r;
        group.add(pl);
      });
      if (typeof fxTex === 'function') {
        const gm = new THREE.SpriteMaterial({ map: fxTex('glow'), color: 0xffa040, transparent: true, opacity: 0.55, blending: THREE.AdditiveBlending, depthWrite: false });
        glowMats.push(gm);
        const sp = new THREE.Sprite(gm);
        sp.scale.setScalar(6.5);
        sp.position.set(x, 9.2, z);
        group.add(sp);
      }
      if (inward && i % 2 === 0 || (inward && z < -176)) {
        const ban = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 4.4, 1, 6), bannerMat);
        ban.position.set(x + inward * 1.62, 4.5, z);
        ban.rotation.y = inward * Math.PI / 2;
        ban.userData.sway = Math.random() * 6;
        group.add(ban);
        (mats.banners = mats.banners || []).push(ban);
      }
    });
    towers.castShadow = true;
    group.add(towers, bowls);
    mats.fire.push(fireMat);

    // ---- 구역 관문 아치 (돌 기둥 + 상인방 + 룬 문장)
    const gateMat = wallMat.clone();
    const gt = brickTex.clone(); gt.needsUpdate = true; gt.repeat.set(0.6, 3); gateMat.map = gt;
    const lintelMat = wallMat.clone();
    const lt = brickTex.clone(); lt.needsUpdate = true; lt.repeat.set(7, 0.5); lintelMat.map = lt;
    mats.walls.push(gateMat, lintelMat);
    const runeMat = new THREE.MeshBasicMaterial({ map: typeof fxTex === 'function' ? fxTex('rune') : null, color: 0xffd166, transparent: true, opacity: 0.9, blending: THREE.AdditiveBlending, depthWrite: false });
    [-18, -62, -108, -154].forEach(sz => {
      const az = sz - 18;
      [-1, 1].forEach(s => {
        const p = new THREE.Mesh(new THREE.BoxGeometry(2.6, 13, 2.6), gateMat);
        p.position.set(s * 18.4, 6.5, az);
        p.castShadow = true;
        if (typeof addCartoonOutline === 'function') addCartoonOutline(p, 0.02);
        group.add(p);
        const cap = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.8, 3.4), capMat);
        cap.position.set(s * 18.4, 13.3, az);
        group.add(cap);
      });
      const lintel = new THREE.Mesh(new THREE.BoxGeometry(40, 2.0, 2.8), lintelMat);
      lintel.position.set(0, 14.4, az);
      if (typeof addCartoonOutline === 'function') addCartoonOutline(lintel, 0.02);
      group.add(lintel);
      const key = new THREE.Mesh(new THREE.BoxGeometry(3.2, 3.2, 3.0), capMat);
      key.position.set(0, 14.6, az);
      key.rotation.z = Math.PI / 4;
      group.add(key);
      const rune = new THREE.Mesh(new THREE.CircleGeometry(1.6, 24), runeMat);
      rune.position.set(0, 14.6, az + 1.55);
      group.add(rune);
      const rune2 = rune.clone();
      rune2.position.z = az - 1.55;
      rune2.rotation.y = Math.PI;
      group.add(rune2);
    });
    // ---- 성소 오벨리스크 + 수정
    const crystals = [];
    const obMat = new THREE.MeshToonMaterial({ color: 0x3b3550, gradientMap: GM() });
    const crMat = new THREE.MeshBasicMaterial({ color: 0xffd166 });
    [[-24.2, -184], [24.2, -184], [-24.2, -203], [24.2, -203], [-24.2, -222], [24.2, -222], [-9, -231], [9, -231]].forEach(([x, z], i) => {
      const ob = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.9, 6.5, 4), obMat);
      ob.position.set(x, 3.25, z);
      ob.rotation.y = Math.PI / 4;
      ob.castShadow = true;
      if (typeof addCartoonOutline === 'function') addCartoonOutline(ob, 0.04);
      group.add(ob);
      const cr = new THREE.Mesh(new THREE.OctahedronGeometry(0.7, 0), crMat);
      cr.position.set(x, 7.6, z);
      cr.scale.y = 1.6;
      group.add(cr);
      let gl = null;
      if (typeof fxTex === 'function') {
        gl = new THREE.Sprite(new THREE.SpriteMaterial({ map: fxTex('glow'), color: 0xffd166, transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending, depthWrite: false }));
        gl.scale.setScalar(4);
        gl.position.copy(cr.position);
        group.add(gl);
      }
      crystals.push({ cr, gl, i, base: 7.6 });
    });

    // ---- 분위기 입자 (진격로 위로 천천히 떠오름)
    const NP = 420;
    const pos = new Float32Array(NP * 3), seed = new Float32Array(NP);
    for (let i = 0; i < NP; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 48;
      pos[i * 3 + 1] = Math.random() * 14;
      pos[i * 3 + 2] = 20 - Math.random() * 252;
      seed[i] = Math.random();
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pg.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
    const partMat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uC: { value: col3(0xffffff) } },
      vertexShader: `attribute float seed; uniform float uT; varying float vA;
        void main(){ vec3 p = position; float t = fract(uT * (0.04 + seed * 0.05) + seed);
          p.y = mod(p.y + t * 16.0, 16.0); p.x += sin(uT * 0.6 + seed * 20.0) * 1.2;
          vA = smoothstep(0.0, 2.0, p.y) * smoothstep(16.0, 11.0, p.y) * (0.5 + 0.5 * sin(uT * 3.0 + seed * 40.0));
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_PointSize = (2.0 + seed * 3.0) * (60.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform vec3 uC; varying float vA; void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; gl_FragColor = vec4(uC * 1.5, smoothstep(0.5, 0.0, d) * vA); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const parts = new THREE.Points(pg, partMat);
    parts.frustumCulled = false;
    group.add(parts);

    // ---- 구역 결계 (육각 에너지 벽, main.js가 색·투명도·위치를 조절)
    const barrierGroup = new THREE.Group();
    const hx = hexTex.clone(); hx.needsUpdate = true; hx.repeat.set(10, 2);
    const barrierMat = new THREE.MeshBasicMaterial({ color: 0xef4444, map: hx, side: THREE.DoubleSide, transparent: true, opacity: 0.4, depthWrite: false, blending: THREE.AdditiveBlending });
    const barrierWall = new THREE.Mesh(new THREE.PlaneGeometry(52, 9), barrierMat);
    barrierWall.position.y = 4.5;
    barrierGroup.add(barrierWall);
    const topLine = new THREE.Mesh(new THREE.BoxGeometry(52, 0.3, 0.3), new THREE.MeshBasicMaterial({ color: 0xfacc15 }));
    topLine.position.y = 9;
    barrierGroup.add(topLine);
    barrierGroup.position.set(0, 0, -36);
    group.add(barrierGroup);
    group.userData.sectorBarrier = barrierGroup;
    group.userData.barrierMat = barrierMat;

    A = { group, floorMat, outerMat, spireMat, skyMat, wallMats: mats.walls, capMat, bowlMat, fireMat, glowMats, bannerMat, banners: mats.banners || [],
      runeMat, crystals, crMat, obMat, partMat, barrierTex: hx, theme: -1 };
    group.userData.stageHQ = true;
    applyTheme(0);
    return group;
  }

  let curTheme = 0;
  function applyTheme(ti) {
    curTheme = ti;
    if (!A) return;
    const T = THEMES[ti];
    A.theme = ti;
    const u = A.floorMat.uniforms;
    u.uStoneA.value.setHex(T.stoneA); u.uStoneB.value.setHex(T.stoneB); u.uRoad.value.setHex(T.road);
    u.uTrim.value.setHex(T.trim); u.uGlow.value.setHex(T.glow); u.uCrack.value = T.crack;
    A.outerMat.color.setHex(T.outer);
    A.spireMat.color.setHex(T.spire);
    A.skyMat.uniforms.uTop.value.setHex(T.skyTop); A.skyMat.uniforms.uBot.value.setHex(T.skyBot); A.skyMat.uniforms.uStars.value = T.stars;
    A.wallMats.forEach(m => m.color.setHex(T.wall));
    A.capMat.color.setHex(new THREE.Color(T.wall).multiplyScalar(0.8).getHex());
    A.fireMat.uniforms.uC.value.set(T.fire[0], T.fire[1], T.fire[2]);
    A.glowMats.forEach(m => m.color.setRGB(T.fire[0], T.fire[1] * 0.9 + 0.1, T.fire[2] + 0.1));
    A.bannerMat.color.setHex(T.banner);
    A.runeMat.color.setHex(T.trim);
    A.crMat.color.setHex(T.glow);
    A.crystals.forEach(c => c.gl && c.gl.material.color.setHex(T.glow));
    A.partMat.uniforms.uC.value.setHex(T.part);
  }

  // ------------------------------------------------------------------
  // 4) 보스 패턴 AI (혼자 / 파티 방장만 계산 → 파티원에게 장판 전송)
  // ------------------------------------------------------------------
  const SANCT = { xMax: 21, zMin: -226, zMax: -178 }; // 성소 로컬 범위
  function tele(g, m, p, x, z, yaw, r, dur, d) {
    m._teleDur = dur;
    g.spawnMonsterAttackTelegraph(m, p, V(x, 0, z), yaw || 0, r, Math.round(d));
    m._teleDur = 0;
    const tg = g.telegraphs[g.telegraphs.length - 1];
    if (tg && tg.monster === m) tg.duration = dur;
    m.windupT = dur; m.windupMax = dur;
    m.isWindingUp = false;
  }
  function targetsOf(g) {
    const list = [{ pos: g.playerPos, downed: !!g.isDowned }];
    if (g.partyRole === 'host' && window.coop && window.coop.remotes) {
      window.coop.remotes.forEach(r => { if (r.area === 'party' && r.hasPos) list.push({ pos: r.target || r.mesh.position, downed: !!r.downed }); });
    }
    return list.filter(p => !p.downed);
  }
  function bossBanner(title, sub, color) {
    if (window.coop && window.coop.showRaidBanner) window.coop.showRaidBanner(title, sub, color, 2600);
    else if (typeof showToast === 'function') showToast(`${title} ${sub}`);
  }

  function updateBoss(g, m, dt, idx) {
    if (!m.alive) return false;
    const B = m.stageBoss;
    const ac = g.arenaCenter;
    const t = g.clock.elapsedTime;
    if (m.mesh.userData.updateMonsterMotion) m.mesh.userData.updateMonsterMotion(t, true, 0, m.facingYaw);
    m.mesh.rotation.y = g.camYaw;
    if (m.stunTimer > 0) { m.stunTimer = Math.max(0, m.stunTimer - dt); m.mesh.position.set(m.pos.x, 0, m.pos.z); return true; }
    if (m.slowTimer > 0) m.slowTimer = Math.max(0, m.slowTimer - dt);
    if (m.statusEl) m.statusEl.textContent = m.enraged ? '🔥광폭화' : m.phase2 ? '⚡분노' : '';
    if (m.hpFillEl) m.hpFillEl.style.width = `${Math.max(0, (m.hp / m.maxHp) * 100)}%`;
    const tg = targetsOf(g);
    if (!tg.length) { m.mesh.position.set(m.pos.x, 0, m.pos.z); return true; }
    let best = tg[0], bd = Infinity;
    tg.forEach(p => { const d = p.pos.distanceTo(m.pos); if (d < bd) { bd = d; best = p; } });
    // 페이즈
    const ratio = m.hp / m.maxHp;
    if (!m.phase2 && ratio <= (B.kind === 'main' ? 0.6 : 0.5) && B.n >= 3) {
      m.phase2 = true;
      if (B.kind === 'main') bossBanner('⚡ 보스 분노!', '공격이 더 빠르고 거세져요!', '#f97316');
    }
    if (!m.enraged && B.n >= 20 && ratio <= 0.3) {
      m.enraged = true;
      m.aiCd = 2.4;
      bossBanner('🔥 태고의 대괴수 광폭화!!', '모든 공격이 연계되고 메테오가 쏟아져요!', '#b0000f');
    }
    const ph = m.enraged ? 3 : m.phase2 ? 2 : 1;
    // 이동
    if (m.dash) {
      if (m.dash.wait > 0) m.dash.wait -= dt;
      else { m.pos.lerp(m.dash.to, 1 - Math.exp(-dt * 14)); m.dash.go -= dt; if (m.dash.go <= 0) m.dash = null; }
    } else {
      const dir = best.pos.clone().sub(m.pos).setY(0);
      const dist = dir.length();
      if (dist > 0.1) m.facingYaw += g.angleDifference(Math.atan2(dir.x, dir.z), m.facingYaw) * Math.min(1, dt * 4);
      const keep = (m.bodyRadius || 3) + (B.kind === 'main' ? 4.5 : 3);
      if (dist > keep && (m.aiCd || 0) > 0.5) {
        const spd = (B.kind === 'main' ? 6.2 : 6.8) * (ph === 3 ? 1.4 : ph === 2 ? 1.18 : 1) * (m.slowTimer > 0 ? 0.5 : 1);
        m.pos.addScaledVector(dir.normalize(), dt * spd);
      }
    }
    // 성소 밖으로 나가지 않게
    const lx = m.pos.x - ac.x, lz = m.pos.z - ac.z;
    m.pos.x = ac.x + Math.max(-SANCT.xMax, Math.min(SANCT.xMax, lx));
    m.pos.z = ac.z + Math.max(SANCT.zMin, Math.min(SANCT.zMax, lz));
    const bs = m.baseScale || 1;
    m.mesh.scale.lerp(V(bs, bs, bs), Math.min(1, dt * 9));
    const bob = Math.abs(Math.sin(t * (ph === 3 ? 3.4 : 2.4))) * 0.18;
    m.mesh.position.set(m.pos.x, bob, m.pos.z);
    // 공격
    if (m.aiCd === undefined) m.aiCd = 2.2;
    m.aiCd -= dt;
    if (m.aiCd <= 0) {
      const tier = B.kind === 'main' ? Math.min(4, Math.floor(B.n / 5)) : 0; // 1:5단계, 2:10, 3:15, 4:20
      const base = B.kind === 'main' ? [2.2, 2.0, 1.85, 1.75][Math.max(0, tier - 1)] : (B.n >= 11 ? 2.0 : 2.4);
      m.aiCd = base * (ph === 3 ? 0.6 : ph === 2 ? 0.78 : 1);
      bossAttack(g, m, best, tg, ph, tier);
    }
    return true;
  }

  function bossAttack(g, m, target, alive, ph, tier) {
    const B = m.stageBoss;
    const ac = g.arenaCenter;
    const mx = m.pos.x, mz = m.pos.z;
    const toT = target.pos.clone().sub(m.pos).setY(0);
    const yawT = Math.atan2(toT.x, toT.z);
    const k = dmgScale(B.n) * (B.kind === 'main' ? 1 : 0.8) * (ph === 3 ? 1.5 : ph === 2 ? 1.25 : 1);
    const D = v => v * k;
    const T = (p, x, z, yaw, r, dur, d) => tele(g, m, p, x, z, yaw, r, dur, d);
    const big = B.kind === 'main' ? 1 : 0.7;
    const roll = Math.random();
    const slam = () => T('circle', mx, mz, 0, 13 * big, 1.15, D(42));
    const sweep = () => T('sector', mx, mz, yawT, 18 * big, 0.95, D(38));
    const targets = (dur = 1.15) => alive.forEach(p => {
      T('circle', p.pos.x, p.pos.z, 0, 6 * big, dur, D(32));
      if (tier >= 3) {
        const v = p.pos.clone().sub(m.pos).setY(0);
        const ahead = p.pos.clone().add(v.lengthSq() > 1 ? v.normalize().multiplyScalar(7) : V(7, 0, 0));
        T('circle', ahead.x, ahead.z, 0, 5.5, dur + 0.45, D(28));
      }
    });
    const meteors = (n, dmg = 30) => {
      for (let i = 0; i < n; i++) {
        const x = ac.x + (Math.random() * 2 - 1) * 22, z = ac.z - 178 - Math.random() * 48;
        T('circle', x, z, 0, 5.2, 0.95 + i * 0.1, D(dmg));
      }
    };
    const cross = (off = 0) => { for (let i = 0; i < 4; i++) T('line', mx, mz, yawT + off + (i * Math.PI) / 2, 46, 1.1, D(40)); };
    const charge = () => {
      [-0.28, 0, 0.28].forEach(o => T('line', mx, mz, yawT + o, 38, 1.05, D(40)));
      const to = V(mx + Math.sin(yawT) * 26, 0, mz + Math.cos(yawT) * 26);
      m.dash = { wait: 1.05, go: 0.35, to };
    };
    const nova = () => { T('circle', mx, mz, 0, 21, 1.9, D(60)); m.aiCd += 0.6; };

    if (tier === 0) {
      // 수문장: 기본 3패턴
      if (roll < 0.35) T('circle', mx, mz, 0, 8.5, 1.1, D(36));
      else if (roll < 0.7) T('sector', mx, mz, yawT, 11, 0.9, D(32));
      else alive.forEach(p => T('circle', p.pos.x, p.pos.z, 0, 4.8, 1.15, D(28)));
      if (B.n >= 12 && Math.random() < 0.35) meteors(3, 24);
    } else if (tier === 1) {
      if (roll < 0.3) slam(); else if (roll < 0.6) sweep(); else if (roll < 0.85) targets(); else charge();
    } else if (tier === 2) {
      if (ph === 1) { if (roll < 0.25) slam(); else if (roll < 0.5) sweep(); else if (roll < 0.75) targets(); else cross(); }
      else { if (roll < 0.2) charge(); else if (roll < 0.4) { cross(); meteors(3); } else if (roll < 0.6) { targets(); sweep(); } else if (roll < 0.8) meteors(6); else { slam(); cross(Math.PI / 4); } }
    } else {
      // 15·20단계: 레이드 아노코급
      if (ph === 1) {
        if (roll < 0.25) slam(); else if (roll < 0.5) sweep(); else if (roll < 0.72) targets(); else if (roll < 0.88) cross(); else { sweep(); targets(1.4); }
      } else if (ph === 2) {
        if (roll < 0.18) nova(); else if (roll < 0.36) charge(); else if (roll < 0.52) { cross(); meteors(4); } else if (roll < 0.68) { targets(); sweep(); } else if (roll < 0.84) meteors(8); else { slam(); cross(Math.PI / 4); }
      } else {
        if (roll < 0.2) { nova(); meteors(5); } else if (roll < 0.4) { charge(); targets(1.3); } else if (roll < 0.6) { cross(); cross(Math.PI / 4); } else if (roll < 0.8) { meteors(12, 34); sweep(); } else { slam(); targets(); meteors(4); }
      }
    }
  }

  // 보스 공격 임팩트 (테마 색 충격파·파편)
  function impact(g, tg) {
    if (!hasFx() || !tg || !tg.monster || !tg.monster.stageBoss) return;
    const T = THEMES[curTheme];
    const c = tg.center;
    const R = tg.reach || 5;
    const g0 = V(c.x, 0.1, c.z);
    const col = tg.monster.enraged ? 0xff2a2a : T.glow;
    if (tg.patternType === 'circle') {
      FXHQ.shockwave(g0, 0xffffff, R * 1.1);
      FXHQ.shockwave(g0, col, R * 1.45);
      const n = Math.round((R > 10 ? 22 : 10) * detail());
      for (let i = 0; i < n; i++) {
        const a = Math.random() * Math.PI * 2, sp = 6 + Math.random() * (R > 10 ? 20 : 10);
        FXHQ._glow(V(c.x + Math.cos(a) * R * 0.4, 0.6, c.z + Math.sin(a) * R * 0.4), i % 3 ? col : 0xffffff, V(Math.cos(a) * sp, 5 + Math.random() * 9, Math.sin(a) * sp), 0.9 + Math.random() * 0.6, 0.7, 22, Math.random() < 0.4 ? 'star' : 'glow');
      }
      if (R >= 18 && typeof FXHQ.screenFlash === 'function') FXHQ.screenFlash(col, 0.25, 380);
      if (R >= 12) g.camShake = Math.max(g.camShake || 0, 0.5);
    } else if (tg.patternType === 'sector') {
      for (let i = 0; i < 3; i++) FXHQ.slash(g0, tg.yaw || 0, i === 1 ? 0xffffff : col, 3, 0, (i - 1) * 0.35, { radius: R * (0.55 + i * 0.22), span: Math.PI * 0.7, life: 0.42, y: 1.4 + i, noOffset: true, dir: i % 2 ? -1 : 1 });
    } else {
      const fwd = V(Math.sin(tg.yaw || 0), 0, Math.cos(tg.yaw || 0));
      const n = Math.max(4, Math.round(R / 5));
      for (let i = 0; i < n; i++) {
        const p = V(c.x + fwd.x * R * (i + 0.5) / n, 0.2, c.z + fwd.z * R * (i + 0.5) / n);
        FXHQ.shockwave(p, col, 3.2);
      }
    }
  }

  // ------------------------------------------------------------------
  // 5) 몬스터 연출 (소환 마법진 · 등급 오라 · 보스 등장)
  // ------------------------------------------------------------------
  function decorateMonster(g, m) {
    if (m._hq) return;
    m._hq = true;
    const T = THEMES[curTheme];
    const elite = m.isBoss || m.type === 'iron_chimera' || m.type === 'midboss';
    // 소환 연출
    if (hasFx()) {
      const p = V(m.pos.x, 0.12, m.pos.z);
      FXHQ.shockwave(p, m.isBoss ? 0xfacc15 : T.glow, m.isBoss ? 9 : 3.6);
      if (m.isBoss && FXHQ._sprite) {
        for (let i = 0; i < Math.round(14 * detail()); i++) {
          const s = FXHQ._sprite('smoke', 0x1e1b2e, false, 0.7);
          const a = Math.random() * Math.PI * 2;
          s.position.set(p.x + Math.cos(a) * 3, 1 + Math.random() * 5, p.z + Math.sin(a) * 3);
          const v = V(Math.cos(a) * 6, 2 + Math.random() * 3, Math.sin(a) * 6);
          const size = 4 + Math.random() * 4;
          FXHQ._add(s, 1.3, (it, dt, k) => { s.position.addScaledVector(v, dt * (1 - k)); s.scale.setScalar(size * (0.5 + k)); s.material.opacity = 0.7 * (1 - k); });
        }
      }
    }
    // 정예·보스 발밑 룬 + 후광
    if (elite && typeof fxTex === 'function') {
      const r = (m.bodyRadius || 2) * (m.isBoss ? 1.7 : 1.35);
      const rune = new THREE.Mesh(new THREE.CircleGeometry(1, 32), new THREE.MeshBasicMaterial({ map: fxTex('rune'), color: m.isBoss ? 0xfacc15 : T.glow, transparent: true, opacity: 0.75, blending: THREE.AdditiveBlending, depthWrite: false }));
      rune.rotation.x = -Math.PI / 2;
      rune.position.y = 0.1;
      rune.scale.setScalar(r / (m.baseScale || 1));
      m.mesh.add(rune);
      const halo = new THREE.Sprite(new THREE.SpriteMaterial({ map: fxTex('glow'), color: m.isBoss ? 0xffb020 : T.glow, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false }));
      const sh = (m.sizeH || 5.4) / (m.baseScale || 1);
      halo.scale.set(sh * 1.25, sh * 1.25, 1);
      halo.position.set(0, sh * 0.5, -0.4);
      m.mesh.add(halo);
      m._hqRune = rune;
      m._hqHalo = halo;
    }
    if (m.labelEl && m.stageBoss) {
      m.labelEl.style.borderColor = m.stageBoss.kind === 'main' ? '#facc15' : '#fb923c';
      m.labelEl.style.boxShadow = `0 0 14px ${m.stageBoss.kind === 'main' ? 'rgba(250,204,21,0.7)' : 'rgba(251,146,60,0.55)'}`;
    }
    if (m.stageBoss && m.stageBoss.kind === 'main') {
      bossBanner('👑 보스 등장!', String(m.name || '').replace(/<[^>]*>/g, ''), '#facc15');
      if (typeof soundFx !== 'undefined') try { soundFx.playFanfare(); } catch (e) {}
    }
  }

  // ------------------------------------------------------------------
  // 6) 매 프레임
  // ------------------------------------------------------------------
  let fogSaved = null;
  let scatterGroup = null;
  // 마을 풀숲 장식 그룹을 기억해 두었다가 전투 중엔 숨김 (투기장 바닥을 뚫고 보이지 않게)
  if (typeof window.createScatterDetails3D === 'function') {
    const _csd = window.createScatterDetails3D;
    window.createScatterDetails3D = function () { const g = _csd.apply(this, arguments); scatterGroup = g; return g; };
  }
  function update(g, dt) {
    if (!A || !g) return;
    const t = performance.now() / 1000;
    const inStage = g.battleState && g.battleState.active && !g.raidMode;
    A.group.visible = true;
    A.floorMat.uniforms.uT.value = t;
    A.fireMat.uniforms.uT.value = t;
    A.skyMat.uniforms.uT.value = t;
    A.partMat.uniforms.uT.value = t;
    A.barrierTex.offset.y = (t * 0.15) % 1;
    A.crystals.forEach(c => { c.cr.position.y = c.base + Math.sin(t * 1.5 + c.i) * 0.35; c.cr.rotation.y = t + c.i; if (c.gl) c.gl.position.y = c.cr.position.y; });
    A.banners.forEach(b => { b.rotation.z = Math.sin(t * 1.3 + b.userData.sway) * 0.05; });
    A.skyMat.visible = inStage;
    const hideTown = inStage;
    if (g.instancedGrass) g.instancedGrass.visible = !hideTown;
    if (scatterGroup) scatterGroup.visible = !hideTown;
    if (g.outerTerrain) g.outerTerrain.visible = !hideTown;
    // 바닥 셰이더 안개를 실제 장면 안개와 맞춤
    if (g.scene.fog) {
      A.floorMat.uniforms.uFogColor.value.copy(g.scene.fog.color);
      A.floorMat.uniforms.uFogDensity.value = g.scene.fog.density || 0;
    }
    // 전투 중엔 테마 안개, 끝나면 원래대로
    if (g.scene.fog) {
      if (inStage) {
        if (!fogSaved) fogSaved = { c: g.scene.fog.color.getHex(), d: g.scene.fog.density, bg: g.scene.background && g.scene.background.getHex ? g.scene.background.getHex() : null };
        const T = THEMES[curTheme];
        g.scene.fog.color.lerp(col3(T.fog), Math.min(1, dt * 2));
        g.scene.fog.density += (T.fogD - g.scene.fog.density) * Math.min(1, dt * 2);
        if (g.scene.background && g.scene.background.lerp) g.scene.background.lerp(col3(T.skyBot), Math.min(1, dt * 2));
      } else if (fogSaved) {
        g.scene.fog.color.setHex(fogSaved.c);
        g.scene.fog.density = fogSaved.d;
        if (fogSaved.bg !== null && g.scene.background && g.scene.background.setHex) g.scene.background.setHex(fogSaved.bg);
        fogSaved = null;
      }
    }
    if (!inStage) return;
    (g.monsters || []).forEach(m => {
      if (!m.alive) return;
      if (!m._hq) decorateMonster(g, m);
      if (m._hqRune) m._hqRune.rotation.z = t * (m.isBoss ? 0.8 : 0.5);
      if (m._hqHalo) m._hqHalo.material.opacity = 0.28 + Math.sin(t * 3) * 0.07;
      // 광폭화 (방장 판정 → 파티원도 체력 비율로 같은 연출)
      if (m.stageBoss && m.stageBoss.n >= 20 && !m._enrageFx && m.hp / m.maxHp <= 0.3) {
        m._enrageFx = true;
        m.baseScale = (m.baseScale || 1) * 1.22;
        if (typeof fxCreateBossAura === 'function') { try { const au = fxCreateBossAura((m.bodyRadius || 3) * 1.4 / (m.baseScale || 1), 0xb00010); m.mesh.add(au); m._enrageAura = au; } catch (e) {} }
        if (hasFx()) { FXHQ.shockwave(V(m.pos.x, 0.1, m.pos.z), 0xff1a2a, 26); if (FXHQ.screenFlash) FXHQ.screenFlash(0x7a0010, 0.4, 500); }
        g.camShake = Math.max(g.camShake || 0, 1.0);
      }
      if (m._enrageAura && m._enrageAura.userData.update) m._enrageAura.userData.update(t);
    });
  }

  // ------------------------------------------------------------------
  // 7) 연결 (main.js 프로토타입 감싸기)
  // ------------------------------------------------------------------
  function install() {
    tune();
    if (typeof Chiikawa3DWorldApp === 'undefined') return;
    const P = Chiikawa3DWorldApp.prototype;
    const origStage = P.startBattleStage;
    P.startBattleStage = function (stageNum, opts) {
      applyTheme(tierOf(stageNum || 1));
      const r = origStage.call(this, stageNum, opts);
      return r;
    };
    const origDungeon = P.startSpecialDungeon;
    if (origDungeon) {
      P.startSpecialDungeon = function (type, tier, opts) {
        applyTheme(Math.max(0, Math.min(4, (tier || 1) - 1)));
        return origDungeon.call(this, type, tier, opts);
      };
    }
    // 파티 인원만큼 체력 보정 (방장·파티원 모두 같은 값)
    const origSpawn = P.spawnSectorWaveMonsters;
    P.spawnSectorWaveMonsters = function (defs, z, re) {
      const before = this.monsters.length;
      const r = origSpawn.call(this, defs, z, re);
      let n = 1;
      if (this.partyRole && window.coop && window.coop.room) n = Math.max(1, Object.keys(window.coop.players || {}).length);
      if (n > 1) {
        for (let i = before; i < this.monsters.length; i++) {
          const m = this.monsters[i];
          const f = m.stageBoss ? 1 + 0.7 * (n - 1) : 1 + 0.35 * (n - 1);
          m.hp = Math.round(m.hp * f);
          m.maxHp = Math.round(m.maxHp * f);
        }
      }
      return r;
    };
    const origResolve = P.resolveTelegraphAttack;
    P.resolveTelegraphAttack = function (tg) {
      if (tg && tg.monster && tg.monster.stageBoss && tg.monster.alive && !(tg.monster.stunTimer > 0)) impact(this, tg);
      return origResolve.call(this, tg);
    };
    const origFx = P.updateEffects;
    P.updateEffects = function (dt) {
      const r = origFx.call(this, dt);
      try { update(this, dt); } catch (e) { if (!update._warned) { update._warned = true; console.warn('STAGEHQ', e); } }
      return r;
    };
  }

  return {
    install, tune, buildArena, applyTheme, updateBoss, impact, THEMES,
    bossHp, hpMul, atkMul, dmgScale,
    get theme() { return curTheme; }
  };
})();

// 전투 맵 생성 함수 교체 (main.js가 같은 이름으로 호출)
function createBattleColosseumArena3D() { return STAGEHQ.buildArena(); }
STAGEHQ.install();

// 전역(window)으로도 노출: HTML onclick, 다른 모듈의 런타임 참조, 디버그 콘솔용
expose({
  get STAGEHQ() { return STAGEHQ; },
  get createBattleColosseumArena3D() { return createBattleColosseumArena3D; }, set createBattleColosseumArena3D(v) { createBattleColosseumArena3D = v; }
});
