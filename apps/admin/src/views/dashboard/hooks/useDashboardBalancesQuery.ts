import { useQuery } from '@tanstack/react-query';
import { GetIncomeSummaryApi } from '@my-monorepo/api-client/services/dashboard.service';
import { getDashboardDateRange } from './dashboardDateRange';

export const useDashboardBalancesQuery = () => {
  const dateRange = getDashboardDateRange();

  return useQuery({
    queryKey: ['dashboard', 'income-summary', dateRange],
    queryFn: async () => {
      const response = await GetIncomeSummaryApi(dateRange);
      return response.data.data;
    },
  });
};
