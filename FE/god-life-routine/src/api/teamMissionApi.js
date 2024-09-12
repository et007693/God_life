import axiosApi from "./axiosApi";

export const getTeamMissionDetail = async (teamId) => {
  const response = await axiosApi.get(`/teamMission/${teamId}`);
  return response.data;
};