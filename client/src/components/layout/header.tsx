/**
 *
 *  @param logo - logo여부 (로고가 없는경우 뒤로가기 버튼과 다크모드 버튼이 나타남)
 *  @param page - "nuPick" 또는 "login" 으로 설정 가능(나머지 페이지는 page props 작성 생략)
 *  @param interest - 관심사 설정 여부(누픽 페이지에서만 적용됨)
 *  @param dark - 다크모드인지 아닌지 (로고 색상이 결정됨)
 */

"use client";
import Image, { StaticImageData } from "next/image";
import Logo from "../../assets/images/NUNEW.png";
import LogoBlack from "../../assets/images/NUNEWblack.png";
import LogoDark from "../../assets/images/NUNEWDark.png";

import Politics from "../../assets/images/politics.png";
import Sports from "../../assets/images/sports.png";
import Entertainment from "../../assets/images/entertainment.png";
import Culture from "../../assets/images/culture.png";
import Global from "../../assets/images/global.png";
import Society from "../../assets/images/society.png";
import Economy from "../../assets/images/economy.png";
import Etc from "../../assets/images/etc.png";

import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { BiChevronLeft } from "react-icons/bi";
import { useRouter } from "next/navigation";
export default function Header({
  logo,
  page,
  interest,
  dark,
}: {
  logo: boolean;
  page?: string;
  interest?: string[];
  dark?: boolean;
}) {
  // console.log(interest);
  const categoryMap: Record<string, StaticImageData> = {
    정치: Politics,
    스포츠: Sports,
    연예: Entertainment,
    문화: Culture,
    해외: Global,
    사회: Society,
    경제: Economy,
    "그 외": Etc,
  };

  const router = useRouter();
  return (
    <>
      <div
        className={`fixed z-20 min-h-15.5 w-full px-5 ${
          page === "nuPick"
            ? ""
            : "bg-[var(--color-white)]/85 backdrop-blur-[28px] "
        }`}
      >
        <div className="flex items-center h-15.5 justify-between ">
          {/* 로고유무 */}
          {logo ? (
            <Image
              src={page === "nuPick" ? Logo : dark ? LogoDark : LogoBlack}
              alt="logo"
              width={68}
              height={25}
              onClick={() => router.push("/")}
              className="cursor-pointer"
            />
          ) : page === "login" ? (
            <div />
          ) : (
            <button
              onClick={() => router.back()}
              className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[var(--color-gray-10)] transition-all duration-300 ease-in-out cursor-pointer"
            >
              <BiChevronLeft className="w-6 h-6" />
            </button>
          )}

          {/* 관심사 수정 or 모드전환 */}
          {page === "nuPick" ? (
            <button className="flex items-center justify-center w-22 h-8 rounded-[50px] bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/15 backdrop-blur-lg text-[var(--color-white)] text-sm transition-all duration-300 ease-in-out cursor-pointer">
              {!!interest ? "관심사 수정" : "관심사 추가"}
            </button>
          ) : (
            <button
              className={`flex items-center justify-center w-9 h-9 rounded-full text-sm transition-all duration-300 ease-in-out cursor-pointer ${
                dark
                  ? "bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-90)] "
                  : "bg-[var(--color-gray-10)] hover:bg-[var(--color-gray-20)]"
              }`}
            >
              {dark && (
                <IoMoonOutline className="text-[var(--color-white)] w-5 h-5 flex items-center justify-center" />
              )}
              {!dark && (
                <IoSunnyOutline className="text-[var(--color-gray-100)] w-5 h-5 flex items-center justify-center" />
              )}
            </button>
          )}
        </div>
        {page === "nuPick" &&
          (!interest || interest.length === 0 ? (
            <div className="bubble w-full">
              <p className="flex justify-center items-center text-sm text-[var(--color-white)]">
                관심사를 선택하고 관심있는 뉴스만 보세요!
              </p>
            </div>
          ) : (
            <div className="flex w-full h-9 gap-2">
              {interest.map((category, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center w-9 h-9 bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/15 backdrop-blur-lg rounded-full transition-all duration-300 ease-in-out cursor-pointer"
                >
                  <Image
                    src={categoryMap[category]}
                    alt="sports"
                    width={24}
                    height={24}
                  />
                </div>
              ))}
            </div>
          ))}
      </div>
    </>
  );
}
