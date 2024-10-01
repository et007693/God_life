import axiosApi from "./axiosApi";

export const getMileageHistoryPageData = async () => {
  const response = await axiosApi.get("/api/v1/coupon/history")
  console.log(response.data);
  return response.data.data
}