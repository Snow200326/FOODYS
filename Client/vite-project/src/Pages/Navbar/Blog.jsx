import React from "react";
import { blogs } from "../../assets/data";

export const Blog = () => {
  return (
    <div className="w-full min-h-screen bg-[#fff4f1] p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
          >
      
            <div className="flex justify-between px-4 py-2 text-gray-600 text-xs">
              <span>{blog.date || "20/5/2025"}</span>
              <span className="font-semibold">{blog.category}</span>
            </div>
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-48 object-cover"
            />

            <div className="p-4 space-y-2">
              <h2 className="text-lg font-bold text-gray-900">{blog.title}</h2>
              <p className="text-gray-700 text-sm line-clamp-3">
                {blog.description}
              </p>
              <button className="mt-2 bg-orange-600 text-white p-2 font-medium hover:underline">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
