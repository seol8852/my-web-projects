import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import { rmSync } from 'node:fs';

// 소스는 _dev/, 빌드 결과는 한 단계 위(배포 폴더)의 index.html + build/ 에 생겨요.
// GitHub Pages는 배포 폴더를 그대로 서비스하므로 빌드 후 커밋·푸시만 하면 반영돼요.
const OUT = resolve(__dirname, '..');

export default defineConfig({
  root: __dirname,
  base: './',
  // 이미지 등은 배포 폴더의 assets/ 를 그대로 사용 (복사·중복 없음)
  publicDir: OUT,
  server: { port: 5173, fs: { allow: [OUT] } },
  plugins: [{
    // 빌드할 때마다 예전 build/ 결과물 정리 (해시 파일명이라 안 지우면 계속 쌓임)
    name: 'clean-build-dir',
    apply: 'build',
    buildStart() { rmSync(resolve(OUT, 'build'), { recursive: true, force: true }); }
  }],
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
        // 파일 이름에 내용 해시 → 바뀐 파일만 새로 받음 (모듈끼리 서로 import하므로 ?v= 방식은 쓰면 안 됨: 같은 파일이 두 번 실행됨)
        entryFileNames: 'build/[name]-[hash].js',
        chunkFileNames: 'build/[name]-[hash].js',
        assetFileNames: 'build/[name]-[hash][extname]',
        // three.js는 따로 묶어서 게임 코드만 바뀔 땐 다시 안 받게
        manualChunks: id => (id.includes('node_modules/three/') ? 'three' : undefined)
      }
    }
  }
});
