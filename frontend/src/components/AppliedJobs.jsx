import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify"
import axios from 'axios'

const AppliedJobs = () => {
  const [appliedJobs, setAppliedJobs] = useState([])

  const getAppliedJobs = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/application/get-applied-jobs", {
        withCredentials: true
      })

      if (response.data.success === true) {
        setAppliedJobs(response.data.appliedJobs)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  useEffect(() => {
    getAppliedJobs();
  }, [])


  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-200 bg-white shadow-sm rounded-md">
        <thead className="bg-gray-100 text-gray-700 text-sm">
          <tr>
            <th className="text-left px-4 py-2 border-b">Title</th>
            <th className="text-left px-4 py-2 border-b">Company</th>
            <th className="text-left px-4 py-2 border-b">Location</th>
            <th className="text-left px-4 py-2 border-b">Job Type</th>
            <th className="text-left px-4 py-2 border-b">Status</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-800">
          {appliedJobs.length > 0 ? appliedJobs.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 transition">
              <td className="px-4 py-2 border-b">{item.job.title}</td>
              <td className="px-4 py-2 border-b">{item.job.company.name}</td>
              <td className="px-4 py-2 border-b">{item.job.location}</td>
              <td className="px-4 py-2 border-b">{item.job.jobType}</td>
              <td className="px-4 py-2 border-b">{item.status}</td>
            </tr>
          )) : <tr><td className='text-red-500 p-5'>No applied jobs found</td></tr>}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedJobs;
