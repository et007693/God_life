import React from "react";
import Header from "../components/Header";
import check from "../assets/check.png";
// navigate로 state에 데이터를 넘겼다면,
// sendMoney는 props가 아니라 useLocation을 통해 받아야 함
import { useLocation, useNavigate } from "react-router-dom";

const TransferSuccessPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { sendMoney, teamId, myAccount, teamAccount } = location.state;

  const goToTeamMissionDetail = () => {
    navigate(`/teamMission/${teamId}`);
  };

  const formatAccountNumber = (account) => {
    let accountArray = [];
    for (let i = 0; i < account.length; i += 4) {
      accountArray.push(account.slice(i, i + 4));
    }
    return accountArray.join("-");
  };

  return (
    <div>
      <div>
        <div className="text-center text-3xl font-bold pt-40">이체완료</div>
        <div className="flex justify-center items-center pt-10">
          <img src={check} alt="check" className="w-20 h-20" />
        </div>

        <div className="text-center text-gray-700 text-base pt-10">
          벌금통장에 이체되었습니다.
        </div>

        <div className="font-bold text-4xl text-center pt-10">
          {sendMoney}원
        </div>

        <div className="pt-14">
          <span className="pt-2 text-gray-400 text-base">출금 계좌</span>
          <span className="pl-8 text-gray-500">
            {myAccount.startsWith("999")
              ? `싸피 ${formatAccountNumber(myAccount)}`
              : formatAccountNumber(myAccount)}
          </span>
        </div>

        <div>
          <span className="pt-2 text-gray-400 text-base">입금 계좌</span>
          <span className="pl-8 text-gray-500">
            {teamAccount.startsWith("999")
              ? `싸피 ${formatAccountNumber(teamAccount)}`
              : formatAccountNumber(teamAccount)}
          </span>
        </div>

        <div className="flex justify-center items-center pt-28">
          <button
            onClick={() => {
              goToTeamMissionDetail();
            }}
            className="bg-orange-400 text-white px-10 py-3 rounded-lg text-xl"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransferSuccessPage;
