import React from 'react'
import { assets } from '../../assets/data'

export const Home4 = () => {
    const Reviews = [
        {
            name: 'Donald Jackman',
            profession: 'Content Creator',
            image: assets.user1
        },
        {
            name: 'Richard Nelson',
            profession: 'Instagram Influencer',
            image: assets.user2
        },
        {
            name: 'James Washington',
            profession: 'Digital Content Creator',
            image: assets.user3
        }
    ];

    return (
        <div className='w-full min-h-[80%] mt-3 flex flex-col justify-center items-center md:min-h-[90%] p-6'>
            {/* Title */}
            <div className='flex flex-col items-center uppercase text-center space-y-4 max-w-2xl'>
                <h1 className='text-4xl md:text-6xl font-bold'>
                    What <span className='font-light text-[#fd8d41] p-2'>People Say</span>
                </h1>
                <p className='text-[#404045] text-sm md:text-base'>
                    Discover fresh foods that delight your taste, nourish your body, and bring joy to every meal.
                </p>
            </div>

            {/* Review Cards */}
            <div className='w-full max-w-6xl mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                {Reviews.map((curr, index) => {
                    let badgeColor = "bg-gray-200";
                    if (curr.profession.includes("Content Creator")) badgeColor = "bg-[#edbdcd]";
                    if (curr.profession.includes("Instagram Influencer")) badgeColor = "bg-[#cebfab]";
                    if (curr.profession.includes("Digital Content Creator")) badgeColor = "bg-[#aed6ff]";

                    return (
                        <div key={index} className={`${badgeColor} p-6 rounded-2xl shadow-md`}>
                            <div className='flex gap-4 items-center'>
                                <img src={curr.image} alt={curr.name} className='border rounded-full w-12 h-12 object-cover'/>
                                <div className='text-[#404045]'>
                                    <h1 className='font-semibold'>{curr.name}</h1>
                                    <p className='font-light text-sm'>{curr.profession}</p>
                                </div>
                            </div>
                            <hr className='my-3'/>
                            <div className='flex flex-col space-y-3'>
                                <div className='flex'>
                                    {[...Array(4)].map((_, i) => (
                                        <img
                                            key={i}
                                            src={assets.star}
                                            alt="star"
                                            className="w-4 h-4"
                                        />
                                    ))}
                                </div>
                                <p className='text-sm md:text-base leading-relaxed'>
                                    I've been using imagify for nearly two years, primarily for Instagram, and it has been incredibly user-friendly, making my work much easier.
                                </p>
                                <a href="/Blog" className='hover:underline text-sm text-blue-700'>Read more</a>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
