import { Empty, EmptyDescription, EmptyHeader, EmptyTitle, RetryButton } from '@my-monorepo/ui';
import { useDashboardQuery } from '../hooks/useDashboardQuery';
import type { DashboardDateRange } from '@helpers/dashboardDateRange';
import DashboardStatusListLoading from './DashboardStatusListLoading';
import DashboardStatusTile from './DashboardStatusTile';

interface DashboardStatusListProps {
  dateRange: DashboardDateRange;
}

export default function DashboardStatusList({ dateRange }: DashboardStatusListProps) {
  const { data: statusCounts = [], isLoading, isError, refetch } = useDashboardQuery(dateRange);

  if (isLoading) {
    return <DashboardStatusListLoading />;
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="text-sm">Unable to load order status data.</p>
        <RetryButton
          className="mt-3 text-sm underline underline-offset-4"
          size="sm"
          variant="ghost"
          onClick={() => refetch()}
        />
      </div>
    );
  }

  if (statusCounts.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <Empty className="min-h-20 gap-2">
          <EmptyHeader>
            <EmptyTitle className="text-base">No order status data</EmptyTitle>
            <EmptyDescription>No order status data is available yet.</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </div>
    );
  }

  return (
    <div className="mt-6 grid justify-start gap-2 sm:grid-cols-[repeat(2,minmax(0,15rem))]">
      {statusCounts.map((item, index) => {
        const isProcessing = item.label.toLowerCase() === 'processing';
        return (
          <DashboardStatusTile
            count={item.count}
            key={item.label}
            label={item.label}
            rowDelay={`${index * 90}ms`}
            tone={isProcessing ? 'active' : 'default'}
          />
        );
      })}
    </div>
  );
}
