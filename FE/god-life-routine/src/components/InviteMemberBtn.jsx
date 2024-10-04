import React from "react";
import addProfile from "../assets/addProfile.png";
const InviteMemberBtn = ({ onClick, className }) => {
   
  return (
    <button className="flex justify-center" onClick={onClick}>
      <img
        src={addProfile}
        alt="addProfile"
        className="w-16 h-16 p-1 rounded-full border-4 border-gray-300 bg-white"
      />
    </button>
  );
};

export default InviteMemberBtn;
