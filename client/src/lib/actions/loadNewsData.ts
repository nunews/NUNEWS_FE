// page.tsx 에서 뉴스 데이터 패치 작업
"use server";

import { saveNewstoSupabase } from "@/lib/api/saveNewstoSupabase";
import { fetchNewsData } from "../api/fetchNews";

export async function loadNewsData(): Promise<NewsData[]> {
  try {
    const fetchedNews = await fetchNewsData("korean");
    const transformedData: NewsData[] = fetchedNews.map((data: NewsData) => {
      return {
        news_id: data.article_id,
        category: data.category[0] || "etc",
        description: data.description || "내용이 없습니다.",
        image_url: data.image_url,
        language: data.language,
        link: data.link,
        pubDate: data.pubDate,
        source_name: data.source_name,
        source_url: data.source_url,
        title: data.title,
      };
    });
    console.log(fetchedNews);

    const savedNews = await saveNewstoSupabase(transformedData);
    return savedNews || transformedData;
  } catch (error) {
    console.error("뉴스 로딩 실패:", error);
    return [];
  }
}
