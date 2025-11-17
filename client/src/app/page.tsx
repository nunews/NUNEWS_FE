import Home from "@/components/home/Home";
import Splash from "@/components/home/Splash";
import { loadNewsData } from "@/lib/actions/loadNewsData";
import {
  getSupabaseInterestNews,
  getSupabaseRandomNews,
} from "@/lib/api/getNewstoSupabase";
import { getUserInterests } from "@/lib/api/getUserInterests";
import { createServerSupabase } from "@/utils/supabase/server";
import { Suspense } from "react";

export default async function HomePage() {
  const supabase = await createServerSupabase();
  const { interests, categoryIds } = await getUserInterests();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) console.error("유저 확인 실패", userError);

  let initialNews = [];

  await loadNewsData();
  if (!userError && user) {
    if (categoryIds.length > 0) {
      // 로그인 & 관심사 유
      initialNews = await getSupabaseInterestNews(categoryIds);
    } else {
      // 로그인 & 관심사 무
      initialNews = await getSupabaseRandomNews();
    }
  } else {
    // 비로그인
    initialNews = await getSupabaseRandomNews();
  }

  return (
    <Suspense fallback={<Splash />}>
      <Home initialNews={initialNews} interests={interests} />
    </Suspense>
  );
}
