import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const RoleBasedRoute = ({user, allowdedRole}) => {
  if (!user) return <Navigate to={"/login"} />
  if (!allowdedRole.includes(user.role)) return <Navigate to={"/unauthorized"} />
  return <Outlet />
}

export default RoleBasedRoute