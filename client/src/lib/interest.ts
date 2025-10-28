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

export const Category: Record<string, string> = {
  정치: "6cb26f12-f252-4dc5-84e1-ca6508c9be92",
  경제: "2f5526ca-a4b5-4528-a6ca-4ac77760ad6a",
  연예: "63bbfd28-d719-40a3-9e4e-a6a35d18a488",
  스포츠: "6136d802-9c55-4448-a8e8-0dbc9c8d80d4",
  사회: "618130f2-41dd-4c08-8e93-160d915b7fae",
  문화: "64b6f453-629b-4028-a264-4c49d4aa8391",
  해외: "24974ecd-6171-484a-a4ed-e1ee023a1d32",
  기타: "7108b7f8-40b8-4ad0-bb3a-643cea8e807d",
};
export const CategoryInv: Record<string, string> = {
  "6cb26f12-f252-4dc5-84e1-ca6508c9be92": "정치",
  "2f5526ca-a4b5-4528-a6ca-4ac77760ad6a": "경제",
  "63bbfd28-d719-40a3-9e4e-a6a35d18a488": "연예",
  "6136d802-9c55-4448-a8e8-0dbc9c8d80d4": "스포츠",
  "618130f2-41dd-4c08-8e93-160d915b7fae": "사회",
  "64b6f453-629b-4028-a264-4c49d4aa8391": "문화",
  "24974ecd-6171-484a-a4ed-e1ee023a1d32": "해외",
  "7108b7f8-40b8-4ad0-bb3a-643cea8e807d": "기타",
};
