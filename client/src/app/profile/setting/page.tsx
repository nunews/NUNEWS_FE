"use client";

import Header from "@/components/layout/header";
import { InterestList } from "@/components/mypage/InteresetList";
import ProfileEditForm from "@/components/mypage/ProfileEditForm";
import { TextButton } from "@/components/ui/TextButton";
import { useState } from "react";
import createClient from "@/utils/supabase/client";
import { toast } from "sonner";

const ProfileSettingPage = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const supabase = createClient();

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
    } catch (e) {
      console.error(e);
      toast.error("저장 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header logo={false} />
      <main className="flex-grow px-5 pt-18 pb-23">
        <ProfileEditForm />
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
