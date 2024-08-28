import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import demoLogo from "../../assets/demo-logo.png";
import "./Navbar.css";

interface Prop {
  navItems: {
    id: string;
    title: string;
    url: string;
  }[];
}

const Navbar: React.FC<Prop> = ({ navItems }) => {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
  return (
    <>
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
                {navItems.map((item) => (
                  <li key={item.id} className="nav-item">
                    <a className="nav-link" href={item.url}>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </section>
    </>
  );
};

export default Navbar;
