import React from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "./Avatar";
const MainPageHeader = ({ formatDate, profileImageSrc }) => {
  const navigate = useNavigate();
  const imgSrc = profileImageSrc ? "null" : "/images/default_profile.png";
  return (
    <div className="flex flex-row justify-between">
      <div className="text-left ml-10 mt-10 mb-10">
        <div className="text-gray-500 text-md">Today</div>
        <div className="text-black-500 text-3xl font-bold">{formatDate}</div>
      </div>
      <div
        className="mr-10 mt-10 mb-10"
        onClick={() => {
          navigate("/mypage");
        }}
      >
        <Avatar member={{ profileImage: imgSrc }} />
      </div>
    </div>
  );
};

export default MainPageHeader;
