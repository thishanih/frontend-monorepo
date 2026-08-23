import type {
  LoginPayload,
  LoginResponseData,
  UserInfo,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  UserVerificationPayload,
  RefreshTokenRes,
  validateTokenRes,
} from '../../types/auth.interface';
import axiosInstance from '../client';
import type { ApiResponse } from '../../types/common.interface';

export const LoginApi = async (payload: LoginPayload) => {
  const res = await axiosInstance.post<ApiResponse<LoginResponseData>>(`/user/login`, payload);
  return res;
};

export const LoginUserInfoApi = async () => {
  const res = await axiosInstance.get<ApiResponse<UserInfo>>(`/user/info`);
  return res;
};

export const ForgotPasswordApi = async (payload: ForgotPasswordPayload) => {
  const res = await axiosInstance.post<ApiResponse<null>>(`/auth/forgot-password`, payload);
  return res;
};

export const VerificationAuthApi = async (payload: UserVerificationPayload) => {
  const res = await axiosInstance.post<ApiResponse<null>>(`/roles/respond/`, payload);
  return res;
};

export const ResetPasswordApi = async (resetPayload: ResetPasswordPayload) => {
  const res = await axiosInstance.post<ApiResponse<null>>(`/auth/reset-password`, resetPayload);
  return res;
};

export const RefreshTokenApi = async (refresh_token: string) => {
  const res = await axiosInstance.get<ApiResponse<RefreshTokenRes>>(`/user/refresh-token`, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });
  return res;
};

export const VerificationTokenApi = async (token: string) => {
  const res = await axiosInstance.get<ApiResponse<validateTokenRes>>(
    `/auth/validatetoken/${token}`,
  );
  return res;
};
