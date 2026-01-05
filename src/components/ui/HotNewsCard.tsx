import Image from "next/image";
import { IoBookmark, IoBookmarkOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import { IconButton as BookmarkButton } from "./IconButton";
import { AiOutlineLike } from "react-icons/ai";
import { useRouter } from "next/navigation";

interface NewsCardProps {
  newsId: string;
  userId?: string | null;
  title: string;
  category: string;
  timeAgo: string;
  likes: number;
  views: number;
  image: string;
  isBookmarked: boolean;
  handleBookmark: (e: React.MouseEvent) => void;
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
  isBookmarked,
  handleBookmark,
}: NewsCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  const handleDetail = () => {
    router.push(`/newsDetail/${newsId}`);
  };

  return (
    <div
      onClick={handleDetail}
      className="w-[300px] h-[280px] bg-[var(--color-white)] dark:bg-white/0 rounded-lg overflow-hidden cursor-pointer group"
    >
      {/* 이미지 영역 */}
      <div className="relative w-full h-[200px]">
        <Image
          src={image}
          alt="뉴스 이미지"
          fill
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg "></div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            handleBookmark(e);
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute top-2 right-2 z-10"
        >
          {userId && (
            <div className="relative w-7.5 h-7.5 bg-[var(--color-white)] rounded-full flex items-center justify-center cursor-pointer">
              <BookmarkButton
                icon={IoBookmarkOutline}
                size={16}
                color="var(--color-gray-50)"
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

      <div className="flex flex-col h-[80px] justify-between pt-3">
        <h3 className="text-[15px] font-semibold text-[var(--color-gray-100)] dark:text-[var(--color-gray-20)] leading-tight line-clamp-2 group-hover:text-[var(--color-black)] dark:group-hover:text-[var(--color-white)] duration-300 transition-colors">
          {title}
        </h3>

        <div className="flex items-center justify-between pt-2">
          <div className="text-[13px] text-[var(--color-gray-70)]">
            {category} · {timeAgo}
          </div>

          {/* 좋아요 조회수 */}
          <div className="flex items-center gap-[11px] cursor-default mr-2">
            <div className="flex items-center gap-1">
              <AiOutlineLike className="w-4 h-4 text-[var(--color-gray-60)]" />
              <span className="text-[13px] text-[var(--color-gray-70)]">
                {likes}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <IoEyeOutline className="w-4 h-4 text-[var(--color-gray-60)]" />
              <span className="text-[13px] text-[var(--color-gray-70)]">
                {views}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
