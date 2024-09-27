import axios from "axios";
import axiosApi from "./axiosApi";

export const getMainPageData = async () => {
  const response = await axiosApi.get("/api/v1/main");
  return response.data;
};
