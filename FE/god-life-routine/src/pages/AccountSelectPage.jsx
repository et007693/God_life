import React, { useState } from "react";
import Header from "../components/Header";
import kakaoBank from "../assets/kakaoBank.png";

const AccountSelectPage = () => {
  const [isDone, setIsDone] = useState(false);
  return (
    <div>
      <Header title={"계좌 선택"} color={"orange"} />
      <div className="text-center text-gray-500 pt-7">
        우대금리를 적용받을 계좌의 은행을 선택해주세요
      </div>
      <div className="flex items-center mt-5 pl-10 pt-7">
        <img
          src={kakaoBank}
          alt="Kakao Logo"
          className="w-12 h-12 rounded-full"
        />
        <div className="text-xl font-bold pl-5 pb-1">카카오뱅크</div>
        <input
          type="checkbox"
          className="w-5 h-5 accent-orange-600 rounded-lg ml-32"
          checked={isDone}
          onChange={() => setIsDone(!isDone)}
        />
      </div>
    </div>
  );
};

export default AccountSelectPage;
