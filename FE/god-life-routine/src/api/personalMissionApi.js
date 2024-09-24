import galleryImgData from "../assets/galleryImgdata.json";
import axios from "axios";
import axiosApi from "./axiosApi";

export const getGalleryImgData = async (page) => {
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      const startIndex = (page.pageParam - 1) * 5;
      const endIndex = startIndex + 5;
      const paginatedData = galleryImgData.slice(startIndex, endIndex);
      resolve(paginatedData);
    }, 1000);
  });

  return response;
  //   const response = await axios.get('/api/galleryImgData');
  //   return response.data;
};

export const getPersonalMissionData = async () => {
  const response = await axiosApi.get(`/api/v1/personalMission`);
  return response.data;
}

export const updatePersonalMission = async (rule) => {

    const data = {
      rule: {
        ...rule,
        ruleSetted: true,
      }
    }
    const response = axiosApi
      .patch(`/api/v1/personalMission`, data)
      .then((response) => response.data);
    return response;
  };
  
