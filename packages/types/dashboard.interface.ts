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
