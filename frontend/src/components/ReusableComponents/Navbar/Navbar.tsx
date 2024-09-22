import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import oyanowImage from "../../../assets/oyanows.png";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <section id="nav-bar" className="sticky top-0 z-40">
      <nav className="bg-gradient-to-r from-purple-700 to-purple-700 flex items-center justify-between p-2">
        <div className="container mx-auto flex items-center justify-between">
          <a className="navbar-brand" href="/">
            <img src={oyanowImage} alt="Demo Logo" className="h-12 pl-5" />
          </a>
          <button
            className="text-white text-2xl focus:outline-none md:hidden"
            type="button"
            onClick={handleNavCollapse}
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div
            className={`${
              isNavCollapsed ? "hidden" : "block"
            } absolute md:static md:flex md:items-center md:justify-between w-full md:w-auto bg-gradient-to-r from-purple-700 to-purple-700 md:bg-transparent top-full left-0`}
            id="navbarNav"
          >
            <ul
              className={`flex flex-col md:flex-row md:space-x-10 md:items-center ${
                isNavCollapsed ? "items-start" : "items-end"
              } p-2 md:p-0`}
            >
              <li className="nav-item">
                <a
                  className="nav-link text-white text-lg font-semibold"
                  href="/"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white text-lg font-semibold"
                  href="/Automobile"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Automobile
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white text-lg font-semibold"
                  href="/Electrical"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Electrical
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white text-lg font-semibold"
                  href="/Plumbering"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Plumbering
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white text-lg font-semibold"
                  href="/service-providers/login"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Service Provider
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white text-lg font-semibold"
                  href="/login"
                  onClick={() => setIsNavCollapsed(true)}
                >
                  Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Navbar;
