import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  isAxiosError,
} from "axios";

export class ApiError extends Error {
  readonly status: number;
  readonly body: unknown;

  constructor(status: number, body: unknown) {
    super(`API request failed with status ${status}`);
    this.name = "ApiError";
    this.status = status;
    this.body = body;
  }
}

export type ApiClientOptions = {
  baseUrl: string;
  headers?: HeadersInit;
  getAccessToken?: () => string | null | undefined;
  onUnauthorized?: () => void;
};

function toAxiosHeaders(headers?: HeadersInit): Record<string, string> {
  const normalized = new Headers(headers);
  return Object.fromEntries(normalized.entries());
}

export class ApiClient {
  readonly http: AxiosInstance;

  constructor(options: ApiClientOptions) {
    this.http = axios.create({
      baseURL: options.baseUrl.replace(/\/$/, ""),
      headers: toAxiosHeaders(options.headers),
    });

    this.http.interceptors.request.use((config) => {
      const token = options.getAccessToken?.();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      if (config.data !== undefined && !config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
      return config;
    });

    this.http.interceptors.response.use(
      (response) => response,
      (error: unknown) => {
        if (!isAxiosError(error)) {
          throw error;
        }

        if (error.response?.status === 401) {
          options.onUnauthorized?.();
        }

        throw new ApiError(error.response?.status ?? 0, error.response?.data);
      },
    );
  }

  async request<T>(path: string, init: RequestInit = {}): Promise<T> {
    const config: AxiosRequestConfig = {
      url: path,
      method: init.method,
      headers: toAxiosHeaders(init.headers),
      data: init.body,
    };

    const response = await this.http.request<T>(config);
    return response.data;
  }
}

export function createApiClient(baseUrl: string): ApiClient {
  return new ApiClient({ baseUrl });
}
