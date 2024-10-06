import React from 'react';
import TodoItem from './TodoItem';

const MainPagePersonalMission = ({data, navigate, goToPersonalMissionCreate}) => {
  return (
    <div>
        <h1 className="text-xl font-bold text-left ml-10 mt-10 mb-10">
          개인미션
        </h1>
        <ul className="flex flex-col gap-4 mx-10">
          {data.personalRoomList.length > 0 ? (
            data.personalRoomList.map((mission) => (
              <TodoItem
                key={mission.roomId}
                id={mission.roomId}
                isDOne={mission.completed}
                title={mission.rule}
                onclick={() => {
                  navigate("/personalMission");
                }}
              />
            ))
            
          ) : (
            <div className="m-3">
              <button
                onClick={goToPersonalMissionCreate}
                className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded"
              >
                +
              </button>
            </div>
          )}
        </ul>
      </div>
      
  )
}

export default MainPagePersonalMission