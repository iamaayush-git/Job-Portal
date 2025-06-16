import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../components/JobCard';

const Jobs = () => {
  const { jobs } = useSelector(state => state.job);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    setFilteredJobs(jobs);
  }, [jobs]);

  useEffect(() => {
    const filtered = jobs.filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchTerm, jobs]);

  return (
    <div className="w-[90vw] mx-auto pt-2 ">
      <div className="w-[30%] ml-auto  font-semibold text-slate-700">
        <div className="mt-5">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="text-sm text-slate-700 outline-none w-full p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="mt-5 overflow-y-scroll h-[90vh] grid md:grid-cols-3 gap-5 px-5">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((item, index) => (
            <JobCard
              key={index}
              _id={item._id}
              company={item.company.name}
              location={item.location}
              title={item.title}
              description={item.description}
              position={item.position}
              jobType={item.jobType}
              salary={item.salary}
            />
          ))
        ) : (
          <p className="text-gray-500">No jobs found for “{searchTerm}”.</p>
        )}
      </div>
    </div>
  );
};

export default Jobs;
