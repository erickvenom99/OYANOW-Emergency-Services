import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import demoLogo from "../../../assets/demo-logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <section id="nav-bar">
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={demoLogo} alt="Demo Logo" className="navbar-logo" />
          </a>
          <button
            className="navbar-toggler custom-toggle"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
            onClick={handleNavCollapse}
          >
            <FontAwesomeIcon icon={faBars} />
          </button>
          <div
            className={`collapse navbar-collapse${
              isNavCollapsed ? "" : " show"
            }`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/mechanical">
                  Mechanical
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/electrical">
                  Electrical
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/plumbering">
                  Plumbering
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/Serviceproviders">
                  Service Provider
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/signin">
                  Sign-in
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contacts
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
