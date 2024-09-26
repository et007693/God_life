import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useUserStore from '../store/useUserStore';

const PrivateRoute = () => {
    const {user} = useUserStore();
    if(!user){
        return <Navigate to="/login" />;
    }
  return (
    <Outlet />
  )
}

export default PrivateRoute