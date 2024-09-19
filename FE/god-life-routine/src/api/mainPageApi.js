import axios from "axios";
import axiosApi from "./axiosApi";

export const getMainPageData = async () => {
  const response = await axiosApi.get("main");
  return response.data;
};
