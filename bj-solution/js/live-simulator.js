// 4대 기출 전 도메인 라이브 웹 시뮬레이터 (쇼핑몰, 골프장, 도서관, 학사관리)
class MultiDomainSimulator {
    constructor() {
        this.currentDomain = 'shopping';
        this.resetAllData();
    }

    resetAllData() {
        // 1. 쇼핑몰 데이터
        this.shopping = {
            members: [
                { custno: 100001, custname: '김행복', phone: '010-1111-2222', address: '서울 동대문구 휘경동', joindate: '2023-12-02', grade: 'A', city: '01' },
                { custno: 100002, custname: '이축복', phone: '010-1111-3333', address: '서울 강남구 역삼동', joindate: '2023-12-06', grade: 'B', city: '01' },
                { custno: 100003, custname: '장믿음', phone: '010-1111-4444', address: '경기도 수원시 팔달구', joindate: '2023-12-10', grade: 'B', city: '02' },
                { custno: 100004, custname: '최사랑', phone: '010-1111-5555', address: '경기도 안양시 만안구', joindate: '2023-12-15', grade: 'A', city: '02' },
                { custno: 100005, 진평화: '진평화', custname: '진평화', phone: '010-1111-6666', address: '부산 해운대구 우동', joindate: '2023-12-20', grade: 'C', city: '60' },
                { custno: 100006, 차공손: '차공손', custname: '차공손', phone: '010-1111-7777', address: '광주 북구 용봉동', joindate: '2023-12-25', grade: 'C', city: '60' }
            ],
            sales: [
                { custno: 100001, price: 2500 }, { custno: 100001, price: 4000 }, { custno: 100001, price: 1500 },
                { custno: 100002, price: 2000 }, { custno: 100002, price: 500 },
                { custno: 100003, price: 3000 },
                { custno: 100004, price: 3000 }
            ]
        };

        // 2. 골프연습장 데이터
        this.golf = {
            teachers: [
                { code: '100', name: '초이골', class: '초급골프', price: 100000 },
                { code: '200', name: '김프로', class: '중급골프', price: 200000 },
                { code: '300', name: '박마스', class: '고급골프', price: 300000 },
                { code: '400', name: '이원포', class: '원포인트', price: 400000 }
            ],
            members: [
                { no: '10001', name: '홍길동', grade: '일반' },
                { no: '10002', name: '이순신', grade: 'VIP' },
                { no: '10003', name: '강감찬', grade: '일반' },
                { no: '10004', name: '유관순', grade: 'VIP' }
            ],
            registrations: [
                { month: '202401', c_no: '10001', teacher_code: '100', area: '서울본원', tuition: 100000 },
                { month: '202401', c_no: '10002', teacher_code: '200', area: '서울본원', tuition: 100000 },
                { month: '202401', c_no: '10003', teacher_code: '300', area: '분당지점', tuition: 300000 },
                { month: '202401', c_no: '10004', teacher_code: '400', area: '분당지점', tuition: 200000 }
            ]
        };

        // 3. 도서관 데이터
        this.library = {
            books: [
                { id: 'B0001', title: '자바 프로그래밍 입문', author: '김자바', category: 'IT' },
                { id: 'B0002', title: '데이터베이스 SQL 정복', author: '이디비', category: 'IT' },
                { id: 'B0003', title: '어린 왕자', author: '생텍쥐페리', category: '문학' },
                { id: 'B0004', title: '우주의 신비', author: '칼세이건', category: '과학' }
            ],
            rentals: [
                { no: 1, id: 'B0001', user: '김철수', date: '2024-01-05', returnYn: 'Y' },
                { no: 2, id: 'B0001', user: '이영희', date: '2024-01-12', returnYn: 'N' },
                { no: 3, id: 'B0002', user: '박민수', date: '2024-01-10', returnYn: 'N' },
                { no: 4, id: 'B0003', user: '최사랑', date: '2024-01-15', returnYn: 'Y' }
            ]
        };

        // 4. 학사/성적 데이터
        this.student = {
            students: [
                { id: '202401', name: '김학생', dept: '소프트웨어과', gender: 'M' },
                { id: '202402', name: '이학생', dept: '컴퓨터공학과', gender: 'F' },
                { id: '202403', name: '박학생', dept: '정보통신과', gender: 'M' },
                { id: '202404', name: '최학생', dept: '소프트웨어과', gender: 'F' }
            ],
            scores: [
                { id: '202401', sub: '자바', score: 95 }, { id: '202401', sub: 'DB', score: 90 },
                { id: '202402', sub: '자바', score: 85 }, { id: '202402', sub: '웹', score: 80 },
                { id: '202403', sub: 'DB', score: 70 }, { id: '202403', sub: '네트워크', score: 65 }
            ]
        };
    }
}

const multiSim = new MultiDomainSimulator();

function setSimulatorDomain(domainKey) {
    multiSim.currentDomain = domainKey;
    document.querySelectorAll(".sim-domain-pill").forEach(p => {
        p.classList.toggle("active", p.getAttribute("data-domain") === domainKey);
    });
    renderSimulatorPage('main');
}

function renderSimulatorPage(pageName) {
    const frame = document.getElementById("sim-viewport");
    const addressBar = document.getElementById("sim-address");
    if (!frame) return;

    const domain = multiSim.currentDomain;

    // A. 쇼핑몰 도메인
    if (domain === 'shopping') {
        if (addressBar) addressBar.textContent = `http://localhost:8080/HRD_Shop/${pageName === 'main' ? 'index' : pageName}.jsp`;
        renderShoppingPages(pageName, frame);
    }
    // B. 골프연습장 도메인
    else if (domain === 'golf') {
        if (addressBar) addressBar.textContent = `http://localhost:8080/HRD_Golf/${pageName === 'main' ? 'index' : pageName}.jsp`;
        renderGolfPages(pageName, frame);
    }
    // C. 도서관 도메인
    else if (domain === 'library') {
        if (addressBar) addressBar.textContent = `http://localhost:8080/HRD_Library/${pageName === 'main' ? 'index' : pageName}.jsp`;
        renderLibraryPages(pageName, frame);
    }
    // D. 학사/성적 도메인
    else if (domain === 'student') {
        if (addressBar) addressBar.textContent = `http://localhost:8080/HRD_School/${pageName === 'main' ? 'index' : pageName}.jsp`;
        renderStudentPages(pageName, frame);
    }
}

// ----------------------------------------------------
// 1. 쇼핑몰 렌더러
// ----------------------------------------------------
function renderShoppingPages(pageName, frame) {
    const navHtml = `
        <div class="sim-app-header"><h2>쇼핑몰 회원관리 프로그램 ver 1.0</h2></div>
        <div class="sim-app-nav">
            <a href="javascript:void(0)" onclick="renderSimulatorPage('join')" class="${pageName==='join'?'active':''}">회원등록</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('memberList')" class="${pageName==='memberList'?'active':''}">회원목록조회</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('salaryList')" class="${pageName==='salaryList'?'active':''}">회원매출조회</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('main')" class="${pageName==='main'?'active':''}">홈으로</a>
        </div>
    `;

    if (pageName === 'memberList') {
        const members = multiSim.shopping.members;
        frame.innerHTML = navHtml + `
            <div class="sim-app-content">
                <h3>회원목록조회/수정</h3>
                <table class="sim-table">
                    <thead><tr><th>회원번호</th><th>회원성명</th><th>전화번호</th><th>주소</th><th>가입일자</th><th>고객등급</th><th>거주도시</th></tr></thead>
                    <tbody>${members.map(m => `<tr><td>${m.custno}</td><td>${m.custname}</td><td>${m.phone}</td><td style="text-align:left;padding-left:10px;">${m.address}</td><td>${m.joindate}</td><td>${m.grade==='A'?'VIP':(m.grade==='B'?'일반':'직원')}</td><td>${m.city}</td></tr>`).join("")}</tbody>
                </table>
            </div>`;
    } else if (pageName === 'salaryList') {
        const salesMap = {};
        multiSim.shopping.sales.forEach(s => { salesMap[s.custno] = (salesMap[s.custno] || 0) + s.price; });
        const list = multiSim.shopping.members.map(m => ({ custno: m.custno, name: m.custname, grade: m.grade==='A'?'VIP':(m.grade==='B'?'일반':'직원'), total: salesMap[m.custno] || 0 }))
            .sort((a,b) => b.total !== a.total ? b.total - a.total : a.custno - b.custno);

        frame.innerHTML = navHtml + `
            <div class="sim-app-content">
                <h3>회원매출조회</h3>
                <table class="sim-table" style="max-width:600px; margin:20px auto;">
                    <thead><tr><th>회원번호</th><th>회원성명</th><th>고객등급</th><th>매출</th></tr></thead>
                    <tbody>${list.map(s => `<tr><td>${s.custno}</td><td>${s.name}</td><td>${s.grade}</td><td style="font-weight:bold; color:${s.total>0?'#1e1b4b':'#94a3b8'};">${s.total.toLocaleString()}원</td></tr>`).join("")}</tbody>
                </table>
            </div>`;
    } else if (pageName === 'join') {
        const nextNo = Math.max(...multiSim.shopping.members.map(m => m.custno)) + 1;
        frame.innerHTML = navHtml + `
            <div class="sim-app-content">
                <h3>홈쇼핑 회원 등록</h3>
                <form onsubmit="handleShoppingSubmit(event)">
                    <table class="sim-form-table">
                        <tr><th>회원번호(자동발생)</th><td><input type="text" id="sh-custno" value="${nextNo}" readonly class="input-readonly"></td></tr>
                        <tr><th>회원성명</th><td><input type="text" id="sh-name" placeholder="성명 입력"></td></tr>
                        <tr><th>회원전화</th><td><input type="text" id="sh-phone" placeholder="010-XXXX-XXXX"></td></tr>
                        <tr><th>회원주소</th><td><input type="text" id="sh-address" placeholder="주소 입력"></td></tr>
                        <tr><th>가입일자</th><td><input type="text" id="sh-date" value="2024-01-20"></td></tr>
                        <tr><th>고객등급[A:VIP,B:일반,C:직원]</th><td><input type="text" id="sh-grade" placeholder="A, B, C"></td></tr>
                        <tr><th>도시코드</th><td><input type="text" id="sh-city" placeholder="예: 01, 02"></td></tr>
                        <tr><td colspan="2" style="text-align:center; padding:15px;"><button type="submit" class="btn-primary">등록</button> <button type="button" class="btn-secondary" onclick="renderSimulatorPage('memberList')">조회</button></td></tr>
                    </table>
                </form>
            </div>`;
    } else {
        frame.innerHTML = navHtml + `
            <div class="sim-app-content" style="padding: 60px 20px;">
                <h1>쇼핑몰 회원관리 시스템 ver 1.0</h1>
                <p style="margin-top: 15px; color: #64748b;">상단 메뉴를 클릭하여 회원등록, 목록조회, 매출조회를 직접 테스트해보세요.</p>
            </div>`;
    }
}

function handleShoppingSubmit(e) {
    e.preventDefault();
    const custno = parseInt(document.getElementById("sh-custno").value);
    const custname = document.getElementById("sh-name").value.trim();
    const phone = document.getElementById("sh-phone").value.trim();
    const address = document.getElementById("sh-address").value.trim();
    const joindate = document.getElementById("sh-date").value.trim();
    const grade = document.getElementById("sh-grade").value.trim().toUpperCase();
    const city = document.getElementById("sh-city").value.trim();

    if (!custname) { alert("회원성명이 입력되지 않았습니다."); document.getElementById("sh-name").focus(); return; }
    if (!phone) { alert("회원전화가 입력되지 않았습니다."); document.getElementById("sh-phone").focus(); return; }
    if (!address) { alert("회원주소가 입력되지 않았습니다."); document.getElementById("sh-address").focus(); return; }
    if (!joindate) { alert("가입일자가 입력되지 않았습니다."); document.getElementById("sh-date").focus(); return; }
    if (!grade || !['A', 'B', 'C'].includes(grade)) { alert("고객등급이 올바르게 입력되지 않았습니다 (A, B, C)."); document.getElementById("sh-grade").focus(); return; }
    if (!city) { alert("도시코드가 입력되지 않았습니다."); document.getElementById("sh-city").focus(); return; }

    alert("회원등록이 정상적으로 완료 되었습니다!");
    multiSim.shopping.members.push({ custno, custname, phone, address, joindate, grade, city });
    renderSimulatorPage('memberList');
}

// ----------------------------------------------------
// 2. 골프연습장 렌더러 (VIP 50% 할인 자바스크립트)
// ----------------------------------------------------
function renderGolfPages(pageName, frame) {
    const navHtml = `
        <div class="sim-app-header" style="background-color:#166534;"><h2>골프연습장 회원관리 프로그램 ver 1.0</h2></div>
        <div class="sim-app-nav" style="background-color:#14532d;">
            <a href="javascript:void(0)" onclick="renderSimulatorPage('golfReg')" class="${pageName==='golfReg'?'active':''}">수강신청</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('golfTeacher')" class="${pageName==='golfTeacher'?'active':''}">강사목록</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('golfSales')" class="${pageName==='golfSales'?'active':''}">강사별매출</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('main')" class="${pageName==='main'?'active':''}">홈으로</a>
        </div>
    `;

    if (pageName === 'golfTeacher') {
        frame.innerHTML = navHtml + `
            <div class="sim-app-content">
                <h3>강사조회</h3>
                <table class="sim-table" style="max-width:650px; margin:20px auto;">
                    <thead><tr><th>강사코드</th><th>강사명</th><th>강의명</th><th>수강료</th></tr></thead>
                    <tbody>${multiSim.golf.teachers.map(t => `<tr><td>${t.code}</td><td>${t.name}</td><td>${t.class}</td><td>${t.price.toLocaleString()}원</td></tr>`).join("")}</tbody>
                </table>
            </div>`;
    } else if (pageName === 'golfSales') {
        const salesMap = {};
        multiSim.golf.registrations.forEach(r => { salesMap[r.teacher_code] = (salesMap[r.teacher_code] || 0) + r.tuition; });
        const list = multiSim.golf.teachers.map(t => ({ code: t.code, class: t.class, name: t.name, total: salesMap[t.code] || 0 }))
            .sort((a,b) => b.total - a.total);

        frame.innerHTML = navHtml + `
            <div class="sim-app-content">
                <h3>강사매출통계</h3>
                <table class="sim-table" style="max-width:650px; margin:20px auto;">
                    <thead><tr><th>강사코드</th><th>강의명</th><th>강사명</th><th>총매출액</th></tr></thead>
                    <tbody>${list.map(s => `<tr><td>${s.code}</td><td>${s.class}</td><td>${s.name}</td><td style="font-weight:bold;">${s.total.toLocaleString()}원</td></tr>`).join("")}</tbody>
                </table>
            </div>`;
    } else if (pageName === 'golfReg') {
        frame.innerHTML = navHtml + `
            <div class="sim-app-content">
                <h3>골프수강신청</h3>
                <form onsubmit="handleGolfSubmit(event)">
                    <table class="sim-form-table">
                        <tr><th>수강월</th><td><input type="text" id="golf-month" value="202401"></td></tr>
                        <tr><th>회원명</th><td>
                            <select id="golf-member" onchange="calcGolfPrice()" style="width:90%; padding:6px;">
                                <option value="">회원 선택</option>
                                ${multiSim.golf.members.map(m => `<option value="${m.no}" data-grade="${m.grade}">${m.name} (${m.grade})</option>`).join("")}
                            </select>
                        </td></tr>
                        <tr><th>강의명</th><td>
                            <select id="golf-teacher" onchange="calcGolfPrice()" style="width:90%; padding:6px;">
                                <option value="">강의 선택</option>
                                ${multiSim.golf.teachers.map(t => `<option value="${t.code}" data-price="${t.price}">${t.class} - ${t.name} (${t.price.toLocaleString()}원)</option>`).join("")}
                            </select>
                        </td></tr>
                        <tr><th>수강료 (VIP 50% 자동계산)</th><td>
                            <input type="text" id="golf-tuition" readonly class="input-readonly" value="0원" style="font-weight:bold; color:#166534;">
                        </td></tr>
                        <tr><td colspan="2" style="text-align:center; padding:15px;"><button type="submit" class="btn-primary" style="background:#166534;">신청완료</button></td></tr>
                    </table>
                </form>
            </div>`;
    } else {
        frame.innerHTML = navHtml + `
            <div class="sim-app-content" style="padding: 60px 20px;">
                <h1>골프연습장 수강신청 관리 시스템</h1>
                <p style="margin-top: 15px; color: #64748b;">수강신청 시 회원을 VIP로 선택하면 <strong>수강료가 50% 자동 감면</strong>되는 실전 인터랙티브 로직을 확인해보세요.</p>
            </div>`;
    }
}

function calcGolfPrice() {
    const memberSelect = document.getElementById("golf-member");
    const teacherSelect = document.getElementById("golf-teacher");
    const tuitionInput = document.getElementById("golf-tuition");
    if (!memberSelect || !teacherSelect || !tuitionInput) return;

    const selectedMember = memberSelect.options[memberSelect.selectedIndex];
    const selectedTeacher = teacherSelect.options[teacherSelect.selectedIndex];

    if (!selectedTeacher || !selectedTeacher.dataset.price) {
        tuitionInput.value = "0원";
        return;
    }

    let price = parseInt(selectedTeacher.dataset.price);
    const isVip = selectedMember && selectedMember.dataset.grade === 'VIP';

    if (isVip) {
        price = price * 0.5; // 50% 감면
    }

    tuitionInput.value = `${price.toLocaleString()}원 ${isVip ? '(VIP 50% 할인 적용!)' : ''}`;
}

function handleGolfSubmit(e) {
    e.preventDefault();
    const month = document.getElementById("golf-month").value.trim();
    const memberNo = document.getElementById("golf-member").value;
    const teacherCode = document.getElementById("golf-teacher").value;
    const tuitionStr = document.getElementById("golf-tuition").value;

    if (!month) { alert("수강월이 입력되지 않았습니다."); return; }
    if (!memberNo) { alert("회원을 선택하세요."); return; }
    if (!teacherCode) { alert("강의를 선택하세요."); return; }

    const tuition = parseInt(tuitionStr.replace(/[^0-9]/g, ''));
    multiSim.golf.registrations.push({ month, c_no: memberNo, teacher_code: teacherCode, area: '서울본원', tuition });
    alert("수강신청이 성공적으로 등록되었습니다!");
    renderSimulatorPage('golfSales');
}

// ----------------------------------------------------
// 3. 도서관 렌더러 (미반납 붉은색 강조)
// ----------------------------------------------------
function renderLibraryPages(pageName, frame) {
    const navHtml = `
        <div class="sim-app-header" style="background-color:#7c2d12;"><h2>도서관 도서대여 관리 시스템 ver 1.0</h2></div>
        <div class="sim-app-nav" style="background-color:#451a03;">
            <a href="javascript:void(0)" onclick="renderSimulatorPage('rentReg')" class="${pageName==='rentReg'?'active':''}">도서대여</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('bookList')" class="${pageName==='bookList'?'active':''}">도서목록</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('rentStats')" class="${pageName==='rentStats'?'active':''}">대여통계</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('main')" class="${pageName==='main'?'active':''}">홈으로</a>
        </div>
    `;

    if (pageName === 'rentStats') {
        const statsMap = {};
        multiSim.library.rentals.forEach(r => {
            if (!statsMap[r.id]) statsMap[r.id] = { total: 0, unreturned: 0 };
            statsMap[r.id].total++;
            if (r.returnYn === 'N') statsMap[r.id].unreturned++;
        });

        const list = multiSim.library.books.map(b => ({
            id: b.id, title: b.title, cat: b.category,
            total: (statsMap[b.id] && statsMap[b.id].total) || 0,
            unreturned: (statsMap[b.id] && statsMap[b.id].unreturned) || 0
        })).sort((a,b) => b.total - a.total);

        frame.innerHTML = navHtml + `
            <div class="sim-app-content">
                <h3>도서대여통계</h3>
                <table class="sim-table" style="max-width:700px; margin:20px auto;">
                    <thead><tr><th>도서코드</th><th>도서명</th><th>분류</th><th>총대여횟수</th><th>미반납건수</th></tr></thead>
                    <tbody>${list.map(s => `<tr><td>${s.id}</td><td>${s.title}</td><td>${s.cat}</td><td>${s.total}회</td><td style="font-weight:bold; color:${s.unreturned>0?'#dc2626':'#059669'};">${s.unreturned > 0 ? `🚨 ${s.unreturned}건 미반납` : '0건 (정상)'}</td></tr>`).join("")}</tbody>
                </table>
            </div>`;
    } else {
        frame.innerHTML = navHtml + `
            <div class="sim-app-content" style="padding: 60px 20px;">
                <h1>도서관 도서대여 관리 시스템</h1>
                <p style="margin-top: 15px; color: #64748b;">도서 대여 통계 시 <strong>미반납(N) 건수를 집계하고 붉은색으로 강조</strong>하는 실기 단골 유형입니다.</p>
            </div>`;
    }
}

// ----------------------------------------------------
// 4. 학사/성적 렌더러 (평균 순위 계산)
// ----------------------------------------------------
function renderStudentPages(pageName, frame) {
    const navHtml = `
        <div class="sim-app-header" style="background-color:#0369a1;"><h2>학생 성적관리 시스템 ver 1.0</h2></div>
        <div class="sim-app-nav" style="background-color:#0c4a6e;">
            <a href="javascript:void(0)" onclick="renderSimulatorPage('scoreStats')" class="${pageName==='scoreStats'?'active':''}">성적순위조회</a>
            <a href="javascript:void(0)" onclick="renderSimulatorPage('main')" class="${pageName==='main'?'active':''}">홈으로</a>
        </div>
    `;

    if (pageName === 'scoreStats') {
        const scoreMap = {};
        multiSim.student.scores.forEach(s => {
            if (!scoreMap[s.id]) scoreMap[s.id] = { total: 0, count: 0 };
            scoreMap[s.id].total += s.score;
            scoreMap[s.id].count++;
        });

        const list = multiSim.student.students.map(s => {
            const data = scoreMap[s.id] || { total: 0, count: 0 };
            const avg = data.count > 0 ? (data.total / data.count).toFixed(1) : 0;
            return { id: s.id, name: s.name, dept: s.dept, count: data.count, total: data.total, avg: parseFloat(avg) };
        }).sort((a,b) => b.avg - a.avg);

        frame.innerHTML = navHtml + `
            <div class="sim-app-content">
                <h3>학생 성적순위조회</h3>
                <table class="sim-table" style="max-width:700px; margin:20px auto;">
                    <thead><tr><th>순위</th><th>학번</th><th>성명</th><th>학과</th><th>응시과목수</th><th>총점</th><th>평균</th></tr></thead>
                    <tbody>${list.map((s, idx) => `<tr><td><strong>${idx+1}위</strong></td><td>${s.id}</td><td>${s.name}</td><td>${s.dept}</td><td>${s.count}과목</td><td>${s.total}점</td><td style="font-weight:bold; color:#0369a1;">${s.avg}점</td></tr>`).join("")}</tbody>
                </table>
            </div>`;
    } else {
        frame.innerHTML = navHtml + `
            <div class="sim-app-content" style="padding: 60px 20px;">
                <h1>학생 성적 및 학사 관리 시스템</h1>
                <p style="margin-top: 15px; color: #64748b;">학생별 총점과 평균을 구하고 <strong>평균 내림차순으로 석차를 산출</strong>하는 학사관리 기출 유형입니다.</p>
            </div>`;
    }
}
