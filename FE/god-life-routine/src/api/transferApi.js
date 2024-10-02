import axiosApi from "./axiosApi";

export const sendFineMoney = async ({ teamId, money }) => {
  console.log(teamId, money);
  const response = await axiosApi.post(`/api/v1/group/transfer`, {
    teamId: teamId,
    money: money,
  });
  return response.data.data;
};
