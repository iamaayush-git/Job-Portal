import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingSlice';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const AddJobs = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const id = useParams().id;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    salary: '',
    location: '',
    jobType: '',
    position: '',
    requirements: '',
    experienceLevel: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/job/post-job/${id}`, formData, {
        withCredentials: true,
      });
      if (response.data.success === true) {
        toast.success(response.data.message);
        setFormData({
          title: '',
          description: '',
          salary: '',
          location: '',
          jobType: '',
          position: '',
          requirements: '',
          experienceLevel: '',
        });
      }
      dispatch(setLoading(false));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data.message || 'An error occurred while posting the job.');
      dispatch(setLoading(false));
    }
  };


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {[
          { label: 'Title', name: 'title' },
          { label: 'Description', name: 'description', type: 'textarea' },
          { label: 'Salary', name: 'salary' },
          { label: 'Location', name: 'location' },
          { label: 'Job Type', name: 'jobType' },
          { label: 'Position', name: 'position' },
          { label: 'Requirements', name: 'requirements', type: 'textarea' },
          { label: 'Experience Level', name: 'experienceLevel' },
        ].map((field) => (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            {field.type === 'textarea' ? (
              <textarea
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                rows={3}
              />
            ) : (
              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            )}
            {field.name === 'position' && (
              <p className="text-xs text-gray-500 mt-1">
                Enter a number (e.g., 1 for Junior, 2 for Mid-level, etc.)
              </p>
            )}
            {field.name === 'experienceLevel' && (
              <p className="text-xs text-gray-500 mt-1">
                Enter a number (e.g., 1 for Entry-level, 2 for Mid-level, etc.)
              </p>
            )}
            {field.name === 'jobType' && (
              <p className="text-xs text-gray-500 mt-1">Enter a job type (e.g Technical, Health Care, Accountant etc. ) </p>)}
            {
              field.name === 'salary' && (
                <p className="text-xs text-gray-500 mt-1">Enter a monthly salary (e.g 50000, 60000 etc.)</p>)
            }
            {field.name === 'requirements' && (
              <p className="text-xs text-gray-500 mt-1">Enter a requirement (e.g HTML, CSS, React Js) </p>)}
          </div>
        ))}
        {
          loading ? <button
            disabled
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Please wait <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
          </button> : <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Job
          </button>
        }

      </form>
    </div>
  );
};

export default AddJobs;
