import type { StateCreator } from 'zustand';

export interface DashboardSlice {
  dashboardLoading: boolean;
  dashboardError: string | null;
  setDashboardLoading: (isLoading: boolean) => void;
  setDashboardError: (error: string | null) => void;
  resetDashboard: () => void;
}

export const createDashboardSlice: StateCreator<DashboardSlice> = (set) => ({
  dashboardLoading: false,
  dashboardError: null,
  setDashboardLoading: (dashboardLoading) => set({ dashboardLoading }),
  setDashboardError: (dashboardError) => set({ dashboardError }),
  resetDashboard: () => set({ dashboardLoading: false, dashboardError: null }),
});
