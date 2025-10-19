import { fetchWriter } from "@/app/api/community";
import { useQuery } from "@tanstack/react-query";
import profileImg2 from "../../assets/images/profile2.png";
import { IconButton } from "../ui/IconButton";
import { AiOutlineMore } from "react-icons/ai";
import Image from "next/image";
import Dropdown from "../ui/Dropdown";
import { PiPencilLine } from "react-icons/pi";
import { RiDeleteBinLine } from "react-icons/ri";
import { useState } from "react";
export default function Comment({
  commentId,
  userId,
  comment,
  created_at,
}: {
  commentId: string;
  userId: string;
  comment: string;
  created_at: string;
}) {
  //댓글 작성자 불러오기
  const { data: commentWriterData } = useQuery({
    queryKey: ["writerDetail", userId],
    queryFn: () => fetchWriter(userId as string),
    enabled: !!userId,
  });
  const [open, setOpen] = useState(false);
  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <>
      <div className="mt-6 w-full h-auto flex justify-between">
        <div className="flex items-start">
          <Image
            src={commentWriterData?.profile_image ?? profileImg2}
            alt="profileImg"
            width={36}
            height={36}
            className="shrink-0 rounded-full"
          />
          <div className="flex flex-col ml-3">
            <div className="flex items-center gap-2">
              <span className="text-[var(--color-gray-100)] text-base font-semibold">
                {commentWriterData?.nickname}
              </span>
              <span className="text-[var(--color-gray-60)] text-[13px]">
                {created_at.slice(5, 10)}
              </span>
            </div>

            <p className="mt-1 text-[var(--color-gray-100)] text-base">
              {comment}
            </p>
          </div>
        </div>
        <IconButton
          icon={AiOutlineMore}
          size={24}
          color="#2f2f2f"
          onClick={toggleOpen}
          className="w-8 h-8 hover:bg-[var(--color-gray-10)]"
        />
      </div>
      <div className="absolute top-9 right-0">
        <Dropdown
          isOpen={open}
          onClose={toggleOpen}
          title="내 댓글"
          items={[
            {
              icon: <PiPencilLine />,
              label: "수정하기",
              onClick: toggleOpen,
            },
            {
              icon: <RiDeleteBinLine />,
              label: "삭제하기",
              onClick: toggleOpen,
              danger: true,
            },
          ]}
        />
      </div>
    </>
  );
}
