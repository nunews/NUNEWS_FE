import {
  getSupabaseInterestNews,
  getSupabaseRandomNews,
} from "@/lib/api/getNewstoSupabase";
import { categoryIdMap } from "@/lib/categoryUUID";
import { useQuery } from "@tanstack/react-query";

export function useAllPickNews(selectedCategory: string) {
  return useQuery({
    queryKey: ["allpickNews", selectedCategory],
    queryFn: async () => {
      // 전체
      if (selectedCategory === "전체") {
        return await getSupabaseRandomNews();
      }

      const categoryUUID =
        categoryIdMap[selectedCategory as keyof typeof categoryIdMap];

      if (!categoryUUID) {
        throw new Error("카테고리를 찾을 수 없습니다.");
      }

      const categoryNews = await getSupabaseInterestNews([categoryUUID]);

      // 대체할 뉴스
      if (!categoryNews || categoryNews.length < 10) {
        return await getSupabaseRandomNews();
      }

      return categoryNews;
    },
    staleTime: 1000 * 60 * 10,
  });
}
