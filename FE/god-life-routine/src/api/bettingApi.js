import axiosApi from "./axiosApi"


export const getBettingData = async(teamId) => {
  console.log(teamId);
  const response =  await axiosApi.get(`/api/v1/group/${teamId}/betting`);
  return response.data.data
}