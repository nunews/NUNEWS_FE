"use client";
import Input from "@/components/ui/Input";
import SelectComponent from "@/components/ui/SelectComponent";
import { TextButton } from "@/components/ui/TextButton";
import { Dices } from "lucide-react";
import { IoFemaleOutline } from "react-icons/io5";
import { IoMaleOutline } from "react-icons/io5";
import Header from "@/components/layout/header";
import { useState } from "react";
import { generateRandomNickname } from "@/utils/generateRandomNickname";
import { toast } from "sonner";
import createClient from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function ProfileInitPage() {
  const ageOptions = [
    { label: "10대", value: "10s" },
    { label: "20대", value: "20s" },
    { label: "30대", value: "30s" },
    { label: "40대 이상", value: "40s" },
    { label: "선택하지 않음", value: "none" },
  ];
  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [selectedAge, setSelectedAge] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [nickname, setNickname] = useState("");
  const [checking, setChecking] = useState(false);
  const [nicknameError, setNicknameError] = useState<string | null>(null);
  const [isNicknameChecked, setIsNicknameChecked] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const defaultButtonStyle = `
  bg-white
  text-[var(--color-gray-50)]
  border border-[var(--color-gray-30)]

  hover:text-[var(--color-gray-100)]
  hover:border-[var(--color-gray-100)]

  dark:bg-[#121212]
  dark:text-[var(--color-gray-50)]
  dark:border-[var(--color-gray-60)]

  dark:hover:bg-[var(--color-gray-100)]
  dark:hover:text-white
  dark:hover:border-[var(--color-gray-60)]
`;
  const activeButtonStyle = `
  bg-[var(--color-gray-10)]
  text-[var(--color-gray-100)]
  border border-[var(--color-gray-100)]

 
  hover:bg-[var(--color-gray-10)]
  hover:text-[var(--color-gray-100)]
  hover:border-[var(--color-gray-100)]

  dark:bg-[var(--color-gray-100)]
  dark:text-white
  dark:border-[var(--color-gray-60)]

  dark:hover:bg-[var(--color-gray-100)]
  dark:hover:text-white
  dark:hover:border-[var(--color-gray-60)]
`;

  const handleNicknameChange = (value: string) => {
    setNickname(value);
    setIsNicknameChecked(false);

    if (!value.trim()) {
      setNicknameError(null);
      return;
    }

    const regex = /^[가-힣a-zA-Z0-9]{2,10}$/;
    if (!regex.test(value)) {
      setNicknameError("닉네임은 2~10자의 한글, 영문, 숫자만 사용 가능합니다.");
    } else {
      setNicknameError(null);
    }
  };

  const handleCheckDuplicate = async () => {
    if (!nickname.trim()) {
      toast.error("닉네임을 입력해 주세요.");
      return;
    }

    // 유효하지 않으면 중복확인 중단
    if (nicknameError) return;

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
        setIsNicknameChecked(true);
      }
    } catch (err) {
      console.error(err);
      toast.error("중복 확인 중 오류가 발생했습니다.");
    } finally {
      setChecking(false);
    }
  };

  const handleRandomNickname = () => {
    const random = generateRandomNickname();
    setNickname(random);
    setIsNicknameChecked(false);
    setNicknameError(null);
  };

  const handleSubmit = async () => {
    if (!nickname || nicknameError || !isNicknameChecked || !selectedGender) {
      return;
    }
    try {
      const { data, error } = await supabase.auth.getUser();
      const user = data?.user;

      if (error) {
        console.error("getuser 오류", error);
        toast.error("구글 로그인을 다시 시도해 주세요.");
        return;
      }

      if (!user) {
        toast.error("로그인을 먼저해 주세요.");
        router.replace("/auth/login");
        return;
      }
      const { error: upsertError } = await supabase
        .from("User")
        .update({
          nickname,
          gender: selectedGender,
          age_range: null,
        })
        .eq("user_id", user.id);

      if (upsertError) {
        console.error("프로필 저장 오류", upsertError);
        toast.error("프로필 저장 중 오류가 발생했어요.");
        return;
      }

      toast.success("저장되었습니다!");
      router.replace("/");
    } catch (err) {
      console.error(err);
      toast.error("프로필 저장 중 오류가 발생했어요.");
    }
  };

  return (
    <>
      <Header logo={true} />
      <div className=" relative h-screen flex flex-col px-6">
        <div className="mt-[62px]">
          <h1 className="text-[22px] font-bold leading-[140%] py-8">
            사용자님의 정보를
            <br />
            알려주세요
          </h1>
          <div className="flex flex-col gap-8">
            <div>
              <p className="text-[var(--color-gray-80)] text-xs pb-2">닉네임</p>
              <div className="flex items-center gap-2">
                <Input
                  className="px-4.5"
                  placeholder="나의 닉네임은?"
                  value={nickname}
                  onChange={(e) => handleNicknameChange(e.target.value)}
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

                {/* 랜덤 닉네임 버튼 */}
                <button
                  type="button"
                  onClick={handleRandomNickname}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                  className="cursor-pointer w-12 h-12 flex items-center justify-center border border-[#DFDFDF] rounded-[8px]
                       hover:bg-[#F2F2F2] dark:border-[#4D4D4D] dark:hover:bg-[#515151]"
                >
                  <Dices
                    style={{
                      transform: isHovered ? "rotate(306deg)" : "rotate(0deg)",
                      transition: "transform 0.6s cubic-bezier(0.4,0,0.2,1)",
                    }}
                    className="w-5 h-5 dark:text-white"
                  />
                </button>
              </div>
            </div>
            <SelectComponent
              label="연령"
              options={ageOptions}
              placeholder="연령대를 선택해주세요"
              labelClassName="text-[var(--color-gray-80)] text-xs"
              defaultValue={selectedAge ?? undefined}
              onChange={(value) => setSelectedAge(value)}
            />
            <div className="flex flex-col gap-2">
              <p className="text-[var(--color-gray-80)] text-xs">성별</p>
              <div className="flex h-12.5 gap-2 text-sm">
                <TextButton
                  onClick={() => setSelectedGender("male")}
                  state={selectedGender === "male" ? "active" : "default"}
                  className={
                    selectedGender === "male"
                      ? activeButtonStyle
                      : defaultButtonStyle
                  }
                >
                  <div className="flex items-center gap-1">
                    <IoMaleOutline size={18} />
                    <span>남성</span>
                  </div>
                </TextButton>
                <TextButton
                  onClick={() => setSelectedGender("female")}
                  state={selectedGender === "female" ? "active" : "default"}
                  className={
                    selectedGender === "female"
                      ? activeButtonStyle
                      : defaultButtonStyle
                  }
                >
                  <div className="flex items-center gap-1">
                    <IoFemaleOutline size={18} />
                    <span>여성</span>
                  </div>
                </TextButton>
              </div>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0 px-5 py-5  rounded-full">
            <TextButton
              state={
                nickname &&
                !nicknameError &&
                isNicknameChecked &&
                selectedGender
                  ? "default"
                  : "disabled"
              }
              className="h-12.5"
              onClick={handleSubmit}
            >
              완료
            </TextButton>
          </div>
        </div>
      </div>
    </>
  );
}
