"use client";
import CommunityList from "@/components/community/CommunityList";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function CommunityPage() {
  return (
    <>
      <Header logo={true} page="community" />
      <CommunityList />
      <Footer />
    </>
  );
}
