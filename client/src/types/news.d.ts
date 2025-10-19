// 뉴스 데이터 타입 정의
interface NewsData {
  article_id?: string;
  category: string;
  content?: string;
  description: string;
  image_url?: string;
  language: string;
  link: string;
  pubDate: string;
  source_name: string;
  source_url: string;
  title: string;
  likes?: number;
  views?: number;
}

interface SupabaseNewsData {
  news_id: string;
  category_id: string;
  title: string;
  content: string;
  source: string;
  published_at: string;
  url: string;
  view_count: number;
  created_at: string;
}
