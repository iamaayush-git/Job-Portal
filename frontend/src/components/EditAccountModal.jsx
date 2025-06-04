import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmationModal from './ConfirmationModal'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"
import { setUser } from '../../redux/slices/authSlice'
import { setLoading } from "../../redux/slices/loadingSlice"

const EditAccountModal = ({ editProfile, setEditProfile }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth)
  const [inputData, setInputData] = useState({})
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showTempFile, setShowTempFile] = useState({
    photo: "",
    resume: ""
  })


  useEffect(() => {
    setShowTempFile({
      photo: user?.profile.photo,
      resume: user?.profile.resume
    })
    setInputData({
      photo: user?.profile.photo ? user.profile.photo : "",
      bio: user?.profile.bio ? user.profile.bio : "",
      resume: user?.profile.resume ? user.profile.resume : "",
      fullname: user?.fullname ? user.fullname : "",
      email: user?.email ? user.email : "",
      phoneNumber: user?.phoneNumber ? user.phoneNumber : "",
      skills: user?.profile.skills ? user.profile.skills : "",
      role: user?.role ? user.role : ""
    })
  }, [user])

  const handleForm = (e) => {
    const { name, value } = e.target;
    setInputData(prev => ({ ...prev, [name]: value }));
  }
  const handleEditProfile = (e) => {
    e.preventDefault();
    setShowConfirmation(true)
  }
  const handleConfirm = async () => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      formData.append('photo', inputData.photo);
      formData.append('resume', inputData.resume);
      formData.append('fullname', inputData.fullname);
      formData.append('email', inputData.email);
      formData.append('phoneNumber', inputData.phoneNumber);
      formData.append('skills', inputData.skills);
      formData.append('bio', inputData.bio);

      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/user/profile/update", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      })

      if (response.data.success === true) {
        toast.success(response.data.message);
        dispatch(setUser(response.data.user));
        dispatch(setLoading(false))
        setShowConfirmation(false)
        setEditProfile(false)
        navigate("/profile")
      }

    } catch (error) {
      console.log(error)
      dispatch(setLoading(false))
      toast.error(error.response?.data?.message)
    }
  }

  const fileHandler = (e) => {
    const file = e.target.files[0];
    console.log(file)
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setShowTempFile((prev) => ({ ...prev, photo: fileUrl }))
      setInputData((prev) => ({ ...prev, [e.target.name]: file }))
    }
  }

  {
    return editProfile ? (
      <>
        <div className='absolute flex justify-center inset-0 bg-gray-200 bg-opacity-50 rounded-md '>
          <form className='overflow-y-scroll m-h-screen  rounded-md shadow-xl p-5 flex flex-col gap-5 w-[80vw] md:w-[30vw] ' action="">
            <label htmlFor='profile' >
              <img className='w-[10vw] rounded-md mx-auto cursor-pointer' src={showTempFile.photo} alt="img not found" />
              <input onChange={fileHandler} className='hidden' type="file" id='profile' name='photo' accept='image/*' />
            </label>
            <label className='flex flex-col items-left' htmlFor='resume' >
              <p className='font-semibold'>Update resume: </p>
              {inputData.resume && <a className="text-blue-500" target='_blank' href={inputData.resume}>showresume</a>}
              <input onChange={fileHandler} className=' font-light cursor-pointer' type="file" id='resume' name='resume' accept='application/pdf' />
            </label>
            <label className='w-full' htmlFor="name">
              <p className='text-slate-800 font-semibold'>Name:</p>
              <input value={inputData.fullname} onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="text" name="fullname" id="name" />
            </label>
            <label htmlFor="email">
              <p className='text-slate-800 font-semibold'>Email:</p>
              <input value={inputData.email} onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="text" name="email" id="email" />
            </label>
            <label htmlFor="email">
              <p className='text-slate-800 font-semibold'>Bio:</p>
              <textarea onChange={handleForm} className='border w-full outline-none rounded-md p-2' name="bio" id="">
                {inputData.bio}
              </textarea>
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