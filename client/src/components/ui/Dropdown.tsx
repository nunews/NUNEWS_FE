import { useEffect, useRef } from "react";

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
};

const Dropdown = ({ isOpen, onClose, items }: DropdownProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div ref={menuRef} className="w-fit relative z-10">
      <div className="min-w-[157px] flex flex-col bg-[var(--color-white)] text-[var(--color-black)] px-3 py-2 rounded-lg gap-2 text-sm font-medium shadow-[var(--shadow-common)]">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer hover:bg-[var(--color-gray-10)] ${
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
