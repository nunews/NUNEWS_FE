/**
 * 
 * @param 
 *       <Textarea className="h-33 placeholder:text-[var(--color-gray-50)] placeholder:text-sm rounded-[12px] text-sm text-[var(--color-gray-100)]" />

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
          placeholder="댓글을 입력하세요"
          className={`w-80 border border-[var(--color-gray-30)] text-[var(--color-black)] resize-none ${className} p-4`}
          {...props}
        ></textarea>
      </div>
    </>
  );
}
