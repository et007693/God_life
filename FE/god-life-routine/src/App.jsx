import { useEffect, useState } from 'react'
import './App.css'
import RegistPlacePage from './pages/RegistPlacePage'
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
          <Route path="/" element={<RegistPlacePage/>}/>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
