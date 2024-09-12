import axios from "axios";
import useUserStore from "../store/useUserStore";

const axiosApi = axios.create({
    baseURL: "http://localhost:8080",
});
axiosApi.interceptors.request.use((config) => {
    const {accessToken} = useUserStore();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

axiosApi.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response.status === 401) {
        const {setAccessToken} = useUserStore();
        setAccessToken(null);
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default axiosApi;