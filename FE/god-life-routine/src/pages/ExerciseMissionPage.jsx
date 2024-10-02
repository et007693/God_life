import React, { useEffect, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline,
} from "react-kakao-maps-sdk";
import useSearchStore from "../store/useSearchStore";
import useUserStore from "../store/useUserStore";
import useRoomInfo from "../store/useRoomInfo";
import { useLocation } from "react-router-dom";
import calculateDistance from "../util/calculateDistance";

const ExerciseMissionPage = () => {
  const { center, updatePositionWithGeolocation } = useSearchStore();
  const { rule } = useRoomInfo();
  const { lat, lng } = useLocation().state;
  const [distance, setDistance] = useState(0);
  const [moveLine, setMoveLine] = useState([]);
  useEffect(() => {
    const updatePosition = setInterval(() => {
      updatePositionWithGeolocation();
      const nowDistance = calculateDistance(center.lat, center.lng, lat, lng);
      setDistance(nowDistance);
    }, 1000);
    return () => clearInterval(updatePosition);
  }, [lat, lng, center.lat, center.lng]);
  return (
    <div className="w-screen h-real-screen">
      {/* 현재 위치에서 ruleLocation까지의 거리를 표시하는 폴리라인 */}
      <Map center={center} level={3} className="w-full h-full">
        <Polyline
          path={[center, { lat: lat, lng: lng }]}
          strokeWeight={5}
          strokeColor={"#FFAE00"}
          strokeOpacity={0.7}
          onCreate={setMoveLine}
        />
        <CustomOverlayMap position={center} zIndex={2} yAnchor={1}>
          <div className="bg-white p-2 rounded-md">
            집에서부터의 거리: {distance.toFixed(2)}m
          </div>
        </CustomOverlayMap>
        <CustomOverlayMap
          position={{ lat: lat, lng: lng }}
          zIndex={3}
          yAnchor={1}
        >
          <div className="bg-white p-2 rounded-md">목표 위치</div>
        </CustomOverlayMap>
        <MapMarker position={center} />
        <MapMarker position={{ lat: lat, lng: lng }} />
      </Map>
      <div className="absolute bottom-0 w-full flex justify-center items-center z-10">   
        <button className="w-full g-yellow-300 p-2 rounded-md">종료</button>
      </div>
    </div>
  );
};

export default ExerciseMissionPage;
