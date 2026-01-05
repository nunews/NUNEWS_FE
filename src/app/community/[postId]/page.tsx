"use client";
import CommunityPostDetail from "@/components/community/CommunityPostDetail";
import Header from "@/components/layout/header";

export default function CommunityDetailPage() {
  return (
    <>
      <Header logo={false} />
      <CommunityPostDetail />
    </>
  );
}
