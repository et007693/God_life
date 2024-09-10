// URL: "/teamMission/1"

import React from "react";
import Header from "../components/Header";
import profile from "../assets/profile.png";
import addProfile from "../assets/addProfile.png";
import { useNavigate } from "react-router-dom";

const TeamMissionDetailPage = () => {
  const navigate = useNavigate();

  const goToTransferPage = () => {
    navigate(`/teamMission/1/fine/pay`);
  };
  const goToFineHistoryPage = () => {
    navigate(`/teamMission/1/fine/history`);
  };
  const goToTeamMissionTimeSettingPage = () => {
    navigate(`/teamMission/1/time/setting`);
  };
  

  return (
    <div>
      <Header title={"팀 미션"} color={"white"} backgroudcolor={"orange"} />
      <div className="flex flex-col items-center p-10">
        <div className="flex flex-col items-center">
          <div className="w-full relative flex items-center">
            <img
              src={profile}
              alt="Profile"
              className="w-16 h-16 mb-4 rounded-full"
            />
            <img
              src={addProfile}
              alt="addProfile"
              className="absolute w-16 h-16 p-1 rounded-full border-4 border-gray-300 bottom-4 left-12 bg-white"
            />
          </div>
          <div className="text-center">
            <div className="text-xl font-bold">송창송창용</div>
            <div className="text-sm text-gray-500 mt-2 mb-4">계좌번호</div>
          </div>
        </div>

        <div className="flex relative justify-around bg-white-100 pb-8 pt-4 rounded-t-2xl w-full border border-gray-300">
          <div className="flex w-1/2 flex-col items-center justify-center">
            <p className="text-sm font-bold text-gray-500">모인 벌금</p>
            <p className="text-3xl font-bold pt-2 ">1000원</p>
          </div>

          <div className="border-l-2 border-gray-300 h-20 absolute left-1/2 -translate-x-1/2"></div>

          <div className="flex w-1/2 flex-col items-center justify-center">
            <p className="text-sm font-bold text-gray-500">밀린 벌금</p>
            <p className="text-3xl font-bold pt-2">0원</p>
          </div>
        </div>

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
              <path d="M280-280h280v-80H280v80Zm0-160h400v-80H280v80Zm0-160h400v-80H280v80Zm-80 480q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z" />
            </svg>

            <span>거래내역</span>
          </button>
        </div>

        <div className="text-xl font-bold mt-8 text-left w-full">미션 이름</div>
        <div className="text-xm text-gray-400 text-left w-full">
          평일에만 미션이 주어집니다.
        </div>

        <div
        onClick={goToTeamMissionTimeSettingPage}
        className="flex relative justify-around bg-gray-100 mt-4 px-8 py-32 rounded-2xl w-full">
          <p>시간 설정이 완료되지 않았습니다. </p>
        </div>
      </div>
    </div>
  );
};

export default TeamMissionDetailPage;
