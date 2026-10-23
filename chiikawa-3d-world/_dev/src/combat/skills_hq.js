// ⚙️ ES 모듈 (자동 변환): 앞쪽 모듈은 import, 뒤쪽 모듈·덮어쓰기 되는 이름은 window.이름 으로 참조
import THREE from '../core/three.js';
import { soundFx } from '../core/sound.js';
import { CHAR_CONFIGS } from '../core/models3d.js';
import { FXHQ } from '../world/fx_hq.js';
import { POLISH } from '../world/polish_hq.js';
import { expose } from '../core/expose.js';
// ==========================================================================
// 치이카와 3D 월드 - 캐릭터별 액티브 스킬 3종 (키 1 / 2 / 3) (skills_hq.js)
//  · 6명 × 3개 = 18개 스킬, 각각 고유 모션 · 이펙트 · 판정
//  · 판정은 로컬 플레이어만, 원격(협동) 플레이어는 이펙트/모션만 재생
// ==========================================================================
const SKILLS = (() => {
  const V = (x = 0, y = 0, z = 0) => new THREE.Vector3(x, y, z);
  const clamp01 = k => Math.max(0, Math.min(1, k));
  const easeO = k => 1 - Math.pow(1 - clamp01(k), 3);
  const easeIn = k => clamp01(k) * clamp01(k);
  const seg = (p, a, b) => clamp01((p - a) / (b - a)); // p가 a~b 구간 어디쯤인지 0~1
  const hasFx = () => typeof FXHQ !== 'undefined' && !!FXHQ._add;
  const detail = () => (typeof POLISH !== 'undefined' && POLISH.detail) || 1;
  const now = () => performance.now() / 1000;
  const C = hex => new THREE.Color(hex);

  function rng(seed) {
    let a = (seed >>> 0) || 1;
    return () => {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // ------------------------------------------------------------------
  // 사운드 (Web Audio 합성)
  // ------------------------------------------------------------------
  let noiseBuf = null;
  function sfx(kind, vol = 1) {
    if (typeof soundFx === 'undefined' || !soundFx.enabled) return;
    soundFx.init && soundFx.init();
    const ctx = soundFx.ctx;
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime;
      const out = ctx.createGain();
      out.connect(ctx.destination);
      const tone = (type, f0, f1, dur, g, delay = 0) => {
        const o = ctx.createOscillator();
        const gn = ctx.createGain();
        o.type = type;
        o.frequency.setValueAtTime(f0, t0 + delay);
        o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + delay + dur);
        gn.gain.setValueAtTime(0.0001, t0 + delay);
        gn.gain.exponentialRampToValueAtTime(g * vol, t0 + delay + 0.012);
        gn.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + dur);
        o.connect(gn); gn.connect(out);
        o.start(t0 + delay); o.stop(t0 + delay + dur + 0.02);
      };
      const noise = (dur, g, fType, f0, f1, delay = 0) => {
        if (!noiseBuf) {
          noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
          const d = noiseBuf.getChannelData(0);
          for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
        }
        const s = ctx.createBufferSource();
        s.buffer = noiseBuf;
        const f = ctx.createBiquadFilter();
        f.type = fType;
        f.frequency.setValueAtTime(f0, t0 + delay);
        f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t0 + delay + dur);
        const gn = ctx.createGain();
        gn.gain.setValueAtTime(g * vol, t0 + delay);
        gn.gain.exponentialRampToValueAtTime(0.0001, t0 + delay + dur);
        s.connect(f); f.connect(gn); gn.connect(out);
        s.start(t0 + delay); s.stop(t0 + delay + dur + 0.02);
      };
      switch (kind) {
        case 'whoosh': noise(0.28, 0.22, 'bandpass', 600, 2400); break;
        case 'swish': noise(0.16, 0.18, 'highpass', 2400, 6000); tone('triangle', 900, 300, 0.12, 0.05); break;
        case 'boom': tone('sine', 140, 38, 0.5, 0.35); noise(0.45, 0.25, 'lowpass', 1800, 120); break;
        case 'bigboom': tone('sine', 110, 28, 0.9, 0.45); noise(0.8, 0.32, 'lowpass', 2400, 90); break;
        case 'zap': tone('square', 1800, 220, 0.18, 0.07); noise(0.22, 0.16, 'highpass', 3000, 900); break;
        case 'chime': [880, 1108, 1318, 1760].forEach((f, i) => tone('triangle', f, f * 0.98, 0.32, 0.08, i * 0.05)); break;
        case 'pop': tone('sine', 520, 980, 0.09, 0.14); break;
        case 'thud': tone('sine', 90, 45, 0.3, 0.4); noise(0.18, 0.2, 'lowpass', 600, 80); break;
        case 'fire': noise(0.7, 0.2, 'bandpass', 900, 300); tone('sawtooth', 120, 70, 0.6, 0.04); break;
        case 'water': noise(0.5, 0.2, 'bandpass', 1400, 400); tone('sine', 400, 900, 0.2, 0.05); break;
        case 'note': { const fs = [523, 659, 784, 1047]; tone('square', fs[Math.floor(Math.random() * 4)], 600, 0.22, 0.05); break; }
        case 'shield': tone('sine', 300, 900, 0.35, 0.12); tone('triangle', 600, 1500, 0.4, 0.06, 0.05); break;
        case 'blade': tone('sawtooth', 2400, 1200, 0.12, 0.04); noise(0.12, 0.12, 'highpass', 5000, 8000); break;
        case 'sheathe': tone('square', 3200, 3000, 0.05, 0.05); tone('triangle', 1600, 1500, 0.3, 0.06, 0.04); break;
        default: tone('triangle', 700, 300, 0.15, 0.08);
      }
    } catch (e) {}
  }

  // ------------------------------------------------------------------
  // 텍스처 (♥ ♪ ★ 등 기호 스프라이트)
  // ------------------------------------------------------------------
  const symCache = {};
  function symTex(ch) {
    if (symCache[ch]) return symCache[ch];
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const g = c.getContext('2d');
    g.textAlign = 'center';
    g.textBaseline = 'middle';
    g.font = 'bold 96px sans-serif';
    g.shadowColor = 'rgba(255,255,255,0.95)';
    g.shadowBlur = 14;
    g.fillStyle = '#ffffff';
    g.fillText(ch, 64, 68);
    const t = new THREE.CanvasTexture(c);
    symCache[ch] = t;
    return t;
  }
  function symSprite(ch, color, size, additive = true) {
    const m = new THREE.SpriteMaterial({
      map: symTex(ch), color, transparent: true, depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending
    });
    const s = new THREE.Sprite(m);
    s.scale.setScalar(size);
    return s;
  }

  // ------------------------------------------------------------------
  // 공용 셰이더
  // ------------------------------------------------------------------
  const NOISE = `
    float h21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
    float vn(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(h21(i), h21(i + vec2(1, 0)), u.x), mix(h21(i + vec2(0, 1)), h21(i + vec2(1, 1)), u.x), u.y); }
    float fbm(vec2 p){ return vn(p) * 0.55 + vn(p * 2.1 + 3.7) * 0.3 + vn(p * 4.3 + 1.3) * 0.15; }`;
  const VS = `
    varying vec2 vUv; varying vec3 vN; varying vec3 vV;
    void main() {
      vUv = uv;
      vN = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(position, 1.0);
      vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`;
  function mat(fs, uniforms, side = THREE.DoubleSide) {
    return new THREE.ShaderMaterial({
      uniforms: Object.assign({ uT: { value: 0 }, uFade: { value: 1 } }, uniforms),
      vertexShader: VS, fragmentShader: fs,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side
    });
  }
  // 위로 흐르는 에너지 기둥
  const PILLAR_FS = `
    uniform vec3 uColor; uniform float uT; uniform float uFade; uniform float uTwist;
    varying vec2 vUv; ${NOISE}
    void main() {
      vec2 q = vec2(vUv.x * 10.0 + vUv.y * uTwist, vUv.y * 3.0 - uT * 6.0);
      float f = fbm(q);
      float ends = smoothstep(0.0, 0.06, vUv.y) * (1.0 - smoothstep(0.45, 1.0, vUv.y));
      float a = (0.18 + f * 0.78) * ends * uFade;
      vec3 col = mix(uColor, vec3(1.0), smoothstep(0.6, 0.95, f) * 0.45);
      gl_FragColor = vec4(col * a, a);
    }`;
  // 프레넬 보호막
  const BUBBLE_FS = `
    uniform vec3 uColor; uniform float uT; uniform float uFade;
    varying vec2 vUv; varying vec3 vN; varying vec3 vV; ${NOISE}
    void main() {
      float fr = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.4);
      float hex = fbm(vUv * vec2(18.0, 9.0) + vec2(uT * 0.6, -uT * 0.4));
      float shimmer = smoothstep(0.62, 0.8, hex) * 0.35;
      float a = (fr * 0.9 + 0.05 + shimmer * fr) * uFade;
      vec3 col = mix(uColor, vec3(1.0), fr * 0.35);
      gl_FragColor = vec4(col * a, a);
    }`;
  // 회오리
  const TORNADO_FS = `
    uniform vec3 uColor; uniform float uT; uniform float uFade;
    varying vec2 vUv; ${NOISE}
    void main() {
      float s = fbm(vec2(vUv.x * 6.0 - vUv.y * 4.0 + uT * 3.2, vUv.y * 2.0 - uT * 1.5));
      float band = smoothstep(0.45, 0.85, s);
      float ends = smoothstep(0.0, 0.12, vUv.y) * (1.0 - smoothstep(0.75, 1.0, vUv.y));
      float a = (band * 1.1 + 0.15) * ends * uFade;
      vec3 col = mix(uColor, vec3(1.0), band * 0.28);
      gl_FragColor = vec4(col * a, a);
    }`;
  // 직선 빔
  const BEAM_FS = `
    uniform vec3 uColor; uniform float uT; uniform float uFade; uniform float uLen;
    varying vec2 vUv; ${NOISE}
    void main() {
      float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
      float core = pow(across, 8.0);
      float glow = pow(across, 2.0);
      float flow = fbm(vec2(vUv.y * uLen * 0.3 - uT * 16.0, vUv.x * 3.0));
      float ends = smoothstep(0.0, 0.04, vUv.y) * (1.0 - smoothstep(0.9, 1.0, vUv.y));
      float a = (glow * 0.55 * (0.5 + 0.7 * flow) + core * 1.1) * ends * uFade;
      vec3 col = mix(uColor, vec3(1.0), clamp(core * 0.85, 0.0, 1.0));
      gl_FragColor = vec4(col * a, a);
    }`;
  // 바닥 마법진/원형 문양
  const DISC_FS = `
    uniform vec3 uColor; uniform float uT; uniform float uFade;
    varying vec2 vUv; ${NOISE}
    void main() {
      vec2 p = vUv * 2.0 - 1.0;
      float r = length(p);
      float ang = atan(p.y, p.x);
      float ring = smoothstep(0.035, 0.0, abs(r - 0.92)) + smoothstep(0.03, 0.0, abs(r - 0.7)) * 0.8;
      float spokes = smoothstep(0.92, 1.0, cos(ang * 8.0 + uT * 2.0)) * step(0.7, r) * step(r, 0.92);
      float fill = (1.0 - smoothstep(0.0, 0.95, r)) * 0.18 * (0.6 + fbm(p * 4.0 + uT) * 0.8);
      float a = (ring + spokes * 0.6 + fill) * step(r, 1.0) * uFade;
      vec3 col = mix(uColor, vec3(1.0), ring * 0.4);
      gl_FragColor = vec4(col * a, a);
    }`;

  // ------------------------------------------------------------------
  // 이펙트 빌딩 블록
  // ------------------------------------------------------------------
  function glow(pos, color, vel, size, life, grav = 0, tex = 'glow') {
    if (!hasFx()) return;
    FXHQ._glow(pos, color, vel, size, life, grav, tex);
  }

  function pillar(pos, r, h, color, life = 0.7, opts = {}) {
    if (!hasFx()) return;
    const g = new THREE.Group();
    g.position.set(pos.x, 0, pos.z);
    const mats = [];
    [[r, color, 1], [r * 0.38, 0xffffff, 0.5]].forEach(([rr, col, al]) => {
      const geo = new THREE.CylinderGeometry(rr, rr * 1.15, h, 36, 1, true);
      geo.translate(0, h / 2, 0);
      const m = mat(PILLAR_FS, { uColor: { value: C(col) }, uTwist: { value: opts.twist || 0 } });
      m.userData.al = al;
      mats.push(m);
      g.add(new THREE.Mesh(geo, m));
    });
    const grow = opts.grow || 0.08;
    FXHQ._add(g, life, (it, dt, k) => {
      const e = easeO(it.t / grow);
      const shrink = k > 0.5 ? 1 - easeO((k - 0.5) / 0.5) : 1;
      g.scale.set(e * shrink + 0.001, Math.min(1, it.t / (grow * 1.5)), e * shrink + 0.001);
      g.rotation.y += dt * (opts.spin || 2);
      mats.forEach(m => { m.uniforms.uT.value = it.t; m.uniforms.uFade.value = m.userData.al * (k < 0.8 ? 1 : (1 - k) / 0.2); });
    });
    FXHQ.shockwave(V(pos.x, 0, pos.z), color, r * 2.2);
  }

  function disc(pos, R, color, life = 0.8, getPos = null) {
    if (!hasFx()) return;
    const m = mat(DISC_FS, { uColor: { value: C(color) } });
    const geo = new THREE.PlaneGeometry(2, 2);
    geo.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geo, m);
    mesh.position.set(pos.x, 0.16, pos.z);
    FXHQ._add(mesh, life, (it, dt, k) => {
      if (getPos) { const p = getPos(); mesh.position.set(p.x, 0.16, p.z); }
      const s = R * (0.3 + easeO(it.t / 0.22) * 0.7);
      mesh.scale.set(s, 1, s);
      mesh.rotation.y = it.t * 1.4;
      m.uniforms.uT.value = it.t;
      m.uniforms.uFade.value = k < 0.75 ? 1 : (1 - k) / 0.25;
    });
  }

  function bubble(getPos, R, color, life) {
    if (!hasFx()) return;
    const m = mat(BUBBLE_FS, { uColor: { value: C(color) } }, THREE.FrontSide);
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(R, 40, 24), m);
    FXHQ._add(mesh, life, (it, dt, k) => {
      const p = getPos();
      mesh.position.set(p.x, p.y + R * 0.62, p.z);
      const pop = it.t < 0.18 ? easeO(it.t / 0.18) * 1.08 : 1.08 - Math.min(0.08, (it.t - 0.18) * 0.4);
      const wob = 1 + Math.sin(it.t * 9) * 0.025;
      mesh.scale.set(pop * wob, pop / wob, pop * wob);
      m.uniforms.uT.value = it.t;
      m.uniforms.uFade.value = k < 0.85 ? 1 : (1 - k) / 0.15;
    });
  }

  function tornado(getPos, R, H, color, life) {
    if (!hasFx()) return;
    const g = new THREE.Group();
    const layers = [];
    [[R, H, color, 1], [R * 0.62, H * 0.9, 0xffffff, 0.3]].forEach(([r, h, col, al], i) => {
      const geo = new THREE.CylinderGeometry(r, r * 0.3, h, 40, 6, true);
      geo.translate(0, h / 2, 0);
      const m = mat(TORNADO_FS, { uColor: { value: C(col) } });
      const mesh = new THREE.Mesh(geo, m);
      g.add(mesh);
      layers.push({ mesh, m, al, dir: i ? -1 : 1 });
    });
    let emit = 0;
    FXHQ._add(g, life, (it, dt, k) => {
      const p = getPos();
      g.position.set(p.x, 0, p.z);
      const e = easeO(it.t / 0.25);
      const out = k > 0.8 ? 1 - (k - 0.8) / 0.2 : 1;
      g.scale.set(e * (0.9 + out * 0.1), e, e * (0.9 + out * 0.1));
      layers.forEach(L => {
        L.mesh.rotation.y += dt * 9 * L.dir;
        L.m.uniforms.uT.value = it.t;
        L.m.uniforms.uFade.value = L.al * out;
      });
      emit -= dt;
      if (emit <= 0 && k < 0.85) {
        emit = 0.04 / detail();
        const a = Math.random() * Math.PI * 2;
        const rr = R * (0.5 + Math.random() * 0.6);
        glow(V(p.x + Math.cos(a) * rr, 0.4 + Math.random() * H * 0.6, p.z + Math.sin(a) * rr), Math.random() < 0.5 ? 0xffffff : color,
          V(-Math.sin(a) * 9, 4 + Math.random() * 5, Math.cos(a) * 9), 0.5, 0.45, -2);
      }
    });
  }

  function beam(from, yaw, len, width, color, life, y = 1.6) {
    if (!hasFx()) return;
    const g = new THREE.Group();
    const m = mat(BEAM_FS, { uColor: { value: C(color) }, uLen: { value: len } });
    for (let i = 0; i < 2; i++) {
      const geo = new THREE.PlaneGeometry(width, len);
      geo.translate(0, len / 2, 0);
      geo.rotateX(Math.PI / 2);
      const mesh = new THREE.Mesh(geo, m);
      mesh.rotation.z = i * Math.PI / 2;
      g.add(mesh);
    }
    g.position.set(from.x, y, from.z);
    g.rotation.y = yaw;
    FXHQ._add(g, life, (it, dt, k) => {
      m.uniforms.uT.value = it.t;
      const w = k < 0.1 ? easeO(k / 0.1) : 1 - easeIn((k - 0.1) / 0.9) * 0.9;
      g.scale.set(w, w, Math.min(1, it.t / 0.08));
      m.uniforms.uFade.value = k < 0.8 ? 1 : (1 - k) / 0.2;
    });
  }

  function lightning(from, to, color, life = 0.32, thick = 0.12) {
    if (!hasFx()) return;
    const pts = [];
    const n = 10;
    const dir = to.clone().sub(from);
    const side = V(-dir.z, 0, dir.x).normalize();
    if (side.lengthSq() < 0.01) side.set(1, 0, 0);
    const up = V(0, 0, 1);
    for (let i = 0; i <= n; i++) {
      const k = i / n;
      const p = from.clone().addScaledVector(dir, k);
      if (i > 0 && i < n) {
        const j = dir.length() * 0.08;
        p.addScaledVector(side, (Math.random() - 0.5) * j * 2);
        p.addScaledVector(up, (Math.random() - 0.5) * j);
      }
      pts.push(p);
    }
    const curve = new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.1);
    const g = new THREE.Group();
    const mk = (r, col, op) => {
      const m = new THREE.MeshBasicMaterial({ color: col, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false });
      g.add(new THREE.Mesh(new THREE.TubeGeometry(curve, 40, r, 6, false), m));
      return m;
    };
    const core = mk(thick * 0.8, 0xffffff, 0.85);
    const halo = mk(thick * 3.2, color, 0.45);
    FXHQ._add(g, life, (it, dt, k) => {
      const flick = Math.random() < 0.3 ? 0.35 : 1;
      core.opacity = (1 - k) * flick;
      halo.opacity = 0.45 * (1 - k) * flick;
    });
  }

  // 포물선 투사체 (별사탕 / 폭약봉 / 천검)
  function projectile(o) {
    if (!hasFx()) { if (o.onArrive) o.onArrive(); return; }
    const s = o.sym ? symSprite(o.sym, o.color, o.size || 1.2) : FXHQ._sprite(o.tex || 'star', o.color, true, 1);
    if (!o.sym) s.scale.setScalar(o.size || 1.2);
    const from = o.from.clone();
    const to = o.to.clone();
    let trailT = 0;
    let done = false;
    FXHQ._add(s, o.dur, (it, dt, k) => {
      const p = from.clone().lerp(to, k);
      p.y += Math.sin(k * Math.PI) * (o.arc || 0);
      s.position.copy(p);
      if (o.spin) s.material.rotation += dt * o.spin;
      trailT -= dt;
      if (trailT <= 0) {
        trailT = 0.025 / detail();
        glow(p, o.trail || o.color, V((Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5, (Math.random() - 0.5) * 1.5), (o.size || 1.2) * 0.45, 0.3, 0);
      }
      if (k >= 0.999 && !done) { done = true; if (o.onArrive) o.onArrive(); }
    }, () => { if (!done) { done = true; if (o.onArrive) o.onArrive(); } });
  }

  // 날아가는 영체 검
  function bladeMesh(color) {
    const m = mat(`
      uniform vec3 uColor; uniform float uT; uniform float uFade; varying vec2 vUv;
      void main() {
        float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
        float tip = smoothstep(1.0, 0.7, vUv.y);
        float edge = pow(across, 1.6) * tip * smoothstep(0.0, 0.2, vUv.y);
        float a = (edge * 0.75 + pow(across, 10.0) * 0.9 * tip) * uFade;
        gl_FragColor = vec4(mix(uColor, vec3(1.0), pow(across, 6.0)) * a, a);
      }`, { uColor: { value: C(color) } });
    const geo = new THREE.PlaneGeometry(0.55, 3.2);
    geo.translate(0, 1.6, 0);
    const g = new THREE.Group();
    const a = new THREE.Mesh(geo, m);
    const b = new THREE.Mesh(geo, m);
    b.rotation.y = Math.PI / 2;
    g.add(a, b);
    g.userData.m = m;
    return g;
  }

  function fireBurst(pos, color, n = 18, power = 8) {
    const cnt = Math.round(n * detail());
    for (let i = 0; i < cnt; i++) {
      const a = Math.random() * Math.PI * 2;
      const sp = power * (0.4 + Math.random() * 0.7);
      glow(pos, i % 5 === 0 ? 0xffffff : i % 2 ? color : 0xff6a00,
        V(Math.cos(a) * sp, power * (0.4 + Math.random() * 0.9), Math.sin(a) * sp), 0.6 + Math.random() * 0.5, 0.55 + Math.random() * 0.3, -3);
    }
    if (!hasFx()) return;
    for (let i = 0; i < Math.round(6 * detail()); i++) {
      const s = FXHQ._sprite('smoke', 0x3f3a36, false, 0.6);
      s.position.copy(pos);
      const v = V((Math.random() - 0.5) * 4, 2 + Math.random() * 3, (Math.random() - 0.5) * 4);
      const size = 2 + Math.random() * 1.5;
      FXHQ._add(s, 1.0, (it, dt, k) => {
        s.position.addScaledVector(v, dt * (1 - k));
        s.scale.setScalar(size * (0.6 + k * 1.4));
        s.material.opacity = 0.55 * (1 - k);
      });
    }
  }

  function explosion(pos, R, color) {
    if (!hasFx()) return;
    const m = mat(BUBBLE_FS, { uColor: { value: C(color) } }, THREE.FrontSide);
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 18), m);
    mesh.position.set(pos.x, 0, pos.z);
    FXHQ._add(mesh, 0.5, (it, dt, k) => {
      const s = 0.3 + easeO(k * 1.4) * R;
      mesh.scale.set(s, s * 0.8, s);
      m.uniforms.uT.value = it.t;
      m.uniforms.uFade.value = 1 - k;
    });
    const core = FXHQ._sprite('glow', 0xffffff, true, 1);
    core.position.set(pos.x, 1.2, pos.z);
    FXHQ._add(core, 0.22, (it, dt, k) => { core.scale.setScalar(R * 1.05 * (0.5 + k)); core.material.opacity = (1 - k) * 0.7; });
    FXHQ.shockwave(V(pos.x, 0, pos.z), color, R * 1.6);
    fireBurst(V(pos.x, 1, pos.z), color, 22, R * 2);
  }

  // 정면 음파 링 (세로로 선 원)
  function soundRing(from, yaw, color, dist = 11, life = 0.6) {
    if (!hasFx()) return;
    const m = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 1, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(new THREE.TorusGeometry(1, 0.08, 8, 48), m);
    const fwd = V(Math.sin(yaw), 0, Math.cos(yaw));
    mesh.rotation.y = yaw;
    FXHQ._add(mesh, life, (it, dt, k) => {
      const e = easeO(k);
      mesh.position.set(from.x + fwd.x * dist * e, 1.8, from.z + fwd.z * dist * e);
      mesh.scale.setScalar(0.6 + e * 3.4);
      m.opacity = 1 - k;
    });
  }

  function crescent(center, yaw, R, color, life = 0.38, opts = {}) {
    if (!hasFx()) return;
    FXHQ.slash(center, yaw, color, 3, opts.tiltX || 0, opts.tiltZ || 0, Object.assign({ radius: R, span: opts.span || Math.PI * 1.8, life, dir: opts.dir || 1, y: opts.y || 1.3, noOffset: true }, opts));
  }

  function floatText(ctx, text, color, y = 4.6) {
    const a = ctx.app;
    if (!a || !a.spawnFloatingText) return;
    const p = ctx.getPos();
    a.spawnFloatingText(V(p.x, p.y + y, p.z), text, color);
  }

  // ------------------------------------------------------------------
  // 판정 (로컬 플레이어 전용)
  // ------------------------------------------------------------------
  function dealHits(ctx, test, mult, opts = {}) {
    if (!ctx.local) return 0;
    const app = ctx.app;
    let n = 0;
    const center = opts.center || ctx.getPos();
    (app.monsters || []).forEach(m => {
      if (!m.alive) return;
      const r = test(m.pos, m.bodyRadius || 1.5);
      if (!r) return;
      if (opts.once) {
        const key = opts.once;
        ctx.onceHit[key] = ctx.onceHit[key] || new Set();
        if (ctx.onceHit[key].has(m)) return;
        ctx.onceHit[key].add(m);
      }
      let kb;
      if (opts.knockDir) kb = opts.knockDir.clone().multiplyScalar(opts.knock == null ? 0.6 : opts.knock);
      else {
        kb = m.pos.clone().sub(center).setY(0);
        if (kb.lengthSq() < 0.01) kb.copy(ctx.fwd);
        kb.normalize().multiplyScalar(opts.knock == null ? 0.6 : opts.knock);
      }
      app.damageMonsterPart(m, ctx.dmg * mult, kb, opts.part || 'body', false);
      if (opts.stun) m.stunTimer = Math.max(m.stunTimer || 0, opts.stun);
      n++;
    });
    if (opts.weeds !== false) {
      (app.weeds || []).forEach(w => { if (w.alive && test(w.pos, 0.6)) app.harvestWeed(w); });
      (app.chests || []).forEach(c => { if (c.alive && test(c.pos, 0.8)) app.openFieldChest(c); });
    }
    if (n > 0) {
      app.hitStopTimer = Math.max(app.hitStopTimer || 0, opts.stop || 0.035);
      app.camShake = Math.max(app.camShake || 0, opts.shake || 0.3);
    }
    return n;
  }
  const d2 = (a, b) => Math.hypot(a.x - b.x, a.z - b.z);

  // ------------------------------------------------------------------
  // 🎯 스킬 범위 표시 (바닥 영역 데칼) — 실제 판정과 같은 크기
  // ------------------------------------------------------------------
  const RANGE = 1.4; // 스킬 판정 범위 배율
  const ZONE_VS = `
    varying vec2 vL;
    void main() { vL = position.xz; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
  const ZONE_FS = `
    uniform vec3 uColor; uniform float uT; uniform float uFade; uniform float uType;
    uniform float uR; uniform float uArc; uniform float uW; uniform float uLen;
    varying vec2 vL;
    void main() {
      float d; // 영역 경계까지의 부호 거리 (안쪽 음수)
      if (uType < 0.5) {
        d = length(vL) - uR;
      } else if (uType < 1.5) {
        float r = length(vL);
        float a = abs(atan(vL.x, vL.y));
        float dr = r - uR;
        float da = (a - uArc) * max(r, 0.001);
        d = max(dr, da);
      } else {
        float dx = abs(vL.x) - uW * 0.5;
        float dz = abs(vL.y - uLen * 0.5) - uLen * 0.5;
        d = max(dx, dz);
      }
      if (d > 0.4) discard;
      float edge = smoothstep(0.34, 0.0, abs(d + 0.17));
      float inside = step(d, 0.0);
      float stripes = 0.5 + 0.5 * sin((vL.x + vL.y) * 2.2 - uT * 6.0);
      float a = (edge * 1.1 + inside * (0.2 + stripes * 0.08)) * uFade;
      vec3 col = mix(uColor, vec3(1.0), edge * 0.45);
      gl_FragColor = vec4(col * a, a);
    }`;
  // area: { t:'circle'|'cone'|'line', R, arc, w, len }  (이미 배율 적용된 값)
  function makeZone(area, color) {
    let geo;
    const pad = 0.6;
    if (area.t === 'line') {
      geo = new THREE.PlaneGeometry(area.w + pad, area.len + pad);
    } else {
      geo = new THREE.PlaneGeometry((area.R + pad) * 2, (area.R + pad) * 2);
    }
    geo.rotateX(-Math.PI / 2);
    if (area.t === 'line') geo.translate(0, 0, area.len / 2);
    const m = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: C(color) }, uT: { value: 0 }, uFade: { value: 1 },
        uType: { value: area.t === 'circle' ? 0 : area.t === 'cone' ? 1 : 2 },
        uR: { value: area.R || 1 }, uArc: { value: area.arc || 0.5 }, uW: { value: area.w || 1 }, uLen: { value: area.len || 1 }
      },
      vertexShader: ZONE_VS, fragmentShader: ZONE_FS,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geo, m);
    mesh.renderOrder = 3;
    mesh.userData.m = m;
    return mesh;
  }
  function zoneDecal(ctx, area, pos, yaw, life = 0.42) {
    if (!hasFx() || !ctx) return;
    const tnow = now();
    if (ctx._decalT && tnow - ctx._decalT < 0.09 && !area.force) return;
    ctx._decalT = tnow;
    const mesh = makeZone(area, ctx.color);
    mesh.position.set(pos.x, 0.2, pos.z);
    mesh.rotation.y = yaw || 0;
    const m = mesh.userData.m;
    FXHQ._add(mesh, life, (it, dt, k) => {
      m.uniforms.uT.value = it.t;
      m.uniforms.uFade.value = (ctx.local ? 1 : 0.55) * (k < 0.6 ? 1 : (1 - k) / 0.4);
    });
  }
  function yawOf(dir) { return Math.atan2(dir.x, dir.z); }

  function hitCircle(ctx, c, R, mult, opts = {}) {
    R *= RANGE;
    if (!opts.noDecal) zoneDecal(ctx, { t: 'circle', R }, c, 0);
    return dealHits(ctx, (p, br) => d2(p, c) <= R + br * 0.6, mult, Object.assign({ center: c }, opts));
  }
  function hitLine(ctx, from, dir, len, width, mult, opts = {}) {
    len *= RANGE; width *= RANGE;
    const f = dir.clone().setY(0).normalize();
    if (!opts.noDecal) zoneDecal(ctx, { t: 'line', len, w: width }, from, yawOf(f));
    return dealHits(ctx, (p, br) => {
      const dx = p.x - from.x, dz = p.z - from.z;
      const along = dx * f.x + dz * f.z;
      if (along < -br || along > len + br) return false;
      const side = Math.abs(dx * f.z - dz * f.x);
      return side <= width / 2 + br * 0.6;
    }, mult, Object.assign({ knockDir: opts.knockDir || f, center: from }, opts));
  }
  function hitCone(ctx, from, yaw, R, halfArc, mult, opts = {}) {
    R *= RANGE;
    if (!opts.noDecal) zoneDecal(ctx, { t: 'cone', R, arc: halfArc }, from, yaw);
    return dealHits(ctx, (p, br) => {
      const dx = p.x - from.x, dz = p.z - from.z;
      const dist = Math.hypot(dx, dz);
      if (dist - br > R) return false;
      if (dist < br + 1.2) return true;
      let a = Math.atan2(dx, dz) - yaw;
      while (a > Math.PI) a -= Math.PI * 2;
      while (a < -Math.PI) a += Math.PI * 2;
      return Math.abs(a) <= halfArc + Math.atan2(br, Math.max(0.5, dist)) * 0.7;
    }, mult, Object.assign({ center: from }, opts));
  }

  function nearestMonster(app, from, maxD) {
    let best = null, bd = maxD;
    (app.monsters || []).forEach(m => {
      if (!m.alive) return;
      const d = d2(m.pos, from);
      if (d < bd) { bd = d; best = m; }
    });
    return best;
  }

  function move(ctx, dir, dist) {
    if (!ctx.local) return;
    ctx.app.playerPos.addScaledVector(dir, dist);
  }
  function ghost(ctx) {
    if (ctx.local && ctx.app.spawnDashAfterimage) ctx.app.spawnDashAfterimage();
  }
  function shake(ctx, s) {
    if (ctx.local) ctx.app.camShake = Math.max(ctx.app.camShake || 0, s);
  }
  function flash(ctx, color, s = 0.15, ms = 160) {
    if (ctx.local && hasFx()) FXHQ.screenFlash(color, s, ms);
  }

  // 지속 실행기 (투사체 판정, 회오리 틱 등)
  const runners = [];
  function run(ctx, dur, fn) { runners.push({ ctx, dur, t: 0, fn }); }
  function later(ctx, delay, fn) {
    let fired = false;
    runners.push({ ctx, dur: delay, t: 0, fn: (c, t) => { if (!fired && t >= delay) { fired = true; fn(c); } } });
  }

  // ------------------------------------------------------------------
  // 포즈 헬퍼 (standeeGroup 자식인 팔/무기 리그)
  // ------------------------------------------------------------------
  function base(P, flip) {
    P.sg.position.set(0, 0, 0);
    P.sg.rotation.set(0, 0, 0);
    P.sg.scale.set(flip, 1, 1);
    P.ra.position.set(1.45, 1.85, 0.42);
    P.ra.rotation.set(0, 0, 0);
    P.la.position.set(-1.35, 1.75, 0.32);
    P.la.rotation.set(0, 0, 0);
    if (P.w) {
      P.w.position.set(0.15, -0.25, 0.15);
      P.w.rotation.set(Math.PI / 7, 0, -0.22);
      P.w.scale.set(1, 1, 1);
    }
  }
  // 무게 중심(높이 h) 기준으로 화면 평면 회전 (구르기/공중제비)
  function spinAroundCenter(P, ang, h, flip) {
    P.sg.rotation.z = ang;
    P.sg.position.x += h * Math.sin(ang);
    P.sg.position.y += h - h * Math.cos(ang);
  }

  // ==================================================================
  // 18개 스킬 정의
  //  cast(ctx)  : 시전 시 1회 (조준/대상 결정)
  //  ev         : [[시간(초), fn(ctx)], ...]
  //  tick(ctx,t,dt) : 매 프레임 (이동 등)
  //  pose(P,p,t,flip,ctx) : 모션
  // ==================================================================
  const DEFS = {
    // ───────────── 치이카와 ─────────────
    chiikawa: [
      {
        name: '용기 콕콕 돌진', icon: '🩷', cd: 4.5, dur: 0.78,
        desc: '전방으로 돌진하며 사스마타 5연속 찌르기',
        ev: [
          [0.02, c => { sfx('whoosh'); if (typeof POLISH !== 'undefined') POLISH.dashBurst(c.getPos(), c.fwd, 0xffc2d4); }],
          ...[0.12, 0.22, 0.32, 0.42, 0.52].map((t, i) => [t, c => {
            const p = c.getPos();
            const yaw = c.yaw + (i % 2 ? 0.12 : -0.12);
            if (hasFx()) FXHQ.thrust(p, yaw, c.color, 5.8, 1.6);
            sfx('swish', 0.7);
            hitCone(c, p, c.yaw, 5.6, 0.42, 0.75, { knock: 0.3 });
            glow(V(p.x, 2, p.z), 0xffffff, V(c.fwd.x * 8, 2, c.fwd.z * 8), 0.6, 0.35, 0, 'star');
          }]),
          [0.62, c => {
            const p = c.getPos();
            if (hasFx()) { FXHQ.thrust(p, c.yaw, 0xffffff, 7.5, 1.7); FXHQ.hitSpark(p.clone().addScaledVector(c.fwd, 4).setY(1.7), c.color, true); }
            hitCone(c, p, c.yaw, 7.2, 0.4, 1.4, { part: 'head', knock: 1.2, shake: 0.45 });
            for (let i = 0; i < 8; i++) {
              const a = Math.random() * Math.PI * 2;
              const q = p.clone().addScaledVector(c.fwd, 4).setY(1.7);
              const s = symSprite('♥', i % 2 ? 0xffffff : c.color, 0.7);
              if (hasFx()) {
                s.position.copy(q);
                const v = V(Math.cos(a) * 5, 3 + Math.random() * 4, Math.sin(a) * 5);
                FXHQ._add(s, 0.7, (it, dt, k) => { s.position.addScaledVector(v, dt); v.y -= dt * 9; s.material.opacity = 1 - k; });
              }
            }
            floatText(c, '에잇!!', '#ff85a2');
          }]
        ],
        tick: (c, t, dt) => {
          if (t > 0.08 && t < 0.58) {
            move(c, c.fwd, 14 * dt);
            c._g = (c._g || 0) - dt;
            if (c._g <= 0) { c._g = 0.06; ghost(c); }
          }
        },
        pose: (P, p, t) => {
          const jab = Math.abs(Math.sin(t * Math.PI * 10));
          P.sg.rotation.x = 0.28;
          P.sg.position.y = Math.abs(Math.sin(t * Math.PI * 5)) * 0.3;
          P.ra.position.set(1.0, 1.8 + jab * 0.2, 0.5 + jab * 2.3);
          P.ra.rotation.set(1.25, 0, -0.3);
          if (P.w) P.w.rotation.set(Math.PI * 0.34, 0, 0);
          P.la.position.set(-1.2, 1.9 + Math.sin(t * 40) * 0.25, 0.6);
          if (p > 0.78) { const k = seg(p, 0.78, 1); P.ra.position.z = 0.5 + 2.8 * (1 - k); P.sg.rotation.x = 0.28 * (1 - k); }
        }
      },
      {
        name: '울먹 눈물 방패', icon: '🫧', cd: 9, dur: 0.6,
        desc: '3초간 모든 공격을 막는 보호막 + 주변 밀쳐내기 + 체력 회복',
        cast: c => {
          if (c.local) {
            c.app.skillShieldTimer = 3.0;
            const s = c.app.stats;
            if (s) { s.hp = Math.min(s.maxHp, s.hp + Math.round(s.maxHp * 0.08)); c.app.updateHud && c.app.updateHud(); }
          }
        },
        ev: [
          [0.0, c => {
            sfx('shield');
            bubble(c.getPos, 2.7, 0xffb6cf, 3.0);
            disc(c.getPos(), 5.5, c.color, 1.0, c.getPos);
            if (hasFx()) FXHQ.shockwave(c.getPos().clone().setY(0), 0xffc2d4, 6);
            hitCircle(c, c.getPos(), 5.5, 0.6, { knock: 1.6 });
            floatText(c, '흐에… 🫧 방패!', '#ffb6cf', 5);
          }],
          [0.35, c => {
            const p = c.getPos();
            for (let i = 0; i < Math.round(14 * detail()); i++) {
              const a = (i / 14) * Math.PI * 2;
              glow(V(p.x, 2.6, p.z), i % 2 ? 0x7dd3fc : 0xffffff, V(Math.cos(a) * 6, 4 + Math.random() * 3, Math.sin(a) * 6), 0.55, 0.6, 14);
            }
          }]
        ],
        pose: (P, p, t) => {
          const sh = Math.sin(t * 70) * 0.06;
          P.sg.scale.y = 0.86 + Math.sin(p * Math.PI) * 0.06;
          P.sg.position.x = sh;
          P.la.position.set(-0.55, 2.25, 0.95);
          P.ra.position.set(0.6, 2.25, 0.95);
          P.ra.rotation.set(0.4, 0, 0.6);
          if (P.w) P.w.scale.set(0.6, 0.6, 0.6);
        }
      },
      {
        name: '별사탕 소나기', icon: '🌟', cd: 11, dur: 1.15,
        desc: '하늘로 별사탕을 던져 적 주변에 별똥별을 쏟아붓기',
        cast: c => {
          if (!c.target) {
            const m = c.local ? nearestMonster(c.app, c.origin, 15) : null;
            c.target = m ? m.pos.clone().setY(0) : c.origin.clone().addScaledVector(c.fwd, 7);
          }
        },
        ev: [
          [0.22, c => {
            sfx('chime');
            projectile({ from: c.getPos().clone().setY(2.6), to: c.getPos().clone().setY(16), color: c.color, dur: 0.25, size: 1.4, sym: '★', spin: 8 });
          }],
          ...Array.from({ length: 9 }, (_, i) => [0.42 + i * 0.065, c => {
            const r = c.rand;
            const a = r() * Math.PI * 2;
            const d = Math.sqrt(r()) * 4.6;
            const to = c.target.clone().add(V(Math.cos(a) * d, 0.2, Math.sin(a) * d));
            const cols = [0xff85a2, 0xfde047, 0x7dd3fc, 0xa7f3d0, 0xc4b5fd];
            const col = cols[i % cols.length];
            projectile({
              from: to.clone().add(V(-3 + r() * 6, 16, -3)), to, color: col, dur: 0.32, size: 1.3, sym: '★', spin: 10, trail: 0xffffff,
              onArrive: () => {
                if (hasFx()) { FXHQ.shockwave(to, col, 3); FXHQ.burst(to.clone().setY(0.8), col, 8); }
                sfx('pop', 0.8);
                hitCircle(c, to, 2.6, 0.55, { knock: 0.4 });
              }
            });
          }]),
          [1.0, c => {
            const to = c.target.clone().setY(0.2);
            projectile({
              from: to.clone().add(V(0, 20, -2)), to, color: 0xffffff, dur: 0.18, size: 3.2, sym: '★', spin: 6, trail: c.color,
              onArrive: () => {
                pillar(to, 2.2, 10, c.color, 0.7, { twist: 4 });
                disc(to, 6, 0xfde047, 0.9);
                sfx('boom');
                shake(c, 0.6);
                flash(c, c.color, 0.18);
                hitCircle(c, to, 4.8, 1.7, { part: 'head', knock: 1.4, shake: 0.6 });
              }
            });
          }]
        ],
        pose: (P, p, t, flip) => {
          if (p < 0.2) {
            const k = seg(p, 0, 0.2);
            P.sg.scale.y = 1 - k * 0.15;
            P.ra.position.set(1.2, 1.4, 0.2);
            P.la.position.set(-1.2, 1.4, 0.2);
          } else if (p < 0.6) {
            const k = seg(p, 0.2, 0.6);
            P.sg.position.y = Math.sin(k * Math.PI) * 2.2;
            P.ra.position.set(0.6, 3.2, 0.4);
            P.ra.rotation.set(-0.3, 0, 0.4);
            P.la.position.set(-0.6, 3.1, 0.4);
            P.sg.rotation.z = Math.sin(k * Math.PI * 2) * 0.15;
          } else {
            const k = seg(p, 0.6, 1);
            P.sg.position.y = Math.abs(Math.sin(k * Math.PI * 3)) * 0.4;
            P.la.position.set(-1.6, 2.6 + Math.sin(t * 20) * 0.3, 0.4);
            P.ra.position.set(1.6, 2.6 - Math.sin(t * 20) * 0.3, 0.4);
          }
        }
      }
    ],

    // ───────────── 하치와레 ─────────────
    hachiware: [
      {
        name: '파도 가르기', icon: '🌊', cd: 4.5, dur: 0.6,
        desc: '사스마타를 크게 휘둘러 전방으로 나아가는 물결 참격',
        ev: [
          [0.12, c => {
            sfx('water');
            const start = c.getPos().clone();
            crescent(start, c.yaw, 4.6, c.color, 0.32, { span: Math.PI * 1.1 });
            const len = 15;
            let emit = 0;
            run(c, 0.62, (rc, t, dt) => {
              const k = easeO(t / 0.62);
              const pos = start.clone().addScaledVector(c.fwd, 2 + k * len);
              emit -= dt;
              if (emit <= 0 && hasFx()) {
                emit = 0.055;
                FXHQ.slash(pos, c.yaw, c.color, 3, 0, 0, { radius: 3.2, span: Math.PI * 0.9, life: 0.3, y: 0.9, dir: 1, noOffset: true });
                for (let i = 0; i < Math.round(5 * detail()); i++) {
                  const side = V(c.fwd.z, 0, -c.fwd.x).multiplyScalar((Math.random() - 0.5) * 6);
                  glow(pos.clone().add(side).setY(0.6), Math.random() < 0.5 ? 0xffffff : 0x7dd3fc, V(c.fwd.x * 6, 5 + Math.random() * 4, c.fwd.z * 6), 0.55, 0.5, 18);
                }
              }
              hitCircle(rc, pos, 3.2, 1.6, { once: 'wave', knockDir: c.fwd, knock: 1.1 });
            });
          }]
        ],
        pose: (P, p) => {
          const k = easeO(seg(p, 0.05, 0.4));
          P.sg.rotation.y = -0.45 + k * 0.9;
          P.ra.position.set(1.5 - k * 1.1, 1.75, 0.65 + Math.sin(k * Math.PI) * 0.8);
          P.ra.rotation.set(0.35, 1.35 - k * 2.9, -1.35);
          P.la.position.set(-1.4, 1.9, 0.4);
        }
      },
      {
        name: '하모니카 음파', icon: '🎵', cd: 8, dur: 1.2,
        desc: '하모니카를 불어 3번의 음파로 적을 기절시키기',
        ev: [0.22, 0.52, 0.82].map((t, i) => [t, c => {
          const p = c.getPos();
          sfx('note');
          soundRing(p, c.yaw, i === 2 ? 0xffffff : c.color, 11, 0.6);
          soundRing(p, c.yaw, 0xbfdbfe, 8, 0.5);
          for (let j = 0; j < 4; j++) {
            const ch = ['♪', '♫', '♬', '♩'][(i + j) % 4];
            const s = symSprite(ch, j % 2 ? 0xffffff : c.color, 1.1);
            if (!hasFx()) break;
            const side = V(c.fwd.z, 0, -c.fwd.x).multiplyScalar((j - 1.5) * 1.3);
            s.position.copy(p).add(side).setY(2.2);
            const v = c.fwd.clone().multiplyScalar(9).add(V(0, 1.5, 0)).add(side.clone().multiplyScalar(0.8));
            FXHQ._add(s, 0.9, (it, dt, k) => {
              s.position.addScaledVector(v, dt);
              s.position.y += Math.sin(it.t * 14 + j) * dt * 3;
              s.material.opacity = 1 - k;
              s.material.rotation = Math.sin(it.t * 8) * 0.4;
            });
          }
          hitCone(c, p, c.yaw, 11.5, 0.6, 0.7, { knock: 0.9, stun: 1.3, part: i === 2 ? 'head' : 'body' });
        }]),
        pose: (P, p, t) => {
          P.sg.rotation.z = Math.sin(t * 7) * 0.12;
          P.sg.position.y = Math.abs(Math.sin(t * 7)) * 0.2;
          P.la.position.set(-0.35, 2.15, 1.0);
          P.ra.position.set(0.35, 2.15, 1.0);
          if (P.w) P.w.scale.set(0.001, 0.001, 0.001);
        }
      },
      {
        name: '푸른 회오리 상승', icon: '🌀', cd: 12, dur: 1.6,
        desc: '회전하며 거대한 회오리를 일으켜 적을 끌어당긴 뒤 폭발',
        ev: [
          [0.05, c => { sfx('whoosh'); tornado(c.getPos, 5, 11, c.color, 1.55); disc(c.getPos(), 6, c.color, 1.6, c.getPos); }],
          ...[0.2, 0.38, 0.56, 0.74, 0.92, 1.1, 1.28].map(t => [t, c => {
            sfx('swish', 0.5);
            hitCircle(c, c.getPos(), 5.8, 0.42, { knock: -0.55, stop: 0.02, shake: 0.2 });
          }]),
          [1.45, c => {
            const p = c.getPos();
            sfx('boom');
            if (hasFx()) { FXHQ.shockwave(p.clone().setY(0), 0xffffff, 9); FXHQ.burst(p.clone().setY(2), c.color, 24); }
            crescent(p, c.yaw, 6.5, c.color, 0.45, { span: Math.PI * 2 });
            shake(c, 0.65);
            flash(c, c.color, 0.15);
            hitCircle(c, p, 7, 1.8, { part: 'head', knock: 1.7, shake: 0.65 });
            floatText(c, '난또까나레!!', '#93c5fd');
          }]
        ],
        tick: (c, t, dt) => { if (t < 1.35) move(c, c.fwd, 3.2 * dt); },
        pose: (P, p, t) => {
          P.sg.rotation.y = t * 26;
          const up = p < 0.85 ? easeO(seg(p, 0, 0.3)) * 1.3 : 1.3 * (1 - seg(p, 0.85, 0.95));
          P.sg.position.y = up;
          P.ra.position.set(1.85, 1.9, 0.4);
          P.ra.rotation.set(0.2, 0, -1.5);
          P.la.position.set(-1.75, 1.95, 0.35);
        }
      }
    ],

    // ───────────── 우사기 ─────────────
    usagi: [
      {
        name: '우라! 번개 찍기', icon: '⚡', cd: 5, dur: 0.85,
        desc: '가장 가까운 적에게 뛰어올라 번개와 함께 내려찍기',
        cast: c => {
          if (!c.target) {
            const m = c.local ? nearestMonster(c.app, c.origin, 12) : null;
            c.target = m ? m.pos.clone().setY(0) : c.origin.clone().addScaledVector(c.fwd, 7);
          }
          const d = c.target.clone().sub(c.origin).setY(0);
          c.leap = d;
          c.leapLen = Math.max(0, d.length() - 1.4);
          if (d.lengthSq() > 0.01) d.normalize();
          c.leapDir = d.lengthSq() > 0.01 ? d : c.fwd.clone();
        },
        ev: [
          [0.1, c => { sfx('whoosh'); if (typeof POLISH !== 'undefined') POLISH.landing(c.getPos(), 1); }],
          [0.6, c => {
            const to = c.target.clone().setY(0.1);
            lightning(to.clone().add(V(0.5, 22, -1)), to, c.color, 0.35, 0.16);
            lightning(to.clone().add(V(-2, 18, 1)), to, 0xffffff, 0.25, 0.08);
            for (let i = 0; i < 5; i++) {
              const a = (i / 5) * Math.PI * 2 + Math.random();
              lightning(to.clone().setY(0.4), to.clone().add(V(Math.cos(a) * 4.5, 0.3, Math.sin(a) * 4.5)), c.color, 0.25, 0.06);
            }
            pillar(to, 1.4, 9, 0xfde047, 0.45, { grow: 0.04 });
            if (hasFx()) FXHQ.burst(to.clone().setY(1), 0xffffff, 16);
            sfx('zap'); sfx('boom', 0.8);
            shake(c, 0.7);
            flash(c, 0xfde047, 0.22, 140);
            hitCircle(c, to, 4.4, 2.2, { part: 'head', knock: 1.3, shake: 0.7 });
            floatText(c, '우라!!', '#fde047');
          }]
        ],
        tick: (c, t, dt) => {
          if (t > 0.12 && t < 0.58) move(c, c.leapDir, (c.leapLen / 0.46) * dt);
        },
        pose: (P, p, t, flip) => {
          if (p < 0.14) {
            const k = seg(p, 0, 0.14);
            P.sg.scale.y = 1 - k * 0.25;
            P.sg.scale.x = flip * (1 + k * 0.12);
          } else if (p < 0.7) {
            const k = seg(p, 0.14, 0.7);
            P.sg.position.y = Math.sin(k * Math.PI) * 4.6;
            spinAroundCenter(P, -flip * k * Math.PI * 2, 1.4, flip);
            P.ra.position.set(0.8, 2.8, 0.6);
            P.ra.rotation.set(-0.6, 0, 0.3);
          } else {
            const k = seg(p, 0.7, 1);
            P.sg.scale.y = 0.72 + k * 0.28;
            P.sg.scale.x = flip * (1.2 - k * 0.2);
            P.ra.position.set(1.2, 1.0, 1.6);
            P.ra.rotation.set(1.4, 0, -0.2);
          }
        }
      },
      {
        name: '야하! 연속 난타', icon: '💥', cd: 7, dur: 1.15,
        desc: '토벌봉을 미친 듯이 휘둘러 10연타 + 올려치기',
        ev: [
          ...Array.from({ length: 10 }, (_, i) => [0.1 + i * 0.08, c => {
            const p = c.getPos();
            const yaw = c.yaw + (c.rand() - 0.5) * 0.7;
            if (hasFx()) FXHQ.slash(p, yaw, i % 2 ? 0xffffff : c.color, 1, (c.rand() - 0.5) * 1.6, (c.rand() - 0.5) * 2.4,
              { radius: 3.4, span: Math.PI * 0.8, life: 0.2, dir: i % 2 ? 1 : -1, y: 1.4 + (c.rand() - 0.5) });
            if (i % 2 === 0) sfx('swish', 0.6);
            hitCone(c, p, c.yaw, 5.2, 0.75, 0.3, { knock: 0.15, stop: 0.015, shake: 0.18 });
            if (hasFx()) FXHQ.hitSpark(p.clone().addScaledVector(c.fwd, 3).add(V((c.rand() - 0.5) * 2, 1.2 + c.rand() * 1.4, 0)), c.color, false);
          }]),
          [0.98, c => {
            const p = c.getPos();
            if (hasFx()) FXHQ.slash(p, c.yaw, 0xffffff, 3, -1.3, 0, { radius: 4.8, span: Math.PI * 1.1, life: 0.3, y: 1.0 });
            pillar(p.clone().addScaledVector(c.fwd, 3.2), 1.1, 7, c.color, 0.4, { grow: 0.04 });
            sfx('boom', 0.7);
            hitCone(c, p, c.yaw, 6, 0.8, 1.5, { part: 'head', knock: 1.2, shake: 0.5 });
            floatText(c, '야하-!!', '#fde047');
          }]
        ],
        pose: (P, p, t) => {
          if (p < 0.85) {
            P.sg.rotation.z = Math.sin(t * 42) * 0.22;
            P.sg.position.y = Math.abs(Math.sin(t * 21)) * 0.35;
            P.ra.position.set(1.0 + Math.sin(t * 50) * 0.6, 1.9 + Math.cos(t * 37) * 0.7, 1.0 + Math.abs(Math.sin(t * 44)) * 1.2);
            P.ra.rotation.set(0.6, 0, Math.sin(t * 46) * 1.4);
            if (P.w) P.w.rotation.set(0.2, 0, t * 30);
            P.la.position.set(-1.3, 2.2 + Math.sin(t * 33) * 0.5, 0.6);
          } else {
            const k = seg(p, 0.85, 1);
            P.sg.position.y = Math.sin(k * Math.PI) * 1.4;
            P.ra.position.set(0.8, 1.4 + k * 2.2, 0.9);
            P.ra.rotation.set(-0.4, 0, 0.3 - k * 0.6);
          }
        }
      },
      {
        name: '폭약봉 투척', icon: '🧨', cd: 11, dur: 0.95,
        desc: '폭약봉 3개를 던져 연쇄 대폭발',
        cast: c => {
          if (!c.target) {
            const m = c.local ? nearestMonster(c.app, c.origin, 14) : null;
            c.target = m ? m.pos.clone().setY(0) : c.origin.clone().addScaledVector(c.fwd, 8);
          }
        },
        ev: [
          [0.32, c => {
            sfx('whoosh');
            const p = c.getPos();
            const side = V(c.fwd.z, 0, -c.fwd.x);
            [-1, 0, 1].forEach((s, i) => {
              const to = c.target.clone().addScaledVector(side, s * 3.2).addScaledVector(c.fwd, (i === 1 ? 0.8 : -0.6)).setY(0.3);
              projectile({
                from: p.clone().setY(2.8), to, color: 0xff7a1a, dur: 0.45 + i * 0.07, arc: 5, size: 1.1, sym: '✦', spin: 14, trail: 0xffd27a,
                onArrive: () => {
                  // 도화선 → 폭발
                  if (hasFx()) FXHQ.hitSpark(to.clone().setY(0.7), 0xffd27a, false);
                  later(c, 0.12 + i * 0.09, () => {
                    explosion(to, 3.2, 0xff6a00);
                    sfx('boom', 0.9);
                    shake(c, 0.55);
                    hitCircle(c, to, 4, 1.4, { part: i === 1 ? 'head' : 'body', knock: 1.3, shake: 0.55 });
                  });
                }
              });
            });
            floatText(c, '하아-!! 🧨', '#fb923c');
          }]
        ],
        pose: (P, p, t) => {
          if (p < 0.32) {
            const k = seg(p, 0, 0.32);
            P.sg.rotation.z = k * 0.25;
            P.ra.position.set(1.6, 2.2 + k * 0.6, -0.5);
            P.ra.rotation.set(-1.0 * k, 0, 0.8 * k);
          } else {
            const k = easeO(seg(p, 0.32, 0.55));
            P.sg.rotation.z = 0.25 - k * 0.45;
            P.sg.position.y = Math.sin(seg(p, 0.32, 0.8) * Math.PI) * 0.6;
            P.ra.position.set(1.6 - k * 0.6, 2.8 - k * 0.6, -0.5 + k * 2.0);
            P.ra.rotation.set(-1.0 + k * 2.2, 0, 0.8 - k * 1.2);
            if (P.w) P.w.scale.setScalar(p < 0.4 ? 1 : 0.001);
          }
          P.la.position.set(-1.4, 2.0, 0.6);
        }
      }
    ],

    // ───────────── 모몽가 ─────────────
    momonga: [
      {
        name: '매혹 윙크 빔', icon: '💜', cd: 5, dur: 0.95,
        desc: '귀여운 척 윙크! 하트가 흐르는 관통 빔',
        ev: [
          [0.12, c => { sfx('chime'); disc(c.getPos(), 2.6, c.color, 0.9, c.getPos); }],
          [0.3, c => {
            const p = c.getPos();
            beam(p, c.yaw, 16, 1.8, c.color, 0.55, 1.9);
            beam(p, c.yaw, 16, 0.6, 0xffffff, 0.45, 1.9);
            sfx('zap', 0.6);
            for (let i = 0; i < Math.round(10 * detail()); i++) {
              const s = symSprite('♥', i % 2 ? 0xffffff : 0xf0abfc, 0.8 + Math.random() * 0.5);
              if (!hasFx()) break;
              const d0 = 1 + Math.random() * 3;
              s.position.copy(p).addScaledVector(c.fwd, d0).setY(1.9 + (Math.random() - 0.5) * 1.2);
              const v = c.fwd.clone().multiplyScalar(16 + Math.random() * 10);
              FXHQ._add(s, 0.6, (it, dt, k) => { s.position.addScaledVector(v, dt); s.material.opacity = 1 - k; });
            }
          }],
          ...[0.32, 0.46, 0.6].map((t, i) => [t, c => {
            hitLine(c, c.getPos(), c.fwd, 16, 2.4, 0.75, { part: i === 2 ? 'head' : 'body', knock: 0.4, stop: 0.02 });
          }]),
          [0.62, c => floatText(c, '귀엽지? 💜', '#e9d5ff')]
        ],
        pose: (P, p, t, flip) => {
          P.sg.rotation.z = 0.2 * Math.sin(Math.min(1, p * 4) * Math.PI * 0.5);
          P.sg.position.y = Math.abs(Math.sin(t * 9)) * 0.12;
          P.la.position.set(-0.55, 2.45, 0.85);
          P.ra.position.set(1.8, 2.0, 1.4);
          P.ra.rotation.set(1.0, 0, -0.4);
          if (P.w) P.w.scale.set(0.001, 0.001, 0.001);
        }
      },
      {
        name: '날다람쥐 활공 급습', icon: '🪂', cd: 7.5, dur: 1.15,
        desc: '팔을 펼치고 활공하며 휩쓴 뒤 급강하',
        ev: [
          [0.06, c => { sfx('whoosh'); if (typeof POLISH !== 'undefined') POLISH.dashBurst(c.getPos(), c.fwd, 0xe9d5ff); }],
          ...[0.2, 0.32, 0.44, 0.56, 0.68, 0.8].map(t => [t, c => {
            hitCircle(c, c.getPos(), 3.2, 0.42, { knockDir: c.fwd, knock: 0.6, stop: 0.015, shake: 0.15 });
          }]),
          [0.92, c => {
            const p = c.getPos();
            sfx('thud');
            if (hasFx()) { FXHQ.shockwave(p.clone().setY(0), c.color, 6); FXHQ.burst(p.clone().setY(0.8), 0xf0abfc, 18); }
            disc(p, 5, c.color, 0.7);
            shake(c, 0.5);
            hitCircle(c, p, 4.4, 1.5, { part: 'head', knock: 1.2, shake: 0.5 });
          }]
        ],
        tick: (c, t, dt) => {
          if (t > 0.1 && t < 0.88) {
            move(c, c.fwd, 13 * dt);
            c._g = (c._g || 0) - dt;
            if (c._g <= 0) {
              c._g = 0.03 / detail();
              const p = c.getPos();
              const side = V(c.fwd.z, 0, -c.fwd.x);
              [-1, 1].forEach(s => glow(p.clone().addScaledVector(side, s * 2).setY(2.6 + Math.sin(t * Math.PI / 0.9) * 2), s > 0 ? 0xffffff : c.color, c.fwd.clone().multiplyScalar(-4), 0.55, 0.4, 0));
            }
          }
        },
        tickAll: true,
        pose: (P, p, t, flip) => {
          if (p < 0.8) {
            const k = seg(p, 0.05, 0.8);
            P.sg.position.y = Math.sin(k * Math.PI) * 2.4 + 0.2;
            P.sg.rotation.z = Math.sin(t * 6) * 0.1;
            P.sg.rotation.x = 0.35;
            P.sg.scale.x = flip * 1.12;
            P.la.position.set(-2.3, 2.1, 0.2);
            P.ra.position.set(2.3, 2.1, 0.2);
            P.ra.rotation.set(0, 0, -1.2);
            if (P.w) P.w.scale.setScalar(0.001);
          } else {
            const k = seg(p, 0.8, 1);
            P.sg.scale.y = 0.75 + k * 0.25;
            P.la.position.set(-1.3, 1.2, 0.8);
            P.ra.position.set(1.3, 1.2, 0.8);
          }
        }
      },
      {
        name: '떼쓰기 대폭발', icon: '😤', cd: 12, dur: 1.55,
        desc: '바닥을 4번 쾅쾅! 점점 커지는 충격파 후 보랏빛 대폭발',
        ev: [
          ...[0.18, 0.42, 0.66, 0.9].map((t, i) => [t, c => {
            const p = c.getPos();
            sfx('thud', 0.8);
            if (hasFx()) FXHQ.shockwave(p.clone().setY(0), i % 2 ? 0xf0abfc : c.color, 4 + i * 1.3);
            disc(p, 3.5 + i, c.color, 0.5);
            shake(c, 0.25 + i * 0.08);
            hitCircle(c, p, 4 + i * 1.1, 0.55, { knock: 0.5 + i * 0.15 });
          }]),
          [1.2, c => {
            const p = c.getPos();
            pillar(p, 3.2, 13, c.color, 0.8, { twist: 6 });
            explosion(p, 4.5, 0xc084fc);
            for (let i = 0; i < Math.round(12 * detail()); i++) {
              const s = symSprite(i % 3 ? '♥' : '★', i % 2 ? 0xffffff : 0xf0abfc, 1.0);
              if (!hasFx()) break;
              s.position.copy(p).setY(2.5);
              const a = Math.random() * Math.PI * 2;
              const v = V(Math.cos(a) * 9, 6 + Math.random() * 6, Math.sin(a) * 9);
              FXHQ._add(s, 0.9, (it, dt, k) => { s.position.addScaledVector(v, dt); v.y -= dt * 16; s.material.opacity = 1 - k; });
            }
            sfx('bigboom');
            shake(c, 0.85);
            flash(c, c.color, 0.2);
            hitCircle(c, p, 8, 2.0, { part: 'head', knock: 1.8, shake: 0.85 });
            floatText(c, '싫어싫어!! 😤', '#f0abfc');
          }]
        ],
        pose: (P, p, t, flip) => {
          if (p < 0.75) {
            P.sg.position.y = Math.abs(Math.sin(t * Math.PI * 4.2)) * 0.8;
            P.sg.rotation.z = Math.sin(t * 24) * 0.38;
            P.la.position.set(-1.4, 2.0 + Math.sin(t * 30) * 0.9, 0.5);
            P.ra.position.set(1.4, 2.0 - Math.sin(t * 30) * 0.9, 0.5);
          } else {
            const k = seg(p, 0.75, 0.82);
            P.sg.scale.set(flip * (1 + k * 0.25), 1 + k * 0.2, 1);
            P.la.position.set(-1.6, 3.0, 0.4);
            P.ra.position.set(1.6, 3.0, 0.4);
          }
        }
      }
    ],

    // ───────────── 쿠리만쥬 ─────────────
    kurimanju: [
      {
        name: '안주 굽기 화염', icon: '🔥', cd: 5.5, dur: 1.05,
        desc: '한 모금 크으~ 후 전방 부채꼴로 화염 뿜기',
        ev: [
          [0.05, c => floatText(c, '크으-…', '#fbbf24', 4.2)],
          [0.32, c => sfx('fire')],
          ...[0.38, 0.52, 0.66, 0.8].map((t, i) => [t, c => {
            hitCone(c, c.getPos(), c.yaw, 8.5, 0.5, 0.55, { knock: 0.3, part: i === 3 ? 'head' : 'body', stop: 0.02 });
          }])
        ],
        tick: (c, t, dt) => {
          if (t > 0.32 && t < 0.92) {
            c._f = (c._f || 0) - dt;
            if (c._f <= 0) {
              c._f = 0.018 / detail();
              const p = c.getPos();
              const yaw = c.yaw + (Math.random() - 0.5) * 0.9;
              const sp = 13 + Math.random() * 6;
              const cols = [0xffffff, 0xfde047, 0xfb923c, 0xef4444];
              glow(V(p.x + c.fwd.x * 1.2, 2.0, p.z + c.fwd.z * 1.2), cols[Math.floor(Math.random() * 4)],
                V(Math.sin(yaw) * sp, (Math.random() - 0.3) * 2, Math.cos(yaw) * sp), 0.9 + Math.random() * 0.9, 0.5, -4);
            }
          }
        },
        tickAll: true,
        pose: (P, p, t) => {
          if (p < 0.3) {
            const k = seg(p, 0, 0.3);
            P.sg.rotation.x = -0.3 * k;
            P.la.position.set(-0.5, 2.0 + k * 0.6, 0.9);
            P.la.rotation.set(-0.6 * k, 0, 0);
          } else {
            P.sg.rotation.x = 0.28;
            P.sg.position.x = Math.sin(t * 60) * 0.05;
            P.sg.scale.y = 1 + Math.sin(t * 30) * 0.03;
            P.la.position.set(-1.3, 1.6, 0.4);
          }
        }
      },
      {
        name: '황금 간헐천', icon: '⛲', cd: 8, dur: 1.05,
        desc: '양손 내리찍기로 전방에 황금 간헐천 5개 연속 분출',
        ev: [
          [0.26, c => { sfx('thud'); shake(c, 0.4); if (hasFx()) FXHQ.shockwave(c.getPos().clone().setY(0), c.color, 4); }],
          ...[0, 1, 2, 3, 4].map(i => [0.32 + i * 0.09, c => {
            const to = c.origin.clone().addScaledVector(c.fwd, 2.8 + i * 2.6).setY(0);
            pillar(to, 1.25 + i * 0.08, 7 + i, i % 2 ? 0xfde047 : c.color, 0.6, { grow: 0.05 });
            fireBurst(to.clone().setY(0.5), 0xfde047, 10, 9);
            sfx('boom', 0.5);
            shake(c, 0.3);
            hitCircle(c, to, 2.7, 0.85, { knock: 0.9, part: i === 4 ? 'head' : 'body' });
          }])
        ],
        pose: (P, p) => {
          if (p < 0.25) {
            const k = seg(p, 0, 0.25);
            P.sg.rotation.x = -0.2 * k;
            P.sg.position.y = k * 0.5;
            P.la.position.set(-0.6, 2.4 + k * 1.4, 0.3);
            P.ra.position.set(0.6, 2.4 + k * 1.4, 0.3);
            P.ra.rotation.set(-0.5, 0, 0);
          } else {
            const k = easeO(seg(p, 0.25, 0.35));
            P.sg.rotation.x = -0.2 + k * 0.55;
            P.sg.scale.y = 1 - k * 0.12;
            P.la.position.set(-0.7, 3.8 - k * 2.9, 0.3 + k * 1.4);
            P.ra.position.set(0.7, 3.8 - k * 2.9, 0.3 + k * 1.4);
            P.ra.rotation.set(-0.5 + k * 1.9, 0, 0);
          }
        }
      },
      {
        name: '만쥬 데굴데굴', icon: '🌰', cd: 11, dur: 1.45,
        desc: '몸을 말아 굴러가며 적을 들이받고 마무리 바운스',
        ev: [
          [0.08, c => { sfx('whoosh'); }],
          ...[0.25, 0.37, 0.49, 0.61, 0.73, 0.85, 0.97, 1.09].map(t => [t, c => {
            const side = V(c.fwd.z, 0, -c.fwd.x);
            hitCircle(c, c.getPos(), 3.0, 0.45, { knockDir: side.multiplyScalar(Math.random() < 0.5 ? 1 : -1).add(c.fwd), knock: 0.8, stop: 0.015, shake: 0.22 });
            sfx('thud', 0.4);
          }]),
          [1.27, c => {
            const p = c.getPos();
            sfx('boom');
            if (hasFx()) { FXHQ.shockwave(p.clone().setY(0), c.color, 7); FXHQ.burst(p.clone().setY(1), 0xfde047, 22); }
            disc(p, 5.5, 0xfde047, 0.8);
            shake(c, 0.6);
            hitCircle(c, p, 5, 1.6, { part: 'head', knock: 1.4, shake: 0.6 });
            floatText(c, '크으으-!!', '#fbbf24');
          }]
        ],
        tick: (c, t, dt) => {
          if (t > 0.18 && t < 1.15) {
            move(c, c.fwd, 13.5 * dt);
            c._d = (c._d || 0) - dt;
            if (c._d <= 0) {
              c._d = 0.05;
              const p = c.getPos();
              if (typeof POLISH !== 'undefined') POLISH.dust(p, 2, 1.2);
              glow(p.clone().setY(0.6), 0xfde047, V((Math.random() - 0.5) * 4, 3, (Math.random() - 0.5) * 4), 0.6, 0.4, 8, 'star');
            }
          }
        },
        tickAll: true,
        pose: (P, p, t, flip) => {
          if (p < 0.12) {
            const k = seg(p, 0, 0.12);
            P.sg.scale.set(flip * (1 - k * 0.15), 1 - k * 0.2, 1);
          } else if (p < 0.82) {
            const k = seg(p, 0.12, 0.82);
            P.sg.scale.set(flip * 0.85, 0.8, 1);
            spinAroundCenter(P, -flip * k * Math.PI * 9, 1.25, flip);
            P.sg.position.y += Math.abs(Math.sin(k * Math.PI * 6)) * 0.35;
            P.la.position.set(-0.6, 1.4, 0.7);
            P.ra.position.set(0.6, 1.4, 0.7);
          } else {
            const k = seg(p, 0.82, 1);
            P.sg.position.y = Math.sin(k * Math.PI) * 1.8;
            P.la.position.set(-1.7, 2.6, 0.4);
            P.ra.position.set(1.7, 2.6, 0.4);
          }
        }
      }
    ],

    // ───────────── 랏코 사부 ─────────────
    rakko: [
      {
        name: '순보 발도', icon: '⚡', cd: 5, dur: 0.85,
        desc: '눈 깜짝할 새 적을 관통 이동한 뒤 늦게 터지는 일섬',
        ev: [
          [0.0, c => { sfx('sheathe', 0.6); }],
          [0.18, c => {
            const from = c.getPos().clone();
            c.slashFrom = from;
            move(c, c.fwd, 9);
            ghost(c);
            beam(from, c.yaw, 9, 0.35, 0xffffff, 0.3, 1.6);
            beam(from, c.yaw, 9, 1.2, c.color, 0.25, 1.6);
            sfx('blade');
          }],
          [0.5, c => {
            const from = c.slashFrom || c.origin;
            for (let i = 0; i < 4; i++) {
              const pt = from.clone().addScaledVector(c.fwd, 1.5 + i * 2.2);
              if (hasFx()) FXHQ.slash(pt, c.yaw + Math.PI / 2, i % 2 ? 0xffffff : c.color, 1, 0, (i % 2 ? 1 : -1) * 0.9, { radius: 2.6, span: Math.PI * 0.7, life: 0.26, y: 1.6, noOffset: true });
            }
            if (hasFx()) FXHQ.hitSpark(from.clone().addScaledVector(c.fwd, 4.5).setY(1.8), c.color, true);
            sfx('sheathe');
            sfx('boom', 0.5);
            shake(c, 0.55);
            flash(c, 0xffffff, 0.15, 120);
            hitLine(c, from, c.fwd, 9.5, 2.8, 2.4, { part: 'head', knock: 0.7, shake: 0.55, stop: 0.06 });
            floatText(c, '…일섬.', '#fef9c3');
          }]
        ],
        pose: (P, p, t, flip) => {
          if (p < 0.21) {
            const k = seg(p, 0, 0.18);
            P.sg.scale.y = 1 - k * 0.18;
            P.sg.rotation.x = 0.25 * k;
            P.ra.position.set(-0.4, 1.4, 0.6);
            P.ra.rotation.set(0.2, 1.4, -1.4);
            if (p > 0.18) P.sg.scale.set(flip * 0.05, 1.3, 1);
          } else {
            P.sg.rotation.set(0.12, -0.2, 0);
            P.ra.position.set(-0.6, 1.5, 0.6);
            P.ra.rotation.set(0.18, 1.48, -1.45);
            if (P.w) P.w.scale.set(1, p < 0.5 ? 0.3 : 0.15, 1);
            P.la.position.set(-1.2, 1.5, 0.45);
          }
        }
      },
      {
        name: '천검 난무', icon: '🗡️', cd: 8.5, dur: 1.25,
        desc: '영체 검 6자루를 소환해 주변 적에게 연속 사출',
        ev: [
          [0.05, c => {
            sfx('chime');
            disc(c.getPos(), 4, c.color, 1.2, c.getPos);
            c.blades = [];
            if (!hasFx()) return;
            for (let i = 0; i < 6; i++) {
              const b = bladeMesh(i % 2 ? 0xffffff : c.color);
              c.blades.push(b);
              const a0 = (i / 6) * Math.PI * 2;
              b.userData.a0 = a0;
              FXHQ._add(b, 0.62, (it, dt, k) => {
                const p = c.getPos();
                const a = a0 + it.t * 5;
                const r = 2.6 * easeO(it.t / 0.2);
                b.position.set(p.x + Math.cos(a) * r, 2.4 + Math.sin(it.t * 8 + i) * 0.25, p.z + Math.sin(a) * r);
                b.rotation.set(0, -a, Math.PI);
                b.userData.m.uniforms.uFade.value = Math.min(1, it.t / 0.15);
                b.userData.m.uniforms.uT.value = it.t;
              });
            }
          }],
          ...[0, 1, 2, 3, 4, 5].map(i => [0.6 + i * 0.07, c => {
            const p = c.getPos();
            const a0 = (i / 6) * Math.PI * 2 + 0.6 * 5;
            const from = V(p.x + Math.cos(a0) * 2.6, 2.4, p.z + Math.sin(a0) * 2.6);
            const ms = (c.app.monsters || []).filter(m => m.alive && d2(m.pos, p) < 16).sort((a, b) => d2(a.pos, p) - d2(b.pos, p));
            const m = ms.length ? ms[i % ms.length] : null;
            const fanYaw = c.yaw + (i - 2.5) * 0.22;
            const to = m ? m.pos.clone().setY(1.5) : p.clone().add(V(Math.sin(fanYaw) * 10, 0.6, Math.cos(fanYaw) * 10));
            sfx('blade', 0.7);
            if (!hasFx()) { hitCircle(c, to, 2, 0.8, { part: i === 5 ? 'head' : 'body' }); return; }
            const b = bladeMesh(i % 2 ? 0xffffff : c.color);
            const dir = to.clone().sub(from);
            const len = dir.length();
            dir.normalize();
            const q = new THREE.Quaternion().setFromUnitVectors(V(0, 1, 0), dir);
            b.quaternion.copy(q);
            let tr = 0;
            FXHQ._add(b, 0.17, (it, dt, k) => {
              b.position.copy(from).addScaledVector(dir, len * k);
              tr -= dt;
              if (tr <= 0) { tr = 0.02; glow(b.position.clone(), c.color, V(0, 0, 0), 0.6, 0.25, 0); }
            }, () => {
              if (FXHQ.hitSpark) FXHQ.hitSpark(to, i % 2 ? 0xffffff : c.color, i === 5);
              hitCircle(c, to, 2.2, 0.8, { part: i === 5 ? 'head' : 'body', knock: 0.5 });
            });
          }]),
          [1.1, c => floatText(c, '천검(天劍).', '#fef9c3')]
        ],
        pose: (P, p, t) => {
          P.sg.position.y = Math.sin(seg(p, 0, 0.5) * Math.PI) * 0.4;
          P.ra.position.set(1.1, 2.9, 0.6);
          P.ra.rotation.set(-0.3, 0, -0.5);
          P.la.position.set(-1.2, 1.6, 0.4);
          if (p > 0.5) {
            const k = seg(p, 0.5, 0.6);
            P.ra.position.set(1.1 + k * 0.7, 2.9 - k * 0.8, 0.6 + k * 1.4);
            P.ra.rotation.set(-0.3 + k * 1.5, 0, -0.5);
          }
        }
      },
      {
        name: '달빛 반월참', icon: '🌙', cd: 12, dur: 1.35,
        desc: '두 번의 거대한 초승달 회전베기 후 달빛 낙인',
        ev: [
          [0.05, c => { sfx('sheathe', 0.6); disc(c.getPos(), 8.5, 0xfef9c3, 1.3, c.getPos); }],
          [0.32, c => {
            const p = c.getPos();
            crescent(p, c.yaw, 8, 0xfef08a, 0.42, { span: Math.PI * 1.9, dir: 1, y: 1.4 });
            crescent(p, c.yaw + 0.4, 7.2, 0xffffff, 0.36, { span: Math.PI * 1.6, dir: 1, y: 1.0 });
            sfx('blade'); sfx('whoosh');
            shake(c, 0.45);
            hitCircle(c, p, 8.5, 1.5, { knock: 0.8, shake: 0.45 });
          }],
          [0.72, c => {
            const p = c.getPos();
            crescent(p, c.yaw + Math.PI, 8, 0xfef08a, 0.42, { span: Math.PI * 1.9, dir: -1, y: 1.8, tiltZ: 0.3 });
            crescent(p, c.yaw + Math.PI - 0.4, 7.2, 0xffffff, 0.36, { span: Math.PI * 1.6, dir: -1, y: 1.2 });
            sfx('blade'); sfx('whoosh');
            shake(c, 0.45);
            hitCircle(c, p, 8.5, 1.5, { knock: 0.8, shake: 0.45 });
          }],
          [1.02, c => {
            const p = c.getPos();
            pillar(p, 2.6, 14, 0xfef9c3, 0.75, { twist: 2, spin: 0.5 });
            if (hasFx()) {
              const moon = symSprite('☾', 0xfef08a, 5);
              moon.position.copy(p).setY(9);
              FXHQ._add(moon, 0.9, (it, dt, k) => { moon.position.y = 9 - easeO(k) * 3; moon.material.opacity = k < 0.6 ? 1 : (1 - k) / 0.4; moon.scale.setScalar(5 + k * 2); });
              FXHQ.shockwave(p.clone().setY(0), 0xffffff, 10);
            }
            sfx('sheathe'); sfx('bigboom', 0.7);
            shake(c, 0.8);
            flash(c, 0xfef9c3, 0.18);
            hitCircle(c, p, 9, 1.6, { part: 'head', knock: 1.5, shake: 0.8 });
            floatText(c, '반월(半月).', '#fef9c3');
          }]
        ],
        pose: (P, p, t, flip) => {
          if (p < 0.2 || (p > 0.42 && p < 0.5) || p > 0.72) {
            P.sg.rotation.set(0.15, -0.2, 0);
            P.sg.scale.y = 0.94;
            P.ra.position.set(-0.4, 1.45, 0.6);
            P.ra.rotation.set(0.18, 1.45, -1.4);
            P.la.position.set(-1.2, 1.5, 0.45);
          } else {
            const k = p < 0.42 ? seg(p, 0.2, 0.42) : seg(p, 0.5, 0.72);
            P.sg.rotation.y = (p < 0.42 ? 1 : -1) * easeO(k) * Math.PI * 2;
            P.sg.position.y = Math.sin(k * Math.PI) * 0.6;
            P.ra.position.set(1.9, 1.9, 0.4);
            P.ra.rotation.set(0.2, 0, -1.5);
            P.la.position.set(-1.7, 2.0, 0.4);
          }
        }
      }
    ]
  };

  // 스킬별 대표 범위 (미리보기용, RANGE 배율 적용 전 값) — at:'target'은 가장 가까운 적 위치
  const AREAS = {
    chiikawa: [{ t: 'line', len: 11, w: 3.2 }, { t: 'circle', R: 5.5 }, { t: 'circle', R: 6.5, at: 'target' }],
    hachiware: [{ t: 'line', len: 13.5, w: 4.6 }, { t: 'cone', R: 11.5, arc: 0.6 }, { t: 'circle', R: 7 }],
    usagi: [{ t: 'circle', R: 4.4, at: 'target' }, { t: 'cone', R: 6, arc: 0.8 }, { t: 'circle', R: 6, at: 'target' }],
    momonga: [{ t: 'line', len: 16, w: 2.4 }, { t: 'line', len: 9, w: 4.6 }, { t: 'circle', R: 8 }],
    kurimanju: [{ t: 'cone', R: 8.5, arc: 0.5 }, { t: 'line', len: 12.2, w: 3.9 }, { t: 'line', len: 11, w: 4.3 }],
    rakko: [{ t: 'line', len: 9.5, w: 2.8 }, { t: 'circle', R: 11.5 }, { t: 'circle', R: 9 }]
  };
  function areaFor(charKey, slot) {
    const a = (AREAS[charKey] || AREAS.chiikawa)[slot - 1];
    if (!a) return null;
    return { t: a.t, R: (a.R || 0) * RANGE, arc: a.arc, w: (a.w || 0) * RANGE, len: (a.len || 0) * RANGE, at: a.at };
  }
  // 미리보기 기준 방향/위치 (가까운 적 자동 조준과 동일)
  function aimInfo(app) {
    const near = nearestMonster(app, app.playerPos, 14);
    let yaw = app.playerYaw || 0;
    if (near) {
      const d = near.pos.clone().sub(app.playerPos);
      if (Math.hypot(d.x, d.z) > 0.1) yaw = Math.atan2(d.x, d.z);
    }
    const fwd = V(Math.sin(yaw), 0, Math.cos(yaw));
    const target = near ? near.pos.clone().setY(0) : app.playerPos.clone().setY(0).addScaledVector(fwd, 7);
    return { yaw, target };
  }

  // 🖱️ 마우스가 가리키는 바닥 위치 (플레이어 높이의 평면)
  const AIM_RANGE = 17; // 지점 지정 스킬의 최대 사거리
  const _ray = new THREE.Raycaster();
  function mouseGround(app) {
    const mc = app.mouseClient;
    if (!mc || !app.camera || typeof window === 'undefined') return null;
    const ndc = new THREE.Vector2((mc.x / window.innerWidth) * 2 - 1, -(mc.y / window.innerHeight) * 2 + 1);
    _ray.setFromCamera(ndc, app.camera);
    const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), -(app.playerPos.y || 0));
    const hit = new THREE.Vector3();
    return _ray.ray.intersectPlane(plane, hit) ? hit.setY(0) : null;
  }
  // 마우스 조준 정보: 방향(yaw) + 지점(target, 사거리 안으로 제한)
  function mouseAim(app) {
    const pt = mouseGround(app);
    if (!pt) return aimInfo(app);
    const d = pt.clone().sub(app.playerPos).setY(0);
    const len = d.length();
    const yaw = len > 0.3 ? Math.atan2(d.x, d.z) : (app.playerYaw || 0);
    const target = len > AIM_RANGE ? app.playerPos.clone().setY(0).addScaledVector(d.normalize(), AIM_RANGE) : pt;
    return { yaw, target };
  }

  // 범위 미리보기 (aim=true: 마우스 조준 모드)
  let preview = null;
  function disposeZone(mesh) {
    if (!mesh) return;
    if (mesh.parent) mesh.parent.remove(mesh);
    mesh.geometry.dispose();
    mesh.userData.m.dispose();
  }
  function setPreview(app, slot, aim = false) {
    if (preview) { disposeZone(preview.mesh); disposeZone(preview.rangeMesh); }
    preview = null;
    if (!slot || !app || !app.scene || !app.gameStarted) return;
    const area = areaFor(app.activeCharKey, slot);
    if (!area) return;
    const cfg = CHAR_CONFIGS[app.activeCharKey] || {};
    const mesh = makeZone(area, cfg.accentColor || 0xffffff);
    app.scene.add(mesh);
    let rangeMesh = null;
    if (aim && area.at === 'target') {
      // 지점 지정 스킬은 최대 사거리 원도 함께 표시
      rangeMesh = makeZone({ t: 'circle', R: AIM_RANGE }, 0xffffff);
      app.scene.add(rangeMesh);
    }
    preview = { slot, mesh, rangeMesh, area, aim, charKey: app.activeCharKey };
  }
  function updatePreview(app, dt) {
    if (!preview) return;
    if (preview.charKey !== app.activeCharKey || !app.gameStarted || app.isDowned) { cancelAim(app); setPreview(app, null); return; }
    const { yaw, target } = preview.aim ? mouseAim(app) : aimInfo(app);
    const m = preview.mesh;
    if (preview.area.at === 'target') m.position.set(target.x, (app.playerPos.y || 0) + 0.22, target.z);
    else m.position.set(app.playerPos.x, (app.playerPos.y || 0) + 0.22, app.playerPos.z);
    m.rotation.y = yaw;
    const u = m.userData.m.uniforms;
    u.uT.value += dt;
    u.uFade.value = 0.95;
    if (preview.rangeMesh) {
      preview.rangeMesh.position.set(app.playerPos.x, (app.playerPos.y || 0) + 0.2, app.playerPos.z);
      preview.rangeMesh.userData.m.uniforms.uFade.value = 0.3;
    }
  }

  // ⌨️ 1·2·3: 누르면 조준 모드(마우스에 범위 표시) → 좌클릭으로 시전 / 같은 키·우클릭·Esc로 취소
  let aimSlot = 0;
  function isAiming() { return aimSlot > 0; }
  function aimToggle(app, slot) {
    if (aimSlot === slot) { cancelAim(app); return; }
    const def = getDefs(app.activeCharKey)[slot - 1];
    if (!def) return;
    if (app.skillCds && app.skillCds[slot - 1] > 0) {
      if (typeof window.showToast === 'function') window.showToast(`⏳ [${slot}] ${def.name} 재사용 대기 중… (${app.skillCds[slot - 1].toFixed(1)}초)`);
      return;
    }
    aimSlot = slot;
    setPreview(app, slot, true);
    if (typeof document !== 'undefined') document.body.classList.add('skill-aiming');
    showAimHint(def, slot, (CHAR_CONFIGS[app.activeCharKey] || {}).accentColor || 0xffffff);
  }
  function cancelAim(app) {
    if (!aimSlot) return;
    aimSlot = 0;
    setPreview(app, null);
    if (typeof document !== 'undefined') document.body.classList.remove('skill-aiming');
    hideAimHint();
  }
  // 좌클릭: 마우스 방향/지점으로 시전
  function aimConfirm(app) {
    if (!aimSlot) return false;
    // 다른 스킬/궁극기 시전 중이면 조준을 유지한 채 무시 (끝난 뒤 다시 클릭)
    if (app.skillLock > 0 || (app.ultTimer && app.ultTimer > 0)) return true;
    const slot = aimSlot;
    const aim = mouseAim(app);
    cancelAim(app);
    if (typeof app.triggerSkill === 'function') app.triggerSkill(slot, aim);
    return true;
  }
  // 예전 방식 호환 (키를 누르고 있는 동안 미리보기)
  function aimStart(app, slot) { aimToggle(app, slot); }
  function aimEnd() { return false; }

  let aimHint = null;
  function showAimHint(def, slot, color) {
    if (typeof document === 'undefined') return;
    if (!aimHint) {
      aimHint = document.createElement('div');
      aimHint.id = 'skill-aim-hint';
      document.body.appendChild(aimHint);
    }
    const c = new THREE.Color(color);
    aimHint.style.setProperty('--sk', `rgb(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)})`);
    aimHint.textContent = '';
    const k = document.createElement('span');
    k.className = 'sah-key';
    k.textContent = String(slot);
    const t = document.createElement('span');
    t.textContent = `${def.icon} ${def.name}  ·  🖱️ 좌클릭 시전 · [${slot}] / 우클릭 / Esc 취소`;
    aimHint.append(k, t);
    aimHint.classList.add('show');
  }
  function hideAimHint() { if (aimHint) aimHint.classList.remove('show'); }

  // ⚔️ 평타 범위 가이드 (다음 콤보의 실제 판정 범위를 바닥에 표시)
  let atkGuide = null;
  function shapeArea(shape) {
    return shape.halfArc >= Math.PI - 0.01 ? { t: 'circle', R: shape.reach } : { t: 'cone', R: shape.reach, arc: shape.halfArc };
  }
  function attackGuide(app, shape, color, show) {
    if (!app || !app.scene || !shape) return;
    const area = shapeArea(shape);
    const key = `${area.t}|${area.R}|${area.arc || 0}|${color}`;
    if (!atkGuide || atkGuide.key !== key) {
      if (atkGuide) {
        if (atkGuide.mesh.parent) atkGuide.mesh.parent.remove(atkGuide.mesh);
        atkGuide.mesh.geometry.dispose();
        atkGuide.mesh.userData.m.dispose();
      }
      const mesh = makeZone(area, color);
      app.scene.add(mesh);
      atkGuide = { mesh, key };
    }
    const m = atkGuide.mesh;
    m.visible = !!show;
    if (!show) return;
    m.position.set(app.playerPos.x, 0.19, app.playerPos.z);
    m.rotation.y = app.playerYaw || 0;
    const u = m.userData.m.uniforms;
    u.uT.value = performance.now() / 1000;
    u.uFade.value = 0.42;
  }
  // 평타를 휘두른 순간 실제 판정 범위를 진하게 표시
  function attackFlash(app, shape, color) {
    if (!shape) return;
    zoneDecal({ color, local: true }, Object.assign({ force: true }, shapeArea(shape)), app.playerPos, app.playerYaw || 0, 0.32);
  }

  // ------------------------------------------------------------------
  // 실행부
  // ------------------------------------------------------------------
  const casts = [];
  // 모든 스킬 쿨타임 10초
  const SKILL_CD = 10;
  Object.values(DEFS).forEach(list => list.forEach(d => { d.cd = SKILL_CD; }));

  function makeCtx(app, local, charKey, slot, o) {
    const cfg = (typeof CHAR_CONFIGS !== 'undefined' && CHAR_CONFIGS[charKey]) || {};
    const yaw = o.yaw || 0;
    const fwd = V(Math.sin(yaw), 0, Math.cos(yaw));
    return {
      app, local, charKey, slot, cfg,
      color: cfg.accentColor || 0xffffff,
      yaw, fwd, right: V(fwd.z, 0, -fwd.x),
      origin: o.origin.clone().setY(0),
      target: o.target ? o.target.clone() : null,
      getPos: o.getPos,
      rand: rng(o.seed || 1),
      seed: o.seed || 1,
      dmg: o.dmg || 0,
      onceHit: {}
    };
  }

  function startCast(ctx, def, poseTarget) {
    if (def.cast) def.cast(ctx);
    const cast = { ctx, def, t: 0, idx: 0, ev: def.ev.slice().sort((a, b) => a[0] - b[0]), poseTarget };
    casts.push(cast);
    return cast;
  }

  function getDefs(charKey) { return DEFS[charKey] || DEFS.chiikawa; }

  // 로컬 플레이어 시전
  function cast(app, slot, aim = null) {
    const charKey = app.activeCharKey;
    const defs = getDefs(charKey);
    const def = defs[slot - 1];
    if (!def) return false;
    if (!app.skillCds) app.skillCds = [0, 0, 0];
    if (app.skillCds[slot - 1] > 0) {
      if (typeof window.showToast === 'function') window.showToast(`⏳ [${slot}] ${def.name} 재사용 대기 중… (${app.skillCds[slot - 1].toFixed(1)}초)`);
      return false;
    }
    app.skillCds[slot - 1] = def.cd;
    app.skillCdMax = app.skillCdMax || [1, 1, 1];
    app.skillCdMax[slot - 1] = def.cd;

    // 조준: 마우스로 지정했으면 그 방향, 아니면 가까운 적 방향 (없으면 현재 바라보는 방향)
    const faceDir = d => {
      if (Math.hypot(d.x, d.z) <= 0.1) return;
      app.playerYaw = Math.atan2(d.x, d.z);
      const rx = Math.cos(app.camYaw), rz = -Math.sin(app.camYaw);
      app.facingFlip = (d.x * rx + d.z * rz) >= 0 ? 1 : -1;
    };
    if (aim) {
      faceDir(V(Math.sin(aim.yaw), 0, Math.cos(aim.yaw)));
    } else {
      const near = nearestMonster(app, app.playerPos, 14);
      if (near) faceDir(near.pos.clone().sub(app.playerPos));
    }
    const cfg = CHAR_CONFIGS[charKey];
    const s = app.stats || {};
    const buff = s.ramenBuffTimer > 0 ? 1.35 : 1.0;
    // 스킬 1타(배율 1.0) = 평타(0.7배)의 3배
    const dmg = ((cfg.atk || 20) + (s.level || 1) * 4 + ((s.weaponLv || 1) - 1) * 9 + (s.certLevel || 0) * 6) * buff * 0.7 * 3 * (typeof window.SHOPHQ !== 'undefined' ? window.SHOPHQ.atkMult(s) : 1);
    const seed = (Math.random() * 1e9) | 0;
    const ctx = makeCtx(app, true, charKey, slot, {
      yaw: app.playerYaw, origin: app.playerPos, getPos: () => app.playerPos, seed, dmg,
      target: aim && aim.target ? aim.target.clone().setY(0) : null
    });
    app.attackTimer = 0;
    app.comboStep = 0;
    const c = startCast(ctx, def, null);
    app.skillAnim = { charKey, slot, dur: def.dur, cast: c };
    app.skillLock = def.dur;
    if (app.playerMesh && app.playerMesh.userData.setExpression) app.playerMesh.userData.setExpression(slot === 2 && charKey === 'chiikawa' ? 'sad' : 'attack');
    if (typeof soundFx !== 'undefined' && soundFx.playAttack) soundFx.playAttack();
    if (window.coop && window.coop.sendEvent) {
      const r2 = v => Math.round(v * 100) / 100;
      const ev = { k: slot, yaw: r2(ctx.yaw), x: r2(ctx.origin.x), z: r2(ctx.origin.z), s: seed };
      if (ctx.target) { ev.tx = r2(ctx.target.x); ev.tz = r2(ctx.target.z); }
      try { window.coop.sendEvent('skl', ev); } catch (e) {}
    }
    // 시전 순간 스킬 전체 범위를 바닥에 표시
    const area = areaFor(charKey, slot);
    if (area) {
      const tpos = area.at === 'target' ? (ctx.target || aimInfo(app).target) : ctx.origin;
      zoneDecal(ctx, Object.assign({ force: true }, area), tpos, ctx.yaw, Math.min(1.1, def.dur + 0.2));
      ctx._decalT = 0;
    }
    showSkillBanner(def, slot, ctx.color);
    updateHud(app, true);
    return c;
  }

  // 협동: 원격 플레이어 스킬 재생 (이펙트/모션만)
  function playRemote(app, r, ev) {
    const defs = getDefs(r.charKey);
    const slot = Math.max(1, Math.min(3, ev.k | 0));
    const def = defs[slot - 1];
    if (!def || !r.mesh) return;
    const ctx = makeCtx(app, false, r.charKey, slot, {
      yaw: ev.yaw || 0,
      origin: V(ev.x || r.mesh.position.x, 0, ev.z || r.mesh.position.z),
      target: ev.tx != null ? V(ev.tx, 0, ev.tz) : null,
      getPos: () => r.mesh.position,
      seed: ev.s || 1
    });
    r.atkTimer = 0;
    r.skillAnim = { charKey: r.charKey, slot, dur: def.dur, cast: startCast(ctx, def, r) };
    const area = areaFor(r.charKey, slot);
    if (area) zoneDecal(ctx, Object.assign({ force: true }, area), area.at === 'target' && ctx.target ? ctx.target : ctx.origin, ctx.yaw, Math.min(1.1, def.dur + 0.2));
    ctx._decalT = 0;
  }

  // 매 프레임 (main.updatePlayer에서 호출)
  function update(app, dt) {
    if (app.skillCds) for (let i = 0; i < 3; i++) if (app.skillCds[i] > 0) app.skillCds[i] = Math.max(0, app.skillCds[i] - dt);
    if (app.skillLock > 0) app.skillLock = Math.max(0, app.skillLock - dt);
    if (app.skillShieldTimer > 0) app.skillShieldTimer = Math.max(0, app.skillShieldTimer - dt);
    if (app.skillAnim && app.skillAnim.cast.t >= app.skillAnim.dur) app.skillAnim = null;

    for (let i = casts.length - 1; i >= 0; i--) {
      const c = casts[i];
      const ctx = c.ctx;
      // 원격 플레이어가 사라졌으면 중단
      if (!ctx.local && c.poseTarget && !c.poseTarget.mesh.parent) { c.t = c.def.dur; casts.splice(i, 1); continue; }
      // 로컬: 기절/스테이지 이동 등으로 취소
      if (ctx.local && (app.isDowned || !app.gameStarted)) { c.t = c.def.dur; casts.splice(i, 1); app.skillAnim = null; app.skillLock = 0; continue; }
      c.t += dt;
      try {
        if (c.def.tick && (ctx.local || c.def.tickAll)) c.def.tick(ctx, c.t, dt);
        while (c.idx < c.ev.length && c.ev[c.idx][0] <= c.t) {
          c.ev[c.idx][1](ctx);
          c.idx++;
        }
      } catch (e) {
        console.warn('스킬 실행 오류:', e);
        c.idx = c.ev.length;
      }
      if (c.idx >= c.ev.length && c.t >= c.def.dur) casts.splice(i, 1);
    }
    updatePreview(app, dt);
    for (let i = runners.length - 1; i >= 0; i--) {
      const r = runners[i];
      r.t += dt;
      try { r.fn(r.ctx, Math.min(r.t, r.dur), dt); } catch (e) { r.t = r.dur; }
      if (r.t >= r.dur) runners.splice(i, 1);
    }
    updateHud(app, false);
  }

  // updateMotion 직후 호출 → 스킬 모션 덮어쓰기
  function applyPose(mesh, anim, isRemote) {
    if (!mesh || !anim) return false;
    const t = anim.cast ? anim.cast.t : 0;
    if (t >= anim.dur) return false;
    const parts = mesh.userData.parts;
    if (!parts || !parts.standeeGroup) return false;
    const def = getDefs(anim.charKey)[anim.slot - 1];
    if (!def || !def.pose) return false;
    const P = { sg: parts.standeeGroup, la: parts.leftArmPivot, ra: parts.rightArmPivot, w: parts.weaponMesh };
    const flip = parts.standeeGroup.scale.x >= 0 ? 1 : -1;
    base(P, flip);
    try { def.pose(P, t / anim.dur, t, flip); } catch (e) {}
    // 모션 끝 0.1초 동안 원래 자세로 부드럽게 복귀
    const tail = anim.dur - t;
    if (tail < 0.1) {
      const k = tail / 0.1;
      P.sg.position.multiplyScalar(k);
      P.sg.rotation.x *= k; P.sg.rotation.z *= k;
    }
    if (parts.ultPropGroup) parts.ultPropGroup.visible = false;
    return true;
  }

  // 보호막 판정 (main.resolveTelegraphAttack에서 호출)
  function absorbHit(app) {
    if (!(app.skillShieldTimer > 0)) return false;
    if (typeof FXHQ !== 'undefined') FXHQ.hitSpark(app.playerPos.clone().setY(2.2), 0xffb6cf, true);
    sfx('shield', 0.6);
    if (app.spawnFloatingText) app.spawnFloatingText(app.playerPos.clone().add(V(0, 4, 0)), '🫧 방패로 막았다!', '#ffb6cf');
    return true;
  }

  // ------------------------------------------------------------------
  // HUD
  // ------------------------------------------------------------------
  let hudChar = null;
  const hudCache = ['', '', ''];
  function updateHud(app, force) {
    if (typeof document === 'undefined') return;
    const charKey = app.activeCharKey;
    if (force || hudChar !== charKey) {
      hudChar = charKey;
      const defs = getDefs(charKey);
      defs.forEach((d, i) => {
        const btn = document.getElementById(`skill-btn-${i + 1}`);
        if (!btn) return;
        const ic = btn.querySelector('.skill-sq-icon');
        const nm = btn.querySelector('.skill-sq-name');
        if (ic) ic.textContent = d.icon;
        if (nm) nm.textContent = d.name;
        btn.title = `[${i + 1}] ${d.name} — ${d.desc} (재사용 ${d.cd}초)`;
        if (!btn._pv) {
          btn._pv = true;
          const slot = i + 1;
          btn.addEventListener('mouseenter', () => setPreview(window.gameApp, slot));
          btn.addEventListener('mouseleave', () => setPreview(window.gameApp, null));
          // 모바일: 버튼을 누르고 있는 동안 범위 표시
          btn.addEventListener('touchstart', () => setPreview(window.gameApp, slot), { passive: true });
          btn.addEventListener('touchend', () => setTimeout(() => setPreview(window.gameApp, null), 250), { passive: true });
        }
      });
    }
    // 궁극기 쿨타임 & HP 물약 개수
    const ultBtn = document.getElementById('ult-btn');
    if (ultBtn) {
      const cd = app.skillCooldown > 0 ? app.skillCooldown : 0;
      const key = cd > 0 ? `${Math.round((cd / (app.ultCooldownMax || 30)) * 100)}|${Math.ceil(cd)}` : 'ready';
      if (force || ultBtn._k !== key) {
        const was = ultBtn._k && ultBtn._k !== 'ready';
        ultBtn._k = key;
        const ov = ultBtn.querySelector('.skill-cd');
        const num = ultBtn.querySelector('.skill-cd-num');
        if (key === 'ready') {
          if (ov) ov.style.width = '0%';
          if (num) num.textContent = '';
          ultBtn.classList.remove('cooling');
          if (was) { ultBtn.classList.remove('ready-pop'); void ultBtn.offsetWidth; ultBtn.classList.add('ready-pop'); }
        } else {
          const [pct, txt] = key.split('|');
          if (ov) ov.style.width = `${pct}%`;
          if (num) num.textContent = `${txt}초`;
          ultBtn.classList.add('cooling');
        }
      }
    }
    const potBtn = document.getElementById('potion-btn');
    if (potBtn && app.stats) {
      const n = Math.max(0, app.stats.potions | 0);
      const pk = `${n}|${app.potionCd > 0 ? 1 : 0}`;
      if (force || potBtn._k !== pk) {
        potBtn._k = pk;
        const nm = potBtn.querySelector('.skill-sq-name');
        if (nm) nm.textContent = `물약 ×${n}`;
        potBtn.classList.toggle('empty', n <= 0);
        potBtn.classList.toggle('cooling', app.potionCd > 0);
        potBtn.title = `[R] HP 물약 — 최대 체력의 50% 회복 (보유 ${n}/5개 · 상점에서 구매)`;
      }
    }
    const cds = app.skillCds || [0, 0, 0];
    const max = app.skillCdMax || [1, 1, 1];
    for (let i = 0; i < 3; i++) {
      const v = cds[i] > 0 ? Math.ceil(cds[i] * 10) / 10 : 0;
      const key = v > 0 ? `${Math.round((cds[i] / max[i]) * 100)}|${cds[i] >= 1 ? Math.ceil(cds[i]) : v.toFixed(1)}` : 'ready';
      if (!force && hudCache[i] === key) continue;
      const btn = document.getElementById(`skill-btn-${i + 1}`);
      if (!btn) continue;
      const wasCooling = hudCache[i] && hudCache[i] !== 'ready';
      hudCache[i] = key;
      const ov = btn.querySelector('.skill-cd');
      const num = btn.querySelector('.skill-cd-num');
      if (key === 'ready') {
        if (ov) ov.style.height = '0%';
        if (num) num.textContent = '';
        btn.classList.remove('cooling');
        if (wasCooling) { btn.classList.remove('ready-pop'); void btn.offsetWidth; btn.classList.add('ready-pop'); }
      } else {
        const [pct, txt] = key.split('|');
        if (ov) ov.style.height = `${pct}%`;
        if (num) num.textContent = txt;
        btn.classList.add('cooling');
      }
    }
  }

  // 스킬 이름 미니 배너 (화면 하단 중앙, 시야 방해 없음)
  let banner = null;
  function showSkillBanner(def, slot, color) {
    if (typeof document === 'undefined') return;
    if (!banner) {
      banner = document.createElement('div');
      banner.id = 'skill-cast-banner';
      document.body.appendChild(banner);
    }
    const c = new THREE.Color(color);
    banner.style.setProperty('--sk', `rgb(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)})`);
    banner.innerHTML = `<span class="skb-key">${slot}</span><span class="skb-icon">${def.icon}</span><span class="skb-name"></span>`;
    banner.querySelector('.skb-name').textContent = def.name;
    banner.classList.remove('show');
    void banner.offsetWidth;
    banner.classList.add('show');
  }

  return {
    DEFS, AREAS, RANGE, cast, playRemote, update, applyPose, absorbHit, updateHud, getDefs, setPreview,
    aimStart, aimEnd, aimToggle, aimConfirm, cancelAim, isAiming, attackGuide, attackFlash,
    get activeCount() { return casts.length + runners.length; }
  };
})();

export { SKILLS };
// 전역(window)으로도 노출: HTML onclick, 다른 모듈의 런타임 참조, 디버그 콘솔용
expose({
  get SKILLS() { return SKILLS; }
});
