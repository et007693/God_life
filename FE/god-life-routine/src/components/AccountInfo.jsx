import React from "react";

const AccountInfo = ({ data }) => {
  const { teamName, accountBank, accountNumber } = data;
  return (
    <div className="text-center">
      <div className="text-xl font-bold">
        <p>{data.data.teamName}</p>
      </div>
      <div className="text-sm text-gray-500 mt-2 mb-4">
        <p>
          {data.data.accountBank} {data.data.accountNumber}
        </p>
      </div>
    </div>
  );
};

export default AccountInfo;
