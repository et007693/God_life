import axios from "axios";
import axiosApi from "./axiosApi";

export const getPhotoMission = async () => {
  const response = await axios.get(`http://localhost:8000/api/v1/mission/object/`);
  console.log(response.data);
  return response.data;
}

export const uploadMissionImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  //  TODO: 나중에 URL변경 필요
  const response = await axios.post("http://localhost:8000/api/v1/mission/object/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

