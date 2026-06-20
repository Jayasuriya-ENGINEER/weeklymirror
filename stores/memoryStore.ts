import { create } from "zustand";

interface Memory {
  id: string;
  note: string;
  image?: string | null;
}

interface MemoryStore {
  memories: Memory[];

  addMemory: (memory: Memory) => void;

  removeMemory: (id: string) => void;
}

export const useMemoryStore = create<MemoryStore>((set) => ({
  memories: [],

  addMemory: (memory) =>
    set((state) => ({
      memories: [memory, ...state.memories],
    })),

  removeMemory: (id) =>
    set((state) => ({
      memories: state.memories.filter((m) => m.id !== id),
    })),
}));
