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
