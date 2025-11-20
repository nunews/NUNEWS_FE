import Home from "@/components/home/Home";
import { loadNewsData } from "@/lib/actions/loadNewsData";

export const revalidate = 3;

export default async function HomePage() {
  await loadNewsData();

  return <Home />;
}
