export interface DashboardDateRange {
  startDate: string;
  endDate: string;
}

export const getDashboardDateRange = (): DashboardDateRange => {
  const today = new Date();
  const endDate = today.toISOString().slice(0, 10);
  const startDate = `${today.getUTCFullYear()}-01-01`;

  return { startDate, endDate };
};
