// src/components/JobCarousel.jsx
import React, { useState } from 'react';

const jobTitles = [
  'Frontend Developer',
  'Backend Engineer',
  'Full Stack Developer',
  'Data Scientist',
  'UI/UX Designer',
  'Project Manager',
  'DevOps Engineer',
  'Mobile App Developer',
  'QA Tester',
];

const ITEMS_PER_PAGE = 3;

const Carousel = () => {
  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    setStartIndex((prev) => Math.max(prev - ITEMS_PER_PAGE, 0));
  };

  const handleNext = () => {
    if (startIndex + ITEMS_PER_PAGE < jobTitles.length) {
      setStartIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const visibleJobs = jobTitles.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      <div className="w-full md:w-[70vw] mx-auto mt-10 p-6 bg-transparent rounded-lg shadow">
        <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-4 text-center mb-6">
          {visibleJobs.map((job, idx) => (
            <div
              key={idx}
              className="cursor-pointer text-md p-4 border text-nowrap border-gray-300 rounded shadow-sm hover:bg-blue-50 transition"
            >
              {job}
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <button
            onClick={handlePrev}
            disabled={startIndex === 0}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNext}
            disabled={startIndex + ITEMS_PER_PAGE >= jobTitles.length}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Carousel;
