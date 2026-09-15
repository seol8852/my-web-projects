// ==========================================================================
// MAD MAX: FURY ROAD - WAR BOY "WITNESS ME!" SCRIPT (HD VIDEO MASTER)
// ==========================================================================

const QUOTES = [
  {
    korean: "기억해줘! (WITNESS ME!)",
    subtitle: "기 억 해 줘 !",
    meta: "I AM THE MAN WHO GRABS THE SUN, RIDING TO VALHALLA!",
    sub: "모르조프의 폭탄창 돌진",
    video: "morsov_witness.mp4"
  },
  {
    korean: "기억할게! (WITNESSED!)",
    subtitle: "기 억 할 게 !",
    meta: "SHINY AND CHROME! WE SHALL RIDE ETERNAL TO VALHALLA!",
    sub: "워보이들의 합창",
    video: "witness_spear.mp4"
  },
  {
    korean: "나는 살고, 죽고, 또다시 산다!",
    subtitle: "나 는  살 고 ,  죽 고 ,  또 다 시  산 다 !",
    meta: "I LIVE, I DIE, I LIVE AGAIN!",
    sub: "워보이의 맹세",
    video: "nux_witness_me.mp4"
  },
  {
    korean: "은빛으로 빛나며 영원하리라!",
    subtitle: "은 빛 으 로  빛 나 며  영 원 하 리 라 !",
    meta: "SHINY AND CHROME, INTO VALHALLA!",
    sub: "슬릿의 외침",
    video: "nux_spray.mp4"
  },
  {
    korean: "임모탄 조께서 날 바라보셨어!",
    subtitle: "임 모 탄  조 께 서  날  바 라 보 셨 어 !",
    meta: "HE LOOKED AT ME! HE LOOKED RIGHT AT ME!",
    sub: "녹스의 감격",
    video: "nux_witness_me.mp4"
  },
  {
    korean: "평범했다. (MEDIOCRE!)",
    subtitle: "평 범 했 다 .",
    meta: "MEDIOCRE, MORSOV! MEDIOCRE!",
    sub: "임모탄 조",
    video: "morsov_witness.mp4"
  },
  {
    korean: "발할라의 문이 열린다!",
    subtitle: "발 할 라 의  문 이  열 린 다 !",
    meta: "THE GATES OF VALHALLA AWAIT!",
    sub: "분노의 도로",
    video: "witness_spear.mp4"
  }
];

let currentQuoteIndex = 0;
let witnessCount = 8888;
let valhallaGauge = 35;
let currentRpm = 1200;
let isAudioActive = false;
let audioCtx = null;
let bgmInterval = null;
let isMouseDown = false;

// DOM 요소
const canvas = document.getElementById('fx-canvas');
const ctx = canvas.getContext('2d');
const warboyCard = document.getElementById('warboyCard');
const warboyVideo = document.getElementById('warboyVideo');
const sprayOverlay = document.getElementById('sprayOverlay');
const flameLeft = document.getElementById('flameLeft');
const flameRight = document.getElementById('flameRight');
const valhallaBanner = document.getElementById('valhallaBanner');
const valhallaBannerText = document.getElementById('valhallaBannerText');
const sceneBadge = document.getElementById('sceneBadge');
const movieSubtitle = document.getElementById('movieSubtitle');

const meterFill = document.getElementById('meterFill');
const witnessCountEl = document.getElementById('witnessCount');
const pageMainTitle = document.getElementById('pageMainTitle');
const pageWitnessEn = document.getElementById('pageWitnessEn');
const rpmBar = document.getElementById('rpmBar');
const rpmValue = document.getElementById('rpmValue');

const witnessMeBtn = document.getElementById('witnessMeBtn');
const witnessedBtn = document.getElementById('witnessedBtn');
const destroyFaBtn = document.getElementById('destroyFaBtn');
const sprayBtn = document.getElementById('sprayBtn');
const v8RevBtn = document.getElementById('v8RevBtn');
const soundBtn = document.getElementById('soundBtn');
const nextQuoteBtn = document.getElementById('nextQuoteBtn');
const quoteMainText = document.getElementById('quoteMainText');
const quoteSubText = document.getElementById('quoteSubText');

// HD 비디오 씬 전환 & 자막 업데이트 함수
function setScene(videoFileName, label, subtitleText) {
  if (warboyVideo) {
    if (!warboyVideo.src.endsWith(videoFileName)) {
      warboyVideo.src = videoFileName;
      warboyVideo.load();
      warboyVideo.play().catch(() => {});
    }
  }
  if (label) {
    sceneBadge.textContent = `🎬 HD 명장면: ${label}`;
  }
  if (subtitleText) {
    movieSubtitle.textContent = subtitleText;
    movieSubtitle.style.animation = 'none';
    void movieSubtitle.offsetWidth;
    movieSubtitle.style.animation = 'subFlicker 0.2s ease-out';
  }
}

// 캔버스 리사이즈
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ==========================================================================
// 파티클 시스템 (모래폭풍, 화염, 은빛 크롬 분진, 배기 스파크)
// ==========================================================================
const particles = [];

class Particle {
  constructor(type, x, y) {
    this.type = type;
    this.x = x !== undefined ? x : Math.random() * canvas.width;
    this.y = y !== undefined ? y : (type === 'fire' ? canvas.height + 20 : Math.random() * canvas.height);
    
    if (type === 'sand') {
      this.size = Math.random() * 3 + 1.2;
      this.vx = (Math.random() - 0.2) * 5 + 3.0;
      this.vy = (Math.random() - 0.5) * 2;
      this.color = `rgba(${210 + Math.floor(Math.random()*35)}, ${140 + Math.floor(Math.random()*40)}, 75, ${Math.random()*0.5 + 0.3})`;
      this.alpha = 1;
      this.decay = 0.001;
    } else if (type === 'fire') {
      this.size = Math.random() * 7 + 3;
      this.vx = (Math.random() - 0.5) * 5;
      this.vy = -(Math.random() * 5 + 3);
      this.alpha = Math.random() * 0.85 + 0.2;
      this.decay = Math.random() * 0.015 + 0.008;
      const hue = Math.floor(Math.random() * 35) + 12;
      this.color = `hsla(${hue}, 100%, 55%, `;
    } else if (type === 'chrome') {
      this.size = Math.random() * 8 + 3;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 22 + 8;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.01;
      this.color = '#ffffff';
    } else if (type === 'spray_draw') {
      this.size = Math.random() * 6 + 2;
      this.vx = (Math.random() - 0.5) * 4;
      this.vy = (Math.random() - 0.5) * 4;
      this.alpha = 0.9;
      this.decay = 0.012;
      this.color = '#ffffff';
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= this.decay;

    if (this.type === 'fire') {
      this.size *= 0.985;
      this.vx += (Math.random() - 0.5) * 0.4;
    }
    if (this.type === 'chrome' || this.type === 'spray_draw') {
      this.vx *= 0.94;
      this.vy *= 0.94;
    }
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = Math.max(0, this.alpha);
    if (this.type === 'chrome' || this.type === 'spray_draw') {
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#e0f0ff';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'fire') {
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowColor = '#ff4500';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

function spawnAmbientParticles() {
  if (particles.length < 160) {
    particles.push(new Particle('sand'));
    if (Math.random() < 0.6) {
      particles.push(new Particle('fire'));
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  spawnAmbientParticles();

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.update();
    p.draw();

    if (p.alpha <= 0 || p.x > canvas.width + 100 || p.y < -100) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateParticles);
}
animateParticles();

function explodeChrome(originX, originY, count = 150) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle('chrome', originX, originY));
  }
}

function explodeFire(originX, originY, count = 160) {
  for (let i = 0; i < count; i++) {
    const p = new Particle('fire', originX, originY);
    p.vx = (Math.random() - 0.5) * 22;
    p.vy = (Math.random() - 0.5) * 22;
    p.size = Math.random() * 10 + 4;
    p.decay = 0.015;
    particles.push(p);
  }
}

// ==========================================================================
// Web Audio API 사운드 시스템
// ==========================================================================
function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
}

function playSpraySound() {
  try {
    initAudio();
    if (!audioCtx) return;

    const bufferSize = audioCtx.sampleRate * 0.6;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3400, audioCtx.currentTime);
    filter.Q.setValueAtTime(3.2, audioCtx.currentTime);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.8, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.55);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start();
  } catch (e) {}
}

function playExplosionSound() {
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(190, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, audioCtx.currentTime + 0.95);

    const waveShaper = audioCtx.createWaveShaper();
    const curve = new Float32Array(256);
    for (let i = 0; i < 256; ++i) {
      const x = (i * 2) / 256 - 1;
      curve[i] = ((Math.PI + 25) * x) / (Math.PI + 25 * Math.abs(x));
    }
    waveShaper.curve = curve;

    gain.gain.setValueAtTime(0.95, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.95);

    osc.connect(waveShaper);
    waveShaper.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.95);

    const bufferSize = audioCtx.sampleRate * 0.85;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (audioCtx.sampleRate * 0.18));
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    const nGain = audioCtx.createGain();
    nGain.gain.setValueAtTime(0.9, audioCtx.currentTime);
    noise.connect(nGain);
    nGain.connect(audioCtx.destination);
    noise.start();
  } catch (e) {}
}

// 💥 메가 파괴 폭발 사운드 (FA솔루션 파괴용)
function playMegaDestroySound() {
  playExplosionSound();
  setTimeout(playExplosionSound, 120);
  setTimeout(playExplosionSound, 240);
  playV8RevSound();
}

function playV8RevSound() {
  try {
    initAudio();
    if (!audioCtx) return;

    const osc = audioCtx.createOscillator();
    const subOsc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    subOsc.type = 'triangle';

    osc.frequency.setValueAtTime(75, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(380, audioCtx.currentTime + 0.35);
    osc.frequency.exponentialRampToValueAtTime(120, audioCtx.currentTime + 0.8);

    subOsc.frequency.setValueAtTime(37.5, audioCtx.currentTime);
    subOsc.frequency.exponentialRampToValueAtTime(190, audioCtx.currentTime + 0.35);
    subOsc.frequency.exponentialRampToValueAtTime(60, audioCtx.currentTime + 0.8);

    gain.gain.setValueAtTime(0.9, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);

    osc.connect(gain);
    subOsc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    subOsc.start();
    osc.stop(audioCtx.currentTime + 0.85);
    subOsc.stop(audioCtx.currentTime + 0.85);
  } catch (e) {}
}

function playGuitarRiff() {
  initAudio();
  if (!audioCtx) return;

  const notes = [110, 110, 123.47, 130.81, 110, 146.83, 138.59];
  let step = 0;

  bgmInterval = setInterval(() => {
    if (!isAudioActive) return;
    const freq = notes[step % notes.length];
    step++;

    const osc1 = audioCtx.createOscillator();
    const osc2 = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'square';
    osc1.frequency.setValueAtTime(freq, audioCtx.currentTime);
    osc2.frequency.setValueAtTime(freq * 1.5, audioCtx.currentTime);

    gain.gain.setValueAtTime(0.28, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.22);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(audioCtx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(audioCtx.currentTime + 0.25);
    osc2.stop(audioCtx.currentTime + 0.25);
  }, 220);
}

function stopGuitarRiff() {
  if (bgmInterval) {
    clearInterval(bgmInterval);
    bgmInterval = null;
  }
}

// ==========================================================================
// 인터랙션 & V8 엔진 컨트롤러
// ==========================================================================

function triggerScreenShake(type = 'fire') {
  document.body.classList.remove('screen-shake', 'screen-mega-shake', 'screen-flash-chrome', 'screen-flash-fire');
  void document.body.offsetWidth;
  document.body.classList.add('screen-shake');
  if (type === 'chrome') {
    document.body.classList.add('screen-flash-chrome');
  } else {
    document.body.classList.add('screen-flash-fire');
  }
  setTimeout(() => {
    document.body.classList.remove('screen-shake', 'screen-mega-shake', 'screen-flash-chrome', 'screen-flash-fire');
  }, 750);
}

function triggerMegaScreenShake() {
  document.body.classList.remove('screen-shake', 'screen-mega-shake', 'screen-flash-chrome', 'screen-flash-fire');
  void document.body.offsetWidth;
  document.body.classList.add('screen-mega-shake', 'screen-flash-fire');
  setTimeout(() => {
    document.body.classList.remove('screen-shake', 'screen-mega-shake', 'screen-flash-chrome', 'screen-flash-fire');
  }, 900);
}

function revRpm(amount = 2500) {
  currentRpm = Math.min(8500, currentRpm + amount);
  const percent = (currentRpm / 8500) * 100;
  rpmBar.style.width = `${percent}%`;
  rpmValue.textContent = currentRpm.toLocaleString();

  flameLeft.classList.add('firing');
  flameRight.classList.add('firing');

  setTimeout(() => {
    currentRpm = Math.max(1200, currentRpm - 2000);
    const p = (currentRpm / 8500) * 100;
    rpmBar.style.width = `${p}%`;
    rpmValue.textContent = currentRpm.toLocaleString();
    flameLeft.classList.remove('firing');
    flameRight.classList.remove('firing');
  }, 500);
}

function triggerValhallaOverdrive(customBannerText) {
  if (customBannerText) {
    valhallaBannerText.textContent = customBannerText;
  } else {
    valhallaBannerText.textContent = "⚡ WITNESS ME! SHINY AND CHROME! ⚡";
  }
  valhallaBanner.classList.add('active');
  triggerMegaScreenShake();
  playMegaDestroySound();

  const cx = window.innerWidth / 2;
  const cy = window.innerHeight / 2;
  explodeChrome(cx, cy, 250);
  explodeFire(cx, cy, 250);

  setTimeout(() => {
    valhallaBanner.classList.remove('active');
  }, 3500);
}

function addValhalla(amount = 15) {
  valhallaGauge = Math.min(100, valhallaGauge + amount);
  meterFill.style.width = `${valhallaGauge}%`;

  if (valhallaGauge >= 100) {
    triggerValhallaOverdrive();
    setTimeout(() => {
      valhallaGauge = 35;
      meterFill.style.width = `${valhallaGauge}%`;
    }, 4000);
  }
}

// 자동 폭발 연출
function triggerAutoExplosion() {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  setTimeout(() => {
    explodeChrome(centerX, centerY, 180);
    explodeFire(centerX, centerY, 100);
    triggerScreenShake('chrome');
    sprayOverlay.classList.add('active');
    if (warboyVideo) warboyVideo.classList.add('warboy-video-chromed');

    setTimeout(() => {
      sprayOverlay.classList.remove('active');
    }, 500);
  }, 50);

  setTimeout(() => {
    explodeFire(centerX - 150, centerY, 140);
    explodeChrome(centerX + 150, centerY, 140);
    triggerScreenShake('fire');
  }, 400);
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
  triggerAutoExplosion();
} else {
  window.addEventListener('DOMContentLoaded', triggerAutoExplosion);
}

// 1. 🔥 "기억해줘! (WITNESS ME!)" 명장면 액션
function actionWitnessMe() {
  playExplosionSound();
  setScene('morsov_witness.mp4', '"기억해줘! (WITNESS ME!)" - 폭탄창 돌진', '기 억 해 줘 !');
  pageMainTitle.textContent = "기억해줘!";
  pageWitnessEn.textContent = "WITNESS ME!";

  const rect = warboyVideo ? warboyVideo.getBoundingClientRect() : { left: 200, top: 200, width: 400, height: 300 };
  explodeFire(rect.left + rect.width / 2, rect.top + rect.height / 2, 200);
  explodeChrome(rect.left + rect.width / 2, rect.top + rect.height / 2, 120);
  triggerScreenShake('fire');
  revRpm(3000);

  witnessCount += 222;
  witnessCountEl.textContent = witnessCount.toLocaleString();
  addValhalla(30);
}

// 2. 💀 "기억할게! (WITNESSED!)" 화답 액션
function actionWitnessed() {
  playExplosionSound();
  setScene('witness_spear.mp4', '"기억할게! (WITNESSED!)" - 워보이들의 합창', '기 억 할 게 !');
  pageMainTitle.textContent = "기억할게!";
  pageWitnessEn.textContent = "WITNESSED!";

  const rect = warboyVideo ? warboyVideo.getBoundingClientRect() : { left: 200, top: 200, width: 400, height: 300 };
  explodeFire(rect.left + rect.width / 2, rect.top + rect.height / 2, 180);
  triggerScreenShake('fire');
  revRpm(2000);

  witnessCount += 111;
  witnessCountEl.textContent = witnessCount.toLocaleString();
  addValhalla(25);
}

// 3. 💥 FA솔루션 뿌시기 액션!
function actionDestroyFa() {
  playMegaDestroySound();
  setScene('morsov_witness.mp4', '💥 FA솔루션 완전 박살!', '💥 F A  솔 루 션  파 괴 완 료 ! 💥');
  pageMainTitle.textContent = "FA솔루션 박살!";
  pageWitnessEn.textContent = "FA SOLUTION DESTROYED!";
  triggerMegaScreenShake();
  revRpm(5500);

  const rect = warboyVideo ? warboyVideo.getBoundingClientRect() : { left: 200, top: 200, width: 400, height: 300 };
  explodeFire(rect.left + rect.width / 2, rect.top + rect.height / 2, 250);
  explodeChrome(rect.left + rect.width / 2, rect.top + rect.height / 2, 200);

  triggerValhallaOverdrive('💥 FA솔루션 완전 파괴 완료! 발할라로! 💥');
  witnessCount += 777;
  witnessCountEl.textContent = witnessCount.toLocaleString();
  addValhalla(40);
}

// 4. 🥫 크롬 락카 치이익! (Shiny & Chrome)
function actionSpray() {
  playSpraySound();
  setScene('nux_spray.mp4', '은빛 크롬 락카 분사!', '은 빛 으 로  빛 나 며  영 원 하 리 라 !');
  if (warboyVideo) warboyVideo.classList.add('warboy-video-chromed');
  sprayOverlay.classList.add('active');
  setTimeout(() => sprayOverlay.classList.remove('active'), 400);

  const rect = warboyVideo ? warboyVideo.getBoundingClientRect() : { left: 200, top: 200, width: 400, height: 300 };
  explodeChrome(rect.left + rect.width / 2, rect.top + rect.height / 2, 160);
  triggerScreenShake('chrome');

  witnessCount += Math.floor(Math.random() * 60) + 15;
  witnessCountEl.textContent = witnessCount.toLocaleString();
  addValhalla(15);
}

// 5. ⚡ V8 풀 악셀 액션
function actionV8Rev() {
  playV8RevSound();
  setScene('nux_witness_me.mp4', '녹스의 최후 돌진 V8!', '발 할 라 의  문 으 로 !');
  pageMainTitle.textContent = "V8! V8! V8!";
  pageWitnessEn.textContent = "PEDAL TO THE METAL!";
  revRpm(4500);
  triggerScreenShake('fire');
  const rect = warboyVideo ? warboyVideo.getBoundingClientRect() : { left: 200, top: 200, width: 400, height: 300 };
  explodeFire(rect.left + 50, rect.bottom - 40, 80);
  explodeFire(rect.right - 50, rect.bottom - 40, 80);
  addValhalla(20);
}

// 6. 🎸 사운드 토글 (기타맨 씬 전환)
function actionToggleSound() {
  initAudio();
  isAudioActive = !isAudioActive;
  const soundTitle = document.getElementById('soundTitle');
  const soundSub = document.getElementById('soundSub');

  if (isAudioActive) {
    soundTitle.textContent = "두프 워리어 BGM: ON 🔥";
    soundSub.textContent = "CLICK TO MUTE [M]";
    soundBtn.style.borderColor = "#c45b18";
    setScene('doof_guitar.mp4', '두프 워리어 기타 솔로 화염!', '두 프  워 리 어 ! 🔥');
    playGuitarRiff();
  } else {
    soundTitle.textContent = "두프 워리어 기타 BGM";
    soundSub.textContent = "HEAVY RIFF [M]";
    soundBtn.style.borderColor = "#6b5231";
    setScene('morsov_witness.mp4', '"기억해줘! (WITNESS ME!)"', '기 억 해 줘 !');
    stopGuitarRiff();
  }
}

// 7. 📜 명대사 릴레이
function actionNextQuote() {
  currentQuoteIndex = (currentQuoteIndex + 1) % QUOTES.length;
  const q = QUOTES[currentQuoteIndex];
  pageMainTitle.textContent = q.korean.split('(')[0].trim() || q.korean;
  pageWitnessEn.textContent = q.meta.split('!')[0] + '!';
  quoteMainText.textContent = q.korean;
  quoteSubText.textContent = `"${q.meta}" - ${q.sub} [Q]`;
  
  if (q.video) {
    setScene(q.video, q.korean, q.subtitle || q.korean);
  }
  
  if (warboyVideo) {
    warboyVideo.style.transform = `scale(1.03) rotate(${(Math.random() - 0.5) * 2}deg)`;
    setTimeout(() => warboyVideo.style.transform = 'scale(1) rotate(0deg)', 200);
  }
}

// 버튼 리스너 바인딩
witnessMeBtn.addEventListener('click', actionWitnessMe);
witnessedBtn.addEventListener('click', actionWitnessed);
destroyFaBtn.addEventListener('click', actionDestroyFa);
sprayBtn.addEventListener('click', actionSpray);
v8RevBtn.addEventListener('click', actionV8Rev);
soundBtn.addEventListener('click', actionToggleSound);
nextQuoteBtn.addEventListener('click', actionNextQuote);

// 마우스 드래그 실시간 크롬 락카 페인팅
warboyCard.addEventListener('mousedown', (e) => {
  if (e.target.closest('button')) return;
  isMouseDown = true;
  playSpraySound();
});

window.addEventListener('mouseup', () => isMouseDown = false);

warboyCard.addEventListener('mousemove', (e) => {
  if (isMouseDown) {
    for (let i = 0; i < 6; i++) {
      particles.push(new Particle('spray_draw', e.clientX, e.clientY));
    }
  }
});

// 키보드 단축키 바인딩
window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  const key = e.key.toLowerCase();
  if (key === '1' || key === 'w') {
    actionWitnessMe();
  } else if (key === '2' || key === 'e') {
    actionWitnessed();
  } else if (key === 'f') {
    actionDestroyFa();
  } else if (key === ' ' || e.code === 'Space') {
    e.preventDefault();
    actionV8Rev();
  } else if (key === 'c') {
    actionSpray();
  } else if (key === 'm') {
    actionToggleSound();
  } else if (key === 'q') {
    actionNextQuote();
  }
});
