/* ==========================================================================
   🌸 치이카와 스트라이커: 토벌 대작전 (Chiikawa Striker) - Multi-Build Evolution Edition
   5000x5000 Super Open-World with 4 Treasure Sanctuaries & Diverse Skill Builds
   ========================================================================== */

// --- Settings & Save State Controller (LocalStorage) ---
class StorageManager {
  static KEY_RECORDS = 'chiikawa_striker_records_v2';
  static KEY_SETTINGS = 'chiikawa_striker_settings_v2';
  static KEY_COINS = 'chiikawa_striker_coins_v2';
  static KEY_TALENTS = 'chiikawa_striker_talents_v2';
  static KEY_QUESTS = 'chiikawa_striker_quests_v2';
  static KEY_MODE_RECORDS = 'chiikawa_striker_mode_records_v2';

  static QUEST_DEFS = [
    { id: 'q_bugs', name: '🐛 날벌레 소탕 작전', desc: '날벌레/풍뎅이 40마리 토벌', target: 40, reward: 80, icon: '🐛' },
    { id: 'q_midboss', name: '⚔️ 정예 몬스터 토벌', desc: '키메라/미드보스 4마리 토벌', target: 4, reward: 150, icon: '⚔️' },
    { id: 'q_ramen', name: '🍜 라멘집 단골 손님', desc: '라멘집 로에서 라멘 2회 이상 완식', target: 2, reward: 120, icon: '🍜' },
    { id: 'q_gacha', name: '🎰 행운의 도토리 뽑기', desc: '도토리 캡슐 자판기 2회 이상 뽑기', target: 2, reward: 100, icon: '🎰' },
    { id: 'q_spa', name: '♨️ 온천 힐링 마니아', desc: '치이카와 힐링 온천에서 150 HP 회복', target: 150, reward: 100, icon: '♨️' },
    { id: 'q_fever', name: '🔥 피버 타임 폭주', desc: '피버 타임 2회 이상 발동', target: 2, reward: 180, icon: '🔥' },
    { id: 'q_bossrush', name: '💀 보스 러시 제패', desc: '보스 러시 아레나 1회 클리어', target: 1, reward: 500, icon: '💀' },
    { id: 'q_endless', name: '♾️ 무한의 생존자', desc: '무한 모드에서 5분(300초) 이상 생존', target: 300, reward: 300, icon: '♾️' }
  ];

  static TALENT_DEFS = [
    { id: 'attack', name: '사스마타 예리화', icon: '🗡️', maxLevel: 5, costs: [40, 90, 180, 320, 500], desc: (lvl) => `기본 공격력 +${lvl * 6}% 증가` + (lvl < 5 ? ` (다음: +${(lvl+1)*6}%)` : ' (MAX)') },
    { id: 'health', name: '체력 단련', icon: '💖', maxLevel: 5, costs: [35, 80, 160, 280, 450], desc: (lvl) => `최대 체력 +${lvl * 16} 증가` + (lvl < 5 ? ` (다음: +${(lvl+1)*16})` : ' (MAX)') },
    { id: 'speed', name: '재빠른 발걸음', icon: '👟', maxLevel: 5, costs: [30, 70, 140, 240, 400], desc: (lvl) => `이동 속도 +${lvl * 4}% 증가` + (lvl < 5 ? ` (다음: +${(lvl+1)*4}%)` : ' (MAX)') },
    { id: 'magnet', name: '별사탕 자석', icon: '🧲', maxLevel: 5, costs: [25, 60, 120, 220, 360], desc: (lvl) => `아이템/EXP 자석 반경 +${lvl * 25}%` + (lvl < 5 ? ` (다음: +${(lvl+1)*25}%)` : ' (MAX)') },
    { id: 'crit', name: '급소 포착', icon: '🎯', maxLevel: 5, costs: [50, 110, 220, 380, 600], desc: (lvl) => `치명타율 +${lvl * 4}%, 치명배율 +${(lvl*0.15).toFixed(2)}x` + (lvl < 5 ? ' (다음 단계 상승)' : ' (MAX)') },
    { id: 'cooldown', name: '기합 충전', icon: '⏳', maxLevel: 5, costs: [45, 100, 200, 350, 550], desc: (lvl) => `모든 스킬 쿨타임 -${lvl * 4}% 단축` + (lvl < 5 ? ` (다음: -${(lvl+1)*4}%)` : ' (MAX)') },
    { id: 'greed', name: '노동 보수 인상', icon: '🪙', maxLevel: 5, costs: [40, 90, 180, 300, 500], desc: (lvl) => `토벌 코인 획득량 +${lvl * 12}%` + (lvl < 5 ? ` (다음: +${(lvl+1)*12}%)` : ' (MAX)') },
    { id: 'revive', name: '기적의 도시락', icon: '👼', maxLevel: 5, costs: [80, 180, 350, 600, 1000], desc: (lvl) => lvl === 0 ? '사망 시 1회 20% 체력으로 무료 부활' : `사망 시 1회 ${lvl * 20}% 체력으로 부활` + (lvl < 5 ? ` (다음: ${(lvl+1)*20}%)` : ' (MAX)') }
  ];

  static getRecords() {
    try {
      const data = localStorage.getItem(this.KEY_RECORDS);
      return data ? JSON.parse(data) : { bestScore: 0, maxKills: 0, bestWave: 1, clearedDiffs: [] };
    } catch (e) {
      return { bestScore: 0, maxKills: 0, bestWave: 1, clearedDiffs: [] };
    }
  }

  static getModeRecords() {
    try {
      const data = localStorage.getItem(this.KEY_MODE_RECORDS);
      return data ? JSON.parse(data) : {
        endless: { bestTime: 0, bestKills: 0, bestWave: 1 },
        bossrush: { cleared: false, bestTime: 0 }
      };
    } catch (e) {
      return { endless: { bestTime: 0, bestKills: 0, bestWave: 1 }, bossrush: { cleared: false, bestTime: 0 } };
    }
  }

  static saveModeRecords(mode, stats) {
    try {
      const rec = this.getModeRecords();
      if (mode === 'endless') {
        if (stats.time > rec.endless.bestTime) rec.endless.bestTime = stats.time;
        if (stats.kills > rec.endless.bestKills) rec.endless.bestKills = stats.kills;
        if (stats.wave > rec.endless.bestWave) rec.endless.bestWave = stats.wave;
      } else if (mode === 'bossrush') {
        if (stats.cleared) {
          rec.bossrush.cleared = true;
          if (rec.bossrush.bestTime === 0 || stats.time < rec.bossrush.bestTime) {
            rec.bossrush.bestTime = stats.time;
          }
        }
      }
      localStorage.setItem(this.KEY_MODE_RECORDS, JSON.stringify(rec));
      return rec;
    } catch (e) {
      return null;
    }
  }

  static getQuests() {
    try {
      const data = localStorage.getItem(this.KEY_QUESTS);
      const parsed = data ? JSON.parse(data) : {};
      const result = {};
      this.QUEST_DEFS.forEach(q => {
        result[q.id] = parsed[q.id] || { progress: 0, claimed: false };
      });
      return result;
    } catch (e) {
      const result = {};
      this.QUEST_DEFS.forEach(q => {
        result[q.id] = { progress: 0, claimed: false };
      });
      return result;
    }
  }

  static updateQuestProgress(questId, amount = 1) {
    try {
      const quests = this.getQuests();
      if (quests[questId] && !quests[questId].claimed) {
        const def = this.QUEST_DEFS.find(d => d.id === questId);
        if (def) {
          quests[questId].progress = Math.min(def.target, (quests[questId].progress || 0) + amount);
          localStorage.setItem(this.KEY_QUESTS, JSON.stringify(quests));
        }
      }
      return quests;
    } catch (e) {
      return null;
    }
  }

  static claimQuest(questId) {
    try {
      const quests = this.getQuests();
      const def = this.QUEST_DEFS.find(d => d.id === questId);
      if (quests[questId] && !quests[questId].claimed && def && quests[questId].progress >= def.target) {
        quests[questId].claimed = true;
        localStorage.setItem(this.KEY_QUESTS, JSON.stringify(quests));
        this.addCoins(def.reward);
        return { success: true, reward: def.reward, newCoins: this.getCoins() };
      }
      return { success: false };
    } catch (e) {
      return { success: false };
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
      if (data) {
        const parsed = JSON.parse(data);
        return {
          bgmVol: parsed.bgmVol !== undefined ? parsed.bgmVol : 0.8,
          sfxVol: parsed.sfxVol !== undefined ? parsed.sfxVol : 0.9,
          screenShake: parsed.screenShake === true, // default off unless explicitly on
          damageText: parsed.damageText !== false,
          highParticles: parsed.highParticles !== false,
          touchControls: parsed.touchControls !== false
        };
      }
      return {
        bgmVol: 0.8,
        sfxVol: 0.9,
        screenShake: false,
        damageText: true,
        highParticles: true,
        touchControls: true
      };
    } catch (e) {
      return { bgmVol: 0.8, sfxVol: 0.9, screenShake: false, damageText: true, highParticles: true, touchControls: true };
    }
  }

  static saveSettings(settings) {
    try {
      localStorage.setItem(this.KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {}
  }

  static getCoins() {
    try {
      const v = localStorage.getItem(this.KEY_COINS);
      return v ? parseInt(v, 10) || 0 : 0;
    } catch (e) {
      return 0;
    }
  }

  static addCoins(amount) {
    try {
      const cur = this.getCoins();
      const updated = cur + Math.max(0, Math.round(amount));
      localStorage.setItem(this.KEY_COINS, updated.toString());
      return updated;
    } catch (e) {
      return 0;
    }
  }

  static spendCoins(amount) {
    try {
      const cur = this.getCoins();
      if (cur >= amount) {
        localStorage.setItem(this.KEY_COINS, (cur - amount).toString());
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  static getTalents() {
    try {
      const data = localStorage.getItem(this.KEY_TALENTS);
      const defaults = { attack: 0, health: 0, speed: 0, magnet: 0, crit: 0, cooldown: 0, greed: 0, revive: 0 };
      if (!data) return defaults;
      return { ...defaults, ...JSON.parse(data) };
    } catch (e) {
      return { attack: 0, health: 0, speed: 0, magnet: 0, crit: 0, cooldown: 0, greed: 0, revive: 0 };
    }
  }

  static saveTalents(talents) {
    try {
      localStorage.setItem(this.KEY_TALENTS, JSON.stringify(talents));
    } catch (e) {}
  }

  static upgradeTalent(talentId) {
    const talents = this.getTalents();
    const def = this.TALENT_DEFS.find(t => t.id === talentId);
    if (!def) return { success: false, reason: 'invalid_talent' };

    const currentLvl = talents[talentId] || 0;
    if (currentLvl >= def.maxLevel) return { success: false, reason: 'max_level' };

    const cost = def.costs[currentLvl];
    if (this.spendCoins(cost)) {
      talents[talentId] = currentLvl + 1;
      this.saveTalents(talents);
      return { success: true, newLevel: talents[talentId], cost };
    } else {
      return { success: false, reason: 'not_enough_coins' };
    }
  }

  static resetTalents() {
    const talents = this.getTalents();
    let totalRefund = 0;
    this.TALENT_DEFS.forEach(def => {
      const lvl = talents[def.id] || 0;
      for (let i = 0; i < lvl; i++) {
        totalRefund += def.costs[i] || 0;
      }
    });

    const resetObj = { attack: 0, health: 0, speed: 0, magnet: 0, crit: 0, cooldown: 0, greed: 0, revive: 0 };
    this.saveTalents(resetObj);
    this.addCoins(totalRefund);
    return { refunded: totalRefund, newTotalCoins: this.getCoins() };
  }

  static getWeedingGrade() {
    const talents = this.getTalents();
    let totalPoints = 0;
    Object.values(talents).forEach(v => { totalPoints += (v || 0); });

    if (totalPoints >= 20) {
      return { rank: 1, name: '👑 제초 1급 (전설의 마스터 제초사)', points: totalPoints, targetPoints: 20, nextPoints: 0, isMax: true, bonus: '기본 체력 +50 & 게임 시작 시 100 코인 지급' };
    } else if (totalPoints >= 15) {
      return { rank: 2, name: '📜 제초 2급 (수석 제초원)', points: totalPoints, targetPoints: 20, nextPoints: 20 - totalPoints, isMax: false, bonus: '모든 스킬 쿨타임 -8% 추가 단축' };
    } else if (totalPoints >= 10) {
      return { rank: 3, name: '📜 제초 3급 (전문 제초원)', points: totalPoints, targetPoints: 15, nextPoints: 15 - totalPoints, isMax: false, bonus: '모든 공격력 +10% 추가 증가' };
    } else if (totalPoints >= 5) {
      return { rank: 4, name: '📜 제초 4급 (숙련 제초원)', points: totalPoints, targetPoints: 10, nextPoints: 10 - totalPoints, isMax: false, bonus: '모든 경험치 획득량 +12% 증가' };
    } else {
      return { rank: 5, name: '📜 제초 5급 (수습 제초원)', points: totalPoints, targetPoints: 5, nextPoints: 5 - totalPoints, isMax: false, bonus: '기초 스탯 단련 중' };
    }
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

    // Iconic Official Chiikawa BGM Tracks (Procedural Chiptune Synthesizer)
    this.tracks = [
      {
        id: 'pajamas',
        name: '👚 파자마 파티즈의 노래 (Pajama Parties)',
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

  playLightning() {
    try {
      if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(980, now);
      osc.frequency.exponentialRampToValueAtTime(120, now + 0.18);
      gain.gain.setValueAtTime(0.25 * this.sfxVolume, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.18);
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
      } else if (charType === 'kurimanju') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(340, now);
        osc.frequency.linearRampToValueAtTime(180, now + 0.14);
      } else if (charType === 'momonga') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.linearRampToValueAtTime(1320, now + 0.08);
      } else if (charType === 'rakko') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(580, now + 0.09);
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

  playWeedPop() {
    if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.09);
    gain.gain.setValueAtTime(0.22 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.09);
  }

  playCoin() {
    if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(987.77, now);
    osc.frequency.setValueAtTime(1318.51, now + 0.06);
    gain.gain.setValueAtTime(0.18 * this.sfxVolume, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.18);
  }

  playUpgrade() {
    if (!this.sfxEnabled || !this.ctx || this.sfxVolume <= 0) return;
    const notes = [440, 554.37, 659.25, 880];
    notes.forEach((freq, idx) => {
      const t = this.ctx.currentTime + idx * 0.06;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.22 * this.sfxVolume, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
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

  setBgmVolume(vol) {
    this.bgmVolume = vol;
  }

  setTrack(index) {
    this.currentTrackIdx = Math.max(0, Math.min(this.tracks.length - 1, index));
    this.step = 0;
    if (this.bgmPlaying) {
      if (this.bgmTimer) clearTimeout(this.bgmTimer);
      this.scheduleBGMStep();
    }
    return this.getCurrentTrack();
  }

  getCurrentTrack() {
    return this.tracks[this.currentTrackIdx];
  }

  switchNextTrack() {
    this.currentTrackIdx = (this.currentTrackIdx + 1) % this.tracks.length;
    this.step = 0;
    if (this.bgmPlaying) {
      if (this.bgmTimer) clearTimeout(this.bgmTimer);
      this.scheduleBGMStep();
    }
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

// --- Ancient Underground Dungeon Portal (고대 지하 던전 차원문) ---
class DungeonPortal {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 48;
    this.interactRadius = 90;
    this.rotation = 0;
    this.pulse = 0;
    this.isActive = true;
    this.life = 140.0; // Stays open for 140 seconds
  }

  update(dt, particles) {
    this.rotation += dt * 3.2;
    this.pulse += dt * 4.5;
    this.life -= dt;

    // Swirling magical rune particles
    if (Math.random() < 0.4) {
      const angle = Math.random() * Math.PI * 2;
      const r = 24 + Math.random() * 32;
      const px = this.x + Math.cos(angle) * r;
      const py = this.y + Math.sin(angle) * r;
      particles.push(new Particle(px, py, -Math.sin(angle) * 2.2, Math.cos(angle) * 2.2, 5.5, '#c084fc', 0.4, 'star'));
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Glowing Ambient Aura
    const p = Math.sin(this.pulse) * 5;
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, this.radius + p + 16);
    grad.addColorStop(0, 'rgba(168, 85, 247, 0.95)');
    grad.addColorStop(0.45, 'rgba(192, 132, 252, 0.55)');
    grad.addColorStop(1, 'rgba(147, 51, 234, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + p + 16, 0, Math.PI * 2);
    ctx.fill();

    // Swirling Rune Rings
    ctx.rotate(this.rotation);
    ctx.strokeStyle = '#facc15';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const a = (i * Math.PI) / 2;
      ctx.arc(0, 0, this.radius - 8, a, a + Math.PI / 3);
    }
    ctx.stroke();

    ctx.rotate(-this.rotation * 2.2);
    ctx.strokeStyle = '#e879f9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 0.65, 0, Math.PI * 2);
    ctx.stroke();

    // Center Abyss Eye & Emoji
    ctx.rotate(this.rotation * 1.2);
    ctx.font = '28px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🌀', 0, 0);

    // Banner Label
    ctx.font = 'bold 13px "Jua", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#6b21a8';
    ctx.shadowBlur = 6;
    ctx.fillText('🏛️ 고대 지하 던전 [E]', 0, -this.radius - 16);

    ctx.restore();
  }
}

// --- Sanctuary Zone Definition ---
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

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px "Jua", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${this.icon} ${this.name}`, this.x, this.y - this.radius + 35);

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

// --- Interactive Field Weed Patch (제초 검정 필드 잡초) ---
class WeedPatch {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 26;
    this.isHarvested = false;
    this.respawnTimer = 0;
    this.bob = Math.random() * Math.PI * 2;
    this.weedType = Math.random() < 0.35 ? '🌾' : (Math.random() < 0.7 ? '🌱' : '🌿');
  }

  update(dt, player, game) {
    this.bob += dt * 3.5;
    if (this.isHarvested) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) {
        this.isHarvested = false;
        for (let i = 0; i < 4; i++) {
          game.particles.push(new Particle(this.x, this.y, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, 5, '#86efac', 0.4, 'sparkle'));
        }
      }
      return;
    }

    const dist = Math.hypot(player.x - this.x, player.y - this.y);
    if (dist < this.radius + player.radius) {
      this.harvest(game, player);
    }
  }

  harvest(game, player) {
    if (this.isHarvested) return;
    this.isHarvested = true;
    this.respawnTimer = 35 + Math.random() * 25;

    Sound.playWeedPop();
    const baseCoins = 6 + Math.floor(Math.random() * 8);
    const earned = game.addSessionCoins(baseCoins);

    // Drop EXP Gem
    game.expGems.push(new ExpGem(this.x, this.y, 25));

    // Floating UI text
    game.damageTexts.push(new DamageText(this.x, this.y - 25, `🌱 제초 성공! (+${earned} 🪙)`, '#10b981', true));

    // Leaf / green particles
    for (let i = 0; i < 9; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 4;
      game.particles.push(new Particle(this.x, this.y, Math.cos(a) * spd, Math.sin(a) * spd, 6, '#22c55e', 0.45, 'sparkle'));
    }

    if (Math.random() < 0.28) {
      const quote = player.charType === 'usagi' ? "우뺘-! 풀 뽑았다!" : (player.charType === 'hachiware' ? "잡초 뽑기 알바 완료!" : "와아... 깨끗해졌다!");
      player.say(quote, false);
    }
  }

  draw(ctx) {
    if (this.isHarvested) {
      ctx.save();
      ctx.fillStyle = 'rgba(101, 163, 13, 0.18)';
      ctx.beginPath();
      ctx.arc(this.x, this.y, 14, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      return;
    }

    const yOff = Math.sin(this.bob) * 3;
    ctx.save();
    ctx.translate(this.x, this.y + yOff);

    // Cute green grass aura
    ctx.fillStyle = 'rgba(134, 239, 172, 0.28)';
    ctx.shadowColor = '#86efac';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '26px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.weedType, 0, 0);

    ctx.font = 'bold 11px "Jua", sans-serif';
    ctx.fillStyle = '#15803d';
    ctx.shadowBlur = 0;
    ctx.fillText('🌱 제초 구역', 0, 20);

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
    } else if (this.type === 'star' || this.type === 'sparkle' || this.type === 'lightning') {
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
    } else if (this.type === 'lightning') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 3;
      ctx.shadowColor = '#fef08a';
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.moveTo(-6, -12); ctx.lineTo(2, -2); ctx.lineTo(-3, 2); ctx.lineTo(6, 12);
      ctx.stroke();
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
    this.x = x + (Math.random() * 24 - 12);
    this.y = y - 10;
    this.text = text;
    this.color = color;
    this.isCrit = isCrit;
    this.life = isCrit ? 1.05 : 0.85;
    this.maxLife = this.life;
    this.vx = (Math.random() - 0.5) * 1.8;
    this.vy = isCrit ? -3.8 : -2.4;
    this.gravity = 4.2;
    this.scale = isCrit ? 1.55 : 1.25;
  }

  update(dt) {
    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;
    this.vy += this.gravity * dt;
    this.life -= dt;
    if (this.scale > 1.0) {
      this.scale = Math.max(1.0, this.scale - dt * 2.8);
    }
  }

  draw(ctx) {
    const alpha = Math.max(0, this.life / this.maxLife);
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);

    ctx.font = this.isCrit ? '900 24px "Jua", "Noto Sans KR"' : 'bold 16px "Jua", "Noto Sans KR"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Dark outline for crystal clarity
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = this.isCrit ? 5 : 3.5;
    ctx.strokeText(this.text, 0, 0);

    // Glowing fill
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.isCrit ? '#facc15' : this.color;
    ctx.shadowBlur = this.isCrit ? 12 : 6;
    ctx.fillText(this.text, 0, 0);

    ctx.restore();
  }
}

class ExpGem {
  constructor(x, y, value = 20) {
    this.x = x + (Math.random() * 18 - 9);
    this.y = y + (Math.random() * 18 - 9);
    this.value = value;
    this.radius = value >= 100 ? 13 : (value >= 50 ? 10 : 7.5);
    this.life = 60.0;
    this.color = value >= 100 ? '#facc15' : (value >= 50 ? '#38bdf8' : '#ec4899');
    this.sparkleTimer = Math.random() * Math.PI * 2;
    this.vx = (Math.random() - 0.5) * 2.4;
    this.vy = (Math.random() - 0.5) * 2.4;
  }

  update(dt, playerX, playerY, magnetMult = 1.0) {
    this.life -= dt;
    this.sparkleTimer += dt * 5.5;

    // Scatter friction
    this.vx *= 0.90;
    this.vy *= 0.90;
    this.x += this.vx * dt * 60;
    this.y += this.vy * dt * 60;

    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const dist = Math.hypot(dx, dy);
    const pullRadius = 260 * magnetMult;

    if (dist < pullRadius) {
      const intensity = Math.min(1.0, (pullRadius - dist) / pullRadius);
      const pullSpeed = (10.5 + intensity * 20.0) * Math.max(1.0, magnetMult * 0.9);
      this.x += (dx / dist) * pullSpeed * dt * 60;
      this.y += (dy / dist) * pullSpeed * dt * 60;
    }
  }

  draw(ctx) {
    const pulse = Math.sin(this.sparkleTimer) * 1.8;
    ctx.save();
    ctx.translate(this.x, this.y);

    // Soft mini drop shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
    ctx.beginPath();
    ctx.ellipse(0, this.radius + 2, this.radius * 0.8, this.radius * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Star Konpeito Candy shape
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    for (let i = 0; i < 5; i++) {
      const outerR = this.radius + pulse;
      const innerR = (this.radius + pulse) * 0.48;
      ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * outerR, -Math.sin((18 + i * 72) * Math.PI / 180) * outerR);
      ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * innerR, -Math.sin((54 + i * 72) * Math.PI / 180) * innerR);
    }
    ctx.closePath();
    ctx.fill();

    // Center sparkling core
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * 0.35, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

class LightningBolt {
  constructor(startX, startY, endX, endY, color = '#facc15', width = 6) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.color = color;
    this.width = width;
    this.life = 0.28;
    this.maxLife = 0.28;
    this.segments = [];
    this.generateSegments();
  }

  generateSegments() {
    const dist = Math.hypot(this.endX - this.startX, this.endY - this.startY);
    const steps = Math.max(5, Math.floor(dist / 26));
    let curX = this.startX;
    let curY = this.startY;
    this.segments.push({ x: curX, y: curY });
    for (let i = 1; i < steps; i++) {
      const t = i / steps;
      const targetX = this.startX + (this.endX - this.startX) * t;
      const targetY = this.startY + (this.endY - this.startY) * t;
      const jitter = (Math.random() - 0.5) * 36;
      curX = targetX + jitter;
      curY = targetY + (Math.random() - 0.5) * 20;
      this.segments.push({ x: curX, y: curY });
    }
    this.segments.push({ x: this.endX, y: this.endY });
  }

  update(dt) {
    this.life -= dt;
  }

  draw(ctx) {
    if (this.life <= 0 || this.segments.length < 2) return;
    const alpha = Math.max(0, this.life / this.maxLife) * 0.85;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = Math.min(5, this.width * (0.6 + alpha * 0.6));
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.moveTo(this.segments[0].x, this.segments[0].y);
    for (let i = 1; i < this.segments.length; i++) {
      ctx.lineTo(this.segments[i].x, this.segments[i].y);
    }
    ctx.stroke();

    // Bright White Core
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    ctx.restore();
  }
}

class SlashWave {
  constructor(x, y, angle, radius = 220, color = '#38bdf8') {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.radius = radius;
    this.color = color;
    this.life = 0.32;
    this.maxLife = 0.32;
  }

  update(dt) {
    this.life -= dt;
  }

  draw(ctx) {
    if (this.life <= 0) return;
    const alpha = Math.max(0, this.life / this.maxLife) * 0.65;
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 6;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 16;

    ctx.beginPath();
    ctx.arc(0, 0, this.radius * (1.2 - alpha * 0.2), -Math.PI / 2.8, Math.PI / 2.8);
    ctx.stroke();

    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius * (1.2 - alpha * 0.2), -Math.PI / 3.4, Math.PI / 3.4);
    ctx.stroke();

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
    const alpha = Math.max(0, this.life / this.maxLife) * 0.55;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 3.5;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
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

  update(dt, playerX, playerY, magnetMult = 1.0) {
    this.life -= dt;
    this.bobTimer += dt * 4;

    const dx = playerX - this.x;
    const dy = playerY - this.y;
    const dist = Math.hypot(dx, dy);
    const pullRadius = 160 * magnetMult;
    if (dist < pullRadius) {
      const spd = 5.5 * Math.max(1, magnetMult * 0.7);
      this.x += (dx / dist) * spd * dt * 60;
      this.y += (dy / dist) * spd * dt * 60;
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

// --- 🎁 Event Entities (Random Field Events) ---
class AirdropCrate {
  constructor(x, y) {
    this.targetX = x;
    this.targetY = y;
    this.x = x;
    this.y = y - 350;
    this.radius = 24;
    this.progress = 0;
    this.landed = false;
    this.opened = false;
    this.life = 40.0;
    this.bob = 0;
  }

  update(dt, player, game) {
    if (!this.landed) {
      this.progress += dt * 0.85;
      this.y = (this.targetY - 350) + 350 * Math.min(1.0, this.progress);
      if (this.progress >= 1.0) {
        this.landed = true;
        this.y = this.targetY;
        Sound.playExplosion();
        for (let i = 0; i < 16; i++) {
          const a = Math.random() * Math.PI * 2;
          const spd = 2 + Math.random() * 5;
          game.particles.push(new Particle(this.x, this.y, Math.cos(a) * spd, Math.sin(a) * spd, 6, '#facc15', 0.4, 'star'));
        }
      }
    } else {
      this.life -= dt;
      this.bob += dt * 3;
      const d = Math.hypot(player.x - this.x, player.y - this.y);
      if (d < this.radius + player.radius && !this.opened) {
        this.open(player, game);
      }
    }
  }

  open(player, game) {
    this.opened = true;
    Sound.playRelicFanfare();
    player.hp = player.maxHp;
    player.isTearShieldActive = true;
    player.tearShieldTimer = 8.0;
    player.hasShield = true;
    game.addSessionCoins(100);

    // 3 Large Rainbow XP gems
    for (let i = -1; i <= 1; i++) {
      game.expGems.push(new ExpGem(this.x + i * 35, this.y + (Math.random() - 0.5) * 20, 150));
    }
    game.damageTexts.push(new DamageText(this.x, this.y - 45, '🎁 특급 디저트 보급함 개방! (완치 & 별빛무적 & 100🪙)', '#facc15', true));

    for (let i = 0; i < 28; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 3 + Math.random() * 7;
      game.particles.push(new Particle(this.x, this.y, Math.cos(a) * spd, Math.sin(a) * spd, 7, '#f472b6', 0.6, 'heart'));
      game.particles.push(new Particle(this.x, this.y, Math.cos(a) * spd * 0.8, Math.sin(a) * spd * 0.8, 6, '#facc15', 0.5, 'star'));
    }
  }

  draw(ctx) {
    if (this.opened) return;
    ctx.save();

    // Beacon Beam
    if (this.landed) {
      const beaconGrad = ctx.createLinearGradient(this.x, this.y - 500, this.x, this.y);
      beaconGrad.addColorStop(0, 'rgba(250, 204, 21, 0)');
      beaconGrad.addColorStop(0.7, 'rgba(250, 204, 21, 0.12)');
      beaconGrad.addColorStop(1, 'rgba(250, 204, 21, 0.35)');
      ctx.fillStyle = beaconGrad;
      ctx.fillRect(this.x - 16, this.y - 500, 32, 500);

      ctx.strokeStyle = 'rgba(250, 204, 21, 0.5)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius + 10 + Math.sin(this.bob) * 3, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.translate(this.x, this.y);

    // Parachute
    if (!this.landed) {
      ctx.fillStyle = 'rgba(244, 114, 182, 0.85)';
      ctx.beginPath();
      ctx.arc(0, -32, 26, Math.PI, 0);
      ctx.closePath();
      ctx.fill();

      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-22, -32); ctx.lineTo(0, -4);
      ctx.moveTo(0, -58); ctx.lineTo(0, -4);
      ctx.moveTo(22, -32); ctx.lineTo(0, -4);
      ctx.stroke();
    }

    // Gift Crate
    ctx.shadowColor = '#facc15';
    ctx.shadowBlur = 10;
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(-this.radius, -this.radius, this.radius * 2, this.radius * 2);

    ctx.fillStyle = '#ef4444';
    ctx.fillRect(-this.radius, -3.5, this.radius * 2, 7);
    ctx.fillRect(-3.5, -this.radius, 7, this.radius * 2);

    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🎁', 0, 0);

    ctx.restore();
  }
}

class FestivalBalloon {
  constructor(x, y, colorIndex = 0) {
    this.x = x;
    this.y = y;
    this.radius = 20;
    this.colors = ['#f472b6', '#38bdf8', '#facc15', '#a855f7', '#4ade80', '#fb923c', '#e879f9'];
    this.color = this.colors[colorIndex % this.colors.length];
    this.vx = (Math.random() - 0.5) * 1.8;
    this.vy = -0.6 - Math.random() * 0.8;
    this.bob = Math.random() * Math.PI * 2;
    this.popped = false;
    this.life = 25.0;
  }

  update(dt, player, projectiles, game) {
    this.life -= dt;
    this.bob += dt * 3;
    this.x += (this.vx + Math.sin(this.bob) * 0.8) * dt * 60;
    this.y += this.vy * dt * 60;

    // Check collision with player
    const pd = Math.hypot(player.x - this.x, player.y - this.y);
    if (pd < this.radius + player.radius) {
      this.pop(game);
      return;
    }

    // Check collision with projectiles
    for (let p of projectiles) {
      if (!p.fromPlayer) continue;
      const d = Math.hypot(p.x - this.x, p.y - this.y);
      if (d < this.radius + p.size) {
        this.pop(game);
        return;
      }
    }
  }

  pop(game) {
    if (this.popped) return;
    this.popped = true;
    Sound.playHit();
    game.addSessionCoins(10 + Math.floor(Math.random() * 15));
    game.expGems.push(new ExpGem(this.x, this.y, 60));
    game.damageTexts.push(new DamageText(this.x, this.y - 25, '🎈 팡! +EXP & 🪙', this.color, true));

    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 5;
      game.particles.push(new Particle(this.x, this.y, Math.cos(a) * spd, Math.sin(a) * spd, 6, this.color, 0.45, 'star'));
    }
  }

  draw(ctx) {
    if (this.popped) return;
    ctx.save();
    ctx.translate(this.x, this.y);

    // String
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(0, this.radius);
    ctx.quadraticCurveTo(Math.sin(this.bob) * 5, this.radius + 8, 0, this.radius + 18);
    ctx.stroke();

    // Balloon Body
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.ellipse(0, 0, this.radius, this.radius * 1.2, 0, 0, Math.PI * 2);
    ctx.fill();

    // Highlight
    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.beginPath();
    ctx.arc(-this.radius * 0.35, -this.radius * 0.4, 3.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

// --- 🌟 World Landmark Entities (Stage 3) ---

// 1. 🍜 Ramen Shop "Ro (郎)" Stall
class RamenShop {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 45;
    this.interactRadius = 110;
    this.steamTimer = 0;
    this.lanternBob = 0;
  }

  update(dt, particles) {
    this.steamTimer += dt;
    this.lanternBob += dt * 3;
    if (this.steamTimer >= 0.25) {
      this.steamTimer = 0;
      particles.push(new Particle(this.x + (Math.random() * 24 - 12), this.y - 35, (Math.random() - 0.5) * 1.5, -1.8 - Math.random(), 8, '#fed7aa', 0.6, 'smoke'));
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Warm Ambient Light Glow
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 120);
    grad.addColorStop(0, 'rgba(251, 146, 60, 0.35)');
    grad.addColorStop(1, 'rgba(251, 146, 60, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 120, 0, Math.PI * 2);
    ctx.fill();

    // Wooden Stall Base
    ctx.fillStyle = '#78350f';
    ctx.fillRect(-45, -15, 90, 45);
    ctx.fillStyle = '#b45309';
    ctx.fillRect(-42, -12, 84, 18);

    // Stall Counter & Noren Curtain
    ctx.fillStyle = '#ea580c';
    ctx.fillRect(-48, -40, 96, 22);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px "Jua", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍜 郎 (RO)', 0, -25);

    // Red Lanterns with bob
    const lBob = Math.sin(this.lanternBob) * 3;
    ctx.font = '22px sans-serif';
    ctx.fillText('🏮', -42, -10 + lBob);
    ctx.fillText('🏮', 42, -10 + lBob);

    // Master NPC Emoji
    ctx.font = '24px sans-serif';
    ctx.fillText('👨‍🍳', 0, 5);

    // Interaction hint above
    ctx.font = 'bold 12px "Jua", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#000000';
    ctx.shadowBlur = 4;
    ctx.fillText('🍜 라멘집 [로]', 0, -48);

    ctx.restore();
  }
}

// 2. ♨️ Healing Hot Spring Pool
class HotSpring {
  constructor(x, y, radius = 150) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.ripple = 0;
    this.steamTimer = 0;
    this.healCooldown = 0;
  }

  update(dt, player, damageTexts, particles) {
    this.ripple += dt * 2.5;
    this.steamTimer += dt;
    if (this.steamTimer >= 0.18) {
      this.steamTimer = 0;
      const rx = this.x + (Math.random() * this.radius * 1.4 - this.radius * 0.7);
      const ry = this.y + (Math.random() * this.radius * 1.4 - this.radius * 0.7);
      particles.push(new Particle(rx, ry, (Math.random() - 0.5) * 1.5, -2 - Math.random() * 1.5, 7, '#bae6fd', 0.7, 'smoke'));
    }

    // Player inside hot spring
    const dist = Math.hypot(player.x - this.x, player.y - this.y);
    if (dist < this.radius) {
      this.healCooldown += dt;
      if (this.healCooldown >= 0.5) {
        this.healCooldown = 0;
        if (player.hp < player.maxHp) {
          player.hp = Math.min(player.maxHp, player.hp + 8);
          StorageManager.updateQuestProgress('q_spa', 8);
          damageTexts.push(new DamageText(player.x, player.y - 25, '♨️ +8 HP 힐링!', '#38bdf8', false));
          particles.push(new Particle(player.x, player.y, (Math.random() - 0.5) * 3, -2, 6, '#ec4899', 0.4, 'sparkle'));
        }
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Outer Stone Rim
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 14;
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Hot Spring Turquoise Water Gradient
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, this.radius);
    grad.addColorStop(0, 'rgba(186, 230, 253, 0.85)');
    grad.addColorStop(0.7, 'rgba(56, 189, 248, 0.75)');
    grad.addColorStop(1, 'rgba(2, 132, 199, 0.9)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius - 6, 0, Math.PI * 2);
    ctx.fill();

    // Water Ripples
    const r1 = (Math.sin(this.ripple) * 0.5 + 0.5) * (this.radius * 0.75);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, r1, 0, Math.PI * 2);
    ctx.stroke();

    // Center Hot Spring Icon
    ctx.font = '36px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('♨️', 0, 0);

    // Title
    ctx.font = 'bold 14px "Jua", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#0369a1';
    ctx.shadowBlur = 6;
    ctx.fillText('♨️ 치이카와 힐링 온천 (초당 HP 회복)', 0, this.radius + 24);

    ctx.restore();
  }
}

// 3. 🎰 Lucky Gacha Vending Machine
class GachaMachine {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 35;
    this.interactRadius = 100;
    this.sparkleTimer = 0;
  }

  update(dt, particles) {
    this.sparkleTimer += dt;
    if (this.sparkleTimer >= 0.4) {
      this.sparkleTimer = 0;
      particles.push(new Particle(this.x + (Math.random() * 40 - 20), this.y - 30, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 6, '#c084fc', 0.4, 'sparkle'));
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Ambient Purple Glow
    const grad = ctx.createRadialGradient(0, 0, 10, 0, 0, 90);
    grad.addColorStop(0, 'rgba(168, 85, 247, 0.3)');
    grad.addColorStop(1, 'rgba(168, 85, 247, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, 90, 0, Math.PI * 2);
    ctx.fill();

    // Vending Machine Stand Base
    ctx.fillStyle = '#7e22ce';
    ctx.fillRect(-24, 0, 48, 32);
    ctx.fillStyle = '#9333ea';
    ctx.fillRect(-20, 4, 40, 24);

    // Glass Globe Dome
    ctx.fillStyle = 'rgba(243, 232, 255, 0.9)';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(0, -16, 26, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Little Capsules inside
    ctx.font = '14px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🔴', -8, -20);
    ctx.fillText('🟡', 8, -20);
    ctx.fillText('🔵', 0, -8);

    // Banner Title
    ctx.font = 'bold 12px "Jua", sans-serif';
    ctx.fillStyle = '#ffffff';
    ctx.shadowColor = '#6b21a8';
    ctx.shadowBlur = 5;
    ctx.fillText('🎰 캡슐 자판기 [20🪙]', 0, -48);

    ctx.restore();
  }
}

// --- Sub-Weapon & Active Build Entities ---

// 1. 🔥 Fire Napalm Mine Entity
class FireMine {
  constructor(x, y, damage = 220) {
    this.x = x;
    this.y = y;
    this.damage = damage;
    this.radius = 16;
    this.triggerRadius = 42;
    this.exploded = false;
    this.life = 25.0;
  }

  update(dt, enemies, particles, damageTexts) {
    this.life -= dt;
    for (let e of enemies) {
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d < this.triggerRadius + e.radius) {
        this.explode(enemies, particles, damageTexts);
        break;
      }
    }
  }

  explode(enemies, particles, damageTexts) {
    this.exploded = true;
    Sound.playExplosion();
    particles.push(new Particle(this.x, this.y, 0, 0, 110, '#ef4444', 0.4, 'ring'));
    for (let i = 0; i < 14; i++) {
      const a = Math.random() * Math.PI * 2;
      const spd = 2 + Math.random() * 5;
      particles.push(new Particle(this.x, this.y, Math.cos(a) * spd, Math.sin(a) * spd, 6, '#f97316', 0.45, 'star'));
    }

    enemies.forEach(e => {
      const d = Math.hypot(e.x - this.x, e.y - this.y);
      if (d < 110 + e.radius) {
        e.hp -= this.damage;
        e.hitTimer = 0.15;
        e.burnTimer = 4.0;
        damageTexts.push(new DamageText(e.x, e.y, Math.round(this.damage), '#ef4444', true));
      }
    });
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    const pulse = Math.sin(Date.now() / 150) * 3;

    // Fiery Warning Ring (Subtle translucent)
    ctx.strokeStyle = 'rgba(249, 115, 22, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.arc(0, 0, this.triggerRadius + pulse * 0.5, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Glowing Lava Aura (Soft translucency)
    const mineGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, this.radius + 4);
    mineGrad.addColorStop(0, 'rgba(254, 240, 138, 0.5)');
    mineGrad.addColorStop(0.5, 'rgba(249, 115, 22, 0.25)');
    mineGrad.addColorStop(1, 'rgba(239, 68, 68, 0)');
    ctx.fillStyle = mineGrad;
    ctx.shadowColor = '#ea580c';
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.arc(0, 0, this.radius + pulse, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = '22px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('💣', 0, 0);
    ctx.restore();
  }
}

// 2. 🍙 Mini Familiar Companion Pet
class FamiliarPet {
  constructor(owner) {
    this.owner = owner;
    this.x = owner.x - 35;
    this.y = owner.y - 35;
    this.shootTimer = 0;
    this.bob = 0;
  }

  update(dt, enemies, projectiles) {
    this.bob += dt * 5;
    const targetX = this.owner.x + (this.owner.facingLeft ? 40 : -40);
    const targetY = this.owner.y - 35 + Math.sin(this.bob) * 6;
    this.x += (targetX - this.x) * 0.12;
    this.y += (targetY - this.y) * 0.12;

    this.shootTimer += dt;
    if (this.shootTimer >= 0.85 && enemies.length > 0) {
      this.shootTimer = 0;
      let nearest = null;
      let minD = 480;
      enemies.forEach(e => {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < minD) { minD = d; nearest = e; }
      });

      if (nearest) {
        const a = Math.atan2(nearest.y - this.y, nearest.x - this.x);
        projectiles.push(new Projectile(this.x, this.y, Math.cos(a) * 14, Math.sin(a) * 14, 85 * this.owner.damageMultiplier, 1, true, '#a855f7', 8, true, 'star'));
      }
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#c084fc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.font = '15px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🍙', 0, 0);
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
    ctx.shadowBlur = 14;

    if (this.shape === 'crescent') {
      ctx.strokeStyle = this.color;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 1.6, -Math.PI / 2.4, Math.PI / 2.4);
      ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();
    } else if (this.shape === 'blade') {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 1.9, -Math.PI / 2.2, Math.PI / 2.2);
      ctx.stroke();
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2.5;
      ctx.stroke();
    } else if (this.shape === 'snack') {
      ctx.font = `${Math.round(this.size * 2.4)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('🌰', 0, 0);
    } else if (this.shape === 'heart') {
      ctx.font = `${Math.round(this.size * 2.6)}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('💖', 0, 0);
    } else if (this.shape === 'carrot') {
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.ellipse(0, 0, this.size * 1.5, this.size * 0.75, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#22c55e';
      ctx.fillRect(-this.size * 1.4, -2, 4, 4);
    } else if (this.shape === 'star') {
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos((18 + i * 72) * Math.PI / 180) * this.size, -Math.sin((18 + i * 72) * Math.PI / 180) * this.size);
        ctx.lineTo(Math.cos((54 + i * 72) * Math.PI / 180) * (this.size * 0.5), -Math.sin((54 + i * 72) * Math.PI / 180) * (this.size * 0.5));
      }
      ctx.closePath();
      ctx.fill();

      // Bright Star Center
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.35, 0, Math.PI * 2);
      ctx.fill();
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Bright White Core
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(0, 0, this.size * 0.45, 0, Math.PI * 2);
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

// --- Enemy Classes ---
class Enemy {
  constructor(x, y, type = 'bug', wave = 1, diffConfig = { hpMult: 1.0, dmgMult: 1.0, spdMult: 1.0 }) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.hitTimer = 0;
    this.wave = wave;
    this.diffConfig = diffConfig;

    // Movement & Animation Physics
    this.kbVx = 0;
    this.kbVy = 0;
    this.scaleX = 1.0;
    this.scaleY = 1.0;
    this.animTimer = Math.random() * Math.PI * 2;
    this.walkCycle = Math.random() * Math.PI * 2;
    this.facingLeft = false;
    this.bob = 0;

    this.chargeTimer = 0;
    this.isCharging = false;
    this.chargeAngle = 0;
    this.stompTimer = 0;
    this.shootCooldown = 2.0;
    this.timer = Math.random() * 1.5;
    this.specialTimer = 0;
    this.phase = 1;
    this.blindTimer = 0;

    // Status effects
    this.burnTimer = 0;
    this.poisonTimer = 0;
    this.frostTimer = 0;

    if (type === 'bug') {
      this.radius = 20;
      this.hp = (32 + wave * 9) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = (2.6 + Math.random() * 0.6) * diffConfig.spdMult;
      this.damage = Math.round(10 * diffConfig.dmgMult);
      this.color = '#a855f7';
      this.xp = 20 + wave * 4;
      this.name = '날벌레 몬스터';
    } else if (type === 'goblin') {
      this.radius = 26;
      this.hp = (85 + wave * 22) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 2.0 * diffConfig.spdMult;
      this.damage = Math.round(15 * diffConfig.dmgMult);
      this.shootCooldown = Math.max(1.5, 2.8 - wave * 0.05);
      this.color = '#10b981';
      this.xp = 45 + wave * 8;
      this.name = '숲속 고블린';
    } else if (type === 'chimera') {
      this.radius = 34;
      this.hp = (280 + wave * 65) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.35 * diffConfig.spdMult;
      this.damage = Math.round(26 * diffConfig.dmgMult);
      this.color = '#f97316';
      this.xp = 120 + wave * 18;
      this.name = '눈물의 장갑 키메라';
    } else if (type === 'dark_swarm') {
      this.radius = 18;
      this.hp = (45 + wave * 11) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = (3.6 + Math.random() * 0.4) * diffConfig.spdMult;
      this.damage = Math.round(14 * diffConfig.dmgMult);
      this.color = '#475569';
      this.xp = 35 + wave * 6;
      this.name = '어둠의 검은 벌레';
    } else if (type === 'lightning_beetle') {
      this.radius = 22;
      this.hp = (110 + wave * 28) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 2.2 * diffConfig.spdMult;
      this.damage = Math.round(22 * diffConfig.dmgMult);
      this.color = '#eab308';
      this.xp = 80 + wave * 12;
      this.name = '번개 풍뎅이';
    } else if (type === 'iron_chimera') {
      this.radius = 42;
      this.hp = (600 + wave * 110) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.15 * diffConfig.spdMult;
      this.damage = Math.round(35 * diffConfig.dmgMult);
      this.color = '#6366f1';
      this.xp = 200 + wave * 25;
      this.name = '강철 중장갑 키메라';
    } else if (type.startsWith('sanctuary_boss')) {
      this.radius = 56;
      this.hp = 3400 * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.4 * diffConfig.spdMult;
      this.damage = Math.round(36 * diffConfig.dmgMult);
      this.color = '#ec4899';
      this.xp = 1000;
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
      this.xp = 850 + wave * 80;
      this.shootCooldown = 1.8;
      if (wave <= 5) this.name = '폭주하는 가시 키메라';
      else this.name = '돌연변이 쌍두 키메라';
    } else if (type === 'boss') {
      this.radius = 68;
      this.hp = (6500 + wave * 700) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.5 * diffConfig.spdMult;
      this.damage = Math.round(48 * diffConfig.dmgMult);
      this.color = '#e11d48';
      this.xp = 3000;
      this.name = '진(眞) 거대 아노코 [최종 결전]';
      this.shootCooldown = 1.5;
    } else if (type === 'golden_goblin') {
      this.radius = 24;
      this.hp = (180 + wave * 30) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = (3.8 + Math.random() * 0.5) * diffConfig.spdMult;
      this.damage = Math.round(12 * diffConfig.dmgMult);
      this.color = '#fbbf24';
      this.xp = 90 + wave * 15;
      this.name = '황금 도굴 고블린 🪙';
    } else if (type === 'ancient_golem') {
      this.radius = 48;
      this.hp = (1200 + wave * 180) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.25 * diffConfig.spdMult;
      this.damage = Math.round(32 * diffConfig.dmgMult);
      this.color = '#a855f7';
      this.xp = 550 + wave * 50;
      this.shootCooldown = 1.6;
      this.name = '🏛️ 고대 지하 수호 골렘';
    } else if (type === 'elite_bounty') {
      this.radius = 45;
      this.hp = (1100 + wave * 220) * diffConfig.hpMult;
      this.maxHp = this.hp;
      this.speed = 1.6 * diffConfig.spdMult;
      this.damage = Math.round(30 * diffConfig.dmgMult);
      this.color = '#c084fc';
      this.xp = 600 + wave * 60;
      this.name = '👑 [현상수배] 악명 높은 돌연변이 키메라';
      this.isElite = true;
    }
  }

  applyKnockback(fromX, fromY, force = 8) {
    const angle = Math.atan2(this.y - fromY, this.x - fromX);
    this.kbVx += Math.cos(angle) * force;
    this.kbVy += Math.sin(angle) * force;
    this.scaleX = 1.25;
    this.scaleY = 0.82;
  }

  update(dt, player, projectiles, shockwaves, particles, enemies = []) {
    if (this.hitTimer > 0) this.hitTimer -= dt;
    if (this.blindTimer > 0) this.blindTimer -= dt;

    // Smooth squash spring recovery
    this.scaleX += (1.0 - this.scaleX) * dt * 14;
    this.scaleY += (1.0 - this.scaleY) * dt * 14;

    // Knockback physics damping
    this.x += this.kbVx * dt * 60;
    this.y += this.kbVy * dt * 60;
    this.kbVx *= 0.84;
    this.kbVy *= 0.84;

    // Apply Status DoTs
    if (this.burnTimer > 0) {
      this.burnTimer -= dt;
      this.hp -= 28 * dt * 60;
      if (Math.random() < 0.2) particles.push(new Particle(this.x, this.y, 0, -2, 4, '#ef4444', 0.2, 'sparkle'));
    }
    if (this.poisonTimer > 0) {
      this.poisonTimer -= dt;
      this.hp -= 32 * dt * 60;
      if (Math.random() < 0.2) particles.push(new Particle(this.x, this.y, 0, -1, 5, '#a855f7', 0.25, 'smoke'));
    }
    if (this.frostTimer > 0) {
      this.frostTimer -= dt;
    }

    let curSpeed = this.speed;
    if (this.blindTimer > 0) curSpeed *= 0.35;
    if (this.frostTimer > 0) curSpeed *= 0.55;

    const dx = player.x - this.x;
    const dy = player.y - this.y;
    const dist = Math.hypot(dx, dy) || 1;
    this.facingLeft = dx < 0;

    // Boids Crowd Separation Force (prevents stacking / clumps)
    if (enemies && enemies.length > 0) {
      let sepX = 0, sepY = 0;
      let count = 0;
      for (let i = 0; i < enemies.length && count < 8; i++) {
        const other = enemies[i];
        if (other !== this && other.hp > 0) {
          const edx = this.x - other.x;
          const edy = this.y - other.y;
          const edist = Math.hypot(edx, edy);
          const minDist = this.radius + other.radius + 6;
          if (edist > 0 && edist < minDist) {
            const push = (minDist - edist) / minDist;
            sepX += (edx / edist) * push * 1.5;
            sepY += (edy / edist) * push * 1.5;
            count++;
          }
        }
      }
      this.x += sepX * dt * 60;
      this.y += sepY * dt * 60;
    }

    // Animation Timers
    this.animTimer += dt * 8;
    this.walkCycle += dt * (curSpeed * 3);

    if (this.type === 'bug' || this.type === 'dark_swarm') {
      this.bob = Math.sin(this.animTimer * 2) * 4;
      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;
    } else if (this.type === 'goblin') {
      this.bob = Math.abs(Math.sin(this.walkCycle)) * 5;
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
      this.bob = Math.sin(this.animTimer * 2.5) * 3;
      if (this.chargeTimer > 3.0 && !this.isCharging && this.blindTimer <= 0) {
        this.isCharging = true;
        this.chargeAngle = Math.atan2(dy, dx);
        this.scaleX = 1.35;
        this.scaleY = 0.75;
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
      this.bob = Math.sin(this.walkCycle) * 3;
      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;

      this.stompTimer += dt;
      if (this.stompTimer >= 4.2) {
        this.stompTimer = 0;
        this.scaleY = 0.7;
        this.scaleX = 1.3;
        shockwaves.push(new Shockwave(this.x, this.y, 220, Math.round(this.damage * 0.85), '#6366f1'));
      }
    } else if (this.type.startsWith('sanctuary_boss')) {
      this.bob = Math.sin(this.walkCycle) * 4;
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
      this.bob = Math.sin(this.walkCycle) * 4;
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

      this.bob = Math.sin(this.animTimer * 1.5) * 5;
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
    } else if (this.type === 'golden_goblin') {
      this.bob = Math.sin(this.walkCycle * 2.2) * 3;
      // Golden goblin flees erratically with zig-zag jitter
      const fleeAngle = Math.atan2(this.y - player.y, this.x - player.x) + Math.sin(this.animTimer * 4) * 0.85;
      this.x += Math.cos(fleeAngle) * curSpeed * dt * 60;
      this.y += Math.sin(fleeAngle) * curSpeed * dt * 60;
      if (Math.random() < 0.25) {
        particles.push(new Particle(this.x, this.y, (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2, 4, '#fbbf24', 0.35, 'star'));
      }
    } else if (this.type === 'ancient_golem') {
      this.bob = Math.sin(this.walkCycle) * 3.5;
      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;

      this.timer += dt;
      this.specialTimer += dt;

      if (this.timer >= this.shootCooldown && this.blindTimer <= 0) {
        this.timer = 0;
        const count = 8;
        for (let i = 0; i < count; i++) {
          const angle = (Math.PI * 2 / count) * i + Math.sin(this.animTimer);
          projectiles.push(
            new Projectile(this.x, this.y, Math.cos(angle) * 4.6, Math.sin(angle) * 4.6, 18, 1, false, '#a855f7', 8, false, 'orb')
          );
        }
      }

      if (this.specialTimer >= 3.6) {
        this.specialTimer = 0;
        shockwaves.push(new Shockwave(this.x, this.y, 250, 28, '#c084fc'));
      }
    } else {
      this.x += (dx / dist) * curSpeed * dt * 60;
      this.y += (dy / dist) * curSpeed * dt * 60;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Soft Dynamic Drop Shadow
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.beginPath();
    ctx.ellipse(0, this.radius + 4, this.radius * 0.9, this.radius * 0.36, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body transform with Bob and Squash/Stretch
    ctx.translate(0, this.bob);
    if (this.facingLeft) ctx.scale(-1, 1);
    ctx.scale(this.scaleX, this.scaleY);

    const isHit = this.hitTimer > 0;
    const sprites = window.GameInstance?.sprites || {};
    let sprite = null;

    if (this.type === 'bug') sprite = sprites.bug;
    else if (this.type === 'goblin') sprite = sprites.goblin;
    else if (this.type === 'golden_goblin') sprite = sprites.goblin;
    else if (this.type === 'ancient_golem') sprite = sprites.iron_chimera || sprites.midboss;
    else if (this.type === 'chimera' || this.type === 'elite_bounty') sprite = sprites.chimera;
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
      ctx.lineWidth = (this.type === 'boss' || this.type.includes('boss') || this.isElite) ? 4 : 2;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = (this.type === 'boss' || this.type.includes('boss') || this.isElite) ? 20 : 8;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 3 + (this.type === 'boss' || this.isElite ? auraPulse : 0), 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, this.radius + 2, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(sprite, -this.radius - 4, -this.radius - 4, (this.radius + 4) * 2, (this.radius + 4) * 2);
      ctx.restore();
    } else {
      ctx.fillStyle = isHit ? '#ffffff' : this.color;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (this.isElite) {
      ctx.save();
      ctx.font = 'bold 20px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('👑', 0, -this.radius - 16);
      ctx.restore();
    }

    // Status aura indicators
    if (this.burnTimer > 0) {
      ctx.font = '14px sans-serif';
      ctx.fillText('🔥', 8, -this.radius - 12);
    }
    if (this.poisonTimer > 0) {
      ctx.font = '14px sans-serif';
      ctx.fillText('🍄', -16, -this.radius - 12);
    }
    if (this.frostTimer > 0) {
      ctx.font = '14px sans-serif';
      ctx.fillText('❄️', 0, -this.radius - 12);
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

// --- Player Class with Diverse Build Slots ---
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
    } else if (charType === 'kurimanju') {
      this.maxHp = 135;
      this.hp = 135;
      this.speed = 5.0;
      this.baseDamage = 38;
      this.attackCooldown = 0.22;
      this.bulletColor = '#d97706';
      this.nameTag = '🌰 쿠리만주';
      this.intoxicationTimer = 0;
    } else if (charType === 'momonga') {
      this.maxHp = 90;
      this.hp = 90;
      this.speed = 6.2;
      this.baseDamage = 26;
      this.attackCooldown = 0.13;
      this.bulletColor = '#f472b6';
      this.nameTag = '🐿️ 모몬가';
      this.isGliding = false;
      this.glideTimer = 0;
    } else if (charType === 'rakko') {
      this.maxHp = 115;
      this.hp = 115;
      this.speed = 5.6;
      this.baseDamage = 46;
      this.attackCooldown = 0.15;
      this.bulletColor = '#3b82f6';
      this.nameTag = '🦦 라코 스승';
      this.parryTimer = 0;
      this.isDriving = false;
      this.driveTimer = 0;
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
    this.pierce = (charType === 'hachiware' || charType === 'rakko') ? 2 : 1;
    this.lifesteal = 0;

    // Crit stats
    this.critChance = charType === 'rakko' ? 0.25 : 0.12;
    this.critMultiplier = 1.8;

    this.hasShield = false;
    this.doubleDamageTimer = 0;

    // Relic & Build Buffs
    this.hasAutoShieldRegen = false;
    this.autoShieldTimer = 15.0;
    this.relicsCount = 0;
    this.relics = [];
    this.ribbonCooldown = 0;
    this.cameraCooldown = 12.0;
    this.hasSpicyRamen = false;
    this.hasRevive = false;
    this.reviveHpPercent = 0.50;

    // Elemental build triggers
    this.hasChainLightning = false;
    this.hasLightningSmite = false;
    this.smiteTimer = 0;
    this.hasFireMines = false;
    this.mineTimer = 0;
    this.hasFrostOrb = false;
    this.frostAngle = 0;
    this.hasToxicCloud = false;
    this.toxicTimer = 0;
    this.hasOrbitStars = false;
    this.orbitStarAngle = 0;
    this.hasFamiliar = false;
    this.familiar = null;
    this.hasFeverBerserk = false;

    // Evolutions
    this.hasEvoLightning = false;
    this.hasEvoFire = false;
    this.hasEvoIce = false;
    this.hasEvoPoison = false;

    // Acquired skills record for pause menu & HUD tray
    this.acquiredCards = [];
    this.elementCounts = { lightning: 0, fire: 0, ice: 0, poison: 0, orbit: 0, crit: 0, evolution: 0 };

    this.vx = 0;
    this.vy = 0;
    this.scaleX = 1.0;
    this.scaleY = 1.0;
    this.renderedTilt = 0;
    this.targetTilt = 0;
    this.recoilX = 0;
    this.recoilY = 0;
    this.footstepTimer = 0;
    this.joystickVector = { x: 0, y: 0 };
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

    // Load Meta-Progression Talents & Weeding License
    const talents = StorageManager.getTalents();
    const grade = StorageManager.getWeedingGrade();

    // 1. Attack bonus
    this.damageMultiplier *= (1 + (talents.attack || 0) * 0.06);
    if (grade.rank <= 3) this.damageMultiplier *= 1.10; // 3급 이상 특전: 공격력 +10%

    // 2. Health bonus
    this.maxHp += (talents.health || 0) * 16 + (grade.rank <= 1 ? 50 : 0);
    this.hp = this.maxHp;

    // 3. Speed bonus
    this.speed *= (1 + (talents.speed || 0) * 0.04);

    // 4. Magnet radius multiplier
    this.magnetMultiplier = 1 + (talents.magnet || 0) * 0.25;

    // 5. Crit bonus
    this.critChance += (talents.crit || 0) * 0.04;
    this.critMultiplier += (talents.crit || 0) * 0.15;

    // 6. Cooldown reduction
    const cdFactor = (1 - (talents.cooldown || 0) * 0.04) * (grade.rank <= 2 ? 0.92 : 1.0);
    this.dashCooldown *= cdFactor;
    this.cdQ *= cdFactor;
    this.cdE *= cdFactor;
    this.cdR *= cdFactor;

    // 7. Coin Greed bonus
    this.coinGreedBonus = 1 + (talents.greed || 0) * 0.12;

    // 8. Revive Talent
    if ((talents.revive || 0) > 0) {
      this.hasRevive = true;
      this.reviveHpPercent = (talents.revive || 1) * 0.20;
    }

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
    } else if (charType === 'kurimanju') {
      return ["하아ー...!", "크으으-! 이 맛이지!", "안주 한입 하겠나?", "끄으윽...!", "시원하구만!", "토벌 후 한잔!"];
    } else if (charType === 'momonga') {
      return ["나 귀엽지? 칭찬해!", "와ー아! 귀여워해줘!", "더 봐줘!", "후후훗, 내 매력에 빠졌군!", "빨리 칭찬해!"];
    } else if (charType === 'rakko') {
      return ["칼날에 망설임은 없다.", "토벌 랭킹 1위의 검을 보아라.", "완벽한 패링이다.", "드라이브 가볼까!", "훗, 좋은 승부였다."];
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

  update(dt, keys, worldMouseX, worldMouseY, particles, grenades, boomerangs, meteors, worldWidth, worldHeight, enemies, damageTexts, fireMines, projectiles) {
    if (this.dashTimer > 0) this.dashTimer -= dt;
    if (this.timerQ > 0) this.timerQ -= dt;
    if (this.timerE > 0) this.timerE -= dt;
    if (this.timerR > 0) this.timerR -= dt;
    if (this.fireTimer > 0) this.fireTimer -= dt;
    if (this.invulnerableTimer > 0) this.invulnerableTimer -= dt;

    if (this.doubleDamageTimer > 0) this.doubleDamageTimer -= dt;

    // Smooth spring recovery for visual squash, stretch & recoil
    this.scaleX += (1.0 - this.scaleX) * dt * 14;
    this.scaleY += (1.0 - this.scaleY) * dt * 14;
    this.recoilX *= 0.82;
    this.recoilY *= 0.82;

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

    // 🎀 Blue Ribbon Relic (Emergency Invulnerability)
    if (this.ribbonCooldown > 0) this.ribbonCooldown -= dt;
    if (this.relics.includes('relic_ribbon') && this.hp <= this.maxHp * 0.25 && this.ribbonCooldown <= 0) {
      this.ribbonCooldown = 60.0;
      this.invulnerableTimer = 5.0;
      this.doubleDamageTimer = 5.0;
      Sound.playCritHit();
      damageTexts.push(new DamageText(this.x, this.y - 45, '🎀 파란 리본 각성 (5초 무적 & 2배 극딜)!', '#38bdf8', true));
      this.say("어떻게든 될 거야! 파란 리본의 용기!", true);
    }

    // 📷 Olympus Camera Relic (Auto Time Freeze)
    if (this.relics.includes('relic_camera')) {
      this.cameraCooldown -= dt;
      if (this.cameraCooldown <= 0) {
        this.cameraCooldown = 14.0;
        Sound.playLaser();
        if (window.GameInstance) window.GameInstance.screenShake = 6;
        enemies.forEach(e => {
          if (e.type !== 'boss') {
            e.stunTimer = 3.0;
            e.blindTimer = 3.0;
            e.hitTimer = 0.2;
          }
        });
        damageTexts.push(new DamageText(this.x, this.y - 35, '📷 카메라 섬광 플래시 (전체 3초 정지)!', '#facc15', true));
      }
    }

    // ⚡ Lightning Smite Sub-Weapon
    if (this.hasLightningSmite && enemies.length > 0) {
      this.smiteTimer += dt;
      const targetTime = this.hasEvoLightning ? 0.9 : 1.7;
      if (this.smiteTimer >= targetTime) {
        this.smiteTimer = 0;
        const target = enemies[Math.floor(Math.random() * enemies.length)];
        if (target) {
          Sound.playLightning();
          const smiteDmg = (this.hasEvoLightning ? 340 : 200) * this.damageMultiplier;
          target.hp -= smiteDmg;
          target.hitTimer = 0.15;
          target.blindTimer = 1.0;
          damageTexts.push(new DamageText(target.x, target.y - 30, `⚡ ${Math.round(smiteDmg)} [천둥강타]`, '#facc15', true));
          
          if (window.GameInstance) {
            window.GameInstance.lightningBolts.push(
              new LightningBolt(target.x + (Math.random() - 0.5) * 80, target.y - 520, target.x, target.y, this.hasEvoLightning ? '#38bdf8' : '#facc15', 8)
            );
          }
          for (let i = 0; i < 8; i++) {
            const a = Math.random() * Math.PI * 2;
            const spd = 3 + Math.random() * 5;
            particles.push(new Particle(target.x, target.y, Math.cos(a) * spd, Math.sin(a) * spd, 6, '#fef08a', 0.35, 'star'));
          }
        }
      }
    }

    // 🔥 Fire Napalm Mines Sub-Weapon
    if (this.hasFireMines) {
      this.mineTimer += dt;
      if (this.mineTimer >= 1.6) {
        this.mineTimer = 0;
        const mineDmg = (this.hasEvoFire ? 380 : 240) * this.damageMultiplier;
        fireMines.push(new FireMine(this.x, this.y, mineDmg));
      }
    }

    // ❄️ Frost Orbit Orb Sub-Weapon
    if (this.hasFrostOrb) {
      this.frostAngle += dt * 4;
      enemies.forEach(e => {
        for (let i = 0; i < 2; i++) {
          const a = this.frostAngle + i * Math.PI;
          const ox = this.x + Math.cos(a) * 95;
          const oy = this.y + Math.sin(a) * 95;
          const d = Math.hypot(e.x - ox, e.y - oy);
          if (d < 30 + e.radius) {
            e.hp -= (this.hasEvoIce ? 100 : 50) * dt * 60 * this.damageMultiplier;
            e.hitTimer = 0.1;
            e.frostTimer = 2.5;
          }
        }
      });
    }

    // 🍄 Toxic Cloud Sub-Weapon
    if (this.hasToxicCloud) {
      this.toxicTimer += dt;
      // Ambient Spores
      if (Math.random() < 0.25) {
        const a = Math.random() * Math.PI * 2;
        const r = Math.random() * 160;
        particles.push(new Particle(this.x + Math.cos(a) * r, this.y + Math.sin(a) * r, 0, -0.8, 8, '#c084fc', 0.4, 'sparkle'));
      }
      if (this.toxicTimer >= 1.3) {
        this.toxicTimer = 0;
        particles.push(new Particle(this.x, this.y, 0, 0, 240, '#a855f7', 0.45, 'ring'));
        for (let i = 0; i < 10; i++) {
          const a = Math.random() * Math.PI * 2;
          const r = 80 + Math.random() * 140;
          particles.push(new Particle(this.x + Math.cos(a) * r, this.y + Math.sin(a) * r, 0, -1.2, 10, '#9333ea', 0.5, 'sparkle'));
        }
        enemies.forEach(e => {
          const d = Math.hypot(e.x - this.x, e.y - this.y);
          if (d < 240 + e.radius) {
            e.poisonTimer = this.hasEvoPoison ? 6.0 : 3.5;
            e.hp -= 45 * this.damageMultiplier;
            e.hitTimer = 0.1;
          }
        });
      }
    }

    // ⭐ Orbit Guardian Stars
    if (this.hasOrbitStars) {
      this.orbitStarAngle += dt * 3.5;
      enemies.forEach(e => {
        for (let i = 0; i < 3; i++) {
          const a = this.orbitStarAngle + (i * Math.PI * 2 / 3);
          const ox = this.x + Math.cos(a) * 80;
          const oy = this.y + Math.sin(a) * 80;
          const d = Math.hypot(e.x - ox, e.y - oy);
          if (d < 20 + e.radius) {
            e.hp -= 60 * dt * 60 * this.damageMultiplier;
            e.hitTimer = 0.1;
          }
        }
      });
    }

    // 🍙 Mini Companion Pet
    if (this.hasFamiliar) {
      if (!this.familiar) this.familiar = new FamiliarPet(this);
      this.familiar.update(dt, enemies, projectiles);
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

    // 🌰 Kurimanju Intoxication Buff
    if (this.charType === 'kurimanju' && this.intoxicationTimer > 0) {
      this.intoxicationTimer -= dt;
      if (Math.random() < 0.35) {
        particles.push(new Particle(this.x + (Math.random() * 20 - 10), this.y + (Math.random() * 20 - 10), (Math.random() - 0.5) * 2, -1 - Math.random() * 2, 5, '#f59e0b', 0.4, 'sparkle'));
      }
    }

    // 🐿️ Momonga Gliding
    if (this.charType === 'momonga') {
      if (this.glideTimer > 0) {
        this.glideTimer -= dt;
        this.isGliding = true;
        this.invulnerableTimer = Math.max(this.invulnerableTimer, 0.2);
        if (Math.random() < 0.4) {
          particles.push(new Particle(this.x, this.y + 10, (Math.random() - 0.5) * 3, 1 + Math.random() * 2, 6, '#f472b6', 0.3, 'smoke'));
        }
      } else {
        this.isGliding = false;
      }
    }

    // 🦦 Rakko Parry & Drive States
    if (this.charType === 'rakko') {
      if (this.parryTimer > 0) {
        this.parryTimer -= dt;
      }
      if (this.isDriving) {
        this.driveTimer -= dt;
        this.invulnerableTimer = Math.max(this.invulnerableTimer, 0.2);
        if (Math.random() < 0.6) {
          particles.push(new Particle(this.x + (this.facingLeft ? 25 : -25), this.y + 15, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 2, 8, '#64748b', 0.35, 'smoke'));
        }
        enemies.forEach(e => {
          const d = Math.hypot(e.x - this.x, e.y - this.y);
          if (d < 55 + e.radius) {
            const driveDmg = 550 * dt * 60 * this.damageMultiplier;
            e.hp -= driveDmg;
            e.hitTimer = 0.15;
            const kAngle = Math.atan2(e.y - this.y, e.x - this.x);
            e.x += Math.cos(kAngle) * 8;
            e.y += Math.sin(kAngle) * 8;
          }
        });
        if (this.driveTimer <= 0) {
          this.isDriving = false;
        }
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
        this.scaleX = 0.85;
        this.scaleY = 1.22;
      }
    } else {
      let moveX = 0;
      let moveY = 0;
      if (keys['KeyW'] || keys['ArrowUp']) moveY -= 1;
      if (keys['KeyS'] || keys['ArrowDown']) moveY += 1;
      if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
      if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

      if (this.joystickVector && (this.joystickVector.x !== 0 || this.joystickVector.y !== 0)) {
        moveX += this.joystickVector.x;
        moveY += this.joystickVector.y;
      }

      const mag = Math.hypot(moveX, moveY);
      this.isMoving = mag > 0;

      let targetVx = 0;
      let targetVy = 0;

      if (this.isMoving) {
        let curSpeed = this.speed;
        if (this.charType === 'usagi') curSpeed += this.madnessStacks * 0.45;
        if (this.charType === 'chiikawa' && this.hp <= this.maxHp * 0.35) curSpeed *= 1.35;
        if (this.charType === 'kurimanju' && this.intoxicationTimer > 0) curSpeed *= 1.25;
        if (this.charType === 'momonga' && this.isGliding) curSpeed = 12.0;
        if (this.charType === 'rakko' && this.isDriving) curSpeed = 13.5;
        if (this.isTornadoSpinning) curSpeed *= 1.6;
        if (window.GameInstance && window.GameInstance.feverTimer > 0) curSpeed *= 1.22;

        const moveScale = Math.min(1.0, mag);
        targetVx = (moveX / mag) * curSpeed * moveScale;
        targetVy = (moveY / mag) * curSpeed * moveScale;
        this.walkTimer += dt * 10;
        this.bobTimer += dt * 8;

        this.stepDustTimer += dt;
        if (this.stepDustTimer >= 0.14) {
          this.stepDustTimer = 0;
          particles.push(
            new Particle(this.x + (Math.random() * 12 - 6), this.y + this.radius - 4, -this.vx * 0.25, (Math.random() - 0.5) * 1.5, 6, '#f1f5f9', 0.28, 'smoke')
          );
        }
      } else {
        this.bobTimer += dt * 3;
      }

      // Smooth responsive inertia
      const accel = this.isMoving ? 0.28 : 0.22;
      this.vx += (targetVx - this.vx) * accel;
      this.vy += (targetVy - this.vy) * accel;

      this.x += this.vx * dt * 60;
      this.y += this.vy * dt * 60;

      // Dynamic tilt based on horizontal velocity
      this.targetTilt = (this.vx / Math.max(1, this.speed)) * 0.14;
      this.renderedTilt += (this.targetTilt - this.renderedTilt) * dt * 16;
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
    this.scaleX = 1.45;
    this.scaleY = 0.68;
    
    if (this.charType === 'momonga') {
      this.dashDuration = 0.42;
      this.glideTimer = 0.45;
    } else if (this.charType === 'rakko') {
      this.dashDuration = 0.18;
    } else {
      this.dashDuration = 0.28;
    }

    this.dashDurationTimer = this.dashDuration;
    this.invulnerableTimer = this.dashDuration + 0.15;

    let moveX = 0;
    let moveY = 0;
    if (keys['KeyW'] || keys['ArrowUp']) moveY -= 1;
    if (keys['KeyS'] || keys['ArrowDown']) moveY += 1;
    if (keys['KeyA'] || keys['ArrowLeft']) moveX -= 1;
    if (keys['KeyD'] || keys['ArrowRight']) moveX += 1;

    const mag = Math.hypot(moveX, moveY);
    let dashSpeed = 14.0;
    if (this.charType === 'momonga') dashSpeed = 16.5;
    if (this.charType === 'rakko') dashSpeed = 22.0;

    if (mag > 0) {
      this.dashVx = (moveX / mag) * dashSpeed;
      this.dashVy = (moveY / mag) * dashSpeed;
    } else {
      const angle = this.aimAngle;
      this.dashVx = Math.cos(angle) * dashSpeed;
      this.dashVy = Math.sin(angle) * dashSpeed;
    }

    // Dash sparkle particles
    const particles = window.GameInstance?.particles || [];
    for (let i = 0; i < 8; i++) {
      const a = Math.random() * Math.PI * 2;
      particles.push(new Particle(this.x, this.y, Math.cos(a) * 4, Math.sin(a) * 4, 7, '#facc15', 0.35, 'star'));
    }

    // Character specific dash perks
    if (this.charType === 'kurimanju') {
      const enemies = window.GameInstance?.enemies || [];
      enemies.forEach(e => {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < 75 + e.radius) {
          e.hp -= 90 * this.damageMultiplier;
          e.hitTimer = 0.15;
          const kAngle = Math.atan2(e.y - this.y, e.x - this.x);
          e.x += Math.cos(kAngle) * 20;
          e.y += Math.sin(kAngle) * 20;
        }
      });
      Sound.playHit();
      this.say("크으으-! 박치기!", true);
    } else if (this.charType === 'momonga') {
      Sound.playDash();
      this.say("슈우웅-! 날아간다!", true);
    } else if (this.charType === 'rakko') {
      const enemies = window.GameInstance?.enemies || [];
      enemies.forEach(e => {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < 80 + e.radius) {
          e.hp -= 130 * this.damageMultiplier;
          e.hitTimer = 0.15;
        }
      });
      Sound.playDash();
      this.say("순보-!", true);
    } else if (this.charType === 'usagi') {
      Sound.playDash();
      this.say("뿌루루루루-!", true);
    } else if (this.charType === 'hachiware') {
      Sound.playDash();
      this.say("와아앗! 피했어!", true);
    } else {
      Sound.playDash();
      this.say("와아앗...!", true);
    }
  }

  shoot(targetX, targetY, projectiles, particles) {
    let curCooldown = this.attackCooldown;
    if (this.charType === 'usagi') {
      curCooldown *= Math.max(0.4, 1.0 - this.madnessStacks * 0.12);
    } else if (this.charType === 'hachiware' && this.positiveTimer > 0) {
      curCooldown *= 0.55;
    } else if (this.charType === 'kurimanju' && this.intoxicationTimer > 0) {
      curCooldown *= 0.65;
    }

    if (this.fireTimer > 0) return;
    this.fireTimer = curCooldown;

    const angle = Math.atan2(targetY - this.y, targetX - this.x);
    let dmgMult = this.damageMultiplier;
    if (this.doubleDamageTimer > 0) dmgMult *= 2.0;
    if (this.charType === 'kurimanju' && this.intoxicationTimer > 0) dmgMult *= 1.35;

    // Recoil kickback & shooting squash
    this.recoilX -= Math.cos(angle) * 3.2;
    this.recoilY -= Math.sin(angle) * 3.2;
    this.scaleX = 0.88;
    this.scaleY = 1.14;

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
    } else if (this.charType === 'kurimanju') {
      const pSpeed = 13.5;
      const count = Math.max(3, this.bulletCount + 2);
      for (let i = 0; i < count; i++) {
        const offset = (i - (count - 1) / 2) * 0.24;
        projectiles.push(
          new Projectile(
            this.x, this.y,
            Math.cos(angle + offset) * pSpeed, Math.sin(angle + offset) * pSpeed,
            this.baseDamage * dmgMult, this.pierce, true, '#d97706', 10, false, 'snack'
          )
        );
      }
    } else if (this.charType === 'momonga') {
      const pSpeed = 16.0;
      const count = Math.max(3, this.bulletCount + 2);
      for (let i = 0; i < count; i++) {
        const offset = (i - (count - 1) / 2) * 0.16 + (Math.random() - 0.5) * 0.08;
        projectiles.push(
          new Projectile(
            this.x, this.y,
            Math.cos(angle + offset) * pSpeed, Math.sin(angle + offset) * pSpeed,
            this.baseDamage * dmgMult, this.pierce, true, '#f472b6', 9, true, 'heart'
          )
        );
      }
    } else if (this.charType === 'rakko') {
      const pSpeed = 16.5;
      const count = Math.max(2, this.bulletCount + 1);
      for (let i = 0; i < count; i++) {
        const offset = (i - (count - 1) / 2) * 0.32;
        projectiles.push(
          new Projectile(
            this.x, this.y,
            Math.cos(angle + offset) * pSpeed, Math.sin(angle + offset) * pSpeed,
            this.baseDamage * dmgMult * 1.25, this.pierce + 2, true, '#38bdf8', 12, false, 'blade'
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
      if (window.GameInstance) {
        window.GameInstance.particles.push(new Particle(this.x, this.y, 0, 0, 350, '#ffffff', 0.4, 'ring'));
        window.GameInstance.particles.push(new Particle(this.x, this.y, 0, 0, 260, '#fef08a', 0.35, 'ring'));
        for (let i = 0; i < 16; i++) {
          const a = Math.random() * Math.PI * 2;
          const spd = 4 + Math.random() * 8;
          window.GameInstance.particles.push(new Particle(this.x, this.y, Math.cos(a) * spd, Math.sin(a) * spd, 7, '#ffffff', 0.45, 'star'));
        }
      }
      this.say("카메라 플래시 찰칵!", true);
    } else if (this.charType === 'kurimanju') {
      grenades.push(new Grenade(this.x, this.y, targetX, targetY, 320 * this.damageMultiplier, 210));
      this.say("알밤 폭탄 받아라!", true);
    } else if (this.charType === 'momonga') {
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI / 2) + Math.atan2(targetY - this.y, targetX - this.x);
        const tx = this.x + Math.cos(angle) * 300;
        const ty = this.y + Math.sin(angle) * 300;
        boomerangs.push(new Boomerang(this.x, this.y, tx, ty, 150 * this.damageMultiplier, this));
      }
      this.say("꼬리 회오리 폭풍!", true);
    } else if (this.charType === 'rakko') {
      const baseAngle = Math.atan2(targetY - this.y, targetX - this.x);
      const projectiles = window.GameInstance?.projectiles || [];
      for (let i = -1; i <= 1; i += 2) {
        projectiles.push(
          new Projectile(
            this.x, this.y,
            Math.cos(baseAngle + i * 0.28) * 18, Math.sin(baseAngle + i * 0.28) * 18,
            380 * this.damageMultiplier, 5, true, '#38bdf8', 16, false, 'blade'
          )
        );
      }
      if (window.GameInstance) {
        window.GameInstance.slashWaves.push(new SlashWave(this.x, this.y, baseAngle - 0.22, 240, '#38bdf8'));
        window.GameInstance.slashWaves.push(new SlashWave(this.x, this.y, baseAngle + 0.22, 240, '#ffffff'));
      }
      Sound.playCritHit();
      this.say("비검! 십자 베기!", true);
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
      if (window.GameInstance) {
        window.GameInstance.particles.push(new Particle(this.x, this.y, 0, 0, 120, '#10b981', 0.45, 'ring'));
      }
      this.say("기타 치면서 힘내자!", true);
    } else if (this.charType === 'kurimanju') {
      this.hp = Math.min(this.maxHp, this.hp + 25);
      this.intoxicationTimer = 8.0;
      Sound.playExplosion();
      const enemies = window.GameInstance?.enemies || [];
      enemies.forEach(e => {
        e.stunTimer = 2.5;
        e.hp -= 100 * this.damageMultiplier;
        e.hitTimer = 0.15;
      });
      if (window.GameInstance) {
        window.GameInstance.shockwaves.push(new Shockwave(this.x, this.y, 280, 100, '#f59e0b'));
      }
      damageTexts.push(new DamageText(this.x, this.y - 25, '🍺 음주 포효 (광역기절 & 공격+35%)!', '#f59e0b', true));
      this.say("하아ー! 한잔 마셨다!", true);
    } else if (this.charType === 'momonga') {
      this.hp = Math.min(this.maxHp, this.hp + 30);
      const enemies = window.GameInstance?.enemies || [];
      enemies.forEach(e => {
        const d = Math.hypot(e.x - this.x, e.y - this.y);
        if (d < 380) {
          e.stunTimer = 3.5;
          e.hitTimer = 0.1;
        }
      });
      if (window.GameInstance) {
        window.GameInstance.shockwaves.push(new Shockwave(this.x, this.y, 320, 0, '#f472b6'));
        for (let i = 0; i < 12; i++) {
          const a = (i * Math.PI * 2) / 12;
          window.GameInstance.particles.push(new Particle(this.x, this.y, Math.cos(a) * 4, Math.sin(a) * 4, 10, '#f472b6', 0.6, 'heart'));
        }
      }
      damageTexts.push(new DamageText(this.x, this.y - 25, '💖 칭찬 매혹 (주변 3.5초 매혹 & 힐)!', '#f472b6', true));
      this.say("나를 칭찬해줘-!!", true);
    } else if (this.charType === 'rakko') {
      this.parryTimer = 1.8;
      if (window.GameInstance) {
        window.GameInstance.particles.push(new Particle(this.x, this.y, 0, 0, 100, '#38bdf8', 0.4, 'ring'));
      }
      damageTexts.push(new DamageText(this.x, this.y - 25, '🛡️ 완벽 패링 자세 (1.8초)!', '#38bdf8', true));
      this.say("검사의 호흡... 언제든 와라!", true);
    } else {
      this.isTearShieldActive = true;
      this.tearShieldTimer = 6.0;
      this.hasShield = true;
      if (window.GameInstance) {
        window.GameInstance.shockwaves.push(new Shockwave(this.x, this.y, 220, 0, '#ff79b0'));
      }
      damageTexts.push(new DamageText(this.x, this.y - 25, '🛡️ 눈물 방패 각성!', '#ff79b0', true));
      this.say("용기 100% 각성-!!", true);
    }
  }

  useR(targetX, targetY, meteors, damageTexts) {
    if (this.timerR > 0) return;
    this.timerR = this.cdR;

    if (this.charType === 'usagi') {
      window.GameInstance?.triggerSkillCutIn('usagi', '초특대 당근 메테오 강림-!!', '우뺘아아아-!! 뿌루루루-!!');
      for (let i = 0; i < 4; i++) {
        const ox = (Math.random() - 0.5) * 220;
        const oy = (Math.random() - 0.5) * 220;
        meteors.push(new CarrotMeteor(targetX + ox, targetY + oy, 550 * this.damageMultiplier, 220));
      }
      this.say("초특대 당근 메테오-!!", true);
    } else if (this.charType === 'hachiware') {
      window.GameInstance?.triggerSkillCutIn('hachiware', '일격필살 메가 슬래시-!!', '어떻게든 될 거야! 난또까나레-!!');
      Sound.playLaser();
      const enemies = window.GameInstance?.enemies || [];
      enemies.forEach(e => {
        e.hp -= 480 * this.damageMultiplier;
        e.hitTimer = 0.2;
      });
      if (window.GameInstance) {
        const baseAngle = Math.atan2(targetY - this.y, targetX - this.x);
        for (let offset of [-0.4, -0.2, 0, 0.2, 0.4]) {
          window.GameInstance.slashWaves.push(new SlashWave(this.x, this.y, baseAngle + offset, 300, '#38bdf8'));
        }
        for (let i = 0; i < 18; i++) {
          const a = baseAngle + (Math.random() - 0.5) * 1.2;
          const spd = 7 + Math.random() * 10;
          window.GameInstance.particles.push(new Particle(this.x, this.y, Math.cos(a) * spd, Math.sin(a) * spd, 8, '#7dd3fc', 0.4, 'sparkle'));
        }
      }
      damageTexts.push(new DamageText(this.x, this.y - 40, '⚡ 메가 슬래시 참격!', '#38bdf8', true));
      this.say("난또까나레 메가 슬래시-!!", true);
    } else if (this.charType === 'kurimanju') {
      window.GameInstance?.triggerSkillCutIn('kurimanju', '안주 대잔치 메테오 폭격-!!', '크으으-!! 한잔 마시고 전부 쓸어버린다!');
      for (let i = 0; i < 6; i++) {
        const ox = (Math.random() - 0.5) * 320;
        const oy = (Math.random() - 0.5) * 320;
        meteors.push(new CarrotMeteor(targetX + ox, targetY + oy, 480 * this.damageMultiplier, 200));
      }
      this.say("안주가 쏟아진다-!!", true);
    } else if (this.charType === 'momonga') {
      window.GameInstance?.triggerSkillCutIn('momonga', '치명적 매혹 하트 슈퍼노바-!!', '나를 잔뜩 칭찬해줘-!! 하트 대폭발!');
      Sound.playLaser();
      const projectiles = window.GameInstance?.projectiles || [];
      for (let i = 0; i < 32; i++) {
        const a = (i * Math.PI * 2 / 32);
        projectiles.push(
          new Projectile(
            this.x, this.y,
            Math.cos(a) * 15, Math.sin(a) * 15,
            340 * this.damageMultiplier, 3, true, '#f472b6', 11, true, 'heart'
          )
        );
      }
      window.GameInstance.screenShake = 12;
      damageTexts.push(new DamageText(this.x, this.y - 40, '👑 하트 슈퍼노바 폭발!', '#f472b6', true));
      this.say("내 귀여움을 받아라-!!", true);
    } else if (this.charType === 'rakko') {
      window.GameInstance?.triggerSkillCutIn('rakko', '스승의 슈퍼 드라이브 로드킬-!!', '칼날을 쥐고 전속력으로 돌진한다!');
      this.isDriving = true;
      this.driveTimer = 4.5;
      this.invulnerableTimer = 4.8;
      Sound.playLaser();
      window.GameInstance.screenShake = 10;
      damageTexts.push(new DamageText(this.x, this.y - 40, '🚗 드라이브 돌진 개시!', '#f59e0b', true));
      this.say("드라이브 출발이다! 다 비켜라!", true);
    } else {
      window.GameInstance?.triggerSkillCutIn('chiikawa', '초거대 별똥별 레인보우 빔-!!', '별님... 우리에게 용기와 힘을줘-!!');
      this.isFiringLaser = true;
      this.laserTimer = this.laserDuration;
      Sound.playLaser();
      this.say("와아앗-!! 레인보우 빔-!!", true);
    }
  }

  draw(ctx) {
    // Soft Dynamic Ground Shadow
    ctx.save();
    ctx.translate(this.x, this.y);
    const bob = Math.sin(this.bobTimer) * 3;
    const shadowBob = 1 - Math.abs(bob) * 0.06;
    ctx.fillStyle = 'rgba(0, 0, 0, 0.22)';
    ctx.beginPath();
    ctx.ellipse(0, this.radius + 6, this.radius * 0.92 * shadowBob, this.radius * 0.38 * shadowBob, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

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
    ctx.translate(this.x + this.recoilX, this.y + this.recoilY);

    const walkTilt = Math.sin(this.walkTimer) * 0.08;

    if (this.facingLeft) ctx.scale(-1, 1);
    ctx.scale(this.scaleX, this.scaleY);
    ctx.rotate(this.renderedTilt * (this.facingLeft ? -1 : 1) + walkTilt);

    if (this.hasShield) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(0, bob, this.radius + 8, 0, Math.PI * 2);
      ctx.stroke();
    }

    if (this.doubleDamageTimer > 0 || (this.charType === 'kurimanju' && this.intoxicationTimer > 0)) {
      ctx.strokeStyle = this.charType === 'kurimanju' ? '#d97706' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.shadowBlur = 10;
      ctx.beginPath();
      ctx.arc(0, bob, this.radius + 12, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Rakko Parry Barrier
    if (this.charType === 'rakko' && this.parryTimer > 0) {
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 16;
      ctx.beginPath();
      ctx.arc(0, bob, this.radius + 14, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Rakko Car
    if (this.charType === 'rakko' && this.isDriving) {
      ctx.save();
      ctx.fillStyle = '#ef4444';
      ctx.shadowColor = '#f59e0b';
      ctx.shadowBlur = 14;
      ctx.fillRect(-this.radius - 12, bob + 5, this.radius * 2 + 24, 22);
      ctx.fillStyle = '#1e293b';
      ctx.beginPath();
      ctx.arc(-this.radius, bob + 26, 7, 0, Math.PI * 2);
      ctx.arc(this.radius, bob + 26, 7, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // 🍄 Toxic Cloud Biohazard Aura (Soft Translucent Fog)
    if (this.hasToxicCloud) {
      ctx.save();
      const pPulse = 1 + Math.sin(Date.now() / 250) * 0.05;
      const toxicGrad = ctx.createRadialGradient(0, bob, 20, 0, bob, 220 * pPulse);
      toxicGrad.addColorStop(0, 'rgba(168, 85, 247, 0.12)');
      toxicGrad.addColorStop(0.7, 'rgba(147, 51, 234, 0.04)');
      toxicGrad.addColorStop(1, 'rgba(147, 51, 234, 0)');
      ctx.fillStyle = toxicGrad;
      ctx.beginPath();
      ctx.arc(0, bob, 220 * pPulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(192, 132, 252, 0.25)';
      ctx.lineWidth = 1.2;
      ctx.setLineDash([6, 6]);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }

    // 🌪️ Usagi Tornado Whirling Vortex (Light Energy Swirl)
    if (this.charType === 'usagi' && this.isTornadoSpinning) {
      ctx.save();
      ctx.rotate(Date.now() / 60);
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.45)';
      ctx.lineWidth = 2.5;
      ctx.shadowColor = '#facc15';
      ctx.shadowBlur = 12;
      for (let r = 24; r <= 64; r += 14) {
        ctx.beginPath();
        ctx.arc(0, bob, r, 0, Math.PI * 1.5);
        ctx.stroke();
      }
      ctx.restore();
    }

    // ⭐ Orbit Guardian Stars & Shield (Compact, Glowing Satellites)
    if (this.isTearShieldActive || this.hasOrbitStars) {
      ctx.save();
      ctx.strokeStyle = 'rgba(250, 204, 21, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, bob, 85, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 3; i++) {
        const oAngle = (this.hasOrbitStars ? this.orbitStarAngle : this.tearOrbitAngle) + (i * Math.PI * 2 / 3);
        const ox = Math.cos(oAngle) * 85;
        const oy = bob + Math.sin(oAngle) * 85;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.rotate(oAngle * 2.5);

        ctx.shadowColor = '#facc15';
        ctx.shadowBlur = 12;
        ctx.fillStyle = 'rgba(250, 204, 21, 0.9)';

        ctx.beginPath();
        const outerR = 12;
        const innerR = 5.5;
        for (let p = 0; p < 5; p++) {
          ctx.lineTo(Math.cos((18 + p * 72) * Math.PI / 180) * outerR, -Math.sin((18 + p * 72) * Math.PI / 180) * outerR);
          ctx.lineTo(Math.cos((54 + p * 72) * Math.PI / 180) * innerR, -Math.sin((54 + p * 72) * Math.PI / 180) * innerR);
        }
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }
      ctx.restore();
    }

    // ❄️ Frost Orbit Orbs (Crystal Ice Satellites)
    if (this.hasFrostOrb) {
      ctx.save();
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, bob, 95, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 2; i++) {
        const fa = this.frostAngle + i * Math.PI;
        const fx = Math.cos(fa) * 95;
        const fy = bob + Math.sin(fa) * 95;

        ctx.save();
        ctx.translate(fx, fy);
        ctx.rotate(-fa * 3);

        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 14;

        const iceGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 13);
        iceGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        iceGrad.addColorStop(0.45, 'rgba(125, 211, 252, 0.85)');
        iceGrad.addColorStop(1, 'rgba(2, 132, 199, 0.7)');
        ctx.fillStyle = iceGrad;
        ctx.beginPath();
        ctx.arc(0, 0, 13, 0, Math.PI * 2);
        ctx.fill();

        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        for (let k = 0; k < 6; k++) {
          const sa = (k * Math.PI / 3);
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(sa) * 9.5, Math.sin(sa) * 9.5);
          ctx.stroke();
        }

        ctx.restore();
      }
      ctx.restore();
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

    // Draw Familiar Companion
    if (this.hasFamiliar && this.familiar) {
      this.familiar.draw(ctx);
    }

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

// --- 🌟 Stage 3 Landmark Catalogs (Ramen Shop & Gacha Vending) ---
const RAMEN_DISHES = [
  {
    id: 'ramen_garlic',
    icon: '🍜',
    name: '마늘 듬뿍 특제 차슈 라멘',
    cost: 45,
    desc: '마늘과 두툼한 차슈의 환상 조합! 영구 공격력 +30% & 15초간 극딜 2배 폭증 버프를 부여합니다.',
    apply: (game) => {
      game.player.damageMultiplier += 0.30;
      game.player.doubleDamageTimer = 15.0;
      if (!game.player.relics.includes('🍜 특제 차슈 라멘')) game.player.relics.push('🍜 특제 차슈 라멘');
    }
  },
  {
    id: 'ramen_tonkotsu',
    icon: '🍲',
    name: '진한 돈코츠 라멘',
    cost: 35,
    desc: '오랜 시간 푹 고아낸 보약 육수! 최대 체력 +50 & 현재 체력을 100% 즉시 완치합니다.',
    apply: (game) => {
      game.player.maxHp += 50;
      game.player.hp = game.player.maxHp;
      if (!game.player.relics.includes('🍲 진한 돈코츠')) game.player.relics.push('🍲 진한 돈코츠');
    }
  },
  {
    id: 'ramen_gyoza',
    icon: '🥟',
    name: '바삭바삭 교자 만두 세트',
    cost: 30,
    desc: '겉바속촉 육즙 폭발 교자! 이동속도 +20% 증가 및 대시(Space) 쿨타임을 30% 단축합니다.',
    apply: (game) => {
      game.player.speed *= 1.20;
      game.player.dashCooldown *= 0.70;
      if (!game.player.relics.includes('🥟 교자 만두')) game.player.relics.push('🥟 교자 만두');
    }
  },
  {
    id: 'ramen_spicy',
    icon: '🌶️',
    name: '지옥 불꽃 카라미소 라멘',
    cost: 55,
    desc: '화끈한 매운맛의 정점! 모든 일반 공격에 화염 폭발 데미지(80 피해)를 영구 부여합니다.',
    apply: (game) => {
      game.player.hasSpicyRamen = true;
      if (!game.player.relics.includes('🌶️ 카라미소')) game.player.relics.push('🌶️ 카라미소');
    }
  }
];

const GACHA_REWARDS = [
  {
    id: 'relic_ribbon',
    type: 'relic',
    icon: '🎀',
    name: '하치와레의 파란 리본',
    desc: '체력 25% 이하 위기 시 5초간 무적 & 2배 공격력 각성! (60초 쿨다운)',
    apply: (game) => {
      if (!game.player.relics.includes('relic_ribbon')) game.player.relics.push('relic_ribbon');
    }
  },
  {
    id: 'relic_wand',
    type: 'relic',
    icon: '🥢',
    name: '우사기의 번개 지팡이',
    desc: '모든 공격 탄환 크기 +30%, 넉백 2배 & 적중 시 25% 확률로 벼락 낙뢰 소환!',
    apply: (game) => {
      if (!game.player.relics.includes('relic_wand')) game.player.relics.push('relic_wand');
    }
  },
  {
    id: 'relic_goblet',
    type: 'relic',
    icon: '🍺',
    name: '쿠리만주의 전설 안주 잔',
    desc: '몬스터 처치 시 15% 확률로 추가 보너스 코인 & 체력 +3 즉시 회복!',
    apply: (game) => {
      if (!game.player.relics.includes('relic_goblet')) game.player.relics.push('relic_goblet');
    }
  },
  {
    id: 'relic_carkey',
    type: 'relic',
    icon: '🚗',
    name: '라코 스승의 슈퍼카 키',
    desc: '이동속도 +20% 증가 & 대시(Space) 시 전방 적에게 250 돌진 충돌 피해!',
    apply: (game) => {
      game.player.speed *= 1.20;
      if (!game.player.relics.includes('relic_carkey')) game.player.relics.push('relic_carkey');
    }
  },
  {
    id: 'relic_crown',
    type: 'relic',
    icon: '👑',
    name: '모몬가의 반짝이 왕관',
    desc: '모든 경험치 보석 가치 +40% 증가 & 필드 회복 아이템 드랍률 2배 증가!',
    apply: (game) => {
      if (!game.player.relics.includes('relic_crown')) game.player.relics.push('relic_crown');
    }
  },
  {
    id: 'relic_camera',
    type: 'relic',
    icon: '📷',
    name: '하치와레의 올림푸스 카메라',
    desc: '14초마다 자동으로 플래시가 터져 화면 내 모든 일반 몬스터를 3초간 정지!',
    apply: (game) => {
      if (!game.player.relics.includes('relic_camera')) game.player.relics.push('relic_camera');
    }
  },
  {
    id: 'jackpot_coins',
    type: 'coins',
    icon: '🪙',
    name: '골드 잭팟 대박 (+60 🪙)',
    desc: '축하합니다! 황금빛 코인 60개가 쏟아져 들어왔습니다!',
    apply: (game) => {
      game.addSessionCoins(60);
    }
  },
  {
    id: 'pudding_party',
    type: 'item',
    icon: '🍮',
    name: '특대 푸딩 & 마그넷 파티',
    desc: '체력 완전 회복 + 전 맵의 모든 경험치 보석과 아이템을 강력 흡수합니다!',
    apply: (game) => {
      game.player.hp = game.player.maxHp;
      game.expGems.forEach(g => { g.x = game.player.x; g.y = game.player.y; });
      game.fieldItems.forEach(it => { it.x = game.player.x; it.y = game.player.y; });
    }
  }
];

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

    // Stage 3 World Landmarks
    this.ramenShop = new RamenShop(2500, 2300);
    this.hotSpring = new HotSpring(1500, 3500, 160);
    this.gachaMachines = [new GachaMachine(3500, 1500), new GachaMachine(1800, 1800)];
    this.nearbyInteractable = null;
    this.isShopping = false;
    this.isGachaSpinning = false;

    // Ancient Underground Dungeon Portal (고대 지하 던전 챌린지)
    this.dungeonPortals = [];
    this.inDungeon = false;
    this.dungeonTimer = 0;
    this.dungeonMaxTime = 45.0;
    this.dungeonCoinsGained = 0;
    this.savedSurface = null;
    this.dungeonPortalSpawnedWaves = new Set();
    this.dungeonSpawnTimer = 0;
    this.dungeonGolemSpawned = false;

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
    this.fireMines = [];
    this.expGems = [];
    this.fieldItems = [];
    this.particles = [];
    this.damageTexts = [];
    this.shockwaves = [];
    this.lightningBolts = [];
    this.slashWaves = [];
    this.airdropCrates = [];
    this.festivalBalloons = [];

    // Dynamic Field Random Event System
    this.eventTimer = 0;
    this.nextEventInterval = 32;
    this.activeEvent = null;
    this.activeEventTimer = 0;
    this.activeEventDuration = 0;
    this.activeEventName = '';
    this.activeEventIcon = '';
    this.activeEventDesc = '';
    this.lastEventIndex = -1;
    this.thunderstormStrikeTimer = 0;
    this.activeBountyEnemy = null;

    this.keys = {};
    this.mouse = { x: 0, y: 0, isDown: false };
    this.selectedChar = 'chiikawa';
    this.difficulty = 'hard';
    this.gameMode = 'campaign'; // 'campaign' | 'endless' | 'bossrush'
    this.bossRushPhase = 0;
    this.bossRushTotalPhases = 6;

    this.wave = 1;
    this.waveTimer = 0;
    this.waveDuration = 35;
    this.maxCampaignWave = 12;
    this.gameTime = 0;
    this.score = 0;
    this.kills = 0;
    this.level = 1;
    this.currentExp = 0;
    this.maxExp = 80;

    this.comboCount = 0;
    this.comboTimer = 0;
    this.feverTimer = 0;
    this.touchAttacking = false;
    this.cutinTimerId = null;

    this.isRunning = false;
    this.isPaused = false;
    this.isLevelingUp = false;
    this.hitStopTimer = 0;
    this.lastTime = 0;

    // Real-time FPS monitoring (supports 60Hz, 120Hz, 144Hz, 240Hz+)
    this.fps = 60;
    this.fpsTimer = 0;
    this.frameCount = 0;

    this.settings = StorageManager.getSettings();
    Sound.sfxVolume = this.settings.sfxVol;
    Sound.bgmVolume = this.settings.bgmVol;

    this.initEvents();
    this.resize();
    this.updateRecordDisplay();
    this.updateStartScreenExamInfo();
  }

  loadSprites() {
    const list = {
      chiikawa: 'assets/chiikawa.png',
      hachiware: 'assets/hachiware.png',
      usagi: 'assets/usagi.png',
      kurimanju: 'assets/kurimanju.png',
      momonga: 'assets/momonga.png',
      rakko: 'assets/rakko.png',
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

    const modeRec = StorageManager.getModeRecords();
    const endlessEl = document.getElementById('rec-endless');
    if (endlessEl) {
      endlessEl.textContent = `${this.formatTime(modeRec.endless.bestTime)} (${modeRec.endless.bestKills}처치)`;
    }

    const quests = StorageManager.getQuests();
    let claimableCount = 0;
    StorageManager.QUEST_DEFS.forEach(q => {
      const uq = quests[q.id];
      if (uq && !uq.claimed && uq.progress >= q.target) {
        claimableCount++;
      }
    });
    const badge = document.getElementById('start-quest-badge');
    if (badge) {
      if (claimableCount > 0) {
        badge.textContent = `${claimableCount}개 완료!`;
        badge.style.background = '#10b981';
      } else {
        badge.textContent = '8개 퀘스트';
        badge.style.background = 'rgba(255, 255, 255, 0.2)';
      }
    }
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
          if (this.nearbyInteractable) {
            if (this.nearbyInteractable.type === 'ramen') this.openRamenModal();
            else if (this.nearbyInteractable.type === 'gacha') this.openGachaModal();
            else if (this.nearbyInteractable.type === 'dungeon') this.enterUndergroundDungeon(this.nearbyInteractable.target);
          } else {
            this.player.useE(this.damageTexts);
          }
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

    // Proximity Interaction Prompt Click
    const interactPrompt = document.getElementById('interact-prompt');
    if (interactPrompt) {
      interactPrompt.addEventListener('click', () => {
        if (this.nearbyInteractable) {
          if (this.nearbyInteractable.type === 'ramen') this.openRamenModal();
          else if (this.nearbyInteractable.type === 'gacha') this.openGachaModal();
          else if (this.nearbyInteractable.type === 'dungeon') this.enterUndergroundDungeon(this.nearbyInteractable.target);
        }
      });
    }

    // Ramen Shop Modal Buttons
    const btnCloseRamen = document.getElementById('btn-close-ramen');
    if (btnCloseRamen) btnCloseRamen.addEventListener('click', () => this.closeRamenModal());

    // Gacha Machine Modal Buttons
    const btnCloseGacha = document.getElementById('btn-close-gacha');
    if (btnCloseGacha) btnCloseGacha.addEventListener('click', () => this.closeGachaModal());

    const btnSpinGacha = document.getElementById('btn-spin-gacha');
    if (btnSpinGacha) btnSpinGacha.addEventListener('click', () => this.spinGacha());

    // Character Selection
    document.querySelectorAll('.char-card').forEach(card => {
      card.addEventListener('click', () => {
        document.querySelectorAll('.char-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        this.selectedChar = card.dataset.char;
      });
    });

    // Mode Selection (Campaign, Endless, Boss Rush)
    document.querySelectorAll('.mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.gameMode = btn.dataset.mode || 'campaign';
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

    // Daily Quests Modal Buttons
    const btnOpenQuests = document.getElementById('btn-open-quests');
    const btnOpenQuestsAction = document.getElementById('btn-open-quests-action');
    if (btnOpenQuests) btnOpenQuests.addEventListener('click', (e) => { if (e.target !== btnOpenQuestsAction) this.openQuestModal(); });
    if (btnOpenQuestsAction) btnOpenQuestsAction.addEventListener('click', (e) => { e.stopPropagation(); this.openQuestModal(); });
    const btnCloseQuests = document.getElementById('btn-close-quests');
    if (btnCloseQuests) btnCloseQuests.addEventListener('click', () => this.closeQuestModal());

    // Weeding License Exam Modal Buttons
    const btnOpenExam = document.getElementById('btn-open-exam');
    const btnOpenExamAction = document.getElementById('btn-open-exam-action');
    const btnCloseExam = document.getElementById('btn-close-exam');
    const btnResetTalents = document.getElementById('btn-reset-talents');
    const btnGameoverExam = document.getElementById('btn-gameover-exam');
    const btnVictoryExam = document.getElementById('btn-victory-exam');

    if (btnOpenExam) btnOpenExam.addEventListener('click', (e) => { if (e.target !== btnOpenExamAction) this.openExamModal(); });
    if (btnOpenExamAction) btnOpenExamAction.addEventListener('click', (e) => { e.stopPropagation(); this.openExamModal(); });
    if (btnCloseExam) btnCloseExam.addEventListener('click', () => this.closeExamModal());
    if (btnResetTalents) btnResetTalents.addEventListener('click', () => this.resetExamTalents());
    if (btnGameoverExam) btnGameoverExam.addEventListener('click', () => this.openExamModal());
    if (btnVictoryExam) btnVictoryExam.addEventListener('click', () => this.openExamModal());

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
        Sound.setBgmVolume(this.settings.bgmVol);
        StorageManager.saveSettings(this.settings);
      });
    }

    const selectBgmTrack = document.getElementById('select-bgm-track');
    if (selectBgmTrack) {
      selectBgmTrack.value = Sound.currentTrackIdx;
      selectBgmTrack.addEventListener('change', (e) => {
        const next = Sound.setTrack(parseInt(e.target.value, 10) || 0);
        const btnTrack = document.getElementById('btn-track');
        if (btnTrack) btnTrack.textContent = `💿 ${next.shortName}`;
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

    const toggleParticles = document.getElementById('toggle-particles');
    if (toggleParticles) {
      toggleParticles.checked = this.settings.highParticles !== false;
      toggleParticles.addEventListener('change', (e) => {
        this.settings.highParticles = e.target.checked;
        StorageManager.saveSettings(this.settings);
      });
    }

    const toggleTouch = document.getElementById('toggle-touch-controls');
    if (toggleTouch) {
      toggleTouch.checked = this.settings.touchControls !== false;
      toggleTouch.addEventListener('change', (e) => {
        this.settings.touchControls = e.target.checked;
        StorageManager.saveSettings(this.settings);
        const touchContainer = document.getElementById('touch-controls-container');
        if (touchContainer) {
          if (this.settings.touchControls) touchContainer.classList.add('active');
          else touchContainer.classList.remove('active');
        }
      });
    }

    this.initTouchControls();
  }

  updateStartScreenExamInfo() {
    const coins = StorageManager.getCoins();
    const grade = StorageManager.getWeedingGrade();

    const startCoinsVal = document.getElementById('start-coins-val');
    const startGradeBadge = document.getElementById('start-exam-grade-badge');

    if (startCoinsVal) startCoinsVal.textContent = coins.toLocaleString();
    if (startGradeBadge) {
      startGradeBadge.textContent = `${grade.name} • 투자 ${grade.points}P (${grade.bonus})`;
    }
  }

  openExamModal() {
    this.renderExamModal();
    const modal = document.getElementById('exam-modal');
    if (modal) modal.classList.add('active');
  }

  closeExamModal() {
    const modal = document.getElementById('exam-modal');
    if (modal) modal.classList.remove('active');
    this.updateStartScreenExamInfo();
  }

  renderExamModal() {
    const coins = StorageManager.getCoins();
    const talents = StorageManager.getTalents();
    const grade = StorageManager.getWeedingGrade();

    const badgeTag = document.getElementById('exam-badge-tag');
    const modalCoins = document.getElementById('exam-modal-coins');
    const progressText = document.getElementById('grade-progress-text');
    const bonusText = document.getElementById('grade-bonus-text');
    const progressFill = document.getElementById('grade-progress-fill');

    if (badgeTag) badgeTag.textContent = grade.name;
    if (modalCoins) modalCoins.textContent = coins.toLocaleString();

    if (progressText) {
      progressText.textContent = grade.isMax
        ? `🎉 최고 등급 달성! (총 ${grade.points} 포인트 완료)`
        : `다음 승급까지 ${grade.nextPoints} 포인트 필요 (현재 ${grade.points} / ${grade.targetPoints}P)`;
    }

    if (bonusText) bonusText.textContent = `특전: ${grade.bonus}`;
    if (progressFill) {
      const pct = grade.isMax ? 100 : Math.min(100, Math.round((grade.points / grade.targetPoints) * 100));
      progressFill.style.width = `${pct}%`;
    }

    const grid = document.getElementById('talents-grid');
    if (!grid) return;
    grid.innerHTML = '';

    StorageManager.TALENT_DEFS.forEach(def => {
      const currentLvl = talents[def.id] || 0;
      const isMax = currentLvl >= def.maxLevel;
      const nextCost = isMax ? 0 : def.costs[currentLvl];
      const canAfford = coins >= nextCost && !isMax;

      const card = document.createElement('div');
      card.className = `talent-card ${isMax ? 'maxed' : ''}`;

      let pipsHtml = '';
      for (let i = 0; i < def.maxLevel; i++) {
        pipsHtml += `<div class="talent-pip ${i < currentLvl ? 'active' : ''}"></div>`;
      }

      card.innerHTML = `
        <div>
          <div class="talent-head">
            <span class="talent-icon">${def.icon}</span>
            <span class="talent-name">${def.name}</span>
          </div>
          <div class="talent-pips">${pipsHtml}</div>
          <div class="talent-desc">${def.desc(currentLvl)}</div>
        </div>
        <button class="talent-btn ${isMax ? 'max-btn' : ''}" ${(!canAfford && !isMax) ? 'disabled' : ''}>
          ${isMax ? '⭐ MAX 달성' : `🪙 ${nextCost} 코인 강화`}
        </button>
      `;

      const btn = card.querySelector('.talent-btn');
      if (!isMax) {
        btn.addEventListener('click', () => this.buyExamTalent(def.id));
      }

      grid.appendChild(card);
    });
  }

  buyExamTalent(talentId) {
    const res = StorageManager.upgradeTalent(talentId);
    if (res.success) {
      Sound.playUpgrade();
      this.renderExamModal();
      this.updateStartScreenExamInfo();
    } else {
      Sound.playHit();
    }
  }

  resetExamTalents() {
    const res = StorageManager.resetTalents();
    Sound.playCoin();
    this.renderExamModal();
    this.updateStartScreenExamInfo();
    alert(`🔄 모든 특성이 초기화되었으며, 투자한 코인 ${res.refunded.toLocaleString()}개가 100% 환급되었습니다!`);
  }

  openQuestModal() {
    this.renderQuestModal();
    const modal = document.getElementById('quest-modal');
    if (modal) modal.classList.add('active');
  }

  closeQuestModal() {
    const modal = document.getElementById('quest-modal');
    if (modal) modal.classList.remove('active');
    this.updateRecordDisplay();
    this.updateStartScreenExamInfo();
  }

  renderQuestModal() {
    const coins = StorageManager.getCoins();
    const quests = StorageManager.getQuests();
    const coinsEl = document.getElementById('quest-modal-coins');
    if (coinsEl) coinsEl.textContent = coins.toLocaleString();

    const listEl = document.getElementById('quests-list');
    if (!listEl) return;
    listEl.innerHTML = '';

    StorageManager.QUEST_DEFS.forEach(q => {
      const userQ = quests[q.id] || { progress: 0, claimed: false };
      const curProg = Math.min(q.target, userQ.progress || 0);
      const isComplete = curProg >= q.target;
      const isClaimed = userQ.claimed;
      const pct = Math.min(100, Math.round((curProg / q.target) * 100));

      const card = document.createElement('div');
      card.className = `quest-card ${isClaimed ? 'claimed' : (isComplete ? 'complete' : '')}`;

      card.innerHTML = `
        <div class="quest-card-head">
          <div class="quest-title-wrap">
            <span class="quest-icon">${q.icon}</span>
            <span class="quest-name">${q.name}</span>
          </div>
          <span class="quest-reward-badge">🪙 +${q.reward} 코인</span>
        </div>
        <div class="quest-desc">${q.desc}</div>
        <div class="quest-progress-wrap">
          <div class="quest-progress-track">
            <div class="quest-progress-fill" style="width: ${pct}%"></div>
          </div>
          <span class="quest-progress-text">${curProg} / ${q.target}</span>
        </div>
        <button class="quest-claim-btn ${isClaimed ? 'claimed' : (isComplete ? 'ready' : '')}" ${(!isComplete || isClaimed) ? 'disabled' : ''}>
          ${isClaimed ? '✅ 보상 수령 완료' : (isComplete ? '🎁 보상 받기' : '진행 중...')}
        </button>
      `;

      const btn = card.querySelector('.quest-claim-btn');
      if (isComplete && !isClaimed) {
        btn.addEventListener('click', () => this.claimQuestReward(q.id));
      }

      listEl.appendChild(card);
    });
  }

  claimQuestReward(questId) {
    const res = StorageManager.claimQuest(questId);
    if (res.success) {
      Sound.playRelicFanfare();
      this.renderQuestModal();
      this.updateRecordDisplay();
      this.updateStartScreenExamInfo();
    }
  }

  addSessionCoins(amount) {
    const mult = this.player ? (this.player.coinGreedBonus || 1.0) : 1.0;
    const finalCoins = Math.max(1, Math.round(amount * mult));
    this.sessionCoins += finalCoins;
    const hudCoins = document.getElementById('hud-coins');
    if (hudCoins) hudCoins.textContent = this.sessionCoins.toLocaleString();
    return finalCoins;
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
    this.fireMines = [];
    this.expGems = [];
    this.fieldItems = [];
    this.particles = [];
    this.damageTexts = [];
    this.shockwaves = [];
    this.lightningBolts = [];
    this.slashWaves = [];
    this.airdropCrates = [];
    this.festivalBalloons = [];
    this.weedPatches = [];

    // Reset Random Field Events
    this.eventTimer = 0;
    this.nextEventInterval = 32;
    this.activeEvent = null;
    this.activeEventTimer = 0;
    this.activeEventDuration = 0;
    this.activeBountyEnemy = null;
    const eHud = document.getElementById('event-hud');
    if (eHud) eHud.style.display = 'none';

    // Reset Underground Dungeon
    this.dungeonPortals = [];
    this.inDungeon = false;
    this.dungeonTimer = 0;
    this.dungeonCoinsGained = 0;
    this.savedSurface = null;
    this.dungeonPortalSpawnedWaves = new Set();
    this.dungeonSpawnTimer = 0;
    this.dungeonGolemSpawned = false;
    const dHud = document.getElementById('dungeon-hud');
    if (dHud) dHud.style.display = 'none';

    // Session coins & Weeding 1st Grade starting bonus
    this.sessionCoins = 0;
    const grade = StorageManager.getWeedingGrade();
    if (grade.rank <= 1) {
      this.sessionCoins = 100;
    }

    // Generate 55 Weed Patches on the open world
    for (let i = 0; i < 55; i++) {
      const wx = 120 + Math.random() * (this.worldWidth - 240);
      const wy = 120 + Math.random() * (this.worldHeight - 240);
      this.weedPatches.push(new WeedPatch(wx, wy));
    }

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
    this.feverTimer = 0;

    if (this.gameMode === 'endless') {
      this.maxCampaignWave = 9999;
      this.waveDuration = 25;
      this.damageTexts.push(new DamageText(startX, startY - 60, '♾️ 무한 서바이벌 모드 시작!', '#38bdf8', true));
    } else if (this.gameMode === 'bossrush') {
      this.maxCampaignWave = 6;
      this.bossRushPhase = 1;
      this.damageTexts.push(new DamageText(startX, startY - 60, '💀 보스 러시 아레나 시작!', '#f43f5e', true));
      setTimeout(() => {
        if (this.isRunning && !this.isPaused) this.spawnBossRushBoss(1);
      }, 1500);
    } else {
      this.maxCampaignWave = 12;
      this.waveDuration = 35;
    }

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
    } else if (this.selectedChar === 'kurimanju') {
      normalName.textContent = '안주 3연탄'; normalIcon.textContent = '🍢';
      qName.textContent = '알밤 폭탄'; qIcon.textContent = '🌰';
      eName.textContent = '음주 포효'; eIcon.textContent = '🍺';
      rName.textContent = '안주 대잔치'; rIcon.textContent = '🍲';
    } else if (this.selectedChar === 'momonga') {
      normalName.textContent = '하트 연사'; normalIcon.textContent = '💗';
      qName.textContent = '꼬리 회오리'; qIcon.textContent = '🌀';
      eName.textContent = '칭찬해줘!'; eIcon.textContent = '🥺';
      rName.textContent = '하트 슈퍼노바'; rIcon.textContent = '👑';
    } else if (this.selectedChar === 'rakko') {
      normalName.textContent = '쌍검 발도참'; normalIcon.textContent = '🗡️';
      qName.textContent = '십자 절단'; qIcon.textContent = '⚔️';
      eName.textContent = '완벽 패링'; eIcon.textContent = '🛡️';
      rName.textContent = '드라이브 돌진'; rIcon.textContent = '🚗';
    } else {
      normalName.textContent = '유도 별빛샷'; normalIcon.textContent = '⭐';
      qName.textContent = '도토리 폭탄'; qIcon.textContent = '🌰';
      eName.textContent = '용기 방패각성'; eIcon.textContent = '💖';
      rName.textContent = '레인보우 빔'; rIcon.textContent = '🌈';
    }

    const tIconAtk = document.getElementById('t-icon-atk');
    const tIconQ = document.getElementById('t-icon-q');
    const tIconE = document.getElementById('t-icon-e');
    const tIconR = document.getElementById('t-icon-r');
    if (tIconAtk) tIconAtk.textContent = normalIcon.textContent;
    if (tIconQ) tIconQ.textContent = qIcon.textContent;
    if (tIconE) tIconE.textContent = eIcon.textContent;
    if (tIconR) tIconR.textContent = rIcon.textContent;
  }

  getChapterInfo(wave) {
    if (this.gameMode === 'bossrush') {
      return { name: `💀 보스 러시 Phase ${this.bossRushPhase || 1} / 6`, bgKey: 'battle_bg' };
    }
    if (this.gameMode === 'endless') {
      const bgs = ['battle_bg', 'ramen_bg', 'tower_bg'];
      const bg = bgs[Math.floor((wave - 1) / 5) % bgs.length];
      return { name: `♾️ 무한 서바이벌 (Wave ${wave})`, bgKey: bg };
    }
    if (wave <= 4) return { name: '🌸 제1장: 평화로운 숲속', bgKey: 'battle_bg' };
    if (wave <= 8) return { name: '🍜 제2장: 라멘 로 결전장', bgKey: 'ramen_bg' };
    if (wave <= 11) return { name: '🏰 제3장: 고대 지하 신전', bgKey: 'tower_bg' };
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
    if (this.player.charType === 'kurimanju' && this.player.intoxicationTimer > 0) {
      buffContainer.innerHTML += `<div class="buff-pill" style="border-color:#d97706;color:#d97706;">🍺 음주 버프 (${Math.ceil(this.player.intoxicationTimer)}s)</div>`;
    }
    if (this.player.charType === 'rakko' && this.player.parryTimer > 0) {
      buffContainer.innerHTML += `<div class="buff-pill" style="border-color:#38bdf8;color:#38bdf8;">🛡️ 패링 반격 자세 (${Math.ceil(this.player.parryTimer)}s)</div>`;
    }
    if (this.player.charType === 'rakko' && this.player.isDriving) {
      buffContainer.innerHTML += `<div class="buff-pill" style="border-color:#ef4444;color:#ef4444;">🚗 드라이브 무적 (${Math.ceil(this.player.driveTimer)}s)</div>`;
    }

    // Build Synergies Tray
    const buildTray = document.getElementById('hud-build-tray');
    if (buildTray) {
      let trayHtml = '';
      const elems = [
        { key: 'lightning', name: '⚡번개', count: this.player.elementCounts.lightning, cls: 'elem-lightning' },
        { key: 'fire', name: '🔥화염', count: this.player.elementCounts.fire, cls: 'elem-fire' },
        { key: 'ice', name: '❄️빙결', count: this.player.elementCounts.ice, cls: 'elem-ice' },
        { key: 'poison', name: '🍄맹독', count: this.player.elementCounts.poison, cls: 'elem-poison' },
        { key: 'orbit', name: '⭐위성', count: this.player.elementCounts.orbit, cls: 'elem-orbit' },
        { key: 'crit', name: '🎯치명', count: this.player.elementCounts.crit, cls: 'elem-crit' },
        { key: 'evolution', name: '🌟진화', count: this.player.elementCounts.evolution, cls: 'elem-evolution' }
      ];
      elems.forEach(el => {
        if (el.count > 0) {
          trayHtml += `<span class="synergy-pill ${el.cls}">${el.name} ${el.count}</span>`;
        }
      });
      buildTray.innerHTML = trayHtml;
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

    // Touch controls cooldown overlays
    setCD('touch-cd-space', this.player.dashTimer, this.player.dashCooldown);
    setCD('touch-cd-q', this.player.timerQ, this.player.cdQ);
    setCD('touch-cd-e', this.player.timerE, this.player.cdE);
    setCD('touch-cd-r', this.player.timerR, this.player.cdR);

    const tLabelE = document.getElementById('t-label-e');
    if (tLabelE) {
      if (this.nearbyInteractable) {
        tLabelE.textContent = this.nearbyInteractable.type === 'ramen' ? '주문' : (this.nearbyInteractable.type === 'dungeon' ? '던전' : '뽑기');
      } else {
        tLabelE.textContent = 'E';
      }
    }

    // Coins in HUD
    const hudCoins = document.getElementById('hud-coins');
    if (hudCoins) hudCoins.textContent = (this.sessionCoins || 0).toLocaleString();

    // Relics in HUD
    this.updateRelicHUD();

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
    const rosterEl = document.getElementById('pause-build-list');

    if (this.isPaused) {
      if (rosterEl && this.player) {
        if (this.player.acquiredCards.length === 0) {
          rosterEl.innerHTML = `<div style="color:#94a3b8;font-size:12px;padding:12px;">아직 습득한 스킬 빌드 카드가 없습니다. 레벨업하여 카드를 획득하세요!</div>`;
        } else {
          rosterEl.innerHTML = this.player.acquiredCards.map(c => `
            <div class="roster-card">
              <span class="r-icon">${c.icon}</span>
              <div class="r-info">
                <span class="r-name">${c.name}</span>
                <span class="r-desc">${c.effect}</span>
              </div>
            </div>
          `).join('');
        }
      }
      pauseScreen.classList.add('active');
    } else {
      pauseScreen.classList.remove('active');
      this.lastTime = performance.now();
      requestAnimationFrame((t) => this.loop(t));
    }
  }

  spawnEnemy() {
    if (!this.player || this.gameMode === 'bossrush') return;

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
    else if (this.wave === 4) type = roll < 0.45 ? 'chimera' : (roll < 0.75 ? 'goblin' : 'bug');
    else if (this.wave === 5) type = roll < 0.55 ? 'dark_swarm' : (roll < 0.8 ? 'goblin' : 'lightning_beetle');
    else if (this.wave === 6) type = roll < 0.5 ? 'lightning_beetle' : (roll < 0.8 ? 'dark_swarm' : 'goblin');
    else if (this.wave === 7) type = roll < 0.45 ? 'iron_chimera' : (roll < 0.75 ? 'chimera' : 'dark_swarm');
    else if (this.wave === 8) type = roll < 0.45 ? 'iron_chimera' : (roll < 0.75 ? 'lightning_beetle' : 'dark_swarm');
    else if (this.wave === 9) type = roll < 0.4 ? 'iron_chimera' : (roll < 0.7 ? 'chimera' : 'goblin');
    else if (this.wave === 10) type = roll < 0.4 ? 'iron_chimera' : (roll < 0.7 ? 'dark_swarm' : 'lightning_beetle');
    else if (this.wave === 11) type = roll < 0.45 ? 'iron_chimera' : (roll < 0.75 ? 'chimera' : 'lightning_beetle');
    else type = roll < 0.35 ? 'iron_chimera' : (roll < 0.6 ? 'lightning_beetle' : (roll < 0.8 ? 'dark_swarm' : 'goblin'));

    this.enemies.push(new Enemy(x, y, type, this.wave, diff));
  }

  spawnBossRushBoss(phase) {
    if (!this.player || !this.isRunning) return;
    const px = this.player.x;
    const py = Math.max(120, this.player.y - 360);
    const diff = this.getDiffConfig();

    if (phase === 1) {
      this.enemies.push(new Enemy(px, py, 'chimera', 5, diff));
      this.showDangerBanner('Phase 1: 굶주린 원조 키메라!');
    } else if (phase === 2) {
      this.enemies.push(new Enemy(px, py, 'lightning_beetle', 8, diff));
      this.showDangerBanner('Phase 2: 질풍의 번개 풍뎅이!');
    } else if (phase === 3) {
      this.enemies.push(new Enemy(px, py, 'iron_chimera', 12, diff));
      this.showDangerBanner('Phase 3: 강철 가시 키메라!');
    } else if (phase === 4) {
      this.enemies.push(new Enemy(px - 150, py, 'midboss', 14, diff));
      this.enemies.push(new Enemy(px + 150, py, 'chimera', 14, diff));
      this.showDangerBanner('Phase 4: 맹화 & 키메라 듀오 습격!');
    } else if (phase === 5) {
      this.enemies.push(new Enemy(px - 160, py, 'iron_chimera', 18, diff));
      this.enemies.push(new Enemy(px + 160, py, 'lightning_beetle', 18, diff));
      this.showDangerBanner('Phase 5: 강철 & 낙뢰 더블 보스 결전!');
    } else if (phase >= 6) {
      this.enemies.push(new Enemy(px, py, 'boss', 20, diff));
      this.showDangerBanner('FINAL Phase: 진(眞) 거대 아노코 결전!!');
    }
    this.updateHUD();
  }

  spawnMidBoss(wave) {
    const x = this.player ? this.player.x : this.worldWidth / 2;
    const y = Math.max(100, (this.player ? this.player.y : this.worldHeight / 2) - 650);
    this.enemies.push(new Enemy(x, y, 'midboss', wave, this.getDiffConfig()));
    this.showDangerBanner(wave <= 4 ? '⚠️ 제1장 보스: 폭주하는 가시 키메라 출현!' : '⚠️ 제2장 보스: 돌연변이 쌍두 키메라 출현!');
  }

  spawnFinalBoss(wave) {
    const x = this.player ? this.player.x : this.worldWidth / 2;
    const y = Math.max(100, (this.player ? this.player.y : this.worldHeight / 2) - 650);
    this.enemies.push(new Enemy(x, y, 'boss', wave, this.getDiffConfig()));
    this.showDangerBanner('진(眞) 거대 아노코 출현!');
  }

  getNextMaxExp(level) {
    // Smooth gentle curve: prevents exponential stalling in mid-to-late game
    return Math.round(50 + level * 28 + Math.pow(level, 1.2) * 4);
  }

  addExp(amount) {
    const grade = StorageManager.getWeedingGrade();
    if (grade.rank <= 4) amount *= 1.15; // 4급 이상 특전: 경험치 +15%
    amount *= 1.35; // 빠른 스킬 빌드 육성 보정

    this.currentExp += amount;
    let scoreAdd = amount * 10 * this.getDiffConfig().scoreMult;
    if (this.comboCount >= 30) scoreAdd *= 1.5;
    else if (this.comboCount >= 10) scoreAdd *= 1.2;

    this.score += scoreAdd;
    if (this.currentExp >= this.maxExp && !this.isLevelingUp) {
      this.currentExp -= this.maxExp;
      this.level++;
      this.maxExp = this.getNextMaxExp(this.level);
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

    // Rich 28+ Card Level Up Pool with Elements & Evolutions
    const pool = [
      // ⚡ 번개 빌드 (Lightning)
      { id: 'lt_smite', elem: 'lightning', name: '낙뢰의 사스마타', icon: '⚡', effect: '2초마다 주변 적에게 번개 강타 (180 광역 피해)', tier: '⚡ 번개 무기', apply: () => { this.player.hasLightningSmite = true; } },
      { id: 'lt_chain', elem: 'lightning', name: '체인 라이트닝', icon: '⚡', effect: '공격 시 40% 확률로 주변 3마리에게 연쇄 감전', tier: '⚡ 번개 패시브', apply: () => { this.player.hasChainLightning = true; } },
      { id: 'lt_charge', elem: 'lightning', name: '번개 과부하', icon: '⚡', effect: '기본 공격 속도 +20% & 감전 적에게 추가 피해', tier: '⚡ 번개 패시브', apply: () => { this.player.attackCooldown *= 0.8; } },

      // 🔥 화염 빌드 (Fire)
      { id: 'fire_mine', elem: 'fire', name: '화염 도토리 지뢰', icon: '💣', effect: '이동 경로에 폭발 지뢰 매설 (220 폭발 & 화염 지속딜)', tier: '🔥 화염 무기', apply: () => { this.player.hasFireMines = true; } },
      { id: 'fire_bullet', elem: 'fire', name: '불타는 별빛 탄환', icon: '🔥', effect: '모든 공격이 적을 불태워 4초간 지속 피해', tier: '🔥 화염 패시브', apply: () => { this.player.damageMultiplier += 0.25; } },
      { id: 'fire_burst', elem: 'fire', name: '연쇄 열폭풍', icon: '💥', effect: '불타는 적 사망 시 사방으로 불꽃 파편 연쇄 폭발', tier: '🔥 화염 패시브', apply: () => { this.player.damageMultiplier += 0.2; } },

      // ❄️ 빙결 빌드 (Ice)
      { id: 'ice_orb', elem: 'ice', name: '서리바람 눈송이', icon: '❄️', effect: '회전하는 2개의 얼음 구체가 적을 둔화(40%) 및 타격', tier: '❄️ 빙결 무기', apply: () => { this.player.hasFrostOrb = true; } },
      { id: 'ice_shatter', elem: 'ice', name: '동결 분쇄', icon: '🧊', effect: '둔화/빙결된 적 공격 시 100% 크리티컬 & 2.5배 피해', tier: '❄️ 빙결 패시브', apply: () => { this.player.critMultiplier += 0.7; } },

      // 🍄 맹독 & 소환 빌드 (Poison & Familiar)
      { id: 'ps_cloud', elem: 'poison', name: '독버섯 안개 방출', icon: '🍄', effect: '주기적으로 주변에 맹독 안개 방출 (지속 도트딜 & 받는데미지 +25%)', tier: '🍄 맹독 무기', apply: () => { this.player.hasToxicCloud = true; } },
      { id: 'ps_familiar', elem: 'poison', name: '꼬마 포셰트 사스마타', icon: '🍙', effect: '0.85초마다 유도 사스마타를 쏘는 든든한 꼬마 친구 소환', tier: '🍙 소환수', apply: () => { this.player.hasFamiliar = true; } },

      // ⭐ 위성 & 방어 빌드 (Orbit & Defense)
      { id: 'orbit_stars', elem: 'orbit', name: '삼총사 별빛 위성', icon: '⭐', effect: '회전하는 3개의 별빛이 적 탄환을 방어하고 120 피해', tier: '⭐ 위성 방어', apply: () => { this.player.hasOrbitStars = true; } },
      { id: 'def_revive', elem: 'orbit', name: '불굴의 우정 (부활)', icon: '💖', effect: '사망 시 1회 50% 체력으로 즉시 부활 & 3초 무적', tier: '💖 불사', apply: () => { this.player.hasRevive = true; } },

      // 🎯 크리티컬 & 콤보 피버 (Crit & Berserk)
      { id: 'crit_hawk', elem: 'crit', name: '정밀 조준 안경', icon: '🎯', effect: '크리티컬 확률 +25% & 크리티컬 피해 2.2배 증폭', tier: '🎯 치명타', apply: () => { this.player.critChance += 0.25; this.player.critMultiplier += 0.5; } },
      { id: 'crit_fever', elem: 'crit', name: '콤보 피버 폭주', icon: '🔥', effect: '콤보 카운트마다 공격력 & 이동속도 무한 누적 증폭', tier: '🎯 피버', apply: () => { this.player.hasFeverBerserk = true; } },

      // ⚔️ 기본 강화 카드
      { id: 'dmg', elem: 'crit', name: '사스마타 연마', icon: '⚔️', effect: '공격력 +30% 영구 증가', tier: '공격', apply: () => (this.player.damageMultiplier += 0.3) },
      { id: 'spread', elem: 'crit', name: '멀티 스타 샷', icon: '🌟', effect: '발사 탄환 수 +1 추가', tier: '공격', apply: () => (this.player.bulletCount += 1) },
      { id: 'speed', elem: 'orbit', name: '포셰트 가방 장착', icon: '🎒', effect: '이동 속도 +18%', tier: '기동', apply: () => (this.player.speed *= 1.18) },
      { id: 'hp', elem: 'orbit', name: '수제 푸딩 한입', icon: '🍮', effect: '최대 체력 +40 및 즉시 60 회복', tier: '생존', apply: () => { this.player.maxHp += 40; this.player.hp = Math.min(this.player.maxHp, this.player.hp + 60); } },
      { id: 'pierce', elem: 'crit', name: '관통 사스마타', icon: '🗡️', effect: '탄환 관통 횟수 +1 증가', tier: '특수', apply: () => (this.player.pierce += 1) },
      { id: 'skillQ', elem: 'crit', name: '특대 스킬 강화', icon: '🌰', effect: 'Q 스킬 쿨타임 -25% & 데미지 +60', tier: '스킬', apply: () => { this.player.cdQ *= 0.75; } },
      { id: 'leech', elem: 'poison', name: '하치와레의 긍정 기운', icon: '💖', effect: '적 처치 시 12% 확률로 체력 12 회복', tier: '생존', apply: () => (this.player.lifesteal += 0.12) },
      { id: 'shield', elem: 'orbit', name: '철갑 거북 등껍질', icon: '🛡️', effect: '적의 공격을 1회 막아주는 보호막 획득', tier: '생존', apply: () => (this.player.hasShield = true) },
      { id: 'magnet', elem: 'orbit', name: '대형 별사탕 자석', icon: '🧲', effect: '화면의 모든 경험치와 아이템 즉시 흡수', tier: '특수', apply: () => {
        this.expGems.forEach(g => { g.x = this.player.x; g.y = this.player.y; });
        this.fieldItems.forEach(i => { i.x = this.player.x; i.y = this.player.y; });
      }}
    ];

    // Check for Evolutions
    if (this.player.elementCounts.lightning >= 2 && !this.player.hasEvoLightning) {
      pool.unshift({ id: 'evo_lt', elem: 'evolution', name: '🌟 [각성] 천벌의 뇌신 강림', icon: '⚡', effect: '낙뢰 주기 1초로 단축 & 320 피해 및 광역 기절', tier: '🌟 궁극 진화', apply: () => { this.player.hasEvoLightning = true; this.player.damageMultiplier += 0.4; } });
    }
    if (this.player.elementCounts.fire >= 2 && !this.player.hasEvoFire) {
      pool.unshift({ id: 'evo_fire', elem: 'evolution', name: '🌟 [각성] 지옥불 카타클리즘', icon: '🔥', effect: '화염 지뢰 피해 360 증가 및 지속 화염 폭풍 생성', tier: '🌟 궁극 진화', apply: () => { this.player.hasEvoFire = true; this.player.damageMultiplier += 0.4; } });
    }
    if (this.player.elementCounts.ice >= 2 && !this.player.hasEvoIce) {
      pool.unshift({ id: 'evo_ice', elem: 'evolution', name: '🌟 [각성] 절대영도 블리자드', icon: '❄️', effect: '얼음 구체 피해 2배 & 둔화 적에게 모든 피해 2.5배', tier: '🌟 궁극 진화', apply: () => { this.player.hasEvoIce = true; this.player.damageMultiplier += 0.4; } });
    }
    if (this.player.elementCounts.poison >= 2 && !this.player.hasEvoPoison) {
      pool.unshift({ id: 'evo_ps', elem: 'evolution', name: '🌟 [각성] 역병 군주 각성', icon: '🍄', effect: '맹독 지속시간 2배 & 중독된 적 사망 시 연쇄 독폭발', tier: '🌟 궁극 진화', apply: () => { this.player.hasEvoPoison = true; this.player.damageMultiplier += 0.4; } });
    }

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    this.currentUpgradeCards = shuffled.slice(0, 3);

    const container = document.getElementById('cards-container');
    container.innerHTML = '';

    this.currentUpgradeCards.forEach((card, idx) => {
      const cardEl = document.createElement('div');
      cardEl.className = 'card-item';
      cardEl.dataset.elem = card.elem || 'crit';
      cardEl.innerHTML = `
        <div class="card-key-badge">[${idx + 1}]</div>
        <div class="card-elem-tag">${card.tier}</div>
        <div class="card-icon">${card.icon}</div>
        <div class="card-name">${card.name}</div>
        <div class="card-effect">${card.effect}</div>
      `;
      cardEl.addEventListener('click', () => this.selectLevelUpCard(idx));
      container.appendChild(cardEl);
    });

    document.getElementById('levelup-modal').classList.add('active');
  }

  selectLevelUpCard(idx) {
    if (!this.isLevelingUp || !this.currentUpgradeCards || !this.currentUpgradeCards[idx]) return;
    const card = this.currentUpgradeCards[idx];
    card.apply();

    // Record acquired card & update element counters
    this.player.acquiredCards.push(card);
    if (card.elem && this.player.elementCounts[card.elem] !== undefined) {
      this.player.elementCounts[card.elem]++;
    }

    this.isLevelingUp = false;
    document.getElementById('levelup-modal').classList.remove('active');
    this.updateHUD();

    // If accumulated enough EXP for another level up while picking cards, immediately trigger next!
    if (this.currentExp >= this.maxExp) {
      this.currentExp -= this.maxExp;
      this.level++;
      this.maxExp = this.getNextMaxExp(this.level);
      this.triggerLevelUp();
      return;
    }

    this.lastTime = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  gameOver() {
    this.isRunning = false;
    const totalCoins = StorageManager.addCoins(this.sessionCoins);
    StorageManager.saveRecords(this.score, this.kills, this.wave, this.difficulty, false);
    StorageManager.saveModeRecords(this.gameMode, {
      time: Math.round(this.gameTime),
      kills: this.kills,
      wave: this.wave,
      cleared: false
    });
    if (this.gameMode === 'endless') {
      StorageManager.updateQuestProgress('q_endless', Math.round(this.gameTime));
    }
    this.updateRecordDisplay();
    this.updateStartScreenExamInfo();

    document.getElementById('stat-time').textContent = this.formatTime(this.gameTime);
    document.getElementById('stat-wave').textContent = `${this.wave} / ${this.maxCampaignWave}`;
    document.getElementById('stat-kills').textContent = this.kills;
    document.getElementById('stat-score').textContent = Math.round(this.score).toLocaleString();
    const statCoins = document.getElementById('stat-coins');
    if (statCoins) statCoins.textContent = `+${this.sessionCoins.toLocaleString()} 🪙`;
    const statTotalCoins = document.getElementById('stat-total-coins');
    if (statTotalCoins) statTotalCoins.textContent = totalCoins.toLocaleString();

    document.getElementById('gameover-screen').classList.add('active');
  }

  victory() {
    this.isRunning = false;
    Sound.playRelicFanfare();
    const totalCoins = StorageManager.addCoins(this.sessionCoins);
    StorageManager.saveRecords(this.score, this.kills, this.wave, this.difficulty, true);
    StorageManager.saveModeRecords(this.gameMode, {
      time: Math.round(this.gameTime),
      kills: this.kills,
      wave: this.wave,
      cleared: true
    });
    if (this.gameMode === 'bossrush') {
      StorageManager.updateQuestProgress('q_bossrush', 1);
    }
    if (this.gameMode === 'endless') {
      StorageManager.updateQuestProgress('q_endless', Math.round(this.gameTime));
    }
    this.updateRecordDisplay();
    this.updateStartScreenExamInfo();

    document.getElementById('vstat-time').textContent = this.formatTime(this.gameTime);
    document.getElementById('vstat-kills').textContent = this.kills;
    document.getElementById('vstat-score').textContent = Math.round(this.score).toLocaleString();
    const vstatCoins = document.getElementById('vstat-coins');
    if (vstatCoins) vstatCoins.textContent = `+${this.sessionCoins.toLocaleString()} 🪙`;
    const vstatTotalCoins = document.getElementById('vstat-total-coins');
    if (vstatTotalCoins) vstatTotalCoins.textContent = totalCoins.toLocaleString();

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

    // Stable, smooth camera tracking centered on player (Zero motion sickness/sway)
    const targetCamX = this.player.x - this.canvas.width / 2;
    const targetCamY = this.player.y - this.canvas.height / 2;
    this.camera.x += (targetCamX - this.camera.x) * 0.15;
    this.camera.y += (targetCamY - this.camera.y) * 0.15;
    this.camera.x = Math.max(0, Math.min(this.worldWidth - this.canvas.width, this.camera.x));
    this.camera.y = Math.max(0, Math.min(this.worldHeight - this.canvas.height, this.camera.y));

    // Update Sakura Particles
    this.sakuraParticles.forEach(p => p.update(dt));

    // --- Dungeon or Surface Progression Loop ---
    if (this.inDungeon) {
      this.dungeonTimer -= dt;
      if (this.dungeonTimer <= 0) {
        this.completeUndergroundDungeon();
        return;
      }

      // Constrain player strictly inside underground chamber arena bounds [2140, 2860]
      this.player.x = Math.max(2140, Math.min(2860, this.player.x));
      this.player.y = Math.max(2140, Math.min(2860, this.player.y));

      // Update Dungeon Top HUD
      const timerEl = document.getElementById('dungeon-timer-text');
      const fillEl = document.getElementById('dungeon-progress-fill');
      const coinsEl = document.getElementById('dungeon-coins-text');
      const statusEl = document.getElementById('dungeon-status-text');
      if (timerEl) timerEl.textContent = `⏳ ${Math.max(0, this.dungeonTimer).toFixed(1)}s`;
      if (fillEl) fillEl.style.width = `${Math.max(0, Math.min(100, (this.dungeonTimer / this.dungeonMaxTime) * 100))}%`;
      if (coinsEl) coinsEl.textContent = `🪙 획득 코인: +${this.dungeonCoinsGained}`;
      if (statusEl) {
        if (this.dungeonGolemSpawned) statusEl.textContent = '⚠️ 고대 수호 골렘을 토벌하세요!';
        else statusEl.textContent = '황금 도굴꾼을 소탕하세요!';
      }

      // Keep spawning Golden Goblins
      const goblinCount = this.enemies.filter(e => e.type === 'golden_goblin').length;
      if (goblinCount < 7 && Math.random() < 0.09) {
        const a = Math.random() * Math.PI * 2;
        const r = 160 + Math.random() * 150;
        const gx = 2500 + Math.cos(a) * r;
        const gy = 2500 + Math.sin(a) * r;
        this.enemies.push(new Enemy(gx, gy, 'golden_goblin', this.wave, this.getDiffConfig()));
      }

      // Spawn Ancient Golem Mini-Boss at <= 30 seconds
      if (this.dungeonTimer <= 30.0 && !this.dungeonGolemSpawned) {
        this.dungeonGolemSpawned = true;
        this.enemies.push(new Enemy(2500, 2400, 'ancient_golem', this.wave, this.getDiffConfig()));
        this.showDangerBanner('🏛️ 고대 지하 수호 골렘 강림!');
        Sound.playBossWarning();
        this.damageTexts.push(new DamageText(2500, 2350, '⚠️ 고대 수호 골렘 등장!', '#c084fc', true));
      }

      // Constrain enemies inside dungeon room
      for (let e of this.enemies) {
        e.x = Math.max(2130, Math.min(2870, e.x));
        e.y = Math.max(2130, Math.min(2870, e.y));
      }
    } else {
      // Surface Wave Progression
      this.waveTimer += dt;
      if (this.waveTimer >= this.waveDuration && this.wave < this.maxCampaignWave) {
        this.waveTimer = 0;
        this.wave++;
        this.damageTexts.push(new DamageText(this.player.x, this.player.y - 45, `🌸 WAVE ${this.wave} 시작! 🌸`, '#f59e0b', true));

        if (this.wave === 4 || this.wave === 8) {
          this.spawnMidBoss(this.wave);
        } else if (this.wave === this.maxCampaignWave) {
          this.spawnFinalBoss(this.wave);
        }
      }

      // Spawn Dungeon Portal periodically on surface (Wave 3, 7, 10 or every 110s in endless)
      if ((this.wave === 3 || this.wave === 7 || this.wave === 10) && !this.dungeonPortalSpawnedWaves.has(this.wave)) {
        this.dungeonPortalSpawnedWaves.add(this.wave);
        this.spawnDungeonPortal();
      } else if (this.gameMode === 'endless') {
        this.dungeonSpawnTimer += dt;
        if (this.dungeonSpawnTimer >= 110) {
          this.dungeonSpawnTimer = 0;
          this.spawnDungeonPortal();
        }
      }

      // Update Surface Dungeon Portals
      for (let i = this.dungeonPortals.length - 1; i >= 0; i--) {
        const p = this.dungeonPortals[i];
        p.update(dt, this.particles);
        if (p.life <= 0) {
          this.dungeonPortals.splice(i, 1);
        }
      }

      // Surface Monster Spawning
      const maxMobs = 24 + this.wave * 3;
      if (this.enemies.length < maxMobs && Math.random() < 0.08 + this.wave * 0.005) {
        this.spawnEnemy();
      }

      // Sanctuary Zone Check
      this.sanctuaries.forEach(s => {
        const dist = Math.hypot(this.player.x - s.x, this.player.y - s.y);

        if (dist < s.radius && !s.bossSpawned && !s.bossDefeated) {
          s.bossSpawned = true;
          this.enemies.push(new Enemy(s.x, s.y - 60, s.bossType, this.wave, this.getDiffConfig()));
          this.showDangerBanner(`${s.name} 수호 보스 출현!`);
        }

        if (dist < s.chestRadius + this.player.radius && s.bossDefeated && !s.chestOpened) {
          s.chestOpened = true;
          this.player.relicsCount++;
          Sound.playRelicFanfare();
          this.addSessionCoins(80);
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 50, `🏆 ${s.relicName} & 80 🪙 획득!`, '#facc15', true));

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

      // Update Interactive Weed Patches (제초 검정)
      for (let i = 0; i < this.weedPatches.length; i++) {
        this.weedPatches[i].update(dt, this.player, this);
      }

      // 🌟 Update Stage 3 World Landmarks (Ramen, Hot Spring, Gacha)
      if (this.ramenShop) this.ramenShop.update(dt, this.particles);
      if (this.hotSpring) this.hotSpring.update(dt, this.player, this.damageTexts, this.particles);
      if (this.gachaMachines) this.gachaMachines.forEach(g => g.update(dt, this.particles));

      // 🎲 Dynamic Field Random Events Progression
      if (!this.activeEvent) {
        this.eventTimer += dt;
        if (this.eventTimer >= this.nextEventInterval) {
          this.eventTimer = 0;
          this.triggerRandomEvent();
        }
      } else {
        this.activeEventTimer -= dt;
        const eHud = document.getElementById('event-hud');
        const timerEl = document.getElementById('event-timer-text');
        const fillEl = document.getElementById('event-progress-fill');
        if (timerEl) timerEl.textContent = `⏳ ${Math.max(0, this.activeEventTimer).toFixed(1)}s`;
        if (fillEl) fillEl.style.width = `${Math.max(0, Math.min(100, (this.activeEventTimer / this.activeEventDuration) * 100))}%`;

        // Event Continuous Effects
        if (this.activeEvent === 'sakura_fever') {
          if (Math.random() < 0.35) {
            const a = Math.random() * Math.PI * 2;
            const r = 20 + Math.random() * 80;
            this.particles.push(new Particle(this.player.x + Math.cos(a) * r, this.player.y + Math.sin(a) * r, 0, -1.2, 7, '#f472b6', 0.5, 'star'));
          }
          // Whole-screen super magnet
          this.expGems.forEach(g => {
            const dx = this.player.x - g.x;
            const dy = this.player.y - g.y;
            const dist = Math.hypot(dx, dy) || 1;
            g.x += (dx / dist) * 14 * dt * 60;
            g.y += (dy / dist) * 14 * dt * 60;
          });
        } else if (this.activeEvent === 'thunderstorm') {
          this.thunderstormStrikeTimer += dt;
          if (this.thunderstormStrikeTimer >= 1.4 && this.enemies.length > 0) {
            this.thunderstormStrikeTimer = 0;
            for (let k = 0; k < 2; k++) {
              const target = this.enemies[Math.floor(Math.random() * this.enemies.length)];
              if (target) {
                Sound.playLightning();
                target.hp -= 320;
                target.hitTimer = 0.15;
                target.blindTimer = 1.5;
                this.lightningBolts.push(new LightningBolt(target.x + (Math.random() - 0.5) * 60, target.y - 500, target.x, target.y, '#facc15', 7));
                this.damageTexts.push(new DamageText(target.x, target.y - 30, '⚡ 320 [천둥벼락!]', '#facc15', true));
              }
            }
          }
        } else if (this.activeEvent === 'elite_bounty') {
          if (this.activeBountyEnemy && this.activeBountyEnemy.hp <= 0) {
            Sound.playRelicFanfare();
            this.addSessionCoins(150);
            this.player.damageMultiplier += 0.10;
            this.player.maxHp += 25;
            this.player.hp = this.player.maxHp;
            this.damageTexts.push(new DamageText(this.player.x, this.player.y - 55, '👑 현상수배 완수! +150🪙 & 전스탯 +10% 각성!', '#facc15', true));
            this.showDangerBanner('👑 [현상수배 완수] 정예 키메라를 토벌했습니다!');
            this.activeBountyEnemy = null;
            this.activeEventTimer = 0;
          }
        }

        if (this.activeEventTimer <= 0) {
          this.activeEvent = null;
          this.activeBountyEnemy = null;
          if (eHud) eHud.style.display = 'none';
          this.eventTimer = 0;
          this.nextEventInterval = 36 + Math.random() * 12;
        }
      }

      // Update Airdrop Crates
      for (let i = this.airdropCrates.length - 1; i >= 0; i--) {
        const c = this.airdropCrates[i];
        c.update(dt, this.player, this);
        if (c.opened || c.life <= 0) {
          this.airdropCrates.splice(i, 1);
        }
      }

      // Update Festival Balloons
      for (let i = this.festivalBalloons.length - 1; i >= 0; i--) {
        const b = this.festivalBalloons[i];
        b.update(dt, this.player, this.projectiles, this);
        if (b.popped || b.life <= 0) {
          this.festivalBalloons.splice(i, 1);
        }
      }
    }

    // Landmark & Portal Proximity Prompt Check
    let foundInteractable = null;
    if (!this.inDungeon) {
      if (this.ramenShop) {
        const rd = Math.hypot(this.player.x - this.ramenShop.x, this.player.y - this.ramenShop.y);
        if (rd < this.ramenShop.interactRadius) {
          foundInteractable = { type: 'ramen', target: this.ramenShop, label: '🍜 [E] 라멘 주문하기 (Open Shop)' };
        }
      }
      if (!foundInteractable && this.gachaMachines) {
        for (let g of this.gachaMachines) {
          const gd = Math.hypot(this.player.x - g.x, this.player.y - g.y);
          if (gd < g.interactRadius) {
            foundInteractable = { type: 'gacha', target: g, label: '🎰 [E] 캡슐 자판기 뽑기 [20🪙]' };
            break;
          }
        }
      }
      if (!foundInteractable && this.dungeonPortals) {
        for (let p of this.dungeonPortals) {
          const pd = Math.hypot(this.player.x - p.x, this.player.y - p.y);
          if (pd < p.interactRadius) {
            foundInteractable = { type: 'dungeon', target: p, label: '🏛️ [E] 고대 지하 던전 성소 진입 (45초 타임어택 도전)' };
            break;
          }
        }
      }
    }
    this.nearbyInteractable = foundInteractable;
    const promptEl = document.getElementById('interact-prompt');
    const promptLabel = document.getElementById('interact-label');
    if (promptEl && promptLabel) {
      if (foundInteractable && !this.isShopping) {
        promptLabel.textContent = foundInteractable.label;
        promptEl.style.display = 'flex';
      } else {
        promptEl.style.display = 'none';
      }
    }

    // Fever Mode Timer & Trail Particles
    if (this.feverTimer > 0) {
      this.feverTimer -= dt;
      if (this.feverTimer <= 0) {
        this.feverTimer = 0;
        const feverEl = document.getElementById('fever-overlay');
        if (feverEl) feverEl.classList.remove('active');
      } else if (Math.random() < 0.45 && this.player) {
        const feverColors = ['#ff4081', '#facc15', '#38bdf8', '#a855f7', '#10b981'];
        const col = feverColors[Math.floor(Math.random() * feverColors.length)];
        this.particles.push(new Particle(this.player.x + (Math.random() * 24 - 12), this.player.y + (Math.random() * 24 - 12), (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3, 7, col, 0.35, 'star'));
      }
    }

    // Player Shooting & Update
    const wm = this.screenToWorld(this.mouse.x, this.mouse.y);
    if (this.mouse.isDown || this.touchAttacking) {
      let targetX = wm.x;
      let targetY = wm.y;
      if (this.touchAttacking && this.enemies.length > 0) {
        let nearest = null;
        let minD = 650;
        for (let e of this.enemies) {
          const d = Math.hypot(e.x - this.player.x, e.y - this.player.y);
          if (d < minD) { minD = d; nearest = e; }
        }
        if (nearest) {
          targetX = nearest.x;
          targetY = nearest.y;
        } else if (this.player.joystickVector && (this.player.joystickVector.x !== 0 || this.player.joystickVector.y !== 0)) {
          targetX = this.player.x + this.player.joystickVector.x * 250;
          targetY = this.player.y + this.player.joystickVector.y * 250;
        }
      }
      this.player.shoot(targetX, targetY, this.projectiles, this.particles);
    }

    this.player.update(
      dt, this.keys, wm.x, wm.y, this.particles, this.grenades, this.boomerangs, this.meteors,
      this.worldWidth, this.worldHeight, this.enemies, this.damageTexts, this.fireMines, this.projectiles
    );

    // Update Fire Mines
    for (let i = this.fireMines.length - 1; i >= 0; i--) {
      const mine = this.fireMines[i];
      mine.update(dt, this.enemies, this.particles, this.damageTexts);
      if (mine.exploded || mine.life <= 0) {
        this.fireMines.splice(i, 1);
      }
    }

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
          e.applyKnockback(b.x, b.y, 8);
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
            e.applyKnockback(m.targetX, m.targetY, 14);
            this.damageTexts.push(new DamageText(e.x, e.y, Math.round(m.damage), '#ff4500', true));
          }
        });
        this.meteors.splice(i, 1);
      }
    }

    // Update Field Items
    for (let i = this.fieldItems.length - 1; i >= 0; i--) {
      const item = this.fieldItems[i];
      item.update(dt, this.player.x, this.player.y, this.player.magnetMultiplier || 1.0);

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

            // Calculate Crit
            const isCrit = Math.random() < this.player.critChance;
            const finalDmg = isCrit ? p.damage * this.player.critMultiplier : p.damage;

            enemy.hp -= finalDmg;
            enemy.hitTimer = 0.12;
            enemy.applyKnockback(p.x, p.y, isCrit ? 10 : 5.5);

            if (isCrit) {
              Sound.playCritHit();
            } else {
              Sound.playHit();
            }

            // Chain Lightning perk
            if (this.player.hasChainLightning && Math.random() < 0.4) {
              Sound.playLightning();
              let chains = 0;
              this.enemies.forEach(other => {
                if (other !== enemy && chains < 3) {
                  const cd = Math.hypot(other.x - enemy.x, other.y - enemy.y);
                  if (cd < 240) {
                    chains++;
                    other.hp -= 75 * this.player.damageMultiplier;
                    other.hitTimer = 0.1;
                    this.lightningBolts.push(new LightningBolt(enemy.x, enemy.y, other.x, other.y, '#facc15', 5));
                    this.particles.push(new Particle(other.x, other.y, 0, 0, 8, '#fef08a', 0.25, 'lightning'));
                  }
                }
              });
            }

            // Usagi Wand relic
            if (this.player.relics.includes('relic_wand') && Math.random() < 0.25) {
              Sound.playLightning();
              enemy.hp -= 110 * this.player.damageMultiplier;
              this.lightningBolts.push(new LightningBolt(enemy.x + (Math.random() - 0.5) * 40, enemy.y - 450, enemy.x, enemy.y, '#c084fc', 6.5));
              this.particles.push(new Particle(enemy.x, enemy.y, 0, 0, 9, '#e9d5ff', 0.3, 'lightning'));
            }

            // Spicy Ramen relic
            if (this.player.hasSpicyRamen && Math.random() < 0.35) {
              Sound.playExplosion();
              this.particles.push(new Particle(enemy.x, enemy.y, 0, 0, 65, '#ef4444', 0.35, 'ring'));
              this.enemies.forEach(other => {
                if (Math.hypot(other.x - enemy.x, other.y - enemy.y) < 65) {
                  other.hp -= 80 * this.player.damageMultiplier;
                  other.burnTimer = 3.0;
                }
              });
            }

            if (this.settings.damageText) {
              this.damageTexts.push(new DamageText(enemy.x, enemy.y, Math.round(finalDmg), isCrit ? '#f59e0b' : p.color, isCrit));
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
          if (this.player.charType === 'rakko' && this.player.parryTimer > 0) {
            this.player.parryTimer = 0;
            this.player.invulnerableTimer = 0.8;
            Sound.playCritHit();
            this.screenShake = 10;
            this.damageTexts.push(new DamageText(this.player.x, this.player.y - 40, '⚡ 완벽 패링 반격 (520)!', '#38bdf8', true));
            this.enemies.forEach(e => {
              const cd = Math.hypot(e.x - this.player.x, e.y - this.player.y);
              if (cd < 260) {
                e.hp -= 520 * this.player.damageMultiplier;
                e.hitTimer = 0.2;
              }
            });
            this.player.say("완벽한 패링이다.", true);
            this.projectiles.splice(i, 1);
            continue;
          }

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
          const hitQuote = this.player.charType === 'usagi' ? "우뺘-!!" : (this.player.charType === 'hachiware' ? "으앗... 조심해!" : (this.player.charType === 'kurimanju' ? "끄으윽...!" : (this.player.charType === 'momonga' ? "아얏! 아프잖아!" : "후에에엥-!!")));
          this.player.say(hitQuote, true);

          this.projectiles.splice(i, 1);
          if (this.player.hp <= 0) {
            if (this.player.hasRevive) {
              this.player.hasRevive = false;
              this.player.hp = this.player.maxHp * (this.player.reviveHpPercent || 0.5);
              this.player.invulnerableTimer = 3.0;
              this.damageTexts.push(new DamageText(this.player.x, this.player.y - 40, '💖 불굴의 우정 부활!', '#ec4899', true));
            } else {
              this.gameOver();
              return;
            }
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
            enemy.applyKnockback(g.targetX, g.targetY, 12);
            this.damageTexts.push(new DamageText(enemy.x, enemy.y, Math.round(g.damage), '#ff9800', true));
          }
        });
        this.grenades.splice(i, 1);
      }
    }

    // Update Enemies & Check Death
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(dt, this.player, this.projectiles, this.shockwaves, this.particles, this.enemies);

      const dist = Math.hypot(enemy.x - this.player.x, enemy.y - this.player.y);
      if (dist < enemy.radius + this.player.radius && this.player.invulnerableTimer <= 0) {
        if (this.player.charType === 'rakko' && this.player.parryTimer > 0) {
          this.player.parryTimer = 0;
          this.player.invulnerableTimer = 0.8;
          Sound.playCritHit();
          this.screenShake = 10;
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 40, '⚡ 완벽 패링 반격 (520)!', '#38bdf8', true));
          this.enemies.forEach(e => {
            const cd = Math.hypot(e.x - this.player.x, e.y - this.player.y);
            if (cd < 260) {
              e.hp -= 520 * this.player.damageMultiplier;
              e.hitTimer = 0.2;
            }
          });
          this.player.say("완벽한 패링이다.", true);
        } else if (this.player.hasShield) {
          this.player.hasShield = false;
          this.damageTexts.push(new DamageText(this.player.x, this.player.y, `🛡️ 보호막 방어!`, '#38bdf8', true));
        } else {
          this.player.hp -= enemy.damage;
          this.player.invulnerableTimer = 0.35;
          this.screenShake = 6;
          Sound.playHit();
          this.damageTexts.push(new DamageText(this.player.x, this.player.y, `-${enemy.damage}`, '#ef4444', true));
          const contactQuote = this.player.charType === 'usagi' ? "하아?!" : (this.player.charType === 'hachiware' ? "으앗! 치이카와, 뒤로 물러서!" : (this.player.charType === 'kurimanju' ? "크으윽...!" : (this.player.charType === 'momonga' ? "으앙! 저리 가!" : "후에에에-!!")));
          this.player.say(contactQuote, true);

          if (this.player.hp <= 0) {
            if (this.player.hasRevive) {
              this.player.hasRevive = false;
              this.player.hp = this.player.maxHp * (this.player.reviveHpPercent || 0.5);
              this.player.invulnerableTimer = 3.0;
              this.damageTexts.push(new DamageText(this.player.x, this.player.y - 40, '💖 불굴의 우정 부활!', '#ec4899', true));
            } else {
              this.gameOver();
              return;
            }
          }
        }
      }

      if (enemy.hp <= 0) {
        this.kills++;
        this.comboCount++;
        this.comboTimer = 2.5;

        // Daily Quest Progress tracking
        if (enemy.type === 'bug' || enemy.type === 'lightning_beetle') {
          StorageManager.updateQuestProgress('q_bugs', 1);
        }
        if (enemy.type === 'chimera' || enemy.type === 'midboss' || enemy.type === 'iron_chimera' || enemy.type.startsWith('sanctuary_boss') || enemy.type === 'boss') {
          StorageManager.updateQuestProgress('q_midboss', 1);
        }

        // Add coins on kill
        let mobCoins = (enemy.type === 'boss') ? 250 : 
          (enemy.type === 'golden_goblin' ? (15 + Math.floor(Math.random() * 10)) :
          (enemy.type === 'ancient_golem' ? 80 :
          (enemy.type.includes('boss') || enemy.type.startsWith('sanctuary_boss') ? 50 : 
          (enemy.type === 'iron_chimera' ? 12 : (Math.random() < 0.4 ? 2 : 1)))));
        
        // 🍺 Goblet Relic Bonus
        if (this.player.relics.includes('relic_goblet') && Math.random() < 0.2) {
          mobCoins += 2;
          this.player.hp = Math.min(this.player.maxHp, this.player.hp + 3);
          this.damageTexts.push(new DamageText(this.player.x, this.player.y - 20, '+3 HP [안주잔]', '#d97706', false));
        }

        const finalCoins = this.addSessionCoins(mobCoins);
        if (this.inDungeon) {
          this.dungeonCoinsGained += finalCoins;
        }

        if (enemy.type === 'golden_goblin') {
          this.damageTexts.push(new DamageText(enemy.x, enemy.y - 25, `+${finalCoins} 🪙 도굴꾼 처치!`, '#facc15', true));
        } else if (enemy.type === 'ancient_golem') {
          this.damageTexts.push(new DamageText(enemy.x, enemy.y - 35, `🏛️ 고대 수호 골렘 토벌! +${finalCoins} 🪙`, '#c084fc', true));
          this.fieldItems.push(new FieldItem(enemy.x, enemy.y, 'pudding'));
          this.fieldItems.push(new FieldItem(enemy.x + 30, enemy.y, 'shield'));
        }

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

        // 👑 Crown Relic Bonus for XP
        const xpMult = this.player.relics.includes('relic_crown') ? 1.4 : 1.0;
        this.expGems.push(new ExpGem(enemy.x, enemy.y, Math.round(enemy.xp * xpMult)));

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

        if (enemy.type === 'boss' && this.gameMode !== 'bossrush') {
          this.victory();
          return;
        }

        this.enemies.splice(i, 1);

        // Boss Rush Mode Phase Progression
        if (this.gameMode === 'bossrush') {
          const livingBosses = this.enemies.filter(e => e.hp > 0).length;
          if (livingBosses === 0) {
            if (this.bossRushPhase >= this.bossRushTotalPhases) {
              this.victory();
              return;
            } else {
              Sound.playRelicFanfare();
              this.damageTexts.push(new DamageText(this.player.x, this.player.y - 50, `💀 Phase ${this.bossRushPhase} 격파! (+50 HP & 150 🪙)`, '#10b981', true));
              this.player.hp = Math.min(this.player.maxHp, this.player.hp + 50);
              this.addSessionCoins(150);
              this.triggerLevelUp();
              this.bossRushPhase++;
              const nextPhase = this.bossRushPhase;
              setTimeout(() => {
                if (this.isRunning && !this.isPaused) {
                  this.spawnBossRushBoss(nextPhase);
                }
              }, 3500);
            }
          }
        }
      }
    }

    // Update XP Gems
    for (let i = this.expGems.length - 1; i >= 0; i--) {
      const gem = this.expGems[i];
      gem.update(dt, this.player.x, this.player.y, this.player.magnetMultiplier || 1.0);

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

    for (let i = this.lightningBolts.length - 1; i >= 0; i--) {
      this.lightningBolts[i].update(dt);
      if (this.lightningBolts[i].life <= 0) this.lightningBolts.splice(i, 1);
    }

    for (let i = this.slashWaves.length - 1; i >= 0; i--) {
      this.slashWaves[i].update(dt);
      if (this.slashWaves[i].life <= 0) this.slashWaves.splice(i, 1);
    }

    // Memory & Object safety caps (prevents GC spikes)
    if (this.particles.length > 250) {
      this.particles.splice(0, this.particles.length - 250);
    }
    if (this.damageTexts.length > 60) {
      this.damageTexts.splice(0, this.damageTexts.length - 60);
    }

    if (this.screenShake > 0) {
      this.screenShake = Math.max(0, this.screenShake - dt * 35);
    }

    this.updateHUD();
  }

  draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (this.screenShake > 0 && this.settings.screenShake) {
      const clamped = Math.min(2.0, this.screenShake * 0.15);
      const sx = (Math.random() - 0.5) * clamped;
      const sy = (Math.random() - 0.5) * clamped;
      this.ctx.translate(sx, sy);
    }

    // Camera transform for World Rendering
    this.ctx.save();
    this.ctx.translate(-this.camera.x, -this.camera.y);

    this.drawBackground();

    // Viewport Frustum Culling bounds
    const viewLeft = this.camera.x - 120;
    const viewRight = this.camera.x + this.canvas.width + 120;
    const viewTop = this.camera.y - 120;
    const viewBottom = this.camera.y + this.canvas.height + 120;
    const inView = (obj) => obj.x >= viewLeft && obj.x <= viewRight && obj.y >= viewTop && obj.y <= viewBottom;

    // Draw Sanctuaries & Chests
    this.sanctuaries.forEach(s => s.draw(this.ctx, this.camera));

    // 🌟 Draw Stage 3 Landmarks (Hot Spring, Ramen Shop, Gacha)
    if (this.hotSpring && inView(this.hotSpring)) this.hotSpring.draw(this.ctx);
    if (this.ramenShop && inView(this.ramenShop)) this.ramenShop.draw(this.ctx);
    if (this.gachaMachines) this.gachaMachines.forEach(g => { if (inView(g)) g.draw(this.ctx); });

    // Draw Surface Ancient Dungeon Portals (Culled)
    if (!this.inDungeon && this.dungeonPortals) {
      this.dungeonPortals.forEach(p => { if (inView(p)) p.draw(this.ctx); });
    }

    // Draw Weed Patches (Culled)
    this.weedPatches.forEach((weed) => { if (inView(weed)) weed.draw(this.ctx); });

    // World Map Decorations (Culled)
    this.ctx.font = '22px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.decorations.forEach(dec => {
      if (dec.x > viewLeft && dec.x < viewRight && dec.y > viewTop && dec.y < viewBottom) {
        this.ctx.fillText(dec.emoji, dec.x, dec.y);
      }
    });

    // Culled Entity Rendering (Saves 300%+ Canvas draw overhead)
    this.expGems.forEach((gem) => { if (inView(gem)) gem.draw(this.ctx); });
    this.fieldItems.forEach((item) => { if (inView(item)) item.draw(this.ctx); });
    this.fireMines.forEach((mine) => { if (inView(mine)) mine.draw(this.ctx); });
    this.airdropCrates.forEach((crate) => { if (inView(crate)) crate.draw(this.ctx); });
    this.festivalBalloons.forEach((balloon) => { if (inView(balloon)) balloon.draw(this.ctx); });
    this.shockwaves.forEach((sw) => { if (inView(sw)) sw.draw(this.ctx); });
    this.enemies.forEach((enemy) => { if (inView(enemy)) enemy.draw(this.ctx); });
    this.grenades.forEach((g) => { if (inView(g)) g.draw(this.ctx); });
    this.boomerangs.forEach((b) => { if (inView(b)) b.draw(this.ctx); });
    this.meteors.forEach((m) => { if (inView(m)) m.draw(this.ctx); });
    this.projectiles.forEach((p) => { if (inView(p)) p.draw(this.ctx); });

    if (this.player.isFiringLaser) {
      this.drawMegaLaser();
    }

    if (this.player) {
      this.player.draw(this.ctx);
    }

    this.particles.forEach((pt) => { if (inView(pt)) pt.draw(this.ctx); });
    this.slashWaves.forEach((sw) => { if (inView(sw)) sw.draw(this.ctx); });
    this.lightningBolts.forEach((lb) => lb.draw(this.ctx));
    this.damageTexts.forEach((dt) => { if (inView(dt)) dt.draw(this.ctx); });

    // Sakura atmosphere petals (Culled)
    if (this.settings.highParticles) {
      this.sakuraParticles.forEach(sp => {
        if (sp.x > viewLeft && sp.x < viewRight && sp.y > viewTop && sp.y < viewBottom) {
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

    // 🌟 Draw Stage 3 Landmarks on Minimap
    if (this.hotSpring) {
      mCtx.font = '10px sans-serif';
      mCtx.textAlign = 'center';
      mCtx.textBaseline = 'middle';
      mCtx.fillText('♨️', this.hotSpring.x * scaleX, this.hotSpring.y * scaleY);
    }
    if (this.ramenShop) {
      mCtx.font = '10px sans-serif';
      mCtx.textAlign = 'center';
      mCtx.textBaseline = 'middle';
      mCtx.fillText('🍜', this.ramenShop.x * scaleX, this.ramenShop.y * scaleY);
    }
    if (this.gachaMachines) {
      this.gachaMachines.forEach(g => {
        mCtx.font = '10px sans-serif';
        mCtx.textAlign = 'center';
        mCtx.textBaseline = 'middle';
        mCtx.fillText('🎰', g.x * scaleX, g.y * scaleY);
      });
    }

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
    mCtx.fillStyle = this.player.bulletColor || '#ff4081';
    mCtx.shadowColor = '#ffffff';
    mCtx.shadowBlur = 4;
    mCtx.beginPath();
    mCtx.arc(px, py, 3.5, 0, Math.PI * 2);
    mCtx.fill();
  }

  drawBackground() {
    if (this.inDungeon) {
      this.drawDungeonBackground();
      return;
    }

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

  // --- 🎲 Dynamic Random Field Events System ---
  triggerRandomEvent() {
    if (this.inDungeon || !this.player || this.activeEvent) return;

    const eventList = [
      {
        id: 'sakura_fever',
        name: '만개한 벚꽃 피버 타임!',
        icon: '🌸',
        desc: '전체 젬 자석 흡수 & 폭풍 공격력 증가!',
        duration: 15.0,
        banner: '🌸 [돌발 이벤트] 만개한 벚꽃 피버 타임 개막!'
      },
      {
        id: 'golden_rush',
        name: '황금 도굴꾼 대탈출 러시!',
        icon: '💰',
        desc: '도망치는 황금 고블린 떼를 소탕하여 코인 대박 획득!',
        duration: 20.0,
        banner: '💰 [돌발 이벤트] 황금 도굴꾼 무리가 보물자루를 메고 출현했습니다!'
      },
      {
        id: 'sweets_airdrop',
        name: '특급 디저트 보급품 투하!',
        icon: '🎁',
        desc: '포셰트 갑옷씨의 보급품이 낙하했습니다! 찾아가 개방하세요!',
        duration: 30.0,
        banner: '🎁 [돌발 이벤트] 특급 디저트 보급품이 투하되었습니다!'
      },
      {
        id: 'thunderstorm',
        name: '자연의 벼락 폭풍우 기상 이변!',
        icon: '⛈️',
        desc: '하늘에서 몬스터들을 향해 강력한 벼락 폭격 지원!',
        duration: 16.0,
        banner: '⛈️ [돌발 이벤트] 뇌운 강림! 몬스터들에게 벼락이 내리꽂힙니다!'
      },
      {
        id: 'elite_bounty',
        name: '현상수배: 정예 키메라 토벌!',
        icon: '👑',
        desc: '제한시간 내에 현상수배 정예 키메라를 토벌하여 전설 보상 획득!',
        duration: 35.0,
        banner: '👹 [현상수배] 악명 높은 돌연변이 정예 키메라 출현!'
      },
      {
        id: 'balloon_carnival',
        name: '판초 요정의 무지개 풍선 축제!',
        icon: '🎈',
        desc: '필드에 떠오른 무지개 풍선들을 터뜨려 코인 & EXP 획득!',
        duration: 25.0,
        banner: '🎈 [돌발 이벤트] 판초 요정들의 무지개 풍선 축제 개막!'
      }
    ];

    let idx = Math.floor(Math.random() * eventList.length);
    if (idx === this.lastEventIndex) {
      idx = (idx + 1) % eventList.length;
    }
    this.lastEventIndex = idx;
    const evt = eventList[idx];

    this.activeEvent = evt.id;
    this.activeEventDuration = evt.duration;
    this.activeEventTimer = evt.duration;
    this.activeEventName = evt.name;
    this.activeEventIcon = evt.icon;
    this.activeEventDesc = evt.desc;

    // Show Danger/Event Banner
    this.showDangerBanner(evt.banner);
    Sound.playRelicFanfare();
    this.damageTexts.push(new DamageText(this.player.x, this.player.y - 50, `${evt.icon} ${evt.name}`, '#facc15', true));

    // Show Event HUD
    const eHud = document.getElementById('event-hud');
    if (eHud) {
      const eIcon = document.getElementById('event-icon');
      const eTitle = document.getElementById('event-title');
      const eTimer = document.getElementById('event-timer-text');
      const eDesc = document.getElementById('event-desc-text');
      if (eIcon) eIcon.textContent = evt.icon;
      if (eTitle) eTitle.textContent = evt.name;
      if (eTimer) eTimer.textContent = `⏳ ${evt.duration.toFixed(1)}s`;
      if (eDesc) eDesc.textContent = evt.desc;
      eHud.style.display = 'block';
    }

    // Execute Immediate Event Spawns
    if (evt.id === 'golden_rush') {
      for (let i = 0; i < 7; i++) {
        const a = (i / 7) * Math.PI * 2;
        const gx = this.player.x + Math.cos(a) * (260 + Math.random() * 80);
        const gy = this.player.y + Math.sin(a) * (260 + Math.random() * 80);
        this.enemies.push(new Enemy(gx, gy, 'golden_goblin', this.wave, this.getDiffConfig()));
      }
    } else if (evt.id === 'sweets_airdrop') {
      const a = Math.random() * Math.PI * 2;
      const dropX = Math.max(150, Math.min(this.worldWidth - 150, this.player.x + Math.cos(a) * 200));
      const dropY = Math.max(150, Math.min(this.worldHeight - 150, this.player.y + Math.sin(a) * 200));
      this.airdropCrates.push(new AirdropCrate(dropX, dropY));
    } else if (evt.id === 'balloon_carnival') {
      for (let i = 0; i < 8; i++) {
        const bx = Math.max(150, Math.min(this.worldWidth - 150, this.player.x + (Math.random() - 0.5) * 450));
        const by = Math.max(150, Math.min(this.worldHeight - 150, this.player.y + (Math.random() - 0.5) * 450));
        this.festivalBalloons.push(new FestivalBalloon(bx, by, i));
      }
    } else if (evt.id === 'elite_bounty') {
      const a = Math.random() * Math.PI * 2;
      const bx = Math.max(150, Math.min(this.worldWidth - 150, this.player.x + Math.cos(a) * 320));
      const by = Math.max(150, Math.min(this.worldHeight - 150, this.player.y + Math.sin(a) * 320));
      const bountyMob = new Enemy(bx, by, 'elite_bounty', this.wave, this.getDiffConfig());
      this.enemies.push(bountyMob);
      this.activeBountyEnemy = bountyMob;
    }
  }

  // --- 🏛️ Ancient Underground Dungeon Methods ---
  spawnDungeonPortal() {
    if (!this.player || this.inDungeon) return;
    const angle = Math.random() * Math.PI * 2;
    const dist = 320 + Math.random() * 200;
    const px = Math.max(200, Math.min(this.worldWidth - 200, this.player.x + Math.cos(angle) * dist));
    const py = Math.max(200, Math.min(this.worldHeight - 200, this.player.y + Math.sin(angle) * dist));
    const portal = new DungeonPortal(px, py);
    this.dungeonPortals.push(portal);
    Sound.playRelicFanfare();
    this.damageTexts.push(new DamageText(px, py - 60, '🏛️ 고대 지하 던전 차원문 개방! [E키]', '#c084fc', true));
    this.showDangerBanner('🏛️ 고대 지하 던전 차원문이 나타났습니다! [E]');
  }

  enterUndergroundDungeon(portal) {
    if (this.inDungeon || !this.player) return;
    this.inDungeon = true;
    this.dungeonTimer = this.dungeonMaxTime;
    this.dungeonCoinsGained = 0;
    this.dungeonGolemSpawned = false;

    // Save surface world state
    this.savedSurface = {
      playerX: this.player.x,
      playerY: this.player.y,
      enemies: [...this.enemies],
      projectiles: [...this.projectiles],
      expGems: [...this.expGems],
      fieldItems: [...this.fieldItems],
      lightningBolts: [...this.lightningBolts],
      slashWaves: [...this.slashWaves],
      airdropCrates: [...this.airdropCrates],
      festivalBalloons: [...this.festivalBalloons],
      portal: portal
    };

    // Clear active mobs/bullets for secret chamber
    this.enemies = [];
    this.projectiles = [];
    this.expGems = [];
    this.fieldItems = [];
    this.lightningBolts = [];
    this.slashWaves = [];
    this.airdropCrates = [];
    this.festivalBalloons = [];

    // Teleport player to dungeon center
    this.player.x = 2500;
    this.player.y = 2500;
    this.camera.x = 2500 - this.canvas.width / 2;
    this.camera.y = 2500 - this.canvas.height / 2;

    // Show Dungeon HUD
    const dHud = document.getElementById('dungeon-hud');
    if (dHud) dHud.style.display = 'block';

    Sound.playRelicFanfare();
    this.showDangerBanner('🏛️ 고대 지하 보물창고 성소 입장!');
    this.damageTexts.push(new DamageText(this.player.x, this.player.y - 60, '✨ 고대 지하 던전 진입! 황금 고블린을 사냥하세요!', '#c084fc', true));

    // Initial Golden Goblins
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI * 2 / 6) * i;
      const gx = 2500 + Math.cos(angle) * 220;
      const gy = 2500 + Math.sin(angle) * 220;
      this.enemies.push(new Enemy(gx, gy, 'golden_goblin', this.wave, this.getDiffConfig()));
    }
  }

  completeUndergroundDungeon() {
    if (!this.inDungeon) return;
    this.inDungeon = false;

    const dHud = document.getElementById('dungeon-hud');
    if (dHud) dHud.style.display = 'none';

    // Vault completion bonus (+200 coins, full heal, upgrade level)
    const completionBonus = 200;
    this.addSessionCoins(completionBonus);
    if (this.player) this.player.hp = this.player.maxHp;
    Sound.playRelicFanfare();

    this.triggerLevelUp();

    // Teleport player back to surface world
    if (this.savedSurface) {
      if (this.player) {
        this.player.x = this.savedSurface.playerX;
        this.player.y = this.savedSurface.playerY;
      }
      this.enemies = this.savedSurface.enemies;
      this.projectiles = this.savedSurface.projectiles;
      this.expGems = this.savedSurface.expGems;
      this.fieldItems = this.savedSurface.fieldItems;
      this.lightningBolts = this.savedSurface.lightningBolts || [];
      this.slashWaves = this.savedSurface.slashWaves || [];
      this.airdropCrates = this.savedSurface.airdropCrates || [];
      this.festivalBalloons = this.savedSurface.festivalBalloons || [];

      if (this.savedSurface.portal) {
        const idx = this.dungeonPortals.indexOf(this.savedSurface.portal);
        if (idx !== -1) this.dungeonPortals.splice(idx, 1);
      }
      this.savedSurface = null;
    }

    this.showDangerBanner('🎉 고대 지하 보물창고 완전 정복! (+200🪙 & 전설 보상)');
    if (this.player) {
      this.damageTexts.push(new DamageText(this.player.x, this.player.y - 60, `🎉 던전 정복! 총 +${this.dungeonCoinsGained + completionBonus} 🪙 획득 & 완치!`, '#facc15', true));

      for (let i = 0; i < 35; i++) {
        const a = Math.random() * Math.PI * 2;
        const spd = 3 + Math.random() * 6;
        this.particles.push(new Particle(this.player.x, this.player.y, Math.cos(a) * spd, Math.sin(a) * spd, 7, '#facc15', 0.6, 'star'));
        this.particles.push(new Particle(this.player.x, this.player.y, Math.cos(a) * spd * 0.8, Math.sin(a) * spd * 0.8, 6, '#c084fc', 0.6, 'sparkle'));
      }
    }
  }

  drawDungeonBackground() {
    this.ctx.save();
    // Fill background with deep dark obsidian
    this.ctx.fillStyle = '#0a0512';
    this.ctx.fillRect(this.camera.x, this.camera.y, this.canvas.width, this.canvas.height);

    const roomX = 2100;
    const roomY = 2100;
    const roomW = 800;
    const roomH = 800;

    // Chamber floor gradient
    const floorGrad = this.ctx.createRadialGradient(2500, 2500, 50, 2500, 2500, 480);
    floorGrad.addColorStop(0, '#2d1b4e');
    floorGrad.addColorStop(0.7, '#180d2c');
    floorGrad.addColorStop(1, '#0e061a');
    this.ctx.fillStyle = floorGrad;
    this.ctx.fillRect(roomX, roomY, roomW, roomH);

    // Stone tile grid
    const tileSize = 50;
    this.ctx.strokeStyle = 'rgba(168, 85, 247, 0.18)';
    this.ctx.lineWidth = 1;
    for (let x = roomX; x <= roomX + roomW; x += tileSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, roomY);
      this.ctx.lineTo(x, roomY + roomH);
      this.ctx.stroke();
    }
    for (let y = roomY; y <= roomY + roomH; y += tileSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(roomX, y);
      this.ctx.lineTo(roomX + roomW, y);
      this.ctx.stroke();
    }

    // Swirling Central Rune Array
    const now = Date.now() / 1000;
    this.ctx.save();
    this.ctx.translate(2500, 2500);
    this.ctx.rotate(now * 0.4);
    this.ctx.strokeStyle = 'rgba(250, 204, 21, 0.4)';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 180, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.rotate(-now * 0.8);
    this.ctx.strokeStyle = 'rgba(192, 132, 252, 0.5)';
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(0, 0, 120, 0, Math.PI * 2);
    this.ctx.stroke();

    this.ctx.font = '24px sans-serif';
    this.ctx.textAlign = 'center';
    this.ctx.textBaseline = 'middle';
    this.ctx.fillText('🏛️', 0, 0);
    this.ctx.restore();

    // Chamber Walls & Rune Barrier
    this.ctx.strokeStyle = '#c084fc';
    this.ctx.lineWidth = 6;
    this.ctx.shadowColor = '#a855f7';
    this.ctx.shadowBlur = 24;
    this.ctx.strokeRect(roomX, roomY, roomW, roomH);

    // Corner Torch Pillars
    const corners = [
      { x: roomX + 30, y: roomY + 30 },
      { x: roomX + roomW - 30, y: roomY + 30 },
      { x: roomX + 30, y: roomY + roomH - 30 },
      { x: roomX + roomW - 30, y: roomY + roomH - 30 }
    ];
    corners.forEach(c => {
      this.ctx.font = '28px sans-serif';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText('🔥', c.x, c.y);
    });

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
      this.ctx.globalAlpha = 0.6;
      this.ctx.translate(lx, ly);
      this.ctx.rotate(angle);

      const grad = this.ctx.createLinearGradient(0, -20, 0, 20);
      grad.addColorStop(0, 'rgba(255, 64, 129, 0.65)');
      grad.addColorStop(0.25, 'rgba(255, 209, 102, 0.7)');
      grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.85)');
      grad.addColorStop(0.75, 'rgba(6, 214, 160, 0.7)');
      grad.addColorStop(1, 'rgba(17, 138, 178, 0.65)');

      this.ctx.fillStyle = grad;
      this.ctx.shadowColor = '#ffffff';
      this.ctx.shadowBlur = 14;
      this.ctx.fillRect(0, -18, len, 36);

      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.85)';
      this.ctx.fillRect(0, -5, len, 10);

      this.ctx.restore();
    } catch (e) {}
  }

  // --- 🌟 Stage 3 Landmark & Relic Interaction Methods ---
  updateRelicHUD() {
    const tray = document.getElementById('hud-relics-tray');
    if (!tray || !this.player) return;
    if (this.player.relics.length === 0) {
      tray.innerHTML = '';
      return;
    }
    const icons = {
      relic_ribbon: { icon: '🎀', title: '파란 리본 (위기시 5초 무적 & 2배딜)' },
      relic_wand: { icon: '🥢', title: '번개 지팡이 (크기+30% & 25% 낙뢰)' },
      relic_goblet: { icon: '🍺', title: '안주 잔 (처치시 코인 & 힐)' },
      relic_carkey: { icon: '🚗', title: '슈퍼카 키 (이속+20% & 대시 250딜)' },
      relic_crown: { icon: '👑', title: '보석 왕관 (경험치 +40%)' },
      relic_camera: { icon: '📷', title: '카메라 (14초마다 3초 정지)' },
      '🍜 특제 차슈 라멘': { icon: '🍜', title: '특제 차슈 (공격력 +30%)' },
      '🍲 진한 돈코츠': { icon: '🍲', title: '돈코츠 (체력 +50)' },
      '🥟 교자 만두': { icon: '🥟', title: '교자 세트 (이속+20% & 대시쿨-30%)' },
      '🌶️ 카라미소': { icon: '🌶️', title: '카라미소 (화염 폭발 공격)' }
    };
    tray.innerHTML = this.player.relics.map(r => {
      const info = icons[r] || { icon: '🏆', title: r };
      return `<div class="relic-badge" title="${info.title}">${info.icon}</div>`;
    }).join('');
  }

  openRamenModal() {
    this.isShopping = true;
    this.renderRamenMenu();
    const modal = document.getElementById('ramen-modal');
    if (modal) modal.classList.add('active');
  }

  renderRamenMenu() {
    const coinsEl = document.getElementById('ramen-modal-coins');
    if (coinsEl) coinsEl.textContent = (this.sessionCoins || 0).toLocaleString();
    const grid = document.getElementById('ramen-menu-grid');
    if (!grid) return;
    grid.innerHTML = '';

    RAMEN_DISHES.forEach(dish => {
      const card = document.createElement('div');
      card.className = 'ramen-card';
      const canAfford = (this.sessionCoins || 0) >= dish.cost;
      const alreadyBought = this.player && this.player.relics.includes(dish.name);

      card.innerHTML = `
        <div>
          <div class="ramen-card-head">
            <span class="ramen-dish-icon">${dish.icon}</span>
            <span class="ramen-dish-name">${dish.name}</span>
          </div>
          <div class="ramen-dish-desc">${dish.desc}</div>
        </div>
        <button class="ramen-buy-btn" ${(!canAfford && !alreadyBought) ? 'disabled' : ''}>
          ${alreadyBought ? '✅ 구매 완료' : `🪙 ${dish.cost} 코인 주문하기`}
        </button>
      `;

      const btn = card.querySelector('.ramen-buy-btn');
      if (canAfford && !alreadyBought) {
        btn.addEventListener('click', () => this.buyRamen(dish));
      }
      grid.appendChild(card);
    });
  }

  buyRamen(dish) {
    if ((this.sessionCoins || 0) < dish.cost) return;
    this.sessionCoins -= dish.cost;
    const hudCoins = document.getElementById('hud-coins');
    if (hudCoins) hudCoins.textContent = this.sessionCoins.toLocaleString();
    Sound.playUpgrade();
    dish.apply(this);
    StorageManager.updateQuestProgress('q_ramen', 1);
    this.damageTexts.push(new DamageText(this.player.x, this.player.y - 40, `🍜 ${dish.name} 완식! 버프 발동!`, '#f97316', true));
    this.renderRamenMenu();
    this.updateRelicHUD();
  }

  closeRamenModal() {
    this.isShopping = false;
    const modal = document.getElementById('ramen-modal');
    if (modal) modal.classList.remove('active');
    this.lastTime = performance.now();
    if (this.isRunning && !this.isPaused && !this.isLevelingUp) {
      requestAnimationFrame((t) => this.loop(t));
    }
  }

  openGachaModal() {
    this.isShopping = true;
    const coinsEl = document.getElementById('gacha-modal-coins');
    if (coinsEl) coinsEl.textContent = (this.sessionCoins || 0).toLocaleString();
    const resultCard = document.getElementById('gacha-result-card');
    if (resultCard) resultCard.style.display = 'none';
    const modal = document.getElementById('gacha-modal');
    if (modal) modal.classList.add('active');
  }

  spinGacha() {
    if (this.isGachaSpinning || (this.sessionCoins || 0) < 20) {
      Sound.playHit();
      return;
    }
    this.isGachaSpinning = true;
    this.sessionCoins -= 20;
    const hudCoins = document.getElementById('hud-coins');
    if (hudCoins) hudCoins.textContent = this.sessionCoins.toLocaleString();
    const gCoins = document.getElementById('gacha-modal-coins');
    if (gCoins) gCoins.textContent = this.sessionCoins.toLocaleString();

    Sound.playCoin();
    StorageManager.updateQuestProgress('q_gacha', 1);
    const globe = document.getElementById('gacha-globe');
    if (globe) globe.classList.add('spinning');
    const resultCard = document.getElementById('gacha-result-card');
    if (resultCard) resultCard.style.display = 'none';

    setTimeout(() => {
      if (globe) globe.classList.remove('spinning');
      this.isGachaSpinning = false;
      Sound.playRelicFanfare();

      const reward = GACHA_REWARDS[Math.floor(Math.random() * GACHA_REWARDS.length)];
      reward.apply(this);

      if (resultCard) {
        document.getElementById('gacha-res-icon').textContent = reward.icon;
        document.getElementById('gacha-res-name').textContent = reward.name;
        document.getElementById('gacha-res-desc').textContent = reward.desc;
        resultCard.style.display = 'block';
      }
      this.damageTexts.push(new DamageText(this.player.x, this.player.y - 45, `🎰 ${reward.name} 획득!`, '#c084fc', true));
      this.updateRelicHUD();
    }, 1200);
  }

  closeGachaModal() {
    this.isShopping = false;
    const modal = document.getElementById('gacha-modal');
    if (modal) modal.classList.remove('active');
    this.lastTime = performance.now();
    if (this.isRunning && !this.isPaused && !this.isLevelingUp) {
      requestAnimationFrame((t) => this.loop(t));
    }
  }

  addCombo(amount = 1) {
    this.comboCount += amount;
    this.comboTimer = 3.5;
    const comboBadge = document.getElementById('hud-combo');
    const comboNum = document.getElementById('combo-num');
    if (comboBadge && comboNum) {
      comboNum.textContent = this.comboCount;
      comboBadge.style.display = this.comboCount >= 3 ? 'block' : 'none';
    }

    if (this.comboCount === 15 || this.comboCount === 35 || this.comboCount === 60) {
      this.triggerFever();
    }
  }

  triggerFever(duration = 9.0) {
    this.feverTimer = duration;
    Sound.playRelicFanfare();
    StorageManager.updateQuestProgress('q_fever', 1);
    const feverEl = document.getElementById('fever-overlay');
    if (feverEl) feverEl.classList.add('active');
    this.damageTexts.push(new DamageText(this.player.x, this.player.y - 50, '🔥 FEVER TIME! 2배 코인 & 점수 폭증!', '#f59e0b', true));
    this.screenShake = 8;
  }

  triggerSkillCutIn(charType = 'chiikawa', skillName = '초거대 레인보우 빔-!!', quote = '별님... 우리에게 힘을 줘-!!') {
    const cutin = document.getElementById('skill-cutin-overlay');
    const img = document.getElementById('cutin-char-img');
    const title = document.getElementById('cutin-char-title');
    const nameEl = document.getElementById('cutin-skill-name');
    const quoteEl = document.getElementById('cutin-quote');

    if (!cutin) return;
    if (img) img.src = `assets/${charType}.png`;

    const titles = {
      chiikawa: '🌸 용감한 치이카와',
      hachiware: '🐱 긍정의 검사 하치와레',
      usagi: '🐰 질주하는 광기 우사기',
      kurimanju: '🌰 고독한 미식가 쿠리만주',
      momonga: '🐿️ 매혹의 요정 모몬가',
      rakko: '🦦 최강의 랭커 라코 스승'
    };

    if (title) title.textContent = titles[charType] || '🌸 영웅 치이카와';
    if (nameEl) nameEl.textContent = skillName;
    if (quoteEl) quoteEl.textContent = `"${quote}"`;

    cutin.classList.add('active');

    if (this.cutinTimerId) clearTimeout(this.cutinTimerId);
    this.cutinTimerId = setTimeout(() => {
      cutin.classList.remove('active');
    }, 1400);
  }

  initTouchControls() {
    const touchContainer = document.getElementById('touch-controls-container');
    const joystickZone = document.getElementById('touch-joystick-zone');
    const joystickBase = document.getElementById('joystick-base');
    const joystickKnob = document.getElementById('joystick-knob');

    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (window.innerWidth <= 800);
    if (isTouchDevice && this.settings.touchControls !== false) {
      if (touchContainer) touchContainer.classList.add('active');
    }

    window.addEventListener('touchstart', () => {
      if (this.settings.touchControls !== false && touchContainer && !touchContainer.classList.contains('active')) {
        touchContainer.classList.add('active');
      }
    }, { once: true, passive: true });

    let joystickTouchId = null;
    let baseCenterX = 0;
    let baseCenterY = 0;
    const maxRadius = 45;

    const updateBaseCenter = () => {
      if (joystickBase) {
        const rect = joystickBase.getBoundingClientRect();
        baseCenterX = rect.left + rect.width / 2;
        baseCenterY = rect.top + rect.height / 2;
      }
    };

    const handleJoystickMove = (clientX, clientY) => {
      const dx = clientX - baseCenterX;
      const dy = clientY - baseCenterY;
      const dist = Math.hypot(dx, dy);
      const angle = Math.atan2(dy, dx);
      const clampedDist = Math.min(dist, maxRadius);
      const kx = Math.cos(angle) * clampedDist;
      const ky = Math.sin(angle) * clampedDist;

      if (joystickKnob) {
        joystickKnob.style.transform = `translate(${kx}px, ${ky}px)`;
      }

      if (this.player) {
        const intensity = clampedDist / maxRadius;
        this.player.joystickVector = {
          x: Math.cos(angle) * intensity,
          y: Math.sin(angle) * intensity
        };
      }
    };

    if (joystickZone) {
      joystickZone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        updateBaseCenter();
        const touch = e.changedTouches[0];
        joystickTouchId = touch.identifier;
        handleJoystickMove(touch.clientX, touch.clientY);
      }, { passive: false });

      joystickZone.addEventListener('touchmove', (e) => {
        e.preventDefault();
        for (let i = 0; i < e.changedTouches.length; i++) {
          const t = e.changedTouches[i];
          if (t.identifier === joystickTouchId) {
            handleJoystickMove(t.clientX, t.clientY);
            break;
          }
        }
      }, { passive: false });

      const resetJoystick = (e) => {
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === joystickTouchId) {
            joystickTouchId = null;
            if (joystickKnob) joystickKnob.style.transform = 'translate(0px, 0px)';
            if (this.player) this.player.joystickVector = { x: 0, y: 0 };
            break;
          }
        }
      };

      joystickZone.addEventListener('touchend', resetJoystick, { passive: false });
      joystickZone.addEventListener('touchcancel', resetJoystick, { passive: false });
    }

    // Right Action Buttons
    const btnAtk = document.getElementById('touch-btn-atk');
    if (btnAtk) {
      btnAtk.addEventListener('touchstart', (e) => {
        e.preventDefault();
        btnAtk.classList.add('pressed');
        this.touchAttacking = true;
      }, { passive: false });

      const stopAtk = (e) => {
        e.preventDefault();
        btnAtk.classList.remove('pressed');
        this.touchAttacking = false;
      };
      btnAtk.addEventListener('touchend', stopAtk, { passive: false });
      btnAtk.addEventListener('touchcancel', stopAtk, { passive: false });
    }

    const btnDash = document.getElementById('touch-btn-dash');
    if (btnDash) {
      btnDash.addEventListener('touchstart', (e) => {
        e.preventDefault();
        btnDash.classList.add('pressed');
        if (this.isRunning && !this.isPaused && !this.isLevelingUp && this.player) {
          this.player.dash(this.keys);
        }
      }, { passive: false });
      btnDash.addEventListener('touchend', () => btnDash.classList.remove('pressed'), { passive: false });
    }

    const btnQ = document.getElementById('touch-btn-q');
    if (btnQ) {
      btnQ.addEventListener('touchstart', (e) => {
        e.preventDefault();
        btnQ.classList.add('pressed');
        if (this.isRunning && !this.isPaused && !this.isLevelingUp && this.player) {
          let tx = this.player.x + (this.player.facingLeft ? -220 : 220);
          let ty = this.player.y;
          if (this.enemies.length > 0) {
            let nearest = null; let minD = 500;
            for (let en of this.enemies) {
              const d = Math.hypot(en.x - this.player.x, en.y - this.player.y);
              if (d < minD) { minD = d; nearest = en; }
            }
            if (nearest) { tx = nearest.x; ty = nearest.y; }
          }
          this.player.useQ(tx, ty, this.grenades, this.boomerangs);
        }
      }, { passive: false });
      btnQ.addEventListener('touchend', () => btnQ.classList.remove('pressed'), { passive: false });
    }

    const btnE = document.getElementById('touch-btn-e');
    if (btnE) {
      btnE.addEventListener('touchstart', (e) => {
        e.preventDefault();
        btnE.classList.add('pressed');
        if (this.nearbyInteractable) {
          if (this.nearbyInteractable.type === 'ramen') this.openRamenModal();
          else if (this.nearbyInteractable.type === 'gacha') this.openGachaModal();
          else if (this.nearbyInteractable.type === 'dungeon') this.enterUndergroundDungeon(this.nearbyInteractable.target);
        } else if (this.isRunning && !this.isPaused && !this.isLevelingUp && this.player) {
          this.player.useE(this.damageTexts);
        }
      }, { passive: false });
      btnE.addEventListener('touchend', () => btnE.classList.remove('pressed'), { passive: false });
    }

    const btnR = document.getElementById('touch-btn-r');
    if (btnR) {
      btnR.addEventListener('touchstart', (e) => {
        e.preventDefault();
        btnR.classList.add('pressed');
        if (this.isRunning && !this.isPaused && !this.isLevelingUp && this.player) {
          let tx = this.player.x + (this.player.facingLeft ? -300 : 300);
          let ty = this.player.y;
          if (this.enemies.length > 0) {
            let nearest = null; let minD = 600;
            for (let en of this.enemies) {
              const d = Math.hypot(en.x - this.player.x, en.y - this.player.y);
              if (d < minD) { minD = d; nearest = en; }
            }
            if (nearest) { tx = nearest.x; ty = nearest.y; }
          }
          this.player.useR(tx, ty, this.meteors, this.damageTexts);
        }
      }, { passive: false });
      btnR.addEventListener('touchend', () => btnR.classList.remove('pressed'), { passive: false });
    }
  }

  loop(timestamp) {
    if (!this.isRunning || this.isPaused || this.isLevelingUp || this.isShopping) return;

    try {
      const rawDt = (timestamp - this.lastTime) / 1000 || 0.007;
      const dt = Math.min(0.05, Math.max(0.001, rawDt));
      this.lastTime = timestamp;

      // Calculate real-time FPS
      this.frameCount++;
      this.fpsTimer += dt;
      if (this.fpsTimer >= 0.25) {
        this.fps = Math.round(this.frameCount / this.fpsTimer);
        this.frameCount = 0;
        this.fpsTimer = 0;
        const fpsEl = document.getElementById('hud-fps');
        if (fpsEl) fpsEl.textContent = this.fps;
      }

      this.update(dt);
      this.draw();
    } catch (err) {
      console.error("Game loop non-fatal error caught:", err);
    }

    if (this.isRunning && !this.isPaused && !this.isLevelingUp && !this.isShopping) {
      requestAnimationFrame((t) => this.loop(t));
    }
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.GameInstance = new Game();
});
