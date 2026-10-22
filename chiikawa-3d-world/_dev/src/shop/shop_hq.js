// ⚙️ ES 모듈 (자동 변환): 앞쪽 모듈은 import, 뒤쪽 모듈·덮어쓰기 되는 이름은 window.이름 으로 참조
import THREE from '../core/three.js';
import { soundFx } from '../core/sound.js';
import { addCartoonOutline, getToonGradientMap } from '../core/models3d.js';
import { HAT_CATALOG, STAGE_CAMPAIGN_DATA, showToast } from '../game/minigames.js';
import { Chiikawa3DWorldApp } from '../game/main.js';
import { expose } from '../core/expose.js';
// ==========================================================================
// 치이카와 3D 월드 - 상점 & 경제 개편 (shop_hq.js)
//  · 재화 물가표(ECON): 쉬운 보상 1,000~3,000 / 스테이지 1,000→30,000 / 레이드 새 50,000 · 아노코 80,000
//  · 장비 뽑기(무기·방어구): S 0.028% · A 0.2% · B 2% · C 나머지, 1회 10,000🪙
//  · 꾸미기(머리 장식 + 액세서리): 착용 효과(공격·체력·치명·피해감소·코인·경험치)
//  · 내 장비 가방: 장착 / 판매 / C급 일괄 판매
//  ※ stage_hq.js 뒤에 로드 (main.js 프로토타입 감싸기)
// ==========================================================================
const ECON = {
  // 쉽게 얻는 보상 (1,000 ~ 3,000)
  camp: 1500, talk: 1000, ramen: 3000, exam: 2000, chest: 2000, crystal: 3000, weed: 1000, goldWeed: 2000,
  fieldMon: 1000, event: 3000, jumpCp: 1000, jumpRepeat: 3000,
  // 한 번뿐인 보상
  jumpFirst: 20000, pudding: 5000, examUp: 10000,
  // 콘텐츠 보상
  raidBird: 50000, raidAnoko: 80000,
  dungeonGold: [3000, 8000, 15000], dungeonExp: [1000, 2000, 3000],
  // 가격
  gacha: 10000, potion: 2000, weaponUp: lv => lv * 3000,
  stageReward: n => Math.round(1000 * Math.pow(30, (n - 1) / 19) / 100) * 100   // 1단계 1,000 → 20단계 30,000
};

const SHOPHQ = (() => {
  const GRADE = {
    S: { p: 0.00028, color: '#f59e0b', bg: 'linear-gradient(135deg,#fde68a,#f59e0b,#fb7185)', label: 'S', sell: 500000 },
    A: { p: 0.002, color: '#a855f7', bg: 'linear-gradient(135deg,#e9d5ff,#a855f7)', label: 'A', sell: 50000 },
    B: { p: 0.02, color: '#3b82f6', bg: 'linear-gradient(135deg,#dbeafe,#3b82f6)', label: 'B', sell: 5000 },
    C: { p: 1, color: '#64748b', bg: 'linear-gradient(135deg,#f1f5f9,#94a3b8)', label: 'C', sell: 1000 }
  };
  const NAMES = {
    weapon: {
      S: ['🌟 전설의 황금 사스마타', '🌌 은하수 성검', '🐉 태고의 대괴수 발톱', '☄️ 혜성을 가른 대검', '👑 제초왕의 성스러운 낫', '🌈 무지개 별사탕 지팡이'],
      A: ['🐲 용비늘 대검', '✨ 별빛 사스마타', '⚡ 폭풍의 창', '🔥 홍염의 쌍검', '❄️ 빙결의 레이피어', '🌙 초승달 언월도',
        '🦅 파자마 새 깃털검', '🍜 라멘 장인의 국자', '🌸 벚꽃 요정의 활', '🪐 행성 망치'],
      B: ['🗡️ 강철 사스마타', '🤺 은빛 레이피어', '🔱 푸른 삼지창', '🪓 나무꾼의 강철 도끼', '🏹 사냥꾼의 장궁', '⚔️ 기사단 장검',
        '🔨 대장장이 망치', '🥢 강철 쌍절곤', '🎣 별빛 낚싯대', '🪃 바람의 부메랑', '🧹 마법 빗자루', '🍡 경단 꼬치창'],
      C: ['🪵 낡은 나무 사스마타', '🔪 녹슨 철검', '🏏 초보자 몽둥이', '🌾 풀베기 낫', '🥄 큰 나무 숟가락', '🧹 낡은 빗자루',
        '🪥 거대 칫솔', '🍢 어묵 꼬치', '🥖 딱딱한 바게트', '🌂 찢어진 우산', '🪁 연 꼬리 채찍', '🧺 빨래 방망이',
        '🥢 나무 젓가락', '🪜 사다리 조각', '🎋 대나무 장대', '🍳 프라이팬', '📏 30cm 자', '🧽 수세미 방패검']
    },
    armor: {
      S: ['🌠 전설의 별빛 갑옷', '🛡️ 태고의 수호 갑주', '🐉 대괴수 비늘 판금', '👑 제초왕의 황금 로브', '🌌 은하수 날개 망토', '☀️ 태양신의 성갑'],
      A: ['🐲 용비늘 갑옷', '🏰 수호자의 판금', '🔥 홍염의 갑주', '❄️ 빙결의 코트', '🌙 달빛 닌자복', '⚡ 뇌전의 경갑',
        '🦅 파자마 새 깃털 망토', '🌸 벚꽃 무사 갑옷', '🍮 푸딩 젤리 슈트', '🪐 우주 비행복'],
      B: ['⛓️ 은빛 사슬 갑옷', '🦺 강철 흉갑', '🧥 기사단 코트', '🥋 수련자의 도복', '🪖 철모 세트', '🛡️ 강철 원형 방패',
        '🧤 가죽 전투복', '👘 비단 하오리', '🎽 경량 체인 셔츠', '🧣 털모피 망토', '🥾 등산가 장비', '🍜 라멘 앞치마 갑옷'],
      C: ['👕 천 조끼', '🧥 헌 망토', '🪖 나무 방패 갑옷', '🩳 반바지 세트', '🧦 두꺼운 양말 갑옷', '👚 줄무늬 잠옷',
        '🦺 형광 조끼', '🧶 뜨개질 스웨터', '📦 종이 상자 갑옷', '🍳 냄비 뚜껑 방패', '🛍️ 비닐봉지 망토', '🧻 휴지 붕대',
        '🎒 책가방 등껍질', '🪣 양동이 투구', '🧢 야구 모자 세트', '👟 낡은 운동화 세트', '🧸 곰인형 탈', '🩴 슬리퍼 갑옷']
    }
  };
  // 등급별 효과 범위 (편차 크게)
  const ROLL = {
    weapon: { S: { atk: [120, 180], crit: [8, 12] }, A: { atk: [45, 70], crit: [3, 5] }, B: { atk: [15, 25], crit: [0, 1] }, C: { atk: [3, 8], crit: [0, 0] } },
    armor: { S: { hp: [120, 160], dr: [25, 30] }, A: { hp: [50, 80], dr: [12, 18] }, B: { hp: [20, 30], dr: [5, 8] }, C: { hp: [5, 10], dr: [1, 3] } }
  };
  // 꾸미기: 머리(hat) + 액세서리(acc) 각 1개 착용
  const COSMETICS = [
    { id: 'flower', slot: 'hat', icon: '🌸', name: '봄날 벚꽃 화관', price: 8000, fx: { exp: 5 } },
    { id: 'cat', slot: 'hat', icon: '🐱', name: '말랑 고양이 귀', price: 10000, fx: { crit: 2 } },
    { id: 'ribbon', slot: 'hat', icon: '🎀', name: '하치와레 왕리본', price: 12000, fx: { hp: 5 } },
    { id: 'pudding', slot: 'hat', icon: '🍮', name: '말랑 푸딩 모자', price: 15000, fx: { exp: 8 } },
    { id: 'witch', slot: 'hat', icon: '🧙', name: '별빛 마법사 모자', price: 18000, fx: { atk: 5 } },
    { id: 'tophat', slot: 'hat', icon: '🎩', name: '신사 실크햇', price: 22000, fx: { coin: 8 } },
    { id: 'halo', slot: 'hat', icon: '⭐', name: '별빛 천사 헤일로', price: 25000, fx: { hp: 8 } },
    { id: 'crown', slot: 'hat', icon: '👑', name: '제초왕 황금 왕관', price: 30000, fx: { coin: 10, atk: 3 } },
    { id: 'viking', slot: 'hat', icon: '🪖', name: '용맹한 바이킹 투구', price: 40000, fx: { atk: 6, hp: 6 } },
    { id: 'balloon', slot: 'acc', icon: '🎈', name: '하트 풍선', price: 6000, fx: { coin: 5 } },
    { id: 'glasses', slot: 'acc', icon: '👓', name: '동그란 안경', price: 8000, fx: { exp: 6 } },
    { id: 'scarf', slot: 'acc', icon: '🧣', name: '포근한 목도리', price: 10000, fx: { hp: 5 } },
    { id: 'shades', slot: 'acc', icon: '🕶️', name: '멋쟁이 선글라스', price: 12000, fx: { crit: 3 } },
    { id: 'backpack', slot: 'acc', icon: '🎒', name: '피크닉 가방', price: 15000, fx: { coin: 6, exp: 4 } },
    { id: 'cape', slot: 'acc', icon: '🦸', name: '영웅의 망토', price: 30000, fx: { dr: 4 } },
    { id: 'wings', slot: 'acc', icon: '🪽', name: '천사 날개', price: 45000, fx: { atk: 4, hp: 4 } },
    { id: 'devil', slot: 'acc', icon: '😈', name: '꼬마 악마 날개', price: 45000, fx: { atk: 8 } }
  ];
  const FX_LABEL = { atk: '공격력', hp: '최대 체력', crit: '치명타 확률', dr: '받는 피해 감소', coin: '코인 획득', exp: '경험치 획득' };
  const fxText = fx => Object.entries(fx).filter(([, v]) => v).map(([k, v]) => `${FX_LABEL[k]} +${v}%`).join(' · ');
  const INV_MAX = 60;
  // 🔨 뽑기 무기 강화: 최대 +12, 1회 5,000🪙, 갈수록 성공률이 극단적으로 낮아짐 (실패해도 단계는 유지)
  const ENH_MAX = 12;
  const ENH_COST = 5000;
  const ENH_RATE = [0.95, 0.9, 0.8, 0.68, 0.55, 0.4, 0.27, 0.16, 0.08, 0.035, 0.012, 0.003];
  const effAtk = it => Math.round((it.atk || 0) * (1 + 0.1 * (it.enh || 0)) + 2 * (it.enh || 0));
  const effCrit = it => (it.crit || 0) + Math.floor((it.enh || 0) / 3);
  const sellPrice = it => Math.round(GRADE[it.grade].sell * (1 + 0.5 * (it.enh || 0)));
  const dispName = it => (it.enh ? `+${it.enh} ` : '') + it.name;
  const rnd = (a, b) => Math.round(a + Math.random() * (b - a));
  const esc = s => String(s).replace(/[<>&"']/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c]));

  // ------------------------------------------------------------------
  // 스탯 계산
  // ------------------------------------------------------------------
  function ensure(s) {
    if (!Array.isArray(s.gear)) s.gear = [];
    if (!Array.isArray(s.ownedCos)) s.ownedCos = [];
    // 예전 모자 구매 기록 이전
    (s.unlockedHats || []).forEach(h => { if (h !== 'none' && !s.ownedCos.includes(h)) s.ownedCos.push(h); });
    if (s.equippedAcc === undefined) s.equippedAcc = 'none';
    if (s.hpBase === undefined || s.hpBase === null) s.hpBase = s.maxHp || 120;
  }
  function equippedGear(s, slot) {
    const id = slot === 'weapon' ? s.equipWeapon : s.equipArmor;
    return (s.gear || []).find(g => g.uid === id) || null;
  }
  function totals(s) {
    ensure(s);
    const t = { atk: 0, hp: 0, crit: 0, dr: 0, coin: 0, exp: 0 };
    const add = fx => Object.entries(fx || {}).forEach(([k, v]) => { t[k] = (t[k] || 0) + (v || 0); });
    const w = equippedGear(s, 'weapon'), a = equippedGear(s, 'armor');
    if (w) add({ atk: effAtk(w), crit: effCrit(w) });
    if (a) add({ hp: a.hp, dr: a.dr });
    [s.equippedHat, s.equippedAcc].forEach(id => { const c = COSMETICS.find(x => x.id === id); if (c) add(c.fx); });
    t.dr = Math.min(50, t.dr);
    return t;
  }
  const atkMult = s => 1 + totals(s).atk / 100;
  function recomputeHp(game) {
    const s = game.stats;
    ensure(s);
    const t = totals(s);
    const prevMax = s.maxHp || s.hpBase;
    s.maxHp = Math.round(s.hpBase * (1 + t.hp / 100));
    if (s.hp > s.maxHp) s.hp = s.maxHp;
    else if (s.maxHp > prevMax) s.hp = Math.min(s.maxHp, (s.hp || 0) + (s.maxHp - prevMax));
  }
  function apply(game) {
    if (!game || !game.stats) return;
    ensure(game.stats);
    const t = totals(game.stats);
    game.critChance = Math.min(0.6, 0.1 + t.crit / 100);
    game.damageReduction = t.dr / 100;
    recomputeHp(game);
    applyVisual(game);
    if (game.updateHud) game.updateHud();
  }
  function applyVisual(game) {
    const pm = game.playerMesh;
    if (pm && pm.userData.equipAcc) pm.userData.equipAcc(game.stats.equippedAcc || 'none');
    try { const k = gearKeys(game.stats); dressMesh(pm, k.wv, k.av); } catch (e) { console.warn('SHOPHQ gear', e); }
  }

  // ------------------------------------------------------------------
  // 장비 뽑기
  // ------------------------------------------------------------------
  function rollGrade() {
    const r = Math.random();
    if (r < GRADE.S.p) return 'S';
    if (r < GRADE.S.p + GRADE.A.p) return 'A';
    if (r < GRADE.S.p + GRADE.A.p + GRADE.B.p) return 'B';
    return 'C';
  }
  function makeItem() {
    const slot = Math.random() < 0.5 ? 'weapon' : 'armor';
    const grade = rollGrade();
    const pool = NAMES[slot][grade];
    const R = ROLL[slot][grade];
    const it = { uid: Date.now().toString(36) + Math.random().toString(36).slice(2, 7), slot, grade, name: pool[(Math.random() * pool.length) | 0] };
    Object.entries(R).forEach(([k, [a, b]]) => { it[k] = rnd(a, b); });
    return it;
  }
  function itemFx(it) {
    return it.slot === 'weapon'
      ? `공격력 +${effAtk(it)}%${effCrit(it) ? ` · 치명타 +${effCrit(it)}%` : ''}`
      : `최대 체력 +${it.hp}% · 받는 피해 -${it.dr}%`;
  }
  function pull(n) {
    const g = window.gameApp;
    if (!g) return;
    const s = g.stats;
    ensure(s);
    const cost = ECON.gacha * n;
    if (s.coins < cost) { soundFx.playAttack(); showToast(`🪙 코인이 부족해요! (필요: ${cost.toLocaleString()}🪙)`); return; }
    if (s.gear.length + n > INV_MAX) { showToast(`🎒 장비 가방이 가득 찼어요! (${INV_MAX}칸) C급 장비를 팔고 다시 뽑아 주세요.`); tab = 'bag'; render(); return; }
    s.coins -= cost;
    const got = [];
    for (let i = 0; i < n; i++) got.push(makeItem());
    s.gear.push(...got);
    s.gachaPulls = (s.gachaPulls || 0) + n;
    // 빈 슬롯이면 자동 장착
    got.forEach(it => {
      const cur = equippedGear(s, it.slot);
      const score = x => (x.slot === 'weapon' ? x.atk : x.hp) + (x.slot === 'weapon' ? x.crit * 3 : x.dr * 3);
      if (!cur || score(it) > score(cur)) { if (it.slot === 'weapon') s.equipWeapon = it.uid; else s.equipArmor = it.uid; }
    });
    apply(g);
    g.saveData(true);
    const best = got.reduce((a, b) => ('SABC'.indexOf(a.grade) <= 'SABC'.indexOf(b.grade) ? a : b));
    if (best.grade === 'S' || best.grade === 'A') soundFx.playFanfare(); else soundFx.playCoin();
    if ((best.grade === 'S' || best.grade === 'A') && window.coop && window.coop.w && window.coop.w.on) {
      try { window.coop.sendEvent('chat', { m: `🎉 ${best.grade}급 [${best.name.replace(/^\S+\s/, '')}] 획득!!` }); } catch (e) {}
    }
    lastPull = got;
    render();
  }
  let lastPull = null;

  function equip(uid) {
    const g = window.gameApp; const s = g.stats; ensure(s);
    const it = s.gear.find(x => x.uid === uid);
    if (!it) return;
    if (it.slot === 'weapon') s.equipWeapon = s.equipWeapon === uid ? null : uid;
    else s.equipArmor = s.equipArmor === uid ? null : uid;
    apply(g); g.saveData(); soundFx.playCoin(); render();
  }
  function sell(uid) {
    const g = window.gameApp; const s = g.stats; ensure(s);
    const i = s.gear.findIndex(x => x.uid === uid);
    if (i < 0) return;
    const it = s.gear[i];
    if (it.uid === s.equipWeapon || it.uid === s.equipArmor) { showToast('🛡️ 장착 중인 장비는 팔 수 없어요. 먼저 해제해 주세요.'); return; }
    if ((it.grade === 'S' || it.grade === 'A') && !confirmSell(it)) return;
    s.gear.splice(i, 1);
    s.coins += sellPrice(it);
    apply(g); g.saveData(); soundFx.playCoin();
    showToast(`💰 [${dispName(it)}] 판매 +${sellPrice(it).toLocaleString()}🪙`);
    render();
  }
  // 브라우저 확인창 대신 두 번 누르기로 확인
  let sellArm = null;
  function confirmSell(it) {
    if (sellArm === it.uid) { sellArm = null; return true; }
    sellArm = it.uid;
    showToast(`⚠️ ${it.grade}급 장비예요! 정말 팔려면 [판매]를 한 번 더 눌러 주세요.`);
    setTimeout(() => { if (sellArm === it.uid) sellArm = null; }, 4000);
    return false;
  }
  function sellAllC() {
    const g = window.gameApp; const s = g.stats; ensure(s);
    const keep = [], sold = [];
    s.gear.forEach(it => { if (it.grade === 'C' && it.uid !== s.equipWeapon && it.uid !== s.equipArmor) sold.push(it); else keep.push(it); });
    if (!sold.length) { showToast('팔 수 있는 C급 장비가 없어요.'); return; }
    s.gear = keep;
    const gain = sold.length * GRADE.C.sell;
    s.coins += gain;
    g.saveData(); soundFx.playCoin();
    showToast(`💰 C급 장비 ${sold.length}개 판매 +${gain.toLocaleString()}🪙`);
    render();
  }

  // ------------------------------------------------------------------
  // 🔨 무기 강화
  // ------------------------------------------------------------------
  let enhSel = null;
  let enhFx = null; // 직전 결과 연출 ('ok' | 'fail')
  function enhance(uid) {
    const g = window.gameApp; const s = g.stats; ensure(s);
    const it = s.gear.find(x => x.uid === uid && x.slot === 'weapon');
    if (!it) { showToast('🔨 강화할 무기를 먼저 골라 주세요.'); return; }
    it.enh = it.enh || 0;
    if (it.enh >= ENH_MAX) { showToast('👑 이미 최대 +12강이에요!'); return; }
    if (s.coins < ENH_COST) { soundFx.playAttack(); showToast(`🪙 코인이 부족해요! (1회 ${ENH_COST.toLocaleString()}🪙)`); return; }
    s.coins -= ENH_COST;
    s.enhTries = (s.enhTries || 0) + 1;
    const rate = ENH_RATE[it.enh];
    if (Math.random() < rate) {
      it.enh++;
      enhFx = 'ok';
      soundFx.playFanfare();
      showToast(`🔨✨ 강화 성공!! [+${it.enh} ${it.name}] 공격력 +${effAtk(it)}%`);
      if (it.enh >= 9 && window.coop && window.coop.w && window.coop.w.on) {
        try { window.coop.sendEvent('chat', { m: `🔨 [${it.name.replace(/^\S+\s/, '')}] +${it.enh}강 성공!!` }); } catch (e) {}
      }
    } else {
      enhFx = 'fail';
      soundFx.playAttack();
      showToast(`💥 강화 실패… (+${it.enh} 유지 · 성공 확률 ${(rate * 100).toFixed(rate < 0.01 ? 1 : 0)}%)`);
    }
    apply(g); g.saveData(); render();
  }

  // ------------------------------------------------------------------
  // 꾸미기
  // ------------------------------------------------------------------
  function buyOrWear(id) {
    const g = window.gameApp; const s = g.stats; ensure(s);
    const c = COSMETICS.find(x => x.id === id);
    if (!c) return;
    const cur = c.slot === 'hat' ? s.equippedHat : s.equippedAcc;
    if (!s.ownedCos.includes(id)) {
      if (s.coins < c.price) { soundFx.playAttack(); showToast(`🪙 코인이 부족해요! (${c.price.toLocaleString()}🪙 필요)`); return; }
      s.coins -= c.price;
      s.ownedCos.push(id);
      if (c.slot === 'hat' && !s.unlockedHats.includes(id)) s.unlockedHats.push(id);
      soundFx.playFanfare();
      showToast(`🎉 [${c.name}] 구매! ${fxText(c.fx)}`);
    }
    const next = cur === id ? 'none' : id;
    if (c.slot === 'hat') g.equipPlayerHat(next);
    else s.equippedAcc = next;
    apply(g); g.saveData(); render();
  }

  // ------------------------------------------------------------------
  // 상점 화면
  // ------------------------------------------------------------------
  let tab = 'gacha';
  function buildModal() {
    const modal = document.getElementById('shop-modal');
    if (!modal || modal.dataset.hq) return;
    modal.dataset.hq = '1';
    const win = modal.querySelector('.modal-window');
    win.style.maxWidth = '760px';
    win.innerHTML = `
      <button type="button" class="modal-close-btn" onclick="closeCostumeShopModal()">✕</button>
      <div class="sh-head">
        <h2>🛍️ 포쉐트 상점</h2>
        <span class="sh-coin" id="shop-coin-display">0 🪙</span>
      </div>
      <div class="sh-power" id="sh-power"></div>
      <div class="sh-tabs">
        <button type="button" data-tab="gacha">🎲 장비 뽑기</button>
        <button type="button" data-tab="bag">🎒 내 장비</button>
        <button type="button" data-tab="cos">👒 꾸미기</button>
        <button type="button" data-tab="enh">🔨 무기 강화</button>
        <button type="button" data-tab="etc">🧪 소모품</button>
      </div>
      <div class="sh-body" id="sh-body"></div>`;
    win.addEventListener('click', e => {
      const b = e.target.closest('[data-tab],[data-act]');
      if (!b) return;
      if (b.dataset.tab) { tab = b.dataset.tab; lastPull = tab === 'gacha' ? lastPull : null; render(); return; }
      const a = b.dataset.act, id = b.dataset.id;
      if (a === 'pull1') pull(1);
      else if (a === 'pull10') pull(10);
      else if (a === 'equip') equip(id);
      else if (a === 'sell') sell(id);
      else if (a === 'sellc') sellAllC();
      else if (a === 'cos') buyOrWear(id);
      else if (a === 'potion') buyPotion();
      else if (a === 'wup') weaponUp();
      else if (a === 'enhsel') { enhSel = id; render(); }
      else if (a === 'enh') enhance(enhSel);
    });
  }
  function itemCard(it, s, actions = true) {
    const G = GRADE[it.grade];
    const on = it.uid === s.equipWeapon || it.uid === s.equipArmor;
    return `<div class="sh-item g${it.grade}${on ? ' on' : ''}" style="--gc:${G.color}">
      <div class="sh-grade" style="background:${G.bg}">${it.grade}</div>
      <div class="sh-iname">${it.enh ? `<span class="sh-enh">+${it.enh}</span> ` : ''}${esc(it.name)}</div>
      <div class="sh-islot">${it.slot === 'weapon' ? '⚔️ 무기' : '🛡️ 방어구'}</div>
      <div class="sh-ifx">${itemFx(it)}</div>
      ${actions ? `<div class="sh-iact">
        <button type="button" data-act="equip" data-id="${it.uid}" class="${on ? 'on' : ''}">${on ? '✅ 장착 중' : '장착'}</button>
        <button type="button" data-act="sell" data-id="${it.uid}" class="sell">판매 ${sellPrice(it).toLocaleString()}</button>
      </div>` : ''}
    </div>`;
  }
  function render() {
    const g = window.gameApp;
    if (!g) return;
    buildModal();
    const s = g.stats;
    ensure(s);
    const coinEl = document.getElementById('shop-coin-display');
    if (coinEl) coinEl.innerText = `${s.coins.toLocaleString()} 🪙`;
    const t = totals(s);
    const pw = document.getElementById('sh-power');
    if (pw) pw.innerHTML = `💪 장착 효과 — 공격력 <b>+${t.atk}%</b> · 최대 체력 <b>+${t.hp}%</b> · 치명타 <b>+${t.crit}%</b> · 피해 감소 <b>${t.dr}%</b> · 코인 <b>+${t.coin}%</b> · 경험치 <b>+${t.exp}%</b>`;
    document.querySelectorAll('#shop-modal .sh-tabs button').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    const body = document.getElementById('sh-body');
    if (!body) return;
    if (tab === 'gacha') {
      const w = equippedGear(s, 'weapon'), a = equippedGear(s, 'armor');
      body.innerHTML = `
        <div class="sh-gacha">
          <div class="sh-gbox">
            <div class="sh-gtitle">🎲 무기·방어구 랜덤 뽑기</div>
            <div class="sh-gdesc">무기와 방어구는 뽑기로만 얻을 수 있어요. 등급이 높을수록 효과 차이가 엄청나요!</div>
            <div class="sh-odds">
              <span style="--gc:${GRADE.S.color}">S 0.028%</span><span style="--gc:${GRADE.A.color}">A 0.2%</span><span style="--gc:${GRADE.B.color}">B 2%</span><span style="--gc:${GRADE.C.color}">C 97.772%</span>
            </div>
            <div class="sh-ranges">
              ⚔️ 무기 — C 공격 +3~8% · B +15~25% · A +45~70% (치명 +3~5%) · <b>S +120~180% (치명 +8~12%)</b><br>
              🛡️ 방어구 — C 체력 +5~10% · B +20~30% · A +50~80% (피해 -12~18%) · <b>S +120~160% (피해 -25~30%)</b>
            </div>
            <div class="sh-gbtns">
              <button type="button" data-act="pull1">1회 뽑기<br><small>${ECON.gacha.toLocaleString()}🪙</small></button>
              <button type="button" data-act="pull10" class="ten">10회 뽑기<br><small>${(ECON.gacha * 10).toLocaleString()}🪙</small></button>
            </div>
            <div class="sh-cur">장착 중: ${w ? `<b style="color:${GRADE[w.grade].color}">[${w.grade}] ${esc(w.name)}</b>` : '무기 없음'} · ${a ? `<b style="color:${GRADE[a.grade].color}">[${a.grade}] ${esc(a.name)}</b>` : '방어구 없음'} <small>(총 ${s.gachaPulls || 0}회 뽑음)</small></div>
          </div>
          ${lastPull ? `<div class="sh-result">${lastPull.map(it => itemCard(it, s, false)).join('')}</div>` : ''}
        </div>`;
      if (lastPull) body.querySelectorAll('.sh-result .sh-item').forEach((el, i) => { el.style.animationDelay = `${i * 0.07}s`; });
    } else if (tab === 'bag') {
      const order = { S: 0, A: 1, B: 2, C: 3 };
      const list = s.gear.slice().sort((x, y) => order[x.grade] - order[y.grade] || (y.atk || y.hp) - (x.atk || x.hp));
      body.innerHTML = `
        <div class="sh-bagbar">🎒 ${s.gear.length} / ${INV_MAX}칸 <button type="button" data-act="sellc">C급 일괄 판매 (장착 제외)</button></div>
        ${list.length ? `<div class="sh-grid">${list.map(it => itemCard(it, s)).join('')}</div>` : '<div class="sh-empty">아직 장비가 없어요. 🎲 장비 뽑기에서 뽑아 보세요!</div>'}`;
    } else if (tab === 'enh') {
      const order = { S: 0, A: 1, B: 2, C: 3 };
      const ws = s.gear.filter(x => x.slot === 'weapon').sort((x, y) => order[x.grade] - order[y.grade] || (y.enh || 0) - (x.enh || 0) || effAtk(y) - effAtk(x));
      if (!enhSel || !ws.find(x => x.uid === enhSel)) enhSel = (equippedGear(s, 'weapon') || ws[0] || {}).uid || null;
      const it = ws.find(x => x.uid === enhSel);
      const rateRow = ENH_RATE.map((r, i) => `<span class="${it && (it.enh || 0) === i ? 'cur' : ''}${it && (it.enh || 0) > i ? ' done' : ''}">+${i + 1}<b>${(r * 100) < 1 ? (r * 100).toFixed(1) : Math.round(r * 100)}%</b></span>`).join('');
      let panel = '<div class="sh-empty">강화할 무기가 없어요. 🎲 장비 뽑기에서 무기를 뽑아 보세요!</div>';
      if (it) {
        const e = it.enh || 0;
        const next = Object.assign({}, it, { enh: Math.min(ENH_MAX, e + 1) });
        const G = GRADE[it.grade];
        panel = `<div class="sh-enhbox ${enhFx || ''}" style="--gc:${G.color}">
          <div class="sh-grade big" style="background:${G.bg}">${it.grade}</div>
          <div class="sh-enhname"><span class="sh-enh">+${e}</span> ${esc(it.name)}</div>
          <div class="sh-enhstat">공격력 <b>+${effAtk(it)}%</b>${effCrit(it) ? ` · 치명타 <b>+${effCrit(it)}%</b>` : ''}
            ${e < ENH_MAX ? `<span class="arrow">→</span> <b class="nx">+${effAtk(next)}%</b>${effCrit(next) > effCrit(it) ? ` · 치명 <b class="nx">+${effCrit(next)}%</b>` : ''}` : ''}</div>
          ${e < ENH_MAX ? `<div class="sh-enhrate">+${e + 1}강 성공 확률 <b>${(ENH_RATE[e] * 100) < 1 ? (ENH_RATE[e] * 100).toFixed(1) : Math.round(ENH_RATE[e] * 100)}%</b> · 실패해도 단계는 유지돼요</div>
          <button type="button" class="sh-enhbtn" data-act="enh">🔨 강화하기 (${ENH_COST.toLocaleString()}🪙)</button>` : '<div class="sh-enhrate">👑 최대 강화 +12 달성!</div>'}
        </div>`;
      }
      body.innerHTML = `${panel}
        <div class="sh-rates">${rateRow}</div>
        <div class="sh-sub">⚔️ 내 무기 (눌러서 선택)</div>
        <div class="sh-wlist">${ws.map(x => `<button type="button" data-act="enhsel" data-id="${x.uid}" class="${x.uid === enhSel ? 'sel' : ''}" style="--gc:${GRADE[x.grade].color}"><b>${x.grade}</b> ${x.enh ? `+${x.enh} ` : ''}${esc(x.name)}${x.uid === s.equipWeapon ? ' ✅' : ''}</button>`).join('') || ''}</div>`;
      enhFx = null;
    } else if (tab === 'cos') {
      const card = c => {
        const owned = s.ownedCos.includes(c.id);
        const worn = (c.slot === 'hat' ? s.equippedHat : s.equippedAcc) === c.id;
        return `<div class="sh-cos${worn ? ' on' : ''}">
          <div class="sh-cicon">${c.icon}</div>
          <div class="sh-iname">${c.name}</div>
          <div class="sh-ifx">${fxText(c.fx)}</div>
          <button type="button" data-act="cos" data-id="${c.id}" class="${worn ? 'on' : owned ? 'owned' : ''}">${worn ? '✅ 착용 중 (벗기)' : owned ? '착용하기' : `${c.price.toLocaleString()}🪙 구매`}</button>
        </div>`;
      };
      body.innerHTML = `
        <div class="sh-sub">👒 머리 장식 (1개 착용)</div><div class="sh-grid cos">${COSMETICS.filter(c => c.slot === 'hat').map(card).join('')}</div>
        <div class="sh-sub">🎀 액세서리 (1개 착용)</div><div class="sh-grid cos">${COSMETICS.filter(c => c.slot === 'acc').map(card).join('')}</div>`;
    } else {
      const n = Math.max(0, Math.min(5, s.potions | 0));
      const wl = s.weaponLv || 1;
      body.innerHTML = `
        <div class="sh-row"><div><b>🧪 HP 물약</b> <span class="sh-tag">${n} / 5개</span><br><small>[R]키로 사용 · 최대 체력의 50% 회복</small></div>
          <button type="button" data-act="potion" ${n >= 5 ? 'disabled' : ''}>${n >= 5 ? '가방이 가득 찼어요' : `1개 ${ECON.potion.toLocaleString()}🪙`}</button></div>
        <div class="sh-row"><div><b>🔱 기본 사스마타 단련</b> <span class="sh-tag">+${wl}강</span><br><small>모든 공격의 기본 공격력이 올라가요 (최대 +10강)</small></div>
          <button type="button" data-act="wup" ${wl >= 10 ? 'disabled' : ''}>${wl >= 10 ? '👑 최고 단계' : `+${wl + 1}강 ${ECON.weaponUp(wl).toLocaleString()}🪙`}</button></div>
        <div class="sh-econ"><b>💰 코인 얻는 법</b><br>
          쉬운 보상: 제초 ${ECON.weed.toLocaleString()}~${ECON.goldWeed.toLocaleString()} · 보물상자 ${ECON.chest.toLocaleString()}~${ECON.crystal.toLocaleString()} · 들판 몬스터 ${ECON.fieldMon.toLocaleString()} · 모닥불 ${ECON.camp.toLocaleString()} · 친구 대화 ${ECON.talk.toLocaleString()} · 연습 시험 ${ECON.exam.toLocaleString()} · 라멘 ${ECON.ramen.toLocaleString()} · 점프 타워 ${ECON.jumpRepeat.toLocaleString()} · 엘리트 ${ECON.event.toLocaleString()} (하루 횟수 제한)<br>
          전투 스테이지: 1단계 ${ECON.stageReward(1).toLocaleString()} → 10단계 ${ECON.stageReward(10).toLocaleString()} → 20단계 ${ECON.stageReward(20).toLocaleString()}<br>
          재화 던전: ${ECON.dungeonGold.map(v => v.toLocaleString()).join(' / ')} · 레이드: 파자마 새 ${ECON.raidBird.toLocaleString()} · 아노코 ${ECON.raidAnoko.toLocaleString()}
        </div>`;
    }
  }
  function buyPotion() {
    const g = window.gameApp; const s = g.stats;
    s.potions = Math.max(0, Math.min(5, s.potions | 0));
    if (s.potions >= 5) { showToast('🎒 HP 물약은 최대 5개까지만 들고 다닐 수 있어요!'); return; }
    if (s.coins < ECON.potion) { soundFx.playAttack(); showToast(`🪙 코인이 부족해요! (필요: ${ECON.potion.toLocaleString()}🪙)`); return; }
    s.coins -= ECON.potion; s.potions++;
    soundFx.playCoin(); g.saveData(); g.updateHud(); render();
    showToast(`🧪 HP 물약 구매! (보유 ${s.potions}/5개)`);
  }
  function weaponUp() {
    const g = window.gameApp; const s = g.stats;
    if ((s.weaponLv || 1) >= 10) return;
    const cost = ECON.weaponUp(s.weaponLv || 1);
    if (s.coins < cost) { soundFx.playAttack(); showToast(`🪙 코인이 부족해요! (필요: ${cost.toLocaleString()}🪙)`); return; }
    s.coins -= cost; s.weaponLv = (s.weaponLv || 1) + 1;
    soundFx.playFanfare(); g.saveData(); g.updateHud(); render();
    showToast(`🔱 사스마타가 [+${s.weaponLv}강]으로 강화됐어요!`);
  }

  // ------------------------------------------------------------------
  // 꾸미기 3D 모델 (머리 장식 추가분 + 액세서리)
  // ------------------------------------------------------------------
  const tm = c => new THREE.MeshToonMaterial({ color: c, gradientMap: typeof getToonGradientMap === 'function' ? getToonGradientMap() : null });
  const ol = (m, t = 0.05) => { if (typeof addCartoonOutline === 'function') addCartoonOutline(m, t); return m; };
  function makeHat(type) {
    const g = new THREE.Group();
    if (type === 'cat') {
      [-1, 1].forEach(s => {
        const ear = ol(new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.75, 3), tm(0xfef3c7)));
        ear.position.set(s * 0.6, 0.25, 0); ear.rotation.z = -s * 0.25;
        const inner = new THREE.Mesh(new THREE.ConeGeometry(0.24, 0.45, 3), tm(0xf9a8d4));
        inner.position.set(s * 0.6, 0.2, 0.12); inner.rotation.z = -s * 0.25;
        g.add(ear, inner);
      });
      return g;
    }
    if (type === 'witch') {
      const brim = ol(new THREE.Mesh(new THREE.CylinderGeometry(1.05, 1.05, 0.1, 24), tm(0x4c1d95)));
      const cone = ol(new THREE.Mesh(new THREE.ConeGeometry(0.62, 1.6, 20), tm(0x5b21b6)));
      cone.position.y = 0.82; cone.rotation.z = 0.22;
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.62, 0.16, 20), tm(0xfacc15));
      band.position.y = 0.12;
      const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.16, 0), new THREE.MeshBasicMaterial({ color: 0xfde047 }));
      star.position.set(0.25, 1.2, 0.3);
      g.add(brim, cone, band, star);
      return g;
    }
    if (type === 'tophat') {
      const brim = ol(new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.08, 24), tm(0x111827)));
      const top = ol(new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.95, 24), tm(0x1f2937)));
      top.position.y = 0.5;
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.565, 0.565, 0.16, 24), tm(0xdc2626));
      band.position.y = 0.15;
      g.add(brim, top, band);
      return g;
    }
    if (type === 'pudding') {
      const body = ol(new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.68, 0.6, 24), tm(0xfcd34d)));
      body.position.y = 0.3;
      const top = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.5, 0.14, 24), tm(0x92400e));
      top.position.y = 0.64;
      const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.14, 12, 10), tm(0xef4444));
      cherry.position.y = 0.8;
      g.add(body, top, cherry);
      return g;
    }
    if (type === 'viking') {
      const dome = ol(new THREE.Mesh(new THREE.SphereGeometry(0.75, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), tm(0x94a3b8)));
      const rim = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.08, 8, 24), tm(0xa16207));
      rim.rotation.x = Math.PI / 2;
      g.add(dome, rim);
      [-1, 1].forEach(s => {
        const horn = ol(new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.8, 10), tm(0xfef3c7)));
        horn.position.set(s * 0.82, 0.35, 0); horn.rotation.z = -s * 0.9;
        g.add(horn);
      });
      return g;
    }
    return null;
  }
  function makeAcc(type) {
    const g = new THREE.Group();
    if (type === 'wings' || type === 'devil') {
      const col = type === 'wings' ? 0xffffff : 0x6d28d9;
      [-1, 1].forEach(s => {
        const shape = new THREE.Shape();
        if (type === 'wings') {
          shape.moveTo(0, 0); shape.quadraticCurveTo(0.9, 0.9, 1.7, 0.7); shape.quadraticCurveTo(1.4, 0.2, 1.6, -0.1);
          shape.quadraticCurveTo(1.1, -0.2, 1.3, -0.5); shape.quadraticCurveTo(0.6, -0.5, 0, 0);
        } else {
          shape.moveTo(0, 0); shape.lineTo(1.5, 0.8); shape.lineTo(1.2, 0.1); shape.lineTo(1.6, -0.2); shape.lineTo(1.0, -0.3); shape.lineTo(1.1, -0.7); shape.lineTo(0, 0);
        }
        const w = ol(new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.08, bevelEnabled: false }), tm(col)), 0.04);
        w.scale.set(s, 1, 1);
        w.position.set(s * 0.35, 2.5, -0.35);
        w.rotation.y = -s * 0.35;
        g.add(w);
      });
      g.userData.flap = true;
      return g;
    }
    if (type === 'cape') {
      const cape = ol(new THREE.Mesh(new THREE.CylinderGeometry(0.9, 1.35, 2.2, 16, 1, true, Math.PI * 0.6, Math.PI * 0.8), new THREE.MeshToonMaterial({ color: 0xdc2626, side: THREE.DoubleSide })), 0.03);
      cape.position.set(0, 1.75, -0.15);
      cape.rotation.y = Math.PI;
      g.add(cape);
      return g;
    }
    if (type === 'glasses' || type === 'shades') {
      const fm = tm(type === 'glasses' ? 0x7c2d12 : 0x111827);
      [-1, 1].forEach(s => {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.05, 8, 20), fm);
        ring.position.set(s * 0.42, 3.05, 0.42);
        g.add(ring);
        if (type === 'shades') {
          const lens = new THREE.Mesh(new THREE.CircleGeometry(0.29, 20), new THREE.MeshBasicMaterial({ color: 0x0f172a, transparent: true, opacity: 0.85 }));
          lens.position.set(s * 0.42, 3.05, 0.43);
          g.add(lens);
        }
      });
      const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.05, 0.05), fm);
      bridge.position.set(0, 3.08, 0.42);
      g.add(bridge);
      return g;
    }
    if (type === 'scarf') {
      const sc = ol(new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.2, 10, 24), tm(0xef4444)), 0.04);
      sc.rotation.x = Math.PI / 2;
      sc.scale.set(1, 0.6, 1);
      sc.position.set(0, 2.45, 0);
      const tail = ol(new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.9, 0.12), tm(0xef4444)), 0.04);
      tail.position.set(0.45, 2.0, 0.55);
      tail.rotation.z = 0.2;
      g.add(sc, tail);
      return g;
    }
    if (type === 'backpack') {
      const bag = ol(new THREE.Mesh(new THREE.BoxGeometry(1.2, 1.2, 0.6), tm(0xf59e0b)), 0.04);
      bag.position.set(0, 2.1, -0.6);
      const flap = new THREE.Mesh(new THREE.BoxGeometry(1.22, 0.4, 0.62), tm(0xb45309));
      flap.position.set(0, 2.6, -0.6);
      g.add(bag, flap);
      return g;
    }
    if (type === 'balloon') {
      const shape = new THREE.Shape();
      shape.moveTo(0, -0.35); shape.bezierCurveTo(-0.6, 0.1, -0.35, 0.55, 0, 0.3); shape.bezierCurveTo(0.35, 0.55, 0.6, 0.1, 0, -0.35);
      const heart = ol(new THREE.Mesh(new THREE.ExtrudeGeometry(shape, { depth: 0.25, bevelEnabled: true, bevelThickness: 0.08, bevelSize: 0.06, bevelSegments: 2 }), tm(0xfb7185)), 0.04);
      heart.position.set(1.5, 5.2, 0);
      heart.scale.setScalar(1.3);
      const str = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 3.0, 4), tm(0xffffff));
      str.position.set(1.35, 3.3, 0.1);
      str.rotation.z = 0.06;
      g.add(heart, str);
      g.userData.bob = heart;
      return g;
    }
    return null;
  }

  // ------------------------------------------------------------------
  // ⚔️🛡️ 장착 장비 외형 (무기: 손에 드는 3D 모델 / 방어구: 어깨·허리·망토 + 발밑 오라)
  // ------------------------------------------------------------------
  const W_SHAPES = [['사스마타', 'sasumata'], ['쌍검', 'dual'], ['대검', 'great'], ['발톱', 'claw'], ['언월도', 'scythe'], ['낫', 'scythe'],
    ['빗자루', 'broom'], ['칫솔', 'broom'], ['장궁', 'bow'], ['활', 'bow'], ['지팡이', 'staff'], ['낚싯대', 'staff'], ['장대', 'staff'],
    ['젓가락', 'staff'], ['채찍', 'staff'], ['삼지창', 'trident'], ['꼬치', 'spear'], ['창', 'spear'], ['도끼', 'axe'], ['망치', 'hammer'],
    ['몽둥이', 'hammer'], ['방망이', 'hammer'], ['쌍절곤', 'hammer'], ['바게트', 'hammer'], ['사다리', 'hammer'], ['국자', 'ladle'],
    ['숟가락', 'ladle'], ['프라이팬', 'pan'], ['우산', 'umbrella'], ['부메랑', 'boomerang']];
  const A_STYLES = [['망토', 'cape'], ['로브', 'cape'], ['코트', 'cape'], ['하오리', 'cape'], ['닌자복', 'cape'], ['비행복', 'light'],
    ['갑옷', 'plate'], ['판금', 'plate'], ['갑주', 'plate'], ['성갑', 'plate'], ['흉갑', 'plate'], ['방패', 'plate'], ['경갑', 'plate'], ['철모', 'plate']];
  const weaponShape = name => (W_SHAPES.find(([k]) => name.includes(k)) || [0, 'sword'])[1];
  const armorStyle = name => (A_STYLES.find(([k]) => name.includes(k)) || [0, 'light'])[1];
  // 등급 팔레트: 날(밝은색) / 장식(등급색) / 손잡이
  const PAL = {
    C: { blade: 0xcbd5e1, acc: 0x94a3b8, grip: 0x8b5a2b, glow: 0x94a3b8 },
    B: { blade: 0xe0f2fe, acc: 0x3b82f6, grip: 0x1e3a8a, glow: 0x60a5fa },
    A: { blade: 0xf5f3ff, acc: 0xa855f7, grip: 0x4c1d95, glow: 0xc084fc },
    S: { blade: 0xfffbeb, acc: 0xf59e0b, grip: 0x7c2d12, glow: 0xfbbf24 }
  };
  let _glowTex = null;
  function glowTex() {
    if (_glowTex) return _glowTex;
    const c = document.createElement('canvas'); c.width = c.height = 64;
    const x = c.getContext('2d');
    const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
    gr.addColorStop(0, 'rgba(255,255,255,1)'); gr.addColorStop(0.35, 'rgba(255,255,255,0.55)'); gr.addColorStop(1, 'rgba(255,255,255,0)');
    x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
    _glowTex = new THREE.CanvasTexture(c);
    return _glowTex;
  }
  function glowSprite(color, size, opacity = 0.8) {
    const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex(), color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false }));
    sp.scale.setScalar(size);
    sp.userData.noShadow = true;
    return sp;
  }
  const mesh = (geo, mat, x = 0, y = 0, z = 0, outline = 0.04) => {
    const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z);
    if (outline) ol(m, outline);
    return m;
  };
  const basic = c => new THREE.MeshBasicMaterial({ color: c });

  function buildWeaponHead(shape, P) {
    const g = new THREE.Group();
    const blade = tm(P.blade), acc = tm(P.acc), grip = tm(P.grip);
    const shaft = (len, r = 0.09, mat = grip) => { const s = mesh(new THREE.CylinderGeometry(r, r, len, 10), mat, 0, len / 2 - 0.65); g.add(s); return s; };
    const swordBlade = (w, h, y0) => {
      const sh = new THREE.Shape();
      sh.moveTo(-w / 2, 0); sh.lineTo(w / 2, 0); sh.lineTo(w / 2, h); sh.lineTo(0, h + w * 0.9); sh.lineTo(-w / 2, h); sh.closePath();
      const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 });
      geo.translate(0, y0, -0.04);
      const b = mesh(geo, blade, 0, 0, 0, 0.035); g.add(b);
      const fuller = new THREE.Mesh(new THREE.BoxGeometry(w * 0.18, h * 0.8, 0.17), acc);
      fuller.position.set(0, y0 + h * 0.45, 0); g.add(fuller);
      return h + w * 0.9 + y0;
    };
    let tip = 2.6;
    switch (shape) {
      case 'sword': case 'dual': {
        g.add(mesh(new THREE.CylinderGeometry(0.1, 0.1, 0.9, 10), grip, 0, 0));
        g.add(mesh(new THREE.SphereGeometry(0.14, 10, 8), acc, 0, -0.5));
        g.add(mesh(new THREE.BoxGeometry(0.85, 0.16, 0.24), acc, 0, 0.5));
        tip = swordBlade(0.38, 1.75, 0.58);
        break;
      }
      case 'great': case 'claw': {
        g.add(mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.1, 10), grip, 0, -0.05));
        g.add(mesh(new THREE.BoxGeometry(1.15, 0.22, 0.3), acc, 0, 0.55));
        if (shape === 'claw') {
          [-0.28, 0, 0.28].forEach((x, i) => {
            const c = mesh(new THREE.ConeGeometry(0.15, 2.0 - Math.abs(i - 1) * 0.4, 6), blade, x, 1.6 - Math.abs(i - 1) * 0.2, 0, 0.035);
            c.rotation.z = -x * 0.35; g.add(c);
          });
          tip = 2.6;
        } else tip = swordBlade(0.62, 2.15, 0.66);
        break;
      }
      case 'spear': case 'trident': {
        shaft(3.5, 0.08);
        if (shape === 'trident') {
          g.add(mesh(new THREE.BoxGeometry(0.75, 0.12, 0.12), acc, 0, 2.85));
          [-0.33, 0, 0.33].forEach(x => g.add(mesh(new THREE.ConeGeometry(0.09, x ? 0.55 : 0.75, 6), blade, x, x ? 3.18 : 3.28, 0, 0.03)));
        } else {
          const h = mesh(new THREE.ConeGeometry(0.2, 0.85, 4), blade, 0, 3.27, 0, 0.035); h.scale.z = 0.45; g.add(h);
          const collar = mesh(new THREE.TorusGeometry(0.13, 0.05, 6, 14), acc, 0, 2.85, 0, 0); collar.rotation.x = Math.PI / 2; g.add(collar);
        }
        tip = 3.6;
        break;
      }
      case 'sasumata': {
        shaft(3.4, 0.09, acc);
        const f = mesh(new THREE.TorusGeometry(0.5, 0.1, 10, 22, Math.PI), blade, 0, 2.75); f.rotation.z = Math.PI; g.add(f);
        g.add(mesh(new THREE.SphereGeometry(0.16, 10, 8), acc, 0, 2.3));
        tip = 2.9;
        break;
      }
      case 'axe': {
        shaft(2.9, 0.09);
        const sh = new THREE.Shape(); sh.moveTo(0, -0.35); sh.quadraticCurveTo(0.95, -0.75, 1.0, 0); sh.quadraticCurveTo(0.95, 0.75, 0, 0.35); sh.closePath();
        const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.12, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.03, bevelSegments: 1 }); geo.translate(0.05, 1.95, -0.06);
        g.add(mesh(geo, blade, 0, 0, 0, 0.035));
        g.add(mesh(new THREE.BoxGeometry(0.3, 0.55, 0.26), acc, 0, 1.95));
        tip = 2.5;
        break;
      }
      case 'hammer': {
        shaft(2.7, 0.1);
        const hd = mesh(new THREE.CylinderGeometry(0.42, 0.42, 1.05, 12), blade, 0, 2.05); hd.rotation.z = Math.PI / 2; g.add(hd);
        [-0.55, 0.55].forEach(x => { const r = mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.12, 12), acc, x, 2.05, 0, 0); r.rotation.z = Math.PI / 2; g.add(r); });
        tip = 2.5;
        break;
      }
      case 'bow': {
        const arc = mesh(new THREE.TorusGeometry(1.35, 0.08, 6, 26, Math.PI * 0.9), blade, -1.35, 0.6, 0, 0.03);
        arc.rotation.z = -Math.PI * 0.45; g.add(arc);
        const str = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 2.67, 4), basic(0xffffff)); str.position.set(-1.14, 0.6, 0); g.add(str);
        g.add(mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.55, 10), grip, 0, 0.6));
        [1.93, -0.73].forEach(y => g.add(mesh(new THREE.SphereGeometry(0.12, 8, 6), acc, -1.14, y, 0, 0)));
        tip = 1.9;
        break;
      }
      case 'staff': {
        shaft(3.3, 0.085);
        const gem = mesh(new THREE.OctahedronGeometry(0.34, 0), acc, 0, 2.95, 0, 0.03); g.add(gem);
        const ring = mesh(new THREE.TorusGeometry(0.48, 0.05, 6, 20), blade, 0, 2.95, 0, 0); g.add(ring);
        g.userData.spin = gem; g.userData.ring = ring;
        tip = 3.0;
        break;
      }
      case 'scythe': {
        shaft(3.3, 0.085);
        const sh = new THREE.Shape(); sh.absarc(0, 0, 1.2, Math.PI * 0.05, Math.PI * 0.62, false); sh.absarc(0.12, -0.25, 1.05, Math.PI * 0.6, Math.PI * 0.08, true);
        const geo = new THREE.ExtrudeGeometry(sh, { depth: 0.07, bevelEnabled: false }); geo.translate(-1.05, 1.8, -0.035);
        g.add(mesh(geo, blade, 0, 0, 0, 0.03));
        g.add(mesh(new THREE.SphereGeometry(0.15, 8, 6), acc, 0, 2.66));
        tip = 2.9;
        break;
      }
      case 'broom': {
        shaft(2.9, 0.08);
        const b = mesh(new THREE.ConeGeometry(0.42, 1.0, 12), tm(0xfcd34d), 0, -0.75); g.add(b);
        const band = mesh(new THREE.TorusGeometry(0.2, 0.06, 6, 14), acc, 0, -0.32, 0, 0); band.rotation.x = Math.PI / 2; g.add(band);
        g.rotation.z = Math.PI; g.position.y = 1.0;
        tip = 1.8;
        break;
      }
      case 'ladle': {
        shaft(2.6, 0.08, blade);
        const bowl = mesh(new THREE.SphereGeometry(0.48, 14, 10, 0, Math.PI * 2, 0, Math.PI / 2), acc, 0, 2.2); bowl.rotation.x = Math.PI * 0.6; g.add(bowl);
        tip = 2.4;
        break;
      }
      case 'pan': {
        shaft(1.6, 0.1, grip);
        const disc = mesh(new THREE.CylinderGeometry(0.85, 0.7, 0.22, 18), tm(0x334155), 0, 1.75); disc.rotation.x = Math.PI / 2; g.add(disc);
        const rim = mesh(new THREE.TorusGeometry(0.85, 0.06, 6, 22), acc, 0, 1.75, 0.1, 0); g.add(rim);
        tip = 2.5;
        break;
      }
      case 'umbrella': {
        shaft(3.0, 0.07);
        g.add(mesh(new THREE.ConeGeometry(1.1, 0.75, 10, 1, true), new THREE.MeshToonMaterial({ color: P.acc, side: THREE.DoubleSide }), 0, 2.4, 0, 0));
        const hook = mesh(new THREE.TorusGeometry(0.2, 0.05, 6, 12, Math.PI), grip, 0.2, -0.65, 0, 0); hook.rotation.z = Math.PI; g.add(hook);
        tip = 2.8;
        break;
      }
      case 'boomerang': {
        const b1 = mesh(new THREE.BoxGeometry(0.28, 1.6, 0.12), blade, -0.3, 0.9, 0); b1.rotation.z = 0.5; g.add(b1);
        const b2 = mesh(new THREE.BoxGeometry(0.28, 1.6, 0.12), acc, 0.3, 0.9, 0); b2.rotation.z = -0.5; g.add(b2);
        tip = 1.7;
        break;
      }
    }
    g.userData.tip = tip;
    return g;
  }
  function makeWeaponModel(shape, grade, enh) {
    const P = PAL[grade] || PAL.C;
    const root = new THREE.Group();
    const head = buildWeaponHead(shape === 'dual' ? 'sword' : shape, P);
    root.add(head);
    const tip = head.userData.tip;
    const lv = (grade === 'S' ? 3 : grade === 'A' ? 2 : grade === 'B' ? 1 : 0) + Math.floor((enh || 0) / 4);
    if (lv >= 1) {
      const gl = glowSprite(P.glow, 1.2 + lv * 0.45, Math.min(0.95, 0.35 + lv * 0.15));
      gl.position.y = tip * 0.72; root.add(gl); root.userData.glow = gl;
    }
    if (lv >= 3) { // S급(또는 고강화): 무기 주위를 도는 반짝이
      const sp = [];
      for (let i = 0; i < 4 + Math.min(4, lv - 3) * 2; i++) {
        const s = glowSprite(i % 2 ? 0xffffff : P.glow, 0.32, 0.95);
        s.userData.ph = i / (4 + Math.min(4, lv - 3) * 2); root.add(s); sp.push(s);
      }
      root.userData.sparks = sp; root.userData.tip = tip;
    }
    root.userData.gearAnim = t => {
      if (root.userData.glow) { const k = 1 + Math.sin(t * 4) * 0.12; root.userData.glow.material.opacity = Math.min(1, (0.35 + lv * 0.15) * k); }
      if (head.userData.spin) { head.userData.spin.rotation.y = t * 2.2; head.userData.ring.rotation.x = Math.PI / 2 + Math.sin(t * 1.5) * 0.3; }
      (root.userData.sparks || []).forEach(s => {
        const a = (s.userData.ph + t * 0.35) % 1;
        s.position.set(Math.cos(a * Math.PI * 6) * 0.45, a * tip * 1.05 - 0.3, Math.sin(a * Math.PI * 6) * 0.45);
        s.material.opacity = Math.sin(a * Math.PI);
      });
    };
    return root;
  }

  function makeArmorParts(style, grade) {
    const P = PAL[grade] || PAL.C;
    const g = new THREE.Group();
    const main = tm(P.acc), trim = tm(grade === 'C' ? 0x78716c : P.blade), gem = basic(grade === 'C' ? 0x64748b : P.glow);
    const plate = style === 'plate' || grade === 'S';
    // 허리 벨트 + 버클 (모든 방어구)
    const belt = mesh(new THREE.TorusGeometry(0.98, 0.09, 6, 26), style === 'light' && grade === 'C' ? tm(0x8b5a2b) : main, 0, 1.08, 0, 0.03);
    belt.rotation.x = Math.PI / 2; belt.scale.y = 0.42; g.add(belt);
    const buckle = mesh(new THREE.BoxGeometry(0.34, 0.26, 0.1), trim, 0, 1.08, 0.44, 0.03); g.add(buckle);
    g.add(mesh(new THREE.OctahedronGeometry(0.09, 0), gem, 0, 1.08, 0.51, 0));
    // 어깨 보호대
    if (plate || grade !== 'C') {
      [-1, 1].forEach(s => {
        const pad = mesh(new THREE.SphereGeometry(plate ? 0.5 : 0.36, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2), main, s * 1.22, 1.98, 0.05, 0.04);
        pad.scale.set(1.05, 0.7, 0.9); pad.rotation.z = -s * 0.45; g.add(pad);
        if (plate) {
          const rim = mesh(new THREE.TorusGeometry(0.5, 0.05, 6, 18), trim, s * 1.22, 1.98, 0.05, 0);
          rim.rotation.x = Math.PI / 2; rim.rotation.y = -s * 0.45; rim.scale.set(1.05, 0.9, 1); g.add(rim);
        }
        if (grade === 'S' || grade === 'A') g.add(mesh(new THREE.ConeGeometry(0.1, 0.38, 6), trim, s * 1.38, 2.32, 0.05, 0.02));
      });
    }
    // 망토 (망토/로브 계열, A·S 등급)
    if (style === 'cape' || grade === 'A' || grade === 'S') {
      const capeGeo = new THREE.CylinderGeometry(1.0, 1.55, 2.0, 16, 4, true, Math.PI * 0.62, Math.PI * 0.76);
      capeGeo.translate(0, -1.0, 0);
      const cape = mesh(capeGeo, new THREE.MeshToonMaterial({ color: P.acc, side: THREE.DoubleSide, gradientMap: typeof getToonGradientMap === 'function' ? getToonGradientMap() : null }), 0, 0, 0, 0.03);
      cape.position.set(0, 0, 0);
      const pivot = new THREE.Group(); pivot.position.set(0, 2.15, -0.2); pivot.add(cape); g.add(pivot); g.userData.cape = pivot;
      const edge = mesh(new THREE.TorusGeometry(1.0, 0.06, 6, 20, Math.PI * 0.76), trim, 0, 2.15, -0.2, 0);
      edge.rotation.x = Math.PI / 2; edge.rotation.z = Math.PI * 0.12 + Math.PI; g.add(edge);
    }
    // 발밑 등급 오라 (B 이상)
    if (grade !== 'C') {
      const ringMat = new THREE.MeshBasicMaterial({ color: P.acc, transparent: true, opacity: 0.6, depthWrite: false, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(new THREE.RingGeometry(1.25, 1.6, 36), ringMat);
      ring.rotation.x = -Math.PI / 2; ring.position.y = 0.2; ring.renderOrder = 2; g.add(ring); g.userData.ring = ring;
      if (grade === 'A' || grade === 'S') {
        const ring2 = new THREE.Mesh(new THREE.RingGeometry(1.7, 1.78, 6), ringMat.clone());
        ring2.rotation.x = -Math.PI / 2; ring2.position.y = 0.21; ring2.renderOrder = 2; g.add(ring2); g.userData.ring2 = ring2;
      }
      if (grade === 'S') {
        const motes = [];
        for (let i = 0; i < 8; i++) { const m = glowSprite(i % 2 ? 0xffffff : P.glow, 0.34, 0.9); m.userData.ph = i / 8; g.add(m); motes.push(m); }
        g.userData.motes = motes;
      }
    }
    g.userData.gearAnim = t => {
      if (g.userData.cape) g.userData.cape.rotation.x = 0.12 + Math.sin(t * 2.6) * 0.07;
      if (g.userData.ring) { g.userData.ring.material.opacity = 0.5 + Math.sin(t * 3) * 0.15; g.userData.ring.rotation.z = t * 0.4; }
      if (g.userData.ring2) g.userData.ring2.rotation.z = -t * 0.8;
      (g.userData.motes || []).forEach(m => {
        const a = (m.userData.ph + t * 0.25) % 1, ang = m.userData.ph * Math.PI * 2 + t * 0.6;
        m.position.set(Math.cos(ang) * 1.45, 0.1 + a * 3.2, Math.sin(ang) * 1.45);
        m.material.opacity = Math.sin(a * Math.PI) * 0.95;
      });
    };
    return g;
  }

  const gearAnimated = new Set();
  function disposeTree(o) {
    o.traverse(c => {
      if (c.geometry) c.geometry.dispose();
      if (c.material) (Array.isArray(c.material) ? c.material : [c.material]).forEach(m => { if (m.map && m.map === _glowTex) m.map = null; m.dispose(); });
    });
  }
  // 시각 키: 무기 "모양|등급|강화", 방어구 "스타일|등급"
  function gearKeys(s) {
    if (!s) return { wv: '', av: '' };
    const w = equippedGear(s, 'weapon'), a = equippedGear(s, 'armor');
    return {
      wv: w ? `${weaponShape(w.name)}|${w.grade}|${w.enh || 0}` : '',
      av: a ? `${armorStyle(a.name)}|${a.grade}` : ''
    };
  }
  const eqString = s => { const k = gearKeys(s); return `${(s && s.equippedAcc) || 'none'}~${k.wv}~${k.av}`; };
  function dressMesh(pm, wv, av) {
    if (!pm || !pm.userData || !pm.userData.parts) return;
    const ud = pm.userData, parts = ud.parts;
    const low = !!(window.gameApp && window.gameApp.lowPower);
    const hideOutlines = o => { if (low) o.traverse(c => { if (c.userData && c.userData.isOutline) c.visible = false; }); };
    if (ud._gearW !== wv) {
      ud._gearW = wv;
      const wm = parts.weaponMesh, la = parts.leftArmPivot;
      [ud._gearWObj, ud._gearWObj2].forEach(o => { if (o) { o.parent && o.parent.remove(o); gearAnimated.delete(o); disposeTree(o); } });
      ud._gearWObj = ud._gearWObj2 = null;
      if (wm) {
        // 기본 무기(첫 번째 자식 = 손)를 제외하고 숨김/복원
        wm.children.forEach((c, i) => {
          if (i === 0 || c.userData.gearPart) return;
          if (c.userData.defVis === undefined) c.userData.defVis = c.visible;
          c.visible = wv ? false : c.userData.defVis;
        });
        if (wv) {
          const [shape, grade, enh] = wv.split('|');
          const w = makeWeaponModel(shape, grade, +enh || 0);
          w.userData.gearPart = true; w.scale.setScalar(1.15); hideOutlines(w);
          wm.add(w); ud._gearWObj = w; gearAnimated.add(w);
          if (shape === 'dual' && la) {
            const w2 = makeWeaponModel('sword', grade, +enh || 0);
            w2.userData.gearPart = true; w2.position.set(-0.05, -0.2, 0.15); w2.rotation.set(Math.PI / 7, 0, 0.22); w2.scale.setScalar(0.9);
            hideOutlines(w2); la.add(w2); ud._gearWObj2 = w2; gearAnimated.add(w2);
          }
        }
      }
    }
    if (ud._gearA !== av) {
      ud._gearA = av;
      const o = ud._gearAObj;
      if (o) { o.parent && o.parent.remove(o); gearAnimated.delete(o); if (o.userData.cleanup) o.userData.cleanup(); disposeTree(o); }
      ud._gearAObj = null;
      if (av && parts.standeeGroup) {
        const [style, grade] = av.split('|');
        const a = makeArmorParts(style, grade);
        hideOutlines(a);
        // 발밑 오라는 몸이 기울어도 땅에 붙도록 루트에, 나머지는 몸(standee)에
        const ground = new THREE.Group();
        ['ring', 'ring2'].forEach(k => { if (a.userData[k]) ground.add(a.userData[k]); });
        (a.userData.motes || []).forEach(m => ground.add(m));
        parts.standeeGroup.add(a); pm.add(ground);
        a.userData.ground = ground;
        ud._gearAObj = a; gearAnimated.add(a);
        a.userData.cleanup = () => { ground.parent && ground.parent.remove(ground); disposeTree(ground); };
      }
    }
  }
  function updateGearAnim(t) {
    gearAnimated.forEach(o => {
      let p = o, inScene = false;
      while (p) { if (p.isScene) { inScene = true; break; } p = p.parent; }
      if (!o.parent) { gearAnimated.delete(o); return; }
      if (!inScene) { o.userData._off = (o.userData._off || 0) + 1; if (o.userData._off > 900) gearAnimated.delete(o); return; }
      o.userData._off = 0;
      if (o.userData.gearAnim) o.userData.gearAnim(t);
    });
  }
  function dressRemote(mesh, eq) {
    if (!mesh || typeof eq !== 'string') return;
    const [acc, wv, av] = eq.split('~');
    if (mesh.userData._gearAcc !== acc && mesh.userData.equipAcc) { mesh.userData._gearAcc = acc; mesh.userData.equipAcc(acc || 'none'); }
    dressMesh(mesh, wv || '', av || '');
  }

  // ------------------------------------------------------------------
  // 연결
  // ------------------------------------------------------------------
  function install() {
    // 머리 장식 모델 확장
    if (typeof window.createHatAccessory3D === 'function') {
      const orig = window.createHatAccessory3D;
      window.createHatAccessory3D = function (t) { return orig(t) || makeHat(t); };
    }
    window.createAccessory3D = makeAcc;
    // 기존 상점 함수 교체
    window.renderCostumeShop = render;
    window.buyHpPotion = buyPotion;
    window.upgradeSasumataWeapon = weaponUp;
    // 스테이지 클리어 보상: 1단계 1,000 → 20단계 30,000
    if (typeof STAGE_CAMPAIGN_DATA !== 'undefined') STAGE_CAMPAIGN_DATA.forEach(st => { st.rewardCoin = ECON.stageReward(st.stageNum); });
    // 예전 모자 카탈로그 가격도 맞춤 (혹시 예전 화면이 열려도 같은 가격)
    if (typeof HAT_CATALOG !== 'undefined') HAT_CATALOG.forEach(h => { const c = COSMETICS.find(x => x.id === h.id); if (c) h.price = c.price; });
    if (typeof Chiikawa3DWorldApp === 'undefined') return;
    const P = Chiikawa3DWorldApp.prototype;
    // 코인·경험치 보너스 (꾸미기 효과)
    const origReward = P.addReward;
    P.addReward = function (coins, exp, source, key) {
      const t = totals(this.stats);
      return origReward.call(this, Math.round(coins * (1 + t.coin / 100)), Math.round(exp * (1 + t.exp / 100)), source, key);
    };
    // 재화 던전 보상
    const origDungeon = P.startSpecialDungeon;
    if (origDungeon) {
      P.startSpecialDungeon = function (type, tier, opts) {
        const r = origDungeon.call(this, type, tier, opts);
        if (this.battleState && this.battleState.active && this.battleState.mode === 'dungeon') {
          const i = Math.max(0, Math.min(2, (tier || 1) - 1));
          this.battleState.rewardCoin = type === 'gold' ? ECON.dungeonGold[i] : ECON.dungeonExp[i];
        }
        return r;
      };
    }
    // 세이브 불러오기·캐릭터 교체 후 장비 효과 다시 적용
    ['applyStats', 'spawnPlayer', 'startGameWithSelectedChar'].forEach(fn => {
      const o = P[fn];
      if (!o) return;
      P[fn] = function () { const r = o.apply(this, arguments); try { apply(this); } catch (e) { console.warn('SHOPHQ', e); } return r; };
    });
    // 날개 퍼덕임·풍선 흔들림
    const origFx = P.updateEffects;
    P.updateEffects = function (dt) {
      const r = origFx.call(this, dt);
      try { updateGearAnim(this.clock ? this.clock.elapsedTime : performance.now() / 1000); } catch (e) { /* 무시 */ }
      const pm = this.playerMesh;
      const acc = pm && pm.userData.accSlot && pm.userData.accSlot.children[0];
      if (acc) {
        const t = this.clock ? this.clock.elapsedTime : 0;
        if (acc.userData.flap) acc.children.forEach((w, i) => { w.rotation.y = (i ? 1 : -1) * (0.35 + Math.sin(t * 6) * 0.25); });
        if (acc.userData.bob) acc.userData.bob.position.y = 5.2 + Math.sin(t * 2) * 0.15;
      }
      return r;
    };
  }

  return { install, apply, dressRemote, eqString, gearKeys, weaponShape, armorStyle, NAMES, atkMult, totals, recomputeHp, render, pull, makeItem, COSMETICS, GRADE, ECON };
})();
SHOPHQ.install();
document.addEventListener('DOMContentLoaded', () => setTimeout(() => { if (window.gameApp) SHOPHQ.apply(window.gameApp); }, 0));

export { SHOPHQ };
// 전역(window)으로도 노출: HTML onclick, 다른 모듈의 런타임 참조, 디버그 콘솔용
expose({
  get ECON() { return ECON; },
  get SHOPHQ() { return SHOPHQ; }
});
