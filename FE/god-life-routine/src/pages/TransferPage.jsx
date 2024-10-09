// URL: "/teamMission/:teamId/fine/pay"

import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getTransferFineData, getTransferPageData, sendFineMoney } from "../api/transferApi";
import Header from "../components/Header";

const TransferPage = () => {
  const { teamId } = useParams();
  const [sendMoney, setSendMoney] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // 밀린벌금데이터 불러오기
  const {
    data: transferFineData,
    isFetching: isFineFetching,
    isError: isFineError,
  } = useQuery({
    queryKey: ["getTransferFineData"],
    queryFn: () => getTransferFineData(teamId),
    staleTime: 0,
  });

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


  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    // 벌금이 지연된 금액을 초과하는지 확인
    if (transferFineData && inputValue > transferFineData.delayedFine) {
      setErrorMessage("금액을 초과했습니다.");
    } else {
      setErrorMessage("");
    }
    setSendMoney(inputValue);
  };

  // 금액 초과하면 확인 버튼 비활성화
  const isDisabled = transferFineData
    ? sendMoney > transferFineData.delayedFine
    : true;

  if (isFetching || isGetFetching || isFineFetching)
    return <div>Loading...</div>;
  if (isError || isGetError || isFineError) return <div>Error</div>;

  if (transferFineData && transferFineData.delayedFine === 0) 
    return (
  <>
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">벌금이 없습니다</h2>
        <p className="text-gray-600">현재 납부할 벌금이 없습니다.</p>
        <button onClick={() => navigate(`/teamMission/${teamId}`)} className="mt-4 px-4 py-2 bg-orange-400 text-white rounded">
          홈으로 가기
        </button>
      </div>
    </div>
  </>
  );
  return (
    <div className="mt-16">
      <Header title={"이체하기"} color={"orange"} />

      <div className="text-left pl-10 pt-10">
        <span className="text-2xl font-bold">{transferData.accountName}</span>
        <span className="text-lg pl-2 text-gray-500">에서</span>
      </div>

      <div className="text-left pl-10 text-gray-400 text-base">
        <span>잔액</span>
        <span className="pl-1 pt-1">{transferData.accountBalance}원</span>
      </div>

      <div className="text-left pl-10 pt-10">
        <span className="text-2xl font-bold mr-2">
          {transferData.withdrawalAccountBankName}
        </span>

        <span className="text-lg pl-0 text-gray-500">팀에게</span>
      </div>

      <div className="text-left pl-10 pt-1 text-gray-400 text-base">
        {transferData.withdrawalAccountNo.startsWith("999")
          ? `싸피 ${transferData.withdrawalAccountNo}`
          : transferData.withdrawalAccountNo}
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
          // onChange={(e) => setSendMoney(e.target.value)}
          onChange={handleInputChange}
          placeholder="벌금을 입력해주세요"
          className="w-full p-2 pr-12 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors mb-2"
        />
        <span className="absolute right-0 top-2 text-gray-500 pt-3 pr-7">
          (원)
        </span>
        {errorMessage && (
          <div className="text-red-500 text-sm text-left pt-1">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="pt-60">
        <button
          onClick={() => {
            if (!isDisabled) {
              mutate({ teamId, money: sendMoney });
            }
          }}
          className={`px-10 py-3 rounded-lg text-xl ${
            isDisabled ? "bg-gray-300" : "bg-orange-400"
          } text-white`}
          disabled={isDisabled}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default TransferPage;
