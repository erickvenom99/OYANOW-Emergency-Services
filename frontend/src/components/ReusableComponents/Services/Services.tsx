import React, { useState } from "react";
import "./Service.css";
import plumsImage from "../../../assets/plums.png";
import electricianImage from "../../../assets/electrician.png";
import mechanicImage from "../../../assets/mechanic.png";
import serviceImage from "../../../assets/services.png"; // Assuming you have an image for Carpentry

const Services = () => {
  // State to manage hover effect for multiple images
  const [hoveredIndexes, setHoveredIndexes] = useState([
    false,
    false,
    false,
    false,
  ]);

  const handleMouseEnter = (index) => {
    const newHoveredIndexes = [...hoveredIndexes];
    newHoveredIndexes[index] = true;
    setHoveredIndexes(newHoveredIndexes);
  };

  const handleMouseLeave = (index) => {
    const newHoveredIndexes = [...hoveredIndexes];
    newHoveredIndexes[index] = false;
    setHoveredIndexes(newHoveredIndexes);
  };

  const images = [
    {
      src: electricianImage,
      title: "Electrical",
      description:
        "Search for an electrician near you to get the best electrical repairs professionals",
    },
    {
      src: mechanicImage,
      title: "Automobile Engineer",
      description:
        "Car trouble?, worry not our automobile engineers will find you and provide excellent car repairs",
    },
    {
      src: plumsImage,
      title: "Plumbing",
      description:
        "We understand the seriousness of  plumbering emergencies. Our professionals can give you fast and effective solution",
    },
    {
      src: serviceImage,
      title: "Solar energy",
      description:
        "We provide Solar Solutions for a Brighter tomorrow.Clean Energy and Clear Savings",
    },
  ];

  return (
    <>
      <div className="flex items-center justify-center bg-purple-800 p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {" "}
          {/* Reduced gap further */}
          {images.map((image, index) => (
            <div
              key={index}
              className="relative items-center justify-center overflow-hidden cursor-pointer hover:shadow-xl hover:shadow-black/30 transition-shadow mt-3 mb-3"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
            >
              <div className="h-[400px] w-full relative">
                {" "}
                {/* Adjust height as needed */}
                <img
                  className={`h-full w-full object-cover transition-transform duration-500 font-com ${
                    hoveredIndexes[index] ? "rotate-3 scale-125" : ""
                  }`}
                  src={image.src}
                  alt={image.title}
                />
              </div>
              <div
                className={`absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-purple ${
                  hoveredIndexes[index]
                    ? "from-black/70 via-purple/60 to-purple/70"
                    : ""
                } transition-all duration-500`}
              ></div>
              <div
                className={`absolute inset-0 flex flex-col items-center justify-center px-4 text-center transition-all duration-500 ${
                  hoveredIndexes[index] ? "translate-y-0" : "translate-y-[60%]"
                }`}
              >
                <h1 className="text-lg font-bold text-white">{image.title}</h1>
                <p
                  className={`text-sm italic text-white mb-3 transition-opacity duration-300 ${
                    hoveredIndexes[index] ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {image.description}
                </p>
                <button className=" font-com rounded-full shadow shadow-purple/60 bg-neutral-900 py-2 px-3.5 text-sm capitalize text-white">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Services;
