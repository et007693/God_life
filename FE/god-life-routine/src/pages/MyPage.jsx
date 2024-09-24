import Header from '../components/Header'
import MyPageUserInfo from '../components/MyPageUserInfo'
import MyPageMenuList from '../components/MyPageMenuList'

import Modal from '../components/Modal'
import { useMyPage } from '../hooks/useMyPage'

const MyPage = () => {
  const {data,isFetching,showModal,setShowModal} = useMyPage();
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