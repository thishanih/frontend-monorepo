import type { CSSProperties } from 'react';
import { ArrowUpRight, TrendingUp } from 'lucide-react';

type DashboardStatusTileTone = 'active' | 'default';

interface DashboardStatusTileProps {
  count: number;
  label: string;
  rowDelay: string;
  tone: DashboardStatusTileTone;
}

export default function DashboardStatusTile({
  count,
  label,
  rowDelay,
  tone,
}: DashboardStatusTileProps) {
  const isActive = tone === 'active';

  return (
    <div
      className={`w-full max-w-80 rounded-xl border p-3 transition-[transform,box-shadow] duration-200 ease-out motion-safe:animate-[dashboard-row-enter_550ms_var(--row-delay)_var(--dashboard-motion-ease)_both] ${
        isActive
          ? 'bg-linear-to-br border-transparent from-[#061a35] via-[#0b3f77] to-[#1677a8] text-slate-50 '
          : 'border-slate-200 bg-white text-slate-950 '
      }`}
      style={{ '--row-delay': rowDelay } as CSSProperties}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-lg font-medium tracking-tight">{label} Orders</p>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-full border border-current ${
            isActive ? 'bg-white text-slate-950' : ''
          }`}
          aria-hidden="true"
        >
          <ArrowUpRight size={16} />
        </span>
      </div>
      <p className="mt-4 text-3xl font-medium tracking-tighter">{count.toLocaleString()}</p>
      <div className="mt-3 flex items-center gap-2 text-[11px] opacity-75">
        <TrendingUp size={14} />
        <span>Current order status</span>
      </div>
    </div>
  );
}
