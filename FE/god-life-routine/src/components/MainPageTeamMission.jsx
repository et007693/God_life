import React from "react";
import TodoItem from "./TodoItem";

const MainPageTeamMission = ({ data, navigate, goToTeamMissionCreate }) => {
  return (
    <div>
      <h1 className="text-xl font-bold text-left ml-10 mt-20 mb-10">팀미션</h1>
      <ul className="flex flex-col gap-4 mx-10">
        {data.teamRoomList ? (
          data.teamRoomList.map((mission) => (
            <TodoItem
              key={mission.roomId}
              id={mission.roomId}
              isDone={mission.completed}
              title={mission.rule}
              onclick={() => {
                navigate(`/teamMission/${mission.roomId}`);
              }}
            />
          ))
        ) : (
          <></>
        )}
      </ul>
      <div className="m-3 mt-8">
        <button
          onClick={goToTeamMissionCreate}
          className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default MainPageTeamMission;
