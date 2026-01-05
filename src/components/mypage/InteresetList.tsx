import { INTERESTS_DATA } from "@/lib/interest";
import InterestItem from "./InterestItem";
import { toast } from "sonner";

interface InterestListProps {
  selectedInterests: string[];
  setSelectedInterests: React.Dispatch<React.SetStateAction<string[]>>;
}

export const InterestList = ({
  selectedInterests,
  setSelectedInterests,
}: InterestListProps) => {
  const MAX_SELECTIONS = 3;

  const handleInterestClick = (title: string) => {
    setSelectedInterests((preveSelected) => {
      if (preveSelected.includes(title)) {
        //이미 선택된 항목 선택 해제
        return preveSelected.filter((item) => item !== title);
      }
      //최대 이상 선택
      if (preveSelected.length >= MAX_SELECTIONS) {
        toast(`관심사는 최대 ${MAX_SELECTIONS}개 선택할 수 있습니다.`);
        return preveSelected;
      }

      return [...preveSelected, title];
    });
  };
  return (
    <div className='w-full mx-auto'>
      <h1 className='text-[#191919]] py-5 text-[22px] font-bold dark:text-[var(--color-white)]'>
        관심사 수정
      </h1>
      <div className='grid grid-cols-3 gap-2.5 place-items-center'>
        {INTERESTS_DATA.map((interest) => (
          <InterestItem
            key={interest.title}
            title={interest.title}
            imageSrc={interest.imageSrc}
            subtitle={interest.subtitle}
            isActive={selectedInterests.includes(interest.title)}
            onClick={() => handleInterestClick(interest.title)}
          />
        ))}
      </div>
    </div>
  );
};
