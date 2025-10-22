export type Category = {
  title: string;
  category_id: string;
};

export type News = {
  news_id: string;
  title: string;
  content: string;
  source: string;
  published_at: string;
  url: string;
  view_count: number;
  like_count: number;
  image_url: string;
  Category?: Category;
};

export type UserScrapItem = {
  created_at: string;
  News: News;
};

export type SupabaseUserScrapResponse = {
  created_at: string;
  News?: News[];
};

export interface ScrappedNewsContentProps {
  onScrapCountChange?: (count: number) => void;
}
