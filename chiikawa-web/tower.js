// ==============================================================
// 🗼 우사기 무한 타워 하이퍼 스무스 엔진 (tower.js)
// ==============================================================

let currentFloor = 1;
let bestFloor = 1;
let killStreak = 0;
let totalEarnedAcorns = 0;

let towerPlayerMaxHp = 200;
let towerPlayerCurHp = 200;
let towerPlayerAtk = 25;

let towerEnemyMaxHp = 200;
let towerEnemyCurHp = 200;
let towerEnemyAtk = 15;
let towerEnemyCharge = 0;
let towerEnemyChargeSpeed = 2.5;

let isTowerActive = false;
let isTowerGuarding = false;
let towerGuardCooldown = false;
let towerGuardTimer = null;
let towerChargeInterval = null;

let healCooldown = 0;
let healTimerInterval = null;

// 오디오 시스템
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

    if (type === 'slash') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.1);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.1);
      osc.start(now);
      osc.stop(now + 0.1);
    } else if (type === 'guard_success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(700, now);
      osc.frequency.setValueAtTime(1100, now + 0.08);
      gain.gain.setValueAtTime(0.35, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'player_hit') {
      osc.type = 'square';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(40, now + 0.25);
      gain.gain.setValueAtTime(0.4, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'victory') {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = 'triangle';
        o.frequency.value = f;
        o.connect(g);
        g.connect(audioCtx.destination);
        g.gain.setValueAtTime(0.2, now + i * 0.08);
        g.gain.linearRampToValueAtTime(0.01, now + i * 0.08 + 0.25);
        o.start(now + i * 0.08);
        o.stop(now + i * 0.08 + 0.25);
      });
    } else if (type === 'heal') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, now);
      osc.frequency.linearRampToValueAtTime(600, now + 0.25);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.linearRampToValueAtTime(0.01, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch(e) {}
}

const TOWER_MONSTERS = [
  { name: "어둠의 탑 박쥐", icon: "🦇", badge: "일반 몬스터", quote: "“키에엑-! 빛을 꺼버려라!”" },
  { name: "심연의 가시벌레", icon: "🐛", badge: "일반 몬스터", quote: "“뾰족 가시 발사!”" },
  { name: "수정동굴 거미", icon: "🕷️", badge: "일반 몬스터", quote: "“끈적끈적 거미줄!”" },
  { name: "불타는 도마뱀", icon: "🦎", badge: "일반 몬스터", quote: "“불꽃 꼬리치기!”" },
  { name: "지하 감옥 고블린 전사", icon: "👺", badge: "🚨 미니 보스", quote: "“여기서 끝이다!”" },
  { name: "독포자 거대 버섯", icon: "🍄", badge: "🚨 미니 보스", quote: "“맹독 포자 폭격!”" },
  { name: "검은 별 삼인조 분신", icon: "⭐", badge: "🚨 미니 보스", quote: "“영원히 춤춰라~!”" },
  { name: "거대 털괴물 환영", icon: "🐺", badge: "👑 대형 보스", quote: "“크아아앙-!!”" },
  { name: "심연 맹독 오오쟈", icon: "🐍", badge: "👑 대형 보스", quote: "“샤아아악-!!”" },
  { name: "아노코의 그림자", icon: "👹", badge: "👑 전설의 보스", quote: "“내가 더 강해...!”" }
];

function getBestFloor() {
  try {
    const v = localStorage.getItem('chiikawa_tower_best_floor');
    if (v) return parseInt(v, 10);
  } catch (e) {}
  return 1;
}

function saveBestFloor(f) {
  try {
    localStorage.setItem('chiikawa_tower_best_floor', f);
  } catch (e) {}
  document.getElementById('bestFloorText').textContent = f;
}

function loadPlayerStats() {
  try {
    const stats = JSON.parse(localStorage.getItem('chiikawa_training_stats') || '{}');
    const trophies = JSON.parse(localStorage.getItem('chiikawa_unlocked_trophies') || '{}');

    let baseHp = 150 + ((stats.hpLevel || 1) * 30);
    let baseAtk = 20 + ((stats.atkLevel || 1) * 8);

    if (stats.studyLevel >= 50) baseAtk += 30;
    if (trophies['chiikawa_pochette']) baseAtk += 10;
    if (trophies['hachiware_pochette']) baseHp += 150;
    if (trophies['chiikawa_license']) { baseHp += 300; baseAtk += 40; }
    if (trophies['kurimanju_snack_box']) baseHp += 500;

    towerPlayerMaxHp = baseHp;
    towerPlayerAtk = baseAtk;
  } catch(e) {
    towerPlayerMaxHp = 200;
    towerPlayerAtk = 25;
  }
  document.getElementById('myTowerAtkVal').textContent = towerPlayerAtk;
}

function initTower() {
  loadPlayerStats();
  towerPlayerCurHp = towerPlayerMaxHp;
  bestFloor = getBestFloor();
  saveBestFloor(bestFloor);
  totalEarnedAcorns = 0;

  startFloor(1);

  window.addEventListener('keydown', (e) => {
    const overModal = document.getElementById('towerGameOverModal');
    if (overModal && !overModal.classList.contains('hidden')) {
      if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        restartTower();
        return;
      }
    }
    if (e.code === 'Space') {
      e.preventDefault();
      towerAttack();
    } else if (e.code === 'KeyG') {
      towerGuard();
    } else if (e.code === 'KeyH') {
      towerHeal();
    }
  });
}

function startFloor(floor) {
  currentFloor = floor;
  isTowerActive = true;
  isTowerGuarding = false;
  towerGuardCooldown = false;
  towerEnemyCharge = 0;

  const mIdx = (floor - 1) % TOWER_MONSTERS.length;
  const mData = TOWER_MONSTERS[mIdx];

  // 층수 비례 점진적 스케일링
  towerEnemyMaxHp = Math.floor(280 + floor * 120 + Math.pow(floor, 1.8) * 18);
  towerEnemyCurHp = towerEnemyMaxHp;
  towerEnemyAtk = Math.floor(18 + floor * 8 + Math.pow(floor, 1.25) * 3);
  towerEnemyChargeSpeed = Math.max(1.2, 2.8 - (floor * 0.025));

  document.getElementById('currentFloorBadge').textContent = `TOWER ${floor}F`;
  document.getElementById('killStreak').textContent = killStreak;
  document.getElementById('towerEnemyName').textContent = `${floor}F - ${mData.name}`;
  document.getElementById('towerEnemyTag').textContent = mData.badge;
  document.getElementById('towerEnemyIcon').textContent = mData.icon;

  const usagiQuotes = [
    "“우라라라-!! 어디까지 올라갈 수 있나 보자구!!”",
    "“야하-!! 멈추지 마라구!!”",
    "“하아?! 다음 층 몬스터 나와봐라구!!”"
  ];
  document.getElementById('towerPlayerSpeech').textContent = usagiQuotes[Math.floor(Math.random() * usagiQuotes.length)];

  updateTowerHUD();

  if (towerChargeInterval) clearInterval(towerChargeInterval);
  towerChargeInterval = setInterval(updateTowerEnemyCharge, 100);

  if (healTimerInterval) clearInterval(healTimerInterval);
  healTimerInterval = setInterval(updateHealCd, 1000);
}

function updateTowerHUD() {
  document.getElementById('towerPlayerHpCur').textContent = Math.max(0, Math.floor(towerPlayerCurHp));
  document.getElementById('towerPlayerHpMax').textContent = towerPlayerMaxHp;
  document.getElementById('towerPlayerHpBar').style.width = `${Math.max(0, (towerPlayerCurHp / towerPlayerMaxHp) * 100)}%`;

  document.getElementById('towerEnemyHpCur').textContent = Math.max(0, Math.floor(towerEnemyCurHp));
  document.getElementById('towerEnemyHpMax').textContent = towerEnemyMaxHp;
  document.getElementById('towerEnemyHpBar').style.width = `${Math.max(0, (towerEnemyCurHp / towerEnemyMaxHp) * 100)}%`;

  document.getElementById('towerEnemyChargeBar').style.width = `${towerEnemyCharge}%`;

  if (towerEnemyCharge >= 75) {
    document.getElementById('btnTowerGuard').classList.add('ready');
    document.getElementById('towerGuardStatusText').textContent = "⚠️ 지금 패링 누르세요!";
  } else {
    document.getElementById('btnTowerGuard').classList.remove('ready');
    document.getElementById('towerGuardStatusText').textContent = "공격 타이밍에 (G)";
  }
}

function towerAttack(event) {
  if (!isTowerActive) return;
  playSound('slash');

  const stats = JSON.parse(localStorage.getItem('chiikawa_training_stats') || '{}');
  const isCrit = (Math.random() < 0.28 + ((stats.studyLevel || 1) >= 10 ? 0.05 : 0));
  let critMultiplier = ((stats.studyLevel || 1) >= 100) ? 3.0 : 2.5;

  let dmg = Math.floor(towerPlayerAtk * (0.88 + Math.random() * 0.28));
  if (isCrit) dmg = Math.floor(dmg * critMultiplier);

  towerEnemyCurHp = Math.max(0, towerEnemyCurHp - dmg);

  // 무기 & 적 피격 애니메이션
  const weapon = document.getElementById('towerPlayerWeapon');
  weapon.style.transform = 'scale(1.4) rotate(-30deg)';
  setTimeout(() => { weapon.style.transform = 'none'; }, 90);

  const enemyBox = document.getElementById('towerEnemyIconBox');
  enemyBox.style.transform = 'scale(0.88) translateX(12px)';
  enemyBox.style.filter = 'brightness(1.5) drop-shadow(0 0 15px #FF5E7E)';
  setTimeout(() => {
    enemyBox.style.transform = 'none';
    enemyBox.style.filter = 'none';
  }, 100);

  const clientX = event ? event.clientX : (window.innerWidth / 2 + 80);
  const clientY = event ? event.clientY : (window.innerHeight / 2 - 40);
  spawnTowerDamage(dmg, isCrit, false, clientX, clientY);

  updateTowerHUD();

  if (towerEnemyCurHp <= 0) {
    floorCleared();
  }
}

function towerGuard() {
  if (!isTowerActive || isTowerGuarding || towerGuardCooldown) return;
  
  const stats = JSON.parse(localStorage.getItem('chiikawa_training_stats') || '{}');
  const guardWindow = (stats.studyLevel >= 25) ? 550 : 420;

  isTowerGuarding = true;
  document.getElementById('towerGuardShield').classList.remove('hidden');

  const frame = document.getElementById('towerAvatarFrame');
  frame.style.transform = 'scale(1.15)';
  frame.style.borderColor = '#20C997';

  if (towerGuardTimer) clearTimeout(towerGuardTimer);
  towerGuardTimer = setTimeout(() => {
    isTowerGuarding = false;
    document.getElementById('towerGuardShield').classList.add('hidden');
    frame.style.transform = 'none';
    frame.style.borderColor = '#FFD43B';

    towerGuardCooldown = true;
    setTimeout(() => { towerGuardCooldown = false; }, 320);
  }, guardWindow);
}

function towerHeal() {
  if (!isTowerActive || healCooldown > 0) return;
  playSound('heal');

  healCooldown = 10;
  document.getElementById('towerHealCd').classList.remove('hidden');

  const healAmount = Math.floor(towerPlayerMaxHp * 0.35);
  towerPlayerCurHp = Math.min(towerPlayerMaxHp, towerPlayerCurHp + healAmount);

  spawnTowerDamage(`+${healAmount} HP 회복! 🥕`, false, false, window.innerWidth / 2 - 80, window.innerHeight / 2 - 40);
  showToast(`🥕 우사기 특제 당근으로 체력을 ${healAmount} 회복했습니다!`);
  updateTowerHUD();
}

function updateHealCd() {
  if (healCooldown > 0) {
    healCooldown--;
    document.getElementById('towerHealCd').textContent = `${healCooldown}s`;
    if (healCooldown <= 0) {
      document.getElementById('towerHealCd').classList.add('hidden');
    }
  }
}

function updateTowerEnemyCharge() {
  if (!isTowerActive) return;

  const increment = (100 / (towerEnemyChargeSpeed * 10));
  towerEnemyCharge += increment;

  if (towerEnemyCharge >= 100) {
    towerEnemyCharge = 0;
    executeTowerEnemyAttack();
  }

  updateTowerHUD();
}

function executeTowerEnemyAttack() {
  if (!isTowerActive) return;

  const stats = JSON.parse(localStorage.getItem('chiikawa_training_stats') || '{}');

  if (isTowerGuarding) {
    // 패링 성공!
    playSound('guard_success');
    if (stats.studyLevel >= 25) {
      towerEnemyCharge = Math.max(0, towerEnemyCharge - 25);
    }
    if (stats.studyLevel >= 100) {
      const pHeal = Math.floor(towerPlayerMaxHp * 0.10);
      towerPlayerCurHp = Math.min(towerPlayerMaxHp, towerPlayerCurHp + pHeal);
      spawnTowerDamage(`+${pHeal} HP 지혜의 치유! ✨`, false, false, window.innerWidth / 2 - 100, window.innerHeight / 2 - 50);
    }
    spawnTowerDamage("🛡️ PERFECT PARRY!", false, true, window.innerWidth / 2 - 80, window.innerHeight / 2);
    showToast("✨ 완벽한 타이밍 패링 성공! 피해 0 & 적 장전 스턴!");
  } else {
    // 피격 당함
    playSound('player_hit');
    let rawDmg = Math.floor(towerEnemyAtk * (0.88 + Math.random() * 0.28));
    towerPlayerCurHp = Math.max(0, towerPlayerCurHp - rawDmg);

    const arena = document.querySelector('.tower-arena');
    arena.style.transform = 'scale(0.98)';
    setTimeout(() => { arena.style.transform = 'none'; }, 150);

    spawnTowerDamage(`-${rawDmg}`, false, false, window.innerWidth / 2 - 80, window.innerHeight / 2 + 40, true);
    updateTowerHUD();

    if (towerPlayerCurHp <= 0) {
      towerGameOver();
    }
  }
}

function floorCleared() {
  isTowerActive = false;
  clearInterval(towerChargeInterval);
  playSound('victory');
  killStreak++;

  if (currentFloor > bestFloor) {
    bestFloor = currentFloor;
    saveBestFloor(bestFloor);
  }

  // 층수 비례 도토리 보상
  const acornReward = 15 + (currentFloor * 5);
  totalEarnedAcorns += acornReward;
  try {
    let acorns = parseInt(localStorage.getItem('chiikawa_acorns') || '300', 10);
    acorns += acornReward;
    localStorage.setItem('chiikawa_acorns', acorns);
    document.querySelectorAll('#navAcorns').forEach(el => el.textContent = acorns);
  } catch(e) {}

  showFloorClearBanner(currentFloor, acornReward);

  // 1.1초 후 다음 층으로 스무스하게 상승
  setTimeout(() => {
    startFloor(currentFloor + 1);
  }, 1100);
}

function showFloorClearBanner(floor, acornReward) {
  const overlay = document.querySelector('.tower-overlay');
  const existing = document.querySelector('.tower-floor-clear-banner');
  if (existing) existing.remove();

  const banner = document.createElement('div');
  banner.className = 'tower-floor-clear-banner';
  banner.innerHTML = `
    <div class="tf-title">✨ TOWER ${floor}F CLEAR! ✨</div>
    <div class="tf-sub">${floor}층 수호 괴물 격파 완료 (+${acornReward} 🌰)</div>
    <div class="tf-next">🗼 ${floor + 1}층으로 타워 상승 중 👉</div>
  `;
  overlay.appendChild(banner);

  setTimeout(() => {
    banner.classList.add('fade-out');
    setTimeout(() => { banner.remove(); }, 350);
  }, 1000);
}

function towerGameOver() {
  isTowerActive = false;
  clearInterval(towerChargeInterval);
  clearInterval(healTimerInterval);

  document.getElementById('finalFloorText').textContent = `${currentFloor} 층`;
  document.getElementById('towerEarnedAcorns').textContent = `+${totalEarnedAcorns} 🌰`;
  document.getElementById('towerGameOverModal').classList.remove('hidden');
}

function restartTower() {
  document.getElementById('towerGameOverModal').classList.add('hidden');
  loadPlayerStats();
  towerPlayerCurHp = towerPlayerMaxHp;
  killStreak = 0;
  totalEarnedAcorns = 0;
  startFloor(1);
}

function spawnTowerDamage(text, isCrit = false, isGuard = false, x = 0, y = 0, isPlayerHit = false) {
  const el = document.createElement('div');
  el.className = 'tower-damage-number';
  if (isCrit) el.classList.add('tower-damage-crit');
  if (isGuard) el.classList.add('tower-damage-guard');
  if (isPlayerHit) el.classList.add('tower-damage-hit');

  el.textContent = isCrit ? `🔥 CRITICAL! ${text}` : text;
  el.style.left = `${Math.max(20, x + (Math.random() * 40 - 20))}px`;
  el.style.top = `${Math.max(20, y + (Math.random() * 40 - 20))}px`;
  document.body.appendChild(el);

  setTimeout(() => { el.remove(); }, 700);
}

function showToast(msg) {
  const toast = document.getElementById('toastPopup');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 1800);
}

window.addEventListener('DOMContentLoaded', () => {
  initTower();
});
