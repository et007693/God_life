import { useEffect, useState } from 'react'
import './App.css'
import PlaceMissionRegistPage from './pages/PlaceMissionRegistPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import setScreenHeight from './util/setScreenHeight'
import MainPage from './pages/MainPage'
import PersonalMissionCreatePage from './pages/PersonalMissionCreatePage'
import PersonalMissionDetailPage from './pages/PersonalMissionDetailPage'
import AccountHistoryPage from './pages/AccountHistoryPage'
import CalendarPage from './pages/CalendarPage'
import GalleryPage from './pages/GalleryPage'
import PersonalMissionSettingPage from './pages/PersonalMissionSettingPage'
import PerformMissionPage from './pages/PerformMissionPage'
import TeamMissionCreatePage from './pages/TeamMissionCreatePage'
import TeamMissionDetailPage from './pages/TeamMissionDetailPage'
import TeamMissionSettingPage from './pages/TeamMissionSettingPage'
import FineHistoryPage from './pages/FineHistoryPage'
import LoginPage from './pages/LoginPage'
import TransferPage from './pages/TransferPage'
import TransferSuccessPage from './pages/TransferSuccessPage'
import PhotoMissionPage from './pages/PhotoMissionPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const queryClient = new QueryClient();
  const [count, setCount] = useState(0)
  useEffect(()=>{
    // 초기에 스크린 사이즈에 맞춰 높이 설정
    setScreenHeight();
    // 브라우저 창 크기가 변경될 때마다 스크린 높이 재설정
    window.addEventListener('resize', setScreenHeight);
    return ()=>{
      window.removeEventListener('resize', setScreenHeight);
    }
  },[])
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          {/* TODO: 메인페이지 라우팅 추가 */}
          <Route path="/" element={<MainPage/>}/>
          <Route path="/personalMission/create" element={<PersonalMissionCreatePage/>}/>
          <Route path="/personalMission/:roomId" element={<PersonalMissionDetailPage/>} />
          <Route path="/personalMission/accountHistory" element={<AccountHistoryPage/>}/>
          <Route path="/personalMission/calendar" element={<CalendarPage/>}/>
          <Route path="/personalMission/gallery" element={<GalleryPage/>}/>
          <Route path="/personalMission/setting" element={<PersonalMissionSettingPage/>}/>
          <Route path="/personalMission/perform" element={<PerformMissionPage/>}/>
          <Route path="/teamMission/create" element={<TeamMissionCreatePage/>}/>
          <Route path="/teamMission/:teamId" element={<TeamMissionDetailPage/>}/>
          <Route path="/teamMission/:teamId/accountHistory" element={<AccountHistoryPage/>}/>
          <Route path="/teamMission/:teamId/calendar" element={<CalendarPage/>}/>
          <Route path="/teamMission/:teamId/gallery" element={<GalleryPage/>}/>
          {/* 팀에서 각 유저가 미션 설정하는 페이지 */}
          <Route path="/teamMission/:teamId/setting" element={<TeamMissionSettingPage/>}/>
          <Route path="/teamMission/:teamId/perform" element={<PerformMissionPage/>}/>
          <Route path="/teamMission/:teamId/fine/history" element={<FineHistoryPage/>}/>
          <Route path="/teamMission/:teamId/fine/pay" element={<TransferPage/>}/>
          <Route path="/teamMission/:teamId/fine/pay/success" element={<TransferSuccessPage/>}/>
          <Route path="/teamMission/:teamId/fine/pay/fail" element={<PlaceMissionRegistPage/>}/>
          <Route path="/photoMission" element={<PhotoMissionPage/>}/>
        </Routes>

      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
