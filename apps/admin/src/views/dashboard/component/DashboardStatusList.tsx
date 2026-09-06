import type { CSSProperties } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import type { DashboardStatusCount } from '../hooks/useDashboardQuery';
import DashboardStatusListLoading from './DashboardStatusListLoading';

interface DashboardStatusListProps {
  isError: boolean;
  isLoading: boolean;
  refetch: () => void;
  statusCounts: DashboardStatusCount[];
}

export default function DashboardStatusList({
  isError,
  isLoading,
  refetch,
  statusCounts,
}: DashboardStatusListProps) {
  if (isLoading) {
    return <DashboardStatusListLoading />;
  }

  if (isError) {
    return (
      <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-6 text-red-700">
        <p className="text-sm">Unable to load order status data.</p>
        <button
          className="mt-3 text-sm font-semibold underline underline-offset-4"
          onClick={refetch}
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
    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      {statusCounts.map((item, index) => {
        const isProcessing = item.label.toLowerCase() === 'processing';

        return (
          <div
            className={`dashboard-status-tile ${isProcessing ? 'dashboard-status-tile--active' : ''}`}
            key={item.label}
            style={{ '--row-delay': `${index * 90}ms` } as CSSProperties}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-base font-medium tracking-tight">{item.label} Orders</p>
              <span className="dashboard-status-tile__arrow" aria-hidden="true">
                <ArrowUpRight size={18} />
              </span>
            </div>
            <p className="mt-6 text-4xl font-medium tracking-[-0.07em]">
              {item.count.toLocaleString()}
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs opacity-75">
              <TrendingUp size={15} />
              <span>Current order status</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
