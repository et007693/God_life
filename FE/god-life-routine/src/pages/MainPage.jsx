// URL: "/"

import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { getMainPageData } from "../api/mainPageApi";
import TodoItem from "../components/TodoItem";
import Avatar from "../components/Avatar";
import { useCookies } from "react-cookie";
import { useEffect } from "react";

const MainPage = () => {
  const [cookies,setCookies,removeCookies] = useCookies(["accessToken"]);
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
  useEffect(()=>{
    if(cookies.accessToken != null){
      localStorage.setItem("accessToken",cookies.accessToken);
    }
    else{
      navigate("/login");
    }
  },[])
  const { data, isFetching, isError } = useQuery({
    queryKey: ["mainPageData"],
    queryFn: getMainPageData,
  });
// 이곳 한정으로 login 페이지로 이동하는 로직 추가 나머지는 PrivateRoute에서 처리
  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div>
      <div className="flex flex-row justify-between">
        <div className="text-left ml-10 mt-10 mb-10">
          <div className="text-gray-500 text-md">Today</div>
          <div className="text-black-500 text-3xl font-bold">{formatDate}</div>
        </div>
        <div
          className="mr-10 mt-10 mb-10"
          onClick={() => {
            navigate("/mypage");
          }}
        >
          <Avatar member={{profileImage:data.profileImage}} />
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
        <h1 className="text-xl font-bold text-left ml-10 mt-20 mb-10">
          팀미션
        </h1>
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
            <div>No missions</div>
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
      <div className="flex justify-center items-center bg-slate-500 h-20">
          <button onClick={()=>{
            localStorage.removeItem("accessToken");
            removeCookies("accessToken");
            navigate("/login");
          }}>
            로그아웃
          </button>
        </div>
    </div>
  );
};

export default MainPage;
