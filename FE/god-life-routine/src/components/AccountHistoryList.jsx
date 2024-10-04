import React from "react";
import AccountHistoryItem from "./AccountHistoryItem";

// 날짜로 그룹화
const groupByDate = (arr) => {
  return arr.reduce((acc, item) => {
    // console.log(item.fineDate);
    const dateKey = item.fineDate;
    if (!acc[dateKey]) {
      acc[dateKey] = []; // 해당 날짜에 대한 배열 초기화
    }
    acc[dateKey].push(item); // 같은 날짜에 해당하는 데이터를 배열에 추가
    return acc;
  }, {});
};

const AccountHistoryList = ({ data }) => {
  const groupedData = groupByDate(data);

  return (
    <div>
      {Object.keys(groupedData).map((dateKey) => {
        const year = dateKey.substring(0, 4);
        const month = dateKey.substring(4, 6);
        const day = dateKey.substring(6, 8);
        const formattedDate = new Date(`${year}-${month}-${day}`);

        return (
          <div key={dateKey}>
            <div className="text-left pl-4 pt-4">
              {formattedDate.toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
              })}
            </div>
            {groupedData[dateKey].map((item) => (
              <AccountHistoryItem key={item.id} item={item} />
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default AccountHistoryList;
