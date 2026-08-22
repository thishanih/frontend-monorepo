import axios, { AxiosInstance } from "axios";
import {
  LoginPayload,
  LoginRes,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  UserVerificationPayload,
  RefreshTokenRes,
  validateTokenRes,
} from "../../types/auth.interface";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Replace with your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

export const Login = async (payload: LoginPayload) => {
  const res = await axiosInstance.post<LoginRes>(`/user/login`, payload);
  return res;
};

export const ForgetPassword = async (payload: ForgotPasswordPayload) => {
  const res = await axiosInstance.post(`/auth/forgot-password`, payload);
  return res;
};

export const VerificationAuth = async (payload: UserVerificationPayload) => {
  const res = await axiosInstance.post(`/roles/respond/`, payload);
  return res;
};

export const ResetPassword = async (resetPayload: ResetPasswordPayload) => {
  const res = await axiosInstance.post(`/auth/reset-password`, resetPayload);
  return res;
};

export const RefreshToken = async (refresh_token: string) => {
  const res = await axiosInstance.get<RefreshTokenRes>(`/user/refresh-token`, {
    headers: {
      Authorization: `Bearer ${refresh_token}`,
    },
  });
  return res;
};

export const VerificationToken = async (token: string) => {
  const res = await axiosInstance.get<validateTokenRes>(
    `/auth/validatetoken/${token}`,
  );
  return res;
};
