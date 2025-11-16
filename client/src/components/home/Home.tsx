"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Footer from "../layout/footer";
import Header from "../layout/header";
import NewsSection from "./NewsSection";
import SummaryModal from "../ui/SummaryModal";
import { useAutoNewsFetch } from "@/hooks/useAutoNewsFetch";
import createClient from "@/utils/supabase/client";
import { useNewsData } from "@/hooks/useNewsData";
import Splash from "./Splash";
import { getUserInterestsFromClient } from "@/lib/api/getUserInterests";

export default function Home() {
  const [selectedNews, setSelectedNews] = useState<NewsData | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const mainRef = useRef<HTMLElement>(null);

  useAutoNewsFetch();
  const supabase = createClient();

  // useNewsData 훅으로 뉴스 초기 데이터 가져오기
  const { data: newsData, isError, isFetched } = useNewsData();

  const fetchUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) setUserId(user.id);
  }, [supabase]);

  useEffect(() => {
    async function loadUserData() {
      await fetchUser();
      const { interests } = await getUserInterestsFromClient();
      setInterests(interests);
    }
    loadUserData();
  }, [fetchUser]);

  // 스크롤 시 모달이 닫히도록
  useEffect(() => {
    const mainSection = mainRef.current;
    if (!mainSection) return;

    const handleScroll = () => {
      if (selectedNews) {
        setSelectedNews(null);
      }
    };

    mainSection.addEventListener("scroll", handleScroll);

    return () => {
      mainSection.removeEventListener("scroll", handleScroll);
    };
  }, [selectedNews]);

  if (!isFetched) return <Splash />;

  return (
    <>
      <div className="h-screen scrollbar-hide">
        <Header logo={true} page="nuPick" interest={interests} />
        <main
          ref={mainRef}
          className="h-screen overflow-y-scroll snap-y snap-mandatory"
        >
          {!isError &&
            newsData &&
            newsData.length > 0 &&
            newsData.map((data: NewsData, idx: number) => (
              <NewsSection
                key={data.article_id}
                className="snap-start"
                data={data}
                handleSummary={() => setSelectedNews(data)}
                userId={userId}
                newsId={data.article_id}
                isFirst={idx === 0}
              />
            ))}
        </main>
        <Footer isNuPick />
        {selectedNews && (
          <div
            key={selectedNews.article_id}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full px-2.5 z-50 max-w-[1024px] pointer-events-none"
          >
            <div className="pointer-events-auto">
              <SummaryModal
                isOpen={!!selectedNews}
                onClose={() => setSelectedNews(null)}
                newsContent={selectedNews.content || ""}
                newsId={selectedNews.article_id || ""}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
