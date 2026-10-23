// 👾 일반 몬스터 5종 3D 모델 (Blender로 만든 assets/monsters.glb)
//  - createMonster3D 를 감싸서, 모델이 준비되면 그림(스탠디) 대신 입체 모델로 바꿈 (준비 전에 만든 몬스터도 도착하면 교체)
//  - 부위(몸·머리·팔·다리·꼬리·날개)를 관절 기준으로 흔들어 걷기·숨쉬기·날갯짓·피격 반동을 표현
//  - 외부에서 쓰는 userData(mats, flashHit, updateMonsterMotion, hurtParts …)는 그대로 유지
//  - localStorage chiikawa_mon3d = 'off' 이면 예전 그림 몬스터
import THREE from '../core/three.js';
import { expose } from '../core/expose.js';
import { MeshoptDecoder } from 'meshoptimizer';

const MON3D = (() => {
  const TYPES = new Set(['bug', 'goblin', 'chimera', 'midboss', 'iron_chimera']);
  let LIB = null, libP = null;
  const pending = new Set();
  const isOff = () => { try { return localStorage.getItem('chiikawa_mon3d') === 'off'; } catch (e) { return false; } };

  function partGeo(o, pivot) {
    const src = o.geometry, geo = new THREE.BufferGeometry();
    ['position', 'normal'].forEach(n => {
      const at = src.attributes[n];
      if (!at) return;
      const arr = new Float32Array(at.count * 3);
      for (let i = 0; i < at.count; i++) { arr[i * 3] = at.getX(i); arr[i * 3 + 1] = at.getY(i); arr[i * 3 + 2] = at.getZ(i); }
      geo.setAttribute(n, new THREE.BufferAttribute(arr, 3));
    });
    const ca = src.attributes.color;
    if (ca) {
      const arr = new Float32Array(ca.count * 3);
      // Blender에서 16진수 색 그대로 넣었으므로(sRGB 값), 게임의 다른 재질 색과 같게 선형으로 변환
      const lin = THREE.ColorManagement && THREE.ColorManagement.enabled ? (v => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4))) : (v => v);
      for (let i = 0; i < ca.count; i++) { arr[i * 3] = lin(ca.getX(i)); arr[i * 3 + 1] = lin(ca.getY(i)); arr[i * 3 + 2] = lin(ca.getZ(i)); }
      geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    }
    if (src.index) geo.setIndex(new THREE.BufferAttribute(Uint32Array.from(src.index.array), 1));
    geo.applyMatrix4(o.matrixWorld);
    geo.translate(-pivot[0], -pivot[1], -pivot[2]);
    const nm = geo.attributes.normal;
    if (nm) geo.normalizeNormals();
    geo.computeBoundingSphere();
    return geo;
  }

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
        gltf.scene.updateMatrixWorld(true);
        gltf.scene.traverse(o => {
          if (!o.isMesh) return;
          const [type, part, kind] = o.name.split('|');
          if (!type || !part) return;
          const pivot = meta.pivots[`${type}|${part}`] || [0, 0, 0];
          const T = lib[type] = lib[type] || { parts: {}, height: (meta.heights || {})[type] || 4 };
          const P = T.parts[part] = T.parts[part] || { pivot, parent: (meta.parents || {})[`${type}|${part}`] || '', pieces: [] };
          P.pieces.push({ kind: kind || '', geo: partGeo(o, pivot) });
        });
        LIB = lib;
        res(lib);
        pending.forEach(g => { if (g.userData && g.userData._mon3dType) upgrade(g, g.userData._mon3dType); });
        pending.clear();
      }, undefined, () => res(null));
    }));
    return libP;
  }

  // 외곽선 (법선 방향으로 부풀린 뒷면)
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
    bodyWrap.children.slice().forEach(c => { if (c !== marker) { bodyWrap.remove(c); } });
    ud.rimUpdate = null; ud.rimFailed = true;
    const root = new THREE.Group();    // 방향 회전
    const lean = new THREE.Group();    // 피격 반동(뒤로 젖힘)
    root.add(lean);
    bodyWrap.add(root);
    const mats = [];
    const matOf = {};
    const nodes = {};
    const get = kind => matOf[kind] || (mats.push(matOf[kind] = makeMat(kind)), matOf[kind]);
    // 관절 그룹 만들기 (부모 관절 기준 상대 위치)
    const names = Object.keys(T.parts);
    const mk = name => {
      if (nodes[name]) return nodes[name];
      const P = T.parts[name];
      const g = new THREE.Group();
      g.userData.rest = new THREE.Vector3();
      nodes[name] = g;
      let parentName = name.startsWith('leg') ? '' : P.parent;
      if (parentName && !T.parts[parentName]) parentName = '';
      const parent = parentName ? mk(parentName) : lean;
      const pp = parentName ? T.parts[parentName].pivot : [0, 0, 0];
      g.position.set(P.pivot[0] - pp[0], P.pivot[1] - pp[1], P.pivot[2] - pp[2]);
      g.userData.rest.copy(g.position);
      parent.add(g);
      P.pieces.forEach(pc => {
        const m = new THREE.Mesh(pc.geo, get(pc.kind));
        m.castShadow = pc.kind !== 'wing';
        g.add(m);
        if (pc.kind === '') {
          const o = new THREE.Mesh(pc.geo, OL);
          o.userData.isOutline = true;
          o.visible = !(window.gameApp && window.gameApp.lowPower);
          m.add(o);
        }
      });
      return g;
    };
    names.forEach(mk);
    ud.mats = mats;
    ud._mon3d = true;
    const sizeH = ud.sizeH || 5;
    const H = T.height;
    const isBug = type === 'bug';
    const heavy = type === 'iron_chimera' || type === 'midboss';
    if (marker) marker.position.set(0, H * 0.82, 0.9);

    ud.updateMonsterMotion = (time, isChasing, phaseOffset, facingYaw = 0) => {
      const rel = facingYaw - group.rotation.y;
      if (hurtRing) hurtRing.rotation.y = rel;
      root.rotation.y = rel;
      if (ud.hitWobble > 0.001) ud.hitWobble *= 0.86; else ud.hitWobble = 0;
      const w = ud.hitWobble;
      const sp = isChasing ? (heavy ? 7 : 10) : 3.2;
      const t = time * sp + phaseOffset;
      const amp = isChasing ? 1 : 0.18;
      const s = Math.sin(t), c = Math.cos(t);
      // 몸통: 걸음마다 통통 / 가만히 있을 땐 숨쉬기
      const body = nodes.body;
      if (body) {
        const bob = isChasing ? Math.abs(s) * 0.07 * H * (heavy ? 0.6 : 1) : 0;
        body.position.y = body.userData.rest.y + bob;
        const br = isChasing ? 0 : Math.sin(time * 2.2 + phaseOffset) * 0.025;
        body.scale.set(1 - br * 0.5, 1 + br, 1 - br * 0.5);
        body.rotation.z = isChasing ? s * 0.06 : 0;
      }
      ['legL', 'legR'].forEach((n, i) => { const g = nodes[n]; if (g) g.rotation.x = (i ? -1 : 1) * s * 0.55 * amp; });
      ['armL', 'armR'].forEach((n, i) => { const g = nodes[n]; if (g) { g.rotation.x = (i ? 1 : -1) * s * 0.4 * amp; g.rotation.z = (i ? -1 : 1) * (0.05 + Math.sin(time * 2 + i) * 0.04); } });
      if (nodes.head) { nodes.head.rotation.z = Math.sin(time * 1.6 + phaseOffset) * 0.06; nodes.head.rotation.x = (isChasing ? c * 0.05 : Math.sin(time * 1.1) * 0.04) - (ud.lastHitPart === 'head' ? w * 0.9 : 0); }
      if (nodes.tail) { nodes.tail.rotation.y = Math.sin(time * (isChasing ? 6 : 2.2) + phaseOffset) * 0.35; }
      if (nodes.wingL) nodes.wingL.rotation.z = Math.sin(time * 34) * 0.7;
      if (nodes.wingR) nodes.wingR.rotation.z = -Math.sin(time * 34) * 0.7;
      if (isBug) root.position.y = Math.sin(time * 3 + phaseOffset) * 0.18;
      // 피격: 뒤로 젖혔다 돌아옴 (+ 좌우 흔들림)
      lean.rotation.x = -w * 0.55;
      lean.rotation.z = Math.sin(time * 38) * w * 0.25;
      mats.forEach(mm => { const u = mm.userData.fxFlash; if (u && u.uFlash.value > 0.001 && !mm.userData.fxFlashing) u.uFlash.value *= 0.8; });
      if (ud._bossAura && ud._bossAura.userData.update) ud._bossAura.userData.update(time);
      if (marker && marker.visible) {
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
    };
  }

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
  if (!isOff()) load();
  return { load, upgrade, get lib() { return LIB; } };
})();

expose({ get MON3D() { return MON3D; } });
export default MON3D;
