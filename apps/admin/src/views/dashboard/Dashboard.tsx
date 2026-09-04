import { useEffect } from 'react';
import { useAppStore } from '../../store';

export default function Dashboard() {
  const userInfo = useAppStore((state) => state.userInfo);
  const dashboardLoading = useAppStore((state) => state.dashboardLoading);
  const setDashboardLoading = useAppStore((state) => state.setDashboardLoading);

  useEffect(() => {
    setDashboardLoading(false);
  }, [setDashboardLoading]);

  const fullName = [userInfo?.firstName, userInfo?.lastName].filter(Boolean).join(' ');

  return (
    <section className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">Overview</p>
        <h1 className="mt-1 text-2xl font-semibold text-slate-950">
          Welcome{fullName ? `, ${fullName}` : ''}
        </h1>
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm text-slate-500">
          {dashboardLoading ? 'Loading dashboard data...' : 'Your dashboard is ready.'}
        </p>
      </div>
    </section>
  );
}
