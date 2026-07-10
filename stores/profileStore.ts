import { create } from "zustand";

interface ProfileStore {
  name: string;
  avatarUrl: string | null;

  setProfile: (name: string, avatarUrl: string | null) => void;

  updateName: (name: string) => void;

  updateAvatar: (avatarUrl: string | null) => void;

  clearProfile: () => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  name: "Your Name",

  avatarUrl: null,

  setProfile: (name, avatarUrl) =>
    set({
      name,
      avatarUrl,
    }),

  updateName: (name) =>
    set({
      name,
    }),

  updateAvatar: (avatarUrl) =>
    set({
      avatarUrl,
    }),

  clearProfile: () =>
    set({
      name: "Your Name",
      avatarUrl: null,
    }),
}));
