import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = ({ user }) => {

  if (!user) return <Navigate to={"/login"} />
  if (user) return <Outlet />

}

export default ProtectedRoutes