import { create } from "zustand";
import { devtools } from "zustand/middleware";
// 방 디테일 정보를 저장하는 스토어
// roomInfo:{
//   roomNumber : number; => 방 번호 (개인이면 존재하지 않음)
//   roomType : string; => 개인, 팀
// }
const useRoomInfo = create(
  devtools((set) => ({
    roomNumber: null,
    roomType: null,
    rule: null,
    setRoomNumber: (roomNumber) => set({ roomNumber }),
    setRoomType: (roomType) => set({ roomType }),
    setRule: (rule) => set({ rule: { ...rule } }),
  }))
);

export default useRoomInfo;
