import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { AiOutlineLike } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import defaultProfileImg from "@/assets/images/default_profile.png";
import { categoryIdInvMap } from "@/lib/categoryUUID";
interface PostCardProps {
  postId: string;
  profileImage: string | StaticImageData;
  authorNickname: string;
  category: string;
  content: string;
  likes: number;
  views: number;
  className?: string;
}

export default function PostCard({
  postId,
  profileImage,
  authorNickname,
  category,
  content,
  likes,
  views,
  className = "",
}: PostCardProps) {
  const router = useRouter();

  const handlePostDetail = () => {
    router.push(`/community/${postId}`);
  };

  const koreanCategory = categoryIdInvMap[category];

  return (
    <div
      onClick={handlePostDetail}
      className={`w-[278px] h-[208px] bg-[var(--color-white)] dark:bg-[#121212] rounded-xl border border-[#e3e3e3] dark:border-[var(--color-gray-90)] p-4 flex flex-col ${className}`}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <Image
            src={profileImage || defaultProfileImg}
            alt={authorNickname}
            width={32}
            height={32}
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-[var(--color-gray-100)] dark:text-[var(--color-white)] font-medium text-sm">
          {authorNickname}
        </span>
      </div>

      <div className="mb-2">
        <span className="text-[var(--color-gray-70)] text-sm">
          #{koreanCategory}
        </span>
      </div>

      <div className="flex-1 mb-4">
        <p className="text-[var(--color-gray-100)] dark:text-[var(--color-gray-40)] text-sm leading-[140%] line-clamp-3">
          {content}
        </p>
      </div>
      <div className="flex items-center gap-[11px]">
        <div className="flex items-center gap-1">
          <AiOutlineLike className="w-4 h-4 text-[var(--color-gray-70)]" />
          <span className="text-[13px] text-[var(--color-gray-70)]">
            {likes}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <IoEyeOutline className="w-4 h-4 text-[var(--color-gray-70)]" />
          <span className="text-[13px] text-[var(--color-gray-70)]">
            {views}
          </span>
        </div>
      </div>
    </div>
  );
}
