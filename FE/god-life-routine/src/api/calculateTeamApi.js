import axiosApi from "./axiosApi"

export const getCalculateTeam = async(teamId) => {
  console.log(teamId);
  const response =  await axiosApi.get(`/api/v1/group/adjustment/${teamId}`);
  console.log(response.data.data);
  return response.data.data
}

// 정산하기 버튼 누르고 post 요청
export const sendCalculateButton = async(teamId) => {
  console.log("sendCalculateButton 함수 호출됨");
  console.log("teamId:", teamId); 

  const data = {
    teamId : teamId,
  };

  const response = await axiosApi.post(`/api/v1/group/adjust`, data)
  return response.data.data;

}