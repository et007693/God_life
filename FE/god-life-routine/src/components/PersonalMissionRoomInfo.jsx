import React from "react";
import Avatar from "./Avatar";
import SettedHomeMap from "./SettedHomeMap";
import { useNavigate } from "react-router-dom";
import SettedTime from "./SettedTime";

const PersonalMissionRoomInfo = ({ missionProps }) => {
  const {
    data,
    goToPersonalAccountDetail,
    
    goToPersonalMissionSettingPage,
  } = missionProps;

  const navigate = useNavigate();
  const goToExerciseMissionPage = () => {
    navigate("/personalMission/exercise", {
      state: { lat: data.data.lat, lng: data.data.lng },
    });
  };

  const goToSetTimePage = () => {
    navigate("/personalMission/time/setting");
  };

  const goToPhotoMissionPage = () => {
    navigate(`/personalMission/wakeup`);
  };
  const goToTeamMissionLocationSettingPage = () => {
    navigate(`/location/setting`);
  };

  return (
    <>
      <div className="flex flex-col items-center pt-24">
        <div>
          <Avatar member={data.data} />
        </div>
        <div className="text-xl font-bold pt-2">{data.data.nickname}</div>
        <div className="text-sm text-gray-400 ">
          {data.data.accountBank} {data.data.accountNumber}
        </div>

        <div className="border rounded-xl mt-4 shadow-md text-center text-sm">
          <div className="px-10 py-4">
            매일 미션을 성공하면 우대금리를 드려요!
          </div>
          <div className="flex flex-row justify-between pt-4">
            <div className="text-gray-400 pl-5">남은 기간</div>
            <div className="font-bold text-lg pr-5">
              {data.data.remainingDate}일
            </div>
          </div>
          <div className="px-4 py-3">
            <div className=" bg-gray-200 rounded-full">
              <div
                className="bg-yellow-300 h-5 rounded-full text-center text-sm flex items-center justify-center"
                style={{
                  // 노란색 넓이 12 이하이면 12만큼 표시
                  width: `${
                    100 -
                      (data.data.remainingDate / data.data.runningDate) * 100 <
                    12
                      ? 12
                      : 100 -
                        (data.data.remainingDate / data.data.runningDate) * 100
                  }%`,
                }}
              >
                {/* {data.data.runningDate}일 */}
                {`${Math.round(
                  100 - (data.data.remainingDate / data.data.runningDate) * 100
                )}%`}
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-3 mx-4 mb-2"></div>

          <div className="flex flex-row justify-between pt-4">
            <div className="text-gray-400 pl-5">성공률</div>
            <div className="font-bold text-lg pr-5">
              {Math.round(data.data.successRate)}%
            </div>
          </div>

          <div className="px-4 py-3">
            <div className=" bg-gray-200 rounded-full">
              <div
                className="bg-yellow-300 h-5 rounded-full"
                style={{ width: `${data.data.successRate}%` }}
              >
                {Math.round(data.data.successRate)}%
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-3 mx-4 mb-2"></div>

          <div className="flex flex-row justify-between items-center px-4 py-3">
            <div className="flex">
              <div className="text-gray-400 mr-2">현재 적용이율</div>
              <div className="font-bold text-md text-red-500">
                {data.data.interestRate}%
              </div>
            </div>
            {/* TODO: 계좌상세 API 연결 */}
            <div>
              <button
                onClick={goToPersonalAccountDetail}
                className="font-bold text-lg mb-1 mr-3"
              >
                계좌 상세 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left pt-8 pl-10 font-bold text-xl">
        {data.data.rule}
      </div>
      <div className="text-xm text-gray-400 text-left w-full pl-10">
        평일에만 미션이 주어집니다.
      </div>
        <div
          className="bg-gray-100 mt-3 mx-10 py-3 pt-1 rounded-3xl mb-16"
        >
          {data.data.rule === "일찍 일어나기" ? (
            <div
              className="px-4 py-5"
            >
              <SettedTime data={data} onclickSettingBtn={goToSetTimePage} onclickTime={goToPhotoMissionPage}/>
            </div>
          ):(
            <div
              className="flex relative justify-around bg-gray-100 py-5 rounded-2xl w-full"
            >
              <SettedHomeMap data={data} onclickSettingBtn={goToTeamMissionLocationSettingPage} onclickMap={goToExerciseMissionPage}/>
            </div>

          )
         }
        </div>
    </>
  );
};

export default PersonalMissionRoomInfo;
