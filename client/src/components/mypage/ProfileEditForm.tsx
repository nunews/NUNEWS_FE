import Input from "../ui/Input";

const ProfileEditForm = () => {
  return (
    <div className="flex flex-col gap-5 pb-5">
      <h1 className="text-[#191919]] pt-5 text-[22px] font-bold dark:text-[var(--color-white)]">
        내 정보 수정
      </h1>
      <div>
        <p className="pb-2">닉네임 변경</p>
        <Input placeholder="기존닉네임" />
      </div>
      <div>
        <p className="pb-2">비밀번호 변경</p>
        <Input placeholder="새 비밀번호" />
      </div>
      <div>
        <p className="pb-2">비밀번호 확인</p>
        <Input placeholder="비밀번호 확인" />
      </div>
    </div>
  );
};
export default ProfileEditForm;
