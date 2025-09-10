import Input from "../ui/Input";
import { TextButton } from "../ui/TextButton";

const ProfileEditForm = () => {
  return (
    <div className="flex flex-col gap-5 pb-5">
      <h1 className="text-[#191919]] pt-5 text-[22px] font-bold dark:text-[var(--color-white)]">
        내 정보 수정
      </h1>
      <div>
        <p className="pb-2 text-[var(--color-gray-80)]">닉네임 변경</p>
        <Input
          placeholder="기존닉네임"
          rightSlot={
            <TextButton className="text-[var(--color-black)]">
              중복확인
            </TextButton>
          }
        />
      </div>
      <div>
        <p className="pb-2 text-[var(--color-gray-80)]">비밀번호 변경</p>
        <Input placeholder="새 비밀번호" type="password" />
      </div>
      <div>
        <p className="pb-2 text-[var(--color-gray-80)]">비밀번호 확인</p>
        <Input placeholder="비밀번호 확인" type="password" />
      </div>
    </div>
  );
};
export default ProfileEditForm;
