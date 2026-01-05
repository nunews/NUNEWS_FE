export default function NewsDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      <div className="h-15.5 border-b border-[var(--color-gray-80)]" />

      <div className="px-5 pt-18">
        {/* 카테고리 */}
        <div className="h-4 w-20 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px] mb-2" />

        {/* 제목 */}
        <div className="h-7 w-full bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px] mb-3" />

        <div className="flex items-center gap-2 mb-7">
          <div className="h-4 w-24 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
          <div className="h-4 w-12 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
          <div className="ml-auto h-4 w-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
        </div>

        {/* 이미지 */}
        <div className="w-full h-64 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px] mb-7.5" />

        {/* 요약 버튼 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-[97px] bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-full" />
          <div className="h-4 w-40 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
        </div>

        {/* 본문 */}
        <div className="space-y-3 mb-7.5">
          <div className="h-4 w-full bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
          <div className="h-4 w-full bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
          <div className="h-4 w-11/12 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
          <div className="h-4 w-10/12 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
        </div>

        {/* 좋아요 / 공유 버튼 */}
        <div className="flex justify-center gap-4 pt-4 mb-9">
          <div className="h-9 w-20 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-full" />
          <div className="h-9 w-20 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-full" />
        </div>

        {/* 차트 */}
        <div className="h-42 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px] mb-9" />

        <div className="h-px bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] mb-9" />

        {/* 관련 컨텐츠 */}
        <div className="h-6 w-40  bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px] mb-4" />
        <div className="space-y-3 mb-10">
          <div className="h-20 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
          <div className="h-20 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
          <div className="h-20 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-[6px]" />
        </div>
      </div>
    </div>
  );
}
