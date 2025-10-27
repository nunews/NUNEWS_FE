import politicsIcon from '@/assets/images/politics.png';
import sportsIcon from '@/assets/images/sports.png';
import entertainmentIcon from '@/assets/images/entertainment.png';
import cultureIcon from '@/assets/images/culture.png';
import worldIcon from '@/assets/images/global.png';
import societyIcon from '@/assets/images/society.png';
import economyIcon from '@/assets/images/economy.png';
import etcIcon from '@/assets/images/etc.png';

export const allCategoryMap = [
  { num: 0, id: 'all', label: '전체' },
  { num: 1, id: 'politics', label: '정치', icon: politicsIcon },
  { num: 2, id: 'sports', label: '스포츠', icon: sportsIcon },
  { num: 3, id: 'entertainment', label: '연예', icon: entertainmentIcon },
  { num: 3, id: 'entertain', label: '연예', icon: entertainmentIcon },
  { num: 4, id: 'culture', label: '문화', icon: cultureIcon },
  { num: 5, id: 'world', label: '해외', icon: worldIcon },
  { num: 6, id: 'society', label: '사회', icon: societyIcon },
  { num: 6, id: 'top', label: '사회', icon: societyIcon },
  { num: 7, id: 'economy', label: '경제', icon: economyIcon },
  { num: 7, id: 'business', label: '경제', icon: economyIcon },
  { num: 8, id: 'etc', label: '그 외', icon: etcIcon },
  { num: 8, id: 'other', label: '그 외', icon: etcIcon },
  { num: 8, id: 'lifestyle', label: '그 외', icon: etcIcon },
];

export const categoryNameMap = {
  politics: '정치',
  sports: '스포츠',
  entertainment: '연예',
  entertain: '연예',
  culture: '문화',
  world: '해외',
  society: '사회',
  top: '사회',
  economy: '경제',
  business: '경제',
  technology: '기술',
  other: '그 외',
  etc: '그 외',
};

export const categoryIdMap = {
  해외: '24974ecd-6171-484a-a4ed-e1ee023a1d32', // 해외
  경제: '2f5526ca-a4b5-4528-a6ca-4cac77760ad6a', // 경제
  스포츠: '6136d802-9c55-4448-a8e8-0dbc9c8d80d4', // 스포츠
  사회: '618130f2-41dd-4c08-8e93-160d915b7fae', // 사회
  연예: '63bbfd28-d719-40a3-9e4e-a6a35d18a488', // 연예
  문화: '64b6f453-629b-4028-a264-4c49d4aa8391', // 문화
  정치: '6cb26f12-f252-4dc5-84e1-ca6508c9be92', // 정치
  그외: '7108b7f8-40b8-4ad0-bb3a-643cea8e807d', // 그 외
};
