import { TextButton } from '../ui/TextButton';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilter = ({
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) => {
  const categories = [
    { id: 'all', label: '전체' },
    { id: '24974ecd-6171-484a-a4ed-e1ee023a1d32', label: '해외' },
    { id: '2f5526ca-a4b5-4528-a6ca-4ac77760ad6a', label: '경제' },
    { id: '6136d802-9c55-4448-a8e8-0dbc9c8d80d4', label: '스포츠' },
    { id: '618130f2-41dd-4c08-8e93-160d915b7fae', label: '사회' },
    { id: '63bbfd28-d719-40a3-9e4e-a6a35d18a488', label: '연예' },
    { id: '64b6f453-629b-4028-a264-4c49d4aa8391', label: '문화' },
    { id: '6cb26f12-f252-4dc5-84e1-ca6508c9be92', label: '정치' },
    { id: '7108b7f8-40b8-4ad0-bb3a-643cea8e807d', label: '그 외' },
  ];

  return (
    <div className='flex space-x-2 overflow-x-auto pb-2 no-scrollbar'>
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <TextButton
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            state={isActive ? 'category-active' : 'category-default'}
          >
            {category.label}
          </TextButton>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
