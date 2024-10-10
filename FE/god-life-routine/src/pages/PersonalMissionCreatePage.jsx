import React from "react";
import Header from "../components/Header";
import Select from "react-select";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPersonalMission } from "../api/personalMissionApi";
import { useMutation } from "@tanstack/react-query";
import useCreatePersonelStore from "../store/useCreatePersonelStore";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPersonalRoomSchema } from "../util/formCheckSchema";

const PersonalMissionCreatePage = () => {
  // TODO: api연결 확인
  const {account} = useCreatePersonelStore();
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationFn: (data) =>
      createPersonalMission({
        rule: data.rule,
        money: data.money,
        account: data.account,
      }),

    onSuccess: () => {
      goToPersonalMissionDetail();
    },
    onError: (error) => {
      console.log("Error creating personal mission:", error);
    },
  });

  const goToPersonalMissionDetail = () => {
    navigate(`/personalMission`);
  };

  const goToAccountSelectPage = () => {
    navigate(`/personalMission/account/select`);
  };

  const topics = [
    { value: "일찍 일어나기", label: "일찍 일어나기" },
    { value: "운동하기", label: "운동하기" },
  ];
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(createPersonalRoomSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
    mutate({
      rule: data.selectedTopic,
      money: parseInt(data.amount, 10),
      account: account,
    });
  };

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
      <Header title={"예금 통장"} color={"orange"} goBack={"/"} />
      <form onSubmit={handleSubmit(onSubmit)}>
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
            {...register("selectedTopic")}
            onChange={(selectedOption) =>
              setValue("selectedTopic", selectedOption.value)
            }
            styles={customStyles}
            placeholder="주제를 선택해주세요"
            className="w-full"
          />
          {errors.selectedTopic && <p className="text-red-500 text-sm">{errors.selectedTopic.message}</p>}
        </div>

        <div className="text-left p-10">
          <div>
            <div className="text-xl font-bold mb-4 mt-[-35px]">납입 금액</div>
            <div className="relative">
              <input
                type="number"
                {...register("amount")}
                onChange={(e) => setValue("amount", e.target.value)}
                placeholder="입금액을 입력해주세요"
                className="w-full p-2 pr-12 border-b border-gray-300 focus:border-orange-400 focus:outline-none transition-colors"
              />
              {errors.amount && <p className="text-red-500 text-sm">{errors.amount.message}</p>}
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

export default PersonalMissionCreatePage;
