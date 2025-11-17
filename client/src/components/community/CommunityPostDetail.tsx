"use client";
import Image from "next/image";
import profileImg from "../../assets/images/profile1.png";
import postImg from "../../../public/images/dance.jpg";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import Input from "../ui/Input";
import { PiPaperPlaneTiltLight } from "react-icons/pi";
import { useState } from "react";

import { useParams } from "next/navigation";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  fetchComment,
  fetchPostById,
  fetchWriter,
  postComment,
  postLikeTmp,
  updateComment,
} from "@/app/api/community";
import { CategoryInv } from "@/lib/interest";
import { getCurrentUser } from "@/app/api/auth";
import Comment from "./Comment";

export default function CommunityPostDetail() {
  const [comment, setComment] = useState(""); //추가한 댓글
  const [like, setLike] = useState(false); //사용자 좋아요 여부

  const params = useParams();
  const postId = params.postId;

  const { data: postDetailData, isLoading } = useQuery<Post>({
    queryKey: ["postDetail"],
    queryFn: async () => {
      const post = await fetchPostById(postId as string);
      if (!post) {
        console.error("게시글 정보가 없습니다");
        return;
      }
      return post;
    },
    enabled: !!postId,
  });
  const [likeCount, setLikeCount] = useState(postDetailData?.like_count ?? 0);
  const writerId = postDetailData?.user_id;
  // console.log("writerId", writerId);

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
  //게시글 작성자 정보 불러오기
  const { data: writerData } = useQuery({
    queryKey: ["writerDetail", writerId],
    queryFn: () => fetchWriter(writerId as string),
    enabled: !!writerId,
  });

  //댓글 불러오기
  const { data: commentData } = useQuery({
    queryKey: ["comments", postDetailData?.post_id],
    queryFn: () => fetchComment(postDetailData!.post_id),
    enabled: !!postDetailData?.post_id,
  });

  const queryClient = useQueryClient();
  //댓글 추가하기
  const { mutate: addComment } = useMutation({
    mutationFn: (newComment: string) =>
      postComment(newComment, authData!.id, postDetailData!.post_id),
    onMutate: async (newComment) => {
      console.log("낙관적 업데이트 시작");
      await queryClient.cancelQueries({
        queryKey: ["comments", postDetailData!.post_id],
      });

      //현재 댓글 목록 가져오기
      const prevComments = queryClient.getQueryData([
        "comments",
        postDetailData!.post_id,
      ]);
      // console.log("prevComments", prevComments);

      //새 댓글 추가
      queryClient.setQueryData(
        ["comments", postDetailData!.post_id],
        (old: Comment[]) => [
          ...(old || []),
          {
            comment_id: Math.random(),
            user_id: userId,
            post_id: postId,
            content: newComment,
            created_at: new Date().toISOString(),
            optimistic: true,
          },
        ]
      );
      return { prevComments };
    },
    onError: (error, _, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(
          ["comments", postDetailData!.post_id],
          context.prevComments
        );
      }
      // console.error(error);
      alert("댓글 업로드 실패!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postDetailData!.post_id],
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
      console.log("낙관적 수정 실행", commentId);

      //해당 쿼리 일시 중지
      await queryClient.cancelQueries({
        queryKey: ["comments", postDetailData!.post_id],
      });

      //현재 댓글 목록
      const prevComments = queryClient.getQueryData([
        "comments",
        postDetailData!.post_id,
      ]);
      console.log("prevComments", prevComments);

      queryClient.setQueryData(
        ["comments", postDetailData!.post_id],
        (old: Comment[]) =>
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
        queryClient.setQueryData(
          ["comments", postDetailData!.post_id],
          context.prevComments
        );
      }
      alert("댓글 수정 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postDetailData!.post_id],
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
        queryKey: ["comments", postDetailData!.post_id],
      });

      //현재 댓글 목록
      const prevComments = queryClient.getQueryData([
        "comments",
        postDetailData!.post_id,
      ]);
      console.log("prevComments", prevComments);

      queryClient.setQueryData(
        ["comments", postDetailData!.post_id],
        (old: Comment[]) =>
          old?.filter(
            (c: Comment) => String(c.comment_id) !== String(commentId)
          )
      );
      return { prevComments };
    },
    onError: (error, _, context) => {
      if (context?.prevComments) {
        queryClient.setQueryData(
          ["comments", postDetailData!.post_id],
          context.prevComments
        );
      }
      alert("댓글 삭제 실패");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", postDetailData!.post_id],
      });
    },
  });

  //좋아요 임시 업데이트
  const { mutate: mutateTemp } = useMutation({
    mutationFn: (liked: boolean) => {
      if (!userId) {
        throw new Error("로그인이 필요합니다");
      }
      return postLikeTmp(postId as string, likeCount);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId] });
    },
    onError: (err) => {
      console.error("좋아요 업로드 실패:", err);
      setLike((prev) => !prev);
      setLikeCount((prev) => prev + (like ? 1 : -1));
    },
  });

  const likeHandler = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    setLike((prev) => !prev);
    setLikeCount((prev) => prev + (like ? -1 : 1));
    // mutate(!like);
    mutateTemp(!like);
  };
  const commentHandler = () => {
    addComment(comment);
    setComment("");
  };

  if (isLoading || !postDetailData) {
    return <div>로딩중..</div>;
  }
  return (
    <>
      <div className="pt-[62px] min-h-screen w-full px-5 pb-[90px] relative">
        {/* 프로필+카테고리 */}
        <div className="mt-4 w-full flex items-center justify-between">
          <div className="flex items-center w-auto h-9">
            <Image src={profileImg} alt="profileImg" width={36} height={36} />
            <span className="ml-[10px] text-[var(--color-black)] text-base font-semibold">
              {writerData?.nickname}
            </span>
          </div>
          <p className="text-[var(--color-gray-100)] text-sm">
            #{CategoryInv[postDetailData.category_id]}
          </p>
        </div>
        <div className="relative w-full aspect-[16/10] mt-6">
          <Image
            src={postDetailData.content_image ?? postImg}
            alt="postImg"
            fill
            className=" rounded-[12px] object-cover"
          />
        </div>
        <p className="mt-6 text-var(--color-black) text-[22px] font-bold">
          {postDetailData.title}
        </p>
        <p className="mt-2 h-auto">{postDetailData.contents}</p>

        <div className="mt-6 flex items-center text-[#b7b7b7]">
          {!like && (
            <AiOutlineLike
              onClick={likeHandler}
              className="w-5 h-5 cursor-pointer hover:text-[var(--color-black)] duration-300"
            />
          )}
          {like && (
            <AiFillLike
              onClick={likeHandler}
              className="w-5 h-5 cursor-pointer text-[var(--color-black)]"
            />
          )}
          <p className="ml-[3px] text-base">{likeCount}</p>

          <IoEyeOutline className="ml-[11px] w-5 h-5" />
          <p className="ml-[3px] text-base">{postDetailData.view_count ?? 0}</p>
        </div>

        {/* 댓글 입력*/}
        <div className="mt-6">
          <Input
            rightSlot={
              <PiPaperPlaneTiltLight
                onClick={commentHandler}
                className="w-4 h-4 text-[var(--color-gray-100)] cursor-pointer"
              />
            }
            placeholder="댓글을 입력해주세요"
            className="rounded-[50px] w-[320px] h-[50px] text-[var(--color-gray-50)] text-base"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        {/* 댓글 */}
        {[...(commentData ?? [])]
          .sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
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
      </div>
    </>
  );
}
