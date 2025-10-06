import React, { useContext, useState } from 'react'
import { assets, dummyProducts } from '../../assets/data';
import { CartContext } from '../../Componetn/CartContext';

export const Home3 = () => {
    const [active, setActive] = useState();
    const { addToCart } = useContext(CartContext)

    return (
        <div className=' bg-white w-full  min-h-screen md:text-wrap  '>
            <div className='flex text-center flex-col items-center  uppercase p-30 text-wrap '>
                <h1 className=' text-7xl p-4'>Popular <span className='font-light text-[#fd8d41]'>Foods</span> </h1>
                <p className='text-[#c8b7a8] break-after-all '>Discover fresh foods that delight your taste, nourish your body, and bring joy <span>
                    to every meal.
                </span> </p>
            </div>
            <div className="w-full py-4 overflow-hidden bg-white snap-x">
                <div
                    className="flex space-x-4 sm:space-x-6 md:space-x-8 px-4 items-start overflow-x-hidden md:w-full overflow-auto scroll-auto  max-lg:overflow-auto   "
                >
                    {dummyProducts.slice(0, 10).map((data) => (
                        <div
                            key={data._id}
                            className="bg-red-50 flex-shrink-0 w-56 sm:w-64 md:w-72 lg:w-87 rounded-lg p-4 shadow-md hover:shadow-lg 
                            lg:snap-center transition"
                        >
                            <div className="flex justify-center">
                                <img
                                    src={data.images[0]}
                                    alt={data.title}
                                    className="w-full h-40 sm:h-48 md:h-52 lg:h-56 object-contain rounded-lg"
                                />
                            </div>
                            <div className="mt-4 text-center w-full">
                                <h1 className="font-bold text-sm sm:text-base md:text-lg truncate">
                                    {data.title}
                                </h1>
                                <div className="flex justify-center items-center mt-1 space-x-1">
                                    <h1 className="font-bold text-xs sm:text-sm">{data.category}</h1>
                                    {[...Array(4)].map((_, i) => (
                                        <img
                                            key={i}
                                            src={assets.star}
                                            alt="star"
                                            className="w-3 h-3 sm:w-4 sm:h-4"
                                        />
                                    ))}
                                    <span className="font-bold text-xs sm:text-sm">5.0</span>
                                </div>
                                <p className="text-[#828383] text-xs sm:text-sm md:text-base mt-2 line-clamp-2">
                                    {data.description}
                                </p>
                                <div className="flex justify-center items-center mt-3 space-x-3">
                                    <div className=" space-x-3.5">
                                        <button
                                            onClick={() => setActive({ id: data._id, size: "H" })}
                                            className={`border rounded-sm px-2 py-1 text-sm ${active?.id === data._id && active?.size === "H"
                                                ? "bg-[#f0e6e5] font-semibold"
                                                : "bg-[#fff4f1]"
                                                }`}
                                        >
                                            H
                                        </button>
                                        <button
                                            onClick={() => setActive({ id: data._id, size: "F" })}
                                            className={`border rounded-sm px-2 py-1 text-sm ${active?.id === data._id && active?.size === "F"
                                                ? "bg-[#f0e6e5] font-semibold"
                                                : "bg-[#fff4f1]"
                                                }`}
                                        >
                                            F
                                        </button>
                                    </div>
                                    <div className="flex text-amber-800 font-bold text-2xl">
                                        <span className="">$</span>
                                        <h1 className="text-bold ">
                                            {active?.id === data._id ? data.price[active?.size] : data.price["H"]}
                                        </h1>

                                    </div>
                                </div>
                                <div className="flex space-x-2 ml-2 items-center mt-4 w-full relative">
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-sm sm:text-base">Prep</h1>
                                        <span className="text-xs sm:text-sm">5m</span>
                                    </div>
                                    <hr className="h-10 w-[1px] bg-[#fbe4df] border-none" />
                                    <div className="flex flex-col items-center">
                                        <h1 className="text-sm sm:text-base">Cook</h1>
                                        <span className="text-xs sm:text-sm">20m</span>
                                    </div>
                                    <div className="absolute right-0 bottom-0 bg-[#dc593f] p-2 rounded-br-lg">
                                        <button onClick={()=>addToCart(data)}>
                                            <img
                                                src={assets.cartAdd}
                                                alt="cart"
                                                className="w-8 h-8 sm:w-10 sm:h-10"
                                            />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
