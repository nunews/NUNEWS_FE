import { useRef, useState } from "react";
import Input from "../ui/Input";
import { TextButton } from "../ui/TextButton";
import Image from "next/image";
import defaultProfile from "../../assets/images/default_profile.png";
import { toast } from "sonner";
import createClient from "@/utils/supabase/client";

interface ProfileEditFormProps {
  nickname: string;
  setNickname: (value: string) => void;
  currentNickname: string;
  currentProfileImage: string | null;
  setProfileImage?: (value: string) => void;
  setIsNicknameChecked: (value: boolean) => void;
  isNicknameChecked: boolean;
}

const ProfileEditForm = ({
  nickname,
  setNickname,
  currentNickname,
  setProfileImage,
  currentProfileImage,
  setIsNicknameChecked,
  isNicknameChecked,
}: ProfileEditFormProps) => {
  const [previewImage, setPreviewImage] = useState<string | null>(
    currentProfileImage
  );
  const [checking, setChecking] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const supabase = createClient();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreviewImage(result);
        if (setProfileImage) setProfileImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleCheckDuplicate = async () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해 주세요.");
      return;
    }

    if (nickname === currentNickname) {
      toast("현재 사용 중인 닉네임입니다.");
      setIsNicknameChecked(true);
      return;
    }

    try {
      setChecking(true);
      const { data, error } = await supabase
        .from("User")
        .select("user_id")
        .eq("nickname", nickname)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        toast.error("이미 사용 중인 닉네임입니다.");
        setIsNicknameChecked(false);
      } else {
        toast.success("사용 가능한 닉네임입니다.");
        setIsNicknameChecked(true); //
      }
    } catch (err) {
      console.error(err);
      toast.error("중복 확인 중 오류가 발생했습니다.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-5">
      <h1 className="text-[#191919]] pt-5 text-[22px] font-bold dark:text-[var(--color-white)]">
        내 정보 수정
      </h1>

      {/*프로필 사진*/}
      <div className="flex justify-center">
        <div
          className="relative w-24 h-24 rounded-full overflow-hidden cursor-pointer group"
          onClick={handleClick}
        >
          <Image
            src={previewImage || defaultProfile}
            alt="프로필 이미지"
            fill
            className="object-cover transition duration-300 group-hover:opacity-70"
          />
          <div className="absolute inset-0 bg-gray-800/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
            <span className="text-white text-sm font-medium">이미지 변경</span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </div>
      </div>

      <div>
        <p className="pb-2 text-[var(--color-gray-80)]">닉네임 변경</p>
        <Input
          placeholder={currentNickname || "닉네임"}
          value={nickname}
          onChange={(e) => {
            setNickname(e.target.value);
            setIsNicknameChecked(false);
          }}
          rightSlot={
            <TextButton
              className="text-[var(--color-black)]"
              onClick={handleCheckDuplicate}
              disabled={checking}
            >
              중복확인
            </TextButton>
          }
        />
      </div>
    </div>
  );
};
export default ProfileEditForm;
