// ==========================================================================
// 치이카와 3D 오픈월드 타운 - 3D 입체 피규어/봉제인형 모델 & 2D 표정 텍스처 엔진 (models3d.js)
// ==========================================================================

const CHAR_CONFIGS = {
  chiikawa: {
    id: 'chiikawa',
    name: '치이카와',
    title: '🌸 곰돌이 포쉐트 제초사',
    bodyColor: 0xffffff,
    earType: 'bear',
    weaponType: 'sasumata_pink',
    skillName: '분홍 포쉐트 별빛 파동',
    portrait: 'assets/chiikawa.png',
    speed: 14,
    atk: 28,
    quotes: [
      '와앗... 열심히 풀을 뽑아서 5급 합격할 거야!',
      '우와앙! 하치와레랑 라멘 랑 먹으러 가자!',
      '에잇-! 사스마타로 나쁜 키메라를 물리치자!'
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
    skillName: '난또까나레! 회전 베기',
    portrait: 'assets/hachiware.png',
    speed: 15,
    atk: 32,
    quotes: [
      '어떻게든 될 거야(난또까나레)! 같이 탐험하자!',
      '차루메라 끓여 먹고 토벌의 숲으로 가볼까?',
      '푸른 사스마타의 힘을 보여줄게! 에잇-!'
    ]
  },
  usagi: {
    id: 'usagi',
    name: '우사기',
    title: '💛 토벌 3급 천재 파이터',
    bodyColor: 0xfff3c4,
    earType: 'rabbit',
    weaponType: 'staff_yellow',
    skillName: '우라라라! 화약 연쇄 폭격',
    portrait: 'assets/usagi.png',
    speed: 17.5,
    atk: 38,
    quotes: [
      '이얏하-!! 우라라라라-!!',
      '푸하-! 자이언트 푸딩 위에서 점프하자!',
      '하아?! 우라! 당근 로켓 발사!'
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
    skillName: '칭찬해라! 복슬 꼬리 회오리',
    portrait: 'assets/momonga.png',
    speed: 16,
    atk: 30,
    quotes: [
      '어이! 이 몸의 3D 입체 귀여움을 어서 찬양해라!',
      '맛있는 라멘과 푸딩을 이 몸에게 바쳐라!',
      '떼쓰기 회오리로 몬스터들을 날려버리지!'
    ]
  },
  kurimanju: {
    id: 'kurimanju',
    name: '쿠리만쥬',
    title: '🌰 낭만 미식가 선배',
    bodyColor: 0xfff8e7,
    accentColor: 0x8b4513,
    earType: 'bear_brown',
    weaponType: 'drink_can',
    skillName: '크으-! 활력 재충전 건배',
    portrait: 'assets/kurimanju.png',
    speed: 13.5,
    atk: 34,
    quotes: [
      '하아ー... 크으-! 일 끝내고 마시는 한 잔이 최고지!',
      '라멘 랑에 마늘 듬뿍 넣어서 한 그릇 어때?',
      '천천히 풍경을 즐기면서 풀을 뽑아보자고.'
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
    skillName: '수석 토벌자의 일섬(一閃)',
    portrait: 'assets/rakko.png',
    speed: 16.5,
    atk: 45,
    quotes: [
      '침착해라. 나를 따라오면 아노코 토벌도 두렵지 않다!',
      '토벌 후엔 달콤한 파르페와 딸기잼을 먹는 게 최고지...',
      '날카로운 검기로 숲의 위험을 베어내겠다!'
    ]
  }
};

// ==========================================================================
// 1. 2D 캔버스 표정 텍스처 생성기 (1024x512 구면 무왜곡 매핑)
// ==========================================================================
function createPlushieFaceTexture(charKey, expression = 'normal') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  const cfg = CHAR_CONFIGS[charKey] || CHAR_CONFIGS.chiikawa;

  // 기본 피부 배경색
  let bgHex = '#ffffff';
  if (charKey === 'usagi') bgHex = '#fff3c4';
  if (charKey === 'kurimanju') bgHex = '#fff8e7';
  if (charKey === 'rakko') bgHex = '#e6ccb2';

  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // 쿠리만쥬 머리 위 밤색 뚜껑 무늬
  if (charKey === 'kurimanju') {
    ctx.fillStyle = '#7c3f10';
    ctx.fillRect(0, 0, canvas.width, 165);
  }

  // 하치와레 파란색 8자(八) 가르마 무늬
  if (charKey === 'hachiware') {
    ctx.fillStyle = '#5ba4cf';
    ctx.fillRect(0, 0, canvas.width, 130);
    // 이마 중앙 하얀 삼각형 가르마
    ctx.beginPath();
    ctx.moveTo(512, 85);
    ctx.lineTo(420, 210);
    ctx.lineTo(604, 210);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // 양옆 파란 앞머리 내려오는 부분
    ctx.fillStyle = '#5ba4cf';
    ctx.beginPath();
    ctx.arc(415, 135, 65, 0, Math.PI * 2);
    ctx.arc(609, 135, 65, 0, Math.PI * 2);
    ctx.fill();
  }

  // 모몽가 회색 털 테두리 느낌
  if (charKey === 'momonga') {
    ctx.fillStyle = '#b8bedd';
    ctx.fillRect(0, 0, canvas.width, 95);
  }

  // 얼굴 중심 좌표: (512, 265)
  const cx = 512;
  const cy = 265;

  // 랏코 사부 이마의 십자 흉터
  if (charKey === 'rakko') {
    ctx.strokeStyle = '#6c462f';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 28, cy - 68);
    ctx.lineTo(cx + 18, cy - 42);
    ctx.moveTo(cx - 12, cy - 72);
    ctx.lineTo(cx - 2, cy - 38);
    ctx.stroke();

    // 입 주변 하얀 주둥이 패치
    ctx.fillStyle = '#fffdf9';
    ctx.beginPath();
    ctx.ellipse(cx, cy + 28, 42, 26, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // 발그레한 볼터치 (핑크 빗금 + 소프트 타원)
  ctx.fillStyle = 'rgba(255, 130, 165, 0.48)';
  ctx.beginPath();
  ctx.ellipse(cx - 72, cy + 16, 26, 15, 0, 0, Math.PI * 2);
  ctx.ellipse(cx + 72, cy + 16, 26, 15, 0, 0, Math.PI * 2);
  ctx.fill();

  // 볼터치 귀여운 사선 빗금
  ctx.strokeStyle = '#ff5c8a';
  ctx.lineWidth = 2.5;
  [-80, -70, -60].forEach(dx => {
    ctx.beginPath();
    ctx.moveTo(cx + dx, cy + 10);
    ctx.lineTo(cx + dx - 5, cy + 21);
    ctx.stroke();
  });
  [60, 70, 80].forEach(dx => {
    ctx.beginPath();
    ctx.moveTo(cx + dx, cy + 10);
    ctx.lineTo(cx + dx - 5, cy + 21);
    ctx.stroke();
  });

  // 눈썹 그리기
  ctx.strokeStyle = '#1e1b18';
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  if (expression === 'attack' || charKey === 'rakko') {
    // 결의에 찬 눈썹
    ctx.beginPath();
    ctx.moveTo(cx - 65, cy - 48);
    ctx.lineTo(cx - 38, cy - 36);
    ctx.moveTo(cx + 65, cy - 48);
    ctx.lineTo(cx + 38, cy - 36);
    ctx.stroke();
  } else if (expression === 'cry') {
    // 팔자 눈썹
    ctx.beginPath();
    ctx.moveTo(cx - 65, cy - 36);
    ctx.lineTo(cx - 38, cy - 48);
    ctx.moveTo(cx + 65, cy - 36);
    ctx.lineTo(cx + 38, cy - 48);
    ctx.stroke();
  } else {
    // 기본 귀여운 짧은 아치 눈썹
    ctx.beginPath();
    ctx.arc(cx - 52, cy - 38, 14, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 52, cy - 38, 14, Math.PI * 1.15, Math.PI * 1.85);
    ctx.stroke();
  }

  // 눈 그리기
  if (expression === 'happy') {
    // 웃는 눈 (^ ^)
    ctx.strokeStyle = '#1e1b18';
    ctx.lineWidth = 6.5;
    ctx.beginPath();
    ctx.arc(cx - 52, cy - 8, 16, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + 52, cy - 8, 16, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  } else {
    // 치이카와 특유의 까만 눈동자 + 하얀 상/하단 안광
    [-52, 52].forEach(offsetX => {
      const ex = cx + offsetX;
      const ey = cy - 10;
      const r = charKey === 'momonga' ? 19 : 16.5;

      ctx.fillStyle = '#191716';
      ctx.beginPath();
      ctx.arc(ex, ey, r, 0, Math.PI * 2);
      ctx.fill();

      // 위쪽 큰 흰색 하이라이트
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.ellipse(ex - 3, ey - 5, r * 0.42, r * 0.35, -0.2, 0, Math.PI * 2);
      ctx.fill();

      // 아래쪽 작은 반짝이 하이라이트
      ctx.beginPath();
      ctx.arc(ex + 4, ey + 6, r * 0.2, 0, Math.PI * 2);
      ctx.fill();

      // 울먹일 때 눈물 방울
      if (expression === 'cry') {
        ctx.fillStyle = '#38bdf8';
        ctx.beginPath();
        ctx.arc(ex + (offsetX < 0 ? -10 : 10), ey + 15, 7, 0, Math.PI * 2);
        ctx.fill();
      }
    });
  }

  // 코 & 입 (ω 모양 고양이/치이카와 입)
  ctx.strokeStyle = '#191716';
  ctx.lineWidth = 4.5;
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  if (expression === 'happy' || expression === 'attack') {
    // 활짝 벌린 입 (ω 아래에 분홍 입안)
    ctx.fillStyle = '#ff758f';
    ctx.beginPath();
    ctx.arc(cx, cy + 22, 16, 0, Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  // 기본 ω 입라인
  ctx.beginPath();
  ctx.arc(cx - 10, cy + 16, 10, 0.15 * Math.PI, 0.95 * Math.PI);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(cx + 10, cy + 16, 10, 0.05 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();

  // 하치와레 작은 송곳니 포인트
  if (charKey === 'hachiware') {
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(cx + 12, cy + 23);
    ctx.lineTo(cx + 17, cy + 31);
    ctx.lineTo(cx + 21, cy + 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ==========================================================================
// 2. 3D 입체 봉제인형 캐릭터 메쉬 빌더 (Build Plushie Rig)
// ==========================================================================
function createChiikawaPlushie(charKey = 'chiikawa') {
  const cfg = CHAR_CONFIGS[charKey] || CHAR_CONFIGS.chiikawa;
  const root = new THREE.Group();
  root.userData.charKey = charKey;

  const skinMat = new THREE.MeshStandardMaterial({
    color: cfg.bodyColor,
    roughness: 0.72,
    metalness: 0.04
  });

  const faceTexture = createPlushieFaceTexture(charKey, 'normal');
  const headMat = new THREE.MeshStandardMaterial({
    map: faceTexture,
    roughness: 0.68,
    metalness: 0.04
  });

  // 1) 통통한 몸통 (Chubby Body)
  const bodyGeo = new THREE.SphereGeometry(1.15, 28, 24);
  bodyGeo.scale(1.0, 1.08, 0.92);
  const bodyMesh = new THREE.Mesh(bodyGeo, skinMat);
  bodyMesh.position.y = 1.25;
  bodyMesh.castShadow = true;
  bodyMesh.receiveShadow = true;
  root.add(bodyMesh);

  // 치이카와 핑크 곰돌이 포쉐트 (가방)
  if (charKey === 'chiikawa') {
    const strapGeo = new THREE.TorusGeometry(1.08, 0.06, 10, 32);
    const pinkMat = new THREE.MeshStandardMaterial({ color: 0xff85a2, roughness: 0.6 });
    const strap = new THREE.Mesh(strapGeo, pinkMat);
    strap.position.set(0, 1.3, 0.12);
    strap.rotation.y = 0.25;
    strap.rotation.x = 0.55;
    root.add(strap);

    const bagGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const bag = new THREE.Mesh(bagGeo, pinkMat);
    bag.position.set(0.85, 0.95, 0.65);
    root.add(bag);
  }

  // 랏코 사부의 망토
  if (charKey === 'rakko') {
    const capeGeo = new THREE.ConeGeometry(1.35, 1.9, 20, 1, true);
    const capeMat = new THREE.MeshStandardMaterial({
      color: 0x3b2f2f,
      side: THREE.DoubleSide,
      roughness: 0.8
    });
    const cape = new THREE.Mesh(capeGeo, capeMat);
    cape.position.set(0, 1.35, -0.35);
    cape.rotation.x = 0.22;
    root.add(cape);
  }

  // 모몽가 하늘다람쥐 복슬 꼬리
  if (charKey === 'momonga') {
    const tailGeo = new THREE.SphereGeometry(0.95, 20, 20);
    tailGeo.scale(0.85, 1.35, 1.1);
    const tailMat = new THREE.MeshStandardMaterial({ color: 0xa3a8c2, roughness: 0.85 });
    const tail = new THREE.Mesh(tailGeo, tailMat);
    tail.position.set(0, 1.2, -1.15);
    tail.rotation.x = -0.35;
    tail.castShadow = true;
    root.add(tail);
    root.userData.tailMesh = tail;
  } else {
    // 기본 귀여운 동그란 꼬리
    const miniTail = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), skinMat);
    miniTail.position.set(0, 0.85, -1.02);
    root.add(miniTail);
  }

  // 2) 커다랗고 둥근 3D 헤드 (Head Group)
  const headGroup = new THREE.Group();
  headGroup.position.y = 2.85;
  root.add(headGroup);

  const headGeo = new THREE.SphereGeometry(1.42, 32, 28);
  headGeo.scale(1.06, 0.98, 1.0);
  const headMesh = new THREE.Mesh(headGeo, headMat);
  // u=0.5 정면이 +Z를 향하도록 회전
  headMesh.rotation.y = -Math.PI / 2;
  headMesh.castShadow = true;
  headGroup.add(headMesh);

  // 3) 캐릭터별 3D 입체 귀 (Ears)
  const earsGroup = new THREE.Group();
  headGroup.add(earsGroup);

  if (cfg.earType === 'rabbit') {
    // 우사기: 길쭉한 토끼 귀
    const earGeo = new THREE.CylinderGeometry(0.28, 0.32, 1.65, 18);
    const innerMat = new THREE.MeshStandardMaterial({ color: 0xffb3c6, roughness: 0.7 });
    [-0.58, 0.58].forEach((ex, i) => {
      const earPivot = new THREE.Group();
      earPivot.position.set(ex, 1.25, 0);
      earPivot.rotation.z = i === 0 ? 0.14 : -0.14;

      const ear = new THREE.Mesh(earGeo, skinMat);
      ear.position.y = 0.65;
      ear.castShadow = true;
      earPivot.add(ear);

      const topSphere = new THREE.Mesh(new THREE.SphereGeometry(0.28, 16, 16), skinMat);
      topSphere.position.y = 1.47;
      earPivot.add(topSphere);

      const inner = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 1.2, 12), innerMat);
      inner.position.set(0, 0.65, 0.18);
      earPivot.add(inner);

      earsGroup.add(earPivot);
    });
  } else if (cfg.earType === 'cat') {
    // 하치와레: 파란색 뾰족 고양이 귀
    const blueMat = new THREE.MeshStandardMaterial({ color: 0x5ba4cf, roughness: 0.65 });
    const earGeo = new THREE.ConeGeometry(0.48, 0.95, 18);
    [-0.85, 0.85].forEach((ex, i) => {
      const ear = new THREE.Mesh(earGeo, blueMat);
      ear.position.set(ex, 1.32, 0);
      ear.rotation.z = i === 0 ? 0.38 : -0.38;
      ear.castShadow = true;
      earsGroup.add(ear);
    });
  } else if (cfg.earType === 'squirrel') {
    // 모몽가: 회색빛 동그란 하늘다람쥐 귀
    const sqMat = new THREE.MeshStandardMaterial({ color: 0xa3a8c2, roughness: 0.75 });
    [-0.98, 0.98].forEach((ex, i) => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.46, 18, 18), sqMat);
      ear.scale.set(0.9, 1.15, 0.6);
      ear.position.set(ex, 1.18, -0.05);
      ear.rotation.z = i === 0 ? 0.4 : -0.4;
      ear.castShadow = true;
      earsGroup.add(ear);
    });
  } else {
    // 치이카와, 쿠리만쥬, 랏코: 동그란 곰/해달 귀
    const earColorMat = charKey === 'kurimanju'
      ? new THREE.MeshStandardMaterial({ color: 0x7c3f10, roughness: 0.7 })
      : skinMat;
    [-0.95, 0.95].forEach(ex => {
      const ear = new THREE.Mesh(new THREE.SphereGeometry(0.42, 18, 18), earColorMat);
      ear.scale.set(1, 1, 0.65);
      ear.position.set(ex, 1.18, 0);
      ear.castShadow = true;
      earsGroup.add(ear);
    });
  }

  // 4) 귀여운 3D 팔 (Left & Right Arms) & 무기 장착
  const leftArmPivot = new THREE.Group();
  leftArmPivot.position.set(-1.12, 1.65, 0.15);
  const leftArm = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), skinMat);
  leftArm.scale.set(0.85, 1.45, 0.85);
  leftArm.position.y = -0.32;
  leftArm.castShadow = true;
  leftArmPivot.add(leftArm);
  root.add(leftArmPivot);

  const rightArmPivot = new THREE.Group();
  rightArmPivot.position.set(1.12, 1.65, 0.15);
  const rightArm = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 16), skinMat);
  rightArm.scale.set(0.85, 1.45, 0.85);
  rightArm.position.y = -0.32;
  rightArm.castShadow = true;
  rightArmPivot.add(rightArm);
  root.add(rightArmPivot);

  // 오른손에 3D 무기 장착 (사스마타, 토벌봉, 대검 등)
  const weaponMesh = createWeaponMesh(cfg.weaponType);
  weaponMesh.position.set(0.1, -0.45, 0.55);
  weaponMesh.rotation.x = Math.PI / 3;
  rightArmPivot.add(weaponMesh);

  // 5) 짧은 3D 다리 (Left & Right Legs)
  const leftLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.48, 0.45, 0);
  const leftLeg = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 16), skinMat);
  leftLeg.scale.set(0.9, 1.3, 1.0);
  leftLeg.position.y = -0.22;
  leftLeg.castShadow = true;
  leftLegPivot.add(leftLeg);
  root.add(leftLegPivot);

  const rightLegPivot = new THREE.Group();
  rightLegPivot.position.set(0.48, 0.45, 0);
  const rightLeg = new THREE.Mesh(new THREE.SphereGeometry(0.34, 16, 16), skinMat);
  rightLeg.scale.set(0.9, 1.3, 1.0);
  rightLeg.position.y = -0.22;
  rightLeg.castShadow = true;
  rightLegPivot.add(rightLeg);
  root.add(rightLegPivot);

  // 애니메이션 참조 저장
  root.userData.parts = {
    bodyMesh,
    headGroup,
    headMesh,
    earsGroup,
    leftArmPivot,
    rightArmPivot,
    leftLegPivot,
    rightLegPivot,
    weaponMesh
  };

  // 표정 변경 헬퍼
  root.userData.setExpression = (expr) => {
    if (root.userData.currentExpr === expr) return;
    root.userData.currentExpr = expr;
    const newTex = createPlushieFaceTexture(charKey, expr);
    headMesh.material.map = newTex;
    headMesh.material.needsUpdate = true;
  };

  return root;
}

// ==========================================================================
// 3. 3D 무기 메쉬 생성기 (사스마타, 우사기 토벌봉, 랏코 대검, 쿠리만쥬 캔)
// ==========================================================================
function createWeaponMesh(weaponType) {
  const group = new THREE.Group();

  if (weaponType === 'sasumata_pink' || weaponType === 'sasumata_blue') {
    const color = weaponType === 'sasumata_pink' ? 0xff758f : 0x38bdf8;
    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.4, metalness: 0.2 });

    // 긴 자루
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 2.7, 12), mat);
    pole.position.y = 0.6;
    group.add(pole);

    // U자형 포크 헤드
    const fork = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.09, 12, 24, Math.PI), mat);
    fork.position.y = 1.95;
    fork.rotation.z = Math.PI;
    group.add(fork);
  } else if (weaponType === 'staff_yellow') {
    // 우사기 노란 토벌봉
    const yellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.45 });
    const darkMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 2.6, 14), yellowMat);
    pole.position.y = 0.6;
    group.add(pole);

    const tip1 = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.35, 14), darkMat);
    tip1.position.y = 1.9;
    group.add(tip1);
  } else if (weaponType === 'greatsword') {
    // 랏코 사부 대검
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.75, roughness: 0.25 });
    const hiltMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.5, roughness: 0.4 });

    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.4, 0.08), bladeMat);
    blade.position.y = 1.1;
    group.add(blade);

    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.14, 0.2), hiltMat);
    guard.position.y = -0.05;
    group.add(guard);
  } else if (weaponType === 'drink_can') {
    // 쿠리만쥬 음료 캔
    const canMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.5, roughness: 0.3 });
    const can = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 0.58, 16), canMat);
    can.position.y = 0.2;
    group.add(can);
  }

  return group;
}

// ==========================================================================
// 4. 3D 몬스터 빌더 (딱정벌레, 키메라, 고블린, 거대 보스 아노코)
// ==========================================================================
function createMonster3D(type = 'chimera') {
  const group = new THREE.Group();

  if (type === 'bug') {
    // 초록 딱정벌레
    const shellMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.5 });
    const body = new THREE.Mesh(new THREE.SphereGeometry(1.1, 20, 18), shellMat);
    body.scale.set(1.1, 0.85, 1.3);
    body.position.y = 0.9;
    body.castShadow = true;
    group.add(body);

    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.2, 0.9, 12), shellMat);
    horn.position.set(0, 1.5, 0.95);
    horn.rotation.x = Math.PI / 4;
    group.add(horn);
  } else if (type === 'anoko') {
    // 거대 보스 아노코 (하얗고 거대한 뿔 달린 괴수)
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfff1f2, roughness: 0.7 });
    const hornMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.4 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0x111827 });

    const body = new THREE.Mesh(new THREE.SphereGeometry(3.2, 28, 24), whiteMat);
    body.scale.set(1.1, 1.2, 1.0);
    body.position.y = 3.2;
    body.castShadow = true;
    group.add(body);

    // 거대한 외뿔
    const horn = new THREE.Mesh(new THREE.ConeGeometry(0.55, 2.2, 16), hornMat);
    horn.position.set(0, 6.8, 0.8);
    horn.rotation.x = 0.2;
    group.add(horn);

    // 눈
    [-1.1, 1.1].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.38, 14, 14), eyeMat);
      eye.position.set(ex, 4.3, 2.85);
      group.add(eye);
    });
  } else {
    // 붉은 키메라 몬스터
    const redMat = new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.6 });
    const wingMat = new THREE.MeshStandardMaterial({ color: 0x881337, roughness: 0.7 });
    const eyeMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

    const body = new THREE.Mesh(new THREE.SphereGeometry(1.55, 24, 20), redMat);
    body.position.y = 1.6;
    body.castShadow = true;
    group.add(body);

    [-0.55, 0.55].forEach(ex => {
      const eye = new THREE.Mesh(new THREE.SphereGeometry(0.24, 12, 12), eyeMat);
      eye.position.set(ex, 2.0, 1.4);
      group.add(eye);
    });

    // 날개
    [-1.4, 1.4].forEach((wx, idx) => {
      const wing = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.6, 8), wingMat);
      wing.position.set(wx, 2.2, -0.3);
      wing.rotation.z = idx === 0 ? 1.1 : -1.1;
      group.add(wing);
    });
  }

  return group;
}

// ==========================================================================
// 5. 3D 타운 환경 오브젝트 빌더 (치이카와 하우스, 라멘 랑, 자이언트 푸딩, 잡초)
// ==========================================================================
function createChiikawaHouse3D() {
  const house = new THREE.Group();

  // 크림핑크 돔 본체 (무거첨 당첨 하우스!)
  const wallMat = new THREE.MeshStandardMaterial({ color: 0xfff0f5, roughness: 0.75 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xff85a2, roughness: 0.65 });
  const doorMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 });

  const base = new THREE.Mesh(new THREE.CylinderGeometry(5.5, 6.0, 4.5, 28), wallMat);
  base.position.y = 2.25;
  base.castShadow = true;
  base.receiveShadow = true;
  house.add(base);

  const dome = new THREE.Mesh(new THREE.SphereGeometry(5.8, 28, 20, 0, Math.PI * 2, 0, Math.PI * 0.55), roofMat);
  dome.position.y = 4.2;
  dome.castShadow = true;
  house.add(dome);

  // 집 위 귀 장식 2개
  [-3.2, 3.2].forEach(ex => {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(1.4, 18, 18), roofMat);
    ear.position.set(ex, 8.6, 0);
    house.add(ear);
  });

  // 아치형 문
  const door = new THREE.Mesh(new THREE.BoxGeometry(2.2, 3.2, 0.5), doorMat);
  door.position.set(0, 1.6, 5.75);
  house.add(door);

  return house;
}

function createRamenStall3D() {
  const stall = new THREE.Group();

  const woodMat = new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.8 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.6 });
  const yellowMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 });

  // 카운터 테이블
  const counter = new THREE.Mesh(new THREE.BoxGeometry(8, 2.2, 3.2), woodMat);
  counter.position.y = 1.1;
  counter.castShadow = true;
  stall.add(counter);

  // 기둥 4개
  [[-3.6, -1.2], [3.6, -1.2], [-3.6, 1.2], [3.6, 1.2]].forEach(([px, pz]) => {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 5.5, 10), woodMat);
    post.position.set(px, 2.75, pz);
    stall.add(post);
  });

  // 라멘 '랑(郎)' 노란 간판 지붕
  const roof = new THREE.Mesh(new THREE.BoxGeometry(9.2, 1.2, 4.4), yellowMat);
  roof.position.y = 5.6;
  roof.castShadow = true;
  stall.add(roof);

  // 붉은 홍등 2개
  const lanternMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xdc2626,
    emissiveIntensity: 0.5
  });
  [-3.8, 3.8].forEach(lx => {
    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), lanternMat);
    lantern.scale.set(0.85, 1.25, 0.85);
    lantern.position.set(lx, 4.4, 1.8);
    stall.add(lantern);
  });

  // 갑옷씨(요로이산) 3D NPC
  const armorGroup = new THREE.Group();
  const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.7, roughness: 0.35 });
  const armorBody = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.05, 2.4, 16), steelMat);
  armorBody.position.y = 1.2;
  armorGroup.add(armorBody);
  const armorHead = new THREE.Mesh(new THREE.SphereGeometry(0.85, 18, 18), steelMat);
  armorHead.position.y = 2.9;
  armorGroup.add(armorHead);
  armorGroup.position.set(0, 0, -0.4);
  stall.add(armorGroup);

  return stall;
}

function createGiantPudding3D() {
  const pudding = new THREE.Group();

  const custardMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.45 });
  const caramelMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.35 });
  const creamMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.6 });
  const cherryMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, roughness: 0.3 });

  // 커스터드 푸딩 몸통
  const base = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 7.5, 5.0, 32), custardMat);
  base.position.y = 2.5;
  base.castShadow = true;
  base.receiveShadow = true;
  pudding.add(base);

  // 카라멜 시럽 상단 캡
  const top = new THREE.Mesh(new THREE.CylinderGeometry(5.0, 5.25, 1.2, 32), caramelMat);
  top.position.y = 5.1;
  pudding.add(top);

  // 생크림과 체리 장식
  const cream = new THREE.Mesh(new THREE.SphereGeometry(1.4, 18, 18), creamMat);
  cream.scale.set(1.2, 0.7, 1.2);
  cream.position.y = 5.9;
  pudding.add(cream);

  const cherry = new THREE.Mesh(new THREE.SphereGeometry(0.65, 16, 16), cherryMat);
  cherry.position.y = 6.65;
  pudding.add(cherry);

  return pudding;
}

function createWeedPatch3D(isGolden = false) {
  const weed = new THREE.Group();
  const color = isGolden ? 0xfacc15 : 0x22c55e;
  const mat = new THREE.MeshStandardMaterial({
    color,
    emissive: isGolden ? 0xca8a04 : 0x000000,
    emissiveIntensity: isGolden ? 0.35 : 0,
    roughness: 0.6
  });

  for (let i = 0; i < 5; i++) {
    const blade = new THREE.Mesh(new THREE.ConeGeometry(0.28, 1.35, 8), mat);
    const angle = (i / 5) * Math.PI * 2;
    blade.position.set(Math.cos(angle) * 0.25, 0.65, Math.sin(angle) * 0.25);
    blade.rotation.z = (Math.random() - 0.5) * 0.45;
    blade.rotation.x = (Math.random() - 0.5) * 0.45;
    blade.castShadow = true;
    weed.add(blade);
  }

  return weed;
}
