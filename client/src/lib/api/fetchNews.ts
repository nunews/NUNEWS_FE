import { API_CONFIG } from "@/lib/config";
import axios from "axios";

// 뉴스 불러오기
export const fetchNewsData = async (keywords: string, language = "ko") => {
  try {
    const response = await axios.get("https://newsdata.io/api/1/latest", {
      params: {
        apikey: API_CONFIG.NEWSDATA_API_KEY,
        q: keywords,
        language,
      },
      headers: {
        "Content-Type": "application/json",
      },
    });

    const results =
      response.data?.results?.filter((news: NewsData) =>
        news?.image_url?.trim()
      ) || [];

    console.log("newsData", results);
    return results;
  } catch (error) {
    console.error("뉴스 데이터 가져오기 실패:", error);
    return [];
  }
};

// 랜덤 뉴스 불러오기
export const fetchRandomNews = async (language: string) => {
  try {
    const res = await axios.get("https://newsdata.io/api/1/latest", {
      params: {
        apikey: API_CONFIG.NEWSDATA_API_KEY,
        language,
      },
    });
    const results = res.data?.results?.filter((news: NewsData) =>
      news?.image_url?.trim()
    );
    return results;
  } catch (e) {
    console.error(e);
    return [];
  }
};
