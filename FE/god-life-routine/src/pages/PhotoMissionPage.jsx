import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { resizeImage } from "../util/resizeImg";
import { uploadMissionImg } from "../api/uploadMissionImg";
import { useMutation } from "@tanstack/react-query";

const PhotoMissionPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);
  const { mutate, isPending, data, isError, error } = useMutation({
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

  useEffect(() => {
    return () => {
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [capturedImage]);

  return (
    <div className="w-full h-real-screen flex flex-col">
      <Header title={"사진 촬영"} />
      <div className="flex-1 flex flex-col items-center p-5">
        <h1 className="text-2xl font-bold mb-6">PhotoMissionPage</h1>

        {capturedImage ? (
          <>
            <img
              src={capturedImage}
              alt="찍은 사진"
              className={`w-full max-w-md rounded-lg shadow-lg mt-4 ${
                isPending ? "filter blur-sm" : ""
              }`}
            />
            {isPending && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            )}
          </>
        ) : (
          <div className="w-full aspect-square max-w-md bg-gray-200 flex justify-center items-center rounded-lg shadow-md mt-4">
            <span className="text-gray-500">사진을 촬영해주세요</span>
          </div>
        )}

        <button
          onClick={handleCameraClick}
          className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition duration-300 ease-in-out flex items-center"
        >
          사진 촬영
        </button>

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
