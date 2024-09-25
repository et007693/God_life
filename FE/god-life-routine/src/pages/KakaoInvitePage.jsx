import React from 'react'
import Header from '../components/Header'
import shareKakao from '../util/shareKakao'

const KakaoInvitePage = () => {
 const handleShareKakaoBtn = async ()=>{
    await shareKakao(1);
 }
  return (
    <div>
        <Header title={'카카오톡 초대'} color={'orange'}/>
        <button className='bg-blue-500 text-white p-2 rounded-md' onClick={handleShareKakaoBtn}>카카오톡 공유</button>
    </div>
  )
}

export default KakaoInvitePage