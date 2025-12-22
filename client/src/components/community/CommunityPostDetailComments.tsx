"use client";
import { PiPaperPlaneTiltLight } from "react-icons/pi";
import Input from "../ui/Input";
import Comment from "./Comment";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  fetchComment,
  postComment,
  updateComment,
} from "@/app/api/community";
import { useState } from "react";
import { getCurrentUser } from "@/app/api/auth";

export default function CommunityPostDetailComments({
  postId,
}: {
  postId: string;
}) {
  const [comment, setComment] = useState(""); //추가한 댓글
  //사용자 정보 불러오기
  const { data: authData } = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const user = await getCurrentUser();
      if (!user) throw new Error("사용자 정보가 없습니다");
      return user;
    },
  });
  const userId = authData?.id;
  //댓글 불러오기
  const { data: commentData } = useQuery({
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

  const queryClient = useQueryClient();
  //댓글 추가하기
  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: string) => {
      if (!postId) {
        throw new Error("postId가 존재하지 않습니다");
      }
      return postComment(newComment, authData!.id, postId);
    },
    onMutate: async (newComment) => {
      console.log("낙관적 업데이트 시작");
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });

      //현재 댓글 목록 가져오기
      const prevComments = queryClient.getQueryData<Comment[]>([
        "comments",
        postId,
      ]);
      // console.log("prevComments", prevComments);

      //새 댓글 추가
      queryClient.setQueryData(["comments", postId], (old: Comment[]) => [
        ...(old || []),
        {
          comment_id: `temp-${Date.now()}`,
          user_id: userId,
          post_id: postId,
          content: newComment,
          created_at: new Date().toISOString(),
          optimistic: true,
        },
      ]);
      return { prevComments };
    },
    onError: (error, _, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(["comments", postId], context.prevComments);
      }
      // console.error(error);
      alert("댓글 업로드 실패!");
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
      // console.log("낙관적 수정 실행", commentId);

      //해당 쿼리 일시 중지
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });

      //현재 댓글 목록
      const prevComments = queryClient.getQueryData(["comments", postId]);
      console.log("prevComments", prevComments);

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
      alert("댓글 수정 실패");
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
      console.log("낙관적 삭제 실행", commentId);

      //해당 쿼리 일시 중지
      await queryClient.cancelQueries({
        queryKey: ["comments", postId],
      });

      //현재 댓글 목록
      const prevComments = queryClient.getQueryData(["comments", postId]);
      console.log("prevComments", prevComments);

      queryClient.setQueryData(["comments", postId], (old: Comment[]) =>
        old?.filter((c: Comment) => String(c.comment_id) !== String(commentId))
      );
      return { prevComments };
    },
    onError: (error, _, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(["comments", postId], context.prevComments);
      }
      alert("댓글 삭제 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postId],
      });
    },
  });
  const commentHandler = () => {
    addComment(comment);
    setComment("");
  };
  return (
    <>
      {/* 댓글 입력*/}
      <div className="mt-6">
        <Input
          rightSlot={
            <PiPaperPlaneTiltLight
              onClick={commentHandler}
              className="w-4 h-4 text-[var(--color-gray-100)] dark:text-[var(--color-white)] cursor-pointer"
            />
          }
          placeholder="댓글을 입력해주세요"
          className="rounded-[50px] w-[320px] h-[50px] text-[var(--color-black)] dark:text-[var(--color-white)] text-base"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      {/* 댓글 */}
      {[...(commentData ?? [])]
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )
        .map((comment, i) => (
          <div key={comment.comment_id ?? i} className="relative">
            <Comment
              userId={comment.user_id}
              comment={comment.content}
              created_at={comment.created_at}
              onDelete={() => removeComment(comment.comment_id)}
              onUpdate={(newContent) =>
                editComment({
                  commentId: comment.comment_id,
                  newComment: newContent,
                })
              }
            />
          </div>
        ))}
    </>
  );
}
