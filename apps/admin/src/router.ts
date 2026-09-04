import { lazy } from 'react';
import { RoleEnum } from '@my-monorepo/utils/enum';

const Dashboard = lazy(() => import('./views/dashboard/Dashboard'));

const Permission = {
  adminAndStaff: [RoleEnum.admin, RoleEnum.staff],
  adminOnly: [RoleEnum.admin],
  staffOnly: [RoleEnum.staff],
};

const RoutesLayoutData = [
  {
    id: 1,
    path: '/',
    name: 'Dashboard',
    element: Dashboard,
    exact: true,
    permission: Permission.adminAndStaff,
  },
  {
    id: 2,
    path: '/dashboard',
    name: 'Dashboard',
    element: Dashboard,
    exact: true,
    permission: Permission.adminAndStaff,
  },
];

export default RoutesLayoutData;
