import React from "react";

const BenefitTableItem = ({ item, data }) => {
  return (
    <tr>
      <td className="p-2 border-b text-sm text-center">{item.term}일</td>
      <td className="py-2 px-4 border-b text-sm text-center">{item.rate}</td>
      <td className="py-2 px-4 border-b text-sm text-center">{data.days >= item.term ? "O" : "X"}</td>
    </tr>
  );
};

export default BenefitTableItem;
