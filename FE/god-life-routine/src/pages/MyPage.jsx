import React from 'react'
import Header from '../components/Header'

const MyPage = () => {
  return (
    <div className="h-real-screen">
      <Header title={"마이페이지"}  backgroudcolor={"white"} />
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-2xl font-bold">마이페이지</div>
        <div className="text-xl">
          
        </div>
      </div>
    </div>
  )
}

export default MyPage