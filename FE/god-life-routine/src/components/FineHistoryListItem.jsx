import React, { useState } from "react";
import coupon from "../assets/image/coupon.png";
import Modal from "../components/Modal";

const FineHistoryListItem = ({ item, data }) => {

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const handleButtonClick = () => {
    setShowModal(false);
  };

  const hour = item.transactionTime.substring(0, 2);
  const minute = item.transactionTime.substring(2, 4);



  return (
    <div>
      <div className="flex justify-between items-center pt-3">
        <div className="flex flex-col items-start pl-10">
          <div className="text-lg font-semibold">{data.teamMissionName}</div>
          <div className="text-sm text-gray-500">{hour}:{minute}</div>
        </div>

        <div className="flex flex-col items-end pl-14">
          <div className="font-bold text-xl">{item.fine}원</div>
          <div className="text-gray-500 text-sm">{item.prefixFine}원</div>
        </div>

        <div className="pr-8">
          <img
            src={coupon}
            alt="Coupon Icon"
            className="w-8 h-8"
            onClick={openModal}
          />
        </div>
      </div>

      <div className="border-b border-gray-200 mt-4 mx-4 mb-2"></div>

      <Modal
        showModal={showModal}
        onClickCloseBtn={() => setShowModal(false)}
        width="250px"
        height="260px"
        buttonText="확인"  
        buttonColor ="orange"
        onClickButton={handleButtonClick}
      >
        <div className="text-lg font-semibold pt-10">
          <div>벌금 면제권을</div>
          <div>사용하시겠습니까?</div>
        </div>
      </Modal>
    </div>
  );
};

export default FineHistoryListItem;
