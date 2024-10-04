// URL: "/teamMission/create"

import React from "react";
import Header from "../components/Header";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTeamRoom } from "../api/teamMissionApi";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createTeamRoomSchema } from "../util/formCheckSchema";

const TeamMissionCreatePage = () => {
  const topics = [
    { value: "일찍 일어나기", label: "일찍 일어나기" },
    { value: "운동하기", label: "운동하기" },
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
  
  const navigate = useNavigate();
  const goToTeamMissionDetail = (id) => {
    navigate(`/teamMission/${id}`);
  };
  const {mutate} = useMutation({
    mutationFn: (data)=>createTeamRoom({"title":data.name,"fine":data.penalty,"rule":data.selectedTopic,"period":data.selectedMonth}),
    onSuccess: (data) => {
      goToTeamMissionDetail(data.data.id);
    }
  });
  const {register,handleSubmit,setValue,formState:{errors}} = useForm({
    resolver:yupResolver(createTeamRoomSchema),
    mode:"onChange"
  });
  const onSubmit = (data) => {
    console.log(data);
    mutate({
      name:data.name,
      penalty:data.penalty,
      selectedTopic:data.selectedTopic,
      selectedMonth:data.selectedMonth
    });
  }
  return (
    <div>
      <Header title={"벌금 통장"} color={"orange"} goBack={"/"}/>
      <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-left p-10 mt-16">
        <div className="mb-16">
          <div className="text-xl font-bold mb-4">이름</div>
          <input
            type="text"
            {...register("name")}
            onChange={(e)=>setValue("name",e.target.value)}
            placeholder="이름을 입력해주세요"
            className="w-full p-2 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-16">
          <div className="text-xl font-bold mb-4">미션당 벌금</div>
          <div className="relative">
            <input
              type="number"
              {...register("penalty")}
              pattern="^[1-9][0-9]*$"
              required
              placeholder="벌금을 입력해주세요"
              className="w-full p-2 pr-12 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors"
            />
            <span className="absolute right-0 top-2 text-gray-500">(원)</span>
          </div>
          {errors.penalty && <p className="text-red-500 text-sm">{errors.penalty.message}</p>}
        </div>
        <div className="mb-16">
          <div className="text-xl font-bold mb-4">주제</div>
          <Select
            options={topics}
            styles={customStyles}
            {...register("selectedTopic")}
            onChange={(selectedOption)=>setValue("selectedTopic",selectedOption.value)}
            placeholder="주제를 선택해주세요"
            className="w-full "
          />
          {errors.selectedTopic && <p className="text-red-500 text-sm">{errors.selectedTopic.message}</p>}
        </div>
        <div className="mb-16">
          <div className="text-xl font-bold mb-4">기간</div>
          <Select
            options={months}
            styles={customStyles}
            {...register("selectedMonth")}
            onChange={(selectedOption)=>setValue("selectedMonth",selectedOption.value)}
            menuPlacement="top"
            placeholder="기간을 선택해주세요"
            className="w-full"
          />
          {errors.selectedMonth && <p className="text-red-500 text-sm">{errors.selectedMonth.message}</p>}
        </div>
      </div>
      <button
        type="submit"
        className="bg-orange-400 text-white px-10 py-3 rounded-lg text-xl"
      >
        확인
        </button>
      </form>
    </div>
  );
};

export default TeamMissionCreatePage;
