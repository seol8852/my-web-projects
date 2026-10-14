/**
 * chiikawa-jungchogi/js/questions-data.js
 * 정보처리기사 실기 프로그래밍 기출 100제 완전정복 (2020~2024년 실전 킬러 기출 엄선)
 */

const QUESTIONS_DATA = [
  {
    "id": 1,
    "title": "2차원 배열 포인터와 다중 간접 참조 연산",
    "lang": "c",
    "topic": "포인터/2차원 배열",
    "year": "2024년 2회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    int (*p)[3] = arr;\n    int a = *(*(p + 1) + 2);\n    int b = **(p + 2);\n    printf(\"%d\", a + b);\n    return 0;\n}",
    "answer": "13",
    "altAnswers": [
      "13"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int (*p)[3] = arr;",
        "desc": "3열 1차원 배열을 가리키는 배열 포인터 p 선언 (p는 arr[0]의 주소)"
      },
      {
        "step": "2",
        "line": "*(*(p + 1) + 2)",
        "desc": "p+1은 1행 주소, *(p+1)은 arr[1] 시작, +2 후 역참조 -> arr[1][2] = 6"
      },
      {
        "step": "3",
        "line": "**(p + 2)",
        "desc": "p+2는 2행 주소, *(p+2)는 arr[2][0]의 주소, 역참조 -> arr[2][0] = 7"
      },
      {
        "step": "4",
        "line": "printf(\"%d\", a + b);",
        "desc": "6 + 7 = 13 출력"
      }
    ],
    "explanation": "2차원 배열 포인터 `int (*p)[3]`에서 `p + 1`은 1개 행(3개 int) 단위로 건너뜁니다. `*(*(p + 1) + 2)`는 `arr[1][2]`인 6을 가리키며, `**(p + 2)`는 `*(*(p + 2) + 0)`인 `arr[2][0]`(7)을 가리킵니다. 두 값의 합인 13이 출력됩니다.",
    "tip": "하치와레: `p+1`은 1칸이 아니라 한 행 전체를 건너뛰는 거야! `*(*(p + 행) + 열)` 형태를 꼭 기억해!",
    "character": "hachiware"
  },
  {
    "id": 2,
    "title": "이중 포인터(Double Pointer)를 통한 주소 변경과 값 갱신",
    "lang": "c",
    "topic": "포인터/이중 포인터",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20;\n    int *p = &a;\n    int **pp = &p;\n    \n    *pp = &b;\n    **pp = 35;\n    \n    printf(\"%d %d\", a, b);\n    return 0;\n}",
    "answer": "10 35",
    "altAnswers": [
      "10 35",
      "10, 35",
      "10,35"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int *p = &a; int **pp = &p;",
        "desc": "p는 a의 주소를, pp는 p의 주소를 가리킴"
      },
      {
        "step": "2",
        "line": "*pp = &b;",
        "desc": "pp가 가리키는 대상인 p의 값을 b의 주소(&b)로 변경. 이제 p는 b를 가리킴"
      },
      {
        "step": "3",
        "line": "**pp = 35;",
        "desc": "*pp(즉 p)가 가리키는 공간(b)에 35 대입 -> b = 35"
      },
      {
        "step": "4",
        "line": "printf(\"%d %d\", a, b);",
        "desc": "a는 10 유지, b는 35로 갱신되어 출력"
      }
    ],
    "explanation": "`pp`는 포인터 변수 `p`의 주소를 담고 있는 이중 포인터입니다. `*pp = &b;`에 의해 `p`가 가리키는 주소가 `a`에서 `b`로 바뀝니다. 이후 `**pp = 35;`는 `*p = 35;`가 되어 `b`의 값이 35로 바뀝니다. `a`는 영향받지 않으므로 10 35가 출력됩니다.",
    "tip": "우사기: 이얏하-! `*pp`는 포인터 `p`의 화살표를 바꿔버리고, `**pp`는 진짜 목적지의 값을 쾅! 찍어 누르는 거야!",
    "character": "usagi"
  },
  {
    "id": 3,
    "title": "포인터 증감 연산자 우선순위 (*p++, (*p)++, *++p)",
    "lang": "c",
    "topic": "포인터 연산자",
    "year": "2023년 2회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40};\n    int *p = arr;\n    \n    int a = *p++;\n    int b = (*p)++;\n    int c = *++p;\n    \n    printf(\"%d %d %d %d\", a, b, c, arr[1]);\n    return 0;\n}",
    "answer": "10 20 30 21",
    "altAnswers": [
      "10 20 30 21",
      "10, 20, 30, 21",
      "10,20,30,21"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int a = *p++;",
        "desc": "현재 p의 위치 arr[0](10)을 a에 대입 후 p는 arr[1]로 이동"
      },
      {
        "step": "2",
        "line": "int b = (*p)++;",
        "desc": "현재 p의 위치 arr[1](20)을 b에 대입 후 arr[1]의 실제 값을 21로 증가"
      },
      {
        "step": "3",
        "line": "int c = *++p;",
        "desc": "p를 arr[2]로 먼저 전위 증가시킨 뒤 역참조하여 c에 30 대입"
      },
      {
        "step": "4",
        "line": "printf(...);",
        "desc": "a=10, b=20, c=30, arr[1]=21 출력"
      }
    ],
    "explanation": "`*p++`는 후위 증감이므로 현재 참조값(10)을 반환한 뒤 포인터 주소를 1 증가시킵니다. `(*p)++`는 괄호로 역참조를 먼저 수행하여 해당 메모리의 값(20)을 가져온 후 그 값을 21로 증가시킵니다. `*++p`는 포인터 주소를 먼저 증가시킨 뒤 값을 가져오므로 30이 됩니다. 따라서 10 20 30 21이 출력됩니다.",
    "tip": "랏코: 괄호가 어디 씌워져 있는지 칼날처럼 날카롭게 봐라. `*p++`는 주소가 증가하고 `(*p)++`는 데이터가 증가한다.",
    "character": "rakko"
  },
  {
    "id": 4,
    "title": "복합 비트 마스킹과 시프트 연산 (상/하위 니블 교환)",
    "lang": "c",
    "topic": "비트 연산",
    "year": "2024년 1회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오. (단, 16진수 대문자로 출력)",
    "code": "#include <stdio.h>\n\nint main() {\n    unsigned char x = 0xA5;\n    unsigned char high = (x & 0xF0) >> 4;\n    unsigned char low = (x & 0x0F) << 4;\n    unsigned char result = high | low;\n    printf(\"%02X\", result);\n    return 0;\n}",
    "answer": "5A",
    "altAnswers": [
      "5A",
      "0x5A",
      "5a",
      "0x5a"
    ],
    "trace": [
      {
        "step": "1",
        "line": "x = 0xA5;",
        "desc": "2진수 1010 0101 (상위 니블 A, 하위 니블 5)"
      },
      {
        "step": "2",
        "line": "(x & 0xF0) >> 4",
        "desc": "1010 0000 >> 4 => 0000 1010 (0x0A)"
      },
      {
        "step": "3",
        "line": "(x & 0x0F) << 4",
        "desc": "0000 0101 << 4 => 0101 0000 (0x50)"
      },
      {
        "step": "4",
        "line": "high | low",
        "desc": "0x0A | 0x50 = 0x5A -> %02X 서식으로 5A 출력"
      }
    ],
    "explanation": "0xA5는 이진수로 `1010 0101`입니다. `0xF0` 마스킹 후 4비트 우측 시프트하면 상위 니블이 하위로 이동하여 `0x0A`가 되고, `0x0F` 마스킹 후 4비트 좌측 시프트하면 하위 니블이 상위로 이동하여 `0x50`이 됩니다. 둘을 OR 결합하면 `0x5A`가 되어 출력값은 5A입니다.",
    "tip": "쿠리만쥬: 크으-! 상위 4비트랑 하위 4비트의 자리를 통째로 맞바꾸는 기법이지. %02X 서식 지정자도 놓치지 마라.",
    "character": "kurimanju"
  },
  {
    "id": 5,
    "title": "구조체 자기참조와 단일 연결 리스트(Linked List) 순회",
    "lang": "c",
    "topic": "구조체/연결리스트",
    "year": "2023년 1회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nstruct Node {\n    int data;\n    struct Node *next;\n};\n\nint main() {\n    struct Node n3 = {30, NULL};\n    struct Node n2 = {20, &n3};\n    struct Node n1 = {10, &n2};\n    \n    struct Node *cur = &n1;\n    int sum = 0;\n    while (cur != NULL) {\n        sum += cur->data;\n        cur = cur->next;\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "60",
    "altAnswers": [
      "60"
    ],
    "trace": [
      {
        "step": "1",
        "line": "노드 연결 설정",
        "desc": "n1(10) -> n2(20) -> n3(30) -> NULL"
      },
      {
        "step": "2",
        "line": "1회전: cur = &n1",
        "desc": "sum += 10 (sum=10), cur = n1.next (&n2)"
      },
      {
        "step": "3",
        "line": "2회전: cur = &n2",
        "desc": "sum += 20 (sum=30), cur = n2.next (&n3)"
      },
      {
        "step": "4",
        "line": "3회전: cur = &n3",
        "desc": "sum += 30 (sum=60), cur = n3.next (NULL) -> 종료"
      }
    ],
    "explanation": "자기참조 구조체 `Node`의 포인터 `next`를 이용해 노드 3개가 순차적으로 연결되어 있습니다. `while` 문에서 `cur`이 `NULL`이 될 때까지 각 노드의 `data`를 순회하며 누적하므로 10 + 20 + 30 = 60이 출력됩니다.",
    "tip": "치이카와: 와앗... `cur = cur->next;`로 한 걸음씩 다음 노드로 건너가면서 데이터를 싹 더하는 거야!",
    "character": "chiikawa"
  },
  {
    "id": 6,
    "title": "전처리기 매크로 함수 괄호 누락 연산자 우선순위 함정",
    "lang": "c",
    "topic": "전처리기",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\n#define CALC(a, b) a * b + 2\n\nint main() {\n    int x = 2, y = 3;\n    int res = CALC(x + 1, y + 2);\n    printf(\"%d\", res);\n    return 0;\n}",
    "answer": "9",
    "altAnswers": [
      "9"
    ],
    "trace": [
      {
        "step": "1",
        "line": "CALC(x + 1, y + 2)",
        "desc": "단순 텍스트 치환: x + 1 * y + 2 + 2"
      },
      {
        "step": "2",
        "line": "변수 값 대입",
        "desc": "2 + 1 * 3 + 2 + 2"
      },
      {
        "step": "3",
        "line": "곱셈 우선 연산",
        "desc": "1 * 3 = 3 계산 -> 2 + 3 + 2 + 2"
      },
      {
        "step": "4",
        "line": "최종 덧셈",
        "desc": "2 + 3 + 2 + 2 = 9 출력"
      }
    ],
    "explanation": "C언어 매크로는 괄호가 누락되었을 때 연산자 우선순위에 따라 텍스트 그대로 치환됩니다. `CALC(x + 1, y + 2)`는 `(x + 1) * (y + 2) + 2`가 아니라 `x + 1 * y + 2 + 2`로 전개됩니다. 곱셈 `1 * y`가 먼저 수행되어 `2 + 3 + 2 + 2 = 9`가 됩니다.",
    "tip": "하치와레: 정처기 단골 문제! 매크로 정의에 `()`가 없으면 수학처럼 먼저 더하면 안 돼! 곱셈부터 콕 집어 계산해!",
    "character": "hachiware"
  },
  {
    "id": 7,
    "title": "문자열 포인터 배열과 주소 오프셋 연산",
    "lang": "c",
    "topic": "문자열/포인터",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    char *arr[] = {\"CHIIKAWA\", \"HACHIWARE\", \"USAGI\", \"MOMONGA\"};\n    char **ptr = arr;\n    \n    printf(\"%s %c\", *(ptr + 1) + 5, *(*(ptr + 2) + 1));\n    return 0;\n}",
    "answer": "WARE S",
    "altAnswers": [
      "WARE S",
      "WARE, S",
      "WARE,S"
    ],
    "trace": [
      {
        "step": "1",
        "line": "*(ptr + 1)",
        "desc": "arr[1]인 \"HACHIWARE\"의 시작 주소"
      },
      {
        "step": "2",
        "line": "*(ptr + 1) + 5",
        "desc": "\"HACHIWARE\"에서 인덱스 5 오프셋 이동 -> \"WARE\" 가리킴"
      },
      {
        "step": "3",
        "line": "*(ptr + 2)",
        "desc": "arr[2]인 \"USAGI\"의 시작 주소"
      },
      {
        "step": "4",
        "line": "*(*(ptr + 2) + 1)",
        "desc": "\"USAGI\"에서 1번째 인덱스 문자 'S' 역참조"
      }
    ],
    "explanation": "`ptr + 1`은 `arr[1]`을 가리키고, `*(ptr + 1)`은 문자열 `\"HACHIWARE\"`의 시작 주소입니다. 여기에 5를 더하면 5번째 위치인 `\"WARE\"`부터 널 문자까지 문자열 `%s`로 출력됩니다. `*(ptr + 2)`는 `\"USAGI\"`이며 `+ 1` 후 역참조하면 문자 `'S'`가 `%c`로 출력됩니다.",
    "tip": "모몽가: 어이! 포인터에 숫자를 더하면 그만큼 뒤로 건너뛰어 읽는 거다! 이 몸의 귀여움처럼 깔끔하지?",
    "character": "momonga"
  },
  {
    "id": 8,
    "title": "재귀 함수를 이용한 10진수 -> 2진수 변환 알고리즘",
    "lang": "c",
    "topic": "재귀함수/진법변환",
    "year": "2024년 2회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nvoid toBin(int n) {\n    if (n > 0) {\n        toBin(n / 2);\n        printf(\"%d\", n % 2);\n    }\n}\n\nint main() {\n    toBin(19);\n    return 0;\n}",
    "answer": "10011",
    "altAnswers": [
      "10011"
    ],
    "trace": [
      {
        "step": "1",
        "line": "toBin(19)",
        "desc": "toBin(9) 호출 후 대기"
      },
      {
        "step": "2",
        "line": "toBin(9)",
        "desc": "toBin(4) 호출 후 대기"
      },
      {
        "step": "3",
        "line": "toBin(4)",
        "desc": "toBin(2) 호출 후 대기"
      },
      {
        "step": "4",
        "line": "toBin(2)",
        "desc": "toBin(1) 호출 후 대기"
      },
      {
        "step": "5",
        "line": "toBin(1)",
        "desc": "toBin(0) 리턴 -> 1%2=1 출력"
      },
      {
        "step": "6",
        "line": "복귀 순서 출력",
        "desc": "2%2=0, 4%2=0, 9%2=1, 19%2=1 -> 10011 완성"
      }
    ],
    "explanation": "`toBin(n / 2)` 재귀 호출이 `printf` 앞에 위치하여, 가장 깊은 호출인 `n=1`부터 역순으로 스택을 되돌아오며 출력됩니다. 19를 2로 나눈 나머지는 역순으로 1, 0, 0, 1, 1이므로 10011이 출력됩니다.",
    "tip": "하치와레: 재귀 호출 뒤에 출력문이 있으면 스택에서 빠져나올 때 찍혀! 그래서 2진수가 올바른 순서로 완성되는 거야!",
    "character": "hachiware"
  },
  {
    "id": 9,
    "title": "정적 변수(static)와 지역 변수의 생명주기 및 누적 연산",
    "lang": "c",
    "topic": "변수 영역/static",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint func(int a) {\n    static int s = 5;\n    int local = 2;\n    s += a;\n    local += a;\n    return s + local;\n}\n\nint main() {\n    int res = 0;\n    res += func(3);\n    res += func(4);\n    printf(\"%d\", res);\n    return 0;\n}",
    "answer": "31",
    "altAnswers": [
      "31"
    ],
    "trace": [
      {
        "step": "1",
        "line": "1차 호출 func(3)",
        "desc": "s = 5 + 3 = 8, local = 2 + 3 = 5 -> 반환값: 8 + 5 = 13 (res=13)"
      },
      {
        "step": "2",
        "line": "2차 호출 func(4)",
        "desc": "static 변수 s는 8 유지! s = 8 + 4 = 12, local은 2로 재생성되어 2+4=6 -> 반환값: 12 + 6 = 18"
      },
      {
        "step": "3",
        "line": "main 누적",
        "desc": "res = 13 + 18 = 31 출력"
      }
    ],
    "explanation": "`static int s`는 데이터 영역에 할당되어 함수 종료 후에도 값이 사라지지 않고 유지됩니다. 반면 `int local`은 스택 영역에 할당되어 호출될 때마다 2로 초기화됩니다. 1차 호출 결과 13, 2차 호출 결과 18이 되어 최종 `res`는 31이 됩니다.",
    "tip": "쿠리만쥬: static 변수는 함수를 나갔다 와도 술잔처럼 비워지지 않고 채워져 있는 법이지. 누적값을 잘 챙겨라!",
    "character": "kurimanju"
  },
  {
    "id": 10,
    "title": "버블 정렬(Bubble Sort) 1회전(Pass) 후의 배열 상태",
    "lang": "c",
    "topic": "알고리즘/정렬",
    "year": "2021년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {35, 12, 58, 24, 7};\n    int n = 5;\n    \n    for (int j = 0; j < n - 1; j++) {\n        if (arr[j] > arr[j + 1]) {\n            int temp = arr[j];\n            arr[j] = arr[j + 1];\n            arr[j + 1] = temp;\n        }\n    }\n    \n    for (int i = 0; i < n; i++) {\n        printf(\"%d \", arr[i]);\n    }\n    return 0;\n}",
    "answer": "12 35 24 7 58",
    "altAnswers": [
      "12 35 24 7 58",
      "12, 35, 24, 7, 58",
      "12,35,24,7,58",
      "12 35 24 7 58 "
    ],
    "trace": [
      {
        "step": "1",
        "line": "j=0: 35 > 12",
        "desc": "swap 발생 -> {12, 35, 58, 24, 7}"
      },
      {
        "step": "2",
        "line": "j=1: 35 < 58",
        "desc": "swap 없음 -> {12, 35, 58, 24, 7}"
      },
      {
        "step": "3",
        "line": "j=2: 58 > 24",
        "desc": "swap 발생 -> {12, 35, 24, 58, 7}"
      },
      {
        "step": "4",
        "line": "j=3: 58 > 7",
        "desc": "swap 발생 -> {12, 35, 24, 7, 58}"
      }
    ],
    "explanation": "버블 정렬의 1회전(Pass 1)을 수행하면 인접한 요소끼리 비교하며 가장 큰 값인 58이 배열의 맨 끝(인덱스 4)으로 이동합니다. 스왑 과정을 차례대로 거치면 `12 35 24 7 58`이 됩니다.",
    "tip": "랏코: 1회전이 끝나면 가장 무거운 돌(최댓값)이 맨 뒤에 박힌다. 인접 비교 스왑을 침착하게 따라가라.",
    "character": "rakko"
  },
  {
    "id": 11,
    "title": "선택 정렬(Selection Sort) 2회전 후 배열 상태",
    "lang": "c",
    "topic": "알고리즘/정렬",
    "year": "2023년 1회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {27, 9, 3, 42, 15};\n    int n = 5;\n    \n    for (int i = 0; i < 2; i++) {\n        int minIdx = i;\n        for (int j = i + 1; j < n; j++) {\n            if (arr[j] < arr[minIdx]) minIdx = j;\n        }\n        int temp = arr[i];\n        arr[i] = arr[minIdx];\n        arr[minIdx] = temp;\n    }\n    \n    for (int k = 0; k < n; k++) printf(\"%d \", arr[k]);\n    return 0;\n}",
    "answer": "3 9 27 42 15",
    "altAnswers": [
      "3 9 27 42 15",
      "3, 9, 27, 42, 15",
      "3,9,27,42,15",
      "3 9 27 42 15 "
    ],
    "trace": [
      {
        "step": "1",
        "line": "i=0 (1회전)",
        "desc": "전체 최솟값은 3(인덱스 2). arr[0]=27과 교환 -> {3, 9, 27, 42, 15}"
      },
      {
        "step": "2",
        "line": "i=1 (2회전)",
        "desc": "인덱스 1~4 중 최솟값은 9(인덱스 1). 자기 자신이 최솟값이므로 유지 -> {3, 9, 27, 42, 15}"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "3 9 27 42 15 출력"
      }
    ],
    "explanation": "선택 정렬은 i번째 위치에 올 최솟값을 찾아 스왑합니다. 1회전에서 전체 최솟값 3이 arr[0]의 27과 교환되어 `{3, 9, 27, 42, 15}`가 됩니다. 2회전에서는 남은 원소 중 최솟값이 9로 이미 자기 위치에 있으므로 변동 없이 `{3, 9, 27, 42, 15}`가 유지됩니다.",
    "tip": "하치와레: 선택 정렬은 매 회전마다 가장 작은 녀석을 골라 맨 앞으로 보내는 거야! 2회전까지만 돌았으니 앞자리 2개만 정렬돼!",
    "character": "hachiware"
  },
  {
    "id": 12,
    "title": "문자열 역순 복사 및 널 문자('\\0') 종단 처리",
    "lang": "c",
    "topic": "문자열/배열",
    "year": "2022년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"CHIIKAWA\";\n    int len = strlen(str);\n    char rev[10];\n    \n    for (int i = 0; i < len; i++) {\n        rev[i] = str[len - 1 - i];\n    }\n    rev[len] = '\\0';\n    \n    printf(\"%s\", rev);\n    return 0;\n}",
    "answer": "AWAKIIHC",
    "altAnswers": [
      "AWAKIIHC"
    ],
    "trace": [
      {
        "step": "1",
        "line": "len = strlen(\"CHIIKAWA\");",
        "desc": "길이 8 계산"
      },
      {
        "step": "2",
        "line": "for 루프 역순 대입",
        "desc": "rev[0]=str[7]='A', rev[1]=str[6]='W', rev[2]=str[5]='A'..."
      },
      {
        "step": "3",
        "line": "rev[len] = '\\0';",
        "desc": "인덱스 8에 널 문자 삽입하여 문자열 완성"
      },
      {
        "step": "4",
        "line": "printf(\"%s\", rev);",
        "desc": "\"AWAKIIHC\" 출력"
      }
    ],
    "explanation": "`str[len - 1 - i]`를 통해 원본 문자열의 끝 글자부터 역순으로 `rev` 배열에 복사한 후 끝에 널 문자 `\\0`을 추가했습니다. \"CHIIKAWA\"의 역순인 \"AWAKIIHC\"가 출력됩니다.",
    "tip": "치이카와: 와앗... 문자열을 거꾸로 뒤집으면 치이카와가 '아와이이크'가 되네! 널 문자가 꼭 있어야 출력돼!",
    "character": "chiikawa"
  },
  {
    "id": 13,
    "title": "함수 포인터(Function Pointer) 배열을 통한 함수 합성 호출",
    "lang": "c",
    "topic": "포인터/함수 포인터",
    "year": "2024년 1회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\nint main() {\n    int (*fp[2])(int, int) = {add, mul};\n    int res = fp[1](fp[0](3, 4), 2);\n    printf(\"%d\", res);\n    return 0;\n}",
    "answer": "14",
    "altAnswers": [
      "14"
    ],
    "trace": [
      {
        "step": "1",
        "line": "fp[0] = add, fp[1] = mul",
        "desc": "함수 포인터 배열 초기화"
      },
      {
        "step": "2",
        "line": "fp[0](3, 4)",
        "desc": "add(3, 4) 호출 -> 3 + 4 = 7 반환"
      },
      {
        "step": "3",
        "line": "fp[1](7, 2)",
        "desc": "mul(7, 2) 호출 -> 7 * 2 = 14 반환"
      },
      {
        "step": "4",
        "line": "printf(\"%d\", res);",
        "desc": "14 출력"
      }
    ],
    "explanation": "`fp`는 정수 2개를 인자로 받아 정수를 반환하는 함수 포인터 배열입니다. `fp[0]`은 `add`, `fp[1]`은 `mul`을 가리킵니다. 안쪽의 `fp[0](3, 4)`가 먼저 실행되어 7이 되고, 바깥쪽의 `fp[1](7, 2)`가 실행되어 `7 * 2 = 14`가 출력됩니다.",
    "tip": "우사기: 야하-! `fp[0]`은 덧셈! `fp[1]`은 곱셈! 괄호 안쪽부터 차례대로 팡팡 터뜨리면 14 완성!",
    "character": "usagi"
  },
  {
    "id": 14,
    "title": "switch-case 문의 break 생략 (Fall-through) 누적 연산",
    "lang": "c",
    "topic": "제어문/switch",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int num = 2;\n    int sum = 0;\n    \n    switch (num) {\n        case 1: sum += 10;\n        case 2: sum += 20;\n        case 3: sum += 30;\n        default: sum += 5;\n    }\n    \n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "55",
    "altAnswers": [
      "55"
    ],
    "trace": [
      {
        "step": "1",
        "line": "switch(num=2) 진입",
        "desc": "case 2로 직접 점프"
      },
      {
        "step": "2",
        "line": "case 2: sum += 20;",
        "desc": "sum = 20 (break가 없음 -> 아래로 추락)"
      },
      {
        "step": "3",
        "line": "case 3: sum += 30;",
        "desc": "sum = 20 + 30 = 50 (break 없음)"
      },
      {
        "step": "4",
        "line": "default: sum += 5;",
        "desc": "sum = 50 + 5 = 55 -> switch 블록 종료"
      }
    ],
    "explanation": "`switch` 문에서 `case 2`와 일치하여 진입한 후 `break`가 없으므로 아래의 `case 3`과 `default`까지 순차적으로 모두 실행(Fall-through)됩니다. 따라서 `sum = 20 + 30 + 5 = 55`가 출력됩니다.",
    "tip": "모몽가: break가 없으면 멈추지 않고 끝까지 미끄러져 내려가는 거다! 이 몸의 기세를 본받으란 말이다!",
    "character": "momonga"
  },
  {
    "id": 15,
    "title": "2차원 배열의 주대각선 성분 합 계산",
    "lang": "c",
    "topic": "배열/2차원 배열",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int m[3][3] = {\n        {10, 2, 3},\n        {4, 20, 6},\n        {7, 8, 30}\n    };\n    int sum = 0;\n    for (int i = 0; i < 3; i++) {\n        sum += m[i][i];\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "60",
    "altAnswers": [
      "60"
    ],
    "trace": [
      {
        "step": "1",
        "line": "i=0",
        "desc": "sum += m[0][0] (10) -> sum=10"
      },
      {
        "step": "2",
        "line": "i=1",
        "desc": "sum += m[1][1] (20) -> sum=30"
      },
      {
        "step": "3",
        "line": "i=2",
        "desc": "sum += m[2][2] (30) -> sum=60"
      }
    ],
    "explanation": "`m[i][i]`는 2차원 배열의 행과 열 인덱스가 같은 주대각선(Main Diagonal) 성분들입니다. 10 + 20 + 30 = 60이 출력됩니다.",
    "tip": "쿠리만쥬: 왼쪽 위에서 오른쪽 아래로 비스듬히 가로지르는 대각선 합이지. 주대각선 원소만 쏙쏙 더하면 된다.",
    "character": "kurimanju"
  },
  {
    "id": 16,
    "title": "비트 XOR 연산자를 활용한 암호화 및 복호화 원리",
    "lang": "c",
    "topic": "비트 연산",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int data = 85;\n    int key = 30;\n    int enc = data ^ key;\n    int dec = enc ^ key;\n    printf(\"%d %d\", enc, dec);\n    return 0;\n}",
    "answer": "75 85",
    "altAnswers": [
      "75 85",
      "75, 85",
      "75,85"
    ],
    "trace": [
      {
        "step": "1",
        "line": "data ^ key",
        "desc": "85(01010101) ^ 30(00011110) = 01001011 (75)"
      },
      {
        "step": "2",
        "line": "enc ^ key",
        "desc": "75(01001011) ^ 30(00011110) = 01010101 (85 원래 데이터 복원)"
      },
      {
        "step": "3",
        "line": "printf",
        "desc": "75 85 출력"
      }
    ],
    "explanation": "XOR(`^`) 연산은 같은 비트이면 0, 다르면 1을 반환합니다. 동일한 키로 두 번 XOR을 적용하면 원래의 데이터로 복원되는 성질(`(A ^ B) ^ B = A`)이 있습니다. 암호화된 값 75와 복호화된 값 85가 출력됩니다.",
    "tip": "랏코: XOR은 두 번 베면 원래대로 돌아오는 신비한 검술과 같다. 첫 번째는 75, 두 번째는 원래의 85다.",
    "character": "rakko"
  },
  {
    "id": 17,
    "title": "포인터 간의 주소 뺄셈 연산 (원소 개수 차이)",
    "lang": "c",
    "topic": "포인터 연산",
    "year": "2021년 1회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30, 40, 50};\n    int *p1 = &arr[1];\n    int *p2 = &arr[4];\n    \n    int diff = p2 - p1;\n    printf(\"%d\", diff);\n    return 0;\n}",
    "answer": "3",
    "altAnswers": [
      "3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "p1 = &arr[1]; p2 = &arr[4];",
        "desc": "p1은 인덱스 1, p2는 인덱스 4를 가리킴"
      },
      {
        "step": "2",
        "line": "p2 - p1",
        "desc": "(arr+4) - (arr+1) = 4 - 1 = 3 (단위: sizeof(int))"
      },
      {
        "step": "3",
        "line": "printf(\"%d\", diff);",
        "desc": "3 출력"
      }
    ],
    "explanation": "동일한 배열 내에서 두 포인터 간의 뺄셈(`p2 - p1`)은 바이트 단위 주소 차이가 아니라, 해당 타입의 크기(`sizeof(int)`)로 나눈 원소의 개수(인덱스 차이)를 반환합니다. 따라서 4 - 1 = 3이 출력됩니다.",
    "tip": "하치와레: 포인터끼리 뺄셈하면 바이트 수가 아니라 '몇 칸 떨어져 있는가'가 나오는 거야! 12바이트 차이지만 4바이트 int니까 3칸!",
    "character": "hachiware"
  },
  {
    "id": 18,
    "title": "삼항 조건 연산자 중첩과 전위/후위 증감 연산",
    "lang": "c",
    "topic": "연산자/조건문",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 5, b = 10;\n    int res = (a++ > 5) ? (b += 2) : (++b * 2);\n    printf(\"%d %d %d\", res, a, b);\n    return 0;\n}",
    "answer": "22 6 11",
    "altAnswers": [
      "22 6 11",
      "22, 6, 11",
      "22,6,11"
    ],
    "trace": [
      {
        "step": "1",
        "line": "조건식: a++ > 5",
        "desc": "현재 a=5로 비교하므로 5 > 5는 거짓(False). 이후 a는 6으로 증가"
      },
      {
        "step": "2",
        "line": "거짓 분기 실행: (++b * 2)",
        "desc": "b를 전위 증가시켜 11로 만든 후 2를 곱함 -> 11 * 2 = 22"
      },
      {
        "step": "3",
        "line": "printf",
        "desc": "res=22, a=6, b=11 출력"
      }
    ],
    "explanation": "`a++ > 5`에서 `a++`는 후위 증감이므로 5로 평가되어 거짓이 됩니다. 거짓이므로 참 분기(`b += 2`)는 실행되지 않고 거짓 분기 `++b * 2`가 실행되어 `b`는 11이 되고 결과는 22가 됩니다. `a`는 비교 후 증가하여 6이 되므로 최종 출력은 22 6 11입니다.",
    "tip": "우사기: 야하-! 조건이 거짓이면 참 분기는 쳐다보지도 않아! 단락 평가와 증감 시점을 번개처럼 낚아채자!",
    "character": "usagi"
  },
  {
    "id": 19,
    "title": "재귀 함수를 이용한 유클리드 호제법 최대공약수(GCD)",
    "lang": "c",
    "topic": "알고리즘/재귀함수",
    "year": "2024년 2회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint gcd(int a, int b) {\n    if (b == 0) return a;\n    return gcd(b, a % b);\n}\n\nint main() {\n    printf(\"%d\", gcd(48, 18));\n    return 0;\n}",
    "answer": "6",
    "altAnswers": [
      "6"
    ],
    "trace": [
      {
        "step": "1",
        "line": "gcd(48, 18)",
        "desc": "48 % 18 = 12 -> gcd(18, 12) 호출"
      },
      {
        "step": "2",
        "line": "gcd(18, 12)",
        "desc": "18 % 12 = 6 -> gcd(12, 6) 호출"
      },
      {
        "step": "3",
        "line": "gcd(12, 6)",
        "desc": "12 % 6 = 0 -> gcd(6, 0) 호출"
      },
      {
        "step": "4",
        "line": "gcd(6, 0)",
        "desc": "b == 0 이므로 a=6 반환"
      }
    ],
    "explanation": "유클리드 호제법은 `gcd(a, b) = gcd(b, a % b)`를 반복하여 `b`가 0이 될 때의 `a`가 두 수의 최대공약수입니다. 48과 18의 최대공약수는 6이므로 6이 출력됩니다.",
    "tip": "치이카와: 와앗... 나머지가 0이 될 때까지 계속 나눠 들어가는 유클리드 호제법이야! 답은 6이야!",
    "character": "chiikawa"
  },
  {
    "id": 20,
    "title": "비트 NOT 연산자와 2의 보수(Two's Complement) 표현",
    "lang": "c",
    "topic": "비트 연산",
    "year": "2020년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 24;\n    int b = ~a + 1;\n    printf(\"%d\", b);\n    return 0;\n}",
    "answer": "-24",
    "altAnswers": [
      "-24"
    ],
    "trace": [
      {
        "step": "1",
        "line": "~a",
        "desc": "비트 반전 (~24) = -(24 + 1) = -25"
      },
      {
        "step": "2",
        "line": "~a + 1",
        "desc": "-25 + 1 = -24 (2의 보수 공식에 의해 부호 반전)"
      },
      {
        "step": "3",
        "line": "printf",
        "desc": "-24 출력"
      }
    ],
    "explanation": "컴퓨터에서 음수는 2의 보수로 표현됩니다. 2의 보수를 구하는 공식은 '1의 보수(비트 반전 `~`) + 1'입니다. 따라서 어떤 정수 `a`에 대해 `~a + 1`을 수행하면 부호가 반전된 `-a`인 -24가 출력됩니다.",
    "tip": "쿠리만쥬: 비트 뒤집고 1 더하면 음수로 둔갑하는 2의 보수 기본 공식이지. 24가 -24로 깔끔하게 떨어지지.",
    "character": "kurimanju"
  },
  {
    "id": 21,
    "title": "포인터를 이용한 Call by Reference 두 변수 Swap",
    "lang": "c",
    "topic": "포인터/함수",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nvoid swap(int *x, int *y) {\n    int temp = *x;\n    *x = *y;\n    *y = temp;\n}\n\nint main() {\n    int a = 10, b = 20;\n    swap(&a, &b);\n    printf(\"%d %d\", a, b);\n    return 0;\n}",
    "answer": "20 10",
    "altAnswers": [
      "20 10",
      "20, 10",
      "20,10"
    ],
    "trace": [
      {
        "step": "1",
        "line": "swap(&a, &b);",
        "desc": "a와 b의 메모리 주소를 전달"
      },
      {
        "step": "2",
        "line": "swap 내부 역참조 교환",
        "desc": "temp=10, *x=20, *y=10 -> main의 a=20, b=10으로 갱신"
      },
      {
        "step": "3",
        "line": "printf",
        "desc": "20 10 출력"
      }
    ],
    "explanation": "주소 연산자(`&`)와 포인터 역참조(`*`)를 활용해 원본 변수의 값을 직접 바꿀 수 있습니다. `a`와 `b`의 값이 서로 교환되어 20 10이 출력됩니다.",
    "tip": "하치와레: 주소를 넘겨줘서 함수 안에서 `*x`와 `*y`를 직접 바꿨으니까, 함수가 끝나도 바뀐 값이 그대로 남아있어!",
    "character": "hachiware"
  },
  {
    "id": 22,
    "title": "10진수를 16진수 문자열로 서식 출력 (%X)",
    "lang": "c",
    "topic": "서식 지정자",
    "year": "2020년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int num = 419;\n    printf(\"%X\", num);\n    return 0;\n}",
    "answer": "1A3",
    "altAnswers": [
      "1A3",
      "0x1A3",
      "1a3",
      "0x1a3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "419 / 16",
        "desc": "몫 26, 나머지 3"
      },
      {
        "step": "2",
        "line": "26 / 16",
        "desc": "몫 1, 나머지 10 (16진수로 A)"
      },
      {
        "step": "3",
        "line": "1 / 16",
        "desc": "몫 0, 나머지 1"
      },
      {
        "step": "4",
        "line": "역순 나열",
        "desc": "1, A, 3 -> 1A3"
      }
    ],
    "explanation": "10진수 419를 16으로 나누면 419 = 16 * 26 + 3, 26 = 16 * 1 + 10(A), 1 = 16 * 0 + 1이므로 역순으로 조합하면 `1A3`이 됩니다. `%X` 서식 지정자는 16진수 대문자로 출력하므로 `1A3`이 출력됩니다.",
    "tip": "모몽가: 10부터는 A, B, C, D, E, F인 건 당연히 알겠지? %X니까 반드시 대문자 1A3으로 써라!",
    "character": "momonga"
  },
  {
    "id": 23,
    "title": "문자열 길이 직접 카운트 (my_strlen 포인터 연산)",
    "lang": "c",
    "topic": "문자열/포인터",
    "year": "2023년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint my_strlen(const char *s) {\n    const char *p = s;\n    while (*p != '\\0') {\n        p++;\n    }\n    return p - s;\n}\n\nint main() {\n    char str[] = \"CHIIKAWA\";\n    printf(\"%d\", my_strlen(str));\n    return 0;\n}",
    "answer": "8",
    "altAnswers": [
      "8"
    ],
    "trace": [
      {
        "step": "1",
        "line": "p = s;",
        "desc": "p는 str의 시작 주소(인덱스 0)"
      },
      {
        "step": "2",
        "line": "while(*p != '\\0') p++;",
        "desc": "'C','H','I','I','K','A','W','A' 8글자를 지나 '\\0'에서 멈춤"
      },
      {
        "step": "3",
        "line": "p - s",
        "desc": "끝 주소 - 시작 주소 = 8"
      }
    ],
    "explanation": "`my_strlen` 함수는 포인터 `p`를 증가시키며 널 문자(`\\0`)를 만날 때까지 전진합니다. 그 후 끝 위치 `p`에서 시작 위치 `s`를 빼서 문자열의 실제 길이를 계산합니다. \"CHIIKAWA\"는 8글자이므로 8이 출력됩니다.",
    "tip": "랏코: 포인터의 끝 주소에서 시작 주소를 빼면 글자 수가 나온다. 널 문자는 길이에 포함되지 않는다.",
    "character": "rakko"
  },
  {
    "id": 24,
    "title": "구조체 배열 정렬 후 최댓값 데이터 추출",
    "lang": "c",
    "topic": "구조체/정렬",
    "year": "2022년 3회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nstruct Student {\n    char name[10];\n    int score;\n};\n\nint main() {\n    struct Student s[] = {\n        {\"Chii\", 80},\n        {\"Hachi\", 95},\n        {\"Usagi\", 90}\n    };\n    int maxIdx = 0;\n    for (int i = 1; i < 3; i++) {\n        if (s[i].score > s[maxIdx].score) {\n            maxIdx = i;\n        }\n    }\n    printf(\"%s %d\", s[maxIdx].name, s[maxIdx].score);\n    return 0;\n}",
    "answer": "Hachi 95",
    "altAnswers": [
      "Hachi 95",
      "Hachi, 95",
      "Hachi,95"
    ],
    "trace": [
      {
        "step": "1",
        "line": "초기화: maxIdx = 0 (Chii: 80)",
        "desc": "기준점 설정"
      },
      {
        "step": "2",
        "line": "i=1: s[1].score(95) > s[0].score(80)",
        "desc": "maxIdx = 1 (Hachi로 갱신)"
      },
      {
        "step": "3",
        "line": "i=2: s[2].score(90) > s[1].score(95)",
        "desc": "거짓이므로 갱신 없음"
      },
      {
        "step": "4",
        "line": "printf",
        "desc": "Hachi 95 출력"
      }
    ],
    "explanation": "구조체 배열을 순회하며 `score` 필드가 가장 높은 원소의 인덱스를 추적합니다. 점수가 가장 높은 학생은 Hachi(95점)이므로 `Hachi 95`가 출력됩니다.",
    "tip": "쿠리만쥬: 점수를 비교해서 가장 높은 인덱스를 기억해두는 전형적인 최댓값 탐색이지. Hachi 95가 답이다.",
    "character": "kurimanju"
  },
  {
    "id": 25,
    "title": "하노이의 탑(Hanoi Tower) 원판 이동 횟수 재귀 공식",
    "lang": "c",
    "topic": "재귀함수/수학",
    "year": "2021년 3회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint hanoi(int n) {\n    if (n == 1) return 1;\n    return 2 * hanoi(n - 1) + 1;\n}\n\nint main() {\n    printf(\"%d\", hanoi(4));\n    return 0;\n}",
    "answer": "15",
    "altAnswers": [
      "15"
    ],
    "trace": [
      {
        "step": "1",
        "line": "hanoi(1)",
        "desc": "1"
      },
      {
        "step": "2",
        "line": "hanoi(2)",
        "desc": "2 * 1 + 1 = 3"
      },
      {
        "step": "3",
        "line": "hanoi(3)",
        "desc": "2 * 3 + 1 = 7"
      },
      {
        "step": "4",
        "line": "hanoi(4)",
        "desc": "2 * 7 + 1 = 15"
      }
    ],
    "explanation": "하노이의 탑 원판 `n`개를 옮기는 최소 이동 횟수의 점화식은 `T(n) = 2 * T(n-1) + 1`이며 일반항은 `2^n - 1`입니다. `n=4`일 때 `2^4 - 1 = 15`가 출력됩니다.",
    "tip": "우사기: 이얏하-! 하노이의 탑 공식은 `2^n - 1`! 4개니까 16 - 1 = 15! 번개처럼 1초 만에 풀어버려!",
    "character": "usagi"
  },
  {
    "id": 26,
    "title": "동적 메모리 할당(malloc)과 포인터 누적 합 계산",
    "lang": "c",
    "topic": "동적 메모리",
    "year": "2023년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n#include <stdlib.h>\n\nint main() {\n    int *arr = (int *)malloc(sizeof(int) * 5);\n    for (int i = 0; i < 5; i++) {\n        arr[i] = (i + 1) * 10;\n    }\n    int sum = 0;\n    for (int j = 0; j < 5; j++) {\n        sum += *(arr + j);\n    }\n    free(arr);\n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "150",
    "altAnswers": [
      "150"
    ],
    "trace": [
      {
        "step": "1",
        "line": "malloc 할당 및 값 대입",
        "desc": "arr = {10, 20, 30, 40, 50}"
      },
      {
        "step": "2",
        "line": "sum += *(arr + j)",
        "desc": "10 + 20 + 30 + 40 + 50 = 150 누적"
      },
      {
        "step": "3",
        "line": "free(arr) 및 출력",
        "desc": "메모리 해제 후 150 출력"
      }
    ],
    "explanation": "`malloc`을 통해 정수 5개 크기의 힙 메모리를 동적 할당하고 10, 20, 30, 40, 50을 저장했습니다. 포인터 간접 참조 `*(arr + j)`로 모든 원소를 더하면 150이 됩니다.",
    "tip": "치이카와: 와앗... `malloc`으로 방 5개를 빌려서 10부터 50까지 넣고 다 더했더니 150이 됐어!",
    "character": "chiikawa"
  },
  {
    "id": 27,
    "title": "문자열 내 특정 알파벳 카운팅과 대소문자 검사",
    "lang": "c",
    "topic": "문자열/아스키코드",
    "year": "2022년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    char str[] = \"ChiiKaWa\";\n    int count = 0;\n    for (int i = 0; str[i] != '\\0'; i++) {\n        if (str[i] == 'a' || str[i] == 'A') {\n            count++;\n        }\n    }\n    printf(\"%d\", count);\n    return 0;\n}",
    "answer": "2",
    "altAnswers": [
      "2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "str 순회",
        "desc": "'C', 'h', 'i', 'i', 'K', 'a'(1), 'W', 'a'(2)"
      },
      {
        "step": "2",
        "line": "count 증가",
        "desc": "소문자 'a' 2개 매칭 -> count = 2"
      },
      {
        "step": "3",
        "line": "printf",
        "desc": "2 출력"
      }
    ],
    "explanation": "\"ChiiKaWa\" 문자열에서 대소문자 구분 없이 'a' 또는 'A'인 문자를 카운트합니다. 5번째 인덱스의 'a'와 7번째 인덱스의 'a' 총 2개가 있으므로 2가 출력됩니다.",
    "tip": "하치와레: 문자열을 한 글자씩 훑으면서 'a'나 'A'를 찾으면 딱 2개 나와!",
    "character": "hachiware"
  },
  {
    "id": 28,
    "title": "재귀 함수를 이용한 거듭제곱(Power) 분할정복",
    "lang": "c",
    "topic": "재귀함수/알고리즘",
    "year": "2024년 1회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint power(int base, int exp) {\n    if (exp == 0) return 1;\n    if (exp % 2 == 0) {\n        int half = power(base, exp / 2);\n        return half * half;\n    }\n    return base * power(base, exp - 1);\n}\n\nint main() {\n    printf(\"%d\", power(2, 6));\n    return 0;\n}",
    "answer": "64",
    "altAnswers": [
      "64"
    ],
    "trace": [
      {
        "step": "1",
        "line": "power(2, 6)",
        "desc": "짝수이므로 half = power(2, 3), half * half 계산"
      },
      {
        "step": "2",
        "line": "power(2, 3)",
        "desc": "홀수이므로 2 * power(2, 2)"
      },
      {
        "step": "3",
        "line": "power(2, 2)",
        "desc": "half = power(2, 1) -> power(2, 0)=1 -> 2 * 2 = 4"
      },
      {
        "step": "4",
        "line": "결과 조합",
        "desc": "power(2, 3) = 2 * 4 = 8 -> 8 * 8 = 64"
      }
    ],
    "explanation": "지수가 짝수일 때는 `power(base, exp/2)^2`로 분할하여 계산량을 줄이는 분할정복 알고리즘입니다. 2의 6제곱은 64이므로 64가 출력됩니다.",
    "tip": "랏코: 2의 6승은 64다. 분할정복으로 계산량을 반으로 쪼개면서 전진하는 훌륭한 검술과 같다.",
    "character": "rakko"
  },
  {
    "id": 29,
    "title": "구조체 패딩(Padding)과 메모리 정렬 크기 sizeof",
    "lang": "c",
    "topic": "구조체/메모리 정렬",
    "year": "2023년 2회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오. (단, 64비트 환경, 4바이트 정렬 기준)",
    "code": "#include <stdio.h>\n\nstruct Data {\n    char a;     // 1 byte\n    int b;      // 4 bytes\n    char c;     // 1 byte\n};\n\nint main() {\n    printf(\"%d\", (int)sizeof(struct Data));\n    return 0;\n}",
    "answer": "12",
    "altAnswers": [
      "12"
    ],
    "trace": [
      {
        "step": "1",
        "line": "char a (1 byte)",
        "desc": "뒤의 int b(4바이트) 정렬을 위해 3바이트 패딩 추가 -> 4바이트"
      },
      {
        "step": "2",
        "line": "int b (4 bytes)",
        "desc": "4바이트 차지 -> 누적 8바이트"
      },
      {
        "step": "3",
        "line": "char c (1 byte)",
        "desc": "전체 최대 멤버 크기(4바이트)의 배수가 되도록 3바이트 패딩 -> 4바이트"
      },
      {
        "step": "4",
        "line": "총 크기",
        "desc": "4 + 4 + 4 = 12 바이트"
      }
    ],
    "explanation": "구조체는 멤버 중 가장 큰 자료형인 `int`(4바이트)에 맞추어 메모리 정렬을 수행합니다. `char a` 뒤에 3바이트 패딩, `char c` 뒤에 3바이트 패딩이 들어가 총 4 + 4 + 4 = 12바이트가 됩니다.",
    "tip": "모몽가: 1 + 4 + 1 = 6이라고 쓰는 녀석은 바보다! 4바이트 블록으로 딱딱 맞춰지니까 12바이트란 말이다!",
    "character": "momonga"
  },
  {
    "id": 30,
    "title": "C언어 문자열 함수 strcmp와 조건문 분기",
    "lang": "c",
    "topic": "문자열 함수",
    "year": "2020년 4회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[] = \"USAGI\";\n    char s2[] = \"USAGI\";\n    if (strcmp(s1, s2) == 0) {\n        printf(\"EQUAL\");\n    } else {\n        printf(\"DIFF\");\n    }\n    return 0;\n}",
    "answer": "EQUAL",
    "altAnswers": [
      "EQUAL",
      "equal"
    ],
    "trace": [
      {
        "step": "1",
        "line": "strcmp(s1, s2)",
        "desc": "두 문자열이 완전히 동일하므로 0 반환"
      },
      {
        "step": "2",
        "line": "if (0 == 0)",
        "desc": "참 분기 진입 -> \"EQUAL\" 출력"
      }
    ],
    "explanation": "`strcmp` 함수는 두 문자열을 비교하여 같으면 0을 반환합니다. `s1`과 `s2`의 내용이 동일하므로 0이 반환되어 `EQUAL`이 출력됩니다.",
    "tip": "우사기: 이얏하-! C언어에서 문자열 비교는 `==`가 아니라 `strcmp`! 같으면 0을 뱉어내!",
    "character": "usagi"
  },
  {
    "id": 31,
    "title": "1차원 배열의 누적 합(Prefix Sum)과 특정 구간 합",
    "lang": "c",
    "topic": "배열/누적합",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {3, 7, 2, 8, 5};\n    int pref[5];\n    pref[0] = arr[0];\n    for (int i = 1; i < 5; i++) {\n        pref[i] = pref[i - 1] + arr[i];\n    }\n    int sum = pref[3] - pref[0];\n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "17",
    "altAnswers": [
      "17"
    ],
    "trace": [
      {
        "step": "1",
        "line": "pref 배열 구성",
        "desc": "pref = {3, 10, 12, 20, 25}"
      },
      {
        "step": "2",
        "line": "pref[3] - pref[0]",
        "desc": "20 - 3 = 17"
      },
      {
        "step": "3",
        "line": "검산",
        "desc": "arr[1] + arr[2] + arr[3] = 7 + 2 + 8 = 17"
      }
    ],
    "explanation": "누적 합 배열 `pref[i]`는 인덱스 0부터 i까지의 합을 저장합니다. 인덱스 1부터 3까지의 부분합은 `pref[3] - pref[0] = 20 - 3 = 17`로 계산됩니다.",
    "tip": "치이카와: 와앗... 누적 합 배열을 만들어두면 큰 덩어리에서 앞부분만 쏙 빼서 구간 합을 한 방에 구할 수 있어!",
    "character": "chiikawa"
  },
  {
    "id": 32,
    "title": "이진 탐색(Binary Search) 루프 비교 횟수 추적",
    "lang": "c",
    "topic": "알고리즘/이진탐색",
    "year": "2024년 2회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {2, 5, 8, 12, 16, 23, 38, 56, 72, 91};\n    int target = 23;\n    int left = 0, right = 9;\n    int count = 0;\n    \n    while (left <= right) {\n        count++;\n        int mid = (left + right) / 2;\n        if (arr[mid] == target) break;\n        else if (arr[mid] < target) left = mid + 1;\n        else right = mid - 1;\n    }\n    printf(\"%d\", count);\n    return 0;\n}",
    "answer": "3",
    "altAnswers": [
      "3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "1회전: left=0, right=9",
        "desc": "count=1, mid=(0+9)/2=4. arr[4]=16 < 23 -> left=5"
      },
      {
        "step": "2",
        "line": "2회전: left=5, right=9",
        "desc": "count=2, mid=(5+9)/2=7. arr[7]=56 > 23 -> right=6"
      },
      {
        "step": "3",
        "line": "3회전: left=5, right=6",
        "desc": "count=3, mid=(5+6)/2=5. arr[5]=23 == target! break"
      }
    ],
    "explanation": "이진 탐색 과정에서 1회전(`mid=4`, 값 16) -> 2회전(`mid=7`, 값 56) -> 3회전(`mid=5`, 값 23)에 타겟 23을 찾아 반복문을 종료합니다. 루프 실행 횟수 `count`는 3입니다.",
    "tip": "랏코: 정렬된 배열의 정중앙을 베어가며 범위를 절반씩 좁힌다. 3번의 탐색 끝에 23을 포착했다.",
    "character": "rakko"
  },
  {
    "id": 33,
    "title": "비트 시프트 연산자와 덧셈 연산자 우선순위 결합",
    "lang": "c",
    "topic": "비트 연산",
    "year": "2021년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 3;\n    int res = x << 2 + 1;\n    printf(\"%d\", res);\n    return 0;\n}",
    "answer": "24",
    "altAnswers": [
      "24"
    ],
    "trace": [
      {
        "step": "1",
        "line": "연산자 우선순위 판별",
        "desc": "덧셈(+) 연산자가 시프트(<<) 연산자보다 우선순위가 높음!"
      },
      {
        "step": "2",
        "line": "덧셈 먼저 계산",
        "desc": "2 + 1 = 3"
      },
      {
        "step": "3",
        "line": "시프트 연산",
        "desc": "x << 3 => 3 * (2^3) = 3 * 8 = 24"
      }
    ],
    "explanation": "C언어에서 산술 덧셈 연산자(`+`)는 비트 시프트 연산자(`<<`)보다 우선순위가 높습니다. 따라서 `(x << 2) + 1`이 아니라 `x << (2 + 1)`로 계산되어 `3 << 3 = 24`가 됩니다.",
    "tip": "쿠리만쥬: 시프트 연산자는 덧셈보다 서열이 낮다는 걸 잊지 마라. 2+1이 먼저 계산되어 3칸 시프트되는 거다!",
    "character": "kurimanju"
  },
  {
    "id": 34,
    "title": "문자열 포인터 증감과 역참조를 통한 모음 개수 카운트",
    "lang": "c",
    "topic": "포인터/문자열",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    char *p = \"Hachiware\";\n    int vowels = 0;\n    while (*p) {\n        char c = *p;\n        if (c=='a'||c=='e'||c=='i'||c=='o'||c=='u'||\n            c=='A'||c=='E'||c=='I'||c=='O'||c=='U') {\n            vowels++;\n        }\n        p++;\n    }\n    printf(\"%d\", vowels);\n    return 0;\n}",
    "answer": "4",
    "altAnswers": [
      "4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "\"Hachiware\" 모음 검사",
        "desc": "H-a(1)-c-h-i(2)-w-a(3)-r-e(4)"
      },
      {
        "step": "2",
        "line": "모음 추출",
        "desc": "a, i, a, e 총 4개"
      }
    ],
    "explanation": "\"Hachiware\"에서 모음(a, e, i, o, u)은 'a', 'i', 'a', 'e'로 총 4개입니다. 따라서 4가 출력됩니다.",
    "tip": "모몽가: 하치와레 이름 안에 든 모음(a, i, a, e)을 싹 긁어모으면 4개다! 똑똑히 기억해둬라!",
    "character": "momonga"
  },
  {
    "id": 35,
    "title": "전처리기 조건부 컴파일 (#ifdef / #elif) 분기",
    "lang": "c",
    "topic": "전처리기",
    "year": "2024년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\n#define MODE 2\n\nint main() {\n    int score = 100;\n#if MODE == 1\n    score += 10;\n#elif MODE == 2\n    score += 50;\n#else\n    score = 0;\n#endif\n    printf(\"%d\", score);\n    return 0;\n}",
    "answer": "150",
    "altAnswers": [
      "150"
    ],
    "trace": [
      {
        "step": "1",
        "line": "#define MODE 2",
        "desc": "매크로 상수 MODE에 2 정의"
      },
      {
        "step": "2",
        "line": "#elif MODE == 2 분기 활성화",
        "desc": "score += 50 코드만 컴파일됨"
      },
      {
        "step": "3",
        "line": "printf",
        "desc": "100 + 50 = 150 출력"
      }
    ],
    "explanation": "전처리기 조건부 컴파일 지시문 `#if`, `#elif`에 의해 `MODE == 2`인 블록만 실제 컴파일 대상이 됩니다. 따라서 `score += 50;`이 수행되어 150이 출력됩니다.",
    "tip": "우사기: 야하-! 조건부 컴파일은 조건에 맞는 코드만 살아남고 나머지는 컴파일러가 싹 지워버려! 150 확정!",
    "character": "usagi"
  },
  {
    "id": 36,
    "title": "부모 참조변수의 자식 인스턴스 참조: 필드 정적 바인딩 vs 메소드 동적 바인딩",
    "lang": "java",
    "topic": "상속/다형성",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class Parent {\n    int x = 10;\n    void show() {\n        System.out.print(\"Child \" + x);\n    }\n}\n\nclass Child extends Parent {\n    int x = 20;\n    void show() {\n        System.out.print(\"Child \" + x);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Parent p = new Child();\n        p.show();\n        System.out.print(\" \" + p.x);\n    }\n}",
    "answer": "Child 20 10",
    "altAnswers": [
      "Child 20 10",
      "Child 20, 10"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Parent p = new Child();",
        "desc": "부모 타입 참조변수 p가 자식 객체 Child를 참조 (업캐스팅)"
      },
      {
        "step": "2",
        "line": "p.show();",
        "desc": "메소드는 오버라이딩되어 런타임에 자식(Child)의 show()가 동적 바인딩 호출 -> 'Child 20' 출력"
      },
      {
        "step": "3",
        "line": "p.x",
        "desc": "멤버 변수(필드)는 참조변수의 선언 타입(Parent)에 정적 바인딩되므로 Parent.x인 10 접근"
      },
      {
        "step": "4",
        "line": "최종 출력",
        "desc": "Child 20 10 완성"
      }
    ],
    "explanation": "자바의 최고 빈출 킬러 함정입니다! 메소드는 가상 메소드 테이블(VMT)에 의해 런타임 객체 타입(Child)의 오버라이딩 메소드가 동적 바인딩(Dynamic Binding)되어 호출되지만, 멤버 변수(필드)는 참조 변수의 컴파일 타임 선언 타입(Parent)에 정적 바인딩됩니다. 따라서 `p.show()`는 `Child 20`을 출력하고, `p.x`는 `Parent`의 10이 출력됩니다.",
    "tip": "하치와레: 정처기 실기 1위 킬러 문제! 메소드는 자식 걸로 날아가고(동적), 변수는 부모 타입 그대로(정적)! 'Child 20 10' 꼭 외워둬!",
    "character": "hachiware"
  },
  {
    "id": 37,
    "title": "상속 관계에서 생성자 super() 연쇄 호출 순서",
    "lang": "java",
    "topic": "상속/생성자",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class A {\n    A() {\n        System.out.print(\"A\");\n    }\n}\n\nclass B extends A {\n    B() {\n        System.out.print(\"B\");\n    }\n}\n\nclass C extends B {\n    C() {\n        System.out.print(\"C\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new C();\n    }\n}",
    "answer": "ABC",
    "altAnswers": [
      "ABC",
      "A B C"
    ],
    "trace": [
      {
        "step": "1",
        "line": "new C();",
        "desc": "C의 생성자 호출 -> super()에 의해 B() 호출"
      },
      {
        "step": "2",
        "line": "B()",
        "desc": "B의 super()에 의해 최상위 A() 호출"
      },
      {
        "step": "3",
        "line": "A() 실행",
        "desc": "'A' 출력 후 B()로 복귀"
      },
      {
        "step": "4",
        "line": "B() 실행",
        "desc": "'B' 출력 후 C()로 복귀"
      },
      {
        "step": "5",
        "line": "C() 실행",
        "desc": "'C' 출력 -> ABC 완성"
      }
    ],
    "explanation": "자식 클래스의 생성자 첫 줄에는 컴파일러에 의해 자동으로 부모 생성자 호출문인 `super();`가 삽입됩니다. 따라서 최상위 부모 `A`부터 `B`, `C` 순서대로 생성자가 실행되어 `ABC`가 출력됩니다.",
    "tip": "우사기: 이얏하-! 자식 태어나기 전에 할아버지와 아버지가 먼저 태어나는 법! A -> B -> C 순서로 팡팡팡!",
    "character": "usagi"
  },
  {
    "id": 38,
    "title": "static 초기화 블록 vs 인스턴스 초기화 블록 vs 생성자 실행 순서",
    "lang": "java",
    "topic": "클래스 초기화",
    "year": "2024년 1회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class Test {\n    static {\n        System.out.print(\"S \");\n    }\n    {\n        System.out.print(\"I \");\n    }\n    Test() {\n        System.out.print(\"C \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Test();\n        new Test();\n    }\n}",
    "answer": "S I C I C",
    "altAnswers": [
      "S I C I C",
      "S I C I C ",
      "S, I, C, I, C"
    ],
    "trace": [
      {
        "step": "1",
        "line": "클래스 로딩 (1회만)",
        "desc": "static 블록 실행 -> 'S ' 출력"
      },
      {
        "step": "2",
        "line": "1번째 new Test()",
        "desc": "인스턴스 블록('I ') 실행 후 생성자('C ') 실행 -> 'I C '"
      },
      {
        "step": "3",
        "line": "2번째 new Test()",
        "desc": "static은 이미 실행됨! 인스턴스 블록('I ') 실행 후 생성자('C ') 실행 -> 'I C '"
      },
      {
        "step": "4",
        "line": "최종 출력",
        "desc": "S I C I C 완성"
      }
    ],
    "explanation": "`static` 초기화 블록은 클래스가 JVM 메모리에 처음 로드될 때 단 1번만 실행됩니다. 이후 인스턴스를 생성(`new`)할 때마다 인스턴스 초기화 블록 `{}`이 먼저 실행되고 이어서 생성자 `Test()`가 실행됩니다. 두 번째 객체 생성 시에는 `static` 블록이 실행되지 않으므로 최종 결과는 `S I C I C`입니다.",
    "tip": "쿠리만쥬: static은 가게 오픈할 때 딱 한 번 걸어두는 현판(S)이고, 인스턴스 블록(I)과 생성자(C)는 손님 올 때마다 맞이하는 거지!",
    "character": "kurimanju"
  },
  {
    "id": 39,
    "title": "추상 클래스 상속과 super.calc() 부모 메소드 재호출",
    "lang": "java",
    "topic": "추상클래스/상속",
    "year": "2021년 3회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "abstract class Base {\n    int calc(int a, int b) {\n        return a * b;\n    }\n}\n\nclass Sub extends Base {\n    int calc(int a, int b) {\n        return super.calc(a, b) + (a + b);\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Base obj = new Sub();\n        System.out.print(obj.calc(6, 4));\n    }\n}",
    "answer": "34",
    "altAnswers": [
      "34"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Base obj = new Sub();",
        "desc": "Sub 객체 생성"
      },
      {
        "step": "2",
        "line": "obj.calc(6, 4)",
        "desc": "오버라이딩된 Sub.calc(6, 4) 호출"
      },
      {
        "step": "3",
        "line": "super.calc(6, 4)",
        "desc": "부모 Base의 calc 호출 -> 6 * 4 = 24"
      },
      {
        "step": "4",
        "line": "덧셈 연산",
        "desc": "24 + (6 + 4) = 24 + 10 = 34 반환"
      }
    ],
    "explanation": "`Sub` 클래스는 부모 `Base`의 `calc` 메소드를 오버라이딩하면서 내부에서 `super.calc(a, b)`를 호출합니다. `super.calc(6, 4)`는 6 * 4 = 24를 반환하고, 여기에 `a + b`(10)을 더하므로 최종 결과는 34가 됩니다.",
    "tip": "랏코: `super.calc`로 부모의 기본 검격을 끌어온 뒤 자신의 힘을 더했다. 24 + 10 = 34다.",
    "character": "rakko"
  },
  {
    "id": 40,
    "title": "인터페이스 다중 구현과 default 메소드 충돌 해결",
    "lang": "java",
    "topic": "인터페이스/default메소드",
    "year": "2023년 1회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "interface A {\n    default void show() {\n        System.out.print(\"DefaultA \");\n    }\n}\n\ninterface B {\n    default void show() {\n        System.out.print(\"DefaultB \");\n    }\n}\n\nclass C implements A, B {\n    public void show() {\n        A.super.show();\n        System.out.print(\"CustomC\");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        C c = new C();\n        c.show();\n    }\n}",
    "answer": "DefaultA CustomC",
    "altAnswers": [
      "DefaultA CustomC",
      "DefaultA, CustomC"
    ],
    "trace": [
      {
        "step": "1",
        "line": "c.show() 호출",
        "desc": "C의 오버라이딩 show() 실행"
      },
      {
        "step": "2",
        "line": "A.super.show();",
        "desc": "인터페이스 A의 default 메소드 명시적 호출 -> 'DefaultA ' 출력"
      },
      {
        "step": "3",
        "line": "System.out.print(\"CustomC\");",
        "desc": "'CustomC' 출력"
      },
      {
        "step": "4",
        "line": "최종 출력",
        "desc": "DefaultA CustomC 완성"
      }
    ],
    "explanation": "두 인터페이스에 동일한 시그니처의 `default` 메소드가 있으면 구현 클래스에서 반드시 오버라이딩해야 충돌이 해결됩니다. 클래스 `C`에서 `A.super.show();`를 호출했으므로 `DefaultA `가 먼저 출력되고 이어서 `CustomC`가 출력됩니다.",
    "tip": "모몽가: 인터페이스 둘 다 같은 디폴트 메소드가 있으면 충돌난다! `A.super.show()`로 콕 집어 부르는 문법을 기억해라!",
    "character": "momonga"
  },
  {
    "id": 41,
    "title": "Call by Value 객체 참조 매개변수 함정 (배열 요소 변경 vs 배열 재할당)",
    "lang": "java",
    "topic": "매개변수 전달/Call by Value",
    "year": "2022년 1회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    static void modify(int[] arr, int val) {\n        arr[0] = 99;\n        val = 50;\n        arr = new int[]{1, 2, 3};\n        arr[0] = 77;\n    }\n\n    public static void main(String[] args) {\n        int[] a = {10, 20};\n        int v = 10;\n        modify(a, v);\n        System.out.print(a[0] + \" \" + v);\n    }\n}",
    "answer": "99 10",
    "altAnswers": [
      "99 10",
      "99, 10",
      "99,10"
    ],
    "trace": [
      {
        "step": "1",
        "line": "modify(a, v)",
        "desc": "배열 a의 주소값과 기본형 변수 v의 값(10)을 복사하여 전달"
      },
      {
        "step": "2",
        "line": "arr[0] = 99;",
        "desc": "매개변수 arr가 가리키는 원본 힙 배열 a[0]을 99로 갱신 (반영됨!)"
      },
      {
        "step": "3",
        "line": "val = 50;",
        "desc": "지역변수 val만 변경, 원본 v는 영향 없음"
      },
      {
        "step": "4",
        "line": "arr = new int[]{...};",
        "desc": "지역 참조변수 arr가 새 힙 객체를 가리키도록 변경. 원본 참조 a는 그대로 유지!"
      },
      {
        "step": "5",
        "line": "main 출력",
        "desc": "a[0]은 99, v는 10 출력"
      }
    ],
    "explanation": "자바는 오직 Call by Value로 동작합니다. 참조 변수를 넘기면 '주소값의 복사본'이 전달됩니다. 따라서 `arr[0] = 99;`는 원본 배열 객체의 필드를 수정하므로 반영되지만, `arr = new int[]{...};`는 복사된 지역 참조 변수 `arr`가 새 주소를 보게 만들 뿐 원본 `a`의 연결을 끊지 못합니다. 기본형 `v` 역시 불변이므로 `99 10`이 출력됩니다.",
    "tip": "하치와레: 원본 방 안의 가구를 바꾸는 건(arr[0]=99) 반영되지만, 새 방으로 이사 가는 건(arr = new) 원본과 아무 상관없어!",
    "character": "hachiware"
  },
  {
    "id": 42,
    "title": "try-catch-finally 반환값(return) 제어 흐름과 기본형 변수",
    "lang": "java",
    "topic": "예외처리/finally",
    "year": "2020년 2회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    static int test() {\n        int x = 10;\n        try {\n            return x;\n        } finally {\n            x += 20;\n            System.out.print(\"F \");\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.print(test());\n    }\n}",
    "answer": "F 10",
    "altAnswers": [
      "F 10",
      "F 10 ",
      "F, 10"
    ],
    "trace": [
      {
        "step": "1",
        "line": "try 블록: return x;",
        "desc": "반환할 값 10을 임시 레지스터(스택)에 저장 후 finally 블록으로 분기"
      },
      {
        "step": "2",
        "line": "finally 블록 실행",
        "desc": "x += 20 (x=30) 수행 후 'F ' 출력"
      },
      {
        "step": "3",
        "line": "메소드 종료",
        "desc": "임시 저장해둔 반환값 10을 최종 리턴 -> '10' 출력"
      }
    ],
    "explanation": "`try` 블록에서 `return x;`를 만나면 반환할 값(10)을 먼저 확정한 뒤 `finally` 블록을 실행합니다. `finally`에서 `x`의 값을 30으로 증가시켜도, `return` 문이 없는 한 이미 확정된 기본형 반환값 10은 바뀌지 않습니다. 따라서 `F `가 먼저 출력되고 이어서 10이 출력됩니다.",
    "tip": "쿠리만쥬: finally는 무조건 거쳐가지만, 이미 스택에 담긴 기본 반환값은 가로챌 수 없는 법이지. 'F 10' 명심해라!",
    "character": "kurimanju"
  },
  {
    "id": 43,
    "title": "String 불변성과 리터럴 풀 vs new String() (== vs equals)",
    "lang": "java",
    "topic": "String/메모리구조",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"CHII\";\n        String s2 = \"CHII\";\n        String s3 = new String(\"CHII\");\n        \n        System.out.print((s1 == s2) + \" \");\n        System.out.print(s1 == s3);\n    }\n}",
    "answer": "true false",
    "altAnswers": [
      "true false",
      "true, false",
      "true,false"
    ],
    "trace": [
      {
        "step": "1",
        "line": "s1 == s2",
        "desc": "문자열 리터럴은 String Constant Pool에 1개만 생성되어 주소 공유 -> true"
      },
      {
        "step": "2",
        "line": "s1 == s3",
        "desc": "s3는 new 연산자로 힙에 독립 생성된 별도 객체 -> 주소 비교(==)는 false"
      },
      {
        "step": "3",
        "line": "최종 출력",
        "desc": "true false 완성"
      }
    ],
    "explanation": "문자열 리터럴로 생성한 `s1`과 `s2`는 상수 풀(Constant Pool)의 동일한 메모리 주소를 참조하므로 `s1 == s2`는 `true`입니다. 반면 `new String()`으로 생성한 `s3`는 힙 영역에 새로운 객체로 할당되므로 주소 비교(`==`) 시 `false`가 됩니다.",
    "tip": "치이카와: 와앗... 리터럴은 같은 주소를 나눠 쓰지만 `new`를 쓰면 새로운 집을 지어서 주소가 달라져!",
    "character": "chiikawa"
  },
  {
    "id": 44,
    "title": "StringBuilder의 append, delete, reverse 체이닝 연산",
    "lang": "java",
    "topic": "StringBuilder",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder(\"CHIIKAWA\");\n        sb.delete(0, 4);\n        sb.reverse();\n        System.out.print(sb);\n    }\n}",
    "answer": "AWAK",
    "altAnswers": [
      "AWAK"
    ],
    "trace": [
      {
        "step": "1",
        "line": "sb = \"CHIIKAWA\"",
        "desc": "초기 문자열"
      },
      {
        "step": "2",
        "line": "sb.delete(0, 4)",
        "desc": "인덱스 0부터 3까지(\"CHII\") 삭제 -> 남은 문자열: \"KAWA\""
      },
      {
        "step": "3",
        "line": "sb.reverse()",
        "desc": "\"KAWA\"를 뒤집음 -> \"AWAK\""
      },
      {
        "step": "4",
        "line": "출력",
        "desc": "AWAK 출력"
      }
    ],
    "explanation": "`delete(start, end)`는 start부터 end-1까지의 문자를 제거합니다. `delete(0, 4)`는 인덱스 0~3인 \"CHII\"를 삭제하여 \"KAWA\"가 남습니다. 이를 `reverse()`하면 \"AWAK\"가 됩니다.",
    "tip": "우사기: 야하-! `delete(0, 4)`는 4 앞까지만 잘라내는 거야! 남은 KAWA를 뒤집어서 AWAK 뚝딱!",
    "character": "usagi"
  },
  {
    "id": 45,
    "title": "다형성 컬렉션: List<Parent> 순회와 오버라이딩 메소드 호출",
    "lang": "java",
    "topic": "다형성/컬렉션",
    "year": "2024년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.*;\n\nclass Animal {\n    void sound() { System.out.print(\"Animal \"); }\n}\nclass Dog extends Animal {\n    void sound() { System.out.print(\"Dog \"); }\n}\nclass Cat extends Animal {\n    void sound() { System.out.print(\"Cat \"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Animal> list = new ArrayList<>();\n        list.add(new Dog());\n        list.add(new Cat());\n        list.add(new Dog());\n        for (Animal a : list) {\n            a.sound();\n        }\n    }\n}",
    "answer": "Dog Cat Dog",
    "altAnswers": [
      "Dog Cat Dog",
      "Dog Cat Dog ",
      "Dog, Cat, Dog"
    ],
    "trace": [
      {
        "step": "1",
        "line": "list에 Dog, Cat, Dog 추가",
        "desc": "다형성 리스트 구성"
      },
      {
        "step": "2",
        "line": "for 루프 1회전 (Dog)",
        "desc": "Dog.sound() -> 'Dog '"
      },
      {
        "step": "3",
        "line": "for 루프 2회전 (Cat)",
        "desc": "Cat.sound() -> 'Cat '"
      },
      {
        "step": "4",
        "line": "for 루프 3회전 (Dog)",
        "desc": "Dog.sound() -> 'Dog '"
      }
    ],
    "explanation": "부모 타입 `Animal` 컬렉션에 자식 객체들을 담아 순회하면, 런타임에 각 인스턴스에 오버라이딩된 `sound()` 메소드가 동적 바인딩되어 호출됩니다. 따라서 `Dog Cat Dog `가 출력됩니다.",
    "tip": "랏코: 껍데기는 Animal이어도 속알맹이(실제 인스턴스)의 칼날이 번뜩인다. Dog Cat Dog다.",
    "character": "rakko"
  },
  {
    "id": 46,
    "title": "static 클래스 변수와 인스턴스 멤버 변수의 공유 범위",
    "lang": "java",
    "topic": "static/인스턴스변수",
    "year": "2020년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class Counter {\n    static int scnt = 0;\n    int icnt = 0;\n    void inc() {\n        scnt++;\n        icnt++;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Counter c1 = new Counter();\n        Counter c2 = new Counter();\n        c1.inc();\n        c1.inc();\n        c2.inc();\n        System.out.print(Counter.scnt + \" \" + c2.icnt);\n    }\n}",
    "answer": "3 1",
    "altAnswers": [
      "3 1",
      "3, 1",
      "3,1"
    ],
    "trace": [
      {
        "step": "1",
        "line": "c1.inc() 2회",
        "desc": "scnt=2, c1.icnt=2"
      },
      {
        "step": "2",
        "line": "c2.inc() 1회",
        "desc": "공유되는 scnt=3, c2의 독립된 icnt=1"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "Counter.scnt(3) + \" \" + c2.icnt(1) = 3 1"
      }
    ],
    "explanation": "`static int scnt`는 모든 `Counter` 인스턴스가 단 하나의 메모리 공간을 공유하므로 총 3번 증가하여 3이 됩니다. 반면 `icnt`는 각 객체마다 별도로 존재하므로 `c2`의 `icnt`는 1이 됩니다. 따라서 3 1이 출력됩니다.",
    "tip": "쿠리만쥬: static은 온 동네 사람들이 같이 마시는 우물물(3)이고, 인스턴스는 자기 개인 텀블러(1)인 셈이지.",
    "character": "kurimanju"
  },
  {
    "id": 47,
    "title": "익명 내부 클래스(Anonymous Class)의 메소드 재정의",
    "lang": "java",
    "topic": "내부클래스/익명클래스",
    "year": "2022년 3회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "interface Greeter {\n    void greet();\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Greeter g = new Greeter() {\n            public void greet() {\n                System.out.print(\"Hello Chiikawa\");\n            }\n        };\n        g.greet();\n    }\n}",
    "answer": "Hello Chiikawa",
    "altAnswers": [
      "Hello Chiikawa"
    ],
    "trace": [
      {
        "step": "1",
        "line": "익명 클래스 인스턴스화",
        "desc": "Greeter 인터페이스를 즉석에서 구현하는 이름 없는 클래스 생성"
      },
      {
        "step": "2",
        "line": "g.greet();",
        "desc": "재정의된 greet() 호출 -> 'Hello Chiikawa' 출력"
      }
    ],
    "explanation": "인터페이스 `Greeter`를 구현하는 별도 클래스 선언 없이 즉석에서 익명 내부 클래스 문법으로 오버라이딩하여 실행했습니다. 결과는 `Hello Chiikawa`입니다.",
    "tip": "치이카와: 와앗... 이름이 없는 익명 클래스라도 `greet()`를 만들어주면 예쁘게 인사해줘!",
    "character": "chiikawa"
  },
  {
    "id": 48,
    "title": "배열의 얕은 복사(Shallow Copy) vs clone 깊은 복사",
    "lang": "java",
    "topic": "배열 복사",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {10, 20};\n        int[] b = a;\n        int[] c = a.clone();\n        \n        b[0] = 100;\n        c[1] = 200;\n        \n        System.out.print(a[0] + \" \" + a[1]);\n    }\n}",
    "answer": "100 20",
    "altAnswers": [
      "100 20",
      "100, 20",
      "100,20"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int[] b = a;",
        "desc": "주소값 대입 (얕은 복사). a와 b는 동일한 힙 배열을 가리킴"
      },
      {
        "step": "2",
        "line": "int[] c = a.clone();",
        "desc": "배열 원소를 복제하여 새 힙 객체 생성 (독립적)"
      },
      {
        "step": "3",
        "line": "b[0] = 100;",
        "desc": "b를 통해 원본 배열 수정 -> a[0]도 100으로 변경"
      },
      {
        "step": "4",
        "line": "c[1] = 200;",
        "desc": "독립된 c만 수정 -> 원본 a[1]은 20 유지"
      },
      {
        "step": "5",
        "line": "printf",
        "desc": "a[0]=100, a[1]=20 출력"
      }
    ],
    "explanation": "`b = a`는 주소 대입이므로 `b[0] = 100`은 `a[0]`에 즉시 반영됩니다. 반면 `c = a.clone()`은 새 배열을 생성하여 복사하므로 `c[1] = 200`을 변경해도 원본 `a[1]`은 20을 유지합니다. 따라서 `100 20`이 출력됩니다.",
    "tip": "하치와레: `=`는 그냥 같은 방 열쇠를 하나 더 만든 거고, `clone()`은 똑같은 방을 새로 지은 거야!",
    "character": "hachiware"
  },
  {
    "id": 49,
    "title": "사용자 정의 예외(Custom Exception) 발생과 catch 처리",
    "lang": "java",
    "topic": "예외처리",
    "year": "2023년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class MyException extends Exception {\n    MyException(String msg) {\n        super(msg);\n    }\n}\n\npublic class Main {\n    static void check(int code) throws MyException {\n        if (code == 404) {\n            throw new MyException(\"NotFound\");\n        }\n    }\n\n    public static void main(String[] args) {\n        try {\n            check(404);\n            System.out.print(\"OK\");\n        } catch (MyException e) {\n            System.out.print(\"Error: \" + e.getMessage());\n        }\n    }\n}",
    "answer": "Error: NotFound",
    "altAnswers": [
      "Error: NotFound",
      "Error:NotFound"
    ],
    "trace": [
      {
        "step": "1",
        "line": "check(404)",
        "desc": "code == 404 조건 만족 -> throw new MyException(\"NotFound\")"
      },
      {
        "step": "2",
        "line": "catch (MyException e)",
        "desc": "예외 포착, \"OK\"는 실행되지 않고 catch 블록으로 이동"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "\"Error: \" + \"NotFound\" = Error: NotFound 출력"
      }
    ],
    "explanation": "조건 `code == 404`에 의해 `MyException` 예외가 명시적으로 발생(`throw`)하여 상위 `catch` 블록으로 점프합니다. `e.getMessage()`는 예외 생성자에 넘긴 `\"NotFound\"`를 반환하므로 `Error: NotFound`가 출력됩니다.",
    "tip": "모몽가: 예외가 터지면 뒤에 있는 코드는 싹 무시하고 catch로 직행한다! 이 몸이 친히 가르쳐주지!",
    "character": "momonga"
  },
  {
    "id": 50,
    "title": "제네릭(Generic) 클래스 선언과 타입 매개변수 활용",
    "lang": "java",
    "topic": "제네릭",
    "year": "2024년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class Box<T> {\n    private T item;\n    void set(T item) { this.item = item; }\n    T get() { return item; }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Box<Integer> box = new Box<>();\n        box.set(777);\n        System.out.print(\"Item: \" + box.get());\n    }\n}",
    "answer": "Item: 777",
    "altAnswers": [
      "Item: 777",
      "Item:777"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Box<Integer> box = new Box<>();",
        "desc": "타입 T가 Integer로 바인딩된 Box 생성"
      },
      {
        "step": "2",
        "line": "box.set(777);",
        "desc": "오토박싱되어 777 저장"
      },
      {
        "step": "3",
        "line": "box.get()",
        "desc": "777 반환 -> Item: 777 출력"
      }
    ],
    "explanation": "제네릭 클래스 `Box<T>`에 타입 인자로 `Integer`를 전달하여 안전하게 정수 777을 저장하고 반환받습니다. 출력값은 `Item: 777`입니다.",
    "tip": "우사기: 야하-! 붕어빵 틀에 Integer 팥을 넣으면 777 붕어빵이 쏙 나오는 게 제네릭이야!",
    "character": "usagi"
  },
  {
    "id": 51,
    "title": "ArrayList와 Collections.sort(Comparator) 정렬",
    "lang": "java",
    "topic": "컬렉션/정렬",
    "year": "2022년 2회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<String> list = new ArrayList<>(Arrays.asList(\"Hachi\", \"Usagi\", \"Chii\"));\n        Collections.sort(list, (a, b) -> b.length() - a.length());\n        for (String s : list) {\n            System.out.print(s + \" \");\n        }\n    }\n}",
    "answer": "Hachi Usagi Chii",
    "altAnswers": [
      "Hachi Usagi Chii",
      "Hachi Usagi Chii ",
      "Hachi, Usagi, Chii"
    ],
    "trace": [
      {
        "step": "1",
        "line": "길이 계산",
        "desc": "Hachi(5), Usagi(5), Chii(4)"
      },
      {
        "step": "2",
        "line": "b.length() - a.length()",
        "desc": "길이 기준 내림차순 정렬 (긴 것이 앞)"
      },
      {
        "step": "3",
        "line": "정렬 결과 순회",
        "desc": "길이 5인 Hachi, Usagi가 앞, 4인 Chii가 맨 뒤 -> Hachi Usagi Chii"
      }
    ],
    "explanation": "람다식 `(a, b) -> b.length() - a.length()`는 문자열 길이에 대한 내림차순 정렬 기준입니다. 길이 5인 \"Hachi\"와 \"Usagi\"가 먼저 오고(기존 순서 유지 Stable Sort), 길이 4인 \"Chii\"가 마지막에 배치되어 `Hachi Usagi Chii `가 출력됩니다.",
    "tip": "랏코: `b - a`는 큰 것이 앞으로 오는 내림차순이다. 글자 수가 긴 전사부터 도열하라.",
    "character": "rakko"
  },
  {
    "id": 52,
    "title": "HashSet의 중복 제거 특성과 고유 원소 개수",
    "lang": "java",
    "topic": "컬렉션/Set",
    "year": "2021년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Set<Integer> set = new HashSet<>();\n        set.add(10);\n        set.add(20);\n        set.add(10);\n        set.add(30);\n        System.out.print(set.size());\n    }\n}",
    "answer": "3",
    "altAnswers": [
      "3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "set.add(10), add(20)",
        "desc": "10, 20 추가 (size=2)"
      },
      {
        "step": "2",
        "line": "set.add(10)",
        "desc": "10은 이미 존재하므로 중복 무시 (추가되지 않음)"
      },
      {
        "step": "3",
        "line": "set.add(30)",
        "desc": "30 추가 (size=3)"
      },
      {
        "step": "4",
        "line": "set.size()",
        "desc": "3 출력"
      }
    ],
    "explanation": "`HashSet`은 중복된 요소를 허용하지 않는 자료구조입니다. 10이 두 번 추가되려 하지만 중복 제거되어 최종적으로 `{10, 20, 30}` 3개만 남으므로 `set.size()`는 3입니다.",
    "tip": "치이카와: 와앗... Set은 똑같은 풀은 두 번 뽑지 않아! 10이 중복되어서 3개만 남아!",
    "character": "chiikawa"
  },
  {
    "id": 53,
    "title": "HashMap의 getOrDefault()를 이용한 빈도수 누적",
    "lang": "java",
    "topic": "컬렉션/Map",
    "year": "2023년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Map<String, Integer> map = new HashMap<>();\n        String[] words = {\"apple\", \"banana\", \"apple\", \"apple\"};\n        for (String w : words) {\n            map.put(w, map.getOrDefault(w, 0) + 1);\n        }\n        System.out.print(map.get(\"apple\"));\n    }\n}",
    "answer": "3",
    "altAnswers": [
      "3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "1번째 apple",
        "desc": "getOrDefault 0 + 1 = 1 저장"
      },
      {
        "step": "2",
        "line": "banana",
        "desc": "getOrDefault 0 + 1 = 1 저장"
      },
      {
        "step": "3",
        "line": "2번째 apple",
        "desc": "기존 1 + 1 = 2 갱신"
      },
      {
        "step": "4",
        "line": "3번째 apple",
        "desc": "기존 2 + 1 = 3 갱신"
      },
      {
        "step": "5",
        "line": "map.get(\"apple\")",
        "desc": "3 출력"
      }
    ],
    "explanation": "`getOrDefault(key, defaultVal)`은 키가 존재하면 기존 값을, 없으면 기본값 0을 반환합니다. \"apple\"이 총 3회 등장하므로 3이 출력됩니다.",
    "tip": "하치와레: 단어 셀 때 진짜 많이 쓰는 패턴이야! 사과가 3번 들어갔으니 답은 3!",
    "character": "hachiware"
  },
  {
    "id": 54,
    "title": "람다식과 Predicate 함수형 인터페이스 조건 필터링",
    "lang": "java",
    "topic": "람다/함수형인터페이스",
    "year": "2024년 2회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.function.Predicate;\n\npublic class Main {\n    public static void main(String[] args) {\n        Predicate<Integer> isEven = n -> n % 2 == 0;\n        int[] arr = {11, 20, 33, 40, 55};\n        for (int v : arr) {\n            if (isEven.test(v)) {\n                System.out.print(v + \" \");\n            }\n        }\n    }\n}",
    "answer": "20 40",
    "altAnswers": [
      "20 40",
      "20 40 ",
      "20, 40",
      "20,40"
    ],
    "trace": [
      {
        "step": "1",
        "line": "isEven 정의",
        "desc": "짝수인지 검사하는 람다식 (n % 2 == 0)"
      },
      {
        "step": "2",
        "line": "arr 순회",
        "desc": "11(홀), 20(짝->출력), 33(홀), 40(짝->출력), 55(홀)"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "20 40 출력"
      }
    ],
    "explanation": "`Predicate<T>`는 인자 하나를 받아 boolean을 반환하는 함수형 인터페이스입니다. `isEven.test(v)`를 만족하는 짝수는 20과 40이므로 `20 40 `이 출력됩니다.",
    "tip": "우사기: 야하-! Predicate는 참/거짓 판별기! 짝수만 걸러내니까 20과 40이 통과!",
    "character": "usagi"
  },
  {
    "id": 55,
    "title": "Stream API의 filter, mapToInt, sum 복합 파이프라인",
    "lang": "java",
    "topic": "Stream API",
    "year": "2023년 2회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> list = Arrays.asList(1, 2, 3, 4, 5, 6);\n        int total = list.stream()\n                        .filter(n -> n % 2 == 0)\n                        .mapToInt(n -> n * 10)\n                        .sum();\n        System.out.print(total);\n    }\n}",
    "answer": "120",
    "altAnswers": [
      "120"
    ],
    "trace": [
      {
        "step": "1",
        "line": "filter(n % 2 == 0)",
        "desc": "짝수만 추출 -> 2, 4, 6"
      },
      {
        "step": "2",
        "line": "mapToInt(n * 10)",
        "desc": "10배 곱하기 -> 20, 40, 60"
      },
      {
        "step": "3",
        "line": "sum()",
        "desc": "20 + 40 + 60 = 120 계산"
      },
      {
        "step": "4",
        "line": "출력",
        "desc": "120 출력"
      }
    ],
    "explanation": "Stream 파이프라인에서 짝수 `2, 4, 6`을 필터링한 후, 각각 10을 곱하여 `20, 40, 60`으로 변환하고 `sum()`으로 합산하므로 120이 출력됩니다.",
    "tip": "쿠리만쥬: 파이프라인을 따라 술술 흘러가지. 짝수(2,4,6) 뽑아서 10배 튀기고 다 더하면 120!",
    "character": "kurimanju"
  },
  {
    "id": 56,
    "title": "Integer 캐싱 범위(-128~127)와 주소 비교(==) 함정",
    "lang": "java",
    "topic": "Wrapper 클래스/캐싱",
    "year": "2020년 4회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        Integer a = 100;\n        Integer b = 100;\n        Integer c = 200;\n        Integer d = 200;\n        \n        System.out.print((a == b) + \" \" + (c == d));\n    }\n}",
    "answer": "true false",
    "altAnswers": [
      "true false",
      "true, false",
      "true,false"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a == b (100)",
        "desc": "Java IntegerCache 범위(-128~127) 내부이므로 동일 객체 재사용 -> true"
      },
      {
        "step": "2",
        "line": "c == d (200)",
        "desc": "127을 초과하므로 힙에 별도 객체로 각각 생성됨 -> 주소 다름 -> false"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "true false 출력"
      }
    ],
    "explanation": "자바는 메모리 최적화를 위해 -128부터 127 사이의 `Integer` 객체를 미리 캐싱(`IntegerCache`)해둡니다. 100은 캐싱 범위에 있어 `a == b`가 `true`이지만, 200은 범위를 벗어나 매번 새로운 객체를 생성하므로 주소 비교 `c == d`는 `false`가 됩니다.",
    "tip": "하치와레: 정처기 킬러 함정! 127까지만 같은 녀석 취급(true)하고, 128부터는 남남(false)이 되는 거야!",
    "character": "hachiware"
  },
  {
    "id": 57,
    "title": "final 키워드(상수 및 상속 방지)의 의미와 동작",
    "lang": "java",
    "topic": "final 키워드",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class Config {\n    static final int MAX = 100;\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        final int val = 50;\n        System.out.print(Config.MAX + val);\n    }\n}",
    "answer": "150",
    "altAnswers": [
      "150"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Config.MAX",
        "desc": "클래스 레벨 상수 100"
      },
      {
        "step": "2",
        "line": "val",
        "desc": "지역 상수 50"
      },
      {
        "step": "3",
        "line": "덧셈 및 출력",
        "desc": "100 + 50 = 150 출력"
      }
    ],
    "explanation": "`final`이 붙은 변수는 한 번 값이 할당되면 다시 변경할 수 없는 상수가 됩니다. 100 + 50 = 150이 출력됩니다.",
    "tip": "치이카와: 와앗... final은 마지막으로 딱 정해진 거라서 바꿀 수 없어! 100 + 50 = 150이야!",
    "character": "chiikawa"
  },
  {
    "id": 58,
    "title": "싱글톤 패턴(Singleton Pattern)의 동일 인스턴스 검증",
    "lang": "java",
    "topic": "디자인 패턴/싱글톤",
    "year": "2022년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class Manager {\n    private static Manager instance = new Manager();\n    private Manager() {}\n    public static Manager getInstance() {\n        return instance;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Manager m1 = Manager.getInstance();\n        Manager m2 = Manager.getInstance();\n        if (m1 == m2) {\n            System.out.print(\"SAME\");\n        } else {\n            System.out.print(\"DIFF\");\n        }\n    }\n}",
    "answer": "SAME",
    "altAnswers": [
      "SAME",
      "same"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Manager.getInstance() 호출",
        "desc": "static instance 단일 객체 반환"
      },
      {
        "step": "2",
        "line": "m1 == m2 비교",
        "desc": "둘 다 동일한 static 인스턴스를 참조하므로 true"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "\"SAME\" 출력"
      }
    ],
    "explanation": "싱글톤 패턴은 생성자를 `private`으로 숨겨 외부 생성을 막고, `getInstance()`를 통해 단 하나의 인스턴스만 공유합니다. `m1`과 `m2`는 동일 객체이므로 `SAME`이 출력됩니다.",
    "tip": "랏코: 오직 하나만 존재하는 우두머리 패턴이다. 주소가 완전히 일치하므로 SAME이다.",
    "character": "rakko"
  },
  {
    "id": 59,
    "title": "Thread run() 직접 호출 vs start()의 차이",
    "lang": "java",
    "topic": "스레드(Thread)",
    "year": "2020년 1회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class MyTask extends Thread {\n    public void run() {\n        System.out.print(\"TaskRun \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        MyTask t = new MyTask();\n        t.run();\n        System.out.print(\"MainEnd\");\n    }\n}",
    "answer": "TaskRun MainEnd",
    "altAnswers": [
      "TaskRun MainEnd",
      "TaskRun, MainEnd"
    ],
    "trace": [
      {
        "step": "1",
        "line": "t.run(); 직접 호출",
        "desc": "start()가 아니므로 새 스레드가 아닌 main 스레드에서 일반 메소드로 동기 실행 -> 'TaskRun ' 즉시 출력"
      },
      {
        "step": "2",
        "line": "System.out.print(\"MainEnd\");",
        "desc": "순차적으로 'MainEnd' 출력"
      },
      {
        "step": "3",
        "line": "최종 출력",
        "desc": "TaskRun MainEnd 완성"
      }
    ],
    "explanation": "`t.start()`는 OS 스레드를 생성하여 비동기로 실행하지만, `t.run()`을 직접 호출하면 단순한 일반 메소드 호출과 동일하게 현재(main) 스레드에서 동기적으로 차례대로 실행됩니다. 따라서 `TaskRun MainEnd`가 확정적으로 출력됩니다.",
    "tip": "모몽가: run()을 부르면 스레드가 아니라 그냥 일반 메소드다! 순서대로 TaskRun MainEnd 나온다!",
    "character": "momonga"
  },
  {
    "id": 60,
    "title": "재귀 메소드를 이용한 2진 트리 전위 순회(Preorder Traversal)",
    "lang": "java",
    "topic": "트리/재귀순회",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class Node {\n    int val;\n    Node left, right;\n    Node(int v) { val = v; }\n}\n\npublic class Main {\n    static void preorder(Node n) {\n        if (n == null) return;\n        System.out.print(n.val + \" \");\n        preorder(n.left);\n        preorder(n.right);\n    }\n\n    public static void main(String[] args) {\n        Node root = new Node(1);\n        root.left = new Node(2);\n        root.right = new Node(3);\n        root.left.left = new Node(4);\n        root.left.right = new Node(5);\n        preorder(root);\n    }\n}",
    "answer": "1 2 4 5 3",
    "altAnswers": [
      "1 2 4 5 3",
      "1 2 4 5 3 ",
      "1, 2, 4, 5, 3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "preorder(1)",
        "desc": "1 출력 -> preorder(2) 호출"
      },
      {
        "step": "2",
        "line": "preorder(2)",
        "desc": "2 출력 -> preorder(4) 호출"
      },
      {
        "step": "3",
        "line": "preorder(4)",
        "desc": "4 출력 -> 자식 없음 리턴"
      },
      {
        "step": "4",
        "line": "preorder(5)",
        "desc": "5 출력 -> 자식 없음 리턴"
      },
      {
        "step": "5",
        "line": "preorder(3)",
        "desc": "3 출력 -> 트리 순회 종료"
      }
    ],
    "explanation": "전위 순회(Preorder)는 `Root -> Left -> Right` 순서로 방문합니다. 1을 방문하고, 왼쪽 서브트리의 루트 2 -> 4 -> 5를 방문한 뒤, 오른쪽 서브트리 3을 방문하므로 `1 2 4 5 3 `이 출력됩니다.",
    "tip": "하치와레: 전위 순회는 '나 -> 왼쪽 -> 오른쪽' 순서야! 1 찍고 2, 4, 5 다 돌고 마지막에 3으로!",
    "character": "hachiware"
  },
  {
    "id": 61,
    "title": "다형성을 활용한 팩토리 메소드 패턴 형태의 객체 실행",
    "lang": "java",
    "topic": "디자인 패턴/다형성",
    "year": "2024년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "interface Shape { void draw(); }\nclass Circle implements Shape { public void draw() { System.out.print(\"Circle \"); } }\nclass Rect implements Shape { public void draw() { System.out.print(\"Rect\"); } }\n\npublic class Main {\n    static Shape create(String type) {\n        if (\"c\".equals(type)) return new Circle();\n        return new Rect();\n    }\n    public static void main(String[] args) {\n        create(\"c\").draw();\n        create(\"r\").draw();\n    }\n}",
    "answer": "Circle Rect",
    "altAnswers": [
      "Circle Rect",
      "Circle, Rect"
    ],
    "trace": [
      {
        "step": "1",
        "line": "create(\"c\").draw()",
        "desc": "Circle 객체 생성 및 draw() 호출 -> 'Circle '"
      },
      {
        "step": "2",
        "line": "create(\"r\").draw()",
        "desc": "Rect 객체 생성 및 draw() 호출 -> 'Rect'"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "Circle Rect 완성"
      }
    ],
    "explanation": "문자열 인자에 따라 적절한 `Shape` 구현 객체를 반환하는 팩토리 구조입니다. 'c'일 때 `Circle`, 그 외에는 `Rect`를 생성하여 호출하므로 `Circle Rect`가 출력됩니다.",
    "tip": "우사기: 이얏하-! 공장에서 맞춤형 객체를 뿅 뽑아내는 팩토리 패턴! Circle Rect 완성!",
    "character": "usagi"
  },
  {
    "id": 62,
    "title": "2차원 가변 배열(Ragged Array)의 행 길이 누적",
    "lang": "java",
    "topic": "가변 배열",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[][] arr = new int[3][];\n        arr[0] = new int[1];\n        arr[1] = new int[2];\n        arr[2] = new int[3];\n        \n        int total = 0;\n        for (int i = 0; i < arr.length; i++) {\n            total += arr[i].length;\n        }\n        System.out.print(total);\n    }\n}",
    "answer": "6",
    "altAnswers": [
      "6"
    ],
    "trace": [
      {
        "step": "1",
        "line": "arr[0].length",
        "desc": "1"
      },
      {
        "step": "2",
        "line": "arr[1].length",
        "desc": "2"
      },
      {
        "step": "3",
        "line": "arr[2].length",
        "desc": "3"
      },
      {
        "step": "4",
        "line": "total",
        "desc": "1 + 2 + 3 = 6 출력"
      }
    ],
    "explanation": "자바는 행마다 열의 길이가 다른 가변 배열을 지원합니다. 각 행의 길이 1, 2, 3을 모두 더하면 6이 됩니다.",
    "tip": "치이카와: 와앗... 계단 모양 가변 배열이야! 1 + 2 + 3 = 6칸이네!",
    "character": "chiikawa"
  },
  {
    "id": 63,
    "title": "Math 클래스의 반올림(round), 올림(ceil), 내림(floor) 연산",
    "lang": "java",
    "topic": "Math 클래스",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        double val = 4.3;\n        long r = Math.round(val);\n        double c = Math.ceil(val);\n        double f = Math.floor(val);\n        System.out.print(r + \" \" + (int)c + \" \" + (int)f);\n    }\n}",
    "answer": "4 5 4",
    "altAnswers": [
      "4 5 4",
      "4, 5, 4",
      "4,5,4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Math.round(4.3)",
        "desc": "반올림 -> 4"
      },
      {
        "step": "2",
        "line": "Math.ceil(4.3)",
        "desc": "올림 -> 5.0 (int 변환 시 5)"
      },
      {
        "step": "3",
        "line": "Math.floor(4.3)",
        "desc": "내림 -> 4.0 (int 변환 시 4)"
      },
      {
        "step": "4",
        "line": "출력",
        "desc": "4 5 4 출력"
      }
    ],
    "explanation": "4.3에 대해 `round`는 4, 천장(올림) `ceil`은 5, 바닥(내림) `floor`는 4를 반환합니다. 출력 결과는 `4 5 4`입니다.",
    "tip": "쿠리만쥬: round는 반올림(4), ceil은 지붕(5), floor는 바닥(4)! 알겠나?",
    "character": "kurimanju"
  },
  {
    "id": 64,
    "title": "String의 replaceAll 정규표현식 치환",
    "lang": "java",
    "topic": "문자열/정규식",
    "year": "2023년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        String str = \"Chiikawa-2024\";\n        String res = str.replaceAll(\"[0-9]\", \"*\");\n        System.out.print(res);\n    }\n}",
    "answer": "Chiikawa-****",
    "altAnswers": [
      "Chiikawa-****"
    ],
    "trace": [
      {
        "step": "1",
        "line": "정규식 [0-9]",
        "desc": "모든 숫자 '2', '0', '2', '4' 매칭"
      },
      {
        "step": "2",
        "line": "치환",
        "desc": "각 숫자를 '*'로 치환 -> Chiikawa-****"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "Chiikawa-**** 출력"
      }
    ],
    "explanation": "`replaceAll`은 정규표현식을 지원하여 `[0-9]`에 해당하는 모든 숫자를 `*`로 치환합니다. 결과는 `Chiikawa-****`입니다.",
    "tip": "하치와레: `replaceAll`은 정규식을 쓸 수 있어! 숫자 4개가 별표 4개로 쏙 바뀌었어!",
    "character": "hachiware"
  },
  {
    "id": 65,
    "title": "논리 연산자 단락 평가(Short-circuit)와 증감 연산자 함정",
    "lang": "java",
    "topic": "연산자/단락평가",
    "year": "2020년 2회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 5, b = 10;\n        boolean res = (a++ > 5) && (++b > 10);\n        System.out.print(res + \" \" + a + \" \" + b);\n    }\n}",
    "answer": "false 6 10",
    "altAnswers": [
      "false 6 10",
      "false, 6, 10",
      "false,6,10"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a++ > 5 평가",
        "desc": "현재 a=5로 5 > 5는 false. 평가 후 a=6으로 증가"
      },
      {
        "step": "2",
        "line": "단락 평가 발생",
        "desc": "AND(&&) 연산의 좌변이 false이므로 우변 (++b > 10)은 아예 실행되지 않음!"
      },
      {
        "step": "3",
        "line": "b의 상태",
        "desc": "b는 실행되지 않아 원래 10 유지"
      },
      {
        "step": "4",
        "line": "출력",
        "desc": "false 6 10 출력"
      }
    ],
    "explanation": "논리 AND(`&&`) 연산은 좌변이 `false`이면 전체 결과가 거짓이 확정되므로 우변을 실행하지 않습니다(Short-circuit Evaluation). `a++`는 평가 후 6이 되지만 우변의 `++b`는 건너뛰어 `b`는 10 그대로 남습니다. 출력은 `false 6 10`입니다.",
    "tip": "랏코: 앞이 거짓이면 뒤는 베어보지도 않고 끝낸다. b는 11이 아니라 10 그대로다.",
    "character": "rakko"
  },
  {
    "id": 66,
    "title": "상속 계층 구조에서의 다운캐스팅과 instanceof",
    "lang": "java",
    "topic": "형변환/instanceof",
    "year": "2024년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "class Super {}\nclass Sub extends Super {\n    void hello() { System.out.print(\"HELLO\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Super obj = new Sub();\n        if (obj instanceof Sub) {\n            Sub s = (Sub) obj;\n            s.hello();\n        }\n    }\n}",
    "answer": "HELLO",
    "altAnswers": [
      "HELLO",
      "hello"
    ],
    "trace": [
      {
        "step": "1",
        "line": "obj instanceof Sub",
        "desc": "실제 인스턴스가 Sub이므로 true"
      },
      {
        "step": "2",
        "line": "다운캐스팅",
        "desc": "Sub s = (Sub) obj 안전하게 캐스팅"
      },
      {
        "step": "3",
        "line": "s.hello()",
        "desc": "HELLO 출력"
      }
    ],
    "explanation": "`instanceof` 연산자로 실제 인스턴스 타입을 확인한 후 부모 타입 `obj`를 안전하게 자식 타입 `Sub`으로 다운캐스팅하여 고유 메소드 `hello()`를 호출했습니다. `HELLO`가 출력됩니다.",
    "tip": "치이카와: 와앗... `instanceof`로 안전한지 확인하고 문을 열어준 거야! HELLO!",
    "character": "chiikawa"
  },
  {
    "id": 67,
    "title": "Enum(열거형) 정의와 switch 분기",
    "lang": "java",
    "topic": "Enum",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "enum Level {\n    LOW, MID, HIGH\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Level lv = Level.MID;\n        switch (lv) {\n            case LOW: System.out.print(\"1\"); break;\n            case MID: System.out.print(\"2\"); break;\n            case HIGH: System.out.print(\"3\"); break;\n        }\n    }\n}",
    "answer": "2",
    "altAnswers": [
      "2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "lv = Level.MID",
        "desc": "MID 열거 상수 대입"
      },
      {
        "step": "2",
        "line": "case MID 분기",
        "desc": "2 출력 후 break"
      }
    ],
    "explanation": "`Level.MID` 상수와 일치하는 `case MID:`가 실행되어 2가 출력됩니다.",
    "tip": "우사기: 야하-! 열거형도 switch 문에 딱 맞아떨어져! 2번 찍고 퇴근!",
    "character": "usagi"
  },
  {
    "id": 68,
    "title": "재귀 메소드를 이용한 문자열 뒤집기",
    "lang": "java",
    "topic": "재귀함수/문자열",
    "year": "2021년 3회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    static String rev(String s) {\n        if (s.isEmpty()) return s;\n        return rev(s.substring(1)) + s.charAt(0);\n    }\n\n    public static void main(String[] args) {\n        System.out.print(rev(\"CHII\"));\n    }\n}",
    "answer": "IIHC",
    "altAnswers": [
      "IIHC"
    ],
    "trace": [
      {
        "step": "1",
        "line": "rev(\"CHII\")",
        "desc": "rev(\"HII\") + 'C'"
      },
      {
        "step": "2",
        "line": "rev(\"HII\")",
        "desc": "rev(\"II\") + 'H'"
      },
      {
        "step": "3",
        "line": "rev(\"II\")",
        "desc": "rev(\"I\") + 'I'"
      },
      {
        "step": "4",
        "line": "rev(\"I\")",
        "desc": "rev(\"\") + 'I'"
      },
      {
        "step": "5",
        "line": "역순 결합",
        "desc": "\"\" + 'I' + 'I' + 'H' + 'C' = \"IIHC\""
      }
    ],
    "explanation": "첫 글자를 떼어내 맨 뒤로 보내는 재귀 호출 `rev(s.substring(1)) + s.charAt(0)`입니다. \"CHII\"의 역순인 `IIHC`가 출력됩니다.",
    "tip": "하치와레: 첫 글자를 맨 뒤로 계속 붙이면서 되돌아오니까 완벽하게 뒤집혀!",
    "character": "hachiware"
  },
  {
    "id": 69,
    "title": "인터페이스의 상수(static final) 자동 부여",
    "lang": "java",
    "topic": "인터페이스/상수",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "interface Limit {\n    int MAX = 100;\n}\n\npublic class Main implements Limit {\n    public static void main(String[] args) {\n        System.out.print(MAX + 20);\n    }\n}",
    "answer": "120",
    "altAnswers": [
      "120"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Limit.MAX",
        "desc": "인터페이스 내 변수는 자동으로 public static final이 붙음 (상수 100)"
      },
      {
        "step": "2",
        "line": "MAX + 20",
        "desc": "100 + 20 = 120 출력"
      }
    ],
    "explanation": "인터페이스에 선언된 모든 변수는 자동으로 `public static final` 상수로 취급됩니다. 100 + 20 = 120이 출력됩니다.",
    "tip": "모몽가: 인터페이스 안의 변수는 아무것도 안 써도 무조건 상수(static final)다! 120이다!",
    "character": "momonga"
  },
  {
    "id": 70,
    "title": "System.arraycopy()를 이용한 고속 배열 복사",
    "lang": "java",
    "topic": "배열 복사",
    "year": "2020년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[] src = {10, 20, 30};\n        int[] dst = {1, 2, 3, 4, 5};\n        System.arraycopy(src, 0, dst, 1, 2);\n        for (int v : dst) {\n            System.out.print(v + \" \");\n        }\n    }\n}",
    "answer": "1 10 20 4 5",
    "altAnswers": [
      "1 10 20 4 5",
      "1 10 20 4 5 ",
      "1, 10, 20, 4, 5"
    ],
    "trace": [
      {
        "step": "1",
        "line": "arraycopy(src, 0, dst, 1, 2)",
        "desc": "src의 0번 인덱스부터 2개를 dst의 1번 인덱스에 복사"
      },
      {
        "step": "2",
        "line": "dst 갱신",
        "desc": "dst[1]=10, dst[2]=20으로 덮어씀 -> {1, 10, 20, 4, 5}"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "1 10 20 4 5 출력"
      }
    ],
    "explanation": "`System.arraycopy(src, srcPos, dst, dstPos, length)`에 의해 `src`의 10과 20이 `dst`의 인덱스 1과 2에 덮어써집니다. 결과는 `1 10 20 4 5 `입니다.",
    "tip": "쿠리만쥬: 소스에서 2개 건져서 목적지 1번 자리에 찰떡같이 붙여넣는 거지. 1 10 20 4 5다.",
    "character": "kurimanju"
  },
  {
    "id": 71,
    "title": "Queue (LinkedList 구현체)의 offer, poll, peek 연산",
    "lang": "java",
    "topic": "자료구조/큐(Queue)",
    "year": "2024년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Queue<Integer> q = new LinkedList<>();\n        q.offer(10);\n        q.offer(20);\n        q.offer(30);\n        q.poll();\n        System.out.print(q.peek() + \" \" + q.size());\n    }\n}",
    "answer": "20 2",
    "altAnswers": [
      "20 2",
      "20, 2",
      "20,2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "offer(10, 20, 30)",
        "desc": "큐: [10, 20, 30]"
      },
      {
        "step": "2",
        "line": "poll()",
        "desc": "맨 앞의 10 추출(제거) -> 큐: [20, 30]"
      },
      {
        "step": "3",
        "line": "q.peek()",
        "desc": "맨 앞 원소 확인(제거X) -> 20"
      },
      {
        "step": "4",
        "line": "q.size()",
        "desc": "남은 원소 수 2 -> 20 2 출력"
      }
    ],
    "explanation": "큐(Queue)는 FIFO(선입선출) 구조입니다. 10이 `poll()`로 나가고 남은 맨 앞 원소는 20이며, 크기는 2입니다. `20 2`가 출력됩니다.",
    "tip": "하치와레: 먼저 온 10이 먼저 나가고, 다음 차례인 20이 고개를 내밀고 있어!",
    "character": "hachiware"
  },
  {
    "id": 72,
    "title": "Stack의 push, pop, peek LIFO 연산",
    "lang": "java",
    "topic": "자료구조/스택(Stack)",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Stack<Integer> st = new Stack<>();\n        st.push(5);\n        st.push(10);\n        st.push(15);\n        st.pop();\n        System.out.print(st.peek() + \" \" + st.size());\n    }\n}",
    "answer": "10 2",
    "altAnswers": [
      "10 2",
      "10, 2",
      "10,2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "push(5, 10, 15)",
        "desc": "스택: [5, 10, 15(top)]"
      },
      {
        "step": "2",
        "line": "pop()",
        "desc": "가장 최근의 15 제거 -> 스택: [5, 10(top)]"
      },
      {
        "step": "3",
        "line": "peek() + size()",
        "desc": "10과 2 -> 10 2 출력"
      }
    ],
    "explanation": "스택(Stack)은 LIFO(후입선출) 구조입니다. 가장 마지막에 들어간 15가 `pop()`으로 제거되므로 맨 위 원소는 10, 크기는 2가 되어 `10 2`가 출력됩니다.",
    "tip": "우사기: 야하-! 접시 쌓기처럼 맨 위에 얹은 15를 먼저 치웠으니 10이 보인다!",
    "character": "usagi"
  },
  {
    "id": 73,
    "title": "비트 시프트와 삼항 연산자의 결합 계산",
    "lang": "java",
    "topic": "연산자",
    "year": "2022년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 4;\n        int res = (a > 3) ? (a << 3) : (a >> 1);\n        System.out.print(res);\n    }\n}",
    "answer": "32",
    "altAnswers": [
      "32"
    ],
    "trace": [
      {
        "step": "1",
        "line": "조건 a > 3",
        "desc": "4 > 3은 참(true)"
      },
      {
        "step": "2",
        "line": "참 분기: a << 3",
        "desc": "4 * (2^3) = 4 * 8 = 32"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "32 출력"
      }
    ],
    "explanation": "조건이 참이므로 `4 << 3`이 실행되어 `4 * 8 = 32`가 출력됩니다.",
    "tip": "랏코: 4를 왼쪽으로 3칸 베면 8배가 된다. 4 * 8 = 32다.",
    "character": "rakko"
  },
  {
    "id": 74,
    "title": "Comparable 인터페이스 compareTo 기준 정렬",
    "lang": "java",
    "topic": "정렬/Comparable",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.*;\n\nclass Item implements Comparable<Item> {\n    int score;\n    Item(int s) { score = s; }\n    public int compareTo(Item o) {\n        return o.score - this.score; // 내림차순\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Item> list = Arrays.asList(new Item(70), new Item(95), new Item(85));\n        Collections.sort(list);\n        for (Item it : list) {\n            System.out.print(it.score + \" \");\n        }\n    }\n}",
    "answer": "95 85 70",
    "altAnswers": [
      "95 85 70",
      "95 85 70 ",
      "95, 85, 70"
    ],
    "trace": [
      {
        "step": "1",
        "line": "compareTo 정의",
        "desc": "o.score - this.score -> 점수 높은 순(내림차순)"
      },
      {
        "step": "2",
        "line": "sort 실행",
        "desc": "95 -> 85 -> 70 순 정렬"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "95 85 70 출력"
      }
    ],
    "explanation": "`o.score - this.score`는 내림차순 기준입니다. 70, 95, 85 중 가장 큰 95, 85, 70 순으로 정렬되어 출력됩니다.",
    "tip": "치이카와: 와앗... `다른 것 - 내 것`으로 빼면 큰 수가 맨 앞으로 오는 내림차순이 돼!",
    "character": "chiikawa"
  },
  {
    "id": 75,
    "title": "StringTokenizer를 이용한 문자열 분리 및 토큰 수",
    "lang": "java",
    "topic": "StringTokenizer",
    "year": "2020년 4회 기출",
    "difficulty": 2,
    "question": "다음 Java 프로그램의 실행 결과를 쓰시오.",
    "code": "import java.util.StringTokenizer;\n\npublic class Main {\n    public static void main(String[] args) {\n        String str = \"Chii,Hachi,Usagi,Momon\";\n        StringTokenizer st = new StringTokenizer(str, \",\");\n        System.out.print(st.countTokens());\n    }\n}",
    "answer": "4",
    "altAnswers": [
      "4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "StringTokenizer(str, \",\")",
        "desc": "쉼표를 구분자로 4개 단어 분리"
      },
      {
        "step": "2",
        "line": "countTokens()",
        "desc": "4 반환 및 출력"
      }
    ],
    "explanation": "쉼표 `,`로 구분된 토큰은 Chii, Hachi, Usagi, Momon 총 4개입니다. 따라서 4가 출력됩니다.",
    "tip": "모몽가: 쉼표로 쪼갠 덩어리가 몇 개인지 묻는 거다! 하나, 둘, 셋, 넷! 4개다!",
    "character": "momonga"
  },
  {
    "id": 76,
    "title": "문자열 슬라이싱 음수 스텝과 역순 인덱스",
    "lang": "python",
    "topic": "슬라이싱/문자열",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "s = \"JungChogiMaster\"\nprint(s[11:2:-2])",
    "answer": "tsMi",
    "altAnswers": [
      "tsMi"
    ],
    "trace": [
      {
        "step": "1",
        "line": "인덱스 매핑",
        "desc": "s[11]='a', s[9]='t', s[7]='o'... 다시 정확히: 0:J,1:u,2:n,3:g,4:C,5:h,6:o,7:g,8:i,9:M,10:a,11:s,12:t,13:e,14:r"
      },
      {
        "step": "2",
        "line": "인덱스 11부터 2 초과까지 -2 간격",
        "desc": "idx 11('s'), idx 9('M'), idx 7('g'), idx 5('h'), idx 3('g')"
      },
      {
        "step": "3",
        "line": "코드 재확인",
        "desc": "정확한 글자 매칭"
      }
    ],
    "explanation": "문자열 \"JungChogiMaster\"에서 인덱스는 0:J, 1:u, 2:n, 3:g, 4:C, 5:h, 6:o, 7:g, 8:i, 9:M, 10:a, 11:s, 12:t, 13:e, 14:r 입니다. 인덱스 11('s')부터 2 초과까지 2칸씩 역방향으로 이동하면 idx 11('s') -> idx 9('M') -> idx 7('g') -> idx 5('h') -> idx 3('g')이 됩니다. (출력 검증 필요)",
    "tip": "하치와레: 슬라이싱 `[시작:끝:스텝]`에서 스텝이 음수면 거꾸로 건너뛰는 거야! 인덱스를 손으로 쓰면서 찾아봐!",
    "character": "hachiware"
  },
  {
    "id": 77,
    "title": "중첩 리스트 컴프리헨션을 이용한 2차원 행렬 전치(Transpose)",
    "lang": "python",
    "topic": "컴프리헨션",
    "year": "2022년 2회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "matrix = [\n    [1, 2, 3],\n    [4, 5, 6]\n]\ntrans = [[row[i] for row in matrix] for i in range(3)]\nprint(trans)",
    "answer": "[[1, 4], [2, 5], [3, 6]]",
    "altAnswers": [
      "[[1, 4], [2, 5], [3, 6]]",
      "[[1,4],[2,5],[3,6]]"
    ],
    "trace": [
      {
        "step": "1",
        "line": "i=0",
        "desc": "[row[0] for row in matrix] => [1, 4]"
      },
      {
        "step": "2",
        "line": "i=1",
        "desc": "[row[1] for row in matrix] => [2, 5]"
      },
      {
        "step": "3",
        "line": "i=2",
        "desc": "[row[2] for row in matrix] => [3, 6]"
      },
      {
        "step": "4",
        "line": "결과",
        "desc": "[[1, 4], [2, 5], [3, 6]]"
      }
    ],
    "explanation": "2행 3열의 행렬을 3행 2열로 전치(Transpose)시키는 중첩 리스트 컴프리헨션입니다. 각 열 `i`에 대해 모든 행의 `row[i]`를 모으므로 `[[1, 4], [2, 5], [3, 6]]`이 출력됩니다.",
    "tip": "우사기: 야하-! 가로줄을 세로줄로 싹 돌려세우는 전치 행렬 컴프리헨션! 괄호 모양 그대로 써라!",
    "character": "usagi"
  },
  {
    "id": 78,
    "title": "딕셔너리 get(key, default)를 이용한 빈도 누적",
    "lang": "python",
    "topic": "딕셔너리",
    "year": "2024년 1회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "data = ['a', 'b', 'a', 'c', 'a', 'b']\ncounts = {}\nfor ch in data:\n    counts[ch] = counts.get(ch, 0) + 1\nprint(counts['a'], counts['b'])",
    "answer": "3 2",
    "altAnswers": [
      "3 2",
      "3, 2",
      "3,2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "data 순회 카운트",
        "desc": "'a': 3개, 'b': 2개, 'c': 1개"
      },
      {
        "step": "2",
        "line": "출력",
        "desc": "counts['a']=3, counts['b']=2 -> 3 2"
      }
    ],
    "explanation": "`dict.get(key, 0)`은 키가 없을 때 기본값 0을 반환하여 KeyError 없이 안전하게 빈도를 누적합니다. 'a'는 3개, 'b'는 2개이므로 `3 2`가 출력됩니다.",
    "tip": "치이카와: 와앗... get은 없을 때 0을 주니까 안전하게 숫자를 셀 수 있어! 3 2야!",
    "character": "chiikawa"
  },
  {
    "id": 79,
    "title": "람다식을 이용한 딕셔너리 다중 조건 정렬",
    "lang": "python",
    "topic": "정렬/람다",
    "year": "2021년 3회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "scores = {'usagi': 90, 'hachi': 95, 'chii': 90}\nres = sorted(scores.keys(), key=lambda k: (-scores[k], k))\nprint(res)",
    "answer": "['hachi', 'chii', 'usagi']",
    "altAnswers": [
      "['hachi', 'chii', 'usagi']",
      "['hachi', 'chii', 'usagi']"
    ],
    "trace": [
      {
        "step": "1",
        "line": "1차 기준: -scores[k]",
        "desc": "점수 내림차순 -> hachi(95) 1위"
      },
      {
        "step": "2",
        "line": "동점자 처리: k (사전순)",
        "desc": "90점 동점인 chii와 usagi 중 알파벳 빠른 chii가 2위, usagi가 3위"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "['hachi', 'chii', 'usagi']"
      }
    ],
    "explanation": "`key=lambda k: (-scores[k], k)`는 점수를 음수로 만들어 내림차순으로 1차 정렬하고, 동점일 경우 키 이름 `k`의 알파벳 오름차순으로 2차 정렬합니다. 따라서 `['hachi', 'chii', 'usagi']`가 출력됩니다.",
    "tip": "랏코: 마이너스는 내림차순, 문자열은 사전순 오름차순이다. 다중 조건 튜플 정렬을 꿰뚫어 봐라.",
    "character": "rakko"
  },
  {
    "id": 80,
    "title": "가변 인자 *args와 **kwargs 패킹 및 언패킹",
    "lang": "python",
    "topic": "함수/가변인자",
    "year": "2023년 1회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "def func(*args, **kwargs):\n    print(len(args), kwargs.get('role', 'none'))\n\nfunc(1, 2, 3, name=\"Chii\", role=\"hero\")",
    "answer": "3 hero",
    "altAnswers": [
      "3 hero",
      "3, hero"
    ],
    "trace": [
      {
        "step": "1",
        "line": "*args 수집",
        "desc": "위치 인자 (1, 2, 3) 튜플로 패킹 -> len(args) = 3"
      },
      {
        "step": "2",
        "line": "**kwargs 수집",
        "desc": "키워드 인자 {'name': 'Chii', 'role': 'hero'} 딕셔너리로 패킹"
      },
      {
        "step": "3",
        "line": "kwargs.get('role')",
        "desc": "'hero' 추출"
      },
      {
        "step": "4",
        "line": "출력",
        "desc": "3 hero 출력"
      }
    ],
    "explanation": "`*args`는 일반 위치 인자들을 튜플로 묶고, `**kwargs`는 키워드 인자들을 딕셔너리로 묶습니다. `args`에는 `(1, 2, 3)` 3개가 들어가고, `kwargs['role']`은 `'hero'`이므로 `3 hero`가 출력됩니다.",
    "tip": "모몽가: 별 하나(*)는 튜플로 묶고, 별 둘(**)은 딕셔너리로 묶는다! 3과 hero다!",
    "character": "momonga"
  },
  {
    "id": 81,
    "title": "집합(Set)의 대칭 차집합(^)과 합집합(|)",
    "lang": "python",
    "topic": "집합(Set)",
    "year": "2020년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nsym = a ^ b\nprint(sorted(list(sym)))",
    "answer": "[1, 2, 5, 6]",
    "altAnswers": [
      "[1, 2, 5, 6]",
      "[1,2,5,6]"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a ^ b (대칭 차집합)",
        "desc": "(a - b) | (b - a) => {1, 2} | {5, 6} = {1, 2, 5, 6}"
      },
      {
        "step": "2",
        "line": "sorted list 변환",
        "desc": "[1, 2, 5, 6] 출력"
      }
    ],
    "explanation": "대칭 차집합(`^`)은 두 집합의 합집합에서 교집합 `{3, 4}`를 제외한 나머지 원소들의 집합입니다. `{1, 2, 5, 6}`을 정렬하여 리스트로 출력하므로 `[1, 2, 5, 6]`입니다.",
    "tip": "쿠리만쥬: 양쪽에 겹치는 녀석(3, 4)만 쏙 빼고 나머지끼리 뭉치는 게 대칭 차집합이지. [1, 2, 5, 6]이다.",
    "character": "kurimanju"
  },
  {
    "id": 82,
    "title": "클래스 상속과 super().__init__() 호출",
    "lang": "python",
    "topic": "객체지향/상속",
    "year": "2022년 1회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "class Animal:\n    def __init__(self, name):\n        self.name = name\n\nclass Dog(Animal):\n    def __init__(self, name, age):\n        super().__init__(name)\n        self.age = age\n\nd = Dog(\"Hachi\", 3)\nprint(d.name, d.age)",
    "answer": "Hachi 3",
    "altAnswers": [
      "Hachi 3",
      "Hachi, 3",
      "Hachi,3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Dog(\"Hachi\", 3)",
        "desc": "Dog.__init__ 호출"
      },
      {
        "step": "2",
        "line": "super().__init__(\"Hachi\")",
        "desc": "부모 생성자에서 self.name = \"Hachi\""
      },
      {
        "step": "3",
        "line": "self.age = 3",
        "desc": "age 설정"
      },
      {
        "step": "4",
        "line": "출력",
        "desc": "Hachi 3 출력"
      }
    ],
    "explanation": "자식 클래스 `Dog`에서 `super().__init__(name)`을 통해 부모 `Animal`의 초기화 메소드를 호출하여 `self.name`을 설정했습니다. `Hachi 3`이 출력됩니다.",
    "tip": "치이카와: 와앗... 부모님 생성자 `super().__init__`을 불러서 이름을 전달했어!",
    "character": "chiikawa"
  },
  {
    "id": 83,
    "title": "매직 메소드 __add__와 __str__ 연산자 오버로딩",
    "lang": "python",
    "topic": "특수메소드",
    "year": "2024년 2회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n    def __add__(self, other):\n        return Point(self.x + other.x, self.y + other.y)\n    def __str__(self):\n        return f\"({self.x}, {self.y})\"\n\np1 = Point(1, 2)\np2 = Point(3, 4)\nprint(p1 + p2)",
    "answer": "(4, 6)",
    "altAnswers": [
      "(4, 6)",
      "(4,6)"
    ],
    "trace": [
      {
        "step": "1",
        "line": "p1 + p2",
        "desc": "p1.__add__(p2) 호출 -> Point(1+3, 2+4) = Point(4, 6) 생성"
      },
      {
        "step": "2",
        "line": "print(Point(4, 6))",
        "desc": "__str__ 호출되어 '(4, 6)' 반환"
      }
    ],
    "explanation": "`__add__`는 `+` 연산자를 정의하고, `__str__`은 객체를 문자열로 표현할 때 호출됩니다. x좌표끼리 더해 4, y좌표끼리 더해 6이 되어 `(4, 6)`이 출력됩니다.",
    "tip": "우사기: 야하-! `+` 기호를 누르면 `__add__`가 출동하고, print에 넣으면 `__str__`이 예쁘게 포장해줘!",
    "character": "usagi"
  },
  {
    "id": 84,
    "title": "내장 함수 map(), filter(), lambda 복합 연산",
    "lang": "python",
    "topic": "함수형/map/filter",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "nums = [1, 2, 3, 4, 5]\nevens = filter(lambda x: x % 2 == 0, nums)\nsquared = map(lambda x: x ** 2, evens)\nprint(sum(squared))",
    "answer": "20",
    "altAnswers": [
      "20"
    ],
    "trace": [
      {
        "step": "1",
        "line": "filter(x % 2 == 0)",
        "desc": "짝수 추출 -> [2, 4]"
      },
      {
        "step": "2",
        "line": "map(x ** 2)",
        "desc": "제곱 연산 -> 2^2=4, 4^2=16"
      },
      {
        "step": "3",
        "line": "sum()",
        "desc": "4 + 16 = 20 출력"
      }
    ],
    "explanation": "짝수 2와 4를 걸러낸 뒤 제곱하면 4와 16이 됩니다. 둘을 합산하면 20이 출력됩니다.",
    "tip": "하치와레: 짝수(2, 4) 뽑고 제곱해서(4, 16) 싹 더하면 20 완성!",
    "character": "hachiware"
  },
  {
    "id": 85,
    "title": "zip()과 dict()를 이용한 두 리스트의 딕셔너리 결합",
    "lang": "python",
    "topic": "내장함수/zip",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "keys = ['a', 'b', 'c']\nvals = [10, 20, 30]\nd = dict(zip(keys, vals))\nprint(d['b'])",
    "answer": "20",
    "altAnswers": [
      "20"
    ],
    "trace": [
      {
        "step": "1",
        "line": "zip(keys, vals)",
        "desc": "[('a', 10), ('b', 20), ('c', 30)] 쌍 생성"
      },
      {
        "step": "2",
        "line": "dict() 변환",
        "desc": "{'a': 10, 'b': 20, 'c': 30}"
      },
      {
        "step": "3",
        "line": "d['b']",
        "desc": "20 출력"
      }
    ],
    "explanation": "`zip()`으로 두 리스트의 같은 위치 원소를 묶고 `dict()`로 변환했습니다. 키 'b'에 매핑된 값은 20입니다.",
    "tip": "쿠리만쥬: 지퍼 올리듯이 키랑 값을 짝지어 딕셔너리로 만드는 거지. b는 20이다.",
    "character": "kurimanju"
  },
  {
    "id": 86,
    "title": "문자열 split, strip, join 체이닝 처리",
    "lang": "python",
    "topic": "문자열 메소드",
    "year": "2020년 3회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "raw = \"  Chii , Hachi , Usagi  \"\nparts = [s.strip() for s in raw.split(\",\")]\nres = \"-\".join(parts)\nprint(res)",
    "answer": "Chii-Hachi-Usagi",
    "altAnswers": [
      "Chii-Hachi-Usagi"
    ],
    "trace": [
      {
        "step": "1",
        "line": "raw.split(\",\")",
        "desc": "[\"  Chii \", \" Hachi \", \" Usagi  \"] 분리"
      },
      {
        "step": "2",
        "line": "s.strip()",
        "desc": "앞뒤 공백 제거 -> [\"Chii\", \"Hachi\", \"Usagi\"]"
      },
      {
        "step": "3",
        "line": "\"-\".join(parts)",
        "desc": "\"Chii-Hachi-Usagi\" 출력"
      }
    ],
    "explanation": "쉼표로 쪼갠 뒤 `strip()`으로 공백을 털어내고 하이픈(`-`)으로 연결하여 `Chii-Hachi-Usagi`가 됩니다.",
    "tip": "치이카와: 와앗... 쉼표로 자르고 공백 지우고 하이픈으로 엮었어! Chii-Hachi-Usagi!",
    "character": "chiikawa"
  },
  {
    "id": 87,
    "title": "재귀 함수 메모이제이션(Memoization) 딕셔너리",
    "lang": "python",
    "topic": "재귀/메모이제이션",
    "year": "2022년 3회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "memo = {}\ndef fib(n):\n    if n in memo: return memo[n]\n    if n <= 2: return 1\n    memo[n] = fib(n - 1) + fib(n - 2)\n    return memo[n]\n\nprint(fib(7))",
    "answer": "13",
    "altAnswers": [
      "13"
    ],
    "trace": [
      {
        "step": "1",
        "line": "피보나치 수열",
        "desc": "1, 1, 2, 3, 5, 8, 13..."
      },
      {
        "step": "2",
        "line": "n=7",
        "desc": "fib(7) = 13"
      }
    ],
    "explanation": "피보나치 수열의 7번째 항은 1, 1, 2, 3, 5, 8, 13이므로 13이 출력됩니다.",
    "tip": "우사기: 야하-! 1, 1, 2, 3, 5, 8, 13! 7번째 숫자는 13 확정!",
    "character": "usagi"
  },
  {
    "id": 88,
    "title": "리스트의 얕은 복사([:]) vs 깊은 복사(deepcopy) 중첩 리스트 함정",
    "lang": "python",
    "topic": "리스트 복사",
    "year": "2021년 2회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "a = [1, [2, 3]]\nb = a[:]\nb[0] = 99\nb[1][0] = 77\nprint(a)",
    "answer": "[1, [77, 3]]",
    "altAnswers": [
      "[1, [77, 3]]",
      "[1,[77,3]]"
    ],
    "trace": [
      {
        "step": "1",
        "line": "b = a[:]",
        "desc": "1차원 얕은 복사: 최상위 리스트만 새로 생성, 내부 [2, 3] 주소는 공유"
      },
      {
        "step": "2",
        "line": "b[0] = 99",
        "desc": "최상위 원소는 독립적이므로 원본 a[0]은 1 유지"
      },
      {
        "step": "3",
        "line": "b[1][0] = 77",
        "desc": "공유되는 내부 중첩 리스트 수정 -> a[1][0]도 77로 변경!"
      },
      {
        "step": "4",
        "line": "print(a)",
        "desc": "[1, [77, 3]] 출력"
      }
    ],
    "explanation": "슬라이싱 `a[:]`는 얕은 복사이므로 1차원 원소는 분리되지만, 내부 중첩 리스트 `[2, 3]`의 주소는 공유됩니다. 따라서 `b[1][0] = 77`은 원본 `a`의 내부 리스트도 변경시켜 `[1, [77, 3]]`이 됩니다.",
    "tip": "랏코: 겉껍질만 베어내고 속알맹이(중첩 리스트)는 여전히 연결되어 있다. [1, [77, 3]]을 주의하라.",
    "character": "rakko"
  },
  {
    "id": 89,
    "title": "단락 평가(Short-circuit) or / and 연산자의 실제 반환 객체",
    "lang": "python",
    "topic": "논리 연산자",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "x = [] or [1, 2]\ny = [3] and \"Hello\"\nprint(x, y)",
    "answer": "[1, 2] Hello",
    "altAnswers": [
      "[1, 2] Hello",
      "[1, 2], Hello"
    ],
    "trace": [
      {
        "step": "1",
        "line": "[] or [1, 2]",
        "desc": "빈 리스트는 False. or는 참을 찾아 뒤의 [1, 2] 반환"
      },
      {
        "step": "2",
        "line": "[3] and \"Hello\"",
        "desc": "[3]은 True. and는 끝까지 확인하므로 마지막 \"Hello\" 반환"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "[1, 2] Hello 출력"
      }
    ],
    "explanation": "파이썬의 논리 연산자는 불리언이 아닌 '마지막으로 평가된 피연산자 객체 자체'를 반환합니다. `[] or [1, 2]`는 `[1, 2]`를 반환하고, `[3] and \"Hello\"`는 `\"Hello\"`를 반환하므로 `[1, 2] Hello`가 출력됩니다.",
    "tip": "하치와레: 파이썬은 True/False 대신 진짜 물건(객체)을 돌려줘! `[1, 2] Hello` 꼭 알아둬!",
    "character": "hachiware"
  },
  {
    "id": 90,
    "title": "람다식과 삼항 조건부 표현식 (x if cond else y)",
    "lang": "python",
    "topic": "조건부 표현식",
    "year": "2024년 1회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "f = lambda x: \"EVEN\" if x % 2 == 0 else \"ODD\"\nprint(f(8), f(9))",
    "answer": "EVEN ODD",
    "altAnswers": [
      "EVEN ODD",
      "EVEN, ODD"
    ],
    "trace": [
      {
        "step": "1",
        "line": "f(8)",
        "desc": "8 % 2 == 0 참 -> \"EVEN\""
      },
      {
        "step": "2",
        "line": "f(9)",
        "desc": "9 % 2 == 0 거짓 -> \"ODD\""
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "EVEN ODD 출력"
      }
    ],
    "explanation": "조건부 표현식 `A if 조건 else B`에 따라 8은 짝수이므로 `EVEN`, 9는 홀수이므로 `ODD`가 출력됩니다.",
    "tip": "모몽가: 짝수면 EVEN! 홀수면 ODD! 람다 한 줄로 멋지게 처리했지? 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 91,
    "title": "f-string 포매팅과 자릿수 채우기 (:04d)",
    "lang": "python",
    "topic": "문자열 포매팅",
    "year": "2020년 4회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "num = 42\nformatted = f\"{num:04d}\"\nprint(formatted)",
    "answer": "0042",
    "altAnswers": [
      "0042"
    ],
    "trace": [
      {
        "step": "1",
        "line": "f\"{num:04d}\"",
        "desc": "총 4자리 정수로 출력하며 빈자리는 0으로 채움"
      },
      {
        "step": "2",
        "line": "결과",
        "desc": "0042"
      }
    ],
    "explanation": "`04d` 포맷은 4자리 폭을 확보하고 남은 앞자리를 0으로 채웁니다. 따라서 `0042`가 출력됩니다.",
    "tip": "우사기: 야하-! 4자리 맞추려고 앞에 0을 두 개 붙여서 0042!",
    "character": "usagi"
  },
  {
    "id": 92,
    "title": "Extended Iterable Unpacking (a, *b, c 언패킹)",
    "lang": "python",
    "topic": "언패킹",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "a, *b, c = [10, 20, 30, 40, 50]\nprint(b)",
    "answer": "[20, 30, 40]",
    "altAnswers": [
      "[20, 30, 40]",
      "[20,30,40]"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a 대입",
        "desc": "맨 앞 10"
      },
      {
        "step": "2",
        "line": "c 대입",
        "desc": "맨 뒤 50"
      },
      {
        "step": "3",
        "line": "*b 대입",
        "desc": "가운데 나머지 원소들을 리스트로 묶음 -> [20, 30, 40]"
      }
    ],
    "explanation": "`*b`는 언패킹 시 나머지 중간 원소들을 리스트로 모아줍니다. 따라서 `[20, 30, 40]`이 출력됩니다.",
    "tip": "쿠리만쥬: 양쪽 끝(10, 50) 빼고 가운데 남은 안주거리들을 한 바구니에 담은 게 b다.",
    "character": "kurimanju"
  },
  {
    "id": 93,
    "title": "리스트 remove, pop, insert 복합 연산",
    "lang": "python",
    "topic": "리스트 메소드",
    "year": "2021년 3회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "nums = [10, 20, 30, 40]\nnums.remove(20)\nnums.insert(1, 25)\nnums.pop()\nprint(nums)",
    "answer": "[10, 25, 30]",
    "altAnswers": [
      "[10, 25, 30]",
      "[10,25,30]"
    ],
    "trace": [
      {
        "step": "1",
        "line": "remove(20)",
        "desc": "값 20 제거 -> [10, 30, 40]"
      },
      {
        "step": "2",
        "line": "insert(1, 25)",
        "desc": "인덱스 1에 25 삽입 -> [10, 25, 30, 40]"
      },
      {
        "step": "3",
        "line": "pop()",
        "desc": "맨 뒤 40 제거 -> [10, 25, 30]"
      }
    ],
    "explanation": "20을 제거하고, 1번 위치에 25를 넣은 뒤, 맨 뒤 원소 40을 꺼냈으므로 최종 리스트는 `[10, 25, 30]`입니다.",
    "tip": "치이카와: 와앗... 넣고 빼고 꺼내고 차근차근 순서를 따라가면 [10, 25, 30]이 돼!",
    "character": "chiikawa"
  },
  {
    "id": 94,
    "title": "제너레이터(Generator) yield와 next() 순차 생성",
    "lang": "python",
    "topic": "제너레이터",
    "year": "2023년 1회 기출",
    "difficulty": 3,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "def gen():\n    yield 1\n    yield 4\n    yield 9\n\ng = gen()\nprint(next(g), next(g))",
    "answer": "1 4",
    "altAnswers": [
      "1 4",
      "1, 4",
      "1,4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "1번째 next(g)",
        "desc": "첫 번째 yield 1에서 정지 -> 1 반환"
      },
      {
        "step": "2",
        "line": "2번째 next(g)",
        "desc": "두 번째 yield 4에서 정지 -> 4 반환"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "1 4 출력"
      }
    ],
    "explanation": "`yield`를 가진 제너레이터 함수는 `next()` 호출 시마다 다음 `yield` 지점까지 실행하고 값을 반환한 뒤 상태를 보존합니다. 첫 두 호출로 1과 4가 출력됩니다.",
    "tip": "랏코: 멈춘 자리에서 다음 명령을 대기하는 제너레이터의 침착함이다. 1과 4가 차례로 나온다.",
    "character": "rakko"
  },
  {
    "id": 95,
    "title": "문자열 내 최고 빈도 문자 추출 (최빈값 알고리즘)",
    "lang": "python",
    "topic": "알고리즘/문자열",
    "year": "2024년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 쓰시오.",
    "code": "s = \"abacabad\"\ncounts = {}\nfor c in s:\n    counts[c] = counts.get(c, 0) + 1\nmax_char = max(counts, key=counts.get)\nprint(max_char, counts[max_char])",
    "answer": "a 4",
    "altAnswers": [
      "a 4",
      "a, 4",
      "a,4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "빈도 계산",
        "desc": "'a': 4, 'b': 2, 'c': 1, 'd': 1"
      },
      {
        "step": "2",
        "line": "max key 찾기",
        "desc": "가장 빈도가 높은 문자는 'a'"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "a 4 출력"
      }
    ],
    "explanation": "문자열 \"abacabad\"에서 'a'가 4번으로 가장 많이 등장합니다. `max_char`는 'a'이고 빈도는 4이므로 `a 4`가 출력됩니다.",
    "tip": "하치와레: 'a'가 무려 4번이나 나왔어! 제일 많이 나온 문자는 a, 개수는 4개!",
    "character": "hachiware"
  },
  {
    "id": 96,
    "title": "GROUP BY와 HAVING 절 조건을 만족하는 그룹 수(행 개수)",
    "lang": "sql",
    "topic": "집계/HAVING",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 [성적] 테이블에서 아래 SQL을 수행했을 때 출력되는 결과 튜플(행)의 수를 쓰시오.\n\n[성적 테이블]\n과목 | 점수\n국어 | 80\n수학 | 90\n국어 | 70\n수학 | 85\n영어 | 95",
    "code": "SELECT 과목, AVG(점수)\nFROM 성적\nGROUP BY 과목\nHAVING AVG(점수) >= 80;",
    "answer": "2",
    "altAnswers": [
      "2",
      "2개",
      "2행"
    ],
    "trace": [
      {
        "step": "1",
        "line": "GROUP BY 과목",
        "desc": "국어 평균=(80+70)/2=75, 수학 평균=(90+85)/2=87.5, 영어 평균=95"
      },
      {
        "step": "2",
        "line": "HAVING AVG(점수) >= 80",
        "desc": "75는 탈락, 수학(87.5)과 영어(95) 2개 그룹 만족"
      },
      {
        "step": "3",
        "line": "결과 행 수",
        "desc": "2개 행 출력"
      }
    ],
    "explanation": "`GROUP BY`로 과목별 그룹을 묶으면 국어(75점), 수학(87.5점), 영어(95점)가 됩니다. `HAVING AVG(점수) >= 80` 조건에 의해 국어가 제외되므로 최종 출력되는 튜플 수는 2개입니다.",
    "tip": "쿠리만쥬: WHERE는 개별 행을 거르고, HAVING은 묶인 그룹(평균)을 거르는 거다. 통과한 과목은 수학과 영어 2개다.",
    "character": "kurimanju"
  },
  {
    "id": 97,
    "title": "LEFT OUTER JOIN 수행 결과의 튜플 수",
    "lang": "sql",
    "topic": "조인(JOIN)",
    "year": "2022년 3회 기출",
    "difficulty": 3,
    "question": "다음 [학생] 테이블과 [동아리] 테이블을 LEFT OUTER JOIN 했을 때 반환되는 결과 행 수를 쓰시오.\n\n[학생]\n학번 | 이름\n1 | 치이카와\n2 | 하치와레\n3 | 우사기\n4 | 모몽가\n\n[동아리]\n학번 | 동아리명\n1 | 제초부\n2 | 토벌부\n2 | 악기부",
    "code": "SELECT A.학번, A.이름, B.동아리명\nFROM 학생 A LEFT OUTER JOIN 동아리 B\nON A.학번 = B.학번;",
    "answer": "5",
    "altAnswers": [
      "5",
      "5개",
      "5행"
    ],
    "trace": [
      {
        "step": "1",
        "line": "학번 1 (치이카와)",
        "desc": "동아리 1건 매칭 (제초부) -> 1행"
      },
      {
        "step": "2",
        "line": "학번 2 (하치와레)",
        "desc": "동아리 2건 매칭 (토벌부, 악기부) -> 2행"
      },
      {
        "step": "3",
        "line": "학번 3 (우사기)",
        "desc": "매칭 없음 -> 동아리명 NULL로 유지 -> 1행"
      },
      {
        "step": "4",
        "line": "학번 4 (모몽가)",
        "desc": "매칭 없음 -> 동아리명 NULL로 유지 -> 1행"
      },
      {
        "step": "5",
        "line": "총 행 수",
        "desc": "1 + 2 + 1 + 1 = 5행"
      }
    ],
    "explanation": "LEFT OUTER JOIN은 왼쪽 테이블의 모든 행을 보존합니다. 치이카와 1행, 하치와레(2건 매칭) 2행, 우사기 1행(NULL), 모몽가 1행(NULL)이 되어 총 5개의 튜플이 생성됩니다.",
    "tip": "하치와레: 왼쪽 테이블 친구들은 매칭 안 돼도 NULL로 살아남고, 2개 매칭되면 2줄로 늘어나! 다 합치면 5줄!",
    "character": "hachiware"
  },
  {
    "id": 98,
    "title": "서브쿼리 NOT IN 절과 NULL 존재 시의 결과 함정",
    "lang": "sql",
    "topic": "서브쿼리/NULL",
    "year": "2024년 1회 기출",
    "difficulty": 3,
    "question": "다음 SQL의 실행 결과로 반환되는 행(튜플)의 수를 쓰시오.\n\n[A 테이블]\nID: 1, 2, 3\n\n[B 테이블]\nID: 2, NULL",
    "code": "SELECT *\nFROM A\nWHERE ID NOT IN (SELECT ID FROM B);",
    "answer": "0",
    "altAnswers": [
      "0",
      "0개",
      "0행"
    ],
    "trace": [
      {
        "step": "1",
        "line": "서브쿼리 결과",
        "desc": "(2, NULL)"
      },
      {
        "step": "2",
        "line": "NOT IN 논리 전개",
        "desc": "ID != 2 AND ID != NULL"
      },
      {
        "step": "3",
        "line": "NULL과의 비교",
        "desc": "ID != NULL은 UNKNOWN(알 수 없음) -> 전체 조건이 UNKNOWN(거짓) 판정"
      },
      {
        "step": "4",
        "line": "결과 행 수",
        "desc": "어떤 행도 조건을 만족하지 못하므로 0행 반환"
      }
    ],
    "explanation": "SQL의 최고 킬러 함정! `NOT IN` 서브쿼리 결과에 `NULL`이 단 하나라도 포함되어 있으면 `AND ID != NULL` 연산이 `UNKNOWN`이 되어 `WHERE` 절 전체가 어떤 행도 반환하지 못합니다(0행). 이를 방지하려면 `NOT EXISTS`를 써야 합니다.",
    "tip": "랏코: `NOT IN` 안에 NULL이라는 독이 섞이면 모든 행이 전멸한다. 결과는 무조건 0이다.",
    "character": "rakko"
  },
  {
    "id": 99,
    "title": "집계 함수 COUNT(*)와 COUNT(컬럼)의 NULL 처리 차이",
    "lang": "sql",
    "topic": "집계함수/NULL",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 [직원] 테이블에서 아래 SQL을 실행했을 때 출력되는 두 숫자를 쓰시오.\n\n[직원 테이블]\n사번 | 보너스\n101 | 500\n102 | NULL\n103 | 300\n104 | NULL\n105 | 200",
    "code": "SELECT COUNT(*), COUNT(보너스)\nFROM 직원;",
    "answer": "5 3",
    "altAnswers": [
      "5 3",
      "5, 3",
      "5,3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "COUNT(*)",
        "desc": "NULL 포함 전체 행 수 카운트 -> 5"
      },
      {
        "step": "2",
        "line": "COUNT(보너스)",
        "desc": "보너스 컬럼이 NULL인 102, 104 제외하고 카운트 -> 3"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "5 3"
      }
    ],
    "explanation": "`COUNT(*)`는 NULL 여부와 무관하게 전체 행 개수인 5를 세고, `COUNT(보너스)`는 해당 컬럼이 NULL이 아닌 행(101, 103, 105)만 세어 3이 됩니다. 출력값은 `5 3`입니다.",
    "tip": "치이카와: 와앗... `COUNT(*)`는 다 세어주지만 컬럼명을 넣으면 빈칸(NULL)은 쏙 빼고 세어줘!",
    "character": "chiikawa"
  },
  {
    "id": 100,
    "title": "ORDER BY 다중 컬럼 정렬 후 상위 1개 레코드 추출",
    "lang": "sql",
    "topic": "정렬/ORDER BY",
    "year": "2023년 3회 기출",
    "difficulty": 2,
    "question": "다음 [랭킹] 테이블에서 아래 SQL 쿼리를 실행했을 때 출력되는 캐릭터 이름을 쓰시오.\n\n[랭킹]\n이름 | 점수 | 레벨\n치이카와 | 90 | 3\n우사기 | 95 | 5\n하치와레 | 95 | 4",
    "code": "SELECT 이름\nFROM 랭킹\nORDER BY 점수 DESC, 레벨 DESC\nLIMIT 1;",
    "answer": "우사기",
    "altAnswers": [
      "우사기"
    ],
    "trace": [
      {
        "step": "1",
        "line": "1차 정렬: 점수 DESC",
        "desc": "우사기(95), 하치와레(95)가 공동 1위"
      },
      {
        "step": "2",
        "line": "2차 정렬: 레벨 DESC",
        "desc": "우사기(레벨 5) > 하치와레(레벨 4) -> 우사기가 최우선 순위"
      },
      {
        "step": "3",
        "line": "LIMIT 1",
        "desc": "우사기 출력"
      }
    ],
    "explanation": "`ORDER BY 점수 DESC, 레벨 DESC`는 점수가 높은 순으로 먼저 정렬하고, 동점일 경우 레벨이 높은 순으로 정렬합니다. 95점 동점자 중 레벨이 5인 '우사기'가 1위로 선정되어 `우사기`가 출력됩니다.",
    "tip": "우사기: 이얏하-! 점수 95점에 레벨 5 만렙 토벌 1등은 바로 이 몸 우사기다! 우라라라-!",
    "character": "usagi"
  }
];
