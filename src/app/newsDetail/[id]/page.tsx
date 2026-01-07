"use client";
import Header from "@/components/layout/header";
import AudienceAnalyticsChart from "@/components/articleDetail/AudienceAnalyticsChart";
import { useParams } from "next/navigation";
import RelatedNewsSection from "@/components/articleDetail/RelatedNewsSection";
import RelatedPostsSection from "@/components/articleDetail/RelatedPostSection";
import { useNewsDetail } from "@/hooks/useNewsDetail";
import NewsDetailSkeleton from "@/components/articleDetail/skeleton/NewsDetailSkeleton";
import NewsArticleContent from "@/components/articleDetail/NewsArticleContent";

export default function NewsDetailPage() {
  const params = useParams();
  const newsId = params.id;

  const {
    data: newsData,
    isLoading,
    isError,
  } = useNewsDetail(newsId as string);

  if (isLoading) {
    return <NewsDetailSkeleton />;
  }

  if (!newsData) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Header logo={false} />

      {/* 뉴스 본문 */}
      <NewsArticleContent newsData={newsData} />

      {/* 조회수/좋아요 차트  */}
      <div className="px-5">
        <div className="py-3 mt-9">
          <AudienceAnalyticsChart newsId={newsData.news_id} />
        </div>
        <div className="border-b border-[var(--color-gray-20)] mt-9 dark:border-[var(--color-gray-100)]" />
        {/* 다른 유저의 생각 */}
        <RelatedPostsSection categoryLabel={newsData.category_id ?? null} />
        <div className="border-b border-[var(--color-gray-20)] mt-9 dark:border-[var(--color-gray-100)]" />
        {/* 관심 가질만한 다른 뉴스 섹션 */}
        <RelatedNewsSection
          categoryLabel={newsData.category_id ?? null}
          currentNewsId={newsData.news_id ?? null}
        />
      </div>
    </div>
  );
}
