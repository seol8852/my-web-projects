// ==========================================================================
// 치이카와 3D 오픈월드 타운: 제초 & 토벌 빌리지 - 메인 3D 엔진 (main.js)
// ==========================================================================

class Chiikawa3DWorldApp {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.clock = new THREE.Clock();

    // 플레이어 상태
    this.activeCharKey = 'chiikawa';
    this.playerMesh = null;
    this.playerPos = new THREE.Vector3(0, 0, 12);
    this.playerVelY = 0;
    this.playerYaw = 0;
    this.isGrounded = true;
    this.walkTime = 0;
    this.attackTimer = 0;
    this.skillCooldown = 0;

    // 스탯 및 진행도
    this.stats = {
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 100,
      maxHp: 100,
      coins: 150,
      certLevel: 0, // 0: 5급 준비생, 1: 제초 5급, 2: 제초 3급, 3: 제초 1급 마스터
      ramenBuffTimer: 0,
      weedsPulled: 0,
      ramenServed: 0,
      monstersDefeated: 0,
      puddingClimbed: 0
    };

    // 카메라 궤도 각도
    this.camYaw = 0;
    this.camPitch = 0.42;
    this.camDist = 22;
    this.isDraggingCam = false;
    this.prevMouse = { x: 0, y: 0 };

    // 입력 상태
    this.keys = {};
    this.joyVec = { x: 0, y: 0 };

    // 월드 엔티티 목록
    this.npcs = [];
    this.weeds = [];
    this.monsters = [];
    this.particles = [];
    this.shockwaves = [];
    this.clouds = [];
    this.zoneSigns = [];
    this.partyMode = true; // 동료들이 귀여운 대열로 따라다님
    this.timeOfDay = 'day'; // 'day' | 'sunset' | 'night'

    this.nearestInteractable = null;

    this.init();
  }

  init() {
    this.loadSavedData();
    this.initThreeScene();
    this.buildEnvironment();
    this.spawnPlayer(this.activeCharKey);
    this.spawnCompanionNpcs();
    this.spawnWeeds();
    this.spawnMonsters();
    this.bindEvents();
    this.updateHud();
    this.animate();
  }

  loadSavedData() {
    try {
      const saved = localStorage.getItem('chiikawa_3d_world_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(this.stats, parsed);
      }
    } catch (e) {}
  }

  saveData() {
    try {
      localStorage.setItem('chiikawa_3d_world_save', JSON.stringify(this.stats));
    } catch (e) {}
  }

  // ========================================================================
  // 1. Three.js 씬, 조명, 카메라 초기화
  // ========================================================================
  initThreeScene() {
    const canvas = document.getElementById('webgl-canvas');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xbae6fd);
    this.scene.fog = new THREE.FogExp2(0xbae6fd, 0.0042);

    this.camera = new THREE.PerspectiveCamera(
      52,
      window.innerWidth / window.innerHeight,
      0.5,
      450
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 반구형 환경광 (부드러운 파스텔 톤)
    this.hemiLight = new THREE.HemisphereLight(0xffffff, 0x86efac, 0.78);
    this.hemiLight.position.set(0, 80, 0);
    this.scene.add(this.hemiLight);

    // 태양 직사광 & 그림자
    this.dirLight = new THREE.DirectionalLight(0xfffbeb, 0.92);
    this.dirLight.position.set(45, 75, 40);
    this.dirLight.castShadow = true;
    this.dirLight.shadow.mapSize.width = 2048;
    this.dirLight.shadow.mapSize.height = 2048;
    this.dirLight.shadow.camera.near = 10;
    this.dirLight.shadow.camera.far = 220;
    const d = 85;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.scene.add(this.dirLight);
  }

  // 낮 / 노을 / 밤 분위기 전환
  cycleTimeOfDay() {
    soundFx.playWeedPull();
    const modes = ['day', 'sunset', 'night'];
    const nextIdx = (modes.indexOf(this.timeOfDay) + 1) % modes.length;
    this.timeOfDay = modes[nextIdx];

    const btn = document.getElementById('btn-time-toggle');
    if (this.timeOfDay === 'day') {
      this.scene.background.setHex(0xbae6fd);
      this.scene.fog.color.setHex(0xbae6fd);
      this.hemiLight.intensity = 0.78;
      this.dirLight.color.setHex(0xfffbeb);
      this.dirLight.intensity = 0.92;
      if (btn) btn.innerText = '☀️ 낮 (초원)';
    } else if (this.timeOfDay === 'sunset') {
      this.scene.background.setHex(0xfda4af);
      this.scene.fog.color.setHex(0xfecdd3);
      this.hemiLight.intensity = 0.65;
      this.dirLight.color.setHex(0xf97316);
      this.dirLight.intensity = 0.88;
      if (btn) btn.innerText = '🌅 노을 (황혼)';
    } else {
      this.scene.background.setHex(0x0f172a);
      this.scene.fog.color.setHex(0x0f172a);
      this.hemiLight.intensity = 0.42;
      this.dirLight.color.setHex(0x818cf8);
      this.dirLight.intensity = 0.55;
      if (btn) btn.innerText = '🌙 밤 (별밤)';
    }
  }

  // ========================================================================
  // 2. 3D 오픈월드 타운 지형 & 5대 랜드마크 구축
  // ========================================================================
  buildEnvironment() {
    // 1) 메인 잔디 평원
    const groundGeo = new THREE.CylinderGeometry(145, 150, 4, 64);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xa3e635,
      roughness: 0.88
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // 2) 중앙 광장 원형 돌바닥
    const plazaGeo = new THREE.CylinderGeometry(18, 18.5, 0.25, 40);
    const plazaMat = new THREE.MeshStandardMaterial({ color: 0xfef3c7, roughness: 0.75 });
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.position.set(0, 0.05, 0);
    plaza.receiveShadow = true;
    this.scene.add(plaza);

    // 3) 치이카와 하우스 (중앙 북쪽)
    const house = createChiikawaHouse3D();
    house.position.set(0, 0, -14);
    this.scene.add(house);
    this.addZoneSign('🏡 치이카와 하우스 & 광장', 0, 11.5, -14);

    // 4) 갑옷씨의 라멘 '랑(郎)' 포장마차 (동북쪽)
    const ramenStall = createRamenStall3D();
    ramenStall.position.set(36, 0, 16);
    ramenStall.rotation.y = -Math.PI / 4;
    this.scene.add(ramenStall);
    this.ramenPos = new THREE.Vector3(36, 0, 16);
    this.addZoneSign('🍜 라멘 랑(郎) 포차 [E]', 36, 7.8, 16);

    // 5) 제초 자격증 시험장 & 풀밭 구역 (서남쪽)
    this.weedZonePos = new THREE.Vector3(-38, 0, 20);
    const boardGeo = new THREE.BoxGeometry(4.5, 3.2, 0.4);
    const boardMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.6 });
    const examBoard = new THREE.Mesh(boardGeo, boardMat);
    examBoard.position.set(-38, 2.2, 20);
    examBoard.castShadow = true;
    this.scene.add(examBoard);
    this.addZoneSign('🌱 제초 승급 시험장 [E]', -38, 5.2, 20);

    // 6) 자이언트 푸딩 언덕 & 보물상자 (서북쪽)
    this.puddingPos = new THREE.Vector3(-36, 0, -34);
    const pudding = createGiantPudding3D();
    pudding.position.copy(this.puddingPos);
    this.scene.add(pudding);
    this.puddingMesh = pudding;
    this.addZoneSign('🍮 자이언트 푸딩 점프대', -36, 9.2, -34);

    // 푸딩 옆 구름 계단 3개
    const stepCoords = [
      [-26, 1.8, -28],
      [-28, 3.6, -34],
      [-31, 5.2, -37]
    ];
    const stepMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.5 });
    stepCoords.forEach(([sx, sy, sz]) => {
      const step = new THREE.Mesh(new THREE.CylinderGeometry(2.2, 2.2, 0.7, 20), stepMat);
      step.position.set(sx, sy, sz);
      step.castShadow = true;
      step.receiveShadow = true;
      this.scene.add(step);
    });

    // 7) 토벌의 숲 (동남쪽) 영역 바닥 & 안내판
    const forestGeo = new THREE.CylinderGeometry(34, 35, 0.2, 36);
    const forestMat = new THREE.MeshStandardMaterial({ color: 0x65a30d, roughness: 0.9 });
    const forestFloor = new THREE.Mesh(forestGeo, forestMat);
    forestFloor.position.set(48, 0.04, -38);
    forestFloor.receiveShadow = true;
    this.scene.add(forestFloor);
    this.addZoneSign('⚔️ 위험! 토벌의 숲', 30, 5.0, -24);

    // 8) 파스텔 나무 & 벚꽃 나무 배치
    const treePositions = [
      [-18, -18], [18, -18], [-22, 5], [24, 32], [-55, 0],
      [-52, 35], [-20, 44], [12, 46], [52, 35], [-55, -25],
      [35, -62], [65, -25], [70, -50], [25, -55], [-12, -52]
    ];
    treePositions.forEach(([tx, tz], idx) => {
      const isSakura = idx % 2 === 0;
      const tree = this.createTree3D(isSakura);
      tree.position.set(tx, 0, tz);
      this.scene.add(tree);
    });

    // 9) 하늘 위 둥둥 떠다니는 3D 구름
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
    for (let i = 0; i < 14; i++) {
      const cg = new THREE.Group();
      for (let j = 0; j < 3; j++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(2.4 + Math.random() * 1.2, 14, 14), cloudMat);
        puff.position.set((j - 1) * 2.2, Math.random() * 0.6, 0);
        puff.scale.y = 0.65;
        cg.add(puff);
      }
      cg.position.set(
        (Math.random() - 0.5) * 180,
        26 + Math.random() * 14,
        (Math.random() - 0.5) * 180
      );
      this.scene.add(cg);
      this.clouds.push(cg);
    }
  }

  createTree3D(isSakura = false) {
    const tree = new THREE.Group();
    const trunkMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.85 });
    const leafMat = new THREE.MeshStandardMaterial({
      color: isSakura ? 0xffb3c6 : 0x4ade80,
      roughness: 0.75
    });

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.8, 3.2, 12), trunkMat);
    trunk.position.y = 1.6;
    trunk.castShadow = true;
    tree.add(trunk);

    const crown1 = new THREE.Mesh(new THREE.SphereGeometry(2.4, 18, 16), leafMat);
    crown1.position.y = 4.2;
    crown1.castShadow = true;
    tree.add(crown1);

    const crown2 = new THREE.Mesh(new THREE.SphereGeometry(1.7, 16, 14), leafMat);
    crown2.position.set(0.9, 5.3, 0.4);
    tree.add(crown2);

    return tree;
  }

  addZoneSign(text, x, y, z) {
    const el = document.createElement('div');
    el.className = 'world-label zone-banner-tag';
    el.innerText = text;
    document.getElementById('world-labels-layer').appendChild(el);
    this.zoneSigns.push({ el, pos: new THREE.Vector3(x, y, z) });
  }

  // ========================================================================
  // 3. 플레이어 캐릭터 및 동료 NPC 스폰
  // ========================================================================
  spawnPlayer(charKey) {
    if (this.playerMesh) {
      this.scene.remove(this.playerMesh);
    }
    this.activeCharKey = charKey;
    this.playerMesh = createChiikawaPlushie(charKey);
    this.playerMesh.position.copy(this.playerPos);
    this.playerMesh.rotation.y = this.playerYaw;
    this.scene.add(this.playerMesh);

    // 상단 스위처 버튼 활성화 갱신
    document.querySelectorAll('.char-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.char === charKey);
    });

    this.updateHud();
  }

  switchCharacter(charKey) {
    if (this.activeCharKey === charKey) return;
    soundFx.playSkill();
    const prevKey = this.activeCharKey;

    // 기존 동료 리스트에서 선택한 캐릭터를 이전 캐릭터로 교체
    const companion = this.npcs.find(n => n.charKey === charKey);
    if (companion) {
      this.scene.remove(companion.mesh);
      companion.charKey = prevKey;
      companion.cfg = CHAR_CONFIGS[prevKey];
      companion.mesh = createChiikawaPlushie(prevKey);
      companion.mesh.position.copy(companion.pos);
      this.scene.add(companion.mesh);
      companion.nameEl.innerHTML = `✨ ${companion.cfg.name}`;
    }

    this.spawnPlayer(charKey);
    this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0xff85a2, 16);
    showToast(`🎀 플레이 캐릭터가 [${CHAR_CONFIGS[charKey].name}](으)로 변경되었습니다!`);
  }

  spawnCompanionNpcs() {
    const allKeys = Object.keys(CHAR_CONFIGS).filter(k => k !== this.activeCharKey);
    const startOffsets = [
      [-6, 4], [6, 4], [-10, -2], [10, -2], [0, 8]
    ];

    allKeys.forEach((key, idx) => {
      const cfg = CHAR_CONFIGS[key];
      const mesh = createChiikawaPlushie(key);
      const [ox, oz] = startOffsets[idx % startOffsets.length];
      const pos = new THREE.Vector3(ox, 0, oz);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      // 이름표 & 말풍선 HTML 생성
      const labelWrap = document.createElement('div');
      labelWrap.className = 'world-label';
      const speechEl = document.createElement('div');
      speechEl.className = 'npc-speech-pop';
      speechEl.style.display = 'none';
      const nameEl = document.createElement('div');
      nameEl.className = 'npc-name-tag';
      nameEl.innerHTML = `🌸 ${cfg.name}`;

      labelWrap.appendChild(speechEl);
      labelWrap.appendChild(nameEl);
      document.getElementById('world-labels-layer').appendChild(labelWrap);

      this.npcs.push({
        charKey: key,
        cfg,
        mesh,
        pos,
        labelWrap,
        speechEl,
        nameEl,
        walkPhase: Math.random() * 10,
        speechTimer: 2 + idx * 3
      });
    });
  }

  togglePartyFollow() {
    this.partyMode = !this.partyMode;
    soundFx.playCoin();
    const btn = document.getElementById('btn-party-mode');
    if (btn) {
      btn.innerText = this.partyMode ? '👯 파티 동행 ON' : '👯 자유 산책 모드';
    }
    showToast(
      this.partyMode
        ? '👯 동료들이 대열을 맞춰 함께 따라다닙니다! 토벌 시 협동 공격을 합니다!'
        : '🌿 동료들이 마을 광장에서 자유롭게 산책합니다!'
    );
  }

  // ========================================================================
  // 4. 잡초(Weeds) & 몬스터(Monsters) 스폰
  // ========================================================================
  spawnWeeds() {
    for (let i = 0; i < 24; i++) {
      const isGolden = Math.random() < 0.22;
      const mesh = createWeedPatch3D(isGolden);
      const angle = Math.random() * Math.PI * 2;
      const rad = 6 + Math.random() * 24;
      const wx = -35 + Math.cos(angle) * rad;
      const wz = 20 + Math.sin(angle) * rad;
      mesh.position.set(wx, 0, wz);
      this.scene.add(mesh);

      this.weeds.push({
        mesh,
        pos: new THREE.Vector3(wx, 0, wz),
        isGolden,
        alive: true,
        respawnTimer: 0
      });
    }
  }

  spawnMonsters() {
    const monsterDefs = [
      { type: 'bug', name: '초록 딱정벌레', hp: 90, maxHp: 90, atk: 8, coin: 25, exp: 30, pos: [36, -28] },
      { type: 'bug', name: '초록 딱정벌레', hp: 90, maxHp: 90, atk: 8, coin: 25, exp: 30, pos: [44, -24] },
      { type: 'chimera', name: '붉은 키메라', hp: 160, maxHp: 160, atk: 14, coin: 45, exp: 55, pos: [52, -35] },
      { type: 'chimera', name: '강철 키메라', hp: 180, maxHp: 180, atk: 15, coin: 50, exp: 60, pos: [38, -46] },
      { type: 'chimera', name: '어둠 키메라', hp: 180, maxHp: 180, atk: 15, coin: 50, exp: 60, pos: [60, -32] },
      { type: 'anoko', name: '👑 거대 보스 아노코', hp: 450, maxHp: 450, atk: 22, coin: 150, exp: 160, pos: [55, -50] }
    ];

    monsterDefs.forEach(def => {
      const mesh = createMonster3D(def.type);
      const pos = new THREE.Vector3(def.pos[0], 0, def.pos[1]);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      const labelEl = document.createElement('div');
      labelEl.className = 'world-label monster-hud-tag';
      labelEl.innerHTML = `
        <div>${def.name}</div>
        <div class="monster-hp-track"><div class="monster-hp-fill" style="width:100%"></div></div>
      `;
      document.getElementById('world-labels-layer').appendChild(labelEl);

      this.monsters.push({
        ...def,
        mesh,
        pos,
        homePos: pos.clone(),
        labelEl,
        hpFillEl: labelEl.querySelector('.monster-hp-fill'),
        alive: true,
        respawnTimer: 0,
        atkCooldown: 0,
        heightOffset: def.type === 'anoko' ? 7.8 : 3.6
      });
    });
  }

  // ========================================================================
  // 5. 플레이어 액션: 점프, 사스마타 공격, 고유 필살기, 상호작용
  // ========================================================================
  triggerJump() {
    if (!this.isGrounded) return;
    soundFx.playJump();
    this.playerVelY = 16.5;
    this.isGrounded = false;

    // 점프 시 통통 튀는 스트레치 연출
    if (this.playerMesh) {
      this.playerMesh.scale.set(0.88, 1.18, 0.88);
    }
  }

  triggerAttack() {
    if (this.attackTimer > 0) return;
    this.attackTimer = 0.36;
    soundFx.playAttack();

    if (this.playerMesh && this.playerMesh.userData.setExpression) {
      this.playerMesh.userData.setExpression('attack');
      setTimeout(() => {
        if (this.playerMesh) this.playerMesh.userData.setExpression('normal');
      }, 450);
    }

    // 전방 슬래시 링 이펙트 생성
    const forward = new THREE.Vector3(Math.sin(this.playerYaw), 0, Math.cos(this.playerYaw));
    const atkCenter = this.playerPos.clone().add(forward.multiplyScalar(2.6));
    this.spawnSlashRing(atkCenter, 0xff758f, 3.6);

    // 1) 범위 내 잡초 베기/뽑기
    let pulledCount = 0;
    this.weeds.forEach(w => {
      if (w.alive && w.pos.distanceTo(atkCenter) < 4.5) {
        this.harvestWeed(w);
        pulledCount++;
      }
    });

    // 2) 범위 내 몬스터 타격
    const cfg = CHAR_CONFIGS[this.activeCharKey];
    const buffMult = this.stats.ramenBuffTimer > 0 ? 1.35 : 1.0;
    const dmg = Math.round((cfg.atk + this.stats.level * 4) * buffMult);

    this.monsters.forEach(m => {
      const hitRadius = m.type === 'anoko' ? 6.5 : 4.8;
      if (m.alive && m.pos.distanceTo(atkCenter) < hitRadius) {
        this.damageMonster(m, dmg);
      }
    });
  }

  triggerSpecialSkill() {
    if (this.skillCooldown > 0) {
      showToast(`⏳ 필살기 재충전 중입니다! (${this.skillCooldown.toFixed(1)}초)`);
      return;
    }
    this.skillCooldown = 4.0;
    soundFx.playSkill();

    const cfg = CHAR_CONFIGS[this.activeCharKey];
    showToast(`✨ [${cfg.name}] 필살기 발동: ${cfg.skillName}!!`);

    if (this.playerMesh && this.playerMesh.userData.setExpression) {
      this.playerMesh.userData.setExpression('happy');
      setTimeout(() => {
        if (this.playerMesh) this.playerMesh.userData.setExpression('normal');
      }, 900);
    }

    // 대형 충격파 링 2중 확산
    this.spawnSlashRing(this.playerPos.clone(), 0xfacc15, 11.5);
    this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0xfacc15, 28);

    // 주변 잡초 일괄 수확
    this.weeds.forEach(w => {
      if (w.alive && w.pos.distanceTo(this.playerPos) < 11.0) {
        this.harvestWeed(w);
      }
    });

    // 주변 모든 몬스터에게 강력한 범위 피해
    const buffMult = this.stats.ramenBuffTimer > 0 ? 1.35 : 1.0;
    const skillDmg = Math.round((cfg.atk * 2.4 + this.stats.level * 8) * buffMult);
    this.monsters.forEach(m => {
      if (m.alive && m.pos.distanceTo(this.playerPos) < 12.5) {
        this.damageMonster(m, skillDmg);
      }
    });

    // 체력도 소량 회복
    this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + 20);
    this.updateHud();
  }

  harvestWeed(w) {
    w.alive = false;
    w.mesh.visible = false;
    w.respawnTimer = 8 + Math.random() * 6;
    soundFx.playWeedPull();

    const coinGain = w.isGolden ? 35 : 12;
    const expGain = w.isGolden ? 25 : 10;
    this.stats.weedsPulled++;
    this.addReward(coinGain, expGain, 'weed');

    this.spawnBurstParticles(w.pos.clone().add(new THREE.Vector3(0, 1, 0)), w.isGolden ? 0xfacc15 : 0x4ade80, 10);
    this.spawnFloatingText(
      w.pos.clone().add(new THREE.Vector3(0, 2, 0)),
      w.isGolden ? `✨황금초 +${coinGain}🪙` : `🌿제초 +${coinGain}🪙`,
      w.isGolden ? '#facc15' : '#4ade80'
    );
  }

  damageMonster(m, dmg) {
    m.hp -= dmg;
    this.spawnBurstParticles(m.pos.clone().add(new THREE.Vector3(0, 2, 0)), 0xf43f5e, 12);
    this.spawnFloatingText(m.pos.clone().add(new THREE.Vector3(0, 3.2, 0)), `-${dmg} 💥`, '#ff4d6d');

    // 피격 시 넉백 및 스케일 흔들림
    m.mesh.scale.set(1.25, 0.8, 1.25);

    if (m.hp <= 0) {
      m.hp = 0;
      m.alive = false;
      m.mesh.visible = false;
      m.labelEl.style.display = 'none';
      m.respawnTimer = m.type === 'anoko' ? 18 : 10;

      soundFx.playFanfare();
      this.stats.monstersDefeated++;
      this.addReward(m.coin, m.exp, 'monster');
      this.spawnBurstParticles(m.pos.clone().add(new THREE.Vector3(0, 2.5, 0)), 0xfacc15, 24);
      this.spawnFloatingText(
        m.pos.clone().add(new THREE.Vector3(0, 4, 0)),
        `🎉 토벌 성공! +${m.coin}🪙`,
        '#facc15'
      );
    } else {
      const pct = Math.max(0, (m.hp / m.maxHp) * 100);
      m.hpFillEl.style.width = `${pct}%`;
    }
  }

  // 상호작용 키 [E] 실행
  triggerInteract() {
    if (!this.nearestInteractable) {
      // 근처 상호작용 대상이 없으면 공격/풀뽑기 수행
      this.triggerAttack();
      return;
    }

    const item = this.nearestInteractable;
    if (item.type === 'ramen') {
      openRamenMinigame();
    } else if (item.type === 'weed_exam') {
      openWeedExamModal();
    } else if (item.type === 'weed') {
      this.harvestWeed(item.target);
    } else if (item.type === 'npc') {
      openNpcDialog(item.target);
    }
  }

  // 순간이동 (워프)
  warpToZone(zoneKey) {
    soundFx.playSkill();
    const coords = {
      plaza: [0, 0, 8],
      weed: [-32, 0, 20],
      ramen: [30, 0, 20],
      pudding: [-26, 0, -25],
      forest: [35, 0, -24]
    };
    const target = coords[zoneKey] || coords.plaza;
    this.playerPos.set(target[0], target[1], target[2]);
    this.playerVelY = 0;
    if (this.playerMesh) {
      this.playerMesh.position.copy(this.playerPos);
    }
    this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0x38bdf8, 18);
  }

  // ========================================================================
  // 6. 보상, 레벨업, 버프, UI 갱신
  // ========================================================================
  addReward(coins, exp, source) {
    this.stats.coins += coins;
    this.stats.exp += exp;
    if (source === 'ramen') {
      this.stats.ramenServed++;
    }

    while (this.stats.exp >= this.stats.maxExp) {
      this.stats.exp -= this.stats.maxExp;
      this.stats.level++;
      this.stats.maxExp = Math.round(this.stats.maxExp * 1.25);
      this.stats.maxHp += 20;
      this.stats.hp = this.stats.maxHp;
      soundFx.playFanfare();
      showToast(`🎊 레벨 업!! Lv.${this.stats.level} 달성! 공격력과 최대 체력이 상승했습니다!`);
    }

    this.saveData();
    this.updateHud();
  }

  activateRamenBuff() {
    this.stats.ramenBuffTimer = 60;
    this.stats.hp = this.stats.maxHp;
    this.updateHud();
  }

  promoteWeedingCert(examScore) {
    const ranks = ['🌱 제초 견습생', '🌿 제초 5급', '🍀 제초 3급', '👑 제초 1급 마스터'];
    if (this.stats.certLevel < 3) {
      this.stats.certLevel++;
    }
    this.addReward(120, 80, 'exam');
    showToast(`🏅 축하합니다! [${ranks[this.stats.certLevel]}] 자격증 승급에 합격했습니다! (+120 코인)`);
  }

  updateHud() {
    const cfg = CHAR_CONFIGS[this.activeCharKey];
    const ranks = ['🌱 제초 견습생', '🌿 제초 5급', '🍀 제초 3급', '👑 제초 1급 마스터'];

    document.getElementById('hud-avatar-img').src = cfg.portrait;
    document.getElementById('hud-char-name').innerText = cfg.name;
    document.getElementById('hud-lv-badge').innerText = `Lv.${this.stats.level}`;
    document.getElementById('hud-cert-badge').innerText = ranks[this.stats.certLevel] || ranks[0];

    const hpPct = Math.max(0, Math.min(100, (this.stats.hp / this.stats.maxHp) * 100));
    const expPct = Math.max(0, Math.min(100, (this.stats.exp / this.stats.maxExp) * 100));
    document.getElementById('hud-hp-fill').style.width = `${hpPct}%`;
    document.getElementById('hud-exp-fill').style.width = `${expPct}%`;

    document.getElementById('hud-coins-val').innerText = this.stats.coins.toLocaleString();
    document.getElementById('hud-weeds-val').innerText = `${this.stats.weedsPulled}포기`;
    document.getElementById('hud-skill-name').innerText = cfg.skillName;

    // 퀘스트 보드 진행 상태 업데이트
    this. renderQuestBoard();
  }

  renderQuestBoard() {
    const qList = document.getElementById('hud-quest-list');
    if (!qList) return;

    const quests = [
      { title: '🌿 초원 풀뽑기 10회', cur: this.stats.weedsPulled, max: 10 },
      { title: '🍜 라멘 랑 알바 대접', cur: this.stats.ramenServed, max: 1 },
      { title: '⚔️ 숲의 몬스터 토벌 3회', cur: this.stats.monstersDefeated, max: 3 },
      { title: '🍮 자이언트 푸딩 정상 점프', cur: this.stats.puddingClimbed, max: 1 }
    ];

    qList.innerHTML = quests.map(q => {
      const done = q.cur >= q.max;
      return `
        <div class="quest-item ${done ? 'done' : ''}">
          <span>${done ? '✅' : '📌'} ${q.title}</span>
          <span class="quest-prog">${Math.min(q.cur, q.max)} / ${q.max}</span>
        </div>
      `;
    }).join('');
  }

  // ========================================================================
  // 7. 3D 파티클, 충격파 링, 플로팅 텍스트 이펙트
  // ========================================================================
  spawnSlashRing(center, colorHex, maxRadius) {
    const geo = new THREE.RingGeometry(0.4, 0.9, 28);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(center);
    mesh.position.y = Math.max(0.3, center.y + 0.5);
    this.scene.add(mesh);

    this.shockwaves.push({
      mesh,
      scale: 1,
      maxScale: maxRadius,
      alpha: 0.95
    });
  }

  spawnBurstParticles(pos, colorHex, count = 14) {
    const geo = new THREE.OctahedronGeometry(0.24, 0);
    const mat = new THREE.MeshBasicMaterial({ color: colorHex });

    for (let i = 0; i < count; i++) {
      const p = new THREE.Mesh(geo, mat);
      p.position.copy(pos);
      const angle = Math.random() * Math.PI * 2;
      const spd = 4 + Math.random() * 8;
      const vel = new THREE.Vector3(
        Math.cos(angle) * spd,
        4 + Math.random() * 8,
        Math.sin(angle) * spd
      );
      this.scene.add(p);
      this.particles.push({ mesh: p, vel, life: 0.65 });
    }
  }

  spawnFloatingText(worldPos, text, color = '#fff') {
    const vec = worldPos.clone();
    vec.project(this.camera);
    if (vec.z > 1) return;

    const x = (vec.x * 0.5 + 0.5) * window.innerWidth;
    const y = (-(vec.y * 0.5) + 0.5) * window.innerHeight;

    const el = document.createElement('div');
    el.className = 'float-dmg-text';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.color = color;
    el.innerText = text;
    document.body.appendChild(el);

    setTimeout(() => el.remove(), 950);
  }

  // ========================================================================
  // 8. 메인 게임 루프 (Physics, AI, Animation, Minimap)
  // ========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());

    const dt = Math.min(this.clock.getDelta(), 0.05);
    this.updatePlayer(dt);
    this.updateCompanions(dt);
    this.updateWeedsAndMonsters(dt);
    this.updateEffects(dt);
    this.updateCamera();
    this.checkNearestInteraction();

    this.renderer.render(this.scene, this.camera);
    this.updateProjectedLabels();
    this.drawMinimap();
  }

  updatePlayer(dt) {
    if (this.attackTimer > 0) this.attackTimer -= dt;
    if (this.skillCooldown > 0) this.skillCooldown -= dt;
    if (this.stats.ramenBuffTimer > 0) {
      this.stats.ramenBuffTimer = Math.max(0, this.stats.ramenBuffTimer - dt);
    }

    // 입력 방향 계산
    let ix = this.joyVec.x;
    let iz = this.joyVec.y;
    if (this.keys['KeyW'] || this.keys['ArrowUp']) iz -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) iz += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) ix -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) ix += 1;

    const cfg = CHAR_CONFIGS[this.activeCharKey];
    const buffMult = this.stats.ramenBuffTimer > 0 ? 1.28 : 1.0;
    const moveSpeed = cfg.speed * buffMult;

    const isMoving = Math.hypot(ix, iz) > 0.05;
    if (isMoving) {
      const len = Math.hypot(ix, iz);
      ix /= len;
      iz /= len;

      // 카메라 수평 각도(camYaw) 기준으로 이동 방향 변환
      const forwardX = -Math.sin(this.camYaw);
      const forwardZ = -Math.cos(this.camYaw);
      const rightX = Math.cos(this.camYaw);
      const rightZ = -Math.sin(this.camYaw);

      const moveX = rightX * ix + forwardX * (-iz);
      const moveZ = rightZ * ix + forwardZ * (-iz);

      this.playerPos.x += moveX * moveSpeed * dt;
      this.playerPos.z += moveZ * moveSpeed * dt;

      // 월드 경계 제한
      const distFromOrigin = Math.hypot(this.playerPos.x, this.playerPos.z);
      if (distFromOrigin > 125) {
        const scale = 125 / distFromOrigin;
        this.playerPos.x *= scale;
        this.playerPos.z *= scale;
      }

      // 회전 보간
      const targetYaw = Math.atan2(moveX, moveZ);
      let diff = targetYaw - this.playerYaw;
      while (diff > Math.PI) diff -= Math.PI * 2;
      while (diff < -Math.PI) diff += Math.PI * 2;
      this.playerYaw += diff * Math.min(1, dt * 12);

      this.walkTime += dt * 12;
    } else {
      this.walkTime = 0;
    }

    // 중력 및 자이언트 푸딩 트램펄린 물리
    this.playerPos.y += this.playerVelY * dt;
    this.playerVelY -= 36 * dt;

    // 자이언트 푸딩 위 판정
    let groundHeight = 0;
    const distToPudding = Math.hypot(
      this.playerPos.x - this.puddingPos.x,
      this.playerPos.z - this.puddingPos.z
    );
    if (distToPudding < 6.2 && this.playerPos.y >= 4.2) {
      groundHeight = 5.6;
      if (this.playerVelY < 0 && this.playerPos.y <= 5.8) {
        // 푸딩 위에서 통통 점프 트램펄린!
        this.playerVelY = 22;
        soundFx.playJump();
        if (this.stats.puddingClimbed === 0) {
          this.stats.puddingClimbed = 1;
          this.addReward(100, 60, 'pudding');
          showToast('🍮 자이언트 푸딩 정상 등반 성공!! 통통 트램펄린 보너스 (+100 코인) 획득!');
        }
      }
    }

    if (this.playerPos.y <= groundHeight) {
      this.playerPos.y = groundHeight;
      this.playerVelY = 0;
      this.isGrounded = true;
    }

    // 3D 봉제인형 관절 애니메이션 적용
    if (this.playerMesh) {
      this.playerMesh.position.copy(this.playerPos);
      this.playerMesh.rotation.y = this.playerYaw;

      // 스케일 탄성 복원
      this.playerMesh.scale.lerp(new THREE.Vector3(1, 1, 1), dt * 10);

      const parts = this.playerMesh.userData.parts;
      if (parts) {
        const swing = isMoving ? Math.sin(this.walkTime) * 0.55 : 0;
        parts.leftLegPivot.rotation.x = swing;
        parts.rightLegPivot.rotation.x = -swing;
        parts.leftArmPivot.rotation.x = -swing * 0.7;

        if (this.attackTimer > 0) {
          // 사스마타 휘두르기 모션
          parts.rightArmPivot.rotation.x = -Math.PI * 0.75 + Math.sin(this.attackTimer * 25) * 0.8;
        } else {
          parts.rightArmPivot.rotation.x = swing * 0.7;
        }

        // 귀여운 귀 쫑긋거림
        parts.earsGroup.rotation.z = Math.sin(this.clock.elapsedTime * 3) * 0.04;
      }
    }
  }

  updateCompanions(dt) {
    this.npcs.forEach((npc, idx) => {
      npc.walkPhase += dt * 6;
      npc.speechTimer -= dt;

      if (npc.speechTimer <= 0) {
        npc.speechTimer = 7 + Math.random() * 8;
        const quote = npc.cfg.quotes[Math.floor(Math.random() * npc.cfg.quotes.length)];
        npc.speechEl.innerText = quote;
        npc.speechEl.style.display = 'block';
        setTimeout(() => {
          npc.speechEl.style.display = 'none';
        }, 3800);
      }

      let targetPos;
      if (this.partyMode) {
        // 플레이어 뒤쪽 부채꼴 대형으로 따라다님
        const angleOffset = ((idx - 2) * 0.55) + this.playerYaw + Math.PI;
        const followDist = 4.2 + (idx % 2) * 2.2;
        targetPos = new THREE.Vector3(
          this.playerPos.x + Math.sin(angleOffset) * followDist,
          0,
          this.playerPos.z + Math.cos(angleOffset) * followDist
        );
      } else {
        // 중앙 광장 산책
        const a = this.clock.elapsedTime * 0.3 + idx * 1.25;
        targetPos = new THREE.Vector3(Math.cos(a) * 10, 0, Math.sin(a) * 10);
      }

      const dist = npc.pos.distanceTo(targetPos);
      if (dist > 0.8) {
        const dir = targetPos.clone().sub(npc.pos).normalize();
        npc.pos.addScaledVector(dir, dt * 11.5);
        npc.mesh.position.copy(npc.pos);
        npc.mesh.rotation.y = Math.atan2(dir.x, dir.z);

        const parts = npc.mesh.userData.parts;
        if (parts) {
          const sw = Math.sin(npc.walkPhase) * 0.45;
          parts.leftLegPivot.rotation.x = sw;
          parts.rightLegPivot.rotation.x = -sw;
        }
      }
    });
  }

  updateWeedsAndMonsters(dt) {
    // 구름 흐름
    this.clouds.forEach(c => {
      c.position.x += dt * 1.2;
      if (c.position.x > 100) c.position.x = -100;
    });

    // 잡초 리스폰 및 살랑거림
    this.weeds.forEach((w, idx) => {
      if (!w.alive) {
        w.respawnTimer -= dt;
        if (w.respawnTimer <= 0) {
          w.alive = true;
          w.mesh.visible = true;
        }
      } else {
        w.mesh.rotation.z = Math.sin(this.clock.elapsedTime * 2.5 + idx) * 0.08;
      }
    });

    // 몬스터 AI & 리스폰
    this.monsters.forEach(m => {
      if (!m.alive) {
        m.respawnTimer -= dt;
        if (m.respawnTimer <= 0) {
          m.alive = true;
          m.hp = m.maxHp;
          m.pos.copy(m.homePos);
          m.mesh.position.copy(m.pos);
          m.mesh.visible = true;
          m.labelEl.style.display = 'block';
          m.hpFillEl.style.width = '100%';
        }
        return;
      }

      m.mesh.scale.lerp(new THREE.Vector3(1, 1, 1), dt * 8);
      if (m.atkCooldown > 0) m.atkCooldown -= dt;

      const distToPlayer = m.pos.distanceTo(this.playerPos);
      if (distToPlayer < 18) {
        // 플레이어 추격
        const dir = this.playerPos.clone().sub(m.pos);
        dir.y = 0;
        if (dir.length() > 2.4) {
          dir.normalize();
          m.pos.addScaledVector(dir, dt * 6.5);
          m.mesh.position.copy(m.pos);
          m.mesh.rotation.y = Math.atan2(dir.x, dir.z);
        } else if (m.atkCooldown <= 0) {
          // 몬스터 공격
          m.atkCooldown = 1.8;
          this.stats.hp = Math.max(20, this.stats.hp - m.atk);
          this.spawnFloatingText(this.playerPos.clone().add(new THREE.Vector3(0, 3, 0)), `-${m.atk}`, '#ef4444');
          this.updateHud();
        }
      } else {
        // 스폰 지점 배회
        const dirHome = m.homePos.clone().sub(m.pos);
        if (dirHome.length() > 1.5) {
          dirHome.normalize();
          m.pos.addScaledVector(dirHome, dt * 4);
          m.mesh.position.copy(m.pos);
        }
      }
    });
  }

  updateEffects(dt) {
    // 충격파 링 업데이트
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.scale += dt * 28;
      sw.alpha -= dt * 2.4;
      sw.mesh.scale.set(sw.scale, 1, sw.scale);
      sw.mesh.material.opacity = Math.max(0, sw.alpha);
      if (sw.alpha <= 0) {
        this.scene.remove(sw.mesh);
        this.shockwaves.splice(i, 1);
      }
    }

    // 파티클 업데이트
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      p.vel.y -= 18 * dt;
      p.mesh.position.addScaledVector(p.vel, dt);
      p.mesh.rotation.x += dt * 8;
      p.mesh.rotation.y += dt * 8;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
      }
    }
  }

  updateCamera() {
    const horizDist = this.camDist * Math.cos(this.camPitch);
    const vertDist = this.camDist * Math.sin(this.camPitch);

    const targetCamX = this.playerPos.x + Math.sin(this.camYaw) * horizDist;
    const targetCamZ = this.playerPos.z + Math.cos(this.camYaw) * horizDist;
    const targetCamY = this.playerPos.y + vertDist + 2.5;

    this.camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.15);
    this.camera.lookAt(this.playerPos.x, this.playerPos.y + 2.2, this.playerPos.z);
  }

  // ========================================================================
  // 9. 근접 상호작용 감지 & 3D 라벨 투영 & 미니맵
  // ========================================================================
  checkNearestInteraction() {
    this.nearestInteractable = null;
    const promptEl = document.getElementById('interact-prompt');
    const promptTxt = document.getElementById('interact-prompt-text');

    // 1) 라멘 '랑' 포차 거리 체크
    if (this.playerPos.distanceTo(this.ramenPos) < 7.5) {
      this.nearestInteractable = { type: 'ramen' };
      promptTxt.innerText = "🍜 라멘 '랑(郎)' 주문 제작 알바하기";
      promptEl.classList.add('visible');
      return;
    }

    // 2) 제초 시험장 게시판 체크
    if (this.playerPos.distanceTo(this.weedZonePos) < 6.5) {
      this.nearestInteractable = { type: 'weed_exam' };
      promptTxt.innerText = '🌱 스피드 제초 자격증 승급 시험 응시하기';
      promptEl.classList.add('visible');
      return;
    }

    // 3) 근처 잡초 체크
    for (const w of this.weeds) {
      if (w.alive && w.pos.distanceTo(this.playerPos) < 3.6) {
        this.nearestInteractable = { type: 'weed', target: w };
        promptTxt.innerText = w.isGolden ? '✨ 황금 클로버 뽑기 (+35 코인)' : '🌿 초원 잡초 뽑기 (+12 코인)';
        promptEl.classList.add('visible');
        return;
      }
    }

    // 4) 근처 동료 NPC 대화 체크
    for (const npc of this.npcs) {
      if (npc.pos.distanceTo(this.playerPos) < 3.8) {
        this.nearestInteractable = { type: 'npc', target: npc };
        promptTxt.innerText = `💬 ${npc.cfg.name}와(과) 대화하기`;
        promptEl.classList.add('visible');
        return;
      }
    }

    promptEl.classList.remove('visible');
  }

  updateProjectedLabels() {
    const w = window.innerWidth;
    const h = window.innerHeight;

    const projectToScreen = (worldVec, offsetY, domEl) => {
      const v = worldVec.clone();
      v.y += offsetY;
      v.project(this.camera);
      if (v.z > 1) {
        domEl.style.opacity = '0';
        return;
      }
      const x = (v.x * 0.5 + 0.5) * w;
      const y = (-(v.y * 0.5) + 0.5) * h;
      domEl.style.opacity = '1';
      domEl.style.left = `${x}px`;
      domEl.style.top = `${y}px`;
    };

    this.npcs.forEach(npc => {
      projectToScreen(npc.pos, 4.4, npc.labelWrap);
    });

    this.monsters.forEach(m => {
      if (m.alive) {
        projectToScreen(m.pos, m.heightOffset, m.labelEl);
      }
    });

    this.zoneSigns.forEach(zs => {
      projectToScreen(zs.pos, 0, zs.el);
    });
  }

  drawMinimap() {
    const canvas = document.getElementById('minimap-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = canvas.width;
    const half = size / 2;
    const scale = size / 160; // 월드 -80~80 범위 투영

    ctx.clearRect(0, 0, size, size);

    // 배경 초원
    ctx.fillStyle = '#d9f99d';
    ctx.fillRect(0, 0, size, size);

    // 중앙 광장 원
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(half, half, 18 * scale, 0, Math.PI * 2);
    ctx.fill();

    // 주요 구역 마커
    const drawDot = (wx, wz, color, r) => {
      const mx = half + wx * scale;
      const my = half + wz * scale;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI * 2);
      ctx.fill();
    };

    // 잡초(초록), 라멘(주황), 푸딩(노랑), 몬스터(빨강)
    this.weeds.forEach(w => {
      if (w.alive) drawDot(w.pos.x, w.pos.z, '#22c55e', 2.2);
    });
    drawDot(this.ramenPos.x, this.ramenPos.z, '#f97316', 5);
    drawDot(this.puddingPos.x, this.puddingPos.z, '#eab308', 5);

    this.monsters.forEach(m => {
      if (m.alive) drawDot(m.pos.x, m.pos.z, '#ef4444', m.type === 'anoko' ? 5.5 : 3.5);
    });

    // 동료 점 (하늘색)
    this.npcs.forEach(n => drawDot(n.pos.x, n.pos.z, '#38bdf8', 3));

    // 플레이어 위치 (진분홍 + 시선 표시)
    const px = half + this.playerPos.x * scale;
    const py = half + this.playerPos.z * scale;
    ctx.fillStyle = '#ff4d6d';
    ctx.beginPath();
    ctx.arc(px, py, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // ========================================================================
  // 10. 키보드 / 마우스 / 모바일 터치 조이스틱 이벤트 바인딩
  // ========================================================================
  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });

    window.addEventListener('keydown', e => {
      this.keys[e.code] = true;
      soundFx.startBgm();

      if (e.code === 'Space') {
        e.preventDefault();
        this.triggerJump();
      } else if (e.code === 'KeyJ') {
        this.triggerAttack();
      } else if (e.code === 'KeyK') {
        this.triggerSpecialSkill();
      } else if (e.code === 'KeyE') {
        this.triggerInteract();
      } else if (e.code === 'Digit1') {
        this.switchCharacter('chiikawa');
      } else if (e.code === 'Digit2') {
        this.switchCharacter('hachiware');
      } else if (e.code === 'Digit3') {
        this.switchCharacter('usagi');
      } else if (e.code === 'Digit4') {
        this.switchCharacter('momonga');
      } else if (e.code === 'Digit5') {
        this.switchCharacter('kurimanju');
      } else if (e.code === 'Digit6') {
        this.switchCharacter('rakko');
      }
    });

    window.addEventListener('keyup', e => {
      this.keys[e.code] = false;
    });

    // 마우스 드래그로 3D 카메라 회전 & 휠 줌
    const canvas = document.getElementById('webgl-canvas');
    canvas.addEventListener('mousedown', e => {
      soundFx.startBgm();
      this.isDraggingCam = true;
      this.prevMouse = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mousemove', e => {
      if (!this.isDraggingCam) return;
      const dx = e.clientX - this.prevMouse.x;
      const dy = e.clientY - this.prevMouse.y;
      this.prevMouse = { x: e.clientX, y: e.clientY };

      this.camYaw -= dx * 0.007;
      this.camPitch = Math.max(0.15, Math.min(1.15, this.camPitch + dy * 0.006));
    });

    window.addEventListener('mouseup', () => {
      this.isDraggingCam = false;
    });

    canvas.addEventListener('wheel', e => {
      this.camDist = Math.max(10, Math.min(42, this.camDist + e.deltaY * 0.015));
    });

    // 모바일 가상 조이스틱
    const joyZone = document.getElementById('mobile-joystick');
    const joyKnob = document.getElementById('joystick-knob');
    if (joyZone && joyKnob) {
      let touching = false;
      const updateJoy = (clientX, clientY) => {
        const rect = joyZone.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        let dx = clientX - cx;
        let dy = clientY - cy;
        const maxR = 42;
        const dist = Math.hypot(dx, dy);
        if (dist > maxR) {
          dx = (dx / dist) * maxR;
          dy = (dy / dist) * maxR;
        }
        joyKnob.style.transform = `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`;
        this.joyVec.x = dx / maxR;
        this.joyVec.y = dy / maxR;
      };

      joyZone.addEventListener('touchstart', e => {
        touching = true;
        soundFx.startBgm();
        updateJoy(e.touches[0].clientX, e.touches[0].clientY);
      });
      joyZone.addEventListener('touchmove', e => {
        if (!touching) return;
        e.preventDefault();
        updateJoy(e.touches[0].clientX, e.touches[0].clientY);
      });
      const resetJoy = () => {
        touching = false;
        this.joyVec = { x: 0, y: 0 };
        joyKnob.style.transform = 'translate(-50%, -50%)';
      };
      joyZone.addEventListener('touchend', resetJoy);
      joyZone.addEventListener('touchcancel', resetJoy);
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new Chiikawa3DWorldApp();
});
