export default function DashboardStatusListLoading() {
  return (
    <div
      aria-label="Loading order status data"
      aria-live="polite"
      className="space-y-5"
      role="status"
    >
      {Array.from({ length: 4 }, (_, index) => (
        <div className="space-y-2" key={index}>
          <div className="flex justify-between gap-4">
            <span className="h-4 w-24 animate-pulse rounded bg-slate-200/40" />
            <span className="h-4 w-10 animate-pulse rounded bg-slate-200/40" />
          </div>
          <div className="h-2 animate-pulse rounded-full bg-white/25" />
        </div>
      ))}
    </div>
  );
}
