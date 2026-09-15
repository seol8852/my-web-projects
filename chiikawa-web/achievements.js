// ==============================================================
// 🏆 30종 업적 데이터 및 자동 체크 엔진 (achievements.js)
// ==============================================================

const ACHIEVEMENTS_DB = [
  // 🌱 제초 부문 (5종)
  { id: "weed_1", cat: "weeding", title: "🌱 제초 꿈나무", desc: "제초 검정에서 100점 이상 달성", icon: "🌱" },
  { id: "weed_2", cat: "weeding", title: "🍀 황금 클로버 헌터", desc: "황금 클로버를 한 판에 3개 이상 획득", icon: "🍀" },
  { id: "weed_3", cat: "weeding", title: "⚡ 콤보 마스터", desc: "제초 검정에서 10콤보 이상 달성", icon: "⚡" },
  { id: "weed_4", cat: "weeding", title: "📜 제초 5급 합격생", desc: "제초 검정 250점 돌파", icon: "📜" },
  { id: "weed_5", cat: "weeding", title: "👑 전설의 광속 제초왕", desc: "제초 검정 최고 목표 450점 돌파 달성!", icon: "👑" },

  // 💪 훈련 부문 (6종)
  { id: "gym_1", cat: "training", title: "🥊 펀치 펀치!", desc: "공격력 레벨 Lv.10 달성", icon: "🥊" },
  { id: "gym_2", cat: "training", title: "💪 근육 덤벨 전사", desc: "공격력 레벨 Lv.50 달성", icon: "💪" },
  { id: "gym_3", cat: "training", title: "🌟 파괴신 우사기", desc: "공격력 최고 레벨 Lv.100 마스터!", icon: "🌟" },
  { id: "gym_4", cat: "training", title: "🏃 지치지 않는 체력", desc: "체력 레벨 Lv.10 달성", icon: "🏃" },
  { id: "gym_5", cat: "training", title: "🛡️ 강철의 치이카와", desc: "체력 레벨 Lv.50 달성", icon: "🛡️" },
  { id: "gym_6", cat: "training", title: "❤️ 불사신 먼작귀", desc: "체력 최고 레벨 Lv.100 마스터!", icon: "❤️" },

  // 📚 스터디 1000제 부문 (5종)
  { id: "study_1", cat: "study", title: "📖 열공하는 치이카와", desc: "정보처리기사 실기 1스테이지 합격", icon: "📖" },
  { id: "study_2", cat: "study", title: "💡 컴퓨터공학 수습생", desc: "정보처리기사 실기 20스테이지 돌파", icon: "💡" },
  { id: "study_3", cat: "study", title: "💻 코딩의 마술사", desc: "정보처리기사 실기 50스테이지 돌파", icon: "💻" },
  { id: "study_4", cat: "study", title: "🎓 수석 합격자", desc: "정보처리기사 실기 80스테이지 돌파", icon: "🎓" },
  { id: "study_5", cat: "study", title: "🌟 정보처리기사 1000제 정복", desc: "100개 스테이지 1,000문제 올클리어!", icon: "🌟" },

  // 🍳 요리 부문 (3종)
  { id: "cook_1", cat: "training", title: "🍳 계란말이 요리사", desc: "요리 레벨 Lv.10 달성", icon: "🍳" },
  { id: "cook_2", cat: "training", title: "🍲 동굴 5성급 셰프", desc: "요리 레벨 Lv.50 달성", icon: "🍲" },
  { id: "cook_3", cat: "training", title: "🌟 신들의 만찬 마스터", desc: "요리 레벨 Lv.100 마스터!", icon: "🌟" },

  // ⚔️ 토벌전 부문 (6종)
  { id: "bat_1", cat: "battle", title: "⚔️ 첫 번째 토벌", desc: "토벌 Stage 1 클리어", icon: "⚔️" },
  { id: "bat_2", cat: "battle", title: "🦇 비행 키메라 격파", desc: "토벌 Stage 10 보스 격파", icon: "🦇" },
  { id: "bat_3", cat: "battle", title: "🍲 고블린 킹 격파", desc: "토벌 Stage 20 보스 격파", icon: "🍲" },
  { id: "bat_4", cat: "battle", title: "🐺 데카츠요 격파", desc: "토벌 Stage 30 보스 격파", icon: "🐺" },
  { id: "bat_5", cat: "battle", title: "🐍 거대 오오쟈 격파", desc: "토벌 Stage 40 보스 격파", icon: "🐍" },
  { id: "bat_6", cat: "battle", title: "👑 아노코 격파 (토벌 마스터)", desc: "토벌 최종보스 Stage 50 클리어!", icon: "👑" },

  // 🏠 마이룸 & 기타 (5종)
  { id: "room_1", cat: "myroom", title: "🛋️ 안락한 보금자리", desc: "마이룸에 가구 3개 이상 배치", icon: "🛋️" },
  { id: "room_2", cat: "myroom", title: "🏰 동굴 인테리어 장인", desc: "마이룸 가구 8종 이상 수집", icon: "🏰" },
  { id: "room_3", cat: "myroom", title: "👗 패셔니스타", desc: "코스튬 3벌 이상 해금", icon: "👗" },
  { id: "room_4", cat: "myroom", title: "🌰 야시장 단골손님", desc: "쿠리만쥬 카드 매칭 게임 클리어", icon: "🌰" },
  { id: "room_5", cat: "myroom", title: "🎰 럭키 모몽가", desc: "모몽가 룰렛 1회 이상 스핀", icon: "🎰" }
];

let currentFilter = "all";

function getUnlockedAchievements() {
  try {
    const v = localStorage.getItem('chiikawa_unlocked_achievements');
    if (v) return JSON.parse(v);
  } catch (e) {}
  // 기본 달성 체크
  return { "weed_1": true, "bat_1": true, "study_1": true };
}

function checkAndAutoUnlock() {
  const unlocked = getUnlockedAchievements();
  const stats = JSON.parse(localStorage.getItem('chiikawa_training_stats') || '{}');
  const battleStage = parseInt(localStorage.getItem('chiikawa_battle_stage') || '1', 10);

  if ((stats.atkLevel || 1) >= 10) unlocked["gym_1"] = true;
  if ((stats.atkLevel || 1) >= 50) unlocked["gym_2"] = true;
  if ((stats.atkLevel || 1) >= 100) unlocked["gym_3"] = true;
  if ((stats.hpLevel || 1) >= 10) unlocked["gym_4"] = true;
  if ((stats.hpLevel || 1) >= 50) unlocked["gym_5"] = true;
  if ((stats.hpLevel || 1) >= 100) unlocked["gym_6"] = true;
  if ((stats.cookLevel || 1) >= 10) unlocked["cook_1"] = true;
  if ((stats.cookLevel || 1) >= 50) unlocked["cook_2"] = true;
  if ((stats.cookLevel || 1) >= 100) unlocked["cook_3"] = true;
  if ((stats.studyLevel || 1) >= 20) unlocked["study_2"] = true;
  if ((stats.studyLevel || 1) >= 50) unlocked["study_3"] = true;
  if ((stats.studyLevel || 1) >= 80) unlocked["study_4"] = true;
  if ((stats.studyLevel || 1) >= 100) unlocked["study_5"] = true;
  if (battleStage >= 10) unlocked["bat_2"] = true;
  if (battleStage >= 20) unlocked["bat_3"] = true;
  if (battleStage >= 30) unlocked["bat_4"] = true;
  if (battleStage >= 40) unlocked["bat_5"] = true;
  if (battleStage >= 50) unlocked["bat_6"] = true;

  localStorage.setItem('chiikawa_unlocked_achievements', JSON.stringify(unlocked));
  return unlocked;
}

function renderAchievementsGrid() {
  const unlocked = checkAndAutoUnlock();
  const grid = document.getElementById('achievementsGrid');
  if (!grid) return;

  grid.innerHTML = '';
  let count = 0;

  ACHIEVEMENTS_DB.forEach(a => {
    const isUnlocked = !!unlocked[a.id];
    if (isUnlocked) count++;

    if (currentFilter !== 'all' && a.cat !== currentFilter) return;

    const card = document.createElement('div');
    card.className = `achieve-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <div class="achieve-icon-box">${isUnlocked ? a.icon : '🔒'}</div>
      <div class="achieve-info">
        <span class="achieve-cat-tag">${a.cat.toUpperCase()}</span>
        <div class="achieve-title">${a.title}</div>
        <div class="achieve-desc">${a.desc}</div>
        <div class="achieve-status-badge" style="color:${isUnlocked ? '#FFD43B' : '#868E96'};">
          ${isUnlocked ? '✨ 달성 완료!' : '🔒 도전 중'}
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  document.getElementById('achieveCount').textContent = count;
}

function filterAchievements(cat) {
  currentFilter = cat;
  document.querySelectorAll('.filter-tab-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderAchievementsGrid();
}

window.addEventListener('DOMContentLoaded', () => {
  renderAchievementsGrid();
});
