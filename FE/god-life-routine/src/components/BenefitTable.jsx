import React from "react";
import BenefitTableItem from "./BenefitTableItem";

const BenefitTable = ({ data }) => {
  console.log(data);
  const arr = [
    {
      term: 30,
      rate: "0.3%",
    },
    {
      term: 60,
      rate: "0.3%",
    },
    {
      term: 90,
      rate: "0.3%",
    },{
      term: 120,
      rate: "0.3%",
    },{
      term: 180,
      rate: "0.3%",
    },{
      term: 210,
      rate: "0.3%",
    },{
      term: 240,
      rate: "0.3%",
    },{
      term: 270,
      rate: "0.3%",
    },{
      term: 300,
      rate: "0.3%",
    },{
      term: 330,
      rate: "0.3%",
    },{
      term: 360,
      rate: "0.3%",
    },{
      term: 365,
      rate: "1%",
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
              <BenefitTableItem key={item.term} item={item} data={data} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default BenefitTable;
