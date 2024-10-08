import axiosApi from "./axiosApi";

export const sendFineMoney = async ({ teamId, money }) => {
  console.log(teamId, money);
  const response = await axiosApi.post(`/api/v1/group/transfer`, {
    teamId: teamId,
    money: money,
  });
  return response.data.data;
};

export const getTransferPageData = async (teamId) => {
  console.log(teamId);
  const response = await axiosApi.get(`/api/v1/group/balance/${teamId}`);
  console.log(response.data.data);
  return response.data.data;
};


// 밀린 벌금 받아오기
export const getTransferFineData = async (teamId) => {
  // console.log("teamId", teamId);
  const response = await axiosApi.get(`/api/v1/group/${teamId}`,);
  // console.log("대답", response.data.data);
  return response.data.data;
};
