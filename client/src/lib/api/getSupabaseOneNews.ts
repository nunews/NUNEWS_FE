import supabase from "../supabase";
import { getKoreanCategoryFromUUID } from "./getNewstoSupabase";

export const getSupabaseOneNews = async (newsId: string) => {
  try {
    const { data, error } = await supabase
      .from("News")
      .select("*")
      .eq("news_id", newsId)
      .single();

    if (error) {
      console.error("해당 뉴스를 찾지 못했습니다.", error);
      return null;
    }

    if (!data) {
      return null;
    }

    const koreanCategory = getKoreanCategoryFromUUID(data.category_id);
    return {
      article_id: data.article_id,
      category: koreanCategory,
      title: data.title,
      description: data.content,
      content: data.content,
      image_url: data.image_url || "/images/handsomeLee.png",
      link: data.url,
      pubDate: data.published_at,
      source_name: data.source,
      source_url: data.url,
      language: "ko",
      likes: data.likes || 0,
      views: data.views || 0,
    };
  } catch (error) {
    console.error("해당 뉴스를 가져오는 중 오류가 발생했습니다.", error);
    return null;
  }
};
