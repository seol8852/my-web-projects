// SQL 챌린지 및 코드 빈칸 퀴즈 엔진
const SQL_CHALLENGES = [
    {
        level: 1,
        title: "레벨 1: 다중 조건 검색 (서울/경기 A등급 회원)",
        badge: "기초 조건문",
        question: "member_tbl_02 테이블에서 거주도시가 '서울(01)' 또는 '경기(02)'이면서 등급이 'A'인 회원의 custno, custname, phone, address를 회원번호 오름차순으로 조회하세요.",
        hint: "WHERE city IN ('01', '02') AND grade = 'A' ORDER BY custno ASC",
        checkFunc: (rows) => {
            if (rows.length !== 2) return false;
            const names = rows.map(r => r["회원성명(custname)"] || r.custname);
            return names.includes("김행복") && names.includes("최사랑");
        }
    },
    {
        level: 2,
        title: "레벨 2: 등급 한글 변환 (CASE WHEN)",
        badge: "출제 단골",
        question: "member_tbl_02 테이블에서 2023년 12월 10일 이후 가입자의 회원번호, 이름, 고객등급(A:VIP, B:일반, C:직원 변환)을 가입일자 오름차순으로 조회하세요.",
        hint: "CASE grade WHEN 'A' THEN 'VIP' WHEN 'B' THEN '일반' WHEN 'C' THEN '직원' END AS 고객등급",
        checkFunc: (rows) => {
            if (rows.length !== 4) return false;
            const first = rows[0];
            return (first["고객등급"] === '일반' || first["고객등급"] === 'VIP');
        }
    },
    {
        level: 3,
        title: "레벨 3: 회원별 총매출 집계 (INNER JOIN + GROUP BY)",
        badge: "핵심 집계",
        question: "member_tbl_02와 money_tbl_02를 INNER JOIN하여 회원번호, 회원성명, 고객등급(한글변환), 총매출금액을 구하고 총매출액 내림차순으로 정렬하세요. (구매 이력 있는 4명만)",
        hint: "INNER JOIN money_tbl_02 ON ... GROUP BY mm.custno, mm.custname, mm.grade ORDER BY 총매출금액 DESC",
        checkFunc: (rows) => {
            if (rows.length !== 4) return false;
            const first = rows[0];
            const topAmount = first["총매출금액"] || first.total_price;
            return topAmount === 8000;
        }
    },
    {
        level: 4,
        title: "레벨 4: 미구매 회원 0원 포함 매출 (LEFT JOIN + IFNULL)",
        badge: "최종 보스 👑",
        question: "구매 이력이 없는 회원(진평화, 차공손)도 0원으로 포함하여 전 회원(6명)의 총매출을 구하고 총매출 내림차순, 회원번호 오름차순으로 정렬하세요.",
        hint: "LEFT JOIN money_tbl_02 ON ... IFNULL(SUM(mn.price), 0) AS 총매출금액 ... ORDER BY 총매출금액 DESC, mm.custno ASC",
        checkFunc: (rows) => {
            if (rows.length !== 6) return false;
            const zeroMembers = rows.filter(r => (r["총매출금액"] === 0 || r.total_price === 0));
            return zeroMembers.length === 2;
        }
    }
];

const CODE_BLANK_QUIZZES = [
    {
        id: 1,
        title: "JDBC 드라이버 로딩",
        codeSnippet: `Class.__BLANK__("com.mysql.cj.jdbc.Driver");`,
        answer: "forName",
        hint: "자바 클래스를 이름으로 동적 로드하는 Class 클래스의 정적 메서드",
        desc: "JVM에게 MySQL 전용 드라이버를 메모리에 로드하라고 지시하는 필수 문법입니다."
    },
    {
        id: 2,
        title: "ResultSet 다음 행 커서 이동",
        codeSnippet: `while(rs.__BLANK__()) {
    // 테이블 행 출력
}`,
        answer: "next",
        hint: "다음 데이터 행으로 손가락을 이동시키며 데이터가 있으면 true를 반환하는 메서드",
        desc: "표의 행을 하나씩 전진하며 읽어오는 핵심 반복문 키워드입니다."
    },
    {
        id: 3,
        title: "HTML 폼 파라미터 값 추출",
        codeSnippet: `String name = request.__BLANK__("custname");`,
        answer: "getParameter",
        hint: "사용자가 form의 input에 입력하여 전송한 데이터를 꺼내오는 내장 객체 메서드",
        desc: "JSP에서 클라이언트가 전달한 텍스트 파라미터를 꺼내는 1순위 문법입니다."
    },
    {
        id: 4,
        title: "문자열을 정수 숫자로 변환",
        codeSnippet: `int custno = Integer.__BLANK__(request.getParameter("custno"));`,
        answer: "parseInt",
        hint: "문자열 형태의 숫자 '100001'을 기본형 int로 파싱하는 Integer 클래스 메서드",
        desc: "웹 폼에서 넘어온 번호는 글자이므로 자바 변수에 숫자로 담을 때 필수입니다."
    },
    {
        id: 5,
        title: "DML(INSERT/UPDATE) 실행 메서드",
        codeSnippet: `pstmt.__BLANK__(); // DB 테이블 데이터 수정/저장`,
        answer: "executeUpdate",
        hint: "SELECT는 executeQuery, INSERT/UPDATE/DELETE는 execute...",
        desc: "데이터베이스 테이블에 행을 삽입하거나 변경할 때 호출하는 메서드입니다."
    },
    {
        id: 6,
        title: "저장 완료 후 화면 강제 이동 (리다이렉트)",
        codeSnippet: `response.__BLANK__("memberList.jsp");`,
        answer: "sendRedirect",
        hint: "클라이언트의 웹 브라우저에게 다른 페이지로 이동하라고 지시하는 응답 메서드",
        desc: "action.jsp에서 저장이 끝난 후 목록 화면으로 자동 이동시킬 때 사용합니다."
    },
    {
        id: 7,
        title: "미구매자 0원 대체 SQL 함수",
        codeSnippet: `SELECT custname, __BLANK__(SUM(price), 0) AS total_price FROM ...`,
        answer: "IFNULL",
        hint: "첫 번째 인자값이 NULL일 경우 두 번째 인자값으로 바꿔주는 MySQL 함수",
        desc: "LEFT JOIN 시 구매 이력이 없는 회원의 매출을 NULL 대신 0으로 변환합니다."
    }
];

// 퀴즈 렌더러 및 컨트롤러
let activeChallengeIndex = 0;

function initQuizEngine() {
    renderSqlChallenge(0);
    renderBlankQuiz();
}

function renderSqlChallenge(index) {
    activeChallengeIndex = index;
    const challenge = SQL_CHALLENGES[index];
    const container = document.getElementById("sql-challenge-box");
    if (!container) return;

    container.innerHTML = `
        <div class="card" style="margin-bottom: 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <h4>${challenge.title}</h4>
                <span class="brand-badge">${challenge.badge}</span>
            </div>
            <p style="color: var(--text-main); font-weight: 500; margin-bottom: 0.75rem;">${challenge.question}</p>
            <div style="font-size: 0.85rem; color: var(--text-muted); background: #f1f5f9; padding: 0.5rem 0.75rem; border-radius: 6px;">
                💡 <strong>힌트:</strong> <code>${challenge.hint}</code>
            </div>
        </div>

        <textarea id="challenge-sql-input" class="sql-editor" placeholder="여기에 정답 SQL 쿼리를 작성하세요..."></textarea>
        
        <div style="margin-top: 0.75rem; display: flex; justify-content: space-between; align-items: center;">
            <div style="display: flex; gap: 0.4rem;">
                ${SQL_CHALLENGES.map((c, i) => `
                    <button class="btn-secondary ${i === index ? 'active' : ''}" onclick="renderSqlChallenge(${i})">${i + 1}단계</button>
                `).join("")}
            </div>
            <button class="btn-primary" onclick="gradeChallenge()">🎯 채점하기 (Grade)</button>
        </div>

        <div id="challenge-grade-result" style="margin-top: 1rem;"></div>
    `;
}

function gradeChallenge() {
    const input = document.getElementById("challenge-sql-input").value;
    const resultBox = document.getElementById("challenge-grade-result");
    const challenge = SQL_CHALLENGES[activeChallengeIndex];
    const engine = new MiniSqlEngine();

    const res = engine.execute(input);

    if (!res.success) {
        resultBox.innerHTML = `
            <div style="padding: 1rem; background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; color: #dc2626;">
                <strong>❌ 실행 오류 (RETRY):</strong> ${res.error}
            </div>
        `;
        return;
    }

    const isPassed = challenge.checkFunc(res.rows);

    if (isPassed) {
        resultBox.innerHTML = `
            <div style="padding: 1rem; background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; color: #059669;">
                <strong>🎉 100점 만점 정답입니다 (PASS)!</strong><br/>
                요구사항 조건과 정렬, 통계 결과가 완벽하게 일치합니다. 다음 단계로 넘어가보세요!
            </div>
        `;
    } else {
        resultBox.innerHTML = `
            <div style="padding: 1rem; background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; color: #b45309;">
                <strong>⚠️ 아쉽습니다! 다시 검토해보세요 (RETRY):</strong><br/>
                쿼리는 실행되었으나 문제에서 요구한 데이터 개수나 결과 조건이 맞지 않습니다. 힌트를 참고하여 수정해보세요!
            </div>
        `;
    }
}

function renderBlankQuiz() {
    const container = document.getElementById("blank-quiz-list");
    if (!container) return;

    container.innerHTML = CODE_BLANK_QUIZZES.map((q, idx) => `
        <div class="card" style="margin-bottom: 1rem;" id="quiz-card-${q.id}">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <strong>Q${idx + 1}. ${q.title}</strong>
                <span id="quiz-badge-${q.id}" class="badge-neutral" style="font-size: 0.8rem;">미응시</span>
            </div>
            <div class="code-box" style="margin: 0.5rem 0;">
                <pre style="padding: 0.75rem; font-size: 0.95rem;"><code>${q.codeSnippet.replace('__BLANK__', `<input type="text" id="quiz-input-${q.id}" class="blank-input" placeholder="정답 입력">`)}</code></pre>
            </div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                <button class="btn-secondary" onclick="checkQuizAnswer(${q.id})" style="padding: 4px 12px;">확인</button>
                <span id="quiz-feedback-${q.id}" style="font-size: 0.85rem; color: var(--text-muted);"></span>
            </div>
        </div>
    `).join("");
}

function checkQuizAnswer(quizId) {
    const quiz = CODE_BLANK_QUIZZES.find(q => q.id === quizId);
    const input = document.getElementById(`quiz-input-${quizId}`);
    const badge = document.getElementById(`quiz-badge-${quizId}`);
    const feedback = document.getElementById(`quiz-feedback-${quizId}`);

    if (!quiz || !input) return;

    const userVal = input.value.trim();
    if (userVal.toLowerCase() === quiz.answer.toLowerCase()) {
        badge.textContent = "정답 ✔️";
        badge.className = "badge-pass";
        input.style.borderColor = "#10b981";
        input.style.backgroundColor = "#ecfdf5";
        feedback.innerHTML = `<span style="color: #059669;">정답입니다! ${quiz.desc}</span>`;
    } else {
        badge.textContent = "오답 ❌";
        badge.className = "badge-fail";
        input.style.borderColor = "#ef4444";
        input.style.backgroundColor = "#fef2f2";
        feedback.innerHTML = `<span style="color: #dc2626;">힌트: ${quiz.hint}</span>`;
    }
}
