import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import email from "../../../assets/email.png";
import password from "../../../assets/password.png";
import person from "../../../assets/person.png";
import axios from "axios";
import "./SignUp.css";

const SignUp = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("Login");
  const [usernameValue, setUserNameValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const [phoneNumberValue, setPhoneNumberValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(false); // Add loading state

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates([latitude, longitude]);
        },
        (error) => {
          console.error("Error getting location:", error);
          setErrorMessage("Unable to retrieve your location.");
        }
      );
    } else {
      setErrorMessage("Geolocation is not supported by this browser.");
    }
  }, []);

  const handleSubmit = async () => {
    console.log("Coordinates before navigation:", coordinates); // Log coordinates

  if (!coordinates) {
    setErrorMessage("Coordinates are not available. Please allow location access.");
    return; // Prevent submission if coordinates are null
  }
    if (action === "Sign Up" && passwordValue !== confirmPasswordValue) {
      setErrorMessage("Passwords do not match");
      return;
    }

    if (!coordinates) {
      setErrorMessage("Coordinates are not available. Please allow location access.");
      return; // Prevent submission if coordinates are null
    }

    setLoading(true); // Set loading state

    try {
      const response = await axios.post(
        action === "Sign Up"
          ? "http://localhost:5000/sign-up"
          : "http://localhost:5000/login",
        {
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          phoneNumber: phoneNumberValue,
          location: {
            type: "Point", // Required
            coordinates: coordinates,
          },
        }
      );

      const { username, userId } = response.data;
      const uniqueUsername = username + userId.slice(0, 4);
      
      if (action === "Sign Up" && response.status === 201) {
        console.log("Account Created Successfully", response.data);
      } else if (action === "Login" && response.status === 200) {
        console.log("Logged in");
      }

      console.log("Response from API:", response.data); // Log response

      const destinationPath = `/${uniqueUsername}/dashboard`;
      navigate(destinationPath, { state: { username, coordinates, userId } });

    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleSignUpClick = () => {
    setAction("Sign Up");
    navigate("/sign-up");
  };

  const handleLoginClick = () => {
    setAction("Login");
    navigate("/login");
  };

  return (
    <div className="signin-signup-background">
      <div className="signin-container">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign Up" && (
            <>
              <div className="input">
                <img src={person} alt="" />
                <input
                  type="text"
                  placeholder="Username"
                  value={usernameValue}
                  onChange={(e) => setUserNameValue(e.target.value)}
                />
              </div>
              <div className="input">
                <img src={password} alt="" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={phoneNumberValue}
                  onChange={(e) => setPhoneNumberValue(e.target.value)}
                />
              </div>
            </>
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
          <div className="inputs">
            <div className="input">
              <img src={password} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
              />
            </div>
            {action === "Sign Up" && (
              <div className="input">
                <img src={password} alt="" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPasswordValue}
                  onChange={(e) => setConfirmPasswordValue(e.target.value)}
                />
              </div>
            )}
          </div>
        </div>
        <div className="submit submit-button" onClick={handleSubmit}>
          {loading ? "Submitting..." : "Submit"} {/* Show loading text */}
        </div>
        {action === "Login" && (
          <div className="forgot-password">
            Lost password? <span>Click Here!</span>
          </div>
        )}
        <div className="submit-container">
          <div
            className={action === "Login" ? "submit gray" : "submit"}
            onClick={handleSignUpClick}
          >
            Sign Up
          </div>
          <div
            className={action === "Sign Up" ? "submit gray" : "submit"}
            onClick={handleLoginClick}
          >
            Login
          </div>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default SignUp;