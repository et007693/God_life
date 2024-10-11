import React from "react";

const AccountHistoryItem = ({ item }) => {
  return (
    <div>
      <div className="flex justify-between items-center p-4">
        <img
          src={item.memberProfileImage}
          alt={`${item.memberName} 프로필 이미지`}
          className="w-12 h-12 rounded-full"
        />

        <div className="text-left flex-grow px-6">
          <div className="flex font-bold">
            <div className="text-xl">{item.memberName}</div>
            <div className="pl-1 text-xl">{item.depositType}</div>
          </div>
          <div className="text-gray-400 text-sm">{item.chargedBy}</div>
        </div>

        <div className="text-right">
          <div className="font-bold text-xl">{item.deposit}원</div>
          <div className="text-gray-400 text-sm">{item.balance} 원</div>
        </div>
      </div>
    </div>
  );
};

export default AccountHistoryItem;
