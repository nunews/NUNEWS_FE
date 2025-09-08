import { Eye, ThumbsUp } from "lucide-react";
import Image, { StaticImageData } from "next/image";

interface PostCardProps {
  profileImage: string | StaticImageData;
  username: string;
  category: string;
  content: string;
  likes: number;
  views: number;
  className?: string;
}

export default function PostCard({
  profileImage,
  username,
  category,
  content,
  likes,
  views,
  className = "",
}: PostCardProps) {
  return (
    <div
      className={`w-[278px] h-[208px] bg-[var(--color-white)] rounded-xl border border-[var(--color-gray-30)] p-4 flex flex-col ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={profileImage}
            alt={username}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-black font-medium text-sm">{username}</span>
      </div>

      {/* 카테고리 */}
      <div className="mb-2">
        <span className="text-black text-sm">#{category}</span>
      </div>

      {/* 내용 */}
      <div className="flex-1 mb-4">
        <p className="text-black text-sm leading-relaxed line-clamp-6">
          {content}
        </p>
      </div>

      {/* 하단: 좋아요와 조회수 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4 text-[var(--color-gray-70)]" />
          <span className="text-sm text-[var(--color-gray-70)]">{likes}</span>
        </div>
        <div className="flex items-center gap-1">
          <Eye className="w-4 h-4 text-[var(--color-gray-70)]" />
          <span className="text-sm text-[var(--color-gray-70)]">{views}</span>
        </div>
      </div>
    </div>
  );
}
