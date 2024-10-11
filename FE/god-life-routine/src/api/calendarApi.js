import axiosApi from "./axiosApi";


export const getCalendarData = async (teamId, year, month) => {
  const response = await axiosApi.get(
    `/api/v1/group/${teamId}/calendar?year=${year}&month=${month}`
  );
  console.log(teamId);
  console.log(response.data.data);

  return response.data.data;
};

export const getPerosnalCalendarData = async (year, month) => {
  const response = await axiosApi.get(
    `/api/v1/personal/calendar?year=${year}&month=${month}`
  );
  console.log(response.data.data);
  return response.data.data;
}