"use client";

import { useEffect, useState } from "react";
import defaultProfileImg from "@/assets/images/default_profile.png";
import Image from "next/image";
import { TextButton } from "../ui/TextButton";
import { useRouter } from "next/navigation";
import createClient from "@/utils/supabase/client";

interface Category {
  title: string;
}

const MyProfile = () => {
  const [nickname, setNickname] = useState<string>("");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const route = useRouter();
  const supabase = createClient();

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

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // 현재 로그인한 사용자 정보 가져오기
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error("사용자 정보를 가져오지 못했습니다:", userError);
          return;
        }

        const { data, error } = await supabase
          .from("User")
          .select("nickname, profile_image")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error("유저 데이터 불러오기 실패:", error);
        }

        setNickname(data?.nickname ?? null);
        setProfileImage(data?.profile_image ?? null);

        // 관심 카테고리 조회
        const { data: interestData, error: interestError } = await supabase
          .from("User_Interests")
          .select(
            `
            category_id,
            Category ( title )
          `
          )
          .eq("user_id", user.id);

        if (interestError) {
          console.error("관심 카테고리 불러오기 실패:", interestError);
          return;
        }

        const titles =
          interestData
            ?.map((item: { Category: Category | Category[] | null }) => {
              if (Array.isArray(item.Category)) {
                return item.Category[0]?.title;
              }
              return item.Category?.title;
            })
            .filter(Boolean) || [];

        setCategories(
          titles.filter((title): title is string => typeof title === "string")
        );
      } catch (e) {
        console.error("프로필 불러오는 중 오류:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [supabase]);

  const handleEditClick = () => {
    route.push("/profile/setting");
  };

  if (loading) return <Skeleton />;

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
          {categories.length > 0
            ? categories.join(", ")
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
