"use client";
import Image from "next/image";
import Logo from "../../assets/images/NUNEW.png";
import LogoBlack from "../../assets/images/NUNEWblack.png";
import LogoDark from "../../assets/images/NUNEWDark.png";
import Culture from "../../assets/images/culture.png";
import Economy from "../../assets/images/economy.png";
import Entertainment from "../../assets/images/entertainment.png";
import Etc from "../../assets/images/etc.png";
import Fire from "../../assets/images/fire.png";
import Politics from "../../assets/images/politics.png";
import Society from "../../assets/images/society.png";
import Sports from "../../assets/images/sports.png";

import { useState } from "react";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { BiChevronLeft } from "react-icons/bi";
export default function Header({
  logo,
  nuPick,
  dark,
}: {
  logo: boolean;
  nuPick: boolean;
  dark: boolean;
}) {
  const [isEdit, setIsEdit] = useState(false);
  return (
    <>
      <div className="fixed z-20 min-h-15.5 w-full px-5 border border-white">
        <div className="flex items-center h-15.5 justify-between ">
          {/* 로고유무 */}
          {logo ? (
            <Image
              src={nuPick ? Logo : dark ? LogoDark : LogoBlack}
              alt="logo"
              width={68}
              height={25}
            />
          ) : (
            <div className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#ffffff]/15 cursor-pointer">
              <BiChevronLeft className="w-6 h-6" />
            </div>
          )}

          {/* 관심사 수정 or 다크모드 */}
          {nuPick ? (
            <button className="flex items-center justify-center w-22 h-8 rounded-[50px] bg-[#ffffff]/10 hover:bg-[#ffffff]/15 text-white text-[14px] cursor-pointer">
              {isEdit ? "관심사 수정" : "관심사 추가"}
            </button>
          ) : (
            <button
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[#ffffff]/15 text-white text-[14px] cursor-pointer"
              style={{ backgroundColor: "var(--color-gray-10)" }}
            >
              {dark && (
                <IoSunnyOutline className="text-gray-900 w-5 h-5 flex items-center justify-center" />
              )}
              {!dark && (
                <IoMoonOutline className="text-gray-900 w-5 h-5 flex items-center justify-center" />
              )}
            </button>
          )}
        </div>
        {nuPick &&
          (!isEdit ? (
            <div className="bubble w-full ">
              <p className="flex justify-center items-center text-[14px] text-[#ffffff]">
                관심사를 선택하고 관심있는 뉴스만보세요!
              </p>
            </div>
          ) : (
            <div className="flex w-full h-9 gap-2">
              <div className="flex items-center justify-center w-9 h-9 bg-[#ffffff]/10 rounded-full">
                <Image src={Sports} alt="sports" width={24} height={24} />
              </div>
              <div className="flex items-center justify-center w-9 h-9 bg-[#ffffff]/10 rounded-full">
                <Image src={Politics} alt="politics" width={24} height={24} />
              </div>
              <div className="flex items-center justify-center w-9 h-9 bg-[#ffffff]/10 rounded-full">
                <Image src={Fire} alt="fire" width={24} height={24} />
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
