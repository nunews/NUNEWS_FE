"use client";
import Image from "next/image";
import defaultImg from "../../assets/images/default_profile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useRef, useState } from "react";
import CommunityPost from "./CommunityPost";
import { Plus, X } from "lucide-react";
import Dropdown from "../ui/Dropdown";
import { PiPencilSimple } from "react-icons/pi";
import { VscListSelection } from "react-icons/vsc";
import { IconButton } from "../ui/IconButton";
import { useRouter } from "next/navigation";

export default function Community() {
  const categories = [
    "전체",
    "정치/경제",
    "연예/스포츠",
    "사회/문화",
    "해외/기타",
  ];
  const [selected, setSelected] = useState("전체");
  const [add, setAdd] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();
  const goToCreate = () => {
    setAdd(false);
    router.push("/community/postCreate");
  };
  const goToMypage = () => {
    router.push("/mypage");
  };

  return (
    <>
      <div className="min-h-screen w-full pt-[62px] pb-[72px]">
        {/* 사용자 프로필 */}
        <button
          onClick={goToMypage}
          className="mt-4 px-5 flex items-center h-[72px]"
        >
          <div className="w-18 h-18 bg-[#f6f6f6] rounded-full flex items-center justify-center">
            <Image src={defaultImg} alt="defaultImg" width={36} height={36} />
          </div>
          <div className="flex flex-col pl-[14px]">
            <p className="text-[var(--color-gray-100)] font-bold text-lg">
              독재자 강아지
            </p>
            <p className="text-[var(--color-gray-70)] text-[13px]">
              스포츠, 정치, 문화
            </p>
          </div>
        </button>

        {/* 채널 */}
        <div className="flex items-center w-full mt-[22px] h-[54px] border-b border-[#ebebeb] overflow-hidden">
          <Swiper spaceBetween={16} slidesPerView="auto">
            {categories.map((category) => (
              <SwiperSlide
                key={category}
                style={{ width: "auto" }}
                className=" inline-flex items-center"
              >
                <div
                  onClick={() => {
                    setSelected(category);
                  }}
                  className={`tabChoose h-[54px] px-4 cursor-pointer flex items-center font-semibold ${
                    selected === category
                      ? "tabChoose-active text-[var(--color-gray-100)] border-b-2 border-[var(--color-gray-100)]"
                      : "text-[var(--color-gray-60)]"
                  }`}
                >
                  <h5>{category}</h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 게시글 목록 */}
        <div className="flex flex-col items-center px-5">
          <CommunityPost />
          <CommunityPost />
          <CommunityPost />
          <CommunityPost />
        </div>

        {/* 새 글 추가 */}
        <IconButton
          ref={buttonRef}
          icon={Plus}
          onClick={(e) => {
            e.stopPropagation();
            setAdd((prev) => !prev);
          }}
          className={`fixed z-50 bottom-22 right-5 w-13 h-13 shadow-[2px_6px_12px_0_rgba(0,0,0,0.24)]
    transition-transform duration-300 ${
      add
        ? "rotate-45 bg-[var(--color-white)] hover:bg-[var(--color-gray-10)]"
        : "rotate-0 bg-[var(--color-black)] hover:bg-[var(--color-gray-100)]"
    }`}
          size={24}
          color={add ? "var(--color-black)" : "#bff207"}
        />

        {add && (
          <div
            className="fixed inset-0 bg-[#191919]/50 z-30"
            onClick={(e) => {
              e.stopPropagation();
              if (e.target === e.currentTarget) {
                setAdd(false);
              }
            }}
          >
            <div className="absolute z-30 bottom-[152px] right-5 duration-300">
              <Dropdown
                isOpen={add}
                onClose={() => {
                  setAdd(false);
                }}
                triggerRef={buttonRef}
                items={[
                  {
                    icon: <PiPencilSimple />,
                    label: "새 글 작성",
                    onClick: goToCreate,
                  },
                  {
                    icon: <VscListSelection />,
                    label: "내가 작성한 글",
                    onClick: () => setAdd(false),
                  },
                ]}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
