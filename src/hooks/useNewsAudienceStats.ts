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
  return useQuery<AudienceStatsResult>({
    queryKey: ["newsAudience", newsId],
    queryFn: async () => {
      if (!newsId) {
        return { gender: null, age: null, hasData: false };
      }

      const result = await getNewsAudienceStats(newsId);

      return result;
    },
    enabled: !!newsId,
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });
}
