import Home from "@/components/home/Home";
import { getSupabaseRandomNews } from "@/lib/api/getNewstoSupabase";

export default async function HomePage() {
  const initialNews = await getSupabaseRandomNews();

  return <Home initialNews={initialNews} />;
}
