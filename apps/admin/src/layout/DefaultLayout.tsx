/**
 * Renders the authenticated application shell and the routes available to the current user role.
 *
 * @component
 * @returns {JSX.Element} The application header and role-filtered nested routes.
 *
 * @example
 * <Route element={<ProtectRoute />}>
 *   <Route path="*" element={<DefaultLayout />} />
 * </Route>
 *
 * State Management:
 * - Reads the authenticated user's `userType` from the shared Zustand store.
 * - Renders only routes whose `permission` list includes that role.
 */
import { useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import RoutesLayoutData from '../router';
import { AppHeader } from '../components/AppHeader';
import { useAppStore } from '../store';

export default function DefaultLayout() {
  const userType = useAppStore((state) => state.userInfo?.userType);

  const permittedRoutes = useMemo(() => {
    return RoutesLayoutData.filter((route) =>
      userType ? route.permission.includes(userType) : false,
    );
  }, [userType]);

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <div className="min-w-0 flex-1">
        <AppHeader />
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            {permittedRoutes.map((route) => (
              <Route key={route.id} path={route.path} element={<route.element />} />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}
