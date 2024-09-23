import React, { useEffect, useCallback } from "react";
import useRoomInfo from "../store/useRoomInfo";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import useUserStore from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getPersonalMissionData } from "../api/personalMissionApi";

const RULE_CONFIG = {
  wakeup:{
    navigateUri: 'time',
    title:'일찍 일어나기',
    content:(ruleTime)=>ruleTime || "시간 설정이 완료되지 않았습니다."
  },
  exercise:{
    navigateUri: 'exercise',
    title:'운동하기',
    content:(ruleLocation)=>ruleLocation || "집 위치 설정이 완료되지 않았습니다"
  }
}

const PersonalMissionDetailPage = () => {
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


  if (user === null || isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div>
      <Header title={"나의 미션"} color={"white"} backgroundcolor={"orange"} />
      <div className="flex flex-col items-center pt-24">
        <div>
          <Avatar member={user} />
        </div>
        <div className="text-xl font-bold">송창용</div>
        <div className="text-sm text-gray-400 mt-1">싸피 1234-5678-910</div>

        <div className="border rounded-xl mt-6 shadow-md text-center text-sm">
          <div className="px-10 py-4">
            매일 미션을 성공하면 우대금리를 드려요!
          </div>
          <div className="flex flex-row justify-between pt-4">
            <div className="text-gray-400 pl-5">남은 기간</div>
            <div className="font-bold text-lg pr-5">21일</div>
          </div>
          <div className="px-4 py-3">
            <div className=" bg-gray-200 rounded-full">
              <div
                className="bg-yellow-300 h-5 rounded-full text-center text-sm flex items-center justify-center"
                style={{ width: "80%" }}
              >
                159일
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-3 mx-4 mb-2"></div>

          <div className="flex flex-row justify-between pt-4">
            <div className="text-gray-400 pl-5">성공률</div>
            <div className="font-bold text-lg pr-5">62%</div>
          </div>

          <div className="px-4 py-3">
            <div className=" bg-gray-200 rounded-full">
              <div
                className="bg-yellow-300 h-5 rounded-full"
                style={{ width: "62%" }}
              >
                62%
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-3 mx-4 mb-2"></div>

          <div className="flex flex-row justify-between items-center pt-4">
            <div>
              <div className="flex flex-row">
                <div className="text-gray-400 pl-5">현재 적용이율</div>
                <div className="font-bold text-md pl-5 text-red-500">4%</div>
              </div>

              <div className="flex flex-row">
                <div className="text-gray-400 pl-5">최대 적용이율</div>
                <div className="font-bold text-md pl-5 text-red-500 mb-4">
                  8.5%
                </div>
              </div>
            </div>

            <div className="pr-5">
              <button
                onClick={goToPersonalAccountDetail}
                className="font-bold text-lg pb-3"
              >
                계좌 상세 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left pt-8 pl-10 font-bold text-xl">
        {data.rule.ruleType ==='wakeup' ? "일찍 일어나기" : "운동하기"}
      </div>
      <div className="pt-3">
        <div 
        onClick={goToPersonalMissionSettingPage}
       className="bg-gray-200 mx-10 py-12 rounded-3xl">
        {data.rule.ruleType === 'wakeup' ? (
          data.rule.ruleSetted ? data.rule.ruleTime: "아직 시간설정이 완료되지 않았습니다."
        ):(
           data.rule.ruleSetted ? data.rule.ruleLocation.latitude : "아직 집 위치 설정이 되지 않았습니다."
        )}
            </div>
      </div>
    </div>
  );
};

export default PersonalMissionDetailPage;
