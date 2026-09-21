import { useState } from 'react';
import { motion } from 'motion/react';
import DashboardBalances from './component/DashboardBalances';
import DashboardDatePicker from './component/DashboardDatePicker';
import DashboardOrderPerformanceChart from './component/DashboardOrderPerformanceChart';
import DashboardStatusList from './component/DashboardStatusList';
import { formatDashboardDateRange, getDashboardDateSelection } from '@helpers/dashboardDateRange';
import '@styles/DashboardCard.css';

export default function Dashboard() {
  const [selectedDates, setSelectedDates] = useState(getDashboardDateSelection);
  const dateRange = formatDashboardDateRange(selectedDates);

  return (
    <div className="flex w-full flex-col px-8">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="dashboard-card relative overflow-hidden"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden="true"
          className="StripeHomepageHeroGradient pointer-events-none absolute inset-0 h-full w-full rounded-lg"
        />

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-card__content relative z-10 p-6 text-slate-950 sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.12, duration: 0.45, ease: 'easeOut' }}
        >
          <div className="flex flex-col items-start justify-between sm:flex-row sm:gap-8">
            <div className="flex flex-col">
              <p className="text-3xl font-semibold uppercase text-slate-950">
                Order status overview
              </p>
              <p className="text-sm text-slate-700/80">Total orders across all statuses</p>
            </div>

            <DashboardDatePicker onChange={setSelectedDates} value={selectedDates} />
          </div>

          <div className="grid items-start lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.7fr)]">
            <DashboardStatusList dateRange={dateRange} />
            <DashboardBalances dateRange={dateRange} />
          </div>
        </motion.div>
      </motion.section>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 18 }}
        transition={{ delay: 0.22, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="mb-10">
          <DashboardOrderPerformanceChart />
        </div>
      </motion.div>
    </div>
  );
}
