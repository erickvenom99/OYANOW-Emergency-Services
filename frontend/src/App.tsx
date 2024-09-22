import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SigninSignup from "./components/Serviceprovider/SigninSignup";
import Footer from "./components/ReusableComponents/Footer/Footer";
import Navbar from "./components/ReusableComponents/Navbar/Navbar";
import Dashboard from "./components/Dashboard/Dashboard";
import UserDashboard from "./components/Dashboard/UserDashboard";
import Automobile from "./components/Automobile/Automobile";
import Electrical from "./components/Electrical/Electrical";
import Plumbering from "./components/Plumbering/Plumbering";
import JobListings from "./components/JobListings";
import Map from "./components/Map/Map";

const App = () => {
  const DEFAULT_COORDINATES = { lat: 52.5309, lng: 13.3847 };
  return (
    <div>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignUp />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/Automobile" element={<Automobile />} />
          <Route path="/Plumbering" element={<Plumbering />} />
          <Route path="/Electrical" element={<Electrical />} />
          <Route path="/service-providers/login" element={<SigninSignup />} />
          <Route path="/service-providers/sign-up" element={<SigninSignup />} />
          <Route path="/service-providers/:username/dashboard" element={<Dashboard />} />
          <Route path="/:user/dashboard" element={<UserDashboard />} />{" "}
          {/* Updated to avoid conflicts */}
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
