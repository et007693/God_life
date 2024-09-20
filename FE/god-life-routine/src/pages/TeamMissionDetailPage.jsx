// URL: "/teamMission/1"

import React, { useEffect } from "react";
import Header from "../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamMissionDetail } from "../api/teamMissionApi";
import { useQuery } from "@tanstack/react-query";
import AvatarList from "../components/AvatarList";
import InviteMemberBtn from "../components/InviteMemberBtn";
import AccountInfo from "../components/AccountInfo";
import TeamMissionDetailBody from "../components/TeamMissionDetailBody";
import shareKakao from "../util/shareKakao";
import useRoomInfo from "../store/useRoomInfo";


const TeamMissionDetailPage = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const handleShareKakaoBtn = async () => {
    await shareKakao(teamId);
  };
  const {setRoomNumber, setRoomType,setRule } = useRoomInfo();
  const { data, isLoading } = useQuery({
    queryKey: ["teamMissionDetail", teamId],
    queryFn: () => getTeamMissionDetail(teamId),
    staleTime: 0,
  });
  useEffect(() => {
    setRoomNumber(teamId);
    setRoomType("team");
    setRule(data?.rule);
  }, [teamId,setRoomNumber,setRoomType,setRule,data]);

  const goToTransferPage = () => {
    navigate(`fine/pay`);
  };
  const goToFineHistoryPage = () => {
    navigate(`fine/history`);
  };
  const goToTeamMissionTimeSettingPage = () => {
    navigate(`time/setting`);
  };
  const goToTeamMissionLocationSettingPage = () => {
    navigate(`location/setting`);
  };

  const goToAccountHistoryPage = () => {
    navigate(`/personalMission/accountHistory`)
  }

  // 로딩 중일 때 로딩 표시
  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <Header title={"팀 미션"} color={"white"} backgroundcolor={"orange"} />
      <div className="flex flex-col items-center p-10 mt-16">
        <div className="flex flex-col items-center">
          <div className="w-full flex -space-x-4 rtl:space-x-reverse">
            <AvatarList memberList={data.memberList} />
            <InviteMemberBtn onClick={handleShareKakaoBtn} />
          </div>
          <AccountInfo data={data} />
        </div>
        <TeamMissionDetailBody data={data} />
        {/* 하단 버튼 영역 */}
        <div className="flex justify-around w-full max-w-md mt-0 bg-gray-100 py-4 rounded-b-lg shadow-md">
          <button
            onClick={goToTransferPage}
            className="text-md font-medium flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M880-720v480q0 33-23.5 56.5T800-160H160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720Zm-720 80h640v-80H160v80Zm0 160v240h640v-240H160Zm0 240v-480 480Z" />
            </svg>

            <span>이체하기</span>
          </button>

          <button
            onClick={goToFineHistoryPage}
            className="text-md font-medium flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M640-520q17 0 28.5-11.5T680-560q0-17-11.5-28.5T640-600q-17 0-28.5 11.5T600-560q0 17 11.5 28.5T640-520Zm-320-80h200v-80H320v80ZM180-120q-34-114-67-227.5T80-580q0-92 64-156t156-64h200q29-38 70.5-59t89.5-21q25 0 42.5 17.5T720-820q0 6-1.5 12t-3.5 11q-4 11-7.5 22.5T702-751l91 91h87v279l-113 37-67 224H480v-80h-80v80H180Zm60-80h80v-80h240v80h80l62-206 98-33v-141h-40L620-720q0-20 2.5-38.5T630-796q-29 8-51 27.5T547-720H300q-58 0-99 41t-41 99q0 98 27 191.5T240-200Zm240-298Z" />
            </svg>

            <span>벌금내역</span>
          </button>

          <button
            onClick={goToAccountHistoryPage}
            className="text-md font-medium flex items-center space-x-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              viewBox="0 -960 960 960"
              width="20px"
              fill="#000000"
            >
              <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
            </svg>

            <span>거래내역</span>
          </button>
        </div>

        <div className="text-xl font-bold mt-8 text-left w-full">
          {data.rule.ruleDetail}
        </div>
        <div className="text-xm text-gray-400 text-left w-full">
          평일에만 미션이 주어집니다.
        </div>
        {data.rule.ruleType == "wakeup" ? (
          data.rule.ruleSetted == true ? (
            <div 
            onClick={goToTeamMissionTimeSettingPage}
            className="flex relative justify-around bg-gray-100 mt-4 px-8 py-28 rounded-2xl w-full">
              <p>{data.rule.ruleTime}</p>
            </div>
          ) : (
            <div
              onClick={goToTeamMissionTimeSettingPage}
              className="flex relative justify-around bg-gray-100 mt-4 px-8 py-28 rounded-2xl w-full"
            >
              <p>시간 설정이 완료되지 않았습니다. </p>
            </div>
          )
        ) : data.rule.ruleSetted == true ? (
          <div className="flex relative justify-around bg-gray-100 mt-4 px-8 py-28 rounded-2xl w-full">
            <p>{data.rule.ruleLocation}</p>
          </div>
        ) : (
          <div
            onClick={goToTeamMissionLocationSettingPage}
            className="flex relative justify-around bg-gray-100 mt-4 px-8 py-28 rounded-2xl w-full"
          >
            <p>위치 설정이 완료되지 않았습니다. </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMissionDetailPage;
