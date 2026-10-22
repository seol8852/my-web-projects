// 1단계: 게임을 브라우저로 열어 마을 구조물의 "정적" 부분을 .glb로 뽑아냄 → tools/bake/in/
// 사용법: (빌드 후 preview 켜둔 상태) node tools/bake/export.mjs [URL] [키필터]
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const pw = process.env.PLAYWRIGHT || 'playwright';
const { chromium } = require(pw);
const URL = process.argv[2] || 'http://localhost:4173/';
const FILTER = process.argv[3] ? new RegExp(process.argv[3]) : null;
const OUT = resolve(here, 'in');
mkdirSync(OUT, { recursive: true });
const safe = k => k.replace(/[^a-zA-Z0-9]+/g, '_');

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM || undefined, args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const ctx = await browser.newContext({ viewport: { width: 900, height: 600 } });
await ctx.route(u => !u.href.startsWith(new globalThis.URL(URL).origin), r => r.abort());
const page = await ctx.newPage();
page.on('pageerror', e => console.log('pageerror', String(e).slice(0, 200)));
await page.addInitScript(() => { localStorage.setItem('chiikawa_baked', 'off'); localStorage.setItem('chiikawa_gfx_quality', 'low'); });
await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 180000 });
await page.waitForFunction(() => window.gameApp && window.gameApp.scene, null, { timeout: 180000 });
await page.evaluate(() => { gameApp.selectedCharInLobby = 'chiikawa'; gameApp.startGameWithSelectedChar(); });
await page.waitForTimeout(2500);
await page.evaluate(async () => { window.__GLTFExporter = await THREE.loadGLTFExporter(); });

const keys = await page.evaluate(() => {
  const seen = {};
  const walk = o => { if (o.userData && o.userData.bakeKey) { seen[o.userData.bakeKey] = (seen[o.userData.bakeKey] || 0) + 1; return; } o.children.forEach(walk); };
  walk(gameApp.scene);
  return seen;
});
console.log('구조물 종류', Object.keys(keys).length, keys);

const index = {};
for (const key of Object.keys(keys)) {
  if (FILTER && !FILTER.test(key)) continue;
  const r = await page.evaluate(async key => {
    let root = null;
    const walk = o => { if (root) return; if (o.userData && o.userData.bakeKey) { if (o.userData.bakeKey === key) root = o; return; } o.children.forEach(walk); };
    walk(gameApp.scene);
    if (!root) return null;
    root.updateMatrixWorld(true);
    const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
    const list = TOWNBAKE.staticMeshes(root);
    const scene = new THREE.Scene();
    let area = 0, tris = 0;
    const tA = new THREE.Vector3(), tB = new THREE.Vector3(), tC = new THREE.Vector3();
    for (const m of list) {
      let g = m.geometry.clone();
      if (g.index) g = g.toNonIndexed();
      g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, m.matrixWorld));
      const mats = Array.isArray(m.material) ? m.material : [m.material];
      // 텍스처 반복(repeat/offset)을 UV에 미리 반영
      const uv = g.attributes.uv;
      // 재질이 1개면 three는 그룹을 무시하고 전체를 그 재질로 그림 → 똑같이 처리
      const groups = (Array.isArray(m.material) && g.groups.length) ? g.groups : [{ start: 0, count: g.attributes.position.count, materialIndex: 0 }];
      if (uv) {
        groups.forEach(gr => {
          const t = mats[gr.materialIndex || 0] && mats[gr.materialIndex || 0].map;
          if (!t) return;
          t.updateMatrix();
          const v2 = new THREE.Vector2();
          for (let i = gr.start; i < gr.start + gr.count; i++) { v2.set(uv.getX(i), uv.getY(i)).applyMatrix3(t.matrix); uv.setXY(i, v2.x, v2.y); }
        });
      }
      const outMats = mats.map(src => {
        const om = new THREE.MeshStandardMaterial({ color: src.color ? src.color.clone() : new THREE.Color(1, 1, 1), roughness: 1, metalness: 0, vertexColors: !!src.vertexColors });
        if (src.map && src.map.image) { const t = src.map.clone(); t.repeat.set(1, 1); t.offset.set(0, 0); t.rotation = 0; t.wrapS = t.wrapT = THREE.RepeatWrapping; t.needsUpdate = true; om.map = t; }
        return om;
      });
      // 양면 재질(얇은 잎·천 등)은 뒤집은 복사본을 더해 양쪽 면을 각각 굽기
      if (mats.some(mm => mm && mm.side === THREE.DoubleSide)) {
        const back = g.clone();
        const pa = back.attributes.position, na = back.attributes.normal, ua = back.attributes.uv;
        for (let i = 0; i < pa.count; i += 3) {
          [pa, na, ua].forEach(at => { if (!at) return; for (let c = 0; c < at.itemSize; c++) { const t = at.array[(i + 1) * at.itemSize + c]; at.array[(i + 1) * at.itemSize + c] = at.array[(i + 2) * at.itemSize + c]; at.array[(i + 2) * at.itemSize + c] = t; } });
        }
        if (na) for (let i = 0; i < na.array.length; i++) na.array[i] = -na.array[i];
        // 앞면과 정점이 겹치면 Blender 정점 합치기에서 지워지므로 아주 살짝 안쪽으로 밀기
        if (na) for (let i = 0; i < pa.count; i++) { pa.setXYZ(i, pa.getX(i) + na.getX(i) * 0.004, pa.getY(i) + na.getY(i) * 0.004, pa.getZ(i) + na.getZ(i) * 0.004); }
        scene.add(new THREE.Mesh(back, outMats.length === 1 ? outMats[0] : outMats[0]));
      }
      if (outMats.length === 1) scene.add(new THREE.Mesh(g, outMats[0]));
      else {
        // 재질이 여러 개인 메시는 그룹별로 쪼개서 내보냄 (GLTFExporter r128의 다중 재질 버그 회피)
        groups.forEach(gr => {
          const sub = new THREE.BufferGeometry();
          Object.keys(g.attributes).forEach(n => {
            const at = g.attributes[n];
            sub.setAttribute(n, new THREE.BufferAttribute(at.array.slice(gr.start * at.itemSize, (gr.start + gr.count) * at.itemSize), at.itemSize));
          });
          scene.add(new THREE.Mesh(sub, outMats[gr.materialIndex || 0] || outMats[0]));
        });
      }
      const p = g.attributes.position;
      for (let i = 0; i < p.count; i += 3) {
        tA.fromBufferAttribute(p, i); tB.fromBufferAttribute(p, i + 1); tC.fromBufferAttribute(p, i + 2);
        area += tB.sub(tA).cross(tC.sub(tA)).length() / 2;
      }
      tris += p.count / 3;
    }
    if (!scene.children.length) return { empty: true };
    // 외곽선 껍데기(뒷면)도 같은 변형 그대로 모아서 별도 파일로 (구운 모델과 모양이 딱 맞게)
    const olPos = [], olCol = [];
    for (const m of list) {
      for (const c of m.children) {
        if (!(c.userData && c.userData.isOutline) || !c.geometry) continue;
        c.updateMatrixWorld(true);
        let g = c.geometry.clone(); if (g.index) g = g.toNonIndexed();
        g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, c.matrixWorld));
        const col = c.material && c.material.color ? c.material.color : new THREE.Color(0x2b1d19);
        const pa = g.attributes.position;
        for (let i = 0; i < pa.count; i++) { olPos.push(pa.getX(i), pa.getY(i), pa.getZ(i)); olCol.push(col.r, col.g, col.b); }
      }
    }
    const toB64 = buf => { const b = new Uint8Array(buf); let s = ''; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode.apply(null, b.subarray(i, i + 0x8000)); return btoa(s); };
    let ol = null;
    if (olPos.length) {
      const og = new THREE.BufferGeometry();
      og.setAttribute('position', new THREE.Float32BufferAttribute(olPos, 3));
      og.setAttribute('color', new THREE.Float32BufferAttribute(olCol, 3));
      const os = new THREE.Scene(); os.add(new THREE.Mesh(og, new THREE.MeshBasicMaterial({ vertexColors: true })));
      ol = toB64(await new Promise(res => new window.__GLTFExporter().parse(os, res, e => { throw e; }, { binary: true })));
    }
    const buf = await new Promise(res => new window.__GLTFExporter().parse(scene, res, e => { throw e; }, { binary: true, maxTextureSize: 1024 }));
    const s = atob(toB64(buf));
    const box = new THREE.Box3().setFromObject(scene);
    return { glb: btoa(s), ol, meshes: list.length, area: Math.round(area), tris: Math.round(tris), size: box.getSize(new THREE.Vector3()).toArray().map(v => +v.toFixed(2)) };
  }, key);
  if (!r || r.empty) { console.log('건너뜀', key); continue; }
  const file = safe(key) + '.glb';
  writeFileSync(resolve(OUT, file), Buffer.from(r.glb, 'base64'));
  // 외곽선은 Blender를 거치지 않고 바로 배포 폴더로 (bake:pack에서 압축)
  let olFile = null;
  if (r.ol) { olFile = safe(key) + '.ol.glb'; mkdirSync(resolve(here, '../../../assets/baked'), { recursive: true }); writeFileSync(resolve(here, '../../../assets/baked', olFile), Buffer.from(r.ol, 'base64')); }
  index[key] = { file, ol: olFile, meshes: r.meshes, area: r.area, tris: r.tris, size: r.size, count: keys[key] };
  console.log(key, JSON.stringify(index[key]));
}
let prev = {};
try { prev = JSON.parse(readFileSync(resolve(OUT, 'index.json'), 'utf8')); } catch (e) { /* 처음 */ }
writeFileSync(resolve(OUT, 'index.json'), JSON.stringify(Object.assign(prev, index), null, 1));
await browser.close();
