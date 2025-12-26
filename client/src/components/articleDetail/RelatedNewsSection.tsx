"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import createClient from "@/utils/supabase/client";
import RecommendNews from "@/components/ui/RecommendNews";
import { categoryIdMap } from "@/lib/categoryUUID";
import { useRouter } from "next/navigation";

interface RelatedNewsSectionProps {
  categoryLabel: string | null; //한글 카테고리 명
  currentNewsId?: string | null;
}

interface NewsRow {
  news_id: string;
  title: string;
  image_url: string | null;
  like_count: number | null;
  view_count: number | null;
}

const RelatedNewsSection = ({
  categoryLabel,
  currentNewsId,
}: RelatedNewsSectionProps) => {
  const supabase = createClient();
  const route = useRouter();

  const categoryUUID = useMemo(() => {
    if (!categoryLabel) return null;

    return categoryIdMap[categoryLabel as keyof typeof categoryIdMap] ?? null;
  }, [categoryLabel]);

  const { data, isLoading, isError } = useQuery<NewsRow[]>({
    queryKey: ["related-news", categoryUUID, currentNewsId],
    enabled: !!categoryUUID,
    queryFn: async () => {
      if (!categoryUUID) return [];

      let query = supabase
        .from("News")
        .select(
          "news_id, title, image_url, like_count, view_count, category_id"
        )
        .eq("category_id", categoryUUID);

      if (currentNewsId) {
        query = query.neq("news_id", currentNewsId);
      }

      const { data, error } = await query;

      //console.log("[RelatedNews] raw supabase result:", { data, error });

      if (error) {
        console.error("[RelatedNewsSection] Supabase error:", error);
        throw error;
      }

      return data || [];
    },
  });

  const randomNews = useMemo(() => {
    if (!data || data.length === 0) return [];
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [data]);

  if (!categoryUUID || !categoryLabel) return null;

  if (isLoading) {
    return (
      <div className="mb-[75px] mt-10">
        <h2 className="text-[22px] font-bold mb-6">관심 가질만한 다른 뉴스</h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 rounded-lg bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !randomNews.length) {
    return (
      <div className="mb-[75px] mt-10">
        <h2 className="text-[22px] font-bold mb-2">관심 가질만한 다른 뉴스</h2>
        <p className="text-sm text-[var(--color-gray-80)]">
          아직 이 카테고리에는 다른 뉴스가 없어요.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-[75px] mt-10">
      <h2 className="text-[22px] font-bold mb-6">관심 가질만한 다른 뉴스</h2>
      <div className="space-y-4">
        {randomNews.map((news) => (
          <button
            key={news.news_id}
            type="button"
            onClick={() => route.push(`/newsDetail/${news.news_id}`)}
            className="block w-full text-left"
          >
            <RecommendNews
              key={news.news_id}
              title={news.title}
              category={categoryLabel || ""}
              image={news.image_url || "/images/default_nunew.svg"}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RelatedNewsSection;
