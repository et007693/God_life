import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMainPageData } from "../api/mainPageApi";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export const useMainPage = () => {
    const [cookies, setCookies, removeCookies] = useCookies(["accessToken"]);    const navigate = useNavigate();
    const goToPersonalMissionCreate = () => {
      navigate("/personalMission/create");
    };
    const goToTeamMissionCreate = () => {
      navigate("/teamMission/create");
    };
  
    const today = new Date();
    const formatDate = `${today.getFullYear()}.${
      today.getMonth() + 1
    }.${today.getDate()}`;
    // console.log(formatDate);
    const { data, isFetching, isError,isSuccess } = useQuery({
      queryKey: ["mainPageData"],
      queryFn: getMainPageData,
      staleTime: 0,
      
    });
    useEffect(()=>{

      if(!isFetching &&data && !data.locationSet){
        navigate("/location/setting");
      }
    },[data]);
    useEffect(()=>{
      const redirectUrl = localStorage.getItem("redirectUrl");
      if(redirectUrl){
        navigate(redirectUrl);
        localStorage.removeItem("redirectUrl");
      }
    },[])
    return {data, isFetching, isError, goToPersonalMissionCreate, goToTeamMissionCreate, formatDate, removeCookies}
};

