import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const RegisterCompany = () => {
  const [companyName, setCompanyName] = useState("")

  const handleCompanyRegister = async () => {
    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/company/register", { companyName }, { withCredentials: true })
      if (response.data.success === true) {
        toast.success(response.data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Register company here
      </label>
      <input
        onChange={(e) => setCompanyName(e.target.value)}
        type="text"
        placeholder='Enter new company here'
        className="mt-3 outline-none w-full border border-gray-300 px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button onClick={handleCompanyRegister} className='p-2 bg-blue-500 text-white rounded-md mt-5 hover:bg-blue-700 cursor-pointer' >Register Company</button>
    </div>
  );
};

export default RegisterCompany;
