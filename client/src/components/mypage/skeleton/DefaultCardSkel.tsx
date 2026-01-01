"use client";

export default function DefaultCardSkel() {
  return (
    <div className='w-full h-[149px] rounded-lg overflow-hidden flex items-center animate-pulse'>
      <div className='w-30 h-30 flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-lg'></div>

      <div className='flex-1 flex flex-col justify-between py-8 min-h-44 pl-4'>
        <div className='space-y-2'>
          <div className='h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded w-3/4'></div>
          <div className='h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded w-1/2'></div>
        </div>

        <div className='flex gap-3 mt-[15px]'>
          <div className='h-3 w-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded'></div>
          <div className='h-3 w-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded'></div>
        </div>
      </div>
    </div>
  );
}
