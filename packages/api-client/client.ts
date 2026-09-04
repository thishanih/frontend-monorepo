/**
 * Axios Instance Configuration
 *
 * This module creates and configures a centralized Axios instance for API communication
 * with automatic token management and refresh capabilities.
 *
 * Features:
 * - Automatic JWT token injection in request headers
 * - Token refresh on 401 unauthorized responses
 * - Cookie-based token storage and management
 * - Automatic logout on token refresh failure
 */

import axios from 'axios';
import type { AxiosInstance, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@my-monorepo/utils/config';
import { GetCookie, RemoveCookie, SetCookie } from '@my-monorepo/utils/cookies';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@my-monorepo/utils/enum';

import { RefreshTokenApi } from './services/auth.service';

// Token refresh state management
let isRefreshing = false;
let failedRequestsQueue: Array<(token: string) => void> = [];

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json', // Default content type for JSON APIs
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = GetCookie(ACCESS_TOKEN);
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response;
  },
  async (err) => {
    const originalConfig = err.config;

    // Check if error is due to authentication and not already retried
    if (
      originalConfig &&
      (err.response?.status === 401 || err.response?.status === 403) &&
      !originalConfig._retry
    ) {
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve) => {
          failedRequestsQueue.push((token: string) => {
            originalConfig.headers['Authorization'] = `Bearer ${token}`;
            resolve(axiosInstance(originalConfig));
          });
        });
      }

      originalConfig._retry = true;
      isRefreshing = true;

      try {
        const getRefreshToken = GetCookie(REFRESH_TOKEN);

        if (!getRefreshToken) {
          throw new Error('No refresh token available');
        }

        // Refresh the token using the API
        const res = await RefreshTokenApi(getRefreshToken);
        const newAccessToken = res.data.data.accessToken;

        if (!newAccessToken) {
          throw new Error('Refresh response did not include a new access token');
        }

        // Update the access token in cookies
        SetCookie(ACCESS_TOKEN, newAccessToken);
        SetCookie(REFRESH_TOKEN, res.data.data.refreshToken);

        const accessToken = newAccessToken;

        // Update the authorization header for the original request
        originalConfig.headers.Authorization = `Bearer ${accessToken}`;

        // Process all queued requests with the new token
        failedRequestsQueue.forEach((callback) => callback(accessToken));
        failedRequestsQueue = [];

        return axiosInstance(originalConfig);
      } catch (_error: any) {
        // Clear queue on refresh failure
        failedRequestsQueue = [];

        // Clear tokens and redirect to login
        RemoveCookie(ACCESS_TOKEN);
        RemoveCookie(REFRESH_TOKEN);
        window.location.href = '/sign-in';

        return Promise.reject(_error);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  },
);
export default axiosInstance;
