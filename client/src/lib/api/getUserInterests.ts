import { createServerSupabase } from "@/utils/supabase/server";
import { getAuthUser } from "../auth/getAuthUser";
import { CategoryInv } from "../interest";
import createClient from "@/utils/supabase/client";

export async function getUserInterestsFromServer() {
  const { user, isLoggedIn } = await getAuthUser();

  if (!isLoggedIn || !user) {
    console.log("로그인 상태가 아닙니다.");
    return { interests: [], categoryIds: [] };
  }

  const supabase = await createServerSupabase();

  const { data: userInterest, error } = await supabase
    .from("User_Interests")
    .select("category_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("관심사 조회 실패", error.message);
    return { interests: [], categoryIds: [] };
  }

  if (!userInterest?.length) {
    console.log("등록된 관심사가 없습니다.");
    return { interests: [], categoryIds: [] };
  }

  const interests = userInterest.map(
    (c) => CategoryInv[c.category_id] ?? "기타"
  );

  const categoryIds = userInterest.map((c) => c.category_id);

  return { interests, categoryIds };
}

export async function getUserInterestsFromClient() {
  const { user, isLoggedIn } = await getAuthUser();

  if (!isLoggedIn || !user) {
    console.log("로그인 상태가 아닙니다.");
    return { interests: [], categoryIds: [] };
  }

  const supabase = createClient();

  const { data: userInterest, error } = await supabase
    .from("User_Interests")
    .select("category_id")
    .eq("user_id", user.id);

  if (error) {
    console.error("관심사 조회 실패", error.message);
    return { interests: [], categoryIds: [] };
  }

  if (!userInterest?.length) {
    console.log("등록된 관심사가 없습니다.");
    return { interests: [], categoryIds: [] };
  }

  const interests = userInterest.map(
    (c) => CategoryInv[c.category_id] ?? "기타"
  );

  const categoryIds = userInterest.map((c) => c.category_id);

  return { interests, categoryIds };
}
