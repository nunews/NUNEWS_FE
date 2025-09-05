import Footer from "../layout/footer";
import Header from "../layout/header";
import NewsSection from "./NewsSection";
import politics from "@/assets/images/politics.png";
import entertainment from "@/assets/images/entertainment.png";
import sports from "@/assets/images/sports.png";

export default function Home() {
  const newsDummyData = [
    {
      id: 1,
      category: "연예",
      title: "마르타 구민지 강스윙에 맞은 심판 두개골 골절...모두 애도를 표해",
      description:
        "마르타 구민지가 시속 3,600km의 강속구를 던지는 와중에 날아가던 까마귀가 맞고 굴절된 공에 심판 두개골 골절되는 사고가 있었습니다. 그녀는 얼마나 갈하길래 일타이피를 하게된걸까요",
      image: "/images/handsomeLee.png",
      categoryIcon: entertainment,
    },
    {
      id: 2,
      category: "정치",
      title: "대통령, AI 기반 뉴스 요약 서비스에 깊은 관심 표명",
      description:
        "AI가 국민에게 더 정확하고 빠른 정보를 제공할 수 있는 도구가 될 것이라는 언급했다. 또한 AI에 대한 투자를 아끼지 않을 것",
      image: "/images/handsomeLee.png",
      categoryIcon: politics,
    },
    {
      id: 3,
      category: "스포츠",
      title: "AI가 분석한 다음 월드컵 유망 선수는?",
      description:
        "머신러닝 기반 알고리즘으로 추출된 다음 세대 스타 후보들이 팬들의 관심을 끌고 있다. 현재까지 추측한 선수로는 맨유의 실버웨스트 박, 맨시티의 스트롱 유 그리고 아스날의 글로리 김 선수를 꼽기도 했다.",
      image: "/images/handsomeLee.png",
      categoryIcon: sports,
    },
  ];
  return (
    <>
      <div className="h-screen scrollbar-hide">
        <Header
          logo={true}
          nuPick={true}
          dark={false}
          interest={["정치", "연예"]}
        ></Header>
        <article className="h-screen overflow-y-scroll snap-y snap-mandatory">
          {newsDummyData.map((item) => (
            <NewsSection key={item.id} className="snap-start" data={item} />
          ))}
        </article>
        <Footer isNuPick />
      </div>
    </>
  );
}
