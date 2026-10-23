// ⚙️ ES 모듈 (자동 변환): 앞쪽 모듈은 import, 뒤쪽 모듈·덮어쓰기 되는 이름은 window.이름 으로 참조
import THREE from '../core/three.js';
import { addCartoonOutline, createMonster3D, getToonGradientMap, loadCleanCharacterTexture } from '../core/models3d.js';
import { FXHQ, fxCreateBossAura, fxTex } from '../world/fx_hq.js';
import { POLISH } from '../world/polish_hq.js';
import { expose } from '../core/expose.js';
// ==========================================================================
// 치이카와 3D 월드 - 레이드 전용 원형 투기장 & 보스 연출 (raid_hq.js)
//  · 전투 스테이지와 분리된 넓은 원형 결투장 (중심 0, -820 / 반경 46m)
//  · 레이드 보스 공격 임팩트 추가 연출 (번개·화염벽·마법진·대폭발 캐스케이드)
//  · 3페이즈: 진짜 모습으로 변신 + 체력 절반 회복 + 진한 빨간 오라
// ==========================================================================
const RAIDHQ = (() => {
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const CENTER = V(0, 0, -820);
  const ARENA_R = 46;       // 플레이어 이동 한계
  const BOSS_R = 38;        // 보스 이동 한계
  const FLOOR_R = 54;
  const clamp01 = k => Math.max(0, Math.min(1, k));
  const easeO = k => 1 - Math.pow(1 - clamp01(k), 3);
  const hasFx = () => typeof FXHQ !== 'undefined' && !!FXHQ._add;
  const detail = () => (typeof POLISH !== 'undefined' && POLISH.detail) || 1;

  let arena = null;
  let phase = 1;
  let p3Mix = 0;     // 0 → 1 (3페이즈 분위기 전환)
  let aura = null;
  let theme = 'anoko'; // 'anoko' | 'bird'
  const isBird = () => theme === 'bird';
  let stormT = 0;

  const NOISE = `
    float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
    float fbm(vec2 p){ return vn(p) * 0.55 + vn(p * 2.1 + 3.7) * 0.3 + vn(p * 4.3 + 1.3) * 0.15; }`;
  const VS = `varying vec2 vUv; varying vec3 vW;
    void main(){ vUv = uv; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`;

  // ---------------- 바닥 (돌 타일 + 붉은 룬 + 3페이즈 균열) ----------------
  const FLOOR_FS = `
    uniform float uT; uniform float uP3; uniform float uR;
    varying vec2 vUv; ${NOISE}
    void main() {
      vec2 p = (vUv - 0.5) * 2.0 * uR;
      float r = length(p);
      if (r > uR) discard;
      float a = atan(p.y, p.x);
      // 돌 타일: 동심원 + 방사형 줄눈
      float ringI = floor(r / 5.5);
      float rf = fract(r / 5.5);
      float segN = 10.0 + ringI * 6.0;
      float af = fract((a / 6.28318) * segN + ringI * 0.37);
      float mortar = max(smoothstep(0.06, 0.0, rf) + smoothstep(0.94, 1.0, rf), smoothstep(0.035, 0.0, af) + smoothstep(0.965, 1.0, af));
      float n = fbm(p * 0.35 + ringI);
      vec3 stone = mix(vec3(0.20, 0.18, 0.22), vec3(0.30, 0.27, 0.30), n);
      stone *= 0.9 + 0.2 * h21(vec2(ringI, floor(af * 0.0 + (a / 6.28318) * segN)));
      vec3 col = mix(stone, vec3(0.06, 0.05, 0.07), clamp(mortar, 0.0, 1.0) * 0.85);
      // 룬 고리 (경계선 46m, 30m, 14m) + 방사형 룬 문양
      float pulse = 1.0; // 깜빡임 없음 (공격 예고 장판과 구분)
      float rings = smoothstep(0.35, 0.0, abs(r - 46.0)) * 1.2 + smoothstep(0.25, 0.0, abs(r - 30.0)) * 0.8 + smoothstep(0.22, 0.0, abs(r - 14.0)) * 0.7;
      float glyph = step(0.0, sin(a * 24.0)) * smoothstep(1.2, 0.0, abs(r - 43.5)) * step(abs(r - 43.5), 1.2);
      glyph *= 0.55 + 0.45 * step(0.5, fract(a * 3.8197 + 0.25));
      float spokes = smoothstep(0.12, 0.0, abs(fract(a / 6.28318 * 8.0 + 0.0625) - 0.5) - 0.48) * step(14.0, r) * step(r, 30.0) * 0.5;
      // 3페이즈: 바닥 균열에서 용암빛이 새어 나옴
      float crack = smoothstep(0.035, 0.0, abs(fbm(p * 0.12 + 5.0) - 0.5)) * uP3;
      // 룬은 빨강 대신 차분한 청보라 (빨강은 공격 예고 전용)
      vec3 rune = mix(vec3(0.42, 0.36, 0.95), vec3(1.0, 0.38, 0.08), uP3); // 3페이즈: 주황·빨강
      col += rune * (rings + glyph * 0.8 + spokes) * 0.55 * pulse;
      col += mix(vec3(1.0, 0.22, 0.04), vec3(1.0, 0.55, 0.1), fbm(p * 0.05 + uT * 0.15)) * crack * 1.1; // 용암 균열 (천천히 흐름, 깜빡임 없음)
      // 중앙 어두운 그을림 + 바깥 가장자리 어둡게
      col *= 0.82 + 0.18 * smoothstep(0.0, 12.0, r);
      col *= 1.0 - smoothstep(uR - 4.0, uR, r) * 0.6;
      col = mix(col, col * vec3(1.2, 0.75, 0.6), uP3 * 0.5);
      gl_FragColor = vec4(col, 1.0);
    }`;

  // ---------------- 경계 결계 (세로 그라데이션 커튼) ----------------
  const BARRIER_FS = `
    uniform float uT; uniform float uP3; uniform vec3 uCol;
    varying vec2 vUv; ${NOISE}
    void main() {
      float f = fbm(vec2(vUv.x * 40.0, vUv.y * 3.0 - uT * 1.4));
      float fade = pow(max(1.0 - vUv.y, 0.0), 2.2);
      float lines = smoothstep(0.92, 1.0, fract(vUv.x * 96.0 + uT * 0.2)) * 0.5;
      float a = (fade * (0.25 + f * 0.55) + lines * fade) * (0.55 + uP3 * 0.35);
      vec3 col = mix(mix(uCol, vec3(1.0, 0.32, 0.06), uP3), vec3(1.0, 0.8, 0.7), fade * f * 0.5);
      gl_FragColor = vec4(col * a, a);
    }`;

  // ---------------- 하늘 소용돌이 ----------------
  const VORTEX_FS = `
    uniform float uT; uniform float uP3;
    varying vec2 vUv; ${NOISE}
    void main() {
      vec2 p = (vUv - 0.5) * 2.0;
      float r = length(p);
      if (r > 1.0) discard;
      float a = atan(p.y, p.x);
      float sw = fbm(vec2(a * 2.0 + r * 6.0 - uT * 0.35, r * 3.0 - uT * 0.2));
      float arms = smoothstep(0.45, 0.8, sw);
      float core = smoothstep(0.35, 0.0, r);
      float edge = 1.0 - smoothstep(0.6, 1.0, r);
      vec3 col = mix(vec3(0.55, 0.05, 0.08), vec3(1.0, 0.35, 0.2), arms * 0.6);
      col = mix(col, vec3(0.35, 0.0, 0.05), uP3 * 0.6);
      float alpha = (arms * 0.55 + core * 0.4) * edge * (0.35 + uP3 * 0.4);
      gl_FragColor = vec4(col * alpha, alpha);
    }`;

  // ---------------- 진한 빨간 불꽃 오라 (노멀 블렌딩으로 어둡고 진하게) ----------------
  const DARKFLAME_FS = `
    uniform float uT; uniform float uFade;
    varying vec2 vUv; ${NOISE}
    void main() {
      float f = fbm(vec2(vUv.x * 9.0 + sin(vUv.y * 4.0 + uT) * 0.4, vUv.y * 2.6 - uT * 2.2));
      float g = fbm(vec2(vUv.x * 17.0, vUv.y * 5.0 - uT * 3.4));
      float fade = pow(max(1.0 - vUv.y, 0.0), 1.3) * smoothstep(0.0, 0.06, vUv.y);
      float body = smoothstep(0.32, 0.72, f * 0.7 + g * 0.4 + fade * 0.35) * fade;
      vec3 col = mix(vec3(0.16, 0.0, 0.01), vec3(0.62, 0.0, 0.03), smoothstep(0.4, 0.9, f));
      col = mix(col, vec3(1.0, 0.18, 0.08), smoothstep(0.78, 1.0, g) * 0.6);
      gl_FragColor = vec4(col, body * 0.88 * uFade);
    }`;
  const GLOWFLAME_FS = `
    uniform float uT; uniform float uFade;
    varying vec2 vUv; ${NOISE}
    void main() {
      float f = fbm(vec2(vUv.x * 12.0, vUv.y * 3.2 - uT * 3.0));
      float fade = pow(max(1.0 - vUv.y, 0.0), 2.0) * smoothstep(0.0, 0.05, vUv.y);
      float a = smoothstep(0.45, 0.85, f) * fade * 0.8 * uFade;
      vec3 col = mix(vec3(0.9, 0.02, 0.05), vec3(1.0, 0.45, 0.25), f);
      gl_FragColor = vec4(col * a, a);
    }`;

  function smat(fs, uniforms, opts = {}) {
    return new THREE.ShaderMaterial({
      uniforms: Object.assign({ uT: { value: 0 }, uP3: { value: 0 }, uFade: { value: 1 } }, uniforms),
      vertexShader: VS, fragmentShader: fs,
      transparent: opts.transparent !== false, depthWrite: !!opts.depthWrite,
      blending: opts.normal ? THREE.NormalBlending : THREE.AdditiveBlending,
      side: opts.side || THREE.DoubleSide
    });
  }
  const toon = col => new THREE.MeshToonMaterial({ color: col, gradientMap: typeof getToonGradientMap === 'function' ? getToonGradientMap() : null });

  function buildArena(scene) {
    const g = new THREE.Group();
    g.name = 'raid-arena';
    g.position.copy(CENTER);
    const mats = [];

    // 바닥
    const floorMat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uP3: { value: 0 }, uR: { value: FLOOR_R } },
      vertexShader: VS, fragmentShader: FLOOR_FS
    });
    mats.push(floorMat);
    const floor = new THREE.Mesh(new THREE.CircleGeometry(FLOOR_R, 96), floorMat);
    floor.geometry.rotateX(-Math.PI / 2);
    // CircleGeometry의 uv는 원 중심 기준이 아니라 0~1 사각 → 그대로 사용
    floor.position.y = 0.03;
    g.add(floor);
    // 바닥 테두리 (돌 단)
    const rim = new THREE.Mesh(new THREE.CylinderGeometry(FLOOR_R + 1.2, FLOOR_R + 2.2, 1.4, 96, 1, true), toon(0x2a2430));
    rim.position.y = -0.55;
    g.add(rim);
    const rimTop = new THREE.Mesh(new THREE.RingGeometry(FLOOR_R - 0.1, FLOOR_R + 1.25, 96), toon(0x3b3340));
    rimTop.geometry.rotateX(-Math.PI / 2);
    rimTop.position.y = 0.12;
    g.add(rimTop);
    const KR = { rim: [rim, rimTop], obs: [], spires: [] }; // 조립 부품으로 바꿀 원래 메시들

    // 결계 커튼
    const barrierMat = smat(BARRIER_FS, { uCol: { value: new THREE.Color(0x7c6bff) } });
    mats.push(barrierMat);
    const barrier = new THREE.Mesh(new THREE.CylinderGeometry(ARENA_R + 0.6, ARENA_R + 0.6, 7, 128, 1, true), barrierMat);
    barrier.position.y = 3.5;
    g.add(barrier);

    // 오벨리스크 12개 + 붉은 수정
    const crystals = [];
    const obMat = toon(0x2d2733);
    const obMat2 = toon(0x413849);
    const crystalMat = new THREE.MeshBasicMaterial({ color: 0x9d7bff });
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + Math.PI / 12;
      const x = Math.cos(a) * (FLOOR_R + 3.5), z = Math.sin(a) * (FLOOR_R + 3.5);
      const h = i % 3 === 0 ? 14 : 10;
      const ob = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.7, h, 4), i % 2 ? obMat : obMat2);
      ob.position.set(x, h / 2, z);
      ob.rotation.y = -a + Math.PI / 4;
      if (typeof addCartoonOutline === 'function') addCartoonOutline(ob, 0.04);
      g.add(ob);
      KR.obs.push({ ob, x, z, h, a });
      const cr = new THREE.Mesh(new THREE.OctahedronGeometry(1.1, 0), crystalMat);
      cr.position.set(x, h + 2.2, z);
      cr.scale.y = 1.7;
      g.add(cr);
      const glow = new THREE.Sprite(new THREE.SpriteMaterial({
        map: typeof fxTex === 'function' ? fxTex('glow') : null, color: 0x8f6bff, transparent: true, opacity: 0.85,
        blending: THREE.AdditiveBlending, depthWrite: false
      }));
      glow.scale.setScalar(6);
      glow.position.copy(cr.position);
      g.add(glow);
      crystals.push({ cr, glow, base: cr.position.y, i });
    }
    // 바깥 뾰족 바위 (분위기)
    const rockMat = toon(0x1f1a24);
    for (let i = 0; i < 26; i++) {
      const a = (i / 26) * Math.PI * 2 + (i % 2) * 0.08;
      const rr = FLOOR_R + 30 + (i % 3) * 6; // 카메라 경로(반경 ~72m) 밖에 배치
      const h = 12 + ((i * 37) % 13);
      const sp = new THREE.Mesh(new THREE.ConeGeometry(3 + (i % 4), h, 5), rockMat);
      sp.position.set(Math.cos(a) * rr, h / 2 - 0.5, Math.sin(a) * rr);
      sp.rotation.set((i % 3 - 1) * 0.12, i, (i % 2 - 0.5) * 0.2);
      g.add(sp);
      KR.spires.push({ sp, r: 3 + (i % 4), h });
    }
    // 하늘 소용돌이
    const vortexMat = smat(VORTEX_FS, {});
    mats.push(vortexMat);
    const vortex = new THREE.Mesh(new THREE.PlaneGeometry(260, 260), vortexMat);
    vortex.rotation.x = Math.PI / 2;
    vortex.position.y = 95;
    g.add(vortex);

    // 떠오르는 불씨
    const N = Math.round(420 * detail());
    const pos = new Float32Array(N * 3);
    const seed = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const a = Math.random() * Math.PI * 2, r = Math.sqrt(Math.random()) * (FLOOR_R + 6);
      pos[i * 3] = Math.cos(a) * r; pos[i * 3 + 1] = Math.random() * 30; pos[i * 3 + 2] = Math.sin(a) * r;
      seed[i] = Math.random();
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    pg.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
    const emberMat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 }, uP3: { value: 0 } },
      vertexShader: `attribute float seed; uniform float uT; varying float vS; varying float vA;
        void main(){ vec3 p = position; float h = mod(p.y + uT * (2.0 + seed * 3.0), 32.0);
          p.y = h; p.x += sin(uT * 0.7 + seed * 30.0) * 1.5; p.z += cos(uT * 0.6 + seed * 20.0) * 1.5;
          vA = smoothstep(0.0, 3.0, h) * (1.0 - smoothstep(22.0, 32.0, h)); vS = seed;
          vec4 mv = modelViewMatrix * vec4(p, 1.0); gl_PointSize = (2.0 + seed * 4.0) * (120.0 / -mv.z); gl_Position = projectionMatrix * mv; }`,
      fragmentShader: `uniform float uP3; varying float vS; varying float vA;
        void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard; float a = smoothstep(0.5, 0.0, d) * vA;
          vec3 c = mix(vec3(1.0, 0.45, 0.15), vec3(1.0, 0.1, 0.12), vS); c = mix(c, vec3(0.9, 0.0, 0.1), uP3 * 0.6);
          gl_FragColor = vec4(c * a, a); }`,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
    });
    mats.push(emberMat);
    const embers = new THREE.Points(pg, emberMat);
    embers.frustumCulled = false;
    g.add(embers);

    // ---- 분화구 절벽 고리 + 어두운 땅 + 밤하늘 돔 (레이드 동안만 보임: 바깥 풀밭·파란 하늘을 가림)
    const darkGround = new THREE.Mesh(new THREE.RingGeometry(FLOOR_R + 1.5, 330, 64, 1), toon(0x1c1722));
    darkGround.geometry.rotateX(-Math.PI / 2);
    darkGround.position.y = 0.02;
    g.add(darkGround);
    const craterMat = toon(0x2a2430);
    const craterGeo = new THREE.DodecahedronGeometry(1, 0);
    const NC = 46;
    const crater = new THREE.InstancedMesh(craterGeo, craterMat, NC);
    const dm = new THREE.Object3D();
    for (let i = 0; i < NC; i++) {
      const a = (i / NC) * Math.PI * 2 + ((i * 53) % 7) * 0.02;
      const rr = 104 + ((i * 29) % 5) * 7;
      dm.position.set(Math.cos(a) * rr, 4 + ((i * 13) % 6), Math.sin(a) * rr);
      dm.rotation.set(((i * 7) % 5) * 0.6, i * 1.7, ((i * 11) % 5) * 0.6);
      dm.scale.set(14 + ((i * 17) % 7) * 2, 26 + ((i * 23) % 9) * 4, 14 + ((i * 19) % 7) * 2);
      dm.updateMatrix();
      crater.setMatrixAt(i, dm.matrix);
    }
    g.add(crater);
    KR.crater = crater;
    const skyMat = new THREE.ShaderMaterial({
      uniforms: { uT: { value: 0 } },
      vertexShader: `varying vec3 vD; void main(){ vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `uniform float uT; varying vec3 vD;
        float h(vec3 p){ return fract(sin(dot(p, vec3(12.9898, 78.233, 45.164))) * 43758.5453); }
        void main(){ vec3 d = normalize(vD); float k = clamp(d.y * 1.4 + 0.12, 0.0, 1.0);
          vec3 col = mix(vec3(0.30, 0.10, 0.16), vec3(0.06, 0.04, 0.13), pow(k, 0.7));
          vec3 sp = floor(d * 240.0); float st = step(0.9972, h(sp)) * smoothstep(0.15, 0.5, d.y) * (0.6 + 0.4 * sin(uT * 2.0 + h(sp) * 30.0));
          gl_FragColor = vec4(col + vec3(st * 0.8), 1.0); }`,
      side: THREE.BackSide, depthWrite: true, fog: false
    });
    mats.push(skyMat);
    const sky = new THREE.Mesh(new THREE.SphereGeometry(340, 32, 16), skyMat);
    sky.renderOrder = -10;
    g.add(sky);

    g.visible = false;
    g.userData.raidHQ = true;
    scene.add(g);
    arena = { group: g, mats, crystals, vortex, floorMat };
    // 🧱 Blender로 만든 조립 부품(오벨리스크·바닥 테두리·바위)으로 교체 — 불러오기 전/실패 시엔 원래 모양 그대로
    if (typeof window.TOWNBAKE !== 'undefined' && window.TOWNBAKE.loadKit) {
      window.TOWNBAKE.loadKit().then(kit => { if (kit) { try { applyKit(kit, KR, g); } catch (e) { console.warn('RAID kit', e); } } });
    }
  }

  function applyKit(kit, KR, g) {
    const TB = window.TOWNBAKE;
    const GMap = typeof getToonGradientMap === 'function' ? getToonGradientMap() : null;
    const kmat = (part, col = 0xffffff) => new THREE.MeshToonMaterial({ map: part.map, color: col, gradientMap: GMap });
    const M4 = (x, y, z, rx, ry, rz, sx, sy, sz) => new THREE.Matrix4().compose(new THREE.Vector3(x, y, z), new THREE.Quaternion().setFromEuler(new THREE.Euler(rx, ry, rz)), new THREE.Vector3(sx, sy, sz));
    if (kit.kit_robelisk) {
      g.add(TB.kitMesh(kit.kit_robelisk, kmat(kit.kit_robelisk), KR.obs.map(o => M4(o.x, 0, o.z, 0, -o.a, 0, 1, o.h / 12, 1))));
      KR.obs.forEach(o => { o.ob.visible = false; });
    }
    if (kit.kit_rimseg) {
      g.add(TB.kitMesh(kit.kit_rimseg, kmat(kit.kit_rimseg), Array.from({ length: 24 }, (_, k) => M4(0, 0, 0, 0, (k / 24) * Math.PI * 2, 0, 1, 1, 1))));
      KR.rim.forEach(o => { o.visible = false; });
    }
    if (kit.kit_spire) {
      const list = KR.spires.map(({ sp, r, h }) => M4(sp.position.x, -0.5, sp.position.z, sp.rotation.x, sp.rotation.y, sp.rotation.z, r, h, r));
      g.add(TB.kitMesh(kit.kit_spire, kmat(kit.kit_spire, 0x3a3242), list, false));
      KR.spires.forEach(o => { o.sp.visible = false; });
    }
    if (kit.kit_rock && KR.crater) {
      KR.crater.geometry = kit.kit_rock.geo;
      KR.crater.material = kmat(kit.kit_rock, 0x3a3242);
      KR.crater.computeBoundingSphere && KR.crater.computeBoundingSphere();
    }
  }

  function ensureArena(game) {
    if (!arena && game && game.scene) {
      try { buildArena(game.scene); } catch (e) { console.warn('레이드 투기장 생성 오류:', e); }
    }
    return arena;
  }

  function setPhase(p) { phase = p; }

  // ---------------- 3페이즈 오라 ----------------
  // 보스 일러스트의 실루엣(알파)을 따라 진한 빨간 불꽃이 피어오르는 오라
  const SIL_FS = `
    uniform sampler2D uMap; uniform float uT; uniform float uFade; uniform float uSpread; uniform float uMode;
    uniform vec3 uD1; uniform vec3 uD2; uniform vec3 uG1; uniform vec3 uG2;
    varying vec2 vUv; ${NOISE}
    float A(vec2 uv) { if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) return 0.0; return texture2D(uMap, uv).a; }
    void main() {
      vec2 tuv = (vUv - 0.5) * uSpread + 0.5;
      float n = fbm(vec2(vUv.x * 7.0, vUv.y * 4.0 - uT * 2.6));
      float n2 = fbm(vec2(vUv.x * 13.0 + 3.0, vUv.y * 7.0 - uT * 4.0));
      vec2 lift = vec2((n - 0.5) * 0.05, -0.05 - n2 * 0.08);
      float a = 0.0;
      for (int i = 0; i < 12; i++) {
        float ang = float(i) * 0.5236;
        vec2 o = vec2(cos(ang), sin(ang));
        a = max(a, A(tuv + lift + o * 0.045));
        a = max(a, A(tuv + lift * 1.6 + o * 0.085) * 0.75);
      }
      float inner = A(tuv);
      float edge = a * (1.0 - inner);
      float flame = edge * smoothstep(0.2, 0.7, n * 0.7 + n2 * 0.5);
      vec3 col;
      float alpha;
      if (uMode < 0.5) {
        col = mix(uD1, uD2, n2);
        alpha = flame * 0.95;
      } else {
        col = mix(uG1, uG2, n2);
        alpha = flame * smoothstep(0.55, 0.9, n2) * 0.8;
        col *= alpha;
      }
      gl_FragColor = vec4(col, alpha * uFade);
    }`;
  function makeAura(game, m) {
    removeAura(game);
    const g = new THREE.Group();
    const R = (m.bodyRadius || 7) * 1.05;
    const tex = typeof loadCleanCharacterTexture === 'function' ? loadCleanCharacterTexture(isBird() ? 'assets/raid_bird_phase3.png' : 'assets/anoko_phase3.png') : null;
    const C = v => new THREE.Color(v[0], v[1], v[2]);
    const pal = isBird()
      ? { d1: [0.05, 0.05, 0.25], d2: [0.2, 0.25, 0.75], g1: [0.3, 0.75, 1.0], g2: [0.85, 0.95, 1.0], disc: 0x1e3a8a, aura: 0x4f46e5 }
      : { d1: [0.22, 0.0, 0.02], d2: [0.62, 0.0, 0.04], g1: [0.95, 0.05, 0.08], g2: [1.0, 0.45, 0.3], disc: 0x8b0000, aura: 0xb00010 };
    const sizeW = (m.mesh && m.mesh.userData && m.mesh.userData.sizeW) || 8.6;
    const sizeH = (m.mesh && m.mesh.userData && m.mesh.userData.sizeH) || 8.6;
    const spread = 1.45;
    const mkSil = (mode, z) => {
      const mm = new THREE.ShaderMaterial({
        uniforms: { uMap: { value: tex }, uT: { value: 0 }, uFade: { value: 0 }, uSpread: { value: spread }, uMode: { value: mode },
          uD1: { value: C(pal.d1) }, uD2: { value: C(pal.d2) }, uG1: { value: C(pal.g1) }, uG2: { value: C(pal.g2) } },
        vertexShader: VS, fragmentShader: SIL_FS, transparent: true, depthWrite: false, side: THREE.DoubleSide,
        blending: mode < 0.5 ? THREE.NormalBlending : THREE.AdditiveBlending
      });
      const pl = new THREE.Mesh(new THREE.PlaneGeometry(sizeW * spread, sizeH * spread), mm);
      pl.position.set(0, sizeH * 0.5, z);
      pl.renderOrder = -1;
      if (m.mesh) m.mesh.add(pl);
      return { pl, mm };
    };
    const silDark = mkSil(0, -0.35);
    const silGlow = mkSil(1, -0.3);
    // 바닥 진홍 원
    const disc = new THREE.Mesh(new THREE.CircleGeometry(R * 2.1, 48), new THREE.MeshBasicMaterial({
      map: typeof fxTex === 'function' ? fxTex('glow') : null, color: pal.disc, transparent: true, opacity: 0.9, depthWrite: false
    }));
    disc.geometry.rotateX(-Math.PI / 2);
    disc.position.y = 0.09;
    g.add(disc);
    let bossAura = null;
    if (typeof fxCreateBossAura === 'function') {
      bossAura = fxCreateBossAura(R * 1.6, pal.aura);
      g.add(bossAura);
    }
    game.scene.add(g);
    aura = { group: g, sils: [silDark, silGlow], bossAura, t: 0, emit: 0, m };
  }
  function removeAura(game) {
    if (!aura) return;
    aura.sils.forEach(s => {
      if (s.pl.parent) s.pl.parent.remove(s.pl);
      s.pl.geometry.dispose();
      s.mm.dispose();
    });
    if (aura.group.parent) aura.group.parent.remove(aura.group);
    if (game && game.disposeObject3D) game.disposeObject3D(aura.group);
    aura = null;
  }

  // 레이드 보스 → 3페이즈 변신
  function phase3(game, m) {
    if (!game || !m) return;
    setPhase(3);
    const old = m.mesh;
    const p = m.pos.clone();
    // 변신 연출
    const B = isBird();
    const cA = B ? 0x60a5fa : 0xff1a2a, cB = B ? 0x1e1b4b : 0x5a0008, cS = B ? 0x0b1030 : 0x1a0006;
    if (hasFx()) {
      FXHQ.screenFlash(cB, 0.55, 600);
      FXHQ.fovPunch(6, 1.2);
      FXHQ.shockwave(V(p.x, 0, p.z), cA, 30);
      FXHQ.shockwave(V(p.x, 0, p.z), cB, 18);
      for (let i = 0; i < Math.round(26 * detail()); i++) {
        const s = FXHQ._sprite('smoke', cS, false, 0.85);
        const a = Math.random() * Math.PI * 2;
        s.position.set(p.x + Math.cos(a) * 3, 3 + Math.random() * 12, p.z + Math.sin(a) * 3);
        const v = V(Math.cos(a) * (8 + Math.random() * 10), 2 + Math.random() * 6, Math.sin(a) * (8 + Math.random() * 10));
        const size = 6 + Math.random() * 6;
        FXHQ._add(s, 1.6, (it, dt, k) => {
          s.position.addScaledVector(v, dt * (1 - k));
          s.scale.setScalar(size * (0.5 + k * 1.3));
          s.material.opacity = 0.85 * (1 - k);
        });
      }
      for (let i = 0; i < 10; i++) {
        const a = (i / 10) * Math.PI * 2;
        lightning(V(p.x, 16, p.z), V(p.x + Math.cos(a) * 22, 0.2, p.z + Math.sin(a) * 22), B ? 0x93c5fd : 0xff2030, 0.5, 0.18);
      }
      pillar(V(p.x, 0, p.z), 8, 90, B ? 0x3b82f6 : 0xb0000f, 1.2);
    }
    if (game) game.camShake = Math.max(game.camShake || 0, 1.2);
    // 진짜 모습으로 교체
    try {
      const scale = B ? 4.0 : 4.65; // 3페이즈: 더 크게
      const mesh = createMonster3D(B ? 'pjbird3' : 'anoko3');
      mesh.position.copy(old.position);
      mesh.rotation.y = old.rotation.y;
      mesh.scale.setScalar(scale * 0.45); // 커지면서 등장
      game.scene.add(mesh);
      game.scene.remove(old);
      if (game.disposeObject3D) game.disposeObject3D(old);
      m.mesh = mesh;
      m.baseScale = scale;
      m.sc = scale * 0.45;
      m.bodyRadius = (mesh.userData.bodyRadius || 2.4) * scale;
      m.sizeH = (mesh.userData.sizeH || 8.6) * scale;
      m.heightOffset = 8.8 * scale;
    } catch (e) {
      console.warn('3페이즈 변신 오류:', e);
    }
    makeAura(game, m);
  }

  // ---------------- 공용 이펙트 블록 ----------------
  function lightning(from, to, color, life = 0.35, thick = 0.14) {
    if (!hasFx()) return;
    const pts = [];
    const dir = to.clone().sub(from);
    const len = dir.length();
    const side = V(-dir.z, 0, dir.x).normalize();
    if (side.lengthSq() < 0.01) side.set(1, 0, 0);
    const n = 12;
    for (let i = 0; i <= n; i++) {
      const k = i / n;
      const p = from.clone().addScaledVector(dir, k);
      if (i > 0 && i < n) {
        p.addScaledVector(side, (Math.random() - 0.5) * len * 0.12);
        p.y += (Math.random() - 0.5) * len * 0.08;
      }
      pts.push(p);
    }
    const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1);
    const g = new THREE.Group();
    const mk = (r, col, op) => {
      const mm = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false });
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, r, 5, false), mm));
      return mm;
    };
    const core = mk(thick, 0xffffff, 1);
    const halo = mk(thick * 3.4, color, 0.5);
    FXHQ._add(g, life, (it, dt, k) => {
      const fl = Math.random() < 0.3 ? 0.3 : 1;
      core.opacity = (1 - k) * fl;
      halo.opacity = 0.5 * (1 - k) * fl;
    });
  }

  const PILLAR_FS = `
    uniform vec3 uColor; uniform float uT; uniform float uFade;
    varying vec2 vUv; ${NOISE}
    void main() {
      float f = fbm(vec2(vUv.x * 10.0, vUv.y * 3.0 - uT * 7.0));
      float ends = smoothstep(0.0, 0.05, vUv.y) * (1.0 - smoothstep(0.35, 1.0, vUv.y));
      float a = (0.3 + f * 1.1) * ends * uFade;
      vec3 col = mix(uColor, vec3(1.0, 0.92, 0.85), smoothstep(0.55, 0.95, f) * 0.8);
      gl_FragColor = vec4(col * a, a);
    }`;
  function pillar(pos, r, h, color, life = 0.6) {
    if (!hasFx()) return;
    const g = new THREE.Group();
    g.position.set(pos.x, 0, pos.z);
    const ms = [];
    [[r, color, 1], [r * 0.35, 0xffffff, 0.9]].forEach(([rr, col, al]) => {
      const geo = new THREE.CylinderGeometry(rr, rr * 1.1, h, 32, 1, true);
      geo.translate(0, h / 2, 0);
      const mm = smat(PILLAR_FS, { uColor: { value: new THREE.Color(col) } });
      mm.userData.al = al;
      ms.push(mm);
      g.add(new THREE.Mesh(geo, mm));
    });
    FXHQ._add(g, life, (it, dt, k) => {
      const e = easeO(it.t / 0.07);
      const shrink = k > 0.4 ? 1 - easeO((k - 0.4) / 0.6) : 1;
      g.scale.set(e * shrink + 0.001, Math.min(1, it.t / 0.1), e * shrink + 0.001);
      ms.forEach(mm => { mm.uniforms.uT.value = it.t; mm.uniforms.uFade.value = mm.userData.al * (k < 0.8 ? 1 : (1 - k) / 0.2); });
    });
  }

  const RUNE_FS = `
    uniform vec3 uColor; uniform float uT; uniform float uFade;
    varying vec2 vUv;
    void main() {
      vec2 p = (vUv - 0.5) * 2.0; float r = length(p); float a = atan(p.y, p.x);
      float ring = smoothstep(0.03, 0.0, abs(r - 0.95)) + smoothstep(0.025, 0.0, abs(r - 0.78)) + smoothstep(0.02, 0.0, abs(r - 0.42));
      float star = smoothstep(0.03, 0.0, abs(r * cos(mod(a + uT, 1.2566) - 0.6283) - 0.62)) * step(r, 0.8);
      float teeth = step(0.5, fract(a * 9.549 + uT * 2.0)) * step(0.8, r) * step(r, 0.93) * 0.6;
      float a2 = (ring + star * 0.8 + teeth) * step(r, 1.0) * uFade;
      gl_FragColor = vec4(mix(uColor, vec3(1.0), ring * 0.4) * a2, a2);
    }`;
  function runeFlash(pos, R, color, life = 0.7) {
    if (!hasFx()) return;
    const mm = smat(RUNE_FS, { uColor: { value: new THREE.Color(color) } });
    const geo = new THREE.PlaneGeometry(2, 2);
    geo.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geo, mm);
    mesh.position.set(pos.x, 0.18, pos.z);
    FXHQ._add(mesh, life, (it, dt, k) => {
      const s = R * (0.6 + easeO(k * 2) * 0.5);
      mesh.scale.set(s, 1, s);
      mesh.rotation.y = it.t * 1.6;
      mm.uniforms.uT.value = it.t;
      mm.uniforms.uFade.value = k < 0.2 ? k / 0.2 : 1 - (k - 0.2) / 0.8;
    });
  }

  function fireRing(pos, R, color, life = 0.9) {
    if (!hasFx()) return;
    const mm = smat(GLOWFLAME_FS, {});
    const geo = new THREE.CylinderGeometry(R, R, 4, 64, 1, true);
    geo.translate(0, 2, 0);
    const mesh = new THREE.Mesh(geo, mm);
    mesh.position.set(pos.x, 0, pos.z);
    FXHQ._add(mesh, life, (it, dt, k) => {
      const s = 0.6 + easeO(k * 1.5) * 0.5;
      mesh.scale.set(s, 1 - k * 0.6, s);
      mm.uniforms.uT.value = it.t;
      mm.uniforms.uFade.value = 1 - k;
    });
  }

  function sparks(pos, color, n, speed = 18) {
    if (!hasFx()) return;
    const cnt = Math.round(n * detail());
    for (let i = 0; i < cnt; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = speed * (0.5 + Math.random() * 0.7);
      FXHQ._glow(V(pos.x, 0.8, pos.z), i % 3 === 0 ? 0xffffff : color,
        V(Math.cos(a) * sp, 6 + Math.random() * 12, Math.sin(a) * sp), 0.7 + Math.random() * 0.6, 0.6 + Math.random() * 0.4, 22, Math.random() < 0.4 ? 'star' : 'glow');
    }
  }

  // ---------------- 레이드 보스 공격 임팩트 (기존 이펙트 위에 추가) ----------------
  // 🐦 파자마 새 공격 임팩트: 깃털·바람·번개 (붉은 불꽃 대신 하늘색·흰색)
  function birdImpact(game, tg) {
    const c = tg.center;
    const R = tg.reach || 5;
    const g0 = V(c.x, 0, c.z);
    const p3 = phase >= 3;
    const col = p3 ? 0x6366f1 : 0x38bdf8;
    const yaw = tg.yaw || 0;
    const fwd = V(Math.sin(yaw), 0, Math.cos(yaw));
    if (tg.patternType === 'circle') {
      runeFlash(g0, R * 1.05, col, 0.7);
      FXHQ.shockwave(g0, 0xffffff, R * 1.15);
      FXHQ.shockwave(g0, col, R * 1.45);
      sparks(g0, 0xe0f2fe, R > 8 ? 26 : 10, R > 8 ? 24 : 12);
      // 깃털 흩날림
      const cnt = Math.round((R > 8 ? 26 : 8) * detail());
      for (let i = 0; i < cnt; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 6 + Math.random() * 10;
        FXHQ._glow(V(c.x + Math.cos(a) * R * 0.3, 1 + Math.random() * 2, c.z + Math.sin(a) * R * 0.3), i % 2 ? 0xffffff : 0xfef3c7,
          V(Math.cos(a) * sp, 4 + Math.random() * 6, Math.sin(a) * sp), 1.2 + Math.random() * 0.6, 1.1, 3, 'star');
      }
      if (R >= 8.5 && R < 12) {
        // 급강하 착지: 흰 기둥 + 먼지
        pillar(g0, R * 0.35, 40, p3 ? 0x818cf8 : 0xbae6fd, 0.6);
        if (game) game.hitStopTimer = Math.max(game.hitStopTimer || 0, 0.05);
      } else if (R >= 20) {
        for (let i = 0; i < 10; i++) {
          const a = (i / 10) * Math.PI * 2;
          lightning(V(c.x, 26, c.z), V(c.x + Math.cos(a) * R * 0.9, 0.2, c.z + Math.sin(a) * R * 0.9), 0x93c5fd, 0.45, 0.16);
        }
        pillar(g0, R * 0.25, 80, col, 0.8);
        if (typeof FXHQ.screenFlash === 'function') FXHQ.screenFlash(p3 ? 0x312e81 : 0x7dd3fc, 0.3, 450);
      } else if (R < 5) {
        lightning(V(c.x + (Math.random() - 0.5) * 4, 30, c.z + (Math.random() - 0.5) * 4), V(c.x, 0.2, c.z), p3 ? 0xa5b4fc : 0xffffff, 0.25, 0.1);
      }
    } else if (tg.patternType === 'sector') {
      for (let i = 0; i < 4; i++) {
        FXHQ.slash(g0, yaw, i % 2 ? 0xffffff : col, 3, 0, (i - 1.5) * 0.3, { radius: R * (0.4 + i * 0.2), span: Math.PI * 0.7, life: 0.5, y: 1.2 + i * 0.8, noOffset: true, dir: i % 2 ? -1 : 1 });
      }
      sparks(g0.clone().addScaledVector(fwd, R * 0.5), 0xffffff, 22, 24);
    } else {
      // 깃털 / 번개 직선
      if (p3) lightning(V(c.x, 2, c.z), V(c.x + fwd.x * R, 0.6, c.z + fwd.z * R), 0xa5b4fc, 0.35, 0.18);
      const n = Math.max(4, Math.round(R / 5));
      for (let i = 0; i < n; i++) {
        const k = (i + 0.5) / n;
        FXHQ._glow(V(c.x + fwd.x * R * k, 1.2, c.z + fwd.z * R * k), i % 2 ? 0xffffff : col, V(fwd.x * 14, 2, fwd.z * 14), 1.6, 0.45, 0, 'star');
      }
      sparks(V(c.x + fwd.x * R, 0, c.z + fwd.z * R), col, 8, 10);
    }
  }

  function impact(game, tg) {
    if (!hasFx() || !tg || !tg.monster || !tg.monster.isRaidBoss) return;
    if (tg.monster.raidKind === 'bird') { birdImpact(game, tg); return; }
    const c = tg.center;
    const R = tg.reach || 5;
    const g0 = V(c.x, 0, c.z);
    const p3 = phase >= 3;
    const col = p3 ? 0xd0001a : (tg.patternType === 'line' ? 0xff6a1f : 0xff2a2a);
    const col2 = p3 ? 0x5a0010 : 0xffb070;
    const yaw = tg.yaw || 0;
    const fwd = V(Math.sin(yaw), 0, Math.cos(yaw));

    if (tg.patternType === 'circle') {
      runeFlash(g0, R * 1.05, col, 0.8);
      fireRing(g0, R * 0.95, col, 0.8);
      sparks(g0, col, R > 10 ? 26 : 10, R > 10 ? 26 : 14);
      if (R < 9) {
        // 메테오: 하늘에서 떨어지는 번개 + 섬광
        lightning(V(c.x + (Math.random() - 0.5) * 6, 40, c.z + (Math.random() - 0.5) * 6), V(c.x, 0.2, c.z), col, 0.3, 0.2);
      } else {
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2 + Math.random() * 0.3;
          lightning(V(c.x, 1.2, c.z), V(c.x + Math.cos(a) * R, 0.3, c.z + Math.sin(a) * R), col, 0.35, 0.12);
        }
        pillar(g0, R * 0.22, 70, col, 0.8);
      }
      if (R >= 20) {
        // 💥 대폭발: 바깥으로 퍼지는 기둥 캐스케이드 2중 + 거대 섬광
        const holder = new THREE.Group();
        const fired = new Set();
        const N1 = 12, N2 = 18;
        FXHQ._add(holder, 0.9, it => {
          for (let i = 0; i < N1 + N2; i++) {
            const outer = i >= N1;
            const tFire = outer ? 0.22 + (i - N1) * 0.012 : i * 0.012;
            if (fired.has(i) || it.t < tFire) continue;
            fired.add(i);
            const a = outer ? ((i - N1) / N2) * Math.PI * 2 + 0.17 : (i / N1) * Math.PI * 2;
            const rr = outer ? R * 0.9 : R * 0.5;
            const p = V(c.x + Math.cos(a) * rr, 0, c.z + Math.sin(a) * rr);
            pillar(p, 1.4, outer ? 34 : 46, i % 2 ? col : col2, 0.55);
          }
        });
        FXHQ.shockwave(g0, 0xffffff, R * 1.3);
        FXHQ.shockwave(g0, col, R * 1.6);
        if (typeof FXHQ.screenFlash === 'function') FXHQ.screenFlash(p3 ? 0x7a0010 : 0xff4020, 0.3, 450);
        if (game) game.hitStopTimer = Math.max(game.hitStopTimer || 0, 0.06);
      }
    } else if (tg.patternType === 'sector') {
      for (let i = 0; i < 3; i++) {
        FXHQ.slash(g0, yaw, i === 1 ? 0xffffff : col, 3, 0, (i - 1) * 0.35, { radius: R * (0.55 + i * 0.22), span: Math.PI * 0.7, life: 0.42, y: 1.6 + i, noOffset: true, dir: i % 2 ? -1 : 1 });
      }
      // 부채꼴 끝을 따라 불기둥 벽
      const holder = new THREE.Group();
      const fired = new Set();
      FXHQ._add(holder, 0.5, it => {
        for (let i = 0; i < 9; i++) {
          if (fired.has(i) || it.t < i * 0.03) continue;
          fired.add(i);
          const a = yaw + (i / 8 - 0.5) * Math.PI * 0.64;
          const p = V(c.x + Math.sin(a) * R * 0.92, 0, c.z + Math.cos(a) * R * 0.92);
          pillar(p, 1.1, 22, col, 0.5);
        }
      });
      sparks(g0.clone().addScaledVector(fwd, R * 0.5), col, 18, 20);
    } else {
      // 직선: 레인을 따라 번개 + 순차 불기둥
      lightning(V(c.x, 1.4, c.z), V(c.x + fwd.x * R, 1.4, c.z + fwd.z * R), col, 0.4, 0.22);
      lightning(V(c.x, 2.2, c.z), V(c.x + fwd.x * R, 0.6, c.z + fwd.z * R), 0xffffff, 0.3, 0.1);
      const holder = new THREE.Group();
      const fired = new Set();
      const n = Math.max(4, Math.round(R / 6));
      FXHQ._add(holder, 0.6, it => {
        for (let i = 0; i < n; i++) {
          if (fired.has(i) || it.t < i * 0.035) continue;
          fired.add(i);
          const p = V(c.x + fwd.x * (R * (i + 0.5) / n), 0, c.z + fwd.z * (R * (i + 0.5) / n));
          pillar(p, 1.5, 26, i % 2 ? col : col2, 0.45);
          if (i % 2 === 0) sparks(p, col, 5, 10);
        }
      });
    }
  }

  // ---------------- 매 프레임 ----------------
  function update(game, dt) {
    const inRaid = !!(game && game.raidMode);
    if (inRaid) ensureArena(game);
    if (!arena) return;
    arena.group.visible = inRaid;
    if (!inRaid) {
      if (aura) removeAura(game);
      phase = 1;
      p3Mix = 0;
      return;
    }
    const t = performance.now() / 1000;
    p3Mix += ((phase >= 3 && !isBird() ? 1 : 0) - p3Mix) * Math.min(1, dt * 1.5);
    // 🌩️ 파자마 새 3페이즈: 투기장에 번개가 계속 내리침 (연출)
    if (isBird() && phase >= 3 && hasFx()) {
      stormT -= dt;
      if (stormT <= 0) {
        stormT = 0.35 + Math.random() * 0.6;
        const a = Math.random() * Math.PI * 2, r = 10 + Math.random() * 44;
        const p = V(CENTER.x + Math.cos(a) * r, 0, CENTER.z + Math.sin(a) * r);
        lightning(V(p.x + (Math.random() - 0.5) * 8, 60, p.z + (Math.random() - 0.5) * 8), V(p.x, 0.2, p.z), Math.random() < 0.5 ? 0xa5b4fc : 0xe0f2fe, 0.22, 0.14);
      }
    }
    arena.mats.forEach(m => {
      if (m.uniforms.uT) m.uniforms.uT.value = t;
      if (m.uniforms.uP3) m.uniforms.uP3.value = p3Mix;
    });
    arena.vortex.rotation.z = t * 0.05;
    arena.crystals.forEach(c => {
      c.cr.position.y = c.base + Math.sin(t * 1.6 + c.i) * 0.5;
      c.cr.rotation.y = t * 0.8 + c.i;
      c.glow.position.y = c.cr.position.y;
      c.glow.material.opacity = 0.7;
      c.glow.material.color.setHex(phase >= 3 ? (isBird() ? 0x60a5fa : 0xff5a1f) : (isBird() ? 0x7dd3fc : 0x8f6bff));
      c.cr.material.color.setHex(phase >= 3 ? (isBird() ? 0x93c5fd : 0xff6a2a) : (isBird() ? 0xbae6fd : 0x9d7bff));
    });
    if (aura) {
      const m = aura.m;
      if (!m || !m.alive || !m.mesh || !m.mesh.parent) { removeAura(game); return; }
      aura.group.position.set(m.pos.x, 0, m.pos.z);
      aura.t += dt;
      const fin = Math.min(1, aura.t / 0.8);
      aura.sils.forEach(sl => { sl.mm.uniforms.uT.value = t; sl.mm.uniforms.uFade.value = fin; });
      if (aura.bossAura && aura.bossAura.userData.update) aura.bossAura.userData.update(t);
      aura.emit -= dt;
      if (aura.emit <= 0 && hasFx()) {
        aura.emit = 0.05 / detail();
        const a = Math.random() * Math.PI * 2;
        const rr = (m.bodyRadius || 7) * (0.8 + Math.random() * 0.6);
        FXHQ._glow(V(m.pos.x + Math.cos(a) * rr, 1 + Math.random() * 4, m.pos.z + Math.sin(a) * rr),
          isBird() ? (Math.random() < 0.3 ? 0xe0f2fe : 0x4f46e5) : (Math.random() < 0.3 ? 0xff4030 : 0x8b0000), V(0, 8 + Math.random() * 8, 0), 1.0 + Math.random() * 0.8, 0.9, -3);
      }
    }
  }

  function reset(game) {
    phase = 1;
    removeAura(game);
  }

  // 레이드 중 미니맵 (원형 투기장)
  function drawMinimap(game, ctx, size) {
    const half = size / 2;
    const sc = (size / 2 - 8) / (FLOOR_R + 2);
    ctx.fillStyle = '#1e1b24';
    ctx.fillRect(0, 0, size, size);
    ctx.fillStyle = '#3a3340';
    ctx.beginPath(); ctx.arc(half, half, FLOOR_R * sc, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = phase >= 3 ? '#b0000f' : '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(half, half, ARENA_R * sc, 0, Math.PI * 2); ctx.stroke();
    const P = (x, z) => [half + (x - CENTER.x) * sc, half + (z - CENTER.z) * sc];
    (game.monsters || []).forEach(m => {
      if (!m.alive) return;
      const [x, y] = P(m.pos.x, m.pos.z);
      ctx.fillStyle = m.isRaidBoss ? (phase >= 3 ? '#b0000f' : '#facc15') : '#ef4444';
      ctx.beginPath(); ctx.arc(x, y, m.isRaidBoss ? 7 : 3, 0, Math.PI * 2); ctx.fill();
    });
    if (window.coop && window.coop.remotes) {
      window.coop.remotes.forEach(r => {
        if (r.area !== 'raid' || !r.hasPos) return;
        const [x, y] = P(r.mesh.position.x, r.mesh.position.z);
        ctx.fillStyle = r.downed ? '#94a3b8' : '#86efac';
        ctx.beginPath(); ctx.arc(x, y, 4, 0, Math.PI * 2); ctx.fill();
      });
    }
    const [px, py] = P(game.playerPos.x, game.playerPos.z);
    ctx.fillStyle = '#38bdf8';
    ctx.beginPath(); ctx.arc(px, py, 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke();
  }

  return {
    CENTER, ARENA_R, BOSS_R,
    update, impact, phase3, setPhase, reset, drawMinimap, ensureArena,
    setTheme(k) { theme = k === 'bird' ? 'bird' : 'anoko'; },
    get phase() { return phase; }
  };
})();

export { RAIDHQ };
// 전역(window)으로도 노출: HTML onclick, 다른 모듈의 런타임 참조, 디버그 콘솔용
expose({
  get RAIDHQ() { return RAIDHQ; }
});
