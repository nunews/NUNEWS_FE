import CommunityPostDetail from "@/components/community/CommunityPostDetail";
import Header from "@/components/layout/header";

export default function page() {
  return (
    <>
      <Header logo={false} />
      <CommunityPostDetail />
    </>
  );
}
