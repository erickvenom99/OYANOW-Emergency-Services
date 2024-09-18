import React from "react";
import { FaBell } from "react-icons/fa";
import BgImage from "../../../assets/bg.png";
import { motion } from "framer-motion";

const bgStyle = {
  backgroundImage: `url(${BgImage})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
};

const Subscribe = () => {
  return (
    <section className="bg-[#f7f7f7]">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        style={bgStyle}
        className="container py-24 md:py-48"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="flex flex-col justify-center"
        >
          <div className="text-center space-y-4 lg:max-w-[400px] mx-auto">
            <h1 className="text-4xl font-bold !leading-snug font-com">
              450K+ Customers rely on us
            </h1>
            <p className="font-com">
              We provide the best emergency all over the Country , you are just a click away to 
              experience optimum professional service
            </p>
            <a
              href=""
              className="primary-btn !mt-8 inline-flex items-center gap-4 group bg-purple-600 text-white py-2 px-4 rounded transition duration-300 hover:bg-purple-700 no-underline" // Updated styles
            >
              Register Now
              <FaBell className="group-hover:animate-bounce group-hover:text-lg duration-200" />
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Subscribe;
