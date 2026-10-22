// 🧩 게임 스크립트 로드 순서 (위에서 아래로 실행)
// 이 파일들은 아직 "전역 스크립트" 방식이라 순서가 중요해요.
// 뒤에 있는 파일이 앞 파일의 함수를 덮어쓰거나 감싸는 구조예요. (예: shop_hq가 main의 함수를 확장)
// 하나씩 ES 모듈로 옮기면 이 목록에서 빠지고 src/boot.js 쪽 import로 넘어가요.

// Three.js r128 + 후처리 (npm 패키지에서 직접 불러옴, CDN 의존 제거)
export const VENDOR_SCRIPTS = [
  'node_modules/three/build/three.min.js',
  'node_modules/three/examples/js/shaders/CopyShader.js',
  'node_modules/three/examples/js/shaders/LuminosityHighPassShader.js',
  'node_modules/three/examples/js/postprocessing/EffectComposer.js',
  'node_modules/three/examples/js/postprocessing/RenderPass.js',
  'node_modules/three/examples/js/postprocessing/ShaderPass.js',
  'node_modules/three/examples/js/postprocessing/UnrealBloomPass.js'
];

export const GAME_SCRIPTS = [
  // core: 사운드, 3D 모델(캐릭터·몬스터·무기)
  'src/core/sound.js',
  'src/core/models3d.js',
  // world: 오픈월드 맵, 마을 건물·충돌, 이펙트, 그래픽 품질
  'src/world/world_hq.js',
  'src/world/town_hq.js',
  'src/world/fx_hq.js',
  'src/world/polish_hq.js',
  // combat: 스킬
  'src/combat/skills_hq.js',
  // world: 점프맵·이벤트
  'src/world/world_extra.js',
  // combat: 레이드 연출
  'src/combat/raid_hq.js',
  // game: 미니게임·NPC, 메인 게임 루프
  'src/game/minigames.js',
  'src/game/main.js',
  // combat: 전투 스테이지 (main 이후 확장)
  'src/combat/stage_hq.js',
  // shop: 상점·가챠·장비 (main 이후 확장)
  'src/shop/shop_hq.js'
];
