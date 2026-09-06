import { ChartNoAxesCombined } from 'lucide-react';
import { useDashboardQuery } from '../hooks/useDashboardQuery';
import DashboardStatusList from './DashboardStatusList';
import './Dashboardcard.css';

export default function DashboardOverview() {
  const { data: statusCounts = [], isLoading, isError, refetch } = useDashboardQuery();

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
            <p className="text-3xl font-semibold uppercase text-slate-950">Order status overview</p>
            <p className="mt-2 text-sm text-white/70">Total orders across all statuses</p>
          </div>
          <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-lime-300 text-slate-950">
            <ChartNoAxesCombined aria-hidden="true" size={23} />
          </div>
        </div>
        <DashboardStatusList
          isError={isError}
          isLoading={isLoading}
          refetch={() => refetch()}
          statusCounts={statusCounts}
        />
      </div>
    </section>
  );
}
