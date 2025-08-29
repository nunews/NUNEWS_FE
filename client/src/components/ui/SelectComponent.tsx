/** 
 * @param select.tsx에 shadcn 기본css가 들어가있어서 커스텀이 적용이 안된다면 개발자 도구를 확인해야 합니다
  높이설정 경우 개발자 도구에 지정되어있는 data-[size=default]:h-12.5 이런식으로 적용하면 적용됩니다!
  @param 또 어디에서 사용되는지를 몰라서 일단 사용하게 될 코드 복붙
  const options = [
    { label: "10대", value: "10대" },
    { label: "20대", value: "20대" },
    { label: "30대", value: "30대" },
    { label: "40대 이상", value: "40대 이상" },
  ];
   <SelectComponent
        label="연령"
        placeholder="연령을 선택해주세요"
        options={options}
        className="data-[placeholder]:text-[var(--color-gray-50)]"
      />


**/

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
}: SelectComponentProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <span className="text-sm font-medium text-[var(--color-gray-80)]">
          {label}
        </span>
      )}

      <Select defaultValue={defaultValue} onValueChange={onChange}>
        <SelectTrigger
          className={`w-80 data-[size=default]:h-12.5 rounded-[12px] pl-4
            ${className}`}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((opt) => (
            <SelectItem
              key={opt.value}
              value={opt.value}
              disabled={opt.disabled}
            >
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
