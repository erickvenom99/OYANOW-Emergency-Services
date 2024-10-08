import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import "./SigninSignup.css";

const SigninSignup: React.FC = () => {
  const [action, setAction] = useState<"Login" | "Sign Up">("Login");
  const [name, setName] = useState<string>("");
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [selectedService, setSelectedService] = useState<string>("");
  const [coordinates, setCoordinates] = useState<[number, number] | null>(null); // New state for coordinates
  const navigate = useNavigate();

  // Request live location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates([latitude, longitude]); // Set coordinates state
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
    setErrorMessage("");
    if (action === "Sign Up" && passwordValue !== confirmPasswordValue) {
      setErrorMessage("Error: Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        action === "Sign Up"
          ? "http://localhost:5000/service-providers/sign-up"
          : "http://localhost:5000/service-providers/login",
        {
          name,
          username: usernameValue,
          email: emailValue,
          password: passwordValue,
          phoneNumber: phoneNumber,
          services: selectedService,
          coordinates: coordinates ? { type: "Point", coordinates } : null, // Include coordinates
        }
      );

      const { username, providerId, orderId, uniqueUsername } = response.data;

      if (action === "Sign Up") {
        if (response.status === 201) {
          setSuccessMessage("Account Created");
        } else {
          setErrorMessage("Failed to create user. Please fill in the required information");
          return;
        }
      } else {
        if (response.status === 200) {
          setSuccessMessage("Login Successful");
        } else {
          setErrorMessage("Incorrect Login details. Please try again.");
          return;
        }
      }
      const destinationPath = `/service-providers/${uniqueUsername}/dashboard`;
      navigate(destinationPath, { state: { orderId, coordinates, providerId, username } });
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("An error occurred. Please try again");
    }
  };

  const handleToggleAction = () => {
    const nextAction = action === "Login" ? "Sign Up" : "Login";
    setAction(nextAction);
    // Clear form fields when toggling
    if (nextAction === "Sign Up") {
      navigate("/service-providers/sign-up");
      setName("");
      setUsernameValue("");
      setEmailValue("");
      setPasswordValue("");
      setConfirmPasswordValue("");
      setPhoneNumber("");
    } else {
      navigate("/service-providers/login");
      setEmailValue("");
      setPasswordValue("");
    }
  };

  return (
    <div className="signin-signup-background">
      <div className="signin-container">
        <div className="header">
          {errorMessage && <h6>{errorMessage}</h6>}
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        <div className="inputs">
          {action === "Sign Up" ? (
            <SignUpForm
              name={name}
              setName={setName}
              usernameValue={usernameValue}
              setUsernameValue={setUsernameValue}
              emailValue={emailValue}
              setEmailValue={setEmailValue}
              passwordValue={passwordValue}
              setPasswordValue={setPasswordValue}
              confirmPasswordValue={confirmPasswordValue}
              setConfirmPasswordValue={setConfirmPasswordValue}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              selectedService={selectedService}
              setSelectedService={setSelectedService}
              setCoordinates={setCoordinates} // Pass the setter for coordinates
            />
          ) : (
            <LoginForm
              emailValue={emailValue}
              setEmailValue={setEmailValue}
              passwordValue={passwordValue}
              setPasswordValue={setPasswordValue}
            />
          )}
        </div>
        <div className="submit submit-button" onClick={handleSubmit}>
          Submit
        </div>
        <div>
          {action === "Sign Up" ? (
            <div>
              <span>Already have an account? </span>
              <span className="toggle-button" onClick={handleToggleAction}>
                Sign In
              </span>
            </div>
          ) : (
            <div>
              <div
                className="forgot-password"
                onClick={() => {
                  navigate("/service-providers/recover-password");
                }}
              >
                Lost password? <span>Click Here!</span>
              </div>
              <div>
                <span>Don't have an account? </span>
                <span className="toggle-button" onClick={handleToggleAction}>
                  Sign Up
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SigninSignup;