/**
 * @param options - { label: string, value: string, disabled?: boolean } 형태의 옵션 리스트
 * @param placeholder - 값이 비어있을 때 나타나는 텍스트
 * @param defaultValue - 초기 선택값
 * @param onChange - 값이 변경될 때 호출되는 이벤트 핸들러
 * @param className - SelectTrigger에 추가할 css요소
 * css요소가 적용되지 않을 경우 개발자도구에서 어떤 값이 들어있는지 확인하고 ex) data-[size=default]:h-12.5 이런 형식으로 작성해야 함.
 * @param label - Select 상단에 표시할 텍스트
 * @param labelClassName - Select 상단에 표시할 텍스트의 css요소
 *
 * @returns shadcn Select 기반 커스텀 드롭다운 컴포넌트
 **/

import { twMerge } from "tailwind-merge";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./select";

export default function SelectComponent({
  options,
  placeholder = "",
  defaultValue,
  onChange,
  className,
  label,
  labelClassName,
}: SelectComponentProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span
          className={twMerge(
            "text-sm font-medium text-[var(--color-gray-80)]",
            labelClassName
          )}
        >
          {label}
        </span>
      )}

      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger
          className={`w-full data-[size=default]:h-12.5 rounded-[12px] pl-4 shadow-none
            
           border border-[var(--color-gray-30)] dark:text-gray-90 dark:border-gray-100 hover:border-[var(--color-gray-50)] transition-all duration-300 ease-in-out
          active:border-[var(--color-gray-50)] active:ring-0 focus-visible:border-[var(--color-gray-50)] focus-visible:ring-0 focus-visible:outline-none focus:outline-none
            ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent className="rounded-[12px] border dark:bg-[#121212] dark:border-gray-100 border-[var(--color-gray-50)] shadow-none">
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
              className="text-[var(--color-gray-100)] h-11 pl-3 hover:bg-[var(--color-gray-10)] dark:hover:bg-[var(--color-gray-100)] dark:text-white transition-all duration-300 ease-in-out rounded-[12px]"
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
