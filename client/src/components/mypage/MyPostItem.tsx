import Image from 'next/image';
import { AiOutlineLike } from 'react-icons/ai';
import { IoEyeOutline } from 'react-icons/io5';

interface MyPostItemProps {
  id: string;
  title: string;
  content: string;
  category: string;
  timeAgo: string;
  likes: number;
  views: number;
  image: string;
}

export const MyPostItem = ({
  title,
  content,
  category,
  timeAgo,
  likes,
  views,
  image,
}: MyPostItemProps) => {
  return (
    <div className='flex flex-col gap-4 py-6 border-b-1 border-[var(--color-gray-20)]'>
      <div className='relative w-full aspect-[16/10] overflow-hidden rounded-xl'>
        <Image
          src={image}
          alt={title}
          fill
          className='object-cover'
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          unoptimized
        />
      </div>
      <div className='flex flex-col gap-2'>
        <p className='text-[#191919] text-lg font-bold'>{title}</p>
        <p className='text-[#191919] text-sm line-clamp-2'>{content}</p>
      </div>
      <div className='flex justify-between items-center text-[13px]'>
        <div className='flex text-[var(--color-gray-70)] space-x-1'>
          <p>{category}</p>
          <span>·</span>
          <p>{timeAgo}</p>
        </div>
        <div className='flex items-center text-[#727272]'>
          <AiOutlineLike className='w-4 h-4 text-[#979797] cursor-pointer' />
          <p className='ml-[3px] '>{likes}</p>
          <IoEyeOutline className='ml-[11px] w-4 h-4 text-[#979797] cursor-pointer' />
          <p className='ml-[3px]  '>{views}</p>
        </div>
      </div>
    </div>
  );
};
