import { defineConfig, transformWithEsbuild } from 'vite';
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { resolve, basename } from 'node:path';
import { VENDOR_SCRIPTS, GAME_SCRIPTS } from './scripts.config.js';

// 소스는 _dev/, 빌드 결과는 한 단계 위(배포 폴더)의 index.html + build/ 에 생겨요.
// GitHub Pages는 배포 폴더를 그대로 서비스하므로 빌드 후 커밋·푸시만 하면 반영돼요.
const OUT = resolve(__dirname, '..');
const hash = s => createHash('sha256').update(s).digest('hex').slice(0, 10);

// 전역 스크립트(아직 모듈이 아닌 파일)를 순서 그대로 <script>로 넣어주는 플러그인.
// 개발 중엔 원본 파일을, 빌드 땐 압축한 파일(build/js/*.js?v=해시)을 넣어요.
function classicScripts() {
  let isBuild = false;
  const built = [];
  return {
    name: 'classic-scripts',
    configResolved(c) { isBuild = c.command === 'build'; },
    async buildStart() {
      if (!isBuild) return;
      built.length = 0;
      const vendor = VENDOR_SCRIPTS.map(f => readFileSync(resolve(__dirname, f), 'utf8')).join('\n;\n');
      built.push({ fileName: 'build/js/three-r128.js', code: vendor });
      for (const f of GAME_SCRIPTS) {
        const src = readFileSync(resolve(__dirname, f), 'utf8');
        // format 없이 압축 → 최상위 이름(전역 함수·변수)은 그대로 유지
        const r = await transformWithEsbuild(src, f, { minifyWhitespace: true, minifySyntax: true, minifyIdentifiers: true, legalComments: 'none', target: 'es2019' });
        built.push({ fileName: `build/js/${basename(f)}`, code: r.code });
      }
    },
    generateBundle() {
      for (const b of built) this.emitFile({ type: 'asset', fileName: b.fileName, source: b.code });
    },
    transformIndexHtml: {
      // 빌드 땐 HTML 처리가 끝난 뒤(post)에 넣어야 '모듈이 아님' 경고가 안 떠요
      order: 'post',
      handler() {
        const list = isBuild
          ? built.map(b => `./${b.fileName}?v=${hash(b.code)}`)
          : [...VENDOR_SCRIPTS, ...GAME_SCRIPTS].map(f => '/' + f);
        return list.map(src => ({ tag: 'script', attrs: { src }, injectTo: 'body' }));
      }
    }
  };
}

// 빌드된 파일 이름은 고정(build/xxx.js)이고, 캐시 갱신은 ?v=내용해시 로 처리 → 옛 파일이 쌓이지 않아요.
function cacheBust() {
  return {
    name: 'cache-bust',
    enforce: 'post',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        if (!ctx.bundle) return html;
        return html.replace(/(src|href)="\.\/(build\/[^"?]+)"/g, (m, attr, file) => {
          const item = ctx.bundle[file];
          const code = item ? (item.code || item.source || '') : '';
          return `${attr}="./${file}?v=${hash(String(code))}"`;
        });
      }
    }
  };
}

export default defineConfig({
  root: __dirname,
  base: './',
  // 이미지 등은 배포 폴더의 assets/ 를 그대로 사용 (복사·중복 없음)
  publicDir: OUT,
  server: { port: 5173, fs: { allow: [OUT] } },
  plugins: [classicScripts(), cacheBust()],
  build: {
    outDir: OUT,
    emptyOutDir: false,
    copyPublicDir: false,
    assetsDir: 'build',
    target: 'es2019',
    rollupOptions: {
      // Firebase는 공식 CDN(gstatic) 모듈을 그대로 사용
      external: [/^https:\/\//],
      output: {
        entryFileNames: 'build/[name].js',
        chunkFileNames: 'build/[name].js',
        assetFileNames: 'build/[name][extname]'
      }
    }
  }
});
