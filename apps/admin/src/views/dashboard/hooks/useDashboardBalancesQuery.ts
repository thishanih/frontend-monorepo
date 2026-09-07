import { useQuery } from '@tanstack/react-query';
import { GetIncomeSummaryApi } from '@my-monorepo/api-client/services/dashboard.service';
import type { DashboardDateRange } from '@helpers/dashboardDateRange';

export const useDashboardBalancesQuery = (dateRange: DashboardDateRange) => {
  return useQuery({
    queryKey: ['dashboard', 'income-summary', dateRange],
    queryFn: async () => {
      const response = await GetIncomeSummaryApi(dateRange);
      return response.data.data;
    },
  });
};
