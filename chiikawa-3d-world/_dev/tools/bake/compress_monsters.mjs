// 무기 모델(assets/monsters.glb) 압축: 정점 합치기 + 양자화 + meshopt
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { weld, quantize, meshopt, prune, dedup } from '@gltf-transform/functions';
import { MeshoptEncoder, MeshoptDecoder } from 'meshoptimizer';
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const f = resolve(dirname(fileURLToPath(import.meta.url)), '../../../assets/monsters.glb');
await MeshoptEncoder.ready; await MeshoptDecoder.ready;
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS).registerDependencies({ 'meshopt.encoder': MeshoptEncoder, 'meshopt.decoder': MeshoptDecoder });
const before = readFileSync(f).length;
const doc = await io.read(f);
await doc.transform(dedup(), weld(), quantize({ quantizePosition: 14, quantizeNormal: 8 }), meshopt({ encoder: MeshoptEncoder, level: 'medium' }), prune());
const buf = await io.writeBinary(doc);
writeFileSync(f, buf);
writeFileSync(f.replace(/\.glb$/, '.json'), JSON.stringify({ v: createHash('sha1').update(buf).digest('hex').slice(0, 10) }));
console.log(`[monsters] ${Math.round(before / 1024)}KB → ${Math.round(buf.length / 1024)}KB`);
