// 🚀 ES 모듈 진입점: 로그인(Firebase) + 온라인 협동
// 전역 스크립트(scripts.config.js)가 모두 실행된 뒤에 실행돼요.
import { FirebaseManager } from './net/auth.js';
import { CoopManager } from './net/coop.js';

window.firebaseManager = new FirebaseManager(window.gameApp);
const startCoop = () => { try { window.coop = new CoopManager(); } catch (e) { console.error('협동 초기화 실패:', e); } };
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startCoop); else startCoop();
