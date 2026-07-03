import { create } from "zustand";
import { Session, User } from "@supabase/supabase-js";



interface AuthStore {
  user: User | null;
  session: Session | null;

  loading: boolean;

  setLoading: (loading: boolean) => void;

  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;

  clearAuth: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  session: null,
  loading: true,

  setLoading: (loading) => set({ loading }),

  setUser: (user) => set({ user }),

  setSession: (session) => set({ session }),

  clearAuth: () =>
    set({
      user: null,
      session: null,
    }),
}));
