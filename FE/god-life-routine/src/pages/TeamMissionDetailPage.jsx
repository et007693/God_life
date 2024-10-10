// URL: "/teamMission/1"
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { bettingVote, getBettingData } from "../api/bettingApi";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Header from "../components/Header";
import TeamDetailEventBanner from "../components/teamDetail/TeamDetailEventBanner";
import TeamDetailEventModal from "../components/teamDetail/TeamDetailEventModal";
import TeamDetailMissionInfo from "../components/teamDetail/TeamDetailMissionInfo";
import TeamDetailRoomInfo from "../components/teamDetail/TeamDetailRoomInfo";
import { useTeamMissionDetailPage } from "../hooks/useTeamMissionDetailPage";

const TeamMissionDetailPage = () => {
  const {
    data,
    isLoading,
    isError,
    showModal,
    selectedButton,
    bettingdata,
    betingFetching,
    bettingError,
    handleShareKakaoBtn,
    handleOpenModal,
    handleCloseModal,
    goToTeamMissionTimeSettingPage,
    goToTeamMissionLocationSettingPage,
    goToPhotoMissionPage,
    goToExerciseMissionPage,
    goToCalculateTeamPage,
    handleButtonClick,
  } = useTeamMissionDetailPage();
  // 로딩 중일 때 로딩 표시
  const navigate = useNavigate();

  const { teamId } = useParams();
  const [isSuccess, setIsSuccess] = useState(true);



  const { mutate: mutateBettingVote } = useMutation({
    mutationKey: ["bettingVote"],
    mutationFn: () => bettingVote(isSuccess, teamId),
  });

  if (betingFetching) return <div>Loading...</div>;
  if (bettingError) return <div>Error</div>;
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner />
      </div>
    );
  if (isError) {
    return <Navigate to="/login" />;
  }
  return (
    <div>
      <Header
        title={"팀 미션"}
        color={"white"}
        backgroundcolor={"orange"}
        goBack={"/"}
      />

      {/* 이벤트 */}
      {data.bettingOpen &&<TeamDetailEventBanner handleOpenModal={handleOpenModal} />}

      {showModal && (
        <TeamDetailEventModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleButtonClick={handleButtonClick}
          selectedButton={selectedButton}
          bettingdata={bettingdata}
          isSuccess={isSuccess}
          setIsSuccess={setIsSuccess}
          mutateBettingVote={mutateBettingVote}
        />
      )}

      <div className={`flex flex-col items-center px-10 py-5 mb-16 ${data.data.bettingOpen ? "" : "mt-24"}`}>
        <TeamDetailRoomInfo
          data={data}
          navigate={navigate}
          teamId={teamId}
          goToCalculateTeamPage={goToCalculateTeamPage}
          handleShareKakaoBtn={handleShareKakaoBtn}
        />
        <TeamDetailMissionInfo
          data={data}
          goToPhotoMissionPage={goToPhotoMissionPage}
          goToTeamMissionTimeSettingPage={goToTeamMissionTimeSettingPage}
          goToTeamMissionLocationSettingPage={
            goToTeamMissionLocationSettingPage
          }
          goToExerciseMissionPage={goToExerciseMissionPage}
        />
      </div>
    </div>
  );
};

export default TeamMissionDetailPage;
