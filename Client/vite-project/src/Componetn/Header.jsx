import React from 'react'
import { Navbar } from './Navbar'
import { assets } from '../assets/data'
import { Profile } from '../Pages/HomePages/Profile.jsx'

export const Header = () => {
  return (
    <div className='flex justify-between items-center bg-[#fff4f1] w-full p-3 '>
        <div className='flex justify-center items-center '>
            <img src={assets.logoImg} alt=""  className='size-10'/>
            <h1 className='text-orange-600 font-bold'>food</h1>
        </div>
        <Navbar/>
        <Profile />
    </div>
  )
}
