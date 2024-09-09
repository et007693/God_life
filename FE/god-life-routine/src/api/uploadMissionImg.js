import axios from "axios";

export const uploadMissionImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await new Promise((resolve) => {
    setTimeout(() => {
    alert("전송종료");
      resolve({ isSuccess: true });
    }, 3000);
  });
  return response;
//   const response = await axios.post("/api/uploadMissionImg", formData);
//   return response.data;
};