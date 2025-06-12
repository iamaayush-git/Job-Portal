import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify'
import ConfirmationModal from '../../admin/components/ConfirmationModel';
import { setLoading } from '../../../redux/slices/loadingSlice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const JobList = () => {
  const dispatch = useDispatch();
  const [jobs, setJobs] = useState(null);
  const [showConfirmationModel, setShowConfirmationModel] = useState(false);
  const [jobId, setJobId] = useState(null);

  // Fetch all admin jobs
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

  const handleDelete = (jobId) => {
    setShowConfirmationModel(true);
    setJobId(jobId);
  }
  // for confirmation model
  const onCancel = () => {
    setShowConfirmationModel(false);
  }

  const onConfirm = async () => {
    try {
      dispatch(setLoading(true));
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/job/delete-job/" + jobId, { withCredentials: true });
      if (response.data.success === true) {
        toast.success(response.data.message);
        setShowConfirmationModel(false);
        fetchAdminJobs();
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    fetchAdminJobs();
  }, [])

  return jobs ? (
    <div className="max-w-4xl mx-auto px-4">
      <ConfirmationModal isOpen={showConfirmationModel} title={"Confirm Delete?"} message={"Are you sure want to delete this Job?"} onCancel={onCancel} onConfirm={onConfirm} />
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Job Listings</h2>
      <div className="space-y-4">
        {jobs.map((job, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-white p-4 rounded-lg shadow hover:shadow-md transition"
          >
            <div className="flex-1 space-y-1">
              <h3 className="text-lg font-semibold text-gray-800">{job.title}</h3>
              <p className="text-sm text-gray-600">Company: {job.company.name}</p>
              <p className="text-sm text-gray-600">Company: Rs.{job.salary}</p>
              <p className="text-sm text-gray-600">Location: {job.location}</p>
              <Link to={'/dashboard/applicants/' + job?._id}>
                <div className='relative group cursor-pointer'>
                  <p className="text-sm text-gray-500">
                    Applicants: {job.applications?.length || 0}
                  </p>

                  <div className="absolute left-0 mt-1 opacity-0 w-max rounded bg-gray-700 px-3 py-1 text-sm text-white transition-opacity duration-200 group-hover:block group-hover:opacity-100">
                    Show applicants
                  </div>
                </div>
              </Link>
            </div>

            <div className="mt-3 sm:mt-0 sm:ml-4">
              <button
                onClick={() => handleDelete(job._id)}
                className="cursor-pointer px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
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

