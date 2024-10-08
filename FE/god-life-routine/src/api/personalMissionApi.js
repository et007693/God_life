import galleryImgData from "../assets/galleryImgdata.json";
import axios from "axios";
import axiosApi from "./axiosApi";

export const getGalleryImgData = async (year, month) => {
  const response = await axiosApi.get(
    `/api/v1/personal/board?year=${year}&month=${month}`
  );
  console.log(response.data.data.dayList);
  return response.data.data;
};

export const createPersonalMission = async (data) => {
  console.log(data);
  const response = await axiosApi.post("/api/v1/personal/create", data);
  console.log(response.data)
  return response.data;
};

export const getPersonalMissionData = async () => {
  const response = await axiosApi.get(`/api/v1/personal`);
  return response.data;
};

export const updatePersonalMission = async (rule) => {
  console.log();
  const data = {
      ...rule,
    };
  console.log(data)
  const response = axiosApi
    .post(`/api/v1/personal/time`, data)
    .then((response) => response.data);
  return response;
};

export const doPersonalMission = async (blob) => {
  const token = localStorage.getItem("accessToken");
  const baseUrl =  import.meta.env.DEV
  ? "http://localhost:8080"
  : "https://j11a503.p.ssafy.io";
  const formData = new FormData();
  formData.append("picture", blob, "image.jpg");
  const response = await axios.post(`${baseUrl}/api/v1/personal/mission`,formData,{
    
    headers: {
      "Content-Type": "multipart/form-data",
      "Authorization": `Bearer ${token}`
    },
  })
  return response.data;
}

