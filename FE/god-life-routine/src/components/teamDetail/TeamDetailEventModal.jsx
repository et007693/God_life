import React from "react";
import Modal from "../Modal";
import BettingButton from "../BettingButton";
import BettingAvatar from "../BettingAvatar";


const TeamDetailEventModal = ({
  showModal,
  handleCloseModal,
  handleButtonClick,
  selectedButton,
  bettingdata,
  isSuccess,
  setIsSuccess,
  mutateBettingVote
}) => {
  return (
    <Modal
      showModal={showModal}
      onClickCloseBtn={handleCloseModal}
      width="310px"
      height="580px"
      buttonText="확인"
      buttonColor="orange"
      onClickButton={handleCloseModal}
      mutateBettingVote={mutateBettingVote}
    >
      <div className="text-xl font-bold">오늘의 베팅</div>
      <div className="text-gray-400 text-sm pt-1">
        투표를 통해 상금을 획득하세요!
      </div>

      <div className=" pt-10 flex justify-center items-center space-x-8">
        <BettingAvatar member={bettingdata}/>

        <div>
          <div className="font-bold text-orange-500 text-2xl">{bettingdata.targetName}</div>
          <div className="pt-4 text-lg font-semibold">{bettingdata.rule}</div>
        </div>
      </div>
      <div className="pt-12 text-2xl font-bold">예측성공시 1,000원</div>

      <div className="flex flex-row justify-center gap-14 mt-10">
        <BettingButton
          label="성공"
          isSelected={selectedButton === "성공"}
          onClick={() => {
            console.log("성공 버튼 클릭됨");
            handleButtonClick("성공");
            setIsSuccess(true);
          }}
        />
        <BettingButton
          label="실패"
          isSelected={selectedButton === "실패"}
          onClick={() => {
            console.log("실패 버튼 클릭됨");
            handleButtonClick("실패");
            setIsSuccess(false);
          }}
        />
      </div>
    </Modal>
  );
};

export default TeamDetailEventModal;
