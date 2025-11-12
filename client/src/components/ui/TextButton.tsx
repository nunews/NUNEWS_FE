import { twMerge } from "tailwind-merge";
interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  state?:
    | "default"
    | "disabled"
    | "active"
    | "category-active"
    | "category-default";
}

/**
 *
 * @param state - default, disabled, active 등 상태 부여 가능
 * @param className - 이미 되어져있는 스타일링 말고 다른 스타일링이 필요한 경우
 * @param children - 버튼 내용
 * @returns 텍스트 버튼  컴포넌트
 */

export const TextButton: React.FC<TextButtonProps> = ({
  children,
  className = "",
  state = "default",
  type = "button",
  ...props
}) => {
  const baseStyle =
    "flex w-full py-2 px-4 rounded-2xl flex items-center justify-center text-sm duration-300 cursor-pointer whitespace-nowrap";
  const stateStyle = {
    default:
      "bg-[var(--color-gray-10)] text-[var(--color-black)] hover:bg-[var(--color-gray-20)]  active:text-[var(--color-white)]",
    disabled:
      "bg-[var(--color-gray-20)] text-[var(--color-gray-50)] opacity-50 cursor-not-allowed pointer-events-none",
    active:
      "bg-[var(--color-black)] text-[var(--color-white)] hover:bg-[var(--color-black)]",

    "category-default":
      "w-auto bg-[#f3f3f3] text-[var(--color-black)] rounded-full px-4 py-1 h-[30px]",
    "category-active":
      "w-auto bg-[var(--color-black)] text-[var(--color-white)] rounded-full px-4 py-1 h-[30px]",
  } as const;

  const merged = twMerge(baseStyle, stateStyle[state], className);

  return (
    <button type={type} className={merged} {...props}>
      {children}
    </button>
  );
};
