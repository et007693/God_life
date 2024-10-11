import React, { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import { useCookies } from 'react-cookie';
import useRedirectStore from '../store/useRedirectStore';

const PrivateRoute = () => {
  const {accessToken,setAccessToken} = useUserStore();
  useEffect(()=>{
    if(localStorage.getItem("accessToken") != null){
      setAccessToken(localStorage.getItem("accessToken"));  
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