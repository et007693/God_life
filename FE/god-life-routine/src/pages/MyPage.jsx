import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import MyPageUserInfo from "../components/MyPageUserInfo";
import MyPageMenuList from "../components/MyPageMenuList";
import Modal from "../components/Modal";
import { useMyPage } from "../hooks/useMyPage";

const MyPage = () => {
  const { data, isFetching, isError, showModal, setShowModal, handleButtonClick } = useMyPage();

  if (isFetching) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <>
      <div className="h-real-screen text-lg font-semibold">
        <Header title={"마이페이지"} backgroudcolor={"white"} color={"orange"} goBack={"/"} />
        <MyPageUserInfo member={data} />
        <MyPageMenuList onClickSignOutBtn={() => setShowModal(true)} />
        <Modal
          showModal={showModal}
          onClickCloseBtn={() => setShowModal(false)}
          width="250px"
          height="240px"
          buttonText="탈퇴하기"
          buttonColor="red"
          onClickButton={handleButtonClick}
        >
          <div className="pt-10">정말 탈퇴하시겠습니까?</div>
        </Modal>
      </div>
      
    </>
  );
};

export default MyPage;
