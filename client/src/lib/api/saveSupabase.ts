import supabase from "@/lib/supabase";
import { categoryIdMap, categoryNameMap } from "../categoryUUID";

export const saveNewstoSupabase = async (newsData: NewsData[]) => {
  try {
    const savedNews: NewsData[] = [];
    for (const news of newsData) {
      const { data: existing } = await supabase
        .from("News")
        .select("*")
        .eq("article_id", news.article_id)
        .single();

      if (!existing) {
        // 영어 카테고리 한글로 변환
        const koreanCategory =
          categoryNameMap[news.category as keyof typeof categoryNameMap] ||
          "그 외";
        console.log("카테고리 변환", news.category, "->", koreanCategory);

        // uuid 찾기
        const categoryId =
          categoryIdMap[koreanCategory as keyof typeof categoryIdMap];
        console.log("매핑된 category_id:", categoryId);

        // 매칭된 카테고리가 없으면 기타로 설정
        const finalCategoryId = categoryId || categoryIdMap["기타"];
        console.log("변환된 category_id:", finalCategoryId);
        const { data, error } = await supabase
          .from("News")
          .insert({
            news_id: news.article_id,
            category_id: finalCategoryId,
            title: news.title,
            content: news.description,
            source: news.source_name,
            published_at: news.pubDate,
            url: news.link,
            view_count: 0,
            created_at: news.pubDate,
            image_url: news.image_url,
          })
          .select()
          .single();

        if (error) {
          console.error("뉴스 저장 실패", error);
        } else {
          console.log("뉴스 저장 완료");
          savedNews.push(data);
        }
      } else {
        savedNews.push(news);
      }
    }
    console.log("🔄 저장된 뉴스:", savedNews);
    return savedNews;
  } catch (error) {
    console.error("뉴스 저장 중 오류", error);
    return [];
  }
};
