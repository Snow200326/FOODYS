import React from 'react'
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className='space-x-10 uppercase  font-bold text-[#404040] z-1  flex max-md:hidden' >
      <Link to="/home" className='hover:underline hover:underline-offset-8 active:text-amber-500'>Home</Link>
      <Link to="/Menu"  className='hover:underline hover:underline-offset-8'>Menu</Link>
      <Link to="/blog"  className='hover:underline hover:underline-offset-8'>Blog</Link>
      <Link to="/Contact" className='hover:underline hover:underline-offset-8' >Contact</Link>
    </div>
  )
}
