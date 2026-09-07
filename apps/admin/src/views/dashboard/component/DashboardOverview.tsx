import { ChartNoAxesCombined } from 'lucide-react';
import { useDashboardQuery } from '../hooks/useDashboardQuery';
import DashboardStatusList from './DashboardStatusList';
import './Dashboardcard.css';

export default function DashboardOverview() {
  const { data: statusCounts = [], isLoading, isError, refetch } = useDashboardQuery();

  return (
    <section className="dashboard-card relative overflow-hidden border border-slate-200 bg-white">
      <div className="dashboard-card__aurora">
        <div className="dashboard-card__wave-layer dashboard-card__wave-layer--sky">
          <svg
            aria-hidden="true"
            className="dashboard-card__wave dashboard-card__wave--sky"
            preserveAspectRatio="none"
            viewBox="0 0 2400 300"
          >
            <defs>
              <linearGradient id="dashboard-sky-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#93c5fd" />
                <stop offset="100%" stopColor="#e0e7ff" />
              </linearGradient>
            </defs>
            <path
              d="M0,170 C200,110 400,230 600,170 C800,110 1000,230 1200,170 C1400,110 1600,230 1800,170 C2000,110 2200,230 2400,170 L2400,300 L0,300 Z"
              fill="url(#dashboard-sky-gradient)"
            />
            <path
              d="M0,170 C200,110 400,230 600,170 C800,110 1000,230 1200,170 C1400,110 1600,230 1800,170 C2000,110 2200,230 2400,170"
              fill="none"
              opacity="0.7"
              stroke="#ffffff"
              strokeWidth="7"
            />
          </svg>
        </div>
        <div className="dashboard-card__wave-layer dashboard-card__wave-layer--peach">
          <svg
            aria-hidden="true"
            className="dashboard-card__wave dashboard-card__wave--peach"
            preserveAspectRatio="none"
            viewBox="0 0 2400 300"
          >
            <defs>
              <linearGradient id="dashboard-peach-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fdba74" />
                <stop offset="100%" stopColor="#fed7aa" />
              </linearGradient>
            </defs>
            <path
              d="M0,150 C200,90 400,210 600,150 C800,90 1000,210 1200,150 C1400,90 1600,210 1800,150 C2000,90 2200,210 2400,150 L2400,300 L0,300 Z"
              fill="url(#dashboard-peach-gradient)"
            />
            <path
              d="M0,150 C200,90 400,210 600,150 C800,90 1000,210 1200,150 C1400,90 1600,210 1800,150 C2000,90 2200,210 2400,150"
              fill="none"
              opacity="0.62"
              stroke="#fff7ed"
              strokeWidth="8"
            />
          </svg>
        </div>
        <div className="dashboard-card__wave-layer dashboard-card__wave-layer--violet">
          <svg
            aria-hidden="true"
            className="dashboard-card__wave dashboard-card__wave--violet"
            preserveAspectRatio="none"
            viewBox="0 0 2400 300"
          >
            <defs>
              <linearGradient id="dashboard-violet-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c4b5fd" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <path
              d="M0,130 C200,190 400,70 600,130 C800,190 1000,70 1200,130 C1400,190 1600,70 1800,130 C2000,190 2200,70 2400,130 L2400,300 L0,300 Z"
              fill="url(#dashboard-violet-gradient)"
            />
            <path
              d="M0,130 C200,190 400,70 600,130 C800,190 1000,70 1200,130 C1400,190 1600,70 1800,130 C2000,190 2200,70 2400,130"
              fill="none"
              opacity="0.68"
              stroke="#ede9fe"
              strokeWidth="7"
            />
          </svg>
        </div>
        <div className="dashboard-card__wave-layer dashboard-card__wave-layer--pink">
          <svg
            aria-hidden="true"
            className="dashboard-card__wave dashboard-card__wave--pink"
            preserveAspectRatio="none"
            viewBox="0 0 2400 300"
          >
            <defs>
              <linearGradient id="dashboard-pink-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f9a8d4" />
                <stop offset="100%" stopColor="#f472b6" />
              </linearGradient>
            </defs>
            <path
              d="M0,110 C200,160 400,60 600,110 C800,160 1000,60 1200,110 C1400,160 1600,60 1800,110 C2000,160 2200,60 2400,110 L2400,300 L0,300 Z"
              fill="url(#dashboard-pink-gradient)"
            />
            <path
              d="M0,110 C200,160 400,60 600,110 C800,160 1000,60 1200,110 C1400,160 1600,60 1800,110 C2000,160 2200,60 2400,110"
              fill="none"
              opacity="0.72"
              stroke="#fdf2f8"
              strokeWidth="8"
            />
          </svg>
        </div>
      </div>
      <div className="absolute inset-0 bg-white/0" />

      <div className="dashboard-card__content relative z-10 max-w-2xl p-6 text-slate-950 sm:p-8 lg:p-10">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-3xl font-semibold uppercase text-slate-950">Order status overview</p>
            <p className="mt-2 text-sm text-slate-700/80">Total orders across all statuses</p>
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
