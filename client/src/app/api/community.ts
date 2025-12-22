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

// 아이디로 게시글 불러오기
export const fetchPostById = async (postId: string) => {
  const { data, error } = await supabase
    .from("Post")
    .select("*")
    .eq("post_id", postId)
    .single();
  if (error) {
    console.error("게시글 불러오기 실패");
    throw new Error("게시글을 불러오는데 실패했습니다.");
  }
  // console.log("게시글정보", data);
  return data;
};

// 게시글 작성자 정보 불러오기(이름,프로필사진)
export const fetchWriter = async (userId: string) => {
  const { data, error } = await supabase
    .from("User")
    .select("nickname, profile_image")
    .eq("user_id", userId);
  // .single();
  if (error) {
    console.error("작성자 정보 불러오기 실패", error.message);
    throw new Error("작성자 정보를 불러오는데 실패했습니다.");
  }
  // console.log("작성자 정보:", data);
  return data[0] ?? null; //단일 사용자
};

//게시글 좋아요 수 불러오기
export const fetchLike = async (postId: string) => {
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
export const postLike = async (postId: string, userId: string) => {
  if (userId) {
    const { error } = await supabase
      .from("Like")
      .insert([
        {
          user_id: userId,
          post_id: postId,
          comment_id: null,
          news_id: null,
        },
      ])
      .select();

    if (error) {
      console.error("좋아요 업로드 실패!:", error);
      throw new Error("좋아요 저장 실패");
    } else {
      console.log("좋아요업로드완료:", postId, userId);
    }
  }
};
//게시글 좋아요 업데이트 임시
export const postLikeTmp = async (postId: string, likecnt: number) => {
  if (postId) {
    const { data, error } = await supabase
      .from("Post")
      .update({
        like_count: likecnt,
      })
      .eq("post_id", postId);

    if (error) {
      console.error("좋아요 업로드 실패!:", error);
      throw new Error("좋아요 저장 실패");
    } else {
      console.log("좋아요업로드완료:", postId);
    }
    return data;
  }
};
//좋아요 삭제
export const postUnlike = async (postId: string, userId: string) => {
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
export const isLikedByUser = async (postId: string, userId: string) => {
  const { data, error } = await supabase
    .from("Like")
    .select("like_id")
    .eq("post_id", postId)
    .eq("user_id", userId)
    .limit(1);
  //.maybeSingle(); //한개 또는 null
  if (error) {
    console.error("좋아요 상태 확인 실패:", error);
    return false;
  }
  return (data?.length ?? 0) > 0;
};
//post-detail

//post-create
export const postCreate = async (
  userId: string,
  categoryId: string,
  title: string,
  content: string,
  content_image: string | null
) => {
  const { data, error } = await supabase
    .from("Post")
    .insert([
      {
        user_id: userId,
        category_id: categoryId,
        title: title,
        contents: content,
        content_image: content_image,
      },
    ])
    .select();
  if (error) {
    console.error("게시글 업로드 실패:", error);
  } else {
    console.log("게시글 업로드완료:", title);
  }
  return data;
};

//사용자 정보 불러오기
export const fetchUser = async (email: string) => {
  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("email", email)
    .single();
  if (error) {
    console.error("사용자 정보 불러오기 실패:", error);
  } else {
    // console.log("사용자 정보:", data);
    return data;
  }
};
//댓글 불러오기
export const fetchComment = async (postId: string) => {
  const { data, error } = await supabase
    .from("Comments")
    .select("*")
    .eq("post_id", postId);
  if (error) {
    console.error("댓글 정보 불러오기 실패:", error);
  } else {
    // console.log("댓글 정보:", data);
    return data;
  }
};
//댓글 추가
export const postComment = async (
  comment: string,
  userId: string,
  postId: string
) => {
  if (!userId || !postId || !comment) {
    console.warn("userId,postId 또는 comment가 없습니다");
    return;
  }
  const { data, error } = await supabase
    .from("Comments")
    .insert([
      {
        user_id: userId,
        post_id: postId,
        content: comment,
      },
    ])
    .select();

  if (error) {
    console.error("댓글 업로드 실패!:", error);
    throw new Error("댓글 저장 실패");
  } else {
    console.log("댓글업로드완료:", postId, userId, comment);
  }
  return data;
};
//댓글 수정
export const updateComment = async (commentId: string, comment: string) => {
  if (!commentId || !comment) {
    console.warn("userId,postId 또는 comment가 없습니다");
    return;
  }
  const { data, error } = await supabase
    .from("Comments")
    .update([
      {
        content: comment,
      },
    ])
    .eq("comment_id", commentId);

  if (error) {
    console.error("댓글 수정 실패!:", error);
  } else {
    console.log("댓글수정완료:", commentId, comment);
  }
  return data;
};

//댓글 삭제
export const deleteComment = async (commentId: string) => {
  if (!commentId) {
    console.warn("댓글 id가 없습니다");
    return;
  }
  const { error: deleteError } = await supabase
    .from("Comments")
    .delete()
    .eq("comment_id", commentId);
  if (deleteError) {
    console.error("댓글 삭제 실패", deleteError);
  } else {
    console.log("댓글 삭제 완료:", commentId);
  }
};

//조회수 업데이트
export const postView = async (postId: string, viewcnt: number) => {
  if (postId) {
    const { data, error } = await supabase
      .from("Post")
      .update({
        view_count: viewcnt,
      })
      .eq("post_id", postId);

    if (error) {
      console.error("조회수 업로드 실패!:", error);
      throw new Error("조회수 저장 실패");
    } else {
      console.log("조회수 업로드완료:", postId, viewcnt);
    }
    return data;
  }
};

//관심사 불러오기
export const fetchInterests = async (userId: string) => {
  if (!userId) {
    console.error("userid가 존재하지 않습니다");
    return;
  }
  const { data, error } = await supabase
    .from("User_Interests")
    .select("category_id")
    .eq("user_id", userId);
  if (error) {
    console.error("관심사 불러오기 실패", error);
  }
  // console.log("interest", data);
  return data ?? [];
};
