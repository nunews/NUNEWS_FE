"use client";
import Image from "next/image";
import defaultImg from "../../assets/images/postImg.png";
import profile1 from "../../assets/images/profile1.png";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchLike,
  fetchWriter,
  postLike,
  postUnlike,
} from "@/app/api/community";
import { CategoryInv } from "@/lib/interest";
//import { INTERESTS_DATA } from "@/lib/interest";
//import { getCurrentUser } from "@/app/api/auth";
export default function CommunityPost({
  postId,
  postImage,
  writerId,
  categoryId,
  title,
  content,
  userId,
}: {
  postId: string;
  postImage: string;
  writerId: string;
  categoryId: string;
  title: string;
  content: string;
  userId: string;
}) {
  const router = useRouter();
  const [like, setLike] = useState(false);
  // console.log("postImage", postImage, postId);
  const { data: writerData } = useQuery({
    queryKey: ["writer"],
    queryFn: () => fetchWriter(writerId),
    staleTime: 1000 * 60 * 3,
  });
  const { data: likeData } = useQuery<number>({
    queryKey: ["fetchLike"],
    queryFn: () => fetchLike(postId),
    staleTime: 1000 * 60 * 3,
  });

  const [likeCount, setLikeCount] = useState(likeData ?? 0);
  const queryClient = useQueryClient();
  const mutation = useMutation({
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

  const likeHandler = () => {
    if (!userId) {
      alert("로그인이 필요합니다.");
      return;
    }
    setLike((prev) => !prev);
    setLikeCount((prev) => prev + (like ? -1 : 1));
    mutation.mutate(!like);
  };
  return (
    <>
      <div className="group py-6 w-full h-auto border-b border-[#ebebeb] ">
        <div
          className="cursor-pointer"
          onClick={() => router.push(`/community/${postId}`)}
        >
          <div className="relative  w-full aspect-[16/9]">
            <Image
              src={postImage ?? defaultImg}
              alt="postImage"
              fill
              className="rounded-[12px]"
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
              />
              <p className="ml-2 text-[var(--color-gray-100)] text-base font-semibold">
                {writerData?.nickname}
              </p>
            </div>
            <p className="text-[var(--color-gray-100)] text-sm">
              #{CategoryInv[categoryId]}
            </p>
          </div>

          <p className="mt-4 text-[#191919] text-lg font-bold line-clamp-1">
            {title}
          </p>
          <p className="text-[#191919] group-hover:text-black text-sm line-clamp-2">
            {content}
          </p>
        </div>
        <div className="mt-4 flex items-center">
          {!like && (
            <AiOutlineLike
              onClick={likeHandler}
              className="w-5 h-5 cursor-pointer text-[var(--color-gray-60)] hover:text-[var(--color-black)] duration-300"
            />
          )}
          {like && (
            <AiFillLike
              onClick={likeHandler}
              className="w-5 h-5 cursor-pointer text-[var(--color-black)]"
            />
          )}
          <p className="ml-[3px] text-[var(--color-gray-70)] text-[13px]">
            {likeCount}
          </p>

          <IoEyeOutline className="ml-[11px] w-4 h-4 text-[var(--color-gray-60)]" />
          <p className="ml-[3px] text-[var(--color-gray-70)] text-[13px]">
            124
          </p>
        </div>
      </div>
    </>
  );
}
