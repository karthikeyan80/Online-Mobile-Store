import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPloicy from '../components/OurPloicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  return (
    <div className='pt-20'>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <OurPloicy />
      <NewsletterBox />
    </div>
  )
}

export default Home;