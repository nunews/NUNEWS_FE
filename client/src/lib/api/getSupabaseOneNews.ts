import supabase from "../supabase";
import { getKoreanCategoryFromUUID } from "./getNewstoSupabase";

export const getSupabaseOneNews = async (newsId: string) => {
  try {
    const { data: newsData, error } = await supabase
      .from("News")
      .select("*")
      .eq("news_id", newsId)
      .single();

    if (error) {
      console.error("해당 뉴스를 찾지 못했습니다.", error);
      return null;
    }

    if (!newsData) {
      return null;
    }

    const koreanCategory = getKoreanCategoryFromUUID(newsData.category_id);
    return {
      news_id: newsData.news_id,
      category_id: koreanCategory,
      title: newsData.title,
      content: newsData.content,
      source: newsData.source,
      published_at: newsData.published_at
        ? new Date(newsData.published_at).toISOString()
        : new Date().toISOString(),
      url: newsData.url,
      view_count: newsData.view_count,
      like_count: newsData.like_count,
      created_at: newsData.created_at,
      image_url: newsData.image_url,
    };
  } catch (error) {
    console.error("해당 뉴스를 가져오는 중 오류가 발생했습니다.", error);
    return null;
  }
};
