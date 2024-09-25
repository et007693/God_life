import axios from "axios";

export const uploadMissionImg = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  
  // 아래 부분을 변경해야함
  const response = await new Promise((resolve) => {
    setTimeout(() => {
    alert("전송종료");
      resolve({ isSuccess: true });
    }, 3000);
  });
  return response;
};