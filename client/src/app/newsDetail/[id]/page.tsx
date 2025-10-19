"use client";
import Image from "next/image";
import { AiOutlineEye, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { TextButton } from "@/components/ui/TextButton";
import Header from "@/components/layout/header";
import RecommendNews from "@/components/ui/RecommendNews";
import RecommendPost from "@/components/ui/RecommendPost";
import AudienceAnalyticsChart from "@/components/articleDetail/AudienceAnalyticsChart";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import Typed from "typed.js";
import { useRef, useState } from "react";

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showTyping, setShowTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(false);

  const typedElement = useRef<HTMLDivElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  const handleSummary = () => {
    setShowSummary(true);
    generateSummary();
  };

  const generateSummary = async () => {
    setLoading(true);
    setError("");
    setShowTyping(false);

    try {
      // 2초 후 타이핑
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("로딩 완료, 타이핑 시작!");

      const summaryData = `
      1. 마르타 구민지 선수가 강속구를 던지다가 사고가 발생했다고 해 ⚾
      2. 까마귀가 공에 맞고 굴절되어 심판이 다쳤다는데 😱  
      3. 얼마나 힘이 세길래! 빠른 회복을 기원합니다 🙏`;

      setLoading(false);
      setShowTyping(true);

      setTimeout(() => {
        if (typedElement.current) {
          typedInstance.current = new Typed(typedElement.current, {
            strings: [summaryData],
            typeSpeed: 30,
            showCursor: false,
          });
        }
      }, 100);
    } catch (err) {
      setError("요약 생성 중 오류가 발생했습니다.");
      setLoading(false);
      console.log(err);
    }
  };
  const handleShare = async () => {
    const currentUrl = window.location.href;
    const newsTitle = "뉴스 제목";

    // 모바일에서는 공유, 데스크톱에서는 클립보드 복사
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      ) &&
      navigator.share
    ) {
      try {
        await navigator.share({
          title: newsTitle,
          url: currentUrl,
        });
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          // 공유 실패 시 클립보드 복사로 폴백
          await copyToClipboard(currentUrl);
        }
      }
    } else {
      // 데스크톱에서는 바로 클립보드 복사
      await copyToClipboard(currentUrl);
    }
  };

  const copyToClipboard = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("링크가 복사되었습니다! 😀", {
        duration: 3000,
      });
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      toast.success("링크가 복사되었습니다! 😀");
    }
  };
  // 다른 유저의 생각 데이터
  const posts = [
    {
      postId: 1,
      title: "손흥민 이번에 사우디 가나요?",
      content: "나는 좀 회의적임........",
      likes: 32,
      views: 124,
    },
    {
      postId: 2,
      title: "이강인 이번에 몇 골 넣었는지 아시는분 빨리 댓글좀",
      content: "나는 좀 회의적임........",
      likes: 32,
      views: 124,
    },
    {
      postId: 3,
      title: "골프는 이렇게 치면 안되는데",
      content: "나는 좀 긍정적임........",
      likes: 32,
      views: 124,
    },
    {
      postId: 4,
      title: "수영은 역시 마이클 조던",
      content: "나는 좀 보수적임........",
      likes: 32,
      views: 124,
    },
  ];
  // 관심가질만한 다른 뉴스 데이터
  const relatedNews = [
    {
      title: "유강민 선수 최고기록 돌파...시속 620km로 압도적 우승",
      category: "정치",
      timeAgo: "2시간전",
      likes: 32,
      views: 124,
      image: "/images/handsomeLee.png",
    },
    {
      title: "NH농협은행, 예금금리 최고 0.3%p 내려...시장금리 반영",
      category: "경제",
      timeAgo: "3시간전",
      likes: 45,
      views: 89,
      image: "/images/handsomeLee.png",
    },
    {
      title: "꿀이 주르륵...핫케이크 정말 맛있는 맛집 발견!",
      category: "문화",
      timeAgo: "4시간전",
      likes: 67,
      views: 156,
      image: "/images/handsomeLee.png",
    },
  ];
  const newsData = {
    category: "스포츠",
    title:
      "나는 자연인이다...붉은 빛 골짜기에서 찍은 자연인의 사장이 세간의 엄청난 화제로 떠올라 광고",
    date: "2025.09.07",
    source: "매일경제",
    image: "/images/handsomeLee.png",
    content: `코스닥 시장 육성, 기업 지배구조, 산업 안정 자금 등 경제 정책 입안 경험이 풍부한 인사가 대통령의 공약 이행을 뒷받침할 적임자라는 대통령실의 설명이 있습니다.
강 실장이 해당 인사를 경제 정책 전반에 대한 높은 이해력과 국제 감각을 가졌으며, 코로나19 위기 대응 경험이 있는 민생 위기 극복 정책 집행의 적임자라고 소개했습니다.
대통령이 경제수석 명칭을 경제성장수석으로 변경하고 하준경 한양대 경제학부 교수를 발탁했다는 내용이 있습니다.
하 수석이 한국은행 출신으로 실물 경제와 이론을 겸비했으며, 국민경제자문위원회 자문위원으로 활동했다는 설명이 있습니다.
강 실장이 해당 인사를 거시경제와 산업 정책에 해박한 학자로, 대통령의 공약 수립 과정에 참여하여 경제 성장 철학에 대한 이해도가 높다고 설명했습니다.
대통령이 재정기획보좌관을 신설하고 류덕현 중앙대 경제학부 교수를 임명했다는 내용이 있습니다.
류 보좌관이 한국조세재정연구원과 한국재정학회 이사를 지낸 재정 전문가로, 재정의 역할을 강조하는 입장이라고 알려져 있습니다.`,
    likes: 32,
    views: 124,
  };

  return (
    <div className="min-h-screen">
      <Header logo={false} dark={false} interest={[]} />

      <div className="px-5 pt-18">
        <div className="text-sm text-[var(--color-gray-70)] mb-2">
          {newsData.category}
        </div>
        <h1 className="text-[22px] font-bold leading-[140%] mb-3">
          {newsData.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-[var(--color-gray-70)] mb-7">
          <span>{newsData.date}</span>
          <span>•</span>
          <span>{newsData.source}</span>
          <div className="flex items-center justify-end flex-1 gap-[3px]">
            <AiOutlineEye className="w-5 h-5 text-[var(--color-gray-70)]" />
            <span className="text-sm text-[var(--color-gray-70)]">
              {newsData.views}
            </span>
          </div>
        </div>
        <div className="w-full h-64 mb-7.5 rounded-lg overflow-hidden">
          <Image
            src={newsData.image}
            alt="뉴스 이미지"
            width={400}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-6 flex items-center gap-3">
          <TextButton
            onClick={handleSummary}
            className="w-[97px] h-9 px-4 bg-[var(--color-black)] hover:bg-[var(--color-gray-100)] hover:backdrop-blur-[4px]"
          >
            <p className="text-sm whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#F0FFBC] to-[var(--color-primary-40)]">
              AI 세줄요약
            </p>
          </TextButton>
          <p className="text-sm">기사를 세 줄로 요약해 드려요!</p>
        </div>

        {/* 요약 섹션 */}
        {showSummary && (
          <div className="w-full mb-6 animate-in slide-in-from-top-4 duration-300">
            <div className="bg-[#f6f6f6] rounded-2xl py-6 px-5 border border-[var(--color-gray-30)]">
              <div>
                {loading && (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="animate-spin rounded-full h-6 w-6 border-2 border-[#181818] border-t-transparent"></div>
                      <p className="text-sm text-gray-400">요약중입니다...</p>
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-center py-6">
                    <p className="text-red-400 text-sm mb-4">{error}</p>
                    <button
                      onClick={generateSummary}
                      className="px-4 py-2 bg-gradient-to-r from-[#F0FFBC] to-[var(--color-primary-40)] text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      다시 시도
                    </button>
                  </div>
                )}

                {showTyping && !loading && (
                  <div className="text-[var(--color-gray-100)] text-base leading-[140%] whitespace-pre-line">
                    <div ref={typedElement}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* 기사 내용 */}
        <div className="mb-7.5">
          <div className="text-base leading-[160%] whitespace-pre-line text-[var(--color-gray-100)]">
            {newsData.content}
          </div>
        </div>
        <div className="flex items-center justify-center gap-4 pt-4">
          <div className="flex items-center gap-[3px]">
            <TextButton color="default" className="flex items-center gap-[3px]">
              <AiOutlineLike className="w-5 h-5 text-[var(--color-black)]" />
              <span className="text-[var(--color-black)]">좋아요</span>
            </TextButton>
          </div>
          <div className="flex items-center gap-[3px]">
            <TextButton
              onClick={handleShare}
              className="flex items-center gap-[3px]"
              color="default"
            >
              <AiOutlineShareAlt className="w-5 h-5 text-[var(--color-black)]" />
              <span className="text-[var(--color-black)]">공유하기</span>
            </TextButton>
          </div>
        </div>
        <div className="py-3 mt-9">
          <AudienceAnalyticsChart />
        </div>
        <div className="border-b border-[var(--color-gray-20)] mt-9" />
        {/* 다른 유저의 생각 */}
        <div className="mb-8 mt-10">
          <h2 className="text-[22px] font-bold mb-6">
            <span className="text-[var(--color-black)]">
              &apos;스포츠&apos;
            </span>
            <span className="text-[var(--color-gray-80)]">
              에 대한 다른 유저의 생각
            </span>
          </h2>
          <div className="space-y-[10px]">
            {posts.map((content) => (
              <RecommendPost
                key={content.postId}
                postId={content.postId}
                title={content.title}
                content={content.content}
                likes={content.likes}
                views={content.views}
              />
            ))}
          </div>
        </div>
        <div className="border-b border-[var(--color-gray-20)] mt-9" />

        {/* 관심 가질만한 다른 뉴스 */}
        <div className="mb-[75px] mt-10">
          <h2 className="text-lg font-bold mb-6">관심 가질만한 다른 뉴스</h2>
          <div className="space-y-4">
            {relatedNews.map((news, index) => (
              <RecommendNews
                key={index}
                title={news.title}
                category={news.category}
                image={news.image}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
