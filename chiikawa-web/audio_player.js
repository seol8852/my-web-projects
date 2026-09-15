// ==============================================================
// 🎵 하치와레의 동굴 음악실 - 글로벌 BGM 주크박스 엔진 (audio_player.js)
// ==============================================================

const BGM_TRACKS = [
  { id: "hitorigotsu", name: "🎸 히토리곳치 (ひとりごつ)", tempo: 130, notes: [261.63, 293.66, 329.63, 349.23, 392.00, 440.00, 493.88, 523.25] },
  { id: "pajamas", name: "👚 파자마 파티송 (Pajamas Party)", tempo: 150, notes: [329.63, 392.00, 523.25, 659.25, 587.33, 523.25, 392.00, 329.63] },
  { id: "battle", name: "⚔️ 사스마타 토벌 배틀송", tempo: 165, notes: [220.00, 261.63, 329.63, 440.00, 392.00, 329.63, 293.66, 261.63] },
  { id: "peaceful", name: "🍮 평화로운 푸딩 동굴 힐링송", tempo: 100, notes: [523.25, 493.88, 440.00, 392.00, 349.23, 329.63, 293.66, 261.63] }
];

let bgmAudioCtx = null;
let currentBgmTrackIdx = 0;
let isBgmPlaying = false;
let bgmSequenceTimer = null;
let bgmStep = 0;

function getBgmState() {
  try {
    const saved = localStorage.getItem('chiikawa_bgm_state');
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return { isPlaying: false, trackIdx: 0, volume: 0.2 };
}

function saveBgmState(st) {
  try {
    localStorage.setItem('chiikawa_bgm_state', JSON.stringify(st));
  } catch (e) {}
}

function initGlobalJukebox() {
  const state = getBgmState();
  currentBgmTrackIdx = state.trackIdx || 0;

  // 플로팅 주크박스 HTML 동적 삽입
  if (!document.getElementById('floatingJukebox')) {
    const jukeboxEl = document.createElement('div');
    jukeboxEl.id = 'floatingJukebox';
    jukeboxEl.className = 'floating-jukebox';
    jukeboxEl.innerHTML = `
      <div class="jukebox-inner">
        <button class="jukebox-disc-btn" id="jukeboxDiscBtn" onclick="toggleBgmPlay()" title="음악 재생/일시정지">
          <div class="vinyl-record" id="vinylRecord">
            <span class="vinyl-center">🎵</span>
          </div>
        </button>
        <div class="jukebox-controls">
          <div class="jukebox-track-name" id="jukeboxTrackName">${BGM_TRACKS[currentBgmTrackIdx].name}</div>
          <div class="jukebox-btn-row">
            <button class="btn-juke-prev" onclick="prevBgmTrack()" title="이전 곡"><i class="fa-solid fa-backward-step"></i></button>
            <button class="btn-juke-play" id="jukePlayBtn" onclick="toggleBgmPlay()"><i class="fa-solid fa-play"></i></button>
            <button class="btn-juke-next" onclick="nextBgmTrack()" title="다음 곡"><i class="fa-solid fa-forward-step"></i></button>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(jukeboxEl);
  }
}

function toggleBgmPlay() {
  if (isBgmPlaying) {
    stopBgm();
  } else {
    startBgm();
  }
}

function startBgm() {
  try {
    if (!bgmAudioCtx) bgmAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
    if (bgmAudioCtx.state === 'suspended') bgmAudioCtx.resume();
  } catch (e) {}

  isBgmPlaying = true;
  document.getElementById('vinylRecord')?.classList.add('spinning');
  const playBtn = document.getElementById('jukePlayBtn');
  if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';

  bgmStep = 0;
  playBgmLoop();
  saveBgmState({ isPlaying: true, trackIdx: currentBgmTrackIdx });
}

function stopBgm() {
  isBgmPlaying = false;
  if (bgmSequenceTimer) clearTimeout(bgmSequenceTimer);
  document.getElementById('vinylRecord')?.classList.remove('spinning');
  const playBtn = document.getElementById('jukePlayBtn');
  if (playBtn) playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
  saveBgmState({ isPlaying: false, trackIdx: currentBgmTrackIdx });
}

function playBgmLoop() {
  if (!isBgmPlaying || !bgmAudioCtx) return;
  const track = BGM_TRACKS[currentBgmTrackIdx];
  const now = bgmAudioCtx.currentTime;

  const noteFreq = track.notes[bgmStep % track.notes.length];
  const osc = bgmAudioCtx.createOscillator();
  const gain = bgmAudioCtx.createGain();

  osc.type = (currentBgmTrackIdx === 2) ? 'sawtooth' : ((currentBgmTrackIdx === 1) ? 'square' : 'triangle');
  osc.frequency.setValueAtTime(noteFreq, now);

  const noteDuration = (60 / track.tempo) * 0.8;
  gain.gain.setValueAtTime(0.08, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + noteDuration);

  osc.connect(gain);
  gain.connect(bgmAudioCtx.destination);
  osc.start(now);
  osc.stop(now + noteDuration);

  bgmStep++;
  const nextInterval = (60 / track.tempo) * 1000 * 0.5;
  bgmSequenceTimer = setTimeout(playBgmLoop, nextInterval);
}

function nextBgmTrack() {
  currentBgmTrackIdx = (currentBgmTrackIdx + 1) % BGM_TRACKS.length;
  updateTrackDisplay();
  if (isBgmPlaying) {
    if (bgmSequenceTimer) clearTimeout(bgmSequenceTimer);
    playBgmLoop();
  }
}

function prevBgmTrack() {
  currentBgmTrackIdx = (currentBgmTrackIdx - 1 + BGM_TRACKS.length) % BGM_TRACKS.length;
  updateTrackDisplay();
  if (isBgmPlaying) {
    if (bgmSequenceTimer) clearTimeout(bgmSequenceTimer);
    playBgmLoop();
  }
}

function updateTrackDisplay() {
  const track = BGM_TRACKS[currentBgmTrackIdx];
  const nameEl = document.getElementById('jukeboxTrackName');
  if (nameEl) nameEl.textContent = track.name;
}

window.addEventListener('DOMContentLoaded', () => {
  initGlobalJukebox();
});

// 전역 도토리 잔액 동기화 엔진
function updateGlobalAcornDisplay() {
  try {
    const acorns = localStorage.getItem('chiikawa_acorns') || '300';
    document.querySelectorAll('#navAcorns, .nav-acorn-count').forEach(el => {
      el.textContent = acorns;
    });
  } catch(e) {}
}

window.addEventListener('DOMContentLoaded', () => {
  initGlobalJukebox();
  updateGlobalAcornDisplay();
});
window.addEventListener('focus', () => {
  updateGlobalAcornDisplay();
});
