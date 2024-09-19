import React, { useEffect } from 'react'
import Header from '../components/Header'
import Avatar from '../components/Avatar'
import { useQuery } from '@tanstack/react-query'
import { getMyPageData } from '../api/myPageApi'
import MyPageUserInfo from '../components/MyPageUserInfo'
import MyPageMenuList from '../components/MyPageMenuList'
import useUserStore from '../store/useUserStore'

const MyPage = () => {
  const {setUserMyPageData} = useUserStore();
  const {data,isFetching} = useQuery(
    {
      queryKey:["myPageData"],
      queryFn: getMyPageData,
      staleTime:0,
    }
  )
  useEffect(()=>{
    if(data != null){
      setUserMyPageData(data)
    }
  },[data,setUserMyPageData])
  if (isFetching) return <div>로딩중...</div>
  return (
    <div className="h-real-screen">
      <Header title={"마이페이지"}  backgroudcolor={"white"} />
      <MyPageUserInfo member={data}/>
      <MyPageMenuList/>
    </div>
  )
}

export default MyPage