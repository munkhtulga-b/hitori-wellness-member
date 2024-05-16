import { create } from "zustand";

const useTokenStore = create((set) => ({
  token: null,
  setToken: (payload) => set({ token: payload }),
}));

export default useTokenStore;
