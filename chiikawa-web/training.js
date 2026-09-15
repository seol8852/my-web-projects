// ==============================================================
// 치이카와 훈련 센터 & 4대 능력치 육성 엔진 (training.js)
// ==============================================================

// 1. 능력치 상태 데이터 (localStorage 영구 보존)
const DEFAULT_STATS = {
  atkLevel: 1,
  atkClicks: 0,
  hpLevel: 1,
  hpClicks: 0,
  studyLevel: 1,
  studyPassedLevels: {},
  cookLevel: 1,
  soundEnabled: true
};

let userStats = loadStats();
let activeTab = 'gym';
let activeGymSubtab = 'atk';

// 효과음 재생 시스템
let audioCtx = null;
function playSound(type) {
  if (!userStats.soundEnabled) return;
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click_punch') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'click_dumbbell') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.linearRampToValueAtTime(180, now + 0.09);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.09);
      osc.start(now);
      osc.stop(now + 0.09);
    } else if (type === 'correct') {
      [523.25, 659.25, 783.99].forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.2, now + i * 0.08);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.2);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.2);
      });
    } else if (type === 'wrong') {
      const o = audioCtx.createOscillator();
      const g = audioCtx.createGain();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(180, now);
      o.frequency.linearRampToValueAtTime(90, now + 0.25);
      o.connect(g);
      g.connect(audioCtx.destination);
      g.gain.setValueAtTime(0.3, now);
      g.gain.linearRampToValueAtTime(0.01, now + 0.25);
      o.start(now);
      o.stop(now + 0.25);
    } else if (type === 'levelup') {
      [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.25, now + i * 0.09);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.09 + 0.3);
        o.start(now + i * 0.09);
        o.stop(now + i * 0.09 + 0.3);
      });
    } else if (type === 'sizzle') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.linearRampToValueAtTime(120, now + 0.3);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    }
  } catch (e) {
    console.log("Audio play error", e);
  }
}

function loadStats() {
  try {
    const data = localStorage.getItem('chiikawa_training_stats');
    if (data) {
      return Object.assign({}, DEFAULT_STATS, JSON.parse(data));
    }
  } catch (e) {
    console.error("Failed to load stats", e);
  }
  return Object.assign({}, DEFAULT_STATS);
}

function saveStats() {
  try {
    localStorage.setItem('chiikawa_training_stats', JSON.stringify(userStats));
  } catch (e) {
    console.error("Failed to save stats", e);
  }
  updateHUD();
  updateCostumeAvatarSync();
  renderStudyAwakenings();
}

function confirmResetStats() {
  if (confirm("정말로 모든 훈련 능력치와 레벨을 초기화하시겠습니까? (되돌릴 수 없습니다!)")) {
    userStats = Object.assign({}, DEFAULT_STATS);
    saveStats();
    showToast("능력치가 모두 초기화되었습니다! 🔄");
    initAllModules();
  }
}

// 칭호 & 전투력 계산
function getTitleInfo(totalLvl) {
  if (totalLvl >= 380) return { title: "🌟 전설의 무한 능력자 먼작귀", desc: "먼작귀 세계관 최강의 마스터입니다!", crown: "👑" };
  if (totalLvl >= 280) return { title: "👑 사스마타 대마법사", desc: "모든 괴물을 단숨에 제압하는 전설의 토벌자!", crown: "⚔️" };
  if (totalLvl >= 180) return { title: "⚔️ 토벌대 정예 특공대", desc: "사스마타를 자유자재로 다루는 정예 무사입니다!", crown: "🛡️" };
  if (totalLvl >= 100) return { title: "📜 정보처리기사 수석 합격생", desc: "지식과 실무 코딩을 완벽히 마스터한 지성파!", crown: "🎓" };
  if (totalLvl >= 50) return { title: "🥊 근육 덤벨 전사", desc: "우사기에게 특훈을 받아 지치지 않는 근력을 보유!", crown: "💪" };
  if (totalLvl >= 20) return { title: "🥘 동굴 일품 요리사", desc: "하치와레의 동굴 레시피를 전수받은 맛의 장인!", crown: "🍳" };
  return { title: "🌱 초보 제초 견습생", desc: "매일 꾸준한 훈련으로 강해지는 중인 먼작귀입니다!", crown: "🌱" };
}

// 100가지 동굴 요리 레시피 리스트
const COOK_DISHES = [
  "달걀 프라이", "소금 주먹밥", "김가루 삼각김밥", "따끈한 된장국", "달콤한 딸기 푸딩",
  "구운 소시지", "치즈 토스트", "동굴 버섯 수프", "바삭한 감자튀김", "옥수수 버터구이",
  "수제 핫케이크", "하치와레 수제비", "동굴 야채 카레", "달걀말이 꼬치", "꿀바른 가래떡",
  "미트볼 스튜", "김치 볶음밥", "크림 파스타", "해물 라면", "치이카와 컵케이크",
  "로우 라멘 (마늘 듬뿍)", "군만두와 간장", "오코노미야키", "야키소바 볶음면", "치즈 닭갈비",
  "단호박 수프", "바베큐 꼬치구이", "찹쌀 탕수육", "매콤 떡볶이", "우사기 당근 케이크",
  "토마토 비프 스튜", "연어 스테이크", "치즈 함박스테이크", "수제 돈가스", "쿠리만쥬 어묵탕",
  "바지락 칼국수", "가라아게 튀김", "스위트 팬케이크", "해물 볶음밥", "마늘 버터 새우구이",
  "쿠리만쥬 안주 오마카세", "불고기 전골", "바삭한 멘보샤", "로제 떡볶이", "치즈 퐁듀",
  "치이카와 젤리 파르페", "동굴 숯불 스테이크", "해물 누룽지탕", "전복 버터구이", "스키야키 전골",
  "소고기 샤브샤브", "황금 볶음밥", "랍스터 버터구이", "장어 덮밥", "갈비찜 대잔치",
  "트러플 크림 리조또", "우사기 특제 당근 수플레", "동굴 해물 모둠찜", "궁중 떡갈비", "하치와레표 뚝배기 파스타",
  "수제 푸아그라 카나페", "무한 밥 & 스키야키", "황금 통닭 구이", "치즈 랍스터 테일", "한우 꽃등심 구이",
  "전설의 칠면조 로스트", "대게 버터 찜", "생연어 초밥 파티", "킹크랩 치즈구이", "황금 동굴 만찬",
  "치이카와 무지개 케이크", "우사기 광기 특식", "하치와레 궁극의 스튜", "별똥별 젤리 디저트", "쿠리만쥬 전설 안주",
  "용궁 해물 탕수", "황금 사스마타 꼬치", "초특급 불꽃 바베큐", "동굴 5성급 코스요리", "천상의 딸기 밀푀유",
  "마법의 푸딩 타워", "궁극의 로우 라멘 DX", "천사 치이카와의 만찬", "무지개 솜사탕 빙수", "전설의 보양 삼계탕",
  "용의 숨결 칠리새우", "황금 캐비아 카나페", "오리 훈제 바베큐", "치즈 폭포 퐁듀 스테이크", "신선로 궁중 요리",
  "황금 송로버섯 스테이크", "우주급 딸기 파르페", "무한의 밥상 대연회", "천상의 달콤 마카롱 타워", "전설의 불꽃 로스트비프",
  "태양의 황금 랍스터", "먼작귀 세계관 제패 연회", "신들의 만찬 코스", "사스마타 마스터 특식", "🌟 전설의 무한 황금 만찬"
];

function getDishName(level) {
  const idx = Math.min(COOKIE_MAX_LEVEL - 1, Math.max(0, level - 1));
  return `Lv.${level} ${COOK_DISHES[idx] || "특제 동굴 만찬"}`;
}
const COOKIE_MAX_LEVEL = 100;

// HUD UI 업데이트
function updateHUD() {
  const totalPower = userStats.atkLevel + userStats.hpLevel + userStats.studyLevel + userStats.cookLevel;
  const titleInfo = getTitleInfo(totalPower);

  document.getElementById('totalPower').textContent = totalPower;
  document.getElementById('userTitle').textContent = titleInfo.title;
  document.getElementById('userTitleDesc').textContent = titleInfo.desc;
  document.getElementById('tierCrown').textContent = titleInfo.crown;

  // 공격력
  document.getElementById('hudAtkLevel').textContent = userStats.atkLevel;
  document.getElementById('hudAtkBar').style.width = `${userStats.atkLevel}%`;
  document.getElementById('hudAtkClicks').textContent = userStats.atkClicks;
  document.getElementById('gymAtkLevelText').textContent = userStats.atkLevel;
  document.getElementById('gymAtkClicksLeft').textContent = Math.max(0, 50 - userStats.atkClicks);
  document.getElementById('gymAtkGauge').style.width = `${(userStats.atkClicks / 50) * 100}%`;
  document.getElementById('atkClickBadge').textContent = `${userStats.atkClicks} / 50`;

  // 체력
  document.getElementById('hudHpLevel').textContent = userStats.hpLevel;
  document.getElementById('hudHpBar').style.width = `${userStats.hpLevel}%`;
  document.getElementById('hudHpClicks').textContent = userStats.hpClicks;
  document.getElementById('gymHpLevelText').textContent = userStats.hpLevel;
  document.getElementById('gymHpClicksLeft').textContent = Math.max(0, 50 - userStats.hpClicks);
  document.getElementById('gymHpGauge').style.width = `${(userStats.hpClicks / 50) * 100}%`;
  document.getElementById('hpClickBadge').textContent = `${userStats.hpClicks} / 50`;

  // 공부
  const passedCount = Object.keys(userStats.studyPassedLevels).length;
  document.getElementById('hudStudyLevel').textContent = userStats.studyLevel;
  document.getElementById('hudStudyBar').style.width = `${userStats.studyLevel}%`;
  document.getElementById('hudStudyPassedCount').textContent = passedCount;
  document.getElementById('studyCurrentLevelText').textContent = `Lv. ${currentQuizLevel}`;

  // 요리
  document.getElementById('hudCookLevel').textContent = userStats.cookLevel;
  document.getElementById('hudCookBar').style.width = `${userStats.cookLevel}%`;
  const dishName = getDishName(userStats.cookLevel);
  document.getElementById('hudCookDishName').textContent = dishName;
  document.getElementById('cookDishBadge').textContent = `🍳 현재 요리: ${dishName}`;
  document.getElementById('cookLevelDisplay').textContent = `Lv. ${userStats.cookLevel}`;
}

// 탭 전환
function switchTrainingTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelectorAll('.training-tab-content').forEach(sec => {
    sec.classList.remove('active');
    sec.classList.add('hidden');
  });

  if (tab === 'gym') {
    document.getElementById('tabBtnGym').classList.add('active');
    const gymSec = document.getElementById('gymSection');
    gymSec.classList.remove('hidden');
    gymSec.classList.add('active');
  } else if (tab === 'study') {
    document.getElementById('tabBtnStudy').classList.add('active');
    const studySec = document.getElementById('studySection');
    studySec.classList.remove('hidden');
    studySec.classList.add('active');
    loadQuizLevel(currentQuizLevel);
  } else if (tab === 'cook') {
    document.getElementById('tabBtnCook').classList.add('active');
    const cookSec = document.getElementById('cookSection');
    cookSec.classList.remove('hidden');
    cookSec.classList.add('active');
  }
}

// 헬스장 서브탭 (공격력 vs 체력)
function switchGymSubtab(sub) {
  activeGymSubtab = sub;
  document.getElementById('gymSubAtkBtn').classList.toggle('active', sub === 'atk');
  document.getElementById('gymSubHpBtn').classList.toggle('active', sub === 'hp');
  document.getElementById('gymAtkPanel').classList.toggle('hidden', sub !== 'atk');
  document.getElementById('gymHpPanel').classList.toggle('hidden', sub !== 'hp');
}

// ==============================================================
// 2. 🏋️ 우사기 헬스장 (50회 연타 클릭 시스템)
// ==============================================================
const usagiQuotes = [
  "“야하-!! 50번 칠 때마다 공격력이 쑥쑥 오른다구-!!”",
  "“우라라라-!! 덤벨 50개는 기본이라구 하아?!”",
  "“하아?! 쉬지 말고 더 빠르게 연타하라구!!”",
  "“야-하-!! 근육 펌핑 100레벨까지 돌진이다!!”",
  "“우라!! 사스마타를 휘두를 힘이 솟아난다!!”"
];

function handleClickTraining(type, event) {
  if (type === 'atk') {
    if (userStats.atkLevel >= 100) {
      showToast("🎉 공격력 최고 레벨(Lv.100)을 이미 달성했습니다!");
      return;
    }
    playSound('click_punch');
    userStats.atkClicks++;
    spawnClickParticle(event, '🥊', '#FF5E7E');

    const icon = document.getElementById('atkTargetIcon');
    icon.style.transform = 'scale(1.3) rotate(-15deg)';
    setTimeout(() => { icon.style.transform = 'scale(1) rotate(0deg)'; }, 70);

    if (userStats.atkClicks >= 50) {
      userStats.atkClicks = 0;
      userStats.atkLevel = Math.min(100, userStats.atkLevel + 1);
      showLevelupModal('공격력', userStats.atkLevel, '🥊 우사기의 폭풍 펀치 파워 업!');
    }
    document.getElementById('atkUsagiQuote').textContent = usagiQuotes[Math.floor(Math.random() * usagiQuotes.length)];
  } else {
    if (userStats.hpLevel >= 100) {
      showToast("🎉 체력 최고 레벨(Lv.100)을 이미 달성했습니다!");
      return;
    }
    playSound('click_dumbbell');
    userStats.hpClicks++;
    spawnClickParticle(event, '🏋️', '#20C997');

    const icon = document.getElementById('hpTargetIcon');
    icon.style.transform = 'scale(1.3) rotate(15deg)';
    setTimeout(() => { icon.style.transform = 'scale(1) rotate(0deg)'; }, 70);

    if (userStats.hpClicks >= 50) {
      userStats.hpClicks = 0;
      userStats.hpLevel = Math.min(100, userStats.hpLevel + 1);
      showLevelupModal('체력', userStats.hpLevel, '💪 우사기의 지치지 않는 강철 체력 업!');
    }
    document.getElementById('hpUsagiQuote').textContent = usagiQuotes[Math.floor(Math.random() * usagiQuotes.length)];
  }

  saveStats();
}

function spawnClickParticle(event, emoji, color) {
  const particle = document.createElement('div');
  particle.textContent = `+1 ${emoji}`;
  particle.style.position = 'fixed';
  particle.style.left = `${event.clientX - 20}px`;
  particle.style.top = `${event.clientY - 20}px`;
  particle.style.color = color;
  particle.style.fontWeight = '900';
  particle.style.fontSize = '1.3rem';
  particle.style.fontFamily = "'Jua', sans-serif";
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '9999';
  particle.style.animation = 'floatUpFade 0.6s ease forwards';
  document.body.appendChild(particle);

  setTimeout(() => { particle.remove(); }, 600);
}

// ==============================================================
// 3. 📚 정보처리기사 실기 1000문제 스터디룸 엔진
// ==============================================================
let currentQuizLevel = 1;
let currentQuestions = [];
let currentQuestionIndex = 0;
let levelCorrectCount = 0;
let selectedOptionIndex = null;

function loadQuizLevel(lvl) {
  currentQuizLevel = Math.min(100, Math.max(1, lvl));
  currentQuestions = getQuestionsForLevel(currentQuizLevel);
  currentQuestionIndex = 0;
  levelCorrectCount = 0;
  renderCurrentQuestion();
  updateHUD();
  updateCostumeAvatarSync();
  renderStudyAwakenings();
}

function renderCurrentQuestion() {
  if (!currentQuestions || currentQuestions.length === 0) {
    document.getElementById('quizQuestionText').textContent = "문제를 불러올 수 없습니다.";
    return;
  }

  const q = currentQuestions[currentQuestionIndex];
  document.getElementById('quizCurrentIndex').textContent = currentQuestionIndex + 1;
  document.getElementById('quizCategoryTag').textContent = q.category || "정보처리기사 실기";
  document.getElementById('quizQuestionText').textContent = q.question;

  const optionsList = document.getElementById('quizOptionsList');
  optionsList.innerHTML = '';
  document.getElementById('quizExplanationBox').classList.add('hidden');
  selectedOptionIndex = null;

  q.options.forEach((optText, idx) => {
    const btn = document.createElement('button');
    btn.className = 'quiz-option-btn';
    btn.innerHTML = `<span class="opt-num" style="background:#EDF2F7; padding:2px 8px; border-radius:6px; font-weight:bold;">${idx + 1}</span> ${optText}`;
    btn.onclick = () => handleSelectOption(idx);
    optionsList.appendChild(btn);
  });
}

function handleSelectOption(idx) {
  if (selectedOptionIndex !== null) return; // 이미 답 선택함
  selectedOptionIndex = idx;

  const q = currentQuestions[currentQuestionIndex];
  const optionBtns = document.querySelectorAll('.quiz-option-btn');
  optionBtns.forEach(b => b.classList.add('disabled'));

  const isCorrect = (idx === q.answer);
  if (isCorrect) {
    playSound('correct');
    levelCorrectCount++;
    optionBtns[idx].classList.add('correct');
    optionBtns[idx].innerHTML += ` <i class="fa-solid fa-circle-check" style="margin-left:auto;"></i>`;
  } else {
    playSound('wrong');
    optionBtns[idx].classList.add('wrong');
    optionBtns[idx].innerHTML += ` <i class="fa-solid fa-circle-xmark" style="margin-left:auto;"></i>`;
    // 정답도 초록색으로 표시
    optionBtns[q.answer].classList.add('correct');
  }

  // 해설 박스 노출
  const expBox = document.getElementById('quizExplanationBox');
  document.getElementById('explanationTitle').textContent = isCorrect ? "🎉 정답입니다!" : "💡 오답입니다 (정답 해설)";
  document.getElementById('quizExplanationText').textContent = q.explanation || "정답 해설이 제공되지 않습니다.";
  expBox.classList.remove('hidden');
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < currentQuestions.length) {
    renderCurrentQuestion();
  } else {
    // 10문제 풀이 종료 -> 결과 모달
    finishQuizLevel();
  }
}

function finishQuizLevel() {
  const isPassed = (levelCorrectCount >= 7);
  const resultModal = document.getElementById('quizResultModal');
  const title = document.getElementById('quizResultTitle');
  const scoreText = document.getElementById('quizResultScore');
  const feedback = document.getElementById('quizResultFeedback');
  const icon = document.getElementById('quizResultIcon');
  const nextBtn = document.getElementById('nextLevelQuizBtn');

  scoreText.innerHTML = `10문제 중 <strong>${levelCorrectCount}문제</strong> 정답 (${levelCorrectCount * 10}점)`;

  if (isPassed) {
    playSound('levelup');
    userStats.studyPassedLevels[currentQuizLevel] = true;
    if (currentQuizLevel >= userStats.studyLevel) {
      const prevLvl = userStats.studyLevel;
      userStats.studyLevel = Math.min(100, currentQuizLevel + 1);
      checkStudyAwakeningUnlock(prevLvl, userStats.studyLevel);
    }
    saveStats();

    icon.textContent = "🏆";
    title.textContent = `🎉 Lv.${currentQuizLevel} 스테이지 합격!`;
    feedback.textContent = `축하합니다! 70점 이상 획득하여 공부 레벨이 Lv.${userStats.studyLevel}(으)로 상승했습니다!`;
    nextBtn.style.display = 'inline-block';
  } else {
    playSound('wrong');
    icon.textContent = "😭";
    title.textContent = `Lv.${currentQuizLevel} 불합격 (70점 미달)`;
    feedback.textContent = `아쉬워요! 7문제 이상 맞춰야 합격입니다. 치이카와와 함께 다시 복습해보세요!`;
    nextBtn.style.display = 'none';
  }

  resultModal.classList.remove('hidden');
}

function retryCurrentQuizLevel() {
  document.getElementById('quizResultModal').classList.add('hidden');
  loadQuizLevel(currentQuizLevel);
}

function goToNextQuizLevel() {
  document.getElementById('quizResultModal').classList.add('hidden');
  loadQuizLevel(currentQuizLevel + 1);
}

// 스테이지 선택 모달
function openStageSelectModal() {
  const grid = document.getElementById('stageGrid');
  grid.innerHTML = '';
  for (let lvl = 1; lvl <= 100; lvl++) {
    const btn = document.createElement('button');
    btn.className = 'stage-btn';
    if (userStats.studyPassedLevels[lvl]) {
      btn.classList.add('passed');
      btn.innerHTML = `⭐ Lv.${lvl}`;
    } else if (lvl === currentQuizLevel) {
      btn.classList.add('current');
      btn.innerHTML = `👉 Lv.${lvl}`;
    } else {
      btn.innerHTML = `Lv.${lvl}`;
    }
    btn.onclick = () => {
      closeStageSelectModal();
      loadQuizLevel(lvl);
    };
    grid.appendChild(btn);
  }
  document.getElementById('stageSelectModal').classList.remove('hidden');
}

function closeStageSelectModal() {
  document.getElementById('stageSelectModal').classList.add('hidden');
}

// ==============================================================
// 4. 🍳 하치와레 동굴 주방 (요리 Lv 1~100 미니게임)
// ==============================================================
let isCooking = false;
let cookNeedlePos = 0;
let cookNeedleDir = 1;
let cookAnimFrame = null;
let targetZoneStart = 45;
let targetZoneWidth = 15;

function startCookingGame() {
  if (userStats.cookLevel >= 100) {
    showToast("🎉 요리 최고 레벨(Lv.100)을 이미 달성했습니다!");
    return;
  }
  isCooking = true;
  document.getElementById('cookStartBtn').classList.add('hidden');
  document.getElementById('cookStopBtn').classList.remove('hidden');
  document.getElementById('cookFeedbackMsg').textContent = "온도가 오르내리고 있습니다! 황금 온도 존에서 [불 끄기!]를 누르세요!";

  // 랜덤 타깃 존 설정 (35% ~ 65% 위치)
  targetZoneStart = 35 + Math.random() * 20;
  targetZoneWidth = Math.max(8, 18 - Math.floor(userStats.cookLevel / 10)); // 레벨 오를수록 살짝 좁아짐
  const zoneEl = document.getElementById('tempTargetZone');
  zoneEl.style.left = `${targetZoneStart}%`;
  zoneEl.style.width = `${targetZoneWidth}%`;

  cookNeedlePos = 0;
  cookNeedleDir = 1;
  runCookGauge();
}

function runCookGauge() {
  if (!isCooking) return;
  const speed = 0.9 + (userStats.cookLevel * 0.015);
  cookNeedlePos += speed * cookNeedleDir;

  if (cookNeedlePos >= 100) {
    cookNeedlePos = 100;
    cookNeedleDir = -1;
  } else if (cookNeedlePos <= 0) {
    cookNeedlePos = 0;
    cookNeedleDir = 1;
  }

  document.getElementById('tempNeedle').style.left = `${cookNeedlePos}%`;
  cookAnimFrame = requestAnimationFrame(runCookGauge);
}

function stopHeatGauge() {
  if (!isCooking) return;
  isCooking = false;
  cancelAnimationFrame(cookAnimFrame);
  document.getElementById('cookStartBtn').classList.remove('hidden');
  document.getElementById('cookStopBtn').classList.add('hidden');

  const hitZone = (cookNeedlePos >= targetZoneStart && cookNeedlePos <= targetZoneStart + targetZoneWidth);
  const feedback = document.getElementById('cookFeedbackMsg');

  if (hitZone) {
    playSound('sizzle');
    userStats.cookLevel = Math.min(100, userStats.cookLevel + 1);
    saveStats();
    feedback.innerHTML = `<span style="color:#2B8A3E; font-size:1.15rem;">✨ 완벽한 불조절 성공! 맛있는 요리가 완성되어 요리 Lv.${userStats.cookLevel} 달성! 🍳</span>`;
    showLevelupModal('요리', userStats.cookLevel, `🍳 ${getDishName(userStats.cookLevel)} 레시피 마스터!`);
  } else {
    playSound('wrong');
    feedback.innerHTML = `<span style="color:#E03131; font-size:1.05rem;">💨 불조절 실패! 냄비가 타버렸어요. 다시 도전해보세요!</span>`;
  }
}

// 레벨업 공통 모달
function showLevelupModal(statName, newLvl, badgeText) {
  playSound('levelup');
  document.getElementById('levelupTitle').textContent = `${statName} LEVEL UP!`;
  document.getElementById('levelupDesc').textContent = `치이카와가 더욱 강해졌습니다!`;
  document.getElementById('levelupBadge').textContent = badgeText || `${statName} Lv. ${newLvl} 달성!`;
  document.getElementById('levelupModal').classList.remove('hidden');
}

function closeLevelupModal() {
  document.getElementById('levelupModal').classList.add('hidden');
}

// 토스트 메시지
function showToast(msg) {
  const toast = document.getElementById('toastPopup');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2200);
}

// 사운드 토글
document.getElementById('soundToggleBtn').addEventListener('click', () => {
  userStats.soundEnabled = !userStats.soundEnabled;
  const icon = document.getElementById('soundIcon');
  const text = document.getElementById('soundText');
  if (userStats.soundEnabled) {
    icon.className = 'fa-solid fa-volume-high';
    text.textContent = '효과음 ON';
    playSound('correct');
    showToast('효과음이 켜졌습니다 🎶');
  } else {
    icon.className = 'fa-solid fa-volume-xmark';
    text.textContent = '효과음 OFF';
    showToast('효과음이 꺼졌습니다 🤫');
  }
  saveStats();
});

// 초기화
function initAllModules() {
  updateHUD();
  updateCostumeAvatarSync();
  renderStudyAwakenings();
  loadQuizLevel(userStats.studyLevel);
}

window.addEventListener('DOMContentLoaded', () => {
  initAllModules();
});


// 퀴즈 및 훈련 키보드 조작 지원
window.addEventListener('keydown', (e) => {
  // 스터디 룸 활성 시 1~4 숫자키로 보기 선택 & Enter/Space로 다음 문제
  if (activeTab === 'study') {
    if (['1', '2', '3', '4'].includes(e.key)) {
      const idx = parseInt(e.key, 10) - 1;
      const btns = document.querySelectorAll('.quiz-option-btn');
      if (btns[idx] && !btns[idx].classList.contains('disabled')) {
        handleSelectOption(idx);
      }
    } else if (e.key === 'Enter' || e.key === ' ') {
      const expBox = document.getElementById('quizExplanationBox');
      if (expBox && !expBox.classList.contains('hidden')) {
        e.preventDefault();
        nextQuestion();
      }
    }
  } else if (activeTab === 'gym') {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleClickTraining(activeGymSubtab, { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
    }
  }
});

// ==============================================================
// 📚 공부 레벨 5대 특수 비기 해방 시스템 (Study Awakenings)
// ==============================================================
const STUDY_AWAKENINGS = [
  {
    level: 10,
    id: "insight",
    icon: "🔍",
    name: "약점 투시안 (Weakness Insight)",
    desc: "치이카와가 적의 움직임 패턴을 꿰뚫어봅니다!",
    effect: "토벌전/바벨탑 상시 크리티컬 확률 +5% & 적 공격 타이밍 가이드 강화"
  },
  {
    level: 25,
    id: "slow_parry",
    icon: "⏱️",
    name: "타임 슬로우 패링 (Slow-Motion Parry)",
    desc: "침착하게 적의 공격 궤적을 예측하여 방어합니다!",
    effect: "저스트 패링 판정 시간 완화 (0.42s ➡️ 0.55s) & 패링 시 적 공격 게이지 20% 감소"
  },
  {
    level: 50,
    id: "weed_master",
    icon: "📜",
    name: "제초 5급 필기 마스터 (Exam Genius)",
    desc: "지식을 총동원하여 잡초의 급소를 공략합니다!",
    effect: "제초 검정(메인홈) 점수 +20% 추가 보너스 & 토벌전 기본 공격력 +30 영구 증가"
  },
  {
    level: 75,
    id: "code_breaker",
    icon: "⚡",
    name: "코드 브레이커 - 절대 스턴 (Code Breaker)",
    desc: "정보처리기사의 알고리즘 해체 능력으로 적을 무력화!",
    effect: "약점 분석 스킬(C키) 발동 시 즉시 몬스터에게 고정 관통타 + 1.5초간 완전 마비(스턴) 부여"
  },
  {
    level: 100,
    id: "summa_laude",
    icon: "👑",
    name: "수석 합격자의 지혜의 오라 (Summa Cum Laude)",
    desc: "1,000제를 모두 정복한 먼작귀의 궁극적 지성체!",
    effect: "전투 중 모든 크리티컬 피해 3.0배로 초극딜 증폭 & 패링 성공 시 체력 10% 즉시 자가 치유"
  }
];

function renderStudyAwakenings() {
  const grid = document.getElementById('studyAwakeningGrid');
  if (!grid) return;
  grid.innerHTML = '';

  let unlockedCount = 0;
  STUDY_AWAKENINGS.forEach(item => {
    const isUnlocked = (userStats.studyLevel >= item.level);
    if (isUnlocked) unlockedCount++;

    const div = document.createElement('div');
    div.className = `awakening-item ${isUnlocked ? 'unlocked' : 'locked'}`;
    div.innerHTML = `
      <div class="awakening-icon-box">${isUnlocked ? item.icon : '🔒'}</div>
      <div class="awakening-content">
        <div class="awakening-req-row">
          <span class="awakening-lvl-tag">Lv.${item.level} 해방</span>
          <span class="awakening-status-tag">${isUnlocked ? '✨ 해방 완료' : '🔒 잠김'}</span>
        </div>
        <h4 class="awakening-name">${item.name}</h4>
        <p class="awakening-desc">${item.desc}</p>
        <div class="awakening-effect">⚡ ${item.effect}</div>
      </div>
    `;
    grid.appendChild(div);
  });

  const countBadge = document.getElementById('studyAwakeningCount');
  if (countBadge) countBadge.textContent = `${unlockedCount} / ${STUDY_AWAKENINGS.length} 해방`;
}

function checkStudyAwakeningUnlock(prevLevel, newLevel) {
  const newlyUnlocked = STUDY_AWAKENINGS.find(item => prevLevel < item.level && newLevel >= item.level);
  if (newlyUnlocked) {
    showStudyAwakeningModal(newlyUnlocked);
  }
}

function showStudyAwakeningModal(item) {
  playSound('levelup');
  const modal = document.getElementById('studyAwakeningModal');
  if (!modal) return;

  document.getElementById('awakeningPopupIcon').textContent = item.icon;
  document.getElementById('awakeningPopupTitle').textContent = `${item.name} 해방!`;
  document.getElementById('awakeningPopupLevel').textContent = `공부 Lv.${item.level} 달성 특수 비기`;
  document.getElementById('awakeningPopupDesc').textContent = item.desc;
  document.getElementById('awakeningPopupEffect').textContent = `⚡ 특수 효과: ${item.effect}`;
  modal.classList.remove('hidden');
}

function closeStudyAwakeningModal() {
  document.getElementById('studyAwakeningModal').classList.add('hidden');
}

// 10연타 버닝 트레이닝
function handleTurboTraining(type, event) {
  for (let i = 0; i < 10; i++) {
    handleClickTraining(type, event);
  }
  showToast(`🔥 10연타 버닝 훈련 완료! (레벨업 가속 중!)`);
}

// 키보드 Space / Enter 훈련 지원
window.addEventListener('keydown', (e) => {
  if (activeTab === 'gym') {
    if (e.code === 'Space' || e.code === 'Enter') {
      e.preventDefault();
      handleClickTraining(activeGymSubtab, { clientX: window.innerWidth / 2, clientY: window.innerHeight / 2 });
    }
  }
});

// 코스튬 아바타 동기화
function updateCostumeAvatarSync() {
  try {
    const mData = localStorage.getItem('chiikawa_myroom_data');
    if (mData) {
      const parsed = JSON.parse(mData);
      const equipped = parsed.equippedCostume;
      if (equipped && equipped !== 'default') {
        const costIcons = {
          pajamas: '👚', armor: '🛡️', chef: '👨‍🍳', raincoat: '🌧️', golden: '👑', ribbon: '🎀'
        };
        const wrap = document.querySelector('.profile-avatar-wrap');
        if (wrap) {
          let badge = document.getElementById('equippedCostumeBadge');
          if (!badge) {
            badge = document.createElement('div');
            badge.id = 'equippedCostumeBadge';
            badge.className = 'costume-mini-badge';
            wrap.appendChild(badge);
          }
          badge.textContent = costIcons[equipped] || '✨';
        }
      }
    }
  } catch(e) {}
}
