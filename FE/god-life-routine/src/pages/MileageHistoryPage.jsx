import React from "react";
import Header from "../components/Header";
import { useQuery } from "@tanstack/react-query";
import { getMileageHistoryPageData } from "../api/mileageHistoryApi";
import MileageHistoryList from "../components/MileageHistoryList";
import coin from "../assets/image/coin.png";

const MileageHistoryPage = () => {
  const { data, isFetching, isError } = useQuery({
    queryKey: ["MileageHistoryPageData"],
    queryFn: getMileageHistoryPageData,
  });

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Header
        title={"마일리지 이용내역"}
        backgroudcolor={"white"}
        color={"orange"}
      />
      <div className="mt-20 flex gap-2 justify-end pr-5 ">
        <div className="text-lg flex items-center border-2 border-gray-300 rounded-lg px-4 py-2">
          <div>{data.mileage}</div>
          <img className="ml-2" src={coin} alt="Coin" />
        </div>
      </div>

      <MileageHistoryList data={data} />
    </div>
  );
};

export default MileageHistoryPage;
