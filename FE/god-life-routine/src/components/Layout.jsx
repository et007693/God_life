import React, { useEffect, useState } from 'react'
import NavTab from './NavTab'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  const [userType, setUserType] = useState()

  useEffect(() => {
    const path = window.location.pathname

    if (path.includes('/teamMission/')) {
      setUserType('team')
    } else {
      setUserType('personal')
    }
  })

  return (
    <div>
      <Outlet />
      <NavTab userType={userType} />
    </div>  
    )
}

export default Layout