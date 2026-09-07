import { useQuery } from '@tanstack/react-query';
import { GetOrderStatusCountApi } from '@my-monorepo/api-client/services/dashboard.service';
import type { DashboardDateRange } from '@helpers/dashboardDateRange';

export interface DashboardStatusCount {
  label: string;
  count: number;
}

const formatStatusLabel = (status: string) =>
  status.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

export const useDashboardQuery = (dateRange: DashboardDateRange) => {
  return useQuery({
    queryKey: ['dashboard', 'order-status-count', dateRange],
    queryFn: async () => {
      const response = await GetOrderStatusCountApi(dateRange);
      return Object.entries(response.data.data.data).map(([status, count]) => ({
        label: formatStatusLabel(status),
        count,
      }));
    },
  });
};
