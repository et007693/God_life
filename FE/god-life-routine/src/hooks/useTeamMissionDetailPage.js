import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTeamMissionDetail } from "../api/teamMissionApi";
import useRoomInfo from "../store/useRoomInfo";
import shareKakao from "../util/shareKakao";

export const useTeamMissionDetailPage = () => {
  const navigate = useNavigate();
  const { teamId } = useParams();
  const handleShareKakaoBtn = async () => {
    await shareKakao(teamId);
  };
  const { setRoomNumber, setRoomType, setRule } = useRoomInfo();
  const [showModal, setShowModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");
  const { data, isLoading, isError } = useQuery({
    queryKey: ["teamMissionDetail", teamId],
    queryFn: () => getTeamMissionDetail(teamId),
    staleTime: 0,
    meta: {
      source: "teamMissionDetailPage",
    },
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

  const goToTeamMissionTimeSettingPage = () => {
    navigate(`time/setting`);
  };
  const goToTeamMissionLocationSettingPage = () => {
    navigate(`/location/setting`);
  };
  const goToCalculateTeamPage = () => {
    navigate(`/teamMission/${teamId}/calculate`);
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const goToPhotoMissionPage = () => {
    navigate(`/teamMission/${teamId}/wakeup`);
  };
  const goToExerciseMissionPage = () => {
    navigate(`exercise`, { state: { lat: data.data.lat, lng: data.data.lng } });
  };
  return {
    data,
    isLoading,
    isError,
    showModal,
    selectedButton,
    handleShareKakaoBtn,
    handleOpenModal,
    handleCloseModal,
    handleButtonClick,
    goToTeamMissionTimeSettingPage,
    goToTeamMissionLocationSettingPage,
    goToPhotoMissionPage,
    goToExerciseMissionPage,
    goToCalculateTeamPage,
  };
};
