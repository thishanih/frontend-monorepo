import { useDashboardQuery } from '../hooks/useDashboardQuery';
import DashboardStatusListLoading from './DashboardStatusListLoading';
import DashboardStatusTile from './DashboardStatusTile';

export default function DashboardStatusList() {
  const { data: statusCounts = [], isLoading, isError, refetch } = useDashboardQuery();

  if (isLoading) {
    return <DashboardStatusListLoading />;
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="text-sm">Unable to load order status data.</p>
        <button
          className="mt-3 text-sm font-semibold underline underline-offset-4"
          onClick={() => refetch()}
          type="button"
        >
          Try again
        </button>
      </div>
    );
  }

  if (statusCounts.length === 0) {
    return (
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">No order status data is available yet.</p>
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
