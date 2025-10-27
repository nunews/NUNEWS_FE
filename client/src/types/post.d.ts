type PostCategory = {
  title: string;
};

type Post = {
  post_id: string;
  user_id: string;
  category_id: string;
  title: string;
  contents: string;
  content_image: string;
  created_at: string;
  Category?: Category | null;
};

interface MyPostsContentProps {
  onPostCountChange?: (count: number) => void;
}
