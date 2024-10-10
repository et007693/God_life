import React from "react";
import AccountInfo from "../AccountInfo";
import AvatarList from "../AvatarList";
import InviteMemberBtn from "../InviteMemberBtn";
import TeamMissionDetailBody from "./TeamMissionDetailBody";
import TeamMissionDetailThreeButton from "./TeamMissionDetailThreeButton";

const TeamDetailRoomInfo = ({
  data,
  navigate,
  teamId,
  goToCalculateTeamPage,
  handleShareKakaoBtn,
}) => {
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="w-full flex justify-center -space-x-4 rtl:space-x-reverse">
          <AvatarList memberList={data.data.memberList} />
          <InviteMemberBtn onClick={handleShareKakaoBtn} />
        </div>
        <AccountInfo data={data} />
      </div>
      <TeamMissionDetailBody data={data} />
      <TeamMissionDetailThreeButton
        navigate={navigate}
        teamId={teamId}
        delayedFine={data.data.delayedFine}
      />

      <button
        className="mt-2 ml-auto pr-2 block text-left"
        onClick={goToCalculateTeamPage}
      >
        <div className="font-bold text-gray-600 mt-1">정산하기 →</div>
      </button>
    </>
  );
};

export default TeamDetailRoomInfo;
