import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import { resizeImage } from "../util/resizeImg";
import { getPhotoMission, uploadMissionImg } from "../api/wakeupMissionApi";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { createScreenShotToFormData } from "../util/screenShot";
import { doTeamMission } from "../api/teamMissionApi"
import { doPersonalMission } from '../api/personalMissionApi';

const PhotoMissionPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [uploadResponse, setUploadResponse] = useState(null);
  const {teamId} = useParams();
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { data: missionData, isLoading: isLoading, refetch  } = useQuery(
    {
      queryKey:["getPhotoMission"],
      queryFn:getPhotoMission
    }
  );

  const missionObj = {
    "refrigerator": "냉장고",
    "monitor": "모니터",
    "pen": "볼펜",
    "toothbrush": "칫솔",
    "toothpaste": "치약",
    "chopstick":"젓가락",
    "book": "책"
  }

  // TODO: 개인미션 연결
  const { mutate: registPhotoMission } = useMutation({
    mutationFn: (data) => location.pathname.includes('team') ? doTeamMission(teamId, data) : doPersonalMission(data),
    onSuccess: () => {
      console.log("전송성공")
    }
  });

  const { mutate, isPending, data, isError, error } = useMutation({
    mutationKey: ["uploadMissionImg"],
    mutationFn: (file)=>uploadMissionImg(file),
    onSuccess: (data) => {
      console.log(data);
      setUploadResponse(data)
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
    }
  };

  // 사진 촬영 버튼 클릭 시 파일input의 버튼 클릭과 같은 효과를 보임
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const goBack = () => {
    window.location.reload();
  }

  const handleConfirmClick = async() => {
    if (capturedImage) {
      const file = fileInputRef.current.files[0];
      // const blob = new Blob([file], { type: file.type });
      mutate(file, {
        onSuccess: async (data) => {
          if (data.data.detect.confidence >= 0.7) {
            const blob =  await createScreenShotToFormData("capture-img",0.1)
            registPhotoMission(blob)
          }
        }
      })
    } else {
      console.log("이미지가 선택되지 않았습니다.")
    }
  };

  const handleHomeClick = () => {
    navigate("/");    
  };

  const handleChangeObjectClick = () => {
    refetch();
    console.log("사물변경 요청됨");
  };

  const goToGallery = () => {
    location.pathname.includes('team') ? navigate(`/teamMission/${teamId}/gallery`) : navigate("/personalMission/gallery")
  }

  useEffect(() => {
    return () => {
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [capturedImage]);

  if (isLoading) return <div>Loading...</div>;
  return (
    <div className="w-full h-real-screen flex flex-col" id="capture-img">
      <Header title={"사진 촬영"} color={"orange"} />
      <div className="h-full flex-1 flex flex-col items-center p-5 mt-24 gap-14 captureImg">
        {capturedImage ? (
          <>
            <img
              src={capturedImage}
              alt="찍은 사진"
              className={` w-full max-w-md rounded-lg shadow-lg mt-4 ${
                isPending ? "filter blur-sm" : ""
              }`}
            />
            {isPending ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <div className="flex w-full justify-around">
                {uploadResponse ? (
                  <div className="flex w-full flex-col gap-5">
                    {data.data.detect.success ? (
                      <>
                      <div>
                        <h1>미션 성공!</h1>
                      </div>
                        <div className="flex w-full justify-around">
                          <button
                            onClick={goToGallery}
                            className="mt-6 font-noto-sans-kr w-32 justify-center font-bold px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300 ease-in-out flex items-center"
                          >
                          갤러리 이동
                          </button>
                          <button
                          onClick={handleHomeClick}
                          className="mt-6 font-noto-sans-kr w-32 justify-center font-bold px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300 ease-in-out flex items-center"
                          >
                          홈
                      </button>
                      </div>
                      </>
                    ) : (
                      <>
                      <div>
                        <h1>사진이 부정확합니다.
                          <br></br>
                          다시 촬영해주세요.
                        </h1>
                      </div>
                        <div className="flex w-full justify-around">
                          <button
                          onClick={goBack}
                          className="mt-6 font-noto-sans-kr w-32 justify-center font-bold px-6 py-3 bg-orange-500 text-white rounded-md shadow-md hover:bg-orange-600 transition duration-300 ease-in-out flex items-center"
                          >
                            다시 찍기
                          </button>
                        </div>
                      </>
                    )}
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

              </div>
            )}
          </>
        ) : (
          <>
            <div className="w-full aspect-square max-w-md bg-gray-200 flex justify-center items-center rounded-lg shadow-md mt-4">
              <span className="text-gray-500">
                오늘 촬영해야할 물건은 <strong>{missionObj[missionData.data.object_name]}</strong> 입니다.
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
