
import axiosApi from "./axiosApi"

export const getFineHistory = async(teamId) => {
  console.log(teamId);
  const response = await axiosApi.get(`/api/v1/group/personal/transaction/${teamId}`);
  return response.data.data
}



