// SW_L5 환경구축 및 실기 시험 빈출 에러 트러블슈팅 데이터베이스
const TROUBLESHOOT_DATA = [
    {
        id: "err-public-key",
        category: "MySQL / JDBC",
        title: "Public Key Retrieval is not allowed",
        badge: "빈출 1위 🚨",
        symptom: "JSP 화면에서 DB 데이터를 불러오지 못하고 흰 화면 또는 빈 표만 뜨며, 콘솔 창에 'java.sql.SQLNonTransientConnectionException: Public Key Retrieval is not allowed' 에러 발생.",
        cause: "MySQL 8.0 이상에서 도입된 caching_sha2_password 암호화 인증 방식을 사용할 때, JDBC 드라이버의 공개키 자동 조회가 기본적으로 비활성화되어 있어서 접속이 거부되는 현상입니다.",
        solution: `DBConnection.java 파일의 접속 URL 끝에 아래 옵션을 추가합니다.

// [수정 전]
String url = "jdbc:mysql://localhost:3306/shop_db?useSSL=false&serverTimezone=Asia/Seoul";

// [수정 후] allowPublicKeyRetrieval=true 추가
String url = "jdbc:mysql://localhost:3306/shop_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Seoul&characterEncoding=UTF-8";`,
        tags: ["MySQL 8.0", "JDBC", "인증오류", "DBConnection"]
    },
    {
        id: "err-httpservlet-missing",
        category: "Eclipse / Tomcat",
        title: "The default superclass 'javax.servlet.http.HttpServlet' was not found",
        badge: "빈출 2위 🚨",
        symptom: "JSP 파일(index.jsp, memberList.jsp 등)의 맨 윗줄 1행에 빨간색 엑스(X) 표시가 뜨며 빌드 에러가 발생함.",
        cause: "이클립스 프로젝트가 톰캣 서버 런타임 라이브러리(servlet-api.jar)를 Java Build Path에 등록하지 못했거나, Dynamic Web Module 버전과 톰캣 버전이 불일치할 때 발생합니다.",
        solution: `1. 이클립스 왼쪽 프로젝트(HRD_Shop) 우클릭 ➡️ [Build Path] ➡️ [Configure Build Path...] 클릭
2. [Libraries] 탭 클릭 ➡️ [Classpath]를 선택한 뒤 우측 [Add Library...] 클릭
3. [Server Runtime] 선택 ➡️ [Next] ➡️ [Apache Tomcat] 선택 후 [Finish]
4. [Apply and Close] 클릭 후 상단 메뉴 [Project] ➡️ [Clean...] 실행`,
        tags: ["Eclipse", "Tomcat", "Build Path", "JSP Problem"]
    },
    {
        id: "err-bootstrap-notfound",
        category: "Tomcat / Server",
        title: "기본 클래스 org.apache.catalina.startup.Bootstrap을 찾거나 로드할 수 없습니다",
        badge: "빈출 3위 ⚠️",
        symptom: "톰캣 서버를 실행할 때 'ClassNotFoundException: org.apache.catalina.startup.Bootstrap'이 뜨며 서버가 즉시 멈춤.",
        cause: "이클립스에 톰캣 런타임을 등록할 때 톰캣 압축 해제 폴더의 상위 폴더나 비어있는 폴더를 지정하여, 핵심 파일(bin/bootstrap.jar)을 찾지 못해서 발생합니다.",
        solution: `1. 이클립스 상단 메뉴 [Window] ➡️ [Preferences] ➡️ [Server] ➡️ [Runtime Environments] 클릭
2. 등록된 Tomcat을 클릭하고 우측 [Edit...] 버튼 클릭
3. [Tomcat installation directory] 옆 [Browse...] 버튼 클릭
4. 클릭했을 때 바로 안에 'bin', 'conf', 'lib', 'webapps'가 한눈에 들어오는 정확한 톰캣 폴더(예: C:\\tomcat\\apache-tomcat-10.1.x)를 선택하고 저장.`,
        tags: ["Tomcat 경로", "Bootstrap", "서버시작오류"]
    },
    {
        id: "err-port-conflict",
        category: "Network / Port",
        title: "Several ports (8080, 8005) required by Tomcat Server are already in use",
        badge: "빈출 4위 ⚠️",
        symptom: "Run on Server 실행 시 8080 포트가 이미 사용 중이라는 팝업 창이 뜨며 서버가 켜지지 않음.",
        cause: "컴퓨터에 오라클(Oracle XE)이 설치되어 8080 포트를 점유하고 있거나, 이전에 켜두었던 톰캣 프로세스가 백그라운드에서 완전히 꺼지지 않았을 때 발생합니다.",
        solution: `방법 1: 톰캣 포트를 8090으로 변경
- 이클립스 하단 [Servers] 탭에서 Tomcat 서버를 더블클릭
- 열리는 설정 화면 우측의 [Ports] 항목에서 'HTTP/1.1' 포트 번호를 8080에서 8090(또는 8088)으로 변경 후 저장(Ctrl+S)
- 이후 브라우저 주소를 http://localhost:8090/... 으로 접속

방법 2: 기존 프로세스 강제 종료
- 명령 프롬프트(CMD)를 관리자 권한으로 실행
- netstat -ano | findstr 8080  (점유 중인 PID 확인)
- taskkill /f /pid 확인한PID번호`,
        tags: ["포트충돌", "8080", "Oracle충돌", "서버설정"]
    },
    {
        id: "err-sql-syntax-acs",
        category: "SQL Syntax",
        title: "Error Code: 1064. SQL syntax error near 'ACS'",
        badge: "오타 주의 📝",
        symptom: "SQL 실행 시 1064 문법 에러가 발생하며 쿼리가 실행되지 않음.",
        cause: "오름차순 정렬 명령어인 'ASC' (Ascending)를 타이핑 실수로 'ACS'로 적었거나, 테이블명/별칭 오타, 세미콜론 중간 삽입 등으로 구문 오류가 난 경우입니다.",
        solution: `1. 정렬 오타 점검: ORDER BY 컬럼명 ASC (O) / ACS (X)
2. 중간 세미콜론 점검:
   -- 잘못된 예: INNER JOIN score on s.id=sc.id; WHERE ... (중간 세미콜론 금지!)
   -- 올바른 예: 맨 마지막 줄 끝에만 세미콜론 1개 추가
3. 쉼표(,) 오타 점검: SELECT 절 맨 마지막 컬럼 뒤에 쉼표가 붙지 않도록 확인.`,
        tags: ["SQL오타", "ASC", "세미콜론", "Syntax Error"]
    },
    {
        id: "err-hangul-encoding",
        category: "JSP / Encoding",
        title: "한글 데이터 깨짐 현상 (?? 또는 외계어로 저장/출력)",
        badge: "감점 방지 ⚠️",
        symptom: "회원등록 폼에서 '김철수', '서울시' 등 한글을 입력하고 저장했더니 DB나 목록 화면에 '???' 또는 '홯홯' 같은 글자로 깨져서 나옴.",
        cause: "웹 브라우저에서 서버로 넘어오는 POST 데이터의 인코딩을 UTF-8로 지정하지 않았거나, JSP 파일 상단 인코딩 설정이 누락된 경우입니다.",
        solution: `1. action.jsp (저장 처리 파일) 최상단에 반드시 추가:
   <%
       request.setCharacterEncoding("UTF-8");
   %>

2. 모든 JSP 파일 상단에 지시자 확인:
   <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>

3. MySQL DB 생성 시 한글 지원 설정:
   CREATE DATABASE shop_db DEFAULT CHARACTER SET utf8mb4;`,
        tags: ["한글깨짐", "UTF-8", "인코딩", "setCharacterEncoding"]
    },
    {
        id: "err-db-access-denied",
        category: "MySQL / Auth",
        title: "java.sql.SQLException: Access denied for user 'root'@'localhost'",
        badge: "계정 오류 🔑",
        symptom: "웹 브라우저 표에 데이터가 전혀 나오지 않고, 콘솔에 'Access denied for user root' 발생.",
        cause: "DBConnection.java에 적은 MySQL 접속 비밀번호가 실제 MySQL 설치 시 지정한 root 비밀번호와 일치하지 않을 때 발생합니다.",
        solution: `DBConnection.java의 비밀번호 변수를 본인이 MySQL 설치 시 설정했던 실제 비밀번호로 수정합니다.
(예: String password = "root"; 또는 String password = "1234";)

* 비밀번호가 기억나지 않을 때는 MySQL Command Line Client를 열고 비밀번호를 입력해보며 테스트할 수 있습니다.`,
        tags: ["비밀번호오류", "root", "AccessDenied"]
    },
    {
        id: "err-unknown-database",
        category: "MySQL / Schema",
        title: "java.sql.SQLSyntaxErrorException: Unknown database 'shop_db'",
        badge: "DB 미생성 🗄️",
        symptom: "DBConnection 실행 시 'Unknown database' 발생.",
        cause: "MySQL 안에 접속하려는 데이터베이스(shop_db)가 아직 생성되지 않은 상태에서 자바가 접근을 시도했을 때 발생합니다.",
        solution: `MySQL Workbench나 MySQL CLI 창을 열고 DB 생성 쿼리를 먼저 1회 실행합니다:

CREATE DATABASE IF NOT EXISTS shop_db DEFAULT CHARACTER SET utf8mb4;
USE shop_db;

-- 그 후 테이블 생성 DDL 스크립트 실행`,
        tags: ["DB미생성", "UnknownDatabase", "CREATE DATABASE"]
    },
    {
        id: "err-cmd-javac-notfound",
        category: "JDK / PATH",
        title: "'javac'은(는) 내부 또는 외부 명령, 실행할 수 있는 프로그램이 아닙니다",
        badge: "환경변수 ⚠️",
        symptom: "명령 프롬프트(CMD)에서 javac -version을 입력하면 '내부 또는 외부 명령어가 아닙니다' 에러 발생.",
        cause: "시스템 환경변수 PATH에 JDK의 bin 폴더 경로(%JAVA_HOME%\\bin)가 등록되어 있지 않거나, JRE만 설치되어 javac 컴파일러가 없는 경우입니다.",
        solution: `1. sysdm.cpl 실행 ➡️ [환경 변수] 클릭
2. [시스템 변수]의 JAVA_HOME이 JDK 설치 폴더(예: C:\\Program Files\\Java\\jdk-17)로 지정되어 있는지 확인
3. Path 변수 편집 ➡️ %JAVA_HOME%\\bin 등록 후 맨 위로 이동
4. 반드시 새 CMD 창을 열고 javac -version 재확인`,
        tags: ["javac", "PATH", "JAVA_HOME", "환경변수"]
    },
    {
        id: "err-context-path-404",
        category: "Tomcat / 404",
        title: "HTTP Status 404 – Not Found (잘못된 Context Path 및 URL)",
        badge: "빈출 404 🚨",
        symptom: "브라우저에서 http://localhost:8080/index.jsp 입력 시 404 Not Found 오류 화면이 뜸.",
        cause: "톰캣 Servers 설정의 Modules 탭에서 프로젝트 Context Path가 기본 프로젝트명(/HRD_1234 등)으로 잡혀 있어서 루트(/) 경로와 불일치하기 때문입니다.",
        solution: `1. 이클립스 하단 [Servers] 탭에서 Tomcat 서버 더블클릭
2. 좌측 하단 [Modules] 탭 클릭
3. 등록된 프로젝트 선택 후 [Edit...] 클릭
4. Path 입력값을 프로젝트명 대신 오직 '/' (슬래시) 하나로 변경 후 [OK]
5. Ctrl + S 로 저장 후 서버 재시작`,
        tags: ["404", "ContextPath", "Modules", "Not Found"]
    }
];
