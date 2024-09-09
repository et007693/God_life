import React from 'react'
import kakaoLogo from '../assets/kakao-logo.png'

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-60">갓생루팅</h1>
      <button className="bg-[#FEE500] hover:bg-yellow-300 text-black font-bold py-2 px-4 rounded-lg flex items-center">
              <img src={kakaoLogo} alt="Kakao Logo" className="w-6 h-6 mr-2" />
        카카오톡 로그인
      </button>
    </div>
  )
}

export default LoginPage