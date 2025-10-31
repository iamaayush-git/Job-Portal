import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '../../redux/slices/loadingSlice.js';
import { AiOutlineLoading3Quarters } from "react-icons/ai"


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.loading)

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    role: "student",
  })
  const [imagePreview, setImagePreview] = useState('https://i.pinimg.com/1200x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true))
      const data = new FormData();
      data.append("fullname", formData.fullName);
      data.append("email", formData.email);
      data.append("phoneNumber", formData.phone);
      data.append("password", formData.password);
      data.append("role", formData.role);

      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/user/register", data, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      if (response.data.success === true) {
        toast.success(response.data.message)
        dispatch(setLoading(false))
        navigate("/login")
      }


    } catch (error) {
      dispatch(setLoading(false))
      toast.error(error.response.data.message)
    }
    finally {
      dispatch(setLoading(false))
    }
  }
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      if (imageUrl) {
        setImagePreview(imageUrl)
      }
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          required
        />

        <div className='flex items-center justify-between pr-0 md:pr-10'>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="student"
                checked={formData.role === 'student'}
                onChange={handleChange}
                className="mr-2"
              />
              Student
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="role"
                value="recruiter"
                checked={formData.role === 'recruiter'}
                onChange={handleChange}
                className="mr-2"
              />
              Recruiter
            </label>
          </div>
          <div>
            <label className='flex cursor-pointer' htmlFor="profile">
              <img className='w-15 rounded-full' src={imagePreview} alt="" />
              <input onChange={handleFile} className='hidden' type="file" name="profile" id="profile" />
            </label>
          </div>
        </div>

        {loading ? <button disabled
          type="submit"
          className="cursor-not-allowed flex items-center gap-5 justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          <p>Please wait</p> <AiOutlineLoading3Quarters className='animate-spin' />
        </button> : <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Submit
        </button>}
        <p>Have an account? <Link className='text-blue-500 hover:text-blue-700' to={"/login"}>Login</Link> </p>
      </form>
    </div>
  );
}

export default Signup