// ⚙️ ES 모듈 (자동 변환): 앞쪽 모듈은 import, 뒤쪽 모듈·덮어쓰기 되는 이름은 window.이름 으로 참조
import THREE from '../core/three.js';
import { getToonGradientMap } from '../core/models3d.js';
import { expose } from '../core/expose.js';
// ==========================================================================
// 치이카와 3D 월드 - [HQ] 캐릭터·몬스터 외형 & 전투 이펙트 업그레이드 모듈 (fx_hq.js)
//  · 일러스트 실루엣을 따라 만든 '말랑 플러시' 입체 테두리(두께) + 시간대 조명 틴트
//  · 셰이더 기반 검기 트레일 / 애니메 타격 스파크 / 글로우 파티클 / 지면 충격파 / 토벌 연기
//  · 궁극기 컷인 연출 (화면 플래시 + 집중선 + 캐릭터 컷인 배너 + 오라 기둥 + 마법진 + 카메라 줌)
//  ※ 게임 판정 로직은 건드리지 않는 순수 비주얼 모듈입니다.
// ==========================================================================

// ---------- 공용 캔버스 텍스처 ----------
const FX_TEX = {};
function fxCanvasTex(name, size, draw) {
  if (FX_TEX[name]) return FX_TEX[name];
  const c = document.createElement('canvas');
  c.width = size;
  c.height = size;
  const ctx = c.getContext('2d');
  draw(ctx, size);
  const t = new THREE.CanvasTexture(c);
  t.needsUpdate = true;
  FX_TEX[name] = t;
  return t;
}
function fxTex(name) {
  switch (name) {
    case 'glow':
      return fxCanvasTex(name, 128, (ctx, s) => {
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.25, 'rgba(255,255,255,0.75)');
        g.addColorStop(0.6, 'rgba(255,255,255,0.18)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
      });
    case 'spark':
      return fxCanvasTex(name, 128, (ctx, s) => {
        ctx.translate(s / 2, s / 2);
        ctx.scale(1, 0.14);
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s / 2);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(0.35, 'rgba(255,255,255,0.8)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(0, 0, s / 2, 0, Math.PI * 2);
        ctx.fill();
      });
    case 'star':
      return fxCanvasTex(name, 256, (ctx, s) => {
        const cx = s / 2;
        ctx.translate(cx, cx);
        const spikes = 8;
        ctx.beginPath();
        for (let i = 0; i < spikes * 2; i++) {
          const a = (i / (spikes * 2)) * Math.PI * 2 - Math.PI / 2;
          const long = i % 4 === 0 ? 0.49 : 0.34;
          const r = i % 2 === 0 ? s * long : s * 0.075;
          ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
        }
        ctx.closePath();
        ctx.shadowColor = 'rgba(255,255,255,0.9)';
        ctx.shadowBlur = 14;
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.fill();
        const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 0.18);
        g.addColorStop(0, 'rgba(255,255,255,1)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(-s / 2, -s / 2, s, s);
      });
    case 'ring':
      return fxCanvasTex(name, 256, (ctx, s) => {
        const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
        g.addColorStop(0, 'rgba(255,255,255,0)');
        g.addColorStop(0.62, 'rgba(255,255,255,0.05)');
        g.addColorStop(0.86, 'rgba(255,255,255,1)');
        g.addColorStop(0.93, 'rgba(255,255,255,0.5)');
        g.addColorStop(1, 'rgba(255,255,255,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, s, s);
      });
    case 'smoke':
      return fxCanvasTex(name, 128, (ctx, s) => {
        for (let i = 0; i < 7; i++) {
          const x = s / 2 + (Math.sin(i * 2.4) * s) / 6;
          const y = s / 2 + (Math.cos(i * 1.7) * s) / 6;
          const r = s * (0.22 + (i % 3) * 0.05);
          const g = ctx.createRadialGradient(x, y, 0, x, y, r);
          g.addColorStop(0, 'rgba(255,255,255,0.55)');
          g.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = g;
          ctx.fillRect(0, 0, s, s);
        }
      });
    case 'rune':
      return fxCanvasTex(name, 512, (ctx, s) => {
        const c = s / 2;
        ctx.translate(c, c);
        ctx.strokeStyle = 'rgba(255,255,255,0.95)';
        ctx.shadowColor = 'rgba(255,255,255,0.8)';
        ctx.shadowBlur = 8;
        const circle = (r, w) => { ctx.lineWidth = w; ctx.beginPath(); ctx.arc(0, 0, r, 0, Math.PI * 2); ctx.stroke(); };
        circle(s * 0.48, 6);
        circle(s * 0.44, 2);
        circle(s * 0.3, 4);
        circle(s * 0.12, 3);
        // 눈금
        for (let i = 0; i < 72; i++) {
          const a = (i / 72) * Math.PI * 2;
          const r1 = s * 0.44, r2 = s * (i % 6 === 0 ? 0.395 : 0.42);
          ctx.lineWidth = i % 6 === 0 ? 3 : 1.5;
          ctx.beginPath();
          ctx.moveTo(Math.cos(a) * r1, Math.sin(a) * r1);
          ctx.lineTo(Math.cos(a) * r2, Math.sin(a) * r2);
          ctx.stroke();
        }
        // 육망성
        ctx.lineWidth = 3.5;
        for (let k = 0; k < 2; k++) {
          ctx.beginPath();
          for (let i = 0; i <= 3; i++) {
            const a = (i / 3) * Math.PI * 2 + k * Math.PI / 3 - Math.PI / 2;
            const x = Math.cos(a) * s * 0.3, y = Math.sin(a) * s * 0.3;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        // 작은 별 장식
        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          const x = Math.cos(a) * s * 0.37, y = Math.sin(a) * s * 0.37;
          ctx.beginPath();
          ctx.arc(x, y, s * 0.018, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    default:
      return fxTex('glow');
  }
}

// ==========================================================================
// 1. 캐릭터·몬스터 외형: 실루엣 입체 테두리 + 시간대 틴트 + 피격 플래시
// ==========================================================================
const FX_STANDEE_TINT = new THREE.Color(0xffffff);
const FX_STANDEE_MATS = new Set();
function fxRegisterStandeeMat(mat) {
  FX_STANDEE_MATS.add(mat);
  mat.color.copy(FX_STANDEE_TINT);
}
function fxSetStandeeTint(hex) {
  FX_STANDEE_TINT.setHex(hex);
  FX_STANDEE_MATS.forEach(m => {
    if (!m.userData.fxFlashing) m.color.copy(FX_STANDEE_TINT);
  });
}

// MeshBasicMaterial에 '하얗게 번쩍' 피격 플래시 유니폼 주입
function fxApplyFlashShader(mat) {
  const u = { uFlash: { value: 0 }, uFlashColor: { value: new THREE.Color(0xffffff) } };
  mat.userData.fxFlash = u;
  mat.onBeforeCompile = shader => {
    shader.uniforms.uFlash = u.uFlash;
    shader.uniforms.uFlashColor = u.uFlashColor;
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform float uFlash;\nuniform vec3 uFlashColor;')
      .replace('#include <dithering_fragment>', '#include <dithering_fragment>\n  gl_FragColor.rgb = mix(gl_FragColor.rgb, uFlashColor, uFlash);');
  };
  mat.customProgramCacheKey = () => 'fxflash';
  return u;
}

// 알파 마스크에서 외곽선(Moore 이웃 추적) 추출 -> 텍스처당 1회 캐시
function fxExtractContour(texture) {
  if (!texture.userData) texture.userData = {};
  if (texture.userData.fxContour !== undefined) return texture.userData.fxContour;
  const img = texture.image;
  if (!img || !img.getContext) return null;
  const S = img.width;
  let data;
  try {
    data = img.getContext('2d').getImageData(0, 0, S, S).data;
  } catch (e) {
    texture.userData.fxContour = null;
    return null;
  }
  const G = 192;
  const mask = new Uint8Array(G * G);
  let sr = 0, sg = 0, sb = 0, sn = 0;
  for (let gy = 0; gy < G; gy++) {
    for (let gx = 0; gx < G; gx++) {
      const px = Math.min(S - 1, Math.floor(((gx + 0.5) / G) * S));
      const py = Math.min(S - 1, Math.floor(((gy + 0.5) / G) * S));
      const o = (py * S + px) * 4;
      if (data[o + 3] > 110) {
        mask[gy * G + gx] = 1;
        sr += data[o]; sg += data[o + 1]; sb += data[o + 2]; sn++;
      }
    }
  }
  if (sn < 30) {
    texture.userData.fxContour = null;
    return null;
  }
  // 가장 큰 연결 성분만 남김
  const label = new Int32Array(G * G);
  let best = -1, bestSize = 0, cur = 0;
  const q = new Int32Array(G * G);
  for (let i = 0; i < G * G; i++) {
    if (!mask[i] || label[i]) continue;
    cur++;
    let h = 0, t = 0, size = 0;
    q[t++] = i;
    label[i] = cur;
    while (h < t) {
      const k = q[h++];
      size++;
      const x = k % G, y = (k / G) | 0;
      const nb = [x > 0 ? k - 1 : -1, x < G - 1 ? k + 1 : -1, y > 0 ? k - G : -1, y < G - 1 ? k + G : -1];
      for (const n of nb) {
        if (n >= 0 && mask[n] && !label[n]) { label[n] = cur; q[t++] = n; }
      }
    }
    if (size > bestSize) { bestSize = size; best = cur; }
  }
  const inside = (x, y) => x >= 0 && y >= 0 && x < G && y < G && label[y * G + x] === best;
  let sx = -1, sy = -1;
  for (let y = 0; y < G && sx < 0; y++) {
    for (let x = 0; x < G; x++) {
      if (inside(x, y)) { sx = x; sy = y; break; }
    }
  }
  const dirs = [[-1, 0], [-1, -1], [0, -1], [1, -1], [1, 0], [1, 1], [0, 1], [-1, 1]];
  const pts = [[sx, sy]];
  let cx = sx, cy = sy, bx = sx - 1, by = sy;
  for (let iter = 0; iter < G * G; iter++) {
    let bi = 0;
    for (let d = 0; d < 8; d++) {
      if (cx + dirs[d][0] === bx && cy + dirs[d][1] === by) { bi = d; break; }
    }
    let found = false;
    let prevX = bx, prevY = by;
    for (let k = 1; k <= 8; k++) {
      const d = (bi + k) % 8;
      const nx = cx + dirs[d][0], ny = cy + dirs[d][1];
      if (inside(nx, ny)) {
        bx = prevX; by = prevY;
        cx = nx; cy = ny;
        found = true;
        break;
      }
      prevX = nx; prevY = ny;
    }
    if (!found) break;
    if (cx === sx && cy === sy) break;
    pts.push([cx, cy]);
  }
  if (pts.length < 12) {
    texture.userData.fxContour = null;
    return null;
  }
  // 등간격 리샘플 (~140점) + 스무딩
  const N = Math.min(160, Math.max(48, Math.floor(pts.length / 2)));
  const res = [];
  for (let i = 0; i < N; i++) {
    const p = pts[Math.floor((i / N) * pts.length)];
    res.push([(p[0] + 0.5) / G, (p[1] + 0.5) / G]);
  }
  for (let pass = 0; pass < 2; pass++) {
    const copy = res.map(p => p.slice());
    for (let i = 0; i < N; i++) {
      const a = copy[(i - 1 + N) % N], b = copy[i], c = copy[(i + 1) % N];
      res[i][0] = (a[0] + b[0] * 2 + c[0]) / 4;
      res[i][1] = (a[1] + b[1] * 2 + c[1]) / 4;
    }
  }
  const avg = new THREE.Color(sr / sn / 255, sg / sn / 255, sb / sn / 255);
  texture.userData.fxContour = { pts: res, avgColor: avg };
  return texture.userData.fxContour;
}

// 실루엣 두께 벽(Rim) 생성 + 평면 그리드 변형을 그대로 따라가는 업데이트 함수 반환
// opts: { gridGeo, baseCoords, ws, hs, planeW, planeH, yMin, thickness, color(optional) }
function fxAttachStandeeRim(parent, texture, opts) {
  const contour = fxExtractContour(texture);
  if (!contour) return null;
  const { gridGeo, baseCoords, ws, hs, planeW, planeH, yMin, thickness } = opts;
  const pts = contour.pts;
  const N = pts.length;
  const xy = pts.map(([u, v]) => [(u - 0.5) * planeW, yMin + (1 - v) * planeH]);

  // 외곽 방향 판정 (부호 있는 면적)
  let area = 0;
  for (let i = 0; i < N; i++) {
    const a = xy[i], b = xy[(i + 1) % N];
    area += a[0] * b[1] - b[0] * a[1];
  }
  const orient = area > 0 ? 1 : -1;

  const inset = 0.035;
  const pos = new Float32Array(N * 2 * 3);
  const nor = new Float32Array(N * 2 * 3);
  const base = new Float32Array(N * 2 * 3);
  for (let i = 0; i < N; i++) {
    const p0 = xy[(i - 1 + N) % N], p1 = xy[i], p2 = xy[(i + 1) % N];
    let tx = p2[0] - p0[0], ty = p2[1] - p0[1];
    const tl = Math.hypot(tx, ty) || 1;
    tx /= tl; ty /= tl;
    const nx = ty * orient, ny = -tx * orient;
    const x = p1[0] - nx * inset, y = p1[1] - ny * inset;
    for (let s = 0; s < 2; s++) {
      const o = (i * 2 + s) * 3;
      const z = (s === 0 ? 0.5 : -0.5) * thickness;
      base[o] = x; base[o + 1] = y; base[o + 2] = z;
      pos[o] = x; pos[o + 1] = y; pos[o + 2] = z;
      // 앞뒤로 살짝 둥글게 말린 노멀 (쿠션/플러시 느낌)
      const nz = s === 0 ? 0.35 : -0.35;
      const l = Math.hypot(nx, ny, nz);
      nor[o] = nx / l; nor[o + 1] = ny / l; nor[o + 2] = nz / l;
    }
  }
  const idx = [];
  for (let i = 0; i < N; i++) {
    const a = i * 2, b = i * 2 + 1, c = ((i + 1) % N) * 2, d = ((i + 1) % N) * 2 + 1;
    idx.push(a, b, c, b, d, c);
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  geo.setIndex(idx);
  geo.computeBoundingSphere();

  const col = opts.color !== undefined ? new THREE.Color(opts.color) : contour.avgColor.clone();
  // 너무 어둡거나 너무 채도 높은 평균색 보정 -> 부드러운 플러시 톤
  const hsl = {};
  col.getHSL(hsl);
  col.setHSL(hsl.h, Math.min(hsl.s, 0.55), Math.max(0.42, Math.min(hsl.l * 0.92, 0.86)));
  const mat = new THREE.MeshToonMaterial({ color: col, gradientMap: getToonGradientMap(), side: THREE.DoubleSide });
  const rim = new THREE.Mesh(geo, mat);
  rim.castShadow = false;
  rim.receiveShadow = false;
  parent.add(rim);

  // 각 테두리 정점 -> 평면 그리드 셀 이중선형 가중치 사전계산
  const x0 = -planeW / 2;
  const yTop = yMin + planeH;
  const cw = planeW / ws, ch = planeH / hs;
  const cells = new Int32Array(N * 4);
  const wts = new Float32Array(N * 4);
  for (let i = 0; i < N; i++) {
    const x = base[i * 6], y = base[i * 6 + 1];
    let fx = (x - x0) / cw, fy = (yTop - y) / ch;
    fx = Math.max(0, Math.min(ws - 0.0001, fx));
    fy = Math.max(0, Math.min(hs - 0.0001, fy));
    const c0 = Math.floor(fx), r0 = Math.floor(fy);
    const tx = fx - c0, ty = fy - r0;
    const row = ws + 1;
    cells[i * 4] = r0 * row + c0;
    cells[i * 4 + 1] = r0 * row + c0 + 1;
    cells[i * 4 + 2] = (r0 + 1) * row + c0;
    cells[i * 4 + 3] = (r0 + 1) * row + c0 + 1;
    wts[i * 4] = (1 - tx) * (1 - ty);
    wts[i * 4 + 1] = tx * (1 - ty);
    wts[i * 4 + 2] = (1 - tx) * ty;
    wts[i * 4 + 3] = tx * ty;
  }
  const gridArr = gridGeo.attributes.position.array;
  const rimArr = geo.attributes.position;

  const update = () => {
    const a = rimArr.array;
    for (let i = 0; i < N; i++) {
      let dx = 0, dy = 0, dz = 0;
      for (let k = 0; k < 4; k++) {
        const gi = cells[i * 4 + k] * 3;
        const w = wts[i * 4 + k];
        dx += (gridArr[gi] - baseCoords[gi]) * w;
        dy += (gridArr[gi + 1] - baseCoords[gi + 1]) * w;
        dz += (gridArr[gi + 2] - baseCoords[gi + 2]) * w;
      }
      for (let s = 0; s < 2; s++) {
        const o = (i * 2 + s) * 3;
        a[o] = base[o] + dx;
        a[o + 1] = base[o + 1] + dy;
        a[o + 2] = base[o + 2] + dz;
      }
    }
    rimArr.needsUpdate = true;
  };
  update();
  update.mesh = rim;
  return update;
}

// 보스 몬스터 발밑 마력 오라 (회전 룬 + 떠오르는 불씨)
function fxCreateBossAura(radius, colorHex) {
  const g = new THREE.Group();
  const runeMat = new THREE.MeshBasicMaterial({
    map: fxTex('rune'), color: colorHex, transparent: true, opacity: 0.55,
    depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
  });
  const rune = new THREE.Mesh(new THREE.PlaneGeometry(radius * 2.6, radius * 2.6), runeMat);
  rune.rotation.x = -Math.PI / 2;
  rune.position.y = 0.09;
  g.add(rune);

  const count = 26;
  const p = new Float32Array(count * 3);
  const seeds = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const a = Math.random() * Math.PI * 2;
    const r = radius * (0.5 + Math.random() * 0.7);
    p[i * 3] = Math.cos(a) * r; p[i * 3 + 1] = 0; p[i * 3 + 2] = Math.sin(a) * r;
    seeds[i] = Math.random();
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(p, 3));
  geo.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
  const emat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(colorHex) }, uH: { value: radius * 3.2 } },
    vertexShader: `
      uniform float uTime; uniform float uH; attribute float aSeed; varying float vA;
      void main() {
        float t = fract(uTime * 0.35 + aSeed);
        vec3 pos = position;
        pos.y = t * uH;
        pos.x += sin(uTime * 2.0 + aSeed * 30.0) * 0.4;
        vA = sin(t * 3.14159);
        vec4 mv = modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = (10.0 + aSeed * 10.0) * (20.0 / -mv.z);
        gl_Position = projectionMatrix * mv;
      }`,
    fragmentShader: `
      uniform vec3 uColor; varying float vA;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        float a = smoothstep(0.5, 0.0, d) * vA;
        gl_FragColor = vec4(mix(uColor, vec3(1.0), 0.35) * a, a);
      }`,
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
  });
  const embers = new THREE.Points(geo, emat);
  embers.frustumCulled = false;
  g.add(embers);
  g.userData.update = time => {
    rune.rotation.z = time * 0.6;
    runeMat.opacity = 0.42 + Math.sin(time * 3) * 0.12;
    emat.uniforms.uTime.value = time;
  };
  return g;
}

// ==========================================================================
// 2. 전투 이펙트 매니저
// ==========================================================================
const FXHQ = (() => {
  let scene = null;
  let camera = null;
  let baseFov = 46;
  const items = [];
  let fovKick = 0;
  let fovKickT = 0;
  let fovKickDur = 0;
  let DETAIL = 1; // 그래픽 품질에 따른 파티클 양 계수
  const v1 = new THREE.Vector3();
  const v2 = new THREE.Vector3();

  function init(sc, cam) {
    scene = sc;
    camera = cam;
    baseFov = cam.fov;
    ensureOverlay();
  }

  function add(obj, life, update, onEnd) {
    if (!scene) return null;
    scene.add(obj);
    const it = { obj, t: 0, life, update, onEnd };
    items.push(it);
    return it;
  }

  function disposeObj(obj) {
    obj.traverse(o => {
      if (o.geometry && !o.isSprite) o.geometry.dispose();
      if (o.material) {
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        ms.forEach(m => m.dispose());
      }
    });
  }

  function sprite(texName, colorHex, additive = true, opacity = 1) {
    const m = new THREE.SpriteMaterial({
      map: fxTex(texName),
      color: colorHex,
      transparent: true,
      opacity,
      depthWrite: false,
      blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending
    });
    return new THREE.Sprite(m);
  }

  const easeOut = k => 1 - Math.pow(1 - Math.min(1, Math.max(0, k)), 3);

  // ---------- 검기(슬래시) 트레일 ----------
  const slashVS = `
    varying vec2 vUv;
    void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
  const slashFS = `
    uniform vec3 uColor; uniform float uProg; uniform float uFade; uniform float uDir;
    varying vec2 vUv;
    void main() {
      float u = uDir > 0.0 ? vUv.x : 1.0 - vUv.x;
      float tail = 0.62;
      float along = smoothstep(uProg - tail, uProg, u) * (1.0 - smoothstep(uProg, uProg + 0.04, u));
      float r = vUv.y;
      float thin = mix(0.55, 0.0, along);            // 꼬리로 갈수록 얇아짐
      float body = smoothstep(thin, 0.92, r) * (1.0 - smoothstep(0.96, 1.0, r));
      float edge = smoothstep(0.82, 0.95, r) * (1.0 - smoothstep(0.95, 1.0, r));
      float a = along * (body * 0.55 + edge * 1.25) * uFade;   // 겹쳐도 하얗게 타지 않게 (색이 보이도록)
      vec3 col = mix(uColor, vec3(1.0), clamp(edge * 0.75 + pow(along, 3.0) * 0.3, 0.0, 1.0));
      gl_FragColor = vec4(col * a, a);
    }`;
  function arcGeometry(rIn, rOut, span, seg = 56) {
    const pos = [], uv = [], idx = [];
    const rows = 4;
    for (let i = 0; i <= seg; i++) {
      const u = i / seg;
      const a = -span / 2 + u * span;
      for (let j = 0; j <= rows; j++) {
        const v = j / rows;
        const r = rIn + (rOut - rIn) * v;
        pos.push(Math.sin(a) * r, 0, Math.cos(a) * r);
        uv.push(u, v);
      }
    }
    for (let i = 0; i < seg; i++) {
      for (let j = 0; j < rows; j++) {
        const a = i * (rows + 1) + j, b = a + 1, c = a + rows + 1, d = c + 1;
        idx.push(a, c, b, b, c, d);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    g.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
    g.setIndex(idx);
    return g;
  }

  function slash(center, yaw, colorHex, comboStep = 1, tiltX = 0, tiltZ = 0, opts = {}) {
    const r = opts.radius || (comboStep === 3 ? 5.4 : 4.4);
    const span = opts.span || (comboStep === 3 ? Math.PI * 1.75 : Math.PI * 0.95);
    const dir = opts.dir || (comboStep === 2 ? -1 : 1);
    const life = opts.life || (comboStep === 3 ? 0.36 : 0.28);
    const mat = new THREE.ShaderMaterial({
      uniforms: {
        uColor: { value: new THREE.Color(colorHex) },
        uProg: { value: 0 }, uFade: { value: 1 }, uDir: { value: dir }
      },
      vertexShader: slashVS, fragmentShader: slashFS,
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending
    });
    const mesh = new THREE.Mesh(arcGeometry(r * 0.22, r, span), mat);
    const holder = new THREE.Group();
    holder.add(mesh);
    const fwdX = Math.sin(yaw), fwdZ = Math.cos(yaw);
    const back = opts.noOffset ? 0 : r * 0.42;
    holder.position.set(center.x - fwdX * back, (center.y || 0) + (opts.y !== undefined ? opts.y : comboStep === 2 ? 2.0 : 1.45), center.z - fwdZ * back);
    holder.rotation.order = 'YXZ';
    holder.rotation.set(tiltX, yaw, tiltZ || (comboStep === 2 ? 0.28 * dir : 0));
    const startRot = -dir * 0.35;
    add(holder, life, (it, dt, k) => {
      mat.uniforms.uProg.value = easeOut(k / 0.62) * 1.18;
      mat.uniforms.uFade.value = 1 - Math.max(0, (k - 0.55) / 0.45);
      mesh.rotation.y = startRot + dir * easeOut(k) * 0.55;
      const s = 1 + k * 0.12;
      mesh.scale.set(s, 1, s);
    });

    // 검기 끝에서 흩날리는 빛가루
    const n = comboStep === 3 ? 10 : 6;
    for (let i = 0; i < n; i++) {
      const a = (Math.random() - 0.5) * span;
      const local = v1.set(Math.sin(a) * r * 0.95, 0, Math.cos(a) * r * 0.95);
      local.applyEuler(holder.rotation);
      const p = holder.position.clone().add(local);
      const tang = v2.set(Math.cos(a), 0, -Math.sin(a)).multiplyScalar(dir * (6 + Math.random() * 6)).applyEuler(holder.rotation);
      glowParticle(p, mixWhite(colorHex, 0.35), tang.clone().add(new THREE.Vector3(0, 2 + Math.random() * 3, 0)), 0.32 + Math.random() * 0.2, 0.45 + Math.random() * 0.35, 4);
    }
  }

  // ---------- 찌르기 창기 스트릭 ----------
  function thrust(origin, yaw, colorHex, length = 6.5, y = 1.8) {
    const mat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(colorHex) }, uFade: { value: 1 }, uProg: { value: 0 } },
      vertexShader: slashVS,
      fragmentShader: `
        uniform vec3 uColor; uniform float uFade; uniform float uProg; varying vec2 vUv;
        void main() {
          float across = max(1.0 - abs(vUv.x - 0.5) * 2.0, 0.0);
          float len = vUv.y;
          float a = pow(across, 2.2) * smoothstep(0.0, 0.7, len) * step(len, uProg) * uFade;
          a *= mix(0.6, 1.6, smoothstep(0.75, 1.0, len));
          vec3 col = mix(uColor, vec3(1.0), pow(across, 6.0) * 0.9 + smoothstep(0.85, 1.0, len) * 0.4);
          gl_FragColor = vec4(col * a, a);
        }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending
    });
    const g = new THREE.Group();
    for (let k = 0; k < 2; k++) {
      const pg = new THREE.PlaneGeometry(1.1, length);
      pg.translate(0, length / 2, 0);
      pg.rotateX(Math.PI / 2);
      const m = new THREE.Mesh(pg, mat);
      m.rotation.z = k * Math.PI / 2;
      g.add(m);
    }
    g.position.set(origin.x, y, origin.z);
    g.rotation.y = yaw;
    add(g, 0.22, (it, dt, k) => {
      mat.uniforms.uProg.value = easeOut(k / 0.35) * 1.05;
      mat.uniforms.uFade.value = 1 - Math.max(0, (k - 0.4) / 0.6);
      g.scale.set(1 - k * 0.4, 1 - k * 0.4, 1);
    });
    const tip = new THREE.Vector3(origin.x + Math.sin(yaw) * length, y, origin.z + Math.cos(yaw) * length);
    const ring = sprite('ring', colorHex, true);
    ring.position.copy(tip);
    add(ring, 0.22, (it, dt, k) => {
      ring.scale.setScalar(0.5 + easeOut(k) * 3.2);
      ring.material.opacity = 1 - k;
    });
  }

  // ---------- 타격 스파크 ----------
  function mixWhite(hex, amt) {
    return new THREE.Color(hex).lerp(new THREE.Color(0xffffff), amt).getHex();
  }

  function glowParticle(pos, colorHex, vel, size, life, gravity = 14, tex = 'glow') {
    const s = sprite(tex, colorHex, true);
    s.position.copy(pos);
    s.scale.setScalar(size);
    const v = vel.clone();
    add(s, life, (it, dt, k) => {
      v.y -= gravity * dt;
      v.multiplyScalar(Math.pow(0.08, dt));
      s.position.addScaledVector(v, dt);
      const sc = size * (1 - k * 0.7);
      s.scale.setScalar(sc);
      s.material.opacity = 1 - k * k;
      if (tex === 'star') s.material.rotation += dt * 6;
    });
  }

  function streakSpark(pos, colorHex, vel, len, life) {
    const s = sprite('spark', colorHex, true);
    s.position.copy(pos);
    const v = vel.clone();
    add(s, life, (it, dt, k) => {
      v.multiplyScalar(Math.pow(0.02, dt));
      v.y -= 10 * dt;
      s.position.addScaledVector(v, dt);
      if (camera) {
        v1.copy(s.position).project(camera);
        v2.copy(s.position).addScaledVector(v, 0.03).project(camera);
        const aspect = camera.aspect || 1.6;
        s.material.rotation = Math.atan2(v2.y - v1.y, (v2.x - v1.x) * aspect);
      }
      const speed = Math.min(1.4, v.length() / 18);
      s.scale.set(len * (0.35 + speed) * (1 - k * 0.5), 0.34 * (1 - k * 0.6), 1);
      s.material.opacity = 1 - k;
    });
  }

  function hitSpark(pos, colorHex = 0xfacc15, isCrit = false) {
    const big = isCrit ? 1.35 : 1.0;
    // 1) 하얀 섬광
    const flash = sprite('glow', 0xffffff, true);
    flash.position.copy(pos);
    add(flash, 0.1, (it, dt, k) => {
      flash.scale.setScalar((1.1 + easeOut(k) * 1.9) * big);   // 몬스터가 하얀 덩어리에 가려지지 않게 작고 짧게
      flash.material.opacity = (1 - k) * 0.75;
    });
    // 2) 애니메 별 스타버스트
    const star = sprite('star', mixWhite(colorHex, 0.05), true);
    star.position.copy(pos);
    star.material.rotation = Math.random() * Math.PI;
    const spin = (Math.random() > 0.5 ? 1 : -1) * 4;
    add(star, isCrit ? 0.26 : 0.2, (it, dt, k) => {
      const pop = k < 0.25 ? easeOut(k / 0.25) : 1 + (k - 0.25) * 0.25;
      star.scale.setScalar(3.0 * big * pop);
      star.material.rotation += dt * spin;
      star.material.opacity = 0.85 * (1 - Math.max(0, (k - 0.3) / 0.7));
    });
    // 3) 충격 링
    const ring = sprite('ring', colorHex, true);
    ring.position.copy(pos);
    add(ring, 0.3, (it, dt, k) => {
      ring.scale.setScalar((1 + easeOut(k) * 4.6) * big);
      ring.material.opacity = (1 - k) * 0.75;
    });
    // 4) 사방으로 튀는 스파크 줄기
    const n = Math.max(3, Math.round((isCrit ? 14 : 9) * DETAIL));
    for (let i = 0; i < n; i++) {
      const dir = new THREE.Vector3(Math.random() - 0.5, Math.random() * 0.9 - 0.2, Math.random() - 0.5).normalize();
      streakSpark(pos, i % 3 === 0 ? 0xffffff : mixWhite(colorHex, 0.3), dir.multiplyScalar(16 + Math.random() * 14), 2.2 * big, 0.22 + Math.random() * 0.16);
    }
    // 5) 떨어지는 불씨
    for (let i = 0; i < (isCrit ? 8 : 5); i++) {
      const a = Math.random() * Math.PI * 2;
      glowParticle(pos, colorHex, new THREE.Vector3(Math.cos(a) * 6, 4 + Math.random() * 6, Math.sin(a) * 6), 0.45, 0.45 + Math.random() * 0.3, 18);
    }
  }

  // ---------- 글로우 파티클 폭발 ----------
  function burst(pos, colorHex, count = 14) {
    count = Math.max(3, Math.round(count * DETAIL));
    for (let i = 0; i < count; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 4.5 + Math.random() * 9;
      const vel = new THREE.Vector3(Math.cos(a) * spd, 4 + Math.random() * 9, Math.sin(a) * spd);
      const isStar = i % 4 === 0;
      glowParticle(
        pos, i % 3 === 0 ? mixWhite(colorHex, 0.5) : colorHex, vel,
        isStar ? 0.9 + Math.random() * 0.4 : 0.55 + Math.random() * 0.45,
        0.55 + Math.random() * 0.35, 16, isStar ? 'star' : 'glow'
      );
    }
  }

  // ---------- 지면 충격파 ----------
  const shockFS = `
    uniform vec3 uColor; uniform float uFade; varying vec2 vUv;
    void main() {
      float d = length(vUv - 0.5) * 2.0;
      float ring = smoothstep(0.72, 0.95, d) * (1.0 - smoothstep(0.95, 1.0, d));
      float fill = (1.0 - smoothstep(0.0, 1.0, d)) * 0.12 + smoothstep(0.4, 0.95, d) * 0.18 * (1.0 - step(1.0, d));
      float a = (ring * 1.3 + fill) * uFade;
      vec3 col = mix(uColor, vec3(1.0), ring * 0.45);
      gl_FragColor = vec4(col * a, a);
    }`;
  function shockwave(center, colorHex, maxR = 4) {
    const y = center.y || 0;
    if (y > 1.4) {
      // 공중 타격점: 카메라를 향한 링
      const ring = sprite('ring', colorHex, true);
      ring.position.copy(center);
      add(ring, 0.32, (it, dt, k) => {
        ring.scale.setScalar(1 + easeOut(k) * maxR * 1.6);
        ring.material.opacity = 1 - k;
      });
      return;
    }
    const mat = new THREE.ShaderMaterial({
      uniforms: { uColor: { value: new THREE.Color(colorHex) }, uFade: { value: 1 } },
      vertexShader: slashVS, fragmentShader: shockFS,
      transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    });
    const geo = new THREE.PlaneGeometry(2, 2);
    geo.rotateX(-Math.PI / 2);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(center.x, Math.max(0.12, y + 0.12), center.z);
    const life = 0.34 + Math.min(0.45, maxR * 0.022);
    add(mesh, life, (it, dt, k) => {
      const r = 0.6 + easeOut(k) * maxR;
      mesh.scale.set(r, 1, r);
      mat.uniforms.uFade.value = 1 - k * k;
    });
    if (maxR >= 5.5) {
      const n = Math.min(18, Math.round(maxR * 1.1));
      for (let i = 0; i < n; i++) {
        const a = (i / n) * Math.PI * 2 + Math.random() * 0.3;
        const s = sprite('smoke', 0xf1ece4, false, 0.75);
        s.position.set(center.x + Math.cos(a) * 1.2, 0.8, center.z + Math.sin(a) * 1.2);
        const spd = maxR * (1.2 + Math.random() * 0.6);
        const size = 1.8 + Math.random() * 1.4;
        add(s, 0.75, (it, dt, k) => {
          s.position.x += Math.cos(a) * spd * dt * (1 - k);
          s.position.z += Math.sin(a) * spd * dt * (1 - k);
          s.position.y += dt * 1.2;
          s.scale.setScalar(size * (1 + k * 1.4));
          s.material.opacity = 0.7 * (1 - k);
        });
      }
    }
  }

  // ---------- 토벌 연기 펑! ----------
  function deathPoof(pos, colorHex = 0xfacc15) {
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const s = sprite('smoke', 0xffffff, false, 0.9);
      s.position.copy(pos);
      const vel = new THREE.Vector3(Math.cos(a) * 5, 1.5 + Math.random() * 2.5, Math.sin(a) * 5);
      const size = 2.2 + Math.random() * 1.5;
      add(s, 0.8, (it, dt, k) => {
        s.position.addScaledVector(vel, dt * (1 - k));
        s.scale.setScalar(size * (0.6 + easeOut(k) * 1.2));
        s.material.opacity = 0.9 * (1 - k);
      });
    }
    for (let i = 0; i < 10; i++) {
      const a = Math.random() * Math.PI * 2;
      glowParticle(pos, i % 2 ? colorHex : 0xffffff, new THREE.Vector3(Math.cos(a) * 7, 8 + Math.random() * 6, Math.sin(a) * 7), 1.1, 0.8, 14, 'star');
    }
    hitSpark(pos, colorHex, true);
  }

  // ---------- 궁극기 시네마틱 ----------
  let overlay = null;
  function ensureOverlay() {
    if (overlay || typeof document === 'undefined') return;
    overlay = document.createElement('div');
    overlay.id = 'fxhq-overlay';
    overlay.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden;';
    const flash = document.createElement('div');
    flash.style.cssText = 'position:absolute;inset:0;opacity:0;background:#fff;mix-blend-mode:screen;';
    const lines = document.createElement('div');
    // 집중선 캔버스
    const c = document.createElement('canvas');
    c.width = 1024; c.height = 1024;
    const ctx = c.getContext('2d');
    ctx.translate(512, 512);
    for (let i = 0; i < 140; i++) {
      const a = Math.random() * Math.PI * 2;
      const w = 0.006 + Math.random() * 0.016;
      const r0 = 250 + Math.random() * 170;
      ctx.fillStyle = `rgba(255,255,255,${0.35 + Math.random() * 0.5})`;
      ctx.beginPath();
      ctx.moveTo(Math.cos(a) * r0, Math.sin(a) * r0);
      ctx.lineTo(Math.cos(a - w) * 760, Math.sin(a - w) * 760);
      ctx.lineTo(Math.cos(a + w) * 760, Math.sin(a + w) * 760);
      ctx.closePath();
      ctx.fill();
    }
    // 화면 중앙은 비워두고 가장자리에만 집중선
    lines.style.cssText = `position:absolute;left:50%;top:50%;width:160vmax;height:160vmax;transform:translate(-50%,-50%);opacity:0;background:url(${c.toDataURL()}) center/contain no-repeat;-webkit-mask-image:radial-gradient(circle, transparent 30%, #000 46%);mask-image:radial-gradient(circle, transparent 30%, #000 46%);`;
    const vignette = document.createElement('div');
    vignette.style.cssText = 'position:absolute;inset:0;opacity:0;';
    const cutin = document.createElement('div');
    // 컷인: 화면 왼쪽 아래 가장자리의 작은 띠 (시야 방해 최소화)
    cutin.id = 'fxhq-cutin';
    cutin.style.cssText = 'position:absolute;left:0;bottom:168px;width:min(380px,72vw);height:58px;transform:skewX(-12deg) translateX(-110%);transform-origin:left center;opacity:0;display:flex;align-items:center;gap:10px;padding-left:22px;border-radius:0 14px 14px 0;box-shadow:0 6px 18px rgba(0,0,0,0.18);';
    const img = document.createElement('img');
    img.style.cssText = 'height:78px;margin-top:-22px;filter:drop-shadow(0 4px 6px rgba(0,0,0,0.3));transform:skewX(12deg);';
    const txt = document.createElement('div');
    txt.style.cssText = 'transform:skewX(12deg);color:#fff;font-weight:900;text-shadow:0 2px 0 rgba(0,0,0,0.35),0 0 10px rgba(255,255,255,0.5);line-height:1.15;font-family:inherit;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0;';
    const t1 = document.createElement('div');
    t1.style.cssText = 'font-size:10px;letter-spacing:2px;opacity:0.9;';
    const t2 = document.createElement('div');
    t2.style.cssText = 'font-size:17px;letter-spacing:0.5px;overflow:hidden;text-overflow:ellipsis;';
    txt.append(t1, t2);
    cutin.append(img, txt);
    overlay.append(vignette, lines, flash, cutin);
    document.body.appendChild(overlay);
    overlay._p = { flash, lines, vignette, cutin, img, t1, t2 };
  }

  function cssColor(hex, a = 1) {
    const c = new THREE.Color(hex);
    return `rgba(${Math.round(c.r * 255)},${Math.round(c.g * 255)},${Math.round(c.b * 255)},${a})`;
  }

  function screenFlash(colorHex = 0xffffff, strength = 0.6, dur = 220) {
    ensureOverlay();
    if (!overlay || !overlay._p.flash.animate) return;
    const f = overlay._p.flash;
    f.style.background = cssColor(colorHex);
    f.animate([{ opacity: strength }, { opacity: 0 }], { duration: dur, easing: 'ease-out' });
  }

  function fovPunch(amount = 7, dur = 1.0) {
    fovKick = amount;
    fovKickT = 0;
    fovKickDur = dur;
  }

  function ultimate(opts) {
    const { getPos, color = 0xfacc15, duration = 1.25, portrait, name = '', skill = '' } = opts;
    ensureOverlay();
    const P = !opts.noScreen && overlay && overlay._p;
    const anim = (el, frames, o) => el && el.animate && el.animate(frames, o);
    if (P) {
      const ms = duration * 1000;
      screenFlash(0xffffff, 0.16, 200);
      P.vignette.style.background = `radial-gradient(ellipse at center, ${cssColor(color, 0)} 72%, ${cssColor(color, 0.22)} 100%)`;
      anim(P.vignette, [{ opacity: 0 }, { opacity: 0.6, offset: 0.12 }, { opacity: 0.5, offset: 0.6 }, { opacity: 0 }], { duration: ms, easing: 'ease-out' });
      anim(P.lines, [
        { opacity: 0, transform: 'translate(-50%,-50%) scale(1.25) rotate(0deg)' },
        { opacity: 0.42, transform: 'translate(-50%,-50%) scale(1.0) rotate(4deg)', offset: 0.15 },
        { opacity: 0.3, transform: 'translate(-50%,-50%) scale(1.04) rotate(10deg)', offset: 0.6 },
        { opacity: 0, transform: 'translate(-50%,-50%) scale(1.1) rotate(14deg)' }
      ], { duration: ms, easing: 'linear' });
      P.cutin.style.background = `linear-gradient(90deg, ${cssColor(color, 0.9)} 0%, ${cssColor(color, 0.82)} 62%, ${cssColor(color, 0.0)} 100%)`;
      if (portrait) P.img.src = portrait;
      P.img.style.display = portrait ? 'block' : 'none';
      P.t1.textContent = `${name} · ULTIMATE`;
      P.t2.textContent = skill;
      anim(P.cutin, [
        { opacity: 0, transform: 'skewX(-12deg) translateX(-110%)', easing: 'cubic-bezier(.15,.85,.25,1)' },
        { opacity: 0.95, transform: 'skewX(-12deg) translateX(0%)', offset: 0.14 },
        { opacity: 0.95, transform: 'skewX(-12deg) translateX(2%)', offset: 0.78, easing: 'cubic-bezier(.6,0,.9,.4)' },
        { opacity: 0, transform: 'skewX(-12deg) translateX(-110%)' }
      ], { duration: Math.max(1000, ms), easing: 'linear' });
    }
    if (!opts.noScreen) fovPunch(5, duration);

    if (!scene) return;
    // 오라 기둥
    const auraMat = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 }, uColor: { value: new THREE.Color(color) }, uFade: { value: 0 } },
      vertexShader: slashVS,
      fragmentShader: `
        uniform float uTime; uniform vec3 uColor; uniform float uFade; varying vec2 vUv;
        float h(vec2 p){ return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }
        float n(vec2 p){ vec2 i=floor(p), f=fract(p); vec2 u=f*f*(3.0-2.0*f);
          return mix(mix(h(i),h(i+vec2(1,0)),u.x), mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x), u.y); }
        void main() {
          vec2 p = vec2(vUv.x * 12.0, vUv.y * 3.0 - uTime * 2.6);
          float f = n(p) * 0.65 + n(p * 2.1 + 7.0) * 0.35;
          float fadeY = pow(max(1.0 - vUv.y, 0.0), 1.6);
          float a = smoothstep(0.35, 0.85, f + fadeY * 0.45) * fadeY * uFade;
          vec3 col = mix(uColor, vec3(1.0), smoothstep(0.6, 1.0, f) * 0.6);
          gl_FragColor = vec4(col * a, a);
        }`,
      transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.AdditiveBlending
    });
    const aura = new THREE.Mesh(new THREE.CylinderGeometry(2.4, 2.9, 9, 40, 1, true), auraMat);
    const auraGroup = new THREE.Group();
    aura.position.y = 4.5;
    auraGroup.add(aura);
    // 마법진
    const runeMat = new THREE.MeshBasicMaterial({
      map: fxTex('rune'), color: color, transparent: true, opacity: 0,
      depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide
    });
    const rune = new THREE.Mesh(new THREE.PlaneGeometry(16, 16), runeMat);
    rune.rotation.x = -Math.PI / 2;
    rune.position.y = 0.14;
    auraGroup.add(rune);
    const rune2 = new THREE.Mesh(new THREE.PlaneGeometry(9, 9), runeMat.clone());
    rune2.material.color = new THREE.Color(0xffffff);
    rune2.rotation.x = -Math.PI / 2;
    rune2.position.y = 0.16;
    auraGroup.add(rune2);
    const life = duration + 0.3;
    let emitT = 0;
    add(auraGroup, life, (it, dt, k) => {
      const p = getPos ? getPos() : null;
      if (p) auraGroup.position.set(p.x, 0, p.z);
      const tt = it.t;
      const fin = Math.min(1, tt / 0.15);
      const fout = Math.min(1, (life - tt) / 0.35);
      const f = Math.min(fin, fout);
      auraMat.uniforms.uTime.value = tt;
      auraMat.uniforms.uFade.value = f * 0.9;
      aura.scale.set(0.6 + easeOut(fin) * 0.4, 0.4 + easeOut(fin) * 0.6, 0.6 + easeOut(fin) * 0.4);
      runeMat.opacity = f * 0.9;
      rune2.material.opacity = f * 0.7;
      rune.scale.setScalar(0.2 + easeOut(tt / 0.35) * 0.8);
      rune2.scale.setScalar(0.2 + easeOut(tt / 0.25) * 0.8);
      rune.rotation.z = tt * 1.6;
      rune2.rotation.z = -tt * 2.4;
      emitT -= dt;
      if (emitT <= 0 && k < 0.85) {
        emitT = 0.03;
        const a = Math.random() * Math.PI * 2, r = 1.5 + Math.random() * 2.2;
        const pp = new THREE.Vector3(auraGroup.position.x + Math.cos(a) * r, 0.3, auraGroup.position.z + Math.sin(a) * r);
        glowParticle(pp, Math.random() < 0.4 ? 0xffffff : color, new THREE.Vector3(0, 9 + Math.random() * 8, 0), 0.5 + Math.random() * 0.4, 0.7, -4, Math.random() < 0.25 ? 'star' : 'glow');
      }
    }, () => runeMat.dispose());
  }

  function update(dt) {
    for (let i = items.length - 1; i >= 0; i--) {
      const it = items[i];
      it.t += dt;
      const k = Math.min(1, it.t / it.life);
      if (it.update) it.update(it, dt, k);
      if (it.t >= it.life) {
        if (scene) scene.remove(it.obj);
        if (it.onEnd) it.onEnd();
        disposeObj(it.obj);
        items.splice(i, 1);
      }
    }
    if (camera && fovKickDur > 0) {
      fovKickT += dt;
      const k = fovKickT / fovKickDur;
      let off;
      if (k < 0.12) off = easeOut(k / 0.12);
      else off = 1 - easeOut((k - 0.12) / 0.88);
      if (k >= 1) { off = 0; fovKickDur = 0; }
      camera.fov = baseFov - fovKick * off;
      camera.updateProjectionMatrix();
    }
  }

  function setDetail(d) { DETAIL = Math.max(0.2, Math.min(1, d)); }

  return {
    init, update, slash, thrust, hitSpark, burst, shockwave, deathPoof, ultimate, screenFlash, fovPunch, setDetail,
    _add: add, _sprite: sprite, _glow: glowParticle,
    get count() { return items.length; }
  };
})();

export { FXHQ, FX_STANDEE_MATS, fxCreateBossAura, fxSetStandeeTint, fxTex };
// 전역(window)으로도 노출: HTML onclick, 다른 모듈의 런타임 참조, 디버그 콘솔용
expose({
  get FX_TEX() { return FX_TEX; },
  get fxCanvasTex() { return fxCanvasTex; }, set fxCanvasTex(v) { fxCanvasTex = v; },
  get fxTex() { return fxTex; }, set fxTex(v) { fxTex = v; },
  get FX_STANDEE_TINT() { return FX_STANDEE_TINT; },
  get FX_STANDEE_MATS() { return FX_STANDEE_MATS; },
  get fxRegisterStandeeMat() { return fxRegisterStandeeMat; }, set fxRegisterStandeeMat(v) { fxRegisterStandeeMat = v; },
  get fxSetStandeeTint() { return fxSetStandeeTint; }, set fxSetStandeeTint(v) { fxSetStandeeTint = v; },
  get fxApplyFlashShader() { return fxApplyFlashShader; }, set fxApplyFlashShader(v) { fxApplyFlashShader = v; },
  get fxExtractContour() { return fxExtractContour; }, set fxExtractContour(v) { fxExtractContour = v; },
  get fxAttachStandeeRim() { return fxAttachStandeeRim; }, set fxAttachStandeeRim(v) { fxAttachStandeeRim = v; },
  get fxCreateBossAura() { return fxCreateBossAura; }, set fxCreateBossAura(v) { fxCreateBossAura = v; },
  get FXHQ() { return FXHQ; }
});
