import React from "react";
import Header from "../components/Header";
import { useEffect, useCallback } from "react";
import useRoomInfo from "../store/useRoomInfo";
import Avatar from "../components/Avatar";
import useUserStore from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getMainPageData } from "../api/mainPageApi";

const FineHistoryPage = () => {
  const { setRoomNumber, setRoomType } = useRoomInfo();
  const { user, setUser } = useUserStore();

  const { isFetching, isError } = useQuery({
    queryKey: ["mainPageData"],
    queryFn: getMainPageData,
  });

  useEffect(() => {
    setRoomNumber(null);
    setRoomType("personal");
  }, [setRoomNumber, setRoomType]);

  useEffect(() => {
    setUser({
      id: 1,
      name: "송창용",
      profileImage: "https://avatars.githubusercontent.com/u/103542723?v=4",
    });
  }, [setUser]);
  if (user === null || isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <Header title={"벌금 내역"} color={"orange"} />
      <div className="mt-24 flex justify-center">
        <Avatar member={user} />
      </div>
      <div className="flex justify-between pl-5 pt-5">
        <div className="text-lg">08.26</div>
        <div className="text-sm text-gray-400 pr-4">벌금면제권</div>
      </div>

      <div className="flex justify-between items-center pt-4">

        <div className="flex flex-col items-start pl-10">
          <div className="text-lg font-semibold">일찍 일어나기</div>
          <div className="text-sm text-gray-500">16:15</div>
        </div>

        <div className="flex flex-col items-end pl-14">
          <div className="font-bold text-xl">- 500원</div>
          <div className="text-gray-500 text-sm">2,500원</div>
        </div>

        <div className="pr-4">아이콘</div>
      </div>
    </div>
  );
};

export default FineHistoryPage;
