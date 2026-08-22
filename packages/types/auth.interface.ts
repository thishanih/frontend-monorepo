export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginRes {
  token: string;
  refresh_token: string;
  token_life_seconds: number;
  result: LoginResult;
  is_success: boolean;
}

export interface LoginResult {
  username: string;
  party_id: number;
  status: string;
}

export interface ForgotPasswordPayload {
  username: string;
}

export interface UserInfo {
  first_name: string;
  middle_name: null;
  last_name: string;
  username: string;
  party_id: number;
  id: number;
}

export interface RefreshTokenRes {
  token: string;
  refreshToken: string;
  tokenLifeInSeconds: number;
}

export interface ResetPasswordPayload {
  username: string;
  token: string;
  password: string;
}

export interface validateTokenRes {
  message: string;
  username: string;
}

export interface UserVerificationPayload {
  roleId: string;
  response: string;
}
