import axios from "axios";
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

export const getTeamGalleryImgData = async (teamId, year, month) => {
  const response = await axiosApi.get(`/api/v1/group/${teamId}/board?year=${year}&month=${month}`)
  console.log(response.data.data.dayList);
  return response.data.data;

}

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

export const doTeamMission = async (teamId, blob) => {
  const token = localStorage.getItem("accessToken");
  const baseUrl =  import.meta.env.DEV
  ? "http://localhost:8080"
  : "https://j11a503.p.ssafy.io";
  const formData = new FormData();
  formData.append("picture", blob, "image.jpg");
  formData.append("isCompleted", true);
  const response = await axios.post(`${baseUrl}/api/v1/group/${teamId}/mission`,formData,{
    
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  })
  return response.data;
}
