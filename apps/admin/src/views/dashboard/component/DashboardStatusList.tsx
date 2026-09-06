import type { CSSProperties } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';
import type { DashboardStatusCount } from '../hooks/useDashboardQuery';

interface DashboardStatusListProps {
  statusCounts: DashboardStatusCount[];
}

export default function DashboardStatusList({ statusCounts }: DashboardStatusListProps) {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2">
      {statusCounts.map((item, index) => {
        const isProcessing = item.label.toLowerCase() === 'processing';

        return (
          <div
            className={`dashboard-status-tile ${isProcessing ? 'dashboard-status-tile--active' : ''}`}
            key={item.label}
            style={{ '--row-delay': `${index * 90}ms` } as CSSProperties}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-lg font-medium tracking-tight">{item.label} Orders</p>
              <span className="dashboard-status-tile__arrow" aria-hidden="true">
                <ArrowUpRight size={22} />
              </span>
            </div>
            <p className="mt-8 text-5xl font-medium tracking-[-0.07em]">
              {item.count.toLocaleString()}
            </p>
            <div className="mt-5 flex items-center gap-2 text-sm opacity-75">
              <TrendingUp size={17} />
              <span>Current order status</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
