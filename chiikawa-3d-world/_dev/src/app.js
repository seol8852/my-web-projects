// 🚀 게임 진입점: 모듈 실행 순서 = 예전 <script> 순서 (뒤 모듈이 앞 모듈을 확장)
import './core/sound.js';
import './core/models3d.js';
import './world/world_hq.js';
import './world/town_hq.js';
import './world/town_baked.js';
import './world/fx_hq.js';
import './world/polish_hq.js';
import './combat/skills_hq.js';
import './world/world_extra.js';
import './combat/raid_hq.js';
import './game/minigames.js';
import './game/main.js';
import './combat/stage_hq.js';
import './shop/shop_hq.js';
import './combat/feel_hq.js';
// 로그인(Firebase) + 온라인 협동: 따로 불러옴 → Firebase 서버가 막혀도 게임 자체는 실행됨
import('./boot.js').catch(e => console.warn('로그인/온라인 모듈을 불러오지 못했어요 (오프라인으로 진행):', e));
