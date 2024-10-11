import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useSearchStore = create(
  devtools((set) => ({
    isSearchMode: true,
    // 선택한 주소지의 주소
    selectedAddress: "",
    // 선택한 장소의 이름
    selectedPlace: "",
    // 선택한 장소의 위도와경도(초기값)
    selectedPosition: {
      lat: 33.5563,
      lng: 126.79581,
    },
    center: { lat: 33.5563, lng: 126.79581 },
    setCenter: (center) => set({ center }),
    setIsSearchMode: (isSearchMode) => set({ isSearchMode }),
    setSelectedAddress: (selectedAddress) => set({ selectedAddress }),
    setSelectedPlace: (selectedPlace) => set({ selectedPlace }),
    // 검색결과의 위도와 경도를 저장하는 함수
    setSelectedPosition: (selectedPosition) => set({ selectedPosition }),
    // 현재 위치를 갱신하는 함수
    updatePositionWithGeolocation: () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            set({
              center: {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              },
            });
          },
          (error) => {
            console.error("Geolocation 오류:", error);
          }
        );
      } else {
        console.log("Geolocation을 지원하지 않는 브라우저입니다.");
      }
    },
  }))
);

export default useSearchStore;
