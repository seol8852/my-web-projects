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
      S: ['🌟 전설의 황금 사스마타', '🌌 은하수 성검', '🐉 태고의 대괴수 발톱'],
      A: ['🐲 용비늘 대검', '✨ 별빛 사스마타', '⚡ 폭풍의 창'],
      B: ['🗡️ 강철 사스마타', '🤺 은빛 레이피어', '🔱 푸른 삼지창'],
      C: ['🪵 낡은 나무 사스마타', '🔪 녹슨 철검', '🏏 초보자 몽둥이', '🌾 풀베기 낫']
    },
    armor: {
      S: ['🌠 전설의 별빛 갑옷', '🛡️ 태고의 수호 갑주'],
      A: ['🐲 용비늘 갑옷', '🏰 수호자의 판금'],
      B: ['⛓️ 은빛 사슬 갑옷', '🦺 강철 흉갑'],
      C: ['👕 천 조끼', '🧥 헌 망토', '🪖 나무 방패 갑옷']
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
    if (w) add({ atk: w.atk, crit: w.crit });
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
      ? `공격력 +${it.atk}%${it.crit ? ` · 치명타 +${it.crit}%` : ''}`
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
    s.coins += GRADE[it.grade].sell;
    apply(g); g.saveData(); soundFx.playCoin();
    showToast(`💰 [${it.name}] 판매 +${GRADE[it.grade].sell.toLocaleString()}🪙`);
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
        <button type="button" data-tab="etc">🧪 소모품·강화</button>
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
    });
  }
  function itemCard(it, s, actions = true) {
    const G = GRADE[it.grade];
    const on = it.uid === s.equipWeapon || it.uid === s.equipArmor;
    return `<div class="sh-item g${it.grade}${on ? ' on' : ''}" style="--gc:${G.color}">
      <div class="sh-grade" style="background:${G.bg}">${it.grade}</div>
      <div class="sh-iname">${esc(it.name)}</div>
      <div class="sh-islot">${it.slot === 'weapon' ? '⚔️ 무기' : '🛡️ 방어구'}</div>
      <div class="sh-ifx">${itemFx(it)}</div>
      ${actions ? `<div class="sh-iact">
        <button type="button" data-act="equip" data-id="${it.uid}" class="${on ? 'on' : ''}">${on ? '✅ 장착 중' : '장착'}</button>
        <button type="button" data-act="sell" data-id="${it.uid}" class="sell">판매 ${G.sell.toLocaleString()}</button>
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
        <div class="sh-row"><div><b>🔱 기본 사스마타 강화</b> <span class="sh-tag">+${wl}강</span><br><small>모든 공격의 기본 공격력이 올라가요 (최대 +10강)</small></div>
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
  // 연결
  // ------------------------------------------------------------------
  function install() {
    // 머리 장식 모델 확장
    if (typeof createHatAccessory3D === 'function') {
      const orig = createHatAccessory3D;
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

  return { install, apply, atkMult, totals, recomputeHp, render, pull, makeItem, COSMETICS, GRADE, ECON };
})();
SHOPHQ.install();
document.addEventListener('DOMContentLoaded', () => setTimeout(() => { if (window.gameApp) SHOPHQ.apply(window.gameApp); }, 0));
