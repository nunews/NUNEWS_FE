"use client";
import Image from "next/image";
import defaultImg from "../../assets/images/default_profile.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
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
  const router = useRouter();
  const goToCreate = () => {
    setAdd(false);
    router.push("/community/postCreate");
  };
  return (
    <>
      <div className="min-h-screen w-full mb-[72px]">
        {/* 사용자 프로필 */}
        <div className="mt-4 px-5 flex items-center h-[72px]">
          <Image src={defaultImg} alt="defaultImg" width={72} height={72} />
          <div className="flex flex-col pl-[14px]">
            <p className="text-[#2f2f2f] font-bold text-lg">독재자 강아지</p>
            <p className="text-[#727272] text-[13px]">스포츠, 정치, 문화</p>
          </div>
        </div>

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
                      ? "tabChoose-active text-[#2f2f2f] border-b-2 border-[#2f2f2f]"
                      : "text-[#979797]"
                  }`}
                >
                  <h5>{category}</h5>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 게시글 목록 */}
        <div className="flex flex-col items-center">
          <CommunityPost />
          <CommunityPost />
          <CommunityPost />
          <CommunityPost />
        </div>

        {/* 새 글 추가 */}
        {add === false ? (
          <IconButton
            icon={Plus}
            onClick={() => setAdd(true)}
            className="fixed z-30 bottom-22 right-5 w-13 h-13 bg-black shadow-[2px_6px_12px_0_rgba(0,0,0,0.24)]"
            size={24}
            color="#bff207"
          />
        ) : (
          <>
            <div
              className="fixed inset-0 bg-[#191919]/50 z-20"
              onClick={() => setAdd(false)}
            />
            <div className="fixed z-30 bottom-[152px] right-5">
              <Dropdown
                isOpen={add}
                onClose={() => setAdd(false)}
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
            <IconButton
              icon={X}
              onClick={() => setAdd(false)}
              className="fixed z-30 bottom-22 right-5 w-13 h-13 rounded-full bg-white shadow-[2px_6px_12px_0_rgba(0,0,0,0.24)] flex items-center justify-center cursor-pointer"
              size={24}
              color="#2f2f2f"
            />
          </>
        )}
      </div>
    </>
  );
}
