import { useQuery } from '@tanstack/react-query';
import { GetProductSaleApi } from '@my-monorepo/api-client/services/dashboard.service';
import { getDashboardCurrentMonthDateRange } from '@helpers/dashboardDateRange';

export const useDashboardProductSaleQuery = () => {
  const dateRange = getDashboardCurrentMonthDateRange();

  return useQuery({
    queryKey: ['dashboard', 'product-sale', dateRange],
    queryFn: async () => {
      const response = await GetProductSaleApi(dateRange);
      return response.data.data;
    },
  });
};
