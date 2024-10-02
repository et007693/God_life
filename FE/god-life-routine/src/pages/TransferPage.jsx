// URL: "/teamMission/:teamId/fine/pay"

import React, { useEffect } from "react";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { sendFineMoney } from "../api/transferApi";
import { getTransferPageData } from "../api/transferApi";

const TransferPage = () => {
  const { teamId } = useParams();
  const [sendMoney, setSendMoney] = useState("");
  const navigate = useNavigate();

  const goToTransferSuccess = (data) => {
    navigate("/transferSuccess", {
      state: {
        sendMoney: `${sendMoney}`,
        teamId: `${teamId}`,
        myAccount: `${data.REC[0].accountNo}`,
        teamAccount: `${data.REC[0].transactionAccountNo}`,
      },
    });
  };

  const { mutate, isFetching, isError } = useMutation({
    mutationKey: ["transferData"],
    mutationFn: ({ teamId, money }) => sendFineMoney({ teamId, money }),
    staleTime: 0,
    onSuccess: (data) => goToTransferSuccess(data),
  });

  const {
    data: transferData,
    isError: isGetError,
    isFetching: isGetFetching,
  } = useQuery({
    queryKey: ["getTransferPageData"],
    queryFn: () => getTransferPageData(teamId),
    staleTime: 0,
  });

  useEffect(() => {
    console.log(transferData);
  }, [transferData]);

  if (isFetching || isGetFetching) return <div>Loading...</div>;
  if (isError || isGetError) return <div>Error</div>;

  return (
    <div className="mt-16">
      <Header title={"이체하기"} color={"orange"} />

      <div className="text-left pl-10 pt-10">
        <span className="text-2xl font-bold">{transferData.accountName}</span>
        <span className="text-lg pl-2 text-gray-500">에서</span>
      </div>

      <div className="text-left pl-10 text-gray-400 text-base">
        <span>잔액</span>
        <span className="pl-1 pt-1">{transferData.accountBalance}</span>
      </div>

      <div className="text-left pl-10 pt-10">
        <span className="text-2xl font-bold">{transferData.withdrawalAccountBankName}</span>
        <span className="text-lg pl-2 text-gray-500">팀에게</span>
      </div>

      <div className="text-left pl-10 pt-1 text-gray-400 text-base">
        {transferData.withdrawalAccountNo}
      </div>

      <div>
        <div className="text-left pl-10 pt-20 font-bold text-xl text-gray-600">
          보낼 금액
        </div>
      </div>

      <div className="relative px-8 pt-3">
        <input
          type="number"
          value={sendMoney}
          onChange={(e) => setSendMoney(e.target.value)}
          placeholder="벌금을 입력해주세요"
          className="w-full p-2 pr-12 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors mb-16"
        />
        <span className="absolute right-0 top-2 text-gray-500 pt-3 pr-7">
          (원)
        </span>
      </div>

      <div className="pt-60">
        <button
          onClick={() => {
            mutate({ teamId, money: sendMoney });
          }}
          className="bg-orange-400 text-white px-10 py-3 rounded-lg text-xl"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default TransferPage;
