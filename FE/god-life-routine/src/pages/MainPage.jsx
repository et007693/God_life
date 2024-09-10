// URL: "/"

import React from 'react'
import { useNavigate } from 'react-router-dom'

const MainPage = () => {
  const navigate = useNavigate()
  const goToPersonalMissionCreate = () => {
    navigate('/personalMission/create')
  }
  const goToTeamMissionCreate = () => {
    navigate('/teamMission/create')
  }

  const today = new Date()
  const formatDate = `${today.getFullYear()}.${today.getMonth() + 1}.${today.getDate()}`
  // console.log(formatDate);

  return (
    <div>
      <div className="text-left ml-10 mt-10 mb-10">
        <div className="text-gray-500 text-md">Today</div>
        <div className="text-black-500 text-3xl font-bold">{formatDate}</div>
      </div>
      <div>
        <h1 className='text-xl font-bold text-left ml-10 mt-10 mb-10'>개인미션</h1>
        <button 
        onClick={goToPersonalMissionCreate} 
        className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded"> 
          + 
        </button>
      </div>
      <div>
        <h1 className='text-xl font-bold text-left ml-10 mt-10 mb-10'>팀미션</h1>
      <button
      onClick={goToTeamMissionCreate}
      className='bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded'
      > + 
      </button>
      </div>
    </div>

  )
}

export default MainPage