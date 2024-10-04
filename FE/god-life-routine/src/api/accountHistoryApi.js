import axiosApi from "./axiosApi"


export const getAccountHistory = async(groupId) => {
  console.log(groupId);
  const response =  await axiosApi.get(`/api/v1/group/transaction/${groupId}`);
  return response.data.data
}