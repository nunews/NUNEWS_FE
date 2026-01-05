type Category = {
  title: string;
  category_id: string;
};

type News = {
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

type UserScrapItem = {
  created_at: string;
  News: News;
};

type SupabaseUserScrapResponse = {
  created_at: string;
  News?: News[];
};

interface ScrappedNewsContentProps {
  onScrapCountChange?: (count: number) => void;
}
