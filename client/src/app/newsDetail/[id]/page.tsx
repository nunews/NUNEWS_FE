"use client";
import Image from "next/image";
import { AiOutlineEye, AiOutlineLike, AiOutlineShareAlt } from "react-icons/ai";
import { TextButton } from "@/components/ui/TextButton";
import Header from "@/components/layout/header";
import AudienceAnalyticsChart from "@/components/articleDetail/AudienceAnalyticsChart";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getSupabaseOneNews } from "@/lib/api/getSupabaseOneNews";
import { useTyping } from "@/hooks/useTyping";
import { getLikesStatus, toggleLike } from "@/utils/likes";
import RelatedNewsSection from "@/components/articleDetail/RelatedNewsSection";
import RelatedPostsSection from "@/components/articleDetail/RelatedPostSection";

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.id;
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [showTyping, setShowTyping] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  const [newsData, setNewsData] = useState<SupabaseNewsData | null>(null);

  const [isLiked, setIsLiked] = useState(false);

  const { typedRef } = useTyping();

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

  useEffect(() => {
    const fetchLikes = async () => {
      if (!newsId) return;
      try {
        const [status] = await Promise.all([getLikesStatus(newsId as string)]);

        setIsLiked(status);
      } catch (e) {
        console.error("뉴스 좋아요 정보 로딩 실패:", e);
      }
    };

    fetchLikes();
  }, [newsId]);

  const handleSummary = () => {
    setShowSummary(true);
    setShowTyping(true);
  };

  const handleLikeClick = async () => {
    if (!newsId) return;

    try {
      const res = await toggleLike(newsId as string);
      setIsLiked(res.isLiked);
    } catch (e) {
      console.error("좋아요 토글 실패:", e);
    }
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

  //console.log(newsData);

  return (
    <div className="min-h-screen">
      <Header logo={false} interest={[]} />

      <div className="px-5 pt-18">
        <div className="text-sm text-[var(--color-gray-70)] mb-2">
          {newsData?.category_id}
        </div>
        <h1 className="text-[22px] font-bold leading-[140%] mb-3">
          {newsData?.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-[var(--color-gray-70)] mb-7">
          <span>{newsData?.published_at}</span>
          <span>•</span>
          <span>{newsData?.source}</span>
          <div className="flex items-center justify-end flex-1 gap-[3px]">
            <AiOutlineEye className="w-5 h-5 text-[var(--color-gray-70)]" />
            <span className="text-sm text-[var(--color-gray-70)]">
              {newsData?.view_count}
            </span>
          </div>
        </div>
        <div className="w-full h-64 mb-7.5 rounded-lg overflow-hidden">
          <Image
            src={newsData?.image_url || "/images/default_nunew.svg"}
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
            <TextButton
              onClick={handleLikeClick}
              className={`flex items-center gap-[3px] transition-colors duration-300 
                ${
                  isLiked
                    ? "text-[var(--color-primary-40)] bg-[var(--color-gray-100)]"
                    : "text-[var(--color-black)]"
                }
              `}
            >
              <AiOutlineLike
                className={`w-5 h-5 transition-colors duration-300 
                  ${
                    isLiked
                      ? "text-[var(--color-primary-50)] "
                      : "text-[var(--color-black)]"
                  }
                `}
              />
              <span>{isLiked ? "좋아요" : "좋아요"}</span>
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
        {/* 조회수/좋아요 차트  */}
        <div className="py-3 mt-9">
          {newsData?.news_id && (
            <AudienceAnalyticsChart newsId={newsData.news_id!} />
          )}
        </div>
        <div className="border-b border-[var(--color-gray-20)] mt-9" />
        {/* 다른 유저의 생각 */}
        <RelatedPostsSection categoryLabel={newsData?.category_id ?? null} />
        <div className="border-b border-[var(--color-gray-20)] mt-9" />
        {/* 관심 가질만한 다른 뉴스 섹션 */}
        <RelatedNewsSection
          categoryLabel={newsData?.category_id ?? null}
          currentNewsId={newsData?.news_id ?? null} // 현재 기사 제외용 id
        />
      </div>
    </div>
  );
}
