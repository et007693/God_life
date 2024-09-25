import React from "react";
import FineHistoryListItem from "./FineHistoryListItem";

const groupByMonth = (arr) => {
  return arr.reduce((acc, item) => {
    const date = new Date(item.date);
    const MonthKey = date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
    });

    if (!acc[MonthKey]) {
      acc[MonthKey] = [];
    }
    acc[MonthKey].push(item);
    // console.log(item);
    // console.log(MonthKey);
    return acc;
  }, {});
};

const FineHistoryList = () => {
  const arr = [
    {
      id: 1,
      date: "2024-08-20",
      time: "16:15",
      fine: "-500원",
      balance: "2,500원",
    },
    {
      id: 2,
      date: "2024-08-28",
      time: "10:20",
      fine: "-500원",
      balance: "3,000원",
    },
    {
      id: 3,
      date: "2024-09-06",
      time: "06:02",
      fine: "-500원",
      balance: "3,500원",
    },
    {
      id: 4,
      date: "2024-09-10",
      time: "12:08",
      fine: "-500원",
      balance: "4,000원",
    },{
      id: 5,
      date: "2024-09-18",
      time: "23:54",
      fine: "-500원",
      balance: "4,500원",
    },
  ];

  const currentDate = new Date();
  const currentMonthKey = currentDate.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  });

  const groupMonthData = groupByMonth(arr);
  const currentMonthData = groupMonthData[currentMonthKey] || [];

  return (
    <div>
      {currentMonthData.length > 0 ? (
        <div>
          <div className="flex justify-between pl-5 pt-8">
            <div className="text-md text-gray-400">{currentMonthKey}</div>
            <div className="text-sm text-gray-400 pr-4">벌금면제권</div>
          </div>

          {currentMonthData.map((item) => (
            <FineHistoryListItem key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">현재 달에 해당하는 데이터가 없습니다.</div>
      )}
    </div>
  );
};

export default FineHistoryList;
