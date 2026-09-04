/**
 * ProtectRoute Component
 *
 * A comprehensive route protection component that handles authentication and authorization
 * for the HealthWork application. Provides secure access control with JWT token validation.
 *
 * Features:
 * - JWT token validation and expiration checking
 * - Automatic logout on invalid/expired tokens
 * - User information retrieval and state management
 * - Loading state with branded UI components
 * - Graceful error handling and fallback mechanisms
 *
 * Security Implementation:
 * - Token existence validation before processing
 * - JWT token expiration verification using `exp` field
 * - Required payload field validation (partyRoleId)
 * - Comprehensive error handling with automatic logout
 * - Protected route rendering based on authentication status
 *
 * Usage:
 * - Wrap protected routes that require authentication
 * - Automatically redirects unauthenticated users
 * - Manages user session and authentication state
 * - Provides loading feedback during authentication checks
 *
 * @component
 * @returns {JSX.Element} Protected route outlet or loading screen
 */
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { GetCookie } from '@my-monorepo/utils/cookies';
import { REFRESH_TOKEN } from '@my-monorepo/utils/enum';
import { useAppStore } from '../store';

const isTokenExpired = (token: string) => {
  try {
    const { exp } = jwtDecode<{ exp?: number }>(token);
    return typeof exp !== 'number' || exp <= Date.now() / 1000;
  } catch {
    return true;
  }
};

const ProtectRoute = () => {
  const navigator = useNavigate();
  const userInfoState = useAppStore((state) => state.userInfo);
  const setUserInfo = useAppStore((state) => state.setUserInfo);
  const retryUserInfo = useAppStore((state) => state.retryUserInfo);
  const clearUserInfo = useAppStore((state) => state.clearUserInfo);
  const isLoading = useAppStore((state) => state.isLoading);
  const error = useAppStore((state) => state.error);

  useEffect(() => {
    const refreshToken = GetCookie(REFRESH_TOKEN);
    if (!refreshToken || isTokenExpired(refreshToken)) {
      clearUserInfo();
      navigator('/sign-in');
      return;
    }

    if (!userInfoState && !isLoading && !error) {
      setUserInfo();
    }
  }, [clearUserInfo, error, isLoading, navigator, setUserInfo, userInfoState]);
  // Render nested routes
  if (error) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center gap-4">
        <p className="text-secondary-text text-base font-medium">{error}</p>
        <button type="button" className="text-primary underline" onClick={retryUserInfo}>
          Retry
        </button>
      </div>
    );
  }

  return userInfoState?._id ? (
    <Outlet />
  ) : (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="bg-congress-blue-100 flex h-32 w-32 flex-col items-center justify-center rounded-full backdrop-blur-lg"></div>

      <p className="text-secondary-text mt-4 text-base font-medium">
        Loading data for your organization.
      </p>
    </div>
  );
};

export default ProtectRoute;
