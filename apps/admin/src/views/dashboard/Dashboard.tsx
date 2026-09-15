import { useState } from 'react';
import DashboardBalances from './component/DashboardBalances';
import DashboardDatePicker from './component/DashboardDatePicker';
import DashboardStatusList from './component/DashboardStatusList';
import { formatDashboardDateRange, getDashboardDateSelection } from '@helpers/dashboardDateRange';
import '@styles/DashboardCard.css';

export default function Dashboard() {
  const [selectedDates, setSelectedDates] = useState(getDashboardDateSelection);
  const dateRange = formatDashboardDateRange(selectedDates);

  return (
    <section className="dashboard-card relative overflow-hidden">
      <div className="StripeHomepageHeroGradient" aria-hidden="true" />


      <div className="dashboard-card__content relative z-10 p-6 text-slate-950 sm:p-8 lg:p-10">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:gap-8">
          <div className="flex flex-col">
            <p className="text-3xl font-semibold uppercase text-slate-950">Order status overview</p>
            <p className="text-sm text-slate-700/80">Total orders across all statuses</p>
          </div>

          <DashboardDatePicker onChange={setSelectedDates} value={selectedDates} />
        </div>

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
          <DashboardStatusList dateRange={dateRange} />
          <DashboardBalances dateRange={dateRange} />
        </div>
      </div>
    </section>
  );
}
