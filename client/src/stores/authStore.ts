import { create } from "zustand";
interface UserState {
  nickname: string | null;
  interest: string[];

  setUser: (data: { interest: string[] | []; nickname: string }) => void;

  clearUser: () => void;
}
export const useAuthStore = create<UserState>((set) => ({
  nickname: null,
  interest: [],

  setUser: ({ nickname, interest }) =>
    set({
      nickname,
      interest,
    }),
  clearUser: () =>
    set({
      nickname: null,
      interest: [],
    }),
}));
