import axiosApi from "./axiosApi"

export const getFineHistory = async(groupId) => {
  const response = await axiosApi.get(`/api/v1/group/fine/${groupId}`);
  return response.data.data
}



