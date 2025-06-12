import React, { useEffect, useState } from 'react';
import axios from "axios"
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { setSavedJobs } from '../../redux/slices/jobsSlice.js';

const JobDetails = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  console.log(user)
  const { savedJobs } = useSelector(state => state.job)

  const [hasApplied, setHasApplied] = useState(false);

  const { id } = useParams();

  const [job, setJob] = useState();

  const getJob = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/get-job/" + id, {
        withCredentials: true
      })
      if (response.data.success === true) {
        setJob(response.data.job)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    getJob();
  }, [id])



  const handleAlreadyAppliedButton = () => {
    toast.error("Job already applied")
  }

  const handleRecruiterApply = () => {
    toast.error("Your current role does not permit job applications for this position.")
  }

  const handleJobApply = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/application/apply/" + id, {
        withCredentials: true
      });
      if (response.data.success === true) {
        setHasApplied(true)
        toast.success(response.data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const handleSaveJob = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/save-job/" + id, {
        withCredentials: true
      })
      console.log(response)
      if (response.data.success === true) {
        dispatch(setSavedJobs(response.data.savedJobs))
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const handleRemoveJob = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/remove-saved-job/" + id, {
        withCredentials: true
      })
      if (response.data.success === true) {
        dispatch(setSavedJobs(response.data.savedJobs))
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }


  return job ? (
    <div className="min-h-full max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <div className="mb-4 border-b pb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">{job?.title}</h1>
        <div className=''>
          {job?.company?.logo.length > 0 && <img className='w-45 h-45 py-5' src={job?.company?.logo} alt="" />}
          <p className="text-sm text-gray-500 mt-1">{job?.company?.name} • {job?.location}</p>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        <div>
          <h2 className="font-semibold text-gray-900">Job Type</h2>
          <p>{job?.jobType}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Salary</h2>
          <p>{job?.salary}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Requirements</h2>
          <div className='flex flex-wrap items-center gap-2'>{job?.requirements && job?.requirements.map((item, index) => <div className='px-3 py-2 bg-gray-300 text-sm rounded-md' key={index}> {item}  </div>)}</div>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Experience</h2>
          <p>{job?.experienceLevel} yrs</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Total Applications</h2>
          <p>{job?.applications.length}</p>
        </div>
        <div>
          <h2 className="font-semibold text-gray-900">Posted</h2>
          <p>{job?.createdAt.split("T")[0]}</p>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">Job Description</h2>
        <p className="text-gray-700 leading-relaxed">{job?.description}</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3">

        {
          user?.role === "recruiter" ? <button onClick={handleRecruiterApply} className="cursor-pointer w-full sm:w-auto bg-gray-600 text-white font-medium py-2 px-6 rounded transition">
            Apply Now
          </button> : job?.applications.some((item) => item?.applicant === user?._id) || hasApplied
            ? <button onClick={handleAlreadyAppliedButton} className="cursor-pointer w-full sm:w-auto bg-gray-600 text-white font-medium py-2 px-6 rounded transition">
              Apply Now
            </button> : <button onClick={handleJobApply} className="cursor-pointer w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition">
              Apply Now
            </button>
        }
        {
          savedJobs.some(job => job?._id == id) ? <button onClick={handleRemoveJob} className="cursor-pointer w-full sm:w-auto bg-gray-100  hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded transition">
            Remove Job
          </button> : <button onClick={handleSaveJob} className="cursor-pointer w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-6 rounded transition">
            Save Job
          </button>
        }

      </div>
    </div>
  ) : (<div className='gap-5 text-2xl font-medium flex items-center justify-center h-screen ' > Loading <AiOutlineLoading3Quarters size={50} className='animate-spin' />  </div>);
};

export default JobDetails;
