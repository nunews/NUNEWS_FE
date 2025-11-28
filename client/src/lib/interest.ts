import politicsImage from "@/assets/images/politics.png";
import sportsImage from "@/assets/images/sports.png";
import entertainmentImage from "@/assets/images/entertainment.png";
import cultureImage from "@/assets/images/culture.png";
import globalImage from "@/assets/images/global.png";
import societyImage from "@/assets/images/society.png";
import economyImage from "@/assets/images/economy.png";
import etcImage from "@/assets/images/etc.png";

export const INTERESTS_DATA = [
  { imageSrc: politicsImage, title: "정치", subtitle: "politics" },
  { imageSrc: sportsImage, title: "스포츠", subtitle: "sports" },
  { imageSrc: entertainmentImage, title: "연예", subtitle: "entertain" },
  { imageSrc: cultureImage, title: "문화", subtitle: "culture" },
  { imageSrc: globalImage, title: "해외", subtitle: "aboard" },
  { imageSrc: societyImage, title: "사회", subtitle: "society" },
  { imageSrc: economyImage, title: "경제", subtitle: ["economy", "business"] },
  { imageSrc: etcImage, title: "기타", subtitle: "etc" },
];

export type Interest = (typeof INTERESTS_DATA)[number];
