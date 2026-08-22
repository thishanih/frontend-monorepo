import { Fragment, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Login = lazy(() => import("./views/auth/views/Login"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-screen flex-col items-center justify-center">
          <div className="bg-congress-blue-100 flex h-32 w-32 flex-col items-center justify-center rounded-full backdrop-blur-lg">
            {/* <img src={LogoIcon} alt="hexes" className="h-20" /> */}
          </div>

          <p className="text-secondary-text mt-4 text-base font-medium">
            Loading data for your organization.
          </p>
        </div>
      }
    >
      <Fragment>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </Fragment>
    </Suspense>
  );
}

export default App;
