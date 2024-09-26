import React from "react";
import BenefitTableItem from "./BenefitTableItem";

const BenefitTable = () => {
  const arr = [
    {
      term: "30일",
      rate: "0.3%",
      isApplied: "O",
    },
    {
      term: "60일",
      rate: "0.3%",
      isApplied: "O",
    },
    {
      term: "90일",
      rate: "0.3%",
      isApplied: "O",
    },{
      term: "120일",
      rate: "0.3%",
      isApplied: "O",
    },{
      term: "180일",
      rate: "0.3%",
      isApplied: "O",
    },{
      term: "210일",
      rate: "0.3%",
      isApplied: "O",
    },{
      term: "240일",
      rate: "0.3%",
      isApplied: "X",
    },{
      term: "270일",
      rate: "0.3%",
      isApplied: "X",
    },{
      term: "300일",
      rate: "0.3%",
      isApplied: "X",
    },{
      term: "330일",
      rate: "0.3%",
      isApplied: "X",
    },{
      term: "360일",
      rate: "0.3%",
      isApplied: "X",
    },{
      term: "365일",
      rate: "1%",
      isApplied: "X",
    },
  ];
  return (
    <>
      <div class="p-8 pt-2">
        <table class=" w-full border">
          <thead>
            <tr>
              <th class="font-bold p-2 border-b text-center bg-gray-100">금리 상세</th>
              <th class="font-bold p-2 border-b text-center bg-gray-100">우대 금리</th>
              <th class="font-bold py-2 px-4 border-b text-center bg-gray-100">적용 여부</th>
            </tr>
          </thead>
          <tbody>
            {arr.map((item) => (
              <BenefitTableItem key={item.term} item={item} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BenefitTable;
