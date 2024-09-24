import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useQuery } from '@tanstack/react-query'
import { getMyPageData } from '../api/myPageApi'
import MyPageUserInfo from '../components/MyPageUserInfo'
import MyPageMenuList from '../components/MyPageMenuList'
import useUserStore from '../store/useUserStore'
import Modal from '../components/Modal'

const MyPage = () => {
  const {setUserMyPageData} = useUserStore();
  const {data,isFetching} = useQuery(
    {
      queryKey:["myPageData"],
      queryFn: getMyPageData,
      staleTime:0,
    }
  )
  const [showModal,setShowModal] = useState(false);
  useEffect(()=>{
    if(data != null){
      setUserMyPageData(data)
    }
  },[data,setUserMyPageData])
  if (isFetching) return <div>로딩중...</div>
  return (
    <>
    <div className="h-real-screen">
      <Header title={"마이페이지"}  backgroudcolor={"white"} goBack={"/"}/>
      <MyPageUserInfo member={data}/>
      <MyPageMenuList onClickSignOutBtn={()=>setShowModal(true)}/>
      <Modal showModal={showModal} onClickCloseBtn={()=>setShowModal(false)} >
        ㅎㅇㅎㅇ
      </Modal>
    </div>
    </>
  )
}

export default MyPage