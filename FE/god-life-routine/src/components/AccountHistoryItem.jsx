import React from "react";

const AccountHistoryItem = ({ item }) => {
  return (
    <div>
      {/* <div className="text-left pl-4 pt-4">{item.date}</div> */}

      <div className="flex justify-between p-4">
        <div>프로필</div>
        <div className="text-left pr-20">
          <div className="font-bold text-xl">{item.context}</div>
          <div className="text-gray-400 text-sm">{item.mission}</div>
        </div>
        <div className="text-right">
          <div className="font-bold text-xl">{item.fine}</div>
          <div className="text-gray-400 text-sm">{item.balance}</div>
        </div>
      </div>
    </div>
  );
};

export default AccountHistoryItem;
