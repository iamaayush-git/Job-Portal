import React, { useState } from 'react'
import JobCard from '../components/JobCard'

const Jobs = () => {
  const jobs = [1, 2, 2, 2, 2, 2, 2, 2, 2];
  const jobFilter = [
    {
      name: "Location",
      items: ["Kathmandu", "Bhaktapur", "Lalitpur", "Belbari"],
    },
    {
      name: "Industries",
      items: ["Frontend", "Backend", "Fullstack", "UI/Ux"]
    },
    {
      name: "Salary",
      items: ["0-40k", "40-80k", "80-150k", "150-200k"]
    }
  ]

  const [filterDetails, setFilterDetails] = useState([])

  return (
    <div className="w-[95vw] mx-auto  pt-10 md:flex md:justify-center flex-col md:flex-row">
      <div className='flex-1 text-xl font-bold text-blue-700'>
        <p>Filter Card</p>
        <div className='mt-5'>
          {jobFilter.map((item, index) => {
            return <div className='mt-5' key={index}>
              <p className='text-slate-800'>{item.name}</p>
              <div className='mt-2 space-y-1'>
                {item.items.map((item, index) => {
                  return <div className='flex items-center gap-5' key={index}>
                    <input onChange={(e) => setFilterDetails((prev) => ([...prev, e.target.value]))} className='cursor-pointer' type="checkbox" name={item.name} value={item} id={item} />
                    <p className='text-slate-800 font-semibold' >{item}</p>
                  </div>
                })}
              </div>
            </div>
          })}
        </div>
      </div>
      <div className='overflow-y-scroll h-[90vh] md:flex-7 grid md:grid-cols-3 space-y-3'>
        {jobs.map((item, index) => {
          return <JobCard key={index} />
        })}

      </div>
    </div>
  )
}

export default Jobs