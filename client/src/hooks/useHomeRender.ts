import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { newsInteractionsOptions } from "@/lib/queries/newInterectionQuery";

export function useHomeRender(newsIds: string[]) {
  const userId = useAuthStore((state) => state.userId);
  const options = newsInteractionsOptions.list(newsIds, userId);

  return useQuery({
    queryKey: options.queryKey,
    queryFn: options.queryFn,
    enabled: options.enabled,
    staleTime: options.staleTime,
    refetchOnWindowFocus: options.refetchOnWindowFocus,
  });
}
