/**
 *  @param isNuPick - 누픽 페이지인지 아닌지 여부
 */
"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { PiListStar } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { TbMessageChatbot } from "react-icons/tb";
import { VscBook } from "react-icons/vsc";

export default function Footer({ isNuPick }: { isNuPick?: boolean }) {
  const channels = [
    { icon: PiListStar, label: "누픽" },
    { icon: VscBook, label: "올픽" },
    { icon: TbMessageChatbot, label: "누누라운지" },
    { icon: RxPerson, label: "마이페이지" },
  ];

  //선택 채널의 인덱스로 저장
  const [select, setSelect] = useState(0);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/") setSelect(0);
    else if (pathname === "/allPick") setSelect(1);
    else if (pathname === "/community") setSelect(2);
    else if (pathname === "/mypage") setSelect(3);
  }, [pathname]);

  const selectHandler = (index: number) => {
    setSelect(index);
    if (index === 0) {
      router.push("/");
    } else if (index === 1) {
      router.push("/allPick");
    } else if (index === 2) {
      router.push("/community");
    } else if (index === 3) {
      router.push("/mypage");
    }
  };
  return (
    <>
      <div
        className={`fixed bottom-0 w-full h-18 flex items-center rounded-t-2xl z-20  ${
          isNuPick
            ? "bg-[#121212] shadow-[inset_0_0_0_1px_#181818]"
            : "bg-[var(--color-white)] shadow-[inset_0_0_0_1px_#ebebeb]"
        }`}
      >
        {channels.map((item, index) => (
          <button
            key={index}
            className={`flex flex-col items-center justify-center flex-1 cursor-pointer transition duration-300 ease-in-out ${
              isNuPick
                ? select === index
                  ? "text-[var(--color-white)]"
                  : "text-[var(--color-gray-80)]"
                : select === index
                ? "text-[var(--color-gray-100)]"
                : "text-[var(--color-gray-50)]"
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
