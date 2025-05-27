import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ConfirmationModal from './ConfirmationModal'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const EditAccountModal = ({ editProfile, setEditProfile }) => {
  const navigate = useNavigate();

  const { user } = useSelector(state => state.auth)
  const [inputData, setInputData] = useState({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showTempPhoto, setShowTempPhoto] = useState("")


  useEffect(() => {
    setShowTempPhoto(user?.profile.photo)
    setInputData({
      photo: user?.profile.photo ? user.profile.photo : "",
      fullname: user?.fullname ? user.fullname : "",
      email: user?.email ? user.email : "",
      phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
      skills: user?.profile.skills ? user.profile.skills : "",
      role: user?.profile.role ? user.profile.role : ""
    })
  }, [user])

  const handleForm = (e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }
  const handleEditProfile = (e) => {
    e.preventDefault();
    setShowConfirmation(true)
  }
  const handleConfirm = async (e) => {
    try {
      const formData = new FormData();
      formData.append('photo', inputData.photo);
      formData.append('fullname', inputData.fullname);
      formData.append('email', inputData.email);
      formData.append('phoneNumber', inputData.phoneNumber);
      formData.append('skills', inputData.skills);

      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/user/profile/update", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (response.data.success === true) {
        toast.success(response.data.message);
        setShowConfirmation(false)
        setEditProfile(false)
        navigate("/profile")
      }

    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.message)
    }
  }

  const photoHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const photoUrl = URL.createObjectURL(file);
      setShowTempPhoto(photoUrl)
      setInputData((prev) => ({ ...prev, photo: file }))
    }
  }

  {
    return editProfile ? (
      <>
        <div>
          <div className='absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50  z-50'>
            <div className=''>
              <h2 className='text-blue-500 font-semibold text-2xl'>Edit Account</h2>
              <form className='border rounded-md shadow-xl p-5 flex flex-col gap-5 w-[28vw]' action="">
                <label htmlFor='profile' >
                  <img className='w-20 rounded-md mx-auto cursor-pointer' src={showTempPhoto} alt="img not found" />
                  <input onChange={photoHandler} className='hidden' type="file" id='profile' />
                </label>
                <label className='w-full' htmlFor="name">
                  <p className='text-slate-800 font-semibold'>Name:</p>
                  <input value={inputData.fullname} onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="text" name="fullname" id="name" />
                </label>
                <label htmlFor="email">
                  <p className='text-slate-800 font-semibold'>Email:</p>
                  <input value={inputData.email} onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="text" name="email" id="email" />
                </label>
                <label htmlFor="Phone">
                  <p className='text-slate-800 font-semibold'>Phone:</p>
                  <input value={inputData.phoneNumber} onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="number" name="phoneNumber" id="Phone" placeholder='98000000' />
                </label>
                <label htmlFor="skills">
                  <p className='text-slate-800 font-semibold'>Skills:</p>
                  <input value={inputData.skills} placeholder='Frontend, Backend, UI/UX' onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="text" name="skills" id="skills" />
                </label>

                <select disabled onChange={handleForm} className='cursor-not-allowed border w-full p-2 rounded-md' value={inputData.role} name="" id="">
                  <option value="student">Student</option>
                  <option value="recruiter">Recruiter</option>
                </select>

                <div className='flex items-center justify-center gap-10'>
                  <button onClick={handleEditProfile} type='button' className='bg-blue-500 text-white cursor-pointer px-3 py-2 rounded-md border-none hover:bg-blue-700 duration-100' >Save</button>
                  <button onClick={() => setEditProfile(prev => !prev)} type='button' className='bg-blue-500 text-white cursor-pointer px-3 py-2 rounded-md border-none hover:bg-blue-700 duration-100' >Cancel</button>
                </div>
              </form>
            </div>
          </div>
          <ConfirmationModal
            title="Are you sure want to update profile?"
            message="This action cannot be undone."
            onCancel={() => setShowConfirmation(false)}
            onConfirm={handleConfirm}
            showConfirmation={showConfirmation} />
        </div>
      </>
    ) : null;
  }


}

export default EditAccountModal