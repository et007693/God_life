import React from 'react'
import kakaoLogo from '../assets/kakao-logo.png'
import useUserStore from '../store/useUserStore'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY
const REDIRECT_URI = 'http://localhost:5173/auth/kakao/callback'
const {accessToken,setAccessToken} = useUserStore();
const navigate = useNavigate();
  const onClickKakaoLogin = async () =>{
    
    await setAccessToken("hehehe");
    
    // navigate("/")
    // TODO: 추후 로그인 리다이렉트 수정 필요
    
    window.location.href = 'http://j11a503.p.ssafy.io:8080/api/v1/oauth2/authorization/kakao'
    // window.location.href = 
    // `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`

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