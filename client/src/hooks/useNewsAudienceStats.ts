// hooks/useNewsAudienceStats.ts
import { useQuery } from "@tanstack/react-query";
import {
  getNewsAudienceStats,
  GenderStats,
  AgeStats,
} from "@/utils/getNewsAudienceStats";

interface AudienceStatsResult {
  gender: GenderStats | null;
  age: AgeStats | null;
  hasData: boolean;
}

export function useNewsAudienceStats(newsId: string | null) {
  console.log("[useNewsAudienceStats] called with newsId:", newsId);

  return useQuery<AudienceStatsResult>({
    queryKey: ["newsAudience", newsId],
    queryFn: async () => {
      console.log("[useNewsAudienceStats] queryFn 실행, newsId:", newsId);

      if (!newsId) {
        console.log("[useNewsAudienceStats] newsId 없음 → 빈 데이터 반환");
        return { gender: null, age: null, hasData: false };
      }

      const result = await getNewsAudienceStats(newsId);
      console.log(
        "[useNewsAudienceStats] getNewsAudienceStats result:",
        result
      );
      return result;
    },
    enabled: !!newsId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
