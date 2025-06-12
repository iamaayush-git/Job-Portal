import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import Jobs from './pages/Jobs.jsx'
import Profile from './pages/Profile.jsx'
import { useDispatch } from 'react-redux'
import { setJobs, setSavedJobs } from "../redux/slices/jobsSlice.js"
import { toast } from 'react-toastify'
import axios from 'axios'
import { setUser } from '../redux/slices/authSlice.js'
import JobDetails from './components/JobDetails.jsx'
import SavedJobs from './pages/SavedJobs.jsx'
import AboutUs from './pages/AboutUs.jsx'
import Dashboard from './admin/pages/Dashboard.jsx'
import AddJobs from './admin/pages/AddJobs.jsx'
import JobList from './admin/pages/JobList.jsx'
import RegisterCompany from './admin/pages/RegisterCompany.jsx'
import CompanyList from './admin/pages/CompanyList.jsx'
import Applicants from './admin/pages/Applicants.jsx'


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAuth();
    getAllJobs();
  }, [])

  const checkAuth = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/user/check-auth", { withCredentials: true })
      if (response.data.success === true) {
        localStorage.setItem('isLoggedIn', 'true');
        getSavedJobs();
        dispatch(setUser(response.data.user));
      }

    } catch (error) {
      console.log(error)
      localStorage.setItem('isLoggedIn', false);
    }
  }

  const getAllJobs = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/get-all-jobs");
      if (response.data.success === true) {
        dispatch(setJobs(response?.data.jobs))
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message)
    }
  }

  const getSavedJobs = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/get-saved-jobs", {
        withCredentials: true
      });
      if (response.data.success === true) {
        dispatch(setSavedJobs(response?.data.savedJobs))
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data.message)
    }
  }


  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-r from-blue-50 to-white'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='add-job/:id' element={<AddJobs />} />
            <Route path='job-list' element={<JobList />} />
            <Route path='company-list' element={<CompanyList />} />
            <Route path='register-company' element={<RegisterCompany />} />
            <Route path='applicants/:id' element={<Applicants />} />
          </Route>
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/job-details/:id' element={<JobDetails />} />
          <Route path='/saved-jobs' element={<SavedJobs />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </div>
    </>
  )
}

export default App