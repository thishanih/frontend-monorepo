import type {
  IncomeSummaryData,
  IncomeSummaryParams,
  OrderPerformanceChartData,
  OrderPerformanceChartParams,
  OrderStatusCountData,
  OrderStatusCountParams,
  ProductSaleData,
  ProductSaleParams,
} from '../../types/dashboard.interface';
import type { ApiResponse } from '../../types/common.interface';
import axiosInstance from '../client';

export type {
  IncomeSummaryData,
  IncomeSummaryParams,
  OrderPerformanceChartData,
  OrderPerformanceChartParams,
  OrderStatusCountData,
  OrderStatusCountParams,
  ProductSaleData,
  ProductSaleParams,
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

export const GetOrderPerformanceChartApi = async (params: OrderPerformanceChartParams) => {
  return axiosInstance.get<ApiResponse<OrderPerformanceChartData>>(
    '/dashboard/admin/order-performance-chart',
    { params },
  );
};

export const GetProductSaleApi = async (params: ProductSaleParams) => {
  return axiosInstance.get<ApiResponse<ProductSaleData>>('/dashboard/admin/product-sale', {
    params,
  });
};
