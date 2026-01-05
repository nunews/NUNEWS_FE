import {
  deleteComment,
  fetchComment,
  postComment,
  updateComment,
} from "@/app/api/community";
import { useAuthStore } from "@/stores/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function usePostComments(postId: string) {
  const userId = useAuthStore((state) => state.userId);
  const queryClient = useQueryClient();

  //댓글 불러오기
  const { data: comments = [] } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => {
      if (!postId) {
        console.error("postId가 존재하지 않습니다");
        return;
      }

      return fetchComment(postId);
    },
    enabled: !!postId,
  });

  //댓글 추가하기
  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: string) => {
      if (!postId) {
        throw new Error("postId가 존재하지 않습니다");
      }
      if (!userId) {
        throw new Error("로그인이 필요합니다");
      }

      return postComment(newComment, userId, postId);
    },
    onMutate: async (newComment) => {
      if (!userId) return;
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });

      //현재 댓글 목록 가져오기
      const prevComments = queryClient.getQueryData<Comment[]>([
        "comments",
        postId,
      ]);

      //새 댓글 추가
      queryClient.setQueryData(["comments", postId], (old: Comment[] = []) => [
        {
          comment_id: `temp-${Date.now()}`,
          user_id: userId,
          post_id: postId,
          content: newComment,
          created_at: new Date().toISOString(),
          optimistic: true,
        },
        ...old,
      ]);
      return { prevComments };
    },
    onError: (error, _, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(["comments", postId], context.prevComments);
      }
      console.error("댓글 업로드 실패!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
  });

  //댓글 수정
  const { mutate: editComment } = useMutation({
    mutationFn: ({
      commentId,
      newComment,
    }: {
      commentId: string;
      newComment: string;
    }) => updateComment(commentId, newComment),
    //낙관적 댓글 삭제
    onMutate: async ({ commentId, newComment }) => {
      //해당 쿼리 일시 중지
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });

      //현재 댓글 목록
      const prevComments = queryClient.getQueryData(["comments", postId]);

      queryClient.setQueryData(["comments", postId], (old: Comment[]) =>
        old?.map((comment: Comment) =>
          comment.comment_id === commentId
            ? { ...comment, content: newComment, optimistic: true }
            : comment
        )
      );
      return { prevComments };
    },
    onError: (error, _, context) => {
      console.error("댓글 수정 실패", error);
      if (context?.prevComments) {
        queryClient.setQueryData(["comments", postId], context.prevComments);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
  });

  //댓글 삭제
  const { mutate: removeComment } = useMutation({
    mutationFn: (commentId: string) => deleteComment(commentId),
    //낙관적 댓글 삭제
    onMutate: async (commentId) => {
      //해당 쿼리 일시 중지
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });

      //현재 댓글 목록
      const prevComments = queryClient.getQueryData(["comments", postId]);

      queryClient.setQueryData(["comments", postId], (old: Comment[]) =>
        old?.filter((c: Comment) => String(c.comment_id) !== String(commentId))
      );
      return { prevComments };
    },
    onError: (error, _, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(["comments", postId], context.prevComments);
      }
      console.error("댓글 삭제 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
  });

  return {
    comments,
    addComment,
    editComment,
    removeComment,
  };
}
