import axiosApi from "./axiosApi.js";

export const createTeamRoom = async (roomSetting) => {
  console.log(roomSetting);
  const response = await axiosApi.post("/api/v1/group", roomSetting);
  return response.data;
};

export const getTeamMissionDetail = async (teamId) => {
  const response = await axiosApi.get(`/api/v1/group/${teamId}`,);
  
  return response.data;
};

export const updateTeamMissionRule = (teamId, time) => {
  console.log(teamId, time);
  const data = {
    meridiem: time.meridiem,
    time: time.time,
  };
  const response = axiosApi
    .post(`/api/v1/group/${teamId}/time`, data)
    .then((response) => response.data);
  return response;
};
