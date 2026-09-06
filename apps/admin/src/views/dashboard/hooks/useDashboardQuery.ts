import { useQuery } from '@tanstack/react-query';
import { GetOrderStatusCountApi } from '@my-monorepo/api-client/services/dashboard.service';

export interface DashboardStatusCount {
  label: string;
  count: number;
}

const formatStatusLabel = (status: string) =>
  status.replace(/[-_]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

const getDateRange = () => {
  const today = new Date();
  const endDate = today.toISOString().slice(0, 10);
  const startDate = `${today.getUTCFullYear()}-01-01`;

  return { startDate, endDate };
};

export const useDashboardQuery = () => {
  const dateRange = getDateRange();

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
