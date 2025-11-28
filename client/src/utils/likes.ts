import createClient from "@/utils/supabase/client";

/**
 * 현재 로그인 유저 가져오기
 */
async function getCurrentUser() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) throw error;
  return user;
}

/**
 * 특정 뉴스의 총 좋아요 개수 조회
 * Like 테이블에서 news_id 기준으로 count
 */
export async function getLikesCount(newsId: string): Promise<number> {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("Like")
    .select("*", { count: "exact", head: true })
    .eq("news_id", newsId);

  if (error) {
    console.error("getLikesCount 실패:", error);
    throw error;
  }

  return count ?? 0;
}

/**
 * 현재 로그인 유저가 이 뉴스를 좋아요 했는지 여부
 */
export async function getLikesStatus(newsId: string): Promise<boolean> {
  const supabase = createClient();
  const user = await getCurrentUser();

  // 비로그인 유저면 무조건 false
  if (!user) return false;

  const { data, error } = await supabase
    .from("Like")
    .select("like_id")
    .eq("news_id", newsId)
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (error && error.code !== "PGRST116") {
    // PGRST116: no rows found
    console.error("getLikesStatus 실패:", error);
    throw error;
  }

  return !!data;
}

/**
 * 좋아요 토글
 * - 이미 좋아요 상태면 Like row 삭제 + like_count 감소
 * - 아직 안 눌렀으면 Like row 추가 + like_count 증가
 * - 항상 최종 like_count를 다시 계산해서 News.like_count에 반영
 */
export async function toggleLike(
  newsId: string
): Promise<{ isLiked: boolean; likedCount: number }> {
  const supabase = createClient();
  const user = await getCurrentUser();

  if (!user) {
    throw new Error("로그인이 필요합니다.");
  }

  //현재 좋아요 여부 확인
  const { data: existingLike, error: existingError } = await supabase
    .from("Like")
    .select("like_id")
    .eq("news_id", newsId)
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (existingError && existingError.code !== "PGRST116") {
    console.error("toggleLike - 기존 좋아요 조회 실패:", existingError);
    throw existingError;
  }

  let isLiked: boolean;

  if (existingLike) {
    //이미 좋아요 눌렀으면 삭제
    const { error: deleteError } = await supabase
      .from("Like")
      .delete()
      .eq("like_id", existingLike.like_id);

    if (deleteError) {
      console.error("toggleLike - 좋아요 삭제 실패:", deleteError);
      throw deleteError;
    }

    isLiked = false;
  } else {
    //아직 안 눌렀으면 새 row 추가
    const { error: insertError } = await supabase.from("Like").insert({
      user_id: user.id,
      news_id: newsId,
    });

    if (insertError) {
      console.error("toggleLike - 좋아요 추가 실패:", insertError);
      throw insertError;
    }

    isLiked = true;
  }

  //최신 좋아요 개수 다시 계산
  const likedCount = await getLikesCount(newsId);

  //News 테이블의 like_count 컬럼도 동기화 (캐시용)
  const { error: updateError } = await supabase
    .from("News")
    .update({ like_count: likedCount })
    .eq("news_id", newsId);

  if (updateError) {
    console.error("toggleLike - News.like_count 업데이트 실패:", updateError);
    // 여기서 굳이 throw 하지 않고, 프론트는 likedCount만 믿고 가도 됨
  }

  return { isLiked, likedCount };
}
