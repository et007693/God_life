import React, { useEffect, useRef, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useKakaoMap } from "../hooks/useKakaoMap";
import { useDaumCdn } from "../hooks/useDaumCdn";
import CustomMap from "../components/CustomMap";
import SearchAddress from "../components/SearchAddress";
import useSearchStore from "../store/useSearchStore";
import SearchBar from "../components/SearchBar";
import Header from "../components/Header";
import { useLocation, useNavigate } from "react-router-dom";

const center = { lat: 33.5563, lng: 126.79581 };

const LocationSettingPage = () => {
  // 카카오맵 API를 이용한 지도 구현
  // 전역변수를 사용해 다른 컴포넌트에서도 사용할 수 있도록함.
  const { isSearchMode,selectedAddress,updatePositionWithGeolocation } = useSearchStore();
  const navigate = useNavigate();
  const location = useLocation();
  const onClickRegistButton = () => {
    // TODO: 장소 등록 로직 추가 -api 연결
    if(location.pathname.includes("/personalMission")){
      console.log(selectedAddress);
      navigate(`/personalMission/${1}`);
    }else if(location.pathname.includes("/teamMission")){
      console.log(selectedAddress);
      navigate(`/teamMission/${1}`);
    }
  }
  useEffect(()=>{
    updatePositionWithGeolocation();
  },[updatePositionWithGeolocation])
  // 2024-09-04 작업시작
  return (
    <>
      <div className="w-full h-real-screen flex flex-col">
        <Header title="장소 등록" />
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
              onClick={onClickRegistButton}
            >
              장소 등록
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default LocationSettingPage;
