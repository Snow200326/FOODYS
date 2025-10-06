
import { createContext, useContext } from 'react'
import { Footer } from './Footer.jsx'
import { Header } from './Header.jsx'
import { Outlet, useLocation } from 'react-router'
import { CartContext } from './CartContext.jsx'

export const Layout = () => {
  const  isOwner  = useLocation().pathname.includes('owner')
  return (
    <div className='w-full h-screen bg-[#fff4f1] flex justify-center '>
      <div className=" h-full min-w-screen overflow-x-hidden  ">
        {!isOwner && <Header />}
        <Outlet />
        {!isOwner && <Footer />}
      </div>
    </div>
  )
}
