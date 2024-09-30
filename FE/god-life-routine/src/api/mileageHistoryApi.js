import axiosApi from "./axiosApi";

export const getMileageHistoryPageData = async () => {
  const response = await axiosApi.get("/api/v1/coupon/buy")
  console.log(response.data);
  return response.data.data
}