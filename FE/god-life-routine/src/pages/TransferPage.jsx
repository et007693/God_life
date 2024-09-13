// URL: "/teamMission/:teamId/fine/pay"

import React from "react";
import Header from "../components/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const TransferPage = () => {
  const [sendMoney, setSendMoney] = useState("");
  const navigate = useNavigate();

  const goToTransferSuccess = () => {
    navigate("/transferSuccess");
  };

  return (
    <div>
      <Header title={"이체하기"} color={"orange"} />

      <div className="text-left pl-10 pt-10">
        <span className="text-2xl font-bold">내 계좌</span>
        <span className="text-lg pl-2 text-gray-500">에서</span>
      </div>

      <div className="text-left pl-10 text-gray-400 text-base">
        <span>잔액</span>
        <span className="pl-1 pt-1">100,500원</span>
      </div>

      <div className="text-left pl-10 pt-10">
        <span className="text-2xl font-bold">송창송창용</span>
        <span className="text-lg pl-2 text-gray-500">팀에게</span>
      </div>

      <div className="text-left pl-10 pt-1 text-gray-400 text-base">
        싸피 9999-88-22222
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
            goToTransferSuccess();
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
