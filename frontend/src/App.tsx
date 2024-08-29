import "./index.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import SignUp from "./components/SignUp/SignUp";
import SigninSignup from "./components/Serviceprovider/SigninSignup";

const App = () => {
  return (
    <div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/Serviceproviders" element={<SigninSignup />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
