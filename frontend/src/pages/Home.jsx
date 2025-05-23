import React from 'react'
import HeroSection from '../components/HeroSection'
import Carousel from '../components/Carousel'
import LatestJobs from '../components/LatestJobs'

const Home = () => {
  return (
    <div className='w-[90vw] mx-auto'>
      <HeroSection />
      <Carousel />
      <LatestJobs />
    </div>
  )
}

export default Home