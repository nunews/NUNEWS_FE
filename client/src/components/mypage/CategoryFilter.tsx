import { TextButton } from '../ui/TextButton';
import { allCategoryMap } from '@/lib/categoryUUID';

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilter = ({
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) => {
  const uniqueCategories = allCategoryMap
    .filter(
      (category, index, self) =>
        self.findIndex((c) => c.label === category.label) === index
    )
    .map((category) => ({
      ...category,
      id: category.label,
    }));

  return (
    <div className='flex space-x-2 overflow-x-auto pb-2 no-scrollbar'>
      {uniqueCategories.map((category) => {
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
