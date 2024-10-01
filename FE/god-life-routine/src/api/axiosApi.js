import axios from "axios";
import useUserStore from "../store/useUserStore";
import Cookies from "js-cookie";
const axiosApi = axios.create({
  // baseURL:''
  baseURL: import.meta.env.DEV
    ? "http://localhost:8080"
    : "https://j11a503.p.ssafy.io",
});
axiosApi.interceptors.request.use((config) => {
  // const accessToken = "tempAccessToken";
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  config.withCredentials = true;
  config.headers["Content-Type"] = "application/json";
  return config;
});

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      axiosApi.post("/api/v1/refresh").then(async (res) => {
        const newAccessToken = Cookies.get("accessToken");
        localStorage.setItem("accessToken", newAccessToken);
        const newRes = await axiosApi.request(error.config);
        return newRes.data;
      });
      // console.log("에러발생했습니다");
      // useUserStore.getState().setAccessToken(null);
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosApi;
