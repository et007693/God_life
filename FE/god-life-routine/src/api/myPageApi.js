import useUserStore from "../store/useUserStore";
import axiosApi from "./axiosApi";

export const getMyPageData = async () => {
  const response = await axiosApi.get("/api/v1/member/mypage");
  console.log(response.data.data);
  return response.data.data;
};

export const buyTickets = async (count) => {
  const userMyPageData = useUserStore.getState();
  console.log(userMyPageData.myPageData);
  const data = {
    // 구매하는 티켓의 개수
    amount: count,
  };

  const response = await axiosApi.post("/api/v1/coupon", data);
  return response.data.data;
};
