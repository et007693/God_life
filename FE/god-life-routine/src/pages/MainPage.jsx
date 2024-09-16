// URL: "/"

import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMainPageData } from "../api/mainPageApi";
import TodoItem from "../components/TodoItem";
import Avatar from "../components/Avatar";
import useUserStore from "../store/useUserStore";

const MainPage = () => {
  const {user,setUser} = useUserStore();
  const navigate = useNavigate();
  const goToPersonalMissionCreate = () => {
    navigate("/personalMission/create");
  };
  const goToTeamMissionCreate = () => {
    navigate("/teamMission/create");
  };

  const today = new Date();
  const formatDate = `${today.getFullYear()}.${
    today.getMonth() + 1
    }.${today.getDate()}`;
    // console.log(formatDate);

  const { data, isFetching, isError } = useQuery({
    queryKey: ["mainPageData"],
    queryFn: getMainPageData,
  });
  useEffect(()=>{
    setUser({id:1,name:"송창용",profileImage:"https://avatars.githubusercontent.com/u/103542723?v=4"})
  },[setUser])
  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <div className="flex flex-row justify-between">

      <div className="text-left ml-10 mt-10 mb-10">
        <div className="text-gray-500 text-md">Today</div>
          <div className="text-black-500 text-3xl font-bold">{formatDate}</div>
        </div>
    <div className="mr-10 mt-10 mb-10" onClick={()=>{navigate("/mypage")}}>
        <Avatar member={user}/>
    </div>
      </div>
      <div>
        <h1 className="text-xl font-bold text-left ml-10 mt-10 mb-10">
          개인미션
        </h1>
        <ul className="flex flex-col gap-4 mx-10">
          {data.personalMission ? (
            <TodoItem
              id={data.personalMission.id}
              isDone={data.personalMission.isDone}
              title={data.personalMission.title}
              onclick={() => {
                navigate("/personalMission");
              }}
            />
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
      <div>
        <h1 className="text-xl font-bold text-left ml-10 mt-10 mb-10">
          팀미션
        </h1>
        <ul className="flex flex-col gap-4 mx-10">
          {data.groupMissions ? (
            data.groupMissions.map((mission) => (
              <TodoItem
                key={mission.id}
                id={mission.id}
                isDone={mission.isDone}
                title={mission.title}
                onclick={() => {
                  navigate(`/teamMission/${mission.id}`);
                }}
              />
            ))
          ) : (
            <div>No missions</div>
          )}
        </ul>
        <div className="m-3">
          <button
            onClick={goToTeamMissionCreate}
            className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-1 px-2 rounded"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
