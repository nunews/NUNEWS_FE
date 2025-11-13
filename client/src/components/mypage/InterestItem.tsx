import Image from "next/image";
import { StaticImageData } from "next/image";

interface InterestItemProps {
  imageSrc: StaticImageData;
  title: string;
  subtitle: string | string[];
  isActive: boolean;
  onClick: () => void;
}

const baseStyle =
  "bg-[var(--color-white) border-[var(--color-gray-30)] border rounded-xl flex flex-col items-center justify-center hover:bg-[var(--color-gray-10)] dark:bg-[var(--color-dark-bg)] dark:border-[var(--color-gray-90)] dark:hover:bg-[var(--color-gray-100)] dark:hover:border-[var(--color-gray-90)]";
const activeStyle =
  "bg-[var(--color-gray-10) border-[var(--color-gray-100)] border rounded-xl flex flex-col items-center justify-center hover:bg-[var(--color-gray-20)] dark:bg-[var(--color-gray-100)] dark:border-[var(--color-gray-60)] dark:hover:bg-[var(--color-gray-90)] dark:hover:border-[var(--color-gray-60)]";

const InterestItem = ({
  imageSrc,
  title,
  subtitle,
  isActive,
  onClick,
}: InterestItemProps) => {
  return (
    <div
      className={`w-25 h-31.5 cursor-pointer transition-all duration-300  ${
        isActive ? activeStyle : baseStyle
      }`}
      onClick={onClick}
    >
      <div className='relative w-8 h-8'>
        <Image
          src={imageSrc}
          alt={`${title}icon`}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className='flex-col flex gap-1 items-center pt-3.5'>
        <p className='text-[var(--color-gray-100)] dark:text-[var(--color-white)]'>
          {title}
        </p>
        <p className='text-[var(--color-gray-60)] '>
          {Array.isArray(subtitle) ? subtitle[0] : subtitle}
        </p>
      </div>
    </div>
  );
};

export default InterestItem;
