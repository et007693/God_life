import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useUserStore = create(devtools((set) => ({
    user: null,
    accessToken: null,
    userMyPageData: null,
    setUser: (user) => set({ user }),
    setAccessToken: (accessToken) => set({ accessToken }),
    setUserMyPageData:(myPageData) => set({myPageData})
})));

export default useUserStore;