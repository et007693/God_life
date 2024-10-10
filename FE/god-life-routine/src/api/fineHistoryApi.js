
import axiosApi from "./axiosApi"

export const getFineHistory = async(teamId) => {
  console.log(teamId);
  const response = await axiosApi.get(`/api/v1/group/personal/transaction/${teamId}`);
  return response.data.data
}

// 면제권 사용
export const sendFineExempt = async(teamId) => {
  console.log("sendFineExempt 함수 호출됨");
  console.log("teamId:", teamId); 
  const response = await axiosApi.post(`/api/v1/group/${teamId}/coupon`)
  return response.data.data;
}



