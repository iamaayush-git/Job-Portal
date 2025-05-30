import React from 'react'
import JobCard from '../components/JobCard';
import { useSelector } from 'react-redux';

const Browse = () => {
  const { jobs } = useSelector(state => state.job)

  return (
    <div className='w-[90vw] mx-auto py-10'>
      <p className='font-semibold text-2xl text-slate-800'>Search Results ({jobs.length})</p>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-3 space-y-5'>
        {jobs.map((item, index) => {
          return <JobCard _id={item._id} company={item.company.name} location={item.location} title={item.title} description={item.description} position={item.position} jobType={item.jobType} salary={item.salary} key={index} />
        })}
      </div>
    </div>
  )
}

export default Browse