import React from "react";
import Header from "../components/Header";
import { useEffect, useCallback } from "react";
import useRoomInfo from "../store/useRoomInfo";
import Avatar from "../components/Avatar";
import useUserStore from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getMainPageData } from "../api/mainPageApi";
import FineHistoryList from "../components/FineHistoryList"
import { useParams } from "react-router-dom";
import { getFineHistory } from "../api/fineHistoryApi";

const FineHistoryPage = () => {
  const { setRoomNumber, setRoomType } = useRoomInfo();
  const { user, setUser } = useUserStore();
  
  const { teamId } = useParams();
  const { data, isFetching, isError } = useQuery({
    queryKey:["fineHistory"],
    queryFn: () => getFineHistory(teamId),
    staleTime:0,
  })

  console.log(data);

  useEffect(() => {
    setRoomNumber(null);
    setRoomType("personal");
  }, [setRoomNumber, setRoomType]);


  if (!data || isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Header title={"벌금 내역"} color={"orange"} />
      <div className="mt-20 flex justify-center mb-2">
        <Avatar member={data} />
      </div>

      <FineHistoryList data={data} />
      
    </div>
  );
};

export default FineHistoryPage;
