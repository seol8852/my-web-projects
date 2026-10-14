// 치이카와 정처기 실기 코딩 마스터 100제 - 실전 CBT 모의고사 & 합격증 엔진

const EXAM_STATE = {
  isRunning: false,
  mode: 10, // 10 or 20 questions
  questions: [],
  answers: {}, // { [qId]: string }
  timerSeconds: 0,
  timerInterval: null,
  totalTime: 0
};

// 모의고사 코스 선택
function selectExamCourse(count) {
  sound.playClick();
  EXAM_STATE.mode = count;
  document.querySelectorAll('.exam-opt-card').forEach(c => {
    c.classList.toggle('selected', parseInt(c.dataset.count) === count);
  });
}

// 모의고사 시작
function startExam() {
  sound.playClick();
  EXAM_STATE.isRunning = true;
  EXAM_STATE.answers = {};

  // 문제 무작위 추출 (언어별 균형 배분)
  const cList = QUESTIONS_DATA.filter(q => q.lang === 'c');
  const jList = QUESTIONS_DATA.filter(q => q.lang === 'java');
  const pList = QUESTIONS_DATA.filter(q => q.lang === 'python');
  const sList = QUESTIONS_DATA.filter(q => q.lang === 'sql');

  const shuffle = arr => [...arr].sort(() => Math.random() - 0.5);

  let selected = [];
  if (EXAM_STATE.mode === 10) {
    // 10문제 코스: C 3, Java 4, Python 2, SQL 1
    selected = [
      ...shuffle(cList).slice(0, 3),
      ...shuffle(jList).slice(0, 4),
      ...shuffle(pList).slice(0, 2),
      ...shuffle(sList).slice(0, 1)
    ];
    EXAM_STATE.totalTime = 15 * 60; // 15분
  } else {
    // 20문제 코스: C 7, Java 8, Python 4, SQL 1
    selected = [
      ...shuffle(cList).slice(0, 7),
      ...shuffle(jList).slice(0, 8),
      ...shuffle(pList).slice(0, 4),
      ...shuffle(sList).slice(0, 1)
    ];
    EXAM_STATE.totalTime = 30 * 60; // 30분
  }

  EXAM_STATE.questions = shuffle(selected);
  EXAM_STATE.timerSeconds = EXAM_STATE.totalTime;

  // UI 전환
  const introEl = document.getElementById('exam-intro-view');
  const activeEl = document.getElementById('exam-active-view');
  if (introEl) introEl.style.display = 'none';
  if (activeEl) activeEl.style.display = 'grid';

  // OMR 시트 및 시험 문제 렌더링
  renderExamQuestions();
  renderOmrSheet();

  // 타이머 가동
  startExamTimer();
  setCharacterSpeech('hachiware', 0);
}

// 타이머 함수
function startExamTimer() {
  clearInterval(EXAM_STATE.timerInterval);
  updateTimerDisplay();

  EXAM_STATE.timerInterval = setInterval(() => {
    EXAM_STATE.timerSeconds--;
    updateTimerDisplay();

    if (EXAM_STATE.timerSeconds <= 0) {
      clearInterval(EXAM_STATE.timerInterval);
      alert("시험 시간이 종료되었습니다! 답안이 자동으로 제출됩니다.");
      finishExam();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('exam-timer-clock');
  if (!timerEl) return;

  const min = Math.floor(EXAM_STATE.timerSeconds / 60);
  const sec = EXAM_STATE.timerSeconds % 60;
  timerEl.innerText = `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;

  if (EXAM_STATE.timerSeconds <= 180) {
    timerEl.style.color = '#ef4444'; // 3분 남으면 빨간색
  } else {
    timerEl.style.color = '#38bdf8';
  }
}

// 시험 문제 목록 렌더링
function renderExamQuestions() {
  const container = document.getElementById('exam-questions-list');
  if (!container) return;

  container.innerHTML = EXAM_STATE.questions.map((q, idx) => {
    const examQNum = idx + 1;
    return `
      <div class="q-card" id="exam-q-${examQNum}" style="margin-bottom: 20px;">
        <div class="q-card-header">
          <div class="q-badge-row">
            <span class="q-num-badge" style="background:#0284c7;">제 ${examQNum} 번</span>
            <span class="lang-badge ${q.lang}">${q.lang.toUpperCase()}</span>
            <span class="year-badge">${q.year}</span>
          </div>
          <span style="font-size:0.8rem; font-weight:700; color:#64748b;">배점: ${100 / EXAM_STATE.questions.length}점</span>
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
                   id="exam-input-${examQNum}" 
                   placeholder="답안을 입력하세요..." 
                   oninput="onExamAnswerChange(${examQNum}, this.value)"
                   autocomplete="off">
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// OMR 답안 시트 렌더링
function renderOmrSheet() {
  const omrGrid = document.getElementById('exam-omr-grid');
  if (!omrGrid) return;

  omrGrid.innerHTML = EXAM_STATE.questions.map((_, idx) => {
    const num = idx + 1;
    const isAnswered = Boolean(EXAM_STATE.answers[num]?.trim());
    return `
      <div class="omr-item ${isAnswered ? 'answered' : ''}" 
           id="omr-btn-${num}" 
           onclick="scrollToExamQuestion(${num})">
        ${num}
      </div>
    `;
  }).join('');
}

// 답안 입력 시 OMR 시트 즉시 반응
function onExamAnswerChange(qNum, value) {
  EXAM_STATE.answers[qNum] = value;
  const omrItem = document.getElementById(`omr-btn-${qNum}`);
  if (omrItem) {
    omrItem.classList.toggle('answered', Boolean(value.trim()));
  }
}

// OMR 번호 클릭 시 해당 문제로 부드럽게 스크롤
function scrollToExamQuestion(qNum) {
  sound.playClick();
  const card = document.getElementById(`exam-q-${qNum}`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const input = document.getElementById(`exam-input-${qNum}`);
    if (input) input.focus();
  }
}

// 시험 제출 및 채점
function finishExam() {
  sound.playClick();
  if (EXAM_STATE.timerSeconds > 0) {
    const answeredCount = Object.values(EXAM_STATE.answers).filter(v => Boolean(v?.trim())).length;
    const unansweredCount = EXAM_STATE.questions.length - answeredCount;
    if (unansweredCount > 0) {
      if (!confirm(`아직 풀지 않은 문제가 ${unansweredCount}개 있습니다. 그래도 제출하시겠습니까?`)) {
        return;
      }
    } else {
      if (!confirm("답안을 최종 제출하시겠습니까?")) {
        return;
      }
    }
  }

  clearInterval(EXAM_STATE.timerInterval);
  EXAM_STATE.isRunning = false;

  // 채점 수행
  let correctCount = 0;
  const total = EXAM_STATE.questions.length;
  const pointsPerQuestion = 100 / total;

  EXAM_STATE.questions.forEach((q, idx) => {
    const qNum = idx + 1;
    const userAns = EXAM_STATE.answers[qNum] || '';
    const isCorrect = checkUserAnswer(userAns, q.answer, q.altAnswers);

    if (isCorrect) correctCount++;

    // 메인 연습 상태에도 자동 반영
    APP_STATE.solvedData[q.id] = {
      isCorrect,
      userAnswer: userAns,
      timestamp: Date.now()
    };
  });

  saveUserData();
  updateHeaderStats();

  const finalScore = Math.round(correctCount * pointsPerQuestion);
  const isPassed = finalScore >= 60;

  if (isPassed) {
    sound.playFanfare();
    setCharacterSpeech('chiikawa', 1);
  } else {
    sound.playWrong();
    setCharacterSpeech('hachiware', 2);
  }

  // 모달 열기 및 성적표 노출
  showExamResultModal(finalScore, correctCount, total, isPassed);
}

// 모의고사 성적표 & 치이카와 합격증 모달
function showExamResultModal(score, correct, total, isPassed) {
  const modal = document.getElementById('exam-result-modal');
  if (!modal) return;

  const scoreEl = document.getElementById('modal-score-val');
  const countEl = document.getElementById('modal-count-val');
  const passEl = document.getElementById('modal-pass-status');
  const bannerImg = document.getElementById('modal-char-banner');

  if (scoreEl) scoreEl.innerText = `${score}점`;
  if (countEl) countEl.innerText = `${correct} / ${total}`;
  if (passEl) {
    if (isPassed) {
      passEl.innerHTML = `<span style="color:#10b981;">🎉 최종 합격 (합격증 발급)</span>`;
      if (bannerImg) bannerImg.src = 'assets/chiikawa.png';
    } else {
      passEl.innerHTML = `<span style="color:#ef4444;">😢 아쉬운 불합격 (60점 이상 필요)</span>`;
      if (bannerImg) bannerImg.src = 'assets/hachiware.png';
    }
  }

  // 합격증 캔버스 렌더링
  if (isPassed) {
    document.getElementById('cert-canvas-container').style.display = 'block';
    renderCertificate(score);
  } else {
    document.getElementById('cert-canvas-container').style.display = 'none';
  }

  modal.classList.add('open');
}

// 모달 닫기
function closeExamResultModal() {
  sound.playClick();
  const modal = document.getElementById('exam-result-modal');
  if (modal) modal.classList.remove('open');

  // 시험 뷰 원복
  const introEl = document.getElementById('exam-intro-view');
  const activeEl = document.getElementById('exam-active-view');
  if (introEl) introEl.style.display = 'block';
  if (activeEl) activeEl.style.display = 'none';

  switchTab('practice');
}

// ==========================================
// HTML5 Canvas 치이카와 공인 합격증 렌더러
// ==========================================
function renderCertificate(score) {
  const canvas = document.getElementById('certCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  canvas.width = 800;
  canvas.height = 560;

  // 1. 배경 그라데이션
  const bgGrad = ctx.createLinearGradient(0, 0, 800, 560);
  bgGrad.addColorStop(0, '#fff5f7');
  bgGrad.addColorStop(0.5, '#ffffff');
  bgGrad.addColorStop(1, '#f0f9ff');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, 800, 560);

  // 2. 테두리 장식 (금빛 + 치이카와 핑크 이중선)
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, 760, 520);

  ctx.strokeStyle = '#ff758f';
  ctx.lineWidth = 3;
  ctx.strokeRect(32, 32, 736, 496);

  // 3. 상단 헤더 문구
  ctx.fillStyle = '#64748b';
  ctx.font = 'bold 16px "Pretendard", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('제초 &amp; 토벌 공인 검정위원회 인증서'.replace('&amp;', '&'), 400, 75);

  // 4. 자격증 대제목
  ctx.fillStyle = '#ff4d6d';
  ctx.font = '900 34px "Pretendard", sans-serif';
  ctx.fillText('정보처리기사 실기 코딩 합격증', 400, 125);

  // 5. 발급 번호
  const certNo = `CHII-2026-${Math.floor(100000 + Math.random() * 900000)}`;
  ctx.fillStyle = '#94a3b8';
  ctx.font = '600 13px "JetBrains Mono", monospace';
  ctx.fillText(`증서번호: ${certNo}`, 400, 155);

  // 6. 본문 내용
  const userName = "설범준 (Bumjun Seol)";
  const today = new Date();
  const dateStr = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;

  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 24px "Pretendard", sans-serif';
  ctx.fillText(`성 명 : ${userName}`, 400, 215);

  ctx.font = 'bold 20px "Pretendard", sans-serif';
  ctx.fillStyle = '#0284c7';
  ctx.fillText(`최종 취득 점수 : ${score} 점 (합격)`, 400, 255);

  ctx.font = '500 16px "Pretendard", sans-serif';
  ctx.fillStyle = '#475569';
  const descLine1 = "위 사람은 치이카와·하치와레·우사기와 함께한";
  const descLine2 = "정보처리기사 실기 프로그래밍 100제 검정 과정을";
  const descLine3 = "우수한 성적으로 마스터하였으므로 이 합격증을 수여합니다.";

  ctx.fillText(descLine1, 400, 310);
  ctx.fillText(descLine2, 400, 335);
  ctx.fillText(descLine3, 400, 360);

  // 7. 발급 일자 및 서명
  ctx.fillStyle = '#1e293b';
  ctx.font = 'bold 17px "Pretendard", sans-serif';
  ctx.fillText(dateStr, 400, 420);

  ctx.font = 'bold 21px "Pretendard", sans-serif';
  ctx.fillText('치이카와 제초 & 정보처리 검정위원회', 400, 465);

  // 8. 치이카와 6총사 일러스트 캐릭터 캔버스에 그리기 (치이카와, 하치와레, 쿠리만쥬, 모몽가, 랏코, 우사기)
  const charImgs = [
    { src: 'assets/chiikawa.png', x: 40, y: 390, w: 75, h: 75 },
    { src: 'assets/hachiware.png', x: 115, y: 400, w: 70, h: 70 },
    { src: 'assets/kurimanju.png', x: 185, y: 410, w: 65, h: 65 },
    { src: 'assets/momonga.png', x: 535, y: 410, w: 65, h: 65 },
    { src: 'assets/rakko.png', x: 600, y: 395, w: 70, h: 70 },
    { src: 'assets/usagi.png', x: 675, y: 385, w: 75, h: 75 }
  ];

  charImgs.forEach(item => {
    const img = new Image();
    img.src = item.src;
    img.onload = () => {
      ctx.drawImage(img, item.x, item.y, item.w, item.h);
    };
  });

  // 9. 공식 인감 직인 도장 그리기
  ctx.save();
  ctx.translate(620, 440);
  ctx.rotate(-0.08);

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 4;
  ctx.strokeRect(-40, -40, 80, 80);

  ctx.fillStyle = '#ef4444';
  ctx.font = 'bold 14px "Pretendard", sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('치이카와', 0, -14);
  ctx.fillText('인  장', 0, 14);
  ctx.restore();
}

// 합격증 PNG 이미지 다운로드
function downloadCertificate() {
  sound.playClick();
  const canvas = document.getElementById('certCanvas');
  if (!canvas) return;

  const link = document.createElement('a');
  link.download = `치이카와_정처기실기_합격증_${Date.now()}.png`;
  link.href = canvas.toDataURL('image/png');
  link.click();
}
