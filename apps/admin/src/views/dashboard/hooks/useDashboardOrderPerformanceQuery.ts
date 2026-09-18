import { useQuery } from '@tanstack/react-query';
import { GetOrderPerformanceChartApi } from '@my-monorepo/api-client/services/dashboard.service';
import { getDashboardCurrentMonthDateRange } from '@helpers/dashboardDateRange';

export const useDashboardOrderPerformanceQuery = () => {
  const dateRange = getDashboardCurrentMonthDateRange();

  return useQuery({
    queryKey: ['dashboard', 'order-performance-chart', dateRange],
    queryFn: async () => {
      const response = await GetOrderPerformanceChartApi(dateRange);
      return response.data.data;
    },
  });
};
