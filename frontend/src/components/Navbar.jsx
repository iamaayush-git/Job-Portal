import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { MdDashboard } from "react-icons/md";
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios"
import { removeUser } from '../../redux/slices/authSlice.js';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false)
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/user/logout", { withCredentials: true })
      if (response.data.success === true) {
        toast.success(response.data.message)
        dispatch(removeUser())
        navigate("/")
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  return (
    <nav className="bg-white shadow-md z-50">
      <ToastContainer />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">Job Portal</div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 justify-center items-center">
            <Link to={"/"} className="text-gray-700 hover:text-blue-500">Home</Link>
            <Link to={"/jobs"} className="text-gray-700 hover:text-blue-500">Jobs</Link>
            <Link to={"/about-us"} className="text-gray-700 hover:text-blue-500">About us</Link>
            {user ? (
              <div className="relative group w-fit">
                {/* Profile Avatar */}
                <img
                  className="w-12 h-12 rounded-full cursor-pointer border"
                  src={user.profile?.photo}
                  alt="User avatar"
                />

                {/* Dropdown Menu */}
                <div className="absolute right-0 top-12 w-[25vw] min-w-[250px] bg-blue-50 border rounded-md p-5 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50 shadow-md">
                  <div className="space-y-4">
                    {/* User Info */}
                    <div className="flex items-center gap-4">
                      <img
                        className="w-12 h-12 rounded-full"
                        src={user.profile?.photo}
                        alt="User avatar"
                      />
                      <div>
                        <p className="text-lg font-semibold truncate">{user.fullname}</p>
                        <p className="text-sm text-gray-500">{user.profile.bio}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <Link to="/profile" className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                        <CiUser size={24} />
                        <span className="font-light">View Profile</span>
                      </Link>
                      {user.role === "recruiter" ? <Link to="/dashboard/add-job" className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                        <MdDashboard />
                        <span className="font-light">Admin Dashboard</span>
                      </Link> : <Link to="/saved-jobs" className="flex items-center gap-3 hover:text-blue-500 transition-colors">
                        <img className='w-5' src="https://cdn-icons-png.flaticon.com/512/2956/2956783.png" alt="" />
                        <span className="font-light">View saved jobs</span>
                      </Link>}

                      <div
                        className="flex items-center gap-3 hover:text-blue-500 cursor-pointer transition-colors"
                        onClick={handleLogout}
                      >
                        <IoIosLogOut size={24} />
                        <span className="font-light">Logout</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-x-4">
                <Link to="/login">
                  <button className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white transition duration-200">
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-700 text-white transition duration-200">
                    Signup
                  </button>
                </Link>
              </div>
            )}


            {/* Mobile Menu Button */}
            <div className="md:hidden flex gap-5">
              <button
                onClick={() => { setIsOpen(!isOpen); setShowUserDetails(false) }}
                className="text-gray-700 focus:outline-none"
              >
                {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>

              {/* user details */}
              {user ? (<div className='relative' href="#">
                <img onClick={() => setShowUserDetails(prev => !prev)} className='w-10 rounded-full cursor-pointer' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />

                {/* hidden */}
                {showUserDetails && <div className='bg-blue-50 p-2 w-[80vw] rounded-md duration-300 absolute -bottom-37 right-10'>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-5'>
                      <img className='w-10 rounded-full cursor-pointer ' src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" alt="" />
                      <div className='text-md'>
                        <p className='text-lg text-nowrap'>Aayush Bhattarai</p>
                        <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
                      </div>
                    </div>
                    <div className='space-y-2 text-md'>
                      <div className='flex items-center gap-4'>
                        <CiUser size={30} />
                        <p className='cursor-pointer font-light hover:text-blue-500'>View Profile</p>
                      </div>
                      <div className='flex items-center gap-4'>
                        <IoIosLogOut size={30} />
                        <p className='cursor-pointer font-light hover:text-blue-500'>Logout</p>
                      </div>
                    </div>
                  </div>
                </div>}
              </div>) : <button className='px-2 py-1 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-700 duration-200 text-white'>Login</button>}

            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white px-4 pb-4 space-y-2 shadow-md">
          <Link to={"/"} className="block text-gray-700 hover:text-blue-500">Home</Link>
          <Link to={"/jobs"} className="block text-gray-700 hover:text-blue-500">Jobs</Link>
          <Link to={"/services"} className="block text-gray-700 hover:text-blue-500">Browse</Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar