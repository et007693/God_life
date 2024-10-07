import React from "react";
import { IoMdSettings } from "react-icons/io";
import { Map, MapMarker } from "react-kakao-maps-sdk";

const SettedHomeMap = ({ data, onclickSettingBtn, onclickTime }) => {
  console.log(data);
  return (
    <div
      className="flex flex-col -z-1 items-center h-32" // 높이를 지정
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex justify-between items-center w-full">
        <div className="w-full flex justify-end">

        <button
          className="flex items-center justify-center text-xl"
          onClick={onclickSettingBtn}
          >
          <IoMdSettings />
        </button>
          </div>
      </div>
      <div className="flex mt-4 w-full h-full flex-col">
        {data.data.timeSet ? (
          <div className="flex flex-col justify-between flex-grow h-full">
            <div className="font-bold text-3xl">
              {data.data.meridiem} {data.data.time}
            </div>
            <div onClick={onclickTime}>
              미션하러 가기 →
            </div>
          </div>
        ) : (
          <div>시간 설정이 완료되지 않았습니다.</div>
        )}
      </div>
    </div>
  );
};

export default SettedHomeMap;
