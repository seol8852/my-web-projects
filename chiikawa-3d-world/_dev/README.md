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

## 🏘️ 마을 구조물 라이트맵 굽기 (Blender)
마을 건물·소품은 코드(`src/world/town_hq.js`)로 만든 뒤, Blender(Cycles)에서 햇빛·하늘빛·그림자를 텍스처에 구워
`../assets/baked/*.glb`로 바꿔 끼워요 (`src/world/town_baked.js`). 움직이는 부품(풍차 날개, 물, 불꽃, 등불 등)은 그대로 실시간이에요.

건물 모양을 `town_hq.js`에서 고쳤다면 다시 구워야 해요:
```
npm run build && npm run preview          # (다른 창에서 켜둔 채로)
npm run bake:export                        # 1) 게임에서 정적 부분을 tools/bake/in/*.glb 로 추출
npm run bake -- "^house$"                  # 2) Blender로 굽기 (키 필터 생략 시 전부, Blender 5.x 필요)
npm run bake:pack                          # 3) 용량 압축 (meshopt)
npm run build                              # 4) 다시 빌드
```
- 비교용으로 끄기: 브라우저 콘솔에서 `localStorage.setItem('chiikawa_baked','off')` 후 새로고침
- 조명 세기 조절: 환경변수 `BAKE_SUN`(햇빛), `BAKE_SAMPLES`(품질), `BAKE_DENSITY`(텍스처 해상도), `BAKE_BEVEL`(모서리 둥글기)

## 폴더 구조
```
_dev/
  index.html          화면(HTML) 원본
  vite.config.js      빌드 설정
  src/
    app.js            진입점: 모듈 실행 순서 (뒤 모듈이 앞 모듈을 확장)
    boot.js           로그인·온라인 (따로 불러옴 → Firebase가 막혀도 게임은 실행)
    core/three.js     Three.js 한 곳에서 불러오기 (버전 올릴 때 여기만)
    core/expose.js    모듈 이름을 window에 연결 (HTML onclick·덮어쓰기 호환)
    core/             사운드, 3D 모델(캐릭터·몬스터·무기)
    world/            오픈월드 맵, 마을 건물·충돌, 이펙트, 그래픽 품질, 점프맵
    combat/           스킬, 레이드 연출, 전투 스테이지
    game/             메인 게임 루프, 미니게임·NPC
    shop/             상점·가챠·장비·강화
    net/              로그인(Firebase), 온라인 협동·월드
    styles/           CSS
  tools/bake/         라이트맵 굽기 도구 (추출 → Blender 굽기 → 압축)
  tests/smoke.mjs     자동 점검
```
이미지 등 리소스는 배포 폴더의 `assets/`를 그대로 써요.

## 모듈 규칙
- 모든 파일은 ES 모듈이에요. **앞쪽 모듈**(app.js 순서 기준)의 이름은 `import`로 가져와요.
- **뒤쪽 모듈**의 이름(예: `window.SHOPHQ`)이나 **다른 모듈이 덮어쓰는 함수**(예: `window.createHatAccessory3D`)는 `window.이름`으로 실행 중에 찾아요.
- 각 모듈 끝의 `expose({...})`가 최상위 이름을 window에 살아있는 연결로 걸어둬요.
  `window.X = 새함수`로 바꾸면 원래 모듈 안의 X도 같이 바뀌어요.
- 새 파일을 만들면 `src/app.js`에 순서대로 import 한 줄을 추가하세요.
