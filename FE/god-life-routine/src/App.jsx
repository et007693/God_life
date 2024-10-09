import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import AccountHistoryPage from "./pages/AccountHistoryPage";
import AccountSelectPage from "./pages/AccountSelectPage";
import CalculateTeam from "./pages/CalculateTeam";
import CalendarPage from "./pages/CalendarPage";
import FineHistoryPage from "./pages/FineHistoryPage";
import GalleryPage from "./pages/GalleryPage";
import InviteAcceptPage from "./pages/InviteAcceptPage";
import KakaoInvitePage from "./pages/KakaoInvitePage";
import KakaoLoginCallbackPage from "./pages/KakaoLoginCallbackPage";
import LocationSettingPage from "./pages/LocationSettingPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MileageHistoryPage from "./pages/MileageHistoryPage";
import MileageShopPage from "./pages/MileageShopPage";
import MyPage from "./pages/MyPage";
import PersonalAccountDetailPage from "./pages/PersonalAccountDetailPage";
import PersonalExerciseMissionPage from "./pages/PersonalExerciseMissionPage";
import PersonalMissionCreatePage from "./pages/PersonalMissionCreatePage";
import PersonalMissionDetailPage from "./pages/PersonalMissionDetailPage";
import PhotoMissionPage from "./pages/PhotoMissionPage";
import TeamExerciseMissionPage from "./pages/TeamExerciseMissionPage";
import TeamMissionCreatePage from "./pages/TeamMissionCreatePage";
import TeamMissionDetailPage from "./pages/TeamMissionDetailPage";
import TeamMissionSettingPage from "./pages/TeamMissionSettingPage";
import TimeSettingPage from "./pages/TimeSettingPage";
import TransferPage from "./pages/TransferPage";
import TransferSuccessPage from "./pages/TransferSuccessPage";
import useRedirectStore from "./store/useRedirectStore";
import useUserStore from "./store/useUserStore";
import setScreenHeight from "./util/setScreenHeight";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 1분 동안 데이터가 유효하다.
      staleTime: 1000 * 60 * 1,
    },
  },
});
function App() {
  const [cookies, setCookies, removeCookies] = useCookies(["accessToken"]);
  const { setAccessToken } = useUserStore();
  const { Kakao } = window;
  const {redirectUrl} = useRedirectStore();
  useEffect(() => {
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.VITE_KAKAO_API_KEY);
    }
    // 초기에 스크린 사이즈에 맞춰 높이 설정
    setScreenHeight();
    // 브라우저 창 크기가 변경될 때마다 스크린 높이 재설정
    window.addEventListener("resize", setScreenHeight);
    return () => {
      window.removeEventListener("resize", setScreenHeight);
    };
  }, []);

  useEffect(() => {
    if (cookies.accessToken != null && cookies.accessToken != "undefined") {
      localStorage.setItem("accessToken", cookies.accessToken);
    }
  }, [cookies.accessToken]);
  
  return (
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/:teamId/invite/accept"
              element={<InviteAcceptPage />}
            />
            {/* 로그인 되지 않은 사용자는 로그인 페이지로 이동 */}
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<MainPage />} />
              <Route path="/kakaoInvite" element={<KakaoInvitePage />} />

              {/* TODO: 메인페이지 라우팅 추가 */}
              <Route
                path="/personalMission/create"
                element={<PersonalMissionCreatePage />}
              />
              <Route
                path="/personalMission/accountHistory"
                element={<AccountHistoryPage />}
              />
              <Route path="/personalMission" element={<Layout />}>
                <Route path="" element={<PersonalMissionDetailPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="gallery" element={<GalleryPage />} />
              </Route>
              <Route
                path="/personalMission/time/setting"
                element={<TimeSettingPage />}
              />
              <Route
                path="/personalMission/photo"
                element={<PhotoMissionPage />}
              />
              {/* 운동 미션 수행 페이지 */}
              <Route
                path="/personalMission/exercise"
                element={<PersonalExerciseMissionPage />}
              />  
              <Route
                path="/teamMission/create"
                element={<TeamMissionCreatePage />}
              />
              <Route path="/teamMission/:teamId" element={<Layout />}>
                <Route path="" element={<TeamMissionDetailPage />} />
                <Route path="calendar" element={<CalendarPage />} />
                <Route path="gallery" element={<GalleryPage />} />
              </Route>
              <Route
                path="/teamMission/:teamId/accountHistory"
                element={<AccountHistoryPage />}
              />
              {/* 팀에서 각 유저가 미션 설정하는 페이지 */}
              <Route
                path="/teamMission/:teamId/setting"
                element={<TeamMissionSettingPage />}
              />
              {/* 미션 수행 페이지 */}
              <Route
                path="/teamMission/:teamId/exercise"
                element={<TeamExerciseMissionPage />}
              />
              {/* TODO:일어나기미션페이지 추가해야함 */}
              <Route
                path="/teamMission/:teamId/wakeup"
                element={<PhotoMissionPage />}
              />
              <Route
                path="/teamMission/:teamId/fine/history"
                element={<FineHistoryPage />}
              />
              <Route
                path="/teamMission/:teamId/fine/pay"
                element={<TransferPage />}
              />
              <Route
                path="/teamMission/:teamId/fine/pay/success"
                element={<TransferSuccessPage />}
              />
              <Route
                path="/teamMission/:teamId/fine/pay/fail"
                element={<LocationSettingPage />}
              />
              <Route
                path="/teamMission/:teamId/time/setting"
                element={<TimeSettingPage />}
              />
              <Route
                path="/location/setting"
                element={<LocationSettingPage />}
              />
              {/* 팀원 정산 목록 - API 추가, 1/N로 나누기 */}
              <Route
                path="/teamMission/:teamId/calculate"
                element={<CalculateTeam />}
              />

              <Route
                path="/personalMission/wakeup"
                element={<PhotoMissionPage />}
              />

              {/* 임시로 만들어놓은 계좌선택 페이지 */}
              <Route
                path="/personalMission/account/select"
                element={<AccountSelectPage />}
              />
              {/* 임시로 만들어놓은 개인 계좌 금리 디테일페이지 */}
              <Route
                path="/personalMission/account/detail"
                element={<PersonalAccountDetailPage />}
              />
              {/* 임시로 만들어놓은 이체 성공 페이지 */}
              <Route
                path="/transferSuccess"
                element={<TransferSuccessPage />}
              />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/mileageShop" element={<MileageShopPage />} />
              <Route path="/mileageHistory" element={<MileageHistoryPage />} />
              <Route
                path="/transferSuccess"
                element={<TransferSuccessPage />}
              />
              <Route path="/mypage" element={<MyPage />} />
              {/* 카카오로그인 코드를 받을 url callback페이지 */}
              <Route
                path="/auth/kakao/callback"
                element={<KakaoLoginCallbackPage />}
              />
            </Route>
          </Routes>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        {/* <InstallBanner/> */}
      </QueryClientProvider>
    </CookiesProvider>
  );
}

export default App;
