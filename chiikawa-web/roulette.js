// ==============================================================
// 🎰 모몽가 럭키 룰렛 로직 (roulette.js)
// ==============================================================

const SECTORS = [
  { label: "🌰 도토리 100개", type: "acorn", value: 100, color: "#FF8787", icon: "🌰" },
  { label: "🧪 토벌 공격력 비약", type: "buff", value: "atk_potion", color: "#FFD43B", icon: "🧪" },
  { label: "🌰 대박 도토리 300개", type: "acorn", value: 300, color: "#69DB7C", icon: "🌰✨" },
  { label: "🛋️ 모몽가 꼬리 방석", type: "furniture", value: "momonga_cushion", color: "#4DABF7", icon: "🛋️" },
  { label: "🌰 초대박 500개!", type: "acorn", value: 500, color: "#FFA94D", icon: "🌰👑" },
  { label: "👑 반짝 미니 티아라", type: "skin", value: "momonga_tiara", color: "#DA77F2", icon: "👑" }
];

let isSpinning = false;
let currentAngle = 0;
let freeSpins = 3;

const momongaQuotes = [
  "“나를 더 귀여워하라구! 대박 선물이 기다린다!”",
  "“어때?! 내가 주는 선물에 감동했지?!”",
  "“칭찬해줘! 나만큼 완벽한 가챠 룰렛은 없다구!”",
  "“하아?! 꽝은 절대 없으니까 팍팍 돌려봐!”",
  "“내가 제일 귀엽다고 말하면 좋은 게 나올지도 몰라!”"
];

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
  document.getElementById('rouletteAcornCount').textContent = cnt;
}

function drawWheel() {
  const canvas = document.getElementById('wheelCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const numSectors = SECTORS.length;
  const arc = (2 * Math.PI) / numSectors;
  const radius = canvas.width / 2;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  SECTORS.forEach((sec, i) => {
    const angle = currentAngle + i * arc;
    ctx.beginPath();
    ctx.fillStyle = sec.color;
    ctx.moveTo(radius, radius);
    ctx.arc(radius, radius, radius - 8, angle, angle + arc);
    ctx.lineTo(radius, radius);
    ctx.fill();
    ctx.stroke();

    // 텍스트 그리기
    ctx.save();
    ctx.translate(radius, radius);
    ctx.rotate(angle + arc / 2);
    ctx.textAlign = "right";
    ctx.fillStyle = "#FFF";
    ctx.font = "bold 15px 'Jua', sans-serif";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;
    ctx.fillText(sec.label, radius - 25, 6);
    ctx.restore();
  });
}

function spinWheel() {
  if (isSpinning) return;

  const acorns = getAcorns();
  if (freeSpins <= 0 && acorns < 50) {
    showToast("도토리 코인이 부족합니다! (50 도토리 필요) 🌰");
    return;
  }

  if (freeSpins > 0) {
    freeSpins--;
    document.getElementById('freeSpinBadge').innerHTML = `🎁 오늘 무료 스핀: <strong>${freeSpins}</strong>회 남음`;
  } else {
    saveAcorns(acorns - 50);
  }

  isSpinning = true;
  document.getElementById('spinMainBtn').disabled = true;

  // 랜덤 타깃 슬롯
  const targetIndex = Math.floor(Math.random() * SECTORS.length);
  const arc = (2 * Math.PI) / SECTORS.length;
  // 룰렛 상단 포인터(3*PI/2)에 오도록 각도 계산
  const targetAngle = (1.5 * Math.PI) - (targetIndex * arc + arc / 2);
  const totalSpins = 5 * (2 * Math.PI); // 5바퀴
  const finalAngle = totalSpins + targetAngle;

  const startAngle = currentAngle % (2 * Math.PI);
  const duration = 4000;
  const startTime = performance.now();

  function animateSpin(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(1, elapsed / duration);
    // easeOutCubic
    const easeProgress = 1 - Math.pow(1 - progress, 3);

    currentAngle = startAngle + (finalAngle - startAngle) * easeProgress;
    drawWheel();

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      isSpinning = false;
      document.getElementById('spinMainBtn').disabled = false;
      giveReward(SECTORS[targetIndex]);
    }
  }

  requestAnimationFrame(animateSpin);
  document.getElementById('momongaSpeech').textContent = momongaQuotes[Math.floor(Math.random() * momongaQuotes.length)];
}

function giveReward(sec) {
  if (sec.type === 'acorn') {
    const newAcorns = getAcorns() + sec.value;
    saveAcorns(newAcorns);
    showRewardModal(sec.icon, "대박 도토리 코인 획득!", `도토리 코인 +${sec.value}개를 획득했습니다!`, `🌰 도토리 +${sec.value}개`);
  } else if (sec.type === 'buff') {
    showRewardModal(sec.icon, "토벌전 특효 비약 획득!", "다음 토벌전 전투 시 공격력 +30% 강화 버프가 적용됩니다!", "⚔️ 토벌 공격력 +30% 버프");
  } else if (sec.type === 'furniture') {
    showRewardModal(sec.icon, "모몽가 한정 가구 획득!", "마이룸에 배치할 수 있는 푹신한 꼬리 방석을 획득했습니다!", "🛋️ 모몽가 꼬리 방석 (마이룸 지급)");
  } else if (sec.type === 'skin') {
    showRewardModal(sec.icon, "반짝 미니 티아라 획득!", "모몽가의 반짝이는 왕관 액세서리를 획득했습니다!", "👑 모몽가 티아라 (스킨 소품)");
  }
}

function showRewardModal(icon, title, desc, badge) {
  document.getElementById('rewardIcon').textContent = icon;
  document.getElementById('rewardTitle').textContent = title;
  document.getElementById('rewardDesc').textContent = desc;
  document.getElementById('rewardBadge').textContent = badge;
  document.getElementById('rewardModal').classList.remove('hidden');
}

function closeRewardModal() {
  document.getElementById('rewardModal').classList.add('hidden');
}

function showToast(msg) {
  const toast = document.getElementById('toastPopup');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2200);
}

window.addEventListener('DOMContentLoaded', () => {
  saveAcorns(getAcorns());
  drawWheel();
});
