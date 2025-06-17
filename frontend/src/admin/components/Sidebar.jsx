import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import { ImCross } from "react-icons/im";

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
      <div className={` absolute -left-100 text-gray-800 bg-white md:w-64 w-full ${isOpen ? 'left-0' : '-left-100'} transition-all duration-500 md:relative md:left-0 md:p-8 fixed z-50`}>
        {
          isOpen && <div onClick={() => setIsOpen(false)} className='pt-2 pr-5'><ImCross size={20} className='ml-auto' /></div>
        }
        <div className="pb-4">
          <h2 className="text-xl font-semibold mb-6 hidden md:block">Admin Dashboard</h2>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="block px-4 py-2 rounded hover:bg-gray-100 transition"
              onClick={() => setIsOpen(false)}
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
