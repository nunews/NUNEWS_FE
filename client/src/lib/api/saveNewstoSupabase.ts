import { categoryIdMap, categoryNameMap } from "../categoryUUID";
import supabase from "../supabase";

// 뉴스 데이터를 Supabase에 저장하기
export const saveNewstoSupabase = async (newsData: NewsData[]) => {
  try {
    const savedNews: NewsData[] = [];

    for (const currentNews of newsData) {
      // 유효성 검사
      if (!currentNews.article_id) {
        console.warn("❌ 유효하지 않은 뉴스:", {
          article_id: currentNews.article_id,
          title: currentNews.title,
          reason: "article_id 없음",
        });
        continue;
      }

      const { data: existing } = await supabase
        .from("News")
        .select("*")
        .eq("news_id", currentNews.article_id)
        .single();

      if (!existing) {
        // 영어 카테고리 한글로 변환
        const koreanCategory =
          categoryNameMap[
            currentNews.category as keyof typeof categoryNameMap
          ] || "그 외";

        // uuid 찾기
        const categoryId =
          categoryIdMap[koreanCategory as keyof typeof categoryIdMap];

        // 한국시간으로 변환
        const getKSTDate = () => {
          return new Date()
            .toLocaleString("sv-SE", { timeZone: "Asia/Seoul" })
            .replace(" ", "T");
        };
        const { data, error } = await supabase
          .from("News")
          .upsert(
            {
              news_id: currentNews.article_id,
              category_id: categoryId || categoryIdMap["그 외"],
              title: currentNews.title,
              content: currentNews.description,
              source: currentNews.source_name,
              published_at: currentNews.pubDate,
              url: currentNews.link,
              view_count: 0,
              created_at: getKSTDate(),
              image_url: currentNews.image_url,
            },
            { onConflict: "news_id", ignoreDuplicates: true }
          )
          .select("news_id");

        if (error) {
          console.error("뉴스 저장 실패", error);
        } else {
          savedNews.push(currentNews);
        }
      }
    }

    return savedNews;
  } catch (error) {
    console.error("뉴스 저장 중 오류", error);
    return [];
  }
};
