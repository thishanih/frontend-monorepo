import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { BarChart3 } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  DataState,
  type ChartConfig,
} from '@my-monorepo/ui';
import { useDashboardOrderPerformanceQuery } from '../hooks/useDashboardOrderPerformanceQuery';

const chartConfig = {
  online: {
    color: '#8b5cf6',
    label: 'Online',
  },
  cash: {
    color: '#22b573',
    label: 'Cash',
  },
} satisfies ChartConfig;

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
});

const formatDate = (value: unknown) => {
  const date = new Date(String(value));
  return Number.isNaN(date.valueOf()) ? String(value ?? '') : dateFormatter.format(date);
};

export default function DashboardOrderPerformanceChart() {
  const {
    data: performance,
    isError,
    isLoading,
    isRefetching,
    refetch,
  } = useDashboardOrderPerformanceQuery();

  if (isLoading) {
    return <DashboardOrderPerformanceChartLoading />;
  }

  if (isError) {
    return (
      <div className="rounded-lg border border-red-200 bg-white p-5 text-slate-950 sm:p-6">
        <DataState
          className="min-h-56 gap-3"
          description="Unable to load order performance data."
          icon={<BarChart3 />}
          isRetrying={isRefetching}
          onRetry={() => refetch()}
          title="Order performance"
          variant="error"
        />
      </div>
    );
  }

  const chartData =
    performance?.data.map((item) => ({
      cash: item.paymentSummary.Cash,
      date: item.date,
      online: item.paymentSummary.Online,
    })) ?? [];

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 text-slate-950 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-[1.65rem] font-medium tracking-[-0.035em]">
            This month&apos;s order performance
          </p>
          <p className="mt-1 text-sm text-slate-500">Daily payment totals by method</p>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <ChartLegend color="bg-emerald-500" label="Cash" />
          <ChartLegend color="bg-violet-500" label="Online" />
        </div>
      </div>

      {chartData.length > 0 ? (
        <ChartContainer className="container mt-6 h-64" config={chartConfig}>
          <BarChart
            accessibilityLayer
            barCategoryGap="28%"
            data={chartData}
            margin={{ left: 4, right: 4 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="date"
              tickFormatter={formatDate}
              tickLine={false}
              tickMargin={10}
            />
            <YAxis
              axisLine={false}
              tickFormatter={(value: number) => value.toLocaleString('en-US')}
              tickLine={false}
              width={44}
            />
            <ChartTooltip content={<ChartTooltipContent />} labelFormatter={formatDate} />
            <Bar dataKey="cash" fill="var(--color-cash)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="online" fill="var(--color-online)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      ) : (
        <DataState
          className="min-h-56 gap-3"
          description="No order performance data is available yet."
          icon={<BarChart3 />}
          title="No chart data"
        />
      )}
    </div>
  );
}

function ChartLegend({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2">
      <span aria-hidden="true" className={`size-2.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function DashboardOrderPerformanceChartLoading() {
  return (
    <div
      aria-label="Loading order performance chart"
      className="rounded-lg border border-slate-200 bg-white p-5 text-slate-950 sm:p-6"
      role="status"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-2">
          <span className="block h-7 w-48 animate-pulse rounded-md bg-slate-200" />
          <span className="block h-3 w-56 animate-pulse rounded-md bg-slate-200" />
        </div>
        <span className="h-4 w-28 animate-pulse rounded-md bg-slate-200" />
      </div>
      <div className="mt-6 h-64 animate-pulse rounded-md bg-slate-100" />
    </div>
  );
}
