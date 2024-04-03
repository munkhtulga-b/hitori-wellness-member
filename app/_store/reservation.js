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
      edit: {
        isEditing: false,
        date: null,
      },
      setBody: (payload) => set({ body: { ...get().body, ...payload } }),
      setEdit: (payload) => set({ edit: { ...get().edit, ...payload } }),
      getBody: () => get().body,
      getEdit: () => get().edit,
      editBody: (payload) => {
        const keys = Object.keys(get().body);
        const idx = keys.indexOf(payload);
        for (let i = idx; i < Object.keys(get().body).length; i++) {
          if (keys[i] !== "id") {
            set({ body: { ...get().body, [keys[i]]: null } });
          }
        }
      },
      resetBody: () =>
        set({
          body: initialState,
          edit: {
            isEditing: false,
            date: null,
          },
        }),
    }),
    {
      name: "reservation-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
