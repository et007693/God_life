import React from "react";
import Avatar from "./Avatar";
import SettedHomeMap from "./SettedHomeMap";
import { useNavigate } from "react-router-dom";

const PersonalMissionRoomInfo = ({ missionProps }) => {
  const {
    data,
    user,
    goToPersonalAccountDetail,
    goToPersonalMissionSettingPage,
  } = missionProps;
  const navigate = useNavigate();
  const goToExerciseMissionPage = () => {
    navigate("/exerciseMission");
  };
  return (
    <div>
      <div className="flex flex-col items-center pt-24">
        <div>
          <Avatar member={user} />
        </div>
        <div className="text-xl font-bold">{data.nickname}</div>
        <div className="text-sm text-gray-400 mt-1">{data.mainAccountNo}</div>

        <div className="border rounded-xl mt-6 shadow-md text-center text-sm">
          <div className="px-10 py-4">
            매일 미션을 성공하면 우대금리를 드려요!
          </div>
          <div className="flex flex-row justify-between pt-4">
            <div className="text-gray-400 pl-5">남은 기간</div>
            <div className="font-bold text-lg pr-5">{data.remainingDate}일</div>
          </div>
          <div className="px-4 py-3">
            <div className=" bg-gray-200 rounded-full">
              <div
                className="bg-yellow-300 h-5 rounded-full text-center text-sm flex items-center justify-center"
                style={{
                  width: `${(data.runningDate / data.remainingDate) * 100}%`,
                }}
              >
                {data.runningDate}일
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-3 mx-4 mb-2"></div>

          <div className="flex flex-row justify-between pt-4">
            <div className="text-gray-400 pl-5">성공률</div>
            <div className="font-bold text-lg pr-5">{data.successRate}%</div>
          </div>

          <div className="px-4 py-3">
            <div className=" bg-gray-200 rounded-full">
              <div
                className="bg-yellow-300 h-5 rounded-full"
                style={{ width: `${data.successRate}%` }}
              >
                {data.successRate}%
              </div>
            </div>
          </div>

          <div className="border-b border-gray-300 mt-3 mx-4 mb-2"></div>

          <div className="flex flex-row justify-between items-center pt-4">
            <div>
              <div className="flex flex-row">
                <div className="text-gray-400 pl-5">현재 적용이율</div>
                <div className="font-bold text-md pl-5 text-red-500">
                  {data.interestRate}%
                </div>
              </div>

              <div className="flex flex-row">
                <div className="text-gray-400 pl-5">최대 적용이율</div>
                <div className="font-bold text-md pl-5 text-red-500 mb-4">
                  {data.primeRate}%
                </div>
              </div>
            </div>

            <div className="pr-5">
              <button
                onClick={goToPersonalAccountDetail}
                className="font-bold text-lg pb-3"
              >
                계좌 상세 →
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="text-left pt-8 pl-10 font-bold text-xl">
        {data.rule === "wakeup" ? "일찍 일어나기" : "운동하기"}
      </div>
      <div className="pt-3">
        <div
          onClick={goToPersonalMissionSettingPage}
          className="bg-gray-200 mx-10 py-10  rounded-3xl mb-16"
        >
          {data.rule === "wakeup" ? (
            data.rule.timeSet ? (
              <div className="text-2xl font-bold text-center">
                {data.rule.ruleTime}
              </div>
            ) : (
              "아직 시간설정이 완료되지 않았습니다."
            )
          ) : data.locationName ? (
            <SettedHomeMap data={data} onclickSettingBtn={goToPersonalMissionSettingPage} onclickMap={goToExerciseMissionPage}/>
          ) : (
            "아직 집 위치 설정이 되지 않았습니다."
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalMissionRoomInfo;
