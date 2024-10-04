import axiosApi from "./axiosApi"

export const getCalculateTeam = async(teamId) => {
  console.log(teamId);
  const response =  await axiosApi.get(`/api/v1/group/adjustment/${teamId}`);
  console.log(response.data.data);
  return response.data.data
}