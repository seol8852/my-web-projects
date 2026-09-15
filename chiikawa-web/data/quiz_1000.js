/**
 * 정보처리기사 실기 객관식 1,000문제 정규 데이터베이스 (Lv 1 ~ 100, 레벨당 10문제)
 * 1~4번 균등 무작위 정답 배치 완료
 */
const QUIZ_1000_DATA = {
  "1": [
    {
      "id": 1,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.1 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '폭포수 모델(Waterfall Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다."
      ],
      "answer": 3,
      "explanation": "폭포수 모델은 이전 단계가 완전히 종료된 후 다음 단계로 넘어가는 선형 순차적 모델입니다."
    },
    {
      "id": 2,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.1 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 3,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.1 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 4,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.1 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 5,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.1 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "우연적 응집도(Coincidental Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "기능적 응집도(Functional Cohesion)"
      ],
      "answer": 3,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 6,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.1 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 7,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.1 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 8,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.1 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 9,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.1 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 10,
      "level": 1,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.1 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "2": [
    {
      "id": 11,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.2 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '나선형 모델(Spiral Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다."
      ],
      "answer": 1,
      "explanation": "나선형 모델은 계획수립, 위험분석, 개발/검증, 고객평가의 4개 단계를 반복하여 대규모 프로젝트 위험을 줄입니다."
    },
    {
      "id": 12,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.2 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 13,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.2 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 14,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.2 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 15,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.2 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "기능적 응집도(Functional Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "논리적 응집도(Logical Cohesion)"
      ],
      "answer": 0,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 16,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.2 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 17,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.2 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 18,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.2 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 19,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.2 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 20,
      "level": 2,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.2 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "3": [
    {
      "id": 21,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.3 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '애자일 방법론(Agile)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다."
      ],
      "answer": 1,
      "explanation": "애자일 방법론은 변화에 기민하게 대응하며 작동하는 소프트웨어를 짧은 주기로 반복 전달하는 방식입니다."
    },
    {
      "id": 22,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.3 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 23,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.3 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 24,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.3 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 25,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.3 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "논리적 응집도(Logical Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "시간적 응집도(Temporal Cohesion)"
      ],
      "answer": 1,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 26,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.3 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 27,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.3 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 28,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.3 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 29,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.3 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 30,
      "level": 3,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.3 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "4": [
    {
      "id": 31,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.4 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '프로토타입 모델'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다."
      ],
      "answer": 2,
      "explanation": "프로토타입 모델은 사용자의 요구사항을 파악하기 위해 실제 작동 가능한 시제품을 빠르게 제작해보는 방식입니다."
    },
    {
      "id": 32,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.4 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 33,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.4 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 34,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.4 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 35,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.4 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "우연적 응집도(Coincidental Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "시간적 응집도(Temporal Cohesion)"
      ],
      "answer": 2,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 36,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.4 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 37,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.4 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 38,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.4 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "Kerberos",
        "SAML 1.0",
        "RADIUS"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 39,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.4 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 40,
      "level": 4,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.4 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "5": [
    {
      "id": 41,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.5 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '폭포수 모델(Waterfall Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다."
      ],
      "answer": 2,
      "explanation": "폭포수 모델은 이전 단계가 완전히 종료된 후 다음 단계로 넘어가는 선형 순차적 모델입니다."
    },
    {
      "id": 42,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.5 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 43,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.5 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 44,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.5 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "Kerberos",
        "SAML 1.0"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 45,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.5 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "우연적 응집도(Coincidental Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "논리적 응집도(Logical Cohesion)"
      ],
      "answer": 1,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 46,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.5 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 47,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.5 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 48,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.5 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 49,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.5 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 50,
      "level": 5,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.5 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "6": [
    {
      "id": 51,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.6 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '나선형 모델(Spiral Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다."
      ],
      "answer": 1,
      "explanation": "나선형 모델은 계획수립, 위험분석, 개발/검증, 고객평가의 4개 단계를 반복하여 대규모 프로젝트 위험을 줄입니다."
    },
    {
      "id": 52,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.6 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 53,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.6 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 54,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.6 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "Kerberos",
        "RADIUS",
        "SAML 1.0"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 55,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.6 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "시간적 응집도(Temporal Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "우연적 응집도(Coincidental Cohesion)"
      ],
      "answer": 1,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 56,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.6 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 57,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.6 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 58,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.6 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 59,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.6 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 60,
      "level": 6,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.6 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "7": [
    {
      "id": 61,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.7 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '애자일 방법론(Agile)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다."
      ],
      "answer": 1,
      "explanation": "애자일 방법론은 변화에 기민하게 대응하며 작동하는 소프트웨어를 짧은 주기로 반복 전달하는 방식입니다."
    },
    {
      "id": 62,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.7 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 63,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.7 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 64,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.7 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 65,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.7 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "시간적 응집도(Temporal Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "우연적 응집도(Coincidental Cohesion)"
      ],
      "answer": 1,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 66,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.7 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 67,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.7 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)",
        "DMZ"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 68,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.7 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "SAML 1.0",
        "Kerberos",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 69,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.7 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 70,
      "level": 7,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.7 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "8": [
    {
      "id": 71,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.8 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '프로토타입 모델'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다."
      ],
      "answer": 2,
      "explanation": "프로토타입 모델은 사용자의 요구사항을 파악하기 위해 실제 작동 가능한 시제품을 빠르게 제작해보는 방식입니다."
    },
    {
      "id": 72,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.8 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 73,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.8 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "DMZ",
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 74,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.8 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "OAuth 2.0",
        "RADIUS",
        "SAML 1.0"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 75,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.8 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "시간적 응집도(Temporal Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "논리적 응집도(Logical Cohesion)"
      ],
      "answer": 1,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 76,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.8 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 77,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.8 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 78,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.8 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 79,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.8 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 80,
      "level": 8,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.8 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "9": [
    {
      "id": 81,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.9 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '폭포수 모델(Waterfall Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다."
      ],
      "answer": 1,
      "explanation": "폭포수 모델은 이전 단계가 완전히 종료된 후 다음 단계로 넘어가는 선형 순차적 모델입니다."
    },
    {
      "id": 82,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.9 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 83,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.9 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 84,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.9 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 85,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.9 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "시간적 응집도(Temporal Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "우연적 응집도(Coincidental Cohesion)"
      ],
      "answer": 2,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 86,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.9 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 87,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.9 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 88,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.9 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "Kerberos",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 89,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.9 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 90,
      "level": 9,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.9 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "10": [
    {
      "id": 91,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.10 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '나선형 모델(Spiral Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다."
      ],
      "answer": 3,
      "explanation": "나선형 모델은 계획수립, 위험분석, 개발/검증, 고객평가의 4개 단계를 반복하여 대규모 프로젝트 위험을 줄입니다."
    },
    {
      "id": 92,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.10 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 93,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.10 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 94,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.10 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "Kerberos",
        "RADIUS",
        "SAML 1.0"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 95,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.10 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "기능적 응집도(Functional Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "우연적 응집도(Coincidental Cohesion)"
      ],
      "answer": 0,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 96,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.10 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 97,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.10 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 98,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.10 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "Kerberos",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 99,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.10 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 100,
      "level": 10,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.10 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "11": [
    {
      "id": 101,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.11 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '애자일 방법론(Agile)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다."
      ],
      "answer": 3,
      "explanation": "애자일 방법론은 변화에 기민하게 대응하며 작동하는 소프트웨어를 짧은 주기로 반복 전달하는 방식입니다."
    },
    {
      "id": 102,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.11 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 103,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.11 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 104,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.11 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "OAuth 2.0",
        "RADIUS",
        "SAML 1.0"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 105,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.11 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "우연적 응집도(Coincidental Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "기능적 응집도(Functional Cohesion)"
      ],
      "answer": 3,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 106,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.11 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 107,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.11 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 108,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.11 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 109,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.11 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 110,
      "level": 11,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.11 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "12": [
    {
      "id": 111,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.12 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '프로토타입 모델'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다."
      ],
      "answer": 0,
      "explanation": "프로토타입 모델은 사용자의 요구사항을 파악하기 위해 실제 작동 가능한 시제품을 빠르게 제작해보는 방식입니다."
    },
    {
      "id": 112,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.12 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 113,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.12 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 114,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.12 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 115,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.12 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "논리적 응집도(Logical Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "기능적 응집도(Functional Cohesion)"
      ],
      "answer": 3,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 116,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.12 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 117,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.12 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 118,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.12 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 119,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.12 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 120,
      "level": 12,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.12 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "13": [
    {
      "id": 121,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.13 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '폭포수 모델(Waterfall Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다."
      ],
      "answer": 1,
      "explanation": "폭포수 모델은 이전 단계가 완전히 종료된 후 다음 단계로 넘어가는 선형 순차적 모델입니다."
    },
    {
      "id": 122,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.13 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 123,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.13 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 124,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.13 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 125,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.13 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "논리적 응집도(Logical Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "시간적 응집도(Temporal Cohesion)"
      ],
      "answer": 2,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 126,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.13 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 127,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.13 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 128,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.13 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 129,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.13 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 130,
      "level": 13,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.13 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "14": [
    {
      "id": 131,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.14 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '나선형 모델(Spiral Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다."
      ],
      "answer": 1,
      "explanation": "나선형 모델은 계획수립, 위험분석, 개발/검증, 고객평가의 4개 단계를 반복하여 대규모 프로젝트 위험을 줄입니다."
    },
    {
      "id": 132,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.14 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 133,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.14 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 134,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.14 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 135,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.14 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "기능적 응집도(Functional Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "논리적 응집도(Logical Cohesion)"
      ],
      "answer": 0,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 136,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.14 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 137,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.14 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 138,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.14 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 139,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.14 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 140,
      "level": 14,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.14 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "15": [
    {
      "id": 141,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.15 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '애자일 방법론(Agile)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다."
      ],
      "answer": 3,
      "explanation": "애자일 방법론은 변화에 기민하게 대응하며 작동하는 소프트웨어를 짧은 주기로 반복 전달하는 방식입니다."
    },
    {
      "id": 142,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.15 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 143,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.15 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 144,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.15 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "RADIUS",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 145,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.15 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "논리적 응집도(Logical Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "우연적 응집도(Coincidental Cohesion)"
      ],
      "answer": 2,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 146,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.15 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 147,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.15 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "DMZ",
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 148,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.15 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 149,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.15 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 150,
      "level": 15,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.15 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "16": [
    {
      "id": 151,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.16 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '프로토타입 모델'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다."
      ],
      "answer": 1,
      "explanation": "프로토타입 모델은 사용자의 요구사항을 파악하기 위해 실제 작동 가능한 시제품을 빠르게 제작해보는 방식입니다."
    },
    {
      "id": 152,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.16 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 153,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.16 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 154,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.16 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 155,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.16 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "시간적 응집도(Temporal Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "우연적 응집도(Coincidental Cohesion)"
      ],
      "answer": 2,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 156,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.16 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 157,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.16 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 158,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.16 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 159,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.16 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 160,
      "level": 16,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.16 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "17": [
    {
      "id": 161,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.17 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '폭포수 모델(Waterfall Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다."
      ],
      "answer": 3,
      "explanation": "폭포수 모델은 이전 단계가 완전히 종료된 후 다음 단계로 넘어가는 선형 순차적 모델입니다."
    },
    {
      "id": 162,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.17 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 163,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.17 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 164,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.17 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 165,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.17 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "기능적 응집도(Functional Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "시간적 응집도(Temporal Cohesion)"
      ],
      "answer": 0,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 166,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.17 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 167,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.17 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 168,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.17 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 169,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.17 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 170,
      "level": 17,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.17 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "18": [
    {
      "id": 171,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.18 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '나선형 모델(Spiral Model)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다."
      ],
      "answer": 1,
      "explanation": "나선형 모델은 계획수립, 위험분석, 개발/검증, 고객평가의 4개 단계를 반복하여 대규모 프로젝트 위험을 줄입니다."
    },
    {
      "id": 172,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.18 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 173,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.18 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 174,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.18 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 175,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.18 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "우연적 응집도(Coincidental Cohesion)",
        "기능적 응집도(Functional Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "시간적 응집도(Temporal Cohesion)"
      ],
      "answer": 1,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 176,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.18 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 177,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.18 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)",
        "DMZ"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 178,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.18 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 179,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.18 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 180,
      "level": 18,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.18 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "19": [
    {
      "id": 181,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.19 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '애자일 방법론(Agile)'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다."
      ],
      "answer": 3,
      "explanation": "애자일 방법론은 변화에 기민하게 대응하며 작동하는 소프트웨어를 짧은 주기로 반복 전달하는 방식입니다."
    },
    {
      "id": 182,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.19 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 183,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.19 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 184,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.19 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 185,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.19 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "기능적 응집도(Functional Cohesion)",
        "논리적 응집도(Logical Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "시간적 응집도(Temporal Cohesion)"
      ],
      "answer": 0,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 186,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.19 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 187,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.19 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 188,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.19 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "SAML 1.0",
        "Kerberos",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 189,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.19 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 190,
      "level": 19,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.19 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "20": [
    {
      "id": 191,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "SDLC & 애자일 방법론",
      "question": "[Lv.20 - SDLC/애자일] 소프트웨어 개발 생명주기 모델 중 '프로토타입 모델'에 대한 설명으로 가장 올바른 것은?",
      "options": [
        "요구사항 도출을 위해 핵심 기능만 동작하는 견본품을 조기에 제작하여 고객 피드백을 수렴한다.",
        "개발 주기마다 '위험 분석(Risk Analysis)' 단계를 거쳐 프로젝트 실패 위험을 체계적으로 최소화한다.",
        "각 단계가 순차적으로 완료된 후 다음 단계로만 이행하며 요구사항 변경이 어려운 전통적 모델이다.",
        "방대한 문서보다 작동하는 소프트웨어와 고객과의 지속적인 협력 및 변화 대응을 최우선으로 한다."
      ],
      "answer": 0,
      "explanation": "프로토타입 모델은 사용자의 요구사항을 파악하기 위해 실제 작동 가능한 시제품을 빠르게 제작해보는 방식입니다."
    },
    {
      "id": 192,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "요구사항 공학 및 유스케이스",
      "question": "[Lv.20 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 193,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "UML 정적 모델링 (클래스/패키지)",
      "question": "[Lv.20 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 194,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "UML 동적 모델링 (시퀀스/상태/액티비티)",
      "question": "[Lv.20 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 195,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "모듈화 원칙 (결합도 & 응집도)",
      "question": "[Lv.20 - 응집도] 모듈 내부의 요소들이 단 하나의 단일 기능만을 수행하도록 구성되어, 가장 응집도가 높은(품질이 가장 우수한) 응집도는?",
      "options": [
        "논리적 응집도(Logical Cohesion)",
        "시간적 응집도(Temporal Cohesion)",
        "우연적 응집도(Coincidental Cohesion)",
        "기능적 응집도(Functional Cohesion)"
      ],
      "answer": 3,
      "explanation": "기능적 응집도(Functional Cohesion)는 모듈 내 모든 요소가 단일 목적을 위해 협력하는 가장 바람직하고 강한 응집도입니다. (응집도 순서: 기능적 > 순차적 > 통신적 > 절차적 > 시간적 > 논리적 > 우연적)"
    },
    {
      "id": 196,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "아키텍처 패턴 (MVC, 계층형, 파이프-필터)",
      "question": "[Lv.20 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 197,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 생성 패턴",
      "question": "[Lv.20 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)",
        "DMZ",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 198,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 구조 패턴",
      "question": "[Lv.20 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "Kerberos",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 199,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "GoF 디자인 패턴 - 행위 패턴",
      "question": "[Lv.20 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 200,
      "level": 20,
      "category": "소프트웨어 설계",
      "topic": "UI/UX 설계 원칙 및 프로토타이핑",
      "question": "[Lv.20 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "21": [
    {
      "id": 201,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.21 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 202,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.21 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 203,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.21 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "심층 방어 (Defense in Depth)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 204,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.21 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 205,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.21 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 206,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.21 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제2정규형 (2NF)'에 대한 정확한 정의는?",
      "options": [
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다."
      ],
      "answer": 3,
      "explanation": "제2정규형 (2NF)의 핵심 조건은 '기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 207,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.21 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "CHECKPOINT",
        "ROLLBACK",
        "SAVEPOINT",
        "COMMIT"
      ],
      "answer": 3,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 208,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.21 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;"
      ],
      "answer": 3,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 209,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.21 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);"
      ],
      "answer": 0,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 210,
      "level": 21,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.21 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "22": [
    {
      "id": 211,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.22 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 212,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.22 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 213,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.22 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 214,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.22 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 215,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.22 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 216,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.22 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제3정규형 (3NF)'에 대한 정확한 정의는?",
      "options": [
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다."
      ],
      "answer": 1,
      "explanation": "제3정규형 (3NF)의 핵심 조건은 '기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 217,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.22 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "CHECKPOINT",
        "SAVEPOINT",
        "ROLLBACK",
        "COMMIT"
      ],
      "answer": 3,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 218,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.22 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;"
      ],
      "answer": 0,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 219,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.22 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);"
      ],
      "answer": 2,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 220,
      "level": 22,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.22 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "23": [
    {
      "id": 221,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.23 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 222,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.23 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 223,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.23 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 224,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.23 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 225,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.23 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 226,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.23 - 정규화] 관계형 데이터베이스 정규화 과정 중 '보이스-코드 정규형 (BCNF)'에 대한 정확한 정의는?",
      "options": [
        "모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다."
      ],
      "answer": 0,
      "explanation": "보이스-코드 정규형 (BCNF)의 핵심 조건은 '모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 227,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.23 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "ROLLBACK",
        "SAVEPOINT",
        "COMMIT",
        "CHECKPOINT"
      ],
      "answer": 2,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 228,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.23 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;"
      ],
      "answer": 2,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 229,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.23 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 0,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 230,
      "level": 23,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.23 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "24": [
    {
      "id": 231,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.24 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 232,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.24 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 233,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.24 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 234,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.24 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 235,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.24 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 236,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.24 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제1정규형 (1NF)'에 대한 정확한 정의는?",
      "options": [
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다."
      ],
      "answer": 2,
      "explanation": "제1정규형 (1NF)의 핵심 조건은 '도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 237,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.24 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "COMMIT",
        "ROLLBACK",
        "CHECKPOINT",
        "SAVEPOINT"
      ],
      "answer": 0,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 238,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.24 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;"
      ],
      "answer": 3,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 239,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.24 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 1,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 240,
      "level": 24,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.24 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "25": [
    {
      "id": 241,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.25 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 242,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.25 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 243,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.25 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)",
        "DMZ"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 244,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.25 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "RADIUS",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 245,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.25 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 246,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.25 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제2정규형 (2NF)'에 대한 정확한 정의는?",
      "options": [
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다."
      ],
      "answer": 3,
      "explanation": "제2정규형 (2NF)의 핵심 조건은 '기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 247,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.25 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "SAVEPOINT",
        "ROLLBACK",
        "CHECKPOINT",
        "COMMIT"
      ],
      "answer": 3,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 248,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.25 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;"
      ],
      "answer": 2,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 249,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.25 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 2,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 250,
      "level": 25,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.25 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "26": [
    {
      "id": 251,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.26 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 252,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.26 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 253,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.26 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 0,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 254,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.26 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "OAuth 2.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 255,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.26 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 256,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.26 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제3정규형 (3NF)'에 대한 정확한 정의는?",
      "options": [
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다."
      ],
      "answer": 1,
      "explanation": "제3정규형 (3NF)의 핵심 조건은 '기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 257,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.26 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "CHECKPOINT",
        "SAVEPOINT",
        "COMMIT",
        "ROLLBACK"
      ],
      "answer": 2,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 258,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.26 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;"
      ],
      "answer": 3,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 259,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.26 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);"
      ],
      "answer": 0,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 260,
      "level": 26,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.26 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "27": [
    {
      "id": 261,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.27 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 262,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.27 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 263,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.27 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 264,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.27 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 265,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.27 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 266,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.27 - 정규화] 관계형 데이터베이스 정규화 과정 중 '보이스-코드 정규형 (BCNF)'에 대한 정확한 정의는?",
      "options": [
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다."
      ],
      "answer": 3,
      "explanation": "보이스-코드 정규형 (BCNF)의 핵심 조건은 '모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 267,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.27 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "COMMIT",
        "ROLLBACK",
        "CHECKPOINT",
        "SAVEPOINT"
      ],
      "answer": 0,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 268,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.27 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;"
      ],
      "answer": 2,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 269,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.27 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);"
      ],
      "answer": 0,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 270,
      "level": 27,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.27 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "28": [
    {
      "id": 271,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.28 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 272,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.28 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 273,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.28 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 274,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.28 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "Kerberos",
        "SAML 1.0"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 275,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.28 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 276,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.28 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제1정규형 (1NF)'에 대한 정확한 정의는?",
      "options": [
        "도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다."
      ],
      "answer": 0,
      "explanation": "제1정규형 (1NF)의 핵심 조건은 '도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 277,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.28 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "CHECKPOINT",
        "ROLLBACK",
        "COMMIT",
        "SAVEPOINT"
      ],
      "answer": 2,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 278,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.28 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;"
      ],
      "answer": 2,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 279,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.28 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);"
      ],
      "answer": 0,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 280,
      "level": 28,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.28 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "29": [
    {
      "id": 281,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.29 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 282,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.29 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 283,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.29 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 284,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.29 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "RADIUS",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 285,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.29 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 286,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.29 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제2정규형 (2NF)'에 대한 정확한 정의는?",
      "options": [
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다."
      ],
      "answer": 1,
      "explanation": "제2정규형 (2NF)의 핵심 조건은 '기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 287,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.29 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "COMMIT",
        "CHECKPOINT",
        "SAVEPOINT",
        "ROLLBACK"
      ],
      "answer": 0,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 288,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.29 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;"
      ],
      "answer": 0,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 289,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.29 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 3,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 290,
      "level": 29,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.29 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "30": [
    {
      "id": 291,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.30 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 292,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.30 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 293,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.30 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 294,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.30 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 295,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.30 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 296,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.30 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제3정규형 (3NF)'에 대한 정확한 정의는?",
      "options": [
        "기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다."
      ],
      "answer": 0,
      "explanation": "제3정규형 (3NF)의 핵심 조건은 '기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 297,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.30 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "COMMIT",
        "CHECKPOINT",
        "ROLLBACK",
        "SAVEPOINT"
      ],
      "answer": 0,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 298,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.30 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;"
      ],
      "answer": 2,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 299,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.30 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 1,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 300,
      "level": 30,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.30 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "31": [
    {
      "id": 301,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.31 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 302,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.31 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 303,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.31 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 304,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.31 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "Kerberos",
        "SAML 1.0",
        "RADIUS"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 305,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.31 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 306,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.31 - 정규화] 관계형 데이터베이스 정규화 과정 중 '보이스-코드 정규형 (BCNF)'에 대한 정확한 정의는?",
      "options": [
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다."
      ],
      "answer": 1,
      "explanation": "보이스-코드 정규형 (BCNF)의 핵심 조건은 '모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 307,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.31 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "SAVEPOINT",
        "ROLLBACK",
        "COMMIT",
        "CHECKPOINT"
      ],
      "answer": 2,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 308,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.31 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;"
      ],
      "answer": 3,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 309,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.31 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);"
      ],
      "answer": 1,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 310,
      "level": 31,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.31 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "32": [
    {
      "id": 311,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.32 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 312,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.32 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 313,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.32 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 314,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.32 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "OAuth 2.0",
        "Kerberos",
        "RADIUS"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 315,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.32 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 316,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.32 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제1정규형 (1NF)'에 대한 정확한 정의는?",
      "options": [
        "도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다."
      ],
      "answer": 0,
      "explanation": "제1정규형 (1NF)의 핵심 조건은 '도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 317,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.32 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "CHECKPOINT",
        "SAVEPOINT",
        "ROLLBACK",
        "COMMIT"
      ],
      "answer": 3,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 318,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.32 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;"
      ],
      "answer": 0,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 319,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.32 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 3,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 320,
      "level": 32,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.32 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "33": [
    {
      "id": 321,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.33 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 322,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.33 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 323,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.33 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "DMZ"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 324,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.33 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 325,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.33 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 326,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.33 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제2정규형 (2NF)'에 대한 정확한 정의는?",
      "options": [
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다."
      ],
      "answer": 1,
      "explanation": "제2정규형 (2NF)의 핵심 조건은 '기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 327,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.33 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "COMMIT",
        "CHECKPOINT",
        "SAVEPOINT",
        "ROLLBACK"
      ],
      "answer": 0,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 328,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.33 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;"
      ],
      "answer": 2,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 329,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.33 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 3,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 330,
      "level": 33,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.33 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "34": [
    {
      "id": 331,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.34 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 332,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.34 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 333,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.34 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)",
        "심층 방어 (Defense in Depth)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 334,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.34 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 335,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.34 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 336,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.34 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제3정규형 (3NF)'에 대한 정확한 정의는?",
      "options": [
        "기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다."
      ],
      "answer": 0,
      "explanation": "제3정규형 (3NF)의 핵심 조건은 '기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 337,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.34 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "COMMIT",
        "SAVEPOINT",
        "CHECKPOINT",
        "ROLLBACK"
      ],
      "answer": 0,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 338,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.34 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;"
      ],
      "answer": 3,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 339,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.34 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);"
      ],
      "answer": 0,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 340,
      "level": 34,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.34 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "35": [
    {
      "id": 341,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.35 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 342,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.35 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 343,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.35 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 344,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.35 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "OAuth 2.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 345,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.35 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 346,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.35 - 정규화] 관계형 데이터베이스 정규화 과정 중 '보이스-코드 정규형 (BCNF)'에 대한 정확한 정의는?",
      "options": [
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다."
      ],
      "answer": 1,
      "explanation": "보이스-코드 정규형 (BCNF)의 핵심 조건은 '모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 347,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.35 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "ROLLBACK",
        "COMMIT",
        "CHECKPOINT",
        "SAVEPOINT"
      ],
      "answer": 1,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 348,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.35 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;"
      ],
      "answer": 3,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 349,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.35 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);"
      ],
      "answer": 2,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 350,
      "level": 35,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.35 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "36": [
    {
      "id": 351,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.36 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 352,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.36 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 353,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.36 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "DMZ",
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)"
      ],
      "answer": 3,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 354,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.36 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 355,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.36 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 356,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.36 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제1정규형 (1NF)'에 대한 정확한 정의는?",
      "options": [
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다."
      ],
      "answer": 3,
      "explanation": "제1정규형 (1NF)의 핵심 조건은 '도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 357,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.36 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "COMMIT",
        "SAVEPOINT",
        "ROLLBACK",
        "CHECKPOINT"
      ],
      "answer": 0,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 358,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.36 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;"
      ],
      "answer": 0,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 359,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.36 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 3,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 360,
      "level": 36,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.36 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "37": [
    {
      "id": 361,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.37 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 362,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.37 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 363,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.37 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)",
        "DMZ"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 364,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.37 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 365,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.37 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 366,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.37 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제2정규형 (2NF)'에 대한 정확한 정의는?",
      "options": [
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다."
      ],
      "answer": 1,
      "explanation": "제2정규형 (2NF)의 핵심 조건은 '기본키의 진부분집합에 종속되는 부분 함수 종속성을 제거하고 완전 함수 종속을 만족시킨다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 367,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.37 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "COMMIT",
        "SAVEPOINT",
        "ROLLBACK",
        "CHECKPOINT"
      ],
      "answer": 0,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 368,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.37 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;"
      ],
      "answer": 1,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 369,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.37 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);"
      ],
      "answer": 1,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 370,
      "level": 37,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.37 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "38": [
    {
      "id": 371,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.38 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 372,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.38 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 373,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.38 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "경계선 보안 (Perimeter Security)",
        "제로 트러스트 (Zero Trust)",
        "DMZ",
        "심층 방어 (Defense in Depth)"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 374,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.38 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 375,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.38 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 376,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.38 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제3정규형 (3NF)'에 대한 정확한 정의는?",
      "options": [
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다."
      ],
      "answer": 2,
      "explanation": "제3정규형 (3NF)의 핵심 조건은 '기본키가 아닌 일반 속성 간의 이행적 함수 종속(A->B, B->C)을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 377,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.38 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "ROLLBACK",
        "CHECKPOINT",
        "SAVEPOINT",
        "COMMIT"
      ],
      "answer": 3,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 378,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.38 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;"
      ],
      "answer": 3,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 379,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.38 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 2,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 380,
      "level": 38,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.38 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "39": [
    {
      "id": 381,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.39 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 382,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.39 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 383,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.39 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "DMZ",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)"
      ],
      "answer": 2,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 384,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.39 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 385,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.39 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 386,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.39 - 정규화] 관계형 데이터베이스 정규화 과정 중 '보이스-코드 정규형 (BCNF)'에 대한 정확한 정의는?",
      "options": [
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다."
      ],
      "answer": 2,
      "explanation": "보이스-코드 정규형 (BCNF)의 핵심 조건은 '모든 결정자(Determinant)가 후보키(Candidate Key)가 되도록 분해한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 387,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.39 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "SAVEPOINT",
        "ROLLBACK",
        "CHECKPOINT",
        "COMMIT"
      ],
      "answer": 3,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 388,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.39 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;",
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;"
      ],
      "answer": 3,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 389,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.39 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);",
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);"
      ],
      "answer": 3,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 390,
      "level": 39,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.39 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "40": [
    {
      "id": 391,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "데이터베이스 개념 및 3단계 스키마",
      "question": "[Lv.40 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 392,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "개체-관계(E-R) 모델 및 다이어그램",
      "question": "[Lv.40 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 393,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "관계 데이터 모델 및 키(Key)의 종류",
      "question": "[Lv.40 - 신기술/클라우드] '아무것도 신뢰하지 않고 모든 접근을 검증한다(Never Trust, Always Verify)'는 원칙에 기반한 최신 사이버 보안 아키텍처는?",
      "options": [
        "심층 방어 (Defense in Depth)",
        "제로 트러스트 (Zero Trust)",
        "경계선 보안 (Perimeter Security)",
        "DMZ"
      ],
      "answer": 1,
      "explanation": "제로 트러스트(Zero Trust)는 내부망과 외부망의 경계를 믿지 않고 모든 접속 요청에 대해 지속적인 신원 인증과 최소 권한을 부여하는 보안 모델입니다."
    },
    {
      "id": 394,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "무결성 제약조건 (개체, 참조, 도메인)",
      "question": "[Lv.40 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 395,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "관계대수 (순수 관계연산자 & 집합연산자)",
      "question": "[Lv.40 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 396,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "정규화 이론 (1NF ~ BCNF ~ 5NF) 및 이상현상",
      "question": "[Lv.40 - 정규화] 관계형 데이터베이스 정규화 과정 중 '제1정규형 (1NF)'에 대한 정확한 정의는?",
      "options": [
        "도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.",
        "테이블의 모든 튜플을 파일 시스템으로 분할하여 병렬 입출력을 수행한다.",
        "조인 연산의 성능만을 위해 모든 테이블을 비정규화하고 중복을 허용한다.",
        "다치 종속(MVD) 및 조인 종속(JD)을 만족시키기 위해 기본키를 인덱스로 변환한다."
      ],
      "answer": 0,
      "explanation": "제1정규형 (1NF)의 핵심 조건은 '도메인이 원자값(Atomic Value)만으로 구성되도록 반복 그룹을 제거한다.'입니다. (정규화 단계: 1NF 원자값 -> 2NF 부분함수종속 제거 -> 3NF 이행함수종속 제거 -> BCNF 결정자 후보키 -> 4NF 다치종속 -> 5NF 조인종속)"
    },
    {
      "id": 397,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "SQL DDL (CREATE, ALTER, DROP, TRUNCATE)",
      "question": "[Lv.40 - SQL/트랜잭션] 트랜잭션이 성공적으로 완료되어 데이터베이스에 변경 사항을 영구 반영하는 SQL 명령어는?",
      "options": [
        "SAVEPOINT",
        "ROLLBACK",
        "CHECKPOINT",
        "COMMIT"
      ],
      "answer": 3,
      "explanation": "COMMIT은 트랜잭션 내의 모든 작업이 정상적으로 완료되었음을 확정하고 DB에 영구 반영하는 제어어입니다."
    },
    {
      "id": 398,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "SQL DML (SELECT, INSERT, UPDATE, DELETE)",
      "question": "[Lv.40 - SQL/트랜잭션] 사용자에게 특정 테이블의 SELECT 및 INSERT 권한을 부여하는 올바른 DCL 구문은?",
      "options": [
        "GIVE RIGHTS SELECT ON 학생 TO 홍길동;",
        "ALLOW ACCESS TO 학생 USER 홍길동;",
        "GRANT SELECT, INSERT ON 학생 TO 홍길동;",
        "PERMIT SELECT, INSERT ON 학생 FOR 홍길동;"
      ],
      "answer": 2,
      "explanation": "권한 부여는 GRANT 권한 ON 대상객체 TO 사용자 [WITH GRANT OPTION]; 구문을 사용합니다."
    },
    {
      "id": 399,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "SQL DCL & 트랜잭션 ACID 특성",
      "question": "[Lv.40 - SQL/트랜잭션] 기존 테이블에 새로운 컬럼(연락처 VARCHAR(20))을 추가하는 올바른 SQL문은?",
      "options": [
        "ALTER TABLE 학생 ADD 연락처 VARCHAR(20);",
        "UPDATE TABLE 학생 ADD 연락처 VARCHAR(20);",
        "INSERT INTO 학생 COLUMN 연락처 VARCHAR(20);",
        "MODIFY TABLE 학생 INSERT 연락처 VARCHAR(20);"
      ],
      "answer": 0,
      "explanation": "테이블의 구조를 변경(컬럼 추가/수정/삭제)할 때는 DDL인 ALTER TABLE ... ADD/MODIFY/DROP 문을 사용합니다."
    },
    {
      "id": 400,
      "level": 40,
      "category": "데이터베이스 구축",
      "topic": "뷰(VIEW), 인덱스(INDEX) 및 회복 기법",
      "question": "[Lv.40 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "41": [
    {
      "id": 401,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.41 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 8; int *p = &a; *p += 3; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "11",
        "8",
        "3",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 3 연산은 변수 a의 값(8)에 3를 직접 더하여 a의 최종값은 11가 됩니다."
    },
    {
      "id": 402,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.41 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 5; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "20",
        "5",
        "14",
        "15"
      ],
      "answer": 3,
      "explanation": "1부터 5까지 1씩 증가하며 sum에 누적하므로 1+5의 총합은 15입니다."
    },
    {
      "id": 403,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.41 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 14, y = 7;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "7",
        "14",
        "7",
        "21"
      ],
      "answer": 0,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |14 - 7| = 7가 출력됩니다."
    },
    {
      "id": 404,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.41 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 2; int *p = &a; *p += 9; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "11",
        "9",
        "포인터 메모리 주소값",
        "2"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 9 연산은 변수 a의 값(2)에 9를 직접 더하여 a의 최종값은 11가 됩니다."
    },
    {
      "id": 405,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.41 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 11; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "11",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(11)이 실행됩니다."
    },
    {
      "id": 406,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.41 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 16; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "컴파일 에러 발생",
        "10",
        "16"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(16)이 실행됩니다."
    },
    {
      "id": 407,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.41 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 21; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "21",
        "10",
        "NullPointerException",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(21)이 실행됩니다."
    },
    {
      "id": 408,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.41 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "210",
        "90",
        "20"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 409,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.41 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "30",
        "3",
        "120"
      ],
      "answer": 3,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 410,
      "level": 41,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.41 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "42": [
    {
      "id": 411,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.42 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 10; int *p = &a; *p += 4; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "10",
        "포인터 메모리 주소값",
        "14",
        "4"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 4 연산은 변수 a의 값(10)에 4를 직접 더하여 a의 최종값은 14가 됩니다."
    },
    {
      "id": 412,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.42 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 6; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "27",
        "21",
        "6",
        "20"
      ],
      "answer": 1,
      "explanation": "1부터 6까지 1씩 증가하며 sum에 누적하므로 1+6의 총합은 21입니다."
    },
    {
      "id": 413,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.42 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 1, y = 8;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "7",
        "1",
        "9",
        "8"
      ],
      "answer": 0,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |1 - 8| = 7가 출력됩니다."
    },
    {
      "id": 414,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.42 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 4; int *p = &a; *p += 10; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "10",
        "4",
        "14"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 10 연산은 변수 a의 값(4)에 10를 직접 더하여 a의 최종값은 14가 됩니다."
    },
    {
      "id": 415,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.42 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 12; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "12",
        "컴파일 에러 발생"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(12)이 실행됩니다."
    },
    {
      "id": 416,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.42 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 17; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "17",
        "NullPointerException",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(17)이 실행됩니다."
    },
    {
      "id": 417,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.42 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 22; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "NullPointerException",
        "22",
        "10"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(22)이 실행됩니다."
    },
    {
      "id": 418,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.42 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "210",
        "90",
        "20"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 419,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.42 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "30",
        "120",
        "3",
        "210"
      ],
      "answer": 1,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 420,
      "level": 42,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.42 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "43": [
    {
      "id": 421,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.43 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 12; int *p = &a; *p += 5; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "17",
        "12",
        "포인터 메모리 주소값",
        "5"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 5 연산은 변수 a의 값(12)에 5를 직접 더하여 a의 최종값은 17가 됩니다."
    },
    {
      "id": 422,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.43 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 7; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "7",
        "28",
        "35",
        "27"
      ],
      "answer": 1,
      "explanation": "1부터 7까지 1씩 증가하며 sum에 누적하므로 1+7의 총합은 28입니다."
    },
    {
      "id": 423,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.43 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 3, y = 9;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "3",
        "9",
        "6",
        "12"
      ],
      "answer": 2,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |3 - 9| = 6가 출력됩니다."
    },
    {
      "id": 424,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.43 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 6; int *p = &a; *p += 11; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "6",
        "11",
        "포인터 메모리 주소값",
        "17"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 11 연산은 변수 a의 값(6)에 11를 직접 더하여 a의 최종값은 17가 됩니다."
    },
    {
      "id": 425,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.43 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 13; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "컴파일 에러 발생",
        "13"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(13)이 실행됩니다."
    },
    {
      "id": 426,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.43 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 18; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "18",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(18)이 실행됩니다."
    },
    {
      "id": 427,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.43 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 23; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "23",
        "컴파일 에러 발생"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(23)이 실행됩니다."
    },
    {
      "id": 428,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.43 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "90",
        "210",
        "3",
        "20"
      ],
      "answer": 0,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 429,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.43 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "30",
        "3",
        "120"
      ],
      "answer": 3,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 430,
      "level": 43,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.43 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "44": [
    {
      "id": 431,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.44 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 14; int *p = &a; *p += 6; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "6",
        "14",
        "20"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 6 연산은 변수 a의 값(14)에 6를 직접 더하여 a의 최종값은 20가 됩니다."
    },
    {
      "id": 432,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.44 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 8; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "36",
        "35",
        "44",
        "8"
      ],
      "answer": 0,
      "explanation": "1부터 8까지 1씩 증가하며 sum에 누적하므로 1+8의 총합은 36입니다."
    },
    {
      "id": 433,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.44 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 5, y = 10;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "5",
        "5",
        "15",
        "10"
      ],
      "answer": 0,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |5 - 10| = 5가 출력됩니다."
    },
    {
      "id": 434,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.44 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 8; int *p = &a; *p += 2; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "2",
        "8",
        "10"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 2 연산은 변수 a의 값(8)에 2를 직접 더하여 a의 최종값은 10가 됩니다."
    },
    {
      "id": 435,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.44 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 14; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "컴파일 에러 발생",
        "10",
        "14"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(14)이 실행됩니다."
    },
    {
      "id": 436,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.44 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 19; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "19",
        "컴파일 에러 발생"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(19)이 실행됩니다."
    },
    {
      "id": 437,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.44 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 24; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "24",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(24)이 실행됩니다."
    },
    {
      "id": 438,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.44 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "210",
        "3",
        "90"
      ],
      "answer": 3,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 439,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.44 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "30",
        "3",
        "120",
        "210"
      ],
      "answer": 2,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 440,
      "level": 44,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.44 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "45": [
    {
      "id": 441,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.45 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 1; int *p = &a; *p += 7; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "7",
        "1",
        "8"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 7 연산은 변수 a의 값(1)에 7를 직접 더하여 a의 최종값은 8가 됩니다."
    },
    {
      "id": 442,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.45 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 9; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "44",
        "9",
        "45",
        "54"
      ],
      "answer": 2,
      "explanation": "1부터 9까지 1씩 증가하며 sum에 누적하므로 1+9의 총합은 45입니다."
    },
    {
      "id": 443,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.45 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 7, y = 11;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "4",
        "11",
        "7",
        "18"
      ],
      "answer": 0,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |7 - 11| = 4가 출력됩니다."
    },
    {
      "id": 444,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.45 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 10; int *p = &a; *p += 3; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "3",
        "포인터 메모리 주소값",
        "10",
        "13"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 3 연산은 변수 a의 값(10)에 3를 직접 더하여 a의 최종값은 13가 됩니다."
    },
    {
      "id": 445,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.45 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 15; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "10",
        "15",
        "NullPointerException"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(15)이 실행됩니다."
    },
    {
      "id": 446,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.45 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 20; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "컴파일 에러 발생",
        "10",
        "20"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(20)이 실행됩니다."
    },
    {
      "id": 447,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.45 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 25; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "25",
        "10",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(25)이 실행됩니다."
    },
    {
      "id": 448,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.45 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "210",
        "90",
        "20"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 449,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.45 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "30",
        "3",
        "210",
        "120"
      ],
      "answer": 3,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 450,
      "level": 45,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.45 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "46": [
    {
      "id": 451,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.46 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 3; int *p = &a; *p += 8; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "8",
        "포인터 메모리 주소값",
        "3",
        "11"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 8 연산은 변수 a의 값(3)에 8를 직접 더하여 a의 최종값은 11가 됩니다."
    },
    {
      "id": 452,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.46 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 10; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "55",
        "54",
        "10",
        "65"
      ],
      "answer": 0,
      "explanation": "1부터 10까지 1씩 증가하며 sum에 누적하므로 1+10의 총합은 55입니다."
    },
    {
      "id": 453,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.46 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 9, y = 2;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "2",
        "9",
        "11",
        "7"
      ],
      "answer": 3,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |9 - 2| = 7가 출력됩니다."
    },
    {
      "id": 454,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.46 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 12; int *p = &a; *p += 4; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "12",
        "16",
        "4"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 4 연산은 변수 a의 값(12)에 4를 직접 더하여 a의 최종값은 16가 됩니다."
    },
    {
      "id": 455,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.46 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 16; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "컴파일 에러 발생",
        "16",
        "10"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(16)이 실행됩니다."
    },
    {
      "id": 456,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.46 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 21; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "21",
        "컴파일 에러 발생",
        "NullPointerException",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(21)이 실행됩니다."
    },
    {
      "id": 457,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.46 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 26; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "컴파일 에러 발생",
        "26",
        "10"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(26)이 실행됩니다."
    },
    {
      "id": 458,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.46 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "90",
        "3",
        "210"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 459,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.46 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "120",
        "30",
        "210"
      ],
      "answer": 1,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 460,
      "level": 46,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.46 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "47": [
    {
      "id": 461,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.47 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 5; int *p = &a; *p += 9; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "14",
        "5",
        "9",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 9 연산은 변수 a의 값(5)에 9를 직접 더하여 a의 최종값은 14가 됩니다."
    },
    {
      "id": 462,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.47 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 11; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "66",
        "77",
        "11",
        "65"
      ],
      "answer": 0,
      "explanation": "1부터 11까지 1씩 증가하며 sum에 누적하므로 1+11의 총합은 66입니다."
    },
    {
      "id": 463,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.47 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 11, y = 3;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "11",
        "8",
        "3",
        "14"
      ],
      "answer": 1,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |11 - 3| = 8가 출력됩니다."
    },
    {
      "id": 464,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.47 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 14; int *p = &a; *p += 5; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "19",
        "5",
        "14",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 5 연산은 변수 a의 값(14)에 5를 직접 더하여 a의 최종값은 19가 됩니다."
    },
    {
      "id": 465,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.47 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 17; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "17",
        "NullPointerException",
        "컴파일 에러 발생"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(17)이 실행됩니다."
    },
    {
      "id": 466,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.47 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 22; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "22",
        "NullPointerException",
        "컴파일 에러 발생"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(22)이 실행됩니다."
    },
    {
      "id": 467,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.47 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 27; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "27",
        "NullPointerException",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(27)이 실행됩니다."
    },
    {
      "id": 468,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.47 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "210",
        "3",
        "90"
      ],
      "answer": 3,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 469,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.47 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "3",
        "120",
        "30"
      ],
      "answer": 2,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 470,
      "level": 47,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.47 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "48": [
    {
      "id": 471,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.48 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 7; int *p = &a; *p += 10; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "7",
        "17",
        "10",
        "포인터 메모리 주소값"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 10 연산은 변수 a의 값(7)에 10를 직접 더하여 a의 최종값은 17가 됩니다."
    },
    {
      "id": 472,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.48 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 2; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "3",
        "5",
        "2",
        "2"
      ],
      "answer": 0,
      "explanation": "1부터 2까지 1씩 증가하며 sum에 누적하므로 1+2의 총합은 3입니다."
    },
    {
      "id": 473,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.48 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 13, y = 4;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "13",
        "4",
        "9",
        "17"
      ],
      "answer": 2,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |13 - 4| = 9가 출력됩니다."
    },
    {
      "id": 474,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.48 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 1; int *p = &a; *p += 6; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "6",
        "포인터 메모리 주소값",
        "1",
        "7"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 6 연산은 변수 a의 값(1)에 6를 직접 더하여 a의 최종값은 7가 됩니다."
    },
    {
      "id": 475,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.48 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 18; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "컴파일 에러 발생",
        "18",
        "10"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(18)이 실행됩니다."
    },
    {
      "id": 476,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.48 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 23; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "23",
        "10",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(23)이 실행됩니다."
    },
    {
      "id": 477,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.48 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 28; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "28",
        "NullPointerException",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(28)이 실행됩니다."
    },
    {
      "id": 478,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.48 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "90",
        "20",
        "210",
        "3"
      ],
      "answer": 0,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 479,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.48 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "210",
        "30",
        "120"
      ],
      "answer": 3,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 480,
      "level": 48,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.48 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "49": [
    {
      "id": 481,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.49 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 9; int *p = &a; *p += 11; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "20",
        "11",
        "9",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 11 연산은 변수 a의 값(9)에 11를 직접 더하여 a의 최종값은 20가 됩니다."
    },
    {
      "id": 482,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.49 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 3; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "5",
        "6",
        "3",
        "9"
      ],
      "answer": 1,
      "explanation": "1부터 3까지 1씩 증가하며 sum에 누적하므로 1+3의 총합은 6입니다."
    },
    {
      "id": 483,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.49 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 15, y = 5;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "10",
        "15",
        "5",
        "20"
      ],
      "answer": 0,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |15 - 5| = 10가 출력됩니다."
    },
    {
      "id": 484,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.49 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 3; int *p = &a; *p += 7; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "3",
        "7",
        "10",
        "포인터 메모리 주소값"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 7 연산은 변수 a의 값(3)에 7를 직접 더하여 a의 최종값은 10가 됩니다."
    },
    {
      "id": 485,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.49 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 19; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "19",
        "10",
        "NullPointerException",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(19)이 실행됩니다."
    },
    {
      "id": 486,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.49 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 24; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "24",
        "컴파일 에러 발생"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(24)이 실행됩니다."
    },
    {
      "id": 487,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.49 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 29; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "29",
        "10",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(29)이 실행됩니다."
    },
    {
      "id": 488,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.49 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "20",
        "210",
        "90"
      ],
      "answer": 3,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 489,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.49 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "30",
        "3",
        "120",
        "210"
      ],
      "answer": 2,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 490,
      "level": 49,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.49 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "50": [
    {
      "id": 491,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.50 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 11; int *p = &a; *p += 2; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "2",
        "13",
        "11"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 2 연산은 변수 a의 값(11)에 2를 직접 더하여 a의 최종값은 13가 됩니다."
    },
    {
      "id": 492,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.50 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 4; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "14",
        "4",
        "10",
        "9"
      ],
      "answer": 2,
      "explanation": "1부터 4까지 1씩 증가하며 sum에 누적하므로 1+4의 총합은 10입니다."
    },
    {
      "id": 493,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.50 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 2, y = 6;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "8",
        "4",
        "6",
        "2"
      ],
      "answer": 1,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |2 - 6| = 4가 출력됩니다."
    },
    {
      "id": 494,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.50 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 5; int *p = &a; *p += 8; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "5",
        "8",
        "13",
        "포인터 메모리 주소값"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 8 연산은 변수 a의 값(5)에 8를 직접 더하여 a의 최종값은 13가 됩니다."
    },
    {
      "id": 495,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.50 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 20; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "20",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(20)이 실행됩니다."
    },
    {
      "id": 496,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.50 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 25; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "10",
        "25",
        "NullPointerException"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(25)이 실행됩니다."
    },
    {
      "id": 497,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.50 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 30; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "30",
        "NullPointerException",
        "컴파일 에러 발생"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(30)이 실행됩니다."
    },
    {
      "id": 498,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.50 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "90",
        "210",
        "20",
        "3"
      ],
      "answer": 0,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 499,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.50 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "30",
        "120",
        "3"
      ],
      "answer": 2,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 500,
      "level": 50,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.50 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "51": [
    {
      "id": 501,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.51 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 13; int *p = &a; *p += 3; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "16",
        "13",
        "포인터 메모리 주소값",
        "3"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 3 연산은 변수 a의 값(13)에 3를 직접 더하여 a의 최종값은 16가 됩니다."
    },
    {
      "id": 502,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.51 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 5; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "15",
        "14",
        "20",
        "5"
      ],
      "answer": 0,
      "explanation": "1부터 5까지 1씩 증가하며 sum에 누적하므로 1+5의 총합은 15입니다."
    },
    {
      "id": 503,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.51 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 4, y = 7;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "11",
        "4",
        "3",
        "7"
      ],
      "answer": 2,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |4 - 7| = 3가 출력됩니다."
    },
    {
      "id": 504,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.51 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 7; int *p = &a; *p += 9; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "9",
        "16",
        "포인터 메모리 주소값",
        "7"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 9 연산은 변수 a의 값(7)에 9를 직접 더하여 a의 최종값은 16가 됩니다."
    },
    {
      "id": 505,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.51 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 21; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "21",
        "10",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(21)이 실행됩니다."
    },
    {
      "id": 506,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.51 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 26; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "NullPointerException",
        "10",
        "26"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(26)이 실행됩니다."
    },
    {
      "id": 507,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.51 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 31; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "31",
        "컴파일 에러 발생",
        "NullPointerException",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(31)이 실행됩니다."
    },
    {
      "id": 508,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.51 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "90",
        "3",
        "210"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 509,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.51 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "120",
        "30",
        "3",
        "210"
      ],
      "answer": 0,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 510,
      "level": 51,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.51 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "52": [
    {
      "id": 511,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.52 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 15; int *p = &a; *p += 4; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "19",
        "15",
        "4",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 4 연산은 변수 a의 값(15)에 4를 직접 더하여 a의 최종값은 19가 됩니다."
    },
    {
      "id": 512,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.52 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 6; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "20",
        "21",
        "6",
        "27"
      ],
      "answer": 1,
      "explanation": "1부터 6까지 1씩 증가하며 sum에 누적하므로 1+6의 총합은 21입니다."
    },
    {
      "id": 513,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.52 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 6, y = 8;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "14",
        "8",
        "2",
        "6"
      ],
      "answer": 2,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |6 - 8| = 2가 출력됩니다."
    },
    {
      "id": 514,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.52 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 9; int *p = &a; *p += 10; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "9",
        "19",
        "10"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 10 연산은 변수 a의 값(9)에 10를 직접 더하여 a의 최종값은 19가 됩니다."
    },
    {
      "id": 515,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.52 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 22; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "컴파일 에러 발생",
        "22",
        "10"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(22)이 실행됩니다."
    },
    {
      "id": 516,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.52 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 27; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "27",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(27)이 실행됩니다."
    },
    {
      "id": 517,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.52 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 32; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "32",
        "10",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(32)이 실행됩니다."
    },
    {
      "id": 518,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.52 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "210",
        "3",
        "90"
      ],
      "answer": 3,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 519,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.52 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "30",
        "3",
        "120",
        "210"
      ],
      "answer": 2,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 520,
      "level": 52,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.52 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "53": [
    {
      "id": 521,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.53 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 2; int *p = &a; *p += 5; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "2",
        "포인터 메모리 주소값",
        "7",
        "5"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 5 연산은 변수 a의 값(2)에 5를 직접 더하여 a의 최종값은 7가 됩니다."
    },
    {
      "id": 522,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.53 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 7; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "28",
        "27",
        "7",
        "35"
      ],
      "answer": 0,
      "explanation": "1부터 7까지 1씩 증가하며 sum에 누적하므로 1+7의 총합은 28입니다."
    },
    {
      "id": 523,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.53 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 8, y = 9;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "8",
        "17",
        "9",
        "1"
      ],
      "answer": 3,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |8 - 9| = 1가 출력됩니다."
    },
    {
      "id": 524,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.53 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 11; int *p = &a; *p += 11; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "11",
        "포인터 메모리 주소값",
        "11",
        "22"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 11 연산은 변수 a의 값(11)에 11를 직접 더하여 a의 최종값은 22가 됩니다."
    },
    {
      "id": 525,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.53 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 23; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "23",
        "컴파일 에러 발생",
        "NullPointerException",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(23)이 실행됩니다."
    },
    {
      "id": 526,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.53 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 28; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "컴파일 에러 발생",
        "28"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(28)이 실행됩니다."
    },
    {
      "id": 527,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.53 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 33; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "33",
        "NullPointerException",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(33)이 실행됩니다."
    },
    {
      "id": 528,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.53 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "90",
        "20",
        "210"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 529,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.53 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "3",
        "120",
        "30"
      ],
      "answer": 2,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 530,
      "level": 53,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.53 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "54": [
    {
      "id": 531,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.54 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 4; int *p = &a; *p += 6; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "10",
        "6",
        "4",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 6 연산은 변수 a의 값(4)에 6를 직접 더하여 a의 최종값은 10가 됩니다."
    },
    {
      "id": 532,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.54 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 8; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "35",
        "8",
        "44",
        "36"
      ],
      "answer": 3,
      "explanation": "1부터 8까지 1씩 증가하며 sum에 누적하므로 1+8의 총합은 36입니다."
    },
    {
      "id": 533,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.54 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 10, y = 10;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "20",
        "10",
        "0",
        "10"
      ],
      "answer": 2,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |10 - 10| = 0가 출력됩니다."
    },
    {
      "id": 534,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.54 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 13; int *p = &a; *p += 2; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "13",
        "포인터 메모리 주소값",
        "15",
        "2"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 2 연산은 변수 a의 값(13)에 2를 직접 더하여 a의 최종값은 15가 됩니다."
    },
    {
      "id": 535,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.54 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 24; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "24",
        "10",
        "NullPointerException",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(24)이 실행됩니다."
    },
    {
      "id": 536,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.54 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 29; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "29",
        "NullPointerException",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(29)이 실행됩니다."
    },
    {
      "id": 537,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.54 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 34; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "34",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(34)이 실행됩니다."
    },
    {
      "id": 538,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.54 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "3",
        "90",
        "210"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 539,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.54 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "30",
        "3",
        "210",
        "120"
      ],
      "answer": 3,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 540,
      "level": 54,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.54 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "55": [
    {
      "id": 541,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.55 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 6; int *p = &a; *p += 7; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "13",
        "포인터 메모리 주소값",
        "6",
        "7"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 7 연산은 변수 a의 값(6)에 7를 직접 더하여 a의 최종값은 13가 됩니다."
    },
    {
      "id": 542,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.55 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 9; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "44",
        "45",
        "54",
        "9"
      ],
      "answer": 1,
      "explanation": "1부터 9까지 1씩 증가하며 sum에 누적하므로 1+9의 총합은 45입니다."
    },
    {
      "id": 543,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.55 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 12, y = 11;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "1",
        "12",
        "11",
        "23"
      ],
      "answer": 0,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |12 - 11| = 1가 출력됩니다."
    },
    {
      "id": 544,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.55 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 15; int *p = &a; *p += 3; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "15",
        "3",
        "18"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 3 연산은 변수 a의 값(15)에 3를 직접 더하여 a의 최종값은 18가 됩니다."
    },
    {
      "id": 545,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.55 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 25; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "25",
        "컴파일 에러 발생"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(25)이 실행됩니다."
    },
    {
      "id": 546,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.55 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 30; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "30",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(30)이 실행됩니다."
    },
    {
      "id": 547,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.55 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 35; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "35",
        "10",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(35)이 실행됩니다."
    },
    {
      "id": 548,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.55 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "90",
        "210",
        "20",
        "3"
      ],
      "answer": 0,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 549,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.55 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "120",
        "210",
        "3",
        "30"
      ],
      "answer": 0,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 550,
      "level": 55,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.55 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "56": [
    {
      "id": 551,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.56 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 8; int *p = &a; *p += 8; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "8",
        "포인터 메모리 주소값",
        "8",
        "16"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 8 연산은 변수 a의 값(8)에 8를 직접 더하여 a의 최종값은 16가 됩니다."
    },
    {
      "id": 552,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.56 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 10; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "10",
        "55",
        "65",
        "54"
      ],
      "answer": 1,
      "explanation": "1부터 10까지 1씩 증가하며 sum에 누적하므로 1+10의 총합은 55입니다."
    },
    {
      "id": 553,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.56 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 14, y = 2;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "2",
        "14",
        "16",
        "12"
      ],
      "answer": 3,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |14 - 2| = 12가 출력됩니다."
    },
    {
      "id": 554,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.56 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 2; int *p = &a; *p += 4; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "6",
        "포인터 메모리 주소값",
        "2",
        "4"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 4 연산은 변수 a의 값(2)에 4를 직접 더하여 a의 최종값은 6가 됩니다."
    },
    {
      "id": 555,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.56 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 26; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "26",
        "NullPointerException",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(26)이 실행됩니다."
    },
    {
      "id": 556,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.56 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 31; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "31",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(31)이 실행됩니다."
    },
    {
      "id": 557,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.56 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 36; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "36",
        "10",
        "NullPointerException",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(36)이 실행됩니다."
    },
    {
      "id": 558,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.56 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "90",
        "3",
        "20"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 559,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.56 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "210",
        "30",
        "120"
      ],
      "answer": 3,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 560,
      "level": 56,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.56 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "57": [
    {
      "id": 561,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.57 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 10; int *p = &a; *p += 9; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "9",
        "10",
        "포인터 메모리 주소값",
        "19"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 9 연산은 변수 a의 값(10)에 9를 직접 더하여 a의 최종값은 19가 됩니다."
    },
    {
      "id": 562,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.57 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 11; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "77",
        "65",
        "11",
        "66"
      ],
      "answer": 3,
      "explanation": "1부터 11까지 1씩 증가하며 sum에 누적하므로 1+11의 총합은 66입니다."
    },
    {
      "id": 563,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.57 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 1, y = 3;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "2",
        "3",
        "1",
        "4"
      ],
      "answer": 0,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |1 - 3| = 2가 출력됩니다."
    },
    {
      "id": 564,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.57 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 4; int *p = &a; *p += 5; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "9",
        "4",
        "5"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 5 연산은 변수 a의 값(4)에 5를 직접 더하여 a의 최종값은 9가 됩니다."
    },
    {
      "id": 565,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.57 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 27; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "27",
        "NullPointerException",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(27)이 실행됩니다."
    },
    {
      "id": 566,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.57 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 32; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "32",
        "NullPointerException",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(32)이 실행됩니다."
    },
    {
      "id": 567,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.57 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 37; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "컴파일 에러 발생",
        "37"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(37)이 실행됩니다."
    },
    {
      "id": 568,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.57 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "90",
        "3",
        "210",
        "20"
      ],
      "answer": 0,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 569,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.57 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "3",
        "120",
        "30"
      ],
      "answer": 2,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 570,
      "level": 57,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.57 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "58": [
    {
      "id": 571,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.58 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 12; int *p = &a; *p += 10; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "22",
        "12",
        "10",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 10 연산은 변수 a의 값(12)에 10를 직접 더하여 a의 최종값은 22가 됩니다."
    },
    {
      "id": 572,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.58 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 2; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "2",
        "2",
        "5",
        "3"
      ],
      "answer": 3,
      "explanation": "1부터 2까지 1씩 증가하며 sum에 누적하므로 1+2의 총합은 3입니다."
    },
    {
      "id": 573,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.58 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 3, y = 4;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "3",
        "7",
        "1",
        "4"
      ],
      "answer": 2,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |3 - 4| = 1가 출력됩니다."
    },
    {
      "id": 574,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.58 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 6; int *p = &a; *p += 6; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "6",
        "6",
        "12",
        "포인터 메모리 주소값"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 6 연산은 변수 a의 값(6)에 6를 직접 더하여 a의 최종값은 12가 됩니다."
    },
    {
      "id": 575,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.58 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 28; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "NullPointerException",
        "28",
        "10"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(28)이 실행됩니다."
    },
    {
      "id": 576,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.58 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 33; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "33",
        "NullPointerException",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(33)이 실행됩니다."
    },
    {
      "id": 577,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.58 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 38; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "컴파일 에러 발생",
        "38"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(38)이 실행됩니다."
    },
    {
      "id": 578,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.58 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "90",
        "3",
        "20"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 579,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.58 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "120",
        "210",
        "30"
      ],
      "answer": 1,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 580,
      "level": 58,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.58 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "59": [
    {
      "id": 581,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.59 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 14; int *p = &a; *p += 11; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "14",
        "11",
        "포인터 메모리 주소값",
        "25"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 11 연산은 변수 a의 값(14)에 11를 직접 더하여 a의 최종값은 25가 됩니다."
    },
    {
      "id": 582,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.59 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 3; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "5",
        "6",
        "3",
        "9"
      ],
      "answer": 1,
      "explanation": "1부터 3까지 1씩 증가하며 sum에 누적하므로 1+3의 총합은 6입니다."
    },
    {
      "id": 583,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.59 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 5, y = 5;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "0",
        "10",
        "5",
        "5"
      ],
      "answer": 0,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |5 - 5| = 0가 출력됩니다."
    },
    {
      "id": 584,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.59 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 8; int *p = &a; *p += 7; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "8",
        "15",
        "7",
        "포인터 메모리 주소값"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 7 연산은 변수 a의 값(8)에 7를 직접 더하여 a의 최종값은 15가 됩니다."
    },
    {
      "id": 585,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.59 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 29; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "10",
        "NullPointerException",
        "29"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(29)이 실행됩니다."
    },
    {
      "id": 586,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.59 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 34; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "34",
        "10",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(34)이 실행됩니다."
    },
    {
      "id": 587,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.59 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 39; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "39",
        "10",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(39)이 실행됩니다."
    },
    {
      "id": 588,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.59 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "90",
        "3",
        "210"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 589,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.59 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "120",
        "30",
        "210",
        "3"
      ],
      "answer": 0,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 590,
      "level": 59,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.59 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "60": [
    {
      "id": 591,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 문법 및 입출력 (printf, scanf)",
      "question": "[Lv.60 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 1; int *p = &a; *p += 2; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "2",
        "3",
        "포인터 메모리 주소값",
        "1"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 2 연산은 변수 a의 값(1)에 2를 직접 더하여 a의 최종값은 3가 됩니다."
    },
    {
      "id": 592,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 제어문 (if-else, switch-case, for, while)",
      "question": "[Lv.60 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 4; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "14",
        "4",
        "9",
        "10"
      ],
      "answer": 3,
      "explanation": "1부터 4까지 1씩 증가하며 sum에 누적하므로 1+4의 총합은 10입니다."
    },
    {
      "id": 593,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 1차원 및 2차원 배열 연산",
      "question": "[Lv.60 - C언어 삼항 연산자] 다음 C 프로그램의 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int x = 7, y = 6;\n    int result = (x > y) ? (x - y) : (y - x);\n    printf(\"%d\", result);\n    return 0;\n}\n```",
      "options": [
        "13",
        "6",
        "1",
        "7"
      ],
      "answer": 2,
      "explanation": "조건 (x > y)에 따라 큰 값에서 작은 값을 뺀 절대 차이 |7 - 6| = 1가 출력됩니다."
    },
    {
      "id": 594,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "C언어 기본 포인터 연산 및 주소값",
      "question": "[Lv.60 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 10; int *p = &a; *p += 8; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "10",
        "18",
        "포인터 메모리 주소값",
        "8"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 8 연산은 변수 a의 값(10)에 8를 직접 더하여 a의 최종값은 18가 됩니다."
    },
    {
      "id": 595,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 클래스, 객체 생성 및 생성자(Constructor)",
      "question": "[Lv.60 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 30; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "30",
        "10",
        "NullPointerException",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(30)이 실행됩니다."
    },
    {
      "id": 596,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 접근 제어자 및 static/final 키워드",
      "question": "[Lv.60 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 35; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "NullPointerException",
        "10",
        "35"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(35)이 실행됩니다."
    },
    {
      "id": 597,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "Java 메소드 오버로딩 (Overloading)",
      "question": "[Lv.60 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 10; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(10)이 실행됩니다."
    },
    {
      "id": 598,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 기본 자료형 및 리스트(List) 연산",
      "question": "[Lv.60 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "3",
        "20",
        "90"
      ],
      "answer": 3,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 599,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "Python 튜플, 딕셔너리 및 문자열 슬라이싱",
      "question": "[Lv.60 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[2:5]\nprint(sum(sub))\n```",
      "options": [
        "30",
        "3",
        "120",
        "210"
      ],
      "answer": 2,
      "explanation": "nums[2:5] 슬라이싱 결과는 [30, 40, 50]이며, sum() 내장 함수를 취하면 총합은 120이 됩니다."
    },
    {
      "id": 600,
      "level": 60,
      "category": "프로그래밍 언어 활용",
      "topic": "기본 알고리즘 (버블정렬, 선택정렬, 소수판별)",
      "question": "[Lv.60 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "61": [
    {
      "id": 601,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.61 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 602,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.61 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 603,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.61 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)",
        "FCFS(First-Come First-Served)",
        "HRN(Highest Response-ratio Next)"
      ],
      "answer": 3,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 604,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.61 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 605,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.61 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "물리 계층(Physical Layer)",
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 0,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 606,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.61 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 607,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.61 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "네트워크 계층(Network Layer)",
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 0,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 608,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.61 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 609,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.61 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 610,
      "level": 61,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.61 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "62": [
    {
      "id": 611,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.62 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 612,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.62 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)"
      ],
      "answer": 1,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 613,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.62 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)",
        "HRN(Highest Response-ratio Next)",
        "Round Robin(RR)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 614,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.62 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 615,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.62 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)",
        "물리 계층(Physical Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 2,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 616,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.62 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 617,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.62 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "네트워크 계층(Network Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 2,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 618,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.62 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 619,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.62 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 620,
      "level": 62,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.62 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "63": [
    {
      "id": 621,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.63 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 622,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.63 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 623,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.63 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 624,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.63 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 625,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.63 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "물리 계층(Physical Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 0,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 626,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.63 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 627,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.63 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)",
        "세션 계층(Session Layer)",
        "네트워크 계층(Network Layer)"
      ],
      "answer": 3,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 628,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.63 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 629,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.63 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 630,
      "level": 63,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.63 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "64": [
    {
      "id": 631,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.64 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 632,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.64 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)",
        "FCFS(First-Come First-Served)",
        "HRN(Highest Response-ratio Next)"
      ],
      "answer": 3,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 633,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.64 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)"
      ],
      "answer": 1,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 634,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.64 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 635,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.64 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "물리 계층(Physical Layer)",
        "응용 계층(Application Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)"
      ],
      "answer": 0,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 636,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.64 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 637,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.64 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)",
        "네트워크 계층(Network Layer)"
      ],
      "answer": 3,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 638,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.64 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "RADIUS",
        "Kerberos",
        "SAML 1.0"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 639,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.64 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 640,
      "level": 64,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.64 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "65": [
    {
      "id": 641,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.65 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 642,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.65 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 643,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.65 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 644,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.65 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 645,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.65 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "물리 계층(Physical Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)"
      ],
      "answer": 1,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 646,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.65 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 647,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.65 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "네트워크 계층(Network Layer)"
      ],
      "answer": 3,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 648,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.65 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "OAuth 2.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 649,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.65 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 650,
      "level": 65,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.65 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "66": [
    {
      "id": 651,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.66 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 652,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.66 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)",
        "HRN(Highest Response-ratio Next)"
      ],
      "answer": 3,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 653,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.66 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 654,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.66 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 655,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.66 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "물리 계층(Physical Layer)",
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 1,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 656,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.66 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 657,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.66 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)",
        "네트워크 계층(Network Layer)"
      ],
      "answer": 3,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 658,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.66 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "RADIUS",
        "Kerberos",
        "SAML 1.0"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 659,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.66 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 660,
      "level": 66,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.66 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "67": [
    {
      "id": 661,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.67 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 662,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.67 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 663,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.67 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 664,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.67 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 665,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.67 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "물리 계층(Physical Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)"
      ],
      "answer": 1,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 666,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.67 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 667,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.67 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "네트워크 계층(Network Layer)",
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)"
      ],
      "answer": 0,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 668,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.67 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 669,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.67 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 670,
      "level": 67,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.67 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "68": [
    {
      "id": 671,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.68 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 672,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.68 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 673,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.68 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 674,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.68 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 675,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.68 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)",
        "물리 계층(Physical Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 2,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 676,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.68 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 677,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.68 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)",
        "네트워크 계층(Network Layer)"
      ],
      "answer": 3,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 678,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.68 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 679,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.68 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 680,
      "level": 68,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.68 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "69": [
    {
      "id": 681,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.69 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 682,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.69 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "HRN(Highest Response-ratio Next)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 1,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 683,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.69 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 684,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.69 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 685,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.69 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)",
        "물리 계층(Physical Layer)"
      ],
      "answer": 3,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 686,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.69 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 687,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.69 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)",
        "네트워크 계층(Network Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 2,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 688,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.69 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 689,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.69 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 690,
      "level": 69,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.69 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "70": [
    {
      "id": 691,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.70 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 692,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.70 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)",
        "HRN(Highest Response-ratio Next)",
        "Round Robin(RR)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 693,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.70 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)",
        "HRN(Highest Response-ratio Next)",
        "Round Robin(RR)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 694,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.70 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "OAuth 2.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 695,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.70 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "물리 계층(Physical Layer)"
      ],
      "answer": 3,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 696,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.70 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 697,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.70 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "네트워크 계층(Network Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 0,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 698,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.70 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "Kerberos",
        "RADIUS"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 699,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.70 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 700,
      "level": 70,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.70 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "71": [
    {
      "id": 701,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.71 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 702,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.71 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "SRT(Shortest Remaining Time)",
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)"
      ],
      "answer": 1,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 703,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.71 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "Round Robin(RR)",
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 704,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.71 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "OAuth 2.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 705,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.71 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "물리 계층(Physical Layer)",
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)"
      ],
      "answer": 0,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 706,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.71 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 707,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.71 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "네트워크 계층(Network Layer)",
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 1,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 708,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.71 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "Kerberos",
        "RADIUS"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 709,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.71 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 710,
      "level": 71,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.71 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "72": [
    {
      "id": 711,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.72 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 712,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.72 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 713,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.72 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 714,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.72 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 715,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.72 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "물리 계층(Physical Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 0,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 716,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.72 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 717,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.72 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)",
        "네트워크 계층(Network Layer)"
      ],
      "answer": 3,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 718,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.72 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 719,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.72 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 720,
      "level": 72,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.72 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "73": [
    {
      "id": 721,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.73 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 722,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.73 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "Round Robin(RR)",
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 1,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 723,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.73 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 724,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.73 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 725,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.73 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)",
        "물리 계층(Physical Layer)"
      ],
      "answer": 3,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 726,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.73 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 727,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.73 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "네트워크 계층(Network Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)"
      ],
      "answer": 1,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 728,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.73 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 729,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.73 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 730,
      "level": 73,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.73 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "74": [
    {
      "id": 731,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.74 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 732,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.74 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "Round Robin(RR)",
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 1,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 733,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.74 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 734,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.74 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 735,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.74 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "물리 계층(Physical Layer)",
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 1,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 736,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.74 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 737,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.74 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "네트워크 계층(Network Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 0,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 738,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.74 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 739,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.74 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 740,
      "level": 74,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.74 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "75": [
    {
      "id": 741,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.75 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 742,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.75 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "HRN(Highest Response-ratio Next)"
      ],
      "answer": 3,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 743,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.75 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "HRN(Highest Response-ratio Next)"
      ],
      "answer": 3,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 744,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.75 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "OAuth 2.0",
        "Kerberos",
        "RADIUS"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 745,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.75 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "물리 계층(Physical Layer)",
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 1,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 746,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.75 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 747,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.75 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)",
        "네트워크 계층(Network Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 2,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 748,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.75 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 749,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.75 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 750,
      "level": 75,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.75 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "76": [
    {
      "id": 751,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.76 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 752,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.76 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)",
        "Round Robin(RR)",
        "HRN(Highest Response-ratio Next)"
      ],
      "answer": 3,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 753,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.76 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 754,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.76 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 755,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.76 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "물리 계층(Physical Layer)",
        "세션 계층(Session Layer)",
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)"
      ],
      "answer": 0,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 756,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.76 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 757,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.76 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)",
        "네트워크 계층(Network Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 2,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 758,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.76 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 759,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.76 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 760,
      "level": 76,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.76 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "77": [
    {
      "id": 761,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.77 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 762,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.77 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "Round Robin(RR)",
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 1,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 763,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.77 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "Round Robin(RR)",
        "HRN(Highest Response-ratio Next)",
        "FCFS(First-Come First-Served)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 1,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 764,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.77 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 765,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.77 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "물리 계층(Physical Layer)",
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 1,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 766,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.77 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 767,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.77 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)",
        "네트워크 계층(Network Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 2,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 768,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.77 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 769,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.77 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 770,
      "level": 77,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.77 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "78": [
    {
      "id": 771,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.78 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 772,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.78 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 773,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.78 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 774,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.78 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 775,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.78 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "세션 계층(Session Layer)",
        "물리 계층(Physical Layer)",
        "응용 계층(Application Layer)"
      ],
      "answer": 2,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 776,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.78 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 777,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.78 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "네트워크 계층(Network Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)"
      ],
      "answer": 1,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 778,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.78 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "Kerberos",
        "SAML 1.0"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 779,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.78 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 780,
      "level": 78,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.78 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "79": [
    {
      "id": 781,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.79 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 782,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.79 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "Round Robin(RR)",
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 783,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.79 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)",
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)"
      ],
      "answer": 0,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 784,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.79 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 785,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.79 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)",
        "물리 계층(Physical Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 2,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 786,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.79 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 787,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.79 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "응용 계층(Application Layer)",
        "네트워크 계층(Network Layer)"
      ],
      "answer": 3,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 788,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.79 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 789,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.79 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 790,
      "level": 79,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.79 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "80": [
    {
      "id": 791,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "운영체제 프로세스 상태 전이 및 PCB",
      "question": "[Lv.80 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 792,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "CPU 스케줄링 (FCFS, SJF, HRN, RR, SRT)",
      "question": "[Lv.80 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)",
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 793,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "교착상태(Deadlock) 4대 조건 및 해결 기법",
      "question": "[Lv.80 - 운영체제 스케줄링] CPU 스케줄링 알고리즘 중 SJF(Shortest Job First)의 긴 작업에 대한 '무한 대기(Starvation)' 현상을 방지하기 위해 대기 시간과 서비스(실행) 시간을 고려한 우선순위 계산식 ((대기시간+서비스시간)/서비스시간)을 사용하는 에이징(Aging) 기반 비선점 스케줄링은?",
      "options": [
        "FCFS(First-Come First-Served)",
        "Round Robin(RR)",
        "HRN(Highest Response-ratio Next)",
        "SRT(Shortest Remaining Time)"
      ],
      "answer": 2,
      "explanation": "HRN 스케줄링은 우선순위 = (대기 시간 + 서비스 시간) / 서비스 시간 공식을 사용하여, 대기 시간이 길어질수록 우선순위가 높아져 기아 현상을 방지합니다."
    },
    {
      "id": 794,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "가상기억장치 페이지 교체 (FIFO, LRU, LFU)",
      "question": "[Lv.80 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "RADIUS",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 795,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "OSI 7계층 및 TCP/IP 4계층 프로토콜",
      "question": "[Lv.80 - 네트워크 계층] OSI 7계층 참조 모델 중 '비트(Bit) 단위 전송, 리피터, 허브, 케이블'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "세션 계층(Session Layer)",
        "표현 계층(Presentation Layer)",
        "물리 계층(Physical Layer)"
      ],
      "answer": 3,
      "explanation": "물리 계층(Physical Layer)은 비트(Bit) 단위 전송, 리피터, 허브, 케이블의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 796,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "TCP (3-Way Handshake, 혼잡제어) vs UDP",
      "question": "[Lv.80 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    },
    {
      "id": 797,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "IP 주소 체계 (IPv4, IPv6) 및 서브넷팅 계산",
      "question": "[Lv.80 - 네트워크 계층] OSI 7계층 참조 모델 중 '패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜'을 담당하며 대표 장비로 동작하는 계층은?",
      "options": [
        "응용 계층(Application Layer)",
        "표현 계층(Presentation Layer)",
        "네트워크 계층(Network Layer)",
        "세션 계층(Session Layer)"
      ],
      "answer": 2,
      "explanation": "네트워크 계층(Network Layer)은 패킷(Packet) 단위 전송, IP 주소, 라우터, 라우팅 프로토콜의 전송 및 제어를 책임지는 핵심 계층입니다."
    },
    {
      "id": 798,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "라우팅 프로토콜 (RIP, OSPF, BGP)",
      "question": "[Lv.80 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "RADIUS",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 799,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 기법 (화이트박스 vs 블랙박스)",
      "question": "[Lv.80 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 800,
      "level": 80,
      "category": "시스템 & 네트워크 & 테스트",
      "topic": "소프트웨어 테스트 레벨 및 결함 관리",
      "question": "[Lv.80 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "81": [
    {
      "id": 801,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.81 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 13; int *p = &a; *p += 3; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "3",
        "16",
        "포인터 메모리 주소값",
        "13"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 3 연산은 변수 a의 값(13)에 3를 직접 더하여 a의 최종값은 16가 됩니다."
    },
    {
      "id": 802,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.81 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 5; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "14",
        "20",
        "5",
        "15"
      ],
      "answer": 3,
      "explanation": "1부터 5까지 1씩 증가하며 sum에 누적하므로 1+5의 총합은 15입니다."
    },
    {
      "id": 803,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.81 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 11; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "11",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(11)이 실행됩니다."
    },
    {
      "id": 804,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.81 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 16; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "컴파일 에러 발생",
        "16"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(16)이 실행됩니다."
    },
    {
      "id": 805,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.81 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "3",
        "90",
        "210"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 806,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.81 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "XSS (Cross-Site Scripting)",
        "SQL Injection",
        "DDoS",
        "스니핑(Sniffing)"
      ],
      "answer": 0,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 807,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.81 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "AES",
        "SEED",
        "DES",
        "RSA"
      ],
      "answer": 3,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 808,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.81 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 809,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.81 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 810,
      "level": 81,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.81 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "82": [
    {
      "id": 811,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.82 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 15; int *p = &a; *p += 4; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "4",
        "19",
        "포인터 메모리 주소값",
        "15"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 4 연산은 변수 a의 값(15)에 4를 직접 더하여 a의 최종값은 19가 됩니다."
    },
    {
      "id": 812,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.82 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 6; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "6",
        "21",
        "20",
        "27"
      ],
      "answer": 1,
      "explanation": "1부터 6까지 1씩 증가하며 sum에 누적하므로 1+6의 총합은 21입니다."
    },
    {
      "id": 813,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.82 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 12; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "10",
        "12",
        "NullPointerException"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(12)이 실행됩니다."
    },
    {
      "id": 814,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.82 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 17; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "17",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(17)이 실행됩니다."
    },
    {
      "id": 815,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.82 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "90",
        "210",
        "20",
        "3"
      ],
      "answer": 0,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 816,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.82 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "SQL Injection",
        "XSS (Cross-Site Scripting)",
        "DDoS",
        "스니핑(Sniffing)"
      ],
      "answer": 1,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 817,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.82 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "SEED",
        "AES",
        "DES",
        "RSA"
      ],
      "answer": 3,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 818,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.82 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 819,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.82 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 820,
      "level": 82,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.82 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "83": [
    {
      "id": 821,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.83 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 2; int *p = &a; *p += 5; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "7",
        "포인터 메모리 주소값",
        "2",
        "5"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 5 연산은 변수 a의 값(2)에 5를 직접 더하여 a의 최종값은 7가 됩니다."
    },
    {
      "id": 822,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.83 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 7; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "28",
        "27",
        "7",
        "35"
      ],
      "answer": 0,
      "explanation": "1부터 7까지 1씩 증가하며 sum에 누적하므로 1+7의 총합은 28입니다."
    },
    {
      "id": 823,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.83 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 13; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "10",
        "13",
        "NullPointerException"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(13)이 실행됩니다."
    },
    {
      "id": 824,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.83 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 18; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "컴파일 에러 발생",
        "18"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(18)이 실행됩니다."
    },
    {
      "id": 825,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.83 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "90",
        "20",
        "210"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 826,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.83 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "DDoS",
        "스니핑(Sniffing)",
        "SQL Injection",
        "XSS (Cross-Site Scripting)"
      ],
      "answer": 3,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 827,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.83 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "AES",
        "RSA",
        "DES",
        "SEED"
      ],
      "answer": 1,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 828,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.83 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "Kerberos",
        "SAML 1.0",
        "RADIUS"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 829,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.83 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 830,
      "level": 83,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.83 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "84": [
    {
      "id": 831,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.84 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 4; int *p = &a; *p += 6; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "4",
        "포인터 메모리 주소값",
        "10",
        "6"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 6 연산은 변수 a의 값(4)에 6를 직접 더하여 a의 최종값은 10가 됩니다."
    },
    {
      "id": 832,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.84 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 8; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "35",
        "44",
        "8",
        "36"
      ],
      "answer": 3,
      "explanation": "1부터 8까지 1씩 증가하며 sum에 누적하므로 1+8의 총합은 36입니다."
    },
    {
      "id": 833,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.84 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 14; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "14",
        "10",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(14)이 실행됩니다."
    },
    {
      "id": 834,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.84 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 19; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "컴파일 에러 발생",
        "NullPointerException",
        "19"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(19)이 실행됩니다."
    },
    {
      "id": 835,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.84 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "90",
        "3",
        "20"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 836,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.84 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "스니핑(Sniffing)",
        "XSS (Cross-Site Scripting)",
        "SQL Injection",
        "DDoS"
      ],
      "answer": 1,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 837,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.84 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "RSA",
        "SEED",
        "AES",
        "DES"
      ],
      "answer": 0,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 838,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.84 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "Kerberos",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 839,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.84 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 840,
      "level": 84,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.84 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "85": [
    {
      "id": 841,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.85 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 6; int *p = &a; *p += 7; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "13",
        "포인터 메모리 주소값",
        "6",
        "7"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 7 연산은 변수 a의 값(6)에 7를 직접 더하여 a의 최종값은 13가 됩니다."
    },
    {
      "id": 842,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.85 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 9; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "9",
        "44",
        "45",
        "54"
      ],
      "answer": 2,
      "explanation": "1부터 9까지 1씩 증가하며 sum에 누적하므로 1+9의 총합은 45입니다."
    },
    {
      "id": 843,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.85 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 15; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "15",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(15)이 실행됩니다."
    },
    {
      "id": 844,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.85 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 20; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "20",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(20)이 실행됩니다."
    },
    {
      "id": 845,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.85 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "90",
        "210",
        "20"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 846,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.85 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "SQL Injection",
        "XSS (Cross-Site Scripting)",
        "DDoS",
        "스니핑(Sniffing)"
      ],
      "answer": 1,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 847,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.85 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "AES",
        "DES",
        "RSA",
        "SEED"
      ],
      "answer": 2,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 848,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.85 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 849,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.85 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 850,
      "level": 85,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.85 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "86": [
    {
      "id": 851,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.86 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 8; int *p = &a; *p += 8; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "8",
        "16",
        "8",
        "포인터 메모리 주소값"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 8 연산은 변수 a의 값(8)에 8를 직접 더하여 a의 최종값은 16가 됩니다."
    },
    {
      "id": 852,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.86 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 10; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "10",
        "55",
        "65",
        "54"
      ],
      "answer": 1,
      "explanation": "1부터 10까지 1씩 증가하며 sum에 누적하므로 1+10의 총합은 55입니다."
    },
    {
      "id": 853,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.86 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 16; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "16",
        "10",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(16)이 실행됩니다."
    },
    {
      "id": 854,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.86 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 21; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "21",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(21)이 실행됩니다."
    },
    {
      "id": 855,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.86 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "90",
        "20",
        "3"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 856,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.86 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "XSS (Cross-Site Scripting)",
        "스니핑(Sniffing)",
        "SQL Injection",
        "DDoS"
      ],
      "answer": 0,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 857,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.86 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "DES",
        "RSA",
        "AES",
        "SEED"
      ],
      "answer": 1,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 858,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.86 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "Kerberos",
        "SAML 1.0"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 859,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.86 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 860,
      "level": 86,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.86 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "87": [
    {
      "id": 861,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.87 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 10; int *p = &a; *p += 9; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "9",
        "10",
        "19"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 9 연산은 변수 a의 값(10)에 9를 직접 더하여 a의 최종값은 19가 됩니다."
    },
    {
      "id": 862,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.87 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 11; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "66",
        "11",
        "65",
        "77"
      ],
      "answer": 0,
      "explanation": "1부터 11까지 1씩 증가하며 sum에 누적하므로 1+11의 총합은 66입니다."
    },
    {
      "id": 863,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.87 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 17; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "17",
        "NullPointerException",
        "10"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(17)이 실행됩니다."
    },
    {
      "id": 864,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.87 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 22; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "22",
        "10",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(22)이 실행됩니다."
    },
    {
      "id": 865,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.87 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "90",
        "210",
        "20",
        "3"
      ],
      "answer": 0,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 866,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.87 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "XSS (Cross-Site Scripting)",
        "SQL Injection",
        "DDoS",
        "스니핑(Sniffing)"
      ],
      "answer": 0,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 867,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.87 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "DES",
        "SEED",
        "AES",
        "RSA"
      ],
      "answer": 3,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 868,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.87 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 869,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.87 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 870,
      "level": 87,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.87 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "88": [
    {
      "id": 871,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.88 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 12; int *p = &a; *p += 10; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "12",
        "10",
        "포인터 메모리 주소값",
        "22"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 10 연산은 변수 a의 값(12)에 10를 직접 더하여 a의 최종값은 22가 됩니다."
    },
    {
      "id": 872,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.88 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 2; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "5",
        "2",
        "3",
        "2"
      ],
      "answer": 2,
      "explanation": "1부터 2까지 1씩 증가하며 sum에 누적하므로 1+2의 총합은 3입니다."
    },
    {
      "id": 873,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.88 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 18; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "18",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(18)이 실행됩니다."
    },
    {
      "id": 874,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.88 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 23; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "23",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(23)이 실행됩니다."
    },
    {
      "id": 875,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.88 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "210",
        "90",
        "20"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 876,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.88 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "스니핑(Sniffing)",
        "DDoS",
        "SQL Injection",
        "XSS (Cross-Site Scripting)"
      ],
      "answer": 3,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 877,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.88 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "AES",
        "DES",
        "SEED",
        "RSA"
      ],
      "answer": 3,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 878,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.88 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "RADIUS",
        "SAML 1.0",
        "Kerberos"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 879,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.88 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 880,
      "level": 88,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.88 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "89": [
    {
      "id": 881,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.89 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 14; int *p = &a; *p += 11; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "25",
        "14",
        "11",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 11 연산은 변수 a의 값(14)에 11를 직접 더하여 a의 최종값은 25가 됩니다."
    },
    {
      "id": 882,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.89 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 3; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "3",
        "9",
        "6",
        "5"
      ],
      "answer": 2,
      "explanation": "1부터 3까지 1씩 증가하며 sum에 누적하므로 1+3의 총합은 6입니다."
    },
    {
      "id": 883,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.89 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 19; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "컴파일 에러 발생",
        "19"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(19)이 실행됩니다."
    },
    {
      "id": 884,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.89 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 24; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "NullPointerException",
        "10",
        "24"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(24)이 실행됩니다."
    },
    {
      "id": 885,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.89 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "90",
        "20",
        "210"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 886,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.89 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "스니핑(Sniffing)",
        "XSS (Cross-Site Scripting)",
        "DDoS",
        "SQL Injection"
      ],
      "answer": 1,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 887,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.89 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "RSA",
        "AES",
        "SEED",
        "DES"
      ],
      "answer": 0,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 888,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.89 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "OAuth 2.0",
        "RADIUS"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 889,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.89 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 890,
      "level": 89,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.89 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 2,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "90": [
    {
      "id": 891,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.90 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 1; int *p = &a; *p += 2; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "3",
        "1",
        "2",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 2 연산은 변수 a의 값(1)에 2를 직접 더하여 a의 최종값은 3가 됩니다."
    },
    {
      "id": 892,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.90 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 4; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "14",
        "9",
        "10",
        "4"
      ],
      "answer": 2,
      "explanation": "1부터 4까지 1씩 증가하며 sum에 누적하므로 1+4의 총합은 10입니다."
    },
    {
      "id": 893,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.90 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 20; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "20",
        "NullPointerException",
        "10"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(20)이 실행됩니다."
    },
    {
      "id": 894,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.90 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 25; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "컴파일 에러 발생",
        "25"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(25)이 실행됩니다."
    },
    {
      "id": 895,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.90 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "90",
        "210",
        "20"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 896,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.90 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "DDoS",
        "SQL Injection",
        "XSS (Cross-Site Scripting)",
        "스니핑(Sniffing)"
      ],
      "answer": 2,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 897,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.90 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "RSA",
        "AES",
        "DES",
        "SEED"
      ],
      "answer": 0,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 898,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.90 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "SAML 1.0",
        "Kerberos",
        "RADIUS"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 899,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.90 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "버추얼박스 (VirtualBox)",
        "VMware Workstation",
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 900,
      "level": 90,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.90 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "91": [
    {
      "id": 901,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.91 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 3; int *p = &a; *p += 3; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "3",
        "6",
        "포인터 메모리 주소값",
        "3"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 3 연산은 변수 a의 값(3)에 3를 직접 더하여 a의 최종값은 6가 됩니다."
    },
    {
      "id": 902,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.91 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 5; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "14",
        "15",
        "5",
        "20"
      ],
      "answer": 1,
      "explanation": "1부터 5까지 1씩 증가하며 sum에 누적하므로 1+5의 총합은 15입니다."
    },
    {
      "id": 903,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.91 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 21; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "21",
        "NullPointerException",
        "10"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(21)이 실행됩니다."
    },
    {
      "id": 904,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.91 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 26; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "26",
        "NullPointerException",
        "10"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(26)이 실행됩니다."
    },
    {
      "id": 905,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.91 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "90",
        "210",
        "3"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 906,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.91 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "DDoS",
        "XSS (Cross-Site Scripting)",
        "SQL Injection",
        "스니핑(Sniffing)"
      ],
      "answer": 1,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 907,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.91 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "AES",
        "RSA",
        "DES",
        "SEED"
      ],
      "answer": 1,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 908,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.91 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "OAuth 2.0",
        "Kerberos",
        "RADIUS",
        "SAML 1.0"
      ],
      "answer": 0,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 909,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.91 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 910,
      "level": 91,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.91 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "92": [
    {
      "id": 911,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.92 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 5; int *p = &a; *p += 4; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "5",
        "9",
        "4"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 4 연산은 변수 a의 값(5)에 4를 직접 더하여 a의 최종값은 9가 됩니다."
    },
    {
      "id": 912,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.92 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 6; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "20",
        "6",
        "21",
        "27"
      ],
      "answer": 2,
      "explanation": "1부터 6까지 1씩 증가하며 sum에 누적하므로 1+6의 총합은 21입니다."
    },
    {
      "id": 913,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.92 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 22; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "22",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(22)이 실행됩니다."
    },
    {
      "id": 914,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.92 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 27; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "27",
        "10",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(27)이 실행됩니다."
    },
    {
      "id": 915,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.92 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "20",
        "90",
        "3"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 916,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.92 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "DDoS",
        "SQL Injection",
        "스니핑(Sniffing)",
        "XSS (Cross-Site Scripting)"
      ],
      "answer": 3,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 917,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.92 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "DES",
        "SEED",
        "AES",
        "RSA"
      ],
      "answer": 3,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 918,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.92 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0",
        "Kerberos"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 919,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.92 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 920,
      "level": 92,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.92 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)"
      ],
      "answer": 3,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "93": [
    {
      "id": 921,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.93 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 7; int *p = &a; *p += 5; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "포인터 메모리 주소값",
        "7",
        "5",
        "12"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 5 연산은 변수 a의 값(7)에 5를 직접 더하여 a의 최종값은 12가 됩니다."
    },
    {
      "id": 922,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.93 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 7; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "27",
        "28",
        "7",
        "35"
      ],
      "answer": 1,
      "explanation": "1부터 7까지 1씩 증가하며 sum에 누적하므로 1+7의 총합은 28입니다."
    },
    {
      "id": 923,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.93 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 23; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "23",
        "NullPointerException",
        "10"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(23)이 실행됩니다."
    },
    {
      "id": 924,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.93 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 28; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "28",
        "컴파일 에러 발생",
        "10",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(28)이 실행됩니다."
    },
    {
      "id": 925,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.93 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "3",
        "210",
        "90"
      ],
      "answer": 3,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 926,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.93 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "DDoS",
        "스니핑(Sniffing)",
        "XSS (Cross-Site Scripting)",
        "SQL Injection"
      ],
      "answer": 2,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 927,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.93 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "AES",
        "DES",
        "RSA",
        "SEED"
      ],
      "answer": 2,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 928,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.93 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 929,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.93 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)",
        "VMware Workstation"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 930,
      "level": 93,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.93 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "94": [
    {
      "id": 931,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.94 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 9; int *p = &a; *p += 6; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "15",
        "9",
        "포인터 메모리 주소값",
        "6"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 6 연산은 변수 a의 값(9)에 6를 직접 더하여 a의 최종값은 15가 됩니다."
    },
    {
      "id": 932,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.94 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 8; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "35",
        "44",
        "8",
        "36"
      ],
      "answer": 3,
      "explanation": "1부터 8까지 1씩 증가하며 sum에 누적하므로 1+8의 총합은 36입니다."
    },
    {
      "id": 933,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.94 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 24; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "NullPointerException",
        "10",
        "24"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(24)이 실행됩니다."
    },
    {
      "id": 934,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.94 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 29; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "컴파일 에러 발생",
        "29",
        "10"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(29)이 실행됩니다."
    },
    {
      "id": 935,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.94 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "210",
        "90",
        "20"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 936,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.94 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "DDoS",
        "SQL Injection",
        "XSS (Cross-Site Scripting)",
        "스니핑(Sniffing)"
      ],
      "answer": 2,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 937,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.94 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "RSA",
        "DES",
        "AES",
        "SEED"
      ],
      "answer": 0,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 938,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.94 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "Kerberos",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 939,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.94 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 940,
      "level": 94,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.94 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "95": [
    {
      "id": 941,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.95 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 11; int *p = &a; *p += 7; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "11",
        "18",
        "포인터 메모리 주소값",
        "7"
      ],
      "answer": 1,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 7 연산은 변수 a의 값(11)에 7를 직접 더하여 a의 최종값은 18가 됩니다."
    },
    {
      "id": 942,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.95 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 9; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "9",
        "54",
        "44",
        "45"
      ],
      "answer": 3,
      "explanation": "1부터 9까지 1씩 증가하며 sum에 누적하므로 1+9의 총합은 45입니다."
    },
    {
      "id": 943,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.95 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 25; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "25",
        "컴파일 에러 발생"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(25)이 실행됩니다."
    },
    {
      "id": 944,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.95 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 30; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "30",
        "NullPointerException",
        "10"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(30)이 실행됩니다."
    },
    {
      "id": 945,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.95 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "90",
        "20",
        "210",
        "3"
      ],
      "answer": 0,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 946,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.95 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "스니핑(Sniffing)",
        "XSS (Cross-Site Scripting)",
        "SQL Injection",
        "DDoS"
      ],
      "answer": 1,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 947,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.95 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "DES",
        "RSA",
        "AES",
        "SEED"
      ],
      "answer": 1,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 948,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.95 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "SAML 1.0",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 949,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.95 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "도커 (Docker)"
      ],
      "answer": 3,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 950,
      "level": 95,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.95 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "깃허브 액션 (GitHub Actions)",
        "쿠버네티스 (Kubernetes / K8s)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "96": [
    {
      "id": 951,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.96 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 13; int *p = &a; *p += 8; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "13",
        "8",
        "21",
        "포인터 메모리 주소값"
      ],
      "answer": 2,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 8 연산은 변수 a의 값(13)에 8를 직접 더하여 a의 최종값은 21가 됩니다."
    },
    {
      "id": 952,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.96 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 10; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "10",
        "65",
        "55",
        "54"
      ],
      "answer": 2,
      "explanation": "1부터 10까지 1씩 증가하며 sum에 누적하므로 1+10의 총합은 55입니다."
    },
    {
      "id": 953,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.96 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 26; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "컴파일 에러 발생",
        "26"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(26)이 실행됩니다."
    },
    {
      "id": 954,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.96 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 31; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "10",
        "31",
        "컴파일 에러 발생"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(31)이 실행됩니다."
    },
    {
      "id": 955,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.96 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "3",
        "90",
        "210"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 956,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.96 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "SQL Injection",
        "XSS (Cross-Site Scripting)",
        "스니핑(Sniffing)",
        "DDoS"
      ],
      "answer": 1,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 957,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.96 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "AES",
        "RSA",
        "DES",
        "SEED"
      ],
      "answer": 1,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 958,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.96 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "Kerberos",
        "RADIUS",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 959,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.96 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "도커 (Docker)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 2,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 960,
      "level": 96,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.96 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "97": [
    {
      "id": 961,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.97 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 15; int *p = &a; *p += 9; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "9",
        "15",
        "포인터 메모리 주소값",
        "24"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 9 연산은 변수 a의 값(15)에 9를 직접 더하여 a의 최종값은 24가 됩니다."
    },
    {
      "id": 962,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.97 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 11; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "65",
        "11",
        "77",
        "66"
      ],
      "answer": 3,
      "explanation": "1부터 11까지 1씩 증가하며 sum에 누적하므로 1+11의 총합은 66입니다."
    },
    {
      "id": 963,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.97 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 27; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "컴파일 에러 발생",
        "27",
        "NullPointerException"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(27)이 실행됩니다."
    },
    {
      "id": 964,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.97 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 32; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "컴파일 에러 발생",
        "32",
        "NullPointerException"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(32)이 실행됩니다."
    },
    {
      "id": 965,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.97 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "3",
        "20",
        "210",
        "90"
      ],
      "answer": 3,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 966,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.97 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "스니핑(Sniffing)",
        "SQL Injection",
        "XSS (Cross-Site Scripting)",
        "DDoS"
      ],
      "answer": 2,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 967,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.97 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "SEED",
        "RSA",
        "DES",
        "AES"
      ],
      "answer": 1,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 968,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.97 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "SAML 1.0",
        "RADIUS",
        "Kerberos",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 969,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.97 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)",
        "하이퍼바이저 (Hypervisor)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 970,
      "level": 97,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.97 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "젠킨스 (Jenkins)",
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "98": [
    {
      "id": 971,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.98 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 2; int *p = &a; *p += 10; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "12",
        "2",
        "10",
        "포인터 메모리 주소값"
      ],
      "answer": 0,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 10 연산은 변수 a의 값(2)에 10를 직접 더하여 a의 최종값은 12가 됩니다."
    },
    {
      "id": 972,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.98 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 2; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "2",
        "2",
        "3",
        "5"
      ],
      "answer": 2,
      "explanation": "1부터 2까지 1씩 증가하며 sum에 누적하므로 1+2의 총합은 3입니다."
    },
    {
      "id": 973,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.98 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 28; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "컴파일 에러 발생",
        "NullPointerException",
        "28",
        "10"
      ],
      "answer": 2,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(28)이 실행됩니다."
    },
    {
      "id": 974,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.98 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 33; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "33",
        "NullPointerException",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(33)이 실행됩니다."
    },
    {
      "id": 975,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.98 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "20",
        "3",
        "90",
        "210"
      ],
      "answer": 2,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 976,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.98 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "DDoS",
        "SQL Injection",
        "스니핑(Sniffing)",
        "XSS (Cross-Site Scripting)"
      ],
      "answer": 3,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 977,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.98 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "SEED",
        "AES",
        "DES",
        "RSA"
      ],
      "answer": 3,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 978,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.98 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "OAuth 2.0",
        "Kerberos",
        "SAML 1.0"
      ],
      "answer": 1,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 979,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.98 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "VMware Workstation",
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 980,
      "level": 98,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.98 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "젠킨스 (Jenkins)",
        "앤서블 (Ansible)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "99": [
    {
      "id": 981,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.99 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 4; int *p = &a; *p += 11; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "11",
        "4",
        "포인터 메모리 주소값",
        "15"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 11 연산은 변수 a의 값(4)에 11를 직접 더하여 a의 최종값은 15가 됩니다."
    },
    {
      "id": 982,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.99 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 3; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "9",
        "3",
        "5",
        "6"
      ],
      "answer": 3,
      "explanation": "1부터 3까지 1씩 증가하며 sum에 누적하므로 1+3의 총합은 6입니다."
    },
    {
      "id": 983,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.99 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 29; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "NullPointerException",
        "29",
        "10",
        "컴파일 에러 발생"
      ],
      "answer": 1,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(29)이 실행됩니다."
    },
    {
      "id": 984,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.99 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 34; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "34",
        "10",
        "컴파일 에러 발생",
        "NullPointerException"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(34)이 실행됩니다."
    },
    {
      "id": 985,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.99 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "90",
        "3",
        "20"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 986,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.99 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "SQL Injection",
        "DDoS",
        "XSS (Cross-Site Scripting)",
        "스니핑(Sniffing)"
      ],
      "answer": 2,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 987,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.99 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "DES",
        "AES",
        "SEED",
        "RSA"
      ],
      "answer": 3,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 988,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.99 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "RADIUS",
        "Kerberos",
        "OAuth 2.0",
        "SAML 1.0"
      ],
      "answer": 2,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 989,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.99 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "도커 (Docker)",
        "하이퍼바이저 (Hypervisor)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 0,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 990,
      "level": 99,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.99 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "쿠버네티스 (Kubernetes / K8s)",
        "깃허브 액션 (GitHub Actions)",
        "앤서블 (Ansible)",
        "젠킨스 (Jenkins)"
      ],
      "answer": 0,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ],
  "100": [
    {
      "id": 991,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 다중 포인터 및 문자열 포인터 트레이싱",
      "question": "[Lv.100 - C언어 포인터] 다음 C 프로그램 코드를 실행했을 때 출력되는 결과값은?\n\n```c\n#include <stdio.h>\nint main() {\n    int a = 6; int *p = &a; *p += 2; printf(\"%d\", a);\n    return 0;\n}\n```",
      "options": [
        "6",
        "포인터 메모리 주소값",
        "2",
        "8"
      ],
      "answer": 3,
      "explanation": "포인터 p는 변수 a의 메모리 주소를 가리키고 있으므로, *p += 2 연산은 변수 a의 값(6)에 2를 직접 더하여 a의 최종값은 8가 됩니다."
    },
    {
      "id": 992,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "C언어 구조체 포인터 및 재귀 함수 실행 결과",
      "question": "[Lv.100 - C언어 반복문] 다음 C 프로그램 실행 시 출력 결과는?\n\n```c\n#include <stdio.h>\nint main() {\n    int sum = 0;\nfor(int i = 1; i <= 4; i++) {\n    sum += i;\n}\nprintf(\"%d\", sum);\n    return 0;\n}\n```",
      "options": [
        "4",
        "14",
        "10",
        "9"
      ],
      "answer": 2,
      "explanation": "1부터 4까지 1씩 증가하며 sum에 누적하므로 1+4의 총합은 10입니다."
    },
    {
      "id": 993,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 상속(Inheritance) 및 메소드 오버라이딩",
      "question": "[Lv.100 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 30; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "10",
        "NullPointerException",
        "컴파일 에러 발생",
        "30"
      ],
      "answer": 3,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(30)이 실행됩니다."
    },
    {
      "id": 994,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Java 추상 클래스, 인터페이스 및 다형성 바인딩",
      "question": "[Lv.100 - Java 객체지향] 다음 Java 코드의 실행 결과로 출력되는 것은?\n\n```java\nclass Parent {\n    int getVal() { return 10; }\n}\nclass Child extends Parent {\n    int getVal() { return 35; }\n}\npublic class Main {\n    public static void main(String[] args) {\n        Parent obj = new Child();\n        System.out.println(obj.getVal());\n    }\n}\n```",
      "options": [
        "35",
        "NullPointerException",
        "컴파일 에러 발생",
        "10"
      ],
      "answer": 0,
      "explanation": "Parent 참조 변수로 Child 인스턴스를 참조할 때, 오버라이딩(Overriding)된 메소드 호출 시 동적 바인딩(Dynamic Binding)에 의해 실제 인스턴스인 Child의 getVal()(35)이 실행됩니다."
    },
    {
      "id": 995,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "Python 람다(Lambda), map, filter 및 리스트 컴프리헨션",
      "question": "[Lv.100 - Python 슬라이싱] 다음 파이썬 코드의 실행 결과는?\n\n```python\nnums = [10, 20, 30, 40, 50, 60]\nsub = nums[1:4]\nprint(sum(sub))\n```",
      "options": [
        "210",
        "90",
        "20",
        "3"
      ],
      "answer": 1,
      "explanation": "nums[1:4] 슬라이싱 결과는 [20, 30, 40]이며, sum() 내장 함수를 취하면 총합은 90이 됩니다."
    },
    {
      "id": 996,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "소프트웨어 개발 보안 및 시큐어 코딩 (SQL Injection, XSS)",
      "question": "[Lv.100 - 정보보안/암호학] 공격자가 웹 서버에 악의적인 스크립트를 삽입하여 희생자의 브라우저에서 실행되도록 만들어 세션 쿠키 탈취 등을 유발하는 공격은?",
      "options": [
        "XSS (Cross-Site Scripting)",
        "SQL Injection",
        "스니핑(Sniffing)",
        "DDoS"
      ],
      "answer": 0,
      "explanation": "XSS(크로스 사이트 스크립팅)는 검증되지 않은 외부 스크립트가 사용자의 웹 브라우저에서 실행되도록 하는 취약점입니다."
    },
    {
      "id": 997,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "암호학 (대칭키 DES/AES/ARIA vs 비대칭키 RSA/ECC)",
      "question": "[Lv.100 - 정보보안/암호학] 대표적인 공개키(비대칭키) 암호화 알고리즘으로 큰 수의 '소인수분해'의 수학적 난이도에 기반을 둔 알고리즘은?",
      "options": [
        "SEED",
        "DES",
        "RSA",
        "AES"
      ],
      "answer": 2,
      "explanation": "RSA는 큰 소수의 곱에 대한 소인수분해가 어렵다는 수학적 복잡성에 기반한 대표적인 비대칭(공개키) 암호 알고리즘입니다. (AES/DES/SEED는 대칭키)"
    },
    {
      "id": 998,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "해시 함수 (SHA-256) 및 접근 제어 (DAC/MAC/RBAC)",
      "question": "[Lv.100 - 신기술/클라우드] 인터넷 사용자가 비밀번호를 노출하지 않고도 서드파티 애플리케이션에 자신의 계정 접근 권한을 안전하게 위임할 수 있도록 하는 표준 인가(Authorization) 프로토콜은?",
      "options": [
        "Kerberos",
        "RADIUS",
        "SAML 1.0",
        "OAuth 2.0"
      ],
      "answer": 3,
      "explanation": "OAuth 2.0은 접근 토큰(Access Token)을 발급하여 안전하게 자원에 접근할 수 있도록 인가(Authorization)를 처리하는 업계 표준 프레임워크입니다."
    },
    {
      "id": 999,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "인증 및 토큰 (SSO, OAuth 2.0, JWT) & 제로 트러스트",
      "question": "[Lv.100 - 신기술/클라우드] 서버 가상화와 달리 호스트 OS 커널을 공유하며 프로세스를 격리하여 가볍고 빠르게 애플리케이션을 배포하는 오픈소스 컨테이너 플랫폼은?",
      "options": [
        "하이퍼바이저 (Hypervisor)",
        "도커 (Docker)",
        "VMware Workstation",
        "버추얼박스 (VirtualBox)"
      ],
      "answer": 1,
      "explanation": "도커(Docker)는 리눅스 컨테이너 기술을 기반으로 OS 커널을 공유하면서 애플리케이션과 라이브러리를 컨테이너 단위로 패키징/격리 배포합니다."
    },
    {
      "id": 1000,
      "level": 100,
      "category": "고급 코드 & 보안 & 신기술",
      "topic": "클라우드, 컨테이너 (Docker, K8s) & DevSecOps/MSA",
      "question": "[Lv.100 - 신기술/클라우드] 대규모 마이크로서비스(MSA) 환경에서 수백~수천 개의 도커 컨테이너의 자동 배포, 스케일링 및 관리를 담당하는 오케스트레이션 엔진은?",
      "options": [
        "앤서블 (Ansible)",
        "쿠버네티스 (Kubernetes / K8s)",
        "젠킨스 (Jenkins)",
        "깃허브 액션 (GitHub Actions)"
      ],
      "answer": 1,
      "explanation": "쿠버네티스(Kubernetes)는 구글이 오픈소스로 공개한 대표적인 컨테이너 오케스트레이션 플랫폼입니다."
    }
  ]
};

function getQuestionsForLevel(lvl) {
  const num = parseInt(lvl, 10);
  return QUIZ_1000_DATA[num] || [];
}
