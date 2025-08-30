import React from "react";
import { IconType } from "react-icons";

/**
 *
 * @param icon - react-icon 객체를 받음
 * @param className - 이미 되어져있는 스타일링 말고 다른 스타일링이 필요한 경우
 * @param size - 아이콘 크기
 * @param color - 아이콘 색상
 * @returns 아이콘 버튼  컴포넌트
 */

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
