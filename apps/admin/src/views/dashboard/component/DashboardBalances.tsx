import { CircleDollarSign } from 'lucide-react';
import { Progress } from '@my-monorepo/ui';
import type { DashboardDateRange } from '../hooks/dashboardDateRange';
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

interface DashboardBalancesProps {
  dateRange: DashboardDateRange;
}

export default function DashboardBalances({ dateRange }: DashboardBalancesProps) {
  const {
    data: incomeSummary,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useDashboardBalancesQuery(dateRange);

  if (isLoading) {
    return <DashboardBalancesLoading />;
  }

  if (isError) {
    return (
      <div
        className="min-h-full rounded-3xl border border-red-200 bg-white p-5 text-slate-950 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.42)] sm:p-6"
        role="alert"
      >
        <p className="text-xl font-medium tracking-tight text-red-800">Income summary</p>
        <p className="mt-2 text-sm text-red-700">Unable to load income data.</p>
        <button
          className="mt-5 rounded-lg bg-red-800 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
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
        className="min-h-full rounded-3xl border border-slate-200 bg-white p-5 text-slate-950 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.42)] sm:p-6"
        role="status"
      >
        <p className="text-xl font-medium tracking-tight text-slate-950">Income summary</p>
        <p className="mt-2 text-sm text-slate-500">No income data is available yet.</p>
      </div>
    );
  }

  const paymentMethods = Object.entries(incomeSummary.paymentMethodIncome ?? {}).sort(
    ([, firstAmount], [, secondAmount]) => secondAmount - firstAmount,
  );

  return (
    <div className="min-h-full rounded-lg border border-slate-200 bg-white p-5 text-slate-950 sm:p-6">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[1.65rem] font-medium tracking-[-0.035em]">Income summary</p>
          <p className="mt-1 text-sm text-slate-500">Revenue by payment method</p>
        </div>
        <span
          className="flex size-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-700"
          aria-hidden="true"
        >
          <CircleDollarSign size={21} />
        </span>
      </div>

      <div className="mt-7 flex items-start gap-3">
        <CircleDollarSign className="mt-1 shrink-0 text-slate-700" size={35} strokeWidth={1.5} />
        <div>
          <p className="text-sm font-medium text-slate-500">Total income</p>
          <p className="mt-1 text-4xl font-medium tracking-[-0.06em] sm:text-[2.75rem]">
            {formatCurrency(incomeSummary.totalIncome)}
          </p>
          <p className="mt-2 text-xs text-slate-400">
            {formatDateRange(incomeSummary.dataRange.startDate, incomeSummary.dataRange.endDate)}
          </p>
        </div>
      </div>

      <div className="mt-7 border-t border-dashed border-slate-300 pt-6">
        {paymentMethods.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2">
            {paymentMethods.map(([method, amount], methodIndex) => {
              const percentage =
                incomeSummary.totalIncome > 0
                  ? Math.min(100, Math.max(0, (amount / incomeSummary.totalIncome) * 100))
                  : 0;

              return (
                <div
                  className={`border-l-4 pl-3 ${
                    methodIndex % 2 === 0 ? 'border-emerald-500' : 'border-amber-500'
                  }`}
                  key={method}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-medium capitalize text-slate-800">{method}</p>
                      <p className="mt-1 text-sm text-slate-500">{formatCurrency(amount)}</p>
                    </div>
                    <span className="text-xs font-medium text-slate-400">
                      {Math.round(percentage)}%
                    </span>
                  </div>
                  <Progress
                    aria-label={`${method} income share`}
                    className={`mt-4 h-14 rounded-l-none rounded-r-xl bg-slate-100/90 [&>div]:rounded-r-xl [&>div]:transition-[transform] [&>div]:duration-500 [&>div]:ease-out ${
                      methodIndex % 2 === 0 ? '[&>div]:bg-emerald-500' : '[&>div]:bg-amber-500'
                    }`}
                    value={percentage}
                  />
                </div>
              );
            })}
          </div>
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
      className="min-h-full rounded-3xl border border-slate-200 bg-white p-5 text-slate-950 shadow-[0_18px_40px_-28px_rgba(15,23,42,0.42)] sm:p-6"
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="block h-7 w-44 animate-pulse rounded-md bg-slate-200" />
          <span className="block h-3 w-40 animate-pulse rounded-md bg-slate-200" />
        </div>
        <span className="size-10 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="mt-7 flex items-start gap-3">
        <span className="mt-1 size-9 animate-pulse rounded-full bg-slate-200" />
        <div className="space-y-2">
          <span className="block h-3 w-24 animate-pulse rounded-md bg-slate-200" />
          <span className="block h-10 w-36 animate-pulse rounded-md bg-slate-200" />
          <span className="block h-3 w-32 animate-pulse rounded-md bg-slate-200" />
        </div>
      </div>
      <div className="mt-7 grid gap-6 border-t border-dashed border-slate-300 pt-6 sm:grid-cols-2">
        {Array.from({ length: 2 }, (_, skeletonIndex) => (
          <div className="border-l-4 border-slate-200 pl-3" key={skeletonIndex}>
            <div className="flex justify-between gap-3">
              <div className="space-y-2">
                <span className="block h-3 w-20 animate-pulse rounded-md bg-slate-200" />
                <span className="block h-3 w-16 animate-pulse rounded-md bg-slate-200" />
              </div>
              <span className="h-3 w-8 animate-pulse rounded-md bg-slate-200" />
            </div>
            <span className="mt-4 block h-14 w-full animate-pulse rounded-r-xl bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
  );
}
