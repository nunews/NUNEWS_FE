import { create } from "zustand";
interface UserState {
  userId: string | null;
  interest: string[];
  isInitialized: boolean;
  setUser: (data: { interest: string[] | []; userId: string }) => void;
  clearUser: () => void;
}
export const useAuthStore = create<UserState>((set) => ({
  userId: null,
  interest: [],
  isInitialized: false,

  setUser: ({ userId, interest }) =>
    set({
      userId,
      interest,
      isInitialized: true,
    }),
  clearUser: () =>
    set({
      userId: null,
      interest: [],
      isInitialized: true,
    }),
}));
