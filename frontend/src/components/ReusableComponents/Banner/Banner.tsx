import React from "react";
import "./banner.css";
import useBanner from "../../../assets/servicesman2.png";

const Banner = () => {
  return (
    <>
      <section id="home" className="py-5">
        <div className="container flex flex-wrap items-start justify-start mx-auto mt-5 md:px-12">
          <div className="mb-10 lg:mb-0 lg:w-1/2">
            <h1 className="max-w-xl text-[2rem] leading-snug text-purple-600 font-extrabold font-sans text-center lg:text-4xl lg:text-left lg:leading-tight mb-4">
              Oyanow! Let's GO
              <br />
            </h1>
            <p className="max-w-xl text-center text-gray-700 lg:text-left lg:max-w-md">
              Oyanow is an Emergency MEP Service. Fast, Reliable, and
              Professional Mechanical, Electrical, and Plumbing Solutions
              available 24/7 to tackle your emergencies with expert care and
              efficiency.
            </p>
            <div className="flex justify-center mt-8 lg:justify-start">
              <button
                type="button"
                className="text-white bg-indigo-600 font-medium rounded-lg px-4 py-2 text-center hover:bg-indigo-500 hover:drop-shadow-md transition duration-300 ease-in-out"
              >
                Learn more
              </button>
              <button
                type="button"
                className="ml-4 text-gray-900 bg-gray-200 font-medium rounded-lg px-4 py-2 text-center hover:bg-gray-300 hover:drop-shadow-md transition duration-300 ease-in-out"
              >
                Learn more
              </button>
            </div>
          </div>
          <div className="lg:w-1/2 lg:flex lg:justify-start"> 
            <img
              src={useBanner}
              alt="Oyanow Emergency Service"
              className="custom-img w-full h-auto max-w-md" 
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
