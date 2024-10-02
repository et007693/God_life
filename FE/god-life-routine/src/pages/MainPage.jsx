// URL: "/"

import { useQuery } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { getMainPageData } from "../api/mainPageApi";
import { useCookies } from "react-cookie";
import { useEffect } from "react";
import MainPageHeader from "../components/MainPageHeader";
import MainPagePersonalMission from "../components/MainPagePersonalMission";
import MainPageTeamMission from "../components/MainPageTeamMission";
import LoadingSpinner from "../components/common/LoadingSpinner";
import useRedirectStore from "../store/useRedirectStore";

const MainPage = () => {
  const [cookies, setCookies, removeCookies] = useCookies(["accessToken"]);
  const navigate = useNavigate();
  const {redirectUrl} = useRedirectStore();
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
    staleTime: 0,
  });
  useEffect(() => {
    if(data && !data.locationSet){
      navigate("/location/setting");
    }
    if(redirectUrl){
      navigate(redirectUrl);
    }
  }, [data]);
  // 이곳 한정으로 login 페이지로 이동하는 로직 추가 나머지는 PrivateRoute에서 처리
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
      <div className="flex justify-center items-center bg-slate-500 h-20">
        <button
          onClick={() => {
            localStorage.removeItem("accessToken");
            removeCookies("accessToken");
            navigate("/login");
          }}
        >
          로그아웃
        </button>
      </div>
    </div>
  );
};

export default MainPage;
