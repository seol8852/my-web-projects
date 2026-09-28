/* ==========================================================================
   🌸 치이카와 스트라이커: 토벌 대작전 (Chiikawa Striker) - AAA Polish Edition
   5000x5000 Super Open-World with 4 Treasure Sanctuaries & Boss Lairs
   ========================================================================== */

// --- Settings & Save State Controller (LocalStorage) ---
class StorageManager {
  static KEY_RECORDS = 'chiikawa_striker_records_v2';
  static KEY_SETTINGS = 'chiikawa_striker_settings_v2';

  static getRecords() {
    try {
      const data = localStorage.getItem(this.KEY_RECORDS);
      return data ? JSON.parse(data) : { bestScore: 0, maxKills: 0, bestWave: 1, clearedDiffs: [] };
    } catch (e) {
      return { bestScore: 0, maxKills: 0, bestWave: 1, clearedDiffs: [] };
    }
  }

  static saveRecords(score, kills, wave, diff, isVictory = false) {
    try {
      const records = this.getRecords();
      if (score > records.bestScore) records.bestScore = Math.round(score);
      if (kills > records.maxKills) records.maxKills = kills;
      if (wave > records.bestWave) records.bestWave = wave;
      if (isVictory && !records.clearedDiffs.includes(diff)) {
        records.clearedDiffs.push(diff);
      }
      localStorage.setItem(this.KEY_RECORDS, JSON.stringify(records));
      return records;
    } catch (e) {
      return null;
    }
  }

  static getSettings() {
    try {
      const data = localStorage.getItem(this.KEY_SETTINGS);
      return data ? JSON.parse(data) : {
        bgmVol: 0.8,
        sfxVol: 0.9,
        screenShake: true,
        damageText: true,
        highParticles: true
      };
    } catch (e) {
      return { bgmVol: 0.8, sfxVol: 0.9, screenShake: true, damageText: true, highParticles: true };
    }
  }

  static saveSettings(settings) {
    try {
      localStorage.setItem(this.KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {}
  }
}

// --- Audio Manager (Web Audio API Synthesizer with Polyphonic BGM & Cute Voices) ---
class SoundController {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.bgmEnabled = true;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.step = 0;
    this.currentTrackIdx = 0;
    this.sfxVolume = 0.9;
    this.bgmVolume = 0.8;

    // Iconic Official Chiikawa BGM Tracks
    this.tracks = [
      {
        id: 'pajamas',
        name: '👚 파자마 파티즈의 노래',
        shortName: '👚 파자마',
        tempo: 154,
        melody: [
          392.00, 392.00, 329.63, 349.23, 392.00, 440.00, 392.00, 329.63,
          523.25, 493.88, 440.00, 392.00, 329.63, 293.66, 261.63, 293.66,
          392.00, 329.63, 392.00, 329.63, 440.00, 392.00, 349.23, 329.63,
          523.25, 523.25, 587.33, 659.25, 587.33, 523.25, 440.00, 523.25,
          659.25, 659.25, 587.33, 523.25, 440.00, 392.00, 440.00, 523.25,
          523.25, 493.88, 440.00, 392.00, 329.63, 293.66, 261.63, 329.63
        ],
        chords: [
          261.63, 329.63, 392.00, 261.63, 293.66, 349.23, 440.00, 293.66,
          329.63, 392.00, 493.88, 329.63, 261.63, 329.63, 392.00, 261.63
        ],
        bass: [
          130.81, 130.81, 164.81, 174.61, 196.00, 220.00, 196.00, 164.81,
          261.63, 246.94, 220.00, 196.00, 164.81, 146.83, 130.81, 146.83,
          196.00, 164.81, 196.00, 164.81, 220.00, 196.00, 174.61, 164.81,
          261.63, 261.63, 293.66, 329.63, 293.66, 261.63, 220.00, 261.63,
          329.63, 329.63, 293.66, 261.63, 220.00, 196.00, 220.00, 261.63,
          261.63, 246.94, 220.00, 196.00, 164.81, 146.83, 130.81, 164.81
        ],
        leadWave: 'square',
        bassWave: 'sawtooth'
      },
      {
        id: 'hitorigotsu',
        name: '🎸 하치와레의 혼잣말 (ひとりごつ)',
        shortName: '🎸 혼잣말',
        tempo: 126,
        melody: [
          329.63, 369.99, 415.30, 440.00, 493.88, 440.00, 415.30, 369.99,
          329.63, 415.30, 493.88, 554.37, 493.88, 440.00, 415.30, 369.99,
          554.37, 493.88, 440.00, 415.30, 369.99, 329.63, 369.99, 415.30,
          440.00, 493.88, 554.37, 659.25, 554.37, 493.88, 440.00, 329.63,
          329.63, 369.99, 415.30, 440.00, 493.88, 554.37, 493.88, 440.00,
          415.30, 369.99, 329.63, 277.18, 329.63, 369.99, 415.30, 329.63
        ],
        chords: [
          220.00, 277.18, 329.63, 220.00, 246.94, 311.13, 369.99, 246.94,
          277.18, 349.23, 415.30, 277.18, 220.00, 277.18, 329.63, 220.00
        ],
        bass: [
          164.81, 164.81, 207.65, 220.00, 246.94, 220.00, 207.65, 184.99,
          164.81, 207.65, 246.94, 277.18, 246.94, 220.00, 207.65, 184.99,
          277.18, 246.94, 220.00, 207.65, 184.99, 164.81, 184.99, 207.65,
          220.00, 246.94, 277.18, 329.63, 277.18, 246.94, 220.00, 164.81,
          164.81, 184.99, 207.65, 220.00, 246.94, 277.18, 246.94, 220.00,
          207.65, 184.99, 164.81, 138.59, 164.81, 184.99, 207.65, 164.81
        ],
        leadWave: 'triangle',
        bassWave: 'triangle'
      },
      {
        id: 'happy_ending',
        name: '🌸 치이카와 엔딩 해피 테마',
        shortName: '🌸 해피송',
        tempo: 140,
        melody: [
          523.25, 587.33, 659.25, 523.25, 659.25, 783.99, 659.25, 587.33,
          523.25, 440.00, 392.00, 440.00, 523.25, 587.33, 523.25, 392.00,
          523.25, 587.33, 659.25, 523.25, 659.25, 783.99, 880.00, 783.99,
          659.25, 587.33, 523.25, 440.00, 392.00, 523.25, 587.33, 523.25
        ],
        chords: [
          261.63, 329.63, 392.00, 261.63, 349.23, 440.00, 523.25, 349.23,
          392.00, 493.88, 587.33, 392.00, 261.63, 329.63, 392.00, 261.63
        ],
        bass: [
          130.81, 130.81, 164.81, 164.81, 174.61, 174.61, 196.00, 196.00,
          130.81, 130.81, 164.81, 164.81, 174.61, 196.00, 130.81, 130.81
        ],
        leadWave: 'sine',
        bassWave: 'triangle'
      }
    ];
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playShoot(charType = 'chiikawa') {
    try {
      if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const vol = this.sfxVolume;

      if (charType === 'usagi') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(560, now);
        osc.frequency.exponentialRampToValueAtTime(70, now + 0.12);
        gain.gain.setValueAtTime(0.24 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      } else if (charType === 'hachiware') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(260, now + 0.08);
        gain.gain.setValueAtTime(0.18 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(660, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.1);
        gain.gain.setValueAtTime(0.16 * vol, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      }

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.12);
    } catch (e) {}
  }

  playHit() {
    try {
      if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.06);

      gain.gain.setValueAtTime(0.16 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {}
  }

  playCritHit() {
    try {
      if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(450, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.1);
      gain.gain.setValueAtTime(0.22 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    } catch (e) {}
  }

  playDash() {
    try {
      if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.16);

      gain.gain.setValueAtTime(0.2 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch (e) {}
  }

  playExplosion() {
    try {
      if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.35;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(500, now);
      filter.frequency.exponentialRampToValueAtTime(70, now + 0.35);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.45 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (e) {}
  }

  playVoiceChirp(charType = 'chiikawa') {
    try {
      if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      if (charType === 'usagi') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.linearRampToValueAtTime(1400, now + 0.08);
      } else if (charType === 'hachiware') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.linearRampToValueAtTime(750, now + 0.08);
      } else {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.linearRampToValueAtTime(680, now + 0.08);
      }

      gain.gain.setValueAtTime(0.12 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (e) {}
  }

  playRelicFanfare() {
    if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.51, 1567.98];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.3 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    });
  }

  playLaser() {
    try {
      if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.linearRampToValueAtTime(1046.5, now + 0.22);

      gain.gain.setValueAtTime(0.2 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch (e) {}
  }

  playPickup() {
    if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.setValueAtTime(880, now + 0.04);
    osc.frequency.setValueAtTime(1174.66, now + 0.08);

    gain.gain.setValueAtTime(0.12 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  playLevelUp() {
    if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);
      gain.gain.setValueAtTime(0.25 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  playBossWarning() {
    if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.18;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.linearRampToValueAtTime(120, t + 0.14);
      gain.gain.setValueAtTime(0.35 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.01, t + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.14);
    }
  }

  startBGM() {
    if (!this.bgmEnabled || this.bgmPlaying) return;
    this.init();
    this.bgmPlaying = true;
    this.step = 0;
    this.scheduleBGMStep();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIdx];
  }

  switchNextTrack() {
    this.currentTrackIdx = (this.currentTrackIdx + 1) % this.tracks.length;
    this.step = 0;
    return this.getCurrentTrack();
  }

  scheduleBGMStep() {
    if (!this.bgmPlaying || !this.ctx) return;
    const track = this.getCurrentTrack();
    const stepDuration = 60 / track.tempo / 2;

    const melFreq = track.melody[this.step % track.melody.length];
    const bassFreq = track.bass[this.step % track.bass.length];
    const chordFreq = track.chords ? track.chords[Math.floor(this.step / 2) % track.chords.length] : null;

    const now = this.ctx.currentTime;
    const volMult = this.bgmVolume;

    // Melody lead
    const oscLead = this.ctx.createOscillator();
    const gainLead = this.ctx.createGain();
    oscLead.type = track.leadWave;
    oscLead.frequency.setValueAtTime(melFreq, now);
    gainLead.gain.setValueAtTime(0.08 * volMult, now);
    gainLead.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.9);
    oscLead.connect(gainLead);
    gainLead.connect(this.ctx.destination);
    oscLead.start(now);
    oscLead.stop(now + stepDuration * 0.9);

    // Bass line
    const oscBass = this.ctx.createOscillator();
    const gainBass = this.ctx.createGain();
    oscBass.type = track.bassWave;
    oscBass.frequency.setValueAtTime(bassFreq, now);
    gainBass.gain.setValueAtTime(0.06 * volMult, now);
    gainBass.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 0.85);
    oscBass.connect(gainBass);
    gainBass.connect(this.ctx.destination);
    oscBass.start(now);
    oscBass.stop(now + stepDuration * 0.85);

    // Subtle Chords harmony
    if (chordFreq && this.step % 2 === 0) {
      const oscChord = this.ctx.createOscillator();
      const gainChord = this.ctx.createGain();
      oscChord.type = 'sine';
      oscChord.frequency.setValueAtTime(chordFreq, now);
      gainChord.gain.setValueAtTime(0.04 * volMult, now);
      gainChord.gain.exponentialRampToValueAtTime(0.001, now + stepDuration * 1.8);
      oscChord.connect(gainChord);
      gainChord.connect(this.ctx.destination);
      oscChord.start(now);
      oscChord.stop(now + stepDuration * 1.8);
    }

    // Gentle rhythm noise percussion (Kick on beat, snare on offbeat)
    if (this.step % 4 === 0) {
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(110, now);
      kickOsc.frequency.exponentialRampToValueAtTime(35, now + 0.08);
      kickGain.gain.setValueAtTime(0.12 * volMult, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      kickOsc.connect(kickGain);
      kickGain.connect(this.ctx.destination);
      kickOsc.start(now);
      kickOsc.stop(now + 0.08);
    }

    this.step++;
    this.bgmTimer = setTimeout(() => this.scheduleBGMStep(), stepDuration * 1000);
  }
}

const Sound = new SoundController();

// --- Sanctuary Zone Definition (Exploration Lairs) ---
class Sanctuary {
  constructor(id, name, x, y, bossType, relicType, relicName, icon, color) {
    this.id = id;
    this.name = name;
    this.x = x;
    this.y = y;
    this.radius = 360;
    this.bossType = bossType;
    this.relicType = relicType;
    this.relicName = relicName;
    this.icon = icon;
    this.color = color;
    this.bossSpawned = false;
    this.bossDefeated = false;
    this.chestOpened = false;
    this.chestRadius = 28;
  }

  draw(ctx, camera) {
    ctx.save();
    ctx.strokeStyle = this.chestOpened ? '#22c55e' : this.color;
    ctx.lineWidth = 4;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 24;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = this.chestOpened ? 'rgba(34, 197, 94, 0.07)' : 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();

    // Landmark banner
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Jua", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.icon} ${this.name}`, this.x, this.y - this.radius + 35);

    // Draw Treasure Chest in center
    ctx.translate(this.x, this.y);
    if (!this.chestOpened) {
      const bob = Math.sin(Date.now() / 240) * 5;
      ctx.font = '36px sans-serif';
      ctx.fillText(this.bossDefeated ? '🎁' : '🔒', 0, bob);
      ctx.font = 'bold 12px "Jua", sans-serif';
      ctx.fillStyle = this.bossDefeated ? '#facc15' : '#ef4444';
      ctx.fillText(this.bossDefeated ? '보물 상자 열기 (접근)' : '수호 보스 격파 필요', 0, bob + 28);
    } else {
      ctx.font = '30px sans-serif';
      ctx.fillText('✨', 0, 0);
      ctx.font = 'bold 12px "Jua", sans-serif';
      ctx.fillStyle = '#22c55e';
      ctx.fillText('토벌 완료 (CLEARED)', 0, 24);
    }
    ctx.restore();
  }
}

// --- Sakura & Environmental Atmosphere Particle ---
class SakuraParticle {
  constructor(worldWidth, worldHeight) {
    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
    this.reset();
  }

  reset() {
    this.x = Math.random() * this.worldWidth;
    this.y = Math.random() * this.worldHeight;
    this.size = 4 + Math.random() * 6;
    this.speedX = 0.6 + Math.random() * 1.2;
    this.speedY = 0.8 + Math.random() * 1.0;
    this.swayAngle = Math.random() * Math.PI * 2;
    this.swaySpeed = 1.5 + Math.random() * 2.0;
    this.alpha = 0.35 + Math.random() * 0.45;
  }

  update(dt) {
    this.swayAngle += this.swaySpeed * dt;
    this.x += (this.speedX + Math.sin(this.swayAngle) * 0.8) * dt * 60;
    this.y += this.speedY * dt * 60;

    if (this.x > this.worldWidth || this.y > this.worldHeight) {
      this.x = Math.random() * this.worldWidth;
      this.y = -20;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle = '#ffccd5';
    ctx.translate(this.x, this.y);
    ctx.rotate(this.swayAngle);
    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

// --- Particle & Damage Text System ---
class Particle {
  constructor(x, y, vx, vy, radius, color, life, type = 'star') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.maxRadius = radius;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.type = type;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotSpeed = (Math.random() - 0.5) * 8;
  }

  update(dt) {
    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;
    this.life -= dt;
    this.rotation += this.rotSpeed * dt;

    if (this.type === 'smoke') {
      this.radius = this.maxRadius * (1 + (1 - this.life / this.maxLife) * 1.4);
      this.vx *= 0.95;
      this.vy *= 0.95;
    } else if (this.type === 'star' || this.type === 'sparkle') {
      this.vx *= 0.93;
      this.vy *= 0.93;
    } else if (this.type === 'ring') {
      this.radius += dt * 180;
    }
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    if (this.type === 'star') {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.radius, -Math.sin((18 + i * 72) * Math.PI / 180) * this.radius);
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.radius * 0.45), -Math.sin((54 + i * 72) * Math.PI / 180) * (this.radius * 0.45));
      }
      ctx.closePath();
      ctx.fill();
    } else if (this.type === 'ring') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

class DamageText {
  constructor(x, y, text, color = '#ff4081', isCrit = false) {
    this.x = x + (Math.random() * 20 - 10);
    this.y = y - 10;
    this.text = text;
    this.color = color;
    this.isCrit = isCrit;
    this.life = 0.85;
    this.maxLife = 0.85;
    this.vy = isCrit ? -2.2 : -1.5;
    this.scale = isCrit ? 1.4 : 1.0;
  }

  update(dt) {
    this.y += this.vy * dt * 60;
    this.life -= dt;
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.fillStyle = this.color;
    ctx.font = this.isCrit ? '900 23px "Jua", "Noto Sans KR"' : 'bold 16px "Jua", "Noto Sans KR"';
    ctx.shadowColor = 'rgba(255,255,255,0.9)';
    ctx.shadowBlur = 6;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

class Shockwave {
  constructor(x, y, maxRadius = 180, damage = 22, color = '#ea580c') {
    this.x = x;
    this.y = y;
    this.radius = 10;
    this.maxRadius = maxRadius;
    this.damage = damage;
    this.color = color;
    this.life = 0.7;
    this.maxLife = 0.7;
    this.hitPlayer = false;
  }

  update(dt, player, damageTexts) {
    this.life -= dt;
    this.radius += (this.maxRadius / this.maxLife) * dt;

    if (!this.hitPlayer && player.invulnerableTimer <= 0) {
      const dist = Math.hypot(player.x - this.x, player.y - this.y);
      if (Math.abs(dist - this.radius) < 22) {
        if (player.hasShield) {
          player.hasShield = false;
          damageTexts.push(new DamageText(player.x, player.y, `🛡️ 보호막 방어!`, '#38bdf8', true));
          this.hitPlayer = true;
          return;
        }
        this.hitPlayer = true;
        player.hp -= this.damage;
        player.invulnerableTimer = 0.35;
        Sound.playHit();
        damageTexts.push(new DamageText(player.x, player.y, `-${this.damage} [충격파!]`, '#ef4444', true));
        const shockQuote = player.charType === 'usagi' ? "우뺘-!!" : (player.charType === 'hachiware' ? "으앗, 충격파다!" : "후에에엥-!!");
        player.say(shockQuote, true);
      }
    }
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 5;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}

class FieldItem {
  constructor(x, y, itemType = 'pudding') {
    this.x = x;
    this.y = y;
    this.itemType = itemType;
    this.radius = 18;
    this.life = 45.0;
    this.bobTimer = Math.random() * Math.PI * 2;
  }

  update(dt, playerX, playerY) {
    this.life -= dt;
    this.bobTimer += dt * 4;

    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const dist = Math.hypot(dx, dy);
    if (dist < 160) {
      this.x += (dx / dist) * 5.5 * dt * 60;
      this.y += (dy / dist) * 5.5 * dt * 60;
    }
  }

  draw(ctx) {
    const bob = Math.sin(this.bobTimer) * 4;
    ctx.save();
    ctx.translate(this.x, this.y + bob);

    let auraColor = 'rgba(255, 230, 109, 0.45)';
    let emoji = '🍮';
    if (this.itemType === 'onigiri') {
      auraColor = 'rgba(239, 68, 68, 0.45)';
      emoji = '🍙';
    } else if (this.itemType === 'shield') {
      auraColor = 'rgba(56, 189, 248, 0.45)';
      emoji = '🛡️';
    } else if (this.itemType === 'magnet') {
      auraColor = 'rgba(168, 85, 247, 0.45)';
      emoji = '🧲';
    }

    ctx.fillStyle = auraColor;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + 6, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(emoji, 0, 0);

    ctx.restore();
  }
}

// --- Projectiles & Attacks ---
class Projectile {
  constructor(x, y, vx, vy, damage, pierce = 1, fromPlayer = true, color = '#ff79b0', size = 8, homing = false, shape = 'star') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.pierce = pierce;
    this.fromPlayer = fromPlayer;
    this.color = color;
    this.size = size;
    this.homing = homing;
    this.shape = shape;
    this.distance = 0;
    this.maxDistance = 1800;
    this.hitEnemies = new Set();
    this.life = 5.0;
    this.rotation = Math.atan2(vy, vx);
  }

  update(dt, target = null, enemies = []) {
    if (this.homing && enemies.length > 0) {
      let nearest = null;
      let minD = 550;
      for (const e of enemies) {
        if (this.hitEnemies.has(e)) continue;
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < minD) {
          minD = d;
          nearest = e;
        }
      }

      if (nearest) {
        const dx = nearest.x - this.x;
        const dy = nearest.y - this.y;
        const angle = Math.atan2(dy, dx);
        const curSpeed = Math.hypot(this.vx, this.vy) || 10;
        this.vx = this.vx * 0.88 + Math.cos(angle) * curSpeed * 0.12;
        this.vy = this.vy * 0.88 + Math.sin(angle) * curSpeed * 0.12;
      }
    }

    const stepX = this.vx * dt * 60;
    const stepY = this.vy * dt * 60;
    this.x += stepX;
    this.y += stepY;
    this.distance += Math.hypot(stepX, stepY);
    this.life -= dt;
    this.rotation = Math.atan2(this.vy, this.vx);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;

    if (this.shape === 'crescent') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 1.5, -Math.PI / 2.5, Math.PI / 2.5);
      ctx.stroke();
    } else if (this.shape === 'carrot') {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 1.4, this.size * 0.7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(-this.size * 1.3, -2, 4, 4);
    } else if (this.shape === 'star') {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size, -Math.sin((18 + i * 72) * Math.PI / 180) * this.size);
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size * 0.5), -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size * 0.5));
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

class Boomerang {
  constructor(x, y, targetX, targetY, damage = 160, owner = null) {
    this.x = x;
    this.y = y;
    this.owner = owner;
    this.damage = damage;
    this.radius = 16;
    const angle = Math.atan2(targetY - y, targetX - x);
    this.vx = Math.cos(angle) * 14;
    this.vy = Math.sin(angle) * 14;
    this.life = 1.4;
    this.maxLife = 1.4;
    this.hitEnemies = new Set();
    this.rotation = 0;
  }

  update(dt, player) {
    this.life -= dt;
    this.rotation += dt * 18;

    if (this.life < this.maxLife * 0.5 && player) {
      const dx = player.x - this.x;
      const dy = player.y - this.y;
      const dist = Math.hypot(dx, dy) || 1;
      this.vx = (dx / dist) * 16;
      this.vy = (dy / dist) * 16;
    }

    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.fillStyle = '#ea580c';
    ctx.shadowColor = '#f97316';
    ctx.shadowBlur = 12;

    ctx.beginPath();
    ctx.arc(0, 0, 18, 0, Math.PI);
    ctx.lineTo(-4, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

class CarrotMeteor {
  constructor(targetX, targetY, damage = 650, radius = 260) {
    this.targetX = targetX;
    this.targetY = targetY;
    this.x = targetX - 250;
    this.y = targetY - 450;
    this.damage = damage;
    this.radius = radius;
    this.progress = 0;
    this.speed = 1.8;
    this.landed = false;
  }

  update(dt) {
    this.progress += this.speed * dt;
    if (this.progress >= 1.0) {
      this.progress = 1.0;
      this.landed = true;
    }
    this.x = (this.targetX - 250) + 250 * this.progress;
    this.y = (this.targetY - 450) + 450 * this.progress;
  }

  draw(ctx) {
    ctx.save();
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.6)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(this.targetX, this.targetY, this.radius * (1 - this.progress * 0.5), 0, Math.PI * 2);
    ctx.stroke();

    ctx.translate(this.x, this.y);
    ctx.rotate(Math.PI / 4);
    ctx.fillStyle = '#ea580c';
    ctx.shadowColor = '#ff4500';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.ellipse(0, 0, 45, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

class Grenade {
  constructor(startX, startY, targetX, targetY, damage = 220, radius = 170) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.radius = radius;
    this.progress = 0;
    this.speed = 1.6;
    this.exploded = false;
    this.arcHeight = 120;
  }

  update(dt) {
    this.progress += this.speed * dt;
    if (this.progress >= 1.0) {
      this.progress = 1.0;
      this.exploded = true;
    }
    this.x = this.startX + (this.targetX - this.startX) * this.progress;
    const linearY = this.startY + (this.targetY - this.startY) * this.progress;
    const arc = 4 * this.arcHeight * this.progress * (1 - this.progress);
    this.y = linearY - arc;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.progress * 14);

    ctx.fillStyle = '#8b5e3c';
    ctx.beginPath();
    ctx.ellipse(0, 0, 16, 20, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#5c3a21';
    ctx.beginPath();
    ctx.arc(0, -10, 16, Math.PI, 0);
    ctx.fill();

    ctx.restore();
  }
}

class ExpGem {
  constructor(x, y, value = 15) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.radius = 7;
    this.life = 50;
    this.color = value >= 80 ? '#f59e0b' : (value >= 40 ? '#8b5cf6' : '#10b981');
    this.bob = Math.random() * Math.PI * 2;
  }

  update(dt, playerX, playerY) {
    this.life -= dt;
    this.bob += dt * 4;

    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const dist = Math.hypot(dx, dy);

    if (dist < 180) {
      const spd = 8.5;
      this.x += (dx / dist) * spd * dt * 60;
      this.y += (dy / dist) * spd * dt * 60;
    }
  }

  draw(ctx) {
    const yOff = Math.sin(this.bob) * 3;
    ctx.save();
    ctx.translate(this.x, this.y + yOff);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 6;

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * 60) * Math.PI / 180;
      const r = (i % 2 === 0) ? this.radius : this.radius * 0.55;
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
    }
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }
}

// --- Enemy Classes (with Sanctuary Guardian Bosses & High Polish) ---
class Enemy {
  constructor(x, y, type = 'bug', wave = 1, diffConfig = { hpMult: 1.0, dmgMult: 1.0, spdMult: 1.0 }) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.hitTimer = 0;
    this.wave = wave;
    this.diffConfig = diffConfig;

    this.chargeTimer = 0;
    this.isCharging = false;
    this.chargeAngle = 0;
    this.stompTimer = 0;
    this.shootCooldown = 2.0;
    this.timer = Math.random() * 1.5;
    this.specialTimer = 0;
    this.phase = 1;
    this.blindTimer = 0;

    if (type === 'bug') {
      this.radius = 20;
      this.hp = (32 + wave * 9) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = (2.6 + Math.random() * 0.6) * diffConfig.spdMult;
      this.damage = Math.round(10 * diffConfig.dmgMult);
      this.color = '#a855f7';
      this.xp = 15;
      this.name = '날벌레 몬스터';
    } else if (type === 'goblin') {
      this.radius = 26;
      this.hp = (85 + wave * 22) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 2.0 * diffConfig.spdMult;
      this.damage = Math.round(15 * diffConfig.dmgMult);
      this.shootCooldown = Math.max(1.5, 2.8 - wave * 0.05);
      this.color = '#10b981';
      this.xp = 35;
      this.name = '숲속 고블린';
    } else if (type === 'chimera') {
      this.radius = 34;
      this.hp = (280 + wave * 65) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.35 * diffConfig.spdMult;
      this.damage = Math.round(26 * diffConfig.dmgMult);
      this.color = '#f97316';
      this.xp = 80;
      this.name = '눈물의 장갑 키메라';
    } else if (type === 'dark_swarm') {
      this.radius = 18;
      this.hp = (45 + wave * 11) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = (3.6 + Math.random() * 0.4) * diffConfig.spdMult;
      this.damage = Math.round(14 * diffConfig.dmgMult);
      this.color = '#475569';
      this.xp = 25;
      this.name = '어둠의 검은 벌레';
    } else if (type === 'lightning_beetle') {
      this.radius = 22;
      this.hp = (110 + wave * 28) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 2.2 * diffConfig.spdMult;
      this.damage = Math.round(22 * diffConfig.dmgMult);
      this.color = '#eab308';
      this.xp = 55;
      this.name = '번개 풍뎅이';
    } else if (type === 'iron_chimera') {
      this.radius = 42;
      this.hp = (600 + wave * 110) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.15 * diffConfig.spdMult;
      this.damage = Math.round(35 * diffConfig.dmgMult);
      this.color = '#6366f1';
      this.xp = 130;
      this.name = '강철 중장갑 키메라';
    } else if (type.startsWith('sanctuary_boss')) {
      this.radius = 56;
      this.hp = 3400 * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.4 * diffConfig.spdMult;
      this.damage = Math.round(36 * diffConfig.dmgMult);
      this.color = '#ec4899';
      this.xp = 600;
      this.shootCooldown = 1.6;
      if (type === 'sanctuary_boss_nw') this.name = '🍄 독안개 가시 키메라';
      else if (type === 'sanctuary_boss_ne') this.name = '🍜 강철 갑옷 풍뎅이';
      else if (type === 'sanctuary_boss_sw') this.name = '🏰 흑화 쌍두 키메라';
      else this.name = '⚡ 폭풍 번개 골렘';
    } else if (type === 'midboss') {
      this.radius = 54;
      this.hp = (2600 + wave * 450) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.45 * diffConfig.spdMult;
      this.damage = Math.round(34 * diffConfig.dmgMult);
      this.color = '#ea580c';
      this.xp = 450;
      this.shootCooldown = 1.8;
      if (wave === 5) this.name = '폭주하는 가시 키메라';
      else if (wave === 10) this.name = '돌연변이 쌍두 키메라';
      else this.name = '거대 바위 철갑 키메라';
    } else if (type === 'boss') {
      this.radius = 68;
      this.hp = (6500 + wave * 700) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.5 * diffConfig.spdMult;
      this.damage = Math.round(48 * diffConfig.dmgMult);
      this.color = '#e11d48';
      this.xp = 1500;
      this.name = '진(眞) 거대 아노코 [최종 결전]';
      this.shootCooldown = 1.5;
    }
  }

  update(dt, player, projectiles, shockwaves, particles) {
    if (this.hitTimer > 0) this.hitTimer -= dt;
    if (this.blindTimer > 0) this.blindTimer -= dt;

    const curSpeed = this.blindTimer > 0 ? this.speed * 0.35 : this.speed;
    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;

    if (this.type === 'goblin') {
      if (dist > 300) {
        this.x += (dx / dist) * curSpeed * dt * 60;
        this.y += (dy / dist) * curSpeed * dt * 60;
      } else if (dist < 180) {
        this.x -= (dx / dist) * curSpeed * 0.8 * dt * 60;
        this.y -= (dy / dist) * curSpeed * 0.8 * dt * 60;
      }

      this.timer += dt;
      if (this.timer >= this.shootCooldown && this.blindTimer <= 0) {
        this.timer = 0;
        const angle = Math.atan2(dy, dx);
        const pSpeed = 6.0;
        const numShots = this.wave >= 12 ? 3 : (this.wave >= 6 ? 2 : 1);
        for (let i = 0; i < numShots; i++) {
          const spread = (i - (numShots - 1) / 2) * 0.18;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(angle + spread) * pSpeed, Math.sin(angle + spread) * pSpeed, this.damage, 1, false, '#10b981', 6, false, 'orb')
          );
        }
      }
    } else if (this.type === 'lightning_beetle') {
      this.chargeTimer += dt;
      if (this.chargeTimer > 3.0 && !this.isCharging && this.blindTimer <= 0) {
        this.isCharging = true;
        this.chargeAngle = Math.atan2(dy, dx);
        for (let k = 0; k < 6; k++) {
          particles.push(new Particle(this.x, this.y, (Math.random() - 0.5) * 6, (Math.random() - 0.5) * 6, 6, '#fef08a', 0.25, 'sparkle'));
        }
      }

      if (this.isCharging) {
        this.x += Math.cos(this.chargeAngle) * curSpeed * 3.2 * dt * 60;
        this.y += Math.sin(this.chargeAngle) * curSpeed * 3.2 * dt * 60;
        if (this.chargeTimer >= 3.8) {
          this.isCharging = false;
          this.chargeTimer = 0;
        }
      } else {
        this.x += (dx / dist) * curSpeed * dt * 60;
        this.y += (dy / dist) * curSpeed * dt * 60;
      }
    } else if (this.type === 'iron_chimera') {
      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;

      this.stompTimer += dt;
      if (this.stompTimer >= 4.2) {
        this.stompTimer = 0;
        shockwaves.push(new Shockwave(this.x, this.y, 220, Math.round(this.damage * 0.85), '#6366f1'));
      }
    } else if (this.type.startsWith('sanctuary_boss')) {
      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;

      this.timer += dt;
      this.specialTimer += dt;

      if (this.timer >= this.shootCooldown && this.blindTimer <= 0) {
        this.timer = 0;
        const count = 10;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i;
          projectiles.push(new Projectile(this.x, this.y, Math.cos(angle) * 5.2, Math.sin(angle) * 5.2, 18, 1, false, '#ec4899', 8, false, 'orb'));
        }
      }

      if (this.specialTimer >= 4.5) {
        this.specialTimer = 0;
        shockwaves.push(new Shockwave(this.x, this.y, 260, 28, '#ec4899'));
      }
    } else if (this.type === 'midboss') {
      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;

      this.timer += dt;
      this.specialTimer += dt;

      if (this.timer >= this.shootCooldown && this.blindTimer <= 0) {
        this.timer = 0;
        const count = 8;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(angle) * 4.8, Math.sin(angle) * 4.8, 16, 1, false, '#ea580c', 7, false, 'orb')
          );
        }
      }

      if (this.specialTimer >= 5.0) {
        this.specialTimer = 0;
        shockwaves.push(new Shockwave(this.x, this.y, 250, 25, '#ea580c'));
      }
    } else if (this.type === 'boss') {
      const hpRatio = this.hp / this.maxHp;
      if (hpRatio <= 0.5 && this.phase === 1) {
        this.phase = 2;
        this.speed *= 1.35;
        this.shootCooldown = 1.0;
        Sound.playBossWarning();
      }

      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;

      this.timer += dt;
      this.specialTimer += dt;

      if (this.timer >= this.shootCooldown && this.blindTimer <= 0) {
        this.timer = 0;
        const count = this.phase === 2 ? 20 : 14;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i + Math.sin(Date.now() / 200);
          const pSpeed = this.phase === 2 ? 5.8 : 4.6;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(angle) * pSpeed, Math.sin(angle) * pSpeed, 18, 1, false, '#f43f5e', 8, false, 'orb')
          );
        }
      }

      if (this.specialTimer >= (this.phase === 2 ? 2.8 : 4.0)) {
        this.specialTimer = 0;
        for (let offset of [-0.4, -0.2, 0, 0.2, 0.4]) {
          const baseAngle = Math.atan2(dy, dx) + offset;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(baseAngle) * 8.5, Math.sin(baseAngle) * 8.5, 26, 1, false, '#fbbf24', 10, false, 'orb')
          );
        }
        if (this.phase === 2) {
          shockwaves.push(new Shockwave(this.x, this.y, 320, 32, '#e11d48'));
        }
      }
    } else {
      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const isHit = this.hitTimer > 0;
    const sprites = window.GameInstance?.sprites || {};
    let sprite = null;

    if (this.type === 'bug') sprite = sprites.bug;
    else if (this.type === 'goblin') sprite = sprites.goblin;
    else if (this.type === 'chimera') sprite = sprites.chimera;
    else if (this.type === 'dark_swarm') sprite = sprites.dark_swarm;
    else if (this.type === 'lightning_beetle') sprite = sprites.bug;
    else if (this.type === 'iron_chimera') sprite = sprites.iron_chimera;
    else if (this.type.startsWith('sanctuary_boss') || this.type === 'midboss') sprite = sprites.midboss;
    else if (this.type === 'boss') sprite = sprites.anoko;

    if (isHit) {
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#ffffff';
      ctx.shadowBlur = 18;
    }

    if (sprite && sprite.complete && sprite.naturalWidth > 0) {
      ctx.save();
      const auraPulse = Math.sin(Date.now() / 140) * 3;
      ctx.strokeStyle = this.color;
      ctx.lineWidth = (this.type === 'boss' || this.type.includes('boss')) ? 4 : 2;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = (this.type === 'boss' || this.type.includes('boss')) ? 20 : 8;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 3 + (this.type === 'boss' ? auraPulse : 0), 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(sprite, -this.radius - 4, -this.radius - 4, (this.radius + 4) * 2, (this.radius + 4) * 2);
      ctx.restore();

      if (this.type === 'lightning_beetle') {
        ctx.strokeStyle = '#fef08a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(-8, -14); ctx.lineTo(-14, -28); ctx.lineTo(-8, -26); ctx.lineTo(-12, -36);
        ctx.moveTo(8, -14); ctx.lineTo(14, -28); ctx.lineTo(8, -26); ctx.lineTo(12, -36);
        ctx.stroke();
      }
    } else {
      ctx.fillStyle = isHit ? '#ffffff' : this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.blindTimer > 0) {
      ctx.font = '16px sans-serif';
      ctx.fillText('💫', -8, -this.radius - 24);
    }

    if (this.hp < this.maxHp || this.type === 'boss' || this.type.includes('boss')) {
      const barW = this.radius * 2 + 16;
      const barH = (this.type === 'boss' || this.type.includes('boss')) ? 8 : 6;
      const hpRatio = Math.max(0, this.hp / this.maxHp);
      ctx.fillStyle = 'rgba(0,0,0,0.65)';
      ctx.fillRect(-barW / 2, -this.radius - 18, barW, barH);
      ctx.fillStyle = (this.type === 'boss' || this.type.includes('boss')) ? '#e11d48' : '#22c55e';
      ctx.fillRect(-barW / 2, -this.radius - 18, barW * hpRatio, barH);
    }

    ctx.restore();
  }
}

// --- Helper: Cross-browser Rounded Rectangle ---
function drawBubbleRect(ctx, x, y, width, height, radius) {
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  } else {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }
}

// --- Player Class ---
class Player {
  constructor(x, y, charType = 'chiikawa', spriteImg) {
    this.x = x;
    this.y = y;
    this.charType = charType;
    this.sprite = spriteImg;
    this.radius = 26;

    if (charType === 'usagi') {
      this.maxHp = 95;
      this.hp = 95;
      this.speed = 5.8;
      this.baseDamage = 22;
      this.attackCooldown = 0.22;
      this.bulletColor = '#f59e0b';
      this.nameTag = '🐰 우사기';
      this.shotgunPellets = 5;
      this.madnessStacks = 0;
      this.madnessTimer = 0;
    } else if (charType === 'hachiware') {
      this.maxHp = 100;
      this.hp = 100;
      this.speed = 5.3;
      this.baseDamage = 32;
      this.attackCooldown = 0.16;
      this.bulletColor = '#38bdf8';
      this.nameTag = '🐱 하치와레';
      this.positiveTimer = 0;
    } else {
      this.maxHp = 110;
      this.hp = 110;
      this.speed = 5.2;
      this.baseDamage = 34;
      this.attackCooldown = 0.18;
      this.bulletColor = '#ff79b0';
      this.nameTag = '🌸 용감한 치이카와';
      this.tearOrbitAngle = 0;
    }

    this.damageMultiplier = 1.0;
    this.fireTimer = 0;
    this.bulletCount = 1;
    this.pierce = charType === 'hachiware' ? 2 : 1;
    this.lifesteal = 0;

    this.hasShield = false;
    this.doubleDamageTimer = 0;

    // Relic buff attributes
    this.hasAutoShieldRegen = false;
    this.autoShieldTimer = 15.0;
    this.relicsCount = 0;

    this.vx = 0;
    this.vy = 0;
    this.facingLeft = false;
    this.aimAngle = 0;
    this.bobTimer = 0;
    this.walkTimer = 0;
    this.isMoving = false;
    this.stepDustTimer = 0;

    this.dashCooldown = 2.0;
    this.dashTimer = 0;
    this.isDashing = false;
    this.dashDuration = 0.28;
    this.dashDurationTimer = 0;
    this.dashVx = 0;
    this.dashVy = 0;
    this.afterimages = [];

    this.cdQ = 5.5;
    this.timerQ = 0;
    this.cdE = 12.0;
    this.timerE = 0;
    this.cdR = 20.0;
    this.timerR = 0;

    this.isTornadoSpinning = false;
    this.tornadoTimer = 0;
    this.isTearShieldActive = false;
    this.tearShieldTimer = 0;
    this.isFiringLaser = false;
    this.laserTimer = 0;
    this.laserDuration = 2.0;

    this.invulnerableTimer = 0;

    this.dialogues = this.getCharDialogues(charType);
    this.currentDialogue = this.dialogues[0];
    this.dialogueTimer = 1.0;
    this.dialogueLife = 2.5;
    this.dialoguePopAnim = 1.0;
  }

  getCharDialogues(charType) {
    if (charType === 'usagi') {
      return ["우라라라라-!!", "야하-!!", "뿌루루루루-!", "하아?!", "우뺘-!!", "후ゥゥゥ하-!!"];
    } else if (charType === 'hachiware') {
      return ["난또까나레-!!", "어떻게든 될 거야!", "치이카와, 조심해!", "카메라 찰칵!", "기타 연주 시작-!"];
    } else {
      return ["와... 와아...!", "와아앗-!!", "후에에... 후에엥!", "햐앙...!", "야앗...!", "용기 100배...!"];
    }
  }

  say(text, force = false) {
    if (force || this.dialogueTimer <= 0) {
      this.currentDialogue = text;
      this.dialogueTimer = 3.5;
      this.dialogueLife = 2.2;
      this.dialoguePopAnim = 0.2;
      Sound.playVoiceChirp(this.charType);
    }
  }

  update(dt, keys, worldMouseX, worldMouseY, particles, grenades, boomerangs, meteors, worldWidth, worldHeight, enemies, damageTexts) {
    if (this.dashTimer > 0) this.dashTimer -= dt;
    if (this.timerQ > 0) this.timerQ -= dt;
    if (this.timerE > 0) this.timerE -= dt;
    if (this.timerR > 0) this.timerR -= dt;
    if (this.fireTimer > 0) this.fireTimer -= dt;
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;

    if (this.doubleDamageTimer > 0) this.doubleDamageTimer -= dt;

    if (this.dialogueTimer > 0) this.dialogueTimer -= dt;
    if (this.dialogueLife > 0) this.dialogueLife -= dt;
    if (this.dialoguePopAnim < 1.0) this.dialoguePopAnim = Math.min(1.0, this.dialoguePopAnim + dt * 6);

    // Auto-shield regen relic
    if (this.hasAutoShieldRegen && !this.hasShield) {
      this.autoShieldTimer -= dt;
      if (this.autoShieldTimer <= 0) {
        this.hasShield = true;
        this.autoShieldTimer = 15.0;
        damageTexts.push(new DamageText(this.x, this.y - 30, '🛡️ 신전 별빛 보호막 재생!', '#38bdf8', true));
      }
    }

    if (this.isTearShieldActive) {
      this.tearShieldTimer -= dt;
      this.tearOrbitAngle += dt * 5;
      if (this.tearShieldTimer <= 0) {
        this.isTearShieldActive = false;
      }
      enemies.forEach(e => {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < 70 + e.radius) {
          const sDmg = 4 * dt * 60;
          e.hp -= sDmg;
          e.hitTimer = 0.1;
        }
      });
    }

    if (this.charType === 'usagi' && this.madnessTimer > 0) {
      this.madnessTimer -= dt;
      if (this.madnessTimer <= 0) {
        this.madnessStacks = Math.max(0, this.madnessStacks - 1);
        if (this.madnessStacks > 0) this.madnessTimer = 2.0;
      }
    }

    if (this.isTornadoSpinning) {
      this.tornadoTimer -= dt;
      this.invulnerableTimer = 0.2;
      this.bobTimer += dt * 25;
      if (Math.random() < 0.4) {
        particles.push(new Particle(this.x, this.y, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 8, 8, '#f59e0b', 0.3, 'sparkle'));
      }
      enemies.forEach(e => {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < 85 + e.radius) {
          const tDmg = 12 * dt * 60 * this.damageMultiplier;
          e.hp -= tDmg;
          e.hitTimer = 0.1;
          const kAngle = Math.atan2(e.y - this.y, e.x - this.x);
          e.x += Math.cos(kAngle) * 5;
          e.y += Math.sin(kAngle) * 5;
        }
      });
      if (this.tornadoTimer <= 0) {
        this.isTornadoSpinning = false;
      }
    }

    if (this.positiveTimer > 0) {
      this.positiveTimer -= dt;
    }

    if (this.isFiringLaser) {
      this.laserTimer -= dt;
      if (this.laserTimer <= 0) {
        this.isFiringLaser = false;
      }
    }

    this.aimAngle = Math.atan2(worldMouseY - this.y, worldMouseX - this.x);
    this.facingLeft = worldMouseX < this.x;

    if (this.isDashing) {
      this.dashDurationTimer -= dt;
      this.x += this.dashVx * dt * 60;
      this.y += this.dashVy * dt * 60;

      if (Math.random() < 0.6) {
        this.afterimages.push({
          x: this.x,
          y: this.y,
          facingLeft: this.facingLeft,
          life: 0.25,
          maxLife: 0.25
        });
      }

      if (this.dashDurationTimer <= 0) {
        this.isDashing = false;
      }
    } else {
      let moveX = 0;
      let moveY = 0;
      if (keys['KeyW'] || keys['ArrowUp']) moveY -= 1;
      if (keys['KeyS'] || keys['ArrowDown']) moveY += 1;
      if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
      if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

      const mag = Math.hypot(moveX, moveY);
      this.isMoving = mag > 0;

      if (this.isMoving) {
        let curSpeed = this.speed;
        if (this.charType === 'usagi') curSpeed += this.madnessStacks * 0.45;
        if (this.charType === 'chiikawa' && this.hp <= this.maxHp * 0.35) curSpeed *= 1.35;
        if (this.isTornadoSpinning) curSpeed *= 1.6;

        this.vx = (moveX / mag) * curSpeed;
        this.vy = (moveY / mag) * curSpeed;
        this.walkTimer += dt * 10;
        this.bobTimer += dt * 8;

        this.stepDustTimer += dt;
        if (this.stepDustTimer >= 0.16) {
          this.stepDustTimer = 0;
          particles.push(
            new Particle(this.x + (Math.random() * 12 - 6), this.y + 20, -this.vx * 0.2, (Math.random() - 0.5) * 1, 6, '#f1f5f9', 0.25, 'smoke')
          );
        }
      } else {
        this.vx *= 0.8;
        this.vy *= 0.8;
        this.bobTimer += dt * 3;
      }

      this.x += this.vx * dt * 60;
      this.y += this.vy * dt * 60;
    }

    this.x = Math.max(this.radius + 30, Math.min(worldWidth - this.radius - 30, this.x));
    this.y = Math.max(this.radius + 30, Math.min(worldHeight - this.radius - 30, this.y));

    for (let i = this.afterimages.length - 1; i >= 0; i--) {
      this.afterimages[i].life -= dt;
      if (this.afterimages[i].life <= 0) {
        this.afterimages.splice(i, 1);
      }
    }
  }

  dash(keys) {
    if (this.dashTimer > 0 || this.isDashing) return;
    this.dashTimer = this.dashCooldown;
    this.isDashing = true;
    this.dashDurationTimer = this.dashDuration;
    this.invulnerableTimer = this.dashDuration + 0.15;

    let moveX = 0;
    let moveY = 0;
    if (keys['KeyW'] || keys['ArrowUp']) moveY -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) moveY += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

    const mag = Math.hypot(moveX, moveY);
    const dashSpeed = 14.0;
    if (mag > 0) {
      this.dashVx = (moveX / mag) * dashSpeed;
      this.dashVy = (moveY / mag) * dashSpeed;
    } else {
      const angle = this.aimAngle;
      this.dashVx = Math.cos(angle) * dashSpeed;
      this.dashVy = Math.sin(angle) * dashSpeed;
    }

    Sound.playDash();
    const dashQuote = this.charType === 'usagi' ? "뿌루루루루-!" : (this.charType === 'hachiware' ? "와아앗! 피했어!" : "와아앗...!");
    this.say(dashQuote, true);
  }

  shoot(targetX, targetY, projectiles, particles) {
    let curCooldown = this.attackCooldown;
    if (this.charType === 'usagi') {
      curCooldown *= Math.max(0.4, 1.0 - this.madnessStacks * 0.12);
    } else if (this.charType === 'hachiware' && this.positiveTimer > 0) {
      curCooldown *= 0.55;
    }

    if (this.fireTimer > 0) return;
    this.fireTimer = curCooldown;

    const angle = Math.atan2(targetY - this.y, targetX - this.x);
    let dmgMult = this.damageMultiplier;
    if (this.doubleDamageTimer > 0) dmgMult *= 2.0;

    if (this.charType === 'usagi') {
      this.madnessStacks = Math.min(8, this.madnessStacks + 1);
      this.madnessTimer = 2.5;

      const numPellets = this.shotgunPellets + (this.bulletCount - 1);
      const spreadAngle = 0.55;
      for (let i = 0; i < numPellets; i++) {
        const offset = (i - (numPellets - 1) / 2) * (spreadAngle / numPellets) + (Math.random() - 0.5) * 0.08;
        const pSpeed = 12 + Math.random() * 3.5;
        projectiles.push(
          new Projectile(
            this.x, this.y,
            Math.cos(angle + offset) * pSpeed, Math.sin(angle + offset) * pSpeed,
            this.baseDamage * dmgMult, this.pierce, true, '#f59e0b', 9, false, 'carrot'
          )
        );
      }
      this.vx -= Math.cos(angle) * 1.8;
      this.vy -= Math.sin(angle) * 1.8;
    } else if (this.charType === 'hachiware') {
      const pSpeed = 15;
      for (let i = 0; i < this.bulletCount; i++) {
        const offset = (i - (this.bulletCount - 1) / 2) * 0.18;
        projectiles.push(
          new Projectile(
            this.x, this.y,
            Math.cos(angle + offset) * pSpeed, Math.sin(angle + offset) * pSpeed,
            this.baseDamage * dmgMult, this.pierce + 1, true, '#38bdf8', 11, false, 'crescent'
          )
        );
      }
    } else {
      const pSpeed = 13.5;
      const count = Math.max(2, this.bulletCount + 1);
      for (let i = 0; i < count; i++) {
        const offset = (i - (count - 1) / 2) * 0.22;
        projectiles.push(
          new Projectile(
            this.x, this.y,
            Math.cos(angle + offset) * pSpeed, Math.sin(angle + offset) * pSpeed,
            this.baseDamage * dmgMult, this.pierce, true, '#ff79b0', 9, true, 'star'
          )
        );
      }
    }

    Sound.playShoot(this.charType);
  }

  useQ(targetX, targetY, grenades, boomerangs) {
    if (this.timerQ > 0) return;
    this.timerQ = this.cdQ;

    if (this.charType === 'usagi') {
      for (let i = 0; i < 3; i++) {
        const spread = (i - 1) * 0.35;
        const baseAngle = Math.atan2(targetY - this.y, targetX - this.x) + spread;
        const tx = this.x + Math.cos(baseAngle) * 350;
        const ty = this.y + Math.sin(baseAngle) * 350;
        boomerangs.push(new Boomerang(this.x, this.y, tx, ty, 180 * this.damageMultiplier, this));
      }
      this.say("부메랑 우라-!!", true);
    } else if (this.charType === 'hachiware') {
      Sound.playExplosion();
      const enemies = window.GameInstance?.enemies || [];
      enemies.forEach(e => {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < 350) {
          e.blindTimer = 2.8;
          e.hp -= 120 * this.damageMultiplier;
          e.hitTimer = 0.15;
        }
      });
      window.GameInstance.screenShake = 8;
      this.say("카메라 플래시 찰칵!", true);
    } else {
      grenades.push(new Grenade(this.x, this.y, targetX, targetY, 260 * this.damageMultiplier, 190));
      this.say("도토리 폭탄 받아랏!", true);
    }
  }

  useE(damageTexts) {
    if (this.timerE > 0) return;
    this.timerE = this.cdE;

    if (this.charType === 'usagi') {
      this.isTornadoSpinning = true;
      this.tornadoTimer = 3.5;
      this.say("우라라라라 회전-!!", true);
    } else if (this.charType === 'hachiware') {
      this.hp = Math.min(this.maxHp, this.hp + 35);
      this.positiveTimer = 6.0;
      damageTexts.push(new DamageText(this.x, this.y - 25, '+35 HP 힐링!', '#10b981', true));
      this.say("기타 치면서 힘내자!", true);
    } else {
      this.isTearShieldActive = true;
      this.tearShieldTimer = 6.0;
      this.hasShield = true;
      damageTexts.push(new DamageText(this.x, this.y - 25, '🛡️ 눈물 방패 각성!', '#ff79b0', true));
      this.say("용기 100% 각성-!!", true);
    }
  }

  useR(targetX, targetY, meteors, damageTexts) {
    if (this.timerR > 0) return;
    this.timerR = this.cdR;

    if (this.charType === 'usagi') {
      for (let i = 0; i < 4; i++) {
        const ox = (Math.random() - 0.5) * 220;
        const oy = (Math.random() - 0.5) * 220;
        meteors.push(new CarrotMeteor(targetX + ox, targetY + oy, 550 * this.damageMultiplier, 220));
      }
      this.say("초특대 당근 메테오-!!", true);
    } else if (this.charType === 'hachiware') {
      Sound.playLaser();
      const enemies = window.GameInstance?.enemies || [];
      enemies.forEach(e => {
        e.hp -= 480 * this.damageMultiplier;
        e.hitTimer = 0.2;
      });
      window.GameInstance.screenShake = 16;
      damageTexts.push(new DamageText(this.x, this.y - 40, '⚡ 메가 슬래시 참격!', '#38bdf8', true));
      this.say("난또까나레 메가 슬래시-!!", true);
    } else {
      this.isFiringLaser = true;
      this.laserTimer = this.laserDuration;
      Sound.playLaser();
      this.say("와아앗-!! 레인보우 빔-!!", true);
    }
  }

  draw(ctx) {
    this.afterimages.forEach(img => {
      const alpha = Math.max(0, img.life / img.maxLife) * 0.45;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(img.x, img.y);
      if (img.facingLeft) ctx.scale(-1, 1);
      if (this.sprite && this.sprite.complete && this.sprite.naturalWidth > 0) {
        ctx.drawImage(this.sprite, -this.radius, -this.radius, this.radius * 2, this.radius * 2);
      }
      ctx.restore();
    });

    ctx.save();
    ctx.translate(this.x, this.y);

    const bob = Math.sin(this.bobTimer) * 3;
    const walkTilt = Math.sin(this.walkTimer) * 0.08;

    if (this.facingLeft) ctx.scale(-1, 1);
    ctx.rotate(walkTilt);

    if (this.hasShield) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, bob, this.radius + 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (this.doubleDamageTimer > 0) {
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.shadowColor = '#ef4444';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, bob, this.radius + 12, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (this.isTearShieldActive) {
      for (let i = 0; i < 3; i++) {
        const oAngle = this.tearOrbitAngle + (i * Math.PI * 2 / 3);
        const ox = Math.cos(oAngle) * 55;
        const oy = Math.sin(oAngle) * 55;
        ctx.font = '20px sans-serif';
        ctx.fillText('⭐', ox, oy);
      }
    }

    if (this.sprite && this.sprite.complete && this.sprite.naturalWidth > 0) {
      ctx.drawImage(this.sprite, -this.radius, -this.radius + bob, this.radius * 2, this.radius * 2);
    } else {
      ctx.fillStyle = this.bulletColor;
      ctx.beginPath();
      ctx.arc(0, bob, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();

    // Dialogue Bubble above head
    if (this.dialogueLife > 0) {
      ctx.save();
      ctx.translate(this.x, this.y - this.radius - 22);
      ctx.scale(this.dialoguePopAnim, this.dialoguePopAnim);

      ctx.font = 'bold 12px "Jua", sans-serif';
      const textWidth = ctx.measureText(this.currentDialogue).width;
      const bW = textWidth + 20;
      const bH = 26;

      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#ffccd5';
      ctx.lineWidth = 2;
      ctx.shadowColor = 'rgba(0,0,0,0.15)';
      ctx.shadowBlur = 8;

      drawBubbleRect(ctx, -bW / 2, -bH, bW, bH, 8);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#333333';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.currentDialogue, 0, -bH / 2);

      ctx.restore();
    }
  }
}

// --- Main Game Engine ---
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.minimapCanvas = document.getElementById('minimapCanvas');
    this.minimapCtx = this.minimapCanvas ? this.minimapCanvas.getContext('2d') : null;

    this.worldWidth = 5000;
    this.worldHeight = 5000;

    this.camera = { x: 0, y: 0, targetX: 0, targetY: 0 };
    this.screenShake = 0;

    this.sanctuaries = [
      new Sanctuary('nw', '독버섯 숲의 비밀 성소', 1000, 1000, 'sanctuary_boss_nw', 'relic_pudding', '🍮 대왕 황금 푸딩 (최대체력+50 & 완치)', '🍄', '#a855f7'),
      new Sanctuary('ne', '라멘 로 비밀 수련장', 4000, 1000, 'sanctuary_boss_ne', 'relic_ramen', '🍜 특제 차슈 라멘 (영구 공격력+35%)', '🍜', '#ef4444'),
      new Sanctuary('sw', '고대 지하 신전의 성역', 1000, 4000, 'sanctuary_boss_sw', 'relic_shield', '🛡️ 영구 별빛 보호막 (15초마다 무한 자동재생)', '🏰', '#3b82f6'),
      new Sanctuary('se', '우사기 번개 제단', 4000, 4000, 'sanctuary_boss_se', 'relic_boots', '🥾 헤르메스 당근 신발 (이속+25% & 대시쿨-40%)', '⚡', '#eab308')
    ];

    this.sakuraParticles = [];
    for (let i = 0; i < 45; i++) {
      this.sakuraParticles.push(new SakuraParticle(this.worldWidth, this.worldHeight));
    }

    this.decorations = [];
    this.generateDecorations();

    this.sprites = {};
    this.loadSprites();

    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.grenades = [];
    this.boomerangs = [];
    this.meteors = [];
    this.expGems = [];
    this.fieldItems = [];
    this.particles = [];
    this.damageTexts = [];
    this.shockwaves = [];

    this.keys = {};
    this.mouse = { x: 0, y: 0, isDown: false };
    this.selectedChar = 'chiikawa';
    this.difficulty = 'hard';

    this.wave = 1;
    this.waveTimer = 0;
    this.waveDuration = 28;
    this.maxCampaignWave = 20;
    this.gameTime = 0;
    this.score = 0;
    this.kills = 0;
    this.level = 1;
    this.currentExp = 0;
    this.maxExp = 100;

    this.comboCount = 0;
    this.comboTimer = 0;

    this.isRunning = false;
    this.isPaused = false;
    this.isLevelingUp = false;
    this.lastTime = 0;

    this.settings = StorageManager.getSettings();
    Sound.sfxVolume = this.settings.sfxVol;
    Sound.bgmVolume = this.settings.bgmVol;

    this.initEvents();
    this.resize();
    this.updateRecordDisplay();
  }

  loadSprites() {
    const list = {
      chiikawa: 'assets/chiikawa.png',
      hachiware: 'assets/hachiware.png',
      usagi: 'assets/usagi.png',
      bug: 'assets/monster_bug.png',
      goblin: 'assets/monster_goblin.png',
      chimera: 'assets/monster_chimera.png',
      dark_swarm: 'assets/monster_dark_swarm.png',
      iron_chimera: 'assets/monster_iron_chimera.png',
      midboss: 'assets/midboss.png',
      anoko: 'assets/anoko.png',
      battle_bg: 'assets/battle_bg.jpg',
      ramen_bg: 'assets/ramen_bg.jpg',
      tower_bg: 'assets/tower_bg.jpg'
    };

    for (let key in list) {
      const img = new Image();
      img.src = list[key];
      this.sprites[key] = img;
    }
  }

  generateDecorations() {
    const emojis = ['🌸', '🍄', '🌲', '⛺', '🪨', '🍀', '🌼', '🪵', '🍂', '✨', '🍙', '🍮'];
    for (let i = 0; i < 280; i++) {
      this.decorations.push({
        x: 100 + Math.random() * (this.worldWidth - 200),
        y: 100 + Math.random() * (this.worldHeight - 200),
        emoji: emojis[Math.floor(Math.random() * emojis.length)]
      });
    }
  }

  updateRecordDisplay() {
    const records = StorageManager.getRecords();
    const scoreEl = document.getElementById('rec-score');
    const killsEl = document.getElementById('rec-kills');
    const waveEl = document.getElementById('rec-wave');
    if (scoreEl) scoreEl.textContent = records.bestScore.toLocaleString();
    if (killsEl) killsEl.textContent = records.maxKills.toLocaleString();
    if (waveEl) waveEl.textContent = `Wave ${records.bestWave}`;
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  initEvents() {
    window.addEventListener('resize', () => this.resize());

    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      if (e.code === 'KeyP') this.togglePause();

      if (this.isLevelingUp) {
        if (e.code === 'Digit1') this.selectLevelUpCard(0);
        if (e.code === 'Digit2') this.selectLevelUpCard(1);
        if (e.code === 'Digit3') this.selectLevelUpCard(2);
      }

      if (this.isRunning && !this.isPaused && !this.isLevelingUp && this.player) {
        if (e.code === 'Space') {
          e.preventDefault();
          this.player.dash(this.keys);
        }
        if (e.code === 'KeyQ') {
          const wm = this.screenToWorld(this.mouse.x, this.mouse.y);
          this.player.useQ(wm.x, wm.y, this.grenades, this.boomerangs);
        }
        if (e.code === 'KeyE') {
          this.player.useE(this.damageTexts);
        }
        if (e.code === 'KeyR') {
          const wm = this.screenToWorld(this.mouse.x, this.mouse.y);
          this.player.useR(wm.x, wm.y, this.meteors, this.damageTexts);
        }
      }
    });

    window.addEventListener('keyup', (e) => {
      this.keys[e.code] = false;
    });

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mousedown', (e) => {
      if (e.button === 0) {
        this.mouse.isDown = true;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) {
        this.mouse.isDown = false;
      }
    });

    // Character Selection
    document.querySelectorAll('.char-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedChar = card.dataset.char;
      });
    });

    // Difficulty Selection
    document.querySelectorAll('.diff-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.difficulty = btn.dataset.diff;
      });
    });

    // Start Button
    document.getElementById('btn-start').addEventListener('click', () => this.start());

    // Restart & Resume Buttons
    document.getElementById('btn-restart').addEventListener('click', () => this.restart());
    document.getElementById('btn-victory-restart').addEventListener('click', () => this.restart());
    document.getElementById('btn-resume').addEventListener('click', () => this.togglePause());

    // Audio HUD Buttons
    const btnSound = document.getElementById('btn-sound');
    btnSound.addEventListener('click', () => {
      Sound.sfxEnabled = !Sound.sfxEnabled;
      btnSound.textContent = Sound.sfxEnabled ? '🔊 SFX ON' : '🔇 SFX OFF';
    });

    const btnBgm = document.getElementById('btn-bgm');
    btnBgm.addEventListener('click', () => {
      Sound.bgmEnabled = !Sound.bgmEnabled;
      if (Sound.bgmEnabled) {
        Sound.startBGM();
        btnBgm.textContent = '🎵 BGM ON';
      } else {
        Sound.stopBGM();
        btnBgm.textContent = '🔇 BGM OFF';
      }
    });

    const btnTrack = document.getElementById('btn-track');
    if (btnTrack) {
      btnTrack.addEventListener('click', () => {
        const nextTrack = Sound.switchNextTrack();
        btnTrack.textContent = `💿 ${nextTrack.shortName}`;
      });
    }

    const btnPause = document.getElementById('btn-pause');
    btnPause.addEventListener('click', () => this.togglePause());

    // Settings Modal
    const btnSettings = document.getElementById('btn-settings');
    const settingsModal = document.getElementById('settings-modal');
    const btnCloseSettings = document.getElementById('btn-close-settings');

    if (btnSettings && settingsModal) {
      btnSettings.addEventListener('click', () => {
        settingsModal.classList.add('active');
      });
    }

    if (btnCloseSettings && settingsModal) {
      btnCloseSettings.addEventListener('click', () => {
        settingsModal.classList.remove('active');
      });
    }

    // Setting controls
    const volBgm = document.getElementById('vol-bgm');
    if (volBgm) {
      volBgm.value = this.settings.bgmVol * 100;
      volBgm.addEventListener('input', (e) => {
        this.settings.bgmVol = e.target.value / 100;
        Sound.bgmVolume = this.settings.bgmVol;
        StorageManager.saveSettings(this.settings);
      });
    }

    const volSfx = document.getElementById('vol-sfx');
    if (volSfx) {
      volSfx.value = this.settings.sfxVol * 100;
      volSfx.addEventListener('input', (e) => {
        this.settings.sfxVol = e.target.value / 100;
        Sound.sfxVolume = this.settings.sfxVol;
        StorageManager.saveSettings(this.settings);
      });
    }

    const toggleShake = document.getElementById('toggle-shake');
    if (toggleShake) {
      toggleShake.checked = this.settings.screenShake;
      toggleShake.addEventListener('change', (e) => {
        this.settings.screenShake = e.target.checked;
        StorageManager.saveSettings(this.settings);
      });
    }

    const toggleDmg = document.getElementById('toggle-dmgtext');
    if (toggleDmg) {
      toggleDmg.checked = this.settings.damageText;
      toggleDmg.addEventListener('change', (e) => {
        this.settings.damageText = e.target.checked;
        StorageManager.saveSettings(this.settings);
      });
    }
  }

  screenToWorld(screenX, screenY) {
    return {
      x: screenX + this.camera.x,
      y: screenY + this.camera.y
    };
  }

  getDiffConfig() {
    if (this.difficulty === 'nightmare') {
      return { hpMult: 1.6, dmgMult: 1.5, spdMult: 1.25, scoreMult: 2.0 };
    } else if (this.difficulty === 'normal') {
      return { hpMult: 0.8, dmgMult: 0.75, spdMult: 0.9, scoreMult: 0.8 };
    }
    return { hpMult: 1.0, dmgMult: 1.0, spdMult: 1.0, scoreMult: 1.0 };
  }

  showDangerBanner(title = '거대 키메라 출현!') {
    Sound.playBossWarning();
    const banner = document.getElementById('danger-banner');
    const titleEl = document.getElementById('danger-boss-title');
    if (banner && titleEl) {
      titleEl.textContent = `⚠️ ${title} ⚠️`;
      banner.classList.add('active');
      setTimeout(() => {
        banner.classList.remove('active');
      }, 2400);
    }
  }

  start() {
    Sound.init();
    Sound.startBGM();

    document.querySelectorAll('.overlay-screen').forEach(el => el.classList.remove('active'));

    const startX = this.worldWidth / 2;
    const startY = this.worldHeight / 2;
    this.player = new Player(startX, startY, this.selectedChar, this.sprites[this.selectedChar]);

    this.enemies = [];
    this.projectiles = [];
    this.grenades = [];
    this.boomerangs = [];
    this.meteors = [];
    this.expGems = [];
    this.fieldItems = [];
    this.particles = [];
    this.damageTexts = [];
    this.shockwaves = [];

    // Reset Sanctuaries
    this.sanctuaries.forEach(s => {
      s.bossSpawned = false;
      s.bossDefeated = false;
      s.chestOpened = false;
    });

    this.wave = 1;
    this.waveTimer = 0;
    this.gameTime = 0;
    this.score = 0;
    this.kills = 0;
    this.level = 1;
    this.currentExp = 0;
    this.maxExp = 100;
    this.comboCount = 0;
    this.comboTimer = 0;

    this.camera.x = startX - this.canvas.width / 2;
    this.camera.y = startY - this.canvas.height / 2;

    this.setupUIForChar();
    this.updateHUD();

    this.isRunning = true;
    this.isPaused = false;
    this.isLevelingUp = false;
    this.lastTime = performance.now();

    requestAnimationFrame((t) => this.loop(t));
  }

  restart() {
    this.start();
  }

  setupUIForChar() {
    const avatarImg = document.getElementById('avatar-img');
    const nameTag = document.getElementById('hud-name-tag');
    avatarImg.src = `assets/${this.selectedChar}.png`;
    nameTag.textContent = this.player.nameTag;

    const normalName = document.getElementById('skill-name-normal');
    const normalIcon = document.getElementById('skill-icon-normal');
    const qName = document.getElementById('skill-name-q');
    const qIcon = document.getElementById('skill-icon-q');
    const eName = document.getElementById('skill-name-e');
    const eIcon = document.getElementById('skill-icon-e');
    const rName = document.getElementById('skill-name-r');
    const rIcon = document.getElementById('skill-icon-r');

    if (this.selectedChar === 'usagi') {
      normalName.textContent = '쌍당근 산탄'; normalIcon.textContent = '🥕';
      qName.textContent = '당근 부메랑'; qIcon.textContent = '🪃';
      eName.textContent = '팽이 무적돌진'; eIcon.textContent = '🌪️';
      rName.textContent = '당근 메테오'; rIcon.textContent = '☄️';
    } else if (this.selectedChar === 'hachiware') {
      normalName.textContent = '3연속 검기'; normalIcon.textContent = '⚔️';
      qName.textContent = '카메라 섬광'; qIcon.textContent = '📸';
      eName.textContent = '통기타 힐링'; eIcon.textContent = '🎸';
      rName.textContent = '메가 슬래시'; rIcon.textContent = '⚡';
    } else {
      normalName.textContent = '유도 별빛샷'; normalIcon.textContent = '⭐';
      qName.textContent = '도토리 폭탄'; qIcon.textContent = '🌰';
      eName.textContent = '용기 방패각성'; eIcon.textContent = '💖';
      rName.textContent = '레인보우 빔'; rIcon.textContent = '🌈';
    }
  }

  getChapterInfo(wave) {
    if (wave <= 5) return { name: '🌸 제1장: 평화로운 숲속', bgKey: 'battle_bg' };
    if (wave <= 10) return { name: '🍜 제2장: 라멘 로 결전장', bgKey: 'ramen_bg' };
    if (wave <= 15) return { name: '🏰 제3장: 고대 지하 신전', bgKey: 'tower_bg' };
    return { name: '⚡ 최종장: 진(眞) 아노코 토벌전', bgKey: 'battle_bg' };
  }

  updateHUD() {
    if (!this.player) return;

    // HP Bar
    const hpRatio = Math.max(0, Math.min(1, this.player.hp / this.player.maxHp));
    document.getElementById('hud-hp-bar').style.width = `${hpRatio * 100}%`;
    document.getElementById('hud-hp-text').textContent = `${Math.ceil(this.player.hp)} / ${this.player.maxHp}`;

    // EXP Bar
    const expRatio = Math.max(0, Math.min(1, this.currentExp / this.maxExp));
    document.getElementById('hud-exp-bar').style.width = `${expRatio * 100}%`;
    document.getElementById('hud-exp-text').textContent = `${Math.round(expRatio * 100)}%`;
    document.getElementById('hud-level').textContent = `Lv.${this.level}`;

    // Wave & Timer & Chapter
    const chInfo = this.getChapterInfo(this.wave);
    document.getElementById('hud-chapter').textContent = chInfo.name;
    document.getElementById('hud-wave').textContent = `WAVE ${this.wave} / ${this.maxCampaignWave}`;
    document.getElementById('hud-timer').textContent = this.formatTime(this.gameTime);
    document.getElementById('hud-score').textContent = Math.round(this.score).toLocaleString();
    document.getElementById('hud-kills').textContent = this.kills;

    // Combo display
    const comboEl = document.getElementById('hud-combo');
    if (this.comboCount >= 3) {
      comboEl.style.display = 'block';
      document.getElementById('combo-num').textContent = this.comboCount;
    } else {
      comboEl.style.display = 'none';
    }

    // Buff Icons
    const buffContainer = document.getElementById('hud-buffs');
    buffContainer.innerHTML = '';
    if (this.player.hasShield) {
      buffContainer.innerHTML += `<div class="buff-pill">🛡️ 실드</div>`;
    }
    if (this.player.doubleDamageTimer > 0) {
      buffContainer.innerHTML += `<div class="buff-pill" style="border-color:#ef4444;color:#ef4444;">⚔️ 2배 극딜 (${Math.ceil(this.player.doubleDamageTimer)}s)</div>`;
    }
    if (this.player.charType === 'usagi' && this.player.madnessStacks > 0) {
      buffContainer.innerHTML += `<div class="buff-pill" style="border-color:#f59e0b;color:#f59e0b;">🔥 광기 ${this.player.madnessStacks}단</div>`;
    }

    // Cooldown overlays
    const setCD = (id, cur, max) => {
      const el = document.getElementById(id);
      if (el) el.style.height = max > 0 && cur > 0 ? `${(cur / max) * 100}%` : '0%';
    };

    setCD('cd-space', this.player.dashTimer, this.player.dashCooldown);
    setCD('cd-q', this.player.timerQ, this.player.cdQ);
    setCD('cd-e', this.player.timerE, this.player.cdE);
    setCD('cd-r', this.player.timerR, this.player.cdR);

    // Active boss health bar HUD
    this.updateBossHUD();
  }

  updateBossHUD() {
    const bossHud = document.getElementById('boss-hud');
    const bossNameEl = document.getElementById('boss-name-text');
    const bossHpValEl = document.getElementById('boss-hp-val');
    const bossFillEl = document.getElementById('boss-hp-fill');
    const bossGhostEl = document.getElementById('boss-hp-ghost');

    let activeBoss = this.enemies.find(e => e.type === 'boss' || e.type.includes('boss') || e.type.startsWith('sanctuary_boss'));

    if (activeBoss && activeBoss.hp > 0 && this.isRunning) {
      bossHud.style.display = 'block';
      bossNameEl.textContent = activeBoss.name;
      const ratio = Math.max(0, Math.min(1, activeBoss.hp / activeBoss.maxHp));
      const pct = Math.round(ratio * 100);
      bossHpValEl.textContent = `${pct}%`;
      bossFillEl.style.width = `${pct}%`;
      if (bossGhostEl) bossGhostEl.style.width = `${pct}%`;
    } else {
      bossHud.style.display = 'none';
    }
  }

  formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  togglePause() {
    if (!this.isRunning || this.isLevelingUp) return;
    this.isPaused = !this.isPaused;
    const pauseScreen = document.getElementById('pause-screen');
    if (this.isPaused) {
      pauseScreen.classList.add('active');
    } else {
      pauseScreen.classList.remove('active');
      this.lastTime = performance.now();
      requestAnimationFrame((t) => this.loop(t));
    }
  }

  spawnEnemy() {
    if (!this.player) return;

    const angle = Math.random() * Math.PI * 2;
    const dist = 750 + Math.random() * 380;
    const x = Math.max(80, Math.min(this.worldWidth - 80, this.player.x + Math.cos(angle) * dist));
    const y = Math.max(80, Math.min(this.worldHeight - 80, this.player.y + Math.sin(angle) * dist));

    const roll = Math.random();
    let type = 'bug';
    const diff = this.getDiffConfig();

    if (this.wave === 1) type = 'bug';
    else if (this.wave === 2) type = roll < 0.5 ? 'goblin' : 'bug';
    else if (this.wave === 3) type = roll < 0.4 ? 'lightning_beetle' : (roll < 0.7 ? 'goblin' : 'bug');
    else if (this.wave === 4) type = roll < 0.4 ? 'chimera' : (roll < 0.7 ? 'goblin' : 'bug');
    else if (this.wave === 5) type = roll < 0.5 ? 'goblin' : 'bug';
    else if (this.wave === 6) type = roll < 0.65 ? 'dark_swarm' : 'bug';
    else if (this.wave === 7) type = roll < 0.5 ? 'goblin' : (roll < 0.8 ? 'dark_swarm' : 'lightning_beetle');
    else if (this.wave === 8) type = roll < 0.45 ? 'iron_chimera' : (roll < 0.75 ? 'lightning_beetle' : 'dark_swarm');
    else if (this.wave === 9) type = roll < 0.35 ? 'iron_chimera' : (roll < 0.65 ? 'chimera' : 'dark_swarm');
    else if (this.wave === 10) type = roll < 0.4 ? 'dark_swarm' : (roll < 0.7 ? 'goblin' : 'lightning_beetle');
    else if (this.wave === 11) type = roll < 0.55 ? 'goblin' : 'dark_swarm';
    else if (this.wave === 12) type = roll < 0.6 ? 'lightning_beetle' : 'goblin';
    else if (this.wave === 13) type = roll < 0.5 ? 'iron_chimera' : 'chimera';
    else if (this.wave === 14) type = roll < 0.3 ? 'iron_chimera' : (roll < 0.6 ? 'lightning_beetle' : 'goblin');
    else if (this.wave === 15) type = roll < 0.4 ? 'iron_chimera' : 'dark_swarm';
    else if (this.wave === 16) type = roll < 0.45 ? 'iron_chimera' : 'lightning_beetle';
    else if (this.wave === 17) type = roll < 0.5 ? 'dark_swarm' : 'goblin';
    else if (this.wave === 18) type = roll < 0.35 ? 'iron_chimera' : (roll < 0.7 ? 'chimera' : 'dark_swarm');
    else if (this.wave === 19) type = roll < 0.3 ? 'iron_chimera' : (roll < 0.55 ? 'lightning_beetle' : (roll < 0.8 ? 'chimera' : 'goblin'));
    else type = roll < 0.25 ? 'iron_chimera' : (roll < 0.5 ? 'lightning_beetle' : (roll < 0.75 ? 'goblin' : 'dark_swarm'));

    this.enemies.push(new Enemy(x, y, type, this.wave, diff));
  }

  spawnMidBoss(wave) {
    const x = this.player ? this.player.x : this.worldWidth / 2;
    const y = Math.max(100, (this.player ? this.player.y : this.worldHeight / 2) - 650);
    this.enemies.push(new Enemy(x, y, 'midboss', wave, this.getDiffConfig()));
    this.showDangerBanner(`제${Math.ceil(wave / 5)}장 보스 등장!`);
  }

  spawnFinalBoss(wave) {
    const x = this.player ? this.player.x : this.worldWidth / 2;
    const y = Math.max(100, (this.player ? this.player.y : this.worldHeight / 2) - 650);
    this.enemies.push(new Enemy(x, y, 'boss', wave, this.getDiffConfig()));
    this.showDangerBanner('진(眞) 거대 아노코 출현!');
  }

  addExp(amount) {
    this.currentExp += amount;
    let scoreAdd = amount * 10 * this.getDiffConfig().scoreMult;
    if (this.comboCount >= 30) scoreAdd *= 1.5;
    else if (this.comboCount >= 10) scoreAdd *= 1.2;

    this.score += scoreAdd;
    if (this.currentExp >= this.maxExp && !this.isLevelingUp) {
      this.currentExp -= this.maxExp;
      this.level++;
      this.maxExp = Math.round(this.maxExp * 1.35);
      this.triggerLevelUp();
    }
    this.updateHUD();
  }

  triggerLevelUp() {
    this.isLevelingUp = true;
    Sound.playLevelUp();
    const lvlQuote = this.player.charType === 'usagi'
      ? (Math.random() < 0.5 ? "야하-!!" : "뿌루루루-!")
      : (this.player.charType === 'hachiware' 
          ? (Math.random() < 0.5 ? "와아-! 강해졌어!" : "난또까나레-! 기뻐서 눈물이 나!") 
          : (Math.random() < 0.5 ? "와... 와아...!" : "훗... 후웅!"));
    this.player.say(lvlQuote, true);

    const pool = [
      { id: 'dmg', name: '사스마타 연마', icon: '⚔️', effect: '공격력 +30%', tier: '공격', apply: () => (this.player.damageMultiplier += 0.3) },
      { id: 'rate', name: '우사기의 발놀림', icon: '⚡', effect: '기본 공격 속도 +25%', tier: '공격', apply: () => (this.player.attackCooldown *= 0.78) },
      { id: 'spread', name: '멀티 스타 샷', icon: '🌟', effect: '발사 탄환 수 +1 추가', tier: '공격', apply: () => (this.player.bulletCount += 1) },
      { id: 'speed', name: '포셰트 가방 장착', icon: '🎒', effect: '이동 속도 +18%', tier: '기동', apply: () => (this.player.speed *= 1.18) },
      { id: 'hp', name: '수제 푸딩 한입', icon: '🍮', effect: '최대 체력 +35 및 즉시 50 회복', tier: '생존', apply: () => { this.player.maxHp += 35; this.player.hp = Math.min(this.player.maxHp, this.player.hp + 50); } },
      { id: 'pierce', name: '관통 사스마타', icon: '🗡️', effect: '탄환 관통 횟수 +1 증가', tier: '특수', apply: () => (this.player.pierce += 1) },
      { id: 'skillQ', name: '특대 스킬 강화', icon: '🌰', effect: 'Q 스킬 쿨타임 -25% & 데미지 +60', tier: '스킬', apply: () => { this.player.cdQ *= 0.75; } },
      { id: 'leech', name: '하치와레의 긍정 기운', icon: '💖', effect: '적 처치 시 12% 확률로 체력 12 회복', tier: '생존', apply: () => (this.player.lifesteal += 0.12) },
      { id: 'shield', name: '철갑 거북 등껍질', icon: '🛡️', effect: '적의 공격을 1회 막아주는 보호막 획득', tier: '생존', apply: () => (this.player.hasShield = true) },
      { id: 'magnet', name: '대형 별사탕 자석', icon: '🧲', effect: '화면의 모든 경험치와 아이템 즉시 흡수', tier: '특수', apply: () => {
        this.expGems.forEach(g => { g.x = this.player.x; g.y = this.player.y; });
        this.fieldItems.forEach(i => { i.x = this.player.x; i.y = this.player.y; });
      }}
    ];

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    this.currentUpgradeCards = shuffled.slice(0, 3);

    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    this.currentUpgradeCards.forEach((card, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card-item';
      cardEl.innerHTML = `
        <div class="card-key-badge">[${idx + 1}]</div>
        <div class="card-icon">${card.icon}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-effect">${card.effect}</div>
        <div class="card-tier">${card.tier}</div>
      `;
      cardEl.addEventListener('click', () => this.selectLevelUpCard(idx));
      container.appendChild(cardEl);
    });

    document.getElementById('levelup-modal').classList.add('active');
  }

  selectLevelUpCard(idx) {
    if (!this.isLevelingUp || !this.currentUpgradeCards || !this.currentUpgradeCards[idx]) return;
    this.currentUpgradeCards[idx].apply();
    this.isLevelingUp = false;
    document.getElementById('levelup-modal').classList.remove('active');
    this.updateHUD();
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  gameOver() {
    this.isRunning = false;
    StorageManager.saveRecords(this.score, this.kills, this.wave, this.difficulty, false);
    this.updateRecordDisplay();

    document.getElementById('stat-time').textContent = this.formatTime(this.gameTime);
    document.getElementById('stat-wave').textContent = `${this.wave} / ${this.maxCampaignWave}`;
    document.getElementById('stat-kills').textContent = this.kills;
    document.getElementById('stat-score').textContent = Math.round(this.score).toLocaleString();
    document.getElementById('gameover-screen').classList.add('active');
  }

  victory() {
    this.isRunning = false;
    Sound.playRelicFanfare();
    StorageManager.saveRecords(this.score, this.kills, this.wave, this.difficulty, true);
    this.updateRecordDisplay();

    document.getElementById('vstat-time').textContent = this.formatTime(this.gameTime);
    document.getElementById('vstat-kills').textContent = this.kills;
    document.getElementById('vstat-score').textContent = Math.round(this.score).toLocaleString();
    document.getElementById('victory-screen').classList.add('active');
  }

  update(dt) {
    this.gameTime += dt;

    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) {
        this.comboCount = 0;
      }
    }

    // Camera follow player smoothly
    const targetCamX = this.player.x - this.canvas.width / 2;
    const targetCamY = this.player.y - this.canvas.height / 2;
    this.camera.x += (targetCamX - this.camera.x) * 0.12;
    this.camera.y += (targetCamY - this.camera.y) * 0.12;
    this.camera.x = Math.max(0, Math.min(this.worldWidth - this.canvas.width, this.camera.x));
    this.camera.y = Math.max(0, Math.min(this.worldHeight - this.canvas.height, this.camera.y));

    // Update Sakura Particles
    this.sakuraParticles.forEach(p => p.update(dt));

    // Wave Progression
    this.waveTimer += dt;
    if (this.waveTimer >= this.waveDuration && this.wave < this.maxCampaignWave) {
      this.waveTimer = 0;
      this.wave++;
      this.damageTexts.push(new DamageText(this.player.x, this.player.y - 45, `🌸 WAVE ${this.wave} 시작! 🌸`, '#f59e0b', true));

      if (this.wave === 5 || this.wave === 10 || this.wave === 15) {
        this.spawnMidBoss(this.wave);
      } else if (this.wave === this.maxCampaignWave) {
        this.spawnFinalBoss(this.wave);
      }
    }

    // Monster Spawning
    const maxMobs = 24 + this.wave * 3;
    if (this.enemies.length < maxMobs && Math.random() < 0.08 + this.wave * 0.005) {
      this.spawnEnemy();
    }

    // Sanctuary Zone Check (Boss summon & chest open)
    this.sanctuaries.forEach(s => {
      const dist = Math.hypot(this.player.x - s.x, this.player.y - s.y);

      // Trigger guardian mini-boss if player gets close to sanctuary
      if (dist < s.radius && !s.bossSpawned && !s.bossDefeated) {
        s.bossSpawned = true;
        this.enemies.push(new Enemy(s.x, s.y - 60, s.bossType, this.wave, this.getDiffConfig()));
        this.showDangerBanner(`${s.name} 수호 보스 출현!`);
      }

      // Check treasure chest interaction
      if (dist < s.chestRadius + this.player.radius && s.bossDefeated && !s.chestOpened) {
        s.chestOpened = true;
        this.player.relicsCount++;
        Sound.playRelicFanfare();
        this.damageTexts.push(new DamageText(this.player.x, this.player.y - 50, `🏆 ${s.relicName} 획득!`, '#facc15', true));

        // Apply Relic Buff
        if (s.relicType === 'relic_pudding') {
          this.player.maxHp += 50;
          this.player.hp = this.player.maxHp;
        } else if (s.relicType === 'relic_ramen') {
          this.player.damageMultiplier += 0.35;
          this.player.doubleDamageTimer = 15.0;
        } else if (s.relicType === 'relic_shield') {
          this.player.hasAutoShieldRegen = true;
          this.player.hasShield = true;
        } else if (s.relicType === 'relic_boots') {
          this.player.speed *= 1.25;
          this.player.dashCooldown *= 0.6;
        }
      }
    });

    // Player Shooting & Update
    const wm = this.screenToWorld(this.mouse.x, this.mouse.y);
    if (this.mouse.isDown) {
      this.player.shoot(wm.x, wm.y, this.projectiles, this.particles);
    }

    this.player.update(
      dt, this.keys, wm.x, wm.y, this.particles, this.grenades, this.boomerangs, this.meteors,
      this.worldWidth, this.worldHeight, this.enemies, this.damageTexts
    );

    // Update Boomerangs
    for (let i = this.boomerangs.length - 1; i >= 0; i--) {
      const b = this.boomerangs[i];
      b.update(dt, this.player);

      for (let j = this.enemies.length - 1; j >= 0; j--) {
        const e = this.enemies[j];
        if (b.hitEnemies.has(e)) continue;
        const dist = Math.hypot(b.x - e.x, b.y - e.y);
        if (dist < b.radius + e.radius) {
          b.hitEnemies.add(e);
          e.hp -= b.damage;
          e.hitTimer = 0.12;
          this.damageTexts.push(new DamageText(e.x, e.y, Math.round(b.damage), '#f97316', true));
        }
      }

      if (b.life <= 0) {
        this.boomerangs.splice(i, 1);
      }
    }

    // Update Meteors
    for (let i = this.meteors.length - 1; i >= 0; i--) {
      const m = this.meteors[i];
      m.update(dt);
      if (m.landed) {
        Sound.playExplosion();
        this.screenShake = 14;
        this.particles.push(new Particle(m.targetX, m.targetY, 0, 0, m.radius, '#ea580c', 0.5, 'ring'));

        this.enemies.forEach(e => {
          const d = Math.hypot(e.x - m.targetX, e.y - m.targetY);
          if (d < m.radius + e.radius) {
            e.hp -= m.damage;
            e.hitTimer = 0.15;
            this.damageTexts.push(new DamageText(e.x, e.y, Math.round(m.damage), '#ff4500', true));
          }
        });
        this.meteors.splice(i, 1);
      }
    }

    // Update Field Items
    for (let i = this.fieldItems.length - 1; i >= 0; i--) {
      const item = this.fieldItems[i];
      item.update(dt, this.player.x, this.player.y);

      const dist = Math.hypot(item.x - this.player.x, item.y - this.player.y);
      if (dist < item.radius + this.player.radius) {
        Sound.playPickup();
        if (item.itemType === 'pudding') {
          this.player.hp = Math.min(this.player.maxHp, this.player.hp + 40);
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 20, '+40 HP', '#10b981', true));
        } else if (item.itemType === 'onigiri') {
          this.player.doubleDamageTimer = 10.0;
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 20, '⚔️ 2배 공격력!', '#ef4444', true));
        } else if (item.itemType === 'shield') {
          this.player.hasShield = true;
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 20, '🛡️ 보호막 충전!', '#38bdf8', true));
        } else if (item.itemType === 'magnet') {
          this.expGems.forEach(g => { g.x = this.player.x; g.y = this.player.y; });
          this.fieldItems.forEach(it => { it.x = this.player.x; it.y = this.player.y; });
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 20, '🧲 별사탕 자석 흡수!', '#a855f7', true));
        }
        this.fieldItems.splice(i, 1);
      } else if (item.life <= 0) {
        this.fieldItems.splice(i, 1);
      }
    }

    // Update Shockwaves
    for (let i = this.shockwaves.length - 1; i >= 0; i--) {
      const sw = this.shockwaves[i];
      sw.update(dt, this.player, this.damageTexts);
      if (sw.life <= 0) {
        this.shockwaves.splice(i, 1);
      }
    }

    // Update Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt, this.player, this.enemies);

      if (p.distance >= p.maxDistance || p.x < -100 || p.x > this.worldWidth + 100 || p.y < -100 || p.y > this.worldHeight + 100 || p.life <= 0) {
        this.projectiles.splice(i, 1);
        continue;
      }

      if (p.fromPlayer) {
        for (let j = this.enemies.length - 1; j >= 0; j--) {
          const enemy = this.enemies[j];
          if (p.hitEnemies.has(enemy)) continue;

          const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
          if (dist < p.size + enemy.radius) {
            p.hitEnemies.add(enemy);
            enemy.hp -= p.damage;
            enemy.hitTimer = 0.12;

            const isCrit = p.damage > 45 || Math.random() < 0.2;
            if (isCrit) {
              Sound.playCritHit();
              this.screenShake = 3;
            } else {
              Sound.playHit();
            }

            if (this.settings.damageText) {
              this.damageTexts.push(new DamageText(enemy.x, enemy.y, Math.round(p.damage), isCrit ? '#f59e0b' : p.color, isCrit));
            }

            for (let k = 0; k < 3; k++) {
              this.particles.push(
                new Particle(p.x, p.y, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5, 5, p.color, 0.25, 'sparkle')
              );
            }

            p.pierce--;
            if (p.pierce <= 0) {
              this.projectiles.splice(i, 1);
              break;
            }
          }
        }
      } else {
        const dist = Math.hypot(p.x - this.player.x, p.y - this.player.y);
        if (dist < p.size + this.player.radius && this.player.invulnerableTimer <= 0) {
          if (this.player.hasShield) {
            this.player.hasShield = false;
            this.damageTexts.push(new DamageText(this.player.x, this.player.y, `🛡️ 보호막 방어!`, '#38bdf8', true));
            this.projectiles.splice(i, 1);
            continue;
          }

          this.player.hp -= p.damage;
          this.player.invulnerableTimer = 0.3;
          this.screenShake = 6;
          Sound.playHit();
          this.damageTexts.push(new DamageText(this.player.x, this.player.y, `-${p.damage}`, '#ef4444', true));
          const hitQuote = this.player.charType === 'usagi' ? "우뺘-!!" : (this.player.charType === 'hachiware' ? "으앗... 조심해!" : "후에에엥-!!");
          this.player.say(hitQuote, true);

          this.projectiles.splice(i, 1);
          if (this.player.hp <= 0) {
            this.gameOver();
            return;
          }
        }
      }
    }

    // Update Grenades
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const g = this.grenades[i];
      g.update(dt);
      if (g.exploded) {
        Sound.playExplosion();
        this.screenShake = 10;
        this.particles.push(new Particle(g.targetX, g.targetY, 0, 0, g.radius, '#ffd166', 0.45, 'ring'));
        for (let k = 0; k < 22; k++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 2 + Math.random() * 6;
          this.particles.push(
            new Particle(g.targetX, g.targetY, Math.cos(angle) * spd, Math.sin(angle) * spd, 8 + Math.random() * 6, '#ff79b0', 0.5, 'star')
          );
        }

        this.enemies.forEach((enemy) => {
          const dist = Math.hypot(enemy.x - g.targetX, enemy.y - g.targetY);
          if (dist < g.radius + enemy.radius) {
            enemy.hp -= g.damage;
            enemy.hitTimer = 0.15;
            this.damageTexts.push(new DamageText(enemy.x, enemy.y, Math.round(g.damage), '#ff9800', true));
          }
        });
        this.grenades.splice(i, 1);
      }
    }

    // Update Enemies & Check Death
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(dt, this.player, this.projectiles, this.shockwaves, this.particles);

      const dist = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
      if (dist < enemy.radius + this.player.radius && this.player.invulnerableTimer <= 0) {
        if (this.player.hasShield) {
          this.player.hasShield = false;
          this.damageTexts.push(new DamageText(this.player.x, this.player.y, `🛡️ 보호막 방어!`, '#38bdf8', true));
        } else {
          this.player.hp -= enemy.damage;
          this.player.invulnerableTimer = 0.35;
          this.screenShake = 6;
          Sound.playHit();
          this.damageTexts.push(new DamageText(this.player.x, this.player.y, `-${enemy.damage}`, '#ef4444', true));
          const contactQuote = this.player.charType === 'usagi' ? "하아?!" : (this.player.charType === 'hachiware' ? "으앗! 치이카와, 뒤로 물러서!" : "후에에에-!!");
          this.player.say(contactQuote, true);

          if (this.player.hp <= 0) {
            this.gameOver();
            return;
          }
        }
      }

      if (enemy.hp <= 0) {
        this.kills++;
        this.comboCount++;
        this.comboTimer = 2.5;

        // Check if killed a sanctuary guardian boss
        if (enemy.type.startsWith('sanctuary_boss')) {
          const s = this.sanctuaries.find(sc => sc.bossType === enemy.type);
          if (s) {
            s.bossDefeated = true;
            this.damageTexts.push(new DamageText(enemy.x, enemy.y - 40, `✨ ${s.name} 토벌 성공! 보물 상자 개방!`, '#facc15', true));
          }
        }

        if (this.player.charType === 'hachiware' && Math.random() < 0.15) {
          this.player.positiveTimer = 3.0;
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 30, '✨ 난또까나레 발동!', '#38bdf8', true));
        }

        this.expGems.push(new ExpGem(enemy.x, enemy.y, enemy.xp));

        const isBoss = enemy.type === 'boss' || enemy.type.includes('boss');
        if (isBoss) {
          this.fieldItems.push(new FieldItem(enemy.x, enemy.y, 'pudding'));
          this.fieldItems.push(new FieldItem(enemy.x + 30, enemy.y, 'onigiri'));
        } else if (enemy.type === 'iron_chimera') {
          if (Math.random() < 0.6) this.fieldItems.push(new FieldItem(enemy.x, enemy.y, Math.random() < 0.5 ? 'pudding' : 'shield'));
        } else if (Math.random() < 0.08) {
          const itemTypes = ['pudding', 'onigiri', 'shield', 'magnet'];
          const randType = itemTypes[Math.floor(Math.random() * itemTypes.length)];
          this.fieldItems.push(new FieldItem(enemy.x, enemy.y, randType));
        }

        if (this.player.lifesteal > 0 && Math.random() < this.player.lifesteal) {
          this.player.hp = Math.min(this.player.maxHp, this.player.hp + 12);
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 20, '+12 HP', '#10b981', true));
        }

        for (let k = 0; k < 6; k++) {
          this.particles.push(
            new Particle(enemy.x, enemy.y, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 6, enemy.color, 0.35, 'star')
          );
        }

        if (enemy.type === 'boss') {
          this.victory();
          return;
        }

        this.enemies.splice(i, 1);
      }
    }

    // Update XP Gems
    for (let i = this.expGems.length - 1; i >= 0; i--) {
      const gem = this.expGems[i];
      gem.update(dt, this.player.x, this.player.y);

      const dist = Math.hypot(gem.x - this.player.x, gem.y - this.player.y);
      if (dist < gem.radius + this.player.radius) {
        this.addExp(gem.value);
        Sound.playPickup();
        this.expGems.splice(i, 1);
      } else if (gem.life <= 0) {
        this.expGems.splice(i, 1);
      }
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      this.particles[i].update(dt);
      if (this.particles[i].life <= 0) this.particles.splice(i, 1);
    }

    for (let i = this.damageTexts.length - 1; i >= 0; i--) {
      this.damageTexts[i].update(dt);
      if (this.damageTexts[i].life <= 0) this.damageTexts.splice(i, 1);
    }

    if (this.screenShake > 0) {
      this.screenShake = Math.max(0, this.screenShake - dt * 20);
    }

    this.updateHUD();
  }

  draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.screenShake > 0 && this.settings.screenShake) {
      const sx = (Math.random() - 0.5) * this.screenShake * 2;
      const sy = (Math.random() - 0.5) * this.screenShake * 2;
      this.ctx.translate(sx, sy);
    }

    // Camera transform for World Rendering
    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);

    this.drawBackground();

    // Draw Sanctuaries & Chests
    this.sanctuaries.forEach(s => s.draw(this.ctx, this.camera));

    // World Map Decorations
    this.ctx.font = '22px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.decorations.forEach(dec => {
      if (
        dec.x > this.camera.x - 50 &&
        dec.x < this.camera.x + this.canvas.width + 50 &&
        dec.y > this.camera.y - 50 &&
        dec.y < this.camera.y + this.canvas.height + 50
      ) {
        this.ctx.fillText(dec.emoji, dec.x, dec.y);
      }
    });

    this.expGems.forEach((gem) => gem.draw(this.ctx));
    this.fieldItems.forEach((item) => item.draw(this.ctx));
    this.shockwaves.forEach((sw) => sw.draw(this.ctx));
    this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    this.grenades.forEach((g) => g.draw(this.ctx));
    this.boomerangs.forEach((b) => b.draw(this.ctx));
    this.meteors.forEach((m) => m.draw(this.ctx));
    this.projectiles.forEach((p) => p.draw(this.ctx));

    if (this.player.isFiringLaser) {
      this.drawMegaLaser();
    }

    if (this.player) {
      this.player.draw(this.ctx);
    }

    this.particles.forEach((pt) => pt.draw(this.ctx));
    this.damageTexts.forEach((dt) => dt.draw(this.ctx));

    // Sakura atmosphere petals
    if (this.settings.highParticles) {
      this.sakuraParticles.forEach(sp => {
        if (
          sp.x > this.camera.x - 50 && sp.x < this.camera.x + this.canvas.width + 50 &&
          sp.y > this.camera.y - 50 && sp.y < this.camera.y + this.canvas.height + 50
        ) {
          sp.draw(this.ctx);
        }
      });
    }

    // World Boundary Barrier Glow
    this.drawWorldBoundaries();

    this.ctx.restore(); // Restore world camera

    // Screen Space Rendering (Radar, UI)
    this.drawRadarPointers();
    this.drawMinimap();

    this.ctx.restore();
  }

  drawWorldBoundaries() {
    this.ctx.save();
    this.ctx.strokeStyle = '#ff4081';
    this.ctx.lineWidth = 6;
    this.ctx.shadowColor = '#ff4081';
    this.ctx.shadowBlur = 18;
    this.ctx.strokeRect(20, 20, this.worldWidth - 40, this.worldHeight - 40);

    this.ctx.fillStyle = '#ffccd5';
    this.ctx.font = 'bold 16px "Jua", sans-serif';
    this.ctx.fillText('🌸 [마을 결계 끝자락]', 120, 50);
    this.ctx.fillText('🌸 [마을 결계 끝자락]', this.worldWidth - 160, 50);
    this.ctx.fillText('🌸 [마을 결계 끝자락]', 120, this.worldHeight - 40);
    this.ctx.fillText('🌸 [마을 결계 끝자락]', this.worldWidth - 160, this.worldHeight - 40);
    this.ctx.restore();
  }

  drawRadarPointers() {
    if (!this.player) return;
    this.enemies.forEach(e => {
      if (e.type === 'boss' || e.type.includes('boss') || e.type === 'iron_chimera') {
        const sx = e.x - this.camera.x;
        const sy = e.y - this.camera.y;
        const isOffscreen = sx < 30 || sx > this.canvas.width - 30 || sy < 30 || sy > this.canvas.height - 30;
        if (isOffscreen) {
          const angle = Math.atan2(e.y - this.player.y, e.x - this.player.x);
          const rx = Math.max(50, Math.min(this.canvas.width - 50, this.canvas.width / 2 + Math.cos(angle) * (this.canvas.width * 0.42)));
          const ry = Math.max(50, Math.min(this.canvas.height - 50, this.canvas.height / 2 + Math.sin(angle) * (this.canvas.height * 0.42)));

          this.ctx.save();
          this.ctx.translate(rx, ry);
          this.ctx.rotate(angle);
          this.ctx.fillStyle = e.type === 'boss' ? '#e11d48' : '#f97316';
          this.ctx.shadowColor = this.ctx.fillStyle;
          this.ctx.shadowBlur = 12;
          this.ctx.beginPath();
          this.ctx.moveTo(16, 0);
          this.ctx.lineTo(-10, -10);
          this.ctx.lineTo(-4, 0);
          this.ctx.lineTo(-10, 10);
          this.ctx.closePath();
          this.ctx.fill();
          this.ctx.restore();
        }
      }
    });
  }

  drawMinimap() {
    if (!this.minimapCtx || !this.player) return;
    const mCtx = this.minimapCtx;
    const mW = this.minimapCanvas.width;
    const mH = this.minimapCanvas.height;

    mCtx.clearRect(0, 0, mW, mH);

    // Background
    mCtx.fillStyle = '#181528';
    mCtx.fillRect(0, 0, mW, mH);

    const scaleX = mW / this.worldWidth;
    const scaleY = mH / this.worldHeight;

    // Viewport camera rect
    mCtx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    mCtx.lineWidth = 1;
    mCtx.strokeRect(this.camera.x * scaleX, this.camera.y * scaleY, this.canvas.width * scaleX, this.canvas.height * scaleY);

    // World border
    mCtx.strokeStyle = '#ffccd5';
    mCtx.lineWidth = 2;
    mCtx.strokeRect(1, 1, mW - 2, mH - 2);

    // Draw Sanctuaries on minimap
    this.sanctuaries.forEach(s => {
      mCtx.save();
      const sx = s.x * scaleX;
      const sy = s.y * scaleY;
      mCtx.strokeStyle = s.chestOpened ? '#22c55e' : s.color;
      mCtx.lineWidth = 1.5;
      mCtx.beginPath();
      mCtx.arc(sx, sy, 7, 0, Math.PI * 2);
      mCtx.stroke();

      mCtx.font = '8px sans-serif';
      mCtx.textAlign = 'center';
      mCtx.textBaseline = 'middle';
      mCtx.fillText(s.chestOpened ? '✅' : s.icon, sx, sy);
      mCtx.restore();
    });

    // Draw Items on minimap
    mCtx.fillStyle = '#f59e0b';
    this.fieldItems.forEach(item => {
      mCtx.beginPath();
      mCtx.arc(item.x * scaleX, item.y * scaleY, 2, 0, Math.PI * 2);
      mCtx.fill();
    });

    // Draw Enemies on minimap
    this.enemies.forEach(e => {
      if (e.type === 'boss') {
        mCtx.fillStyle = '#e11d48';
        mCtx.beginPath();
        mCtx.arc(e.x * scaleX, e.y * scaleY, 5, 0, Math.PI * 2);
        mCtx.fill();
      } else if (e.type.includes('boss') || e.type === 'iron_chimera') {
        mCtx.fillStyle = '#f97316';
        mCtx.beginPath();
        mCtx.arc(e.x * scaleX, e.y * scaleY, 3.5, 0, Math.PI * 2);
        mCtx.fill();
      } else {
        mCtx.fillStyle = '#a855f7';
        mCtx.beginPath();
        mCtx.arc(e.x * scaleX, e.y * scaleY, 1.5, 0, Math.PI * 2);
        mCtx.fill();
      }
    });

    // Draw Player dot
    const px = this.player.x * scaleX;
    const py = this.player.y * scaleY;
    mCtx.fillStyle = this.selectedChar === 'usagi' ? '#eab308' : (this.selectedChar === 'hachiware' ? '#38bdf8' : '#ff4081');
    mCtx.shadowColor = '#ffffff';
    mCtx.shadowBlur = 4;
    mCtx.beginPath();
    mCtx.arc(px, py, 3.5, 0, Math.PI * 2);
    mCtx.fill();
  }

  drawBackground() {
    const chInfo = this.getChapterInfo(this.wave);
    const bgSprite = this.sprites[chInfo.bgKey];

    if (bgSprite && bgSprite.complete && bgSprite.naturalWidth > 0) {
      this.ctx.save();
      this.ctx.globalAlpha = 0.28;
      const tileW = 1000;
      const tileH = 1000;
      for (let x = 0; x < this.worldWidth; x += tileW) {
        for (let y = 0; y < this.worldHeight; y += tileH) {
          if (
            x + tileW > this.camera.x &&
            x < this.camera.x + this.canvas.width &&
            y + tileH > this.camera.y &&
            y < this.camera.y + this.canvas.height
          ) {
            this.ctx.drawImage(bgSprite, x, y, tileW, tileH);
          }
        }
      }
      this.ctx.restore();
    }

    const tileSize = 80;
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255, 209, 220, 0.08)';
    this.ctx.lineWidth = 1;

    const startX = Math.floor(this.camera.x / tileSize) * tileSize;
    const endX = this.camera.x + this.canvas.width;
    const startY = Math.floor(this.camera.y / tileSize) * tileSize;
    const endY = this.camera.y + this.canvas.height;

    for (let x = startX; x < endX; x += tileSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, this.camera.y);
      this.ctx.lineTo(x, this.camera.y + this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = startY; y < endY; y += tileSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.camera.x, y);
      this.ctx.lineTo(this.camera.x + this.canvas.width, y);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  drawMegaLaser() {
    try {
      if (!this.player) return;
      const lx = this.player.x || 0;
      const ly = this.player.y || 0;
      const angle = this.player.aimAngle || 0;
      const len = 1600;

      this.ctx.save();
      this.ctx.translate(lx, ly);
      this.ctx.rotate(angle);

      const grad = this.ctx.createLinearGradient(0, -25, 0, 25);
      grad.addColorStop(0, 'rgba(255, 64, 129, 0.85)');
      grad.addColorStop(0.25, 'rgba(255, 209, 102, 0.9)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
      grad.addColorStop(0.75, 'rgba(6, 214, 160, 0.9)');
      grad.addColorStop(1, 'rgba(17, 138, 178, 0.85)');

      this.ctx.fillStyle = grad;
      this.ctx.shadowColor = '#ffffff';
      this.ctx.shadowBlur = 20;
      this.ctx.fillRect(0, -22, len, 44);

      this.ctx.fillStyle = '#ffffff';
      this.ctx.fillRect(0, -7, len, 14);

      this.ctx.restore();
    } catch (e) {}
  }

  loop(timestamp) {
    if (!this.isRunning || this.isPaused || this.isLevelingUp) return;

    try {
      const dt = Math.min(0.05, Math.max(0.001, (timestamp - this.lastTime) / 1000 || 0.016));
      this.lastTime = timestamp;

      this.update(dt);
      this.draw();
    } catch (err) {
      console.error("Game loop non-fatal error caught:", err);
    }

    if (this.isRunning && !this.isPaused && !this.isLevelingUp) {
      requestAnimationFrame((t) => this.loop(t));
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.GameInstance = new Game();
});
