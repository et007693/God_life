import React, { useEffect } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { useCookies } from 'react-cookie';

const PrivateRoute = () => {
  const {accessToken,setAccessToken} = useUserStore();
  const [cookies,setCookies,removeCookies] = useCookies(["accessToken"]);
  useEffect(()=>{
    if(cookies.accessToken != null || localStorage.getItem("accessToken") != null){
      setAccessToken(cookies.accessToken || localStorage.getItem("accessToken"));
    }
  },[])
    if(localStorage.getItem("accessToken") == null){
        return <Navigate to="/login" />;
    }
  return (
    <Outlet />
  )
}

export default PrivateRoute