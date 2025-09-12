"use client";

import Community from "@/components/community/Community";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default function page() {
  return (
    <>
      <Header logo={true} page="community" />
      <Community />
      <Footer />
    </>
  );
}
