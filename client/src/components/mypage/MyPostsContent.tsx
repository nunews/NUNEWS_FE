// MyPostsContent.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import createClient from "@/utils/supabase/client";
import { MyPostItem } from "./MyPostItem";
import { timeAgo } from "@/utils/timeAgo";

export const MyPostsContent = ({ onPostCountChange }: MyPostsContentProps) => {
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const supabase = createClient();

  const fetchUser = useCallback(async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) setUserId(user.id);
  }, [supabase]);

  const fetchPosts = useCallback(async () => {
    if (!userId) return;

    const { data, error } = await supabase
      .from("Post")
      .select(
        `
        post_id,
        user_id,
        category_id,
        title,
        contents,
        content_image,
        created_at,
        PostCategory:category_id (title),
        view_count,
        like_count
      `
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching posts:", error);
      setPosts([]);
      return;
    }

    const formattedPosts: MyPost[] = (data || []).map((p) => ({
      ...p,
      PostCategory: Array.isArray(p.PostCategory)
        ? p.PostCategory[0]
        : p.PostCategory || { title: "" },
    }));

    setPosts(formattedPosts);
  }, [userId, supabase]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  useEffect(() => {
    if (posts.length > 0 || posts.length === 0) {
      onPostCountChange?.(posts.length);
    }
  }, [posts, onPostCountChange]);

  return (
    <div className='flex flex-col space-y-4 px-5'>
      {posts.length > 0 ? (
        posts.map((post) => (
          <MyPostItem
            key={post.post_id}
            id={post.post_id}
            title={post.title}
            content={post.contents}
            category={post.Category?.title || ""}
            timeAgo={timeAgo(post.created_at)}
            likes={post.like_count ?? 0}
            views={post.view_count ?? 0}
            image={post.content_image || "/images/default_nunew.svg"}
          />
        ))
      ) : (
        <p className='text-center text-gray-500 mt-4'>작성한 글이 없습니다.</p>
      )}
    </div>
  );
};
