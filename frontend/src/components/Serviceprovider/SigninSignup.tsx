import { useState } from "react";
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
  const [countryValue, setCountryValue] = useState<string>("");
  const [addressValue, setAddressValue] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [cityValue, setCityValue] = useState<string>("");
  const [stateValue, setStateValue] = useState<string>("");
  const [zipCodeValue, setZipCodeValue] = useState<string>("");
  const [emailValue, setEmailValue] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorMessage("");
    if (action === "Sign Up" && passwordValue !== confirmPasswordValue) {
      setErrorMessage("Error: Passwords do not match");
      return; // Prevent further execution
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
	  country: countryValue,
          address: addressValue,
          city: cityValue,
          state: stateValue,
          zipcode: zipCodeValue,
        }
      );

      const { username, userId } = response.data;

      const uniqueUsername = username + '-' + userId.slice(0, 4);
      if (action === "Sign Up") {
        if (response.status === 201) {
          setSuccessMessage("Account Created");
        } else {
          setErrorMessage(
            "Failed to create user. Please fill in the required information"
          );
          console.log(errorMessage);
          return;
        }
      } else {
        if (response.status === 200) {
          setSuccessMessage("Login Successful");
        } else {
          setErrorMessage("Incorrect Login details. Please try again.");
          console.log(errorMessage);
          return;
        }
      }
      const destinationPath = `/${uniqueUsername}/dashboard`;
      if (userId)
        navigate(destinationPath);
      {successMessage};
    } catch (error) {
      console.error("Error creating user:", error);
      setErrorMessage("An error occurred. Please try again");
    }
  };

  const handleToggleAction = () => {
    // Determine the next action
    const nextAction = action === "Login" ? "Sign Up" : "Login";
    setAction(nextAction);

    // Clear form fields when toggling
    if (nextAction === "Sign Up") {
      navigate("/service-providers/sign-up");
      setEmailValue("");
      setPasswordValue("");
    } else {
      navigate("/service-providers/login");
      setName("");
      setUsernameValue("");
      setCountryValue("");
      setAddressValue("");
      setPasswordValue("");
      setConfirmPasswordValue("");
      setPhoneNumber("");
      setCityValue("");
      setStateValue("");
      setZipCodeValue("");
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
              countryValue={countryValue}
              setCountryValue={setCountryValue}
              addressValue={addressValue}
              setAddressValue={setAddressValue}
              cityValue={cityValue}
              setCityValue={setCityValue}
              stateValue={stateValue}
              setStateValue={setStateValue}
              zipCodeValue={zipCodeValue}
              setZipCodeValue={setZipCodeValue}
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
