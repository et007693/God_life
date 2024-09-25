import React from "react";
import { useParams } from "react-router-dom";
import addProfile from "../assets/addProfile.png";
const InviteMemberBtn = ({ onClick }) => {
    const {teamId} = useParams();
   
  return (
    <button className="flex justify-center" onClick={onClick}>
      <img
        src={addProfile}
        alt="addProfile"
        className="w-14 h-14 p-1 rounded-full border-4 border-gray-300 bg-white"
      />
    </button>
  );
};

export default InviteMemberBtn;
