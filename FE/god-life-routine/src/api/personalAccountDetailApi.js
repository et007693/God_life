import axiosApi from "./axiosApi";

export const getPersonalAccountDeatailData = async () => {
  const response = await axiosApi.get("/api/v1/personal/account");
  console.log(response.data.data);
  return response.data.data;
};