import React from 'react'
import NavTab from './NavTab'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div>
      <Outlet />
      <NavTab />
    </div>  
    )
}

export default Layout