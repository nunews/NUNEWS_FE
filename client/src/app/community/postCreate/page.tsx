import CreatePost from "@/components/community/CreatePost";
import Header from "@/components/layout/header";

export default function page() {
  return (
    <>
      <Header logo={false} />
      <CreatePost />
    </>
  );
}
