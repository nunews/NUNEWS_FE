import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import DefaultCard from "../ui/DefaultCard";
const newsData = [
  {
    title:
      "발리 포세이돈 박은서.. 높이 2,400m 해일을 돌파 해 기네스 기록세워...지구인 최초",
    category: "사회",
    timeAgo: "2시간전",
    likes: 32,
    views: 124,
    image: "/images/dance.jpg",
  },
  {
    title: "마르타 구민지 강스윙에 맞은 심판 두개골 골절...모두 애도를 표해",
    category: "연예",
    timeAgo: "1시간전",
    likes: 45,
    views: 89,
    image: "/images/manji.png",
  },
  {
    title: "대통령, AI 기반 뉴스 요약 서비스에 깊은 관심 표명",
    category: "정치",
    timeAgo: "3시간전",
    likes: 67,
    views: 156,
    image: "/images/positive.png",
  },
  {
    title: "유강민 선수 최고기록 돌파...시 속 620km로 압도적 우승",
    category: "스포츠",
    timeAgo: "4시간전",
    likes: 89,
    views: 234,
    image: "/images/dogdog.png",
  },
  {
    title: "새로운 AI 기술로 뉴스 요약 서비스 혁신",
    category: "기술",
    timeAgo: "5시간전",
    likes: 123,
    views: 456,
    image: "/images/handsomeLee.png",
  },
  {
    title: "경제 전망 보고서 발표...내년 성장률 예상",
    category: "경제",
    timeAgo: "6시간전",
    likes: 78,
    views: 234,
    image: "/images/happy2.png",
  },
];

const ScrappedNewsContent = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredNews =
    activeCategory === "all"
      ? newsData
      : newsData.filter((news) => news.category === activeCategory);

  return (
    <div className="flex flex-col px-5 py-6 mb-18">
      <div className="mr-[-20px]">
        <CategoryFilter
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
      <div className="space-y-4">
        {filteredNews.map((news, index) => {
          return (
            <DefaultCard
              key={index}
              title={news.title}
              category={news.category}
              timeAgo={news.timeAgo}
              likes={news.likes}
              views={news.views}
              image={news.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ScrappedNewsContent;
