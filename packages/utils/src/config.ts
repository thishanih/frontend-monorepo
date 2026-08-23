const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export const API_BASE_URL = `${apiUrl.replace(/\/$/, '')}/api`;
export const COOKIE_DOMAIN = import.meta.env.VITE_COOKIE_DOMAIN || undefined;
export const COOKIE_SECURE = import.meta.env.VITE_COOKIE_SECURE === 'true';
