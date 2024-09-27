import axios from "axios";
import axiosApi from "./axiosApi";

export const getMainPageData = async () => {
  const response = await axiosApi.get("/api/v1/main");
  console.log(response.data);
  return response.data.data;
};
