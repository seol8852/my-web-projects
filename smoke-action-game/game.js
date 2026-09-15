/* ==========================================================================
   불사조 병장: 스모크 스트라이커 (Smoky Striker)
   Main Game Engine & Logic
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

  playShoot(isAwakened = false) {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isAwakened ? 'sawtooth' : 'triangle';
    const startFreq = isAwakened ? 800 : 650;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.08);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  playHit() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.05);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playDash() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    // White noise whoosh
    const bufferSize = this.ctx.sampleRate * 0.18;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + 0.18);
    filter.Q.value = 3.0;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
  }

  playExplosion() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.45;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);
    filter.frequency.exponentialRampToValueAtTime(60, now + 0.45);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);

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
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.linearRampToValueAtTime(300, now + 0.15);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  playPickup() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.setValueAtTime(659.25, now + 0.05); // E5
    osc.frequency.setValueAtTime(783.99, now + 0.1); // G5

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.2);
  }

  playLevelUp() {
    if (!this.sfxEnabled || !this.ctx) return;
    const notes = [440, 554.37, 659.25, 880]; // A4, C#5, E5, A5
    notes.forEach((freq, idx) => {
      const now = this.ctx.currentTime + idx * 0.08;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now);
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

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.35);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  playChatPop() {
    if (!this.sfxEnabled || !this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(1250, now + 0.05);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.06);
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
    const bassScale = [110, 110, 130.81, 146.83, 110, 110, 164.81, 146.83];
    const melodyScale = [440, 523.25, 587.33, 659.25, 587.33, 523.25, 440, 392];

    const now = this.ctx.currentTime;
    const freqBass = bassScale[this.step % bassScale.length];
    const freqMelody = melodyScale[(this.step * 2) % melodyScale.length];

    // Bass note
    const oscB = this.ctx.createOscillator();
    const gainB = this.ctx.createGain();
    oscB.type = 'triangle';
    oscB.frequency.setValueAtTime(freqBass / 2, now);
    gainB.gain.setValueAtTime(0.08, now);
    gainB.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    oscB.connect(gainB);
    gainB.connect(this.ctx.destination);
    oscB.start(now);
    oscB.stop(now + 0.18);

    // Lead arpeggio
    if (this.step % 2 === 0) {
      const oscM = this.ctx.createOscillator();
      const gainM = this.ctx.createGain();
      oscM.type = 'sine';
      oscM.frequency.setValueAtTime(freqMelody, now);
      gainM.gain.setValueAtTime(0.04, now);
      gainM.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      oscM.connect(gainM);
      gainM.connect(this.ctx.destination);
      oscM.start(now);
      oscM.stop(now + 0.15);
    }

    this.step++;
    const interval = 135; // ~110 BPM 16th groove
    this.bgmTimer = setTimeout(() => this.scheduleBGM(), interval);
  }
}

const Sound = new SoundController();

// --- Particle Systems ---
class Particle {
  constructor(x, y, vx, vy, radius, color, life, type = 'normal') {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.radius = radius;
    this.maxRadius = radius;
    this.color = color;
    this.life = life;
    this.maxLife = life;
    this.type = type; // 'smoke', 'spark', 'debris', 'ring', 'text'
  }

  update(dt) {
    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;
    this.life -= dt;

    if (this.type === 'smoke') {
      this.radius = this.maxRadius * (1 + (1 - this.life / this.maxLife) * 1.5);
      this.vx *= 0.96;
      this.vy *= 0.96;
    } else if (this.type === 'spark') {
      this.vx *= 0.92;
      this.vy *= 0.92;
    } else if (this.type === 'ring') {
      this.radius += dt * 180;
    }
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;

    if (this.type === 'smoke') {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'spark') {
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'ring') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

class DamageText {
  constructor(x, y, text, color = '#facc15', isCrit = false) {
    this.x = x + (Math.random() * 20 - 10);
    this.y = y - 10;
    this.text = text;
    this.color = color;
    this.isCrit = isCrit;
    this.life = 0.8;
    this.maxLife = 0.8;
    this.vy = -1.6;
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
    ctx.font = this.isCrit ? '900 20px Noto Sans KR' : 'bold 15px Noto Sans KR';
    ctx.shadowColor = 'rgba(0,0,0,0.8)';
    ctx.shadowBlur = 4;
    ctx.textAlign = 'center';
    ctx.fillText(this.text, this.x, this.y);
    ctx.restore();
  }
}

// --- Projectiles ---
class Projectile {
  constructor(x, y, vx, vy, damage, pierce = 1, fromPlayer = true, color = '#ff7b00', size = 5) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.damage = damage;
    this.pierce = pierce;
    this.fromPlayer = fromPlayer;
    this.color = color;
    this.size = size;
    this.distance = 0;
    this.maxDistance = 1100;
    this.hitEnemies = new Set();
  }

  update(dt) {
    const dx = this.vx * dt * 60;
    const dy = this.vy * dt * 60;
    this.x += dx;
    this.y += dy;
    this.distance += Math.hypot(dx, dy);
  }

  draw(ctx) {
    ctx.save();
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();

    // Bullet trail
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.size * 0.8;
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x - this.vx * 1.5, this.y - this.vy * 1.5);
    ctx.stroke();

    ctx.restore();
  }
}

// Grenade Projectile (Skill Q)
class Grenade {
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
    this.speed = 1.8; // Duration roughly 0.55s
    this.peakHeight = 80;
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
    // Parabolic arc
    const arc = 4 * this.progress * (1 - this.progress) * this.peakHeight;
    this.x = currentGroundX;
    this.y = currentGroundY - arc;
  }

  draw(ctx) {
    ctx.save();
    // Shadow
    const shadowX = this.startX + (this.targetX - this.startX) * this.progress;
    const shadowY = this.startY + (this.targetY - this.startY) * this.progress;
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.beginPath();
    ctx.ellipse(shadowX, shadowY, 8, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cigarette Butt Grenade
    ctx.translate(this.x, this.y);
    ctx.rotate(this.progress * 15);
    // Filter
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-8, -3, 6, 6);
    // White body
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(-2, -3, 10, 6);
    // Glowing tip
    ctx.fillStyle = '#ef4444';
    ctx.shadowColor = '#ef4444';
    ctx.shadowBlur = 8;
    ctx.fillRect(8, -3, 3, 6);

    ctx.restore();
  }
}

// XP Gem Item
class ExpGem {
  constructor(x, y, value) {
    this.x = x;
    this.y = y;
    this.value = value;
    this.radius = 7;
    this.life = 60; // 60s
    this.floatTimer = Math.random() * 10;
  }

  update(dt, playerX, playerY) {
    this.life -= dt;
    this.floatTimer += dt * 4;

    const dist = Math.hypot(playerX - this.x, playerY - this.y);
    // Magnet attraction
    if (dist < 160) {
      const speed = 400 * dt;
      this.x += ((playerX - this.x) / dist) * speed;
      this.y += ((playerY - this.y) / dist) * speed;
    }
  }

  draw(ctx) {
    ctx.save();
    const bob = Math.sin(this.floatTimer) * 3;
    ctx.translate(this.x, this.y + bob);

    // Zippo Lighter / Fuel Orb Icon
    ctx.fillStyle = '#38bdf8';
    ctx.shadowColor = '#38bdf8';
    ctx.shadowBlur = 10;

    // Diamond gem shape
    ctx.beginPath();
    ctx.moveTo(0, -this.radius);
    ctx.lineTo(this.radius, 0);
    ctx.lineTo(0, this.radius);
    ctx.lineTo(-this.radius, 0);
    ctx.closePath();
    ctx.fill();

    // Center spark
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// --- Enemy Classes ---
class Enemy {
  constructor(x, y, type = 'drone', wave = 1) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.hitTimer = 0;

    if (type === 'drone') {
      this.radius = 18;
      this.hp = 35 + wave * 8;
      this.maxHp = this.hp;
      this.speed = 2.4 + Math.random() * 0.5;
      this.damage = 10;
      this.color = '#ef4444';
      this.xp = 15;
      this.name = '금연 드론';
    } else if (type === 'enforcer') {
      this.radius = 24;
      this.hp = 85 + wave * 18;
      this.maxHp = this.hp;
      this.speed = 1.7;
      this.damage = 18;
      this.shootCooldown = 2.2;
      this.timer = Math.random() * 2;
      this.color = '#3b82f6';
      this.xp = 35;
      this.name = '단속 요원';
    } else if (type === 'heavy') {
      this.radius = 32;
      this.hp = 250 + wave * 60;
      this.maxHp = this.hp;
      this.speed = 1.1;
      this.damage = 30;
      this.color = '#8b5cf6';
      this.xp = 80;
      this.name = '중장갑 보급관';
    } else if (type === 'boss') {
      this.radius = 55;
      this.hp = 2200 + wave * 500;
      this.maxHp = this.hp;
      this.speed = 1.3;
      this.damage = 40;
      this.color = '#e11d48';
      this.xp = 400;
      this.name = '금연 위원장 데빌 로봇';
      this.shootCooldown = 1.8;
      this.timer = 0;
      this.specialTimer = 0;
    }
  }

  update(dt, player, projectiles) {
    if (this.hitTimer > 0) this.hitTimer -= dt;

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;

    // Movement
    if (this.type === 'enforcer' && dist < 300) {
      // Keep distance and shoot
      this.timer += dt;
      if (this.timer >= this.shootCooldown) {
        this.timer = 0;
        const angle = Math.atan2(dy, dx);
        const pSpeed = 6;
        projectiles.push(
          new Projectile(this.x, this.y, Math.cos(angle) * pSpeed, Math.sin(angle) * pSpeed, 12, 1, false, '#f43f5e', 6)
        );
      }
    } else if (this.type === 'boss') {
      this.x += (dx / dist) * this.speed * dt * 60;
      this.y += (dy / dist) * this.speed * dt * 60;

      this.timer += dt;
      this.specialTimer += dt;

      // Boss Pattern 1: Radial bullets
      if (this.timer >= this.shootCooldown) {
        this.timer = 0;
        const count = 10;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i + Math.sin(Date.now() / 300);
          const pSpeed = 4.5;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(angle) * pSpeed, Math.sin(angle) * pSpeed, 14, 1, false, '#f43f5e', 7)
          );
        }
      }

      // Boss Pattern 2: Triple targeted burst
      if (this.specialTimer >= 4.5) {
        this.specialTimer = 0;
        for (let offset of [-0.25, 0, 0.25]) {
          const baseAngle = Math.atan2(dy, dx) + offset;
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(baseAngle) * 7.5, Math.sin(baseAngle) * 7.5, 20, 1, false, '#fbbf24', 9)
          );
        }
      }
    } else {
      // Normal chase
      this.x += (dx / dist) * this.speed * dt * 60;
      this.y += (dy / dist) * this.speed * dt * 60;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Hit flash
    const isHit = this.hitTimer > 0;
    ctx.fillStyle = isHit ? '#ffffff' : this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;

    if (this.type === 'drone') {
      // Flying drone with propellers
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
      // Propeller blades
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 2;
      const angle = (Date.now() / 40) % (Math.PI * 2);
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * 24, Math.sin(angle) * 24);
      ctx.lineTo(-Math.cos(angle) * 24, -Math.sin(angle) * 24);
      ctx.stroke();

      // Red eye
      ctx.fillStyle = '#ff0000';
      ctx.beginPath();
      ctx.arc(0, 0, 5, 0, Math.PI * 2);
      ctx.fill();
    } else if (this.type === 'enforcer') {
      // Robotic security enforcer
      ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);
      // Visor
      ctx.fillStyle = '#38bdf8';
      ctx.fillRect(-this.radius * 0.7, -8, this.radius * 1.4, 6);
    } else if (this.type === 'heavy') {
      // Heavy hexagonal tank
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

      // Spikes
      ctx.strokeStyle = '#c084fc';
      ctx.lineWidth = 3;
      ctx.stroke();
    } else if (this.type === 'boss') {
      // Giant mechanical devil skull
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();

      // Horns
      ctx.fillStyle = '#991b1b';
      ctx.beginPath();
      ctx.moveTo(-30, -35);
      ctx.lineTo(-45, -75);
      ctx.lineTo(-15, -45);
      ctx.closePath();
      ctx.fill();

      ctx.beginPath();
      ctx.moveTo(30, -35);
      ctx.lineTo(45, -75);
      ctx.lineTo(15, -45);
      ctx.closePath();
      ctx.fill();

      // Glowing devil eyes
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(-18, -10, 8, 0, Math.PI * 2);
      ctx.arc(18, -10, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    // Health bar above enemy
    if (this.hp < this.maxHp || this.type === 'boss') {
      const barW = this.radius * 2 + 10;
      const barH = 5;
      const hpRatio = Math.max(0, this.hp / this.maxHp);
      ctx.fillStyle = 'rgba(0,0,0,0.7)';
      ctx.fillRect(-barW / 2, -this.radius - 14, barW, barH);
      ctx.fillStyle = this.type === 'boss' ? '#e11d48' : '#22c55e';
      ctx.fillRect(-barW / 2, -this.radius - 14, barW * hpRatio, barH);
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

// --- Player Class (의정부 김윤태) ---
class Player {
  constructor(x, y, spriteImg) {
    this.x = x;
    this.y = y;
    this.sprite = spriteImg;
    this.radius = 28;

    // Attributes
    this.maxHp = 100;
    this.hp = 100;
    this.speed = 5.2;
    this.baseDamage = 28;
    this.damageMultiplier = 1.0;
    this.attackCooldown = 0.16; // seconds
    this.fireTimer = 0;
    this.bulletCount = 1; // Number of bullets per shot
    this.pierce = 1;
    this.lifesteal = 0;

    // Movement & Facing
    this.vx = 0;
    this.vy = 0;
    this.facingLeft = false;
    this.aimAngle = 0;
    this.bobTimer = 0;

    // Walking & Animation
    this.walkTimer = 0;
    this.isMoving = false;
    this.stepDustTimer = 0;

    // Dash (Space)
    this.dashCooldown = 2.4;
    this.dashTimer = 0;
    this.isDashing = false;
    this.dashDuration = 0.28;
    this.dashDurationTimer = 0;
    this.dashVx = 0;
    this.dashVy = 0;
    this.afterimages = [];

    // Skill Q (Grenade)
    this.cdQ = 6.0;
    this.timerQ = 0;
    this.grenadeRadius = 150;
    this.grenadeDamage = 175;

    // Skill E (Awakening Buff)
    this.cdE = 14.0;
    this.timerE = 0;
    this.isAwakened = false;
    this.awakenDuration = 6.0;
    this.awakenTimer = 0;

    // Skill R (Hyper Smoke Laser)
    this.cdR = 22.0;
    this.timerR = 0;
    this.isFiringLaser = false;
    this.laserDuration = 2.0;
    this.laserTimer = 0;

    // Invulnerability
    this.invulnerableTimer = 0;

    // Dialogue / Speech Bubble System (김윤태 리얼 성격 & 찐친 티키타카 풀버전)
    this.dialogues = [
      // 1. 찐친 범준이 디스 & 팩폭
      "야 설범준 일이나 해라",
      "인턴이라며? 안 짤리냐?",
      "형 일중 아님? 왜 맨날 카톡하노",
      "그리고 시발아 너가 와 왜 맨날 내가 가",
      "넌 취직했는데 뭘 뺏겨 시발",
      "제미나이로 일 하냐고 ㅋㅋㅋ 개꿀직이네",
      "이런 거 만들 시간에 일이나 해라",
      "칼싸움할까? ㄱㄱ",
      "내가 따먹어야징 ㅋㅋ",
      "만들어서 파일로 보내놔 나 집가서 하게",

      // 2. 담배 사랑 & 군대 티셔츠 바이브
      "아 담배나 한 대 태우자...",
      "담배 불 좀 붙여봐라",
      "담배 맛 쥑이네 진짜",
      "군복 티셔츠 입고 뭐하냐 나 지금",
      "라이터 잃어버렸다 시발",
      "꽁초 아무 데나 버리지 마라",
      "연기 맛 좀 볼래?",

      // 3. 돈 없음 & 집돌이 귀차니즘
      "아 집갈까...",
      "돈 없는데 어쩌라고",
      "집가는게 ㅈㄴ 멀여",
      "2시간 걸림 시발",
      "누워서 폰이나 보고 싶다",
      "아 만사 귀찮다 진짜",
      "배고파 밥 사줘",
      "오늘 저녁 뭐 먹지...",
      "보드게임 카페 4시간 함 ㄷㄷ",

      // 4. 웃픈 연애 & 키 콤플렉스 한탄
      "오빠는 키가 너무 작대 시발...",
      "이미 다른 게 크다고 말했어 ㅠㅠ",
      "쇼타콘 취향 여자 어디 없냐",
      "클럽? 그개 머임?",
      "나도 여자 소개시켜줘...",

      // 5. 전투 & 호탕한 허세
      "덤벼봐 이 금연충들아",
      "키 작다고 무시하다 뚝배기 깨진다",
      "한 대 맞을래?",
      "야 쟤네 왜 이렇게 몰려오냐?",
      "어림도 없지 ㅋㅋ",
      "응 안 맞아~",
      "시발 다 비켜라 좀"
    ];
    this.currentDialogue = "아 담배나 한 대 태우자...";
    this.dialogueTimer = 1.0; // 2~3초마다 주기적 대사
    this.dialogueLife = 2.5;
    this.dialoguePopAnim = 1.0;
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
    // Cooldown timers
    if (this.fireTimer > 0) this.fireTimer -= dt;
    if (this.dashTimer > 0) this.dashTimer -= dt;
    if (this.timerQ > 0) this.timerQ -= dt;
    if (this.timerE > 0) this.timerE -= dt;
    if (this.timerR > 0) this.timerR -= dt;
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;

    // Buff timer
    if (this.isAwakened) {
      this.awakenTimer -= dt;
      if (this.awakenTimer <= 0) {
        this.isAwakened = false;
      }
    }

    // Laser timer
    if (this.isFiringLaser) {
      this.laserTimer -= dt;
      if (this.laserTimer <= 0) {
        this.isFiringLaser = false;
      }
    }

    // Aim angle & facing
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    this.aimAngle = Math.atan2(dy, dx);
    this.facingLeft = mouseX < this.x;

    // Handle Dash State
    if (this.isDashing) {
      this.dashDurationTimer -= dt;
      this.x += this.dashVx * dt * 60;
      this.y += this.dashVy * dt * 60;

      // Spawn dash afterimages and thick smoke
      if (Math.random() < 0.6) {
        this.afterimages.push({
          x: this.x,
          y: this.y,
          facingLeft: this.facingLeft,
          alpha: 0.6
        });
        particles.push(
          new Particle(this.x, this.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 22, 'rgba(160, 170, 185, 0.45)', 0.5, 'smoke')
        );
      }

      if (this.dashDurationTimer <= 0) {
        this.isDashing = false;
      }
    } else {
      // Normal Movement
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

      const curSpeed = this.isAwakened ? this.speed * 1.5 : this.speed;
      this.vx = moveX * curSpeed;
      this.vy = moveY * curSpeed;

      this.x += this.vx * dt * 60;
      this.y += this.vy * dt * 60;

      if (moveX !== 0 || moveY !== 0) {
        this.isMoving = true;
        this.walkTimer += dt * 18;
        this.bobTimer += dt * 18;

        // Footstep dust puff
        this.stepDustTimer -= dt;
        if (this.stepDustTimer <= 0) {
          this.stepDustTimer = 0.16;
          particles.push(
            new Particle(this.x + (Math.random() - 0.5) * 16, this.y + 36, -this.vx * 0.25, (Math.random() - 0.5) * 0.4, 7, 'rgba(180, 190, 185, 0.45)', 0.35, 'smoke')
          );
        }
      } else {
        this.isMoving = false;
        this.bobTimer = 0;
      }
    }

    // Dialogue Timer (2~3초마다 자동으로 대사 출력)
    this.dialogueTimer -= dt;
    if (this.dialogueTimer <= 0) {
      this.dialogueTimer = 2.1 + Math.random() * 0.9; // 2.1초 ~ 3.0초 주기
      const nextLine = this.dialogues[Math.floor(Math.random() * this.dialogues.length)];
      this.say(nextLine, true);
    }
    if (this.dialogueLife > 0) this.dialogueLife -= dt;
    if (this.dialoguePopAnim > 0) {
      this.dialoguePopAnim = Math.max(0, this.dialoguePopAnim - dt * 6);
    }

    // Bounds check
    this.x = Math.max(this.radius, Math.min(canvasW - this.radius, this.x));
    this.y = Math.max(this.radius, Math.min(canvasH - this.radius, this.y));

    // Update afterimages
    for (let i = this.afterimages.length - 1; i >= 0; i--) {
      this.afterimages[i].alpha -= dt * 2.5;
      if (this.afterimages[i].alpha <= 0) {
        this.afterimages.splice(i, 1);
      }
    }

    // Emit Cigarette Smoke & Embers continuously!
    this.emitCigaretteParticles(particles);
  }

  emitCigaretteParticles(particles) {
    const tipOffsetX = this.facingLeft ? 22 : -22;
    const tipOffsetY = -8;
    const tipX = this.x + tipOffsetX;
    const tipY = this.y + tipOffsetY;

    // Smoke
    if (Math.random() < 0.75) {
      const smokeVx = (Math.random() - 0.5) * 0.8;
      const smokeVy = -0.8 - Math.random() * 0.9;
      const smokeColor = this.isAwakened ? 'rgba(255, 120, 30, 0.45)' : 'rgba(220, 225, 235, 0.35)';
      particles.push(
        new Particle(tipX, tipY, smokeVx, smokeVy, 6 + Math.random() * 4, smokeColor, 0.7 + Math.random() * 0.4, 'smoke')
      );
    }

    // Glowing ember sparks
    if (Math.random() < 0.4) {
      const sparkVx = (Math.random() - 0.5) * 1.5;
      const sparkVy = -0.5 - Math.random() * 1.2;
      const sparkColor = this.isAwakened ? '#ffea00' : '#ff4400';
      particles.push(
        new Particle(tipX, tipY, sparkVx, sparkVy, 2 + Math.random() * 2, sparkColor, 0.35, 'spark')
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

    // Bullet spread calculation
    const spreadAngle = 0.12;
    const startAngle = this.aimAngle - ((count - 1) * spreadAngle) / 2;

    for (let i = 0; i < count; i++) {
      const angle = startAngle + i * spreadAngle;
      const vx = Math.cos(angle) * pSpeed;
      const vy = Math.sin(angle) * pSpeed;
      const bulletColor = this.isAwakened ? '#ff0055' : '#ff9800';
      projectiles.push(
        new Projectile(this.x, this.y, vx, vy, baseDmg, this.pierce, true, bulletColor, 5)
      );
    }

    // Muzzle flash particle
    particles.push(
      new Particle(this.x + Math.cos(this.aimAngle) * 28, this.y + Math.sin(this.aimAngle) * 28, 0, 0, 14, '#ffea00', 0.08, 'spark')
    );

    Sound.playShoot(this.isAwakened);
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

    const dashQuotes = ["응 안 맞죠?", "존나 빠르죠?", "어림도 없지 ㅋㅋ", "시발아 너가 와!", "집가는게 ㅈㄴ 멀여!"];
    this.say(dashQuotes[Math.floor(Math.random() * dashQuotes.length)], true);
    Sound.playDash();
  }

  throwGrenade(targetX, targetY, grenades) {
    if (this.timerQ > 0) return;
    this.timerQ = this.cdQ;
    grenades.push(
      new Grenade(this.x, this.y, targetX, targetY, this.grenadeDamage * this.damageMultiplier, this.grenadeRadius)
    );
    const grenadeQuotes = ["꽁초 폭탄 받아라!", "불티 맛 좀 봐라!", "다 날아가라 시발!", "뚝배기 깬다!"];
    this.say(grenadeQuotes[Math.floor(Math.random() * grenadeQuotes.length)], true);
  }

  activateAwaken(particles) {
    if (this.timerE > 0) return;
    this.timerE = this.cdE;
    this.isAwakened = true;
    this.awakenTimer = this.awakenDuration;

    // Shockwave ring
    particles.push(new Particle(this.x, this.y, 0, 0, 30, '#ff9800', 0.5, 'ring'));
    const awakenQuotes = ["내가 다 따먹어야징 ㅋㅋ", "오빠 키는 작아도 존나 맵다!", "군기 바짝 들었다!", "덤벼 시발!!"];
    this.say(awakenQuotes[Math.floor(Math.random() * awakenQuotes.length)], true);
    Sound.playAwaken();
  }

  activateLaser(particles) {
    if (this.timerR > 0) return;
    this.timerR = this.cdR;
    this.isFiringLaser = true;
    this.laserTimer = this.laserDuration;
    const laserQuotes = ["다 태워버린다 시발!!", "제미나이 개꿀직 빔 발사아아!!", "내 담배 필터 올인이다!!", "다 비켜어어어!!"];
    this.say(laserQuotes[Math.floor(Math.random() * laserQuotes.length)], true);
    Sound.playLaser();
  }

  draw(ctx) {
    // Draw Dash Afterimages
    for (const ghost of this.afterimages) {
      ctx.save();
      ctx.globalAlpha = ghost.alpha;
      ctx.translate(ghost.x, ghost.y);
      if (ghost.facingLeft) ctx.scale(-1, 1);
      ctx.drawImage(this.sprite, -34, -40, 68, 80);
      ctx.restore();
    }

    ctx.save();
    ctx.translate(this.x, this.y);

    // Subtle bobbing when moving / walking
    const bobOffset = Math.sin(this.bobTimer) * 3.5;
    ctx.translate(0, bobOffset);

    // Invulnerability blink
    if (this.invulnerableTimer > 0 && Math.floor(Date.now() / 60) % 2 === 0) {
      ctx.globalAlpha = 0.5;
    }

    // Shadow on ground
    ctx.fillStyle = 'rgba(0,0,0,0.38)';
    ctx.beginPath();
    ctx.ellipse(0, 36 - bobOffset, 24, 7, 0, 0, Math.PI * 2);
    ctx.fill();

    // Awakening Aura
    if (this.isAwakened) {
      ctx.save();
      ctx.strokeStyle = '#ff9800';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#ff5722';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(0, 4, 40 + Math.sin(Date.now() / 80) * 4, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // --- 1. Dynamic Walking Legs Animation ---
    const legSwing = this.isMoving ? Math.sin(this.walkTimer) * 16 : 0;
    const legSpread = 9;

    // Left Leg
    ctx.save();
    ctx.translate(-legSpread, 22);
    ctx.rotate((legSwing * Math.PI) / 180 * (this.facingLeft ? -1 : 1));
    ctx.fillStyle = '#3f4f38'; // Military camo green pants
    ctx.fillRect(-4, 0, 8, 12);
    ctx.fillStyle = '#1c1917'; // Combat boot
    ctx.fillRect(-5, 10, 11, 6);
    ctx.restore();

    // Right Leg
    ctx.save();
    ctx.translate(legSpread, 22);
    ctx.rotate((-legSwing * Math.PI) / 180 * (this.facingLeft ? -1 : 1));
    ctx.fillStyle = '#3f4f38'; // Military camo green pants
    ctx.fillRect(-4, 0, 8, 12);
    ctx.fillStyle = '#1c1917'; // Combat boot
    ctx.fillRect(-5, 10, 11, 6);
    ctx.restore();

    // --- 2. Tactical Body & Camo Torso ---
    ctx.save();
    ctx.translate(0, 10);
    ctx.fillStyle = '#34432d';
    drawBubbleRect(ctx, -16, 0, 32, 18, 5);
    ctx.fill();
    // Pixel camo pattern accents
    ctx.fillStyle = '#222c1d';
    ctx.fillRect(-12, 3, 7, 5);
    ctx.fillRect(4, 7, 8, 5);
    ctx.fillRect(-4, 11, 6, 4);
    // Tactical belt
    ctx.fillStyle = '#18181b';
    ctx.fillRect(-16, 15, 32, 4);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-3, 14, 6, 6);
    ctx.restore();

    // --- 3. Gun Arm Pointing at Aim Angle ---
    ctx.save();
    ctx.translate(0, 8);
    const armAngle = this.aimAngle;
    ctx.rotate(armAngle);
    // Arm
    ctx.fillStyle = '#3f4f38';
    ctx.fillRect(0, -3, 14, 6);
    // Gun Body
    ctx.fillStyle = '#334155';
    ctx.fillRect(10, -5, 16, 7);
    // Gun Barrel / Cigarette Muzzle
    ctx.fillStyle = this.isAwakened ? '#ff0055' : '#ff9800';
    ctx.fillRect(24, -4, 5, 5);
    ctx.restore();

    // --- 4. Main Hero Head Token (Kim Yoon-tae Photo) ---
    ctx.save();
    if (this.facingLeft) {
      ctx.scale(-1, 1);
    }
    // Dynamic run tilt
    const runTilt = this.isMoving ? Math.sin(this.walkTimer) * 0.05 : 0;
    ctx.rotate(runTilt);

    // Head Token
    ctx.drawImage(this.sprite, -34, -40, 68, 78);

    // Glowing circle frame
    ctx.strokeStyle = this.isAwakened ? '#ff3d00' : 'rgba(255, 152, 0, 0.75)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.ellipse(0, -1, 33, 37, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // --- 5. Aim Laser Sight ---
    ctx.save();
    ctx.strokeStyle = this.isAwakened ? 'rgba(255, 0, 80, 0.45)' : 'rgba(255, 152, 0, 0.35)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(0, 8);
    ctx.lineTo(Math.cos(this.aimAngle) * 80, 8 + Math.sin(this.aimAngle) * 80);
    ctx.stroke();
    ctx.restore();

    // --- 6. KakaoTalk Speech Bubble (김윤태 대사 말풍선) ---
    if (this.dialogueLife > 0 && this.currentDialogue) {
      ctx.save();
      const bubbleY = -52 - Math.abs(bobOffset);
      ctx.font = 'bold 13px "Noto Sans KR", -apple-system, sans-serif';
      const textMetrics = ctx.measureText(this.currentDialogue);
      const textWidth = textMetrics.width;
      const bw = Math.max(70, textWidth + 24);
      const bh = 28;

      // Pop-in bounce animation
      const popScale = 1.0 + Math.sin(this.dialoguePopAnim * Math.PI) * 0.16;
      ctx.translate(0, bubbleY);
      ctx.scale(popScale, popScale);

      // Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.45)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetY = 3;

      // KakaoTalk yellow speech bubble body
      ctx.fillStyle = '#fee500';
      drawBubbleRect(ctx, -bw / 2, -bh, bw, bh, 12);
      ctx.fill();

      // Pointer tail towards head
      ctx.beginPath();
      ctx.moveTo(-5, 0);
      ctx.lineTo(5, 0);
      ctx.lineTo(0, 7);
      ctx.closePath();
      ctx.fill();

      // Dialogue Text
      ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#191919';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(this.currentDialogue, 0, -bh / 2);

      ctx.restore();
    }

    ctx.restore();
  }
}

// --- Main Game Orchestrator ---
class Game {
  constructor() {
    this.canvas = document.getElementById('gameCanvas');
    this.ctx = this.canvas.getContext('2d');

    this.heroSprite = new Image();
    this.heroSprite.src = 'hero_sprite.png';

    this.keys = {};
    this.mouse = { x: 0, y: 0, isDown: false };
    this.lastTime = 0;
    this.isRunning = false;
    this.isPaused = false;
    this.isLevelingUp = false;

    // Game state
    this.score = 0;
    this.kills = 0;
    this.wave = 1;
    this.waveTimer = 0;
    this.gameTime = 0;
    this.spawnTimer = 0;
    this.bossSpawned = false;

    // EXP & Level
    this.level = 1;
    this.currentExp = 0;
    this.maxExp = 60;

    // Entities
    this.player = null;
    this.enemies = [];
    this.projectiles = [];
    this.grenades = [];
    this.expGems = [];
    this.particles = [];
    this.damageTexts = [];

    // Screen Shake
    this.screenShake = 0;

    // Bindings
    this.bindEvents();
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      this.keys[e.code] = true;

      // Start sound on first key
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

      // Quick level up select
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
      if (e.button === 0) {
        this.mouse.isDown = false;
      }
    });

    // UI Buttons
    document.getElementById('btn-start').addEventListener('click', () => {
      Sound.init();
      Sound.startBGM();
      this.start();
    });

    document.getElementById('btn-restart').addEventListener('click', () => {
      this.start();
    });

    document.getElementById('btn-victory-restart').addEventListener('click', () => {
      this.start();
    });

    document.getElementById('btn-resume').addEventListener('click', () => {
      this.togglePause();
    });

    document.getElementById('btn-pause').addEventListener('click', () => {
      this.togglePause();
    });

    // Sound Toggles
    const btnSound = document.getElementById('btn-sound');
    btnSound.addEventListener('click', () => {
      Sound.sfxEnabled = !Sound.sfxEnabled;
      btnSound.textContent = Sound.sfxEnabled ? '🔊 SFX ON' : '🔈 SFX OFF';
    });

    const btnBgm = document.getElementById('btn-bgm');
    btnBgm.addEventListener('click', () => {
      Sound.bgmEnabled = !Sound.bgmEnabled;
      btnBgm.textContent = Sound.bgmEnabled ? '🎵 BGM ON' : '🔇 BGM OFF';
      if (Sound.bgmEnabled) Sound.startBGM();
      else Sound.stopBGM();
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
    this.maxExp = 50;

    this.enemies = [];
    this.projectiles = [];
    this.grenades = [];
    this.expGems = [];
    this.particles = [];
    this.damageTexts = [];
    this.screenShake = 0;

    this.player = new Player(this.canvas.width / 2, this.canvas.height / 2, this.heroSprite);

    this.isRunning = true;
    this.isPaused = false;
    this.isLevelingUp = false;

    this.updateHUD();
    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
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

    // Determine type based on wave
    const roll = Math.random();
    let type = 'drone';
    if (this.wave >= 2 && roll < 0.35) {
      type = 'enforcer';
    } else if (this.wave >= 3 && roll > 0.85) {
      type = 'heavy';
    }

    this.enemies.push(new Enemy(x, y, type, this.wave));
  }

  spawnBoss() {
    this.bossSpawned = true;
    const x = this.canvas.width / 2;
    const y = -100;
    this.enemies.push(new Enemy(x, y, 'boss', this.wave));
    this.damageTexts.push(new DamageText(this.canvas.width / 2, 200, '⚠️ 경고: 금연 위원장 데빌 로봇 등장! ⚠️', '#ef4444', true));
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
    this.player.say(Math.random() < 0.5 ? "보드게임 4시간 짬바!" : "만들어서 파일로 보내놔!", true);

    const pool = [
      { id: 'dmg', name: '화력 강화', icon: '💥', effect: '공격력 +30%', tier: '공격', apply: () => (this.player.damageMultiplier += 0.3) },
      { id: 'rate', name: '고속 연사', icon: '⚡', effect: '기본 공격 속도 +25%', tier: '공격', apply: () => (this.player.attackCooldown *= 0.78) },
      { id: 'spread', name: '산탄 확장', icon: '🎯', effect: '발사 탄환 수 +1 추가', tier: '공격', apply: () => (this.player.bulletCount += 1) },
      { id: 'speed', name: '전투 질주', icon: '👟', effect: '이동 속도 +18%', tier: '기동', apply: () => (this.player.speed *= 1.18) },
      { id: 'hp', name: '불사조 체력', icon: '❤️', effect: '최대 체력 +35 및 즉시 50 회복', tier: '생존', apply: () => { this.player.maxHp += 35; this.player.hp = Math.min(this.player.maxHp, this.player.hp + 50); } },
      { id: 'pierce', name: '관통 철갑탄', icon: '🗡️', effect: '탄환 관통 횟수 +1 증가', tier: '특수', apply: () => (this.player.pierce += 1) },
      { id: 'grenade', name: '대형 꽁초 폭탄', icon: '💣', effect: 'Q 스킬 폭발 범위 +40% & 데미지 +50', tier: '스킬', apply: () => { this.player.grenadeRadius *= 1.4; this.player.grenadeDamage += 50; } },
      { id: 'leech', name: '니코틴 흡혈', icon: '🩸', effect: '적 처치 시 7% 확률로 체력 10 회복', tier: '생존', apply: () => (this.player.lifesteal += 0.07) }
    ];

    // Pick 3 random unique cards
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

    document.getElementById('hud-wave').textContent = `WAVE ${this.wave}`;
    document.getElementById('hud-timer').textContent = this.formatTime(this.gameTime);
    document.getElementById('hud-score').textContent = this.score;
    document.getElementById('hud-kills').textContent = this.kills;

    // Cooldown overlays
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

    // Wave Progression
    if (this.waveTimer >= 45 && this.wave < 5) {
      this.wave++;
      this.waveTimer = 0;
      this.damageTexts.push(new DamageText(this.canvas.width / 2, 160, `🔥 WAVE ${this.wave} 개시! 🔥`, '#f97316', true));
      if (this.wave === 5 && !this.bossSpawned) {
        this.spawnBoss();
      }
    }

    // Spawn regular enemies
    this.spawnTimer += dt;
    const spawnInterval = Math.max(0.45, 1.8 - this.wave * 0.25);
    if (this.spawnTimer >= spawnInterval) {
      this.spawnTimer = 0;
      this.spawnEnemy();
    }

    // Player Shoot
    if (this.mouse.isDown) {
      this.player.shoot(this.mouse.x, this.mouse.y, this.projectiles, this.particles);
    }

    // Player Update
    this.player.update(dt, this.keys, this.mouse.x, this.mouse.y, this.particles, this.grenades, this.canvas.width, this.canvas.height);

    // Hyper Smoke Laser Damage (Skill R)
    if (this.player.isFiringLaser) {
      this.screenShake = Math.max(this.screenShake, 6);
      const laserAngle = this.player.aimAngle;
      const lx = this.player.x;
      const ly = this.player.y;
      const laserLength = 1400;
      const laserWidth = 36;

      // Particle spray along laser
      for (let i = 0; i < 4; i++) {
        const randD = Math.random() * 800;
        const px = lx + Math.cos(laserAngle) * randD + (Math.random() - 0.5) * 20;
        const py = ly + Math.sin(laserAngle) * randD + (Math.random() - 0.5) * 20;
        this.particles.push(new Particle(px, py, 0, 0, 8, '#f59e0b', 0.1, 'spark'));
      }

      // Check collision with enemies
      for (const enemy of this.enemies) {
        // Line-circle distance
        const ex = enemy.x - lx;
        const ey = enemy.y - ly;
        const proj = ex * Math.cos(laserAngle) + ey * Math.sin(laserAngle);
        if (proj > 0 && proj < laserLength) {
          const perpDist = Math.abs(-ex * Math.sin(laserAngle) + ey * Math.cos(laserAngle));
          if (perpDist < enemy.radius + laserWidth / 2) {
            const dmg = 450 * dt;
            enemy.hp -= dmg;
            enemy.hitTimer = 0.08;
            if (Math.random() < 0.2) {
              this.damageTexts.push(new DamageText(enemy.x, enemy.y, Math.round(dmg), '#ff0055', true));
            }
          }
        }
      }
    }

    // Update Grenades (Skill Q)
    for (let i = this.grenades.length - 1; i >= 0; i--) {
      const g = this.grenades[i];
      g.update(dt);
      if (g.exploded) {
        // Explosion!
        Sound.playExplosion();
        this.screenShake = 12;
        // Shockwave & fire particles
        this.particles.push(new Particle(g.x, g.y, 0, 0, 20, '#f97316', 0.4, 'ring'));
        for (let p = 0; p < 24; p++) {
          const angle = Math.random() * Math.PI * 2;
          const spd = 2 + Math.random() * 6;
          this.particles.push(
            new Particle(g.x, g.y, Math.cos(angle) * spd, Math.sin(angle) * spd, 12, 'rgba(249, 115, 22, 0.8)', 0.5, 'smoke')
          );
        }

        // Damage enemies in radius
        for (const enemy of this.enemies) {
          const dist = Math.hypot(enemy.x - g.x, enemy.y - g.y);
          if (dist <= g.radius + enemy.radius) {
            enemy.hp -= g.damage;
            enemy.hitTimer = 0.2;
            this.damageTexts.push(new DamageText(enemy.x, enemy.y, Math.round(g.damage), '#ff9800', true));
          }
        }
        this.grenades.splice(i, 1);
      }
    }

    // Update Projectiles
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.update(dt);

      // Hit boundary
      if (p.distance > p.maxDistance || p.x < -50 || p.x > this.canvas.width + 50 || p.y < -50 || p.y > this.canvas.height + 50) {
        this.projectiles.splice(i, 1);
        continue;
      }

      if (p.fromPlayer) {
        // Check hits against enemies
        for (const enemy of this.enemies) {
          if (p.hitEnemies.has(enemy)) continue;
          const dist = Math.hypot(p.x - enemy.x, p.y - enemy.y);
          if (dist < p.size + enemy.radius) {
            enemy.hp -= p.damage;
            enemy.hitTimer = 0.1;
            p.hitEnemies.add(enemy);

            Sound.playHit();
            this.damageTexts.push(new DamageText(enemy.x, enemy.y, p.damage, '#facc15'));

            // Sparks
            for (let s = 0; s < 3; s++) {
              this.particles.push(
                new Particle(p.x, p.y, (Math.random() - 0.5) * 4, (Math.random() - 0.5) * 4, 3, '#f59e0b', 0.2, 'spark')
              );
            }

            if (p.hitEnemies.size >= p.pierce) {
              this.projectiles.splice(i, 1);
              break;
            }
          }
        }
      } else {
        // Enemy projectile hitting player
        const dist = Math.hypot(p.x - this.player.x, p.y - this.player.y);
        if (dist < p.size + this.player.radius) {
          if (this.player.invulnerableTimer <= 0) {
            this.player.hp -= p.damage;
            this.player.invulnerableTimer = 0.3;
            this.screenShake = 8;
            Sound.playHit();
            this.player.say(Math.random() < 0.5 ? "아 시발 아파!" : "키 작다고 때리냐 ㅠㅠ", true);
            this.damageTexts.push(new DamageText(this.player.x, this.player.y, `-${p.damage}`, '#ef4444', true));
            if (this.player.hp <= 0) {
              this.gameOver();
            }
          }
          this.projectiles.splice(i, 1);
        }
      }
    }

    // Update Enemies & Collisions
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(dt, this.player, this.projectiles);

      // Check death
      if (enemy.hp <= 0) {
        this.kills++;
        this.score += enemy.xp * 10;

        // Lifesteal check
        if (Math.random() < this.player.lifesteal) {
          this.player.hp = Math.min(this.player.maxHp, this.player.hp + 10);
          this.damageTexts.push(new DamageText(this.player.x, this.player.y, '+10 HP', '#4ade80', true));
        }

        // Drop XP Gem
        this.expGems.push(new ExpGem(enemy.x, enemy.y, enemy.xp));

        // Death explosion particles
        for (let p = 0; p < 12; p++) {
          const spd = 2 + Math.random() * 4;
          const a = Math.random() * Math.PI * 2;
          this.particles.push(
            new Particle(enemy.x, enemy.y, Math.cos(a) * spd, Math.sin(a) * spd, 6, enemy.color, 0.4, 'spark')
          );
        }

        if (enemy.type === 'boss') {
          this.victory();
          return;
        }

        this.enemies.splice(i, 1);
        continue;
      }

      // Touch damage to player
      const dist = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
      if (dist < enemy.radius + this.player.radius) {
        if (this.player.invulnerableTimer <= 0) {
          this.player.hp -= enemy.damage;
          this.player.invulnerableTimer = 0.6;
          this.screenShake = 10;
          Sound.playHit();
          this.player.say(Math.random() < 0.5 ? "아 시발 아파!" : "오빠 키 작다고 치냐!", true);
          this.damageTexts.push(new DamageText(this.player.x, this.player.y, `-${enemy.damage}`, '#ef4444', true));
          if (this.player.hp <= 0) {
            this.gameOver();
            return;
          }
        }
      }
    }

    // Update Exp Gems
    for (let i = this.expGems.length - 1; i >= 0; i--) {
      const gem = this.expGems[i];
      gem.update(dt, this.player.x, this.player.y);
      const dist = Math.hypot(gem.x - this.player.x, gem.y - this.player.y);
      if (dist < this.player.radius + gem.radius) {
        this.addExp(gem.value);
        Sound.playPickup();
        this.expGems.splice(i, 1);
      } else if (gem.life <= 0) {
        this.expGems.splice(i, 1);
      }
    }

    // Update Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.update(dt);
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }

    // Update Damage Texts
    for (let i = this.damageTexts.length - 1; i >= 0; i--) {
      const t = this.damageTexts[i];
      t.update(dt);
      if (t.life <= 0) {
        this.damageTexts.splice(i, 1);
      }
    }

    // Screen Shake decay
    if (this.screenShake > 0) {
      this.screenShake -= dt * 25;
      if (this.screenShake < 0) this.screenShake = 0;
    }

    this.updateHUD();
  }

  draw() {
    this.ctx.save();

    // Clear Screen
    this.ctx.fillStyle = '#0d1117';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Apply Screen Shake
    if (this.screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * this.screenShake;
      const shakeY = (Math.random() - 0.5) * this.screenShake;
      this.ctx.translate(shakeX, shakeY);
    }

    // Draw Military Grid Background
    this.drawBackground();

    // Draw Exp Gems
    for (const gem of this.expGems) {
      gem.draw(this.ctx);
    }

    // Draw Particles (Background layer: Smoke)
    for (const p of this.particles) {
      if (p.type === 'smoke') p.draw(this.ctx);
    }

    // Draw Enemies
    for (const enemy of this.enemies) {
      enemy.draw(this.ctx);
    }

    // Draw Player
    this.player.draw(this.ctx);

    // Draw Hyper Smoke Laser (Skill R)
    if (this.player.isFiringLaser) {
      this.drawHyperLaser();
    }

    // Draw Projectiles
    for (const p of this.projectiles) {
      p.draw(this.ctx);
    }

    // Draw Grenades
    for (const g of this.grenades) {
      g.draw(this.ctx);
    }

    // Draw Particles (Foreground layer: Sparks, Rings)
    for (const p of this.particles) {
      if (p.type !== 'smoke') p.draw(this.ctx);
    }

    // Draw Damage Texts
    for (const dt of this.damageTexts) {
      dt.draw(this.ctx);
    }

    // Draw Crosshair at Mouse
    this.drawCrosshair();

    this.ctx.restore();
  }

  drawBackground() {
    const gridSize = 60;
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
    this.ctx.lineWidth = 1;

    for (let x = 0; x < this.canvas.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.canvas.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }

  drawHyperLaser() {
    const lx = this.player.x;
    const ly = this.player.y;
    const angle = this.player.aimAngle;
    const len = 1400;
    const endX = lx + Math.cos(angle) * len;
    const endY = ly + Math.sin(angle) * len;

    this.ctx.save();
    // Outer Beam Glow
    this.ctx.strokeStyle = 'rgba(255, 120, 0, 0.5)';
    this.ctx.lineWidth = 36 + Math.sin(Date.now() / 40) * 8;
    this.ctx.shadowColor = '#ff3d00';
    this.ctx.shadowBlur = 35;
    this.ctx.beginPath();
    this.ctx.moveTo(lx, ly);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    // Inner Core Beam
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.lineWidth = 14;
    this.ctx.shadowColor = '#ffff00';
    this.ctx.shadowBlur = 15;
    this.ctx.beginPath();
    this.ctx.moveTo(lx, ly);
    this.ctx.lineTo(endX, endY);
    this.ctx.stroke();

    this.ctx.restore();
  }

  drawCrosshair() {
    const x = this.mouse.x;
    const y = this.mouse.y;
    this.ctx.save();
    this.ctx.strokeStyle = '#ff9800';
    this.ctx.lineWidth = 1.5;

    // Outer Circle
    this.ctx.beginPath();
    this.ctx.arc(x, y, 14, 0, Math.PI * 2);
    this.ctx.stroke();

    // Center Cross
    const len = 20;
    this.ctx.beginPath();
    this.ctx.moveTo(x - len, y);
    this.ctx.lineTo(x + len, y);
    this.ctx.moveTo(x, y - len);
    this.ctx.lineTo(x, y + len);
    this.ctx.stroke();

    // Center Dot
    this.ctx.fillStyle = '#ff3d00';
    this.ctx.beginPath();
    this.ctx.arc(x, y, 2.5, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.restore();
  }
}

// Instantiate game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
  window.gameInstance = new Game();
});
