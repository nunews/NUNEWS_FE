import { API_CONFIG } from "@/lib/config";

interface NewsItem {
  article_id: string;
  title: string;
  link: string;
  keywords?: string[];
  creator?: string[];
  video_url?: string;
  description: string;
  content: string;
  pubDate: string;
  image_url: string;
  source_id: string;
  source_priority: number;
  source_url: string;
  source_icon: string;
  language: string;
  country: string[];
  category: string[];
  ai_region: string;
  ai_org: string;
  duplicate: boolean;
}

interface NewsResponse {
  status: string;
  totalResults: number;
  results: NewsItem[];
  nextPage?: string;
}

// 뉴스 불러오기
export const fetchNewsData = async (
  keywords: string,
  language: string = "ko"
): Promise<NewsItem[]> => {
  try {
    const url = new URL("https://newsdata.io/api/1/latest");
    url.searchParams.append("apikey", API_CONFIG.NEWSDATA_API_KEY);
    url.searchParams.append("q", keywords);
    url.searchParams.append("language", language);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // 캐싱 제어
      next: {
        revalidate: 300, // 5분마다 재검증
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsResponse = await response.json();

    // 이미지가 있는 뉴스만 필터링
    const results =
      data.results?.filter((news) => news?.image_url?.trim()) || [];
    return results;
  } catch (error) {
    console.error("뉴스 데이터 가져오기 실패:", error);
    return [];
  }
};

export const fetchRandomNews = async (
  language: string = "ko"
): Promise<NewsItem[]> => {
  try {
    const url = new URL("https://newsdata.io/api/1/latest");
    url.searchParams.append("apikey", API_CONFIG.NEWSDATA_API_KEY);
    url.searchParams.append("language", language);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 600, // 10분마다 재검증
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsResponse = await response.json();

    const results =
      data.results?.filter((news) => news?.image_url?.trim()) || [];
    return results;
  } catch (error) {
    console.error("랜덤 뉴스 가져오기 실패:", error);
    return [];
  }
};

export const fetchShortDocs = async (
  keywords: string,
  language: string = "ko"
): Promise<NewsItem[]> => {
  try {
    const url = new URL("https://newsdata.io/api/1/latest");
    url.searchParams.append("apikey", API_CONFIG.NEWSDATA_API_KEY);
    url.searchParams.append("q", keywords);
    url.searchParams.append("language", language);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      next: {
        revalidate: 300, // 5분마다 재검증
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: NewsResponse = await response.json();

    const results =
      data.results?.filter((news) => news?.image_url?.trim()) || [];
    return results;
  } catch (error) {
    console.error("짧은 문서 가져오기 실패:", error);
    return [];
  }
};
