import { create } from "zustand";

const useSearchStore = create((set) => ({
    isSearchMode: false,
    setIsSearchMode: (isSearchMode) => set({isSearchMode}),
}))

export default useSearchStore;