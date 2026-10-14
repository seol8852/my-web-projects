// 치이카와 정처기 실기 코딩 마스터 100제 - 메인 애플리케이션
// Web Audio API Sound Synth, State Management, Practice Engine

const APP_STATE = {
  activeTab: 'practice', // 'practice' | 'exam' | 'dashboard' | 'wrong'
  langFilter: 'all',
  statusFilter: 'all',
  searchQuery: '',
  soundEnabled: true,
  solvedData: {}, // { [id]: { isCorrect: boolean, userAnswer: string, attempts: number } }
  bookmarks: new Set(),
  currentSpeechChar: 'chiikawa'
};

// Web Audio API 음향 신시사이저 (외부 오디오 파일 없이 순수 브라우저 합성)
class SoundFx {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    if (!APP_STATE.soundEnabled) return;
    try {
      this.init();
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch (e) {}
  }

  playCorrect() {
    if (!APP_STATE.soundEnabled) return;
    try {
      this.init();
      // 밝고 귀여운 4화음 아르페지오 (C5, E5, G5, C6)
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.07);
        gain.gain.setValueAtTime(0.2, this.ctx.currentTime + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.07 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.07);
        osc.stop(this.ctx.currentTime + idx * 0.07 + 0.25);
      });
    } catch (e) {}
  }

  playWrong() {
    if (!APP_STATE.soundEnabled) return;
    try {
      this.init();
      // 아쉬운 띠로리 음 (Eb4 -> C4)
      const notes = [311.13, 261.63];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.12);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + idx * 0.12 + 0.2);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + idx * 0.12);
        osc.stop(this.ctx.currentTime + idx * 0.12 + 0.2);
      });
    } catch (e) {}
  }

  playFanfare() {
    if (!APP_STATE.soundEnabled) return;
    try {
      this.init();
      // 승리의 팡파레
      const melody = [
        { f: 523.25, t: 0.0 },
        { f: 523.25, t: 0.1 },
        { f: 523.25, t: 0.2 },
        { f: 659.25, t: 0.35 },
        { f: 783.99, t: 0.5 },
        { f: 1046.50, t: 0.7 }
      ];
      melody.forEach(item => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(item.f, this.ctx.currentTime + item.t);
        gain.gain.setValueAtTime(0.25, this.ctx.currentTime + item.t);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + item.t + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + item.t);
        osc.stop(this.ctx.currentTime + item.t + 0.35);
      });
    } catch (e) {}
  }
}

const sound = new SoundFx();

// 치이카와 대사 모음집
const CHAR_QUOTES = {
  chiikawa: [
    "와앗... 합격하고 싶어! 열심히 풀면 꼭 붙을 수 있을 거야...!",
    "우와앙! 정답이야! 나도 풀뽑기 자격증 딸 수 있을 것 같아!",
    "흐에에... 틀렸지만 괜찮아! 하치와레랑 복습하면 돼!",
    "힘내자! 100문제 다 풀면 우리는 정보처리기사 마스터야!"
  ],
  hachiware: [
    "시험장에서는 코드 한 줄 한 줄 손으로 쓰면서 따라가면 다 보여!",
    "정답이야! 역시 넌 대단해! 다음 문제도 바로 풀어볼까?",
    "어떻게든 될 거야(난또까나레)! 오답 노트 보고 다시 해보자!",
    "C언어 포인터랑 자바 상속만 정복하면 실기 60점은 금방 넘겨!"
  ],
  usagi: [
    "이얏하-! 우라! 번개처럼 코드를 꿰뚫어 보았구나!",
    "푸하-! 정답 폭격! 거침없이 앞으로 나아가자!",
    "우라라라라-! 틀렸다고 기죽지 마! 당근 먹고 다시 도전!",
    "야하-! 만점 합격증을 향해 쾌속 질주!"
  ],
  kurimanju: [
    "크으-! 정답의 이 짜릿한 손맛! 한 잔 들이켜는 기분이구만!",
    "합격은 집중과 끈기에서 나오는 법이지. 천천히 정확하게 풀어봐.",
    "실수했던 코드가 진짜 실력으로 이어지는 법이다. 다시 짚어봐."
  ],
  momonga: [
    "어이! 거기 너! 이 몸이 친히 코딩 팁을 전수해 주지! 귀엽지? 칭찬해라!",
    "흥! 이 정도 문제는 내게 아무것도 아니라고! 어서 나를 찬양해라!",
    "틀렸다고 징징대지 마라! 이 몸의 귀여움을 보면서 힘을 내란 말이다!",
    "만점 받아서 이 몸에게 맛있는 걸 바쳐라!"
  ],
  rakko: [
    "침착해라. 코드의 흐름을 날카롭게 베어내면 답은 드러난다.",
    "훌륭하다! 강인한 집중력이 승리를 가져오는 법이지.",
    "실패는 더 단단한 칼날을 벼리는 망치질과 같다. 다시 일어서라.",
    "자신을 믿어라. 너의 실력은 이미 기사 마스터의 경지에 다다르고 있다."
  ]
};

// 로컬 스토리지 키
const STORAGE_SOLVED = 'chiikawa_jungchogi_solved';
const STORAGE_BOOKMARKS = 'chiikawa_jungchogi_bookmarks';

// 로컬 스토리지 불러오기
function loadUserData() {
  try {
    const savedSolved = localStorage.getItem(STORAGE_SOLVED);
    if (savedSolved) {
      APP_STATE.solvedData = JSON.parse(savedSolved);
    }
    const savedBm = localStorage.getItem(STORAGE_BOOKMARKS);
    if (savedBm) {
      APP_STATE.bookmarks = new Set(JSON.parse(savedBm));
    }
  } catch (e) {
    console.error("Storage load error:", e);
  }
}

function saveUserData() {
  try {
    localStorage.setItem(STORAGE_SOLVED, JSON.stringify(APP_STATE.solvedData));
    localStorage.setItem(STORAGE_BOOKMARKS, JSON.stringify(Array.from(APP_STATE.bookmarks)));
  } catch (e) {
    console.error("Storage save error:", e);
  }
}

// 사용자 등급 계산 (등급별 대표 캐릭터 매핑)
function getRankInfo(correctCount) {
  if (correctCount >= 100) {
    return { name: "👑 기사 마스터 랑커", color: "#e11d48", next: 100, character: "rakko", quote: "훌륭하다. 네 칼날은 이제 완벽하다!" };
  } else if (correctCount >= 80) {
    return { name: "🏆 정보처리기사 달인", color: "#9333ea", next: 100, character: "kurimanju", quote: "크으-! 이 정도면 합격증은 이미 네 주머니에 있구만!" };
  } else if (correctCount >= 50) {
    return { name: "⚔️ 토벌 3급 용사", color: "#0284c7", next: 80, character: "usagi", quote: "이얏하-! 우라! 고난도 알고리즘도 맹렬하게 격파!" };
  } else if (correctCount >= 20) {
    return { name: "🌿 제초 5급 합격자", color: "#16a34a", next: 50, character: "hachiware", quote: "풀뽑기 5급 달성! 합격까지 한 걸음씩 같이 가자!" };
  } else {
    return { name: "🌸 새싹 제초 견습생", color: "#f59e0b", next: 20, character: "chiikawa", quote: "와앗... 시작이 반이야! 하나씩 풀어보자!" };
  }
}

// 상단 통계 및 뱃지 업데이트
function updateHeaderStats() {
  const total = QUESTIONS_DATA.length;
  const solvedKeys = Object.keys(APP_STATE.solvedData);
  const correctCount = solvedKeys.filter(id => APP_STATE.solvedData[id]?.isCorrect).length;
  const wrongCount = solvedKeys.filter(id => APP_STATE.solvedData[id] && !APP_STATE.solvedData[id].isCorrect).length;
  const rate = solvedKeys.length > 0 ? Math.round((correctCount / solvedKeys.length) * 100) : 0;
  
  const rank = getRankInfo(correctCount);

  // 헤더 엘리먼트들 갱신
  const elCorrect = document.getElementById('stat-correct-count');
  const elRate = document.getElementById('stat-rate');
  const elRank = document.getElementById('stat-rank-badge');
  const elTotalSolved = document.getElementById('stat-total-solved');

  if (elCorrect) elCorrect.innerText = correctCount;
  if (elTotalSolved) elTotalSolved.innerText = `${correctCount} / ${total}`;
  if (elRate) elRate.innerText = `${rate}%`;
  if (elRank) {
    elRank.innerText = rank.name;
    elRank.style.background = `linear-gradient(135deg, ${rank.color}22, ${rank.color}44)`;
    elRank.style.color = rank.color;
    elRank.style.border = `1px solid ${rank.color}88`;
  }

  // 필터 바 카운트 갱신
  const elFilterTotal = document.getElementById('filter-cnt-total');
  const elFilterCorrect = document.getElementById('filter-cnt-correct');
  const elFilterWrong = document.getElementById('filter-cnt-wrong');
  const elFilterBm = document.getElementById('filter-cnt-bm');

  if (elFilterTotal) elFilterTotal.innerText = total;
  if (elFilterCorrect) elFilterCorrect.innerText = correctCount;
  if (elFilterWrong) elFilterWrong.innerText = wrongCount;
  if (elFilterBm) elFilterBm.innerText = APP_STATE.bookmarks.size;
}

// 캐릭터 말풍선 대사 변경
function setCharacterSpeech(charName, msgIndex = null) {
  APP_STATE.currentSpeechChar = charName;
  const quotes = CHAR_QUOTES[charName] || CHAR_QUOTES.chiikawa;
  const text = (msgIndex !== null) ? quotes[msgIndex] : quotes[Math.floor(Math.random() * quotes.length)];
  
  const imgEl = document.getElementById('hero-character-img');
  const nameEl = document.getElementById('hero-speech-name');
  const textEl = document.getElementById('hero-speech-text');

  if (imgEl) {
    imgEl.src = `assets/${charName}.png`;
    imgEl.onerror = () => { imgEl.src = 'assets/chiikawa.png'; };
  }
  if (nameEl) {
    const names = {
      chiikawa: '치이카와',
      hachiware: '하치와레',
      usagi: '우사기',
      kurimanju: '쿠리만쥬',
      momonga: '모몽가',
      rakko: '랏코 사부'
    };
    nameEl.innerText = names[charName] || '치이카와';
  }
  if (textEl) {
    textEl.innerText = text;
  }

  // 상단 캐릭터 선택 바 활성화 상태 갱신
  document.querySelectorAll('.char-partner-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.char === charName);
  });
}

// 정답 판정 정규화 함수
function normalizeAnswer(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()
    .replace(/\s+/g, ' '); // 다중 공백은 단일 공백으로 치환
}

function checkUserAnswer(userAns, officialAns, altAnswers = []) {
  if (!userAns || typeof userAns !== 'string' || !userAns.trim()) {
    return false;
  }

  const rawUser = userAns.trim();
  const rawOfficial = String(officialAns).trim();

  // 1. 대소문자 무시 완전 일치
  const normUser = normalizeAnswer(rawUser).toLowerCase();
  const normOfficial = normalizeAnswer(rawOfficial).toLowerCase();
  if (normUser === normOfficial) return true;

  // 2. 대체 답안 목록 대조
  if (Array.isArray(altAnswers)) {
    for (const alt of altAnswers) {
      if (alt && normUser === normalizeAnswer(alt).toLowerCase()) return true;
    }
  }

  // 3. 쉼표(,) / 세미콜론(;) / 공백 구분 유연 처리
  const stripUser = normUser.replace(/[,;]/g, ' ').replace(/\s+/g, ' ').trim();
  const stripOfficial = normOfficial.replace(/[,;]/g, ' ').replace(/\s+/g, ' ').trim();
  if (stripUser && stripOfficial && stripUser === stripOfficial) return true;

  // 4. 대괄호/소괄호/따옴표 제거 후 비교 (예: [1, 2, 3] vs 1 2 3, "HELLO" vs HELLO)
  const cleanUser = stripUser.replace(/[\[\]\(\)\{\}'"]/g, '').replace(/\s+/g, ' ').trim();
  const cleanOfficial = stripOfficial.replace(/[\[\]\(\)\{\}'"]/g, '').replace(/\s+/g, ' ').trim();
  if (cleanUser && cleanOfficial && cleanUser === cleanOfficial) return true;

  return false;
}

// ==========================================
// 100제 문제 카드 렌더링
// ==========================================
function renderQuestionsList() {
  const container = document.getElementById('questions-grid-container');
  if (!container) return;

  // 필터링 적용
  let list = QUESTIONS_DATA.filter(q => {
    // 1. 언어 필터
    if (APP_STATE.langFilter !== 'all' && q.lang !== APP_STATE.langFilter) return false;

    // 2. 학습 상태 필터
    const solved = APP_STATE.solvedData[q.id];
    if (APP_STATE.statusFilter === 'correct' && (!solved || !solved.isCorrect)) return false;
    if (APP_STATE.statusFilter === 'wrong' && (!solved || solved.isCorrect)) return false;
    if (APP_STATE.statusFilter === 'unsolved' && solved) return false;
    if (APP_STATE.statusFilter === 'bookmarked' && !APP_STATE.bookmarks.has(q.id)) return false;

    // 3. 검색어 필터
    if (APP_STATE.searchQuery.trim()) {
      const qLower = APP_STATE.searchQuery.toLowerCase();
      const titleMatch = q.title.toLowerCase().includes(qLower);
      const codeMatch = q.code.toLowerCase().includes(qLower);
      const topicMatch = q.topic.toLowerCase().includes(qLower);
      const idMatch = String(q.id) === qLower;
      if (!titleMatch && !codeMatch && !topicMatch && !idMatch) return false;
    }

    return true;
  });

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🌸</div>
        <h3 style="font-size: 1.15rem; margin-bottom: 6px; color: var(--text-main);">조건에 맞는 문제가 없습니다!</h3>
        <p>필터를 변경하거나 검색어를 비워보세요. 치이카와가 기다리고 있어요!</p>
      </div>
    `;
    return;
  }

  const charNames = {
    chiikawa: '치이카와',
    hachiware: '하치와레',
    usagi: '우사기',
    kurimanju: '쿠리만쥬',
    momonga: '모몽가',
    rakko: '랏코 사부'
  };

  container.innerHTML = list.map(q => {
    const solved = APP_STATE.solvedData[q.id];
    const isBookmarked = APP_STATE.bookmarks.has(q.id);
    let statusClass = '';
    let statusFeedback = '';

    const charKey = q.character || 'chiikawa';
    const charName = charNames[charKey] || '치이카와';

    if (solved) {
      if (solved.isCorrect) {
        statusClass = 'status-correct';
        statusFeedback = `
          <div class="feedback-box correct" style="display: flex;">
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="assets/${charKey}.png" style="width:26px; height:26px; object-fit:contain;">
              <span>✨ 정답입니다! (${escapeHtml(solved.userAnswer)})</span>
            </div>
            <span>⭕</span>
          </div>
        `;
      } else {
        statusClass = 'status-wrong';
        statusFeedback = `
          <div class="feedback-box wrong" style="display: flex;">
            <div style="display:flex; align-items:center; gap:8px;">
              <img src="assets/${charKey}.png" style="width:26px; height:26px; object-fit:contain; filter:grayscale(40%);">
              <span>❌ 오답 (내 답: ${escapeHtml(solved.userAnswer)})</span>
            </div>
            <span style="font-size:0.75rem; color:#dc2626;">다시 도전해보세요!</span>
          </div>
        `;
      }
    }

    // 난이도 별표
    const stars = '★'.repeat(q.difficulty) + '☆'.repeat(3 - q.difficulty);

    // 트레이싱 테이블 HTML
    const traceRows = q.trace ? q.trace.map(t => `
      <tr>
        <td style="font-weight:700; width:45px;">#${t.step}</td>
        <td style="font-family:'JetBrains Mono', monospace; font-size:0.75rem; color:#0284c7;">${escapeHtml(t.line || '')}</td>
        <td>${escapeHtml(t.desc)}</td>
      </tr>
    `).join('') : '';

    return `
      <article class="q-card ${statusClass}" id="card-q-${q.id}">
        <div class="q-card-header">
          <div class="q-badge-row">
            <span class="q-num-badge">Q${q.id}</span>
            <span class="lang-badge ${q.lang}">${q.lang.toUpperCase()}</span>
            <span class="year-badge">${q.year}</span>
            <span class="diff-badge" title="난이도 ${q.difficulty}">${stars}</span>
          </div>
          <div class="q-header-right" style="display:flex; align-items:center; gap:8px;">
            <div class="q-char-pill" title="${charName}의 팁 문제">
              <img src="assets/${charKey}.png" alt="${charName}" class="q-char-pill-img">
              <span>${charName}</span>
            </div>
            <button class="btn-bookmark ${isBookmarked ? 'bookmarked' : ''}" 
                    onclick="toggleBookmark(${q.id})" 
                    title="${isBookmarked ? '즐겨찾기 해제' : '즐겨찾기 추가'}">
              ${isBookmarked ? '⭐' : '☆'}
            </button>
          </div>
        </div>

        <h3 class="q-card-title">${q.title}</h3>
        <p class="q-card-desc">${q.question}</p>

        <div class="code-box">
          <pre><code>${escapeHtml(q.code)}</code></pre>
        </div>

        <div class="answer-area">
          <div class="input-row">
            <input type="text" 
                   class="answer-input" 
                   id="input-q-${q.id}" 
                   placeholder="실행 결과(출력값) 입력..." 
                   value="${solved ? escapeHtml(solved.userAnswer) : ''}"
                   onkeydown="if(event.key==='Enter') submitAnswer(${q.id})">
            <button class="btn-submit" onclick="submitAnswer(${q.id})">
              <span>채점</span>
            </button>
          </div>

          ${statusFeedback}

          <button class="btn-toggle-explain" onclick="toggleExplain(${q.id})">
            💡 해설 &amp; 변수 추적표 보기
          </button>

          <div class="explain-panel" id="explain-q-${q.id}">
            <div class="explain-correct-ans">
              정답: <strong>${escapeHtml(q.answer)}</strong>
            </div>
            <p style="margin-bottom: 8px;">${q.explanation}</p>

            ${traceRows ? `
              <div class="trace-table-wrap">
                <div style="font-size:0.75rem; font-weight:700; color:#64748b; margin-bottom:4px;">🔍 단계별 실행 흐름 (Variable Trace)</div>
                <table class="trace-table">
                  <thead>
                    <tr><th>단계</th><th>코드</th><th>실행 내용</th></tr>
                  </thead>
                  <tbody>${traceRows}</tbody>
                </table>
              </div>
            ` : ''}

            <div class="char-tip-bubble">
              <img src="assets/${q.character || 'chiikawa'}.png" class="char-tip-img" onerror="this.src='assets/chiikawa.png'">
              <div>${q.tip}</div>
            </div>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// 답안 채점
function submitAnswer(qId) {
  sound.playClick();
  const inputEl = document.getElementById(`input-q-${qId}`);
  if (!inputEl) return;
  const userAns = inputEl.value.trim();

  if (!userAns) {
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 400);
    inputEl.focus();
    return;
  }

  const q = QUESTIONS_DATA.find(item => item.id === qId);
  if (!q) return;

  const isCorrect = checkUserAnswer(userAns, q.answer, q.altAnswers);

  // 상태 업데이트
  APP_STATE.solvedData[qId] = {
    isCorrect,
    userAnswer: userAns,
    timestamp: Date.now()
  };
  saveUserData();
  updateHeaderStats();

  const card = document.getElementById(`card-q-${qId}`);
  const charKey = q.character || 'chiikawa';

  if (isCorrect) {
    sound.playCorrect();
    setCharacterSpeech(charKey, 1);
    if (card) {
      card.classList.remove('status-wrong');
      card.classList.add('status-correct');
    }
  } else {
    sound.playWrong();
    setCharacterSpeech('hachiware', 2);
    if (card) {
      card.classList.remove('status-correct');
      card.classList.add('status-wrong');
    }
    inputEl.classList.add('shake');
    setTimeout(() => inputEl.classList.remove('shake'), 400);
  }

  renderSingleCardFeedback(qId);
}

// 개별 카드 피드백 UI 갱신 (전체 리스트 깜빡임 및 스크롤 튐 방지)
function renderSingleCardFeedback(qId) {
  const card = document.getElementById(`card-q-${qId}`);
  if (!card) return;
  const q = QUESTIONS_DATA.find(item => item.id === qId);
  if (!q) return;
  const solved = APP_STATE.solvedData[qId];
  if (!solved) return;

  const charKey = q.character || 'chiikawa';
  let fbEl = card.querySelector('.feedback-box');
  if (!fbEl) {
    fbEl = document.createElement('div');
    const inputRow = card.querySelector('.input-row');
    if (inputRow && inputRow.parentNode) {
      inputRow.parentNode.insertBefore(fbEl, inputRow.nextSibling);
    }
  }

  if (solved.isCorrect) {
    fbEl.className = 'feedback-box correct';
    fbEl.style.display = 'flex';
    fbEl.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="assets/${charKey}.png" style="width:26px; height:26px; object-fit:contain;">
        <span>✨ 정답입니다! (${escapeHtml(solved.userAnswer)})</span>
      </div>
      <span>⭕</span>
    `;
  } else {
    fbEl.className = 'feedback-box wrong';
    fbEl.style.display = 'flex';
    fbEl.innerHTML = `
      <div style="display:flex; align-items:center; gap:8px;">
        <img src="assets/${charKey}.png" style="width:26px; height:26px; object-fit:contain; filter:grayscale(40%);">
        <span>❌ 오답입니다! (내 답: ${escapeHtml(solved.userAnswer)})</span>
      </div>
      <span style="font-size:0.75rem; color:#dc2626;">다시 도전해보세요!</span>
    `;
  }
}

// 해설 토글
function toggleExplain(qId) {
  sound.playClick();
  const panel = document.getElementById(`explain-q-${qId}`);
  if (panel) {
    panel.classList.toggle('open');
  }
}

// 북마크 토글
function toggleBookmark(qId) {
  sound.playClick();
  if (APP_STATE.bookmarks.has(qId)) {
    APP_STATE.bookmarks.delete(qId);
  } else {
    APP_STATE.bookmarks.add(qId);
  }
  saveUserData();
  updateHeaderStats();
  renderQuestionsList();
}

// 탭 전환
function switchTab(tabId) {
  sound.playClick();
  APP_STATE.activeTab = tabId;

  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });

  document.querySelectorAll('.tab-pane').forEach(pane => {
    pane.classList.toggle('active', pane.id === `tab-${tabId}`);
  });

  if (tabId === 'practice') {
    renderQuestionsList();
  } else if (tabId === 'dashboard') {
    renderDashboard();
  } else if (tabId === 'wrong') {
    // 오답노트 모드: 상태 필터를 'wrong'으로 설정하고 연습 탭과 동일하게 노출
    APP_STATE.statusFilter = 'wrong';
    document.querySelectorAll('.filter-btn[data-status]').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.status === 'wrong');
    });
    renderQuestionsList();
  } else if (tabId === 'minigame') {
    setCharacterSpeech('usagi', 0);
  }
}

// 대시보드 렌더링
function renderDashboard() {
  const total = QUESTIONS_DATA.length;
  const solvedKeys = Object.keys(APP_STATE.solvedData);
  const correctCount = solvedKeys.filter(id => APP_STATE.solvedData[id]?.isCorrect).length;
  const wrongCount = solvedKeys.filter(id => APP_STATE.solvedData[id] && !APP_STATE.solvedData[id].isCorrect).length;
  const rate = solvedKeys.length > 0 ? Math.round((correctCount / solvedKeys.length) * 100) : 0;
  const rank = getRankInfo(correctCount);

  // 대시보드 수치 삽입
  const elDashTotal = document.getElementById('dash-total-solved');
  const elDashCorrect = document.getElementById('dash-correct');
  const elDashRate = document.getElementById('dash-rate');
  const elDashRank = document.getElementById('dash-rank-name');

  if (elDashTotal) elDashTotal.innerText = `${solvedKeys.length} / ${total}`;
  if (elDashCorrect) elDashCorrect.innerText = correctCount;
  if (elDashRate) elDashRate.innerText = `${rate}%`;
  if (elDashRank) elDashRank.innerText = rank.name;

  const elDashCharImg = document.getElementById('dash-rank-char-img');
  const elDashCharQuote = document.getElementById('dash-rank-char-quote');
  if (elDashCharImg) {
    elDashCharImg.src = `assets/${rank.character}.png`;
  }
  if (elDashCharQuote) {
    elDashCharQuote.innerText = rank.quote;
  }

  // 언어별 진행도 바
  const langs = ['c', 'java', 'python', 'sql'];
  const langLabels = { c: 'C언어 (35문항)', java: 'Java (40문항)', python: 'Python (20문항)', sql: 'SQL/자료구조 (5문항)' };
  const langColors = { c: '#0284c7', java: '#ea580c', python: '#059669', sql: '#7c3aed' };

  const barContainer = document.getElementById('dash-lang-bars');
  if (barContainer) {
    barContainer.innerHTML = langs.map(l => {
      const qOfLang = QUESTIONS_DATA.filter(q => q.lang === l);
      const correctOfLang = qOfLang.filter(q => APP_STATE.solvedData[q.id]?.isCorrect).length;
      const pct = Math.round((correctOfLang / qOfLang.length) * 100);

      return `
        <div class="lang-prog-item">
          <div class="lang-prog-header">
            <span>${langLabels[l]}</span>
            <span><strong>${correctOfLang}</strong> / ${qOfLang.length} (${pct}%)</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: ${pct}%; background: ${langColors[l]};"></div>
          </div>
        </div>
      `;
    }).join('');
  }
}

// 학습 데이터 초기화
function resetProgress() {
  if (confirm("정말로 모든 학습 기록(정답/오답/북마크)을 초기화하시겠습니까? 와앗...!")) {
    sound.playClick();
    APP_STATE.solvedData = {};
    APP_STATE.bookmarks = new Set();
    saveUserData();
    updateHeaderStats();
    renderQuestionsList();
    renderDashboard();
    setCharacterSpeech('chiikawa', 0);
  }
}

// 초기화 바인딩
document.addEventListener('DOMContentLoaded', () => {
  loadUserData();
  updateHeaderStats();
  setCharacterSpeech('chiikawa');
  renderQuestionsList();

  // 음향 토글
  const soundBtn = document.getElementById('btn-sound');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      APP_STATE.soundEnabled = !APP_STATE.soundEnabled;
      soundBtn.innerText = APP_STATE.soundEnabled ? '🔊 사운드 ON' : '🔇 사운드 OFF';
      sound.playClick();
    });
  }

  // 언어 필터 버튼 이벤트
  document.querySelectorAll('.filter-btn[data-lang]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      sound.playClick();
      document.querySelectorAll('.filter-btn[data-lang]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      APP_STATE.langFilter = e.target.dataset.lang;
      renderQuestionsList();
    });
  });

  // 상태 필터 버튼 이벤트
  document.querySelectorAll('.filter-btn[data-status]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      sound.playClick();
      document.querySelectorAll('.filter-btn[data-status]').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      APP_STATE.statusFilter = e.target.dataset.status;
      renderQuestionsList();
    });
  });

  // 실시간 검색창
  const searchInput = document.getElementById('search-questions');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      APP_STATE.searchQuery = e.target.value;
      renderQuestionsList();
    });
  }

  // 캐릭터 클릭 시 대사 변경 (6총사 순환)
  const heroChar = document.getElementById('hero-character-img');
  if (heroChar) {
    const chars = ['chiikawa', 'hachiware', 'usagi', 'kurimanju', 'momonga', 'rakko'];
    heroChar.addEventListener('click', () => {
      sound.playClick();
      const currentIdx = chars.indexOf(APP_STATE.currentSpeechChar);
      const nextChar = chars[(currentIdx + 1) % chars.length];
      setCharacterSpeech(nextChar);
    });
  }

  // 캐릭터 파트너 직접 선택 버튼 바
  document.querySelectorAll('.char-partner-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      sound.playClick();
      const targetChar = e.currentTarget.dataset.char;
      setCharacterSpeech(targetChar);
    });
  });
});
