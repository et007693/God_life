import React from "react";
import Header from "../components/Header";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPersonalMission } from "../api/personalMissionApi";
import { useMutation } from "@tanstack/react-query";

const PersonalMissionCreatePage = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [deposit, setDeposit] = useState("");
  const navigate = useNavigate();
  const {data,mutate} = useMutation({
    mutationFn: (data) => 
      createPersonalMission(data),
    onSuccess: (data) => {}
    
  });
  const goToMissionTimeSettingPage = () => {
    navigate(`/personalMission/time/setting`);
  };
  const goToMissionLocationsSettingPage = () => {
    navigate(`/personalMission/locations/setting`);
  };

  const goToAccountSelectPage = () => {
    navigate(`/personalMission/account/select`);
  };

  const topics = [
    { value: "wakeup", label: "일찍 일어나기" },
    { value: "exercise", label: "운동하기" },
  ];

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      borderTop: "none",
      borderLeft: "none",
      borderRight: "none",
      borderBottom: "1px solid #e2e8f0",
      borderRadius: 0,
      boxShadow: "none",
      outline: "none",
      "&:hover": {
        borderBottom: "1px solid #fd826a",
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "white" : "white",
      color: state.isSelected ? "black" : "black",
      "&:hover": {
        backgroundColor: "#fff3e9",
        color: "black",
      },
    }),
  };

  return (
    <div>
      <Header title={"예금 통장"} color={"orange"} goBack={"/"}/>
      <p className="text-center font-bold text-red-300 pt-20">
        매일매일 미션 달성하고 우대금리를 적용받아요
      </p>

      <div className="text-left p-7">
        <p className="text-2xl font-bold">미션기간 : 1년</p>
        <p className="text-xl p-2">기본 금리 3%</p>
        <div>
          <p className="text-xl pl-2">우대 금리</p>
          <div className="pl-2">
            <p className="text-sm">(미션 성공시)</p>
            <div className="pt-2 pl-5">
              <li>30일마다 0.3%</li>
              <li>365일 성공시 1%</li>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left p-10">
        <div className="text-xl font-bold mb-4 mt-[-30px]">주제</div>
        <Select
          options={topics}
          value={selectedTopic}
          styles={customStyles}
          onChange={(selectedOption) => setSelectedTopic(selectedOption)}
          placeholder="주제를 선택해주세요"
          className="w-full"
        />
      </div>

      <div className="text-left p-10">
        <div>
          <div className="text-xl font-bold mb-4 mt-[-35px]">납입 금액</div>
          <div className="relative">
            <input
              type="number"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              placeholder="벌금을 입력해주세요"
              className="w-full p-2 pr-12 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors"
            />
            <span className="absolute right-0 top-2 text-gray-500">(원)</span>
          </div>
        </div>
      </div>

      <div className="text-left p-10">
        <div
          className="flex justify-between items-center text-xl font-bold mb-4 mt-[-30px] cursor-pointer"
          onClick={goToAccountSelectPage}
        >
          <span>계좌 선택</span>
          <span className="text-gray-400">{">"}</span>{" "}
        </div>
      </div>

      <div className="pt-7">
        <button
          onClick={() => {
            goToMissionTimeSettingPage();
          }}
          className="bg-orange-400 text-white px-10 py-3 rounded-lg text-xl"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PersonalMissionCreatePage;
