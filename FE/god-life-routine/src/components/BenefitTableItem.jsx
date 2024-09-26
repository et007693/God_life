import React from "react";

const BenefitTableItem = ({ item }) => {
  return (
    <tr>
      <td class="p-2 border-b text-sm text-center">{item.term}</td>
      <td class="py-2 px-4 border-b text-sm text-center">{item.rate}</td>
      <td class="py-2 px-4 border-b text-sm text-center">{item.isApplied}</td>
    </tr>
  );
};

export default BenefitTableItem;
