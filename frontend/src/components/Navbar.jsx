import React, { useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoIosLogOut } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { ToastContainer } from "react-toastify"
import { useSelector } from 'react-redux';
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserDetails, setShowUserDetails] = useState(false)
  const { user } = useSelector(state => state.auth);

  // temp varaibles
  // const user = false;


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
            <Link to={"/services"} className="text-gray-700 hover:text-blue-500">Browse</Link>
            {user ? (<div className='relative group' href="#">
              <img className='w-12 rounded-full cursor-pointer' src={user.profile.photo} alt="" />
              {/* user details */}
              <div className='bg-blue-50 w-[25vw] p-5 rounded-md group-hover:opacity-100 duration-300 absolute -bottom-40 right-10 opacity-0'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-5'>
                    <img className='w-12 rounded-full cursor-pointer' src={user.profile.photo} alt="" />
                    <div>
                      <p className='text-lg text-nowrap'>{user.fullname}</p>
                      <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <div className='flex items-center gap-4'>
                      <CiUser size={30} />
                      <Link to={"/profile"}><p className='cursor-pointer font-light hover:text-blue-500'>View Profile</p></Link>
                    </div>
                    <div className='flex items-center gap-4'>
                      <IoIosLogOut size={30} />
                      <p className='cursor-pointer font-light hover:text-blue-500'>Logout</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>) : <div className='space-x-5'>
              <Link to={"/login"} ><button className='px-3 py-2 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-700 duration-200 text-white'>Login</button></Link>
              <Link to={"/signup"}> <button className='px-3 py-2 cursor-pointer rounded-md bg-blue-500 hover:bg-blue-700 duration-200 text-white'>Signup</button></Link>
            </div>}
          </div>

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