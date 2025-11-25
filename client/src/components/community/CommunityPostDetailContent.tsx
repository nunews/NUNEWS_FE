"use client";
import Image from "next/image";
import profileImg from "../../assets/images/profile1.png";
import postImg from "../../../public/images/default_nunew.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchPostById, fetchWriter } from "@/app/api/community";
import { categoryIdInvMap } from "@/lib/categoryUUID";

export default function CommunityPostDetailContent({
  writerId,
  categoryId,
  title,
  content_image,
  contents,
}: {
  writerId: string;
  categoryId: string;
  title: string;
  content_image: string;
  contents: string;
}) {
  //게시글 작성자 정보 불러오기
  const { data: writerData } = useQuery({
    queryKey: ["writerDetail", writerId],
    queryFn: () => {
      if (!writerId) {
        console.error("작성자 정보가 없습니다");
        return;
      }
      return fetchWriter(writerId);
    },
    enabled: !!writerId,
  });
  return (
    <>
      {/* 프로필+카테고리 */}
      <div className="mt-4 w-full flex items-center justify-between">
        <div className="flex items-center w-auto h-9">
          <Image
            src={profileImg}
            alt="profileImg"
            width={36}
            height={36}
            className="rounded-full"
          />
          <span className="ml-[10px] text-[var(--color-black)] dark:text-[var(--color-white)] text-base font-semibold">
            {writerData?.nickname}
          </span>
        </div>
        <p className="text-[var(--color-gray-100)] dark:text-[var(--color-gray-60)] text-sm">
          #{categoryIdInvMap[categoryId]}
        </p>
      </div>
      <div className="relative w-full aspect-[16/10] mt-6">
        <Image
          src={content_image ?? postImg}
          alt="postImg"
          fill
          className=" rounded-[12px] object-cover"
        />
      </div>
      <p className="mt-6 text-[var(--color-black)] dark:text-[var(--color-white)] text-[22px] font-bold">
        {title}
      </p>
      <p className="mt-2 h-auto dark:text-[var(--color-gray-40)]">{contents}</p>
    </>
  );
}
