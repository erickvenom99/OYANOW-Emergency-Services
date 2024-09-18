import React, { useState } from "react";
import oyanowImage from "../../../assets/oyanows.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <div className="relative bg-purple-700 text-gray-50 mt-4">
      <div className="container mx-auto px-2">
        <div className="grid grid-cols-12">
          <div className="col-span-12">
            <div className="py-2 px-0">
              <div className="grid md:grid-cols-12 grid-cols-1 gap-4">
                <div className="lg:col-span-4 md:col-span-12">
                  <img
                    src={oyanowImage}
                    alt="Company Logo"
                    className="h-12 mx-auto lg:mx-0"
                  />
                  <p className="mt-2 text-gray-300 text-justify text-sm font-com">
                    Oyanow service is a company that provide emergency
                    Services for Registered User 24/7, With our team
                    of Engineers, you are guaranteed to get fast and
                    professional service at affordable price
                  </p>
                  <ul className="flex list-none mt-4 text-center lg:text-justify space-x-2">
                    <li>
                      <a
                        href="https://facebook.com"
                        className="font-semibold tracking-wide align-middle transition duration-500 ease-in-out p-1 h-8 w-8 inline-flex items-center text-center justify-center text-sm border border-gray-800 rounded-md hover:border-yellow-600 hover:bg-yellow-600"
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://twitter.com"
                        className="font-semibold tracking-wide align-middle transition duration-500 ease-in-out p-1 h-8 w-8 inline-flex items-center text-center justify-center text-sm border border-gray-800 rounded-md hover:border-yellow-600 hover:bg-yellow-600"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a
                        href="https://linkedin.com"
                        className="font-semibold tracking-wide align-middle transition duration-500 ease-in-out p-1 h-8 w-8 inline-flex items-center text-center justify-center text-sm border border-gray-800 rounded-md hover:border-yellow-600 hover:bg-yellow-600"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-2 md:col-span-4 text-center lg:text-justify">
                  <h5 className="tracking-[1px] text-white font-semibold text-lg font-com">
                    Company
                  </h5>
                  <ul className="list-none mt-4">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out text-sm font-com"
                      >
                        About Us
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out text-sm font-com"
                      >
                        Services
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out text-sm font-com"
                      >
                        Pricing
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out text-sm font-com"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-3 md:col-span-4 text-center lg:text-justify">
                  <h5 className="tracking-[1px] text-white font-semibold text-lg font-com">
                    Important Links
                  </h5>
                  <ul className="list-none mt-4">
                    <li>
                      <a
                        href="#"
                        className="text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out text-sm font-com"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out text-sm font-com"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li className="mt-2">
                      <a
                        href="#"
                        className="text-gray-300 hover:text-gray-400 transition-all duration-500 ease-in-out text-sm font-com"
                      >
                        Documentation
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="lg:col-span-3 md:col-span-4 text-center lg:text-justify">
                  <h5 className="tracking-[1px] text-white font-semibold text-lg font-com">
                    Newsletter
                  </h5>
                  <p className="mt-4 text-sm font-com">
                    Sign up and receive the latest updates via email
                  </p>
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1">
                      <div className="my-3">
                        <label className="font-label text-sm font-com">
                          Write your email
                          <span className="text-red-600">*</span>
                        </label>
                        <div className="relative mt-2">
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full py-1 px-2 rounded h-8 outline-none bg-transparent border border-gray-800/90 text-gray-100 focus:border-gray-800/90"
                            placeholder="Email"
                            name="Email"
                            required
                          />
                        </div>
                        <button
                          type="submit"
                          id="submitsubsribe"
                          name="send"
                          className="mt-2 py-1 px-4 font-semibold inline-block tracking-wide border align-middle text-center bg-white border-gray-700 text-black rounded-lg hover:bg-gray-200 text-sm" // Changed to white
                        >
                          Subscribe
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;