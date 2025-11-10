"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { IoBookmark, IoBookmarkOutline, IoEyeOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

interface DefaultCardProps {
  newsId: string;
  userId?: string | null;
  title: string;
  category: string;
  timeAgo: string;
  likes: number;
  views: number;
  image: string;
}

export default function DefaultCard({
  newsId,
  userId,
  title,
  category,
  timeAgo,
  likes,
  views,
  image,
}: DefaultCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  // 초기 상태: 현재 사용자가 이미 스크랩했는지 확인
  useEffect(() => {
    if (!userId) return;

    const checkBookmark = async () => {
      const { data } = await supabase
        .from("User_scrap")
        .select("*")
        .eq("user_id", userId)
        .eq("news_id", newsId)
        .maybeSingle();

      setIsBookmarked(!!data);
    };

    checkBookmark();
  }, [userId, newsId, supabase]);

  const handleDetail = () => {
    router.push(`/newsDetail/${newsId}`);
  };

  const handleBookmark = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) return alert("로그인이 필요합니다.");

    if (!isBookmarked) {
      // 스크랩 추가
      const { error } = await supabase.from("User_scrap").insert({
        user_id: userId,
        news_id: newsId,
      });
      if (!error) setIsBookmarked(true);
    } else {
      // 스크랩 해제
      const { error } = await supabase
        .from("User_scrap")
        .delete()
        .eq("user_id", userId)
        .eq("news_id", newsId);
      if (!error) setIsBookmarked(false);
    }
  };

  return (
    <div
      className='w-full h-[169px] bg-white dark:bg-white/0 rounded-lg overflow-hidden flex items-center cursor-pointer group'
      onClick={handleDetail}
    >
      <div className='relative w-30 h-30 flex-shrink-0 flex overflow-hidden rounded-lg'>
        <Image
          src={image}
          alt='뉴스 이미지'
          width={120}
          height={120}
          className='object-cover w-full h-full'
        />
        <div
          onClick={handleBookmark}
          className='absolute top-2 right-2 z-10 w-7.5 h-7.5 bg-white rounded-full flex items-center justify-center cursor-pointer'
        >
          {isBookmarked ? (
            <IoBookmark size={16} color='black' />
          ) : (
            <IoBookmarkOutline size={16} color='#999' />
          )}
        </div>
      </div>

      <div className='flex-1 flex flex-col justify-between py-8 min-h-44 pl-4'>
        <div>
          <h3 className='text-[15px] font-semibold text-[var(--color-gray-100)] group-hover:text-[var(--color-black)] dark:text-[var(--color-gray-20)] dark:group-hover:text-[var(--color-white)] line-clamp-2 mb-1.5 duration-300 transition-colors'>
            {title}
          </h3>
          <div className='text-[13px] text-[var(--color-gray-70)]'>
            {category} · {timeAgo}
          </div>
        </div>
        <div className='flex gap-3 mt-[15px] justify-start'>
          <div className='flex items-center gap-1'>
            <AiOutlineLike className='w-4 h-4 text-[var(--color-gray-70)]' />
            <span className='text-[13px] text-[var(--color-gray-70)]'>
              {likes}
            </span>
          </div>
          <div className='flex items-center gap-1'>
            <IoEyeOutline className='w-4 h-4 text-[var(--color-gray-70)]' />
            <span className='text-[13px] text-[var(--color-gray-70)]'>
              {views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
