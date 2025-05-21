import React from 'react'
import LatestJobCard from './LatestJobCard.jsx';

const LatestJobs = () => {
  const jobs = [1, 2, 3, 2, 3, 3, 3, 33, 33];
  return (
    <div>
      <p className='text-3xl font-bold mt-10 text-blue-700 '>Latest Jobs</p>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-3  gap-5'>
        {jobs.slice(0, 5).map(() => {
          return <LatestJobCard />
        })}
      </div>
    </div>
  )
}

export default LatestJobs