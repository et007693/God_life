import axiosApi from "./axiosApi";

const login = async (email, password) => {
    const response = await axiosApi.post("/auth/login", { email, password });
    return response.data;
};

export default login;