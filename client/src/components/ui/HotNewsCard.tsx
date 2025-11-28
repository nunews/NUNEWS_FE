import Image from "next/image";
import { IoBookmark, IoBookmarkOutline, IoEyeOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import { IconButton as BookmarkButton } from "./IconButton";
import { AiOutlineLike } from "react-icons/ai";
import { useRouter } from "next/navigation";
import createClient from "@/utils/supabase/client";
import { toast } from "sonner";

interface NewsCardProps {
  newsId: string;
  userId?: string | null;
  title: string;
  category: string;
  timeAgo: string;
  likes: number;
  views: number;
  image: string;
}

export default function NewsCard({
  newsId,
  userId,
  title,
  category,
  timeAgo,
  likes,
  views,
  image,
}: NewsCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const supabase = createClient();

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
      toast.success("스크랩에 추가됐어요.");
    } else {
      // 스크랩 해제
      const { error } = await supabase
        .from("User_scrap")
        .delete()
        .eq("user_id", userId)
        .eq("news_id", newsId);
      if (!error) setIsBookmarked(false);
      toast.success("스크랩을 취소했어요.");
    }
  };

  return (
    <div
      onClick={handleDetail}
      className='w-[300px] h-[280px] bg-[var(--color-white)] dark:bg-white/0 rounded-lg overflow-hidden cursor-pointer group'
    >
      {/* 이미지 영역 */}
      <div className='relative w-full h-[200px]'>
        <Image
          src={image}
          alt='뉴스 이미지'
          fill
          className='object-cover rounded-lg'
        />
        <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg '></div>

        <div
          onClick={handleBookmark}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className='absolute top-2 right-2 z-10'
        >
          {userId && (
            <div className='relative w-7.5 h-7.5 bg-[var(--color-white)] rounded-full flex items-center justify-center cursor-pointer'>
              <BookmarkButton
                icon={IoBookmarkOutline}
                size={16}
                color='var(--color-gray-50)'
                className={`absolute transition-opacity duration-300 ${
                  !isHovered && !isBookmarked ? "opacity-100" : "opacity-0"
                }`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              />
              <BookmarkButton
                icon={IoBookmark}
                size={16}
                color={
                  isBookmarked ? "var(--color-black)" : "var(--color-gray-50)"
                }
                className={`absolute transition-all duration-300 ${
                  isBookmarked
                    ? "opacity-100"
                    : isHovered
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />
            </div>
          )}
        </div>
      </div>

      <div className='flex flex-col h-[80px] justify-between pt-3'>
        <h3 className='text-[15px] font-semibold text-[var(--color-gray-100)] dark:text-[var(--color-gray-20)] leading-tight line-clamp-2 group-hover:text-[var(--color-black)] dark:group-hover:text-[var(--color-white)] duration-300 transition-colors'>
          {title}
        </h3>

        <div className='flex items-center justify-between pt-2'>
          <div className='text-[13px] text-[var(--color-gray-70)]'>
            {category} · {timeAgo}
          </div>

          {/* 좋아요 조회수 */}
          <div className='flex items-center gap-[11px] cursor-default mr-2'>
            <div className='flex items-center gap-1'>
              <AiOutlineLike className='w-4 h-4 text-[var(--color-gray-60)]' />
              <span className='text-[13px] text-[var(--color-gray-70)]'>
                {likes}
              </span>
            </div>
            <div className='flex items-center gap-1'>
              <IoEyeOutline className='w-4 h-4 text-[var(--color-gray-60)]' />
              <span className='text-[13px] text-[var(--color-gray-70)]'>
                {views}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
