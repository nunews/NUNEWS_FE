/**
 *  @param logo - logo여부 (로고가 없는경우 뒤로가기 버튼과 다크모드 버튼이 나타남)
 *  @param page - "nuPick" 또는 "login" 으로 설정 가능(나머지 페이지는 page props 작성 생략)
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
import { IconButton } from "../ui/IconButton";
import { LuListFilter } from "react-icons/lu";
import Dropdown from "../ui/Dropdown";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { useSortStore } from "@/stores/communitySortStore";
import { useAuthStore } from "@/stores/authStore";
import { categoryIdInvMap } from "@/lib/categoryUUID";

export default function Header({
  logo,
  page,
}: {
  logo: boolean;
  page?: string;
}) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const userId = useAuthStore((state) => state.userId);
  const interest = useAuthStore((state) => state.interest);

  // theme mounted
  useEffect(() => {
    setMounted(true);
  }, []);

  const { sortOption, setSortOption } = useSortStore();
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
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const filterHandler = (filtered: "최신순" | "인기순") => {
    setOpen(true);
    setSortOption(filtered);
    setOpen(false);
  };

  const themeHandler = async (theme: string) => {
    if (theme === "light") {
      setTheme("light");
      await fetch("/api/theme", {
        method: "POST",
        body: JSON.stringify({ theme: "light" }),
      });
    } else {
      setTheme("dark");
      await fetch("/api/theme", {
        method: "POST",
        body: JSON.stringify({ theme: "dark" }),
      });
    }
  };
  return (
    <>
      {mounted && (
        <div
          className={` fixed top-0 left-0 right-0 z-20 min-h-15.5 w-full ${
            page === "nuPick"
              ? ""
              : theme === "dark"
              ? "bg-[#121212]/85 backdrop-blur-[28px]"
              : "bg-[var(--color-white)]/85 backdrop-blur-[28px] "
          }`}
        >
          <div className="max-w-screen-lg mx-auto flex items-center h-15.5 px-5 justify-between ">
            {/* 로고유무 */}
            {logo ? (
              <Image
                src={
                  page === "nuPick"
                    ? Logo
                    : theme === "dark"
                    ? LogoDark
                    : LogoBlack
                }
                alt="logo image"
                width={68}
                height={25}
                priority
                onClick={() => router.push("/")}
                className="cursor-pointer"
              />
            ) : page === "login" ? (
              <div />
            ) : (
              <button
                onClick={() => router.back()}
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-[var(--color-gray-10)] dark:hover:bg-[var(--color-gray-100)] transition-all duration-300 ease-in-out cursor-pointer"
              >
                <BiChevronLeft className="w-6 h-6" />
              </button>
            )}

            {/* 관심사 수정 or 모드전환 */}
            {page === "nuPick" ? (
              userId ? (
                <button
                  onClick={() => router.push("/profile/setting")}
                  className="flex items-center justify-center w-22 h-8 rounded-[50px]
        bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/15
        backdrop-blur-lg text-[var(--color-white)] text-sm
        transition-all duration-300 ease-in-out cursor-pointer"
                >
                  {interest.length > 0 ? "관심사 수정" : "관심사 추가"}
                </button>
              ) : (
                <button
                  onClick={() => router.push("/auth/login")}
                  className="flex items-center justify-center w-22 h-8 rounded-[50px]
        bg-[var(--color-primary-40)] hover:bg-[var(--color-primary-30)]
        text-black text-sm font-medium
        transition-all duration-300 ease-in-out cursor-pointer"
                >
                  로그인
                </button>
              )
            ) : (
              <div className="gap-[6px] flex items-center ">
                {page === "community" && (
                  <div className="relative inline-block">
                    <IconButton
                      ref={buttonRef}
                      icon={LuListFilter}
                      className={`rounded-full w-8 h-8 ${
                        theme === "dark"
                          ? "bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-90)]"
                          : "bg-[var(--color-gray-10)] hover:bg-[var(--color-gray-20)]"
                      }`}
                      size={18}
                      color={`${
                        theme === "dark" ? "var(--color-white)" : "#191919"
                      }`}
                      onClick={() => {
                        setOpen((prev) => !prev);
                      }}
                    />
                    {open && (
                      <div className="absolute z-30 top-[39px] right-[-6px]">
                        <Dropdown
                          isOpen={open}
                          onClose={() => setOpen(false)}
                          triggerRef={buttonRef}
                          items={[
                            {
                              label: "최신순",
                              onClick: () => filterHandler("최신순"),
                            },
                            {
                              label: "인기순",
                              onClick: () => filterHandler("인기순"),
                            },
                          ]}
                        />
                      </div>
                    )}
                  </div>
                )}
                {theme === "dark" ? (
                  <IconButton
                    icon={IoMoonOutline}
                    className="w-9 h-9 rounded-full bg-[var(--color-gray-100)] hover:bg-[var(--color-gray-90)]"
                    size={20}
                    color="#ffffff"
                    onClick={() => themeHandler("light")}
                  />
                ) : (
                  <IconButton
                    icon={IoSunnyOutline}
                    className="w-9 h-9 rounded-full bg-[var(--color-gray-10)] hover:bg-[var(--color-gray-20)]"
                    size={20}
                    color="var(--color-gray-100)"
                    onClick={() => themeHandler("dark")}
                  />
                )}
              </div>
            )}
          </div>
          <div className="max-w-screen-lg mx-auto">
            {page === "nuPick" &&
              (interest.length === 0 ? (
                <div className="bubble mx-5">
                  <p className="flex justify-center items-center text-sm text-[var(--color-white)]">
                    관심사를 선택하고 관심있는 뉴스만 보세요!
                  </p>
                </div>
              ) : (
                <div className="flex h-9 gap-2 overflow-x-auto px-5">
                  {interest.map((categoryId, index) => {
                    const label = categoryIdInvMap[categoryId];
                    const icon = categoryMap[label];

                    return (
                      <div
                        key={index}
                        className="flex items-center justify-center min-w-9 h-9
          bg-[var(--color-white)]/10 hover:bg-[var(--color-white)]/15
          backdrop-blur-lg rounded-full transition-all duration-300 ease-in-out cursor-pointer"
                      >
                        <Image src={icon} alt={label} width={24} height={24} />
                      </div>
                    );
                  })}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
