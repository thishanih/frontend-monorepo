import type { ApiClient } from "../client";

export type LoginRequest = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: string;
  email: string;
  name?: string;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export class AuthService {
  constructor(private readonly client: ApiClient) {}

  login(credentials: LoginRequest): Promise<AuthResponse> {
    return this.client.request<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  logout(): Promise<void> {
    return this.client.request<void>("/auth/logout", { method: "POST" });
  }

  me(): Promise<AuthUser> {
    return this.client.request<AuthUser>("/auth/me");
  }
}
