import React from "react";

const AccountInfo = ({ data }) => {
  const { teamName, accountBank, accountNumber } = data;
  return (
    <div className="text-center">
      <div className="text-xl font-bold pt-3">
        <p>{data.data.title}</p>
      </div>
      <div className="text-sm text-gray-400  mb-4">
        <p>
          {data.data.accountBank} {data.data.accountNumber}
        </p>
      </div>
    </div>
  );
};

export default AccountInfo;
