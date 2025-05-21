import React from 'react'

const JobCard = () => {

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
        <h3 className="text-lg font-semibold text-blue-700">{jobs.company}</h3>
        <span className="text-sm text-gray-500">{jobs.country}</span>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-2">{jobs.title}</h2>

      <p className="text-gray-600 mb-4">{jobs.description}</p>

      <div className="grid grid-cols-3 gap-2">
        <span className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full">
          {jobs.position}
        </span>
        <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">
          {jobs.type}
        </span>
        <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">
          {jobs.salary}
        </span>
      </div>
      <div className='flex items-center justify-center gap-10 mt-5'>
        <button className='border cursor-pointer px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white duration-150 '>Details</button>
        <button className='border cursor-pointer px-3 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-700 duration-150 '>Save for Later</button>
      </div>
    </div>
  )
}

export default JobCard