"use client";
import { useState } from "react";
import SelectComponent from "../ui/SelectComponent";
import Input from "../ui/Input";
import { SlPicture } from "react-icons/sl";
import Textarea from "../ui/Textarea";
import { TextButton } from "../ui/TextButton";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const [select, setSelect] = useState("정치/경제");
  const router = useRouter();
  return (
    <>
      <div className="pt-[62px] min-h-screen w-full pb-[90px] px-5">
        {/* <p className="text-[#595959] text-[13px]">카테고리 선택</p> */}
        <SelectComponent
          options={[
            { label: "정치 / 경제", value: "정치 / 경제" },
            { label: "연예 / 스포츠", value: "연예 / 스포츠" },
            { label: "사회 / 문화", value: "사회 / 문화" },
            { label: "해외 / 기타", value: "해외 / 기타" },
          ]}
          placeholder="카테고리를 선택해 주세요"
          onChange={(value) => setSelect(value)}
          label="카테고리 선택"
        />
        <p className="mt-5 text-[var(--color-gray-80)] text-[13px]">제목</p>
        <Input
          className="mt-2 w-full h-[50px] rounded-[12px] text-[var(--color-gray-50)] text-sm"
          placeholder="제목을 입력해 주세요"
        />

        <p className="mt-5 text-[var(--color-gray-80)] text-[13px]">
          대표 이미지
        </p>
        <button className="flex flex-col items-center justify-center mt-2 w-full h-[197px] rounded-[12px] border bg-[var(--color-gray-10)] border-[var(--color-gray-30)] hover:bg-[var(--color-gray-20)] hover:border-[var(--color-gray-50)] transition-all duration-300 ease-in-out cursor-pointer">
          <SlPicture className="w-5 h-5 text-[var(--color-gray-80)]" />
          <p className="mt-[6px] text-[var(--color-gray-80)] text-sm">
            눌러서 이미지 업로드
          </p>
        </button>

        <p className="mt-5 text-[var(--color-gray-80)] text-[13px]">
          내용 작성
        </p>
        <Textarea className="mt-2 w-full min-h-[137px] rounded-[12px] text-[var(--color-gray-50)] text-sm" />
      </div>

      <div className="max-w-screen-lg mx-auto fixed bottom-0 left-0 right-0 px-5 w-full h-[90px] flex items-center justify-center gap-[10px] bg-[var(--color-white)]">
        <TextButton
          state="default"
          className="rounded-full h-[50px]"
          onClick={() => router.back()}
        >
          취소
        </TextButton>
        <TextButton state="active" className="rounded-full h-[50px]">
          업로드
        </TextButton>
      </div>
    </>
  );
}
