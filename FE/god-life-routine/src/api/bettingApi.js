import axiosApi from "./axiosApi"


export const getBettingData = async(teamId) => {
  console.log(teamId);
  const response =  await axiosApi.get(`/api/v1/group/${teamId}/betting`);
  return response.data.data
}

// 베팅 성공 실패 투표
export const bettingVote = async(isSuccess , teamId) => {
  console.log("bettingVote 함수 호출됨");
  console.log("isSuccess:", isSuccess); 
  console.log("teamId:", teamId); 

  const data = {
    betSuccess : isSuccess,
  };
  
  const response = await axiosApi.post(`/api/v1/group/${teamId}/betting`, data)
  return response.data.data;

}