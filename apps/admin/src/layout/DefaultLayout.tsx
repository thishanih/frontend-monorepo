import { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import RoutesLayoutData from '../rounter';
import { MobileNavButton, Sidebar } from './Sidebar';

export default function DefaultLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const pageTitle =
    RoutesLayoutData.find((route) => route.path === location.pathname)?.name ?? 'Dashboard';

  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      <Sidebar mobileOpen={mobileOpen} onMobileOpenChange={setMobileOpen} />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-8">
          <MobileNavButton onClick={() => setMobileOpen(true)} />
          <div>
            <p className="text-xs font-medium text-slate-500">Workspace</p>
            <h1 className="text-lg font-semibold">{pageTitle}</h1>
          </div>
        </header>
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
