import React from "react";
import AccountHistoryItem from "./AccountHistoryItem";

// 날짜로 그룹화
const groupByDate = (arr) => {
  return arr.reduce((acc, item) => {
    const dateKey = item.date;
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
      {Object.keys(groupedData)
        .map((dateKey) => (
          <div key={dateKey}>
            <div className="text-left pl-4 pt-4">
              {new Date(dateKey).toLocaleDateString("ko-KR", {
                month: "long",
                day: "numeric",
              })}
            </div>
            {groupedData[dateKey].map((item) => (
              <AccountHistoryItem key={item.id} item={item}/>
            ))}
          </div>
        ))}
    </div>
  );
};

export default AccountHistoryList;
