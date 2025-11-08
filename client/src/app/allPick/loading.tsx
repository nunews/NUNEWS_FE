import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function Loading() {
  return (
    <div className="h-screen scrollbar-hide bg-[var(--color-white)] dark:bg-[#121212]">
      {/* Header */}
      <Header logo={true} interest={[]} />

      <main className="h-screen overflow-y-scroll pt-16 pb-18">
        <div>
          {/* 카테고리 */}
          <div className="px-4 whitespace-nowrap">
            <div className="flex gap-2 overflow-hidden">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 px-4 py-2 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-full animate-pulse"
                >
                  <div className="w-12 h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded"></div>
                </div>
              ))}
            </div>
          </div>

          {/* 핫 뉴스 Skeleton */}
          <div className="flex flex-col mb-5 px-4 mt-8">
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
              <div className="w-24 h-6 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
            </div>
            <div className="flex overflow-x-auto pb-2 scrollbar-hide mt-4">
              <div className="flex gap-4">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[300px] bg-white dark:bg-[var(--color-gray-100)] rounded-lg overflow-hidden"
                  >
                    <div className="w-full h-[200px] bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-lg animate-pulse"></div>
                    <div className="p-4 space-y-2">
                      <div className="w-full h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                      <div className="w-4/5 h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                      <div className="flex justify-between items-center mt-2">
                        <div className="w-12 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                        <div className="flex gap-2">
                          <div className="w-8 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                          <div className="w-8 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 모든 뉴스 Skeleton */}
          <div className="px-4">
            <div className="w-18 h-6 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded mb-4 mt-8 animate-pulse"></div>
            <div className="space-y-7">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-30 bg-white dark:bg-[var(--color-gray-100)] rounded-lg overflow-hidden"
                >
                  <div className="w-30 h-full bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] flex-shrink-0 rounded-lg animate-pulse"></div>
                  <div className="flex-1 p-3 space-y-2">
                    <div className="w-full h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                    <div className="w-4/5 h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                    <div className="flex justify-between items-center">
                      <div className="w-12 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 추천 Post */}
          <div className="w-full h-[438px] flex flex-col bg-[#f8f8f8] mt-4 pb-11 px-4 dark:bg-[var(--color-black)]">
            <div className="mt-10 mb-5 space-y-2">
              <div className="w-48 h-6 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
              <div className="w-32 h-6 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
            </div>
            <div className="flex-1 mb-4">
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="flex-shrink-0 w-[278px] bg-white dark:bg-[var(--color-black)] rounded-lg p-4 border border-[var(--color-gray-30)] dark:border-[var(--color-gray-100)]"
                  >
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-full animate-pulse"></div>
                      <div className="w-14 h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                    </div>
                    <div className="space-y-2 mb-2">
                      <div className="w-full h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                      <div className="w-4/5 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                      <div className="w-3/5 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="flex gap-2 mt-6">
                        <div className="w-8 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                        <div className="w-8 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-31 h-10 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* 많은 사람들이 좋아한 뉴스 Skeleton */}
          <div className="px-4 pb-8">
            <div className="w-30 h-6 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded mb-4 mt-8 animate-pulse"></div>
            <div className="space-y-7">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="flex h-30 bg-white dark:bg-[var(--color-gray-100)] rounded-lg overflow-hidden"
                >
                  <div className="w-30 h-full bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] flex-shrink-0 rounded-lg animate-pulse"></div>
                  <div className="flex-1 p-3 flex flex-col">
                    <div className="space-y-2 flex-1">
                      <div className="w-full h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                      <div className="w-4/5 h-4 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                    </div>
                    <div className="flex justify-between items-center mt-auto">
                      <div className="w-12 h-3 bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)] rounded animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Footer 그대로 */}
      <Footer />
    </div>
  );
}
