import React from "react";
import Header from "../components/Header";
import BenefitTable from "../components/BenefitTable";
import { useQuery } from "@tanstack/react-query";
import { getPersonalAccountDeatailData } from "../api/personalAccountDetailApi";

const PersonalAccountDetailPage = () => {

  const { data, isFetching, isError } = useQuery({
    queryKey: ["getPersonalAccountDeatailData"],
    queryFn: getPersonalAccountDeatailData,
    staleTime: 0,
  })

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Header title={"나의 미션"} color={"orange"} />
      <div className="text-left ml-5 mt-20">
        <div className="text-lg font-bold">계좌 기본 정보</div>
        <div className="border-b border-gray-400 mt-3 mr-5"></div>
        <div className="flex flex-row justify-between">
          <span className="text-gray-500 ml-4 mt-3">적용이율</span>
          <span className="text-black-500 mr-8 mt-3">연 4% (고정금리)</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="text-gray-500 ml-4 mt-3">가입일</span>
          <span className="text-black-500 mr-8 mt-3">{data.createdDate}</span>
        </div>

        <div className="flex flex-row justify-between">
          <span className="text-gray-500 ml-4 mt-3">만기일</span>
          <span className="text-black-500 mr-8 mt-3">{data.expiredDate}</span>
        </div>
      </div>

      <div className="text-left ml-5 mt-8">
        <div className="text-lg font-bold mt-8">우대 이자율 조건</div>
        <div className="border-b border-gray-400 mt-3 mr-5 mb-2"></div>
      </div>
      
      <BenefitTable />
    </div>
    
  );
};

export default PersonalAccountDetailPage;
