import { create } from "zustand";
import { devtools } from "zustand/middleware";
const useRedirectStore = create(devtools((set) => ({
  redirectUrl: null,
  setRedirectUrl: (url) => set({ redirectUrl: url }),
})));

export default useRedirectStore;