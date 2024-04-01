import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const initialState = {
  branch: null,
  program: null,
  // coach: null,
  time: null,
};

export const useReservationStore = create(
  persist(
    (set, get) => ({
      body: initialState,
      setBody: (payload) => set({ body: { ...get().body, ...payload } }),
      getBody: () => get().body,
      editBody: (payload) => {
        const keys = Object.keys(get().body);
        const idx = keys.indexOf(payload);
        for (let i = idx; i < Object.keys(get().body).length; i++) {
          set({ body: { ...get().body, [keys[i]]: null } });
        }
      },
      resetBody: () =>
        set({
          body: initialState,
        }),
    }),
    {
      name: "reservation-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
