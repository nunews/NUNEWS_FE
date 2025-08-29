/**
 * @param rightSlot은 전송 버튼을 배치 자리
 *  rightSlot={
            <button type="button" className="cursor-pointer">
              랜덤다이스
            </button>
          } 
            버튼태그넣고 아이콘을 넣거나 텍스트 넣거나 하시면 됩니다
 * 
 *  <Input
        placeholder="닉네임을 입력해주세요"
        maxLength={number}
        className="rounded-[12px] placeholder:text-[var(--color-gray-50)] placeholder:text-sm text-sm"
        rightSlot={
          <button type="button" className="cursor-pointer">
            <Image src={dice} alt="dice icon" className="w-6 h-6 mr-1.5" />
          </button>
        }
      />
        <Input
        placeholder="메시지를 입력하세요"
        maxLength={number}
        className="rounded-[var(--radius-xl)] placeholder:text-[var(--color-gray-50)] placeholder:text-sm text-sm"
        rightSlot={
          <button type="button" className="cursor-pointer">
            전송
          </button>
        }
      />

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
        className={`w-full pl-4  
                    border border-[var(--color-gray-30)] text-[var(--color-gray-100)] ${className}`}
        {...props}
      />
      {rightSlot && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2">
          <div className="">{rightSlot}</div>
        </div>
      )}
    </div>
  );
}
