import axiosApi from "./axiosApi";

export const getBankList = async () => {
  const response = await axiosApi.get("/api/v1/bank");
  return response.data;
};
