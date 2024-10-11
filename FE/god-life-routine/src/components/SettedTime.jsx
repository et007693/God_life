import React from "react";
import { IoMdSettings } from "react-icons/io";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const SettedHomeMap = ({ data, onclickSettingBtn, onclickTime }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { teamId } = useParams();
  const onClickSettingBtn = () =>{
    if (location.pathname.includes("team")){
      navigate(`/teamMission/${teamId}/time/setting`,{state: {"teamName":data.data.title+"팀"}});
    }else{
      navigate(`/personalMission/time/setting`,{state: {"name":data.data.nickname+"님"}});
    }
  }
  return (
    <>
      <div className="w-full flex justify-end">
        <button
          className="flex items-center justify-center text-xl"
          onClick={onClickSettingBtn}
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
