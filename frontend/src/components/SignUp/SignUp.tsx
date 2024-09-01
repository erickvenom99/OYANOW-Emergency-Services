import { useState } from "react";
import email from "../../assets/email.png";
import password from "../../assets/password.png";
import person from "../../assets/person.png";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const [action, setAction] = useState("Login");
  const [name, setName] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/sign-up", {
        name,
        email: emailValue,
        password: passwordValue,
      });
      console.log("User created: ", response.data);
    } catch (error) {
      console.error("Error creating user:", error);
    }
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
                placeholder="password"
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
              onClick={() => setAction("Sign Up")}
            >
              {"Sign Up"}
            </div>
            <div
              className={action === "Sign Up" ? "submit gray" : "submit"}
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
export default SignUp;
