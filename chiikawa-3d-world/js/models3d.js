// ==========================================================================
// 치이카와 3D 오픈월드 타운 - 고품질 3D 캐릭터/몬스터/월드 에셋 빌더 (models3d.js)
// [Real Chiikawa Artwork 3D Volumetric Standee Rig + 1.5-Head Mochi 3D Mesh
//  + High-Res Procedural Terrain Textures + Detailed 3D Landmarks]
// ==========================================================================

let sharedToonGradientMap = null;
function getToonGradientMap() {
  if (sharedToonGradientMap) return sharedToonGradientMap;
  const colors = new Uint8Array([95, 155, 215, 255]);
  const texture = new THREE.DataTexture(colors, colors.length, 1, THREE.LuminanceFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  sharedToonGradientMap = texture;
  return texture;
}

function addCartoonOutline(mesh, thickness = 0.045, outlineColor = 0x2b1d19) {
  if (!mesh || !mesh.geometry) return;
  const outlineMat = new THREE.MeshBasicMaterial({
    color: outlineColor,
    side: THREE.BackSide
  });
  const outlineMesh = new THREE.Mesh(mesh.geometry, outlineMat);
  outlineMesh.scale.setScalar(1 + thickness);
  mesh.add(outlineMesh);
}

// ==========================================================================
// 1. 캐릭터 & 몬스터 공식 설정 데이터
// ==========================================================================
const CHAR_CONFIGS = {
  chiikawa: {
    key: 'chiikawa',
    name: '치이카와',
    title: '💖 핑크 사스마타 & 분홍 곰돌이 포쉐트',
    desc: '작고 귀여운 주인공! 균형 잡힌 이동속도와 넓은 사스마타 베기 범위를 지녔습니다.',
    bodyColor: 0xffffff,
    accentColor: 0xff85a2,
    weaponType: 'sasumata_pink',
    weaponName: '핑크 사스마타',
    speed: 20,
    atk: 32,
    skillName: '분홍 포쉐트 별빛 대폭발',
    portrait: 'assets/chiikawa.png',
    quotes: [
      '와아...!! 열심히 풀을 뽑아서 코인을 모아보자!',
      '에잇-! 무서운 키메라도 용기 내서 사스마타로 찌르자!',
      '하치와레랑 우사기랑 맛있는 차루메라 먹고 싶어...!'
    ]
  },
  hachiware: {
    key: 'hachiware',
    name: '하치와레',
    title: '💙 제초 5급 합격자 & 파란 사스마타',
    desc: '제초 5급 자격증 보유자! 풀뽑기 코인 보너스가 높고 연타 속도가 빠릅니다.',
    bodyColor: 0xffffff,
    accentColor: 0x38bdf8,
    weaponType: 'sasumata_blue',
    weaponName: '블루 사스마타',
    speed: 21,
    atk: 35,
    skillName: '난또까나레! 희망의 파란 회오리',
    portrait: 'assets/hachiware.png',
    quotes: [
      '어떻게든 될 거야(난또까나레)!! 우리가 힘을 합치면 무적이지!',
      '라멘 랑에서 야사이 마시마시에 마늘 듬뿍 넣어 먹자!',
      '제초 5급 자격증의 실력을 제대로 보여줄게!'
    ]
  },
  usagi: {
    key: 'usagi',
    name: '우사기',
    title: '💛 제초 3급 에이스 & 양끝 토벌봉',
    desc: '압도적인 기동력과 폭발적인 화력을 자랑하는 천재 텐션 에이스!',
    bodyColor: 0xfff3c4,
    accentColor: 0xfacc15,
    weaponType: 'wand_yellow',
    weaponName: '폭약 토벌봉',
    speed: 24,
    atk: 42,
    skillName: '우라야하-!! 초음속 황금 번개 스매시',
    portrait: 'assets/usagi.png',
    quotes: [
      '우라-!! 야하-!! 이얏하아아아---!!',
      '하아~?! 푸딩!! 자이언트 푸딩 위로 점프하자!!',
      '야하!! 프리-!! (몬스터를 단숨에 날려버릴 기세다!)'
    ]
  },
  momonga: {
    key: 'momonga',
    name: '모몽가',
    title: '💜 치명적인 귀여움 어필 & 복실 꼬리',
    desc: '빠른 회피 기동과 넓은 범위의 회오리 애교 파동으로 적들을 제압합니다.',
    bodyColor: 0xffffff,
    accentColor: 0xa855f7,
    weaponType: 'sasumata_purple',
    weaponName: '보라 사스마타',
    speed: 22.5,
    atk: 34,
    skillName: '귀여운 척하기! 보랏빛 매혹 폭풍',
    portrait: 'assets/momonga.png',
    quotes: [
      '봐라 봐라! 이 몸의 복실복실한 꼬리를 칭찬해라!',
      '맛있는 걸 바쳐라! 따끈한 백미 밥이랑 달콤한 푸딩 내놔!',
      '앙?! 이 몸이 제일 귀엽지 않느냐!'
    ]
  },
  kurimanju: {
    key: 'kurimanju',
    name: '쿠리만쥬',
    title: '🧡 낭만 안주 마스터 & 묵직한 타격',
    desc: '한 방 한 방이 묵직하고 체력 회복 효율이 뛰어난 어른의 여유!',
    bodyColor: 0xfef3c7,
    accentColor: 0xd97706,
    weaponType: 'sasumata_amber',
    weaponName: '호박빛 사스마타',
    speed: 19.5,
    atk: 38,
    skillName: '크으으-!! 시원한 황금 안주 오라',
    portrait: 'assets/kurimanju.png',
    quotes: [
      '크으으으---!! 일 끝내고 마시는 음료와 안주는 최고지!',
      '자, 여기 구운 오징어랑 따끈한 어묵 국물 한 입 해!',
      '하아아~... 라멘 국물에 마늘 듬뿍 넣으면 해장으로 끝내주지.'
    ]
  },
  rakko: {
    key: 'rakko',
    name: '랏코 사부',
    title: '⚔️ 토벌 랭킹 1위 상위 랭커 & 명검',
    desc: '토벌 랭킹 1위의 검술 달인! 가장 강력한 기본 공격력과 필살 검기를 구사합니다.',
    bodyColor: 0xf5d0a9,
    accentColor: 0xef4444,
    weaponType: 'rakko_sword',
    weaponName: '랭커의 명검',
    speed: 22.5,
    atk: 46,
    skillName: '상위 랭커의 비기: 일섬 십자베기',
    portrait: 'assets/rakko.png',
    quotes: [
      '토벌 랭킹 1위의 검술을 보여주마. 나를 믿고 따라와라!',
      '전투가 끝난 뒤 파르페와 달콤한 딸기 생크림을 먹는 게 진짜 보람이지...',
      '강해지고 싶다면 두려워하지 말고 정면으로 검을 휘둘러라!'
    ]
  }
};

// ==========================================================================
// 2. 고해상도 프로시저럴 월드 지형 텍스처 생성기 (Grass, Plaza, Water, Forest)
// ==========================================================================
function createGrassCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 파스텔 초원 베이스 그라데이션
  ctx.fillStyle = '#84cc16';
  ctx.fillRect(0, 0, 512, 512);

  // 부드러운 잔디 패치 변주
  for (let i = 0; i < 90; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(163, 230, 53, 0.38)' : 'rgba(101, 163, 13, 0.25)';
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, 18 + Math.random() * 35, 0, Math.PI * 2);
    ctx.fill();
  }

  // 세밀한 풀잎 & 세잎클로버 디테일
  for (let i = 0; i < 420; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.strokeStyle = i % 3 === 0 ? '#ecfccb' : '#4d7c0f';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - 3, y - 8);
    ctx.moveTo(x, y);
    ctx.lineTo(x + 3, y - 7);
    ctx.stroke();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(16, 16);
  return tex;
}

function createPlazaCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#fef3c7';
  ctx.fillRect(0, 0, 512, 512);

  // 원형 광장 벽돌 타일 패턴
  const cx = 256;
  const cy = 256;
  for (let r = 24; r < 250; r += 26) {
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();

    const spokes = Math.max(8, Math.floor(r / 10));
    for (let s = 0; s < spokes; s++) {
      const a = (s / spokes) * Math.PI * 2 + (r % 2) * 0.2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
      ctx.lineTo(cx + Math.cos(a) * (r + 26), cy + Math.sin(a) * (r + 26));
      ctx.stroke();
    }
  }

  // 외곽 파스텔 핑크 링
  ctx.strokeStyle = '#fb7185';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, 238, 0, Math.PI * 2);
  ctx.stroke();

  const tex = new THREE.CanvasTexture(canvas);
  return tex;
}

function createWaterCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0ea5e9';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 65; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(125, 211, 252, 0.45)' : 'rgba(255, 255, 255, 0.35)';
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.beginPath();
    ctx.ellipse(x, y, 28 + Math.random() * 30, 6 + Math.random() * 6, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(6, 1);
  return tex;
}

// ==========================================================================
// 3. 스마트 배경 투명화 & 원작 일러스트 3D 입체 스탠디 생성기
//    (틈새 막기 모폴로지 Flood-Fill로 흰색 몸통은 보존하고 외부 흰 배경만 완벽 제거!)
// ==========================================================================
const cleanTextureCache = {};

function loadCleanCharacterTexture(imageUrl, onReady) {
  if (cleanTextureCache[imageUrl]) {
    if (onReady) onReady(cleanTextureCache[imageUrl]);
    return cleanTextureCache[imageUrl];
  }

  // 로딩 전 임시 투명 텍스처 생성
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = 512;
  tempCanvas.height = 512;
  const texture = new THREE.CanvasTexture(tempCanvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  cleanTextureCache[imageUrl] = texture;

  const img = new Image();
  img.crossOrigin = 'anonymous';
  img.onload = () => {
    const size = 512;
    const c = document.createElement('canvas');
    c.width = size;
    c.height = size;
    const ctx = c.getContext('2d');

    // 여백 16px을 두어 외곽선 테두리가 잘리지 않게 그림
    const pad = 18;
    const drawW = size - pad * 2;
    const drawH = size - pad * 2;
    ctx.drawImage(img, pad, pad, drawW, drawH);

    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;

    // 1) 이미 투명 배경(WebP 알파)인지 확인: 모서리 (pad+2, pad+2) 픽셀 알파 체크
    const cornerIdx = ((pad + 2) * size + (pad + 2)) * 4;
    const hasNativeAlpha = data[cornerIdx + 3] < 50;

    if (!hasNativeAlpha) {
      // 2) JPEG 흰 배경 제거: 나가노 작가님 특유의 끊어진 외곽선 틈새(약 8~16px)로
      //    배경 투명화가 캐릭터 흰 얼굴 안으로 새어 들어가는 것을 방지하기 위해
      //    [어두운 외곽선 팽창(Dilation) -> 외부 BFS Flood-Fill -> 원래 외곽선까지 복원] 수행!
      const N = size * size;
      const isDarkLine = new Uint8Array(N);
      for (let i = 0; i < N; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        const a = data[i * 4 + 3];
        // 외곽선 또는 채색 영역 판정
        if (a > 50 && (r < 238 || g < 238 || b < 238)) {
          isDarkLine[i] = 1;
        }
      }

      // 틈새 봉합용 팽창 반경 (12px: 귀/어깨 사이 끊어진 선을 완벽히 이어줌)
      const sealRadius = 12;
      const sealedBarrier = new Uint8Array(N);
      const horizTemp = new Uint8Array(N);

      // 수평 1D 팽창
      for (let y = 0; y < size; y++) {
        const rowOff = y * size;
        let count = 0;
        for (let x = 0; x <= sealRadius; x++) count += isDarkLine[rowOff + x];
        for (let x = 0; x < size; x++) {
          if (count > 0) horizTemp[rowOff + x] = 1;
          const removeX = x - sealRadius;
          const addX = x + sealRadius + 1;
          if (removeX >= 0) count -= isDarkLine[rowOff + removeX];
          if (addX < size) count += isDarkLine[rowOff + addX];
        }
      }
      // 수직 1D 팽창
      for (let x = 0; x < size; x++) {
        let count = 0;
        for (let y = 0; y <= sealRadius; y++) count += horizTemp[y * size + x];
        for (let y = 0; y < size; y++) {
          if (count > 0) sealedBarrier[y * size + x] = 1;
          const removeY = y - sealRadius;
          const addY = y + sealRadius + 1;
          if (removeY >= 0) count -= horizTemp[removeY * size + x];
          if (addY < size) count += horizTemp[addY * size + x];
        }
      }

      // 봉합된 장벽 바깥(테두리 (0,0))에서 BFS Flood-Fill로 진짜 외부 배경 탐색
      const isExteriorCore = new Uint8Array(N);
      const queue = new Int32Array(N);
      let head = 0;
      let tail = 0;

      const pushSeed = ( idx ) => {
        if (!sealedBarrier[idx] && !isExteriorCore[idx]) {
          isExteriorCore[idx] = 1;
          queue[tail++] = idx;
        }
      };

      for (let x = 0; x < size; x++) {
        pushSeed(x);
        pushSeed((size - 1) * size + x);
      }
      for (let y = 0; y < size; y++) {
        pushSeed(y * size);
        pushSeed(y * size + (size - 1));
      }

      while (head < tail) {
        const cur = queue[head++];
        const cx = cur % size;
        const cy = (cur / size) | 0;
        if (cx > 0) pushSeed(cur - 1);
        if (cx < size - 1) pushSeed(cur + 1);
        if (cy > 0) pushSeed(cur - size);
        if (cy < size - 1) pushSeed(cur + size);
      }

      // 이제 외부 코어 영역을 다시 sealRadius만큼 확장하되, 실제 어두운 외곽선(isDarkLine)에서 멈춤!
      const isExteriorFinal = new Uint8Array(isExteriorCore);
      let curWave = [];
      for (let i = 0; i < N; i++) {
        if (isExteriorCore[i]) {
          const cx = i % size;
          const cy = (i / size) | 0;
          if (
            (cx > 0 && !isExteriorCore[i - 1]) ||
            (cx < size - 1 && !isExteriorCore[i + 1]) ||
            (cy > 0 && !isExteriorCore[i - size]) ||
            (cy < size - 1 && !isExteriorCore[i + size])
          ) {
            curWave.push(i);
          }
        }
      }

      for (let step = 0; step < sealRadius + 2; step++) {
        const nextWave = [];
        for (let k = 0; k < curWave.length; k++) {
          const idx = curWave[k];
          const cx = idx % size;
          const cy = (idx / size) | 0;
          const neighbors = [];
          if (cx > 0) neighbors.push(idx - 1);
          if (cx < size - 1) neighbors.push(idx + 1);
          if (cy > 0) neighbors.push(idx - size);
          if (cy < size - 1) neighbors.push(idx + size);

          for (let n = 0; n < neighbors.length; n++) {
            const nb = neighbors[n];
            if (!isExteriorFinal[nb] && !isDarkLine[nb]) {
              isExteriorFinal[nb] = 1;
              nextWave.push(nb);
            }
          }
        }
        curWave = nextWave;
        if (curWave.length === 0) break;
      }

      // 외부 배경 픽셀 알파를 0으로 설정 & 외곽 경계 부드럽게 안티앨리어싱
      for (let i = 0; i < N; i++) {
        if (isExteriorFinal[i]) {
          data[i * 4 + 3] = 0;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    // 최종 캔버스에 깔끔한 화이트 피규어 림(Sticker Rim) 효과를 뒤에 살짝 깔아 입체감 극대화
    const finalCtx = tempCanvas.getContext('2d');
    finalCtx.clearRect(0, 0, size, size);
    finalCtx.save();
    finalCtx.shadowColor = 'rgba(255, 255, 255, 0.95)';
    finalCtx.shadowBlur = 4;
    finalCtx.drawImage(c, 0, 0);
    finalCtx.restore();
    finalCtx.drawImage(c, 0, 0);

    texture.needsUpdate = true;
    if (onReady) onReady(texture);
  };
  img.src = imageUrl;
  return texture;
}

// ==========================================================================
// 4. 사스마타 & 전용 무기 3D 메쉬 빌더
// ==========================================================================
function createWeapon3D(weaponType) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  if (weaponType === 'rakko_sword') {
    const hiltMat = new THREE.MeshToonMaterial({ color: 0x1e293b, gradientMap });
    const goldMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });
    const bladeMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, gradientMap });

    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 1.0, 10), hiltMat);
    addCartoonOutline(handle, 0.05);
    group.add(handle);

    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.16, 0.35), goldMat);
    guard.position.y = 0.55;
    addCartoonOutline(guard, 0.05);
    group.add(guard);

    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.24, 2.7, 0.08), bladeMat);
    blade.position.y = 1.95;
    blade.castShadow = true;
    addCartoonOutline(blade, 0.04);
    group.add(blade);
    return group;
  }

  if (weaponType === 'wand_yellow') {
    const rodMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });
    const tipMat = new THREE.MeshToonMaterial({ color: 0xf43f5e, gradientMap });

    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.4, 12), rodMat);
    rod.position.y = 1.0;
    addCartoonOutline(rod, 0.04);
    group.add(rod);

    const topBall = new THREE.Mesh(new THREE.SphereGeometry(0.34, 14, 14), tipMat);
    topBall.position.y = 2.75;
    addCartoonOutline(topBall, 0.05);
    group.add(topBall);

    const botBall = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), tipMat);
    botBall.position.y = -0.7;
    addCartoonOutline(botBall, 0.05);
    group.add(botBall);
    return group;
  }

  // 기본: 사스마타 (Sasumata)
  let colorHex = 0xff85a2;
  if (weaponType === 'sasumata_blue') colorHex = 0x38bdf8;
  if (weaponType === 'sasumata_purple') colorHex = 0xc084fc;
  if (weaponType === 'sasumata_amber') colorHex = 0xf59e0b;

  const mat = new THREE.MeshToonMaterial({ color: colorHex, gradientMap });
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.1, 3.2, 12), mat);
  pole.position.y = 1.0;
  pole.castShadow = true;
  addCartoonOutline(pole, 0.04);
  group.add(pole);

  const forkGeo = new THREE.TorusGeometry(0.48, 0.1, 10, 22, Math.PI);
  const fork = new THREE.Mesh(forkGeo, mat);
  fork.position.y = 2.65;
  fork.rotation.z = Math.PI;
  fork.castShadow = true;
  addCartoonOutline(fork, 0.04);
  group.add(fork);

  return group;
}

// ==========================================================================
// 5. 3D 머리 코스튬 액세서리 생성기 (왕관, 벚꽃 화관, 왕리본, 천사링)
// ==========================================================================
function createHatAccessory3D(hatType) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  if (hatType === 'crown') {
    const goldMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });
    const gemMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.55, 0.42, 16), goldMat);
    addCartoonOutline(base, 0.05);
    group.add(base);

    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.42, 8), goldMat);
      spike.position.set(Math.cos(a) * 0.5, 0.36, Math.sin(a) * 0.5);
      group.add(spike);
    }

    const ruby = new THREE.Mesh(new THREE.SphereGeometry(0.14, 10, 10), gemMat);
    ruby.position.set(0, 0.05, 0.58);
    group.add(ruby);
    return group;
  }

  if (hatType === 'flower') {
    const vineMat = new THREE.MeshToonMaterial({ color: 0x4ade80, gradientMap });
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.09, 10, 24), vineMat);
    torus.rotation.x = Math.PI / 2;
    group.add(torus);

    const petalColors = [0xff85a2, 0xfef08a, 0xc084fc, 0x60a5fa, 0xfb7185, 0xffffff];
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      const fMat = new THREE.MeshToonMaterial({ color: petalColors[i], gradientMap });
      const flower = new THREE.Mesh(new THREE.SphereGeometry(0.22, 10, 10), fMat);
      flower.position.set(Math.cos(a) * 0.85, 0.08, Math.sin(a) * 0.85);
      addCartoonOutline(flower, 0.05);
      group.add(flower);
    }
    return group;
  }

  if (hatType === 'ribbon') {
    const ribMat = new THREE.MeshToonMaterial({ color: 0xff4d6d, gradientMap });
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), ribMat);
    addCartoonOutline(center, 0.05);
    group.add(center);

    const leftWing = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.68, 12), ribMat);
    leftWing.rotation.z = -Math.PI / 2;
    leftWing.position.x = -0.38;
    addCartoonOutline(leftWing, 0.05);
    group.add(leftWing);

    const rightWing = new THREE.Mesh(new THREE.ConeGeometry(0.42, 0.68, 12), ribMat);
    rightWing.rotation.z = Math.PI / 2;
    rightWing.position.x = 0.38;
    addCartoonOutline(rightWing, 0.05);
    group.add(rightWing);
    return group;
  }

  if (hatType === 'halo') {
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.09, 12, 28), haloMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.55;
    group.add(ring);
    return group;
  }

  return null;
}

// ==========================================================================
// 6. 진짜 치이카와 캐릭터 3D 하이브리드 모델 빌더 (createChiikawaPlushie)
//    - 기본(Default): 원작 고해상도 일러스트를 다층 3D 볼륨 레이어로 적층한
//      3D 디오라마 스탠디 리그 (진짜 치이카와 외형 100% 일치!)
//    - 호환: 팔다리/무기 피벗, 3D 모자 장착, 피격 플래시, 1.5등신 찹쌀떡 3D 메쉬 전환 지원
// ==========================================================================
function createChiikawaPlushie(charKey = 'chiikawa') {
  const cfg = CHAR_CONFIGS[charKey] || CHAR_CONFIGS.chiikawa;
  const root = new THREE.Group();
  root.userData.charKey = charKey;

  // 바닥 원형 그림자 디스크
  const shadowGeo = new THREE.CircleGeometry(1.75, 28);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x0f172a,
    transparent: true,
    opacity: 0.28,
    depthWrite: false
  });
  const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
  shadowDisc.position.y = 0.04;
  root.add(shadowDisc);

  // ------------------------------------------------------------------------
  // A. 원작 일러스트 3D 입체 볼륨 스탠디 그룹 (10겹 3D 두께 적층으로 입체 피규어감 구현)
  // ------------------------------------------------------------------------
  const standeeGroup = new THREE.Group();
  const charTex = loadCleanCharacterTexture(cfg.portrait);

  const layerCount = 9;
  const totalThickness = 0.38;
  const planeW = 4.6;
  const planeH = 4.8;
  const planeGeo = new THREE.PlaneGeometry(planeW, planeH);

  const standeeMaterials = [];
  for (let i = 0; i < layerCount; i++) {
    const isFrontOrBack = i === 0 || i === layerCount - 1;
    const mat = new THREE.MeshBasicMaterial({
      map: charTex,
      transparent: true,
      alphaTest: 0.15,
      side: THREE.DoubleSide,
      color: isFrontOrBack ? 0xffffff : 0xf1f5f9
    });
    standeeMaterials.push(mat);

    const slice = new THREE.Mesh(planeGeo, mat);
    slice.position.y = 2.4;
    slice.position.z = ((i / (layerCount - 1)) - 0.5) * totalThickness;
    slice.castShadow = i === Math.floor(layerCount / 2);
    standeeGroup.add(slice);
  }
  root.add(standeeGroup);

  // ------------------------------------------------------------------------
  // B. 3D 무기 & 팔다리 피벗 (3D 사스마타/명검을 옆에 들고 휘두름)
  // ------------------------------------------------------------------------
  const leftLegPivot = new THREE.Group();
  const rightLegPivot = new THREE.Group();
  const leftArmPivot = new THREE.Group();
  const rightArmPivot = new THREE.Group();
  const earsGroup = new THREE.Group();

  rightArmPivot.position.set(1.65, 1.85, 0.35);
  const weaponMesh = createWeapon3D(cfg.weaponType);
  weaponMesh.position.set(0.2, -0.3, 0.2);
  weaponMesh.rotation.x = Math.PI / 7;
  weaponMesh.rotation.z = -0.18;
  rightArmPivot.add(weaponMesh);

  root.add(leftLegPivot);
  root.add(rightLegPivot);
  root.add(leftArmPivot);
  root.add(rightArmPivot);
  root.add(earsGroup);

  // 3D 모자 장착 슬롯 (정수리 위)
  const hatSlot = new THREE.Group();
  hatSlot.position.set(0, 4.45, 0.1);
  root.add(hatSlot);

  root.userData.parts = {
    standeeGroup,
    standeeMaterials,
    leftLegPivot,
    rightLegPivot,
    leftArmPivot,
    rightArmPivot,
    earsGroup,
    hatSlot,
    weaponMesh
  };

  // 표정/상태 변화 시 컬러/바운스 연출
  root.userData.setExpression = expr => {
    if (expr === 'attack') {
      standeeGroup.scale.set(1.1, 0.92, 1.1);
    } else if (expr === 'happy') {
      standeeGroup.scale.set(1.12, 1.12, 1.12);
    } else {
      standeeGroup.scale.set(1, 1, 1);
    }
  };

  // 3D 모자 장착 메서드
  root.userData.equipHat = hatType => {
    while (hatSlot.children.length > 0) {
      hatSlot.remove(hatSlot.children[0]);
    }
    if (!hatType || hatType === 'none') return;
    const hatMesh = createHatAccessory3D(hatType);
    if (hatMesh) {
      hatSlot.add(hatMesh);
    }
  };

  return root;
}

// ==========================================================================
// 7. 진짜 몬스터 일러스트 기반 3D 입체 몬스터 모델 빌더 (createMonster3D)
// ==========================================================================
const MONSTER_IMAGE_MAP = {
  bug: 'assets/monster_bug.png',
  goblin: 'assets/monster_goblin.png',
  chimera: 'assets/monster_chimera.png',
  midboss: 'assets/midboss.png',
  iron_chimera: 'assets/monster_iron_chimera.png',
  anoko: 'assets/anoko.png'
};

function createMonster3D(type = 'chimera') {
  const group = new THREE.Group();
  const imgUrl = MONSTER_IMAGE_MAP[type] || MONSTER_IMAGE_MAP.chimera;
  const tex = loadCleanCharacterTexture(imgUrl);

  let sizeW = 5.4;
  let sizeH = 5.4;
  if (type === 'bug') {
    sizeW = 4.0;
    sizeH = 4.0;
  } else if (type === 'goblin') {
    sizeW = 4.8;
    sizeH = 4.8;
  } else if (type === 'iron_chimera' || type === 'midboss') {
    sizeW = 6.2;
    sizeH = 6.2;
  } else if (type === 'anoko') {
    sizeW = 8.6;
    sizeH = 8.6;
  }

  // 바닥 위협 그림자 & 붉은 오라 링
  const shadowGeo = new THREE.CircleGeometry(sizeW * 0.36, 28);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: type === 'anoko' ? 0x991b1b : 0x0f172a,
    transparent: true,
    opacity: type === 'anoko' ? 0.45 : 0.28,
    depthWrite: false
  });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.position.y = 0.05;
  group.add(shadow);

  // 다층 3D 입체 몬스터 스탠디
  const bodyWrap = new THREE.Group();
  const layers = 7;
  const thickness = type === 'anoko' ? 0.55 : 0.36;
  const planeGeo = new THREE.PlaneGeometry(sizeW, sizeH);

  const mats = [];
  for (let i = 0; i < layers; i++) {
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.15,
      side: THREE.DoubleSide
    });
    mats.push(mat);
    const mesh = new THREE.Mesh(planeGeo, mat);
    mesh.position.y = sizeH * 0.48;
    mesh.position.z = ((i / (layers - 1)) - 0.5) * thickness;
    mesh.castShadow = i === Math.floor(layers / 2);
    bodyWrap.add(mesh);
  }

  group.add(bodyWrap);
  group.userData.bodyWrap = bodyWrap;
  group.userData.mats = mats;

  // 피격 시 하얗게/붉게 반짝이는 플래시 효과
  group.userData.flashHit = () => {
    mats.forEach(m => m.color.setHex(0xff8fa3));
    setTimeout(() => {
      mats.forEach(m => m.color.setHex(0xffffff));
    }, 110);
  };

  return group;
}

// ==========================================================================
// 8. 3D 초원 잡초 & 황금 클로버 패치
// ==========================================================================
function createWeedPatch3D(isGolden = false) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const color = isGolden ? 0xfacc15 : 0x22c55e;
  const mat = new THREE.MeshToonMaterial({
    color,
    gradientMap,
    emissive: isGolden ? 0xca8a04 : 0x000000,
    emissiveIntensity: isGolden ? 0.35 : 0
  });

  // 바닥 흙더미
  const soilMat = new THREE.MeshToonMaterial({ color: 0x78350f, gradientMap });
  const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.95, 0.22, 12), soilMat);
  soil.position.y = 0.11;
  group.add(soil);

  for (let i = 0; i < 6; i++) {
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.45, 7), mat);
    const angle = (i / 6) * Math.PI * 2;
    blade.position.set(Math.cos(angle) * 0.35, 0.72, Math.sin(angle) * 0.35);
    blade.rotation.z = Math.cos(angle) * 0.32;
    blade.rotation.x = Math.sin(angle) * 0.32;
    blade.castShadow = true;
    addCartoonOutline(blade, 0.055, isGolden ? 0x854d0e : 0x14532d);
    group.add(blade);
  }

  if (isGolden) {
    const starMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.32, 0), starMat);
    star.position.y = 1.65;
    group.add(star);
  }

  return group;
}

// ==========================================================================
// 9. 고품질 3D 월드 랜드마크 (중앙 분수대, 치이카와 하우스, 라멘 랑, 풍차, 다리, 도리이)
// ==========================================================================

// ⛲ 중앙 광장 2단 대리석 분수대
function createPlazaFountain3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const stoneMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, gradientMap });
  const waterMat = new THREE.MeshToonMaterial({ color: 0x38bdf8, gradientMap });
  const goldMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });

  // 1단 수조
  const poolWall = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 4.1, 0.9, 28), stoneMat);
  poolWall.position.y = 0.45;
  poolWall.castShadow = true;
  poolWall.receiveShadow = true;
  addCartoonOutline(poolWall, 0.03);
  group.add(poolWall);

  const waterSurface = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.82, 28), waterMat);
  waterSurface.position.y = 0.5;
  group.add(waterSurface);

  // 중앙 기둥 & 2단 수반
  const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.9, 2.6, 16), stoneMat);
  pillar.position.y = 1.4;
  pillar.castShadow = true;
  addCartoonOutline(pillar, 0.04);
  group.add(pillar);

  const upperBowl = new THREE.Mesh(new THREE.CylinderGeometry(1.9, 1.1, 0.55, 20), stoneMat);
  upperBowl.position.y = 2.6;
  upperBowl.castShadow = true;
  addCartoonOutline(upperBowl, 0.04);
  group.add(upperBowl);

  // 꼭대기 황금 별 조각상
  const topStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), goldMat);
  topStar.position.y = 3.55;
  addCartoonOutline(topStar, 0.05);
  group.add(topStar);
  group.userData.topStar = topStar;

  return group;
}

// 🏡 치이카와 돔 하우스
function createChiikawaHouse3D() {
  const house = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const wallMat = new THREE.MeshToonMaterial({ color: 0xfffbeb, gradientMap });
  const roofMat = new THREE.MeshToonMaterial({ color: 0xff85a2, gradientMap });
  const doorMat = new THREE.MeshToonMaterial({ color: 0x92400e, gradientMap });

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(5.6, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.65),
    wallMat
  );
  dome.position.y = 0;
  dome.castShadow = true;
  dome.receiveShadow = true;
  addCartoonOutline(dome, 0.025);
  house.add(dome);

  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(5.68, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.28),
    roofMat
  );
  cap.position.y = 0.08;
  addCartoonOutline(cap, 0.025);
  house.add(cap);

  // 굴뚝
  const chimneyMat = new THREE.MeshToonMaterial({ color: 0xe11d48, gradientMap });
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 2.8, 14), chimneyMat);
  chimney.position.set(2.8, 4.5, -1.5);
  chimney.castShadow = true;
  addCartoonOutline(chimney, 0.04);
  house.add(chimney);

  // 아치형 현관문
  const door = new THREE.Mesh(new THREE.BoxGeometry(2.1, 3.0, 0.6), doorMat);
  door.position.set(0, 1.5, 5.25);
  addCartoonOutline(door, 0.04);
  house.add(door);

  // 따뜻한 빛이 나는 창문 2개
  const winMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
  const frameMat = new THREE.MeshToonMaterial({ color: 0x78350f, gradientMap });
  [-2.7, 2.7].forEach(wx => {
    const wFrame = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.3, 18), frameMat);
    wFrame.rotation.x = Math.PI / 2;
    wFrame.position.set(wx, 2.5, 4.65);
    house.add(wFrame);

    const wGlass = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.34, 18), winMat);
    wGlass.rotation.x = Math.PI / 2;
    wGlass.position.set(wx, 2.5, 4.65);
    house.add(wGlass);
  });

  // 집 앞 피크닉 돗자리 & 핫케이크
  const matCarpet = new THREE.Mesh(
    new THREE.BoxGeometry(4.2, 0.08, 3.2),
    new THREE.MeshToonMaterial({ color: 0xfb7185, gradientMap })
  );
  matCarpet.position.set(-4.6, 0.05, 6.2);
  house.add(matCarpet);

  const cake = new THREE.Mesh(
    new THREE.CylinderGeometry(0.65, 0.7, 0.38, 16),
    new THREE.MeshToonMaterial({ color: 0xd97706, gradientMap })
  );
  cake.position.set(-4.6, 0.25, 6.2);
  addCartoonOutline(cake, 0.05);
  house.add(cake);

  return house;
}

// 🍜 갑옷씨의 라멘 '랑(郎)' 포장마차
function createRamenStall3D() {
  const stall = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const woodMat = new THREE.MeshToonMaterial({ color: 0xb45309, gradientMap });
  const redMat = new THREE.MeshToonMaterial({ color: 0xdc2626, gradientMap });
  const yellowMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });

  const counter = new THREE.Mesh(new THREE.BoxGeometry(8.2, 2.4, 4.2), woodMat);
  counter.position.y = 1.2;
  counter.castShadow = true;
  counter.receiveShadow = true;
  addCartoonOutline(counter, 0.03);
  stall.add(counter);

  [-3.6, 3.6].forEach(px => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 5.8, 12), woodMat);
    pillar.position.set(px, 3.2, 1.8);
    pillar.castShadow = true;
    addCartoonOutline(pillar, 0.04);
    stall.add(pillar);
  });

  const roof = new THREE.Mesh(new THREE.ConeGeometry(6.8, 2.6, 4), redMat);
  roof.position.y = 6.8;
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  addCartoonOutline(roof, 0.03);
  stall.add(roof);

  // 간판 캔버스 텍스처
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512;
  signCanvas.height = 128;
  const sctx = signCanvas.getContext('2d');
  sctx.fillStyle = '#facc15';
  sctx.fillRect(0, 0, 512, 128);
  sctx.strokeStyle = '#dc2626';
  sctx.lineWidth = 10;
  sctx.strokeRect(5, 5, 502, 118);
  sctx.fillStyle = '#1e293b';
  sctx.font = '900 62px Pretendard, sans-serif';
  sctx.textAlign = 'center';
  sctx.textBaseline = 'middle';
  sctx.fillText('🍜 라멘 랑 (郎)', 256, 66);

  const signTex = new THREE.CanvasTexture(signCanvas);
  const banner = new THREE.Mesh(
    new THREE.BoxGeometry(6.6, 1.35, 0.25),
    new THREE.MeshBasicMaterial({ map: signTex })
  );
  banner.position.set(0, 5.1, 2.25);
  addCartoonOutline(banner, 0.04);
  stall.add(banner);

  // 의자 4개 & 카운터 위 라멘 그릇
  const stoolMat = new THREE.MeshToonMaterial({ color: 0xef4444, gradientMap });
  [-2.7, -0.9, 0.9, 2.7].forEach(sx => {
    const seat = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.25, 14), stoolMat);
    seat.position.set(sx, 1.35, 3.2);
    addCartoonOutline(seat, 0.05);
    stall.add(seat);

    const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.2, 1.3, 10), woodMat);
    leg.position.set(sx, 0.65, 3.2);
    stall.add(leg);

    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.48, 0.3, 0.35, 14), yellowMat);
    bowl.position.set(sx, 2.55, 1.3);
    addCartoonOutline(bowl, 0.05);
    stall.add(bowl);
  });

  // 붉은 초롱불 2개 & 따뜻한 조명
  const lanternMat = new THREE.MeshBasicMaterial({ color: 0xff4d6d });
  [-3.2, 3.2].forEach(lx => {
    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.58, 14, 14), lanternMat);
    lantern.scale.y = 1.35;
    lantern.position.set(lx, 4.6, 2.3);
    addCartoonOutline(lantern, 0.05);
    stall.add(lantern);
  });

  const warmLight = new THREE.PointLight(0xffb703, 1.1, 20);
  warmLight.position.set(0, 4.5, 3.5);
  stall.add(warmLight);

  // 갑옷씨 (Armor-san)
  const armorMat = new THREE.MeshToonMaterial({ color: 0x94a3b8, gradientMap });
  const armorBody = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.25, 2.7, 16), armorMat);
  armorBody.position.set(0, 2.7, -0.5);
  addCartoonOutline(armorBody, 0.04);
  stall.add(armorBody);

  const armorHead = new THREE.Mesh(new THREE.SphereGeometry(0.98, 16, 16), armorMat);
  armorHead.position.set(0, 4.4, -0.5);
  addCartoonOutline(armorHead, 0.04);
  stall.add(armorHead);

  return stall;
}

// 🌱 제초 평원 회전 풍차
function createWindmill3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const bodyMat = new THREE.MeshToonMaterial({ color: 0xfef3c7, gradientMap });
  const roofMat = new THREE.MeshToonMaterial({ color: 0x10b981, gradientMap });
  const woodMat = new THREE.MeshToonMaterial({ color: 0x92400e, gradientMap });

  const tower = new THREE.Mesh(new THREE.CylinderGeometry(2.0, 2.8, 7.5, 18), bodyMat);
  tower.position.y = 3.75;
  tower.castShadow = true;
  addCartoonOutline(tower, 0.03);
  group.add(tower);

  const roof = new THREE.Mesh(new THREE.ConeGeometry(2.5, 2.4, 18), roofMat);
  roof.position.y = 8.6;
  roof.castShadow = true;
  addCartoonOutline(roof, 0.035);
  group.add(roof);

  // 회전 날개 피벗
  const bladesPivot = new THREE.Group();
  bladesPivot.position.set(0, 6.2, 2.2);

  const hub = new THREE.Mesh(new THREE.SphereGeometry(0.45, 12, 12), woodMat);
  bladesPivot.add(hub);

  const sailMat = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap });
  for (let i = 0; i < 4; i++) {
    const armGroup = new THREE.Group();
    armGroup.rotation.z = (i / 4) * Math.PI * 2;

    const stick = new THREE.Mesh(new THREE.BoxGeometry(0.2, 4.2, 0.15), woodMat);
    stick.position.y = 2.1;
    armGroup.add(stick);

    const sail = new THREE.Mesh(new THREE.BoxGeometry(0.95, 3.2, 0.06), sailMat);
    sail.position.set(0.45, 2.3, 0.05);
    addCartoonOutline(sail, 0.03);
    armGroup.add(sail);

    bladesPivot.add(armGroup);
  }

  group.add(bladesPivot);
  group.userData.bladesPivot = bladesPivot;
  return group;
}

// 🍮 자이언트 푸딩 언덕
function createGiantPudding3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const custardMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });
  const caramelMat = new THREE.MeshToonMaterial({ color: 0x78350f, gradientMap });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(4.6, 6.4, 4.6, 32), custardMat);
  base.position.y = 2.3;
  base.castShadow = true;
  base.receiveShadow = true;
  addCartoonOutline(base, 0.025);
  group.add(base);

  const top = new THREE.Mesh(new THREE.CylinderGeometry(4.5, 4.68, 0.9, 32), caramelMat);
  top.position.y = 4.9;
  top.receiveShadow = true;
  addCartoonOutline(top, 0.03);
  group.add(top);

  const creamMat = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap });
  const cream = new THREE.Mesh(new THREE.SphereGeometry(1.15, 16, 16), creamMat);
  cream.position.set(0, 5.6, 0);
  cream.scale.y = 0.75;
  addCartoonOutline(cream, 0.04);
  group.add(cream);

  const cherryMat = new THREE.MeshToonMaterial({ color: 0xe11d48, gradientMap });
  const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.55, 16, 16), cherryMat);
  cherry.position.set(0, 6.3, 0);
  addCartoonOutline(cherry, 0.05);
  group.add(cherry);

  return group;
}

// 🌉 에메랄드 시냇물 & 아치형 목조 다리
function createRiverAndBridge3D(waterTex) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const waterGeo = new THREE.BoxGeometry(260, 0.25, 7.5);
  const waterMat = new THREE.MeshBasicMaterial({
    map: waterTex || createWaterCanvasTexture()
  });
  const river = new THREE.Mesh(waterGeo, waterMat);
  river.position.set(0, 0.03, 28);
  group.add(river);

  const bankMat = new THREE.MeshToonMaterial({ color: 0xfde68a, gradientMap });
  [-4.1, 4.1].forEach(bz => {
    const bank = new THREE.Mesh(new THREE.BoxGeometry(260, 0.16, 1.4), bankMat);
    bank.position.set(0, 0.02, 28 + bz);
    group.add(bank);
  });

  // 목조 다리
  const bridgeGroup = new THREE.Group();
  const woodMat = new THREE.MeshToonMaterial({ color: 0xb45309, gradientMap });
  const redPostMat = new THREE.MeshToonMaterial({ color: 0xe11d48, gradientMap });

  for (let i = -4; i <= 4; i++) {
    const plank = new THREE.Mesh(new THREE.BoxGeometry(6.8, 0.28, 0.9), woodMat);
    const archY = Math.cos((i / 4.5) * (Math.PI / 2)) * 0.85;
    plank.position.set(0, 0.2 + archY, 28 + i * 0.98);
    plank.castShadow = true;
    plank.receiveShadow = true;
    addCartoonOutline(plank, 0.03);
    bridgeGroup.add(plank);
  }

  [-3.1, 3.1].forEach(rx => {
    for (let j = -1; j <= 1; j++) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.2, 10), redPostMat);
      post.position.set(rx, 1.3, 28 + j * 3.8);
      addCartoonOutline(post, 0.05);
      bridgeGroup.add(post);
    }
    const rail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 8.8), redPostMat);
    rail.position.set(rx, 2.1, 28);
    addCartoonOutline(rail, 0.04);
    bridgeGroup.add(rail);
  });

  group.add(bridgeGroup);
  return group;
}

// ⛩️ 토벌의 숲 입구 게이트
function createToriiGate3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const redMat = new THREE.MeshToonMaterial({ color: 0xdc2626, gradientMap });
  const darkMat = new THREE.MeshToonMaterial({ color: 0x1e293b, gradientMap });

  [-3.8, 3.8].forEach(px => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.5, 7.5, 14), redMat);
    pillar.position.set(px, 3.75, 0);
    pillar.castShadow = true;
    addCartoonOutline(pillar, 0.04);
    group.add(pillar);

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 0.8, 14), darkMat);
    base.position.set(px, 0.4, 0);
    group.add(base);
  });

  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(10.5, 0.65, 0.9), darkMat);
  topBeam.position.y = 7.4;
  addCartoonOutline(topBeam, 0.03);
  group.add(topBeam);

  const subBeam = new THREE.Mesh(new THREE.BoxGeometry(8.8, 0.45, 0.6), redMat);
  subBeam.position.y = 6.0;
  addCartoonOutline(subBeam, 0.035);
  group.add(subBeam);

  return group;
}
