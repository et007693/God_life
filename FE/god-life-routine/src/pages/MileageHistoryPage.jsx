import React from "react";
import Header from "../components/Header";
import coin from "../assets/image/coin.png";
import MileageHistoryList from "../components/mileageHistoryList";

const MileageHistoryPage = () => {
  return (
    <div>
      <Header
        title={"마일리지 이용내역"}
        backgroudcolor={"white"}
        color={"orange"}
      />
      <div className="mt-20 flex gap-2 justify-end pr-5">
        <div className="font-bold">1200</div>
        <img src={coin} alt="" />
      </div>
      <MileageHistoryList />
    </div>
  );
};

export default MileageHistoryPage;
