import React from 'react'
import { assets } from '../../assets/data'

export const Home2 = () => {
  return (
    <div className="bg-[#fff4f1] flex flex-col md:flex-row w-full min-h-[80%] p-6 md:p-12">
      <div className="w-full md:w-1/2 flex flex-col justify-center">
        <div className="mb-6 md:mb-10">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold uppercase leading-snug">
            Discover Our <span className="font-light text-[#fd882f]">Food App's key features!</span>
          </h1>
          <p className="mt-3 text-sm md:text-base text-[#8a7b7e]">
            Discover fresh foods that delight your taste, nourish your body, and bring joy to every meal.
          </p>
        </div>
        <div className="flex flex-col space-y-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 size-16 bg-[#dc583e] rounded-xl flex items-center justify-center">
              <img src={assets.delivery} alt="delivery" className="size-10" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">Fast Food Delivery</h2>
              <p className="text-sm md:text-base text-[#8a7b7e]">
                Get your favorite meals delivered hot and fresh to your door in just a few minutes.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 size-16 bg-[#dc583e] rounded-xl flex items-center justify-center">
              <img src={assets.secure} alt="secure" className="size-10" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">Secure Online Payments</h2>
              <p className="text-sm md:text-base text-[#8a7b7e]">
                Pay securely using your preferred payment methods with a simple and quick checkout.
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-4">
            <div className="p-3 size-16 bg-[#dc583e] rounded-xl flex items-center justify-center">
              <img src={assets.phone} alt="support" className="size-10" />
            </div>
            <div>
              <h2 className="text-lg md:text-2xl font-semibold">24/7 Support</h2>
              <p className="text-sm md:text-base text-[#8a7b7e]">
                Our support team is always ready to assist you with any order queries or issues.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 flex flex-col md:flex-row gap-6 mt-10 md:mt-0">
        <div className="flex-1 flex justify-center">
          <img src={assets.features1} alt="feature1" className="rounded-lg w-full h-auto object-contain" />
        </div>
        <div className="flex-1 flex flex-col gap-6">
          <img src={assets.features2} alt="feature2" className="rounded-lg w-full h-auto object-contain" />
          <img src={assets.features3} alt="feature3" className="rounded-lg w-full h-auto object-contain" />
        </div>
      </div>

    </div>


  )
}
