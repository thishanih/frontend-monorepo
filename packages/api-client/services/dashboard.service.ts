import type { OrderStatusCountData, OrderStatusCountParams } from '../../types/dashboard.interface';
import type { ApiResponse } from '../../types/common.interface';
import axiosInstance from '../client';

export type { OrderStatusCountData, OrderStatusCountParams } from '../../types/dashboard.interface';

export const GetOrderStatusCountApi = async (params: OrderStatusCountParams) => {
  return axiosInstance.get<ApiResponse<OrderStatusCountData>>(
    '/dashboard/admin/order-status-count',
    { params },
  );
};
