/**
 *       <textarea
          placeholder="나누고싶은 의견을 입력하세요"
          maxLength={500}
          className={`w-full border border-[var(--color-gray-30)] text-[var(--color-black)] resize-none ${className} p-4`}
          {...props}
          />
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
