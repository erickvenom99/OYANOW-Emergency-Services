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

const Electrical = () => {
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
                <h2 className="text-purple-600">Oyanow Electrical Service </h2>
                <p className="text-2l font-com">
                    Electrical issues can strike at any hour, and Oyanow understands that emergencies don’t adhere to a schedule. Their round-the-clock service ensures that residents can get help when they need it most, whether it’s a power outage, faulty wiring, or a tripped circuit breaker.
                </p>
                <p className="text-2l font-com">
                Electrical problems can pose serious safety hazards, including fire risks and electrocution. Oyanow’s team of licensed electricians prioritizes safety, conducting thorough inspections and ensuring that all work meets code standards. This commitment to safety protects homes and families.
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

export default Electrical;
