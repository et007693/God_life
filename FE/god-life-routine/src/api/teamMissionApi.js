import axiosApi from "./axiosApi.js";

export const getTeamMissionDetail = async (teamId) => {
  const response = await axiosApi.get(`/api/v1/teamMission/${teamId}`);
  console.log(response);
  
  return response.data;
};

export const updateTeamMissionRule = (teamId, rule) => {
  const data = {
    rule: {
      ...rule,
      ruleSetted: true,
    },
  };
  const response = axiosApi
    .patch(`/api/v1/teamMission/${teamId}`, data)
    .then((response) => response.data);
  return response;
};
