import React from "react";
import { Cards } from "../../Componetn/Cards";

export const Home1 = () => {
  return (
    <div className="bg-white flex flex-col w-full min-h-screen ">
      <div className="text-center flex justify-center items-center p-5">
        <div className="p-10">
          <h1 className="uppercase text-7xl p-4">
            <span className="font-semibold">New </span>
            <span className="font-light text-[#fd8d41]">Arrivals</span>
          </h1>
          <p className="text-[#c3af9a]">
            Discover fresh foods that delight your taste, nourish your body, and
            bring joy
          </p>
          <p className="text-[#c3af9a]">to every meal.</p>
        </div>
      </div>
      <div className="w-full px-6 pb-10">
        <Cards />
      </div>
    </div>
  );
};
