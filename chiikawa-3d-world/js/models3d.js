// ==========================================================================
// 치이카와 3D 오픈월드 타운 - 고품질 3D 캐릭터/몬스터/월드 에셋 빌더 (models3d.js)
// [Live2D/Spine 스타일 실시간 버텍스 스켈레탈 변형 모션 + 3D 손/무기 관절 리그
//  + GLSL 애니메이션 스카이돔 + 2,400개 Instanced 3D 흔들리는 풀숲]
// ==========================================================================

let sharedToonGradientMap = null;
function getToonGradientMap() {
  if (sharedToonGradientMap) return sharedToonGradientMap;
  const colors = new Uint8Array([80, 130, 178, 222]);
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
    desc: '용기 내어 앞으로 콕콕 찌르는 직선 스피어 창술과 폴짝 내려찍기 모션을 구사합니다!',
    bodyColor: 0xffffff,
    accentColor: 0xff85a2,
    weaponType: 'sasumata_pink',
    weaponName: '핑크 사스마타',
    attackStyleName: '용기의 콕콕 찌르기 & 점프 찍기',
    comboNames: ['🩷 에잇! 용기 찌르기!', '🩷🩷 다다닥 연속 찌르기!', '💖 폴짝! 사스마타 내려찍기!'],
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
    desc: '넓은 수평 가로베기, 날렵한 대각선 어퍼 슬래시, 360도 회오리 스핀으로 이어지는 정석 창술!',
    bodyColor: 0xffffff,
    accentColor: 0x38bdf8,
    weaponType: 'sasumata_blue',
    weaponName: '블루 사스마타',
    attackStyleName: '정석 가로베기 & 회오리 스핀',
    comboNames: ['💙 와이드 가로베기!', '💎 어퍼 올려베기!', '🌪️ 난또까나레 회오리 스핀!'],
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
    desc: '초고속 프로펠러 봉 돌리기, 360도 옆돌기 아크로바틱, 앞공중제비 폭약 스매시를 퍼붓는 천재 에이스!',
    bodyColor: 0xfff3c4,
    accentColor: 0xfacc15,
    weaponType: 'wand_yellow',
    weaponName: '폭약 토벌봉',
    attackStyleName: '프로펠러 봉술 & 공중제비 폭격',
    comboNames: ['💛 우라! 프로펠러 봉돌리기!', '⚡ 야하! 360도 옆돌기 타격!', '💥 이얏하!! 공중제비 대폭발!'],
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
    desc: '건방진 백핸드 후리기, 방방 뛰며 양팔 떼쓰기 난타, 샤랄라 2회전 피루엣 스핀으로 적을 현혹합니다!',
    bodyColor: 0xffffff,
    accentColor: 0xa855f7,
    weaponType: 'sasumata_purple',
    weaponName: '보라 사스마타',
    attackStyleName: '떼쓰기 난타 & 샤랄라 피루엣',
    comboNames: ['💜 흥! 백핸드 휙 치기!', '💢 방방 뛰며 떼쓰기 난타!', '✨ 봐라! 샤랄라 2회전 피루엣!'],
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
    desc: '묵직한 어깨 대각선 강타, 호쾌한 배치기 충격파, 전신 기합 모아치기 대지분쇄를 구사하는 중량급 달인!',
    bodyColor: 0xfef3c7,
    accentColor: 0xd97706,
    weaponType: 'sasumata_amber',
    weaponName: '호박빛 사스마타',
    attackStyleName: '묵직한 배치기 & 모아치기 분쇄',
    comboNames: ['🧡 묵직한 어깨 내려베기!', '🍺 호쾌한 배치기 진동타!', '🌋 크으으!! 대지분쇄 모아치기!'],
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
    title: '⚔️ 토벌 랭킹 1위 상위 랭커 & 하얀 망토·명검',
    desc: '오른쪽 눈 위의 십자 흉터와 하얀 망토, 등 뒤의 칼집 보자기가 트레이드마크! 초고속 발도술과 십자 일섬을 구사합니다.',
    bodyColor: 0x1c1917,
    accentColor: 0xfacc15,
    weaponType: 'rakko_sword',
    weaponName: '상위 랭커의 토벌검',
    attackStyleName: '초고속 발도술 & 십자(十) 일섬',
    comboNames: ['⚔️ 발도: 전광석화 수평일섬!', '⚡ 역수 2연참: 쌍검섬!', '🌟 비기: 질풍 십자(十) 일섬!!'],
    speed: 22.5,
    atk: 46,
    skillName: '상위 랭커의 비기: 일섬 십자베기',
    portrait: 'assets/rakko.png?v=3',
    quotes: [
      '토벌 랭킹 1위의 검술을 보여주마. 나를 믿고 따라와라!',
      '전투가 끝난 뒤 딸기 파르페와 달콤한 생크림을 먹는 게 진짜 보람이지...',
      '강해지고 싶다면 두려워하지 말고 정면으로 검을 휘둘러라!'
    ]
  }
};

// ==========================================================================
// 2. GLSL 애니메이션 그라데이션 스카이돔 & 4,500개 확장형 Instanced 3D 잔디밭
// ==========================================================================
function createAnimeSkyDome3D() {
  const geo = new THREE.SphereGeometry(560, 32, 24);
  const mat = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: new THREE.Color(0x2563eb) },
      midColor: { value: new THREE.Color(0x7dd3fc) },
      bottomColor: { value: new THREE.Color(0xdbeafe) }
    },
    vertexShader: `
      varying vec3 vWorldPos;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vWorldPos = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }
    `,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 midColor;
      uniform vec3 bottomColor;
      varying vec3 vWorldPos;
      void main() {
        float h = normalize(vWorldPos).y;
        vec3 col = mix(bottomColor, midColor, smoothstep(-0.05, 0.28, h));
        col = mix(col, topColor, smoothstep(0.28, 0.88, h));
        gl_FragColor = vec4(col, 1.0);
      }
    `,
    side: THREE.BackSide,
    depthWrite: false
  });
  return new THREE.Mesh(geo, mat);
}

// 4,500개의 입체 3D 풀잎을 단 1번의 Draw Call로 넓어진 월드 전역에 렌더링하는 InstancedMesh
function createInstancedGrassField3D() {
  const count = 4500;
  const bladeGeo = new THREE.ConeGeometry(0.18, 0.95, 5);
  bladeGeo.translate(0, 0.45, 0);
  const gradientMap = getToonGradientMap();
  const bladeMat = new THREE.MeshToonMaterial({
    color: 0x4d7c0f,
    gradientMap
  });

  const instMesh = new THREE.InstancedMesh(bladeGeo, bladeMat, count);
  instMesh.receiveShadow = true;

  const dummy = new THREE.Object3D();
  const baseTransforms = [];
  const color = new THREE.Color();
  const palette = [0x4d7c0f, 0x65a30d, 0x3f6212, 0x15803d];

  let idx = 0;
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 21 + Math.random() * 195;
    const x = Math.cos(angle) * dist;
    const z = Math.sin(angle) * dist;

    // 시냇물 영역(z: 23~33) 및 온천 호수 영역(x: -100~-64, z: -86~-50)은 제외
    if (z > 23 && z < 33) continue;
    if (Math.hypot(x - (-82), z - (-68)) < 16) continue;

    const rotY = Math.random() * Math.PI * 2;
    const scaleY = 0.65 + Math.random() * 0.85;
    const scaleXZ = 0.75 + Math.random() * 0.5;

    dummy.position.set(x, 0, z);
    dummy.rotation.set(0, rotY, 0);
    dummy.scale.set(scaleXZ, scaleY, scaleXZ);
    dummy.updateMatrix();
    instMesh.setMatrixAt(idx, dummy.matrix);

    color.setHex(palette[idx % palette.length]);
    instMesh.setColorAt(idx, color);

    baseTransforms.push({ x, z, rotY, scaleXZ, scaleY, phase: (x + z) * 0.12 });
    idx++;
  }

  instMesh.count = idx;
  instMesh.instanceMatrix.needsUpdate = true;
  if (instMesh.instanceColor) instMesh.instanceColor.needsUpdate = true;

  // 매 프레임 바람에 흔들리는 업데이트 함수 제공
  instMesh.userData.updateWind = time => {
    for (let i = 0; i < idx; i++) {
      const bt = baseTransforms[i];
      const sway = Math.sin(time * 2.6 + bt.phase) * 0.18;
      dummy.position.set(bt.x, 0, bt.z);
      dummy.rotation.set(sway * 0.5, bt.rotY, sway);
      dummy.scale.set(bt.scaleXZ, bt.scaleY, bt.scaleXZ);
      dummy.updateMatrix();
      instMesh.setMatrixAt(i, dummy.matrix);
    }
    instMesh.instanceMatrix.needsUpdate = true;
  };

  return instMesh;
}

// ==========================================================================
// 3. 눈이 편안한 차분한 톤의 프로시저럴 지형 텍스처 생성기
// ==========================================================================
function createGrassCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 눈부심을 줄인 차분하고 깊은 파스텔 초원 그린 베이스
  ctx.fillStyle = '#5c9427';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 95; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(116, 172, 46, 0.35)' : 'rgba(63, 98, 18, 0.25)';
    ctx.beginPath();
    ctx.arc(Math.random() * 512, Math.random() * 512, 18 + Math.random() * 36, 0, Math.PI * 2);
    ctx.fill();
  }

  for (let i = 0; i < 450; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.strokeStyle = i % 3 === 0 ? '#84cc16' : '#3f6212';
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
  tex.repeat.set(28, 28);
  return tex;
}

function createPlazaCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // 눈이 시리지 않은 따뜻한 샌드베이지 석재 타일 톤
  ctx.fillStyle = '#e5d7c1';
  ctx.fillRect(0, 0, 512, 512);

  const cx = 256;
  const cy = 256;
  for (let r = 24; r < 250; r += 26) {
    ctx.strokeStyle = '#c29b61';
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

  ctx.strokeStyle = '#e17086';
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.arc(cx, cy, 238, 0, Math.PI * 2);
  ctx.stroke();

  return new THREE.CanvasTexture(canvas);
}

function createWaterCanvasTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#0ea5e9';
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 70; i++) {
    ctx.fillStyle = i % 2 === 0 ? 'rgba(125, 211, 252, 0.5)' : 'rgba(255, 255, 255, 0.42)';
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
// 4. 스마트 배경 투명화 (모폴로지 Flood-Fill)
// ==========================================================================
const cleanTextureCache = {};

function loadCleanCharacterTexture(imageUrl, onReady) {
  if (cleanTextureCache[imageUrl]) {
    if (onReady) onReady(cleanTextureCache[imageUrl]);
    return cleanTextureCache[imageUrl];
  }

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

    const pad = 18;
    const drawW = size - pad * 2;
    const drawH = size - pad * 2;
    ctx.drawImage(img, pad, pad, drawW, drawH);

    const imgData = ctx.getImageData(0, 0, size, size);
    const data = imgData.data;

    const cornerIdx = ((pad + 2) * size + (pad + 2)) * 4;
    const hasNativeAlpha = data[cornerIdx + 3] < 50;

    if (!hasNativeAlpha) {
      const N = size * size;
      const isDarkLine = new Uint8Array(N);
      for (let i = 0; i < N; i++) {
        const r = data[i * 4];
        const g = data[i * 4 + 1];
        const b = data[i * 4 + 2];
        const a = data[i * 4 + 3];
        if (a > 50 && (r < 238 || g < 238 || b < 238)) {
          isDarkLine[i] = 1;
        }
      }

      const sealRadius = 12;
      const sealedBarrier = new Uint8Array(N);
      const horizTemp = new Uint8Array(N);

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

      const isExteriorCore = new Uint8Array(N);
      const queue = new Int32Array(N);
      let head = 0;
      let tail = 0;

      const pushSeed = idx => {
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

      for (let i = 0; i < N; i++) {
        if (isExteriorFinal[i]) {
          data[i * 4 + 3] = 0;
        }
      }
    }

    ctx.putImageData(imgData, 0, 0);

    const finalCtx = tempCanvas.getContext('2d');
    finalCtx.clearRect(0, 0, size, size);
    finalCtx.save();
    finalCtx.shadowColor = 'rgba(255, 255, 255, 0.96)';
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
// 5. 사스마타 & 전용 무기 3D 메쉬 + 3D 손(Paw) 빌더
// ==========================================================================
function createWeapon3D(weaponType, bodyColor = 0xffffff) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  // 무기를 쥐고 있는 3D 찹쌀떡 손(Paw) 추가!
  const pawMat = new THREE.MeshToonMaterial({ color: bodyColor, gradientMap });
  const paw = new THREE.Mesh(new THREE.SphereGeometry(0.32, 14, 14), pawMat);
  paw.position.set(0, 0.25, 0.08);
  addCartoonOutline(paw, 0.08);
  group.add(paw);

  if (weaponType === 'rakko_sword') {
    // 원작 랏코의 트레이드마크: 흰색/크림색 손잡이(검은 줄무늬) + 흰색 사각 코등이 + 은백색 도신
    const hiltMat = new THREE.MeshToonMaterial({ color: 0xfef9ee, gradientMap });
    const stripeMat = new THREE.MeshBasicMaterial({ color: 0x1c1917 });
    const guardMat = new THREE.MeshToonMaterial({ color: 0xffffff, gradientMap });
    const bladeMat = new THREE.MeshToonMaterial({
      color: 0xf8fafc,
      gradientMap
    });

    const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.05, 10), hiltMat);
    addCartoonOutline(handle, 0.06, 0x1c1917);
    group.add(handle);

    [-0.28, 0, 0.28].forEach(sy => {
      const band = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.08, 10), stripeMat);
      band.position.y = sy;
      group.add(band);
    });

    const guard = new THREE.Mesh(new THREE.BoxGeometry(0.92, 0.22, 0.38), guardMat);
    guard.position.y = 0.56;
    addCartoonOutline(guard, 0.06, 0x1c1917);
    group.add(guard);

    const blade = new THREE.Mesh(new THREE.BoxGeometry(0.28, 2.85, 0.09), bladeMat);
    blade.position.y = 2.02;
    blade.castShadow = true;
    addCartoonOutline(blade, 0.045, 0x1c1917);
    group.add(blade);
    return group;
  }

  if (weaponType === 'wand_yellow') {
    const rodMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });
    const tipMat = new THREE.MeshToonMaterial({
      color: 0xf43f5e,
      gradientMap,
      emissive: 0xf43f5e,
      emissiveIntensity: 0.25
    });

    const rod = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.5, 12), rodMat);
    rod.position.y = 1.0;
    addCartoonOutline(rod, 0.04);
    group.add(rod);

    const topBall = new THREE.Mesh(new THREE.SphereGeometry(0.36, 14, 14), tipMat);
    topBall.position.y = 2.8;
    addCartoonOutline(topBall, 0.05);
    group.add(topBall);

    const botBall = new THREE.Mesh(new THREE.SphereGeometry(0.26, 12, 12), tipMat);
    botBall.position.y = -0.75;
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
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 3.3, 12), mat);
  pole.position.y = 1.0;
  pole.castShadow = true;
  addCartoonOutline(pole, 0.045);
  group.add(pole);

  const forkGeo = new THREE.TorusGeometry(0.5, 0.11, 10, 22, Math.PI);
  const fork = new THREE.Mesh(forkGeo, mat);
  fork.position.y = 2.7;
  fork.rotation.z = Math.PI;
  fork.castShadow = true;
  addCartoonOutline(fork, 0.045);
  group.add(fork);

  return group;
}

// ==========================================================================
// 6. 3D 머리 코스튬 액세서리 생성기
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
// 7. Live2D / Spine 스타일 실시간 버텍스 변형 모션이 탑재된 3D 캐릭터 리그!
// ==========================================================================
function createChiikawaPlushie(charKey = 'chiikawa') {
  const cfg = CHAR_CONFIGS[charKey] || CHAR_CONFIGS.chiikawa;
  const root = new THREE.Group();
  root.userData.charKey = charKey;

  // 바닥 원형 그림자 디스크
  const shadowGeo = new THREE.CircleGeometry(1.8, 28);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: 0x0f172a,
    transparent: true,
    opacity: 0.3,
    depthWrite: false
  });
  const shadowDisc = new THREE.Mesh(shadowGeo, shadowMat);
  shadowDisc.position.y = 0.04;
  root.add(shadowDisc);

  // 다층 3D 볼륨 스탠디 (고밀도 14x18 서브디비전 지오메트리 공유 -> 실시간 버텍스 변형!)
  const standeeGroup = new THREE.Group();
  const charTex = loadCleanCharacterTexture(cfg.portrait);

  const planeW = 4.6;
  const planeH = 4.8;
  const sharedDeformGeo = new THREE.PlaneGeometry(planeW, planeH, 14, 18);
  sharedDeformGeo.translate(0, planeH * 0.5, 0);

  const posAttr = sharedDeformGeo.attributes.position;
  const baseCoords = new Float32Array(posAttr.array.length);
  baseCoords.set(posAttr.array);

  const layerCount = 7;
  const totalThickness = 0.36;
  const standeeMaterials = [];

  for (let i = 0; i < layerCount; i++) {
    const isFrontOrBack = i === 0 || i === layerCount - 1;
    const mat = new THREE.MeshBasicMaterial({
      map: charTex,
      transparent: true,
      alphaTest: 0.15,
      side: THREE.DoubleSide,
      color: isFrontOrBack ? 0xffffff : 0xe2e8f0
    });
    standeeMaterials.push(mat);

    const slice = new THREE.Mesh(sharedDeformGeo, mat);
    slice.position.z = ((i / (layerCount - 1)) - 0.5) * totalThickness;
    slice.castShadow = i === Math.floor(layerCount / 2);
    standeeGroup.add(slice);
  }
  root.add(standeeGroup);

  // 3D 무기 & 손 관절 피벗
  const leftLegPivot = new THREE.Group();
  const rightLegPivot = new THREE.Group();
  const leftArmPivot = new THREE.Group();
  const rightArmPivot = new THREE.Group();
  const earsGroup = new THREE.Group();

  // 무기를 캐릭터 앞/옆에서 입체적으로 휘두르도록 배치
  rightArmPivot.position.set(1.45, 1.85, 0.42);
  const weaponMesh = createWeapon3D(cfg.weaponType, cfg.bodyColor);
  weaponMesh.position.set(0.15, -0.25, 0.15);
  weaponMesh.rotation.x = Math.PI / 7;
  weaponMesh.rotation.z = -0.22;
  rightArmPivot.add(weaponMesh);

  // 반대편 귀여운 3D 왼손(Paw)도 입체로 부착해 달릴 때 팔을 앞뒤로 흔들게 함!
  const gradientMap = getToonGradientMap();
  const leftPawMat = new THREE.MeshToonMaterial({ color: cfg.bodyColor, gradientMap });
  const leftPaw = new THREE.Mesh(new THREE.SphereGeometry(0.28, 12, 12), leftPawMat);
  addCartoonOutline(leftPaw, 0.08);
  leftArmPivot.position.set(-1.35, 1.75, 0.32);
  leftArmPivot.add(leftPaw);

  // 랏코(rakko) 전용 3D 휘날리는 하얀 망토 & 등 뒤 칼집 디테일 부착!
  let rakkoCapePivot = null;
  if (charKey === 'rakko') {
    rakkoCapePivot = new THREE.Group();
    rakkoCapePivot.position.set(0, 2.15, -0.22);
    const capeMat = new THREE.MeshToonMaterial({
      color: 0xffffff,
      gradientMap,
      side: THREE.DoubleSide
    });
    const capeGeo = new THREE.CylinderGeometry(1.15, 1.75, 1.65, 16, 1, true, -Math.PI * 0.42, Math.PI * 0.84);
    capeGeo.translate(0, -0.75, 0);
    const capeMesh = new THREE.Mesh(capeGeo, capeMat);
    capeMesh.rotation.y = Math.PI;
    capeMesh.rotation.x = 0.18;
    addCartoonOutline(capeMesh, 0.035, 0x1c1917);
    rakkoCapePivot.add(capeMesh);
    standeeGroup.add(rakkoCapePivot);
  }

  standeeGroup.add(leftArmPivot);
  standeeGroup.add(rightArmPivot);

  // 3D 모자 장착 슬롯 (머리 정점 움직임과 함께 연동!)
  const hatSlot = new THREE.Group();
  hatSlot.position.set(0, 4.4, 0.12);
  standeeGroup.add(hatSlot);

  root.userData.parts = {
    standeeGroup,
    standeeMaterials,
    sharedDeformGeo,
    baseCoords,
    shadowDisc,
    leftLegPivot,
    rightLegPivot,
    leftArmPivot,
    rightArmPivot,
    earsGroup,
    hatSlot,
    weaponMesh,
    rakkoCapePivot
  };

  // ========================================================================
  // 핵심: Live2D/Spine 스타일 실시간 버텍스 스켈레탈 모션 엔진 (updateMotion)
  // ========================================================================
  root.userData.jellySpring = 0; // 착지/공격 시 말랑거리는 젤리 스프링 진폭

  root.userData.updateMotion = (time, walkTime, isMoving, isGrounded, velY, attackTimer, comboStep, maxAttackTime = 0.28) => {
    const arr = posAttr.array;
    const count = posAttr.count;

    // 젤리 탄성 감쇠
    if (root.userData.jellySpring > 0.001) {
      root.userData.jellySpring *= 0.88;
    } else {
      root.userData.jellySpring = 0;
    }

    const jellyWave = Math.sin(time * 28) * root.userData.jellySpring;
    const breath = Math.sin(time * 3.6) * 0.028;
    const atkDur = maxAttackTime || (comboStep === 3 ? 0.36 : 0.26);
    const p = attackTimer > 0 ? 1.0 - Math.min(1, Math.max(0, attackTimer / atkDur)) : 0;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const bx = baseCoords[idx];
      const by = baseCoords[idx + 1];
      const bz = baseCoords[idx + 2];

      // 높이 정규화 v ∈ [0 (발바닥), 1 (귀 끝)]
      const v = Math.max(0, Math.min(1, by / planeH));

      let dx = 0;
      let dy = 0;
      let dz = 0;

      // 1) 숨쉬기 & 말랑 모찌 볼살/배 탄성 (중간 몸통 v = 0.25 ~ 0.75)
      const bellyMask = Math.sin(v * Math.PI);
      dx += bx * (breath + jellyWave * 0.35) * bellyMask;
      dy += by * (breath * 0.6 - jellyWave * 0.28);

      // 2) 달릴 때 좌우 다리(v < 0.30)가 실제로 번갈아 위아래/앞뒤로 총총거리는 모션!
      if (isMoving && isGrounded) {
        if (v < 0.30) {
          const legWeight = 1.0 - (v / 0.30);
          if (Math.abs(bx) > 0.12) {
            const sideSign = bx > 0 ? 1 : -1;
            const stridePhase = walkTime + (sideSign > 0 ? 0 : Math.PI);
            const liftY = Math.max(0, Math.sin(stridePhase)) * 0.42 * legWeight;
            const kickX = Math.cos(stridePhase) * 0.18 * legWeight;
            const kickZ = Math.cos(stridePhase) * 0.28 * legWeight;
            dy += liftY;
            dx += kickX;
            dz += kickZ;
          }
        }

        if (v > 0.45) {
          const upperWeight = (v - 0.45) / 0.55;
          dx += Math.sin(walkTime) * 0.22 * upperWeight;
          if (v > 0.75) {
            const earWeight = (v - 0.75) / 0.25;
            dy += Math.sin(walkTime * 2 - Math.abs(bx)) * 0.12 * earWeight;
          }
        }
      } else if (isGrounded) {
        if (v > 0.75) {
          const earWeight = (v - 0.75) / 0.25;
          dx += Math.sin(time * 2.8 + bx) * 0.06 * earWeight;
        }
      }

      // 3) 점프/낙하 중 공중 스트레치 & 귀 나부낌 변형
      if (!isGrounded) {
        const stretch = Math.max(-0.22, Math.min(0.28, velY * 0.014));
        dy += by * stretch * v;
        dx -= bx * stretch * 0.45 * bellyMask;
      }

      // 4) 캐릭터별 고유 공격 체형 변형 (Live2D 버텍스 애니메이션)
      if (attackTimer > 0) {
        if (charKey === 'chiikawa') {
          // 치이카와: 용기 내어 부들부들 떨며 앞으로 몸을 쭉 뻗어 찌르기!
          const thrust = Math.sin(p * Math.PI);
          const tremble = comboStep === 2 ? Math.sin(p * 45) * 0.09 * v : 0;
          dx += thrust * 0.32 * v + tremble;
          dz += thrust * 0.42 * bellyMask;
          dy -= thrust * 0.12 * v;
        } else if (charKey === 'hachiware') {
          // 하치와레: 좌우로 시원하게 비틀며 베는 날렵한 상체 스냅
          const sweep = Math.sin(p * Math.PI * 2);
          dx += sweep * 0.38 * v;
          dz += Math.sin(p * Math.PI) * 0.28 * bellyMask;
        } else if (charKey === 'usagi') {
          // 우사기: 탄력 넘치는 스프링 텐션 스트레치
          const bounce = Math.sin(p * Math.PI * 2);
          dy += bounce * 0.36 * v;
          dx -= bx * bounce * 0.22 * bellyMask;
        } else if (charKey === 'momonga') {
          // 모몽가: 엉덩이와 복실 꼬리를 좌우로 씰룩거리며 떼쓰기 바운스
          const hipSway = Math.sin(p * Math.PI * 3) * 0.36 * (1.0 - v * 0.5);
          dx += hipSway;
          dy += Math.abs(Math.sin(p * Math.PI * 2)) * 0.25 * bellyMask;
        } else if (charKey === 'kurimanju') {
          // 쿠리만쥬: 묵직하게 힘을 모았다가 배를 내밀며 터뜨리는 중량감
          if (comboStep === 2) {
            // 배치기!
            const bellyBump = Math.sin(p * Math.PI);
            dx += bx * bellyBump * 0.36 * bellyMask;
            dz += bellyBump * 0.58 * bellyMask;
          } else {
            const heavy = p < 0.35 ? -0.22 : Math.sin((p - 0.35) * 1.5 * Math.PI) * 0.38;
            dy += heavy * v;
            dx -= bx * heavy * 0.3 * bellyMask;
          }
        } else if (charKey === 'rakko') {
          // 랏코 사부: 낮게 깔리는 발도술 자세와 날카로운 전경 린(Lean)
          const slashLean = Math.sin(p * Math.PI);
          dx += slashLean * 0.46 * v;
          dy -= slashLean * 0.18 * v;
          dz += slashLean * 0.32 * v;
        }
      }

      arr[idx] = bx + dx;
      arr[idx + 1] = by + dy;
      arr[idx + 2] = bz + dz;
    }

    posAttr.needsUpdate = true;

    // 3D 모자 슬롯 위치도 정수리 변형에 맞춰 자연스럽게 바운스
    hatSlot.position.y = 4.4 + (breath - jellyWave * 0.25) * 3.2;
    hatSlot.rotation.z = isMoving ? Math.sin(walkTime) * 0.06 : 0;

    // 랏코 사범의 하얀 망토 나부낌 모션 (공격 시 더욱 역동적으로 휘날림!)
    if (rakkoCapePivot) {
      if (attackTimer > 0) {
        rakkoCapePivot.rotation.x = 0.65 + Math.sin(p * Math.PI) * 0.45;
        rakkoCapePivot.rotation.z = (comboStep === 2 ? -1 : 1) * Math.sin(p * Math.PI) * 0.38;
      } else {
        rakkoCapePivot.rotation.x = isMoving
          ? 0.28 + Math.abs(Math.sin(walkTime)) * 0.22
          : 0.1 + Math.sin(time * 2.5) * 0.04;
        rakkoCapePivot.rotation.z = isMoving ? Math.sin(walkTime) * 0.12 : 0;
      }
    }

    // ======================================================================
    // 5) 6인 캐릭터별 고유 3연격 3D 전신 & 무기 공격 모션 안무
    // ======================================================================
    if (attackTimer > 0) {
      if (charKey === 'chiikawa') {
        // [치이카와] 1타: 용기 내어 앞으로 콕 찌르기 / 2타: 다다닥 연속 2회 찌르기 / 3타: 폴짝 양손 내려찍기!
        if (comboStep === 1) {
          const thrust = Math.sin(p * Math.PI);
          standeeGroup.rotation.x = thrust * 0.18;
          standeeGroup.rotation.y = -thrust * 0.15;
          rightArmPivot.position.set(1.15 - thrust * 0.35, 1.72, 0.45 + thrust * 2.15);
          rightArmPivot.rotation.set(1.25, 0, -0.35);
          weaponMesh.rotation.set(Math.PI * 0.32, 0, -0.1);
          leftArmPivot.position.set(-1.35, 2.05 + thrust * 0.35, 0.55);
        } else if (comboStep === 2) {
          // 2타: 다다닥! 빠르게 두 번 콕콕 찌르기
          const doubleJab = Math.abs(Math.sin(p * Math.PI * 2));
          const sideAlt = Math.sin(p * Math.PI * 2) * 0.25;
          standeeGroup.rotation.x = 0.15;
          standeeGroup.rotation.z = sideAlt * 0.4;
          rightArmPivot.position.set(1.05 + sideAlt, 1.75 + doubleJab * 0.45, 0.45 + doubleJab * 2.25);
          rightArmPivot.rotation.set(1.18, sideAlt, -0.3);
          weaponMesh.rotation.set(Math.PI * 0.34, 0, 0);
          leftArmPivot.position.set(-1.35, 1.9 + Math.sin(p * Math.PI * 4) * 0.45, 0.5);
        } else {
          // 3타: 눈 질끈 감고 머리 위에서 전방으로 크게 내려찍기!
          const slam = p < 0.35 ? -(p / 0.35) * 0.9 : -0.9 + ((p - 0.35) / 0.65) * 2.6;
          standeeGroup.rotation.x = p < 0.35 ? -0.15 : 0.28;
          standeeGroup.rotation.y = 0;
          rightArmPivot.position.set(0.85, 2.2 - Math.max(0, slam) * 0.5, 0.65 + Math.max(0, slam) * 0.7);
          rightArmPivot.rotation.set(0.4 + Math.max(0, slam) * 1.1, 0, 0.5 - slam * 1.4);
          weaponMesh.rotation.set(Math.PI / 5, 0, -0.2);
          leftArmPivot.position.set(-0.95, 2.2 - Math.max(0, slam) * 0.4, 0.65);
        }
      } else if (charKey === 'hachiware') {
        // [하치와레] 1타: 와이드 수평 가로베기 / 2타: 대각선 어퍼 올려베기 / 3타: 360도 전신 토네이도 스핀!
        if (comboStep === 1) {
          standeeGroup.rotation.y = -0.35 + p * 0.7;
          rightArmPivot.position.set(1.4 - p * 0.8, 1.75, 0.65);
          rightArmPivot.rotation.set(0.35, 1.35 - p * 2.7, -1.35);
          weaponMesh.rotation.set(Math.PI / 6, 0, -0.2);
          leftArmPivot.position.set(-1.4, 1.85, 0.4);
        } else if (comboStep === 2) {
          standeeGroup.rotation.z = -0.18 + p * 0.36;
          standeeGroup.position.y = Math.sin(p * Math.PI) * 0.45;
          rightArmPivot.position.set(1.15 + Math.sin(p * Math.PI) * 0.4, 1.25 + p * 1.35, 0.6);
          rightArmPivot.rotation.set(0.65, -0.4 + p * 0.8, -2.0 + p * 3.2);
          weaponMesh.rotation.set(Math.PI / 7, 0, -0.22);
          leftArmPivot.position.set(-1.35, 2.15, 0.45);
        } else {
          // 3타: 전신 360도 회오리 스핀!
          standeeGroup.rotation.y = p * Math.PI * 2;
          rightArmPivot.position.set(1.75, 1.85, 0.45);
          rightArmPivot.rotation.set(0.2, 0, -1.48);
          weaponMesh.rotation.set(Math.PI / 6, 0, -0.15);
          leftArmPivot.position.set(-1.65, 1.95, 0.35);
        }
      } else if (charKey === 'usagi') {
        // [우사기] 1타: 초고속 프로펠러 봉 돌리기 / 2타: 360도 옆돌기 아크로바틱 / 3타: 점프 앞공중제비 폭약 스매시!
        if (comboStep === 1) {
          standeeGroup.rotation.x = 0.14;
          rightArmPivot.position.set(0.75, 1.95, 1.25);
          rightArmPivot.rotation.set(0.45, 0, 0);
          // 토벌봉을 프로펠러처럼 초고속 회전!
          weaponMesh.rotation.set(0.2, 0, p * Math.PI * 6);
          leftArmPivot.position.set(-1.4, 2.25 + Math.sin(p * Math.PI * 4) * 0.35, 0.5);
        } else if (comboStep === 2) {
          // 2타: 우사기 전신 360도 옆돌기(Cartwheel) 아크로바틱!
          standeeGroup.position.y = Math.sin(p * Math.PI) * 1.15;
          standeeGroup.rotation.z = -p * Math.PI * 2;
          rightArmPivot.position.set(1.65, 2.1, 0.5);
          rightArmPivot.rotation.set(0.3, 0, -1.2);
          weaponMesh.rotation.set(Math.PI / 6, 0, p * Math.PI * 2);
          leftArmPivot.position.set(-1.65, 2.1, 0.4);
        } else {
          // 3타: 우라야하!! 전신 360도 앞공중제비(Front Somersault) 대폭발 강타!
          standeeGroup.rotation.x = p * Math.PI * 2;
          rightArmPivot.position.set(1.1, 2.35, 0.75);
          rightArmPivot.rotation.set(1.1, 0, -0.8);
          weaponMesh.rotation.set(Math.PI / 4, 0, 0);
          leftArmPivot.position.set(-1.1, 2.35, 0.75);
        }
      } else if (charKey === 'momonga') {
        // [모몽가] 1타: 건방진 백핸드 휙 치기 / 2타: 방방 뛰며 양팔 떼쓰기 난타 / 3타: 샤랄라 720도 고속 피루엣!
        if (comboStep === 1) {
          standeeGroup.rotation.y = 0.35 - p * 0.75;
          standeeGroup.rotation.z = Math.sin(p * Math.PI) * 0.22;
          rightArmPivot.position.set(-0.2 + p * 2.1, 1.85, 0.65);
          rightArmPivot.rotation.set(0.4, -1.2 + p * 2.5, -1.1);
          weaponMesh.rotation.set(Math.PI / 7, 0, -0.22);
          leftArmPivot.position.set(-1.45, 2.1, 0.4);
        } else if (comboStep === 2) {
          // 2타: 제자리에서 방방 뛰며 양팔로 사스마타 마구 휘두르기!
          const hop = Math.abs(Math.sin(p * Math.PI * 2));
          const wave = Math.sin(p * Math.PI * 4);
          standeeGroup.position.y = hop * 0.82;
          standeeGroup.rotation.z = wave * 0.25;
          rightArmPivot.position.set(1.25 + wave * 0.45, 1.95 + hop * 0.3, 0.65);
          rightArmPivot.rotation.set(0.55, wave * 0.8, wave * 1.35);
          weaponMesh.rotation.set(Math.PI / 6, 0, wave * 0.4);
          leftArmPivot.position.set(-1.25 - wave * 0.35, 1.95 + (1 - hop) * 0.45, 0.6);
        } else {
          // 3타: 샤랄라~ 2회전(720도) 피루엣 트월링!
          standeeGroup.rotation.y = -p * Math.PI * 4;
          standeeGroup.rotation.z = Math.sin(p * Math.PI * 2) * 0.2;
          rightArmPivot.position.set(1.55, 2.35, 0.45);
          rightArmPivot.rotation.set(0.3, 0, -0.95);
          weaponMesh.rotation.set(Math.PI / 6, 0, p * Math.PI * 2);
          leftArmPivot.position.set(-1.55, 2.25, 0.45);
        }
      } else if (charKey === 'kurimanju') {
        // [쿠리만쥬] 1타: 묵직한 어깨 대각선 강타 / 2타: 호쾌한 배치기 & 수평 후리기 / 3타: 기합 모아치기 대지분쇄!
        if (comboStep === 1) {
          const heavyCurve = p < 0.28 ? -(p / 0.28) * 0.35 : Math.pow((p - 0.28) / 0.72, 1.4);
          standeeGroup.rotation.x = heavyCurve * 0.25;
          standeeGroup.rotation.z = -heavyCurve * 0.18;
          rightArmPivot.position.set(1.45 - Math.max(0, heavyCurve) * 0.55, 2.05 - Math.max(0, heavyCurve) * 0.45, 0.55);
          rightArmPivot.rotation.set(0.45 + Math.max(0, heavyCurve) * 0.95, 0, 1.15 - Math.max(-0.3, heavyCurve) * 2.8);
          weaponMesh.rotation.set(Math.PI / 7, 0, -0.22);
          leftArmPivot.position.set(-1.35, 1.85, 0.45);
        } else if (comboStep === 2) {
          // 2타: 배를 내밀며 묵직하게 밀고 들어가는 배치기 + 수평 스윙!
          const bump = Math.sin(p * Math.PI);
          standeeGroup.rotation.x = -bump * 0.22;
          standeeGroup.position.y = bump * 0.25;
          rightArmPivot.position.set(1.55 - p * 1.2, 1.65, 0.55 + bump * 0.5);
          rightArmPivot.rotation.set(0.35, 1.1 - p * 2.4, -1.4);
          weaponMesh.rotation.set(Math.PI / 6, 0, -0.2);
          leftArmPivot.position.set(-1.45, 1.95, 0.5 + bump * 0.4);
        } else {
          // 3타: 머리 뒤로 무기를 깊게 모았다가 대지를 가르는 건곤일척 강타!
          if (p < 0.38) {
            const charge = p / 0.38;
            standeeGroup.rotation.x = -charge * 0.26;
            standeeGroup.position.y = -charge * 0.22;
            rightArmPivot.position.set(0.95, 2.45 + charge * 0.55, 0.2 - charge * 0.3);
            rightArmPivot.rotation.set(-0.85 * charge, 0, 0.65);
            leftArmPivot.position.set(-0.95, 2.35 + charge * 0.5, 0.2);
          } else {
            const smash = Math.min(1, (p - 0.38) / 0.35);
            standeeGroup.rotation.x = -0.26 + smash * 0.58;
            standeeGroup.position.y = 0;
            rightArmPivot.position.set(0.95, 3.0 - smash * 1.65, 0.1 + smash * 1.15);
            rightArmPivot.rotation.set(-0.85 + smash * 2.35, 0, 0.65 - smash * 2.1);
            leftArmPivot.position.set(-1.15, 2.85 - smash * 1.1, 0.4 + smash * 0.5);
          }
          weaponMesh.rotation.set(Math.PI / 6, 0, -0.15);
        }
      } else if (charKey === 'rakko') {
        // [랏코 사부] 1타: 초고속 발도술(居合) 수평일섬 / 2타: 역수 X자 2연참 / 3타: 공중 스핀 십자(十) 일섬!
        if (comboStep === 1) {
          // 1타: 왼쪽 허리춤에서 전광석화처럼 뽑아 베는 발도 일섬!
          const snap = Math.pow(p, 0.42);
          standeeGroup.rotation.x = 0.22;
          standeeGroup.rotation.y = 0.45 - snap * 0.95;
          rightArmPivot.position.set(-0.65 + snap * 2.45, 1.58, 0.68);
          rightArmPivot.rotation.set(0.25, 1.65 - snap * 3.1, -1.42);
          weaponMesh.rotation.set(Math.PI / 5, 0, -0.15);
          leftArmPivot.position.set(-1.25, 1.65, 0.55);
        } else if (comboStep === 2) {
          // 2타: 한 번의 공격에 우상단 베기 + 좌하단 역수 베기가 연속으로 터지는 초고속 X자 2연참!
          if (p < 0.5) {
            const s1 = p * 2;
            standeeGroup.rotation.z = -0.15 + s1 * 0.3;
            rightArmPivot.position.set(-0.3 + s1 * 1.9, 1.35 + s1 * 1.1, 0.65);
            rightArmPivot.rotation.set(0.55, 0.9 - s1 * 1.8, -1.9 + s1 * 2.9);
          } else {
            const s2 = (p - 0.5) * 2;
            standeeGroup.rotation.z = 0.15 - s2 * 0.3;
            rightArmPivot.position.set(1.6 - s2 * 1.9, 2.45 - s2 * 1.1, 0.72);
            rightArmPivot.rotation.set(0.65, -0.9 + s2 * 1.8, 1.0 - s2 * 2.8);
          }
          weaponMesh.rotation.set(Math.PI / 6, 0, -0.2);
          leftArmPivot.position.set(-1.35, 2.0, 0.45);
        } else {
          // 3타: 질풍 공중 회전 후 십자(十) 베기 피니시!
          const spinPhase = Math.min(1, p / 0.65);
          standeeGroup.rotation.y = spinPhase * Math.PI * 2;
          standeeGroup.rotation.x = 0.24;
          rightArmPivot.position.set(1.55 - Math.max(0, p - 0.65) * 1.2, 2.15, 0.75);
          rightArmPivot.rotation.set(0.85, 0, 0.9 - p * 2.6);
          weaponMesh.rotation.set(Math.PI / 5, 0, -0.2);
          leftArmPivot.position.set(-1.45, 2.1, 0.5);
        }
      }
    } else {
      // 비공격 시 기본 자세 및 달리기 팔 스윙 복귀
      standeeGroup.rotation.x = 0;
      standeeGroup.rotation.y = 0;
      standeeGroup.position.y = 0;
      rightArmPivot.rotation.y = 0;
      rightArmPivot.position.set(1.45, 1.85, 0.42);
      weaponMesh.rotation.set(Math.PI / 7, 0, -0.22);

      if (isMoving) {
        const armSwing = Math.sin(walkTime) * 0.45;
        rightArmPivot.rotation.z = -0.22 + armSwing * 0.5;
        rightArmPivot.rotation.x = armSwing * 0.4;
        leftArmPivot.position.set(
          -1.35,
          1.75 + Math.sin(walkTime + Math.PI) * 0.25,
          0.32 + Math.cos(walkTime + Math.PI) * 0.25
        );
      } else {
        rightArmPivot.rotation.z = -0.22 + Math.sin(time * 3) * 0.06;
        rightArmPivot.rotation.x = 0;
        leftArmPivot.position.set(-1.35, 1.75 + Math.sin(time * 3) * 0.06, 0.32);
      }
    }
  };

  root.userData.triggerJellyBounce = (strength = 0.32) => {
    root.userData.jellySpring = strength;
  };

  root.userData.setExpression = expr => {
    if (expr === 'attack') {
      root.userData.triggerJellyBounce(0.28);
    } else if (expr === 'happy') {
      root.userData.triggerJellyBounce(0.38);
    }
  };

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
// 8. 몬스터 일러스트 기반 3D 입체 스켈레탈 변형 모델 빌더 (createMonster3D)
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
  let bodyRadius = 1.45;
  let isArmored = false;
  if (type === 'bug') {
    sizeW = 4.0;
    sizeH = 4.0;
    bodyRadius = 1.15;
  } else if (type === 'goblin') {
    sizeW = 4.8;
    sizeH = 4.8;
    bodyRadius = 1.3;
  } else if (type === 'iron_chimera' || type === 'midboss') {
    sizeW = 6.2;
    sizeH = 6.2;
    bodyRadius = 1.75;
    isArmored = true;
  } else if (type === 'anoko') {
    sizeW = 8.6;
    sizeH = 8.6;
    bodyRadius = 2.4;
  }

  // 바닥 피격 반경(Hurtbox Radius) 링 & 전방 시선 화살표(백어택 각도 확인용)
  const hurtRingGroup = new THREE.Group();
  const shadowGeo = new THREE.CircleGeometry(bodyRadius, 28);
  shadowGeo.rotateX(-Math.PI / 2);
  const shadowMat = new THREE.MeshBasicMaterial({
    color: type === 'anoko' ? 0x991b1b : 0x0f172a,
    transparent: true,
    opacity: type === 'anoko' ? 0.42 : 0.26,
    depthWrite: false
  });
  const shadow = new THREE.Mesh(shadowGeo, shadowMat);
  shadow.position.y = 0.05;
  hurtRingGroup.add(shadow);

  // 피격 테두리 링 (정면: 붉은색, 후방 백어택 존: 보라/하늘색)
  const frontArcGeo = new THREE.RingGeometry(bodyRadius - 0.1, bodyRadius + 0.06, 24, 1, -Math.PI * 0.6, Math.PI * 1.2);
  frontArcGeo.rotateX(-Math.PI / 2);
  const frontArc = new THREE.Mesh(
    frontArcGeo,
    new THREE.MeshBasicMaterial({ color: 0xef4444, side: THREE.DoubleSide, transparent: true, opacity: 0.55 })
  );
  frontArc.position.y = 0.07;
  hurtRingGroup.add(frontArc);

  const backArcGeo = new THREE.RingGeometry(bodyRadius - 0.12, bodyRadius + 0.08, 20, 1, Math.PI * 0.6, Math.PI * 0.8);
  backArcGeo.rotateX(-Math.PI / 2);
  const backArc = new THREE.Mesh(
    backArcGeo,
    new THREE.MeshBasicMaterial({ color: 0x38bdf8, side: THREE.DoubleSide, transparent: true, opacity: 0.65 })
  );
  backArc.position.y = 0.07;
  hurtRingGroup.add(backArc);

  group.add(hurtRingGroup);

  // 몬스터 10x12 서브디비전 메쉬 (부위별 피격 흔들림 지원!)
  const bodyWrap = new THREE.Group();
  const sharedGeo = new THREE.PlaneGeometry(sizeW, sizeH, 10, 12);
  sharedGeo.translate(0, sizeH * 0.48, 0);
  const posAttr = sharedGeo.attributes.position;
  const baseCoords = new Float32Array(posAttr.array.length);
  baseCoords.set(posAttr.array);

  const layers = 6;
  const thickness = type === 'anoko' ? 0.52 : 0.34;
  const mats = [];

  for (let i = 0; i < layers; i++) {
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      transparent: true,
      alphaTest: 0.15,
      side: THREE.DoubleSide
    });
    mats.push(mat);
    const mesh = new THREE.Mesh(sharedGeo, mat);
    mesh.position.z = ((i / (layers - 1)) - 0.5) * thickness;
    mesh.castShadow = i === Math.floor(layers / 2);
    bodyWrap.add(mesh);
  }

  // 🎯 머리/뿔 약점 부위(Weak Point) 3D 조준 링 마커
  const wpRingGeo = new THREE.RingGeometry(0.38, 0.54, 20);
  const wpRingMat = new THREE.MeshBasicMaterial({
    color: 0xfacc15,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85,
    depthTest: false
  });
  const weakPointMarker = new THREE.Mesh(wpRingGeo, wpRingMat);
  weakPointMarker.position.set(0, sizeH * 0.76, thickness * 0.65);
  weakPointMarker.visible = false;
  bodyWrap.add(weakPointMarker);

  group.add(bodyWrap);

  // 3D 부위별 피격 판정 데이터 (머리 약점 / 몸통 장갑 / 다리 하단)
  group.userData.bodyWrap = bodyWrap;
  group.userData.hurtRingGroup = hurtRingGroup;
  group.userData.weakPointMarker = weakPointMarker;
  group.userData.mats = mats;
  group.userData.bodyRadius = bodyRadius;
  group.userData.sizeH = sizeH;
  group.userData.isArmored = isArmored;
  group.userData.hitWobble = 0;
  group.userData.lastHitPart = 'body'; // 'head' | 'body' | 'legs' | 'back'

  group.userData.hurtParts = {
    head: { yMin: sizeH * 0.60, yMax: sizeH * 0.98, hitY: sizeH * 0.78, mult: 1.5, label: '🎯머리 약점' },
    body: { yMin: sizeH * 0.28, yMax: sizeH * 0.60, hitY: sizeH * 0.46, mult: isArmored ? 0.8 : 1.0, label: isArmored ? '🛡️장갑 몸통' : '💥몸통' },
    legs: { yMin: 0.0, yMax: sizeH * 0.28, hitY: sizeH * 0.18, mult: 1.05, label: '🦵다리(둔화)' }
  };

  group.userData.updateMonsterMotion = (time, isChasing, phaseOffset, facingYaw = 0) => {
    // 바닥 시선/백어택 링은 몬스터의 실제 바라보는 방향(facingYaw)으로 회전!
    hurtRingGroup.rotation.y = facingYaw - group.rotation.y;

    const arr = posAttr.array;
    const count = posAttr.count;
    if (group.userData.hitWobble > 0.001) {
      group.userData.hitWobble *= 0.84;
    } else {
      group.userData.hitWobble = 0;
    }

    const t = time * (isChasing ? 9.5 : 3.5) + phaseOffset;
    const wobble = Math.sin(time * 38) * group.userData.hitWobble;
    const hitPart = group.userData.lastHitPart;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      const bx = baseCoords[idx];
      const by = baseCoords[idx + 1];
      const bz = baseCoords[idx + 2];
      const v = Math.max(0, Math.min(1, by / sizeH));

      // 피격된 부위(머리 vs 몸통 vs 다리)에 집중적으로 찌그러짐/젖혀짐 반응 적용!
      let partMask = 1.0;
      if (hitPart === 'head') {
        partMask = Math.max(0.1, (v - 0.4) * 2.2); // 머리와 뿔이 크게 뒤로 젖혀짐
      } else if (hitPart === 'legs') {
        partMask = Math.max(0.1, (0.5 - v) * 2.4); // 다리가 휘청거림
      } else {
        partMask = Math.sin(v * Math.PI) * 1.4; // 몸통 복부가 움찔함
      }

      let dx = wobble * 0.85 * partMask;
      let dy = 0;

      if (type === 'bug') {
        dy += Math.sin(time * 16 + Math.abs(bx) * 1.5) * 0.18 * v;
      } else if (isChasing) {
        if (v < 0.3) {
          const side = bx >= 0 ? 1 : -1;
          dy += Math.max(0, Math.sin(t + (side > 0 ? 0 : Math.PI))) * 0.35 * (1 - v / 0.3);
        } else {
          dx += Math.sin(t) * 0.22 * v;
        }
      } else {
        const b = Math.sin(t) * 0.04;
        dx += bx * b;
        dy += by * b;
      }

      arr[idx] = bx + dx;
      arr[idx + 1] = by + dy;
      arr[idx + 2] = bz;
    }
    posAttr.needsUpdate = true;

    if (weakPointMarker.visible) {
      weakPointMarker.rotation.z = time * 3.5;
      const s = 1.0 + Math.sin(time * 8) * 0.15;
      weakPointMarker.scale.set(s, s, 1);
    }
  };

  group.userData.flashHit = (partName = 'body') => {
    group.userData.lastHitPart = partName;
    group.userData.hitWobble = partName === 'head' ? 0.65 : 0.45;
    const flashColor = partName === 'head' ? 0xfef08a : partName === 'back' ? 0x38bdf8 : 0xff4d6d;
    mats.forEach(m => m.color.setHex(flashColor));
    setTimeout(() => {
      mats.forEach(m => m.color.setHex(0xffffff));
    }, 130);
  };

  return group;
}

// ==========================================================================
// 9. 3D 초원 잡초 & 황금 클로버 패치
// ==========================================================================
function createWeedPatch3D(isGolden = false) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const color = isGolden ? 0xfacc15 : 0x22c55e;
  const mat = new THREE.MeshToonMaterial({
    color,
    gradientMap,
    emissive: isGolden ? 0xca8a04 : 0x000000,
    emissiveIntensity: isGolden ? 0.45 : 0
  });

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
// 10. 고품질 3D 월드 랜드마크
// ==========================================================================
function createPlazaFountain3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const stoneMat = new THREE.MeshToonMaterial({ color: 0xf8fafc, gradientMap });
  const waterMat = new THREE.MeshToonMaterial({
    color: 0x38bdf8,
    gradientMap,
    emissive: 0x0284c7,
    emissiveIntensity: 0.2
  });
  const goldMat = new THREE.MeshToonMaterial({
    color: 0xfacc15,
    gradientMap,
    emissive: 0xca8a04,
    emissiveIntensity: 0.3
  });

  const poolWall = new THREE.Mesh(new THREE.CylinderGeometry(3.8, 4.1, 0.9, 28), stoneMat);
  poolWall.position.y = 0.45;
  poolWall.castShadow = true;
  poolWall.receiveShadow = true;
  addCartoonOutline(poolWall, 0.03);
  group.add(poolWall);

  const waterSurface = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.5, 0.82, 28), waterMat);
  waterSurface.position.y = 0.5;
  group.add(waterSurface);

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

  const topStar = new THREE.Mesh(new THREE.OctahedronGeometry(0.65, 0), goldMat);
  topStar.position.y = 3.55;
  addCartoonOutline(topStar, 0.05);
  group.add(topStar);
  group.userData.topStar = topStar;

  return group;
}

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

  const chimneyMat = new THREE.MeshToonMaterial({ color: 0xe11d48, gradientMap });
  const chimney = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.75, 2.8, 14), chimneyMat);
  chimney.position.set(2.8, 4.5, -1.5);
  chimney.castShadow = true;
  addCartoonOutline(chimney, 0.04);
  house.add(chimney);

  const door = new THREE.Mesh(new THREE.BoxGeometry(2.1, 3.0, 0.6), doorMat);
  door.position.set(0, 1.5, 5.25);
  addCartoonOutline(door, 0.04);
  house.add(door);

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

  const lanternMat = new THREE.MeshBasicMaterial({ color: 0xff4d6d });
  [-3.2, 3.2].forEach(lx => {
    const lantern = new THREE.Mesh(new THREE.SphereGeometry(0.58, 14, 14), lanternMat);
    lantern.scale.y = 1.35;
    lantern.position.set(lx, 4.6, 2.3);
    addCartoonOutline(lantern, 0.05);
    stall.add(lantern);
  });

  const warmLight = new THREE.PointLight(0xffb703, 1.2, 22);
  warmLight.position.set(0, 4.5, 3.5);
  stall.add(warmLight);

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

function createRiverAndBridge3D(waterTex) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  // 확장된 맵(반경 250m) 전체를 가로지르는 480m 시냇물
  const waterGeo = new THREE.BoxGeometry(480, 0.25, 7.5);
  const waterMat = new THREE.MeshBasicMaterial({
    map: waterTex || createWaterCanvasTexture()
  });
  const river = new THREE.Mesh(waterGeo, waterMat);
  river.position.set(0, 0.03, 28);
  group.add(river);

  const bankMat = new THREE.MeshToonMaterial({ color: 0xd6c7b2, gradientMap });
  [-4.1, 4.1].forEach(bz => {
    const bank = new THREE.Mesh(new THREE.BoxGeometry(480, 0.16, 1.4), bankMat);
    bank.position.set(0, 0.02, 28 + bz);
    group.add(bank);
  });

  // 서쪽(-75), 중앙(0), 동쪽(75) 3개의 아치형 목조 다리 배치
  const woodMat = new THREE.MeshToonMaterial({ color: 0xb45309, gradientMap });
  const redPostMat = new THREE.MeshToonMaterial({ color: 0xe11d48, gradientMap });

  [-75, 0, 75].forEach(bx => {
    const bridgeGroup = new THREE.Group();
    for (let i = -4; i <= 4; i++) {
      const plank = new THREE.Mesh(new THREE.BoxGeometry(7.2, 0.28, 0.9), woodMat);
      const archY = Math.cos((i / 4.5) * (Math.PI / 2)) * 0.85;
      plank.position.set(bx, 0.2 + archY, 28 + i * 0.98);
      plank.castShadow = true;
      plank.receiveShadow = true;
      addCartoonOutline(plank, 0.03);
      bridgeGroup.add(plank);
    }

    [-3.3, 3.3].forEach(rx => {
      for (let j = -1; j <= 1; j++) {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 2.2, 10), redPostMat);
        post.position.set(bx + rx, 1.3, 28 + j * 3.8);
        addCartoonOutline(post, 0.05);
        bridgeGroup.add(post);
      }
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.2, 8.8), redPostMat);
      rail.position.set(bx + rx, 2.1, 28);
      addCartoonOutline(rail, 0.04);
      bridgeGroup.add(rail);
    });

    group.add(bridgeGroup);
  });

  return group;
}

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

// ==========================================================================
// 11. 확장 맵 전용 신규 3D 랜드마크 & 오브젝트 빌더
//     (벚꽃 노천온천 호수 / 별빛 캠핑장 / 고대 보스 유적지 / 보물상자 / 타격 이펙트)
// ==========================================================================

// 🌸 북서쪽: 벚꽃 노천온천 & 피크닉 치유 호수
function createSakuraOnsenLake3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const rockMat = new THREE.MeshToonMaterial({ color: 0x94a3b8, gradientMap });
  const waterMat = new THREE.MeshToonMaterial({
    color: 0x38bdf8,
    gradientMap,
    emissive: 0x0284c7,
    emissiveIntensity: 0.18
  });
  const woodMat = new THREE.MeshToonMaterial({ color: 0x92400e, gradientMap });
  const roofMat = new THREE.MeshToonMaterial({ color: 0xf472b6, gradientMap });

  // 에메랄드 온천 수면
  const pool = new THREE.Mesh(new THREE.CylinderGeometry(12.5, 13.0, 0.35, 36), waterMat);
  pool.position.y = 0.12;
  group.add(pool);

  // 온천 테두리 자연석 바위들
  for (let i = 0; i < 24; i++) {
    const ang = (i / 24) * Math.PI * 2;
    const rad = 12.4 + (i % 2) * 0.6;
    const rock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(1.3 + (i % 3) * 0.45, 1),
      rockMat
    );
    rock.position.set(Math.cos(ang) * rad, 0.6, Math.sin(ang) * rad);
    rock.scale.y = 0.68;
    rock.castShadow = true;
    addCartoonOutline(rock, 0.035);
    group.add(rock);
  }

  // 온천 정자(가제보) 쉼터
  const gazebo = new THREE.Group();
  gazebo.position.set(0, 0, -9.5);
  const deck = new THREE.Mesh(new THREE.BoxGeometry(7.5, 0.5, 5.2), woodMat);
  deck.position.y = 0.35;
  addCartoonOutline(deck, 0.03);
  gazebo.add(deck);

  [-3.1, 3.1].forEach(px => {
    [-2.0, 2.0].forEach(pz => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 4.2, 10), woodMat);
      p.position.set(px, 2.4, pz);
      gazebo.add(p);
    });
  });

  const gRoof = new THREE.Mesh(new THREE.ConeGeometry(5.8, 2.4, 4), roofMat);
  gRoof.position.y = 5.4;
  gRoof.rotation.y = Math.PI / 4;
  addCartoonOutline(gRoof, 0.035);
  gazebo.add(gRoof);
  group.add(gazebo);

  // 피크닉 돗자리 & 도시락 바구니
  const matMesh = new THREE.Mesh(
    new THREE.BoxGeometry(5.5, 0.08, 4.2),
    new THREE.MeshToonMaterial({ color: 0xfda4af, gradientMap })
  );
  matMesh.position.set(9.5, 0.06, 8.5);
  group.add(matMesh);

  return group;
}

// ⛺ 남서쪽: 별빛 캠핑장 & 군고구마 모닥불 언덕
function createStarlightCampsite3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const woodMat = new THREE.MeshToonMaterial({ color: 0x78350f, gradientMap });
  const tentMat1 = new THREE.MeshToonMaterial({ color: 0xfbbf24, gradientMap });
  const tentMat2 = new THREE.MeshToonMaterial({ color: 0x38bdf8, gradientMap });
  const fireMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
  const innerFireMat = new THREE.MeshBasicMaterial({ color: 0xfef08a });

  // 텐트 2동
  [
    { x: -7.5, z: -5.5, rot: 0.45, mat: tentMat1 },
    { x: 7.8, z: -4.8, rot: -0.5, mat: tentMat2 }
  ].forEach(t => {
    const tent = new THREE.Group();
    const prism = new THREE.Mesh(new THREE.ConeGeometry(4.2, 4.6, 4), t.mat);
    prism.position.y = 2.3;
    prism.rotation.y = Math.PI / 4;
    prism.castShadow = true;
    addCartoonOutline(prism, 0.035);
    tent.add(prism);
    tent.position.set(t.x, 0, t.z);
    tent.rotation.y = t.rot;
    group.add(tent);
  });

  // 중앙 모닥불 & 통나무 의자
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2;
    const stone = new THREE.Mesh(
      new THREE.DodecahedronGeometry(0.45, 0),
      new THREE.MeshToonMaterial({ color: 0x64748b, gradientMap })
    );
    stone.position.set(Math.cos(ang) * 1.4, 0.25, Math.sin(ang) * 1.4);
    group.add(stone);
  }

  const flameOuter = new THREE.Mesh(new THREE.ConeGeometry(1.1, 2.5, 8), fireMat);
  flameOuter.position.y = 1.25;
  group.add(flameOuter);

  const flameInner = new THREE.Mesh(new THREE.ConeGeometry(0.65, 1.7, 8), innerFireMat);
  flameInner.position.y = 1.0;
  group.add(flameInner);
  group.userData.flameOuter = flameOuter;

  // 통나무 벤치 3개
  [0, 2.1, 4.2].forEach(ang => {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.52, 0.52, 4.4, 12), woodMat);
    log.rotation.z = Math.PI / 2;
    log.rotation.y = ang + Math.PI / 2;
    log.position.set(Math.cos(ang) * 4.5, 0.5, Math.sin(ang) * 4.5);
    log.castShadow = true;
    addCartoonOutline(log, 0.04);
    group.add(log);
  });

  return group;
}

// 🏛️ 동쪽 심연: 고대 보스 신전 유적지
function createAncientRuins3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const stoneMat = new THREE.MeshToonMaterial({ color: 0x94a3b8, gradientMap });
  const darkStoneMat = new THREE.MeshToonMaterial({ color: 0x475569, gradientMap });
  const runeMat = new THREE.MeshBasicMaterial({ color: 0xc084fc });

  // 원형 고대 제단 바닥
  const altar = new THREE.Mesh(new THREE.CylinderGeometry(15, 16.5, 0.6, 32), darkStoneMat);
  altar.position.y = 0.3;
  altar.receiveShadow = true;
  addCartoonOutline(altar, 0.025);
  group.add(altar);

  const runeRing = new THREE.Mesh(new THREE.RingGeometry(11.2, 12.0, 32), runeMat);
  runeRing.rotation.x = -Math.PI / 2;
  runeRing.position.y = 0.64;
  group.add(runeRing);

  // 8개의 고대 석조 기둥
  for (let i = 0; i < 8; i++) {
    const ang = (i / 8) * Math.PI * 2;
    const h = i % 2 === 0 ? 8.2 : 5.4;
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.95, 1.15, h, 12), stoneMat);
    pillar.position.set(Math.cos(ang) * 13.5, h * 0.5 + 0.5, Math.sin(ang) * 13.5);
    pillar.castShadow = true;
    addCartoonOutline(pillar, 0.035);
    group.add(pillar);

    if (i % 2 === 0) {
      const orb = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 0), runeMat);
      orb.position.set(Math.cos(ang) * 13.5, h + 1.4, Math.sin(ang) * 13.5);
      group.add(orb);
    }
  }

  return group;
}

// 🎁 필드 보물상자 & 별사탕 크리스탈 광석
function createTreasureChest3D(isCrystal = false) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  if (isCrystal) {
    const crysMat = new THREE.MeshToonMaterial({
      color: 0x38bdf8,
      gradientMap,
      emissive: 0x0284c7,
      emissiveIntensity: 0.25
    });
    const subMat = new THREE.MeshToonMaterial({
      color: 0xf472b6,
      gradientMap,
      emissive: 0xdb2777,
      emissiveIntensity: 0.22
    });

    const mainCrys = new THREE.Mesh(new THREE.OctahedronGeometry(1.15, 0), crysMat);
    mainCrys.scale.set(0.85, 1.65, 0.85);
    mainCrys.position.y = 1.5;
    addCartoonOutline(mainCrys, 0.045);
    group.add(mainCrys);

    [-0.75, 0.75].forEach((ox, idx) => {
      const sub = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 0), idx === 0 ? subMat : crysMat);
      sub.scale.set(0.8, 1.4, 0.8);
      sub.position.set(ox, 1.0, (idx === 0 ? 1 : -1) * 0.35);
      sub.rotation.z = ox * -0.45;
      addCartoonOutline(sub, 0.05);
      group.add(sub);
    });
  } else {
    const boxMat = new THREE.MeshToonMaterial({ color: 0xb45309, gradientMap });
    const goldMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });

    const base = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.3, 1.5), boxMat);
    base.position.y = 0.65;
    base.castShadow = true;
    addCartoonOutline(base, 0.045);
    group.add(base);

    const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 2.1, 14, 1, false, 0, Math.PI), boxMat);
    lid.rotation.z = Math.PI / 2;
    lid.position.y = 1.3;
    addCartoonOutline(lid, 0.045);
    group.add(lid);

    const lock = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.55, 1.62), goldMat);
    lock.position.y = 1.15;
    addCartoonOutline(lock, 0.05);
    group.add(lock);
  }

  return group;
}

// 🍄 토벌의 숲 장식용 대형 버섯
function createForestMushroom3D(capColor = 0xa855f7) {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();
  const stemMat = new THREE.MeshToonMaterial({ color: 0xfef3c7, gradientMap });
  const capMat = new THREE.MeshToonMaterial({ color: capColor, gradientMap });
  const spotMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.58, 1.8, 12), stemMat);
  stem.position.y = 0.9;
  stem.castShadow = true;
  addCartoonOutline(stem, 0.045);
  group.add(stem);

  const cap = new THREE.Mesh(
    new THREE.SphereGeometry(1.35, 18, 14, 0, Math.PI * 2, 0, Math.PI * 0.58),
    capMat
  );
  cap.position.y = 1.55;
  cap.castShadow = true;
  addCartoonOutline(cap, 0.045);
  group.add(cap);

  for (let i = 0; i < 5; i++) {
    const ang = (i / 5) * Math.PI * 2;
    const spot = new THREE.Mesh(new THREE.SphereGeometry(0.22, 8, 8), spotMat);
    spot.position.set(Math.cos(ang) * 0.85, 2.15, Math.sin(ang) * 0.85);
    group.add(spot);
  }

  return group;
}

// 💥 3D 입체 타격 임팩트 이펙트 메쉬 빌더 (십자 스타버스트 + X자 참격 + 코어 플래시)
function createHitImpactBurst3D(colorHex = 0xfacc15, isCrit = false) {
  const group = new THREE.Group();

  const coreMat = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.95,
    depthWrite: false
  });
  const outerMat = new THREE.MeshBasicMaterial({
    color: colorHex,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.92,
    depthWrite: false
  });

  // 1) 중심부 8각 코어 플래시
  const core = new THREE.Mesh(new THREE.OctahedronGeometry(isCrit ? 0.85 : 0.58, 0), coreMat);
  group.add(core);

  // 2) 방사형 4방향/6방향 뾰족한 스타버스트 광선(Spike Cross)
  const rayCount = isCrit ? 6 : 4;
  for (let i = 0; i < rayCount; i++) {
    const ang = (i / rayCount) * Math.PI;
    const len = isCrit ? 3.8 : 2.6;
    const spikeGeo = new THREE.ConeGeometry(isCrit ? 0.36 : 0.26, len, 4);
    const spike1 = new THREE.Mesh(spikeGeo, i % 2 === 0 ? outerMat : coreMat);
    spike1.rotation.z = ang;
    group.add(spike1);

    const spike2 = new THREE.Mesh(spikeGeo, i % 2 === 0 ? outerMat : coreMat);
    spike2.rotation.z = ang + Math.PI;
    group.add(spike2);
  }

  // 3) 외곽 타격 링
  const ringGeo = new THREE.RingGeometry(isCrit ? 0.9 : 0.6, isCrit ? 1.45 : 1.05, 24);
  const ringMesh = new THREE.Mesh(ringGeo, outerMat);
  group.add(ringMesh);

  group.userData.mats = [coreMat, outerMat];
  return group;
}

// ⛩️ 평화로운 메인 광장 -> 전투 스테이지(1~20단계) & 스페셜 던전 출격 포털 게이트
function createSubjugationPortalGate3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const stoneMat = new THREE.MeshToonMaterial({ color: 0xe2e8f0, gradientMap });
  const redMat = new THREE.MeshToonMaterial({ color: 0xe11d48, gradientMap });
  const goldMat = new THREE.MeshToonMaterial({ color: 0xfacc15, gradientMap });

  // 원형 석조 제단 베이스
  const base = new THREE.Mesh(new THREE.CylinderGeometry(6.8, 7.6, 0.7, 32), stoneMat);
  base.position.y = 0.35;
  base.receiveShadow = true;
  addCartoonOutline(base, 0.02);
  group.add(base);

  const innerStep = new THREE.Mesh(new THREE.CylinderGeometry(5.2, 5.8, 0.45, 28), stoneMat);
  innerStep.position.y = 0.85;
  addCartoonOutline(innerStep, 0.025);
  group.add(innerStep);

  // 좌우 대형 도리이/포털 기둥
  [-4.2, 4.2].forEach(px => {
    const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.72, 8.8, 16), redMat);
    pillar.position.set(px, 4.8, 0);
    pillar.castShadow = true;
    addCartoonOutline(pillar, 0.035);
    group.add(pillar);

    const goldRing = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 0.76, 0.55, 16), goldMat);
    goldRing.position.set(px, 1.5, 0);
    group.add(goldRing);
  });

  // 상단 2단 지붕 크로스빔
  const topBeam = new THREE.Mesh(new THREE.BoxGeometry(11.6, 0.85, 1.25), redMat);
  topBeam.position.set(0, 9.1, 0);
  topBeam.castShadow = true;
  addCartoonOutline(topBeam, 0.03);
  group.add(topBeam);

  const subBeam = new THREE.Mesh(new THREE.BoxGeometry(9.6, 0.55, 0.9), goldMat);
  subBeam.position.set(0, 7.5, 0);
  addCartoonOutline(subBeam, 0.03);
  group.add(subBeam);

  // 중앙 회전 차원 포털 링
  const portalPivot = new THREE.Group();
  portalPivot.position.set(0, 4.3, 0);

  const outerRingMat = new THREE.MeshBasicMaterial({
    color: 0xfacc15,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.88
  });
  const outerRing = new THREE.Mesh(new THREE.TorusGeometry(3.0, 0.22, 14, 36), outerRingMat);
  portalPivot.add(outerRing);

  const vortexMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.42
  });
  const vortexDisc = new THREE.Mesh(new THREE.CircleGeometry(2.85, 32), vortexMat);
  portalPivot.add(vortexDisc);

  group.add(portalPivot);
  group.userData.portalPivot = portalPivot;

  return group;
}

// 🏟️ 전투 스테이지(1~20단계) & 성장 던전 전용 3D 콜로세움 배틀 아레나 (광장과 완전 분리!)
function createBattleColosseumArena3D() {
  const group = new THREE.Group();
  const gradientMap = getToonGradientMap();

  const floorMat = new THREE.MeshToonMaterial({ color: 0x334155, gradientMap });
  const trimMat = new THREE.MeshToonMaterial({ color: 0x475569, gradientMap });
  const pillarMat = new THREE.MeshToonMaterial({ color: 0x94a3b8, gradientMap });
  const goldMat = new THREE.MeshBasicMaterial({
    color: 0xfacc15,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.65
  });
  const barrierMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.16,
    depthWrite: false
  });

  // 1) 원형 석조 결투장 바닥 (반경 42m)
  const arenaFloor = new THREE.Mesh(new THREE.CylinderGeometry(42, 44, 0.6, 48), floorMat);
  arenaFloor.position.y = -0.25;
  arenaFloor.receiveShadow = true;
  group.add(arenaFloor);

  // 외곽 석조 테두리 링
  const rimRing = new THREE.Mesh(new THREE.TorusGeometry(41.5, 1.2, 12, 48), trimMat);
  rimRing.rotation.x = Math.PI / 2;
  rimRing.position.y = 0.2;
  group.add(rimRing);

  // 바닥 황금 마법진 링
  const runeRing1 = new THREE.Mesh(new THREE.RingGeometry(14.5, 15.2, 40), goldMat);
  runeRing1.rotation.x = -Math.PI / 2;
  runeRing1.position.y = 0.08;
  group.add(runeRing1);

  const runeRing2 = new THREE.Mesh(new THREE.RingGeometry(28.5, 29.3, 48), goldMat);
  runeRing2.rotation.x = -Math.PI / 2;
  runeRing2.position.y = 0.08;
  group.add(runeRing2);

  // 결계 빛기둥 벽
  const barrierWall = new THREE.Mesh(new THREE.CylinderGeometry(40.5, 40.5, 6.5, 48, 1, true), barrierMat);
  barrierWall.position.y = 3.25;
  group.add(barrierWall);

  // 2) 결투장 둘레 12개의 고대 석조 기둥 & 횃불
  const flameMat = new THREE.MeshBasicMaterial({ color: 0xf97316 });
  for (let i = 0; i < 12; i++) {
    const ang = (i / 12) * Math.PI * 2;
    const px = Math.cos(ang) * 40.8;
    const pz = Math.sin(ang) * 40.8;

    const col = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.35, 9.5, 12), pillarMat);
    col.position.set(px, 4.75, pz);
    col.castShadow = true;
    addCartoonOutline(col, 0.03);
    group.add(col);

    const brazier = new THREE.Mesh(new THREE.SphereGeometry(0.85, 10, 10), flameMat);
    brazier.position.set(px, 10.1, pz);
    group.add(brazier);
  }

  return group;
}


