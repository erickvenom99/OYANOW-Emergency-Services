import React from "react";
import servicePng from "../../../assets/serviceprops.png";
import { motion } from "framer-motion";

const Banner3 = () => {
  return (
    <section>
      <div className="container py-14 md:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 space-y-6 md:space-y-0">
        {/* Banner Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <div className="text-center md:text-left space-y-4 lg:max-w-[450px]">
            <h1 className="text-4xl font-bold !leading-snug font-com">
              Join Our Community to get the best
              services
            </h1>
            <p className="text-dark2 font-com">
              Our team of Engineers are always available to 
              care for your Electrical plumbering, automobile
              and solar need 24/7
            </p>
            <a
              href="https://chat.whatsapp.com/FQSKgJ5f1eIAhlyF5sVym0"
              className="primary-btn !mt-8 inline-flex items-center gap-4 group bg-purple-600 text-white py-2 px-4 rounded transition duration-300 hover:bg-purple-700 no-underline" // Added purple color and removed underline
            >
              Join Now
            </a>
          </div>
        </motion.div>
        {/* Banner Image */}
        <div className="flex justify-center items-center">
          <motion.img
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            src={servicePng}
            alt=""
            className="w-[350px] md:max-w-[450px] object-cover drop-shadow"
          />
        </div>
      </div>
    </section>
  );
};

export default Banner3;