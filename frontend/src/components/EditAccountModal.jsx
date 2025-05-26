import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const EditAccountModal = () => {
  const { user } = useSelector(state => state.auth)

  console.log(user)
  const [inputData, setInputData] = useState({
    photo: user?.profile.photo ? user.profile.photo : "",
    name: user?.fullname ? user.fullname : "",
    email: user?.email ? user.email : "",
    phone: user?.phoneNumber ? user.phoneNumber : "",
    skills: user?.profile.skills ? user.profile.skills : "",
    role: user?.profile.role ? user.profile.role : ""
  })

  const handleForm = (e) => {
    setInputData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  console.log(inputData)


  return (
    <div>
      <h2 className='text-blue-500 font-semibold text-2xl'>Edit Account</h2>
      <form className='border rounded-md shadow-xl p-5 flex flex-col gap-5 w-[28vw]' action="">
        <div>
          <img src="" alt="" />
          <input className='hidden' type="file" id='profile' />
        </div>
        <label className='w-full' htmlFor="name">
          <p className='text-slate-800 font-semibold'>Name:</p>
          <input value={inputData.name} onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="text" name="name" id="name" />
        </label>
        <label htmlFor="email">
          <p className='text-slate-800 font-semibold'>Email:</p>
          <input value={inputData.email} onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="text" name="email" id="email" />
        </label>
        <label htmlFor="Phone">
          <p className='text-slate-800 font-semibold'>Phone:</p>
          <input value={inputData.phone} onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="number" name="phone" id="Phone" placeholder='98000000' />
        </label>
        <label htmlFor="skills">
          <p className='text-slate-800 font-semibold'>Skills:</p>
          <input value={inputData.skills} placeholder='Frontend, Backend, UI/UX' onChange={handleForm} className='w-full border outline-none rounded-md p-2' type="text" name="skills" id="skills" />
        </label>

        <select onChange={handleForm} className='border w-full p-2 rounded-md' value={inputData.role} name="" id="">
          <option value="student">Student</option>
          <option value="recruiter">Recruiter</option>
        </select>

        <button className='bg-blue-500 text-white cursor-pointer px-3 py-2 rounded-md border-none hover:bg-blue-700 duration-100' >Edit Profile</button>


      </form>
    </div>

  )
}

export default EditAccountModal