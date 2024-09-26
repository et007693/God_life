// URL: "/teamMission/create"

import React from "react";
import Header from "../components/Header";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const TeamMissionCreatePage = () => {
  const [name, setName] = useState("");
  const [penalty, setPenalty] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const navigate = useNavigate();
  const goToTeamMissionDetail = () => {
    navigate("/teamMission/1");
  };

  const topics = [
    { value: "wakeup", label: "일찍 일어나기" },
    { value: "exercise", label: "운동하기" },
  ];

  const months = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
    { value: "11", label: "11" },
    { value: "12", label: "12" },
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
      <Header title={"벌금 통장"} color={"orange"} goBack={"/"}/>
      <div className="text-left p-10 mt-16">
        <div>
          <div className="text-xl font-bold mb-4">이름</div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름을 입력해주세요"
            className="w-full p-2 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors mb-16"
          />
        </div>
        <div>
          <div className="text-xl font-bold mb-4">미션당 벌금</div>
          <div className="relative">
            <input
              type="number"
              value={penalty}
              onChange={(e) => setPenalty(e.target.value)}
              placeholder="벌금을 입력해주세요"
              className="w-full p-2 pr-12 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors mb-16"
            />
            <span className="absolute right-0 top-2 text-gray-500">(원)</span>
          </div>
        </div>
        <div>
          <div className="text-xl font-bold mb-4">주제</div>
          <Select
            options={topics}
            value={selectedTopic}
            styles={customStyles}
            onChange={(selectedOption) => setSelectedTopic(selectedOption)}
            placeholder="주제를 선택해주세요"
            className="w-full mb-16"
          />
        </div>
        <div>
          <div className="text-xl font-bold mb-4">기간</div>
          <Select
            options={months}
            value={selectedMonth}
            styles={customStyles}
            onChange={(selectedOption) => setSelectedMonth(selectedOption)}
            menuPlacement="top"
            placeholder="기간을 선택해주세요"
            className="w-full mb-6"
          />
        </div>
      </div>
      <button
        onClick={() => {
          goToTeamMissionDetail();
          console.log({ name, penalty, selectedTopic, selectedMonth });
        }}
        className="bg-orange-400 text-white px-10 py-3 rounded-lg text-xl"
      >
        확인
      </button>
    </div>
  );
};

export default TeamMissionCreatePage;
