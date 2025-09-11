"use client";
import Image from "next/image";
import postImg from "../../assets/images/postImg.png";
import profile1 from "../../assets/images/profile1.png";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function CommunityPost() {
  const router = useRouter();
  const [like, setLike] = useState(false);
  return (
    <>
      <div className="group py-6 w-full h-auto border-b border-[#ebebeb] ">
        <div
          className="cursor-pointer"
          onClick={() => router.push("/community/1")}
        >
          <div className="relative  w-full aspect-[16/9]">
            <Image
              src={postImg}
              alt="postImg"
              fill
              className="rounded-[12px]"
            />
            <div className="absolute inset-0 rounded-[12px] bg-[#000000]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div className="mt-4 w-full flex justify-between">
            <div className="w-auto h-9 flex items-center cursor-pointer">
              <Image src={profile1} alt="profile1" width={36} height={36} />
              <p className="ml-2 text-[var(--color-gray-100)] text-base font-semibold">
                혁신적인 돼지
              </p>
            </div>
            <p className="text-[var(--color-gray-100)] text-sm">#스포츠</p>
          </div>

          <p className="mt-4 text-[#191919] text-lg font-bold">
            이강인 사랑해요
          </p>
          <p className="text-[#191919] group-hover:text-black text-sm line-clamp-2">
            아니 나는 진짜 이강인이 결승전 못뛰어서 너무 아쉽꿀꿀다음엔 꼭
            이강인이 결승전 뛰었으면 좋겠다꿀ㅠ 어디까지나 팬 입장에서
            바램이다꿀..
          </p>
        </div>
        <div className="mt-4 flex items-center">
          {!like && (
            <AiOutlineLike
              onClick={() => setLike(true)}
              className="w-5 h-5 cursor-pointer text-[var(--color-gray-60)] hover:text-[var(--color-black)] duration-300"
            />
          )}
          {like && (
            <AiFillLike
              onClick={() => setLike(false)}
              className="w-5 h-5 cursor-pointer text-[var(--color-black)]"
            />
          )}
          <p className="ml-[3px] text-[var(--color-gray-70)] text-[13px]">32</p>

          <IoEyeOutline className="ml-[11px] w-4 h-4 text-[var(--color-gray-60)]" />
          <p className="ml-[3px] text-[var(--color-gray-70)] text-[13px]">
            124
          </p>
        </div>
      </div>
    </>
  );
}
