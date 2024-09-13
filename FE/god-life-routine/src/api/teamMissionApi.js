import axiosApi from "./axiosApi.js";

export const getTeamMissionDetail = async (teamId) => {
  const response = await axiosApi.get(`/teamMission/${teamId}`);
  console.log(response.data);
  return response.data;
};

export const updateTeamMissionRule = (teamId, rule) => {
  const data = {
    rule:{
      ...rule,
      ruleSetted: true,
    }
  }
  const response = axiosApi.patch(`/teamMission/${teamId}`, data).then((response)=>response.data);
  return response;
};
