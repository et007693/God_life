import axiosApi from "./axiosApi";

export const acceptInvite = async (teamId) => {
  const response = await axiosApi.post(`/api/v1/group/${teamId}/invite`);
  return response.data;
}