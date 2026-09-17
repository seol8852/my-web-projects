/**
 * SW개발_L5 실전 모의고사 3회 종합 평가 엔진 & 공식 데이터 세트
 * 한국산업인력공단(Q-Net) 과정평가형 자격 실기시험 완벽 대비
 */

const MOCK_EXAMS_DATA = {
    exam1: {
        id: "exam1",
        title: "제1회 실전 모의고사: 쇼핑몰 회원 및 매출 관리 시스템",
        domain: "회원 / 매출 관리 (기본 표준형)",
        badge: "출제율 1위 ⭐⭐⭐",
        timeLimitMinutes: 120,
        simulatorId: "shopping",
        summary: "쇼핑몰 신규 회원 등록, 회원번호 자동 채번(MAX+1), 유효성 검사, 전체 회원 목록 조회 및 고객등급 한글 변환, 회원별 누적 매출 통계(LEFT JOIN + IFNULL 0원 처리)를 구현합니다.",
        paper: {
            taskNo: "과제번호: SW-L5-2026-01",
            instructions: [
                "시험시간은 총 2시간(120분)이며, 100점 만점 중 60점 이상 획득 시 합격입니다.",
                "데이터베이스는 MySQL(또는 Oracle)을 사용하며, 테이블 생성 및 샘플 데이터 스크립트를 정확히 실행해야 합니다.",
                "모든 웹 페이지의 문자 인코딩은 UTF-8로 설정하여 한글 깨짐이 발생하지 않도록 해야 합니다.",
                "공통 화면 레이아웃(상단 헤더, 네비게이션 메뉴, 하단 푸터)을 반드시 포함해야 합니다.",
                "회원 등록 시 필수 입력 항목이 누락된 경우 반드시 경고창(alert)을 띄우고 해당 입력 칸으로 포커스(focus)를 이동해야 합니다.",
                "회원 매출 통계 시 구매 이력이 없는 회원도 목록에 반드시 출력되어야 하며, 매출 금액은 0원으로 표기되어야 합니다."
            ],
            tables: [
                {
                    name: "member_tbl_02 (회원 정보 테이블)",
                    columns: [
                        { name: "custno", type: "INT", key: "PK", nn: "Y", desc: "회원번호 (100001부터 자동채번)" },
                        { name: "custname", type: "VARCHAR(20)", key: "", nn: "Y", desc: "회원성명" },
                        { name: "phone", type: "VARCHAR(15)", key: "", nn: "N", desc: "회원전화" },
                        { name: "address", type: "VARCHAR(60)", key: "", nn: "N", desc: "통신사/주소" },
                        { name: "joindate", type: "DATE", key: "", nn: "N", desc: "가입일자 (YYYY-MM-DD)" },
                        { name: "grade", type: "CHAR(1)", key: "", nn: "N", desc: "고객등급 (A:VIP, B:일반, C:직원)" },
                        { name: "city", type: "CHAR(2)", key: "", nn: "N", desc: "거주도시코드 (01:서울, 02:경기, 60:부산 등)" }
                    ]
                },
                {
                    name: "money_tbl_02 (회원 매출 정보 테이블)",
                    columns: [
                        { name: "custno", type: "INT", key: "FK", nn: "Y", desc: "회원번호 (member_tbl_02 참조)" },
                        { name: "saleno", type: "INT", key: "PK", nn: "Y", desc: "판매번호" },
                        { name: "pcost", type: "INT", key: "", nn: "N", desc: "단가" },
                        { name: "amount", type: "INT", key: "", nn: "N", desc: "수량" },
                        { name: "price", type: "INT", key: "", nn: "N", desc: "판매금액 (단가 * 수량)" },
                        { name: "pcode", type: "VARCHAR(10)", key: "", nn: "N", desc: "상품코드" },
                        { name: "sdate", type: "DATE", key: "", nn: "N", desc: "판매일자" }
                    ]
                }
            ],
            requirements: [
                {
                    title: "1. 데이터베이스 구축 (15점)",
                    details: "제공된 스키마에 따라 테이블을 생성하고, 제시된 샘플 데이터를 완벽하게 삽입한 후 정상 조회되는지 확인한다."
                },
                {
                    title: "2. 공통 모듈 및 레이아웃 (15점)",
                    details: "DB 연동 모듈(DBConnection.java)을 작성하고, 상단 로고/타이틀, 네비게이션 메뉴(회원등록, 회원목록/수정, 회원매출조회, 홈으로), 푸터 영역을 일관되게 구현한다."
                },
                {
                    title: "3. 회원 등록 화면 (join.jsp) (20점)",
                    details: "회원번호는 DB에서 MAX(custno)+1로 조회하여 읽기 전용(readonly)으로 표시한다. 가입일자는 오늘 날짜를 기본 세팅한다. 등록 버튼 클릭 시 자바스크립트 유효성 검사를 수행하여 성명, 전화번호, 주소, 가입일자, 등급, 도시코드가 비어있을 경우 alert 및 focus 처리한다."
                },
                {
                    title: "4. 회원 등록 처리 (action.jsp) (10점)",
                    details: "한글 UTF-8 인코딩 처리 후 PreparedStatement를 통해 DB에 INSERT하고, 등록 성공 시 안내 alert를 띄운 후 회원목록조회 페이지(memberList.jsp)로 이동한다."
                },
                {
                    title: "5. 회원 목록 조회 및 수정 (memberList.jsp / update.jsp) (20점)",
                    details: "회원목록을 회원번호 오름차순으로 조회하며, 고객등급 코드(A, B, C)는 CASE WHEN을 통해 'VIP', '일반', '직원'으로 변환 출력한다. 회원번호 클릭 시 회원수정 화면으로 이동하여 기존 데이터를 불러오고 수정(UPDATE)할 수 있어야 한다."
                },
                {
                    title: "6. 회원별 매출 통계 조회 (salaryList.jsp) (20점)",
                    details: "회원번호, 회원성명, 고객등급, 총매출액을 출력한다. 구매 이력이 없는 회원도 반드시 목록에 표기(LEFT JOIN)되어야 하며 매출액은 0원으로 출력(IFNULL)한다. 총매출액 기준 내림차순(DESC), 금액이 같으면 회원번호 오름차순(ASC)으로 정렬한다."
                }
            ]
        },
        rubric: [
            { id: 1, title: "DB 테이블 생성 및 샘플 데이터 구축", score: 15, deduction: "테이블명, 컬럼명 오타 또는 샘플 데이터 누락 시 쿼리 전체 오작동" },
            { id: 2, title: "JDBC 드라이버 등록 및 DBConnection 공통 모듈", score: 15, deduction: "Connector/J jar 누락 또는 연결 URL 인코딩 옵션 누락 시 0점 위험" },
            { id: 3, title: "회원등록 폼 자동 채번(MAX+1) 및 readonly", score: 10, deduction: "자동채번 누락 또는 사용자가 임의로 회원번호를 수정할 수 있을 경우 감점" },
            { id: 4, title: "자바스크립트 폼 유효성 검사 (alert & focus)", score: 10, deduction: "alert만 띄우고 focus() 누락 또는 return false 미처리로 폼이 제출될 경우 감점" },
            { id: 5, title: "회원등록 처리 및 한글 UTF-8 인코딩 & 리다이렉트", score: 10, deduction: "setCharacterEncoding 누락으로 한글이 깨지거나 등록 후 화면 이동 실패 시 감점" },
            { id: 6, title: "회원목록 조회 및 CASE WHEN 한글 등급 변환", score: 15, deduction: "CASE WHEN 미적용 시 영문 등급(A/B/C) 노출로 감점" },
            { id: 7, title: "회원매출 조회 LEFT JOIN 및 IFNULL 0원 처리", score: 15, deduction: "INNER JOIN 사용으로 미구매자 누락(-10점) 또는 IFNULL 누락으로 NULL 표기(-5점)" },
            { id: 8, title: "매출 정렬(매출액 DESC, 회원번호 ASC) 및 레이아웃 완성도", score: 10, deduction: "정렬 기준 미준수 또는 화면 깨짐 시 감점" }
        ],
        modelCode: {
            step1: {
                title: "STEP 1. DB 구축 (DDL & INSERT)",
                lang: "sql",
                code: `-- 1. 데이터베이스 생성 및 선택
CREATE DATABASE IF NOT EXISTS shop_db DEFAULT CHARACTER SET utf8mb4;
USE shop_db;

-- 2. 기존 테이블 삭제 (외래키 제약조건 고려)
DROP TABLE IF EXISTS money_tbl_02;
DROP TABLE IF EXISTS member_tbl_02;

-- 3. 회원 정보 테이블 생성
CREATE TABLE member_tbl_02 (
    custno    INT          NOT NULL,
    custname  VARCHAR(20)  NOT NULL,
    phone     VARCHAR(15),
    address   VARCHAR(60),
    joindate  DATE,
    grade     CHAR(1),
    city      CHAR(2),
    PRIMARY KEY (custno)
);

-- 4. 회원 매출 정보 테이블 생성
CREATE TABLE money_tbl_02 (
    custno   INT      NOT NULL,
    saleno   INT      NOT NULL,
    pcost    INT,
    amount   INT,
    price    INT,
    pcode    VARCHAR(10),
    sdate    DATE,
    PRIMARY KEY (saleno)
);

-- 5. 샘플 데이터 삽입
INSERT INTO member_tbl_02 VALUES 
(100001, '김행복', '010-1111-2222', '서울 동대문구 휘경동', '2023-12-02', 'A', '01'),
(100002, '이축복', '010-1111-3333', '서울 강남구 역삼동', '2023-12-06', 'B', '01'),
(100003, '장믿음', '010-1111-4444', '경기도 수원시 팔달구', '2023-12-10', 'B', '02'),
(100004, '최사랑', '010-1111-5555', '경기도 안양시 만안구', '2023-12-15', 'A', '02'),
(100005, '진평화', '010-1111-6666', '부산 해운대구 우동', '2023-12-20', 'C', '60'),
(100006, '차공손', '010-1111-7777', '광주 북구 용봉동', '2023-12-25', 'C', '60');

INSERT INTO money_tbl_02 VALUES 
(100001, 20240001, 500, 5, 2500, 'A001', '2024-01-01'),
(100001, 20240002, 1000, 4, 4000, 'A002', '2024-01-02'),
(100001, 20240003, 500, 3, 1500, 'A008', '2024-01-03'),
(100002, 20240004, 2000, 1, 2000, 'A003', '2024-01-04'),
(100002, 20240005, 500, 1, 500, 'A004', '2024-01-05'),
(100003, 20240006, 1500, 2, 3000, 'A005', '2024-01-06'),
(100004, 20240007, 3000, 1, 3000, 'A006', '2024-01-07');

-- 데이터 확인
SELECT * FROM member_tbl_02;
SELECT * FROM money_tbl_02;`
            },
            step2: {
                title: "STEP 2. DB 연결 공통 모듈 (DBConnection.java)",
                lang: "java",
                code: `package common;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    public static Connection getConnection() throws Exception {
        // 1. 드라이버 로딩
        Class.forName("com.mysql.cj.jdbc.Driver");
        
        // 2. DB 연결 URL (한글 인코딩 및 시간대 설정 필수)
        String url = "jdbc:mysql://localhost:3306/shop_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Seoul&characterEncoding=UTF-8";
        String user = "root";
        String password = "본인비밀번호"; // 시험장 안내 비밀번호 입력
        
        return DriverManager.getConnection(url, user, password);
    }
}`
            },
            step3: {
                title: "STEP 3. 회원 등록 화면 (join.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<%
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    int nextCustno = 100001;
    try {
        conn = DBConnection.getConnection();
        // MAX(custno) + 1 자동 채번 (회원이 없을 경우 100001 시작)
        String sql = "SELECT IFNULL(MAX(custno), 100000) + 1 AS next_custno FROM member_tbl_02";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        if(rs.next()) {
            nextCustno = rs.getInt("next_custno");
        }
    } catch(Exception e) {
        e.printStackTrace();
    } finally {
        if(rs != null) rs.close();
        if(pstmt != null) pstmt.close();
        if(conn != null) conn.close();
    }
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>쇼핑몰 회원등록</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #2563eb; color: white; padding: 1rem; }
    nav { background-color: #1e40af; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 550px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; }
    th { background-color: #f1f5f9; text-align: right; width: 40%; }
    td { text-align: left; }
    input[type="text"] { width: 90%; padding: 4px; }
</style>
<script>
function checkForm() {
    var f = document.frm;
    if(f.custname.value.trim() == "") {
        alert("회원성명이 입력되지 않았습니다.");
        f.custname.focus();
        return false;
    }
    if(f.phone.value.trim() == "") {
        alert("회원전화가 입력되지 않았습니다.");
        f.phone.focus();
        return false;
    }
    if(f.address.value.trim() == "") {
        alert("회원주소가 입력되지 않았습니다.");
        f.address.focus();
        return false;
    }
    if(f.joindate.value.trim() == "") {
        alert("가입일자가 입력되지 않았습니다.");
        f.joindate.focus();
        return false;
    }
    if(f.grade.value.trim() == "") {
        alert("고객등급이 입력되지 않았습니다.");
        f.grade.focus();
        return false;
    }
    if(f.city.value.trim() == "") {
        alert("도시코드가 입력되지 않았습니다.");
        f.city.focus();
        return false;
    }
    alert("회원등록이 정상적으로 완료 되었습니다!");
    return true;
}
</script>
</head>
<body>
    <header><h1>쇼핑몰 회원관리 프로그램 ver 1.0</h1></header>
    <nav>
        <a href="join.jsp">회원등록</a>
        <a href="memberList.jsp">회원목록조회/수정</a>
        <a href="salaryList.jsp">회원매출조회</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>쇼핑몰 회원 등록</h2>
        <form name="frm" action="action.jsp" method="post" onsubmit="return checkForm();">
            <table>
                <tr>
                    <th>회원번호(자동발생)</th>
                    <td><input type="text" name="custno" value="<%= nextCustno %>" readonly style="background:#e2e8f0;"></td>
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
                    <td><input type="text" name="joindate" value="2024-01-10"></td>
                </tr>
                <tr>
                    <th>고객등급[A:VIP,B:일반,C:직원]</th>
                    <td><input type="text" name="grade"></td>
                </tr>
                <tr>
                    <th>도시코드</th>
                    <td><input type="text" name="city"></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center;">
                        <input type="submit" value="등록">
                        <input type="button" value="조회" onclick="location.href='memberList.jsp'">
                    </td>
                </tr>
            </table>
        </form>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 All rights reserved. Human Resources Development Service of Korea</p></footer>
</body>
</html>`
            },
            step4: {
                title: "STEP 4. 회원 등록 처리 (action.jsp)",
                lang: "java",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<%
    // 1. 요청 파라미터 한글 인코딩 처리
    request.setCharacterEncoding("UTF-8");

    // 2. 파라미터 수신
    int custno = Integer.parseInt(request.getParameter("custno"));
    String custname = request.getParameter("custname");
    String phone = request.getParameter("phone");
    String address = request.getParameter("address");
    String joindate = request.getParameter("joindate");
    String grade = request.getParameter("grade");
    String city = request.getParameter("city");

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
        conn = DBConnection.getConnection();
        String sql = "INSERT INTO member_tbl_02 (custno, custname, phone, address, joindate, grade, city) VALUES (?, ?, ?, ?, ?, ?, ?)";
        pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, custno);
        pstmt.setString(2, custname);
        pstmt.setString(3, phone);
        pstmt.setString(4, address);
        pstmt.setString(5, joindate);
        pstmt.setString(6, grade);
        pstmt.setString(7, city);

        pstmt.executeUpdate();

        // 3. 등록 완료 후 회원 목록 화면으로 리다이렉트
        response.sendRedirect("memberList.jsp");
    } catch(Exception e) {
        e.printStackTrace();
    } finally {
        if(pstmt != null) pstmt.close();
        if(conn != null) conn.close();
    }
%>`
            },
            step5: {
                title: "STEP 5. 회원 목록 조회 및 수정 (memberList.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원목록조회/수정</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #2563eb; color: white; padding: 1rem; }
    nav { background-color: #1e40af; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 750px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: center; }
    th { background-color: #f1f5f9; }
</style>
</head>
<body>
    <header><h1>쇼핑몰 회원관리 프로그램 ver 1.0</h1></header>
    <nav>
        <a href="join.jsp">회원등록</a>
        <a href="memberList.jsp">회원목록조회/수정</a>
        <a href="salaryList.jsp">회원매출조회</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>회원목록조회/수정</h2>
        <table>
            <tr>
                <th>회원번호</th>
                <th>회원성명</th>
                <th>전화번호</th>
                <th>주소</th>
                <th>가입일자</th>
                <th>고객등급</th>
                <th>거주도시</th>
            </tr>
            <%
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = DBConnection.getConnection();
                    // 등급 한글 변환: CASE WHEN 사용
                    String sql = "SELECT custno, custname, phone, address, joindate, "
                               + "CASE grade WHEN 'A' THEN 'VIP' WHEN 'B' THEN '일반' WHEN 'C' THEN '직원' END AS grade_name, "
                               + "city FROM member_tbl_02 ORDER BY custno ASC";
                    pstmt = conn.prepareStatement(sql);
                    rs = pstmt.executeQuery();
                    while(rs.next()) {
            %>
            <tr>
                <td><a href="memberUpdate.jsp?custno=<%= rs.getInt("custno") %>"><%= rs.getInt("custno") %></a></td>
                <td><%= rs.getString("custname") %></td>
                <td><%= rs.getString("phone") %></td>
                <td><%= rs.getString("address") %></td>
                <td><%= rs.getDate("joindate") %></td>
                <td><%= rs.getString("grade_name") %></td>
                <td><%= rs.getString("city") %></td>
            </tr>
            <%
                    }
                } catch(Exception e) {
                    e.printStackTrace();
                } finally {
                    if(rs != null) rs.close();
                    if(pstmt != null) pstmt.close();
                    if(conn != null) conn.close();
                }
            %>
        </table>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 All rights reserved. Human Resources Development Service of Korea</p></footer>
</body>
</html>`
            },
            step6: {
                title: "STEP 6. 회원별 매출 통계 (salaryList.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원매출조회</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #2563eb; color: white; padding: 1rem; }
    nav { background-color: #1e40af; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 600px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: center; }
    th { background-color: #f1f5f9; }
    .price-cell { text-align: right; padding-right: 20px; font-weight: bold; }
</style>
</head>
<body>
    <header><h1>쇼핑몰 회원관리 프로그램 ver 1.0</h1></header>
    <nav>
        <a href="join.jsp">회원등록</a>
        <a href="memberList.jsp">회원목록조회/수정</a>
        <a href="salaryList.jsp">회원매출조회</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>회원매출조회</h2>
        <table>
            <tr>
                <th>회원번호</th>
                <th>회원성명</th>
                <th>고객등급</th>
                <th>매출</th>
            </tr>
            <%
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = DBConnection.getConnection();
                    // LEFT JOIN으로 구매내역 없는 회원 포함 & IFNULL로 0원 처리
                    String sql = "SELECT mm.custno, mm.custname, "
                               + "CASE mm.grade WHEN 'A' THEN 'VIP' WHEN 'B' THEN '일반' WHEN 'C' THEN '직원' END AS grade_name, "
                               + "IFNULL(SUM(mn.price), 0) AS total_price "
                               + "FROM member_tbl_02 mm "
                               + "LEFT JOIN money_tbl_02 mn ON mm.custno = mn.custno "
                               + "GROUP BY mm.custno, mm.custname, mm.grade "
                               + "ORDER BY total_price DESC, mm.custno ASC";
                    pstmt = conn.prepareStatement(sql);
                    rs = pstmt.executeQuery();
                    while(rs.next()) {
            %>
            <tr>
                <td><%= rs.getInt("custno") %></td>
                <td><%= rs.getString("custname") %></td>
                <td><%= rs.getString("grade_name") %></td>
                <td class="price-cell"><%= String.format("%,d", rs.getInt("total_price")) %></td>
            </tr>
            <%
                    }
                } catch(Exception e) {
                    e.printStackTrace();
                } finally {
                    if(rs != null) rs.close();
                    if(pstmt != null) pstmt.close();
                    if(conn != null) conn.close();
                }
            %>
        </table>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 All rights reserved. Human Resources Development Service of Korea</p></footer>
</body>
</html>`
            }
        }
    },
    exam2: {
        id: "exam2",
        title: "제2회 실전 모의고사: 골프연습장 수강 및 매출 관리 시스템",
        domain: "강습 / 수강 관리 (3자조인 & 할인 로직형)",
        badge: "출제율 2위 ⭐⭐",
        timeLimitMinutes: 120,
        simulatorId: "golf",
        summary: "골프연습장 수강신청 등록, 회원 선택 시 VIP 등급 50% 수강료 자동 감면 로직, 강사별 총 수강인원 및 총수강매출액 통계(3자 조인 + 원화 화폐 표기)를 구현합니다.",
        paper: {
            taskNo: "과제번호: SW-L5-2026-02",
            instructions: [
                "시험시간은 총 2시간(120분)이며, 100점 만점 중 60점 이상 획득 시 합격입니다.",
                "데이터베이스에 강사(tbl_teacher_01), 회원(tbl_member_01), 수강신청(tbl_class_01) 3개 테이블을 정의하고 샘플 데이터를 입력해야 합니다.",
                "수강신청 화면에서 회원을 선택하면 해당 회원의 등급에 따라 VIP 회원은 수강료의 50%를 자동 감면 계산해야 합니다.",
                "강사별 매출 통계 화면에서는 수강신청 이력이 없는 강사도 반드시 목록에 표기(LEFT JOIN)되어야 하며, 매출액은 0원으로 출력되어야 합니다.",
                "모든 통화 금액은 세 자리 콤마 포맷(예: 100,000 또는 ₩100,000)으로 가독성 있게 표기해야 합니다."
            ],
            tables: [
                {
                    name: "tbl_teacher_01 (강사 정보 테이블)",
                    columns: [
                        { name: "teacher_code", type: "CHAR(3)", key: "PK", nn: "Y", desc: "강사코드 (100, 200, 300, 400)" },
                        { name: "teacher_name", type: "VARCHAR(15)", key: "", nn: "Y", desc: "강사명" },
                        { name: "class_name", type: "VARCHAR(20)", key: "", nn: "N", desc: "강의명" },
                        { name: "class_price", type: "INT", key: "", nn: "N", desc: "강의료 (단가)" },
                        { name: "teacher_regist_date", type: "VARCHAR(8)", key: "", nn: "N", desc: "자격취득일자" }
                    ]
                },
                {
                    name: "tbl_member_01 (회원 정보 테이블)",
                    columns: [
                        { name: "c_no", type: "CHAR(5)", key: "PK", nn: "Y", desc: "회원번호 (10001부터)" },
                        { name: "c_name", type: "VARCHAR(15)", key: "", nn: "Y", desc: "회원성명" },
                        { name: "phone", type: "VARCHAR(15)", key: "", nn: "N", desc: "연락처" },
                        { name: "address", type: "VARCHAR(50)", key: "", nn: "N", desc: "거주지" },
                        { name: "grade", type: "VARCHAR(6)", key: "", nn: "N", desc: "가입등급 (일반, VIP)" }
                    ]
                },
                {
                    name: "tbl_class_01 (수강신청 정보 테이블)",
                    columns: [
                        { name: "regist_month", type: "CHAR(6)", key: "PK", nn: "Y", desc: "수강월 (예: 202401)" },
                        { name: "c_no", type: "CHAR(5)", key: "PK,FK", nn: "Y", desc: "회원번호" },
                        { name: "class_area", type: "VARCHAR(15)", key: "", nn: "N", desc: "강의장소" },
                        { name: "tuition", type: "INT", key: "", nn: "N", desc: "수강료 (VIP 50% 할인)" },
                        { name: "teacher_code", type: "CHAR(3)", key: "FK", nn: "Y", desc: "강사코드" }
                    ]
                }
            ],
            requirements: [
                {
                    title: "1. 3개 테이블 DDL 및 샘플 데이터 구축 (15점)",
                    details: "강사, 회원, 수강신청 테이블의 기본키(PK) 및 외래키(FK)를 올바르게 정의하고 스크립트를 실행하여 데이터 무결성을 검증한다."
                },
                {
                    title: "2. DB 연결 및 공통 레이아웃 (10점)",
                    details: "골프연습장 전용 DB 연결 모듈 및 네비게이션 메뉴(강사조회, 수강신청, 회원정보조회, 강사매출통계, 홈으로)를 구축한다."
                },
                {
                    title: "3. 수강신청 등록 화면 (class_join.jsp) (25점)",
                    details: "수강월, 회원명(select), 강의장소(radio), 강의명(select), 수강료(text/readonly)를 구성한다. 회원 선택 및 강의 선택 시 자바스크립트로 VIP 등급 확인 후 50% 할인 금액을 자동 계산하여 수강료 입력칸에 표시한다. 유효성 검사 필수."
                },
                {
                    title: "4. 수강신청 처리 (class_join_action.jsp) (10점)",
                    details: "수강월, 회원번호, 강의장소, 최종수강료, 강사코드를 수강신청 테이블(tbl_class_01)에 INSERT하고 강사매출통계 페이지로 이동한다."
                },
                {
                    title: "5. 강사 목록 조회 (teacher_list.jsp) (15점)",
                    details: "강사코드, 강사명, 강의명, 수강료(원화 포맷), 자격취득일자(YYYY년 MM월 DD일 포맷 변환)를 출력한다."
                },
                {
                    title: "6. 강사별 매출 통계 조회 (teacher_salary.jsp) (25점)",
                    details: "강사코드, 강의명, 강사명, 총 수강인원(COUNT), 총 수강매출액(SUM)을 산출한다. 수강생이 없는 강사도 반드시 0명, 0원으로 표기(LEFT JOIN)하고 총매출액 내림차순으로 정렬한다."
                }
            ]
        },
        rubric: [
            { id: 1, title: "강사/회원/수강신청 3개 테이블 생성 및 FK 제약조건", score: 15, deduction: "복합키 누락 또는 외래키 연결 오류 시 수강신청 INSERT 에러 발생" },
            { id: 2, title: "JDBC 공통 모듈 및 드라이버 연동", score: 10, deduction: "DB Connection 오류 시 전 화면 조회 불가" },
            { id: 3, title: "수강신청 화면 회원/강의 select 연동 & VIP 50% 할인 로직", score: 20, deduction: "VIP 50% 감면 미구현 시 수강료 전액 부과로 요구사항 미달(-10점)" },
            { id: 4, title: "자바스크립트 빈값 유효성 검사 (alert & focus)", score: 10, deduction: "수강월, 회원, 강의장소, 강의명 미선택 시 경고창 처리 누락 시 감점" },
            { id: 5, title: "수강신청 INSERT 및 인코딩 처리", score: 10, deduction: "수강 데이터 미저장 또는 중복 키 에러 발생 시 감점" },
            { id: 6, title: "강사 목록 날짜 포맷팅 (YYYY-MM-DD 변환)", score: 10, deduction: "자격취득일자 '20220101' 원문 그대로 노출 시 부분 감점" },
            { id: 7, title: "강사별 매출 통계 LEFT JOIN & IFNULL 0원 처리", score: 15, deduction: "INNER JOIN 사용으로 미신청 강사 누락 시 대폭 감점(-10점)" },
            { id: 8, title: "수강매출액 통화 콤마 포맷 및 총매출액 DESC 정렬", score: 10, deduction: "정렬 기준 미준수 또는 금액 콤마 포맷팅 누락 시 감점" }
        ],
        modelCode: {
            step1: {
                title: "STEP 1. 골프연습장 DDL 및 샘플 데이터",
                lang: "sql",
                code: `-- 골프연습장 DB 생성
CREATE DATABASE IF NOT EXISTS golf_db DEFAULT CHARACTER SET utf8mb4;
USE golf_db;

DROP TABLE IF EXISTS tbl_class_01;
DROP TABLE IF EXISTS tbl_member_01;
DROP TABLE IF EXISTS tbl_teacher_01;

-- 1. 강사 정보 테이블
CREATE TABLE tbl_teacher_01 (
    teacher_code        CHAR(3)     NOT NULL,
    teacher_name        VARCHAR(15) NOT NULL,
    class_name          VARCHAR(20),
    class_price         INT,
    teacher_regist_date VARCHAR(8),
    PRIMARY KEY (teacher_code)
);

-- 2. 회원 정보 테이블
CREATE TABLE tbl_member_01 (
    c_no    CHAR(5)     NOT NULL,
    c_name  VARCHAR(15) NOT NULL,
    phone   VARCHAR(15),
    address VARCHAR(50),
    grade   VARCHAR(6),
    PRIMARY KEY (c_no)
);

-- 3. 수강신청 정보 테이블
CREATE TABLE tbl_class_01 (
    regist_month CHAR(6)     NOT NULL,
    c_no         CHAR(5)     NOT NULL,
    class_area   VARCHAR(15),
    tuition      INT,
    teacher_code CHAR(3)     NOT NULL,
    PRIMARY KEY (regist_month, c_no),
    FOREIGN KEY (c_no) REFERENCES tbl_member_01(c_no),
    FOREIGN KEY (teacher_code) REFERENCES tbl_teacher_01(teacher_code)
);

-- 강사 샘플 데이터
INSERT INTO tbl_teacher_01 VALUES 
('100', '초이골', '초급골프', 100000, '20220101'),
('200', '김프로', '중급골프', 200000, '20210501'),
('300', '박마스', '고급골프', 300000, '20200301'),
('400', '이원포', '원포인트', 400000, '20190801');

-- 회원 샘플 데이터
INSERT INTO tbl_member_01 VALUES 
('10001', '홍길동', '010-1111-2222', '서울 강남구', '일반'),
('10002', '이순신', '010-2222-3333', '서울 서초구', 'VIP'),
('10003', '강감찬', '010-3333-4444', '경기 성남시', '일반'),
('10004', '유관순', '010-4444-5555', '경기 수원시', 'VIP');

-- 수강신청 샘플 데이터
INSERT INTO tbl_class_01 VALUES 
('202401', '10001', '서울본원', 100000, '100'),
('202401', '10002', '서울본원', 100000, '200'),
('202401', '10003', '분당지점', 300000, '300'),
('202401', '10004', '분당지점', 200000, '400');`
            },
            step2: {
                title: "STEP 2. DB 연결 모듈 (DBConnection.java)",
                lang: "java",
                code: `package common;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    public static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/golf_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Seoul&characterEncoding=UTF-8";
        String user = "root";
        String password = "본인비밀번호";
        return DriverManager.getConnection(url, user, password);
    }
}`
            },
            step3: {
                title: "STEP 3. 수강신청 등록 화면 (class_join.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>수강신청 등록</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #047857; color: white; padding: 1rem; }
    nav { background-color: #065f46; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 600px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; }
    th { background-color: #ecfdf5; text-align: right; width: 35%; }
    td { text-align: left; }
    input[type="text"], select { width: 90%; padding: 4px; }
</style>
<script>
// VIP 회원 50% 할인 계산 로직
function calcTuition() {
    var memberSelect = document.frm.c_no;
    var teacherSelect = document.frm.teacher_code;
    var tuitionInput = document.frm.tuition;

    var selectedMemberOption = memberSelect.options[memberSelect.selectedIndex];
    var isVip = selectedMemberOption && selectedMemberOption.getAttribute("data-grade") === "VIP";

    var selectedTeacherOption = teacherSelect.options[teacherSelect.selectedIndex];
    var basePrice = parseInt(selectedTeacherOption ? selectedTeacherOption.getAttribute("data-price") || "0" : "0");

    if (basePrice > 0) {
        if (isVip) {
            tuitionInput.value = basePrice * 0.5; // 50% 감면
        } else {
            tuitionInput.value = basePrice;
        }
    } else {
        tuitionInput.value = "";
    }
}

function checkForm() {
    var f = document.frm;
    if(f.regist_month.value.trim() == "") { alert("수강월이 입력되지 않았습니다."); f.regist_month.focus(); return false; }
    if(f.c_no.value == "") { alert("회원명이 선택되지 않았습니다."); f.c_no.focus(); return false; }
    if(!f.class_area.value) { alert("강의장소가 선택되지 않았습니다."); return false; }
    if(f.teacher_code.value == "") { alert("강의명이 선택되지 않았습니다."); f.teacher_code.focus(); return false; }
    alert("수강신청이 완료되었습니다!");
    return true;
}
</script>
</head>
<body>
    <header><h1>골프연습장 회원관리 프로그램 ver 1.0</h1></header>
    <nav>
        <a href="teacher_list.jsp">강사조회</a>
        <a href="class_join.jsp">수강신청</a>
        <a href="member_list.jsp">회원정보조회</a>
        <a href="teacher_salary.jsp">강사매출통계</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>수강 신청 등록</h2>
        <form name="frm" action="class_join_action.jsp" method="post" onsubmit="return checkForm();">
            <table>
                <tr>
                    <th>수강월</th>
                    <td><input type="text" name="regist_month" placeholder="202401"></td>
                </tr>
                <tr>
                    <th>회원명</th>
                    <td>
                        <select name="c_no" onchange="calcTuition()">
                            <option value="">=== 회원 선택 ===</option>
                            <%
                                Connection conn = null;
                                PreparedStatement pstmt = null;
                                ResultSet rs = null;
                                try {
                                    conn = DBConnection.getConnection();
                                    String sql = "SELECT c_no, c_name, grade FROM tbl_member_01 ORDER BY c_no ASC";
                                    pstmt = conn.prepareStatement(sql);
                                    rs = pstmt.executeQuery();
                                    while(rs.next()) {
                            %>
                            <option value="<%= rs.getString("c_no") %>" data-grade="<%= rs.getString("grade") %>">
                                <%= rs.getString("c_name") %> (<%= rs.getString("grade") %>)
                            </option>
                            <%
                                    }
                                } catch(Exception e) { e.printStackTrace(); }
                                finally { if(rs!=null)rs.close(); if(pstmt!=null)pstmt.close(); if(conn!=null)conn.close(); }
                            %>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>강의장소</th>
                    <td>
                        <label><input type="radio" name="class_area" value="서울본원" checked> 서울본원</label>
                        <label><input type="radio" name="class_area" value="분당지점"> 분당지점</label>
                        <label><input type="radio" name="class_area" value="수원지점"> 수원지점</label>
                    </td>
                </tr>
                <tr>
                    <th>강의명 (강사선택)</th>
                    <td>
                        <select name="teacher_code" onchange="calcTuition()">
                            <option value="">=== 강의 선택 ===</option>
                            <%
                                try {
                                    conn = DBConnection.getConnection();
                                    String sql = "SELECT teacher_code, class_name, teacher_name, class_price FROM tbl_teacher_01 ORDER BY teacher_code ASC";
                                    pstmt = conn.prepareStatement(sql);
                                    rs = pstmt.executeQuery();
                                    while(rs.next()) {
                            %>
                            <option value="<%= rs.getString("teacher_code") %>" data-price="<%= rs.getInt("class_price") %>">
                                <%= rs.getString("class_name") %> - <%= rs.getString("teacher_name") %> 강사 (₩<%= String.format("%,d", rs.getInt("class_price")) %>)
                            </option>
                            <%
                                    }
                                } catch(Exception e) { e.printStackTrace(); }
                                finally { if(rs!=null)rs.close(); if(pstmt!=null)pstmt.close(); if(conn!=null)conn.close(); }
                            %>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>수강료 (VIP 50% 감면)</th>
                    <td><input type="text" name="tuition" readonly style="background:#f1f5f9; font-weight:bold; color:#047857;"></td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center;">
                        <input type="submit" value="수강신청">
                        <input type="reset" value="다시쓰기">
                    </td>
                </tr>
            </table>
        </form>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 Golf Club Management</p></footer>
</body>
</html>`
            },
            step4: {
                title: "STEP 4. 수강신청 처리 (class_join_action.jsp)",
                lang: "java",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<%
    request.setCharacterEncoding("UTF-8");

    String regist_month = request.getParameter("regist_month");
    String c_no = request.getParameter("c_no");
    String class_area = request.getParameter("class_area");
    int tuition = Integer.parseInt(request.getParameter("tuition"));
    String teacher_code = request.getParameter("teacher_code");

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
        conn = DBConnection.getConnection();
        String sql = "INSERT INTO tbl_class_01 (regist_month, c_no, class_area, tuition, teacher_code) VALUES (?, ?, ?, ?, ?)";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, regist_month);
        pstmt.setString(2, c_no);
        pstmt.setString(3, class_area);
        pstmt.setInt(4, tuition);
        pstmt.setString(5, teacher_code);

        pstmt.executeUpdate();
        response.sendRedirect("teacher_salary.jsp");
    } catch(Exception e) {
        e.printStackTrace();
    } finally {
        if(pstmt != null) pstmt.close();
        if(conn != null) conn.close();
    }
%>`
            },
            step5: {
                title: "STEP 5. 강사 정보 조회 (teacher_list.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>강사 정보 조회</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #047857; color: white; padding: 1rem; }
    nav { background-color: #065f46; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 700px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: center; }
    th { background-color: #ecfdf5; }
</style>
</head>
<body>
    <header><h1>골프연습장 회원관리 프로그램 ver 1.0</h1></header>
    <nav>
        <a href="teacher_list.jsp">강사조회</a>
        <a href="class_join.jsp">수강신청</a>
        <a href="member_list.jsp">회원정보조회</a>
        <a href="teacher_salary.jsp">강사매출통계</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>강사 정보 목록</h2>
        <table>
            <tr>
                <th>강사코드</th>
                <th>강사명</th>
                <th>강의명</th>
                <th>수강료</th>
                <th>자격취득일자</th>
            </tr>
            <%
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = DBConnection.getConnection();
                    String sql = "SELECT teacher_code, teacher_name, class_name, class_price, teacher_regist_date FROM tbl_teacher_01 ORDER BY teacher_code ASC";
                    pstmt = conn.prepareStatement(sql);
                    rs = pstmt.executeQuery();
                    while(rs.next()) {
                        String regDate = rs.getString("teacher_regist_date");
                        String formattedDate = regDate;
                        if(regDate != null && regDate.length() == 8) {
                            formattedDate = regDate.substring(0,4) + "년 " + regDate.substring(4,6) + "월 " + regDate.substring(6,8) + "일";
                        }
            %>
            <tr>
                <td><%= rs.getString("teacher_code") %></td>
                <td><%= rs.getString("teacher_name") %></td>
                <td><%= rs.getString("class_name") %></td>
                <td>₩<%= String.format("%,d", rs.getInt("class_price")) %></td>
                <td><%= formattedDate %></td>
            </tr>
            <%
                    }
                } catch(Exception e) { e.printStackTrace(); }
                finally { if(rs!=null)rs.close(); if(pstmt!=null)pstmt.close(); if(conn!=null)conn.close(); }
            %>
        </table>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 Golf Club Management</p></footer>
</body>
</html>`
            },
            step6: {
                title: "STEP 6. 강사별 매출 통계 (teacher_salary.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>강사별 매출 통계</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #047857; color: white; padding: 1rem; }
    nav { background-color: #065f46; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 650px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: center; }
    th { background-color: #ecfdf5; }
    .salary-cell { text-align: right; padding-right: 20px; font-weight: bold; color: #047857; }
</style>
</head>
<body>
    <header><h1>골프연습장 회원관리 프로그램 ver 1.0</h1></header>
    <nav>
        <a href="teacher_list.jsp">강사조회</a>
        <a href="class_join.jsp">수강신청</a>
        <a href="member_list.jsp">회원정보조회</a>
        <a href="teacher_salary.jsp">강사매출통계</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>강사별 매출 통계</h2>
        <table>
            <tr>
                <th>강사코드</th>
                <th>강의명</th>
                <th>강사명</th>
                <th>총 수강인원</th>
                <th>총 매출액</th>
            </tr>
            <%
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = DBConnection.getConnection();
                    // 수강생 없는 강사도 0명/0원 출력(LEFT JOIN + IFNULL)
                    String sql = "SELECT t.teacher_code, t.class_name, t.teacher_name, "
                               + "COUNT(c.c_no) AS student_count, "
                               + "IFNULL(SUM(c.tuition), 0) AS total_tuition "
                               + "FROM tbl_teacher_01 t "
                               + "LEFT JOIN tbl_class_01 c ON t.teacher_code = c.teacher_code "
                               + "GROUP BY t.teacher_code, t.class_name, t.teacher_name "
                               + "ORDER BY total_tuition DESC, t.teacher_code ASC";
                    pstmt = conn.prepareStatement(sql);
                    rs = pstmt.executeQuery();
                    while(rs.next()) {
            %>
            <tr>
                <td><%= rs.getString("teacher_code") %></td>
                <td><%= rs.getString("class_name") %></td>
                <td><%= rs.getString("teacher_name") %></td>
                <td><%= rs.getInt("student_count") %>명</td>
                <td class="salary-cell">₩<%= String.format("%,d", rs.getInt("total_tuition")) %></td>
            </tr>
            <%
                    }
                } catch(Exception e) { e.printStackTrace(); }
                finally { if(rs!=null)rs.close(); if(pstmt!=null)pstmt.close(); if(conn!=null)conn.close(); }
            %>
        </table>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 Golf Club Management</p></footer>
</body>
</html>`
            }
        }
    },
    exam3: {
        id: "exam3",
        title: "제3회 실전 모의고사: 도서관 도서 대출 및 반납 관리 시스템",
        domain: "도서 / 대여 관리 (연체 상태 및 통계형)",
        badge: "출제율 3위 ⭐⭐",
        timeLimitMinutes: 120,
        simulatorId: "library",
        summary: "도서 대출 등록, 대출번호 자동 채번, 반납예정일(+7일) 자동 산출, 대여 현황 조회 및 미반납(N) 건 빨간색 강조, 도서별 대여 횟수 및 미반납 건수 집계를 구현합니다.",
        paper: {
            taskNo: "과제번호: SW-L5-2026-03",
            instructions: [
                "시험시간은 총 2시간(120분)이며, 100점 만점 중 60점 이상 획득 시 합격입니다.",
                "도서 정보 테이블(tbl_book_01)과 대여 테이블(tbl_rental_01)을 생성하고 샘플 레코드를 입력해야 합니다.",
                "도서 대여 등록 시 반납 여부의 기본값은 'N'(미반납)으로 저장되어야 합니다.",
                "도서 대여 목록 화면에서 반납여부가 'N'인 건은 글자색을 붉은색(#dc2626)으로 강조하고 [반납하기] 버튼을 제공해야 합니다.",
                "도서별 대여 통계 조회 시 대여 이력이 없는 도서도 0회로 표기(LEFT JOIN)되어야 합니다."
            ],
            tables: [
                {
                    name: "tbl_book_01 (도서 정보 테이블)",
                    columns: [
                        { name: "book_id", type: "CHAR(5)", key: "PK", nn: "Y", desc: "도서코드 (예: B0001)" },
                        { name: "book_title", type: "VARCHAR(50)", key: "", nn: "Y", desc: "도서명" },
                        { name: "author", type: "VARCHAR(30)", key: "", nn: "N", desc: "저자" },
                        { name: "category", type: "VARCHAR(20)", key: "", nn: "N", desc: "도서분류 (IT, 문학, 과학 등)" }
                    ]
                },
                {
                    name: "tbl_rental_01 (도서 대여 테이블)",
                    columns: [
                        { name: "rent_no", type: "INT", key: "PK", nn: "Y", desc: "대여번호 (자동 증가)" },
                        { name: "book_id", type: "CHAR(5)", key: "FK", nn: "Y", desc: "도서코드" },
                        { name: "user_name", type: "VARCHAR(20)", key: "", nn: "Y", desc: "대여자명" },
                        { name: "rent_date", type: "DATE", key: "", nn: "Y", desc: "대여일자" },
                        { name: "return_yn", type: "CHAR(1)", key: "", nn: "N", desc: "반납여부 (Y: 반납완료, N: 대여중)" }
                    ]
                }
            ],
            requirements: [
                {
                    title: "1. 도서 및 대여 테이블 DDL 및 샘플 데이터 구축 (15점)",
                    details: "기본키(PK), 외래키(FK) 제약조건을 설정하고 대여 테이블의 return_yn 기본값을 'N'으로 지정한다."
                },
                {
                    title: "2. DB 연결 및 일관된 레이아웃 모듈 (10점)",
                    details: "도서관 전용 공통 네비게이션(도서목록, 도서대여등록, 대여현황/반납, 도서별통계, 홈으로)을 구축한다."
                },
                {
                    title: "3. 도서 대여 등록 화면 (rent_join.jsp) (25점)",
                    details: "도서코드(select), 대여자명(text), 대여일자(오늘 날짜 기본 세팅), 반납여부('N' 고정)를 구성한다. 유효성 검사 필수."
                },
                {
                    title: "4. 도서 대여 처리 (rent_join_action.jsp) (10점)",
                    details: "한글 UTF-8 인코딩 처리 후 PreparedStatement로 tbl_rental_01에 INSERT하고 대여현황 화면으로 이동한다."
                },
                {
                    title: "5. 대여 현황 조회 및 반납 처리 (rent_list.jsp / return_action.jsp) (20점)",
                    details: "대여번호, 도서코드, 도서명, 대여자명, 대여일자, 반납여부를 출력한다. return_yn이 'N'인 경우 붉은색 볼드체로 '대여중(미반납)' 표시 및 [반납처리] 버튼을 제공하여 클릭 시 UPDATE 처리한다."
                },
                {
                    title: "6. 도서별 대여 통계 조회 (book_stat.jsp) (20점)",
                    details: "도서코드, 도서명, 분류, 총 대여횟수(COUNT), 미반납 건수(SUM CASE WHEN)를 출력한다. 대여 이력이 없는 도서도 0회로 표기(LEFT JOIN)하고 대여횟수 내림차순으로 정렬한다."
                }
            ]
        },
        rubric: [
            { id: 1, title: "도서 및 대여 테이블 DDL 구축 및 PK/FK 정의", score: 15, deduction: "외래키 또는 AUTO_INCREMENT 설정 오류 시 감점" },
            { id: 2, title: "JDBC 드라이버 및 DBConnection 모듈", score: 10, deduction: "DB 연동 실패 시 전 화면 구동 불가로 실격 위험" },
            { id: 3, title: "도서 대여 등록 폼 도서목록 동적 select 연동", score: 15, deduction: "도서 테이블과 연동되지 않고 정적 코딩 시 감점" },
            { id: 4, title: "자바스크립트 빈값 유효성 검사 (alert & focus)", score: 10, deduction: "도서 미선택 또는 대여자명 공백 시 경고창 미발생 감점" },
            { id: 5, title: "대여 등록 Action 및 반납여부 'N' 기본 저장", score: 10, deduction: "한글 깨짐 또는 INSERT 실패 시 감점" },
            { id: 6, title: "대여 목록 미반납(N) 시각적 강조 및 반납 UPDATE 기능", score: 20, deduction: "미반납 강조 누락 또는 반납 상태 업데이트 미작동 시 감점(-10점)" },
            { id: 7, title: "도서별 대여 통계 LEFT JOIN & 미반납 건수 집계", score: 15, deduction: "미대여 도서 누락 또는 대여 0회 처리 실패 시 감점" },
            { id: 8, title: "대여횟수 DESC 정렬 및 디자인 완성도", score: 5, deduction: "정렬 미반영 또는 페이지 레이아웃 깨짐 시 감점" }
        ],
        modelCode: {
            step1: {
                title: "STEP 1. 도서관 DDL 및 샘플 데이터",
                lang: "sql",
                code: `-- 도서관 대여 DB 생성
CREATE DATABASE IF NOT EXISTS library_db DEFAULT CHARACTER SET utf8mb4;
USE library_db;

DROP TABLE IF EXISTS tbl_rental_01;
DROP TABLE IF EXISTS tbl_book_01;

-- 1. 도서 정보 테이블
CREATE TABLE tbl_book_01 (
    book_id    CHAR(5)     NOT NULL,
    book_title VARCHAR(50) NOT NULL,
    author     VARCHAR(30),
    category   VARCHAR(20),
    PRIMARY KEY (book_id)
);

-- 2. 도서 대여 테이블
CREATE TABLE tbl_rental_01 (
    rent_no   INT AUTO_INCREMENT NOT NULL,
    book_id   CHAR(5)            NOT NULL,
    user_name VARCHAR(20)        NOT NULL,
    rent_date DATE               NOT NULL,
    return_yn CHAR(1)            DEFAULT 'N',
    PRIMARY KEY (rent_no),
    FOREIGN KEY (book_id) REFERENCES tbl_book_01(book_id)
);

-- 샘플 데이터 입력
INSERT INTO tbl_book_01 VALUES 
('B0001', '자바 프로그래밍 입문', '김자바', 'IT'),
('B0002', '데이터베이스 SQL 정복', '이디비', 'IT'),
('B0003', '어린 왕자', '생텍쥐페리', '문학'),
('B0004', '우주의 신비', '칼세이건', '과학');

INSERT INTO tbl_rental_01 (book_id, user_name, rent_date, return_yn) VALUES 
('B0001', '김철수', '2024-01-05', 'Y'),
('B0001', '이영희', '2024-01-12', 'N'),
('B0002', '박민수', '2024-01-10', 'N'),
('B0003', '최사랑', '2024-01-15', 'Y');`
            },
            step2: {
                title: "STEP 2. DB 연결 모듈 (DBConnection.java)",
                lang: "java",
                code: `package common;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    public static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/library_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Seoul&characterEncoding=UTF-8";
        String user = "root";
        String password = "본인비밀번호";
        return DriverManager.getConnection(url, user, password);
    }
}`
            },
            step3: {
                title: "STEP 3. 도서 대여 등록 화면 (rent_join.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>도서 대여 등록</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #4f46e5; color: white; padding: 1rem; }
    nav { background-color: #3730a3; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 550px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; }
    th { background-color: #eef2ff; text-align: right; width: 35%; }
    td { text-align: left; }
    input[type="text"], select { width: 90%; padding: 4px; }
</style>
<script>
function checkForm() {
    var f = document.frm;
    if(f.book_id.value == "") { alert("대여할 도서를 선택하세요."); f.book_id.focus(); return false; }
    if(f.user_name.value.trim() == "") { alert("대여자 성명을 입력하세요."); f.user_name.focus(); return false; }
    if(f.rent_date.value.trim() == "") { alert("대여일자를 입력하세요."); f.rent_date.focus(); return false; }
    alert("도서 대여 등록이 완료되었습니다!");
    return true;
}
</script>
</head>
<body>
    <header><h1>지역 도서관 대여관리 시스템 ver 1.0</h1></header>
    <nav>
        <a href="book_list.jsp">도서목록</a>
        <a href="rent_join.jsp">도서대여등록</a>
        <a href="rent_list.jsp">대여현황/반납</a>
        <a href="book_stat.jsp">도서별대여통계</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>신규 도서 대여 등록</h2>
        <form name="frm" action="rent_join_action.jsp" method="post" onsubmit="return checkForm();">
            <table>
                <tr>
                    <th>대여 도서 선택</th>
                    <td>
                        <select name="book_id">
                            <option value="">=== 대여 도서 선택 ===</option>
                            <%
                                Connection conn = null;
                                PreparedStatement pstmt = null;
                                ResultSet rs = null;
                                try {
                                    conn = DBConnection.getConnection();
                                    String sql = "SELECT book_id, book_title, author FROM tbl_book_01 ORDER BY book_id ASC";
                                    pstmt = conn.prepareStatement(sql);
                                    rs = pstmt.executeQuery();
                                    while(rs.next()) {
                            %>
                            <option value="<%= rs.getString("book_id") %>">
                                [<%= rs.getString("book_id") %>] <%= rs.getString("book_title") %> (<%= rs.getString("author") %>)
                            </option>
                            <%
                                    }
                                } catch(Exception e) { e.printStackTrace(); }
                                finally { if(rs!=null)rs.close(); if(pstmt!=null)pstmt.close(); if(conn!=null)conn.close(); }
                            %>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>대여자 성명</th>
                    <td><input type="text" name="user_name"></td>
                </tr>
                <tr>
                    <th>대여일자</th>
                    <td><input type="text" name="rent_date" value="2024-01-20"></td>
                </tr>
                <tr>
                    <th>반납여부</th>
                    <td><input type="text" name="return_yn" value="N" readonly style="background:#f1f5f9; font-weight:bold; color:#dc2626;"> (기본값: 대여중)</td>
                </tr>
                <tr>
                    <td colspan="2" style="text-align: center;">
                        <input type="submit" value="대여 등록">
                        <input type="button" value="대여현황 보기" onclick="location.href='rent_list.jsp'">
                    </td>
                </tr>
            </table>
        </form>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 Library Management System</p></footer>
</body>
</html>`
            },
            step4: {
                title: "STEP 4. 대여 등록 처리 (rent_join_action.jsp)",
                lang: "java",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<%
    request.setCharacterEncoding("UTF-8");

    String book_id = request.getParameter("book_id");
    String user_name = request.getParameter("user_name");
    String rent_date = request.getParameter("rent_date");
    String return_yn = "N";

    Connection conn = null;
    PreparedStatement pstmt = null;

    try {
        conn = DBConnection.getConnection();
        String sql = "INSERT INTO tbl_rental_01 (book_id, user_name, rent_date, return_yn) VALUES (?, ?, ?, ?)";
        pstmt = conn.prepareStatement(sql);
        pstmt.setString(1, book_id);
        pstmt.setString(2, user_name);
        pstmt.setString(3, rent_date);
        pstmt.setString(4, return_yn);

        pstmt.executeUpdate();
        response.sendRedirect("rent_list.jsp");
    } catch(Exception e) {
        e.printStackTrace();
    } finally {
        if(pstmt != null) pstmt.close();
        if(conn != null) conn.close();
    }
%>`
            },
            step5: {
                title: "STEP 5. 대여 현황 조회 및 반납 처리 (rent_list.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>도서 대여 현황 및 반납</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #4f46e5; color: white; padding: 1rem; }
    nav { background-color: #3730a3; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 800px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: center; }
    th { background-color: #eef2ff; }
    .status-n { color: #dc2626; font-weight: bold; background-color: #fef2f2; }
    .status-y { color: #059669; font-weight: bold; }
    .btn-return { background-color: #2563eb; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; }
</style>
</head>
<body>
    <header><h1>지역 도서관 대여관리 시스템 ver 1.0</h1></header>
    <nav>
        <a href="book_list.jsp">도서목록</a>
        <a href="rent_join.jsp">도서대여등록</a>
        <a href="rent_list.jsp">대여현황/반납</a>
        <a href="book_stat.jsp">도서별대여통계</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>도서 대여 현황 및 반납 처리</h2>
        <table>
            <tr>
                <th>대여번호</th>
                <th>도서코드</th>
                <th>도서명</th>
                <th>대여자명</th>
                <th>대여일자</th>
                <th>반납여부</th>
                <th>반납처리</th>
            </tr>
            <%
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = DBConnection.getConnection();
                    String sql = "SELECT r.rent_no, r.book_id, b.book_title, r.user_name, r.rent_date, r.return_yn "
                               + "FROM tbl_rental_01 r "
                               + "JOIN tbl_book_01 b ON r.book_id = b.book_id "
                               + "ORDER BY r.rent_no DESC";
                    pstmt = conn.prepareStatement(sql);
                    rs = pstmt.executeQuery();
                    while(rs.next()) {
                        String returnYn = rs.getString("return_yn");
            %>
            <tr>
                <td><%= rs.getInt("rent_no") %></td>
                <td><%= rs.getString("book_id") %></td>
                <td><%= rs.getString("book_title") %></td>
                <td><%= rs.getString("user_name") %></td>
                <td><%= rs.getDate("rent_date") %></td>
                <td class="<%= "N".equals(returnYn) ? "status-n" : "status-y" %>">
                    <%= "N".equals(returnYn) ? "대여중 (미반납)" : "반납완료" %>
                </td>
                <td>
                    <% if("N".equals(returnYn)) { %>
                        <button class="btn-return" onclick="location.href='return_action.jsp?rent_no=<%= rs.getInt("rent_no") %>'">반납하기</button>
                    <% } else { %>
                        -
                    <% } %>
                </td>
            </tr>
            <%
                    }
                } catch(Exception e) { e.printStackTrace(); }
                finally { if(rs!=null)rs.close(); if(pstmt!=null)pstmt.close(); if(conn!=null)conn.close(); }
            %>
        </table>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 Library Management System</p></footer>
</body>
</html>`
            },
            step6: {
                title: "STEP 6. 도서별 대여 통계 (book_stat.jsp)",
                lang: "html",
                code: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>도서별 대여 통계</title>
<style>
    body { font-family: 'Malgun Gothic', sans-serif; text-align: center; margin: 0; }
    header, footer { background-color: #4f46e5; color: white; padding: 1rem; }
    nav { background-color: #3730a3; padding: 0.5rem; }
    nav a { color: white; text-decoration: none; margin: 0 15px; font-weight: bold; }
    section { padding: 2rem; }
    table { margin: 0 auto; border-collapse: collapse; width: 700px; }
    th, td { border: 1px solid #cbd5e1; padding: 8px; text-align: center; }
    th { background-color: #eef2ff; }
</style>
</head>
<body>
    <header><h1>지역 도서관 대여관리 시스템 ver 1.0</h1></header>
    <nav>
        <a href="book_list.jsp">도서목록</a>
        <a href="rent_join.jsp">도서대여등록</a>
        <a href="rent_list.jsp">대여현황/반납</a>
        <a href="book_stat.jsp">도서별대여통계</a>
        <a href="index.jsp">홈으로</a>
    </nav>
    <section>
        <h2>도서별 대여 통계</h2>
        <table>
            <tr>
                <th>도서코드</th>
                <th>도서명</th>
                <th>분류</th>
                <th>총 대여횟수</th>
                <th>대여중(미반납) 건수</th>
            </tr>
            <%
                Connection conn = null;
                PreparedStatement pstmt = null;
                ResultSet rs = null;
                try {
                    conn = DBConnection.getConnection();
                    // 대여 이력 없는 도서도 0회 표기(LEFT JOIN)
                    String sql = "SELECT b.book_id, b.book_title, b.category, "
                               + "COUNT(r.rent_no) AS total_rent, "
                               + "SUM(CASE WHEN r.return_yn = 'N' THEN 1 ELSE 0 END) AS unreturned_count "
                               + "FROM tbl_book_01 b "
                               + "LEFT JOIN tbl_rental_01 r ON b.book_id = r.book_id "
                               + "GROUP BY b.book_id, b.book_title, b.category "
                               + "ORDER BY total_rent DESC, b.book_id ASC";
                    pstmt = conn.prepareStatement(sql);
                    rs = pstmt.executeQuery();
                    while(rs.next()) {
            %>
            <tr>
                <td><%= rs.getString("book_id") %></td>
                <td><%= rs.getString("book_title") %></td>
                <td><%= rs.getString("category") %></td>
                <td><strong><%= rs.getInt("total_rent") %>회</strong></td>
                <td style="<%= rs.getInt("unreturned_count") > 0 ? "color:#dc2626; font-weight:bold;" : "" %>">
                    <%= rs.getInt("unreturned_count") %>권
                </td>
            </tr>
            <%
                    }
                } catch(Exception e) { e.printStackTrace(); }
                finally { if(rs!=null)rs.close(); if(pstmt!=null)pstmt.close(); if(conn!=null)conn.close(); }
            %>
        </table>
    </section>
    <footer><p>HRDKOREA Copyright &copy; 2026 Library Management System</p></footer>
</body>
</html>`
            }
        }
    }
};

// ==========================================================================
// 실기 모의고사 6대 과제별 자동 정답 검증 규칙 (Rule-based Code Validator)
// ==========================================================================
const PRACTICAL_TASKS = [
    { key: "step1", filename: "init.sql", maxScore: 15, title: "STEP 1: DB 스키마 & 샘플데이터" },
    { key: "step2", filename: "DBConnection.java", maxScore: 10, title: "STEP 2: JDBC 연동 공통 모듈" },
    { key: "step3", filename: "join.jsp / regist.jsp", maxScore: 20, title: "STEP 3: 등록 폼 & JS 유효성 검사" },
    { key: "step4", filename: "action.jsp", maxScore: 15, title: "STEP 4: DB INSERT 등록 처리" },
    { key: "step5", filename: "list.jsp", maxScore: 20, title: "STEP 5: 목록 조회 및 수정 화면" },
    { key: "step6", filename: "salary.jsp / stats.jsp", maxScore: 20, title: "STEP 6: 통계/매출 집계 조회" }
];

const PRACTICAL_RULES = {
    exam1: {
        step1: [
            { score: 5, desc: "member_tbl_02 회원 테이블 및 PK(custno) 생성", test: code => /CREATE\s+TABLE.*member_tbl_02/i.test(code) && /custno/i.test(code) && /PRIMARY\s+KEY/i.test(code) },
            { score: 5, desc: "money_tbl_02 매출 테이블 및 PK(saleno) 생성", test: code => /CREATE\s+TABLE.*money_tbl_02/i.test(code) && /saleno/i.test(code) },
            { score: 5, desc: "회원 및 매출 필수 샘플 데이터(INSERT INTO) 구축", test: code => /INSERT\s+INTO\s+member_tbl_02/i.test(code) && /INSERT\s+INTO\s+money_tbl_02/i.test(code) }
        ],
        step2: [
            { score: 4, desc: "MySQL JDBC 드라이버 클래스 로드 (com.mysql.cj.jdbc.Driver)", test: code => /com\.mysql\.cj\.jdbc\.Driver/i.test(code) || /Class\.forName/i.test(code) },
            { score: 4, desc: "DriverManager.getConnection으로 DB 연결 및 UTF-8 인코딩 파라미터 적용", test: code => /DriverManager\.getConnection/i.test(code) && /characterEncoding=UTF-8/i.test(code) },
            { score: 2, desc: "정적 getConnection() 유틸리티 메소드 구현", test: code => /public\s+static\s+Connection\s+getConnection/i.test(code) }
        ],
        step3: [
            { score: 5, desc: "신규 회원번호 자동 채번 (MAX(custno) + 1) 구현", test: code => /MAX\s*\(\s*custno\s*\)\s*\+\s*1/i.test(code) || (/MAX\s*\(\s*custno\s*\)/i.test(code) && /\+\s*1/.test(code)) },
            { score: 5, desc: "회원번호 입력란 읽기 전용(readonly) 적용", test: code => /readonly/i.test(code) && /custno/i.test(code) },
            { score: 5, desc: "필수 입력 항목(성명, 전화번호 등) 누락 시 alert() 및 focus() 호출", test: code => /alert\s*\(/i.test(code) && /\.focus\s*\(\s*\)/i.test(code) },
            { score: 5, desc: "유효성 검증 실패 시 submit 차단 (return false) 및 가입일자 자동 설정", test: code => /return\s+false/i.test(code) && (/joindate/i.test(code) || /SimpleDateFormat/i.test(code) || /new\s+Date/i.test(code)) }
        ],
        step4: [
            { score: 4, desc: "요청 한글 UTF-8 인코딩 처리 (setCharacterEncoding)", test: code => /setCharacterEncoding\s*\(\s*["']UTF-8["']\s*\)/i.test(code) },
            { score: 6, desc: "PreparedStatement를 사용한 안전한 INSERT 쿼리 및 executeUpdate()", test: code => /INSERT\s+INTO\s+member_tbl_02/i.test(code) && /prepareStatement/i.test(code) && /executeUpdate\s*\(\s*\)/i.test(code) },
            { score: 5, desc: "등록 완료 알림창 후 목록(memberList.jsp) 리다이렉트 이동", test: code => /sendRedirect\s*\(\s*["']memberList\.jsp/i.test(code) || /location\.href\s*=\s*["']memberList\.jsp/i.test(code) }
        ],
        step5: [
            { score: 8, desc: "회원 목록 SELECT 및 CASE WHEN을 통한 등급(A/B/C) 한글 변환", test: code => /SELECT/i.test(code) && /CASE/i.test(code) && /WHEN\s+['"]A['"]\s+THEN\s+['"]VIP['"]/i.test(code) },
            { score: 6, desc: "회원번호 기준 오름차순(ORDER BY custno ASC) 정렬", test: code => /ORDER\s+BY\s+custno/i.test(code) },
            { score: 6, desc: "회원번호 하이퍼링크 및 수정 화면(memberUpdate.jsp) 파라미터 전달", test: code => /href=.*memberUpdate\.jsp\?custno=/i.test(code) }
        ],
        step6: [
            { score: 8, desc: "구매 이력 없는 회원도 포함하는 LEFT JOIN 구현", test: code => /LEFT\s+(OUTER\s+)?JOIN\s+money_tbl_02/i.test(code) },
            { score: 6, desc: "매출 없는 회원의 총매출 0원 변환 (IFNULL 또는 COALESCE)", test: code => /(IFNULL|COALESCE)\s*\(\s*SUM/i.test(code) },
            { score: 6, desc: "GROUP BY 회원번호 및 총매출 내림차순(DESC) 정렬", test: code => /GROUP\s+BY/i.test(code) && /ORDER\s+BY.*DESC/i.test(code) }
        ]
    },
    exam2: {
        step1: [
            { score: 5, desc: "강사 테이블(tbl_teacher_01) 및 PK(teacher_code) 생성", test: code => /tbl_teacher_01/i.test(code) && /PRIMARY\s+KEY/i.test(code) },
            { score: 5, desc: "회원(tbl_member_01) 및 수강신청(tbl_class_01) 복합키/FK 생성", test: code => /tbl_member_01/i.test(code) && /tbl_class_01/i.test(code) && /PRIMARY\s+KEY/i.test(code) },
            { score: 5, desc: "3개 테이블 샘플 데이터(INSERT INTO) 입력", test: code => /INSERT\s+INTO\s+tbl_teacher_01/i.test(code) && /INSERT\s+INTO\s+tbl_member_01/i.test(code) }
        ],
        step2: [
            { score: 4, desc: "MySQL JDBC 드라이버 클래스 로드", test: code => /com\.mysql\.cj\.jdbc\.Driver/i.test(code) || /Class\.forName/i.test(code) },
            { score: 4, desc: "golf_db 데이터베이스 연결 및 UTF-8 인코딩 지정", test: code => /DriverManager\.getConnection/i.test(code) && /characterEncoding=UTF-8/i.test(code) },
            { score: 2, desc: "정적 getConnection() 유틸리티 메소드 구현", test: code => /public\s+static\s+Connection\s+getConnection/i.test(code) }
        ],
        step3: [
            { score: 6, desc: "VIP 회원(c_no >= 20000) 50% 수강료 자동 계산 JS 로직 (calcTuition)", test: code => /function\s+calcTuition/i.test(code) && (/\*\s*0\.5/.test(code) || /\/\s*2/.test(code) || /VIP/i.test(code)) },
            { score: 5, desc: "수강료 입력란 읽기 전용(readonly) 적용", test: code => /readonly/i.test(code) && /tuition/i.test(code) },
            { score: 5, desc: "수강월, 회원명, 강의 선택 누락 시 alert() 및 focus() 처리", test: code => /alert\s*\(/i.test(code) && /\.focus\s*\(\s*\)/i.test(code) },
            { score: 4, desc: "폼 제출 유효성 통과 제어 (return false)", test: code => /return\s+false/i.test(code) }
        ],
        step4: [
            { score: 4, desc: "요청 한글 UTF-8 인코딩 처리 (setCharacterEncoding)", test: code => /setCharacterEncoding\s*\(\s*["']UTF-8["']\s*\)/i.test(code) },
            { score: 6, desc: "tbl_class_01 테이블 INSERT 및 executeUpdate()", test: code => /INSERT\s+INTO\s+tbl_class_01/i.test(code) && /executeUpdate\s*\(\s*\)/i.test(code) },
            { score: 5, desc: "수강신청 완료 alert 후 강사매출통계(teacher_salary.jsp)로 이동", test: code => /teacher_salary\.jsp/i.test(code) }
        ],
        step5: [
            { score: 8, desc: "강사 정보 목록 조회 및 String.format 통화(₩) 포맷팅", test: code => /SELECT.*FROM\s+tbl_teacher_01/i.test(code) && (/String\.format/i.test(code) || /%,d/.test(code) || /\\/i.test(code) || /₩/.test(code)) },
            { score: 6, desc: "자격취득일자 YYYY년 MM월 DD일 날짜 포맷팅", test: code => /substring/i.test(code) || /SimpleDateFormat/i.test(code) || /년.*월.*일/.test(code) },
            { score: 6, desc: "강사코드 기준 오름차순(ORDER BY teacher_code ASC) 정렬", test: code => /ORDER\s+BY\s+teacher_code/i.test(code) }
        ],
        step6: [
            { score: 8, desc: "수강생이 없는 강사도 표시하는 LEFT JOIN tbl_class_01", test: code => /LEFT\s+(OUTER\s+)?JOIN\s+tbl_class_01/i.test(code) },
            { score: 6, desc: "총매출 0원 처리(IFNULL) 및 수강건수 집계(COUNT)", test: code => /(IFNULL|COALESCE)\s*\(\s*SUM/i.test(code) && /COUNT/i.test(code) },
            { score: 6, desc: "GROUP BY 강사정보 및 총매출 내림차순(DESC) 정렬", test: code => /GROUP\s+BY/i.test(code) && /ORDER\s+BY.*DESC/i.test(code) }
        ]
    },
    exam3: {
        step1: [
            { score: 5, desc: "도서 테이블(tbl_book_01) 및 PK(book_id) 생성", test: code => /tbl_book_01/i.test(code) && /PRIMARY\s+KEY/i.test(code) },
            { score: 5, desc: "대여 테이블(tbl_rental_01) 생성 및 return_yn 기본값 'N' 지정", test: code => /tbl_rental_01/i.test(code) && /DEFAULT\s+['"]N['"]/i.test(code) },
            { score: 5, desc: "도서 및 대여 샘플 데이터(INSERT INTO) 구축", test: code => /INSERT\s+INTO\s+tbl_book_01/i.test(code) && /INSERT\s+INTO\s+tbl_rental_01/i.test(code) }
        ],
        step2: [
            { score: 4, desc: "MySQL JDBC 드라이버 로드", test: code => /com\.mysql\.cj\.jdbc\.Driver/i.test(code) || /Class\.forName/i.test(code) },
            { score: 4, desc: "library_db DB 연결 및 UTF-8 인코딩 설정", test: code => /DriverManager\.getConnection/i.test(code) && /characterEncoding=UTF-8/i.test(code) },
            { score: 2, desc: "정적 getConnection() 유틸리티 메소드 구현", test: code => /public\s+static\s+Connection\s+getConnection/i.test(code) }
        ],
        step3: [
            { score: 6, desc: "도서 목록 DB 조회 후 <select> 드롭다운에 동적 바인딩", test: code => /<select.*name=["']book_id["']/i.test(code) && /while\s*\(\s*rs\.next\s*\(\s*\)\s*\)/i.test(code) },
            { score: 5, desc: "대여상태 'N(대여중)' 기본값 및 readonly 적용", test: code => /return_yn/i.test(code) && /['"]N['"]/i.test(code) && /readonly/i.test(code) },
            { score: 5, desc: "대여자 성명, 연락처 누락 시 alert() 및 focus() 유효성 검사", test: code => /alert\s*\(/i.test(code) && /\.focus\s*\(\s*\)/i.test(code) },
            { score: 4, desc: "폼 제출 제어 (return false)", test: code => /return\s+false/i.test(code) }
        ],
        step4: [
            { score: 4, desc: "요청 한글 UTF-8 인코딩 (setCharacterEncoding)", test: code => /setCharacterEncoding\s*\(\s*["']UTF-8["']\s*\)/i.test(code) },
            { score: 6, desc: "tbl_rental_01 INSERT 쿼리 및 executeUpdate()", test: code => /INSERT\s+INTO\s+tbl_rental_01/i.test(code) && /executeUpdate\s*\(\s*\)/i.test(code) },
            { score: 5, desc: "대여 완료 안내창 후 대여목록(rent_list.jsp) 이동", test: code => /rent_list\.jsp/i.test(code) }
        ],
        step5: [
            { score: 8, desc: "대여목록과 도서 테이블 JOIN 조회", test: code => /tbl_rental_01/i.test(code) && /JOIN\s+tbl_book_01/i.test(code) },
            { score: 6, desc: "미반납(return_yn == 'N') 시 붉은색 강조 및 [반납하기] 버튼 표시", test: code => /return_yn/i.test(code) && /['"]N['"]/i.test(code) && /반납하기/i.test(code) },
            { score: 6, desc: "반납 처리 Action(return_action.jsp?rent_no=) 링크 연결", test: code => /return_action\.jsp\?rent_no=/i.test(code) }
        ],
        step6: [
            { score: 8, desc: "대여 이력 없는 도서도 포함하는 LEFT JOIN tbl_rental_01", test: code => /LEFT\s+(OUTER\s+)?JOIN\s+tbl_rental_01/i.test(code) },
            { score: 6, desc: "총 대여횟수(COUNT) 및 미반납 건수(CASE WHEN return_yn = 'N') 집계", test: code => /COUNT/i.test(code) && (/CASE/i.test(code) || /SUM/i.test(code)) && /['"]N['"]/i.test(code) },
            { score: 6, desc: "GROUP BY 도서정보 및 총 대여횟수 내림차순(DESC) 정렬", test: code => /GROUP\s+BY/i.test(code) && /ORDER\s+BY.*DESC/i.test(code) }
        ]
    }
};

// 수험자 코드 제출 내역 및 점수 저장소
const candidateSubmissions = {
    exam1: { step1: "", step2: "", step3: "", step4: "", step5: "", step6: "" },
    exam2: { step1: "", step2: "", step3: "", step4: "", step5: "", step6: "" },
    exam3: { step1: "", step2: "", step3: "", step4: "", step5: "", step6: "" }
};

const candidateStepResults = {
    exam1: {},
    exam2: {},
    exam3: {}
};

// 실전 모의고사 UI 상태 관리
let currentMockExamId = "exam1";
let activeModelStep = "step1";
let currentEditorTaskKey = "step1";
let mockExamTimerInterval = null;
let mockExamRemainingSeconds = 120 * 60; // 120분

function initMockExamSystem() {
    renderMockExamSelector();
    initCodeEditorKeyHandlers();
    loadMockExam(currentMockExamId);
    initMockTimer();
}

function initCodeEditorKeyHandlers() {
    const editor = document.getElementById("practical-code-editor");
    if (!editor) return;

    // Tab 키를 누르면 4칸 공백 들여쓰기
    editor.addEventListener("keydown", function(e) {
        if (e.key === "Tab") {
            e.preventDefault();
            const start = this.selectionStart;
            const end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "    " + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 4;
            candidateSubmissions[currentMockExamId][currentEditorTaskKey] = this.value;
        } else if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            evaluateCurrentTaskCode();
        }
    });

    // 입력 시 실시간 세션 저장
    editor.addEventListener("input", function() {
        candidateSubmissions[currentMockExamId][currentEditorTaskKey] = this.value;
    });
}

function renderMockExamSelector() {
    const container = document.getElementById("practical-exam-selector-tabs") || document.getElementById("mock-exam-selector-tabs");
    if (!container) return;

    const examKeys = Object.keys(MOCK_EXAMS_DATA);
    container.innerHTML = examKeys.map(key => {
        const exam = MOCK_EXAMS_DATA[key];
        const isActive = key === currentMockExamId;
        return `
            <button type="button" class="mock-exam-tab-btn ${isActive ? 'active' : ''}" onclick="switchPracticalMockExam('${key}')">
                <span class="exam-tab-badge">${exam.badge}</span>
                <span class="exam-tab-title">${exam.title.split(':')[0]}</span>
                <span class="exam-tab-domain">${exam.domain}</span>
            </button>
        `;
    }).join("");
}

function switchPracticalMockExam(examId) {
    if (!MOCK_EXAMS_DATA[examId]) {
        console.warn("Unknown practical examId:", examId);
        return;
    }
    // 현재 에디터 내용 저장
    saveCurrentEditorCode();

    currentMockExamId = examId;
    activeModelStep = "step1";
    currentEditorTaskKey = "step1";

    renderMockExamSelector();
    loadMockExam(examId);
}

function loadMockExam(examId) {
    const exam = MOCK_EXAMS_DATA[examId];
    if (!exam) return;

    // 1. 헤더 정보 반영
    const titleEl = document.getElementById("practical-exam-title") || document.getElementById("current-exam-title");
    const domainEl = document.getElementById("practical-exam-domain") || document.getElementById("current-exam-domain");
    const badgeEl = document.getElementById("practical-exam-badge") || document.getElementById("current-exam-badge");
    const summaryEl = document.getElementById("practical-exam-summary") || document.getElementById("current-exam-summary");
    const simLinkEl = document.getElementById("btn-launch-practical-sim") || document.getElementById("btn-launch-exam-sim");

    if (titleEl) titleEl.textContent = exam.title;
    if (domainEl) domainEl.textContent = exam.domain;
    if (badgeEl) badgeEl.textContent = exam.badge;
    if (summaryEl) summaryEl.textContent = exam.summary;

    if (simLinkEl) {
        simLinkEl.onclick = function() {
            if (typeof switchCategory === 'function') {
                switchCategory('practical', 'tab-simulator');
            } else if (typeof switchTab === 'function') {
                switchTab('tab-simulator');
            }
            if (typeof switchScenario === 'function') {
                switchScenario(exam.simulatorId);
            }
        };
    }

    // 2. 시험 문제지 렌더링
    renderExamPaper(exam);

    // 3. 단계별 모범 답안 렌더링
    renderModelCodeTabs(exam);
    renderActiveModelCode(exam);

    // 4. 실시간 코드 제출 에디터 & 6대 과제 탭 렌더링
    renderPracticalTaskNav();
    loadCurrentTaskToEditor();
    updateOverallExamScoreUI();
}

function saveCurrentEditorCode() {
    const editor = document.getElementById("practical-code-editor");
    if (editor && currentMockExamId && currentEditorTaskKey) {
        candidateSubmissions[currentMockExamId][currentEditorTaskKey] = editor.value;
    }
}

// 6대 과제 탭 바 렌더링
function renderPracticalTaskNav() {
    const container = document.getElementById("practical-task-nav-pills");
    if (!container) return;

    const examResults = candidateStepResults[currentMockExamId] || {};

    container.innerHTML = PRACTICAL_TASKS.map(task => {
        const isActive = task.key === currentEditorTaskKey;
        const res = examResults[task.key];
        
        let statusBadge = `<span class="task-pill-status empty">미제출</span>`;
        if (res) {
            if (res.score === task.maxScore) {
                statusBadge = `<span class="task-pill-status passed">${res.score}/${task.maxScore}점</span>`;
            } else if (res.score > 0) {
                statusBadge = `<span class="task-pill-status partial">${res.score}/${task.maxScore}점</span>`;
            } else {
                statusBadge = `<span class="task-pill-status empty">0/${task.maxScore}점</span>`;
            }
        }

        return `
            <button type="button" class="task-pill-btn ${isActive ? 'active' : ''}" onclick="switchPracticalTask('${task.key}')">
                <span>${task.title.split(':')[0]}</span>
                ${statusBadge}
            </button>
        `;
    }).join("");
}

// 과제 전환
function switchPracticalTask(stepKey) {
    saveCurrentEditorCode();
    currentEditorTaskKey = stepKey;
    renderPracticalTaskNav();
    loadCurrentTaskToEditor();
}

// 현재 과제 코드를 에디터에 로드
function loadCurrentTaskToEditor() {
    const editor = document.getElementById("practical-code-editor");
    const taskInfoEl = document.getElementById("editor-task-filename");
    const maxScoreEl = document.getElementById("editor-task-maxscore");
    const resultBadgeEl = document.getElementById("current-task-score-badge");
    const rulesListEl = document.getElementById("current-task-rules-list");

    const taskMeta = PRACTICAL_TASKS.find(t => t.key === currentEditorTaskKey) || PRACTICAL_TASKS[0];

    if (taskInfoEl) taskInfoEl.textContent = taskMeta.filename;
    if (maxScoreEl) maxScoreEl.textContent = `(배점 ${taskMeta.maxScore}점)`;

    const savedCode = candidateSubmissions[currentMockExamId][currentEditorTaskKey] || "";
    if (editor) {
        editor.value = savedCode;
        editor.placeholder = `-- [${taskMeta.title}] 요구사항에 맞게 소스코드를 작성하세요...`;
    }

    const res = candidateStepResults[currentMockExamId][currentEditorTaskKey];
    if (res) {
        renderTaskEvalResults(res, taskMeta.maxScore);
    } else {
        if (resultBadgeEl) {
            resultBadgeEl.textContent = `미제출 (0 / ${taskMeta.maxScore}점)`;
            resultBadgeEl.style.color = "#dc2626";
        }
        if (rulesListEl) {
            rulesListEl.innerHTML = `
                <div style="text-align: center; padding: 1rem; color: #94a3b8; font-size: 0.85rem;">
                    코드를 작성한 후 <strong>[🧪 내 코드 검증 및 실시간 채점]</strong>을 클릭하세요.
                </div>
            `;
        }
    }
}

// 모범 정답 코드를 에디터에 채우기
function fillModelAnswerToEditor() {
    const exam = MOCK_EXAMS_DATA[currentMockExamId];
    if (!exam || !exam.modelCode[currentEditorTaskKey]) return;

    const modelAnswer = exam.modelCode[currentEditorTaskKey].code;
    const editor = document.getElementById("practical-code-editor");
    if (editor) {
        editor.value = modelAnswer;
        candidateSubmissions[currentMockExamId][currentEditorTaskKey] = modelAnswer;
    }
}

// 현재 과제 코드 초기화
function resetCurrentTaskCode() {
    if (!confirm("작성 중인 코드를 초기화하시겠습니까?")) return;
    const editor = document.getElementById("practical-code-editor");
    if (editor) {
        editor.value = "";
        candidateSubmissions[currentMockExamId][currentEditorTaskKey] = "";
    }
    delete candidateStepResults[currentMockExamId][currentEditorTaskKey];
    loadCurrentTaskToEditor();
    renderPracticalTaskNav();
    updateOverallExamScoreUI();
}

// 단일 과제 코드 자동 채점 및 규칙 분석 실행
function evaluateCurrentTaskCode() {
    saveCurrentEditorCode();
    const code = candidateSubmissions[currentMockExamId][currentEditorTaskKey] || "";
    const taskMeta = PRACTICAL_TASKS.find(t => t.key === currentEditorTaskKey);
    const rules = (PRACTICAL_RULES[currentMockExamId] && PRACTICAL_RULES[currentMockExamId][currentEditorTaskKey]) || [];

    if (!code.trim()) {
        alert("⚠️ 코드가 입력되지 않았습니다. 코드를 작성하거나 [✨ 정답 채우기] 버튼을 활용하세요.");
        return;
    }

    let earnedScore = 0;
    const evaluatedRules = rules.map(rule => {
        let isPass = false;
        try {
            isPass = rule.test(code);
        } catch (e) {
            console.error("Rule evaluation error", e);
            isPass = false;
        }

        if (isPass) {
            earnedScore += rule.score;
        }

        return {
            desc: rule.desc,
            score: rule.score,
            passed: isPass
        };
    });

    // 배점 상한 초과 방지
    earnedScore = Math.min(earnedScore, taskMeta.maxScore);

    const resultObj = {
        score: earnedScore,
        maxScore: taskMeta.maxScore,
        rules: evaluatedRules,
        timestamp: new Date().toLocaleTimeString('ko-KR')
    };

    candidateStepResults[currentMockExamId][currentEditorTaskKey] = resultObj;

    // UI 반영
    renderTaskEvalResults(resultObj, taskMeta.maxScore);
    renderPracticalTaskNav();
    updateOverallExamScoreUI();
}

function renderTaskEvalResults(res, maxScore) {
    const resultBadgeEl = document.getElementById("current-task-score-badge");
    const rulesListEl = document.getElementById("current-task-rules-list");

    if (resultBadgeEl) {
        resultBadgeEl.textContent = `${res.score}점 / ${maxScore}점`;
        resultBadgeEl.style.color = res.score === maxScore ? "#059669" : (res.score >= (maxScore * 0.6) ? "#f59e0b" : "#dc2626");
    }

    if (rulesListEl) {
        rulesListEl.innerHTML = res.rules.map(r => `
            <div class="rule-check-item ${r.passed ? 'passed' : 'failed'}">
                <span class="rule-check-icon">${r.passed ? '🟢' : '🔴'}</span>
                <div class="rule-check-content">
                    <span>${r.desc}</span>
                    <span class="rule-check-score">${r.passed ? `+${r.score}점 획득` : `-${r.score}점 감점`}</span>
                </div>
            </div>
        `).join("");
    }
}

// 전체 6대 과제 누적 점수 계산 및 게이지 반영
function updateOverallExamScoreUI() {
    const examResults = candidateStepResults[currentMockExamId] || {};
    let totalScore = 0;
    let completedTasks = 0;

    PRACTICAL_TASKS.forEach(task => {
        if (examResults[task.key]) {
            totalScore += examResults[task.key].score;
            completedTasks++;
        }
    });

    const liveScoreEl = document.getElementById("practical-live-score");
    const fillEl = document.getElementById("practical-progress-fill");
    const textEl = document.getElementById("practical-progress-text");

    if (liveScoreEl) {
        liveScoreEl.textContent = `${totalScore}점 / 100점`;
        liveScoreEl.style.color = totalScore >= 60 ? "#059669" : "#dc2626";
    }

    if (fillEl) {
        fillEl.style.width = `${totalScore}%`;
    }

    if (textEl) {
        textEl.textContent = `${completedTasks} / 6 과제 채점 완료 (총 ${totalScore}점)`;
    }
}

// 최종 100점 만점 종합 성적표 모달 생성 및 렌더링
function evaluatePracticalScore() {
    const exam = MOCK_EXAMS_DATA[currentMockExamId];
    const examResults = candidateStepResults[currentMockExamId] || {};

    let totalScore = 0;
    const passedDetails = [];
    const deductionDetails = [];

    PRACTICAL_TASKS.forEach(task => {
        const res = examResults[task.key];
        const rules = (PRACTICAL_RULES[currentMockExamId] && PRACTICAL_RULES[currentMockExamId][task.key]) || [];

        if (!res) {
            deductionDetails.push({
                taskTitle: task.title,
                penalty: task.maxScore,
                reason: `과제 소스코드가 제출되지 않았습니다. (-${task.maxScore}점 감점)`
            });
        } else {
            totalScore += res.score;
            res.rules.forEach(r => {
                if (r.passed) {
                    passedDetails.push({
                        taskTitle: task.title,
                        score: r.score,
                        desc: r.desc
                    });
                } else {
                    deductionDetails.push({
                        taskTitle: task.title,
                        penalty: r.score,
                        reason: `${r.desc} 구현 미흡 (-${r.score}점)`
                    });
                }
            });
        }
    });

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

    const modalContainer = document.getElementById("scorecard-modal-content");
    const modalWrapper = document.getElementById("scorecard-modal-wrapper");
    if (!modalContainer || !modalWrapper) return;

    modalContainer.innerHTML = `
        <div class="scorecard-header" style="text-align: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 1.5rem; margin-bottom: 1.5rem;">
            <span class="brand-badge" style="font-size: 0.85rem;">한국산업인력공단 과정평가형 외부평가 실기 채점표</span>
            <h2 style="font-size: 1.6rem; margin: 0.5rem 0; color: #1e1b4b;">${exam.title} 실시간 정답 채점 결과</h2>
            <p style="color: var(--text-muted); font-size: 0.9rem;">진단 일시: ${new Date().toLocaleString('ko-KR')}</p>
        </div>

        <div style="background: #f8fafc; border-radius: 12px; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem; border: 1px solid #e2e8f0;">
            <div style="font-size: 0.95rem; color: var(--text-muted); font-weight: 600;">실전 코드 분석 최종 취득 점수</div>
            <div style="font-size: 3.6rem; font-weight: 900; color: ${tierColor}; margin: 0.2rem 0;">
                ${totalScore} <span style="font-size: 1.5rem; color: #64748b;">/ 100점</span>
            </div>
            <div style="display: inline-block; padding: 0.35rem 1.2rem; border-radius: 999px; background: ${tierColor}15; color: ${tierColor}; font-weight: 800; font-size: 1.05rem;">
                ${gradeTier} (합격 기준: 60점 이상)
            </div>
        </div>

        <div class="grid-2" style="margin-bottom: 1.5rem;">
            <div>
                <h4 style="color: #059669; margin-bottom: 0.6rem;">✔️ 합격 통과 항목 (${passedDetails.length}개)</h4>
                <ul style="list-style: none; padding: 0; max-height: 280px; overflow-y: auto;">
                    ${passedDetails.length === 0 ? `
                        <li style="padding: 1rem; background: #f8fafc; border-radius: 6px; font-size: 0.88rem; color: var(--text-muted); text-align: center;">
                            통과한 항목이 없습니다. 코드를 작성 후 채점을 진행하세요.
                        </li>
                    ` : passedDetails.map(p => `
                        <li style="padding: 0.5rem 0.75rem; background: #ecfdf5; border-radius: 6px; margin-bottom: 0.4rem; font-size: 0.85rem; color: #065f46; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="display: block; font-size: 0.78rem; color: #047857;">[${p.taskTitle.split(':')[0]}]</strong>
                                <span>${p.desc}</span>
                            </div>
                            <strong style="white-space: nowrap; margin-left: 0.5rem;">+${p.score}점</strong>
                        </li>
                    `).join("")}
                </ul>
            </div>

            <div>
                <h4 style="color: #dc2626; margin-bottom: 0.6rem;">⚠️ 감점 및 누락 항목 (${deductionDetails.length}개)</h4>
                <ul style="list-style: none; padding: 0; max-height: 280px; overflow-y: auto;">
                    ${deductionDetails.length === 0 ? `
                        <li style="padding: 1rem; background: #ecfdf5; border-radius: 6px; font-size: 0.9rem; color: #059669; text-align: center; font-weight: 700;">
                            감점 요인이 전혀 없습니다! 100점 만점 합격입니다! 🎉
                        </li>
                    ` : deductionDetails.map(d => `
                        <li style="padding: 0.5rem 0.75rem; background: #fef2f2; border-radius: 6px; margin-bottom: 0.4rem; font-size: 0.85rem; color: #991b1b; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <strong style="display: block; font-size: 0.78rem; color: #b91c1c;">[${d.taskTitle.split(':')[0]}]</strong>
                                <span>${d.reason}</span>
                            </div>
                            <strong style="white-space: nowrap; margin-left: 0.5rem; color: #dc2626;">-${d.penalty}점</strong>
                        </li>
                    `).join("")}
                </ul>
            </div>
        </div>

        <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 1rem; margin-bottom: 1.5rem; font-size: 0.88rem; color: #92400e;">
            💡 <strong>시험관 실제 채점 포인트:</strong> 외부평가 실기는 한글 인코딩(UTF-8) 깨짐이나 DB 연동 장애 발생 시 프로그램 미작동으로 판정되어 실격 처리될 수 있습니다. 1회차 이상 직접 웹 브라우저에서 '등록 ➡️ 조회 ➡️ 매출/통계' 풀사이클을 테스트하여 검증하세요.
        </div>

        <div style="display: flex; justify-content: flex-end; gap: 0.75rem;">
            <button class="btn-secondary" onclick="window.print()">🖨️ 성적표 인쇄 / PDF 저장</button>
            <button class="btn-primary" onclick="closeScorecardModal()">닫기</button>
        </div>
    `;

    modalWrapper.style.display = "flex";
}

function renderExamPaper(exam) {
    const paperContainer = document.getElementById("practical-exam-paper-container") || document.getElementById("exam-paper-container");
    if (!paperContainer) return;

    const p = exam.paper;
    let tablesHtml = p.tables.map(tbl => `
        <div style="margin-top: 1rem;">
            <h5 style="color: #1e1b4b; margin-bottom: 0.4rem; font-weight: 700;">📌 ${tbl.name}</h5>
            <table class="exam-paper-table">
                <thead>
                    <tr><th>컬럼명</th><th>데이터타입</th><th>KEY</th><th>NULL</th><th>설명</th></tr>
                </thead>
                <tbody>
                    ${tbl.columns.map(c => {
                        const keyStr = c.key || "";
                        const isPk = keyStr.includes("PK");
                        return `
                        <tr>
                            <td><code>${c.name}</code></td>
                            <td>${c.type}</td>
                            <td><strong style="color: ${isPk ? '#dc2626' : '#2563eb'}">${keyStr}</strong></td>
                            <td>${c.nn}</td>
                            <td>${c.desc}</td>
                        </tr>
                        `;
                    }).join("")}
                </tbody>
            </table>
        </div>
    `).join("");

    let reqsHtml = p.requirements.map(req => `
        <div class="exam-req-card">
            <div class="req-title">${req.title}</div>
            <div class="req-desc">${req.details}</div>
        </div>
    `).join("");

    paperContainer.innerHTML = `
        <div class="official-exam-paper">
            <div class="paper-header">
                <div class="paper-watermark">HRDKOREA Q-NET MOCK EXAM</div>
                <div class="paper-title-box">
                    <span class="paper-badge">과정평가형 국가기술자격 실기 모의시험지</span>
                    <h3>${exam.title}</h3>
                    <div class="paper-meta">
                        <span><strong>과제코드:</strong> ${p.taskNo}</span>
                        <span><strong>제한시간:</strong> 120분 (2시간)</span>
                        <span><strong>합격기준:</strong> 100점 만점 중 60점 이상</span>
                    </div>
                </div>
            </div>

            <div class="paper-section">
                <h4>1. 수험자 유의사항 (공통 제약조건)</h4>
                <ul class="paper-instruction-list">
                    ${p.instructions.map(inst => `<li>${inst}</li>`).join("")}
                </ul>
            </div>

            <div class="paper-section">
                <h4>2. 데이터베이스 스키마 및 테이블 정의서</h4>
                ${tablesHtml}
            </div>

            <div class="paper-section">
                <h4>3. 세부 화면별 개발 요구사항 및 배점</h4>
                ${reqsHtml}
            </div>
        </div>
    `;
}

function renderModelCodeTabs(exam) {
    const tabContainer = document.getElementById("practical-model-code-step-tabs") || document.getElementById("model-code-step-tabs");
    if (!tabContainer) return;

    const steps = Object.keys(exam.modelCode);
    tabContainer.innerHTML = steps.map(stepKey => {
        const step = exam.modelCode[stepKey];
        const isActive = stepKey === activeModelStep;
        return `
            <button type="button" class="step-tab-btn ${isActive ? 'active' : ''}" onclick="switchPracticalModelStep('${stepKey}')">
                ${step.title.split(' ')[1]} ${step.title.split(' ')[2] || ''}
            </button>
        `;
    }).join("");
}

function switchPracticalModelStep(stepKey) {
    activeModelStep = stepKey;
    const exam = MOCK_EXAMS_DATA[currentMockExamId];
    renderModelCodeTabs(exam);
    renderActiveModelCode(exam);
}

function renderActiveModelCode(exam) {
    const codeViewContainer = document.getElementById("practical-model-code-content") || document.getElementById("model-code-content");
    if (!codeViewContainer) return;

    const step = exam.modelCode[activeModelStep];
    if (!step) return;

    codeViewContainer.innerHTML = `
        <div class="practical-code-card">
            <div class="practical-code-header">
                <div class="practical-code-title">
                    📄 <span>${step.title}</span>
                </div>
                <button type="button" class="btn-copy-code" onclick="copyPracticalExamCode('active-practical-source-code')">
                    📋 코드 전체 복사
                </button>
            </div>
            <pre class="practical-code-body"><code id="active-practical-source-code" class="language-${step.lang}">${escapeExamHtml(step.code)}</code></pre>
        </div>
    `;
}

// 120분 타이머 컨트롤러
function initMockTimer() {
    const timerDisplay = document.getElementById("practical-timer-display") || document.getElementById("timer-display");
    const startBtn = document.getElementById("btn-practical-timer-start") || document.getElementById("btn-timer-start");
    const pauseBtn = document.getElementById("btn-practical-timer-pause") || document.getElementById("btn-timer-pause");
    const resetBtn = document.getElementById("btn-practical-timer-reset") || document.getElementById("btn-timer-reset");

    if (!timerDisplay || !startBtn) return;

    function updateDisplay() {
        const hours = String(Math.floor(mockExamRemainingSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((mockExamRemainingSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(mockExamRemainingSeconds % 60).padStart(2, '0');
        timerDisplay.textContent = `${hours}:${minutes}:${seconds}`;

        if (mockExamRemainingSeconds <= 300 && mockExamRemainingSeconds > 0) {
            timerDisplay.style.color = "#dc2626";
            timerDisplay.classList.add("timer-warning-pulse");
        } else {
            timerDisplay.style.color = "var(--primary)";
            timerDisplay.classList.remove("timer-warning-pulse");
        }
    }

    startBtn.onclick = function() {
        if (mockExamTimerInterval) return;
        mockExamTimerInterval = setInterval(() => {
            if (mockExamRemainingSeconds > 0) {
                mockExamRemainingSeconds--;
                updateDisplay();
            } else {
                clearInterval(mockExamTimerInterval);
                mockExamTimerInterval = null;
                alert("⏰ 시험 120분이 종료되었습니다! 키보드에서 손을 떼고 자체 채점을 진행하세요.");
            }
        }, 1000);
        startBtn.style.display = "none";
        pauseBtn.style.display = "inline-flex";
    };

    pauseBtn.onclick = function() {
        clearInterval(mockExamTimerInterval);
        mockExamTimerInterval = null;
        startBtn.style.display = "inline-flex";
        pauseBtn.style.display = "none";
    };

    resetBtn.onclick = function() {
        clearInterval(mockExamTimerInterval);
        mockExamTimerInterval = null;
        mockExamRemainingSeconds = 120 * 60;
        updateDisplay();
        startBtn.style.display = "inline-flex";
        pauseBtn.style.display = "none";
    };

    updateDisplay();
}

function copyPracticalExamCode(codeElementId) {
    const codeEl = document.getElementById(codeElementId);
    if (!codeEl) return;
    const text = codeEl.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert("✅ 모범 답안 소스코드가 클립보드에 복사되었습니다! 이클립스에 붙여넣기 하세요.");
    }).catch(err => {
        console.error("Copy failed", err);
    });
}

function escapeExamHtml(str) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// 좌측 컬럼 참고 자료 뷰 모드 전환 (문제지 / 모범답안 / 둘 다 보기)
function switchLeftColumnView(mode) {
    const paperContainer = document.getElementById("practical-exam-paper-container");
    const modelCodeCard = document.getElementById("practical-model-code-card");
    const btnPaper = document.getElementById("btn-left-paper");
    const btnCode = document.getElementById("btn-left-code");
    const btnBoth = document.getElementById("btn-left-both");

    [btnPaper, btnCode, btnBoth].forEach(btn => btn && btn.classList.remove("active"));

    if (mode === "paper") {
        if (btnPaper) btnPaper.classList.add("active");
        if (paperContainer) paperContainer.style.display = "block";
        if (modelCodeCard) modelCodeCard.style.display = "none";
    } else if (mode === "code") {
        if (btnCode) btnCode.classList.add("active");
        if (paperContainer) paperContainer.style.display = "none";
        if (modelCodeCard) modelCodeCard.style.display = "block";
    } else {
        if (btnBoth) btnBoth.classList.add("active");
        if (paperContainer) paperContainer.style.display = "block";
        if (modelCodeCard) modelCodeCard.style.display = "block";
    }
}

// 전역 윈도우 스코프 바인딩
window.switchLeftColumnView = switchLeftColumnView;
window.switchPracticalMockExam = switchPracticalMockExam;
window.switchPracticalModelStep = switchPracticalModelStep;
window.switchPracticalTask = switchPracticalTask;
window.fillModelAnswerToEditor = fillModelAnswerToEditor;
window.resetCurrentTaskCode = resetCurrentTaskCode;
window.evaluateCurrentTaskCode = evaluateCurrentTaskCode;
window.evaluatePracticalScore = evaluatePracticalScore;
window.copyPracticalExamCode = copyPracticalExamCode;
window.initMockExamSystem = initMockExamSystem;

// 스마트 라우팅 (지필 모의고사와 실기 모의고사 상호 완벽 호환 보장)
window.switchMockExam = function(examId) {
    if (examId === "exam1" || examId === "exam2" || examId === "exam3") {
        switchPracticalMockExam(examId);
    } else if (typeof window.switchWrittenMockExam === "function") {
        window.switchWrittenMockExam(examId);
    }
};

// DOM 준비 시 자동 초기화
document.addEventListener("DOMContentLoaded", () => {
    initMockExamSystem();
});

