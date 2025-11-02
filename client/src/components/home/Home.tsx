"use client";

import { useState } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import NewsSection from "./NewsSection";
import SummaryModal from "../ui/SummaryModal";
import { useQuery } from "@tanstack/react-query";
import { fetchNewsData } from "@/lib/api/fetchNews";
import { useAutoNewsFetch } from "@/hooks/useAutoNewsFetch";

export default function Home({
  initialNews,
}: {
  initialNews: SupabaseNewsData[];
}) {
  const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);
  useAutoNewsFetch();

  const {
    data: newsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["newsData"],
    queryFn: async () => {
      const freshNews = await fetchNewsData("korean");
      return freshNews;
    },
    initialData: initialNews,
    staleTime: 1000 * 60 * 60,
    refetchInterval: 1000 * 60 * 60,
  });

  // 임시 로딩화면
  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F0FFBC] border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-600">
            뉴스를 불러오는 중...
          </p>
          <p className="text-sm text-gray-400">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen scrollbar-hide">
        <Header logo={true} page="nuPick" interest={["정치", "연예"]} />
        <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
          {!isError &&
            newsData.length > 0 &&
            newsData.map((data: SupabaseNewsData) => (
              <NewsSection
                key={data.news_id}
                className="snap-start"
                data={data}
                handleSummary={() => setSelectedNews(data)}
              />
            ))}
        </main>
        <Footer isNuPick />
        {selectedNews && (
          <div
            key={selectedNews.news_id}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full px-2.5 z-50 max-w-[1024px]"
          >
            <SummaryModal
              isOpen={!!selectedNews}
              onClose={() => setSelectedNews(null)}
              newsContent={selectedNews.content || ""}
              newsId={selectedNews.news_id || ""}
            />
          </div>
        )}
      </div>
    </>
  );
}
