
// 먼작귀 공식 작중 등장 괴물 & 키메라 데이터베이스 (실패 시 소환)
const monsterFailData = [
  {
    id: "anoko",
    name: "붉은 뿔의 거대 괴물 '아노코 (あのこ)'",
    dangerLevel: "위험 등급: EX (토벌 불가능)",
    badge: "비운의 변이 친구",
    icon: "👹",
    quote: "“이런 게 되어버렸다... (こんなになっちゃった...) 하지만 450점도 못 내는 너희보단 지금의 내가 훨씬 강해... 후후...”",
    lore: "옛날에 치이카와와 함께 일하며 작은 개구리 인형을 자랑하던 친구였지만, 강함을 갈망하다 거대 괴물로 변해버린 존재! 450점을 넘지 못한 당신을 비웃듯 내려다보고 있습니다.",
    themeColor: "#C92A2A",
    bgGradient: "linear-gradient(135deg, #FFE3E3, #FFA8A8)"
  },
  {
    id: "chimera_original",
    name: "초기 비행 키메라 (こんなになっちゃった)",
    dangerLevel: "위험 등급: S (포획 요망)",
    badge: "눈물의 변이 키메라",
    icon: "🦇",
    quote: "“이런 게 되어버렸어... 이런 모습이 되어버린 이상... 어쩔 수 없잖아아앗!! (こんなになっちゃったからにはーッ!!)”",
    lore: "원래 평범한 치이카와족이었으나 어느 날 갑자기 날개와 발톱이 돋아나 괴물이 되어버린 비극의 키메라! 눈물을 뚝뚝 흘리며 당신을 향해 날아듭니다.",
    themeColor: "#862E9C",
    bgGradient: "linear-gradient(135deg, #F3D9FA, #E599F7)"
  },
  {
    id: "dekatsuyo",
    name: "몸을 빼앗긴 거대 털괴물 '데카츠요 (でかつよ)'",
    dangerLevel: "위험 등급: A (정신 붕괴)",
    badge: "원조 영혼의 절규",
    icon: "🐺",
    quote: "“내 몸 돌려줘어어어어-ッ!! (カラダかえせーッ!!) 450점도 못 넘기는 녀석의 몸따윈 필요 없지만... 으아앙-!!”",
    lore: "원래 귀여운 모몽가의 몸이었으나 영혼 교환 마법으로 몸을 빼앗겨 거대 괴물이 된 비운의 주인공! 모몽가를 쫓아다니며 서럽게 울부짖고 있습니다.",
    themeColor: "#364FC7",
    bgGradient: "linear-gradient(135deg, #DBE4FF, #91A7FF)"
  },
  {
    id: "goblin",
    name: "지하 감옥의 녹색 고블린 (ゴブリン)",
    dangerLevel: "위험 등급: A (집단 포획)",
    badge: "거대 가마솥 간수",
    icon: "👺",
    quote: "“잡았다! 450점도 못 채운 죄로 즉시 대형 솥단지에 넣고 거인 수프를 끓여버리겠다!!”",
    lore: "치이카와와 친구들을 지하 감옥에 가두고 거대한 포크와 나이프로 위협하며 가마솥 수프를 끓이려던 무자비한 고블린 무리입니다!",
    themeColor: "#2B8A3E",
    bgGradient: "linear-gradient(135deg, #D3F9D8, #8CE99A)"
  },
  {
    id: "black_trio",
    name: "춤추는 불길한 '검은 삼인조 (검은 별)'",
    dangerLevel: "위험 등급: S (영구 세뇌)",
    badge: "심야의 기괴 댄서",
    icon: "⭐",
    quote: "“댄스 타임이다! 450점을 못 넘긴 녀석은 영원히 멈추지 않고 춤춰야 해~ 루라라~♬”",
    lore: "기괴한 음악과 함께 나타나 주변을 어둡게 물들이고 상대를 세뇌시켜 영원히 춤추게 만드는 밤의 공포의 침략자들!",
    themeColor: "#212529",
    bgGradient: "linear-gradient(135deg, #E9ECEF, #CED4DA)"
  },
  {
    id: "giant_snake",
    name: "동굴의 거대 맹독 오오쟈 (大蛇)",
    dangerLevel: "위험 등급: S (극독 주의)",
    badge: "동굴의 지배자",
    icon: "🐍",
    quote: "“샤아아아악-!! 10초에 450점도 못 채우고 내 굴로 기어들어오다니... 아주 맛있는 먹잇감이로군!”",
    lore: "삿갓창(사스마타) 없이는 절대 마주쳐선 안 되는 어둠 속 거대 파충류 괴물! 날카로운 송곳니를 번뜩이고 있습니다.",
    themeColor: "#E8590C",
    bgGradient: "linear-gradient(135deg, #FFE8CC, #FFB088)"
  },
  {
    id: "parasite_mushroom",
    name: "기생 포자 버섯 괴물 (キノコ)",
    dangerLevel: "위험 등급: B (기생 감염)",
    badge: "머리통 버섯 농장",
    icon: "🍄",
    quote: "“포자 발사~! 머리 위에 버섯이나 자라라! 450점도 못 뽑는 머리통엔 버섯 농사가 딱이야!”",
    lore: "치이카와의 머리에 기생 버섯을 심어 에너지를 쪽쪽 빨아먹던 얄미운 숲의 포자 괴물입니다!",
    themeColor: "#9C36B5",
    bgGradient: "linear-gradient(135deg, #F3D9FA, #DA77F2)"
  },
  {
    id: "night_stalker",
    name: "심야의 강습 박쥐 키메라",
    dangerLevel: "위험 등급: A (야간 기습)",
    badge: "상공의 약탈자",
    icon: "🦅",
    quote: "“끼에에엑-!! 제초 면허 5급도 없는 풋내기 발견! 오늘 밤 토벌대의 야식으로 당첨이다!”",
    lore: "밤마다 상공에서 붉은 눈을 번뜩이며 방심한 치이카와족을 낚아채는 공중 강습 키메라입니다!",
    themeColor: "#495057",
    bgGradient: "linear-gradient(135deg, #DEE2E6, #ADB5BD)"
  }
];

// 먼작귀(치이카와) 인터랙티브 웹 스크립트

let soundEnabled = true;
let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
}

function playSound(type) {
  if (!soundEnabled) return;
  try {
    initAudio();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'pop') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    } else if (type === 'bonus') {
      const notes = [587.33, 739.99, 880, 1174.66];
      notes.forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.2, now + i * 0.04);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.04 + 0.1);
        o.start(now + i * 0.04);
        o.stop(now + i * 0.04 + 0.1);
      });
    } else if (type === 'chiikawa') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.2);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'hachiware') {
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = freq;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.15, now + i * 0.08);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.15);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.15);
      });
    } else if (type === 'usagi') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.18);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'stamp') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.15);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.18);
      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'gacha') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.setValueAtTime(800, now + 0.08);
      osc.frequency.setValueAtTime(1000, now + 0.16);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'danger') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.linearRampToValueAtTime(90, now + 0.2);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'monster') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.linearRampToValueAtTime(45, now + 0.35);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'fail') {
      const failNotes = [260, 220, 180, 100];
      failNotes.forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'sawtooth';
        o.frequency.value = f;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.3, now + i * 0.14);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.14 + 0.25);
        o.start(now + i * 0.14);
        o.stop(now + i * 0.14 + 0.25);
      });
    } else if (type === 'pass') {
      const passNotes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      passNotes.forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.25, now + i * 0.08);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.3);
      });
    }
  } catch (e) {
    console.log("Audio play error", e);
  }
}

document.getElementById('soundToggleBtn').addEventListener('click', () => {
  soundEnabled = !soundEnabled;
  const icon = document.getElementById('soundIcon');
  const text = document.getElementById('soundText');
  if (soundEnabled) {
    icon.className = 'fa-solid fa-volume-high';
    text.textContent = '효과음 ON';
    playSound('pop');
    showToast('효과음이 켜졌습니다 🎶');
  } else {
    icon.className = 'fa-solid fa-volume-xmark';
    text.textContent = '효과음 OFF';
    showToast('효과음이 꺼졌습니다 🤫');
  }
});

function showToast(msg) {
  const toast = document.getElementById('toastPopup');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2200);
}

const characterQuotes = {
  chiikawa: [
    "와... 와아...! (눈물 글썽)",
    "후에에... 열심히 할게!",
    "친구들이랑 먹는 푸딩이 최고야 🍮",
    "제초 5급 꼭 합격할 거야...!",
    "에잇! (분홍 삿갓창을 쥐며)"
  ],
  hachiware: [
    "난토카나레-! (어떻게든 될 거야!)",
    "이거... 사버렸어! 📷",
    "혼자가 아니니까 괜찮아, 같이 노래하자 🎸",
    "내가 동굴에서 맛있는 밥 만들어 줄게!",
    "치이카와, 포기하지 않으면 분명 해낼 수 있어!"
  ],
  usagi: [
    "이야하-! ⚡",
    "우라우라~ 우라라~!",
    "푸루루루루루- 챱!",
    "하~? (팔짱을 끼며)",
    "이야하하-! (당근을 흔들며)"
  ]
};

function playCharacterGreeting(char) {
  playSound(char);
  const bubble = document.getElementById(`bubble-${char}`);
  const quotes = characterQuotes[char];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  bubble.textContent = randomQuote;
  bubble.classList.add('active');
  setTimeout(() => {
    bubble.classList.remove('active');
  }, 2500);
}

function triggerCharAction(char) {
  playSound(char);
  const card = document.getElementById(`card-${char}`);
  card.style.transform = "scale(0.96)";
  setTimeout(() => {
    card.style.transform = "";
  }, 180);

  const quotes = characterQuotes[char];
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  const nameMap = { chiikawa: '치이카와 🌸', hachiware: '하치와레 📘', usagi: '우사기 🧀' };
  showToast(`${nameMap[char]}: "${randomQuote}"`);
}

const fortuneList = [
  {
    char: "치이카와의 응원 🌸",
    quote: "“후에에... 그래도 포기하지 않을 거야!”",
    detail: "오늘은 작은 실수가 있어도 친구의 도움으로 멋지게 해결되는 따뜻한 날이에요!",
    item: "달콤한 딸기 푸딩 🍮"
  },
  {
    char: "하치와레의 긍정 📘",
    quote: "“난토카나레! 어떻게든 될 거야!”",
    detail: "걱정하던 고민이 시원하게 풀리고 새로운 행운이 찾아오는 날입니다. 자신감을 가지세요!",
    item: "따뜻한 핫초코 & 필름 카메라 📸"
  },
  {
    char: "우사기의 번개 파워 🧀",
    quote: "“이야하-! 우라우라 푸루루루!”",
    detail: "텐션과 에너지가 최고조에 달하는 날! 도전하고 싶었던 일이 있다면 망설이지 말고 직진하세요!",
    item: "바삭바삭한 야채 튀김 & 당근 🥕"
  },
  {
    char: "삼총사의 우정 🍡",
    quote: "“다 같이 있으면 무서운 것도 이겨낼 수 있어!”",
    detail: "주변 사람들과의 소소한 대화 속에서 큰 행복과 위로를 발견하게 될 멋진 하루입니다.",
    item: "알록달록 달콤한 별사탕 ⭐"
  },
  {
    char: "하치와레의 선물 🎁",
    quote: "“이거 너 주려고 샀어!”",
    detail: "기대하지 않았던 뜻밖의 선물이나 기분 좋은 소식이 도착할 징조예요!",
    item: "리본 달린 귀여운 찻잔 ☕"
  }
];

function drawFortune() {
  playSound('gacha');
  const sphere = document.getElementById('capsuleSphere');
  const resultCard = document.getElementById('fortuneResult');
  const btn = document.getElementById('gachaPullBtn');

  btn.disabled = true;
  sphere.classList.add('spinning');
  resultCard.classList.add('hidden');

  setTimeout(() => {
    sphere.classList.remove('spinning');
    btn.disabled = false;
    playSound('chiikawa');

    const fortune = fortuneList[Math.floor(Math.random() * fortuneList.length)];
    document.getElementById('fortuneCharacterBadge').textContent = fortune.char;
    document.getElementById('fortuneQuote').textContent = fortune.quote;
    document.getElementById('fortuneDetail').textContent = fortune.detail;
    document.getElementById('luckyItem').textContent = fortune.item;

    resultCard.classList.remove('hidden');
    showToast("새로운 오늘의 운세가 도착했어요! ✨");
  }, 850);
}

// 4. 10초 스피드 제초 게임 시스템 (0.4초 간격 & 450점 목표 밸런스)
let gameTimer = null;
let spawnTimer = null;
let gameScore = 0;
let timeLeft = 10;
let gameCombo = 0;
let maxCombo = 0;
let isPlaying = false;

// 10초 / 0.4초(400ms) 간격 설정
const GAME_CONFIG = {
  duration: 10,
  spawnInterval: 260, // 0.26초 간격 (초고속 폭풍 스폰)
  despawnTime: 650,   // 0.65초 유지
  passScore: 450,     // 목표 점수 450점!
  dangerChance: 0.16,
  monsterChance: 0.12,
  goldChance: 0.26,
  normalWeedChance: 0.46
};

const failMemes = [{"img": "assets/fail/fail_01.jpg", "title": "🍚 밥 찾는 하치와레", "quote": "“밥... 밥...? 10초 동안 450점도 못 넘겼는데 밥이 넘어가냐?!”", "desc": "밥 먹을 자격 박탈! 450점 넘길 때까지 밥이고 뭐고 풀밭으로 직행입니다!"}, {"img": "assets/fail/fail_02.jpg", "title": "🏋️ 근손실 온 헬스 치이카와", "quote": "“아... 제초하니까 근손실 나네. 넌 안되겠다 헬스장으로 따라와.”", "desc": "그 손가락 근력으로는 잡초 하나도 못 뽑습니다. 덤벨 20kg 들고 스쿼트 500개 실시!"}, {"img": "assets/fail/fail_03.jpg", "title": "🫠 기괴한 치이카와 일껄", "quote": "“치... 이... 카... 와... 일... 껄...? (흐물흐물 녹아내리는 중)”", "desc": "내가 치이카와인지 덜 구워진 감자 반죽인지도 모르겠는데... 10초 450점도 못 내는 네 손가락은 더 요상망측하구나!"}, {"img": "assets/fail/fail_04.jpg", "title": "🍼 플랑크톤 모몽가 & 베이비 치이카와", "quote": "“응애! 플랑크톤 모몽가도 450점은 넘기겠다! 베이비보다 못 뽑는 거 실화냐?!”", "desc": "비법 게살버거 레시피는커녕 잡초도 못 훔칠 실력... 포대기 싸고 집으로 가라!"}, {"img": "assets/fail/fail_05.jpg", "title": "🚫 퇴근 압수당한 하치와레", "quote": "“퇴근...? 10초 만에 450점도 못 넘긴 녀석에게 오늘 퇴근이란 없다!!”", "desc": "집에 갈 생각은 꿈도 꾸지 마라! 450점 넘길 때까지 동굴 제초 무한 잔업 확정이야!!"}, {"img": "assets/fail/fail_06.jpg", "title": "⚔️ 진격의 치이카와 (초대형 거인)", "quote": "“그날 인류는 떠올렸다... 10초 450점을 넘지 못한 치이카와의 굴욕을...!”", "desc": "구축해주마... 이 세상의 450점 미만 점수를 한 놈도 남김없이...!"}, {"img": "assets/fail/fail_07.jpg", "title": "🍄 헤네시스 메이플 주황버섯 & 치이카와", "quote": "“헤네시스 주황버섯 점프력보다 못한 10초 450점 미달 제초 실력...!”", "desc": "달팽이 세 마리 스킬도 아깝다! 리스항구 가서 파란달팽이나 잡고 레벨업해서 다시 와라!"}, {"img": "assets/fail/fail_08.jpg", "title": "💪 극초근육질 치이카와", "quote": "“내가 마우스 잡아도 10초에 450점은 넘음ㅋ 3대 500 치고 와라.”", "desc": "가슴 근육이 화가 잔뜩 났습니다. 450점 넘길 때까지 쇠질 징역 선고!"}];

function startGame() {
  playSound('pop');
  document.getElementById('gameOverlay').classList.add('hidden');
  
  gameScore = 0;
  timeLeft = GAME_CONFIG.duration;
  gameCombo = 0;
  maxCombo = 0;
  isPlaying = true;
  updateHUD();

  clearHoles();

  if (gameTimer) clearInterval(gameTimer);
  if (spawnTimer) clearInterval(spawnTimer);

  gameTimer = setInterval(() => {
    timeLeft--;
    updateHUD();

    if (timeLeft <= 0) {
      endGame();
    }
  }, 1000);

  spawnTimer = setInterval(spawnTarget, GAME_CONFIG.spawnInterval);
}

function updateHUD() {
  document.getElementById('gameScore').textContent = gameScore;
  document.getElementById('gameTime').textContent = timeLeft;
  document.getElementById('gameCombo').textContent = gameCombo;
}

function clearHoles() {
  const holes = document.querySelectorAll('.hole-content');
  holes.forEach(h => h.innerHTML = '');
}

function spawnTarget() {
  if (!isPlaying) return;
  const holes = document.querySelectorAll('.hole-content');
  const emptyHoles = Array.from(holes).filter(h => h.children.length === 0);
  if (emptyHoles.length === 0) return;

  // 1~2개 동시 팝업
  const spawnCount = Math.random() < 0.6 ? 2 : 1;

  for (let i = 0; i < spawnCount && emptyHoles.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * emptyHoles.length);
    const targetHole = emptyHoles.splice(randomIndex, 1)[0];
    const rand = Math.random();

    const targetEl = document.createElement('div');

    if (rand < GAME_CONFIG.monsterChance) {
      targetEl.className = 'danger-target monster-target';
      targetEl.textContent = '👾';
      targetEl.onclick = () => hitMonster(targetEl);
    } else if (rand < GAME_CONFIG.monsterChance + GAME_CONFIG.dangerChance) {
      targetEl.className = 'danger-target';
      targetEl.textContent = '⚠️';
      targetEl.onclick = () => hitDanger(targetEl);
    } else if (rand < GAME_CONFIG.monsterChance + GAME_CONFIG.dangerChance + GAME_CONFIG.goldChance) {
      targetEl.className = 'weed-target gold-target';
      targetEl.textContent = '🍀';
      targetEl.onclick = () => catchWeed(targetEl, 70, true);
    } else {
      targetEl.className = 'weed-target';
      targetEl.textContent = '🌱';
      targetEl.onclick = () => catchWeed(targetEl, 30, false);
    }

    targetHole.appendChild(targetEl);

    setTimeout(() => {
      if (targetEl.parentElement) {
        if (!targetEl.classList.contains('danger-target')) {
          gameCombo = 0;
          updateHUD();
        }
        targetEl.remove();
      }
    }, GAME_CONFIG.despawnTime);
  }
}

function catchWeed(el, pts, isGold) {
  if (!isPlaying) return;
  if (isGold) {
    playSound('bonus');
    gameCombo += 2;
  } else {
    playSound('pop');
    gameCombo += 1;
  }

  if (gameCombo > maxCombo) maxCombo = gameCombo;

  // 콤보 보너스
  const comboBonus = gameCombo >= 10 ? 10 : (gameCombo >= 5 ? 5 : 0);
  gameScore += pts + comboBonus;
  updateHUD();

  el.textContent = isGold ? '🌟' : '✨';
  el.style.transform = 'scale(1.25) rotate(20deg)';
  setTimeout(() => {
    if (el.parentElement) el.remove();
  }, 90);
}

function hitDanger(el) {
  if (!isPlaying) return;
  playSound('danger');
  gameCombo = 0;
  gameScore = Math.max(0, gameScore - 20);
  updateHUD();
  shakeGameBoard();
  showToast("으악! 위험 생물! (-20점 & 콤보리셋) 💥");
  el.textContent = '💥';
  setTimeout(() => {
    if (el.parentElement) el.remove();
  }, 140);
}

function hitMonster(el) {
  if (!isPlaying) return;
  playSound('monster');
  gameCombo = 0;
  gameScore = Math.max(0, gameScore - 40);
  updateHUD();
  shakeGameBoard(true);
  showToast("🚨 키메라 괴물 피격! 대형 감점 (-40점 & 콤보리셋) 🚨");
  el.textContent = '💀';
  setTimeout(() => {
    if (el.parentElement) el.remove();
  }, 180);
}

function shakeGameBoard(isHeavy = false) {
  const board = document.getElementById('gameBoard');
  board.classList.remove('shake', 'shake-heavy');
  void board.offsetWidth;
  board.classList.add(isHeavy ? 'shake-heavy' : 'shake');
  setTimeout(() => {
    board.classList.remove('shake', 'shake-heavy');
  }, 350);
}

function endGame() {
  isPlaying = false;
  clearInterval(gameTimer);
  clearInterval(spawnTimer);
  clearHoles();

  const overlay = document.getElementById('gameOverlay');
  const title = document.getElementById('overlayTitle');
  const desc = document.getElementById('overlayDesc');
  const btn = document.getElementById('startGameBtn');

  overlay.classList.remove('hidden');

  // 450점 미만 FAIL 판정
  if (gameScore < GAME_CONFIG.passScore) {
    playSound('fail');
    const randomMonster = monsterFailData[Math.floor(Math.random() * failMemes.length)];
    
    title.innerHTML = `
      <div class="fail-banner">
        <span class="fail-stamp-badge">FAIL ❌</span>
        <div class="fail-score-text">최종 점수: <span style="color:#FF3B5C; font-size:2.3rem;">${gameScore}점</span> (450점 미달!)</div>
      </div>
    `;

    desc.innerHTML = `
      <div class="fail-meme-card">
        <div class="fail-meme-img-wrap">
          <img src="${randomMeme.img}" alt="이상한 먼작귀" class="fail-meme-img" onerror="this.src='assets/chiikawa.png'">
        </div>
        <div class="fail-meme-info">
          <div class="fail-meme-title">${randomMeme.title}</div>
          <div class="fail-meme-quote">${randomMeme.quote}</div>
          <p class="fail-meme-desc">${randomMeme.desc}</p>
        </div>
      </div>
      <div style="color:var(--text-muted); font-size:0.95rem; margin-top:8px;">
        최대 콤보: <strong>${maxCombo} COMBO</strong> | 목표: <strong>450점 돌파</strong>
      </div>
    `;

    btn.className = 'btn btn-primary fail-retry-btn';
    btn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> 10초 특훈 후 다시 도전하기!';
  } else {
    // 450점 돌파 기적의 PASS 성공!
    playSound('pass');
    title.innerHTML = `
      <div class="pass-banner">
        <span class="pass-stamp-badge">PASS 💮</span>
        <div class="pass-score-text">최종 점수: <span style="color:#2E9E44; font-size:2.4rem;">${gameScore}점</span> (450점 돌파 성공!!)</div>
      </div>
    `;

    desc.innerHTML = `
      <div class="pass-card">
        <div class="pass-img-wrap">
          <img src="assets/usagi.png" alt="성공 우사기" class="pass-img">
        </div>
        <div class="pass-info">
          <div class="pass-title">🏆 10초 스피드 마스터 합격!</div>
          <div class="pass-quote">“이야하-!! 우라우라!! 완벽하게 합격이다!!”</div>
          <p class="pass-desc">10초 동안 놀라운 순발력으로 450점을 돌파하셨습니다! 참 잘했어요!</p>
        </div>
      </div>
      <div style="color:var(--text-muted); font-size:0.95rem; margin-top:8px;">
        최대 콤보: <strong>${maxCombo} COMBO</strong> | 순발력 챔피언!
      </div>
    `;

    btn.className = 'btn btn-primary pass-retry-btn';
    btn.innerHTML = '<i class="fa-solid fa-trophy"></i> 기록 갱신 다시 도전!';
  }
}

// 5. 칭찬 스티커 도장판
const stampIcons = ['💮', '🌸', '⭐', '🍀', '🍡', '🍮'];

function stampTask(card) {
  const slot = card.querySelector('.stamp-slot');
  if (slot.classList.contains('stamped')) {
    slot.classList.remove('stamped');
    slot.innerHTML = '<span class="stamp-placeholder">도장 찍기</span>';
    playSound('pop');
  } else {
    playSound('stamp');
    const randomIcon = stampIcons[Math.floor(Math.random() * stampIcons.length)];
    slot.classList.add('stamped');
    slot.innerHTML = `<span style="font-size: 2.3rem; color: #E85D75; text-shadow: 0 2px 4px rgba(0,0,0,0.1);">${randomIcon}</span>`;
    showToast("참 잘했어요! 칭찬 도장 쾅! 💮");
  }
}

function addCustomTask() {
  const input = document.getElementById('todoInput');
  const text = input.value.trim();
  if (!text) {
    showToast("할 일이나 목표를 적어주세요! ✏️");
    return;
  }

  playSound('pop');
  const grid = document.getElementById('taskGrid');
  const card = document.createElement('div');
  card.className = 'task-card';
  card.onclick = () => stampTask(card);
  card.innerHTML = `
    <div class="task-text">${escapeHtml(text)}</div>
    <div class="stamp-slot"><span class="stamp-placeholder">도장 찍기</span></div>
  `;
  grid.appendChild(card);
  input.value = '';
  showToast("새로운 칭찬 목표가 추가되었어요! 📝");
}

function escapeHtml(string) {
  return String(string).replace(/[&<>"']/g, function (s) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[s];
  });
}

// 6. 배경 구름 & 반짝이
function createBackgroundElements() {
  const bg = document.getElementById('floatingBg');
  if (!bg) return;

  for (let i = 0; i < 5; i++) {
    const cloud = document.createElement('div');
    cloud.className = 'cloud-item';
    const size = Math.random() * 80 + 80;
    cloud.style.width = `${size}px`;
    cloud.style.height = `${size * 0.45}px`;
    cloud.style.top = `${Math.random() * 80}%`;
    cloud.style.left = `${Math.random() * 100}%`;
    cloud.style.animationDuration = `${Math.random() * 20 + 25}s`;
    cloud.style.animationDelay = `${Math.random() * -20}s`;
    bg.appendChild(cloud);
  }

  const sparkles = ['✨', '🌸', '⭐', '🍡'];
  for (let i = 0; i < 12; i++) {
    const sp = document.createElement('div');
    sp.className = 'sparkle-item';
    sp.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
    sp.style.top = `${Math.random() * 95}%`;
    sp.style.left = `${Math.random() * 95}%`;
    sp.style.animationDelay = `${Math.random() * 3}s`;
    bg.appendChild(sp);
  }
}

window.addEventListener('DOMContentLoaded', () => {
  createBackgroundElements();
  console.log("🌸 먼작귀(치이카와) 웹페이지 로드 완료!");
});
