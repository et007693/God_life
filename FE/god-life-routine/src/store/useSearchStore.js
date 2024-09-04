import { create } from "zustand";

const useSearchStore = create((set) => ({
    isSearchMode: false,
    // 선택한 주소지의 주소
    selectedAddress: "",
    // 선택한 장소의 이름
    selectedPlace: "",
    // 선택한 장소의 위도와경도
    selectedPosition: {
        lat: 33.5563,
        lng: 126.79581,
    },
    setIsSearchMode: (isSearchMode) => set({isSearchMode}),
    setSelectedAddress: (selectedAddress) => set({selectedAddress}),
    setSelectedPlace: (selectedPlace) => set({selectedPlace}),
    setSelectedPosition: (selectedPosition) => set({selectedPosition}),
}))

export default useSearchStore;