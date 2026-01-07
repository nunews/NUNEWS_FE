# 누뉴 (NUNEWS)

> **누**구나 한 눈에 읽을 수 있는 **뉴(새로운)** 뉴스 플랫폼

AI 기반 뉴스 요약과 사용자 맞춤형 추천을 통해 더 쉽고 빠르게 뉴스를 소비할 수 있는 소셜 뉴스 플랫폼입니다.

## 주요 기능

### 누픽 (NuPick) - 맞춤형 뉴스 피드

- 세로 스크롤 기반 풀스크린 뉴스 피드
- 사용자 관심사 기반 맞춤 뉴스 추천
- 비로그인 시 랜덤 뉴스 제공
- Instagram 릴스/YouTube 쇼츠 스타일의 직관적인 UI

### AI 세 줄 요약

- OpenAI GPT-4o를 활용한 뉴스 3줄 요약
- 타이핑 애니메이션 효과 (Typed.js)
- 서버 캐싱으로 빠른 응답

### 뉴스 상세 페이지

- 전체 뉴스 내용 및 AI 요약
- 조회수/좋아요 통계 차트 (Recharts)
- 관련 뉴스 및 커뮤니티 게시글 추천
- 좋아요, 공유, 스크랩 기능

### 올픽 (AllPick) - 모든 뉴스 탐색

- 카테고리별 뉴스 필터링 (정치/경제/연예/스포츠 등)
- 오늘의 핫뉴스 슬라이더
- 인기 뉴스 정렬
- 관심사 기반 커뮤니티 글 추천

### 커뮤니티

- 뉴스에 대한 사용자 의견 공유
- 게시글 작성 및 댓글 기능
- 최신순/인기순 정렬
- 좋아요 기능

### 마이페이지

- 프로필 관리 및 수정
- 내가 쓴 글 모아보기
- 스크랩한 뉴스 관리
- 좋아요한 뉴스 확인

---

## 기술 스택

### Core

| 기술         | 버전   | 설명                                |
| ------------ | ------ | ----------------------------------- |
| Next.js      | 15.5.9 | App Router, React Server Components |
| React        | 19.1.0 | UI 라이브러리                       |
| TypeScript   | 5.x    | 타입 안전성                         |
| Tailwind CSS | 4.x    | 유틸리티 기반 스타일링              |

### 상태 관리 & 데이터 페칭

| 기술                            | 용도                 |
| ------------------------------- | -------------------- |
| TanStack Query (React Query) v5 | 서버 상태 관리, 캐싱 |
| Zustand                         | 클라이언트 상태 관리 |
| Axios                           | HTTP 요청            |

### 백엔드 & 인증

| 기술       | 용도                           |
| ---------- | ------------------------------ |
| Supabase   | BaaS (Database, Auth, Storage) |
| PostgreSQL | 데이터베이스 (via Supabase)    |

### 외부 API

| API           | 용도             |
| ------------- | ---------------- |
| NewsData.io   | 뉴스 데이터 수집 |
| OpenAI GPT-4o | AI 뉴스 요약     |

### UI/UX

| 라이브러리   | 용도                    |
| ------------ | ----------------------- |
| Radix UI     | 접근성 높은 UI 컴포넌트 |
| Lucide React | 아이콘                  |
| Sonner       | 토스트 알림             |
| Swiper       | 슬라이더/캐러셀         |
| Recharts     | 차트 시각화             |
| Typed.js     | 타이핑 애니메이션       |
| next-themes  | 다크/라이트 모드        |

---

## 프로젝트 구조

```
NUNEWS_FE/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── page.tsx              # 홈 (누픽 페이지)
│   │   ├── layout.tsx            # 루트 레이아웃
│   │   ├── allPick/              # 올픽 - 모든 뉴스 탐색
│   │   ├── community/            # 커뮤니티
│   │   │   ├── page.tsx          # 커뮤니티 목록
│   │   │   ├── postCreate/       # 게시글 작성
│   │   │   └── [postId]/         # 게시글 상세
│   │   ├── mypage/               # 마이페이지
│   │   ├── newsDetail/[id]/      # 뉴스 상세
│   │   ├── profile/              # 프로필 설정
│   │   ├── auth/                 # 인증 (로그인, 콜백)
│   │   ├── api/                  # API 라우트
│   │   └── provider/             # React Query Provider
│   │
│   ├── components/               # React 컴포넌트
│   │   ├── articleDetail/        # 뉴스 상세 페이지
│   │   │   ├── AudienceAnalyticsChart.tsx
│   │   │   ├── NewsArticleContent.tsx
│   │   │   ├── RelatedNewsSection.tsx
│   │   │   └── RelatedPostSection.tsx
│   │   ├── auth/                 # 인증 컴포넌트
│   │   │   └── AuthBootstrap.tsx # 인증 초기화
│   │   ├── community/            # 커뮤니티 컴포넌트
│   │   │   ├── CommunityList.tsx
│   │   │   ├── CommunityPost.tsx
│   │   │   ├── Comment.tsx
│   │   │   └── CreatePost.tsx
│   │   ├── home/                 # 홈 페이지 컴포넌트
│   │   │   ├── Home.tsx
│   │   │   ├── NewsSection.tsx
│   │   │   └── Splash.tsx
│   │   ├── layout/               # 공통 레이아웃
│   │   ├── mypage/               # 마이페이지 컴포넌트
│   │   └── ui/                   # Shadcn UI 컴포넌트
│   │
│   ├── hooks/                    # Custom React Hooks
│   │   ├── useNewsData.ts        # 뉴스 데이터 페칭
│   │   ├── useNewsSummary.ts     # AI 요약
│   │   ├── useNewsInteractionMutations.ts  # 좋아요/북마크
│   │   ├── useAllPickNews.ts     # 올픽 뉴스
│   │   ├── usePostComments.ts    # 댓글
│   │   ├── useTyping.ts          # 타이핑 효과
│   │   └── useProfileEdit.ts     # 프로필 수정
│   │
│   ├── lib/                      # 라이브러리 & 유틸리티
│   │   ├── actions/              # Server Actions
│   │   ├── api/                  # API 함수
│   │   │   ├── fetchNews.ts      # NewsData.io 연동
│   │   │   ├── summarySupabase.ts # OpenAI 요약
│   │   │   └── saveNewstoSupabase.ts
│   │   ├── queries/              # React Query 설정
│   │   └── constants/            # 상수
│   │
│   ├── stores/                   # Zustand 스토어
│   │   ├── authStore.ts          # 인증 상태
│   │   └── communitySortStore.ts # 정렬 상태
│   │
│   ├── types/                    # TypeScript 타입
│   │   ├── news.d.ts
│   │   ├── community.d.ts
│   │   ├── profile.d.ts
│   │   └── ...
│   │
│   ├── utils/                    # 유틸리티 함수
│   │   └── supabase/             # Supabase 클라이언트
│   │       ├── client.ts         # 브라우저 클라이언트
│   │       └── server.ts         # 서버 클라이언트
│   │
│   └── middleware.ts             # Next.js 미들웨어
│
├── public/                       # 정적 파일
│   └── fonts/                    # Pretendard 폰트
│
├── package.json
├── tsconfig.json
├── next.config.ts
└── tailwind.config.ts
```

---

## 아키텍처

### 데이터 흐름

```
외부 API (NewsData.io, OpenAI)
         ↓
   lib/api/* 함수
         ↓
   Server Actions
         ↓
   Custom Hooks (React Query)
         ↓
   Components (캐싱된 데이터)
```

### 인증 흐름

```
앱 로드 → AuthBootstrap → Supabase 세션 확인 → authStore 업데이트 → UI 렌더링
```

### 상태 관리

- **서버 상태**: React Query (TanStack Query)
  - 쿼리 키: `["news", filters]`, `["post", postId]` 형식
  - `isPending`으로 로딩 상태 확인 (v5)
- **클라이언트 상태**: Zustand
  - `authStore`: 사용자 인증 정보
  - `communitySortStore`: 정렬 옵션

---

## 데이터베이스 스키마

| 테이블         | 설명                              |
| -------------- | --------------------------------- |
| News           | 뉴스 기사 (조회수, 좋아요수 포함) |
| User           | 사용자 프로필                     |
| Post           | 커뮤니티 게시글                   |
| Comments       | 댓글                              |
| Like           | 좋아요 (뉴스, 게시글, 댓글)       |
| User_Interests | 사용자 관심사 (다대다)            |

**명명 규칙**: snake_case (`user_id`, `news_id`, `created_at`)

---

Made with ❤️ by NUNEW Team
