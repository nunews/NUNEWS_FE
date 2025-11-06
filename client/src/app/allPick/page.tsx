"use client";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import HotNewsCard from "@/components/ui/HotNewsCard";
import DefaultCard from "@/components/ui/DefaultCard";
import hotICon from "@/assets/images/fire.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import "swiper/css";
import PostCard from "@/components/ui/PostCard";
import { TextButton } from "@/components/ui/TextButton";
import CategoryFilter from "@/components/mypage/CategoryFilter";
import {
  getSupabaseInterestNews,
  getSupabaseRandomNews,
} from "@/lib/api/getNewstoSupabase";
import { Category } from "@/lib/interest";
import { timeAgo } from "@/utils/timeAgo";
import { fetchPost, fetchWriter } from "../api/community";
import { Post } from "@/types/post";
import { useRouter } from "next/navigation";
import Loading from "./loading";

export default function AllPickPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState("");
  const [postData, setPostData] = useState<Post[]>([]);
  const [isPostLoading, setIsPostLoading] = useState(true);

  const router = useRouter();

  const handlePostCreate = () => {
    router.push("/community/postCreate");
  };

  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        setIsLoading(true);
        setIsError("");

        let newsList: NewsData[] = [];
        if (selectedCategory === "전체") {
          newsList = await getSupabaseRandomNews();
        } else {
          const categoryUUID =
            Category[selectedCategory as keyof typeof Category];

          if (categoryUUID) {
            console.log("카테고리 UUID:", categoryUUID);
            newsList = await getSupabaseInterestNews([categoryUUID]);

            // 카테고리에 뉴스가 없으면 랜덤한 뉴스를 가져오기
            if (!newsList || newsList.length < 10) {
              console.log("뉴스가 없습니다. 랜덤 뉴스를 가져옵니다.");
              newsList = await getSupabaseRandomNews();
            }
          } else {
            setIsError(`"${selectedCategory}" 카테고리를 찾을 수 없습니다.`);
          }
        }

        // 뉴스를 최신순으로 가져오기 때문에 랜덤으로 섞음
        const shuffled = newsList?.sort(() => Math.random() - 0.5);
        const transformedNews = shuffled.map((news) => ({
          ...news,
          newsId: news.article_id,
          timeAgo: timeAgo(news.pubDate),
          image: news.image_url,
          likes: news.likes || 0,
          views: news.views || 0,
        }));

        setNewsData(transformedNews);
        console.log(`뉴스 로딩 완료`);
      } catch (error) {
        console.error("뉴스 데이터 가져오기 실패", error);
        setIsError("뉴스를 가져오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchNewsData();
  }, [selectedCategory]);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setIsPostLoading(true);
        const posts = await fetchPost();

        const postWithUserInfo = await Promise.all(
          posts.map(async (post) => {
            const userProfile = await fetchWriter(post.user_id);
            return {
              ...post,
              User: userProfile,
            };
          })
        );
        setPostData(postWithUserInfo);
      } catch (error) {
        console.error("게시글 데이터 가져오기 실패", error);
        setPostData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPostData();
  }, []);

  if (isLoading) return <Loading />;

  return (
    <>
      <div className="h-screen scrollbar-hide bg-[var(--color-white)] dark:bg-[#121212]">
        <Header logo={true} interest={[]} />
        <main className="h-screen overflow-y-scroll pt-16 pb-18">
          <div>
            <div className="px-4 whitespace-nowrap">
              <CategoryFilter
                activeCategory={selectedCategory}
                setActiveCategory={setSelectedCategory}
              />
            </div>

            {/* 핫 뉴스 */}
            <div className="flex flex-col mb-5 px-4 mt-7.5">
              <div className="flex gap-1">
                <Image
                  src={hotICon}
                  alt="핫 뉴스 아이콘"
                  width={26}
                  height={26}
                  style={{ width: "26px", height: "26px" }}
                />
                <h2 className="text-lg font-bold text-[var(--color-black)] dark:text-[var(--color-white)] mb-4">
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
                  {newsData.slice(0, 4).map((news) => (
                    <SwiperSlide key={news.article_id} className="!w-[300px]">
                      <HotNewsCard
                        newsId={news.article_id || ""}
                        title={news.title}
                        category={news.category}
                        timeAgo={timeAgo(news.pubDate)}
                        likes={news.likes || 0}
                        views={news.views || 0}
                        image={news.image_url || ""}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>

            {/* 세로 뉴스 */}
            <div className="px-4">
              <h2 className="text-lg font-bold text-[var(--color-black)] dark:text-[var(--color-white)] mt-8">
                모든 뉴스
              </h2>
              <div>
                {newsData.slice(0, 5).map((news) => (
                  <DefaultCard
                    key={news.article_id}
                    newsId={news.article_id!}
                    title={news.title}
                    category={news.category}
                    timeAgo={timeAgo(news.pubDate)}
                    likes={news.likes || 0}
                    views={news.views || 0}
                    image={news.image_url || ""}
                  />
                ))}
              </div>
            </div>
            {/* 관심사별 추천 커뮤니티 글 */}
            <div className="w-full h-[438px] flex flex-col bg-[#f8f8f8] mt-4 pb-11 px-4 dark:bg-[var(--color-black)]">
              <h2 className="text-lg font-bold text-[#191919] dark:text-[var(--color-white)] mt-10 mb-5">
                나의 관심사에 대해 <br />
                사람들과 대화해 보세요!
              </h2>
              <div className="flex-1 mb-4">
                <Swiper
                  spaceBetween={10}
                  slidesPerView={1.2}
                  grabCursor={true}
                  freeMode={true}
                  navigation={false}
                  pagination={{ clickable: true }}
                >
                  {postData.map((post) => (
                    <SwiperSlide key={post?.post_id} className="!w-[278px]">
                      <PostCard
                        postId={post.post_id}
                        profileImage={post.User?.profile_image || ""}
                        username={post.User?.nickname || "익명의 누누"}
                        category={post.category_id}
                        content={post.contents}
                        likes={post.like_count || 0}
                        views={post.view_count || 0}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="flex justify-center">
                <TextButton
                  onClick={handlePostCreate}
                  className="bg-[var(--color-black)] dark:bg-[var(--color-white)] w-31 h-10 rounded-full hover:bg-[var(--color-gray-100)] dark:hover:bg-[var(--color-gray-20)]"
                >
                  <p className="text-[var(--color-white)] dark:text-[var(--color-black)]">
                    글쓰러 가기
                  </p>
                </TextButton>
              </div>
            </div>

            <div className="flex flex-col px-4 mt-8">
              <h2 className="text-lg font-bold text-[var(--color-black)] dark:text-[var(--color-white)] mb-4">
                많은 사람들이 좋아한 뉴스
              </h2>
              {newsData
                .sort((a, b) => (b.views || 0) - (a.views || 0))
                .slice(0, 5)
                .map((news) => (
                  <DefaultCard
                    key={news.article_id}
                    newsId={news.article_id!}
                    title={news.title}
                    category={news.category}
                    timeAgo={timeAgo(news.pubDate)}
                    likes={news.likes || 0}
                    views={news.views || 0}
                    image={news.image_url || ""}
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
