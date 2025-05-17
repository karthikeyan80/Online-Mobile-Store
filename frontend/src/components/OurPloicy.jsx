import React from 'react'
import assets from '../assets/assets'

const OurPloicy = () => {
  return (
    <div className='flex flex-row sm:flow-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt='exchangeicon' />
            <p className='font-semibold '>Easy Exchange Policy</p>
            <p className='text-gray-600'>We offer hassle free Exchange Policy  </p>
        </div>
        <div>
            <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt='quality-icon' />
            <p className='font-semibold '>7 days return Policy</p>
            <p className='text-gray-600'>We provide 7 days free return policy  </p>
        </div>
        <div>
            <img src={assets.support_img} className='w-12 m-auto mb-5' alt='support-img' />
            <p className='font-semibold '>Best customer support </p>
            <p className='text-gray-600'>We provide 24/7 customer support </p>
        </div>
    </div>
  )
}

export default OurPloicy