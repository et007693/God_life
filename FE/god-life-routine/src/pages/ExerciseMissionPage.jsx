import React, { useEffect, useState } from "react";
import { CustomOverlayMap, Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import useSearchStore from "../store/useSearchStore";
import useUserStore from "../store/useUserStore";
import useRoomInfo from "../store/useRoomInfo";

const ExerciseMissionPage = () => {
  const { center, updatePositionWithGeolocation } = useSearchStore();
  const { rule } = useRoomInfo();
  const homePosition = rule.rulePosition;
  const [moveLine, setMoveLine] = useState([]);
  useEffect(() => {
    const updatePosition = setInterval(() => {
      updatePositionWithGeolocation();
    }, 1000);
    return () => clearInterval(updatePosition);
  }, []);
  return (
    <div className="w-screen h-real-screen">
        {/* 현재 위치에서 ruleLocation까지의 거리를 표시하는 폴리라인 */}
      <Map center={center} level={3} className="w-full h-full">
        <Polyline path={[center, rule.ruleLocation]} strokeWeight={5} strokeColor={"#FFAE00"} strokeOpacity={0.7} 
        onCreate={setMoveLine}
        />
        <CustomOverlayMap position={center} content={<div>현재 위치</div>} zIndex={2} yAnchor={1} />
        <CustomOverlayMap position={rule.ruleLocation} content={<div>목표 위치</div>} zIndex={3} yAnchor={1} />
        <MapMarker position={center} />
        <MapMarker position={rule.ruleLocation} />
      </Map>
    </div>
  );
};

export default ExerciseMissionPage;
