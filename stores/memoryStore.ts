import { create } from "zustand";

interface MemoryStore {
  refreshKey: number;
  triggerRefresh: () => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  refreshKey: 0,

  triggerRefresh: () =>
    set((state) => ({
      refreshKey: state.refreshKey + 1,
    })),
}));
