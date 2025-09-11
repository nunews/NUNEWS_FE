"use client";
import Image from "next/image";
import profileImg from "../../assets/images/profile1.png";
import postImg from "../../assets/images/postImg.png";
import profileImg2 from "../../assets/images/profile2.png";
import { AiFillLike, AiOutlineLike, AiOutlineMore } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import Input from "../ui/Input";
import { PiPaperPlaneTiltLight, PiPencilLine } from "react-icons/pi";
import { useState } from "react";
import Dropdown from "../ui/Dropdown";
import { RiDeleteBinLine } from "react-icons/ri";
import { IconButton } from "../ui/IconButton";

export default function CommunityPostDetail() {
  const comments = [
    {
      profileImg: profileImg2,
      nickName: "공허의 코끼리",
      time: "방금전",
      comment: "님아 동족은 좀... 그렇지 않냐코 ㅠ 너무하다코 ㅠ",
    },
    {
      profileImg: profileImg,
      nickName: "역병의 산토끼",
      time: "방금전",
      comment: "님아 동족은 좀... 그렇지 않냐코 ㅠ 너무하다코 ㅠ",
    },
    {
      profileImg: profileImg2,
      nickName: "공허의 코끼리",
      time: "방금전",
      comment: "님아 동족은 좀... 그렇지 않냐코 ㅠ 너무하다코 ㅠ",
    },
  ];
  const [open, setOpen] = useState(Array(comments.length).fill(false));
  const [like, setLike] = useState(false);
  const toggleOpen = (i: number) => {
    setOpen((prev) => prev.map((v, idx) => (idx === i ? !open[i] : v)));
  };
  return (
    <>
      <div className="pt-[62px] min-h-screen w-full px-5 pb-[90px] relative">
        {/* 프로필+카테고리 */}
        <div className="mt-4 w-full flex items-center justify-between">
          <div className="flex items-center w-auto h-9">
            <Image src={profileImg} alt="profileImg" width={36} height={36} />
            <span className="ml-[10px] text-[var(--color-black)] text-base font-semibold">
              궁극의 흑소
            </span>
          </div>
          <p className="text-[var(--color-gray-100)] text-sm">#스포츠</p>
        </div>
        <div className="relative w-full aspect-[16/10] mt-6">
          <Image
            src={postImg}
            alt="postImg"
            fill
            className=" rounded-[12px] object-cover"
          />
        </div>
        <p className="mt-6 text-var(--color-black) text-[22px] font-bold">
          소고기가 최고지
        </p>
        <p className="mt-2 h-auto">
          코스닥 시장 육성방안, 기업지배구조 모범규준, 기간산업안정자금 등
          경제정책 입안 경험이 풍부해 가계·소상공인 활력 제고, 공정한 경제구조
          실현 등 이 대통령의 공약 이행을 뒷받침할 적임자라고 대통령실은
          설명했다. 강 실장은 경제정책 전반에 높은 이해력과 국제감각을 가졌다며
          코로나19 당시 위기 대응을 담당한 경험을 가진 인사로, 민생 위기 극복을
          위한 정책 집행에 적임자라고 소개했다.
        </p>

        <div className="mt-6 flex items-center text-[#b7b7b7]">
          {!like && (
            <AiOutlineLike
              onClick={() => setLike(true)}
              className="w-5 h-5 cursor-pointer hover:text-[var(--color-black)] duration-300"
            />
          )}
          {like && (
            <AiFillLike
              onClick={() => setLike(false)}
              className="w-5 h-5 cursor-pointer text-[var(--color-black)]"
            />
          )}
          <p className="ml-[3px] text-base">32</p>

          <IoEyeOutline className="ml-[11px] w-5 h-5" />
          <p className="ml-[3px] text-base">124</p>
        </div>

        {/* 댓글 입력*/}
        <div className="mt-6">
          <Input
            rightSlot={
              <PiPaperPlaneTiltLight className="w-4 h-4 text-[var(--color-gray-100)] cursor-pointer" />
            }
            placeholder="댓글을 입력해주세요"
            className="rounded-[50px] w-[320px] h-[50px] text-[var(--color-gray-50)] text-base"
          />
        </div>

        {/* 댓글 */}
        {comments.map((comment, i) => (
          <div key={i} className="relative">
            <div className="mt-6 w-full h-auto flex justify-between">
              <div className="flex items-start">
                <Image
                  src={comment.profileImg}
                  alt="profileImg"
                  width={36}
                  height={36}
                  className="shrink-0 rounded-full"
                />
                <div className="flex flex-col ml-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[var(--color-gray-100)] text-base font-semibold">
                      {comment.nickName}
                    </span>
                    <span className="text-[var(--color-gray-60)] text-[13px]">
                      {comment.time}
                    </span>
                  </div>

                  <p className="mt-1 text-[var(--color-gray-100)] text-base">
                    {comment.comment}
                  </p>
                </div>
              </div>
              <IconButton
                icon={AiOutlineMore}
                size={24}
                color="#2f2f2f"
                onClick={() => toggleOpen(i)}
                className="w-8 h-8 hover:bg-[var(--color-gray-10)]"
              />
            </div>
            <div className="absolute top-9 right-0">
              <Dropdown
                isOpen={open[i]}
                onClose={() => toggleOpen(i)}
                title="내 댓글"
                items={[
                  {
                    icon: <PiPencilLine />,
                    label: "수정하기",
                    onClick: () => toggleOpen(i),
                  },
                  {
                    icon: <RiDeleteBinLine />,
                    label: "삭제하기",
                    onClick: () => toggleOpen(i),
                    danger: true,
                  },
                ]}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
