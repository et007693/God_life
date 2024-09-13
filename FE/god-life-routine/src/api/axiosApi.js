import axios from "axios";
import useUserStore from "../store/useUserStore";

const axiosApi = axios.create({
    baseURL: "http://localhost:8080",
});
axiosApi.interceptors.request.use((config) => {
    const {accessToken} = useUserStore.getState();
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
});

axiosApi.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401) {
        useUserStore.getState().setAccessToken(null);
        window.location.href = "/login";
    }
    return Promise.reject(error);
});

export default axiosApi;