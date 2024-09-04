import React, { useEffect, useRef, useState } from "react";
import styles from "./RegistPlacePage.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useKakaoMap } from "../hooks/useKakaoMap";
import { useDaumCdn } from "../hooks/useDaumCdn";
import CustomMap from "../components/CustomMap";
import SearchAddress from "../components/SearchAddress";

const center = { lat: 33.5563, lng: 126.79581 }

const RegistPlacePage = () => {
  // 카카오맵 API를 이용한 지도 구현
  const {loading, error, position, setPosition} = useKakaoMap();
  const [address, setAddress] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false);
  // 다음 주소 cdn을 로드하는 커스텀 훅
  
  const onAddressClick = () => {
    if(isSearchMode){
      setIsSearchMode(false);
    }else{
      setIsSearchMode(true);
    }
    console.log("주소 클릭되었습니다.");
  }
  const handleRegister = () => {
    console.log("장소 등록 버튼이 클릭되었습니다.");
    console.log("클릭된 위치의 위도:", position.lat);
    console.log("클릭된 위치의 경도:", position.lng);
    console.log("클릭된 위치의 주소:", address);
  };
// 2024-09-04 작업시작
  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton}>뒤로가기</button>
          <h1 className={styles.title}>장소 등록</h1>
        </div>
      <input type="text" onClick={onAddressClick} />
      {/* 주소찾기 버튼을 누르면 주소찾기 모드로 변경 */}
      {isSearchMode ? <SearchAddress setAddress={setAddress} setIsSearchMode={setIsSearchMode} /> : <CustomMap/>}
          <button className={styles.registerButton} onClick={handleRegister}>장소 등록</button>
      </div>

    </>
  );
};

export default RegistPlacePage;
