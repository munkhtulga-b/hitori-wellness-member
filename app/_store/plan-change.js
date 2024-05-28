import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
  current: null,
  changed: null,
};

export const usePlanChangeStorage = create(
  persist(
    (set, get) => ({
      body: initialState,
      setBody: (payload) => set({ body: { ...get().body, ...payload } }),
      getBody: () => get().body,
      resetBody: () =>
        set({
          body: initialState,
        }),
    }),
    {
      name: "plan-change-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
