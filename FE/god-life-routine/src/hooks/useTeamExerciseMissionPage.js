import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import calculateDistance from "../util/calculateDistance";
import { useMutation } from "@tanstack/react-query";
import { doExerciseMission } from "../api/teamMissionApi";
import { createScreenShotToFormData } from "../util/screenShot";
import useSearchStore from "../store/useSearchStore";

export const useTeamExerciseMissionPage = () => {
    const { center, updatePositionWithGeolocation } = useSearchStore();
    const { lat, lng } = useLocation().state;
    const [distance, setDistance] = useState(0);
    const [moveLine, setMoveLine] = useState([]);
    const limitDistance = 150;
    const navigate = useNavigate();
    useEffect(() => {
      const updatePosition = setInterval(() => {
        // 현재 위치 업데이트
        updatePositionWithGeolocation();
        // 현재 위치와 목표 위치 사이의 거리 계산
        const nowDistance = calculateDistance(center.lat, center.lng, lat, lng);
        // 거리 상태 업데이트
        setDistance(nowDistance);
      }, 1000);
      return () => clearInterval(updatePosition);
    }, [lat, lng, center.lat, center.lng]);
    const {teamId} = useParams();
    const {mutate} = useMutation({
      mutationFn: (data)=>(doExerciseMission(teamId,data)),
      onSuccess: ()=>{
        navigate(`/teamMission/${teamId}`);
      }
    });
    const handleSubmit = async () => {
<<<<<<< HEAD
        const blob = await createScreenShotToFormData("screen-shot-div");
        // const url = URL.createObjectURL(blob);
        // window.open(url);
=======
        const blob = await createScreenShotToFormData("screen-shot-div",0,7);
>>>>>>> d4727ca0 (feat: 기상미션 저장 api 연결 #S11P21A503-390 #in-progress)
        mutate(blob);
    }
    return {
        center,lat,lng,distance,setMoveLine,limitDistance,handleSubmit
    }
}