import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'

const JobList = () => {
  const [jobs, setJobs] = useState(null);


  const fetchAdminJobs = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/get-admin-jobs", { withCredentials: true })
      console.log(response)
      if (response.data.success === true) {
        setJobs(response.data.allAdminJobs)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  const handleDelete = () => {

  }

  useEffect(() => {
    fetchAdminJobs();
  }, [])

  return jobs ? (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Job Listings</h2>
      <div className="space-y-4">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
              <p className="text-sm text-gray-600">Company: {job.companyName}</p>
              <p className="text-sm text-gray-600">Location: {job.location}</p>
              <p className="text-sm text-gray-500">Applicants: {job.applicants}</p>
            </div>

            <div className="mt-3 sm:mt-0 sm:ml-4">
              <button
                onClick={() => handleDelete()}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {jobs.length === 0 && (
          <p className="text-center text-gray-500 text-sm mt-6">No jobs posted yet.</p>
        )}
      </div>
    </div>
  ) : <div>Loading...</div>;
};

export default JobList;

