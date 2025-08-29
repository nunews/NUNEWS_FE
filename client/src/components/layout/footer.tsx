"use client";
import { useState } from "react";
import { PiListStar } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { TbMessageChatbot } from "react-icons/tb";
import { VscBook } from "react-icons/vsc";

export default function Footer({ isNuPick }: { isNuPick: boolean }) {
  const channel = [
    { icon: PiListStar, label: "맞춤소식" },
    { icon: VscBook, label: "모든소식" },
    { icon: TbMessageChatbot, label: "의견 나누기" },
    { icon: RxPerson, label: "내 정보" },
  ];

  //선택 채널의 인덱스로 저장
  const [select, setSelect] = useState(0);
  const selectHandler = (index: number) => {
    setSelect(index);
  };
  return (
    <>
      <div
        className={`fixed bottom-0 w-full h-18 flex items-center rounded-t-2xl  ${
          isNuPick
            ? "bg-[#121212] shadow-[inset_0_0_0_1px_#181818]"
            : "bg-[#ffffff] shadow-[inset_0_0_0_1px_#ebebeb]"
        }`}
      >
        {channel.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center flex-1 cursor-pointer transition duration-200 ease-in-out ${
              isNuPick
                ? select === index
                  ? "text-[#ffffff]"
                  : "text-[#595959]"
                : select === index
                ? "text-[#2f2f2f]"
                : "text-[#bfbfbf]"
            }`}
            onClick={() => selectHandler(index)}
          >
            <item.icon className="w-5 h-5" />
            <p className="mt-[6px] text-[10px]">{item.label}</p>
          </button>
        ))}
      </div>
    </>
  );
}
