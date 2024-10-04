import React from "react";

const MileageHistoryItem = ({ data }) => {
  let previousDate = null; // 이전 항목의 날짜를 추적할 변수

  return (

    <div>
      {data.history.map((item, index) => {
        const currentDate = `${item.month}월 ${item.day}일`;

        // 날짜 비교 
        const dateElement = previousDate !== currentDate ? (
          <div className="pt-10 text-left pl-6 text-lg">{currentDate}</div>
        ) : null;

        previousDate = currentDate; // 날짜 갱신

        return (
          <div key={index}>
            {dateElement}
            <div className="flex justify-around pt-4">
              <div className="pl-4">
                {item.hour}:{item.minute < 10 ? `0${item.minute}` : item.minute}
              </div>
              <div className="text-md">
                {`${item.itemName.replace("구매", "")} ${item.amount}개 구매`}
              </div>
              <div className="flex flex-col items-end">
                <div className="font-bold text-lg">- {item.usedMileage} P</div>
                <div className="text-gray-400 text-sm">
                  {item.leftMileage} P
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>


  );
};

export default MileageHistoryItem;
