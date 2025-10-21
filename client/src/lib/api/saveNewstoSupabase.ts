import supabase from "@/lib/supabase";
import { categoryIdMap, categoryNameMap } from "../categoryUUID";

export const saveNewstoSupabase = async (newsData: NewsData[]) => {
  try {
    const savedNews: NewsData[] = [];
    for (const news of newsData) {
      const { data: existing } = await supabase
        .from("News")
        .select("*")
        .eq("news_id", news.article_id)
        .single();

      if (!existing) {
        // 영어 카테고리 한글로 변환
        const koreanCategory =
          categoryNameMap[news.category as keyof typeof categoryNameMap] ||
          "그 외";
        console.log("카테고리 변환", news.category, koreanCategory);

        // uuid 찾기
        const categoryId =
          categoryIdMap[koreanCategory as keyof typeof categoryIdMap];

        const { data, error } = await supabase
          .from("News")
          .upsert(
            {
              news_id: news.article_id,
              category_id: categoryId || categoryIdMap["그 외"],
              title: news.title,
              content: news.description,
              source: news.source_name,
              published_at: news.pubDate,
              url: news.link,
              view_count: 0,
              created_at: news.pubDate,
              image_url: news.image_url,
            },
            { onConflict: "news_id", ignoreDuplicates: true }
          )
          .select("news_id");

        if (error) {
          console.error("뉴스 저장 실패", error);
        } else {
          savedNews.push(
            data?.[0]?.news_id ?? existing?.news_id ?? news.article_id
          );
        }
      } else {
        savedNews.push(news);
      }
    }
    return savedNews;
  } catch (error) {
    console.error("뉴스 저장 중 오류", error);
    return [];
  }
};
