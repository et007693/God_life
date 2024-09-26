import axios from "axios";
import axiosApi from "./axiosApi";

export const getMainPageData = async () => {
  const response = await axiosApi.get("/api/v1");
  return response.data;
};
