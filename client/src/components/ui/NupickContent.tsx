import Image, { StaticImageData } from "next/image";
import { TextButton } from "../ui/TextButton";
import { IoBookmarkOutline, IoBookmark, IoEyeOutline } from "react-icons/io5";
import { IconButton } from "../ui/IconButton";
import { useState } from "react";
import { AiOutlineLike } from "react-icons/ai";

interface NewsData {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  categoryIcon: StaticImageData;
}

interface NewsContentProps {
  data: NewsData;
  onAISummary?: () => void;
  onViewOriginal?: () => void;
  likes?: number;
  views?: number;
}

export default function NupickContent({
  data,
  onAISummary,
  onViewOriginal,
  likes = 255,
  views = 255,
}: NewsContentProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <main className="relative w-full z-10 px-5 flex flex-col">
      <div className="pt-[113px] max-h-screen">
        <div className="flex w-full min-w-80 h-90 [@media(max-height:700px)]:h-60 mx-auto justify-center overflow-hidden">
          <Image
            src={data.image}
            alt="dummy image"
            width={320}
            height={360}
            priority
            className="object-cover w-full min-w-80 rounded-2xl"
          />
        </div>
        <div className="flex mt-7 cursor-default [@media(max-height:700px)]:mt-4 w-full justify-between">
          {/* 왼쪽 뉴스 정보 영역 */}
          <div className="mr-6 flex-1">
            <div className="flex gap-0.5">
              <Image
                src={data.categoryIcon}
                alt={data.category}
                width={20}
                height={20}
                priority
              />
              <p className="text-[var(--color-white)]">{data.category}</p>
            </div>
            <div className="flex flex-col cursor-default gap-2 mt-2 [@media(max-height:700px)]:gap-0.5">
              <h1 className="text-lg font-bold text-[var(--color-white)] line-clamp-2">
                {data.title}
              </h1>
              <span className="min-h-15 text-[var(--color-gray-60)] text-sm mt-2 text-ellipsis line-clamp-3 [@media(max-height:70px)]:line-clamp-2">
                {data.description}
              </span>
              {/* 액션 버튼들 */}
              <div className="flex gap-[7px] mt-14 [@media(max-height:700px)]:mt-4">
                <TextButton
                  className="w-[97px] h-9 px-4 bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/15"
                  onClick={onAISummary}
                >
                  <p className="text-sm whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#F0FFBC] to-[var(--color-primary-40)]">
                    AI 세줄요약
                  </p>
                </TextButton>
                <TextButton
                  className="w-[81px] h-9 px-2 text-white bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/15"
                  onClick={onViewOriginal}
                >
                  <p className="text-sm whitespace-nowrap">원문보기</p>
                </TextButton>
              </div>
            </div>
          </div>

          {/* 오른쪽 상호작용 버튼들 */}
          <div className="flex flex-col justify-end">
            <div className="flex flex-col [@media(max-height:700px)]:gap-4 gap-6">
              <div className="flex flex-col gap-1.5">
                <IconButton
                  icon={isBookmarked ? IoBookmark : IoBookmarkOutline}
                  className={`cursor-pointer transition-opacity duration-300 ${
                    isBookmarked ? "opacity-100" : "opacity-80"
                  }`}
                  color="var(--color-white)"
                  size={24}
                  onClick={handleBookmark}
                />
                <p className="text-[var(--color-white)] text-xs font-normal whitespace-nowrap">
                  스크랩
                </p>
              </div>
              <div className="flex flex-col gap-1.5 items-center">
                <AiOutlineLike className="text-[var(--color-white)] text-center" />
                <p className="text-[var(--color-white)] text-[13px] font-normal text-center">
                  {likes}
                </p>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <IoEyeOutline className="text-[var(--color-white)]" />
                <p className="text-[var(--color-white)] text-[13px] font-normal text-center">
                  {views}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
