/**
 * SWL5 Master - Practical Learning & Follow-Along Typing Engine
 * 실기(코딩평가) 인터랙티브 코드 따라치기 & 문법/해설 트레이너 엔진
 */

const PRACTICAL_DATA = {
    // 2-3. SQL 작성 데이터 (총 20개 핵심 기출 & 실전 문법 마스터)
    sql: [
        // ==========================================
        // 1. DDL: 테이블 정의 & 구조 변경 (4제)
        // ==========================================
        {
            id: "sql-ddl-member",
            cat: "DDL",
            category: "1. DDL 테이블 정의",
            title: "1. 회원 정보 테이블 생성 (PK, NOT NULL, DATE)",
            desc: "회원번호(PK), 성명, 전화번호, 주소, 가입일자, 고객등급, 도시코드를 포함하는 표준 테이블 정의",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
다음 조건에 맞추어 쇼핑몰 회원 정보를 관리할 테이블(member_tbl_02)을 생성하는 DDL SQL문을 작성하시오.

1) 회원번호(custno): 정수 6자리, 빈 값 불허(NOT NULL), 테이블 기본키(PRIMARY KEY)
2) 회원성명(custname): 가변길이 문자열 20자리, 필수 입력(NOT NULL)
3) 회원전화(phone): 가변길이 문자열 15자리
4) 회원주소(address): 가변길이 문자열 60자리
5) 가입일자(joindate): 날짜 형식(DATE)
6) 고객등급(grade): 고정길이 문자열 1자리 (A: VIP, B: 일반, C: 직원)
7) 거주도시(city): 고정길이 문자열 2자리 ('01', '02' 등)`,
            goal: "회원 마스터 테이블의 스키마를 정의하고, 식별자(PK)와 널 허용 여부(NOT NULL), 적합한 데이터 타입(INT, VARCHAR, CHAR, DATE)을 지정하는 능력을 평가합니다.",
            tip: "기본키(PRIMARY KEY)는 반드시 명시해야 하며, 가입일자는 DATE 타입을 사용합니다.",
            code: `CREATE TABLE member_tbl_02 (
    custno INT(6) NOT NULL PRIMARY KEY,
    custname VARCHAR(20) NOT NULL,
    phone VARCHAR(15),
    address VARCHAR(60),
    joindate DATE,
    grade CHAR(1),
    city CHAR(2)
);`,
            explanations: [
                { line: "CREATE TABLE member_tbl_02", desc: "member_tbl_02 이름의 새로운 테이블을 생성하는 DDL 명령입니다." },
                { line: "custno INT(6) NOT NULL PRIMARY KEY", desc: "회원번호: 6자리 정수형, 빈 값을 허용하지 않음(NOT NULL), 테이블의 유일한 식별자(PRIMARY KEY)로 지정합니다." },
                { line: "custname VARCHAR(20) NOT NULL", desc: "회원성명: 최대 20자의 가변길이 문자열, 필수 입력 항목입니다." },
                { line: "phone VARCHAR(15)", desc: "전화번호: 하이픈(-)을 포함하여 최대 15자의 문자열로 저장합니다." },
                { line: "joindate DATE", desc: "가입일자: 연-월-일(YYYY-MM-DD) 형식의 날짜 타입입니다." },
                { line: "grade CHAR(1)", desc: "고객등급: A(VIP), B(일반), C(직원) 단일 1글자이므로 고정길이 CHAR(1)을 사용합니다." },
                { line: "city CHAR(2)", desc: "도시코드: '01', '02' 등 2자리 고정 문자열입니다." }
            ]
        },
        {
            id: "sql-ddl-money",
            cat: "DDL",
            category: "1. DDL 테이블 정의",
            title: "2. 회원 매출 테이블 생성 (외래키 REFERENCES)",
            desc: "회원번호(FK), 판매번호(PK), 단가, 수량, 금액, 상품코드, 판매일자를 포함하는 매출 테이블 정의",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
회원의 상품 구매 내역을 영구 보관할 회원 매출 테이블(money_tbl_02)을 생성하는 DDL SQL문을 작성하시오.

1) 판매번호(saleno): 정수 8자리, 필수 입력, 기본키(PRIMARY KEY)
2) 회원번호(custno): 정수 6자리, 필수 입력(NOT NULL), member_tbl_02 테이블의 custno 컬럼을 참조하는 외래키(FOREIGN KEY)
3) 단가(pcost): 정수 8자리
4) 수량(amount): 정수 4자리
5) 판매금액(price): 정수 8자리
6) 상품코드(pcode): 가변길이 문자열 4자리
7) 판매일자(sdate): 날짜 형식(DATE)`,
            goal: "판매 엔터티의 기본키(PK)와 함께 부모(회원) 테이블과의 참조 무결성을 유지하는 외래키(FOREIGN KEY ... REFERENCES) 제약조건 작성 능력을 평가합니다.",
            tip: "외래키(FOREIGN KEY) 설정을 통해 회원 테이블의 회원번호와 무결성 제약조건을 연결합니다.",
            code: `CREATE TABLE money_tbl_02 (
    custno INT(6) NOT NULL,
    saleno INT(8) NOT NULL PRIMARY KEY,
    pcost INT(8),
    amount INT(4),
    price INT(8),
    pcode VARCHAR(4),
    sdate DATE,
    FOREIGN KEY (custno) REFERENCES member_tbl_02(custno)
);`,
            explanations: [
                { line: "saleno INT(8) NOT NULL PRIMARY KEY", desc: "판매번호: 8자리 정수이며 각 매출 건의 고유 식별 기본키입니다." },
                { line: "custno INT(6) NOT NULL", desc: "구매한 회원의 번호로, member_tbl_02 테이블을 참조합니다." },
                { line: "FOREIGN KEY (custno) REFERENCES ...", desc: "부모 테이블에 존재하지 않는 회원번호 입력을 차단하는 외래키 제약조건입니다." }
            ]
        },
        {
            id: "sql-ddl-teacher",
            cat: "DDL",
            category: "1. DDL 테이블 정의",
            title: "3. 강사/수강신청 테이블 (CHECK 제약 & DEFAULT)",
            desc: "골프장/학사관리 기출에서 출제되는 기본값(DEFAULT) 및 유효범위 체크(CHECK) 제약조건 테이블 정의",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
골프연습장 강사 정보 테이블(tbl_teacher_202201)을 다음 명세에 따라 생성하시오.

1) 강사코드(teacher_code): 고정문자열 3자리, 기본키(PRIMARY KEY)
2) 강사명(teacher_name): 가변문자열 20자리, 필수 입력(NOT NULL)
3) 강의명(class_name): 가변문자열 30자리
4) 수강료(tuition): 정수 8자리, 미입력 시 기본값으로 100,000원이 자동 세팅되도록 DEFAULT를 지정할 것
5) 등록일자(reg_date): 날짜 타입, 미입력 시 오늘 날짜(CURDATE)가 자동 입력되도록 설정할 것
6) 상태값(status): 고정문자열 1자리, 오직 'Y' 또는 'N'만 입력되도록 CHECK 제약조건을 추가할 것`,
            goal: "DEFAULT 기본값 자동 세팅과 CHECK 도메인 제약조건을 활용하여 비정상 데이터 유입을 DB 레벨에서 원천 방어하는 능력을 평가합니다.",
            tip: "수강료가 0 이상인지 검사하는 CHECK와 기본 등록일자 DEFAULT CURDATE() 문법을 숙지하세요.",
            code: `CREATE TABLE tbl_teacher_202201 (
    teacher_code CHAR(3) NOT NULL PRIMARY KEY,
    teacher_name VARCHAR(20) NOT NULL,
    class_name VARCHAR(30),
    tuition INT(8) DEFAULT 100000,
    reg_date DATE DEFAULT (CURDATE()),
    status CHAR(1) CHECK (status IN ('Y', 'N'))
);`,
            explanations: [
                { line: "teacher_code CHAR(3) NOT NULL PRIMARY KEY", desc: "강사코드: 고정길이 3자리 영문/숫자 기본키입니다." },
                { line: "tuition INT(8) DEFAULT 100000", desc: "수강료: 입력하지 않았을 때 기본값으로 100,000원이 자동 세팅됩니다." },
                { line: "reg_date DATE DEFAULT (CURDATE())", desc: "등록일자: 값을 생략하면 오늘 날짜가 자동으로 들어갑니다." },
                { line: "CHECK (status IN ('Y', 'N'))", desc: "상태값: 오직 'Y' 또는 'N'만 입력되도록 강제하는 도메인 제약조건입니다." }
            ]
        },
        {
            id: "sql-alter-table",
            cat: "DDL",
            category: "1. DDL 테이블 정의",
            title: "4. 테이블 구조 변경 (ALTER TABLE ADD / MODIFY)",
            desc: "이미 생성된 테이블에 새로운 컬럼(email)을 추가하고 기존 컬럼의 길이를 변경하는 DDL 쿼리",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
이미 운영 중인 회원 테이블(member_tbl_02)에 대해 다음 구조 변경 DDL을 수행하시오.

1) 회원의 이메일 주소를 추가로 저장하기 위해 'email' 컬럼(가변문자열 40자리)을 새로 추가하시오.
2) 도로명 주소가 길어져 기존 주소(address) 컬럼의 자릿수를 60자에서 100자(VARCHAR(100))로 확장 수정하시오.`,
            goal: "테이블을 드롭(삭제)하지 않고 DDL 명령(ALTER TABLE ADD / MODIFY)으로 스키마를 동적으로 변경하는 실무 대처 능력을 평가합니다.",
            tip: "실기 시험 중 컬럼 설계를 실수했을 때 테이블을 삭제하지 않고 즉시 컬럼을 추가/변경할 수 있는 필수 명령어입니다.",
            code: `-- 1. 이메일(email) 컬럼 추가
ALTER TABLE member_tbl_02 ADD email VARCHAR(40);

-- 2. 주소(address) 컬럼 크기를 100자로 확장
ALTER TABLE member_tbl_02 MODIFY address VARCHAR(100);`,
            explanations: [
                { line: "ALTER TABLE member_tbl_02 ADD email ...", desc: "기존 테이블에 새 컬럼을 추가합니다." },
                { line: "ALTER TABLE member_tbl_02 MODIFY address ...", desc: "기존 컬럼의 데이터 타입이나 자릿수 길이를 확장 수정합니다." }
            ]
        },

        // ==========================================
        // 2. DML: 데이터 조작 CRUD (3제)
        // ==========================================
        {
            id: "sql-dml-insert",
            cat: "DML",
            category: "2. DML 데이터 조작",
            title: "5. 신규 회원 레코드 삽입 (INSERT INTO VALUES)",
            desc: "테이블에 새로운 회원 데이터를 형식에 맞추어 정확하게 입력하는 DML 쿼리",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
회원 테이블(member_tbl_02)에 아래 제시된 신규 회원 1건의 데이터를 등록하는 INSERT SQL문을 작성하시오.

[등록할 회원 데이터 명세]
- 회원번호(custno): 100001
- 회원성명(custname): 김행복
- 회원전화(phone): 010-1111-2222
- 회원주소(address): 서울 동대문구 휘경동
- 가입일자(joindate): 2023-12-02
- 고객등급(grade): A
- 도시코드(city): 01`,
            goal: "지정된 테이블 컬럼 순서에 맞추어 값을 1:1로 정확하게 매핑하고, 문자열과 날짜 리터럴에 작은따옴표('')를 올바르게 적용하는 DML 기본 등록 능력을 평가합니다.",
            tip: "문자열과 날짜는 반드시 작은따옴표('')로 감싸야 하며, 컬럼 순서와 값의 순서가 정확히 1:1 일치해야 합니다.",
            code: `INSERT INTO member_tbl_02 (custno, custname, phone, address, joindate, grade, city)
VALUES (100001, '김행복', '010-1111-2222', '서울 동대문구 휘경동', '2023-12-02', 'A', '01');`,
            explanations: [
                { line: "INSERT INTO member_tbl_02 (...)", desc: "값을 삽입할 대상 테이블과 컬럼 목록을 지정합니다." },
                { line: "VALUES (100001, '김행복', ...)", desc: "지정된 컬럼 순서에 대응하는 실제 데이터 리터럴 값을 나열합니다." }
            ]
        },
        {
            id: "sql-dml-update",
            cat: "DML",
            category: "2. DML 데이터 조작",
            title: "6. 회원 정보 조건부 수정 (UPDATE SET WHERE)",
            desc: "특정 회원번호(100001)의 전화번호와 주소, 등급을 한 번에 갱신하는 DML 쿼리",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
회원정보 수정 화면에서 회원번호가 100001번인 회원이 개인정보 변경을 요청하였다.
다음 요구사항에 맞추어 해당 회원의 데이터를 일괄 갱신하는 UPDATE SQL문을 작성하시오.

- 대상 회원: 회원번호(custno) = 100001
- 변경 전화번호(phone): '010-9999-8888'
- 변경 주소(address): '서울 강남구 테헤란로 123'
- 변경 등급(grade): 'A'`,
            goal: "WHERE 조건을 명시하여 의도한 단 1명의 회원 레코드만 안전하게 수정하고, SET 절에서 콤마(,)를 사용해 다중 컬럼을 갱신하는 문법을 평가합니다.",
            tip: "WHERE 절을 생략하면 테이블의 모든 행이 한꺼번에 수정되는 대형 참사가 발생하므로 반드시 PK 조건을 붙여야 합니다.",
            code: `UPDATE member_tbl_02
SET phone = '010-9999-8888',
    address = '서울 강남구 테헤란로 123',
    grade = 'A'
WHERE custno = 100001;`,
            explanations: [
                { line: "UPDATE member_tbl_02", desc: "수정할 테이블 명을 선언합니다." },
                { line: "SET phone = '...', address = '...'", desc: "콤마(,)로 구분하여 변경할 컬럼과 새 값을 지정합니다." },
                { line: "WHERE custno = 100001;", desc: "수정 대상을 100001번 회원 1명으로 정확히 한정합니다." }
            ]
        },
        {
            id: "sql-dml-delete",
            cat: "DML",
            category: "2. DML 데이터 조작",
            title: "7. 조건부 데이터 삭제 (DELETE FROM WHERE)",
            desc: "특정 기준(2023년 이전 판매 건)을 만족하는 데이터를 테이블에서 제거하는 DML 쿼리",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
매출 테이블(money_tbl_02)에서 2024년 이전(2024-01-01 미만)에 발생하였고, 회원번호가 100001번인 판매 데이터를 테이블에서 영구 삭제하는 DELETE SQL문을 작성하시오.`,
            goal: "AND 연산자로 날짜 범위와 회원 식별자를 결합하여 원하는 특정 레코드만 선별 삭제하는 DML 문법을 평가합니다.",
            tip: "테이블 전체를 날리는 DROP/TRUNCATE와 달리 DELETE는 조건에 맞는 행만 롤백 가능하게 삭제합니다.",
            code: `DELETE FROM money_tbl_02
WHERE sdate < '2024-01-01' AND custno = 100001;`,
            explanations: [
                { line: "DELETE FROM money_tbl_02", desc: "삭제할 대상 테이블을 지정합니다." },
                { line: "WHERE sdate < '2024-01-01' AND ...", desc: "날짜 비교와 회원번호 조건을 AND로 결합하여 일치하는 레코드만 선별 삭제합니다." }
            ]
        },

        // ==========================================
        // 3. DQL: 조건 검색 & 정렬 (3제)
        // ==========================================
        {
            id: "sql-select-distinct",
            cat: "DQL_COND",
            category: "3. DQL 조건 검색 & 정렬",
            title: "8. 중복 제거(DISTINCT) & 다중 조건(IN, AND)",
            desc: "VIP(A) 또는 일반(B) 회원들이 거주하는 도시코드 목록을 중복 없이 깔끔하게 추출",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
회원 테이블(member_tbl_02)에서 다음 조건을 모두 만족하는 거주지역(도시코드 city) 목록을 조회하시오.

1) 고객등급(grade)이 'A'(VIP) 또는 'B'(일반)인 회원일 것 (IN 연산자 사용)
2) 전화번호(phone)가 누락되지 않고 정상 등록되어 있을 것 (IS NOT NULL)
3) 여러 회원이 동일한 도시에 거주하더라도 도시코드는 중복 없이 한 번만 출력할 것 (DISTINCT)`,
            goal: "결과 집합의 중복 행을 제거하는 DISTINCT 키워드와 다중 값 비교 IN 연산자, NULL 체크 연산자의 결합 활용을 평가합니다.",
            tip: "DISTINCT는 조회 결과 행의 중복을 제거하며, 'grade = A OR grade = B' 대신 'grade IN (A, B)'를 쓰는 것이 정석입니다.",
            code: `SELECT DISTINCT city
FROM member_tbl_02
WHERE grade IN ('A', 'B') AND phone IS NOT NULL;`,
            explanations: [
                { line: "SELECT DISTINCT city", desc: "여러 회원이 같은 도시에 살더라도 중복을 제거하여 고유 도시코드만 한 번씩 출력합니다." },
                { line: "WHERE grade IN ('A', 'B')", desc: "고객등급이 'A'이거나 'B'인 회원을 필터링합니다." },
                { line: "AND phone IS NOT NULL", desc: "전화번호가 누락되지 않은 정상 회원만 포함합니다." }
            ]
        },
        {
            id: "sql-select-like-between",
            cat: "DQL_COND",
            category: "3. DQL 조건 검색 & 정렬",
            title: "9. 패턴 매칭(LIKE) & 범위 조회(BETWEEN AND)",
            desc: "서울 지역에 거주하면서 2023년 12월 1일부터 15일 사이에 가입한 회원을 검색",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
다음 두 가지 검색 조건을 모두 충족하는 회원의 회원번호, 회원성명, 주소, 가입일자를 조회하시오.

1) 주소(address)에 '서울'이라는 단어가 포함되어 있는 회원 (LIKE 와일드카드 사용)
2) 가입일자(joindate)가 2023년 12월 1일부터 12월 15일 사이인 회원 (BETWEEN AND 사용)`,
            goal: "문자열 부분 일치 검색(LIKE '%단어%')과 시작일~종료일 구간을 양 끝값 포함하여 검색하는 BETWEEN AND 문법을 평가합니다.",
            tip: "LIKE '%서울%'는 문자열 내 '서울'이 포함된 데이터를 찾으며, BETWEEN a AND b는 양 끝 경계값을 포함합니다.",
            code: `SELECT custno, custname, address, joindate
FROM member_tbl_02
WHERE address LIKE '%서울%'
  AND joindate BETWEEN '2023-12-01' AND '2023-12-15';`,
            explanations: [
                { line: "WHERE address LIKE '%서울%'", desc: "주소 문자열 어느 위치에든 '서울'이라는 단어가 포함되어 있으면 매칭됩니다." },
                { line: "AND joindate BETWEEN '...' AND '...'", desc: "가입일자가 12월 1일 이상 12월 15일 이하인 구간 데이터를 조회합니다." }
            ]
        },
        {
            id: "sql-order-by-multi",
            cat: "DQL_COND",
            category: "3. DQL 조건 검색 & 정렬",
            title: "10. 다중 컬럼 정렬 (ORDER BY 1차 DESC, 2차 ASC)",
            desc: "최근에 가입한 회원(가입일자 내림차순)을 먼저 보여주고, 가입일이 같으면 회원번호 순으로 오름차순 정렬",
            examPrompt: `【실제 시험 출제 문제 / 요구조건】
회원 테이블의 회원번호, 회원성명, 가입일자, 고객등급을 조회하되, 다음 다중 정렬 기준을 엄격히 준수하여 출력하시오.

1) 1차 정렬: 가장 최근에 가입한 회원부터 출력 (가입일자 joindate 내림차순 DESC)
2) 2차 정렬: 만약 가입일자가 동일한 회원이 있을 경우, 회원번호(custno)가 작은 순서대로 출력 (오름차순 ASC)`,
            goal: "복수 컬럼에 대한 1차/2차 정렬 우선순위 지정과 DESC(내림차순) 및 ASC(오름차순) 키워드의 정확한 사용법을 평가합니다.",
            tip: "오타 주의! 'ACS'가 아니라 'ASC'입니다. DESC는 내림차순(큰 값 우선), ASC는 오름차순(기본값)입니다.",
            code: `SELECT custno, custname, joindate, grade
FROM member_tbl_02
ORDER BY joindate DESC, custno ASC;`,
            explanations: [
                { line: "ORDER BY joindate DESC", desc: "1차 정렬 기준: 가입일자가 가장 최근인 순서(내림차순)로 정렬합니다." },
                { line: ", custno ASC;", desc: "2차 정렬 기준: 1차 기준이 동일할 경우 회원번호가 작은 순서(오름차순)로 정렬합니다." }
            ]
        },

        // ==========================================
        // 4. DQL: 단일행 함수 & CASE 조건 분기 (4제)
        // ==========================================
        {
            id: "sql-fn-ifnull-max",
            cat: "DQL_FUNC",
            category: "4. 단일행 함수 & CASE",
            title: "11. 회원번호 자동 채번 & NULL 방어 (IFNULL & MAX)",
            desc: "기존 가장 큰 회원번호를 찾아 +1 한 새 번호를 생성하되, 데이터가 0건일 때도 100001이 나오도록 처리",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 회원등록 자동발생 번호】
신규 회원 등록 화면 진입 시 회원번호를 자동으로 부여하려고 한다.
현재 등록된 가장 큰 회원번호(MAX)에 +1을 더한 값을 'next_custno'라는 별칭으로 조회하는 SQL문을 작성하시오.

※ 주의사항:
테이블에 회원이 단 1명도 등록되어 있지 않을 경우 MAX(custno)의 결과가 NULL이 되므로,
이 경우 기본 시작 번호인 '100001'이 정상 출력되도록 반드시 IFNULL(또는 NVL) 함수로 100000 대체 처리를 포함할 것!`,
            goal: "실기 시험 화면 구현 시 필수 1순위인 자동 채번 로직(MAX+1)과 데이터 0건 시 NULL 포인터 에러를 사전 차단하는 IFNULL 함수 능력을 평가합니다.",
            tip: "실기 시험 등록 화면 구현 시 필수 1순위 쿼리입니다. Oracle에서는 NVL, MySQL에서는 IFNULL을 사용합니다.",
            code: `SELECT IFNULL(MAX(custno), 100000) + 1 AS next_custno
FROM member_tbl_02;`,
            explanations: [
                { line: "MAX(custno)", desc: "현재 테이블에 존재하는 가장 큰 회원번호를 계산합니다." },
                { line: "IFNULL(..., 100000)", desc: "회원이 1명도 없어서 결과가 NULL이면 100000으로 대체합니다." },
                { line: "+ 1 AS next_custno", desc: "1을 더해 첫 회원은 100001번, 이후 100002, 100003 순으로 자동 증가시킵니다." }
            ]
        },
        {
            id: "sql-fn-concat-substr",
            cat: "DQL_FUNC",
            category: "4. 단일행 함수 & CASE",
            title: "12. 문자열 연결(CONCAT) & 개인정보 마스킹(SUBSTRING)",
            desc: "전화번호 뒷자리 4자리를 '****'로 마스킹하고, 성명 뒤에 '님' 호칭을 붙여 출력",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 개인정보 보호 출력】
회원 테이블에서 고객 프라이버시 보호를 위해 다음 변환 규칙을 적용하여 조회하시오.

1) 회원 성명 뒤에 한 칸 띄우고 '님' 호칭을 붙여 'client_name' 컬럼으로 출력 (예: '김행복 님')
2) 전화번호는 앞자리부터 가운데 자리까지(1~9번째 글자)만 보여주고, 뒷자리 4자리는 '****'로 마스킹하여 'masked_phone' 컬럼으로 출력 (예: '010-1111-****')`,
            goal: "문자열 결합 함수(CONCAT)와 부분 문자열 추출 함수(SUBSTRING/SUBSTR)를 결합하여 사용자 친화적 뷰를 포맷팅하는 능력을 평가합니다.",
            tip: "문자열 조작 함수 CONCAT과 SUBSTRING(str, 시작위치, 길이)을 결합하여 화면에 맞춤 포맷을 제공합니다.",
            code: `SELECT CONCAT(custname, ' 님') AS client_name,
       CONCAT(SUBSTRING(phone, 1, 9), '****') AS masked_phone
FROM member_tbl_02;`,
            explanations: [
                { line: "CONCAT(custname, ' 님')", desc: "성명과 ' 님' 문자열을 결합하여 출력합니다." },
                { line: "SUBSTRING(phone, 1, 9)", desc: "전화번호의 1번째 글자부터 9번째 글자('010-1111-')까지 잘라냅니다." },
                { line: "CONCAT(..., '****')", desc: "앞자리 9글자와 '****'를 연결하여 뒷자리를 안전하게 가립니다." }
            ]
        },
        {
            id: "sql-fn-case-grade",
            cat: "DQL_FUNC",
            category: "4. 단일행 함수 & CASE",
            title: "13. 고객등급 한글 변환 (CASE WHEN THEN END)",
            desc: "DB의 영문 코드값('A', 'B', 'C')을 화면 요구사항에 맞추어 'VIP', '일반', '직원' 한글 명칭으로 변환",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 회원목록조회 등급 변환】
회원 테이블(member_tbl_02)에서 회원번호, 회원성명을 조회하고, 영문 알파벳으로 저장된 고객등급(grade) 컬럼을 다음 지시대로 한글 변환하여 'grade_name'이라는 컬럼명으로 출력하시오.

- 'A' ➡️ 'VIP'
- 'B' ➡️ '일반'
- 'C' ➡️ '직원'
- 그 외의 값 ➡️ '미지정'`,
            goal: "실기 시험 채점 시 영문 코드 노출로 인한 감점을 방지하기 위해 표준 SQL CASE WHEN THEN END 조건 분기 구문을 작성하는 능력을 평가합니다.",
            tip: "실기 화면에서 영문 코드를 그대로 노출하면 감점됩니다. SQL 자체에서 변환하거나 JSP에서 if-else 처리해야 합니다.",
            code: `SELECT custno, custname,
       CASE grade
           WHEN 'A' THEN 'VIP'
           WHEN 'B' THEN '일반'
           WHEN 'C' THEN '직원'
           ELSE '미지정'
       END AS grade_name
FROM member_tbl_02;`,
            explanations: [
                { line: "CASE grade", desc: "grade 컬럼의 값을 기준으로 조건 분기를 시작합니다." },
                { line: "WHEN 'A' THEN 'VIP'", desc: "'A'이면 'VIP' 문자열로 치환합니다." },
                { line: "WHEN 'B' THEN '일반'", desc: "'B'이면 '일반' 문자열로 치환합니다." },
                { line: "ELSE '미지정' END AS grade_name", desc: "그 외의 값은 '미지정'으로 처리하고 CASE 문을 마칩니다." }
            ]
        },
        {
            id: "sql-fn-date-format",
            cat: "DQL_FUNC",
            category: "4. 단일행 함수 & CASE",
            title: "14. 날짜 포맷팅(DATE_FORMAT) & 가입 연차 계산",
            desc: "가입일자를 '2023년 12월 02일' 한국어 양식으로 포맷팅하고 가입한 지 몇 년째인지 연차를 계산",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 날짜 서식 & 연차 산출】
회원 테이블에서 회원성명과 함께 다음 날짜 계산 컬럼을 조회하시오.

1) 가입일자(joindate)를 'YYYY년 MM월 DD일' 형식으로 포맷팅하여 'join_korean' 컬럼으로 출력
2) 가입일자부터 오늘(CURDATE)까지 경과된 가입 연차(연수)를 계산하여 'member_years' 컬럼으로 출력`,
            goal: "날짜 포맷팅 함수(DATE_FORMAT) 및 두 날짜 간의 기간 계산 함수(TIMESTAMPDIFF)의 활용 능력을 평가합니다.",
            tip: "MySQL은 DATE_FORMAT(d, '%Y-%m-%d'), Oracle은 TO_CHAR(d, 'YYYY-MM-DD')를 사용합니다.",
            code: `SELECT custname,
       DATE_FORMAT(joindate, '%Y년 %m월 %d일') AS join_korean,
       TIMESTAMPDIFF(YEAR, joindate, CURDATE()) AS member_years
FROM member_tbl_02;`,
            explanations: [
                { line: "DATE_FORMAT(joindate, '%Y년 %m월 %d일')", desc: "4자리 연도(%Y), 2자리 월(%m), 2자리 일(%d) 양식으로 문자열을 재조합합니다." },
                { line: "TIMESTAMPDIFF(YEAR, joindate, CURDATE())", desc: "가입일부터 오늘(CURDATE)까지 경과된 연도 수를 정수로 계산합니다." }
            ]
        },

        // ==========================================
        // 5. DQL: GROUP BY & HAVING (2제)
        // ==========================================
        {
            id: "sql-group-count-sum",
            cat: "GROUP",
            category: "5. GROUP BY & HAVING",
            title: "15. 회원별 총 구매 금액 & 구매 건수 (GROUP BY, COUNT, SUM)",
            desc: "매출 테이블에서 회원번호별로 묶어 총 구매 횟수, 총 결제 금액, 평균 결제액을 한눈에 산출",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 회원별 구매 실적 집계】
회원 매출 테이블(money_tbl_02)을 회원번호(custno)별로 그룹화(GROUP BY)하여 다음 집계 결과를 산출하시오.

1) 회원번호(custno)
2) 해당 회원의 총 구매 횟수(COUNT) ➡️ 'order_count' 별칭
3) 해당 회원의 총 구매 금액 합계(SUM) ➡️ 'total_sum' 별칭
4) 해당 회원의 평균 구매 단가(AVG)를 정수로 반올림(ROUND) ➡️ 'avg_price' 별칭`,
            goal: "GROUP BY 절의 그룹핑 기준 컬럼과 집계함수(COUNT, SUM, AVG, ROUND)의 결합 원리를 평가합니다.",
            tip: "GROUP BY 절에 명시되지 않은 일반 컬럼은 SELECT 절에 단독으로 올 수 없으며, 반드시 집계함수(COUNT, SUM, AVG)와 함께 써야 합니다.",
            code: `SELECT custno,
       COUNT(*) AS order_count,
       SUM(price) AS total_sum,
       ROUND(AVG(price), 0) AS avg_price
FROM money_tbl_02
GROUP BY custno;`,
            explanations: [
                { line: "GROUP BY custno", desc: "회원번호(custno)가 동일한 행들을 하나의 그룹으로 묶습니다." },
                { line: "COUNT(*) AS order_count", desc: "해당 회원이 구매한 총 주문 건수를 카운트합니다." },
                { line: "SUM(price) AS total_sum", desc: "해당 회원이 구매한 모든 매출액의 총합을 구합니다." },
                { line: "ROUND(AVG(price), 0)", desc: "평균 구매 단가를 구한 뒤 소수점 첫째 자리에서 반올림합니다." }
            ]
        },
        {
            id: "sql-having-filter",
            cat: "GROUP",
            category: "5. GROUP BY & HAVING",
            title: "16. 우수 고객 필터링 (HAVING vs WHERE)",
            desc: "총 구매 금액의 합계(SUM)가 3,000원 이상인 고액 구매 회원만 선별하여 출력",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 우수 회원 필터링】
매출 테이블(money_tbl_02)에서 회원번호(custno)별로 총 구매금액(SUM(price))을 집계하되,
총 구매금액의 합계가 3,000원 이상인 우수 회원만 선별하여 회원번호와 총 구매금액(total_price)을 조회하시오.

※ 필수 주의: 집계함수 조건이므로 WHERE 절이 아닌 HAVING 절을 사용할 것!`,
            goal: "WHERE 절에는 집계함수를 쓸 수 없으며, 그룹화된 결과에 대한 필터링은 반드시 HAVING 절을 사용해야 한다는 시험 단골 핵심 원리를 평가합니다.",
            tip: "시험 단골 함정! WHERE 절에는 집계함수(SUM, COUNT 등)를 사용할 수 없습니다. 그룹핑 결과에 대한 조건은 반드시 HAVING 절에 써야 합니다.",
            code: `SELECT custno, SUM(price) AS total_price
FROM money_tbl_02
GROUP BY custno
HAVING SUM(price) >= 3000;`,
            explanations: [
                { line: "GROUP BY custno", desc: "회원별로 그룹화합니다." },
                { line: "HAVING SUM(price) >= 3000;", desc: "그룹별 총 매출액이 3,000원 이상인 그룹만 필터링하여 출력합니다." }
            ]
        },

        // ==========================================
        // 6. DQL: JOIN & 서브쿼리 (4제 - 실기 킬러!)
        // ==========================================
        {
            id: "sql-join-inner",
            cat: "JOIN",
            category: "6. JOIN & 서브쿼리",
            title: "17. 회원-매출 기본 내부 조인 (INNER JOIN & 정렬)",
            desc: "회원 테이블과 매출 테이블을 조인하여 회원별 총 매출액을 구하고 매출 내림차순 정렬",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 회원매출조회 화면 (배점 최고 킬러문항)】
회원 정보 테이블(member_tbl_02)과 매출 테이블(money_tbl_02)을 회원번호로 조인하여 다음 통계 화면을 완성하는 SQL문을 작성하시오.

1) 조회 항목: 회원번호(custno), 회원성명(custname), 고객등급(grade), 총 매출금액(total_price)
2) 매출금액은 해당 회원의 모든 구매 금액 합계(SUM)를 구할 것
3) 정렬: 총 매출금액이 가장 높은 우수 고객부터 1위~N위 순서(내림차순 DESC)로 출력할 것`,
            goal: "INNER JOIN을 통한 테이블 결합, GROUP BY를 통한 회원별 매출 합산(SUM), ORDER BY DESC 정렬까지 실기 시험 1순위 핵심 쿼리 작성 능력을 평가합니다.",
            tip: "실기 기출 1순위 대표 쿼리입니다. GROUP BY에는 집계함수를 제외한 모든 SELECT 컬럼(m.custno, m.custname, m.grade)을 기재해야 합니다.",
            code: `SELECT m.custno, m.custname, m.grade, SUM(s.price) AS total_price
FROM member_tbl_02 m
INNER JOIN money_tbl_02 s ON m.custno = s.custno
GROUP BY m.custno, m.custname, m.grade
ORDER BY total_price DESC;`,
            explanations: [
                { line: "FROM member_tbl_02 m INNER JOIN money_tbl_02 s", desc: "회원 테이블(m)과 매출 테이블(s)을 내부 조인합니다." },
                { line: "ON m.custno = s.custno", desc: "두 테이블의 공통 식별키인 회원번호(custno)를 매핑합니다." },
                { line: "GROUP BY m.custno, m.custname, m.grade", desc: "회원 정보별로 묶어 매출을 집계합니다." },
                { line: "ORDER BY total_price DESC;", desc: "매출액이 가장 큰 회원부터 순서대로 나열합니다." }
            ]
        },
        {
            id: "sql-join-left-zero",
            cat: "JOIN",
            category: "6. JOIN & 서브쿼리",
            title: "18. 미구매 회원 포함 0원 출력 (LEFT OUTER JOIN & IFNULL)",
            desc: "물건을 한 번도 사지 않은 회원까지 누락 없이 모두 출력하고, 매출액은 0원으로 표기",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 전 회원 매출 리포트 (기출 변형 1순위)】
물품을 한 번도 구매하지 않은 신규 회원까지 목록에서 단 1명도 누락되지 않고 모두 포함하여 회원별 매출 현황을 조회하시오.

1) 조회 항목: 회원번호(custno), 회원성명(custname), 총 매출금액(total_price)
2) 구매 이력이 없는 회원은 총 매출금액이 NULL이 아닌 '0'으로 출력되도록 IFNULL 함수를 적용할 것
3) 정렬: 총 매출금액 내림차순(DESC), 매출 동점 시 회원번호 오름차순(ASC)으로 정렬할 것`,
            goal: "INNER JOIN 시 결과에서 누락되는 구매 이력 없는 회원을 보존하는 LEFT OUTER JOIN 문법과 NULL 결과를 0으로 방어하는 IFNULL 결합 기술을 평가합니다.",
            tip: "기출 변형 문제 1순위! INNER JOIN은 구매 이력이 없는 회원이 누락되므로, 모든 회원을 살리려면 LEFT JOIN과 IFNULL(SUM, 0)을 써야 합니다.",
            code: `SELECT m.custno, m.custname,
       IFNULL(SUM(s.price), 0) AS total_price
FROM member_tbl_02 m
LEFT OUTER JOIN money_tbl_02 s ON m.custno = s.custno
GROUP BY m.custno, m.custname
ORDER BY total_price DESC, m.custno ASC;`,
            explanations: [
                { line: "LEFT OUTER JOIN money_tbl_02 s", desc: "왼쪽의 member_tbl_02(회원)를 기준으로 삼아, 오른쪽(매출)에 매칭 데이터가 없어도 왼쪽 행을 보존합니다." },
                { line: "IFNULL(SUM(s.price), 0)", desc: "구매 이력이 없는 회원은 SUM 결과가 NULL이 되므로 0원으로 치환하여 깔끔하게 출력합니다." }
            ]
        },
        {
            id: "sql-join-three-tables",
            cat: "JOIN",
            category: "6. JOIN & 서브쿼리",
            title: "19. 3개 테이블 다중 조인 (골프장 기출 표준)",
            desc: "수강신청 내역과 회원 정보, 강사 정보를 3자 조인하여 강사별 총 수강 수입액을 산출",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 골프연습장 강사별 수강료 수입 통계】
골프연습장 시스템의 강사 테이블(tbl_teacher_202201), 수강신청 테이블(tbl_class_202201), 회원 테이블(tbl_member_202201)을 3자 조인하여 다음 통계 보고서를 출력하시오.

1) 조회 항목: 강사코드(teacher_code), 강사명(teacher_name), 강의명(class_name), 해당 강사의 총 수강료 수입 합계(total_tuition)
2) 정렬: 총 수강료 수입이 높은 순서(내림차순 DESC)로 정렬할 것`,
            goal: "실제 공단 기출 4대 도메인에서 빈출되는 3개 테이블 연쇄 조인(1:N:M 관계 해석) 및 다차원 그룹 집계 능력을 평가합니다.",
            tip: "수강신청(class) 테이블을 중심으로 회원(member)과 강사(teacher) 테이블을 연속해서 조인하는 고급 기출 패턴입니다.",
            code: `SELECT t.teacher_code, t.teacher_name, t.class_name,
       SUM(c.tuition) AS total_tuition
FROM tbl_teacher_202201 t
INNER JOIN tbl_class_202201 c ON t.teacher_code = c.teacher_code
INNER JOIN tbl_member_202201 m ON c.c_no = m.c_no
GROUP BY t.teacher_code, t.teacher_name, t.class_name
ORDER BY total_tuition DESC;`,
            explanations: [
                { line: "INNER JOIN tbl_class_202201 c ON ...", desc: "1차 조인: 강사 테이블과 수강신청 테이블을 강사코드로 연결합니다." },
                { line: "INNER JOIN tbl_member_202201 m ON ...", desc: "2차 조인: 수강신청 테이블과 회원 테이블을 회원번호로 연결합니다." },
                { line: "SUM(c.tuition) AS total_tuition", desc: "수강신청 테이블(c)에 저장된 실제 결제 수강료(VIP 50% 할인 반영 금액)의 합계를 계산합니다." }
            ]
        },
        {
            id: "sql-subquery-scalar-filter",
            cat: "JOIN",
            category: "6. JOIN & 서브쿼리",
            title: "20. 평균 매출액 초과 우수 고객 (중첩 서브쿼리)",
            desc: "전체 회원의 평균 구매액보다 더 많은 금액을 구매한 최우수 고객 레코드만 선별",
            examPrompt: `【실제 시험 출제 문제 / 요구조건 - 평균 초과 매출 분석】
매출 테이블(money_tbl_02)에서 전체 판매 건의 평균 판매금액(AVG(price))보다 더 큰 금액으로 구매한 판매 건을 조회하시오.

1) 조회 항목: 회원번호(custno), 판매번호(saleno), 판매금액(price)
2) 필수 조건: WHERE 절에 서브쿼리(Subquery)를 사용하여 동적으로 계산된 평균과 비교할 것
3) 정렬: 판매금액 내림차순(DESC)`,
            goal: "단일행 서브쿼리를 작성하여 동적으로 계산된 집계값과 외부 메인 쿼리를 비교하는 고급 DQL 작성 능력을 평가합니다.",
            tip: "WHERE 절 안에 괄호 ()로 묶인 단일행 서브쿼리를 작성하여 동적으로 계산된 평균값과 비교합니다.",
            code: `SELECT custno, saleno, price
FROM money_tbl_02
WHERE price > (
    SELECT AVG(price)
    FROM money_tbl_02
)
ORDER BY price DESC;`,
            explanations: [
                { line: "(SELECT AVG(price) FROM money_tbl_02)", desc: "서브쿼리: 전체 판매 건의 평균 단가를 단일 숫자로 먼저 계산합니다." },
                { line: "WHERE price > (...) ", desc: "메인쿼리: 각 판매 건의 금액이 계산된 평균 금액보다 큰 행만 선별합니다." }
            ]
        }
    ],

    // 2-4. 이클립스와 MySQL 연동 (JDBC)
    jdbc: [
        {
            id: "jdbc-dbutil",
            title: "1. DB 연결 유틸리티 클래스 (DBConnection.java)",
            desc: "MySQL JDBC 드라이버 로드 및 데이터베이스 Connection 객체를 반환하는 공통 클래스",
            examPrompt: `【실제 시험 개발 요구조건】
이클립스 웹 프로젝트에서 MySQL 데이터베이스(swl5_db, 포트 3306)에 연결할 수 있도록,
공통 DB 연결 클래스(DBConnection.java)의 getConnection() 정적(static) 메서드를 작성하시오.
- 드라이버: com.mysql.cj.jdbc.Driver
- URL 파라미터: useSSL=false, serverTimezone=UTC, characterEncoding=UTF-8 포함할 것`,
            goal: "JDBC 4단계 연결 절차(드라이버 로딩 ➡️ 커넥션 생성 ➡️ 예외처리)를 정적 공통 메서드로 모듈화하는 능력을 평가합니다.",
            tip: "static 메서드로 정의하여 어디서든 'DBConnection.getConnection()'으로 간편하게 호출할 수 있게 만듭니다.",
            code: `package common;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    public static Connection getConnection() {
        Connection conn = null;
        try {
            // 1. MySQL 8.x 이상 드라이버 로딩
            Class.forName("com.mysql.cj.jdbc.Driver");
            
            // 2. DB 접속 URL, 계정, 비밀번호 설정
            String url = "jdbc:mysql://localhost:3306/swl5_db?useSSL=false&serverTimezone=UTC&characterEncoding=UTF-8";
            String user = "root";
            String pass = "1234";
            
            // 3. 커넥션 연결 객체 생성
            conn = DriverManager.getConnection(url, user, pass);
            System.out.println("✅ DB 연결 성공!");
        } catch (Exception e) {
            System.err.println("❌ DB 연결 실패: " + e.getMessage());
            e.printStackTrace();
        }
        return conn;
    }
}`,
            explanations: [
                { line: "Class.forName(\"com.mysql.cj.jdbc.Driver\")", desc: "MySQL JDBC 드라이버 클래스를 메모리에 동적으로 로딩합니다. (MySQL 5.x는 com.mysql.jdbc.Driver)" },
                { line: "String url = \"jdbc:mysql://...\"", desc: "JDBC URL 프로토콜입니다. 호스트(localhost), 포트(3306), DB명(swl5_db) 및 인코딩 옵션을 지정합니다." },
                { line: "DriverManager.getConnection(url, user, pass)", desc: "지정된 접속 정보로 데이터베이스에 로그인하여 실제 Connection 세션을 맺습니다." },
                { line: "try-catch (Exception e)", desc: "드라이버 미설치(ClassNotFoundException) 또는 비번 오류 등 접속 실패 시 예외를 잡아 프로그램 중단을 방지합니다." }
            ]
        },
        {
            id: "jdbc-test",
            title: "2. DB 연결 테스트 실행 코드 (TestMain.java)",
            desc: "이클립스 콘솔에서 실제 DB 연결이 정상인지 바로 확인하는 독립 테스트 실행기",
            examPrompt: `【실제 시험 개발 요구조건】
DBConnection 클래스를 호출하여 실제 MySQL 서버와 연결이 정상적으로 맺어지는지 이클립스 Console 창에서 확인하는 Java Application 테스트 코드를 작성하시오.`,
            goal: "웹 서버(Tomcat) 구동 전에 DB 접속 가능 여부를 콘솔에서 독립적으로 사전 검증하는 디버깅 역량을 평가합니다.",
            tip: "실기 시험 시작 직후 가장 먼저 이 테스트를 돌려 초록색 성공 메시지를 확인해야 합니다.",
            code: `package common;

import java.sql.Connection;

public class TestMain {
    public static void main(String[] args) {
        Connection conn = DBConnection.getConnection();
        if (conn != null) {
            System.out.println("🎉 축하합니다! 이클립스와 MySQL이 완벽하게 연동되었습니다.");
            try {
                conn.close(); // 자원 반납
            } catch (Exception ignored) {}
        } else {
            System.out.println("⚠️ DB 연결 객체가 null입니다. 포트와 비밀번호를 점검하세요.");
        }
    }
}`,
            explanations: [
                { line: "Connection conn = DBConnection.getConnection();", desc: "앞서 만든 공통 연결 메서드를 호출하여 세션을 얻어옵니다." },
                { line: "conn.close()", desc: "테스트가 끝난 후 사용한 데이터베이스 커넥션 자원을 메모리에서 안전하게 반납합니다." }
            ]
        }
    ],

    // 2-5. 계층별 코드 구현 (기초 JSP/HTML 8제 + 실전 MVC 6제 = 총 14제)
    codeModules: [
        // ==========================================
        // [입문 1단계] JSP & HTML 핵심 문법 따라치기 (8제)
        // ==========================================
        {
            id: "code-basic-page-directive",
            step: "기초 1",
            category: "1. JSP 기초 문법",
            title: "JSP 인코딩 지시자 (<%@ page %>)",
            desc: "서버가 JSP를 컴파일할 때 UTF-8 문자셋을 적용하도록 지시하여 브라우저 한글 깨짐을 방지하는 필수 선언문",
            examPrompt: `【기초 문법 훈련 1 - 페이지 인코딩 설정】
모든 JSP 파일의 맨 첫 줄(1행)에 반드시 작성해야 하는 표준 페이지 지시자를 작성하시오.
- 언어: java
- 문서 타입: text/html
- 문자셋(charset) 및 페이지 인코딩: UTF-8`,
            goal: "JSP 지시자(Directive)의 기본 문법 구문과 속성(language, contentType, pageEncoding)의 올바른 철자를 습득합니다.",
            tip: "이 지시자가 누락되거나 철자가 틀리면 한글이 깨지거나 브라우저에서 다운로드 창이 뜰 수 있습니다.",
            code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>`,
            explanations: [
                { line: "<%@ page ... %>", desc: "JSP 지시자 태그로, 서블릿 컨테이너에 현재 페이지의 전역 처리 환경을 지시합니다." },
                { line: "contentType=\"text/html; charset=UTF-8\"", desc: "브라우저에게 응답할 MIME 타입과 인코딩이 UTF-8임을 HTTP 헤더로 알립니다." },
                { line: "pageEncoding=\"UTF-8\"", desc: "JSP 소스 파일 자체를 읽어 들일 때 UTF-8 인코딩으로 해석하도록 지정합니다." }
            ]
        },
        {
            id: "code-basic-page-import",
            step: "기초 2",
            category: "1. JSP 기초 문법",
            title: "클래스 임포트 지시자 (<%@ page import %>)",
            desc: "외부 패키지에 있는 자바 클래스(DTO, DAO, List, Connection 등)를 JSP 안에서 사용할 수 있도록 임포트",
            examPrompt: `【기초 문법 훈련 2 - 패키지 클래스 임포트】
JSP 페이지 상단에 다음 자바 클래스들을 한 번에 불러오는 page import 지시자를 작성하시오.
1) 자바 표준 유틸 리스트: java.util.List
2) 모델 패키지의 회원 DTO: model.MemberDTO
3) DAO 패키지의 회원 DAO: dao.MemberDAO`,
            goal: "콤마(,)를 사용해 여러 클래스를 한 줄로 임포트하거나 개별 임포트 지시자를 작성하는 문법을 익힙니다.",
            tip: "콤마(,)로 여러 클래스를 구분하여 한 줄에 깔끔하게 선언할 수 있습니다.",
            code: `<%@ page import="java.util.List, model.MemberDTO, dao.MemberDAO" %>`,
            explanations: [
                { line: "import=\"java.util.List, ...\"", desc: "자바의 import 구문과 동일하게 패키지 경로를 지정하여 클래스를 가져옵니다." },
                { line: ", (쉼표)", desc: "여러 클래스를 한 번에 임포트할 때 콤마로 구분하여 나열합니다." }
            ]
        },
        {
            id: "code-basic-encoding-param",
            step: "기초 3",
            category: "1. JSP 기초 문법",
            title: "POST 한글 인코딩 & 파라미터 수신 (request)",
            desc: "클라이언트 폼(Form)에서 넘어온 한글 데이터를 깨짐 없이 수신하고 문자열과 정수형으로 추출",
            examPrompt: `【기초 문법 훈련 3 - 요청 데이터 수신】
사용자가 전송한 회원성명(custname)과 회원번호(custno)를 수신하는 스크립틀릿 로직을 작성하시오.
1) 가장 먼저 요청 본문의 인코딩을 UTF-8로 지정할 것
2) 'custname' 파라미터를 문자열 변수에 저장할 것
3) 'custno' 파라미터를 정수형(int)으로 형변환하여 변수에 저장할 것`,
            goal: "request 내장 객체의 setCharacterEncoding과 getParameter, Integer.parseInt 형변환 문법을 마스터합니다.",
            tip: "setCharacterEncoding은 무조건 getParameter()보다 먼저 실행되어야 한글이 안 깨집니다!",
            code: `<%
    request.setCharacterEncoding("UTF-8");
    String custname = request.getParameter("custname");
    int custno = Integer.parseInt(request.getParameter("custno"));
%>`,
            explanations: [
                { line: "request.setCharacterEncoding(\"UTF-8\");", desc: "요청 바디의 문자 인코딩을 UTF-8로 강제 지정합니다." },
                { line: "String custname = request.getParameter(\"custname\");", desc: "input name=\"custname\"에 입력된 문자열 값을 추출합니다." },
                { line: "Integer.parseInt(...) ", desc: "getParameter()는 무조건 String을 반환하므로 숫자는 int로 파싱해야 합니다." }
            ]
        },
        {
            id: "code-basic-scriptlet-for",
            step: "기초 4",
            category: "1. JSP 기초 문법",
            title: "목록 동적 반복문 (Scriptlet for 루프)",
            desc: "자바 List에 담긴 DTO 객체들을 향상된 for 루프로 순회하며 HTML 테이블 행을 동적으로 생성",
            examPrompt: `【기초 문법 훈련 4 - 동적 테이블 행 반복】
회원 리스트(List<MemberDTO> list)를 향상된 for 루프로 순회하며 <tr> 행을 동적으로 생성하는 스크립틀릿 태그 분할 구문을 작성하시오.
- 행 내부에는 빈 <td></td> 칸 1개만 포함할 것`,
            goal: "JSP 태그 (<%와 %>)를 열고 닫으며 HTML 태그를 감싸는 스크립틀릿 루프의 블록 구조를 이해합니다.",
            tip: "여는 중괄호 { 와 닫는 중괄호 } 를 각각 별도의 <% %> 블록으로 감싸는 것이 JSP 반복문의 핵심입니다.",
            code: `<%
    for (MemberDTO m : list) {
%>
    <tr>
        <td></td>
    </tr>
<%
    }
%>`,
            explanations: [
                { line: "<% for (MemberDTO m : list) { %>", desc: "리스트의 요소 개수만큼 순회하는 자바 for 루프를 시작합니다." },
                { line: "<tr><td></td></tr>", desc: "루프 1회당 1개씩 복제되어 출력될 순수 HTML 태그입니다." },
                { line: "<% } %>", desc: "for 루프의 닫는 중괄호를 스크립틀릿 태그로 닫아줍니다." }
            ]
        },
        {
            id: "code-basic-expression-output",
            step: "기초 5",
            category: "1. JSP 기초 문법",
            title: "표현식 인라인 화면 출력 (<%= %>)",
            desc: "JSP 표현식 태그를 사용하여 객체의 Getter 메서드 리턴값을 HTML 테이블 셀(<td>) 안에 직접 출력",
            examPrompt: `【기초 문법 훈련 5 - 표현식 출력】
현재 루프 중인 회원 객체(m)의 Getter 메서드를 호출하여 HTML <td> 셀 안에 값을 인라인 출력하시오.
1) 회원성명 (m.getCustname())
2) 회원전화 (m.getPhone())
* 주의: 세미콜론(;)을 붙이지 말 것!`,
            goal: "JSP 표현식 태그 <%= %> 문법과 세미콜론 금지 원칙을 체득합니다.",
            tip: "<%= 변수 %> 안에는 절대 세미콜론(;)을 붙이지 않습니다. out.print()로 자동 치환되기 때문입니다.",
            code: `<td><%= m.getCustname() %></td>
<td><%= m.getPhone() %></td>`,
            explanations: [
                { line: "<%= m.getCustname() %>", desc: "내부적으로 out.print(m.getCustname())으로 실행되어 성명을 HTML 셀에 출력합니다." },
                { line: "세미콜론(;) 생략", desc: "표현식 태그 내부에는 문장의 종결자(;)를 붙이지 않는 것이 표준 문법 규칙입니다." }
            ]
        },
        {
            id: "code-basic-form-validation",
            step: "기초 6",
            category: "2. HTML & JavaScript 기초",
            title: "입력 폼과 유효성 검사 연결 (<form onsubmit>)",
            desc: "POST 방식으로 대상 액션 페이지를 지정하고, 전송 전 JS 유효성 검사 함수 check()를 호출하여 검증",
            examPrompt: `【기초 문법 훈련 6 - Form 태그 선언】
다음 조건에 부합하는 HTML <form> 태그의 시작과 끝을 작성하시오.
- 폼 이름: frm
- 전송 방식: post
- 전송 목적지(action): insert_action.jsp
- 전송 전 검증: onsubmit 이벤트에 check() 함수를 연결하여 false 반환 시 전송 취소 처리할 것`,
            goal: "HTML form 태그의 4대 필수 속성(name, method, action, onsubmit)을 정확히 기술하는 능력을 배양합니다.",
            tip: "onsubmit=\"return check();\" 에서 반드시 'return' 키워드를 포함해야 유효성 실패 시 전송이 차단됩니다.",
            code: `<form name="frm" method="post" action="insert_action.jsp" onsubmit="return check();">
    <!-- 입력 필드 배치 -->
</form>`,
            explanations: [
                { line: "method=\"post\"", desc: "데이터를 URL 주소창이 아닌 HTTP 바디에 숨겨 안전하게 전송합니다." },
                { line: "action=\"insert_action.jsp\"", desc: "전송 버튼을 눌렀을 때 데이터를 수신하여 처리할 서버 측 JSP 파일명입니다." },
                { line: "onsubmit=\"return check();\"", desc: "check()가 false를 반환하면 브라우저의 기본 submit 동작을 취소합니다." }
            ]
        },
        {
            id: "code-basic-table-layout",
            step: "기초 7",
            category: "2. HTML & JavaScript 기초",
            title: "격자 테이블과 Readonly 입력창 (Table & Input)",
            desc: "시험지 양식에 맞춘 1행 2열 테이블과 자동 채번되어 수정 불가한 readonly 텍스트박스 작성",
            examPrompt: `【기초 문법 훈련 7 - 표 구조와 읽기전용 인풋】
테두리 선(border="1")이 있는 테이블 안에 아래 명세의 1개 행(tr)을 작성하시오.
- <th>: '회원번호(자동발생)'
- <td>: 텍스트 입력창(type="text"), 이름(name)은 'custno', 기본값(value)은 '100001', 사용자가 수정할 수 없도록 'readonly' 처리`,
            goal: "HTML 테이블 행/제목/데이터 태그와 input 태그의 readonly 속성 사용법을 학습합니다.",
            tip: "disabled는 폼 전송 시 값이 서버로 안 넘어가지만, readonly는 정상 전송됩니다.",
            code: `<table border="1">
    <tr>
        <th>회원번호(자동발생)</th>
        <td><input type="text" name="custno" value="100001" readonly></td>
    </tr>
</table>`,
            explanations: [
                { line: "<th>회원번호(자동발생)</th>", desc: "굵은 글씨와 가운데 정렬이 자동 적용되는 테이블 헤더 칸입니다." },
                { line: "<input type=\"text\" name=\"custno\" ...>", desc: "서버에서 request.getParameter(\"custno\")로 읽어 들일 입력 필드입니다." },
                { line: "readonly", desc: "키보드 타이핑 수정을 금지하되, 폼 전송 시 서버로 파라미터 값은 정상 전송되도록 합니다." }
            ]
        },
        {
            id: "code-basic-js-check",
            step: "기초 8",
            category: "2. HTML & JavaScript 기초",
            title: "공백 검사 & alert 경고 & focus 이동 (check 함수)",
            desc: "필수 입력값이 비어있을 때 alert 메시지를 띄우고 커서를 포커스 이동시킨 후 전송을 취소하는 함수",
            examPrompt: `【기초 문법 훈련 8 - 자바스크립트 유효성 검사 함수】
회원성명 입력창(f.custname)이 공백이거나 비어있을 때 검증하는 JavaScript check() 함수를 작성하시오.
1) 앞뒤 공백 제거(trim()) 후 빈 문자열("")인지 검사
2) 비어있다면 "회원성명이 입력되지 않았습니다." 경고창(alert) 띄우기
3) 해당 입력창으로 커서(focus()) 이동시키기
4) 폼 전송 취소를 위해 false 반환하기`,
            goal: "실기 시험 채점에서 5~10점 감점을 방지하는 필수 유효성 검사 JS 3단 콤보(trim, alert, focus)를 숙달합니다.",
            tip: "실기 채점관이 등록 버튼을 눌러 가장 먼저 확인하는 기능이 바로 이 alert과 커서 focus 이동입니다.",
            code: `function check() {
    var f = document.frm;
    if (f.custname.value.trim() == "") {
        alert("회원성명이 입력되지 않았습니다.");
        f.custname.focus();
        return false;
    }
    return true;
}`,
            explanations: [
                { line: "var f = document.frm;", desc: "문서(DOM)에서 form name=\"frm\" 요소를 찾아 변수에 할당합니다." },
                { line: "if (f.custname.value.trim() == \"\")", desc: "스페이스바만 입력한 공백까지 trim()으로 제거하여 완벽하게 빈 입력을 감지합니다." },
                { line: "f.custname.focus(); return false;", desc: "해당 입력창으로 커서를 보내고 false를 리턴하여 폼 제출을 즉시 중단시킵니다." }
            ]
        },
        {
            id: "code-basic-radio-select",
            step: "기초 9",
            category: "2. HTML & JavaScript 기초",
            title: "라디오 버튼 & 셀렉트 박스 조건부 체크 (checked / selected)",
            desc: "수정 폼이나 등록 폼에서 기존 DB 값에 따라 라디오 버튼 또는 셀렉트 박스를 삼항 연산자로 자동 선택",
            examPrompt: `【기초 문법 훈련 9 - 조건부 선택 옵션】
기존 회원의 성별(gender 변수)과 거주도시(city 변수) 값에 맞추어 기본 선택 상태를 지정하는 HTML 태그를 작성하시오.
1) gender가 "M"이면 checked가 적용되는 남성 라디오 버튼
2) city가 "01"이면 selected가 적용되는 서울 option 태그 (셀렉트 박스 내부)`,
            goal: "JSP 표현식 삼항 연산자 <%= 조건 ? 'checked' : '' %>를 활용하여 기존 DB 상태를 폼 UI에 정확히 복원하는 능력을 배양합니다.",
            tip: "수정 화면(update.jsp)에서 기존 등급/성별/도시가 라디오/셀렉트박스일 때 반드시 이 삼항연산자 패턴을 써야 합니다.",
            code: `<input type="radio" name="gender" value="M" <%= "M".equals(gender) ? "checked" : "" %>> 남
<select name="city">
    <option value="01" <%= "01".equals(city) ? "selected" : "" %>>서울</option>
</select>`,
            explanations: [
                { line: "<%= \"M\".equals(gender) ? \"checked\" : \"\" %>", desc: "자바 삼항 연산자로 gender가 'M'과 일치하면 checked 속성을 출력하여 해당 라디오 버튼을 선택 상태로 만듭니다." },
                { line: "<%= \"01\".equals(city) ? \"selected\" : \"\" %>", desc: "city가 '01'과 일치하면 selected 속성을 출력하여 드롭다운 메뉴의 기본 선택 항목으로 지정합니다." }
            ]
        },
        {
            id: "code-basic-today-date",
            step: "기초 10",
            category: "1. JSP 기초 문법",
            title: "오늘 날짜 자동 포맷팅 및 기본값 세팅 (SimpleDateFormat)",
            desc: "등록 화면 로드 시 오늘 날짜(YYYY-MM-DD)를 자바 Date 및 SimpleDateFormat으로 포맷팅하여 가입일자 기본값으로 출력",
            examPrompt: `【기초 문법 훈련 10 - 가입일자 자동 생성】
등록 화면의 가입일자 입력창에 오늘 날짜(예: 2026-09-17)가 자동으로 들어가도록 자바 Date와 SimpleDateFormat을 사용하는 JSP 코드를 작성하시오.
1) java.util.Date와 java.text.SimpleDateFormat 임포트
2) "yyyy-MM-dd" 형식으로 오늘 날짜 문자열(today) 생성
3) input value에 표현식으로 출력`,
            goal: "JSP 상단에서 오늘 날짜를 포맷팅하여 입력창의 value에 바인딩하는 시험장 필수 자바 유틸리티 활용법을 체득합니다.",
            tip: "날짜 포맷 대소문자에 주의하세요: 년도는 소문자 yyyy, 월은 대문자 MM, 일은 소문자 dd입니다.",
            code: `<%@ page import="java.util.Date, java.text.SimpleDateFormat" %>
<%
    Date now = new Date();
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    String today = sdf.format(now);
%>
<input type="text" name="joindate" value="<%= today %>">`,
            explanations: [
                { line: "SimpleDateFormat(\"yyyy-MM-dd\")", desc: "연 4자리, 월 2자리(대문자 MM), 일 2자리의 표준 날짜 문자열 포맷터를 생성합니다." },
                { line: "String today = sdf.format(now);", desc: "현재 시스템 시각(Date)을 '2026-09-17' 형태의 문자열로 변환합니다." },
                { line: "<input value=\"<%= today %>\">", desc: "포맷팅된 오늘 날짜를 가입일자 텍스트 입력 필드의 기본값으로 출력합니다." }
            ]
        },

        // ==========================================
        // [실전 2단계] 기출 홈쇼핑 종합 MVC 풀코드 (Step 1 ~ 9)
        // ==========================================
        {
            id: "code-dto",
            step: "실전 1",
            category: "Model (데이터 전달 객체)",
            title: "MemberDTO.java (회원 데이터 바인딩 클래스)",
            desc: "DB 테이블의 한 행(Row)을 자바 객체로 캡슐화하여 계층 간 안전하게 전달하는 DTO 클래스",
            examPrompt: `【실제 시험 개발 요구조건】
member_tbl_02 테이블의 7개 컬럼(custno, custname, phone, address, joindate, grade, city)을 바인딩할 MemberDTO 클래스를 작성하시오.
- 모든 멤버 변수는 private으로 은닉할 것
- 기본 생성자를 제공할 것
- 모든 변수에 대해 public Getter 및 Setter 메서드를 작성할 것`,
            goal: "객체지향 캡슐화(정보 은닉) 원칙에 따라 데이터 전달 객체(DTO)를 선언하고 접근자/설정자를 작성하는 능력을 평가합니다.",
            tip: "모든 필드는 반드시 private으로 선언하고, public Getter/Setter를 만들어야 정보 은닉(캡슐화)이 완성됩니다.",
            code: `package model;

import java.sql.Date;

public class MemberDTO {
    // 1. 테이블 컬럼과 1:1 매핑되는 private 멤버 변수
    private int custno;
    private String custname;
    private String phone;
    private String address;
    private Date joindate;
    private String grade;
    private String city;

    // 2. 기본 생성자
    public MemberDTO() {}

    // 3. Getter & Setter 메서드
    public int getCustno() { return custno; }
    public void setCustno(int custno) { this.custno = custno; }

    public String getCustname() { return custname; }
    public void setCustname(String custname) { this.custname = custname; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public Date getJoindate() { return joindate; }
    public void setJoindate(Date joindate) { this.joindate = joindate; }

    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }
}`,
            explanations: [
                { line: "private int custno;", desc: "외부에서 객체 멤버에 직접 접근하지 못하도록 private 접근제어자를 선언합니다 (정보 은닉)." },
                { line: "public MemberDTO() {}", desc: "프레임워크나 서블릿에서 인스턴스를 기본 생성할 수 있도록 매개변수 없는 기본 생성자를 제공합니다." },
                { line: "public void setCustname(String custname)", desc: "Setter: 매개변수로 전달받은 성명을 멤버 변수 this.custname에 저장합니다." },
                { line: "public String getCustname()", desc: "Getter: 저장된 회원 성명을 호출자에게 반환합니다." }
            ]
        },
        {
            id: "code-dao-insert",
            step: "실전 2",
            category: "Model (데이터베이스 접근 객체)",
            title: "MemberDAO.java - 회원 등록 메서드 (insertMember)",
            desc: "PreparedStatement를 사용하여 회원 정보를 DB에 안전하게 INSERT하는 데이터베이스 처리 메서드",
            examPrompt: `【실제 시험 개발 요구조건】
화면에서 전달받은 MemberDTO 객체를 데이터베이스 member_tbl_02 테이블에 INSERT하는 MemberDAO 클래스의 insertMember(MemberDTO dto) 메서드를 작성하시오.
- PreparedStatement를 사용하여 SQL Injection을 방지할 것
- finally 블록에서 pstmt와 conn 자원을 안전하게 해제(close)할 것`,
            goal: "JDBC PreparedStatement 바인딩(1번 인덱스 시작), executeUpdate() 실행 및 자원 반납(close) 원리를 평가합니다.",
            tip: "PreparedStatement의 물음표(?) 파라미터 번호는 배열과 달리 0이 아니라 1부터 시작한다는 점을 명심하세요!",
            code: `package dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import common.DBConnection;
import model.MemberDTO;

public class MemberDAO {
    // 신규 회원 등록
    public int insertMember(MemberDTO dto) {
        int result = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        
        String sql = "INSERT INTO member_tbl_02 VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        try {
            conn = DBConnection.getConnection();
            pstmt = conn.prepareStatement(sql);
            
            // 물음표(?) 바인딩 (1부터 시작!)
            pstmt.setInt(1, dto.getCustno());
            pstmt.setString(2, dto.getCustname());
            pstmt.setString(3, dto.getPhone());
            pstmt.setString(4, dto.getAddress());
            pstmt.setDate(5, dto.getJoindate());
            pstmt.setString(6, dto.getGrade());
            pstmt.setString(7, dto.getCity());
            
            // SQL 실행 (영향받은 행 수 반환)
            result = pstmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // 자원 반납
            try { if (pstmt != null) pstmt.close(); } catch (Exception ignored) {}
            try { if (conn != null) conn.close(); } catch (Exception ignored) {}
        }
        return result;
    }
}`,
            explanations: [
                { line: "PreparedStatement pstmt = conn.prepareStatement(sql);", desc: "SQL 템플릿을 미리 컴파일하여 SQL Injection을 원천 방지하고 성능을 향상시킵니다." },
                { line: "pstmt.setInt(1, dto.getCustno());", desc: "첫 번째 물음표(?)에 정수형 회원번호를 바인딩합니다." },
                { line: "pstmt.setString(2, dto.getCustname());", desc: "두 번째 물음표(?)에 문자열 회원 성명을 바인딩합니다." },
                { line: "result = pstmt.executeUpdate();", desc: "INSERT/UPDATE/DELETE 문은 executeUpdate()로 실행하며, 변경된 행의 개수(성공 시 1)를 반환합니다." },
                { line: "finally { pstmt.close(); conn.close(); }", desc: "에러 발생 여부와 상관없이 항상 DB 리소스를 닫아 커넥션 풀 누수를 방지합니다." }
            ]
        },
        {
            id: "code-dao-select",
            step: "실전 3",
            category: "Model (데이터베이스 접근 객체)",
            title: "MemberDAO.java - 전체 회원 목록 조회 (selectAll)",
            desc: "등록된 모든 회원을 가입일자 또는 회원번호 순으로 조회하여 ArrayList<MemberDTO> 목록으로 반환",
            examPrompt: `【실제 시험 개발 요구조건】
member_tbl_02 테이블의 모든 회원 레코드를 회원번호 오름차순으로 조회하여 List<MemberDTO> 컬렉션으로 반환하는 selectAll() 메서드를 작성하시오.`,
            goal: "executeQuery() 실행 후 ResultSet 커서 이동 while(rs.next()) 루프를 통해 한 행씩 DTO에 담아 리스트로 조립하는 능력을 평가합니다.",
            tip: "조회문은 executeQuery()를 호출하며, ResultSet의 while(rs.next()) 루프로 각 행을 추출합니다.",
            code: `    // 전체 회원 목록 조회
    public java.util.List<MemberDTO> selectAll() {
        java.util.List<MemberDTO> list = new java.util.ArrayList<>();
        Connection conn = null;
        PreparedStatement pstmt = null;
        java.sql.ResultSet rs = null;
        
        String sql = "SELECT custno, custname, phone, address, joindate, grade, city "
                   + "FROM member_tbl_02 ORDER BY custno ASC";
        
        try {
            conn = DBConnection.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery(); // 조회 실행
            
            while (rs.next()) {
                MemberDTO dto = new MemberDTO();
                dto.setCustno(rs.getInt("custno"));
                dto.setCustname(rs.getString("custname"));
                dto.setPhone(rs.getString("phone"));
                dto.setAddress(rs.getString("address"));
                dto.setJoindate(rs.getDate("joindate"));
                dto.setGrade(rs.getString("grade"));
                dto.setCity(rs.getString("city"));
                
                list.add(dto); // 리스트에 추가
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (rs != null) rs.close(); } catch (Exception ignored) {}
            try { if (pstmt != null) pstmt.close(); } catch (Exception ignored) {}
            try { if (conn != null) conn.close(); } catch (Exception ignored) {}
        }
        return list;
    }`,
            explanations: [
                { line: "rs = pstmt.executeQuery();", desc: "SELECT 쿼리를 실행하여 결과 집합(ResultSet)을 획득합니다." },
                { line: "while (rs.next())", desc: "커서를 다음 행으로 이동시키며 읽을 데이터가 존재할 때까지 true를 반환합니다." },
                { line: "dto.setCustname(rs.getString(\"custname\"));", desc: "현재 행에서 'custname' 컬럼의 문자열 값을 읽어 DTO 객체에 세팅합니다." },
                { line: "list.add(dto);", desc: "완성된 한 명의 회원 DTO를 전체 회원 목록 컬렉션에 추가합니다." }
            ]
        },
        {
            id: "code-dao-update-max",
            step: "실전 4",
            category: "Model (데이터베이스 접근 객체)",
            title: "MemberDAO.java - 자동 채번 & 회원 수정 메서드 (getNextCustno & updateMember)",
            desc: "DB에서 마지막 회원번호+1을 조회하는 getNextCustno()와 기존 회원 정보를 갱신하는 updateMember() 메서드",
            examPrompt: `【실제 시험 개발 요구조건 - 자동 채번 및 회원 수정 메서드】
MemberDAO 클래스에 다음 두 개의 핵심 비즈니스 메서드를 추가 작성하시오.
1) getNextCustno(): member_tbl_02 테이블에서 MAX(custno)+1을 조회하여 반환 (데이터가 0건일 경우 100001 반환)
2) updateMember(MemberDTO dto): 수정 화면에서 전달받은 DTO 객체의 정보로 custno 기준 행을 갱신(UPDATE)하고 영향받은 행 수(1)를 반환`,
            goal: "IFNULL(MAX(custno), 100000)+1 단일 결과 조회 로직과 UPDATE 쿼리 바인딩 및 executeUpdate() 실행을 완벽히 구현합니다.",
            tip: "UPDATE 쿼리 작성 시 WHERE custno = ? 절을 절대 누락하지 마세요. 누락 시 전 회원의 정보가 동일하게 덮어써집니다!",
            code: `    // 1. 마지막 회원번호 + 1 자동 채번
    public int getNextCustno() {
        int nextNo = 100001;
        Connection conn = null;
        PreparedStatement pstmt = null;
        java.sql.ResultSet rs = null;
        String sql = "SELECT IFNULL(MAX(custno), 100000) + 1 FROM member_tbl_02";
        
        try {
            conn = DBConnection.getConnection();
            pstmt = conn.prepareStatement(sql);
            rs = pstmt.executeQuery();
            if (rs.next()) {
                nextNo = rs.getInt(1);
            }
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (rs != null) rs.close(); } catch (Exception ignored) {}
            try { if (pstmt != null) pstmt.close(); } catch (Exception ignored) {}
            try { if (conn != null) conn.close(); } catch (Exception ignored) {}
        }
        return nextNo;
    }

    // 2. 회원 정보 수정 (UPDATE)
    public int updateMember(MemberDTO dto) {
        int result = 0;
        Connection conn = null;
        PreparedStatement pstmt = null;
        String sql = "UPDATE member_tbl_02 SET custname=?, phone=?, address=?, "
                   + "joindate=?, grade=?, city=? WHERE custno=?";
        
        try {
            conn = DBConnection.getConnection();
            pstmt = conn.prepareStatement(sql);
            pstmt.setString(1, dto.getCustname());
            pstmt.setString(2, dto.getPhone());
            pstmt.setString(3, dto.getAddress());
            pstmt.setDate(4, dto.getJoindate());
            pstmt.setString(5, dto.getGrade());
            pstmt.setString(6, dto.getCity());
            pstmt.setInt(7, dto.getCustno());
            
            result = pstmt.executeUpdate();
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            try { if (pstmt != null) pstmt.close(); } catch (Exception ignored) {}
            try { if (conn != null) conn.close(); } catch (Exception ignored) {}
        }
        return result;
    }`,
            explanations: [
                { line: "SELECT IFNULL(MAX(custno), 100000) + 1", desc: "회원이 한 명도 없을 때(NULL) 기본값 100000을 부여한 뒤 +1하여 최초 번호 100001을 안전하게 반환합니다." },
                { line: "if (rs.next()) nextNo = rs.getInt(1);", desc: "단일 집계 쿼리이므로 if(rs.next())로 첫 번째 컬럼의 정수값을 읽어옵니다." },
                { line: "WHERE custno=?", desc: "특정 회원 한 명의 정보만 선별 수정하기 위한 필수 기본키 조건절입니다." },
                { line: "pstmt.setInt(7, dto.getCustno());", desc: "WHERE 절의 7번째 물음표(?)에 기준 회원번호를 바인딩합니다." }
            ]
        },
        {
            id: "code-jsp-insert",
            step: "실전 5",
            category: "View & JavaScript (입력 화면 & 유효성 검사)",
            title: "member_insert.jsp (자동 채번 연동 등록 폼 & 유효성 검사)",
            desc: "DAO에서 자동 채번된 번호를 받아와 readonly로 표시하고 필수 입력값 누락 시 alert 및 focus를 실행하는 check() 스크립트",
            examPrompt: `【실제 시험 개발 요구조건 - 회원등록 화면 및 유효성 검사】
회원 정보를 입력받는 member_insert.jsp 화면을 구축하시오.
1) 화면 상단에서 MemberDAO의 getNextCustno()를 호출하여 다음 회원번호를 자동 세팅하고 수정 불가(readonly) 처리할 것
2) [등록] 버튼 클릭 시 JavaScript check() 함수를 호출하여 필수 입력값(성명, 전화, 주소)이 비어있을 경우:
   - "회원성명이 입력되지 않았습니다." 경고창(alert)을 띄우고
   - 해당 입력창으로 커서(focus)를 이동시킨 뒤 폼 전송을 취소할 것 (return false)`,
            goal: "DAO 연동을 통한 자동 채번 번호 바인딩 및 JavaScript 유효성 검사 3단 콤보(공백 체크, alert, focus) 구현 능력을 평가합니다.",
            tip: "실기 시험 채점 시 유효성 검사 alert 미작성은 5점~10점 감점 요인입니다. 반드시 form onsubmit='return check()'를 작성해야 합니다.",
            code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="dao.MemberDAO" %>
<%
    MemberDAO dao = new MemberDAO();
    int nextCustno = dao.getNextCustno(); // DB에서 MAX+1 자동 채번
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원등록</title>
<script>
function check() {
    var f = document.frm;
    if (f.custname.value.trim() == "") {
        alert("회원성명이 입력되지 않았습니다.");
        f.custname.focus();
        return false;
    }
    if (f.phone.value.trim() == "") {
        alert("회원전화가 입력되지 않았습니다.");
        f.phone.focus();
        return false;
    }
    if (f.address.value.trim() == "") {
        alert("회원주소가 입력되지 않았습니다.");
        f.address.focus();
        return false;
    }
    alert("회원등록이 정상적으로 완료되었습니다!");
    return true; // 폼 제출 승인
}
</script>
</head>
<body>
    <h2>홈쇼핑 회원 등록</h2>
    <form name="frm" method="post" action="insert_action.jsp" onsubmit="return check();">
        <table border="1">
            <tr>
                <th>회원번호(자동발생)</th>
                <td><input type="text" name="custno" value="<%= nextCustno %>" readonly></td>
            </tr>
            <tr>
                <th>회원성명</th>
                <td><input type="text" name="custname"></td>
            </tr>
            <tr>
                <th>회원전화</th>
                <td><input type="text" name="phone"></td>
            </tr>
            <tr>
                <th>회원주소</th>
                <td><input type="text" name="address"></td>
            </tr>
            <tr>
                <th>가입일자</th>
                <td><input type="text" name="joindate" value="2026-09-17"></td>
            </tr>
            <tr>
                <th>고객등급(A:VIP,B:일반,C:직원)</th>
                <td><input type="text" name="grade" value="A"></td>
            </tr>
            <tr>
                <th>도시코드</th>
                <td><input type="text" name="city" value="01"></td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input type="submit" value="등록">
                    <input type="button" value="조회" onclick="location.href='member_list.jsp'">
                </td>
            </tr>
        </table>
    </form>
</body>
</html>`,
            explanations: [
                { line: "int nextCustno = dao.getNextCustno();", desc: "DAO를 호출하여 DB에서 가장 큰 회원번호+1을 자동으로 구해와 신규 회원에게 부여합니다." },
                { line: "value=\"<%= nextCustno %>\" readonly", desc: "자동 채번된 번호를 입력창에 출력하고 readonly로 잠가 시험지 요구조건을 완벽히 충족합니다." },
                { line: "<form name=\"frm\" method=\"post\" action=\"insert_action.jsp\" onsubmit=\"return check();\">", desc: "HTML Form 태그: post 방식으로 데이터를 HTTP Body에 담아 insert_action.jsp로 전송합니다. onsubmit='return check()'를 걸어 유효성 검사 함수가 false를 반환하면 전송을 차단(Submit 방지)합니다." },
                { line: "if (f.custname.value.trim() == \"\")", desc: "JavaScript trim(): 사용자가 스페이스 공백만 입력한 경우도 빈 값으로 간주하여 통과되지 않도록 방어합니다." },
                { line: "alert(\"회원성명이 입력되지 않았습니다.\");", desc: "JavaScript alert(): 시험 요구사항에 명시된 에러 메시지를 모달 경고창으로 띄웁니다 (문구 철자 일치 필수)." },
                { line: "f.custname.focus(); return false;", desc: "JavaScript focus(): 경고창 확인 후 사용자가 즉시 수정할 수 있도록 해당 텍스트 필드로 마우스 커서를 강제 이동시킵니다." },
                { line: "<input type=\"submit\" value=\"등록\">", desc: "Submit 버튼: 누르면 폼의 onsubmit 이벤트가 발동하며, 검증 통과 시 action 대상 페이지로 데이터를 전송합니다." }
            ]
        },
        {
            id: "code-jsp-action",
            step: "실전 6",
            category: "Controller (요청 처리 & 비즈니스 로직)",
            title: "insert_action.jsp (요청 파라미터 수신 및 DAO 저장)",
            desc: "POST로 전달된 한글 파라미터를 인코딩하고, DTO에 담아 DAO의 insertMember()를 호출한 뒤 목록으로 리다이렉트",
            examPrompt: `【실제 시험 개발 요구조건 - 등록 처리 액션】
member_insert.jsp에서 POST로 전송된 데이터를 수신하여 처리하는 insert_action.jsp를 작성하시오.
1) 한글 파라미터 깨짐을 방지하기 위해 최상단에 UTF-8 인코딩 처리를 할 것
2) 전달받은 파라미터를 DTO 객체에 바인딩하고 DAO의 insertMember(dto)를 호출할 것
3) 등록 성공 시 회원 목록 화면(member_list.jsp)으로 리다이렉트 이동시킬 것`,
            goal: "한글 UTF-8 인코딩, request.getParameter() 수신 및 형변환, DAO 호출 및 PRG(Post-Redirect-Get) 패턴 구현을 평가합니다.",
            tip: "최상단에 'request.setCharacterEncoding(\"UTF-8\")'을 작성하지 않으면 한글 이름과 주소가 깨져 '???'로 DB에 저장됩니다!",
            code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.sql.Date" %>
<%@ page import="model.MemberDTO" %>
<%@ page import="dao.MemberDAO" %>
<%
    // 1. 한글 파라미터 깨짐 방지 필수 설정
    request.setCharacterEncoding("UTF-8");

    // 2. 폼 파라미터 수신 및 형변환
    int custno = Integer.parseInt(request.getParameter("custno"));
    String custname = request.getParameter("custname");
    String phone = request.getParameter("phone");
    String address = request.getParameter("address");
    Date joindate = Date.valueOf(request.getParameter("joindate"));
    String grade = request.getParameter("grade");
    String city = request.getParameter("city");

    // 3. DTO 객체 바인딩
    MemberDTO dto = new MemberDTO();
    dto.setCustno(custno);
    dto.setCustname(custname);
    dto.setPhone(phone);
    dto.setAddress(address);
    dto.setJoindate(joindate);
    dto.setGrade(grade);
    dto.setCity(city);

    // 4. DAO 호출 및 DB 등록
    MemberDAO dao = new MemberDAO();
    int result = dao.insertMember(dto);

    // 5. 처리 결과에 따른 페이지 이동
    if (result > 0) {
        response.sendRedirect("member_list.jsp"); // 성공 시 목록 화면으로 이동
    } else {
%>
    <script>
        alert("회원 등록에 실패하였습니다.");
        history.back(); // 이전 입력 화면으로 복귀
    </script>
<%
    }
%>`,
            explanations: [
                { line: "<%@ page import=\"model.MemberDTO\" %>", desc: "JSP import 지시자: 자바의 import 문과 동일하게 다른 패키지에 있는 DTO, DAO, Date 클래스를 불러옵니다." },
                { line: "request.setCharacterEncoding(\"UTF-8\");", desc: "JSP 내장 객체 request: 클라이언트 요청 본문(Body)의 문자셋을 UTF-8로 지정합니다. getParameter() 호출 전에 작성해야 한글이 깨지지 않습니다." },
                { line: "Integer.parseInt(request.getParameter(\"custno\"))", desc: "request.getParameter()는 무조건 String을 반환하므로, DB 숫자형(int) 컬럼에 맞게 Integer.parseInt()로 형변환합니다." },
                { line: "Date.valueOf(request.getParameter(\"joindate\"))", desc: "'YYYY-MM-DD' 형식의 문자열을 JDBC 표준 java.sql.Date 객체로 변환합니다." },
                { line: "response.sendRedirect(\"member_list.jsp\");", desc: "JSP 내장 객체 response: 브라우저에 HTTP 302 리다이렉트 응답을 보내 페이지를 이동시킵니다 (새로고침 시 중복 INSERT 방지)." }
            ]
        },
        {
            id: "code-jsp-list",
            step: "실전 7",
            category: "View (회원 목록 및 등급 변환 출력)",
            title: "member_list.jsp (회원 목록 테이블 및 등급 코드 변환)",
            desc: "DAO에서 전체 회원을 받아와 테이블에 출력하고, A/B/C 영문 등급을 'VIP/일반/직원' 한글로 조건 변환",
            examPrompt: `【실제 시험 개발 요구조건 - 회원목록조회 및 등급 변환】
데이터베이스에 등록된 전체 회원을 조회하여 출력하는 member_list.jsp를 작성하시오.
1) MemberDAO의 selectAll()을 호출하여 회원 목록을 받아올 것
2) 테이블의 각 행에 회원번호, 성명, 전화번호, 주소, 가입일자, 등급, 도시코드를 출력할 것
3) 단, 고객등급(grade)은 영문 'A, B, C'가 아닌 'VIP, 일반, 직원' 한글 명칭으로 반드시 변환하여 출력할 것`,
            goal: "JSP 스크립틀릿 반복문을 통한 HTML 테이블 동적 렌더링 및 코드값 조건 변환 분기 처리 능력을 평가합니다.",
            tip: "고객등급(A/B/C)을 그대로 출력하면 감점됩니다. 문제 지문에 명시된 대로 한글 명칭으로 변환해야 합니다.",
            code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List" %>
<%@ page import="model.MemberDTO" %>
<%@ page import="dao.MemberDAO" %>
<%
    MemberDAO dao = new MemberDAO();
    List<MemberDTO> list = dao.selectAll();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원목록조회/수정</title>
</head>
<body>
    <h2>회원 목록 조회 / 수정</h2>
    <table border="1" style="width: 100%; border-collapse: collapse; text-align: center;">
        <tr bgcolor="#f0f0f0">
            <th>회원번호</th>
            <th>회원성명</th>
            <th>전화번호</th>
            <th>주소</th>
            <th>가입일자</th>
            <th>고객등급</th>
            <th>거주지역</th>
        </tr>
<%
    for (MemberDTO m : list) {
        // 등급 코드 한글 변환 분기 처리
        String gradeName = "";
        if ("A".equals(m.getGrade())) gradeName = "VIP";
        else if ("B".equals(m.getGrade())) gradeName = "일반";
        else if ("C".equals(m.getGrade())) gradeName = "직원";
%>
        <tr>
            <td><a href="member_update.jsp?custno=<%= m.getCustno() %>"><%= m.getCustno() %></a></td>
            <td><%= m.getCustname() %></td>
            <td><%= m.getPhone() %></td>
            <td><%= m.getAddress() %></td>
            <td><%= m.getJoindate() %></td>
            <td><%= gradeName %></td>
            <td><%= m.getCity() %></td>
        </tr>
<%
    }
%>
    </table>
</body>
</html>`,
            explanations: [
                { line: "List<MemberDTO> list = dao.selectAll();", desc: "DAO 메서드를 호출하여 DB의 모든 회원 데이터를 자바 컬렉션(List)으로 읽어와 메모리에 보관합니다." },
                { line: "<table style=\"border-collapse: collapse;\">", desc: "HTML Table 스타일: 표 테두리의 이중선을 하나로 합쳐 시험지처럼 깔끔한 격자 테두리로 렌더링합니다." },
                { line: "<% for (MemberDTO m : list) { %> ... <% } %>", desc: "JSP 스크립틀릿 반복문: 자바의 for 문 블록 사이에 HTML <tr> 행을 배치하여, 회원 수(List size)만큼 HTML 행을 동적으로 무한 복제 출력합니다." },
                { line: "if (\"A\".equals(m.getGrade())) gradeName = \"VIP\";", desc: "리터럴 기준 문자열 비교: m.getGrade().equals(\"A\") 대신 \"A\".equals(...)로 작성하면 등급이 NULL이어도 NullPointerException이 발생하지 않는 안전한 코딩 기법입니다." },
                { line: "<%= m.getCustno() %> (JSP 표현식 Expression)", desc: "<%= 값 %> 기호는 out.print(값)과 동일합니다. 세미콜론(;)을 붙이지 않으며, 변수나 메서드 반환값을 HTML 화면에 즉시 텍스트로 인라인 출력합니다." },
                { line: "<a href=\"member_update.jsp?custno=<%= m.getCustno() %>\">", desc: "HTML 하이퍼링크 & QueryString: 회원번호 클릭 시 URL 파라미터(?custno=100001)를 전달하여 해당 회원의 수정 페이지로 이동시킵니다." }
            ]
        },
        {
            id: "code-jsp-update",
            step: "실전 8",
            category: "View & Controller (회원 수정 폼 & 수정 처리)",
            title: "member_update.jsp & update_action.jsp (회원 정보 수정 및 처리)",
            desc: "목록에서 전달된 custno로 기존 회원 정보를 단건 조회하여 입력 폼에 미리 채워 넣고, 수정 버튼 클릭 시 DB에 반영",
            examPrompt: `【실제 시험 개발 요구조건 - 회원 수정 화면 및 수정 액션】
1) member_update.jsp: URL 파라미터(?custno=...)로 전달된 회원번호를 받아 DAO의 단건 조회(selectOne)를 실행하고,
   기존 성명, 전화번호, 주소 등을 각 <input value="...">에 출력할 것 (회원번호는 readonly)
2) update_action.jsp: 수정된 파라미터를 받아 DTO에 담고 DAO.updateMember(dto)를 호출한 후 목록 화면(member_list.jsp)으로 리다이렉트할 것`,
            goal: "단건 조회 데이터의 폼 바인딩(Value Prefill), readonly 고정키 유지, UPDATE 액션 처리 흐름을 완성합니다.",
            tip: "수정 폼의 회원번호는 절대 수정할 수 없도록 readonly를 적용하고, 전송 시 반드시 서버로 넘어가야 WHERE 조건에 쓰입니다.",
            code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="model.MemberDTO, dao.MemberDAO" %>
<%
    int custno = Integer.parseInt(request.getParameter("custno"));
    MemberDAO dao = new MemberDAO();
    MemberDTO m = dao.selectOne(custno); // 기존 정보 단건 조회
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원정보수정</title>
</head>
<body>
    <h2>홈쇼핑 회원 정보 수정</h2>
    <form name="frm" method="post" action="update_action.jsp" onsubmit="return check();">
        <table border="1">
            <tr>
                <th>회원번호</th>
                <td><input type="text" name="custno" value="<%= m.getCustno() %>" readonly></td>
            </tr>
            <tr>
                <th>회원성명</th>
                <td><input type="text" name="custname" value="<%= m.getCustname() %>"></td>
            </tr>
            <tr>
                <th>전화번호</th>
                <td><input type="text" name="phone" value="<%= m.getPhone() %>"></td>
            </tr>
            <tr>
                <th>회원주소</th>
                <td><input type="text" name="address" value="<%= m.getAddress() %>"></td>
            </tr>
            <tr>
                <th>가입일자</th>
                <td><input type="text" name="joindate" value="<%= m.getJoindate() %>"></td>
            </tr>
            <tr>
                <th>고객등급</th>
                <td><input type="text" name="grade" value="<%= m.getGrade() %>"></td>
            </tr>
            <tr>
                <th>도시코드</th>
                <td><input type="text" name="city" value="<%= m.getCity() %>"></td>
            </tr>
            <tr>
                <td colspan="2" align="center">
                    <input type="submit" value="수정">
                    <input type="button" value="취소" onclick="location.href='member_list.jsp'">
                </td>
            </tr>
        </table>
    </form>
</body>
</html>`,
            explanations: [
                { line: "int custno = Integer.parseInt(request.getParameter(\"custno\"));", desc: "URL 쿼리스트링(?custno=100001)에서 전달된 수정 대상 회원번호를 수신합니다." },
                { line: "MemberDTO m = dao.selectOne(custno);", desc: "해당 회원 1명의 레코드만 DB에서 SELECT하여 DTO 객체에 담아옵니다." },
                { line: "value=\"<%= m.getCustname() %>\"", desc: "DB에서 읽어온 기존 데이터를 input value 속성에 주입하여 사용자가 수정 전 값을 바로 볼 수 있게 합니다." },
                { line: "<input type=\"submit\" value=\"수정\">", desc: "수정된 데이터를 update_action.jsp로 전송하여 UPDATE 쿼리를 실행합니다." }
            ]
        },
        {
            id: "code-jsp-sales",
            step: "실전 9",
            category: "View & Model (회원별 매출 집계 조회 - 시험 1순위)",
            title: "member_salary.jsp & DAO 집계 (회원별 총 매출 통계 화면)",
            desc: "회원 테이블과 매출 테이블을 JOIN하여 회원별 누적 매출(SUM)을 계산하고 매출 내림차순(DESC)으로 출력하는 화면",
            examPrompt: `【실제 시험 개발 요구조건 - 회원매출조회 화면】
회원정보(member_tbl_02)와 매출내역(money_tbl_02)을 결합하여 회원별 총 매출액을 조회하는 member_salary.jsp 화면을 구축하시오.
1) JOIN과 GROUP BY, SUM(price) 집계 쿼리를 사용하여 회원별 누적 매출액을 계산할 것
2) 총 매출액이 높은 순서(내림차순 DESC)로 정렬할 것
3) 회원번호, 회원성명, 고객등급(한글 변환), 총매출금액을 테이블에 출력할 것
4) 매출 금액은 DecimalFormat("#,###")을 사용하여 천 단위 콤마를 표시할 것`,
            goal: "INNER/LEFT JOIN 집계 쿼리 결과를 화면 테이블에 매핑하고, 숫자 포맷팅(천 단위 콤마) 및 한글 등급 변환을 완벽히 구현합니다.",
            tip: "실기 시험에서 가장 배점이 높고 부분 점수가 큰 페이지입니다! 매출 0원 회원은 IFNULL(SUM(price), 0)으로 처리하세요.",
            code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="java.util.List, java.text.DecimalFormat" %>
<%@ page import="dao.MemberDAO, model.SalesDTO" %>
<%
    MemberDAO dao = new MemberDAO();
    List<SalesDTO> list = dao.selectMemberSales(); // JOIN & GROUP BY 집계 메서드
    DecimalFormat df = new DecimalFormat("#,###");
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원매출조회</title>
</head>
<body>
    <h2>회원매출조회 (총매출 기준 내림차순)</h2>
    <table border="1" style="width: 100%; border-collapse: collapse; text-align: center;">
        <tr bgcolor="#f0f0f0">
            <th>회원번호</th>
            <th>회원성명</th>
            <th>고객등급</th>
            <th>매출금액</th>
        </tr>
<%
    for (SalesDTO s : list) {
%>
        <tr>
            <td><%= s.getCustno() %></td>
            <td><%= s.getCustname() %></td>
            <td><%= s.getGradeName() %></td>
            <td style="text-align: right; padding-right: 20px;"><%= df.format(s.getTotalPrice()) %> 원</td>
        </tr>
<%
    }
%>
    </table>
</body>
</html>`,
            explanations: [
                { line: "List<SalesDTO> list = dao.selectMemberSales();", desc: "SELECT m.custno, m.custname, m.grade, SUM(p.price) FROM member_tbl_02 m JOIN money_tbl_02 p ... GROUP BY m.custno ORDER BY SUM(p.price) DESC 집계 결과를 받아옵니다." },
                { line: "DecimalFormat df = new DecimalFormat(\"#,###\");", desc: "금액(예: 300000)을 시험지 표준 양식인 '300,000' 천 단위 콤마 문자열로 포맷팅합니다." },
                { line: "s.getGradeName()", desc: "DTO 내부 또는 DAO에서 'A'를 'VIP', 'B'를 '일반' 등으로 한글 변환한 등급 명칭입니다." },
                { line: "style=\"text-align: right;\"", desc: "통계 및 회계 표에서 숫자는 오른쪽 정렬하는 것이 기본 채점 가이드라인입니다." }
            ]
        }
    ]
};

// ==========================================
// 인터랙티브 코드 따라치기 실행 엔진 클래스
// ==========================================
class PracticalTrainer {
    constructor() {
        this.activeModuleType = 'code'; // 'sql', 'jdbc', 'code'
        this.activeItemIndex = 0;
        this.sqlCategory = 'ALL'; // 'ALL', 'DDL', 'DML', 'DQL_COND', 'DQL_FUNC', 'GROUP', 'JOIN'
        this.typedText = "";
    }

    init() {
        this.renderAll();
    }

    renderAll() {
        this.renderSqlSection();
        this.renderJdbcSection();
        this.renderCodeSection();
    }

    // --- 2-3. SQL 렌더링 (20제 카테고리 필터 + 따라치기) ---
    renderSqlSection() {
        const container = document.getElementById('practical-sql-container');
        if (!container) return;

        // 카테고리 필터링
        const filteredSql = (this.sqlCategory === 'ALL')
            ? PRACTICAL_DATA.sql
            : PRACTICAL_DATA.sql.filter(item => item.cat === this.sqlCategory);

        // 현재 활성 아이템 찾기
        let cur = PRACTICAL_DATA.sql[this.activeItemIndex];
        if (this.activeModuleType !== 'sql' || !cur) {
            cur = filteredSql[0] || PRACTICAL_DATA.sql[0];
            this.activeItemIndex = PRACTICAL_DATA.sql.indexOf(cur);
        }

        const categories = [
            { key: 'ALL', label: `전체 보기 (총 20제)` },
            { key: 'DDL', label: `1. DDL 테이블 정의 (4제)` },
            { key: 'DML', label: `2. DML 데이터 조작 (3제)` },
            { key: 'DQL_COND', label: `3. 조건 검색 & 정렬 (3제)` },
            { key: 'DQL_FUNC', label: `4. 함수 & CASE (4제)` },
            { key: 'GROUP', label: `5. GROUP BY / HAVING (2제)` },
            { key: 'JOIN', label: `6. JOIN & 서브쿼리 (4제)` }
        ];

        let html = `
            <!-- 1. 대분류 카테고리 탭 -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; background: #f1f5f9; padding: 0.6rem; border-radius: 10px;">
        `;
        categories.forEach(cat => {
            const isCatActive = (this.sqlCategory === cat.key);
            html += `
                <button type="button" class="tab-pill-btn ${isCatActive ? 'active' : ''}" 
                        style="${isCatActive ? 'background: #1d4ed8; border-color: #1d4ed8; color: #ffffff;' : ''}"
                        onclick="practicalTrainer.setSqlCategory('${cat.key}')">
                    ${cat.label}
                </button>
            `;
        });
        html += `</div>`;

        // 2. 세부 문제 선택 버튼 목록
        html += `<div style="display: flex; gap: 0.45rem; margin-bottom: 1.5rem; flex-wrap: wrap;">`;
        filteredSql.forEach((item) => {
            const globalIdx = PRACTICAL_DATA.sql.indexOf(item);
            const isActive = (this.activeModuleType === 'sql' && this.activeItemIndex === globalIdx);
            html += `
                <button type="button" class="tab-pill-btn ${isActive ? 'active' : ''}" 
                        onclick="practicalTrainer.selectItem('sql', ${globalIdx})">
                    ${item.title.split('(')[0]}
                </button>
            `;
        });
        html += `</div>`;

        // 3. 메인 트레이너 카드
        html += this.generateTrainerCardHtml('sql', cur);

        container.innerHTML = html;
        this.bindTypingEvents('sql', cur);
    }

    setSqlCategory(catKey) {
        this.sqlCategory = catKey;
        const filtered = (catKey === 'ALL')
            ? PRACTICAL_DATA.sql
            : PRACTICAL_DATA.sql.filter(item => item.cat === catKey);
        if (filtered.length > 0) {
            this.activeModuleType = 'sql';
            this.activeItemIndex = PRACTICAL_DATA.sql.indexOf(filtered[0]);
        }
        this.renderSqlSection();
    }

    // --- 2-4. JDBC 렌더링 ---
    renderJdbcSection() {
        const container = document.getElementById('practical-jdbc-container');
        if (!container) return;

        let html = `
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem; flex-wrap: wrap;">
        `;
        PRACTICAL_DATA.jdbc.forEach((item, idx) => {
            const isActive = (this.activeModuleType === 'jdbc' && this.activeItemIndex === idx);
            html += `
                <button type="button" class="tab-pill-btn ${isActive ? 'active' : ''}" 
                        onclick="practicalTrainer.selectItem('jdbc', ${idx})">
                    ${item.title}
                </button>
            `;
        });
        html += `</div>`;

        const cur = (this.activeModuleType === 'jdbc') ? PRACTICAL_DATA.jdbc[this.activeItemIndex] : PRACTICAL_DATA.jdbc[0];
        html += this.generateTrainerCardHtml('jdbc', cur);
        container.innerHTML = html;
        this.bindTypingEvents('jdbc', cur);
    }

    // --- 2-5. 코드 구현 렌더링 ---
    renderCodeSection() {
        const container = document.getElementById('practical-code-container');
        if (!container) return;

        if (this.codeCategory === undefined) {
            this.codeCategory = 'ALL'; // 'ALL', 'BASIC', 'MVC'
        }

        // 카테고리 필터링
        const filteredCode = PRACTICAL_DATA.codeModules.filter(item => {
            if (this.codeCategory === 'BASIC') return item.step.startsWith('기초');
            if (this.codeCategory === 'MVC') return item.step.startsWith('실전');
            return true;
        });

        // 현재 활성 아이템 찾기
        let cur = PRACTICAL_DATA.codeModules[this.activeItemIndex];
        if (this.activeModuleType !== 'code' || !cur || (filteredCode.indexOf(cur) === -1)) {
            cur = filteredCode[0] || PRACTICAL_DATA.codeModules[0];
            this.activeItemIndex = PRACTICAL_DATA.codeModules.indexOf(cur);
        }

        const categories = [
            { key: 'ALL', label: `전체 보기 (총 19제)` },
            { key: 'BASIC', label: `🌱 1단계: JSP & HTML 기초 문법 (10제)` },
            { key: 'MVC', label: `🚀 2단계: 실전 홈쇼핑 종합 MVC 풀코드 (9제)` }
        ];

        let html = `
            <!-- 1. 대분류 카테고리 탭 -->
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; background: #eff6ff; padding: 0.6rem; border-radius: 10px; border: 1px solid #bfdbfe;">
        `;
        categories.forEach(cat => {
            const isCatActive = (this.codeCategory === cat.key);
            html += `
                <button type="button" class="tab-pill-btn ${isCatActive ? 'active' : ''}" 
                        style="${isCatActive ? 'background: #1d4ed8; border-color: #1d4ed8;' : ''}"
                        onclick="practicalTrainer.setCodeCategory('${cat.key}')">
                    ${cat.label}
                </button>
            `;
        });
        html += `</div>`;

        // 2. 세부 항목 선택 버튼 목록
        html += `<div style="display: flex; gap: 0.45rem; margin-bottom: 1.5rem; flex-wrap: wrap;">`;
        filteredCode.forEach((item) => {
            const globalIdx = PRACTICAL_DATA.codeModules.indexOf(item);
            const isActive = (this.activeModuleType === 'code' && this.activeItemIndex === globalIdx);
            const isBasic = item.step.startsWith('기초');
            html += `
                <button type="button" class="tab-pill-btn ${isActive ? 'active' : ''}" 
                        style="${isBasic && !isActive ? 'border-color: #93c5fd; color: #1e40af;' : ''}"
                        onclick="practicalTrainer.selectItem('code', ${globalIdx})">
                    <span style="opacity: 0.85; font-size: 0.78rem; font-weight: bold; margin-right: 4px;">[${item.step}]</span> ${item.title.split('(')[0]}
                </button>
            `;
        });
        html += `</div>`;

        html += this.generateTrainerCardHtml('code', cur);
        container.innerHTML = html;
        this.bindTypingEvents('code', cur);
    }

    setCodeCategory(catKey) {
        this.codeCategory = catKey;
        const filtered = PRACTICAL_DATA.codeModules.filter(item => {
            if (catKey === 'BASIC') return item.step.startsWith('기초');
            if (catKey === 'MVC') return item.step.startsWith('실전');
            return true;
        });
        if (filtered.length > 0) {
            this.activeModuleType = 'code';
            this.activeItemIndex = PRACTICAL_DATA.codeModules.indexOf(filtered[0]);
        }
        this.renderCodeSection();
    }

    selectItem(type, index) {
        this.activeModuleType = type;
        this.activeItemIndex = index;
        if (type === 'sql') this.renderSqlSection();
        else if (type === 'jdbc') this.renderJdbcSection();
        else if (type === 'code') this.renderCodeSection();
    }

    // 공통 트레이너 카드 UI 생성 (시험 출제 문제 & 작성 의도 강조)
    generateTrainerCardHtml(type, item) {
        const escapedCode = this.escapeHtml(item.code);
        const escapedPrompt = item.examPrompt ? this.escapeHtml(item.examPrompt) : '';
        const explanationsHtml = item.explanations.map(exp => `
            <div class="syntax-explain-item">
                <div class="syntax-code-snippet"><code>${this.escapeHtml(exp.line)}</code></div>
                <div class="syntax-desc">${exp.desc}</div>
            </div>
        `).join('');

        const codeHeaderTitle = (type === 'sql') 
            ? '📄 모범 정답 SQL 쿼리 (참고용)' 
            : ((type === 'jdbc') ? '🔌 모범 정답 JDBC 연동 코드 (참고용)' : '💻 모범 정답 JSP / Java 소스코드 (참고용)');

        return `
            <div class="card typing-trainer-card" style="padding: 1.75rem;">
                <!-- 최상단 헤더 -->
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 1rem;">
                    <div>
                        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.35rem;">
                            <span class="badge badge-primary">${item.category || '실기 표준 코드'}</span>
                            ${item.step ? `<span class="badge badge-info">${item.step}</span>` : ''}
                        </div>
                        <h2 style="font-size: 1.45rem; color: #0f172a; margin: 0;">${item.title}</h2>
                        <p style="color: #64748b; font-size: 0.95rem; margin-top: 0.3rem;">${item.desc}</p>
                    </div>
                    <div style="display: flex; gap: 0.5rem;">
                        <button type="button" class="btn-sm" style="background: #f1f5f9; color: #334155; border: 1px solid #cbd5e1;" 
                                onclick="practicalTrainer.copyCode('${item.id}')">📋 정답 복사</button>
                        <button type="button" class="btn-sm" style="background: #e0e7ff; color: #4338ca; border: 1px solid #c7d2fe;" 
                                onclick="practicalTrainer.autoFill('${type}', '${item.id}')">⚡ 따라치기 자동완성</button>
                    </div>
                </div>

                <!-- [핵심 추가] 실제 시험 출제 문제 지문 & 요구조건 박스 -->
                ${item.examPrompt ? `
                <div class="exam-prompt-card" style="background: #f8fafc; border: 2px solid #3b82f6; border-radius: 10px; padding: 1.25rem; margin-bottom: 1.5rem; box-shadow: 0 2px 6px rgba(59, 130, 246, 0.08);">
                    <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.6rem;">
                        <span style="background: #2563eb; color: white; padding: 0.25rem 0.75rem; border-radius: 6px; font-weight: 800; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 0.35rem;">
                            <span>📋</span> 실제 시험 출제 지문 &amp; 요구조건
                        </span>
                        <span style="font-size: 0.82rem; color: #64748b; font-weight: 600;">시험지에는 이 요구사항이 제시됩니다</span>
                    </div>
                    <div style="color: #0f172a; font-size: 0.95rem; line-height: 1.7; white-space: pre-line; font-weight: 500; font-family: 'Pretendard', sans-serif;">
                        ${escapedPrompt}
                    </div>
                    <div style="margin-top: 0.85rem; padding-top: 0.75rem; border-top: 1px dashed #cbd5e1; font-size: 0.88rem; color: #1e40af; display: flex; align-items: center; gap: 0.4rem;">
                        <span>🎯</span> <strong>작성 목표 &amp; 출제 의도:</strong> ${item.goal || item.desc}
                    </div>
                </div>
                ` : ''}

                <!-- 합격 팁 배너 -->
                <div class="alert alert-info" style="margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.75rem;">
                    <span style="font-size: 1.3rem;">💡</span>
                    <div><strong>시험장 합격 TIP:</strong> ${item.tip}</div>
                </div>

                <!-- 2열 그리드: 좌측 원본 코드 및 해설 / 우측 따라치기 에디터 -->
                <div class="typing-split-grid">
                    <!-- 좌측: 모범 정답 소스코드 & 라인별 문법 해설 -->
                    <div class="typing-pane-left">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: 700; color: #1e293b; font-size: 0.95rem;">${codeHeaderTitle}</span>
                            <button type="button" class="btn-sm" id="toggle-code-btn-${item.id}" 
                                    style="background: #f1f5f9; border: 1px solid #cbd5e1; font-size: 0.78rem; padding: 0.2rem 0.6rem;"
                                    onclick="practicalTrainer.toggleCodeVisibility('${item.id}')">
                                👁️ 정답 숨기기
                            </button>
                        </div>
                        <pre class="typing-source-code" id="src-${item.id}"><code>${escapedCode}</code></pre>

                        <div style="margin-top: 1.25rem;">
                            <h4 style="font-size: 1rem; color: #1e293b; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.4rem;">
                                <span>📖</span> 라인별 상세 문법 &amp; 동작 원리 해설
                            </h4>
                            <div class="syntax-explain-list">
                                ${explanationsHtml}
                            </div>
                        </div>
                    </div>

                    <!-- 우측: 인터랙티브 따라치기 타이핑 훈련창 -->
                    <div class="typing-pane-right">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                            <span style="font-weight: 700; color: #2563eb; font-size: 0.95rem;">⌨️ 문제 요구조건에 맞추어 직접 작성하기</span>
                            <span id="typing-accuracy-${item.id}" class="typing-stat-badge">정확도: 0%</span>
                        </div>

                        <!-- 프로그레스 바 -->
                        <div style="background: #e2e8f0; border-radius: 9999px; height: 8px; width: 100%; margin-bottom: 0.75rem; overflow: hidden;">
                            <div id="typing-progress-bar-${item.id}" style="background: #2563eb; height: 100%; width: 0%; transition: width 0.2s;"></div>
                        </div>

                        <textarea id="typing-input-${item.id}" class="typing-textarea" 
                                  placeholder="위 시험 요구조건을 보면서 여기에 직접 쿼리나 코드를 한 줄씩 입력해보세요..." 
                                  spellcheck="false"></textarea>

                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.75rem;">
                            <div id="typing-status-${item.id}" style="font-size: 0.85rem; color: #64748b;">
                                입력 대기 중 (총 ${item.code.length}글자)
                            </div>
                            <button type="button" class="btn-sm" style="background: #f8fafc; border: 1px solid #cbd5e1; color: #475569;"
                                    onclick="practicalTrainer.resetTyping('${item.id}')">🔄 초기화</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    toggleCodeVisibility(itemId) {
        const codeElem = document.getElementById(`src-${itemId}`);
        const btn = document.getElementById(`toggle-code-btn-${itemId}`);
        if (!codeElem || !btn) return;

        if (codeElem.style.display === 'none') {
            codeElem.style.display = 'block';
            btn.textContent = '👁️ 정답 숨기기';
        } else {
            codeElem.style.display = 'none';
            btn.textContent = '👁️ 정답 보기 (힌트)';
        }
    }

    // 타이핑 이벤트 연결 및 실시간 비교
    bindTypingEvents(type, item) {
        setTimeout(() => {
            const textarea = document.getElementById(`typing-input-${item.id}`);
            if (!textarea) return;

            textarea.addEventListener('input', (e) => {
                this.evaluateTyping(item, e.target.value);
            });
        }, 50);
    }

    evaluateTyping(item, userText) {
        const targetText = item.code;
        const accuracyElem = document.getElementById(`typing-accuracy-${item.id}`);
        const progressElem = document.getElementById(`typing-progress-bar-${item.id}`);
        const statusElem = document.getElementById(`typing-status-${item.id}`);
        const textarea = document.getElementById(`typing-input-${item.id}`);

        if (!accuracyElem || !progressElem || !statusElem) return;

        // 줄바꿈 정규화 (\r\n -> \n)
        const normUser = (userText || "").replace(/\r\n/g, '\n');
        const normTarget = (targetText || "").replace(/\r\n/g, '\n');

        if (normUser.length === 0) {
            accuracyElem.textContent = "정확도: 0% (진행률: 0%)";
            progressElem.style.width = "0%";
            progressElem.style.background = "#2563eb";
            if (textarea) textarea.style.borderColor = "#cbd5e1";
            statusElem.innerHTML = `<span>입력 대기 중 (총 ${normTarget.length}자)</span>`;
            return;
        }

        // 라인 단위 스마트 매칭 (들여쓰기 유연성 보장)
        const userLines = normUser.split('\n');
        const targetLines = normTarget.split('\n');

        let matchedChars = 0;
        const compareLineCount = Math.min(userLines.length, targetLines.length);

        for (let i = 0; i < compareLineCount; i++) {
            const uLine = userLines[i].trim();
            const tLine = targetLines[i].trim();
            if (uLine === tLine) {
                matchedChars += targetLines[i].length + 1; // 줄바꿈 포함
            } else {
                let subMatch = 0;
                const minLen = Math.min(uLine.length, tLine.length);
                for (let j = 0; j < minLen; j++) {
                    if (uLine[j] === tLine[j]) subMatch++;
                }
                matchedChars += subMatch;
            }
        }

        const progress = Math.min(100, Math.round((normUser.length / normTarget.length) * 100));
        let accuracy = Math.min(100, Math.round((matchedChars / Math.max(normUser.length, 1)) * 100));
        if (normUser.trim() === normTarget.trim()) {
            accuracy = 100;
        }

        accuracyElem.textContent = `정확도: ${accuracy}% (진행률: ${progress}%)`;
        progressElem.style.width = `${progress}%`;

        if (normUser.trim() === normTarget.trim() || (progress >= 95 && accuracy >= 88)) {
            accuracyElem.className = "typing-stat-badge stat-success";
            progressElem.style.background = "#10b981";
            if (textarea) textarea.style.borderColor = "#10b981";
            statusElem.innerHTML = `<span style="color: #10b981; font-weight: 700;">🎉 완벽합니다! 요구조건에 맞는 코드를 완벽히 마스터하셨습니다!</span>`;
        } else if (accuracy < 70 && normUser.length > 15) {
            accuracyElem.className = "typing-stat-badge stat-danger";
            if (textarea) textarea.style.borderColor = "#ef4444";
            statusElem.innerHTML = `<span style="color: #ef4444;">⚠️ 오타가 감지되었습니다. 좌측 모범 코드의 철자 및 대소문자를 확인하세요.</span>`;
        } else {
            accuracyElem.className = "typing-stat-badge stat-normal";
            progressElem.style.background = "#2563eb";
            if (textarea) textarea.style.borderColor = "#93c5fd";
            statusElem.innerHTML = `<span style="color: #2563eb;">입력 중... (${normUser.length} / ${normTarget.length} 자, ${userLines.length}/${targetLines.length} 행)</span>`;
        }
    }

    copyCode(itemId) {
        const allItems = [...PRACTICAL_DATA.sql, ...PRACTICAL_DATA.jdbc, ...PRACTICAL_DATA.codeModules];
        const item = allItems.find(x => x.id === itemId);
        if (!item) return;

        navigator.clipboard.writeText(item.code).then(() => {
            alert(`[${item.title}] 모범 정답 코드가 클립보드에 복사되었습니다!`);
        }).catch(() => {
            alert("클립보드 복사에 실패했습니다. 코드를 직접 드래그하여 복사해주세요.");
        });
    }

    autoFill(type, itemId) {
        const allItems = [...PRACTICAL_DATA.sql, ...PRACTICAL_DATA.jdbc, ...PRACTICAL_DATA.codeModules];
        const item = allItems.find(x => x.id === itemId);
        if (!item) return;

        const textarea = document.getElementById(`typing-input-${item.id}`);
        if (textarea) {
            textarea.value = item.code;
            this.evaluateTyping(item, item.code);
        }
    }

    resetTyping(itemId) {
        const allItems = [...PRACTICAL_DATA.sql, ...PRACTICAL_DATA.jdbc, ...PRACTICAL_DATA.codeModules];
        const item = allItems.find(x => x.id === itemId);
        if (!item) return;

        const textarea = document.getElementById(`typing-input-${item.id}`);
        if (textarea) {
            textarea.value = "";
            this.evaluateTyping(item, "");
        }
    }

    escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// 전역 인스턴스 생성
const practicalTrainer = new PracticalTrainer();
window.practicalTrainer = practicalTrainer;

// 시험 빈출 SQL 5대 미니 퀴즈 채점 함수
function checkMiniSqlQuiz(buttonElem, isCorrect, message) {
    const parent = buttonElem.closest('div[style*="padding: 1.1rem"]');
    if (!parent) return;

    const feedbackElem = parent.querySelector('.sql-quiz-feedback');
    if (!feedbackElem) return;

    // 모든 형제 버튼 비활성화 및 스타일 초기화
    parent.querySelectorAll('button').forEach(btn => {
        btn.style.borderColor = '#cbd5e1';
        btn.style.background = 'white';
        btn.style.color = '#334155';
    });

    if (isCorrect) {
        buttonElem.style.background = '#dcfce7';
        buttonElem.style.borderColor = '#10b981';
        buttonElem.style.color = '#15803d';
        feedbackElem.style.display = 'block';
        feedbackElem.style.background = '#f0fdf4';
        feedbackElem.style.border = '1px solid #bbf7d0';
        feedbackElem.style.color = '#166534';
        feedbackElem.innerHTML = `<strong>🎉 정답입니다!</strong> ${message}`;
    } else {
        buttonElem.style.background = '#fee2e2';
        buttonElem.style.borderColor = '#ef4444';
        buttonElem.style.color = '#b91c1c';
        feedbackElem.style.display = 'block';
        feedbackElem.style.background = '#fef2f2';
        feedbackElem.style.border = '1px solid #fecdd3';
        feedbackElem.style.color = '#991b1b';
        feedbackElem.innerHTML = `<strong>❌ 오답입니다!</strong> ${message}`;
    }
}
window.checkMiniSqlQuiz = checkMiniSqlQuiz;

// 시험 빈출 JSP/MVC 소스코드 5대 미니 퀴즈 채점 함수
function checkMiniCodeQuiz(buttonElem, isCorrect, message) {
    checkMiniSqlQuiz(buttonElem, isCorrect, message);
}
window.checkMiniCodeQuiz = checkMiniCodeQuiz;
