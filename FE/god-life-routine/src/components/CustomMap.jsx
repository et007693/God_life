import React, { useState } from 'react'
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useKakaoMap } from '../hooks/useKakaoMap';

// TODO: 본인 GPS 좌표를 가져오는 걸로 수정 필요 
const center = { lat: 33.5563, lng: 126.79581 }

const CustomMap = () => {
    const {loading, error, position, setPosition} = useKakaoMap();
    
    const onMapClick = (_,mouseEvent) => {
        const latlng = mouseEvent.latLng
        setPosition({
          lat: latlng.getLat(),
          lng: latlng.getLng(),
        })
      }
  return (
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
  )
}

export default CustomMap