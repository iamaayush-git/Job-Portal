import axios from 'axios';
import React, { useState } from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { setLoading } from '../../redux/slices/loadingSlice';
import { setUser } from "../../redux/slices/authSlice"

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.loading);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });


  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true))
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/user/login", formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success === true) {
        toast.success(response.data.message);
        dispatch(setLoading(false))
        dispatch(setUser(response.data.user))
        navigate('/')
      }

    } catch (error) {
      dispatch(setLoading(false))
      toast.error(error.response.data.message);
    }
    finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
          required
        />

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
        {
          loading ? <button disabled
            type="submit"
            className="cursor-not-allowed flex items-center gap-5 justify-center w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            <p>Please wait</p> <AiOutlineLoading3Quarters className='animate-spin' />
          </button> : <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit
          </button>
        }


        <p>Have an account? <Link className='text-blue-500 hover:text-blue-700' to={"/signup"}>Signup</Link> </p>
      </form>
    </div>
  )
}

export default Login