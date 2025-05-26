// src/components/ProfilePage.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import AppliedJobs from '../components/AppliedJobs';
import EditAccountModal from '../components/EditAccountModal';

const Profile = () => {
  const skills = ["Frontend", "backend", "Fullstack", "Mernstack"]


  const { user } = useSelector(state => state.auth);

  return (
    <div className=" min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="mx-auto bg-white shadow-lg rounded-lg w-[50vw] p-6 sm:p-8">
        <div className="flex flex-col items-center">
          <img
            src={user?.profile.photo}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-4 border-blue-500 shadow mb-4"
          />
          <h2 className="text-xl font-semibold text-gray-800">{user?.fullname ? user?.fullname : "please add your fullname"}</h2>
          <p className="text-gray-500">{user?.email ? user.email : "please add your email"}</p>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-gray-600 font-medium">Phone:</label>
            <p className="text-gray-800">{user?.phoneNumber ? user.phoneNumber : "please add your phone number"}</p>
          </div>

          <div>
            <label className="text-gray-600 font-medium">Role:</label>
            <p className="text-gray-800">{user?.role ? user.role : "please add your role"}</p>
          </div>

          <div>
            <label className="text-gray-600 font-medium">About:</label>
            <p className="text-gray-700">{user?.about ? user.about : "please add your details."}</p>
          </div>
          <div>
            <p className='text-gray-600 font-medium'>Skills:</p>
            <div className='flex flex-wrap items-center gap-3'>
              {skills.length > 0 ? skills.map((item, index) => {
                return <div key={index} className='p-1 rounded-md text-slate-700 border'>{item}</div>
              }) : "please add skills"}
            </div>
          </div>
          <div>
            <p className='text-gray-600 font-medium'>Resume: </p>
            <p className='text-gray-700'>{user?.resume ? user.resume : "please add your resume"}</p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <button className="cursor-pointer bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
        <div className='mt-10'>
          <p className='text-xl font-semibold text-slate-700 mb-5'>Applied Jobs</p>
          <AppliedJobs />
        </div>
        <EditAccountModal />
      </div>
    </div>
  );
};

export default Profile;
