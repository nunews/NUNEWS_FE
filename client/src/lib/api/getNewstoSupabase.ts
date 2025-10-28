import supabase from "@/lib/supabase";
import { CategoryInv } from "@/lib/interest";
import { getAuthUser } from "../auth/getAuthUser";

export const getKoreanCategoryFromUUID = (categoryId: string): string => {
  // categoryIdMap을 뒤집어서 UUID -> 한글 매핑
  const uuidToKorean: { [key: string]: string } = {};
  Object.entries(CategoryInv).forEach(([korean, uuid]) => {
    uuidToKorean[uuid] = korean;
  });

  const koreanCategory = uuidToKorean[categoryId] || "그 외";
  return koreanCategory;
};

// 비로그인 & 관심사 선택 없을 시 랜덤 뉴스
export const getSupabaseRandomNews = async () => {
  try {
    const { data, error } = await supabase
      .from("News")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) {
      console.error("뉴스 가져오기 실패", error);
      return [];
    }

    const transformedData: NewsData[] = data
      .filter((news) => news.content !== null && news.image_url !== null)
      .map((news) => {
        const koreanCategory = getKoreanCategoryFromUUID(news.category_id);
        return {
          article_id: news.news_id,
          category: koreanCategory,
          content: news.content,
          description: news.description,
          image_url: news.image_url,
          language: news.language,
          link: news.link,
          pubDate: news.published_at,
          source_name: news.source,
          source_url: news.url,
          title: news.title,
        };
      });

    return transformedData;
  } catch (error) {
    console.error("뉴스 가져오기 실패", error);
    return [];
  }
};

// 관심사에 맞는 뉴스 가져오기
export const getSupabaseInterestNews = async (categoryIds: string[]) => {
  try {
    const { user, isLoggedIn } = await getAuthUser();
    if (!isLoggedIn || !user) {
      console.log("로그인된 유저가 없습니다.");
      return [];
    }

    // 관심사에 맞는 뉴스 가져오기
    const { data: newsData, error } = await supabase
      .from("News")
      .select("*")
      .in("category_id", categoryIds)
      .limit(20);

    if (error) {
      console.error("뉴스 가져오기 실패", error);
      return [];
    }

    if (!newsData?.length) {
      console.log("선택된 관심사 카테고리에 해당하는 뉴스가 없습니다.");
      return [];
    }

    const transformedData: NewsData[] = newsData
      .filter((news) => news.content !== null && news.image_url !== null)
      .map((news) => {
        const koreanCategory = getKoreanCategoryFromUUID(news.category_id);
        return {
          article_id: news.news_id,
          category: koreanCategory,
          content: news.content,
          description: news.description,
          image_url: news.image_url,
          language: news.language,
          link: news.link,
          pubDate: news.published_at,
          source_name: news.source,
          source_url: news.url,
          title: news.title,
        };
      });

    return transformedData;
  } catch (error) {
    console.error("뉴스 가져오기 실패", error);
    return [];
  }
};
