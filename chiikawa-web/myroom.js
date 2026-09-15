// ==============================================================
// 🏠 동굴 마이룸 & 👗 코스튬 관리 엔진 (myroom.js)
// ==============================================================

// 가구 데이터베이스 (10종)
const FURNITURE_DB = [
  { id: "pudding_cushion", name: "🍮 폭신 딸기 푸딩 방석", icon: "🍮", cost: 100, desc: "치이카와가 제일 좋아하는 푹신한 푸딩 방석!", pos: { top: "65%", left: "40%" } },
  { id: "cave_fireplace", name: "🔥 따스한 동굴 모닥불", icon: "🔥", cost: 150, desc: "동굴 안을 훈훈하게 데워주는 마법의 모닥불!", pos: { top: "60%", left: "78%" } },
  { id: "usagi_tent", name: "⛺ 우사기 무지개 텐트", icon: "⛺", cost: 250, desc: "우사기가 캠핑할 때 쓰는 알록달록 무지개 텐트!", pos: { top: "45%", left: "15%" } },
  { id: "photo_frame", name: "📷 친구들과의 추억 액자", icon: "🖼️", cost: 80, desc: "치이카와, 하치와레, 우사기가 함께 찍은 기념사진!", pos: { top: "25%", left: "35%" } },
  { id: "hachi_guitar_stand", name: "🎸 하치와레 기타 스탠드", icon: "🎸", cost: 180, desc: "동굴 라이브 공연을 위한 클래식 기타 거치대!", pos: { top: "50%", left: "65%" } },
  { id: "pajama_bed", name: "🛏️ 포근한 파자마 이불", icon: "🛏️", cost: 300, desc: "꿈나라로 쏙 빠져드는 부드러운 구름 이불!", pos: { top: "42%", left: "28%" } },
  { id: "clover_pot", name: "🪴 행운의 네잎클로버 화분", icon: "🍀", cost: 60, desc: "동굴에 매일 좋은 행운을 가져다주는 화분!", pos: { top: "70%", left: "20%" } },
  { id: "tea_table", name: "☕ 오손도손 티 테이블", icon: "🍵", cost: 120, desc: "친구들과 맛있는 차와 간식을 나눠먹는 나무 탁자!", pos: { top: "68%", left: "55%" } },
  { id: "bookshelf", name: "📚 제초 시험 열공 책장", icon: "📖", cost: 200, desc: "제초 5급 및 정보처리기사 문제집이 가득 꽂힌 책장!", pos: { top: "30%", left: "58%" } },
  { id: "master_trophy_stand", name: "🏆 황금 마스터 트로피대", icon: "🏆", cost: 500, desc: "토벌전 최종보스를 격파한 영광의 트로피 전시대!", pos: { top: "28%", left: "78%" } }
];

// 코스튬 데이터베이스 (6종)
const COSTUMES_DB = [
  { id: "classic", name: "🌸 클래식 오리지널", icon: "🌸", desc: "언제나 사랑스러운 치이카와의 기본 모습!", reqType: "free", reqText: "기본 제공" },
  { id: "pajamas", name: "👚 파자마 파티 룩", icon: "👚", desc: "친구들과 밤새 노래하고 춤추는 알록달록 파자마!", reqType: "weeding", reqScore: 450, reqText: "제초 검정 450점 달성" },
  { id: "armor_worker", name: "🛡️ 제초단 작업복 & 삿갓", icon: "👒", desc: "갑옷씨에게 지급받은 튼튼한 토벌 작업복!", reqType: "battle", reqStage: 10, reqText: "토벌 Stage 10 클리어" },
  { id: "magical_girl", name: "✨ 마법소녀 요술봉 코스튬", icon: "🪄", desc: "마법의 힘으로 반짝반짝 빛나는 신비한 드레스!", reqType: "study", reqLevel: 20, reqText: "공부 레벨 Lv.20 달성" },
  { id: "gym_jersey", name: "🥋 우사기 헬스 트레이닝복", icon: "🥊", desc: "근육 펌핑과 민첩성을 극대화한 운동복 세트!", reqType: "gym", reqLevel: 20, reqText: "공격력/체력 Lv.20 달성" },
  { id: "golden_master", name: "👑 전설의 황금 마스터 망토", icon: "👑", desc: "먼작귀 세계관을 평정한 최강 마스터의 황금빛 망토!", reqType: "battle", reqStage: 50, reqText: "토벌 최종보스(Stage 50) 클리어" }
];

function getAcorns() {
  try {
    const v = localStorage.getItem('chiikawa_acorns');
    if (v !== null) return parseInt(v, 10);
  } catch (e) {}
  return 300; // 기본 300 도토리 지급
}

function saveAcorns(cnt) {
  try {
    localStorage.setItem('chiikawa_acorns', cnt);
  } catch (e) {}
  document.getElementById('myAcornCount').textContent = cnt;
}

function getMyRoomData() {
  try {
    const v = localStorage.getItem('chiikawa_myroom_data');
    if (v) return JSON.parse(v);
  } catch (e) {}
  return { ownedFurniture: { "pudding_cushion": true, "photo_frame": true }, placedFurniture: { "pudding_cushion": true, "photo_frame": true }, equippedCostume: "classic" };
}

function saveMyRoomData(data) {
  try {
    localStorage.setItem('chiikawa_myroom_data', JSON.stringify(data));
  } catch (e) {}
}

let roomData = getMyRoomData();

// 탭 전환
function switchMyRoomTab(tab) {
  document.getElementById('btnTabRoom').classList.toggle('active', tab === 'room');
  document.getElementById('btnTabWardrobe').classList.toggle('active', tab === 'wardrobe');
  document.getElementById('tabContentRoom').classList.toggle('hidden', tab !== 'room');
  document.getElementById('tabContentWardrobe').classList.toggle('hidden', tab !== 'wardrobe');
}

// 가구 렌더링
function renderFurnitureCatalog() {
  const grid = document.getElementById('furnitureGrid');
  grid.innerHTML = '';

  FURNITURE_DB.forEach(f => {
    const isOwned = !!roomData.ownedFurniture[f.id];
    const isPlaced = !!roomData.placedFurniture[f.id];

    const card = document.createElement('div');
    card.className = 'furniture-card';
    card.innerHTML = `
      <div class="furniture-icon">${f.icon}</div>
      <div class="furniture-name">${f.name}</div>
      <div class="furniture-desc">${f.desc}</div>
      ${!isOwned ? 
        `<button class="btn-furn-action btn-furn-buy" onclick="buyFurniture('${f.id}')">🌰 ${f.cost}개 구매</button>` :
        (isPlaced ? 
          `<button class="btn-furn-action btn-furn-placed" onclick="togglePlaceFurniture('${f.id}')">✅ 배치 중 (해제)</button>` :
          `<button class="btn-furn-action btn-furn-unplace" onclick="togglePlaceFurniture('${f.id}')">📦 방에 배치하기</button>`
        )
      }
    `;
    grid.appendChild(card);
  });

  renderRoomDecorations();
}

function buyFurniture(id) {
  const f = FURNITURE_DB.find(item => item.id === id);
  if (!f) return;
  const acorns = getAcorns();

  if (acorns < f.cost) {
    showToast("도토리 코인이 부족합니다! 미니게임이나 토벌을 통해 모아보세요 🌰");
    return;
  }

  saveAcorns(acorns - f.cost);
  roomData.ownedFurniture[id] = true;
  roomData.placedFurniture[id] = true;
  saveMyRoomData(roomData);
  showToast(`🎉 [${f.name}] 가구를 구매하여 방에 배치했습니다!`);
  renderFurnitureCatalog();
}

function togglePlaceFurniture(id) {
  if (!roomData.ownedFurniture[id]) return;
  roomData.placedFurniture[id] = !roomData.placedFurniture[id];
  saveMyRoomData(roomData);
  renderFurnitureCatalog();
}

function renderRoomDecorations() {
  const layer = document.getElementById('roomDecorationsLayer');
  layer.innerHTML = '';

  FURNITURE_DB.forEach(f => {
    if (roomData.placedFurniture[f.id]) {
      const el = document.createElement('div');
      el.className = 'placed-furniture-item';
      el.style.top = f.pos.top;
      el.style.left = f.pos.left;
      el.textContent = f.icon;
      el.title = f.name;
      layer.appendChild(el);
    }
  });
}

// 코스튬 렌더링
function renderCostumes() {
  const grid = document.getElementById('costumesGrid');
  grid.innerHTML = '';
  const trainingStats = JSON.parse(localStorage.getItem('chiikawa_training_stats') || '{}');
  const battleStage = parseInt(localStorage.getItem('chiikawa_battle_stage') || '1', 10);

  COSTUMES_DB.forEach(c => {
    let isUnlocked = false;
    if (c.reqType === 'free') isUnlocked = true;
    else if (c.reqType === 'weeding') isUnlocked = true; // 제초 450 달성
    else if (c.reqType === 'battle') isUnlocked = (battleStage >= c.reqStage);
    else if (c.reqType === 'study') isUnlocked = ((trainingStats.studyLevel || 1) >= c.reqLevel);
    else if (c.reqType === 'gym') isUnlocked = ((trainingStats.atkLevel || 1) >= c.reqLevel);

    const isEquipped = (roomData.equippedCostume === c.id);

    const card = document.createElement('div');
    card.className = `costume-card ${isEquipped ? 'equipped' : ''} ${!isUnlocked ? 'locked' : ''}`;
    card.innerHTML = `
      <div class="costume-icon-box">${c.icon}</div>
      <div class="costume-info">
        <div class="costume-name">${c.name}</div>
        <div class="costume-req">${c.reqText}</div>
        ${isUnlocked ?
          (isEquipped ?
            `<button class="btn-costume-equip" style="background:#20C997;">착용 중 ✨</button>` :
            `<button class="btn-costume-equip" onclick="equipCostume('${c.id}')">착용하기 👗</button>`
          ) :
          `<span style="font-size:0.8rem; color:#868E96;">🔒 미해금</span>`
        }
      </div>
    `;
    grid.appendChild(card);
  });

  const curCos = COSTUMES_DB.find(item => item.id === roomData.equippedCostume) || COSTUMES_DB[0];
  document.getElementById('equippedSkinName').textContent = curCos.name;
  document.getElementById('equippedSkinDesc').textContent = curCos.desc;
}

function equipCostume(id) {
  roomData.equippedCostume = id;
  saveMyRoomData(roomData);
  localStorage.setItem('chiikawa_equipped_skin', id);
  showToast("👗 새로운 코스튬을 착용했습니다!");
  renderCostumes();
}

function showToast(msg) {
  const toast = document.getElementById('toastPopup');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => { toast.classList.remove('show'); }, 2200);
}

window.addEventListener('DOMContentLoaded', () => {
  saveAcorns(getAcorns());
  renderFurnitureCatalog();
  renderCostumes();
});
