import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const enableMocking = async () =>{
// 개발환경이 아니면 모킹 끄기
  if (!import.meta.env.DEV){
    return;
  }

    const {worker} = await import('./mock/browser.js');
    // worker가 시작되는것을 기다림
    return worker.start();
}
// enableMocking().then(()=>{
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
// })

