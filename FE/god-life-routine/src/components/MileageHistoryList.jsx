import React from "react";
import MileageHistoryItem from "../components/MileageHistoryItem"

const MileageHistoryList = () => {
  return (
    <div>
      <div>
        <div className="text-left pl-10 pt-6">2024년 8월</div>
        <div className="flex justify-center pt-3">
          <div className="flex justify-between items-center px-5 py-3 border-2 border-gray-300 rounded-lg w-80">
            <div>사용한 마일리지</div>
            <div>12,000P</div>
          </div>
        </div>
      </div>
      
    <MileageHistoryItem />

    
    </div>
  );
};

export default MileageHistoryList;
