export default function DashboardStatusListLoading() {
  return (
    <div
      aria-label="Loading order status data"
      aria-live="polite"
      className="mt-6 grid justify-start gap-2 sm:grid-cols-[repeat(2,minmax(0,15rem))]"
      role="status"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div
          className="w-full max-w-80 rounded-lg border border-slate-200 bg-white p-3"
          key={index}
        >
          <div className="flex items-start justify-between gap-2">
            <span className="h-6 w-32 animate-pulse rounded-md bg-slate-200" />
            <span className="size-8 animate-pulse rounded-full bg-slate-200" />
          </div>
          <span className="mt-4 block h-9 w-20 animate-pulse rounded-md bg-slate-200" />
          <div className="mt-3 flex items-center gap-2">
            <span className="size-3.5 animate-pulse rounded-full bg-slate-200" />
            <span className="h-3 w-28 animate-pulse rounded-md bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
