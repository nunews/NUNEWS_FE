import Home from "@/components/home/Home";
import { loadNewsData } from "@/lib/actions/loadNewsData";

export default async function HomePage() {
  await loadNewsData();

  return <Home />;
}
