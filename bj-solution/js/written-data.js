// SW_L5 외부평가 지필시험 전문 데이터베이스 (PDF 핵심 요약 100% 반영 완전판)

// ==========================================
// 1. 지필평가 핵심 이론 개념 데이터 (PDF 4대 과목 체계 완벽 반영)
// ==========================================
const WRITTEN_THEORY_DATA = [
    // ----------------------------------------------------
    // [과목 1] 요구사항 확인 (Requirements Engineering)
    // ----------------------------------------------------
    {
        id: "th-1-1",
        category: "1. 요구사항 확인",
        badge: "★매우 중요 ⭐⭐⭐",
        title: "현행 시스템 파악 3단계 절차 (겉모습 ➡️ 소프트웨어 ➡️ 인프라)",
        content: `
            <p>현재 운영 중인 시스템을 분석할 때 구체적인 수준으로 3단계에 걸쳐 파악합니다.</p>
            <div style="background:#f8fafc; padding:0.75rem; border-radius:6px; margin:0.5rem 0;">
                <ul>
                    <li><strong>1단계 (겉모습)</strong>: 시스템 구성, 제공 기능, 인터페이스 파악</li>
                    <li><strong>2단계 (소프트웨어 내부)</strong>: 소프트웨어 구성 및 아키텍처 파악</li>
                    <li><strong>3단계 (물리적 인프라)</strong>: 하드웨어(HW) 및 네트워크 구성 파악</li>
                </ul>
            </div>
            <div style="margin-top:0.5rem; padding:0.5rem 0.75rem; background:#fef2f2; border-left:3px solid #ef4444; font-size:0.88rem;">
                <strong>🚨 시험 함정 주의:</strong> "현행 시스템 아키텍처 구성도는 최하위 레벨에 대해 작성한다" ➡️ <strong>X (오답!)</strong><br/>
                👉 <em>정답:</em> 시스템 전체 구조를 조망해야 하므로 세부 모듈 단위가 아닌 <strong>상위 수준(High Level)</strong>에서 작성합니다.
            </div>
        `,
        tags: ["현행시스템", "아키텍처", "1단계_겉모습", "2단계_SW", "3단계_HW네트워크"]
    },
    {
        id: "th-1-2",
        category: "1. 요구사항 확인",
        badge: "암기공식: 도분명확 ⭐⭐⭐",
        title: "요구사항 개발 프로세스 4단계 (도출 ➡️ 분석 ➡️ 명세 ➡️ 확인)",
        content: `
            <p>고객에게서 요구사항을 수집하고 완성하는 표준 4단계 절차입니다. (암기 팁: <strong>도분명확</strong>)</p>
            <table class="sql-result-table" style="margin-top:0.5rem;">
                <thead>
                    <tr><th>순서</th><th>단계명</th><th>영문</th><th>주요 활동</th><th>비유 (집 지을 때)</th></tr>
                </thead>
                <tbody>
                    <tr><td>1</td><td><strong>도출</strong></td><td>Elicitation</td><td>이해관계자로부터 요구 수집</td><td>"방 3개, 화장실 2개 지어주세요"</td></tr>
                    <tr><td>2</td><td><strong>분석</strong></td><td>Analysis</td><td>요구사항 명확화, 모순/충돌 해결</td><td>"예산에 방 3개가 가능할까?"</td></tr>
                    <tr><td>3</td><td><strong>명세</strong></td><td>Specification</td><td>요구사항 문서화 (SRS 작성)</td><td>"방 3개, 화장실 2개 설계도 작성"</td></tr>
                    <tr><td>4</td><td><strong>확인</strong></td><td>Validation</td><td>명세서가 요구를 반영했는지 검토</td><td>"고객님, 이렇게 지어도 될까요?"</td></tr>
                </tbody>
            </table>
        `,
        tags: ["도분명확", "도출", "분석", "명세", "확인", "요구사항개발"]
    },
    {
        id: "th-1-3",
        category: "1. 요구사항 확인",
        badge: "★자주 출제 ⭐⭐",
        title: "좋은 요구사항의 품질 특성 9가지 (완정명일특검수추이)",
        content: `
            <p>요구사항 명세서가 갖추어야 할 9가지 품질 기준입니다. (암기 팁: <strong>완정명일특검수추이</strong>)</p>
            <ul>
                <li><strong>완전성</strong>: 누락된 요구사항이 없어야 함 ("방 개수가 빠지면 안 됨").</li>
                <li><strong>정확성</strong>: 논리적으로 정확해야 함 ("2층인데 3층이라 쓰면 안 됨").</li>
                <li><strong>명확성</strong>: 누구나 동일하게 이해 가능 ("크다" 대신 "30평").</li>
                <li><strong>일관성</strong>: 요구사항 간 상호 모순이 없어야 함.</li>
                <li><strong>특이성</strong>: 중요도 및 난이도가 표기되어야 함 ("이 기능은 필수!").</li>
                <li><strong>검증 가능성</strong>: 객관적으로 검증 가능 ("빠르게" 대신 "3초 이내 응답").</li>
                <li><strong>수정 용이성</strong>: 항목별로 분리되어 수정이 쉬워야 함.</li>
                <li><strong>추적성</strong>: 설계 및 코드 산출물로 추적 가능해야 함.</li>
                <li><strong>이해 가능성</strong>: 표준 양식으로 작성되어 누구나 이해 가능해야 함.</li>
            </ul>
            <div style="margin-top:0.4rem; font-size:0.85rem; color:var(--text-muted);">
                📌 <em>시험에 가장 자주 나오는 5대 특성:</em> <strong>완전성, 정확성, 명확성, 일관성, 추적성</strong>
            </div>
        `,
        tags: ["완정명일특검수추이", "완전성", "정확성", "명확성", "검증가능성", "추적성"]
    },
    {
        id: "th-1-4",
        category: "1. 요구사항 확인",
        badge: "암기공식: 직유효유 ⭐⭐⭐",
        title: "UI 설계 4대 원칙 (직관성, 유효성, 학습성, 유연성)",
        content: `
            <p>사용자 인터페이스(UI)를 설계할 때 준수해야 하는 4대 황금 원칙 (암기 팁: <strong>직유효유</strong> / 좋은 리모컨 비유)</p>
            <ul>
                <li><strong>직관성 (Intuitiveness)</strong>: 누구나 쉽게 이해하고 바로 사용 가능 <em>(버튼 보면 무슨 기능인지 알 수 있음)</em>.</li>
                <li><strong>유효성 (Effectiveness)</strong>: 사용자의 목적을 정확하게 달성 <em>(볼륨 버튼 누르면 정확히 볼륨 조절)</em>.</li>
                <li><strong>학습성 (Learnability)</strong>: 누구나 쉽게 배우고 익힘 <em>(한 번 써보면 다음에도 바로 사용 가능)</em>.</li>
                <li><strong>유연성 (Flexibility)</strong>: 사용자의 요구 수용 및 오류 최소화 <em>(실수해도 쉽게 되돌릴 수 있음)</em>.</li>
            </ul>
        `,
        tags: ["직유효유", "직관성", "유효성", "학습성", "유연성", "UI원칙"]
    },
    {
        id: "th-1-5",
        category: "1. 요구사항 확인",
        badge: "ISO 25010 ⭐⭐",
        title: "UI 품질 요구사항 (6가지) & 기능성 세부 항목",
        content: `
            <h4>1. UI 품질 6대 특성 (ISO/IEC 25010)</h4>
            <p><strong>기능성</strong>(요구만족), <strong>신뢰성</strong>(오류없음), <strong>사용성</strong>(이해/사용용이), <strong>효율성</strong>(자원절약), <strong>유지보수성</strong>(변경용이), <strong>이식성</strong>(타환경이식).</p>
            
            <h4 style="margin-top:0.75rem;">2. 기능성의 5대 세부 항목 (★자주 출제)</h4>
            <ul>
                <li><strong>적절성 / 정합성</strong>: 사용 목적에 부합하는 기능 제공</li>
                <li><strong>정밀성 / 정확성</strong>: 올바르고 정확한 연산 결과 산출</li>
                <li><strong>상호 운용성</strong>: 다른 외부 시스템과 함께 문제없이 작동</li>
                <li><strong>보안성</strong>: 접근 권한에 따라 비인가자 접근 차단</li>
                <li><strong>호환성</strong>: 관련 표준 및 규정 준수</li>
            </ul>
        `,
        tags: ["ISO25010", "기능성", "사용성", "신뢰성", "적절성", "상호운용성"]
    },
    {
        id: "th-1-6",
        category: "1. 요구사항 확인",
        badge: "검증 단계 ⭐⭐",
        title: "분석 모델 검증 3단계 & 현행 시스템 분석 산출물",
        content: `
            <h4>1. 분석 모델 검증 (3단계)</h4>
            <ol>
                <li><strong>1단계 (유스케이스 모델 검증)</strong>: 사용자 관점에서 유스케이스 시나리오가 올바른지 확인.</li>
                <li><strong>2단계 (개념 수준 분석 클래스 검증)</strong>: 도메인 개념이 올바르게 모델링되었는지 확인.</li>
                <li><strong>3단계 (분석 클래스 검증)</strong>: 상세 분석 클래스가 요구사항을 완전히 충족하는지 확인.</li>
            </ol>
            <h4 style="margin-top:0.75rem;">2. 현행 시스템 분석 대표 산출물</h4>
            <ul>
                <li><strong>소프트웨어 구성도</strong>: 시스템을 구성하는 소프트웨어 요소들의 구조도.</li>
                <li><strong>하드웨어 구성도</strong>: 서버, 네트워크 장비 등 물리적 구성 요소의 구조도.</li>
            </ul>
        `,
        tags: ["분석모델검증", "유스케이스", "소프트웨어구성도", "하드웨어구성도"]
    },

    // ----------------------------------------------------
    // [과목 2] 제품소프트웨어 패키징 (Packaging)
    // ----------------------------------------------------
    {
        id: "th-2-1",
        category: "2. 제품소프트웨어 패키징",
        badge: "★매우 중요 ⭐⭐⭐",
        title: "형상 관리 도구 분류 (분산 저장소 vs 중앙 집중식)",
        content: `
            <p>소프트웨어의 변경 이력을 관리하여 특정 시점의 버전으로 되돌릴 수 있게 하는 형상 관리(SCM) 도구 분류입니다.</p>
            <table class="sql-result-table" style="margin-top:0.5rem;">
                <thead>
                    <tr><th>방식</th><th>특징</th><th>대표 도구</th><th>비유</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>분산 저장소</strong></td>
                        <td>각 개발자가 전체 저장소를 로컬에 복사하여 독립 작업 후 원격 병합</td>
                        <td><strong style="color:var(--primary);">Git, BitKeeper</strong></td>
                        <td>각자 집에서 작업 후 취합</td>
                    </tr>
                    <tr>
                        <td><strong>중앙 집중식</strong></td>
                        <td>중앙 서버 하나에만 저장소가 있고 개발자들은 서버에 직접 접속</td>
                        <td><strong style="color:#b91c1c;">CVS, SVN</strong></td>
                        <td>하나의 공용 문서함에서만 작업</td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-top:0.5rem; padding:0.5rem 0.75rem; background:#eff6ff; border-left:3px solid #3b82f6; font-size:0.88rem;">
                <strong>📌 초간단 암기:</strong> Git, BitKeeper = <em>분산</em> / CVS, SVN = <em>중앙 집중</em>
            </div>
        `,
        tags: ["형상관리", "Git", "BitKeeper", "CVS", "SVN", "분산저장소", "중앙집중식"]
    },
    {
        id: "th-2-2",
        category: "2. 제품소프트웨어 패키징",
        badge: "패키징 도구 ⭐⭐",
        title: "제품 소프트웨어 패키징 도구의 8대 구성요소 (DRM)",
        content: `
            <p>디지털 콘텐츠의 지적 재산권을 보호하고 안전한 유통을 보장하는 DRM 도구의 구성요소입니다.</p>
            <ul>
                <li><strong>암호화</strong>: 콘텐츠 및 라이선스 암호화, 전자서명</li>
                <li><strong>키 관리</strong>: 암호화한 열쇠의 안전한 보관 및 배포</li>
                <li><strong>암호화 파일 생성</strong>: 콘텐츠를 암호화된 파일 형태로 패키징</li>
                <li><strong>식별 기술</strong>: 콘텐츠 식별 체계 표현 (콘텐츠 식별자)</li>
                <li><strong>저작권 표현</strong>: 라이선스 내용 및 사용 권한 명시</li>
                <li><strong>정책 관리</strong>: 라이선스 발급 기준 및 사용 기간/횟수 정책 제어</li>
                <li><strong>크랙 방지</strong>: 불법 복제 및 비정상 실행 방지</li>
                <li><strong>인증</strong>: 라이선스 발급 및 사용자의 정당한 구매자 여부 확인 (SSO, 디지털 서명)</li>
            </ul>
        `,
        tags: ["패키징도구", "DRM", "암호화", "키관리", "크랙방지", "SSO"]
    },
    {
        id: "th-2-3",
        category: "2. 제품소프트웨어 패키징",
        badge: "★핵심 공식 ⭐⭐⭐",
        title: "모듈 설계 원칙: 결합도(Coupling) 최소화 vs 응집도(Cohesion) 최대화",
        content: `
            <p>모듈(부품)을 나눌 때의 황금 설계 원칙: <strong>낮은 결합도(최소화) + 높은 응집도(최대화)</strong></p>
            <div style="background:#f1f5f9; padding:0.75rem; border-radius:6px; margin:0.5rem 0;">
                <ul>
                    <li><strong>결합도 (Coupling) ⬇️ 낮을수록 좋음 (최소화)</strong>: 모듈 간의 상호 의존성 정도.<br/>
                    <em>비유:</em> 레고 블록이 너무 꽉 끼워져 있으면 부품 교체가 어렵다. 느슨하게 연결되어야 교체/수정이 쉽다.</li>
                    <li><strong>응집도 (Cohesion) ⬆️ 높을수록 좋음 (최대화)</strong>: 모듈 내부 요소들의 연관성 정도.<br/>
                    <em>비유:</em> 한 블록 안에 카메라 기능만 집중되어 있어야 깔끔하다.</li>
                </ul>
            </div>
            <div style="font-size:0.88rem; color:#475569;">
                👉 <em>결합도 순서 (자스제외공내):</em> 자료(Data) ➡️ 스탬프 ➡️ 제어 ➡️ 외부 ➡️ 공통 ➡️ 내용(Content)<br/>
                👉 <em>응집도 순서 (기순교절시논우):</em> 기능적(Functional) ➡️ 순차적 ➡️ 교환적 ➡️ 절차적 ➡️ 시간적 ➡️ 논리적 ➡️ 우연적
            </div>
        `,
        tags: ["결합도_최소화", "응집도_최대화", "자스제외공내", "기순교절시논우", "모듈설계"]
    },
    {
        id: "th-2-4",
        category: "2. 제품소프트웨어 패키징",
        badge: "암기공식: 버사설새오제 ⭐⭐⭐",
        title: "배포용 미디어 포함 6대 항목 & 릴리즈 노트 & 백업 정책",
        content: `
            <h4>1. 배포용 미디어(설치 CD, USB 등) 포함 필수 항목 6가지</h4>
            <div style="background:#fef3c7; padding:0.6rem; border-radius:6px; font-weight:bold; color:#92400e; margin-bottom:0.5rem;">
                암기 팁: 버-사-설-새-오-제
            </div>
            <ol>
                <li><strong>버전 정보</strong>: 배포본의 버전 번호 (v1.0.0)</li>
                <li><strong>사양 정보</strong>: H/W, S/W 최소 및 권장 요구 사양</li>
                <li><strong>설치 방법</strong>: 단계별 설치 절차 가이드</li>
                <li><strong>새로운 기능 정보</strong>: 이번 버전에서 새로 추가/변경된 기능</li>
                <li><strong>오류 및 대처 방법</strong>: 알려진 버그 및 조치 방안</li>
                <li><strong>제약 사항</strong>: 설치 및 운영 시 제한 조건</li>
            </ol>
            <div style="margin-top:0.4rem; padding:0.4rem 0.6rem; background:#fef2f2; border-left:3px solid #ef4444; font-size:0.85rem;">
                ⚠️ <strong>시험 출제 함정:</strong> "개발자 개인 연락처"나 "미디어 제조사 정보"는 <strong>절대 포함되지 않습니다!</strong>
            </div>

            <h4 style="margin-top:0.8rem;">2. 릴리즈 노트 & 백업 정책</h4>
            <ul>
                <li><strong>릴리즈 노트 구성요소</strong>: 이슈 요약, 재현 항목, 사용자 영향도, 면책 조항</li>
                <li><strong>버전 관리 백업 정책</strong>: DISK 백업(1일 1회), CD 백업(1주 1회), 최소 보관(2일 이상), 복구를 위해 <strong>FULL 백업</strong>, <strong>CMO</strong>가 주기적 점검.</li>
            </ul>
        `,
        tags: ["버사설새오제", "배포미디어", "릴리즈노트", "백업정책", "FULL백업", "CMO"]
    },

    // ----------------------------------------------------
    // [과목 3] 애플리케이션 테스트 관리 (Testing)
    // ----------------------------------------------------
    {
        id: "th-3-1",
        category: "3. 애플리케이션 테스트 관리",
        badge: "★매우 중요 (O/X 단골) ⭐⭐⭐",
        title: "정적 테스트 vs 동적 테스트 완전 비교",
        content: `
            <table class="sql-result-table" style="margin-top:0.5rem;">
                <thead>
                    <tr><th>구분</th><th>정적 테스트 (Static Test)</th><th>동적 테스트 (Dynamic Test)</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>프로그램 실행 여부</strong></td>
                        <td><strong style="color:#b91c1c;">프로그램을 실행하지 않고</strong></td>
                        <td><strong style="color:var(--primary);">프로그램을 직접 실행하여</strong></td>
                    </tr>
                    <tr>
                        <td><strong>검사 방법</strong></td>
                        <td>소스코드 문법, 코딩 표준, 구조 분석</td>
                        <td>입력값 주입 후 실제 동작 및 출력 확인</td>
                    </tr>
                    <tr>
                        <td><strong>주요 기법/예시</strong></td>
                        <td>인스펙션(Inspection), 코드 검사, 워크스루(Walkthrough)</td>
                        <td>화이트박스 테스트, 블랙박스 테스트</td>
                    </tr>
                    <tr>
                        <td><strong>주요 시기</strong></td>
                        <td>주로 개발 초기 과정 (오류 조기 예방)</td>
                        <td>주로 시험 및 실행 단계 (메모리, 성능 검증)</td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-top:0.5rem; padding:0.5rem 0.75rem; background:#fef2f2; border-left:3px solid #ef4444; font-size:0.88rem;">
                <strong>🚨 시험 단골 O/X 함정:</strong> "정적 분석은 프로그램을 실행하여 분석한다" ➡️ <strong>X (오답!)</strong><br/>
                👉 정적 분석은 실행하지 않고 코드를 정적으로 분석합니다.
            </div>
        `,
        tags: ["정적테스트", "동적테스트", "인스펙션", "워크스루", "실행여부"]
    },
    {
        id: "th-3-2",
        category: "3. 애플리케이션 테스트 관리",
        badge: "★핵심 기법 ⭐⭐⭐",
        title: "화이트박스 테스트 vs 블랙박스 테스트",
        content: `
            <h4>1. 화이트박스 테스트 (White-box / 내부 구조 점검)</h4>
            <ul>
                <li><strong>원리:</strong> 소스코드의 내부 로직, 제어 흐름, 경로를 직접 보며 검사. <em>(엔진 뚜껑 열고 부품 점검)</em></li>
                <li><strong>기법:</strong> 구문 커버리지, 조건 커버리지, 결정 커버리지, 변형 조건/결정(MC/DC), 기초 경로 검사.</li>
            </ul>
            <h4 style="margin-top:0.75rem;">2. 블랙박스 테스트 (Black-box / 외부 기능 점검)</h4>
            <ul>
                <li><strong>원리:</strong> 소스코드를 보지 않고 완성된 프로그램의 입력과 출력(요구사항)만 검사. <em>(운전만 해보고 이상 유무 확인)</em></li>
                <li><strong>기법:</strong> 동치(동등) 분할, 경계값 분석, 원인-효과 그래프, 오류 예측 검사.</li>
            </ul>
        `,
        tags: ["화이트박스", "블랙박스", "내부구조", "외부기능", "동치분할", "경계값분석"]
    },
    {
        id: "th-3-3",
        category: "3. 애플리케이션 테스트 관리",
        badge: "암기공식: 계설수평리 ⭐⭐⭐",
        title: "테스트 프로세스 5단계 & 주요 테스트 핵심 용어",
        content: `
            <h4>1. 테스트 프로세스 5단계 (암기 팁: 계설수평리)</h4>
            <div style="background:#f1f5f9; padding:0.6rem; border-radius:6px; font-size:0.9rem; margin-bottom:0.75rem;">
                <strong>1. 계획 ➡️ 2. 설계(분석/디자인) ➡️ 3. 케이스/시나리오 작성 ➡️ 4. 수행 ➡️ 5. 평가 및 리포팅</strong>
            </div>

            <h4>2. 주요 테스트 핵심 4대 용어 (★매우 중요)</h4>
            <ul>
                <li><strong>테스트 케이스 (Test Case)</strong>: 특정 경로/요구사항을 확인하기 위해 설계된 <em>입력값, 실행 조건, 기대 결과</em>의 명세서.</li>
                <li><strong>테스트 시나리오 (Test Scenario)</strong>: 테스트 케이스들의 집합으로, <em>동작 순서</em>를 기술한 문서.</li>
                <li><strong>테스트 오라클 (Test Oracle)</strong>: 테스트 결과가 참인지 거짓인지 판단하기 위해 사전에 정의된 참(True) 값과 비교하는 기법. <em>(시험 정답지 비유!)</em></li>
                <li><strong>테스트 커버리지 (Test Coverage)</strong>: 테스트 대상 중 얼마만큼이 실제로 테스트되었는지 측정하는 백분율 기준.</li>
            </ul>
        `,
        tags: ["계설수평리", "테스트케이스", "테스트시나리오", "테스트오라클", "테스트커버리지"]
    },
    {
        id: "th-3-4",
        category: "3. 애플리케이션 테스트 관리",
        badge: "테스트 유형 7선 ⭐⭐",
        title: "주요 테스트 유형 (회복, 안전, 강도, 성능, 회귀, 병행, 구조)",
        content: `
            <ul>
                <li><strong>회복 테스트 (Recovery)</strong>: 고의로 시스템 장애를 유도한 후 정상 복구되는지 확인 <em>("전원 갑자기 끄면?")</em></li>
                <li><strong>안전 테스트 (Security)</strong>: 소스코드 내 불법 침입 및 보안 결함을 사전 점검 <em>("해킹에 취약한가?")</em></li>
                <li><strong>강도 테스트 (Stress)</strong>: 시스템에 과도한 부하(Peak Load)를 가해 정상 작동 여부 검증 <em>("동시 1만명 몰리면?")</em></li>
                <li><strong>성능 테스트 (Performance)</strong>: 응답시간, 처리량, 반응 속도 측정 <em>("3초 안에 응답하는가?")</em></li>
                <li><strong>회귀 테스트 (Regression)</strong>: 수정된 코드 때문에 새로운 결함이 발생하지 않았는지 반복 검증 <em>("버그 고쳤더니 딴 데가 터졌나?")</em></li>
                <li><strong>병행 테스트 (Parallel)</strong>: 변경된 새 시스템과 기존 구 시스템에 동일 데이터를 넣어 결과 비교</li>
                <li><strong>구조 테스트 (Structure)</strong>: 시스템 내부 제어 경로 복잡도 및 소스코드 로직 검증</li>
            </ul>
        `,
        tags: ["회복테스트", "안전테스트", "강도테스트", "회귀테스트", "병행테스트"]
    },
    {
        id: "th-3-5",
        category: "3. 애플리케이션 테스트 관리",
        badge: "스텁 vs 드라이버 ⭐⭐⭐",
        title: "통합 테스트 (상향식 vs 하향식) & 코드 커버리지 4종",
        content: `
            <h4>1. 통합 테스트: 상향식 vs 하향식 (★출제 1순위)</h4>
            <table class="sql-result-table" style="margin-top:0.5rem;">
                <thead>
                    <tr><th>방식</th><th>통합 방향</th><th>필요 도구</th><th>비유</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>상향식 통합 (Bottom-Up)</strong></td>
                        <td>하위 모듈 ➡️ 상위 모듈로 통합</td>
                        <td><strong style="color:var(--primary);">테스트 드라이버 (Test Driver)</strong></td>
                        <td>1층부터 벽돌 쌓기</td>
                    </tr>
                    <tr>
                        <td><strong>하향식 통합 (Top-Down)</strong></td>
                        <td>상위 모듈 ➡️ 하위 모듈로 통합</td>
                        <td><strong style="color:#b91c1c;">테스트 스텁 (Test Stub)</strong></td>
                        <td>지붕부터 아래로 조립</td>
                    </tr>
                </tbody>
            </table>

            <h4 style="margin-top:0.8rem;">2. 코드 커버리지 4가지 유형</h4>
            <ul>
                <li><strong>구문 커버리지 (Statement)</strong>: 모든 코드 문장이 최소 한 번 이상 실행됨</li>
                <li><strong>조건 커버리지 (Condition)</strong>: 개별 조건식이 True/False를 모두 만족</li>
                <li><strong>결정 커버리지 (Decision / Branch)</strong>: 전체 분기문(if-else)의 참/거짓 경로를 모두 실행</li>
                <li><strong>변형 조건/결정 커버리지 (MC/DC)</strong>: 각 개별 조건이 독립적으로 전체 결과에 영향을 미치는지 검증</li>
            </ul>
        `,
        tags: ["통합테스트", "상향식통합", "하향식통합", "스텁", "드라이버", "코드커버리지"]
    },

    // ----------------------------------------------------
    // [과목 4] SW 개발 보안 구축 (Security)
    // ----------------------------------------------------
    {
        id: "th-4-1",
        category: "4. SW 개발 보안 구축",
        badge: "암기공식: 기무가 ⭐⭐⭐",
        title: "보안의 3대 요소 (기밀성, 무결성, 가용성) & 보안 요구 공학",
        content: `
            <p>정보 보안의 기본이자 출제 빈도 1위 개념 (암기 팁: <strong>기무가</strong>)</p>
            <ul>
                <li><strong>기밀성 (Confidentiality)</strong>: 인가되지 않은 자에게 정보가 노출되지 않도록 비밀 보호 <em>("비인가자는 못 봄")</em>.</li>
                <li><strong>무결성 (Integrity)</strong>: 정보가 인가되지 않은 방법으로 위·변조되지 않도록 정확성 유지 <em>("데이터 변조 방지")</em>.</li>
                <li><strong>가용성 (Availability)</strong>: 인가된 사용자가 필요할 때 언제든 정보 및 시스템에 접근 가능 <em>("필요할 때 쓸 수 있음")</em>.</li>
            </ul>
            <div style="margin-top:0.5rem; padding:0.5rem 0.75rem; background:#eff6ff; border-left:3px solid #3b82f6; font-size:0.88rem;">
                📌 <strong>기출 포인트:</strong> "보안 요구 공학은 <strong>보안 개발</strong>과 <strong>보안 관리</strong> 2가지로 나뉜다." ➡️ <strong>O (정답!)</strong>
            </div>
        `,
        tags: ["기무가", "기밀성", "무결성", "가용성", "보안요구공학", "보안3요소"]
    },
    {
        id: "th-4-2",
        category: "4. SW 개발 보안 구축",
        badge: "★매우 중요 ⭐⭐⭐",
        title: "자주 출제되는 5대 소프트웨어 보안 약점 & 대응 방안",
        content: `
            <table class="sql-result-table" style="margin-top:0.5rem;">
                <thead>
                    <tr><th>보안 약점</th><th>설명 및 공격 사례</th><th>대응 방안 (시큐어 코딩)</th></tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>SQL 삽입<br/>(SQL Injection)</strong></td>
                        <td>입력창에 <code>' OR 1=1 --</code> 등의 악의적 SQL을 삽입하여 DB 비인가 조작</td>
                        <td><strong>PreparedStatement</strong> 사용, SQL 예약어 및 특수문자 필터링</td>
                    </tr>
                    <tr>
                        <td><strong>크로스사이트스크립트<br/>(XSS)</strong></td>
                        <td>웹 게시판에 <code>&lt;script&gt;</code> 코드를 삽입하여 타인의 쿠키/세션 탈취</td>
                        <td>HTML 태그 사용 제한, 특수문자 HTML 치환 (<code>&lt;</code> ➡️ <code>&amp;lt;</code>)</td>
                    </tr>
                    <tr>
                        <td><strong>위험한 형식 파일 업로드</strong></td>
                        <td>웹셸(jsp, php 등) 악의적 실행 파일을 업로드하여 서버 제어권 탈취</td>
                        <td><strong>파일 확장자 화이트리스트 제한</strong>, 파일명 암호화, 실행 권한 제거</td>
                    </tr>
                    <tr>
                        <td><strong>경로 조작 및 자원 삽입</strong></td>
                        <td>경로 문자(<code>../</code>)를 조작하여 시스템 중요 파일에 비인가 접근</td>
                        <td>경로 검증 및 필터링, 정규화된 경로 사용</td>
                    </tr>
                    <tr>
                        <td><strong>코드 인젝션</strong></td>
                        <td>외부 입력값을 검증 없이 서버의 실행 함수에 전달하여 임의 코드 실행</td>
                        <td>모든 외부 입력값에 대한 철저한 유효성 검증 및 필터링</td>
                    </tr>
                </tbody>
            </table>
        `,
        tags: ["SQL삽입", "XSS", "파일업로드", "경로조작", "코드인젝션", "시큐어코딩"]
    },
    {
        id: "th-4-3",
        category: "4. SW 개발 보안 구축",
        badge: "결함 등급 & 캡슐화 ⭐⭐",
        title: "보안 테스트 결함 등급 (영향도/긴급도) & 캡슐화 (Encapsulation)",
        content: `
            <h4>1. 보안 테스트 결함 등급의 2대 기준</h4>
            <ul>
                <li><strong>영향도 (Impact)</strong>: 이 결함이 시스템 및 비즈니스에 미치는 영향의 크기 (치명적/보통/경미)</li>
                <li><strong>긴급도 (Urgency)</strong>: 이 결함이 얼마나 빨리 수정/처리되어야 하는지의 시간적 시급성</li>
            </ul>

            <h4 style="margin-top:0.75rem;">2. 객체지향 캡슐화 (Encapsulation)</h4>
            <p>객체의 속성(데이터)과 행위(메서드)를 하나로 묶고, 구현 내용의 일부를 외부에 감추어 보호(정보 은닉)하는 기법입니다.</p>
            <div style="background:#f1f5f9; padding:0.5rem 0.75rem; border-radius:6px; font-size:0.88rem;">
                <em>실생활 비유:</em> 감기 캡슐 알약. 겉에는 "감기약"이라고만 쓰여 있고 안에 어떤 화학 성분이 들어있는지는 감추며 필요한 효과(기능)만 제공합니다.
            </div>
        `,
        tags: ["영향도", "긴급도", "캡슐화", "정보은닉", "보안테스트"]
    },

    // ----------------------------------------------------
    // [특별 부록] 지필평가 합격 치트키 (약자 모음 & 핵심 암기 카드)
    // ----------------------------------------------------
    {
        id: "th-cheat-summary",
        category: "★ 지필 핵심 암기 공식",
        badge: "PDF 총정리 카드 👑",
        title: "SW_L5 지필평가 6대 핵심 약자 공식 총정리",
        content: `
            <table class="sql-result-table" style="margin-top:0.5rem;">
                <thead>
                    <tr><th>약자</th><th>원래 의미</th><th>과목 및 설명</th></tr>
                </thead>
                <tbody>
                    <tr><td><strong style="color:var(--primary); font-size:1.05rem;">도분명확</strong></td><td>도출 ➡️ 분석 ➡️ 명세 ➡️ 확인</td><td>요구사항 개발 4단계 프로세스</td></tr>
                    <tr><td><strong style="color:var(--primary); font-size:1.05rem;">직유효유</strong></td><td>직관성 ➡️ 유효성 ➡️ 학습성 ➡️ 유연성</td><td>UI 설계 4대 원칙 (좋은 리모컨)</td></tr>
                    <tr><td><strong style="color:var(--primary); font-size:1.05rem;">기무가</strong></td><td>기밀성 ➡️ 무결성 ➡️ 가용성</td><td>정보 보안의 3대 요소</td></tr>
                    <tr><td><strong style="color:var(--primary); font-size:1.05rem;">버사설새오제</strong></td><td>버전 ➡️ 사양 ➡️ 설치 ➡️ 새로운기능 ➡️ 오류 ➡️ 제약</td><td>배포용 미디어 포함 6대 항목</td></tr>
                    <tr><td><strong style="color:var(--primary); font-size:1.05rem;">계설수평리</strong></td><td>계획 ➡️ 설계(디자인) ➡️ 작성(케이스) ➡️ 수행 ➡️ 리포팅</td><td>테스트 프로세스 5단계</td></tr>
                    <tr><td><strong style="color:var(--primary); font-size:1.05rem;">완정명일특검수추이</strong></td><td>완전성, 정확성, 명확성, 일관성, 특이성, 검증성, 수정성, 추적성, 이해성</td><td>요구사항 9가지 품질 특성</td></tr>
                    <tr><td><strong style="color:#d97706; font-size:1.05rem;">자스제외공내</strong></td><td>자료 ➡️ 스탬프 ➡️ 제어 ➡️ 외부 ➡️ 공통 ➡️ 내용</td><td>결합도 순서 (약한 것 ➡️ 강한 것)</td></tr>
                    <tr><td><strong style="color:#d97706; font-size:1.05rem;">기순교절시논우</strong></td><td>기능적 ➡️ 순차적 ➡️ 교환적 ➡️ 절차적 ➡️ 시간적 ➡️ 논리적 ➡️ 우연적</td><td>응집도 순서 (강한 것 ➡️ 약한 것)</td></tr>
                    <tr><td><strong style="color:#059669; font-size:1.05rem;">원부이결다조</strong></td><td>1NF(원자값) ➡️ 2NF(부분함수) ➡️ 3NF(이행함수) ➡️ BCNF(결정자) ➡️ 4NF(다치) ➡️ 5NF(조인)</td><td>DB 정규화 1~5단계 순서</td></tr>
                </tbody>
            </table>
        `,
        tags: ["도분명확", "직유효유", "기무가", "버사설새오제", "계설수평리", "자스제외공내", "기순교절시논우", "원부이결다조"]
    }
];

// ==========================================
// 2. 간단한 스피드 퀴즈 (PDF 기출 함정 & 주관식 키워드 100% 반영)
// ==========================================
const WRITTEN_SPEED_QUIZ = [
    {
        "id": 1,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "현행 시스템 아키텍처 구성도는 가장 상세한 분석을 위해 세부 모듈 및 최하위 레벨 단위로 작성한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 시스템 전체 구조와 연계를 조망해야 하므로 최하위 레벨이 아니라 '상위 수준(High Level)'에서 작성합니다."
    },
    {
        "id": 2,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "현행 시스템 파악 1단계는 물리적인 서버 하드웨어 장비와 네트워크 백본 스위치 배치를 파악하는 단계이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 1단계는 겉모습(시스템 구성, 제공 기능, 인터페이스)을 파악하는 단계이며, HW/네트워크 인프라 파악은 '3단계'입니다."
    },
    {
        "id": 3,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "소프트웨어 요구사항 개발 프로세스의 표준 4단계 순서는 '도출 ➡️ 분석 ➡️ 명세 ➡️ 확인(도분명확)'이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! (암기 팁: 도분명확)"
    },
    {
        "id": 4,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "비기능적 요구사항(Non-functional)은 시스템이 사용자에게 실제로 제공해야 하는 핵심 업무 기능 자체를 기술한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 업무 기능 자체는 '기능적 요구사항(Functional)'이며, 성능·보안·가용성·품질·제약사항 등은 '비기능적 요구사항'입니다."
    },
    {
        "id": 5,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "정형 명세 기법(Formal Specification)은 사용자가 읽기 쉽도록 일상적인 자연어와 다이어그램을 위주로 작성하는 기법이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 자연어로 작성하는 것은 '비정형 명세 기법'입니다. 정형 명세 기법은 수학적 기호(Z, VDM 등)와 정형 논리학을 기반으로 작성합니다."
    },
    {
        "id": 6,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "UI 설계 4대 원칙은 '직관성, 유효성, 학습성, 유연성(직유효유)'이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! (암기 팁: 직-유-효-유)"
    },
    {
        "id": 7,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "요구사항 추적 매트릭스(Traceability Matrix)는 요구사항 변경 시 설계, 소스코드, 테스트 케이스 간의 영향도를 추적하기 위해 작성한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 요구사항과 하위 개발 산출물 간의 상호 추적성을 보장합니다."
    },
    {
        "id": 8,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "유스케이스 다이어그램(Use Case Diagram)에서 시스템과 상호작용하는 사람 또는 외부 시스템 역할을 '액터(Actor)'라고 한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 졸라맨 기호로 표현되는 외부 주체를 액터(Actor)라고 부릅니다."
    },
    {
        "id": 9,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "개념적 데이터 모델링 단계에서 특정 DBMS(Oracle, MySQL 등)의 물리적 테이블 명세와 인덱스를 구체적으로 설계한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 특정 DBMS 환경에 맞추어 인덱스, 컬럼 타입 등을 결정하는 것은 '물리적 데이터 모델링' 단계입니다."
    },
    {
        "id": 10,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "기능 점수(Function Point) 산정 방식은 소스코드 라인 수(LOC)에 전적으로 비례하여 소프트웨어 개발 비용을 산정한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 기능 점수(FP)는 코드 라인 수가 아니라 사용자가 요구한 기능의 개수와 복잡도를 정량적으로 측정하는 방식입니다."
    },
    {
        "id": 11,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "좋은 요구사항의 품질 특성 중 '일관성(Consistency)'이란 요구사항 간에 상호 충돌이나 모순이 없어야 함을 의미한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 요구사항 간에 상반된 내용이 존재하지 않아야 합니다."
    },
    {
        "id": 12,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "데이터 흐름도(DFD)의 4대 구성요소는 프로세스(Process), 데이터 흐름(Data Flow), 데이터 저장소(Data Store), 단말(Terminator)이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 구조적 분석 기법의 대표 도구입니다."
    },
    {
        "id": 13,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "애자일(Agile) 개발 방법론은 방대한 사전 계획과 엄격한 형식적 문서 작성을 개발 소프트웨어보다 우선시한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 애자일 선언문은 '문서화보다 작동하는 소프트웨어', '계획 준수보다 변화에 대응'을 더 중시합니다."
    },
    {
        "id": 14,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "고객 및 이해관계자로부터 요구사항을 수집하는 '요구사항 개발 프로세스 4단계(도-분-명-확)'의 첫 번째 단계는?",
        "answer": "도출",
        "acceptedAnswers": [
            "도출",
            "도출단계",
            "elicitation"
        ],
        "explanation": "정답은 '도출(Elicitation)'입니다. (도출 ➡️ 분석 ➡️ 명세 ➡️ 확인)"
    },
    {
        "id": 15,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "요구사항 개발 프로세스 4단계 중 이해관계자 간 상충되거나 모순된 요구를 조율하고 타당성을 검토하는 2번째 단계는?",
        "answer": "분석",
        "acceptedAnswers": [
            "분석",
            "요구사항 분석",
            "요구사항분석",
            "analysis"
        ],
        "explanation": "정답은 '요구사항 분석(Analysis)'입니다."
    },
    {
        "id": 16,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "요구사항 개발 프로세스 4단계 중 확정된 요구사항을 표준화된 양식(SRS)으로 체계적으로 문서화하는 3번째 단계는?",
        "answer": "명세",
        "acceptedAnswers": [
            "명세",
            "요구사항 명세",
            "요구사항명세",
            "specification"
        ],
        "explanation": "정답은 '요구사항 명세(Specification)'입니다."
    },
    {
        "id": 17,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "요구사항 개발 프로세스 4단계 중 작성된 명세서가 고객의 원래 요구를 올바르게 반영했는지 최종 검토·승인하는 4번째 단계는?",
        "answer": "확인",
        "acceptedAnswers": [
            "확인",
            "요구사항 확인",
            "요구사항확인",
            "검증",
            "validation"
        ],
        "explanation": "정답은 '요구사항 확인(Validation)'입니다."
    },
    {
        "id": 18,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "UI 설계 4대 원칙(직-유-효-유) 중 매뉴얼 없이도 누구나 직관적으로 쉽게 이해하고 사용할 수 있어야 한다는 원칙은?",
        "answer": "직관성",
        "acceptedAnswers": [
            "직관성",
            "intuitiveness"
        ],
        "explanation": "정답은 '직관성(Intuitiveness)'입니다."
    },
    {
        "id": 19,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "UI 설계 4대 원칙(직-유-효-유) 중 사용자가 달성하고자 하는 목표를 정확하고 완벽하게 완수할 수 있어야 한다는 원칙은?",
        "answer": "유효성",
        "acceptedAnswers": [
            "유효성",
            "effectiveness"
        ],
        "explanation": "정답은 '유효성(Effectiveness)'입니다."
    },
    {
        "id": 20,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "UI 설계 4대 원칙(직-유-효-유) 중 초보 사용자도 짧은 시간 안에 쉽게 조작법을 익힐 수 있어야 한다는 원칙은?",
        "answer": "학습성",
        "acceptedAnswers": [
            "학습성",
            "learnability"
        ],
        "explanation": "정답은 '학습성(Learnability)'입니다."
    },
    {
        "id": 21,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "UI 설계 4대 원칙(직-유-효-유) 중 사용자의 인터랙션 실수를 최대한 포용하고 되돌릴 수 있어야 한다는 원칙은?",
        "answer": "유연성",
        "acceptedAnswers": [
            "유연성",
            "flexibility"
        ],
        "explanation": "정답은 '유연성(Flexibility)'입니다."
    },
    {
        "id": 22,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "현행 시스템 파악 3단계 절차 중 물리적 인프라 환경을 파악하는 3단계의 대상 2가지는 하드웨어와 [ ? ]이다.",
        "answer": "네트워크",
        "acceptedAnswers": [
            "네트워크",
            "network",
            "네트워크 구성"
        ],
        "explanation": "정답은 '네트워크'입니다. (1단계: 구성/기능/인터페이스, 2단계: SW/아키텍처, 3단계: HW/네트워크)"
    },
    {
        "id": 23,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "좋은 요구사항의 9대 품질 특성(완정명일특검수추이) 중 요구사항 명세서에 누락된 요구가 전혀 없어야 함을 뜻하는 특성은?",
        "answer": "완전성",
        "acceptedAnswers": [
            "완전성",
            "completeness"
        ],
        "explanation": "정답은 '완전성(Completeness)'입니다."
    },
    {
        "id": 24,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "요구사항 검토 기법 중 저작자 외의 전문가 팀이 사전에 정의된 체크리스트를 바탕으로 결함을 찾는 공식적인 정적 검토 기법은?",
        "answer": "인스펙션",
        "acceptedAnswers": [
            "인스펙션",
            "inspection",
            "워크스루",
            "동료검토"
        ],
        "explanation": "정답은 '인스펙션(Inspection)'입니다."
    },
    {
        "id": 25,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "실제 개발에 착수하기 전, 사용자의 요구사항을 빠르게 시각화하고 피드백을 수집하기 위해 제작하는 간이 동작 모형은?",
        "answer": "프로토타입",
        "acceptedAnswers": [
            "프로토타입",
            "프로토타이핑",
            "prototype",
            "prototyping"
        ],
        "explanation": "정답은 '프로토타입(Prototype)'입니다."
    },
    {
        "id": 26,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "형상 관리(SCM)는 소프트웨어 개발 코딩이 완전히 종료된 이후에만 시작하며, 개발 중에는 수행하지 않는다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 형상 관리는 프로젝트 착수(요구사항 분석)부터 운영 및 유지보수에 이르기까지 전체 생명주기 동안 지속 수행합니다."
    },
    {
        "id": 27,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "Git은 중앙 서버가 네트워크 장애로 다운되더라도 개발자가 로컬 컴퓨터에서 커밋과 브랜치 작업을 정상 수행할 수 있는 분산 저장소 방식이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! Git은 분산 저장소 방식으로 로컬에 완전한 저장소 복제본(Clone)을 갖습니다."
    },
    {
        "id": 28,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "배포용 미디어(설치 CD, USB 등)에는 제품 개발자의 주민등록번호와 개인 휴대전화 번호가 필수 포함 항목이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 배포용 미디어 6대 항목은 '버사설새오제(버전, 사양, 설치, 새로운기능, 오류, 제약)'이며 개발자 개인정보는 포함되지 않습니다."
    },
    {
        "id": 29,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "소프트웨어 모듈화의 최우선 설계 원칙은 결합도(Coupling)를 최대화하고 응집도(Cohesion)를 최소화하는 것이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 정반대입니다! 모듈 독립성을 높이기 위해 '결합도는 최소화(낮게)', '응집도는 최대화(높게)' 해야 합니다."
    },
    {
        "id": 30,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "릴리즈 노트(Release Notes)는 최종 릴리즈 후 사용자 및 고객에게 변경 사항, 버그 수정 내역, 설치 안내를 제공하는 공식 배포 문서이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 릴리즈 노트는 제품의 릴리즈 정보를 전달하는 핵심 문서입니다."
    },
    {
        "id": 31,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "빌드(Build)는 사람이 작성한 소스코드를 컴파일하고 링크하여 컴퓨터가 실행할 수 있는 바이너리 실행 파일로 변환하는 공정이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 패키징의 1단계 공정이 바로 '빌드'입니다."
    },
    {
        "id": 32,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "DRM(디지털 저작권 관리) 기술은 불법 복제를 방지하고 저작권자의 권익을 보호하며 라이선스를 제어하기 위해 적용된다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 콘텐츠 암호화, 정책 관리, 클리어링 하우스 등으로 구성됩니다."
    },
    {
        "id": 33,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "내용 결합도(Content Coupling)는 한 모듈이 다른 모듈의 내부 데이터나 코드를 직접 조작하는 가장 결합도가 강하고 나쁜 결합도이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 내용 결합도는 결합도 중 가장 강하며, 유지보수성을 극도로 저해합니다."
    },
    {
        "id": 34,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "기능적 응집도(Functional Cohesion)는 모듈 내부의 모든 요소들이 단 하나의 명확한 단일 기능만을 수행하는 가장 이상적인 응집도이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 응집도(기순교절시논우) 중 가장 높고 우수한 응집도입니다."
    },
    {
        "id": 35,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "우연적 응집도(Coincidental Cohesion)는 모듈 내 구성요소들이 아무런 논리적 관련 없이 우연히 모여 있는 가장 낮은 수준의 응집도이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 응집도 중 가장 나쁘며 모듈화 원칙에 위배됩니다."
    },
    {
        "id": 36,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "형상 통제(Configuration Control) 활동은 형상 변경 요청(CR)을 접수하여 심의(CCB)하고 변경 승인 또는 기각을 결정하는 활동이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 베이스라인 변경을 공식 통제합니다."
    },
    {
        "id": 37,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "패키징 도구 적용 시 사용자 컴퓨터의 보안 설정을 무력화하고 무조건 최고 관리자(Root) 권한을 강제 요구하는 것이 보안 권장사항이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 최소 권한의 원칙(Least Privilege)을 지켜야 하며, 불필요한 관리자 권한 남용은 보안 사고를 유발합니다."
    },
    {
        "id": 38,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "오픈소스 라이선스 중 GPL(General Public License)은 해당 코드를 수정한 파생 소프트웨어도 동일하게 소스코드를 공개해야 하는 의무를 지닌다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! GPL은 카피레프트(Copyleft)의 강력한 상속 전염성을 갖습니다."
    },
    {
        "id": 39,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "각 개발자가 전체 저장소 사본(Clone)을 로컬에 보관하며 작업하는 대표적인 분산 형상 관리 도구의 명칭은?",
        "answer": "Git",
        "acceptedAnswers": [
            "git",
            "깃",
            "BitKeeper"
        ],
        "explanation": "정답은 'Git'입니다."
    },
    {
        "id": 40,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "모듈 간의 상호 의존성을 나타내는 결합도(Coupling)는 모듈 독립성을 위해 [ ? ]화해야 한다.",
        "answer": "최소화",
        "acceptedAnswers": [
            "최소화",
            "최소",
            "낮게",
            "낮을수록"
        ],
        "explanation": "정답은 '최소화' (낮을수록 우수)입니다."
    },
    {
        "id": 41,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "모듈 내부 구성요소 간의 밀접한 연관성을 나타내는 응집도(Cohesion)는 [ ? ]화해야 한다.",
        "answer": "최대화",
        "acceptedAnswers": [
            "최대화",
            "최대",
            "높게",
            "높을수록"
        ],
        "explanation": "정답은 '최대화' (높을수록 우수)입니다."
    },
    {
        "id": 42,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "배포용 미디어 포함 6대 필수 항목의 암기 공식 '버-사-설-새-오-제' 중 마지막 '제'가 의미하는 항목은?",
        "answer": "제약사항",
        "acceptedAnswers": [
            "제약사항",
            "제약",
            "제약조건"
        ],
        "explanation": "정답은 '제약사항 (제약)'입니다. (버전, 사양, 설치, 새로운기능, 오류, 제약)"
    },
    {
        "id": 43,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "소스코드를 컴퓨터가 직접 실행할 수 있는 바이너리 파일로 변환하는 패키징의 첫 번째 작업 단계는?",
        "answer": "빌드",
        "acceptedAnswers": [
            "빌드",
            "build"
        ],
        "explanation": "정답은 '빌드(Build)'입니다."
    },
    {
        "id": 44,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "자바 진영에서 Groovy나 Kotlin 기반 스크립트로 빌드 스크립트를 작성하고 의존성을 관리하는 현대적 빌드 도구는?",
        "answer": "Gradle",
        "acceptedAnswers": [
            "gradle",
            "그래들"
        ],
        "explanation": "정답은 'Gradle(그래들)'입니다. (Maven의 후속 대세 도구)"
    },
    {
        "id": 45,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "디지털 콘텐츠의 불법 복제 방지와 지적재산권 보호 및 라이선스 유통을 제어하는 보안 기술의 영문 약어 3글자는?",
        "answer": "DRM",
        "acceptedAnswers": [
            "drm",
            "디알엠"
        ],
        "explanation": "정답은 'DRM (Digital Rights Management)'입니다."
    },
    {
        "id": 46,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "6대 결합도 순서 '자-스-제-외-공-내' 중 모듈 간에 레코드나 배열 등 자료 구조가 통째로 전달될 때 발생하는 결합도는?",
        "answer": "스탬프 결합도",
        "acceptedAnswers": [
            "스탬프 결합도",
            "스탬프",
            "stamp coupling",
            "stamp"
        ],
        "explanation": "정답은 '스탬프 결합도(Stamp Coupling)'입니다."
    },
    {
        "id": 47,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "6대 결합도 순서 '자-스-제-외-공-내' 중 한 모듈이 다른 모듈의 내부 흐름을 제어하기 위해 제어 플래그를 전달하는 결합도는?",
        "answer": "제어 결합도",
        "acceptedAnswers": [
            "제어 결합도",
            "제어",
            "control coupling",
            "control"
        ],
        "explanation": "정답은 '제어 결합도(Control Coupling)'입니다."
    },
    {
        "id": 48,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "7대 응집도 순서(강한 것 ➡️ 약한 것: 기순교절시논우) 중 가장 응집도가 높고 독립성이 우수한 첫 번째 응집도는?",
        "answer": "기능적 응집도",
        "acceptedAnswers": [
            "기능적 응집도",
            "기능적",
            "functional cohesion",
            "functional"
        ],
        "explanation": "정답은 '기능적 응집도(Functional Cohesion)'입니다."
    },
    {
        "id": 49,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "시맨틱 버저닝(Semantic Versioning) `v3.1.2`에서 하위 호환성을 깨뜨리는 대규모 비호환 API 변경을 뜻하는 맨 앞자리 '3'의 버전 명칭은?",
        "answer": "메이저",
        "acceptedAnswers": [
            "메이저",
            "major",
            "주 버전",
            "주버전"
        ],
        "explanation": "정답은 '메이저 버전 (Major Version)'입니다. (Major.Minor.Patch)"
    },
    {
        "id": 50,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "개발 전 생명주기에 걸쳐 베이스라인을 구축하고 변경 사항을 체계적으로 추적·통제·기록하는 관리 활동은 '소프트웨어 [ ? ] 관리'이다.",
        "answer": "형상",
        "acceptedAnswers": [
            "형상",
            "형상관리",
            "scm",
            "configuration"
        ],
        "explanation": "정답은 '형상 (형상관리)'입니다."
    },
    {
        "id": 51,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "정적 분석(Static Analysis)은 프로그램을 실제로 실행하여 런타임 메모리 누수와 CPU 사용량을 측정하는 기법이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 프로그램을 실행하지 않고 소스코드 문법과 코딩 표준을 분석하는 것이 '정적 분석'이며, 실행하는 것은 '동적 분석'입니다."
    },
    {
        "id": 52,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "동적 분석(Dynamic Analysis)은 소스코드를 컴파일 및 실행하면서 메모리 누수와 실제 동작 오류를 검출한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 실제 실행 환경에서 검증합니다."
    },
    {
        "id": 53,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "화이트박스 테스트(White-Box Test)는 프로그램 내부 제어 구조를 전혀 보지 않고 외부 입출력 명세만을 검사하는 기법이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 내부 소스코드 구조와 로직을 들여다보는 것이 '화이트박스', 내부를 보지 않는 것이 '블랙박스'입니다."
    },
    {
        "id": 54,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "블랙박스 테스트 기법에는 동치 분할, 경계값 분석, 원인-결과 그래프 등이 포함된다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 사용자 명세 기반의 기능 테스트 기법들입니다."
    },
    {
        "id": 55,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "회귀 테스트(Regression Test)는 코드 수정이나 버그 조치 후 이로 인해 기존 정상 기능에 새로운 결함이 생기지 않았는지 재검증하는 테스트이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 사이드 이펙트(부작용) 검증에 필수적입니다."
    },
    {
        "id": 56,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "강도 테스트(Stress Test)는 시스템에 한계치 이상의 비정상적 과부하(Peak Load)를 가하여 시스템의 붕괴 및 복원 능력을 확인하는 테스트이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 극한 부하 환경에서 시스템 장애 복원력을 측정합니다."
    },
    {
        "id": 57,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "상향식 통합 테스트(Bottom-Up Integration)에서는 아직 개발되지 않은 하위 모듈의 역할을 임시로 흉내내는 '테스트 스텁(Stub)'이 반드시 필요하다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 상향식 통합(하위 ➡️ 상위)에서는 상위 호출 모듈인 '테스트 드라이버(Driver)'가 필요하며, 스텁은 하향식(Top-Down)에 필요합니다."
    },
    {
        "id": 58,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "하향식 통합 테스트(Top-Down Integration)는 최상위 메인 제어 모듈부터 아래로 통합하며 미개발 하위 모듈 대신 '테스트 스텁(Stub)'을 사용한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! (상향식=드라이버, 하향식=스텁)"
    },
    {
        "id": 59,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "테스트 프로세스 5단계의 표준 순서는 '계획 ➡️ 설계 ➡️ 케이스 작성 ➡️ 수행 ➡️ 평가 및 리포팅(계설수평리)'이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! (암기 팁: 계설수평리)"
    },
    {
        "id": 60,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "살충제 패러독스(Pesticide Paradox)란 동일한 테스트 케이스를 반복 수행하면 더 이상 새로운 결함을 찾기 어려워지므로 정기적으로 케이스를 개선해야 한다는 원리이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 소프트웨어 테스트 7대 기본 원리 중 하나입니다."
    },
    {
        "id": 61,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "구문 커버리지(Statement Coverage)를 100% 달성하면 분기(결정) 커버리지(Branch Coverage)도 자동으로 100% 만족된다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 구문 커버리지는 가장 기초적인 수준이며, if문의 else(거짓) 분기를 실행하지 않아도 100%가 될 수 있으므로 분기 커버리지를 보장하지 못합니다."
    },
    {
        "id": 62,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "회복 테스트(Recovery Test)는 인위적으로 정전이나 하드웨어 장애를 유도한 후 시스템이 정상 데이터로 자동 복구되는지 검증하는 테스트이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 장애 복구 신뢰성을 평가합니다."
    },
    {
        "id": 63,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "단위 테스트(Unit Test)는 소프트웨어 개발에서 모듈이나 컴포넌트 단위의 최소 기능을 검증하는 가장 첫 번째 테스트 레벨이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! (단위 ➡️ 통합 ➡️ 시스템 ➡️ 인수)"
    },
    {
        "id": 64,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 결과가 참인지 거짓인지 판단하기 위해 사전에 정의된 참(True) 값과 비교하는 기준(정답지 역할)의 명칭은 '테스트 [ ? ]'이다.",
        "answer": "오라클",
        "acceptedAnswers": [
            "오라클",
            "oracle",
            "test oracle",
            "테스트 오라클"
        ],
        "explanation": "정답은 '테스트 오라클(Test Oracle)'입니다."
    },
    {
        "id": 65,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "소스코드의 모든 개별 실행 문장을 최소 한 번 이상 실행하도록 요구하는 가장 기본적이고 약한 코드 커버리지는?",
        "answer": "구문 커버리지",
        "acceptedAnswers": [
            "구문 커버리지",
            "구문커버리지",
            "문장 커버리지",
            "statement coverage"
        ],
        "explanation": "정답은 '구문 커버리지(Statement Coverage)'입니다."
    },
    {
        "id": 66,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "조건문(if)의 전체 결과가 참(True)인 경우와 거짓(False)인 경우를 각각 최소 한 번 이상 실행하도록 요구하는 커버리지는?",
        "answer": "결정 커버리지",
        "acceptedAnswers": [
            "결정 커버리지",
            "결정커버리지",
            "분기 커버리지",
            "분기커버리지",
            "branch coverage",
            "decision coverage"
        ],
        "explanation": "정답은 '결정(분기) 커버리지'입니다."
    },
    {
        "id": 67,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "프로그램의 입력 도메인을 유효한 그룹과 무효한 그룹으로 나누어 대표값을 추출해 테스트하는 블랙박스 기법은 '동치 [ ? ]'이다.",
        "answer": "분할",
        "acceptedAnswers": [
            "분할",
            "동치분할",
            "동치 분할",
            "equivalence partitioning"
        ],
        "explanation": "정답은 '동치 분할(Equivalence Partitioning)'입니다."
    },
    {
        "id": 68,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "동치 분할 영역의 최솟값, 최댓값, 경계 바로 안팎의 값에서 오류가 많이 집중된다는 점을 이용한 블랙박스 테스트 기법은?",
        "answer": "경계값 분석",
        "acceptedAnswers": [
            "경계값 분석",
            "경계값분석",
            "경계값",
            "bva",
            "boundary value analysis"
        ],
        "explanation": "정답은 '경계값 분석(Boundary Value Analysis)'입니다."
    },
    {
        "id": 69,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "상향식 통합 테스트(Bottom-Up)에서 하위 모듈들을 제어하고 테스트 파라미터를 전달하기 위해 작성하는 가상의 임시 상위 모듈은?",
        "answer": "테스트 드라이버",
        "acceptedAnswers": [
            "테스트 드라이버",
            "테스트드라이버",
            "드라이버",
            "driver",
            "test driver"
        ],
        "explanation": "정답은 '테스트 드라이버(Test Driver)'입니다."
    },
    {
        "id": 70,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "하향식 통합 테스트(Top-Down)에서 아직 개발되지 않은 하위 모듈의 역할을 대신하기 위해 임시로 작성하는 더미 하위 모듈은?",
        "answer": "테스트 스텁",
        "acceptedAnswers": [
            "테스트 스텁",
            "테스트스텁",
            "스텁",
            "stub",
            "test stub"
        ],
        "explanation": "정답은 '테스트 스텁(Test Stub)'입니다."
    },
    {
        "id": 71,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "V-모델 테스트 레벨 4단계 '단위 테스트 ➡️ [ ? ] 테스트 ➡️ 시스템 테스트 ➡️ 인수 테스트' 중 빈칸에 들어갈 단계는?",
        "answer": "통합",
        "acceptedAnswers": [
            "통합",
            "통합 테스트",
            "통합테스트",
            "integration"
        ],
        "explanation": "정답은 '통합 테스트(Integration Test)'입니다."
    },
    {
        "id": 72,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "실제 최종 사용자나 고객이 운영 환경에서 소프트웨어의 요구사항 충족 여부를 확인하고 최종 인수를 결정하는 테스트 단계는?",
        "answer": "인수 테스트",
        "acceptedAnswers": [
            "인수 테스트",
            "인수테스트",
            "인수",
            "acceptance test"
        ],
        "explanation": "정답은 '인수 테스트(Acceptance Test)'입니다."
    },
    {
        "id": 73,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "인수 테스트 중 개발자의 통제된 환경에서 진행하는 알파 테스트와 달리, 실제 사용자가 자신의 실제 환경에서 직접 사용해보는 테스트는?",
        "answer": "베타 테스트",
        "acceptedAnswers": [
            "베타 테스트",
            "베타테스트",
            "베타",
            "beta test"
        ],
        "explanation": "정답은 '베타 테스트(Beta Test)'입니다."
    },
    {
        "id": 74,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "특정 요구사항 검증을 위해 설계된 입력값, 실행 조건, 기대 결과의 조합을 표준 양식으로 작성한 문서는 '테스트 [ ? ]'이다.",
        "answer": "케이스",
        "acceptedAnswers": [
            "케이스",
            "테스트 케이스",
            "테스트케이스",
            "test case"
        ],
        "explanation": "정답은 '테스트 케이스(Test Case)'입니다."
    },
    {
        "id": 75,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 결함을 보고할 때 결함이 얼마나 신속하게 조치되어야 하는지의 시간적 시급성을 나타내는 지표는?",
        "answer": "긴급도",
        "acceptedAnswers": [
            "긴급도",
            "urgency"
        ],
        "explanation": "정답은 '긴급도(Urgency)'입니다. (영향도와 긴급도)"
    },
    {
        "id": 76,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "보안 요구 공학(Security Requirements Engineering)은 '보안 개발'과 '보안 관리' 2가지 핵심 영역으로 분류된다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 개발 단계의 보안과 운영/관리 단계의 통제로 나뉩니다."
    },
    {
        "id": 77,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "기밀성(Confidentiality)은 인가된 사용자만이 정보에 접근할 수 있고, 비인가자에게는 정보 열람이 차단됨을 보장하는 보안 원칙이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 정보 보안 3대 요소(기무가)의 첫 번째 특성입니다."
    },
    {
        "id": 78,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "무결성(Integrity)은 정보나 데이터가 인가되지 않은 방법으로 위조, 변조, 삭제되지 않고 원본의 정확성이 보장됨을 의미한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 데이터 변조 방지 특성입니다."
    },
    {
        "id": 79,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "가용성(Availability)은 인가된 정당한 사용자가 정보와 자원을 필요로 할 때 지체 없이 서비스에 접근하여 사용할 수 있음을 보장한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! DoS/DDoS 공격은 이 가용성을 침해하는 공격입니다."
    },
    {
        "id": 80,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "시큐어 코딩(Secure Coding)은 소프트웨어 배포 후 해킹 사고가 터졌을 때 긴급 패치를 덧붙이는 사후 보완 기법이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 설계 및 구현 초기 단계부터 보안 취약점을 사전에 고려하여 배제하는 안전한 개발 기법입니다."
    },
    {
        "id": 81,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "SQL Injection 공격을 완벽히 방어하기 위해 JDBC 코드 작성 시 Statement의 문자열 연결 방식(`+`)을 적극 권장한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 문자열 연결 방식은 SQL Injection의 주원인입니다. 반드시 파라미터를 바인딩하는 `PreparedStatement`를 사용해야 합니다."
    },
    {
        "id": 82,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "XSS(크로스 사이트 스크립팅) 공격은 웹 페이지에 악의적인 스크립트를 삽입하여 피해자의 웹 브라우저에서 쿠키나 세션 토큰을 탈취하는 공격이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 특수문자 HTML Entity 치환(`&lt;`, `&gt;` 등)으로 방어합니다."
    },
    {
        "id": 83,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "데이터베이스에 사용자 비밀번호를 저장할 때는 복호화가 가능한 양방향 대칭키 암호화 알고리즘으로 저장하는 것이 표준 보안 원칙이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 비밀번호는 관리자도 열람할 수 없도록 복호화가 불가능한 '일방향(단방향) 해시 함수(SHA-256 + Salt 등)'로 암호화해야 합니다."
    },
    {
        "id": 84,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "CSRF(사이트 간 요청 위조)는 사용자가 로그인된 상태에서 공격자가 의도한 비인가 요청(비밀번호 변경, 송금 등)을 서버로 강제 전송하게 만드는 공격이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! CSRF 토큰(Token) 검증을 통해 방어합니다."
    },
    {
        "id": 85,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "서버의 파일 업로드 디렉터리에는 사용자가 업로드한 파일을 즉시 다운로드할 수 있도록 '실행(Execute)' 권한을 반드시 부여해야 한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 업로드 경로의 실행 권한을 원천 박탈(읽기/쓰기 전용)해야 악성 웹셸 스크립트 실행을 차단할 수 있습니다."
    },
    {
        "id": 86,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "사용자가 올린 원본 첨부 파일명을 URL 경로에 그대로 노출하여 저장하는 것이 파일 난수화보다 훨씬 보안상 안전하다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 원본 파일명을 그대로 쓰면 경로 조작 및 웹셸 직접 호출에 악용되므로, 서버에서 무작위 난수(UUID)로 변경하여 저장해야 합니다."
    },
    {
        "id": 87,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "경로 조작(Path Traversal) 공격은 `../` 와 같은 상위 디렉터리 이동 문자를 삽입하여 허가되지 않은 중요 시스템 파일에 접근하는 취약점이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 디렉터리 탐색 문자 필터링으로 방어합니다."
    },
    {
        "id": 88,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "솔트(Salt)는 비밀번호 해시 생성 시 레인보우 테이블(미리 계산된 해시표) 공격을 무력화하기 위해 추가하는 임의의 난수 데이터이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 동일 비밀번호라도 서로 다른 해시값이 생성되도록 보장합니다."
    },
    {
        "id": 89,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "정보 보안 3대 요소(기-무-가) 중 정당한 인가자가 정보 시스템을 필요로 할 때 언제든 지체 없이 접근 가능한 성질은?",
        "answer": "가용성",
        "acceptedAnswers": [
            "가용성",
            "availability"
        ],
        "explanation": "정답은 '가용성(Availability)'입니다."
    },
    {
        "id": 90,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "정보 보안 3대 요소 중 비인가자가 허가 없이 정보의 내용을 열람하거나 훔쳐보지 못하도록 보호하는 성질은?",
        "answer": "기밀성",
        "acceptedAnswers": [
            "기밀성",
            "confidentiality"
        ],
        "explanation": "정답은 '기밀성(Confidentiality)'입니다."
    },
    {
        "id": 91,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "정보 보안 3대 요소 중 데이터가 부당하게 위조·변조·삭제되지 않고 본래의 정확성을 온전히 유지하는 성질은?",
        "answer": "무결성",
        "acceptedAnswers": [
            "무결성",
            "integrity"
        ],
        "explanation": "정답은 '무결성(Integrity)'입니다."
    },
    {
        "id": 92,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "웹 입력값에 악의적 SQL 구문을 삽입하여 데이터베이스를 비정상 조작하거나 정보를 탈취하는 대표적인 취약점은 'SQL [ ? ]'이다.",
        "answer": "인젝션",
        "acceptedAnswers": [
            "인젝션",
            "삽입",
            "injection",
            "sql injection",
            "sql인젝션"
        ],
        "explanation": "정답은 'SQL 인젝션(SQL Injection)'입니다."
    },
    {
        "id": 93,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "JDBC에서 SQL Injection을 방어하기 위해 SQL문을 사전 컴파일하고 파라미터를 물음표(`?`)로 안전하게 바인딩하는 인터페이스 객체는?",
        "answer": "PreparedStatement",
        "acceptedAnswers": [
            "preparedstatement",
            "프리페어드스테이트먼트",
            "prepared statement"
        ],
        "explanation": "정답은 'PreparedStatement'입니다."
    },
    {
        "id": 94,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "공격자가 웹 페이지에 악성 스크립트를 삽입하여 타 사용자의 쿠키와 세션을 가로채는 '크로스 사이트 스크립팅'의 영문 약어 3글자는?",
        "answer": "XSS",
        "acceptedAnswers": [
            "xss",
            "크로스사이트스크립팅"
        ],
        "explanation": "정답은 'XSS'입니다."
    },
    {
        "id": 95,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "로그인된 피해자의 권한으로 공격자가 의도한 행위를 서버에 요청하도록 유도하는 '사이트 간 요청 위조'의 영문 약어 4글자는?",
        "answer": "CSRF",
        "acceptedAnswers": [
            "csrf"
        ],
        "explanation": "정답은 'CSRF'입니다."
    },
    {
        "id": 96,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "서버에 업로드된 서버 스크립트 파일(JSP, PHP 등)을 원격에서 웹을 통해 실행하여 서버 전체 제어권을 탈취하는 악성 도구는 '웹[ ? ]'이다.",
        "answer": "셸",
        "acceptedAnswers": [
            "셸",
            "쉘",
            "web shell",
            "webshell"
        ],
        "explanation": "정답은 '웹셸(WebShell)'입니다."
    },
    {
        "id": 97,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "공격자가 `../` 와 같은 상위 디렉터리 이동 문자를 삽입하여 비인가 시스템 파일에 접근하는 보안 취약점은 '[ ? ] 조작'이다.",
        "answer": "경로",
        "acceptedAnswers": [
            "경로",
            "경로조작",
            "디렉터리트래버설",
            "path traversal"
        ],
        "explanation": "정답은 '경로 조작(Path Traversal)'입니다."
    },
    {
        "id": 98,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "객체지향 설계에서 객체의 세부 속성과 구현을 은폐하여 외부의 부적절한 직접 접근을 차단하는 정보 은닉 원리는?",
        "answer": "캡슐화",
        "acceptedAnswers": [
            "캡슐화",
            "encapsulation"
        ],
        "explanation": "정답은 '캡슐화(Encapsulation)'입니다."
    },
    {
        "id": 99,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "보안 결함의 위험 등급을 평가할 때 결함이 시스템과 비즈니스에 미치는 파급력 크기를 나타내는 기준 명칭은?",
        "answer": "영향도",
        "acceptedAnswers": [
            "영향도",
            "impact"
        ],
        "explanation": "정답은 '영향도(Impact)'입니다. (영향도와 긴급도)"
    },
    {
        "id": 100,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "단방향 암호화 시 레인보우 테이블 공격을 방어하기 위해 비밀번호에 무작위 난수 문자열을 덧붙여 해싱하는 기법을 무엇이라 하는가?",
        "answer": "솔트",
        "acceptedAnswers": [
            "솔트",
            "솔팅",
            "salt",
            "salting"
        ],
        "explanation": "정답은 '솔트(Salt, 솔팅)'입니다."
    },
    {
        "id": 101,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "와이어프레임(Wireframe)은 색상과 그래픽 효과가 완벽히 적용된 최종 디자인 시안을 의미한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 와이어프레임은 그래픽 요소 없이 화면의 뼈대와 레이아웃 구조만을 선과 상자로 단순 표현한 설계 산출물입니다."
    },
    {
        "id": 102,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "자료사전(Data Dictionary)에서 중괄호 `{ }` 기호는 해당 데이터 항목이 '반복'됨을 나타낸다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 자료사전 기호: `=` 정의, `+` 연결, `( )` 생략(선택), `{ }` 반복, `[ ]` 택일, `**` 주석"
    },
    {
        "id": 103,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "트랜잭션의 4대 특성(ACID) 중 원자성(Atomicity)은 트랜잭션의 모든 연산이 완전히 완료되거나 전혀 실행되지 않아야(All or Nothing) 함을 뜻한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 작업 중 일부만 반영되는 불완전 처리를 원천 방지합니다."
    },
    {
        "id": 104,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "제1정규형(1NF)은 테이블의 모든 속성 값이 더 이상 분해할 수 없는 '원자값(Atomic Value)'으로만 구성되도록 분해하는 정규화 단계이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! (암기 팁: 원부이결다조 중 첫 단계인 '원' = 원자값!)"
    },
    {
        "id": 105,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "제3정규형(3NF)은 기본키에 직접 종속되지 않고 다른 일반 컬럼을 거쳐 간접 종속되는 '이행적 함수 종속(X ➡️ Y, Y ➡️ Z)'을 제거하는 과정이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! (암기 팁: 원부이결다조 중 '이' = 이행적 함수 종속 제거!)"
    },
    {
        "id": 106,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "미들웨어 중 WAS(Web Application Server)는 정적 HTML 파일만을 전송하며 동적 비즈니스 로직 연산이나 DB 쿼리는 수행할 수 없다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 정적 HTML 처리는 웹 서버(Web Server: Apache/Nginx)의 주 역할이며, WAS(Tomcat/WebLogic 등)는 동적 비즈니스 로직과 DB 연동을 담당합니다."
    },
    {
        "id": 107,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "UI 설계 산출물 중 와이어프레임에 페이지 이동 흐름, 인터랙션 규칙, 예외 상황 처리 등을 상세히 기술한 화면 설계 문서는?",
        "answer": "스토리보드",
        "acceptedAnswers": [
            "스토리보드",
            "storyboard"
        ],
        "explanation": "정답은 '스토리보드(Storyboard)'입니다."
    },
    {
        "id": 108,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "자료사전(Data Dictionary)의 6대 표준 작성 기호 중 생략 가능한 '선택적 요소'를 표현할 때 사용하는 괄호 기호는?",
        "answer": "소괄호",
        "acceptedAnswers": [
            "소괄호",
            "()",
            "( )",
            "괄호",
            "선택"
        ],
        "explanation": "정답은 '( ) (소괄호)'입니다. (생략 가능한 데이터 항목 표현)"
    },
    {
        "id": 109,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "트랜잭션의 4대 특성(ACID) 중 트랜잭션이 성공적으로 완료(Commit)되면 시스템 장애가 발생하더라도 그 결과가 데이터베이스에 영구 보존되어야 한다는 특성은?",
        "answer": "영속성",
        "acceptedAnswers": [
            "영속성",
            "durability",
            "지속성"
        ],
        "explanation": "정답은 '영속성(Durability, 지속성)'입니다."
    },
    {
        "id": 110,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "데이터베이스 정규화(원부이결다조) 중 복합 기본키의 일부분에만 종속되는 '부분 함수 종속'을 제거하여 '완전 함수 종속'을 구축하는 정규형 단계는?",
        "answer": "제2정규형",
        "acceptedAnswers": [
            "제2정규형",
            "2nf",
            "2정규형",
            "제2정규화"
        ],
        "explanation": "정답은 '제2정규형(2NF)'입니다."
    },
    {
        "id": 111,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "보이스-코드 정규형(BCNF)은 테이블 내의 모든 결정자(Determinant)가 반드시 무엇이어야 한다는 제약 조건을 만족하는 정규형인가?",
        "answer": "후보키",
        "acceptedAnswers": [
            "후보키",
            "candidate key"
        ],
        "explanation": "정답은 '후보키(Candidate Key)'입니다. (모든 결정자가 후보키여야 함!)"
    },
    {
        "id": 112,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "분산 시스템 간에 비동기식 메시지 큐(Queue)를 전달하는 방식으로 이기종 시스템 간의 결합도를 낮추는 미들웨어의 영문 약어 3글자는?",
        "answer": "MOM",
        "acceptedAnswers": [
            "mom",
            "엠오엠"
        ],
        "explanation": "정답은 'MOM (Message Oriented Middleware)'입니다."
    },
    {
        "id": 113,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "소프트웨어 품질 특성 국제 표준(ISO/IEC 25010) 중 소프트웨어가 규정된 조건과 일정 시간 동안 오류 없이 일관되게 동작하는 성능 능력을 뜻하는 특성은?",
        "answer": "신뢰성",
        "acceptedAnswers": [
            "신뢰성",
            "reliability"
        ],
        "explanation": "정답은 '신뢰성(Reliability)'입니다."
    },
    {
        "id": 114,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "GoF 디자인 패턴 중 '싱글톤(Singleton)' 패턴은 시스템 내에서 특정 클래스의 인스턴스를 오직 단 하나만 생성하여 어디서든 접근하도록 보장하는 생성 패턴이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! DB 연결 풀(Connection Pool)이나 설정 관리자 등에 주로 활용됩니다."
    },
    {
        "id": 115,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "공통 결합도(Common Coupling)는 여러 모듈이 시스템의 전역 변수(Global Variable)나 공유 메모리를 함께 참조하고 갱신할 때 발생하는 결합도이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 내용 결합도 다음으로 결합도가 강하여 부작용(Side Effect)을 일으키기 쉽습니다."
    },
    {
        "id": 116,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "순차적 응집도(Sequential Cohesion)는 한 모듈 내부에서 특정 작업의 출력 데이터가 바로 다음 작업의 입력 데이터로 순차 전달되는 응집도이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 기능적 응집도 다음으로 높은 우수한 응집도입니다."
    },
    {
        "id": 117,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "소프트웨어 역공학(Reverse Engineering)은 이미 개발 완료된 실행 파일이나 시스템을 거꾸로 분석하여 설계 명세서와 소스코드를 추출·복원하는 기술이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 유지보수 및 레거시 시스템 분석에 활용됩니다."
    },
    {
        "id": 118,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "시맨틱 버저닝(Semantic Versioning) `v1.2.4`에서 맨 마지막 자리 숫자 '4'는 새로운 기능이 대규모로 추가되었을 때 올리는 버전 번호이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 마지막 자리는 버그 수정이나 사소한 패치를 뜻하는 '패치(Patch)' 버전입니다. 새로운 기능 추가는 중간 자리인 '마이너(Minor)' 버전입니다."
    },
    {
        "id": 119,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "대칭키(비밀키) 암호화 알고리즘은 데이터를 암호화할 때 사용하는 키와 이를 원래대로 복호화할 때 사용하는 키가 서로 완전히 다르다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 암호화 키와 복호화 키가 '동일한' 것이 대칭키(비밀키) 방식입니다. 서로 다른 키를 쓰는 것은 '비대칭키(공개키)' 방식입니다."
    },
    {
        "id": 120,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "형상 관리 4대 활동 '형상 식별 ➡️ 형상 [ ? ] ➡️ 형상 감사 ➡️ 형상 기록' 중 변경 요구를 접수하여 베이스라인 반영 여부를 심의·결정하는 활동은?",
        "answer": "통제",
        "acceptedAnswers": [
            "통제",
            "형상 통제",
            "형상통제",
            "control"
        ],
        "explanation": "정답은 '통제 (형상 통제)'입니다."
    },
    {
        "id": 121,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "서로 호환되지 않는 기존 클래스의 인터페이스를 클라이언트가 요구하는 다른 규격의 인터페이스로 변환해주는 GoF 구조 디자인 패턴은?",
        "answer": "어댑터",
        "acceptedAnswers": [
            "어댑터",
            "adapter",
            "어댑터 패턴",
            "adapter pattern"
        ],
        "explanation": "정답은 '어댑터(Adapter) 패턴'입니다."
    },
    {
        "id": 122,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "한 객체의 상태 변화가 일어났을 때 그 객체에 의존하는 다른 객체들에게 변화를 자동으로 통지하고 갱신하는 GoF 행위 디자인 패턴은?",
        "answer": "옵서버",
        "acceptedAnswers": [
            "옵서버",
            "observer",
            "옵저버",
            "옵서버 패턴"
        ],
        "explanation": "정답은 '옵서버(Observer) 패턴'입니다."
    },
    {
        "id": 123,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "6대 결합도 순서 '자-스-제-외-공-내' 중 어떤 모듈이 외부의 다른 모듈에서 정의한 통신 프로토콜이나 데이터 포맷을 공유할 때 발생하는 결합도는?",
        "answer": "외부 결합도",
        "acceptedAnswers": [
            "외부 결합도",
            "외부결합도",
            "외부",
            "external coupling"
        ],
        "explanation": "정답은 '외부 결합도(External Coupling)'입니다."
    },
    {
        "id": 124,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "7대 응집도 순서(기순교절시논우) 중 동일한 입력 데이터를 활용하여 서로 다른 여러 연산 기능을 수행하는 응집도는 '교환적([ ? ]적) 응집도'이다.",
        "answer": "통신",
        "acceptedAnswers": [
            "통신",
            "통신적",
            "통신적 응집도",
            "교환적"
        ],
        "explanation": "정답은 '통신 (통신적/교환적 응집도)'입니다."
    },
    {
        "id": 125,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "미국 표준 블록 대칭키 암호화 알고리즘으로, 취약해진 DES를 대체하여 128, 192, 256비트 키를 지원하는 현대의 표준 블록 암호는?",
        "answer": "AES",
        "acceptedAnswers": [
            "aes",
            "에이이에스"
        ],
        "explanation": "정답은 'AES (Advanced Encryption Standard)'입니다."
    },
    {
        "id": 126,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "조건 커버리지(Condition Coverage)는 복합 if문 내에 포함된 '개별 세부 조건식 각각'이 참(True)과 거짓(False)을 최소 한 번씩 갖도록 설계하는 커버리지이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 전체 조건식 결과와 상관없이 개별 조건식의 참/거짓을 검증합니다."
    },
    {
        "id": 127,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "부하 테스트(Load Test)는 시스템이 견딜 수 있는 임계치를 초과하여 서버가 완전히 다운될 때까지 극한의 부하를 밀어붙이는 테스트이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 극한의 과부하로 붕괴점을 찾는 것은 '강도/스트레스 테스트(Stress Test)'입니다. 부하 테스트는 평상시 예상되는 정상 부하 하에서의 성능 반응을 측정합니다."
    },
    {
        "id": 128,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "샘플링 오라클(Sampling Oracle)은 모든 가능한 입력 경우의 수 대신 특정한 몇몇 대표 입력값들에 대해서만 기대 결과를 사전 정의하여 비교하는 오라클이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 전수 검사가 불가능할 때 대표 샘플값을 검증합니다."
    },
    {
        "id": 129,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "소프트웨어 결함 관리 생명주기에서 결함이 수정 완료(Fixed)되면 추가 검증 없이 즉시 영구 종료(Closed) 처리하는 것이 표준 절차이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 수정된 결함은 반드시 테스터가 '재검증(Verified)'하여 실제로 정상 동작하는지 확인한 후에 '종료(Closed)' 처리해야 합니다."
    },
    {
        "id": 130,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "워크스루(Walkthrough)는 주재자(Moderator)가 회의를 진행하고 사전 체크리스트에 따라 결함을 찾는 가장 엄격하고 공식적인 검토 기법이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 주재자와 공식 체크리스트를 갖춘 가장 형식적인 회의 기법은 '인스펙션(Inspection)'입니다. 워크스루는 저작자가 비공식적으로 주도합니다."
    },
    {
        "id": 131,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "테스트 하네스(Test Harness)란 테스트를 정상 수행하기 위해 개발자가 작성하는 드라이버, 스텁, 테스트 슈트, 목(Mock) 등의 테스트 지원 소프트웨어 환경을 통칭한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 테스트 자동화와 실행을 위한 보조 프레임워크 환경입니다."
    },
    {
        "id": 132,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "모든 개별 조건식이 다른 조건식에 무관하게 전체 조건문 결과에 독립적으로 영향을 미치는지 검증하는 최고 수준의 정밀 커버리지(항공/국방 표준)는?",
        "answer": "MC/DC",
        "acceptedAnswers": [
            "mc/dc",
            "mcdc",
            "변형조건/결정커버리지",
            "변형 조건 결정 커버리지"
        ],
        "explanation": "정답은 'MC/DC (Modified Condition/Decision Coverage)'입니다."
    },
    {
        "id": 133,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 오라클 4종(참, 샘플링, 휴리스틱, 일관성) 중 특정 수치 공식이 없을 때 전문가의 직관과 경험 법칙을 활용해 결과를 추정하는 오라클은?",
        "answer": "휴리스틱 오라클",
        "acceptedAnswers": [
            "휴리스틱 오라클",
            "휴리스틱",
            "heuristic oracle",
            "heuristic"
        ],
        "explanation": "정답은 '휴리스틱 오라클(Heuristic Oracle)'입니다."
    },
    {
        "id": 134,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "결함 관리 시스템에서 수정 완료 후 종료(Closed)되었던 결함이 동일 환경에서 재발했을 때 부여하는 결함 상태 명칭은?",
        "answer": "재발생",
        "acceptedAnswers": [
            "재발생",
            "reopened",
            "reopen",
            "재오픈"
        ],
        "explanation": "정답은 '재발생 (Reopened)'입니다."
    },
    {
        "id": 135,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 수행 시 실제 모듈을 호출하지 않고 미리 정의된 동작과 기대 결과를 반환하도록 흉내 내는 '가짜 객체'의 영문 명칭은?",
        "answer": "목",
        "acceptedAnswers": [
            "목",
            "mock",
            "목 객체",
            "mock object"
        ],
        "explanation": "정답은 '목(Mock / Mock Object)'입니다."
    },
    {
        "id": 136,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 프로세스 5단계(계-설-수-평-리) 중 테스트 케이스와 테스트 시나리오를 설계하고 작성하는 2번째 단계는?",
        "answer": "설계",
        "acceptedAnswers": [
            "설계",
            "테스트 설계",
            "테스트설계",
            "design"
        ],
        "explanation": "정답은 '설계(Design)' 단계입니다. (계획 ➡️ 설계 ➡️ 작성 ➡️ 수행 ➡️ 평가 및 리포팅)"
    },
    {
        "id": 137,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "단시간에 시스템에 순간적인 대량의 트래픽 폭증을 유발하여 시스템의 급격한 부하 견딤성과 회복 능력을 점검하는 테스트 유형은?",
        "answer": "스파이크 테스트",
        "acceptedAnswers": [
            "스파이크 테스트",
            "스파이크테스트",
            "스파이크",
            "spike test",
            "spike"
        ],
        "explanation": "정답은 '스파이크 테스트(Spike Test)'입니다."
    },
    {
        "id": 138,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "공개키(비대칭키) 암호화 기법은 누구나 볼 수 있는 공개키로 암호화하고, 오직 수신자의 개인키(비밀키)로만 복호화할 수 있어 안전한 키 전달을 가능하게 한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 대칭키의 키 배송(Key Exchange) 난제를 완벽히 해결합니다."
    },
    {
        "id": 139,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "버퍼 오버플로우(Buffer Overflow) 공격은 프로세스의 메모리 버퍼 용량을 초과하는 데이터를 주입하여 스택의 함수 복귀 주소(RET)를 공격자 코드로 덮어쓰는 공격이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! C/C++ 시스템 프로그래밍의 고전적이고 치명적인 취약점입니다."
    },
    {
        "id": 140,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "C언어에서 버퍼 오버플로우 취약점을 방지하기 위해 입력 문자열 길이를 검사하지 않는 `strcpy()`, `gets()` 함수를 우선적으로 사용해야 한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! `strcpy()`, `gets()`, `sprintf()` 등은 길이 미검사 함수로 사용이 금지되며, 반드시 길이가 제한되는 `strncpy()`, `fgets()`, `snprintf()` 등을 사용해야 합니다."
    },
    {
        "id": 141,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "세션 하이재킹(Session Hijacking)은 공격자가 피해자의 정상적인 활성 세션 ID를 가로채어 로그인 인증 절차 없이 피해자의 권한으로 서버에 침투하는 공격이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 패킷 스니핑이나 XSS 취약점을 통해 세션을 가로챕니다."
    },
    {
        "id": 142,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "JDBC 프로그램에서 `Connection`, `PreparedStatement`, `ResultSet` 객체는 자바 가비지 컬렉터가 알아서 해제해주므로 `close()`를 명시적으로 호출할 필요가 없다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! DB 연결 객체는 시스템 자원(소켓/핸들)을 직접 점유하므로 반드시 명시적으로 `close()`를 호출하거나 `try-with-resources` 문을 써서 즉시 반환해야 DB 커넥션 풀 고갈을 막을 수 있습니다."
    },
    {
        "id": 143,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "무차별 대입 공격(Brute Force)을 방어하기 위한 대책으로, 로그인 실패 횟수가 5회를 초과하면 계정을 일시 잠금(Lockout)하거나 CAPTCHA 인증을 적용한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 자동화된 반복 로그인 시도를 무력화합니다."
    },
    {
        "id": 144,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "매우 큰 두 개의 소수를 곱했을 때 소인수분해하기가 극도로 어렵다는 수학적 난이도에 기반한 대표적 공개키(비대칭키) 암호 알고리즘은?",
        "answer": "RSA",
        "acceptedAnswers": [
            "rsa",
            "알에스에이"
        ],
        "explanation": "정답은 'RSA'입니다. (Rivest, Shamir, Adleman의 앞 글자)"
    },
    {
        "id": 145,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "미국 국가안보국(NSA)이 개발한 대표적인 안전한 단방향 해시 알고리즘으로, 출력 해시값의 길이가 256비트인 표준 알고리즘은?",
        "answer": "SHA-256",
        "acceptedAnswers": [
            "sha-256",
            "sha256",
            "샤256"
        ],
        "explanation": "정답은 'SHA-256'입니다."
    },
    {
        "id": 146,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "공격자가 웹 입력값에 개행 문자(`\\r\\n`)를 삽입하여 시스템 관리자 로그에 가짜 로그 라인을 위조 삽입하는 보안 약점은 '로그 [ ? ]'이다.",
        "answer": "포징",
        "acceptedAnswers": [
            "포징",
            "위조",
            "forging",
            "log forging",
            "로그 포징",
            "로그위조"
        ],
        "explanation": "정답은 '로그 포징(Log Forging, 로그 위조)'입니다."
    },
    {
        "id": 147,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "주민등록번호나 계좌번호 등 개인정보를 웹 화면에 출력할 때 일부 자리를 `*` 기호로 치환하여 가리는 개인정보 보호 조치는?",
        "answer": "마스킹",
        "acceptedAnswers": [
            "마스킹",
            "masking"
        ],
        "explanation": "정답은 '마스킹(Masking)'입니다."
    },
    {
        "id": 148,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "소프트웨어 보안 취약점을 탐지하기 위해 프로그램에 예상치 못한 무작위 유효하지 않은 비정상 데이터를 대량 주입하여 충돌을 유발해보는 동적 보안 테스트 기법은?",
        "answer": "퍼징",
        "acceptedAnswers": [
            "퍼징",
            "fuzzing",
            "퍼즈 테스트",
            "fuzz testing"
        ],
        "explanation": "정답은 '퍼징(Fuzzing, 퍼즈 테스팅)'입니다."
    },
    {
        "id": 149,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "공격자가 특정 세션 ID를 희생자의 브라우저에 미리 강제 고정시켜 놓고, 희생자가 로그인한 후 해당 고정된 세션 ID로 인증을 가로채는 공격은 '세션 [ ? ]'이다.",
        "answer": "고정",
        "acceptedAnswers": [
            "고정",
            "세션 고정",
            "세션고정",
            "session fixation",
            "fixation"
        ],
        "explanation": "정답은 '세션 고정(Session Fixation)'입니다."
    },
    {
        "id": 150,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "웹 브라우저와 웹 서버 간의 안전한 종단 간 암호화(HTTPS) 통신을 제공하며, SSL의 후속 표준으로 제정된 전송 계층 보안 프로토콜의 영문 약어 3글자는?",
        "answer": "TLS",
        "acceptedAnswers": [
            "tls",
            "티엘에스",
            "ssl"
        ],
        "explanation": "정답은 'TLS (Transport Layer Security)'입니다."
    },
    {
        "id": 151,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "소프트웨어 아키텍처 4+1 뷰 중 '유스케이스 뷰(Use Case View)'는 시스템의 요구사항을 나타내며 다른 4가지 뷰를 검증하고 통합하는 중심 역할을 한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 유스케이스 뷰(Use Case View)는 4+1 뷰 모델에서 중앙에 위치하여 논리, 구현, 프로세스, 배포 뷰를 조율하고 검증합니다."
    },
    {
        "id": 152,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "UML 구조(정적) 다이어그램에는 클래스 다이어그램, 객체 다이어그램, 컴포넌트 다이어그램, 배치 다이어그램 등이 속한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 시스템의 정적 구조를 나타내는 다이어그램들입니다."
    },
    {
        "id": 153,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "UML 행위(동적) 다이어그램인 시퀀스 다이어그램(Sequence Diagram)은 객체 간에 주고받는 메시지의 시간적 순서(시간 흐름)를 수직 축으로 표현한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 객체 간의 동적 상호작용을 시간 흐름에 따라 위에서 아래로 메시지를 교환하는 형태로 나타냅니다."
    },
    {
        "id": 154,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "럼바우(Rumbaugh) 객체지향 분석 기법의 3대 모델링 순서는 '객체 모델링 ➡️ 동적 모델링 ➡️ 기능 모델링(객동기)' 순이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! (암기 팁: 객-동-기)"
    },
    {
        "id": 155,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "CASE(Computer-Aided Software Engineering) 도구는 소프트웨어 개발 전 과정의 작업을 컴퓨터를 통해 자동화하여 품질과 생산성을 향상시키는 도구이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 다이어그램 작성, 코드 생성, 문서화 등을 지원합니다."
    },
    {
        "id": 156,
        "category": "1. 요구사항 확인",
        "type": "OX",
        "question": "개념적 설계 단계에서는 트랜잭션의 상세 인터페이스를 설계하고 데이터베이스 저장 레코드의 구체적인 물리 배치를 결정한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 물리적 저장 레코드와 인덱스 배치는 '물리적 설계' 단계이며, 개념적 설계 단계에서는 DBMS에 독립적인 개념 스키마(E-R 다이어그램)를 설계합니다."
    },
    {
        "id": 157,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "UML 관계(Relationship) 중 한 클래스가 다른 클래스의 객체를 메서드의 파라미터로 일시적으로 참조하여 사용하는 'use-a' 관계는?",
        "answer": "의존 관계",
        "acceptedAnswers": [
            "의존 관계",
            "의존관계",
            "의존",
            "dependency"
        ],
        "explanation": "정답은 '의존 관계(Dependency)'입니다. (점선 화살표 표기)"
    },
    {
        "id": 158,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "데이터베이스 설계 3단계 '개념적 설계 ➡️ [ ? ]적 설계 ➡️ 물리적 설계' 중 목표 DBMS에 맞는 테이블 스키마와 정규화를 수행하는 2번째 단계는?",
        "answer": "논리",
        "acceptedAnswers": [
            "논리",
            "논리적",
            "논리적 설계",
            "논리적설계",
            "logical"
        ],
        "explanation": "정답은 '논리 (논리적 설계)'입니다."
    },
    {
        "id": 159,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "E-R 다이어그램의 피터 첸(Peter Chen) 표기법에서 직사각형(Rectangle) 기호가 나타내는 모델링 요소는?",
        "answer": "개체",
        "acceptedAnswers": [
            "개체",
            "엔티티",
            "엔터티",
            "entity"
        ],
        "explanation": "정답은 '개체 (엔티티 / Entity)'입니다."
    },
    {
        "id": 160,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "E-R 다이어그램의 피터 첸 표기법에서 마름모(Diamond) 기호가 나타내는 모델링 요소는?",
        "answer": "관계",
        "acceptedAnswers": [
            "관계",
            "릴레이션십",
            "relationship"
        ],
        "explanation": "정답은 '관계 (Relationship)'입니다."
    },
    {
        "id": 161,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "럼바우 객체지향 분석 모델링 3단계(객동기) 중 상태 다이어그램(State Diagram)을 활용하여 객체의 동적 상태 변화를 표현하는 모델링은?",
        "answer": "동적 모델링",
        "acceptedAnswers": [
            "동적 모델링",
            "동적모델링",
            "동적",
            "dynamic modeling"
        ],
        "explanation": "정답은 '동적 모델링(Dynamic Modeling)'입니다."
    },
    {
        "id": 162,
        "category": "1. 요구사항 확인",
        "type": "BLANK",
        "question": "대화형 소프트웨어에서 비즈니스 로직 및 데이터(M), 사용자 인터페이스 화면(V), 둘 사이를 연결하는 흐름 제어(C)를 분리하는 유명 아키텍처 패턴의 약어는?",
        "answer": "MVC",
        "acceptedAnswers": [
            "mvc",
            "mvc 패턴"
        ],
        "explanation": "정답은 'MVC (Model-View-Controller) 패턴'입니다."
    },
    {
        "id": 163,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "객체지향 설계 5대 원칙(SOLID) 중 단일 책임 원칙(SRP)은 하나의 클래스는 오직 하나의 변경 이유(책임)만을 가져야 함을 의미한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 클래스의 응집도를 극대화하는 원칙입니다."
    },
    {
        "id": 164,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "SOLID 원칙 중 개방-폐쇄 원칙(OCP)은 기존 소스코드는 새로운 수정에 항상 열려(Open) 있어야 하고, 확장은 닫혀(Closed) 있어야 함을 뜻한다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 정반대입니다! OCP는 '확장에는 열려 있고(Open), 기존 코드의 수정에는 닫혀 있어야(Closed)' 한다는 원칙입니다."
    },
    {
        "id": 165,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "리스코프 치환 원칙(LSP)은 하위 자식 클래스는 상위 부모 클래스가 들어갈 수 있는 모든 위치에서 부모를 대체할 수 있어야 함을 의미한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 자식 클래스는 부모의 규약(계약)을 위반하지 않아야 합니다."
    },
    {
        "id": 166,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "GoF 디자인 패턴 중 '팩토리 메서드(Factory Method)' 패턴은 객체 생성을 위한 인터페이스를 정의하되, 실제 어떤 클래스의 인스턴스를 생성할지는 서브 클래스가 결정하도록 위임하는 생성 패턴이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 객체 생성과 사용을 느슨하게 결합합니다."
    },
    {
        "id": 167,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "퍼사드(Facade) 패턴은 복잡한 서브시스템들의 여러 인터페이스를 하나로 묶어 클라이언트가 쓰기 편한 단순화된 고수준 단일 창구를 제공하는 구조 패턴이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 클라이언트와 서브시스템 간의 복잡한 의존성을 대폭 낮춥니다."
    },
    {
        "id": 168,
        "category": "2. 제품소프트웨어 패키징",
        "type": "OX",
        "question": "빌더(Builder) 패턴은 복잡한 객체의 생성 과정과 표현 방식을 분리하여 동일한 생성 절차에서 서로 다른 속성을 지닌 객체를 조립해낼 수 있게 해주는 패턴이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 매개변수가 많은 객체를 단계별로 안전하게 생성할 수 있습니다."
    },
    {
        "id": 169,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "객체지향 설계 5대 원칙(SOLID) 중 자신이 사용하지 않는 메서드에 의존하지 않도록 인터페이스를 작고 구체적으로 분리해야 한다는 원칙은 '인터페이스 [ ? ] 원칙'이다.",
        "answer": "분리",
        "acceptedAnswers": [
            "분리",
            "인터페이스 분리 원칙",
            "인터페이스분리",
            "isp"
        ],
        "explanation": "정답은 '분리 (ISP: Interface Segregation Principle)'입니다."
    },
    {
        "id": 170,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "객체지향 설계 5대 원칙(SOLID) 중 고수준 모듈이 저수준 모듈의 구체 구현에 직접 의존하지 않고 양쪽 모두 추상화(인터페이스)에 의존해야 한다는 원칙은 '의존성 [ ? ] 원칙'이다.",
        "answer": "역전",
        "acceptedAnswers": [
            "역전",
            "의존성 역전 원칙",
            "의존성역전",
            "dip"
        ],
        "explanation": "정답은 '역전 (DIP: Dependency Inversion Principle)'입니다."
    },
    {
        "id": 171,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "6대 결합도(자스제외공내) 중 모듈 간에 오직 단순 인수 파라미터 값(값 전달)만을 주고받는 가장 이상적이고 결합도가 낮은 첫 번째 결합도는?",
        "answer": "자료 결합도",
        "acceptedAnswers": [
            "자료 결합도",
            "자료결합도",
            "자료",
            "데이터 결합도",
            "data coupling"
        ],
        "explanation": "정답은 '자료 결합도(Data Coupling)'입니다. (가장 결합도가 약하고 우수함)"
    },
    {
        "id": 172,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "7대 응집도(기순교절시논우) 중 시스템 시작 시의 변수 초기화나 자원 할당 등 특정 시간대에 함께 실행되는 기능들이 모여 있는 응집도는?",
        "answer": "시간적 응집도",
        "acceptedAnswers": [
            "시간적 응집도",
            "시간적응집도",
            "시간적",
            "temporal cohesion"
        ],
        "explanation": "정답은 '시간적 응집도(Temporal Cohesion)'입니다."
    },
    {
        "id": 173,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "기존 객체의 소스코드를 수정하지 않고 동적으로 새로운 부가 기능을 덧붙여(포장하여) 확장할 수 있게 해주는 GoF 구조 디자인 패턴은?",
        "answer": "데코레이터",
        "acceptedAnswers": [
            "데코레이터",
            "decorator",
            "데코레이터 패턴"
        ],
        "explanation": "정답은 '데코레이터(Decorator) 패턴'입니다."
    },
    {
        "id": 174,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "동일 계열의 여러 알고리즘을 각각 개별 클래스로 캡슐화하여 클라이언트가 실행 중에 동적으로 알고리즘을 바꿔 쓸 수 있도록 해주는 GoF 행위 디자인 패턴은?",
        "answer": "전략 패턴",
        "acceptedAnswers": [
            "전략 패턴",
            "전략패턴",
            "스트래티지",
            "strategy",
            "전략"
        ],
        "explanation": "정답은 '전략 패턴 (스트래티지 / Strategy)'입니다."
    },
    {
        "id": 175,
        "category": "2. 제품소프트웨어 패키징",
        "type": "BLANK",
        "question": "개발자가 직접 객체의 생명주기를 new 연산자로 제어하지 않고, 스프링(Spring)과 같은 프레임워크 컨테이너가 객체의 제어권을 넘겨받아 주입해주는 개념의 약어는?",
        "answer": "IoC",
        "acceptedAnswers": [
            "ioc",
            "제어의 역전",
            "제어의역전",
            "inversion of control"
        ],
        "explanation": "정답은 'IoC (Inversion of Control, 제어의 역전)'입니다."
    },
    {
        "id": 176,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "소프트웨어 결함 집중(Defect Clustering) 원리에 따르면 파레토 법칙(80:20)처럼 소프트웨어의 대다수 결함은 특정 소수의 모듈에 집중되어 발생한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 결함이 발견된 모듈에서 다른 결함이 계속 발견될 가능성이 매우 높습니다."
    },
    {
        "id": 177,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "완벽한 테스팅(Exhaustive Testing)은 모든 소프트웨어 시스템에서 충분한 시간과 예산만 확보된다면 모든 입력 경우의 수를 100% 검증할 수 있는 현실적 목표이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 테스팅 기본 원리 2번에 따르면 무한한 입력과 경로가 존재하므로 완벽한 테스팅은 불가능하며, 위험도 분석을 기반으로 테스팅을 진행해야 합니다."
    },
    {
        "id": 178,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "테스트 주도 개발(TDD)은 실제 비즈니스 소스코드를 먼저 작성하여 기능을 완성한 후, 마지막 단계에서 단위 테스트 코드를 덧붙여 작성하는 기법이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! TDD는 실패하는 테스트 코드를 '먼저 작성(Red)'하고, 이를 통과하는 최소 코드를 작성(Green)한 후 리팩토링하는 기법입니다."
    },
    {
        "id": 179,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "뮤테이션 테스트(Mutation Testing)는 소스코드에 의도적으로 인위적인 결함(돌연변이)을 주입한 후 작성된 테스트 케이스가 이를 찾아내어 사멸시키는지 확인하는 기법이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 테스트 케이스의 유효성과 품질을 평가하기 위한 고급 기법입니다."
    },
    {
        "id": 180,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "소프트웨어 성능 테스트 측정 지표 중 '처리량(Throughput)'은 단위 시간당 시스템이 성공적으로 처리할 수 있는 총 트랜잭션의 작업량을 뜻한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! TPS(Transactions Per Second) 등으로 측정합니다."
    },
    {
        "id": 181,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "OX",
        "question": "성능 테스트 지표 중 '응답 시간(Response Time)'은 사용자가 요청을 서버로 전송한 시점부터 시스템이 처리하여 응답 결과를 출력하기 시작할 때까지의 경과 시간이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 사용자 체감 성능의 핵심 척도입니다."
    },
    {
        "id": 182,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 수행 관리에서 테스트 케이스가 아직 실행되지 않고 대기 중인 상태를 뜻하는 영문 용어는?",
        "answer": "Not Run",
        "acceptedAnswers": [
            "not run",
            "미수행",
            "notrun"
        ],
        "explanation": "정답은 'Not Run (미수행)'입니다."
    },
    {
        "id": 183,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 케이스의 실제 수행 결과가 사전에 정의된 기대 결과와 완벽히 일치하여 정상 통과되었음을 나타내는 상태 용어는?",
        "answer": "Pass",
        "acceptedAnswers": [
            "pass",
            "통과",
            "합격"
        ],
        "explanation": "정답은 'Pass (통과)'입니다."
    },
    {
        "id": 184,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 케이스의 실제 수행 결과가 기대 결과와 달라 오류나 결함이 검출되었음을 나타내는 상태 용어는?",
        "answer": "Fail",
        "acceptedAnswers": [
            "fail",
            "실패",
            "불합격"
        ],
        "explanation": "정답은 'Fail (실패)'입니다."
    },
    {
        "id": 185,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "소프트웨어 테스트 원리 중 '테스트는 시스템에 결함이 존재함을 보여줄 수는 있지만, 결함이 전혀 없음을 증명할 수는 없다'는 원리는 결함 [ ? ]의 원리이다.",
        "answer": "존재 증명",
        "acceptedAnswers": [
            "존재 증명",
            "존재증명",
            "결함 존재",
            "존재"
        ],
        "explanation": "정답은 '존재 증명 (결함 존재 증명)'의 원리입니다."
    },
    {
        "id": 186,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "자바(Java) 언어 진영에서 `@Test`, `@BeforeEach` 등 어노테이션을 기반으로 단위 테스트를 작성하고 자동 실행하는 대표적 표준 프레임워크는?",
        "answer": "JUnit",
        "acceptedAnswers": [
            "junit",
            "제이유닛"
        ],
        "explanation": "정답은 'JUnit(제이유닛)'입니다."
    },
    {
        "id": 187,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "웹 애플리케이션과 DB에 다수의 가상 사용자(Virtual User) 부하를 발생시켜 응답속도와 처리량을 측정하는 아파치(Apache)의 대표 오픈소스 성능 도구는?",
        "answer": "JMeter",
        "acceptedAnswers": [
            "jmeter",
            "제이미터"
        ],
        "explanation": "정답은 'JMeter(제이미터)'입니다."
    },
    {
        "id": 188,
        "category": "3. 애플리케이션 테스트 관리",
        "type": "BLANK",
        "question": "테스트 결함 보고서에서 발견된 결함이 시스템의 가동이나 비즈니스 핵심 업무에 미치는 치명적인 영향의 정도를 나타내는 척도는 결함 [ ? ]이다.",
        "answer": "심각도",
        "acceptedAnswers": [
            "심각도",
            "severity"
        ],
        "explanation": "정답은 '심각도(Severity)'입니다. (심각도와 긴급도)"
    },
    {
        "id": 189,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "전자서명(Digital Signature)은 송신자의 개인키(비밀키)로 서명 암호화하고, 수신자는 송신자의 공개키로 검증함으로써 위조 방지 및 부인 방지(Non-repudiation)를 제공한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 송신자가 서명한 사실을 나중에 부인할 수 없도록 보장합니다."
    },
    {
        "id": 190,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "소프트웨어에서 예측 가능한 취약한 의사난수 생성기(PRNG)를 사용하여 세션 키나 비밀번호 재설정 토큰을 발급하는 것은 치명적인 보안 약점이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 난수가 예측 가능하면 인증 토큰이 탈취되므로 `java.security.SecureRandom` 등 안전한 암호학적 난수 생성기를 사용해야 합니다."
    },
    {
        "id": 191,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "정적 애플리케이션 보안 테스팅(SAST)은 소스코드를 컴파일하거나 실행하지 않은 상태에서 소스코드의 문법과 구조를 분석하여 보안 취약점을 탐지한다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 개발 단계에서 빠르게 취약점을 점검하는 화이트박스 정적 분석 도구입니다."
    },
    {
        "id": 192,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "동적 애플리케이션 보안 테스팅(DAST)은 실행 중인 웹 서버에 실제 공격용 패킷을 주입하고 응답을 분석하여 취약점을 점검하는 블랙박스 진단 방식이다.",
        "answer": "O",
        "explanation": "정답은 ⭕ O입니다! 런타임 환경의 실제 보안 약점을 외부 시선에서 점검합니다."
    },
    {
        "id": 193,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "데이터베이스 접속 비밀번호나 API 인증키를 자바 소스코드 내에 문자열 상수로 직접 하드코딩(Hardcoding)해두는 것은 안전한 코딩 관례이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 하드코딩된 자격증명은 깃 저장소나 클래스 역컴파일 시 평문으로 노출되므로, 반드시 환경변수나 암호화된 외부 설정 파일로 분리해야 합니다."
    },
    {
        "id": 194,
        "category": "4. SW 개발 보안 구축",
        "type": "OX",
        "question": "제로 데이 공격(Zero-Day Attack)은 보안 취약점이 발견되고 제조사가 공식 보안 패치를 배포한 지 100일 이상 지난 후에 발생하는 구형 공격이다.",
        "answer": "X",
        "explanation": "정답은 ❌ X입니다! 제로 데이 공격은 보안 취약점이 발견된 직후, 공식 보안 패치가 미처 발표되기 전(공격 방어일수가 0일인 시점)에 기습적으로 감행하는 공격입니다."
    },
    {
        "id": 195,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "정보 보안에서 송신자가 메시지를 송신했거나 수신자가 수신한 사실을 사후에 거짓으로 부인할 수 없도록 증명하는 보안 원칙은?",
        "answer": "부인 방지",
        "acceptedAnswers": [
            "부인 방지",
            "부인방지",
            "non-repudiation"
        ],
        "explanation": "정답은 '부인 방지 (Non-repudiation)'입니다."
    },
    {
        "id": 196,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "임의의 길이의 데이터를 입력받아 고정된 길이의 해시값을 생성하며, 원래 입력값을 역산할 수 없는 수학적 암호 함수는 '[ ? ] 해시 함수'이다.",
        "answer": "단방향",
        "acceptedAnswers": [
            "단방향",
            "일방향",
            "one-way"
        ],
        "explanation": "정답은 '단방향 (일방향) 해시 함수'입니다."
    },
    {
        "id": 197,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "한국인터넷진흥원(KISA)이 국내 전자상거래와 개인정보 보호를 위해 개발한 대한민국 국가 표준 128비트 블록 대칭키 암호 알고리즘은?",
        "answer": "SEED",
        "acceptedAnswers": [
            "seed",
            "시드"
        ],
        "explanation": "정답은 'SEED(시드)'입니다."
    },
    {
        "id": 198,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "국가정보원과 산학연이 공동 개발하여 공공기관 및 전자정부 표준 블록 대칭키 암호화 알고리즘으로 널리 사용되는 알고리즘 명칭은?",
        "answer": "ARIA",
        "acceptedAnswers": [
            "aria",
            "아리아"
        ],
        "explanation": "정답은 'ARIA(아리아)'입니다."
    },
    {
        "id": 199,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "관리자나 개발자가 유지보수 및 긴급 복구를 위해 정상 인증 절차를 우회하여 시스템에 직접 접속할 수 있도록 고의로 숨겨둔 뒷문을 무엇이라 하는가?",
        "answer": "백도어",
        "acceptedAnswers": [
            "백도어",
            "트랩도어",
            "backdoor",
            "trapdoor"
        ],
        "explanation": "정답은 '백도어(Backdoor, 트랩도어)'입니다."
    },
    {
        "id": 200,
        "category": "4. SW 개발 보안 구축",
        "type": "BLANK",
        "question": "소프트웨어 보안 취약점 중 객체가 null인 상태에서 메서드를 호출할 때 발생하는 충돌(Null Pointer Exception)을 방지하기 위해 객체 사용 전 필수로 수행하는 검사는?",
        "answer": "Null 검사",
        "acceptedAnswers": [
            "null 검사",
            "null검사",
            "널 검사",
            "널검사",
            "null check"
        ],
        "explanation": "정답은 'Null 검사 (널 체크 / Null Check)'입니다."
    }
];

const WRITTEN_MOCK_EXAMS = {
    "exam-1": {
        id: "exam-1",
        title: "제1회 실전 모의고사 (기출 표준형)",
        badge: "기출 표준형 🎯",
        desc: "외부평가 지필시험 출제 1순위 핵심 개념과 단골 함정을 종합 점검하는 표준 실전 모의고사 (문항당 5점, 100점 만점)",
        questions: [
            // [1과목: 요구사항 확인] (1~5번)
            {
                id: 1,
                category: "1. 요구사항 확인",
                type: "CHOICE",
                question: "현재 운영 중인 시스템을 분석하여 신규 시스템의 요구사항을 도출하고자 한다. 다음 중 '현행 시스템 아키텍처 구성도'를 작성할 때 준수해야 할 원칙으로 가장 타당한 것은?",
                options: [
                    "개발자 코딩 편의를 위해 소스코드의 세부 모듈 및 최하위 레벨 단위로 작성한다.",
                    "시스템의 전체적인 동작 구조와 연계를 한눈에 조망할 수 있도록 상위 수준(High Level)에서 작성한다.",
                    "하드웨어 서버 장비의 랙(Rack) 및 전원 물리 배치도만을 한정하여 작성한다.",
                    "소프트웨어 개발과 테스트가 모두 완료된 이후 배포 검수용으로만 작성한다."
                ],
                answer: 1,
                explanation: "현행 시스템 아키텍처 구성도는 시스템의 전체 구조를 조망하여 기술 요소 간의 관계를 파악하는 것이 목적이므로, 세부 모듈이나 최하위 레벨이 아니라 **상위 수준(High Level)**에서 작성합니다."
            },
            {
                id: 2,
                category: "1. 요구사항 확인",
                type: "FILL",
                question: "[서술/나열형] 고객에게서 요구사항을 수집하고 명세하여 검토하는 '요구사항 개발 프로세스 4단계'를 순서대로 나열하여 쓰시오. (단, 쉼표 또는 화살표로 구분하여 작성)",
                answer: "도출, 분석, 명세, 확인",
                acceptedAnswers: ["도출, 분석, 명세, 확인", "도출,분석,명세,확인", "도출 분석 명세 확인", "도출->분석->명세->확인", "도출 ➡️ 분석 ➡️ 명세 ➡️ 확인", "도출, 분석, 명세, 검증", "도분명확"],
                explanation: "요구사항 개발 프로세스 4단계는 **도출(Elicitation) ➡️ 분석(Analysis) ➡️ 명세(Specification) ➡️ 확인(Validation)**입니다. (암기 팁: **도분명확**)"
            },
            {
                id: 3,
                category: "1. 요구사항 확인",
                type: "CHOICE",
                question: "요구사항 명세서 작성 시 '검색 버튼 클릭 시 결과 화면이 3초 이내에 출력되어야 한다'와 같이 객관적이고 수치화된 기준으로 작성하여 적합 여부를 시험/측정할 수 있도록 하는 좋은 요구사항의 품질 특성은?",
                options: [
                    "완전성 (Completeness)",
                    "일관성 (Consistency)",
                    "검증 가능성 (Verifiability)",
                    "추적성 (Traceability)"
                ],
                answer: 2,
                explanation: "'빠르게 출력'과 같은 주관적 표현 대신 '3초 이내'와 같이 시험이나 측정을 통해 요구사항 충족 여부를 객관적으로 입증할 수 있는 특성은 **검증 가능성(Verifiability)**입니다."
            },
            {
                id: 4,
                category: "1. 요구사항 확인",
                type: "SHORT",
                question: "[단답형] 사용자 인터페이스(UI) 설계 4대 원칙(직-유-효-유) 중 '사용자가 별도의 복잡한 조작 매뉴얼을 보지 않고도 버튼의 모양이나 배치만 보고 즉시 어떤 기능인지 쉽게 이해하고 조작할 수 있어야 한다'는 원칙의 명칭을 쓰시오.",
                answer: "직관성",
                acceptedAnswers: ["직관성", "intuitiveness"],
                explanation: "별도의 설명서 없이도 누구나 쉽게 이해하고 바로 사용할 수 있어야 한다는 원칙은 **직관성(Intuitiveness)**입니다. (UI 4대 원칙: **직관성, 유효성, 학습성, 유연성**)"
            },
            {
                id: 5,
                category: "1. 요구사항 확인",
                type: "CHOICE",
                question: "ISO/IEC 25010 소프트웨어 품질 특성 중 기능성(Functionality)의 하위 특성에 속하지 않는 것은?",
                options: [
                    "적절성 / 정합성 (Suitability)",
                    "정밀성 / 정확성 (Accuracy)",
                    "상호 운용성 (Interoperability)",
                    "시간 효율성 (Time Behavior)"
                ],
                answer: 3,
                explanation: "시간 효율성(Time Behavior)은 '효율성(Efficiency)' 품질 특성의 세부 항목입니다. 기능성의 세부 항목은 적절성, 정밀성(정확성), 상호 운용성, 보안성, 호환성입니다."
            },
            // [2과목: 제품소프트웨어 패키징] (6~10번)
            {
                id: 6,
                category: "2. 제품소프트웨어 패키징",
                type: "SHORT",
                question: "[단답형] 소프트웨어 형상 관리(SCM) 도구 중 중앙 서버에 의존하지 않고 각 개발자가 전체 저장소의 복제본(Clone)을 로컬에 보유하여 독립적으로 작업할 수 있는 '분산 저장소' 방식의 대표 도구 명칭을 쓰시오.",
                answer: "Git",
                acceptedAnswers: ["git", "깃", "bitkeeper"],
                explanation: "대표적인 분산 저장소 형상 관리 도구는 **Git** (또는 BitKeeper)입니다. CVS나 SVN은 중앙 집중식 저장소입니다."
            },
            {
                id: 7,
                category: "2. 제품소프트웨어 패키징",
                type: "FILL",
                question: "[서술/괄호형] 모듈 설계 시 소프트웨어의 독립성과 품질을 극대화하기 위한 원칙이다. 빈칸 (A)와 (B)에 들어갈 올바른 설계 방향(최소화/최대화 또는 낮게/높게)을 순서대로 쓰시오.\n\n▶ '모듈 간 상호 의존성을 나타내는 결합도(Coupling)는 [ (A) ]하고, 모듈 내부 요소들의 연관성을 나타내는 응집도(Cohesion)는 [ (B) ]해야 한다.'",
                answer: "최소화, 최대화",
                acceptedAnswers: ["최소화, 최대화", "최소화,최대화", "최소화 최대화", "최소, 최대", "최소,최대", "낮게, 높게", "낮게,높게"],
                explanation: "모듈화 설계의 대원칙은 **결합도는 최소화(낮을수록 우수)**하고, **응집도는 최대화(높을수록 우수)**하는 것입니다."
            },
            {
                id: 8,
                category: "2. 제품소프트웨어 패키징",
                type: "CHOICE",
                question: "디지털 콘텐츠의 지적 재산권을 보호하고 안전한 배포 및 무단 복제를 방지하기 위한 저작권 관리 도구(DRM)의 주요 구성요소에 해당하지 않는 것은?",
                options: [
                    "암호화 및 키 관리 (Key Management)",
                    "크랙 방지 (Tamper-proofing / Anti-crack)",
                    "사용자 인증 및 정책 관리 (Policy Management)",
                    "데이터베이스 비정규화 (De-normalization)"
                ],
                answer: 3,
                explanation: "데이터베이스 비정규화는 DB 조회 성능을 위한 데이터 모델링 기법입니다. 패키징 DRM의 8대 구성요소는 암호화, 키 관리, 암호화 파일 생성, 식별 기술, 저작권 표현, 정책 관리, 크랙 방지, 인증입니다."
            },
            {
                id: 9,
                category: "2. 제품소프트웨어 패키징",
                type: "CHOICE",
                question: "소프트웨어를 고객에게 제공하기 위해 제작하는 '배포용 미디어(CD, USB 등)'에 반드시 수록되어야 하는 6가지 기본 정보(버사설새오제)에 포함되지 않는 것은?",
                options: [
                    "소프트웨어 배포본의 버전 정보 및 H/W, S/W 사양 정보",
                    "설치 방법 가이드 및 새로 추가/변경된 기능 정보",
                    "제품 개발 담당자의 개인 전화번호 및 미디어 유통 제조사 정보",
                    "알려진 오류 및 대처 방법, 운영상 제약 사항"
                ],
                answer: 2,
                explanation: "배포용 미디어 필수 6대 항목은 **버전(버), 사양(사), 설치(설), 새로운기능(새), 오류(오), 제약(제)**입니다. 개발자 개인 연락처나 미디어 제조사 정보는 개인정보 및 보안상 포함되지 않습니다."
            },
            {
                id: 10,
                category: "2. 제품소프트웨어 패키징",
                type: "SHORT",
                question: "[단답형] 소프트웨어 패키징 작업의 1단계로, 개발자가 작성한 소스코드를 컴퓨터에서 실제 실행 가능한 실행 파일(바이너리)로 변환하는 작업을 무엇이라 하는지 영문 또는 한글로 쓰시오.",
                answer: "빌드",
                acceptedAnswers: ["빌드", "build"],
                explanation: "패키징 작업의 1단계는 소스코드를 실행 파일로 변환하는 **빌드(Build)** 단계입니다."
            },
            // [3과목: 애플리케이션 테스트 관리] (11~15번)
            {
                id: 11,
                category: "3. 애플리케이션 테스트 관리",
                type: "CHOICE",
                question: "소프트웨어 테스트 기법 중 '정적 테스트(Static Test)'와 '동적 테스트(Dynamic Test)'에 관한 설명으로 옳은 것은?",
                options: [
                    "정적 테스트는 소프트웨어를 실제로 실행 환경에서 구동시키며 반응 속도를 측정한다.",
                    "워크스루(Walkthrough), 인스펙션(Inspection), 코드 검사는 대표적인 동적 테스트 기법이다.",
                    "정적 테스트는 프로그램을 실행하지 않고 소스코드, 설계서 등의 산출물을 분석하여 결함을 발견한다.",
                    "화이트박스 테스트와 블랙박스 테스트는 프로그램을 실행하지 않는 정적 테스트로 분류된다."
                ],
                answer: 2,
                explanation: "정적 테스트는 **프로그램을 실행하지 않고** 소스 코드 문법, 표준 준수 여부, 제어 구조 등을 분석(인스펙션, 워크스루)합니다. 반면 동적 테스트는 프로그램을 **직접 실행**하여 결함을 찾습니다."
            },
            {
                id: 12,
                category: "3. 애플리케이션 테스트 관리",
                type: "SHORT",
                question: "[단답형] 화이트박스 테스트(White-box Test)의 코드 커버리지 기준 중 '프로그램 소스코드 내에 존재하는 모든 개별 실행 문장(Statement)이 최소한 한 번 이상 실행되도록 테스트 케이스를 설계하는 기준'의 명칭을 쓰시오.",
                answer: "구문 커버리지",
                acceptedAnswers: ["구문 커버리지", "구문커버리지", "문장 커버리지", "문장커버리지", "statement coverage", "구문"],
                explanation: "모든 실행 문장이 최소 1회 이상 실행되도록 검증하는 기준은 **구문 커버리지(Statement Coverage)** 또는 **문장 커버리지**라고 합니다."
            },
            {
                id: 13,
                category: "3. 애플리케이션 테스트 관리",
                type: "CHOICE",
                question: "입력값의 유효 구간과 무효 구간의 경계 부분에서 대부분의 소프트웨어 오류가 발생한다는 원리를 활용하여, 최솟값, 최대값 및 경계 바로 인접한 값(N-1, N, N+1)을 테스트 케이스로 선정하는 블랙박스 테스트 기법은?",
                options: [
                    "동치 분할 검사 (Equivalence Partitioning)",
                    "경계값 분석 (Boundary Value Analysis)",
                    "원인-효과 그래프 검사 (Cause-Effect Graphing)",
                    "오류 예측 검사 (Error Guessing)"
                ],
                answer: 1,
                explanation: "오류 발생 가능성이 가장 높은 입력 조건의 경계값 주변을 집중적으로 테스트하는 기법은 **경계값 분석(Boundary Value Analysis)**입니다."
            },
            {
                id: 14,
                category: "3. 애플리케이션 테스트 관리",
                type: "SHORT",
                question: "[단답형] 소프트웨어 테스트 실행 결과가 올바른지(참인지 거짓인지)를 판정하기 위해 사전에 정의된 참(True) 값(정답 기준)과 비교하는 기법을 '테스트 [ ? ]'이라 한다. 빈칸에 들어갈 용어를 쓰시오.",
                answer: "오라클",
                acceptedAnswers: ["오라클", "oracle", "test oracle", "테스트 오라클", "테스트오라클"],
                explanation: "테스트 수행 결과가 기대 결과와 일치하는지 정답 여부를 판별하기 위해 사전에 정의된 참(정답) 값과 비교하는 기법을 **테스트 오라클(Test Oracle)**이라고 합니다."
            },
            {
                id: 15,
                category: "3. 애플리케이션 테스트 관리",
                type: "CHOICE",
                question: "단위 테스트가 완료된 하위 모듈들을 조립하여 모듈 간 인터페이스를 검증하는 '상향식(Bottom-Up) 통합 테스트'를 수행할 때 필수적으로 요구되는 가상 상위 제어 모듈은?",
                options: [
                    "테스트 스텁 (Test Stub)",
                    "테스트 드라이버 (Test Driver)",
                    "테스트 슈트 (Test Suite)",
                    "테스트 베드 (Test Bed)"
                ],
                answer: 1,
                explanation: "하위 모듈에서 상위 모듈로 진행하는 **상향식(Bottom-Up) 통합에는 상위 제어 모듈 역할을 대신하는 '테스트 드라이버(Driver)'**가 필요합니다. 반대로 하향식(Top-Down) 통합에는 가상 하위 모듈인 '테스트 스텁(Stub)'이 필요합니다."
            },
            // [4과목: SW 개발 보안 구축] (16~20번)
            {
                id: 16,
                category: "4. SW 개발 보안 구축",
                type: "SHORT",
                question: "[단답형] 정보 보안의 3대 요소(기무가) 중 '인가된 정당한 사용자가 정보나 시스템을 필요로 할 때 지체 없이 정상적으로 접근하여 서비스를 이용할 수 있음을 보장하는 특성'의 명칭을 쓰시오.",
                answer: "가용성",
                acceptedAnswers: ["가용성", "availability"],
                explanation: "인가된 사용자가 필요 시 정보 자산에 언제든 접근 가능하도록 보장하는 특성은 **가용성(Availability)**입니다. (정보보안 3요소: **기무가** - 기밀성, 무결성, 가용성)"
            },
            {
                id: 17,
                category: "4. SW 개발 보안 구축",
                type: "CHOICE",
                question: "사용자 로그인 화면의 아이디 입력란에 '' OR '1'='1' --'와 같은 악의적인 문자열을 주입하여 인증을 우회하는 공격 기법과, 이를 방어하기 위한 가장 확실한 시큐어 코딩 방법은?",
                options: [
                    "XSS 공격 - JavaScript 특수문자 제거",
                    "SQL Injection 공격 - PreparedStatement 매개변수화 쿼리(? 바인딩) 사용",
                    "CSRF 공격 - 사용자 세션 타임아웃 30분 설정",
                    "디도스(DDoS) 공격 - 방화벽 IP 차단 룰 적용"
                ],
                answer: 1,
                explanation: "악의적인 SQL을 입력하여 DB를 비정상 조작하는 공격은 **SQL Injection**이며, 사용자 입력값을 문자열 결합하지 않고 `?` 플레이스홀더를 통해 리터럴 상수로 처리하는 **PreparedStatement** 사용이 가장 확실한 방어책입니다."
            },
            {
                id: 18,
                category: "4. SW 개발 보안 구축",
                type: "SHORT",
                question: "[단답형] 공격자가 웹 게시판이나 입력 폼에 악의적인 스크립트 코드(`<script>...</script>`)를 삽입하여 해당 글을 열람하는 다른 사용자의 세션 쿠키를 탈취하는 웹 취약점 공격의 영문 3글자 약칭을 대문자로 쓰시오.",
                answer: "XSS",
                acceptedAnswers: ["XSS", "xss", "크로스 사이트 스크립팅", "크로스사이트스크립팅"],
                explanation: "악의적인 스크립트를 삽입하여 희생자 브라우저에서 실행되도록 유도하는 공격은 **XSS (Cross-Site Scripting)**입니다."
            },
            {
                id: 19,
                category: "4. SW 개발 보안 구축",
                type: "CHOICE",
                question: "게시판의 첨부파일 업로드 기능을 악용하여 공격자가 웹셸(WebShell, .jsp / .php 등)을 서버에 업로드한 후 원격으로 서버 시스템 명령을 실행하는 취약점을 방어하기 위한 대책으로 옳지 않은 것은?",
                options: [
                    "업로드되는 파일의 확장자를 허용된 화이트리스트(예: .jpg, .pdf)로 엄격히 제한한다.",
                    "업로드된 파일의 저장 경로를 웹 루트(Web Root) 외부의 분리된 전용 디렉터리에 위치시킨다.",
                    "업로드된 파일에 대해 실행(Execute) 권한을 원천 제거하고 읽기 권한만 부여한다.",
                    "파일명 변조를 방지하기 위해 사용자가 올린 원본 파일명을 DB와 서버 디렉터리에 그대로 유지한다."
                ],
                answer: 3,
                explanation: "사용자가 올린 원본 파일명을 그대로 보관하면 경로 조작 및 실행 파일 직접 호출에 악용될 수 있습니다. 따라서 **업로드 시 서버에서 무작위 난수나 UUID로 파일명을 변경(암호화/난수화)**하여 저장해야 안전합니다."
            },
            {
                id: 20,
                category: "4. SW 개발 보안 구축",
                type: "FILL",
                question: "[서술/나열형] 보안 테스트에서 발견된 취약점 결함의 조치 우선순위를 결정하기 위해 심각도 등급을 산정할 때 고려하는 2가지 평가 기준의 명칭을 쓰시오. (단, 쉼표로 구분)",
                answer: "영향도, 긴급도",
                acceptedAnswers: ["영향도, 긴급도", "영향도,긴급도", "영향도 긴급도", "긴급도, 영향도", "긴급도,영향도", "긴급도 영향도"],
                explanation: "보안 결함의 등급은 해당 결함이 시스템과 비즈니스에 미치는 파급력인 **영향도(Impact)**와 얼마나 신속히 조치되어야 하는지의 시간적 시급성인 **긴급도(Urgency)** 2가지 기준으로 측정합니다."
            }
        ]
    },

    "exam-2": {
        id: "exam-2",
        title: "제2회 실전 모의고사 (응용 심화형)",
        badge: "응용 심화형 ⚡",
        desc: "실무 시나리오 분석, 결합도/응집도 실무 분석, V-모델 테스트, 시큐어 코딩 응용 문제 중심 (문항당 5점, 100점 만점)",
        questions: [
            // [1과목: 요구사항 확인] (1~5번)
            {
                id: 1,
                category: "1. 요구사항 확인",
                type: "CHOICE",
                question: "현행 시스템 파악의 1단계 활동인 '시스템 구성 및 제공 기능 파악'에 관한 설명으로 가장 적절한 것은?",
                options: [
                    "서버 CPU 코어 수와 네트워크 백본 스위치의 물리적 포트 구성을 파악한다.",
                    "기간 업무와 지원 업무를 구분하여 조직에서 제공하는 주요 기능과 서비스 흐름을 식별한다.",
                    "데이터베이스 내 정규화 수준 및 외래키 인덱스 B-Tree 구조를 분석한다.",
                    "개발자 소스코드 내 클래스 간의 상속 및 다형성 구현 여부를 감사한다."
                ],
                answer: 1,
                explanation: "현행 시스템 파악 1단계(겉모습)는 조직의 주요 업무(기간 업무 및 지원 업무)가 어떤 기능과 인터페이스로 구성되어 있는지 서비스 차원에서 식별하는 단계입니다."
            },
            {
                id: 2,
                category: "1. 요구사항 확인",
                type: "SHORT",
                question: "[단답형] 요구사항 개발 프로세스(도출 ➡️ 분석 ➡️ 명세 ➡️ 확인) 중 이해관계자들 간에 상호 충돌하거나 모순되는 요구사항을 식별하고 명확히 정리하여 협의하는 2번째 단계의 명칭을 쓰시오.",
                answer: "요구사항 분석",
                acceptedAnswers: ["분석", "요구사항 분석", "요구사항분석", "analysis"],
                explanation: "이해관계자의 상충되는 요구를 중재하고 모순을 해결하여 범위를 명확히 하는 단계는 **요구사항 분석(Analysis)**입니다."
            },
            {
                id: 3,
                category: "1. 요구사항 확인",
                type: "CHOICE",
                question: "좋은 요구사항의 9대 품질 특성 중 '요구사항과 관련된 설계 산출물, 소스코드, 테스트 케이스 간의 연결 고리가 명확하여 요구사항 변경 시 영향받는 산출물을 쉽게 찾아낼 수 있어야 한다'는 특성은?",
                options: [
                    "완전성 (Completeness)",
                    "일관성 (Consistency)",
                    "추적성 (Traceability)",
                    "특이성 (Uniqueness)"
                ],
                answer: 2,
                explanation: "요구사항 산출물 간의 연결 고리를 통해 전후 방향으로 연계 파악할 수 있는 특성은 **추적성(Traceability)**입니다. (완정명일특검수**추**이)"
            },
            {
                id: 4,
                category: "1. 요구사항 확인",
                type: "FILL",
                question: "[서술/괄호형] UI 설계 4대 원칙(직-유-효-유)에 대한 설명이다. 빈칸 (A)와 (B)에 들어갈 원칙을 쓰시오.\n\n▶ '사용자가 입력 중 실수를 하더라도 쉽게 이전 상태로 되돌릴 수 있어야 한다는 원칙은 [ (A) ]이고, 초보 사용자도 한 번 경험하면 다음에도 쉽게 기능을 익혀 사용할 수 있어야 한다는 원칙은 [ (B) ]이다.'",
                answer: "유연성, 학습성",
                acceptedAnswers: ["유연성, 학습성", "유연성,학습성", "유연성 학습성", "유연성,학습성", "유연성 and 학습성"],
                explanation: "오류 복구 및 사용자 실수 대처는 **유연성(Flexibility)**이며, 쉽게 익히고 숙달할 수 있음은 **학습성(Learnability)**입니다."
            },
            {
                id: 5,
                category: "1. 요구사항 확인",
                type: "SHORT",
                question: "[단답형] 요구사항 분석 모델 검증 3단계 중 사용자 관점에서 시스템 기능 시나리오가 올바르게 작성되었는지 검증하는 1단계 검증 모델의 명칭을 쓰시오.",
                answer: "유스케이스 모델 검증",
                acceptedAnswers: ["유스케이스", "유스케이스 모델", "유스케이스 모델 검증", "유스케이스모델검증", "유스케이스모델"],
                explanation: "분석 모델 검증 1단계는 사용자 관점의 시나리오를 검증하는 **유스케이스 모델 검증**입니다. (2단계: 개념 수준 분석 클래스 검증, 3단계: 상세 분석 클래스 검증)"
            },
            // [2과목: 제품소프트웨어 패키징] (6~10번)
            {
                id: 6,
                category: "2. 제품소프트웨어 패키징",
                type: "CHOICE",
                question: "소프트웨어 형상 관리(SCM) 도구인 'CVS / SVN'과 'Git'의 핵심적인 동작 방식 차이점에 대한 설명으로 옳지 않은 것은?",
                options: [
                    "CVS와 SVN은 중앙 저장소 서버에 장애가 발생하면 커밋 등의 주요 버전 관리 작업이 중단된다.",
                    "Git은 네트워크가 단절된 오프라인 환경에서도 로컬 저장소에 커밋(Commit) 작업을 계속 수행할 수 있다.",
                    "Git은 각 개발자의 로컬 PC에 전체 저장소 히스토리가 완전히 복제(Clone)된다.",
                    "SVN은 분산 저장소 방식이므로 중앙 서버 없이 개발자 간 P2P 형태로만 소스코드를 동기화한다."
                ],
                answer: 3,
                explanation: "SVN은 '중앙 집중식' 저장소이므로 반드시 중앙 서버가 필요합니다. 중앙 서버 없이 로컬 복제본으로 분산 작업 가능한 도구는 Git입니다."
            },
            {
                id: 7,
                category: "2. 제품소프트웨어 패키징",
                type: "SHORT",
                question: "[단답형] 모듈 간 결합도 6단계(자-스-제-외-공-내) 중 가장 결합도가 강하여 품질이 가장 나쁘며, 한 모듈이 다른 모듈의 내부 데이터나 소스코드를 직접 참조하거나 수정할 때 발생하는 결합도의 명칭을 쓰시오.",
                answer: "내용 결합도",
                acceptedAnswers: ["내용 결합도", "내용결합도", "content coupling", "내용"],
                explanation: "다른 모듈의 내부를 직접 침범하여 참조하는 가장 위험하고 나쁜 결합도는 **내용 결합도(Content Coupling)**입니다. (자-스-제-외-공-**내**)"
            },
            {
                id: 8,
                category: "2. 제품소프트웨어 패키징",
                type: "FILL",
                question: "[서술/괄호형] 모듈의 응집도 7단계(기-순-교-절-시-논-우)에 관한 설명이다. 빈칸 (A)와 (B)에 들어갈 응집도의 명칭을 쓰시오.\n\n▶ '모듈 내부의 모든 요소들이 단 하나의 완벽한 단일 기능만을 수행하는 가장 이상적인 응집도는 [ (A) ]이고, 서로 아무런 관련 없는 기능 요소들이 우연히 한 모듈에 모여 가장 품질이 낮은 응집도는 [ (B) ]이다.'",
                answer: "기능적 응집도, 우연적 응집도",
                acceptedAnswers: ["기능적 응집도, 우연적 응집도", "기능적, 우연적", "기능적응집도, 우연적응집도", "기능적,우연적", "기능적 응집도 우연적 응집도"],
                explanation: "가장 응집도가 높고 바람직한 것은 **기능적 응집도(Functional)**이며, 가장 낮고 불량한 것은 **우연적 응집도(Coincidental)**입니다."
            },
            {
                id: 9,
                category: "2. 제품소프트웨어 패키징",
                type: "CHOICE",
                question: "디지털 저작권 관리(DRM) 구성요소 중 사용자가 정당한 라이선스를 보유한 합법적 구매자인지 확인하는 SSO(통합 인증)나 디지털 서명 기술이 속하는 요소는?",
                options: [
                    "키 관리 (Key Management)",
                    "인증 (Authentication)",
                    "저작권 표현 (Relational Expression)",
                    "식별 기술 (Identification)"
                ],
                answer: 1,
                explanation: "SSO(Single Sign-On), 전자서명, PKI 등 사용자 자격을 검증하는 기술은 패키징 DRM의 **인증(Authentication)** 요소에 속합니다."
            },
            {
                id: 10,
                category: "2. 제품소프트웨어 패키징",
                type: "SHORT",
                question: "[단답형] 소프트웨어 패키징 후 고객에게 배포할 때 함께 전달하는 문서로, 이번 버전에서 수정된 버그 내역, 버그 재현 단계, 사용자 영향도, 면책 조항 등을 정리한 문서의 명칭을 쓰시오.",
                answer: "릴리즈 노트",
                acceptedAnswers: ["릴리즈 노트", "릴리즈노트", "release note", "release notes"],
                explanation: "버전 변경 이력과 패치 내역, 영향도를 고지하는 공식 문서는 **릴리즈 노트(Release Note)**입니다."
            },
            // [3과목: 애플리케이션 테스트 관리] (11~15번)
            {
                id: 11,
                category: "3. 애플리케이션 테스트 관리",
                type: "CHOICE",
                question: "소프트웨어 결함 분석 도구 중 소스코드를 직접 실행하지 않고 코딩 표준 위반, 잠재적 결함, 스타일 등을 검사하는 '정적 분석'에 대한 설명으로 옳은 것은?",
                options: [
                    "정적 분석 도구는 반드시 타깃 시스템에 프로그램을 설치하고 배포한 후에만 동작한다.",
                    "개발 초기 단계에서 소스코드의 결함을 조기에 발견하여 수정 비용을 크게 절감할 수 있다.",
                    "실행 중 발생하는 메모리 누수(Memory Leak)와 동적 할당 오류를 전문적으로 측정한다.",
                    "단위 테스트를 생략하고 바로 통합 테스트 단계로 건너뛰기 위해 수행한다."
                ],
                answer: 1,
                explanation: "정적 분석은 프로그램을 실행하기 전 소스코드 단계에서 결함과 보안 약점을 조기에 발견하므로, 개발 후반부 결함 수정에 따른 비용을 획기적으로 줄여줍니다."
            },
            {
                id: 12,
                category: "3. 애플리케이션 테스트 관리",
                type: "SHORT",
                question: "[단답형] 화이트박스 테스트의 제어 흐름 커버리지 중 프로그램 내에 존재하는 모든 조건문(if-else 등)의 참(True)과 거짓(False) 결과가 최소한 한 번씩은 모두 실행되도록 케이스를 작성하는 기준의 명칭을 쓰시오.",
                answer: "결정 커버리지",
                acceptedAnswers: ["결정 커버리지", "결정커버리지", "분기 커버리지", "분기커버리지", "decision coverage", "branch coverage"],
                explanation: "조건문 분기 전체의 참/거짓 경로를 모두 수행하는 기준은 **결정 커버리지(Decision Coverage)** 또는 **분기 커버리지(Branch Coverage)**입니다."
            },
            {
                id: 13,
                category: "3. 애플리케이션 테스트 관리",
                type: "CHOICE",
                question: "체계적인 소프트웨어 테스트를 위한 테스트 프로세스 5단계의 진행 순서가 올바르게 나열된 것은?",
                options: [
                    "테스트 계획 ➡️ 테스트 분석 및 설계 ➡️ 테스트 케이스 작성 ➡️ 테스트 수행 ➡️ 평가 및 리포팅",
                    "테스트 분석 ➡️ 테스트 계획 ➡️ 테스트 수행 ➡️ 테스트 케이스 작성 ➡️ 평가 및 리포팅",
                    "테스트 계획 ➡️ 테스트 수행 ➡️ 테스트 분석 ➡️ 테스트 케이스 작성 ➡️ 평가 및 리포팅",
                    "테스트 케이스 작성 ➡️ 테스트 계획 ➡️ 테스트 분석 ➡️ 테스트 수행 ➡️ 평가 및 리포팅"
                ],
                answer: 0,
                explanation: "테스트 프로세스는 **계획 ➡️ 설계(분석/디자인) ➡️ 작성(케이스/시나리오) ➡️ 수행 ➡️ 평가 및 리포팅** 5단계로 진행됩니다. (암기 팁: **계설수평리**)"
            },
            {
                id: 14,
                category: "3. 애플리케이션 테스트 관리",
                type: "SHORT",
                question: "[단답형] 시스템의 임계치를 초과하는 극한의 동시 접속자 수(Peak Load)나 과도한 데이터 전송량을 고의로 가하여 시스템이 다운되지 않고 정상 작동하거나 안전하게 복구되는지 검증하는 테스트 유형의 명칭을 쓰시오.",
                answer: "강도 테스트",
                acceptedAnswers: ["강도 테스트", "강도테스트", "스트레스 테스트", "스트레스테스트", "stress test"],
                explanation: "시스템 과부하 상태에서의 한계점을 시험하는 테스트는 **강도 테스트(Stress Test)**입니다."
            },
            {
                id: 15,
                category: "3. 애플리케이션 테스트 관리",
                type: "FILL",
                question: "[서술/괄호형] 모듈 간 인터페이스를 검증하는 통합 테스트에 대한 설명이다. 빈칸 (A)와 (B)에 들어갈 가상 모듈의 명칭을 순서대로 쓰시오.\n\n▶ '하위 모듈에서 상위 모듈로 진행하는 상향식 통합에서는 상위 제어 모듈 역할을 대신하는 [ (A) ]가 필요하고, 상위 모듈에서 하위 모듈로 진행하는 하향식 통합에서는 아직 개발되지 않은 하위 모듈을 대신하는 [ (B) ]가 필요하다.'",
                answer: "드라이버, 스텁",
                acceptedAnswers: ["드라이버, 스텁", "드라이버,스텁", "테스트 드라이버, 테스트 스텁", "테스트드라이버, 테스트스텁", "드라이버 스텁"],
                explanation: "상향식(Bottom-Up) 통합은 **테스트 드라이버(Driver)**, 하향식(Top-Down) 통합은 **테스트 스텁(Stub)**이 사용됩니다."
            },
            // [4과목: SW 개발 보안 구축] (16~20번)
            {
                id: 16,
                category: "4. SW 개발 보안 구축",
                type: "CHOICE",
                question: "정보 보안의 3대 요소(기무가) 중 '인가되지 않은 사용자나 외부 침입자에게 시스템 내부의 민감 정보나 개인정보가 노출되지 않도록 기밀을 보호하는 특성'은?",
                options: [
                    "기밀성 (Confidentiality)",
                    "무결성 (Integrity)",
                    "가용성 (Availability)",
                    "책임추적성 (Accountability)"
                ],
                answer: 0,
                explanation: "비인가자에게 정보가 노출되는 것을 방지하는 보안 요소는 **기밀성(Confidentiality)**입니다. (정보보안 3요소: **기무가** - 기밀성, 무결성, 가용성)"
            },
            {
                id: 17,
                category: "4. SW 개발 보안 구축",
                type: "SHORT",
                question: "[단답형] 웹 애플리케이션 입력창에 데이터베이스 쿼리를 조작하는 악의적 SQL 구문(예: ' OR 1=1 --)을 삽입하여 인증을 우회하고 DB를 무단 탈취하는 공격 기법의 명칭을 쓰시오.",
                answer: "SQL 삽입",
                acceptedAnswers: ["SQL 삽입", "SQL삽입", "sql injection", "sql인젝션", "sql 인젝션"],
                explanation: "악의적인 SQL을 입력값으로 전달하여 DB를 비정상 조작하는 공격은 **SQL 삽입 (SQL Injection)**입니다."
            },
            {
                id: 18,
                category: "4. SW 개발 보안 구축",
                type: "CHOICE",
                question: "웹 애플리케이션에서 크로스 사이트 스크립팅(XSS) 공격을 원천적으로 방어하기 위해 적용해야 하는 가장 적절한 시큐어 코딩 기법은?",
                options: [
                    "DB 테이블 생성 시 모든 컬럼에 Primary Key를 지정한다.",
                    "사용자가 입력한 문자열 중 HTML 특수문자(<, >, &, \" 등)를 안전한 HTML 엔티티(&lt;, &gt; 등)로 치환한다.",
                    "사용자 비밀번호를 대칭키 암호화(AES-128)로만 저장한다.",
                    "웹 서버의 모든 방화벽 포트를 닫고 HTTP 통신만 유지한다."
                ],
                answer: 1,
                explanation: "XSS 공격은 공격자의 악의적 `<script>` 태그가 브라우저에서 실행되어 발생하므로, `<`와 `>` 등의 특수문자를 `&lt;`, `&gt;`로 치환(HTML 필터링)하는 것이 핵심 방어책입니다."
            },
            {
                id: 19,
                category: "4. SW 개발 보안 구축",
                type: "SHORT",
                question: "[단답형] 이미 로그인되어 인증 세션을 보유하고 있는 정상적인 사용자의 권한을 도용하여, 희생자가 의도하지 않은 악의적 요청(예: 비밀번호 변경, 계좌 송금)을 웹 서버로 위조 전송하게 만드는 공격의 영문 4글자 약칭을 쓰시오.",
                answer: "CSRF",
                acceptedAnswers: ["CSRF", "csrf", "크로스 사이트 요청 위조", "사이트 간 요청 위조"],
                explanation: "사용자의 브라우저 신뢰를 악용하여 위조된 요청을 전송시키는 공격은 **CSRF (Cross-Site Request Forgery)**입니다."
            },
            {
                id: 20,
                category: "4. SW 개발 보안 구축",
                type: "FILL",
                question: "[서술/나열형] 보안 요구 공학(Security Requirements Engineering)의 2가지 주요 핵심 분류 영역의 명칭을 쓰시오. (단, 쉼표로 구분)",
                answer: "보안 개발, 보안 관리",
                acceptedAnswers: ["보안 개발, 보안 관리", "보안 개발,보안 관리", "보안개발, 보안관리", "보안개발,보안관리", "보안 개발 보안 관리"],
                explanation: "보안 요구 공학은 개발 단계의 보안을 다루는 **보안 개발**과 운영 및 유지보수 단계의 통제를 다루는 **보안 관리** 2가지로 나뉩니다."
            }
        ]
    },

    "exam-3": {
        id: "exam-3",
        title: "제3회 실전 모의고사 (최종 마무리형)",
        badge: "최종 마무리형 🏆",
        desc: "시험 직전 총정리! 출제위원 킬러 문항, 세부 패키징 조항, 커버리지 계산, 보안 3요소 실무 (문항당 5점, 100점 만점)",
        questions: [
            // [1과목: 요구사항 확인] (1~5번)
            {
                id: 1,
                category: "1. 요구사항 확인",
                type: "SHORT",
                question: "[단답형] 현행 시스템 분석 3단계(1단계 겉모습 ➡️ 2단계 SW 내부 ➡️ 3단계 물리적 인프라) 중 서버 장비와 네트워크 백본 스위치 등 물리적 통신 환경을 분석하는 3단계의 파악 대상을 쓰시오.",
                answer: "하드웨어 및 네트워크 구성",
                acceptedAnswers: ["하드웨어 및 네트워크", "하드웨어 및 네트워크 구성", "hw 및 네트워크", "하드웨어, 네트워크", "하드웨어,네트워크", "HW 및 네트워크 구성 파악"],
                explanation: "현행 시스템 파악 3단계는 물리적 인프라인 **하드웨어(HW) 및 네트워크 구성 파악**입니다. (1단계: 구성/기능/인터페이스, 2단계: SW 및 아키텍처)"
            },
            {
                id: 2,
                category: "1. 요구사항 확인",
                type: "CHOICE",
                question: "소프트웨어 요구사항 개발 4단계(도분명확) 중 수집 및 분석된 요구사항을 정형화된 표준 양식에 따라 명확하고 완전하게 '문서화(SRS 작성)'하는 단계는?",
                options: [
                    "요구사항 도출 (Elicitation)",
                    "요구사항 분석 (Analysis)",
                    "요구사항 명세 (Specification)",
                    "요구사항 확인 (Validation)"
                ],
                answer: 2,
                explanation: "요구사항을 빠짐없이 체계적으로 문서화하는 과정은 **요구사항 명세(Specification)** 단계입니다."
            },
            {
                id: 3,
                category: "1. 요구사항 확인",
                type: "FILL",
                question: "[서술/나열형] 요구사항 9대 품질 특성(완정명일특검수추이) 중 기출시험에 가장 빈번하게 출제되는 '5대 핵심 특성'을 쓰시오. (단, 쉼표로 구분)",
                answer: "완전성, 정확성, 명확성, 일관성, 추적성",
                acceptedAnswers: [
                    "완전성, 정확성, 명확성, 일관성, 추적성",
                    "완전성,정확성,명확성,일관성,추적성",
                    "완전성 정확성 명확성 일관성 추적성",
                    "완, 정, 명, 일, 추",
                    "완정명일추"
                ],
                explanation: "요구사항 품질 특성 중 핵심 빈출 5개는 **완전성, 정확성, 명확성, 일관성, 추적성**입니다."
            },
            {
                id: 4,
                category: "1. 요구사항 확인",
                type: "CHOICE",
                question: "UI 설계 4대 원칙 중 '리모컨의 볼륨 증가 버튼을 누르면 정확하게 볼륨이 조절되어 사용자가 원하는 목표를 완벽히 달성해야 한다'는 비유에 해당하는 원칙은?",
                options: [
                    "직관성 (Intuitiveness)",
                    "유효성 (Effectiveness)",
                    "학습성 (Learnability)",
                    "유연성 (Flexibility)"
                ],
                answer: 1,
                explanation: "사용자의 본래 목적과 의도를 정확하고 유효하게 달성할 수 있어야 한다는 원칙은 **유효성(Effectiveness)**입니다."
            },
            {
                id: 5,
                category: "1. 요구사항 확인",
                type: "SHORT",
                question: "[단답형] ISO/IEC 25010 소프트웨어 기능성 품질 하위 특성 중 '구현된 소프트웨어가 다른 외부 이종 시스템이나 컴포넌트와 정보를 원활하게 교환하고 함께 문제없이 작동할 수 있는 능력'을 무엇이라 하는가?",
                answer: "상호 운용성",
                acceptedAnswers: ["상호 운용성", "상호운용성", "interoperability"],
                explanation: "외부 타 시스템과의 원활한 데이터 연계 및 협업 능력을 **상호 운용성(Interoperability)**이라고 합니다."
            },
            // [2과목: 제품소프트웨어 패키징] (6~10번)
            {
                id: 6,
                category: "2. 제품소프트웨어 패키징",
                type: "CHOICE",
                question: "분산 형상 관리 도구인 Git의 주요 명령어 중 로컬 저장소에서 변경 확정된 커밋(Commit) 내역들을 원격 저장소(GitHub, GitLab 등)로 업로드하여 반영시키는 명령어는?",
                options: [
                    "git clone",
                    "git pull",
                    "git push",
                    "git checkout"
                ],
                answer: 2,
                explanation: "로컬의 커밋 내역을 원격 저장소에 전송하여 반영하는 명령어는 **git push**입니다. (가져오는 것은 pull, 복제는 clone)"
            },
            {
                id: 7,
                category: "2. 제품소프트웨어 패키징",
                type: "SHORT",
                question: "[단답형] 모듈 간의 결합도 6단계 중 한 모듈이 다른 모듈에게 제어 플래그(Flag)나 신호를 인수로 전달하여, 상대 모듈의 내부 처리 경로를 직접 통제하고 결정하게 만드는 결합도의 명칭을 쓰시오.",
                answer: "제어 결합도",
                acceptedAnswers: ["제어 결합도", "제어결합도", "control coupling", "제어"],
                explanation: "제어 신호나 flag를 넘겨 상대 모듈의 실행 흐름을 지시하는 결합도는 **제어 결합도(Control Coupling)**입니다. (자-스-**제**-외-공-내)"
            },
            {
                id: 8,
                category: "2. 제품소프트웨어 패키징",
                type: "CHOICE",
                question: "소프트웨어 배포용 미디어(CD, USB 등) 제작 시 절대 포함되어서는 안 되는 정보 2가지를 올바르게 짝지은 것은?",
                options: [
                    "버전 정보, 소프트웨어 사양 정보",
                    "설치 방법 가이드, 신규 추가 기능 정보",
                    "제품 개발자 개인 연락처, 배포 미디어 제조사 정보",
                    "알려진 오류 및 대처 방안, 설치 제약 사항"
                ],
                answer: 2,
                explanation: "배포 미디어에는 **제품 개발자 개인 연락처나 미디어 제조사 정보는 절대 수록되지 않습니다.** (버사설새오제 6가지만 포함)"
            },
            {
                id: 9,
                category: "2. 제품소프트웨어 패키징",
                type: "SHORT",
                question: "[단답형] 소프트웨어 버전 관리 백업 정책 중 예기치 않은 전산 장애나 재난 발생 시 가장 빠르고 신속한 무손실 복구를 위해 기본 권장되는 전체 백업 방식의 명칭을 쓰시오.",
                answer: "FULL 백업",
                acceptedAnswers: ["FULL 백업", "FULL백업", "full 백업", "full백업", "전체 백업", "전체백업", "full"],
                explanation: "복구 속도를 극대화하기 위해 매일 수행하는 기본 권장 백업은 **FULL 백업(전체 백업)**입니다."
            },
            {
                id: 10,
                category: "2. 제품소프트웨어 패키징",
                type: "SHORT",
                question: "[단답형] 버전 관리 및 백업 정책이 규정대로 잘 이행되고 있는지 주기적으로 점검하는 역할을 수행하는 '형상관리 책임자'의 공식 영문 약칭(3글자)을 대문자로 쓰시오.",
                answer: "CMO",
                acceptedAnswers: ["CMO", "cmo", "Configuration Management Officer"],
                explanation: "형상관리 책임자의 공식 약칭은 **CMO (Configuration Management Officer)**입니다."
            },
            // [3과목: 애플리케이션 테스트 관리] (11~15번)
            {
                id: 11,
                category: "3. 애플리케이션 테스트 관리",
                type: "SHORT",
                question: "[단답형] 소프트웨어 프로그램을 실행하지 않고, 개발팀 동료들이 모여 요구사항 명세서나 소스코드를 면밀히 검토하여 결함을 찾아내는 정적 테스트 기법(인스펙션 또는 워크스루 중 하나)의 명칭을 쓰시오.",
                answer: "인스펙션",
                acceptedAnswers: ["인스펙션", "inspection", "워크스루", "walkthrough", "코드 인스펙션", "동료검토"],
                explanation: "프로그램 실행 없이 소스코드와 산출물을 검사하는 대표적인 정적 테스트 기법은 **인스펙션(Inspection)**과 **워크스루(Walkthrough)**입니다."
            },
            {
                id: 12,
                category: "3. 애플리케이션 테스트 관리",
                type: "CHOICE",
                question: "소프트웨어 테스트 유형 중 시스템에 고의로 비정상적인 전원 차단이나 강제 종료 등의 장애를 유도한 후, 데이터 손실 없이 원래의 정상 상태로 올바르게 복귀되는지 검증하는 테스트는?",
                options: [
                    "회복 테스트 (Recovery Testing)",
                    "안전 테스트 (Security Testing)",
                    "성능 테스트 (Performance Testing)",
                    "병행 테스트 (Parallel Testing)"
                ],
                answer: 0,
                explanation: "고의로 실패를 유도하여 시스템의 복구 능력을 시험하는 테스트는 **회복 테스트(Recovery Testing)**입니다."
            },
            {
                id: 13,
                category: "3. 애플리케이션 테스트 관리",
                type: "FILL",
                question: "[서술/나열형] 체계적인 테스트 절차인 '테스트 프로세스 5단계'의 단계명을 순서대로 나열하여 쓰시오. (단, 쉼표 또는 화살표로 구분)",
                answer: "계획, 설계, 작성, 수행, 리포팅",
                acceptedAnswers: [
                    "계획, 설계, 작성, 수행, 리포팅",
                    "계획,설계,작성,수행,리포팅",
                    "계획, 설계, 작성, 수행, 평가",
                    "계획 ➡️ 설계 ➡️ 작성 ➡️ 수행 ➡️ 리포팅",
                    "계획->설계->작성->수행->리포팅",
                    "계설수평리"
                ],
                explanation: "테스트 프로세스 5단계는 **테스트 계획 ➡️ 테스트 분석 및 설계 ➡️ 테스트 케이스/시나리오 작성 ➡️ 테스트 수행 ➡️ 평가 및 리포팅**입니다. (암기 팁: **계설수평리**)"
            },
            {
                id: 14,
                category: "3. 애플리케이션 테스트 관리",
                type: "CHOICE",
                question: "개별 테스트 케이스들의 유기적인 집합으로, 여러 테스트 항목들을 어떤 순서와 흐름에 따라 순차적으로 실행해야 하는지 구체적인 동작 순서를 기술한 문서의 명칭은?",
                options: [
                    "테스트 케이스 (Test Case)",
                    "테스트 시나리오 (Test Scenario)",
                    "테스트 오라클 (Test Oracle)",
                    "테스트 하네스 (Test Harness)"
                ],
                answer: 1,
                explanation: "테스트 케이스들을 실행 순서에 맞게 묶어 작성한 상위 문서는 **테스트 시나리오(Test Scenario)**입니다."
            },
            {
                id: 15,
                category: "3. 애플리케이션 테스트 관리",
                type: "SHORT",
                question: "[단답형] 이미 검증된 소프트웨어의 소스코드를 수정한 후, 새로운 버그가 발생하지 않았는지 기존의 테스트 케이스들을 반복 재실행하여 검증하는 테스트 기법의 명칭을 쓰시오.",
                answer: "회귀 테스트",
                acceptedAnswers: ["회귀 테스트", "회귀테스트", "regression test", "regression testing", "회귀"],
                explanation: "코드 수정 후 부작용(Side Effect)이 없는지 확인하는 재시험은 **회귀 테스트(Regression Test)**입니다."
            },
            // [4과목: SW 개발 보안 구축] (16~20번)
            {
                id: 16,
                category: "4. SW 개발 보안 구축",
                type: "SHORT",
                question: "[단답형] 정보 보안의 3대 요소(기무가) 중 '데이터나 정보가 인가되지 않은 방법으로 위조, 변조, 삭제되지 않고 언제나 원본의 정확성과 일관성을 유지해야 한다'는 보안 특성의 명칭을 쓰시오.",
                answer: "무결성",
                acceptedAnswers: ["무결성", "integrity"],
                explanation: "데이터의 변조를 막고 정확성을 유지하는 특성은 **무결성(Integrity)**입니다."
            },
            {
                id: 17,
                category: "4. SW 개발 보안 구축",
                type: "SHORT",
                question: "[단답형] 개발이 끝난 후 사후에 보안을 적용하는 것이 아니라, 설계 및 코딩 초기 단계부터 소프트웨어 보안 취약점을 사전에 배제하고 제거하는 안전한 개발 기법의 명칭을 쓰시오.",
                answer: "시큐어 코딩",
                acceptedAnswers: ["시큐어 코딩", "시큐어코딩", "secure coding", "소프트웨어 보안약점 진단"],
                explanation: "개발 단계부터 보안을 고려하는 안전한 코딩 방식을 **시큐어 코딩(Secure Coding)**이라고 합니다."
            },
            {
                id: 18,
                category: "4. SW 개발 보안 구축",
                type: "CHOICE",
                question: "웹 애플리케이션에서 발생할 수 있는 위험한 파일 업로드(웹셸) 공격을 차단하기 위한 서버 보안 대책으로 가장 적절한 것은?",
                options: [
                    "업로드된 파일이 저장되는 디렉터리의 실행(Execute) 권한을 원천 제거하고, 확장자를 화이트리스트로 엄격히 제한한다.",
                    "업로드 파일의 크기를 10GB 이상으로 무제한 허용한다.",
                    "공격자 추적을 위해 원본 파일명을 웹 URL에 그대로 노출하여 서비스한다.",
                    "첨부파일 저장 위치를 웹 애플리케이션의 루트(Root) 바로 아래 디렉터리에 둔다."
                ],
                answer: 0,
                explanation: "웹셸 공격을 막으려면 업로드 경로의 **실행 권한을 박탈(읽기 전용)**하고, jsp/php/asp 등 실행 파일이 업로드되지 않도록 **확장자 화이트리스트 검증**을 해야 합니다."
            },
            {
                id: 19,
                category: "4. SW 개발 보안 구축",
                type: "SHORT",
                question: "[단답형] 공격자가 웹 요청 URL이나 파라미터에 `../` 와 같은 상위 디렉터리 이동 문자를 삽입하여 서버의 허가되지 않은 중요 시스템 파일에 비인가 접근하는 보안 약점의 명칭을 쓰시오.",
                answer: "경로 조작",
                acceptedAnswers: ["경로 조작", "경로조작", "경로 조작 및 자원 삽입", "디렉터리 트래버설", "path traversal", "directory traversal"],
                explanation: "경로 조작 문자를 통해 비인가 자원에 접근하는 취약점은 **경로 조작 및 자원 삽입 (Path Traversal)**입니다."
            },
            {
                id: 20,
                category: "4. SW 개발 보안 구축",
                type: "CHOICE",
                question: "객체지향 프로그래밍(OOP)에서 객체의 속성(데이터)과 행위(메서드)를 하나로 묶고, 내부 구현의 세부사항을 감추어 외부의 부적절한 직접 접근을 방어하는 정보 은닉 설계 원리는?",
                options: [
                    "상속성 (Inheritance)",
                    "캡슐화 (Encapsulation)",
                    "다형성 (Polymorphism)",
                    "추상화 (Abstraction)"
                ],
                answer: 1,
                explanation: "데이터와 메서드를 하나로 묶고 내부를 감추어 보호(정보 은닉)하는 기법은 **캡슐화(Encapsulation)**입니다."
            }
        ]
    }
};

// 하위 호환성을 위한 기본 참조 변수 (제1회 모의고사)
const WRITTEN_MOCK_EXAM = WRITTEN_MOCK_EXAMS["exam-1"].questions;


