import CommunityList from "@/components/community/CommunityList";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

export default async function page() {
  return (
    <>
      <Header logo={true} page="community" />
      <CommunityList />
      <Footer />
    </>
  );
}
