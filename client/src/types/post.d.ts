export type Category = {
  title: string;
};

export type Post = {
  post_id: string;
  user_id: string;
  category_id: string;
  title: string;
  contents: string;
  content_image: string;
  created_at: string;
  Category?: Category | null;
  view_count: number;
  like_count?: number;
  User?: {
    nickname: string;
    profile_image: string;
  } | null;
};

export interface MyPostsContentProps {
  onPostCountChange?: (count: number) => void;
}
