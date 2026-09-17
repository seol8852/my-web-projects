// SWL5 Master - Main Application Logic (Stage 1 & 2)
document.addEventListener("DOMContentLoaded", () => {
    initNavigation();
    initScenarios();
    initTroubleshooting();
    initSqlSandbox();
    initExamMode();
    
    // Stage 2 Initializations
    if (typeof renderSimulatorPage === "function") {
        renderSimulatorPage('index');
    }
    if (typeof initQuizEngine === "function") {
        initQuizEngine();
    }
    // Stage 4: Written Exam Module Initialization
    if (typeof initWrittenModule === "function") {
        initWrittenModule();
    }
    // Practical 7-Step Follow-Along Typing Trainer Initialization
    if (typeof practicalTrainer !== "undefined") {
        practicalTrainer.init();
    }
});

// 1. Navigation & Major Category Switching (필기 vs 실기 대분류 지원)
const TAB_TO_CATEGORY = {
    "tab-dashboard": "dashboard",
    // 1. 필기(지필평가)
    "tab-written-theory": "written",
    "tab-written-quiz": "written",
    "tab-written-exam": "written",
    // 2. 실기(코딩평가 6단계)
    "tab-practical-concept": "practical",
    "tab-guide": "practical",
    "tab-practical-sql": "practical",
    "tab-practical-jdbc": "practical",
    "tab-practical-code": "practical",
    "tab-exam": "practical",
    // 실기 보조 도구 (호환성 유지)
    "tab-scenarios": "practical",
    "tab-simulator": "practical",
    "tab-quiz": "practical",
    "tab-cheat": "practical",
    "tab-sandbox": "practical"
};

function initNavigation() {
    // 서브 내비게이션 버튼 클릭 이벤트 바인딩
    document.querySelectorAll(".sub-nav-btn[data-tab]").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-tab");
            switchTab(targetId);
        });
    });

    // 레거시 nav-btn 클릭 이벤트 지원
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetId = btn.getAttribute("data-tab");
            switchTab(targetId);
        });
    });
}

function switchCategory(category, defaultTabId) {
    // 1. 대분류 활성화 스타일 갱신
    document.querySelectorAll(".major-cat-btn").forEach(btn => btn.classList.remove("active"));
    const activeMajorBtn = document.getElementById(`cat-btn-${category}`);
    if (activeMajorBtn) activeMajorBtn.classList.add("active");

    // 2. 해당 대분류 서브 내비게이션 바 & 그룹 노출 제어
    const subNavBar = document.getElementById("sub-navbar-bar");
    const writtenGroup = document.getElementById("sub-nav-written");
    const practicalGroup = document.getElementById("sub-nav-practical");

    if (category === "dashboard") {
        if (subNavBar) subNavBar.style.display = "none";
    } else {
        if (subNavBar) subNavBar.style.display = "block";
        if (writtenGroup) writtenGroup.style.display = (category === "written") ? "flex" : "none";
        if (practicalGroup) practicalGroup.style.display = (category === "practical") ? "flex" : "none";
    }

    // 3. 대상 탭으로 이동
    let targetTab = defaultTabId;
    if (!targetTab) {
        if (category === "dashboard") targetTab = "tab-dashboard";
        else if (category === "written") targetTab = "tab-written-theory";
        else if (category === "practical") targetTab = "tab-practical-concept";
    }

    switchTab(targetTab);
}

function switchTab(tabId) {
    const targetContent = document.getElementById(tabId);
    if (!targetContent) return;

    const category = TAB_TO_CATEGORY[tabId] || "dashboard";

    // 대분류 버튼 상태 동기화
    document.querySelectorAll(".major-cat-btn").forEach(btn => btn.classList.remove("active"));
    const activeMajorBtn = document.getElementById(`cat-btn-${category}`);
    if (activeMajorBtn) activeMajorBtn.classList.add("active");

    // 서브 내비게이션 바 & 그룹 노출 동기화
    const subNavBar = document.getElementById("sub-navbar-bar");
    const writtenGroup = document.getElementById("sub-nav-written");
    const practicalGroup = document.getElementById("sub-nav-practical");

    if (category === "dashboard") {
        if (subNavBar) subNavBar.style.display = "none";
    } else {
        if (subNavBar) subNavBar.style.display = "block";
        if (writtenGroup) writtenGroup.style.display = (category === "written") ? "flex" : "none";
        if (practicalGroup) practicalGroup.style.display = (category === "practical") ? "flex" : "none";
    }

    // 서브 내비게이션 버튼 active 클래스 갱신
    document.querySelectorAll(".sub-nav-btn").forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // 레거시 nav-btn active 클래스 갱신
    document.querySelectorAll(".nav-btn").forEach(btn => {
        if (btn.getAttribute("data-tab") === tabId) {
            btn.classList.add("active");
        } else {
            btn.classList.remove("active");
        }
    });

    // 탭 콘텐츠 활성화
    document.querySelectorAll(".tab-content").forEach(tc => tc.classList.remove("active"));
    targetContent.classList.add("active");

    window.scrollTo({ top: 0, behavior: "smooth" });
}

// 2. Scenarios Module
function initScenarios() {
    const scenarioList = document.getElementById("scenario-pill-list");
    const scenarioDetail = document.getElementById("scenario-detail");
    if (!scenarioList || !scenarioDetail) return;

    // Render Scenario selection pills
    const scenarioKeys = Object.keys(SCENARIOS_DATA);
    scenarioList.innerHTML = scenarioKeys.map((key, idx) => {
        const sc = SCENARIOS_DATA[key];
        return `
            <div class="scenario-pill ${idx === 0 ? 'active' : ''}" data-id="${sc.id}">
                <span>${sc.badge}</span>
                <span>${sc.title}</span>
            </div>
        `;
    }).join("");

    // Render active scenario
    renderScenarioDetail(scenarioKeys[0]);

    // Pill click event
    scenarioList.querySelectorAll(".scenario-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            scenarioList.querySelectorAll(".scenario-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            renderScenarioDetail(pill.getAttribute("data-id"));
        });
    });
}

function renderScenarioDetail(scenarioId) {
    const sc = SCENARIOS_DATA[scenarioId];
    const container = document.getElementById("scenario-detail");
    if (!sc || !container) return;

    // Table schemas HTML
    const tablesHtml = sc.tables.map(t => `
        <div class="card" style="margin-bottom: 1rem;">
            <h4 style="color: var(--primary); margin-bottom: 0.5rem;">📋 ${t.name} (${t.desc})</h4>
            <table class="sql-result-table">
                <thead>
                    <tr><th>컬럼명</th><th>데이터타입</th><th>KEY</th><th>설명</th></tr>
                </thead>
                <tbody>
                    ${t.columns.map(c => `
                        <tr>
                            <td><strong>${c.name}</strong></td>
                            <td><code>${c.type}</code></td>
                            <td><span style="color: ${c.key ? 'red' : 'inherit'}; font-weight: bold;">${c.key || '-'}</span></td>
                            <td>${c.desc}</td>
                        </tr>
                    `).join("")}
                </tbody>
            </table>
        </div>
    `).join("");

    // Requirements list HTML
    const reqsHtml = sc.requirements.map((r, i) => `
        <li style="margin-bottom: 0.5rem;">
            <strong>[요구사항 ${i + 1}]</strong> ${r}
        </li>
    `).join("");

    // Code snippets HTML
    let codeTabsHtml = "";
    if (sc.codeSnippets) {
        codeTabsHtml = Object.keys(sc.codeSnippets).map(codeKey => {
            const code = sc.codeSnippets[codeKey];
            return `
                <div style="margin-top: 1.5rem;">
                    <div class="code-box">
                        <div class="code-header">
                            <span>📄 ${codeKey}</span>
                            <button class="copy-btn" onclick="copyCode(this)">코드 복사</button>
                        </div>
                        <pre><code>${escapeHtml(code)}</code></pre>
                    </div>
                </div>
            `;
        }).join("");
    }

    container.innerHTML = `
        <div class="card" style="margin-bottom: 1.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h3 style="font-size: 1.4rem;">${sc.title}</h3>
                <span class="brand-badge">${sc.badge}</span>
            </div>
            <p style="color: var(--text-muted);">${sc.desc}</p>
        </div>

        <div class="grid-2" style="margin-bottom: 1.5rem;">
            <div>
                <h4 style="margin-bottom: 0.75rem;">📝 핵심 요구사항 체크</h4>
                <div class="card">
                    <ul style="padding-left: 1.25rem;">
                        ${reqsHtml}
                    </ul>
                </div>
            </div>
            <div>
                <h4 style="margin-bottom: 0.75rem;">🗄️ 데이터베이스 스키마 구조</h4>
                ${tablesHtml}
            </div>
        </div>

        <div>
            <h4 style="margin-bottom: 0.75rem;">⚡ DDL / DML SQL 스크립트</h4>
            <div class="code-box">
                <div class="code-header">
                    <span>${sc.id}_init.sql</span>
                    <button class="copy-btn" onclick="copyCode(this)">SQL 복사</button>
                </div>
                <pre><code>${escapeHtml(sc.sqlScript)}</code></pre>
            </div>
        </div>

        ${codeTabsHtml ? `
            <div style="margin-top: 2rem;">
                <h4 style="margin-bottom: 0.75rem;">💻 완성 정답 코드 (JSP & Java)</h4>
                ${codeTabsHtml}
            </div>
        ` : ''}
    `;
}

// 3. Troubleshooting Module
function initTroubleshooting() {
    const listContainer = document.getElementById("faq-list");
    const searchInput = document.getElementById("faq-search");
    if (!listContainer) return;

    function renderFaq(items) {
        if (items.length === 0) {
            listContainer.innerHTML = `<div class="card" style="text-align: center; color: var(--text-muted);">검색된 트러블슈팅 내용이 없습니다.</div>`;
            return;
        }

        listContainer.innerHTML = items.map(item => `
            <div class="faq-item" id="${item.id}">
                <div class="faq-header" onclick="toggleFaq('${item.id}')">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <span class="faq-badge">${item.badge}</span>
                        <span>${item.title}</span>
                    </div>
                    <span style="font-size: 1.2rem; color: #94a3b8;">▼</span>
                </div>
                <div class="faq-body">
                    <div style="margin-bottom: 0.75rem;">
                        <strong>🚨 에러 증상:</strong>
                        <p style="color: #b91c1c; margin-top: 0.25rem;">${item.symptom}</p>
                    </div>
                    <div style="margin-bottom: 0.75rem;">
                        <strong>🔍 원인:</strong>
                        <p style="color: var(--text-main); margin-top: 0.25rem;">${item.cause}</p>
                    </div>
                    <div>
                        <strong>💡 1초 해결법:</strong>
                        <div class="code-box" style="margin-top: 0.5rem;">
                            <div class="code-header">
                                <span>Solution</span>
                                <button class="copy-btn" onclick="copyCode(this)">복사</button>
                            </div>
                            <pre><code>${escapeHtml(item.solution)}</code></pre>
                        </div>
                    </div>
                    <div style="margin-top: 0.75rem; display: flex; gap: 0.5rem;">
                        ${item.tags.map(t => `<span style="background: #f1f5f9; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.75rem; color: var(--text-muted);">#${t}</span>`).join("")}
                    </div>
                </div>
            </div>
        `).join("");
    }

    renderFaq(TROUBLESHOOT_DATA);

    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            const keyword = e.target.value.toLowerCase().trim();
            const filtered = TROUBLESHOOT_DATA.filter(item => 
                item.title.toLowerCase().includes(keyword) ||
                item.symptom.toLowerCase().includes(keyword) ||
                item.tags.some(t => t.toLowerCase().includes(keyword))
            );
            renderFaq(filtered);
        });
    }
}

function toggleFaq(id) {
    const item = document.getElementById(id);
    if (item) {
        item.classList.toggle("open");
    }
}

// 4. SQL Sandbox Module
function initSqlSandbox() {
    const engine = new MiniSqlEngine();
    const queryEditor = document.getElementById("sql-query-input");
    const runBtn = document.getElementById("btn-run-sql");
    const resultBox = document.getElementById("sql-result-container");
    const statusBox = document.getElementById("sql-status-text");

    if (!queryEditor || !runBtn || !resultBox) return;

    window.setSampleQuery = function(type) {
        if (type === 'all') {
            queryEditor.value = "SELECT * FROM member_tbl_02 ORDER BY custno ASC;";
        } else if (type === 'filter') {
            queryEditor.value = "SELECT custno, custname, phone, address, joindate, grade, city\nFROM member_tbl_02\nWHERE city IN ('01', '02') AND grade = 'A'\nORDER BY custno ASC;";
        } else if (type === 'case') {
            queryEditor.value = "SELECT custno, custname,\n       CASE grade WHEN 'A' THEN 'VIP' WHEN 'B' THEN '일반' WHEN 'C' THEN '직원' END AS 고객등급\nFROM member_tbl_02\nWHERE joindate >= '2023-12-10'\nORDER BY joindate ASC;";
        } else if (type === 'sales') {
            queryEditor.value = "SELECT mm.custno, mm.custname,\n       CASE mm.grade WHEN 'A' THEN 'VIP' WHEN 'B' THEN '일반' WHEN 'C' THEN '직원' END AS 고객등급,\n       IFNULL(SUM(mn.price), 0) AS 총매출금액\nFROM member_tbl_02 mm\nLEFT JOIN money_tbl_02 mn ON mm.custno = mn.custno\nGROUP BY mm.custno, mm.custname, mm.grade\nORDER BY 총매출금액 DESC, mm.custno ASC;";
        }
        runQuery();
    };

    function runQuery() {
        const query = queryEditor.value;
        const res = engine.execute(query);

        if (!res.success) {
            statusBox.innerHTML = `<span style="color: #dc2626;">❌ ${res.error}</span>`;
            resultBox.innerHTML = `<div style="padding: 1.5rem; color: #dc2626; background: #fef2f2; border-radius: 8px;"><strong>SQL 실행 오류:</strong><br/>${res.error}</div>`;
            return;
        }

        statusBox.innerHTML = `<span style="color: #059669;">✔️ ${res.count} row(s) in set (${res.time} sec)</span>`;

        if (res.rows.length === 0) {
            resultBox.innerHTML = `<div style="padding: 1rem; color: var(--text-muted);">조회 결과가 없습니다.</div>`;
            return;
        }

        const tableHtml = `
            <table class="sql-result-table">
                <thead>
                    <tr>${res.columns.map(c => `<th>${c}</th>`).join("")}</tr>
                </thead>
                <tbody>
                    ${res.rows.map(r => `
                        <tr>${res.columns.map(c => `<td>${r[c] !== null && r[c] !== undefined ? r[c] : 'NULL'}</td>`).join("")}</tr>
                    `).join("")}
                </tbody>
            </table>
        `;
        resultBox.innerHTML = tableHtml;
    }

    runBtn.addEventListener("click", runQuery);
    runQuery();
}

// 5. Exam Mode & Timer & Checklist
let timerInterval = null;
let remainingSeconds = 2 * 60 * 60;

function initExamMode() {
    if (typeof initMockExamSystem === 'function') {
        initMockExamSystem();
        return;
    }
    const timerDisplay = document.getElementById("timer-display");
    const startBtn = document.getElementById("btn-timer-start");
    const pauseBtn = document.getElementById("btn-timer-pause");
    const resetBtn = document.getElementById("btn-timer-reset");
    const checkboxes = document.querySelectorAll(".exam-check");
    const progressFill = document.getElementById("exam-progress-fill");
    const progressText = document.getElementById("exam-progress-text");

    if (!timerDisplay) return;

    function updateTimerDisplay() {
        const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(remainingSeconds % 60).padStart(2, '0');
        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;

        if (remainingSeconds <= 300 && remainingSeconds > 0) {
            timerDisplay.style.color = "#dc2626";
        }
    }

    startBtn.addEventListener("click", () => {
        if (timerInterval) return;
        timerInterval = setInterval(() => {
            if (remainingSeconds > 0) {
                remainingSeconds--;
                updateTimerDisplay();
            } else {
                clearInterval(timerInterval);
                timerInterval = null;
                alert("⏰ 시험 종료 시간입니다! 작성을 멈추고 검수를 진행하세요.");
            }
        }, 1000);
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-flex";
    });

    pauseBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        timerInterval = null;
        startBtn.style.display = "inline-flex";
        pauseBtn.style.display = "none";
    });

    resetBtn.addEventListener("click", () => {
        clearInterval(timerInterval);
        timerInterval = null;
        remainingSeconds = 2 * 60 * 60;
        updateTimerDisplay();
        timerDisplay.style.color = "var(--primary)";
        startBtn.style.display = "inline-flex";
        pauseBtn.style.display = "none";
    });

    function updateProgress() {
        const total = checkboxes.length;
        const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
        const percent = Math.round((checked / total) * 100);

        if (progressFill) progressFill.style.width = `${percent}%`;
        if (progressText) progressText.textContent = `${checked} / ${total} 항목 완료 (${percent}%)`;
    }

    checkboxes.forEach(cb => {
        cb.addEventListener("change", updateProgress);
    });

    updateTimerDisplay();
    updateProgress();
}

// Helper Utilities
function escapeHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function copyCode(button) {
    const pre = button.closest(".code-box").querySelector("pre code");
    if (!pre) return;

    navigator.clipboard.writeText(pre.innerText).then(() => {
        const originalText = button.innerText;
        button.innerText = "복사 완료! ✔️";
        button.style.background = "#10b981";
        setTimeout(() => {
            button.innerText = originalText;
            button.style.background = "";
        }, 1500);
    });
}
