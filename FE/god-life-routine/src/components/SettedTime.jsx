import React from "react";
import { IoMdSettings } from "react-icons/io";

const SettedHomeMap = ({ data, onclickSettingBtn, onclickTime }) => {
  return (
    <>
      <div className="w-full flex justify-end">
        <button
          className="flex items-center justify-center text-xl"
          onClick={onclickSettingBtn}
          >
          <IoMdSettings />
        </button>
      </div>
    <div
      className="flex flex-col items-center justify-center h-28" // 높이를 지정
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="flex flex-col -mt-3">
        {data.data.timeSet ? (
          <>
            <div className="font-bold text-3xl">
              {data.data.meridiem} {data.data.time}
            </div>
            {!data.data.completed && (
              <div 
                className="mt-4"
                onClick={onclickTime}
                >
                  미션하러 가기 →
              </div>
            )}
          </>
        ) : (
          <div>시간 설정이 완료되지 않았습니다.</div>
        )}
      </div>
    </div>
    </>

  );
};

export default SettedHomeMap;
