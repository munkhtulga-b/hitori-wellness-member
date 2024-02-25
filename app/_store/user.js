import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";

export const useUserStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (payload) => set({ user: payload }),
      logOut: () => {
        set({ user: null });
        Cookies.remove("token");
      },
    }),
    {
      name: "user-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
