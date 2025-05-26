import React from 'react'

const JobCard = ({ company, location, title, description, position, jobType, salary }) => {

  const jobs = {
    company: "TechFusion Inc.",
    country: "Nepal",
    title: "Frontend Developer",
    description: "We are looking for a talented frontend developer proficient in React.js and Tailwind CSS.",
    position: "Mid-Level",
    type: "Full-Time",
    salary: "Rs.120000"

  }

  return (
    <div className="w-[full] md:w-[26vw] mx-auto bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
      <div className="mb-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-700">{company}</h3>
        <span className="text-sm text-gray-500">{location}</span>
      </div>

      <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-2">{title}</h2>

      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="grid grid-cols-3 gap-2">
        <span className="flex items-center justify-center px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {position}
        </span>
        <span className="flex items-center justify-center px-2 py-1 text-sm bg-green-100 text-green-800 rounded-full">
          {jobType}
        </span>
        <span className="flex items-center justify-center px-2 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
          {salary}
        </span>
      </div>
      <div className='flex items-center justify-center gap-10 mt-5'>
        <button className='border cursor-pointer px-2 py-1 md:px-3 md:py-2 rounded-md hover:bg-blue-500 hover:text-white duration-150 '>Details</button>
        <button className='border cursor-pointer px-2 py-1 md:px-3 md:py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 duration-150 '>Save for Later</button>
      </div>
    </div>
  )
}

export default JobCard