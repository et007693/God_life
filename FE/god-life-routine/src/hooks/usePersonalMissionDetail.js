import { useEffect } from "react";
import useRoomInfo from "../store/useRoomInfo";
import useUserStore from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getPersonalMissionData } from "../api/personalMissionApi";
import { useNavigate } from "react-router-dom";

const usePersonalMissionDetail = ()=>{

    const { setRoomNumber, setRoomType } = useRoomInfo();
    const { user, setUser } = useUserStore();
    const {data, isFetching, isError } = useQuery({
      queryKey: ["personalMissionDetail"],
      queryFn: getPersonalMissionData,
      staleTime:0
    });
  
    const navigate = useNavigate();
  
    const goToPersonalAccountDetail = () => {
      navigate("/personalMission/account/detail");
    };
    
    
    const goToPersonalMissionSettingPage = () => {
      const navigateUri = data?.rule?.ruleType === "wakeup" ? "time" : "location"    
      navigate(`/personalMission/setting/${navigateUri}`);
    };
    
    useEffect(() => {
      setRoomNumber(null);
      setRoomType("personal");
    }, [setRoomNumber, setRoomType]);
  
    useEffect(() => {
      setUser({
        id: 1,
        name: "송창용",
        profileImage: "https://avatars.githubusercontent.com/u/103542723?v=4",
      });
    }, [setUser]);

    return {
        data,
        isFetching,
        isError,
        user,
        goToPersonalAccountDetail,
        goToPersonalMissionSettingPage
    }
  
}