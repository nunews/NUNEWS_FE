"use client";

import { useState, useCallback, useEffect } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import NewsSection from "./NewsSection";
import SummaryModal from "../ui/SummaryModal";
import { useQuery } from "@tanstack/react-query";
import { useAutoNewsFetch } from "@/hooks/useAutoNewsFetch";
import createClient from "@/utils/supabase/client";
import { getSupabaseInterestNews } from "@/lib/api/getNewstoSupabase";
import { useRouter } from "next/navigation";

export default function Home({
  initialNews,
  interests,
}: {
  initialNews: NewsData[];
  interests: string[];
}) {
  const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  const router = useRouter();
  useAutoNewsFetch();

  const supabase = createClient();

  const { data: newsData = [], isError } = useQuery({
    queryKey: ["newsData", interests],
    queryFn: async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: userInterests } = await supabase
        .from("User_Interests")
        .select("category_id")
        .eq("user_id", user?.id);

      const categoryIds =
        userInterests?.map((interest) => interest.category_id) || [];
      return await getSupabaseInterestNews(categoryIds);
    },

    initialData: initialNews,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 60,
  });

  //로그인 유저 정보 가져오기 (스크랩용)
  const fetchUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) setUserId(user.id);
  }, [supabase]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  //요약보기 버튼 핸들러
  // TODO: 비로그인 시 토스트 출력 및 요약 생성 X
  const handleSummaryClick = (news: NewsData) => {
    setSelectedNews(news);
  };

  //원문 보기 버튼 클릭 시: 조회수 +1 후 디테일 페이지로 이동
  const handleViewOriginalClick = async (news: NewsData) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("로그인 유저 확인 오류", error);
      }

      if (user) {
        const { error: viewError } = await supabase.rpc("increment_news_view", {
          p_news_id: news.article_id,
        });

        if (viewError) {
          console.error("조회수 증가 실패", viewError);
        }
      }
    } catch (e) {
      console.error("조회수 증가 처리 중 오류", e);
    }

    router.push(`/newsDetail/${news.article_id}`);
  };

  return (
    <>
      <div className="h-screen scrollbar-hide">
        <Header logo={true} page="nuPick" interest={interests} />
        <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
          {!isError &&
            newsData.length > 0 &&
            newsData.map((data: NewsData, idx: number) => (
              <NewsSection
                key={data.article_id}
                className="snap-start"
                data={data}
                likes={data.likes ?? 0}
                views={data.views ?? 0}
                handleSummary={() => handleSummaryClick(data)}
                handleDetail={() => handleViewOriginalClick(data)}
                userId={userId}
                newsId={data.article_id}
                isFirst={idx === 0}
              />
            ))}
        </main>
        <Footer isNuPick />
        {selectedNews && (
          <div
            key={selectedNews.article_id}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full px-2.5 z-50 max-w-[1024px]"
          >
            <SummaryModal
              isOpen={!!selectedNews}
              onClose={() => setSelectedNews(null)}
              newsContent={selectedNews.content || ""}
              newsId={selectedNews.article_id || ""}
            />
          </div>
        )}
      </div>
    </>
  );
}
