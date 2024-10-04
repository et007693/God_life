import React, { useEffect, useRef, useState } from "react";
import {
  CustomOverlayMap,
  Map,
  MapMarker,
  Polyline,
} from "react-kakao-maps-sdk";
import useSearchStore from "../store/useSearchStore";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import calculateDistance from "../util/calculateDistance";
import Header from "../components/Header";
import { useMutation } from "@tanstack/react-query";
import { doExerciseMission } from "../api/teamMissionApi";
import { createScreenShotToFormData } from "../util/screenShot";

const ExerciseMissionPage = () => {
  const { center, updatePositionWithGeolocation } = useSearchStore();
  const { lat, lng } = useLocation().state;
  const [distance, setDistance] = useState(0);
  const [moveLine, setMoveLine] = useState([]);
  const limitDistance = 150;
  const navigate = useNavigate();
  useEffect(() => {
    const updatePosition = setInterval(() => {
      updatePositionWithGeolocation();
      const nowDistance = calculateDistance(center.lat, center.lng, lat, lng);
      setDistance(nowDistance);
    }, 1000);
    return () => clearInterval(updatePosition);
  }, [lat, lng, center.lat, center.lng]);
  const {teamId} = useParams();
  const {mutate} = useMutation({
    mutationFn: (data)=>(doExerciseMission(teamId,data)),
    onSuccess: (data)=>{
      navigate(`/teamMission/${teamId}`);
    }
  })
  const handleSubmit = async () => {
      const blob = await createScreenShotToFormData("screen-shot-div");
      mutate(blob);
  }
  return (
    <div className="w-screen h-real-screen" id="screen-shot-div">
      <Header backgroundcolor={"white"} title={"운동 미션"} color={"orange"} goBack={"/"}/>
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
          <div className="bg-white p-2 rounded-md">집</div>
        </CustomOverlayMap>
        <MapMarker position={center} />
        <MapMarker position={{ lat: lat, lng: lng }} />
      </Map>
      <div className="absolute bottom-0 w-full flex justify-center items-center z-10">   
        <button onClick={handleSubmit} disabled={distance < limitDistance} className={`w-full ${distance > limitDistance ? "bg-yellow-300" : "bg-gray-300"} p-2 rounded-md`}>{distance > limitDistance ? "성공" : "출발"}</button>
      </div>
    </div>
  );
};

export default ExerciseMissionPage;
