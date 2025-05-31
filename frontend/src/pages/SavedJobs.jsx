import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSavedJobs } from '../../redux/slices/jobsSlice';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';

const SavedJobs = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { savedJobs } = useSelector(state => state.job);

  const handleRemove = async (e, id) => {
    e.stopPropagation()
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/remove-saved-job/" + id, {
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
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Saved Jobs</h2>
      {savedJobs.length === 0 ? (
        <p className="text-gray-500">No saved jobs.</p>
      ) : (
        <ul className="space-y-4">
          {savedJobs.map((job, index) => (
            <li onClick={() => navigate('/job-details/' + job._id)}
              key={index}
              className="bg-white shadow-md rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div>
                <div className=' flex items-center gap-5' >
                  <p className="text-gray-600">{job.company.name}</p>
                  <h3 className="text-md text-nowrap md:text-lg font-semibold">{job.title}</h3>
                </div>
                <p className="text-gray-600">{job.description}</p>
              </div>
              <div className="flex items-center gap-5 ">
                <button
                  onClick={(e) => handleRemove(e, job._id)}
                  className="cursor-pointer mt-2 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedJobs;
