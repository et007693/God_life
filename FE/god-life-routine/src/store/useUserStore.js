import { create } from "zustand";

const useUserStore = create((set) => ({
    user: null,
    accessToken: null,
    setUser: (user) => set({ user }),
    setAccessToken: (accessToken) => set({ accessToken }),
}));

export default useUserStore;