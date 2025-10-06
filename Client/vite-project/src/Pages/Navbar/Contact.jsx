import React from "react";

export const Contact = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-[#fff4f1] py-12 px-6">
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl md:text-5xl font-bold">
          Let’s <span className="text-[#fd872f]">Get In Touch.</span>
        </h1>
        <p className="mt-3 text-gray-600">
          Or just reach out manually at{" "}
          <span className="text-[#fd872f] font-medium">
             <a href="">hello@foodiefiesta.com</a> 
          </span>
        </p>
      </div>
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <form className="flex flex-col space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#fd872f]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#fd872f]"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Message
            </label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full resize-none border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#fd872f]"
            ></textarea>
          </div>
          <button
            type="submit"
            className="relative bg-[#fd872f] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#e76f1f] transition"
          >
            <span className="before:content-['→'] before:mr-2"></span>
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
};
