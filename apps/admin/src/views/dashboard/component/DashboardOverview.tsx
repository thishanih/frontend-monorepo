import { ChartNoAxesCombined } from 'lucide-react';
import { useDashboardQuery } from '../hooks/useDashboardQuery';
import DashboardStatusList from './DashboardStatusList';
import DashboardStatusListLoading from './DashboardStatusListLoading';
import './Dashboardcard.css';

export default function DashboardOverview() {
  const { data: statusCounts = [], isLoading, isError, refetch } = useDashboardQuery();

  if (isLoading) {
    return (
      <div className="dashboard-card relative min-h-[620px] overflow-hidden border border-slate-200 bg-slate-950 p-6 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.45)] sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-slate-950/80" />
        <div className="relative z-10 max-w-2xl text-white">
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
            Order status overview
          </p>
          <div className="mt-10">
            <DashboardStatusListLoading />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-red-700">
        <p className="text-sm">Unable to load order status data.</p>
        <button
          className="mt-3 text-sm font-semibold underline underline-offset-4"
          onClick={() => void refetch()}
          type="button"
        >
          Try again
        </button>
      </div>
    );
  }

  if (statusCounts.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm text-slate-500">No order status data is available yet.</p>
      </div>
    );
  }

  return (
    <section className="dashboard-card relative overflow-hidden border border-slate-200 shadow-[0_24px_70px_-36px_rgba(15,23,42,0.45)]">
      <img
        alt="Fresh coffee prepared at a cafe"
        className="dashboard-card__background absolute inset-0 size-full object-cover"
        src="https://images.unsplash.com/photo-1636955840493-f43a02bfa064?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <div className="absolute inset-0 bg-slate-950/20" />

      <div className="dashboard-card__content relative z-10 max-w-2xl p-6 text-white sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-white/70">
              Order status overview
            </p>
            <p className="mt-2 text-sm text-white/70">Total orders across all statuses</p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-lime-300 text-slate-950">
            <ChartNoAxesCombined aria-hidden="true" size={23} />
          </div>
        </div>

        <DashboardStatusList statusCounts={statusCounts} />
      </div>
    </section>
  );
}
