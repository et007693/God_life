import React from 'react'
import SettedHomeMap from '../SettedHomeMap'
import SettedTime from '../SettedTime'


const TeamDetailMissionInfo = ({data,goToPhotoMissionPage, goToTeamMissionTimeSettingPage, goToTeamMissionLocationSettingPage, goToExerciseMissionPage}) => {

  return (
    <>
      <div className="text-left font-bold text-xl">
        {data.data.rule}
      </div>
      <div className="text-left text-xs text-gray-400">
          <p>평일에만 미션이 주어집니다.</p>
        </div>
      <div className="bg-gray-100 mt-3 rounded-3xl mb-16">
        {data.data.rule == "일찍 일어나기" ? (
          <div className="p-4">
            <SettedTime data={data} onclickSettingBtn={goToTeamMissionTimeSettingPage} onclickTime={goToPhotoMissionPage}/>
          </div>
        ) : (
          <div
            className="flex relative justify-around bg-gray-100 py-5 rounded-2xl w-full"
          >
          <SettedHomeMap data={data} onclickSettingBtn={goToTeamMissionLocationSettingPage} onclickMap={goToExerciseMissionPage}/>
          </div>
        ) }
      </div>
    </>
  )
}

export default TeamDetailMissionInfo