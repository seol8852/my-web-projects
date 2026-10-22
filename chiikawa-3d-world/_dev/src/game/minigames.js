// ⚙️ ES 모듈 (자동 변환): 앞쪽 모듈은 import, 뒤쪽 모듈·덮어쓰기 되는 이름은 window.이름 으로 참조
import { soundFx } from '../core/sound.js';
import { CHAR_CONFIGS } from '../core/models3d.js';
import { expose } from '../core/expose.js';
// ==========================================================================
// 치이카와 3D 오픈월드 타운 - 미니게임, 코스튬 상점 & NPC 대화 시스템 (minigames.js)
// ==========================================================================

const RAMEN_INGREDIENTS = [
  { id: 'veggie', icon: '🥬', name: '야사이 마시(채소 듬뿍)' },
  { id: 'garlic', icon: '🧄', name: '닌니쿠(다진 마늘)' },
  { id: 'chashu', icon: '🥩', name: '두툼 차슈 추가' },
  { id: 'egg', icon: '🥚', name: '반숙 맛달걀' },
  { id: 'oil', icon: '✨', name: '아부라(등지방 고소하게)' },
  { id: 'spicy', icon: '🌶️', name: '카라메(매콤 간장소스)' }
];

const RAMEN_GUESTS = [
  {
    char: 'usagi',
    name: '우사기',
    img: 'assets/usagi.png',
    quote: '이얏하-!! 야사이 마시마시! 마늘 듬뿍! 차슈랑 등지방까지 싹 다 넣어줘! 우라!',
    required: ['veggie', 'garlic', 'chashu', 'oil']
  },
  {
    char: 'hachiware',
    name: '하치와레',
    img: 'assets/hachiware.png',
    quote: '음... 채소 듬뿍(야사이 마시)에 마늘 넣고, 반숙 맛달걀 하나 올려주세요!',
    required: ['veggie', 'garlic', 'egg']
  },
  {
    char: 'kurimanju',
    name: '쿠리만쥬',
    img: 'assets/kurimanju.png',
    quote: '크으-! 해장엔 역시 다진 마늘에 두툼 차슈, 그리고 매콤한 카라메 소스 추가지!',
    required: ['garlic', 'chashu', 'spicy']
  },
  {
    char: 'momonga',
    name: '모몽가',
    img: 'assets/momonga.png',
    quote: '어이! 이 몸에게 가장 맛있는 두툼 차슈와 반숙 달걀, 고소한 등지방을 바쳐라!',
    required: ['chashu', 'egg', 'oil']
  },
  {
    char: 'rakko',
    name: '랏코 사부',
    img: 'assets/rakko.png?v=3',
    quote: '전투 전 체력 보충이다. 채소 듬뿍, 두툼 차슈, 반숙 달걀을 정석으로 부탁한다.',
    required: ['veggie', 'chashu', 'egg']
  }
];

// 3D 머리 코스튬 카탈로그
const HAT_CATALOG = [
  { id: 'none', icon: '🐾', name: '기본 (장식 없음)', price: 0, desc: '순수하고 귀여운 기본 봉제인형 모습' },
  { id: 'flower', icon: '🌸', name: '봄날 벚꽃 화관', price: 80, desc: '파스텔 핑크빛 3D 꽃잎이 둥글게 수놓아진 화관' },
  { id: 'ribbon', icon: '🎀', name: '하치와레 왕리본', price: 120, desc: '정수리 위에서 통통 튀는 입체 핑크 리본' },
  { id: 'crown', icon: '👑', name: '제초왕 황금 왕관', price: 180, desc: '루비 보석이 박힌 3D 황금빛 미니 왕관' },
  { id: 'halo', icon: '⭐', name: '별빛 천사 헤일로', price: 240, desc: '은은하게 빛나는 천사 고리와 황금 별 장식' }
];

let currentRamenOrder = null;
let selectedRamenIngs = new Set();

// ==========================================================================
// 1. 갑옷씨의 라멘 '랑(郎)' 미니게임
// ==========================================================================
function openRamenMinigame() {
  soundFx.playCoin();
  const modal = document.getElementById('ramen-modal');
  if (!modal) return;
  modal.classList.add('open');
  nextRamenOrder();
}

function closeRamenMinigame() {
  const modal = document.getElementById('ramen-modal');
  if (modal) modal.classList.remove('open');
}

function nextRamenOrder() {
  selectedRamenIngs.clear();
  currentRamenOrder = RAMEN_GUESTS[Math.floor(Math.random() * RAMEN_GUESTS.length)];

  const guestImg = document.getElementById('ramen-guest-img');
  const guestName = document.getElementById('ramen-guest-name');
  const guestQuote = document.getElementById('ramen-guest-quote');
  const reqTags = document.getElementById('ramen-req-tags');

  if (guestImg) guestImg.src = currentRamenOrder.img;
  if (guestName) guestName.innerText = `${currentRamenOrder.name} 손님의 주문`;
  if (guestQuote) guestQuote.innerText = `"${currentRamenOrder.quote}"`;

  if (reqTags) {
    reqTags.innerHTML = currentRamenOrder.required.map(id => {
      const item = RAMEN_INGREDIENTS.find(i => i.id === id);
      return `<span style="background:#fef3c7; border:1px solid #f59e0b; padding:3px 8px; border-radius:8px; font-size:11.5px; font-weight:800; color:#b45309;">${item.icon} ${item.name}</span>`;
    }).join(' ');
  }

  renderRamenIngredients();
}

function renderRamenIngredients() {
  const grid = document.getElementById('ramen-ing-grid');
  if (!grid) return;

  grid.innerHTML = RAMEN_INGREDIENTS.map(ing => {
    const isSel = selectedRamenIngs.has(ing.id);
    return `
      <button type="button" class="ing-toggle-btn ${isSel ? 'selected' : ''}" onclick="toggleRamenIng('${ing.id}')">
        <span style="font-size:24px;">${ing.icon}</span>
        <span>${ing.name}</span>
      </button>
    `;
  }).join('');
}

function toggleRamenIng(id) {
  soundFx.playWeedPull();
  if (selectedRamenIngs.has(id)) {
    selectedRamenIngs.delete(id);
  } else {
    selectedRamenIngs.add(id);
  }
  renderRamenIngredients();
}

function submitRamenOrder() {
  if (!currentRamenOrder) return;
  const req = currentRamenOrder.required;
  const isMatch = req.length === selectedRamenIngs.size && req.every(id => selectedRamenIngs.has(id));

  if (isMatch) {
    soundFx.playFanfare();
    if (window.gameApp) {
      const paid = window.gameApp.addReward((typeof window.ECON !== 'undefined' ? window.ECON.ramen : 90), 50, 'ramen');
      window.gameApp.activateRamenBuff();
      showToast(paid ? `🍜 대성공! ${currentRamenOrder.name} 손님이 대만족했습니다! (+${(typeof window.ECON !== 'undefined' ? window.ECON.ramen : 90).toLocaleString()} 코인 & 활력 버프 발동!)` : `🍜 대성공! ${currentRamenOrder.name} 손님이 대만족! (오늘 장사 보상은 받았어요 · 활력 버프만 발동)`);
    }
    closeRamenMinigame();
  } else {
    soundFx.playAttack();
    showToast(`💦 어라? 주문한 토핑과 조금 달라요! 노란색 주문 태그를 다시 확인해보세요!`);
  }
}

// ==========================================================================
// 2. 제초 자격증 승급 시험 미니게임 (Speed Weeding Exam)
// ==========================================================================
let weedExamState = {
  active: false,
  score: 0,
  timeLeft: 20,
  timer: null,
  cells: []
};

function openWeedExamModal() {
  soundFx.playCoin();
  const modal = document.getElementById('weed-exam-modal');
  if (!modal) return;
  modal.classList.add('open');
  startWeedExam();
}

function closeWeedExamModal() {
  weedExamState.active = false;
  clearInterval(weedExamState.timer);
  const modal = document.getElementById('weed-exam-modal');
  if (modal) modal.classList.remove('open');
}

function startWeedExam() {
  weedExamState.active = true;
  weedExamState.score = 0;
  weedExamState.timeLeft = 20;
  weedExamState.cells = Array.from({ length: 12 }, () => randomWeedCellType());

  updateWeedExamUI();
  renderWeedExamGrid();

  clearInterval(weedExamState.timer);
  weedExamState.timer = setInterval(() => {
    if (!weedExamState.active) return;
    weedExamState.timeLeft--;

    weedExamState.cells = weedExamState.cells.map(c => (c === 'danger' && Math.random() < 0.45 ? 'normal' : c));
    renderWeedExamGrid();
    updateWeedExamUI();

    if (weedExamState.timeLeft <= 0) {
      finishWeedExam();
    }
  }, 1000);
}

function randomWeedCellType() {
  const r = Math.random();
  if (r < 0.22) return 'golden';
  if (r < 0.36) return 'danger';
  return 'normal';
}

function renderWeedExamGrid() {
  const grid = document.getElementById('weed-exam-grid');
  if (!grid) return;

  grid.innerHTML = weedExamState.cells.map((type, idx) => {
    let icon = '🌿';
    let label = '잡초 (+10)';
    if (type === 'golden') {
      icon = '✨🍀';
      label = '황금초 (+25)';
    } else if (type === 'danger') {
      icon = '🥀💣';
      label = '가시독초 (-15)';
    }
    return `
      <button type="button" class="weed-cell-btn ${type}" onclick="clickWeedExamCell(${idx})">
        <div>${icon}</div>
        <span style="font-size:10.5px; font-weight:800; color:#475569; margin-top:3px;">${label}</span>
      </button>
    `;
  }).join('');
}

function clickWeedExamCell(idx) {
  if (!weedExamState.active) return;
  const type = weedExamState.cells[idx];

  if (type === 'normal') {
    weedExamState.score += 10;
    soundFx.playWeedPull();
  } else if (type === 'golden') {
    weedExamState.score += 25;
    soundFx.playCoin();
  } else if (type === 'danger') {
    weedExamState.score = Math.max(0, weedExamState.score - 15);
    soundFx.playAttack();
  }

  weedExamState.cells[idx] = randomWeedCellType();
  updateWeedExamUI();
  renderWeedExamGrid();
}

function updateWeedExamUI() {
  const scoreEl = document.getElementById('weed-exam-score');
  const timeEl = document.getElementById('weed-exam-time');
  if (scoreEl) scoreEl.innerText = `${weedExamState.score}점`;
  if (timeEl) timeEl.innerText = `${weedExamState.timeLeft}초`;
}

function finishWeedExam() {
  weedExamState.active = false;
  clearInterval(weedExamState.timer);
  if (window.gameApp && window.gameApp.stats) {
    window.gameApp.stats.lastWeedExamAt = Date.now();
  }

  const s = weedExamState.score;
  if (s >= 120) {
    soundFx.playFanfare();
    if (window.gameApp) {
      window.gameApp.promoteWeedingCert(s);
    }
  } else {
    soundFx.playAttack();
    showToast(`🌱 아깝다! ${s}점 기록! (120점 이상 달성 시 상위 제초 급수로 승급합니다!)`);
  }
  closeWeedExamModal();
}

// ==========================================================================
// 3. 🛍️ 갑옷씨의 포쉐트 3D 코스튬 & 사스마타 강화 상점
// ==========================================================================
function openCostumeShopModal() {
  soundFx.playCoin();
  const modal = document.getElementById('shop-modal');
  if (!modal) return;
  modal.classList.add('open');
  renderCostumeShop();
}

function closeCostumeShopModal() {
  const modal = document.getElementById('shop-modal');
  if (modal) modal.classList.remove('open');
}

function renderCostumeShop() {
  if (!window.gameApp) return;
  const stats = window.gameApp.stats;

  const coinEl = document.getElementById('shop-coin-display');
  if (coinEl) coinEl.innerText = `${stats.coins.toLocaleString()} 🪙`;

  // 1) 무기 강화 카드 렌더링
  const weaponBox = document.getElementById('shop-weapon-box');
  if (weaponBox) {
    const nextCost = stats.weaponLv * 75;
    const isMax = stats.weaponLv >= 10;
    weaponBox.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div>
          <div style="font-size:15px; font-weight:900; color:#1e293b;">
            🔱 사스마타 & 전용 무기 강화 <span style="color:#e11d48;">+${stats.weaponLv}강</span>
          </div>
          <div style="font-size:12px; color:#64748b; margin-top:3px;">
            강화할수록 평타 공격력(+8)과 필살기 피해량(+14)이 대폭 증가합니다!
          </div>
        </div>
        <button type="button" class="shop-buy-btn" ${isMax ? 'disabled' : ''} onclick="upgradeSasumataWeapon()">
          ${isMax ? '👑 최고 단계 도달' : `🔨 +${stats.weaponLv + 1}강 업그레이드 (${nextCost}🪙)`}
        </button>
      </div>
    `;
  }

  // 1-2) HP 물약 (최대 5개)
  const potionBox = document.getElementById('shop-potion-box');
  if (potionBox) {
    const n = Math.max(0, Math.min(5, stats.potions | 0));
    const full = n >= 5;
    potionBox.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px; flex-wrap:wrap;">
        <div>
          <div style="font-size:15px; font-weight:900; color:#1e293b;">
            🧪 HP 물약 <span style="color:#16a34a;">${n} / 5개</span>
          </div>
          <div style="font-size:12px; color:#64748b; margin-top:3px;">
            [R]키로 사용 · 최대 체력의 50% 즉시 회복! 레이드에 최대 5개까지 들고 갈 수 있어요.
          </div>
        </div>
        <button type="button" class="shop-buy-btn" ${full ? 'disabled' : ''} onclick="buyHpPotion()">
          ${full ? '🎒 가방이 가득 찼어요' : `🧪 1개 구매 (${POTION_PRICE}🪙)`}
        </button>
      </div>
    `;
  }

  // 2) 3D 머리 코스튬 그리드 렌더링
  const hatGrid = document.getElementById('shop-hat-grid');
  if (hatGrid) {
    hatGrid.innerHTML = HAT_CATALOG.map(hat => {
      const unlocked = stats.unlockedHats.includes(hat.id);
      const equipped = stats.equippedHat === hat.id;

      let btnLabel = `${hat.price} 🪙 구매`;
      let btnClass = 'shop-hat-btn';
      if (equipped) {
        btnLabel = '✨ 장착 중';
        btnClass += ' equipped';
      } else if (unlocked) {
        btnLabel = '착용하기';
        btnClass += ' unlocked';
      }

      return `
        <div class="shop-hat-card ${equipped ? 'active' : ''}">
          <div style="font-size:28px;">${hat.icon}</div>
          <div style="font-size:13.5px; font-weight:900; color:#1e293b; margin-top:4px;">${hat.name}</div>
          <div style="font-size:11px; color:#64748b; margin:4px 0 10px; line-height:1.35;">${hat.desc}</div>
          <button type="button" class="${btnClass}" onclick="buyOrEquipHat('${hat.id}')">
            ${btnLabel}
          </button>
        </div>
      `;
    }).join('');
  }
}

const POTION_PRICE = 120;
function buyHpPotion() {
  if (!window.gameApp) return;
  const stats = window.gameApp.stats;
  stats.potions = Math.max(0, Math.min(5, stats.potions | 0));
  if (stats.potions >= 5) {
    showToast('🎒 HP 물약은 최대 5개까지만 들고 다닐 수 있어요!');
    return;
  }
  if (stats.coins < POTION_PRICE) {
    soundFx.playAttack();
    showToast(`🪙 코인이 부족합니다! (필요: ${POTION_PRICE} 코인)`);
    return;
  }
  stats.coins -= POTION_PRICE;
  stats.potions++;
  soundFx.playCoin();
  window.gameApp.saveData();
  window.gameApp.updateHud();
  renderCostumeShop();
  showToast(`🧪 HP 물약 구매! (보유 ${stats.potions}/5개 · [R]키로 사용)`);
}

function upgradeSasumataWeapon() {
  if (!window.gameApp) return;
  const stats = window.gameApp.stats;
  if (stats.weaponLv >= 10) return;

  const cost = stats.weaponLv * 75;
  if (stats.coins < cost) {
    soundFx.playAttack();
    showToast(`🪙 코인이 부족합니다! (필요: ${cost} 코인 / 풀뽑기·라멘 알바·토벌로 코인을 모아보세요)`);
    return;
  }

  stats.coins -= cost;
  stats.weaponLv++;
  soundFx.playFanfare();
  window.gameApp.saveData();
  window.gameApp.updateHud();
  renderCostumeShop();
  showToast(`🔱 대성공! 사스마타 무기가 [+${stats.weaponLv}강]으로 강화되어 공격력이 크게 상승했습니다!`);
}

function buyOrEquipHat(hatId) {
  if (!window.gameApp) return;
  const stats = window.gameApp.stats;
  const item = HAT_CATALOG.find(h => h.id === hatId);
  if (!item) return;

  if (!stats.unlockedHats.includes(hatId)) {
    if (stats.coins < item.price) {
      soundFx.playAttack();
      showToast(`🪙 코인이 부족합니다! (${item.price} 코인 필요)`);
      return;
    }
    stats.coins -= item.price;
    stats.unlockedHats.push(hatId);
    soundFx.playFanfare();
    showToast(`🎉 [${item.name}] 3D 코스튬을 구매하여 머리 위에 장착했습니다!`);
  } else {
    soundFx.playCoin();
    showToast(`🎀 [${item.name}] 코스튬으로 갈아입었습니다!`);
  }

  window.gameApp.equipPlayerHat(hatId);
  renderCostumeShop();
}

// ==========================================================================
// 4. NPC 대화 시스템
// ==========================================================================
function openNpcDialog(npcData) {
  soundFx.playWeedPull();
  const modal = document.getElementById('npc-dialog-modal');
  if (!modal) return;

  const cfg = CHAR_CONFIGS[npcData.charKey] || CHAR_CONFIGS.chiikawa;
  document.getElementById('dialog-portrait-img').src = cfg.portrait;
  document.getElementById('dialog-speaker-name').innerText = cfg.name;
  document.getElementById('dialog-speaker-role').innerText = cfg.title;
  document.getElementById('dialog-text-body').innerText =
    cfg.quotes[Math.floor(Math.random() * cfg.quotes.length)];

  window.__npcDialogKey = npcData.charKey || 'npc';
  modal.classList.add('open');
}

function closeNpcDialog(actionType) {
  const modal = document.getElementById('npc-dialog-modal');
  if (modal) modal.classList.remove('open');

  if (actionType === 'party' && window.gameApp) {
    window.gameApp.togglePartyFollow();
  } else if (actionType === 'gift' && window.gameApp) {
    // 친구마다 하루 1번만 응원 보너스
    if (window.gameApp.addReward((typeof window.ECON !== 'undefined' ? window.ECON.talk : 35), 25, 'talk', 'talk:' + (window.__npcDialogKey || 'npc'))) {
      soundFx.playCoin();
      showToast(`💖 친구와 즐겁게 대화를 나누며 응원 보너스 (+${(typeof window.ECON !== 'undefined' ? window.ECON.talk : 35).toLocaleString()} 코인)를 받았습니다!`);
    }
  }
}

// 토스트 알림 헬퍼
function showToast(msg) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'game-toast';
  toast.innerText = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// ==========================================================================
// 5. ⚔️ 20단계 전진 돌파형 토벌 대장정 데이터 (5구역 릴레이 웨이브, 판당 약 2분 소요!)
//    - 5·15단계: 중간보스 / 10·20단계: 대보스
// ==========================================================================
const STAGE_CAMPAIGN_DATA = Array.from({ length: 20 }, (_, i) => {
  const num = i + 1;
  const isMainBoss = num === 10 || num === 20;
  const isMidBoss = num === 5 || num === 15;

  let role = 'normal';
  let badge = '전진 토벌';
  if (isMidBoss) {
    role = 'midboss';
    badge = '★ 중간보스';
  } else if (isMainBoss) {
    role = 'mainboss';
    badge = num === 10 ? '👑 10단계 보스' : '👑 20단계 최종보스';
  }

  const zoneNames = [
    '들판 외곽 진격로', '독버섯 군락 돌파구', '강풍의 협곡 가도', '안개 낀 전선 돌파', '강철 뿔 대장 요새',
    '키메라 협곡 강행군', '바위산 포위망 돌파', '붉은 억새 대평원', '폭풍의 성벽 가도', '각성 아노코의 신전',
    '고대 유적 진격로', '무너진 석조 회랑', '심연의 제단 돌파', '강철 파수꾼 방어선', '중장갑 대키메라 성채',
    '태고의 신전 진입로', '별빛 결계 대회랑', '심연의 중심 가도', '최후의 성소 방어선', '태고의 대괴수 결전장'
  ];
  const title = zoneNames[num - 1] || `토벌 대장정 ${num}구역`;

  let bossName = '';
  if (num === 5) bossName = '★중간보스: 강철 뿔 대장 풍뎅이';
  else if (num === 10) bossName = '👑10단계 보스: 숲의 지배자 각성 아노코';
  else if (num === 15) bossName = '★중간보스: 심연의 중장갑 대키메라';
  else if (num === 20) bossName = '👑최종보스: 태고의 대괴수 아노코 렉스';

  // 스테이지별 기본 몬스터 풀 및 강도 스케일링 (1판 클리어 약 2분 소요되도록 체력·물량 대폭 상향!)
  const pool = num <= 4
    ? ['bug', 'goblin', 'chimera']
    : num <= 9
      ? ['goblin', 'chimera', 'iron_chimera']
      : num <= 14
        ? ['chimera', 'iron_chimera', 'goblin', 'midboss']
        : ['iron_chimera', 'midboss', 'chimera', 'goblin'];

  const typeNames = {
    bug: `Lv.${num * 2} 맹독 돌격 벌레`,
    goblin: `Lv.${num * 2} 정예 저격 고블린`,
    chimera: `Lv.${num * 2} 포악한 광전사 키메라`,
    iron_chimera: `Lv.${num * 2} 🛡️중장갑 철벽 괴수`,
    midboss: `Lv.${num * 2} 🛡️거대 가시 뿔괴수`
  };

  const makeMob = (mType, waveIdx, mobIdx, hpMult = 1.0, atkMult = 1.0, customName = null, scale = 1.0, isBoss = false) => {
    const baseHp = Math.round((210 + num * 95 + waveIdx * 28 + mobIdx * 12) * hpMult);
    const baseAtk = Math.round((14 + num * 2.8 + waveIdx * 1.2) * atkMult);
    return {
      type: mType,
      name: customName || typeNames[mType] || `Lv.${num * 2} 심연의 괴수`,
      isBoss,
      hp: baseHp,
      atk: baseAtk,
      coin: Math.round((18 + num * 5) * (isBoss ? 6 : 1)),
      exp: Math.round((22 + num * 6) * (isBoss ? 6 : 1)),
      scale,
      atkPattern: mType === 'goblin' ? 'line' : (mType === 'midboss' || mType === 'anoko') ? 'circle' : 'sector',
      reach: mType === 'goblin' ? 12.0 : (isBoss ? 7.8 : 5.0)
    };
  };

  // 총 5개 전진 구역(Sector 1 ~ Sector 5) 구성!
  // 각 구역마다 초기 부대 + 쉴 새 없이 몰려오는 증원 웨이브(총 2~3웨이브) 배치!
  const sectorLocalZs = [-18, -62, -108, -154, -200];
  const barrierLocalZs = [-36, -80, -126, -172, -226];
  const sectors = [];
  let totalMonsters = 0;

  for (let sIdx = 0; sIdx < 5; sIdx++) {
    const waves = [];
    // 구역당 기본 2웨이브 (후반 구역 및 상위 스테이지는 3웨이브!)
    const waveCount = (sIdx >= 2 || num >= 6) ? 3 : 2;
    const baseMobPerWave = 3 + Math.floor(num / 5) + (sIdx >= 3 ? 1 : 0);

    for (let wIdx = 0; wIdx < waveCount; wIdx++) {
      const waveMobs = [];

      // 마지막 제 5구역(최심부 성소) 첫 웨이브에 보스 또는 수문장 등장!
      if (sIdx === 4 && wIdx === 0) {
        if (num === 5) {
          waveMobs.push(makeMob('midboss', 6, 0, 6.2, 1.45, bossName, 1.38, true));
        } else if (num === 10) {
          waveMobs.push(makeMob('anoko', 8, 0, 8.5, 1.65, bossName, 1.35, true));
        } else if (num === 15) {
          waveMobs.push(makeMob('iron_chimera', 10, 0, 9.8, 1.75, bossName, 1.45, true));
        } else if (num === 20) {
          waveMobs.push(makeMob('anoko', 12, 0, 12.5, 1.95, bossName, 1.55, true));
        } else {
          // 일반 스테이지도 제 5구역에는 거대 수문장 대장 괴수 등장!
          const leaderType = num >= 11 ? 'iron_chimera' : num >= 6 ? 'midboss' : 'chimera';
          const leaderName = `⚔️ [제 ${num}구역 수문장] 정예 대장 괴수`;
          waveMobs.push(makeMob(leaderType, 5, 0, 3.8, 1.35, leaderName, 1.26, true));
          if (!bossName) bossName = leaderName;
        }
      }

      for (let m = 0; m < baseMobPerWave; m++) {
        const mType = pool[(sIdx * 3 + wIdx * 2 + m) % pool.length];
        waveMobs.push(makeMob(mType, sIdx * 2 + wIdx, m, 1.0, 1.0));
      }

      totalMonsters += waveMobs.length;
      waves.push(waveMobs);
    }

    sectors.push({
      sectorNum: sIdx + 1,
      localZ: sectorLocalZs[sIdx],
      barrierLocalZ: barrierLocalZs[sIdx],
      waves
    });
  }

  const rewardCoin = isMainBoss
    ? num * 220
    : isMidBoss
      ? num * 150
      : 180 + num * 85;
  const rewardExp = isMainBoss
    ? num * 190
    : isMidBoss
      ? num * 135
      : 150 + num * 75;

  return {
    stageNum: num,
    role,
    badge,
    title,
    bossName,
    recLv: Math.max(1, Math.ceil(num * 1.1)),
    rewardCoin,
    rewardExp,
    totalMonsters,
    sectors
  };
});

function openStageSelectModal() {
  if (window.gameApp) window.gameApp.clearAllInputKeys();
  soundFx.playCoin();
  const modal = document.getElementById('stage-select-modal');
  if (!modal) return;
  modal.classList.add('open');
  renderStageSelectModal();
}

function closeStageSelectModal() {
  const modal = document.getElementById('stage-select-modal');
  if (modal) modal.classList.remove('open');
}

function closeStageResultModal() {
  const modal = document.getElementById('stage-result-modal');
  if (modal) modal.classList.remove('open');
}

function renderStageSelectModal() {
  if (!window.gameApp) return;
  const maxUnlocked = window.gameApp.stats.maxUnlockedStage || 1;
  const clearedMax = window.gameApp.stats.highestClearedStage || 0;

  const badgeEl = document.getElementById('stage-progress-badge');
  if (badgeEl) {
    badgeEl.innerText = `🏆 최고 클리어: ${clearedMax} / 20 단계 (현재 ${maxUnlocked}단계 개방)`;
  }

  const grid = document.getElementById('stage-campaign-grid');
  if (!grid) return;

  grid.innerHTML = STAGE_CAMPAIGN_DATA.map(st => {
    const isUnlocked = st.stageNum <= maxUnlocked;
    const isCleared = st.stageNum <= clearedMax;

    let cardClass = 'stage-card';
    if (st.role === 'midboss') cardClass += ' midboss';
    if (st.role === 'mainboss') cardClass += ' mainboss';
    if (isCleared) cardClass += ' cleared';
    if (!isUnlocked) cardClass += ' locked';

    let tagClass = 'stage-type-tag tag-normal';
    if (st.role === 'midboss') tagClass = 'stage-type-tag tag-midboss';
    if (st.role === 'mainboss') tagClass = 'stage-type-tag tag-mainboss';

    const actionTxt = !isUnlocked
      ? `🔒 ${st.stageNum - 1}단계 클리어 필요`
      : isCleared
        ? `✅ 클리어 (재도전)`
        : `🔥 ${st.stageNum}단계 진격!`;

    return `
      <div class="${cardClass}" onclick="${isUnlocked ? `gameApp.startBattleStage(${st.stageNum})` : `showToast('🔒 이전 단계인 ${st.stageNum - 1}단계를 먼저 클리어해주세요!')`}">
        <div class="stage-num-row">
          <span>STAGE ${st.stageNum}</span>
          <span class="${tagClass}">${st.badge}</span>
        </div>
        <div class="stage-card-title">${st.title}</div>
        <div style="font-size:11px; color:#64748b; font-weight:700;">
          권장 Lv.${st.recLv}+ · 5구역 진격 (적 ${st.totalMonsters}마리)
        </div>
        <div class="stage-card-reward">
          보상: +${st.rewardCoin.toLocaleString()}🪙 / +${st.rewardExp.toLocaleString()} EXP
        </div>
        <div class="stage-card-action">${actionTxt}</div>
      </div>
    `;
  }).join('');
}

export { HAT_CATALOG, STAGE_CAMPAIGN_DATA, closeStageResultModal, closeStageSelectModal, openCostumeShopModal, openNpcDialog, openRamenMinigame, openStageSelectModal, openWeedExamModal, showToast };
// 전역(window)으로도 노출: HTML onclick, 다른 모듈의 런타임 참조, 디버그 콘솔용
expose({
  get RAMEN_INGREDIENTS() { return RAMEN_INGREDIENTS; },
  get RAMEN_GUESTS() { return RAMEN_GUESTS; },
  get HAT_CATALOG() { return HAT_CATALOG; },
  get currentRamenOrder() { return currentRamenOrder; }, set currentRamenOrder(v) { currentRamenOrder = v; },
  get selectedRamenIngs() { return selectedRamenIngs; }, set selectedRamenIngs(v) { selectedRamenIngs = v; },
  get openRamenMinigame() { return openRamenMinigame; }, set openRamenMinigame(v) { openRamenMinigame = v; },
  get closeRamenMinigame() { return closeRamenMinigame; }, set closeRamenMinigame(v) { closeRamenMinigame = v; },
  get nextRamenOrder() { return nextRamenOrder; }, set nextRamenOrder(v) { nextRamenOrder = v; },
  get renderRamenIngredients() { return renderRamenIngredients; }, set renderRamenIngredients(v) { renderRamenIngredients = v; },
  get toggleRamenIng() { return toggleRamenIng; }, set toggleRamenIng(v) { toggleRamenIng = v; },
  get submitRamenOrder() { return submitRamenOrder; }, set submitRamenOrder(v) { submitRamenOrder = v; },
  get weedExamState() { return weedExamState; }, set weedExamState(v) { weedExamState = v; },
  get openWeedExamModal() { return openWeedExamModal; }, set openWeedExamModal(v) { openWeedExamModal = v; },
  get closeWeedExamModal() { return closeWeedExamModal; }, set closeWeedExamModal(v) { closeWeedExamModal = v; },
  get startWeedExam() { return startWeedExam; }, set startWeedExam(v) { startWeedExam = v; },
  get randomWeedCellType() { return randomWeedCellType; }, set randomWeedCellType(v) { randomWeedCellType = v; },
  get renderWeedExamGrid() { return renderWeedExamGrid; }, set renderWeedExamGrid(v) { renderWeedExamGrid = v; },
  get clickWeedExamCell() { return clickWeedExamCell; }, set clickWeedExamCell(v) { clickWeedExamCell = v; },
  get updateWeedExamUI() { return updateWeedExamUI; }, set updateWeedExamUI(v) { updateWeedExamUI = v; },
  get finishWeedExam() { return finishWeedExam; }, set finishWeedExam(v) { finishWeedExam = v; },
  get openCostumeShopModal() { return openCostumeShopModal; }, set openCostumeShopModal(v) { openCostumeShopModal = v; },
  get closeCostumeShopModal() { return closeCostumeShopModal; }, set closeCostumeShopModal(v) { closeCostumeShopModal = v; },
  get renderCostumeShop() { return renderCostumeShop; }, set renderCostumeShop(v) { renderCostumeShop = v; },
  get POTION_PRICE() { return POTION_PRICE; },
  get buyHpPotion() { return buyHpPotion; }, set buyHpPotion(v) { buyHpPotion = v; },
  get upgradeSasumataWeapon() { return upgradeSasumataWeapon; }, set upgradeSasumataWeapon(v) { upgradeSasumataWeapon = v; },
  get buyOrEquipHat() { return buyOrEquipHat; }, set buyOrEquipHat(v) { buyOrEquipHat = v; },
  get openNpcDialog() { return openNpcDialog; }, set openNpcDialog(v) { openNpcDialog = v; },
  get closeNpcDialog() { return closeNpcDialog; }, set closeNpcDialog(v) { closeNpcDialog = v; },
  get showToast() { return showToast; }, set showToast(v) { showToast = v; },
  get STAGE_CAMPAIGN_DATA() { return STAGE_CAMPAIGN_DATA; },
  get openStageSelectModal() { return openStageSelectModal; }, set openStageSelectModal(v) { openStageSelectModal = v; },
  get closeStageSelectModal() { return closeStageSelectModal; }, set closeStageSelectModal(v) { closeStageSelectModal = v; },
  get closeStageResultModal() { return closeStageResultModal; }, set closeStageResultModal(v) { closeStageResultModal = v; },
  get renderStageSelectModal() { return renderStageSelectModal; }, set renderStageSelectModal(v) { renderStageSelectModal = v; }
});
