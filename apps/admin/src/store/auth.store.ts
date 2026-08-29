import { create } from 'zustand';
import { ACCESS_TOKEN, REFRESH_TOKEN, RemoveCookie } from '@my-monorepo/utils';
import { LoginUserInfoApi } from '@my-monorepo/api-client/services/auth.service';
import type { UserInfo } from '../../../../packages/types/auth.interface';
import toast from 'react-hot-toast';

interface AuthStore {
  userInfo: UserInfo | null;
  isLoading: boolean;
  error: string | null;
  setUserInfo: () => Promise<void>;
  retryUserInfo: () => Promise<void>;
  clearUserInfo: () => void;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  userInfo: null,
  isLoading: false,
  error: null,
  setUserInfo: async () => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await LoginUserInfoApi();
      set({ userInfo: data.data, isLoading: false, error: null });
    } catch {
      const message = 'Unable to load user information.';
      set({ isLoading: false, error: message });
      toast.error(message);
    }
  },
  retryUserInfo: async () => {
    await useAuthStore.getState().setUserInfo();
  },
  clearUserInfo: () => {
    RemoveCookie(ACCESS_TOKEN);
    RemoveCookie(REFRESH_TOKEN);
    set({ userInfo: null, isLoading: false, error: null });
  },
  signOut: () => {
    RemoveCookie(ACCESS_TOKEN);
    RemoveCookie(REFRESH_TOKEN);
    set({ userInfo: null, isLoading: false, error: null });
  },
}));
