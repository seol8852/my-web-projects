// ==========================================================================
// 치이카와 3D 오픈월드 타운 - 미니게임 & NPC 대화 시스템 (minigames.js)
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

let currentRamenOrder = null;
let selectedRamenIngs = new Set();

// 라멘 '랑' 미니게임 열기
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
      window.gameApp.addReward(80, 45, 'ramen');
      window.gameApp.activateRamenBuff();
    }
    showToast(`🍜 대성공! ${currentRamenOrder.name} 손님이 대만족했습니다! (+80 코인 & 활력 버프 발동!)`);
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

    // 독초 위치를 주기적으로 일반 잡초로 순환
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
  if (r < 0.2) return 'golden';
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
// 3. NPC 대화 시스템
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
    window.gameApp.addReward(30, 20, 'talk');
    showToast('💖 친구와 즐겁게 대화를 나누며 응원 보너스 (+30 코인)를 받았습니다!');
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
