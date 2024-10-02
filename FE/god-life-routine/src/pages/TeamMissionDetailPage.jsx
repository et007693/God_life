// URL: "/teamMission/1"

import React, { useEffect, useState } from "react";
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
import firecracker from "../assets/firecracker.png";
import Modal from "../components/Modal";
import BettingButton from "../components/BettingButton";
import LoadingSpinner from "../components/common/LoadingSpinner";

const TeamMissionDetailPage = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const handleShareKakaoBtn = async () => {
    await shareKakao(teamId);
  };
  const { setRoomNumber, setRoomType, setRule } = useRoomInfo();
  const [showModal, setShowModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["teamMissionDetail", teamId],
    queryFn: () => getTeamMissionDetail(teamId),
    staleTime: 0,
  });
  useEffect(() => {
    setRoomNumber(teamId);
    setRoomType("team");
    setRule(data?.rule);
  }, [teamId, setRoomNumber, setRoomType, setRule, data]);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
  const goToCalculateTeamPage = () => {
    navigate(`/teamMission/${teamId}/calculate`);
  };

  const goToAccountHistoryPage = () => {
    navigate(`/teamMission/${teamId}/accountHistory`);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  // 로딩 중일 때 로딩 표시
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner />
      </div>
    );
  return (
    <div>
      <Header
        title={"팀 미션"}
        color={"white"}
        backgroundcolor={"orange"}
        goBack={"/"}
      />

      {/* 이벤트 */}
      <div
        className="mt-20 bg-yellow-100 mx-4 py-1 rounded-lg flex justify-center"
        onClick={handleOpenModal}
      >
        <img src={firecracker} alt="폭죽 아이콘" className="inline w-6 h-6" />
        <div className="pl-2">이벤트에 참여하고 상금을 획득하세요!</div>
      </div>

      {showModal && (
        <Modal
          showModal={showModal}
          onClickCloseBtn={handleCloseModal}
          width="300px"
          height="500px"
          buttonText="확인"
          buttonColor="orange"
          onClickButton={handleCloseModal}
        >
          <div className="text-xl font-bold">오늘의 베팅</div>
          <div className="text-gray-400 text-sm pt-1">
            투표를 통해 상금을 획득하세요!
          </div>

          <div className=" pt-10 flex justify-center items-center space-x-4">
            <div> 프로필 사진</div>
            <div>
              <div className="font-bold text-orange-500 text-2xl">송창용</div>
              <div className="pt-4 text-lg">일찍 일어나기</div>
            </div>
          </div>

          <div className="pt-12 text-2xl font-bold">예측성공시 : 1,000원</div>

          <div className="flex flex-row justify-center gap-14 mt-8">
            <BettingButton
              label="성공"
              isSelected={selectedButton === "성공"}
              onClick={() => {
                handleButtonClick("성공");
              }}
            />
            <BettingButton
              label="실패"
              isSelected={selectedButton === "실패"}
              onClick={() => {
                handleButtonClick("실패");
              }}
            />
          </div>
        </Modal>
      )}

      <div className="flex flex-col items-center px-10 py-5">
        <div className="flex flex-col items-center">
          <div className="w-full flex -space-x-4 rtl:space-x-reverse">
            <AvatarList memberList={data.data.memberList} />
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
        

        <button className="mt-2 ml-auto pr-2 block text-left"
        onClick={goToCalculateTeamPage}>
          {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          height="20px"
          viewBox="0 0 24 24"
          width="20px"
          fill="#000000"
        >
          <path d="M14.648,5.493c.873-.701,1.772-1.643,2.228-2.789,.238-.598,.161-1.277-.205-1.816-.377-.556-1.002-.888-1.671-.888h-6c-.669,0-1.294,.332-1.671,.888-.366,.539-.442,1.218-.205,1.816,.456,1.145,1.355,2.088,2.228,2.789C4.696,7.221,1,13.159,1,18c0,3.309,2.691,6,6,6h10c3.309,0,6-2.691,6-6,0-4.841-3.696-10.779-8.352-12.507Zm.369-3.528c-.516,1.297-2.094,2.393-3.019,2.91-.923-.513-2.495-1.6-2.999-2.875l6.018-.035Zm1.982,20.035H7c-2.206,0-4-1.794-4-4,0-5.243,4.71-11,9-11s9,5.757,9,11c0,2.206-1.794,4-4,4Zm-5,0c-.552,0-1-.448-1-1v-1h-.268c-1.068,0-2.063-.574-2.598-1.499-.276-.478-.113-1.089,.365-1.366,.476-.277,1.089-.114,1.366,.365,.178,.308,.511,.5,.867,.5h2.268c.551,0,1-.449,1-1,0-.378-.271-.698-.644-.76l-3.042-.507c-1.341-.223-2.315-1.373-2.315-2.733,0-1.654,1.346-3,3-3v-1c0-.552,.448-1,1-1s1,.448,1,1v1h.268c1.067,0,2.063,.575,2.598,1.5,.276,.478,.113,1.089-.365,1.366-.477,.277-1.089,.114-1.366-.365-.179-.309-.511-.5-.867-.5h-2.268c-.551,0-1,.449-1,1,0,.378,.271,.698,.644,.76l3.042,.507c1.341,.223,2.315,1.373,2.315,2.733,0,1.654-1.346,3-3,3v1c0,.552-.448,1-1,1Z" />
        </svg> */}
          <div className="font-bold text-gray-600">정산하기 →</div>
        </button>

        <div className="text-xl font-bold mt-6 text-left w-full">
          {data.data.rule}
        </div>
        <div className="text-xm text-gray-400 text-left w-full">
          평일에만 미션이 주어집니다.
        </div>
        {data.data.rule == "일찍 일어나기" ? (
          data.data.rule == true ? (
            <div
              onClick={goToTeamMissionTimeSettingPage}
              className="flex relative justify-around bg-gray-100 mt-4 px-8 py-20 rounded-2xl w-full"
            >
              <div className="text-3xl font-bold text-center">
                {data.data.rule}
              </div>
            </div>
          ) : (
            <div
              onClick={goToTeamMissionTimeSettingPage}
              className="flex relative justify-around bg-gray-100 mt-4 px-8 py-28 rounded-2xl w-full"
            >
              <p>시간 설정이 완료되지 않았습니다. </p>
            </div>
          )
          ) : data.data.ruleLocation ? (
          <div className="flex relative justify-around bg-gray-100 mt-4 px-8 py-28 rounded-2xl w-full">
            <p>{data.data.ruleLocation}</p>
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
