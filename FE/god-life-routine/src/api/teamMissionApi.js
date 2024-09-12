import axiosApi from "./axiosApi.js";

export const getTeamMissionDetail = async (teamId) => {
  const response = await axiosApi.get(`teamMission/${teamId}`);
  return response.data;
};