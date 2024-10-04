// URL: "/teamMission/1"
import Header from "../components/Header";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import AvatarList from "../components/AvatarList";
import InviteMemberBtn from "../components/InviteMemberBtn";
import AccountInfo from "../components/AccountInfo";
import TeamMissionDetailBody from "../components/TeamMissionDetailBody";
import firecracker from "../assets/firecracker.png";
import Modal from "../components/Modal";
import BettingButton from "../components/BettingButton";
import TeamMissionDetailThreeButton from "../components/TeamMissionDetailThreeButton";
import LoadingSpinner from "../components/common/LoadingSpinner";
import SettedHomeMap from "../components/SettedHomeMap";
import { useTeamMissionDetailPage } from "../hooks/useTeamMissionDetailPage";

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
          <div className="w-full flex justify-center -space-x-4 rtl:space-x-reverse">
            <AvatarList memberList={data.data.memberList} />
            <InviteMemberBtn onClick={handleShareKakaoBtn} />
          </div>
          <AccountInfo data={data} />
        </div>
        <TeamMissionDetailBody data={data} />
        <TeamMissionDetailThreeButton navigate={navigate} teamId={teamId}/>

        <button
          className="mt-2 ml-auto pr-2 block text-left"
          onClick={goToCalculateTeamPage}
        >
          <div className="font-bold text-gray-600">정산하기 →</div>
        </button>

        <div className="text-xl font-bold mt-6 text-left w-full">
          {data.data.rule}
        </div>
        <div className="text-xm text-gray-400 text-left w-full">
          평일에만 미션이 주어집니다.
        </div>
        {data.data.rule == "일찍 일어나기" ? (
          data.data.timeSet == true ? (
            <div
              onClick={goToPhotoMissionPage}
              className="flex relative justify-around bg-gray-100 mt-4 px-8 py-20 rounded-2xl w-full"
            >
              <div className="text-3xl font-bold text-center">
                {data.data.meridiem} {data.data.time}
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
        ) : (
          <div
            className="flex relative justify-around bg-gray-100 px-8 py-5 rounded-2xl w-full"
          >
          <SettedHomeMap data={data} onclickSettingBtn={goToTeamMissionLocationSettingPage} onclickMap={goToExerciseMissionPage}/>
          </div>
        ) }
      </div>
    </div>
  );
};

export default TeamMissionDetailPage;
