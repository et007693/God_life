import React from "react";
import Modal from "../Modal";
import BettingButton from "../BettingButton";

const TeamDetailEventModal = ({
  showModal,
  handleCloseModal,
  handleButtonClick,
  selectedButton,
}) => {
  return (
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
  );
};

export default TeamDetailEventModal;
