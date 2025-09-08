import { Eye, ThumbsUp } from "lucide-react";

interface RecommendPostProps {
  title: string;
  content: string;
  likes: number;
  views: number;
}

export default function RecommendPost({
  title,
  content,
  likes,
  views,
}: RecommendPostProps) {
  return (
    <div className="bg-[var(--color-white)] hover:bg-[var(--color-gray-10)] transition-colors duration-300 rounded-xl py-5 px-4 border border-[var(--color-gray-30)] cursor-pointer">
      <div className="mb-2">
        <p className="text-[#313131] font-semibold line-clamp-1">{title}</p>
      </div>
      <div className="mb-4">
        <p className="text-sm text-[#8f8f8f]">{content}</p>
      </div>
      <div className="flex items-center gap-[11px]">
        <div className="flex items-center gap-[3px]">
          <ThumbsUp className="w-4 h-4 text-[#b7b7b7]" />
          <span className="text-sm text-[#b7b7b7]">{likes}</span>
        </div>
        <div className="flex items-center gap-[3px]">
          <Eye className="w-4 h-4 text-[#b7b7b7]" />
          <span className="text-sm text-[#b7b7b7]">{views}</span>
        </div>
      </div>
    </div>
  );
}
