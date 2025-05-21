// src/components/JobCard.jsx
import React from 'react';

const LatestJobCard = ({
  company = "TechFusion Inc.",
  country = "Nepal",
  title = "Frontend Developer",
  description = "We are looking for a talented frontend developer proficient in React.js and Tailwind CSS.",
  position = "Mid-Level",
  type = "Full-Time",
  salary = "$1200/month"
}) => {
  return (
    <div className="w-[80vw] md:w-[29vw] mx-auto bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-700">{company}</h3>
        <span className="text-sm text-gray-500">{country}</span>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>

      <p className="text-gray-600 mb-4">{description}</p>

      <div className="flex flex-wrap gap-2">
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {position}
        </span>
        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
          {type}
        </span>
        <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
          {salary}
        </span>
      </div>
    </div>
  );
};

export default LatestJobCard;
