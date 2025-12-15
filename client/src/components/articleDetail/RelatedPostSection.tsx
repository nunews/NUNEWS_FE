"use client";

import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import createClient from "@/utils/supabase/client";
import RecommendPost from "@/components/ui/RecommendPost";
import { categoryIdMap } from "@/lib/categoryUUID";

interface RelatedPostsSectionProps {
  categoryLabel: string | null;
}

interface PostRow {
  post_id: number;
  title: string;
  contents: string;
  like_count: number | null;
  view_count: number | null;
}

const RelatedPostsSection = ({ categoryLabel }: RelatedPostsSectionProps) => {
  const supabase = createClient();

  const categoryUUID = useMemo(() => {
    if (!categoryLabel) return null;

    const uuid = categoryIdMap[categoryLabel as keyof typeof categoryIdMap];

    return uuid ?? null;
  }, [categoryLabel]);

  const { data, isLoading, isError } = useQuery<PostRow[]>({
    queryKey: ["related-posts", categoryUUID],
    enabled: !!categoryUUID,
    queryFn: async () => {
      if (!categoryUUID) return [];

      const { data, error } = await supabase
        .from("Post")
        .select("post_id, title, contents, like_count, view_count")
        .eq("category_id", categoryUUID);

      if (error) {
        console.error("[RelatedPostsSection] Supabase error:", error);
        throw error;
      }

      return data || [];
    },
  });

  // 랜덤 3개 뽑기
  const randomPosts = useMemo(() => {
    if (!data || data.length === 0) return [];
    const shuffled = [...data].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 3);
  }, [data]);

  if (!categoryUUID) return null;

  if (isLoading) {
    return (
      <div className="mb-8 mt-10">
        <h2 className="text-[22px] font-bold mb-6">
          <span className="text-[var(--color-black)]">다른 유저의 생각</span>
        </h2>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-lg bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !randomPosts.length) {
    return (
      <div className="mb-8 mt-10">
        <h2 className="text-[22px] font-bold mb-2">
          <span className="text-[var(--color-black)]">
            &#39;{categoryLabel}&#39;
          </span>
          <span className="text-[var(--color-gray-80)]">
            에 대한 다른 유저의 생각
          </span>
        </h2>
        <p className="text-sm text-[var(--color-gray-80)]">
          아직 이 카테고리에는 작성된 글이 없어요.
        </p>
      </div>
    );
  }

  return (
    <div className="mb-8 mt-10">
      <h2 className="text-[22px] font-bold mb-2">
        <span className="text-[var(--color-black)]">
          &#39;{categoryLabel}&#39;
        </span>
        <span className="text-[var(--color-gray-80)]">
          에 대한 다른 유저의 생각
        </span>
      </h2>
      <div className="space-y-[10px]">
        {randomPosts.map((post) => (
          <RecommendPost
            key={post.post_id}
            postId={post.post_id}
            title={post.title}
            content={post.contents}
            likes={post.like_count ?? 0}
            views={post.view_count ?? 0}
          />
        ))}
      </div>
    </div>
  );
};

export default RelatedPostsSection;
