import { useEffect, useState } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import NewsSection from "./NewsSection";
import { loadNewsData } from "@/lib/actions/newsActions";
import SummaryModal from "../ui/SummaryModal";

export default function Home() {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);

  useEffect(() => {
    const initializeNews = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await loadNewsData();

        if (data && data.length > 0) {
          setNewsData(data);
        } else {
          // 데이터가 없을 경우 기본 더미 데이터
          setNewsData([
            {
              article_id: "dummy-1",
              category: "그 외",
              description: "잠시만 기다려주세요.",
              image_url: "/images/handsomeLee.png",
              language: "ko",
              link: "#",
              pubDate: new Date().toISOString(),
              source_name: "NUNEWS",
              source_url: "#",
              title: "뉴스를 불러오는 중입니다...",
              likes: 0,
              views: 0,
            },
          ]);
        }
      } catch (err) {
        console.error("뉴스 데이터 로딩 실패:", err);
        setError("뉴스를 불러오는데 실패했습니다.");

        // 에러 시 기본 더미 데이터 사용
        setNewsData([
          {
            article_id: "dummy-error",
            category: "그 외",
            description: "네트워크 오류가 발생했습니다.",
            image_url: "/images/handsomeLee.png",
            language: "ko",
            link: "#",
            pubDate: new Date().toISOString(),
            source_name: "NUNEWS",
            source_url: "#",
            title: "뉴스 로딩 실패",
            likes: 0,
            views: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    initializeNews();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#F0FFBC] border-t-transparent"></div>
          <p className="text-lg font-medium text-gray-600">
            뉴스를 불러오는 중...
          </p>
          <p className="text-sm text-gray-400">잠시만 기다려주세요</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-screen scrollbar-hide">
        <Header
          logo={true}
          page="nuPick"
          dark={false}
          interest={["정치", "연예"]}
        />
        <main className="h-screen overflow-y-scroll snap-y snap-mandatory">
          {error && (
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-center p-6">
                <p className="text-red-500 text-lg mb-2">{error}</p>
                <p className="text-gray-500 text-sm">
                  페이지를 새로고침해주세요
                </p>
              </div>
            </div>
          )}

          {!error &&
            newsData.length > 0 &&
            newsData.map((data) => (
              <NewsSection
                key={data.article_id}
                className="snap-start"
                data={data}
                handleSummary={() => setSelectedNews(data)}
              />
            ))}
        </main>
        <Footer isNuPick />
        {selectedNews && (
          <div
            key={selectedNews.article_id}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full px-2.5 z-50 max-w-[1024px]"
          >
            <SummaryModal
              isOpen={!!selectedNews}
              onClose={() => setSelectedNews(null)}
              newsContent={selectedNews.content || ""}
              newsId={selectedNews.article_id || ""}
            />
          </div>
        )}
      </div>
    </>
  );
}
