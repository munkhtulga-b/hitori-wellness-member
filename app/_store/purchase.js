import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
  branch: null,
  item: null,
  card: null,
};

export const usePurchaseStore = create(
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
      name: "purchase-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
