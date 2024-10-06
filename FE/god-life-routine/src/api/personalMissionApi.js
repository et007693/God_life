import galleryImgData from "../assets/galleryImgdata.json";
import axios from "axios";
import axiosApi from "./axiosApi";

// export const getGalleryImgData = async (page) => {
//   const response = await new Promise((resolve) => {
//     setTimeout(() => {
//       const startIndex = (page.pageParam - 1) * 5;
//       const endIndex = startIndex + 5;
//       const paginatedData = galleryImgData.slice(startIndex, endIndex);
//       resolve(paginatedData);
//     }, 1000);
//   });

//   return response;
// };

export const getGalleryImgData = async (teamId, year, month) => {
  const response = await axiosApi.get(
    `/api/v1/group/${teamId}/board?year=${year}&month=${month}`
  );
  console.log(response.data.data);

  return response.data.data;
};

export const createPersonalMission = async (data) => {
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
    rule: {
      ...rule,
      ruleSetted: true,
    },
  };
  const response = axiosApi
    .patch(`/api/v1/personal`, data)
    .then((response) => response.data);
  return response;
};
