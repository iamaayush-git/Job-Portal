import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaCheckCircle, FaLiraSign, FaTimesCircle } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setLoading } from '../../../redux/slices/loadingSlice';
import { useParams } from 'react-router-dom';


const statusOptions = ['Pending', 'Accepted', 'Rejected'];



const Applicants = () => {
  const [applicants, setApplicants] = useState(null)
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.loading)

  const getApplicant = async () => {
    dispatch(setLoading(true))
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/application/get-applicants/" + id, { withCredentials: true })
      console.log(response)
      if (response.data.success === true) {
        setApplicants(response.data.applicants)
      }
      dispatch(setLoading(false))
    } catch (error) {
      dispatch(setLoading(false))
      console.log(error)
      toast.error(error?.response?.data?.message)
    }

  }
  const handleStatusChange = async (e, applicationId) => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/application/update-status/" + applicationId, { status: e.target.value }, { withCredentials: true })
      if (response.data.success === true) {
        toast.success(response.data.message)
        getApplicant();
      }
    } catch (error) {
      console.log(error)
      toast.error(error?.response?.data?.message)
    }
    console.log(e.target.value)
  }

  console.log(applicants)


  useEffect(() => {
    getApplicant();
  }, [])



  return !loading ? (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Job Applicants</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-6 py-3">Name</th>
              <th className="text-left px-6 py-3">Email</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Indicator</th>
            </tr>
          </thead>
          <tbody>
            {applicants?.length > 0 ? applicants?.map((applicant) => (
              <tr key={applicant._id} className="border-t hover:bg-gray-50 transition">
                <td className="px-6 py-4">{applicant.applicant.fullname}</td>
                <td className="px-6 py-4">{applicant.applicant.email}</td>
                <td className="px-6 py-4">
                  <select
                    className="border px-3 py-1 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={applicant.status}
                    onChange={(e) => handleStatusChange(e, applicant?._id)}
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status.toLowerCase()}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">
                  {applicant.status === 'accepted' && (
                    <FaCheckCircle className="text-green-500 text-xl" />
                  )}
                  {applicant.status === 'rejected' && (
                    <FaTimesCircle className="text-red-500 text-xl" />
                  )}
                  {applicant.status === 'pending' && (
                    <span className="text-gray-400 text-lg">—</span>
                  )}
                </td>
              </tr>
            )) : <tr><td className='text-sm font-semibold text-red-500'>No data found</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  ) : (<div>Loading...</div>)
}
export default Applicants