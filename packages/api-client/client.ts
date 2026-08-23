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

import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { GetCookie, RemoveCookie, SetCookie } from '@my-monorepo/utils';
import { RefreshToken } from './services/auth.service';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

// Token refresh state management
let isRefreshing = false;
let failedRequestsQueue: Array<(token: string) => void> = [];

const axiosInstance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api', // Replace with your API base URL
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
    if ((err.response?.status === 401 || err.response?.status === 403) && !originalConfig._retry) {
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

        const res = await RefreshToken(getRefreshToken);

        // Update the access token in cookies
        SetCookie(ACCESS_TOKEN, res.data.token);
        SetCookie(REFRESH_TOKEN, res.data.refreshToken);

        // Update the authorization header for the original request
        originalConfig.headers['Authorization'] = `Bearer ${res.data.token}`;

        // Process all queued requests with the new token
        failedRequestsQueue.forEach((callback) => callback(res.data.token));
        failedRequestsQueue = [];

        return axiosInstance(originalConfig);
      } catch (_error: any) {
        // Clear queue on refresh failure
        failedRequestsQueue = [];

        // Clear tokens and redirect to login
        RemoveCookie(ACCESS_TOKEN);
        RemoveCookie(REFRESH_TOKEN);
        window.location.href = '/'; // Redirect to login page

        return Promise.reject(_error);
      } finally {
        isRefreshing = false;
      }
    }
  },
);
export default axiosInstance;
