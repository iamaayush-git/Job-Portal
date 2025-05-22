import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import Jobs from './pages/Jobs.jsx'
import Browse from './pages/Browse.jsx'
import Profile from './pages/Profile.jsx'


const App = () => {
  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-r from-blue-50 to-white'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/services' element={<Browse />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App