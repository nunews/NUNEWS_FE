# 누뉴 (NUNEW) 🗞️

> **누**구나 한 눈에 읽을 수 있는 **뉴(새로운)** 뉴스 플랫폼

간편한 뉴스 소비를 위한 소셜 뉴스 플랫폼입니다. AI 기반 뉴스 요약과 사용자 맞춤형 추천을 통해 더 쉽고 빠르게 뉴스를 접할 수 있습니다.

## 주요 기능

### 🎯 누픽 (NuPick) - 맞춤형 뉴스 피드

- 세로 스크롤 기반 풀스크린 뉴스 피드
- 사용자 관심사 기반 맞춤 뉴스 추천
- 비로그인 시 랜덤 뉴스 제공
- Instagram 릴스 /Youtube 쇼츠 스타일의 직관적인 UI

### 🤖 AI 세 줄 요약

- 뉴스를 3줄로 간단하게 요약
- 타이핑 애니메이션 효과
- 서버 캐싱으로 빠른 응답

### 📊 뉴스 상세 페이지

- 전체 뉴스 내용 및 AI 요약
- 조회수/좋아요 통계 차트
- 관련 뉴스 및 커뮤니티 게시글 추천
- 좋아요, 공유, 스크랩 기능

### 🔥 올픽 (AllPick) - 모든 뉴스 탐색

- 카테고리별 뉴스 필터링 (정치/경제/연예/스포츠 등)
- 오늘의 핫뉴스 슬라이더
- 인기 뉴스 정렬
- 관심사 기반 커뮤니티 글 추천

### 💬 커뮤니티

- 뉴스에 대한 사용자 의견 공유
- 게시글 작성 및 댓글 기능
- 최신순/인기순 정렬
- 좋아요 기능

### 👤 마이페이지

- 프로필 관리 및 수정
- 내가 쓴 글 모아보기
- 스크랩한 뉴스 관리
- 좋아요한 뉴스 확인

## 기술 스택

### Core

- **Next.js 15.5.9**
- **TypeScript**
- **Tailwind CSS 4**

### 상태 관리 및 데이터 페칭

- **Zustand**
- **TanStack Query (React Query) v5**

### 백엔드 & 인증

- **Supabase** - BaaS (Backend as a Service)
  - Authentication (OAuth)
  - PostgreSQL Database
  - Storage

### UI/UX

- **Radix UI**
- **Lucide React** / **React Icons** - 아이콘
- **Sonner** - 토스트 알림
- **Swiper** - 슬라이더/캐러셀
- **Recharts** - 차트 라이브러리
- **Typed.js** - 타이핑 애니메이션
- **next-themes** - 다크모드 구현

## 프로젝트 구조

```
d:\NUNEWS_FE/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── page.tsx            # 홈 (누픽 페이지)
│   │   ├── layout.tsx          # 루트 레이아웃
│   │   ├── allPick/            # 모든 뉴스 탐색
│   │   ├── community/          # 커뮤니티
│   │   ├── mypage/             # 마이페이지
│   │   ├── newsDetail/[id]/    # 뉴스 상세
│   │   ├── profile/            # 프로필 설정
│   │   ├── auth/               # 인증 라우트
│   │   ├── api/                # API 라우트 및 클라이언트 함수
│   │   └── provider/           # React Query Provider
│   │
│   ├── components/             # 리액트 컴포넌트
│   │   ├── articleDetail/      # 뉴스 상세 페이지 컴포넌트
│   │   ├── auth/               # 인증 관련 (AuthBootstrap)
│   │   ├── community/          # 커뮤니티 컴포넌트
│   │   ├── home/               # 홈 페이지 컴포넌트
│   │   ├── layout/             # 공통 레이아웃 (Header, Footer)
│   │   ├── mypage/             # 마이페이지 컴포넌트
│   │   └── ui/                 # 재사용 UI 컴포넌트
│   │
│   ├── hooks/                  # Custom React Hooks
│   │   ├── useNewsData.ts      # 뉴스 데이터 페칭
│   │   ├── useNewsInteractionMutations.ts  # 좋아요/북마크
│   │   ├── useNewsSummary.ts   # AI 요약
│   │   └── useBookmarkToggle.ts
│   │
│   ├── lib/                    # 라이브러리 및 유틸리티
│   │   ├── actions/            # Server Actions
│   │   ├── api/                # API 함수들
│   │   ├── auth/               # 인증 관련
│   │   ├── queries/            # React Query 쿼리 키
│   │   ├── constants/          # 상수
│   │   └── supabase.ts         # Supabase 클라이언트
│   │
│   ├── stores/                 # Zustand 스토어
│   │   ├── authStore.ts        # 사용자 인증 상태
│   │   └── communitySortStore.ts # 커뮤니티 정렬
│   │
│   ├── types/                  # TypeScript 타입 정의
│   │   ├── news.d.ts
│   │   ├── community.d.ts
│   │   └── profile.d.ts
│   │
│   ├── utils/                  # 유틸리티 함수
│   │   └── supabase/           # Supabase 헬퍼
│   │
│   └── middleware.ts           # Next.js 미들웨어 (인증 체크)
│
├── public/                     # 정적 파일
│   └── fonts/                  # Pretendard 폰트
│
└── package.json



Made with ❤️ by NUNEW Team
```
