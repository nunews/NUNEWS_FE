export default function NewsDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Header 자리 */}
      <div className="h-15.5 border-b border-gray-200" />

      <div className="px-5 pt-18">
        {/* 카테고리 */}
        <div className="h-4 w-20 bg-gray-200 rounded mb-2" />

        {/* 제목 */}
        <div className="h-7 w-full bg-gray-300 rounded mb-3" />

        <div className="flex items-center gap-2 mb-7">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-4 w-12 bg-gray-200 rounded" />
          <div className="ml-auto h-4 w-10 bg-gray-200 rounded" />
        </div>

        {/* 이미지 */}
        <div className="w-full h-64 bg-gray-300 rounded-lg mb-7.5" />

        {/* 요약 버튼 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-9 w-[97px] bg-gray-300 rounded-full" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
        </div>

        {/* 본문 */}
        <div className="space-y-3 mb-7.5">
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-4 w-11/12 bg-gray-200 rounded" />
          <div className="h-4 w-10/12 bg-gray-200 rounded" />
        </div>

        {/* 좋아요 / 공유 */}
        <div className="flex justify-center gap-4 pt-4 mb-9">
          <div className="h-9 w-20 bg-gray-300 rounded-full" />
          <div className="h-9 w-20 bg-gray-300 rounded-full" />
        </div>

        {/* 차트 */}
        <div className="h-42 bg-gray-200 rounded mb-9" />

        {/* Divider */}
        <div className="h-px bg-gray-200 mb-9" />

        {/* 관련 섹션 */}
        <div className="h-6 w-40 bg-gray-300 rounded mb-4" />
        <div className="space-y-3">
          <div className="h-20 bg-gray-200 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
