"use client";

import defaultProfileImg from "@/assets/images/default_profile.png";
import Image from "next/image";
import { TextButton } from "../ui/TextButton";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { categoryIdInvMap } from "@/lib/categoryUUID";

const MyProfile = () => {
  const route = useRouter();
  const nickname = useAuthStore((state) => state.nickname);
  const profileImage = useAuthStore((state) => state.profile_image);
  const interests = useAuthStore((state) => state.interest);

  const Skeleton = () => (
    <div className="flex flex-col gap-4 items-center justify-center mx-auto pb-8 animate-pulse">
      <div
        className="w-[80px] h-[80px] rounded-full 
    bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"
      />

      <div className="flex flex-col items-center gap-2">
        <div
          className="w-24 h-4 rounded 
      bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"
        />
        <div
          className="w-40 h-3 rounded 
      bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"
        />
      </div>

      <div
        className="w-28 h-10 rounded-full 
    bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]"
      />
    </div>
  );

  const handleEditClick = () => {
    route.push("/profile/setting");
  };

  if (!nickname && !profileImage) return <Skeleton />;

  return (
    <div className="flex flex-col gap-4 items-center justify-center mx-auto pb-8">
      <div className="relative w-[80px] h-[80px] rounded-full">
        <Image
          src={profileImage || defaultProfileImg}
          alt="profileImg"
          fill
          sizes="80px"
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h1 className="font-semibold text-[#191919] dark:text-white text-lg text-center">
          {nickname || ""}
        </h1>
        <h2 className="font-medium text-sm text-[#8f8f8f]">
          {interests && interests.length > 0
            ? interests.map((id) => categoryIdInvMap[id]).join(", ")
            : "관심 카테고리가 없습니다"}
        </h2>
      </div>
      <TextButton
        className="bg-black text-white hover:bg-(--color-gray-100)"
        onClick={handleEditClick}
      >
        내 정보 수정
      </TextButton>
    </div>
  );
};

export default MyProfile;
