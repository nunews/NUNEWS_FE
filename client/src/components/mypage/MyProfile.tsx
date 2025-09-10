import profileImg from "@/assets/images/default_profile.png";
import Image from "next/image";
import { TextButton } from "../ui/TextButton";
import { useRouter } from "next/navigation";

const MyProfile = () => {
  const route = useRouter();
  const handleEditClick = () => {
    route.push("/profile/setting");
  };

  return (
    <div className="flex flex-col gap-4 items-center justify-center mx-auto pb-8">
      <div className="relative w-[80px] h-[80px] rounded-full">
        <Image
          src={profileImg}
          alt="profileImg"
          fill
          sizes="80px"
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <h1 className="font-semibold text-[#191919] text-lg">독재자 강아지 </h1>
        <h2 className="font-medium text-sm text-[#8f8f8f]">
          스포츠, 정치, 문화
        </h2>
      </div>
      <TextButton className="bg-black text-white" onClick={handleEditClick}>
        내 정보 수정
      </TextButton>
    </div>
  );
};

export default MyProfile;
