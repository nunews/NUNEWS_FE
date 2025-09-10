import { StaticImageData } from "next/image";
import NupickContent from "../ui/NupickContent";

interface NewsData {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  categoryIcon: StaticImageData;
}

interface NewsSectionProps {
  className: string;
  data: NewsData;
  onAISummary?: () => void;
  onViewOriginal?: () => void;
  likes?: number;
  views?: number;
}

export default function NewsSection({
  className,
  data,
  onAISummary,
  onViewOriginal,
  likes,
  views,
}: NewsSectionProps) {
  return (
    <section
      className={`relative w-full min-h-[100dvh] bg-[url('/images/handsomeLee.png')] bg-no-repeat bg-cover bg-center ${className}`}
    >
      <div className="absolute w-full inset-0 bg-[var(--color-black)]/70 backdrop-blur-[28px] z-0" />
      <NupickContent
        data={data}
        onAISummary={onAISummary}
        onViewOriginal={onViewOriginal}
        likes={likes}
        views={views}
      />
    </section>
  );
}
