"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import createClient from "@/utils/supabase/client";
import { useAuthStore } from "@/stores/authStore";
import { categoryIdInvMap } from "@/lib/categoryUUID";

export function useProfileEdit() {
  const supabase = createClient();
  const router = useRouter();
  const {
    userId,
    nickname: currentNickname,
    profile_image: currentProfileImage,
    interest,
    setUser,
  } = useAuthStore();

  const [nickname, setNickname] = useState(currentNickname ?? "");
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>(
    interest.map((id) => categoryIdInvMap[id]).filter(Boolean)
  );

  const [newProfileImage, setNewProfileImage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!userId) {
      toast.error("로그인이 필요합니다.");
      return;
    }

    try {
      setIsSaving(true);

      let nextNickname = currentNickname;
      let nextProfileImage = currentProfileImage;
      let nextInterests = interest;

      // 프로필 이미지
      if (newProfileImage && newProfileImage !== currentProfileImage) {
        const blob = await (await fetch(newProfileImage)).blob();
        const ext = blob.type.split("/")[1];
        const path = `profile-images/${userId}_${Date.now()}.${ext}`;

        const { error } = await supabase.storage
          .from("profile")
          .upload(path, blob, { upsert: true });

        if (error) throw error;

        const { data } = supabase.storage.from("profile").getPublicUrl(path);
        nextProfileImage = data.publicUrl;

        await supabase
          .from("User")
          .update({ profile_image: nextProfileImage })
          .eq("user_id", userId);
      }

      // 닉네임
      const isNicknameChanged = nickname !== currentNickname;

      if (isNicknameChanged) {
        if (!nickname.trim()) {
          toast.error("유효한 닉네임을 입력해 주세요.");
          return;
        }
        if (!isNicknameChecked) {
          toast.error("닉네임 중복 확인을 해주세요.");
          return;
        }

        await supabase.from("User").update({ nickname }).eq("user_id", userId);

        nextNickname = nickname;
      }

      // 관심사
      const { data: categories } = await supabase
        .from("Category")
        .select("category_id, title")
        .in("title", selectedInterests);

      if (!categories) throw new Error("카테고리 조회 실패");

      await supabase.from("User_Interests").delete().eq("user_id", userId);
      await supabase.from("User_Interests").insert(
        categories.map((c) => ({
          user_id: userId,
          category_id: c.category_id,
        }))
      );

      nextInterests = categories.map((c) => c.category_id);

      // store 저장
      setUser({
        userId,
        nickname: nextNickname,
        profile_image: nextProfileImage,
        interest: nextInterests,
      });

      toast.success("저장되었습니다!");
      router.push("/mypage");
    } catch (err) {
      console.error("저장 중 오류", err);
      toast.error("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    nickname,
    setNickname,
    currentNickname,

    selectedInterests,
    setSelectedInterests,

    currentProfileImage: newProfileImage || currentProfileImage,
    setProfileImage: setNewProfileImage,

    isNicknameChecked,
    setIsNicknameChecked,

    handleSave,
    isSaving,
  };
}
