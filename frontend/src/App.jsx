import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home.jsx'
import Login from "./pages/Login.jsx"
import Signup from './pages/Signup.jsx'
import Jobs from './pages/Jobs.jsx'
import Profile from './pages/Profile.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { setJobs, setSavedJobs, setRecommendedJobs } from "../redux/slices/jobsSlice.js"
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
import ProtectedRoutes from './components/ProtectedRoutes.jsx'
import RoleBasedRoute from './components/RoleBasedRoute.jsx'
import PublicRoute from './components/PublicRoute.jsx'


const App = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth)

  useEffect(() => {
    checkAuth();
    getAllJobs();
  }, [])

  useEffect(() => {
    getRecommendedJobs()
  }, [user])

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

  const getRecommendedJobs = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/get-recommended-jobs", {
        withCredentials: true
      })
      if (response.data.success === true) {
        dispatch(setRecommendedJobs(response?.data.recommendedJobs))
      }

    } catch (error) {
      console.log(error)
      // toast.error(error.response?.data.message)
    }
  }

  return (
    <>
      <Navbar />
      <div className='bg-gradient-to-r from-blue-50 to-white min-h-screen'>
        <Routes>
          {/* can access with or without  logged in */}
          <Route path='/' element={<Home />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/about-us' element={<AboutUs />} />

          {/* can access only when logged out */}
          <Route element={<PublicRoute user={user} />} >
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>


          {/* can access only when logged in */}
          <Route element={<ProtectedRoutes user={user} />} >
            <Route path='/profile' element={<Profile />} />
            <Route path='/saved-jobs' element={<SavedJobs />} />
            <Route path='/job-details/:id' element={<JobDetails />} />
          </Route>

          {/* can access only when the user role is recruiter */}
          <Route element={<RoleBasedRoute user={user} allowdedRole={['recruiter']} />}>
            <Route path='/dashboard' element={<Dashboard />}>
              <Route path='add-job/:id' element={<AddJobs />} />
              <Route path='job-list' element={<JobList />} />
              <Route path='company-list' element={<CompanyList />} />
              <Route path='register-company' element={<RegisterCompany />} />
              <Route path='applicants/:id' element={<Applicants />} />
            </Route>
          </Route>

          {/* unauthorized route */}
          <Route path="/unauthorized" element={<h1 className="min-h-screen text-center text-red-500 mt-10">Access Denied</h1>} />
        </Routes>
      </div>
    </>
  )
}

export default App