import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPloicy from '../components/OurPloicy'

const Home = () => {
  return (
    <div className='pt-20'>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPloicy />
    </div>
  )
}

export default Home;