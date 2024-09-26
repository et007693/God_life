import React from 'react'

const TeamMissionDetailBody = ({data}) => {
  return (
    <div className="flex relative justify-around bg-white-100 pb-8 pt-4 rounded-t-2xl w-full border border-gray-300">
    <div className="flex w-1/2 flex-col items-center justify-center">
      <p className="text-sm font-bold text-gray-500">모인 벌금</p>
      <p className="text-3xl font-bold pt-2 ">{data.fineGathered}</p>
    </div>

    <div className="border-l-2 border-gray-300 h-20 absolute left-1/2 -translate-x-1/2"></div>

    <div className="flex w-1/2 flex-col items-center justify-center">
      <p className="text-sm font-bold text-gray-500">밀린 벌금</p>
      <p className="text-3xl font-bold pt-2">{data.fineDelayed}</p>
    </div>
  </div>
  )
}

export default TeamMissionDetailBody