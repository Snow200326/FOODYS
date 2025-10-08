import React, { useContext, useState } from 'react'
import { assets } from '../../assets/data.js'
import { CartContext } from '../../Componetn/CartContext.jsx'
import { Link, Navigate } from 'react-router'
import { useClerk, UserAvatar, UserButton } from '@clerk/clerk-react'

export const Profile = () => {
  const [open, setopen] = useState(false)
  const { count, user, isOwner, getToken,navigate } = useContext(CartContext)


  const { openSignIn } = useClerk()
  const OrderIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path d="M96 144C87.2 144 80 151.2 80 160L80 448C80 456.8 87.2 464 96 464L99.3 464C109.7 427.1 143.7 400 184 400C224.3 400 258.2 427.1 268.7 464L371.3 464C376.2 446.6 386.4 431.3 400 420.1L400 160C400 151.2 392.8 144 384 144L96 144zM99.3 512L96 512C60.7 512 32 483.3 32 448L32 160C32 124.7 60.7 96 96 96L384 96C419.3 96 448 124.7 448 160L448 192L503.4 192C520.4 192 536.7 198.7 548.7 210.7L589.3 251.3C601.3 263.3 608 279.6 608 296.6L608 448C608 483.3 579.3 512 544 512L540.7 512C530.3 548.9 496.3 576 456 576C415.7 576 381.8 548.9 371.3 512L268.7 512C258.3 548.9 224.3 576 184 576C143.7 576 109.8 548.9 99.3 512zM448 320L560 320L560 296.6C560 292.4 558.3 288.3 555.3 285.3L514.7 244.7C511.7 241.7 507.6 240 503.4 240L448 240L448 320zM448 368L448 400.4C450.6 400.2 453.3 400 456 400C496.3 400 530.2 427.1 540.7 464L544 464C552.8 464 560 456.8 560 448L560 368L448 368zM184 528C206.1 528 224 510.1 224 488C224 465.9 206.1 448 184 448C161.9 448 144 465.9 144 488C144 510.1 161.9 528 184 528zM456 528C478.1 528 496 510.1 496 488C496 465.9 478.1 448 456 448C433.9 448 416 465.9 416 488C416 510.1 433.9 528 456 528z" /></svg>
  );
  return (
    <div className='flex space-x-6 items-center relative'>

      <div>

        {isOwner && (
          <button onClick={()=>navigate('/owner')} className='border-2'>
            Dashboard
          </button>

        )}
      </div>
      <div className=' md:hidden sm:block '>
        <button onClick={() => setopen(!open)}>
          <img src={open ? assets.menuClose : assets.menu} alt="" className='size-10' />
          {open && (
            <div className="absolute right-0 mt-2 w-40 rounded-md shadow-2xs bg-white ring-1 ring-black ring-opacity-5 z-20">
              <div className="py-1 uppercase left-2 space-y-3">
                <Link to="Home" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100">
                  Home
                </Link>
                <Link to="Menu" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100">
                  Menu
                </Link>
                <Link to="Blog" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100">
                  Blog
                </Link>
                <Link to="Contact" className="block px-4 py-2 text-sm font-bold text-gray-700 hover:bg-gray-100">
                  Contact
                </Link>
              </div>
            </div>
          )}
        </button>
      </div>
      <div className="relative bg-white size-9 flex justify-center items-center rounded-full shadow-md">
        <Link to="/CartAdd">
          <img src={assets.cartAdded} alt="cart" className="w-6 h-6" />
        </Link>
        <span className="absolute -top-1  bg-orange-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
          {count}
        </span>
      </div>
      {user ? (<UserButton>
        <UserButton.MenuItems>
          <UserButton.Action
            label="My Orders"
            labelIcon={<OrderIcon />}
            onClick={() => navigator('/myorder')}
          />
        </UserButton.MenuItems>
      </UserButton>) : (
        <button onClick={openSignIn} className="bg-[#dc583e]  text-white flex justify-center gap-2 rounded-xl w-full p-3  pl-2 ">
          Login
          <img src={assets.user} alt="user" className="w-5 h-5" />
        </button>

      )}
    </div>
  )
}

