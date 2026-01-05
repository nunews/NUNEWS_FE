import Image, { StaticImageData } from "next/image";

interface NewsProps {
  category: string;
  title: string;
  image: string | StaticImageData;

  className?: string;
}

export default function RecommendNews({ category, title, image }: NewsProps) {
  return (
    <div className=" h-20 bg-[var(--color-white)] dark:bg-[#121212] rounded-lg overflow-hidden flex cursor-pointer group relative">
      <div className="w-20 h-full flex-shrink-0">
        <Image
          src={image}
          alt={title}
          width={80}
          height={80}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="flex-1 p-3 flex flex-col justify-center">
        <div className="text-gray-[var(--color-gray-70)] text-xs mb-1 dark:text-[var(--color-gray-70)]">
          #{category}
        </div>
        <h3 className="text-[var(--color-gray-100)] text-sm font-bold leading-tight line-clamp-2 dark:text-[var(--color-gray-20)]">
          {title}
        </h3>
      </div>
      {/* 호버 스타일 */}
      <div className="absolute inset-0 bg-[#f3f3f3] opacity-0 group-hover:opacity-20 dark:group-hover:opacity-5 transition-opacity duration-300 rounded-lg"></div>
    </div>
  );
}
