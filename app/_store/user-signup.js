import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useSignupStore = create(
  persist(
    (set, get) => ({
      body: {
        status: 1,
        mailAddress: null,
        password: null,
        birthday: null,
        firstName: null,
        lastName: null,
        firstKana: null,
        lastKana: null,
        tel: null,
        gender: null,
        zipCode1: null,
        zipCode2: null,
        prefecture: null,
        address1: null,
        address2: null,
        address3: null,
        isAcceptMail: null,
      },
      setBody: (payload) => set({ body: { ...get().body, ...payload } }),
      getBody: () => get().body,
      resetBody: () =>
        set({
          body: {
            status: 1,
          },
        }),
    }),
    {
      name: "signup-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
