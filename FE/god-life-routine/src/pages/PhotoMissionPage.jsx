import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { resizeImage } from "../util/resizeImg";
import { uploadMissionImg } from "../api/wakeupMissionApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const PhotoMissionPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const { mutate, isPending, data, isError, error } = useMutation({
    mutationKey: ["uploadMissionImg"],
    mutationFn: uploadMissionImg,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  const handleImageCapture = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const resizedImg = await resizeImage(file, 1024, 1024);
      setCapturedImage(URL.createObjectURL(resizedImg));
      const response = await mutate(resizedImg);
    }
  };

  // 사진 촬영 버튼 클릭 시 파일input의 버튼 클릭과 같은 효과를 보임
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };
  const handleConfirmClick = () => {
    navigate("/personalMission/gallery");
  };
  const handleChangeObjectClick = () => {
    console.log("사물변경 요청됨");
  };

  useEffect(() => {
    return () => {
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [capturedImage]);

  return (
    <div className="w-full h-real-screen flex flex-col">
      <Header title={"사진 촬영"} color={"orange"} />
      <div className="h-full justify-around flex-1 flex flex-col items-center p-5">
        {capturedImage ? (
          <>
            <img
              src={capturedImage}
              alt="찍은 사진"
              className={`w-full max-w-md rounded-lg shadow-lg mt-4 ${
                isPending ? "filter blur-sm" : ""
              }`}
            />
            {isPending ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="flex w-full justify-around">
                <button
                  onClick={handleCameraClick}
                  className="mt-6 font-noto-sans-kr w-32 justify-center font-bold px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300 ease-in-out flex items-center"
                >
                  다시 찍기
                </button>
                <button
                  onClick={handleConfirmClick}
                  className="mt-6 font-noto-sans-kr w-32 justify-center font-bold px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300 ease-in-out flex items-center"
                >
                  확인
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="w-full aspect-square max-w-md bg-gray-200 flex justify-center items-center rounded-lg shadow-md mt-4">
              <span className="text-gray-500">
                오늘 촬영해야할 물건은 <strong>{"연필"}</strong> 입니다.
              </span>
            </div>
            <div className="flex w-full justify-around">
              <button
                onClick={handleCameraClick}
                className="mt-6 font-noto-sans-kr w-32 justify-center font-bold px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300 ease-in-out flex items-center"
              >
                사진 촬영
              </button>
              <button
                onClick={handleChangeObjectClick}
                className="mt-6 font-noto-sans-kr w-32 justify-center font-bold px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300 ease-in-out flex items-center"
              >
                사물 변경
              </button>
            </div>
          </>
        )}

        <input
          ref={fileInputRef}
          type="file"
          capture="environment"
          accept="image/*"
          onChange={handleImageCapture}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default PhotoMissionPage;
