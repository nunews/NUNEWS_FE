"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HotNewsCard from "@/components/ui/HotNewsCard";
import DefaultCard from "@/components/ui/DefaultCard";
import hotICon from "@/assets/images/fire.png";
import Image from "next/image";
import { useState } from "react";

export default function AllPickPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const categories = [
    "전체",
    "정치",
    "스포츠",
    "연예",
    "문화",
    "해외",
    "사회",
    "경제",
    "그 외",
  ];

  // 더미 뉴스 데이터
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

  return (
    <>
      <div className="h-screen scrollbar-hide">
        <Header logo={true} nuPick={false} dark={false} interest={[]} />
        <main className="h-screen overflow-y-scroll pt-16 pb-18">
          <div className="p-4">
            {/* 카테고리 버튼 */}
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center justify-center px-3 py-[5px] rounded-full text-sm font-normal whitespace-nowrap transition-all duration-300 ease-in cursor-pointer ${
                    selectedCategory === category
                      ? "bg-[var(--color-black)] text-[var(--color-white)]"
                      : "bg-[var(--color-gray-10)] text-[var(--color-black)] hover:bg-[var(--color-gray-20)]"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* 핫 뉴스 */}
            <div className="flex flex-col mb-5">
              <div className="flex gap-1">
                <Image
                  src={hotICon}
                  alt="핫 뉴스 아이콘"
                  width={26}
                  height={26}
                  style={{ width: "26px", height: "26px" }}
                />
                <h2 className="text-lg font-bold text-[var(--color-black)] mb-4">
                  오늘의 핫 뉴스
                </h2>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {newsData.slice(0, 4).map((news, index) => (
                  <div key={index} className="flex-shrink-0">
                    <HotNewsCard
                      title={news.title}
                      category={news.category}
                      timeAgo={news.timeAgo}
                      likes={news.likes}
                      views={news.views}
                      image={news.image}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* 세로 뉴스 */}
            <div>
              <h2 className="text-lg font-bold text-[var(--color-black)] mt-8">
                모든 뉴스
              </h2>
              <div>
                {newsData.map((news, index) => (
                  <DefaultCard
                    key={index}
                    title={news.title}
                    category={news.category}
                    timeAgo={news.timeAgo}
                    likes={news.likes}
                    views={news.views}
                    image={news.image}
                  />
                ))}
              </div>
            </div>
          </div>
        </main>
        <Footer isNuPick={false} />
      </div>
    </>
  );
}
