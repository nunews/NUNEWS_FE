"use client";

export default function MyPostsContentSkel() {
  return (
    <div className='flex flex-col gap-4 py-6 border-b border-[var(--color-gray-20)] animate-pulse'>
      {/* 이미지 영역 */}
      <div className='relative w-full aspect-[16/10] overflow-hidden rounded-xl bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]' />

      {/* 텍스트 영역 */}
      <div className='flex flex-col gap-2'>
        <div className='h-5 w-3/4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded mb-2'></div>
        <div className='h-4 w-5/6 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded'></div>
      </div>

      {/* 하단 정보 */}
      <div className='flex justify-between items-center text-[13px] mt-1'>
        <div className='flex space-x-2'>
          <div className='h-3 w-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded'></div>
          <div className='h-3 w-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded'></div>
        </div>
        <div className='flex items-center space-x-3'>
          <div className='h-3 w-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded'></div>
          <div className='h-3 w-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded'></div>
        </div>
      </div>
    </div>
  );
}
