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
    img: 'assets/rakko.png',
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
      window.gameApp.addReward(90, 50, 'ramen');
      window.gameApp.activateRamenBuff();
    }
    showToast(`🍜 대성공! ${currentRamenOrder.name} 손님이 대만족했습니다! (+90 코인 & 활력 버프 발동!)`);
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

  modal.classList.add('open');
}

function closeNpcDialog(actionType) {
  const modal = document.getElementById('npc-dialog-modal');
  if (modal) modal.classList.remove('open');

  if (actionType === 'party' && window.gameApp) {
    window.gameApp.togglePartyFollow();
  } else if (actionType === 'gift' && window.gameApp) {
    soundFx.playCoin();
    window.gameApp.addReward(35, 25, 'talk');
    showToast('💖 친구와 즐겁게 대화를 나누며 응원 보너스 (+35 코인)를 받았습니다!');
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
