import React from "react";

const AccountHistoryItem = ({ item }) => {
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        
        <div>프로필</div>
  
        <div className="text-left flex-grow px-8">
          <div className="flex font-bold">
            <div className="text-xl">{item.name}</div>
            <div className="pl-1 text-xl">{item.context}</div>
          </div>
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
