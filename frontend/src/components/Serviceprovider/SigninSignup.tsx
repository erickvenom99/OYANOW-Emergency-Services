import { useState } from "react";
import { useNavigate } from "react-router-dom";
import email from "../../assets/email.png";
import password from "../../assets/password.png";
import person from "../../assets/person.png";
import axios from "axios";
import "./SigninSignup.css";

const SigninSignup = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        action === "Sign Up"
          ? "http://localhost:5000/service-providers/sign-up"
          : "http://localhost:5000/service-providers/login",
        {
          name,
          email: emailValue,
          password: passwordValue,
        }
      );
      const username = response.data.username;
      let successMessage = "";
      if (action === "Sign Up") {
        if (response.status === 201) {
          successMessage = "New User Created";
        } else {
          console.log(
            "Failed to create user. Please fill in the required information"
          );
          return;
        }
      } else {
        if (response.status == 200) {
          successMessage = "Login Successful";
        } else {
          console.log("Incorrect Login details. Please try again.");
          return;
        }
      }
      const destinationPath = `/${username}/dashboard`;
      navigate(destinationPath); // Logs in to the User's dashboard
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  const handleToggleAction = () => {
    setAction((prev) => (prev === "Login" ? "Sign Up" : "Login"));
    navigate(
      action === "Login"
        ? "/service-providers/sign-up"
        : "/service-providers/login"
    );
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
            {action === "Sign Up" && (
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
          <div className="submit-container">
            <div className="submit" onClick={handleToggleAction}>
              {action === "Login" ? "Sign Up" : "Login"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SigninSignup;
