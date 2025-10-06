import React from 'react'
import { assets } from '../assets/data'

export const Footer = () => {
  return (
    <div className=''>
      <div className='flex justify-between text-wrap  -500 p-10 flex-wrap space-y-4'>
        <div className='flex flex-col  w-80   space-y-2 '>
          <div className=' flex  items-center'>
            <div> <img src={assets.logoImg} alt="" className='size-10' /></div>
            <div>
              <h1 className='font-bold text-3xl'>
                Foodie
              </h1>
            </div>
          </div>
          <p className='text break-after-all  text-md'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text
          </p>
          <div className='flex space-x-4'>
            <img src={assets.facebook} alt="" />
            <img src={assets.linkedin} alt="" />
            <img src={assets.twitter} alt="" />
            <img src={assets.instagram} alt="" />
          </div>
        </div>

        <div className=' p-2'>
          <h1 className='font-bold uppercase text-2xl'>Company</h1>
          <ul ><li>About</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Blog</li>
            <li>Blog</li></ul>
        </div>
        <div className='p-2'>
          <h1 className='font-bold text-2xl gap-3 '>SUPPORT</h1>
          <ul><li>Help Center</li>
            <li>Safety Information</li>
            <li>Cancellation Options</li>
            <li>Contact Us</li>
            <li>Accessibility</li></ul>
        </div>
        <div className='b p-2 '>
          <h1 className='font-bold text-2xl  '>STAY UPDATED</h1>
          <p>Subscribe to our newsletter for inspiration and special offers.</p>
          <div className='relative '>
            <input type="text" className=' bg-[#fbe4de]  border-[#f0e4e3] border-solid border-3 w-full rounded-3xl p-2 ' />
          <button className='absolute  right-1 top-1   rounded-3xl w-[20%]  h-[90%] bg-[#dc583e] text-white  '>Submit</button>
          </div>
        </div>
      </div>
      <hr className='m-2' />
      <div className='flex  justify-between  max-sm:text-center max-sm:flex-col text-wrap space-y-2 font-light'>
        <h1>© 2025 FoodieFiesta. All rights reserved.</h1>

        <ul>
          <a href="">Privacy</a>
          <a href="">Terms</a>
          <a href="">Sitmap</a>
        </ul>
      </div >

    </div>
  )
}

