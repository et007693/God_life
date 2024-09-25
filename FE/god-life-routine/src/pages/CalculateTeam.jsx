// URL : "/caculateteam/1"

import React, { useEffect } from "react";
import AvatarList from "../components/AvatarList"
import Header from "../components/Header"

import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom"
import { getTeamMissionDetail } from "../api/teamMissionApi";
import useRoomInfo from "../store/useRoomInfo";
import FineList from "../components/FineList";

const CalculateTeam = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["calculateTeam", teamId],
    queryFn: () => getTeamMissionDetail(teamId),
    staleTime: 0,
  });

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Header title={"정산하기"} color={"orange"} />
      <div className="flex flex-col items-center p-10 mt-16">
        <div className="flex flex-col items-center">
          <div className="flex -space-x-4">
            <AvatarList memberList={data.memberList}/>
          </div>
          <div className="m-5">
            <h1 className="text-xl">{data.teamName}</h1>
            <span className="text-4xl text-orange-400 text-"><b>{data.fineGathered}</b></span>원
          </div>
          <div className="bg-gray-100  m-4 p-5">
            <p><b>송창용</b>님이 받을 수 있는 금액은</p>
            <p><b className="text-4xl text-blue-700">{Math.round(data.fineGathered / data.memberList.length)}</b>원 입니다.</p>
          </div>
        </div>
        {/* 벌금 집계 */}
        <div className="flex flex-col items-center gap-5 w-full mt-5">
          
          <FineList memberList={data.memberList}/>
        </div>
    </div>
  </div>
  )
}

export default CalculateTeam