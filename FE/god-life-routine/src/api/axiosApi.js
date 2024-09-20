import axios from "axios";
import useUserStore from "../store/useUserStore";

const axiosApi = axios.create({
    // baseURL: "localhost:8080",
    baseURL:''
    // baseURL: "http://j11a503.p.ssafy.io:8080/api/v1/",
});
axiosApi.interceptors.request.use((config) => {
  // const {accessToken} = useUserStore.getState();
  const accessToken = "tempAccessToken";
  console.log(accessToken);

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  config.headers["Content-Type"] = "application/json";
  return config;
});

axiosApi.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // console.log("에러발생했습니다");
      // useUserStore.getState().setAccessToken(null);
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosApi;
