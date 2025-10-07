import { useEffect, useState } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import NewsSection from "./NewsSection";
import { fetchRandomNews } from "@/lib/api/fetchNews";
import { getSupabase } from "@/lib/api/getSupabase";
import { saveNewstoSupabase } from "@/lib/api/saveSupabase";

export default function Home() {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadRandomNews = async () => {
      try {
        setLoading(true);
        const existingNews = await getSupabase();

        // 기존 뉴스가 있는지 확인
        if (existingNews && existingNews.length > 0) {
          setNewsData(existingNews);
          setError(null);
          return;
        }

        // 없다면 fetch 진행
        const data = await fetchRandomNews("ko");

        const transformedData: NewsData[] = data.map((data: NewsData) => {
          const originalCategory = data.category[0] || "etc";

          return {
            article_id: data.article_id,
            category: originalCategory,
            description: data.description || "내용이 없습니다.",
            image_url: data.image_url,
            language: data.language,
            link: data.link,
            pubDate: data.pubDate,
            source_name: data.source_name,
            source_url: data.source_url,
            title: data.title,
            content: data.content || data.description || "내용이 없습니다.",
          };
        });

        const savedNews = await saveNewstoSupabase(transformedData);

        setNewsData(savedNews || []);
        setError(null);
      } catch (err) {
        console.error("뉴스 데이터 로딩 실패:", err);
        setError("뉴스를 불러오는데 실패했습니다.");

        // 에러 시 기본 더미 데이터 사용
        setNewsData([
          {
            article_id: "dummy-1",
            category: "",
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
      } finally {
        setLoading(false);
      }
    };

    loadRandomNews();
  }, []);

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
          {newsData.length > 0 &&
            newsData.map((data) => (
              <NewsSection
                key={data.article_id}
                className="snap-start"
                data={data}
              />
            ))}
        </main>
        <Footer isNuPick />
      </div>
    </>
  );
}
