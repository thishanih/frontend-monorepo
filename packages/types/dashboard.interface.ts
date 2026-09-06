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
