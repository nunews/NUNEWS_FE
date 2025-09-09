"use client";

import Header from "@/components/layout/header";
import { InterestList } from "@/components/mypage/InteresetList";
import ProfileEditForm from "@/components/mypage/ProfileEditForm";
import { TextButton } from "@/components/ui/TextButton";

const ProfileSettingPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header logo={false} />
      <main className="flex-grow px-5 pt-18 pb-23">
        <ProfileEditForm />
        <InterestList />
      </main>
      <div className="w-full flex p-5 bottom-0 gap-2.5  ">
        <TextButton className="py-4 rounded-full flex-1">취소하기</TextButton>
        <TextButton className="py-4 rounded-full flex-1">
          변경사항 저장
        </TextButton>
      </div>
    </div>
  );
};

export default ProfileSettingPage;
