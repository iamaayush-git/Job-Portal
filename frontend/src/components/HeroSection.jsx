import React from 'react';
import { CiSearch } from "react-icons/ci";

const HeroSection = () => {
  return (
    <section className="py-10 rounded-md">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Find Your <span className="text-blue-600">Dream Job</span><br />
            In Seconds
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Browse thousands of job listings, apply instantly, and take control of your career.
          </p>
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition cursor-pointer">
            Explore Jobs
          </button>
        </div>

        <div className="border md:w-[30vw] h-[8vh] rounded-md flex items-center justify-center">
          <input className='text-slate-600 px-5 w-[80%] h-full outline-none' type="text" name="" id="" placeholder='Search for a job' autoFocus />
          <CiSearch className='h-full w-[20%] hover:bg-blue-500 hover:text-white duration-200 cursor-pointer' />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
