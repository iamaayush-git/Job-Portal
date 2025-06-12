import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi'; // Icon for menu

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Register Company', to: '/dashboard/register-company' },
    { name: 'Company List', to: '/dashboard/company-list' },
    { name: 'Job List', to: '/dashboard/job-list' }
  ];

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden ">
        <button onClick={() => setIsOpen(!isOpen)}>
          <FiMenu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <div className={`text-gray-800 bg-white md:w-64 w-full md:block ${isOpen ? 'block' : 'hidden'} md:relative fixed z-50`}>
        <div className="p-4 space-y-4">
          <h2 className="text-xl font-semibold mb-6 hidden md:block">Admin Dashboard</h2>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2 rounded hover:bg-gray-100 transition"
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
