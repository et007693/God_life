import React, { useState, useEffect, useRef } from 'react'
import Header from '../components/Header';

const PhotoMissionPage = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageCapture = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const resizedImg =  await resizeImage(file, 416, 416);
      setCapturedImage(URL.createObjectURL(resizedImg));
    }
  };

// 사진 촬영 버튼 클릭 시 파일input의 버튼 클릭과 같은 효과를 보임
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const resizeImage = (file, maxWidth, maxHeight) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob(resolve, 'image/jpeg', 0.7); // 품질을 0.7로 설정
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  useEffect(() => {
    return () => {
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
      }
    };
  }, [capturedImage]);

  return (
    <>
    <Header title={"사진 촬영"} />
    <div className="flex flex-col items-center p-5">
      <h1 className="text-2xl font-bold mb-6">PhotoMissionPage</h1>
      
      {capturedImage ? (
          <img 
          src={capturedImage} 
          alt="찍은 사진" 
          className="w-full max-w-md rounded-lg shadow-lg mt-4" 
          />
        ) : (
            <div className="w-full max-w-md h-64 bg-gray-200 flex justify-center items-center rounded-lg shadow-md mt-4">
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
        </>
  )
}

export default PhotoMissionPage