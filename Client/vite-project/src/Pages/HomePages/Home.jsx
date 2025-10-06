import React from 'react'
import { assets } from '../../assets/data'
import { Home1 } from './Home1'
import { Home3 } from './Home3'
import { Home2 } from './Home2'
import { Home4 } from './Home4'

export const Home = () => {
  return (
    <>
      <div className="flex flex-col md:flex-row h-full relative">
        <div className="flex flex-col justify-center items-center md:items-start w-full md:w-1/2 h-full space-y-4 z-10 p-6 md:p-16 text-center md:text-left">
          <h1 className="font-extrabold uppercase text-4xl md:text-7xl lg:text-8xl text-[#ac2c28]">
            Foodies
          </h1>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold">
            Savor <span className="text-amber-700">Every</span> Bite
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-gray-700">
            Delicious meals delivered fresh to your door
          </p>
          <button className="bg-[#dc583e] w-[160px] md:w-[200px] md:text-center p-3 md:p-4 mt-2 text-white font-mono cursor-pointer rounded-md">
            Shop Now
          </button>
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start mt-10 md:mt-20 w-full text-center gap-4">
            <div className="flex items-center justify-center">
              <img src={assets.user1} alt="user1" className="border-2 rounded-full w-10 h-10" />
              <img src={assets.user2} alt="user2" className="-ml-3 border-2 rounded-full w-10 h-10" />
              <img src={assets.user3} alt="user3" className="-ml-3 border-2 rounded-full w-10 h-10" />
              <img src={assets.user4} alt="user4" className="-ml-3 border-2 rounded-full w-10 h-10" />
            </div>
            <div className="hidden md:block mx-3 border border-gray-500 h-12" />
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-1">
                {Array(5).fill().map((_, i) => (
                  <img key={i} src={assets.star} alt="star" className="w-4 h-4 md:w-5 md:h-5" />
                ))}
                <span className="text-sm text-gray-500">5.0</span>
              </div>
              <p className="text-xs md:text-sm text-gray-500">
                Trusted by <span className="text-black">100,000+</span> users
              </p>
            </div>
          </div>
        </div>
        <div className="absolute hidden md:block w-[90%] h-[400px] md:h-full overflow-hidden right-0">
          <img
            src={assets.bg}
            alt="background"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <Home1 />
      <Home2 />
      <Home3 />
      <Home4 />
    </>
  )
}
