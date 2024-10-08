import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";
import Blob from "../../assets/blob.svg";
import servicePng from "../../assets/usebanner.png";
import { motion } from "framer-motion";


const FadeUp = (delay) => {
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

const Automobile = () => {
  return (
    <>
      <section className="bg-light overflow-hidden relative">
        <div className="container grid grid-cols-1 md:grid-cols-2 min-h-[500px]">
          {/* Brand Info */}
          <div className="flex flex-col justify-center py-10 md:py-0 relative z-20">
            <div className="text-start md:text-left space-y-8 lg:max-w-[500px]">
              <motion.h1
                variants={FadeUp(0.6)}
                initial="initial"
                animate="animate"
                className="text-xl lg:text-1xl font-bold !leading-snug"
              >
                <h2 className="text-purple-600">Oyanow Automobile Service </h2>
                <p className="text-2l font-com">
                When your vehicle breaks down, every minute counts. Oyanow is known for its rapid response times, dispatching skilled technicians who arrive equipped to handle a variety of automotive issues. This swift action minimizes downtime and gets you back on the road as soon as possible.
                </p>
                <p className="text-l font-com">
                  Oyanow prides itself on employing experienced and knowledgeable technicians who understand the intricacies of various vehicle makes and models. Their expertise means that you can trust them to diagnose and resolve issues efficiently, providing peace of mind during stressful situations
                </p>
              </motion.h1>
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
    </>
  );
};

export default Automobile;
