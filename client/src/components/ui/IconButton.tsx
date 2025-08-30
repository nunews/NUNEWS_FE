import React from "react";
import { IconType } from "react-icons";

interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconType;
  size?: number;
  color?: string;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon: Icon,
  size = 20,
  color = "#000000",
  className = "",
  type = "button",
  ...props
}) => {
  const baseStyle =
    "flex items-center justify-center rounded-full text-xl duration-300 cursor-pointer";

  return (
    <button type={type} className={`${baseStyle} ${className}`} {...props}>
      <Icon size={size} color={color} />
    </button>
  );
};
