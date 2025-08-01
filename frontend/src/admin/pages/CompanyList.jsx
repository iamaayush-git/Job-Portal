import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UpdateCompanyForm from '../components/UpdateCompanyForm';
import ConfirmationModal from '../components/ConfirmationModel';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../../redux/slices/loadingSlice';
import { useNavigate } from 'react-router-dom';

const CompanyList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [updateCompany, setUpdateCompany] = useState(null)
  const [updateForm, setUpdateForm] = useState(false)
  const [showConfirmationModel, setShowConfirmationModel] = useState(false)
  const [companyId, setCompanyId] = useState(null)

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
  const updateHandler = (e, updateCompany) => {
    e.stopPropagation()
    setUpdateForm(true)
    setUpdateCompany(updateCompany)
  }


  const deleteHandler = (e, id) => {
    e.stopPropagation();
    setShowConfirmationModel(true)
    setCompanyId(id)
  }

  // for confirmation model
  const onConfirm = async () => {
    try {
      dispatch(setLoading(true))
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/company/delete-company/" + companyId, { withCredentials: true })
      if (response.data.success === true) {
        toast.success(response.data.message)
        setShowConfirmationModel(false)
        getCompany()
      }
      dispatch(setLoading(false))


    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      dispatch(setLoading(false))
    }


  }
  const onCancel = () => {
    setShowConfirmationModel(false)
  }

  const handleAddJobs = (id) => {
    navigate("/dashboard/add-job/" + id)

  }

  useEffect(() => {
    getCompany();
  }, [])


  return company ? (
    <div className="max-w-6xl mx-auto px-4">
      <ConfirmationModal title={"Confirm Delete?"} message={"Are you sure you want to update this company?"} isOpen={showConfirmationModel} onConfirm={onConfirm} onCancel={onCancel} />
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
          <tbody className=''>
            {company.map((company, index) => (
              <tr onClick={() => handleAddJobs(company._id)} key={index} className="cursor-pointer border-t border-gray-200 hover:bg-gray-50 group relative ">

                <td className="py-3 px-4 group relative">
                  <img
                    src={company.logo || "#"}
                    alt={`${company.name} logo`}
                    className="h-10 w-10 object-contain rounded"
                  />

                  {/* hover message */}
                  <span className="bg-slate-400 absolute -top-5 text-center py-1 rounded-md text-nowrap left-12 text-sm text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-20">
                    Add Job
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-800 font-medium">{company.name}</td>
                <td className="py-3 px-4">
                  {company?.website ? <a className='text-blue-500 underline' href={company.website} target="_blank" rel="noopener noreferrer">
                    {company?.website?.length > 30
                      ? company.website.slice(0, 30) + "..."
                      : company.website}
                  </a> : <p className='text-slate-500'>Add your website here..</p>}
                </td>
                <td className="py-3 px-4 text-gray-700">{company.location ? company.location : <p className='text-slate-500' >Add company location</p>}</td>
                <td className="py-3 px-4 flex items-center justify-center gap-5">
                  <button
                    onClick={(e) => deleteHandler(e, company._id)}
                    className="cursor-pointer px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={(e) => updateHandler(e, company)}
                    className="cursor-pointer px-3 py-1 text-sm bg-blue-600 text-white rounded hover:blue-red-700 transition"
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
      {updateForm && <UpdateCompanyForm company={updateCompany} setUpdateForm={setUpdateForm} />}
    </div>
  ) : <div>Loading...</div>;
};

export default CompanyList;
