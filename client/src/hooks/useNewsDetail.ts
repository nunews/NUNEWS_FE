import { useQuery } from "@tanstack/react-query";
import { getSupabaseOneNews } from "@/lib/api/getSupabaseOneNews";

export function useNewsDetail(newsId?: string) {
  return useQuery({
    queryKey: ["news-detail", newsId],
    queryFn: () => getSupabaseOneNews(newsId as string),
    enabled: !!newsId,
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 60,
  });
}
