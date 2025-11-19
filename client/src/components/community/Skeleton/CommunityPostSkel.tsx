"use client";
export default function CommunityPostSkel() {
  return (
    <>
      <div className="group py-6 w-full h-auto border-b border-[#ebebeb] ">
        <div className="relative w-full aspect-[16/9] rounded-[12px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
        <div className="mt-4 w-full flex justify-between">
          <div className="w-auto h-9 flex items-center">
            <div className="w-9 h-9 rounded-full flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
            <div className="ml-2 w-21 h-5 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
          </div>
          <div className="w-11 h-5 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
        </div>

        <div className="mt-4 w-30 h-6 rounded-[8px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
        <div className="mt-1.5 w-80 h-5 rounded-[5px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
        <div className="mt-1 w-80 h-5 rounded-[5px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>

        <div className="mt-1 flex items-center">
          <div className="w-9 h-5 rounded-[5px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
          <div className="ml-[11px] w-9 h-5 rounded-[5px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
        </div>
      </div>
    </>
  );
}
