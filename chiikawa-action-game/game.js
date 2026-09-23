/* ==========================================================================
   🌸 치이카와 스트라이커: 토벌 대작전 (Chiikawa Striker)
   10-Wave Campaign & Endless Nightmare Edition
   ========================================================================== */

// --- Audio Manager (Web Audio API Synthesizer) ---
class SoundController {
  constructor() {
    this.ctx = null;
    this.sfxEnabled = true;
    this.bgmEnabled = true;
    this.bgmPlaying = false;
    this.bgmTimer = null;
    this.step = 0;
    this.currentTrackIdx = 0;

    // Iconic Official Chiikawa BGM Tracks
    this.tracks = [
      {
        id: 'pajamas',
        name: '👚 파자마 파티즈의 노래 (Pajamas Party)',
        tempo: 152,
        // 파~ 파~ 파자마~ 파자마 파티즈~ 우와우와 멜로디
        melody: [
          392.00, 392.00, 329.63, 349.23, 392.00, 440.00, 392.00, 329.63, // 파 파 파자마~
          523.25, 493.88, 440.00, 392.00, 329.63, 293.66, 261.63, 293.66, // 파자마 파티즈~
          392.00, 329.63, 392.00, 329.63, 440.00, 392.00, 349.23, 329.63, // 우~ 와~ 우~ 와~
          523.25, 523.25, 587.33, 659.25, 587.33, 523.25, 440.00, 523.25, // 앗 파자마 마자마~
          659.25, 659.25, 587.33, 523.25, 440.00, 392.00, 440.00, 523.25, // 댄스 타임!
          523.25, 493.88, 440.00, 392.00, 329.63, 293.66, 261.63, 329.63
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
        tempo: 124,
        // 나마가와~ 나마가와~ 히토리곳츠~ 통기타 멜로디
        melody: [
          329.63, 369.99, 415.30, 440.00, 493.88, 440.00, 415.30, 369.99, // なまかわ~ なまがわ~
          329.63, 415.30, 493.88, 554.37, 493.88, 440.00, 415.30, 369.99, // ひとりごつ~
          554.37, 493.88, 440.00, 415.30, 369.99, 329.63, 369.99, 415.30, // 외톨이들의 노래~
          440.00, 493.88, 554.37, 659.25, 554.37, 493.88, 440.00, 329.63, // 랄랄라~
          329.63, 369.99, 415.30, 440.00, 493.88, 554.37, 493.88, 440.00, // 기타 반주
          415.30, 369.99, 329.63, 277.18, 329.63, 369.99, 415.30, 329.63
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

  playShoot(charType = 'chiikawa', isAwakened = false) {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isAwakened ? 'sawtooth' : 'sine';
    const startFreq = charType === 'usagi' ? 880 : (charType === 'hachiware' ? 740 : 660);
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(180, now + 0.09);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playHit() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.06);

    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
  }

  playDash() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.16);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  playExplosion() {
    if (!this.sfxEnabled || !this.ctx) return;
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
    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  playLaser() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(523.25, now);
    osc.frequency.linearRampToValueAtTime(1046.5, now + 0.22);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  playPickup() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(659.25, now);
    osc.frequency.setValueAtTime(880, now + 0.05);
    osc.frequency.setValueAtTime(1174.66, now + 0.1);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playLevelUp() {
    if (!this.sfxEnabled || !this.ctx) return;
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.07;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    });
  }

  playAwaken() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.35);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.38);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.38);
  }

  playChatPop() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.05);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIdx];
  }

  switchNextTrack() {
    this.currentTrackIdx = (this.currentTrackIdx + 1) % this.tracks.length;
    this.step = 0;
    if (this.bgmPlaying) {
      if (this.bgmTimer) clearTimeout(this.bgmTimer);
      this.scheduleBGM();
    }
    return this.getCurrentTrack();
  }

  startBGM() {
    if (!this.bgmEnabled || !this.ctx || this.bgmPlaying) return;
    this.bgmPlaying = true;
    this.step = 0;
    this.scheduleBGM();
  }

  stopBGM() {
    this.bgmPlaying = false;
    if (this.bgmTimer) {
      clearTimeout(this.bgmTimer);
      this.bgmTimer = null;
    }
  }

  scheduleBGM() {
    if (!this.bgmPlaying || !this.bgmEnabled) return;
    const track = this.getCurrentTrack();
    const now = this.ctx.currentTime;

    const freqBass = track.bass[this.step % track.bass.length];
    const freqMelody = track.melody[(this.step * 2) % track.melody.length];

    // Bassline
    const oscB = this.ctx.createOscillator();
    const gainB = this.ctx.createGain();
    oscB.type = track.bassWave || 'triangle';
    oscB.frequency.setValueAtTime(freqBass / 2, now);
    gainB.gain.setValueAtTime(0.07, now);
    gainB.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
    oscB.connect(gainB);
    gainB.connect(this.ctx.destination);
    oscB.start(now);
    oscB.stop(now + 0.16);

    // Lead Melody
    if (this.step % 2 === 0) {
      const oscM = this.ctx.createOscillator();
      const gainM = this.ctx.createGain();
      oscM.type = track.leadWave || 'sine';
      oscM.frequency.setValueAtTime(freqMelody, now);
      gainM.gain.setValueAtTime(0.06, now);
      gainM.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      oscM.connect(gainM);
      gainM.connect(this.ctx.destination);
      oscM.start(now);
      oscM.stop(now + 0.18);
    }

    this.step++;
    const interval = (60 / track.tempo) * 1000 * 0.5;
    this.bgmTimer = setTimeout(() => this.scheduleBGM(), interval);
  }
}

const Sound = new SoundController();

// --- Particle Systems ---
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
      this.radius += dt * 170;
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
    this.vy = -1.5;
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
    ctx.font = this.isCrit ? '900 22px "Jua", "Noto Sans KR"' : 'bold 16px "Jua", "Noto Sans KR"';
    ctx.shadowColor = 'rgba(255,255,255,0.9)';
    ctx.shadowBlur = 6;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

// --- Projectiles ---
class Projectile {
  constructor(x, y, vx, vy, damage, pierce = 1, fromPlayer = true, color = '#ff79b0', size = 7, charType = 'chiikawa') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.pierce = pierce;
    this.fromPlayer = fromPlayer;
    this.color = color;
    this.size = size;
    this.charType = charType;
    this.distance = 0;
    this.maxDistance = 1100;
    this.hitEnemies = new Set();
    this.rot = Math.random() * Math.PI * 2;
  }

  update(dt) {
    const dx = this.vx * dt * 60;
    const dy = this.vy * dt * 60;
    this.x += dx;
    this.y += dy;
    this.distance += Math.hypot(dx, dy);
    this.rot += 8 * dt;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rot);

    if (this.fromPlayer) {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size, -Math.sin((18 + i * 72) * Math.PI / 180) * this.size);
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size * 0.45), -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size * 0.45));
      }
      ctx.closePath();
      ctx.fill();
    } else {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.restore();
  }
}

// Acorn Bomb (Skill Q)
class AcornBomb {
  constructor(startX, startY, targetX, targetY, damage, radius) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;
    this.targetX = targetX;
    this.targetY = targetY;
    this.damage = damage;
    this.radius = radius;
    this.progress = 0;
    this.speed = 1.8;
    this.peakHeight = 90;
    this.exploded = false;
  }

  update(dt) {
    this.progress += this.speed * dt;
    if (this.progress >= 1) {
      this.progress = 1;
      this.exploded = true;
    }
    const currentGroundX = this.startX + (this.targetX - this.startX) * this.progress;
    const currentGroundY = this.startY + (this.targetY - this.startY) * this.progress;
    const arc = 4 * this.progress * (1 - this.progress) * this.peakHeight;
    this.x = currentGroundX;
    this.y = currentGroundY - arc;
  }

  draw(ctx) {
    ctx.save();
    const shadowX = this.startX + (this.targetX - this.startX) * this.progress;
    const shadowY = this.startY + (this.targetY - this.startY) * this.progress;
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(shadowX, shadowY, 10, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.translate(this.x, this.y);
    ctx.rotate(this.progress * 12);

    ctx.fillStyle = '#8d5b4c';
    ctx.beginPath();
    ctx.arc(0, -5, 12, Math.PI, 0);
    ctx.fill();

    ctx.fillStyle = '#d49b6a';
    ctx.beginPath();
    ctx.ellipse(0, 4, 11, 14, 0, 0, Math.PI);
    ctx.fill();

    ctx.fillStyle = '#ffea00';
    ctx.beginPath();
    ctx.arc(0, -10, 3, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// Konpeito / Acorn XP Gem
class ExpGem {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.radius = 8;
    this.life = 60;
    this.floatTimer = Math.random() * 10;
  }

  update(dt, playerX, playerY) {
    this.life -= dt;
    this.floatTimer += dt * 4;

    const dist = Math.hypot(playerX - this.x, playerY - this.y);
    if (dist < 180) {
      const speed = 420 * dt;
      this.x += ((playerX - this.x) / dist) * speed;
      this.y += ((playerY - this.y) / dist) * speed;
    }
  }

  draw(ctx) {
    ctx.save();
    const bob = Math.sin(this.floatTimer) * 3;
    ctx.translate(this.x, this.y + bob);

    ctx.fillStyle = '#ffd166';
    ctx.shadowColor = '#ffb703';
    ctx.shadowBlur = 10;

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

// --- Enemy Classes (10 Waves & Bosses) ---
class Enemy {
  constructor(x, y, type = 'bug', wave = 1) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.hitTimer = 0;
    this.wave = wave;

    if (type === 'bug') {
      this.radius = 18;
      this.hp = 28 + wave * 7;
      this.maxHp = this.hp;
      this.speed = 2.4 + Math.random() * 0.5;
      this.damage = 10;
      this.color = '#a855f7';
      this.xp = 15;
      this.name = '날벌레 몬스터';
    } else if (type === 'goblin') {
      this.radius = 24;
      this.hp = 70 + wave * 16;
      this.maxHp = this.hp;
      this.speed = 1.8;
      this.damage = 15;
      this.shootCooldown = 2.3;
      this.timer = Math.random() * 2;
      this.color = '#10b981';
      this.xp = 35;
      this.name = '숲속 고블린';
    } else if (type === 'chimera') {
      this.radius = 32;
      this.hp = 220 + wave * 50;
      this.maxHp = this.hp;
      this.speed = 1.25;
      this.damage = 26;
      this.color = '#f97316';
      this.xp = 75;
      this.name = '장갑 키메라';
    } else if (type === 'dark_swarm') {
      this.radius = 16;
      this.hp = 35 + wave * 8;
      this.maxHp = this.hp;
      this.speed = 3.2;
      this.damage = 12;
      this.color = '#475569';
      this.xp = 20;
      this.name = '어둠의 검은 벌레';
    } else if (type === 'lightning_beetle') {
      this.radius = 20;
      this.hp = 90 + wave * 22;
      this.maxHp = this.hp;
      this.speed = 3.5;
      this.damage = 20;
      this.color = '#eab308';
      this.xp = 50;
      this.name = '번개 풍뎅이';
    } else if (type === 'iron_chimera') {
      this.radius = 38;
      this.hp = 450 + wave * 80;
      this.maxHp = this.hp;
      this.speed = 1.1;
      this.damage = 32;
      this.color = '#6366f1';
      this.xp = 120;
      this.name = '강철 중장갑 키메라';
    } else if (type === 'midboss') {
      // Wave 5 Mid Boss
      this.radius = 48;
      this.hp = 1800 + wave * 300;
      this.maxHp = this.hp;
      this.speed = 1.4;
      this.damage = 30;
      this.color = '#ea580c';
      this.xp = 350;
      this.name = '폭주하는 가시 키메라 (중간 보스)';
      this.shootCooldown = 2.0;
      this.timer = 0;
      this.specialTimer = 0;
    } else if (type === 'boss') {
      // Wave 10 Final Boss (거대 아노코)
      this.radius = 60;
      this.hp = 3800 + wave * 600;
      this.maxHp = this.hp;
      this.speed = 1.35;
      this.damage = 42;
      this.color = '#e11d48';
      this.xp = 800;
      this.name = '진(眞) 거대 아노코 (그 녀석)';
      this.shootCooldown = 1.7;
      this.timer = 0;
      this.specialTimer = 0;
    }
  }

  update(dt, player, projectiles) {
    if (this.hitTimer > 0) this.hitTimer -= dt;

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;

    // Movement & Attack AI
    if (this.type === 'goblin' && dist < 340) {
      this.timer += dt;
      if (this.timer >= this.shootCooldown) {
        this.timer = 0;
        const angle = Math.atan2(dy, dx);
        const pSpeed = 5.5;
        projectiles.push(
          new Projectile(this.x, this.y, Math.cos(angle) * pSpeed, Math.sin(angle) * pSpeed, 12, 1, false, '#10b981', 6)
        );
      }
    } else if (this.type === 'midboss') {
      this.x += (dx / dist) * this.speed * dt * 60;
      this.y += (dy / dist) * this.speed * dt * 60;

      this.timer += dt;
      this.specialTimer += dt;

      // Midboss 6-way spikes
      if (this.timer >= this.shootCooldown) {
        this.timer = 0;
        const count = 6;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(angle) * 4.5, Math.sin(angle) * 4.5, 14, 1, false, '#ea580c', 7)
          );
        }
      }
    } else if (this.type === 'boss') {
      this.x += (dx / dist) * this.speed * dt * 60;
      this.y += (dy / dist) * this.speed * dt * 60;

      this.timer += dt;
      this.specialTimer += dt;

      // Final Boss Pattern 1: 12-way rotating star burst
      if (this.timer >= this.shootCooldown) {
        this.timer = 0;
        const count = 12;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i + Math.sin(Date.now() / 250);
          const pSpeed = 4.6;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(angle) * pSpeed, Math.sin(angle) * pSpeed, 15, 1, false, '#f43f5e', 8)
          );
        }
      }

      // Final Boss Pattern 2: 5-way focused shotgun blast
      if (this.specialTimer >= 3.8) {
        this.specialTimer = 0;
        for (let offset of [-0.35, -0.18, 0, 0.18, 0.35]) {
          const baseAngle = Math.atan2(dy, dx) + offset;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(baseAngle) * 8.0, Math.sin(baseAngle) * 8.0, 22, 1, false, '#fbbf24', 10)
          );
        }
      }
    } else {
      this.x += (dx / dist) * this.speed * dt * 60;
      this.y += (dy / dist) * this.speed * dt * 60;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    const isHit = this.hitTimer > 0;
    ctx.fillStyle = isHit ? '#ffffff' : this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;

    if (this.type === 'bug' || this.type === 'dark_swarm') {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      const wingFlap = Math.sin(Date.now() / 35) * 12;
      ctx.beginPath();
      ctx.ellipse(-12, -10 + wingFlap, 12, 6, -0.4, 0, Math.PI * 2);
      ctx.ellipse(12, -10 + wingFlap, 12, 6, 0.4, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'goblin') {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#065f46';
      ctx.beginPath();
      ctx.moveTo(-10, -18); ctx.lineTo(-15, -30); ctx.lineTo(-5, -20);
      ctx.moveTo(10, -18); ctx.lineTo(15, -30); ctx.lineTo(5, -20);
      ctx.fill();
    } else if (this.type === 'chimera' || this.type === 'iron_chimera') {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        const hx = Math.cos(a) * this.radius;
        const hy = Math.sin(a) * this.radius;
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(-10, -6, 5, 0, Math.PI * 2);
      ctx.arc(10, -6, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'lightning_beetle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      // Lightning horns
      ctx.strokeStyle = '#fef08a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-8, -14); ctx.lineTo(-14, -28); ctx.lineTo(-8, -26); ctx.lineTo(-12, -36);
      ctx.moveTo(8, -14); ctx.lineTo(14, -28); ctx.lineTo(8, -26); ctx.lineTo(12, -36);
      ctx.stroke();
    } else if (this.type === 'midboss') {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#7c2d12';
      ctx.beginPath();
      ctx.moveTo(-24, -24); ctx.lineTo(-40, -56); ctx.lineTo(-12, -35);
      ctx.moveTo(24, -24); ctx.lineTo(40, -56); ctx.lineTo(12, -35);
      ctx.fill();
    } else if (this.type === 'boss') {
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#9f1239';
      ctx.beginPath();
      ctx.moveTo(-35, -35); ctx.lineTo(-52, -84); ctx.lineTo(-18, -48);
      ctx.moveTo(35, -35); ctx.lineTo(52, -84); ctx.lineTo(18, -48);
      ctx.fill();

      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(-20, -10, 10, 0, Math.PI * 2);
      ctx.arc(20, -10, 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(-20, -10, 5, 0, Math.PI * 2);
      ctx.arc(20, -10, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.hp < this.maxHp || this.type === 'boss' || this.type === 'midboss') {
      const barW = this.radius * 2 + 12;
      const barH = 6;
      const hpRatio = Math.max(0, this.hp / this.maxHp);
      ctx.fillStyle = 'rgba(0,0,0,0.6)';
      ctx.fillRect(-barW / 2, -this.radius - 16, barW, barH);
      ctx.fillStyle = (this.type === 'boss' || this.type === 'midboss') ? '#e11d48' : '#22c55e';
      ctx.fillRect(-barW / 2, -this.radius - 16, barW * hpRatio, barH);
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
      this.speed = 5.6;
      this.baseDamage = 34;
      this.attackCooldown = 0.17;
      this.bulletColor = '#ffea00';
      this.nameTag = '🐰 우사기';
    } else if (charType === 'hachiware') {
      this.maxHp = 100;
      this.hp = 100;
      this.speed = 5.2;
      this.baseDamage = 26;
      this.attackCooldown = 0.13;
      this.bulletColor = '#38bdf8';
      this.nameTag = '🐱 하치와레';
    } else {
      this.maxHp = 110;
      this.hp = 110;
      this.speed = 5.2;
      this.baseDamage = 28;
      this.attackCooldown = 0.16;
      this.bulletColor = '#ff79b0';
      this.nameTag = '🌸 용감한 치이카와';
    }

    this.damageMultiplier = 1.0;
    this.fireTimer = 0;
    this.bulletCount = 1;
    this.pierce = 1;
    this.lifesteal = 0;

    this.vx = 0;
    this.vy = 0;
    this.facingLeft = false;
    this.aimAngle = 0;
    this.bobTimer = 0;
    this.walkTimer = 0;
    this.isMoving = false;
    this.stepDustTimer = 0;

    this.dashCooldown = 2.2;
    this.dashTimer = 0;
    this.isDashing = false;
    this.dashDuration = 0.28;
    this.dashDurationTimer = 0;
    this.dashVx = 0;
    this.dashVy = 0;
    this.afterimages = [];

    this.cdQ = 5.5;
    this.timerQ = 0;
    this.grenadeRadius = 160;
    this.grenadeDamage = 180;

    this.cdE = 13.0;
    this.timerE = 0;
    this.isAwakened = false;
    this.awakenDuration = 6.0;
    this.awakenTimer = 0;

    this.cdR = 20.0;
    this.timerR = 0;
    this.isFiringLaser = false;
    this.laserDuration = 2.0;
    this.laserTimer = 0;

    this.invulnerableTimer = 0;

    this.dialogues = this.getCharDialogues(charType);
    this.currentDialogue = this.dialogues[0];
    this.dialogueTimer = 1.0;
    this.dialogueLife = 2.5;
    this.dialoguePopAnim = 1.0;
  }

  getCharDialogues(charType) {
    if (charType === 'usagi') {
      return [
        "우라라라라-!!", "야하-!!", "뿌루루루루-!", "하아?!", "이하-!!",
        "바하-!!", "우라라라-!!", "야-하!", "푸루루루루-!", "우라!",
        "후-웅!", "우뺘-!!", "뿌루루루!!", "이햐-!!"
      ];
    } else if (charType === 'hachiware') {
      return [
        "난또까나레-!!",
        "어떻게든 될 거야!",
        "어떻게든... 됐네!",
        "치이카와, 괜찮아?",
        "사진 찍어둘까?",
        "사스마타, 꽉 쥐어야 해!",
        "에이, 에이, 오-!",
        "이것도 추억이 될 거야!",
        "조심해, 몬스터가 와!",
        "스승님처럼 멋지게 베자!",
        "와아-! 엄청 크다!",
        "기뻐서 눈물이 나..."
      ];
    } else {
      // Chiikawa (Only speaks Chiikawa vocalizations / no human sentences!)
      return [
        "와... 와아...!",
        "후에에...!",
        "이... 야앗-!!",
        "차앗-!!",
        "햐아앗!",
        "우... 우으...",
        "훗... 후웅!",
        "와앗!",
        "후에에엥-!!",
        "후아아...!",
        "이... 얍-!!",
        "으... 응!"
      ];
    }
  }

  say(text, priority = false) {
    if (!priority && this.dialogueLife > 0.5) return;
    this.currentDialogue = text;
    this.dialogueLife = 2.4;
    this.dialoguePopAnim = 1.0;
    Sound.playChatPop();
  }

  getDamage() {
    let dmg = this.baseDamage * this.damageMultiplier;
    if (this.isAwakened) dmg *= 1.4;
    return Math.round(dmg);
  }

  update(dt, keys, mouseX, mouseY, particles, grenades, canvasW, canvasH) {
    if (this.fireTimer > 0) this.fireTimer -= dt;
    if (this.dashTimer > 0) this.dashTimer -= dt;
    if (this.timerQ > 0) this.timerQ -= dt;
    if (this.timerE > 0) this.timerE -= dt;
    if (this.timerR > 0) this.timerR -= dt;
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;

    if (this.isAwakened) {
      this.awakenTimer -= dt;
      if (this.awakenTimer <= 0) this.isAwakened = false;
    }

    if (this.isFiringLaser) {
      this.laserTimer -= dt;
      if (this.laserTimer <= 0) this.isFiringLaser = false;
    }

    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.aimAngle = Math.atan2(dy, dx);
    this.facingLeft = mouseX < this.x;

    if (this.isDashing) {
      this.dashDurationTimer -= dt;
      this.x += this.dashVx * dt * 60;
      this.y += this.dashVy * dt * 60;

      if (Math.random() < 0.65) {
        this.afterimages.push({
          x: this.x,
          y: this.y,
          facingLeft: this.facingLeft,
          alpha: 0.6
        });
        particles.push(
          new Particle(this.x, this.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 14, '#ffd1dc', 0.4, 'sparkle')
        );
      }

      if (this.dashDurationTimer <= 0) this.isDashing = false;
    } else {
      let moveX = 0;
      let moveY = 0;
      if (keys['KeyW'] || keys['ArrowUp']) moveY -= 1;
      if (keys['KeyS'] || keys['ArrowDown']) moveY += 1;
      if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
      if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

      if (moveX !== 0 && moveY !== 0) {
        moveX *= 0.7071;
        moveY *= 0.7071;
      }

      const curSpeed = this.isAwakened ? this.speed * 1.45 : this.speed;
      this.vx = moveX * curSpeed;
      this.vy = moveY * curSpeed;

      this.x += this.vx * dt * 60;
      this.y += this.vy * dt * 60;

      if (moveX !== 0 || moveY !== 0) {
        this.isMoving = true;
        this.walkTimer += dt * 18;
        this.bobTimer += dt * 18;

        this.stepDustTimer -= dt;
        if (this.stepDustTimer <= 0) {
          this.stepDustTimer = 0.16;
          particles.push(
            new Particle(this.x + (Math.random() - 0.5) * 16, this.y + 24, -this.vx * 0.25, 0, 5, 'rgba(255, 209, 220, 0.5)', 0.3, 'smoke')
          );
        }
      } else {
        this.isMoving = false;
        this.bobTimer = 0;
      }
    }

    this.dialogueTimer -= dt;
    if (this.dialogueTimer <= 0) {
      this.dialogueTimer = 2.2 + Math.random() * 1.0;
      const nextLine = this.dialogues[Math.floor(Math.random() * this.dialogues.length)];
      this.say(nextLine, true);
    }
    if (this.dialogueLife > 0) this.dialogueLife -= dt;
    if (this.dialoguePopAnim > 0) {
      this.dialoguePopAnim = Math.max(0, this.dialoguePopAnim - dt * 6);
    }

    this.x = Math.max(this.radius, Math.min(canvasW - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(canvasH - this.radius, this.y));

    for (let i = this.afterimages.length - 1; i >= 0; i--) {
      this.afterimages[i].alpha -= dt * 2.5;
      if (this.afterimages[i].alpha <= 0) this.afterimages.splice(i, 1);
    }

    if (Math.random() < 0.3) {
      particles.push(
        new Particle(this.x + (Math.random() - 0.5) * 20, this.y + (Math.random() - 0.5) * 20, 0, -0.4, 4, this.bulletColor, 0.4, 'sparkle')
      );
    }
  }

  shoot(mouseX, mouseY, projectiles, particles) {
    if (this.fireTimer > 0) return;
    const rate = this.isAwakened ? this.attackCooldown * 0.55 : this.attackCooldown;
    this.fireTimer = rate;

    const baseDmg = this.getDamage();
    const count = this.isAwakened ? this.bulletCount + 2 : this.bulletCount;
    const pSpeed = 16;

    const spreadAngle = 0.12;
    const startAngle = this.aimAngle - ((count - 1) * spreadAngle) / 2;

    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * spreadAngle;
      const vx = Math.cos(angle) * pSpeed;
      const vy = Math.sin(angle) * pSpeed;
      projectiles.push(
        new Projectile(this.x, this.y, vx, vy, baseDmg, this.pierce, true, this.bulletColor, 7, this.charType)
      );
    }

    particles.push(
      new Particle(this.x + Math.cos(this.aimAngle) * 26, this.y + Math.sin(this.aimAngle) * 26, 0, 0, 10, '#ffffff', 0.08, 'sparkle')
    );

    Sound.playShoot(this.charType, this.isAwakened);
  }

  dash(keys) {
    if (this.dashTimer > 0 || this.isDashing) return;
    let moveX = 0;
    let moveY = 0;
    if (keys['KeyW'] || keys['ArrowUp']) moveY -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) moveY += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

    if (moveX === 0 && moveY === 0) {
      moveX = Math.cos(this.aimAngle);
      moveY = Math.sin(this.aimAngle);
    } else {
      const len = Math.hypot(moveX, moveY);
      moveX /= len;
      moveY /= len;
    }

    const dashSpeed = 16;
    this.dashVx = moveX * dashSpeed;
    this.dashVy = moveY * dashSpeed;
    this.isDashing = true;
    this.dashDurationTimer = this.dashDuration;
    this.dashTimer = this.dashCooldown;
    this.invulnerableTimer = this.dashDuration + 0.1;

    const dashQuotes = this.charType === 'usagi' 
      ? ["야하-!!", "우라라라-!!", "뿌루루!"]
      : (this.charType === 'hachiware' ? ["난또까나레-!!", "와앗! 피했다!", "휴우 살았다!"] : ["와아앗-!!", "피했다-!", "휴우... 살았다!"]);
    this.say(dashQuotes[Math.floor(Math.random() * dashQuotes.length)], true);
    Sound.playDash();
  }

  throwGrenade(targetX, targetY, grenades) {
    if (this.timerQ > 0) return;
    this.timerQ = this.cdQ;
    grenades.push(
      new AcornBomb(this.x, this.y, targetX, targetY, this.grenadeDamage * this.damageMultiplier, this.grenadeRadius)
    );
    const qQuotes = this.charType === 'usagi'
      ? ["우라라라-!!", "야하-!!", "뿌루루루루-!", "바하-!!"]
      : (this.charType === 'hachiware' 
          ? ["난또까나레-!! 도토리 폭탄이다!", "이걸로 한 방에!", "치이카와, 피해!"] 
          : ["이... 야앗-!!", "차앗-!!", "와아앗!"]);
    this.say(qQuotes[Math.floor(Math.random() * qQuotes.length)], true);
  }

  activateAwaken(particles) {
    if (this.timerE > 0) return;
    this.timerE = this.cdE;
    this.isAwakened = true;
    this.awakenTimer = this.awakenDuration;

    particles.push(new Particle(this.x, this.y, 0, 0, 30, '#ff79b0', 0.5, 'ring'));
    const awakenQuotes = this.charType === 'usagi'
      ? ["우라라라라라-!! 야하-!!", "뿌루루루루루-!!", "이햐아아아-!!"]
      : (this.charType === 'hachiware' 
          ? ["난또까나레-!! 에이 에이 오-!!", "어떻게든 해보는 거야!", "용기를 내자!"] 
          : ["이... 야아아앗-!!", "훗... 후웅-!!", "와아아아-!!"]);
    this.say(awakenQuotes[Math.floor(Math.random() * awakenQuotes.length)], true);
    Sound.playAwaken();
  }

  activateLaser(particles) {
    if (this.timerR > 0) return;
    this.timerR = this.cdR;
    this.isFiringLaser = true;
    this.laserTimer = this.laserDuration;
    const laserQuotes = this.charType === 'usagi'
      ? ["우라라라라라라라-!!!!", "뿌루루루루루루-!!!!", "야하아아아-!!!!"]
      : (this.charType === 'hachiware' ? ["별똥별 레인보우 빔 발사-!!", "어떻게든 될 거야아아-!!"] : ["별똥별 레인보우 빔 발사아아!!", "와아아아아아-!!", "별님 힘을 줘-!!"]);
    this.say(laserQuotes[Math.floor(Math.random() * laserQuotes.length)], true);
    Sound.playLaser();
  }

  draw(ctx) {
    for (const ghost of this.afterimages) {
      ctx.save();
      ctx.globalAlpha = ghost.alpha;
      ctx.translate(ghost.x, ghost.y);
      if (ghost.facingLeft) ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, -28, -28, 56, 56);
      ctx.restore();
    }

    ctx.save();
    ctx.translate(this.x, this.y);

    const bobOffset = Math.sin(this.bobTimer) * 3;
    ctx.translate(0, bobOffset);

    if (this.invulnerableTimer > 0 && Math.floor(Date.now() / 60) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    ctx.fillStyle = 'rgba(0,0,0,0.25)';
    ctx.beginPath();
    ctx.ellipse(0, 24 - bobOffset, 20, 6, 0, 0, Math.PI * 2);
    ctx.fill();

    if (this.isAwakened) {
      ctx.save();
      ctx.strokeStyle = '#ff4081';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#ff80ab';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, 0, 36 + Math.sin(Date.now() / 80) * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    ctx.save();
    const armAngle = this.aimAngle;
    ctx.rotate(armAngle);
    ctx.fillStyle = '#94a3b8';
    ctx.fillRect(6, -2, 22, 4);
    ctx.fillStyle = this.bulletColor;
    ctx.beginPath();
    ctx.arc(28, 0, 7, -Math.PI / 2, Math.PI / 2, true);
    ctx.lineWidth = 3;
    ctx.strokeStyle = this.bulletColor;
    ctx.stroke();
    ctx.restore();

    ctx.save();
    if (this.facingLeft) ctx.scale(-1, 1);
    const runTilt = this.isMoving ? Math.sin(this.walkTimer) * 0.08 : 0;
    ctx.rotate(runTilt);

    ctx.drawImage(this.sprite, -28, -28, 56, 56);

    ctx.strokeStyle = this.isAwakened ? '#ff4081' : 'rgba(255, 182, 193, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 28, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    ctx.strokeStyle = 'rgba(255, 107, 139, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(Math.cos(this.aimAngle) * 80, Math.sin(this.aimAngle) * 80);
    ctx.stroke();
    ctx.restore();

    if (this.dialogueLife > 0 && this.currentDialogue) {
      ctx.save();
      const bubbleY = -46 - Math.abs(bobOffset);
      ctx.font = 'bold 13px "Jua", "Noto Sans KR"';
      const textMetrics = ctx.measureText(this.currentDialogue);
      const textWidth = textMetrics.width;
      const bw = Math.max(64, textWidth + 20);
      const bh = 26;

      const popScale = 1.0 + Math.sin(this.dialoguePopAnim * Math.PI) * 0.16;
      ctx.translate(0, bubbleY);
      ctx.scale(popScale, popScale);

      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;

      ctx.fillStyle = '#fffdf0';
      drawBubbleRect(ctx, -bw / 2, -bh, bw, bh, 10);
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(-4, 0); ctx.lineTo(4, 0); ctx.lineTo(0, 6);
      ctx.closePath();
      ctx.fill();

      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#d81b60';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.currentDialogue, 0, -bh / 2);

      ctx.restore();
    }

    ctx.restore();
  }
}

// --- Main Game Orchestrator with 10 Waves & Endless Mode ---
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.selectedChar = 'chiikawa';
    this.sprites = {
      chiikawa: new Image(),
      hachiware: new Image(),
      usagi: new Image()
    };
    this.sprites.chiikawa.src = 'assets/chiikawa.png';
    this.sprites.hachiware.src = 'assets/hachiware.png';
    this.sprites.usagi.src = 'assets/usagi.png';

    this.keys = {};
    this.mouse = { x: 0, y: 0, isDown: false };
    this.lastTime = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.isLevelingUp = false;

    this.score = 0;
    this.kills = 0;
    this.wave = 1;
    this.maxCampaignWave = 10;
    this.waveTimer = 0;
    this.waveDuration = 32; // 32s per wave
    this.gameTime = 0;
    this.spawnTimer = 0;
    this.bossSpawned = false;

    this.level = 1;
    this.currentExp = 0;
    this.maxExp = 45;

    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.grenades = [];
    this.expGems = [];
    this.particles = [];
    this.damageTexts = [];

    this.screenShake = 0;

    this.bindEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    document.querySelectorAll('.char-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedChar = card.getAttribute('data-char');
      });
    });

    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;
      Sound.init();

      if (e.code === 'KeyP' || e.code === 'Escape') {
        this.togglePause();
      }

      if (this.isRunning && !this.isPaused && !this.isLevelingUp) {
        if (e.code === 'Space') {
          e.preventDefault();
          this.player.dash(this.keys);
        } else if (e.code === 'KeyQ') {
          this.player.throwGrenade(this.mouse.x, this.mouse.y, this.grenades);
        } else if (e.code === 'KeyE') {
          this.player.activateAwaken(this.particles);
        } else if (e.code === 'KeyR') {
          this.player.activateLaser(this.particles);
        }
      }

      if (this.isLevelingUp && ['Digit1', 'Digit2', 'Digit3'].includes(e.code)) {
        const idx = parseInt(e.code.replace('Digit', '')) - 1;
        const cards = document.querySelectorAll('.card-item');
        if (cards[idx]) cards[idx].click();
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
        Sound.init();
        this.mouse.isDown = true;
      }
    });

    window.addEventListener('mouseup', (e) => {
      if (e.button === 0) this.mouse.isDown = false;
    });

    document.getElementById('btn-start').addEventListener('click', () => {
      Sound.init();
      Sound.startBGM();
      this.start();
    });

    document.getElementById('btn-restart').addEventListener('click', () => this.start());
    document.getElementById('btn-victory-restart').addEventListener('click', () => this.start());
    document.getElementById('btn-resume').addEventListener('click', () => this.togglePause());
    document.getElementById('btn-pause').addEventListener('click', () => this.togglePause());

    const btnSound = document.getElementById('btn-sound');
    btnSound.addEventListener('click', () => {
      Sound.sfxEnabled = !Sound.sfxEnabled;
      btnSound.textContent = Sound.sfxEnabled ? '🔊 SFX ON' : '🔈 SFX OFF';
    });

    const btnBgm = document.getElementById('btn-bgm');
    const updateBgmBtnText = () => {
      if (!Sound.bgmEnabled) {
        btnBgm.textContent = '🔇 BGM OFF';
      } else {
        const trk = Sound.getCurrentTrack();
        btnBgm.textContent = trk.id === 'pajamas' ? '👚 파자마 파티' : '🎸 혼잣말 (ひとりごつ)';
      }
    };
    updateBgmBtnText();

    btnBgm.addEventListener('click', () => {
      if (!Sound.bgmEnabled) {
        Sound.bgmEnabled = true;
        Sound.startBGM();
        updateBgmBtnText();
        this.damageTexts.push(new DamageText(this.canvas.width / 2, 200, `🎵 BGM: ${Sound.getCurrentTrack().name}`, '#ffd166', true));
      } else {
        if (Sound.currentTrackIdx === 0) {
          Sound.switchNextTrack();
          updateBgmBtnText();
          this.damageTexts.push(new DamageText(this.canvas.width / 2, 200, `🎵 BGM: ${Sound.getCurrentTrack().name}`, '#ffd166', true));
        } else {
          Sound.bgmEnabled = false;
          Sound.stopBGM();
          Sound.currentTrackIdx = 0;
          updateBgmBtnText();
          this.damageTexts.push(new DamageText(this.canvas.width / 2, 200, '🔇 BGM 꺼짐', '#94a3b8', true));
        }
      }
    });
  }

  start() {
    document.querySelectorAll('.overlay-screen').forEach((el) => el.classList.remove('active'));

    this.score = 0;
    this.kills = 0;
    this.wave = 1;
    this.waveTimer = 0;
    this.gameTime = 0;
    this.spawnTimer = 0;
    this.bossSpawned = false;

    this.level = 1;
    this.currentExp = 0;
    this.maxExp = 45;

    this.enemies = [];
    this.projectiles = [];
    this.grenades = [];
    this.expGems = [];
    this.particles = [];
    this.damageTexts = [];
    this.screenShake = 0;

    const sprite = this.sprites[this.selectedChar] || this.sprites.chiikawa;
    this.player = new Player(this.canvas.width / 2, this.canvas.height / 2, this.selectedChar, sprite);

    const avatarImg = document.getElementById('avatar-img');
    avatarImg.src = `assets/${this.selectedChar}.png`;
    document.getElementById('hud-name-tag').textContent = this.player.nameTag;

    this.isRunning = true;
    this.isPaused = false;
    this.isLevelingUp = false;

    this.announceWave(1);
    this.updateHUD();
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  announceWave(w) {
    const waveNames = {
      1: "🌸 WAVE 1: 숲속 정찰 (날벌레 몬스터)",
      2: "🍄 WAVE 2: 버섯 숲의 습격 (숲속 고블린)",
      3: "⚔️ WAVE 3: 키메라의 포효 (장갑 키메라)",
      4: "🦇 WAVE 4: 어둠의 벌레 떼 (고속 침투)",
      5: "⚠️ WAVE 5: [중간 보스] 폭주하는 가시 키메라!",
      6: "🌪️ WAVE 6: 고블린 정예병 & 날벌레 합동 공습",
      7: "🛡️ WAVE 7: 강철 중장갑 키메라 군단",
      8: "⚡ WAVE 8: 광기의 번개 풍뎅이 떼",
      9: "💀 WAVE 9: 엘리트 몬스터 총공격!!",
      10: "👑 WAVE 10: [최종 보스] 진(眞) 거대 아노코 강림!"
    };
    const title = waveNames[w] || `🔥 WAVE ${w}: 무한 나이트메어 모드 🔥`;
    this.damageTexts.push(new DamageText(this.canvas.width / 2, 160, title, '#ff4081', true));
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
    const margin = 80;
    let x, y;
    if (Math.random() < 0.5) {
      x = Math.random() < 0.5 ? -margin : this.canvas.width + margin;
      y = Math.random() * this.canvas.height;
    } else {
      x = Math.random() * this.canvas.width;
      y = Math.random() < 0.5 ? -margin : this.canvas.height + margin;
    }

    const roll = Math.random();
    let type = 'bug';

    if (this.wave === 1) {
      type = 'bug';
    } else if (this.wave === 2) {
      type = roll < 0.45 ? 'goblin' : 'bug';
    } else if (this.wave === 3) {
      type = roll < 0.35 ? 'chimera' : (roll < 0.7 ? 'goblin' : 'bug');
    } else if (this.wave === 4) {
      type = roll < 0.6 ? 'dark_swarm' : 'goblin';
    } else if (this.wave === 5) {
      type = roll < 0.4 ? 'bug' : 'goblin';
    } else if (this.wave === 6) {
      type = roll < 0.4 ? 'goblin' : 'bug';
    } else if (this.wave === 7) {
      type = roll < 0.45 ? 'iron_chimera' : 'chimera';
    } else if (this.wave === 8) {
      type = roll < 0.55 ? 'lightning_beetle' : 'dark_swarm';
    } else if (this.wave === 9) {
      type = roll < 0.3 ? 'iron_chimera' : (roll < 0.6 ? 'lightning_beetle' : 'goblin');
    } else if (this.wave >= 10) {
      type = roll < 0.25 ? 'iron_chimera' : (roll < 0.5 ? 'lightning_beetle' : (roll < 0.75 ? 'goblin' : 'dark_swarm'));
    }

    this.enemies.push(new Enemy(x, y, type, this.wave));
  }

  spawnMidBoss() {
    this.bossSpawned = true;
    const x = this.canvas.width / 2;
    const y = -100;
    this.enemies.push(new Enemy(x, y, 'midboss', this.wave));
  }

  spawnFinalBoss() {
    this.bossSpawned = true;
    const x = this.canvas.width / 2;
    const y = -100;
    this.enemies.push(new Enemy(x, y, 'boss', this.wave));
  }

  addExp(amount) {
    this.currentExp += amount;
    this.score += amount * 10;
    while (this.currentExp >= this.maxExp) {
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
      { id: 'grenade', name: '특대 도토리 폭탄', icon: '🌰', effect: 'Q 스킬 폭발 범위 +40% & 데미지 +50', tier: '스킬', apply: () => { this.player.grenadeRadius *= 1.4; this.player.grenadeDamage += 50; } },
      { id: 'leech', name: '하치와레의 긍정 기운', icon: '💖', effect: '적 처치 시 8% 확률로 체력 10 회복', tier: '생존', apply: () => (this.player.lifesteal += 0.08) }
    ];

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selectedCards = shuffled.slice(0, 3);

    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    selectedCards.forEach((card, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card-item';
      cardEl.innerHTML = `
        <div class="card-key-badge">[${idx + 1}]</div>
        <div class="card-icon">${card.icon}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-effect">${card.effect}</div>
        <div class="card-tier">${card.tier}</div>
      `;
      cardEl.addEventListener('click', () => {
        card.apply();
        this.isLevelingUp = false;
        document.getElementById('levelup-modal').classList.remove('active');
        this.updateHUD();
        this.lastTime = performance.now();
        requestAnimationFrame((t) => this.loop(t));
      });
      container.appendChild(cardEl);
    });

    document.getElementById('levelup-modal').classList.add('active');
  }

  gameOver() {
    this.isRunning = false;
    document.getElementById('stat-time').textContent = this.formatTime(this.gameTime);
    document.getElementById('stat-wave').textContent = this.wave;
    document.getElementById('stat-kills').textContent = this.kills;
    document.getElementById('stat-score').textContent = this.score;
    document.getElementById('gameover-screen').classList.add('active');
  }

  victory() {
    this.isRunning = false;
    document.getElementById('vstat-time').textContent = this.formatTime(this.gameTime);
    document.getElementById('vstat-kills').textContent = this.kills;
    document.getElementById('vstat-score').textContent = this.score;
    document.getElementById('victory-screen').classList.add('active');
  }

  formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }

  updateHUD() {
    document.getElementById('hud-level').textContent = `Lv.${this.level}`;
    document.getElementById('hud-hp-text').textContent = `${Math.ceil(this.player.hp)} / ${this.player.maxHp}`;
    const hpPct = Math.max(0, (this.player.hp / this.player.maxHp) * 100);
    document.getElementById('hud-hp-bar').style.width = `${hpPct}%`;

    const expPct = Math.min(100, (this.currentExp / this.maxExp) * 100);
    document.getElementById('hud-exp-bar').style.width = `${expPct}%`;
    document.getElementById('hud-exp-text').textContent = `${Math.round(expPct)}%`;

    const waveLabel = this.wave > 10 ? `WAVE ${this.wave} (ENDLESS)` : `WAVE ${this.wave} / 10`;
    document.getElementById('hud-wave').textContent = waveLabel;
    document.getElementById('hud-timer').textContent = this.formatTime(this.gameTime);
    document.getElementById('hud-score').textContent = this.score;
    document.getElementById('hud-kills').textContent = this.kills;

    const setCd = (id, cur, max) => {
      const pct = max > 0 ? Math.min(100, (cur / max) * 100) : 0;
      const el = document.getElementById(id);
      if (el) el.style.height = `${pct}%`;
    };

    setCd('cd-space', this.player.dashTimer, this.player.dashCooldown);
    setCd('cd-q', this.player.timerQ, this.player.cdQ);
    setCd('cd-e', this.player.timerE, this.player.cdE);
    setCd('cd-r', this.player.timerR, this.player.cdR);
  }

  loop(timestamp) {
    if (!this.isRunning || this.isPaused || this.isLevelingUp) return;

    const dt = Math.min(0.05, (timestamp - this.lastTime) / 1000);
    this.lastTime = timestamp;

    this.update(dt);
    this.draw();

    requestAnimationFrame((t) => this.loop(t));
  }

  update(dt) {
    this.gameTime += dt;
    this.waveTimer += dt;

    // Wave Progression (every 32s)
    if (this.waveTimer >= this.waveDuration) {
      this.wave++;
      this.waveTimer = 0;
      this.announceWave(this.wave);

      if (this.wave === 5) {
        this.spawnMidBoss();
      } else if (this.wave === 10) {
        this.spawnFinalBoss();
      }
    }

    // Regular enemy spawn interval
    this.spawnTimer += dt;
    const spawnInterval = Math.max(0.32, 1.6 - this.wave * 0.12);
    if (this.spawnTimer >= spawnInterval) {
      this.spawnTimer = 0;
      this.spawnEnemy();
    }

    // Shoot
    if (this.mouse.isDown) {
      this.player.shoot(this.mouse.x, this.mouse.y, this.projectiles, this.particles);
    }

    this.player.update(dt, this.keys, this.mouse.x, this.mouse.y, this.particles, this.grenades, this.canvas.width, this.canvas.height);

    // Laser damage (Skill R)
    if (this.player.isFiringLaser) {
      this.screenShake = Math.max(this.screenShake, 5);
      const laserAngle = this.player.aimAngle;
      const lx = this.player.x;
      const ly = this.player.y;
      const laserLength = 1400;
      const laserWidth = 40;

      if (Math.random() < 0.6) {
        const dist = Math.random() * 800;
        this.particles.push(
          new Particle(lx + Math.cos(laserAngle) * dist, ly + Math.sin(laserAngle) * dist, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 8, '#ffd166', 0.25, 'star')
        );
      }

      this.enemies.forEach((enemy) => {
        const edx = enemy.x - lx;
        const edy = enemy.y - ly;
        const projLen = edx * Math.cos(laserAngle) + edy * Math.sin(laserAngle);
        if (projLen > 0 && projLen < laserLength) {
          const perpDist = Math.abs(-edx * Math.sin(laserAngle) + edy * Math.cos(laserAngle));
          if (perpDist < laserWidth + enemy.radius) {
            const dmg = 8 * dt * 60;
            enemy.hp -= dmg;
            enemy.hitTimer = 0.08;
            if (Math.random() < 0.2) {
              this.damageTexts.push(new DamageText(enemy.x, enemy.y, Math.round(dmg), '#ff79b0'));
            }
          }
        }
      });
    }

    // Update Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt);

      if (p.distance >= p.maxDistance || p.x < -100 || p.x > this.canvas.width + 100 || p.y < -100 || p.y > this.canvas.height + 100) {
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

            Sound.playHit();
            this.damageTexts.push(new DamageText(enemy.x, enemy.y, p.damage, p.color, p.damage > 35));

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
          this.player.hp -= p.damage;
          this.player.invulnerableTimer = 0.3;
          this.screenShake = 6;
          Sound.playHit();
          this.damageTexts.push(new DamageText(this.player.x, this.player.y, `-${p.damage}`, '#ef4444', true));
          const hitQuote = this.player.charType === 'usagi'
            ? (Math.random() < 0.5 ? "하아?!" : "우뺘-!!")
            : (this.player.charType === 'hachiware' 
                ? (Math.random() < 0.5 ? "으앗...!" : "아야야... 치이카와 조심해!") 
                : (Math.random() < 0.5 ? "후에에엥-!!" : "햐앙...!"));
          this.player.say(hitQuote, true);

          this.projectiles.splice(i, 1);
          if (this.player.hp <= 0) {
            this.gameOver();
            return;
          }
        }
      }
    }

    // Update Grenades (Acorn Bomb)
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const g = this.grenades[i];
      g.update(dt);
      if (g.exploded) {
        Sound.playExplosion();
        this.screenShake = 9;

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
      enemy.update(dt, this.player, this.projectiles);

      const dist = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
      if (dist < enemy.radius + this.player.radius && this.player.invulnerableTimer <= 0) {
        this.player.hp -= enemy.damage;
        this.player.invulnerableTimer = 0.35;
        this.screenShake = 6;
        Sound.playHit();
        this.damageTexts.push(new DamageText(this.player.x, this.player.y, `-${enemy.damage}`, '#ef4444', true));
        const contactQuote = this.player.charType === 'usagi'
          ? (Math.random() < 0.5 ? "하아?!" : "우뺘-!!")
          : (this.player.charType === 'hachiware' ? "으앗! 치이카와, 뒤로 물러서!" : "후에에에-!!");
        this.player.say(contactQuote, true);

        if (this.player.hp <= 0) {
          this.gameOver();
          return;
        }
      }

      if (enemy.hp <= 0) {
        this.kills++;
        this.score += enemy.xp * 10;
        this.expGems.push(new ExpGem(enemy.x, enemy.y, enemy.xp));

        if (this.player.lifesteal > 0 && Math.random() < this.player.lifesteal) {
          this.player.hp = Math.min(this.player.maxHp, this.player.hp + 10);
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 20, '+10 HP', '#10b981', true));
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

    if (this.screenShake > 0) {
      const sx = (Math.random() - 0.5) * this.screenShake * 2;
      const sy = (Math.random() - 0.5) * this.screenShake * 2;
      this.ctx.translate(sx, sy);
    }

    this.drawBackground();

    this.expGems.forEach((gem) => gem.draw(this.ctx));
    this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    this.grenades.forEach((g) => g.draw(this.ctx));
    this.projectiles.forEach((p) => p.draw(this.ctx));

    if (this.player.isFiringLaser) {
      this.drawMegaLaser();
    }

    if (this.player) {
      this.player.draw(this.ctx);
    }

    this.particles.forEach((pt) => pt.draw(this.ctx));
    this.damageTexts.forEach((dt) => dt.draw(this.ctx));

    this.ctx.restore();
  }

  drawBackground() {
    const tileSize = 80;
    this.ctx.save();
    this.ctx.strokeStyle = 'rgba(255, 209, 220, 0.08)';
    this.ctx.lineWidth = 1;

    for (let x = 0; x < this.canvas.width; x += tileSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.canvas.height; y += tileSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }

    this.ctx.restore();
  }

  drawMegaLaser() {
    const lx = this.player.x;
    const ly = this.player.y;
    const angle = this.player.aimAngle;
    const len = 1400;

    this.ctx.save();
    this.ctx.translate(lx, ly);
    this.ctx.rotate(angle);

    const grad = this.ctx.createLinearGradient(0, -25, 0, 25);
    grad.addColorStop(0, 'rgba(255, 64, 129, 0.8)');
    grad.addColorStop(0.3, 'rgba(255, 209, 102, 0.9)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 1.0)');
    grad.addColorStop(0.7, 'rgba(6, 214, 160, 0.9)');
    grad.addColorStop(1, 'rgba(17, 138, 178, 0.8)');

    this.ctx.fillStyle = grad;
    this.ctx.shadowColor = '#ffffff';
    this.ctx.shadowBlur = 24;
    this.ctx.fillRect(0, -22, len, 44);

    this.ctx.restore();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.GameInstance = new Game();
});
