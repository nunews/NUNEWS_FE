export default function AudienceChartSkeleton() {
  return (
    <>
      <div className="bg-card text-card-foreground rounded-xl p-4 animate-pulse">
        <div className="mb-4">
          <div className="h-5 w-40 rounded bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
          <div className="mt-2 h-4 w-56 rounded bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
        </div>
        <div className="space-y-3">
          <div className="h-6 w-full rounded bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
          <div className="h-10 w-full rounded bg-[var(--color-gray-40)] dark:bg-[var(--color-gray-70)]" />
        </div>
      </div>
    </>
  );
}
