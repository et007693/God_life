import React from 'react'
import kakaoLogo from '../assets/kakao-logo.png'
import login from '../api/authApi'
import useUserStore from '../store/useUserStore'
import { useNavigate } from 'react-router-dom'

const TempLoginPage = () => {
  const {accessToken,setAccessToken} = useUserStore();
  const navigate = useNavigate();
  const onClickKakaoLogin = async () =>{
    // TODO: 추후 로그인 리다이렉트 수정 필요
    const response = await login();
    console.log(response);
    
    // console.log(response.headers.getAuthorization());
    // setAccessToken(response.headers.getAuthorization());
    // setAccessToken(response.headers.access_token);

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-60">임시로그인페이지</h1>
      <button onClick={onClickKakaoLogin} className="bg-[#FEE500] hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg flex items-center">
              <img src={kakaoLogo} alt="Kakao Logo" className="w-6 h-6 mr-2" />
        카카오톡 로그인
      </button>
    </div>
  )
}

export default TempLoginPage