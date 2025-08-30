import { twMerge } from "tailwind-merge";
interface TextButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  state?: "default" | "disabled" | "active";
}

export const TextButton: React.FC<TextButtonProps> = ({
  children,
  className = "",
  state = "default",
  type = "button",
  ...props
}) => {
  const baseStyle =
    "flex w-full py-2 px-4 rounded-2xl flex items-center justify-center text-sm duration-300 cursor-pointer ";
  const stateStyle = {
    default:
      "bg-[var(--color-gray-10)] text-[var(--color-black)] hover:bg-[var(--color-gray-20)] active:bg-[var(--color-black)] active:text-[var(--color-white)]",
    disabled:
      "bg-[var(--color-gray-20)] text-[var(--color-gray-50)] opacity-50 cursor-not-allowed pointer-events-none",
    active:
      "bg-[var(--color-black)] text-[var(--color-white)] hover:bg-[var(--color-black)] active:bg-[var(--color-black)]",
  } as const;

  const merged = twMerge(baseStyle, stateStyle[state], className);

  return (
    <button type={type} className={merged} {...props}>
      {children}
    </button>
  );
};
