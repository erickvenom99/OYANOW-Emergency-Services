import { useState } from "react";
import Navbar from "../ReusableComponents/Navbar/Navbar";
import "./SigninSignup.css";
import email from "../../assets/email.png";
import password from "../../assets/password.png";
import person from "../../assets/person.png";

const SigninSignup = () => {
  const [action, setAction] = useState("Sign Up");
  return (
    <>
      <Navbar />
      <div className="signin-signup-background">
        <div className="container">
          <div className="header">
            <div className="text">{action}</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            {action === "Login" ? (
              <div></div>
            ) : (
              <div className="input">
                <img src={person} alt="" />
                <input type="text" placeholder="Name" />
              </div>
            )}
            <div className="input">
              <img src={email} alt="" />
              <input type="email" placeholder="Email" />
            </div>
            <div className="input">
              <img src={password} alt="" />
              <input type="password" placeholder="password" />
            </div>
          </div>
          {action === "Sign Up" ? (
            <div></div>
          ) : (
            <div className="forgot-password">
              Lost password? <span>Click Here!</span>
            </div>
          )}
          <div className="submit-container">
            <div
              className={action === "Login" ? "submit gray" : "submit"}
              onClick={() => {
                setAction("Sign up");
              }}
            >
              {"Sign UP"}
            </div>
            <div
              className={action == "Sign Up" ? "submit gray" : "submit"}
              onClick={() => setAction("Login")}
            >
              {"Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninSignup;
