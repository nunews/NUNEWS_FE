"use client";

import { useQuery } from "@tanstack/react-query";
import createClient from "@/utils/supabase/client";
import {
  getSupabaseInterestNews,
  getSupabaseRandomNews,
} from "@/lib/api/getNewstoSupabase";
import { getUserInterestsFromClient } from "@/lib/api/getUserInterests";
import { useEffect, useState } from "react";

export function useNewsData() {
  const [interests, setInterests] = useState<string[]>([]);
  const [categoryIds, setCategoryIds] = useState<string[]>([]);
  useEffect(() => {
    async function load() {
      const { interests: userInterests, categoryIds } =
        await getUserInterestsFromClient();
      setInterests(userInterests);
      setCategoryIds(categoryIds);
    }
    load();
  }, []);
  return useQuery({
    queryKey: ["newsData", interests],
    queryFn: async () => {
      const supabase = createClient();

      const [
        {
          data: { user },
        },
      ] = await Promise.all([
        supabase.auth.getUser(),
        getUserInterestsFromClient(),
      ]);

      if (user && categoryIds.length > 0) {
        return await getSupabaseInterestNews(categoryIds);
      }

      return await getSupabaseRandomNews();
    },

    staleTime: 1000 * 60 * 5,
    refetchOnMount: true,
    refetchInterval: 1000 * 60 * 60,
  });
}
