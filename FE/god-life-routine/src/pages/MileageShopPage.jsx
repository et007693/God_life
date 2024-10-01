import React, { useState } from "react";
import Header from "../components/Header";
import coin from "../assets/image/coin.png";
import { useMutation, useQuery } from "@tanstack/react-query";
import { buyTickets, getMyPageData } from "../api/myPageApi";
import bigSizeCoupon from "../assets/image/big_size_coupon.png";
import coupon from "../assets/image/coupon.png";
import { useNavigate } from "react-router-dom";


const MileageShopPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(1);
  const { data: myPageData, isFetching } = useQuery({
    queryKey: ["myPageData"],
    queryFn: getMyPageData,
  });
  const {mutate:mutateBuyTicket} = useMutation({
    mutationKey:["buyTickets"],
    mutationFn:()=>buyTickets(count),
    onSuccess:()=>{
      navigate('/myPage');
    }
  })

  const handleCount = (changeValue) => {
    setCount((prev) => {
      const result = prev + changeValue;
      if (result < 0 || result > 9) return prev;
      return prev + changeValue;
    });
  };

  const onClickBuyTicketBtn = ()=>{
    mutateBuyTicket(count);
  }

  const gotoMypage = () => {
    navigate('/myPage')
  }

  if (isFetching) return <div>로딩중...</div>;
  return (
    <div className="h-real-screen w-full flex items-center justify-center">
      <Header title={"마일리지Shop"} color={"orange"} goBack={"/"}/>
      <div className="h-full w-auto mt-16 py-10">
        <div className="rounded-xl w-full h-full px-10 py-4 m-auto flex flex-col gap-8 justify-around">
          <div className="w-full h-auto relative mt-12">
            <img className="w-full" src={bigSizeCoupon} alt="" />
            <div className="absolute top-1/2 w-3/5 left-1/2 transform opacity-80 -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-3 gap-4 flex flex-col">
              <p className="font-semibold">벌금 1회 면제권</p>
              <p className="flex justify-center">
                2000 <img className="ml-2" src={coin} alt="" />
              </p>
            </div>
          </div>
          <div className="flex flex-row justify-around items-center text-2xl">
            <p>구매개수</p>
            <div className="flex flex-row text-3xl gap-4 ">
              <button onClick={() => handleCount(-1)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M200-440v-80h560v80H200Z"/></svg></button>
              <p>{count}</p>
              <button onClick={() => handleCount(1)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg></button>
            </div>
          </div>
          <div className="flex flex-col text-right divide-y divide-gray-300">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <p className="">보유 마일리지 </p>
                <p className="">{myPageData.mileage}원</p>
              </div>
              <div className="flex flex-row justify-between">
                <p className="">결제 금액 </p>
                <p className="text-red-600">{2000 * count}원</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row justify-between">
                <p className="">마일리지 잔액 </p>
                <p>{myPageData.mileage - 2000 * count}원</p>
              </div>
              <div>
                <div className="flex flex-row justify-between">
                  <p>구매 후 면제권 개수</p>
                  <p className="flex flex-row">
                    {myPageData.fineImmunityCount + count}
                    <img className="ml-1" src={coupon} alt="" />
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="text-red-600">해당 면제권은 방마다 </p>
            <p className="text-red-600"> 한 달에 한 번 사용할 수 있습니다.</p>
          </div>
          <div className="flex flex-row justify-center gap-4 mb-10">
            <button
              onClick={onClickBuyTicketBtn}
              className="bg-orange-400 text-white px-5 py-3 rounded-lg text-xl"
            >
              구매
            </button>
            <button
              onClick={gotoMypage}
              className="bg-gray-400 text-white px-5 py-3 rounded-lg text-xl"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MileageShopPage;
