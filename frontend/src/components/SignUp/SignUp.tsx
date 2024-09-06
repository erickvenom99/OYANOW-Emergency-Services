import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Update to useNavigate
import email from "../../assets/email.png";
import password from "../../assets/password.png";
import person from "../../assets/person.png";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        action === "Sign Up"
          ? "http://localhost:5000/sign-up"
          : "http://localhost:5000/login",
        {
          name,
          email: emailValue,
          password: passwordValue,
        }
      );
      const username = response.data.username;
      try {
        if (response.status === 201) {
          console.log("Account Created Successfully", response.data);
        } else if (action === "Login") {
          if (response.status === 200) {
            console.log("Logged in");
          } else {
            console.log("Invalid Credentials");
            return;
          }
        }
      } catch (error) {
        console.log("Account Creation Failed", error);
      }
      const destinationPath = "/" + { username } + "/dashboard";
      navigate(destinationPath);
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleSignUpClick = () => {
    setAction("Sign Up");
    navigate("/sign-up"); // Navigate to the sign-up route
  };

  const handleLoginClick = () => {
    setAction("Login");
    navigate("/login"); // Navigate to the login route
  };

  return (
    <>
      <div className="signin-signup-background">
        <div className="signin-container">
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
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="input">
              <img src={email} alt="" />
              <input
                type="email"
                placeholder="Email"
                value={emailValue}
                onChange={(e) => setEmailValue(e.target.value)}
              />
            </div>
            <div className="input">
              <img src={password} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>
          </div>
          <div className="submit submit-button" onClick={handleSubmit}>
            Submit
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
              onClick={handleSignUpClick} // Update to use handleSignUpClick
            >
              {"Sign Up"}
            </div>
            <div
              className={action === "Sign Up" ? "submit gray" : "submit"}
              onClick={handleLoginClick} // Update to use handleLoginClick
            >
              {"Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
