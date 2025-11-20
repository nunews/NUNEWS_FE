import supabase from "@/lib/supabase";
import { categoryIdMap } from "@/lib/categoryUUID";

export const getKoreanCategoryFromUUID = (categoryId: string): string => {
  // categoryIdMap을 뒤집어서 UUID -> 한글 매핑
  const uuidToKorean: { [key: string]: string } = {};
  Object.entries(categoryIdMap).forEach(([korean, uuid]) => {
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

    const transformedData: SupabaseNewsData[] = data
      .filter((news) => news.content !== null && news.image_url !== null)
      .map((news) => {
        const koreanCategory = getKoreanCategoryFromUUID(news.category_id);
        return {
          news_id: news.news_id,
          category_id: koreanCategory,
          title: news.title,
          content: news.content,
          source: news.source,
          published_at: news.published_at
            ? new Date(news.published_at).toISOString()
            : new Date().toISOString(),
          url: news.url,
          view_count: news.view_count,
          like_count: news.like_count,
          created_at: news.created_at,
          image_url: news.image_url,
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
    if (!categoryIds || !categoryIds.length) {
      console.log("관심사가 없습니다.");
      return [];
    }

    // 관심사에 맞는 뉴스 가져오기
    const { data: newsData, error } = await supabase
      .from("News")
      .select("*")
      .in("category_id", categoryIds)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("뉴스 가져오기 실패", error);
      return [];
    }

    if (!newsData?.length) {
      console.log("선택된 관심사 카테고리에 해당하는 뉴스가 없습니다.");
      return [];
    }

    const transformedData: SupabaseNewsData[] = newsData
      .filter((news) => news.content !== null && news.image_url !== null)
      .map((news) => {
        const koreanCategory = getKoreanCategoryFromUUID(news.category_id);
        return {
          news_id: news.news_id,
          category_id: koreanCategory,
          title: news.title,
          content: news.content,
          source: news.source,
          published_at: news.published_at
            ? new Date(news.published_at).toISOString()
            : new Date().toISOString(),
          url: news.url,
          view_count: news.view_count,
          like_count: news.like_count,
          created_at: news.created_at,
          image_url: news.image_url,
        };
      });

    return transformedData;
  } catch (error) {
    console.error("뉴스 가져오기 실패", error);
    return [];
  }
};
