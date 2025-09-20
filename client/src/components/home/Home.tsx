import { useEffect, useState } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import NewsSection from "./NewsSection";
import entertainment from "@/assets/images/entertainment.png";
import { fetchRandomNews } from "@/lib/api/fetchNews";
import { getCategoryIcon, getCategoryKorean } from "@/lib/categoryMap";

export default function Home() {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadNews = async () => {
      try {
        setLoading(true);
        const data = await fetchRandomNews("ko");

        // newsIO 데이터를 기존 형식으로 변환
        const transformedData = data
          .filter((item) => item.image_url && item.image_url.trim()) // 이미지가 있는 것만 필터링
          .slice(0, 10)
          .map((item, index) => ({
            id: index + 1,
            category: getCategoryKorean(item.category[0] || "기타"),
            title: item.title,
            description:
              item.description ||
              item.content?.substring(0, 100) + "..." ||
              "설명이 없습니다.",
            image: item.image_url,
            categoryIcon: getCategoryIcon(item.category[0] || "기타"),
            likes: Math.floor(Math.random() * 50),
            views: Math.floor(Math.random() * 200),
            link: item.link,
            source: item.source_id,
            pubDate: item.pubDate,
          }));

        setNewsData(transformedData);
        console.log(transformedData);
        setError(null);
      } catch (err) {
        console.error("뉴스 데이터 로딩 실패:", err);
        setError("뉴스를 불러오는데 실패했습니다.");

        // 에러 시 기본 더미 데이터 사용
        setNewsData([
          {
            id: 1,
            category: "연예",
            title: "뉴스를 불러오는 중입니다...",
            description: "잠시만 기다려주세요.",
            image: "/images/handsomeLee.png",
            categoryIcon: entertainment,
            likes: 0,
            views: 0,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
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
          {newsData.map((item) => (
            <NewsSection key={item.id} className="snap-start" data={item} />
          ))}
        </main>
        <Footer isNuPick />
      </div>
    </>
  );
}
