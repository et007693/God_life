import axiosApi from "./axiosApi";

const login = async (code) => {
    const response = await axiosApi.post("/api/v1/login?code=" + code);
    return response;
};

export default login;