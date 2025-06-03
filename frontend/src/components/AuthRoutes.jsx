import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  
}


export const PublicRoute = () => {
  const { isLoggedIn } = useSelector(state => state.auth)
  console.log(isLoggedIn)
  if (isLoggedIn) {
    return <Navigate to={"/"} replace />
  }

  return <Outlet />
}
