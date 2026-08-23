import { Fragment, Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Login = lazy(() => import('./views/auth/views/Login'));
const Dashboard = lazy(() => import('./views/dashboard/Dashboard'));
const ProtectedRoute = lazy(() => import('./helpers/ProtectRoute'));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <p className="text-secondary-text mt-4 text-base font-medium">
            Loading data for your organization.
          </p>
        </div>
      }
    >
      <Fragment>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/sign-in" element={<Login />} />
          <Route element={<ProtectedRoute />}>
            <Route path="*" element={<Dashboard />} />
          </Route>
        </Routes>
      </Fragment>
    </Suspense>
  );
}

export default App;
