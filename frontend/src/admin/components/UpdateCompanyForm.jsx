import React, { useState } from 'react';
import ConfirmationModal from './ConfirmationModel';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from "react-redux"
import { setLoading } from "../../../redux/slices/loadingSlice.js"

const UpdateCompanyForm = ({ company, setUpdateForm }) => {
  const dispatch = useDispatch();

  const [showConfirmationModel, setShowConfirmationModel] = useState(false)
  const [preview, setPreview] = useState(company.logo)

  const [formValue, setFormValue] = useState({
    name: company.name,
    description: company.description,
    website: company.website,
    location: company.location,
    logo: "",
  });


  const handleChange = (e) => {
    console.log(formValue)
    setFormValue(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleImageChange = (e) => {
    if (e.target.files) {
      setFormValue(prev => ({ ...prev, logo: e.target.files[0] }))
      setPreview(URL.createObjectURL(e.target.files[0]))
    }
  }

  // for update form
  const onClose = () => {
    setFormValue({
      name: company.name,
      website: company.website,
      location: company.location,
      description: company.description,
      logo: company.logo || '#',
    })
    setPreview(company.logo)
    setUpdateForm(false)
  }

  const onUpdate = () => {
    setShowConfirmationModel(true)
  }

  // for confirmation model
  const onConfirm = async () => {
    dispatch(setLoading(true))
    const formData = new FormData();
    formData.append("name", formValue.name || "")
    formData.append("description", formValue.description || "")
    formData.append("website", formValue.website || "")
    formData.append("location", formValue.location || "")
    formData.append("logo", formValue.logo || "")

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/company/update-company/" + company._id, formData, { withCredentials: true })
      if (response.data.success === true) {
        toast.success(response.data.message)
        dispatch(setLoading(false))
        setShowConfirmationModel(false)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response.data.message)
      dispatch(setLoading(false))
    }
  }
  const onCancel = () => {
    setShowConfirmationModel(false)
  }




  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <ConfirmationModal message={"Are you sure you want to update this company?"} title={"Confirm update?"} isOpen={showConfirmationModel} onCancel={onCancel} onConfirm={onConfirm} />
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Update Company</h2>
        <form className="space-y-4">
          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input
              type="text"
              name="name"
              placeholder='Enter name'
              value={formValue.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {/* description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea placeholder='Enter description' onChange={handleChange} className='w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500' name="description" id="" value={formValue.description}></textarea>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <input
              placeholder='Enter website link'
              type="text"
              name="website"
              value={formValue.website}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <input
              placeholder='Enter location'
              type="text"
              name="location"
              value={formValue.location}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Logo Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Logo Image</label>
            {preview && (
              <img
                src={preview}
                alt="Logo Preview"
                className="w-16 h-16 object-cover rounded mb-2 border border-gray-300"
              />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
                         file:rounded file:border-0 file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              onClick={onUpdate}
              type="button"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCompanyForm;
