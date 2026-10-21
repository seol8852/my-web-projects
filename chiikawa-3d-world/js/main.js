// ==========================================================================
// 치이카와 3D 오픈월드 타운: 제초 & 토벌 빌리지 - 메인 3D 액션 엔진 (main.js)
// [정밀 타격 범위(부채꼴/원형/고도) + 부위별 피격 판정(머리 약점·백어택·다리 둔화·장갑)
//  + 몬스터 패턴별 공격 범위 예고 + 플레이어 피격 반경/스침/점프회피/저스트회피 시스템]
// ==========================================================================

class Chiikawa3DWorldApp {
  constructor() {
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.composer = null;
    this.bloomPass = null;
    this.clock = new THREE.Clock();
    this.raycaster = new THREE.Raycaster();
    this.groundPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
    this.mouseScreen = new THREE.Vector2(0, 0);
    this.mouseWorldPoint = new THREE.Vector3(0, 0, 15);

    // 게임 시작 전 캐릭터 선택 상태
    this.gameStarted = false;
    this.selectedCharInLobby = 'chiikawa';

    // 플레이어 상태 및 피격 판정 반경(Player Hurtbox)
    this.activeCharKey = 'chiikawa';
    this.playerMesh = null;
    this.playerPos = new THREE.Vector3(0, 0, 12);
    this.playerVel = new THREE.Vector3(0, 0, 0);
    this.playerVelY = 0;
    this.playerYaw = 0;
    this.playerHurtRadius = 0.82; // 플레이어 정밀 피격 반경 (m)
    this.facingFlip = 1;
    this.currentFlipScale = 1;
    this.isGrounded = true;
    this.walkTime = 0;

    // 실시간 타격 범위 가이드 & 피격 원 메쉬
    this.combatIndicatorGroup = null;
    this.aimSectorMeshes = {};
    this.playerHurtRingMesh = null;

    // 3연격 콤보 & 타격감(Hit-Stop, Camera Shake)
    this.attackTimer = 0;
    this.comboStep = 0;
    this.comboResetTimer = 0;
    this.skillCooldown = 0;
    this.skillCds = [0, 0, 0];
    this.skillCdMax = [1, 1, 1];
    this.skillLock = 0;
    this.skillShieldTimer = 0;
    this.skillAnim = null;
    this.potionCd = 0;
    this.ultCooldownMax = 30;
    this.hitStopTimer = 0;
    this.camShake = 0;

    // 대시(회피) 및 잔상(Afterimages), 발걸음 먼지
    this.dashTimer = 0;
    this.dashCooldown = 0;
    this.dashGhostSpawnTimer = 0;
    this.dashDir = new THREE.Vector3(0, 0, 1);
    this.afterimages = [];
    this.footstepTimer = 0;

    // 스탯 및 진행도 (20단계 토벌 스테이지 진행도 포함!)
    this.stats = {
      level: 1,
      exp: 0,
      maxExp: 100,
      hp: 120,
      maxHp: 120,
      coins: 200,
      certLevel: 0,
      ramenBuffTimer: 0,
      weedsPulled: 0,
      ramenServed: 0,
      monstersDefeated: 0,
      puddingClimbed: 0,
      weaponLv: 1,
      potions: 2,
      equippedHat: 'none',
      unlockedHats: ['none'],
      maxUnlockedStage: 1,
      highestClearedStage: 0
    };
    this.defaultStats = JSON.parse(JSON.stringify(this.stats));

    // 전투 스테이지 & 스페셜 던전 전용 상태 (메인 광장과 완전 분리!)
    this.arenaCenter = new THREE.Vector3(0, 0, -340);
    this.portalGatePos = new THREE.Vector3(32, 0, -22);
    this.portalGateMesh = null;
    this.battleArenaMesh = null;
    this.battleState = {
      active: false,
      mode: 'town', // 'town' | 'stage' | 'dungeon'
      stageNum: 1,
      dungeonType: null, // 'exp' | 'gold'
      dungeonTier: 1,
      title: '',
      totalMonsters: 0,
      rewardCoin: 0,
      rewardExp: 0
    };

    // 쿼터뷰 액션 카메라 궤도 설정
    this.camYaw = 0;
    this.camPitch = 0.50;
    this.camDist = 23.5;
    this.camTargetLook = new THREE.Vector3(0, 2, 12);
    this.isDraggingCam = false;
    this.dragDistMoved = 0;
    this.prevMouse = { x: 0, y: 0 };

    // 입력 상태
    this.keys = {};
    this.joyVec = { x: 0, y: 0 };

    // 월드 엔티티 목록
    this.npcs = [];
    this.weeds = [];
    this.monsters = [];
    this.chests = [];
    this.particles = [];
    this.shockwaves = [];
    this.slashArcs = [];
    this.hitBursts = [];
    this.telegraphs = [];
    this.weatherParticles = [];
    this.clouds = [];
    this.zoneSigns = [];
    this.skyDome = null;
    this.instancedGrass = null;
    this.waterTexture = null;
    this.fountainMesh = null;
    this.windmillMesh = null;
    this.windmill2Mesh = null;
    this.campsiteMesh = null;
    this.onsenPos = new THREE.Vector3(-82, 0, -68);
    this.campPos = new THREE.Vector3(-92, 0, 62);
    this.pudding2Pos = new THREE.Vector3(-85, 0, -14);
    this.pudding2Mesh = null;
    this.onsenHealTimer = 0;
    this.timeOfDay = 'day';

    this.nearestInteractable = null;

    this.init();
  }

  init() {
    this.loadSavedData();
    this.initThreeScene();
    this.buildEnvironment();
    if (typeof FXHQ !== 'undefined') FXHQ.init(this.scene, this.camera);
    if (typeof POLISH !== 'undefined') {
      POLISH.applyQuality(this);
      POLISH.initHud();
    }
    this.initCombatRangeIndicators();
    this.initWeatherParticles();
    this.spawnPlayer(this.activeCharKey);
    this.spawnTownNpcs();
    this.spawnWeeds();
    this.spawnFieldChests();
    // ☁️ 점프 타워 & 🎪 들판 이벤트 광장 (빈 평원 콘텐츠)
    if (typeof WORLDX !== 'undefined') WORLDX.init(this);
    // 메인 광장은 평화 구역이므로 시작 시 몬스터를 스폰하지 않음! (전투 스테이지/던전 입장 시 스폰)
    this.bindEvents();
    this.renderCharSelectCards();
    this.updateHud();
    this.animate();
  }

  // 방향키 유령 눌림(Stuck Key) 방지용 전체 입력 초기화
  clearAllInputKeys() {
    this.keys = {};
    this.joyVec.x = 0;
    this.joyVec.y = 0;
    if (this.playerVel) {
      this.playerVel.set(0, 0, 0);
    }
    const joyKnob = document.getElementById('joystick-knob');
    if (joyKnob) {
      joyKnob.style.transform = 'translate(-50%, -50%)';
    }
  }

  isAnyModalOpen() {
    const screen = document.getElementById('char-select-screen');
    if (screen && !screen.classList.contains('hidden')) return true;
    const modals = [
      'ramen-modal',
      'shop-modal',
      'weed-exam-modal',
      'npc-dialog-modal',
      'stage-select-modal',
      'stage-result-modal',
      'auth-modal',
      'coop-modal'
    ];
    for (const id of modals) {
      const el = document.getElementById(id);
      if (el && (el.classList.contains('open') || el.classList.contains('active') || el.classList.contains('visible'))) return true;
    }
    return false;
  }

  loadSavedData() {
    try {
      const saved = localStorage.getItem('chiikawa_3d_world_save');
      if (saved) {
        const parsed = JSON.parse(saved);
        Object.assign(this.stats, parsed);
        if (!Array.isArray(this.stats.unlockedHats)) {
          this.stats.unlockedHats = ['none'];
        }
        if (!this.stats.weaponLv) {
          this.stats.weaponLv = 1;
        }
        if (!this.stats.maxUnlockedStage || this.stats.maxUnlockedStage < 1) {
          this.stats.maxUnlockedStage = 1;
        }
        if (typeof this.stats.highestClearedStage !== 'number') {
          this.stats.highestClearedStage = 0;
        }
        this.stats.potions = Math.max(0, Math.min(5, Math.floor(Number(this.stats.potions) || 0)));
      }
      const savedChar = localStorage.getItem('chiikawa_3d_selected_char');
      if (savedChar && CHAR_CONFIGS[savedChar]) {
        this.selectedCharInLobby = savedChar;
        this.activeCharKey = savedChar;
      }
    } catch (e) {}
  }

  // 로컬 저장은 즉시, 클라우드 저장은 FirebaseManager가 30초 단위로 묶어서 처리 (force=true면 즉시)
  saveData(force = false) {
    try {
      this.stats.savedAt = Date.now();
      localStorage.setItem('chiikawa_3d_world_save', JSON.stringify(this.stats));
      localStorage.setItem('chiikawa_3d_selected_char', this.activeCharKey);
      if (!localStorage.getItem('chiikawa_3d_save_owner')) {
        localStorage.setItem('chiikawa_3d_save_owner', 'guest');
      }
    } catch (e) {}
    if (window.firebaseManager && typeof window.firebaseManager.requestSave === 'function') {
      window.firebaseManager.requestSave(force);
    }
  }

  // 클라우드/백업 세이브 전체를 적용 (기본값 위에 덮어써서 누락 필드 보정)
  applyStats(newStats) {
    const base = JSON.parse(JSON.stringify(this.defaultStats || {}));
    this.stats = Object.assign(base, newStats || {});
    if (!Array.isArray(this.stats.unlockedHats)) this.stats.unlockedHats = ['none'];
    if (!this.stats.weaponLv) this.stats.weaponLv = 1;
    if (!this.stats.maxUnlockedStage || this.stats.maxUnlockedStage < 1) this.stats.maxUnlockedStage = 1;
    if (typeof this.stats.highestClearedStage !== 'number') this.stats.highestClearedStage = 0;
    this.stats.potions = Math.max(0, Math.min(5, Math.floor(Number(this.stats.potions) || 0)));
    this.stats.hp = Math.min(this.stats.hp || this.stats.maxHp, this.stats.maxHp);
    try {
      localStorage.setItem('chiikawa_3d_world_save', JSON.stringify(this.stats));
    } catch (e) {}
    if (this.playerMesh && this.playerMesh.userData.equipHat) {
      this.playerMesh.userData.equipHat(this.stats.equippedHat || 'none');
    }
    this.updateHud();
  }

  resetStatsToDefault() {
    this.applyStats(JSON.parse(JSON.stringify(this.defaultStats)));
  }

  // ========================================================================
  // 0. 시작 화면 캐릭터 선택 로비 (단 하나의 캐릭터를 선택하여 조작!)
  // ========================================================================
  renderCharSelectCards() {
    const grid = document.getElementById('char-select-grid');
    if (!grid) return;

    grid.innerHTML = Object.keys(CHAR_CONFIGS).map(key => {
      const c = CHAR_CONFIGS[key];
      const isSel = key === this.selectedCharInLobby;
      const owner = window.coop && window.coop.charOwner ? window.coop.charOwner(key) : null;
      const ownerName = owner ? String(owner.name || '친구').replace(/[<>&"'`]/g, '') : '';
      return `
        <div class="lobby-char-card ${isSel ? 'selected' : ''} ${owner ? 'taken' : ''}" onclick="gameApp.selectLobbyChar('${key}')">
          ${owner ? `<div class="lobby-taken-badge">👥 ${ownerName} 사용 중</div>` : ''}
          <div class="lobby-char-img-wrap">
            <img src="${c.portrait}" alt="${c.name}">
          </div>
          <div class="lobby-char-name">${c.name}</div>
          <div class="lobby-char-role">${c.title}</div>
          <div class="lobby-char-desc">${c.desc}</div>
          <div class="lobby-stat-badges">
            <span>⚔️ 공격력 ${c.atk}</span>
            <span>🏃 속도 ${c.speed}</span>
            <span>🔱 ${c.weaponName}</span>
            <span style="background:#fff0f6; color:#db2777; border-color:#fbcfe8;">🎯 모션: ${c.attackStyleName || '고유 3연격'}</span>
          </div>
        </div>
      `;
    }).join('');
  }

  selectLobbyChar(charKey) {
    if (!CHAR_CONFIGS[charKey]) return;
    if (window.coop && window.coop.isCharTaken && window.coop.isCharTaken(charKey)) {
      soundFx.playAttack();
      showToast('🙅 같은 방의 친구가 이미 이 캐릭터를 쓰고 있어요. 다른 캐릭터를 골라주세요!');
      return;
    }
    soundFx.playCoin();
    this.selectedCharInLobby = charKey;
    this.renderCharSelectCards();
  }

  startGameWithSelectedChar() {
    if (window.coop && window.coop.isCharTaken && window.coop.isCharTaken(this.selectedCharInLobby || 'chiikawa')) {
      showToast('🙅 같은 방의 친구가 이미 이 캐릭터를 쓰고 있어요. 다른 캐릭터를 골라주세요!');
      return;
    }
    this.clearAllInputKeys();
    soundFx.startBgm();
    soundFx.playFanfare();
    this.gameStarted = true;
    const chosen = this.selectedCharInLobby || 'chiikawa';

    const screen = document.getElementById('char-select-screen');
    if (screen) {
      screen.classList.add('hidden');
    }

    this.activeCharKey = chosen;
    this.saveData();
    this.spawnPlayer(chosen);
    this.spawnTownNpcs();
    this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0xff85a2, 24);
    showToast(`🌟 [${CHAR_CONFIGS[chosen].name}] 출격! 넓어진 치이카와 대륙을 탐험해보세요!`);
    if (window.coop && window.coop.onCharChosen) window.coop.onCharChosen();
  }

  openCharSelectScreen() {
    this.clearAllInputKeys();
    soundFx.playCoin();
    this.selectedCharInLobby = this.activeCharKey;
    this.renderCharSelectCards();
    const screen = document.getElementById('char-select-screen');
    if (screen) {
      screen.classList.remove('hidden');
    }
  }

  // ========================================================================
  // 1. Three.js 씬, 눈부심 방지 소프트 톤매핑 & 절제된 Bloom 포스트프로세싱
  // ========================================================================
  initThreeScene() {
    const canvas = document.getElementById('webgl-canvas');
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x7dd3fc);
    // 🏔️ 원경 산맥이 대기 원근감(Aerial Perspective)으로 지평선에 자연스럽게 녹아들도록 하늘 지평선색과 일치
    this.scene.fog = new THREE.FogExp2(0xcfe4f7, 0.0021);

    this.camera = new THREE.PerspectiveCamera(
      46,
      window.innerWidth / window.innerHeight,
      0.5,
      1100
    );

    this.renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: 'high-performance'
    });
    this.maxPixelRatio = Math.min(window.devicePixelRatio, 2);
    this.currentPixelRatio = this.maxPixelRatio;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(this.currentPixelRatio);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    // 눈이 피로하지 않도록 노출도를 차분하고 부드러운 0.8로 조정
    this.renderer.toneMappingExposure = 0.8;
    this.maxAnisotropy = this.renderer.capabilities.getMaxAnisotropy();

    if (typeof THREE.EffectComposer !== 'undefined' && typeof THREE.UnrealBloomPass !== 'undefined') {
      // ✨ EffectComposer는 기본적으로 안티앨리어싱이 꺼지므로, WebGL2 MSAA(4x) 렌더 타겟으로 계단 현상 제거!
      let composerTarget;
      const w = window.innerWidth * this.currentPixelRatio;
      const h = window.innerHeight * this.currentPixelRatio;
      if (this.renderer.capabilities.isWebGL2 && THREE.WebGLMultisampleRenderTarget) {
        composerTarget = new THREE.WebGLMultisampleRenderTarget(w, h, {
          format: THREE.RGBAFormat,
          minFilter: THREE.LinearFilter,
          magFilter: THREE.LinearFilter
        });
        composerTarget.samples = 4;
      }
      this.composer = composerTarget
        ? new THREE.EffectComposer(this.renderer, composerTarget)
        : new THREE.EffectComposer(this.renderer);
      this.composer.setPixelRatio && this.composer.setPixelRatio(this.currentPixelRatio);

      const renderPass = new THREE.RenderPass(this.scene, this.camera);
      this.composer.addPass(renderPass);

      // 눈부심 없는 은은한 Bloom (발광 이펙트·태양만 살짝 빛나도록)
      this.bloomPass = new THREE.UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.14,
        0.42,
        0.92
      );
      this.composer.addPass(this.bloomPass);

      // 🎨 애니메이션 감성 컬러 그레이딩 + 부드러운 비네팅 (채도·대비·따뜻한 톤 보정)
      if (typeof THREE.ShaderPass !== 'undefined') {
        this.gradePass = new THREE.ShaderPass({
          uniforms: {
            tDiffuse: { value: null },
            uSaturation: { value: 1.12 },
            uContrast: { value: 1.06 },
            uWarmth: { value: 0.025 },
            uVignette: { value: 0.32 },
            uLift: { value: 0.012 }
          },
          vertexShader: `
            varying vec2 vUv;
            void main() {
              vUv = uv;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
          `,
          fragmentShader: `
            uniform sampler2D tDiffuse;
            uniform float uSaturation;
            uniform float uContrast;
            uniform float uWarmth;
            uniform float uVignette;
            uniform float uLift;
            varying vec2 vUv;
            void main() {
              vec4 tex = texture2D(tDiffuse, vUv);
              vec3 c = tex.rgb;
              float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
              c = mix(vec3(l), c, uSaturation);
              c = (c - 0.5) * uContrast + 0.5;
              c += vec3(uWarmth, uWarmth * 0.35, -uWarmth * 0.6);
              c = c * (1.0 - uLift) + uLift;
              vec2 d = vUv - 0.5;
              float vig = smoothstep(0.85, 0.2, length(d * vec2(1.15, 1.0)));
              c *= mix(1.0 - uVignette, 1.0, vig);
              gl_FragColor = vec4(clamp(c, 0.0, 1.0), tex.a);
            }
          `
        });
        this.composer.addPass(this.gradePass);
      }
    }

    this.hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x4d7c0f, 0.64);
    this.hemiLight.position.set(0, 110, 0);
    this.scene.add(this.hemiLight);

    // 🌞 플레이어를 따라다니는 고해상도 타이트 그림자 (그림자 텍셀 밀도 약 4배 ↑ → 선명하고 부드러운 그림자)
    this.sunOffset = new THREE.Vector3(48, 86, 40);
    this.dirLight = new THREE.DirectionalLight(0xfef3c7, 0.72);
    this.dirLight.position.copy(this.sunOffset);
    this.dirLight.castShadow = true;
    // 고사양 데스크톱은 4096 그림자맵 (모바일/저사양은 2048 유지)
    const isMobileDevice = /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    const shadowRes = (!isMobileDevice && this.renderer.capabilities.maxTextureSize >= 8192) ? 4096 : 2048;
    this.dirLight.shadow.mapSize.width = shadowRes;
    this.dirLight.shadow.mapSize.height = shadowRes;
    this.dirLight.shadow.camera.near = 5;
    this.dirLight.shadow.camera.far = 260;
    const d = 62;
    this.dirLight.shadow.camera.left = -d;
    this.dirLight.shadow.camera.right = d;
    this.dirLight.shadow.camera.top = d;
    this.dirLight.shadow.camera.bottom = -d;
    this.dirLight.shadow.bias = -0.00035;
    this.dirLight.shadow.normalBias = 0.035;
    this.dirLight.shadow.radius = 3;
    this.scene.add(this.dirLight);
    this.scene.add(this.dirLight.target);

    // 캐릭터 실루엣을 살려주는 역광 림 라이트 (그림자 없음)
    this.rimLight = new THREE.DirectionalLight(0xbfdbfe, 0.28);
    this.rimLight.position.set(-60, 40, -70);
    this.scene.add(this.rimLight);

    // 적응형 해상도(프레임 저하 시 자동으로 해상도 조절) 상태
    this.perfSampleTime = 0;
    this.perfSampleFrames = 0;
  }

  // 🖥️ 프레임레이트에 맞춰 렌더 해상도를 자동 조절 (저사양에서도 부드럽게, 고사양은 최고 화질)
  updateAdaptiveResolution(rawDt) {
    this.perfSampleTime += rawDt;
    this.perfSampleFrames++;
    if (this.perfSampleTime < 2.0) return;
    const fps = this.perfSampleFrames / this.perfSampleTime;
    this.perfSampleTime = 0;
    this.perfSampleFrames = 0;

    let next = this.currentPixelRatio;
    if (fps < 42 && this.currentPixelRatio > 0.85) next = Math.max(0.85, this.currentPixelRatio - 0.25);
    else if (fps > 57 && this.currentPixelRatio < this.maxPixelRatio) next = Math.min(this.maxPixelRatio, this.currentPixelRatio + 0.25);
    if (Math.abs(next - this.currentPixelRatio) > 0.01) {
      this.currentPixelRatio = next;
      this.renderer.setPixelRatio(next);
      if (this.composer) {
        this.composer.setPixelRatio && this.composer.setPixelRatio(next);
        this.composer.setSize(window.innerWidth, window.innerHeight);
      }
    }
  }

  // 🌍 매 프레임 환경 갱신: 하늘/그림자/대기 파티클이 플레이어를 따라감 (전투 가도 z=-568까지 하늘 유지)
  updateEnvironmentFx() {
    const t = this.clock.elapsedTime;
    if (this.skyDome) {
      this.skyDome.position.copy(this.camera.position);
      if (this.skyDome.userData.update) this.skyDome.userData.update(t);
    }
    if (this.dirLight && this.sunOffset) {
      // 텍셀 단위 스냅으로 그림자 가장자리 지글거림(Shimmering) 방지
      const snap = 0.5;
      const px = Math.round(this.playerPos.x / snap) * snap;
      const pz = Math.round(this.playerPos.z / snap) * snap;
      this.dirLight.target.position.set(px, 0, pz);
      this.dirLight.position.set(px + this.sunOffset.x, this.sunOffset.y, pz + this.sunOffset.z);
    }
    if (this.ambientMotes && this.ambientMotes.userData.update) {
      this.ambientMotes.userData.update(t, this.playerPos);
    }
  }

  // ========================================================================
  // 1-2. 플레이어 실시간 타격 범위(부채꼴/원형) & 피격 범위(Hurtbox) 인디케이터 초기화
  // ========================================================================
  initCombatRangeIndicators() {
    this.combatIndicatorGroup = new THREE.Group();
    this.scene.add(this.combatIndicatorGroup);

    // 1) 플레이어 정밀 피격 반경 원 (Player Hurtbox Ring: r = 0.82m)
    const hurtGeo = new THREE.RingGeometry(this.playerHurtRadius - 0.08, this.playerHurtRadius, 28);
    hurtGeo.rotateX(-Math.PI / 2);
    const hurtMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.42,
      depthWrite: false
    });
    this.playerHurtRingMesh = new THREE.Mesh(hurtGeo, hurtMat);
    this.playerHurtRingMesh.position.y = 0.08;
    this.combatIndicatorGroup.add(this.playerHurtRingMesh);

    // 2) 콤보 단계별 타격 범위 가이드 도형
    const arc1 = Math.PI * 0.75;
    const geo1 = new THREE.RingGeometry(0.85, 5.4, 28, 1, Math.PI * 0.5 - arc1 * 0.5, arc1);
    geo1.rotateX(-Math.PI / 2);
    const mat1 = new THREE.MeshBasicMaterial({
      color: 0xff85a2,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.22,
      depthWrite: false
    });
    this.aimSectorMeshes[1] = new THREE.Mesh(geo1, mat1);
    this.aimSectorMeshes[1].position.y = 0.06;
    this.combatIndicatorGroup.add(this.aimSectorMeshes[1]);

    const arc2 = Math.PI * 0.52;
    const geo2 = new THREE.RingGeometry(0.85, 5.8, 24, 1, Math.PI * 0.5 - arc2 * 0.5, arc2);
    geo2.rotateX(-Math.PI / 2);
    const mat2 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.25,
      depthWrite: false
    });
    this.aimSectorMeshes[2] = new THREE.Mesh(geo2, mat2);
    this.aimSectorMeshes[2].position.y = 0.06;
    this.aimSectorMeshes[2].visible = false;
    this.combatIndicatorGroup.add(this.aimSectorMeshes[2]);

    const geo3 = new THREE.RingGeometry(0.85, 6.0, 36);
    geo3.rotateX(-Math.PI / 2);
    const mat3 = new THREE.MeshBasicMaterial({
      color: 0xfacc15,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.26,
      depthWrite: false
    });
    this.aimSectorMeshes[3] = new THREE.Mesh(geo3, mat3);
    this.aimSectorMeshes[3].position.y = 0.06;
    this.aimSectorMeshes[3].visible = false;
    this.combatIndicatorGroup.add(this.aimSectorMeshes[3]);
  }

  cycleTimeOfDay() {
    soundFx.playWeedPull();
    const modes = ['day', 'sunset', 'night'];
    const nextIdx = (modes.indexOf(this.timeOfDay) + 1) % modes.length;
    this.timeOfDay = modes[nextIdx];

    const btn = document.getElementById('btn-time-toggle');
    const skyUniforms = this.skyDome ? this.skyDome.material.uniforms : null;
    const gradeUniforms = this.gradePass ? this.gradePass.uniforms : null;
    const motesUniforms = this.ambientMotes ? this.ambientMotes.userData.mat.uniforms : null;

    if (this.timeOfDay === 'day') {
      this.scene.background.setHex(0x7dd3fc);
      this.scene.fog.color.setHex(0xcfe4f7);
      this.hemiLight.intensity = 0.64;
      this.dirLight.color.setHex(0xfef3c7);
      this.dirLight.intensity = 0.72;
      if (this.rimLight) {
        this.rimLight.color.setHex(0xbfdbfe);
        this.rimLight.intensity = 0.28;
      }
      this.renderer.toneMappingExposure = 0.8;
      if (this.bloomPass) this.bloomPass.strength = 0.14;
      if (skyUniforms) {
        skyUniforms.topColor.value.setHex(0x2563eb);
        skyUniforms.midColor.value.setHex(0x7dd3fc);
        skyUniforms.bottomColor.value.setHex(0xdbeafe);
        skyUniforms.sunColor.value.setHex(0xfff1c1);
        skyUniforms.cloudColor.value.setHex(0xffffff);
        skyUniforms.nightFactor.value = 0.0;
      }
      if (gradeUniforms) {
        gradeUniforms.uSaturation.value = 1.12;
        gradeUniforms.uContrast.value = 1.06;
        gradeUniforms.uWarmth.value = 0.025;
        gradeUniforms.uVignette.value = 0.32;
      }
      if (motesUniforms) {
        motesUniforms.uColor.value.setHex(0xfff7d6);
        motesUniforms.uIntensity.value = 0.55;
      }
      if (btn) btn.innerText = '☀️ 낮 (벚꽃초원)';
      if (typeof fxSetStandeeTint === 'function') fxSetStandeeTint(0xffffff);
    } else if (this.timeOfDay === 'sunset') {
      this.scene.background.setHex(0xfb7185);
      this.scene.fog.color.setHex(0xf6b39a);
      this.hemiLight.intensity = 0.56;
      this.dirLight.color.setHex(0xfb923c);
      this.dirLight.intensity = 0.68;
      if (this.rimLight) {
        this.rimLight.color.setHex(0xfde68a);
        this.rimLight.intensity = 0.32;
      }
      this.renderer.toneMappingExposure = 0.78;
      if (this.bloomPass) this.bloomPass.strength = 0.18;
      if (skyUniforms) {
        skyUniforms.topColor.value.setHex(0x581c87);
        skyUniforms.midColor.value.setHex(0xe11d48);
        skyUniforms.bottomColor.value.setHex(0xfdba74);
        skyUniforms.sunColor.value.setHex(0xfbbf24);
        skyUniforms.cloudColor.value.setHex(0xfed7aa);
        skyUniforms.nightFactor.value = 0.15;
      }
      if (gradeUniforms) {
        gradeUniforms.uSaturation.value = 1.2;
        gradeUniforms.uContrast.value = 1.08;
        gradeUniforms.uWarmth.value = 0.06;
        gradeUniforms.uVignette.value = 0.38;
      }
      if (motesUniforms) {
        motesUniforms.uColor.value.setHex(0xfdba74);
        motesUniforms.uIntensity.value = 0.7;
      }
      if (btn) btn.innerText = '🌅 노을 (황혼)';
      if (typeof fxSetStandeeTint === 'function') fxSetStandeeTint(0xffe2cf);
    } else {
      this.scene.background.setHex(0x0a1024);
      this.scene.fog.color.setHex(0x1c1a45);
      this.hemiLight.intensity = 0.44;
      this.dirLight.color.setHex(0x818cf8);
      this.dirLight.intensity = 0.54;
      if (this.rimLight) {
        this.rimLight.color.setHex(0x38bdf8);
        this.rimLight.intensity = 0.36;
      }
      this.renderer.toneMappingExposure = 0.75;
      if (this.bloomPass) this.bloomPass.strength = 0.22;
      if (skyUniforms) {
        skyUniforms.topColor.value.setHex(0x020617);
        skyUniforms.midColor.value.setHex(0x1e1b4b);
        skyUniforms.bottomColor.value.setHex(0x312e81);
        skyUniforms.sunColor.value.setHex(0xa5b4fc);
        skyUniforms.cloudColor.value.setHex(0x475569);
        skyUniforms.nightFactor.value = 1.0;
      }
      if (gradeUniforms) {
        gradeUniforms.uSaturation.value = 1.08;
        gradeUniforms.uContrast.value = 1.05;
        gradeUniforms.uWarmth.value = -0.02;
        gradeUniforms.uVignette.value = 0.45;
      }
      if (motesUniforms) {
        motesUniforms.uColor.value.setHex(0x86efac);
        motesUniforms.uIntensity.value = 0.95;
      }
      if (btn) btn.innerText = '🌙 밤 (반딧불이)';
      if (typeof fxSetStandeeTint === 'function') fxSetStandeeTint(0xbcc5f0);
    }

    this.updateWeatherParticleColors();
  }

  // ========================================================================
  // 2. 대폭 확장된 월드 지형(반경 250m), 4,500개 잔디 & 신규 랜드마크 구축
  // ========================================================================
  buildEnvironment() {
    const gradientMap = getToonGradientMap();

    if (typeof createAnimeSkyDome3D === 'function') {
      this.skyDome = createAnimeSkyDome3D();
      this.scene.add(this.skyDome);
    }

    if (typeof createAmbientMotes3D === 'function') {
      this.ambientMotes = createAmbientMotes3D(320);
      this.scene.add(this.ambientMotes);
    }

    // 기존 반경 150m -> 250m(면적 약 3배 확장!) 초대형 대륙 지형
    const grassTex = createGrassCanvasTexture();
    if (this.maxAnisotropy) grassTex.anisotropy = this.maxAnisotropy;
    const groundGeo = new THREE.CylinderGeometry(250, 256, 4, 72);
    const groundMat = new THREE.MeshToonMaterial({
      map: grassTex,
      gradientMap
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -2;
    ground.receiveShadow = true;
    this.scene.add(ground);

    // 🏔️ [HQ] 섬을 감싸는 구릉·원경 설산·전투 협곡 지형 + 언덕을 뒤덮는 숲 / 바위 / 덤불
    this.waterTexture = createWaterCanvasTexture();
    if (this.maxAnisotropy) this.waterTexture.anisotropy = this.maxAnisotropy;
    if (typeof createOuterTerrain3D === 'function') {
      this.outerTerrain = createOuterTerrain3D(this.waterTexture);
      this.scene.add(this.outerTerrain);
    }
    if (typeof createInstancedForest3D === 'function') {
      this.forestGroup = createInstancedForest3D();
      this.scene.add(this.forestGroup);
    }
    if (typeof createScatterDetails3D === 'function') {
      this.scene.add(createScatterDetails3D());
    }

    if (typeof createInstancedGrassField3D === 'function') {
      this.instancedGrass = createInstancedGrassField3D();
      this.scene.add(this.instancedGrass);
    }
    if (typeof POLISH !== 'undefined') {
      // 🌿 카메라 주변 60m를 따라다니는 촘촘한 풀숲
      this.nearGrass = POLISH.createNearGrass(9000);
      this.scene.add(this.nearGrass);
    }

    const plazaTex = createPlazaCanvasTexture();
    if (this.maxAnisotropy) plazaTex.anisotropy = this.maxAnisotropy;
    const plazaGeo = new THREE.CylinderGeometry(21, 21.5, 0.26, 48);
    const plazaMat = new THREE.MeshToonMaterial({
      map: plazaTex,
      gradientMap
    });
    const plaza = new THREE.Mesh(plazaGeo, plazaMat);
    plaza.position.set(0, 0.05, 0);
    plaza.receiveShadow = true;
    this.scene.add(plaza);

    this.fountainMesh = createPlazaFountain3D();
    this.fountainMesh.position.set(0, 0.1, 0);
    this.scene.add(this.fountainMesh);

    const stoneMat = new THREE.MeshToonMaterial({ color: 0xd6c7b2, gradientMap });
    for (let i = 1; i <= 12; i++) {
      const s1 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.5, 0.18, 14), stoneMat);
      s1.position.set(i * 5.2, 0.06, i * 2.1);
      s1.receiveShadow = true;
      this.scene.add(s1);

      const s2 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.5, 0.18, 14), stoneMat);
      s2.position.set(-i * 5.2, 0.06, i * 2.5);
      s2.receiveShadow = true;
      this.scene.add(s2);

      // 북서쪽 온천 호수로 이어지는 징검다리 길
      const s3 = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.5, 0.18, 14), stoneMat);
      s3.position.set(-i * 5.8, 0.06, -i * 4.8);
      s3.receiveShadow = true;
      this.scene.add(s3);
    }

    const riverBridge = createRiverAndBridge3D(this.waterTexture);
    this.scene.add(riverBridge);
    if (typeof POLISH !== 'undefined') {
      // 💧 시냇물 + 협곡 강을 반짝이는 물결 셰이더로 교체
      const wm = POLISH.getWaterMaterial();
      [riverBridge, this.outerTerrain].forEach(g => g && g.traverse(o => {
        if (o.isMesh && o.material && o.material.map === this.waterTexture) o.material = wm;
      }));
    }

    // 1) 중앙 치이카와 하우스
    const house = createChiikawaHouse3D();
    house.position.set(0, 0, -16);
    this.scene.add(house);
    this.addZoneSign('🏡 치이카와 하우스 & 중앙 분수 광장', 0, 11.8, -16);

    // 2) 동남쪽 라멘 랑(郎) 본점 & 야시장 거리
    const ramenStall = createRamenStall3D();
    ramenStall.position.set(36, 0, 16);
    ramenStall.rotation.y = -Math.PI / 4;
    this.scene.add(ramenStall);
    this.ramenPos = new THREE.Vector3(36, 0, 16);
    this.addZoneSign('🍜 라멘 랑(郎) 포차 [E]', 36, 8.2, 16);

    // 남동쪽 확장 구역: 쿠리만쥬의 낭만 포장마차 분점
    const subStall = createRamenStall3D();
    subStall.position.set(78, 0, 56);
    subStall.rotation.y = -Math.PI / 2.5;
    this.scene.add(subStall);
    this.addZoneSign('🍢 쿠리만쥬의 숲속 야시장 쉼터', 78, 8.2, 56);

    // 3) 의상실 & 무기 강화 공방
    this.shopPos = new THREE.Vector3(16, 0, -5);
    const shopStand = this.createBoutiqueStand3D();
    shopStand.position.copy(this.shopPos);
    shopStand.rotation.y = -Math.PI / 5;
    this.scene.add(shopStand);
    this.addZoneSign('🛍️ 포쉐트 의상실 & 무기 강화 [E]', 16, 6.2, -5);

    // 4) 서쪽 제초 알바 대평원 & 쌍둥이 풍차 언덕
    this.weedZonePos = new THREE.Vector3(-38, 0, 20);
    this.windmillMesh = createWindmill3D();
    this.windmillMesh.position.set(-44, 0, 15);
    this.windmillMesh.rotation.y = Math.PI / 6;
    this.scene.add(this.windmillMesh);

    this.windmill2Mesh = createWindmill3D();
    this.windmill2Mesh.position.set(-96, 0, 42);
    this.windmill2Mesh.rotation.y = Math.PI / 4;
    this.scene.add(this.windmill2Mesh);
    this.addZoneSign('🌾 서부 대평원 제2 풍차 농장', -96, 10.5, 42);

    const boardGroup = new THREE.Group();
    const boardGeo = new THREE.BoxGeometry(5.0, 3.4, 0.4);
    const boardMat = new THREE.MeshToonMaterial({ color: 0x10b981, gradientMap });
    const examBoard = new THREE.Mesh(boardGeo, boardMat);
    examBoard.position.y = 2.6;
    examBoard.castShadow = true;
    addCartoonOutline(examBoard, 0.04, 0x064e3b);
    boardGroup.add(examBoard);

    const pillarMat = new THREE.MeshToonMaterial({ color: 0x78350f, gradientMap });
    [-2.0, 2.0].forEach(px => {
      const p = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.22, 2.8, 10), pillarMat);
      p.position.set(px, 1.4, 0);
      boardGroup.add(p);
    });
    boardGroup.position.copy(this.weedZonePos);
    this.scene.add(boardGroup);
    this.addZoneSign('🌱 제초 승급 시험장 [E]', -38, 5.6, 20);

    // 5) 자이언트 푸딩 점프대 (1호 & 2호 더블 디저트 파크)
    this.puddingPos = new THREE.Vector3(-36, 0, -34);
    const pudding = createGiantPudding3D();
    pudding.position.copy(this.puddingPos);
    this.scene.add(pudding);
    this.puddingMesh = pudding;
    this.addZoneSign('🍮 자이언트 푸딩 점프대', -36, 9.5, -34);

    if (this.pudding2Pos) {
      const pudding2 = createGiantPudding3D();
      pudding2.position.copy(this.pudding2Pos);
      this.scene.add(pudding2);
      this.pudding2Mesh = pudding2;
      this.addZoneSign('🍮 서쪽 더블 푸딩 트램펄린', -85, 9.5, -14);
    }

    const stepCoords = [
      [-26, 1.8, -28],
      [-28, 3.6, -34],
      [-31, 5.2, -37],
      [-74, 1.8, -10],
      [-77, 3.6, -14],
      [-80, 5.2, -16]
    ];
    const stepMat = new THREE.MeshToonMaterial({ color: 0xfde68a, gradientMap });
    stepCoords.forEach(([sx, sy, sz]) => {
      const step = new THREE.Mesh(new THREE.CylinderGeometry(2.3, 2.3, 0.75, 20), stepMat);
      step.position.set(sx, sy, sz);
      step.castShadow = true;
      step.receiveShadow = true;
      addCartoonOutline(step, 0.04);
      this.scene.add(step);
    });

    // 6) 신규 확장 구역 A: 🌸 북서쪽 벚꽃 노천온천 & 치유 호수 (-82, 0, -68)
    if (typeof createSakuraOnsenLake3D === 'function') {
      const onsen = createSakuraOnsenLake3D();
      onsen.position.copy(this.onsenPos);
      this.scene.add(onsen);
      this.addZoneSign('🌸 벚꽃 노천온천 치유 호수 [E: 체력회복·버프]', -82, 8.2, -68);
    }

    // 7) 신규 확장 구역 B: ⛺ 남서쪽 별빛 캠핑장 & 모닥불 언덕 (-92, 0, 62)
    if (typeof createStarlightCampsite3D === 'function') {
      this.campsiteMesh = createStarlightCampsite3D();
      this.campsiteMesh.position.copy(this.campPos);
      this.scene.add(this.campsiteMesh);
      this.addZoneSign('⛺ 별빛 캠핑장 & 군고구마 모닥불 [E]', -92, 7.2, 62);
    }

    // 8) 동쪽 3단계 확장 대삼림 & 심연의 고대 보스 유적지
    const forestZones = [
      { x: 52, z: -38, r: 42, color: 0x3f6212 },
      { x: 108, z: -64, r: 48, color: 0x365314 },
      { x: 88, z: 36, r: 38, color: 0x3f6212 }
    ];
    forestZones.forEach(fz => {
      const fGeo = new THREE.CylinderGeometry(fz.r, fz.r + 1, 0.22, 44);
      const fMat = new THREE.MeshToonMaterial({ color: fz.color, gradientMap });
      const fFloor = new THREE.Mesh(fGeo, fMat);
      fFloor.position.set(fz.x, 0.04, fz.z);
      fFloor.receiveShadow = true;
      this.scene.add(fFloor);
    });

    // 8) 북동쪽 전투 스테이지(1~20단계) & 성장 던전 출격 포털 게이트 (광장 평화구역 -> 아레나 이동!)
    if (typeof createSubjugationPortalGate3D === 'function') {
      this.portalGateMesh = createSubjugationPortalGate3D();
      this.portalGateMesh.position.copy(this.portalGatePos);
      this.portalGateMesh.rotation.y = -Math.PI / 4;
      this.scene.add(this.portalGateMesh);
      this.addZoneSign('⛩️ 전투 스테이지(1~20단계) & 성장 던전 출격 포털 [E / M]', 32, 10.6, -22);
    }

    // 9) 메인 광장과 완전히 분리된 3D 전투 스테이지 & 스페셜 던전 전용 콜로세움 아레나 (0, 0, -340)
    if (typeof createBattleColosseumArena3D === 'function') {
      this.battleArenaMesh = createBattleColosseumArena3D();
      this.battleArenaMesh.position.copy(this.arenaCenter);
      this.scene.add(this.battleArenaMesh);
      this.addZoneSign('⚔️ 치이카와 토벌 결투장 (Battle Arena)', 0, 11.5, -378);
    }

    if (typeof createAncientRuins3D === 'function') {
      const ruins = createAncientRuins3D();
      ruins.position.set(108, 0, -64);
      this.scene.add(ruins);
      this.addZoneSign('🏛️ 고대 유적지 전망대 (평화 탐방 구역)', 108, 10.5, -64);
    }

    // 토벌의 숲 곳곳에 대형 판타지 버섯 36개 배치
    if (typeof createForestMushroom3D === 'function') {
      const mushColors = [0xa855f7, 0xec4899, 0x3b82f6, 0xef4444];
      for (let i = 0; i < 36; i++) {
        const mush = createForestMushroom3D(mushColors[i % mushColors.length]);
        const mx = 34 + Math.random() * 115;
        const mz = -105 + Math.random() * 165;
        if ( mz > 22 && mz < 34) continue;
        mush.position.set(mx, 0, mz);
        const s = 0.65 + Math.random() * 0.75;
        mush.scale.setScalar(s);
        this.scene.add(mush);
        if (typeof POLISH !== 'undefined') POLISH.registerOccluder(mush, 2.4, 2.8);
      }
    }

    // 72그루의 벚꽃나무와 소나무를 넓어진 대륙 전역에 배치
    const treePositions = [
      [-18, -18], [18, -18], [-22, 5], [24, 34], [-55, 0],
      [-52, 35], [-20, 44], [12, 46], [52, 35], [-55, -25],
      [35, -62], [65, -25], [70, -50], [25, -55], [-12, -52],
      [-42, -8], [46, 4], [-8, 38], [62, 12],
      // 확장된 외곽 대륙 나무들
      [-68, -55], [-95, -58], [-98, -82], [-68, -85], [-48, -74],
      [-115, -35], [-125, 10], [-118, 55], [-105, 82], [-72, 78],
      [-45, 75], [-15, 88], [22, 85], [58, 78], [92, 72],
      [118, 52], [135, 18], [148, -15], [155, -52], [148, -95],
      [115, -112], [82, -98], [48, -92], [10, -88], [-28, -92],
      [-82, 18], [-64, 52], [85, -18], [102, -38], [96, 12],
      [122, -25], [110, 42], [-132, -18], [-110, -68], [68, 88]
    ];
    treePositions.forEach(([tx, tz], idx) => {
      const isSakura = idx % 2 === 0;
      const tree = this.createTree3D(isSakura, idx + 1);
      tree.position.set(tx, 0, tz);
      const scale = 0.88 + (idx % 4) * 0.12;
      tree.scale.setScalar(scale);
      tree.rotation.y = idx * 1.37;
      this.scene.add(tree);
      if (typeof POLISH !== 'undefined') POLISH.registerOccluder(tree, 4.8, 3.6);
    });

    this.spawnMeadowFlowers();

    if (typeof createHQCloud3D === 'function') {
      // ☁️ [HQ] 그라데이션 입체 뭉게구름 34개 (원경 산맥 위로 높게 흐름)
      for (let i = 0; i < 34; i++) {
        const cg = createHQCloud3D(i + 1);
        const a = Math.random() * Math.PI * 2;
        const r = 40 + Math.sqrt(Math.random()) * 420;
        cg.position.set(Math.cos(a) * r, 52 + Math.random() * 46, -120 + Math.sin(a) * r);
        cg.scale.setScalar(1.3 + Math.random() * 1.4);
        cg.rotation.y = (Math.random() - 0.5) * 0.6;
        this.scene.add(cg);
        this.clouds.push(cg);
      }
      return;
    }
    const cloudMat = new THREE.MeshToonMaterial({ color: 0xe2e8f0, gradientMap });
    for (let i = 0; i < 24; i++) {
      const cg = new THREE.Group();
      for (let j = 0; j < 3; j++) {
        const puff = new THREE.Mesh(new THREE.SphereGeometry(2.6 + Math.random() * 1.4, 14, 14), cloudMat);
        puff.position.set((j - 1) * 2.4, Math.random() * 0.6, 0);
        puff.scale.y = 0.65;
        cg.add(puff);
      }
      cg.position.set(
        (Math.random() - 0.5) * 340,
        28 + Math.random() * 16,
        (Math.random() - 0.5) * 340
      );
      this.scene.add(cg);
      this.clouds.push(cg);
    }
  }

  createBoutiqueStand3D() {
    const group = new THREE.Group();
    const gradientMap = getToonGradientMap();

    const tableMat = new THREE.MeshToonMaterial({ color: 0xfdf2f8, gradientMap });
    const table = new THREE.Mesh(new THREE.BoxGeometry(5.2, 2.0, 2.8), tableMat);
    table.position.y = 1.0;
    table.castShadow = true;
    addCartoonOutline(table, 0.04);
    group.add(table);

    const roofMat = new THREE.MeshToonMaterial({ color: 0xf472b6, gradientMap });
    const roof = new THREE.Mesh(new THREE.ConeGeometry(4.0, 2.2, 4), roofMat);
    roof.position.y = 4.6;
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    addCartoonOutline(roof, 0.04);
    group.add(roof);

    const poleMat = new THREE.MeshToonMaterial({ color: 0xfef08a, gradientMap });
    [-2.1, 2.1].forEach(px => {
      const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.14, 3.6, 10), poleMat);
      pole.position.set(px, 2.5, 0);
      group.add(pole);
    });

    if (typeof createHatAccessory3D === 'function') {
      const sampleCrown = createHatAccessory3D('crown');
      if (sampleCrown) {
        sampleCrown.position.set(-1.1, 2.1, 0.3);
        group.add(sampleCrown);
      }
      const sampleFlower = createHatAccessory3D('flower');
      if (sampleFlower) {
        sampleFlower.position.set(1.1, 2.15, 0.3);
        group.add(sampleFlower);
      }
    }

    return group;
  }

  spawnMeadowFlowers() {
    if (typeof createInstancedFlowerField3D === 'function') {
      this.flowerGroup = createInstancedFlowerField3D();
      this.scene.add(this.flowerGroup);
      return;
    }
    const flowerColors = [0xff85a2, 0xfacc15, 0xe2e8f0, 0xc084fc, 0x60a5fa];
    const stemMat = new THREE.MeshBasicMaterial({ color: 0x15803d });

    for (let i = 0; i < 180; i++) {
      const fg = new THREE.Group();
      const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.5, 6), stemMat);
      stem.position.y = 0.25;
      fg.add(stem);

      const petalColor = flowerColors[i % flowerColors.length];
      const petalMat = new THREE.MeshBasicMaterial({ color: petalColor });
      const head = new THREE.Mesh(new THREE.DodecahedronGeometry(0.25, 0), petalMat);
      head.position.y = 0.55;
      fg.add(head);

      const angle = Math.random() * Math.PI * 2;
      const dist = 21 + Math.random() * 175;
      fg.position.set(Math.cos(angle) * dist, 0, Math.sin(angle) * dist);
      this.scene.add(fg);
    }
  }

  initWeatherParticles() {
    const geo = new THREE.OctahedronGeometry(0.22, 0);
    for (let i = 0; i < 95; i++) {
      const mat = new THREE.MeshBasicMaterial({
        color: 0xffb3c6,
        transparent: true,
        opacity: 0.78
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(
        (Math.random() - 0.5) * 220,
        2 + Math.random() * 26,
        (Math.random() - 0.5) * 220
      );
      this.scene.add(mesh);
      this.weatherParticles.push({
        mesh,
        phase: Math.random() * Math.PI * 2,
        speedY: 1.4 + Math.random() * 1.5,
        driftX: (Math.random() - 0.5) * 1.8
      });
    }
  }

  updateWeatherParticleColors() {
    let hex = 0xffb3c6;
    if (this.timeOfDay === 'sunset') hex = 0xfde047;
    if (this.timeOfDay === 'night') hex = 0xa3e635;

    this.weatherParticles.forEach(wp => {
      wp.mesh.material.color.setHex(hex);
    });
  }

  createTree3D(isSakura = false, seed = 1) {
    if (typeof createHQTree3D === 'function') return createHQTree3D(isSakura, seed);
    const tree = new THREE.Group();
    const gradientMap = getToonGradientMap();
    const trunkMat = new THREE.MeshToonMaterial({ color: 0x78350f, gradientMap });
    const leafMat = new THREE.MeshToonMaterial({
      color: isSakura ? 0xffb3c6 : 0x4ade80,
      gradientMap
    });

    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.85, 3.2, 12), trunkMat);
    trunk.position.y = 1.6;
    trunk.castShadow = true;
    addCartoonOutline(trunk, 0.045);
    tree.add(trunk);

    const crown1 = new THREE.Mesh(new THREE.SphereGeometry(2.5, 18, 16), leafMat);
    crown1.position.y = 4.3;
    crown1.castShadow = true;
    addCartoonOutline(crown1, 0.05);
    tree.add(crown1);

    const crown2 = new THREE.Mesh(new THREE.SphereGeometry(1.8, 16, 14), leafMat);
    crown2.position.set(1.0, 5.4, 0.4);
    crown2.castShadow = true;
    addCartoonOutline(crown2, 0.045);
    tree.add(crown2);

    const crown3 = new THREE.Mesh(new THREE.SphereGeometry(1.6, 14, 12), leafMat);
    crown3.position.set(-0.9, 5.0, -0.5);
    crown3.castShadow = true;
    addCartoonOutline(crown3, 0.045);
    tree.add(crown3);

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
  // 3. 단일 플레이어 캐릭터 스폰 & 마을 거점 NPC 배치
  // ========================================================================
  spawnPlayer(charKey) {
    if (this.playerMesh) {
      this.scene.remove(this.playerMesh);
    }
    this.activeCharKey = charKey;
    this.playerMesh = createChiikawaPlushie(charKey);
    this.playerMesh.position.copy(this.playerPos);

    if (this.stats.equippedHat && this.stats.equippedHat !== 'none' && this.playerMesh.userData.equipHat) {
      this.playerMesh.userData.equipHat(this.stats.equippedHat);
    }

    this.scene.add(this.playerMesh);
    this.updateHud();
  }

  equipPlayerHat(hatType) {
    this.stats.equippedHat = hatType;
    if (this.playerMesh && this.playerMesh.userData.equipHat) {
      this.playerMesh.userData.equipHat(hatType);
    }
    this.saveData();
    this.updateHud();
  }

  spawnTownNpcs() {
    this.npcs.forEach(n => {
      this.scene.remove(n.mesh);
      if (n.labelWrap) n.labelWrap.remove();
    });
    this.npcs = [];

    const otherKeys = Object.keys(CHAR_CONFIGS).filter(k => k !== this.activeCharKey);
    const townSpots = [
      [-7, -9],
      [-28, 16],
      [28, 18],
      [-24, -22],
      [24, -18]
    ];

    otherKeys.forEach((key, idx) => {
      const cfg = CHAR_CONFIGS[key];
      const mesh = createChiikawaPlushie(key);
      const [ox, oz] = townSpots[idx % townSpots.length];
      const pos = new THREE.Vector3(ox, 0, oz);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      const labelWrap = document.createElement('div');
      labelWrap.className = 'world-label';
      const speechEl = document.createElement('div');
      speechEl.className = 'npc-speech-pop';
      speechEl.style.display = 'none';
      const nameEl = document.createElement('div');
      nameEl.className = 'npc-name-tag';
      nameEl.innerHTML = `💬 ${cfg.name}`;

      labelWrap.appendChild(speechEl);
      labelWrap.appendChild(nameEl);
      document.getElementById('world-labels-layer').appendChild(labelWrap);

      this.npcs.push({
        charKey: key,
        cfg,
        mesh,
        pos,
        homePos: pos.clone(),
        labelWrap,
        speechEl,
        nameEl,
        walkPhase: Math.random() * 10,
        speechTimer: 3 + idx * 3.5
      });
    });
  }

  // ========================================================================
  // 4. 확장 맵 잡초(62개), 보물상자/별사탕 광석(16개), 3개 구역 몬스터(18마리) 스폰
  // ========================================================================
  spawnWeeds() {
    const weedCenters = [
      { x: -35, z: 20, r: 24, count: 28 },
      { x: -95, z: 42, r: 30, count: 22 },
      { x: -24, z: 68, r: 22, count: 12 }
    ];

    weedCenters.forEach(zone => {
      for (let i = 0; i < zone.count; i++) {
        const isGolden = Math.random() < 0.28;
        const mesh = createWeedPatch3D(isGolden);
        const angle = Math.random() * Math.PI * 2;
        const rad = 4 + Math.random() * zone.r;
        const wx = zone.x + Math.cos(angle) * rad;
        const wz = zone.z + Math.sin(angle) * rad;
        if (wz > 23 && wz < 33) continue;
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
    });
  }

  // 맵 전역에 흩어진 보물상자 & 별사탕 크리스탈 광석 (공격하거나 [E]로 개봉!)
  spawnFieldChests() {
    if (typeof createTreasureChest3D !== 'function') return;
    const chestSpots = [
      [-56, -42, false], [-94, -72, true], [-70, -62, false],
      [-105, 58, false], [-82, 74, true], [-115, 16, false],
      [-88, -22, true], [84, 62, false], [48, 52, true],
      [68, -42, false], [95, -35, true], [115, -58, false],
      [138, -82, true], [122, -92, false], [74, 28, true],
      [98, 42, false]
    ];

    chestSpots.forEach(([cx, cz, isCrystal]) => {
      const mesh = createTreasureChest3D(isCrystal);
      const pos = new THREE.Vector3(cx, 0, cz);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      this.chests.push({
        mesh,
        pos,
        isCrystal,
        alive: true,
        respawnTimer: 0
      });
    });
  }

  openFieldChest(chest) {
    if (!chest || !chest.alive) return;
    chest.alive = false;
    chest.mesh.visible = false;
    chest.respawnTimer = 22 + Math.random() * 8;
    soundFx.playFanfare();

    const coinGain = chest.isCrystal ? 85 : 65;
    const expGain = chest.isCrystal ? 55 : 40;
    this.addReward(coinGain, expGain, 'chest');

    const hitPos = chest.pos.clone().add(new THREE.Vector3(0, 1.5, 0));
    this.spawnHitImpactEffect3D(hitPos, chest.isCrystal ? 0x38bdf8 : 0xfacc15, true);
    this.spawnBurstParticles(hitPos, chest.isCrystal ? 0x38bdf8 : 0xfacc15, 22);
    this.spawnFloatingText(
      hitPos.clone().add(new THREE.Vector3(0, 1.4, 0)),
      chest.isCrystal ? `💎별사탕 광석 채굴! +${coinGain}🪙` : `🎁보물상자 발견! +${coinGain}🪙`,
      chest.isCrystal ? '#38bdf8' : '#facc15'
    );
  }

  // ========================================================================
  // 4-2. ⚔️ 20단계 전진 돌파형 토벌 대장정(5구역 릴레이 웨이브) & 경험치/재화 던전 시스템
  // ========================================================================
  clearStageMonsters() {
    this.monsters.forEach(m => {
      if (m.mesh) {
        this.scene.remove(m.mesh);
        this.disposeObject3D(m.mesh);
      }
      if (m.labelEl) m.labelEl.remove();
    });
    this.monsters = [];

    this.telegraphs.forEach(tg => {
      if (tg.mesh) {
        this.scene.remove(tg.mesh);
        this.disposeObject3D(tg.mesh);
      }
    });
    this.telegraphs = [];
  }

  // 지오메트리/재질 GPU 메모리 해제 (일러스트 텍스처는 캐시 공유라 유지)
  disposeObject3D(obj) {
    if (!obj) return;
    const geos = new Set();
    const mats = new Set();
    obj.traverse(o => {
      if (o.isSprite) return;
      if (o.geometry) geos.add(o.geometry);
      if (o.material) (Array.isArray(o.material) ? o.material : [o.material]).forEach(mm => mats.add(mm));
    });
    geos.forEach(g => g.dispose());
    mats.forEach(mm => {
      if (typeof FX_STANDEE_MATS !== 'undefined') FX_STANDEE_MATS.delete(mm);
      mm.dispose();
    });
  }

  // 현재 구역(Sector)의 특정 웨이브 몬스터들을 전방 진격로에 스폰 (기존 살아있는 몬스터 유지 가능!)
  spawnSectorWaveMonsters(monsterDefs, sectorLocalZ, isReinforcement = false) {
    if (this.partyRole === 'member' && !this._forceSpawn) return;
    const netSec = this.battleState.currentSectorIdx || 0;
    const netWave = this.battleState.currentWaveIdx || 0;
    const cx = this.arenaCenter.x;
    const baseWorldZ = this.arenaCenter.z + sectorLocalZ;

    monsterDefs.forEach((def, idx) => {
      const mesh = createMonster3D(def.type);
      const scale = def.scale || 1.0;
      mesh.scale.setScalar(scale);

      // 전방 진격로(폭 32m)를 따라 부채꼴/횡대 진형으로 배치, 증원군은 더 앞쪽에서 달려오게 배치!
      let mx = cx;
      let mz = baseWorldZ - (isReinforcement ? 10 : 0);
      if (!def.isBoss) {
        const total = Math.max(1, monsterDefs.length);
        const lane = ((idx / Math.max(1, total - 1)) - 0.5) * 24;
        mx = cx + lane + (Math.random() - 0.5) * 3.5;
        mz = baseWorldZ - (idx % 3) * 4.5 - (isReinforcement ? 9 : 0);
      } else {
        mx = cx;
        mz = baseWorldZ - 8;
      }

      const pos = new THREE.Vector3(mx, 0, mz);
      mesh.position.copy(pos);
      this.scene.add(mesh);

      // 스폰 이펙트
      this.spawnBurstParticles(pos.clone().add(new THREE.Vector3(0, 1.8, 0)), def.isBoss ? 0xfacc15 : 0xef4444, 14);

      const labelEl = document.createElement('div');
      labelEl.className = 'world-label monster-hud-tag';
      if (def.isBoss) {
        labelEl.style.borderColor = '#facc15';
        labelEl.style.background = 'rgba(15, 23, 42, 0.92)';
      }
      labelEl.innerHTML = `
        <div>${def.name} <span class="monster-status-tag" style="font-size:10px; color:#38bdf8;"></span></div>
        <div class="monster-hp-track"><div class="monster-hp-fill" style="width:100%"></div></div>
      `;
      document.getElementById('world-labels-layer').appendChild(labelEl);

      this.monsters.push({
        ...def,
        maxHp: def.hp,
        coin: def.coin || 25,
        exp: def.exp || 30,
        mesh,
        pos,
        homePos: pos.clone(),
        baseScale: scale,
        facingYaw: 0,
        bodyRadius: (mesh.userData.bodyRadius || 1.5) * scale,
        sizeH: (mesh.userData.sizeH || 5.4) * scale,
        isArmored: mesh.userData.isArmored || false,
        knockbackVel: new THREE.Vector3(),
        labelEl,
        statusEl: labelEl.querySelector('.monster-status-tag'),
        hpFillEl: labelEl.querySelector('.monster-hp-fill'),
        alive: true,
        respawnTimer: 999999,
        atkCooldown: 0.9 + (idx % 4) * 0.25,
        isWindingUp: false,
        slowTimer: 0,
        stunTimer: 0,
        heightOffset: (def.type === 'anoko' ? 8.8 : 5.4) * scale,
        netId: `${netSec}_${netWave}_${idx}`
      });
    });
  }

  // 현재 구역의 결계 위치 및 색상 갱신
  updateArenaBarrierVisual() {
    if (!this.battleArenaMesh || !this.battleArenaMesh.userData.sectorBarrier) return;
    const barrier = this.battleArenaMesh.userData.sectorBarrier;
    const mat = this.battleArenaMesh.userData.barrierMat;

    if (!this.battleState.active || !this.battleState.sectors) {
      barrier.visible = false;
      return;
    }

    const curSec = this.battleState.sectors[this.battleState.currentSectorIdx];
    if (!curSec) {
      barrier.visible = false;
      return;
    }

    barrier.visible = true;
    barrier.position.z = curSec.barrierLocalZ;
    if (mat) {
      if (this.battleState.waitingAdvance) {
        mat.color.setHex(0x38bdf8);
        mat.opacity = 0.15;
      } else {
        mat.color.setHex(0xef4444);
        mat.opacity = 0.42;
      }
    }
  }

  // ⚔️ 1 ~ 20단계 전진 돌파형 토벌 스테이지 시작! (5개 구역 릴레이 웨이브, 약 2분 대장정!)
  startBattleStage(stageNum, opts = {}) {
    if (this.raidMode) {
      showToast('🐉 레이드 진행 중에는 다른 전투에 입장할 수 없어요.');
      return;
    }
    if (!opts.party && window.coop && window.coop.blockSoloStage && window.coop.blockSoloStage()) return;
    const maxUnlocked = this.stats.maxUnlockedStage || 1;
    if (!opts.party && stageNum > maxUnlocked) {
      showToast(`🔒 이전 단계인 ${stageNum - 1}단계를 먼저 클리어해야 입장할 수 있습니다!`);
      return;
    }

    closeStageSelectModal();
    closeStageResultModal();
    this.clearAllInputKeys();
    this.clearStageMonsters();
    soundFx.playFanfare();

    const stData = STAGE_CAMPAIGN_DATA[stageNum - 1] || STAGE_CAMPAIGN_DATA[0];
    this.battleState = {
      active: true,
      mode: 'stage',
      stageNum: stData.stageNum,
      dungeonType: null,
      dungeonTier: 1,
      title: `⚔️ STAGE ${stData.stageNum} [${stData.badge}] ${stData.title}`,
      bossName: stData.bossName || '',
      totalMonsters: stData.totalMonsters,
      killedMonsters: 0,
      rewardCoin: stData.rewardCoin,
      rewardExp: stData.rewardExp,
      sectors: stData.sectors,
      currentSectorIdx: 0,
      currentWaveIdx: 0,
      waveSpawnTimer: 7.5,
      waitingAdvance: false,
      elapsedTime: 0
    };

    // 플레이어를 250m 전진형 토벌 가도 출발점(Local Z = +14)으로 이동 및 체력 100% 회복
    this.stats.hp = this.stats.maxHp;
    this.playerPos.set(this.arenaCenter.x, 0, this.arenaCenter.z + 14);
    this.playerVel.set(0, 0, 0);
    this.playerVelY = 0;
    this.playerYaw = Math.PI;
    this.camYaw = 0;
    if (this.playerMesh) {
      this.playerMesh.position.copy(this.playerPos);
    }

    // 제 1구역 첫 번째 웨이브 즉시 스폰! (파티: 방장만 스폰, 파티원은 방장 상태를 받아 생성)
    this.partyRole = window.coop && window.coop.partyRoleFor ? window.coop.partyRoleFor(opts) : null;
    this.isDowned = false;
    const firstSec = stData.sectors[0];
    this.spawnSectorWaveMonsters(firstSec.waves[0], firstSec.localZ, false);
    if (window.coop && window.coop.onStageStarted) window.coop.onStageStarted(opts);
    this.updateArenaBarrierVisual();
    this.updateBattleStageHud();
    this.updateHud();
    this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0xfacc15, 24);

    showToast(`⚔️ [제 ${stData.stageNum}스테이지: ${stData.title}] 진격 개시! 전방(⬆️ W키)으로 나아가며 5개 구역(${stData.totalMonsters}마리)을 돌파하세요!`);
  }

  // 💎 스페셜 성장 던전 시작 (경험치 던전 / 재화 골드 던전도 5구역 전진 돌파형으로 진행!)
  startSpecialDungeon(dungeonType = 'exp', tier = 1, opts = {}) {
    if (this.raidMode) {
      showToast('🐉 레이드 진행 중에는 다른 전투에 입장할 수 없어요.');
      return;
    }
    if (!opts.party && window.coop && window.coop.blockSoloStage && window.coop.blockSoloStage()) return;
    closeStageSelectModal();
    closeStageResultModal();
    this.clearAllInputKeys();
    this.clearStageMonsters();
    soundFx.playFanfare();

    const tierNames = ['초급', '중급', '상급'];
    const tName = tierNames[(tier - 1) % 3];
    let title = '';
    let rewardCoin = 0;
    let rewardExp = 0;

    if (dungeonType === 'exp') {
      title = `📘 별사탕 수련 가도 [${tName} 경험치 던전]`;
      rewardCoin = 120 * tier;
      rewardExp = tier === 1 ? 480 : tier === 2 ? 1250 : 2800;
    } else {
      title = `🪙 황금 클로버 보물 가도 [${tName} 재화 던전]`;
      rewardCoin = tier === 1 ? 750 : tier === 2 ? 1850 : 4200;
      rewardExp = 160 * tier;
    }

    const sectorLocalZs = [-18, -62, -108, -154, -200];
    const barrierLocalZs = [-36, -80, -126, -172, -226];
    const sectors = [];
    let totalMonsters = 0;

    for (let sIdx = 0; sIdx < 5; sIdx++) {
      const waves = [];
      for (let wIdx = 0; wIdx < 2; wIdx++) {
        const waveMobs = [];
        const count = 3 + (sIdx >= 3 ? 1 : 0);
        for (let m = 0; m < count; m++) {
          const isBossMob = sIdx === 4 && wIdx === 1 && m === 0;
          waveMobs.push({
            type: isBossMob ? 'midboss' : (dungeonType === 'exp' ? (m % 2 === 0 ? 'bug' : 'goblin') : 'chimera'),
            name: isBossMob
              ? (dungeonType === 'exp' ? `👑대현자 별사탕 수호신` : `👑황금 보물왕 대괴수`)
              : (dungeonType === 'exp' ? `✨별사탕 경험치 정령 Lv.${tier * 4}` : `💰황금 보물 고블린 Lv.${tier * 4}`),
            isBoss: isBossMob,
            hp: Math.round((160 + tier * 160 + sIdx * 35) * (isBossMob ? 3.2 : 1.0)),
            atk: Math.round((12 + tier * 5 + sIdx * 1.5) * (isBossMob ? 1.4 : 1.0)),
            coin: dungeonType === 'gold' ? 65 * tier : 18 * tier,
            exp: dungeonType === 'exp' ? 55 * tier : 22 * tier,
            scale: isBossMob ? 1.32 : 1.05,
            atkPattern: isBossMob ? 'circle' : 'sector',
            reach: isBossMob ? 6.2 : 4.5
          });
        }
        totalMonsters += waveMobs.length;
        waves.push(waveMobs);
      }
      sectors.push({
        sectorNum: sIdx + 1,
        localZ: sectorLocalZs[sIdx],
        barrierLocalZ: barrierLocalZs[sIdx],
        waves
      });
    }

    this.battleState = {
      active: true,
      mode: 'dungeon',
      stageNum: this.stats.maxUnlockedStage || 1,
      dungeonType,
      dungeonTier: tier,
      title,
      bossName: '',
      totalMonsters,
      killedMonsters: 0,
      rewardCoin,
      rewardExp,
      sectors,
      currentSectorIdx: 0,
      currentWaveIdx: 0,
      waveSpawnTimer: 6.5,
      waitingAdvance: false,
      elapsedTime: 0
    };

    this.stats.hp = this.stats.maxHp;
    this.playerPos.set(this.arenaCenter.x, 0, this.arenaCenter.z + 14);
    this.playerVel.set(0, 0, 0);
    this.playerVelY = 0;
    this.playerYaw = Math.PI;
    this.camYaw = 0;
    if (this.playerMesh) {
      this.playerMesh.position.copy(this.playerPos);
    }

    this.partyRole = window.coop && window.coop.partyRoleFor ? window.coop.partyRoleFor(opts) : null;
    this.isDowned = false;
    const firstSec = sectors[0];
    this.spawnSectorWaveMonsters(firstSec.waves[0], firstSec.localZ, false);
    if (window.coop && window.coop.onStageStarted) window.coop.onStageStarted(opts);
    this.updateArenaBarrierVisual();
    this.updateBattleStageHud();
    this.updateHud();
    this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0x38bdf8, 24);
    showToast(`🌟 [${title}] 진격 시작! 전방으로 돌파하며 총 ${totalMonsters}마리의 정령/보물괴수를 처치하세요!`);
  }

  startNextStage() {
    closeStageResultModal();
    const nextNum = Math.min(20, (this.battleState.stageNum || 1) + 1);
    this.startBattleStage(nextNum);
  }

  retryCurrentStage() {
    closeStageResultModal();
    if (this.battleState.mode === 'dungeon') {
      this.startSpecialDungeon(this.battleState.dungeonType, this.battleState.dungeonTier);
    } else {
      this.startBattleStage(this.battleState.stageNum || 1);
    }
  }

  // ⛲ 전투 종료 후 평화로운 메인 광장으로 귀환
  returnToTown(isDefeat = false) {
    if (this.raidMode && window.coop) {
      window.coop.exitRaid(false);
      return;
    }
    if (this.partyRole && window.coop) window.coop.onLeaveStage();
    this.partyRole = null;
    this.isDowned = false;
    closeStageResultModal();
    closeStageSelectModal();
    this.clearStageMonsters();
    this.clearAllInputKeys();

    this.battleState.active = false;
    this.battleState.mode = 'town';
    this.stats.hp = this.stats.maxHp;
    this.updateArenaBarrierVisual();

    this.playerPos.set(0, 0, 12);
    this.playerVel.set(0, 0, 0);
    this.playerVelY = 0;
    if (this.playerMesh) {
      this.playerMesh.position.copy(this.playerPos);
    }

    this.updateBattleStageHud();
    this.updateHud();
    this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0xff85a2, 20);

    if (isDefeat) {
      showToast('🚑 전투에서 쓰러져 평화로운 중앙 광장으로 구출되었습니다! 경험치/재화 던전과 무기 강화로 스펙을 올려보세요!');
    } else {
      showToast('⛲ 평화로운 메인 광장으로 귀환했습니다! 라멘 알바, 온천, 의상실 등 다양한 컨텐츠를 즐겨보세요!');
    }
  }

  updateBattleStageHud() {
    const hudEl = document.getElementById('battle-stage-hud');
    if (!hudEl) return;

    if (!this.battleState.active) {
      hudEl.classList.remove('active');
      return;
    }

    hudEl.classList.add('active');
    const total = this.battleState.totalMonsters || 1;
    const killed = this.battleState.killedMonsters || 0;
    const remainTotal = Math.max(0, total - killed);

    const titleEl = document.getElementById('battle-stage-title');
    const remainEl = document.getElementById('battle-stage-remain');
    const timerEl = document.getElementById('battle-stage-timer');
    if (titleEl) titleEl.innerText = this.battleState.title;
    if (remainEl) remainEl.innerText = `남은 적군: ${remainTotal} / ${total}마리`;

    if (timerEl) {
      const sec = Math.floor(this.battleState.elapsedTime || 0);
      const mm = String(Math.floor(sec / 60)).padStart(2, '0');
      const ss = String(sec % 60).padStart(2, '0');
      timerEl.innerText = `⏱️ ${mm}:${ss}`;
    }

    const secTxtEl = document.getElementById('battle-sector-txt');
    const distTxtEl = document.getElementById('battle-dist-txt');
    const progFillEl = document.getElementById('battle-progress-fill');
    const curSecNum = (this.battleState.currentSectorIdx || 0) + 1;
    const curSecObj = this.battleState.sectors ? this.battleState.sectors[this.battleState.currentSectorIdx] : null;
    const waveNum = (this.battleState.currentWaveIdx || 0) + 1;
    const maxWaves = curSecObj ? curSecObj.waves.length : 2;
    const pct = Math.min(100, Math.round((killed / total) * 100));

    if (secTxtEl) {
      if (this.battleState.waitingAdvance) {
        secTxtEl.innerText = `🔓 제 ${curSecNum}구역 돌파 완료!! ⬆️ 전방(W키)으로 진격하여 제 ${curSecNum + 1}구역에 진입하세요!`;
      } else {
        secTxtEl.innerText = `🏃 진격 구역: 제 ${curSecNum} / 5 구역 (웨이브 ${waveNum}/${maxWaves} 교전 중!)`;
      }
    }
    if (distTxtEl) distTxtEl.innerText = `진행도 ${pct}%`;
    if (progFillEl) progFillEl.style.width = `${Math.max(8, pct)}%`;

    const bossWrap = document.getElementById('stage-boss-bar-wrap');
    const bossMon = this.monsters.find(m => m.isBoss && m.alive);
    if (bossWrap) {
      if (bossMon) {
        bossWrap.classList.add('active');
        const bPct = Math.max(0, Math.round((bossMon.hp / bossMon.maxHp) * 100));
        document.getElementById('stage-boss-name').innerText = bossMon.name;
        document.getElementById('stage-boss-hp-txt').innerText = `${Math.max(0, Math.round(bossMon.hp)).toLocaleString()} / ${bossMon.maxHp.toLocaleString()} (${bPct}%)`;
        document.getElementById('stage-boss-fill').style.width = `${bPct}%`;
      } else {
        bossWrap.classList.remove('active');
      }
    }
    if (this.raidMode && window.coop) window.coop.decorateRaidHud();
  }

  // 구역 내 증원 웨이브 스폰 및 다음 구역 전진 활성화 체크
  checkStageClearCondition() {
    if (!this.battleState.active || !this.battleState.sectors) return;
    this.updateBattleStageHud();

    const curSecIdx = this.battleState.currentSectorIdx;
    const curSec = this.battleState.sectors[curSecIdx];
    if (!curSec) return;

    const aliveCount = this.monsters.filter(m => m.alive).length;

    // 1) 현재 구역에 아직 스폰되지 않은 증원 웨이브가 남아있고, 필드의 적이 2마리 이하로 줄었으면 즉시 다음 증원군 돌격!
    if (this.battleState.currentWaveIdx + 1 < curSec.waves.length && aliveCount <= 2) {
      this.battleState.currentWaveIdx++;
      this.battleState.waveSpawnTimer = 8.0;
      const nextWaveMobs = curSec.waves[this.battleState.currentWaveIdx];
      this.spawnSectorWaveMonsters(nextWaveMobs, curSec.localZ - 6, true);
      soundFx.playAttack();
      showToast(`⚡ [제 ${curSec.sectorNum}구역 적 증원군 출현!!] 전방에서 적 ${nextWaveMobs.length}마리가 쉴 새 없이 몰려옵니다!`);
      this.updateBattleStageHud();
      return;
    }

    // 아직 살아있는 몬스터나 남은 웨이브가 있으면 대기
    if (aliveCount > 0 || this.battleState.currentWaveIdx + 1 < curSec.waves.length) {
      return;
    }

    // 2) 현재 구역의 모든 웨이브 처치 완료! -> 아직 1~4구역이면 전방 결계를 열고 다음 구역 전진 유도!
    if (curSecIdx < this.battleState.sectors.length - 1) {
      if (!this.battleState.waitingAdvance) {
        this.battleState.waitingAdvance = true;
        soundFx.playCoin();
        this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + Math.round(this.stats.maxHp * 0.25));
        this.updateArenaBarrierVisual();
        this.updateBattleStageHud();
        this.updateHud();
        showToast(`🔓 [제 ${curSec.sectorNum}/5 구역 돌파 성공!] 체력 25% 회복! ⬆️ 앞으로(W키) 전진하여 제 ${curSec.sectorNum + 1}구역으로 진격하세요!`);
      }
      return;
    }

    // 3) 마지막 제 5구역의 모든 웨이브 & 보스까지 완전 토벌 완료 -> 스테이지/던전 최종 클리어!!
    soundFx.playFanfare();
    const coinReward = this.battleState.rewardCoin;
    const expReward = this.battleState.rewardExp;

    if (this.battleState.mode === 'stage') {
      const curStage = this.battleState.stageNum;
      this.stats.highestClearedStage = Math.max(this.stats.highestClearedStage || 0, curStage);
      this.stats.maxUnlockedStage = Math.min(20, Math.max(this.stats.maxUnlockedStage || 1, curStage + 1));
    }

    this.addReward(coinReward, expReward, 'stage_clear');
    if (this.partyRole === 'host' && window.coop) window.coop.onHostStageClear();
    this.stats.hp = this.stats.maxHp;
    this.saveData(true);
    this.updateHud();

    // 클리어 결과 모달 표시
    const modal = document.getElementById('stage-result-modal');
    if (modal) {
      this.clearAllInputKeys();
      const sec = Math.floor(this.battleState.elapsedTime || 0);
      const timeStr = `${Math.floor(sec / 60)}분 ${sec % 60}초`;
      document.getElementById('stage-result-icon').innerText =
        this.battleState.stageNum === 20 && this.battleState.mode === 'stage' ? '👑🏆' : '🎉';
      document.getElementById('stage-result-title').innerText =
        this.battleState.mode === 'stage'
          ? `STAGE ${this.battleState.stageNum} 전 구역 돌파 완료!!`
          : `스페셜 성장 던전 돌파 완료!!`;
      document.getElementById('stage-result-desc').innerText =
        this.battleState.mode === 'stage' && this.battleState.stageNum < 20
          ? `[${this.battleState.title}] 5개 구역(${this.battleState.totalMonsters}마리) 완전 제압! (소요 시간: ${timeStr}) 다음 제 ${this.battleState.stageNum + 1}스테이지가 개방되었습니다!`
          : `[${this.battleState.title}] 완주 성공! (소요 시간: ${timeStr}) 대량의 보상을 획득했습니다!`;
      document.getElementById('stage-result-coin').innerText = `+${coinReward.toLocaleString()} 🪙`;
      document.getElementById('stage-result-exp').innerText = `+${expReward.toLocaleString()} EXP`;

      const nextBtn = document.getElementById('btn-next-stage');
      if (nextBtn) {
        if (this.battleState.mode === 'stage' && this.battleState.stageNum < 20) {
          nextBtn.style.display = 'flex';
          nextBtn.innerText = `⏭️ 다음 제 ${this.battleState.stageNum + 1}스테이지 즉시 도전하기!`;
        } else {
          nextBtn.style.display = 'none';
        }
      }
      modal.classList.add('open');
    }
  }

  // ========================================================================
  // 5. 정밀 타격 범위(Sector/Arc/Height) & 부위별 피격 판정 + 화려한 3D 타격 이펙트
  // ========================================================================
  triggerJump() {
    if (this.isDowned) return;
    if (!this.isGrounded) return;
    soundFx.playJump();
    this.playerVelY = 20.0;
    this.isGrounded = false;
    this.spawnFootstepDust(this.playerPos, 6);
    this.spawnSlashRing(this.playerPos.clone(), 0xffffff, 2.2);

    if (this.playerMesh) {
      this.playerMesh.scale.set(0.82, 1.28, 0.82);
    }
  }

  triggerDash() {
    if (this.isDowned) return;
    if (this.dashCooldown > 0) return;
    this.dashCooldown = 0.8;
    this.dashTimer = 0.25;
    this.dashGhostSpawnTimer = 0;
    this.attackTimer = 0;
    soundFx.playJump();

    let ix = this.joyVec.x;
    let iz = this.joyVec.y;
    if (this.keys['KeyW'] || this.keys['ArrowUp']) iz -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) iz += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) ix -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) ix += 1;

    if (Math.hypot(ix, iz) > 0.05) {
      const forwardX = -Math.sin(this.camYaw);
      const forwardZ = -Math.cos(this.camYaw);
      const rightX = Math.cos(this.camYaw);
      const rightZ = -Math.sin(this.camYaw);
      this.dashDir.set(
        rightX * ix + forwardX * (-iz),
        0,
        rightZ * ix + forwardZ * (-iz)
      ).normalize();
      if (ix !== 0) this.facingFlip = ix >= 0 ? 1 : -1;
    } else {
      this.dashDir.set(Math.sin(this.playerYaw), 0, Math.cos(this.playerYaw)).normalize();
    }

    if (this.playerMesh) {
      this.playerMesh.scale.set(1.28, 0.75, 1.28);
    }
    if (typeof POLISH !== 'undefined') POLISH.dashBurst(this.playerPos, this.dashDir, CHAR_CONFIGS[this.activeCharKey].accentColor);
    else this.spawnSlashRing(this.playerPos.clone(), 0x38bdf8, 3.4);
    this.spawnFootstepDust(this.playerPos, 5);
  }

  spawnDashAfterimage() {
    const cfg = CHAR_CONFIGS[this.activeCharKey];
    const tex = loadCleanCharacterTexture(cfg.portrait);
    const geo = new THREE.PlaneGeometry(4.6, 4.8);
    geo.translate(0, 2.4, 0);
    const mat = new THREE.MeshBasicMaterial({
      map: tex,
      color: cfg.accentColor,
      transparent: true,
      opacity: 0.55,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const ghost = new THREE.Mesh(geo, mat);
    ghost.position.copy(this.playerPos);
    ghost.rotation.y = this.camYaw;
    ghost.scale.x = this.facingFlip;
    this.scene.add(ghost);
    this.afterimages.push({ mesh: ghost, life: 0.28, maxLife: 0.28 });
  }

  // 두 각도 차이 (-PI ~ +PI) 계산 헬퍼
  angleDifference(a, b) {
    let diff = a - b;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    return diff;
  }

  // 💥 3D 입체 타격 임팩트 이펙트 스폰 (십자 스타버스트 + X자 슬래시 + 경사 충격파 링)
  spawnHitImpactEffect3D(hitWorldPos, colorHex = 0xfacc15, isCrit = false) {
    if (typeof FXHQ !== 'undefined') {
      FXHQ.hitSpark(hitWorldPos, colorHex, isCrit);
      return;
    }
    if (typeof createHitImpactBurst3D === 'function') {
      const burst = createHitImpactBurst3D(colorHex, isCrit);
      burst.position.copy(hitWorldPos);
      burst.rotation.y = this.camYaw;
      burst.rotation.z = (Math.random() - 0.5) * 0.8;
      burst.scale.setScalar(0.25);
      this.scene.add(burst);

      this.hitBursts.push({
        mesh: burst,
        life: isCrit ? 0.28 : 0.20,
        maxLife: isCrit ? 0.28 : 0.20,
        targetScale: isCrit ? 1.85 : 1.35,
        spinSpeed: (Math.random() > 0.5 ? 1 : -1) * 9.5
      });
    }

    // 타격 지점 미니 충격파 링
    this.spawnSlashRing(hitWorldPos.clone(), colorHex, isCrit ? 3.8 : 2.5);
  }

  // ⚔️ 캐릭터별 고유 3연격 모션 & 정밀 타격 범위(Sector/Height) + 부위별 타격 판정 공격
  triggerAttack(aimWorldPoint = null) {
    if (this.isDowned) return;
    if (this.attackTimer > 0) return;
    if (this.skillLock > 0) return;

    const charKey = this.activeCharKey;
    const cfg = CHAR_CONFIGS[charKey];
    this.comboStep = (this.comboStep % 3) + 1;
    this.comboResetTimer = 1.35;

    // 캐릭터별 공격 템포(듀레이션) 차별화
    let atkDur = this.comboStep === 3 ? 0.36 : 0.25;
    if (charKey === 'chiikawa') atkDur = this.comboStep === 3 ? 0.34 : 0.22;
    else if (charKey === 'usagi') atkDur = this.comboStep === 3 ? 0.38 : this.comboStep === 2 ? 0.28 : 0.22;
    else if (charKey === 'kurimanju') atkDur = this.comboStep === 3 ? 0.42 : 0.29;
    else if (charKey === 'rakko') atkDur = this.comboStep === 3 ? 0.35 : this.comboStep === 2 ? 0.26 : 0.21;

    this.maxAttackTime = atkDur;
    this.attackTimer = atkDur;
    soundFx.playAttack();

    // 1) 스마트 타겟 조준 또는 마우스 커서 조준
    let targetDir = null;
    let bestDist = 8.5;

    for (const m of this.monsters) {
      if (m.alive) {
        const d = m.pos.distanceTo(this.playerPos);
        if (d < bestDist) {
          bestDist = d;
          targetDir = m.pos.clone().sub(this.playerPos);
        }
      }
    }
    if (!targetDir) {
      for (const w of this.weeds) {
        if (w.alive) {
          const d = w.pos.distanceTo(this.playerPos);
          if (d < 6.5 && d < bestDist) {
            bestDist = d;
            targetDir = w.pos.clone().sub(this.playerPos);
          }
        }
      }
    }
    if (!targetDir) {
      for (const c of this.chests) {
        if (c.alive) {
          const d = c.pos.distanceTo(this.playerPos);
          if (d < 6.5 && d < bestDist) {
            bestDist = d;
            targetDir = c.pos.clone().sub(this.playerPos);
          }
        }
      }
    }
    if (!targetDir && aimWorldPoint) {
      targetDir = aimWorldPoint.clone().sub(this.playerPos);
    }

    if (targetDir && Math.hypot(targetDir.x, targetDir.z) > 0.1) {
      this.playerYaw = Math.atan2(targetDir.x, targetDir.z);
      const rightX = Math.cos(this.camYaw);
      const rightZ = -Math.sin(this.camYaw);
      const dotRight = targetDir.x * rightX + targetDir.z * rightZ;
      this.facingFlip = dotRight >= 0 ? 1 : -1;
    }

    const forward = new THREE.Vector3(Math.sin(this.playerYaw), 0, Math.cos(this.playerYaw)).normalize();

    // 캐릭터별 전진 스텝(Lunge) 및 점프 도약 물리 차별화!
    const wasAirborne = !this.isGrounded || this.playerPos.y > 0.6;
    let lungeDist = this.comboStep === 3 ? 1.25 : 0.72;

    if (charKey === 'chiikawa') {
      // 치이카와: 1,2타는 용기 있게 앞으로 콕 찌르고 3타에 폴짝 점프 찍기!
      lungeDist = this.comboStep === 2 ? 0.95 : 0.75;
      if (this.comboStep === 3 && this.isGrounded) {
        this.playerVelY = 7.8;
        this.isGrounded = false;
      }
    } else if (charKey === 'hachiware') {
      // 하치와레: 2타 어퍼 슬래시 시 가볍게 도약, 3타 회오리 스핀 전진!
      lungeDist = this.comboStep === 3 ? 1.45 : 0.8;
      if (this.comboStep === 2 && this.isGrounded) {
        this.playerVelY = 5.2;
        this.isGrounded = false;
      }
    } else if (charKey === 'usagi') {
      // 우사기: 압도적인 기동력! 2타 옆돌기 점프 + 3타 고점프 앞공중제비 폭격!
      lungeDist = this.comboStep === 3 ? 1.75 : 1.15;
      if (this.comboStep === 2 && this.isGrounded) {
        this.playerVelY = 6.5;
        this.isGrounded = false;
      } else if (this.comboStep === 3 && this.isGrounded) {
        this.playerVelY = 10.8;
        this.isGrounded = false;
      }
    } else if (charKey === 'momonga') {
      // 모몽가: 2타 방방 뛰기 + 3타 2회전 피루엣 스텝!
      lungeDist = this.comboStep === 3 ? 1.3 : 0.65;
      if (this.comboStep === 3 && this.isGrounded) {
        this.playerVelY = 6.8;
        this.isGrounded = false;
      }
    } else if (charKey === 'kurimanju') {
      // 쿠리만쥬: 묵직한 지상 배치기와 3타 대지분쇄 강타!
      lungeDist = this.comboStep === 2 ? 1.15 : 0.65;
      if (this.comboStep === 3 && this.isGrounded) {
        this.playerVelY = 5.8;
        this.isGrounded = false;
      }
    } else if (charKey === 'rakko') {
      // 랏코 사부: 초고속 발도 대시(잔상 생성!) + 3타 질풍 공중 십자 일섬!
      lungeDist = this.comboStep === 1 ? 1.55 : this.comboStep === 3 ? 1.85 : 0.95;
      this.spawnDashAfterimage();
      if (this.comboStep === 3 && this.isGrounded) {
        this.playerVelY = 8.4;
        this.isGrounded = false;
      }
    }

    this.playerPos.addScaledVector(forward, lungeDist);

    if (this.playerMesh && this.playerMesh.userData.setExpression) {
      this.playerMesh.userData.setExpression('attack');
    }

    // 2) 캐릭터별 타격 리치(Reach) & 부채꼴 각도(Sector Angle) 정의
    let reach = this.comboStep === 1 ? 5.5 : this.comboStep === 2 ? 5.9 : 6.3;
    let halfArc = this.comboStep === 1 ? Math.PI * 0.4 : this.comboStep === 2 ? Math.PI * 0.35 : Math.PI;

    if (charKey === 'chiikawa' && this.comboStep < 3) {
      // 사스마타 직선 찌르기: 전방 사거리가 더 길다!
      reach = 6.2;
      halfArc = Math.PI * 0.32;
    } else if (charKey === 'kurimanju' && this.comboStep === 3) {
      // 대지분쇄: 넓은 충격파 반경!
      reach = 6.8;
    } else if (charKey === 'rakko') {
      // 토벌 랭킹 1위의 검기 리치!
      reach = this.comboStep === 3 ? 6.8 : 6.2;
      halfArc = this.comboStep === 3 ? Math.PI : Math.PI * 0.48;
    }

    const atkCenter = this.playerPos.clone().add(forward.clone().multiplyScalar(2.45));
    this.spawnCharacterAttackEffect3D(charKey, this.comboStep, atkCenter, this.playerYaw, cfg.accentColor);
    if (window.coop) window.coop.onLocalAttack(this.comboStep, this.playerYaw, atkCenter);

    // 3) 부채꼴 범위 내 잡초 수확 & 보물상자 타격 개봉
    let hitAnything = false;
    this.weeds.forEach(w => {
      if (!w.alive) return;
      const toWeed = w.pos.clone().sub(this.playerPos);
      const dist = Math.hypot(toWeed.x, toWeed.z);
      const ang = Math.abs(this.angleDifference(Math.atan2(toWeed.x, toWeed.z), this.playerYaw));
      if (dist <= reach && ang <= halfArc + 0.22) {
        this.harvestWeed(w);
        this.spawnHitImpactEffect3D(w.pos.clone().add(new THREE.Vector3(0, 0.9, 0)), w.isGolden ? 0xfacc15 : 0x4ade80, w.isGolden);
        hitAnything = true;
      }
    });

    this.chests.forEach(c => {
      if (!c.alive) return;
      const toChest = c.pos.clone().sub(this.playerPos);
      const dist = Math.hypot(toChest.x, toChest.z);
      const ang = Math.abs(this.angleDifference(Math.atan2(toChest.x, toChest.z), this.playerYaw));
      if (dist <= reach && ang <= halfArc + 0.25) {
        this.openFieldChest(c);
        hitAnything = true;
      }
    });

    // 4) 몬스터 정밀 범위(Reach + Hurtbox Radius + Sector Angle) 및 부위별(Part) 판정!
    const buffMult = this.stats.ramenBuffTimer > 0 ? 1.35 : 1.0;
    const weaponBonus = (this.stats.weaponLv - 1) * 9;
    const certBonus = this.stats.certLevel * 6;
    const comboMult = this.comboStep === 3 ? 1.25 : this.comboStep === 2 ? 1.1 : 1.0;
    const NORMAL_ATK_MULT = 0.7; // 평타 데미지 배율
    const baseDmg = (cfg.atk + this.stats.level * 4 + weaponBonus + certBonus) * buffMult * comboMult * NORMAL_ATK_MULT;

    this.monsters.forEach(m => {
      if (!m.alive) return;
      const toMon = m.pos.clone().sub(this.playerPos);
      const dist2D = Math.hypot(toMon.x, toMon.z);
      const effectiveDist = Math.max(0, dist2D - m.bodyRadius);
      const angleToMon = Math.atan2(toMon.x, toMon.z);
      const angDiff = Math.abs(this.angleDifference(angleToMon, this.playerYaw));

      if (effectiveDist <= reach && (angDiff <= halfArc || dist2D < m.bodyRadius + 1.3)) {
        const attackFromAngle = Math.atan2(this.playerPos.x - m.pos.x, this.playerPos.z - m.pos.z);
        const angleFromMonsterFront = Math.abs(this.angleDifference(attackFromAngle, m.facingYaw));
        const isBackAttack = angleFromMonsterFront > Math.PI * 0.62;

        let hitPart = 'body';
        if (wasAirborne || this.comboStep === 2 || this.comboStep === 3) {
          hitPart = 'head';
        } else if (isBackAttack) {
          hitPart = 'back';
        } else if (this.comboStep === 1 && !m.isArmored) {
          hitPart = 'legs';
        } else {
          hitPart = 'body';
        }

        this.damageMonsterPart(m, baseDmg, forward, hitPart, isBackAttack);
        hitAnything = true;
      }
    });

    if (hitAnything) {
      if (this.comboStep === 3 && typeof FXHQ !== 'undefined') FXHQ.fovPunch(2.6, 0.28);
      this.hitStopTimer = 0.042;
      this.camShake = this.comboStep === 3 ? 0.52 : 0.28;
    }
  }

  // 몬스터 부위별(머리 약점 / 백어택 / 다리 둔화 / 장갑 몸통) 데미지 & 3D 타격 이펙트 처리
  damageMonsterPart(m, baseDmg, knockDir, hitPart, isBackAttack) {
    const hurtParts = m.mesh.userData.hurtParts;
    let partMult = 1.0;
    let hitHeightY = m.sizeH * 0.48;
    let badgeText = '';
    let sfxWord = '💥퍽!';
    let textColor = '#ff4d6d';
    let sparkColor = 0xf43f5e;
    let isCrit = false;

    if (hitPart === 'net') {
      // 파티원이 보낸 확정 데미지 (방장에서만 실행)
      partMult = 1.0;
      hitHeightY = m.sizeH * 0.45;
      sparkColor = 0xe2e8f0;
      textColor = '#e2e8f0';
    } else if (hitPart === 'head') {
      partMult = isBackAttack ? 1.7 : 1.5;
      hitHeightY = hurtParts ? hurtParts.head.hitY : m.sizeH * 0.78;
      badgeText = isBackAttack ? '🎯⚡약점+백어택!' : '🎯머리 약점!';
      sfxWord = '⚡콰직!!';
      textColor = '#facc15';
      sparkColor = 0xfacc15;
      isCrit = true;
      m.stunTimer = Math.max(m.stunTimer, 0.75);
    } else if (hitPart === 'back' || isBackAttack) {
      partMult = 1.35;
      hitHeightY = m.sizeH * 0.5;
      badgeText = '⚡후방 백어택!';
      sfxWord = '💥번쩍!!';
      textColor = '#38bdf8';
      sparkColor = 0x38bdf8;
      isCrit = true;
    } else if (hitPart === 'legs') {
      partMult = 1.05;
      hitHeightY = hurtParts ? hurtParts.legs.hitY : m.sizeH * 0.18;
      badgeText = '🦵다리(둔화)!';
      sfxWord = '💫휙!';
      textColor = '#4ade80';
      sparkColor = 0x4ade80;
      m.slowTimer = 3.0;
    } else {
      partMult = m.isArmored ? 0.75 : 1.0;
      hitHeightY = hurtParts ? hurtParts.body.hitY : m.sizeH * 0.45;
      badgeText = m.isArmored ? '🛡️정면 장갑(방어)' : '💥몸통';
      sfxWord = m.isArmored ? '🛡️챙!' : '💥퍽!';
      textColor = m.isArmored ? '#94a3b8' : '#ff4d6d';
      sparkColor = m.isArmored ? 0x94a3b8 : 0xf43f5e;
    }

    // 💥 크리티컬: 낮은 확률(10%)로 데미지 2배 (파티원 전송 데미지는 이미 계산된 값이라 제외)
    const isCritical = hitPart !== 'net' && Math.random() < (this.critChance || 0.1);
    const finalDmg = Math.max(1, Math.round(baseDmg * partMult * (isCritical ? (this.critMult || 2) : 1)));
    if (isCritical) {
      const cp = m.pos.clone().add(new THREE.Vector3(0, hitHeightY, 0));
      if (typeof FXHQ !== 'undefined') {
        FXHQ.hitSpark(cp, 0xff7a1a, true);
        FXHQ.hitSpark(cp, 0xffffff, true);
        FXHQ.shockwave(cp, 0xffb020, 3.2);
      }
      this.camShake = Math.max(this.camShake || 0, 0.38);
      this.hitStopTimer = Math.max(this.hitStopTimer || 0, 0.06);
      if (typeof soundFx !== 'undefined' && soundFx.playCoin) soundFx.playCoin();
    }
    m.hp -= finalDmg;
    if (m.isRaidBoss) {
      if (window.coop) window.coop.onRaidDamage(m, finalDmg);
      // 실제 처치 판정은 방장이 함 → 파티원 화면에서만 체력 1에서 멈춤
      if (!(window.coop && window.coop.isHost())) m.hp = Math.max(1, m.hp);
    } else if (this.partyRole === 'member' && m.netId) {
      if (window.coop) window.coop.onPartyDamage(m, finalDmg);
      m.hp = Math.max(1, m.hp); // 실제 처치 판정은 방장이 함
    }

    if (m.mesh && m.mesh.userData.flashHit) {
      m.mesh.userData.flashHit(hitPart);
    }

    if (knockDir && m.knockbackVel) {
      const kbPower = m.type === 'anoko' ? 5 : 13;
      m.knockbackVel.copy(knockDir).multiplyScalar(hitPart === 'head' ? kbPower * 1.4 : kbPower);
    }

    // 실제로 맞은 부위의 정확한 3D 높이(hitHeightY)에서 입체 3D 타격 임팩트 & 스파크 폭발!
    const exactHitWorldPos = m.pos.clone().add(new THREE.Vector3(0, hitHeightY, 0));
    this.spawnHitImpactEffect3D(exactHitWorldPos, sparkColor, isCrit);
    this.spawnBurstParticles(exactHitWorldPos, sparkColor, isCrit ? 22 : 14);
    if (typeof POLISH !== 'undefined') {
      // 숫자는 크게, 부위는 작은 아이콘으로 (머리 🎯 · 백어택 ⚡ · 다리 🦵 · 장갑 🛡️)
      const isArmorBody = hitPart === 'body' && m.isArmored;
      const partKey = isArmorBody ? 'armor' : (isBackAttack && hitPart !== 'head' ? 'back' : hitPart);
      const numColor = partKey === 'back' ? '#7dd3fc' : partKey === 'legs' ? '#bbf7d0' : null;
      POLISH.damageNumber(this.camera, exactHitWorldPos.clone().add(new THREE.Vector3(0, 0.8, 0)), finalDmg, {
        crit: isCrit, part: partKey, color: isCritical ? null : numColor, weak: isArmorBody && !isCritical, critical: isCritical
      });
    } else {
      this.spawnFloatingText(
        exactHitWorldPos.clone().add(new THREE.Vector3((Math.random() - 0.5) * 1.2, 0.6, 0)),
        `${sfxWord} ${badgeText} -${finalDmg}`,
        textColor
      );
    }

    const bs = m.baseScale || 1;
    m.mesh.scale.set(bs * 1.24, bs * 0.8, bs * 1.24);

    if (m.hp <= 0 && !m.isRaidBoss && !(this.partyRole === 'member' && m.netId)) {
      m.hp = 0;
      m.alive = false;
      m.isWindingUp = false;
      m.mesh.visible = false;
      m.labelEl.style.display = 'none';
      if (typeof FXHQ !== 'undefined') FXHQ.deathPoof(m.pos.clone().add(new THREE.Vector3(0, 2.4, 0)), 0xfacc15);
      m.respawnTimer = this.battleState.active ? 9999 : (m.type === 'anoko' ? 15 : 8);

      const nowMs = performance.now();
      if (!this.lastKillFanfareAt || nowMs - this.lastKillFanfareAt > 700) {
        soundFx.playFanfare();
        this.lastKillFanfareAt = nowMs;
      } else {
        soundFx.playCoin();
      }
      this.stats.monstersDefeated++;
      if (this.battleState.active) {
        this.battleState.killedMonsters = (this.battleState.killedMonsters || 0) + 1;
      }
      this.addReward(m.coin, m.exp, 'monster');
      this.spawnHitImpactEffect3D(m.pos.clone().add(new THREE.Vector3(0, 2.5, 0)), 0xfacc15, true);
      this.spawnBurstParticles(m.pos.clone().add(new THREE.Vector3(0, 2.5, 0)), 0xfacc15, 28);
      this.spawnFloatingText(
        m.pos.clone().add(new THREE.Vector3(0, 4.2, 0)),
        `🎉 토벌 성공! +${m.coin}🪙 +${m.exp}EXP`,
        '#facc15'
      );
      this.updateBattleStageHud();
      this.checkStageClearCondition();
    } else {
      const pct = Math.max(0, (m.hp / m.maxHp) * 100);
      m.hpFillEl.style.width = `${pct}%`;
      this.updateBattleStageHud();
    }
  }

  // 🌟 6인 캐릭터별 고유 3D 검기 / 찌르기 창기 / 회오리 / 대폭발 / 십자 일섬 이펙트 생성기
  spawnCharacterAttackEffect3D(charKey, comboStep, center, yaw, accentColor) {
    if (charKey === 'chiikawa') {
      // [치이카와] 1타: 핑크 스피어 찌르기 콘 / 2타: 연속 쌍찌르기 스피어 / 3타: 핑크 스타 내려찍기 충격파!
      if (comboStep === 1 || comboStep === 2) {
        const count = comboStep === 2 ? 2 : 1;
        for (let i = 0; i < count; i++) {
          const spearGroup = new THREE.Group();
          const coneGeo = new THREE.ConeGeometry(0.95 - i * 0.15, 4.2, 12, 1, true);
          coneGeo.rotateX(Math.PI / 2);
          const coneMat = new THREE.MeshBasicMaterial({
            color: i === 0 ? 0xff85a2 : 0xfef08a,
            transparent: true,
            opacity: 0.88,
            side: THREE.DoubleSide,
            depthWrite: false
          });
          const cone = new THREE.Mesh(coneGeo, coneMat);
          spearGroup.add(cone);

          const coreGeo = new THREE.ConeGeometry(0.45, 4.6, 8);
          coreGeo.rotateX(Math.PI / 2);
          const core = new THREE.Mesh(coreGeo, new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.9,
            depthWrite: false
          }));
          spearGroup.add(core);

          spearGroup.position.copy(center);
          spearGroup.position.y = 1.6 + i * 0.45;
          spearGroup.rotation.y = yaw + (i === 1 ? 0.14 : -0.06);
          this.scene.add(spearGroup);
          this.slashArcs.push({ mesh: spearGroup, material: coneMat, life: 0.20, maxLife: 0.20, spin: 0 });
          if (typeof FXHQ !== 'undefined') {
            FXHQ.thrust(this.playerPos, yaw + (i === 1 ? 0.14 : -0.06), i === 0 ? 0xff85a2 : 0xfef08a, 7.2, 1.6 + i * 0.45);
          }
        }
      } else {
        // 3타: 수직 핑크 내려찍기 슬래시 + 핑크 하트 링 폭발!
        this.spawnCrescentSlash(center, yaw, 0xff4d6d, 3, Math.PI * 0.48, 0);
        this.spawnSlashRing(center.clone(), 0xff85a2, 4.8);
      }
      return;
    }

    if (charKey === 'hachiware') {
      // [하치와레] 1타: 와이드 수평 파란 베기 / 2타: 어퍼 대각선 올려베기 / 3타: 이중 파란 토네이도 회오리!
      if (comboStep === 1) {
        this.spawnCrescentSlash(center, yaw, 0x38bdf8, 1, 0, 0);
      } else if (comboStep === 2) {
        this.spawnCrescentSlash(center, yaw, 0x60a5fa, 2, -0.65, 0.55);
      } else {
        // 3타: 플레이어 중심 이중 파란 회오리 스핀!
        this.spawnCrescentSlash(this.playerPos.clone(), yaw, 0x38bdf8, 3, 0.15, 0);
        this.spawnCrescentSlash(this.playerPos.clone().add(new THREE.Vector3(0, 1.2, 0)), yaw + Math.PI, 0xfef08a, 3, -0.15, 0);
        this.spawnSlashRing(this.playerPos.clone(), 0x38bdf8, 5.2);
      }
      return;
    }

    if (charKey === 'usagi') {
      // [우사기] 1타: 초고속 프로펠러 원반 / 2타: 수직 옆돌기 휠 슬래시 / 3타: 공중제비 황금 대폭발!
      if (comboStep === 1) {
        this.spawnCrescentSlash(center, yaw, 0xfacc15, 3, 0.25, 0);
      } else if (comboStep === 2) {
        // 옆돌기 수직 휠!
        this.spawnCrescentSlash(center, yaw, 0xf59e0b, 3, 0, Math.PI * 0.45);
      } else {
        // 3타: 앞공중제비 폭약 대폭발!
        this.spawnCrescentSlash(center, yaw, 0xfacc15, 3, Math.PI * 0.5, 0);
        this.spawnHitImpactEffect3D(center.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xfacc15, true);
        this.spawnSlashRing(center.clone(), 0xf43f5e, 6.2);
        this.spawnBurstParticles(center.clone().add(new THREE.Vector3(0, 1.2, 0)), 0xfacc15, 18);
      }
      return;
    }

    if (charKey === 'momonga') {
      // [모몽가] 1타: 백핸드 보랏빛 리본 / 2타: 양손 X자 떼쓰기 난타 / 3타: 샤랄라 이중 피루엣 오라!
      if (comboStep === 1) {
        this.spawnCrescentSlash(center, yaw + Math.PI, 0xa855f7, 1, -0.2, 0.25);
      } else if (comboStep === 2) {
        this.spawnCrescentSlash(center, yaw, 0xc084fc, 2, 0, 0.55);
        this.spawnCrescentSlash(center, yaw, 0xf472b6, 2, 0, -0.55);
      } else {
        this.spawnCrescentSlash(this.playerPos.clone(), yaw, 0xa855f7, 3, 0.3, 0.2);
        this.spawnCrescentSlash(this.playerPos.clone().add(new THREE.Vector3(0, 1.1, 0)), yaw + Math.PI * 0.5, 0xf472b6, 3, -0.3, -0.2);
        this.spawnSlashRing(this.playerPos.clone(), 0xc084fc, 4.8);
      }
      return;
    }

    if (charKey === 'kurimanju') {
      // [쿠리만쥬] 1타: 묵직한 호박빛 대각선 강타 / 2타: 배치기 충격파 링 / 3타: 대지분쇄 이중 크레이터!
      if (comboStep === 1) {
        this.spawnCrescentSlash(center, yaw, 0xd97706, 1, 0.35, -0.35);
      } else if (comboStep === 2) {
        this.spawnCrescentSlash(center, yaw, 0xf59e0b, 1, 0, 0);
        this.spawnSlashRing(center.clone(), 0xfacc15, 4.6);
      } else {
        this.spawnCrescentSlash(center, yaw, 0xd97706, 3, Math.PI * 0.46, 0);
        this.spawnSlashRing(center.clone(), 0xf59e0b, 6.8);
        this.spawnSlashRing(center.clone(), 0xfef08a, 4.5);
        this.spawnBurstParticles(center.clone().add(new THREE.Vector3(0, 0.8, 0)), 0xf59e0b, 20);
      }
      return;
    }

    // [랏코 사부 (rakko)] 1타: 초고속 수평 발도 일섬 / 2타: X자 쌍검섬 / 3타: 비기 십자(十) 일섬!
    if (comboStep === 1) {
      this.spawnCrescentSlash(center, yaw, 0xf8fafc, 1, 0, 0.08);
      this.spawnSlashRing(center.clone(), 0xfacc15, 3.8);
    } else if (comboStep === 2) {
      // X자 2연참!
      this.spawnCrescentSlash(center, yaw, 0xfacc15, 2, 0, 0.62);
      this.spawnCrescentSlash(center, yaw, 0xf8fafc, 2, 0, -0.62);
    } else {
      // 3타: 거대한 황금·은백 십자(十) 일섬 이펙트!
      this.spawnCrescentSlash(center, yaw, 0xfacc15, 3, 0, 0);
      this.spawnCrescentSlash(center, yaw, 0xf8fafc, 2, Math.PI * 0.48, 0);
      this.spawnHitImpactEffect3D(center.clone().add(new THREE.Vector3(0, 1.6, 0)), 0xfacc15, true);
      this.spawnSlashRing(center.clone(), 0xfacc15, 6.2);
    }
  }

  spawnCrescentSlash(center, yaw, colorHex, comboStep, tiltX = 0, tiltZ = 0) {
    if (typeof FXHQ !== 'undefined') {
      // 기존 '수직 내려찍기' 틸트(≈PI/2)는 새 검기 좌표계에서 전방-상하 평면 슬래시로 변환
      if (Math.abs(tiltX) > 1.0) {
        FXHQ.slash(center, yaw, colorHex, comboStep, 0, Math.PI / 2, { span: Math.PI * 1.05, y: 2.6, dir: 1 });
      } else {
        const spin = comboStep === 3 && Math.abs(tiltZ) < 0.3 && Math.abs(tiltX) < 0.5;
        FXHQ.slash(center, yaw, colorHex, comboStep, tiltX, tiltZ, spin ? {} : { span: Math.PI * 1.0 });
      }
      return;
    }
    const radius = comboStep === 3 ? 5.0 : 3.8;
    const geo = new THREE.RingGeometry(radius * 0.48, radius, 28, 1, -Math.PI * 0.72, Math.PI * 1.44);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.92,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(center);
    mesh.position.y = comboStep === 2 ? 2.1 : 1.3;
    mesh.rotation.y = yaw;
    mesh.rotation.x = tiltX;
    mesh.rotation.z = tiltZ || (comboStep === 2 ? 0.28 : 0);
    this.scene.add(mesh);

    // 외곽 흰색 코어 검기 트레일 추가 (이중 레이어 슬래시 이펙트)
    const innerGeo = new THREE.RingGeometry(radius * 0.74, radius * 0.96, 24, 1, -Math.PI * 0.65, Math.PI * 1.3);
    innerGeo.rotateX(-Math.PI / 2);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
      depthWrite: false
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mesh.add(innerMesh);

    this.slashArcs.push({
      mesh,
      material: mat,
      life: 0.24,
      maxLife: 0.24,
      spin: comboStep === 3 ? 16 : 7
    });
  }

  // 🌟 [Key Q] 6인 캐릭터별 100% 고유한 3D 월드 궁극기 연출 생성기 (공통 기둥 제거, 캐릭터별 독자 연출!)
  spawnUltimateEffect3D(charKey) {
    const center = this.playerPos.clone();
    const fwd = this.ultForward || new THREE.Vector3(Math.sin(this.playerYaw), 0, Math.cos(this.playerYaw)).normalize();

    if (charKey === 'chiikawa') {
      // 🩷 [치이카와] 전방 대지 강타 지점에 핑크 하트·별사탕 분수 폭발!
      const slamSpot = center.clone().add(fwd.clone().multiplyScalar(3.5));
      for (let i = 0; i < 18; i++) {
        const ang = (i / 18) * Math.PI * 2;
        const starMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0xff85a2 : 0xfacc15,
          transparent: true,
          opacity: 0.95
        });
        const star = new THREE.Mesh(new THREE.OctahedronGeometry(0.75, 0), starMat);
        star.position.set(slamSpot.x, 1.5, slamSpot.z);
        this.scene.add(star);
        this.particles.push({
          mesh: star,
          vel: new THREE.Vector3(Math.cos(ang) * 9, 10 + (i % 4) * 3, Math.sin(ang) * 9),
          life: 0.95
        });
      }
    } else if (charKey === 'hachiware') {
      // 💙 [하치와레] 전방 프로펠러 돌진 경로를 따라 연속 소닉붐 충격파 고리 생성!
      for (let i = 0; i < 5; i++) {
        const stepPos = center.clone().add(fwd.clone().multiplyScalar(2.0 + i * 2.4));
        this.spawnCrescentSlash(stepPos, this.playerYaw, i % 2 === 0 ? 0x38bdf8 : 0xfef08a, 3, Math.PI * 0.45, i * 0.6);
      }
    } else if (charKey === 'usagi') {
      // 💛 [우사기] 하늘에서 꽂히는 8방위 폭약 스파크 기둥!
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        const boomPos = center.clone().add(new THREE.Vector3(Math.cos(ang) * 5.2, 1.2, Math.sin(ang) * 5.2));
        this.spawnHitImpactEffect3D(boomPos, i % 2 === 0 ? 0xfacc15 : 0xf43f5e, true);
      }
    } else if (charKey === 'momonga') {
      // 💜 [모몽가] 6m 거대 복실 꼬리가 쓸고 지나가는 보랏빛 회오리 궤적!
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2;
        this.spawnCrescentSlash(
          center.clone().add(new THREE.Vector3(0, 1.0 + (i % 2) * 0.8, 0)),
          ang,
          i % 2 === 0 ? 0xc084fc : 0xf472b6,
          3,
          0.12,
          0
        );
      }
    } else if (charKey === 'kurimanju') {
      // 🧡 [쿠리만쥬] 거대화 기합 오라 & 호박빛 주전자 증기 분출!
      this.spawnSlashRing(center.clone(), 0xf59e0b, 12.0);
      this.spawnBurstParticles(center.clone().add(new THREE.Vector3(0, 3.5, 0)), 0xfacc15, 28);
    } else if (charKey === 'rakko') {
      // ⚔️ [랏코 사부] 삼각 Z자 발도 궤적을 따라 허공에 남는 황금·은백 대검기!
      for (let i = 0; i < 4; i++) {
        const ang = this.playerYaw + (i - 1.5) * 0.55;
        const slashPos = center.clone().add(fwd.clone().multiplyScalar(2.5 + i * 1.8));
        this.spawnCrescentSlash(slashPos, ang, i % 2 === 0 ? 0xfacc15 : 0xf8fafc, 3, (i % 2 === 0 ? 1 : -1) * 0.4, 0.35);
      }
    }
  }

  // 🌟 [Key Q] 6인 캐릭터별 고유 안무·물리 궤적·다단히트 타이밍이 완전히 차별화된 초화려 궁극기 발동!
  // 🧪 HP 물약 [R] (최대 5개 보유, 상점에서 구매)
  usePotion() {
    if (!this.gameStarted || this.isDowned) return;
    const s = this.stats;
    s.potions = Math.max(0, Math.min(5, s.potions | 0));
    if (s.potions <= 0) {
      showToast('🧪 HP 물약이 없어요! 의상실·강화소(상점)에서 살 수 있어요.');
      return;
    }
    if (this.potionCd > 0) return;
    if (s.hp >= s.maxHp) {
      showToast('❤️ 체력이 이미 가득 찼어요!');
      return;
    }
    s.potions--;
    const heal = Math.round(s.maxHp * 0.5);
    s.hp = Math.min(s.maxHp, s.hp + heal);
    this.potionCd = 1.0;
    soundFx.playCoin();
    const p = this.playerPos.clone().add(new THREE.Vector3(0, 2.2, 0));
    if (typeof FXHQ !== 'undefined') {
      FXHQ.burst(p, 0x4ade80, 18);
      FXHQ.shockwave(this.playerPos.clone().setY(0), 0x86efac, 3.5);
    }
    this.spawnFloatingText(this.playerPos.clone().add(new THREE.Vector3(0, 4.2, 0)), `🧪 +${heal} HP (남은 물약 ${s.potions})`, '#4ade80');
    this.updateHud();
    this.saveData();
  }

  // 🎯 캐릭터별 액티브 스킬 [1] [2] [3] (skills_hq.js)
  triggerSkill(slot) {
    if (!this.gameStarted || this.isDowned) return;
    if (typeof SKILLS === 'undefined') return;
    if ((this.ultTimer && this.ultTimer > 0) || this.skillLock > 0) return;
    SKILLS.cast(this, slot);
  }

  triggerSpecialSkill() {
    if (this.isDowned) return;
    if (this.skillLock > 0) return;
    if (this.skillCooldown > 0) {
      showToast(`⏳ 궁극기[Q] 재충전 중입니다! (${this.skillCooldown.toFixed(1)}초)`);
      return;
    }
    this.skillCooldown = this.ultCooldownMax || 30;
    this.camShake = 0.85;
    soundFx.playSkill();

    const charKey = this.activeCharKey;
    const cfg = CHAR_CONFIGS[charKey];

    // 가장 가까운 적 방향으로 자동 조준
    let bestDist = 15.0;
    let targetDir = null;
    for (const m of this.monsters) {
      if (m.alive) {
        const d = m.pos.distanceTo(this.playerPos);
        if (d < bestDist) {
          bestDist = d;
          targetDir = m.pos.clone().sub(this.playerPos);
        }
      }
    }
    if (targetDir && Math.hypot(targetDir.x, targetDir.z) > 0.1) {
      this.playerYaw = Math.atan2(targetDir.x, targetDir.z);
      const rightX = Math.cos(this.camYaw);
      const rightZ = -Math.sin(this.camYaw);
      this.facingFlip = (targetDir.x * rightX + targetDir.z * rightZ) >= 0 ? 1 : -1;
    }

    // 궁극기 전용 모션(comboStep = 99) 1.25초 가동!
    // (주의: comboResetTimer도 1.5초로 설정하여 도중에 comboStep이 0으로 초기화되는 현상 원천 차단!)
    this.comboStep = 99;
    this.maxAttackTime = 1.25;
    this.attackTimer = 1.25;
    this.comboResetTimer = 1.50;
    this.ultTimer = 1.25;
    this.ultDuration = 1.25;
    this.ultForward = new THREE.Vector3(Math.sin(this.playerYaw), 0, Math.cos(this.playerYaw)).normalize();
    this.ultAfterimageTimer = 0;

    showToast(`🌟 [${cfg.name}] 고유 궁극기(Q) 발동: ${cfg.skillName}!!`);

    if (this.playerMesh && this.playerMesh.userData.setExpression) {
      this.playerMesh.userData.setExpression('happy');
    }

    this.spawnUltimateEffect3D(charKey);
    if (window.coop) window.coop.onLocalUlt(this.playerYaw);
    if (typeof FXHQ !== 'undefined') {
      // 🎬 궁극기 컷인: 화면 플래시 + 집중선 + 캐릭터 컷인 배너 + 오라 기둥 + 마법진 + 카메라 줌
      FXHQ.ultimate({
        getPos: () => this.playerPos,
        color: cfg.accentColor,
        duration: 1.25,
        portrait: cfg.portrait,
        portraitTex: typeof loadCleanCharacterTexture === 'function' ? loadCleanCharacterTexture(cfg.portrait) : null,
        name: cfg.name,
        skill: cfg.skillName
      });
    }
    this.spawnFloatingText(
      this.playerPos.clone().add(new THREE.Vector3(0, 5.0, 0)),
      `🌟궁극기 [Q] : ${cfg.skillName}!!`,
      '#fde047'
    );

    this.weeds.forEach(w => {
      if (w.alive && w.pos.distanceTo(this.playerPos) < 16.5) {
        this.harvestWeed(w);
      }
    });

    const buffMult = this.stats.ramenBuffTimer > 0 ? 1.35 : 1.0;
    const weaponBonus = (this.stats.weaponLv - 1) * 18;
    const pulseDmg = Math.round((cfg.atk * 1.5 + this.stats.level * 11 + weaponBonus) * buffMult);

    // 캐릭터별 안무 타이밍에 맞춘 고유 타격 스케줄!
    let hitTimings = [150, 480, 820];
    if (charKey === 'chiikawa') {
      // 기 모으기(0~0.42s) 직후 3.85배 거대 사스마타 대지 강타(520ms) + 여진 폭발(760ms)!
      hitTimings = [500, 680, 880];
    } else if (charKey === 'hachiware') {
      // 프로펠러 드릴 돌진 연속 다단히트!
      hitTimings = [120, 340, 560, 800];
    } else if (charKey === 'usagi') {
      // 로켓 발사(120ms) -> 초고도 메테오 다이브 착지 대폭발(620ms, 820ms)!
      hitTimings = [120, 620, 840];
    } else if (charKey === 'momonga') {
      // 6m 거대 복실 꼬리 360도 대청소 스윕(160ms, 400ms, 640ms)!
      hitTimings = [160, 400, 640];
    } else if (charKey === 'kurimanju') {
      // 2.25배 거인 상태에서 땅바닥 3연속 양손 내리찍기(480ms: 쿵!, 740ms: 쿵!, 980ms: 콰아앙!!)!
      hitTimings = [480, 740, 980];
    } else if (charKey === 'rakko') {
      // 삼각 Z자 1참(160ms), 2참(360ms), 3참(560ms) -> 검집 납도 '찰칵' 최종 일섬 폭발(860ms)!
      hitTimings = [160, 360, 560, 860];
    }

    const perHitDmg = Math.round((pulseDmg * 3 * 10) / hitTimings.length); // 궁극기 10배 위력

    hitTimings.forEach((delayMs, waveIdx) => {
      setTimeout(() => {
        if (!this.gameStarted) return;
        const pCenter = this.playerPos.clone();
        soundFx.playAttack();
        this.camShake = Math.max(this.camShake, waveIdx === hitTimings.length - 1 ? 0.85 : 0.5);
        if (typeof FXHQ !== 'undefined') FXHQ.screenFlash(cfg.accentColor, waveIdx === hitTimings.length - 1 ? 0.2 : 0.08, 160);

        if (charKey === 'chiikawa' && waveIdx === 0) {
          const impactPos = pCenter.clone().add(this.ultForward.clone().multiplyScalar(3.2));
          this.spawnSlashRing(impactPos, 0xff4d6d, 17.5);
          this.spawnHitImpactEffect3D(impactPos.clone().add(new THREE.Vector3(0, 1.5, 0)), 0xff85a2, true);
        } else if (charKey === 'kurimanju') {
          this.spawnSlashRing(pCenter.clone(), 0xd97706, 15.0 + waveIdx * 3.0);
          this.spawnBurstParticles(pCenter.clone().add(new THREE.Vector3(0, 1.0, 0)), 0xfacc15, 24);
          this.spawnFloatingText(pCenter.clone().add(new THREE.Vector3(0, 5.8, 0)), waveIdx === 2 ? '🌋콰아아앙!!' : '💥쿠우웅!!', '#f59e0b');
        } else if (charKey === 'rakko' && waveIdx === hitTimings.length - 1) {
          this.spawnSlashRing(pCenter.clone(), 0xfacc15, 20.0);
          this.spawnFloatingText(pCenter.clone().add(new THREE.Vector3(0, 4.8, 0)), '⚔️납도(納刀)... 천검 일섬!!', '#fef08a');
        } else {
          this.spawnSlashRing(pCenter.clone(), cfg.accentColor, 14.5 + waveIdx * 1.5);
        }

        this.monsters.forEach(m => {
          if (m.alive && m.pos.distanceTo(pCenter) < 18.5) {
            const pushDir = m.pos.clone().sub(pCenter).normalize();
            this.damageMonsterPart(m, perHitDmg, pushDir, 'head', false);
          }
        });
      }, delayMs);
    });

    this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + 45);
    this.updateHud();
  }

  takePhotoSnapshot() {
    soundFx.playFanfare();
    this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2.5, 0)), 0xff85a2, 24);
    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }

    try {
      const dataUrl = this.renderer.domElement.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `chiikawa-3d-town-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
      showToast('📸 찰칵! 3D 치이카와 타운 기념 스냅샷이 PNG 이미지로 저장되었습니다!');
    } catch (e) {
      showToast('📸 찰칵! 귀여운 기념 포즈를 취했습니다!');
    }
  }

  harvestWeed(w) {
    w.alive = false;
    w.mesh.visible = false;
    w.respawnTimer = 6.5 + Math.random() * 5;
    soundFx.playWeedPull();

    const certMult = 1 + this.stats.certLevel * 0.25;
    const hachiBonus = this.activeCharKey === 'hachiware' ? 1.2 : 1.0;
    const coinGain = Math.round((w.isGolden ? 40 : 15) * certMult * hachiBonus);
    const expGain = w.isGolden ? 28 : 14;
    this.stats.weedsPulled++;
    this.addReward(coinGain, expGain, 'weed');

    this.spawnBurstParticles(w.pos.clone().add(new THREE.Vector3(0, 1, 0)), w.isGolden ? 0xfacc15 : 0x4ade80, 12);
    this.spawnFloatingText(
      w.pos.clone().add(new THREE.Vector3(0, 2.2, 0)),
      w.isGolden ? `✨황금초 +${coinGain}🪙` : `🌿제초 +${coinGain}🪙`,
      w.isGolden ? '#facc15' : '#4ade80'
    );
  }

  // ========================================================================
  // 5-2. 몬스터 패턴별 공격 범위 예고(Sector / Line / Circle) & 플레이어 정밀 피격 판정
  // ========================================================================
  spawnMonsterAttackTelegraph(monster, patternType, centerPos, yaw, reach, dmg) {
    monster.isWindingUp = true;
    let mesh = null;
    let duration = patternType === 'circle' ? 1.15 : 0.72;
    const mat = new THREE.MeshBasicMaterial({
      color: patternType === 'line' ? 0xf97316 : 0xef4444,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    });

    if (patternType === 'sector') {
      // 전방 110° 부채꼴 할퀴기 범위 예고
      const arc = Math.PI * 0.62;
      const geo = new THREE.RingGeometry(0.4, reach, 24, 1, Math.PI * 0.5 - arc * 0.5, arc);
      geo.rotateX(-Math.PI / 2);
      mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(centerPos);
      mesh.position.y = 0.14;
      mesh.rotation.y = yaw;
    } else if (patternType === 'line') {
      // 새총 고블린 직선 장거리 사격 레인 예고 (폭 2.0m x 길이 reach)
      const geo = new THREE.PlaneGeometry(2.0, reach);
      geo.translate(0, reach * 0.5, 0);
      geo.rotateX(Math.PI / 2);
      mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(centerPos);
      mesh.position.y = 0.14;
      mesh.rotation.y = yaw;
    } else {
      // 360° 원형 대지 강타 범위 예고
      const geo = new THREE.RingGeometry(0.2, reach, 32);
      geo.rotateX(-Math.PI / 2);
      mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(centerPos);
      mesh.position.y = 0.16;
    }

    if (typeof POLISH !== 'undefined') {
      // ⚠️ 차오르는 경고 장판 + 발동 직전 점멸
      mesh.material.dispose();
      mesh.material = POLISH.telegraphMaterial(patternType, reach, patternType === 'line' ? 0xf97316 : 0xef4444);
      mesh.userData.tele = true;
    } else {
      mesh.scale.set(0.15, 1, 0.15);
    }
    this.scene.add(mesh);

    if (typeof POLISH !== 'undefined' && POLISH.onTelegraph) POLISH.onTelegraph(monster, patternType, centerPos, duration);
    if (this.partyRole === 'host' && window.coop && monster && monster.netId) {
      window.coop.onHostTelegraph(monster, patternType, centerPos, yaw, reach, dmg);
    }
    this.telegraphs.push({
      monster,
      patternType,
      mesh,
      center: centerPos.clone(),
      yaw,
      reach,
      dmg,
      progress: 0,
      duration,
      isLowAttack: patternType !== 'line' // 하단 공격은 점프로 회피 가능!
    });
  }

  // 몬스터 예고 시간이 끝났을 때 플레이어 피격 범위(Hurtbox)와 교차 판정!
  resolveTelegraphAttack(tg) {
    if (tg.monster) tg.monster.isWindingUp = false;
    if (tg.monster && !tg.monster.alive) return; // 공격 전 몬스터가 죽거나 기절하면 취소!
    if (tg.monster && tg.monster.stunTimer > 0) return;

    if (typeof RAIDHQ !== 'undefined' && tg.monster && tg.monster.isRaidBoss) RAIDHQ.impact(this, tg);
    if (!(typeof POLISH !== 'undefined' && POLISH.attackImpact && POLISH.attackImpact(this, tg))) {
      this.spawnBurstParticles(tg.center.clone().add(new THREE.Vector3(0, 0.8, 0)), 0xef4444, 14);
    }
    soundFx.playAttack();

    const toPlayer = this.playerPos.clone().sub(tg.center);
    const dist2D = Math.hypot(toPlayer.x, toPlayer.z);
    const hitDist = dist2D - this.playerHurtRadius;

    let isInsideZone = false;
    let isEdgeGraze = false;

    if (tg.patternType === 'sector') {
      const ang = Math.abs(this.angleDifference(Math.atan2(toPlayer.x, toPlayer.z), tg.yaw));
      if (hitDist <= tg.reach && ang <= Math.PI * 0.32) {
        isInsideZone = true;
        if (hitDist > tg.reach * 0.72 || ang > Math.PI * 0.24) isEdgeGraze = true;
      }
    } else if (tg.patternType === 'line') {
      // 직선 사격 레인 로컬 좌표 변환
      const forwardX = Math.sin(tg.yaw);
      const forwardZ = Math.cos(tg.yaw);
      const rightX = Math.cos(tg.yaw);
      const rightZ = -Math.sin(tg.yaw);
      const projFwd = toPlayer.x * forwardX + toPlayer.z * forwardZ;
      const projSide = Math.abs(toPlayer.x * rightX + toPlayer.z * rightZ);
      if (projFwd >= 0 && projFwd <= tg.reach && projSide <= 1.0 + this.playerHurtRadius) {
        isInsideZone = true;
        if (projSide > 0.85) isEdgeGraze = true;
      }
    } else {
      // 원형 범위
      if (hitDist <= tg.reach) {
        isInsideZone = true;
        if (hitDist > tg.reach * 0.75) isEdgeGraze = true;
      }
    }

    if (!isInsideZone) return;

    // 1) 대시 또는 궁극기 무적 프레임 중이면 -> ✨ JUST DODGE (완벽 회피 보너스)!
    if (this.dashTimer > 0 || (this.ultTimer && this.ultTimer > 0)) {
      soundFx.playCoin();
      this.skillCooldown = Math.max(0, this.skillCooldown - 1.5);
      this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + 8);
      this.spawnFloatingText(this.playerPos.clone().add(new THREE.Vector3(0, 3.5, 0)), '✨JUST DODGE! (완벽 회피)', '#38bdf8');
      this.updateHud();
      return;
    }

    // 2) 하단 공격인데 플레이어가 높게 점프 중(y > 1.35m)이면 -> 🦘 점프 회피!
    if (tg.isLowAttack && this.playerPos.y > 1.35) {
      this.spawnFloatingText(this.playerPos.clone().add(new THREE.Vector3(0, 3.8, 0)), '🦘점프 회피! (하단 회피)', '#facc15');
      return;
    }

    // 피격 직후 무적 시간(0.75초) 동안은 연속 피격 없음
    if (this.invulnTimer > 0) return;
    if (this.isDowned) return;
    // 🫧 치이카와 [2] 눈물 방패: 피해 무효
    if (typeof SKILLS !== 'undefined' && SKILLS.absorbHit(this)) {
      this.invulnTimer = 0.3;
      return;
    }

    // 3) 범위 끝자락에 살짝 걸친 경우 -> 🛡️ 스침 피격 (피해량 50% 경감)!
    const actualDmg = isEdgeGraze ? Math.max(1, Math.round(tg.dmg * 0.5)) : tg.dmg;
    this.stats.hp = Math.max(this.battleState.active ? 0 : 15, this.stats.hp - actualDmg);
    this.camShake = isEdgeGraze ? 0.2 : 0.42;
    this.invulnTimer = 0.75;
    this.hitStopTimer = Math.max(this.hitStopTimer, isEdgeGraze ? 0.03 : 0.06);
    const knockDir = toPlayer.clone().setY(0);
    if (knockDir.lengthSq() < 0.01) knockDir.set(Math.sin(this.playerYaw + Math.PI), 0, Math.cos(this.playerYaw + Math.PI));
    this.playerKnock = knockDir.normalize().multiplyScalar(isEdgeGraze ? 6 : 12);

    if (this.playerMesh && this.playerMesh.userData.triggerJellyBounce) {
      this.playerMesh.userData.triggerJellyBounce(0.42);
    }

    if (typeof POLISH !== 'undefined') {
      POLISH.playerHurt(isEdgeGraze ? 0.55 : 1);
      POLISH.damageNumber(this.camera, this.playerPos.clone().add(new THREE.Vector3(0, 3.4, 0)), actualDmg, { player: true, part: isEdgeGraze ? 'armor' : null });
    } else {
      this.spawnFloatingText(
        this.playerPos.clone().add(new THREE.Vector3(0, 3.2, 0)),
        isEdgeGraze ? `🛡️스침 피격 -${actualDmg}` : `💥정면 피격 -${actualDmg}`,
        isEdgeGraze ? '#fb923c' : '#ef4444'
      );
    }
    this.updateHud();

    // 전투 스테이지/던전에서 HP가 0이 되면 광장으로 긴급 후퇴 및 체력 100% 회복!
    if (this.raidMode || (this.partyRole && this.battleState.active)) {
      if (this.stats.hp <= 0 && window.coop) window.coop.onLocalDowned();
    } else if (this.battleState.active && this.stats.hp <= 0) {
      this.returnToTown(true);
    }
  }

  triggerInteract() {
    // 협동: 쓰러진 동료 옆에서 E → 즉시 부활
    if (window.coop && typeof window.coop.tryReviveNearby === 'function' && window.coop.tryReviveNearby()) return;
    if (!this.nearestInteractable) {
      this.triggerAttack();
      return;
    }

    const item = this.nearestInteractable;
    if (item.type === 'stage_gate') {
      this.clearAllInputKeys();
      openStageSelectModal();
    } else if (item.type === 'ramen') {
      this.clearAllInputKeys();
      openRamenMinigame();
    } else if (item.type === 'shop') {
      this.clearAllInputKeys();
      openCostumeShopModal();
    } else if (item.type === 'weed_exam') {
      this.clearAllInputKeys();
      const cooldownMs = 180000;
      const since = Date.now() - (this.stats.lastWeedExamAt || 0);
      if (this.stats.certLevel >= 3 && since < cooldownMs) {
        const remain = Math.ceil((cooldownMs - since) / 1000);
        showToast(`⏳ 1급 마스터 연습 시험은 ${Math.floor(remain / 60)}분 ${remain % 60}초 후에 다시 볼 수 있어요.`);
        return;
      }
      openWeedExamModal();
    } else if (item.type === 'onsen') {
      soundFx.playFanfare();
      this.stats.hp = this.stats.maxHp;
      this.stats.ramenBuffTimer = Math.max(this.stats.ramenBuffTimer, 45);
      this.updateHud();
      this.spawnBurstParticles(this.playerPos.clone().add(new THREE.Vector3(0, 2, 0)), 0xff85a2, 24);
      this.spawnFloatingText(this.playerPos.clone().add(new THREE.Vector3(0, 3.5, 0)), '🌸온천 힐링! 체력 100% & 활력 버프!', '#ff85a2');
      showToast('🌸 따뜻한 벚꽃 노천온천에서 피로를 풀었습니다! (체력 100% 회복 + 45초 공/이속 버프)');
    } else if (item.type === 'camp') {
      soundFx.playCoin();
      this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + 45);
      this.addReward(45, 30, 'camp');
      this.spawnBurstParticles(this.campPos.clone().add(new THREE.Vector3(0, 1.8, 0)), 0xf97316, 20);
      this.spawnFloatingText(this.playerPos.clone().add(new THREE.Vector3(0, 3.5, 0)), '🍠따끈한 군고구마! +45🪙 & 체력회복', '#facc15');
      showToast('🍠 모닥불에 구운 달콤한 군고구마를 나눠 먹었습니다! (+45 코인 & 체력 회복)');
    } else if (item.type === 'chest') {
      this.openFieldChest(item.target);
    } else if (item.type === 'weed') {
      this.harvestWeed(item.target);
    } else if (item.type === 'npc') {
      this.clearAllInputKeys();
      openNpcDialog(item.target);
    }
  }

  warpToZone(zoneKey) {
    this.clearAllInputKeys();
    if (this.battleState.active) {
      this.battleState.active = false;
      this.battleState.mode = 'none';
      this.clearStageMonsters();
      const stageHud = document.getElementById('battle-stage-hud');
      if (stageHud) stageHud.classList.add('hidden');
    }
    soundFx.playSkill();
    const coords = {
      plaza: [0, 0, 10],
      gate: [26, 0, -18],
      shop: [13, 0, 0],
      weed: [-32, 0, 20],
      ramen: [30, 0, 20],
      pudding: [-26, 0, -25],
      forest: [32, 0, -22],
      onsen: [-68, 0, -60],
      camp: [-82, 0, 56],
      ruins: [108, 0, -64]
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
    if (this.stats.certLevel >= 3) {
      // 이미 1급 마스터: 연습 시험은 소액 보상만 (무한 코인 파밍 방지)
      this.addReward(40, 20, 'exam');
      showToast('👑 1급 마스터의 연습 시험 합격! (+40 코인 · 다음 시험까지 3분)');
      return;
    }
    this.stats.certLevel++;
    this.addReward(150, 90, 'exam');
    showToast(`🏅 축하합니다! [${ranks[this.stats.certLevel]}] 자격증 승급에 합격했습니다! (+150 코인)`);
  }

  updateHud() {
    const cfg = CHAR_CONFIGS[this.activeCharKey];
    const ranks = ['🌱 제초 견습생', '🌿 제초 5급', '🍀 제초 3급', '👑 제초 1급 마스터'];

    const avatarEl = document.getElementById('hud-avatar-img');
    if (avatarEl) avatarEl.src = cfg.portrait;
    const nameEl = document.getElementById('hud-char-name');
    if (nameEl) nameEl.innerText = `${cfg.name} (+${this.stats.weaponLv}강)`;
    const lvEl = document.getElementById('hud-lv-badge');
    if (lvEl) lvEl.innerText = `Lv.${this.stats.level}`;
    const certEl = document.getElementById('hud-cert-badge');
    if (certEl) certEl.innerText = ranks[this.stats.certLevel] || ranks[0];

    const hpPct = Math.max(0, Math.min(100, (this.stats.hp / this.stats.maxHp) * 100));
    const expPct = Math.max(0, Math.min(100, (this.stats.exp / this.stats.maxExp) * 100));
    document.getElementById('hud-hp-fill').style.width = `${hpPct}%`;
    document.getElementById('hud-exp-fill').style.width = `${expPct}%`;

    document.getElementById('hud-coins-val').innerText = this.stats.coins.toLocaleString();
    document.getElementById('hud-weeds-val').innerText = `${this.stats.weedsPulled}포기`;
    document.getElementById('hud-skill-name').innerText = cfg.skillName;
    const atkBtnLabel = document.querySelector('.primary-atk .skill-name');
    if (atkBtnLabel && cfg.attackStyleName) {
      atkBtnLabel.innerText = cfg.attackStyleName;
    }

    this.renderQuestBoard();
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
  // 7. 3D 파티클, 발걸음 먼지, 충격파 링, 플로팅 텍스트 이펙트
  // ========================================================================
  spawnFootstepDust(pos, count = 2) {
    if (typeof POLISH !== 'undefined' && POLISH.dust(pos, count, 1)) return;
    const geo = new THREE.SphereGeometry(0.18, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xe2e8f0,
      transparent: true,
      opacity: 0.65
    });

    for (let i = 0; i < count; i++) {
      const p = new THREE.Mesh(geo, mat);
      p.position.set(
        pos.x + (Math.random() - 0.5) * 0.9,
        pos.y + 0.2,
        pos.z + (Math.random() - 0.5) * 0.9
      );
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 2.2,
        1.5 + Math.random() * 2.0,
        (Math.random() - 0.5) * 2.2
      );
      this.scene.add(p);
      this.particles.push({ mesh: p, vel, life: 0.36, isDust: true });
    }
  }

  spawnSlashRing(center, colorHex, maxRadius) {
    if (typeof FXHQ !== 'undefined') {
      FXHQ.shockwave(center, colorHex, maxRadius);
      return;
    }
    const geo = new THREE.RingGeometry(0.4, 0.95, 32);
    geo.rotateX(-Math.PI / 2);
    const mat = new THREE.MeshBasicMaterial({
      color: colorHex,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.88
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(center);
    mesh.position.y = Math.max(0.3, center.y + 0.5);
    this.scene.add(mesh);

    this.shockwaves.push({
      mesh,
      scale: 1,
      maxScale: maxRadius,
      alpha: 0.9
    });
  }

  spawnBurstParticles(pos, colorHex, count = 14) {
    if (typeof FXHQ !== 'undefined') {
      FXHQ.burst(pos, colorHex, count);
      return;
    }
    const geo = new THREE.OctahedronGeometry(0.26, 0);
    const mat = new THREE.MeshBasicMaterial({ color: colorHex });

    for (let i = 0; i < count; i++) {
      const p = new THREE.Mesh(geo, mat);
      p.position.copy(pos);
      const angle = Math.random() * Math.PI * 2;
      const spd = 4.5 + Math.random() * 9.5;
      const vel = new THREE.Vector3(
        Math.cos(angle) * spd,
        4.5 + Math.random() * 8.5,
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
  // 8. 메인 게임 루프 (Physics, Combat Range Indicators, Skeletal Motion)
  // ========================================================================
  animate() {
    requestAnimationFrame(() => this.animate());

    const rawDelta = this.clock.getDelta();
    let dt = Math.min(rawDelta, 0.05);

    this.updateAdaptiveResolution(rawDelta);
    this.updateEnvironmentFx();

    if (this.hitStopTimer > 0) {
      this.hitStopTimer -= dt;
      dt *= 0.12;
    }

    this.updatePlayer(dt);
    this.updateCombatRangeIndicators();
    this.updateTownNpcs(dt);
    this.updateWeedsAndMonsters(dt);
    this.updateEffects(dt);
    this.updateCamera(dt);
    this.checkNearestInteraction();

    if (this.composer) {
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }

    this.updateProjectedLabels();
    this.drawMinimap();
  }

  updateCombatRangeIndicators() {
    if (!this.combatIndicatorGroup) return;
    this.combatIndicatorGroup.position.set(this.playerPos.x, 0, this.playerPos.z);

    const nextCombo = (this.comboStep % 3) + 1;
    [1, 2, 3].forEach(step => {
      if (this.aimSectorMeshes[step]) {
        this.aimSectorMeshes[step].visible = step === nextCombo;
        this.aimSectorMeshes[step].rotation.y = this.playerYaw;
      }
    });

    if (this.playerHurtRingMesh) {
      if (this.dashTimer > 0 || (this.ultTimer && this.ultTimer > 0)) {
        this.playerHurtRingMesh.material.color.setHex(0x38bdf8);
        this.playerHurtRingMesh.material.opacity = 0.85;
      } else if (!this.isGrounded) {
        this.playerHurtRingMesh.material.color.setHex(0xfacc15);
        this.playerHurtRingMesh.material.opacity = 0.7;
      } else {
        this.playerHurtRingMesh.material.color.setHex(0xffffff);
        this.playerHurtRingMesh.material.opacity = 0.35;
      }
    }
  }

  updatePlayer(dt) {
    // 창 포커스를 잃었거나 모달창이 열려 있으면 즉시 모든 방향키 입력 해제 (유령 눌림 완벽 방지!)
    if (!document.hasFocus() || this.isAnyModalOpen()) {
      this.clearAllInputKeys();
    }

    if (this.attackTimer > 0) this.attackTimer -= dt;
    if (this.comboResetTimer > 0) {
      this.comboResetTimer -= dt;
      if (this.comboResetTimer <= 0) this.comboStep = 0;
    }
    if (this.skillCooldown > 0) this.skillCooldown -= dt;
    if (this.dashCooldown > 0) this.dashCooldown -= dt;
    if (this.potionCd > 0) this.potionCd = Math.max(0, this.potionCd - dt);
    if (this.stats.ramenBuffTimer > 0) {
      this.stats.ramenBuffTimer = Math.max(0, this.stats.ramenBuffTimer - dt);
    }

    // 벚꽃 노천온천 물속에 들어가 있으면 자동으로 체력 지속 회복!
    if (this.onsenPos && this.playerPos.distanceTo(this.onsenPos) < 12.0) {
      this.onsenHealTimer += dt;
      if (this.onsenHealTimer >= 1.2) {
        this.onsenHealTimer = 0;
        if (this.stats.hp < this.stats.maxHp) {
          this.stats.hp = Math.min(this.stats.maxHp, this.stats.hp + 10);
          this.spawnFloatingText(this.playerPos.clone().add(new THREE.Vector3(0, 3.2, 0)), '🌸온천 치유 +10 HP', '#ff85a2');
          this.updateHud();
        }
      }
    }

    let ix = this.joyVec.x;
    let iz = this.joyVec.y;
    if (this.keys['KeyW'] || this.keys['ArrowUp']) iz -= 1;
    if (this.keys['KeyS'] || this.keys['ArrowDown']) iz += 1;
    if (this.keys['KeyA'] || this.keys['ArrowLeft']) ix -= 1;
    if (this.keys['KeyD'] || this.keys['ArrowRight']) ix += 1;

    if (this.isDowned) {
      ix = 0;
      iz = 0;
    }

    const cfg = CHAR_CONFIGS[this.activeCharKey];
    const buffMult = this.stats.ramenBuffTimer > 0 ? 1.28 : 1.0;
    const moveSpeed = cfg.speed * buffMult;

    // 🌟 궁극기(Q) 발동 중 캐릭터별 고유 물리 이동 궤적 연출 (dashTimer와 완전히 분리!)
    if (this.ultTimer && this.ultTimer > 0) {
      this.ultTimer = Math.max(0, this.ultTimer - dt);
      const uProg = 1.0 - this.ultTimer / (this.ultDuration || 1.25);
      const fwd = this.ultForward || new THREE.Vector3(0, 0, -1);
      const right = new THREE.Vector3(fwd.z, 0, -fwd.x);

      if (this.activeCharKey === 'chiikawa') {
        // 치이카와: 0~0.42초 제자리 기 모으기 후 0.42~0.68초에 전방 점프 강타!
        if (uProg >= 0.42 && uProg <= 0.68) {
          this.playerPos.addScaledVector(fwd, moveSpeed * 1.15 * dt);
        }
      } else if (this.activeCharKey === 'hachiware') {
        // 하치와레: 프로펠러 사스마타를 돌리며 0~0.75초 동안 전방 고속 드릴 질주!
        if (uProg < 0.75) {
          this.playerPos.addScaledVector(fwd, moveSpeed * 1.85 * dt);
        }
      } else if (this.activeCharKey === 'usagi') {
        // 우사기: 로켓 점프 후 전방으로 메테오 다이브 강하!
        if (uProg < 0.70) {
          this.playerPos.addScaledVector(fwd, moveSpeed * 0.95 * dt);
        }
      } else if (this.activeCharKey === 'momonga') {
        // 모몽가: 좌우로 지그재그 생떼 스텝을 밟으며 6m 거대 복실 꼬리 휘두르기!
        if (uProg < 0.70) {
          this.playerPos.addScaledVector(right, Math.sin(uProg * Math.PI * 10) * moveSpeed * 0.75 * dt);
          this.playerPos.addScaledVector(fwd, moveSpeed * 0.45 * dt);
        }
      } else if (this.activeCharKey === 'kurimanju') {
        // 쿠리만쥬: 0.34초 거대화 이후 묵직한 타이탄 전진 스매시!
        if (uProg >= 0.34 && uProg <= 0.90) {
          this.playerPos.addScaledVector(fwd, moveSpeed * 0.75 * dt);
        }
      } else if (this.activeCharKey === 'rakko') {
        // 랏코 사부: 0~0.64초 동안 전광석화 삼각 Z자 섬광 이동(잔상 생성), 0.64초 이후 미동 없는 납도 정지 포즈!
        if (uProg < 0.64) {
          const stage = (uProg / 0.64) * 3;
          let stepDir = fwd.clone();
          if (stage < 1) stepDir.addScaledVector(right, -0.85).normalize();
          else if (stage < 2) stepDir.addScaledVector(right, 1.15).normalize();
          else stepDir.addScaledVector(right, -0.35).normalize();
          this.playerPos.addScaledVector(stepDir, moveSpeed * 2.4 * dt);

          this.ultAfterimageTimer = (this.ultAfterimageTimer || 0) - dt;
          if (this.ultAfterimageTimer <= 0) {
            this.ultAfterimageTimer = 0.065;
            this.spawnDashAfterimage();
          }
        }
      }
    }

    // 🎯 액티브 스킬 타임라인 / 이동 / 쿨타임 (로컬 + 협동 원격 재생)
    if (typeof SKILLS !== 'undefined') SKILLS.update(this, dt);

    if (this.dashTimer > 0) {
      this.dashTimer -= dt;
      this.playerPos.addScaledVector(this.dashDir, moveSpeed * 2.6 * dt);
      this.dashGhostSpawnTimer -= dt;
      if (this.dashGhostSpawnTimer <= 0) {
        this.dashGhostSpawnTimer = 0.055;
        this.spawnDashAfterimage();
      }
    }

    const isMoving = Math.hypot(ix, iz) > 0.05;
    if (isMoving) {
      const len = Math.hypot(ix, iz);
      ix /= len;
      iz /= len;

      if (Math.abs(ix) > 0.1) {
        this.facingFlip = ix > 0 ? 1 : -1;
      }

      const forwardX = -Math.sin(this.camYaw);
      const forwardZ = -Math.cos(this.camYaw);
      const rightX = Math.cos(this.camYaw);
      const rightZ = -Math.sin(this.camYaw);

      const moveX = rightX * ix + forwardX * (-iz);
      const moveZ = rightZ * ix + forwardZ * (-iz);

      if (this.dashTimer <= 0 && (!this.ultTimer || this.ultTimer <= 0) && !(this.skillLock > 0)) {
        this.playerVel.x = THREE.MathUtils.lerp(this.playerVel.x, moveX * moveSpeed, dt * 16);
        this.playerVel.z = THREE.MathUtils.lerp(this.playerVel.z, moveZ * moveSpeed, dt * 16);
        this.playerPos.x += this.playerVel.x * dt;
        this.playerPos.z += this.playerVel.z * dt;
      }

      this.playerYaw = Math.atan2(moveX, moveZ);
      this.walkTime += dt * 16;

      this.footstepTimer -= dt;
      if (this.isGrounded && this.footstepTimer <= 0) {
        this.footstepTimer = 0.18;
        this.spawnFootstepDust(this.playerPos, 1);
      }
    } else {
      this.playerVel.x = THREE.MathUtils.lerp(this.playerVel.x, 0, dt * 22);
      this.playerVel.z = THREE.MathUtils.lerp(this.playerVel.z, 0, dt * 22);
      if (Math.hypot(this.playerVel.x, this.playerVel.z) < 0.08) {
        this.playerVel.set(0, 0, 0);
      } else {
        this.playerPos.x += this.playerVel.x * dt;
        this.playerPos.z += this.playerVel.z * dt;
      }
      this.walkTime = 0;
    }

    // 피격 넉백 & 무적 시간
    if (this.invulnTimer > 0) this.invulnTimer -= dt;
    if (this.playerKnock && this.playerKnock.lengthSq() > 0.01) {
      this.playerPos.addScaledVector(this.playerKnock, dt);
      this.playerKnock.multiplyScalar(Math.exp(-dt * 9));
    }

    // ⚔️ 전진 돌파형 토벌 가도(250m) 경계 제한 & 실시간 웨이브 증원 / 다음 구역 진격 트리거
    if (this.battleState.active && this.battleState.sectors) {
      const prevSec = Math.floor(this.battleState.elapsedTime || 0);
      this.battleState.elapsedTime = (this.battleState.elapsedTime || 0) + dt;
      if (Math.floor(this.battleState.elapsedTime) !== prevSec) {
        this.updateBattleStageHud();
      }

      const curSecIdx = this.battleState.currentSectorIdx;
      const curSec = this.battleState.sectors[curSecIdx];

      // 1) 구역 교전 중 일정 시간(8.5초)마다 남은 증원 웨이브가 쉴 새 없이 전방에서 추가 돌격!
      if (this.partyRole !== 'member' && curSec && !this.battleState.waitingAdvance && this.battleState.currentWaveIdx + 1 < curSec.waves.length) {
        this.battleState.waveSpawnTimer -= dt;
        if (this.battleState.waveSpawnTimer <= 0) {
          this.battleState.currentWaveIdx++;
          this.battleState.waveSpawnTimer = 8.5;
          const nextWaveMobs = curSec.waves[this.battleState.currentWaveIdx];
          this.spawnSectorWaveMonsters(nextWaveMobs, curSec.localZ - 6, true);
          soundFx.playAttack();
          showToast(`🔥 [적군 연속 증원!!] 제 ${curSec.sectorNum}구역 전방에서 증원 부대(${nextWaveMobs.length}마리)가 몰려옵니다!`);
          this.updateBattleStageHud();
        }
      }

      // 2) 현재 구역을 클리어한 상태(waitingAdvance)에서 플레이어가 전방(다음 구역)으로 전진하면 즉시 다음 구역 개시!
      const localZ = this.playerPos.z - this.arenaCenter.z;
      if (this.partyRole !== 'member' && this.battleState.waitingAdvance && curSecIdx + 1 < this.battleState.sectors.length) {
        const nextSec = this.battleState.sectors[curSecIdx + 1];
        const advZ = this.partyRole === 'host' && window.coop ? Math.min(localZ, window.coop.partyMinLocalZ()) : localZ;
        if (advZ <= curSec.barrierLocalZ + 12) {
          this.battleState.currentSectorIdx++;
          this.battleState.currentWaveIdx = 0;
          this.battleState.waitingAdvance = false;
          this.battleState.waveSpawnTimer = 8.5;
          this.spawnSectorWaveMonsters(nextSec.waves[0], nextSec.localZ, false);
          this.updateArenaBarrierVisual();
          this.updateBattleStageHud();
          soundFx.playFanfare();
          if (nextSec.sectorNum === 5) {
            showToast(`👑 [최종 제 5구역: 보스 성소 진입!!] 수문장/보스와 친위대 군단을 모두 토벌하세요!`);
          } else {
            showToast(`⚔️ [제 ${nextSec.sectorNum}/5 구역 돌입!] 전방 매복 괴수 무리가 일제히 덮쳐옵니다!`);
          }
        }
      }

      // 3) 진격로 좌우 성벽(폭 ±16.2m, 보스 성소는 ±23.5m) 및 전방 결계선 충돌 제한
      const maxHalfWidth = localZ < -176 ? 23.5 : 16.2;
      const dx = this.playerPos.x - this.arenaCenter.x;
      if (Math.abs(dx) > maxHalfWidth) {
        this.playerPos.x = this.arenaCenter.x + Math.sign(dx) * maxHalfWidth;
      }

      const activeSec = this.battleState.sectors[this.battleState.currentSectorIdx];
      const nextSec = this.battleState.sectors[Math.min(this.battleState.sectors.length - 1, this.battleState.currentSectorIdx + 1)];
      const minLocalZ = this.battleState.waitingAdvance ? nextSec.barrierLocalZ + 1.5 : activeSec.barrierLocalZ + 1.5;
      const maxLocalZ = 18.0;

      if (localZ > maxLocalZ) {
        this.playerPos.z = this.arenaCenter.z + maxLocalZ;
      } else if (localZ < minLocalZ) {
        this.playerPos.z = this.arenaCenter.z + minLocalZ;
      }
    } else if (this.raidMode) {
      // 🐉 레이드: 전용 원형 투기장 경계 (중심 0, -820 / 반경 46m)
      const RCZ = -820, RR = 46;
      const rdx = this.playerPos.x;
      const rdz = this.playerPos.z - RCZ;
      const rd = Math.hypot(rdx, rdz);
      if (rd > RR) {
        this.playerPos.x = (rdx / rd) * RR;
        this.playerPos.z = RCZ + (rdz / rd) * RR;
      }
    } else {
      const distFromOrigin = Math.hypot(this.playerPos.x, this.playerPos.z);
      if (distFromOrigin > 220) {
        const scale = 220 / distFromOrigin;
        this.playerPos.x *= scale;
        this.playerPos.z *= scale;
      }
    }

    const wasGrounded = this.isGrounded;
    this.playerPos.y += this.playerVelY * dt;
    this.playerVelY -= 48 * dt;

    let groundHeight = 0;
    const checkPuddingBounce = (pPos, pMesh) => {
      if (!pPos) return;
      const distToP = Math.hypot(this.playerPos.x - pPos.x, this.playerPos.z - pPos.z);
      if (distToP < 6.2 && this.playerPos.y >= 4.2) {
        groundHeight = 5.6;
        if (this.playerVelY < 0 && this.playerPos.y <= 5.8) {
          this.playerVelY = 26;
          soundFx.playJump();
          if (pMesh) pMesh.scale.set(1.18, 0.8, 1.18);
          if (this.stats.puddingClimbed === 0) {
            this.stats.puddingClimbed = 1;
            this.addReward(100, 60, 'pudding');
            showToast('🍮 자이언트 푸딩 정상 등반 성공!! 통통 트램펄린 보너스 (+100 코인) 획득!');
          }
        }
      }
    };

    checkPuddingBounce(this.puddingPos, this.puddingMesh);
    checkPuddingBounce(this.pudding2Pos, this.pudding2Mesh);
    // ☁️ 점프 타워 발판
    if (typeof WORLDX !== 'undefined') groundHeight = Math.max(groundHeight, WORLDX.support(this, dt));

    if (this.puddingMesh) this.puddingMesh.scale.lerp(new THREE.Vector3(1, 1, 1), dt * 8);
    if (this.pudding2Mesh) this.pudding2Mesh.scale.lerp(new THREE.Vector3(1, 1, 1), dt * 8);

    if (this.playerPos.y <= groundHeight) {
      this.playerPos.y = groundHeight;
      this.playerVelY = 0;
      this.isGrounded = true;

      if (!wasGrounded && this.playerMesh && this.playerMesh.userData.triggerJellyBounce) {
        this.playerMesh.userData.triggerJellyBounce(0.38);
        if (typeof POLISH !== 'undefined') POLISH.landing(this.playerPos, 1);
        else this.spawnFootstepDust(this.playerPos, 4);
      }
    }

    if (this.playerMesh) {
      const hopY = isMoving && this.isGrounded ? Math.abs(Math.sin(this.walkTime)) * 0.28 : 0;
      this.playerMesh.position.set(this.playerPos.x, this.playerPos.y + hopY, this.playerPos.z);

      this.playerMesh.rotation.y = this.camYaw;
      this.playerMesh.scale.lerp(new THREE.Vector3(1, 1, 1), dt * 12);

      this.currentFlipScale = THREE.MathUtils.lerp(this.currentFlipScale, this.facingFlip, dt * 16);

      const parts = this.playerMesh.userData.parts;
      if (parts && parts.standeeGroup) {
        const waddleTilt = isMoving && this.attackTimer <= 0 ? Math.sin(this.walkTime) * 0.08 : 0;
        parts.standeeGroup.rotation.z = waddleTilt;
        parts.standeeGroup.scale.x = this.currentFlipScale;
      }

      if (this.playerMesh.userData.updateMotion) {
        this.playerMesh.userData.updateMotion(
          this.clock.elapsedTime,
          this.walkTime,
          isMoving,
          this.isGrounded,
          this.playerVelY,
          this.attackTimer,
          this.comboStep,
          this.maxAttackTime || 0.28
        );
      }
      // 스킬 모션은 기본 모션 위에 덮어쓰기
      if (this.skillAnim && typeof SKILLS !== 'undefined') SKILLS.applyPose(this.playerMesh, this.skillAnim);

      // 무적 시간 동안 캐릭터 깜빡임
      if (parts && parts.standeeGroup) {
        parts.standeeGroup.visible = !(this.invulnTimer > 0 && Math.floor(this.clock.elapsedTime * 18) % 2 === 0);
      }
      // 카메라 반대쪽(앞쪽)으로 걸어가면 뒷모습
      if (this.playerMesh.userData.setBackView) {
        const walkingAway = isMoving && iz < -0.55 && this.attackTimer <= 0 && !(this.ultTimer > 0) && this.dashTimer <= 0 && !this.skillAnim;
        this.playerMesh.userData.setBackView(walkingAway);
      }
    }
  }

  updateTownNpcs(dt) {
    this.npcs.forEach((npc, idx) => {
      npc.walkPhase += dt * 7.5;
      npc.speechTimer -= dt;

      if (npc.speechTimer <= 0) {
        npc.speechTimer = 8 + Math.random() * 8;
        const quote = npc.cfg.quotes[Math.floor(Math.random() * npc.cfg.quotes.length)];
        npc.speechEl.innerText = quote;
        npc.speechEl.style.display = 'block';
        setTimeout(() => {
          npc.speechEl.style.display = 'none';
        }, 3800);
      }

      const a = this.clock.elapsedTime * 0.45 + idx * 1.5;
      const tx = npc.homePos.x + Math.cos(a) * 2.2;
      const tz = npc.homePos.z + Math.sin(a) * 2.2;
      npc.pos.x = THREE.MathUtils.lerp(npc.pos.x, tx, dt * 3);
      npc.pos.z = THREE.MathUtils.lerp(npc.pos.z, tz, dt * 3);

      const hop = Math.abs(Math.sin(npc.walkPhase * 0.5)) * 0.14;
      npc.mesh.position.set(npc.pos.x, hop, npc.pos.z);
      npc.mesh.rotation.y = this.camYaw;

      if (npc.mesh.userData.updateMotion) {
        npc.mesh.userData.updateMotion(
          this.clock.elapsedTime + idx,
          npc.walkPhase,
          true,
          true,
          0,
          0,
          0
        );
      }
    });
  }

  updateWeedsAndMonsters(dt) {
    if (typeof WORLDX !== 'undefined') WORLDX.update(this, dt);
    if (this.instancedGrass && this.instancedGrass.userData.updateWind) {
      this.instancedGrass.userData.updateWind(this.clock.elapsedTime);
    }

    if (this.waterTexture) {
      this.waterTexture.offset.x -= dt * 0.25;
    }
    if (this.fountainMesh && this.fountainMesh.userData.topStar) {
      this.fountainMesh.userData.topStar.rotation.y += dt * 1.8;
    }
    if (this.portalGateMesh && this.portalGateMesh.userData.portalPivot) {
      this.portalGateMesh.userData.portalPivot.rotation.z += dt * 1.6;
    }
    if (this.windmillMesh && this.windmillMesh.userData.bladesPivot) {
      this.windmillMesh.userData.bladesPivot.rotation.z -= dt * 1.1;
    }
    if (this.windmill2Mesh && this.windmill2Mesh.userData.bladesPivot) {
      this.windmill2Mesh.userData.bladesPivot.rotation.z -= dt * 1.25;
    }
    if (this.campsiteMesh && this.campsiteMesh.userData.flameOuter) {
      const fScale = 0.92 + Math.sin(this.clock.elapsedTime * 14) * 0.14;
      this.campsiteMesh.userData.flameOuter.scale.set(fScale, 1 + (1 - fScale), fScale);
    }

    this.clouds.forEach(c => {
      c.position.x += dt * 1.2;
      if (c.position.x > 470) c.position.x = -470;
    });

    this.weatherParticles.forEach(wp => {
      wp.phase += dt * 2.0;
      wp.mesh.position.y -= wp.speedY * dt;
      wp.mesh.position.x += Math.sin(wp.phase) * 1.2 * dt + wp.driftX * dt;
      wp.mesh.rotation.x += dt * 2;
      wp.mesh.rotation.z += dt * 2;

      if (wp.mesh.position.y < 0.2) {
        wp.mesh.position.y = 24 + Math.random() * 6;
        wp.mesh.position.x = this.playerPos.x + (Math.random() - 0.5) * 90;
        wp.mesh.position.z = this.playerPos.z + (Math.random() - 0.5) * 90;
      }
    });

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

    this.chests.forEach((c, idx) => {
      if (!c.alive) {
        c.respawnTimer -= dt;
        if (c.respawnTimer <= 0) {
          c.alive = true;
          c.mesh.visible = true;
        }
      } else if (c.isCrystal) {
        c.mesh.rotation.y = this.clock.elapsedTime * 1.2 + idx;
      }
    });

    let closestMonster = null;
    let closestDist = 11.0;
    for (const m of this.monsters) {
      if (m.alive) {
        const d = m.pos.distanceTo(this.playerPos);
        if (d < closestDist) {
          closestDist = d;
          closestMonster = m;
        }
      }
    }

    this.monsters.forEach((m, idx) => {
      if (!m.alive) {
        if (!this.battleState.active) {
          m.respawnTimer -= dt;
          if (m.respawnTimer <= 0) {
            m.alive = true;
            m.hp = m.maxHp;
            m.pos.copy(m.homePos);
            m.mesh.position.copy(m.pos);
            m.mesh.visible = true;
            m.labelEl.style.display = 'block';
            m.hpFillEl.style.width = '100%';
            m.slowTimer = 0;
            m.stunTimer = 0;
            m.isWindingUp = false;
          }
        }
        return;
      }

      if (m.isRaidBoss) {
        if (window.coop) window.coop.updateRaidBoss(m, dt);
        return;
      }
      if (this.partyRole === 'member' && m.netId) {
        if (window.coop) window.coop.updatePartyMonster(m, dt);
        return;
      }

      if (m.mesh.userData.weakPointMarker) {
        m.mesh.userData.weakPointMarker.visible = m === closestMonster;
      }

      if (m.stunTimer > 0) m.stunTimer = Math.max(0, m.stunTimer - dt);
      if (m.slowTimer > 0) m.slowTimer = Math.max(0, m.slowTimer - dt);
      if (m.statusEl) {
        if (m.stunTimer > 0) m.statusEl.innerText = '💫약점경직';
        else if (m.slowTimer > 0) m.statusEl.innerText = '🐢다리둔화';
        else m.statusEl.innerText = '';
      }

      if (m.knockbackVel.lengthSq() > 0.05) {
        m.pos.addScaledVector(m.knockbackVel, dt);
        m.knockbackVel.multiplyScalar(Math.max(0, 1 - dt * 10));
      }

      // 전진형 토벌 가도 내부일 때 몬스터가 좌우 성벽 밖으로 밀려나지 않도록 고정
      if (this.battleState.active) {
        const mdx = m.pos.x - this.arenaCenter.x;
        const mLocalZ = m.pos.z - this.arenaCenter.z;
        const maxMWidth = mLocalZ < -176 ? 23.0 : 15.8;
        if (Math.abs(mdx) > maxMWidth) {
          m.pos.x = this.arenaCenter.x + Math.sign(mdx) * maxMWidth;
        }
        if (mLocalZ > 18.0) m.pos.z = this.arenaCenter.z + 18.0;
        if (mLocalZ < -225.0) m.pos.z = this.arenaCenter.z - 225.0;
      }

      const bs = m.baseScale || 1;
      m.mesh.scale.lerp(new THREE.Vector3(bs, bs, bs), dt * 9);
      m.mesh.rotation.y = this.camYaw;
      if (m.atkCooldown > 0) m.atkCooldown -= dt;

      const tgtPos = this.partyRole === 'host' && window.coop ? window.coop.nearestPartyPos(m.pos) : this.playerPos;
      const distToPlayer = m.pos.distanceTo(tgtPos);
      const isChasing = (this.battleState.active || distToPlayer < 19) && m.stunTimer <= 0;

      if (m.mesh.userData.updateMonsterMotion) {
        m.mesh.userData.updateMonsterMotion(this.clock.elapsedTime, isChasing, idx * 1.7, m.facingYaw);
      }

      if (m.stunTimer > 0) {
        m.mesh.position.set(m.pos.x, 0, m.pos.z);
        return;
      }

      if (isChasing) {
        const dir = tgtPos.clone().sub(m.pos);
        dir.y = 0;
        const dist = dir.length();

        if (!m.isWindingUp && dist > 0.1) {
          const targetYaw = Math.atan2(dir.x, dir.z);
          const diff = this.angleDifference(targetYaw, m.facingYaw);
          m.facingYaw += diff * Math.min(1, dt * 5.5);
        }

        const triggerDist = m.atkPattern === 'line' ? 8.5 : m.reach * 0.82;
        if (dist > triggerDist && !m.isWindingUp) {
          dir.normalize();
          const slowMult = m.slowTimer > 0 ? 0.5 : 1.0;
          m.pos.addScaledVector(dir, dt * 6.8 * slowMult);
          const hop = Math.abs(Math.sin(this.clock.elapsedTime * 7 + idx)) * 0.25;
          m.mesh.position.set(m.pos.x, hop, m.pos.z);
        } else if (m.atkCooldown <= 0 && !m.isWindingUp) {
          m.atkCooldown = m.isBoss ? 2.2 : 2.0;
          const center = m.pos.clone();
          this.spawnMonsterAttackTelegraph(m, m.atkPattern, center, m.facingYaw, m.reach, m.atk);
        }
      } else {
        const dirHome = m.homePos.clone().sub(m.pos);
        if (dirHome.length() > 1.5) {
          dirHome.normalize();
          m.facingYaw = Math.atan2(dirHome.x, dirHome.z);
          m.pos.addScaledVector(dirHome, dt * 4);
        }
        m.mesh.position.set(m.pos.x, 0, m.pos.z);
      }
    });
  }

  updateEffects(dt) {
    if (typeof FXHQ !== 'undefined') FXHQ.update(dt);
    if (typeof POLISH !== 'undefined') POLISH.update(this, dt);
    if (typeof RAIDHQ !== 'undefined') RAIDHQ.update(this, dt);
    if (window.coop) window.coop.update(dt);
    // 💥 3D 입체 타격 임팩트 스타버스트 애니메이션
    for (let i = this.hitBursts.length - 1; i >= 0; i--) {
      const hb = this.hitBursts[i];
      hb.life -= dt;
      const ratio = 1 - Math.max(0, hb.life / hb.maxLife);
      const curScale = THREE.MathUtils.lerp(0.25, hb.targetScale, Math.sin(ratio * Math.PI * 0.5));
      hb.mesh.scale.setScalar(curScale);
      hb.mesh.rotation.y = this.camYaw;
      hb.mesh.rotation.z += dt * hb.spinSpeed;
      if (hb.mesh.userData.mats) {
        hb.mesh.userData.mats.forEach(mat => {
          mat.opacity = Math.max(0, (hb.life / hb.maxLife) * 0.95);
        });
      }
      if (hb.life <= 0) {
        this.scene.remove(hb.mesh);
        this.hitBursts.splice(i, 1);
      }
    }

    for (let i = this.afterimages.length - 1; i >= 0; i--) {
      const ai = this.afterimages[i];
      ai.life -= dt;
      ai.mesh.material.opacity = Math.max(0, (ai.life / ai.maxLife) * 0.55);
      if (ai.life <= 0) {
        this.scene.remove(ai.mesh);
        this.afterimages.splice(i, 1);
      }
    }

    for (let i = this.slashArcs.length - 1; i >= 0; i--) {
      const sa = this.slashArcs[i];
      sa.life -= dt;
      sa.mesh.rotation.y += dt * sa.spin;
      sa.mesh.scale.addScalar(dt * 2.5);
      const op = Math.max(0, sa.life / sa.maxLife);
      if (sa.material) sa.material.opacity = op;
      if (sa.mesh.material) sa.mesh.material.opacity = op;
      if (sa.life <= 0) {
        this.scene.remove(sa.mesh);
        this.slashArcs.splice(i, 1);
      }
    }

    for (let i = this.telegraphs.length - 1; i >= 0; i--) {
      const tg = this.telegraphs[i];
      if (!tg) continue; // 피격으로 스테이지가 끝나 목록이 비워진 경우
      tg.progress += dt;
      const ratio = Math.min(1, tg.progress / tg.duration);
      if (tg.mesh.userData.tele) {
        tg.mesh.material.uniforms.uProg.value = ratio;
        tg.mesh.material.uniforms.uTime.value = this.clock.elapsedTime;
      } else {
        tg.mesh.scale.set(ratio, 1, ratio);
        tg.mesh.material.opacity = 0.3 + ratio * 0.5;
      }

      if (tg.progress >= tg.duration) {
        this.scene.remove(tg.mesh);
        this.telegraphs.splice(i, 1);
        this.resolveTelegraphAttack(tg);
      }
    }

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

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life -= dt;
      if (!p.isDust) {
        p.vel.y -= 18 * dt;
      }
      p.mesh.position.addScaledVector(p.vel, dt);
      p.mesh.rotation.x += dt * 8;
      p.mesh.rotation.y += dt * 8;
      if (p.life <= 0) {
        this.scene.remove(p.mesh);
        this.particles.splice(i, 1);
      }
    }
  }

  updateCamera(dt) {
    const horizDist = this.camDist * Math.cos(this.camPitch);
    const vertDist = this.camDist * Math.sin(this.camPitch);

    const targetCamX = this.playerPos.x + Math.sin(this.camYaw) * horizDist;
    const targetCamZ = this.playerPos.z + Math.cos(this.camYaw) * horizDist;
    const targetCamY = this.playerPos.y + vertDist + 2.4;

    this.camera.position.lerp(new THREE.Vector3(targetCamX, targetCamY, targetCamZ), 0.18);

    let shakeX = 0;
    let shakeY = 0;
    if (this.camShake > 0) {
      shakeX = (Math.random() - 0.5) * this.camShake;
      shakeY = (Math.random() - 0.5) * this.camShake;
      this.camShake = Math.max(0, this.camShake - dt * 2.8);
    }

    this.camTargetLook.lerp(
      new THREE.Vector3(this.playerPos.x + shakeX, this.playerPos.y + 2.2 + shakeY, this.playerPos.z),
      0.22
    );
    this.camera.lookAt(this.camTargetLook);
  }

  // ========================================================================
  // 9. 근접 상호작용 감지 & 3D 라벨 투영 & 확장 미니맵
  // ========================================================================
  checkNearestInteraction() {
    this.nearestInteractable = null;
    const promptEl = document.getElementById('interact-prompt');
    const promptTxt = document.getElementById('interact-prompt-text');

    if (this.battleState.active) {
      promptEl.classList.remove('visible');
      return;
    }

    if (this.portalGatePos && this.playerPos.distanceTo(this.portalGatePos) < 8.5) {
      this.nearestInteractable = { type: 'stage_gate' };
      promptTxt.innerText = '⛩️ 토벌 스테이지(1~20단계) & 스페셜 성장 던전 출격하기';
      promptEl.classList.add('visible');
      return;
    }

    if (this.playerPos.distanceTo(this.ramenPos) < 7.5) {
      this.nearestInteractable = { type: 'ramen' };
      promptTxt.innerText = "🍜 라멘 '랑(郎)' 주문 제작 알바하기";
      promptEl.classList.add('visible');
      return;
    }

    if (this.shopPos && this.playerPos.distanceTo(this.shopPos) < 6.0) {
      this.nearestInteractable = { type: 'shop' };
      promptTxt.innerText = '🛍️ 포쉐트 의상실 & 사스마타 강화 상점 열기';
      promptEl.classList.add('visible');
      return;
    }

    if (this.playerPos.distanceTo(this.weedZonePos) < 6.5) {
      this.nearestInteractable = { type: 'weed_exam' };
      promptTxt.innerText = '🌱 스피드 제초 자격증 승급 시험 응시하기';
      promptEl.classList.add('visible');
      return;
    }

    if (this.onsenPos && this.playerPos.distanceTo(this.onsenPos) < 14.0) {
      this.nearestInteractable = { type: 'onsen' };
      promptTxt.innerText = '🌸 벚꽃 노천온천 입욕하기 (체력 100% & 활력 버프)';
      promptEl.classList.add('visible');
      return;
    }

    if (this.campPos && this.playerPos.distanceTo(this.campPos) < 9.5) {
      this.nearestInteractable = { type: 'camp' };
      promptTxt.innerText = '🍠 모닥불 군고구마 구워 먹기 (+45 코인 & 회복)';
      promptEl.classList.add('visible');
      return;
    }

    for (const c of this.chests) {
      if (c.alive && c.pos.distanceTo(this.playerPos) < 4.5) {
        this.nearestInteractable = { type: 'chest', target: c };
        promptTxt.innerText = c.isCrystal ? '💎 별사탕 크리스탈 채굴하기 (+85 코인)' : '🎁 필드 보물상자 열기 (+65 코인)';
        promptEl.classList.add('visible');
        return;
      }
    }

    for (const w of this.weeds) {
      if (w.alive && w.pos.distanceTo(this.playerPos) < 3.8) {
        this.nearestInteractable = { type: 'weed', target: w };
        promptTxt.innerText = w.isGolden ? '✨ 황금 클로버 뽑기 (+보너스 코인)' : '🌿 초원 잡초 뽑기 (+코인)';
        promptEl.classList.add('visible');
        return;
      }
    }

    for (const npc of this.npcs) {
      if (npc.pos.distanceTo(this.playerPos) < 4.2) {
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
      const dist = worldVec.distanceTo(this.playerPos);
      if (dist > 95) {
        domEl.style.opacity = '0';
        return;
      }
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
      projectToScreen(npc.pos, 5.0, npc.labelWrap);
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

    ctx.clearRect(0, 0, size, size);

    if (this.raidMode && typeof RAIDHQ !== 'undefined') {
      RAIDHQ.drawMinimap(this, ctx, size);
      return;
    }

    // ⚔️ 전진 돌파형 토벌 가도(250m) 내부일 때는 5구역 진격로 전술 레이더 표시!
    if (this.battleState.active) {
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(0, 0, size, size);

      const mapZToY = localZ => {
        // localZ: +20 (하단 size - 14) ~ -226 (상단 14)
        const t = (20 - localZ) / 246;
        return size - 14 - t * (size - 28);
      };
      const mapXToX = localX => half + localX * 2.2;

      // 진격 가도 트랙 및 최북단 보스 성소
      ctx.fillStyle = '#475569';
      ctx.fillRect(half - 36, 22, 72, size - 34);
      ctx.beginPath();
      ctx.arc(half, mapZToY(-202), 26, 0, Math.PI * 2);
      ctx.fill();

      // 5개 구역 체크포인트 라인
      [-36, -80, -126, -172].forEach((bz, idx) => {
        const y = mapZToY(bz);
        ctx.strokeStyle = idx === this.battleState.currentSectorIdx ? '#ef4444' : '#94a3b8';
        ctx.lineWidth = idx === this.battleState.currentSectorIdx ? 2.5 : 1;
        ctx.beginPath();
        ctx.moveTo(half - 36, y);
        ctx.lineTo(half + 36, y);
        ctx.stroke();
      });

      this.monsters.forEach(m => {
        if (m.alive) {
          const mx = mapXToX(m.pos.x - this.arenaCenter.x);
          const my = mapZToY(m.pos.z - this.arenaCenter.z);
          ctx.fillStyle = m.isBoss ? '#facc15' : '#ef4444';
          ctx.beginPath();
          ctx.arc(mx, my, m.isBoss ? 5.5 : 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      const px = mapXToX(this.playerPos.x - this.arenaCenter.x);
      const py = mapZToY(this.playerPos.z - this.arenaCenter.z);
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, 4.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
      return;
    }

    const scale = size / 320; // 넓어진 320m 스케일 미니맵

    ctx.fillStyle = '#c7e596';
    ctx.fillRect(0, 0, size, size);

    // 시냇물
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(0, half + 26 * scale, size, 6 * scale);

    // 중앙 광장
    ctx.fillStyle = '#e5d7c1';
    ctx.beginPath();
    ctx.arc(half, half, 20 * scale, 0, Math.PI * 2);
    ctx.fill();

    // 북서쪽 온천 호수
    ctx.fillStyle = '#7dd3fc';
    ctx.beginPath();
    ctx.arc(half - 82 * scale, half - 68 * scale, 13 * scale, 0, Math.PI * 2);
    ctx.fill();

    const drawDot = (wx, wz, color, r) => {
      const mx = half + wx * scale;
      const my = half + wz * scale;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(mx, my, r, 0, Math.PI * 2);
      ctx.fill();
    };

    this.weeds.forEach(w => {
      if (w.alive) drawDot(w.pos.x, w.pos.z, '#22c55e', 1.8);
    });
    this.chests.forEach(c => {
      if (c.alive) drawDot(c.pos.x, c.pos.z, '#facc15', 2.4);
    });

    drawDot(this.ramenPos.x, this.ramenPos.z, '#f97316', 4.2);
    drawDot(this.puddingPos.x, this.puddingPos.z, '#eab308', 4.2);
    if (this.portalGatePos) drawDot(this.portalGatePos.x, this.portalGatePos.z, '#dc2626', 5.0);
    if (this.campPos) drawDot(this.campPos.x, this.campPos.z, '#fb923c', 4.2);
    if (this.shopPos) drawDot(this.shopPos.x, this.shopPos.z, '#ec4899', 4.0);

    this.npcs.forEach(n => drawDot(n.pos.x, n.pos.z, '#38bdf8', 2.6));
    if (typeof WORLDX !== 'undefined') WORLDX.drawMinimap(this, ctx, half, scale, drawDot);

    const px = half + this.playerPos.x * scale;
    const py = half + this.playerPos.z * scale;
    ctx.fillStyle = '#ff4d6d';
    ctx.beginPath();
    ctx.arc(px, py, 4.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  // ========================================================================
  // 10. 키보드(방향키 끼임 완벽 방지) / 마우스 좌클릭 타격 / 우클릭 대시 / 드래그 카메라
  // ========================================================================
  normalizeKeyCode(e) {
    if (e.code) {
      if (['KeyW', 'KeyA', 'KeyS', 'KeyD', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyQ'].includes(e.code)) {
        return e.code;
      }
    }
    const k = (e.key || '').toLowerCase();
    const map = {
      w: 'KeyW', 'ㅈ': 'KeyW',
      a: 'KeyA', 'ㅁ': 'KeyA',
      s: 'KeyS', 'ㄴ': 'KeyS',
      d: 'KeyD', 'ㅇ': 'KeyD',
      q: 'KeyQ', 'ㅂ': 'KeyQ',
      arrowup: 'ArrowUp',
      arrowdown: 'ArrowDown',
      arrowleft: 'ArrowLeft',
      arrowright: 'ArrowRight'
    };
    return map[k] || e.code;
  }

  bindEvents() {
    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      if (this.composer) {
        this.composer.setPixelRatio && this.composer.setPixelRatio(this.currentPixelRatio);
        this.composer.setSize(window.innerWidth, window.innerHeight);
      }
      if (this.bloomPass && this.bloomPass.setSize) {
        this.bloomPass.setSize(window.innerWidth, window.innerHeight);
      }
      if (this.ambientMotes && this.ambientMotes.userData.mat) {
        this.ambientMotes.userData.mat.uniforms.uPixelRatio.value = this.currentPixelRatio;
      }
    });

    // 창 포커스 이탈, 탭 전환, 우클릭 메뉴 시 눌려있던 방향키 상태를 즉시 초기화하여 유령 이동 방지!
    window.addEventListener('blur', () => this.clearAllInputKeys());
    window.addEventListener('focus', () => this.clearAllInputKeys());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.clearAllInputKeys();
    });
    window.addEventListener('contextmenu', () => this.clearAllInputKeys());

    // HUD 버튼 클릭 시 버튼에 포커스가 남아 방향키/스페이스바가 가로채이는 현상 방지
    document.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => btn.blur());
    });

    window.addEventListener('keydown', e => {
      // 채팅·닉네임 등 입력칸에 타이핑 중이면 게임 조작 무시
      const tgt = e.target;
      if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.isContentEditable)) return;
      if (this.isAnyModalOpen()) {
        this.clearAllInputKeys();
        return;
      }

      const normCode = this.normalizeKeyCode(e);
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Space'].includes(normCode)) {
        e.preventDefault();
      }

      if (normCode) {
        this.keys[normCode] = true;
      }
      if (e.code) {
        this.keys[e.code] = true;
      }

      if (!this.gameStarted) return;
      soundFx.startBgm();

      if (e.code === 'Space') {
        this.triggerJump();
      } else if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        e.preventDefault();
        this.triggerDash();
      } else if (e.code === 'KeyJ' || e.code === 'KeyZ') {
        this.triggerAttack();
      } else if (normCode === 'KeyQ' || e.code === 'KeyQ' || e.code === 'KeyK' || e.code === 'KeyX') {
        this.triggerSpecialSkill();
      } else if (e.code === 'KeyR' || e.code === 'Digit4' || e.code === 'Numpad4') {
        this.usePotion();
      } else if (/^(Digit|Numpad)[123]$/.test(e.code)) {
        this.triggerSkill(Number(e.code.slice(-1)));
      } else if (e.code === 'KeyE' || e.code === 'KeyF') {
        this.triggerInteract();
      } else if (e.code === 'KeyM') {
        this.clearAllInputKeys();
        openStageSelectModal();
      } else if (e.code === 'KeyB') {
        this.clearAllInputKeys();
        openCostumeShopModal();
      } else if (e.code === 'KeyP') {
        this.takePhotoSnapshot();
      }
    });

    window.addEventListener('keyup', e => {
      const normCode = this.normalizeKeyCode(e);
      if (normCode) {
        this.keys[normCode] = false;
      }
      if (e.code) {
        this.keys[e.code] = false;
      }
      // Shift나 Alt 조합 해제 시 혹시 남아있을 방향키 유령 판정 정리
      if (e.key === 'Meta' || e.key === 'Alt') {
        this.clearAllInputKeys();
      }
    });

    const canvas = document.getElementById('webgl-canvas');
    canvas.addEventListener('contextmenu', e => e.preventDefault());

    canvas.addEventListener('mousedown', e => {
      if (!this.gameStarted) return;
      soundFx.startBgm();
      if (e.button === 0 || e.button === 2) {
        this.isDraggingCam = true;
        this.dragDistMoved = 0;
        this.prevMouse = { x: e.clientX, y: e.clientY };
      }
    });

    window.addEventListener('mousemove', e => {
      if (!this.isDraggingCam) return;
      const dx = e.clientX - this.prevMouse.x;
      const dy = e.clientY - this.prevMouse.y;
      this.dragDistMoved += Math.hypot(dx, dy);
      this.prevMouse = { x: e.clientX, y: e.clientY };

      if (this.dragDistMoved > 6) {
        this.camYaw -= dx * 0.0065;
        this.camPitch = Math.max(0.22, Math.min(1.1, this.camPitch + dy * 0.0055));
      }
    });

    window.addEventListener('mouseup', e => {
      if (!this.isDraggingCam) return;
      this.isDraggingCam = false;

      if (this.dragDistMoved <= 6 && this.gameStarted) {
        if (e.button === 0) {
          const mouseNDC = new THREE.Vector2(
            (e.clientX / window.innerWidth) * 2 - 1,
            -(e.clientY / window.innerHeight) * 2 + 1
          );
          this.raycaster.setFromCamera(mouseNDC, this.camera);
          const hitPt = new THREE.Vector3();
          this.raycaster.ray.intersectPlane(this.groundPlane, hitPt);
          this.triggerAttack(hitPt);
        } else if (e.button === 2) {
          this.triggerDash();
        }
      }
    });

    canvas.addEventListener('wheel', e => {
      this.camDist = Math.max(12, Math.min(44, this.camDist + e.deltaY * 0.015));
    });

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
