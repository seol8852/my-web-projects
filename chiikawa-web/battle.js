
function triggerSlowmoFinish() {
  const arena = document.getElementById('battleArena');
  if (arena) {
    arena.style.transition = 'filter 0.15s ease, transform 0.15s ease';
    arena.style.filter = 'brightness(1.2) contrast(1.15)';
    arena.style.transform = 'scale(1.02)';
    setTimeout(() => {
      arena.style.filter = 'none';
      arena.style.transform = 'none';
    }, 350);
  }
}
// ==============================================================
// 치이카와 몬스터 토벌전 - 100레벨 비례 스케일링 액션 배틀 엔진 (battle.js)
// ==============================================================

// 1. 유저 훈련 능력치 로드
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

function loadUserStats() {
  try {
    const data = localStorage.getItem('chiikawa_training_stats');
    if (data) return Object.assign({}, DEFAULT_STATS, JSON.parse(data));
  } catch (e) {
    console.error("Stats load error", e);
  }
  return Object.assign({}, DEFAULT_STATS);
}

let userStats = loadUserStats();

// 2. 50 스테이지 몬스터 데이터베이스 (특수 비기 완벽 대응 하이엔드 스케일링)
// 공식: 권장 훈련 레벨 = Stage * 2 (Stage 1: Lv.2 -> Stage 25: Lv.50 -> Stage 50: Lv.100)
// 공부 비기(크리티컬 3배, 스턴, 패링 치유)와 요리 힐링, 10대 트로피 버프를 모두 총동원해야 클리어 가능!
const STAGE_DATABASE = [];

for (let s = 1; s <= 50; s++) {
  let type = "normal";
  let name = `숲의 위험 생물 ${s}`;
  let icon = "🐛";
  let badge = "일반 몬스터";
  let reqLevel = Math.min(100, Math.max(2, s * 2));
  
  // 특수 비기(3배 크리티컬/스턴/패링힐) 대응 고난이도 HP 및 ATK 스케일링
  let hp = Math.floor(450 + s * 220 + Math.pow(s, 2.32) * 28);
  let atk = Math.floor(25 + s * 16 + Math.pow(s, 1.5) * 5.8);
  let speed = Math.max(1.2, 2.6 - (s * 0.028)); // 공격 장전 속도(초)
  let quote = "“키에에엑-!!”";

  if (s === 5) {
    type = "miniboss";
    name = "🚨 지하 감옥 고블린 돌격대장";
    icon = "👺";
    badge = "🚨 미니 보스";
    hp = 3500;
    atk = 110;
    speed = 2.25;
    quote = "“잡았다! 거인 수프 재료가 되어라!”";
  } else if (s === 10) {
    type = "boss";
    name = "👑 눈물의 비행 키메라 (변이체)";
    icon = "🦇";
    badge = "👑 대형 보스 (약점투시 필요)";
    hp = 12000;
    atk = 240;
    speed = 2.05;
    quote = "“이런 모습이 되어버렸어... 어쩔 수 없잖아아앗!!”";
  } else if (s === 15) {
    type = "miniboss";
    name = "🚨 기생 거대 포자 버섯 (키노코)";
    icon = "🍄";
    badge = "🚨 미니 보스";
    hp = 25000;
    atk = 380;
    speed = 1.9;
    quote = "“포자 폭격! 머리에 버섯이나 자라라!”";
  } else if (s === 20) {
    type = "boss";
    name = "👑 지하 감옥 가마솥 거대 고블린 킹";
    icon = "🍲";
    badge = "👑 대형 보스 (슬로우패링 필요)";
    hp = 48000;
    atk = 580;
    speed = 1.75;
    quote = "“거대한 솥단지에 넣고 푹 끓여주마!!”";
  } else if (s === 25) {
    type = "miniboss";
    name = "🚨 춤추는 불길한 '검은 삼인조'";
    icon = "⭐";
    badge = "🚨 미니 보스 (Lv.50 관문)";
    hp = 82000;
    atk = 820;
    speed = 1.65;
    quote = "“댄스 타임이다! 영원히 춤춰라~ 루라라~♬”";
  } else if (s === 30) {
    type = "boss";
    name = "👑 몸을 빼앗긴 거대 털괴물 '데카츠요'";
    icon = "🐺";
    badge = "👑 대형 보스";
    hp = 135000;
    atk = 1100;
    speed = 1.55;
    quote = "“내 몸 돌려줘어어어어-ッ!! 으아앙-!!”";
  } else if (s === 35) {
    type = "miniboss";
    name = "🚨 밤하늘의 강습 박쥐 키메라 군주";
    icon = "🦅";
    badge = "🚨 미니 보스";
    hp = 210000;
    atk = 1450;
    speed = 1.45;
    quote = "“끼에에엑-!! 오늘 밤 토벌대의 야식으로 삼아주마!”";
  } else if (s === 40) {
    type = "boss";
    name = "👑 동굴의 심연 지배자 '거대 오오쟈 엠페러'";
    icon = "🐍";
    badge = "👑 대형 보스 (코드브레이커 필수)";
    hp = 320000;
    atk = 1850;
    speed = 1.35;
    quote = "“샤아아아악-!! 뼈째로 삼켜주마!”";
  } else if (s === 45) {
    type = "miniboss";
    name = "🚨 타락한 거대 사스마타 골렘";
    icon = "⚔️";
    badge = "🚨 미니 보스";
    hp = 460000;
    atk = 2350;
    speed = 1.25;
    quote = "“모든 것을 부숴버린다...!”";
  } else if (s === 50) {
    type = "boss";
    name = "👑 붉은 뿔의 거대 괴물 '아노코 (あのこ)' [최종보스]";
    icon = "👹";
    badge = "👑 최종 보스 (Lv.100 지혜의 오라 필수)";
    hp = 680000;
    atk = 3200;
    speed = 1.15;
    quote = "“이런 게 되어버렸다... 하지만 지금의 내가 훨씬 강해... 후후...”";
  } else {
    const normalIcons = ["🐛", "🕷️", "🦎", "🐸", "🐗", "🦂", "🦇", "🐺", "🦑", "🦀"];
    const normalNames = [
      "맹독 가시벌레", "동굴 바위거미", "뾰족 도마뱀", "늪지대 독개구리", 
      "흉폭한 산멧돼지", "심연의 전갈", "야행성 흡혈박쥐", "어둠의 숲늑대", "지하 촉수괴물", "바위 집게괴물"
    ];
    icon = normalIcons[(s - 1) % normalIcons.length];
    name = `Stage ${s} - ${normalNames[(s - 1) % normalNames.length]}`;
  }

  STAGE_DATABASE.push({
    stage: s,
    reqLevel,
    type,
    name,
    icon,
    badge,
    maxHp: hp,
    atk,
    speed,
    quote
  });
}


// 3. 배틀 상태 변수
let currentStage = 1;
let maxUnlockedStage = 1;

let playerMaxHp = 150;
let playerCurHp = 150;
let playerAtk = 25;
let playerCounterBonus = 1.5;

let enemyMaxHp = 100;
let enemyCurHp = 100;
let enemyAtk = 10;
let enemyCharge = 0;
let enemyChargeSpeed = 2.5;

let isBattleActive = false;
let isGuarding = false;
let guardCooldown = false;
let guardTimer = null;
let chargeInterval = null;
let battleCombo = 0;

let isEnraged = false;
let attackCount = 0;
let nextIsHeavyAttack = false;

let isCritBuffActive = false;
let hasCounterBuff = false;
let healCd = 0;
let critCd = 0;
let cdInterval = null;

// 사운드 시스템
let audioCtx = null;
function playSound(type) {
  if (!userStats.soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === 'suspended') audioCtx.resume();
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'slash') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'guard_success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.setValueAtTime(1100, now + 0.08);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'player_hit') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(40, now + 0.3);
      gain.gain.setValueAtTime(0.45, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'victory') {
      [523.25, 659.25, 783.99, 1046.5, 1318.51].forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.25, now + i * 0.1);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.1 + 0.35);
        o.start(now + i * 0.1);
        o.stop(now + i * 0.1 + 0.35);
      });
    } else if (type === 'heal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(600, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'enrage') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(80, now);
      osc.frequency.linearRampToValueAtTime(220, now + 0.4);
      gain.gain.setValueAtTime(0.5, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.4);
      osc.start(now);
      osc.stop(now + 0.4);
    }
  } catch (e) {
    console.log("Audio play error", e);
  }
}

// 4. 배틀 초기화 및 스탯 환산 (트로피 보너스 포함)
function calculatePlayerStats() {
  userStats = loadUserStats();
  const unlocked = getUnlockedTrophies();

  // 기본 스탯: HP (Lv.1: 150 ~ Lv.100: 3,150), ATK (Lv.1: 26 ~ Lv.100: 826)
  let baseHp = 120 + (userStats.hpLevel * 30);
  let baseAtk = 18 + (userStats.atkLevel * 8);
  playerCounterBonus = 1.5;

  // 트로피 영구 보너스 반영
  if (unlocked['chiikawa_pochette']) baseAtk += 10;
  if (unlocked['hachiware_pochette']) baseHp += 150;
  if (unlocked['hachiware_sasumata']) playerCounterBonus = 1.8;
  if (unlocked['chiikawa_license']) {
    baseHp += 300;
    baseAtk += 40;
  }
  if (unlocked['kurimanju_snack_box']) baseHp += 500;
  if (unlocked['anoko_frog_doll']) baseAtk = Math.floor(baseAtk * 1.2);
  // 📚 공부 레벨 특수 비기 해방 효과 반영
  if (userStats.studyLevel >= 50) baseAtk += 30; // Lv.50: 제초 필기 마스터 공격력 +30

  playerMaxHp = baseHp;
  playerCurHp = playerMaxHp;
  playerAtk = baseAtk;
}

function initBattleSystem() {
  calculatePlayerStats();

  const savedStage = localStorage.getItem('chiikawa_battle_stage');
  if (savedStage) {
    maxUnlockedStage = Math.max(1, parseInt(savedStage, 10));
    currentStage = maxUnlockedStage;
  }

  updateTrophyTopCount();
  updateBattleCostumeSync();
  startBattleStage(currentStage);

  window.addEventListener('keydown', (e) => {
    // 패배 모달 열려있을 때 Space/Enter 누르면 즉시 재도전
    const defModal = document.getElementById('defeatModal');
    if (defModal && !defModal.classList.contains('hidden')) {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        retryBattleStage();
        return;
      }
    }
    if (e.code === 'Space') {
      e.preventDefault();
      playerAttack();
    } else if (e.code === 'KeyG') {
      playerGuard();
    } else if (e.code === 'KeyH') {
      useHealSkill();
    } else if (e.code === 'KeyC') {
      useCritSkill();
    }
  });
}

function startBattleStage(stageNum) {
  calculatePlayerStats();
  currentStage = Math.min(50, Math.max(1, stageNum));
  const stData = STAGE_DATABASE[currentStage - 1];

  isBattleActive = true;
  battleCombo = 0;
  isGuarding = false;
  guardCooldown = false;
  isCritBuffActive = false;
  hasCounterBuff = false;
  isEnraged = false;
  attackCount = 0;
  nextIsHeavyAttack = false;

  playerCurHp = playerMaxHp;
  enemyMaxHp = stData.maxHp;
  enemyCurHp = enemyMaxHp;
  enemyAtk = stData.atk;
  enemyCharge = 0;
  enemyChargeSpeed = stData.speed;

  // 유저 평균 레벨 계산
  const avgLevel = Math.round((userStats.atkLevel + userStats.hpLevel + userStats.studyLevel + userStats.cookLevel) / 4);

  // 상단 바 정보 갱신
  document.getElementById('stageTag').textContent = `STAGE ${stData.stage} / 50`;
  document.getElementById('stageName').textContent = stData.name;
  document.getElementById('enemyName').textContent = stData.name;
  document.getElementById('enemyTypeBadge').textContent = stData.badge;
  document.getElementById('enemyTypeBadge').style.background = (stData.type === 'boss') ? '#C92A2A' : ((stData.type === 'miniboss') ? '#E8590C' : '#495057');
  document.getElementById('enemyAvatarIcon').textContent = stData.icon;
  document.getElementById('enemyDialogue').textContent = stData.quote;

  // 권장 레벨 및 난이도 배지 갱신
  updateLevelBadgeUI(stData.reqLevel, avgLevel);

  // 스탯 텍스트 갱신
  document.getElementById('myHpLvl').textContent = userStats.hpLevel;
  document.getElementById('myAtkLvl').textContent = userStats.atkLevel;
  document.getElementById('myAtkVal').textContent = playerAtk;

  const healPercent = Math.min(60, 20 + Math.floor(userStats.cookLevel * 0.4));
  document.getElementById('healSkillText').textContent = `요리 Lv.${userStats.cookLevel} (HP ${healPercent}% 즉시 회복)`;

  const critDur = (3.5 + (userStats.studyLevel * 0.045)).toFixed(1);
  document.getElementById('critSkillText').textContent = `공부 Lv.${userStats.studyLevel} (${critDur}초간 2.2배 극딜)`;

  if (stData.type === 'boss' || stData.type === 'miniboss') {
    showBossWarningBanner(stData);
  }

  // 레벨 부족 경고
  if (avgLevel < stData.reqLevel - 8) {
    showToast(`⚠️ [경고] 권장 훈련 레벨(Lv.${stData.reqLevel})보다 현재 레벨(Lv.${avgLevel})이 낮습니다! 훈련소 단련을 추천합니다!`);
  }

  updateBattleHUD();

  if (chargeInterval) clearInterval(chargeInterval);
  chargeInterval = setInterval(updateEnemyCharge, 100);

  if (cdInterval) clearInterval(cdInterval);
  cdInterval = setInterval(updateCooldowns, 1000);
}

function updateLevelBadgeUI(reqLevel, avgLevel) {
  let diffBadge = document.getElementById('stageDiffBadge');
  if (!diffBadge) {
    const box = document.querySelector('.stage-indicator-box');
    diffBadge = document.createElement('div');
    diffBadge.id = 'stageDiffBadge';
    diffBadge.className = 'stage-diff-chip';
    box.appendChild(diffBadge);
  }

  let statusText = "🟢 적정 난이도";
  let statusColor = "#20C997";
  let diff = reqLevel - avgLevel;

  if (diff > 10) {
    statusText = `🔴 매우 위험! (권장 Lv.${reqLevel} / 내 평균 Lv.${avgLevel})`;
    statusColor = "#FF5E7E";
  } else if (diff > 3) {
    statusText = `🟡 팽팽한 혈투 (권장 Lv.${reqLevel} / 내 평균 Lv.${avgLevel})`;
    statusColor = "#FD7E14";
  } else {
    statusText = `🟢 공략 적합 (권장 Lv.${reqLevel} / 내 평균 Lv.${avgLevel})`;
    statusColor = "#20C997";
  }

  diffBadge.style.backgroundColor = statusColor;
  diffBadge.textContent = statusText;
}

function updateBattleHUD() {
  document.getElementById('playerHpCur').textContent = Math.max(0, Math.floor(playerCurHp));
  document.getElementById('playerHpMax').textContent = playerMaxHp;
  const playerHpPct = Math.max(0, Math.min(100, (playerCurHp / playerMaxHp) * 100));
  document.getElementById('playerHpBar').style.width = `${playerHpPct}%`;

  document.getElementById('enemyHpCur').textContent = Math.max(0, Math.floor(enemyCurHp));
  document.getElementById('enemyHpMax').textContent = enemyMaxHp;
  const enemyHpPct = Math.max(0, Math.min(100, (enemyCurHp / enemyMaxHp) * 100));
  document.getElementById('enemyHpBar').style.width = `${enemyHpPct}%`;

  document.getElementById('enemyChargeBar').style.width = `${enemyCharge}%`;
  document.getElementById('battleCombo').textContent = battleCombo;

  // 광폭화 체크 (HP < 35%)
  if (!isEnraged && (enemyCurHp / enemyMaxHp) <= 0.35) {
    isEnraged = true;
    playSound('enrage');
    enemyChargeSpeed = enemyChargeSpeed * 0.72; // 공격 주기 단축
    enemyAtk = Math.floor(enemyAtk * 1.3);
    document.getElementById('enemyDialogue').textContent = "“크아아악!! 💢 광폭화 발동! 분노가 폭발한다!!”";
    showToast("🚨 [주의] 보스가 광폭화 상태에 돌입했습니다! 공격 속도와 위력이 급상승합니다!");
  }

  // 가드 경고 (타이밍 주의)
  if (enemyCharge >= 80) {
    document.getElementById('btnGuard').classList.add('ready');
    if (nextIsHeavyAttack) {
      document.getElementById('guardStatusText').textContent = "💥 특수 강공격 장전 중! (타이밍 패링 필수)";
    } else {
      document.getElementById('guardStatusText').textContent = "⚠️ 지금 방어/회피 누르세요!";
    }
  } else {
    document.getElementById('btnGuard').classList.remove('ready');
    document.getElementById('guardStatusText').textContent = "공격 타이밍에 방어!";
  }
}

// 5. 플레이어 기본 공격
function playerAttack(event) {
  if (!isBattleActive) return;

  playSound('slash');
  battleCombo++;

  const unlocked = getUnlockedTrophies();
  const baseCritChance = 0.12 + (userStats.studyLevel * 0.003) + (userStats.studyLevel >= 10 ? 0.05 : 0);
  const isCrit = isCritBuffActive || (Math.random() < baseCritChance);
  const comboBonus = Math.min(250, battleCombo * 3);
  let dmg = Math.floor(playerAtk * (0.85 + Math.random() * 0.3) + comboBonus);
  
  if (hasCounterBuff) {
    dmg = Math.floor(dmg * playerCounterBonus);
    hasCounterBuff = false;
  }
  
  let critMultiplier = 2.2;
  if (unlocked['chiikawa_sasumata']) critMultiplier = 2.45;
  if (userStats.studyLevel >= 100) critMultiplier = Math.max(critMultiplier, 3.0); // Lv.100 지혜의 오라
  if (isCrit) dmg = Math.floor(dmg * critMultiplier);

  enemyCurHp = Math.max(0, enemyCurHp - dmg);

  const weapon = document.getElementById('playerWeapon');
  weapon.style.transform = 'translateX(25px) rotate(-35deg) scale(1.3)';
  setTimeout(() => { weapon.style.transform = 'none'; }, 90);

  const enemySprite = document.getElementById('enemySpriteWrap');
  enemySprite.style.transform = 'scale(0.92) translateX(12px)';
  enemySprite.style.filter = 'brightness(1.5) drop-shadow(0 0 15px #FF5E7E)';
  setTimeout(() => {
    enemySprite.style.transform = 'none';
    enemySprite.style.filter = 'none';
  }, 100);

  const clientX = event ? event.clientX : (window.innerWidth / 2 + 100);
  const clientY = event ? event.clientY : (window.innerHeight / 2 - 50);
  spawnDamageNumber(dmg, isCrit, false, clientX, clientY);

  updateBattleHUD();

  if (enemyCurHp <= 0) {
    handleVictory();
  }
}

// 6. 플레이어 방어 & 정밀 패링 (0.4초 저스트 타이밍)
function playerGuard() {
  if (!isBattleActive || isGuarding || guardCooldown) return;

  isGuarding = true;
  document.getElementById('guardShield').classList.remove('hidden');

  const playerSprite = document.getElementById('playerAvatarWrap');
  playerSprite.style.transform = 'scale(1.15)';
  playerSprite.style.borderColor = '#20C997';

  if (guardTimer) clearTimeout(guardTimer);
  guardTimer = setTimeout(() => {
    isGuarding = false;
    document.getElementById('guardShield').classList.add('hidden');
    playerSprite.style.transform = 'none';
    playerSprite.style.borderColor = '#FF9EAA';

    // 가드 후딜레이 0.35초 (무한 연타 방지)
    guardCooldown = true;
    setTimeout(() => { guardCooldown = false; }, 350);
  }, userStats.studyLevel >= 25 ? 550 : 420); // Lv.25 타임 슬로우 패링
}

// 7. 몬스터 공격 장전 루프
function updateEnemyCharge() {
  if (!isBattleActive) return;

  const increment = (100 / (enemyChargeSpeed * 10));
  enemyCharge += increment;

  if (enemyCharge >= 100) {
    enemyCharge = 0;
    executeEnemyAttack();
  }

  updateBattleHUD();
}

function executeEnemyAttack() {
  if (!isBattleActive) return;

  attackCount++;
  const isHeavy = (attackCount % 3 === 0);
  nextIsHeavyAttack = ((attackCount + 1) % 3 === 0);

  if (isGuarding) {
    // 패링 성공!
    playSound('guard_success');
    hasCounterBuff = true;
    spawnDamageNumber("🛡️ PERFECT PARRY! (카운터 버프!)", false, true, window.innerWidth / 2 - 120, window.innerHeight / 2);
    showToast(`✨ 완벽한 타이밍 패링 성공! 피해 0 & 다음 공격 ${playerCounterBonus}배 카운터!`);
  } else {
    // 피격 당함 (강공격 시 1.8배 치명타!)
    playSound('player_hit');
    battleCombo = 0;
    let rawDmg = Math.floor(enemyAtk * (0.9 + Math.random() * 0.25));
    if (isHeavy) {
      rawDmg = Math.floor(rawDmg * 1.8);
      showToast("💥 몬스터의 치명적 특수 강공격에 직격당했습니다!");
    }

    playerCurHp = Math.max(0, playerCurHp - rawDmg);

    const arena = document.getElementById('battleArena');
    arena.classList.add('shake');
    setTimeout(() => { arena.classList.remove('shake'); }, 300);

    spawnDamageNumber(`-${rawDmg}`, isHeavy, false, window.innerWidth / 2 - 100, window.innerHeight / 2 + 50, true);

    if (playerCurHp <= 0) {
      handleDefeat();
    }
  }
}

// 8. 요리 힐링 스킬
function useHealSkill() {
  if (!isBattleActive || healCd > 0) return;

  playSound('heal');
  const unlocked = getUnlockedTrophies();
  healCd = unlocked['hachiware_guitar'] ? 10 : 12;
  document.getElementById('healCdOverlay').classList.remove('hidden');

  const healPct = Math.min(0.6, 0.2 + (userStats.cookLevel * 0.004));
  const healAmount = Math.floor(playerMaxHp * healPct);
  playerCurHp = Math.min(playerMaxHp, playerCurHp + healAmount);

  spawnDamageNumber(`+${healAmount} HP 회복! 🍲`, false, false, window.innerWidth / 2 - 120, window.innerHeight / 2 - 40);
  showToast(`🍲 하치와레의 특제 스튜로 체력을 ${healAmount} 회복했습니다!`);
  updateBattleHUD();
}

// 9. 공부 크리티컬 버프 스킬
function useCritSkill() {
  if (!isBattleActive || critCd > 0) return;

  playSound('victory');
  critCd = 15;
  document.getElementById('critCdOverlay').classList.remove('hidden');
  isCritBuffActive = true;
  // Lv.75 코드 브레이커: 즉시 고정 관통 피해 + 1.5초 절대 마비(스턴)
  if (userStats.studyLevel >= 75) {
    const stunDmg = Math.floor(playerAtk * 1.6);
    enemyCurHp = Math.max(0, enemyCurHp - stunDmg);
    enemyCharge = 0; // 게이지 초기화
    spawnDamageNumber(`⚡ 코드 브레이크! ${stunDmg} (1.5초 마비!)`, true, false, window.innerWidth / 2 + 50, window.innerHeight / 2 - 80);
    showToast("⚡ [코드 브레이커] 적의 알고리즘을 해체하여 1.5초간 완전 마비시켰습니다!");
  }

  const unlocked = getUnlockedTrophies();
  let bonusDur = unlocked['hachiware_camera'] ? 1.5 : 0;
  const critDuration = Math.min(10, 3.5 + (userStats.studyLevel * 0.045) + bonusDur);
  showToast(`💡 몬스터의 약점 분석 완료! ${critDuration.toFixed(1)}초 동안 모든 공격 2.2배 극딜!`);

  setTimeout(() => {
    isCritBuffActive = false;
    showToast("약점 분석 버프가 종료되었습니다.");
  }, critDuration * 1000);
}

function updateCooldowns() {
  if (healCd > 0) {
    healCd--;
    document.getElementById('healCdOverlay').textContent = `${healCd}s`;
    if (healCd <= 0) document.getElementById('healCdOverlay').classList.add('hidden');
  }

  if (critCd > 0) {
    critCd--;
    document.getElementById('critCdOverlay').textContent = `${critCd}s`;
    if (critCd <= 0) document.getElementById('critCdOverlay').classList.add('hidden');
  }
}

// 10. 승리 & 패배 (클리어 시 다음 스테이지 자동 진격 시스템)
function handleVictory() {
  triggerSlowmoFinish();
  isBattleActive = false;
  clearInterval(chargeInterval);
  playSound('victory');

  const stData = STAGE_DATABASE[currentStage - 1];

  if (currentStage >= maxUnlockedStage && maxUnlockedStage < 50) {
    maxUnlockedStage = currentStage + 1;
    localStorage.setItem('chiikawa_battle_stage', maxUnlockedStage);
  }

  // 보상 도토리 지급
  let acornReward = 50 + (currentStage * 15);
  if (stData.type === 'boss') acornReward += 200;
  else if (stData.type === 'miniboss') acornReward += 100;
  
  try {
    let acorns = parseInt(localStorage.getItem('chiikawa_acorns') || '300', 10);
    acorns += acornReward;
    localStorage.setItem('chiikawa_acorns', acorns);
  } catch (e) {}

  // 트로피 확인
  const trophy = checkTrophyReward(currentStage);

  // 업적 체크 연동
  if (window.ChiikawaAchievements) {
    window.ChiikawaAchievements.checkBattle(currentStage, maxUnlockedStage);
  }

  // 승리 배너 이펙트 출력
  showStageClearBanner(stData, acornReward);

  if (trophy) {
    setTimeout(() => {
      showTrophyRewardPopup(trophy);
    }, 700);
  } else {
    if (currentStage < 50) {
      // 1.3초 후 자동으로 다음 스테이지로 진격!
      setTimeout(() => {
        goToNextStage();
      }, 1300);
    } else {
      // 50단계 최종 보스 아노코 토벌 성공 시 대망의 엔딩 모달 표시!
      setTimeout(() => {
        document.getElementById('victoryEnemyText').textContent = `${stData.name}을(를) 완벽히 토벌하고 먼작귀 월드의 평화를 되찾았습니다!`;
        document.getElementById('victoryModal').classList.remove('hidden');
      }, 1000);
    }
  }
}

function showStageClearBanner(stData, acornReward) {
  const arena = document.getElementById('battleArena');
  const existing = document.querySelector('.stage-clear-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.className = 'stage-clear-banner';
  const nextText = (currentStage < 50) ? `STAGE ${currentStage + 1}로 자동 진격 중 👉` : `🎉 전 50스테이지 토벌 완전 제패!`;
  banner.innerHTML = `
    <div class="clear-title">✨ STAGE ${stData.stage} CLEAR! ✨</div>
    <div class="clear-sub">${stData.name} 완벽 토벌! (+${acornReward} 🌰)</div>
    <div class="clear-next">${nextText}</div>
  `;
  arena.appendChild(banner);

  setTimeout(() => {
    banner.classList.add('fade-out');
    setTimeout(() => { banner.remove(); }, 400);
  }, 1200);
}

function handleDefeat() {
  isBattleActive = false;
  clearInterval(chargeInterval);

  const stData = STAGE_DATABASE[currentStage - 1];
  const avgLevel = Math.round((userStats.atkLevel + userStats.hpLevel + userStats.studyLevel + userStats.cookLevel) / 4);

  document.getElementById('defeatDesc').innerHTML = `
    <strong>${stData.name}</strong>에게 치이카와 토벌대가 쓰러졌습니다...<br>
    <div style="margin-top:10px; padding:10px; background:#FFF5F5; border-radius:10px; border:1px solid #FFC9C9; font-size:0.95rem;">
      🎯 <strong>현재 스테이지 권장 레벨: Lv.${stData.reqLevel}</strong><br>
      💡 내 현재 평균 레벨: Lv.${avgLevel} (공격: Lv.${userStats.atkLevel} / 체력: Lv.${userStats.hpLevel})<br>
      ${avgLevel < stData.reqLevel ? '⚠️ <strong>레벨 부족!</strong> 헬스장에서 공격력과 체력을 더 훈련하세요!' : '⚡ 0.4초 <strong>저스트 패링</strong> 타이밍에 집중해보세요!'}
    </div>
  `;

  document.getElementById('defeatModal').classList.remove('hidden');
}

function retryBattleStage() {
  document.getElementById('victoryModal').classList.add('hidden');
  document.getElementById('defeatModal').classList.add('hidden');
  startBattleStage(currentStage);
}

function goToNextStage() {
  document.getElementById('victoryModal').classList.add('hidden');
  if (currentStage < 50) {
    startBattleStage(currentStage + 1);
  } else {
    showToast("🎉 축하합니다! 50 스테이지의 모든 토벌을 완료하셨습니다!");
  }
}

// 11. 스테이지 맵 모달
function openStageMapModal() {
  const grid = document.getElementById('stageMapGrid');
  grid.innerHTML = '';

  const avgLevel = Math.round((userStats.atkLevel + userStats.hpLevel + userStats.studyLevel + userStats.cookLevel) / 4);

  STAGE_DATABASE.forEach(st => {
    const btn = document.createElement('button');
    btn.className = `stage-node-btn ${st.type}`;
    
    let levelBadge = `<span class="stage-req-lvl">권장 Lv.${st.reqLevel}</span>`;
    
    if (st.stage < maxUnlockedStage) {
      btn.classList.add('cleared');
      btn.innerHTML = `⭐ ${st.stage}<br><small>${st.icon}</small><br>${levelBadge}`;
    } else if (st.stage === currentStage) {
      btn.classList.add('current');
      btn.innerHTML = `👉 ${st.stage}<br><small>${st.icon}</small><br>${levelBadge}`;
    } else if (st.stage <= maxUnlockedStage) {
      btn.innerHTML = `${st.stage}<br><small>${st.icon}</small><br>${levelBadge}`;
    } else {
      btn.style.opacity = '0.35';
      btn.innerHTML = `🔒 ${st.stage}<br>${levelBadge}`;
    }

    btn.onclick = () => {
      closeStageMapModal();
      startBattleStage(st.stage);
    };
    grid.appendChild(btn);
  });

  document.getElementById('stageMapModal').classList.remove('hidden');
}

function closeStageMapModal() {
  document.getElementById('stageMapModal').classList.add('hidden');
}

function spawnDamageNumber(text, isCrit = false, isGuard = false, x = 0, y = 0, isPlayerHit = false) {
  const el = document.createElement('div');
  el.className = 'damage-number';
  if (isCrit) el.classList.add('damage-crit');
  if (isGuard) el.classList.add('damage-guard');
  if (isPlayerHit) el.classList.add('damage-player-hit');

  el.textContent = isCrit ? `🔥 CRITICAL! ${text}` : text;
  el.style.left = `${Math.max(20, x + (Math.random() * 40 - 20))}px`;
  el.style.top = `${Math.max(20, y + (Math.random() * 40 - 20))}px`;
  document.body.appendChild(el);

  setTimeout(() => { el.remove(); }, 700);
}

function showToast(msg) {
  const toast = document.getElementById('toastPopup');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2200);
}

document.getElementById('soundToggleBtn').addEventListener('click', () => {
  userStats.soundEnabled = !userStats.soundEnabled;
  const icon = document.getElementById('soundIcon');
  const text = document.getElementById('soundText');
  if (userStats.soundEnabled) {
    icon.className = 'fa-solid fa-volume-high';
    text.textContent = '효과음 ON';
    playSound('slash');
    showToast('효과음이 켜졌습니다 🎶');
  } else {
    icon.className = 'fa-solid fa-volume-xmark';
    text.textContent = '효과음 OFF';
    showToast('효과음이 꺼졌습니다 🤫');
  }
  localStorage.setItem('chiikawa_training_stats', JSON.stringify(userStats));
});

window.addEventListener('DOMContentLoaded', () => {
  initBattleSystem();
});

// ==============================================================
// 🏆 토벌 보물 & 전리품 도감 시스템 (Trophy Collection)
// ==============================================================
const TROPHY_DATABASE = [
  {
    stage: 5,
    id: "chiikawa_pochette",
    name: "치이카와의 분홍 곰돌이 포셰트",
    icon: "👛",
    grade: "RARE",
    color: "#FF9EAA",
    lore: "풀을 뽑고 노동을 해서 모은 돈으로 산 치이카와의 소중한 첫 번째 가방! 항상 작은 간식과 보물이 들어있습니다.",
    buff: "효과: 기본 공격력 +10 영구 증가"
  },
  {
    stage: 10,
    id: "chiikawa_sasumata",
    name: "치이카와의 분홍 사스마타 (토벌봉)",
    icon: "🔱",
    grade: "EPIC",
    color: "#FF5E7E",
    lore: "눈물을 닦고 친구들을 지키기 위해 두 손으로 꼭 쥐어든 분홍색 토벌봉! 친구와의 우정이 담겨있습니다.",
    buff: "효과: 크리티컬 데미지 2.2배 ➡️ 2.45배 영구 강화"
  },
  {
    stage: 15,
    id: "hachiware_camera",
    name: "하치와레의 소중한 필름 카메라",
    icon: "📷",
    grade: "RARE",
    color: "#74C0FC",
    lore: "동굴에서 열심히 일해 마련한 파란색 카메라! 치이카와, 우사기와 함께한 행복한 순간들이 가득 찍혀있습니다.",
    buff: "효과: 약점 분석(크리티컬 버프) 지속시간 +1.5초"
  },
  {
    stage: 20,
    id: "hachiware_pochette",
    name: "하치와레의 푸른 고양이 포셰트",
    icon: "👜",
    grade: "EPIC",
    color: "#4DABF7",
    lore: "치이카와와 세트로 맞춘 사랑스러운 파란색 포셰트! 동굴 수제비 재료와 나뭇가지가 들어있습니다.",
    buff: "효과: 최대 체력(HP) +150 영구 증가"
  },
  {
    stage: 25,
    id: "hachiware_guitar",
    name: "하치와레의 보물 클래식 기타",
    icon: "🎸",
    grade: "EPIC",
    color: "#FFA94D",
    lore: "비 오는 날 동굴에서 '히토리곳치'를 치며 노래하던 낡은 기타! 마음을 따뜻하게 위로해줍니다.",
    buff: "효과: 동굴 스튜 회복 쿨타임 -2초 감소 (10초)"
  },
  {
    stage: 30,
    id: "hachiware_sasumata",
    name: "하치와레의 푸른 사스마타 (토벌봉)",
    icon: "🔱",
    grade: "LEGENDARY",
    color: "#339AF0",
    lore: "'난토카나레-!(어떻게든 될 거야!)'를 외치며 거대 괴물에게 맞서는 하치와레의 든든한 무기!",
    buff: "효과: 패링 성공 시 카운터 공격력 1.5배 ➡️ 1.8배 강화"
  },
  {
    stage: 35,
    id: "usagi_magic_stick",
    name: "우사기의 마법 막대기 (쿵짝쿵짝)",
    icon: "🪄",
    grade: "LEGENDARY",
    color: "#FCC419",
    lore: "우사기가 신나게 흔들며 '우라라라-!' 소리를 내던 수상하고 신비한 요술봉! 무한한 에너지가 뿜어져 나옵니다.",
    buff: "효과: 콤보 보너스 공격력 한도 대폭 증가 (+250)"
  },
  {
    stage: 40,
    id: "chiikawa_license",
    name: "제초 5급 합격증 & 갑옷씨의 훈장",
    icon: "📜",
    grade: "MYTHIC",
    color: "#51CF66",
    lore: "수많은 탈락의 눈물을 딛고 친구들과 함께 쟁취한 피와땀의 합격증! 이제 어엿한 전문 제초사입니다.",
    buff: "효과: 공격력 +40 & 최대 체력 +300 영구 증가"
  },
  {
    stage: 45,
    id: "kurimanju_snack_box",
    name: "쿠리만쥬의 전설 안주 보물함",
    icon: "🌰",
    grade: "MYTHIC",
    color: "#D9480F",
    lore: "'하아아-!' 소리가 절로 나오는 전설의 구운 연어포와 온천 전골 세트! 한 입 먹으면 피로가 싹 풀립니다.",
    buff: "효과: 최대 체력(HP) +500 영구 증가"
  },
  {
    stage: 50,
    id: "anoko_frog_doll",
    name: "아노코의 추억의 개구리 인형 & 황금 마스터 트로피",
    icon: "🐸",
    grade: "GODLIKE",
    color: "#FFD43B",
    lore: "괴물로 변하기 전 치이카와와 함께 일하며 자랑했던 작고 낡은 개구리 인형... 먼작귀 세계관 최강의 마스터 증표!",
    buff: "효과: 🌟 모든 공격력 +20% 영구 증가 & 전설의 황금 오라"
  }
];

function getUnlockedTrophies() {
  try {
    const data = localStorage.getItem('chiikawa_unlocked_trophies');
    if (data) return JSON.parse(data);
  } catch (e) {}
  return {};
}

function saveUnlockedTrophies(trophies) {
  try {
    localStorage.setItem('chiikawa_unlocked_trophies', JSON.stringify(trophies));
  } catch (e) {}
}

function checkTrophyReward(stage) {
  const trophy = TROPHY_DATABASE.find(t => t.stage === stage);
  if (!trophy) return null;

  const unlocked = getUnlockedTrophies();
  if (!unlocked[trophy.id]) {
    unlocked[trophy.id] = true;
    saveUnlockedTrophies(unlocked);
    updateTrophyTopCount();
  updateBattleCostumeSync();
    return trophy;
  }
  return null;
}

function openTrophyModal() {
  const unlocked = getUnlockedTrophies();
  const grid = document.getElementById('trophyGrid');
  if (!grid) return;

  grid.innerHTML = '';
  TROPHY_DATABASE.forEach(t => {
    const isUnlocked = !!unlocked[t.id];
    const card = document.createElement('div');
    card.className = `trophy-item-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    if (isUnlocked) card.style.borderColor = t.color;

    card.innerHTML = `
      <div class="trophy-icon-wrap" style="background: ${isUnlocked ? t.color : '#343A40'};">
        <span class="trophy-icon">${isUnlocked ? t.icon : '🔒'}</span>
        <span class="trophy-stage-badge">Stage ${t.stage}</span>
      </div>
      <div class="trophy-info">
        <div class="trophy-grade-tag" style="color: ${isUnlocked ? t.color : '#868E96'};">${isUnlocked ? t.grade : 'LOCKED'}</div>
        <div class="trophy-name">${isUnlocked ? t.name : `Stage ${t.stage} 클리어 시 해금`}</div>
        <p class="trophy-lore">${isUnlocked ? t.lore : '토벌을 완수하여 보물을 손에 넣으세요!'}</p>
        <div class="trophy-buff-tag">${isUnlocked ? t.buff : '🔒 잠금 상태'}</div>
      </div>
    `;
    grid.appendChild(card);
  });

  document.getElementById('trophyModal').classList.remove('hidden');
}

function closeTrophyModal() {
  document.getElementById('trophyModal').classList.add('hidden');
}

function showTrophyRewardPopup(trophy) {
  playSound('victory');
  const modal = document.getElementById('trophyRewardModal');
  if (!modal) return;

  document.getElementById('trophyRewardIcon').textContent = trophy.icon;
  document.getElementById('trophyRewardName').textContent = trophy.name;
  document.getElementById('trophyRewardLore').textContent = trophy.lore;
  document.getElementById('trophyRewardBuff').textContent = trophy.buff;
  modal.classList.remove('hidden');
}

function closeTrophyRewardPopup() {
  document.getElementById('trophyRewardModal').classList.add('hidden');
  if (currentStage < 50) {
    goToNextStage();
  } else {
    document.getElementById('victoryEnemyText').textContent = `50스테이지 최종보스 아노코를 완벽히 토벌했습니다!`;
    document.getElementById('victoryModal').classList.remove('hidden');
  }
}

function updateTrophyTopCount() {
  const unlocked = getUnlockedTrophies();
  const count = Object.keys(unlocked).length;
  const countEl = document.getElementById('trophyCount');
  if (countEl) {
    countEl.textContent = `${count} / 10`;
  }

  const partyWrap = document.getElementById('playerAvatarWrap');
  if (partyWrap) {
    let existingBadge = document.getElementById('playerEquippedTrophy');
    if (existingBadge) existingBadge.remove();

    const unlockedList = TROPHY_DATABASE.filter(t => unlocked[t.id]);
    if (unlockedList.length > 0) {
      const topTrophy = unlockedList[unlockedList.length - 1];
      const badgeEl = document.createElement('div');
      badgeEl.id = 'playerEquippedTrophy';
      badgeEl.className = 'player-equipped-trophy-badge';
      badgeEl.textContent = topTrophy.icon;
      badgeEl.title = `장착된 보물: ${topTrophy.name} (${topTrophy.buff})`;
      partyWrap.appendChild(badgeEl);
    }
  }
}

function showBossWarningBanner(stData) {
  const arena = document.getElementById('battleArena');
  const existing = document.querySelector('.boss-warning-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.className = 'boss-warning-banner';
  banner.innerHTML = `⚠️ <strong>${stData.badge} 등장!</strong> ${stData.name} ⚠️`;
  arena.appendChild(banner);

  playSound('enrage');
  setTimeout(() => { banner.remove(); }, 2200);
}

function updateBattleCostumeSync() {
  try {
    const mData = localStorage.getItem('chiikawa_myroom_data');
    if (mData) {
      const parsed = JSON.parse(mData);
      const equipped = parsed.equippedCostume;
      if (equipped && equipped !== 'default') {
        const costIcons = {
          pajamas: '👚', armor: '🛡️', chef: '👨‍🍳', raincoat: '🌧️', golden: '👑', ribbon: '🎀'
        };
        const wrap = document.getElementById('playerAvatarWrap');
        if (wrap) {
          let badge = document.getElementById('playerCostumeBadge');
          if (!badge) {
            badge = document.createElement('div');
            badge.id = 'playerCostumeBadge';
            badge.style.position = 'absolute';
            badge.style.bottom = '-4px';
            badge.style.left = '-4px';
            badge.style.background = '#FFF';
            badge.style.border = '2px solid #FF9EAA';
            badge.style.borderRadius = '50%';
            badge.style.width = '28px';
            badge.style.height = '28px';
            badge.style.display = 'flex';
            badge.style.alignItems = 'center';
            badge.style.justifyContent = 'center';
            badge.style.fontSize = '1rem';
            badge.style.zIndex = '5';
            wrap.appendChild(badge);
          }
          badge.textContent = costIcons[equipped] || '✨';
        }
      }
    }
  } catch(e) {}
}
