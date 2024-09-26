import React from "react";
import Header from "../components/Header";
import { usePersonalMissionDetail } from "../hooks/usePersonalMissionDetail";
import PersonalMissionRoomInfo from "../components/PersonalMissionRoomInfo";

const PersonalMissionDetailPage = () => {
  const { data, isFetching, isError, user, goToPersonalAccountDetail, goToPersonalMissionSettingPage } = usePersonalMissionDetail();
  const missionProps = {
    data,
    user,
    goToPersonalAccountDetail,
    goToPersonalMissionSettingPage,
  }
  if (user === null || isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  return (
    <div className="w-full h-full">
      <Header title={"나의 미션"} color={"white"} backgroundcolor={"orange"} goBack={"/"}/>
      <PersonalMissionRoomInfo missionProps={missionProps}/>
    </div>
  );
};

export default PersonalMissionDetailPage;
