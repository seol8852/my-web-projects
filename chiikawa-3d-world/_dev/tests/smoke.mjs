// 🧪 스모크 테스트: 빌드된 게임을 실제 브라우저로 열어 시작·전투·상점이 오류 없이 도는지 확인
// 사용법: npm run build → npm run preview (다른 창) → npm test
// 처음 한 번: npm i -D playwright && npx playwright install chromium
const URL = process.env.GAME_URL || 'http://localhost:4173/';
let chromium;
try { ({ chromium } = await import('playwright')); } catch {
  console.log('playwright가 없어요. 처음 한 번: npm i -D playwright && npx playwright install chromium');
  process.exit(1);
}
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 760 } });
const errors = [];
page.on('pageerror', e => errors.push(String(e)));
await page.addInitScript(() => localStorage.setItem('chiikawa_gfx_quality', 'low'));
await page.goto(URL, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => window.gameApp, null, { timeout: 120000 });
const checks = await page.evaluate(async () => {
  const r = {};
  const g = window.gameApp;
  r.three = typeof THREE !== 'undefined' && THREE.REVISION;
  g.selectedCharInLobby = 'chiikawa';
  g.startGameWithSelectedChar();
  await new Promise(res => setTimeout(res, 1500));
  r.player = !!g.playerMesh;
  r.shop = typeof SHOPHQ !== 'undefined' && SHOPHQ.pull ? 'ok' : 'missing';
  g.startBattleStage && g.startBattleStage(1);
  await new Promise(res => setTimeout(res, 1500));
  r.stage = !!(g.battleState && g.battleState.active);
  return r;
});
console.log(JSON.stringify(checks));
console.log(errors.length ? '❌ 오류:\n' + errors.join('\n') : '✅ 페이지 오류 없음');
await browser.close();
process.exit(errors.length || !checks.player || !checks.stage ? 1 : 0);
