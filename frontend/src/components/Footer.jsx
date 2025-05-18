import React from 'react'
import assets from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-14 text-sm'>
            <div>
                <img src={assets.logo} alt="logo" className='mb-5 w-32'/>
                <p className='w-full sm:w-1/2 text-gray-600 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore aliquam tenetur necessitatibus architecto corrupti voluptate exercitationem ipsam doloribus neque, quisquam enim nobis sunt earum reprehenderit quas, vero perspiciatis eos vitae.</p>
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