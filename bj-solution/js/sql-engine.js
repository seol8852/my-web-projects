// 브라우저 인메모리 SQL 시뮬레이터 엔진
class MiniSqlEngine {
    constructor() {
        this.resetDatabase();
    }

    resetDatabase() {
        // 쇼핑몰 회원 및 매출 데이터 로드
        this.tables = {
            member_tbl_02: [
                { custno: 100001, custname: '김행복', phone: '010-1111-2222', address: '서울 동대문구 휘경동', joindate: '2023-12-02', grade: 'A', city: '01' },
                { custno: 100002, custname: '이축복', phone: '010-1111-3333', address: '서울 강남구 역삼동', joindate: '2023-12-06', grade: 'B', city: '01' },
                { custno: 100003, custname: '장믿음', phone: '010-1111-4444', address: '경기도 수원시 팔달구', joindate: '2023-12-10', grade: 'B', city: '02' },
                { custno: 100004, custname: '최사랑', phone: '010-1111-5555', address: '경기도 안양시 만안구', joindate: '2023-12-15', grade: 'A', city: '02' },
                { custno: 100005, custname: '진평화', phone: '010-1111-6666', address: '부산 해운대구 우동', joindate: '2023-12-20', grade: 'C', city: '60' },
                { custno: 100006, custname: '차공손', phone: '010-1111-7777', address: '광주 북구 용봉동', joindate: '2023-12-25', grade: 'C', city: '60' }
            ],
            money_tbl_02: [
                { custno: 100001, saleno: 20240001, pcost: 500, amount: 5, price: 2500, pcode: 'A001', sdate: '2024-01-01' },
                { custno: 100001, saleno: 20240002, pcost: 1000, amount: 4, price: 4000, pcode: 'A002', sdate: '2024-01-02' },
                { custno: 100001, saleno: 20240003, pcost: 500, amount: 3, price: 1500, pcode: 'A008', sdate: '2024-01-03' },
                { custno: 100002, saleno: 20240004, pcost: 2000, amount: 1, price: 2000, pcode: 'A003', sdate: '2024-01-04' },
                { custno: 100002, saleno: 20240005, pcost: 500, amount: 1, price: 500, pcode: 'A004', sdate: '2024-01-05' },
                { custno: 100003, saleno: 20240006, pcost: 1500, amount: 2, price: 3000, pcode: 'A005', sdate: '2024-01-06' },
                { custno: 100004, saleno: 20240007, pcost: 3000, amount: 1, price: 3000, pcode: 'A006', sdate: '2024-01-07' }
            ]
        };
    }

    // 쿼리 실행기
    execute(rawQuery) {
        const query = rawQuery.trim().replace(/;$/, '');
        const startTime = performance.now();

        try {
            // 구문 기본 검사
            if (!query) throw new Error("쿼리문이 비어 있습니다.");
            
            // ACS 오타 감지
            if (/\bACS\b/i.test(query)) {
                throw new Error("Syntax Error: 'ACS' 오타가 감지되었습니다. 'ASC'로 수정해주세요.");
            }

            const lower = query.toLowerCase();

            // 1. 회원 전체 조회 (SELECT * FROM member_tbl_02)
            if (lower.includes('from member_tbl_02') && !lower.includes('join') && !lower.includes('group by')) {
                let rows = [...this.tables.member_tbl_02];

                // WHERE 조건 간단 필터
                if (lower.includes("where city in ('01', '02') and grade = 'a'") || lower.includes("city in ('01','02') and grade = 'a'")) {
                    rows = rows.filter(r => (r.city === '01' || r.city === '02') && r.grade === 'A');
                } else if (lower.includes("joindate >= '2023-12-10'")) {
                    rows = rows.filter(r => r.joindate >= '2023-12-10');
                }

                // CASE WHEN 등급 변환 감지
                const hasCase = lower.includes('case grade') || lower.includes('case mm.grade');
                const resultRows = rows.map(r => {
                    const gradeName = r.grade === 'A' ? 'VIP' : (r.grade === 'B' ? '일반' : '직원');
                    if (hasCase) {
                        return {
                            "회원번호(custno)": r.custno,
                            "회원성명(custname)": r.custname,
                            "전화번호(phone)": r.phone,
                            "주소(address)": r.address,
                            "가입일자(joindate)": r.joindate,
                            "고객등급": gradeName,
                            "도시코드(city)": r.city
                        };
                    } else {
                        return {
                            "회원번호(custno)": r.custno,
                            "회원성명(custname)": r.custname,
                            "전화번호(phone)": r.phone,
                            "주소(address)": r.address,
                            "가입일자(joindate)": r.joindate,
                            "고객등급(grade)": r.grade,
                            "도시코드(city)": r.city
                        };
                    }
                });

                const endTime = performance.now();
                return {
                    success: true,
                    columns: Object.keys(resultRows[0] || {}),
                    rows: resultRows,
                    time: ((endTime - startTime) / 1000).toFixed(4),
                    count: resultRows.length
                };
            }

            // 2. 매출 통계 쿼리 (INNER JOIN vs LEFT JOIN)
            if (lower.includes('join') && (lower.includes('money_tbl_02') || lower.includes('member_tbl_02'))) {
                const isLeftJoin = lower.includes('left join');
                const members = this.tables.member_tbl_02;
                const moneys = this.tables.money_tbl_02;

                // 회원별 매출 합계 계산
                const salesMap = {};
                moneys.forEach(m => {
                    salesMap[m.custno] = (salesMap[m.custno] || 0) + m.price;
                });

                let resultRows = [];
                members.forEach(m => {
                    const total = salesMap[m.custno];
                    const gradeName = m.grade === 'A' ? 'VIP' : (m.grade === 'B' ? '일반' : '직원');

                    if (isLeftJoin) {
                        // 미구매자도 0원으로 포함
                        resultRows.push({
                            "회원번호(custno)": m.custno,
                            "회원성명(custname)": m.custname,
                            "고객등급": gradeName,
                            "총매출금액": total !== undefined ? total : 0
                        });
                    } else {
                        // INNER JOIN: 구매 이력이 있는 회원만
                        if (total !== undefined) {
                            resultRows.push({
                                "회원번호(custno)": m.custno,
                                "회원성명(custname)": m.custname,
                                "고객등급": gradeName,
                                "총매출금액": total
                            });
                        }
                    }
                });

                // ORDER BY 정렬 (총매출금액 DESC, custno ASC)
                resultRows.sort((a, b) => {
                    if (b["총매출금액"] !== a["총매출금액"]) {
                        return b["총매출금액"] - a["총매출금액"];
                    }
                    return a["회원번호(custno)"] - b["회원번호(custno)"];
                });

                const endTime = performance.now();
                return {
                    success: true,
                    columns: Object.keys(resultRows[0] || {}),
                    rows: resultRows,
                    time: ((endTime - startTime) / 1000).toFixed(4),
                    count: resultRows.length
                };
            }

            // 3. 매출 단일 테이블 단순 조회
            if (lower.includes('from money_tbl_02')) {
                const rows = this.tables.money_tbl_02.map(m => ({
                    "판매번호(saleno)": m.saleno,
                    "회원번호(custno)": m.custno,
                    "단가(pcost)": m.pcost,
                    "수량(amount)": m.amount,
                    "판매금액(price)": m.price,
                    "상품코드(pcode)": m.pcode,
                    "판매일자(sdate)": m.sdate
                }));
                const endTime = performance.now();
                return {
                    success: true,
                    columns: Object.keys(rows[0] || {}),
                    rows: rows,
                    time: ((endTime - startTime) / 1000).toFixed(4),
                    count: rows.length
                };
            }

            // 그 외 지원되지 않는 커스텀 구문 안내
            throw new Error("미니 엔진은 현재 쇼핑몰 기출 테이블(member_tbl_02, money_tbl_02)의 SELECT, JOIN, GROUP BY 구문을 지원합니다.");

        } catch (err) {
            return {
                success: false,
                error: err.message
            };
        }
    }
}
