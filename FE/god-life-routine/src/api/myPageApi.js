import useUserStore from "../store/useUserStore";
import axiosApi from "./axiosApi";

export const getMyPageData = async () =>{
    const response = await axiosApi.get("/myPage/1");
    console.log(response.data);
    return response.data;
};

export const buyTickets = async (count)=>{
    const userMyPageData = useUserStore.getState()
    console.log(userMyPageData.myPageData);
    const data = {
            ticket:userMyPageData.myPageData.ticket + count


        // coupon:userMyPageData.coupon+count
    };

    const response = await axiosApi.patch('/myPage/1',data);
    return response.data;
}
