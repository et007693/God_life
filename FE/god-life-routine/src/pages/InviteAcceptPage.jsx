import React from 'react'
import Header from '../components/Header'

const InviteAcceptPage = () => {
  return (
    <div className='h-screen flex flex-col justify-items-center items-center'>
      <Header title={'초대 수락'} color={'orange'} />
      <div className='flex flex-col items-center justify-center h-full'>
        <h1 className='text-2xl font-bold'>초대 수락</h1>
        <p className='text-sm text-gray-500'>초대를 수락하면 팀에 참여할 수 있습니다.</p>
      </div>
    </div>
  )
}

export default InviteAcceptPage