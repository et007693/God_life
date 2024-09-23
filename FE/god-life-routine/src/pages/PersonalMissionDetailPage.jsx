import React, { useEffect, useCallback } from "react";
import useRoomInfo from "../store/useRoomInfo";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import useUserStore from "../store/useUserStore";
import { useQuery } from "@tanstack/react-query";
import { getMainPageData } from "../api/mainPageApi";
import { useNavigate } from "react-router-dom";

const PersonalMissionDetailPage = () => {
  const { setRoomNumber, setRoomType } = useRoomInfo();
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const goToPersonalAccountDetail = () => {
    navigate("/personalMission/account/detail");
  };

 
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
      <Header title={"나의 미션"} color={"white"} backgroundcolor={"orange"} />
      <div className="flex flex-col items-center pt-24">
        <div>
          <Avatar member={user} />
        </div>
        <div className="text-xl font-bold">송창용</div>
        <div className="text-sm text-gray-400 mt-1">싸피 1234-5678-910</div>

        <div className="border rounded-xl mt-6 shadow-md text-center text-sm">
          <div className="px-10 py-4">
            매일 미션을 성공하면 우대금리를 드려요!
          </div>
          <div className="flex flex-row justify-between pt-4">
            <div className="text-gray-400 pl-5">남은 기간</div>
            <div className="font-bold text-lg pr-5">21일</div>
          </div>
          <div className="px-4 py-3">
            <div className=" bg-gray-200 rounded-full">
              <div
                className="bg-yellow-300 h-5 rounded-full text-center text-sm flex items-center justify-center"
                style={{ width: "80%" }}
              >
                159일
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-3 mx-4 mb-2"></div>

          <div className="flex flex-row justify-between pt-4">
            <div className="text-gray-400 pl-5">성공률</div>
            <div className="font-bold text-lg pr-5">62%</div>
          </div>

          <div className="px-4 py-3">
            <div className=" bg-gray-200 rounded-full">
              <div
                className="bg-yellow-300 h-5 rounded-full"
                style={{ width: "62%" }}
              >
                62%
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-3 mx-4 mb-2"></div>

          <div className="flex flex-row justify-between items-center pt-4">
            <div>
              <div className="flex flex-row">
                <div className="text-gray-400 pl-5">현재 적용이율</div>
                <div className="font-bold text-md pl-5 text-red-500">4%</div>
              </div>

              <div className="flex flex-row">
                <div className="text-gray-400 pl-5">최대 적용이율</div>
                <div className="font-bold text-md pl-5 text-red-500 mb-4">
                  8.5%
                </div>
              </div>
            </div>

            <div className="pr-5">
              <button
                onClick={goToPersonalAccountDetail}
                className="font-bold text-lg pb-3"
              >
                계좌 상세 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left pt-8 pl-10 font-bold text-xl">
        일찍 일어나기
      </div>
      <div className="pt-3">
        <div 
         
        className="bg-gray-200 mx-10 py-12 rounded-3xl">
          시간 설정이 완료되지 않았습니다.
        </div>
      </div>
    </div>
  );
};

export default PersonalMissionDetailPage;
