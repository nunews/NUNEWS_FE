import { useEffect, useRef } from "react";
/**
 * 드롭다운 컴포넌트 props
 * @param isOpen - 드롭다운 열려있는지 여부
 * @param onClose - 드롭다운 닫기를 실행하는 함수
 * @param item - 드롭다운에 표시할 메뉴 아이템 배열
 * @param triggerRef - 드롭다운을 여는 버튼/트리거 오쇼의 ref
 * @param title - 드롭박스 상단 라벨(제목)
 */

/**
 * 드롭다운 하나의 아이템에 대한 props
 * @param icon - react-icon 객체를 받음
 * @param label - 해당 항목의 텍스트
 * @param onClick - 해당 항목 클릭 시 실행할 함수
 * @param danger - true일 경우 빨강색으로 텍스트 강조
 */

type DropdownItem = {
  icon?: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
};

type DropdownProps = {
  isOpen: boolean;
  onClose: () => void;
  items: DropdownItem[];
  triggerRef?: React.RefObject<HTMLElement | null>;
  title?: React.ReactNode;
};

const Dropdown = ({
  isOpen,
  onClose,
  items,
  triggerRef,
  title,
}: DropdownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      const t = e.target as Node;
      const inMenu = menuRef.current?.contains(t);
      const inTrigger = triggerRef?.current?.contains(t);
      if (!inMenu && !inTrigger) onClose();
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="w-fit relative z-10">
      <div className="min-w-[157px] flex flex-col bg-[var(--color-white)] text-[var(--color-black)] py-2 rounded-lg text-sm font-medium shadow-[0_4px_10px_-2px_rgba(0,0,0,0.16)]">
        {title !== undefined && (
          <div className="px-4 py-2 text-xs text-[var(--color-gray-100)]">
            {title}
          </div>
        )}
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 px-3 py-2 rounded cursor-pointer hover:bg-[var(--color-gray-10)] transition duration-300 ${
              item.danger ? "text-[#e03333]" : ""
            }`}
            onClick={(e) => {
              e.stopPropagation();
              item.onClick();
              onClose();
            }}
          >
            {item.icon && <span className="text-lg">{item.icon}</span>}
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dropdown;
