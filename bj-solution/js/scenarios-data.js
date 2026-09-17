// SW_L5 4대 기출문제 데이터베이스 및 상세 코드 데이터
const SCENARIOS_DATA = {
    shopping: {
        id: 'shopping',
        title: '쇼핑몰 회원 및 매출 관리 시스템',
        badge: '출제율 1위 ⭐⭐⭐',
        category: '회원/매출 도메인',
        desc: '신규 회원 등록, 전체 회원 목록 조회 및 등급 변환, 회원별 누적 매출 통계를 산출하는 공단 대표 기출문제입니다.',
        tables: [
            {
                name: 'member_tbl_02',
                desc: '회원 정보 테이블',
                columns: [
                    { name: 'custno', type: 'INT', key: 'PK', desc: '회원번호 (100001~)' },
                    { name: 'custname', type: 'VARCHAR(20)', desc: '회원성명' },
                    { name: 'phone', type: 'VARCHAR(15)', desc: '회원전화' },
                    { name: 'address', type: 'VARCHAR(60)', desc: '통신사/주소' },
                    { name: 'joindate', type: 'DATE', desc: '가입일자' },
                    { name: 'grade', type: 'CHAR(1)', desc: '고객등급 (A:VIP, B:일반, C:직원)' },
                    { name: 'city', type: 'CHAR(2)', desc: '거주도시코드 (01:서울, 02:경기, 60:부산 등)' }
                ]
            },
            {
                name: 'money_tbl_02',
                desc: '회원 매출 정보 테이블',
                columns: [
                    { name: 'custno', type: 'INT', key: 'FK', desc: '회원번호 (member_tbl_02 참조)' },
                    { name: 'saleno', type: 'INT', key: 'PK', desc: '판매번호' },
                    { name: 'pcost', type: 'INT', desc: '단가' },
                    { name: 'amount', type: 'INT', desc: '수량' },
                    { name: 'price', type: 'INT', desc: '판매금액 (단가 * 수량)' },
                    { name: 'pcode', type: 'VARCHAR(10)', desc: '상품코드' },
                    { name: 'sdate', type: 'DATE', desc: '판매일자' }
                ]
            }
        ],
        requirements: [
            '회원등록 시 회원번호는 기존 최댓값+1(MAX+1)로 자동 채번되어 읽기전용(readonly)으로 표시되어야 한다.',
            '회원등록 폼에서 성명, 전화번호, 주소, 가입일자, 고객등급, 도시코드가 빈칸일 경우 자바스크립트 alert 경고창을 띄우고 해당 입력칸으로 focus() 이동해야 한다.',
            '회원목록조회 시 고객등급 코드(A, B, C)는 CASE WHEN을 통해 \'VIP\', \'일반\', \'직원\'으로 변환 출력되어야 한다.',
            '회원매출조회 시 구매 이력이 없는 회원도 목록에 반드시 포함되어야 하며(LEFT JOIN), 매출액은 0원으로 출력되어야 한다(IFNULL).',
            '회원매출조회는 총매출금액 내림차순(DESC), 금액이 같으면 회원번호 오름차순(ASC)으로 정렬해야 한다.'
        ],
        sqlScript: `-- 1. DB 생성 및 사용
CREATE DATABASE IF NOT EXISTS shop_db DEFAULT CHARACTER SET utf8mb4;
USE shop_db;

-- 2. 테이블 생성
DROP TABLE IF EXISTS money_tbl_02;
DROP TABLE IF EXISTS member_tbl_02;

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

-- 3. 샘플 데이터 입력
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
(100004, 20240007, 3000, 1, 3000, 'A006', '2024-01-07');`,
        sampleData: {
            member: [
                { custno: 100001, custname: '김행복', phone: '010-1111-2222', address: '서울 동대문구 휘경동', joindate: '2023-12-02', grade: 'A', city: '01' },
                { custno: 100002, custname: '이축복', phone: '010-1111-3333', address: '서울 강남구 역삼동', joindate: '2023-12-06', grade: 'B', city: '01' },
                { custno: 100003, custname: '장믿음', phone: '010-1111-4444', address: '경기도 수원시 팔달구', joindate: '2023-12-10', grade: 'B', city: '02' },
                { custno: 100004, custname: '최사랑', phone: '010-1111-5555', address: '경기도 안양시 만안구', joindate: '2023-12-15', grade: 'A', city: '02' },
                { custno: 100005, custname: '진평화', phone: '010-1111-6666', address: '부산 해운대구 우동', joindate: '2023-12-20', grade: 'C', city: '60' },
                { custno: 100006, custname: '차공손', phone: '010-1111-7777', address: '광주 북구 용봉동', joindate: '2023-12-25', grade: 'C', city: '60' }
            ],
            money: [
                { custno: 100001, saleno: 20240001, pcost: 500, amount: 5, price: 2500, pcode: 'A001', sdate: '2024-01-01' },
                { custno: 100001, saleno: 20240002, pcost: 1000, amount: 4, price: 4000, pcode: 'A002', sdate: '2024-01-02' },
                { custno: 100001, saleno: 20240003, pcost: 500, amount: 3, price: 1500, pcode: 'A008', sdate: '2024-01-03' },
                { custno: 100002, saleno: 20240004, pcost: 2000, amount: 1, price: 2000, pcode: 'A003', sdate: '2024-01-04' },
                { custno: 100002, saleno: 20240005, pcost: 500, amount: 1, price: 500, pcode: 'A004', sdate: '2024-01-05' },
                { custno: 100003, saleno: 20240006, pcost: 1500, amount: 2, price: 3000, pcode: 'A005', sdate: '2024-01-06' },
                { custno: 100004, saleno: 20240007, pcost: 3000, amount: 1, price: 3000, pcode: 'A006', sdate: '2024-01-07' }
            ]
        },
        codeSnippets: {
            dbConnection: `package common;

import java.sql.Connection;
import java.sql.DriverManager;

public class DBConnection {
    public static Connection getConnection() throws Exception {
        Class.forName("com.mysql.cj.jdbc.Driver");
        String url = "jdbc:mysql://localhost:3306/shop_db?useSSL=false&allowPublicKeyRetrieval=true&serverTimezone=Asia/Seoul&characterEncoding=UTF-8";
        String user = "root";
        String password = "본인비밀번호";
        return DriverManager.getConnection(url, user, password);
    }
}`,
            memberList: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원목록조회</title>
</head>
<body>
    <h2>회원목록조회/수정</h2>
    <table border="1">
        <tr>
            <th>회원번호</th><th>회원성명</th><th>전화번호</th><th>주소</th>
            <th>가입일자</th><th>고객등급</th><th>거주도시</th>
        </tr>
        <%
            Connection conn = null;
            PreparedStatement pstmt = null;
            ResultSet rs = null;
            try {
                conn = DBConnection.getConnection();
                String sql = "SELECT custno, custname, phone, address, joindate, "
                           + "CASE grade WHEN 'A' THEN 'VIP' WHEN 'B' THEN '일반' WHEN 'C' THEN '직원' END AS grade_name, "
                           + "city FROM member_tbl_02 ORDER BY custno ASC";
                pstmt = conn.prepareStatement(sql);
                rs = pstmt.executeQuery();
                while(rs.next()) {
        %>
        <tr>
            <td><%= rs.getInt("custno") %></td>
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
</body>
</html>`,
            salaryList: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원매출조회</title>
</head>
<body>
    <h2>회원매출조회</h2>
    <table border="1">
        <tr><th>회원번호</th><th>회원성명</th><th>고객등급</th><th>매출</th></tr>
        <%
            Connection conn = null;
            PreparedStatement pstmt = null;
            ResultSet rs = null;
            try {
                conn = DBConnection.getConnection();
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
            <td><%= rs.getInt("total_price") %></td>
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
</body>
</html>`,
            joinJsp: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<%
    Connection conn = null;
    PreparedStatement pstmt = null;
    ResultSet rs = null;
    int nextCustno = 100001;
    try {
        conn = DBConnection.getConnection();
        String sql = "SELECT IFNULL(MAX(custno), 100000) + 1 AS next_custno FROM member_tbl_02";
        pstmt = conn.prepareStatement(sql);
        rs = pstmt.executeQuery();
        if(rs.next()) { nextCustno = rs.getInt("next_custno"); }
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
<title>회원등록</title>
<script>
function checkForm() {
    var f = document.frm;
    if(f.custname.value == "") { alert("회원성명이 입력되지 않았습니다."); f.custname.focus(); return false; }
    if(f.phone.value == "") { alert("회원전화가 입력되지 않았습니다."); f.phone.focus(); return false; }
    if(f.address.value == "") { alert("회원주소가 입력되지 않았습니다."); f.address.focus(); return false; }
    if(f.joindate.value == "") { alert("가입일자가 입력되지 않았습니다."); f.joindate.focus(); return false; }
    if(f.grade.value == "") { alert("고객등급이 입력되지 않았습니다."); f.grade.focus(); return false; }
    if(f.city.value == "") { alert("도시코드가 입력되지 않았습니다."); f.city.focus(); return false; }
    alert("회원등록이 정상적으로 완료 되었습니다!");
    return true;
}
</script>
</head>
<body>
    <h2>홈쇼핑 회원 등록</h2>
    <form name="frm" action="action.jsp" method="post" onsubmit="return checkForm();">
        <table border="1">
            <tr><th>회원번호(자동발생)</th><td><input type="text" name="custno" value="<%= nextCustno %>" readonly></td></tr>
            <tr><th>회원성명</th><td><input type="text" name="custname"></td></tr>
            <tr><th>회원전화</th><td><input type="text" name="phone"></td></tr>
            <tr><th>회원주소</th><td><input type="text" name="address"></td></tr>
            <tr><th>가입일자</th><td><input type="text" name="joindate" value="2024-01-10"></td></tr>
            <tr><th>고객등급[A:VIP,B:일반,C:직원]</th><td><input type="text" name="grade"></td></tr>
            <tr><th>도시코드</th><td><input type="text" name="city"></td></tr>
            <tr><td colspan="2"><input type="submit" value="등록"> <input type="button" value="조회" onclick="location.href='memberList.jsp'"></td></tr>
        </table>
    </form>
</body>
</html>`,
            actionJsp: `<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="common.DBConnection" %>
<%@ page import="java.sql.*" %>
<%
    request.setCharacterEncoding("UTF-8");
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
        String sql = "INSERT INTO member_tbl_02 VALUES (?, ?, ?, ?, ?, ?, ?)";
        pstmt = conn.prepareStatement(sql);
        pstmt.setInt(1, custno);
        pstmt.setString(2, custname);
        pstmt.setString(3, phone);
        pstmt.setString(4, address);
        pstmt.setString(5, joindate);
        pstmt.setString(6, grade);
        pstmt.setString(7, city);
        pstmt.executeUpdate();
        response.sendRedirect("memberList.jsp");
    } catch(Exception e) {
        e.printStackTrace();
    } finally {
        if(pstmt != null) pstmt.close();
        if(conn != null) conn.close();
    }
%>`
        }
    },
    golf: {
        id: 'golf',
        title: '골프연습장 회원 및 수강 관리 시스템',
        badge: '출제율 2위 ⭐⭐',
        category: '강습/수강 도메인',
        desc: '강사 정보 및 회원 정보 관리, 수강신청 등록 및 강사별 총 수강 매출액 통계를 산출하는 기출문제입니다.',
        tables: [
            {
                name: 'tbl_teacher_01',
                desc: '강사 정보 테이블',
                columns: [
                    { name: 'teacher_code', type: 'CHAR(3)', key: 'PK', desc: '강사코드 (100, 200, 300, 400)' },
                    { name: 'teacher_name', type: 'VARCHAR(15)', desc: '강사명' },
                    { name: 'class_name', type: 'VARCHAR(20)', desc: '강의명' },
                    { name: 'class_price', type: 'INT', desc: '수강료' },
                    { name: 'teacher_regist_date', type: 'VARCHAR(8)', desc: '자격취득일자' }
                ]
            },
            {
                name: 'tbl_member_01',
                desc: '골프장 회원 정보 테이블',
                columns: [
                    { name: 'c_no', type: 'CHAR(5)', key: 'PK', desc: '회원번호 (10001~)' },
                    { name: 'c_name', type: 'VARCHAR(15)', desc: '회원성명' },
                    { name: 'phone', type: 'VARCHAR(15)', desc: '연락처' },
                    { name: 'address', type: 'VARCHAR(50)', desc: '거주지' },
                    { name: 'grade', type: 'VARCHAR(6)', desc: '가입등급 (일반, VIP)' }
                ]
            },
            {
                name: 'tbl_class_01',
                desc: '수강신청 정보 테이블',
                columns: [
                    { name: 'regist_month', type: 'VARCHAR(6)', desc: '수강월 (예: 202401)' },
                    { name: 'c_no', type: 'CHAR(5)', key: 'FK', desc: '회원번호' },
                    { name: 'class_area', type: 'VARCHAR(15)', desc: '강의장소' },
                    { name: 'tuition', type: 'INT', desc: '수강료 (VIP 회원 50% 할인)' },
                    { name: 'teacher_code', type: 'CHAR(3)', key: 'FK', desc: '강사코드' }
                ]
            }
        ],
        requirements: [
            '수강신청 화면에서 회원 선택 시 VIP 등급 회원은 수강료의 50%를 자동 감면 계산한다.',
            '강사별 매출 통계 시 강사코드, 강의명, 강사명, 총매출액을 산출하고 총매출액 내림차순으로 정렬한다.',
            '수강신청 이력이 없는 강사도 목록에 표시되어야 한다 (LEFT JOIN).'
        ],
        sqlScript: `-- 골프연습장 DDL 및 DML
CREATE DATABASE IF NOT EXISTS golf_db DEFAULT CHARACTER SET utf8mb4;
USE golf_db;

DROP TABLE IF EXISTS tbl_class_01;
DROP TABLE IF EXISTS tbl_member_01;
DROP TABLE IF EXISTS tbl_teacher_01;

CREATE TABLE tbl_teacher_01 (
    teacher_code        CHAR(3)     NOT NULL,
    teacher_name        VARCHAR(15) NOT NULL,
    class_name          VARCHAR(20),
    class_price         INT,
    teacher_regist_date VARCHAR(8),
    PRIMARY KEY (teacher_code)
);

CREATE TABLE tbl_member_01 (
    c_no    CHAR(5)     NOT NULL,
    c_name  VARCHAR(15) NOT NULL,
    phone   VARCHAR(15),
    address VARCHAR(50),
    grade   VARCHAR(6),
    PRIMARY KEY (c_no)
);

CREATE TABLE tbl_class_01 (
    regist_month CHAR(6) NOT NULL,
    c_no         CHAR(5) NOT NULL,
    class_area   VARCHAR(15),
    tuition      INT,
    teacher_code CHAR(3) NOT NULL
);

INSERT INTO tbl_teacher_01 VALUES 
('100', '초이골', '초급골프', 100000, '20220101'),
('200', '김프로', '중급골프', 200000, '20210501'),
('300', '박마스', '고급골프', 300000, '20200301'),
('400', '이원포', '원포인트', 400000, '20190801');

INSERT INTO tbl_member_01 VALUES 
('10001', '홍길동', '010-1111-2222', '서울 강남구', '일반'),
('10002', '이순신', '010-2222-3333', '서울 서초구', 'VIP'),
('10003', '강감찬', '010-3333-4444', '경기 성남시', '일반'),
('10004', '유관순', '010-4444-5555', '경기 수원시', 'VIP');

INSERT INTO tbl_class_01 VALUES 
('202401', '10001', '서울본원', 100000, '100'),
('202401', '10002', '서울본원', 100000, '200'),
('202401', '10003', '분당지점', 300000, '300'),
('202401', '10004', '분당지점', 200000, '400');`,
        sampleData: {
            teacher: [
                { teacher_code: '100', teacher_name: '초이골', class_name: '초급골프', class_price: 100000 },
                { teacher_code: '200', teacher_name: '김프로', class_name: '중급골프', class_price: 200000 },
                { teacher_code: '300', teacher_name: '박마스', class_name: '고급골프', class_price: 300000 },
                { teacher_code: '400', teacher_name: '이원포', class_name: '원포인트', class_price: 400000 }
            ],
            class: [
                { regist_month: '202401', c_no: '10001', class_area: '서울본원', tuition: 100000, teacher_code: '100' },
                { regist_month: '202401', c_no: '10002', class_area: '서울본원', tuition: 100000, teacher_code: '200' },
                { regist_month: '202401', c_no: '10003', class_area: '분당지점', tuition: 300000, teacher_code: '300' },
                { regist_month: '202401', c_no: '10004', class_area: '분당지점', tuition: 200000, teacher_code: '400' }
            ]
        },
        codeSnippets: {
            teacherSales: `SELECT t.teacher_code AS 강사코드,
       t.class_name AS 강의명,
       t.teacher_name AS 강사명,
       IFNULL(SUM(c.tuition), 0) AS 총매출액
FROM tbl_teacher_01 t
LEFT JOIN tbl_class_01 c ON t.teacher_code = c.teacher_code
GROUP BY t.teacher_code, t.class_name, t.teacher_name
ORDER BY 총매출액 DESC;`
        }
    },
    library: {
        id: 'library',
        title: '도서관 도서 대여 관리 시스템',
        badge: '출제율 3위 ⭐⭐',
        category: '도서/대여 도메인',
        desc: '도서 기본 정보 및 대여 이력 등록, 도서별 대여 횟수 통계 및 미반납 현황을 산출하는 기출문제입니다.',
        tables: [
            {
                name: 'tbl_book_01',
                desc: '도서 정보 테이블',
                columns: [
                    { name: 'book_id', type: 'CHAR(5)', key: 'PK', desc: '도서코드' },
                    { name: 'book_title', type: 'VARCHAR(50)', desc: '도서명' },
                    { name: 'author', type: 'VARCHAR(30)', desc: '저자' },
                    { name: 'category', type: 'VARCHAR(20)', desc: '분류 (IT, 문학, 과학)' }
                ]
            },
            {
                name: 'tbl_rental_01',
                desc: '도서 대여 테이블',
                columns: [
                    { name: 'rent_no', type: 'INT', key: 'PK', desc: '대여번호' },
                    { name: 'book_id', type: 'CHAR(5)', key: 'FK', desc: '도서코드' },
                    { name: 'user_name', type: 'VARCHAR(20)', desc: '대여자명' },
                    { name: 'rent_date', type: 'DATE', desc: '대여일자' },
                    { name: 'return_yn', type: 'CHAR(1)', desc: '반납여부 (Y, N)' }
                ]
            }
        ],
        requirements: [
            '도서 대여 등록 시 반납여부의 기본값은 \'N\'으로 처리한다.',
            '대여 통계 시 대여 이력이 없는 도서도 0회로 표기(LEFT JOIN).',
            '미반납(return_yn=\'N\') 건에 대해 화면에 경고 스타일을 표기한다.'
        ],
        sqlScript: `-- 도서 대여 DDL & DML
CREATE DATABASE IF NOT EXISTS library_db DEFAULT CHARACTER SET utf8mb4;
USE library_db;

DROP TABLE IF EXISTS tbl_rental_01;
DROP TABLE IF EXISTS tbl_book_01;

CREATE TABLE tbl_book_01 (
    book_id    CHAR(5)     NOT NULL,
    book_title VARCHAR(50) NOT NULL,
    author     VARCHAR(30),
    category   VARCHAR(20),
    PRIMARY KEY (book_id)
);

CREATE TABLE tbl_rental_01 (
    rent_no   INT AUTO_INCREMENT NOT NULL,
    book_id   CHAR(5)            NOT NULL,
    user_name VARCHAR(20)        NOT NULL,
    rent_date DATE               NOT NULL,
    return_yn CHAR(1)            DEFAULT 'N',
    PRIMARY KEY (rent_no)
);

INSERT INTO tbl_book_01 VALUES 
('B0001', '자바 프로그래밍 입문', '김자바', 'IT'),
('B0002', '데이터베이스 SQL 정복', '이디비', 'IT'),
('B0003', '어린 왕자', '생텍쥐페리', '문학'),
('B0004', '우주의 신비', '칼세이건', '과학');

INSERT INTO tbl_rental_01 (book_id, user_name, rent_date, return_yn) VALUES 
('B0001', '김철수', '2024-01-05', 'Y'),
('B0001', '이영희', '2024-01-12', 'N'),
('B0002', '박민수', '2024-01-10', 'N'),
('B0003', '최사랑', '2024-01-15', 'Y');`,
        sampleData: {},
        codeSnippets: {
            bookStats: `SELECT b.book_id, b.book_title, b.category,
       COUNT(r.rent_no) AS 총대여횟수,
       SUM(CASE WHEN r.return_yn = 'N' THEN 1 ELSE 0 END) AS 미반납수
FROM tbl_book_01 b
LEFT JOIN tbl_rental_01 r ON b.book_id = r.book_id
GROUP BY b.book_id, b.book_title, b.category
ORDER BY 총대여횟수 DESC;`
        }
    },
    student: {
        id: 'student',
        title: '학생 성적 및 학사 관리 시스템',
        badge: '출제율 4위 ⭐',
        category: '학사/성적 도메인',
        desc: '학생 기본 정보와 과목별 성적을 등록하고 전공별 및 학생별 평균 평점 순위를 산출하는 기출문제입니다.',
        tables: [
            {
                name: 'tbl_student_01',
                desc: '학생 정보 테이블',
                columns: [
                    { name: 'stud_id', type: 'CHAR(6)', key: 'PK', desc: '학번' },
                    { name: 'stud_name', type: 'VARCHAR(20)', desc: '학생성명' },
                    { name: 'dept_name', type: 'VARCHAR(30)', desc: '학과명' },
                    { name: 'gender', type: 'CHAR(1)', desc: '성별 (M, F)' }
                ]
            },
            {
                name: 'tbl_score_01',
                desc: '과목 성적 테이블',
                columns: [
                    { name: 'score_no', type: 'INT', key: 'PK', desc: '성적번호' },
                    { name: 'stud_id', type: 'CHAR(6)', key: 'FK', desc: '학번' },
                    { name: 'sub_name', type: 'VARCHAR(20)', desc: '과목명' },
                    { name: 'score', type: 'INT', desc: '점수 (0~100)' }
                ]
            }
        ],
        requirements: [
            '성적 등록 시 점수는 0~100점 사이 값만 입력 가능하도록 유효성 검사.',
            '학생별 총점, 평균, 등급(A/B/C/F) CASE WHEN 계산 및 평균 내림차순 정렬.',
            '전공별 평균 점수가 70점 이상인 전공만 HAVING으로 조회.'
        ],
        sqlScript: `-- 학생 성적 DDL & DML
CREATE DATABASE IF NOT EXISTS school_db DEFAULT CHARACTER SET utf8mb4;
USE school_db;

DROP TABLE IF EXISTS tbl_score_01;
DROP TABLE IF EXISTS tbl_student_01;

CREATE TABLE tbl_student_01 (
    stud_id   CHAR(6)     NOT NULL,
    stud_name VARCHAR(20) NOT NULL,
    dept_name VARCHAR(30),
    gender    CHAR(1),
    PRIMARY KEY (stud_id)
);

CREATE TABLE tbl_score_01 (
    score_no INT AUTO_INCREMENT NOT NULL,
    stud_id  CHAR(6)            NOT NULL,
    sub_name VARCHAR(20)        NOT NULL,
    score    INT,
    PRIMARY KEY (score_no)
);

INSERT INTO tbl_student_01 VALUES 
('202401', '김학생', '소프트웨어과', 'M'),
('202402', '이학생', '컴퓨터공학과', 'F'),
('202403', '박학생', '정보통신과', 'M'),
('202404', '최학생', '소프트웨어과', 'F');

INSERT INTO tbl_score_01 (stud_id, sub_name, score) VALUES 
('202401', '자바', 95), ('202401', '데이터베이스', 90),
('202402', '자바', 85), ('202402', '웹프로그래밍', 80),
('202403', '데이터베이스', 70), ('202403', '네트워크', 65);`,
        sampleData: {},
        codeSnippets: {
            studentRank: `SELECT s.stud_id, s.stud_name, s.dept_name,
       COUNT(sc.score_no) AS 응시과목수,
       IFNULL(SUM(sc.score), 0) AS 총점,
       IFNULL(ROUND(AVG(sc.score), 1), 0) AS 평균
FROM tbl_student_01 s
LEFT JOIN tbl_score_01 sc ON s.stud_id = sc.stud_id
GROUP BY s.stud_id, s.stud_name, s.dept_name
ORDER BY 평균 DESC;`
        }
    }
};
