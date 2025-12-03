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
import { useRouter } from "next/navigation";

export default function Home() {
  const [selectedNews, setSelectedNews] = useState<SupabaseNewsData | null>(
    null
  );
  const [userId, setUserId] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const mainRef = useRef<HTMLElement>(null);

  useAutoNewsFetch();
  const supabase = createClient();
  const router = useRouter();

  // useNewsData 훅으로 뉴스 데이터 가져오기
  const { data: newsData = [], isError, isFetched } = useNewsData();

  // 로그인 유저 정보, 관심사 가져오기
  const fetchUser = useCallback(async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error("유정 정보 get 에러", error);
      return;
    }

    const user = data?.user;

    if (!user) {
      setUserId(null);
      setInterests([]);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("User")
      .select("nickname")
      .eq("user_id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("프로필 조회 오류", profileError);
    }

    if (!profile || profile.nickname == null) {
      router.push("/profile/init");
      return;
    }

    setUserId(user.id);

    const { interests } = await getUserInterestsFromClient();
    setInterests(interests);
  }, [supabase, router]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // 스크롤 시 요약 모달 닫기
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

  // 요약보기 버튼 핸들러
  const handleSummaryClick = (news: SupabaseNewsData) => {
    setSelectedNews(news);
  };

  // 원문 보기 버튼 클릭 시: 조회수 +1 후 디테일 페이지로 이동
  const handleViewOriginalClick = async (news: SupabaseNewsData) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("로그인 유저 확인 오류", error);
      }

      if (user) {
        const { error: viewError } = await supabase.rpc("increment_news_view", {
          p_news_id: news.news_id,
        });

        if (viewError) {
          console.error("조회수 증가 실패", viewError);
        }
      }
    } catch (e) {
      console.error("조회수 증가 처리 중 오류", e);
    }

    router.push(`/newsDetail/${news.news_id}`);
  };

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
            newsData.map((data: SupabaseNewsData, idx: number) => (
              <NewsSection
                key={data.news_id}
                className="snap-start"
                data={data}
                likes={data.like_count || 0}
                views={data.view_count || 0}
                handleSummary={() => handleSummaryClick(data)}
                handleDetail={() => handleViewOriginalClick(data)}
                userId={userId}
                newsId={data.news_id}
                isFirst={idx === 0}
              />
            ))}
        </main>
        <Footer isNuPick />
        {selectedNews && (
          <div
            key={selectedNews.news_id}
            className="fixed bottom-20 left-1/2 -translate-x-1/2 w-full px-2.5 z-50 max-w-[1024px] pointer-events-none"
          >
            <div className="pointer-events-auto">
              <SummaryModal
                isOpen={!!selectedNews}
                onClose={() => setSelectedNews(null)}
                newsContent={selectedNews.content || ""}
                newsId={selectedNews.news_id || ""}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
