import React from "react";

const MileageHistoryItem = () => {
  return (
    <div>
      <div className="pt-10 text-left pl-8">8월 30일 금요일</div>
      <div className="flex justify-around pl-4 pt-4">
        <div>20:39</div>
        <div>벌금면제권 구매</div>
        <div className="flex flex-col items-end">
          <div className="font-bold text-lg">-3000 P</div>
          <div className="text-gray-500 text-sm">잔액 1200 P</div>
        </div>
      </div>
    </div>
  );
};

export default MileageHistoryItem;
