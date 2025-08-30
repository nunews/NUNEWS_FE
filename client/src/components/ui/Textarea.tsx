/**
 *  @param className - - 기본 css이외에 타입별로 추가할 tailwind 요소 작성
 *  @param props - textarea의 타입별 속성 추가
 *
 * @returns textarea 컴포넌트
 */

export default function Textarea({
  className,
  ...props
}: {
  className: string;
}) {
  return (
    <>
      <div>
        <textarea
          placeholder="나누고싶은 의견을 입력하세요"
          maxLength={500}
          className={`w-full border border-[var(--color-gray-30)] text-[var(--color-black)] resize-none ${className} p-4`}
          {...props}
        ></textarea>
      </div>
    </>
  );
}
