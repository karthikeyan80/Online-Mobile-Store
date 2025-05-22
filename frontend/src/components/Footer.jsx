import React from 'react'
import assets from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-14 text-sm'>
            <div>
                <img src={assets.logo} alt="logo" className='mb-5 w-32'/>
                <p className='w-full sm:w-1/2 text-gray-600 '> Welcome to Online Mobile Store, your trusted destination for the latest smartphones and accessories. We are passionate about connecting people with technology that enhances their lives. Our curated selection features top brands, competitive prices, and a seamless shopping experience designed to meet the needs of every customer. Whether you are a tech enthusiast or simply looking for a reliable device, we are here to help you make the right choice.</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5 '>COMPANY</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+1-212-456-7890</li>
                    <li>contact@mobistore.com</li>
                </ul> 
            </div>
        </div>

        <div >
            <hr />
            <p className='py-5 text-xs text-center '>Coopyrights 2025@Mobistore.com - All Rights Reserved</p>
        </div>
    </div>
  )
}

export default Footer