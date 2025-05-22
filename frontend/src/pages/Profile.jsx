// src/components/ProfilePage.jsx
import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
  // const user = {
  //   name: 'John Doe',
  //   email: 'johndoe@example.com',
  //   phone: '+977-9876543210',
  //   country: 'Nepal',
  //   about: 'Passionate web developer with expertise in React.js and Node.js. Always eager to learn new technologies.',
  //   image: 'https://via.placeholder.com/150', // Replace with actual image URL or local asset
  // };

  const { user } = useSelector(state => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 flex justify-center">
      <div className="bg-white shadow-lg rounded-lg max-w-md w-full p-6 sm:p-8">
        <div className="flex flex-col items-center">
          <img
            src={"https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg"}
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
        </div>

        <div className="mt-6 text-center">
          <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
