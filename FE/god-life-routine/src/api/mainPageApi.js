import axios from "axios";
import axiosApi from "./axiosApi";

export const getMainPageData = async () => {
    const response = await axios.get('http://localhost:8080/main');
    return response.data;
};