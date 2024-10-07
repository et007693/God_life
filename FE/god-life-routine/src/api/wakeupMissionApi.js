import axios from "axios";
import axiosApi from "./axiosApi";

const baseUrl =  import.meta.env.DEV
? "http://localhost:8000"
: "https://j11a503.p.ssafy.io";

export const getPhotoMission = async () => {  
  const response = await axios.get(`${baseUrl}/ai/v1/mission/object/`);
  console.log(response.data);
  return response.data;
}

export const uploadMissionImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  //  TODO: 나중에 URL변경 필요
  const response = await axios.post(`${baseUrl}/ai/v1/mission/object/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

