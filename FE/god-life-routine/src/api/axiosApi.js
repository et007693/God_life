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

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }else{
    localStorage.setItem("redirectUrl",window.location.pathname);
    window.location.href = "/login";
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
    if (error.response) {
      if (error.response.data.responseCode === "U101") {
        alert("이미 가입된 방입니다.");
        window.location.href = "/";
        return;
      }
        if(error.response.data.responseCode === "JWT001"){
        axiosApi.post("/api/v1/refresh").then(async (res) => {
          const newAccessToken = Cookies.get("accessToken");
          localStorage.setItem("accessToken", newAccessToken);
          const newRes = await axiosApi.request(error.config);
          return newRes.data;
        })
        }
        else if(error.response.data.responseCode === "JWT002"){
            console.log(error.response);
            useUserStore.getState().setAccessToken(null);
            Cookies.remove("accessToken");
            Cookies.remove("refreshToken");
            if (!window.location.pathname.includes("invite")) {
              localStorage.setItem("redirectUrl", window.location.pathname);
            }
            window.location.href = "/login";
      }
    }
    
      window.location.href = "/login";
    }
);

export default axiosApi;
