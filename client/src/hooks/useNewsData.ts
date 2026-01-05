import {
  getSupabaseInterestNews,
  getSupabaseRandomNews,
} from "@/lib/api/getNewstoSupabase";
import { useQuery } from "@tanstack/react-query";

import { useAuthStore } from "@/stores/authStore";
export function useNewsData() {
  const userId = useAuthStore((state) => state.userId);
  const categoryIds = useAuthStore((state) => state.interest);

  return useQuery({
    queryKey: ["newsData", categoryIds, userId],
    queryFn: async () => {
      if (userId && categoryIds.length > 0) {
        return await getSupabaseInterestNews(categoryIds);
      }

      return await getSupabaseRandomNews();
    },
    staleTime: 1000 * 60 * 60,
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 60, // 1시간마다 패치
  });
}
