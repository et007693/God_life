import React from "react";
import Avatar from "./Avatar";
import coin from "../assets/image/coin.png";
import coupon from "../assets/image/coupon.png";

const MyPageUserInfo = ({ member }) => {
  return (
    <div className="flex flex-row w-full mt-20 px-8 items-center justify-around">
      <div>
      <Avatar size={"lg"} member={{profileImage:member.profileImage}} />
      </div>
      <div className="flex flex-col text-left w-full pl-8 gap-1">
        <p className="text-xl font-bold">{member.nickname}</p>
        <div >
          <div className="flex justify-between items-center">
            <p className="font-normal text-gray-500 text-sm">마일리지</p>
            <p className="flex gap-2 items-center font-normal">
              {member.mileage}
              <img src={coin} alt="" />
            </p>
          </div>
          <div className="flex justify-between items-center font-normal ">
            <p className="font-normal text-gray-500 text-sm">벌금 면제권</p>
            <p className="flex gap-2 items-center">
              {member.fineImmunityCount}
              <img src={coupon} alt="" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPageUserInfo;
