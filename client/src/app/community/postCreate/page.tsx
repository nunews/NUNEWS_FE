"use client";
import CreatePost from "@/components/community/CreatePost";
import Header from "@/components/layout/header";

export default function PostCreatePage() {
  return (
    <>
      <Header logo={false} />
      <CreatePost />
    </>
  );
}
