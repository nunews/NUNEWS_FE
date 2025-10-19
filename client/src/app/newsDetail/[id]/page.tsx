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
import { useEffect, useState } from "react";
import { getSupabaseOneNews } from "@/lib/api/getSupabaseOneNews";
import { useTyping } from "@/hooks/useTyping";

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showTyping, setShowTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [newsData, setNewsData] = useState<NewsData | null>(null);

  const { typedRef, runTyped } = useTyping();

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setLoading(true);
        const data = await getSupabaseOneNews(newsId as string);
        setNewsData(data);
      } catch (err) {
        console.error("뉴스데이터 불러오기 실패", err);
        setError("뉴스데이터를 불러오는데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    if (newsId) {
      fetchNewsData();
    }
  }, [newsId]);
  const handleSummary = () => {
    setShowSummary(true);
    setShowTyping(true);
  };

  const handleShare = async () => {
    const currentUrl = window.location.href;
    const newsTitle = "뉴스 제목";

    // 모바일에서는 공유, 데스크톱에서는 클립보드 복사
    if (
      /Android|webOS|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(
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
      toast.success("링크가 복사되었습니다!", {
        duration: 3000,
      });
    } catch (err) {
      const textArea = document.createElement("textarea");
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);

      toast.success("링크가 복사되었습니다!");
      console.error("복사 중 에러 발생", err);
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

  return (
    <div className="min-h-screen">
      <Header logo={false} dark={false} interest={[]} />

      <div className="px-5 pt-18">
        <div className="text-sm text-[var(--color-gray-70)] mb-2">
          {newsData?.category}
        </div>
        <h1 className="text-[22px] font-bold leading-[140%] mb-3">
          {newsData?.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-[var(--color-gray-70)] mb-7">
          <span>{newsData?.pubDate}</span>
          <span>•</span>
          <span>{newsData?.source_name}</span>
          <div className="flex items-center justify-end flex-1 gap-[3px]">
            <AiOutlineEye className="w-5 h-5 text-[var(--color-gray-70)]" />
            <span className="text-sm text-[var(--color-gray-70)]">
              {newsData?.views}
            </span>
          </div>
        </div>
        <div className="w-full h-64 mb-7.5 rounded-lg overflow-hidden">
          <Image
            src={newsData?.image_url || "/images/handsomeLee.png"}
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
                      // onClick={generateSummary}
                      className="px-4 py-2 bg-gradient-to-r from-[#F0FFBC] to-[var(--color-primary-40)] text-black rounded-lg text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      다시 시도
                    </button>
                  </div>
                )}

                {showTyping && !loading && (
                  <div className="text-[var(--color-gray-100)] text-base leading-[140%] whitespace-pre-line">
                    <div ref={typedRef}></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* 기사 내용 */}
        <div className="mb-7.5">
          <div className="text-base leading-[160%] whitespace-pre-line text-[var(--color-gray-100)]">
            {newsData?.content}
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
