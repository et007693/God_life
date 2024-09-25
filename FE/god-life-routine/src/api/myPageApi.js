import useUserStore from "../store/useUserStore";
import axiosApi from "./axiosApi";

export const getMyPageData = async () =>{
    const response = await axiosApi.get("/api/v1/myPage");
    console.log(response.data);
    return response.data;
};

export const buyTickets = async (count)=>{
    const userMyPageData = useUserStore.getState()
    console.log(userMyPageData.myPageData);
    const data = {
        // TODO: 아이디 추후 삭제해야함
        id:1,
        // 구매하는 티켓의 개수
        count:count
    };

    const response = await axiosApi.patch('/api/v1/myPage',data);
    return response.data;
}
