// 3단계: 구운 .glb를 압축 (정점 양자화 + meshopt) → 용량 약 1/4~1/6
// 사용법: node tools/bake/compress.mjs [키필터]
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { weld, quantize, meshopt, prune, dedup, textureCompress } from '@gltf-transform/functions';
import sharp from 'sharp';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import { readFileSync, writeFileSync, statSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
const here = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(here, '../../../assets/baked');
const FILTER = process.argv[2] ? new RegExp(process.argv[2]) : null;
await MeshoptEncoder.ready; await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const manPath = resolve(OUT, 'manifest.json');
const man = JSON.parse(readFileSync(manPath, 'utf8'));
async function packFile(file) {
  const doc = await io.read(file);
  await doc.transform(dedup(), weld(), quantize({ quantizePosition: 14, quantizeNormal: 8, quantizeTexcoord: 12, quantizeColor: 8 }), meshopt({ encoder: MeshoptEncoder, level: 'medium' }), prune());
  return io.writeBinary(doc);
}
for (const [key, ent] of Object.entries(man.items)) {
  if (FILTER && !FILTER.test(key)) continue;
  if (ent.ol) {
    const f = resolve(OUT, ent.ol);
    const raw = readFileSync(f);
    if (!raw.includes(Buffer.from('EXT_meshopt_compression'))) writeFileSync(f, await packFile(f));
    ent.olv = createHash('sha1').update(readFileSync(f)).digest('hex').slice(0, 10);
  }
  if (!(ent.packed && ent.packedFrom === ent.v)) {
    const file = resolve(OUT, ent.file);
    const before = statSync(file).size;
    const buf = await packFile(file);
    writeFileSync(file, buf);
    ent.v = ent.packedFrom = createHash('sha1').update(buf).digest('hex').slice(0, 10);
    ent.packed = true; ent.webp = false;
    console.log(`[pack] ${key}: ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB`);
  }
  {
    // 텍스처를 WebP로 (JPEG 대비 약 30~50% 작음)
    if (!ent.webp) {
      const f = resolve(OUT, ent.file);
      const before = statSync(f).size;
      const doc = await io.read(f);
      await doc.transform(textureCompress({ encoder: sharp, targetFormat: 'webp', quality: 84 }));
      const buf = await io.writeBinary(doc);
      writeFileSync(f, buf);
      ent.v = ent.packedFrom = createHash('sha1').update(buf).digest('hex').slice(0, 10);
      ent.webp = true;
      console.log(`[webp] ${key}: ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB`);
    }
  }
}
writeFileSync(manPath, JSON.stringify(man, null, 1));
