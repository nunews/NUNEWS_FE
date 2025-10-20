import Home from "@/components/home/Home";
import { loadNewsData } from "@/lib/actions/newsActions";

export default async function HomePage() {
  const initialNews = await loadNewsData();

  return <Home initialNews={initialNews} />;
}
