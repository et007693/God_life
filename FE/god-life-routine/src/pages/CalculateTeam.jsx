// URL : "/caculateteam/1" calculateteam/1

import React, { useEffect, useState } from "react";
import AvatarList from "../components/AvatarList";
import Header from "../components/Header";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamMissionDetail } from "../api/teamMissionApi";
import useRoomInfo from "../store/useRoomInfo";
import FineList from "../components/FineList";
import { getCalculateTeam, sendCalculateButton } from "../api/calculateTeamApi";
import CalculateAvatarList from "../components/CalculateAvatarList";
import Modal from "../components/Modal";

const CalculateTeam = () => {
  const { teamId } = useParams();
  const [showModal, setShowModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["calculateTeam"],
    queryFn: () => getCalculateTeam(teamId),
    staleTime: 0,
  });

  const {
    mutate: handleSendCalculateButton,
    isLoading: isSendLoding,
    isError: isSendError,
  } = useMutation({
    mutationKey: ["sendCalculateButton"],
    mutationFn: () => sendCalculateButton(teamId),
  });

  if (isLoading || isSendLoding) return <div>Loading...</div>;
  if (isError || isSendError) return <div>Error</div>;

  const isLeader = data.memberName === data.leaderName;

  return (
    <div>
      <Header title={"정산하기"} color={"orange"} />
      <div className="flex flex-col items-center p-10 mt-10">
        <div className="flex flex-col items-center">
          <div className="flex -space-x-4">
            <CalculateAvatarList
              key={"calculateAvatarList"}
              memberList={data.memberList}
            />
          </div>
          <div>
            <h1 className="text-xl mt-4 font-bold mb-2">{data.teamName}</h1>
            <span className="text-4xl text-orange-500 mt-4">
              <b>{data.fineGathered}</b>
            </span>
            원
          </div>
          <div className="bg-gray-100 m-2 mt-4 p-5">
            <p>
              <b>{data.memberName}</b>님이 받을 수 있는 금액은
            </p>
            <p>
              <b className="text-3xl">
                {Math.round(data.fineGathered / data.memberList.length)}
              </b>{" "}
              원 입니다.
            </p>
          </div>
        </div>
        {/* 벌금 집계 */}
        <div className="flex w-full mt-5 mb-6">
          <FineList key={"fineList"} memberList={data.memberList} />
        </div>

        {/* 방장이면 정산하기 버튼 보이도록 */}
        <div className="bg-orange-400 py-3 px-5 text-white rounded-lg">
          {isLeader && (
            <button onClick={() => setShowModal(true)}>정산하기</button>
          )}
        </div>


        {/* 정산하기 확인 모달 */}
        {showModal && (
          <Modal
            showModal={showModal}
            onClickCloseBtn={() => setShowModal(false)}
            width="250px"
            height="240px"
            buttonText="확인"
            buttonColor="orange"
            onClickButton={handleSendCalculateButton}
          >
            <div className="pt-10">정산하시겠습니까?</div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default CalculateTeam;
