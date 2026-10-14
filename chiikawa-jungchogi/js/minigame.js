// 치이카와 정처기 단어 암기 미니게임 엔진 (minigame.js)
// 1. 몬스터 토벌 스피드 퀴즈 (Time Attack 60s)
// 2. 단어 카드 짝맞추기 메모리 게임 (Flip Card Match)

const MINIGAME_STATE = {
  activeMode: 'slayer', // 'slayer' | 'card'

  // 토벌전 상태
  slayer: {
    isRunning: false,
    fighter: 'chiikawa',
    timer: 60,
    interval: null,
    score: 0,
    combo: 0,
    maxCombo: 0,
    defeatedMonsters: 0,
    currentMonster: null,
    monsterHp: 100,
    monsterMaxHp: 100,
    currentWord: null,
    options: [],
    wrongList: []
  },

  // 카드 짝맞추기 상태
  cardGame: {
    cards: [],
    flippedCards: [],
    matchedCount: 0,
    totalPairs: 8,
    moves: 0,
    startTime: null,
    timerInterval: null,
    isLocked: false
  }
};

const MONSTER_POOL = [
  { name: "딱정벌레 괴물", img: "assets/monster_bug.png", maxHp: 100 },
  { name: "키메라 몬스터", img: "assets/monster_chimera.png", maxHp: 120 },
  { name: "고블린 토벌 대상", img: "assets/monster_goblin.png", maxHp: 130 },
  { name: "어둠의 군단", img: "assets/monster_dark_swarm.png", maxHp: 140 },
  { name: "강철 키메라", img: "assets/monster_iron_chimera.png", maxHp: 160 },
  { name: "중간 보스 수호자", img: "assets/midboss.png", maxHp: 180 },
  { name: "거대 괴물 아노코", img: "assets/anoko.png", maxHp: 200 }
];

// 파이터 캐릭터 선택 (치이카와, 하치와레, 우사기, 랏코)
function selectSlayerFighter(fighterKey) {
  sound.playClick();
  MINIGAME_STATE.slayer.fighter = fighterKey;
  const heroImg = document.getElementById('slayer-hero-avatar');
  const heroName = document.getElementById('slayer-hero-name');
  if (heroImg) {
    heroImg.src = `assets/${fighterKey}.png`;
  }
  const names = {
    chiikawa: '치이카와',
    hachiware: '하치와레',
    usagi: '우사기',
    rakko: '랏코 사부'
  };
  if (heroName) {
    heroName.innerText = names[fighterKey] || '치이카와';
  }
  document.querySelectorAll('.fighter-select-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.fighter === fighterKey);
  });
}

// ==========================================
// 1. 몬스터 토벌 스피드 퀴즈 로직
// ==========================================
function switchMinigameMode(mode) {
  sound.playClick();
  MINIGAME_STATE.activeMode = mode;

  document.querySelectorAll('.mini-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  const slayerPane = document.getElementById('mini-slayer-pane');
  const cardPane = document.getElementById('mini-card-pane');

  if (mode === 'slayer') {
    if (slayerPane) slayerPane.style.display = 'block';
    if (cardPane) cardPane.style.display = 'none';
  } else {
    if (slayerPane) slayerPane.style.display = 'none';
    if (cardPane) cardPane.style.display = 'block';
    initCardGame();
  }
}

// 토벌전 시작
function startSlayerGame() {
  sound.playClick();
  const s = MINIGAME_STATE.slayer;
  s.isRunning = true;
  s.timer = 60;
  s.score = 0;
  s.combo = 0;
  s.maxCombo = 0;
  s.defeatedMonsters = 0;
  s.wrongList = [];

  document.getElementById('slayer-intro-box').style.display = 'none';
  document.getElementById('slayer-game-arena').style.display = 'block';
  document.getElementById('slayer-result-modal').style.display = 'none';

  spawnNewMonster();
  nextSlayerQuestion();

  clearInterval(s.interval);
  updateSlayerHud();

  s.interval = setInterval(() => {
    s.timer--;
    updateSlayerHud();

    if (s.timer <= 0) {
      clearInterval(s.interval);
      endSlayerGame();
    }
  }, 1000);
}

// 새 몬스터 출현
function spawnNewMonster() {
  const s = MINIGAME_STATE.slayer;
  const m = MONSTER_POOL[Math.floor(Math.random() * MONSTER_POOL.length)];
  s.currentMonster = m;
  s.monsterHp = m.maxHp;
  s.monsterMaxHp = m.maxHp;

  const mImg = document.getElementById('slayer-monster-img');
  const mName = document.getElementById('slayer-monster-name');
  if (mImg) {
    mImg.src = m.img;
    mImg.onerror = () => { mImg.src = 'assets/monster_chimera.png'; };
    mImg.classList.remove('dead');
    mImg.classList.add('spawn-anim');
    setTimeout(() => mImg.classList.remove('spawn-anim'), 400);
  }
  if (mName) mName.innerText = m.name;
  updateMonsterHpBar();
}

function updateMonsterHpBar() {
  const s = MINIGAME_STATE.slayer;
  const hpFill = document.getElementById('slayer-monster-hp-fill');
  const hpText = document.getElementById('slayer-monster-hp-text');
  const pct = Math.max(0, Math.round((s.monsterHp / s.monsterMaxHp) * 100));

  if (hpFill) hpFill.style.width = `${pct}%`;
  if (hpText) hpText.innerText = `${s.monsterHp} / ${s.monsterMaxHp}`;
}

// 다음 단어 문제 출제
function nextSlayerQuestion() {
  const s = MINIGAME_STATE.slayer;
  // 단어 중 무작위 1개 정답 선정
  const correct = JUNGCHOGI_WORDS[Math.floor(Math.random() * JUNGCHOGI_WORDS.length)];
  s.currentWord = correct;

  // 오답 보기 3개 추출 (중복 없이)
  const others = JUNGCHOGI_WORDS.filter(w => w.id !== correct.id);
  const shuffledOthers = [...others].sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [...shuffledOthers, correct].sort(() => Math.random() - 0.5);
  s.options = options;

  // 문제 설명 노출
  const descEl = document.getElementById('slayer-word-desc');
  const catEl = document.getElementById('slayer-word-category');
  const hintEl = document.getElementById('slayer-word-hint');

  if (descEl) descEl.innerText = correct.desc;
  if (catEl) catEl.innerText = `[${correct.category}]`;
  if (hintEl) hintEl.innerText = `💡 힌트: ${correct.hint}`;

  // 4개 보기 버튼 렌더링
  const optContainer = document.getElementById('slayer-options-grid');
  if (optContainer) {
    optContainer.innerHTML = options.map((opt, idx) => `
      <button type="button" 
              class="slayer-opt-btn" 
              onclick="handleSlayerAnswer('${opt.id}')">
        <span class="slayer-opt-num">${idx + 1}</span>
        <span class="slayer-opt-text">${opt.term}</span>
      </button>
    `).join('');
  }
}

// 단어 선택 채점
function handleSlayerAnswer(selectedId) {
  const s = MINIGAME_STATE.slayer;
  if (!s.isRunning) return;

  const isCorrect = (selectedId === s.currentWord.id);
  const mImg = document.getElementById('slayer-monster-img');
  const heroImg = document.getElementById('slayer-hero-avatar');

  if (isCorrect) {
    sound.playCorrect();
    s.combo++;
    if (s.combo > s.maxCombo) s.maxCombo = s.combo;

    // 점수 계산: 기본 100점 + 콤보 보너스
    const gainedScore = 100 + (s.combo * 20);
    s.score += gainedScore;

    // 몬스터 데미지 (정답 1회당 40~50 데미지)
    const dmg = 45;
    s.monsterHp = Math.max(0, s.monsterHp - dmg);
    updateMonsterHpBar();

    // 타격 애니메이션
    if (mImg) {
      mImg.classList.add('hit-anim');
      setTimeout(() => mImg.classList.remove('hit-anim'), 300);
    }
    if (heroImg) {
      heroImg.classList.add('attack-anim');
      setTimeout(() => heroImg.classList.remove('attack-anim'), 300);
    }

    showComboPopup(s.combo, gainedScore);

    // 몬스터 처치 판정
    if (s.monsterHp <= 0) {
      s.defeatedMonsters++;
      s.score += 300; // 보스 격퇴 보너스 300점
      if (mImg) {
        mImg.classList.add('dead');
      }
      setTimeout(() => {
        spawnNewMonster();
      }, 500);
    }

    nextSlayerQuestion();
  } else {
    sound.playWrong();
    s.combo = 0;
    s.timer = Math.max(0, s.timer - 2); // 오답 패널티: 2초 차감
    s.wrongList.push(s.currentWord);

    // 오답 흔들림 이펙트
    const arena = document.getElementById('slayer-game-arena');
    if (arena) {
      arena.classList.add('wrong-shake');
      setTimeout(() => arena.classList.remove('wrong-shake'), 400);
    }

    showComboPopup(0, -2);
    nextSlayerQuestion();
  }

  updateSlayerHud();
}

function showComboPopup(combo, val) {
  const popup = document.getElementById('slayer-combo-toast');
  if (!popup) return;

  if (combo > 1) {
    popup.innerHTML = `🔥 ${combo} 콤보! +${val}점`;
    popup.className = 'combo-toast show combo-high';
  } else if (combo === 1) {
    popup.innerHTML = `✨ 정답! +${val}점`;
    popup.className = 'combo-toast show';
  } else {
    popup.innerHTML = `❌ 오답! 시간 -2초!`;
    popup.className = 'combo-toast show combo-miss';
  }

  setTimeout(() => {
    popup.className = 'combo-toast';
  }, 700);
}

function updateSlayerHud() {
  const s = MINIGAME_STATE.slayer;
  const timeEl = document.getElementById('slayer-timer-val');
  const scoreEl = document.getElementById('slayer-score-val');
  const comboEl = document.getElementById('slayer-combo-val');
  const killEl = document.getElementById('slayer-kills-val');

  if (timeEl) timeEl.innerText = `${s.timer}초`;
  if (scoreEl) scoreEl.innerText = `${s.score}점`;
  if (comboEl) comboEl.innerText = `${s.combo}`;
  if (killEl) killEl.innerText = `${s.defeatedMonsters}마리`;
}

// 토벌전 종료
function endSlayerGame() {
  const s = MINIGAME_STATE.slayer;
  s.isRunning = false;
  sound.playFanfare();

  const modal = document.getElementById('slayer-result-modal');
  const resScore = document.getElementById('res-slayer-score');
  const resKills = document.getElementById('res-slayer-kills');
  const resCombo = document.getElementById('res-slayer-combo');
  const resRank = document.getElementById('res-slayer-rank');
  const wrongContainer = document.getElementById('res-slayer-wrong-list');

  if (resScore) resScore.innerText = `${s.score}점`;
  if (resKills) resKills.innerText = `${s.defeatedMonsters}마리`;
  if (resCombo) resCombo.innerText = `${s.maxCombo}회`;

  // 랭크 계산
  let rankText = "🌸 견습 토벌대";
  if (s.score >= 2500) rankText = "👑 S급 마스터 랑커";
  else if (s.score >= 1800) rankText = "⚔️ A급 토벌 달인";
  else if (s.score >= 1000) rankText = "🌿 B급 제초 대원";
  if (resRank) resRank.innerText = rankText;

  // 오답 노트 리스트 렌더링
  if (wrongContainer) {
    if (s.wrongList.length === 0) {
      wrongContainer.innerHTML = `<p style="color:#10b981; font-weight:700;">대단해요! 틀린 문제가 하나도 없습니다! 💯</p>`;
    } else {
      // 중복 제거
      const uniqueWrongs = Array.from(new Set(s.wrongList.map(w => w.id)))
        .map(id => s.wrongList.find(w => w.id === id));

      wrongContainer.innerHTML = uniqueWrongs.map(w => `
        <div class="wrong-word-item">
          <div style="font-weight:800; color:#ff4d6d;">${w.term} <span style="font-size:0.75rem; color:#64748b;">[${w.category}]</span></div>
          <div style="font-size:0.8rem; color:#334155; margin-top:2px;">${w.desc}</div>
        </div>
      `).join('');
    }
  }

  if (modal) modal.style.display = 'flex';
}

function closeSlayerResult() {
  sound.playClick();
  document.getElementById('slayer-result-modal').style.display = 'none';
  document.getElementById('slayer-intro-box').style.display = 'block';
  document.getElementById('slayer-game-arena').style.display = 'none';
}

// ==========================================
// 2. 단어 카드 짝맞추기 메모리 게임 (Card Match)
// ==========================================
function initCardGame() {
  const g = MINIGAME_STATE.cardGame;
  g.matchedCount = 0;
  g.moves = 0;
  g.flippedCards = [];
  g.isLocked = false;
  g.startTime = Date.now();

  // 70개 단어 중 무작위 8개 단어 선정 (= 16장 카드)
  const shuffledWords = [...JUNGCHOGI_WORDS].sort(() => Math.random() - 0.5).slice(0, 8);
  const charPool = ['chiikawa', 'hachiware', 'usagi', 'kurimanju', 'momonga', 'rakko'];

  const cardList = [];
  shuffledWords.forEach((w, wIdx) => {
    const cardChar = charPool[wIdx % charPool.length];
    // 1) 용어 카드
    cardList.push({
      id: `${w.id}-term`,
      pairId: w.id,
      type: 'term',
      content: w.term,
      sub: w.category,
      char: cardChar
    });
    // 2) 설명 카드
    cardList.push({
      id: `${w.id}-desc`,
      pairId: w.id,
      type: 'desc',
      content: w.desc,
      sub: "개념 정의",
      char: cardChar
    });
  });

  // 카드 셔플
  g.cards = cardList.sort(() => Math.random() - 0.5);

  renderCardBoard();
  updateCardHud();

  clearInterval(g.timerInterval);
  g.timerInterval = setInterval(updateCardTimer, 1000);
}

function renderCardBoard() {
  const board = document.getElementById('card-game-board');
  if (!board) return;

  const g = MINIGAME_STATE.cardGame;

  board.innerHTML = g.cards.map((c, idx) => `
    <div class="flip-card" id="card-${idx}" onclick="flipCard(${idx})">
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <img src="assets/${c.char}.png" alt="치이카와" style="width:42px; height:42px; object-fit:contain; filter:drop-shadow(0 2px 5px rgba(0,0,0,0.12));">
          <span style="font-size: 0.72rem; font-weight:800; color:#ff4d6d; margin-top:2px;">정처기</span>
        </div>
        <div class="flip-card-back ${c.type}">
          <div style="display:flex; align-items:center; justify-content:space-between; width:100%; margin-bottom:4px;">
            <span class="card-back-badge">${c.sub}</span>
            <img src="assets/${c.char}.png" style="width:18px; height:18px; object-fit:contain;">
          </div>
          <div class="card-back-content">${c.content}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function flipCard(idx) {
  const g = MINIGAME_STATE.cardGame;
  if (g.isLocked) return;

  const cardEl = document.getElementById(`card-${idx}`);
  if (!cardEl || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

  sound.playClick();
  cardEl.classList.add('flipped');
  g.flippedCards.push({ idx, card: g.cards[idx] });

  if (g.flippedCards.length === 2) {
    g.moves++;
    updateCardHud();
    checkCardMatch();
  }
}

function checkCardMatch() {
  const g = MINIGAME_STATE.cardGame;
  g.isLocked = true;

  const [first, second] = g.flippedCards;
  const isMatch = (first.card.pairId === second.card.pairId);

  const el1 = document.getElementById(`card-${first.idx}`);
  const el2 = document.getElementById(`card-${second.idx}`);

  if (isMatch) {
    sound.playCorrect();
    g.matchedCount++;
    setTimeout(() => {
      el1.classList.add('matched');
      el2.classList.add('matched');
      g.flippedCards = [];
      g.isLocked = false;
      updateCardHud();

      if (g.matchedCount === g.totalPairs) {
        clearInterval(g.timerInterval);
        sound.playFanfare();
        showCardClearModal();
      }
    }, 400);
  } else {
    sound.playWrong();
    setTimeout(() => {
      el1.classList.remove('flipped');
      el2.classList.remove('flipped');
      g.flippedCards = [];
      g.isLocked = false;
    }, 1100);
  }
}

function updateCardTimer() {
  const g = MINIGAME_STATE.cardGame;
  if (!g.startTime) return;
  const elapsed = Math.floor((Date.now() - g.startTime) / 1000);
  const min = Math.floor(elapsed / 60);
  const sec = elapsed % 60;
  const timerEl = document.getElementById('card-timer-val');
  if (timerEl) {
    timerEl.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }
}

function updateCardHud() {
  const g = MINIGAME_STATE.cardGame;
  const pairsEl = document.getElementById('card-matched-val');
  const movesEl = document.getElementById('card-moves-val');

  if (pairsEl) pairsEl.innerText = `${g.matchedCount} / ${g.totalPairs}쌍`;
  if (movesEl) movesEl.innerText = `${g.moves}회`;
}

function showCardClearModal() {
  const modal = document.getElementById('card-clear-modal');
  const timeEl = document.getElementById('res-card-time');
  const movesEl = document.getElementById('res-card-moves');

  const timerEl = document.getElementById('card-timer-val');
  if (timeEl && timerEl) timeEl.innerText = timerEl.innerText;
  if (movesEl) movesEl.innerText = `${MINIGAME_STATE.cardGame.moves}회`;

  if (modal) modal.style.display = 'flex';
}

function closeCardClearModal() {
  sound.playClick();
  document.getElementById('card-clear-modal').style.display = 'none';
  initCardGame();
}
