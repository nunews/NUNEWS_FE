import Input from "@/components/ui/Input";
import SelectComponent from "@/components/ui/SelectComponent";
import { TextButton } from "@/components/ui/TextButton";
import { LuDices } from "react-icons/lu";
import { IoFemaleOutline } from "react-icons/io5";
import { IoMaleOutline } from "react-icons/io5";

export default function page() {
  const ageOptions = [
    { label: "10대", value: "10s" },
    { label: "20대", value: "20s" },
    { label: "30대", value: "30s" },
    { label: "40대 이상", value: "40s" },
    { label: "선택하지 않음", value: "none" },
  ];
  return (
    <div className=" relative h-screen flex flex-col px-6">
      <h1 className="text-[22px] font-bold leading-[140%] py-8">
        보민님의 정보를
        <br />
        알려주세요
      </h1>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-[var(--color-gray-80)] text-xs">닉네임</p>
          <Input
            placeholder="나의 닉네임은?"
            rightSlot={<LuDices className="text-[#757575]" />}
          />
        </div>
        <SelectComponent
          label="연령"
          options={ageOptions}
          placeholder="연령대를 선택해주세요"
        />
        <div className="flex flex-col gap-2">
          <p className="text-[var(--color-gray-80)] text-xs">성별</p>
          <div className="flex h-12.5 gap-2 text-sm">
            <TextButton
              className="text-[var(--color-gray-50)] border-1 border-[var(--color-gray-30)] bg-white hover:border-[var(--color-gray-50)]
            
            hover:text-[var(--color-gray-100)] hover:bg-white
            "
            >
              <div className="flex items-center gap-1">
                <IoMaleOutline size={18} />
                <span>남성</span>
              </div>
            </TextButton>
            <TextButton
              className="text-[var(--color-gray-50)] border-1 border-[var(--color-gray-30)] bg-white hover:border-[var(--color-gray-50)]
            
            hover:text-[var(--color-gray-100)] hover:bg-white
            "
            >
              <div className="flex items-center gap-1">
                <IoFemaleOutline size={18} />
                <span>여성</span>
              </div>
            </TextButton>
          </div>
        </div>
      </div>
      <div className="w-full absolute bottom-0 left-0 px-5 py-5  rounded-full">
        <TextButton state="disabled" className="h-12.5">
          완료
        </TextButton>
      </div>
    </div>
  );
}
