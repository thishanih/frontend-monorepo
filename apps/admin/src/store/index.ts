import { create } from 'zustand';
import { createAuthSlice, type AuthSlice } from './authSlice';
import { createDashboardSlice, type DashboardSlice } from '../views/dashboard/store/dashboardSlice';

export type AppStore = AuthSlice & DashboardSlice;

export const useAppStore = create<AppStore>()((...args) => ({
  ...createAuthSlice(...args),
  ...createDashboardSlice(...args),
}));
