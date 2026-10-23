// ⚙️ ES 모듈 (자동 변환): 앞쪽 모듈은 import, 뒤쪽 모듈·덮어쓰기 되는 이름은 window.이름 으로 참조
import THREE from '../core/three.js';
import { MeshoptDecoder } from 'meshoptimizer';
import { getToonGradientMap } from '../core/models3d.js';
import { TOWNHQ } from './town_hq.js';
import { expose } from '../core/expose.js';
// ==========================================================================
// 🏘️ TOWNBAKE: 마을 구조물·소품을 Blender에서 라이트맵(GI·AO)을 구운 모델로 교체
//  - town_hq.js 빌더 결과물(userData.bakeKey)에서 "정적인" 메시만 떼어내 구운 1개 메시로 바꿈
//  - 움직이는 것(풍차 날개·물·불꽃·등불·연기·창문 불빛 등)과 충돌 정보는 그대로 유지
//  - 효과: 구석·접지 그림자, 색 번짐 → 입체감↑ / 구조물당 드로우콜 수백 → 1~2개 → 저사양에서도 가벼움
//  - 끄기(비교용): localStorage.setItem('chiikawa_baked', 'off')
// ==========================================================================
const TOWNBAKE = (() => {
  const BASE = 'assets/baked/';
  const LIT = new Set(['MeshToonMaterial', 'MeshLambertMaterial', 'MeshStandardMaterial', 'MeshPhongMaterial', 'MeshPhysicalMaterial']);
  const EMPTY = new THREE.BufferGeometry();
  let enabled = true;
  try { enabled = localStorage.getItem('chiikawa_baked') !== 'off'; } catch (e) { /* 무시 */ }
  let manifest = null;
  let manifestP = null;
  const loaded = new Map(); // key -> Promise<{ geo, mat, outlineGeo } | null>
  const pending = new Set();
  let swaps = 0;
  // 시간대(낮·노을·밤)에 따라 구운 조명 위에 색을 곱함 (캐릭터 입간판 색조와 맞춤)
  const unlitMats = [];
  const tint = new THREE.Color(1, 1, 1);
  const TINTS = { day: new THREE.Color(1, 1, 1), sunset: new THREE.Color(1.0, 0.86, 0.76), night: new THREE.Color(0.5, 0.56, 0.82) };
  function updateTint(app, dt) {
    const want = TINTS[(app && app.timeOfDay) || 'day'] || TINTS.day;
    const k = Math.min(1, (dt || 0.016) * 2.5);
    tint.r += (want.r - tint.r) * k; tint.g += (want.g - tint.g) * k; tint.b += (want.b - tint.b) * k;
    for (const m of unlitMats) m.color.copy(tint);
  }

  // ------------------------------------------------------------------
  // 정적/동적 분류 (굽기 도구와 실행 시 똑같이 사용)
  // ------------------------------------------------------------------
  function liveRefs(root) {
    const objs = new Set(), mats = new Set();
    const addVal = v => {
      if (!v) return;
      if (Array.isArray(v)) { v.forEach(addVal); return; }
      if (v.isObject3D) objs.add(v);
      else if (v.isMaterial) mats.add(v);
      else if (typeof v === 'object' && v.sp && v.sp.isObject3D) objs.add(v.sp);
    };
    const anims = (typeof TOWNHQ !== 'undefined' && TOWNHQ.animOf) ? TOWNHQ.animOf(root) : [];
    anims.forEach(a => Object.keys(a).forEach(k => { if (k !== 'type') addVal(a[k]); }));
    Object.keys(root.userData || {}).forEach(k => addVal(root.userData[k]));
    return { objs, mats };
  }
  function staticMeshes(root) {
    const { objs, mats } = liveRefs(root);
    if (objs.has(root)) return [];
    const out = [];
    const walk = (o, live) => {
      if (o !== root && o.userData && o.userData.bakeKey && o.userData._baked) live = true;
      if (objs.has(o) || (o.userData && o.userData.keepLive)) live = true;
      if (o.isMesh && !(o.userData && o.userData.isOutline)) {
        const ms = Array.isArray(o.material) ? o.material : [o.material];
        const dyn = live || o.isInstancedMesh || o.isSkinnedMesh || !o.geometry || !o.geometry.attributes.position ||
          ms.some(m => !m || mats.has(m) || !LIT.has(m.type) || m.transparent || m.opacity < 1 || !m.visible ||
            (m.emissive && (m.emissive.r + m.emissive.g + m.emissive.b) > 0.05) || m.side === THREE.BackSide) ||
          (o.geometry.morphAttributes && Object.keys(o.geometry.morphAttributes).length);
        if (!dyn && o.visible) out.push(o);
      }
      o.children.forEach(c => walk(c, live || !o.visible));
    };
    walk(root, false);
    return out;
  }

  // ------------------------------------------------------------------
  // 로딩
  // ------------------------------------------------------------------
  function getManifest() {
    if (!manifestP) {
      manifestP = fetch(BASE + 'manifest.json', { cache: 'no-cache' }).then(r => (r.ok ? r.json() : null)).catch(() => null)
        .then(m => { manifest = m; return m; });
    }
    return manifestP;
  }
  function loadGlb(url) {
    return new Promise((res, rej) => {
      const loader = new THREE.GLTFLoader();
      if (typeof MeshoptDecoder !== 'undefined') loader.setMeshoptDecoder(MeshoptDecoder);
      loader.load(url, res, undefined, rej);
    });
  }
  function firstMesh(gltf) {
    if (!gltf) return null;
    let m = null;
    gltf.scene.traverse(o => { if (!m && o.isMesh) m = o; });
    if (m) m.updateMatrixWorld(true);
    return m;
  }
  // 압축(양자화)된 정점을 일반 실수로 풀고, 노드 변형까지 적용
  function floatGeometry(src) {
    const geo = new THREE.BufferGeometry();
    Object.keys(src.geometry.attributes).forEach(name => {
      const at = src.geometry.attributes[name];
      const arr = new Float32Array(at.count * at.itemSize);
      const raw = at.isInterleavedBufferAttribute ? at.data.array : at.array;
      // three r139+ 는 getX가 정규화를 이미 풀어줌 (r128은 원시 정수값)
      const div = (!at.normalized || parseInt(THREE.REVISION, 10) >= 139) ? 1 : raw instanceof Int8Array ? 127 : raw instanceof Uint8Array ? 255 : raw instanceof Int16Array ? 32767 : raw instanceof Uint16Array ? 65535 : 1;
      const get = [at.getX, at.getY, at.getZ, at.getW];
      for (let i = 0; i < at.count; i++) for (let c = 0; c < at.itemSize; c++) {
        const v = get[c].call(at, i);
        arr[i * at.itemSize + c] = div > 1 ? Math.max(-1, v / div) : v;
      }
      geo.setAttribute(name, new THREE.BufferAttribute(arr, at.itemSize));
    });
    if (src.geometry.index) geo.setIndex(new THREE.BufferAttribute(Uint32Array.from(src.geometry.index.array), 1));
    geo.applyMatrix4(src.matrixWorld);
    geo.computeBoundingSphere();
    return geo;
  }
  const OUTLINE_MAT = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide });

  function loadKey(key) {
    if (loaded.has(key)) return loaded.get(key);
    const ent = manifest && manifest.items && manifest.items[key];
    if (!ent || typeof THREE.GLTFLoader === 'undefined') { loaded.set(key, Promise.resolve(null)); return loaded.get(key); }
    const p = Promise.all([loadGlb(`${BASE}${ent.file}?v=${ent.v}`), ent.ol ? loadGlb(`${BASE}${ent.ol}?v=${ent.olv || ent.v}`) : null]).then(([g, og]) => {
      const src = firstMesh(g);
      if (!src) return null;
      const geo = floatGeometry(src);
      if (geo.attributes.normal) geo.normalizeNormals();
      const map = src.material.map;
      if (map) { map.colorSpace = THREE.NoColorSpace; map.anisotropy = 4; map.needsUpdate = true; }
      // full: 햇빛·하늘빛·그림자까지 구워져 있으므로 조명 계산 없는 재질(가볍고 저사양에서도 같은 모습)
      const mat = ent.mode === 'full'
        ? new THREE.MeshBasicMaterial({ map, color: tint.clone() })
        : new THREE.MeshToonMaterial({ map, gradientMap: typeof getToonGradientMap === 'function' ? getToonGradientMap() : null });
      mat.userData.baked = true;
      if (ent.mode === 'full') unlitMats.push(mat);
      let oGeo = null;
      const osrc = firstMesh(og);
      if (osrc) oGeo = floatGeometry(osrc);
      return { geo, mat, oGeo, ent };
    }).catch(() => null);
    loaded.set(key, p);
    return p;
  }

  // ------------------------------------------------------------------
  // 교체
  // ------------------------------------------------------------------
  function swap(root, b) {
    if (root.userData._baked || !b) return;
    const list = staticMeshes(root);
    if (!list.length) return;
    list.forEach(m => {
      // 자식(움직이는 부품)·충돌 정보는 살려두고 이 메시의 모양만 비움
      // 원래 외곽선은 지우고, 구운 모델과 똑같이 맞춘 외곽선(.ol.glb)을 대신 붙임
      m.children.filter(c => c.userData && c.userData.isOutline).forEach(c => m.remove(c));
      m.geometry = EMPTY;
      m.castShadow = false;
    });
    const mesh = new THREE.Mesh(b.geo, b.mat);
    mesh.name = 'baked:' + root.userData.bakeKey;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.userData.bakedMesh = true;
    if (b.oGeo) {
      const ol = new THREE.Mesh(b.oGeo, OUTLINE_MAT);
      ol.userData.isOutline = true;
      ol.visible = !(window.gameApp && window.gameApp.lowPower);
      mesh.add(ol);
    }
    // 구운 모델은 루트 기준 좌표 (루트의 스케일이 1이 아닐 수도 있어 역보정 불필요: 굽기도 루트 기준)
    root.add(mesh);
    root.userData._baked = true;
    swaps++;
    if (typeof window.POLISH !== 'undefined' && window.POLISH.rescanOccluder) { try { window.POLISH.rescanOccluder(root); } catch (e) { /* 무시 */ } }
  }
  function outermost(scene, fn) {
    const walk = o => {
      if (o.userData && o.userData.bakeKey) { fn(o); return; }
      o.children.forEach(walk);
    };
    walk(scene);
  }
  async function process(scene) {
    if (!enabled || !scene) return;
    const m = await getManifest();
    if (!m || !m.items) return;
    const jobs = [];
    outermost(scene, o => {
      if (o.userData._baked || pending.has(o)) return;
      const key = o.userData.bakeKey;
      if (!m.items[key]) return;
      pending.add(o);
      jobs.push(loadKey(key).then(b => { pending.delete(o); if (o.parent) swap(o, b); }));
    });
    await Promise.all(jobs);
  }
  // 미리 받기 (게임 시작 전 로비에서)
  function preload() {
    if (!enabled) return;
    getManifest().then(m => { if (m && m.items) Object.keys(m.items).forEach(loadKey); });
  }

  // ------------------------------------------------------------------
  // 조립식 부품 (전투 스테이지·레이드): kit.json → { 이름: { geo, map } }
  //  - 가림(AO)만 구운 텍스처 → 게임에서 툰 재질 + 테마 색을 곱해 씀
  // ------------------------------------------------------------------
  let kitP = null;
  function loadKit() {
    if (!enabled) return Promise.resolve(null);
    if (kitP) return kitP;
    kitP = fetch(BASE + 'kit.json', { cache: 'no-cache' }).then(r => (r.ok ? r.json() : null)).catch(() => null).then(async m => {
      if (!m || !m.items || typeof THREE.GLTFLoader === 'undefined') return null;
      const out = {};
      await Promise.all(Object.entries(m.items).map(async ([k, ent]) => {
        try {
          const src = firstMesh(await loadGlb(`${BASE}${ent.file}?v=${ent.v}`));
          if (!src) return;
          const geo = floatGeometry(src);
          if (geo.attributes.normal) geo.normalizeNormals();
          const map = src.material.map;
          if (map) { map.colorSpace = THREE.NoColorSpace; map.anisotropy = 4; map.needsUpdate = true; }
          out[k] = { geo, map };
        } catch (e) { /* 이 부품만 원래 모양 유지 */ }
      }));
      return out;
    });
    return kitP;
  }
  // 부품용 툰 외곽선 (인스턴스도 그대로 따라감): 법선 방향으로 부풀린 뒷면
  const KIT_OL = new THREE.MeshBasicMaterial({ color: 0x2b1d19, side: THREE.BackSide });
  KIT_OL.onBeforeCompile = sh => { sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = position + normal * 0.035;'); };
  // 카메라와 캐릭터 사이를 가리는 부품은 인스턴스별로 '점무늬 투명'(디더)으로 흐리게 → aFade(0~1)
  const DITHER = `
    float kitBayer(vec2 p){ return fract(52.9829189 * fract(dot(floor(p), vec2(0.06711056, 0.00583715)))); }`;
  function fadeGeo(geo, n) {
    const g = new THREE.BufferGeometry();
    for (const k in geo.attributes) g.setAttribute(k, geo.attributes[k]);
    if (geo.index) g.setIndex(geo.index);
    g.boundingSphere = geo.boundingSphere; g.boundingBox = geo.boundingBox;
    const fa = new THREE.InstancedBufferAttribute(new Float32Array(n), 1);
    fa.setUsage(THREE.DynamicDrawUsage);
    g.setAttribute('aFade', fa);
    return g;
  }
  function fadePatch(mat, outlineMode) {
    if (mat.userData._kitFade) return mat;
    mat.userData._kitFade = true;
    const prev = mat.onBeforeCompile;
    mat.onBeforeCompile = (sh, r) => {
      if (prev) prev(sh, r);
      sh.vertexShader = 'attribute float aFade;\nvarying float vKitFade;\n' + sh.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n  vKitFade = aFade;');
      sh.fragmentShader = 'varying float vKitFade;\n' + DITHER + '\n' + sh.fragmentShader.replace('void main() {',
        outlineMode ? 'void main() {\n  if (vKitFade > 0.05) discard;'
                    : 'void main() {\n  if (vKitFade > 0.01 && kitBayer(gl_FragCoord.xy) < vKitFade * 0.72) discard;');
    };
    const key = mat.customProgramCacheKey ? mat.customProgramCacheKey.bind(mat) : () => '';
    mat.customProgramCacheKey = () => key() + (outlineMode ? '|kfo' : '|kf');
    return mat;
  }
  const KIT_OL_F = fadePatch(new THREE.MeshBasicMaterial({ color: 0x2b1d19, side: THREE.BackSide }), true);
  KIT_OL_F.onBeforeCompile = ((inner) => (sh, r) => { inner(sh, r); sh.vertexShader = sh.vertexShader.replace('#include <begin_vertex>', 'vec3 transformed = position + normal * 0.035;'); })(KIT_OL_F.onBeforeCompile);
  function kitMesh(part, mat, matrices, outline = true) {
    const n = matrices.length;
    const geo = fadeGeo(part.geo, n);
    const m = new THREE.InstancedMesh(geo, fadePatch(mat, false), n);
    m.userData.kitFade = geo.attributes.aFade;
    matrices.forEach((M, i) => m.setMatrixAt(i, M));
    m.instanceMatrix.needsUpdate = true;
    m.castShadow = true; m.receiveShadow = true;
    m.computeBoundingSphere && m.computeBoundingSphere();
    m.frustumCulled = false;
    if (outline) {
      const o = new THREE.InstancedMesh(geo, KIT_OL_F, n);
      matrices.forEach((M, i) => o.setMatrixAt(i, M));
      o.userData.isOutline = true;
      o.frustumCulled = false;
      o.visible = !(window.gameApp && window.gameApp.lowPower);
      m.add(o);
    }
    return m;
  }

  function install() {
    if (typeof TOWNHQ === 'undefined') return;
    const origDecorate = TOWNHQ.decorate;
    TOWNHQ.decorate = function (app) {
      const r = origDecorate.apply(this, arguments);
      try { process(app.scene); } catch (e) { console.warn('TOWNBAKE', e); }
      return r;
    };
    // main.js가 decorate 이후에 추가하는 구조물(집·분수·풍차 등)도 잡도록 처음 잠깐 주기적으로 훑음
    const origUpdate = TOWNHQ.update;
    let scanT = 0, scans = 0;
    TOWNHQ.update = function (app, dt) {
      const r = origUpdate.apply(this, arguments);
      if (unlitMats.length) updateTint(app, dt);
      if (enabled && scans < 12 && app && app.scene) {
        scanT += dt || 0;
        if (scanT > 1.5) { scanT = 0; scans++; try { process(app.scene); } catch (e) { /* 무시 */ } }
      }
      return r;
    };
    preload();
  }

  return {
    install, process, preload, staticMeshes, liveRefs, loadKit, kitMesh,
    get enabled() { return enabled; }, get swaps() { return swaps; }, get manifest() { return manifest; }
  };
})();
TOWNBAKE.install();

// 전역(window)으로도 노출: HTML onclick, 다른 모듈의 런타임 참조, 디버그 콘솔용
expose({
  get TOWNBAKE() { return TOWNBAKE; }
});
