"use client";

import Header from "@/components/layout/header";
import { InterestList } from "@/components/mypage/InteresetList";
import ProfileEditForm from "@/components/mypage/ProfileEditForm";
import { TextButton } from "@/components/ui/TextButton";
import { useEffect, useState } from "react";
import createClient from "@/utils/supabase/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Interest } from "@/lib/interest";

interface UserInterest {
  Category: Pick<Interest, "title" | "subtitle"> | null;
}

const ProfileSettingPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [nickname, setNickname] = useState("");
  const [currentNickname, setCurrentNickname] = useState("");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [currentProfileImage, setCurrentProfileImage] = useState<string | null>(
    null
  );
  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);
  const router = useRouter();

  const supabase = createClient();

  //유저 정보 가져오기 (닉네임, 관심사)
  useEffect(() => {
    const fetchUserInfo = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      const userId = user.id;

      const [profileRes, interestRes] = await Promise.all([
        supabase
          .from("User")
          .select("nickname, profile_image")
          .eq("user_id", userId)
          .single(),
        supabase
          .from("User_Interests")
          .select("Category(title)")
          .eq("user_id", userId)
          .returns<UserInterest[]>(),
      ]);

      const { data: profile, error: profileError } = profileRes;
      const { data: userInterests, error: interestError } = interestRes;

      if (profileError) {
        toast.error("프로필 정보를 불러오는 중 오류가 발생했습니다.");
        return;
      }
      if (interestError) {
        toast.error("관심사를 불러오는 중 오류가 발생했습니다.");
        return;
      }

      setCurrentNickname(profile.nickname);
      setCurrentProfileImage(profile.profile_image || null);
      const titles =
        userInterests?.map((item) => item.Category?.title).filter(Boolean) ||
        [];
      setSelectedInterests(titles as string[]);
    };

    fetchUserInfo();
  }, [supabase]);

  const handleSave = async () => {
    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        toast.error("로그인 정보를 확인할 수 없습니다.");
        return;
      }

      const userId = user.id;

      //프로필 변경
      let profileImageUrl = currentProfileImage;

      if (newProfileImage && newProfileImage !== currentProfileImage) {
        const response = await fetch(newProfileImage);
        const blob = await response.blob();
        const fileExt = blob.type.split("/")[1];
        const fileName = `${userId}_${Date.now()}.${fileExt}`;
        const filePath = `profile-images/${fileName}`;

        // Supabase Storage에 업로드
        const { error: uploadError } = await supabase.storage
          .from("profile")
          .upload(filePath, blob, { cacheControl: "3600", upsert: true });

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("profile")
          .getPublicUrl(filePath);
        profileImageUrl = urlData.publicUrl;

        const { error: updateError } = await supabase
          .from("User")
          .update({ profile_image: profileImageUrl })
          .eq("user_id", userId);

        if (updateError) throw updateError;
      }

      //닉네임
      if (nickname && nickname !== currentNickname && !isNicknameChecked) {
        toast.error("유효한 닉네임을 입력해 주세요.");
        return;
      }

      if (nickname && nickname !== currentNickname) {
        const { error: profileError } = await supabase
          .from("User")
          .update({ nickname })
          .eq("user_id", userId);

        if (profileError) throw profileError;
      }

      if (nickname && nickname !== currentNickname && !isNicknameChecked) {
        toast.error("닉네임 중복 확인을 해주세요.");
        return;
      }

      // Category ID 조회
      const { data: categories, error: catErr } = await supabase
        .from("Category")
        .select("category_id, title")
        .in("title", selectedInterests);

      if (catErr) {
        toast.error("카테고리 불러오기 실패");
        return;
      }

      // 기존 관심사 삭제
      await supabase.from("User_Interests").delete().eq("user_id", userId);

      // 새 관심사 삽입
      const insertData = categories.map((c) => ({
        user_id: userId,
        category_id: c.category_id,
      }));

      const { error: insertError } = await supabase
        .from("User_Interests")
        .insert(insertData);

      if (insertError) throw insertError;

      toast.success("저장되었습니다!");
      setTimeout(() => {
        router.push("/mypage");
      }, 1500);
    } catch (e) {
      console.error(e);
      toast.error("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header logo={false} />
      <main className="flex-grow px-5 pt-18 pb-23">
        <ProfileEditForm
          nickname={nickname}
          setNickname={setNickname}
          currentNickname={currentNickname}
          currentProfileImage={newProfileImage || currentProfileImage}
          setProfileImage={setNewProfileImage}
          isNicknameChecked={isNicknameChecked}
          setIsNicknameChecked={setIsNicknameChecked}
        />
        <InterestList
          selectedInterests={selectedInterests}
          setSelectedInterests={setSelectedInterests}
        />
      </main>
      <div className="w-full flex p-5 bottom-0 gap-2.5  ">
        <TextButton className="py-4 rounded-full flex-1">취소하기</TextButton>
        <TextButton
          onClick={handleSave}
          className="py-4 rounded-full flex-1 text-[var(--color-white)] bg-[var(--color-black)] hover:bg-[var(--color-gray-100)] hover:text-[var(--color-white)]  dark:bg-[var(--color-gray-10)] dark:text-[var(--color-gray-100)]"
        >
          변경사항 저장
        </TextButton>
      </div>
    </div>
  );
};

export default ProfileSettingPage;
