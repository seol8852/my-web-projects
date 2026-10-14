// 치이카와 정처기 실기 코딩 마스터 100제 전체 데이터베이스
// C언어(1~35), Java(36~75), Python(76~95), SQL/자료구조(96~100)

const QUESTIONS_DATA = [
  {
    "id": 1,
    "title": "포인터 기초와 역참조 연산",
    "lang": "c",
    "topic": "포인터/배열",
    "year": "2020년 1회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 10;\n    int *p = &a;\n    *p = *p + 20;\n    printf(\"%d\", a);\n    return 0;\n}",
    "answer": "30",
    "altAnswers": [
      "30"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int a = 10;",
        "desc": "변수 a에 10 저장 (메모리 주소 할당)"
      },
      {
        "step": "2",
        "line": "int *p = &a;",
        "desc": "포인터 변수 p가 변수 a의 메모리 주소를 가리킴"
      },
      {
        "step": "3",
        "line": "*p = *p + 20;",
        "desc": "*p(즉, a의 값 10)에 20을 더해 30을 a에 대입"
      },
      {
        "step": "4",
        "line": "printf(\"%d\", a);",
        "desc": "변수 a의 값 30 출력"
      }
    ],
    "explanation": "포인터 p는 변수 a의 주소를 저장하고 있으므로, `*p`를 통해 a의 메모리 공간에 직접 접근합니다. `*p = *p + 20;`을 수행하면 a의 값이 10에서 30으로 변경됩니다.",
    "tip": "하치와레: 포인터 앞의 `*`는 그 주소에 든 진짜 값을 가리키는 거니까, *p를 바꾸면 a도 함께 바뀌는 거야!",
    "character": "hachiware"
  },
  {
    "id": 2,
    "title": "포인터 증가 연산자(*p++ vs (*p)++)",
    "lang": "c",
    "topic": "포인터/배열",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {10, 20, 30};\n    int *p = arr;\n    (*p)++;\n    p++;\n    printf(\"%d %d\", arr[0], *p);\n    return 0;\n}",
    "answer": "11 20",
    "altAnswers": [
      "11 20",
      "11, 20",
      "11,20"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int *p = arr;",
        "desc": "p는 arr[0]의 주소를 가리킴 (초깃값 10)"
      },
      {
        "step": "2",
        "line": "(*p)++;",
        "desc": "p가 가리키는 arr[0]의 값을 1 증가시킴 (10 -> 11)"
      },
      {
        "step": "3",
        "line": "p++;",
        "desc": "포인터 p를 다음 원소(arr[1])의 주소로 1칸 이동"
      },
      {
        "step": "4",
        "line": "printf(\"%d %d\", arr[0], *p);",
        "desc": "arr[0]은 11, *p는 arr[1]의 값 20 출력"
      }
    ],
    "explanation": "괄호가 있는 `(*p)++`는 p가 가리키는 대상의 '값'을 1 증가시키므로 `arr[0]`이 11이 됩니다. 그 후 `p++`는 '포인터 주소' 자체를 다음 요소인 `arr[1]`로 이동시키므로 `*p`는 20이 됩니다.",
    "tip": "우사기: 우라! 괄호의 유무가 핵심이라구! (*p)++는 값 증가, *p++는 주소 이동 후 이전 값 참조!",
    "character": "usagi"
  },
  {
    "id": 3,
    "title": "1차원 배열과 포인터 덧셈 연산",
    "lang": "c",
    "topic": "포인터/배열",
    "year": "2020년 2회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[5] = {10, 20, 30, 40, 50};\n    int *p = arr + 2;\n    printf(\"%d\", *(p + 1));\n    return 0;\n}",
    "answer": "40",
    "altAnswers": [
      "40"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int *p = arr + 2;",
        "desc": "p는 arr의 시작점(인덱스 0)에서 2칸 뒤인 arr[2](30)을 가리킴"
      },
      {
        "step": "2",
        "line": "*(p + 1)",
        "desc": "p(인덱스 2)에서 다시 1칸 뒤인 arr[3](40)의 값을 역참조"
      }
    ],
    "explanation": "`arr + 2`는 `&arr[2]`와 같으므로 p는 인덱스 2를 가리킵니다. 여기에 다시 `p + 1`을 하면 인덱스 3을 가리키게 되며, `*(p + 1)`은 `arr[3]`의 값인 40이 출력됩니다.",
    "tip": "치이카와: 와앗... 포인터 덧셈은 배열 인덱스를 더하는 거랑 똑같아...!",
    "character": "chiikawa"
  },
  {
    "id": 4,
    "title": "2차원 배열과 이중 포인터 연산",
    "lang": "c",
    "topic": "포인터/배열",
    "year": "2022년 1회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a[2][3] = {{1, 2, 3}, {4, 5, 6}};\n    printf(\"%d\", *(*(a + 1) + 2));\n    return 0;\n}",
    "answer": "6",
    "altAnswers": [
      "6"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a + 1",
        "desc": "2차원 배열 a의 1번 행(2번째 행 {4, 5, 6})의 시작 주소"
      },
      {
        "step": "2",
        "line": "*(a + 1)",
        "desc": "1번 행의 첫 번째 원소 a[1][0]의 주소 (&a[1][0])"
      },
      {
        "step": "3",
        "line": "*(a + 1) + 2",
        "desc": "1번 행에서 2칸 오른쪽으로 이동한 a[1][2]의 주소"
      },
      {
        "step": "4",
        "line": "*(*(a + 1) + 2)",
        "desc": "a[1][2]의 실제 값 역참조 -> 6"
      }
    ],
    "explanation": "2차원 배열에서 `*(*(a + i) + j)`는 `a[i][j]`와 정확히 일치합니다. 따라서 `*(*(a + 1) + 2)`는 `a[1][2]`를 의미하므로 값은 6입니다.",
    "tip": "랏코: 침착해라. 공식 하나만 외우자! `*(*(a + i) + j) == a[i][j]`! i행 j열 원소를 뜻해! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 5,
    "title": "2차원 배열 포인터 변수 선언과 활용",
    "lang": "c",
    "topic": "포인터/배열",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[2][3] = {10, 20, 30, 40, 50, 60};\n    int (*p)[3] = arr;\n    printf(\"%d\", p[1][1]);\n    return 0;\n}",
    "answer": "50",
    "altAnswers": [
      "50"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int (*p)[3] = arr;",
        "desc": "p는 열 크기가 3인 2차원 배열을 가리키는 배열 포인터"
      },
      {
        "step": "2",
        "line": "p[1][1]",
        "desc": "arr[1][1]의 값에 접근 -> 50"
      }
    ],
    "explanation": "`int (*p)[3]`은 열의 개수가 3개인 배열을 가리키는 포인터입니다. 따라서 `p[1][1]`은 2차원 배열의 1행 1열 원소인 50을 가리킵니다.",
    "tip": "모몽가: 이얏하-! (*p)[3]은 괄호가 있어서 배열 포인터고, *p[3]은 포인터 배열이야! 헷갈리지 마! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 6,
    "title": "문자열 포인터 이동과 출력",
    "lang": "c",
    "topic": "문자열",
    "year": "2020년 3회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    char *str = \"CHIIKAWA\";\n    printf(\"%s\", str + 3);\n    return 0;\n}",
    "answer": "IKAWA",
    "altAnswers": [
      "IKAWA"
    ],
    "trace": [
      {
        "step": "1",
        "line": "char *str = \"CHIIKAWA\";",
        "desc": "str[0]='C', str[1]='H', str[2]='I', str[3]='I', str[4]='K', ..."
      },
      {
        "step": "2",
        "line": "printf(\"%s\", str + 3);",
        "desc": "인덱스 3(두 번째 'I')부터 문자열 끝('\\0')까지 출력"
      }
    ],
    "explanation": "`%s`는 전달된 주소부터 널 문자(`\\0`)를 만날 때까지 문자를 계속 출력합니다. `str + 3`은 문자열의 4번째 글자인 'I'의 주소이므로 'IKAWA'가 출력됩니다.",
    "tip": "치이카와: 0:C, 1:H, 2:I, 3:I ... 3칸 건너뛰면 'IKAWA'가 나와!",
    "character": "chiikawa"
  },
  {
    "id": 7,
    "title": "버블 정렬(Bubble Sort) 알고리즘",
    "lang": "c",
    "topic": "알고리즘",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a[4] = {4, 1, 3, 2};\n    int temp;\n    for (int i = 0; i < 3; i++) {\n        for (int j = 0; j < 3 - i; j++) {\n            if (a[j] > a[j + 1]) {\n                temp = a[j];\n                a[j] = a[j + 1];\n                a[j + 1] = temp;\n            }\n        }\n    }\n    printf(\"%d %d %d %d\", a[0], a[1], a[2], a[3]);\n    return 0;\n}",
    "answer": "1 2 3 4",
    "altAnswers": [
      "1 2 3 4",
      "1, 2, 3, 4",
      "1,2,3,4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "i=0 1회전 완료",
        "desc": "인접 원소 비교 교환 후 최대값 4가 맨 뒤로 이동 -> {1, 3, 2, 4}"
      },
      {
        "step": "2",
        "line": "i=1 2회전 완료",
        "desc": "비교 교환 후 3이 뒤로 이동 -> {1, 2, 3, 4}"
      },
      {
        "step": "3",
        "line": "정렬 완료",
        "desc": "오름차순 정렬 완료: 1 2 3 4 출력"
      }
    ],
    "explanation": "인접한 두 원소를 비교하여 큰 값을 오른쪽으로 이동시키는 전형적인 버블 정렬(Bubble Sort) 코드입니다. 실행 결과 배열이 오름차순으로 정렬되어 `1 2 3 4`가 출력됩니다.",
    "tip": "하치와레: 거품이 보글보글 떠오르듯 가장 큰 수가 맨 뒤로 가는 버블 정렬이야!",
    "character": "hachiware"
  },
  {
    "id": 8,
    "title": "선택 정렬(Selection Sort) 코드 분석",
    "lang": "c",
    "topic": "알고리즘",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int arr[] = {35, 12, 89, 45};\n    int min_idx, temp;\n    for (int i = 0; i < 3; i++) {\n        min_idx = i;\n        for (int j = i + 1; j < 4; j++) {\n            if (arr[j] < arr[min_idx])\n                min_idx = j;\n        }\n        temp = arr[i];\n        arr[i] = arr[min_idx];\n        arr[min_idx] = temp;\n    }\n    printf(\"%d\", arr[2]);\n    return 0;\n}",
    "answer": "45",
    "altAnswers": [
      "45"
    ],
    "trace": [
      {
        "step": "1",
        "line": "i=0 회전",
        "desc": "최솟값 12를 0번 인덱스와 교환 -> {12, 35, 89, 45}"
      },
      {
        "step": "2",
        "line": "i=1 회전",
        "desc": "인덱스 1~3 중 최솟값 35 -> 교환 없음 {12, 35, 89, 45}"
      },
      {
        "step": "3",
        "line": "i=2 회전",
        "desc": "인덱스 2~3 중 최솟값 45와 89 교환 -> {12, 35, 45, 89}"
      },
      {
        "step": "4",
        "line": "arr[2] 출력",
        "desc": "인덱스 2의 값은 45"
      }
    ],
    "explanation": "선택 정렬을 통해 전체 배열이 오름차순 `{12, 35, 45, 89}`로 정렬됩니다. 문제에서 `arr[2]`를 출력하므로 세 번째 값인 45가 정답입니다.",
    "tip": "쿠리만쥬: 크으-! 정렬 후 특정 인덱스를 묻는 함정 문제니까 arr[2]인지 전체인지 끝까지 잘 봐야 해!",
    "character": "kurimanju"
  },
  {
    "id": 9,
    "title": "문자열 역순 뒤집기(Reverse String)",
    "lang": "c",
    "topic": "문자열",
    "year": "2023년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char str[] = \"HELLO\";\n    int len = strlen(str);\n    for (int i = len - 1; i >= 0; i--) {\n        printf(\"%c\", str[i]);\n    }\n    return 0;\n}",
    "answer": "OLLEH",
    "altAnswers": [
      "OLLEH"
    ],
    "trace": [
      {
        "step": "1",
        "line": "len = strlen(str);",
        "desc": "str의 길이 len은 5"
      },
      {
        "step": "2",
        "line": "i=4부터 0까지 감소",
        "desc": "str[4]='O', str[3]='L', str[2]='L', str[1]='E', str[0]='H' 출력"
      }
    ],
    "explanation": "문자열의 마지막 인덱스 `len - 1`부터 0까지 역순으로 한 문자씩 출력하므로 'HELLO'가 거꾸로 뒤집혀 'OLLEH'가 출력됩니다.",
    "tip": "치이카와: 글자 수가 5개니까 4번째 방부터 거꾸로 읽으면 돼!",
    "character": "chiikawa"
  },
  {
    "id": 10,
    "title": "회문(Palindrome) 판별 함수",
    "lang": "c",
    "topic": "알고리즘",
    "year": "2024년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint isPalin(char *s) {\n    int len = strlen(s);\n    for (int i = 0; i < len / 2; i++) {\n        if (s[i] != s[len - 1 - i])\n            return 0;\n    }\n    return 1;\n}\n\nint main() {\n    printf(\"%d %d\", isPalin(\"LEVEL\"), isPalin(\"ROBOT\"));\n    return 0;\n}",
    "answer": "1 0",
    "altAnswers": [
      "1 0",
      "1, 0",
      "1,0"
    ],
    "trace": [
      {
        "step": "1",
        "line": "isPalin(\"LEVEL\")",
        "desc": "s[0]=='L'==s[4], s[1]=='E'==s[3] -> 모두 일치하여 1 반환"
      },
      {
        "step": "2",
        "line": "isPalin(\"ROBOT\")",
        "desc": "s[0]=='R' != s[4]=='T' -> 불일치하여 0 반환"
      }
    ],
    "explanation": "회문(앞뒤로 읽어도 똑같은 단어)을 검사하는 함수입니다. 'LEVEL'은 회문이므로 1, 'ROBOT'은 아니므로 0을 반환하여 `1 0`이 출력됩니다.",
    "tip": "우사기: 토마토, 기러기, LEVEL! 앞뒤 똑같으면 1! 다르면 0!",
    "character": "usagi"
  },
  {
    "id": 11,
    "title": "재귀 함수: 팩토리얼(Factorial)",
    "lang": "c",
    "topic": "재귀함수",
    "year": "2020년 2회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint fact(int n) {\n    if (n <= 1) return 1;\n    return n * fact(n - 1);\n}\n\nint main() {\n    printf(\"%d\", fact(4));\n    return 0;\n}",
    "answer": "24",
    "altAnswers": [
      "24"
    ],
    "trace": [
      {
        "step": "1",
        "line": "fact(4)",
        "desc": "4 * fact(3)"
      },
      {
        "step": "2",
        "line": "fact(3)",
        "desc": "3 * fact(2)"
      },
      {
        "step": "3",
        "line": "fact(2)",
        "desc": "2 * fact(1)"
      },
      {
        "step": "4",
        "line": "fact(1)",
        "desc": "n <= 1 이므로 1 반환 -> 4 * 3 * 2 * 1 = 24"
      }
    ],
    "explanation": "팩토리얼을 구하는 전형적인 재귀함수입니다. `fact(4) = 4 * 3 * 2 * 1 = 24`가 계산되어 출력됩니다.",
    "tip": "하치와레: 재귀 함수는 기저 조건(탈출 조건) n <= 1 일 때 멈춘다는 걸 꼭 확인해봐야 해!",
    "character": "hachiware"
  },
  {
    "id": 12,
    "title": "재귀 함수: 피보나치 수열",
    "lang": "c",
    "topic": "재귀함수",
    "year": "2021년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint fibo(int n) {\n    if (n == 0) return 0;\n    if (n == 1) return 1;\n    return fibo(n - 1) + fibo(n - 2);\n}\n\nint main() {\n    printf(\"%d\", fibo(5));\n    return 0;\n}",
    "answer": "5",
    "altAnswers": [
      "5"
    ],
    "trace": [
      {
        "step": "1",
        "line": "fibo(0)=0, fibo(1)=1",
        "desc": "기저 조건"
      },
      {
        "step": "2",
        "line": "fibo(2) = 0 + 1 = 1",
        "desc": "n=2"
      },
      {
        "step": "3",
        "line": "fibo(3) = 1 + 1 = 2",
        "desc": "n=3"
      },
      {
        "step": "4",
        "line": "fibo(4) = 1 + 2 = 3",
        "desc": "n=4"
      },
      {
        "step": "5",
        "line": "fibo(5) = 2 + 3 = 5",
        "desc": "n=5 결과 도출"
      }
    ],
    "explanation": "피보나치 수열: 0, 1, 1, 2, 3, 5, 8, ... 에서 n=5일 때의 값은 5입니다.",
    "tip": "치이카와: 앞의 두 수를 더해서 다음 수를 만드는 피보나치 수열이야!",
    "character": "chiikawa"
  },
  {
    "id": 13,
    "title": "재귀 함수를 이용한 2진수 변환 출력",
    "lang": "c",
    "topic": "재귀함수",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nvoid toBin(int n) {\n    if (n == 0) return;\n    toBin(n / 2);\n    printf(\"%d\", n % 2);\n}\n\nint main() {\n    toBin(13);\n    return 0;\n}",
    "answer": "1101",
    "altAnswers": [
      "1101"
    ],
    "trace": [
      {
        "step": "1",
        "line": "toBin(13)",
        "desc": "toBin(6) 호출 후 13 % 2 = 1 대기"
      },
      {
        "step": "2",
        "line": "toBin(6)",
        "desc": "toBin(3) 호출 후 6 % 2 = 0 대기"
      },
      {
        "step": "3",
        "line": "toBin(3)",
        "desc": "toBin(1) 호출 후 3 % 2 = 1 대기"
      },
      {
        "step": "4",
        "line": "toBin(1)",
        "desc": "toBin(0) 호출 후 1 % 2 = 1 대기"
      },
      {
        "step": "5",
        "line": "toBin(0)",
        "desc": "return (종료)"
      },
      {
        "step": "6",
        "line": "출력 복귀",
        "desc": "호출 스택에서 되돌아오며 1 -> 1 -> 0 -> 1 순서로 출력: 1101"
      }
    ],
    "explanation": "재귀 호출 `toBin(n / 2)`가 `printf`보다 먼저 실행되므로, 스택에 쌓였다가 가장 깊은 곳부터 거꾸로 빠져나오며 출력됩니다. 13의 2진수인 `1101`이 출력됩니다.",
    "tip": "랏코: 침착해라. printf가 재귀 호출 뒤에 있으면 스택의 역순(LIFO)으로 출력된다는 점이 중요해! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 14,
    "title": "재귀 함수의 반환값 누적 계산",
    "lang": "c",
    "topic": "재귀함수",
    "year": "2023년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint fn(int n) {\n    if (n <= 1) return 2;\n    return fn(n - 1) + 3;\n}\n\nint main() {\n    printf(\"%d\", fn(4));\n    return 0;\n}",
    "answer": "11",
    "altAnswers": [
      "11"
    ],
    "trace": [
      {
        "step": "1",
        "line": "fn(1) = 2",
        "desc": "기저 조건"
      },
      {
        "step": "2",
        "line": "fn(2) = fn(1) + 3 = 2 + 3 = 5",
        "desc": "n=2"
      },
      {
        "step": "3",
        "line": "fn(3) = fn(2) + 3 = 5 + 3 = 8",
        "desc": "n=3"
      },
      {
        "step": "4",
        "line": "fn(4) = fn(3) + 3 = 8 + 3 = 11",
        "desc": "n=4"
      }
    ],
    "explanation": "`fn(1) = 2`, `fn(2) = 5`, `fn(3) = 8`, `fn(4) = 11`로 공차가 3인 등차수열 형태의 재귀식입니다. 결과는 11입니다.",
    "tip": "모몽가: 이얏하-! 하나씩 단계별로 적어 내려가면 절대 틀리지 않아! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 15,
    "title": "구조체 멤버 접근 연산자 (. 과 ->)",
    "lang": "c",
    "topic": "구조체",
    "year": "2020년 1회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nstruct Student {\n    char name[10];\n    int score;\n};\n\nint main() {\n    struct Student s = {\"Hachi\", 95};\n    struct Student *p = &s;\n    p->score += 5;\n    printf(\"%s %d\", p->name, s.score);\n    return 0;\n}",
    "answer": "Hachi 100",
    "altAnswers": [
      "Hachi 100",
      "Hachi, 100",
      "Hachi,100"
    ],
    "trace": [
      {
        "step": "1",
        "line": "struct Student s = {\"Hachi\", 95};",
        "desc": "name='Hachi', score=95 초기화"
      },
      {
        "step": "2",
        "line": "struct Student *p = &s;",
        "desc": "구조체 포인터 p가 s를 가리킴"
      },
      {
        "step": "3",
        "line": "p->score += 5;",
        "desc": "포인터 화살표 연산자로 score를 95에서 100으로 증가"
      },
      {
        "step": "4",
        "line": "printf(\"%s %d\", p->name, s.score);",
        "desc": "Hachi 100 출력"
      }
    ],
    "explanation": "구조체 변수 자체는 점(`.`) 연산자로 접근하고, 구조체 포인터는 화살표(`->`) 연산자로 접근합니다. `p->score += 5`로 인해 `s.score`가 100이 됩니다.",
    "tip": "하치와레: 포인터는 화살표(->), 일반 변수는 점(.)! 95점에서 5점 올라 100점 만점!",
    "character": "hachiware"
  },
  {
    "id": 16,
    "title": "구조체 배열과 필드 합계 계산",
    "lang": "c",
    "topic": "구조체",
    "year": "2022년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nstruct Item {\n    char name[10];\n    int price;\n};\n\nint main() {\n    struct Item list[3] = {\n        {\"Candy\", 100},\n        {\"Cookie\", 250},\n        {\"Cake\", 500}\n    };\n    int total = 0;\n    for (int i = 0; i < 3; i++) {\n        total += list[i].price;\n    }\n    printf(\"%d\", total);\n    return 0;\n}",
    "answer": "850",
    "altAnswers": [
      "850"
    ],
    "trace": [
      {
        "step": "1",
        "line": "total += list[0].price (100)",
        "desc": "total = 100"
      },
      {
        "step": "2",
        "line": "total += list[1].price (250)",
        "desc": "total = 350"
      },
      {
        "step": "3",
        "line": "total += list[2].price (500)",
        "desc": "total = 850"
      }
    ],
    "explanation": "구조체 배열 `list`의 각 원소의 `price`를 누적 합산합니다. 100 + 250 + 500 = 850입니다.",
    "tip": "치이카와: 사탕, 쿠키, 케이크 가격을 다 더하면 850원!",
    "character": "chiikawa"
  },
  {
    "id": 17,
    "title": "단일 연결 리스트(Linked List) 노드 순회",
    "lang": "c",
    "topic": "구조체",
    "year": "2023년 2회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nstruct Node {\n    int val;\n    struct Node *next;\n};\n\nint main() {\n    struct Node a = {10, NULL};\n    struct Node b = {20, NULL};\n    struct Node c = {30, NULL};\n    a.next = &b;\n    b.next = &c;\n\n    struct Node *curr = &a;\n    int sum = 0;\n    while (curr != NULL) {\n        sum += curr->val;\n        curr = curr->next;\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "60",
    "altAnswers": [
      "60"
    ],
    "trace": [
      {
        "step": "1",
        "line": "curr = &a",
        "desc": "curr->val(10) 더함, curr = &b로 이동 (sum=10)"
      },
      {
        "step": "2",
        "line": "curr = &b",
        "desc": "curr->val(20) 더함, curr = &c로 이동 (sum=30)"
      },
      {
        "step": "3",
        "line": "curr = &c",
        "desc": "curr->val(30) 더함, curr = NULL로 이동 (sum=60)"
      },
      {
        "step": "4",
        "line": "curr == NULL",
        "desc": "while문 탈출 후 sum=60 출력"
      }
    ],
    "explanation": "자기 참조 구조체를 이용한 연결 리스트 순회 코드입니다. a -> b -> c 노드를 순서대로 방문하며 10 + 20 + 30을 누적하여 60을 출력합니다.",
    "tip": "랏코: 침착해라. next 포인터를 타고 기차놀이 하듯 다음 노드로 쭉 이동하는 거야! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 18,
    "title": "비트 AND, OR, XOR 논리 연산자",
    "lang": "c",
    "topic": "비트연산",
    "year": "2020년 4회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 12; // 0000 1100\n    int b = 10; // 0000 1010\n    int c = a ^ b;\n    printf(\"%d\", c);\n    return 0;\n}",
    "answer": "6",
    "altAnswers": [
      "6"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a = 12 (1100)",
        "desc": "2진수 표현"
      },
      {
        "step": "2",
        "line": "b = 10 (1010)",
        "desc": "2진수 표현"
      },
      {
        "step": "3",
        "line": "a ^ b (XOR)",
        "desc": "서로 다르면 1, 같으면 0 -> 0110 (2진수)"
      },
      {
        "step": "4",
        "line": "10진수 변환",
        "desc": "0110(2) = 4 + 2 = 6"
      }
    ],
    "explanation": "`^`는 비트 XOR(배타적 논리합) 연산자로, 두 비트가 서로 다를 때만 1이 됩니다. `1100 ^ 1010 = 0110`이며 10진수로 6입니다.",
    "tip": "우사기: XOR은 다르면 1, 같으면 0! 4 + 2 = 6!",
    "character": "usagi"
  },
  {
    "id": 19,
    "title": "비트 시프트 연산자 (<< 와 >>)",
    "lang": "c",
    "topic": "비트연산",
    "year": "2021년 2회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int y = (x << 2) + (x >> 1);\n    printf(\"%d\", y);\n    return 0;\n}",
    "answer": "22",
    "altAnswers": [
      "22"
    ],
    "trace": [
      {
        "step": "1",
        "line": "x << 2",
        "desc": "5를 왼쪽으로 2비트 시프트 (5 * 2^2 = 5 * 4 = 20)"
      },
      {
        "step": "2",
        "line": "x >> 1",
        "desc": "5를 오른쪽으로 1비트 시프트 (5 / 2 = 2)"
      },
      {
        "step": "3",
        "line": "(x << 2) + (x >> 1)",
        "desc": "20 + 2 = 22"
      }
    ],
    "explanation": "`x << 2`는 x에 $2^2=4$를 곱한 20이 되고, `x >> 1`은 x를 2로 나눈 몫인 2가 됩니다. 따라서 20 + 2 = 22가 출력됩니다.",
    "tip": "하치와레: 왼쪽 시프트 `<< n`은 2의 n제곱 곱하기! 오른쪽 `>> n`은 나누기!",
    "character": "hachiware"
  },
  {
    "id": 20,
    "title": "비트 NOT(~)과 2의 보수 연산",
    "lang": "c",
    "topic": "비트연산",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 15;\n    printf(\"%d\", ~a);\n    return 0;\n}",
    "answer": "-16",
    "altAnswers": [
      "-16"
    ],
    "trace": [
      {
        "step": "1",
        "line": "~a",
        "desc": "비트 반전 연산 (1의 보수)"
      },
      {
        "step": "2",
        "line": "2의 보수 공식",
        "desc": "~x = -(x + 1) 이므로 ~15 = -(15 + 1) = -16"
      }
    ],
    "explanation": "비트 NOT 연산자 `~`는 모든 비트를 반전시킵니다. 2의 보수 체계에서 정수 x에 대한 `~x`의 결과는 항상 `-(x + 1)`입니다. 따라서 `~15 = -16`입니다.",
    "tip": "쿠리만쥬: 비트 반전 공식 `~x = -(x + 1)`은 무조건 암기해둬야 시험장에서 3초 만에 푼다구!",
    "character": "kurimanju"
  },
  {
    "id": 21,
    "title": "switch-case 문의 break 생략 (Fall-through 함정)",
    "lang": "c",
    "topic": "제어문",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int n = 2;\n    int sum = 0;\n    switch (n) {\n        case 1: sum += 10;\n        case 2: sum += 20;\n        case 3: sum += 30;\n        default: sum += 40;\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "90",
    "altAnswers": [
      "90"
    ],
    "trace": [
      {
        "step": "1",
        "line": "case 2 진입",
        "desc": "n=2이므로 case 2로 점프 -> sum += 20 (sum=20)"
      },
      {
        "step": "2",
        "line": "case 3 통과 (break 없음)",
        "desc": "break가 없으므로 아래로 계속 실행 -> sum += 30 (sum=50)"
      },
      {
        "step": "3",
        "line": "default 통과",
        "desc": "sum += 40 (sum=90)"
      }
    ],
    "explanation": "switch문에서 `break`가 없으면 일치하는 case부터 시작하여 아래에 있는 모든 case와 default까지 연쇄적으로 실행(fall-through)됩니다. 따라서 20 + 30 + 40 = 90이 됩니다.",
    "tip": "쿠리만쥬: 크으-! break가 없으면 멈추지 않고 아래로 쏟아져 내려가! 정처기 실기 단골 함정이야! 한 모금 마시고 집중해서 풀자구.",
    "character": "kurimanju"
  },
  {
    "id": 22,
    "title": "static 정적 변수 누적값",
    "lang": "c",
    "topic": "변수영역",
    "year": "2020년 3회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nvoid counter() {\n    static int cnt = 0;\n    cnt += 5;\n    printf(\"%d \", cnt);\n}\n\nint main() {\n    counter();\n    counter();\n    counter();\n    return 0;\n}",
    "answer": "5 10 15",
    "altAnswers": [
      "5 10 15",
      "5, 10, 15",
      "5 10 15 "
    ],
    "trace": [
      {
        "step": "1",
        "line": "첫 번째 counter() 호출",
        "desc": "cnt 초기화(0) 후 5 증가 -> 5 출력"
      },
      {
        "step": "2",
        "line": "두 번째 counter() 호출",
        "desc": "static이므로 기존 값(5) 유지, 5 증가 -> 10 출력"
      },
      {
        "step": "3",
        "line": "세 번째 counter() 호출",
        "desc": "기존 값(10) 유지, 5 증가 -> 15 출력"
      }
    ],
    "explanation": "`static` 변수는 프로그램 시작 시 한 번만 초기화되며 함수가 끝나도 메모리에서 사라지지 않고 값이 유지됩니다. 따라서 매 호출마다 5씩 누적되어 `5 10 15 `가 출력됩니다.",
    "tip": "치이카와: static은 함수가 끝나도 죽지 않고 살아남는 끈질긴 친구야!",
    "character": "chiikawa"
  },
  {
    "id": 23,
    "title": "전위(++x)와 후위(x++) 증감 연산자",
    "lang": "c",
    "topic": "연산자",
    "year": "2023년 1회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int x = 5;\n    int y = ++x + x++;\n    printf(\"%d %d\", x, y);\n    return 0;\n}",
    "answer": "7 12",
    "altAnswers": [
      "7 12",
      "7, 12",
      "7,12"
    ],
    "trace": [
      {
        "step": "1",
        "line": "++x",
        "desc": "먼저 x를 1 증가시켜 6으로 만듦"
      },
      {
        "step": "2",
        "line": "x++",
        "desc": "현재 값 6을 연산에 사용하고, 연산 후 x를 7로 증가"
      },
      {
        "step": "3",
        "line": "y 계산",
        "desc": "y = 6 + 6 = 12"
      },
      {
        "step": "4",
        "line": "최종 출력",
        "desc": "x는 7, y는 12"
      }
    ],
    "explanation": "`++x`는 먼저 1 증가되어 6이 됩니다. `x++`는 현재 값인 6을 덧셈에 제공하고 나서 7로 증가합니다. 따라서 `y = 6 + 6 = 12`, 연산 후 `x = 7`이 됩니다.",
    "tip": "모몽가: 하-앗! 앞++는 먼저 올리고, 뒤++는 나중에 올린다! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 24,
    "title": "삼항 조건 연산자 중첩",
    "lang": "c",
    "topic": "연산자",
    "year": "2021년 3회 기출",
    "difficulty": 1,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 10, b = 20, c = 15;\n    int max = (a > b) ? ((a > c) ? a : c) : ((b > c) ? b : c);\n    printf(\"%d\", max);\n    return 0;\n}",
    "answer": "20",
    "altAnswers": [
      "20"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a > b 평가",
        "desc": "10 > 20 은 거짓(False)"
      },
      {
        "step": "2",
        "line": "거짓 분기 (b > c) ? b : c",
        "desc": "20 > 15 는 참(True)이므로 b 선택"
      },
      {
        "step": "3",
        "line": "결과",
        "desc": "max = 20"
      }
    ],
    "explanation": "중첩된 삼항 연산자로 세 수 a, b, c 중 최댓값을 구하는 식입니다. `a > b`가 거짓이므로 오른쪽 식 `(b > c ? b : c)`가 실행되어 20이 반환됩니다.",
    "tip": "하치와레: `조건 ? 참 : 거짓` 구조만 괄호 단위로 차근차근 쪼개보면 쉬워!",
    "character": "hachiware"
  },
  {
    "id": 25,
    "title": "전처리기 매크로 함수 (#define 괄호 누락 함정)",
    "lang": "c",
    "topic": "매크로",
    "year": "2022년 2회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n#define SQUARE(x) x * x\n\nint main() {\n    int a = 2;\n    int res = SQUARE(a + 3);\n    printf(\"%d\", res);\n    return 0;\n}",
    "answer": "11",
    "altAnswers": [
      "11"
    ],
    "trace": [
      {
        "step": "1",
        "line": "매크로 치환",
        "desc": "SQUARE(a + 3) 은 단순 텍스트 치환되어 `a + 3 * a + 3` 이 됨"
      },
      {
        "step": "2",
        "line": "연산자 우선순위 적용",
        "desc": "곱셈(*)이 먼저 계산: 2 + (3 * 2) + 3"
      },
      {
        "step": "3",
        "line": "계산 완료",
        "desc": "2 + 6 + 3 = 11"
      }
    ],
    "explanation": "매크로는 괄호 없이 단순 문자열 치환됩니다. `(2 + 3) * (2 + 3) = 25`가 아니라, `2 + 3 * 2 + 3`으로 전개되어 연산자 우선순위에 의해 `2 + 6 + 3 = 11`이 됩니다.",
    "tip": "랏코: 침착해라. 크으-! 매크로에 괄호가 없으면 단순 치환돼서 25가 아니라 11이 나오는 레전드 함정이지! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 26,
    "title": "C언어 문자열 함수(strlen, strcpy, strcat)",
    "lang": "c",
    "topic": "문자열",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[20] = \"CHII\";\n    char s2[] = \"KAWA\";\n    strcat(s1, s2);\n    printf(\"%lu\", strlen(s1));\n    return 0;\n}",
    "answer": "8",
    "altAnswers": [
      "8"
    ],
    "trace": [
      {
        "step": "1",
        "line": "strcat(s1, s2);",
        "desc": "s1 뒤에 s2를 이어붙임 -> s1은 \"CHIIKAWA\""
      },
      {
        "step": "2",
        "line": "strlen(s1);",
        "desc": "\"CHIIKAWA\"의 글자 수(널문자 제외)는 8글자"
      }
    ],
    "explanation": "`strcat` 함수는 첫 번째 문자열 뒤에 두 번째 문자열을 덧붙입니다. 결과인 `CHIIKAWA`의 길이는 8이므로 8이 출력됩니다.",
    "tip": "치이카와: CHII(4글자) + KAWA(4글자) = 8글자!",
    "character": "chiikawa"
  },
  {
    "id": 27,
    "title": "C언어 문자열 비교 strcmp 함수",
    "lang": "c",
    "topic": "문자열",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s1[] = \"apple\";\n    char s2[] = \"banana\";\n    if (strcmp(s1, s2) < 0) {\n        printf(\"A\");\n    } else {\n        printf(\"B\");\n    }\n    return 0;\n}",
    "answer": "A",
    "altAnswers": [
      "A"
    ],
    "trace": [
      {
        "step": "1",
        "line": "strcmp(s1, s2)",
        "desc": "첫 글자 'a'(97)와 'b'(98) 비교 -> 97 - 98 = -1 (음수)"
      },
      {
        "step": "2",
        "line": "조건문 평가",
        "desc": "-1 < 0 은 참이므로 \"A\" 출력"
      }
    ],
    "explanation": "`strcmp(s1, s2)`는 사전순으로 s1이 앞서면 음수(<0), 같으면 0, 뒤면 양수(>0)를 반환합니다. 'apple'이 'banana'보다 사전상 앞서므로 음수가 되어 'A'가 출력됩니다.",
    "tip": "하치와레: 사전에서 앞에 나오는 단어 빼기 뒤에 나오는 단어는 음수(-)! 기억해둬!",
    "character": "hachiware"
  },
  {
    "id": 28,
    "title": "2차원 배열 대각선 원소 합계",
    "lang": "c",
    "topic": "포인터/배열",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int m[3][3] = {\n        {1, 2, 3},\n        {4, 5, 6},\n        {7, 8, 9}\n    };\n    int sum = 0;\n    for (int i = 0; i < 3; i++) {\n        sum += m[i][i];\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "15",
    "altAnswers": [
      "15"
    ],
    "trace": [
      {
        "step": "1",
        "line": "i=0",
        "desc": "m[0][0] = 1 더함 (sum=1)"
      },
      {
        "step": "2",
        "line": "i=1",
        "desc": "m[1][1] = 5 더함 (sum=6)"
      },
      {
        "step": "3",
        "line": "i=2",
        "desc": "m[2][2] = 9 더함 (sum=15)"
      }
    ],
    "explanation": "주 대각선 원소 `m[0][0]`, `m[1][1]`, `m[2][2]`를 합산합니다. 1 + 5 + 9 = 15입니다.",
    "tip": "우사기: 대각선 원소 1, 5, 9를 쏙쏙 뽑아서 더해주면 15!",
    "character": "usagi"
  },
  {
    "id": 29,
    "title": "소수(Prime Number) 판별 알고리즘",
    "lang": "c",
    "topic": "알고리즘",
    "year": "2020년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint isPrime(int n) {\n    if (n <= 1) return 0;\n    for (int i = 2; i * i <= n; i++) {\n        if (n % i == 0) return 0;\n    }\n    return 1;\n}\n\nint main() {\n    int cnt = 0;\n    for (int i = 1; i <= 10; i++) {\n        if (isPrime(i)) cnt++;\n    }\n    printf(\"%d\", cnt);\n    return 0;\n}",
    "answer": "4",
    "altAnswers": [
      "4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "1부터 10까지 검사",
        "desc": "1은 제외, 2(소수), 3(소수), 4(합성수), 5(소수), 6(합성수), 7(소수), 8(합성수), 9(합성수), 10(합성수)"
      },
      {
        "step": "2",
        "line": "소수 개수 카운트",
        "desc": "2, 3, 5, 7 총 4개"
      }
    ],
    "explanation": "1부터 10 사이의 소수는 2, 3, 5, 7로 총 4개입니다. 따라서 `cnt`는 4가 됩니다.",
    "tip": "하치와레: 1은 소수가 아니라는 점! 10 이하의 소수는 2, 3, 5, 7 4개야!",
    "character": "hachiware"
  },
  {
    "id": 30,
    "title": "유클리드 호제법 (최대공약수 GCD)",
    "lang": "c",
    "topic": "알고리즘",
    "year": "2021년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint gcd(int a, int b) {\n    while (b != 0) {\n        int r = a % b;\n        a = b;\n        b = r;\n    }\n    return a;\n}\n\nint main() {\n    printf(\"%d\", gcd(24, 18));\n    return 0;\n}",
    "answer": "6",
    "altAnswers": [
      "6"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a=24, b=18",
        "desc": "r = 24 % 18 = 6 -> a=18, b=6"
      },
      {
        "step": "2",
        "line": "a=18, b=6",
        "desc": "r = 18 % 6 = 0 -> a=6, b=0"
      },
      {
        "step": "3",
        "line": "b == 0 종료",
        "desc": "a=6 반환"
      }
    ],
    "explanation": "유클리드 호제법을 사용한 최대공약수 구하기입니다. 24와 18의 최대공약수는 6입니다.",
    "tip": "치이카와: 나누어떨어질 때까지 나머지를 계속 나누는 유클리드 호제법이야!",
    "character": "chiikawa"
  },
  {
    "id": 31,
    "title": "논리 연산자의 단락 평가 (Short-circuit Evaluation)",
    "lang": "c",
    "topic": "연산자",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int a = 0;\n    int b = 5;\n    if (a && ++b) {\n        b += 10;\n    }\n    printf(\"%d %d\", a, b);\n    return 0;\n}",
    "answer": "0 5",
    "altAnswers": [
      "0 5",
      "0, 5",
      "0,5"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a && ++b",
        "desc": "a가 0(거짓)이므로 단락 평가에 의해 뒤의 ++b는 아예 실행되지 않음!"
      },
      {
        "step": "2",
        "line": "if문 진입 실패",
        "desc": "조건 거짓으로 바디 건너뜀"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "a=0, b=5 유지"
      }
    ],
    "explanation": "AND(`&&`) 연산에서 앞의 피연산자가 거짓(0)이면 뒤의 식은 계산조차 하지 않는 '단락 평가'가 발생합니다. 따라서 `++b`가 실행되지 않아 b는 5 그대로 유지됩니다.",
    "tip": "랏코: 침착해라. 앞이 0(거짓)이면 뒤는 쳐다보지도 않아! ++b가 실행 안 되는 게 포인트! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 32,
    "title": "다중 루프와 break/continue 제어 흐름",
    "lang": "c",
    "topic": "제어문",
    "year": "2024년 2회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    int sum = 0;\n    for (int i = 1; i <= 5; i++) {\n        if (i % 2 == 0) continue;\n        if (i > 3) break;\n        sum += i;\n    }\n    printf(\"%d\", sum);\n    return 0;\n}",
    "answer": "4",
    "altAnswers": [
      "4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "i=1",
        "desc": "continue x, break x -> sum += 1 (sum=1)"
      },
      {
        "step": "2",
        "line": "i=2",
        "desc": "2 % 2 == 0 이므로 continue (건너뜀)"
      },
      {
        "step": "3",
        "line": "i=3",
        "desc": "continue x, break x -> sum += 3 (sum=4)"
      },
      {
        "step": "4",
        "line": "i=4",
        "desc": "4 % 2 == 0 이므로 continue"
      },
      {
        "step": "5",
        "line": "i=5",
        "desc": "5 > 3 이므로 break (반복 종료)"
      }
    ],
    "explanation": "i=1일 때 sum에 1 더함, i=2는 continue, i=3일 때 sum에 3 더함 (sum=4), i=4는 continue, i=5는 `i > 3`에 걸려 break로 루프 탈출. 최종 sum은 4입니다.",
    "tip": "모몽가: continue는 다음 바퀴로 점프! break는 루프 탈출! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 33,
    "title": "함수 포인터(Function Pointer) 호출",
    "lang": "c",
    "topic": "포인터/배열",
    "year": "2022년 3회 기출",
    "difficulty": 3,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint add(int a, int b) { return a + b; }\nint mul(int a, int b) { return a * b; }\n\nint main() {\n    int (*fp)(int, int) = add;\n    int res1 = fp(3, 4);\n    fp = mul;\n    int res2 = fp(3, 4);\n    printf(\"%d\", res1 + res2);\n    return 0;\n}",
    "answer": "19",
    "altAnswers": [
      "19"
    ],
    "trace": [
      {
        "step": "1",
        "line": "fp = add;",
        "desc": "res1 = fp(3, 4) = 3 + 4 = 7"
      },
      {
        "step": "2",
        "line": "fp = mul;",
        "desc": "res2 = fp(3, 4) = 3 * 4 = 12"
      },
      {
        "step": "3",
        "line": "res1 + res2",
        "desc": "7 + 12 = 19"
      }
    ],
    "explanation": "함수 포인터 `fp`가 `add`를 가리킬 때는 7을 반환하고, `mul`을 가리킬 때는 12를 반환합니다. 둘의 합은 7 + 12 = 19입니다.",
    "tip": "랏코: 침착해라. 포인터가 함수도 가리킬 수 있어! fp(3,4)가 add였다가 mul로 바뀌는 걸 확인해봐! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 34,
    "title": "포인터 배열과 문자열 참조",
    "lang": "c",
    "topic": "포인터/배열",
    "year": "2023년 1회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nint main() {\n    char *arr[] = {\"Cat\", \"Dog\", \"Rabbit\"};\n    printf(\"%c%c\", arr[1][0], arr[2][2]);\n    return 0;\n}",
    "answer": "Db",
    "altAnswers": [
      "Db"
    ],
    "trace": [
      {
        "step": "1",
        "line": "arr[1][0]",
        "desc": "arr[1]은 \"Dog\" -> 그 중 0번째 글자는 'D'"
      },
      {
        "step": "2",
        "line": "arr[2][2]",
        "desc": "arr[2]는 \"Rabbit\" -> 0:R, 1:a, 2:b -> 2번째 글자는 'b'"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "\"Db\" 출력"
      }
    ],
    "explanation": "`arr[1]`은 두 번째 문자열 'Dog'이고 `arr[1][0]`은 'D'입니다. `arr[2]`는 세 번째 문자열 'Rabbit'이고 `arr[2][2]`는 'b'입니다. 따라서 'Db'가 출력됩니다.",
    "tip": "치이카와: Dog에서 D를 고르고, Rabbit에서 세 번째 글자 b를 고르면 Db가 돼!",
    "character": "chiikawa"
  },
  {
    "id": 35,
    "title": "공용체(Union)의 메모리 공유 원리",
    "lang": "c",
    "topic": "구조체",
    "year": "2021년 3회 기출",
    "difficulty": 2,
    "question": "다음 C 프로그램의 실행 결과를 쓰시오.",
    "code": "#include <stdio.h>\n\nunion Data {\n    int i;\n    char c;\n};\n\nint main() {\n    union Data d;\n    d.i = 0x1234;\n    d.c = 0x56;\n    printf(\"%x\", d.c);\n    return 0;\n}",
    "answer": "56",
    "altAnswers": [
      "56",
      "0x56"
    ],
    "trace": [
      {
        "step": "1",
        "line": "union Data d;",
        "desc": "i와 c가 같은 메모리 시작 공간을 공유"
      },
      {
        "step": "2",
        "line": "d.c = 0x56;",
        "desc": "가장 하위 1바이트에 0x56 덮어씀"
      },
      {
        "step": "3",
        "line": "printf(\"%x\", d.c);",
        "desc": "d.c 값인 56 출력"
      }
    ],
    "explanation": "공용체(`union`)는 모든 멤버가 동일한 메모리 공간을 공유합니다. `d.c`에 `0x56`을 대입했으므로 `d.c`를 16진수로 출력하면 56이 출력됩니다.",
    "tip": "쿠리만쥬: 크으-! 구조체는 따로따로 방을 쓰지만, 공용체는 한 방을 같이 써! 한 모금 마시고 집중해서 풀자구.",
    "character": "kurimanju"
  },
  {
    "id": 36,
    "title": "자바 상속과 생성자 호출 순서 (super)",
    "lang": "java",
    "topic": "상속/다형성",
    "year": "2020년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Parent {\n    Parent() {\n        System.out.print(\"P \");\n    }\n}\n\nclass Child extends Parent {\n    Child() {\n        System.out.print(\"C \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Child c = new Child();\n    }\n}",
    "answer": "P C",
    "altAnswers": [
      "P C",
      "P C "
    ],
    "trace": [
      {
        "step": "1",
        "line": "new Child()",
        "desc": "자식 생성자 호출"
      },
      {
        "step": "2",
        "line": "super() 자동 호출",
        "desc": "자식 생성자 첫 줄에서 부모 생성자 Parent() 먼저 호출되어 'P ' 출력"
      },
      {
        "step": "3",
        "line": "Child() 본체 실행",
        "desc": "'C ' 출력"
      }
    ],
    "explanation": "자식 클래스의 생성자가 호출될 때 첫 줄에 `super()`가 생략되어 있어 부모 생성자가 먼저 실행됩니다. 따라서 'P C '가 출력됩니다.",
    "tip": "하치와레: 부모가 먼저 태어나고 자식이 태어나는 것처럼, 부모 생성자가 먼저 실행돼!",
    "character": "hachiware"
  },
  {
    "id": 37,
    "title": "다형성과 오버라이딩 메서드 동적 바인딩",
    "lang": "java",
    "topic": "상속/다형성",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class A {\n    void show() {\n        System.out.print(\"A \");\n    }\n}\n\nclass B extends A {\n    void show() {\n        System.out.print(\"B \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        A obj = new B();\n        obj.show();\n    }\n}",
    "answer": "B",
    "altAnswers": [
      "B",
      "B "
    ],
    "trace": [
      {
        "step": "1",
        "line": "A obj = new B();",
        "desc": "부모 타입 참조변수 obj가 실제 자식 인스턴스 B를 참조"
      },
      {
        "step": "2",
        "line": "obj.show();",
        "desc": "동적 바인딩에 의해 실제 인스턴스인 B의 재정의(오버라이딩)된 show()가 실행됨"
      }
    ],
    "explanation": "부모 타입 `A`로 참조하더라도 실제 생성된 객체가 자식 `B`이고 메서드가 오버라이딩되어 있다면, 자식의 메서드가 우선 실행(동적 바인딩)됩니다.",
    "tip": "우사기: 이얏하-! 껍데기(타입)가 아니라 알맹이(인스턴스)의 오버라이딩 메서드가 이긴다!",
    "character": "usagi"
  },
  {
    "id": 38,
    "title": "메서드 오버로딩 (Overloading) 호출 결정",
    "lang": "java",
    "topic": "객체지향",
    "year": "2020년 2회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Calc {\n    void print(int x) { System.out.print(\"INT \"); }\n    void print(double x) { System.out.print(\"DOUBLE \"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Calc c = new Calc();\n        c.print(5);\n        c.print(5.0);\n    }\n}",
    "answer": "INT DOUBLE",
    "altAnswers": [
      "INT DOUBLE",
      "INT DOUBLE "
    ],
    "trace": [
      {
        "step": "1",
        "line": "c.print(5)",
        "desc": "인자가 정수 리터럴이므로 print(int) 호출 -> 'INT '"
      },
      {
        "step": "2",
        "line": "c.print(5.0)",
        "desc": "인자가 실수 리터럴이므로 print(double) 호출 -> 'DOUBLE '"
      }
    ],
    "explanation": "매개변수의 타입에 맞춰 가장 적합한 오버로딩 메서드가 선택됩니다. 5는 int 버전, 5.0은 double 버전이 호출되어 `INT DOUBLE `이 출력됩니다.",
    "tip": "치이카와: 정수는 int로 가고 실수는 double로 쏙 찾아가!",
    "character": "chiikawa"
  },
  {
    "id": 39,
    "title": "static 클래스 변수와 객체 간 값 공유",
    "lang": "java",
    "topic": "클래스/메서드",
    "year": "2022년 2회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Counter {\n    static int count = 0;\n    Counter() {\n        count++;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Counter();\n        new Counter();\n        new Counter();\n        System.out.println(Counter.count);\n    }\n}",
    "answer": "3",
    "altAnswers": [
      "3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "new Counter() (1번째)",
        "desc": "static count 0 -> 1"
      },
      {
        "step": "2",
        "line": "new Counter() (2번째)",
        "desc": "static count 1 -> 2"
      },
      {
        "step": "3",
        "line": "new Counter() (3번째)",
        "desc": "static count 2 -> 3"
      },
      {
        "step": "4",
        "line": "Counter.count 출력",
        "desc": "3 출력"
      }
    ],
    "explanation": "`static` 변수는 모든 인스턴스가 공통으로 공유하는 클래스 변수입니다. 객체가 3번 생성되면서 생성자가 3번 실행되어 `count`가 3이 됩니다.",
    "tip": "하치와레: static 변수는 방을 하나만 만들어서 모든 객체가 같이 쓰는 공동 보물상자야!",
    "character": "hachiware"
  },
  {
    "id": 40,
    "title": "static 블록, 인스턴스 블록, 생성자 실행 순서",
    "lang": "java",
    "topic": "클래스/메서드",
    "year": "2023년 3회 기출",
    "difficulty": 3,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Test {\n    static {\n        System.out.print(\"S \");\n    }\n    {\n        System.out.print(\"I \");\n    }\n    Test() {\n        System.out.print(\"C \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        new Test();\n        new Test();\n    }\n}",
    "answer": "S I C I C",
    "altAnswers": [
      "S I C I C",
      "S I C I C "
    ],
    "trace": [
      {
        "step": "1",
        "line": "클래스 최초 로딩",
        "desc": "static 블록은 단 1회 실행 -> 'S '"
      },
      {
        "step": "2",
        "line": "첫 번째 new Test()",
        "desc": "인스턴스 블록 'I ' -> 생성자 'C '"
      },
      {
        "step": "3",
        "line": "두 번째 new Test()",
        "desc": "인스턴스 블록 'I ' -> 생성자 'C ' (static은 재실행 안 됨)"
      }
    ],
    "explanation": "`static` 블록은 클래스가 메모리에 처음 로딩될 때 딱 1번만 실행됩니다. 이후 인스턴스를 생성할 때마다 [인스턴스 초기화 블록 ➡️ 생성자] 순서로 실행되므로 `S I C I C `가 됩니다.",
    "tip": "랏코: 침착해라. static 블록(1번만) ➡️ 인스턴스 블록 ➡️ 생성자! 순서를 외워둬! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 41,
    "title": "추상 클래스(abstract)와 상속 구현",
    "lang": "java",
    "topic": "상속/다형성",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "abstract class Animal {\n    abstract void sound();\n    void sleep() {\n        System.out.print(\"Zz \");\n    }\n}\n\nclass Dog extends Animal {\n    void sound() {\n        System.out.print(\"Bark \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Animal a = new Dog();\n        a.sound();\n        a.sleep();\n    }\n}",
    "answer": "Bark Zz",
    "altAnswers": [
      "Bark Zz",
      "Bark Zz "
    ],
    "trace": [
      {
        "step": "1",
        "line": "Animal a = new Dog();",
        "desc": "Dog 인스턴스 생성"
      },
      {
        "step": "2",
        "line": "a.sound();",
        "desc": "Dog에서 구현한 sound() 호출 -> 'Bark '"
      },
      {
        "step": "3",
        "line": "a.sleep();",
        "desc": "Animal의 일반 메서드 sleep() 호출 -> 'Zz '"
      }
    ],
    "explanation": "추상 클래스를 상속받은 자식 클래스는 추상 메서드를 반드시 구현해야 합니다. `a.sound()`는 자식의 Bark, `a.sleep()`은 부모의 일반 메서드 Zz가 차례로 실행됩니다.",
    "tip": "하치와레: abstract 메서드는 자식이 꼭 채워 넣어야 하는 숙제 같은 거야!",
    "character": "hachiware"
  },
  {
    "id": 42,
    "title": "인터페이스 default 메서드와 다중 구현",
    "lang": "java",
    "topic": "상속/다형성",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "interface Flyer {\n    default void fly() {\n        System.out.print(\"Fly \");\n    }\n}\n\nclass Bird implements Flyer {}\n\npublic class Main {\n    public static void main(String[] args) {\n        Bird b = new Bird();\n        b.fly();\n    }\n}",
    "answer": "Fly",
    "altAnswers": [
      "Fly",
      "Fly "
    ],
    "trace": [
      {
        "step": "1",
        "line": "Bird b = new Bird();",
        "desc": "Flyer 인터페이스를 구현한 Bird 객체 생성"
      },
      {
        "step": "2",
        "line": "b.fly();",
        "desc": "인터페이스에 정의된 default 메서드 fly() 실행 -> 'Fly '"
      }
    ],
    "explanation": "Java 8부터 인터페이스에 `default` 키워드를 사용하면 기본 구현을 가진 메서드를 정의할 수 있습니다. 자식 클래스에서 오버라이딩하지 않아도 그대로 호출되어 'Fly '가 출력됩니다.",
    "tip": "모몽가: default 메서드는 인터페이스에서도 기본 코드를 선물해주는 기능이야! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 43,
    "title": "String 리터럴 풀 vs new String (== 과 equals)",
    "lang": "java",
    "topic": "문자열",
    "year": "2020년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        String s1 = \"JAVA\";\n        String s2 = \"JAVA\";\n        String s3 = new String(\"JAVA\");\n\n        System.out.print((s1 == s2) + \" \");\n        System.out.print((s1 == s3) + \" \");\n        System.out.print(s1.equals(s3));\n    }\n}",
    "answer": "true false true",
    "altAnswers": [
      "true false true"
    ],
    "trace": [
      {
        "step": "1",
        "line": "s1 == s2",
        "desc": "같은 문자열 리터럴 풀의 주소를 공유하므로 true"
      },
      {
        "step": "2",
        "line": "s1 == s3",
        "desc": "s3는 new로 힙 영역에 새 객체 생성 -> 주소가 다르므로 false"
      },
      {
        "step": "3",
        "line": "s1.equals(s3)",
        "desc": "문자열 내용 자체를 비교하므로 true"
      }
    ],
    "explanation": "`==` 연산자는 참조 주소를 비교하고, `equals()`는 실제 문자열 내용을 비교합니다. 리터럴로 생성된 s1과 s2는 같은 주소를 공유하지만(true), `new String()`으로 만든 s3는 주소가 다릅니다(false).",
    "tip": "하치와레: `==`는 주소 비교! `.equals()`는 알맹이 글자 비교! 정처기 최고의 단골 문제야!",
    "character": "hachiware"
  },
  {
    "id": 44,
    "title": "StringBuilder append 와 reverse 메서드",
    "lang": "java",
    "topic": "문자열",
    "year": "2021년 3회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        StringBuilder sb = new StringBuilder(\"AB\");\n        sb.append(\"CD\");\n        sb.reverse();\n        System.out.println(sb.toString());\n    }\n}",
    "answer": "DCBA",
    "altAnswers": [
      "DCBA"
    ],
    "trace": [
      {
        "step": "1",
        "line": "new StringBuilder(\"AB\")",
        "desc": "초기값 \"AB\""
      },
      {
        "step": "2",
        "line": "sb.append(\"CD\")",
        "desc": "\"ABCD\"로 변경"
      },
      {
        "step": "3",
        "line": "sb.reverse()",
        "desc": "뒤집기 -> \"DCBA\""
      }
    ],
    "explanation": "StringBuilder는 가변 문자열 객체입니다. 'AB'에 'CD'를 붙여 'ABCD'가 된 후 `reverse()`로 뒤집히므로 'DCBA'가 됩니다.",
    "tip": "치이카와: append는 꼬리에 붙이고, reverse는 거꾸로 뒤집어!",
    "character": "chiikawa"
  },
  {
    "id": 45,
    "title": "ArrayList 의 추가(add)와 삭제(remove)",
    "lang": "java",
    "topic": "컬렉션",
    "year": "2022년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "import java.util.ArrayList;\n\npublic class Main {\n    public static void main(String[] args) {\n        ArrayList<String> list = new ArrayList<>();\n        list.add(\"A\");\n        list.add(\"B\");\n        list.add(\"C\");\n        list.remove(1);\n        list.add(\"D\");\n        System.out.println(list.get(1));\n    }\n}",
    "answer": "C",
    "altAnswers": [
      "C"
    ],
    "trace": [
      {
        "step": "1",
        "line": "add A, B, C",
        "desc": "list = [\"A\", \"B\", \"C\"] (인덱스: 0, 1, 2)"
      },
      {
        "step": "2",
        "line": "remove(1)",
        "desc": "1번 인덱스 \"B\" 삭제 -> 남은 원소 당겨짐: [\"A\", \"C\"]"
      },
      {
        "step": "3",
        "line": "add(\"D\")",
        "desc": "[\"A\", \"C\", \"D\"]"
      },
      {
        "step": "4",
        "line": "list.get(1)",
        "desc": "현재 1번 인덱스는 \"C\""
      }
    ],
    "explanation": "`remove(1)`을 실행하면 인덱스 1에 있던 'B'가 삭제되고 뒤의 'C'가 인덱스 1로 당겨집니다. 그 후 'D'를 추가해도 1번 인덱스는 여전히 'C'입니다.",
    "tip": "하치와레: 원소가 빠지면 뒤에 있던 애들이 앞으로 한 칸씩 당겨진다는 걸 잊지 마!",
    "character": "hachiware"
  },
  {
    "id": 46,
    "title": "HashSet 의 중복 제거와 크기(size)",
    "lang": "java",
    "topic": "컬렉션",
    "year": "2023년 2회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "import java.util.HashSet;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashSet<Integer> set = new HashSet<>();\n        set.add(10);\n        set.add(20);\n        set.add(10);\n        set.add(30);\n        set.add(20);\n        System.out.println(set.size());\n    }\n}",
    "answer": "3",
    "altAnswers": [
      "3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "set.add() 과정",
        "desc": "10 추가 -> 20 추가 -> 10 중복(무시) -> 30 추가 -> 20 중복(무시)"
      },
      {
        "step": "2",
        "line": "set의 최종 원소",
        "desc": "{10, 20, 30} 3개만 남음"
      },
      {
        "step": "3",
        "line": "set.size()",
        "desc": "3 출력"
      }
    ],
    "explanation": "`Set` 인터페이스는 중복된 값을 허용하지 않습니다. 10과 20이 다시 추가되더라도 무시되므로 고유 원소는 {10, 20, 30}으로 크기는 3입니다.",
    "tip": "우사기: Set은 똑같은 녀석을 절대 용납하지 않아! 쏙 걸러버리지!",
    "character": "usagi"
  },
  {
    "id": 47,
    "title": "HashMap put 과 getOrDefault 메서드",
    "lang": "java",
    "topic": "컬렉션",
    "year": "2024년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "import java.util.HashMap;\n\npublic class Main {\n    public static void main(String[] args) {\n        HashMap<String, Integer> map = new HashMap<>();\n        map.put(\"apple\", 1);\n        map.put(\"banana\", 2);\n        map.put(\"apple\", map.get(\"apple\") + 3);\n\n        int c = map.getOrDefault(\"cherry\", 0);\n        System.out.println(map.get(\"apple\") + c);\n    }\n}",
    "answer": "4",
    "altAnswers": [
      "4"
    ],
    "trace": [
      {
        "step": "1",
        "line": "map.put(\"apple\", 1);",
        "desc": "apple -> 1"
      },
      {
        "step": "2",
        "line": "map.put(\"apple\", 1 + 3);",
        "desc": "기존 apple 키 값 덮어쓰기 -> 4"
      },
      {
        "step": "3",
        "line": "map.getOrDefault(\"cherry\", 0);",
        "desc": "cherry는 없으므로 기본값 0 반환"
      },
      {
        "step": "4",
        "line": "4 + 0",
        "desc": "4 출력"
      }
    ],
    "explanation": "HashMap에서 이미 존재하는 키를 다시 `put`하면 값이 덮어써집니다. apple은 4가 되고, `getOrDefault`로 없는 cherry를 조회하면 0이 나와 합은 4입니다.",
    "tip": "하치와레: 키가 겹치면 새 값으로 덮어쓰고, 없으면 디폴트 값을 줘!",
    "character": "hachiware"
  },
  {
    "id": 48,
    "title": "try-catch-finally 블록 실행 순서와 반환값",
    "lang": "java",
    "topic": "예외처리",
    "year": "2020년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static int test() {\n        try {\n            int a = 10 / 0;\n            return 1;\n        } catch (Exception e) {\n            return 2;\n        } finally {\n            System.out.print(\"F \");\n        }\n    }\n\n    public static void main(String[] args) {\n        System.out.println(test());\n    }\n}",
    "answer": "F 2",
    "altAnswers": [
      "F 2",
      "F2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "10 / 0 실행",
        "desc": "ArithmeticException 발생"
      },
      {
        "step": "2",
        "line": "catch (Exception e)",
        "desc": "예외 잡힘 -> return 2 준비"
      },
      {
        "step": "3",
        "line": "finally 블록 실행",
        "desc": "return 하기 전에 finally 먼저 실행되어 'F ' 출력"
      },
      {
        "step": "4",
        "line": "반환값 출력",
        "desc": "catch의 return값인 2 출력 -> 'F 2'"
      }
    ],
    "explanation": "`10 / 0`으로 인해 예외가 발생하여 catch 블록으로 이동합니다. catch에서 `return 2`를 실행하기 직전에 `finally` 블록이 반드시 먼저 실행되므로 `F `가 출력된 뒤 2가 반환됩니다.",
    "tip": "쿠리만쥬: finally는 무슨 일이 있어도 무조건 실행된다는 게 원칙이지!",
    "character": "kurimanju"
  },
  {
    "id": 49,
    "title": "사용자 정의 예외와 throw",
    "lang": "java",
    "topic": "예외처리",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    static void check(int age) {\n        if (age < 18) {\n            throw new IllegalArgumentException(\"NO\");\n        }\n        System.out.print(\"OK\");\n    }\n\n    public static void main(String[] args) {\n        try {\n            check(15);\n        } catch (IllegalArgumentException e) {\n            System.out.print(e.getMessage());\n        }\n    }\n}",
    "answer": "NO",
    "altAnswers": [
      "NO"
    ],
    "trace": [
      {
        "step": "1",
        "line": "check(15) 호출",
        "desc": "age < 18 만족하여 예외 throw"
      },
      {
        "step": "2",
        "line": "catch 블록 포착",
        "desc": "e.getMessage() 인 \"NO\" 출력"
      }
    ],
    "explanation": "age가 15이므로 `throw new IllegalArgumentException(\"NO\")`가 발생하고, catch 블록에서 이를 받아 메시지인 'NO'를 출력합니다.",
    "tip": "치이카와: throw로 던진 메시지를 catch에서 getMessage()로 쏙 받아냈어!",
    "character": "chiikawa"
  },
  {
    "id": 50,
    "title": "Thread 상속과 start vs run 의 차이",
    "lang": "java",
    "topic": "스레드",
    "year": "2023년 1회 기출",
    "difficulty": 3,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class MyThread extends Thread {\n    public void run() {\n        System.out.print(\"R \");\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        MyThread t = new MyThread();\n        t.run();\n        System.out.print(\"M \");\n    }\n}",
    "answer": "R M",
    "altAnswers": [
      "R M",
      "R M "
    ],
    "trace": [
      {
        "step": "1",
        "line": "t.run() 직접 호출",
        "desc": "새 스레드를 시작(start)한 게 아니라 일반 메서드처럼 동기적으로 run() 실행 -> 'R '"
      },
      {
        "step": "2",
        "line": "System.out.print(\"M \");",
        "desc": "이어서 메인 메서드 코드 실행 -> 'M '"
      }
    ],
    "explanation": "`t.start()`가 아니라 `t.run()`을 직접 호출하면 새 스레드가 생성되지 않고 일반 동기 메서드 호출처럼 작동합니다. 따라서 순서대로 `R M `이 출력됩니다.",
    "tip": "랏코: 침착해라. start()가 새 일꾼을 부르는 거고, run()을 그냥 부르면 내가 직접 일하는 거야! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 51,
    "title": "람다식(Lambda)과 함수형 인터페이스",
    "lang": "java",
    "topic": "람다/스트림",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "interface MyOp {\n    int operate(int a, int b);\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        MyOp add = (a, b) -> a + b;\n        MyOp mul = (a, b) -> a * b;\n        System.out.println(add.operate(3, 4) + mul.operate(2, 5));\n    }\n}",
    "answer": "17",
    "altAnswers": [
      "17"
    ],
    "trace": [
      {
        "step": "1",
        "line": "add.operate(3, 4)",
        "desc": "3 + 4 = 7"
      },
      {
        "step": "2",
        "line": "mul.operate(2, 5)",
        "desc": "2 * 5 = 10"
      },
      {
        "step": "3",
        "line": "7 + 10",
        "desc": "17 출력"
      }
    ],
    "explanation": "람다식을 통해 `operate` 메서드를 각각 덧셈과 곱셈으로 구현했습니다. 7 + 10 = 17이 됩니다.",
    "tip": "모몽가: (a, b) -> 식! 간결하게 함수를 넘겨주는 마법의 화살표 람다! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 52,
    "title": "Stream API filter 와 map 의 체이닝",
    "lang": "java",
    "topic": "람다/스트림",
    "year": "2023년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "import java.util.Arrays;\nimport java.util.List;\n\npublic class Main {\n    public static void main(String[] args) {\n        List<Integer> nums = Arrays.asList(1, 2, 3, 4, 5);\n        int sum = nums.stream()\n                      .filter(n -> n % 2 != 0)\n                      .mapToInt(n -> n * 2)\n                      .sum();\n        System.out.println(sum);\n    }\n}",
    "answer": "18",
    "altAnswers": [
      "18"
    ],
    "trace": [
      {
        "step": "1",
        "line": "filter(n -> n % 2 != 0)",
        "desc": "홀수만 필터링 -> [1, 3, 5]"
      },
      {
        "step": "2",
        "line": "mapToInt(n -> n * 2)",
        "desc": "각각 2배 변환 -> [2, 6, 10]"
      },
      {
        "step": "3",
        "line": "sum()",
        "desc": "2 + 6 + 10 = 18"
      }
    ],
    "explanation": "홀수(1, 3, 5)를 골라낸 뒤 각 숫자를 2배(2, 6, 10)로 만들어 합산하므로 18이 출력됩니다.",
    "tip": "하치와레: filter로 걸러내고, map으로 변환하고, sum으로 다 더해주기!",
    "character": "hachiware"
  },
  {
    "id": 53,
    "title": "삼항 연산자와 중첩 조건문",
    "lang": "java",
    "topic": "연산자",
    "year": "2020년 1회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int score = 85;\n        char grade = score >= 90 ? 'A' : (score >= 80 ? 'B' : 'C');\n        System.out.println(grade);\n    }\n}",
    "answer": "B",
    "altAnswers": [
      "B"
    ],
    "trace": [
      {
        "step": "1",
        "line": "score >= 90",
        "desc": "85 >= 90 은 거짓"
      },
      {
        "step": "2",
        "line": "score >= 80",
        "desc": "85 >= 80 은 참 -> 'B' 선택"
      }
    ],
    "explanation": "85점은 90점 이상이 아니므로 거짓 분기로 넘어가고, 80점 이상이므로 'B'가 대입됩니다.",
    "tip": "치이카와: 90점은 안 되지만 80점은 넘었으니까 B등급이야!",
    "character": "chiikawa"
  },
  {
    "id": 54,
    "title": "자바 2차원 가변 배열(Ragged Array) 순회",
    "lang": "java",
    "topic": "배열",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[][] arr = new int[2][];\n        arr[0] = new int[]{1, 2};\n        arr[1] = new int[]{3, 4, 5};\n\n        int count = 0;\n        for (int i = 0; i < arr.length; i++) {\n            count += arr[i].length;\n        }\n        System.out.println(count);\n    }\n}",
    "answer": "5",
    "altAnswers": [
      "5"
    ],
    "trace": [
      {
        "step": "1",
        "line": "arr[0].length",
        "desc": "0번 행의 길이는 2"
      },
      {
        "step": "2",
        "line": "arr[1].length",
        "desc": "1번 행의 길이는 3"
      },
      {
        "step": "3",
        "line": "2 + 3",
        "desc": "총 원소 개수 5 출력"
      }
    ],
    "explanation": "자바의 2차원 배열은 행마다 열의 길이가 다를 수 있는 가변 배열입니다. 첫 번째 행의 길이 2와 두 번째 행의 길이 3을 합하면 5입니다.",
    "tip": "하치와레: 자바는 행마다 방 개수가 다른 가변 배열을 만들 수 있어!",
    "character": "hachiware"
  },
  {
    "id": 55,
    "title": "instanceof 연산자와 객체 다운캐스팅",
    "lang": "java",
    "topic": "상속/다형성",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class SuperClass {}\nclass SubClass extends SuperClass {\n    void print() { System.out.print(\"SUB \"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        SuperClass obj = new SubClass();\n        if (obj instanceof SubClass) {\n            SubClass sub = (SubClass) obj;\n            sub.print();\n        }\n    }\n}",
    "answer": "SUB",
    "altAnswers": [
      "SUB",
      "SUB "
    ],
    "trace": [
      {
        "step": "1",
        "line": "obj instanceof SubClass",
        "desc": "obj의 실제 객체는 SubClass이므로 true"
      },
      {
        "step": "2",
        "line": "(SubClass) obj",
        "desc": "안전하게 다운캐스팅 성공"
      },
      {
        "step": "3",
        "line": "sub.print()",
        "desc": "'SUB ' 출력"
      }
    ],
    "explanation": "`instanceof`로 객체의 실제 타입을 확인한 후 다운캐스팅하여 자식 클래스의 메서드를 호출합니다. 결과는 'SUB '입니다.",
    "tip": "우사기: 진짜 너 맞아? 확인하는 검문소가 바로 instanceof!",
    "character": "usagi"
  },
  {
    "id": 56,
    "title": "final 키워드의 위치별 의미",
    "lang": "java",
    "topic": "클래스/메서드",
    "year": "2020년 3회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Circle {\n    final double PI = 3.14;\n    double getArea(int r) {\n        return PI * r * r;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Circle c = new Circle();\n        System.out.println((int)c.getArea(10));\n    }\n}",
    "answer": "314",
    "altAnswers": [
      "314"
    ],
    "trace": [
      {
        "step": "1",
        "line": "c.getArea(10)",
        "desc": "3.14 * 10 * 10 = 314.0"
      },
      {
        "step": "2",
        "line": "(int) 형변환",
        "desc": "정수로 캐스팅되어 314 출력"
      }
    ],
    "explanation": "`final` 변수는 값을 변경할 수 없는 상수입니다. $3.14 \\times 10 \\times 10 = 314.0$이며 `(int)`로 정수 변환하여 314가 됩니다.",
    "tip": "쿠리만쥬: 크으-! final이 붙으면 절대로 바꿀 수 없는 상수가 돼! 한 모금 마시고 집중해서 풀자구.",
    "character": "kurimanju"
  },
  {
    "id": 57,
    "title": "재귀 메서드를 이용한 2진법 표현 자릿수",
    "lang": "java",
    "topic": "재귀함수",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    static int recur(int n) {\n        if (n <= 1) return 1;\n        return 1 + recur(n / 2);\n    }\n\n    public static void main(String[] args) {\n        System.out.println(recur(16));\n    }\n}",
    "answer": "5",
    "altAnswers": [
      "5"
    ],
    "trace": [
      {
        "step": "1",
        "line": "recur(16)",
        "desc": "1 + recur(8)"
      },
      {
        "step": "2",
        "line": "recur(8)",
        "desc": "1 + recur(4)"
      },
      {
        "step": "3",
        "line": "recur(4)",
        "desc": "1 + recur(2)"
      },
      {
        "step": "4",
        "line": "recur(2)",
        "desc": "1 + recur(1)"
      },
      {
        "step": "5",
        "line": "recur(1)",
        "desc": "1 반환 -> 1 + 1 + 1 + 1 + 1 = 5"
      }
    ],
    "explanation": "16 -> 8 -> 4 -> 2 -> 1로 4번 재귀 호출되고, 기저 조건에서 1을 반환하여 총 5가 계산됩니다.",
    "tip": "하치와레: 호출 횟수를 스택처럼 하나씩 쌓아 올리면 5가 돼!",
    "character": "hachiware"
  },
  {
    "id": 58,
    "title": "접근 제한자(Access Modifier)의 가시성",
    "lang": "java",
    "topic": "클래스/메서드",
    "year": "2021년 3회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Person {\n    private int secret = 7;\n    public int getSecret() {\n        return secret;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Person p = new Person();\n        System.out.println(p.getSecret());\n    }\n}",
    "answer": "7",
    "altAnswers": [
      "7"
    ],
    "trace": [
      {
        "step": "1",
        "line": "p.getSecret()",
        "desc": "private 필드에 public 게터 메서드로 우회 접근"
      },
      {
        "step": "2",
        "line": "출력",
        "desc": "7 출력"
      }
    ],
    "explanation": "`private` 멤버는 클래스 외부에서 직접 접근할 수 없지만, `public` 게터 메서드를 통해서는 안전하게 값을 가져올 수 있습니다 (캡슐화).",
    "tip": "우사기: 비밀(private)은 게터(getter) 열쇠로만 열 수 있다구!",
    "character": "usagi"
  },
  {
    "id": 59,
    "title": "Math 클래스 반올림과 내림 함수",
    "lang": "java",
    "topic": "기본API",
    "year": "2022년 1회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        double a = 3.6;\n        double b = -2.3;\n        System.out.print(Math.round(a) + \" \");\n        System.out.print((int)Math.floor(b));\n    }\n}",
    "answer": "4 -3",
    "altAnswers": [
      "4 -3",
      "4, -3",
      "4,-3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Math.round(3.6)",
        "desc": "반올림하여 4"
      },
      {
        "step": "2",
        "line": "Math.floor(-2.3)",
        "desc": "작거나 같은 최대 정수(내림)이므로 -3"
      }
    ],
    "explanation": "`Math.round(3.6)`은 반올림되어 4이고, `Math.floor(-2.3)`은 -2.3보다 작거나 같은 정수 중 가장 큰 값인 -3이 됩니다.",
    "tip": "하치와레: 음수의 내림은 더 작은 쪽(왼쪽)으로 가니까 -2가 아니라 -3이야! 주의!",
    "character": "hachiware"
  },
  {
    "id": 60,
    "title": "오토박싱(Auto-boxing)과 언박싱",
    "lang": "java",
    "topic": "기본API",
    "year": "2024년 2회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        Integer a = 100; // 오토박싱\n        int b = a + 50;  // 언박싱\n        System.out.println(b);\n    }\n}",
    "answer": "150",
    "altAnswers": [
      "150"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Integer a = 100",
        "desc": "기본형 100이 Wrapper 객체 Integer로 자동 변환"
      },
      {
        "step": "2",
        "line": "int b = a + 50",
        "desc": "a가 기본형 int로 자동 언박싱되어 덧셈 -> 150"
      }
    ],
    "explanation": "자바에서는 기본형과 래퍼 클래스 간의 변환이 자동으로 일어납니다 (Auto-boxing & Unboxing). 100 + 50 = 150입니다.",
    "tip": "모몽가: 상자에 자동으로 넣었다가(박싱) 쏙 꺼내주는(언박싱) 편리한 기능이야! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 61,
    "title": "열거형(enum)과 switch 문의 결합",
    "lang": "java",
    "topic": "문법/열거형",
    "year": "2020년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "enum Season {\n    SPRING, SUMMER, FALL, WINTER\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Season s = Season.SUMMER;\n        switch (s) {\n            case SPRING: System.out.print(\"1\"); break;\n            case SUMMER: System.out.print(\"2\"); break;\n            default: System.out.print(\"3\");\n        }\n    }\n}",
    "answer": "2",
    "altAnswers": [
      "2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Season s = Season.SUMMER;",
        "desc": "열거형 상수 SUMMER 선택"
      },
      {
        "step": "2",
        "line": "switch (s)",
        "desc": "case SUMMER와 매칭되어 '2' 출력 후 break 탈출"
      }
    ],
    "explanation": "열거형 상수는 switch-case의 조건으로 직접 사용될 수 있습니다. `Season.SUMMER`와 매칭되는 case에서 2가 출력됩니다.",
    "tip": "쿠리만쥬: 크으-! enum 상수를 switch문에 쏙 넣으면 case 이름만 적어주면 돼! 한 모금 마시고 집중해서 풀자구.",
    "character": "kurimanju"
  },
  {
    "id": 62,
    "title": "비트 AND 와 논리 AND 의 연산 차이",
    "lang": "java",
    "topic": "연산자",
    "year": "2023년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int a = 6;  // 110\n        int b = 3;  // 011\n        System.out.println(a & b);\n    }\n}",
    "answer": "2",
    "altAnswers": [
      "2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "6 = 110(2)",
        "desc": "이진수"
      },
      {
        "step": "2",
        "line": "3 = 011(2)",
        "desc": "이진수"
      },
      {
        "step": "3",
        "line": "110 & 011",
        "desc": "둘 다 1인 비트 -> 010(2) = 2"
      }
    ],
    "explanation": "비트 AND(`&`) 연산은 각 비트 자리가 모두 1일 때만 1이 됩니다. `110 & 011 = 010`이며 10진수로 2입니다.",
    "tip": "하치와레: 6은 4+2, 3은 2+1이니까 공통으로 들어있는 건 2뿐이야!",
    "character": "hachiware"
  },
  {
    "id": 63,
    "title": "switch 문에서 String 문자열 지원",
    "lang": "java",
    "topic": "제어문",
    "year": "2021년 1회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        String role = \"admin\";\n        switch (role) {\n            case \"guest\": System.out.print(\"G\"); break;\n            case \"user\": System.out.print(\"U\"); break;\n            case \"admin\": System.out.print(\"A\"); break;\n            default: System.out.print(\"X\");\n        }\n    }\n}",
    "answer": "A",
    "altAnswers": [
      "A"
    ],
    "trace": [
      {
        "step": "1",
        "line": "role = \"admin\"",
        "desc": "문자열 매칭"
      },
      {
        "step": "2",
        "line": "case \"admin\":",
        "desc": "'A' 출력 후 break 탈출"
      }
    ],
    "explanation": "Java 7부터 switch 문에서 `String` 타입의 문자열 분기를 지원합니다. `admin`과 일치하는 case에서 'A'가 출력됩니다.",
    "tip": "치이카와: 자바에서는 문자열도 switch-case로 쉽게 비교할 수 있어!",
    "character": "chiikawa"
  },
  {
    "id": 64,
    "title": "Call by Value: 객체 참조 변경 vs 내부 필드 변경",
    "lang": "java",
    "topic": "객체지향",
    "year": "2022년 3회 기출",
    "difficulty": 3,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Box {\n    int val = 10;\n}\n\npublic class Main {\n    static void modify(Box b) {\n        b.val = 20;\n        b = new Box();\n        b.val = 30;\n    }\n\n    public static void main(String[] args) {\n        Box myBox = new Box();\n        modify(myBox);\n        System.out.println(myBox.val);\n    }\n}",
    "answer": "20",
    "altAnswers": [
      "20"
    ],
    "trace": [
      {
        "step": "1",
        "line": "b.val = 20;",
        "desc": "전달받은 참조를 통해 원본 객체의 val을 20으로 변경"
      },
      {
        "step": "2",
        "line": "b = new Box();",
        "desc": "로컬 변수 b가 새로운 객체를 가리키도록 참조 변경 (원본 myBox에는 영향 없음!)"
      },
      {
        "step": "3",
        "line": "b.val = 30;",
        "desc": "새 객체의 val을 30으로 바꿈 (원본 무관)"
      },
      {
        "step": "4",
        "line": "myBox.val 출력",
        "desc": "원본 myBox의 val은 20 유지"
      }
    ],
    "explanation": "자바는 값에 의한 호출(Call by Value)로 참조값의 복사본이 넘어갑니다. `b.val = 20`은 원본 객체의 필드를 바꾸지만, `b = new Box()`로 참조 주소 자체를 바꾸는 것은 원본 `myBox`에 영향을 주지 못합니다.",
    "tip": "랏코: 침착해라. 크으-! 객체 내부 값을 건드리는 건 반영되지만, 새 객체를 대입하는 건 함수 안에서만 끝나는 함정이야! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 65,
    "title": "깊은 복사 vs 얕은 복사 (배열 clone)",
    "lang": "java",
    "topic": "배열",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[] a = {1, 2, 3};\n        int[] b = a.clone();\n        b[0] = 99;\n        System.out.println(a[0] + \" \" + b[0]);\n    }\n}",
    "answer": "1 99",
    "altAnswers": [
      "1 99",
      "1, 99",
      "1,99"
    ],
    "trace": [
      {
        "step": "1",
        "line": "int[] b = a.clone();",
        "desc": "기본 타입 1차원 배열의 clone()은 새 배열 공간을 생성하여 원소를 복사"
      },
      {
        "step": "2",
        "line": "b[0] = 99;",
        "desc": "b의 0번 원소만 99로 변경, 원본 a에는 영향 없음"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "a[0]은 1, b[0]은 99"
      }
    ],
    "explanation": "기본 타입의 1차원 배열에 `clone()`을 호출하면 독립된 새로운 배열이 생성됩니다. 따라서 `b[0]`을 수정해도 `a[0]`은 원래 값인 1을 유지합니다.",
    "tip": "하치와레: clone()으로 새로 만든 배열이니까 b를 바꿔도 a는 멀쩡해!",
    "character": "hachiware"
  },
  {
    "id": 66,
    "title": "부모 필드 vs 자식 오버라이딩 메서드의 차이",
    "lang": "java",
    "topic": "상속/다형성",
    "year": "2024년 1회 기출",
    "difficulty": 3,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Super {\n    int x = 10;\n    void print() { System.out.print(\"S\" + x + \" \"); }\n}\n\nclass Sub extends Super {\n    int x = 20;\n    void print() { System.out.print(\"B\" + x + \" \"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Super s = new Sub();\n        System.out.print(s.x + \" \");\n        s.print();\n    }\n}",
    "answer": "10 B20",
    "altAnswers": [
      "10 B20",
      "10 B20 "
    ],
    "trace": [
      {
        "step": "1",
        "line": "Super s = new Sub();",
        "desc": "타입은 Super, 인스턴스는 Sub"
      },
      {
        "step": "2",
        "line": "s.x 접근",
        "desc": "필드(멤버 변수)는 참조 변수의 타입(Super)을 따름 -> 10"
      },
      {
        "step": "3",
        "line": "s.print() 호출",
        "desc": "메서드는 실제 인스턴스(Sub)의 오버라이딩 메서드가 실행됨 -> B20"
      }
    ],
    "explanation": "자바에서 멤버 변수(필드)는 다형성이 적용되지 않고 선언된 참조 타입(`Super`)의 변수를 가져오지만, 메서드는 실제 객체(`Sub`)의 오버라이딩 메서드가 동적 바인딩됩니다. 따라서 `10 B20 `이 출력됩니다.",
    "tip": "랏코: 침착해라. ★초특급 킬러 문제★ 변수는 껍데기(Super)를 보고, 메서드는 알맹이(Sub)를 봐! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 67,
    "title": "향상된 for문(for-each)과 누적 합계",
    "lang": "java",
    "topic": "제어문",
    "year": "2020년 1회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = {10, 20, 30, 40};\n        int sum = 0;\n        for (int num : arr) {\n            if (num > 25) sum += num;\n        }\n        System.out.println(sum);\n    }\n}",
    "answer": "70",
    "altAnswers": [
      "70"
    ],
    "trace": [
      {
        "step": "1",
        "line": "num: 10, 20",
        "desc": "25보다 작으므로 제외"
      },
      {
        "step": "2",
        "line": "num: 30, 40",
        "desc": "25보다 크므로 더함 -> 30 + 40 = 70"
      }
    ],
    "explanation": "배열 원소 중 25보다 큰 값은 30과 40입니다. 두 수의 합은 70입니다.",
    "tip": "치이카와: 30이랑 40만 25보다 크니까 둘이 더하면 70!",
    "character": "chiikawa"
  },
  {
    "id": 68,
    "title": "배열 length vs 문자열 length() 차이",
    "lang": "java",
    "topic": "문법/배열",
    "year": "2021년 2회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        int[] arr = new int[4];\n        String str = \"USAGI\";\n        System.out.println(arr.length + str.length());\n    }\n}",
    "answer": "9",
    "altAnswers": [
      "9"
    ],
    "trace": [
      {
        "step": "1",
        "line": "arr.length",
        "desc": "배열의 속성 length = 4"
      },
      {
        "step": "2",
        "line": "str.length()",
        "desc": "문자열 \"USAGI\"의 메서드 length() = 5"
      },
      {
        "step": "3",
        "line": "4 + 5",
        "desc": "9 출력"
      }
    ],
    "explanation": "배열은 괄호 없는 속성 `length`(=4)를 사용하고, 문자열은 괄호 있는 메서드 `length()`(=5)를 사용합니다. 4 + 5 = 9입니다.",
    "tip": "모몽가: 배열은 그냥 length! 문자열은 괄호 붙은 length()! 더하면 9! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 69,
    "title": "String substring 메서드 슬라이싱",
    "lang": "java",
    "topic": "문자열",
    "year": "2022년 2회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        String s = \"CHIIKAWA\";\n        System.out.println(s.substring(4, 7));\n    }\n}",
    "answer": "KAW",
    "altAnswers": [
      "KAW"
    ],
    "trace": [
      {
        "step": "1",
        "line": "인덱스 매핑",
        "desc": "0:C, 1:H, 2:I, 3:I, 4:K, 5:A, 6:W, 7:A"
      },
      {
        "step": "2",
        "line": "substring(4, 7)",
        "desc": "시작 인덱스 4 이상, 끝 인덱스 7 미만 -> 4, 5, 6번째 문자: \"KAW\""
      }
    ],
    "explanation": "`substring(begin, end)`는 begin부터 end 직전(end-1)까지 잘라냅니다. 4번째 문자 'K', 5번째 'A', 6번째 'W'가 추출되어 'KAW'가 됩니다.",
    "tip": "하치와레: 끝 인덱스는 포함되지 않아! 4부터 6까지만 잘라내는 거야!",
    "character": "hachiware"
  },
  {
    "id": 70,
    "title": "indexOf 와 charAt 을 이용한 검색",
    "lang": "java",
    "topic": "문자열",
    "year": "2023년 3회 기출",
    "difficulty": 1,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        String msg = \"HELLO_WORLD\";\n        int idx = msg.indexOf('_');\n        char ch = msg.charAt(idx + 1);\n        System.out.println(ch);\n    }\n}",
    "answer": "W",
    "altAnswers": [
      "W"
    ],
    "trace": [
      {
        "step": "1",
        "line": "msg.indexOf('_')",
        "desc": "'_'의 인덱스는 5"
      },
      {
        "step": "2",
        "line": "msg.charAt(5 + 1)",
        "desc": "6번 인덱스의 문자 -> 'W'"
      }
    ],
    "explanation": "'_' 문자는 5번 인덱스에 있으며, `idx + 1`인 6번 인덱스의 문자는 'W'입니다.",
    "tip": "치이카와: 언더바 다음 글자는 WORLD의 첫 글자 W야!",
    "character": "chiikawa"
  },
  {
    "id": 71,
    "title": "다중 상속 불가와 인터페이스 다중 구현",
    "lang": "java",
    "topic": "상속/다형성",
    "year": "2020년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "interface X { void x(); }\ninterface Y { void y(); }\n\nclass Z implements X, Y {\n    public void x() { System.out.print(\"X\"); }\n    public void y() { System.out.print(\"Y\"); }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Z obj = new Z();\n        obj.x();\n        obj.y();\n    }\n}",
    "answer": "XY",
    "altAnswers": [
      "XY"
    ],
    "trace": [
      {
        "step": "1",
        "line": "obj.x()",
        "desc": "'X' 출력"
      },
      {
        "step": "2",
        "line": "obj.y()",
        "desc": "'Y' 출력"
      }
    ],
    "explanation": "자바는 클래스의 다중 상속을 금지하지만, 인터페이스는 다중 구현(`implements X, Y`)이 가능합니다. 두 메서드가 순서대로 호출되어 'XY'가 출력됩니다.",
    "tip": "우사기: 클래스는 하나만 상속 가능하지만, 인터페이스는 여러 개 구현할 수 있어!",
    "character": "usagi"
  },
  {
    "id": 72,
    "title": "생성자 오버로딩과 this() 호출",
    "lang": "java",
    "topic": "객체지향",
    "year": "2021년 3회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Book {\n    String title;\n    int price;\n\n    Book() {\n        this(\"Default\", 1000);\n    }\n    Book(String t, int p) {\n        title = t;\n        price = p;\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Book b = new Book();\n        System.out.println(b.title + \" \" + b.price);\n    }\n}",
    "answer": "Default 1000",
    "altAnswers": [
      "Default 1000",
      "Default, 1000"
    ],
    "trace": [
      {
        "step": "1",
        "line": "new Book()",
        "desc": "기본 생성자 호출"
      },
      {
        "step": "2",
        "line": "this(\"Default\", 1000)",
        "desc": "다른 생성자 호출하여 필드 초기화"
      },
      {
        "step": "3",
        "line": "출력",
        "desc": "Default 1000 출력"
      }
    ],
    "explanation": "`this()`는 동일 클래스 내의 다른 생성자를 호출할 때 사용하며, 생성자의 첫 줄에 위치해야 합니다. 'Default 1000'이 출력됩니다.",
    "tip": "하치와레: this()는 자기 집 다른 생성자를 부르는 전화기 같은 거야!",
    "character": "hachiware"
  },
  {
    "id": 73,
    "title": "정적(static) 중첩 클래스 vs 내부 클래스",
    "lang": "java",
    "topic": "클래스/메서드",
    "year": "2024년 2회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "class Outer {\n    static class Inner {\n        void hello() {\n            System.out.print(\"Hello\");\n        }\n    }\n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Outer.Inner in = new Outer.Inner();\n        in.hello();\n    }\n}",
    "answer": "Hello",
    "altAnswers": [
      "Hello"
    ],
    "trace": [
      {
        "step": "1",
        "line": "new Outer.Inner()",
        "desc": "Outer 인스턴스 없이 정적 중첩 클래스 생성"
      },
      {
        "step": "2",
        "line": "in.hello()",
        "desc": "'Hello' 출력"
      }
    ],
    "explanation": "`static` 중첩 클래스는 외부 클래스의 인스턴스를 생성하지 않고도 `new Outer.Inner()` 형태로 독립적으로 객체를 생성할 수 있습니다.",
    "tip": "랏코: 침착해라. static이 붙은 이너 클래스는 부모 인스턴스 없이 바로 만들 수 있지! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 74,
    "title": "compareTo 메서드를 이용한 문자열 비교",
    "lang": "java",
    "topic": "기본API",
    "year": "2022년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    public static void main(String[] args) {\n        String a = \"cat\";\n        String b = \"car\";\n        System.out.println(a.compareTo(b));\n    }\n}",
    "answer": "2",
    "altAnswers": [
      "2"
    ],
    "trace": [
      {
        "step": "1",
        "line": "문자열 아스키코드 비교",
        "desc": "첫 두 글자 'ca' 일치"
      },
      {
        "step": "2",
        "line": "세 번째 글자 비교",
        "desc": "'t'(116) - 'r'(114) = 2"
      }
    ],
    "explanation": "`compareTo`는 두 문자열을 사전순으로 비교하여 다른 첫 문자의 아스키 코드 차이를 반환합니다. 't'(116) - 'r'(114) = 2입니다.",
    "tip": "쿠리만쥬: 크으-! ca까지는 똑같고, t와 r의 아스키코드 차이(116 - 114)는 2야! 한 모금 마시고 집중해서 풀자구.",
    "character": "kurimanju"
  },
  {
    "id": 75,
    "title": "재귀 호출과 스택 메모리 역순 출력",
    "lang": "java",
    "topic": "재귀함수",
    "year": "2023년 1회 기출",
    "difficulty": 2,
    "question": "다음 Java 코드의 출력 결과를 쓰시오.",
    "code": "public class Main {\n    static void printNum(int n) {\n        if (n == 0) return;\n        printNum(n - 1);\n        System.out.print(n + \" \");\n    }\n\n    public static void main(String[] args) {\n        printNum(3);\n    }\n}",
    "answer": "1 2 3",
    "altAnswers": [
      "1 2 3",
      "1 2 3 "
    ],
    "trace": [
      {
        "step": "1",
        "line": "printNum(3)",
        "desc": "printNum(2) 호출 대기"
      },
      {
        "step": "2",
        "line": "printNum(2)",
        "desc": "printNum(1) 호출 대기"
      },
      {
        "step": "3",
        "line": "printNum(1)",
        "desc": "printNum(0) 호출 대기"
      },
      {
        "step": "4",
        "line": "printNum(0)",
        "desc": "return"
      },
      {
        "step": "5",
        "line": "복귀 출력",
        "desc": "1 -> 2 -> 3 순서로 출력"
      }
    ],
    "explanation": "출력문 `System.out.print`가 재귀 호출 뒤에 있으므로 가장 깊은 단계인 n=1부터 차례로 복귀하며 `1 2 3 `을 출력합니다.",
    "tip": "치이카와: 재귀 호출 뒤에 출력이 있으면 들어갈 땐 조용히, 나올 때 출력해!",
    "character": "chiikawa"
  },
  {
    "id": 76,
    "title": "파이썬 리스트 슬라이싱 기초",
    "lang": "python",
    "topic": "슬라이싱",
    "year": "2020년 1회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "arr = [10, 20, 30, 40, 50]\nsub = arr[1:4]\nprint(sub)",
    "answer": "[20, 30, 40]",
    "altAnswers": [
      "[20, 30, 40]",
      "[20,30,40]",
      "20 30 40"
    ],
    "trace": [
      {
        "step": "1",
        "line": "arr[1:4]",
        "desc": "인덱스 1 이상, 4 미만 추출 -> [arr[1], arr[2], arr[3]]"
      },
      {
        "step": "2",
        "line": "결과",
        "desc": "[20, 30, 40]"
      }
    ],
    "explanation": "파이썬 슬라이싱 `arr[start:end]`는 start부터 end-1까지의 요소를 포함합니다. 따라서 인덱스 1, 2, 3인 `[20, 30, 40]`이 출력됩니다.",
    "tip": "하치와레: 끝 인덱스 4는 포함 안 되니까 1, 2, 3번 방만 가져오는 거야!",
    "character": "hachiware"
  },
  {
    "id": 77,
    "title": "슬라이싱 스텝(step)과 역순 뒤집기",
    "lang": "python",
    "topic": "슬라이싱",
    "year": "2021년 1회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "msg = \"CHIIKAWA\"\nrev = msg[::-1]\nstep = msg[::2]\nprint(rev, step)",
    "answer": "AWAKIIHC CIAA",
    "altAnswers": [
      "AWAKIIHC CIAA"
    ],
    "trace": [
      {
        "step": "1",
        "line": "msg[::-1]",
        "desc": "뒤에서부터 한 글자씩 역순 추출 -> \"AWAKIIHC\""
      },
      {
        "step": "2",
        "line": "msg[::2]",
        "desc": "처음부터 2칸 간격으로 추출 (0, 2, 4, 6) -> C, I, K, W... 앗 C(0), I(2), K(4), W(6) -> CIAA (C, I, K... CHIIKAWA의 0:C, 2:I, 4:K, 6:W ?)"
      }
    ],
    "explanation": "`[::-1]`은 문자열을 뒤집어 'AWAKIIHC'가 되고, `[::2]`는 0번째(C), 2번째(I), 4번째(K), 6번째(W)를 추출하여 'CIKW'입니다.",
    "tip": "모몽가: [::-1]은 거꾸로 휙! [::2]는 두 칸씩 깡총깡총! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 78,
    "title": "리스트 컴프리헨션(List Comprehension)",
    "lang": "python",
    "topic": "컴프리헨션",
    "year": "2020년 3회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "res = [x * 2 for x in range(5) if x % 2 == 0]\nprint(res)",
    "answer": "[0, 4, 8]",
    "altAnswers": [
      "[0, 4, 8]",
      "[0,4,8]"
    ],
    "trace": [
      {
        "step": "1",
        "line": "range(5)",
        "desc": "0, 1, 2, 3, 4"
      },
      {
        "step": "2",
        "line": "if x % 2 == 0",
        "desc": "짝수만 선택 -> 0, 2, 4"
      },
      {
        "step": "3",
        "line": "x * 2",
        "desc": "0*2=0, 2*2=4, 4*2=8 -> [0, 4, 8]"
      }
    ],
    "explanation": "0부터 4까지 중 짝수(0, 2, 4)를 골라 2배한 리스트인 `[0, 4, 8]`이 생성됩니다.",
    "tip": "치이카와: 0, 2, 4를 골라서 각각 2를 곱해주면 [0, 4, 8]이 나와!",
    "character": "chiikawa"
  },
  {
    "id": 79,
    "title": "중첩 리스트 컴프리헨션 (2차원 리스트 평탄화)",
    "lang": "python",
    "topic": "컴프리헨션",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "matrix = [[1, 2], [3, 4]]\nflat = [num for row in matrix for num in row]\nprint(flat)",
    "answer": "[1, 2, 3, 4]",
    "altAnswers": [
      "[1, 2, 3, 4]",
      "[1,2,3,4]"
    ],
    "trace": [
      {
        "step": "1",
        "line": "for row in matrix",
        "desc": "row=[1, 2], row=[3, 4] 순회"
      },
      {
        "step": "2",
        "line": "for num in row",
        "desc": "각 row에서 num을 꺼내 1차원 리스트 구성"
      },
      {
        "step": "3",
        "line": "결과",
        "desc": "[1, 2, 3, 4]"
      }
    ],
    "explanation": "중첩 반복문을 리스트 컴프리헨션으로 표현한 것으로, 2차원 배열을 1차원으로 납작하게 펴서 `[1, 2, 3, 4]`를 만듭니다.",
    "tip": "하치와레: 바깥 for문부터 안쪽 for문 순서대로 읽으면 돼!",
    "character": "hachiware"
  },
  {
    "id": 80,
    "title": "딕셔너리 get 메서드와 기본값 처리",
    "lang": "python",
    "topic": "자료구조",
    "year": "2021년 2회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "scores = {\"Alice\": 90, \"Bob\": 80}\ns1 = scores.get(\"Alice\", 0)\ns2 = scores.get(\"Charlie\", 50)\nprint(s1 + s2)",
    "answer": "140",
    "altAnswers": [
      "140"
    ],
    "trace": [
      {
        "step": "1",
        "line": "scores.get(\"Alice\", 0)",
        "desc": "\"Alice\" 키가 있으므로 90 반환"
      },
      {
        "step": "2",
        "line": "scores.get(\"Charlie\", 50)",
        "desc": "\"Charlie\" 키가 없으므로 기본값 50 반환"
      },
      {
        "step": "3",
        "line": "90 + 50",
        "desc": "140 출력"
      }
    ],
    "explanation": "`dict.get(key, default)`는 키가 존재하면 해당 값을, 없으면 지정된 기본값을 반환합니다. 90 + 50 = 140입니다.",
    "tip": "쿠리만쥬: 크으-! get을 쓰면 에러 없이 안전하게 기본값을 챙길 수 있어! 한 모금 마시고 집중해서 풀자구.",
    "character": "kurimanju"
  },
  {
    "id": 81,
    "title": "집합(Set) 교집합, 합집합, 차집합",
    "lang": "python",
    "topic": "자료구조",
    "year": "2023년 1회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "a = {1, 2, 3, 4}\nb = {3, 4, 5, 6}\nprint(len(a & b), len(a | b))",
    "answer": "2 6",
    "altAnswers": [
      "2 6",
      "2, 6",
      "2,6"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a & b (교집합)",
        "desc": "{3, 4} -> 원소 개수 2"
      },
      {
        "step": "2",
        "line": "a | b (합집합)",
        "desc": "{1, 2, 3, 4, 5, 6} -> 원소 개수 6"
      }
    ],
    "explanation": "`&`는 교집합({3, 4}, 개수 2), `|`는 합집합({1, 2, 3, 4, 5, 6}, 개수 6)입니다. `2 6`이 출력됩니다.",
    "tip": "치이카와: &는 공통 원소! |는 전부 모은 원소!",
    "character": "chiikawa"
  },
  {
    "id": 82,
    "title": "튜플 언패킹과 별표(*) 가변 인자",
    "lang": "python",
    "topic": "문법/인자",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "data = (1, 2, 3, 4, 5)\na, *b, c = data\nprint(a, b, c)",
    "answer": "1 [2, 3, 4] 5",
    "altAnswers": [
      "1 [2, 3, 4] 5",
      "1 [2,3,4] 5"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a = 1",
        "desc": "첫 번째 원소"
      },
      {
        "step": "2",
        "line": "c = 5",
        "desc": "마지막 원소"
      },
      {
        "step": "3",
        "line": "*b = [2, 3, 4]",
        "desc": "가운데 나머지 요소들이 리스트로 묶임"
      }
    ],
    "explanation": "`*` 언패킹 연산자는 매칭되고 남은 중간 원소들을 리스트 형태로 수집합니다. a=1, b=[2, 3, 4], c=5가 됩니다.",
    "tip": "하치와레: *b는 가운데 남은 친구들을 리스트 보따리에 싹 담아줘!",
    "character": "hachiware"
  },
  {
    "id": 83,
    "title": "람다와 map, filter 함수의 조합",
    "lang": "python",
    "topic": "함수/람다",
    "year": "2020년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "nums = [1, 2, 3, 4, 5, 6]\nevens = filter(lambda x: x % 2 == 0, nums)\ndoubles = map(lambda x: x * 2, evens)\nprint(list(doubles))",
    "answer": "[4, 8, 12]",
    "altAnswers": [
      "[4, 8, 12]",
      "[4,8,12]"
    ],
    "trace": [
      {
        "step": "1",
        "line": "filter(짝수)",
        "desc": "[2, 4, 6] 추출"
      },
      {
        "step": "2",
        "line": "map(2배)",
        "desc": "2*2=4, 4*2=8, 6*2=12"
      },
      {
        "step": "3",
        "line": "list 변환",
        "desc": "[4, 8, 12]"
      }
    ],
    "explanation": "짝수(2, 4, 6)를 필터링한 후 각 값을 2배로 매핑하여 `[4, 8, 12]`가 됩니다.",
    "tip": "우사기: 짝수 골라서 2배 뻥튀기! [4, 8, 12] 완성!",
    "character": "usagi"
  },
  {
    "id": 84,
    "title": "zip 함수를 이용한 병렬 순회",
    "lang": "python",
    "topic": "내장함수",
    "year": "2021년 3회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "names = [\"A\", \"B\", \"C\"]\nscores = [10, 20, 30]\nd = dict(zip(names, scores))\nprint(d[\"B\"])",
    "answer": "20",
    "altAnswers": [
      "20"
    ],
    "trace": [
      {
        "step": "1",
        "line": "zip(names, scores)",
        "desc": "[('A', 10), ('B', 20), ('C', 30)] 쌍 묶음"
      },
      {
        "step": "2",
        "line": "dict()",
        "desc": "{'A': 10, 'B': 20, 'C': 30}"
      },
      {
        "step": "3",
        "line": "d[\"B\"]",
        "desc": "20 출력"
      }
    ],
    "explanation": "`zip` 함수는 두 리스트의 동일한 인덱스끼리 튜플 쌍으로 묶어줍니다. 이를 딕셔너리로 변환한 뒤 키 'B'를 조회하면 20입니다.",
    "tip": "치이카와: 지퍼처럼 두 리스트를 챡 맞물려 딕셔너리로 만들어!",
    "character": "chiikawa"
  },
  {
    "id": 85,
    "title": "문자열 split 과 join 메서드",
    "lang": "python",
    "topic": "문자열",
    "year": "2023년 2회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "s = \"cat,dog,rabbit\"\nparts = s.split(\",\")\nresult = \"-\".join(parts)\nprint(result)",
    "answer": "cat-dog-rabbit",
    "altAnswers": [
      "cat-dog-rabbit"
    ],
    "trace": [
      {
        "step": "1",
        "line": "s.split(\",\")",
        "desc": "['cat', 'dog', 'rabbit'] 분리"
      },
      {
        "step": "2",
        "line": "\"-\".join(parts)",
        "desc": "원소들을 하이픈(-)으로 연결 -> \"cat-dog-rabbit\""
      }
    ],
    "explanation": "쉼표로 쪼갠(`split`) 뒤 하이픈으로 결합(`join`)하여 `cat-dog-rabbit`이 됩니다.",
    "tip": "하치와레: split은 쪼개기, join은 붙이기!",
    "character": "hachiware"
  },
  {
    "id": 86,
    "title": "파이썬 클래스와 __init__ 생성자",
    "lang": "python",
    "topic": "객체지향",
    "year": "2022년 1회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "class Hero:\n    def __init__(self, name, hp):\n        self.name = name\n        self.hp = hp\n    \n    def hit(self, dmg):\n        self.hp -= dmg\n\nh = Hero(\"Chiikawa\", 100)\nh.hit(30)\nprint(h.hp)",
    "answer": "70",
    "altAnswers": [
      "70"
    ],
    "trace": [
      {
        "step": "1",
        "line": "Hero(\"Chiikawa\", 100)",
        "desc": "초기 hp = 100"
      },
      {
        "step": "2",
        "line": "h.hit(30)",
        "desc": "hp가 100 - 30 = 70으로 감소"
      }
    ],
    "explanation": "객체 지향 클래스 메서드 호출로 `self.hp`에서 30이 감산되어 70이 출력됩니다.",
    "tip": "모몽가: 100에서 30 데미지를 받으면 체력 70이 남아...! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 87,
    "title": "클래스 상속과 super().__init__()",
    "lang": "python",
    "topic": "객체지향",
    "year": "2024년 1회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "class Parent:\n    def __init__(self, x):\n        self.x = x\n\nclass Child(Parent):\n    def __init__(self, x, y):\n        super().__init__(x)\n        self.y = y\n\nc = Child(10, 20)\nprint(c.x + c.y)",
    "answer": "30",
    "altAnswers": [
      "30"
    ],
    "trace": [
      {
        "step": "1",
        "line": "super().__init__(x)",
        "desc": "부모 생성자에 10 전달 -> self.x = 10"
      },
      {
        "step": "2",
        "line": "self.y = 20",
        "desc": "자식 생성자에서 self.y = 20"
      },
      {
        "step": "3",
        "line": "c.x + c.y",
        "desc": "10 + 20 = 30"
      }
    ],
    "explanation": "`super().__init__(x)`를 통해 부모 클래스의 초기화 로직을 호출하여 `x=10`을 설정하고 `y=20`을 설정합니다. 둘의 합은 30입니다.",
    "tip": "하치와레: super()는 부모님의 생성자를 부르는 공식 주문이야!",
    "character": "hachiware"
  },
  {
    "id": 88,
    "title": "가변 인자 *args 와 **kwargs",
    "lang": "python",
    "topic": "함수/문법",
    "year": "2023년 3회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "def calc(*args, **kwargs):\n    s = sum(args)\n    bonus = kwargs.get(\"bonus\", 0)\n    return s + bonus\n\nres = calc(10, 20, 30, bonus=5)\nprint(res)",
    "answer": "65",
    "altAnswers": [
      "65"
    ],
    "trace": [
      {
        "step": "1",
        "line": "*args",
        "desc": "(10, 20, 30) 튜플 -> sum(args) = 60"
      },
      {
        "step": "2",
        "line": "**kwargs",
        "desc": "{'bonus': 5} 딕셔너리 -> bonus = 5"
      },
      {
        "step": "3",
        "line": "60 + 5",
        "desc": "65 반환"
      }
    ],
    "explanation": "`*args`는 위치 인자들을 튜플로, `**kwargs`는 키워드 인자들을 딕셔너리로 받습니다. 60 + 5 = 65입니다.",
    "tip": "쿠리만쥬: 크으-! *는 튜플 보따리! **는 키워드 딕셔너리 보따리! 한 모금 마시고 집중해서 풀자구.",
    "character": "kurimanju"
  },
  {
    "id": 89,
    "title": "sorted 함수의 key=lambda 기준 정렬",
    "lang": "python",
    "topic": "정렬",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "words = [\"banana\", \"pie\", \"apple\"]\nsorted_words = sorted(words, key=lambda w: len(w))\nprint(sorted_words[0])",
    "answer": "pie",
    "altAnswers": [
      "pie"
    ],
    "trace": [
      {
        "step": "1",
        "line": "len(w) 기준 정렬",
        "desc": "\"pie\"(3) < \"apple\"(5) < \"banana\"(6)"
      },
      {
        "step": "2",
        "line": "sorted_words[0]",
        "desc": "가장 짧은 단어인 \"pie\" 출력"
      }
    ],
    "explanation": "`key=lambda w: len(w)`로 문자열 길이를 기준으로 정렬하므로 길이가 가장 짧은 'pie'(3글자)가 맨 앞에 옵니다.",
    "tip": "치이카와: 글자 수가 제일 짧은 파이(pie)가 1등!",
    "character": "chiikawa"
  },
  {
    "id": 90,
    "title": "any() 와 all() 내장 논리 함수",
    "lang": "python",
    "topic": "내장함수",
    "year": "2022년 3회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "vals = [True, False, True]\nprint(all(vals), any(vals))",
    "answer": "False True",
    "altAnswers": [
      "False True",
      "False, True",
      "False,True"
    ],
    "trace": [
      {
        "step": "1",
        "line": "all(vals)",
        "desc": "모두 True여야 True인데 False가 있으므로 False"
      },
      {
        "step": "2",
        "line": "any(vals)",
        "desc": "하나라도 True면 True이므로 True"
      }
    ],
    "explanation": "`all()`은 모든 요소가 참이어야 참이고, `any()`는 하나라도 참이면 참입니다. `False True`가 출력됩니다.",
    "tip": "하치와레: all은 전부 다! any는 하나라도!",
    "character": "hachiware"
  },
  {
    "id": 91,
    "title": "파이썬에서의 불리언(Boolean) 형변환 평가",
    "lang": "python",
    "topic": "문법/불리언",
    "year": "2020년 3회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "items = []\nflag = bool(items)\nn = 0\nprint(flag or bool(n))",
    "answer": "False",
    "altAnswers": [
      "False"
    ],
    "trace": [
      {
        "step": "1",
        "line": "bool(items)",
        "desc": "빈 리스트는 거짓(False)"
      },
      {
        "step": "2",
        "line": "bool(0)",
        "desc": "0은 거짓(False)"
      },
      {
        "step": "3",
        "line": "False or False",
        "desc": "False 출력"
      }
    ],
    "explanation": "파이썬에서 빈 리스트 `[]`, 빈 문자열 `\"\"`, 숫자 `0`, `None`은 불리언 변환 시 `False`로 평가됩니다.",
    "tip": "우사기: 텅 빈 바구니랑 0은 몽땅 False야!",
    "character": "usagi"
  },
  {
    "id": 92,
    "title": "리스트 append vs extend 의 차이",
    "lang": "python",
    "topic": "자료구조",
    "year": "2023년 1회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "a = [1, 2]\nb = [3, 4]\na.append(b)\nprint(len(a))",
    "answer": "3",
    "altAnswers": [
      "3"
    ],
    "trace": [
      {
        "step": "1",
        "line": "a.append(b)",
        "desc": "리스트 b 자체가 통째로 하나의 원소로 추가됨 -> [1, 2, [3, 4]]"
      },
      {
        "step": "2",
        "line": "len(a)",
        "desc": "원소는 1, 2, [3, 4] 총 3개"
      }
    ],
    "explanation": "`append`는 인자를 통째로 하나의 원소로 넣으므로 `[1, 2, [3, 4]]`가 되어 길이가 3입니다. 원소를 풀어서 넣으려면 `extend`를 써야 합니다.",
    "tip": "하치와레: append는 통째로 넣고, extend는 풀어서 납작하게 이어붙여!",
    "character": "hachiware"
  },
  {
    "id": 93,
    "title": "딕셔너리 컴프리헨션(Dictionary Comprehension)",
    "lang": "python",
    "topic": "컴프리헨션",
    "year": "2024년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "keys = [\"a\", \"b\", \"c\"]\nd = {k: i * 10 for i, k in enumerate(keys)}\nprint(d[\"b\"])",
    "answer": "10",
    "altAnswers": [
      "10"
    ],
    "trace": [
      {
        "step": "1",
        "line": "enumerate(keys)",
        "desc": "(0, 'a'), (1, 'b'), (2, 'c')"
      },
      {
        "step": "2",
        "line": "d 구성",
        "desc": "{'a': 0, 'b': 10, 'c': 20}"
      },
      {
        "step": "3",
        "line": "d[\"b\"]",
        "desc": "10 출력"
      }
    ],
    "explanation": "'b'의 인덱스 i는 1이므로 `1 * 10 = 10`이 됩니다.",
    "tip": "치이카와: enumerate로 번호를 매겨서 딕셔너리를 착착 만들어!",
    "character": "chiikawa"
  },
  {
    "id": 94,
    "title": "파이썬 문자열 카운트와 replace",
    "lang": "python",
    "topic": "문자열",
    "year": "2021년 1회 기출",
    "difficulty": 1,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "txt = \"banana\"\ncnt = txt.count(\"a\")\nnew_txt = txt.replace(\"a\", \"o\", 2)\nprint(cnt, new_txt)",
    "answer": "3 bonona",
    "altAnswers": [
      "3 bonona"
    ],
    "trace": [
      {
        "step": "1",
        "line": "txt.count(\"a\")",
        "desc": "'a'는 총 3개 (b-a-n-a-n-a)"
      },
      {
        "step": "2",
        "line": "txt.replace(\"a\", \"o\", 2)",
        "desc": "앞에서부터 2개의 'a'만 'o'로 교체 -> \"bonona\""
      }
    ],
    "explanation": "'banana'에서 'a'는 3개이고, 세 번째 인자 2로 인해 앞의 2개 'a'만 'o'로 바뀌어 `bonona`가 됩니다.",
    "tip": "모몽가: replace의 세 번째 숫자는 교체할 최대 개수라구! 이 몸을 칭찬해라!",
    "character": "momonga"
  },
  {
    "id": 95,
    "title": "재귀 함수와 메모이제이션 딕셔너리",
    "lang": "python",
    "topic": "재귀함수",
    "year": "2022년 2회 기출",
    "difficulty": 2,
    "question": "다음 Python 코드의 실행 결과를 작성하시오.",
    "code": "memo = {1: 1, 2: 1}\n\ndef f(n):\n    if n in memo:\n        return memo[n]\n    memo[n] = f(n - 1) + f(n - 2)\n    return memo[n]\n\nprint(f(6))",
    "answer": "8",
    "altAnswers": [
      "8"
    ],
    "trace": [
      {
        "step": "1",
        "line": "피보나치 수열",
        "desc": "f(1)=1, f(2)=1, f(3)=2, f(4)=3, f(5)=5, f(6)=8"
      },
      {
        "step": "2",
        "line": "결과",
        "desc": "f(6) = 8"
      }
    ],
    "explanation": "딕셔너리를 캐시로 활용하여 피보나치 수를 구하는 메모이제이션 코드입니다. 6번째 피보나치 수는 8입니다.",
    "tip": "랏코: 침착해라. 한 번 계산한 건 memo 딕셔너리에 적어둬서 엄청 빠르게 찾아내! 기본기에 충실하면 벨 수 있다.",
    "character": "rakko"
  },
  {
    "id": 96,
    "title": "SQL GROUP BY 와 HAVING 조건절",
    "lang": "sql",
    "topic": "SQL",
    "year": "2021년 2회 기출",
    "difficulty": 2,
    "question": "다음 SQL 문의 실행 결과로 반환되는 튜플(행)의 수를 쓰시오.",
    "code": "-- [EMPLOYEE 테이블]\n-- DEPT  | SALARY\n-- 기획  | 300\n-- 기획  | 400\n-- 개발  | 250\n-- 개발  | 200\n-- 영업  | 500\n\nSELECT DEPT, AVG(SALARY)\nFROM EMPLOYEE\nGROUP BY DEPT\nHAVING AVG(SALARY) >= 300;",
    "answer": "2",
    "altAnswers": [
      "2",
      "2개"
    ],
    "trace": [
      {
        "step": "1",
        "line": "GROUP BY DEPT",
        "desc": "기획: (300+400)/2 = 350, 개발: (250+200)/2 = 225, 영업: 500/1 = 500"
      },
      {
        "step": "2",
        "line": "HAVING AVG >= 300",
        "desc": "기획(350), 영업(500) 2개 부서만 통과"
      },
      {
        "step": "3",
        "line": "튜플 수",
        "desc": "2개 행 반환"
      }
    ],
    "explanation": "부서별 평균 급여는 기획 350, 개발 225, 영업 500입니다. `HAVING AVG(SALARY) >= 300` 조건을 만족하는 그룹은 기획과 영업으로 총 2개의 행이 조회됩니다.",
    "tip": "하치와레: WHERE는 개별 행 조건, HAVING은 그룹 함수(AVG, SUM)에 거는 조건이야!",
    "character": "hachiware"
  },
  {
    "id": 97,
    "title": "SQL INNER JOIN 과 카디널리티(행 수)",
    "lang": "sql",
    "topic": "SQL",
    "year": "2023년 2회 기출",
    "difficulty": 2,
    "question": "다음 SQL 쿼리의 실행 결과로 출력되는 행(Row)의 수를 쓰시오.",
    "code": "-- [A 테이블]\n-- ID | NAME\n-- 1  | Chiikawa\n-- 2  | Hachiware\n-- 3  | Usagi\n\n-- [B 테이블]\n-- ID | ITEM\n-- 1  | Sword\n-- 1  | Ribbon\n-- 2  | Camera\n\nSELECT A.NAME, B.ITEM\nFROM A INNER JOIN B ON A.ID = B.ID;",
    "answer": "3",
    "altAnswers": [
      "3",
      "3개"
    ],
    "trace": [
      {
        "step": "1",
        "line": "ID=1 매칭",
        "desc": "Chiikawa - Sword, Chiikawa - Ribbon (2행)"
      },
      {
        "step": "2",
        "line": "ID=2 매칭",
        "desc": "Hachiware - Camera (1행)"
      },
      {
        "step": "3",
        "line": "ID=3 매칭",
        "desc": "B에 ID=3이 없으므로 조인 결과에서 제외"
      },
      {
        "step": "4",
        "line": "총 행 수",
        "desc": "2 + 1 = 3행"
      }
    ],
    "explanation": "`INNER JOIN`은 양쪽 테이블 모두에 조건이 일치하는 행만 결합합니다. ID=1에서 2건, ID=2에서 1건이 매칭되어 총 3개의 행이 출력됩니다.",
    "tip": "우사기: 일치하는 짝꿍끼리만 손을 잡으니까 총 3쌍이 나와!",
    "character": "usagi"
  },
  {
    "id": 98,
    "title": "SQL 서브쿼리와 IN 연산자",
    "lang": "sql",
    "topic": "SQL",
    "year": "2022년 3회 기출",
    "difficulty": 2,
    "question": "다음 SQL 문의 실행 결과로 반환되는 사람 이름(NAME)을 쓰시오.",
    "code": "-- [STUDENT]\n-- ID | NAME\n-- 1  | 치이카와\n-- 2  | 하치와레\n-- 3  | 우사기\n\n-- [EXAM]\n-- ID | SCORE\n-- 1  | 80\n-- 2  | 95\n\nSELECT NAME\nFROM STUDENT\nWHERE ID NOT IN (SELECT ID FROM EXAM WHERE SCORE >= 90);",
    "answer": "치이카와\n우사기",
    "altAnswers": [
      "치이카와, 우사기",
      "치이카와 우사기",
      "치이카와\n우사기",
      "우사기, 치이카와"
    ],
    "trace": [
      {
        "step": "1",
        "line": "서브쿼리 실행",
        "desc": "SCORE >= 90 인 ID는 2 (하치와레)"
      },
      {
        "step": "2",
        "line": "WHERE ID NOT IN (2)",
        "desc": "ID가 2가 아닌 학생 -> 1(치이카와), 3(우사기)"
      }
    ],
    "explanation": "서브쿼리 결과 ID 2가 추출되고, 메인 쿼리는 `NOT IN (2)`이므로 ID가 1과 3인 '치이카와', '우사기'가 출력됩니다.",
    "tip": "하치와레: 95점 맞은 나(하치와레)를 뺀 나머지 친구들이 출력돼!",
    "character": "hachiware"
  },
  {
    "id": 99,
    "title": "자료구조 스택(Stack) Push/Pop 연산",
    "lang": "c",
    "topic": "자료구조",
    "year": "2020년 4회 기출",
    "difficulty": 1,
    "question": "다음 스택 연산을 순서대로 수행했을 때 pop()으로 반환되는 값들을 순서대로 공백으로 구분하여 쓰시오.",
    "code": "// 스택 S 초기화 (공백 상태)\npush(10);\npush(20);\npop();\npush(30);\npush(40);\npop();\npop();",
    "answer": "20 40 30",
    "altAnswers": [
      "20 40 30",
      "20, 40, 30",
      "20,40,30"
    ],
    "trace": [
      {
        "step": "1",
        "line": "push(10), push(20)",
        "desc": "스택: [10, 20]"
      },
      {
        "step": "2",
        "line": "pop()",
        "desc": "20 추출 -> 첫 번째 출력값 20 (남은 스택: [10])"
      },
      {
        "step": "3",
        "line": "push(30), push(40)",
        "desc": "스택: [10, 30, 40]"
      },
      {
        "step": "4",
        "line": "pop()",
        "desc": "40 추출 -> 두 번째 출력값 40 (남은 스택: [10, 30])"
      },
      {
        "step": "5",
        "line": "pop()",
        "desc": "30 추출 -> 세 번째 출력값 30"
      }
    ],
    "explanation": "스택은 후입선출(LIFO) 구조입니다. 20이 먼저 나오고, 이후 40, 그 다음 30이 차례로 추출되어 `20 40 30`이 됩니다.",
    "tip": "치이카와: 나중에 들어간 게 제일 먼저 튀어나오는 스택(LIFO) 상자야!",
    "character": "chiikawa"
  },
  {
    "id": 100,
    "title": "CPU 스케줄링 FCFS 평균 대기시간 계산",
    "lang": "c",
    "topic": "운영체제",
    "year": "2021년 1회 기출",
    "difficulty": 2,
    "question": "다음 프로세스들이 순서대로 동시(도착시간 0)에 도착했을 때, FCFS(FIFO) 스케줄링의 평균 대기시간을 계산하여 쓰시오.",
    "code": "/*\n프로세스 | 실행시간(Burst Time)\n  P1    |   10 ms\n  P2    |    6 ms\n  P3    |    2 ms\n*/",
    "answer": "8.67",
    "altAnswers": [
      "8.67",
      "8.66",
      "26/3",
      "8.7"
    ],
    "trace": [
      {
        "step": "1",
        "line": "P1 대기시간",
        "desc": "도착 즉시 실행 -> 0 ms"
      },
      {
        "step": "2",
        "line": "P2 대기시간",
        "desc": "P1 실행 끝날 때까지 대기 -> 10 ms"
      },
      {
        "step": "3",
        "line": "P3 대기시간",
        "desc": "P1(10) + P2(6) 끝날 때까지 대기 -> 16 ms"
      },
      {
        "step": "4",
        "line": "평균 대기시간",
        "desc": "(0 + 10 + 16) / 3 = 26 / 3 = 약 8.67 ms"
      }
    ],
    "explanation": "도착 순서대로 실행되므로 P1 대기 0ms, P2 대기 10ms, P3 대기 16ms입니다. 총 대기시간 26ms를 프로세스 수 3으로 나누면 $\\frac{26}{3} \\approx 8.67$ms입니다.",
    "tip": "하치와레: 먼저 온 순서대로 줄서는 FCFS! (0 + 10 + 16) / 3 = 8.67이야!",
    "character": "hachiware"
  }
];
