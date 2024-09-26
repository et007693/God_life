import axiosApi from "./axiosApi"


export const getAccountHistory = async(groupId) => {
  const response =  await axiosApi.get(`/api/v1/group/${groupId}`);
  return response.data
}