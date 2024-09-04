import React, { useEffect, useRef, useState } from "react";
import styles from "./RegistPlacePage.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useKakaoMap } from "../hooks/useKakaoMap";

const center = { lat: 33.5563, lng: 126.79581 }

const RegistPlacePage = () => {
  // 카카오맵 API를 이용한 지도 구현
  const {loading, error, position, setPosition} = useKakaoMap();
  const [address, setAddress] = useState("");
  const {kakao} = window;
  useEffect(() =>{
    if(kakao == null || kakao.maps.services == null) return;
      const ps = new kakao.maps.services.Places(); 
      const geocoder = new kakao.maps.services.Geocoder();
      console.log("여기가 실행되고있습니다.");
      const coord = new kakao.maps.LatLng(position.lat, position.lng);
      geocoder.coord2Address(coord.getLat(), coord.getLng(), (result, status) => {
        if(status === kakao.maps.services.Status.OK) {
          setAddress(result[0].address.address_name);
        }
      })
  },[kakao,position])
  const onMapClick = (_,mouseEvent) => {
    const latlng = mouseEvent.latLng
    setPosition({
      lat: latlng.getLat(),
      lng: latlng.getLng(),
    })
  }
  const onAddressClick = () => {
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
      <Map
      id="map"
        center={center}
        style={{width: "100vw", height: "100vh"  }}
        level={3}
        onClick={onMapClick}
      >
        <MapMarker position={position ?? center }>
          {position &&
          <p>
            선택한 위치는 {position.lat} 입니다
          </p>
          }
        </MapMarker>
      </Map>
          <button className={styles.registerButton} onClick={handleRegister}>장소 등록</button>
      </div>

    </>
  );
};

export default RegistPlacePage;
