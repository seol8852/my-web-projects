// ==============================================================
// 치이카와 로우(郎) 라멘집 알바 엔진 (ramen.js)
// ==============================================================

const TOPPINGS = {
  garlic: { name: "마늘", icon: "🧄" },
  chashu: { name: "차슈", icon: "🥩" },
  veggie: { name: "숙주/야채", icon: "🥬" },
  egg:    { name: "맛계란", icon: "🥚" },
  fat:    { name: "아부라", icon: "🧈" },
  spicy:  { name: "카라메", icon: "🌶️" }
};

const CUSTOMERS = [
  { name: "치이카와", icon: "🐭", quotes: ["“와... 와와...! 마늘 듬뿍 넣어주세요...!”", "“푸하-! 숙주랑 차슈 많이 부탁드려요...!”"] },
  { name: "하치와레", icon: "🐱", quotes: ["“난토카나레-! 차슈랑 맛계란 듬뿍으로 부탁해!”", "“시사 군! 오늘도 맛있게 부탁할게!”"] },
  { name: "우사기",   icon: "🐰", quotes: ["“야하-!! 우라라라-!! (마늘 2배, 기름 듬뿍!)”", "“하아?! 숙주 산더미로 쌓아달라구-!!”"] },
  { name: "쿠리만쥬", icon: "🌰", quotes: ["“하아아-! 카라메(매운맛)에 차슈 안주용으로 추가해줘.”", "“국물이 진해야 술안주로 딱이지.”"] },
  { name: "모몬가",   icon: "🐿️", quotes: ["“귀여운 나한테 어울리게 맛계란 3개랑 차슈 많이 줘!”", "“빨리 내놔! 배고프단 말이야!”"] },
  { name: "포셰트 갑옷씨", icon: "🛡️", quotes: ["“녀석들이 좋아하는 라멘을 나도 한 그릇 주겠나!”", "“면 든든하게 야채 많이 올려주게!”"] }
];

let currentMode = 'rush'; // 'rush' or 'endless'
let isPlaying = false;
let score = 0;
let combo = 0;
let maxCombo = 0;
let timeLeft = 60;
let lives = 3;
let timerInterval = null;

let currentOrder = null;
let currentBowl = { garlic: 0, chashu: 0, veggie: 0, egg: 0, fat: 0, spicy: 0 };

let audioCtx = null;
let soundEnabled = true;

function playSound(type) {
  if (!soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'tap') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(500, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.08);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'correct') {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.2, now + i * 0.07);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.07 + 0.2);
        o.start(now + i * 0.07);
        o.stop(now + i * 0.07 + 0.2);
      });
    } else if (type === 'wrong') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.2);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    }
  } catch(e) {}
}

function selectMode(mode) {
  if (isPlaying) return;
  currentMode = mode;
  document.getElementById('btnRushMode').classList.toggle('active', mode === 'rush');
  document.getElementById('btnEndlessMode').classList.toggle('active', mode === 'endless');
  document.getElementById('lifeContainer').classList.toggle('hidden', mode !== 'endless');
}

function startRamenGame() {
  isPlaying = true;
  score = 0;
  combo = 0;
  maxCombo = 0;
  timeLeft = (currentMode === 'rush') ? 60 : 30;
  lives = 3;

  document.getElementById('gameIdleScreen').classList.add('hidden');
  document.getElementById('gameActiveScreen').classList.remove('hidden');

  updateStatsUI();
  generateNewOrder();

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(gameTimerTick, 1000);
}

function gameTimerTick() {
  timeLeft--;
  document.getElementById('ramenTimeLeft').textContent = timeLeft;
  
  const total = (currentMode === 'rush') ? 60 : 30;
  const pct = Math.max(0, (timeLeft / total) * 100);
  document.getElementById('ramenTimeFill').style.width = `${pct}%`;

  if (timeLeft <= 0) {
    if (currentMode === 'rush') {
      finishGame();
    } else {
      // 시간 초과 시 라이프 감소 후 새 주문
      lives--;
      playSound('wrong');
      showToast("⏰ 시간 초과! 손님이 기다리다 지쳤습니다!");
      updateLifeUI();
      if (lives <= 0) {
        finishGame();
      } else {
        timeLeft = 25;
        generateNewOrder();
      }
    }
  }
}

function updateLifeUI() {
  const container = document.getElementById('lifeContainer');
  let hearts = '';
  for (let i = 0; i < lives; i++) hearts += '❤️';
  for (let i = lives; i < 3; i++) hearts += '🖤';
  container.textContent = hearts;
}

function generateNewOrder() {
  resetCurrentBowl();
  const customer = CUSTOMERS[Math.floor(Math.random() * CUSTOMERS.length)];
  const quote = customer.quotes[Math.floor(Math.random() * customer.quotes.length)];

  document.getElementById('customerIcon').textContent = customer.icon;
  document.getElementById('customerName').textContent = customer.name;
  document.getElementById('customerQuote').textContent = quote;

  // 랜덤 토핑 주문 2 ~ 4종 생성
  const keys = Object.keys(TOPPINGS);
  const target = {};
  const numToppings = 2 + Math.floor(Math.random() * 3); // 2, 3, 4개
  
  // 셔플
  const shuffled = keys.sort(() => 0.5 - Math.random());
  for (let i = 0; i < numToppings; i++) {
    const k = shuffled[i];
    target[k] = 1 + Math.floor(Math.random() * 2); // 1 or 2개
  }

  currentOrder = target;

  // 주문 칩 렌더링
  const chipsContainer = document.getElementById('orderTargetChips');
  chipsContainer.innerHTML = '';
  Object.keys(target).forEach(k => {
    const chip = document.createElement('div');
    chip.className = 'target-chip';
    chip.innerHTML = `${TOPPINGS[k].icon} ${TOPPINGS[k].name} <strong>x${target[k]}</strong>`;
    chipsContainer.appendChild(chip);
  });

  document.getElementById('shisaHelperMsg').textContent = `🦁 시사: “${customer.name} 손님의 주문을 정확히 완성해주세요!”`;
}

function addTopping(type) {
  if (!isPlaying) return;
  if (currentBowl[type] >= 3) {
    showToast("해당 토핑은 그릇에 가득 찼습니다!");
    return;
  }

  playSound('tap');
  currentBowl[type]++;
  document.getElementById(`count_${type}`).textContent = currentBowl[type];

  // 그릇 레이어에 토핑 아이콘 추가
  const layer = document.getElementById('ramenToppingsLayer');
  const span = document.createElement('span');
  span.className = 'placed-topping-icon';
  span.dataset.type = type;
  span.textContent = TOPPINGS[type].icon;
  layer.appendChild(span);
}

function resetCurrentBowl() {
  currentBowl = { garlic: 0, chashu: 0, veggie: 0, egg: 0, fat: 0, spicy: 0 };
  Object.keys(TOPPINGS).forEach(k => {
    const el = document.getElementById(`count_${k}`);
    if (el) el.textContent = '0';
  });
  const layer = document.getElementById('ramenToppingsLayer');
  if (layer) layer.innerHTML = '';
}

function serveRamen() {
  if (!isPlaying || !currentOrder) return;

  // 주문 일치 여부 판정
  let isPerfect = true;
  const allKeys = Object.keys(TOPPINGS);

  for (let k of allKeys) {
    const targetCount = currentOrder[k] || 0;
    const currentCount = currentBowl[k] || 0;
    if (targetCount !== currentCount) {
      isPerfect = false;
      break;
    }
  }

  if (isPerfect) {
    playSound('correct');
    combo++;
    if (combo > maxCombo) maxCombo = combo;

    const basePts = 100;
    const comboBonus = Math.min(150, combo * 20);
    const addedScore = basePts + comboBonus;
    score += addedScore;

    showToast(`✨ PERFECT! ${addedScore}점 획득! (${combo} COMBO)`);
    document.getElementById('shisaHelperMsg').innerHTML = `🦁 시사: “우레시이-!(기뻐-!) 완벽한 로우 라멘 완성! (+${addedScore}점)”`;

    if (currentMode === 'endless') {
      timeLeft = Math.min(30, timeLeft + 4); // 정답 시 보너스 시간
    }

    updateStatsUI();
    generateNewOrder();
  } else {
    playSound('wrong');
    combo = 0;
    showToast("❌ 주문과 토핑이 일치하지 않습니다!");
    document.getElementById('shisaHelperMsg').innerHTML = `🦁 시사: “아와와... 손님이 고개를 갸웃거려요! 다시 담아보세요!”`;
    
    if (currentMode === 'endless') {
      lives--;
      updateLifeUI();
      if (lives <= 0) {
        finishGame();
        return;
      }
    }
    updateStatsUI();
  }
}

function updateStatsUI() {
  document.getElementById('ramenScore').textContent = score;
  document.getElementById('ramenCombo').textContent = `${combo} COMBO`;
  
  const best = parseInt(localStorage.getItem('chiikawa_ramen_best_score') || '0', 10);
  document.getElementById('ramenBest').textContent = Math.max(best, score);
}

function finishGame() {
  isPlaying = false;
  clearInterval(timerInterval);

  // 최고 기록 갱신
  let best = parseInt(localStorage.getItem('chiikawa_ramen_best_score') || '0', 10);
  if (score > best) {
    best = score;
    localStorage.setItem('chiikawa_ramen_best_score', best);
  }

  // 도토리 보상 (점수 / 10)
  const acornReward = Math.max(30, Math.floor(score / 8));
  try {
    let acorns = parseInt(localStorage.getItem('chiikawa_acorns') || '300', 10);
    acorns += acornReward;
    localStorage.setItem('chiikawa_acorns', acorns);
    updateNavAcorns();
  } catch(e) {}

  // 결과 모달 세팅
  document.getElementById('modalFinalScore').textContent = `${score}점`;
  document.getElementById('modalMaxCombo').textContent = `${maxCombo} COMBO`;
  document.getElementById('modalAcornReward').textContent = `+${acornReward} 🌰`;

  document.getElementById('ramenResultModal').classList.remove('hidden');
}

function closeResultModal() {
  document.getElementById('ramenResultModal').classList.add('hidden');
  document.getElementById('gameActiveScreen').classList.add('hidden');
  document.getElementById('gameIdleScreen').classList.remove('hidden');
  updateStatsUI();
}

function retryRamenGame() {
  document.getElementById('ramenResultModal').classList.add('hidden');
  startRamenGame();
}

function updateNavAcorns() {
  try {
    let acorns = localStorage.getItem('chiikawa_acorns') || '300';
    const el = document.getElementById('navAcorns');
    if (el) el.textContent = acorns;
  } catch(e) {}
}

function showToast(msg) {
  const toast = document.getElementById('toastPopup');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2000);
}

window.addEventListener('DOMContentLoaded', () => {
  updateNavAcorns();
  updateStatsUI();

  // 스페이스바 누르면 서빙
  window.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && isPlaying) {
      e.preventDefault();
      serveRamen();
    }
  });
});
