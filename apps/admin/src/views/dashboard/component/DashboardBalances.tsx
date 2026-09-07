import { ArrowUpRight, TrendingUp } from 'lucide-react';
import { useDashboardBalancesQuery } from '../hooks/useDashboardBalancesQuery';

const currencyFormatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  maximumFractionDigits: 2,
  style: 'currency',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const formatCurrency = (value: number) => currencyFormatter.format(value);

const formatDateRange = (startDate: string, endDate: string) =>
  `${dateFormatter.format(new Date(startDate))} - ${dateFormatter.format(new Date(endDate))}`;

export default function DashboardBalances() {
  const {
    data: incomeSummary,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useDashboardBalancesQuery();

  if (isLoading) {
    return <DashboardBalancesLoading />;
  }

  if (isError) {
    return (
      <div
        className="min-h-full rounded-[1.25rem] border border-red-200 bg-red-50/95 p-5 text-slate-950 shadow-[0_20px_42px_-30px_rgba(15,23,42,0.55)]"
        role="alert"
      >
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-red-800">
          Income summary
        </p>
        <p className="mt-3 text-sm text-red-700">Unable to load income data.</p>
        <button
          className="mt-5 rounded-[0.65rem] bg-red-800 px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isRefetching}
          onClick={() => refetch()}
          type="button"
        >
          {isRefetching ? 'Retrying...' : 'Try again'}
        </button>
      </div>
    );
  }

  if (!incomeSummary) {
    return (
      <div
        className="min-h-full rounded-[1.25rem] border border-slate-200/90 bg-white/90 p-5 text-slate-950 shadow-[0_20px_42px_-30px_rgba(15,23,42,0.55)] backdrop-blur-xl"
        role="status"
      >
        <p className="text-[0.72rem] font-bold uppercase tracking-[0.12em] text-[#0b4f8a]">
          Income summary
        </p>
        <p className="mt-3 text-sm text-slate-500">No income data is available yet.</p>
      </div>
    );
  }

  const paymentMethods = Object.entries(incomeSummary.paymentMethodIncome ?? {}).sort(
    ([, firstAmount], [, secondAmount]) => secondAmount - firstAmount,
  );

  return (
    <div className="min-h-full rounded-[1.25rem] border border-slate-200/90 bg-white/90 p-5 text-slate-950 shadow-[0_20px_42px_-30px_rgba(15,23,42,0.55)] backdrop-blur-xl">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xl font-semibold text-[#0b4f8a]">Income summary</p>
          <p className="text-sm text-slate-500">Revenue by payment method</p>
        </div>
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-[#0b4f8a]"
          aria-hidden="true"
        >
          <ArrowUpRight size={18} />
        </span>
      </div>

      <div className="bg-linear-to-br relative mt-5 overflow-hidden rounded-2xl border border-white/20 from-[#061a35] via-[#0b3f77] to-[#1677a8] p-4 text-slate-50 shadow-[0_20px_34px_-24px_rgba(3,37,78,0.9)] ring-1 ring-inset ring-white/10">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">
          <TrendingUp aria-hidden="true" size={15} />
          <span>Total income</span>
        </div>
        <p className="mt-3 text-3xl font-semibold tracking-tighter">
          {formatCurrency(incomeSummary.totalIncome)}
        </p>
        <p className="mt-2 text-xs text-blue-100/80">
          {formatDateRange(incomeSummary.dataRange.startDate, incomeSummary.dataRange.endDate)}
        </p>
      </div>

      <div className="mt-6 space-y-5">
        {paymentMethods.length > 0 ? (
          paymentMethods.map(([method, amount]) => {
            const percentage =
              incomeSummary.totalIncome > 0
                ? Math.min(100, Math.max(0, (amount / incomeSummary.totalIncome) * 100))
                : 0;

            return (
              <div key={method}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className="font-medium text-slate-700">{method}</span>
                  <span className="font-semibold text-slate-950">{formatCurrency(amount)}</span>
                </div>
                <div
                  className="mt-2 h-[0.42rem] overflow-hidden rounded-full bg-slate-200"
                  aria-hidden="true"
                >
                  <span
                    className="bg-linear-to-r block h-full rounded-full from-orange-500 to-rose-400 transition-[width] duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-500">No payment method income is available yet.</p>
        )}
      </div>
    </div>
  );
}

function DashboardBalancesLoading() {
  return (
    <div
      aria-label="Loading income summary"
      className="min-h-full rounded-[1.25rem] border border-slate-200/90 bg-white/90 p-5 text-slate-950 shadow-[0_20px_42px_-30px_rgba(15,23,42,0.55)] backdrop-blur-xl"
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="block h-4 w-28 animate-pulse rounded-md bg-slate-200" />
          <span className="block h-3 w-40 animate-pulse rounded-md bg-slate-200" />
        </div>
        <span className="size-9 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="bg-linear-to-br relative mt-5 space-y-3 overflow-hidden rounded-2xl border border-white/20 from-[#061a35] via-[#0b3f77] to-[#1677a8] p-4 text-slate-50 shadow-[0_20px_34px_-24px_rgba(3,37,78,0.9)] ring-1 ring-inset ring-white/10">
        <span className="block h-3 w-24 animate-pulse rounded-md bg-white/20" />
        <span className="block h-9 w-36 animate-pulse rounded-md bg-white/20" />
        <span className="block h-3 w-32 animate-pulse rounded-md bg-white/20" />
      </div>
      <div className="mt-6 space-y-5">
        {Array.from({ length: 2 }, (_, skeletonIndex) => (
          <div className="space-y-2" key={skeletonIndex}>
            <div className="flex justify-between gap-3">
              <span className="h-3 w-20 animate-pulse rounded-md bg-slate-200" />
              <span className="h-3 w-16 animate-pulse rounded-md bg-slate-200" />
            </div>
            <span className="block h-2 w-full animate-pulse rounded-full bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
