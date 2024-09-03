import React, { useEffect, useRef, useState } from "react";
import styles from "./RegistPlacePage.module.css";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { useKakaoMap } from "../hooks/useKakaoMap";

const center = { lat: 33.5563, lng: 126.79581 }

const RegistPlacePage = () => {
  // 카카오맵 API를 이용한 지도 구현
  useKakaoMap();
  const [position, setPosition] = useState();
  const {kakao} = window;
  useEffect(() =>{
    if(kakao == null) return;
      const ps = new kakao.maps.services.Places(); 

  },[])

  return (
      <Map
      id="map"
        center={center}
        style={{width: "100vw", height: "100vh"  }}
        level={3}
        onClick={(_, mouseEvent) => {
            const latlng = mouseEvent.latLng
            setPosition({
              lat: latlng.getLat(),
              lng: latlng.getLng(),
            })
          }}
      >
        <MapMarker position={position ?? center }>
          {position &&
          `클릭한 위치의 위도는 ${position.lat} 이고, 경도는 ${position.lng} 입니다`}
        </MapMarker>
      </Map>
  );
};

export default RegistPlacePage;
