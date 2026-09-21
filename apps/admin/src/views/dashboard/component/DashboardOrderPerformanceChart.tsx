import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, XAxis, YAxis } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  DataState,
  type ChartConfig,
} from '@my-monorepo/ui';
import { useDashboardProductSaleQuery } from '../hooks/useDashboardProductSaleQuery';
import { useDashboardOrderPerformanceQuery } from '../hooks/useDashboardOrderPerformanceQuery';

const chartConfig = {
  qty: { label: 'Units sold' },
  online: { color: '#7c3aed', label: 'Online' },
  cash: { color: '#10b981', label: 'Cash' },
} satisfies ChartConfig;

const chartColors = ['#7c3aed', '#14b8a6', '#ec4899', '#f59e0b', '#0ea5e9', '#84cc16'];

const dateRangeFormatter = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
});

const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  timeZone: 'UTC',
});

const formatDateRange = (startDate: string, endDate: string) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.valueOf()) || Number.isNaN(end.valueOf())) {
    return 'Current month';
  }

  return `${dateRangeFormatter.format(start)} - ${dateRangeFormatter.format(end)}`;
};

const formatDate = (value: unknown) => {
  const date = new Date(String(value));
  return Number.isNaN(date.valueOf()) ? String(value ?? '') : dateFormatter.format(date);
};

export default function DashboardOrderPerformanceChart() {
  const productSaleQuery = useDashboardProductSaleQuery();
  const orderPerformanceQuery = useDashboardOrderPerformanceQuery();
  const productSale = productSaleQuery.data;
  const performance = orderPerformanceQuery.data;
  const performanceChartData =
    performance?.data.map((item) => ({
      cash: item.paymentSummary.Cash,
      date: item.date,
      online: item.paymentSummary.Online,
    })) ?? [];
  const isLoading = productSaleQuery.isLoading || orderPerformanceQuery.isLoading;
  const isError = productSaleQuery.isError || orderPerformanceQuery.isError;
  const isRefetching = productSaleQuery.isRefetching || orderPerformanceQuery.isRefetching;
  const refetch = async () => {
    await Promise.all([productSaleQuery.refetch(), orderPerformanceQuery.refetch()]);
  };

  if (isLoading) {
    return <DashboardOrderPerformanceChartLoading />;
  }

  if (isError) {
    return (
      <div className="flex w-full justify-center rounded-lg p-5 text-slate-950 sm:p-6">
        <DataState
          className="min-h-56 gap-3"
          description="Unable to load this month's dashboard charts."
          icon={<PieChartIcon />}
          isRetrying={isRefetching}
          onRetry={() => refetch()}
          title="Dashboard charts"
          variant="error"
        />
      </div>
    );
  }

  return (
    <div className="mt-10 w-full rounded-lg text-slate-950">
      <div className="flex w-full flex-col gap-1">
        <div className="w-full">
          <p className="text-4xl font-semibold uppercase tracking-[-0.035em]">
            This month&apos;s product sales
          </p>
          <p className="mt-1 text-lg text-slate-500">
            {productSale?.dataRange
              ? formatDateRange(productSale.dataRange.startDate, productSale.dataRange.endDate)
              : 'Current month'}
          </p>
        </div>
      </div>

      <div className="mt-10 grid items-start gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="bg-linear-to-br flex min-w-0 flex-col rounded-md border-transparent from-sky-400 via-sky-100 to-sky-50 p-4 text-slate-50">
          <p className="mb-1 text-xl font-semibold text-slate-800">Product sales mix</p>
          <p className="mb-3 text-sm text-slate-600">Share of units sold by product.</p>
          {productSale?.data.length ? (
            <div className="w-full max-w-sm rounded-2xl p-3">
              <ChartContainer className="h-72 w-full" config={chartConfig}>
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Pie
                    data={productSale.data}
                    dataKey="qty"
                    innerRadius="58%"
                    nameKey="productName"
                    outerRadius="82%"
                    paddingAngle={2}
                    strokeWidth={0}
                  >
                    {productSale.data.map((item, index) => (
                      <Cell fill={chartColors[index % chartColors.length]} key={item.productCode} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </div>
          ) : (
            <DataState
              className="min-h-56 gap-3"
              description="No product sales data is available yet."
              icon={<PieChartIcon />}
              title="No pie chart data"
            />
          )}
        </div>

        <div className="min-w-0">
          <p className="mb-1 text-xl font-semibold text-slate-800">Daily order performance</p>
          <p className="mb-3 text-sm text-slate-500">Cash and online orders by day.</p>
          {performanceChartData.length ? (
            <ChartContainer className="h-72" config={chartConfig}>
              <BarChart data={performanceChartData} margin={{ left: 4, right: 4 }}>
                <CartesianGrid vertical={false} />
                <XAxis
                  axisLine={false}
                  dataKey="date"
                  height={52}
                  interval={0}
                  minTickGap={0}
                  tick={{ fontSize: 11 }}
                  tickFormatter={formatDate}
                  tickLine={false}
                  tickMargin={10}
                  angle={-35}
                  textAnchor="end"
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
              icon={<PieChartIcon />}
              title="No bar chart data"
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DashboardOrderPerformanceChartLoading() {
  return (
    <div
      aria-label="Loading order performance chart"
      className="w-full rounded-lg border border-slate-200 bg-white p-5 text-slate-950 sm:p-6"
      role="status"
    >
      <div className="flex items-end justify-between gap-3">
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
