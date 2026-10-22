// ⚙️ ES 모듈 (자동 변환): 앞쪽 모듈은 import, 뒤쪽 모듈·덮어쓰기 되는 이름은 window.이름 으로 참조
import THREE from '../core/three.js';
import { addCartoonOutline, getToonGradientMap } from '../core/models3d.js';
import { expose } from '../core/expose.js';
// ==========================================================================
// 치이카와 3D 월드 - [HQ] 배경 월드 퀄리티 업그레이드 모듈 (world_hq.js)
//  · 섬을 감싸는 절차적 구릉 + 원경 설산 지형 (전투 가도 협곡 포함)
//  · 언덕/산자락을 뒤덮는 Instanced 침엽수·활엽수·벚꽃 숲 (수천 그루, 드로우콜 3개)
//  · 각진 툰 바위, 둥근 덤불, 5장 꽃잎 들꽃 필드 (Instanced)
//  · 그라데이션 입체 뭉게구름, 디테일 업그레이드된 히어로 나무 + 벚꽃잎 바닥 데칼
//  ※ 이 모듈은 시각 요소만 추가하며 충돌/게임 로직에는 영향을 주지 않습니다.
// ==========================================================================

// ---------- 결정적(Seeded) 노이즈 & 랜덤 ----------
function wqHash(ix, iz) {
  let h = Math.imul(ix | 0, 374761393) ^ Math.imul(iz | 0, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  h ^= h >>> 16;
  return (h >>> 0) / 4294967296;
}
function wqNoise(x, z) {
  const ix = Math.floor(x);
  const iz = Math.floor(z);
  const fx = x - ix;
  const fz = z - iz;
  const ux = fx * fx * (3 - 2 * fx);
  const uz = fz * fz * (3 - 2 * fz);
  const a = wqHash(ix, iz);
  const b = wqHash(ix + 1, iz);
  const c = wqHash(ix, iz + 1);
  const d = wqHash(ix + 1, iz + 1);
  return a + (b - a) * ux + (c - a) * uz + (a - b - c + d) * ux * uz;
}
function wqFbm(x, z, oct = 5) {
  let v = 0, a = 0.5, f = 1, norm = 0;
  for (let i = 0; i < oct; i++) {
    v += a * wqNoise(x * f + i * 13.7, z * f - i * 7.3);
    norm += a;
    a *= 0.5;
    f *= 2.03;
  }
  return v / norm;
}
function wqRidge(x, z, oct = 5) {
  let v = 0, a = 0.5, f = 1, norm = 0;
  for (let i = 0; i < oct; i++) {
    let n = 1 - Math.abs(2 * wqNoise(x * f + i * 31.1, z * f + i * 17.9) - 1);
    n *= n;
    v += a * n;
    norm += a;
    a *= 0.5;
    f *= 2.1;
  }
  return v / norm;
}
function wqSmooth(e0, e1, x) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}
function wqRng(seed) {
  let s = seed >>> 0;
  return function () {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ---------- 월드 레이아웃 (플레이 영역은 평지로 유지) ----------
const WQ_ISLAND_R = 230;          // 플레이어 이동 한계(220m) 바깥부터 언덕 시작
const WQ_BASE_Y = -0.08;          // 평지 구간 높이 (섬 원판 상단 y=0 바로 아래)
const WQ_RIVER_Z = 28;

// 전투 가도(z: -318 ~ -568, 폭 38m)를 감싸는 협곡 바닥 박스 (카메라 여유 포함)
function wqCorridorDist(x, z) {
  const qx = Math.abs(x) - 30;
  const qz = Math.abs(z + 440) - 165;
  return Math.hypot(Math.max(qx, 0), Math.max(qz, 0)) + Math.min(Math.max(qx, qz), 0);
}
function wqMaskDist(x, z) {
  // 섬 · 전투 협곡 · 레이드 원형 분지(중심 0,-820 / 반경 80m)는 평지
  return Math.min(Math.hypot(x, z) - WQ_ISLAND_R, wqCorridorDist(x, z), Math.hypot(x, z + 820) - 80);
}
function wqRiverFactor(z) {
  return wqSmooth(5, 34, Math.abs(z - WQ_RIVER_Z));
}

function wqTerrainHeight(x, z) {
  const d = wqMaskDist(x, z);
  if (d <= 0) return WQ_BASE_Y;
  const n1 = wqFbm(x * 0.006 + 3.1, z * 0.006 - 1.7, 4);
  const near = 1 - Math.exp(-d / 38);
  const hills = near * (8 + 24 * n1);
  const r = wqRidge(x * 0.0032 + 5.2, z * 0.0032 + 9.1);
  const far = wqSmooth(50, 300, d);
  const mountains = far * (30 + 150 * r * r);
  const detail = (wqFbm(x * 0.05, z * 0.05, 3) - 0.5) * 2.2 * near;
  const h = (hills + mountains + detail) * wqRiverFactor(z);
  return WQ_BASE_Y + Math.max(0, h);
}
// 섬 원판(반경 250, 상단 y=0) 위에서는 그 높이를 우선
function wqSurfaceY(x, z) {
  const h = wqTerrainHeight(x, z);
  return Math.hypot(x, z) < 250 ? Math.max(0, h) : h;
}

// 건물/구역 주변 배치 금지 영역 (x, z, 반경)
const WQ_EXCLUDE = [
  [0, 0, 24], [0, -16, 13], [36, 16, 11], [78, 56, 11], [16, -5, 8],
  [-38, 20, 10], [-44, 15, 9], [-96, 42, 9], [-36, -34, 12], [-28, -33, 8],
  [-85, -14, 12], [-77, -14, 8], [-82, -68, 21], [-92, 62, 15], [32, -22, 11],
  [108, -64, 22]
];
const WQ_PATHS = [
  [0, 0, 62.4, 25.2], [0, 0, -62.4, 30], [0, 0, -69.6, -57.6]
];
function wqSegDist(px, pz, ax, az, bx, bz) {
  const vx = bx - ax, vz = bz - az;
  const t = Math.max(0, Math.min(1, ((px - ax) * vx + (pz - az) * vz) / (vx * vx + vz * vz)));
  return Math.hypot(px - (ax + vx * t), pz - (az + vz * t));
}
function wqIsBlocked(x, z, pad = 0) {
  if (Math.abs(z - WQ_RIVER_Z) < 6 + pad) return true;
  for (const [ex, ez, er] of WQ_EXCLUDE) {
    if (Math.hypot(x - ex, z - ez) < er + pad) return true;
  }
  for (const [ax, az, bx, bz] of WQ_PATHS) {
    if (wqSegDist(x, z, ax, az, bx, bz) < 2.6 + pad) return true;
  }
  return false;
}

// ---------- 지오메트리 유틸 ----------
function wqNonIndexed(geo) {
  return geo.index ? geo.toNonIndexed() : geo;
}
// parts: [{ geo, color: THREE.Color | (x,y,z)=>THREE.Color }]
function wqMergeColored(parts) {
  let total = 0;
  const prepared = parts.map(p => {
    const g = wqNonIndexed(p.geo);
    total += g.attributes.position.count;
    return { g, color: p.color };
  });
  const pos = new Float32Array(total * 3);
  const nor = new Float32Array(total * 3);
  const col = new Float32Array(total * 3);
  let o = 0;
  const tmp = new THREE.Color();
  prepared.forEach(({ g, color }) => {
    const pa = g.attributes.position;
    const na = g.attributes.normal;
    for (let i = 0; i < pa.count; i++) {
      const x = pa.getX(i), y = pa.getY(i), z = pa.getZ(i);
      pos[o * 3] = x; pos[o * 3 + 1] = y; pos[o * 3 + 2] = z;
      nor[o * 3] = na.getX(i); nor[o * 3 + 1] = na.getY(i); nor[o * 3 + 2] = na.getZ(i);
      const c = typeof color === 'function' ? color(x, y, z) : color;
      tmp.copy(c);
      col[o * 3] = tmp.r; col[o * 3 + 1] = tmp.g; col[o * 3 + 2] = tmp.b;
      o++;
    }
  });
  const out = new THREE.BufferGeometry();
  out.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  out.setAttribute('normal', new THREE.BufferAttribute(nor, 3));
  out.setAttribute('color', new THREE.BufferAttribute(col, 3));
  out.computeBoundingSphere();
  return out;
}

// 노이즈로 울퉁불퉁하게 만든 둥근 덩어리 (부드러운 구형 노멀 유지)
function wqBlobGeo(radius, detail, cx, cy, cz, sy = 1, bump = 0.18, seed = 0, flatBottom = null) {
  const g = new THREE.IcosahedronGeometry(radius, detail);
  const p = g.attributes.position;
  const n = g.attributes.normal;
  for (let i = 0; i < p.count; i++) {
    let x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const len = Math.hypot(x, y, z) || 1;
    const nx = x / len, ny = y / len, nz = z / len;
    const k = 1 + (wqNoise(nx * 2.3 + seed, nz * 2.3 + ny * 1.7 - seed) - 0.5) * 2 * bump;
    x = nx * radius * k;
    y = ny * radius * k * sy;
    z = nz * radius * k;
    if (flatBottom !== null && y < -radius * flatBottom) y = -radius * flatBottom + (y + radius * flatBottom) * 0.12;
    p.setXYZ(i, x + cx, y + cy, z + cz);
    n.setXYZ(i, nx, ny * (sy < 1 ? 1.3 : 1), nz);
  }
  for (let i = 0; i < n.count; i++) {
    const v = new THREE.Vector3(n.getX(i), n.getY(i), n.getZ(i)).normalize();
    n.setXYZ(i, v.x, v.y, v.z);
  }
  return g;
}

function wqGradient(c1, c2, y0, y1) {
  const a = new THREE.Color(c1);
  const b = new THREE.Color(c2);
  const out = new THREE.Color();
  return (x, y) => out.copy(a).lerp(b, Math.min(1, Math.max(0, (y - y0) / (y1 - y0))));
}

// 원뿔 테두리를 톱니처럼 들쭉날쭉하게 (침엽수 잎)
function wqJaggedCone(r, h, y, seg, seed) {
  const g = new THREE.ConeGeometry(r, h, seg, 2, false);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), yy = p.getY(i), z = p.getZ(i);
    if (yy < h * 0.25) {
      const ang = Math.atan2(z, x);
      const k = 1 + Math.sin(ang * seg * 0.5 + seed) * 0.12 + (wqNoise(ang * 3 + seed, seed) - 0.5) * 0.18;
      const droop = yy < -h * 0.45 ? -0.25 * r * 0.2 : 0;
      p.setXYZ(i, x * k, yy + droop, z * k);
    }
    p.setY(i, p.getY(i) + y);
  }
  g.computeVertexNormals();
  return g;
}

// ==========================================================================
// 1. 섬을 둘러싼 구릉 + 원경 설산 + 협곡 지형
// ==========================================================================
function createOuterTerrain3D(waterTex) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const SIZE = 1800;
  const SEG = 300;
  const CX = 0, CZ = -200;
  const geo = new THREE.PlaneGeometry(SIZE, SIZE, SEG, SEG);
  geo.rotateX(-Math.PI / 2);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) + CX;
    const z = p.getZ(i) + CZ;
    p.setXYZ(i, x, wqTerrainHeight(x, z), z);
  }
  geo.computeVertexNormals();

  // 높이·경사 기반 버텍스 컬러 (초원 → 숲 → 암벽 → 만년설)
  const cols = new Float32Array(p.count * 3);
  const nrm = geo.attributes.normal;
  const cGrassLow = new THREE.Color(0x5f9a2c);
  const cGrassMid = new THREE.Color(0x4b8226);
  const cForest = new THREE.Color(0x2f5f24);
  const cRock = new THREE.Color(0x8c8273);
  const cRockDark = new THREE.Color(0x6a6257);
  const cSnow = new THREE.Color(0xf4f7fb);
  const cSand = new THREE.Color(0xd2c08f);
  const c = new THREE.Color();
  const tmp = new THREE.Color();
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const slope = 1 - nrm.getY(i);
    const nn = wqFbm(x * 0.02, z * 0.02, 3);
    c.copy(cGrassLow);
    c.lerp(cGrassMid, wqSmooth(2, 16, y));
    c.lerp(cForest, wqSmooth(14, 46, y) * 0.75);
    tmp.copy(cRock).lerp(cRockDark, nn);
    c.lerp(tmp, Math.max(wqSmooth(0.28, 0.52, slope), wqSmooth(68, 100, y)));
    c.lerp(cSnow, wqSmooth(108 + nn * 24, 128 + nn * 24, y) * (1 - wqSmooth(0.5, 0.7, slope)));
    // 강가 모래톱
    const riverBank = 1 - wqSmooth(6, 13, Math.abs(z - WQ_RIVER_Z));
    if (Math.hypot(x, z) > 236) c.lerp(cSand, riverBank * (1 - wqSmooth(0.5, 3, y)) * 0.85);
    const shade = 0.94 + nn * 0.12;
    cols[i * 3] = c.r * shade;
    cols[i * 3 + 1] = c.g * shade;
    cols[i * 3 + 2] = c.b * shade;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));

  const mat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap });
  const terrain = new THREE.Mesh(geo, mat);
  terrain.receiveShadow = true;
  terrain.frustumCulled = false;
  group.add(terrain);

  // 협곡을 따라 지평선 너머로 이어지는 강 (섬의 시냇물과 연결)
  if (waterTex) {
    const wMat = new THREE.MeshBasicMaterial({ map: waterTex });
    [1, -1].forEach(side => {
      const len = 700;
      const w = new THREE.Mesh(new THREE.PlaneGeometry(len, 9), wMat);
      w.rotation.x = -Math.PI / 2;
      w.position.set(side * (239.5 + len / 2), 0.15, WQ_RIVER_Z);
      group.add(w);
    });
  }

  return group;
}

// ==========================================================================
// 2. Instanced 숲 (침엽수 / 활엽수 / 벚꽃) - 언덕과 산자락을 따라 배치
// ==========================================================================
function wqPineGeo() {
  const trunk = new THREE.CylinderGeometry(0.22, 0.38, 2.4, 7);
  trunk.translate(0, 1.2, 0);
  const leafGrad = wqGradient(0x1d4a2b, 0x4c9a52, 1.5, 8.2);
  return wqMergeColored([
    { geo: trunk, color: new THREE.Color(0x5b3a1e) },
    { geo: wqJaggedCone(2.5, 3.2, 3.1, 10, 1.1), color: leafGrad },
    { geo: wqJaggedCone(2.0, 2.9, 4.7, 10, 2.3), color: leafGrad },
    { geo: wqJaggedCone(1.45, 2.5, 6.1, 9, 3.7), color: leafGrad },
    { geo: wqJaggedCone(0.8, 1.8, 7.3, 8, 5.1), color: leafGrad }
  ]);
}
function wqRoundTreeGeo(isSakura) {
  const trunk = new THREE.CylinderGeometry(0.28, 0.45, 2.8, 7);
  trunk.translate(0, 1.4, 0);
  const grad = isSakura ? wqGradient(0xe879a6, 0xffd6e5, 2.4, 6.4) : wqGradient(0x2d6a2a, 0x7cc552, 2.4, 6.4);
  return wqMergeColored([
    { geo: trunk, color: new THREE.Color(isSakura ? 0x4a2c22 : 0x5b3a1e) },
    { geo: wqBlobGeo(2.0, 1, 0, 3.9, 0, 0.9, 0.2, 1.3), color: grad },
    { geo: wqBlobGeo(1.5, 1, 1.1, 4.6, 0.4, 0.9, 0.2, 4.1), color: grad },
    { geo: wqBlobGeo(1.4, 1, -1.0, 4.4, -0.5, 0.9, 0.2, 7.7), color: grad },
    { geo: wqBlobGeo(1.2, 1, 0.1, 5.4, -0.2, 0.9, 0.2, 9.2), color: grad }
  ]);
}

function createInstancedForest3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const rand = wqRng(20261019);

  const types = [
    { geo: wqPineGeo(), max: 1500, list: [] },
    { geo: wqRoundTreeGeo(false), max: 750, list: [] },
    { geo: wqRoundTreeGeo(true), max: 220, list: [] }
  ];

  let guard = 0;
  const target = types.reduce((s, t) => s + t.max, 0);
  let placed = 0;
  while (placed < target && guard < 60000) {
    guard++;
    const x = (rand() - 0.5) * 1300;
    const z = -125 + (rand() - 0.5) * 1350;
    const rr = Math.hypot(x, z);
    const d = wqMaskDist(x, z);
    // 카메라가 닿는 범위(섬 반경 ~241m, 협곡 폭 ±40m)에는 나무를 두지 않음 → 화면 가림 방지
    const islandBelt = rr >= 243 && rr <= 250 && z > -240;
    if (!(d >= 2 || islandBelt)) continue;
    if (rr < 243 && z > -250) continue;
    if (z < -250 && Math.abs(x) < 44) continue;
    if (d > 230) continue;
    if (Math.abs(z - WQ_RIVER_Z) < 11) continue;
    const y = wqSurfaceY(x, z);
    if (y > 100) continue;
    const slope = Math.abs(wqTerrainHeight(x + 2, z) - wqTerrainHeight(x - 2, z)) / 4 +
      Math.abs(wqTerrainHeight(x, z + 2) - wqTerrainHeight(x, z - 2)) / 4;
    if (slope > 0.85) continue;
    const dens = wqFbm(x * 0.012 + 40, z * 0.012 - 20, 3);
    if (dens < 0.46 && rand() > 0.12) continue;

    let ti;
    if (y > 24 || rand() < 0.5) ti = 0;
    else if (y < 14 && rand() < 0.22) ti = 2;
    else ti = 1;
    if (types[ti].list.length >= types[ti].max) {
      ti = types.findIndex(t => t.list.length < t.max);
      if (ti < 0) break;
    }
    const s = ti === 0 ? 1.0 + rand() * 1.3 + Math.min(y, 60) * 0.006 : 0.95 + rand() * 0.9;
    types[ti].list.push({ x, y: y - 0.25, z, s, rot: rand() * Math.PI * 2, tint: 0.86 + rand() * 0.22 });
    placed++;
  }

  const dummy = new THREE.Object3D();
  const col = new THREE.Color();
  types.forEach(t => {
    if (!t.list.length) return;
    const mat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap });
    const mesh = new THREE.InstancedMesh(t.geo, mat, t.list.length);
    t.list.forEach((it, i) => {
      dummy.position.set(it.x, it.y, it.z);
      dummy.rotation.set((rand() - 0.5) * 0.08, it.rot, (rand() - 0.5) * 0.08);
      dummy.scale.set(it.s, it.s * (0.92 + rand() * 0.2), it.s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      col.setRGB(it.tint, it.tint, it.tint * (0.95 + rand() * 0.08));
      mesh.setColorAt(i, col);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    group.add(mesh);
  });
  return group;
}

// ==========================================================================
// 3. 툰 바위 / 덤불 / 들꽃 (Instanced)
// ==========================================================================
function wqRockGeo() {
  const g = new THREE.IcosahedronGeometry(1, 1);
  const p = g.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i), y = p.getY(i), z = p.getZ(i);
    const k = 0.78 + wqNoise(x * 1.9 + 5, z * 1.9 + y * 1.3) * 0.45;
    p.setXYZ(i, x * k * 1.15, Math.max(y * k * 0.72, -0.35), z * k);
  }
  g.computeVertexNormals();
  return g;
}

function createScatterDetails3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const rand = wqRng(777);
  const dummy = new THREE.Object3D();
  const col = new THREE.Color();

  // --- 바위: 언덕의 큰 바위 + 섬 안의 작은 조약돌 ---
  const rocks = [];
  let guard = 0;
  while (rocks.length < 230 && guard < 20000) {
    guard++;
    const a = rand() * Math.PI * 2;
    const r = 245 + rand() * 140;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (wqMaskDist(x, z) < 1 || Math.abs(z - WQ_RIVER_Z) < 8) continue;
    const s = 1.3 + rand() * 3.6;
    rocks.push({ x, y: wqSurfaceY(x, z) - s * 0.15, z, s });
  }
  guard = 0;
  // 전투 협곡 양옆 낙석
  while (rocks.length < 330 && guard < 20000) {
    guard++;
    const side = rand() < 0.5 ? -1 : 1;
    const x = side * (43 + rand() * 32);
    const z = -280 - rand() * 330;
    const s = 1.5 + rand() * 4.0;
    rocks.push({ x, y: wqSurfaceY(x, z) - s * 0.2, z, s });
  }
  guard = 0;
  while (rocks.length < 470 && guard < 20000) {
    guard++;
    const a = rand() * Math.PI * 2;
    const r = 26 + Math.sqrt(rand()) * 190;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (wqIsBlocked(x, z, 1)) continue;
    rocks.push({ x, y: 0, z, s: 0.3 + rand() * 0.55 });
  }
  const rockMat = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap, flatShading: true });
  const rockMesh = new THREE.InstancedMesh(wqRockGeo(), rockMat, rocks.length);
  const rockPalette = [0xa8a29e, 0x9ca3af, 0xb8ab97, 0x8f877c];
  rocks.forEach((rk, i) => {
    dummy.position.set(rk.x, rk.y, rk.z);
    dummy.rotation.set((rand() - 0.5) * 0.4, rand() * Math.PI * 2, (rand() - 0.5) * 0.4);
    dummy.scale.set(rk.s * (0.8 + rand() * 0.5), rk.s * (0.7 + rand() * 0.5), rk.s * (0.8 + rand() * 0.5));
    dummy.updateMatrix();
    rockMesh.setMatrixAt(i, dummy.matrix);
    col.setHex(rockPalette[Math.floor(rand() * rockPalette.length)]);
    rockMesh.setColorAt(i, col);
  });
  rockMesh.castShadow = true;
  rockMesh.receiveShadow = true;
  rockMesh.frustumCulled = false;
  group.add(rockMesh);

  // --- 덤불: 꽃 핀 둥근 덤불 ---
  const bushGeo = wqMergeColored([
    { geo: wqBlobGeo(0.9, 1, 0, 0.55, 0, 0.8, 0.22, 2.2, 0.55), color: wqGradient(0x2f6b25, 0x86c95a, 0, 1.3) },
    { geo: wqBlobGeo(0.7, 1, 0.75, 0.45, 0.2, 0.8, 0.22, 5.4, 0.55), color: wqGradient(0x2f6b25, 0x86c95a, 0, 1.3) },
    { geo: wqBlobGeo(0.65, 1, -0.7, 0.42, -0.25, 0.8, 0.22, 8.8, 0.55), color: wqGradient(0x2f6b25, 0x86c95a, 0, 1.3) }
  ]);
  const bushes = [];
  guard = 0;
  while (bushes.length < 420 && guard < 30000) {
    guard++;
    const a = rand() * Math.PI * 2;
    const r = 28 + Math.pow(rand(), 0.6) * 215;
    const x = Math.cos(a) * r, z = Math.sin(a) * r;
    if (r < 220 && wqIsBlocked(x, z, 1.5)) continue;
    if (Math.abs(z - WQ_RIVER_Z) < 7) continue;
    if (wqFbm(x * 0.03, z * 0.03, 2) < 0.42 && rand() > 0.3) continue;
    const y = wqSurfaceY(x, z);
    if (y > 30) continue;
    bushes.push({ x, y, z, s: 0.75 + rand() * 0.8 });
  }
  const bushMat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap });
  const bushMesh = new THREE.InstancedMesh(bushGeo, bushMat, bushes.length);
  bushes.forEach((b, i) => {
    dummy.position.set(b.x, b.y - 0.05, b.z);
    dummy.rotation.set(0, rand() * Math.PI * 2, 0);
    dummy.scale.setScalar(b.s);
    dummy.updateMatrix();
    bushMesh.setMatrixAt(i, dummy.matrix);
    const t = 0.88 + rand() * 0.22;
    col.setRGB(t, t, t);
    bushMesh.setColorAt(i, col);
  });
  bushMesh.castShadow = true;
  bushMesh.receiveShadow = true;
  bushMesh.frustumCulled = false;
  group.add(bushMesh);

  return group;
}

// 5장 꽃잎 들꽃 1,600송이 (꽃잎·꽃술·줄기 3 드로우콜)
function createInstancedFlowerField3D() {
  const group = new THREE.Group();
  const rand = wqRng(4242);
  const count = 1600;

  const petalParts = [];
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2;
    const pg = new THREE.SphereGeometry(0.15, 8, 6);
    pg.scale(1.0, 0.32, 0.62);
    pg.translate(0.17, 0, 0);
    pg.rotateY(a);
    petalParts.push({ geo: pg, color: new THREE.Color(0xffffff) });
  }
  const petalGeo = wqMergeColored(petalParts);
  petalGeo.translate(0, 0.55, 0);
  const centerGeo = new THREE.SphereGeometry(0.085, 8, 6);
  centerGeo.scale(1, 0.6, 1);
  centerGeo.translate(0, 0.58, 0);
  const stemGeo = new THREE.CylinderGeometry(0.025, 0.035, 0.56, 5);
  stemGeo.translate(0, 0.28, 0);
  const leafGeo = new THREE.SphereGeometry(0.12, 6, 4);
  leafGeo.scale(1.4, 0.18, 0.55);
  leafGeo.translate(0.12, 0.18, 0);
  const stemAll = wqMergeColored([
    { geo: stemGeo, color: new THREE.Color(0x3f8f2f) },
    { geo: leafGeo, color: new THREE.Color(0x4ea83a) }
  ]);

  const petalMat = new THREE.MeshLambertMaterial({ vertexColors: true, side: THREE.DoubleSide });
  const centerMat = new THREE.MeshLambertMaterial({ color: 0xfacc15, emissive: 0x332200 });
  const stemMat = new THREE.MeshLambertMaterial({ vertexColors: true });

  const petals = new THREE.InstancedMesh(petalGeo, petalMat, count);
  const centers = new THREE.InstancedMesh(centerGeo, centerMat, count);
  const stems = new THREE.InstancedMesh(stemAll, stemMat, count);

  const palette = [0xff85a2, 0xfacc15, 0xffffff, 0xc084fc, 0x60a5fa, 0xfda4af, 0xfde68a];
  const dummy = new THREE.Object3D();
  const col = new THREE.Color();
  let i = 0;
  let guard = 0;
  while (i < count && guard < count * 8) {
    guard++;
    // 군락 단위로 피어나는 꽃밭
    const ca = rand() * Math.PI * 2;
    const cr = 23 + Math.sqrt(rand()) * 195;
    const cx = Math.cos(ca) * cr, cz = Math.sin(ca) * cr;
    if (wqIsBlocked(cx, cz, 0.5)) continue;
    const colorHex = palette[Math.floor(rand() * palette.length)];
    const n = 4 + Math.floor(rand() * 9);
    for (let k = 0; k < n && i < count; k++) {
      const x = cx + (rand() - 0.5) * 4.5;
      const z = cz + (rand() - 0.5) * 4.5;
      if (wqIsBlocked(x, z, 0)) continue;
      const s = 0.75 + rand() * 0.6;
      dummy.position.set(x, 0, z);
      dummy.rotation.set((rand() - 0.5) * 0.35, rand() * Math.PI * 2, (rand() - 0.5) * 0.35);
      dummy.scale.set(s, s * (0.8 + rand() * 0.5), s);
      dummy.updateMatrix();
      petals.setMatrixAt(i, dummy.matrix);
      centers.setMatrixAt(i, dummy.matrix);
      stems.setMatrixAt(i, dummy.matrix);
      col.setHex(colorHex).offsetHSL(0, 0, (rand() - 0.5) * 0.08);
      petals.setColorAt(i, col);
      i++;
    }
  }
  [petals, centers, stems].forEach(m => {
    m.count = i;
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    m.frustumCulled = false;
    group.add(m);
  });
  return group;
}

// ==========================================================================
// 4. 입체 그라데이션 뭉게구름
// ==========================================================================
let wqCloudMat = null;
function createHQCloud3D(seed = 1) {
  const rand = wqRng(seed * 9973 + 11);
  const parts = [];
  const puffs = 7 + Math.floor(rand() * 5);
  const length = 10 + rand() * 9;
  for (let k = 0; k < puffs; k++) {
    const t = puffs === 1 ? 0 : k / (puffs - 1) - 0.5;
    const r = (3.2 + rand() * 2.6) * (1 - Math.abs(t) * 0.9);
    const x = t * length * 1.6 + (rand() - 0.5) * 2;
    const y = Math.max(0, r * 0.35 + (rand() - 0.3) * 1.4);
    const z = (rand() - 0.5) * 5;
    parts.push({ geo: wqBlobGeo(Math.max(1.6, r), 2, x, y, z, 0.9, 0.12, seed + k, 0.15), color: wqGradient(0xc9d6ea, 0xffffff, -0.5, 4.5) });
  }
  // 위쪽으로 솟은 탑 뭉치 (적운 느낌)
  parts.push({ geo: wqBlobGeo(3.4 + rand() * 1.5, 2, (rand() - 0.5) * 4, 3.6, 0, 1.0, 0.12, seed + 50, 0.4), color: wqGradient(0xc9d6ea, 0xffffff, 0, 6) });
  const geo = wqMergeColored(parts);
  if (!wqCloudMat) {
    wqCloudMat = new THREE.MeshToonMaterial({
      vertexColors: true,
      gradientMap: getToonGradientMap(),
      emissive: new THREE.Color(0x8fa3bf),
      emissiveIntensity: 0.42
    });
  }
  const mesh = new THREE.Mesh(geo, wqCloudMat);
  const g = new THREE.Group();
  g.add(mesh);
  return g;
}

// ==========================================================================
// 5. 히어로 나무 (마을 곳곳의 디테일 나무) - 휘어진 줄기, 가지, 풍성한 수관
// ==========================================================================
let wqPetalDecalTex = null;
function wqGetPetalDecalTexture() {
  if (wqPetalDecalTex) return wqPetalDecalTex;
  const S = 256;
  const cv = document.createElement('canvas');
  cv.width = S;
  cv.height = S;
  const ctx = cv.getContext('2d');
  const rand = wqRng(99);
  for (let i = 0; i < 170; i++) {
    const a = rand() * Math.PI * 2;
    const r = Math.pow(rand(), 0.7) * S * 0.46;
    const x = S / 2 + Math.cos(a) * r;
    const y = S / 2 + Math.sin(a) * r;
    const fade = 1 - r / (S * 0.5);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rand() * Math.PI);
    ctx.fillStyle = `rgba(${245 + rand() * 10 | 0}, ${170 + rand() * 50 | 0}, ${195 + rand() * 30 | 0}, ${0.55 + fade * 0.4})`;
    ctx.beginPath();
    ctx.ellipse(0, 0, 4 + rand() * 3, 2.4 + rand() * 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
  wqPetalDecalTex = new THREE.CanvasTexture(cv);
  return wqPetalDecalTex;
}

function createHQTree3D(isSakura = false, seed = 1) {
  const tree = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const rand = wqRng(seed * 131 + (isSakura ? 7 : 3));

  const barkMat = new THREE.MeshToonMaterial({ color: isSakura ? 0x5b3427 : 0x6b4423, gradientMap });

  // 살짝 휘어진 줄기
  const trunkGeo = new THREE.CylinderGeometry(0.42, 0.85, 4.0, 12, 8);
  const bendX = (rand() - 0.5) * 0.7;
  const bendZ = (rand() - 0.5) * 0.7;
  const tp = trunkGeo.attributes.position;
  for (let i = 0; i < tp.count; i++) {
    const y = tp.getY(i);
    const t = (y + 2.0) / 4.0;
    // 밑동이 퍼지는 뿌리 플레어
    const flare = 1 + Math.pow(1 - t, 4) * 0.45;
    tp.setXYZ(i, tp.getX(i) * flare + Math.sin(t * Math.PI * 0.8) * bendX, y, tp.getZ(i) * flare + Math.sin(t * Math.PI * 0.8) * bendZ);
  }
  trunkGeo.computeVertexNormals();
  const trunk = new THREE.Mesh(trunkGeo, barkMat);
  trunk.position.y = 2.0;
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  addCartoonOutline(trunk, 0.045);
  tree.add(trunk);

  // 가지 2~3개
  const branchN = 2 + Math.floor(rand() * 2);
  for (let b = 0; b < branchN; b++) {
    const bg = new THREE.CylinderGeometry(0.12, 0.26, 2.0, 7);
    bg.translate(0, 1.0, 0);
    const br = new THREE.Mesh(bg, barkMat);
    const a = (b / branchN) * Math.PI * 2 + rand();
    br.position.set(bendX * 0.6, 3.1 + rand() * 0.6, bendZ * 0.6);
    br.rotation.set(Math.sin(a) * 0.9, 0, Math.cos(a) * 0.9);
    br.castShadow = true;
    tree.add(br);
  }

  // 풍성한 수관: 8~10개 덩어리를 하나로 병합 (위는 밝고 아래는 어두운 그라데이션)
  const grad = isSakura ? wqGradient(0xec7fa9, 0xffe3ec, -1.6, 2.6) : wqGradient(0x2f7a35, 0x8ad468, -1.6, 2.6);
  const parts = [];
  const blobN = 8 + Math.floor(rand() * 3);
  parts.push({ geo: wqBlobGeo(2.3, 3, 0, 0, 0, 0.86, 0.1, seed), color: grad });
  for (let k = 0; k < blobN; k++) {
    const a = (k / blobN) * Math.PI * 2 + rand() * 0.5;
    const rr = 1.6 + rand() * 0.8;
    const y = (rand() - 0.35) * 1.6;
    parts.push({
      geo: wqBlobGeo(1.15 + rand() * 0.75, 2, Math.cos(a) * rr, y, Math.sin(a) * rr, 0.85, 0.12, seed * 3 + k),
      color: grad
    });
  }
  parts.push({ geo: wqBlobGeo(1.4, 2, 0.2, 1.7, -0.1, 0.9, 0.12, seed + 77), color: grad });
  const crownGeo = wqMergeColored(parts);
  const leafMat = new THREE.MeshToonMaterial({ vertexColors: true, gradientMap });
  const crown = new THREE.Mesh(crownGeo, leafMat);
  crown.position.set(bendX * 0.9, 5.3, bendZ * 0.9);
  crown.rotation.y = rand() * Math.PI * 2;
  crown.castShadow = true;
  crown.receiveShadow = true;
  addCartoonOutline(crown, 0.035, isSakura ? 0x6b2d45 : 0x1f3d1a);
  tree.add(crown);

  // 벚꽃 나무 아래 흩날려 쌓인 꽃잎 데칼
  if (isSakura) {
    const decal = new THREE.Mesh(
      new THREE.CircleGeometry(4.6, 24),
      new THREE.MeshBasicMaterial({ map: wqGetPetalDecalTexture(), transparent: true, depthWrite: false })
    );
    decal.rotation.x = -Math.PI / 2;
    decal.position.y = 0.04;
    decal.renderOrder = 1;
    tree.add(decal);
  }

  return tree;
}

export { WQ_EXCLUDE, createHQCloud3D, createHQTree3D, createInstancedFlowerField3D, createInstancedForest3D, createOuterTerrain3D };
// 전역(window)으로도 노출: HTML onclick, 다른 모듈의 런타임 참조, 디버그 콘솔용
expose({
  get wqHash() { return wqHash; }, set wqHash(v) { wqHash = v; },
  get wqNoise() { return wqNoise; }, set wqNoise(v) { wqNoise = v; },
  get wqFbm() { return wqFbm; }, set wqFbm(v) { wqFbm = v; },
  get wqRidge() { return wqRidge; }, set wqRidge(v) { wqRidge = v; },
  get wqSmooth() { return wqSmooth; }, set wqSmooth(v) { wqSmooth = v; },
  get wqRng() { return wqRng; }, set wqRng(v) { wqRng = v; },
  get WQ_ISLAND_R() { return WQ_ISLAND_R; },
  get WQ_BASE_Y() { return WQ_BASE_Y; },
  get WQ_RIVER_Z() { return WQ_RIVER_Z; },
  get wqCorridorDist() { return wqCorridorDist; }, set wqCorridorDist(v) { wqCorridorDist = v; },
  get wqMaskDist() { return wqMaskDist; }, set wqMaskDist(v) { wqMaskDist = v; },
  get wqRiverFactor() { return wqRiverFactor; }, set wqRiverFactor(v) { wqRiverFactor = v; },
  get wqTerrainHeight() { return wqTerrainHeight; }, set wqTerrainHeight(v) { wqTerrainHeight = v; },
  get wqSurfaceY() { return wqSurfaceY; }, set wqSurfaceY(v) { wqSurfaceY = v; },
  get WQ_EXCLUDE() { return WQ_EXCLUDE; },
  get WQ_PATHS() { return WQ_PATHS; },
  get wqSegDist() { return wqSegDist; }, set wqSegDist(v) { wqSegDist = v; },
  get wqIsBlocked() { return wqIsBlocked; }, set wqIsBlocked(v) { wqIsBlocked = v; },
  get wqNonIndexed() { return wqNonIndexed; }, set wqNonIndexed(v) { wqNonIndexed = v; },
  get wqMergeColored() { return wqMergeColored; }, set wqMergeColored(v) { wqMergeColored = v; },
  get wqBlobGeo() { return wqBlobGeo; }, set wqBlobGeo(v) { wqBlobGeo = v; },
  get wqGradient() { return wqGradient; }, set wqGradient(v) { wqGradient = v; },
  get wqJaggedCone() { return wqJaggedCone; }, set wqJaggedCone(v) { wqJaggedCone = v; },
  get createOuterTerrain3D() { return createOuterTerrain3D; }, set createOuterTerrain3D(v) { createOuterTerrain3D = v; },
  get wqPineGeo() { return wqPineGeo; }, set wqPineGeo(v) { wqPineGeo = v; },
  get wqRoundTreeGeo() { return wqRoundTreeGeo; }, set wqRoundTreeGeo(v) { wqRoundTreeGeo = v; },
  get createInstancedForest3D() { return createInstancedForest3D; }, set createInstancedForest3D(v) { createInstancedForest3D = v; },
  get wqRockGeo() { return wqRockGeo; }, set wqRockGeo(v) { wqRockGeo = v; },
  get createScatterDetails3D() { return createScatterDetails3D; }, set createScatterDetails3D(v) { createScatterDetails3D = v; },
  get createInstancedFlowerField3D() { return createInstancedFlowerField3D; }, set createInstancedFlowerField3D(v) { createInstancedFlowerField3D = v; },
  get wqCloudMat() { return wqCloudMat; }, set wqCloudMat(v) { wqCloudMat = v; },
  get createHQCloud3D() { return createHQCloud3D; }, set createHQCloud3D(v) { createHQCloud3D = v; },
  get wqPetalDecalTex() { return wqPetalDecalTex; }, set wqPetalDecalTex(v) { wqPetalDecalTex = v; },
  get wqGetPetalDecalTexture() { return wqGetPetalDecalTexture; }, set wqGetPetalDecalTexture(v) { wqGetPetalDecalTexture = v; },
  get createHQTree3D() { return createHQTree3D; }, set createHQTree3D(v) { createHQTree3D = v; }
});
