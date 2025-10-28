import CreatePost from "@/components/community/CreatePost";
import Header from "@/components/layout/header";

export default async function Page() {
  return (
    <>
      <Header logo={false} />
      <CreatePost />
    </>
  );
}
