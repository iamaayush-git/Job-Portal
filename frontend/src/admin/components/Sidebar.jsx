import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'; // Icon for menu

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Add Job', to: '/dashboard/add-job' },
    { name: 'Job List', to: '/dashboard/jobs' },
    { name: 'Register Company', to: '/dashboard/register-company' },
    { name: 'Manage Users', to: '/dashboard/users' },
    { name: 'Reports', to: '/dashboard/reports' },
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between bg-gray-800 text-white p-4">
        <h1 className="text-lg font-bold">Job Portal</h1>
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`bg-gray-800 text-white md:w-64 w-full md:block ${isOpen ? 'block' : 'hidden'} md:relative fixed z-50`}>
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold mb-6 hidden md:block">Admin Dashboard</h2>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2 rounded hover:bg-gray-700 transition"
              onClick={() => setIsOpen(false)} // Auto close on mobile
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
