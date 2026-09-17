// SWL5 Master - 지필평가 통합 엔진 (1. 개념학습 / 2. 스피드 퀴즈 / 3. 실전 기출모의고사)

function initWrittenModule() {
    initWrittenTheory();
    initWrittenSpeedQuiz();
    initWrittenMockExam();
}

// ==========================================
// 1. 지필평가 개념 학습 (Theory Learning)
// ==========================================
function initWrittenTheory() {
    const container = document.getElementById("written-theory-list");
    const searchInput = document.getElementById("written-theory-search");
    const categoryContainer = document.getElementById("written-theory-categories");
    if (!container) return;

    let activeCategory = "all";

    // 카테고리 목록 추출
    const categories = ["all", ...new Set(WRITTEN_THEORY_DATA.map(t => t.category))];
    
    if (categoryContainer) {
        categoryContainer.innerHTML = categories.map(cat => `
            <button class="written-filter-btn ${cat === 'all' ? 'active' : ''}" data-category="${cat}">
                ${cat === 'all' ? '전체 보기 (전체 ' + WRITTEN_THEORY_DATA.length + '개 핵심개념)' : cat}
            </button>
        `).join("");

        categoryContainer.querySelectorAll(".written-filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                categoryContainer.querySelectorAll(".written-filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                activeCategory = btn.getAttribute("data-category");
                renderTheories();
            });
        });
    }

    function renderTheories() {
        const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

        const filtered = WRITTEN_THEORY_DATA.filter(item => {
            const matchesCat = activeCategory === "all" || item.category === activeCategory;
            const matchesSearch = !keyword || 
                item.title.toLowerCase().includes(keyword) ||
                item.content.toLowerCase().includes(keyword) ||
                item.tags.some(t => t.toLowerCase().includes(keyword));
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                    🔍 검색어 "<strong>${escapeHtml(keyword)}</strong>"에 해당하는 지필 이론이 없습니다.<br/>
                    다른 키워드(예: <em>정규화, ACID, 결합도, 싱글톤, 화이트박스</em>)로 검색해 보세요.
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map(item => `
            <div class="theory-card card" id="${item.id}">
                <div class="theory-header">
                    <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                        <span class="theory-badge">${item.badge}</span>
                        <span class="theory-cat-badge">${item.category}</span>
                    </div>
                    <h3 style="font-size: 1.25rem; margin-top: 0.6rem; color: var(--primary);">${item.title}</h3>
                </div>
                <div class="theory-body" style="margin-top: 1rem; line-height: 1.7; color: var(--text-main);">
                    ${item.content}
                </div>
                <div class="theory-footer" style="margin-top: 1.2rem; padding-top: 0.75rem; border-top: 1px dashed #e2e8f0; display: flex; gap: 0.4rem; flex-wrap: wrap; align-items: center;">
                    <span style="font-size: 0.8rem; color: #94a3b8; font-weight: 600;">연관 키워드:</span>
                    ${item.tags.map(t => `<span class="theory-tag">#${t}</span>`).join("")}
                </div>
            </div>
        `).join("");
    }

    if (searchInput) {
        searchInput.addEventListener("input", renderTheories);
    }

    renderTheories();
}

// ==========================================
// ==========================================
// 2. 지필평가 스피드 퀴즈 (Speed Quiz 100제)
// ==========================================
function initWrittenSpeedQuiz() {
    const container = document.getElementById("speed-quiz-container");
    const scoreBanner = document.getElementById("speed-quiz-score");
    const progressFill = document.getElementById("speed-quiz-progress-fill");
    const resetBtn = document.getElementById("btn-reset-speed-quiz");
    const searchInput = document.getElementById("speed-quiz-search");
    const filterContainer = document.getElementById("speed-quiz-filters");
    if (!container) return;

    // 문제 풀이 상태 영구 보존 객체 { [quizId]: { isAnswered: true, isCorrect: boolean, userVal: string } }
    const quizState = {};
    let activeFilter = "all";

    function updateQuizScore() {
        const totalCount = WRITTEN_SPEED_QUIZ.length;
        let solvedCount = 0;
        let correctCount = 0;

        Object.values(quizState).forEach(st => {
            if (st.isAnswered) {
                solvedCount++;
                if (st.isCorrect) correctCount++;
            }
        });

        const percent = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;
        const correctRate = solvedCount > 0 ? Math.round((correctCount / solvedCount) * 100) : 0;

        if (scoreBanner) {
            scoreBanner.innerHTML = `
                <div style="display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;">
                    <span>풀이 진행: <strong style="color: var(--primary); font-size: 1.1rem;">${solvedCount} / ${totalCount}문항 (${percent}%)</strong></span>
                    <span>정답 수: <strong style="color: var(--success); font-size: 1.1rem;">${correctCount}개</strong></span>
                    <span>정답률: <strong style="color: ${solvedCount > 0 && correctRate >= 80 ? 'var(--success)' : 'var(--primary)'}; font-size: 1.1rem;">${correctRate}%</strong></span>
                </div>
            `;
        }

        if (progressFill) {
            progressFill.style.width = `${percent}%`;
            progressFill.style.background = percent >= 80 ? "linear-gradient(90deg, #10b981, #059669)" : "linear-gradient(90deg, #6366f1, #4f46e5)";
        }
    }

    function renderQuizzes() {
        const keyword = searchInput ? searchInput.value.toLowerCase().trim() : "";

        const filtered = WRITTEN_SPEED_QUIZ.filter(q => {
            let matchesFilter = true;
            if (activeFilter !== "all") {
                if (activeFilter.startsWith("type:")) {
                    const targetType = activeFilter.replace("type:", "");
                    matchesFilter = q.type === targetType;
                } else {
                    matchesFilter = q.category === activeFilter;
                }
            }

            const matchesSearch = !keyword ||
                q.question.toLowerCase().includes(keyword) ||
                q.category.toLowerCase().includes(keyword) ||
                q.answer.toLowerCase().includes(keyword) ||
                (q.acceptedAnswers && q.acceptedAnswers.some(a => a.toLowerCase().includes(keyword))) ||
                (q.explanation && q.explanation.toLowerCase().includes(keyword));

            return matchesFilter && matchesSearch;
        });

        updateQuizScore();

        if (filtered.length === 0) {
            container.innerHTML = `
                <div class="card" style="text-align: center; color: var(--text-muted); padding: 3rem;">
                    🔍 조건에 해당하는 퀴즈 문항이 없습니다.<br/>
                    다른 검색어나 필터(전체 보기)를 선택해 보세요.
                </div>
            `;
            return;
        }

        container.innerHTML = filtered.map((q, idx) => {
            const st = quizState[q.id] || { isAnswered: false };
            let interactionHtml = "";

            if (q.type === "OX") {
                interactionHtml = `
                    <div class="quiz-ox-group ${st.isAnswered ? 'answered' : ''}" id="ox-group-${q.id}">
                        <button type="button" class="ox-btn ${st.isAnswered ? (q.answer === 'O' ? 'correct' : (st.userVal === 'O' ? 'wrong' : '')) : ''}" 
                                ${st.isAnswered ? 'disabled' : ''} onclick="checkOxAnswer(${q.id}, 'O')">⭕ O</button>
                        <button type="button" class="ox-btn ${st.isAnswered ? (q.answer === 'X' ? 'correct' : (st.userVal === 'X' ? 'wrong' : '')) : ''}" 
                                ${st.isAnswered ? 'disabled' : ''} onclick="checkOxAnswer(${q.id}, 'X')">❌ X</button>
                    </div>
                `;
            } else {
                interactionHtml = `
                    <div class="quiz-blank-group ${st.isAnswered ? 'answered' : ''}" id="blank-group-${q.id}" style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
                        <input type="text" id="blank-input-${q.id}" class="code-blank-input" 
                               value="${st.userVal || ''}"
                               placeholder="정답 단어 입력..." 
                               style="max-width: 280px; ${st.isAnswered ? (st.isCorrect ? 'border-color: #10b981; background: #ecfdf5;' : 'border-color: #ef4444; background: #fef2f2;') : ''}" 
                               ${st.isAnswered ? 'disabled' : ''}
                               onkeydown="if(event.key==='Enter') checkBlankAnswer(${q.id})">
                        <button type="button" class="btn-primary" style="padding: 0.4rem 1.2rem;" 
                                ${st.isAnswered ? 'disabled' : ''} onclick="checkBlankAnswer(${q.id})">정답 확인</button>
                    </div>
                `;
            }

            const badgeHtml = st.isAnswered
                ? (st.isCorrect
                    ? `<span style="color: var(--success); font-weight: bold; font-size: 1.05rem;">✔️ 정답!</span>`
                    : `<span style="color: #dc2626; font-weight: bold; font-size: 1.05rem;">❌ 오답</span>`)
                : "";

            const expDisplay = st.isAnswered ? "block" : "none";
            const answerDisplay = q.type === "OX" ? (q.answer === "O" ? "⭕ O" : "❌ X") : q.answer;

            return `
                <div class="card quiz-card" id="quiz-card-${q.id}" style="margin-bottom: 1.2rem; ${st.isAnswered ? (st.isCorrect ? 'border-left: 4px solid var(--success);' : 'border-left: 4px solid #ef4444;') : ''}">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
                            <span class="quiz-number" style="background: var(--secondary);">Q${q.id}</span>
                            <span class="theory-cat-badge">${q.category}</span>
                            <span style="font-size: 0.82rem; font-weight: bold; color: var(--secondary);">[${q.type === 'OX' ? 'O/X 퀴즈' : '단답형 주관식'}]</span>
                            <span style="font-size: 0.78rem; color: var(--text-muted);">(${idx + 1} / ${filtered.length})</span>
                        </div>
                        <div id="quiz-result-badge-${q.id}">${badgeHtml}</div>
                    </div>
                    <p style="font-size: 1.05rem; font-weight: 600; margin: 0.5rem 0 1rem 0; line-height: 1.6;">${q.question}</p>
                    ${interactionHtml}
                    <div class="quiz-explanation-box" id="quiz-exp-${q.id}" style="display: ${expDisplay}; margin-top: 1rem; padding: 1rem; background: #f8fafc; border-left: 4px solid var(--secondary); border-radius: 4px;">
                        <div style="font-weight: bold; margin-bottom: 0.35rem;">💡 정답: <span id="quiz-ans-text-${q.id}" style="color: var(--secondary); font-size: 1.05rem;">${answerDisplay}</span></div>
                        <p style="font-size: 0.92rem; color: #475569; line-height: 1.6; margin: 0;">${q.explanation || q.comment || ''}</p>
                    </div>
                </div>
            `;
        }).join("");
    }

    // O/X 정답 체크 전역 함수 바인딩
    window.checkOxAnswer = function(quizId, userChoice) {
        const q = WRITTEN_SPEED_QUIZ.find(item => String(item.id) === String(quizId));
        if (!q) return;

        const group = document.getElementById(`ox-group-${quizId}`);
        const badge = document.getElementById(`quiz-result-badge-${quizId}`);
        const expBox = document.getElementById(`quiz-exp-${quizId}`);
        const ansText = document.getElementById(`quiz-ans-text-${quizId}`);
        const card = document.getElementById(`quiz-card-${quizId}`);

        if (!group || group.classList.contains("answered")) return;
        group.classList.add("answered");

        const isCorrect = String(userChoice).toUpperCase() === String(q.answer).toUpperCase();
        quizState[quizId] = { isAnswered: true, isCorrect: isCorrect, userVal: userChoice };

        group.querySelectorAll(".ox-btn").forEach(btn => {
            btn.disabled = true;
            if (btn.innerText.includes(q.answer)) {
                btn.classList.add("correct");
            } else if (btn.innerText.includes(userChoice) && !isCorrect) {
                btn.classList.add("wrong");
            }
        });

        if (badge) {
            badge.innerHTML = isCorrect 
                ? `<span style="color: var(--success); font-weight: bold; font-size: 1.05rem;">✔️ 정답!</span>`
                : `<span style="color: #dc2626; font-weight: bold; font-size: 1.05rem;">❌ 오답</span>`;
        }

        if (card) {
            card.style.borderLeft = isCorrect ? "4px solid var(--success)" : "4px solid #ef4444";
        }

        if (ansText) ansText.textContent = q.answer === 'O' ? '⭕ O' : '❌ X';
        if (expBox) expBox.style.display = "block";
        updateQuizScore();
    };

    // 단답형 정답 체크 전역 함수 바인딩
    window.checkBlankAnswer = function(quizId) {
        const q = WRITTEN_SPEED_QUIZ.find(item => String(item.id) === String(quizId));
        const input = document.getElementById(`blank-input-${quizId}`);
        const group = document.getElementById(`blank-group-${quizId}`);
        const badge = document.getElementById(`quiz-result-badge-${quizId}`);
        const expBox = document.getElementById(`quiz-exp-${quizId}`);
        const ansText = document.getElementById(`quiz-ans-text-${quizId}`);
        const card = document.getElementById(`quiz-card-${quizId}`);

        if (!q || !input || group.classList.contains("answered")) return;
        const userVal = input.value.trim().toLowerCase().replace(/\s+/g, '');
        if (!userVal) {
            alert("정답 단어를 입력해 주세요!");
            input.focus();
            return;
        }

        group.classList.add("answered");
        input.disabled = true;
        const submitBtn = group.querySelector("button");
        if (submitBtn) submitBtn.disabled = true;

        const answersList = q.acceptedAnswers || q.altAnswers || [q.answer];
        const isCorrect = answersList.some(ans => ans.toLowerCase().replace(/\s+/g, '') === userVal);
        quizState[quizId] = { isAnswered: true, isCorrect: isCorrect, userVal: input.value.trim() };

        if (isCorrect) {
            input.style.borderColor = "#10b981";
            input.style.background = "#ecfdf5";
        } else {
            input.style.borderColor = "#ef4444";
            input.style.background = "#fef2f2";
        }

        if (badge) {
            badge.innerHTML = isCorrect 
                ? `<span style="color: var(--success); font-weight: bold; font-size: 1.05rem;">✔️ 정답!</span>`
                : `<span style="color: #dc2626; font-weight: bold; font-size: 1.05rem;">❌ 오답</span>`;
        }

        if (card) {
            card.style.borderLeft = isCorrect ? "4px solid var(--success)" : "4px solid #ef4444";
        }

        if (ansText) ansText.textContent = q.answer;
        if (expBox) expBox.style.display = "block";
        updateQuizScore();
    };

    // 필터 버튼 이벤트 바인딩
    if (filterContainer) {
        filterContainer.querySelectorAll(".written-filter-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                filterContainer.querySelectorAll(".written-filter-btn").forEach(b => b.classList.remove("active"));
                btn.classList.add("active");
                activeFilter = btn.getAttribute("data-filter");
                renderQuizzes();
            });
        });
    }

    // 검색어 입력 이벤트 바인딩
    if (searchInput) {
        searchInput.addEventListener("input", () => {
            renderQuizzes();
        });
    }

    // 초기화 버튼 이벤트 바인딩
    if (resetBtn) {
        resetBtn.addEventListener("click", () => {
            if (confirm("100문항 퀴즈의 풀이 상태를 모두 초기화하고 처음부터 다시 푸시겠습니까?")) {
                Object.keys(quizState).forEach(k => delete quizState[k]);
                renderQuizzes();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    }

    renderQuizzes();
}

// ==========================================
// 3. 지필평가 실전 기출 모의고사 (Mock Exam)
// ==========================================
let writtenTimerInterval = null;
let writtenTimeLeft = 60 * 60; // 60 minutes = 3600 seconds
let currentExamKey = "exam-1"; // 기본 1회차
let renderMockExamFn = null;

function getCurrentExamData() {
    if (typeof WRITTEN_MOCK_EXAMS !== "undefined" && WRITTEN_MOCK_EXAMS[currentExamKey]) {
        return WRITTEN_MOCK_EXAMS[currentExamKey];
    }
    return {
        id: "exam-1",
        title: "제1회 실전 모의고사 (기출 표준형)",
        badge: "기출 표준형 🎯",
        desc: "외부평가 지필시험 출제 1순위 핵심 개념과 단골 함정을 종합 점검하는 표준 실전 모의고사 (문항당 5점, 100점 만점)",
        questions: typeof WRITTEN_MOCK_EXAM !== "undefined" ? WRITTEN_MOCK_EXAM : []
    };
}

// 전역 회차 전환 함수 (지필 모의고사)
window.switchWrittenMockExam = function(examKey) {
    if (typeof WRITTEN_MOCK_EXAMS === "undefined" || !WRITTEN_MOCK_EXAMS[examKey]) return;
    currentExamKey = examKey;

    document.querySelectorAll(".exam-set-pill").forEach(pill => pill.classList.remove("active"));
    const activePill = document.getElementById(`pill-${examKey}`);
    if (activePill) activePill.classList.add("active");

    if (typeof renderMockExamFn === "function") {
        renderMockExamFn();
    } else if (typeof initWrittenMockExam === "function") {
        initWrittenMockExam();
    }

    const examHeader = document.getElementById("mock-exam-selector") || document.getElementById("mock-exam-set-selector");
    if (examHeader) {
        examHeader.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
};

function initWrittenMockExam() {
    const container = document.getElementById("mock-exam-container");
    const submitBtn = document.getElementById("btn-submit-mock-exam");
    const retryBtn = document.getElementById("btn-retry-mock-exam");
    const resultBox = document.getElementById("mock-exam-result-banner");
    const omrGrid = document.getElementById("mock-omr-grid");
    const omrStatusText = document.getElementById("mock-omr-status-text");

    // 타이머 컨트롤
    const timerDisplay = document.getElementById("written-timer-display");
    const startTimerBtn = document.getElementById("btn-mock-timer-start");
    const pauseTimerBtn = document.getElementById("btn-mock-timer-pause");
    const resetTimerBtn = document.getElementById("btn-mock-timer-reset");

    if (!container) return;

    // 1. 타이머 유틸리티
    function updateTimerUI() {
        if (!timerDisplay) return;
        const minutes = String(Math.floor(writtenTimeLeft / 60)).padStart(2, '0');
        const seconds = String(writtenTimeLeft % 60).padStart(2, '0');
        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (writtenTimeLeft <= 300 && writtenTimeLeft > 0) {
            timerDisplay.style.color = "#dc2626";
            timerDisplay.style.borderColor = "#dc2626";
        } else {
            timerDisplay.style.color = "var(--primary)";
            timerDisplay.style.borderColor = "var(--border-color)";
        }
    }

    if (startTimerBtn && pauseTimerBtn && resetTimerBtn) {
        startTimerBtn.onclick = () => {
            if (writtenTimerInterval) return;
            writtenTimerInterval = setInterval(() => {
                if (writtenTimeLeft > 0) {
                    writtenTimeLeft--;
                    updateTimerUI();
                } else {
                    clearInterval(writtenTimerInterval);
                    writtenTimerInterval = null;
                    alert("⏰ 시험 종료 시간(60분)이 다 되었습니다! 답안을 자동 제출합니다.");
                    if (submitBtn) submitBtn.click();
                }
            }, 1000);
            startTimerBtn.style.display = "none";
            pauseTimerBtn.style.display = "inline-flex";
        };

        pauseTimerBtn.onclick = () => {
            clearInterval(writtenTimerInterval);
            writtenTimerInterval = null;
            startTimerBtn.style.display = "inline-flex";
            pauseTimerBtn.style.display = "none";
        };

        resetTimerBtn.onclick = () => {
            clearInterval(writtenTimerInterval);
            writtenTimerInterval = null;
            writtenTimeLeft = 60 * 60;
            updateTimerUI();
            if (startTimerBtn) startTimerBtn.style.display = "inline-flex";
            if (pauseTimerBtn) pauseTimerBtn.style.display = "none";
        };
    }

    // 2. OMR 현황 갱신 (선택된 회차의 20문항 기준)
    function updateOmrStatus() {
        let answered = 0;
        const examQuestions = getCurrentExamData().questions;
        const total = examQuestions.length;

        examQuestions.forEach(q => {
            const omrBtn = document.getElementById(`omr-btn-${q.id}`);
            let isAnswered = false;

            if (q.type === "CHOICE") {
                const selected = document.querySelector(`input[name="mock-q-${q.id}"]:checked`);
                isAnswered = !!selected;
            } else {
                const textInput = document.getElementById(`mock-input-${q.id}`);
                isAnswered = textInput && textInput.value.trim() !== "";
            }

            if (isAnswered) {
                answered++;
                if (omrBtn) omrBtn.classList.add("answered");
            } else {
                if (omrBtn) omrBtn.classList.remove("answered");
            }
        });

        if (omrStatusText) {
            omrStatusText.innerHTML = `답안 작성: <strong>${answered} / ${total}문항 완료</strong> (미작성: <strong style="color: ${total - answered > 0 ? '#dc2626' : 'var(--success)'};">${total - answered}문항</strong>)`;
        }
    }

    // 3. 모의고사 렌더링 (선택된 회차에 맞게 동적 렌더링)
    function renderMockExam() {
        // 타이머 리셋
        if (resetTimerBtn) resetTimerBtn.click();

        if (resultBox) {
            resultBox.style.display = "none";
            resultBox.innerHTML = "";
        }
        if (submitBtn) submitBtn.style.display = "inline-flex";
        if (retryBtn) retryBtn.style.display = "none";

        const examData = getCurrentExamData();
        const examQuestions = examData.questions;

        // 회차별 메타 정보 갱신
        const badgeEl = document.getElementById("current-exam-badge");
        const titleEl = document.getElementById("current-exam-title");
        const descEl = document.getElementById("current-exam-desc");
        if (badgeEl) badgeEl.textContent = `한국산업인력공단 외부평가 실전 공식 규격 · ${examData.badge}`;
        if (titleEl) titleEl.textContent = `📝 ${examData.title} (20문항 / 60분)`;
        if (descEl) descEl.textContent = examData.desc;

        // OMR 그리드 렌더링 (1~20)
        if (omrGrid) {
            omrGrid.innerHTML = examQuestions.map((q, idx) => `
                <button type="button" class="omr-btn" id="omr-btn-${q.id}" onclick="jumpToQuestion(${q.id})" title="문항 ${idx + 1}번 (${q.type === 'CHOICE' ? '객관식' : '주관식'})으로 이동">
                    ${idx + 1}
                </button>
            `).join("");
        }

        // 20문항 시험지 렌더링 (문항당 5점)
        container.innerHTML = examQuestions.map((q, idx) => {
            let typeBadge = "";
            if (q.type === "CHOICE") {
                typeBadge = `<span style="background: #e2e8f0; color: #334155; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.78rem; font-weight: bold;">[객관식 선택형]</span>`;
            } else if (q.type === "SHORT") {
                typeBadge = `<span style="background: #fef3c7; color: #92400e; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.78rem; font-weight: bold;">[단답형 주관식]</span>`;
            } else {
                typeBadge = `<span style="background: #ede9fe; color: #5b21b6; padding: 0.15rem 0.5rem; border-radius: 4px; font-size: 0.78rem; font-weight: bold;">[서술/나열형 주관식]</span>`;
            }

            // 문제 풀이 영역 (객관식 vs 주관식 입력창)
            let inputAreaHtml = "";
            if (q.type === "CHOICE") {
                inputAreaHtml = `
                    <div class="exam-options-list">
                        ${q.options.map((opt, optIdx) => `
                            <label class="exam-option-item" id="opt-label-${q.id}-${optIdx}">
                                <input type="radio" name="mock-q-${q.id}" value="${optIdx}" class="exam-radio" onchange="onMockOptionSelected(${q.id})">
                                <span class="opt-num">${optIdx + 1}</span>
                                <span class="opt-text">${opt}</span>
                            </label>
                        `).join("")}
                    </div>
                `;
            } else {
                inputAreaHtml = `
                    <div class="exam-text-input-wrapper" style="margin: 0.75rem 0;">
                        <input type="text" id="mock-input-${q.id}" class="code-blank-input" 
                               placeholder="${q.type === 'SHORT' ? '✍️ 정답 단어 입력 (예: 직관성, Git, 가용성 등)' : '✍️ 서술/나열 정답 입력 (예: 도출, 분석, 명세, 확인)'}" 
                               style="width: 100%; max-width: 500px; font-size: 1rem; padding: 0.65rem 1rem;" 
                               oninput="onMockInputChanged(${q.id})">
                    </div>
                `;
            }

            // 정답 표시 텍스트
            let answerText = "";
            if (q.type === "CHOICE") {
                answerText = `${q.answer + 1}번. ${q.options[q.answer]}`;
            } else {
                answerText = `${q.answer}`;
            }

            return `
                <div class="card exam-question-card" id="mock-card-${q.id}" style="margin-bottom: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.75rem;">
                        <div style="display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;">
                            <span class="quiz-number" style="background: var(--primary);">문항 ${idx + 1}</span>
                            <span class="theory-cat-badge">${q.category}</span>
                            ${typeBadge}
                            <span style="font-size: 0.82rem; color: var(--text-muted);">(배점 5점)</span>
                        </div>
                        <div id="mock-badge-${q.id}"></div>
                    </div>
                    <div style="font-size: 1.08rem; font-weight: 600; line-height: 1.6; margin-bottom: 1rem; white-space: pre-line;">
                        ${q.question}
                    </div>
                    ${inputAreaHtml}
                    <div class="exam-explanation-box" id="mock-exp-${q.id}" style="display: none; margin-top: 1rem; padding: 1rem; background: #f8fafc; border-left: 4px solid var(--primary); border-radius: 4px;">
                        <div style="font-weight: bold; margin-bottom: 0.35rem;">
                            📌 정답: <span style="color: var(--primary); font-size: 1.05rem;">${answerText}</span>
                        </div>
                        <div style="font-size: 0.92rem; color: #475569; line-height: 1.6;">
                            ${q.explanation}
                        </div>
                    </div>
                </div>
            `;
        }).join("");

        updateOmrStatus();
    }

    renderMockExamFn = renderMockExam;

    // 전역 이벤트 핸들러 바인딩
    window.jumpToQuestion = function(quizId) {
        const card = document.getElementById(`mock-card-${quizId}`);
        if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
            card.style.outline = "2px solid var(--primary)";
            setTimeout(() => { card.style.outline = ""; }, 1200);
        }
    };

    window.onMockOptionSelected = function(quizId) {
        updateOmrStatus();
    };

    window.onMockInputChanged = function(quizId) {
        updateOmrStatus();
    };

    // 4. 최종 답안 제출 및 4대 과목별 분석 채점
    if (submitBtn) {
        submitBtn.onclick = () => {
            let answeredCount = 0;
            let correctCount = 0;
            const examData = getCurrentExamData();
            const examQuestions = examData.questions;
            const totalCount = examQuestions.length;

            // 과목별 정답 집계 (각 5문항, 25점 만점)
            const subjectStats = {
                "1. 요구사항 확인": { total: 0, correct: 0 },
                "2. 제품소프트웨어 패키징": { total: 0, correct: 0 },
                "3. 애플리케이션 테스트 관리": { total: 0, correct: 0 },
                "4. SW 개발 보안 구축": { total: 0, correct: 0 }
            };

            // 미작성 문항 수 계산
            examQuestions.forEach(q => {
                if (q.type === "CHOICE") {
                    const selected = document.querySelector(`input[name="mock-q-${q.id}"]:checked`);
                    if (selected) answeredCount++;
                } else {
                    const input = document.getElementById(`mock-input-${q.id}`);
                    if (input && input.value.trim() !== "") answeredCount++;
                }
            });

            if (answeredCount < totalCount) {
                const proceed = confirm(`아직 풀지 않은 문제가 ${totalCount - answeredCount}개 있습니다. 그대로 제출하시겠습니까?`);
                if (!proceed) return;
            }

            // 타이머 정지
            if (pauseTimerBtn) pauseTimerBtn.click();

            // 채점 진행
            examQuestions.forEach(q => {
                const badge = document.getElementById(`mock-badge-${q.id}`);
                const expBox = document.getElementById(`mock-exp-${q.id}`);
                const card = document.getElementById(`mock-card-${q.id}`);
                const omrBtn = document.getElementById(`omr-btn-${q.id}`);

                let isCorrect = false;

                if (q.type === "CHOICE") {
                    const selected = document.querySelector(`input[name="mock-q-${q.id}"]:checked`);
                    const userAns = selected ? parseInt(selected.value, 10) : -1;
                    isCorrect = userAns === q.answer;

                    // 보기 하이라이트 및 비활성화
                    q.options.forEach((_, optIdx) => {
                        const label = document.getElementById(`opt-label-${q.id}-${optIdx}`);
                        if (!label) return;

                        if (optIdx === q.answer) {
                            label.classList.add("correct-option");
                        } else if (optIdx === userAns && !isCorrect) {
                            label.classList.add("wrong-option");
                        }

                        const radio = label.querySelector("input");
                        if (radio) radio.disabled = true;
                    });
                } else {
                    // 단답형 및 서술형 주관식 채점
                    const input = document.getElementById(`mock-input-${q.id}`);
                    const userVal = input ? input.value.trim().toLowerCase().replace(/\s+/g, '') : "";
                    const answersList = q.acceptedAnswers || [q.answer];
                    isCorrect = userVal !== "" && answersList.some(ans => ans.toLowerCase().replace(/\s+/g, '') === userVal);

                    if (input) {
                        input.disabled = true;
                        if (isCorrect) {
                            input.style.borderColor = "#10b981";
                            input.style.background = "#ecfdf5";
                        } else {
                            input.style.borderColor = "#ef4444";
                            input.style.background = "#fef2f2";
                        }
                    }
                }

                // 과목 통계 누적
                if (!subjectStats[q.category]) {
                    subjectStats[q.category] = { total: 0, correct: 0 };
                }
                subjectStats[q.category].total++;

                if (isCorrect) {
                    correctCount++;
                    subjectStats[q.category].correct++;
                    if (badge) badge.innerHTML = `<span style="color: var(--success); font-weight: bold; font-size: 1rem;">✔️ 정답 (+5점)</span>`;
                    if (card) card.style.borderColor = "var(--success)";
                    if (omrBtn) {
                        omrBtn.classList.remove("answered");
                        omrBtn.classList.add("correct-mark");
                    }
                } else {
                    if (badge) badge.innerHTML = `<span style="color: #dc2626; font-weight: bold; font-size: 1rem;">❌ 오답 (0점)</span>`;
                    if (card) card.style.borderColor = "#fca5a5";
                    if (omrBtn) {
                        omrBtn.classList.remove("answered");
                        omrBtn.classList.add("wrong-mark");
                    }
                }

                if (expBox) expBox.style.display = "block";
            });

            const score = correctCount * 5; // 문항당 5점 = 100점 만점
            const isPassed = score >= 60;

            // 과목별 점수 바 HTML 생성
            const subjectBarsHtml = Object.keys(subjectStats).map(cat => {
                const stat = subjectStats[cat];
                const subScore = stat.correct * 5;
                const subPercent = stat.total > 0 ? Math.round((stat.correct / stat.total) * 100) : 0;
                return `
                    <div class="subject-breakdown-card">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
                            <span style="font-weight: 700; font-size: 0.95rem; color: #1e293b;">${cat}</span>
                            <span style="font-weight: 700; font-size: 0.95rem; color: ${subScore >= 15 ? 'var(--success)' : '#dc2626'};">
                                ${subScore}점 / 25점 (${stat.correct}/${stat.total}문항 정답)
                            </span>
                        </div>
                        <div class="progress-bar-bg" style="height: 8px; margin: 0;">
                            <div class="progress-bar-fill" style="width: ${subPercent}%; background: ${subPercent >= 60 ? 'linear-gradient(90deg, #10b981, #059669)' : 'linear-gradient(90deg, #f87171, #ef4444)'};"></div>
                        </div>
                    </div>
                `;
            }).join("");

            // 최종 성적표 배너 렌더링
            if (resultBox) {
                resultBox.style.display = "block";
                resultBox.innerHTML = `
                    <div class="card" style="background: ${isPassed ? 'linear-gradient(135deg, #ecfdf5, #d1fae5)' : 'linear-gradient(135deg, #fef2f2, #fee2e2)'}; border: 2px solid ${isPassed ? 'var(--success)' : '#ef4444'}; padding: 2rem; margin-bottom: 2rem;">
                        <div style="text-align: center; margin-bottom: 1.5rem;">
                            <div style="display: inline-block; background: ${isPassed ? '#059669' : '#dc2626'}; color: white; padding: 0.25rem 0.85rem; border-radius: 20px; font-size: 0.85rem; font-weight: bold; margin-bottom: 0.75rem;">
                                ${examData.title}
                            </div>
                            <div style="font-size: 3.5rem; margin-bottom: 0.3rem;">${isPassed ? '🎉 합격을 진심으로 축하합니다!' : '⚠️ 조금 더 보완 후 재도전하세요!'}</div>
                            <h2 style="font-size: 2.2rem; color: ${isPassed ? '#065f46' : '#991b1b'}; margin-bottom: 0.3rem;">
                                취득 점수: ${score}점 / 100점
                            </h2>
                            <p style="font-size: 1.1rem; font-weight: 700; color: #334155;">
                                ${isPassed ? '✅ 합격 기준(60점 이상) 충족 — 최종 합격권 달성' : '❌ 합격 기준(60점) 미달 — 불합격 위험권'}
                            </p>
                            <p style="color: #64748b; font-size: 0.95rem; margin-top: 0.25rem;">
                                총 20문항 중 <strong>${correctCount}문항 정답 (+${score}점)</strong>, <strong>${totalCount - correctCount}문항 오답</strong>
                            </p>
                        </div>

                        <!-- 4대 과목별 상세 성적 분석표 -->
                        <div style="max-width: 750px; margin: 0 auto; background: white; padding: 1.5rem; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.06);">
                            <h3 style="font-size: 1.1rem; color: #1e1b4b; margin-bottom: 1rem;">📊 4대 NCS 과목별 득점 분석 (각 25점 만점)</h3>
                            ${subjectBarsHtml}

                            <div style="margin-top: 1.25rem; padding: 1rem; background: #f8fafc; border-left: 4px solid var(--primary); border-radius: 4px; font-size: 0.92rem;">
                                <div style="font-weight: 700; color: var(--primary); margin-bottom: 0.3rem;">💡 출제위원 심층 진단 피드백:</div>
                                <div style="color: #334155; line-height: 1.6;">
                                    ${score >= 90 ? '🏆 <strong>수석 합격 최상위권입니다!</strong> 4대 과목 전반에 걸쳐 결점이 전혀 없습니다. 다음 회차 모의고사를 풀어보시거나 실기 코딩 구현(JSP + JDBC + SQL)에 시간을 집중하셔도 좋습니다.' :
                                      score >= 70 ? '🎯 <strong>안정적 합격권입니다!</strong> 60점 합격선을 여유 있게 넘겼습니다. 득점이 15점 미만인 취약 과목이 있다면 해당 과목의 [지필개념학습] 카드를 1회만 가볍게 정독해 주세요.' :
                                      score >= 60 ? '⚡ <strong>턱걸이 합격권(60~69점)!</strong> 실제 시험장의 긴장도를 고려할 때 1~2문제 실수로 불합격될 위험이 있습니다. 붉은색 오답 문제의 상세 해설을 꼼꼼히 확인하고 암기 공식을 복습하세요.' :
                                      '🚨 <strong>핵심 개념 긴급 보완 필요!</strong> 요구사항 3단계, 형상관리 Git/SVN, 정적/동적 테스트 구분, 보안 3요소 등 기본 개념에서 감점이 발생했습니다. [지필개념학습] 탭을 2회 정독 후 재시험을 권장합니다.'}
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                resultBox.scrollIntoView({ behavior: "smooth" });
            }

            submitBtn.style.display = "none";
            if (retryBtn) retryBtn.style.display = "inline-flex";
        };
    }

    if (retryBtn) {
        retryBtn.onclick = () => {
            renderMockExam();
            window.scrollTo({ top: 0, behavior: "smooth" });
        };
    }

    renderMockExam();
}
