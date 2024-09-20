import React from "react";
import AccountHistoryItem from './AccountHistoryItem'

const groupByDate = (arr) => {
  return arr.reduce((acc, item) => {
    const dateKey = new Date(item.date).toLocaleDateString("ko-KR", {
      month: "long",
      day: "numeric",
    }); // 날짜를 키로 사용
    if (!acc[dateKey]) {
      acc[dateKey] = []; // 해당 날짜에 대한 배열 초기화
    }
    acc[dateKey].push(item); // 같은 날짜에 해당하는 데이터를 배열에 추가
    return acc;
  }, {});
};

const AccountHistoryList = () => {
  const arr = [
    {
      id: 1 ,
      date : "2024-09-01",
      context : "송창용 벌금",
      mission: "일찍 일어나기",
      fine: "500원", 
      balance: "3,000원"
    },
    {
      id: 2 ,
      date : "2024-09-01",
      context : "조창훈 벌금",
      mission: "일찍 일어나기",
      fine: "500원",
      balance: "3,500원"
    },
    {
      id: 3 ,
      date : "2024-09-04",
      context : "송창용 벌금",
      mission: "일찍 일어나기",
      fine: "500원",
      balance: "4,000원"
    },
  ];

  const groupedData = groupByDate(arr);

  return (
    <div>
      {Object.keys(groupedData).map((dateKey) => (
        <div key = {dateKey}>
          <div className="text-left pl-4 pt-4">{dateKey}</div>
          {groupedData[dateKey].map((item) => (
            <AccountHistoryItem key={item.id} item={item}/>
      ))}
        </div>
    ))}
    </div>
  );
};

export default AccountHistoryList;
