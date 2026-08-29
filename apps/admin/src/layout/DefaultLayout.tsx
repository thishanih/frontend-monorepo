import { Route, Routes } from 'react-router-dom';
import RoutesLayoutData from '../rounter';
import { AppHeader } from '../components/AppHeader';

export default function DefaultLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <div className="min-w-0 flex-1">
        <AppHeader />
        <main className="p-4 sm:p-6 lg:p-8">
          <Routes>
            {RoutesLayoutData.map((route) => (
              <Route
                key={`${route.permission}-${route.path}`}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </main>
      </div>
    </div>
  );
}
