"use server";

import { fetchRandomNews } from "@/lib/api/fetchNews";
import { getSupabase } from "@/lib/api/getNewstoSupabase";
import { saveNewstoSupabase } from "@/lib/api/saveNewstoSupabase";

export async function loadNewsData(): Promise<NewsData[]> {
  try {
    const existingNews = await getSupabase();

    if (existingNews && existingNews.length > 0) {
      return existingNews;
    }

    const fetchedNews = await fetchRandomNews("ko");
    const transformedData: NewsData[] = fetchedNews.map((data: NewsData) => {
      const originalCategory = data.category[0] || "etc";

      return {
        article_id: data.article_id,
        category: originalCategory,
        description: data.description || "내용이 없습니다.",
        image_url: data.image_url,
        language: data.language,
        link: data.link,
        pubDate: data.pubDate,
        source_name: data.source_name,
        source_url: data.source_url,
        title: data.title,
        content: data.content || data.description || "내용이 없습니다.",
      };
    });

    const savedNews = await saveNewstoSupabase(transformedData);
    return savedNews || transformedData;
  } catch (error) {
    console.error("뉴스 로딩 실패:", error);
    return [];
  }
}
