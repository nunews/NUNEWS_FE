import politics from "@/assets/images/politics.png";
import entertainment from "@/assets/images/entertainment.png";
import sports from "@/assets/images/sports.png";
import economy from "@/assets/images/economy.png";
import society from "@/assets/images/society.png";
import culture from "@/assets/images/culture.png";
import global from "@/assets/images/global.png";
import etc from "@/assets/images/etc.png";

// 카테고리 아이콘 매핑
export const getCategoryIcon = (category: string) => {
  const categoryMap: { [key: string]: any } = {
    politics: politics,
    entertainment: entertainment,
    sports: sports,
    business: economy,
    economy: economy,
    society: society,
    culture: culture,
    world: global,
    global: global,
    default: etc,
  };

  const lowerCategory = category.toLowerCase();
  return categoryMap[lowerCategory] || categoryMap.default;
};

// 카테고리 한글 변환
export const getCategoryKorean = (category: string) => {
  const categoryMap: { [key: string]: string } = {
    politics: "정치",
    entertainment: "연예",
    sports: "스포츠",
    business: "경제",
    economy: "경제",
    society: "사회",
    culture: "문화",
    world: "해외",
    global: "해외",
  };

  return categoryMap[category.toLowerCase()] || "기타";
};

// 한글 카테고리를 영어로 변환 (역변환)
export const getCategoryEnglish = (koreanCategory: string) => {
  const categoryMap: { [key: string]: string } = {
    정치: "politics",
    연예: "entertainment",
    스포츠: "sports",
    경제: "economy",
    사회: "society",
    문화: "culture",
    국제: "world",
    기술: "technology",
    건강: "health",
    과학: "science",
  };

  return categoryMap[koreanCategory] || "etc";
};

// 모든 카테고리 목록
export const ALL_CATEGORIES = [
  { korean: "정치", english: "politics" },
  { korean: "연예", english: "entertainment" },
  { korean: "스포츠", english: "sports" },
  { korean: "경제", english: "economy" },
  { korean: "사회", english: "society" },
  { korean: "문화", english: "culture" },
  { korean: "해외", english: "world" },
];
