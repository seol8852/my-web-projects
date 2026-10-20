// ==========================================================================
// 치이카와 3D 월드 - [HQ] 체감 품질 폴리싱 모듈 (polish_hq.js)
//  1) 카메라를 가리는 나무 자동 반투명      2) 뒤돌아 걸을 때 '뒷모습' 일러스트
//  3) 애니메 스타일 데미지 숫자             4) 카메라 주변 촘촘한 풀숲
//  5) 피격 피드백(붉은 화면·무적 깜빡임·넉백) 6) 빛나는 보스 공격 예고 장판
//  7) 착지·대시·발걸음 이펙트               8) 그래픽 품질 설정(낮음/보통/높음)
//  9) 반짝이는 물결 셰이더 물               10) HUD 정리(접기·간소화 모드)
// ==========================================================================

const POLISH = (() => {
  // ------------------------------------------------------------------
  // 공용
  // ------------------------------------------------------------------
  const lsGet = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : v; } catch (e) { return d; } };
  const lsSet = (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} };
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);

  // ------------------------------------------------------------------
  // 1) 카메라 가림 나무 반투명
  // ------------------------------------------------------------------
  const occluders = [];
  const segA = new THREE.Vector3();
  const segB = new THREE.Vector3();
  const tmp = new THREE.Vector3();

  function registerOccluder(obj, centerOffsetY, radius) {
    const mats = [];
    const outlines = [];
    obj.traverse(o => {
      if (!o.isMesh || !o.material) return;
      if (o.material.side === THREE.BackSide) { outlines.push(o); return; }
      (Array.isArray(o.material) ? o.material : [o.material]).forEach(m => {
        if (!mats.includes(m)) mats.push(m);
      });
    });
    occluders.push({ obj, centerOffsetY, radius, mats, outlines, fade: 0, faded: false });
  }

  function distPointSegment(p, a, b) {
    const abx = b.x - a.x, aby = b.y - a.y, abz = b.z - a.z;
    const len2 = abx * abx + aby * aby + abz * abz || 1;
    let t = ((p.x - a.x) * abx + (p.y - a.y) * aby + (p.z - a.z) * abz) / len2;
    t = Math.max(0, Math.min(1, t));
    const dx = a.x + abx * t - p.x, dy = a.y + aby * t - p.y, dz = a.z + abz * t - p.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  function updateOccluders(camera, target, dt) {
    segA.copy(camera.position);
    segB.set(target.x, target.y + 2.2, target.z);
    for (const oc of occluders) {
      const p = oc.obj.position;
      const s = oc.obj.scale.x;
      // 거리 컷 (먼 나무는 계산 생략)
      if (Math.abs(p.x - segB.x) > 40 || Math.abs(p.z - segB.z) > 40) {
        if (oc.fade === 0) continue;
      }
      tmp.set(p.x, p.y + oc.centerOffsetY * s, p.z);
      const d = distPointSegment(tmp, segA, segB);
      const want = d < oc.radius * s ? 1 : 0;
      oc.fade += (want - oc.fade) * Math.min(1, dt * 10);
      if (Math.abs(oc.fade - want) < 0.01) oc.fade = want;
      const op = 1 - oc.fade * 0.75;
      if (oc.fade > 0.01 && !oc.faded) {
        oc.faded = true;
        oc.mats.forEach(m => { m.transparent = true; m.depthWrite = false; m.needsUpdate = true; });
        oc.outlines.forEach(o => { o.visible = false; });
      }
      if (oc.faded) oc.mats.forEach(m => { m.opacity = op; });
      if (oc.fade <= 0.01 && oc.faded) {
        oc.faded = false;
        oc.mats.forEach(m => { m.transparent = false; m.depthWrite = true; m.opacity = 1; m.needsUpdate = true; });
        oc.outlines.forEach(o => { o.visible = true; });
      }
    }
  }

  // ------------------------------------------------------------------
  // 2) 뒷모습 텍스처 (앞모습 색 분포를 크게 흐려 얼굴을 지우고 실루엣 외곽선만 남김)
  // ------------------------------------------------------------------
  function makeBackTexture(tex) {
    if (!tex || !tex.image || !tex.userData || !tex.userData.cleanReady) return null;
    if (tex.userData.backTex) return tex.userData.backTex;
    const src = tex.image;
    const S = 512;
    const mk = () => { const c = document.createElement('canvas'); c.width = S; c.height = S; return c; };
    // 실루엣 침식 마스크
    const ero = mk();
    const ex = ero.getContext('2d');
    ex.drawImage(src, 0, 0, S, S);
    ex.globalCompositeOperation = 'destination-in';
    const r = 5;
    [[r, 0], [-r, 0], [0, r], [0, -r], [r * 0.7, r * 0.7], [-r * 0.7, r * 0.7], [r * 0.7, -r * 0.7], [-r * 0.7, -r * 0.7]].forEach(([dx, dy]) => {
      ex.drawImage(src, dx, dy, S, S);
    });
    // 흐린 색 채우기
    const fill = mk();
    const fx = fill.getContext('2d');
    if ('filter' in fx) {
      // 아주 강하게 흐려 눈·입 같은 얼굴 디테일은 지우고 몸/귀의 색 분포만 남김
      fx.filter = 'blur(48px) saturate(1.05)';
      fx.drawImage(src, 0, 0, S, S);
      fx.drawImage(src, 0, 0, S, S);
      fx.filter = 'none';
    } else {
      fx.fillStyle = '#f8fafc';
      fx.fillRect(0, 0, S, S);
    }
    // 위는 밝고 아래는 살짝 어두운 셰이딩
    const g = fx.createLinearGradient(0, 0, 0, S);
    g.addColorStop(0, 'rgba(255,255,255,0.18)');
    g.addColorStop(0.6, 'rgba(255,255,255,0)');
    g.addColorStop(1, 'rgba(60,40,40,0.16)');
    fx.fillStyle = g;
    fx.fillRect(0, 0, S, S);
    fx.globalCompositeOperation = 'destination-in';
    fx.drawImage(ero, 0, 0);
    // 최종 = 진한 외곽 실루엣 + 채우기
    const out = mk();
    const ox = out.getContext('2d');
    ox.drawImage(src, 0, 0, S, S);
    ox.globalCompositeOperation = 'source-in';
    ox.fillStyle = '#3a2a26';
    ox.fillRect(0, 0, S, S);
    ox.globalCompositeOperation = 'source-over';
    ox.drawImage(fill, 0, 0);
    const t = new THREE.CanvasTexture(out);
    t.minFilter = THREE.LinearMipmapLinearFilter;
    t.anisotropy = 8;
    tex.userData.backTex = t;
    return t;
  }

  function attachBackView(plushie, frontTex) {
    const ud = plushie.userData;
    ud.isBackView = false;
    ud.setBackView = on => {
      if (on === ud.isBackView) return;
      const parts = ud.parts;
      if (!parts || !parts.standeeMaterials) return;
      const backTex = on ? makeBackTexture(frontTex) : null;
      if (on && !backTex) return;
      ud.isBackView = on;
      parts.standeeMaterials.forEach(m => { m.map = on ? backTex : frontTex; m.needsUpdate = true; });
      if (ud.triggerJellyBounce) ud.triggerJellyBounce(0.18);
    };
  }

  // ------------------------------------------------------------------
  // 3) 데미지 숫자
  // ------------------------------------------------------------------
  const PART_TAG = { head: '🎯', back: '⚡', legs: '🦵', armor: '🛡️' };
  function damageNumber(camera, worldPos, value, opts = {}) {
    const v = worldPos.clone().project(camera);
    if (v.z > 1) return;
    const x = (v.x * 0.5 + 0.5) * window.innerWidth + (Math.random() - 0.5) * 40;
    const y = (-(v.y * 0.5) + 0.5) * window.innerHeight + (Math.random() - 0.5) * 16;
    const el = document.createElement('div');
    el.className = 'dmg-num' + (opts.crit ? ' crit' : '') + (opts.player ? ' player' : '') + (opts.weak ? ' weak' : '');
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    if (opts.color) el.style.setProperty('--dmg-color', opts.color);
    const tag = opts.part && PART_TAG[opts.part];
    if (tag) {
      const t = document.createElement('span');
      t.className = 'dmg-tag';
      t.textContent = tag;
      el.appendChild(t);
    }
    const n = document.createElement('span');
    n.textContent = opts.player ? `-${value}` : `${value}`;
    el.appendChild(n);
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }

  // ------------------------------------------------------------------
  // 4) 카메라 주변 촘촘한 풀숲 (플레이어를 따라 60m 박스 안에서 무한 래핑)
  // ------------------------------------------------------------------
  let nearGrass = null;
  function createNearGrass(count) {
    const bw = 0.11, bh = 0.85;
    const verts = new Float32Array([
      -bw, 0, 0, bw, 0, 0, -bw * 0.6, bh * 0.5, 0,
      bw, 0, 0, bw * 0.6, bh * 0.5, 0, -bw * 0.6, bh * 0.5, 0,
      -bw * 0.6, bh * 0.5, 0, bw * 0.6, bh * 0.5, 0, 0, bh, 0
    ]);
    const geo = new THREE.InstancedBufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(verts, 3));
    const nrm = new Float32Array(verts.length);
    for (let i = 0; i < nrm.length; i += 3) { nrm[i + 1] = 1; }
    geo.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    const offs = new Float32Array(count * 4);
    const cols = new Float32Array(count * 3);
    const pal = [0x5f9a2c, 0x6aa832, 0x4f8a24, 0x78b83c, 0x86c24a];
    const c = new THREE.Color();
    for (let i = 0; i < count; i++) {
      offs[i * 4] = (Math.random() - 0.5) * 60;
      offs[i * 4 + 1] = (Math.random() - 0.5) * 60;
      offs[i * 4 + 2] = Math.random() * Math.PI * 2;
      offs[i * 4 + 3] = 0.55 + Math.random() * 0.75;
      c.setHex(pal[(Math.random() * pal.length) | 0]).offsetHSL(0, 0, (Math.random() - 0.5) * 0.05);
      cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
    }
    geo.setAttribute('aOff', new THREE.InstancedBufferAttribute(offs, 4));
    geo.setAttribute('aCol', new THREE.InstancedBufferAttribute(cols, 3));
    geo.instanceCount = count;

    const uniforms = { uTime: { value: 0 }, uCenter: { value: new THREE.Vector3() } };
    const mat = new THREE.MeshLambertMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    mat.onBeforeCompile = sh => {
      sh.uniforms.uTime = uniforms.uTime;
      sh.uniforms.uCenter = uniforms.uCenter;
      sh.vertexShader = sh.vertexShader
        .replace('#include <common>', `#include <common>
          uniform float uTime; uniform vec3 uCenter;
          attribute vec4 aOff; attribute vec3 aCol;
          varying vec3 vGrassCol;`)
        .replace('#include <begin_vertex>', `
          vec2 rel = mod(aOff.xy - uCenter.xz + 30.0, 60.0) - 30.0;
          vec2 wp = uCenter.xz + rel;
          float rr = length(wp);
          float ok = step(22.0, rr) * (1.0 - step(226.0, rr)) * step(4.8, abs(wp.y - 28.0)) * step(-250.0, wp.y);
          float fadeEdge = 1.0 - smoothstep(20.0, 29.0, length(rel));
          float sc = aOff.w * ok * fadeEdge;
          float cs = cos(aOff.z), sn = sin(aOff.z);
          vec3 transformed = vec3(position.x * cs, position.y, position.x * sn) * sc;
          float h = position.y / 0.85;
          float gust = sin(uTime * 1.3 + wp.x * 0.045 + wp.y * 0.03) * 0.5 + 0.5;
          float sway = sin(uTime * 2.4 + wp.x * 0.35 + wp.y * 0.27) * (0.1 + gust * 0.14);
          transformed.x += sway * h * h * sc;
          transformed.z += sway * 0.5 * h * h * sc;
          transformed.xz += wp;
          vGrassCol = aCol * mix(0.72, 1.12, h);`)
        ;
      sh.fragmentShader = sh.fragmentShader
        // 양면 풀잎의 뒷면도 앞면과 같은 밝기로 (뒷면 검게 보이는 현상 제거)
        .replace('( gl_FrontFacing ) ? vLightFront : vLightBack', 'vLightFront')
        .replace('( gl_FrontFacing ) ? vIndirectFront : vIndirectBack', 'vIndirectFront')
        .replace('#include <common>', '#include <common>\nvarying vec3 vGrassCol;')
        .replace('#include <color_fragment>', '#include <color_fragment>\n  diffuseColor.rgb *= vGrassCol;');
    };
    const mesh = new THREE.Mesh(geo, mat);
    mesh.frustumCulled = false;
    mesh.receiveShadow = true;
    mesh.userData.uniforms = uniforms;
    mesh.userData.fullCount = count;
    nearGrass = mesh;
    return mesh;
  }

  // ------------------------------------------------------------------
  // 5) 피격 피드백 오버레이 (붉은 가장자리 + 저체력 심장박동)
  // ------------------------------------------------------------------
  let hurtEl = null;
  let lowHpEl = null;
  function ensureHurtOverlay() {
    if (hurtEl) return;
    hurtEl = document.createElement('div');
    hurtEl.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:55;opacity:0;background:radial-gradient(ellipse at center, rgba(239,68,68,0) 45%, rgba(220,38,38,0.65) 100%);';
    lowHpEl = document.createElement('div');
    lowHpEl.className = 'lowhp-vignette';
    document.body.append(hurtEl, lowHpEl);
  }
  function playerHurt(strength = 1) {
    ensureHurtOverlay();
    if (hurtEl.animate) hurtEl.animate([{ opacity: 0.85 * strength }, { opacity: 0 }], { duration: 420, easing: 'ease-out' });
  }
  function setLowHp(ratio) {
    ensureHurtOverlay();
    lowHpEl.classList.toggle('on', ratio > 0 && ratio < 0.3);
  }

  // ------------------------------------------------------------------
  // 6) 보스/몬스터 공격 예고 장판 셰이더
  // ------------------------------------------------------------------
  function telegraphMaterial(patternType, reach, colorHex) {
    return new THREE.ShaderMaterial({
      uniforms: {
        uProg: { value: 0 }, uTime: { value: 0 }, uReach: { value: reach },
        uColor: { value: new THREE.Color(colorHex) }, uLine: { value: patternType === 'line' ? 1 : 0 }
      },
      vertexShader: `
        varying vec3 vPos;
        void main() { vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
      fragmentShader: `
        uniform float uProg; uniform float uTime; uniform float uReach; uniform vec3 uColor; uniform float uLine;
        varying vec3 vPos;
        void main() {
          float t; float border;
          if (uLine > 0.5) {
            t = clamp(vPos.z / uReach, 0.0, 1.0);
            border = max(smoothstep(0.8, 0.98, abs(vPos.x)), smoothstep(0.97, 1.0, t));
          } else {
            t = length(vPos.xz) / uReach;
            border = smoothstep(0.93, 0.985, t) * (1.0 - smoothstep(0.995, 1.0, t));
          }
          float filled = step(t, uProg);
          float front = smoothstep(0.035, 0.0, abs(t - uProg)) * step(uProg, 0.999);
          // 바닥 줄무늬 (경고 패턴)
          float stripes = step(0.5, fract((vPos.x + vPos.z) * 0.9 - uTime * 1.5)) * 0.08;
          float a = 0.14 + stripes + filled * 0.32 + border * 0.75 + front * 0.8;
          vec3 col = uColor;
          col = mix(col, vec3(1.0, 0.95, 0.85), front * 0.8 + border * 0.25);
          // 발동 직전 하얗게 점멸
          float warn = smoothstep(0.82, 1.0, uProg);
          float blink = 0.5 + 0.5 * sin(uTime * 38.0);
          col = mix(col, vec3(1.0), warn * blink * 0.55);
          a = min(1.0, a + warn * blink * 0.25);
          gl_FragColor = vec4(col, a * 0.92);
        }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide
    });
  }

  // ------------------------------------------------------------------
  // 7) 움직임 이펙트 (FXHQ 내부 헬퍼 사용)
  // ------------------------------------------------------------------
  function dust(pos, count = 2, size = 1.0) {
    if (typeof FXHQ === 'undefined' || !FXHQ._add) return false;
    const n = Math.max(1, Math.round(count * detail));
    for (let i = 0; i < n; i++) {
      const s = FXHQ._sprite('smoke', 0xf3efe6, false, 0.7);
      s.position.set(pos.x + (Math.random() - 0.5) * 0.9, Math.max(0.2, pos.y + 0.25), pos.z + (Math.random() - 0.5) * 0.9);
      const vx = (Math.random() - 0.5) * 2.4, vz = (Math.random() - 0.5) * 2.4, vy = 0.8 + Math.random() * 1.2;
      const sz = (0.7 + Math.random() * 0.5) * size;
      FXHQ._add(s, 0.5 + Math.random() * 0.25, (it, dt, k) => {
        s.position.x += vx * dt * (1 - k);
        s.position.z += vz * dt * (1 - k);
        s.position.y += vy * dt * (1 - k);
        s.scale.setScalar(sz * (0.6 + k * 1.2));
        s.material.opacity = 0.65 * (1 - k);
      });
    }
    return true;
  }
  function landing(pos, strength = 1) {
    if (typeof FXHQ === 'undefined') return;
    dust(pos, 7 * strength, 1.3);
    FXHQ.shockwave(new THREE.Vector3(pos.x, 0, pos.z), 0xffffff, 2.6 * strength);
  }
  function dashBurst(pos, dir, colorHex = 0xbae6fd) {
    if (typeof FXHQ === 'undefined' || !FXHQ._add) return;
    const n = Math.round(10 * detail) + 2;
    for (let i = 0; i < n; i++) {
      const s = FXHQ._sprite('spark', i % 3 ? colorHex : 0xffffff, true, 0.9);
      const side = new THREE.Vector3(dir.z, 0, -dir.x).multiplyScalar((Math.random() - 0.5) * 2.4);
      s.position.set(pos.x + side.x, 0.6 + Math.random() * 2.6, pos.z + side.z);
      const back = dir.clone().multiplyScalar(-(14 + Math.random() * 10));
      FXHQ._add(s, 0.28 + Math.random() * 0.12, (it, dt, k) => {
        s.position.addScaledVector(back, dt);
        if (POLISH._camera) {
          const a = s.position.clone().project(POLISH._camera);
          const b = s.position.clone().addScaledVector(back, 0.03).project(POLISH._camera);
          s.material.rotation = Math.atan2(b.y - a.y, (b.x - a.x) * (POLISH._camera.aspect || 1.6));
        }
        s.scale.set(2.6 * (1 - k * 0.5), 0.22, 1);
        s.material.opacity = 0.9 * (1 - k);
      });
    }
    FXHQ.shockwave(new THREE.Vector3(pos.x, 0, pos.z), colorHex, 3.2);
  }

  // ------------------------------------------------------------------
  // 9) 물결 셰이더 물 (월드 좌표 기반 → 섬 시냇물과 협곡 강이 자연스럽게 이어짐)
  // ------------------------------------------------------------------
  let waterMat = null;
  function getWaterMaterial() {
    if (waterMat) return waterMat;
    waterMat = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.fog, {
        uTime: { value: 0 },
        uDeep: { value: new THREE.Color(0x0b84c9) },
        uShallow: { value: new THREE.Color(0x4cc9f0) },
        uSky: { value: new THREE.Color(0xcfe4f7) },
        uRiverZ: { value: 28.0 },
        uHalfW: { value: 3.75 },
        uNight: { value: 0 }
      }]),
      vertexShader: `
        #include <fog_pars_vertex>
        varying vec3 vWorld;
        void main() {
          vec4 wp = modelMatrix * vec4(position, 1.0);
          vWorld = wp.xyz;
          vec4 mvPosition = viewMatrix * wp;
          gl_Position = projectionMatrix * mvPosition;
          #include <fog_vertex>
        }`,
      fragmentShader: `
        #include <fog_pars_fragment>
        uniform float uTime; uniform vec3 uDeep; uniform vec3 uShallow; uniform vec3 uSky;
        uniform float uRiverZ; uniform float uHalfW; uniform float uNight;
        varying vec3 vWorld;
        float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
        float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
          return mix(mix(h(i),h(i+vec2(1,0)),u.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x), u.y); }
        void main() {
          vec2 p = vWorld.xz;
          float across = clamp(abs(p.y - uRiverZ) / uHalfW, 0.0, 1.0);
          vec2 q = vec2(p.x * 0.22 - uTime * 0.9, p.y * 0.9);
          float r1 = n(q) * 0.6 + n(q * 2.3 + vec2(uTime * 0.3, 0.0)) * 0.4;
          float r2 = n(vec2(p.x * 0.5 - uTime * 1.6, p.y * 1.7));
          vec3 col = mix(uDeep, uShallow, smoothstep(0.15, 0.95, across) * 0.75 + r1 * 0.25);
          // 하늘 반사
          vec3 V = normalize(cameraPosition - vWorld);
          float fres = pow(1.0 - clamp(V.y, 0.0, 1.0), 2.5);
          col = mix(col, uSky, fres * 0.55);
          // 물결 하이라이트 줄무늬
          float ripple = smoothstep(0.62, 0.72, r1) * (1.0 - smoothstep(0.72, 0.85, r1));
          col += vec3(1.0) * ripple * 0.28;
          // 가장자리 거품
          float foam = smoothstep(0.78, 0.98, across + (r2 - 0.5) * 0.25);
          col = mix(col, vec3(0.96, 0.99, 1.0), foam * 0.75);
          // 반짝임
          vec2 cell = floor(p * vec2(1.6, 3.0));
          float sp = h(cell + floor(uTime * 2.0));
          float spark = step(0.965, sp) * step(0.55, r2) * (1.0 - foam);
          col += vec3(1.0, 0.98, 0.9) * spark * (0.9 - uNight * 0.5);
          gl_FragColor = vec4(col, 1.0);
          #include <fog_fragment>
        }`,
      fog: true
    });
    return waterMat;
  }

  // ------------------------------------------------------------------
  // 8) 그래픽 품질 설정
  // ------------------------------------------------------------------
  const QUALITY_LABEL = { low: '낮음', mid: '보통', high: '높음' };
  let quality = lsGet('chiikawa_gfx_quality', isMobile ? 'low' : 'high');
  if (!QUALITY_LABEL[quality]) quality = 'high';
  let detail = 1;

  function applyQuality(game, q = quality) {
    quality = q;
    lsSet('chiikawa_gfx_quality', q);
    const cfg = {
      low: { pr: 1.0, shadow: 0, bloom: false, forest: 0.3, grass: 0.45, near: 0, flowers: 0.4, detail: 0.45 },
      mid: { pr: 1.5, shadow: 2048, bloom: true, forest: 0.6, grass: 0.75, near: 0.5, flowers: 0.7, detail: 0.75 },
      high: { pr: 2.0, shadow: 4096, bloom: true, forest: 1, grass: 1, near: 1, flowers: 1, detail: 1 }
    }[q];
    detail = cfg.detail;
    if (typeof FXHQ !== 'undefined' && FXHQ.setDetail) FXHQ.setDetail(cfg.detail);
    if (!game || !game.renderer) return;

    // 해상도
    game.maxPixelRatio = Math.min(window.devicePixelRatio || 1, cfg.pr);
    if (game.currentPixelRatio > game.maxPixelRatio) {
      game.currentPixelRatio = game.maxPixelRatio;
      game.renderer.setPixelRatio(game.currentPixelRatio);
      if (game.composer) {
        game.composer.setPixelRatio && game.composer.setPixelRatio(game.currentPixelRatio);
        game.composer.setSize(window.innerWidth, window.innerHeight);
      }
    }
    // 그림자
    if (game.dirLight) {
      const maxTex = game.renderer.capabilities.maxTextureSize;
      const size = Math.min(cfg.shadow, maxTex >= 8192 ? 4096 : 2048);
      game.dirLight.castShadow = cfg.shadow > 0;
      if (cfg.shadow > 0 && game.dirLight.shadow.mapSize.width !== size) {
        game.dirLight.shadow.mapSize.set(size, size);
        if (game.dirLight.shadow.map) { game.dirLight.shadow.map.dispose(); game.dirLight.shadow.map = null; }
      }
    }
    // 블룸
    if (game.bloomPass) game.bloomPass.enabled = cfg.bloom;
    // 숲·풀·꽃 밀도
    const setCount = (obj, frac) => {
      if (!obj) return;
      obj.traverse(o => {
        if (o.isInstancedMesh) {
          if (o.userData.fullCount === undefined) o.userData.fullCount = o.count;
          o.count = Math.max(1, Math.floor(o.userData.fullCount * frac));
        }
      });
    };
    setCount(game.forestGroup, cfg.forest);
    setCount(game.instancedGrass, cfg.grass);
    setCount(game.flowerGroup, cfg.flowers);
    if (nearGrass) {
      nearGrass.visible = cfg.near > 0;
      nearGrass.geometry.instanceCount = Math.floor(nearGrass.userData.fullCount * Math.max(cfg.near, 0.01));
    }
    const btn = document.getElementById('btn-gfx-quality');
    if (btn) btn.innerText = `🎨 화질: ${QUALITY_LABEL[q]}`;
  }

  function cycleQuality(game) {
    const order = ['high', 'mid', 'low'];
    const next = order[(order.indexOf(quality) + 1) % order.length];
    applyQuality(game, next);
    if (typeof showToast === 'function') showToast(`🎨 그래픽 품질: ${QUALITY_LABEL[next]}`);
  }

  // ------------------------------------------------------------------
  // 10) HUD 정리 (패널 접기 + 간소화 모드)
  // ------------------------------------------------------------------
  function initHud() {
    document.querySelectorAll('.quest-panel, .teleport-panel').forEach((panel, i) => {
      const key = `chiikawa_hud_collapsed_${i}`;
      const header = panel.querySelector('.panel-header-title');
      if (!header) return;
      header.classList.add('collapsible');
      const def = panel.classList.contains('teleport-panel') ? '1' : '0';
      if (lsGet(key, def) === '1') panel.classList.add('collapsed');
      header.addEventListener('click', () => {
        panel.classList.toggle('collapsed');
        lsSet(key, panel.classList.contains('collapsed') ? '1' : '0');
      });
    });
    if (lsGet('chiikawa_hud_compact', '0') === '1') document.body.classList.add('hud-compact');
    updateCompactBtn();
  }
  function updateCompactBtn() {
    const b = document.getElementById('btn-hud-compact');
    if (b) b.innerText = document.body.classList.contains('hud-compact') ? '🧩 UI 펼치기' : '🧹 UI 간소화';
  }
  function toggleCompact() {
    document.body.classList.toggle('hud-compact');
    lsSet('chiikawa_hud_compact', document.body.classList.contains('hud-compact') ? '1' : '0');
    updateCompactBtn();
  }


  // ------------------------------------------------------------------
  // 11) 몬스터/보스 공격 연출: 기 모으기(붉게 맥동·웅크림·도약) → 착탄 충격(충격파·파편·먼지·빛기둥)
  // ------------------------------------------------------------------
  function onTelegraph(monster, patternType, center, duration) {
    if (!monster || !monster.mesh) return;
    monster.windupT = duration;
    monster.windupMax = duration;
    // 자기 주변을 내려찍는 원형 공격이면 도약 후 착지
    const dx = (center.x - monster.pos.x), dz = (center.z - monster.pos.z);
    monster.windupJump = patternType === 'circle' && Math.hypot(dx, dz) < 2.5;
    monster.windupLunge = patternType !== 'circle';
  }

  function debris(pos, n, spread, colorHex = 0x8b7d6b) {
    if (typeof FXHQ === 'undefined' || !FXHQ._add) return;
    n = Math.max(3, Math.round(n * detail));
    for (let i = 0; i < n; i++) {
      const g = new THREE.DodecahedronGeometry(0.16 + Math.random() * 0.26, 0);
      const mat = new THREE.MeshLambertMaterial({ color: i % 3 === 0 ? 0xa8a29e : colorHex });
      const rock = new THREE.Mesh(g, mat);
      const a = Math.random() * Math.PI * 2;
      const r0 = Math.random() * spread * 0.6;
      rock.position.set(pos.x + Math.cos(a) * r0, 0.3, pos.z + Math.sin(a) * r0);
      const v = new THREE.Vector3(Math.cos(a) * (3 + Math.random() * 6), 6 + Math.random() * 9, Math.sin(a) * (3 + Math.random() * 6));
      const spin = new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10);
      FXHQ._add(rock, 0.9 + Math.random() * 0.4, (it, dt, k) => {
        v.y -= 30 * dt;
        rock.position.addScaledVector(v, dt);
        if (rock.position.y < 0.15) { rock.position.y = 0.15; v.y *= -0.3; v.x *= 0.6; v.z *= 0.6; }
        rock.rotation.x += spin.x * dt; rock.rotation.y += spin.y * dt;
        rock.scale.setScalar(k > 0.7 ? (1 - k) / 0.3 : 1);
      });
    }
  }

  function lightPillar(pos, colorHex, R) {
    if (typeof FXHQ === 'undefined' || !FXHQ._add) return;
    const s = FXHQ._sprite('glow', colorHex, true, 1);
    s.position.set(pos.x, R * 0.9, pos.z);
    FXHQ._add(s, 0.4, (it, dt, k) => {
      s.scale.set(R * (0.55 - k * 0.3), R * (2.4 + k * 0.6), 1);
      s.material.opacity = 1 - k;
    });
    const core = FXHQ._sprite('glow', 0xffffff, true, 1);
    core.position.set(pos.x, R * 0.7, pos.z);
    FXHQ._add(core, 0.25, (it, dt, k) => {
      core.scale.set(R * 0.25 * (1 - k), R * 1.8, 1);
      core.material.opacity = 1 - k;
    });
  }

  function attackImpact(game, tg) {
    if (typeof FXHQ === 'undefined' || !FXHQ._add) return false;
    const c = tg.center;
    const R = tg.reach || 5;
    const m = tg.monster;
    const isBoss = !!(m && (m.isBoss || m.isRaidBoss));
    const col = tg.patternType === 'line' ? 0xf97316 : 0xef4444;
    const ground = new THREE.Vector3(c.x, 0, c.z);
    const yaw = tg.yaw || 0;
    const fwd = new THREE.Vector3(Math.sin(yaw), 0, Math.cos(yaw));

    if (tg.patternType === 'circle') {
      FXHQ.shockwave(ground, col, R * 1.05);
      FXHQ.shockwave(ground, 0xffd7a8, R * 0.65);
      FXHQ.hitSpark(ground.clone().setY(1.0), 0xfb923c, R >= 7);
      debris(ground, 6 + R * 1.3, R);
      dust(ground, 5 + R * 0.8, 1.6 + R * 0.08);
      if (R >= 7) lightPillar(ground, col, R);
    } else if (tg.patternType === 'sector') {
      FXHQ.slash(ground, yaw, col, 3, 0, 0, { radius: R, span: Math.PI * 0.64, y: 0.9, dir: Math.random() < 0.5 ? 1 : -1, life: 0.32, noOffset: true });
      FXHQ.slash(ground, yaw, 0xffd7a8, 1, 0, 0, { radius: R * 0.8, span: Math.PI * 0.6, y: 1.6, dir: 1, life: 0.26, noOffset: true });
      for (let k = 0; k < 6; k++) {
        const a = yaw + (k / 5 - 0.5) * Math.PI * 0.58;
        const p = ground.clone().add(new THREE.Vector3(Math.sin(a), 0, Math.cos(a)).multiplyScalar(R * (0.45 + Math.random() * 0.45)));
        dust(p, 2, 1.3);
      }
      debris(ground.clone().addScaledVector(fwd, R * 0.6), 5 + R * 0.5, R * 0.6);
    } else {
      FXHQ.thrust(ground, yaw, col, R, 1.3);
      for (let k = 0; k <= 8; k++) dust(ground.clone().addScaledVector(fwd, (k / 8) * R), 2, 1.4);
      const end = ground.clone().addScaledVector(fwd, R);
      FXHQ.shockwave(end, col, 3.5);
      debris(end, 6, 2.5);
    }

    // 가까이 있으면 화면 흔들림 / 큰 공격은 붉은 섬광
    const d = Math.hypot(game.playerPos.x - c.x, game.playerPos.z - c.z);
    if (d < R * 1.6) {
      game.camShake = Math.max(game.camShake || 0, isBoss ? 0.6 : 0.28);
      if (isBoss && R >= 7 && typeof FXHQ.screenFlash === 'function') FXHQ.screenFlash(col, 0.16, 200);
    }
    // 착지 찌그러짐
    if (m && m.mesh) {
      const bs = m.baseScale || 1;
      m.mesh.scale.set(bs * 1.25, bs * 0.76, bs * 1.25);
      m.windupT = 0;
      m.landT = 0.25;
    }
    return true;
  }

  // 매 프레임: 기 모으는 몬스터 연출 (main 몬스터 루프 이후 실행)
  function updateWindups(game, dt) {
    const t = game.clock ? game.clock.elapsedTime : 0;
    (game.monsters || []).forEach(m => {
      if (!m.alive || !m.mesh) return;
      const mats = m.mesh.userData.mats || [];
      if (m.windupT > 0) {
        m.windupT -= dt;
        const k = Math.min(1, 1 - Math.max(0, m.windupT) / (m.windupMax || 1));
        const pulse = 0.5 + 0.5 * Math.sin(t * (12 + 26 * k));
        mats.forEach(mm => {
          if (mm.userData.fxFlash) {
            mm.userData.fxFlash.uFlashColor.value.setHex(0xff3b3b);
            mm.userData.fxFlash.uFlash.value = Math.max(mm.userData.fxFlash.uFlash.value, 0.1 + 0.32 * k * pulse);
          }
        });
        const bs = m.baseScale || 1;
        if (m.windupJump && k > 0.62) {
          // 도약: 마지막 구간에 위로 솟구쳤다가 착탄 순간 착지
          const j = (k - 0.62) / 0.38;
          const h = Math.sin(j * Math.PI * 0.5) * (m.isRaidBoss ? 4.5 : m.isBoss ? 3 : 1.6);
          m.mesh.position.y += h;
          m.mesh.scale.set(bs * 0.92, bs * 1.12, bs * 0.92);
        } else {
          // 웅크리며 힘 모으기
          m.mesh.scale.set(bs * (1 + 0.07 * k * pulse), bs * (1 - 0.1 * k), bs * (1 + 0.07 * k * pulse));
          if (m.windupLunge) m.mesh.position.y += Math.sin(t * 40) * 0.05 * k;
        }
      }
    });
  }

  // ------------------------------------------------------------------
  // 매 프레임 업데이트
  // ------------------------------------------------------------------
  function update(game, dt) {
    POLISH._camera = game.camera;
    updateWindups(game, dt);
    if (game.camera && game.playerPos) updateOccluders(game.camera, game.playerPos, dt);
    const t = game.clock ? game.clock.elapsedTime : 0;
    if (nearGrass && nearGrass.visible) {
      nearGrass.userData.uniforms.uTime.value = t;
      nearGrass.userData.uniforms.uCenter.value.copy(game.playerPos);
    }
    if (waterMat) {
      waterMat.uniforms.uTime.value = t;
      if (game.scene && game.scene.fog) waterMat.uniforms.uSky.value.copy(game.scene.fog.color);
      waterMat.uniforms.uNight.value = game.timeOfDay === 'night' ? 1 : 0;
    }
    if (game.stats) setLowHp(game.stats.hp / Math.max(1, game.stats.maxHp) * (game.battleState && game.battleState.active ? 1 : 0));
  }

  return {
    registerOccluder, attachBackView, makeBackTexture, damageNumber, createNearGrass,
    playerHurt, telegraphMaterial, dust, landing, dashBurst, getWaterMaterial,
    applyQuality, cycleQuality, initHud, toggleCompact, update, onTelegraph, attackImpact,
    get quality() { return quality; }, get detail() { return detail; }, _camera: null
  };
})();
