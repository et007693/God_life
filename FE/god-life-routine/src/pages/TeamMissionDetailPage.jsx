// URL: "/teamMission/1"
import Header from "../components/Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AvatarList from "../components/AvatarList";
import InviteMemberBtn from "../components/InviteMemberBtn";
import AccountInfo from "../components/AccountInfo";
import TeamMissionDetailBody from "../components/teamDetail/TeamMissionDetailBody";
import firecracker from "../assets/firecracker.png";
import Modal from "../components/Modal";
import BettingButton from "../components/BettingButton";
import TeamMissionDetailThreeButton from "../components/teamDetail/TeamMissionDetailThreeButton";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SettedHomeMap from "../components/SettedHomeMap";
import { useTeamMissionDetailPage } from "../hooks/useTeamMissionDetailPage";
import TeamDetailEventBanner from "../components/teamDetail/TeamDetailEventBanner";
import TeamDetailEventModal from "../components/teamDetail/TeamDetailEventModal";
import TeamDetailRoomInfo from "../components/teamDetail/TeamDetailRoomInfo";
import TeamDetailMissionInfo from "../components/teamDetail/TeamDetailMissionInfo";

const TeamMissionDetailPage = () => {
  const {data,isLoading,isError,showModal,selectedButton,handleShareKakaoBtn,handleOpenModal,handleCloseModal,
    goToTeamMissionTimeSettingPage,
    goToTeamMissionLocationSettingPage,
    goToPhotoMissionPage,
    goToExerciseMissionPage,
    goToCalculateTeamPage,
    handleButtonClick} = useTeamMissionDetailPage();
  // 로딩 중일 때 로딩 표시
  const navigate = useNavigate();
  const {teamId} = useParams();
  if (isLoading)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner />
      </div>
    );
  if(isError){
    return (
      <Navigate to="/login" />
    );
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
      <TeamDetailEventBanner handleOpenModal={handleOpenModal}/>

      {showModal && (
        <TeamDetailEventModal
          showModal={showModal}
          handleCloseModal={handleCloseModal}
          handleButtonClick={handleButtonClick}
          selectedButton={selectedButton}
        />
      )}

      <div className="flex flex-col items-center px-10 py-5 mb-16">
        <TeamDetailRoomInfo data={data} navigate={navigate} teamId={teamId} goToCalculateTeamPage={goToCalculateTeamPage} handleShareKakaoBtn={handleShareKakaoBtn}/>
        <TeamDetailMissionInfo data={data} goToPhotoMissionPage={goToPhotoMissionPage} goToTeamMissionTimeSettingPage={goToTeamMissionTimeSettingPage} goToTeamMissionLocationSettingPage={goToTeamMissionLocationSettingPage} goToExerciseMissionPage={goToExerciseMissionPage}/>
      </div>
    </div>
  );
};

export default TeamMissionDetailPage;
