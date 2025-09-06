/**
 * @param rightSlot은 - input의 우측 내부에 버튼 배치할 요소 (전송 아이콘, 중복확인 )
 * @param className - 기본 css이외에 타입별로 추가할 tailwind 요소  작성
 * @param props - 기본 HTML 속성 추가
 *
 * @returns 오른쪽에 버튼 추가가 가능한 Input 컴포넌트
 */

import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
  className?: string;
  rightSlot?: ReactNode;
}

export default function Input({ rightSlot, className, ...props }: InputProps) {
  return (
    <div className="relative block w-full">
      <input
        className={`w-full h-12.5 pl-4  
                    border border-[var(--color-gray-30)] text-[var(--color-gray-100)] rounded-[12px] placeholder:text-[var(--color-gray-50)]  ${className}`}
        {...props}
      />
      {rightSlot && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div>{rightSlot}</div>
        </div>
      )}
    </div>
  );
}
