import Input from "../ui/Input";
import SelectComponent from "../ui/SelectComponent";
import Textarea from "../ui/Textarea";

export default function Home() {
  const options = [
    { label: "10대", value: "10대" },
    { label: "20대", value: "20대" },
    { label: "30대", value: "30대" },
    { label: "40대 이상", value: "40대 이상" },
  ];
  return (
    <>
      <h1>Home Component</h1>
      <div className="flex flex-col gap-10 mx-5">
        <Input
          placeholder="닉네임을 입력해주세요"
          maxLength={10}
          className="h-12.5 rounded-[12px] placeholder:text-[var(--color-gray-50)] placeholder:text-sm text-sm"
          rightSlot={
            <button type="button" className="cursor-pointer">
              랜덤다이스
            </button>
          }
        />
        <Input
          placeholder="댓글을 입력하세요"
          maxLength={50}
          className="min-h-12.5 h-auto rounded-full placeholder:text-[var(--color-gray-50)] placeholder:text-sm text-sm pr-12"
          rightSlot={
            <button type="button" className="cursor-pointer">
              전송
            </button>
          }
        />
        <SelectComponent
          label="연령"
          placeholder="연령을 선택해주세요"
          options={options}
          className="data-[placeholder]:text-[var(--color-gray-50)]"
        />
        <Textarea className="h-33 placeholder:text-[var(--color-gray-50)] placeholder:text-sm rounded-[12px] text-sm text-[var(--color-gray-100)]" />
        <Input
          placeholder="비밀번호를 입력하세요"
          maxLength={50}
          className="min-h-12.5 h-auto rounded-[12px] placeholder:text-[var(--color-gray-50)] placeholder:text-sm text-sm pr-12"
          rightSlot={
            <button type="button" className="cursor-pointer">
              확인
            </button>
          }
        />
      </div>
    </>
  );
}
