export interface OrderStatusCountData {
  data: Record<string, number>;
  dataRange: {
    startDate: string;
    endDate: string;
  };
}

export interface OrderStatusCountParams {
  startDate: string;
  endDate: string;
}

export interface IncomeSummaryData {
  dataRange: {
    startDate: string;
    endDate: string;
  };
  totalIncome: number;
  paymentMethodIncome: Record<string, number>;
}

export interface IncomeSummaryParams {
  startDate: string;
  endDate: string;
}

export interface OrderPerformanceChartPoint {
  date: string;
  orderCount: number;
  totalOrderAmount: number;
  paymentSummary: {
    Online: number;
    Cash: number;
  };
}

export interface OrderPerformanceChartData {
  data: OrderPerformanceChartPoint[];
  dataRange: {
    startDate: string;
    endDate: string;
  };
}

export interface OrderPerformanceChartParams {
  startDate: string;
  endDate: string;
}
