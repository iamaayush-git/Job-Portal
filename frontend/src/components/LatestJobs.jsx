import LatestJobCard from './LatestJobCard.jsx';
import { useSelector } from 'react-redux';

const LatestJobs = () => {

  const { jobs } = useSelector(state => state.job);

  return (
    <div>
      <p className='text-3xl font-bold mt-10 text-blue-700 '>Latest Jobs</p>
      <div className='mt-5 grid grid-cols-1 md:grid-cols-3  gap-5'>
        {jobs.slice(0, 5).map((item, i) => {
          return <LatestJobCard company={item.company.name} title={item.title} location={item.location} description={item.description} position={item.position} jobType={item.jobType} salary={item.salary} key={i} />
        })}
      </div>
    </div>
  )
}

export default LatestJobs