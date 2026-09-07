import type {
  IncomeSummaryData,
  IncomeSummaryParams,
  OrderStatusCountData,
  OrderStatusCountParams,
} from '../../types/dashboard.interface';
import type { ApiResponse } from '../../types/common.interface';
import axiosInstance from '../client';

export type {
  IncomeSummaryData,
  IncomeSummaryParams,
  OrderStatusCountData,
  OrderStatusCountParams,
} from '../../types/dashboard.interface';

export const GetOrderStatusCountApi = async (params: OrderStatusCountParams) => {
  return axiosInstance.get<ApiResponse<OrderStatusCountData>>(
    '/dashboard/admin/order-status-count',
    { params },
  );
};

export const GetIncomeSummaryApi = async (params: IncomeSummaryParams) => {
  return axiosInstance.get<ApiResponse<IncomeSummaryData>>('/dashboard/admin/income-summary', {
    params,
  });
};
