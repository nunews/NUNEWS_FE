"use client";
import Image from "next/image";
import { ThumbsUp, Eye } from "lucide-react";
import { TextButton } from "@/components/ui/TextButton";
import DefaultCard from "@/components/ui/DefaultCard";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { IconButton } from "@/components/ui/IconButton";
import RecommendNews from "@/components/ui/RecommendNews";
import RecommendPost from "@/components/ui/RecommendPost";

export default function NewsDetailPage() {
  // 다른 유저의 생각 데이터
  const posts = [
    {
      title: "손흥민 이번에 사우디 가나요?",
      content: "나는 좀 회의적임........",
      likes: 32,
      views: 124,
    },
    {
      title: "이강인 이번에 몇 골 넣었는지 아시는분 빨리 댓글좀",
      content: "나는 좀 회의적임........",
      likes: 32,
      views: 124,
    },
    {
      title: "골프는 이렇게 치면 안되는데",
      content: "나는 좀 회의적임........",
      likes: 32,
      views: 124,
    },
    {
      title: "수영은 역시 마이클 조던",
      content: "나는 좀 회의적임........",
      likes: 32,
      views: 124,
    },
  ];

  // 관심가질만한 다른 뉴스 데이터
  const relatedNews = [
    {
      title: "유강민 선수 최고기록 돌파...시속 620km로 압도적 우승",
      category: "정치",
      timeAgo: "2시간전",
      likes: 32,
      views: 124,
      image: "/images/handsomeLee.png",
    },
    {
      title: "NH농협은행, 예금금리 최고 0.3%p 내려...시장금리 반영",
      category: "경제",
      timeAgo: "3시간전",
      likes: 45,
      views: 89,
      image: "/images/handsomeLee.png",
    },
    {
      title: "꿀이 주르륵...핫케이크 정말 맛있는 맛집 발견!",
      category: "문화",
      timeAgo: "4시간전",
      likes: 67,
      views: 156,
      image: "/images/handsomeLee.png",
    },
  ];
  const newsData = {
    category: "스포츠",
    title:
      "나는 자연인이다...붉은 빛 골짜기에서 찍은 자연인의 사장이 세간의 엄청난 화제로 떠올라 광고",
    date: "2025.09.07",
    source: "매일경제",
    image: "/images/handsomeLee.png",
    content: `코스닥 시장 육성, 기업 지배구조, 산업 안정 자금 등 경제 정책 입안 경험이 풍부한 인사가 대통령의 공약 이행을 뒷받침할 적임자라는 대통령실의 설명이 있습니다.
강 실장이 해당 인사를 경제 정책 전반에 대한 높은 이해력과 국제 감각을 가졌으며, 코로나19 위기 대응 경험이 있는 민생 위기 극복 정책 집행의 적임자라고 소개했습니다.
대통령이 경제수석 명칭을 경제성장수석으로 변경하고 하준경 한양대 경제학부 교수를 발탁했다는 내용이 있습니다.
하 수석이 한국은행 출신으로 실물 경제와 이론을 겸비했으며, 국민경제자문위원회 자문위원으로 활동했다는 설명이 있습니다.
강 실장이 해당 인사를 거시경제와 산업 정책에 해박한 학자로, 대통령의 공약 수립 과정에 참여하여 경제 성장 철학에 대한 이해도가 높다고 설명했습니다.
대통령이 재정기획보좌관을 신설하고 류덕현 중앙대 경제학부 교수를 임명했다는 내용이 있습니다.
류 보좌관이 한국조세재정연구원과 한국재정학회 이사를 지낸 재정 전문가로, 재정의 역할을 강조하는 입장이라고 알려져 있습니다.`,
    likes: 32,
    views: 124,
  };

  return (
    <div className="min-h-screen">
      <Header logo={false} nuPick={false} dark={false} interest={[]}  />

      <div className="px-5 pt-18">
        <div className="text-sm text-[var(--color-gray-70)] mb-2">
          {newsData.category}
        </div>
        <h1 className="text-[22px] font-bold leading-[140%] mb-3">
          {newsData.title}
        </h1>
        <div className="flex items-center gap-2 text-sm text-[var(--color-gray-70)] mb-7">
          <span>{newsData.date}</span>
          <span>•</span>
          <span>{newsData.source}</span>
          <div className="flex items-center justify-end flex-1 gap-[3px]">
            <Eye className="w-5 h-5 text-[var(--color-gray-70)]" />
            <span className="text-sm text-[var(--color-gray-70)]">
              {newsData.views}
            </span>
          </div>
        </div>
        <div className="w-full h-64 mb-7.5 rounded-lg overflow-hidden">
          <Image
            src={newsData.image}
            alt="뉴스 이미지"
            width={400}
            height={256}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="mb-6 flex items-center gap-3">
          <TextButton className="w-[97px] h-9 px-4 bg-[var(--color-black)] hover:bg-[var(--color-gray-100)] hover:bg-blur-[4px]">
            <p className="text-sm whitespace-nowrap text-transparent bg-clip-text bg-gradient-to-r from-[#F0FFBC] to-[var(--color-primary-40)]">
              AI 세줄요약
            </p>
          </TextButton>
          <p className="text-sm">기사를 세줄로 요약해드려요!</p>
        </div>

        {/* 기사 내용 */}
        <div className="mb-7.5">
          <div className="text-base leading-[160%] whitespace-pre-line text-[var(--color-gray-100)]">
            {newsData.content}
          </div>
        </div>
        <div className="flex items-center gap-[11px] pt-4">
          <div className="flex items-center gap-[3px]">
            <IconButton
              icon={ThumbsUp}
              size={22}
              color="var(--color-gray-70)"
              className="flex gap-[3px]"
            ></IconButton>
            <span className="text-[var(--color-gray-70)] items-end">
              {newsData.likes}
            </span>
          </div>
        </div>
        <div className="border-b border-[var(--color-gray-20)] mt-9" />

        {/* 다른 유저의 생각 */}
        <div className="mb-8 mt-10">
          <h2 className="text-[22px] font-bold mb-6">
            <span className="text-[var(--color-black)]">
              &apos;스포츠&apos;
            </span>
            <span className="text-[var(--color-gray-80)]">
              에 대한 다른 유저의 생각
            </span>
          </h2>
          <div className="space-y-[10px]">
            {posts.map((content, index) => (
              <RecommendPost
                key={index}
                title={content.title}
                content={content.content}
                likes={content.likes}
                views={content.views}
              />
            ))}
          </div>
        </div>
        <div className="border-b border-[var(--color-gray-20)] mt-9" />

        {/* 관심 가질만한 다른 뉴스 */}
        <div className="mb-24 mt-10">
          <h2 className="text-lg font-bold mb-6">관심 가질만한 다른 뉴스</h2>
          <div className="space-y-4">
            {relatedNews.map((news, index) => (
              <RecommendNews
                key={index}
                title={news.title}
                category={news.category}
                image={news.image}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer isNuPick={false} />
    </div>
  );
}
