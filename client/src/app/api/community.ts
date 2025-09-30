import supabase from "@/utils/supabase";
//게시글 목록 전체 불러오기
export const fetchPost = async () => {
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("게시글 불러오기 실패");
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  return data ?? [];
};
// 게시글 작성자 정보 불러오기(이름,프로필사진)
export const fetchWriter = async (userId: number) => {
  const { data, error } = await supabase
    .from("User")
    .select("nickname, profile_image")
    .eq("user_id", userId);

  if (error) {
    console.error("작성자 정보 불러오기 실패", error.message);
    throw new Error("작성자 정보를 불러오는데 실패했습니다.");
  }
  return data?.[0] ?? null; //단일 사용자
};

//게시글 좋아요 수 불러오기
export const fetchLike = async (postId: number) => {
  const { count, error } = await supabase
    .from("Like")
    .select("*", { count: "exact", head: true })
    .eq("post_id", postId);

  if (error) {
    console.error("좋아요 정보 불러오기 실패", error.message);
    throw new Error("좋아요 정보를 불러오는데 실패했습니다.");
  }
  return count ?? 0;
};

//게시글 좋아요 수 업데이트
export const postLike = async (postId: number, userId: number) => {
  if (userId) {
    const { error } = await supabase
      .from("Like")
      .insert([
        {
          user_id: userId,
          post_id: postId,
          comments_id: null,
          news_id: null,
        },
      ])
      .select();

    if (error) {
      alert("좋아요 업로드 실패");
      console.error("좋아요 업로드 실패!:", error);
      throw new Error("좋아요 저장 실패");
    } else {
      console.log("좋아요업로드완료:", postId, userId);
    }
  }
};

//좋아요 삭제
export const postUnlike = async (postId: number, userId: number) => {
  if (!userId || !postId) {
    console.warn("userId나 postId가 없습니다");
    return;
  }
  const { error: deleteError } = await supabase
    .from("Like")
    .delete()
    .eq("post_id", postId)
    .eq("user_id", userId);
  if (deleteError) {
    alert("좋아요 취소 실패");
    console.error("좋아요 삭제 실패", deleteError);
    throw new Error("좋아요 삭제 실패");
  } else {
    console.log("좋아요삭제완료:", postId, userId);
  }
};

//좋아요 여부
export const isLikedByUser = async (postId: number, userId: number) => {
  const { data, error } = await supabase
    .from("Like")
    .select("like_id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .maybeSingle(); //한개 또는 null
  if (error) {
    console.error("좋아요 상태 확인 실패:", error);
    return false;
  }
  return !!data;
};
//post-detail

//post-create
