"use client";
import Image from "next/image";
import defaultImg from "../../../public/images/default_nunew.svg";
import profile1 from "../../assets/images/profile1.png";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchWriter,
  postLike,
  postLikeTmp,
  postUnlike,
  postView,
} from "@/app/api/community";
import { categoryIdInvMap } from "@/lib/categoryUUID";
export default function CommunityPost({
  postId,
  postImage,
  writerId,
  categoryId,
  title,
  content,
  userId,
  likes,
  views,
}: {
  postId: string;
  postImage: string;
  writerId: string;
  categoryId: string;
  title: string;
  content: string;
  userId: string;
  likes: number;
  views: number;
}) {
  const router = useRouter();
  const [like, setLike] = useState(false); //사용자 좋아요 여부
  const [likeCount, setLikeCount] = useState(likes ?? 0);
  const [viewCount, setViewCount] = useState(views ?? 0);

  //작성자 정보
  const { data: writerData } = useQuery({
    queryKey: ["writer", writerId],
    queryFn: () => {
      // console.log("writerId", writerId);
      return fetchWriter(writerId);
    },
    staleTime: 1000 * 60 * 3,
  });

  const queryClient = useQueryClient();

  //좋아요 업데이트
  const { mutate } = useMutation({
    mutationFn: (liked: boolean) => {
      if (!userId) {
        throw new Error("로그인이 필요합니다");
      }
      return liked ? postLike(postId, userId) : postUnlike(postId, userId);
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

  //좋아요 임시 업데이트
  const { mutate: mutateTemp } = useMutation({
    mutationFn: (liked: boolean) => {
      if (!userId) {
        throw new Error("로그인이 필요합니다");
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

  //조회수 업데이트
  const { mutate: mutateView } = useMutation({
    mutationFn: (cnt: number) => {
      if (!userId) {
        return Promise.resolve(null);
      }
      return postView(postId, cnt);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["views", postId] });
    },
    onError: (err) => {
      console.error("조회수 업로드 실패:", err);
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
  const viewHandler = () => {
    console.log("postId:", postId);
    router.push(`/community/${postId}`);
    if (userId) {
      setTimeout(() => mutateView(viewCount + 1), 0);
    }
  };
  return (
    <>
      <div className="group py-6 w-full h-auto border-b border-[#ebebeb] ">
        <div className="cursor-pointer" onClick={viewHandler}>
          <div className="relative  w-full aspect-[16/9] rounded-[12px] overflow-hidden">
            <Image
              src={postImage ?? defaultImg}
              alt="postImage"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 rounded-[12px] bg-[#000000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="mt-4 w-full flex justify-between">
            <div className="w-auto h-9 flex items-center cursor-pointer">
              <Image
                src={writerData?.profile_image ?? profile1}
                alt="profile1"
                width={36}
                height={36}
                className="rounded-full"
              />
              <p className="ml-2 text-[var(--color-gray-100)] dark:text-[var(--color-white)] text-base font-semibold">
                {writerData?.nickname}
              </p>
            </div>
            <p className="text-[var(--color-gray-100)] flex items-center dark:text-[var(--color-gray-70)] text-sm">
              #{categoryIdInvMap[categoryId]}
            </p>
          </div>

          <p className="mt-4 text-[#191919] text-lg font-bold line-clamp-1 dark:text-[var(--color-white)] ">
            {title}
          </p>
          <p className="text-[#191919] dark:text-[var(--color-gray-40)]  group-hover:text-[var(--color-gray-90)] dark:group-hover:text-[var(--color-gray-50)] text-sm line-clamp-2 duration-300">
            {content}
          </p>
        </div>
        <div className="mt-4 flex items-center">
          {!like && (
            <AiOutlineLike
              onClick={likeHandler}
              className="w-5 h-5 cursor-pointer text-[var(--color-gray-60)] hover:text-[var(--color-black)] dark:hover:text-[var(--color-white)] duration-300"
            />
          )}
          {like && (
            <AiFillLike
              onClick={likeHandler}
              className="w-5 h-5 cursor-pointer text-[var(--color-black)] dark:text-[var(--color-white)]"
            />
          )}
          <p className="ml-[3px] text-[var(--color-gray-70)] text-[13px]">
            {likeCount}
          </p>

          <IoEyeOutline className="ml-[11px] w-4 h-4 text-[var(--color-gray-60)]" />
          <p className="ml-[3px] text-[var(--color-gray-70)] text-[13px]">
            {views ?? 0}
          </p>
        </div>
      </div>
    </>
  );
}
