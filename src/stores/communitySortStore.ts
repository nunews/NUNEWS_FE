import { create } from "zustand";

type SortOption = "최신순" | "인기순";

type SortState = {
  sortOption: SortOption;
  setSortOption: (option: SortOption) => void;
};

export const useSortStore = create<SortState>((set) => ({
  sortOption: "최신순",
  setSortOption: (option) => set({ sortOption: option }),
}));
