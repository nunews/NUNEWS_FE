import { IconButton } from "../ui/IconButton";
import Dropdown from "../ui/Dropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { useCallback, useRef, useState } from "react";
import { RiDeleteBinLine } from "react-icons/ri";
import { PiPencilLine } from "react-icons/pi";

export default function Home() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => setOpen((v) => !v), []);
  const close = useCallback(() => setOpen(false), []);
  return (
    <>
      <h1>Home Component</h1>
      <div className="relative inline-block mx-30">
        <IconButton
          ref={buttonRef as any}
          icon={HiOutlineDotsVertical}
          size={20}
          color="#555"
          className="hover:bg-zinc-100 w-10 h-10"
          onClick={toggle}
        />

        <div className="absolute right-0 mt-2">
          <Dropdown
            isOpen={open}
            onClose={close}
            title="내 댓글"
            items={[
              {
                icon: <PiPencilLine />,
                label: "수정하기",
                onClick: () => console.log("수정 클릭"),
              },
              {
                icon: <RiDeleteBinLine />,
                label: "삭제하기",
                onClick: () => console.log("삭제 클릭"),
                danger: true,
              },
            ]}
            triggerRef={buttonRef}
          />
        </div>
      </div>
    </>
  );
}
