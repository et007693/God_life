import React, { useEffect } from 'react'
import kakaoLogo from '../assets/kakao-logo.png'
import useUserStore from '../store/useUserStore'
import { useLocation, useNavigate } from 'react-router-dom'
import axiosApi from '../api/axiosApi'
import { useCookies } from 'react-cookie'
import useRedirectStore from '../store/useRedirectStore'

const LoginPage = () => {
  const location = useLocation();
  const {setRedirectUrl} = useRedirectStore();
  const onClickKakaoLogin = async () =>{
    const baseUrl = import.meta.env.DEV ? "http://localhost:8080" : "http://j11a503.p.ssafy.io"
    
    window.location.href = `${baseUrl}/api/v1/oauth2/authorization/kakao`

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-60">갓생루팅</h1>
      <button onClick={onClickKakaoLogin} className="bg-[#FEE500] hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg flex items-center">
              <img src={kakaoLogo} alt="Kakao Logo" className="w-6 h-6 mr-2" />
        카카오톡 로그인
      </button>
    </div>
  )
}

export default LoginPage