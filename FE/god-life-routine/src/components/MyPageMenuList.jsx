import React from 'react'
import { useNavigate } from 'react-router-dom'
import MyPageMenuListItem from './MyPageMenuListItem';
import { useCookies } from 'react-cookie';

const MyPageMenuList = ({onClickSignOutBtn}) => {
  const [cookies, removeCookies] = useCookies();
  const navigate = useNavigate();
  // TODO: 네비게이트 및 모달 적용해야함
  const menuList = [
    {
      id:1,
      name:"마일리지 Shop",
      onClick: ()=>navigate("/mileageShop")
    },
    {
      id:2,
      name:"마일리지 내역조회",
      onClick: ()=>navigate("/mileageHistory")
    },
    {
      id:3,
      name:"로그아웃",
      onClick: ()=>{
            localStorage.removeItem("accessToken");
            removeCookies("accessToken");
            return navigate("/login");
          }
    },
    {
      id:4,
      name:"회원 탈퇴",
      onClick: ()=>onClickSignOutBtn()
    }
  ]
  return (
    <ul className="flex flex-col h-auto px-8 divide-y pt-10 divide-gray-100">
       {
        menuList.map((menu)=>{
          return <MyPageMenuListItem menu={menu} key={menu.id}/>
        })
       }
      </ul>
  )
}

export default MyPageMenuList