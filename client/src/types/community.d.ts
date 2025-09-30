interface Post {
  post_id: number;
  user_id: number;
  category_id: number;
  title: string;
  contents: string;
  content_image: string;
  created_at: string;
}

interface Comment {
  comment_id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
}

interface Like {
  like_id: number;
  user_id: number;
  post_id: number;
  comment_id: number;
  news_id?: number;
  created_at: string;
}
