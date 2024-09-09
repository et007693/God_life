import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useKakaoMap } from "../hooks/useKakaoMap";
import { useDaumCdn } from "../hooks/useDaumCdn";
import CustomMap from "../components/CustomMap";
import SearchAddress from "../components/SearchAddress";
import useSearchStore from "../store/useSearchStore";
import SearchBar from "../components/SearchBar";

const center = { lat: 33.5563, lng: 126.79581 };

const PlaceMissionRegistPage = () => {
  // 카카오맵 API를 이용한 지도 구현
  const [address, setAddress] = useState("");
  const { isSearchMode,selectedAddress,updatePositionWithGeolocation } = useSearchStore();

  useEffect(()=>{
    updatePositionWithGeolocation();
  },[updatePositionWithGeolocation])
  // 2024-09-04 작업시작
  return (
    <>
      <div className="w-full h-real-screen flex flex-col">
        <div className="flex justify-center items-center p-4">
          <button className="absolute left-4 top-4 text-black">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 className="text-2xl font-bold">장소 등록</h1>
        </div>
        {/* 주소찾기 버튼을 누르면 주소찾기 모드로 변경 */}
        {isSearchMode ? (
          <div className="flex-grow overflow-hidden">
            <SearchAddress />
          </div>
        ) : (
          
          <div className="flex-grow flex flex-col">
            <SearchBar value={selectedAddress} onChange={(e)=>{}}/>
            <div className="flex-grow overflow-hidden">
              <CustomMap />
            </div>
            <button
              className="fixed z-10 bottom-0 left-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              onClick={()=>{}}
            >
              장소 등록
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PlaceMissionRegistPage;
