import { create } from "zustand";

interface UserData {
  userId: string | null;
  email: string | null;
  nickname: string | null;
  profile_image: string | null;
  age_range: string | null;
  gender: string | null;
}
interface UserState extends UserData {
  interest: string[];
  isInitialized: boolean;
  setUser: (data: Partial<UserState>) => void;
  clearUser: () => void;
}
export const useAuthStore = create<UserState>((set) => ({
  userId: null,
  email: null,
  nickname: null,
  profile_image: null,
  age_range: null,
  gender: null,
  interest: [],
  isInitialized: false,

  setUser: (data) =>
    set((state) => ({
      ...state,
      ...data,
      isInitialized: true,
    })),

  clearUser: () =>
    set({
      userId: null,
      email: null,
      nickname: null,
      profile_image: null,
      age_range: null,
      gender: null,
      interest: [],
      isInitialized: true,
    }),
}));
