"use client";

import { useState } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import NewsSection from "./NewsSection";
import SummaryModal from "../ui/SummaryModal";
import { useQuery } from "@tanstack/react-query";
import { useAutoNewsFetch } from "@/hooks/useAutoNewsFetch";
import createClient from "@/utils/supabase/client";
import { getSupabaseInterestNews } from "@/lib/api/getNewstoSupabase";

export default function Home({
  initialNews,
  interests,
}: {
  initialNews: NewsData[];
  interests: string[];
}) {
  const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);

  useAutoNewsFetch();

  const { data: newsData, isError } = useQuery({
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
                handleSummary={() => setSelectedNews(data)}
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
