import axiosApi from "./axiosApi";

export const settingMyHomeLocation = async (location) => {
  console.log(location);
  const response = await axiosApi.post("/api/v1/member/location", location);
  return response.data;
};
