import { TextButton } from "../ui/TextButton";

interface CategoryFilterProps {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

const CategoryFilter = ({
  activeCategory,
  setActiveCategory,
}: CategoryFilterProps) => {
  const categories = [
    { id: "all", label: "전체" },
    { id: "politics", label: "정치" },
    { id: "economy", label: "경제" },
    { id: "society", label: "사회" },
    { id: "culture", label: "문화" },
    { id: "sports", label: "스포츠" },
  ];

  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 no-scrollbar">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <TextButton
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            state={isActive ? "category-active" : "category-default"}
          >
            {category.label}
          </TextButton>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
