"use client";
export default function CommentSkel() {
  return (
    <>
      <div className="mt-6 w-full h-auto flex justify-between">
        <div className="flex items-start w-full">
          <div className="w-9 h-9 rounded-full flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
          <div className="flex flex-col ml-3 w-full ">
            <div className="flex items-center gap-2">
              <div className="w-22 h-5 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
              <div className="ml-1 w-9 h-4 rounded-[6px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"></div>
            </div>

            <div className="mt-1 w-56 h-4 rounded-[5px] flex-shrink-0 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] text-[var(--color-gray-100)] dark:text-[var(--color-gray-40)] text-base"></div>
          </div>
        </div>
      </div>
    </>
  );
}
