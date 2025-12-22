"use client";
import { getCurrentUser } from "@/app/api/auth";
import {
  isLikedByUser,
  postLike,
  postLikeTmp,
  postUnlike,
} from "@/app/api/community";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";

export default function CommunityPostDetailStat({
  like_count,
  postId,
  view_count,
}: {
  like_count: number;
  postId: string;
  view_count: number;
}) {
  const [likeCount, setLikeCount] = useState(like_count);

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

  //사용자 좋아요 여부
  const { data: isLiked = false } = useQuery({
    queryKey: ["isLiked", userId, postId],
    queryFn: async () => {
      if (!userId) return false;
      const test = isLikedByUser(postId, userId);
      console.log("좋아요 여부", test);
      return test;
    },
  });
  const [like, setLike] = useState(isLiked ?? false); //사용자 좋아요 여부

  useEffect(() => {
    (async () => {
      if (userId) {
        const liked = await isLikedByUser(postId, userId);
        console.log("liked여부", liked);
        setLike(liked);
      }
    })();
  }, [postId, userId]);

  const queryClient = useQueryClient();
  //좋아요 업데이트
  const { mutate: likeUpdate } = useMutation({
    mutationFn: (liked: boolean) => {
      if (!postId || !userId) {
        return Promise.resolve(null);
      }
      return liked ? postLike(postId, userId) : postUnlike(postId, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likes", postId, userId] });
    },
    onError: (err) => {
      console.error("좋아요 업로드 실패:", err);
      setLike((prev) => !prev);
      setLikeCount((prev) => prev + (like ? 1 : -1));
    },
  });

  //좋아요 임시 업데이트
  const { mutate: mutateTemp } = useMutation({
    mutationFn: (liked: boolean) => {
      if (!userId || !postId) {
        return Promise.resolve(null);
      }
      return postLikeTmp(postId, likeCount);
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
    mutateTemp(!like);
    likeUpdate(!like);
  };
  return (
    <>
      <div className="mt-6 flex items-center text-[#b7b7b7] dark:text-[var(--color-gray-70)]">
        {!like && (
          <AiOutlineLike
            onClick={likeHandler}
            className="w-5 h-5 cursor-pointer hover:text-[var(--color-black)] dark:hover:text-[var(--color-white)] duration-300"
          />
        )}
        {like && (
          <AiFillLike
            onClick={likeHandler}
            className="w-5 h-5 cursor-pointer text-[var(--color-black)] dark:text-[var(--color-white)]"
          />
        )}
        <p className="ml-[3px] text-base">{likeCount}</p>

        <IoEyeOutline className="ml-[11px] w-5 h-5" />
        <p className="ml-[3px] text-base">{view_count}</p>
      </div>
    </>
  );
}
