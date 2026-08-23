export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponseData {
  userid: string;
  userName: string;
  userType: string;
  userStatus: string;
  accessToken: string;
  refreshToken: string;
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
