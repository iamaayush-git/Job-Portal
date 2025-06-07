import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UpdateCompanyForm from '../components/UpdateCompanyForm';

const CompanyList = () => {
  const [company, setCompany] = useState(null);
  const [updateForm, setUpdateForm] = useState(false)

  const getCompany = async () => {
    try {
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/company/get-all-company", { withCredentials: true })
      if (response.data.success === true) {
        setCompany(response.data.allCompanies)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  const updateHandler = () => {
    setUpdateForm(true)
  }


  const deleteHandler = () => {

  }

  useEffect(() => {
    getCompany();
  }, [])


  return company ? (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Companies</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Logo</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Company Name</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Website</th>
              <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Location</th>
              <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {company.map((company, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <img
                    src={company.logo || "#"}
                    alt={`${company.name} logo`}
                    className="h-10 w-10 object-contain rounded"
                  />
                </td>
                <td className="py-3 px-4 text-gray-800 font-medium">{company.name || "add company name"}</td>
                <td className="py-3 px-4 text-blue-600 underline">
                  <a href={company.website} target="_blank" rel="noopener noreferrer">
                    {company.website || "Add company website"}
                  </a>
                </td>
                <td className="py-3 px-4 text-gray-700">{company.location || "Enter company location"}</td>
                <td className="py-3 px-4 flex items-center justify-center gap-5">
                  <button
                    onClick={() => deleteHandler(company.id)}
                    className="cursor-pointer px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => updateHandler()}
                    className="cursor-pointer px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}

            {company.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center text-gray-500 py-6">
                  No companies available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {updateForm && <UpdateCompanyForm setUpdateForm={setUpdateForm} />}
    </div>
  ) : <div>Loading...</div>;
};

export default CompanyList;
