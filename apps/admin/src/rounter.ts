import { lazy } from 'react';
import { RoleEnum } from '@my-monorepo/utils/enum';

const Dashboard = lazy(() => import('./views/dashboard/Dashboard'));

const RoutesLayoutData = [
  {
    path: '/',
    name: 'Dashboard',
    element: Dashboard,
    exact: true,
    permission: RoleEnum.admin,
  },
  {
    path: '/',
    name: 'Dashboard',
    element: Dashboard,
    exact: true,
    permission: RoleEnum.staff,
  },
];

export default RoutesLayoutData;
