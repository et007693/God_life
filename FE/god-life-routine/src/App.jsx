import { useEffect, useState } from 'react'
import './App.css'
import PlaceMissionRegistPage from './pages/PlaceMissionRegistPage'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import setScreenHeight from './util/setScreenHeight'

function App() {
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
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PlaceMissionRegistPage/>}/>
          <Route path="/personalMission/create" element={<PlaceMissionRegistPage/>}/>
          <Route path="/personalMission" element={<PlaceMissionRegistPage/>} />
          <Route path="/personalMission/accountHistory" element={<PlaceMissionRegistPage/>}/>
          <Route path="/personalMission/calendar" element={<PlaceMissionRegistPage/>}/>
          <Route path="/personalMission/gallery" element={<PlaceMissionRegistPage/>}/>
          <Route path="/personalMission/wakeup" element={<PlaceMissionRegistPage/>}/>
          <Route path="/personalMission/exercise" element={<PlaceMissionRegistPage/>}/>
          <Route path="/teamMission/create" element={<PlaceMissionRegistPage/>}/>
          <Route path="/teamMission" element={<PlaceMissionRegistPage/>}/>
          <Route path="/teamMission/accountHistory" element={<PlaceMissionRegistPage/>}/>
          <Route path="/teamMission/calendar" element={<PlaceMissionRegistPage/>}/>
          <Route path="/teamMission/gallery" element={<PlaceMissionRegistPage/>}/>
          <Route path="/teamMission/wakeup" element={<PlaceMissionRegistPage/>}/>
          <Route path="/teamMission/exercise" element={<PlaceMissionRegistPage/>}/>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
