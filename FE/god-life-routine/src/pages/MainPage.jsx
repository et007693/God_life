// URL: "/"

import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { getMainPageData } from "../api/mainPageApi";
import { useCookies } from "react-cookie";
import MainPageHeader from "../components/MainPageHeader";
import MainPagePersonalMission from "../components/MainPagePersonalMission";
import MainPageTeamMission from "../components/MainPageTeamMission";
import LoadingSpinner from "../components/common/LoadingSpinner";
import { useMainPage } from "../hooks/useMainPage";

const MainPage = () => {
  const {data, isFetching, isError, goToPersonalMissionCreate, goToTeamMissionCreate, formatDate, removeCookies} = useMainPage();
  // 이곳 한정으로 login 페이지로 이동하는 로직 추가 나머지는 PrivateRoute에서 처리
  const navigate = useNavigate();
  if (isFetching)
    return (
      <div className="flex justify-center items-center w-full h-screen">
        <LoadingSpinner />
      </div>
    );
  if (isError) return <Navigate to={"/login"} />;

  return (
    <div>
      <MainPageHeader
        formatDate={formatDate}
        profileImageSrc={{ profileImage: data.profileImage }}
      />
      <MainPagePersonalMission
        data={data}
        navigate={navigate}
        goToPersonalMissionCreate={goToPersonalMissionCreate}
      />
      <MainPageTeamMission
        data={data}
        navigate={navigate}
        goToTeamMissionCreate={goToTeamMissionCreate}
      />
    </div>
  );
};

export default MainPage;
