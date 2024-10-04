import React from 'react'
import SettedHomeMap from '../SettedHomeMap'

const TeamDetailMissionInfo = ({data,goToPhotoMissionPage,goToTeamMissionTimeSettingPage,goToTeamMissionLocationSettingPage,goToExerciseMissionPage}) => {
  return (
    <>
        <div className="text-xl font-bold mt-6 text-left w-full">
          {data.data.rule}
        </div>
        <div className="text-xm text-gray-400 text-left w-full">
          평일에만 미션이 주어집니다.
        </div>
        {data.data.rule == "일찍 일어나기" ? (
          data.data.timeSet == true ? (
            <div
              onClick={goToPhotoMissionPage}
              className="flex relative justify-around bg-gray-100 mt-4 px-8 py-20 rounded-2xl w-full"
            >
              <div className="text-3xl font-bold text-center">
                {data.data.meridiem} {data.data.time}
              </div>
            </div>
          ) : (
            <div
              onClick={goToTeamMissionTimeSettingPage}
              className="flex relative justify-around bg-gray-100 mt-4 px-8 py-28 rounded-2xl w-full"
            >
              <p>시간 설정이 완료되지 않았습니다. </p>
            </div>
          )
        ) : (
          <div
            className="flex relative justify-around bg-gray-100 px-8 py-5 rounded-2xl w-full"
          >
          <SettedHomeMap data={data} onclickSettingBtn={goToTeamMissionLocationSettingPage} onclickMap={goToExerciseMissionPage}/>
          </div>
        ) }
        </>
  )
}

export default TeamDetailMissionInfo