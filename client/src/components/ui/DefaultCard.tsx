import Image from "next/image";
import { ThumbsUp, Eye } from "lucide-react";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { useState } from "react";
import { IconButton } from "./IconButton";
interface DefaultNewsCardProps {
  title: string;
  category: string;
  timeAgo: string;
  likes: number;
  views: number;
  image: string;
}

export default function DefaultCard({
  title,
  category,
  timeAgo,
  likes,
  views,
  image,
}: DefaultNewsCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="w-full h-[169px] bg-white rounded-lg overflow-hidden flex items-center cursor-pointer group">
      <div className="relative w-30 h-30 flex-shrink-0 flex overflow-hidden rounded-lg">
        <Image
          src={image}
          alt="뉴스 이미지"
          width={120}
          height={120}
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-lg"></div>
        <div
          onClick={() => setIsBookmarked(!isBookmarked)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="absolute top-2 right-2 z-10"
        >
          <div className="relative w-7.5 h-7.5 bg-[var(--color-white)] rounded-full flex items-center justify-center cursor-pointer">
            <IconButton
              icon={IoBookmarkOutline}
              size={16}
              color="var(--color-gray-50)"
              className={`absolute transition-opacity duration-300 ${
                !isHovered && !isBookmarked ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setIsBookmarked(!isBookmarked)}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            />
            <IconButton
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
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-between py-8 min-h-44">
        <div className="mt-1 pl-[15px]">
          <h3 className="text-[15px] font-semibold text-[var(--color-gray-100)] line-clamp-2 mb-1.5 group-hover:text-[var(--color-black)] duration-300 transition-colors">
            {title}
          </h3>
          <div className="text-[13px] text-[var(--color-gray-70)]">
            #{category} · {timeAgo}
          </div>
        </div>
        <div className="flex gap-4 mt-[15px] justify-end px-[15px]">
          {/* 좋아요와 조회수 */}
          <div className="flex items-center gap-1">
            <ThumbsUp className="w-4 h-4 text-[var(--color-gray-70)]" />
            <span className="text-[13px] text-[var(--color-gray-70)]">
              {likes}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-4 h-4 text-[var(--color-gray-70)]" />
            <span className="text-[13px] text-[var(--color-gray-70)]">
              {views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
