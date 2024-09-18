import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Blob from "../../../assets/blob.svg";
import servicePng from "../../../assets/usebanner.png";
import { motion } from "framer-motion";

export const FadeUp = (delay) => {
  return {
    initial: {
      opacity: 0,
      y: 50,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        duration: 0.5,
        delay: delay,
        ease: "easeInOut",
      },
    },
  };
};

const Hero = () => {
  return (
    <section className="bg-light overflow-hidden relative">
      <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
        {/* Brand Info */}
        <div className="flex flex-col justify-center py-10 md:py-0 relative z-20">
          <div className="text-start md:text-left space-y-8 lg:max-w-[500px]">
            <motion.h1
              variants={FadeUp(0.6)}
              initial="initial"
              animate="animate"
              className="text-xl lg:text-1xl font-bold !leading-snug text-purple-600"
            >
              <h2>Welcome to Oyanow Services{" "}</h2>
              <p>24/7 Emergency Service Provider</p>
            </motion.h1>
            <motion.div
              variants={FadeUp(0.8)}
              initial="initial"
              animate="animate"
              className="flex justify-center md:justify-start"
            >
              <button className="primary-btn !mt-8 inline-flex items-center gap-4 group bg-purple-600 text-white py-2 px-4 rounded transition duration-300 hover:bg-purple-700">
                Get Started
                <IoIosArrowRoundForward className="text-lg group-hover:translate-x-1 group-hover:-rotate-45 duration-300" />{" "}
                {/* Reduced icon size */}
              </button>
            </motion.div>
          </div>
        </div>
        {/* Hero Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeInOut" }}
            src={servicePng}
            alt=""
            className="mt-5 mb-3 w-[300px] xl:w-[600px] relative z-10 drop-shadow"
          />
          <motion.img
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeInOut" }}
            src={Blob}
            alt=""
            className="absolute -bottom-24 w-[600px] md:w-[1200px] z-[1] hidden md:block"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
