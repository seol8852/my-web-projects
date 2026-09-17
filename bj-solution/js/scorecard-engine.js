// SWL5 실기 자가진단 합격 성적표 및 감점 분석 엔진
class ExamScorecardEngine {
    constructor() {
        this.rubric = [
            { id: 1, title: "DB DDL & INSERT 생성 및 검증", maxScore: 15, deductionReason: "테이블 제약조건(PK/FK) 또는 샘플 데이터 누락 시 쿼리 전체 오작동" },
            { id: 2, title: "JDBC 드라이버 jar 라이브러리 등록", maxScore: 10, deductionReason: "Connector/J jar 누락 시 ClassNotFoundException 발생으로 전체 0점 처리 위험" },
            { id: 3, title: "DBConnection.java 공통 연결 모듈 작성", maxScore: 15, deductionReason: "allowPublicKeyRetrieval 또는 비밀번호 오류 시 DB 연동 전면 실패" },
            { id: 4, title: "memberList.jsp 회원 목록 및 등급 한글 변환", maxScore: 15, deductionReason: "CASE WHEN 미적용 시 등급 코드('A') 그대로 출력 감점 (-5점)" },
            { id: 5, title: "salaryList.jsp LEFT JOIN 및 0원 처리", maxScore: 15, deductionReason: "INNER JOIN 사용 시 미구매자 누락(-10점), IFNULL 누락 시 NULL 표기 감점(-5점)" },
            { id: 6, title: "join.jsp 다음 회원번호(MAX+1) 자동 채번", maxScore: 10, deductionReason: "MAX+1 자동 채번 미구현 및 readonly 누락 시 사용자 임의 변경 위험 감점" },
            { id: 7, title: "join.jsp 필수 입력값 alert & focus() 검사", maxScore: 10, deductionReason: "alert만 띄우고 focus() 누락 시 또는 return false 미처리 시 폼 강제 전송 감점" },
            { id: 8, title: "action.jsp DB INSERT 및 리다이렉트 이동", maxScore: 10, deductionReason: "한글 인코딩 누락(?? 깨짐) 또는 sendRedirect 미호출 시 감점" }
        ];
    }

    evaluate(checkedIndices) {
        let totalScore = 0;
        const deductions = [];
        const passedItems = [];

        this.rubric.forEach((item, index) => {
            if (checkedIndices.includes(index + 1)) {
                totalScore += item.maxScore;
                passedItems.push(item);
            } else {
                deductions.push(item);
            }
        });

        const isPass = totalScore >= 60;
        let gradeTier = "불합격 위험 🚨";
        let tierColor = "#dc2626";

        if (totalScore >= 90) {
            gradeTier = "수석 합격 안정권 🏆";
            tierColor = "#059669";
        } else if (totalScore >= 75) {
            gradeTier = "합격 유력권 🥇";
            tierColor = "#10b981";
        } else if (totalScore >= 60) {
            gradeTier = "턱걸이 합격권 ⚠️";
            tierColor = "#f59e0b";
        }

        return {
            totalScore,
            isPass,
            gradeTier,
            tierColor,
            passedItems,
            deductions
        };
    }
}

const scorecardEngine = new ExamScorecardEngine();

function generateScorecard() {
    const checkboxes = document.querySelectorAll(".exam-check");
    const checkedIndices = [];

    checkboxes.forEach((cb, idx) => {
        if (cb.checked) {
            checkedIndices.push(idx + 1);
        }
    });

    const report = scorecardEngine.evaluate(checkedIndices);
    const modalContainer = document.getElementById("scorecard-modal-content");
    const modalWrapper = document.getElementById("scorecard-modal-wrapper");

    if (!modalContainer || !modalWrapper) return;

    modalContainer.innerHTML = `
        <div class="scorecard-header" style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
            <span class="brand-badge" style="font-size: 0.85rem;">한국산업인력공단 외부평가 대비</span>
            <h2 style="font-size: 1.8rem; margin: 0.5rem 0; color: #1e1b4b;">SW_L5 실기 자가진단 종합 성적표</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">진단 일시: ${new Date().toLocaleString('ko-KR')}</p>
        </div>

        <div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
            <div style="font-size: 0.95rem; color: var(--text-muted); font-weight: 600;">예상 취득 점수</div>
            <div style="font-size: 3.8rem; font-weight: 900; color: ${report.tierColor}; margin: 0.2rem 0;">
                ${report.totalScore} <span style="font-size: 1.5rem; color: #64748b;">/ 100점</span>
            </div>
            <div style="display: inline-block; padding: 0.35rem 1.2rem; border-radius: 999px; background: ${report.tierColor}15; color: ${report.tierColor}; font-weight: 800; font-size: 1.05rem;">
                ${report.gradeTier} (합격 기준: 60점 이상)
            </div>
        </div>

        <div class="grid-2" style="margin-bottom: 1.5rem;">
            <div>
                <h4 style="color: #059669; margin-bottom: 0.6rem;">✔️ 완벽 구현 항목 (${report.passedItems.length}개)</h4>
                <ul style="list-style: none; padding: 0;">
                    ${report.passedItems.map(p => `
                        <li style="padding: 0.5rem 0.75rem; background: #ecfdf5; border-radius: 6px; margin-bottom: 0.4rem; font-size: 0.88rem; color: #065f46; display: flex; justify-content: space-between;">
                            <span>✔️ ${p.title}</span>
                            <strong>+${p.maxScore}점</strong>
                        </li>
                    `).join("")}
                </ul>
            </div>

            <div>
                <h4 style="color: #dc2626; margin-bottom: 0.6rem;">⚠️ 감점 위험 요인 진단 (${report.deductions.length}개)</h4>
                <ul style="list-style: none; padding: 0;">
                    ${report.deductions.length === 0 ? `
                        <li style="padding: 1rem; background: #f1f5f9; border-radius: 6px; font-size: 0.9rem; color: var(--text-muted); text-align: center;">
                            감점 요인이 없습니다! 완벽합니다. 🎉
                        </li>
                    ` : report.deductions.map(d => `
                        <li style="padding: 0.5rem 0.75rem; background: #fef2f2; border-radius: 6px; margin-bottom: 0.4rem; font-size: 0.85rem; color: #991b1b;">
                            <strong>❌ -${d.maxScore}점 감점 요인: ${d.title}</strong>
                            <p style="font-size: 0.8rem; margin-top: 2px; color: #7f1d1d;">${d.deductionReason}</p>
                        </li>
                    `).join("")}
                </ul>
            </div>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.88rem; color: #92400e;">
            💡 <strong>시험관 채점 가이드:</strong> 한국산업인력공단 실기 평가는 화면이 깨지거나(한글 UTF-8 오류) DB 연동 자체가 실패하면 부분 점수 없이 대폭 감점됩니다. 시험 제출 전 반드시 브라우저에서 '등록 ➡️ 조회' 플로우를 1회 이상 완주 테스트하세요.
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button class="btn-secondary" onclick="window.print()">🖨️ 성적표 인쇄 / PDF 저장</button>
            <button class="btn-primary" onclick="closeScorecardModal()">닫기</button>
        </div>
    `;

    modalWrapper.style.display = "flex";
}

function closeScorecardModal() {
    const modalWrapper = document.getElementById("scorecard-modal-wrapper");
    if (modalWrapper) {
        modalWrapper.style.display = "none";
    }
}
