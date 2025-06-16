import axios from 'axios'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSavedJobs } from '../../redux/slices/jobsSlice'
import { toast } from 'react-toastify'

const JobCard = ({ _id, company, location, title, description, position, jobType, salary }) => {
  const dispatch = useDispatch()
  const { savedJobs } = useSelector(state => state.job)
  const navigate = useNavigate()

  const handleSave = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/save-job/" + _id, {
        withCredentials: true
      })

      if (response.data.success === true) {
        dispatch(setSavedJobs(response.data.savedJobs))
        toast.success(response.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const handleRemoveSave = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/remove-saved-job/" + _id, {
        withCredentials: true
      })
      console.log(response)
      if (response.data.success === true) {
        dispatch(setSavedJobs(response.data.savedJobs))
        toast.success(response.data.success)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }


  return (
    <div className="w-[full] md:w-[26vw] mx-auto bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-700">{company}</h3>
        <span className="text-sm text-gray-500">{location}</span>
      </div>

      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{title}</h2>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="grid grid-cols-3 gap-2">
        <span className="flex items-center justify-center px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          level {position}
        </span>
        <span className="flex items-center justify-center px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
          {jobType}
        </span>
        <span className="flex items-center justify-center px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
          Rs.{salary}
        </span>
      </div>
      <div className='flex items-center justify-center gap-10 mt-5'>
        <button onClick={() => navigate(`/job-details/${_id}`)} className='border cursor-pointer px-2 py-1 md:px-3 md:py-2 rounded-md hover:bg-blue-500 hover:text-white duration-150 '>Details</button>
        {
          savedJobs.some(job => job._id === _id) ? <button onClick={() => handleRemoveSave()} className='border cursor-pointer px-2 py-1 md:px-3 md:py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 duration-150 '>Remove from save</button> : <button onClick={() => handleSave()} className='border cursor-pointer px-2 py-1 md:px-3 md:py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 duration-150 '>Save for Later</button>
        }
      </div>
    </div>
  )
}

export default JobCard