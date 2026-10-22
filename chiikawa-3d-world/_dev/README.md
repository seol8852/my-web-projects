# 치이카와 3D 월드 — 개발 폴더

배포 폴더(`chiikawa-3d-world/`)에는 **빌드 결과만** 두고, 실제 코드는 여기(`_dev/`)에서 고쳐요.
`_`로 시작하는 폴더라 GitHub Pages에는 올라가지 않아요.

## 처음 한 번
```
cd chiikawa-3d-world/_dev
npm install
```

## 작업 흐름
| 명령 | 하는 일 |
|---|---|
| `npm run dev` | 개발 서버 (http://localhost:5173) — 파일 저장하면 새로고침만으로 반영 |
| `npm run build` | 배포용 빌드 → `../index.html`, `../build/` 생성 (압축 + 캐시 자동 갱신) |
| `npm run preview` | 빌드 결과 미리보기 (http://localhost:4173) |
| `npm test` | 스모크 테스트 (preview 켜둔 상태에서) |

빌드 후 `git add -A && git commit && git push` 하면 사이트에 반영돼요.
예전처럼 `?v=날짜`를 손으로 바꿀 필요 없어요 (내용이 바뀐 파일만 자동으로 새로 받음).

## 폴더 구조
```
_dev/
  index.html          화면(HTML) 원본
  scripts.config.js   게임 스크립트 로드 순서 (전역 스크립트)
  vite.config.js      빌드 설정
  src/
    boot.js           ES 모듈 진입점 (로그인·온라인)
    core/             사운드, 3D 모델(캐릭터·몬스터·무기)
    world/            오픈월드 맵, 마을 건물·충돌, 이펙트, 그래픽 품질, 점프맵
    combat/           스킬, 레이드 연출, 전투 스테이지
    game/             메인 게임 루프, 미니게임·NPC
    shop/             상점·가챠·장비·강화
    net/              로그인(Firebase), 온라인 협동·월드
    styles/           CSS
  tests/smoke.mjs     자동 점검
```
이미지 등 리소스는 배포 폴더의 `assets/`를 그대로 써요.

## 앞으로의 정리 계획
아직 `scripts.config.js`의 파일들은 전역 스크립트(서로의 함수를 이름으로 덮어쓰는 방식)예요.
하나씩 ES 모듈(`import`/`export`)로 바꿔서 `boot.js` 쪽으로 옮기는 중이에요.
그 다음 단계로 Three.js를 최신 버전으로 올릴 예정이에요.
