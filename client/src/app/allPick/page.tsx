"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HotNewsCard from "@/components/ui/HotNewsCard";
import DefaultCard from "@/components/ui/DefaultCard";
import hotICon from "@/assets/images/fire.png";
import Image from "next/image";
import { useState } from "react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import PostCard from "@/components/ui/PostCard";
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

  // post card data
  const postData = [
    {
      profileImage: "/images/profile1.png",
      username: "혁신적인 돼지",
      category: "스포츠",
      content:
        "아니 나는 진짜 이강인이 결승전 못뛰어서 너무 아쉽꿀꿀다음엔 꼭 이강인이 결승전 뛰었으면 좋겠다꿀ㅠ 어디까지나 팬 입장에서...",
      likes: 32,
      views: 124,
    },
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
  ];

  return (
    <>
      <div className="h-screen scrollbar-hide">
        <Header logo={true} nuPick={false} dark={false} interest={[]} />
        <main className="h-screen overflow-y-scroll pt-16 pb-18">
          <div className="">
            <div className="flex gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar px-4">
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
            <div className="flex flex-col mb-5 px-4">
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
              <div className="flex overflow-x-auto pb-2 scrollbar-hide">
                <Swiper
                  spaceBetween={16}
                  slidesPerView="auto"
                  grabCursor={true}
                  freeMode={true}
                >
                  {newsData.slice(0, 4).map((news, index) => (
                    <SwiperSlide key={index} className="!w-[300px]">
                      <HotNewsCard
                        title={news.title}
                        category={news.category}
                        timeAgo={news.timeAgo}
                        likes={news.likes}
                        views={news.views}
                        image={news.image}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* 세로 뉴스 */}
            <div className="px-4">
              <h2 className="text-lg font-bold text-[var(--color-black)] mt-8">
                모든 뉴스
              </h2>
              <div>
                {newsData.slice(0, 5).map((news, index) => (
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
            <div className="w-full h-[438px] flex items-center gap-4 bg-[#f8f8f8] rounded-lg p-4">
              {postData.map((post, index) => (
                <PostCard
                  key={index}
                  profileImage={post.profileImage}
                  username={post.username}
                  category={post.category}
                  content={post.content}
                  likes={post.likes}
                  views={post.views}
                />
              ))}
            </div>
            <div className="flex flex-col gap-4 px-4">
              <h2 className="text-lg font-bold text-[var(--color-black)] mb-4">
                많은 사람들이 좋아한 뉴스
              </h2>
              {newsData.slice(0, 5).map((news, index) => (
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
        </main>
        <Footer isNuPick={false} />
      </div>
    </>
  );
}
