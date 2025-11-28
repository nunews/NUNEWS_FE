"use client";
export default function CommunityProfileSkel() {
  return (
    <>
      <div className="mt-4 px-5 flex items-center h-[72px]">
        <div className="w-18 h-18 flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]  rounded-full flex items-center justify-center"></div>
        <div className="flex flex-col pl-[14px]">
          <div className="w-27 h-6 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
          <div className="w-26 h-4 mt-1 flex items-center rounded-[4px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] "></div>
        </div>
      </div>
    </>
  );
}
