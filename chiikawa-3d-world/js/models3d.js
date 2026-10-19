// ==========================================================================
// 치이카와 3D 오픈월드 타운 (고퀄리티 리마스터)
// 3D 셀 애니메이션 툰 쉐이딩 + 외곽선(Outline) + 초정밀 3D 피규어 & 랜드마크 빌더 (models3d.js)
// ==========================================================================

const CHAR_CONFIGS = {
  chiikawa: {
    id: 'chiikawa',
    name: '치이카와',
    title: '🌸 곰돌이 포쉐트 제초사',
    bodyColor: 0xffffff,
    earType: 'bear',
    weaponType: 'sasumata_pink',
    skillName: '분홍 포쉐트 별빛 대폭발',
    skillColor: 0xff758f,
    portrait: 'assets/chiikawa.png',
    speed: 14.5,
    atk: 32,
    quotes: [
      '와앗... 열심히 풀을 뽑아서 5급 합격할 거야!',
      '우와앙! 하치와레랑 라멘 랑 먹으러 가자!',
      '에잇-! 사스마타로 나쁜 키메라를 물리치자!',
      '하치와레가 끓여준 차루메라... 정말 맛있어!'
    ]
  },
  hachiware: {
    id: 'hachiware',
    name: '하치와레',
    title: '💙 제초 5급 & 푸른 사스마타',
    bodyColor: 0xffffff,
    accentColor: 0x5ba4cf,
    earType: 'cat',
    weaponType: 'sasumata_blue',
    skillName: '난또까나레! 푸른 달빛 회전베기',
    skillColor: 0x38bdf8,
    portrait: 'assets/hachiware.png',
    speed: 15.5,
    atk: 36,
    quotes: [
      '어떻게든 될 거야(난또까나레)! 같이 탐험하자!',
      '차루메라 끓여 먹고 토벌의 숲으로 가볼까?',
      '푸른 사스마타의 힘을 보여줄게! 에잇-!',
      '와아-! 자이언트 푸딩 위에서 보는 경치 최고야!'
    ]
  },
  usagi: {
    id: 'usagi',
    name: '우사기',
    title: '💛 토벌 3급 천재 파이터',
    bodyColor: 0xfff3c4,
    earType: 'rabbit',
    weaponType: 'staff_yellow',
    skillName: '우라라라! 초고화력 화약 연쇄폭격',
    skillColor: 0xfacc15,
    portrait: 'assets/usagi.png',
    speed: 18.0,
    atk: 42,
    quotes: [
      '이얏하-!! 우라라라라-!!',
      '푸하-! 자이언트 푸딩 위에서 점프하자!',
      '하아?! 우라! 당근 로켓 발사!',
      '야하-!! 다 비켜라 우사기님이 나가신다!'
    ]
  },
  momonga: {
    id: 'momonga',
    name: '모몽가',
    title: '💜 귀여움 강요 하늘다람쥐',
    bodyColor: 0xffffff,
    accentColor: 0xa3a8c2,
    earType: 'squirrel',
    weaponType: 'fan_tail',
    skillName: '칭찬해라! 복슬 꼬리 회오리 태풍',
    skillColor: 0xc084fc,
    portrait: 'assets/momonga.png',
    speed: 16.5,
    atk: 35,
    quotes: [
      '어이! 이 몸의 3D 입체 귀여움을 어서 찬양해라!',
      '맛있는 라멘과 푸딩을 이 몸에게 바쳐라!',
      '떼쓰기 회오리로 몬스터들을 날려버리지!',
      '보아라! 이 윤기 흐르는 복슬복슬한 꼬리를!'
    ]
  },
  kurimanju: {
    id: 'kurimanju',
    name: '쿠리만쥬',
    title: '🌰 낭만 미식가 선배',
    bodyColor: 0xfff8e7,
    accentColor: 0x7c3f10,
    earType: 'bear_brown',
    weaponType: 'drink_can',
    skillName: '크으-! 스태미나 200% 건배 파동',
    skillColor: 0xf59e0b,
    portrait: 'assets/kurimanju.png',
    speed: 14.0,
    atk: 38,
    quotes: [
      '하아ー... 크으-! 일 끝내고 마시는 한 잔이 최고지!',
      '라멘 랑에 마늘 듬뿍 넣어서 한 그릇 어때?',
      '천천히 풍경을 즐기면서 풀을 뽑아보자고.',
      '타코야키에 시원한 음료 한 모금... 캬아-!'
    ]
  },
  rakko: {
    id: 'rakko',
    name: '랏코 사부',
    title: '⚔️ 토벌 랭킹 상위권 마스터',
    bodyColor: 0xe6ccb2,
    accentColor: 0x7f5539,
    earType: 'otter',
    weaponType: 'greatsword',
    skillName: '수석 토벌자의 비기: 천공 일섬(一閃)',
    skillColor: 0xfb7185,
    portrait: 'assets/rakko.png',
    speed: 17.0,
    atk: 50,
    quotes: [
      '침착해라. 나를 따라오면 아노코 토벌도 두렵지 않다!',
      '토벌 후엔 달콤한 파르페와 딸기잼을 먹는 게 최고지...',
      '날카로운 검기로 숲의 위험을 베어내겠다!',
      '네 눈빛이 아주 좋아졌군. 일류 토벌자의 자질이 보인다!'
    ]
  }
};

// ==========================================================================
// 0. 셀 애니메이션 툰 그라데이션 & 아웃라인(Inverted Hull) 헬퍼
// ==========================================================================
let sharedToonGradient = null;
function getToonGradientMap() {
  if (sharedToonGradient) return sharedToonGradient;
  const data = new Uint8Array([
    165, 165, 175, 255,
    210, 210, 220, 255,
    242, 242, 248, 255,
    255, 255, 255, 255
  ]);
  const tex = new THREE.DataTexture(data, 4, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  sharedToonGradient = tex;
  return tex;
}

function createToonMat(colorHex, opts = {}) {
  return new THREE.MeshToonMaterial({
    color: colorHex,
    gradientMap: getToonGradientMap(),
    ...opts
  });
}

// 3D 카툰 외곽선(Outline) 메쉬 추가 헬퍼 (나가노 작가풍 다크 브라운 잉크 라인)
const OUTLINE_MAT = new THREE.MeshBasicMaterial({
  color: 0x2b211e,
  side: THREE.BackSide
});

function addCartoonOutline(mesh, thickness = 0.045) {
  const outline = new THREE.Mesh(mesh.geometry, OUTLINE_MAT);
  outline.scale.set(1 + thickness, 1 + thickness, 1 + thickness);
  mesh.add(outline);
  return outline;
}

// ==========================================================================
// 1. 고해상도 2D 캔버스 표정 텍스처 생성기 (1024x512 구면 무왜곡 + 눈 깜빡임 지원)
// ==========================================================================
function createPlushieFaceTexture(charKey, expression = 'normal') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  let bgHex = '#ffffff';
  if (charKey === 'usagi') bgHex = '#fff3c4';
  if (charKey === 'kurimanju') bgHex = '#fff8e7';
  if (charKey === 'rakko') bgHex = '#e6ccb2';

  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 쿠리만쥬 머리 위 밤색 그라데이션 뚜껑 무늬
  if (charKey === 'kurimanju') {
    const grad = ctx.createLinearGradient(0, 0, 0, 175);
    grad.addColorStop(0, '#5c2c06');
    grad.addColorStop(0.85, '#7c3f10');
    grad.addColorStop(1, bgHex);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, 175);
  }

  // 하치와레 파란색 8자(八) 가르마 무늬
  if (charKey === 'hachiware') {
    ctx.fillStyle = '#5ba4cf';
    ctx.fillRect(0, 0, canvas.width, 138);

    // 양옆 파란 앞머리 곡선
    ctx.beginPath();
    ctx.arc(405, 135, 76, 0, Math.PI * 2);
    ctx.arc(619, 135, 76, 0, Math.PI * 2);
    ctx.fill();

    // 이마 중앙 하얀 삼각형 가르마
    ctx.beginPath();
    ctx.moveTo(512, 78);
    ctx.lineTo(418, 220);
    ctx.lineTo(606, 220);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  }

  // 모몽가 회색 털 테두리
  if (charKey === 'momonga') {
    ctx.fillStyle = '#a3a8c2';
    ctx.fillRect(0, 0, canvas.width, 98);
  }

  const cx = 512;
  const cy = 266;

  // 랏코 사부 이마의 십자 흉터 & 주둥이
  if (charKey === 'rakko') {
    ctx.strokeStyle = '#5c3a21';
    ctx.lineWidth = 5.5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 30, cy - 68);
    ctx.lineTo(cx + 20, cy - 42);
    ctx.moveTo(cx - 12, cy - 74);
    ctx.lineTo(cx - 2, cy - 36);
    ctx.stroke();

    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 28, 45, 28, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 발그레한 볼터치 (부드러운 핑크 그라데이션 + 4줄 만화 빗금)
  [-74, 74].forEach(dx => {
    const bx = cx + dx;
    const by = cy + 16;
    const rGrad = ctx.createRadialGradient(bx, by, 4, bx, by, 32);
    rGrad.addColorStop(0, 'rgba(255, 105, 145, 0.65)');
    rGrad.addColorStop(1, 'rgba(255, 105, 145, 0)');
    ctx.fillStyle = rGrad;
    ctx.beginPath();
    ctx.ellipse(bx, by, 32, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = '#ff4d79';
    ctx.lineWidth = 2.6;
    ctx.lineCap = 'round';
    [-12, -4, 4, 12].forEach(sx => {
      ctx.beginPath();
      ctx.moveTo(bx + sx, by - 5);
      ctx.lineTo(bx + sx - 5, by + 6);
      ctx.stroke();
    });
  });

  // 눈썹
  ctx.strokeStyle = '#231917';
  ctx.lineWidth = 5.2;
  ctx.lineCap = 'round';
  if (expression === 'attack' || charKey === 'rakko') {
    ctx.beginPath();
    ctx.moveTo(cx - 66, cy - 49);
    ctx.lineTo(cx - 36, cy - 35);
    ctx.moveTo(cx + 66, cy - 49);
    ctx.lineTo(cx + 36, cy - 35);
    ctx.stroke();
  } else if (expression === 'cry') {
    ctx.beginPath();
    ctx.moveTo(cx - 66, cy - 35);
    ctx.lineTo(cx - 36, cy - 49);
    ctx.moveTo(cx + 66, cy - 35);
    ctx.lineTo(cx + 36, cy - 49);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.arc(cx - 52, cy - 40, 15, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 52, cy - 40, 15, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
  }

  // 눈 그리기 (normal, happy, blink, cry, star)
  if (expression === 'happy') {
    ctx.strokeStyle = '#231917';
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(cx - 52, cy - 8, 17, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 52, cy - 8, 17, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  } else if (expression === 'blink') {
    ctx.strokeStyle = '#231917';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(cx - 68, cy - 8);
    ctx.lineTo(cx - 36, cy - 8);
    ctx.moveTo(cx + 36, cy - 8);
    ctx.lineTo(cx + 68, cy - 8);
    ctx.stroke();
  } else {
    [-52, 52].forEach(offsetX => {
      const ex = cx + offsetX;
      const ey = cy - 10;
      const r = charKey === 'momonga' ? 20 : 17.5;

      // 눈동자 본체
      ctx.fillStyle = '#1f1614';
      ctx.beginPath();
      ctx.arc(ex, ey, r, 0, Math.PI * 2);
      ctx.fill();

      // 상단 큰 화이트 안광
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(ex - 3.5, ey - 5.5, r * 0.44, r * 0.36, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // 하단 반짝이 안광
      ctx.beginPath();
      ctx.arc(ex + 4.5, ey + 6.5, r * 0.22, 0, Math.PI * 2);
      ctx.fill();

      if (expression === 'cry') {
        // 그렁그렁한 눈물
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(ex + (offsetX < 0 ? -11 : 11), ey + 16, 8.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  // 코 작은 점
  ctx.fillStyle = '#231917';
  ctx.beginPath();
  ctx.arc(cx, cy + 5, 3.2, 0, Math.PI * 2);
  ctx.fill();

  // 입 (ω 모양 + 활짝 웃거나 외치는 입)
  ctx.strokeStyle = '#231917';
  ctx.lineWidth = 4.8;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (expression === 'happy' || expression === 'attack') {
    ctx.fillStyle = '#ff6b8b';
    ctx.beginPath();
    ctx.arc(cx, cy + 21, 16, 0, Math.PI);
    ctx.fill();
    ctx.stroke();

    // 입 안 혀 하이라이트
    ctx.fillStyle = '#ffb3c6';
    ctx.beginPath();
    ctx.arc(cx, cy + 27, 9, 0, Math.PI);
    ctx.fill();
  }

  ctx.beginPath();
  ctx.arc(cx - 10, cy + 15, 10, 0.12 * Math.PI, 0.95 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 10, cy + 15, 10, 0.05 * Math.PI, 0.88 * Math.PI);
  ctx.stroke();

  // 하치와레 귀여운 외쪽 송곳니
  if (charKey === 'hachiware') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cx + 11, cy + 22);
    ctx.lineTo(cx + 16, cy + 31);
    ctx.lineTo(cx + 21, cy + 21);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // 쿠리만쥬 '하아ー' 주름 디테일
  if (charKey === 'kurimanju' && expression === 'happy') {
    ctx.strokeStyle = '#7c3f10';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(cx - 24, cy + 32);
    ctx.lineTo(cx + 24, cy + 32);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  texture.needsUpdate = true;
  return texture;
}

// ==========================================================================
// 2. 고퀄리티 3D 입체 봉제인형 피규어 빌더 (툰 쉐이딩 + 외곽선 + 코스튬 슬롯)
// ==========================================================================
function createChiikawaPlushie(charKey = 'chiikawa', hatType = 'none') {
  const cfg = CHAR_CONFIGS[charKey] || CHAR_CONFIGS.chiikawa;
  const root = new THREE.Group();
  root.userData.charKey = charKey;

  const skinMat = createToonMat(cfg.bodyColor);
  const faceTexture = createPlushieFaceTexture(charKey, 'normal');
  const headMat = new THREE.MeshToonMaterial({
    map: faceTexture,
    gradientMap: getToonGradientMap()
  });

  // 바닥 동그란 그림자 원판 (Drop Shadow Blob)
  const shadowGeo = new THREE.CircleGeometry(1.15, 24);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 0.22
  });
  const blobShadow = new THREE.Mesh(shadowGeo, shadowMat);
  blobShadow.position.y = 0.03;
  root.add(blobShadow);

  // 1) 통통한 3D 몸통 + 카툰 외곽선
  const bodyGeo = new THREE.SphereGeometry(1.14, 32, 28);
  bodyGeo.scale(1.0, 1.08, 0.92);
  const bodyMesh = new THREE.Mesh(bodyGeo, skinMat);
  bodyMesh.position.y = 1.25;
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  addCartoonOutline(bodyMesh, 0.042);
  root.add(bodyMesh);

  // 치이카와 핑크 곰돌이 포쉐트 가방 (입체 귀 & 코 디테일 포함)
  if (charKey === 'chiikawa') {
    const pinkMat = createToonMat(0xff85a2);
    const strap = new THREE.Mesh(new THREE.TorusGeometry(1.09, 0.055, 12, 36), pinkMat);
    strap.position.set(0, 1.3, 0.12);
    strap.rotation.set(0.55, 0.25, 0);
    root.add(strap);

    const bagGroup = new THREE.Group();
    bagGroup.position.set(0.84, 0.94, 0.68);
    bagGroup.rotation.y = 0.5;
    const bagBody = new THREE.Mesh(new THREE.SphereGeometry(0.34, 18, 18), pinkMat);
    bagBody.scale.set(1.1, 0.95, 0.7);
    addCartoonOutline(bagBody, 0.06);
    bagGroup.add(bagBody);

    // 포쉐트 곰돌이 귀 2개
    [-0.22, 0.22].forEach(bx => {
      const bEar = new THREE.Mesh(new THREE.SphereGeometry(0.11, 12, 12), pinkMat);
      bEar.position.set(bx, 0.26, 0);
      bagGroup.add(bEar);
    });
    root.add(bagGroup);
  }

  // 랏코 사부의 영웅 망토 & 등 뒤 칼집
  if (charKey === 'rakko') {
    const capeMat = createToonMat(0x4a3525, { side: THREE.DoubleSide });
    const cape = new THREE.Mesh(new THREE.ConeGeometry(1.38, 1.95, 24, 1, true), capeMat);
    cape.position.set(0, 1.35, -0.32);
    cape.rotation.x = 0.24;
    root.add(cape);

    const clasp = new THREE.Mesh(new THREE.SphereGeometry(0.18, 12, 12), createToonMat(0xfacc15));
    clasp.position.set(0, 1.95, 0.78);
    root.add(clasp);
  }

  // 모몽가 복슬복슬 구름 꼬리 & 볼털
  if (charKey === 'momonga') {
    const tailGroup = new THREE.Group();
    tailGroup.position.set(0, 1.15, -1.05);
    const tailMat = createToonMat(0xa3a8c2);

    const mainPuff = new THREE.Mesh(new THREE.SphereGeometry(0.92, 24, 24), tailMat);
    mainPuff.scale.set(0.9, 1.35, 1.15);
    addCartoonOutline(mainPuff, 0.045);
    tailGroup.add(mainPuff);

    const topPuff = new THREE.Mesh(new THREE.SphereGeometry(0.62, 18, 18), tailMat);
    topPuff.position.set(0, 0.85, -0.25);
    tailGroup.add(topPuff);

    root.add(tailGroup);
    root.userData.tailMesh = tailGroup;
  } else {
    const miniTail = new THREE.Mesh(new THREE.SphereGeometry(0.26, 14, 14), skinMat);
    miniTail.position.set(0, 0.85, -1.02);
    addCartoonOutline(miniTail, 0.06);
    root.add(miniTail);
  }

  // 2) 커다랗고 둥근 3D 헤드 + 카툰 외곽선
  const headGroup = new THREE.Group();
  headGroup.position.y = 2.86;
  root.add(headGroup);

  const headGeo = new THREE.SphereGeometry(1.42, 36, 32);
  headGeo.scale(1.06, 0.98, 1.0);
  const headMesh = new THREE.Mesh(headGeo, headMat);
  headMesh.rotation.y = -Math.PI / 2;
  headMesh.castShadow = true;
  addCartoonOutline(headMesh, 0.038);
  headGroup.add(headMesh);

  // 모몽가 양볼 복슬 털뭉치
  if (charKey === 'momonga') {
    const cheekFurMat = createToonMat(0xffffff);
    [-1.38, 1.38].forEach(cx => {
      const tuft = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), cheekFurMat);
      tuft.scale.set(1.1, 0.75, 0.8);
      tuft.position.set(cx, -0.18, 0.15);
      addCartoonOutline(tuft, 0.05);
      headGroup.add(tuft);
    });
  }

  // 3) 캐릭터별 고디테일 3D 입체 귀
  const earsGroup = new THREE.Group();
  headGroup.add(earsGroup);

  if (cfg.earType === 'rabbit') {
    const earGeo = new THREE.CylinderGeometry(0.28, 0.32, 1.65, 20);
    const innerMat = createToonMat(0xffb3c6);
    [-0.58, 0.58].forEach((ex, i) => {
      const earPivot = new THREE.Group();
      earPivot.position.set(ex, 1.22, 0);
      earPivot.rotation.z = i === 0 ? 0.13 : -0.13;

      const ear = new THREE.Mesh(earGeo, skinMat);
      ear.position.y = 0.65;
      ear.castShadow = true;
      addCartoonOutline(ear, 0.05);
      earPivot.add(ear);

      const topSphere = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), skinMat);
      topSphere.position.y = 1.47;
      addCartoonOutline(topSphere, 0.05);
      earPivot.add(topSphere);

      const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.2, 12), innerMat);
      inner.position.set(0, 0.65, 0.19);
      earPivot.add(inner);

      earsGroup.add(earPivot);
    });
  } else if (cfg.earType === 'cat') {
    const blueMat = createToonMat(0x5ba4cf);
    const pinkInner = createToonMat(0xffb3c6);
    const earGeo = new THREE.ConeGeometry(0.49, 0.98, 20);
    [-0.86, 0.86].forEach((ex, i) => {
      const earWrap = new THREE.Group();
      earWrap.position.set(ex, 1.32, 0);
      earWrap.rotation.z = i === 0 ? 0.36 : -0.36;

      const ear = new THREE.Mesh(earGeo, blueMat);
      ear.castShadow = true;
      addCartoonOutline(ear, 0.05);
      earWrap.add(ear);

      const inner = new THREE.Mesh(new THREE.ConeGeometry(0.25, 0.55, 12), pinkInner);
      inner.position.set(0, -0.05, 0.22);
      earWrap.add(inner);

      earsGroup.add(earWrap);
    });
  } else if (cfg.earType === 'squirrel') {
    const sqMat = createToonMat(0xa3a8c2);
    const innerMat = createToonMat(0xffccd5);
    [-0.98, 0.98].forEach((ex, i) => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.46, 20, 20), sqMat);
      ear.scale.set(0.9, 1.15, 0.6);
      ear.position.set(ex, 1.18, -0.05);
      ear.rotation.z = i === 0 ? 0.38 : -0.38;
      addCartoonOutline(ear, 0.05);
      earsGroup.add(ear);

      const inner = new THREE.Mesh(new THREE.SphereGeometry(0.24, 14, 14), innerMat);
      inner.position.set(ex * 0.96, 1.15, 0.18);
      earsGroup.add(inner);
    });
  } else {
    const earColorMat = charKey === 'kurimanju' ? createToonMat(0x7c3f10) : skinMat;
    const innerMat = createToonMat(0xffccd5);
    [-0.96, 0.96].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.43, 20, 20), earColorMat);
      ear.scale.set(1, 1, 0.65);
      ear.position.set(ex, 1.18, 0);
      addCartoonOutline(ear, 0.055);
      earsGroup.add(ear);

      const inner = new THREE.Mesh(new THREE.SphereGeometry(0.22, 14, 14), innerMat);
      inner.scale.set(1, 1, 0.4);
      inner.position.set(ex, 1.16, 0.22);
      earsGroup.add(inner);
    });
  }

  // 4) 머리 위 장착 코스튬 액세서리 슬롯 (모자/왕관/화관/리본)
  const hatSlot = new THREE.Group();
  hatSlot.position.set(0, 1.42, 0.1);
  headGroup.add(hatSlot);
  if (hatType && hatType !== 'none') {
    hatSlot.add(createHatAccessory3D(hatType));
  }

  // 5) 귀여운 3D 양팔 & 무기 장착
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-1.14, 1.65, 0.15);
  const leftArm = new THREE.Mesh(new THREE.SphereGeometry(0.32, 18, 18), skinMat);
  leftArm.scale.set(0.85, 1.45, 0.85);
  leftArm.position.y = -0.32;
  addCartoonOutline(leftArm, 0.06);
  leftArmPivot.add(leftArm);
  root.add(leftArmPivot);

  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(1.14, 1.65, 0.15);
  const rightArm = new THREE.Mesh(new THREE.SphereGeometry(0.32, 18, 18), skinMat);
  rightArm.scale.set(0.85, 1.45, 0.85);
  rightArm.position.y = -0.32;
  addCartoonOutline(rightArm, 0.06);
  rightArmPivot.add(rightArm);
  root.add(rightArmPivot);

  const weaponMesh = createWeaponMesh(cfg.weaponType);
  weaponMesh.position.set(0.1, -0.45, 0.55);
  weaponMesh.rotation.x = Math.PI / 3;
  rightArmPivot.add(weaponMesh);

  // 6) 짧은 3D 다리
  const leftLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.48, 0.45, 0);
  const leftLeg = new THREE.Mesh(new THREE.SphereGeometry(0.34, 18, 18), skinMat);
  leftLeg.scale.set(0.9, 1.3, 1.0);
  leftLeg.position.y = -0.22;
  addCartoonOutline(leftLeg, 0.06);
  leftLegPivot.add(leftLeg);
  root.add(leftLegPivot);

  const rightLegPivot = new THREE.Group();
  rightLegPivot.position.set(0.48, 0.45, 0);
  const rightLeg = new THREE.Mesh(new THREE.SphereGeometry(0.34, 18, 18), skinMat);
  rightLeg.scale.set(0.9, 1.3, 1.0);
  rightLeg.position.y = -0.22;
  addCartoonOutline(rightLeg, 0.06);
  rightLegPivot.add(rightLeg);
  root.add(rightLegPivot);

  root.userData.parts = {
    bodyMesh,
    headGroup,
    headMesh,
    earsGroup,
    hatSlot,
    leftArmPivot,
    rightArmPivot,
    leftLegPivot,
    rightLegPivot,
    weaponMesh
  };

  // 표정 캐시 & 변경 함수
  root.userData.texCache = { normal: faceTexture };
  root.userData.currentExpr = 'normal';
  root.userData.setExpression = (expr) => {
    if (root.userData.currentExpr === expr) return;
    root.userData.currentExpr = expr;
    if (!root.userData.texCache[expr]) {
      root.userData.texCache[expr] = createPlushieFaceTexture(charKey, expr);
    }
    headMesh.material.map = root.userData.texCache[expr];
    headMesh.material.needsUpdate = true;
  };

  // 코스튬 변경 함수
  root.userData.equipHat = (newHatType) => {
    while (hatSlot.children.length > 0) {
      hatSlot.remove(hatSlot.children[0]);
    }
    if (newHatType && newHatType !== 'none') {
      hatSlot.add(createHatAccessory3D(newHatType));
    }
  };

  return root;
}

// ==========================================================================
// 2-1. 3D 머리 장식 액세서리 빌더 (황금 왕관, 벚꽃 화관, 파자마 모자, 리본)
// ==========================================================================
function createHatAccessory3D(hatType) {
  const group = new THREE.Group();

  if (hatType === 'crown') {
    const goldMat = createToonMat(0xfacc15);
    const gemMat = new THREE.MeshBasicMaterial({ color: 0xf43f5e });
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.52, 0.42, 16), goldMat);
    base.position.y = 0.2;
    addCartoonOutline(base, 0.06);
    group.add(base);

    for (let i = 0; i < 5; i++) {
      const a = (i / 5) * Math.PI * 2;
      const spike = new THREE.Mesh(new THREE.ConeGeometry(0.16, 0.38, 8), goldMat);
      spike.position.set(Math.cos(a) * 0.48, 0.52, Math.sin(a) * 0.48);
      group.add(spike);

      const gem = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), gemMat);
      gem.position.set(Math.cos(a) * 0.56, 0.22, Math.sin(a) * 0.56);
      group.add(gem);
    }
  } else if (hatType === 'flower') {
    // 벚꽃 화관
    const vineMat = createToonMat(0x4ade80);
    const torus = new THREE.Mesh(new THREE.TorusGeometry(0.85, 0.09, 10, 28), vineMat);
    torus.rotation.x = Math.PI / 2;
    torus.position.y = -0.15;
    group.add(torus);

    const colors = [0xff85a2, 0xfef08a, 0x38bdf8, 0xf472b6, 0xffffff];
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const fl = new THREE.Mesh(
        new THREE.SphereGeometry(0.19, 10, 10),
        createToonMat(colors[i % colors.length])
      );
      fl.position.set(Math.cos(a) * 0.85, -0.12, Math.sin(a) * 0.85);
      addCartoonOutline(fl, 0.07);
      group.add(fl);
    }
  } else if (hatType === 'ribbon') {
    // 왕리본
    const ribMat = createToonMat(0xff4d6d);
    const center = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), ribMat);
    center.position.set(0, 0.15, 0.25);
    group.add(center);

    [-0.38, 0.38].forEach((rx, i) => {
      const wing = new THREE.Mesh(new THREE.ConeGeometry(0.32, 0.55, 12), ribMat);
      wing.position.set(rx, 0.18, 0.25);
      wing.rotation.z = i === 0 ? -Math.PI / 2.2 : Math.PI / 2.2;
      addCartoonOutline(wing, 0.06);
      group.add(wing);
    });
  } else if (hatType === 'halo') {
    // 천사 별빛 링
    const haloMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.75, 0.08, 12, 32), haloMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.65;
    group.add(ring);
  }

  return group;
}

// ==========================================================================
// 3. 3D 무기 메쉬 생성기 (사스마타, 우사기 토벌봉, 랏코 대검, 쿠리만쥬 캔)
// ==========================================================================
function createWeaponMesh(weaponType) {
  const group = new THREE.Group();

  if (weaponType === 'sasumata_pink' || weaponType === 'sasumata_blue') {
    const color = weaponType === 'sasumata_pink' ? 0xff758f : 0x38bdf8;
    const mat = createToonMat(color);

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.085, 2.75, 14), mat);
    pole.position.y = 0.6;
    addCartoonOutline(pole, 0.08);
    group.add(pole);

    const fork = new THREE.Mesh(new THREE.TorusGeometry(0.44, 0.095, 12, 24, Math.PI), mat);
    fork.position.y = 1.98;
    fork.rotation.z = Math.PI;
    addCartoonOutline(fork, 0.07);
    group.add(fork);
  } else if (weaponType === 'staff_yellow') {
    const yellowMat = createToonMat(0xfacc15);
    const darkMat = createToonMat(0x334155);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 2.65, 14), yellowMat);
    pole.position.y = 0.6;
    addCartoonOutline(pole, 0.07);
    group.add(pole);

    const tip1 = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.38, 14), darkMat);
    tip1.position.y = 1.92;
    group.add(tip1);
  } else if (weaponType === 'greatsword') {
    const bladeMat = createToonMat(0xe2e8f0);
    const hiltMat = createToonMat(0xf59e0b);

    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.3, 2.5, 0.09), bladeMat);
    blade.position.y = 1.15;
    addCartoonOutline(blade, 0.06);
    group.add(blade);

    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.82, 0.16, 0.22), hiltMat);
    guard.position.y = -0.05;
    group.add(guard);
  } else if (weaponType === 'drink_can') {
    const canMat = createToonMat(0xf59e0b);
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.62, 16), canMat);
    can.position.y = 0.2;
    addCartoonOutline(can, 0.06);
    group.add(can);
  }

  return group;
}

// ==========================================================================
// 4. 고디테일 3D 몬스터 빌더 (초록 딱정벌레, 날개 달린 키메라, 거대 아노코)
// ==========================================================================
function createMonster3D(type = 'chimera') {
  const group = new THREE.Group();

  if (type === 'bug') {
    const shellMat = createToonMat(0x10b981);
    const bellyMat = createToonMat(0xa7f3d0);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111827 });

    const body = new THREE.Mesh(new THREE.SphereGeometry(1.15, 24, 20), shellMat);
    body.scale.set(1.1, 0.88, 1.32);
    body.position.y = 0.95;
    body.castShadow = true;
    addCartoonOutline(body, 0.045);
    group.add(body);

    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.24, 1.05, 12), shellMat);
    horn.position.set(0, 1.55, 1.05);
    horn.rotation.x = Math.PI / 3.5;
    addCartoonOutline(horn, 0.06);
    group.add(horn);

    [-0.42, 0.42].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 12), eyeMat);
      eye.position.set(ex, 1.2, 1.38);
      group.add(eye);
    });
  } else if (type === 'anoko') {
    const whiteMat = createToonMat(0xfff1f2);
    const hornMat = createToonMat(0xfacc15);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 });

    // 거대 몸통 + 헤드
    const body = new THREE.Mesh(new THREE.SphereGeometry(3.3, 32, 28), whiteMat);
    body.scale.set(1.12, 1.22, 1.02);
    body.position.y = 3.3;
    body.castShadow = true;
    addCartoonOutline(body, 0.035);
    group.add(body);

    // 거대한 황금 외뿔
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.58, 2.4, 18), hornMat);
    horn.position.set(0, 7.1, 0.85);
    horn.rotation.x = 0.22;
    addCartoonOutline(horn, 0.05);
    group.add(horn);

    // 귀 2개
    [-2.4, 2.4].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.95, 18, 18), whiteMat);
      ear.position.set(ex, 6.0, 0);
      addCartoonOutline(ear, 0.045);
      group.add(ear);
    });

    // 강렬한 붉은 안광 눈
    [-1.15, 1.15].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.42, 16, 16), eyeMat);
      eye.position.set(ex, 4.4, 3.0);
      group.add(eye);
    });
  } else {
    // 붉은 날개 키메라
    const redMat = createToonMat(0xf43f5e);
    const maneMat = createToonMat(0xbe123c);
    const wingMat = createToonMat(0x881337);
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    const body = new THREE.Mesh(new THREE.SphereGeometry(1.58, 26, 22), redMat);
    body.position.y = 1.65;
    body.castShadow = true;
    addCartoonOutline(body, 0.045);
    group.add(body);

    // 갈기 장식
    const mane = new THREE.Mesh(new THREE.TorusGeometry(1.35, 0.32, 12, 24), maneMat);
    mane.position.set(0, 1.85, 0.35);
    group.add(mane);

    [-0.55, 0.55].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.25, 12, 12), eyeMat);
      eye.position.set(ex, 2.05, 1.48);
      group.add(eye);
    });

    // 박쥐 날개
    [-1.5, 1.5].forEach((wx, idx) => {
      const wing = new THREE.Mesh(new THREE.ConeGeometry(0.78, 1.8, 10), wingMat);
      wing.position.set(wx, 2.3, -0.3);
      wing.rotation.z = idx === 0 ? 1.15 : -1.15;
      addCartoonOutline(wing, 0.05);
      group.add(wing);
    });
  }

  return group;
}

// ==========================================================================
// 5. 3D 타운 랜드마크 빌더 (치이카와 하우스 + 피크닉, 라멘 랑, 자이언트 푸딩, 다리)
// ==========================================================================
function createChiikawaHouse3D() {
  const house = new THREE.Group();

  const wallMat = createToonMat(0xfff0f5);
  const roofMat = createToonMat(0xff85a2);
  const doorMat = createToonMat(0xd97706);
  const winMat = createToonMat(0xbae6fd);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(5.6, 6.1, 4.6, 32), wallMat);
  base.position.y = 2.3;
  base.castShadow = true;
  base.receiveShadow = true;
  addCartoonOutline(base, 0.025);
  house.add(base);

  const dome = new THREE.Mesh(
    new THREE.SphereGeometry(5.9, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55),
    roofMat
  );
  dome.position.y = 4.25;
  dome.castShadow = true;
  addCartoonOutline(dome, 0.025);
  house.add(dome);

  // 곰돌이 귀 지붕 장식
  [-3.3, 3.3].forEach(ex => {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(1.45, 20, 20), roofMat);
    ear.position.set(ex, 8.7, 0);
    addCartoonOutline(ear, 0.04);
    house.add(ear);
  });

  // 굴뚝
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 2.2, 16), wallMat);
  chimney.position.set(2.5, 8.2, -2.0);
  house.add(chimney);

  // 아치형 현관문 & 둥근 창문 2개
  const door = new THREE.Mesh(new THREE.BoxGeometry(2.3, 3.3, 0.6), doorMat);
  door.position.set(0, 1.65, 5.8);
  addCartoonOutline(door, 0.04);
  house.add(door);

  [-2.8, 2.8].forEach(wx => {
    const win = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 0.95, 0.4, 20), winMat);
    win.rotation.x = Math.PI / 2;
    win.position.set(wx, 2.6, 5.2);
    addCartoonOutline(win, 0.05);
    house.add(win);
  });

  // 집 앞 돗자리 피크닉 세트 & 오므라이스/핫케이크
  const matGeo = new THREE.BoxGeometry(6.5, 0.12, 4.5);
  const picnicMat = new THREE.Mesh(matGeo, createToonMat(0xfda4af));
  picnicMat.position.set(-7.5, 0.08, 7.5);
  house.add(picnicMat);

  // 돗자리 위 3D 핫케이크
  const cake = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.15, 0.65, 20), createToonMat(0xd97706));
  cake.position.set(-7.5, 0.45, 7.5);
  house.add(cake);
  const butter = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.45), createToonMat(0xfef08a));
  butter.position.set(-7.5, 0.85, 7.5);
  house.add(butter);

  return house;
}

function createRamenStall3D() {
  const stall = new THREE.Group();

  const woodMat = createToonMat(0xb45309);
  const roofMat = createToonMat(0xdc2626);
  const yellowMat = createToonMat(0xfacc15);

  const counter = new THREE.Mesh(new THREE.BoxGeometry(8.4, 2.2, 3.2), woodMat);
  counter.position.y = 1.1;
  counter.castShadow = true;
  addCartoonOutline(counter, 0.03);
  stall.add(counter);

  // 손님용 빨간 동그란 의자 3개
  [-2.4, 0, 2.4].forEach(sx => {
    const stool = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.55, 1.1, 16), roofMat);
    stool.position.set(sx, 0.55, 2.6);
    addCartoonOutline(stool, 0.05);
    stall.add(stool);

    // 카운터 위 3D 라멘 그릇
    const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.42, 0.48, 16), roofMat);
    bowl.position.set(sx, 2.45, 0.8);
    stall.add(bowl);
    const soup = new THREE.Mesh(new THREE.CylinderGeometry(0.58, 0.58, 0.1, 16), yellowMat);
    soup.position.set(sx, 2.68, 0.8);
    stall.add(soup);
  });

  [[-3.8, -1.2], [3.8, -1.2], [-3.8, 1.2], [3.8, 1.2]].forEach(([px, pz]) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 5.6, 12), woodMat);
    post.position.set(px, 2.8, pz);
    stall.add(post);
  });

  // '랑(郎)' 노란 간판 텍스처 지붕
  const signCanvas = document.createElement('canvas');
  signCanvas.width = 512;
  signCanvas.height = 128;
  const sctx = signCanvas.getContext('2d');
  sctx.fillStyle = '#facc15';
  sctx.fillRect(0, 0, 512, 128);
  sctx.strokeStyle = '#dc2626';
  sctx.lineWidth = 10;
  sctx.strokeRect(8, 8, 496, 112);
  sctx.fillStyle = '#111827';
  sctx.font = '900 68px sans-serif';
  sctx.textAlign = 'center';
  sctx.textBaseline = 'middle';
  sctx.fillText('🍜 라멘 랑 (郎)', 256, 66);
  const signTex = new THREE.CanvasTexture(signCanvas);

  const roof = new THREE.Mesh(
    new THREE.BoxGeometry(9.4, 1.35, 4.5),
    new THREE.MeshToonMaterial({ map: signTex })
  );
  roof.position.y = 5.65;
  roof.castShadow = true;
  addCartoonOutline(roof, 0.03);
  stall.add(roof);

  // 붉은 홍등 2개 + 따뜻한 포인트 라이트
  const lanternMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xff4500,
    emissiveIntensity: 0.75
  });
  [-4.0, 4.0].forEach(lx => {
    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.68, 18, 18), lanternMat);
    lantern.scale.set(0.85, 1.28, 0.85);
    lantern.position.set(lx, 4.4, 1.9);
    addCartoonOutline(lantern, 0.05);
    stall.add(lantern);
  });

  const stallLight = new THREE.PointLight(0xffedd5, 0.9, 18);
  stallLight.position.set(0, 4.5, 2.5);
  stall.add(stallLight);

  // 라멘 갑옷씨(요로이산) 3D 모델
  const armorGroup = new THREE.Group();
  const steelMat = createToonMat(0x94a3b8);
  const visorMat = new THREE.MeshBasicMaterial({ color: 0x1e293b });
  const armorBody = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.1, 2.5, 18), steelMat);
  armorBody.position.y = 1.25;
  addCartoonOutline(armorBody, 0.04);
  armorGroup.add(armorBody);

  const armorHead = new THREE.Mesh(new THREE.SphereGeometry(0.92, 20, 20), steelMat);
  armorHead.position.y = 3.0;
  addCartoonOutline(armorHead, 0.04);
  armorGroup.add(armorHead);

  // 투구 눈 슬릿
  const visor = new THREE.Mesh(new THREE.BoxGeometry(0.95, 0.16, 0.4), visorMat);
  visor.position.set(0, 3.05, 0.75);
  armorGroup.add(visor);

  armorGroup.position.set(0, 0, -0.5);
  stall.add(armorGroup);

  return stall;
}

function createGiantPudding3D() {
  const pudding = new THREE.Group();

  const custardMat = createToonMat(0xfde047);
  const caramelMat = createToonMat(0x78350f);
  const creamMat = createToonMat(0xffffff);
  const cherryMat = createToonMat(0xe11d48);

  const base = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 7.5, 5.0, 36), custardMat);
  base.position.y = 2.5;
  base.castShadow = true;
  base.receiveShadow = true;
  addCartoonOutline(base, 0.025);
  pudding.add(base);

  const top = new THREE.Mesh(new THREE.CylinderGeometry(5.05, 5.3, 1.25, 36), caramelMat);
  top.position.y = 5.1;
  addCartoonOutline(top, 0.03);
  pudding.add(top);

  const cream = new THREE.Mesh(new THREE.SphereGeometry(1.45, 20, 20), creamMat);
  cream.scale.set(1.25, 0.72, 1.25);
  cream.position.y = 5.95;
  addCartoonOutline(cream, 0.04);
  pudding.add(cream);

  const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.68, 18, 18), cherryMat);
  cherry.position.y = 6.7;
  addCartoonOutline(cherry, 0.05);
  pudding.add(cherry);

  return pudding;
}

function createWeedPatch3D(isGolden = false) {
  const weed = new THREE.Group();
  const color = isGolden ? 0xfacc15 : 0x22c55e;
  const mat = createToonMat(color);

  for (let i = 0; i < 6; i++) {
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.4, 10), mat);
    const angle = (i / 6) * Math.PI * 2;
    blade.position.set(Math.cos(angle) * 0.28, 0.68, Math.sin(angle) * 0.28);
    blade.rotation.z = (Math.random() - 0.5) * 0.45;
    blade.rotation.x = (Math.random() - 0.5) * 0.45;
    blade.castShadow = true;
    addCartoonOutline(blade, 0.06);
    weed.add(blade);
  }

  return weed;
}

// 에메랄드 강물 & 나무 아치 다리 빌더
function createRiverAndBridge3D() {
  const group = new THREE.Group();

  // 강물 바닥
  const riverGeo = new THREE.BoxGeometry(10, 0.2, 160);
  const riverMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    roughness: 0.2,
    metalness: 0.1,
    transparent: true,
    opacity: 0.85
  });
  const river = new THREE.Mesh(riverGeo, riverMat);
  river.position.set(22, 0.08, -20);
  river.rotation.y = Math.PI / 6;
  group.add(river);

  // 아치형 붉은/나무 다리
  const bridgeGroup = new THREE.Group();
  bridgeGroup.position.set(22, 0.2, -16);
  bridgeGroup.rotation.y = Math.PI / 6;

  const deck = new THREE.Mesh(
    new THREE.BoxGeometry(13, 0.5, 5.5),
    createToonMat(0xd97706)
  );
  deck.position.y = 0.6;
  addCartoonOutline(deck, 0.03);
  bridgeGroup.add(deck);

  // 다리 난간
  [-2.4, 2.4].forEach(rz => {
    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(13, 1.2, 0.35),
      createToonMat(0xef4444)
    );
    rail.position.set(0, 1.3, rz);
    addCartoonOutline(rail, 0.04);
    bridgeGroup.add(rail);
  });

  group.add(bridgeGroup);
  return group;
}
