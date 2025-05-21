import React from 'react'
import JobCard from '../components/JobCard'

const Jobs = () => {
  const jobs = [1, 2, 2, 2, 2, 2, 2, 2, 2];

  return (
    <div className="w-[95vw] mx-auto  pt-10 md:flex md:justify-center flex-col md:flex-row">
      <div className='flex-1 text-xl font-bold text-blue-700'>Filter Card</div>
      <div className='md:flex-7 grid md:grid-cols-3 space-y-3'>
        {jobs.map(() => {
          return <JobCard />
        })}


      </div>
    </div>
  )
}

export default Jobs