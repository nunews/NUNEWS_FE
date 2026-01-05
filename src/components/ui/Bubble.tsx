interface BubbleProps {
  children: React.ReactNode;
  size?: "sm" | "lg";
  className?: string;
}

export const Bubble = ({
  children,
  size = "sm",
  className = "",
}: BubbleProps) => {
  const baseStyle =
    "text-center w-[204px] px-2 py-2.5 text-[color:var(--color-white)] bg-[color:var(--color-gray-100)] rounded-lg ";
  const sizeStyles = {
    sm: "text-xs",
    lg: "text-base",
  };
  return (
    <div className="flex flex-col items-center animate-bounce">
      <div className={`${baseStyle} ${sizeStyles[size]} ${className}`}>
        {children}
      </div>
      <div className="w-0 h-0 border-t-[8px] border-t-[color:var(--color-gray-100)] border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent"></div>
    </div>
  );
};
