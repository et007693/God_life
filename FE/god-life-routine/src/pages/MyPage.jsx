import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Avatar from "../components/Avatar";
import { useQuery } from "@tanstack/react-query";
import { getMyPageData } from "../api/myPageApi";
import MyPageUserInfo from "../components/MyPageUserInfo";
import MyPageMenuList from "../components/MyPageMenuList";
import useUserStore from "../store/useUserStore";
import Modal from "../components/Modal";

const MyPage = () => {
  const { setUserMyPageData } = useUserStore();
  const { data, isFetching } = useQuery({
    queryKey: ["myPageData"],
    queryFn: getMyPageData,
    staleTime: 0,
  });
   

  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    if (data != null) {
      setUserMyPageData(data);
    }
  }, [data, setUserMyPageData]);
  if (isFetching) return <div>로딩중...</div>;


  const handleButtonClick = () => {
    setShowModal(false);
  };


  return (
    <>
      <div className="h-real-screen text-lg font-semibold">
        <Header title={"마이페이지"} backgroudcolor={"white"} />
        <MyPageUserInfo member={data} />
        <MyPageMenuList onClickSignOutBtn={() => setShowModal(true)} />
        <Modal
          showModal={showModal}
          onClickCloseBtn={() => setShowModal(false)}
          width="250px"
          height="260px"
          buttonText="탈퇴하기"
          buttonColor = "red"
          onClickButton={handleButtonClick}
        >
          <div className="pt-10">정말 탈퇴하시겠습니까?</div>
        </Modal>
      </div>
    <div className="h-real-screen">
      <Header title={"마이페이지"}  backgroudcolor={"white"} goBack={"/"}/>
      <MyPageUserInfo member={data}/>
      <MyPageMenuList onClickSignOutBtn={()=>setShowModal(true)}/>
      <Modal showModal={showModal} onClickCloseBtn={()=>setShowModal(false)} >
        ㅎㅇㅎㅇ
      </Modal>
    </div>
    </>
  );
};

export default MyPage;
