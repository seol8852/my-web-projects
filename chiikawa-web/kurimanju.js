// ==============================================================
// 🌰 쿠리만쥬 야시장 카드게임 로직 (kurimanju.js)
// ==============================================================

const FOOD_ITEMS = ["🍮", "🍜", "🍣", "🍢", "🥞", "🍤", "🍡", "🥘"];

let cardDeck = [];
let flippedCards = [];
let matchedPairs = 0;
let isGameActive = false;
let gameTimer = 45;
let timerInterval = null;

function getAcorns() {
  try {
    const v = localStorage.getItem('chiikawa_acorns');
    if (v !== null) return parseInt(v, 10);
  } catch (e) {}
  return 300;
}

function saveAcorns(cnt) {
  try {
    localStorage.setItem('chiikawa_acorns', cnt);
  } catch (e) {}
  document.getElementById('kuriAcornCount').textContent = cnt;
}

function startCardGame() {
  isGameActive = true;
  matchedPairs = 0;
  flippedCards = [];
  gameTimer = 45;
  document.getElementById('kuriTimer').textContent = gameTimer;
  document.getElementById('kuriPairs').textContent = matchedPairs;
  document.getElementById('kuriStartBtn').textContent = "🔄 게임 다시 시작";

  // 16장 덱 생성 (8쌍)
  cardDeck = [...FOOD_ITEMS, ...FOOD_ITEMS].sort(() => Math.random() - 0.5);

  const grid = document.getElementById('cardGrid');
  grid.innerHTML = '';

  cardDeck.forEach((food, idx) => {
    const card = document.createElement('div');
    card.className = 'memory-card';
    card.dataset.food = food;
    card.dataset.index = idx;
    card.innerHTML = `
      <div class="card-back">🌰</div>
      <div class="card-front">${food}</div>
    `;
    card.onclick = () => flipCard(card);
    grid.appendChild(card);
  });

  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    gameTimer--;
    document.getElementById('kuriTimer').textContent = gameTimer;
    if (gameTimer <= 0) {
      endGame(false);
    }
  }, 1000);

  showToast("야시장 미식 카드 짝맞추기 시작! 🌰");
}

function flipCard(card) {
  if (!isGameActive || card.classList.contains('flipped') || card.classList.contains('matched') || flippedCards.length >= 2) {
    return;
  }

  card.classList.add('flipped');
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    checkMatch();
  }
}

function checkMatch() {
  const [c1, c2] = flippedCards;
  const match = (c1.dataset.food === c2.dataset.food);

  if (match) {
    c1.classList.add('matched');
    c2.classList.add('matched');
    flippedCards = [];
    matchedPairs++;
    document.getElementById('kuriPairs').textContent = matchedPairs;

    if (matchedPairs >= 8) {
      endGame(true);
    }
  } else {
    setTimeout(() => {
      c1.classList.remove('flipped');
      c2.classList.remove('flipped');
      flippedCards = [];
    }, 700);
  }
}

function endGame(victory) {
  isGameActive = false;
  clearInterval(timerInterval);

  if (victory) {
    const acorns = getAcorns() + 150;
    saveAcorns(acorns);
    document.getElementById('kuriVictoryModal').classList.remove('hidden');
  } else {
    showToast("시간 초과! 아쉽지만 쿠리만쥬 선배와 다시 도전해보세요!");
  }
}

function closeKuriVictory() {
  document.getElementById('kuriVictoryModal').classList.add('hidden');
}

function showToast(msg) {
  const toast = document.getElementById('toastPopup');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2200);
}

window.addEventListener('DOMContentLoaded', () => {
  saveAcorns(getAcorns());
});
