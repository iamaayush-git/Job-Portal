import React from 'react'
import { useSelector } from 'react-redux'
import LatestJobCard from '../components/LatestJobCard.jsx';
import { Link } from 'react-router-dom';

const RecommendedJobs = () => {

  const { recommendJobs } = useSelector(state => state.job);

  return (
    <div className='w-full'>
      <p className='text-3xl font-bold mt-10 text-blue-700 '>AI Recommendations</p>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-3  gap-5'>
        {recommendJobs.length > 0 ? recommendJobs.map((item, i) => {
          return <Link key={i} to={`/job-details/${item._id}`} ><LatestJobCard company={item.company.name} title={item.title} location={item.location} description={item.description} position={item.position} jobType={item.jobType} salary={item.salary} /></Link>
        }) : <p className='md:col-span-3 md:text-center text-left text-red-500 bg-gray-50 p-10 text-xl' >Please upload your resume to see recommended jobs by AI</p>}
      </div>
    </div>
  )
}

export default RecommendedJobs